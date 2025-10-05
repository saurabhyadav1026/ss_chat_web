

import { useContext, useState } from 'react';
import {Dislike,Copy,LikeRes,SpeakerIcon,StopspeakIcon} from './icons'
import SpeakerContext from '../voiceassistance/speaker/SpeakerContext.tsx'

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


/* 
props 
        req_
        props.chat_no
          propsr_no

*/

const ResShow=(props:any)=>{ 

const [isSpeaking,setIsSpeaking]=useState(false);
const {startSpeaking,stopSpeaking}:any=useContext(SpeakerContext);
  
 











     return (
   <div className="res">
                <div className="res_output">   
                      {/*     <!-- for ai  response displaying  --> */}
                  <Markdown remarkPlugins={[remarkGfm]}>{props.res_}</Markdown> 
                    
    <span className='msg_time'><sub> {props.time?props.time.slice(0,5):""}</sub></span>
                </div>

                <div  className="res_option">

                 { !isSpeaking?<SpeakerIcon    func={async()=>{setIsSpeaking(true); await startSpeaking(props.res_)}} ></SpeakerIcon>:
                               <StopspeakIcon  func={()=>{ setIsSpeaking(false); stopSpeaking()}  }></StopspeakIcon>     }
                    <span><Copy func={copyRes} r_no={props.r_no} ></Copy></span>

                  
                    <span><LikeRes func={likeRes} r_no={props.r_no}></LikeRes></span>

                  
                    <span><Dislike func={dislikeRes}  r_no={props.r_no} ></Dislike></span>


                </div>

            </div>
    


);

}

export default ResShow;







const copyRes=(r:any)=>{
alert("not coppied"+r)
  /* 
  const text = document.getElementsByClassName("res_output")
 navigator.clipboard.writeText(text[0].innerHTML).then(
  ()=>alert(" text coppied.")
 )  */

  
}

const likeRes=(r:any)=>{
  alert("Its my pleasure sir,I am always here for your help.  "+r)
}


const dislikeRes=(r:any)=>{
  alert("I appolize, I will improve myself.Thanks for feedback."+r)
}

