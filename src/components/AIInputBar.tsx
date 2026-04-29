import { useContext, useEffect, useRef, useState } from "react";
import ListenerContext from "../voiceassistance/listener/ListenerContext.tsx";
import { socket } from "../contexts/socketcontext/SocketContext.tsx";
import { LoadingIcon, SendIcon } from "./icons.tsx";
import ChatsListContext from "../contexts/ChatsListContext.tsx";

export const keyHepler = new Map();

const InputBar = (props: any) => {
  const { transcript, resetTranscript }: any = useContext(ListenerContext);
  const {setRoom}:any=useContext(ChatsListContext);
  const { activeAIChat, setAIMessages }: any = props;

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
      roomId: activeAIChat._id,
      req:inputText
    };

    setAIMessages((prev: any) => {return{ ...prev, [newMsgId]: msg }});
    socket.emit("u/chats/ai/sendMessage", msg);
    
  };




  useEffect(() => {
    socket.on("u/chats/ai/receiveMsg", (data) => {
    
      const { room,message } = data;
      setRoom(room);
        socket.emit("u/chats/doOneDoubleTick", {msgId:message._id,roomId:message.roomId});
        if (activeAIChat._id === message.roomId) {
          setAIMessages((prev: any) => ({ ...prev, [message._id]:message }));
          
          socket.emit("u/chats/doOneBlueTick",{msgId:message._id,roomId:message.roomId});
        
        }
      
    });

    return () => {
      socket.off("u/chats/ai/receiveMsg");
    };
  });

 useEffect(() => {
    socket.on("u/chats/ai/messageSent", (data) => {
     
      const message  = data.message;
      setRoom(data.room);
       
        if (activeAIChat._id === message.roomId) {
          setAIMessages((prev: any) => {
            const { [data._id]:_,...rest }=prev
          return { ...rest,[message._id]:message}
          });
         
        }
      
    });

    return () => {
      socket.off("u/chats/ai/messageSent");
    };
  });

  useEffect(() => {
    socket.on("u/chats/ai/messageNOtSent", (data) => { 
 
         alert("msg not sent "+data)
    });

    return () => {
      socket.off("u/chats/ai/messageNotSent");
    };
  });


 /*  const getMemberTextCopy = (members: any, inputText: String) => {
    const texts: any = [];
    members.forEach((x: any) => {
      texts.push({ memberId: x, text: inputText });
    });

    return texts;
  }; */

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
