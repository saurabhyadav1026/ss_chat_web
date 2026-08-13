import { useContext, useEffect, useRef, useState } from "react";
import { socket } from "../../contexts/socketcontext/SocketContext";
import { useParams } from "react-router-dom";
import CallContext from "../../contexts/CallContext";
import { Mic, MicOff, PhoneOff, Volume2, VolumeX, Video, VideoOff } from "lucide-react";


const stunServers: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
   {
        urls: "stun:stun.relay.metered.ca:80",
      },
      {
        urls: "turn:global.relay.metered.ca:80",
        username: "c8674decd7f66da97efcd993",
        credential: "GP9yRsjtoZtfjoQA",
      },
      {
        urls: "turn:global.relay.metered.ca:80?transport=tcp",
        username: "c8674decd7f66da97efcd993",
        credential: "GP9yRsjtoZtfjoQA",
      },
      {
        urls: "turn:global.relay.metered.ca:443",
        username: "c8674decd7f66da97efcd993",
        credential: "GP9yRsjtoZtfjoQA",
      },
      {
        urls: "turns:global.relay.metered.ca:443?transport=tcp",
        username: "c8674decd7f66da97efcd993",
        credential: "GP9yRsjtoZtfjoQA",
      },
];

const getTurnServersFromEnv = (): RTCIceServer[] => {
  const urls = import.meta.env.VITE_TURN_URLS;
  const username = import.meta.env.VITE_TURN_USERNAME;
  const credential = import.meta.env.VITE_TURN_CREDENTIAL;

  if (!urls || !username || !credential) return [];

  return [
    {
      urls: urls.split(",").map((url: string) => url.trim()).filter(Boolean),
      username,
      credential,
    },
  ];
};



const CallPage = () => {
  
  
const param=useParams()

  const [roomId, setRoomId]:any = useState(param.page2Id);


  const [isCallStarted, setCallStarted] = useState(false);
  const [status, setStatus] = useState("Enter the same room ID on both devices.");
  const [error, setError] = useState("");
  const [isMuted, setMuted] = useState(false);
  const [isCameraOff, setCameraOff] = useState(false);
  const [isRemoteMuted, setRemoteMuted] = useState(true);
  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localStream = useRef<MediaStream | null>(null);
  const remoteStream = useRef<MediaStream | null>(null);
  const pendingCandidates = useRef<RTCIceCandidateInit[]>([]);
  const callStartedRef = useRef(false);
  const roomIdRef = useRef(param.page2Id);
  const [remoteMediaStream, setRemoteMediaStream] = useState<MediaStream | null>(null);


  const {callOffer}:any=useContext(CallContext)

  const {disconnectCall}:any=useContext(CallContext)




useEffect(()=>{
setRoomId(param.page2Id)
roomIdRef.current = param.page2Id;
},[param.page2Id])


  useEffect(()=>{
if(callStartedRef.current && peerConnection.current)return;
if(param.callStatus==="start"){
  callStartedRef.current = true;
  startCall();
}
else if(param.callStatus==="pick"){
  if(!callOffer || !Object.keys(callOffer).length){
    setStatus("Waiting for call offer...");
    return;
  }
  callStartedRef.current = true;
  pickCall(callOffer)};
  },[param.callStatus, callOffer])


  const showError = (message: string) => {
    setError(message);
    setStatus(message);
  };

  const stopCall = (message = "Call ended.", notifyRoom = false) => {
    if (notifyRoom && roomId) {
 disconnectCall();
    }

    peerConnection.current?.close();
    peerConnection.current = null;
    localStream.current?.getTracks().forEach((track) => track.stop());
    localStream.current = null;
    remoteStream.current = null;
    setRemoteMediaStream(null);
    pendingCandidates.current = [];

    if (localVideo.current) localVideo.current.srcObject = null;
    if (remoteVideo.current) remoteVideo.current.srcObject = null;

    setCallStarted(false);
    setMuted(false);
    setCameraOff(false);
    setRemoteMuted(true);
    setStatus(message);
  };

  const flushCandidates = async () => {
    const connection = peerConnection.current;
    if (!connection?.remoteDescription) return;

    const candidates = pendingCandidates.current.splice(0);
    for (const candidate of candidates) {
      try {
        await connection.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (candidateError) {
        console.error("Unable to add queued ICE candidate", candidateError);
      }
    }
  };

  const attachRemoteTrack = (event: RTCTrackEvent) => {
    const stream = event.streams[0] ?? remoteStream.current ?? new MediaStream();
    if (!stream.getTracks().some((track) => track.id === event.track.id)) {
      stream.addTrack(event.track);
    }

    remoteStream.current = stream;
    setRemoteMediaStream(stream);
    if (!remoteVideo.current) return;

    remoteVideo.current.srcObject = stream;
    const playRemoteVideo = () => {
      remoteVideo.current?.play().catch(() => {
        setStatus("Remote video is ready. Tap play on the video if your browser paused it.");
      });
    };

    event.track.onunmute = playRemoteVideo;
    playRemoteVideo();
  };

  const getIceServers = async () => {
    const turnServers = getTurnServersFromEnv();
    return turnServers.length ? [...stunServers, ...turnServers] : stunServers;
  };

  const createPeerConnection = async (stream: MediaStream) => {
    peerConnection.current?.close();
    const iceServers = await getIceServers();
    const connection = new RTCPeerConnection({
      iceServers,
      iceCandidatePoolSize: 10,
    });
    peerConnection.current = connection;

    stream.getTracks().forEach((track) => connection.addTrack(track, stream));
    connection.ontrack = attachRemoteTrack;
    connection.onicecandidate = ({ candidate }) => {
      const activeRoomId = roomIdRef.current;
      if (candidate && activeRoomId) {
       
        socket.emit("ice-candidate", { roomId: activeRoomId, candidate });
      }
    };
    connection.onicecandidateerror = (event) => {
      console.error("ICE candidate error", event);
      if (event.errorCode === 401 || event.errorCode === 438) {
        showError("TURN authentication failed. Update the TURN username and credential.");
      } else if (event.url?.startsWith("turn")) {
        showError("TURN server is not reachable. Check your TURN URL, port, and firewall.");
      }
    };
    connection.oniceconnectionstatechange = () => {
      if (connection.iceConnectionState === "checking") {
        setStatus("Connecting through ICE...");
      } else if (connection.iceConnectionState === "connected" || connection.iceConnectionState === "completed") {
        setStatus("Connected. Your call is live.");
      } else if (connection.iceConnectionState === "failed") {
        showError("The call could not connect across networks. Use valid TURN credentials in VITE_TURN_URLS, VITE_TURN_USERNAME, and VITE_TURN_CREDENTIAL.");
      }
    };
    connection.onconnectionstatechange = () => {
      if (connection.connectionState === "connected") {
        setStatus("Connected. Your call is live.");
      } else if (connection.connectionState === "failed") {
        showError(
        "The call could not connect across networks. Use valid TURN credentials in VITE_TURN_URLS, VITE_TURN_USERNAME, and VITE_TURN_CREDENTIAL.",
        );
  
      } else if (connection.connectionState === "disconnected") {
        setStatus("Connection interrupted. Trying to recover...");
      }
    };

    return connection;
  };

  const waitForIceGatheringComplete = (connection: RTCPeerConnection) => {
    if (connection.iceGatheringState === "complete") return Promise.resolve();

    return new Promise<void>((resolve) => {
      const timeout = window.setTimeout(() => {
        connection.removeEventListener("icegatheringstatechange", onStateChange);
        resolve();
      }, 5000);

      const onStateChange = () => {
        if (connection.iceGatheringState !== "complete") return;
        window.clearTimeout(timeout);
        connection.removeEventListener("icegatheringstatechange", onStateChange);
        resolve();
      };

      connection.addEventListener("icegatheringstatechange", onStateChange);
    });
  };

  const prepareLocalMedia = async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStream.current = stream;
      remoteStream.current = new MediaStream();
      setCallStarted(true);
      return stream;
    } catch (mediaError) {
      console.error("Unable to access camera or microphone", mediaError);
      showError("Allow camera and microphone access to start a call.");
      return null;
    }
  };

  useEffect(() => {
    if (localVideo.current && localStream.current) {
      localVideo.current.srcObject = localStream.current;
    }
    if (remoteVideo.current && remoteStream.current) {
      remoteVideo.current.srcObject = remoteStream.current;
    }
  }, [isCallStarted]);

  useEffect(() => {
    if (!remoteVideo.current || !remoteMediaStream) return;
    remoteVideo.current.srcObject = remoteMediaStream;
    remoteVideo.current.play().catch(() => {
      setStatus("Remote video is ready. Tap play on the video if your browser paused it.");
    });
  }, [remoteMediaStream]);

  useEffect(() => {
    
  
    const onAnswer = async ({ answer }: { answer: RTCSessionDescriptionInit }) => {
      const connection = peerConnection.current;
      if (!connection) return;
      try {
        await connection.setRemoteDescription(new RTCSessionDescription(answer));
        await flushCandidates();
      } catch (answerError) {
        console.error("Unable to use call answer", answerError);
        showError("The other device could not be connected.");
      }
    };
    const onIceCandidate = async ({ candidate }: { candidate: RTCIceCandidateInit }) => {
      if (!candidate) return;
      const connection = peerConnection.current;
      if (!connection?.remoteDescription) {
        pendingCandidates.current.push(candidate);
        return;
      }
      try {
        await connection.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (candidateError) {
        console.error("Unable to add ICE candidate", candidateError);
      }
    };
    const onEndCall = () =>{ disconnectCall();
      stopCall("The other device ended the call.")};

    
    socket.on("answer", onAnswer);
    socket.on("ice-candidate", onIceCandidate);
    socket.on("end-call", onEndCall);

    return () => {
      
      socket.off("answer", onAnswer);
      socket.off("ice-candidate", onIceCandidate);
      socket.off("end-call", onEndCall);
      peerConnection.current?.close();
      peerConnection.current = null;
      localStream.current?.getTracks().forEach((track) => track.stop());
      localStream.current = null;
      remoteStream.current = null;
      setRemoteMediaStream(null);
      callStartedRef.current = false;
    };
  }, []);




  const startCall = async () => {
    const stream = await prepareLocalMedia();
    if (!stream) return;

    try {
      setStatus("Calling the other device...");
      const connection = await createPeerConnection(stream);
      const offer = await connection.createOffer();
      await connection.setLocalDescription(offer);
      await waitForIceGatheringComplete(connection);
      socket.emit("startcall", { roomId: roomIdRef.current, offer: connection.localDescription });
    } catch (callError) {
      console.error("Unable to start call", callError);
      stopCall("Could not start the call.");
    }
  };

  const pickCall = async (offer:any) => {
    if (!offer) return;
    const stream = await prepareLocalMedia();
    if (!stream) return;

    try {
      setStatus("Connecting...");
      const connection = await createPeerConnection(stream);
      await connection.setRemoteDescription(new RTCSessionDescription(offer));
      await flushCandidates();
      const answer = await connection.createAnswer();
      await connection.setLocalDescription(answer);
      await waitForIceGatheringComplete(connection);
      socket.emit("answer", { answer: connection.localDescription, roomId: roomIdRef.current });
    } catch (callError) {
      console.error("Unable to answer call", callError);
      stopCall("Could not answer the call.");
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    localStream.current?.getAudioTracks().forEach((track) => {
      track.enabled = !nextMuted;
    });
    setMuted(nextMuted);
  };

  const toggleCamera = () => {
    const nextCameraOff = !isCameraOff;
    localStream.current?.getVideoTracks().forEach((track) => {
      track.enabled = !nextCameraOff;
    });
    setCameraOff(nextCameraOff);
  };

  const toggleRemoteAudio = () => {
    const nextRemoteMuted = !isRemoteMuted;
    setRemoteMuted(nextRemoteMuted);
    if (remoteVideo.current) {
      remoteVideo.current.muted = nextRemoteMuted;
      remoteVideo.current.play().catch(() => {
        setStatus("Tap play on the remote video to allow audio.");
      });
    }
  };

  return (
    <main style={styles.page}>
      <section style={styles.panel}>
        <header style={styles.header}>
          <div>
            <p style={styles.eyebrow}>Secure call</p>
            <h1 style={styles.title}>{isCallStarted ? "Live conversation" : "Preparing call"}</h1>
            <p style={styles.subtitle}>Room {roomId || "not ready"}</p>
          </div>
          <span style={{ ...styles.badge, ...(isCallStarted ? styles.badgeConnected : {}) }}>
            {isCallStarted ? "Live" : "Connecting"}
          </span>
        </header>

        <p style={{ ...styles.status, ...(error ? styles.error : {}) }}>{status}</p>

        {isCallStarted ? (
          <>
            <div style={styles.videoGrid}>
              <div style={styles.videoCard}>
                <span style={styles.videoLabel}>You</span>
                {isCameraOff ? (
                  <div style={styles.videoPlaceholder}>
                    <VideoOff size={34} />
                    <span>Camera off</span>
                  </div>
                ) : null}
                <video ref={localVideo} autoPlay muted playsInline style={styles.video} />
              </div>
              <div style={{ ...styles.videoCard, ...styles.videoCardRemote }}>
                <span style={styles.videoLabel}>Remote</span>
                {!remoteMediaStream ? (
                  <div style={styles.videoPlaceholder}>
                    <Video size={34} />
                    <span>Waiting for video</span>
                  </div>
                ) : null}
                <video
                  ref={remoteVideo}
                  autoPlay
                  muted={isRemoteMuted}
                  playsInline
                  controls
                  onLoadedMetadata={(event) => event.currentTarget.play().catch(() => undefined)}
                  style={styles.video}
                />
              </div>
            </div>
            <div style={styles.controls}>
              <button onClick={toggleMute} style={{ ...styles.controlButton, ...(isMuted ? styles.controlButtonActive : {}) }} aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}>
                {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                <span>{isMuted ? "Unmute" : "Mute"}</span>
              </button>
              <button onClick={toggleCamera} style={{ ...styles.controlButton, ...(isCameraOff ? styles.controlButtonActive : {}) }} aria-label={isCameraOff ? "Turn camera on" : "Turn camera off"}>
                {isCameraOff ? <VideoOff size={20} /> : <Video size={20} />}
                <span>{isCameraOff ? "Camera on" : "Camera off"}</span>
              </button>
              <button onClick={toggleRemoteAudio} style={{ ...styles.controlButton, ...(!isRemoteMuted ? styles.controlButtonActive : {}) }} aria-label={isRemoteMuted ? "Hear remote audio" : "Mute remote audio"}>
                {isRemoteMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                <span>{isRemoteMuted ? "Hear audio" : "Mute audio"}</span>
              </button>
              <button onClick={() => stopCall("Call ended.", true)} style={styles.endButton} aria-label="End call">
                <PhoneOff size={20} />
                <span>End</span>
              </button>
            </div>
          </>
        ) : (
          <div style={styles.waitingCard}>
            <div style={styles.waitingIcon}><Video size={30} /></div>
            <strong>Starting your camera and microphone</strong>
            <span>The call controls will appear once media access is ready.</span>
          </div>
        )}
      </section>
    </main>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100svh", padding: "clamp(12px, 2vw, 28px)", background: "radial-gradient(circle at top left, rgba(44, 201, 167, .18), transparent 30%), linear-gradient(135deg, #081923, #122f3d 58%, #0f232d)", color: "#eef7fb" },
  panel: { minHeight: "calc(100svh - clamp(24px, 4vw, 56px))", maxWidth: 1180, margin: "0 auto", padding: "clamp(14px, 2vw, 24px)", borderRadius: 28, background: "rgba(7, 20, 29, .72)", border: "1px solid rgba(169, 214, 228, .18)", boxShadow: "0 30px 90px rgba(0, 0, 0, .35)", backdropFilter: "blur(22px)", display: "flex", flexDirection: "column", gap: 16 },
  header: { display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start", flexWrap: "wrap" },
  eyebrow: { margin: "0 0 6px", color: "#7dd3fc", fontSize: 12, fontWeight: 800, letterSpacing: 1.2, textTransform: "uppercase" },
  title: { margin: 0, fontSize: "clamp(24px, 3vw, 38px)", lineHeight: 1.05, color: "#f8fdff" },
  subtitle: { margin: "8px 0 0", color: "rgba(238, 247, 251, .66)", fontSize: 14 },
  badge: { display: "inline-flex", alignItems: "center", minHeight: 34, padding: "7px 13px", borderRadius: 999, background: "rgba(125, 211, 252, .12)", border: "1px solid rgba(125, 211, 252, .22)", color: "#bae6fd", fontSize: 12, fontWeight: 800, whiteSpace: "nowrap" },
  badgeConnected: { background: "rgba(44, 201, 167, .18)", borderColor: "rgba(44, 201, 167, .32)", color: "#8ff5dc" },
  joinRow: { display: "flex", gap: 10, flexWrap: "wrap" },
  input: { flex: "1 1 230px", minWidth: 0, padding: "12px 14px", border: "1px solid #cbd5e1", borderRadius: 12, outlineColor: "#2563eb" },
  primaryButton: { padding: "12px 18px", border: 0, borderRadius: 12, background: "#2563eb", color: "#fff", fontWeight: 700, cursor: "pointer" },
  status: { minHeight: 24, margin: 0, padding: "10px 13px", borderRadius: 16, color: "rgba(238, 247, 251, .74)", background: "rgba(255, 255, 255, .06)", border: "1px solid rgba(169, 214, 228, .14)", fontSize: 14 },
  error: { color: "#fecaca", background: "rgba(239, 68, 68, .14)", borderColor: "rgba(239, 68, 68, .25)" },
  setupToggle: { padding: 0, margin: "0 0 14px", border: 0, background: "transparent", color: "#2563eb", fontSize: 14, fontWeight: 700, cursor: "pointer" },
  turnSetup: { padding: 14, marginBottom: 18, borderRadius: 14, background: "#f8fafc", border: "1px solid #cbd5e1" },
  turnText: { margin: "5px 0 10px", color: "#64748b", fontSize: 13 },
  incoming: { display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", padding: 16, marginBottom: 18, borderRadius: 16, background: "#eff6ff", border: "1px solid #bfdbfe" },
  incomingText: { margin: "4px 0 0", color: "#64748b", fontSize: 14 },
  acceptButton: { padding: "10px 18px", border: 0, borderRadius: 10, background: "#16a34a", color: "#fff", fontWeight: 700, cursor: "pointer" },
  videoGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 14, flex: 1, minHeight: 0 },
  videoCard: { position: "relative", overflow: "hidden", minHeight: "min(56svh, 520px)", aspectRatio: "16 / 10", borderRadius: 24, background: "linear-gradient(135deg, #07131c, #13232d)", border: "1px solid rgba(169, 214, 228, .16)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.03)" },
  videoCardRemote: { boxShadow: "0 24px 60px rgba(0, 0, 0, .26), inset 0 0 0 1px rgba(255,255,255,.04)" },
  videoLabel: { position: "absolute", zIndex: 2, top: 12, left: 12, padding: "7px 10px", borderRadius: 999, background: "rgba(3, 13, 20, .72)", border: "1px solid rgba(255,255,255,.12)", color: "#fff", fontSize: 12, fontWeight: 800, backdropFilter: "blur(12px)" },
  video: { position: "relative", zIndex: 1, display: "block", width: "100%", height: "100%", minHeight: 260, objectFit: "cover", background: "#07131c" },
  videoPlaceholder: { position: "absolute", inset: 0, zIndex: 0, display: "grid", placeItems: "center", alignContent: "center", gap: 10, color: "rgba(238, 247, 251, .72)", fontWeight: 800, background: "radial-gradient(circle, rgba(125, 211, 252, .12), transparent 48%)" },
  controls: { position: "sticky", bottom: 12, zIndex: 5, display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", margin: "0 auto", padding: 10, width: "fit-content", maxWidth: "100%", borderRadius: 999, background: "rgba(6, 18, 26, .78)", border: "1px solid rgba(169, 214, 228, .18)", boxShadow: "0 20px 60px rgba(0, 0, 0, .34)", backdropFilter: "blur(18px)" },
  controlButton: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 46, padding: "0 16px", border: "1px solid rgba(169, 214, 228, .16)", borderRadius: 999, background: "rgba(255, 255, 255, .08)", color: "#eef7fb", fontWeight: 800, cursor: "pointer" },
  controlButtonActive: { background: "rgba(240, 182, 101, .2)", borderColor: "rgba(240, 182, 101, .34)", color: "#fde68a" },
  endButton: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 46, padding: "0 18px", border: 0, borderRadius: 999, background: "linear-gradient(135deg, #ef4444, #b91c1c)", color: "#fff", fontWeight: 900, cursor: "pointer", boxShadow: "0 14px 32px rgba(239, 68, 68, .28)" },
  startButton: { width: "100%", padding: "13px 18px", border: 0, borderRadius: 12, background: "#16a34a", color: "#fff", fontWeight: 800, cursor: "pointer" },
  waitingCard: { display: "grid", placeItems: "center", alignContent: "center", gap: 10, flex: 1, minHeight: 360, textAlign: "center", borderRadius: 24, border: "1px dashed rgba(169, 214, 228, .22)", background: "rgba(255, 255, 255, .04)", color: "rgba(238, 247, 251, .72)" },
  waitingIcon: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 68, height: 68, borderRadius: 22, color: "#04202a", background: "linear-gradient(135deg, #2cc9a7, #72f0d2)" },
};

export default CallPage;
