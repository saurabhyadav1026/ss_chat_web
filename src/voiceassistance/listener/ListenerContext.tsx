
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { createContext,useEffect } from "react";



/* 


props= {
text,
setText

}

*/

 const ListenerContext=createContext({});


export const ListenerProvider=({children}:any)=>{

const {transcript,resetTranscript,listening}:any=useSpeechRecognition();

  
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


    return <ListenerContext.Provider value={{startListening,stopListening,transcript,resetTranscript}}>{children}</ListenerContext.Provider>



}


export default ListenerContext;