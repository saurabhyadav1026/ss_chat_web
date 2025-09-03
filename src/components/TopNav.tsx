


const TopNav =(props:any)=>{

    
    return <>

    <div id="top_nav_bar">
<span > <h1 onClick={()=>props.leftNavControl()}style={{height:"100%",width:"100%"}}> =</h1></span>
{props.activeChat!==null?<><span>{props.activeChat }</span><span id='chat_dp'></span></>: <span id='logo_icon'></span>}


    </div>
    
    </>
}
export default TopNav;