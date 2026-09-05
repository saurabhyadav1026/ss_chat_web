
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Sparkle} from "lucide-react"
import api from "@/api/api"
import { error } from "three/src/utils.js"

const JoinRoom = () => {

  const [roomCode, setRoomCode]: any = useState("")

const [isRequesting, setIsRequesting]=useState(false);

  const navigate = useNavigate()




  const joinRoom = async(roomCode:String) => {
   setIsRequesting(true);
    if (roomCode.trim()==="" ||  roomCode.toLowerCase()==="new" || roomCode.toLowerCase()==="join")  {
      toast.error("Invalid room code 1");
      setIsRequesting(false);
           return;
    }

  await api.get("/funchats/isroomcodeexist",{params:{roomCode:roomCode.trim()}})
.then((res:any)=>{
    if(res.data.status){
      navigate("/o/funchats/"+roomCode);
    }
        else {
          setIsRequesting(false);
          toast.error("Invalid room code2 ");
        }
}).catch(()=>{
  console.error(error)
  setIsRequesting(false);
toast.error("Invalid room code 3");
})
  }



  return<>
<div className="create-room-page">
    <div className="create-room-card">
        <div className="create-room-card__header">
            <div className="create-room-card__icon"><Sparkle /></div>
            <div>
                <p className="create-room-card__eyebrow">Fun chat</p>
                <h1>Enter Room code</h1>
              
            </div>
        </div>


        <div className="create-room-card__body">
           
           <div className="create-room-form">
  
  
   <label className="container p-4 create-room-field">
      
      <input type="text" name="roomCode" value={roomCode||""} readOnly={isRequesting} onChange={(e)=>setRoomCode(e.target.value)} placeholder="Enter a room code...."/>
   </label>
   <div className=" btn-2-c-s col-12 ">
  <button className="col-5 create-room-cancel" onClick={()=>navigate("/o/funchats")} >Cancel</button>
  <button className="col-5  create-room-submit" onClick={()=>joinRoom(roomCode)} >Join room</button>
  </div>
</div>

           
        </div>
    </div>
</div>
</>




}

export default JoinRoom;
