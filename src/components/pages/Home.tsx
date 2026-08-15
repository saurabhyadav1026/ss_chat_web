import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatContext from "../../contexts/chatscontext/AppVariablesContext";
import UserContext from "../../contexts/UserContext";
import { LoadingIcon, SettingIcon, ChatIcon, SearchIcon, AiIcon, FunIcon, ProfileIcon } from "../icons";
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

            

            <div className="app-shortcut-card glass clickable" onClick={() => navigate("/call")}>
              <div className="app-shortcut-card__icon call-theme">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div className="app-shortcut-card__body">
                <h3>Telephony Connection</h3>
                <p>Connect immediately over fully secured local and network voice call sessions.</p>
              </div>
            </div>
          </section>

          {/* Developer Space */}
        {/*   <section className="dev-space glass">
            <h2 className="section-title">Developer Workspace</h2>
            <p className="section-desc">Manage experimental sandbox files, directories, and environment keys.</p>
            <div className="dev-actions">
              <button className="dev-btn" onClick={async () => await folderper()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-folder-key"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><circle cx="12" cy="14" r="2"/><path d="m14 12 3-3 1.5 1.5"/></svg>
                Grant Folder Access
              </button>
              <button className="dev-btn" onClick={async () => await write()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-output"><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 18H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9l7 7v6"/><path d="M16 22H8"/></svg>
                Verify Write Permission
              </button>
              <button className="dev-btn" onClick={() => console.log(import.meta.env.VITE_API_KEY)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-key-round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5"/></svg>
                Dump Environment Key
              </button>
            </div>
          </section> */}



        </div>
      </div>
    </>
  );
};

export default Home;
