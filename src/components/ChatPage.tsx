import React, { useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import MessageContext from "../contexts/MessagesContext.tsx";
import UserContext from "../contexts/UserContext.tsx";
import InputBar from "./InputBar.tsx";
import ReqShow from "./ReqShow";
import ResShow from "./ResShow";
import TopNav from "./TopNav.tsx";

const ChatPage = () => {
  const { messages, setMessages, activeChat, setActiveChatByChatRoomId }: any = useContext(MessageContext);
  const { page2Id } = useParams();
  const { activeUser }: any = useContext(UserContext);
  const chatPageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (page2Id) setActiveChatByChatRoomId(page2Id);
  }, [page2Id]);

  useEffect(() => {
    const divRef = chatPageRef.current;
    if (divRef) {
      divRef.scrollTop = divRef.scrollHeight;
    }
  }, [messages]);

  const threadMessages = Object.values(messages || {});

  return (
    <>
      <TopNav activeChat={activeChat.receiver} toBack="/u/chats" />

      <div className="chat-screen">
        <div className="chat-thread">
          <div  ref={chatPageRef}>
            {threadMessages.length ? (
              threadMessages.map((u: any, i: any): any => (
                <React.Fragment key={u._id || i}>
                  {u.senderId === activeUser._id ? (
                    <ReqShow activeChat={activeChat}  msg={u} r_no={i} />
                  ) : (
                    <ResShow activeChat={activeChat} msg={u} r_no={i} />
                  )}
                </React.Fragment>
              ))
            ) : (
              <div className="chat-thread__empty">
                <div className="chat-thread__empty-card">
                  <h3>Your thread is ready</h3>
                  <p>Send the first message to break the silence. Replies will stack here in a cleaner, calmer layout.</p>
                </div>
              </div>
            )}
          </div>

          {activeChat ? (
            <div className="container-fluid p-0">
              <InputBar activeChat={activeChat} setMessages={setMessages} />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ChatPage;
