
import { useState } from "react";
import { socket } from "../../contexts/socketcontext/SocketContext";


const PasswordReset=(props:any)=>{

const [emailId,setEamailId]=useState("");
const [otp,setOtp]=useState(null);
const [resetPasswordInput,setResetPasswordInput]=useState("")
const [resetConfirmPasswordInput,setResetConfirmPasswordInput]=useState("")

const [waiting,setWaiting]=useState(false);
const [username,setUsername]=useState(null)

const [visibleDiv,setVisibleDiv]=useState(1);



const sendOtp=()=>{
    setOtp(null)  // for test not use
     /// for deploy not use
socket.emit('sendOtp',{emailId:emailId});
setWaiting(true)

}

socket.on("otpSend",(data)=>{

    if(data.status){setWaiting(false)
    alert("opt is send on your email.")
setVisibleDiv(2)}
else{
     alert("Error.. try agin later.");
}
})


const verifyOtp=()=>{    
socket.emit('verifyOtp',{otpInput:otp,emailId:emailId})

}

socket.on("verifyOtpStatus",(data)=>{
    if(!data.staus){
        alert("Invalid Otp.");
    }
    else{
setUsername(username);
setVisibleDiv(3);
    }
})

const resetPassword=()=>{
if(resetPasswordInput!==resetConfirmPasswordInput){
    alert("password not match.")
}
    socket.emit("resetPassword",{username:username,newPassword:resetPasswordInput})
  
}

socket.on('passwordChanged',(data)=>{
    if(!data.status){
        alert("Error.. try agin later.");
    }
    else{
  console.log("Password change successfully.")
    props.setProfileSectionPage('log');
    }
})


return <>
{visibleDiv===1?<div id="forget_mail_input_div">
<input onChange={(e)=>setEamailId(e.target.value)} placeholder="enter your eaiml" type="email"></input>
<button onClick={sendOtp}>send OTP</button>

</div>:
visibleDiv===2?<div id="forget_mail_otp_input_div">

<input onChange={(e)=>setEamailId(e.target.value)} placeholder="enter your eaiml" type="email"></input>
<button onClick={verifyOtp}>send OTP</button>

</div>:
<div id="reset_password  _input_div">
<input value={resetPasswordInput} onChange={(e)=>setResetPasswordInput(e.target.value)} placeholder="enter your eaiml" type="email"></input>
<input value={resetConfirmPasswordInput} onChange={(e)=>setResetConfirmPasswordInput(e.target.value)} placeholder="enter your eaiml" type="email"></input>

<button onClick={resetPassword}>send OTP</button>

</div>

}
</>
}


export default PasswordReset;