import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../contexts/UserContext.tsx";
import ListenerContext from "../voiceassistance/listener/ListenerContext.tsx";
import { socket } from "../contexts/socketcontext/SocketContext.tsx";
import { LoadingIcon, SendIcon } from "./icons.tsx";

export const keyHepler = new Map();

const InputBar = (props: any) => {
  const { transcript, resetTranscript }: any = useContext(ListenerContext);
  const { activeUser }: any = useContext(UserContext);
  const { activeChat, setMessages }: any = props;

  const [isListening]: any = useState(false);
  const [inputValue, setInputValue]: any = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const send = async () => {
    const inputText = inputValue;
    setInputValue("");
    resetTranscript();
    if (inputValue.trim() === "") return;

    const newMsgId = createTempMsgId();
    const msg: any = {
      _id: newMsgId,
      roomId: activeChat._id,
      senderId: activeUser._id,
      text: inputText,
      tick: 0,
      tickStatus: { send: new Date() },
    };

    setMessages((prev: any) => ({ ...prev, [newMsgId]: msg }));

    const newMsg: any = {
      _id: newMsgId,
      roomId: activeChat._id,
      senderId: activeUser._id,
      texts: getMemberTextCopy([activeUser._id, activeChat.receiver._id], inputText),
    };

    socket.emit("sendMessage", newMsg);
  };

  useEffect(() => {
    socket.on("receivMsg", (data) => {
      const { msg } = data;

      if (activeUser._id === msg.senderId && activeChat._id === msg.roomId) {
        keyHepler.set(msg._id, data.oldMsgId);
        setMessages((prev: any) => ({ ...prev, [data.oldMsgId]: msg }));
      } else {
        socket.emit("doDoubleTick", msg._id);
        if (activeChat._id === msg.roomId) {
          setMessages((prev: any) => ({ ...prev, [msg._id]: msg }));
          socket.emit("doBlueTick", msg._id);
        }
      }
    });

    return () => {
      socket.off("receivMsg");
    };
  });

  const getMemberTextCopy = (members: any, inputText: String) => {
    const texts: any = [];
    members.forEach((x: any) => {
      texts.push({ memberId: x, text: inputText });
    });

    return texts;
  };

  const createTempMsgId = () => {
    return String(Date.now() + (Math.floor(Math.random() * 999) + 1));
  };

  const keyFunctions = async (e: any) => {
    if (!e.shiftKey && e.key === "Enter") {
      await send();
      const el = textareaRef.current;
      if (el) {
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      }
    }
  };

  const onInputChange = (e: any) => {
    setInputValue(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (isListening) {
      const t: string = `${inputValue} ${transcript}`;
      setInputValue(t);
      resetTranscript();
    }
  }, [transcript, isListening]);

  if (activeChat === null) return <></>;

  return (
    <div id="text_input_bar" className="chat-compose p-3">
      <textarea
        id="cammand_input"
        ref={textareaRef}
        className="chat-compose__textarea"
        name="ignore-history"
        rows={1}
        onChange={onInputChange}
        value={inputValue}
        onKeyUp={(key) => {
          keyFunctions(key);
        }}
        placeholder="Write a message..."
      />

      <div id="send_input_btn" className="chat-compose__send">
        {props.isFetching ? <LoadingIcon /> : <SendIcon func={send} />}
      </div>
    </div>
  );
};

export default InputBar;
