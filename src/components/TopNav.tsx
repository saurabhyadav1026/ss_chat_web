

const TopNav =(props:any)=>{

    
    return <>

    <div id="top_nav_bar" className="container bg-secondary text-bg-color">
<span > <h1 onClick={()=>props.leftNavControl()}style={{height:"100%",width:"100%"}}> =</h1></span>
{props.activeChat?<><span>{props.activeChat.name}</span><span id='chat_dp' style={{backgroundImage:`url(${props.activeChat.roomDP})`}}></span></>: <span id='logo_icon'></span>}


    </div>
    
    </>
}
export default TopNav;