import { createContext,useState} from 'react';





const UserContext=createContext({});


export const UserContextProvider=({children}:any)=>{

    const [activeUser,setActiveUser] =useState({});

    return < UserContext.Provider value={{activeUser,setActiveUser}}>{children}</UserContext.Provider>
}

export default UserContext;
