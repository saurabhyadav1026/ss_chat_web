
import { verifyUser } from './users.ts'









const Loggin=(props:any)=>{






    const verifyLoggin=async ()=>{


const usname_:string=(document.getElementById('log_usname_input'!)as HTMLInputElement).value;
const uspassword_:string=(document.getElementById('log_uspassword_input'!)as HTMLInputElement).value;


const a_user:any=(await verifyUser(usname_,uspassword_))
if(!a_user.status){
    alert("usernae or password is incorrect");
    return;
}
else{
    props.setActiveUser(a_user.value)
        alert("Loggin Successfully.")
props.setPage('ChatPageSection')
}

    }



return<>
<div className='container'><button className="btn btn-primary"  onClick={()=>{props.setPage('ChatPageSection');}}>Back</button></div>
<h2 style={{color:"blue"}}>Loggin Here...</h2>

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
<tr  style={{display:'none'}}><td  colSpan={2}>or loggin witd</td></tr>
<tr  style={{display:'none'}}><td  colSpan={2}></td></tr>

</tbody>
</table>

<div  >  <span style={{color:'blue',margin:"3px"}}onClick={()=>props.setProfileSectionPage('forgetPassword')}>Forget Password</span></div>
<div  >if don't have account <span style={{color:'blue',margin:"3px"}} onClick={()=>props.setProfileSectionPage('reg')}>sign up</span></div>
<div  > click to <span style={{color:'blue',margin:"3px"}}onClick={()=>props.setPage('ChatPageSection')}>stay without loggin</span></div>


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
