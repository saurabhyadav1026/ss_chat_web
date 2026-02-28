

import { useContext } from 'react';

import ChatContext from '../../../contexts/chatscontext/ChatContext.tsx';



import AppOptionSwitcher from './AppOptionSwitcher.tsx';

const Chat = (props: any) => {



  const { searchInput, setSearchInput, chatsList,setAppOption,appOption }: any = useContext(ChatContext)

  const updateSearchInput = (e: any) => {
    setSearchInput(e.target.value)
  }
 
  return (
    <>
      <div id="left_nav_main_bar" className="left_bar left_nav_menu_bar col-12  flex-grow-1" style={{position:"relative",height:"80%"}}>

        <div className="container d-flex justify-content-around align-items-center " style={{backgroundColor:"pink", height:"10%"}}>
          <div className=' fw-bold col-sm-4 app_option'  onClick={() => {if(appOption!=="Chat")setAppOption("Chat")}}>Chat</div>
         
          <div className=' fw-bold col-sm-4 app_option' onClick={() => {if(appOption!=="AI")setAppOption("AI")}}> AI</div>
          { props.activeUser.dp!==""? <div  className=' col-sm-4' id="user_dp" style={{display:"inline-block", backgroundImage:`url(${props.activeUser.dp})`}} onClick={()=>{props.setPage('ProfileSection')}}></div>:  <div   className=' col-sm-4 ' id="user_dp"  style={{display:"inline-block"}} onClick={()=>{props.setPage('ProfileSection')}}></div>}

        </div >
        <div className='container p-3 '>
          <input className='form-control' name="ignore-history" style={{ height: "30px" }} typeof='search' onChange={updateSearchInput} value={searchInput} type="search" placeholder='search your friends...' id="search_input"></input>

        </div>
       <div className='container-fluid table-responsive scrollbar-only-rod m-0 p-0  flex-grow-1'   style={{ backgroundColor: "rgb(255, 255, 255)"}}>
         <AppOptionSwitcher/>
       </div>








      </div>



    </>
  );
}

export default Chat;








