
import ReqShow from "./ReqShow";
import ResShow from "./ResShow";
import React, { useContext, useEffect, useRef } from "react";
import BlankChatPage from "./userProfile/BlankChatPage.tsx";

import ChatContext from "../contexts/chatscontext/ChatContext.tsx";




const ChatPage = ()=> {

const {activeChat,chat}:any=useContext(ChatContext);
const chatPageRef=useRef(null);

useEffect(()=>{

  const div_ref:any=chatPageRef.current
    if(chatPageRef){
    div_ref.scrollTop=div_ref.scrollHeight
  }
},[chat])

 


  
  // for new chat page return empty chat page
  
 if (activeChat.username === null) return <div  ref={chatPageRef} id="chat_page">
  <BlankChatPage></BlankChatPage>
  </div>

else if (chat === null) return <div className="scrollbar-only-rod" ref={chatPageRef} id="chat_page"></div>
    return <div className="scrollbar-only-rod"   ref={chatPageRef} id="chat_page">{
     
       chat.map((u:any, i:any) :any=> {
            return <React.Fragment key={i}>
              
        {u.by=== 1? <ReqShow activeChat={activeChat} chat_c={u} status={u['status']} req_={u['text']} r_no={i} time={u['time']}> </ReqShow> : <ResShow activeChat={activeChat}  time={u['time']} res_={u['text']} r_no={i}></ResShow>}
      </React.Fragment>

       })
    }
    </div>

  }

  export default ChatPage;