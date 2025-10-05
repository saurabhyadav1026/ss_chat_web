import { useCallback, useContext, useEffect, useState } from "react";

import TopNav from "./components/TopNav.tsx";
import LeftNav from './components/left_nav/LeftNav.tsx';
import ChatPage from './components/ChatPage.tsx';
import InputBar from './components/InputBar.tsx';
import { getChat,getIsReloade ,reloaded,getSearchList} from "./components/userProfile/users.ts";



import ChatContext from "./usercontext/chatscontext/ChatContext.tsx";

export const ChatPageSection = (props:any) => {


const {activeUser}:any=useContext(ChatContext);



  const [activeChat, setActiveChat]:any = useState({username:null,name:null,dp:""});

  const [chatsList, setChatList] = useState([]);

  const [chat, setchat] = useState([]);

  const [isReloade,setIsReloade]=useState(false);
   const [width, setWidth] = useState(window.innerWidth);
  const [nav_flag,setNavFlag]=useState('C');
const [searchInput,setSearchInput]=useState("");

const updateSearchInput=(e:any)=>{
  setSearchInput(e.target.value)
}


  useEffect(()=>{
const reloadeInterval=setInterval(async()=>{
 const  is_reloade=await getIsReloade(activeUser.username);
 if(!(isReloade===is_reloade)) setIsReloade(is_reloade)
},1000)
    return ()=>clearInterval(reloadeInterval)
  },[isReloade,activeUser])





  const updateChatChatList = useCallback(async () => {
    
    

    let c = await getChat(activeUser.username, activeChat.username);
     let  c_list=await getSearchList(activeUser.username,searchInput);
     
    setchat(c)
    setChatList(c_list);
    reloaded(activeUser.username);
  },[activeUser.username,activeChat,searchInput])


useEffect(()=>{
updateChatChatList();
},[isReloade,updateChatChatList])


useEffect(()=>{
  if(activeChat.name!==null)setNavFlag('B');
},[activeChat])






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




  return (

    <>
      <LeftNav searchInput={searchInput} updateSearchInput={updateSearchInput} sty_lft={controProperty.left} activeChat={activeChat}  chatsList={chatsList} activeUser={  activeUser} setPage={props.setPage} setActiveChat={setActiveChat} ></LeftNav>
      <div id="main_page" style={controProperty.main}>
        <TopNav  leftNavControl={leftNavControl} activeChat={activeChat}></TopNav>
        <ChatPage  chat={chat} activeChat={activeChat.username} activeUser={activeUser.username}></ChatPage>

        <InputBar chat={chat} setchat={setchat} sty_input={controProperty.input}updateChatChatList={updateChatChatList} activeChat={activeChat.username} activeUser={activeUser.username} ></InputBar>


      </div>

    </>

  );
}
export default ChatPageSection
  ;



