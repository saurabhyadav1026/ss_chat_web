

//import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import { useEffect,  useState } from 'react';
import ChatPageSection from './ChatPageSection'
import ProfileSection from './components/userProfile/ProfileSection'


export const App= () => { 

const [page,setPage]=useState('ChatPageSection');

const luser=localStorage.getItem('activeUser')||'sbhunk'

const [activeUser,setActiveUser]=useState(luser);
 

useEffect(()=>{

localStorage.setItem('activeUser',activeUser)
},[activeUser])



return <>

    <div id="main_content" >
{page==='ProfileSection'&&<ProfileSection activeUser={activeUser} setActiveUser={setActiveUser} setPage={setPage}/>}
{page==='ChatPageSection'&& <ChatPageSection   activeUser={activeUser} setPage={setPage}/>}


</div>
   
</>

}
export default App;



/* 
<Router>

<Routes>

<Route path='/'>{<AIChatPage/>}</Route>
<Route path='/loggin'>{<Loggin/>}</Route>

</Routes>

</Router> 
 */