
import { useContext, useState } from 'react';
//mport {registerUser,createSession, sendMessage} from '../../securety/msgencryption'
import ChatContext from "../../contexts/chatscontext/ChatContext"



const BlankChatPage=()=>{

const {activeUser}:any=useContext(ChatContext);
const [m,setm]=useState("");

    return<>
    <div>
<div>{m}</div>




    </div>
    
    
    </>
}

export default BlankChatPage