import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import MessageContext from "../../../contexts/MessagesContext";
import SearchBar from "../../left_nav/SearchBar";

const SearchList = () => {
  const navigate = useNavigate();
  const { getRoomIdByReceiverId }: any = useContext(MessageContext);
  const [searchInput, setSearchInput]: any = useState("");
  const [searchList, setSearchList]: any = useState({});

  useEffect(() => {
    if (searchInput !== "") {
      api
        .get("/users/searchlist", { params: { input: searchInput } })
        .then((res: any) => setSearchList(res.data))
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [searchInput]);

  const searchItems = Object.values(searchList || {});

  return (
    <div className="list-panel">
      <div className="list-panel__header">
        <div>
          <p className="list-panel__eyebrow">Discover</p>
          <h2 className="list-panel__title">People</h2>
          <p className="list-panel__subtitle">Search for users, open their profile, or jump straight into a direct message.</p>
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
                  <button type="button" className="list-card__action" onClick={() => navigate(u._id)}>
                    Profile
                  </button>
                  <button
                    type="button"
                    className="list-card__action list-card__action--primary"
                    onClick={async () => {
                      const t = await getRoomIdByReceiverId(u._id);
                      if (t.status) navigate(`/u/chats/${t.roomId}`);
                    }}
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
