



  const Profile=(props:any)=>{



 
return<>

<div id="profile_page">
 <div  id="profile_top_nav">
   <span style={{color:'blue',margin:"3px"}}onClick={()=>props.setPage('ChatPageSection')}>Back</span>
  <span style={{color:'blue',margin:"3px"}}onClick={props.logOut}>Log Out</span>
 </div>
  

<div id="profile_dp_bar">
  <div className="card_dp" style={{backgroundImage:'url('+props.activeUser.dp+')'}}></div>
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