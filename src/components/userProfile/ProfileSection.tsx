
import { useState,useEffect, useContext } from "react";

import Loggin from "./Loggin";
import Register from "./Register";
import Profile from "./Profile";

import ChatContext from "../../contexts/chatscontext/ChatContext";
import PasswordReset from "./PasswordReset";

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




    


  const sty1:any={
 
width:'100%',
backgroundColor:'black',
display:'flex', 
position:'fixed', 
alignItems:'center',
justifyContent:'center',
flexDirection:'column'
    }






const [profilePage,setProfileSectionPage]=useState('log');
useEffect(()=>{if(activeUser.username!=='sbhunk')setProfileSectionPage('profile')},[activeUser])

const logOut=()=>{

       props.setActiveUser({username:'sbhunk',name:"Loggin here",dp:"",loggin_token:""})
        alert("logout successfully")
        props.setPage('ChatPageSection')
        

  

}







return <div id="profile_section" style={sty1}>


<div id="profile_section_div2" >

{profilePage==='log' && <Loggin  activeUser={activeUser} setActiveUser={setActiveUser} setPage={props.setPage} setProfileSectionPage={setProfileSectionPage}/>}
{profilePage==='reg'  && <Register   setPage={props.setPage} setProfileSectionPage={setProfileSectionPage}/>}
{profilePage==='profile'&& <Profile logOut={logOut}  activeUser={activeUser} setActiveUser={setActiveUser} setPage={props.setPage} setProfileSectionPage={setProfileSectionPage}/>}
{profilePage==='forgetPassword'  && <PasswordReset    setProfileSectionPage={setProfileSectionPage}/>}



</div>
</div>


}

export default ProfileSection;





