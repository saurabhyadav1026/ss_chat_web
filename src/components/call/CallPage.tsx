import { useEffect, useRef, useState } from "react";
import { callSocket } from "../../contexts/socketcontext/SocketContext";

const servers: RTCConfiguration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    {
      urls: [
        "turn:openrelay.metered.ca:80",
        "turn:openrelay.metered.ca:443",
        "turn:openrelay.metered.ca:443?transport=tcp",
      ],
      username: "openrelayproject",
      credential: "openrelayproject",
    },
  ],
};

type IncomingCall = {
  status: boolean;
  offer?: RTCSessionDescriptionInit;
};

const CallPage = () => {
  const [calling, setCalling] = useState<IncomingCall>({ status: false });
  const [isConnected, setConnected] = useState(false);
  const [roomId, setRoomId] = useState("");
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
  const roomIdRef = useRef("");

  useEffect(() => {
    roomIdRef.current = roomId.trim();
  }, [roomId]);

  const showError = (message: string) => {
    setError(message);
    setStatus(message);
  };

  const stopCall = (message = "Call ended.", notifyRoom = false) => {
    if (notifyRoom && roomIdRef.current) {
      callSocket.emit("end-call", { roomId: roomIdRef.current });
    }

    peerConnection.current?.close();
    peerConnection.current = null;
    localStream.current?.getTracks().forEach((track) => track.stop());
    localStream.current = null;
    remoteStream.current = null;
    pendingCandidates.current = [];

    if (localVideo.current) localVideo.current.srcObject = null;
    if (remoteVideo.current) remoteVideo.current.srcObject = null;

    setCalling({ status: false });
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
    const stream = remoteStream.current ?? new MediaStream();
    if (!stream.getTracks().some((track) => track.id === event.track.id)) {
      stream.addTrack(event.track);
    }

    remoteStream.current = stream;
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

  const createPeerConnection = (stream: MediaStream) => {
    peerConnection.current?.close();
    const connection = new RTCPeerConnection(servers);
    peerConnection.current = connection;

    stream.getTracks().forEach((track) => connection.addTrack(track, stream));
    connection.ontrack = attachRemoteTrack;
    connection.onicecandidate = ({ candidate }) => {
      if (candidate && roomIdRef.current) {
        callSocket.emit("ice-candidate", { roomId: roomIdRef.current, candidate });
      }
    };
    connection.onconnectionstatechange = () => {
      if (connection.connectionState === "connected") {
        setStatus("Connected. Your call is live.");
      } else if (connection.connectionState === "failed") {
        showError("The call could not connect. End the call and try again.");
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
    const onRoomJoined = () => {
      setConnected(true);
      setError("");
      setStatus("Room joined. Start a call or wait for the other device.");
    };
    const onOffer = ({ offer }: { offer: RTCSessionDescriptionInit }) => {
      setCalling({ status: true, offer });
      setStatus("Incoming video call.");
    };
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
    const onEndCall = () => stopCall("The other device ended the call.");

    callSocket.on("roomjoined", onRoomJoined);
    callSocket.on("offer", onOffer);
    callSocket.on("answer", onAnswer);
    callSocket.on("ice-candidate", onIceCandidate);
    callSocket.on("end-call", onEndCall);

    return () => {
      callSocket.off("roomjoined", onRoomJoined);
      callSocket.off("offer", onOffer);
      callSocket.off("answer", onAnswer);
      callSocket.off("ice-candidate", onIceCandidate);
      callSocket.off("end-call", onEndCall);
      peerConnection.current?.close();
      localStream.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const joinRoom = () => {
    const cleanRoomId = roomId.trim();
    if (!cleanRoomId) {
      showError("Enter a room ID first.");
      return;
    }
    roomIdRef.current = cleanRoomId;
    setRoomId(cleanRoomId);
    setError("");
    setStatus("Joining room...");
    callSocket.emit("joinroom", { roomId: cleanRoomId });
  };

  const startCall = async () => {
    const stream = await prepareLocalMedia();
    if (!stream) return;

    try {
      setStatus("Calling the other device...");
      const connection = createPeerConnection(stream);
      const offer = await connection.createOffer();
      await connection.setLocalDescription(offer);
      callSocket.emit("offer", { roomId: roomIdRef.current, offer });
    } catch (callError) {
      console.error("Unable to start call", callError);
      stopCall("Could not start the call.");
    }
  };

  const pickCall = async () => {
    if (!calling.offer) return;
    const stream = await prepareLocalMedia();
    if (!stream) return;

    try {
      setStatus("Connecting...");
      const connection = createPeerConnection(stream);
      await connection.setRemoteDescription(new RTCSessionDescription(calling.offer));
      await flushCandidates();
      const answer = await connection.createAnswer();
      await connection.setLocalDescription(answer);
      callSocket.emit("answer", { answer, roomId: roomIdRef.current });
      setCalling({ status: false });
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
        <div style={styles.header}>
          <div>
            <p style={styles.eyebrow}>SS Chat</p>
            <h1 style={styles.title}>Video call</h1>
            <p style={styles.subtitle}>Join the same room from both devices, then start the call.</p>
          </div>
          <span style={{ ...styles.badge, ...(isConnected ? styles.badgeConnected : {}) }}>
            {isConnected ? "Room joined" : "Not connected"}
          </span>
        </div>

        <div style={styles.joinRow}>
          <input
            aria-label="Room ID"
            placeholder="Enter room ID"
            value={roomId}
            onChange={(event) => setRoomId(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && joinRoom()}
            disabled={isCallStarted}
            style={styles.input}
          />
          <button onClick={joinRoom} disabled={isCallStarted} style={styles.primaryButton}>
            Join room
          </button>
        </div>

        <p style={{ ...styles.status, ...(error ? styles.error : {}) }}>{status}</p>

        {calling.status && !isCallStarted && (
          <div style={styles.incoming}>
            <div>
              <strong>Incoming call</strong>
              <p style={styles.incomingText}>Another device in this room wants to connect.</p>
            </div>
            <button onClick={pickCall} style={styles.acceptButton}>Accept</button>
          </div>
        )}

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
        ) : (
          <button onClick={startCall} disabled={!isConnected} style={styles.startButton}>
            Start video call
          </button>
        )}
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
