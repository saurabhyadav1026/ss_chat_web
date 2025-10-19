//import { useEffect,useState } from 'react';
import {AddAttachmentIcon,LoadingIcon,SendIcon,Activemic, CrossIcon} from './icons.tsx';


//import getImageText from '../getImageText'
import {sendToAI} from './userProfile/users';
import  ListenerContext from '../voiceassistance/listener/ListenerContext.tsx';
 import {socket} from '../context/socketcontext/SocketContext'
import { useContext ,useEffect,useState} from 'react';
import ChatContext from '../contexts/chatscontext/ChatContext.tsx';
//import { sendMessage } from '../securety/msgencryption.ts';

const InputBar = (props:any) => {

const {transcript,startListening,stopListening,resetTranscript}:any=useContext(ListenerContext);

const {setchat,activeChat,activeUser,chat}:any =useContext(ChatContext)

const [isListening,setIsListening]:any=useState(false);  

const [inputValue,setInputValue]:any=useState("");

    const send=async()=>{
     let inputText=inputValue;
  setInputValue("");
 resetTranscript();
 if(inputValue.trim()==='')return;          // return if blank input
 if(activeChat.username.includes('sbhai')){await sendToAI(activeUser.username,activeChat.username,inputText);}
else{ 
 

let new_msg={by:1,text:inputText,status:0,time:getTime()}
setchat([...chat,new_msg])
 const data={
  sender:activeUser.username,
 reciever:activeChat.username,
 senderCopy:inputText,
 recieverCopy:inputText }

 socket.emit('sendtofriend',data) 
 }  
 
}


 

const getTime=()=>{
  const now=new Date();
  let datetime = now.toLocaleString('en-IN', {
  timeZone: 'Asia/Kolkata',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
});

  return datetime;
}


    // for seetting key shortcuts
    const keyFunctions=(e:any)=>{

        if((!e.shiftKey)&&(e.key==='Enter'))send();
        if(((e.shiftKey)&&(e.key==='n'))||((e.shiftKey)&&(e.key==='N'))){
           
            //createAINewChat();
        
        }
    }


const onInputChange=async(e:any)=>{
  setInputValue(e.target.value);
  }



    useEffect(()=>{

   //   const listeingInterval=setInterval(()=>{
        if(isListening){
          let t:string=inputValue+" "+transcript;
          console.log(transcript);
setInputValue(t);
resetTranscript();}
 //       },1000);
//   return ()=>clearInterval(listeingInterval);
    },[transcript, isListening] );




if(activeChat===null) return <></>

    return (
        <>

            <div id="text_input_bar" style={props.sty_input}>
               {!isListening?<Activemic func={()=>{setIsListening(true);startListening()}}></Activemic>:<CrossIcon func={()=>{setIsListening(false);stopListening();}}></CrossIcon>}
                <input id="add_attachment"  style={{display:"none"}} type="file" accept="image/*"  />
{/* <!-- add attachment btn --> */}
              <div id="add_file_btn"><AddAttachmentIcon func={()=>{}}></AddAttachmentIcon></div>
             
                {/*  intput area  */}
                <input id="cammand_input"  type='text' onChange={onInputChange}  value={inputValue} onKeyUp={(key)=>{keyFunctions(key)}} placeholder="Enter here.."/> 


                {/* <!-- send btn --> */}
                <div id="send_input_btn">{props.isFetching?<LoadingIcon></LoadingIcon>:<SendIcon func={send}></SendIcon>}</div>


            </div>

        </>

    );





}

export default InputBar;





