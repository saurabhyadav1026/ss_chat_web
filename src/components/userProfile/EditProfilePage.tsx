
import { IKUpload } from "imagekitio-react";
import {setDp} from './users'


import { useContext,useState } from "react";
import ChatContext from "../../contexts/chatscontext/ChatContext";



  const EditProfile=(props:any)=>{

const {activeUser, setActiveUser}:any=useContext(ChatContext);


const changedp:any=async(imgurl:any)=>{

  const res:any=await setDp(imgurl)

if(res.status){
  const u= activeUser;
  u.dp=imgurl;
  setActiveUser(u)
}
else alert("Error!  try again later.")
}

const [tempUser,setTempUser]:any=useState(activeUser);

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
      <IKUpload fileName={props.activeUser._id+"_dp"}
              onSuccess={(res:any)=>{changedp(res.url)}}
              onError={(e:any)=>{ console.log(e);alert(e)}}
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