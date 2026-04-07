import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom"
import UserContext from "../../contexts/UserContext";


   

const Page1=({element}:any)=>{

     const {page2Id}:any =useParams();
const [pageShow,setPageShow]=useState("d-flex");

/* 
const navigate =useNavigate();
const {activeUser}:any=useContext(UserContext);

useEffect(()=>{
if(!(activeUser&& activeUser._id))navigate("user")
},[activeUser])


 */

useEffect(()=>{
if(page2Id!==null&& pageShow!=="d-none")setPageShow("d-none");
else if(pageShow!=="d-flex")setPageShow("d-flex");

},[page2Id])




    return<>
    <div id="main_page1" className={`${pageShow} m-0 p-2 col-12  col-md-6 col-lg-4 col-xl-4 d-md-flex vh-100 `}>
        {element}
    </div>
       <div id="main_page2" className={`d-flex col-12  col-md-5  col-lg-7   col-xl-7 vh-100`} style={{ flexDirection: "column" }}>
        <Outlet/>
       </div>
</>

}


export default Page1