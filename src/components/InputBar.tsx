//import { useEffect,useState } from 'react';
//import {AddAttachmentIcon,LoadingIcon,SendIcon,Activemic, CrossIcon} from './icons.tsx';
//import getImageText from '../getImageText'
//import  ListenerContext from '../voiceassistance/listener/ListenerContext.tsx';
//import ChatContext from '../contexts/chatscontext/AppVariablesContext.tsx';
//import MessageContext from '../contexts/MessagesContext.tsx';
//import { sendMessage } from '../securety/msgencryption.ts';
import UserContext from '../contexts/UserContext.tsx';
import { useContext, useEffect, useRef, useState } from 'react';
import { LoadingIcon, SendIcon } from './icons.tsx';
import ListenerContext from '../voiceassistance/listener/ListenerContext.tsx';
import { socket } from '../contexts/socketcontext/SocketContext.tsx';

export const keyHepler = new Map();

const InputBar = (props: any) => {
  //const {setchat,activeChat}:any=useContext(MessageContext);
  //const {transcript,startListening,stopListening,resetTranscript}:any=useContext(ListenerContext);
  
  
  const {transcript,resetTranscript}:any=useContext(ListenerContext);
  const { activeUser }: any = useContext(UserContext);
  const  {activeChat,setMessages}:any=props;
  

  const [isListening]: any = useState(false);

  const [inputValue, setInputValue]: any = useState("");

  const send = async () => {
    let inputText = inputValue;
    setInputValue("");
    resetTranscript();
    if (inputValue.trim() === '') return;          // return if blank input
  //  if (activeChat.username && activeChat.username.includes('sbhai')) { await sendToAI(activeUser.username, activeChat.username, inputText); }
    else {

      const newMsgId = createTempMsgId();
      let msg: any = {
        _id: newMsgId,
        roomId: activeChat._id,
        senderId: activeUser._id,
        text: inputText,
        tick: 0,
        tickStatus: { send: new Date() },

      }


// for temp fast show
      setMessages((prev: any) => ({ ...prev, [newMsgId]: msg }));
      console.log("chat")
        console.log(activeChat)
      

      let new_msg: any = {
        _id: newMsgId,
        roomId: activeChat._id,
        senderId: activeUser._id,
        texts: getMemberTextCopy([activeUser._id,activeChat.receiver._id], inputText),

      }


       socket.emit("sendMessage", new_msg)

    }

  }


// to reciev messages   

  useEffect(() => {


    /* 
    data={
    room:
    msg:
    oldMsg id if its sender
   
    }
    */

    socket.on("receivMsg", (data) => {

      const { oldMsgId, msg } = data;
      console.log(data)
console.log(data)
      
      




      // for sender
      if (activeUser._id === msg.senderId && activeChat._id === msg.roomId) {

        keyHepler.set(msg._id, data.oldMsgId)  // to save temp key
        setMessages((prev: any) => ({ ...prev, [data.oldMsgId]: msg }));


      }

      // for receiver 
      else {

        socket.emit("doDoubleTick", msg._id);
        if (activeChat._id === msg.roomId) {
          setMessages((prev: any) => ({ ...prev, [msg._id]: msg }))

          socket.emit("doBlueTick", msg._id);

        }
      }

    })


    return () => { socket.off("receivMsg") }
  })



  const getMemberTextCopy = (members: any, inputText: String) => {

    let texts: any = []
    members.forEach((x: any) => { texts.push({ memberId: x, text: inputText }) });

    return texts;

  }


  // to generate the temp msg id
  const createTempMsgId = () => {
    return String(Date.now() + (Math.floor(Math.random() * 999) + 1))

  }

  // for seetting key shortcuts
  const keyFunctions = async (e: any) => {

    if ((!e.shiftKey) && (e.key === 'Enter')) {
      await send()
      const el: any = textareaRef.current;
      el.style.height = "auto";                 // reset height
      el.style.height = el.scrollHeight + "px";
    };
    if (((e.shiftKey) && (e.key === 'n')) || ((e.shiftKey) && (e.key === 'N'))) {

      //createAINewChat();

    }
  }

  const textareaRef = useRef(null);
  const onInputChange = async (e: any) => {
    setInputValue(e.target.value);
    const el: any = textareaRef.current;
    el.style.height = "auto";                 // reset height
    el.style.height = el.scrollHeight + "px";
  }



  useEffect(() => {

    //   const listeingInterval=setInterval(()=>{
    if (isListening) {
      let t: string = inputValue + " " + transcript;
      console.log(transcript);
      setInputValue(t);
      resetTranscript();
    }
    //       },1000);
    //   return ()=>clearInterval(listeingInterval);
  }, [transcript, isListening]);




  if (activeChat === null) return <></>

  return (
    <>

      <div id="text_input_bar" className='p-2 px-3 ' style={props.sty_input}>

        {/* 
               {!isListening?<Activemic func={()=>{setIsListening(true);startListening()}}></Activemic>:<CrossIcon func={()=>{setIsListening(false);stopListening();}}></CrossIcon>}
                <input id="add_attachment" className='form-control' style={{display:"none"}} type="file" accept="image/*"  />
 */}


        {/* <!-- add attachment btn --> */}

        {/* 
              <div id="add_file_btn"><AddAttachmentIcon func={()=>{}}></AddAttachmentIcon></div>
         */}
        {/*  intput area  */}


        <textarea id="cammand_input" ref={textareaRef} name="ignore-history" rows={1} onChange={onInputChange} value={inputValue} onKeyUp={(key) => { keyFunctions(key) }} placeholder="Enter here.." />


        {/* <!-- send btn --> */}
        <div id="send_input_btn">{props.isFetching ? <LoadingIcon></LoadingIcon> : <SendIcon func={send}></SendIcon>}</div>


      </div>

    </>

  );





}

export default InputBar;





