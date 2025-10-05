

/* 

ai chat :     sbhai1:{nae:"",res:[....],req:[....]}
friend chat:   usn:[{t:"",by:1|2,text:" "}]




*/

import { GoogleGenerativeAI } from '@google/generative-ai';
//import axios from 'axios'
import getRes from '../../getRes';
import axios from 'axios';




let isreloade_sbhunk:boolean=false;
const responser:string=import.meta.env.VITE_API_KEY+'/users';
export const addUser=async(u:any)=>{
try{
await fetch(responser+'/newuser?name='+u.name+"&&username="+u.username+"&&password="+u.userpassword);
 
}
    catch(error){
    console.log("eror  "+error)
    }
}


const sbhunk:any={
    username:'sbhunk',
    name:'Log In',
      chats:{
        sbhai0:{name:'unknown1',reqs:[],ress:[]}
      }  


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
    console.log("new chat for sbhunk")
    console.log(sbhunk.chats)
    sbhunk.chats[activechat]={name:'unknown'+activechat[5],reqs:[],ress:[]}
    isreloade_sbhunk=true
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


export const verifyUser=async(username:any,password:any)=>{
    let rr=false;
    try  {let res:any=await fetch(responser+'/verifyuser?username='+username+'&&password='+password)
        rr=await res.json();
      
    }catch(e:any){console.log(e)}
return rr;

}

 
export const reloaded=async(username:string)=>{
    
  try{  await fetch(responser+'/reloaded?username='+username)

}catch(e:any){console.log(e)}

}





export const getIsReloade=async(username:string)=>{
    if(username==='sbhunk'||!username){
       
       if( isreloade_sbhunk  ) {
         console.log("isreloade sbhunk  "+isreloade_sbhunk)
        isreloade_sbhunk=false;
        return true;}
        else return false;
    }
    let is_reloade={value:false}
   try {const res=await axios.get(responser+'/getisreloade?username='+username,{timeout:1000});
       is_reloade= res.data;
    }catch(e){}
    return is_reloade.value;
}



export const getChat=async(activeuser:string,activechat:string)=>{
    console.log("get chat called")
    if( activechat===null) return [];
    let chat:any=[];  
    console.log("get chat called for "+activechat)
    if(activeuser==='sbhunk'){
        if(sbhunk.chats[activechat]){
            sbhunk.chats[activechat].reqs.forEach((r:any,i:any)=>{
            let rr=sbhunk.chats[activechat].ress[i]
            chat.push({by:1,text:r},{by:2,text:rr})
         
        })}
        console.log(chat);
    }
else{
    try{
     const res=await fetch(responser+'/getchat?activeuser='+activeuser+'&&activechat='+activechat)
     chat= await res.json();
     chat=chat.value
   }catch{}
 } 
 
 return chat;

}


export const sendToAI=async(activeuser:string,activechat:string,req:string)=>{
console.log("send to ai called")
    if(activeuser.includes('sbhunk')){
        sbhunk.chats[activechat].reqs.push(req);
          
        sbhunk.chats[activechat].ress.push(await getRes(req))
        isreloade_sbhunk=true;
        return;
    }
else try    {
  await fetch(responser+'/sendtoai?activeuser='+activeuser+'&&activechat='+activechat+'&&req='+req)
}catch(e){console.log(e)}
console.log("send to ai end")
}




export const sendToF=async(activeuser:string,activechat:string,text:string)=>{
     try{ await fetch(responser+'/sendtofriend?activeuser='+activeuser+'&&activechat='+activechat+'&&text='+text)
 }catch{}
}



export const getSearchList=async(activeuser:string,input:string)=>{
  
let list:any=[];

// for if user not loggin(only ai chat)
if(activeuser==='sbhunk'){
    Object.keys(sbhunk.chats).forEach(u=>{
        console.log("checking for  "+u)
       if(input!==""&&sbhunk.chats[u].name.includes(input))list.push({username:u,name:sbhunk.chats[u].name})
        else list.push({username:u,name:sbhunk.chats[u].name})
    })
    console.log(sbhunk.chats)
    console.log("search list for sbhunk")
    console.log(list)
return list;
}
else { 
 // then for global search
const res=await fetch(responser+'/getsearchlist?input='+input+"&&activeuser="+activeuser);
    let search_list=await res.json()
 
    return search_list.value ||[{username:null,name:"wait Searching...."}]
}
}


export const getOtp=async (mail:string)=>{
    let otp={status:'not_get'};
   try{ const res= await fetch(responser+'/getotp?email='+mail);
     otp=await res.json();}catch{}
    return otp;    
}




export const getMediaAuthinticator=async()=>{
    let auth=await fetch(import.meta.env.VITE_API_KEY+'/get_authentiator');
    return await auth.json();
}


export const setDp=async(username:String,imgurl:String)=>{
alert("mmmm")
let val:any=await fetch(responser+'/setdp',{method:"POST",headers:{'Content-Type':"application/json"},body:JSON.stringify({username:username,dpurl:imgurl})});
val=await val.json();
alert(val)
return val.value;
   
}




const genapi=import.meta.env.VITE_GEN_API
const genAI = new GoogleGenerativeAI(genapi)

export const  askAi=async(req:string)=>{


    let text="Somthing error try again after sometime.";
 try {
     
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  
      const result = await model.generateContent(req+"  give response in plain text without using any formatting.");
       text =  result.response.text();
      
    } catch{ }
    console.log(req)
    console.log(text)
    
     return text;
}




export const  deletemsg=async(activeuser:string,activechat:string,time:string)=>{
    try{ await fetch(responser+'/deletemsg?activeuser='+activeuser+'&&activechat='+activechat+'&&time='+time)
}catch(e){console.log(e)}
    } 