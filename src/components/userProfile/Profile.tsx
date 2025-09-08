import axios from "axios";


const responser:string=import.meta.env.VITE_API_KEY;



  const Profile=(props:any)=>{




const selectFile:any=async(e:any)=>{
const file=e.target.files[0];

if(!file)return;
  
    if(!confirm("Are you sure to change DP?"))return;
  const fadata=new FormData();
  fadata.append("image",file);
  fadata.append('username',props.activeUser.username)
  await axios.post(responser+'/user/setdp',fadata,{
        headers: { "Content-Type": "multipart/form-data" }});
  alert("done");

}

const changedp=async()=>{
  (document.getElementById("dpinput") as HTMLElement).click();
  

}





 
return<>

<div id="profile_page">
 <div  id="profile_top_nav">
   <span style={{color:'blue',margin:"3px"}}onClick={()=>props.setPage('ChatPageSection')}>Back</span>
  <span style={{color:'blue',margin:"3px"}}onClick={props.logOut}>Log Out</span>
 </div>
  

<div id="profile_dp_bar">
   <div className="card_dp" style={{backgroundImage:`url(${responser}/user/getdp/${props.activeUser.username})`}}></div>
   <input id="dpinput" style={{display:'none'}} type="file" onChange={selectFile}/>
  <button onClick={changedp}>uploade</button>
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