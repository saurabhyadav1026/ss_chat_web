import { useEffect, useState } from "react";
import SpeechRecognition,{useSpeechRecognition} from "react-speech-recognition";
import {askAi} from '../userProfile/users'


const Listener=()=>{
    const {transcript,resetTranscript}=useSpeechRecognition();
    const [isSpeaking,setIsSpeaking]=useState(false);
const [text,setText]=useState("");



   


useEffect(()=>{
const check=setInterval(()=>{
if(transcript &&transcript===text){getResponseAI()}
else { window.speechSynthesis.cancel();         // if there is interupt
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
window.speechSynthesis.speak(utterance);





    }


}





    return<>
  
{!isSpeaking?<button style={{backgroundColor:"blue"}} id="mic_btn" onClick={()=>{SpeechRecognition.startListening({ continuous: true, language: "en-US" });setIsSpeaking(true)}}>mic</button>:<button style={{backgroundColor:"green"}} id="mic_btn" onClick={()=>{SpeechRecognition.startListening();setIsSpeaking(false)}}>mic</button>}
<div id="mic_x_btn" onClick={resetTranscript}>X</div>
 
    
    </>
}


export default Listener;