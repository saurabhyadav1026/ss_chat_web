import { CheckCircle2,  Info, XCircle } from "lucide-react"
import {  useState } from "react"
import api from "../../api/api"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const CreateRoom=({roomType}:any)=>{

 const [room,setRoom]:any=useState({ name:"",roomCode:"  "})
 const [isRoomCodeAvailble, setIsRoomCodeAvailble]=useState(false)


const navigate=useNavigate()

const updateRoom=(e:any)=>{
   
setRoom({...room,[e.target.name]:e.target.value});

}

const checkIsRoomAvailble=async ()=>{
   if(room.roomCode.trim().toLocaleLowerCase()==="join" || room.roomCode.trim().toLocaleLowerCase()==="new")setIsRoomCodeAvailble(false)
await api.get("/funchats/isroomcodeexist",{params:{roomCode:room.roomCode}})
.then((res:any)=>{
    if(res.data.status)setIsRoomCodeAvailble(false)
        else setIsRoomCodeAvailble(true)
}).catch((errr:any)=>{
    console.log(errr)
    setIsRoomCodeAvailble(false)
})
}


const create =async()=>{
 if(isRoomCodeAvailble)  {
   await api.post("/funchats/createRoom",{...room,type:roomType})
   .then((res)=>{
      if(res.data.status){
         navigate("/o/funchats/"+res.data.roomCode)
      }
      else{
      toast.error(res.data.message);
      }
   })
 }

}



return<>
<div className="create-room-form">
  
   <label className="create-room-field">
      <span>Room name</span>
      <input name="name" value={room.name||""} onChange={updateRoom} placeholder="Weekend catch-up"/>
   </label>
   <label className="create-room-field">
      <span>Room code <span title="Use a unique word for your room code"><Info /></span></span>
      <input name="roomCode" value={room.roomCode||""} onChange={updateRoom} onKeyUp={checkIsRoomAvailble} placeholder="your-room-code"/>
   </label>
   {(room.roomCode.trim()!=="") &&<div className={`create-room-status ${isRoomCodeAvailble?"create-room-status--available":"create-room-status--unavailable"}`}>
      {isRoomCodeAvailble?<CheckCircle2 />:<XCircle />}
      <span>{isRoomCodeAvailble?"Room code available":"Room code not available"}</span>
   </div>}
   {roomType==="private" &&<label className="create-room-field">
      <span>Password</span>
      <input type="password" name="password" value={room.password||""} onChange={updateRoom} placeholder="Enter a secure password"/>
   </label>}
      <div className=" btn-2-c-s col-12 ">
     <button className="col-5 create-room-cancel" onClick={()=>navigate("/o/funchats")} >Cancel</button>
  <button className=" col-5 create-room-submit" onClick={create} >Create {roomType} room</button>
  </div>
</div>
</>
}

export default CreateRoom
