


import { createContext, useState ,useEffect} from "react";
import {socket} from '../socketcontext/SocketContext.tsx'



const ChatContext=createContext({});



export const ChatContextProvider=({children}:any)=>{


    let luser:any={_id:null,username:'sbhunk',name:"Loggin here",dp:"https://ik.imagekit.io/sbhtechhub/no_dp.jpg",loggin_token:""}
    
    if(localStorage.getItem('ssapp_activeUser')){
        luser=localStorage.getItem('ssapp_activeUser');
        luser=JSON.parse(luser);
    }
    
    
    const [activeUser,setActiveUser]=useState(luser);

    useEffect(()=>{
       socket.emit("setConnected",{userId: activeUser._id})
    },[])
     

    
    useEffect(()=>{
    socket.emit("doDisconnect");
socket.emit("setConnected",{userId: activeUser._id});
    localStorage.setItem('ssapp_activeUser',JSON.stringify(activeUser))
 
    },[activeUser])
    


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
  const [activeChat, setActiveChat]:any = useState();

  const [chatsList, setChatList]:any = useState([]);
    const [chat, setchat]:any = useState([]);
const [searchInput,setSearchInput]:any=useState("");
  



/* // for socketid  add
useEffect(()=>{
socket.on("getConnect",()=>{
  console.log("ha mil gai req  kr rhe")
if(activeUser._id){
  console.log("loggin ho tmhai id :   "+activeUser._id)
  socket.emit("setConnected",{userId: activeUser._id})}
 else console.log("no id loggingn youself")
})
return ()=>{socket.off("getConnect")}

}) */
  


// to get search or friend list
useEffect(()=>{
if(searchInput) socket.emit("getFriendList",{userId:activeUser._id,searchInput:searchInput})
else socket.emit("getChatList",{userId:activeUser._id})
},[searchInput])

// to set the chatlist

useEffect(()=>{

  socket.on("setChatList",(data)=>{
    console.log("chatlist will set soon")
    setChatList(data.chatlist);
    console.log(chatsList)
    console.log("we set the chat list")
  })
  return ()=>{socket.off("setChatList")}
})



// to get Chat 
useEffect(()=>{
console.log("hum chat namga rhe hai")


if(activeChat &&activeChat._id){
  console.log("hum 1 pe hai")
  socket.emit("getChat",{userId:activeUser._id,roomId:activeChat._id})
 console.log("1 ho gya ")
}
else if(activeChat){
   console.log("hum 2 pe hai")
  setchat([]);
 console.log("2 ho gya ")
}

},[activeChat])


// to set chat

useEffect(()=>{


  socket.on("setChat",(data)=>{
    console.log("hum chat mgaaye ab save kr rhe")
    setchat(data.chat);
    console.log("sab set ho gya")
  })
  return ()=>{socket.off("setChat")}
})


// to send the msg

const sendMessage=(data:any)=>{
  
socket.emit("sendMessage",data)

}


useEffect(()=>{

socket.on("newChat",()=>{
setSearchInput("");

})
  return ()=>{socket.off("newChat")}
})

useEffect(()=>{

  socket.on("updateChatList",(data)=>{
    const c_list=chatsList;
    c_list[data._id]=data;
    setChatList(data);
    socket.emit("doDoubleTick",)
    
  })
  return ()=>{socket.off("updateChatList")}
})


useEffect(()=>{


  /* 
  data={
  room:
  msg:
  oldMsg id if its sender
 
  }
  */

  socket.on("receivMsg",(data)=>{

    const {room ,msg, oldMsgId}=data;
    const c_list=chatsList;
    c_list[room._id]=room;
    setChatList(c_list);
    socket.emit("doDoubleTick", msg._id);



    // for sender
     if(activeUser._id===msg.senderId&& activeChat._id===room._id){
      console.log("tm hi msg kiye")
const tepchats=chat;
tepchats[oldMsgId]=msg;
setchat(tepchats);

   }
    // for receiver 
   else  if(activeChat._id===room._id){
      console.log("tmhare liye msg aaya hai")
      setchat([...chat,msg])

      socket.emit("doBlueTick", msg._id);
     
    }

    console.log("sab bekaar")
    
  })


  return ()=>{socket.off("receivMsg")}
})




useEffect(()=>{
socket.on("newChatAdd",(data)=>{
  setChatList((prev:any)=>
     prev.map((room:any)=>(room.roomId.reciverId===data.oldRoomId)?{...room,roomId:data.newRoomId}:room))})
  return ()=>{socket.off("newChatAdd")}
},[])




/* 

data={

roomId
msgId
tickStatus
}

*/

useEffect(()=>{
socket.on("updateTick",(data)=>{
  setChatList((prev:any)=>
     prev.map((room:any)=>(room.roomId.reciverId===data.oldRoomId)?{...room,roomId:data.newRoomId}:room))})
  return ()=>{socket.off("newChatAdd")}
},[])
  




  


    
 const setLogout=()=>{
  socket.emit("doDisconnect");
setActiveUser({username:'sbhunk',name:"Loggin here",dp:"https://ik.imagekit.io/sbhtechhub/no_dp.jpg",loggin_token:""});

}




    return <ChatContext.Provider value={{setLogout,activeUser,activeChat,setActiveUser,setActiveChat,chatsList,setChatList,chat,setchat,searchInput,setSearchInput,sendMessage}}>
    {children}
    </ChatContext.Provider>
}


export default ChatContext;