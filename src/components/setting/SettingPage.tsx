import LeftMenu from "../left_nav/LeftMenu";
import Page1 from "../pages/Upage"
import SettingPage1 from "./page1/SettingPage1";


const FunPage=()=>{

return<>
 <div className="chat-shell">
         <LeftMenu />
    <Page1 element={<SettingPage1/>}/>
    </div>

</>

}

export default FunPage;
