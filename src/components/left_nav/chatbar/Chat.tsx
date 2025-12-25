

import { useContext, useState } from 'react';
import { newChat } from '../../userProfile/users.ts';
import ChatContext from '../../../contexts/chatscontext/ChatContext.tsx';



import ChatList from './ChatList.tsx'

const Chat = (props:any) => {


  const [t, setT] = useState(0)

  const createNewAIChat = async () => {
    await newChat(props.activeUser.username, "sbhai" + t)
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
        
        <div className="container left_nav_menu_bar" > 
             <h3 className='col' style={{ width: '80%', display:"inline-block"}}>Chat</h3>
              <button  className='btn btn-info col-sm' onClick={() => createNewAIChat()}> AI</button>
            
     
</div>
          <table id="menu_show_bar" className="table table-hover scrollbar-only-rod" >

            {/*  <!-- list of chats  --> */}
           <tbody>
             <ChatList ></ChatList>
           </tbody>
          </table>

          <div id="search_block" >

            <div id="new_chat_op2" style={{boxSizing:'border-box', width: '100%', height: '100%'}}>
              <input className='form-control' onChange={updateSearchInput} value={searchInput}  type="search" placeholder='search your friends...' id="search_input"></input>
             
            </div>
          

          </div>

        </div>
      
    </>
  );
}

export default Chat;








