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
import { ChatsListContextProvider } from './contexts/ChatsListContext'
import { UserContextProvider } from './contexts/UserContext'
import { IKContext } from 'imagekitio-react';
import {getMediaAuthinticator} from './components/userProfile/users';
import {BrowserRouter} from 'react-router-dom';
import { CallContextProvider } from './contexts/CallContext';
import queryClient from './lib/queryClient'
import persistOptions from './lib/persistOptions'
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
   {/*  <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}> */}
       <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <IKContext  publicKey={import.meta.env.VITE_MEDIA_PUBLIC_KEY} 
            urlEndpoint={import.meta.env.VITE_MEDIA_ENDPOINTURL}
            authenticator={getMediaAuthinticator}
>
  <CallContextProvider>
    <UserContextProvider>
      <ChatsListContextProvider>
      
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
        
      </ChatsListContextProvider>
    </UserContextProvider>
    </CallContextProvider>
    </IKContext>
    </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    {/* </PersistQueryClientProvider> */}
  </StrictMode>
)


