
import ReqShow from "./ReqShow";
import ResShow from "./ResShow";
import React, { useContext, useEffect, useRef, useState } from "react";

import InputBar from "./InputBar.tsx";
import TopNav from "./TopNav.tsx";
import { useOutletContext, useParams } from "react-router-dom";
import api from "../api/api.ts";
import UserContext from "../contexts/UserContext.tsx";
import MessageContext from "../contexts/MessagesContext.tsx";


const ChatPage = ()=> {
const {messages,setMessages,activeChat,setActiveChatByChatRoomId}:any=useContext(MessageContext);
const {page2Id}=useParams();
const {activeUser}:any=useContext(UserContext);

const chatPageRef=useRef(null);


useEffect(()=>{
 if(page2Id)setActiveChatByChatRoomId(page2Id);
  

},[page2Id])

useEffect(()=>{

  const div_ref:any=chatPageRef.current
    if(chatPageRef){
    div_ref.scrollTop=div_ref.scrollHeight
  }
},[messages])



 


  


    return <>

      <TopNav  activeChat={activeChat.receiver} toBack={"/u/chats"}/>
     <div className=" chat_page flex-grow-1"    id="chat_page_chat" style={{backgroundImage:`url("https://ik.imagekit.io/sbhtechhub/chatpagewallpaper.png?updatedAt=1772015853286")`}}>
      
      <div className="scrollbar-only-rod  " ref={chatPageRef} style={{overflowX:"hidden", flexDirection:"column",height:"80%"}}>
     
      {
  
       Object.values(messages).map((u:any, i:any) :any=> {
           {console.log(u);}
            return <React.Fragment key={i}>
           
              
        {u.senderId=== activeUser._id? <ReqShow activeChat={activeChat} chat_c={u}   req_={u.text} r_no={i}> </ReqShow> : <ResShow activeChat={activeChat} res_={u['text']} r_no={i}></ResShow>}
      </React.Fragment>

       })
    }
    </div>

    {activeChat? <div className="container-fluid  " ><InputBar activeChat={activeChat} setMessages={setMessages}    /></div>:<></>}
    </div>
    

    </>

}

  export default ChatPage;




  /* 
  
   {activeChat? <div className="container-fluid  " ><InputBar  sty_input={props.controProperty.input} /></div>:<></>}
   
  
  */