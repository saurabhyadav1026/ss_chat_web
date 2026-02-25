


import api from "./api";



api.interceptors.response.use(
    (response)=>{

        return response;
    },
    async (error)=>{
    if(error.response?.status===401){
        // session expired 

        await api.post("/refreshToken").then((data:any)=>{
console.log(data);
        }).catch((err:any)=>{
alert("session over, log in again"+err);
        })
        // reloggin
    }
    }

)