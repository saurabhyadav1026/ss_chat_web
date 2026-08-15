
import { createContext, useContext, useEffect } from 'react';
import api from '../api/api';
import UserContext from './UserContext';
import queryClient from '@/lib/queryClient';
import { useInfiniteQuery } from '@tanstack/react-query';

const ChatsListContext = createContext({});

export const ChatsListContextProvider = ({ children }: any) => {





    const { activeUser, isInternetConnection }: any = useContext(UserContext);










    const fetchChatsList = async (page: number) => {
        return await api.get("/users/getchatslist?page=" + page)
            .then(res => { return res.data })
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
            getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage + 1 : undefined
        })

    const updateChatsList = async() => {
        if (isInternetConnection) { await queryClient.invalidateQueries({ queryKey: ["chatsList"] })
        alert("We updting chats list")
        }
    }

    const { data: aiChatsList,
        fetchNextPage: fetchNextAiChatPage,
        hasNextPage: hasNextAiChatPage,
        isFetchingNextPage: isAiChatListLoading }: any = useInfiniteQuery({
            queryKey: ["aiChatsList"],
            queryFn: ({ pageParam }) => fetchAiChatsList(pageParam),
            initialPageParam: 1,
            getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage + 1 : undefined
        })

    const updateAiChatsList = () => {
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




    useEffect(() => {
        updateChatsList();
        updateAiChatsList();
    }, [activeUser])


  useEffect(() => {
        updateChatsList();
        updateAiChatsList();
    }, [])



    // to set the chatlist   yani chatroom  by getfriendList or getchatList

    return < ChatsListContext.Provider value={{ chatsList, updateChatRoom, aiChatsList, }}>{children}</ChatsListContext.Provider>
}

export default ChatsListContext;
