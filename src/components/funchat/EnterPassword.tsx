
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { funChatSocket } from "@/contexts/socketcontext/SocketContext"
import { Globe, Sparkle } from "lucide-react"

const EnterPassword = ({ activeChat, setIsGivePassword }: any) => {

  const [pvtPassword, setPvtPassword]: any = useState("")


  const navigate = useNavigate()


  const joinPvtRoom = () => {
    if (!activeChat) {
      toast.error("Try again.");
      navigate("/o/funchats")
      return;
    }

    if (pvtPassword.trim() === "") {
      toast.error("Empty password.");
      return;
    }
    if (activeChat && activeChat.roomCode) {

      funChatSocket.emit("findAndJoinPrivateRoom", { ...activeChat, password: pvtPassword });

    }
    else {

      toast.error("Try again to join.")
      navigate("/o/funchats")
    }
  }

  useEffect(() => {


    funChatSocket.on("roomPvtJoined", (data: any) => {

      if (data.status) {
        setIsGivePassword(false);

      }
      else if (data.message === "Envailed room code.") {
        toast.error("Envailed room code.");
        navigate("/o/funchats");
      }

      else {
        toast.error("Error: " + data.message);

      }

    })
    return () => { funChatSocket.off("roomPvtJoined") }
  })

  return<>
<div className="create-room-page">
    <div className="create-room-card">
        <div className="create-room-card__header">
            <div className="create-room-card__icon"><Sparkle /></div>
            <div>
                <p className="create-room-card__eyebrow">Fun chat</p>
                <h1>{activeChat.name}</h1>
              
            </div>
        </div>


        <div className="create-room-card__body">
           
           <div className="create-room-form">
  
  
   <label className="container p-4 create-room-field">
      <span>Password</span>
      <input type="password" name="Password" value={pvtPassword||""} onChange={(e)=>setPvtPassword(e.target.value)} placeholder="Enter a secure password"/>
   </label>
   <div className=" btn-2-c-s col-12 ">
  <button className="col-5 create-room-cancel" onClick={()=>navigate("/o/funchats")} >Cancel</button>
  <button className="col-5  create-room-submit" onClick={joinPvtRoom} >Join room</button>
  </div>
</div>

           
        </div>
    </div>
</div>
</>




}

export default EnterPassword;
