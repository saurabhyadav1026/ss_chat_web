
import { createContext, useEffect, useState } from 'react';




import api from '../api/api.ts';
import { useQuery } from '@tanstack/react-query';
import queryClient from '@/lib/queryClient.ts';
import { toast } from 'react-toastify';
import { socket } from './socketcontext/SocketContext.tsx';
import newVisit from '@/analysis/tracking/newVisit.ts';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext({});
let x = 0;
export const UserContextProvider = ({ children }: any) => {
  const [isInternetConnection, setInternetConnection]: any = useState(false);
  const navigate=useNavigate()



  useEffect(() => {
    const checkInternetConnection = async () => {
       api.get("/checkhealth").then((res) => {
        if (res.data && res.data.status) setInternetConnection(true);
      }
      ).catch((err: Error) => {
        setInternetConnection(false);
        console.log(err)
        
      })

    }

    checkInternetConnection();

    const intervel=setInterval(checkInternetConnection,5*60*1000)

    return ()=>clearInterval(intervel)
  }, [])



 useEffect(() => {
   if (x !== 0) return;
      x += 1;
    newVisit();
  }, []);



  const fetchActiveUser = async () => {
    if (!isInternetConnection) return;
    return await api.get("/users/verifyme")
      .then((res: any) => {
        if (res.data.status) {
          return res.data.user;
        }
        else return { username: 'sbhunk', name: "Loggin here", dp: "https://ik.imagekit.io/sbhtechhub/no_dp.jpg", loggin_token: "" }

      })
      .catch((err: any) => {
        console.log(err)
        return { username: 'sbhunk', name: "Loggin here", dp: "https://ik.imagekit.io/sbhtechhub/no_dp.jpg", loggin_token: "" }
      })
  }
  const { data: activeUser, isFetching, isPending }: any = useQuery({ queryKey: ["activeUser"], queryFn: fetchActiveUser })



  const setActiveUser: any = async () => {
    if (isInternetConnection) queryClient.invalidateQueries({ queryKey: ["activeUser"] });
  }

  useEffect(() => {
    const setActiveUser: any = async () => {
      if (isInternetConnection) await queryClient.invalidateQueries({ queryKey: ["activeUser"] });
    }


    setActiveUser();
    if (isInternetConnection) api.get("/users/verifyme")
      .then((res: any) => {
        if (res.data.status) {
          socket.auth = { token: res.data.token }
          socket.connect();
          console.log(res.data.user);
          return res.data.user;
        }
      })
  }, [isInternetConnection])


  const setLogout = async () => {
    await api.post("users/logoutme").then(async (res) => {
      if (res.data.status) { await setActiveUser(); }
      else {

        toast.success("Logout Successfully.");
        navigate("/user/login")
      }
    }
    ).catch((err: any) => {
      console.log(err)
      queryClient.removeQueries({ queryKey: ["activeuser"] });
      toast.info("No internet connection .so, Failed to logout completely , you should have to clear browser cookies for it.")

    })



    return true;
  }

  return < UserContext.Provider value={{ setLogout, activeUser, setActiveUser, isUserLoading: (isFetching || isPending), isInternetConnection }}>{children}</UserContext.Provider>
}

export default UserContext;
