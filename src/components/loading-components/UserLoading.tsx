
import { LoadingIcon } from "../icons";
import './loading.css'



const UserLoading=()=>{


    const sty:any={
        position:"fixed",
         alignItems:"center",
        justifyContent:"center",
       
       
        
    }
    const styround:any={
       alignItems:"center",
        justifyContent:"center",
        
 animation: "spin 1s linear infinite"
    }




  return <>
    
    <div className="container col-12 p-3 m-3 d-flex  vh-100" style={sty}>

    <span style={styround} className=" col-12 text-white  d-flex"> <LoadingIcon/></span>
   
    </div>
    </>
}

export default UserLoading;