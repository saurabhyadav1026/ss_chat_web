import { useEffect, useState } from "react";
import {getlogUser} from './users.ts'





  const Profile=(props:any)=>{


const [user,setUser]=useState({username:"sbhyd",name:'Saurabhhhhh',email:"hsiudhfciush"})

useEffect(()=>{
  let us:any=getlogUser(props.activeUser)
 setUser(us) ;
},[])  

 
return<>

<div id="profile_page">
 <div  >
   <span style={{color:'blue',margin:"3px"}}onClick={()=>props.setPage('ChatPageSection')}>Back</span>
  <span style={{color:'blue',margin:"3px"}}onClick={props.logOut}>Log Out</span>
 </div>
  

<div>
  <div style={{height:'100px',width:'100px',borderRadius:"50%",backgroundSize:"cover", backgroundImage:"url('/dp.jpg')"}}>DP</div>
  <h3>{user.name}</h3>
</div>    

<div>
  <span>Username:</span><b>{user.username}</b>
</div>
<div>
  <span>Email:</span><b>{user.email}</b>
</div>

  
  
  
  </div>

</>

  }

  export default Profile;