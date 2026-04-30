import './api/resInterceptor'
import './api/reqInterceptor'
import ProfileSection from './components/userProfile/ProfileSection'

import PicShow from './components/userProfile/PicShow';


import UserProfile from './components/userProfile/UserProfile';
import { Route, Routes } from 'react-router-dom';
import Loggin from './components/userProfile/Loggin';
import Register from './components/userProfile/Register';
import Profile from './components/userProfile/Profile';
import ChatPage from './components/ChatPage';
import ChatsList from './components/pages/page1/ChatsList';
import SearchList from './components/pages/page1/SearchList';
import Home from './components/pages/Home';
import AiChatpage from './components/pages/page2/AiChatPage';
import AiChatsList from './components/pages/page1/AiChatsList';
import ForgetPassword from './components/userProfile/ForgetPasswot';
import ResetPassword from './components/userProfile/ResetPassword';
import FunChatPage2 from './components/funchat/FunChatPage2';
import SettingPage1 from './components/setting/page1/SettingPage1';
import Mpage from './components/pages/Mpage';
import Opage from './components/pages/Opage';
import FunChatPage1 from './components/funchat/FunChatPage1';
import Upage from './components/pages/Upage';
export const App = () => {
  return <>
    <Routes>

      <Route path="/" element={<Home />} />


      <Route path='/resetpassword/:token' element={<ResetPassword />} />


      <Route path="/user" element={<ProfileSection />}>
        <Route path='login' element={<Loggin />} />
        <Route path='register' element={<Register />} />
        <Route path='forgetpassword' element={<ForgetPassword />} />
      </Route>

      
      <Route path="/u" element={<Mpage  />} >
        <Route path='myprofile' element={<Upage element={<Profile />} />} />
        <Route path='profile/:username' element={<Upage element={<UserProfile />} />}></Route>


        <Route path="chats" element={<Upage element={<ChatsList />} />}>
          <Route path=':page2Id' element={<ChatPage />} />

        </Route>

{/* AI route */}

        <Route path="aichats" element={<Upage element={<AiChatsList />} />}>
          <Route path=':page2Id' element={<AiChatpage />} />
        </Route>

        {/* search route */}
        <Route path='search' element={<Upage element={<SearchList />} />}>
          <Route path=':page2Id' element={<UserProfile />} />
        </Route>

        {/* setting route */}
        <Route path="setting" element={<Upage element={<SettingPage1 />} />}>
         <Route path=':page2Id' element={<ChatPage />} />

        </Route>

        <Route />
      </Route>

<Route path='/o' element={<Mpage />}>
  <Route  path='funchats' element={<Opage   element={<FunChatPage1/>} />} >
    <Route  path=":page2Id" element={<FunChatPage2/>}  />

  </Route>

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
