import { useContext } from "react"
import UserContext from "../../contexts/UserContext"
import { AboutIcon, ChatIcon, MicIcon, SearchIcon, SettingIcon } from "../icons";
import { useNavigate } from "react-router-dom";





const LeftMenu = (props: any) => {

    const { activeUser }: any = useContext(UserContext);
    const navigate =useNavigate();


    const sty: any = {
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "gray",
        height: "70%",
        borderRadius: "10px",


    }

    return <>
        <div className="container col-1 p-1   d-flex m-1" style={{  flexDirection: "column" ,alignItems: "center",}}>
            <div id="logo_icon" className="col-2 mb-2 border p-4" ></div>
            <div className="continer col-12 p-1 d-flex m-0" style={sty}>

                <div className='mb-2 p-2 fw-bold  app_option' onClick={() => { navigate("search") }} > <SearchIcon/></div>
                <div className=' mb-2 p-3 fw-bold app_option' onClick={() => { navigate("chats") }}><ChatIcon /></div>

                <div className='mb-2 p-3 fw-bold  app_option' onClick={() => {  navigate("aichats") }}> AI</div>

 <div className='mb-2 p-3 fw-bold  app_option' > <MicIcon/></div>
                

                {activeUser.dp !== "" ? <div className=' p-3 mt-4 mb-2 col-sm-4' id="user_dp" style={{ backgroundImage: `url(${activeUser.dp})` }} onClick={() => { navigate('/user/myprofile') }}></div> : <div className=' col-sm-4 ' id="user_dp" onClick={() => navigate('/user')}></div>}
                <div className='mb-2 p-3 fw-bold  app_option' > <SettingIcon /></div>
                <div className='mb-2 p-3 fw-bold  app_option' > <AboutIcon /></div>


            </div>


        </div>
    </>

}

export default LeftMenu
