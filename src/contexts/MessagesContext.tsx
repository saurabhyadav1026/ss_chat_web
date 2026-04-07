// import { createContext,useContext,useState} from 'react';
import { createContext,useState} from 'react';

import { useEffect } from 'react';
// import UserContext from './UserContext';
import { socket } from './socketcontext/SocketContext';
// import ChatsListContext from './ChatsListContext';
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
     .then(res=>{console.log(res);setMessages(res.data.messages); })
     .catch(err=>console.log(err))
    }
    else if (activeChat) {
      setMessages({});
    }

  }, [activeChat])

  // to send the msg
  const sendMessage = (data: any) => {
    socket.emit("sendMessage", data)
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
           console.log(roomId)
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
