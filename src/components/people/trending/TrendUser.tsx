




import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import "./trendUser.css";

const dpstyle = {
  borderRadius: "15px",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

const TrendUser = () => {
  const { activeUser }:any = useContext(UserContext);

  return (
    <div className="user-card">
      <div
        className="user-dp"
        style={{ backgroundImage: `url(${activeUser.dp})`, ...dpstyle }}
      ></div>

      <div className="user-info">
        <div className="name">{activeUser.name}</div>
        <div className="username">@{activeUser.username}</div>

        <div className="btn-row">
          <button className="follow">Follow</button>
          <button className="message">Message</button>
        </div>

        <button className="profile-btn">View Profile</button>
      </div>
    </div>
  );
};

export default TrendUser;

