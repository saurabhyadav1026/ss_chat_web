import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../contexts/socketcontext/SocketContext";
import SearchBar from "../left_nav/SearchBar";
import { NewChatIcon } from "../icons";







const FunChatPage1 = () => {

const [rooms,setRooms]:any=useState({})
const [searchInput,setSearchInput]:any=useState("");

  const navigate = useNavigate();

  useEffect(()=>{

//socket.connect();


  })

useEffect(()=>{

    socket.on("newroom",(data)=>{
        setRooms((prev:any)=>({[data.room.id]:data.room,...prev}))
    })

return ()=>{socket.off("newroom")}
})



  const chatItems = Object.values(rooms|| {});

  return <>
    <div className="list-panel">
      <div className="list-panel__header">
        <div>
          <p className="list-panel__eyebrow">Inbox</p>
          <h2 className="list-panel__title">Shhhhhh</h2>
          <p className="list-panel__subtitle">Your identity is hide.</p>
        </div>
      </div>

     <SearchBar searchInput={searchInput} _placeholder="Search chats..." setSearchInput={setSearchInput} />
      <div className="list-empty-state">

               <button
                  type="button"
                  className="list-card__body"
                  onClick={() => {
                  navigate("/u/aichats/new");
                  }}
                >
                  <div className="list-card__title-row">
                    <span className="list-card__title"><NewChatIcon/> Create Room</span>
                  
                  </div>
  
                  
                </button>
            </div>

      <div className="list-panel__body scrollbar-only-rod">
        {chatItems.length ? (
          chatItems.map((u: any, i: any) => {
            console.log(u)
           
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
