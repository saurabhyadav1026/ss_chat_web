
import { createContext  ,useState} from "react";


const ProfileContext= createContext({});


export const ProfileContextProvider=({children}:any)=>{



    const [public_info,setPublicInfo]=useState(null);
    const [private_info,setPrivateInfo]=useState(null);



return <ProfileContext.Provider value={{}}>
    {children}
</ProfileContext.Provider>

}
