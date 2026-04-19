import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatsListContext from "../../../contexts/ChatsListContext";
import MessageContext from "../../../contexts/MessagesContext";
import UserContext from "../../../contexts/UserContext";
import SearchBar from "../../left_nav/SearchBar";

const ChatsList = () => {
  const { setActiveChatByChatRoomId }: any = useContext(MessageContext);
  const [searchInput, setSearchInput]: any = useState("");
  const { activeUser }: any = useContext(UserContext);
  const { chatsList }: any = useContext(ChatsListContext);
  const navigate = useNavigate();

  

  useEffect(() => {
    if (!(activeUser && activeUser._id)) navigate("/user");
  }, [activeUser]);

  const chatItems = Object.values(chatsList || {});

  return <>
    <div className="list-panel">
      <div className="list-panel__header">
        <div>
          <p className="list-panel__eyebrow">Inbox</p>
          <h2 className="list-panel__title">Chats</h2>
          <p className="list-panel__subtitle">Jump back into private conversations and keep the flow moving.</p>
        </div>
      </div>

      <SearchBar searchInput={searchInput} _placeholder="Search chats..." setSearchInput={setSearchInput} />

      <div className="list-panel__body scrollbar-only-rod">
        {chatItems.length ? (
          chatItems.map((u: any, i: any) => {
            return<>
            <article key={u._id || i} className="list-card">
              <button
                type="button"
                className="list-card__avatar chatlist_dp"
                onClick={() => navigate(`/user/profile/${u.receiver._id}`)}
               
                style={{ backgroundImage: `url(${u.receiver.dp})` }}
              >{u.receiver.dp}</button>

              <button
                type="button"
                className="list-card__body"
                onClick={() => {
                  setActiveChatByChatRoomId(u._id);
                  navigate(u._id);
                }}
              >
                <div className="list-card__title-row">
                  <span className="list-card__title">{u.receiver.name}</span>
                  {u.unreadCount > 0 ? <span className="list-card__badge">{u.unreadCount}</span> : null}
                </div>

                <p className="list-card__excerpt" title={u.lastMessage ? u.lastMessage.text : ""}>
                  {u.lastMessage.text && u.lastMessage.text.length < 70
                    ? u.lastMessage.text
                    : u.lastMessage.text
                      ? `${u.lastMessage.text.slice(0, 70)}...`
                      : "No messages yet. Start the conversation."}
                </p>
              </button>
            </article>
            </>
})
        ) : (
          <div className="list-empty-state">Your conversations will appear here once you start messaging.</div>
        )}
      </div>
    </div>
 </>
};

export default ChatsList;
