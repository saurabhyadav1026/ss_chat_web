
import { IKUpload } from "imagekitio-react";
import {setDp} from './users'


import ListenerContext from "../../voiceassistance/listener/ListenerContext"
import { useContext, useEffect, useState } from "react";
import ChatContext from "../../contexts/chatscontext/ChatContext";



  const EditProfile=(props:any)=>{

const {transcript,resetTranscript}:any=useContext(ListenerContext);
const [text,setText] =useState("");
const {activeUser, setActiveUser}:any=useContext(ChatContext);


const changedp:any=async(imgurl:any)=>{

  const u:any=await setDp(activeUser.accessToken, activeUser._id,imgurl)
  console.log(activeUser)
if(u.status)setActiveUser(u.data);
else alert("Error!  try again later.")
}

const [tempUser,setTempUser]:any=useState(activeUser);

useEffect(()=>{


  console.log(transcript);

 if(transcript.length>100) {
  console.log(text)
/*   let t:string=text+transcript */
setText(text+transcript);
resetTranscript();
 }
 
},[transcript])


const saveProfile=()=>{
setTempUser(activeUser);
    alert("saved")
}


return<>




<div id="profile_page" className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm ">
    <div className="p-3 d-flex " style={{width:"100%",justifyContent:"space-between"}}>
      <button className=" btn btn-danger" onClick={()=>props.setProfileSectionPage("profile")}>Back</button>
    <button className=" btn btn-primary" onClick={()=> {saveProfile();props.setProfileSectionPage("profile")}}>Save</button>
    </div>
    <div className="flex flex-col items-center pb-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={props.activeUser.dp} alt="Bonnie image"/>
      <IKUpload fileName={props.activeUser.username+"_dp"}
              onSuccess={(res:any)=>{changedp(res.url)}}
              onError={(e:any)=>alert(e)}
   /> 
</div>
    <div className="m-4 p-2 container d-flex " style={{flexDirection:"column",justifyContent:"space-between"}}>
    <table>
      <tr>
        <td className="p-1">Name :</td>
        <td className="p-1">
          <input  className="input border " onChange={()=>{}} value={tempUser.name}/>
        </td>
        
      </tr>
      <tr>
        <td className="p-1 fw-5">Username :</td>
        <td className="p-1" >

<input  className="input border " value={tempUser.username} />
        </td>
      </tr>
      <tr>
        <td className="p-1">
          About :
        </td>
        <td className="p-1">
<input  value={tempUser.about} className="input border "/>    
        </td>
      </tr>
    </table>
   
     
       
    </div>
   {/* { <button onClick={startListening}>speak</button> */}
<div style={{height:'200px',width:"100%",padding:"10px",fontSize:"larger"}}>
{text+(transcript||"")}

</div>
 


</div>



</>

  }

  export default EditProfile;




  {/* 
  
  
  <div id="profile_dp_bar">
   <div className="card_dp" style={{backgroundImage:`url(${props.activeUser.dp})`}}></div>
   

  </div>
  
  
  </div>
  
  
  */}