
import { IKUpload } from "imagekitio-react";
import {setDp} from './users'





  const Profile=(props:any)=>{




const changedp:any=async(imgurl:any)=>{
if(await setDp(props.activeUser.username,imgurl))alert("DP changed successfully.");
else alert("Error!  try again later.")
}








 
return<>

<div id="profile_page">
 <div  id="profile_top_nav">
   <span style={{color:'blue',margin:"3px"}}onClick={()=>props.setPage('ChatPageSection')}>Back</span>
  <span style={{color:'blue',margin:"3px"}}onClick={props.logOut}>Log Out</span>
 </div>
  

<div id="profile_dp_bar">
   <div className="card_dp" style={{backgroundImage:`url(${props.activeUser.dp})`}}></div>
   <IKUpload fileName={props.activeUser.username+"_dp"}
              onSuccess={(res:any)=>{changedp(res.url)}}
              onError={(e:any)=>alert(e)}
   />

  <h3>{props.activeUser.name}</h3>
</div>    

<div id="profile_field_bar">
  <span>Username : <b>{props.activeUser.username}</b></span>
</div>
<div id="profile_footer">
 

</div>

  
  
  
  </div>

</>

  }

  export default Profile;