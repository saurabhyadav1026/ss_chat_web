




const Profile=(props:any)=>{

   
    return (
        <>
          <div id="left_nav_top" className="left_bar">
                <div id="left_nav_top_icon" className="left_nav_icons">
                  { props.activeUser.dp!==""? <div  id="user_dp" style={{backgroundImage:`url(${props.activeUser.dp})`}} onClick={()=>{props.setPage('ProfileSection')}}></div>:  <div  id="user_dp"  onClick={()=>{props.setPage('ProfileSection')}}></div>}
                    
                </div>
                <div className="left_nav_bar">
                    <div>
                        {props.activeUser.username!=='sbhunk'?<h2 onClick={()=>props.setPage('ProfileSection')}>{props.activeUser.name}</h2>:<h2 onClick={()=>props.setPage('ProfileSection')}>Login here</h2>}
                    </div>
                </div>

            </div>
        </>
    );
}


export default Profile;