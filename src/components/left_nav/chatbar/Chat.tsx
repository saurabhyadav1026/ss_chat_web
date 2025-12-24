

import { useContext, useState } from 'react';
import { newChat } from '../../userProfile/users.ts';
import ChatContext from '../../../contexts/chatscontext/ChatContext.tsx';



import ChatList from './ChatList.tsx'

const Chat = (props:any) => {


  const [t, setT] = useState(0)

  const createNewAIChat = async () => {
    await newChat(props.activeUser, "sbhai" + t)
    props.setActiveChat({ username: "sbhai" + t.toString(), name: "sbhai" + t.toString() })
    
    const x = t;
    setT(x + 1);

  }

  const {searchInput,setSearchInput}:any=useContext(ChatContext)

const updateSearchInput=(e:any)=>{
  setSearchInput(e.target.value)
}

  return (
    <>
      <div id="left_nav_main_bar" className="left_bar">
        
        <div className="left_nav_menu_bar" > 
             <h3 style={{ width: '80%' }}>Chat</h3>
     
</div>
          <div id="menu_show_bar" className="scrollbar-only-rod" >

            {/*  <!-- list of chats  --> */}
            <ChatList ></ChatList>
          </div>

          <div id="search_block" >

            <div id="new_chat_op2" style={{boxSizing:'border-box', width: '100%', height: '100%'}}>
              <input onChange={updateSearchInput} value={searchInput} style={{ boxSizing:'border-box', borderRadius:"8px",width: '70%', height: '100%',margin:'0' }} type="search" placeholder='search your friends...' id="search_input"></input>
              <button style={{ boxSizing:'border-box',width: '30%',borderRadius:"8px", height: '100%' }} onClick={() => createNewAIChat()}> AI</button>
            </div>
          

          </div>

        </div>
      
    </>
  );
}

export default Chat;








