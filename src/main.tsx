import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

import { ListenerProvider } from './voiceassistance/listener/ListenerContext'
import { SpeakerProvider } from './voiceassistance/speaker/SpeakerContext';
import { ChatContextProvider } from './contexts/chatscontext/AppVariablesContext'

import { SocketContextProvider } from './contexts/socketcontext/SocketContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import {MessageContextProvider} from './contexts/MessagesContext'
import { ChatsListContextProvider } from './contexts/ChatsListContext'
import { UserContextProvider } from './contexts/UserContext'
import { IKContext } from 'imagekitio-react';
import {getMediaAuthinticator} from './components/userProfile/users';
import {BrowserRouter} from 'react-router-dom';

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <BrowserRouter>
    <IKContext  publicKey={import.meta.env.VITE_MEDIA_PUBLIC_KEY} 
            urlEndpoint={import.meta.env.VITE_MEDIA_ENDPOINTURL}
            authenticator={getMediaAuthinticator}
>
    <UserContextProvider>
      <ChatsListContextProvider>
        <MessageContextProvider>
          <SocketContextProvider>
            
              <ChatContextProvider>

                <SpeakerProvider>

                  <ListenerProvider>

                    <GoogleOAuthProvider clientId={import.meta.env.VITE_GoogeOAuthClientId}>
                      <App />
                    </GoogleOAuthProvider>
                  </ListenerProvider>
                </SpeakerProvider>

              </ChatContextProvider>
       
          </SocketContextProvider>
        </MessageContextProvider>
      </ChatsListContextProvider>
    </UserContextProvider>
    </IKContext>
    </BrowserRouter>
  </StrictMode>
)


