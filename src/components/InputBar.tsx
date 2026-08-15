import { useContext, useEffect, useRef, useState } from "react";

import ListenerContext from "../voiceassistance/listener/ListenerContext.tsx";
import { LoadingIcon, SendIcon } from "./icons.tsx";

export const keyHepler = new Map();

const InputBar = (props: any) => {
  const { transcript, resetTranscript }: any = useContext(ListenerContext);
  

  const [isListening]: any = useState(false);
  const [inputValue, setInputValue]: any = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);


const sendMsg=()=>{
  const inputText = inputValue;
      setInputValue("");
      resetTranscript();
      props.send(inputText);


}

  const keyFunctions = async (e: any) => {
    if (!e.shiftKey && e.key === "Enter") {
      await sendMsg();
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
        {props.isFetching ? <LoadingIcon /> : <SendIcon func={sendMsg} />}
      </div>
    </div>
  );
};

export default InputBar;
