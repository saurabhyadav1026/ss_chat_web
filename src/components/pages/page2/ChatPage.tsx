import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../../../contexts/UserContext.tsx";
import InputBar, { keyHepler } from "../../InputBar.tsx";
import ReqShow from "../../ReqShow.tsx";
import ResShow from "../../ResShow.tsx";
import TopNav from "../../TopNav.tsx";
import api from "../../../api/api.ts";
import { socket } from "../../../contexts/socketcontext/SocketContext.tsx";
import ChatsListContext from "../../../contexts/ChatsListContext.tsx";
import CallContext from "../../../contexts/CallContext.tsx";
import { toast } from "react-toastify";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import queryClient from "@/lib/queryClient.ts";



  // to get Chat  yaani messages
  const fetchMessages = async (roomId: string, cursor: any) => {
  
    if (roomId && roomId.slice(0, 3) !== "new") {

      return await api.get("/users/getmessages", { params: { _id: roomId, cursor} })
        .then(res => {
          socket.emit("u/chats/setLive",{roomId})

          return res.data.messages
        })
        .catch(err => { throw new Error(err) })
    }
    else {
    
      throw new Error("no messages")
    }

  }



const ChatPage = () => {

  const { page2Id } = useParams();
  const { activeUser ,isInternetConnection}: any = useContext(UserContext);
  const { updateChatRoom ,activeChat , setActiveFriendChatRoomId ,refreshFriendsChatsList}: any = useContext(ChatsListContext);
  const { startCall }: any = useContext(CallContext);
  const [isLive,setIsLive]=useState<Boolean>(false);
  const chatPageRef = useRef<HTMLDivElement | null>(null);

  const messageLoaderRef = useRef(null)

  const navigate = useNavigate()




 useEffect(()=>{
setActiveFriendChatRoomId(page2Id)
  },[page2Id])

  const { data: messages, ...messageProperty }: any = useInfiniteQuery({
    queryKey: ["messages", activeChat?._id],
    queryFn: ({ pageParam }) => fetchMessages(activeChat!._id, pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage:any) => lastPage.hasMore ? lastPage.cursor : undefined,
    enabled:!!(activeChat && activeChat._id)
  })



  const addMessage = (message: any) => {
    queryClient.setQueryData(["messages", activeChat._id], (oldData: any) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map((page: any, index: number) => {
          if (index != 0) return page;
          return {
            messagesIdList: [...page.messagesIdList, message._id],
            messages: { ...page.messages, [message._id]: message }
          }
        })
      }
    })
  }

  const updateNewMessage = (message: any) => {
    queryClient.setQueryData(["messages", activeChat._id], (oldData: any) => {
      if (!oldData) return oldData;

console.log(message)
      return {
        ...oldData,
        pages: oldData.pages.map((page: any, index: number) => {
          if (!page.rooms || !page.rooms[message._id]) return page;
          return {
            ...page,
            messagesIdList: oldData[index].messagesIdList.map((id: string) => id == message._id ? message._id : id)
          }
        })
      }


    })
  }

  const updateMessage = (message: any) => {
    queryClient.setQueryData([message, activeChat._id], (oldData: any) => {
      if (!oldData) return oldData;


      return {
        ...oldData,
        pages: oldData.pages.map((page: any) => {
          if (!page.rooms[message._id]) return page;
          return {
            ...page,
            messages: { ...page.messages, [message._id]: message }
          }
        })
      }


    })

  }




useEffect(()=>{
setIsLive(activeChat?activeChat.isLive:false)
},[activeChat])


  /*  observer for lazy fetching  */
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        messageProperty.hasNextPage &&
        !messageProperty.isFetchingNextPage
      ) {
        messageProperty.fetchNextPage();
      }
    });

    const loader = messageLoaderRef.current;
    if (loader) observer.observe(loader);

    return () => observer.disconnect();
  }, [messageProperty.fetchNextPage, messageProperty.hasNextPage, messageProperty.isFetchingNextPage]);






  useEffect(()=>{
const setLive=(data:any)=>{
  if(activeChat._id===data.roomId){setIsLive(true)}
  
}

socket.on("u/chats/setLive",setLive);
return ()=>{socket.off("u/chats/setLive",setLive)}
  },[])


  

  useEffect(()=>{
const setOffLive=(data:any)=>{
if(data.roomId===activeChat._id)setIsLive(false)
}

socket.on("setOffLive",setOffLive);
return ()=>{socket.off("setOffLive",setOffLive)}
  },[])


  const openProfile = () => {

    navigate("/u/chats/profile/" + activeChat.receiver.username)
  }
  const clearChat = () => {
    if (confirm("Are you sure to clear the chat?")) {
      api.get("/users/clearchat", { params: { roomId: activeChat._id } }).
        then((res) => {
          if (res.data.status) { };
        }).catch((err) => console.log(err))
    }

  }
  const blockUser = () => {

    if (confirm("Are you sure want to block user?")) {
      api.get("/users/blockuser", { params: { _id: activeChat.receiver._id } }).
        then((res) => {
          if (res.data.status) {
            toast.success("user blocked")
          };
        }).catch(() => toast.error("failed to block"))
    }
  }

  const reportUser = () => {


    if (confirm("Are you sure want to report user?")) {
      api.get("/users/reportuser", { params: { _id: activeChat.receiver._id } }).
        then((res) => {
          if (res.data.status) {
            toast.success("user reported")
          };
        }).catch(() => { toast.error("Failed to report") })
    }

  }
  const lockChat = () => {

    if (confirm("Are you sure want to lock chat?")) {
      api.get("/users/lockchat", { params: { roomId: activeChat._id } }).
        then((res) => {
          if (res.data.status) {
            toast.success("chat locked")
          };
        }).catch(() => toast.error("Failed to lock the chat"))
    }
  }
  const hideChat = () => {

    if (confirm("Are you sure want to  the chat?")) {

      api.get("/users/hidechat", { params: { roomId: activeChat._id } }).
        then((res) => {
          if (res.data.status) {
            toast.success("chat hide")
          };
        }).catch(() => toast.error("failed to hide chat"))
    }
  }

  const call = () => {
    startCall(activeChat._id);
  }

  const topNavOptions = {
    "call": call,
    "Profile": openProfile,
    "Clear Chat": clearChat,
    "Lock Chat": lockChat,
    "Hide Chat": hideChat,
    "Block": blockUser,
    "Report": reportUser



  }



  useEffect(() => {
    const divRef = chatPageRef.current;
    if (divRef) {
      divRef.scrollTop = divRef.scrollHeight;
    }
  }, [messages]);






  useEffect(() => {
    keyHepler.clear();
  }, [activeChat])








  const send = async (inputText: string) => {

    if (!activeChat || inputText.trim() === "") return;

    const newMsgId = createTempMsgId();
    const msg: any = {
      _id: newMsgId,
      roomId: activeChat._id,
      senderId: activeUser._id,
      text: inputText,
      tick: 0,
      tickStatus: { send: new Date() },
    };

    addMessage(msg);
    if(activeChat._id.slice(0,3)!=="new")updateChatRoom({...activeChat,["lastMessage"]:msg})

    const newMsg: any = {
      _id: newMsgId,
      roomId: activeChat._id,
      text: inputText               //getMemberTextCopy([activeUser._id, activeChat.receiver._id], inputText),
    };

    socket.emit("u/chats/sendMessage", newMsg);
  };




  useEffect(() => {
    const receive = (data: any) => {
    
      const { message } = data;
  
     if(activeChat._id===message.roomId) addMessage(message);

      

    }
  
    socket.on("u/chats/receiveMsg", receive)
    return () => {
      socket.off("u/chats/receiveMsg", receive);
    };
  },[]);





 
  useEffect(() => {
    socket.on("u/chats/messageSent", (data) => {
 
      if(activeChat._id?.slice(0,3)==="new" && activeChat._id.slice(3)===data.room.receiver._id){
  
        updateChatRoom(data.room)
        navigate("/u/chats/"+data.room._id);
        return;
      }
      
      const message = data.message;
      updateChatRoom(data.room);

      if (activeChat._id === message.roomId) {
        updateNewMessage(message);

      }

    });

    return () => {
      socket.off("u/chats/messageSent");
    };
  });

  useEffect(() => {
    socket.on("u/chats/messageNOtSent", (data) => {

      toast.error("msg not sent " + data)
    });

    return () => {
      socket.off("u/chats/messageNotSent");
    };
  });




  const createTempMsgId = () => {
    return String(Date.now() + (Math.floor(Math.random() * 999) + 1));
  };









  /* ======== */

  const back=()=>{
    socket.emit("u/chats/setOffLive",{roomId:activeChat._id});
   
  }



  return <>
    <div className="chat-page">
      <TopNav  isLive={isLive} activeChat={activeChat && activeChat.receiver?activeChat.receiver: {}} topNavOptions={topNavOptions} back={back} toBack="/u/chats" />

      <div className="chat-screen">
        <div className="chat-thread">
          <div ref={chatPageRef} className="chat-thread__scroll scrollbar-only-rod">

            <div ref={messageLoaderRef}>
              {messageProperty.isFetchingNextPage
                ? "Loading..."
                : ""}
            </div>
           

            {messages && messages.pages ? messages.pages.map((msg: any) => msg.messagesIdList.map((id: string, i: any): any => {
             
             const u = msg.messages[id]
             
              return (<React.Fragment key={u._id || i}>
                {u.senderId === activeUser._id ? (
                  <ReqShow msg={u} r_no={i} />
                ) : (
                  <ResShow msg={u} r_no={i} />
                )}
              </React.Fragment>

              )
            }
            )
            )
              : (
                <div className="chat-thread__empty">
                  <div className="chat-thread__empty-card">
                    <h3>Your thread is ready</h3>
                    <p>Send the first message to break the silence. Replies will stack here in a cleaner, calmer layout.</p>
                  </div>
                </div>
              )}
          </div>

          {activeChat ? (
            <div className="container-fluid p-0 chat-compose-shell">
          {   page2Id && <InputBar  send={send} />}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  </>
};

export default ChatPage;
