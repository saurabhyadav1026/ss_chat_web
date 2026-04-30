
import { Outlet } from "react-router-dom";
import LeftMenu from "../left_nav/LeftMenu";
export const Mpage = () => {
 
  
  return (
    <div className="chat-shell">
      <LeftMenu />
     <Outlet/>
    </div>
  );
}

export default Mpage;
