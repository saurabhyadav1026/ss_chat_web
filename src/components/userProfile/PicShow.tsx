import ChatContext from "../../contexts/chatscontext/ChatContext"
import { useContext } from "react";





const PicShow=()=>{

const {picShow,setPicShow}:any=useContext(ChatContext);
   if(picShow.status) return <>
   
    <div className="container-fluid bg-transparent d-flex align-items-center justify-content-center" onClick={()=>setPicShow({status:false})} style={{zIndex:"3", position:"fixed",height:"100%",width:"100%" }}>
<div className="d-flex align-items-center justify-content-center m-4 p-3">
    <img src={picShow.url}></img>
</div>
    </div>

    
    </>
    else return <></>
}

export default PicShow;