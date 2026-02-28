

//import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import {  useContext, useEffect, useState } from 'react';
import ChatPageSection from './ChatPageSection'
import ProfileSection from './components/userProfile/ProfileSection'
import { IKContext } from 'imagekitio-react';
import {getMediaAuthinticator} from './components/userProfile/users'
import PicShow from './components/userProfile/PicShow';
import ChatContext from './contexts/chatscontext/ChatContext';

import DemoAICatPageSection from './components/pages/demoAI/DemoAICatPageSection';


import UserProfile from './components/userProfile/UserProfile';


export const App= () => { 

const [page,setPage]=useState('ProfileSection');
const {activeUser}:any =useContext(ChatContext);

useEffect(()=>{
if(activeUser._id){

    // verify token in backend then set
setPage('ChatPageSection');
}
},[]);

return <>
<IKContext  publicKey={import.meta.env.VITE_MEDIA_PUBLIC_KEY} 
            urlEndpoint={import.meta.env.VITE_MEDIA_ENDPOINTURL}
            authenticator={getMediaAuthinticator}
>
    <div id="main_content" className='m-0 p-0  d-flex container-fluid' >
{page==='ProfileSection'&&<ProfileSection  setPage={setPage}/>}
{page==='ChatPageSection'&& <ChatPageSection    setPage={setPage}/>}
{page==='demoAICatPageSection'&&<DemoAICatPageSection/>}

<PicShow/>
<UserProfile/>

</div>

</IKContext>
   
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