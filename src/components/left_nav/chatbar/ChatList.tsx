

'use client';
import React, { useContext } from "react";
import ChatContext from "../../../contexts/chatscontext/ChatContext";





export const ChatList =(props:any) => {

    const {activeUser}:any=useContext(ChatContext)

const {searchInput}:any=useContext(ChatContext);

const update=(u:any)=>{
console.log(u)
    props.setActiveChat(u)
    console.log("acttyyyyyyy")
}


const newChat=(member2:any)=>{

    const tempRoom={
        _id:null,
        members:[{memberId:activeUser._id},{memberId:member2._id}],
        name:member2.name,
        roomDP:member2.dp,
        roomName:member2.username,
        lastMsg:null
    }

    console.log("tera user")
    console.log(activeUser)
    console.log("tera roo ye hai dek")
    console.log(tempRoom)
update(tempRoom);

}


   if(searchInput==="") return <>

        {
            props.chatsList.map((u:any,i:any) => {
                {console.log(u)}
                             return    <React.Fragment key={i}>
               <div className="listshow" style={{cursor:"pointer"}}onClick={() => {update(u)}}   > 
                <span className="chatlist_dp" style={{backgroundImage:`url(${u.roomDP})`}}></span>
                <span style={{alignSelf:"flex-start",width:'70%'}}>{u.name}</span>
             {  u.unreadCount>0? <span style={stty_unread} className="unread_show">{2}</span>:<></>}
                <span className="list_option" style={{visibility:"hidden"}}><b>:</b></span>
               </div>
               </React.Fragment>
            }
            )

        }
    </>


// for displaying search list
    else return <>
    
    {
            props.chatsList.map((u:any,i:any) => {
              
                             return    <React.Fragment key={i}>
               <div className="listshow" style={{cursor:"pointer"}}onClick={() => {newChat(u)}}   > 
                <span className="chatlist_dp" style={{backgroundImage:`url(${u.dp})`}}></span>
                <span style={{alignSelf:"flex-start",width:'70%'}}>{u.name}</span>
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