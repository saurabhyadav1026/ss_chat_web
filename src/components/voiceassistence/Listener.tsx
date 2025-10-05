import { useEffect, useState } from "react";
import ListenerContext from "../../voiceassistance/listener/ListenerContext";
import {askAi} from '../userProfile/users'
import { useContext } from "react";
import SpeakerContext from "../../voiceassistance/speaker/SpeakerContext";


const Listener=()=>{
    const {transcript,resetTranscript,startListening,stopListening}:any=useContext(ListenerContext);

    const {startSpeaking,stopSpeaking} :any=useContext(SpeakerContext)
    
    const [isListening,setIsListening]=useState(false);
     const [isSpeaking,setIsSpeaking]=useState(false);
const [text,setText]=useState("");



   


useEffect(()=>{
    if(!isListening)return;
const check=setInterval(()=>{
if(transcript &&transcript===text){getResponseAI()}
else { if(transcript&&isSpeaking){
    console.log("stop saying and start listening");

   stopSpeaking();



   
    setIsSpeaking(false);
}         // if there is interupt

setText(transcript);}
},500)

return ()=>clearInterval(check);

})

const getResponseAI=async()=>{
    resetTranscript();
   let res:any= await askAi(text);
   
setIsSpeaking(true);
startListening();
startSpeaking(res);

    



    }









    return<>
  
{   // 1. for start listening , 2.  showing listening onclick stop listening and saying,  3. for showing speaking and onclick stop listening and saying
!isListening?<button id="mic_btn" style={{backgroundColor:"blue"}} onClick={async()=>{   await navigator.mediaDevices.getUserMedia({ audio: true });setIsListening(true);startListening()}}>start asking</button>
:!isSpeaking?<button className="active_listening" id="mic_btn" onClick={()=>{stopListening();setIsListening(false)}}>we listenig,stop listening</button>
:<button className="active_speaking" id="mic_btn" onClick={()=>{stopListening();setIsListening(false)}}>stop listening</button>
}
<div id="mic_x_btn" onClick={resetTranscript}>X</div>
 
    
    </>
}


export default Listener;