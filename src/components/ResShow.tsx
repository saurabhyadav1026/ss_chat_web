

import { useState } from 'react';
import {Dislike,Copy,LikeRes,SpeakerIcon} from './icons'
/* 
props 
        req_
        props.chat_no
          propsr_no

*/

const ResShow=(props)=>{ 

const [isSpeak,setSpeak]=useState(false);

  
    
const speakRes=(r)=>{


  if(isSpeak){
setSpeak(false);
window.speechSynthesis.cancel();
return;

  }


  setSpeak(true); 
   const text = document.getElementsByClassName("res_output")[r].innerHTML;
     const utterance = new SpeechSynthesisUtterance(text);


      speechSynthesis.speak(utterance);
      utterance.lang = 'en-US';
       window.speechSynthesis.speak(utterance);
} 










     return (
   <div className="res">
                <div className="res_output">                 
                {/*     <!-- for ai  response displaying  --> */}
                    {props.res_}
    <span className='msg_time'><sub> {props.time?props.time.slice(0,5):""}</sub></span>
                </div>

                <div  className="res_option">

                  <span><SpeakerIcon func={speakRes} r_no={props.r_no}></SpeakerIcon></span>

                
                    <span><Copy func={copyRes} r_no={props.r_no} ></Copy></span>

                  
                    <span><LikeRes func={likeRes} r_no={props.r_no}></LikeRes></span>

                  
                    <span><Dislike func={dislikeRes}  r_no={props.r_no} ></Dislike></span>


                </div>

            </div>
    


);

}

export default ResShow;







const copyRes=(r)=>{

  const text = document.getElementsByClassName("res_output")
 navigator.clipboard.writeText(text[0].innerHTML).then(
  ()=>alert(" text coppied.")
 ) 

  
}

const likeRes=(r)=>{
  alert("Its my pleasure sir,I am always here for your help.  ")
}


const dislikeRes=(r)=>{
  alert("I appolize, I will improve myself.Thanks for feedback.")
}

