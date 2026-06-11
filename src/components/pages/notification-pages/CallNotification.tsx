import { PhoneIcon, PhoneOff, Video, X } from "lucide-react";

const CallNotification=(props:any)=>{
    

    return<>
    <div className="call-notification-card" role="status">
        <div className="call-notification-card__pulse" />
        <button type="button" className="call-notification-card__close" onClick={props.closeNotification} aria-label="Close call notification">
            <X size={18} />
        </button>

        <div className="call-notification-card__avatar" style={{ backgroundImage: `url(${props.activeCall.dp})` }}>
           <span className="call-notification-card__status"><Video size={13} /></span>
        </div>

        <div className="call-notification-card__content">
            <span className="call-notification-card__eyebrow">Incoming Video call</span>
            <strong className="call-notification-card__title">{props.activeCall.name}</strong>
            <span className="call-notification-card__meta">{props.activeCall.username}</span>
        </div>

        <button type="button" className="call-notification-card__pick" onClick={props.pickCall}>
            <PhoneIcon size={17} />
            <span>Accept</span>
        </button>
         <button type="button" className="call-notification-card__dismiss" onClick={props.disconnectCall}>
            <PhoneOff size={17} />
            <span>Dismiss</span>
        </button>
    </div>
    </>
}

export default CallNotification;
