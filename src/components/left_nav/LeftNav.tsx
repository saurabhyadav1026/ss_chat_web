
import AppLogo from './AppLogo/Logo.tsx';
import Chat from './chatbar/Chat.tsx';
import OtherSetting from './voicebar/VoiceButton.tsx';


const LeftNav=(props:any)=>{



return (
<>

<div id="left_nav" style={props.sty_lft} >

<AppLogo   ></AppLogo>
<Chat   isLoggin={props.isLoggin} activeUser={props.activeUser} setPage={props.setPage}   chatsList={props.chatsList}  setActiveChat={props.setActiveChat}  clearChats={props.clearChats}></Chat>
<OtherSetting  ></OtherSetting>


</div>

</>
);

}

export default LeftNav;