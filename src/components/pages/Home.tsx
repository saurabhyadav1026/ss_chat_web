




import { useCallback, useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import TrendUsers from "../home/TrendUsers";
import "./home.css";

const Home = () => {
  const { activeUser, setActiveUser }:any = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const func = async () => await setActiveUser();
    setloading(false);
    func();
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!activeUser || (activeUser && activeUser.name && activeUser._id))
      navigate("u/chats");
    else if (!activeUser || (activeUser && activeUser.name && !activeUser._id))
      navigate("/user");
  }, [loading]);

  return (
    <div className="home-wrapper">
      <div className="home-card glass">
        <h2 className="username">{activeUser.name}</h2>

        <div className="btn-group">
          <button className="modern-btn" onClick={() => navigate("user")}>
            User
          </button>
          <button className="modern-btn" onClick={() => navigate("u/chats")}>
            Chats
          </button>
        </div>
      </div>

      <div className="trend-section glass">
        <TrendUsers />
      </div>
    </div>
  );
};

export default Home;


