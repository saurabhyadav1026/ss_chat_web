
import { LikeRes,Dislike,Edit, Copy, DoubleTickIcon, UnsendIcon, SingleTickIcon, BlueTickIcon ,Trash_binIcon} from './icons'

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect,useState } from 'react';


/* 
props 
        req_
        props.chat_no
          propsr_no

*/

const ReqShow = (props: any) => {
   
    const editReq = (r: any) => {
        const text: any = document.getElementsByClassName("req_cammand"!)[r].innerHTML;
        (document.getElementById("cammand_input"!) as HTMLInputElement).value = text;

        const temp_chat: any = [...props.chats]

        temp_chat[props.active_chat].reqs = temp_chat[props.active_chat].reqs.slice(0, r);
        temp_chat[props.active_chat].ress = temp_chat[props.active_chat].ress.slice(0, r);

        props.setChats(temp_chat);

    }

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

        <div className="req  container-fluid d-flex  px-3 hh-100 mt-1 " style={{justifyContent:"flex-end"}} >

            <div className="req_cammand  px-3 pt-2  d-flex align-items-center  bg-success border" style={{borderRadius:"50px",fontFamily:"'Poppins', sans-serif",fontWeight:"600",fontSize:"100%",lineHeight:"0.8"}}   >

                {/* <!-- for your cammand displaying --> */}

                <Markdown remarkPlugins={[remarkGfm]}>{props.req_}</Markdown>
                <div className='  p-1  pt-1 msg_time ' style={{display:"inline-block",fontFamily:"'Poppins', sans-serif",fontWeight:"400",fontSize:"70%",lineHeight:"1"}}>
                    {props.time.slice(0,6) ? props.time : ""}
 {console.log(props.tick)}
 {console.log(props.tickStatus)}
 <div className='pt-0' style={{display:"inline-block"}}>
                    {props.tick === 0 ? <UnsendIcon></UnsendIcon>: props.tickStatus.read !==null ?  <BlueTickIcon></BlueTickIcon> : props.tickStatus.delivered !== null ? <DoubleTickIcon></DoubleTickIcon> :<SingleTickIcon></SingleTickIcon>}
      </div>
                </div>



     </div>
     <div>


            <div className="req_option  border">

                {/*     <!--  edit btn--> */}
                <span className='msg_options'> <Edit func={editReq} r_no={props.r_no} ></Edit></span>

                {/*  <!--  copy btn --> */}
                <span className='msg_options'><Copy func={() => copyReq(props.req_)} r_no={props.r_no}></Copy></span>
                <span className='msg_options'><LikeRes color_={likecolor} func={() => { if (likecolor === 'blue') setLikecolor("gray"); else setLikecolor("blue") }} r_no={props.r_no}></LikeRes></span>


                <span className='msg_options'><Dislike color_={dislikecolor} func={() => { if (dislikecolor === 'blue') setLikecolor("gray"); else setDislikecolor("blue") }} r_no={props.r_no} ></Dislike></span>

<span className='msg_options'><Trash_binIcon func={()=>deleteMsg(props.activeUser,props.active_chat,props.time)}></Trash_binIcon></span>
            </div>

</div>

        </div>


    );




}

export default ReqShow;




const copyReq = (r: any) => {
    navigator.clipboard.writeText(r).then(
        () => alert(" text coppied.")
    )


}
