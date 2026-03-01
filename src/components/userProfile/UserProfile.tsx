import ChatContext from "../../contexts/chatscontext/ChatContext"
import { useContext } from "react";

import "./user_profile_css.css";


const UserProfile = () => {

  const { setPicShow, userProfileShow, setUserProfilePicShow,setActiveChatByChatRoom }: any = useContext(ChatContext);
  
if (userProfileShow.status) return <>

<div className="container-fluid p-0 m-0 bg-white d-flex col-12 align-items-center justify-content-center vh-100"  style={{ position: "fixed" }}>

    <div className="container-fluid m-0 p-0  col-12 vh-100 border col-md-6  " >
{/* username */}
<div className="d-flex align-items-center justify-content-between mb-2">
          <button className=" btn btn-light mr-2" onClick={() => setUserProfilePicShow({ status: false })}><b>←</b></button>
          <h6 className="mb-0 fw-bold">@{userProfileShow.username}</h6>
          <button className="btn btn-light btn-suserProfileShow.username border">...</button>
        </div>

      <div className="row align-items-center py-3">
{/* profile image */}
        <div className="col-4 text-center">
          <img onClick={() => setPicShow({ status: true, url: userProfileShow.dp })} src={userProfileShow.dp} className="rounded-circle profile-img"></img>

        </div>




        <div className="col-8">


        
{/* for post fallower fallowing */}
        <div className="d-flex justify-content-between d-none text-center small">
          <div><b>12</b><br/>Posts</div>
          <div><b>102</b><br/>Followers</div>
          <div><b>120</b><br/>Fallowing</div>

        </div>

        </div>


      </div>


      {/* bio */}
      <div className="px-2">

      <div className="fw-semibold">{userProfileShow.name}</div>
      <div className="small">{userProfileShow.about}</div>
      
      <div className="d-flex gap-2 mt-2"> 
        <button className=" d-none btn btn-light-primary btn-sm  border w-100">Fallow</button>
        <button className="btn btn-success btn-sm  border w-100" onClick={()=>{setActiveChatByChatRoom(userProfileShow.room);setUserProfilePicShow({status:false});}}>Message </button>
     
      </div>
            
      </div>


{/* highlight */}
<div className="d-none gap-3 overflow-auto py-3 px-2">

<div className="text-center">
  <img  src="https://picsum.photos/103" className="rounded-circle heighlight-img"/>
  <div className="small">Life1</div>
</div>



</div>



{/*  for post display */}
<div className="row g-1 d-none" id="post"></div>






    </div>




</div>



  </>


  else return <></>
}

export default UserProfile;




