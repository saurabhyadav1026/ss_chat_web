

import MessageContext from "../../../contexts/MessagesContext";
import { useContext, useState ,useEffect} from "react";
import SearchBar from "../../left_nav/SearchBar";
import React from "react";
import api from "../../../api/api";
import UserContext from "../../../contexts/UserContext";
import { Outcome } from "@google/generative-ai";
import { Navigate, Outlet, useNavigate } from "react-router-dom";







const device_ = {

    sm_hide: "d-none",        // page1 will display none on sm
    sm_visible: " d-flex"

}
const SearchList = () => {



    const navigate=useNavigate();
    
        const {getRoomIdByReceiverId,activeChat}: any = useContext(MessageContext);
        const [searchInput,setSearchInput]:any=useState("");
        const [searchList,setSearchList]:any=useState({});



            
useEffect(()=>{
if(searchInput!==""){
    console.log(searchInput)
  api.get("/users/searchlist",{params:{input:searchInput}})
  .then((res:any)=>setSearchList(res.data))
  .catch((err:any)=>{console.log(err)})
}

},[searchInput])
  



    const [device_show, setdevice_show] = useState({ d1: device_.sm_visible, d2: device_.sm_hide });




    const change_device_show = (flag: number) => {

        if (!flag || !activeChat._id) {
            setdevice_show({ d1: device_.sm_visible, d2: device_.sm_hide });

        }
        else {
            setdevice_show({ d1: device_.sm_hide, d2: device_.sm_visible });

        }

    }

    useEffect(() => {

        change_device_show(1);
    }, [activeChat])




    return (
        <>
            <div className='container-fluid m-0 p-0 vh-100 table-responsive scrollbar-only-rod m-0 p-0  overflow-auto' style={{ height:"calc(100% - 100px )",overflowY:"auto", backgroundColor: "rgb(255, 255, 255)"}} >
                <SearchBar searchInput={searchInput} _placeholder={"search friends..."} setSearchInput={setSearchInput}/>

             <table id="menu_show_bar" className="table table-hover " >
            {/*  <!-- list of chats  --> */}
            <tbody className='overflow-y-scroll m-0'>

                {
                    Object.values(searchList).map((u: any, i: any) => {
                      

                        return <>

                            <React.Fragment key={i}>
                                <tr className="listshow " style={{ cursor: "pointer" }}    >
                                    <td className="chatlist_dp"  style={{ backgroundImage: `url(${u.dp})` }}></td>
                                    <td className=" mx-3"  style={{ width: '100%' }}>
                                        <div >
                                           <b> {u.name} </b>
                                            <br />
                                            <sub>@{u.username}</sub>

                                            <span className="list_option" style={{ visibility: "hidden" }}><b>:</b></span>
                                        </div>
                                        <div>
                                            <button className="btn" onClick={()=>navigate(u._id)}>Profile</button>
                                            <button className="btn" onClick={async() => { const t= await getRoomIdByReceiverId(u._id); if(t.status)navigate(`/u/chats/${t.roomId}`) }}>Message</button>
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
    );

}

export default SearchList;