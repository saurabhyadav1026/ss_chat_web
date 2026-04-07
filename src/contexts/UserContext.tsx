// import { createContext, useContext, useState } from 'react';
import { createContext, useContext, useState } from 'react';

import { socket } from './socketcontext/SocketContext.tsx';

// import { useEffect } from 'react';
import MessageContext from './MessagesContext.tsx';
import api from '../api/api.ts';

const UserContext = createContext({});

export const UserContextProvider = ({ children }: any) => {
  const [activeUser, updateActiveUser]: any = useState({});

  const { setActiveChatNull }: any = useContext(MessageContext);

  const setActiveUser: any = async () => {
    socket.disconnect();
    //setActiveChatNull();

    await api.get("/users/verifyme")
      .then((res: any) => {
        if (res.data.status) {
          updateActiveUser(res.data.user);
          console.log(res.data.user)
          socket.connect();
        }
      })
      .catch((err: any) => {
        console.log(err)
        updateActiveUser({ username: 'sbhunk', name: "Loggin here", dp: "https://ik.imagekit.io/sbhtechhub/no_dp.jpg", loggin_token: "" })
      })
  }

  const setLogout = async() => {
    updateActiveUser({ username: 'sbhunk', name: "Loggin here", dp: "https://ik.imagekit.io/sbhtechhub/no_dp.jpg", loggin_token: "" })
    await api.post("users/logoutme");

    setActiveChatNull();

    return
  }

  return < UserContext.Provider value={{ setLogout, activeUser, setActiveUser }}>{children}</UserContext.Provider>
}

export default UserContext;
