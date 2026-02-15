import { createContext,useState} from 'react';





const ChatsListContext =createContext({});


export const ChatsListContextProvider=({children}:any)=>{

    const [chatsList,setChatsList]:any =useState({});

    return < ChatsListContext.Provider value={{chatsList,setChatsList}}>{children}</ChatsListContext.Provider>
}

export default ChatsListContext;
