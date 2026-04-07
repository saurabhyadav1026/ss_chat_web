// import { createContext,useState,useEffect, useContext} from 'react';
import { createContext,useState, useContext} from 'react';
import api from '../api/api';
import UserContext from './UserContext';

const ChatsListContext =createContext({});

export const ChatsListContextProvider=({children}:any)=>{

    const [chatsList,updateChatsList] =useState({});
    const [aiChatsList,setAIChatsList]=useState({});
    const {activeUser}:any=useContext(UserContext);

    const setChatsList:any=()=>{
     if(activeUser._id){api.get("/users/getchatslist")
        .then(res=>{updateChatsList(res.data) })
        .catch(err=>console.log(err))}
        else{ updateChatsList({});}
    }

    // to set the chatlist   yani chatroom  by getfriendList or getchatList

    return < ChatsListContext.Provider value={{chatsList,setChatsList,aiChatsList,setAIChatsList}}>{children}</ChatsListContext.Provider>
}

export default ChatsListContext;
