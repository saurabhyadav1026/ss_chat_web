import { useContext, useEffect, useState } from "react";
import UserContext from "../../../contexts/UserContext";
import ChatsListContext from "../../../contexts/ChatsListContext";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../left_nav/SearchBar";
import { NewChatIcon } from "../../icons";

const AiChatsList = () => {
  
    const [searchInput, setSearchInput]: any = useState("");
    const { activeUser }: any = useContext(UserContext);
    const {aiChatsList, refreshAIchatList}: any = useContext(ChatsListContext);
    const navigate = useNavigate();
    const [chatItems,setChatItems]:any=useState(Object.values(aiChatsList))
  
    useEffect(()=>{
refreshAIchatList();
    },[])
  
  

useEffect(()=>{
if(searchInput!==""){
  const rooms:any=[]
Object.values(aiChatsList || {}).forEach((room:any)=>{
  console.log(room)
if(room.name.toLowerCase().includes(searchInput.toLowerCase()))rooms.push(room);
})
setChatItems(rooms)

}else setChatItems(Object.values(aiChatsList || {}));

},[searchInput])



  
    useEffect(() => {
      if (!(activeUser && activeUser._id)) navigate("/user/login");
    }, [activeUser]);
  
  
  
    return <>
    
      <div className="list-panel">

        
        <div className="list-panel__header">
          <div>
            <p className="list-panel__eyebrow">SBH AI</p>
            <h2 className="list-panel__title">SBH AI</h2>
            <p className="list-panel__subtitle"></p>
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
                    <span className="list-card__title"><NewChatIcon/> New Chat</span>
                  
                  </div>
  
                  
                </button>
            </div>
        <div className="list-panel__body scrollbar-only-rod">
          {chatItems.length ? (
            chatItems.map((u: any, i: any) => {
              
              
  
              return<>
              <article key={u._id || i} className="list-card">
               
  
                <button
                  type="button"
                  className="list-card__body"
                  onClick={() => {
                  navigate(u._id);
                  }}
                >
                  <div className="list-card__title-row">
                    <span className="list-card__title">{u.name}</span>
                  
                  </div>
  
                  
                </button>
              </article>
              </>
  })
          ) : <></>}
        </div>
      </div>
   </>
};

export default AiChatsList;
