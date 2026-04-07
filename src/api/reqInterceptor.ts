/* 


import api from "./api";

let active_user:any= (localStorage.getItem('ssapp_activeUser')) 
 active_user=JSON.parse(active_user);
 

export  const au:any=active_user;


api.interceptors.request.use(


(config)=>{
    const token:String=active_user.accessToken ||'saurabh ka token';
    if(token){ 
        config.headers.Authorization=`bearer ${token}`
        console.log("token ho gya addddd")
    }

    return config;
},
(err)=>{
console.log("token missing "+err)
}
) */