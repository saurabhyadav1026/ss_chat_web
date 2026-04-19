import { useContext, useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SpeakerContext from "../voiceassistance/speaker/SpeakerContext.tsx";
import { Copy, Dislike, LikeRes, SpeakerIcon, StopspeakIcon, Trash_binIcon } from "./icons";

const ResShow = (props: any) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { startSpeaking, stopSpeaking }: any = useContext(SpeakerContext);
  const [likecolor, setLikecolor] = useState("gray");
  const [dislikecolor, setDislikecolor] = useState("gray");

  useEffect(() => {
    if (likecolor === "blue") {
      setDislikecolor("gray");
    }
  }, [likecolor]);

  useEffect(() => {
    if (dislikecolor === "blue") {
      setLikecolor("gray");
    }
  }, [dislikecolor]);

  const deleteMsg = (msgId: any) => {
    alert(`deletinng msg${msgId}`);
  };

  const time=(timeStamp:any)=>{
    return new Date(timeStamp).toLocaleTimeString('en-IN', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
});
  }

  return <>
    <div className="message-row message-row--incoming receiv_msg">
      <div className="message-stack message-stack--incoming">
        <div className="message-bubble message-bubble--incoming">
          <span className="msg_font_style">
            <Markdown remarkPlugins={[remarkGfm]}>{props.msg.text}</Markdown>
          </span>
          <span className="message-time">{props.msg.tickStatus.send ? time( props.msg.tickStatus.send) : ""}</span>
        </div>

        <div className="receiv_msg_option message-actions">
          <span className="message-action">
            {!isSpeaking ? (
              <SpeakerIcon
                func={async () => {
                  setIsSpeaking(true);
                  await startSpeaking(props.msg.text);
                }}
              />
            ) : (
              <StopspeakIcon
                func={() => {
                  setIsSpeaking(false);
                  stopSpeaking();
                }}
              />
            )}
          </span>

          <span className="message-action">
            <Copy func={() => copyRes(props.msg.text)} r_no={props.msg._id} />
          </span>

          <span className="message-action">
            <LikeRes
              color_={likecolor}
              func={() => {
                if (likecolor === "blue") setLikecolor("gray");
                else setLikecolor("blue");
              }}
              r_no={props.msg._id}
            />
          </span>

          <span className="message-action">
            <Dislike
              color_={dislikecolor}
              func={() => {
                if (dislikecolor === "blue") setLikecolor("gray");
                else setDislikecolor("blue");
              }}
              r_no={props.msg._id}
            />
          </span>

          <span className="message-action">
            <Trash_binIcon func={() => deleteMsg(props.msg._id)} />
          </span>
        </div>
      </div>
    </div>
</>
};

export default ResShow;

const copyRes = (r: any) => {
  navigator.clipboard.writeText(r).then(() => alert(" text coppied."));
};
