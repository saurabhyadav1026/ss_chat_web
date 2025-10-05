


import { createContext, useState ,useEffect} from "react";


const ChatContext=createContext({});



export const ChatContextProvider=({children}:any)=>{


    let luser:any={username:'sbhunk',name:"Loggin here",dp:"",loggin_token:""}
    
    if(localStorage.getItem('ssapp_activeUser')){
        luser=localStorage.getItem('ssapp_activeUser');
        luser=JSON.parse(luser);
    }
    
    
    const [activeUser,setActiveUser]=useState(luser);
     
    
    useEffect(()=>{
    
    localStorage.setItem('ssapp_activeUser',JSON.stringify(activeUser))
    console.log("local storage updated");
    },[activeUser])
    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   





    return <ChatContext.Provider value={{activeUser,setActiveUser}}>
    {children}
    </ChatContext.Provider>
}


export default ChatContext;