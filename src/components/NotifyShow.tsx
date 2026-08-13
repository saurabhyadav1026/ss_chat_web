
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const NotifyShow = (props: any) => {
 


  const time=(timeStamp:any)=>{
    return new Date(timeStamp).toLocaleTimeString('en-IN', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
});
  }
  return (
      <div className="message-row message-row--notify">
        <div className="message-stack message-stack--outgoing">
          <div className="message-bubble message-bubble--notigfy">
            <span className="msg_font_style req_cammand">
              <Markdown remarkPlugins={[remarkGfm]}>{props.msg.text}</Markdown>
            </span>
         { props.msg.tick? <span className="message-time" >{ time(props.msg.tickStatus.send) || ""}
            </span>:<></>}
           
         </div>
  
          
        </div>
      </div>
    );
};

export default NotifyShow;

