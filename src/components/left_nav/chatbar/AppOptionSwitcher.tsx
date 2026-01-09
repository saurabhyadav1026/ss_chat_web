import { useContext } from "react";
import ChatContext from "../../../contexts/chatscontext/ChatContext";
import ChatList from "./ChatList";
import AIChatList from "./AIChatList";




 const AppOptionSwitcher=()=>{

const {appOption}:any=useContext(ChatContext)

return <>
{appOption==="Chat"?<ChatList/>:
 appOption==='AI'?<AIChatList/>:
 <div className="container p-0 m-0 d-flex flex-column"><h3>Select your option</h3></div>
}

            </>


}


export default AppOptionSwitcher;