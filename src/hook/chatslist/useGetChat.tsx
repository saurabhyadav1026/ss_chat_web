import { useContext } from "react";
import ChatsListContext from "../../contexts/ChatsListContext";


const useGet=()=>{
    
    const {chatsList,setChatsList}:any=useContext(ChatsListContext)


    const getChat =()=>{
    }

    const getAllChats=()=>{
        setChatsList({name:"saurabh"})
    }
    const searchChat=()=>{
        
    }

    return get;
}

export default useGet;