
import { IKUpload } from "imagekitio-react";


import { useContext,useState } from "react";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";



  const EditProfile=()=>{


    const navigate=useNavigate()
const {activeUser, setActiveUser}:any=useContext(UserContext);
const [tempUser,setTempUser]:any=useState({dp:activeUser.dp,name:activeUser.name,username:activeUser.username,about:activeUser.about});


const saveProfile=()=>{


  api.get("/users/updateme",{params:{ newname:tempUser.name,newabout:tempUser.about }}).
  then((res:any)=>{
setActiveUser ((old:any)=>({...old,name:res.data.newname,about:res.data.newAbout}))


  }).catch((err:any)=>{
    alert(err)
    console.log(err)
  })
}

const changedp:any=async()=>{

 if(tempUser.dp.trim()===""||activeUser.dp===tempUser.dp)return;
  try{

    api.get("/users/updatedp",{params:{newDP:tempUser.dp}}).
    then((res:any)=>{
      setActiveUser({...activeUser,["dp"]:res.data.newDP})
    })
  }catch(err){
    console.log(err)
  }
}





  const updateUser = (e: any) => {
    
    let { name, value } = e.target;
    if(name==="name"&&value.length>30 )value=value.slice(0,30);
      else if (name==="about"&&value.length>50)value=value.slice(0,50);
    setTempUser({ ...tempUser, [name]: value });
  };


  return (
    <>
      <div id="profile_page" className="user-profile-screen">
        <div className="user-profile-card">
          <div className="user-profile-topbar">
            <button className="user-profile-back" onClick={() => navigate(-1)}>
              Back
            </button>
            <div className="user-profile-handle-chip">Edit @{activeUser.username}</div>
           
          </div>

          <div className="user-profile-hero">
            <div className="d-flex flex-column align-items-center gap-3">
              <img className="user-profile-avatar" src={tempUser.dp} alt="Profile" />
              <div className="auth-otp edit-profile-upload w-100">
                <span className="auth-label"></span>
                <IKUpload
                  fileName={activeUser._id + "_dp"}
                  onSuccess={(res: any) => { setTempUser({...tempUser,["dp"]:res.url}); }}
                  onError={(e: any) => { console.log(e); alert(e); }}
                />

<button className="user-profile-button user-profile-button--primary" onClick={() => changedp()}>
                  Save
                </button>

              </div>
              
            </div>

            <div className="auth-form">
              <div className="auth-header">
                <p className="auth-eyebrow">Profile details</p>
                <h2 className="user-profile-name">{tempUser.name}</h2>
                <p className="user-profile-bio">{tempUser.about || "Add a short bio to make your profile feel more personal."}</p>
              </div>

              <label className="auth-field">
                <span className="auth-label">Name</span>
                <input className="auth-input"  name="name" onChange={updateUser}value={tempUser.name} />
              </label>

              <label className="auth-field">
                <span className="auth-label">Username</span>
                <input className="auth-input" name="username" readOnly={true} onChange={updateUser} value={tempUser.username} />
              </label>

              <label className="auth-field">
                <span className="auth-label">About</span>
                <input value={tempUser.about} name="about" onChange={updateUser} className="auth-input" />
              </label>

              <div className="user-profile-actions">
                <button className="user-profile-button user-profile-button--ghost" onClick={() => navigate(-1)}>
                  Cancel
                </button>
                <button className="user-profile-button user-profile-button--primary" onClick={() => { saveProfile();  }}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  }

  export default EditProfile;




  {/* 
  
  
  <div id="profile_dp_bar">
   <div className="card_dp" style={{backgroundImage:`url(${activeUser.dp})`}}></div>
   

  </div>
  
  
  </div>
  
  
  */}
