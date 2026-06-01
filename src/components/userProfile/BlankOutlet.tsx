import { useContext } from "react";
import { Outlet } from "react-router-dom"
import UserContext from "../../contexts/UserContext";
import UserLoading from "../loading-components/UserLoading";



const BlanlOutlet=()=>{


    const {isUserLoading}:any=useContext(UserContext)
  if(isUserLoading)return  <UserLoading/>
   else return<>
    <Outlet/>
    </>
}

export default BlanlOutlet;