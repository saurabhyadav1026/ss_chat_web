import { useEffect, useState } from "react";
import SpeechRecognition,{useSpeechRecognition} from "react-speech-recognition";
import {askAi} from '../userProfile/users'


const Listener=()=>{
    const {transcript,resetTranscript}=useSpeechRecognition();
    const [isListening,setIsListening]=useState(false);
     const [isSpeaking,setIsSpeaking]=useState(false);
const [text,setText]=useState("");



   


useEffect(()=>{
const check=setInterval(()=>{
if(transcript &&transcript===text){getResponseAI()}
else { if(transcript&&isSpeaking){
    console.log("stop saying and start listening");

    window.speechSynthesis.cancel();
    setIsSpeaking(false);
}         // if there is interupt
setText(transcript);}
},1000)

return ()=>clearInterval(check);

})

const getResponseAI=async()=>{
    resetTranscript();
   let res:any= await askAi(text);

    if("speechSynthesis" in window){
const utterance=new SpeechSynthesisUtterance(res);
utterance.lang='en-us';
utterance.rate=1;
utterance.pitch=1;
utterance.volume=1;
//utterance.onstart=()=>console.log("ai is saying...")
//utterance.onend=()=>console.log("ai stop saying")
console.log("stop listening start listening")
setIsSpeaking(true);
window.speechSynthesis.speak(utterance);





    }


}





    return<>
  
{!isListening?<button id="mic_btn" style={{backgroundColor:"blue"}} onClick={()=>{SpeechRecognition.startListening({ continuous: true, language: "en-US" });}}>mic</button>:!isSpeaking?<button className="active_listening" id="mic_btn" onClick={()=>{SpeechRecognition.stopListening();setIsListening(false)}}>mic</button>:<button className="active_speaking" id="mic_btn" onClick={()=>{SpeechRecognition.stopListening();setIsListening(false)}}>mic</button>}
<div id="mic_x_btn" onClick={resetTranscript}>X</div>
 
    
    </>
}


export default Listener;