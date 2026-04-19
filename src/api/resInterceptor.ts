
import api from "./api";



api.interceptors.response.use(
    (response: any) => {
        return response;
    },
    async (error: any) => {
        let originalRequest: any = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            // session expired 
            let active_user: any = (localStorage.getItem('ssapp_activeUser'));
            if (!active_user) return;

            originalRequest._retry = true;
          try{ let res= await api.get("/refreshtoken")
               
                active_user = JSON.parse(active_user);
                active_user.accessToken = res.data.token;
                localStorage.setItem('ssapp_activeUser', JSON.stringify(active_user));
                originalRequest.headers.Authorization = `Bearer ${res.data.token}`;

      
            
        }catch(err:any){
                  localStorage.clear();
            window.location.reload();
            return  Promise.reject(error);
            }

            return api(originalRequest);

        }

        else if (error.response?.status === 420) {
            localStorage.clear();
            return  Promise.reject(error);
        }
        else {
           return  Promise.reject(error);
        }
    }

) 
