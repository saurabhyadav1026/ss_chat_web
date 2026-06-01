import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../../contexts/UserContext.tsx";
import InputBar, { keyHepler } from "../../InputBar.tsx";
import ReqShow from "../../ReqShow.tsx";
import ResShow from "../../ResShow.tsx";
import TopNav from "../../TopNav.tsx";
import api from "../../../api/api.ts";
import { socket } from "../../../contexts/socketcontext/SocketContext.tsx";
import ChatsListContext from "../../../contexts/ChatsListContext.tsx";

const ChatPage = () => {
  const [ messages, setMessages ]: any = useState({});
  const [activeChat, setActiveChat]:any=useState({});
  const { page2Id } = useParams();
  const { activeUser }: any = useContext(UserContext);
  const {setRoom}:any=useContext(ChatsListContext)
  const chatPageRef = useRef<HTMLDivElement | null>(null);




  
  useEffect(() => {
    if (page2Id) {


 setActiveChatByChatRoomId(page2Id);
      
    }
  }, [page2Id]);






   useEffect(() => {
   },[activeChat])
  useEffect(() => {
    const divRef = chatPageRef.current;
    if (divRef) {
      divRef.scrollTop = divRef.scrollHeight;
    }
  }, [messages]);



  /* rtgjrtmgtkljmkltmybkl */


    useEffect(() => {
      keyHepler.clear();
    }, [activeChat])

  // to get Chat  yaani messages
  useEffect(() => {
    if (activeChat &&activeChat._id&& activeChat._id.slice(0,3)!=="new") {
     api.get("/users/getmessages",{params:{ _id: activeChat._id }})
     .then(res=>{setMessages(res.data.messages); socket.emit("u/chats/doBlueTick",{roomId:activeChat._id})})
     .catch(err=>console.log(err))
    }
    else if (activeChat) {
      setMessages({});
    }

  }, [activeChat])



useEffect(()=>{
 socket.on("u/chats/updateDoubleTick",(data)=>{
  if(!data.updateRooms[activeChat._id]){
    return
        }
  data.updateRooms[activeChat._id].forEach((msgId:any)=>{
   setMessages((prev: any) => ({ ...prev, [msgId]:{...prev[msgId],tick:2,tickStatus:{...prev[msgId]["tickStatus"],read:data.deliverTime}} }));
  })
  })
  return ()=>{socket.off("u/chats/updateDoubleTick")}
})



useEffect(()=>{
 socket.on("u/chats/updateBlueTick",(data)=>{
  if(activeChat._id!==data.roomId){
    return;}
    
  data.updateMsgsId.forEach((msgId:any)=>{
   setMessages((prev: any) => ({ ...prev, [msgId]:{...prev[msgId],tick:3,tickStatus:{...prev[msgId]["tickStatus"],read:data.readTime}} }));
  })
 

})
  return ()=>{socket.off("u/chats/updateBlueTick")}
})

useEffect(()=>{
 socket.on("u/chats/updateOneDoubleTick",(data)=>{
  
  if(activeChat._id!==data.roomId)return;
    
    setMessages((prev: any) => ({ ...prev, [data.msgId]:{...prev[data.msgId],tick:2,tickStatus:{...prev[data.msgId]["tickStatus"],deliver:data.deliverTime}} }));
 })
  return ()=>{socket.off("u/chats/updateOneDoubleTick")}
})
useEffect(()=>{
 socket.on("u/chats/updateOneBlueTick",(data)=>{
  if(activeChat._id!==data.roomId)return;
    
    setMessages((prev: any) => ({ ...prev, [data.msgId]:{...prev[data.msgId],tick:3,tickStatus:{...prev[data.msgId]["tickStatus"],read:data.readTime}} }));
  
 })
  return ()=>{socket.off("u/chats/updateOneBlueTick")}
})







const setActiveChatByChatRoomId=(roomId:any)=>{
  api.get("users/getroombyroomid",{params:{_id:roomId}})
          .then((res)=>{
           setActiveChat(res.data.room);
          })
          .catch((err)=>{
            setActiveChat({});
            console.log(err);
          })
        }




  /*  input bar     rjtgrltjgmtkljmyhkltm */



    
    const send = async (inputText:string) => {
    
      if (inputText.trim() === "") return;
  
      const newMsgId = createTempMsgId();
      const msg: any = {
        _id: newMsgId,
        roomId: activeChat._id,
        senderId: activeUser._id,
        text: inputText,
        tick:0, 
        tickStatus: { send: new Date() },
      };
  
      setMessages((prev: any) => {return{ ...prev, [newMsgId]: msg }});
  
      const newMsg: any = {
        _id: newMsgId,
        roomId: activeChat._id,
        text:  inputText               //getMemberTextCopy([activeUser._id, activeChat.receiver._id], inputText),
      };
  
      socket.emit("u/chats/sendMessage", newMsg);
      
    };
  
  
  
  
    useEffect(() => {
      socket.on("u/chats/receiveMsg", (data) => {
      
        const { room,message } = data;
        setRoom(room);
          socket.emit("u/chats/doOneDoubleTick", {msgId:message._id,roomId:message.roomId});
          if (activeChat._id === message.roomId) {
            setMessages((prev: any) => ({ ...prev, [message._id]:message }));
            
            socket.emit("u/chats/doOneBlueTick",{msgId:message._id,roomId:message.roomId});
          
          }
        
      });
  
      return () => {
        socket.off("u/chats/receiveMsg");
      };
    });
  
   useEffect(() => {
      socket.on("u/chats/messageSent", (data) => {
       
        const message  = data.message;
        setRoom(data.room);
         
          if (activeChat._id === message.roomId) {
            setMessages((prev: any) => {
              const { [data._id]:_,...rest }=prev
            return { ...rest,[message._id]:message}
            });
           
          }
        
      });
  
      return () => {
        socket.off("u/chats/messageSent");
      };
    });
  
    useEffect(() => {
      socket.on("u/chats/messageNOtSent", (data) => {
   
           alert("msg not sent "+data)
      });
  
      return () => {
        socket.off("u/chats/messageNotSent");
      };
    });
  
  
  
  
    const createTempMsgId = () => {
      return String(Date.now() + (Math.floor(Math.random() * 999) + 1));
    };
  
  
  




/* ======== */


  const threadMessages = Object.values(messages || {});

  return <>
    <div className="chat-page">
      <TopNav activeChat={activeChat.receiver||{}} toBack="/u/chats" />

      <div className="chat-screen">
        <div className="chat-thread">
          <div ref={chatPageRef} className="chat-thread__scroll scrollbar-only-rod">
            {threadMessages.length ? (
              threadMessages.map((u: any, i: any): any => (
                <React.Fragment key={u._id || i}>
                  {u.senderId === activeUser._id ? (
                    <ReqShow  msg={u} r_no={i} />
                  ) : (
                    <ResShow  msg={u} r_no={i} />
                  )}
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
};

export default ChatPage;
