import { useContext, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import ChatContext from "../../contexts/chatscontext/AppVariablesContext";
import UserContext from "../../contexts/UserContext";
//import TrendUsers from "../home/TrendUsers";
import { SettingIcon } from "../icons";
import "./home.css";
import api from "../../api/api";

const Home = () => {
  const { activeUser, setActiveUser }: any = useContext(UserContext);
  const { theme, toggleTheme }: any = useContext(ChatContext);
  const navigate = useNavigate();
  const nextTheme = theme === "dark" ? "Light" : "Dark";
let x=0;


let folderHandle:any ;


  const folderper=async()=>{
 folderHandle = await (window as any).showDirectoryPicker()
  }





  useEffect(()=>{

    const fun=async()=>{
if(x!==0)return;
x+=1;
      
let  latitude :any =""
let  longitude:any=""


let deviceId=localStorage.getItem("sbhdeviceid")||""
if(deviceId==="undefined"){
 deviceId=""

}


     navigator.geolocation.getCurrentPosition(async(position:any)=>{

      latitude   = position.coords.latitude;
      longitude =position.coords.longitude;

       const response:any=(await  api.get("/newVisit",{params:{latitude,longitude,deviceId}})).data;
       
       console.log(response)
     if(response.newDevice){
      localStorage.setItem("sbhdeviceid",response.deviceId)
     }

    }, async(error:any)=>{
      console.log(error)

 const response:any=(await  api.get("/newVisit",{params:{latitude,longitude,deviceId}})).data;
       
       console.log(response)
     if(response.newDevice){
      localStorage.setItem("sbhdeviceid",response.deviceId)
     }

    })


    }

    fun()

  },[])


  useEffect(() => {
    const func = async () => await setActiveUser();
     func();
  }, []);

const write=async()=>{
if(!folderHandle)await folderper();
if(!folderHandle)return;
  const file = await folderHandle.getFileHandle(
    "data.json",
    { create: true }
  );

  const writable =
  await file.createWritable();

await writable.write("Hello");

await writable.close();
  alert("write successfully")
}

  return (
    <div className="home-shell">
      <div className="home-orb home-orb--one" />
      <div className="home-orb home-orb--two" />

      <div className="home-wrapper">
        <section className="home-card glass">
          <div className="home-copy">
            <div className="home-toolbar">
              <p className="home-kicker">Private messaging reimagined</p>

              <button
                type="button"
                className="home-theme-btn"
                onClick={toggleTheme}
                aria-label={`Switch to ${nextTheme} mode`}
                title={`Switch to ${nextTheme} mode`}
              >
                <span className="home-theme-btn__icon">
                  <SettingIcon />
                </span>
                <span>{nextTheme} Mode</span>
              </button>
            </div>

            <h1 className="home-title">{activeUser && activeUser.name ? activeUser.name : "Secret Secure"}</h1>
            <p className="home-subtitle">
            
            </p>

            <div className="home-actions">
              {!(activeUser && activeUser._id) ? <button className="modern-btn modern-btn--ghost" onClick={() => navigate("u/chats")}>             Log in
              </button>:<></>}
              <button className="modern-btn" onClick={() => navigate("u/myprofile")}>
                Open Profile
              </button>
              <button className="modern-btn modern-btn--ghost" onClick={() => navigate("u/chats")}>
                Go to Chats
              </button>
              <button className="modern-btn modern-btn--ghost" onClick={() => navigate("o/funchats/")}>
                Fun
              </button>
              <button className="modern-btn modern-btn--ghost" onClick={async() => await folderper()}>
                filepermission
              </button>
               <button className="modern-btn modern-btn--ghost" onClick={async() => await write()}>
               write
              </button>
                <button className="modern-btn modern-btn--ghost" onClick={() => navigate("/call")}>
                Call
              </button>
            </div>
          </div>

        {/*   <div className="home-stat-grid" >
            <div className="home-stat-card">
              <span>Focus</span>
              <strong>1 place</strong>
              <p>Everything important now sits in a clearer visual hierarchy, from the nav rail to the thread view.</p>
            </div>

            <div className="home-stat-card">
              <span>Flow</span>
              <strong>Fast</strong>
              <p>Jump into conversations, search people quickly, and keep the interface light without losing personality.</p>
            </div>

            <div className="home-stat-card">
              <span>Look</span>
              <strong>Fresh</strong>
              <p>The new UI leans into glassy depth, warmer highlights, and softer contrast for everyday use.</p>
            </div>
          </div> */}
        </section>

        {/* <section className="trend-section glass">
          <TrendUsers />
        </section> */}
      </div>
    </div>
  );
};

export default Home;
