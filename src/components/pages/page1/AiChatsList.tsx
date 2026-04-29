import { useContext, useEffect, useState } from "react";
import UserContext from "../../../contexts/UserContext";
import ChatsListContext from "../../../contexts/ChatsListContext";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../left_nav/SearchBar";
import { NewChatIcon } from "../../icons";

const AiChatsList = () => {
  
    const [searchInput, setSearchInput]: any = useState("");
    const { activeUser }: any = useContext(UserContext);
    const {aiChatsList}: any = useContext(ChatsListContext);
    const navigate = useNavigate();
  


useEffect(()=>{



},[])


    
  
    useEffect(() => {
      if (!(activeUser && activeUser._id)) navigate("/user/login");
    }, [activeUser]);
  
    const chatItems = Object.values(aiChatsList || {});
  
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
