import { CheckCircle2, Info, LockKeyhole, XCircle } from "lucide-react"
import { useEffect, useState } from "react"
import api from "../../api/api"
import { useNavigate } from "react-router-dom"

const CreatePrivateRoom=()=>{

 const [data]:any=useState({ })
 const [isRoomCodeAvailble, setIsRoomCodeAvailble]=useState(false)
 const [roomCode,setRoomCode]=useState("")

const navigate=useNavigate()

const updateRoomCode=(e:any)=>{
setRoomCode(e.target.value);

}

useEffect(()=>{
if(roomCode===""){setIsRoomCodeAvailble(false);return}
   api.get("/funchats/isroomcodeavailble",{params:{roomCode:roomCode}})
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
      <div className="create-room-form__intro-icon"><LockKeyhole /></div>
      <div><h2>Private room</h2><p>Add a password so only your invited guests can enter.</p></div>
   </div>
   <label className="create-room-field">
      <span>Room name</span>
      <input name="name" value={data.name||""} placeholder="Late-night plans"/>
   </label>
   <label className="create-room-field">
      <span>Room code <span title="Use a unique word for your room code"><Info /></span></span>
      <input name="roomCode" value={roomCode||""} onChange={updateRoomCode} placeholder="your-room-code"/>
   </label>
   <div className={`create-room-status ${isRoomCodeAvailble?"create-room-status--available":"create-room-status--unavailable"}`}>
      {isRoomCodeAvailble?<CheckCircle2 />:<XCircle />}
      <span>{isRoomCodeAvailble?"Room code available":"Room code not available"}</span>
   </div>
   <label className="create-room-field">
      <span>Password</span>
      <input type="password" name="Password" value={data.password||""} placeholder="Enter a secure password"/>
   </label>
   <button className="create-room-submit" onClick={create} disabled={!isRoomCodeAvailble}>Create private room</button>

</div>
</>
}

export default CreatePrivateRoom;
