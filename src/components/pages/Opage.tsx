import { Outlet,  useParams } from "react-router-dom"




const Opage=({element}:any)=>{

 const { page2Id }: any = useParams();
  const hasPage2Id = Boolean(page2Id); 
//const navigate=useNavigate();


return<>

   
  
    <div className="page-shell">
      <div id="main_page1" className={`page-shell__sidebar ${hasPage2Id ? "page-shell__sidebar--mobile-hidden" : ""}`}>
        {element}
      </div>

      <div id="main_page2" className={`page-shell__content ${!hasPage2Id ? "page-shell__content--empty" : ""}`}>
        {!hasPage2Id ? (
          <div className="page-empty-state">
            <span className="placeholder-chip">Ready to chat</span>
            <h2>Select a conversation</h2>
           
          </div>
        ) : null}
        <Outlet />
      </div>
    </div>
    </>

}

export default Opage;
