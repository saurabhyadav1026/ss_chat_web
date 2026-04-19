import { Outlet, useNavigate } from "react-router-dom";
import "./user_profile_css.css";
import Promo from "../pages/page2/Promo";
import { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";

const ProfileSection = () => {
const {activeUser}:any=useContext(UserContext)
const navigate=useNavigate()
 useEffect(() => {
    if (!(activeUser && activeUser._id)) navigate("/user/login");
  }, [activeUser]);
 
 return (
    <div id="profile_section" className="profile-shell container-fluid col-12 d-flex p-0 m-0">
      <div id="profile_section_div2" className="profile-pane col-12 col-md-6 col-lg-6 col-xl-4 p-3">
        <Outlet />
      </div>
<Promo/>
       </div>
  );
};

export default ProfileSection;
