import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import ChatContext from "../../contexts/chatscontext/AppVariablesContext";
import "./user_profile_css.css";
import UserLoading from "../loading-components/UserLoading";
import { EllipsisVertical } from "lucide-react";
import UserContext from "@/contexts/UserContext";

const UserProfile = () => {
  const { setPicShow }: any = useContext(ChatContext);
  
  const [user, setUser]: any = useState({});
  const { username, page2Id } = useParams();
  const [isLoading,setLoading]:any=useState(false);
  const {activeUser}:any=useContext(UserContext);
  const navigate = useNavigate();




  useEffect(() => {
     setLoading(true)
    if (username)
     
      if(username===activeUser.username){
        navigate("/u/myprofile");
        return;
      }
      api.get("users/userprofile", { params: {username: username } })
        .then((res) => {
          if (res.data.status) setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
        setLoading(false)
  }, [username]);

  useEffect(() => {
    setLoading(true)
    if (page2Id)
      api
        .get("users/userprofile", { params: { username: page2Id } })
        .then((res) => {
          if (res.data.status) setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
        setLoading(false)
  }, [page2Id]);


const getRoomIdByReceiverId=async(receiverId:any)=>{
return [activeUser._id,receiverId].sort().join("-");
}



  if(isLoading)return <UserLoading/>

  
else if(user._id) return (
    <div className="user-profile-screen">
      <div className="user-profile-card">
        <div className="user-profile-topbar">
          <button className="user-profile-back" onClick={() => navigate("/u/chats")}>
            Back
          </button>
          <div className="user-profile-handle-chip">@{user.username}</div>
          <button className="user-profile-menu"><EllipsisVertical/></button>
        </div>

        <div className="user-profile-hero">
          <div>
            <img onClick={() => setPicShow({ status: true, url: user.dp })} src={user.dp} className="user-profile-avatar" />
          </div>

          <div>
            <h2 className="user-profile-name">{user.name}</h2>
       {/*      <p className="user-profile-handle">@{user.username}</p> */}
            <p className="user-profile-bio">{user.about || "This user has not added a bio yet."}</p>

            <div className="user-profile-stats">
             {/*  <span className="user-profile-chip">Direct profile view</span>
              <span className="user-profile-chip">Messaging available</span>
              <span className="user-profile-chip">Clean focus layout</span> */}
            </div>

            <div className="user-profile-actions">
              <button
                className="user-profile-button user-profile-button--primary"
                onClick={() => navigate(`/u/chats/${getRoomIdByReceiverId(user._id)}`)}
              >
                Message
              </button>
                 <button
                className="user-profile-button user-profile-button--primary"
                 onClick={() => navigate(`/u/chats/${getRoomIdByReceiverId(user._id)}`)}
              >
                Fallow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  else return<>
    <div className="user-profile-screen">
    <div>
      <h2 className="text-danger">----  {username||page2Id}----</h2>
      <h4> User Not found </h4>
    </div>
    </div>
  </>
};

export default UserProfile;
