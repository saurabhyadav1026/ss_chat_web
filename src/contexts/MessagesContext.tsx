import { createContext,useState} from 'react';





const MessageContext=createContext({});


export const MessageContextProvider=({children}:any)=>{

    const [messages,setMessages] :any=useState({});

    return < MessageContext.Provider value={{messages,setMessages}}>{children}</MessageContext.Provider>
}

export default MessageContext;
