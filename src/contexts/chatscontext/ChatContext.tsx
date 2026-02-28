


import { createContext, useState, useEffect } from "react";
import { socket } from '../socketcontext/SocketContext.tsx'



// for temp key of messages
export const keyHepler = new Map();

const ChatContext = createContext({});



export const ChatContextProvider = ({ children }: any) => {


  let luser: any = { _id: null, username: 'sbhunk', name: "Loggin here", dp: "https://ik.imagekit.io/sbhtechhub/no_dp.jpg", loggin_token: "" }

  
  if (localStorage.getItem('ssapp_activeUser')) {
    luser = localStorage.getItem('ssapp_activeUser');
    luser = JSON.parse(luser);
  }


  const [activeUser, setActiveUser] = useState(luser);

  useEffect(() => {
    socket.emit("setConnected", { userId: activeUser._id })
  }, [])



  useEffect(() => {
    socket.emit("doDisconnect");
    socket.emit("setConnected", { userId: activeUser._id });
    localStorage.setItem('ssapp_activeUser', JSON.stringify(activeUser))

  }, [activeUser])




  const [activeChat, setActiveChat]: any = useState();

  const [chatsList, setChatList]: any = useState({});
  const [chat, setchat]: any = useState({});
  const [searchInput, setSearchInput]: any = useState("");

  // to switch Chat / AI chat
  const [appOption, setAppOption] = useState("Chat")

const [picShow,setPicShow]:any=useState({status:false})





  useEffect(() => {
    keyHepler.clear();
  }, [activeChat])



  // to get search or friend list    
  useEffect(() => {
   

    if (appOption === "Chat") {
      
      if (activeUser._id ) {
        if (searchInput) socket.emit("getFriendList", { userId: activeUser._id, searchInput: searchInput })
        else socket.emit("getChatList", { userId: activeUser._id })
      }

      // on not loggin
      else{
setChatList({info:"loggin yourself to connect with your friend"})


      }
    }
    else if (appOption === "AI") {
        // on loggin
        
  if (activeUser._id) {

  }

  // on without loggin
  else{

// write code to set AI chat when user not register
  }
    }

  }, [searchInput,appOption])

  // to set the chatlist   yani chatroom  by getfriendList or getchatList

  useEffect(() => {

    socket.on("setChatList", (data) => {
      setChatList(data.chatlist);
    
    })
    return () => { socket.off("setChatList") }
  })





  // to get Chat  yaani messages
  useEffect(() => {


    if (activeChat && activeChat._id) {
     
      socket.emit("getChat", { userId: activeUser._id, roomId: activeChat._id })
    
    }
    else if (activeChat) {
      setchat({});
    }

  }, [activeChat])




  // to set chat   by getchat

  useEffect(() => {
    socket.on("setChat", (data) => {
      setchat(data.chat);
    })
    return () => { socket.off("setChat") }
  })


  // to send the msg

  const sendMessage = (data: any) => {

    socket.emit("sendMessage", data)

  }




  // to reciev messages   

  useEffect(() => {


    /* 
    data={
    room:
    msg:
    oldMsg id if its sender
   
    }
    */

    socket.on("receivMsg", (data) => {

      const { room, msg } = data;

      setChatList((prev: any) => ({ ...prev, [room._id]: room }));




      // for sender
      if (activeUser._id === msg.senderId && activeChat._id === room._id) {

        keyHepler.set(msg._id, data.oldMsgId)  // to save temp key
        setchat((prev: any) => ({ ...prev, [data.oldMsgId]: msg }));


      }

      // for receiver 
      else {

        socket.emit("doDoubleTick", msg._id);
        if (activeChat._id === room._id) {
          setchat((prev: any) => ({ ...prev, [msg._id]: msg }))

          socket.emit("doBlueTick", msg._id);

        }
      }

    })


    return () => { socket.off("receivMsg") }
  })


  // to update tick  ??????? not working
  useEffect(() => {
    socket.on("updateTick", (data: any) => {
      if (activeChat._id === data.roomId) {

        let msgid = data.msg._id
        if (keyHepler.has(msgid)) msgid = keyHepler.get(msgid)
        if (chat[msgid]) setchat((prev: any) => ({ ...prev, [msgid]: { ...prev[msgid], tickStatus: data.keyStatus } }))

      }

    })
    return () => { socket.off("updateTick") }
  }, [])





  /* 
  
  data={
  
  roomId
  msgId
  tickStatus
  }
  
  */







  const setLogout = () => {
    setActiveChat(null);
    setchat({})
    setActiveChat({})
    socket.emit("doDisconnect");
    setActiveUser({ username: 'sbhunk', name: "Loggin here", dp: "https://ik.imagekit.io/sbhtechhub/no_dp.jpg", loggin_token: "" });

  }




  return <ChatContext.Provider value={{picShow,setPicShow, appOption, setAppOption, setLogout, activeUser, activeChat, setActiveUser, setActiveChat, chatsList, setChatList, chat, setchat, searchInput, setSearchInput, sendMessage }}>
    {children}
  </ChatContext.Provider>
}


export default ChatContext;