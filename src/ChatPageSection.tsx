import { useContext, useEffect, useState } from "react";

import TopNav from "./components/TopNav.tsx";
import LeftNav from './components/left_nav/LeftNav.tsx';
import ChatPage from './components/ChatPage.tsx';
import InputBar from './components/InputBar.tsx';

import ChatContext from "./contexts/chatscontext/ChatContext.tsx";






export const ChatPageSection = (props:any) => {

const {activeUser,activeChat,setActiveChat,chatsList,searchInput}:any=useContext(ChatContext);





   const [width, setWidth] = useState(window.innerWidth);
  const [nav_flag,setNavFlag]=useState('C');




const [controProperty,setControlProperty]:any=useState({left:{display:null},main:{width:null}})
    
useEffect(()=>{
if(nav_flag==='A')setControlProperty({input:{left:'5%',width:'90%'},left:{display:'none'},main:{width:"100%",display:'flex'}})
  else if(nav_flag==='B'&&(activeChat.name!==null&&width<501))setControlProperty({input:null,left:{display:'none'},main:{width:'100%',display:'flex'}})
  
    else {setControlProperty({input:null,left:{display:null},main:{width:null}})
}
},[width,nav_flag,activeChat])
 

const leftNavControl=()=>{
   if(nav_flag==='B' &&activeChat.name!==null&&width>500)setNavFlag('A')
      else if(nav_flag==='A' &&width>500&&activeChat.name!==null)setNavFlag('B')
          else { setNavFlag('C')
          }
          
   }




  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // cleanup when component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);



useEffect(()=>{
  if(activeChat.name!==null)setNavFlag('B');
},[activeChat])





  return (

    <>
      <LeftNav  sty_lft={controProperty.left} activeChat={activeChat}  chatsList={chatsList} activeUser={  activeUser} setPage={props.setPage} setActiveChat={setActiveChat} ></LeftNav>
      <div id="main_page" style={controProperty.main}>
        <TopNav  leftNavControl={leftNavControl} activeChat={activeChat}></TopNav>
        <ChatPage   ></ChatPage>

        <InputBar  sty_input={controProperty.input}  ></InputBar>


      </div>

    </>

  );
}
export default ChatPageSection
  ;



