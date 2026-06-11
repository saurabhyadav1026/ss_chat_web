import { useContext } from "react"
import CallNotification from "./CallNotification"
import "./style.css"
import CallContext from "../../../contexts/CallContext";




const MainNotificationPage=()=>{


const { activeCall,isCallNotification,setIsCallNotification,pickCall,disconnectCall}:any=useContext(CallContext)


   
    return<>
    
    <div className="main-notification-box" aria-live="polite">
{isCallNotification?<CallNotification pickCall={pickCall} disconnectCall={disconnectCall} activeCall={activeCall} closeNotification={()=>setIsCallNotification(false)}/>:<></>}
    

    </div>
    </>


}


export default MainNotificationPage
