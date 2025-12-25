

//import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import {  useState } from 'react';
import ChatPageSection from './ChatPageSection'
import ProfileSection from './components/userProfile/ProfileSection'
import { IKContext } from 'imagekitio-react';
import {getMediaAuthinticator} from './components/userProfile/users'


export const App= () => { 

const [page,setPage]=useState('ChatPageSection');


return <>
<IKContext  publicKey={import.meta.env.VITE_MEDIA_PUBLIC_KEY} 
            urlEndpoint={import.meta.env.VITE_MEDIA_ENDPOINTURL}
            authenticator={getMediaAuthinticator}
>
    <div id="main_content" className='container-fluid' >
{page==='ProfileSection'&&<ProfileSection  setPage={setPage}/>}
{page==='ChatPageSection'&& <ChatPageSection    setPage={setPage}/>}


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