
import { useState } from 'react';
//import { ConditionAlert } from '../bootstrapCoponents/Alert.tsx';
import { googleLoggin, verifyUser } from './users.ts'
import { GoogleLogin } from '@react-oauth/google';










const Loggin=(props:any)=>{

const [condition ,setCondition]=useState(false)




    const verifyLoggin=async ()=>{


const usname_:string=(document.getElementById('log_usname_input'!)as HTMLInputElement).value;
const uspassword_:string=(document.getElementById('log_uspassword_input'!)as HTMLInputElement).value;


const a_user:any=(await verifyUser(usname_,uspassword_))
if(!a_user.status){
    setCondition(true)
  
    alert("usernae or password is incorrect");
    return;
}
else{
   
    props.setActiveUser(a_user.value)
        props.setPage('ChatPageSection')
}

    }
    
    const verifygoogleLoggin=async (res:any)=>{

        
        
    const a_user:any=(await googleLoggin(res.credential))
if(a_user.status){
    createNewPassword();
    props.setActiveUser(a_user.value)
        props.setPage('ChatPageSection')
}
else{
    setCondition(true)
    alert("username or password is incorrect");
    return;
}

    }

   

    const createNewPassword=()=>{
return;
    }

//<ConditionAlert condition={condition} message='Incorrect Password'></ConditionAlert>
return<>

<div className='d-flex'>
    <div className='app_logo' style={{height:"100px", width:"100px", borderRadius:"50%"}}></div>
</div>
<br/>


<table style={tabSty}>
    <tbody>
        
<tr>
<td >Username:</td><td ><input className='form-control' placeholder='Enter Username...' style={{width:'100%',height:'30px'}}  id='log_usname_input'></input></td>
</tr>
<tr>
<td >Password:</td><td ><input className='form-control' placeholder='Enter Password...' style={{width:'100%',height:'30px'}} type="password" id='log_uspassword_input'></input></td>
</tr>

<tr>
<td  colSpan={2}><button className='btn btn-success text-bg-color' style={{width:"100%",height:"80%"}} onClick={verifyLoggin}>Log in</button></td>
</tr>
<tr  ><td  >or log in with : </td><td><GoogleLogin onSuccess={verifygoogleLoggin}></GoogleLogin></td></tr>
<tr  style={{display:'none'}}><td  colSpan={2}></td></tr>

</tbody>
</table>

{/* <div  >  <span style={{color:'blue',margin:"3px"}}onClick={()=>props.setProfileSectionPage('forgetPassword')}>Forget Password</span></div>

 */}

{/* <div  >click here to <span style={{color:'blue',margin:"3px"}} onClick={()=>props.setProfileSectionPage('reg')}>Register</span></div>
 */}

{/* <div  >click to <span style={{color:'blue',margin:"3px"}}onClick={()=>props.setPage('demoAICatPageSection')}>stay without logging</span></div>
 */}
</>
 
}

export default Loggin;



const tabSty={
   height:'200px',
   padding:"10px",
   width:'100%',
    bordeRadius:"10px",
    borderTop:'3px solid gray',
     borderBottom:'3px solid gray'
}
