import LeftMenu from "../left_nav/LeftMenu";
import Page1 from "../pages/Page1"
import FunChatPage1 from "./FunChatPage1"



const FunPage=()=>{


return<>
 <div className="chat-shell">
         <LeftMenu />
    <Page1 element={<FunChatPage1/>}/>
    </div>

</>

}

export default FunPage;