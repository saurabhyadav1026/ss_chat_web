
import { useState,useEffect, useContext } from "react";

import Loggin from "./Loggin";
import Register from "./Register";
import Profile from "./Profile";

import ChatContext from "../../contexts/chatscontext/ChatContext";
import PasswordReset from "./PasswordReset";
import EditProfile from "./EditProfilePage";
//import Alert from "../bootstrapCoponents/Alert";

/* interface ActiveUser {
  username: string;
  name: string;
  dp: string;
  loggin_token: string;
}

interface ChatContextType {
  activeUser: ActiveUser;
  setActiveUser: React.Dispatch<React.SetStateAction<ActiveUser>>;
}
 */

const ProfileSection=(props:any)=>{




   const {activeUser, setActiveUser} :any= useContext(ChatContext);




    







const [profilePage,setProfileSectionPage]=useState('log');
useEffect(()=>{if(activeUser.username!=='sbhunk')setProfileSectionPage('profile')},[activeUser])

const logOut=()=>{

       props.setActiveUser({username:'sbhunk',name:"Loggin here",dp:"",loggin_token:""})
        alert("logout successfully")
        props.setPage('ChatPageSection')
        

  

}






//<Alert buttonId="hlosbh" message='Incorrect Password'/>


return <div id="profile_section" className="container-fluid d-flex p-5 m-0 border" style={{width:"100%"}} >



<div id="profile_section_div2" className=" col-12 p-4 px-2 col-md-6 col-lg-4 col-xl-3  " style={{overflow:"auto"}} >

{profilePage==='log' && <Loggin  activeUser={activeUser} setActiveUser={setActiveUser} setPage={props.setPage} setProfileSectionPage={setProfileSectionPage}/>}
{profilePage==='reg'  && <Register   setPage={props.setPage} setProfileSectionPage={setProfileSectionPage}/>}
{profilePage==='profile'&& <Profile logOut={logOut}  activeUser={activeUser} setActiveUser={setActiveUser} setPage={props.setPage} setProfileSectionPage={setProfileSectionPage}/>}
{profilePage==='forgetPassword'  && <PasswordReset    setProfileSectionPage={setProfileSectionPage}/>}
{profilePage==='editProfile'  && <EditProfile  activeUser={activeUser} setActiveUser={setActiveUser} setPage={props.setPage}   setProfileSectionPage={setProfileSectionPage}/>}



</div>
<div className="sbh_ad_show d-none  col-12 d-md-flex col-md-6 col-lg-8 col-xl-9" style={{backgroundImage:`url("https://ik.imagekit.io/sbhtechhub/show.jpg")`,borderRadius:"5px",height:"100%"}}>

 </div>
</div>

}

export default ProfileSection;





