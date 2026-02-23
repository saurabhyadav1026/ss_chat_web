


import api from "./api";



api.interceptors.request.use(
(config)=>{

    const token='saurabh ka token';
    if(token){
        config.headers.Authorization=`bearer ${token}`
    }

    return config;
},
(err)=>{

    Promise.reject(err)
}


)