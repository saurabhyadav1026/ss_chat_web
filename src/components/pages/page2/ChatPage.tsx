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

const ChatPage = () => {

  const { page2Id:activeRoomId } = useParams();
  const { activeUser ,isInternetConnection}: any = useContext(UserContext);
  const { updateChatRoom }: any = useContext(ChatsListContext);
  const { startCall }: any = useContext(CallContext)
  const chatPageRef = useRef<HTMLDivElement | null>(null);

  const messageLoaderRef = useRef(null)

  const navigate = useNavigate()


  // to get Chat  yaani messages
  const fetchMessages = async (roomId: string, cursor: any) => {
    console.log(activeChat)
    if (roomId && roomId.slice(0, 3) !== "new") {

      return await api.get("/users/getmessages", { params: { _id: roomId, cursor } })
        .then(res => res.data.messages)
        .catch(err => { throw new Error(err) })
    }
    else {
    
      throw new Error("no messages")
    }

  }



const fetchActiveChat=async(roomId:any)=>{
  //if(!isInternetConnection)return;
  return await api.get("users/getroombyroomid", { params: { _id: roomId ,socketId:socket.id} })
      .then((res) =>{ 
        if(res.data.status) return res.data.room
        else {
          navigate("/u/chats");
          return;
        }
      }
      )
      .catch((err) =>{console.log(err);
         navigate("/u/chats");
          return;
      })
}




const {data:activeChat,...activeChatProperties}:any =useQuery({
  queryKey:["activeChat",activeRoomId],
  queryFn:()=>fetchActiveChat(activeRoomId)
})




const setActiveChat=()=>{
  if(isInternetConnection)queryClient.invalidateQueries({queryKey:["activeChat",activeRoomId]})
}




  const { data: messages, ...messageProperty }: any = useInfiniteQuery({
    queryKey: ["messages", activeRoomId],
    queryFn: ({ pageParam }) => fetchMessages(activeChat._id, pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.cursor : undefined
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



  useEffect(() => {
   if(isInternetConnection ) queryClient.invalidateQueries({ queryKey: ["messages",activeRoomId] })
  }, [activeChat])



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
    if (activeRoomId && isInternetConnection )  queryClient.invalidateQueries({queryKey:["activeChat",activeRoomId]})
    
  }, [activeRoomId]);







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
    if (!activeChat)
      if (inputText.trim() === "") return;

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
      if (activeChat._id === message.roomId) {
        addMessage(message);

      }

    }
  
    socket.on("u/chats/receiveMsg", receive)
    return () => {
      socket.off("u/chats/receiveMsg", receive);
    };
  },[]);






  useEffect(() => {
    socket.on("u/chats/messageSent", (data) => {
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




  return <>
    <div className="chat-page">
      <TopNav activeChat={activeChat && activeChat.receiver?activeChat.receiver: {}} topNavOptions={topNavOptions} toBack="/u/chats" />

      <div className="chat-screen">
        <div className="chat-thread">
          <div ref={chatPageRef} className="chat-thread__scroll scrollbar-only-rod">

            <div ref={messageLoaderRef}>
              {messageProperty.isFetchingNextPage
                ? "Loading..."
                : messageProperty.hasNextPage
                  ? "Scroll for more"
                  : "No more posts"}
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
              <InputBar page2Id={activeRoomId} send={send} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  </>
};

export default ChatPage;
