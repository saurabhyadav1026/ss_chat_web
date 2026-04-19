
import { createContext,useState} from 'react';

import { useEffect } from 'react';
import { socket } from './socketcontext/SocketContext';
import api from '../api/api';

const MessageContext=createContext({});
// for temp key of messages
export const keyHepler = new Map();

export const MessageContextProvider=({children}:any)=>{

    const [activeChat,setActiveChat]:any=useState({});

    const [messages ,setMessages ]:any=useState({});
    const [aiChat,setAIChat]=useState({})



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







  // to send the msg
  const sendMessage = (data: any) => {
    socket.emit("u/chats/sendMessage", data)
  }

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

const getRoomIdByReceiverId=async(receiverId:any)=>{
  let roomStatus=true;
let roomId="";

await api.get("/users/getroomidbyreceiverid",{params:{_id:receiverId}})
          .then((res)=>{
           roomId=res.data.roomId;
          })
          .catch((err)=>{
            roomStatus=false;
            console.log(err);
          })
          if(roomStatus)return {status:true,roomId:roomId};
          else return {status:false};
        }

const setActiveChatNull=()=>{
  setActiveChat({});
}

  /* 
  
  activeChat={
  
  _id:
  lastMessage:
  receiver:
  }
  
  */

    return < MessageContext.Provider value={{sendMessage,getRoomIdByReceiverId,setActiveChatByChatRoomId, activeChat,setActiveChatNull,messages,setMessages,aiChat,setAIChat}}>{children}</MessageContext.Provider>
}

export default MessageContext;
