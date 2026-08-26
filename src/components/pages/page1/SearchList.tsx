import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import SearchBar from "../../left_nav/SearchBar";
import UserContext from "@/contexts/UserContext";

const SearchList = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput]: any = useState("");
  const [searchList, setSearchList]: any = useState({});
  const {activeUser}:any=useContext(UserContext);




  
  useEffect(() => {
    if (searchInput !== "") {
    
      api
        .get("/users/searchlist", { params: { input: searchInput } })
        .then((res: any) => setSearchList(res.data))
        .catch((err: any) => {
          console.log(err);
        });
    }
    else{
      setSearchList({})
    }
  }, [searchInput]);

  const searchItems = Object.values(searchList || {});




const getRoomIdByReceiverId=(receiverId:any)=>{
 
return [activeUser._id,receiverId].sort().join("-");

        }

  return (
    <div className="list-panel">
      <div className="list-panel__header">
        <div>
          <p className="list-panel__eyebrow">Discover</p>
          <h2 className="list-panel__title">People</h2>
          <p className="list-panel__subtitle"></p>
        </div>
      </div>

      <SearchBar searchInput={searchInput} _placeholder="Search friends..." setSearchInput={setSearchInput} />

      <div className="list-panel__body scrollbar-only-rod">
        {searchItems.length ? (
          searchItems.map((u: any, i: any) => (
            <article key={u._id || i} className="list-card">
              <div className="chatlist_dp" style={{ backgroundImage: `url(${u.dp})` }} />

              <div className="list-card__body">
                <div className="list-card__title-row">
                  <span className="list-card__title">{u.name}</span>
                </div>
                <p className="list-card__handle">@{u.username}</p>

                <div className="list-card__actions">
                  <button type="button" className="list-card__action" onClick={() => navigate(u.username)}>
                    Profile
                  </button>
                  <button
                    type="button"
                    className="list-card__action list-card__action--primary"
                     onClick={() => navigate(`/u/chats/${getRoomIdByReceiverId(u._id)}`)}
                  >
                    Message
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="list-empty-state">
            {searchInput ? "No users matched your search yet. Try another username or name." : "Start typing to find people across the app."}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchList;
