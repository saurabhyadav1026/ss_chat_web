

'use client';
import React, { useContext, useState } from "react";
import ChatsListContext from "../../../contexts/ChatsListContext";
import MessageContext from "../../../contexts/MessagesContext";
import SearchBar from "../../left_nav/SearchBar";


import { useEffect } from "react";
import {  useNavigate, useParams, useSearchParams } from "react-router-dom";

import UserContext from "../../../contexts/UserContext";





 const ChatsList = () => {

    const { setActiveChatByChatRoomId} : any = useContext(MessageContext);

    const [searchInput, setSearchInput]: any = useState("");
const {setActiveUser,activeUser}:any =useContext(UserContext);
const {setChatsList}:any=useContext(ChatsListContext);




   // const[chatsList,setChatsList]:any=useState({});
    const {chatsList}:any=useContext(ChatsListContext)
const navigate=useNavigate();
useEffect(()=>{
    const func=async()=>{

      await  setActiveUser();

    }
    func();

},[])


useEffect(()=>{
if(!(activeUser&&activeUser._id))navigate("/user")
},[activeUser])



    return <>
    


            <div className='container-fluid m-0 p-0 vh-100 table-responsive scrollbar-only-rod m-0 p-0  overflow-auto' style={{ height: "calc(100% - 100px )", overflowY: "auto", backgroundColor: "rgb(255, 255, 255)" }} >

                <SearchBar searchInput={searchInput} _placeholder={"search chats..."} setSearchInput={setSearchInput} />

                <table id="menu_show_bar" className="table table-hover  p-0 " style={{ overflow: "scroll" }} >
                    {/*  <!-- list of chats  --> */}
                    <tbody className='overflow-y-scroll m-0'>
                        {Object.values(chatsList).map((u: any, i: any) => {
            
                            return <>


                                <React.Fragment key={i}>
                                    <tr className="listshow  " style={{ backgroundColor: " rgb(255, 255, 255)", cursor: "pointer" }}  >
                                        <td className="my-2  chatlist_dp" onClick={() => navigate(`/user/profile/${u.receiver._id}`)} style={{ backgroundImage: `url(${u.receiver.dp})` }}></td>
                                        <td onClick={() => {setActiveChatByChatRoomId(u._id); navigate(u._id) }} className=" mx-3 " style={{ backgroundColor: " rgb(255, 255, 255)", width: '100%' }}>
                                            <div className="" >
                                                <b> {u.receiver.name} </b>
                                                <br />

                                                {u.lastMessage && u.lastMessage.text.length < 30 ? <div title={u.lastMessage.text}>{u.lastMessage.text}</div> : u.lastMessage ? <div title={u.lastMessage.text}>{u.lastMessage.text.slice(0, 30) + "..."}</div> : <div></div>}
                                                {u.unreadCount > 0 ? <span style={stty_unread} className="unread_show">{u.unreadCount}</span> : <></>}
                                                <span className="list_option" style={{ visibility: "hidden" }}><b>:</b></span>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>



                            </>

                        }

                        )


                        }
                    </tbody>
                </table>
            </div>
      




    </>





}

export default ChatsList;

const stty_unread = {
    height: '20px',
    width: '20px',
    borderRadius: '50%',
    backgroundColor: 'green',
    color: 'white',
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'flex-end'
}