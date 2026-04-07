


import { createContext, useState, useEffect, useContext } from "react";



const ChatContext = createContext({});



export const ChatContextProvider = ({ children }: any) => {



  // to switch Chat / AI chat
  const [appOption, setAppOption] = useState("Chat")

const [picShow,setPicShow]:any=useState({status:false})



  

  return <ChatContext.Provider value={{picShow,setPicShow, appOption, setAppOption }}>
    {children}
  </ChatContext.Provider>
}


export default ChatContext;