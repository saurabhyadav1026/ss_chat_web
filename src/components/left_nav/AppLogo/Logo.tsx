

const Logo=(props:any)=>{
return(
    <>
<div id="logo_bar" className="left_bar">
        <div id="logo_icon" style={{display:"inline-block"}}></div>
       <div  style={{display:"inline-block" ,padding:'5px',paddingLeft:'15px'}}>
            <h3 className="col" >SSPapp</h3>
              { props.activeUser.dp!==""? <div className="col"  id="user_dp" style={{display:"inline-block", backgroundImage:`url(${props.activeUser.dp})`}} onClick={()=>{props.setPage('ProfileSection')}}></div>:  <div  className=' col' id="user_dp"  style={{display:"inline-block"}} onClick={()=>{props.setPage('ProfileSection')}}></div>}
            
        </div>
       
    </div>
</>
);}
export default Logo;
