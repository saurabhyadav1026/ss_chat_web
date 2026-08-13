
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { createContext,useContext,useEffect, useState } from "react";
import SpeakerContext from "../speaker/SpeakerContext";



/* 


props= {
text,
setText

}

*/

 const ListenerContext=createContext({});


export const ListenerProvider=({children}:any)=>{

const {transcript,resetTranscript,listening}:any=useSpeechRecognition();


    const {startSpeaking,stopSpeaking} :any=useContext(SpeakerContext)
    
    const [isListening,setIsListening]=useState(false);
     const [isSpeaking,setIsSpeaking]=useState(false);
const [text,setText]=useState("");




  
// for continuous listening
useEffect(()=>{

if(listening){

  const restartListening=async()=>{
SpeechRecognition.startListening({
  interimResults :true,
  continuous:true,
  language:'en-US',
 

});
  }

  SpeechRecognition.getRecognition()?.addEventListener('end',restartListening);

  return ()=>{
    SpeechRecognition.getRecognition()?.removeEventListener('end',restartListening);
  }

}

})







const startListening=async()=>{
await navigator.mediaDevices.getUserMedia({
  audio: {
    echoCancellation: true,   
    noiseSuppression: true,
    autoGainControl: true
  }
});
SpeechRecognition.startListening({
  interimResults :true,
  continuous:true,
 language: "en-US",

});
}

const stopListening=()=>{
  SpeechRecognition.stopListening();
}


    return <ListenerContext.Provider value={{startSpeaking,stopSpeaking,text,setText, isListening,setIsListening,isSpeaking,setIsSpeaking  ,startListening,stopListening,transcript,resetTranscript}}>{children}</ListenerContext.Provider>



}


export default ListenerContext;