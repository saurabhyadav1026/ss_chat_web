import { useEffect, useRef, useState } from "react"
import { callSocket  } from "../../contexts/socketcontext/SocketContext"



const servers={
    iceServers:[
        {urls:"stun:stun.l.google.com:19302"}
    ]
}


const CallPage=()=>{

    const [roomId,setRoomId]=useState("");
    const [calling,setCalling]:any=useState({status:false});

    const localVideo:any=useRef(null);
    const remoteVideo:any=useRef(null);
    const peerConnection:any=useRef(null)





    useEffect(()=>{
callSocket.emit("joinroom",{roomId:"sbh"})

    },[])


useEffect(()=>{
    callSocket.on("roomjoined",({roomId})=>{
        setRoomId(roomId)
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
        alert("call disconnected")
    })
    
    return ()=>{callSocket.off("end-call")}
},[])



const startCall=async()=>{

    const stream=await navigator.mediaDevices.getUserMedia({video:true,audio:true});

    localVideo.current.srcObject=stream;

    const remotestream=new MediaStream();
    remoteVideo.current.srcObject=remotestream;

    // to create webRTC connection

    peerConnection.current=new RTCPeerConnection(servers)


    stream.getTracks().forEach((track)=>{
        peerConnection.current.addTrack(track,stream)
    })

    peerConnection.current.ontrack=(event:any)=>{
        console.log("receive track")
        event.streams[0].getTracks().forEach((track:any)=>{
            remotestream.addTrack(track)

        })
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
    peerConnection.current.close();
    callSocket.emit("end-call",{roomId})
}

const pickCall= async()=>{
      const stream=await navigator.mediaDevices.getUserMedia({video:true,audio:true});

    localVideo.current.srcObject=stream;


    
  peerConnection.current = new RTCPeerConnection(servers)

  stream.getTracks().forEach((track:any)=>{
    peerConnection.current.addTrack(track,stream)
})

  const remotestream=new MediaStream();
    remoteVideo.current.srcObject=remotestream;
 peerConnection.current.ontrack=(event:any)=>{
        console.log("receive track")
        event.streams[0].getTracks().forEach((track:any)=>{
            remotestream.addTrack(track)

        })
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

    return<>
    
    <div className="container-fluid p-3 bg-white">
{
    calling.status?<div><button onClick={pickCall} className="btn bg-success">call</button></div>:<></>
}

<h1>Video Call with {roomId}</h1>

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
playsInline

width="300"

/>
<br/>

<div>
    <button className="btn bg-success"  onClick={startCall}> call</button>
<button  className="btn bg-danger" onClick={endCall}> end</button>
</div>

    </div>
    
    
    
    
    
    </>
}


export default CallPage