import { Outlet } from "react-router-dom";
import LeftMenu from "./components/left_nav/LeftMenu.tsx";
import { useContext } from "react";
import UserContext from "./contexts/UserContext.tsx";
import UserLoading from "./components/loading-components/UserLoading.tsx";

export const ChatPageSection = () => {
 
  const {isUserLoading}:any=useContext(UserContext)
  if(isUserLoading)return  <UserLoading/>
  else return (
    <div className="chat-shell">
      <LeftMenu />
      <Outlet />
    </div>
  );
};

export default ChatPageSection;
