
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { createContext } from "react";



/* 


props= {
text,
setText

}

*/

 const ListenerContext=createContext({});


export const ListenerProvider=({children}:any)=>{

const {transcript,resetTranscript}:any=useSpeechRecognition();




const startListening=async()=>{
await navigator.mediaDevices.getUserMedia({
  audio: {
    echoCancellation: true,   
    noiseSuppression: true,
    autoGainControl: true
  }
});
SpeechRecognition.startListening({
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