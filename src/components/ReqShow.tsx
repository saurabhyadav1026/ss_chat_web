import { useContext, useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SpeakerContext from "../voiceassistance/speaker/SpeakerContext";
import { Copy, Dislike, Edit, LikeRes, SpeakerIcon, StopspeakIcon, Trash_binIcon } from "./icons";

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
    const text: any = document.getElementsByClassName("req_cammand")[r]?.innerHTML;
    (document.getElementById("cammand_input") as HTMLInputElement).value = text;

    const tempChat: any = [...props.chats];
    tempChat[props.active_chat].reqs = tempChat[props.active_chat].reqs.slice(0, r);
    tempChat[props.active_chat].ress = tempChat[props.active_chat].ress.slice(0, r);

    props.setChats(tempChat);
  };

  const deleteMsg = (activeUser: any, activeChat: any, time: any) => {
    alert(`deletinng msg${activeUser}${activeChat}${time}`);
  };

  return (
    <div className="message-row message-row--outgoing send_msg">
      <div className="message-stack message-stack--outgoing">
        <div className="message-bubble message-bubble--outgoing">
          <span className="msg_font_style req_cammand">
            <Markdown remarkPlugins={[remarkGfm]}>{props.req_}</Markdown>
          </span>
          <span className="message-time" />
        </div>

        <div className="send_msg_option message-actions">
          <span className="message-action">
            {!isSpeaking ? (
              <SpeakerIcon
                func={async () => {
                  setIsSpeaking(true);
                  await startSpeaking(props.req_);
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
            <Edit func={editReq} r_no={props.r_no} />
          </span>

          <span className="message-action">
            <Copy func={() => copyReq(props.req_)} r_no={props.r_no} />
          </span>

          <span className="message-action">
            <LikeRes
              color_={likecolor}
              func={() => {
                if (likecolor === "blue") setLikecolor("gray");
                else setLikecolor("blue");
              }}
              r_no={props.r_no}
            />
          </span>

          <span className="message-action">
            <Dislike
              color_={dislikecolor}
              func={() => {
                if (dislikecolor === "blue") setLikecolor("gray");
                else setDislikecolor("blue");
              }}
              r_no={props.r_no}
            />
          </span>

          <span className="message-action">
            <Trash_binIcon func={() => deleteMsg(props.activeUser, props.active_chat, props.time)} />
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
