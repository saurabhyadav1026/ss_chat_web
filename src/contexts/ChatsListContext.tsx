
import { createContext, useContext, useEffect } from 'react';
import api from '../api/api';
import UserContext from './UserContext';
import queryClient from '@/lib/queryClient';
import { useInfiniteQuery } from '@tanstack/react-query';

const ChatsListContext = createContext({});

export const ChatsListContextProvider = ({ children }: any) => {





    const { activeUser ,isInternetConnection}: any = useContext(UserContext);










    const fetchChatsList = async (page: number) => {
        return await api.get("/users/getchatslist?page=" + page)
            .then(res => {return res.data})
            .catch(() => [])
    }
    const fetchAiChatsList = async (page: number) => {
        return await api.get("/ai/textassistance/rooms?page=" + page)
            .then(res => res.data)
            .catch(() => [])
    }


    const { data: chatsList,
        fetchNextPage: fetchNextChatPage,
        hasNextPage: hasNextChatPage,
        isFetchingNextPage: isChatListLoading, }: any = useInfiniteQuery({
            queryKey: ["chatsList"],
            queryFn: ({ pageParam }) => fetchChatsList(pageParam),
            initialPageParam: 1,
            getNextPageParam: (lastPage) => lastPage.hasMore?lastPage.nextPage+1:undefined
        })

    const updateChatsList = () => {
       if(isInternetConnection) queryClient.invalidateQueries({ queryKey: ["chatsList"] })
    }

    const { data: aiChatsList,
        fetchNextPage: fetchNextAiChatPage,
        hasNextPage: hasNextAiChatPage,
        isFetchingNextPage: isAiChatListLoading, }: any = useInfiniteQuery({
            queryKey: ["aiChatsList"],
            queryFn: ({ pageParam }) => fetchAiChatsList(pageParam),
            initialPageParam: 1,
            getNextPageParam: (lastPage) =>lastPage.hasMore?lastPage.nextPage+1:undefined
        })

    const updateAiChatsList = () => {
        if(isInternetConnection) queryClient.invalidateQueries({ queryKey: ["chatsList"] })
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

        
           const pages= oldData.pages.map((page: any) => {
                if (!page.rooms[room._id]) return page;
                const {[room._id]:_ ,...restRoom}=page.rooms;
                return {
                    roomsIdList:page.roomsIdList.filter((id:string)=>id!==room._id),
                    rooms:  restRoom 
                }
            })
pages[0]={
    roomsIdList:[room._id , ...pages[0].roomsIdList],
    rooms:{...pages[0].rooms , [room._id]:room}

}
            return {
               ...oldData,
               pages
            }
        
    }



    const updateChatRoom=async(room:any)=>{

    await     queryClient.setQueryData(["chatsList"],(oldData:any)=>updateRoom(oldData,room));
    }




    useEffect(() => {
        updateChatsList();
        updateAiChatsList();
    }, [activeUser])

   

  

    // to set the chatlist   yani chatroom  by getfriendList or getchatList

    return < ChatsListContext.Provider value={{ chatsList, updateChatRoom, aiChatsList,  }}>{children}</ChatsListContext.Provider>
}

export default ChatsListContext;
