import { useContext, useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SpeakerContext from "../voiceassistance/speaker/SpeakerContext";
import { BlueTickIcon, Copy, Dislike, DoubleTickIcon, Edit, LikeRes, SingleTickIcon, SpeakerIcon, StopspeakIcon, Trash_binIcon, UnsendIcon } from "./icons";

const ReqShow = (props: any) => {
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

  const editReq = (r: any) => {
    return;
  };

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
  return (
    <div className="message-row message-row--outgoing send_msg">
      <div className="message-stack message-stack--outgoing">
        <div className="message-bubble message-bubble--outgoing">
          <span className="msg_font_style req_cammand">
            <Markdown remarkPlugins={[remarkGfm]}>{props.msg.text}</Markdown>
          </span>
          <span className="message-time" >
            { time(props.msg.tickStatus.send) || ""}
          </span>
          {props.msg.tick==3?<BlueTickIcon/>:props.msg.tick==2?<DoubleTickIcon/>:props.msg.tick==1?<SingleTickIcon/>:<UnsendIcon/>}
        </div>

        <div className="send_msg_option message-actions">
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
            <Edit func={editReq} r_no={props.msg._id} />
          </span>

          <span className="message-action">
            <Copy func={() => copyReq(props.msg.text)} r_no={props.msg._id} />
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
  );
};

export default ReqShow;

const copyReq = (r: any) => {
  navigator.clipboard.writeText(r).then(() => alert(" text coppied."));
};
