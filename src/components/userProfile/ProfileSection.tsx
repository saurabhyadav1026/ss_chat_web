

import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProfileSection=(props:any)=>{


const navigate=useNavigate();

 useEffect(()=>{
navigate('myprofile');
    },[])







//<Alert buttonId="hlosbh" message='Incorrect Password'/>


return <div id="profile_section" className="container-fluid col-12 d-flex p-0 vh100  m-0 border"  >



<div id="profile_section_div2" className=" col-12 p-4 px-2 col-md-6 col-lg-6 col-xl-4  " style={{overflow:"none"}} >
  <Outlet/>



</div>
<div className="sbh_ad_show d-none  col-12 d-md-flex col-md-6 col-lg-6 col-xl-8" style={{backgroundImage:`url("https://ik.imagekit.io/sbhtechhub/show.jpg")`,borderRadius:"5px",height:"100%"}}>

 </div>
</div>

}

export default ProfileSection;





