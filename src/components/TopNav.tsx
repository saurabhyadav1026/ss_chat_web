
const responser:string=import.meta.env.VITE_API_KEY;

const TopNav =(props:any)=>{

    
    return <>

    <div id="top_nav_bar">
<span > <h1 onClick={()=>props.leftNavControl()}style={{height:"100%",width:"100%"}}> =</h1></span>
{props.activeChat.name!==null?<><span>{props.activeChat.name }</span><span id='chat_dp' style={{backgroundImage:`url(${responser}/user/getdp/${props.activeChat.username})`}}></span></>: <span id='logo_icon'></span>}


    </div>
    
    </>
}
export default TopNav;