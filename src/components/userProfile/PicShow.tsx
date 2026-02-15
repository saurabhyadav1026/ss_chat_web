import ChatContext from "../../contexts/chatscontext/ChatContext"
import { useContext } from "react";





const PicShow=()=>{

const {picShow,setPicShow}:any=useContext(ChatContext);
   if(picShow.status) return <>
   
    <div className="container-fluid bg-transparent d-flex align-items-center justify-content-center" onClick={()=>setPicShow({status:false})} style={{zIndex:"3", position:"fixed",height:"100%",width:"100%" }}>
<div className="container d-flex align-items-center bg-secondary justify-content-center m-4 p-3" style={{height:"80%",width:"80%"}}>
    <img src={picShow.url}></img>
</div>
    </div>

    
    </>
    else return <></>
}

export default PicShow;