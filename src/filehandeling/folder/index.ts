import { getRootFolder } from "..";



 const rootFolder=await getRootFolder();
export const chatFolder=await rootFolder.createFolder("chats");

