
import { IKUpload } from "imagekitio-react";
import {setDp} from './users'


import ListenerContext from "../../voiceassistance/listener/ListenerContext"
import { useContext, useEffect, useState } from "react";
import ChatContext from "../../contexts/chatscontext/ChatContext";


  const Profile=(props:any)=>{

const {transcript,resetTranscript}:any=useContext(ListenerContext);
const [text,setText] =useState("");
const {setLogout}:any=useContext(ChatContext)


const changedp:any=async(imgurl:any)=>{
if(await setDp(props.activeUser.username,imgurl))alert("DP changed successfully.");
else alert("Error!  try again later.")
}

useEffect(()=>{


  console.log(transcript);

 if(transcript.length>100) {
  console.log(text)
/*   let t:string=text+transcript */
setText(text+transcript);
resetTranscript();
 }
 
},[transcript])






return<>




<div id="profile_page" className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm ">
    <div><button className="btn btn-primary"  onClick={()=>{props.setPage('ChatPageSection');}}>Back</button>
    <button className="btn btn-danger" style={{alignSelf:"10"}} onClick={()=>{setLogout();props.setPage('ChatPageSection');}}>logout</button>

    </div>
    <div className="flex flex-col items-center pb-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={props.activeUser.dp} alt="Bonnie image"/><br/>
            <button className="btn btn-secondary" onClick={()=>props.setProfileSectionPage("editProfile")}>Edit</button>
        
    
        <h5 className="mb-1 text-xl font-medium  ">{props.activeUser.name}</h5>
      <h6 className="mb-1 text-xl font-medium ">@{props.activeUser.username}</h6>
        <span className="text-sm text-gray-500 dark:text-gray-800">{props.activeUser.about}</span>
       
    </div>
   
<div style={{height:'200px',width:"100%",padding:"10px",fontSize:"larger"}}>
{text+(transcript||"")}

</div>
 


</div>



</>

  }

  export default Profile;




  {/* 
  
  
  <div id="profile_dp_bar">
   <div className="card_dp" style={{backgroundImage:`url(${props.activeUser.dp})`}}></div>
   

  </div>
  
  
  </div>
  
  
  */}