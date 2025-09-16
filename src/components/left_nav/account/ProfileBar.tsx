




const Profile=(props:any)=>{

   
    return (
        <>
          <div id="left_nav_top" className="left_bar">
              
                  { props.activeUser.dp!==""? <div  id="user_dp" style={{backgroundImage:`url(${props.activeUser.dp})`}} onClick={()=>{props.setPage('ProfileSection')}}></div>:  <div  id="user_dp"  onClick={()=>{props.setPage('ProfileSection')}}></div>}
                    
             
                        {props.activeUser.username!=='sbhunk'?<h2 onClick={()=>props.setPage('ProfileSection')}>{props.activeUser.name}</h2>:<h2 onClick={()=>props.setPage('ProfileSection')}>Login here</h2>}
                   
            </div>
        </>
    );
}


export default Profile;