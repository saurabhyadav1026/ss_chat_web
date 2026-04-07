import { useNavigate } from "react-router-dom";

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
            onClick={() => navigate(`/user/profile/${props.activeChat._id}`)}
            style={{ backgroundImage: `url(${props.activeChat.dp})` }}
          />
          <div>
            <p className="chat-topbar__label">Direct conversation</p>
            <h3 className="chat-topbar__title" onClick={() => navigate(`/user/profile/${props.activeChat._id}`)}>
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

      <div className="chat-topbar__meta">Secure thread</div>
    </div>
  );
};

export default TopNav;
