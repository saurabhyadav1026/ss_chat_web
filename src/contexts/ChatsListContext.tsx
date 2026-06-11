
import { createContext,useState, useContext, useEffect} from 'react';
import api from '../api/api';
import UserContext from './UserContext';

const ChatsListContext =createContext({});

export const ChatsListContextProvider=({children}:any)=>{

    const [chatsList,updateChatsList]:any =useState({});

    const [aiChatsList,setAIChatsList]=useState({});
    const {activeUser}:any=useContext(UserContext);

    const setChatsList:any=()=>{
     if(activeUser._id){
        
        api.get("/users/getchatslist")
        .then(res=>{updateChatsList(res.data);
          
         })
        .catch(err=>console.log(err))
        
        api.get("/ai/textassistance/rooms")
        .then(res=>{setAIChatsList(res.data);
            
         })
        .catch(err=>{console.log(err);setAIChatsList({})})
        
    }
        else{
             updateChatsList({});}
    }

const addAiChatRoom=(room:any)=>{
    setAIChatsList((prev:any)=>({...prev,[room._id]:room}))
}



useEffect(()=>{

const func=async()=>{
    await setChatsList();
}
    func();

},[activeUser])

    const setRoom=(room:any)=>{
       
       if(chatsList[room._id]) updateChatsList({ ...chatsList,[room._id]:{...chatsList[room._id],lastMessage:room.lastMessage} })
       else updateChatsList({...chatsList,[room._id]:room})

    }

    const setLastMessage=(msg:any)=>{
         updateChatsList((prev: any) => ({ ...prev, [msg.roomId]:{...prev[msg.roomId],lastMessage:msg }}))

    }
    
    // to set the chatlist   yani chatroom  by getfriendList or getchatList

    return < ChatsListContext.Provider value={{chatsList,setChatsList,aiChatsList,setAIChatsList,setLastMessage,setRoom,addAiChatRoom}}>{children}</ChatsListContext.Provider>
}

export default ChatsListContext;
