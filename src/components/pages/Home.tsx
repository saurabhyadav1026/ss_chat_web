import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatContext from "../../contexts/chatscontext/AppVariablesContext";
import UserContext from "../../contexts/UserContext";
import TrendUsers from "../home/TrendUsers";
import { SettingIcon } from "../icons";
import "./home.css";

const Home = () => {
  const { activeUser, setActiveUser }: any = useContext(UserContext);
  const { theme, toggleTheme }: any = useContext(ChatContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const nextTheme = theme === "dark" ? "Light" : "Dark";

  useEffect(() => {
    const func = async () => await setActiveUser();
    setLoading(false);
    func();
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!activeUser || (activeUser && activeUser.name && activeUser._id)) navigate("u/chats");
    else if (!activeUser || (activeUser && activeUser.name && !activeUser._id)) navigate("/user");
  }, [loading]);

  return (
    <div className="home-shell">
      <div className="home-orb home-orb--one" />
      <div className="home-orb home-orb--two" />

      <div className="home-wrapper">
        <section className="home-card glass">
          <div className="home-copy">
            <div className="home-toolbar">
              <p className="home-kicker">Private messaging reimagined</p>

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

            <h1 className="home-title">{activeUser && activeUser.name ? activeUser.name : "Secret Secure"}</h1>
            <p className="home-subtitle">
              A calmer front door for your chat app. Move between your profile, direct messages, and AI spaces in a cleaner,
              more welcoming layout.
            </p>

            <div className="home-actions">
              <button className="modern-btn" onClick={() => navigate("user")}>
                Open Profile
              </button>
              <button className="modern-btn modern-btn--ghost" onClick={() => navigate("u/chats")}>
                Go to Chats
              </button>
            </div>
          </div>

          <div className="home-stat-grid">
            <div className="home-stat-card">
              <span>Focus</span>
              <strong>1 place</strong>
              <p>Everything important now sits in a clearer visual hierarchy, from the nav rail to the thread view.</p>
            </div>

            <div className="home-stat-card">
              <span>Flow</span>
              <strong>Fast</strong>
              <p>Jump into conversations, search people quickly, and keep the interface light without losing personality.</p>
            </div>

            <div className="home-stat-card">
              <span>Look</span>
              <strong>Fresh</strong>
              <p>The new UI leans into glassy depth, warmer highlights, and softer contrast for everyday use.</p>
            </div>
          </div>
        </section>

        <section className="trend-section glass">
          <TrendUsers />
        </section>
      </div>
    </div>
  );
};

export default Home;
