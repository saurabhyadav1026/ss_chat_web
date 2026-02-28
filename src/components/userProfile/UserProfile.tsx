import ChatContext from "../../contexts/chatscontext/ChatContext"
import { useContext } from "react";





const UserProfile=()=>{

const {setPicShow,userProfileShow,setUserProfilePicShow}:any=useContext(ChatContext);
   if(userProfileShow.status) return <>
   
    <div className="container-fluid bg-transparent d-flex align-items-center justify-content-center" onClick={()=>setUserProfilePicShow({status:false})} style={{zIndex:"3", position:"fixed",height:"100%",width:"100%" }}>
<div className="container d-flex align-items-center bg-secondary justify-content-center m-4 p-3" style={{flexDirection:"column", height:"80%",width:"80%"}}>

  <div className="d-flex p-3" style={{width:"100%",justifyContent:"space-between"}}>
      <button className="btn btn-primary"  onClick={()=>{setUserProfilePicShow({status:false});}}>Back</button>
        
      
    </div>
    <div className="flex flex-col items-center pb-10">
        <img  onClick={()=>setPicShow({status:true,url:userProfileShow.dp})} className="w-24 h-24 mb-3 rounded-full shadow-lg" src={userProfileShow.dp} alt="Bonnie image"/><br/>

       
        <h5 className="mb-1 text-xl font-medium  ">{userProfileShow.name}</h5>
      <h6 className="mb-1 text-xl font-medium ">@{userProfileShow.username}</h6>
        <span className="text-sm text-gray-500 dark:text-gray-800">{userProfileShow.about}</span>
       
    </div>
    






</div>
    </div>

    
    </>
    else return <></>
}

export default UserProfile;