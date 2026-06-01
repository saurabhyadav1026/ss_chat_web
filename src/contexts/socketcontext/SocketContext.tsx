

import { createContext } from 'react';

import {io} from 'socket.io-client';

const SocketContext = createContext({});
export const socket = io(import.meta.env.VITE_API_KEY+"/u",{
  transports: ["websocket", "polling"],
  withCredentials: true,
});
export const funChatSocket=io(import.meta.env.VITE_API_KEY+"/funchat",{
  transports: ["websocket", "polling"],
  withCredentials: true,
});
export const callSocket=io(import.meta.env.VITE_API_KEY+"/call",{
  transports: ["websocket", "polling"],
  withCredentials: true,
});


export const SocketContextProvider = ({ children }: any) => {



    return <SocketContext.Provider
        value={{}}
    >{children}</SocketContext.Provider>
}




export default SocketContext;