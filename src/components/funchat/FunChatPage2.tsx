
import React, {  useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReqShow from "../ReqShow";
import ResShow from "../ResShow";
import InputBar from "../InputBar";
import { funChatSocket } from "../../contexts/socketcontext/SocketContext";
import CreateFunRoom from "./CreateFunRoom";
import TopNav from "../TopNav";
import PopUPmenu from "../assets/menu-option/PopUPmenu";



const generateMsgId=()=>{
  return (new Date()).toDateString()+(Math.random()*9999)%1000
}



const FunChatPage2=()=>{

 


    const [ messages, setMessages ]: any = useState({});
  //const [activeChat, setActiveChat]:any=useState({});
  const { page2Id } = useParams();
  const chatPageRef = useRef<HTMLDivElement | null>(null);

const send=(inputText:string)=>{
  const msgId=generateMsgId();
 
  setMessages({...messages,[msgId]:{_id:msgId,by:1,text:inputText}});

  funChatSocket.emit("sendMsg",{roomCode:page2Id,msg:inputText,msgId:msgId})
   
  
}


 useEffect(()=>{
if(page2Id!=="new")funChatSocket.emit("findAndJoinFunRoom",{roomCode:page2Id});
 },[page2Id])

useEffect(()=>{


  funChatSocket.on("receiveMsg",(data:any)=>{
 
    console.log(data)
setMessages({...messages,[data.msgId]:{_id:data.msgId,by:2,text:data.msg}})
  })
return ()=>{funChatSocket.off("receiveMsg")}
})




useEffect(()=>{

  funChatSocket.on("deleteMsg",(data)=>{
setMessages((prev:any)=>{
  const {[data.msgId]:val,...rest}=prev;
  return rest;
})
  })


  return ()=>{funChatSocket.off("deleteMsg")}

})


const deleteMsg=(msgId:string)=>{

funChatSocket.emit("deleteMsg",{roomCode:page2Id,msgId:msgId});
setMessages((prev:any)=>{
  const {[msgId]:val,...rest}=prev;
  return rest;
})
}



  const threadMessages = Object.values(messages || {});


  if(page2Id==="new")return <CreateFunRoom/>

  else return <>
    <div className="chat-page">
      <TopNav activeChat={{}} toBack="/u/chats" />

      <div className="chat-screen">
        <div className="chat-thread">
          <div ref={chatPageRef} className="chat-thread__scroll scrollbar-only-rod">
            {threadMessages.length ? (
              threadMessages.map((u: any, i: any): any => (
                <React.Fragment key={u._id || i}>
               
                {   u.by===1? <ReqShow  msg={u} r_no={i} deleteMsg={deleteMsg} /> : <ResShow deleteMsg={deleteMsg} msg={u} r_no={i} />}
                  
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

          {/* activeChat  */true? (
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