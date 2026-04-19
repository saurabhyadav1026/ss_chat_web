import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ChatContext from "../../contexts/chatscontext/AppVariablesContext";
import UserContext from "../../contexts/UserContext";
import { AboutIcon, ChatIcon, MicIcon, SearchIcon, SettingIcon } from "../icons";

const LeftMenu = () => {
  const { activeUser }: any = useContext(UserContext);
  const { theme, toggleTheme }: any = useContext(ChatContext);
  const navigate = useNavigate();
  const nextTheme = theme === "dark" ? "Light" : "Dark";

  return (
    <aside className="left-rail">
      <div id="logo_icon" className="left-rail__brand" />

      <nav className="left-rail__nav">
        <div className="left-rail__item left-rail__item--primary" onClick={() => navigate("search")}>
          <span className="left-rail__glyph">
            <SearchIcon />
          </span>
          <span className="left-rail__label">Search</span>
        </div>

        <div className="left-rail__item" onClick={() => navigate("chats")}>
          <span className="left-rail__glyph">
            <ChatIcon />
          </span>
          <span className="left-rail__label">Chats</span>
        </div>

        <div className="left-rail__item" onClick={() => navigate("aichats")}>
          <span className="left-rail__glyph">AI</span>
          <span className="left-rail__label">AI</span>
        </div>

        <div className="left-rail__item left-rail__item--static">
          <span className="left-rail__glyph">
            <MicIcon />
          </span>
          <span className="left-rail__label">Voice</span>
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

          <button type="button" className="left-rail__mobile-theme" onClick={toggleTheme} aria-label={`Switch to ${nextTheme} mode`} title={`Switch to ${nextTheme} mode`}>
            <SettingIcon />
            <span>{nextTheme}</span>
          </button>

          <div className="left-rail__subactions">
            <div className="left-rail__item left-rail__item--toggle" onClick={toggleTheme} aria-label={`Switch to ${nextTheme} mode`} title={`Switch to ${nextTheme} mode`}>
              <span className="left-rail__glyph">
                <SettingIcon />
              </span>
              <span className="left-rail__label">{nextTheme} Mode</span>
            </div>

            <div className="left-rail__item left-rail__item--static">
              <span className="left-rail__glyph">
                <AboutIcon />
              </span>
              <span className="left-rail__label">About</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftMenu;
