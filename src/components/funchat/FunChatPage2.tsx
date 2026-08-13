
import React, {  useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReqShow from "../ReqShow";
import ResShow from "../ResShow";
import InputBar from "../InputBar";
import { funChatSocket } from "../../contexts/socketcontext/SocketContext";
import CreateFunRoom from "./CreateFunRoom";
import TopNav from "../TopNav";
import NotifyShow from "../NotifyShow";
import { toast } from "react-toastify";
import EnterPassword from "./EnterPassword";
import { Loader2 } from "lucide-react";
import JoinRoom from "./JoinRoom";


const generateMsgId=()=>{
  return (new Date()).toDateString()+(Math.random()*9999)%1000
}



const FunChatPage2=()=>{

 

  const [ messagesIdList, setMessagesIdList]:any = useState([]);
    const [ messages, setMessages ]: any = useState({});
    const [isLoading, setIsLoading]=useState(true);
  const [activeChat, setActiveChat]:any=useState(null);
  const { page2Id } = useParams();
  const chatPageRef = useRef<HTMLDivElement | null>(null);
const navigate= useNavigate();
const [givePassword,setIsGivePassword]= useState(false);


const send=(inputText:string)=>{
  const msgId=generateMsgId();
 
  const msg: any = {
      _id: msgId,
     text: inputText,
     by:1,
     time:Date.now()
   
    };

  setMessages({...messages,[msgId]:msg});
setMessagesIdList([...messagesIdList,msgId] )
  

  funChatSocket.emit("sendMsg",{roomCode:activeChat.roomCode,msg})
   
  
}


 useEffect(()=>{

if(page2Id?.toLowerCase()!=="new" && page2Id?.toLocaleLowerCase()!=="join"){

  funChatSocket.emit("findAndJoinFunRoom",{roomCode:page2Id});}
 },[page2Id])


useEffect(()=>{


  funChatSocket.on("receiveMsg",(data:any)=>{

    console.log(data)
setMessages({...messages,[data._id]:data});
setMessagesIdList([...messagesIdList,data._id] )
  })
return ()=>{funChatSocket.off("receiveMsg")}
})


useEffect(()=>{


  funChatSocket.on("roomNotify",(data:any)=>{

setMessages({...messages,[data._id]:data})
setMessagesIdList([...messagesIdList,data._id] )

  })
return ()=>{funChatSocket.off("roomNotify")}
})


useEffect(()=>{


  funChatSocket.on("roomJoined",(data:any)=>{
    setIsLoading(false);
  if(data.status){
    setActiveChat(data.room);
    
    setMessages({});
  }
    else if(!data.status && data.room){ 
       setActiveChat(data.room);
              setIsGivePassword(true);
       
    }
    else {
   
      toast.error("Error: "+ data.message);
      navigate("/o/funchats")
    }

  })
return ()=>{funChatSocket.off("roomJoined")}
})


useEffect(()=>{

  funChatSocket.on("deleteMsg",(data)=>{
setMessages((prev:any)=>{
  const {[data.msgId]:val,...rest}=prev;
  return rest;
})
  })


  return ()=>{funChatSocket.off("deleteMsg")}

})


const deleteMsg=(msgId:string)=>{

funChatSocket.emit("deleteMsg",{roomCode:page2Id,msgId:msgId});
setMessages((prev:any)=>{
  const {[msgId]:val,...rest}=prev;
  return rest;
})

}








  if(page2Id?.toLocaleLowerCase()==="new")return <CreateFunRoom/>
    else if(page2Id?.toLocaleLowerCase()==="join")return <JoinRoom/>
  if(isLoading)return <Loader2 />
  else if(givePassword) return <EnterPassword activeChat={activeChat}  setIsGivePassword={setIsGivePassword}/>
  else return <>
    <div className="chat-page">
     <TopNav activeChat={activeChat} toBack="/o/funchats" />

      <div className="chat-screen">
        <div className="chat-thread">
          <div ref={chatPageRef} className="chat-thread__scroll scrollbar-only-rod">
            {activeChat && activeChat.roomCode &&messagesIdList.length ? (
              messagesIdList.map(( x:any,i: any): any => 
              
                { 
                    const u= messages[x];
                    console.log(u)

               return <React.Fragment key={u._id || i}>
              
                {   u.by===1? <ReqShow  msg={u} r_no={i} deleteMsg={deleteMsg} /> :u.by===0?<NotifyShow msg={u} r_no={i} />: <ResShow deleteMsg={deleteMsg} msg={u} r_no={i} />}
                  
                </React.Fragment>
  }  )
            ) : (
              <div className="chat-thread__empty">
                <div className="chat-thread__empty-card">
                  <h3>Your thread is ready</h3>
                  <p>Send the first message to break the silence. Replies will stack here in a cleaner, calmer layout.</p>
                </div>
              </div>
            )}
          </div>

          {/* activeChat  */true? (
            <div className="container-fluid p-0 chat-compose-shell">
              <InputBar  page2Id={page2Id} send={send}/>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  
    
    </>
}

export default FunChatPage2;