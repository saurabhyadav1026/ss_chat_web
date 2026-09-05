import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import   { funChatSocket } from "../../contexts/socketcontext/SocketContext";
import SearchBar from "../left_nav/SearchBar";
import { NewChatIcon } from "../icons";
import { MessageSquareShare } from "lucide-react";







const FunChatPage1 = () => {



  


const [roomsList,setRoomsList]:any=useState({})
const [searchInput,setSearchInput]:any=useState("");
  const [chatItems,setChatItems]:any=useState(Object.values(roomsList || {}))
  const navigate = useNavigate();








useEffect(()=>{
setChatItems(roomsList)
},[roomsList])

useEffect(()=>{
if(searchInput!==""){
  const rooms:any=[]
Object.values(roomsList || {}).forEach((room:any)=>{
if(room.name.contains(searchInput))rooms.push(room);
})
setChatItems(rooms)
}else {
  setChatItems(Object.values(roomsList || {}));

}

},[searchInput])



  

useEffect(()=>{

    funChatSocket.on("newroom",(data)=>{
        setRoomsList((prev:any)=>({[data.room.id]:data.room,...prev}))
    })

return ()=>{funChatSocket.off("newroom")}
})



  return <>
    <div className="list-panel">
      <div className="list-panel__header">
        <div>
          <p className="list-panel__eyebrow">Shhhhh</p>
          <h2 className="list-panel__title">FUN CHAT</h2>
          <p className="list-panel__subtitle">Your identity is hide here. Be Safe and dont share any confidential information.</p>
        </div>
      </div>

     <SearchBar searchInput={searchInput} _placeholder="Search chats..." setSearchInput={setSearchInput} />
    <div className="container-fluid d-flex">
        <div className="list-empty-state col-6 mr-2">

               <button
                  type="button"
                  className="list-card__body"
                  onClick={() => {
                  navigate("new");
                  }}
                >
                  <div className="list-card__title-row">
                    <span className="list-card__title"><NewChatIcon/> Create Room</span>
                  
                  </div>
  
                  
                </button>
            </div>
<div className="list-empty-state col-6 ml-2">

               <button
                  type="button"
                  className="list-card__body"
                  onClick={() => {
                  navigate("join");
                  }}
                >
                  <div className="list-card__title-row">
                    <span className="list-card__title"><MessageSquareShare />Join Room</span>
                  
                  </div>
  
                  
                </button>
            </div>
    </div>

      <div className="list-panel__body scrollbar-only-rod">
        {chatItems.length ? (
          chatItems.map((u: any, i: any) => {
                    
            const avatarUrl =  u.dp || u.roomDP || "";
            
            return<>
            <article key={u._id || i} className="list-card">
              <button
                type="button"
                className="list-card__avatar chatlist_dp"
               
              
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
            

                
              </button>
            </article>
            </>
})
        ) : <></>}
      </div>
    </div>
 </>
};

export default FunChatPage1;
