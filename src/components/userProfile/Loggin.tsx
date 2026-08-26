import { useContext, useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import api from "../../api/api.ts";
import UserContext from "../../contexts/UserContext.tsx";
import { toast } from "react-toastify";
import { LucideLoaderPinwheel } from "lucide-react";
const Loggin = () => {
  const navigate = useNavigate();
const [isloading,setIsLoading]= useState(true);
const {activeUser}:any=useContext(UserContext)

useEffect(()=>{
  if(activeUser && activeUser._id){
     navigate("/u/chats");
     return;
  }
  api.get("/users/verifyme")
        .then((res: any) => {
          if (res.data.status) {
           navigate("/u/chats")
          }
          else{
            setIsLoading(false)
          }

        }).catch((err:Error)=>{
          console.log("Error: "+err.message);
          toast.error("Something Error: try again later.");
          navigate("/user/login")
            setIsLoading(false)
        })
},[])



  const { setActiveUser }: any = useContext(UserContext);

  const verifyLoggin = async () => {
    const usname_: string = (document.getElementById("log_usname_input") as HTMLInputElement).value;
    const uspassword_: string = (document.getElementById("log_uspassword_input") as HTMLInputElement).value;

    let status: any = false;

    await api
      .get("/logging/verifyuser", { params: { username: usname_, password: uspassword_ } })
      .then((res) => {
        status = res.data.status;
      })
      .catch((err) => console.log(err));

    if (status) {
      await setActiveUser();
      toast.success("logging successfully");
      navigate("/");
    } else {
      toast.error("invalid username or password");
    }
  };

  const verifygoogleLoggin = async (res: any) => {
    let status=false;
    try{  await api.post('/logging/googleAuthVerification',{token:res.credential}).
  then((res)=>{
    
    if(res.data.status){status=true;
             
      
    }
else{
  toast.warn("username or password is incorrect. 1");
}
});

if(status){
   await setActiveUser();
      navigate("/ ");
}
}
catch(e){
   toast.error("username or password is incorrect");
}
  }




if(isloading)return <LucideLoaderPinwheel/>
  return (
    <div className="auth-card">
      <div className="app_logo auth-logo" />

      <div className="auth-header">
        <p className="auth-eyebrow">Welcome back</p>
        <h2 className="auth-title">Log in</h2>
        <p className="auth-subtitle">Pick up your private chats and profile from a cleaner, friendlier interface.</p>
      </div>

      <div className="auth-form">
        <label className="auth-field">
          <span className="auth-label">Username</span>
          <input id="log_usname_input" className="auth-input" placeholder="Enter username" />
        </label>

        <label className="auth-field">
          <span className="auth-label">Password</span>
          <input id="log_uspassword_input" className="auth-input" placeholder="Enter password" type="password" />
        </label>

        <button className="auth-button auth-button--primary" onClick={verifyLoggin}>
          Log in
        </button>

        <div className="auth-divider">or continue with</div>

        <div className="d-flex justify-content-center">
          <GoogleLogin onSuccess={verifygoogleLoggin} />
        </div>
      </div>

      <div className="auth-link-row">
        Forgot your password?
        <span className="auth-link" onClick={() => navigate("/user/forgetpassword")}> Reset it here</span>
      </div>

      <div className="auth-link-row">
        New here?
        <span className="auth-link" onClick={() => navigate("/user/register")}> Create an account</span>
      </div>
    </div>
  );
};

export default Loggin;
