import { createContext } from "react";





 const SpeakerContext=createContext({});





export const SpeakerProvider=({children}:any)=>{

const startSpeaking=(text:string)=>{

if("speechSynthesis" in window){
const utterance:any=new SpeechSynthesisUtterance(text);
utterance.lang='en-us';
utterance.rate=1;
utterance.pitch=1;
utterance.volume=1;
//utterance.onstart=()=>console.log("ai is saying...")
//utterance.onend=()=>console.log("ai stop saying")
window.speechSynthesis.speak(utterance);
}

    
}


const stopSpeaking=()=>{
     window.speechSynthesis.cancel();
}



return <SpeakerContext.Provider value={{startSpeaking,stopSpeaking}} >
{children}
</SpeakerContext.Provider>


}


export default SpeakerContext;