//import { useEffect,useState } from 'react';
import {AddAttachmentIcon,LoadingIcon,SendIcon,Activemic, CrossIcon} from './icons.tsx';


//import getImageText from '../getImageText'
import {sendToAI, sendToF} from './userProfile/users';
import  ListenerContext from '../voiceassistance/listener/ListenerContext.tsx';
 
import { useContext ,useEffect,useState} from 'react';



const InputBar = (props:any) => {

const {transcript,startListening,stopListening,resetTranscript}:any=useContext(ListenerContext);
const [isListening,setIsListening]:any=useState(false);  

const [inputValue,setInputValue]:any=useState("");


    const send=async()=>{
     let inputText=inputValue;
  setInputValue("");
 resetTranscript();
 if(inputValue.trim()==='')return;          // return if blank input
 if(props.activeChat.includes('sbhai')){await sendToAI(props.activeUser,props.activeChat,inputText);}
else{ 
 
let old_chat=props.chat;
old_chat.push({by:1,text:inputText,status:2,time:"12:12:12"})
console.log(old_chat)
props.setchat(old_chat)

// update chats
props.updateChatChatList();

  sendToF(props.activeUser,props.activeChat,inputText)
 }
 
}




    // for seetting key shortcuts
    const keyFunctions=(e:any)=>{

        if((!e.shiftKey)&&(e.key==='Enter'))send();
        if(((e.shiftKey)&&(e.key==='n'))||((e.shiftKey)&&(e.key==='N'))){
           
            //props.createAINewChat();
        
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




if(props.activeChat===null) return <></>

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





