
import { useState } from "react";
import api from "../../api/api";


const ForgetPassword=()=>{

const [emailId,setEamailId]=useState("");








const sendPasswordResetLink=()=>{

 if(emailId.trim().length>0)api.get("/logging/forgetpassword",{params:{email:emailId}})
    .then((res)=>{
if(res.data.status)alert("The password reset link had send to you . Check your mail");
else alert("invalid email or not registered, try again with valid mail.")
    })
    .catch((err:any)=>{

        console.log(err);
        alert("invalid email or not registered, try again with valid mail.")
    })
}


return <>
  <h3>Reset Password</h3>
    <hr/>
<div id="forget_mail_input_div" className="container border d-flex p-4">
  
<input className="input border m-2 p-2 col-9" typeof="email" onChange={(e)=>setEamailId(e.target.value)} placeholder="enter your email" type="email"></input>
<button className="btn bg-primary m-2 col-3" onClick={sendPasswordResetLink}> Reset LinkP</button>

</div>
</>
}


export default ForgetPassword;