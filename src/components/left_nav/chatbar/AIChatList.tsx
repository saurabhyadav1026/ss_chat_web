

'use client';
import React, { useContext } from "react";
import AIChatContext from "../../../contexts/chatscontext/AIChatContext";


const AIChatList = () => {


    const {  aiChatsList, setActiveAIChat }: any = useContext(AIChatContext)


    return <div > Come soon bro </div>

    return <>
        {console.log(aiChatsList)}
        <table id="menu_show_bar" className=" table table-hover " >
            {/*  <!-- list of chats  --> */}
            <tbody className='overflow-y-scroll m-0'>
                {Object.values(aiChatsList).map((u: any, i: any) => {

                    return <>


                        <React.Fragment key={i}>
                            <tr className="listshow" style={{ cursor: "pointer" }} onClick={() => { setActiveAIChat(u) }}   >
                                <td className="my-2  chatlist_dp" style={{ backgroundImage: `url(${u.roomDP})` }}></td>
                                <td className="container mx-3" style={{ width: '100%' }}>
                                    <div >
                                        <span >{u.name}</span>

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

export default AIChatList