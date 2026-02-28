import { useContext } from "react";
import ChatContext from "../contexts/chatscontext/ChatContext";


const TopNav =(props:any)=>{

    const {setActiveChat,showUserById}:any=useContext(ChatContext);
    
    return <>

    <div id="top_nav_bar" className="container-fluid m-0 bg-secondary text-bg-color">
<span  className="d-flex   d-md-none "> <h1 onClick={()=>{props.change_device_show(0);setActiveChat(null)}}style={{height:"100%",width:"100%"}}> =</h1></span>
<span  className="d-none d-md-flex "> <h1 onClick={()=>props.change_device_show(1)}style={{height:"100%",width:"100%"}}> =</h1></span>

 


{props.activeChat?<><span>{props.activeChat.name}</span><span id='chat_dp' onClick={()=>showUserById(props.activeChat.members)} style={{backgroundImage:`url(${props.activeChat.roomDP})`}}></span></>: <span id='logo_icon'></span>}


    </div>
    
    </>
}
export default TopNav;