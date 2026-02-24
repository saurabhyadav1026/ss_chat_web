
import ReqShow from "./ReqShow";
import ResShow from "./ResShow";
import React, { useContext, useEffect, useRef } from "react";
import BlankChatPage from "./userProfile/BlankChatPage.tsx";

import ChatContext from "../contexts/chatscontext/ChatContext.tsx";

import InputBar from "./InputBar.tsx";


const ChatPage = (props:any)=> {

const {activeChat,chat,activeUser}:any=useContext(ChatContext);
const chatPageRef=useRef(null);

useEffect(()=>{

  const div_ref:any=chatPageRef.current
    if(chatPageRef){
    div_ref.scrollTop=div_ref.scrollHeight
  }
},[chat])

 


  
  // for new chat page return empty chat page
  
 if (!activeChat) {
  
  return <div  ref={chatPageRef} id="chat_page" >
    <h5>we get soon</h5>
  <BlankChatPage></BlankChatPage>
  </div>}

else if (chat === null) return <div className="scrollbar-only-rod chat_page"  ref={chatPageRef} id="chat_page_ad"></div>


    return <div className=" chat_page"    id="chat_page_chat" style={{backgroundImage:`url("https://ik.imagekit.io/sbhtechhub/chatpagewallpaper.png")`}}>
      
      <div className="scrollbar-only-rod  d-flex flex-direction-column" ref={chatPageRef} style={{overflowX:"hidden", flexDirection:"column",height:"80%"}}>
     
      {
  
       Object.values(chat).map((u:any, i:any) :any=> {
            return <React.Fragment key={i}>
              
        {u.senderId=== activeUser._id? <ReqShow activeChat={activeChat} chat_c={u} tick={u.tick} tickStatus={u.tickStatus} req_={u.text} r_no={i} time={u.tickStatus.send && new Date(u.tickStatus.send).toLocaleTimeString()}> </ReqShow> : <ResShow activeChat={activeChat}  time={u.time && new Date(u.time).toLocaleTimeString()} res_={u['text']} r_no={i}></ResShow>}
      </React.Fragment>

       })
    }
    </div>

    {activeChat? <div className="container-fluid  " ><InputBar  sty_input={props.controProperty.input} /></div>:<></>}
    </div>

  }

  export default ChatPage;