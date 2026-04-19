import { Outlet, useParams } from "react-router-dom";

const Page1 = ({ element }: any) => {
   
  const { page2Id }: any = useParams();
  const hasPage2Id = Boolean(page2Id);


  return <>   
  
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

export default Page1;
