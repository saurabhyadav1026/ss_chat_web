
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LeftMenu from "./components/left_nav/LeftMenu.tsx";





export const ChatPageSection = () => {





  return (

    <>
    
    <LeftMenu/>
     <Outlet/>
    </>

  );
}
export default ChatPageSection
  ;



