import { chatFolder } from "..";


const friendChatFolder=await chatFolder.createFolder("friend-chats");


export const getFriendChatFile=async(roomId:string)=>{
  
return await friendChatFolder.getJsonObjectFile(roomId)
}


const AiChatFolder=await chatFolder.createFolder("friend-chats");


export const getAIChatFile=async(roomId:string)=>{
return await AiChatFolder.getJsonObjectFile(roomId)
}