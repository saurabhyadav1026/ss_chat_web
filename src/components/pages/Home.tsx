import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatContext from "../../contexts/chatscontext/AppVariablesContext";
import UserContext from "../../contexts/UserContext";
import { LoadingIcon, SettingIcon, ChatIcon, SearchIcon, AiIcon, FunIcon } from "../icons";
import "./home.css";
const Home = () => {
  const { activeUser, setActiveUser, isUserLoading }: any = useContext(UserContext);
  const { theme, toggleTheme }: any = useContext(ChatContext);
  const navigate = useNavigate();
  const nextTheme = theme === "dark" ? "Light" : "Dark";


  useEffect(() => {
    const func = async () => await setActiveUser();
    func();
  }, []);

  return (
    <>
      <div className="home-shell">
        <div className="home-orb home-orb--one" />
        <div className="home-orb home-orb--two" />

        <div className="home-wrapper">
          {/* Top Welcome Panel */}
          <section className="home-welcome-card glass">
            <div className="welcome-header">
              <div className="brand-badge">
                <span className="badge-dot"></span>
                <span>SS Chat Platform</span>
              </div>
              <button
                type="button"
                className="home-theme-btn"
                onClick={toggleTheme}
                aria-label={`Switch to ${nextTheme} mode`}
                title={`Switch to ${nextTheme} mode`}
              >
                <span className="home-theme-btn__icon">
                  <SettingIcon />
                </span>
                <span>{nextTheme} Mode</span>
              </button>
            </div>

            <div className="welcome-user-info">
              {isUserLoading ? (
                <div className="welcome-loading">
                  <LoadingIcon />
                  <span>Loading account details...</span>
                </div>
              ) : activeUser && activeUser.name ? (
                <div className="welcome-user">
                  <div 
                    className="welcome-avatar" 
                    style={{ backgroundImage: `url(${activeUser.dp || "https://i.ibb.co/QvwtKDYz/nodp.jpg"})` }}
                  />
                  <div>
                    <h1 className="welcome-title">Welcome back, {activeUser.name}</h1>
            
                  </div>
                </div>
              ) : (
                <div className="welcome-user">
                  <div className="welcome-avatar guest-avatar" />
                  <div>
                    <h1 className="welcome-title">Sign In Required</h1>
                
                  </div>
                </div>
              )}
            </div>

            {!(activeUser && activeUser._id) && (
              <div className="welcome-actions">
                <button className="modern-btn" onClick={() => navigate("/user/login")}>
                  Log in to account
                </button>
              </div>
            )}
          </section>

          {/* Quick Access Apps Grid */}
          <section className="apps-grid">
            <div className="app-shortcut-card glass clickable" onClick={() => navigate("u/chats")}>
              <div className="app-shortcut-card__icon chat-theme">
                <ChatIcon />
              </div>
              <div className="app-shortcut-card__body">
                <h3>Inbox & Chats</h3>
              
              </div>
            </div>

            <div className="app-shortcut-card glass clickable" onClick={() => navigate("u/search")}>
              <div className="app-shortcut-card__icon search-theme">
                <SearchIcon />
              </div>
              <div className="app-shortcut-card__body">
                <h3>Discover Friends</h3>
              
              </div>
            </div>

            <div className="app-shortcut-card glass clickable" onClick={() => navigate("u/aichats/new")}>
              <div className="app-shortcut-card__icon ai-theme">
                <AiIcon />
              </div>
              <div className="app-shortcut-card__body">
                <h3>SBH AI Companion</h3>
             
              </div>
            </div>

            <div className="app-shortcut-card glass clickable" onClick={() => navigate("o/funchats/")}>
              <div className="app-shortcut-card__icon fun-theme">
                <FunIcon />
              </div>
              <div className="app-shortcut-card__body">
                <h3>Fun Chat Rooms</h3>
         
              </div>
            </div>

    
          </section>



        </div>
      </div>
    </>
  );
};

export default Home;
