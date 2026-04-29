
import React, {  useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReqShow from "../ReqShow";
import ResShow from "../ResShow";
import InputBar from "../InputBar";




const FunChatPage2=()=>{



    const [ messages, setMessages ]: any = useState({});
  const [activeChat, setActiveChat]:any=useState({});
  const { page2Id } = useParams();
  const chatPageRef = useRef<HTMLDivElement | null>(null);

const send=()=>{
  setMessages({})
  setActiveChat({})
  return
}
  const threadMessages = Object.values(messages || {});

  return <>
    <div className="chat-page">
     {/*  <TopNav activeChat={activeChat.receiver||{}} toBack="/u/chats" /> */}

      <div className="chat-screen">
        <div className="chat-thread">
          <div ref={chatPageRef} className="chat-thread__scroll scrollbar-only-rod">
            {threadMessages.length ? (
              threadMessages.map((u: any, i: any): any => (
                <React.Fragment key={u._id || i}>
               
                    <ReqShow  msg={u} r_no={i} />
             
                    <ResShow  msg={u} r_no={i} />
                  
                </React.Fragment>
              ))
            ) : (
              <div className="chat-thread__empty">
                <div className="chat-thread__empty-card">
                  <h3>Your thread is ready</h3>
                  <p>Send the first message to break the silence. Replies will stack here in a cleaner, calmer layout.</p>
                </div>
              </div>
            )}
          </div>

          {activeChat ? (
            <div className="container-fluid p-0 chat-compose-shell">
              <InputBar  page2Id={page2Id} send={send}/>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  
    
    </>
}

export default FunChatPage2;