
import { createContext, useContext, useEffect,useMemo,useState } from 'react';
import api from '../api/api';
import UserContext from './UserContext';
import queryClient from '@/lib/queryClient';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { socket } from './socketcontext/SocketContext';
import { toast } from 'react-toastify';

const ChatsListContext = createContext({});



const fetchActiveChat=async(roomId:any)=>{
 
  return await api.get("users/getroombyroomid", { params: { _id: roomId ,socketId:socket.id} })
      .then((res) =>{ 
        if(res.data.status) return res.data.room
        else {
      
          return null;
        }
      }
      )
      .catch((err) =>{console.log(err);
      
          return null;
      })
}



    const fetchChatsList = async (page: number) => {
        return await api.get("/users/getchatslist?page=" + page)
            .then(res => { return res.data })
            .catch(() => [])
    }
    const fetchAiChatsList = async () => {
        return await api.get("/ai/textassistance/rooms")
            .then(res => res.data)
            .catch(() => [])
    }



export const ChatsListContextProvider = ({ children }: any) => {





    const { activeUser, isInternetConnection }: any = useContext(UserContext);

const [activeFriendChatRoomId, setActiveFriendChatRoomId]=useState<string|undefined>(undefined)






/* const {data:activeChat,...activeChatProperties}:any =useQuery({
  queryKey:["activeChat",activeFriendChatRoomId],
  queryFn:()=>fetchActiveChat(activeFriendChatRoomId),
  enabled:!!activeFriendChatRoomId

})
 */
/* 
useEffect(()=>{

if(activeFriendChatRoomId && activeFriendChatRoomId!=="")queryClient.invalidateQueries({queryKey:["activeChat",activeFriendChatRoomId]})

},[activeFriendChatRoomId])


  useEffect(() => {
   if(isInternetConnection && activeChat && activeChat._id?.slice(0,3)!=="new") queryClient.invalidateQueries({ queryKey: ["messages",activeChat._id] })
  }, [activeChat])

 */


    const { data: chatsList,
        fetchNextPage: fetchNextChatPage,
        hasNextPage: hasNextChatPage,
        isFetchingNextPage: isChatListLoading, }: any = useInfiniteQuery({
            queryKey: ["chatsList"],
            queryFn: ({ pageParam }) => fetchChatsList(pageParam),
            initialPageParam: 1,
            getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage + 1 : undefined
        })



const activeChat=useMemo(()=>{
if(!activeFriendChatRoomId || !chatsList)return null;
 for (const page of chatsList.pages) {
    if (page.rooms[activeFriendChatRoomId]) {
      return page.rooms[activeFriendChatRoomId];
    }
  }
  return null;
},[activeUser,activeFriendChatRoomId , chatsList])




  useEffect(() => {
   if(isInternetConnection && activeChat && activeChat._id?.slice(0,3)!=="new") queryClient.invalidateQueries({ queryKey: ["messages",activeChat._id] })
  }, [activeChat])



    const refreshFriendsChatsList = async() => {
        if (isInternetConnection) { await queryClient.invalidateQueries({ queryKey: ["chatsList"] })
       
        }
    }

    const { data: aiChatsList}: any = useQuery({  queryKey: ["aiChatsList"], queryFn:fetchAiChatsList})


    const refreshAIchatList = () => {
        if (isInternetConnection) queryClient.invalidateQueries({ queryKey: ["chatsList"] })
    }



    const addRoom = (oldData: any, room: any) => {
        if (!oldData) return oldData;

        return {
            ...oldData,
            pages: oldData.pages.map((page: any, index: number) => {
                if (index != 0) return page;
                return {
                    roomsIdList: [room._id, ...page.roomsIdList],
                    rooms: { ...page.rooms, room }
                }
            })
        }
    }

    const updateRoom = (oldData: any, room: any) => {
        if (!oldData) return oldData;

        let isfirst = false;
        const pages = oldData.pages.map((page: any, index: number) => {


            if (index == 0) {

                if (page.rooms[room._id]) {
                    isfirst = true;
                return {
                    roomsIdList: [room._id, ...page.roomsIdList.filter((id: string) => id !== room._id)],
                    rooms: { ...page.rooms, [room._id]: room }

                }
                }
            
                return {
                    roomsIdList: [room._id, ...page.roomsIdList],
                    rooms: { ...page.rooms, [room._id]: room }

                }
            }


            if (!isfirst && !page.rooms[room._id]) return page;
            const { [room._id]: _, ...restRoom } = page.rooms;
            return {
                roomsIdList: page.roomsIdList.filter((id: string) => id !== room._id),
                rooms: restRoom
            }
        })
       
        return {
            ...oldData,
            pages
        }

    }



    const updateChatRoom = async (room: any) => {

        await queryClient.setQueryData(["chatsList"], (oldData: any) => updateRoom(oldData, room));
    }



const updateReceiverStatus=async(roomId:string,isUserActive:boolean)=>{
  await queryClient.setQueryData(["chatsList"], (oldData: any) => {
    if(!oldData)return oldData;

         const pages = oldData.pages.map((page: any, index: number) => {

           if(! page.rooms[roomId])return page;
           
           return {...page ,rooms:{...page.rooms,[roomId]:{...page.rooms[roomId],receiver:{...page.rooms[roomId].receiver,isUserActive}}}}
         })



          return {
            ...oldData,
            pages
        }

  });   
}



    useEffect(() => {
        refreshFriendsChatsList();
        refreshAIchatList();
    }, [activeUser])


  useEffect(() => {
        refreshFriendsChatsList();
        refreshAIchatList();
    }, [])


   
  useEffect(() => {
    const receive = (data:any) => {   
       
            const { room ,message} = data;    
             updateChatRoom(room);          
          if(!activeChat || activeChat._id !==room._id ) {
            toast.info(room.receiver.name +": "+ message.text)
            
          }
          
    }

      socket.on("u/chats/receiveMsgNotify", receive)
    return () => {
      socket.off("u/chats/receiveMsgNotify",receive);
    };
  },[activeChat]);
 



  useEffect(()=>{

    const setOnline=async(data:any)=>{
        
await updateReceiverStatus(data.roomId,true)



    }
    socket.on("u/chats/setRoomReceiverActive",setOnline);
      return ()=>{socket.off("u/chats/setRoomReceiverActive",setOnline)}

  },[])

    useEffect(()=>{

    const setOffline=async(data:any)=>{
     
await updateReceiverStatus(data.roomId,false);

    }
    socket.on("u/chats/setRoomReceiverInActive",setOffline)
    return ()=>{socket.off("u/chats/setRoomReceiverInActive",setOffline)}

  },[])






    // to set the chatlist   yani chatroom  by getfriendList or getchatList

    return < ChatsListContext.Provider value={{ chatsList, updateChatRoom, updateReceiverStatus,aiChatsList,activeChat ,refreshFriendsChatsList, refreshAIchatList,setActiveFriendChatRoomId}}>{children}</ChatsListContext.Provider>
}

export default ChatsListContext;
