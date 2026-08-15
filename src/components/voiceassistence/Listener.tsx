import { useEffect} from "react";
import ListenerContext from "../../voiceassistance/listener/ListenerContext";

import { useContext } from "react";
import { MicOff } from "lucide-react";
import { MicIcon } from "../icons";


const Listener=({id,active,setActive,action}:any)=>{
    const {stopSpeaking,text,setText, isListening,setIsListening,isSpeaking,setIsSpeaking  ,transcript,resetTranscript,startListening,stopListening}:any=useContext(ListenerContext);
  



    useEffect(()=>{
    if(!isListening)return;
const check=setInterval(()=>{
if(transcript &&transcript===text){getResponseAI()}
else { if(transcript&&isSpeaking){
    
   stopSpeaking();
    setIsSpeaking(false);
}         // if there is interupt

setText(transcript);}
},500)

return ()=>clearInterval(check);

})



const getResponseAI=async()=>{

  resetTranscript();
  switch (text.trim().toLowerCase()) {

 case "stop speaking":
    stopSpeaking();
    setIsSpeaking(false);
       break;

  case "stop listening":
    stopListening();
    setIsListening(false);
       break;

case "switch page" :  
    if(id==="page" && !active)setActive(true);
    else if(id==="app" && active) setActive(false);
     setText(""); 
     break;

case "switch app": 
    if(id==="app" && !active)setActive(true);
    else if(id==="page" && active) setActive(false); 
    setText("");
    break;
default:
  if(active)action(text);

  }   
  
  setText("");
}










    return<>
    {active && text ? <div className="listener-text-bubble">{text}</div> : <></>}
{   // 1. for start listening , 2.  showing listening onclick stop listening and saying,  3. for showing speaking and onclick stop listening and saying
!isListening?<span   className="btn btn-info text-bg-color" id="mic_btn"  onClick={async()=>{   await navigator.mediaDevices.getUserMedia({ audio: true });setIsListening(true);startListening()}}><MicOff /></span>
:<button className="btn btn-primary text-bg-color" id="mic_btn" onClick={()=>{stopListening();setIsListening(false)}}><MicIcon/></button>
}

 
    
    </>
}


export default Listener;



