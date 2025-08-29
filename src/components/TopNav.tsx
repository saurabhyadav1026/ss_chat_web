
import { BotIcon } from "./icons.tsx";



const TopNav =(props:any)=>{

    
    return <>

    <div id="top_nav_bar">
<span > <h1 onClick={()=>props.leftNavControl()}style={{height:"100%",width:"100%"}}> =</h1></span>
<span id="tell_load"></span>
<span > <h6 style={{color:"green",height:"100%",width:"100%"}}>{props.isOnline}</h6></span>
<span><h2 style={{display:"inline"}}>{props.activeChat!==null?props.activeChat:'SBH CHATBOT'}  <BotIcon></BotIcon></h2> </span>


    </div>
    
    </>
}
export default TopNav;