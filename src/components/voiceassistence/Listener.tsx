import { useEffect, useState } from "react";
import SpeechRecognition,{useSpeechRecognition} from "react-speech-recognition";
import {askAi} from '../userProfile/users'


const Listener=()=>{
    const {transcript,resetTranscript}=useSpeechRecognition();
    const [btncolor,setBtnColor]=useState('blue');
    const startListening=()=>SpeechRecognition.startListening({continuous:true})
    const stopListening=()=>SpeechRecognition.stopListening();
    
 
const [text,setText]=useState("");



    const speak=()=>{
if(btncolor=='blue'){
   
    startListening();
    setBtnColor("green")
}
else{
    stopListening();
    setBtnColor("blue");
}
    }


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


const mic_btn_sty={

    backgroundColor:btncolor,
    height:'90%',
    width:"100px",
    borderRadius:"50px"


}


    return<>
  
<button style={mic_btn_sty} id="mic_btn" onClick={speak}>mic</button>
<div id="mic_x_btn" onClick={()=>SpeechRecognition.startListening({ continuous: true, language: "en-US" })}>X</div>

 
    
    </>
}


export default Listener;