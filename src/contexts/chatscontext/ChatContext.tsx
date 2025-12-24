


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








  useEffect(() => {
    keyHepler.clear();
  }, [activeChat])



  // to get search or friend list    
  useEffect(() => {
    if (searchInput) socket.emit("getFriendList", { userId: activeUser._id, searchInput: searchInput })
    else socket.emit("getChatList", { userId: activeUser._id })
  }, [searchInput])

  // to set the chatlist   yani chatroom  by getfriendList or getchatList

  useEffect(() => {

    socket.on("setChatList", (data) => {
      console.log("chatlist will set soon")
      setChatList(data.chatlist);
      console.log(chatsList)
      console.log("we set the chat list")
    })
    return () => { socket.off("setChatList") }
  })





  // to get Chat  yaani messages
  useEffect(() => {
    console.log("hum chat namga rhe hai")


    if (activeChat && activeChat._id) {
      console.log("hum 1 pe hai")
      socket.emit("getChat", { userId: activeUser._id, roomId: activeChat._id })
      console.log("1 ho gya ")
    }
    else if (activeChat) {
      console.log("hum 2 pe hai")
      setchat({});
      console.log("2 ho gya ")
    }

  }, [activeChat])




  // to set chat   by getchat

  useEffect(() => {
    socket.on("setChat", (data) => {
      console.log("hum chat mgaaye ab save kr rhe")
      setchat(data.chat);
      console.log("sab set ho gya")
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
        console.log(" tmhara tick kr diya yrr")

      }
      
      // for receiver 
      else {

        socket.emit("doDoubleTick", msg._id);
        console.log("dble tick req send")
        if (activeChat._id === room._id) {

          console.log("tmhare liye msg aaya hai")

          setchat((prev: any) => ({ ...prev, [msg._id]: msg }))

          socket.emit("doBlueTick", msg._id);
          console.log("blue  tick req send")

        }
      }

      console.log("receiving done")

    })


    return () => { socket.off("receivMsg") }
  })


// to update tick  ??????? not working
  useEffect(() => {
    socket.on("updateTick", (data: any) => {
      console.log("we will update the tick")
      if (activeChat._id === data.roomId) {
        console.log(" ha yrr tm hi sender ho tmharab hi kr rhe")

        let msgid = data.msg._id
        if (keyHepler.has(msgid)) msgid = keyHepler.get(msgid)
        if (chat[msgid]) setchat((prev: any) => ({ ...prev, [msgid]: { ...prev[msgid], tickStatus: data.keyStatus } }))

        console.log("tick updated")
        console.log(data)
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




  return <ChatContext.Provider value={{ setLogout, activeUser, activeChat, setActiveUser, setActiveChat, chatsList, setChatList, chat, setchat, searchInput, setSearchInput, sendMessage }}>
    {children}
  </ChatContext.Provider>
}


export default ChatContext;