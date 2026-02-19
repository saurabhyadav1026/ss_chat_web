
import axios from 'axios';
const responser:string=import.meta.env.VITE_API_KEY+'/users';

    export const createNewPassword=async(password:String)=>{

let val;
    await axios.post(responser+"/create-new-password",{password:password})
        .then(res=>val=res.data)
        .catch(err=>console.log(err))

        return val;

    }



