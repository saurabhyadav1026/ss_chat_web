import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatsListContext from "../../../contexts/ChatsListContext";
import api from "../../../api/api";
import InputBar, { keyHepler } from "../../InputBar";
import ReqShow from "../../ReqShow";
import ResShow from "../../ResShow";


const ChatPage = () => {
  const [ messages, setMessages ]: any = useState({});
  const [activeRoomId,setActiveRoomId]:any=useState("new");
  const { page2Id } = useParams();
  const {addAiChatRoom}:any=useContext(ChatsListContext)
  const chatPageRef = useRef<HTMLDivElement | null>(null);


const navigate=useNavigate();

  
  useEffect(() => {
    if (page2Id &&page2Id.trim()!=activeRoomId){
      if(page2Id.trim()==="new"){setActiveRoomId("new");return;}
  api.get("/ai/textassistance/checkroom",{params:{roomId:page2Id.trim()}}).
  then(res=>{
if(res.data.status)setActiveRoomId(res.data.roomId);
else navigate("/u/aichats/new")
  })
  .catch((err)=>{
    console.error(err);
    navigate("/u/aichats/new");
  })
    
  }
  if(!page2Id) navigate("/u/aichats/new");
}
  , [page2Id]);






  useEffect(() => {
    const divRef = chatPageRef.current;
    if (divRef) {
      divRef.scrollTop = divRef.scrollHeight;
    }
  }, [messages]);



  /* rtgjrtmgtkljmkltmybkl */


    useEffect(() => {
      keyHepler.clear();
    }, [activeRoomId])

  // to get Chat  yaani messages
  useEffect(() => {
    if (activeRoomId && activeRoomId!=="new") {
     api.get("/ai/textassistance/messages",{params:{ roomId: activeRoomId}})
     .then(res=>{setMessages(res.data.messages); })
     .catch(err=>console.error(err))
    }
    else if (activeRoomId==="new") {
      setMessages({});
    }

  }, [activeRoomId])




    
    const send = async (inputText:string) => {
    
      if(inputText.trim()=="")return;
    if(activeRoomId==="new")  {
      setMessages((prev:any)=>({...prev,["newsbh"]:{query:inputText,response:"searching....."}}))
      api.get("/ai/textassistance/newask",{params:{query:inputText}})
      .then((res)=>{
        navigate(`/u/aichats/${res.data.room._id}`)
        addAiChatRoom(res.data.room);
       /*  setMessages((prev:any)=>{
          const {newsbh,...old}:any=prev;
          return {...old,[res.data.message._id]:res.data.message}
        })
 */
      }).catch(err=>console.error(err))
    }
    else{


   setMessages((prev:any)=>({...prev,["newsbh"]:{query:inputText,response:"searching....."}}))
      api.get("/ai/textassistance/ask",{params:{query:inputText,roomId:activeRoomId}})
      .then((res)=>{
        
        setMessages((prev:any)=>{
          const {newsbh,...old}:any=prev;
          return {...old,[res.data.message._id]:res.data.message}
        })

      }).catch(err=>console.error(err))



    }
    };
  
  
  
  
  
  
  




/* ======== */


  const threadMessages = Object.values(messages || {});

  return <>
    <div className="chat-page">
      <div className="chat-topbar__back col-1 m-4 d-flex " style={{height:"50px", alignItems:"center",justifyContent:"center" ,borderRadius:"25px"}} onClick={()=>navigate("/u/aichats")} > &larr;</div>

      <div className="chat-screen">
        <div className="chat-thread">
          <div ref={chatPageRef} className="chat-thread__scroll scrollbar-only-rod">
            {threadMessages.length ? (
              threadMessages.map((u: any, i: any): any => (
                <React.Fragment key={u._id || i}>
               
                    <ReqShow  msg={{text:u.query}} r_no={i} />
                 
                    <ResShow  msg={{text:u.response}} r_no={i} />
               
                </React.Fragment>
              ))
            ) : (
              <div className="chat-thread__empty">
                <div className="chat-thread__empty-card">
                  <h3>Hey! I am Your Assistance.</h3>
                  <p>You can ask me any doubt</p>
                </div>
              </div>
            )}
          </div>

          {activeRoomId ? (
            <div className="container-fluid p-0 chat-compose-shell">
              <InputBar  page2Id={page2Id} send={send}/>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  </>
};

export default ChatPage;
