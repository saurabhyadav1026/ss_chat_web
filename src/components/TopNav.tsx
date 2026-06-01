import { useNavigate } from "react-router-dom";
import { EllipsisVertical } from "lucide-react";

const TopNav = (props: any) => {
  const navigate = useNavigate();

  return (
    <div className="chat-topbar">
      <button type="button" className="chat-topbar__back" onClick={() => navigate(props.toBack)}>
        &larr;
      </button>

      {props.activeChat ? (
        <div className="chat-topbar__identity">
          <div
            className="chat-topbar__avatar"
            onClick={() => navigate(`/u/chats/profile/${props.activeChat.username}`)}
            style={{ backgroundImage: `url(${props.activeChat.dp})` }}
          />
          <div>
         {/*    <p className="chat-topbar__label">Direct conversation</p> */}
            <h3 className="chat-topbar__title" onClick={() => navigate(`/u/chats/profile/${props.activeChat.username}`)}>
              {props.activeChat.name}
            </h3>
          </div>
        </div>
      ) : (
        <div className="chat-topbar__identity">
          <div id="logo_icon" className="chat-topbar__avatar" />
          <div>
            <p className="chat-topbar__label">Secret Secure</p>
            <h3 className="chat-topbar__title">Private conversations</h3>
          </div>
        </div>
      )}

 <button type="button" className="chat-topbar__menu" onClick={() => navigate(`/u/chats/profile/${props.activeChat.username}`)}>
      <EllipsisVertical/>
      </button>

    
    </div>
  );
};

export default TopNav;
