
import { createContext, useContext, useEffect, useState } from 'react';

import { socket } from './socketcontext/SocketContext.tsx';

import MessageContext from './MessagesContext.tsx';
import api from '../api/api.ts';

const UserContext = createContext({});

export const UserContextProvider = ({ children }: any) => {
  const [activeUser, updateActiveUser]: any = useState({});
  const [isUserLoading,setUserLoading]:any=useState(true)

  const { setActiveChatNull }: any = useContext(MessageContext);

  const setActiveUser: any = async () => {
    setUserLoading(true);
   console.log("we update the user")
    socket.disconnect();
    //setActiveChatNull();

    await api.get("/users/verifyme")
      .then((res: any) => {
        if (res.data.status) {
          updateActiveUser(res.data.user);
          console.log(res.data.user);
          socket.auth={token:res.data.token}
          socket.connect();
        }
      })
      .catch((err: any) => {
        console.log(err)
        updateActiveUser({ username: 'sbhunk', name: "Loggin here", dp: "https://ik.imagekit.io/sbhtechhub/no_dp.jpg", loggin_token: "" })
      })
      setUserLoading(false)
      console.log("user update")
  }

useEffect(()=>{
  setActiveUser();
},[])

  const setLogout = async() => {
    updateActiveUser({ username: 'sbhunk', name: "Loggin here", dp: "https://ik.imagekit.io/sbhtechhub/no_dp.jpg", loggin_token: "" })
    await api.post("users/logoutme");

    setActiveChatNull();

    return
  }

  return < UserContext.Provider value={{ setLogout, activeUser, setActiveUser,isUserLoading }}>{children}</UserContext.Provider>
}

export default UserContext;
