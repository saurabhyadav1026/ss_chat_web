import { useContext,  useEffect,  useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatsListContext from "../../../contexts/ChatsListContext";
import SearchBar from "../../left_nav/SearchBar";
import { socket } from "../../../contexts/socketcontext/SocketContext";
//import { getFriendChatFile } from "../../../filehandeling/folder/chats";

const ChatsList = () => {
  const [searchInput, setSearchInput]: any = useState("");
  const { chatsList ,setRoom}: any = useContext(ChatsListContext);
  
  const navigate = useNavigate();
//const [chatItems,setChatItems]:any=useState(Object.values(chatsList || {}))

  
const chatItems=Object.values(chatsList || {}).sort((r1:any,r2:any)=>r2.lastMessage._id.localeCompare(r1.lastMessage._id));
 
 
useEffect(()=>{
const func=async ()=>{
  
//const chatfile=await getFriendChatFile("sbhydv");,
}
func()
},[])


/* 

useEffect(()=>{
if(searchInput!==""){
  const rooms:any=[]
Object.values(chatsList || {}).forEach((room:any)=>{
  console.log(room)
if(room.receiver.name.toLowerCase().includes(searchInput.toLowerCase())||room.receiver.username.toLowerCase().includes(searchInput.toLowerCase())||room.lastMessage.text.toLowerCase().includes(searchInput.toLowerCase()))rooms.push(room);
})
setChatItems(rooms)
}else {
  setChatItems(Object.values(chatsList || {}));

}

},[searchInput])


 */




  useEffect(() => {
    const receive = (data:any) => {
    
            const { room, message } = data;

        setRoom(room);
            socket.emit("u/chats/doOneDoubleTick", { msgId: message._id, roomId: message.roomId });


    
    }

      socket.on("u/chats/receiveMsg", receive)
    return () => {
      socket.off("u/chats/receiveMsg",receive);
    };
  });
 


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
        {chatItems.length ? (
          chatItems.map((u: any, i: any) => {
            console.log(u)
            const receiver = u.receiver || {};
            const avatarUrl = receiver.dp || u.dp || u.roomDP || "";
            const lastMessageText = u.lastMessage?.text || "";

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
})
        ) : (
          <div className="list-empty-state">Your conversations will appear here once you start messaging.</div>
        )}
      </div>
    </div>
 </>
};

export default ChatsList;
