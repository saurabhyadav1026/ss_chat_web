import { useContext, useEffect, useState } from "react";
import { AboutIcon } from "../../icons";
import ChatContext from "../../../contexts/chatscontext/AppVariablesContext";
import SearchBar from "../../left_nav/SearchBar";







const SettingPage1 = () => {
const [searchInput,setSearchInput]:any=useState("");
 // const navigate = useNavigate();

// for theme 
 const { theme, toggleTheme }: any = useContext(ChatContext);
  const nextTheme = theme === "dark" ? "Light" : "Dark";



/* 
useEffect(()=>{
setChatItems(roomsList)
},[roomsList])

useEffect(()=>{
if(searchInput!==""){
  const rooms:any=[]
Object.values(roomsList || {}).forEach((room:any)=>{
if(room.name.contains(searchInput))rooms.push(room);
})
setChatItems(rooms)
}else {
  setChatItems(Object.values(roomsList || {}));

}

},[searchInput])
 */


  useEffect(()=>{

//socket.connect();


  })




  return <>
    <div className="list-panel">
      <div className="list-panel__header">
        <div>
 
          <h2 className="list-panel__title">Setting</h2>
         
        </div>
      </div>

     <SearchBar searchInput={searchInput} _placeholder="Search chats..." setSearchInput={setSearchInput} />
     

      <div className="list-panel__body scrollbar-only-rod">
        
        {/*  option 1 */}
            <article className="list-card"   onClick={toggleTheme} aria-label={`Switch to ${nextTheme} mode`} title={`Switch to ${nextTheme} mode`}             >
               <div className="list-card__title-row" >
                  <span className="list-card__title"> Change Theme  into      {nextTheme}</span>
                </div>
            </article>




{/* option 2 */}

   <article className="list-card"         >
               <div className="list-card__title-row" >
                  <span className="list-card__title">  <AboutIcon/>  About</span>
                </div>
            </article>


      </div>
    </div>
 </>
};

export default SettingPage1;
