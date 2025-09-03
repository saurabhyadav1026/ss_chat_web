

'use client';
import React from "react";


export const ChatList =(props:any) => {

    return <>

        {
            props.chatsList.map((u:any,i:any) => {
                             return    <React.Fragment key={i}>
               <div className="listshow" style={{cursor:"pointer"}}onClick={() => {props.setActiveChat(u)}}   > 
                <span className="chatlist_dp" style={{backgroundImage:'url('+u.dp+')'}}></span>
                <span style={{alignSelf:"flex-start",width:'70%'}}>{u['name']}</span>
             {  u['unread']>0? <span style={stty_unread} className="unread_show">{u['unread']}</span>:<></>}
                <span className="list_option" style={{visibility:"hidden"}}><b>:</b></span>
               </div>
               </React.Fragment>
            }
            )

        }
    </>
}

export default ChatList;

const stty_unread={
    height:'20px',
    width:'20px',
    borderRadius:'50%',
    backgroundColor:'green',
    color:'white',
    display:'flex',
    alignItems:"center",
    justifyContent:"center",
    alignSelf:'flex-end'
}