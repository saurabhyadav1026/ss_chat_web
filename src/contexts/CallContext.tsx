import { createContext, useEffect, useState } from "react";
import { socket } from "./socketcontext/SocketContext";
import { useNavigate } from "react-router-dom";




const CallContext = createContext({});

export const CallContextProvider = ({ children }: any) => {


    const [callHistory, setcallHistory]: any = useState({})

    const [isBussy, setIsBussy] = useState(false);

    const [activeCall, setActveCall]: any = useState({});

    const [callOffer, setCallOffer]: any = useState({})

    const [isCallNotification, setIsCallNotification] = useState(false);

    const startCall = (roomId: any) => {


        setIsBussy(true)
        navigate(`/u/calls/${roomId}/start`)

    }



    useEffect(() => {
        const incomingCall = (data: any) => {

            setCallOffer(data.offer);
           
            setActveCall(data.activeCall);
            setIsCallNotification(true)
        }
        socket.on("incomingcall", incomingCall);
        return () => { socket.off("incomingcall", incomingCall) }

    })


    useEffect(() => {
        const addCallHistory = (data: any) => {
            setcallHistory({ ...callHistory, [data._id]: data })
        }
        socket.on("savecallhistory", addCallHistory);

        return () => { socket.off("savecallhistory", addCallHistory) }
    })
    useEffect(() => {
        const addCallHistory = (data: any) => {
            setcallHistory({ ...callHistory, [data._id]: { ...callHistory[data._id], end: data.end } })
        }
        socket.on("updatecallhistory", addCallHistory);

        return () => { socket.off("updatecallhistory", addCallHistory) }
    })




    const navigate = useNavigate()


    const pickCall = () => {
        if(isCallNotification) setIsCallNotification(false);
        setIsBussy(true)
        setActveCall({...activeCall,["start"]:Date.now()})
        navigate(`/u/calls/${activeCall.roomId}/pick`)

    }

    const disconnectCall = () => {
        if(isCallNotification) setIsCallNotification(false)
        setIsBussy(false)
        setcallHistory({ ...callHistory, [activeCall._id]: { ...activeCall ,end: Date.now() } })
        socket.emit("end-call", { roomId: activeCall.roomId })

    }

    return <CallContext.Provider value={{ pickCall,startCall,isCallNotification, setIsCallNotification, disconnectCall, callOffer, callHistory, isBussy, activeCall }}>{children}</CallContext.Provider>


}


export default CallContext;

