import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatContext from "../../contexts/chatscontext/AppVariablesContext";
import UserContext from "../../contexts/UserContext";
import { SettingIcon } from "../icons";
import { Loader2Icon } from "lucide-react";

const Profile = () => {
  const { setPicShow }: any = useContext(ChatContext);
  const { setLogout, activeUser}: any = useContext(UserContext);

  if(!activeUser)return<Loader2Icon/>

  const navigate = useNavigate();

  useEffect(() => {
    if (!activeUser._id) navigate("/user/login");
  }, []);

  const logOut = () => {
    if(setLogout())navigate("/user/login");
  };
  

  return (
    <div className="user-profile-screen">
      <div className="user-profile-card">
        <div className="user-profile-topbar">
          <button className="user-profile-back" onClick={() => navigate("/u/chats")}>
            Back
          </button>
          <div className="user-profile-handle-chip">@{activeUser.username}</div>
          <div className="left-rail__item left-rail__item--toggle" onClick={()=>navigate("/u/setting")}>
                        <span className="left-rail__glyph">
                          <SettingIcon />
                        </span>
                   
                      </div>
         {/*  <button className="user-profile-menu">Menu</button> */}
        </div>

        <div className="user-profile-hero">
          <div>
            <img onClick={() => setPicShow({ status: true, url: activeUser.dp })} src={activeUser.dp} className="user-profile-avatar" />
          </div>

          <div>
            <h2 className="user-profile-name">{activeUser.name}</h2>
            <p className="user-profile-handle">@{activeUser.username}</p>
            <p className="user-profile-bio">{activeUser.about || "Add a short bio to make your profile feel more personal."}</p>

          

            <div className="user-profile-actions">
              <button className="user-profile-button user-profile-button--ghost" onClick={() => navigate("edit")}>
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
