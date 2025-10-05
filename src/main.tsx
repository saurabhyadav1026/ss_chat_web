import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

import {ListenerProvider} from './voiceassistance/listener/ListenerContext'
import {SpeakerProvider} from './voiceassistance/speaker/SpeakerContext';
import {ChatContextProvider} from './usercontext/chatscontext/ChatContext'



const root=createRoot(document.getElementById('root')!);
root.render(
  <StrictMode><ChatContextProvider>
    
   <SpeakerProvider>

  <ListenerProvider>
    <App/>
  </ListenerProvider>    
   </SpeakerProvider>
   
  </ChatContextProvider>
  </StrictMode>,
)


