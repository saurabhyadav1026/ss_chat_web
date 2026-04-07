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
  const { activeUser }: any = useContext(UserContext);
  const name = activeUser && activeUser.name ? activeUser.name : "Community Member";
  const username = activeUser && activeUser.username ? activeUser.username : "secret-user";
  const dp = activeUser && activeUser.dp ? activeUser.dp : "https://i.ibb.co/QvwtKDYz/nodp.jpg";

  return (
    <div className="trend-user-card">
      <div className="trend-user-card__media" style={{ backgroundImage: `url(${dp})`, ...dpstyle }} />

      <div className="trend-user-card__body">
        <div className="trend-user-card__name">{name}</div>
        <div className="trend-user-card__handle">@{username}</div>

        <div className="trend-user-card__meta">
          <span className="trend-user-card__badge">Secure</span>
          <span className="trend-user-card__badge">Active</span>
        </div>

        <div className="trend-user-card__actions">
          <button type="button" className="trend-user-card__button trend-user-card__button--follow">
            Follow
          </button>
          <button type="button" className="trend-user-card__button trend-user-card__button--message">
            Message
          </button>
        </div>

        <button type="button" className="trend-user-card__button trend-user-card__button--profile">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default TrendUser;
