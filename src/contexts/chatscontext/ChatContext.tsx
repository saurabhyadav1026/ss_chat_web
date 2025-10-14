


import { createContext, useState ,useEffect} from "react";
import {socket} from '../socketcontext/SocketContext.tsx'
import { getChat,getSearchList } from "../../components/userProfile/users.ts";


const ChatContext=createContext({});



export const ChatContextProvider=({children}:any)=>{


    let luser:any={username:'sbhunk',name:"Loggin here",dp:"https://ik.imagekit.io/sbhtechhub/no_dp.jpg",loggin_token:""}
    
    if(localStorage.getItem('ssapp_activeUser')){
        luser=localStorage.getItem('ssapp_activeUser');
        luser=JSON.parse(luser);
    }
    
    
    const [activeUser,setActiveUser]=useState(luser);
     
    
    useEffect(()=>{
    
    localStorage.setItem('ssapp_activeUser',JSON.stringify(activeUser))
 
    },[activeUser])
    


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
  const [activeChat, setActiveChat]:any = useState({username:null,name:null,dp:""});
  const [chatsList, setChatList] = useState([]);
    const [chat, setchat] = useState([]);
const [searchInput,setSearchInput]=useState("");
  
const updateChatChatList = async () => {
    

    let c = await getChat(activeUser.username, activeChat.username);
     let  c_list=await getSearchList(activeUser.username,searchInput);
     
    setchat(c)
    setChatList(c_list);
  }



useEffect(()=>{
updateChatChatList();
},[])
useEffect(()=>{
updateChatChatList();
},[activeChat,searchInput])



 useEffect(()=>{
socket.on("reloade",()=>{
  updateChatChatList();})
return ()=>{socket.off("reloade")}
    });

  




  


    
 const setLogout=()=>{
setActiveUser({username:'sbhunk',name:"Loggin here",dp:"https://ik.imagekit.io/sbhtechhub/no_dp.jpg",loggin_token:""});

}




    return <ChatContext.Provider value={{setLogout,activeUser,activeChat,setActiveUser,setActiveChat,chatsList,setChatList,chat,setchat,searchInput,setSearchInput}}>
    {children}
    </ChatContext.Provider>
}


export default ChatContext;