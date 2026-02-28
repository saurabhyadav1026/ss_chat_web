import { useContext,useEffect,useState } from "react";

import TopNav from "./components/TopNav.tsx";
import LeftNav from './components/left_nav/LeftNav.tsx';
import ChatPage from './components/ChatPage.tsx';


import ChatContext from "./contexts/chatscontext/ChatContext.tsx";


const device_={

  sm_hide:"d-none",        // page1 will display none on sm
  sm_visible:" d-flex"

}



export const ChatPageSection = (props:any) => {

const {activeUser,activeChat,setActiveChat,chatsList}:any=useContext(ChatContext);


const [device_show,setdevice_show]=useState({d1:device_.sm_visible,d2:device_.sm_hide });


const change_device_show=(flag:number)=>{

if(!flag ||!activeChat){setdevice_show({d1:device_.sm_visible,d2:device_.sm_hide });

}
else {setdevice_show({d1:device_.sm_hide,d2:device_.sm_visible });

}

}

useEffect(()=>{

  change_device_show(1);
},[activeChat])







  return (

    <><div className={`${device_show.d1} m-0 p-2 col-12  col-md-6 col-lg-4 col-xl-4 d-md-flex  `}>

   
      <LeftNav activeChat={activeChat}  chatsList={chatsList} activeUser={  activeUser} setPage={props.setPage} setActiveChat={setActiveChat} ></LeftNav>
      
    </div>   

      <div id="main_page" className={`${device_show.d2} col-12  col-md-6  col-lg-8 d-md-flex  col-xl-8` } style={{flexDirection:"column"}}>
     
        <TopNav   change_device_show={change_device_show}  activeChat={activeChat}></TopNav>
        <ChatPage  ></ChatPage>

      


      </div>

    </>

  );
}
export default ChatPageSection
  ;



