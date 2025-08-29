



import { useEffect, useState } from 'react';
import {ProfileIcon}  from '../../icons';
import { getName } from '../../userProfile/users';

const Profile=(props:any)=>{

    const[ name,setName]=useState("Log In")

   useEffect(()=>{
    const func=async()=>{ 
        const nm=await getName(props.activeUser)
        setName(nm);}
        func();
  
},[props.activeUser])

    return (
        <>
          <div id="left_nav_top" className="left_bar">
                <div id="left_nav_top_icon" className="left_nav_icons">
                    <div id="profile_icon"><ProfileIcon func={()=>{props.setPage('ProfileSection')}}></ProfileIcon></div>
                    <div></div>
                </div>
                <div className="left_nav_bar">
                    <div>
                        <h2 onClick={()=>props.setPage('ProfileSection')}>{name}</h2>
                    </div>
                </div>

            </div>
        </>
    );
}


export default Profile;