

'use client';
import React, { useContext } from "react";
import ChatContext from "../../../contexts/chatscontext/ChatContext";





export const ChatList = () => {

    const { setActiveChatByChatRoom,setActiveChatOfNewUser, searchInput, chatsList ,showUserByRoom,showUserProfile}: any = useContext(ChatContext)





    if (searchInput === "") return <>

        <table id="menu_show_bar" className="table table-hover  p-0 " style={{height:"100%"}} >
            {/*  <!-- list of chats  --> */}
            <tbody className='overflow-y-scroll m-0'>
                {Object.values(chatsList).map((u: any, i: any) => {

                    return <>


                        <React.Fragment key={i}>
                            <tr className="listshow  container-fluid" style={{backgroundColor:" rgb(255, 255, 255)", cursor: "pointer" }}  >
                                <td className="my-2  chatlist_dp" onClick={()=>showUserByRoom(u)} style={{ backgroundImage: `url(${u.roomDP})` }}></td>
                                <td  onClick={() => { setActiveChatByChatRoom(u) }} className=" mx-3 " style={{ backgroundColor:" rgb(255, 255, 255)", width: '100%' }}>
                                    <div className="" >
                                        <span >{u.name}</span>
                                        <span>{u.username}</span>
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
    </>


    // for displaying search list
    else return <>
        <table id="menu_show_bar" className="table table-hover " >
            {/*  <!-- list of chats  --> */}
            <tbody className='overflow-y-scroll m-0'>

                {
                    Object.values(chatsList).map((u: any, i: any) => {

                        return <>

                            <React.Fragment key={i}>
                                <tr className="listshow " style={{ cursor: "pointer" }}    >
                                    <td className="chatlist_dp" onClick={()=>showUserProfile(u)} style={{ backgroundImage: `url(${u.dp})` }}></td>
                                    <td className="container mx-3" onClick={() => { setActiveChatOfNewUser(u) }} style={{ width: '100%' }}>
                                        <div >
                                            <span >{u.name}</span>
                                            <span>{u.username}</span>

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

    </>
}

export default ChatList;

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