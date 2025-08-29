//import { useEffect,useState } from 'react';
import {RegenerateBtn,LoadingIcon,SendIcon} from './icons.tsx';


//import getImageText from '../getImageText'
import {sendToAI, sendToF} from './userProfile/users'
 




const InputBar = (props:any) => {




  
    const send=async()=>{
 const io=document.getElementById('cammand_input')!;
 const reqk=[];                                     // filtered request key list
 const req:string=(io as HTMLInputElement).value  ;                               // original input req  string
 
( io as HTMLInputElement).value="";                   // to clear the input bar

 req.split(" ").forEach((r)=> {        
    if( r!=="")reqk.push(r)                           // to remove trail of white space
 });                                                //   and store the split word in list req

 if(reqk.length===0)return;          // return if blank input
 if(props.activeChat.includes('sbhai'))await sendToAI(props.activeUser,props.activeChat,req);
else await sendToF(props.activeUser,props.activeChat,req)
   props.updateChatChatList();
}




    // for seetting key shortcuts
    const keyFunctions=(e:any)=>{

        if((!e.shiftKey)&&(e.key==='Enter'))send();
        if(((e.shiftKey)&&(e.key==='n'))||((e.shiftKey)&&(e.key==='N'))){
            (document.getElementById("cammand_input")as HTMLInputElement).value="";
            //props.createAINewChat();
        
        }
    }



 //   const getAttachmentInput=(e)=>{
//props.addAttachmentFile(URL.createObjectURL(e.target.files[0]));
  //  }

 // to add req and res in the chats list   
  
  /*
  const [attachment_file, addAttachmentFile] = useState(null);

  const getAIRes = async (req) => {
    let res = "";
    let attachment_data="";

    if (attachment_file !== null) {
      const file = attachment_file;

      addAttachmentFile(null);
      attachment_data = await getImageText(file); 
      addAttachmentFile(null);

      if (attachment_data !== "") {
        res = " Your image text is: " + attachment_data+ " and we get that: ";
       
      }
    } 
    sendtoAI(props.activeUser,props.activeChat,req);
  }

*/


if(props.activeChat===null) return <></>

    return (
        <>

            <div id="text_input_bar" style={props.sty_input}>
                
                <input id="add_attachment" style={{display:"none"}} type="file" accept="image/*"  />
{/* <!-- add attachment btn --> */}
              <div id="add_file_btn"><RegenerateBtn func={props.updateChatChatList}></RegenerateBtn></div>
             
                {/*  intput area  */}
                <input id="cammand_input" onKeyUp={(key)=>{keyFunctions(key)}} placeholder="Enter here.."/> 


                {/* <!-- send btn --> */}
                <div id="send_input_btn">{props.isFetching?<LoadingIcon></LoadingIcon>:<SendIcon func={send}></SendIcon>}</div>


            </div>

        </>

    );





}

export default InputBar;





