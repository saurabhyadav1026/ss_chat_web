
import { useNavigate } from "react-router-dom";


const TopNav =(props:any)=>{
    const navigate =useNavigate();
    
    return <>
    <div id="top_nav_bar" className="container-fluid m-0 bg-secondary text-bg-color">
<span  className="d-flex   d-md-none "> <h1 onClick={()=>{navigate(props.toBack);}}style={{height:"100%",width:"100%"}}> =</h1></span>
<span  className="d-none d-md-flex "> <h1 style={{height:"100%",width:"100%"}}> =</h1></span>

 


{props.activeChat?<>
<span onClick={()=>navigate(`/user/profile/${props.activeChat._id}`)}>{props.activeChat.name}</span>
<span id='chat_dp' onClick={()=>navigate(`/user/profile/${props.activeChat._id}`)} style={{backgroundImage:`url(${props.activeChat.dp})`}}> </span>
</>: <span id='logo_icon'></span>}


    </div>
    
    </>
}
export default TopNav;