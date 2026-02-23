


import api from "./api";



api.interceptors.response.use(
    (response)=>{

        return response;
    },
    (error)=>{
    if(error.response?.status===401){
        // session expired 

        // reloggin
    }
    }

)