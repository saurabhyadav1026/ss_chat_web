import { useContext,  useEffect,  useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatsListContext from "../../../contexts/ChatsListContext";
import SearchBar from "../../left_nav/SearchBar";
const ChatsList = () => {
  const [searchInput, setSearchInput]: any = useState("");
  const { chatsList, updateChatRoom}: any = useContext(ChatsListContext);
  
  const navigate = useNavigate();







  return <>
    <div className="list-panel">
      <div className="list-panel__header">
        <div>
         {/*  <p className="list-panel__eyebrow">Inbox</p> */}
          <h2 className="list-panel__title">Chats</h2>
          <p className="list-panel__subtitle"></p>
        </div>
      </div>

      <SearchBar searchInput={searchInput} _placeholder="Search chats..." setSearchInput={setSearchInput} />

      <div className="list-panel__body scrollbar-only-rod">
       {console.log(chatsList)}
    { chatsList &&chatsList.pages && chatsList.pages[0].roomsIdList && chatsList.pages[0].roomsIdList.length ? (
          chatsList?.pages.map((page:any) => page.roomsIdList.map((id:any, i:number)=>{
            const u=page.rooms[id];
            console.log(u)
            if(!u)return<></>
            const receiver = u.receiver || {};
            const avatarUrl = receiver.dp || u.dp || u.roomDP || "";
            const lastMessageText:any =  u.lastMessage.text ||  "";

            return<>
            <article key={u._id || i} className="list-card">
              <button
                type="button"
                className="list-card__avatar chatlist_dp"
                onClick={() => {
                 navigate(`/u/profile/${receiver.username}`);
                }}
                aria-label={receiver.name ? `Open ${receiver.name}'s profile` : "Open profile"}
              >
                <div className="chatlist_dp" style={avatarUrl ? { backgroundImage: `url(${avatarUrl})` } : undefined} />
              </button>

              <button
                type="button"
                className="list-card__body"
                onClick={() => {
                  navigate(u._id);
                }}
              >
                <div className="list-card__title-row">
                  <span className="list-card__title">{receiver.name}</span>
                  <span>{u.receiver.isUserActive?"Active":"Offline"}</span>
                  {u.unreadCount > 0 ? <span className="list-card__badge">{u.unreadCount}</span> : null}
                </div>

                <p className="list-card__excerpt" title={lastMessageText}>
                  {lastMessageText && lastMessageText.length < 70
                    ? lastMessageText
                    : lastMessageText
                      ? `${lastMessageText.slice(0, 70)}...`
                      : "No messages yet. Start the conversation."}
                </p>
              </button>
            </article>
            </>
} )
          
)
        ) : (
          <div className="list-empty-state">Your conversations will appear here once you start messaging.</div>
        )}
      </div>
    </div>
 </>
};

export default ChatsList;
