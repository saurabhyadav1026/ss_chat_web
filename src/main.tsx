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
import { GoogleOAuthProvider } from '@react-oauth/google'
import {MessageContextProvider} from './contexts/MessagesContext'
import { ChatsListContextProvider } from './contexts/ChatsListContext'
import { UserContextProvider } from './contexts/UserContext'




const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <UserContextProvider>
      <ChatsListContextProvider>
        <MessageContextProvider>
          <SocketContextProvider>
            <AIChatContextProvider value>
              <ChatContextProvider>

                <SpeakerProvider>

                  <ListenerProvider>

                    <GoogleOAuthProvider clientId={import.meta.env.VITE_GoogeOAuthClientId}>
                      <App />
                    </GoogleOAuthProvider>
                  </ListenerProvider>
                </SpeakerProvider>

              </ChatContextProvider>
            </AIChatContextProvider>
          </SocketContextProvider>
        </MessageContextProvider>
      </ChatsListContextProvider>
    </UserContextProvider>
  </StrictMode>
)


