


import api from "./api";

let active_user:any= (localStorage.getItem('ssapp_activeUser')) 
 active_user=JSON.parse(active_user);




api.interceptors.request.use(


(config)=>{
console.log("we adding the token")
    const token=active_user.active.accessToken ||'saurabh ka token';
console.log(" your token is :      "+token)
    if(token){ 
        config.headers.Authorization=`bearer ${token}`
        console.log("token added")
    }

    return config;
},
(err)=>{
console.log("token missing")
    Promise.reject(err)
}


)