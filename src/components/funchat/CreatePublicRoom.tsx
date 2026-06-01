import { CheckCircle2, Globe2, Info, XCircle } from "lucide-react"
import { useEffect, useState } from "react"
import api from "../../api/api"
import { useNavigate } from "react-router-dom"

const CreatePublicRoom=()=>{

 const [data]:any=useState({ })
 const [isRoomCodeAvailble, setIsRoomCodeAvailble]=useState(false)
 const [roomCode,setRoomCode]=useState("")

const navigate=useNavigate()

const updateRoomCode=(e:any)=>{
setRoomCode(e.target.value);

}

useEffect(()=>{
api.get("/o/funchats/isroomcodeavailble",{params:{roomCode:roomCode}})
.then((res:any)=>{
    if(res.data.status)setIsRoomCodeAvailble(true)
        else setIsRoomCodeAvailble(false)
}).catch((errr:any)=>{
    console.log(errr)
    setIsRoomCodeAvailble(false)
})
},[roomCode])


const create =()=>{
 if(isRoomCodeAvailble)  navigate("/o/funchats/"+roomCode)

}


return<>
<div className="create-room-form">
   <div className="create-room-form__intro">
      <div className="create-room-form__intro-icon"><Globe2 /></div>
      <div><h2>Public room</h2><p>Share the room code with anyone you want to invite.</p></div>
   </div>
   <label className="create-room-field">
      <span>Room name</span>
      <input name="name" value={data.name||""} placeholder="Weekend catch-up"/>
   </label>
   <label className="create-room-field">
      <span>Room code <span title="Use a unique word for your room code"><Info /></span></span>
      <input name="roomCode" value={roomCode||""} onChange={updateRoomCode} placeholder="your-room-code"/>
   </label>
   <div className={`create-room-status ${isRoomCodeAvailble?"create-room-status--available":"create-room-status--unavailable"}`}>
      {isRoomCodeAvailble?<CheckCircle2 />:<XCircle />}
      <span>{isRoomCodeAvailble?"Room code available":"Room code not available"}</span>
   </div>
   <div className="create-room-field create-room-field--reserved" aria-hidden="true">
      <span>Password</span>
      <input tabIndex={-1}/>
   </div>
  <button className="create-room-submit" onClick={create} disabled={!isRoomCodeAvailble}>Create public room</button>
</div>
</>
}

export default CreatePublicRoom
