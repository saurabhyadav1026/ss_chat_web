
import LeftMenu from "../left_nav/LeftMenu";


 const FullPage= ({element}:any) => {
 
  
  return (
    <div className="chat-shell">
      <LeftMenu />
      {element}
     
    </div>
  );
}

export default FullPage;
