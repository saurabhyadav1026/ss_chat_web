import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import MessageContext from "../../contexts/MessagesContext";
import ChatContext from "../../contexts/chatscontext/AppVariablesContext";
import "./user_profile_css.css";

const UserProfile = () => {
  const { setPicShow }: any = useContext(ChatContext);
  const { getRoomIdByReceiverId }: any = useContext(MessageContext);
  const [user, setUser]: any = useState({});
  const { userId, page2Id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId)
      api
        .get("users/userprofile", { params: { _id: userId } })
        .then((res) => {
          if (res.data.status) setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [userId]);

  useEffect(() => {
    if (page2Id)
      api
        .get("users/userprofile", { params: { _id: page2Id } })
        .then((res) => {
          if (res.data.status) setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [page2Id]);

  return (
    <div className="user-profile-screen">
      <div className="user-profile-card">
        <div className="user-profile-topbar">
          <button className="user-profile-back" onClick={() => navigate("/u/chats")}>
            Back
          </button>
          <div className="user-profile-handle-chip">@{user.username}</div>
          <button className="user-profile-menu">Profile</button>
        </div>

        <div className="user-profile-hero">
          <div>
            <img onClick={() => setPicShow({ status: true, url: user.dp })} src={user.dp} className="user-profile-avatar" />
          </div>

          <div>
            <h2 className="user-profile-name">{user.name}</h2>
            <p className="user-profile-handle">@{user.username}</p>
            <p className="user-profile-bio">{user.about || "This user has not added a bio yet."}</p>

            <div className="user-profile-stats">
              <span className="user-profile-chip">Direct profile view</span>
              <span className="user-profile-chip">Messaging available</span>
              <span className="user-profile-chip">Clean focus layout</span>
            </div>

            <div className="user-profile-actions">
              <button
                className="user-profile-button user-profile-button--primary"
                onClick={async () => {
                  const t = await getRoomIdByReceiverId(user._id);
                  if (t.status) navigate(`/u/chats/${t.roomId}`);
                }}
              >
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
