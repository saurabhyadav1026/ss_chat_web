import { useNavigate, useParams } from "react-router-dom"
import api from "../../api/api"
import { useEffect, useState } from "react"
import useBinaryState from "../../hook/states/useBinaryState"
import { CloseEyeIcon, OpenEyeIcon } from "../icons"



const ResetPassword=()=>{


    const [resetPasswordInput,setResetPasswordInput]:any=useState("")
    const [resetConfirmPasswordInput,setResetConfirmPasswordInput]:any=useState("")

    const navigate=useNavigate();
    const {token}=useParams();


useEffect(()=>{
    if(!token)navigate("/");
    else {

        api.get("/logging/verifyresetpasswordlink",{headers:{Authorization:`bearer ${token}`}})
        .then((res)=>{
          if(!res.data.status)navigate("/")
        }).catch((err)=>{ console.log(err);})

    }

},[token])

const setPassword=async()=>{
   if(resetPasswordInput!==resetConfirmPasswordInput){
    alert("password not match.");
    return;
}
api.get('logging/setpassword',{params:{password:resetPasswordInput},headers:{Authorization:`bearer ${token}`}})
  .then((res)=>{
         alert("Password change successfully.");
         navigate("/user")
    }).catch((err:any)=>{
        console.log(err);
        alert("Error");
        navigate("/user")
    })
  

}

const [p_eye ,set_p_eye]= useBinaryState("password","text");
const [p_eye2 ,set_p_eye2]= useBinaryState("password","text");



    return <>
    <div className="d-flex col-12">
          <div className='app_logo' style={{height:"50px", width:"50px"}}></div>
      <div className="d-flex pt-3 ml-2" style={{justifyContent:"center",alignItems:"center"}}>  <h3>Reset Password</h3></div>
        </div>
    <hr/>
    <div id="reset_password  _input_div" className="container col-12 p-2 m-0 border">
<div className="col-12 p-1"> New Password: <div className="d-flex "><input className="input border col-10" value={resetPasswordInput} onChange={(e)=>setResetPasswordInput(e.target.value)} placeholder="New Password" type={p_eye}/>

<div className="col-1"></div><div className="col-9">{p_eye=="password"?<CloseEyeIcon func={set_p_eye}/>:<OpenEyeIcon func={set_p_eye}/>}</div>

</div></div>
<div className="col-12 p-1"> Confirm new Password: <div className="d-flex "><input className="input border col-10" value={resetConfirmPasswordInput} onChange={(e)=>setResetConfirmPasswordInput(e.target.value)} placeholder="Confirm new Password" type={p_eye2}/>
<div className="col-1"></div><div className="col-9">{p_eye2=="password"?<CloseEyeIcon func={set_p_eye2}/>:<OpenEyeIcon func={set_p_eye2}/>}</div>
</div></div>

<div className="col-12 p-2 m-3" ><button className="col-10 bg-success text-white p-1" style={{borderRadius:"50px"}} onClick={setPassword}>send OTP</button></div>

</div>
    
    </>
}


export default ResetPassword;