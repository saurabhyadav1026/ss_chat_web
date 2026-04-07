import ChatContext from "../../contexts/chatscontext/AppVariablesContext"
import { useContext, useEffect, useState } from "react";

import "./user_profile_css.css";
import MessageContext from "../../contexts/MessagesContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";


const UserProfile = () => {

  const { setPicShow }: any = useContext(ChatContext);
  const { getRoomIdByReceiverId }: any = useContext(MessageContext);
  const [user, setUser] :any= useState({});
  const { userId,page2Id } = useParams();

  const navigate=useNavigate();
  const location=useLocation();
  useEffect(() => {
   if(userId) api.get("users/userprofile", { params: { _id: userId } })
      .then((res) => { if (res.data.status) setUser(res.data.user) })
      .catch((err) => {
        console.log(err);
      })
   
  }, [userId])
 useEffect(() => {
  
      if(page2Id) api.get("users/userprofile", { params: { _id: page2Id } })
      .then((res) => { if (res.data.status) setUser(res.data.user) })
      .catch((err) => {
        console.log(err);
      })
  }, [page2Id])

  return <>

    <div className="container-fluid p-0 m-0 bg-white d-flex col-12 align-items-center justify-content-center vh-100" >

      <div className="container-fluid m-0 p-0  col-12 vh-100 border col-md-6  " >
        {/* username */}
        <div className="d-flex align-items-center justify-content-between mb-2">
          <button className=" btn btn-light mr-2" onClick={() => navigate("/u/chats")}><b>←</b></button>
          <h6 className="mb-0 fw-bold">@{user.username}</h6>
          <button className="btn btn-light btn-suserProfileShow.username border">...</button>
        </div>

        <div className="row align-items-center py-3">
          {/* profile image */}
          <div className="col-4 text-center">
            <img onClick={() => setPicShow({ status: true, url: user.dp })} src={user.dp} className="rounded-circle profile-img"></img>

          </div>




          <div className="col-8">



            {/* for post fallower fallowing */}
            <div className="d-flex justify-content-between d-none text-center small">
              <div><b>12</b><br />Posts</div>
              <div><b>102</b><br />Followers</div>
              <div><b>120</b><br />Fallowing</div>

            </div>

          </div>


        </div>


        {/* bio */}
        <div className="px-2">

          <div className="fw-semibold">{user.name}</div>
          <div className="small">{user.about}</div>

          <div className="d-flex gap-2 mt-2">
            <button className=" d-none btn btn-light-primary btn-sm  border w-100">Fallow</button>
            <button className="btn btn-success btn-sm  border w-100" onClick={async() => { const t= await getRoomIdByReceiverId(user._id); if(t.status)navigate(`/u/chats/${t.roomId}`) }}>Message </button>

          </div>
        </div>


        {/* highlight */}
        <div className="d-none gap-3 overflow-auto py-3 px-2">

          <div className="text-center">
            <img src="https://picsum.photos/103" className="rounded-circle heighlight-img" />
            <div className="small">Life1</div>
          </div>



        </div>



        {/*  for post display */}
        <div className="row g-1 d-none" id="post"></div>






      </div>




    </div>



  </>


}

export default UserProfile;




