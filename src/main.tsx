import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

import { ListenerProvider } from './voiceassistance/listener/ListenerContext'
import { SpeakerProvider } from './voiceassistance/speaker/SpeakerContext';
import { ChatContextProvider } from './contexts/chatscontext/ChatContext'

import { SocketContextProvider } from './contexts/socketcontext/SocketContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import AIChatContextProvider from './contexts/chatscontext/AIChatContext'


const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
  
      <SocketContextProvider>
<AIChatContextProvider value> 
        <ChatContextProvider>

          <SpeakerProvider>

            <ListenerProvider>
      <App />
         
            </ListenerProvider>
          </SpeakerProvider>

        </ChatContextProvider>
        </AIChatContextProvider>
      </SocketContextProvider>
    
  </StrictMode>
)


