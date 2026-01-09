import { useEffect, useState } from "react"




const Alert = ({buttonId="", message = "something went wrong.", type = "danger"}) => {
    const [isclick, setIsClick] = useState(false);

    useEffect(() => {
        const btn = document.getElementById(buttonId);
        const btnhandle=()=>{setIsClick(true);}
        if (!btn) return;
        btn.addEventListener("click", btnhandle);
        return ()=>btn.removeEventListener("click",btnhandle)
    },[buttonId])



   

    return <>

        {isclick ? <div className={`alert alert-${type} alert-dismissible`} role="alert">
            <div>{message}</div>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setIsClick(false)}></button>
        </div> : <></>}
    </>

}

export default Alert;





export const ConditionAlert = ({condition=false, message = "something went wrong.", type = "danger"}) => {
    const [isclick, setIsClick] = useState(condition);

  


   

    return <>

        {isclick ? <div className={`alert alert-${type} alert-dismissible`} role="alert">
            <div>{message}</div>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setIsClick(false)}></button>
        </div> : <></>}
    </>

}

