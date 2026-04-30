import { useContext, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import UserLoading from "../loading-components/UserLoading";
import UserContext from "../../contexts/UserContext";

const Upage= ({ element }: any) => {
   
  const { page2Id }: any = useParams();
  const hasPage2Id = Boolean(page2Id);
  
  const {isUserLoading,activeUser}:any=useContext(UserContext)
  
const navigate=useNavigate();

   useEffect(() => {
    if (!isUserLoading&& !(activeUser && activeUser._id)) navigate("/user/login");
  }, [activeUser]);


  if(isUserLoading)return  <UserLoading/>
  else return <>   

  
  
    <div className="page-shell">
      <div id="main_page1" className={`page-shell__sidebar ${hasPage2Id ? "page-shell__sidebar--mobile-hidden" : ""}`}>
        {element}
      </div>

      <div id="main_page2" className={`page-shell__content ${!hasPage2Id ? "page-shell__content--empty" : ""}`}>
        {!hasPage2Id ? (
          <div className="page-empty-state">
            <span className="placeholder-chip">Ready to chat</span>
            <h2>Select a conversation</h2>
            <p>Choose a chat from the left panel to open the thread, or search for someone new to start talking.</p>
          </div>
        ) : null}
        <Outlet />
      </div>
    </div>
  </>
};

export default Upage;
