import './api/resInterceptor'
import './api/reqInterceptor'
//import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import ChatPageSection from './ChatPageSection'
import ProfileSection from './components/userProfile/ProfileSection'

import PicShow from './components/userProfile/PicShow';


import UserProfile from './components/userProfile/UserProfile';
// import { Route, Routes, useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Loggin from './components/userProfile/Loggin';
import Register from './components/userProfile/Register';
import Profile from './components/userProfile/Profile';
import ChatPage from './components/ChatPage';
import ChatsList from './components/pages/page1/ChatsList';
import SearchList from './components/pages/page1/SearchList';
import Home from './components/pages/Home';
import Page1 from './components/pages/Page1';
// import AIChatList from './components/left_nav/chatbar/AIChatList';
import AiChatpage from './components/pages/page2/AiChatPage';
import AiChatsList from './components/pages/page1/AiChatsList';
import ForgetPassword from './components/userProfile/ForgetPasswot';
import ResetPassword from './components/userProfile/ResetPassword';

export const App = () => {
  return <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/resetpassword/:token' element={<ResetPassword/>}/>
      <Route path="/user" element={<ProfileSection />}>
        <Route path='login' element={<Loggin />} />
        <Route path='register' element={<Register />} />
        <Route path='myprofile' element={<Profile />} />
        <Route path='profile/:id' element={<UserProfile/>}></Route>
        <Route path='forgetpassword' element={<ForgetPassword/>}/>
      </Route>
      <Route path="/u" element={<ChatPageSection />} >
        <Route path="chats" element={<Page1 element={<ChatsList/>}/> }>
          <Route path=':page2Id' element={<ChatPage />} />
        </Route>
        <Route path="aichats" element={<Page1 element={<AiChatsList/>}/> }>
          <Route path=':page2Id' element={<AiChatpage />} />
        </Route>
        <Route path='search' element={<Page1 element={<SearchList/>}/> }>
          <Route path=':page2Id' element={<UserProfile/>}/>
        </Route>

        <Route/>
      </Route>
    </Routes>

    <PicShow />
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
