
import {Edit,Copy,DoubleTickIcon,UnsendIcon,SingleTickIcon, BlueTickIcon} from './icons'

/* 
props 
        req_
        props.chat_no
          propsr_no

*/

const ReqShow=(props)=>{

   
const editReq=(r)=>{
    const text=document.getElementsByClassName("req_cammand")[r].innerHTML;
    document.getElementById("cammand_input").value=text;
    
    const temp_chat=[...props.chats]

    temp_chat[props.active_chat].reqs=temp_chat[props.active_chat].reqs.slice(0,r);
    temp_chat[props.active_chat].ress=temp_chat[props.active_chat].ress.slice(0,r);

    props.setChats(temp_chat);
   
}

    return ( 
    
    <div className="req">
    
                        <div className="req_cammand">
                            
                            {/* <!-- for your cammand displaying --> */}
                            {props.req_}
   
        <sub className='msg_time'>
            {props.time?props.time.slice(0,5):""}
            
      {  props.status===0?<UnsendIcon></UnsendIcon>:props.status===1?<SingleTickIcon></SingleTickIcon>:props.status===2?<DoubleTickIcon></DoubleTickIcon>:<BlueTickIcon></BlueTickIcon>    }
            </sub>
    
    
    
                        </div>


                        <div className="req_option">
    
                        {/*     <!--  edit btn--> */}
                            <span> <Edit func={editReq}  r_no={props.r_no} ></Edit></span>
    
                               {/*  <!--  copy btn --> */}
                            <span><Copy func={copyReq}  r_no={props.r_no}></Copy></span>
                        </div>
    
                    </div>
    
    
    );
    
    
    
    
    }

    export default ReqShow;
    


    
const copyReq=(r)=>{

    const text = document.getElementsByClassName("req_cammand")
   navigator.clipboard.writeText(text[0].innerHTML).then(
    ()=>alert(" text coppied.")
   ) 
  
    
  }
  