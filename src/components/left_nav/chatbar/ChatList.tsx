

'use client';
import React, { useContext } from "react";
import ChatContext from "../../../contexts/chatscontext/ChatContext";





export const ChatList = () => {

    const { activeUser, searchInput, chatsList, setActiveChat ,showUserById,showUserProfile}: any = useContext(ChatContext)



    const update = (u: any) => {
     alert("yyyyyy")
        setActiveChat(u)
      
    }


    const newChat = (member2: any) => {

        const tempRoom = {
            _id: null,
            members: [activeUser._id, member2._id],
            name: member2.name,
            roomDP: member2.dp,
            roomName: member2.username,

        }

    
        update(tempRoom);
     

    }


    if (searchInput === "") return <>

        <table id="menu_show_bar" className="table table-hover p-0 " style={{height:"100%"}} >
            {/*  <!-- list of chats  --> */}
            <tbody className='overflow-y-scroll m-0'>
                {Object.values(chatsList).map((u: any, i: any) => {

                    return <>


                        <React.Fragment key={i}>
                            <tr className="listshow container-fluid" style={{ cursor: "pointer" }}  >
                                <td className="my-2  chatlist_dp" onClick={()=>showUserById(u.members)} style={{ backgroundImage: `url(${u.roomDP})` }}></td>
                                <td  onClick={() => { update(u) }} className="container mx-3" style={{ width: '100%' }}>
                                    <div >
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
                                    <td className="container mx-3" onClick={() => { newChat(u) }} style={{ width: '100%' }}>
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