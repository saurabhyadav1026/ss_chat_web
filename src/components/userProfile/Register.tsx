
import { useState } from 'react';
import {addUser,checkIsUsernameAvailble,getOtp} from './users'



const Register=(props)=>{


const [isUsernameAvailble,setIsAvailbleUsername]=useState(false);

// {otp_code:54425,otp:123654}
const [OTP,setotp]=useState({otp_code:null,otp:null})
  

const [isReadOnly,setIsReadOnly]=useState(false);
const [otpDivVisibility,setOtpDivVisibility]=useState('none')

const [User,setUser]=useState({name:"",username:"",userpassword:'', confirm_password:'',email:''})

const updateUser=(e)=>{
    const {name,value}=e.target;
    
setUser({...User,[name]:value})
}



const sendOtp=async ()=>{

if(!isUsernameAvailble){
    alert("Username is not availble. Try other username.")
    return;}
    if(User.userpassword!==User.confirm_password){
        alert("password missmatch");
        return;
    }
const new_otp= await getOtp(User.email);
if(new_otp.status==='no_get')return;
else if(new_otp.status==='ok'){
    setIsReadOnly(true)
    alert("We have send the otp on your register contact. otp code is : "+new_otp.otp_code);
    setotp(new_otp);
    setOtpDivVisibility(null)
     
  }
  else {alert("Enetr correct mail id")

  }

    }


    const resendOtp=async()=>{
    const new_otp= await getOtp(User.email);
    if(new_otp.status==='not_get')return;
else if(new_otp.status==='ok'){
    alert("We have resend the otp on your register contact. otp code is : "+new_otp.otp_code);
    setotp(new_otp);
       
  }
  else {
    
    alert("Enetr correct mail id")}

    }

    
    const edit=()=>{
document.getElementById("otp_input").value=""
      setOtpDivVisibility('none' )
        setIsReadOnly(false)

    }


    const verifyRegisterDetail=async()=>{

      const  otp_=document.getElementById("otp_input");
const      otp=otp_.value;
 otp_.value="";
 if(OTP.otp.toString()!==otp){    
    alert("Enter correct OTP  ");
    return;
 }
 else{

 await  addUser(User)
    props.setProfileSectionPage('log');
    alert("register successfully");
 }


    }
const checkUsername=async()=>{
 const isUA=await checkIsUsernameAvailble(User.username);
 if(User.username.trim()!==''&&isUA){
setIsAvailbleUsername(true);

 }
 else setIsAvailbleUsername(false);
 

}




return<>

<h2 style={{color:'green'}}>Register...</h2>
<hr/>
<table style={tabSty}>
    <tbody>

    


<tr>
    <td>Name</td><td><input    style={{height:'25px'}}  name='name' onChange={updateUser} readOnly={isReadOnly}   value={User.name}  required /></td>
</tr>
<tr>
    <td>Username</td><td><input  style={{height:'25px'}}  name='username' onKeyUp={checkUsername} onChange={updateUser} readOnly={isReadOnly}   value={User.username} required /></td><td><UserNameAvailble value={isUsernameAvailble}></UserNameAvailble></td>
</tr>
<tr>
    <td>Password :</td><td><input   style={{height:'25px'}} name='userpassword' onChange={updateUser} readOnly={isReadOnly}  type="password" value={User.userpassword} required></input></td>
</tr>
<tr>
    <td>Confirm Password :</td><td><input  style={{height:'25px'}}  name='confirm_password' onChange={updateUser} readOnly={isReadOnly}   type="password" value={User.confirm_password} required></input></td>
</tr>
<tr>
    <td>Email id :</td><td><input  style={{height:'25px'}}  name='email' onChange={updateUser} readOnly={isReadOnly}   value={User.email} type='email' required></input></td>
</tr>
<tr>
   <td style={{display:'flex'}} colSpan={2}> <button style={{alignSelf:'center',backgroundColor:"yellow",padding:"5px"}} onClick={sendOtp}>Send OTP</button></td>
</tr>

{/* 
<tr id='otp_verify_div' style={{backgroundColor:'red',visibility:'hidden',position:'absolute',height:"100%",width:'100%'}}>
 */}
<tr style={{display:otpDivVisibility}}><td>Enter OTP</td><td><input type='Number' id="otp_input" required /></td><td onClick={resendOtp} style={{color:"blue",fontSize:"small"}} >Resend OTP</td></tr>
<tr style={{display:otpDivVisibility}}><td colSpan={2}><button style={{margin:"3px",width:'100%',height:"30px",backgroundColor:"blue",color:'white',borderRadius:'10px'}} id='otp_verify_btn' onClick={verifyRegisterDetail}>Register</button></td></tr>
<tr style={{display:otpDivVisibility}}><td colSpan={2}>To edit Email/ Contact no. <span onClick={edit} style={{color:'blue'}}>click here</span> </td></tr>

{/* 
<tr><td colSpan={2}>or loggin with</td></tr>
<tr><td colSpan={2} style={{display:'flex',alignItems:'center',justifyContent:'space-evenly'}}><span>g</span><span>m</span><span>t</span></td></tr>
 */}

</tbody>
</table>


<div>if you have account <span style={{color:'blue',margin:"3px"}} onClick={()=>props.setProfileSectionPage('log')}>sign in</span></div>
<div  >click to <span style={{color:'blue',margin:"3px"}}onClick={()=>props.setPage('ChatPageSection')}>stay without loggin</span></div>


</>    


}

export default Register;



const UserNameAvailble=(props)=>{
    if(props.value) return <td id="username_availble_status"style={{fontSize:"small",color:'green'}}>Availble</td>
    else return <td id="username_availble_status" style={{fontSize:"small",color:'red'}}>not Availble</td>
}



const tabSty={
   height:'200px',
   padding:"10px",
   width:'100%',
    bordeRadius:"10px",
    borderTop:'3px solid gray',
     borderBottom:'3px solid gray'
}
