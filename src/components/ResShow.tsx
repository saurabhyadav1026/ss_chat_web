

import { useContext, useEffect, useState } from 'react';
import {Dislike,Copy,LikeRes,SpeakerIcon,StopspeakIcon,Trash_binIcon} from './icons'
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
  
 const [likecolor,setLikecolor]=useState("gray");
 const [dislikecolor,setDislikecolor]=useState("gray");
 useEffect(()=>{
  if(likecolor==="blue" ){
    setDislikecolor("gray");
  }
  

 },[likecolor])


 useEffect(()=>{
  if(dislikecolor==="blue" ){
    setLikecolor("gray");
  }
  

 },[dislikecolor])



const deleteMsg=(activeUser:any,active_chat:any,time:any)=>{
alert("deletinng msg"+activeUser+active_chat+time);
}




     return (
                <div className="receiv_msg msg_box_a container-fluid  px-3 hh-100 m-2  d-flex res_output   ">   
                      {/*     <!-- for ai  response displaying  --> */}
                 <div className=' msg_box_b pt-2 px-3  bg-primary  border msg_font_style' > 
                  <Markdown remarkPlugins={[remarkGfm]}>{props.res_}</Markdown>
                 <div className='message-time '>
                                    {props.time ? props.time : ""}
                
                                </div>
               
                 </div> 

                    
    
               
{/* div */}
                <div  className="receiv_msg_option msg_box_c ">
<span className='msg_options '>
                 { !isSpeaking?<SpeakerIcon    func={async()=>{setIsSpeaking(true); await startSpeaking(props.res_)}} ></SpeakerIcon>:
                               <StopspeakIcon  func={()=>{ setIsSpeaking(false); stopSpeaking()}  }></StopspeakIcon>     }
                 </span>
                    <span className='msg_options'><Copy func={()=>copyRes(props.res_)} r_no={props.r_no} ></Copy></span>

                  
                    <span className='msg_options'><LikeRes color_={likecolor} func={()=>{if(likecolor==='blue')setLikecolor("gray");else setLikecolor("blue")}} r_no={props.r_no}></LikeRes></span>

                  
                    <span className='msg_options'><Dislike color_={dislikecolor} func={()=>{if(dislikecolor==='blue')setLikecolor("gray");else setDislikecolor("blue")}}  r_no={props.r_no} ></Dislike></span>

<span className='msg_options'><Trash_binIcon func={()=>deleteMsg(props.activeUser,props.active_chat,props.time)}></Trash_binIcon></span>
                </div>
</div>
           
    


);

}

export default ResShow;







const copyRes=(r:any)=>{
 navigator.clipboard.writeText(r).then(
  ()=>alert(" text coppied.")
 )  

  
}

