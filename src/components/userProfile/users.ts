

/* 

ai chat :     sbhai1:{nae:"",res:[....],req:[....]}
friend chat:   usn:[{t:"",by:1|2,text:" "}]




*/


import axios from 'axios'
import getRes from '../../getRes';





const responser:string=import.meta.env.VITE_API_KEY+'/users'||'https://sbhai.onrender.com';
export const addUser=async(u:any)=>{

    const user:any={
    username:u.username,
    name:u.name,
    userpassword:u.userpassword,
    contact:u.email,
    chats:{},  
    unread:{},
    isReloade:false  
}

user.chats[u.username]=[{time:"11",by:1,text:"Hello!  "+u.username,status:3 }]
user.unread[u.username]=0;

try{
await axios.post(responser+'/newuser',user);
  }
    catch(error){
    }
}


const sbhunk:any={
    username:'sbhunk',
    name:'Log In',
      chats:{}   


}


export const checkIsUsernameAvailble=async(username:string)=>{
let res
    try{res=await fetch(responser+'/checkisusernameavailble?username='+username);
    res=await res.json();
    res=res.value;}catch{}
    return res;
}



export const newChat=async(activeuser:string,activechat:string)=>{
if(activeuser.includes('sbhunk')){
    sbhunk.chats.activechat={name:'unknown'+activechat[5],reqs:[],ress:[]}
}
    else try{
      await fetch(responser+'/newchat?activeuser='+activeuser+'&&activechat='+activechat)
    }catch{}
    
    
    }

export const getlogUser:any=async (username:string)=>{
    
let us:any= await fetch(responser+'/getloguser?username='+username)
us=await us.json();
return us.value;
}
export const getUser=async(username:string)=>{
    let us:any=await fetch(responser+'/getuser?username='+username)
us=await us.json();
return us.value;
}


export const verifyUser=async(username:any,userpassword:any)=>{
    let rr=false;
    try  {let res:any=await fetch(responser+'/verifyuser?username='+username+'&&userpassword='+userpassword)
        res=await res.json();
        rr=res.value;
    }catch(e){}
return rr;

}


export const reloaded=async(username:string)=>{
  try{  await fetch(responser+'/reloaded?username='+username)

}catch{}

}

export const getChatList=async(u:any)=>{
    //return [{username:'ss',name:'sbh singh.',unread:3}]
let chat_list:any=[]
if(u.includes('sbhunk')){
    
    Object.keys(sbhunk.chats).forEach((x)=>{
chat_list.push({username:x,name:sbhunk.chats[x]['name']})
    })
}else try{
let res:any=await fetch(responser+'/getchatslist?activeuser='+u)
 res= await res.json();
 chat_list=res.value}catch{ }
return chat_list;
}

export const getName=async(user:string)=>{
    if(user.includes('sbhunk'))return 'Log In';
    let name;
     try{ let res:any=await fetch(responser+'/getname?username='+user)
   
     res= await res.json()
       name=res.value}
       catch{}
       return name||'Loading...';
}


export const getIsReloade=async(username:string)=>{
    if(username==='sbhunk')return false;
    let is_reloade={value:false}
   try {const res=await fetch(responser+'/getisreloade?username='+username)
        is_reloade= await res.json()
    }catch{}
    return is_reloade.value;
}



export const getChat=async(activeuser:string,activechat:string)=>{
    let chat;  
    if(activechat===null)return [];
    if(activeuser==='sbhunk'){
chat=[];

        if(sbhunk.chats.activechat){
            sbhunk.chats.activechat.reqs.forEach((r:any,i:any)=>{
            let rr=sbhunk.chats.activechat.ress[i]
            chat.push({by:1,text:r},{by:2,text:rr})
         
        })}
    }
else{
    try{
     const res=await fetch(responser+'/getchat?activeuser='+activeuser+'&&activechat='+activechat)
     chat= await res.json();
     chat=chat.value
   }catch{}
 } 
 
 return chat||[{by:1,text:'Loading your chat.....'}];

}


export const sendToAI=async(activeuser:string,activechat:string,req:string)=>{

    if(activeuser.includes('sbhunk')){
        sbhunk.chats.activechat.reqs.push(req)
        sbhunk.chats.activechat.ress.push(await getRes(req))
    }
else try    {
    await fetch(responser+'/sendtoai?activeuser='+activeuser+'&&activechat='+activechat+'&&req='+req)

}catch(e){}
}




export const sendToF=async(activeuser:string,activechat:string,text:string)=>{
     try{ await fetch(responser+'/sendtofriend?activeuser='+activeuser+'&&activechat='+activechat+'&&text='+text)
 }catch{}
}



export const getSearchList=async(activeuser:string,input:string)=>{
let list=[];

// for if user not loggin(only ai chat)
if(activeuser==='sbhunk'){
    Object.keys(sbhunk.chats).forEach(u=>{
        if(sbhunk.chats.u.name.includes(input))list.push({username:u,name:sbhunk.chats.u.name})
    })
}
else{   // first show chat result
const temp_chat=await getChatList(activeuser);

 temp_chat.forEach((x:any)=>{
    if(x.username.includes(input)||x.name.includes(input))list.push(x);
 })

 // then for global search
const res=await fetch(responser+'/getsearchlist?input='+input);
    let  temp_chat2=await res.json()
    temp_chat2=temp_chat2.value;
    let n=0;
  for(let i=0;i<temp_chat2.length;i++){
    let t=temp_chat2[i]['username'];
    if(t.includes(input)){list.push(temp_chat2[i]);
        n++;
        if(n===5)break;
    }
  }

}

    return list||[{username:null,name:"wait Searching...."}]
}


export const getOtp=async (mail:string)=>{
    let otp={status:'not_get'};
   try{ const res= await fetch(responser+'/getotp?email='+mail);
     otp=await res.json();}catch{}
    return otp;    
}