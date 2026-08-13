import { useState } from "react";
import { Globe2, LockKeyhole, Sparkles } from "lucide-react";
import "./create-room.css";
import CreateRoom from "./CreateRoom";

const CreateFunRoom=()=>{

 const [roomType,setRoomType]:any=useState("public");


return<>
<div className="create-room-page">
    <div className="create-room-card">
        <div className="create-room-card__header">
            <div className="create-room-card__icon"><Sparkles /></div>
            <div>
                <p className="create-room-card__eyebrow">Fun chat</p>
                <h1>Create a room</h1>
                <p>Pick a room style and set up a space for your conversation.</p>
            </div>
        </div>

        <div className="create-room-type">
            <span className="create-room-type__label">Room visibility</span>
            <div className="create-room-type__options">
                <button className={`create-room-type__option ${roomType==="public"?"create-room-type__option--active":""}`} onClick={()=>{if(roomType!=="public")setRoomType("public")}}>
                    <Globe2 />
                    <span><strong>Public</strong><small>Anyone with the code can join</small></span>
                </button>
                <button className={`create-room-type__option ${roomType==="private"?"create-room-type__option--active":""}`} onClick={()=>{if(roomType!=="private")setRoomType("private")}}>
                    <LockKeyhole />
                    <span><strong>Private</strong><small>Protected with a password</small></span>
                </button>
            </div>
        </div>

        <div className="create-room-card__body">
           <CreateRoom roomType={roomType}/>
        </div>
    </div>
</div>
</>

}

export default CreateFunRoom;
