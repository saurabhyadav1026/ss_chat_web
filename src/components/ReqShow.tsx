
import { LikeRes, Dislike, Edit, Copy, DoubleTickIcon, UnsendIcon, SingleTickIcon, BlueTickIcon, Trash_binIcon, SpeakerIcon, StopspeakIcon } from './icons'

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import SpeakerContext from '../voiceassistance/speaker/SpeakerContext';
import { useEffect, useState, useContext } from 'react';



/* 
props 
        req_
        props.chat_no
          propsr_no

*/

const ReqShow = (props: any) => {


    const [isSpeaking, setIsSpeaking] = useState(false);
    const { startSpeaking, stopSpeaking }: any = useContext(SpeakerContext);


    const editReq = (r: any) => {
        const text: any = document.getElementsByClassName("req_cammand"!)[r].innerHTML;
        (document.getElementById("cammand_input"!) as HTMLInputElement).value = text;

        const temp_chat: any = [...props.chats]

        temp_chat[props.active_chat].reqs = temp_chat[props.active_chat].reqs.slice(0, r);
        temp_chat[props.active_chat].ress = temp_chat[props.active_chat].ress.slice(0, r);

        props.setChats(temp_chat);

    }

    const [likecolor, setLikecolor] = useState("gray");
    const [dislikecolor, setDislikecolor] = useState("gray");
    useEffect(() => {
        if (likecolor === "blue") {
            setDislikecolor("gray");
        }


    }, [likecolor])


    useEffect(() => {
        if (dislikecolor === "blue") {
            setLikecolor("gray");
        }


    }, [dislikecolor])



    const deleteMsg = (activeUser: any, active_chat: any, time: any) => {
        alert("deletinng msg" + activeUser + active_chat + time);
    }



    return (

        <div className="send_msg   msg_box_a    px-3 hh-100 mt-1 "  style={{alignItems:"flex-end"}}>

            <div className="  p-2 py-1 msg_box_b d-flex  bg-success border"    >

                {/* <!-- for your cammand displaying --> */}
                <span className=' p-2  msg_font_style'>
                    <Markdown remarkPlugins={[remarkGfm]}>{props.req_}</Markdown>
                </span>
                <span className='p-2 message-time '>
                    {props.time.slice(0, 6) ? props.time : ""}

                </span>
                <span className='py-1' style={{ display: "inline-block" }}> {props.tick === 0 ? <UnsendIcon></UnsendIcon> : props.tickStatus.read !== null ? <BlueTickIcon></BlueTickIcon> : props.tickStatus.delivered !== null ? <DoubleTickIcon></DoubleTickIcon> : <SingleTickIcon></SingleTickIcon>}
                </span>


            </div>


            <div>


                <div className="send_msg_option msg_box_c">

                    <span className='msg_options '>
                        {!isSpeaking ? <SpeakerIcon func={async () => { setIsSpeaking(true); await startSpeaking(props.req_) }} ></SpeakerIcon> :
                            <StopspeakIcon func={() => { setIsSpeaking(false); stopSpeaking() }}></StopspeakIcon>}
                    </span>

                    {/*     <!--  edit btn--> */}
                    <span className='msg_options'> <Edit func={editReq} r_no={props.r_no} ></Edit></span>

                    {/*  <!--  copy btn --> */}
                    <span className='msg_options'><Copy func={() => copyReq(props.req_)} r_no={props.r_no}></Copy></span>
                    <span className='msg_options'><LikeRes color_={likecolor} func={() => { if (likecolor === 'blue') setLikecolor("gray"); else setLikecolor("blue") }} r_no={props.r_no}></LikeRes></span>


                    <span className='msg_options'><Dislike color_={dislikecolor} func={() => { if (dislikecolor === 'blue') setLikecolor("gray"); else setDislikecolor("blue") }} r_no={props.r_no} ></Dislike></span>

                    <span className='msg_options'><Trash_binIcon func={() => deleteMsg(props.activeUser, props.active_chat, props.time)}></Trash_binIcon></span>
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
