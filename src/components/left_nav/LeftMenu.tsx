import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import {  AiIcon, ChatIcon, FunIcon, MicIcon, SearchIcon, SettingIcon } from "../icons";

const LeftMenu = () => {
  const { activeUser }: any = useContext(UserContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const getItemClass = (path: string) => `left-rail__item ${pathname.startsWith(path) ? "left-rail__item--active" : ""}`;

  return (
    <aside className="left-rail">
      <div id="logo_icon" className="left-rail__brand"  onClick={()=>navigate("/")} />

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

        <div className="left-rail__item left-rail__item--static">
          <span className="left-rail__glyph">
            <MicIcon />
          </span>
          <span className="left-rail__label">Voice</span>
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
            <div className="left-rail__item left-rail__item--toggle" onClick={()=>navigate("/u/setting")}>
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
