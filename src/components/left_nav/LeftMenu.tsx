import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import {  AiIcon, ChatIcon, FunIcon, SearchIcon, SettingIcon } from "../icons";
import Listener from "../voiceassistence/Listener";
import SpeakerContext from "@/voiceassistance/speaker/SpeakerContext";

const LeftMenu = () => {
  const { activeUser,isInternetConnection }: any = useContext(UserContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const getItemClass = (path: string) => `left-rail__item ${pathname.startsWith(path) ? "left-rail__item--active" : ""}`;
const [active,setActive]=useState(true);
const {startSpeak}:any =useContext(SpeakerContext);

const action =(text:string)=>{

  switch (text.trim().toLowerCase()) {
 
  case "open chat":
    navigate("/u/chats");
       return;
  case "open ai":
    navigate("/u/aichats/new");
       return;
  case "open fun chat":
    navigate("/o/funchats");
       return;
  case "open setting":
    navigate("/u/setting");
       return;
  case "open my profile":
    navigate("/u/myprofile");
       return;
    case "open search":
    navigate("/u/search");
       return;
   
    default:
            startSpeak("Sorry! , I am not understand.spaek again clearly.")
   
    }
}

const onlineSign={
border:"5px solid green"
}
const offlineSign={
border:"5px solid gray"
}

  return (
    <aside className="left-rail">
      <div id="logo_icon"  style={isInternetConnection?onlineSign:offlineSign} className="left-rail__brand"  onClick={()=>navigate("/")} />

      <nav className="left-rail__nav">
        <div className={getItemClass("/u/search")} onClick={() => navigate("/u/search")}>
          <span className="left-rail__glyph">
            <SearchIcon />
          </span>
          <span className="left-rail__label">Search</span>
        </div>

        <div className={getItemClass("/u/chats")} onClick={() => navigate("/u/chats")}>
          <span className="left-rail__glyph">
            <ChatIcon />
          </span>
          <span className="left-rail__label">Chats</span>
        </div>

        <div className={getItemClass("/u/aichats")} onClick={() => navigate("/u/aichats/new")}>
          <span className="left-rail__glyph"><AiIcon/></span>
          <span className="left-rail__label">AI</span>
        </div>

        <div className="left-rail__item left-rail__item--static" >
          {/* <span className="left-rail__glyph">
          onClick={() => navigate("/voice")}
            <MicIcon />
          </span> */}
          <Listener id={"app"}active={active} setActive={setActive} action={action} />
        
        </div>

      <div className={getItemClass("/funchats")} onClick={() => navigate("/o/funchats")}>
          <span className="left-rail__glyph"><FunIcon/></span>
          <span className="left-rail__label">FunCHat</span>
        </div>

      </nav>

      <div className="left-rail__footer">
        <div className="left-rail__profile">
          <div
            className="left-rail__avatar"
            style={{ backgroundImage: `url(${activeUser && activeUser.dp ? activeUser.dp : "https://i.ibb.co/QvwtKDYz/nodp.jpg"})` }}
            onClick={() => {
              if (activeUser && activeUser.dp) navigate("/u/myprofile");
             
            }}
          />

        

          <div className="left-rail__subactions">
            <div className={getItemClass("/u/setting")} onClick={()=>navigate("/u/setting")}>
              <span className="left-rail__glyph">
                <SettingIcon />
              </span>
              <span className="left-rail__label">Setting</span>
            </div>

            {/* <div className="left-rail__item left-rail__item--static">
              <span className="left-rail__glyph">
                <AboutIcon />
              </span>
              <span className="left-rail__label">About</span>
            </div> */}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftMenu;
