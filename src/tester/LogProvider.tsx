import { Children,createContext,useState } from "react"


const LogContext:any=createContext(null);


export const LogProvider:any=()=>{


const [active_user,setUser]=useState();
const [active_chat,setActiveChat]=useState();

const [personal_ifo,setPersonalInfo]=useState();
const [chat,setChat]=useState();

const [chats_list,setChatList]=useState();

const [card_info,setCardInfo]=useState();














    return(
        <LogContext.Provider>
            {Children}
        </LogContext.Provider>
    )


}
