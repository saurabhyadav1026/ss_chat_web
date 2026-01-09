import {  createContext, useState } from "react";


const AIChatContext =createContext({});



export const AIChatContextProvider=({ children }: any)=>{



const [aiChat,setAIChat]=useState({})

const [aiChatsList,setAIChatsList]=useState({})


    return <AIChatContext.Provider value={{aiChat,setAIChat,aiChatsList,setAIChatsList}}>{children}</AIChatContext.Provider>
}



export default AIChatContext;
