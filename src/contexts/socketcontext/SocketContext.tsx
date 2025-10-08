

import {createContext} from 'react';

import io from 'socket.io-client';

const SocketContext=createContext({});
export const socket=io(import.meta.env.VITE_API_KEY);

export const SocketContextProvider=({children}:any)=>{
    
   
 
    return <SocketContext.Provider
    value={{}}
    >{children}</SocketContext.Provider>
}




export default SocketContext;