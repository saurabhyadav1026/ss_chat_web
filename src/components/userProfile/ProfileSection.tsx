
import { useState,useEffect, useContext } from "react";

import Loggin from "./Loggin";
import Register from "./Register";
import Profile from "./Profile";

import ChatContext from "../../contexts/chatscontext/ChatContext";
import PasswordReset from "./PasswordReset";
import EditProfile from "./EditProfilePage";
import Alert from "../bootstrapCoponents/Alert";

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







return <div id="profile_section" className="container  p-5 my-5 border" >


<Alert buttonId="hlosbh" message='Incorrect Password'/>
<div id="profile_section_div2" className="container p-5 my-5 " >

{profilePage==='log' && <Loggin  activeUser={activeUser} setActiveUser={setActiveUser} setPage={props.setPage} setProfileSectionPage={setProfileSectionPage}/>}
{profilePage==='reg'  && <Register   setPage={props.setPage} setProfileSectionPage={setProfileSectionPage}/>}
{profilePage==='profile'&& <Profile logOut={logOut}  activeUser={activeUser} setActiveUser={setActiveUser} setPage={props.setPage} setProfileSectionPage={setProfileSectionPage}/>}
{profilePage==='forgetPassword'  && <PasswordReset    setProfileSectionPage={setProfileSectionPage}/>}
{profilePage==='editProfile'  && <EditProfile  activeUser={activeUser} setActiveUser={setActiveUser} setPage={props.setPage}   setProfileSectionPage={setProfileSectionPage}/>}



</div>
</div>


}

export default ProfileSection;





