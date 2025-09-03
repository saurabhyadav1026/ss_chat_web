
import { useState,useEffect } from "react";

import Loggin from "./Loggin";
import Register from "./Register";
import Profile from "./Profile";

const ProfileSection=(props:any)=>{


    


  const sty1:any={
height:'100%',
width:'100%',
backgroundColor:'black',
display:'flex', 
position:'fixed', 
alignItems:'center',
justifyContent:'center',
flexDirection:'column'
    }



const [profilePage,setProfileSectionPage]=useState('log');
useEffect(()=>{if(props.activeUser.username!=='sbhunk')setProfileSectionPage('profile')},[props.activeUser])

const logOut=()=>{

       props.setActiveUser({username:'sbhunk',name:"Loggin here",dp:"",loggin_token:""})
        alert("logout successfully")
        props.setPage('ChatPageSection')
        

  

}





console.log(profilePage)
console.log(props.activeUser)


return <div id="profile_section" style={sty1}>


<div id="profile_section_div2" >

{profilePage==='log' && <Loggin  activeUser={props.activeUser} setActiveUser={props.setActiveUser} setPage={props.setPage} setProfileSectionPage={setProfileSectionPage}/>}
{profilePage==='reg'  && <Register   setPage={props.setPage} setProfileSectionPage={setProfileSectionPage}/>}
{profilePage==='profile'&& <Profile logOut={logOut}  activeUser={props.activeUser} setActiveUser={props.setActiveUser} setPage={props.setPage} setProfileSectionPage={setProfileSectionPage}/>}



</div>
</div>


}

export default ProfileSection;





