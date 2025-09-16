

//import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import { useEffect,  useState } from 'react';
import ChatPageSection from './ChatPageSection'
import ProfileSection from './components/userProfile/ProfileSection'
import { IKContext } from 'imagekitio-react';
import {getMediaAuthinticator} from './components/userProfile/users'


export const App= () => { 

const [page,setPage]=useState('ChatPageSection');

let luser:any={username:'sbhunk',name:"Loggin here",dp:"",loggin_token:""}

if(localStorage.getItem('ssapp_activeUser')){
    luser=localStorage.getItem('ssapp_activeUser');
    luser=JSON.parse(luser);
}


const [activeUser,setActiveUser]=useState(luser);
 

useEffect(()=>{

localStorage.setItem('ssapp_activeUser',JSON.stringify(activeUser))
},[activeUser])



return <>
<IKContext  publicKey={import.meta.env.VITE_MEDIA_PUBLIC_KEY} 
            urlEndpoint={import.meta.env.VITE_MEDIA_ENDPOINTURL}
            authenticator={getMediaAuthinticator}
>
    <div id="main_content" >
{page==='ProfileSection'&&<ProfileSection activeUser={activeUser} setActiveUser={setActiveUser} setPage={setPage}/>}
{page==='ChatPageSection'&& <ChatPageSection   activeUser={activeUser} setPage={setPage}/>}


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