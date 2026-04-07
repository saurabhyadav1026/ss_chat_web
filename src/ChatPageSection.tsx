import { Outlet } from "react-router-dom";
import LeftMenu from "./components/left_nav/LeftMenu.tsx";

export const ChatPageSection = () => {
  return (
    <div className="chat-shell">
      <LeftMenu />
      <Outlet />
    </div>
  );
};

export default ChatPageSection;
