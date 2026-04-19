import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatContext from "../../contexts/chatscontext/AppVariablesContext";
import UserContext from "../../contexts/UserContext";

const Profile = (props: any) => {
  const { setPicShow }: any = useContext(ChatContext);
  const { setLogout, activeUser }: any = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeUser._id) navigate("/user/login");
  }, []);

  const logOut = () => {
    setLogout();
    alert("logout successfully");
    navigate("/user/login");
  };

  return (
    <div className="user-profile-screen">
      <div className="user-profile-card">
        <div className="user-profile-topbar">
          <button className="user-profile-back" onClick={() => navigate("/u/chats")}>
            Back
          </button>
          <div className="user-profile-handle-chip">@{activeUser.username}</div>
          <button className="user-profile-menu">Menu</button>
        </div>

        <div className="user-profile-hero">
          <div>
            <img onClick={() => setPicShow({ status: true, url: activeUser.dp })} src={activeUser.dp} className="user-profile-avatar" />
          </div>

          <div>
            <h2 className="user-profile-name">{activeUser.name}</h2>
            <p className="user-profile-handle">@{activeUser.username}</p>
            <p className="user-profile-bio">{activeUser.about || "Add a short bio to make your profile feel more personal."}</p>

            <div className="user-profile-stats">
              <span className="user-profile-chip">Private account space</span>
              <span className="user-profile-chip">Display picture ready</span>
              <span className="user-profile-chip">Profile controls</span>
            </div>

            <div className="user-profile-actions">
              <button className="user-profile-button user-profile-button--ghost" onClick={() => props.setProfileSectionPage("editProfile")}>
                Edit Profile
              </button>
              <button className="user-profile-button user-profile-button--danger" onClick={logOut}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
