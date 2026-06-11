import { useEffect, useRef, useState } from "react"
import { callSocket  } from "../../contexts/socketcontext/SocketContext"




const servers={
    iceServers:[
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
    ]
}


const CallPage=()=>{

    
    const [calling,setCalling]:any=useState({status:false});
    const [isConnected,setConnected]=useState(false)
    const [roomId,setRoomId]:any=useState("");
    const [isCallStart,setCallStart]=useState(false)

    const localVideo:any=useRef(null);
    const remoteVideo:any=useRef(null);
    const peerConnection:any=useRef(null)
    





    const joinRoom=()=>{
        if(roomId===""){
            alert("empty roomId");
            return;
        }
callSocket.emit("joinroom",{roomId});

    }


useEffect(()=>{
    callSocket.on("roomjoined",({roomId})=>{
        setConnected(true)
        console.log(roomId)
    })
    
    return ()=>{callSocket.off("roomjoined")}
},[])




useEffect(()=>{
    callSocket.on("offer",async({offer})=>{
    
        setCalling({status:true,offer:offer})

    })
    
    return ()=>{callSocket.off("offer")}
},[])

useEffect(()=>{
    callSocket.on("answer",async({answer})=>{
    
       await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
    })
    
    return ()=>{callSocket.off("answer")}
},[])

useEffect(()=>{
    callSocket.on("ice-candidate",async({candidate})=>{
    
        try{console.log(candidate)
                await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate))
        }catch(err){
            console.log(err)
        }
    })
    
    return ()=>{callSocket.off("ice-candidate")}
},[])


useEffect(()=>{
    callSocket.on("end-call",()=>{
        peerConnection.current.close()
        setCallStart(false)
       
    })
    
    return ()=>{callSocket.off("end-call")}
},[])



const startCall=async()=>{
setCallStart(true)
    const stream=await navigator.mediaDevices.getUserMedia({video:true,audio:true});

    localVideo.current.srcObject=stream;

    const remotestream=new MediaStream();
    remoteVideo.current.srcObject=remotestream;
    remoteVideo.current.autoplay=true
    remoteVideo.current.playsInline=true
    remoteVideo.current.controls=true

    // to create webRTC connection

    peerConnection.current=new RTCPeerConnection(servers)


    stream.getTracks().forEach((track)=>{
        peerConnection.current.addTrack(track,stream)
    })

    peerConnection.current.ontrack=async(event:any)=>{

        console.log("receive track sbh2")
console.log("TRACK RECEIVED");

    console.log("STREAMS:", event.streams);

    console.log(
      "VIDEO TRACKS:",
      event.streams[0]?.getVideoTracks()
    );

    console.log(
      "AUDIO TRACKS:",
      event.streams[0]?.getAudioTracks()
    );


        event.streams[0].getTracks().forEach((track:any)=>{
            remotestream.addTrack(track)

            

        })
         console.log(
      remoteVideo.current.srcObject
    );
        try{
//await remoteVideo.current.play()
//console.log("video is playing....")
         
console.log(remoteVideo.current);

console.log(
  "readyState:",
  remoteVideo.current.readyState
);

console.log(
  "networkState:",
  remoteVideo.current.networkState
);

console.log(
  "paused:",
  remoteVideo.current.paused
);

console.log(
  "srcObject:",
  remoteVideo.current.srcObject
);

console.log(
  "videoTracks:",
  remoteVideo.current.srcObject?.getVideoTracks()
);

console.log(
  "audioTracks:",
  remoteVideo.current.srcObject?.getAudioTracks()
);

const promise = remoteVideo.current.play();

console.log("play promise:", promise);

promise
.then(()=>{

   console.log("VIDEO PLAYING");

})
.catch((err:any)=>{

   console.log("PLAY ERROR:", err);

});
}catch(err){
    console.log("erreee hab skkkk")
                console.log(err)
            }
    }


    peerConnection.current.onicecandidate=(event:any)=>{
        if(event.candidate){
            callSocket.emit("ice-candidate",{roomId,candidate:event.candidate})
        }
    }



const offer=await peerConnection.current.createOffer();
await peerConnection.current.setLocalDescription(offer)

callSocket.emit("offer",{roomId,offer})
}



const endCall=()=>{
    setCallStart(false)
    peerConnection.current.close();
    callSocket.emit("end-call",{roomId})
}

const pickCall= async()=>{
    setCallStart(true)
      const stream=await navigator.mediaDevices.getUserMedia({video:true,audio:true});

    localVideo.current.srcObject=stream;


    
  peerConnection.current = new RTCPeerConnection(servers)

  stream.getTracks().forEach((track:any)=>{
    peerConnection.current.addTrack(track,stream)
})

  const remotestream=new MediaStream();
    remoteVideo.current.srcObject=remotestream;

    remoteVideo.current.autoplay=true
    remoteVideo.current.playsInline=true
    remoteVideo.current.controls=true

 peerConnection.current.ontrack=async(event:any)=>{

        console.log("receive track sbh2")
console.log("TRACK RECEIVED");

    console.log("STREAMS:", event.streams);

    console.log(
      "VIDEO TRACKS:",
      event.streams[0]?.getVideoTracks()
    );

    console.log(
      "AUDIO TRACKS:",
      event.streams[0]?.getAudioTracks()
    );


        event.streams[0].getTracks().forEach((track:any)=>{
            remotestream.addTrack(track)

            

        })
         console.log(
      remoteVideo.current.srcObject
    );
        try{
//await remoteVideo.current.play()
//console.log("video is playing....")

console.log(remoteVideo.current);

console.log(
  "readyState:",
  remoteVideo.current.readyState
);

console.log(
  "networkState:",
  remoteVideo.current.networkState
);

console.log(
  "paused:",
  remoteVideo.current.paused
);

console.log(
  "srcObject:",
  remoteVideo.current.srcObject
);

console.log(
  "videoTracks:",
  remoteVideo.current.srcObject?.getVideoTracks()
);

console.log(
  "audioTracks:",
  remoteVideo.current.srcObject?.getAudioTracks()
);

const promise = remoteVideo.current.play();

console.log("play promise:", promise);

promise
.then(()=>{

   console.log("VIDEO PLAYING");

})
.catch((err:any)=>{

   console.log("PLAY ERROR:", err);

});

            }catch(err){
                console.log("erre hai")
                console.log(err)
            }
    }

    peerConnection.current.onicecandidate=(event:any)=>{
    if(event.candidate){
        callSocket.emit("ice-candidate",{
            roomId,
            candidate:event.candidate
        })
    }
}

  if(!peerConnection.current)alert("no peer current")
    console.log(calling.offer)
await peerConnection.current.setRemoteDescription( new RTCSessionDescription(calling.offer));

        const answer=await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer)
        callSocket.emit("answer",{answer,roomId})
       
        setCalling({status:false})
        console.log(answer)
}

const updateRoomId=(e:any)=>{

    setRoomId(e.target.value)
}

    return<>
    
    <div className="container-fluid p-3 bg-white">
{
    calling.status?<div><button onClick={pickCall} className="btn bg-success">call</button></div>:<></>
}
<div><input placeholder="roomId" value={roomId} onChange={updateRoomId}/><button  onClick={joinRoom} className="btn bg-primary">join room</button></div>
{isConnected?<><h1>Video Call with {roomId}</h1><div> connected, now you can call</div></>:<></>}


{isCallStart?<div>
<video  className="border"
ref={localVideo}
autoPlay
muted
playsInline

width="300"

/>
<video   className="border"
ref={remoteVideo}
autoPlay
muted
playsInline

width="300"

/>
<br/>
<button  className="btn bg-danger" onClick={endCall}> end</button>
</div>:isConnected?<button className="btn bg-success"  onClick={startCall}> call</button>
:<></>

}



    </div>
    
    
    
    
    
    </>
}


export default CallPage