import axios from "axios"


     const api= axios.create({
        baseURL:"http://localhost:5000",         //import.meta.env.VITE_API_KEY,
        withCredentials:true
     });



export default api;
