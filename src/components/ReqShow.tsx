
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
    useEffect(() => {

        console.log("req show")
        console.log(props.u)
    }, [])
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
alert("deleting msg ");
}



    return (

        <div className="req">

            <div className="req_cammand">

                {/* <!-- for your cammand displaying --> */}

                <Markdown remarkPlugins={[remarkGfm]}>{props.req_}</Markdown>
                <sub className='msg_time'>
                    {props.time ? props.time.slice(12, 17) : ""}

                    {props.status === 0 ? <UnsendIcon></UnsendIcon> : props.status === 1 ? <SingleTickIcon></SingleTickIcon> : props.status === 2 ? <DoubleTickIcon></DoubleTickIcon> : <BlueTickIcon></BlueTickIcon>}
                </sub>



     


            <div className="req_option">

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
