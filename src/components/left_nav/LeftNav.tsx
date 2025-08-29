
import Profile from './account/ProfileBar.tsx';
import Logo from './bot_logo/Logo.tsx';
import Chat from './chatbar/Chat.tsx';
import OtherSetting from './other/Settings.tsx';


const LeftNav=(props:any)=>{



return (
<>

<div id="left_nav" style={props.sty_lft} >

<Logo></Logo>
 <Profile isLoggin={props.isLoggin} activeUser={props.activeUser} setPage={props.setPage}></Profile>
<Chat  activeUser={props.activeUser} searchInput={props.searchInput} updateSearchInput={props.updateSearchInput}  chatsList={props.chatsList}  setActiveChat={props.setActiveChat}  clearChats={props.clearChats}></Chat>
<OtherSetting  ></OtherSetting>


</div>

</>
);

}

export default LeftNav;