


import api from "./api";



api.interceptors.response.use(
    (response)=>{

        return response;
    },
    async (error)=>{
    if(error.response?.status===401){
        // session expired 

        await api.post("/refreshToken").then((data)=>{

        }).catch((err)=>{
alert("session over, log in again");
        })
        // reloggin
    }
    }

)