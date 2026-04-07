
import { useContext, useEffect } from "react";
import ChatContext from "../../contexts/chatscontext/AppVariablesContext";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";


  const Profile=(props:any)=>{

const {setPicShow}:any=useContext(ChatContext);
const {setLogout,activeUser}:any=useContext(UserContext);

const navigate=useNavigate();

useEffect(()=>{
if(!activeUser._id)navigate('/user/login')
 
},[activeUser])


const logOut=()=>{
  setLogout();
    alert("logout successfully");
        navigate('/user/login')
        

  

}





return<>

<div className="container-fluid p-0 m-0 bg-white d-flex col-12 align-items-center border justify-content-center " style={{height:"100%"}} >

    <div className="container-fluid m-0 p-0  col-12 border   " style={{height:"100%"}}>
{/* username */}
<div className="d-flex align-items-center justify-content-between mb-2">
          <button className=" btn btn-light mr-2"  onClick={()=>{navigate('/u/chats');}}><b>←</b></button>
          <h6 className="mb-0 fw-bold">{activeUser.username}</h6>
          <button className="btn btn-light btn-suserProfileShow.username border">...</button>
         </div>

      <div className="row align-items-center py-3">
{/* profile image */}
        <div className="col-4 text-center">
          <img onClick={() => setPicShow({ status: true, url: activeUser.dp })} src={activeUser.dp} className="rounded-circle profile-img"></img>

        </div>




        <div className="col-8">


        
{/* for post fallower fallowing */}
        <div className="d-none justify-content-between text-center small">
          <div className="p-2"><b>12</b><br/>Posts</div>
          <div className=" p-2"><b>102</b><br/>Followers</div>
          <div className="p-2"><b>120</b><br/>Fallowing</div>

        </div>

        </div>


      </div>


      {/* bio */}
      <div className="px-2">

      <div className="fw-semibold">{activeUser.name}</div>
      <div className="small">{activeUser.about}</div>
      
      <div className="d-flex gap-2 mt-2"> 
         <button className=" d-none btn btn-light-primary btn-sm  border w-100">Fallow</button> 
        <button onClick={()=>props.setProfileSectionPage("editProfile")} className="btn btn-light-primary btn-sm  border w-100">Edit Profile </button>
    
      </div>
         
      </div>


{/* highlight */}
<div className="d-none gap-3 overflow-auto py-3 px-2">

<div className="text-center">
  <img  src="https://picsum.photos/103" className="rounded-circle heighlight-img"/>
  <div className="small">Life1</div>
</div>



</div>

<div className=" container col-12 d-flex gap-1">
    <button className="btn  btn-transparent text-danger"  onClick={()=>{logOut();}}>logout</button> 
       
</div>

{/*  for post display */}
<div className=" d-none row g-1" id="post"></div>






    </div>




</div>


</>

  }

  export default Profile;




  {/* 
  
  
  <div id="profile_dp_bar">
   <div className="card_dp" style={{backgroundImage:`url(${activeUser.dp})`}}></div>
   

  </div>
  
  
  </div>
  
  
  */}