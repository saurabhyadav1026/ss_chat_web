import { useContext, useEffect, useRef, useState } from "react";
import { socket } from "../../contexts/socketcontext/SocketContext";
import { useParams } from "react-router-dom";
import CallContext from "../../contexts/CallContext";


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
if(callStartedRef.current)return;
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
    
 return stunServers;

    
  };

  const createPeerConnection = async (stream: MediaStream) => {
    peerConnection.current?.close();
    const connection = new RTCPeerConnection({ iceServers: await getIceServers() });
    peerConnection.current = connection;

    stream.getTracks().forEach((track) => connection.addTrack(track, stream));
    connection.ontrack = attachRemoteTrack;
    connection.onicecandidate = ({ candidate }) => {
      const activeRoomId = roomIdRef.current;
      if (candidate && activeRoomId) {
       
        socket.emit("ice-candidate", { roomId: activeRoomId, candidate });
      }
    };
    connection.onconnectionstatechange = () => {
      if (connection.connectionState === "connected") {
        setStatus("Connected. Your call is live.");
      } else if (connection.connectionState === "failed") {
        showError(
        "The call could not connect. Check that your TURN credentials are active, then try again. or Different networks require a TURN relay. Add a TURN credentials URL below, then try again.",
        );
  
      } else if (connection.connectionState === "disconnected") {
        setStatus("Connection interrupted. Trying to recover...");
      }
    };

    return connection;
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
      localStream.current?.getTracks().forEach((track) => track.stop());
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
      socket.emit("startcall", { roomId: roomIdRef.current, offer });
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
      socket.emit("answer", { answer, roomId: roomIdRef.current });
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
     

       

        <p style={{ ...styles.status, ...(error ? styles.error : {}) }}>{status}</p>

        

       
        {isCallStarted ? (
          <>
            <div style={styles.videoGrid}>
              <div style={styles.videoCard}>
                <span style={styles.videoLabel}>You</span>
                <video ref={localVideo} autoPlay muted playsInline style={styles.video} />
              </div>
              <div style={styles.videoCard}>
                <span style={styles.videoLabel}>Remote</span>
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
              <button onClick={toggleMute} style={styles.controlButton}>
                {isMuted ? "Unmute" : "Mute"}
              </button>
              <button onClick={toggleCamera} style={styles.controlButton}>
                {isCameraOff ? "Camera on" : "Camera off"}
              </button>
              <button onClick={toggleRemoteAudio} style={styles.controlButton}>
                {isRemoteMuted ? "Hear remote audio" : "Mute remote audio"}
              </button>
              <button onClick={() => stopCall("Call ended.", true)} style={styles.endButton}>
                End call
              </button>
            </div>
          </>
        ) :<></>}
      </section>
    </main>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", padding: "32px 16px", background: "#eef4ff", color: "#172033" },
  panel: { maxWidth: 1040, margin: "0 auto", padding: 24, borderRadius: 24, background: "#fff", boxShadow: "0 18px 48px rgba(32, 66, 120, .14)" },
  header: { display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start", marginBottom: 22 },
  eyebrow: { margin: "0 0 4px", color: "#2563eb", fontSize: 12, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase" },
  title: { margin: 0, fontSize: 32, lineHeight: 1.1 },
  subtitle: { margin: "8px 0 0", color: "#64748b" },
  badge: { padding: "7px 11px", borderRadius: 999, background: "#e2e8f0", color: "#475569", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" },
  badgeConnected: { background: "#dcfce7", color: "#15803d" },
  joinRow: { display: "flex", gap: 10, flexWrap: "wrap" },
  input: { flex: "1 1 230px", minWidth: 0, padding: "12px 14px", border: "1px solid #cbd5e1", borderRadius: 12, outlineColor: "#2563eb" },
  primaryButton: { padding: "12px 18px", border: 0, borderRadius: 12, background: "#2563eb", color: "#fff", fontWeight: 700, cursor: "pointer" },
  status: { minHeight: 24, margin: "12px 0 18px", color: "#64748b", fontSize: 14 },
  error: { color: "#dc2626" },
  setupToggle: { padding: 0, margin: "0 0 14px", border: 0, background: "transparent", color: "#2563eb", fontSize: 14, fontWeight: 700, cursor: "pointer" },
  turnSetup: { padding: 14, marginBottom: 18, borderRadius: 14, background: "#f8fafc", border: "1px solid #cbd5e1" },
  turnText: { margin: "5px 0 10px", color: "#64748b", fontSize: 13 },
  incoming: { display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", padding: 16, marginBottom: 18, borderRadius: 16, background: "#eff6ff", border: "1px solid #bfdbfe" },
  incomingText: { margin: "4px 0 0", color: "#64748b", fontSize: 14 },
  acceptButton: { padding: "10px 18px", border: 0, borderRadius: 10, background: "#16a34a", color: "#fff", fontWeight: 700, cursor: "pointer" },
  videoGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 14 },
  videoCard: { position: "relative", overflow: "hidden", minHeight: 240, borderRadius: 18, background: "#111827" },
  videoLabel: { position: "absolute", zIndex: 1, top: 12, left: 12, padding: "5px 9px", borderRadius: 999, background: "rgba(15, 23, 42, .75)", color: "#fff", fontSize: 12, fontWeight: 700 },
  video: { display: "block", width: "100%", height: "100%", minHeight: 240, objectFit: "cover", background: "#111827" },
  controls: { display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginTop: 18 },
  controlButton: { padding: "10px 16px", border: "1px solid #cbd5e1", borderRadius: 999, background: "#fff", color: "#334155", fontWeight: 700, cursor: "pointer" },
  endButton: { padding: "10px 18px", border: 0, borderRadius: 999, background: "#dc2626", color: "#fff", fontWeight: 700, cursor: "pointer" },
  startButton: { width: "100%", padding: "13px 18px", border: 0, borderRadius: 12, background: "#16a34a", color: "#fff", fontWeight: 800, cursor: "pointer" },
};

export default CallPage;
