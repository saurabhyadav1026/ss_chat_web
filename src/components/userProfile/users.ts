

/* 

ai chat :     sbhai1:{nae:"",res:[....],req:[....]}
friend chat:   usn:[{t:"",by:1|2,text:" "}]




*/

import { GoogleGenerativeAI } from '@google/generative-ai';

import getRes from '../../getRes';



import api from '../../api/api';



const responser:string='/users';


export const addUser=async(u:any)=>{
try{
await api.post(responser+'/newuser?name='+u.name+"&&username="+u.username+"&&password="+u.userpassword+"&&email="+u.email);
 
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



export const googleLoggin=async(token:any)=>{
   let data=false;
  try{  await api.post(responser+'/googleAuthVerification',{token:token}).
  then((res)=>{
    data=res.data
console.log(data)
})
}
catch(e){
    console.log(e)
}
return data;
}

export const checkIsUsernameAvailble=async(username:string)=>{
let data
    try{await api.post(responser+'/checkisusernameavailble',{username:username}).then((res)=>data=res.data.value);
    }catch(e){console.log(e)}
    return data;
}


export const newChat=async(activeuser:string,activechat:string)=>{




if(activeuser.includes('sbhunk'))
    sbhunk.chats[activechat]={name:'unknown'+activechat[5],reqs:[],ress:[]}
  
    else try{
      await api.post(responser+'/newchat?activeuser='+activeuser+'&&activechat='+activechat)
    }catch{}
    
     
    }



export const getlogUser:any=async (username:string)=>{
    
let us:any= await api.get(responser+'/getloguser?username='+username)
us= us.data;
return us.value;
}
export const getUser=async(username:string)=>{
    let us:any=await api.get(responser+'/getuser?username='+username)
us=us.data;
return us.value;
}


export const verifyUser=async(username:any,password:any)=>{
    let rr=false;
   try  {await api.post(responser+'/verifyuser',{username:username,password:password})
                    .then((res)=>{rr=res.data})        
      
    }catch(e:any){console.log(e)}
return rr;

}

 








export const getChat=async(activeuser:string,activechat:string)=>{
    if( activechat===null) return [];
    let chat:any=[];  
    if(activeuser==='sbhunk'){
        if(sbhunk.chats[activechat]){
            sbhunk.chats[activechat].reqs.forEach((r:any,i:any)=>{
            let rr=sbhunk.chats[activechat].ress[i]
            chat.push({by:1,text:r},{by:2,text:rr})
         
        })}
    }
else{
    try{
     const res=await api.get(responser+'/getchat?activeuser='+activeuser+'&&activechat='+activechat)
     chat= res.data;
     chat=chat.value
   }catch{}
 } 
 
 return chat;

}


export const sendToAI=async(activeuser:string,activechat:string,req:string)=>{
   

  
  if(activeuser.includes('sbhunk')){
        sbhunk.chats[activechat].reqs.push(req);
          
        sbhunk.chats[activechat].ress.push(await getRes(req))
       
        return;
    }
else try    {
  await api.post(responser+'/sendtoai?activeuser='+activeuser+'&&activechat='+activechat+'&&req='+req)
}catch(e){console.log(e)}
}








export const getSearchList=async(activeuser:string,input:string)=>{
  
let list:any=[];

// for if user not loggin(only ai chat)
if(activeuser==='sbhunk'){
    Object.keys(sbhunk.chats).forEach(u=>{
       if(input!==""&&sbhunk.chats[u].name.includes(input))list.push({username:u,name:sbhunk.chats[u].name})
        else list.push({username:u,name:sbhunk.chats[u].name})
    })
   
return list;
}
else { 
 // then for global search
const res=await api.post(responser+'/getsearchlist?input='+input+"&&activeuser="+activeuser);
    let search_list=await res.data
    return search_list.value ||[{username:null,name:"wait Searching...."}]
}
}


export const getOtp=async (mail:string)=>{
    let otp={status:'not_get'};
   try{ const res= await api.get(responser+'/getotp?email='+mail);
     otp=await res.data;}catch{}
    return otp;    
}




export const getMediaAuthinticator=async()=>{
    console.log("we auth the imagekit")
    let auth=await api.get('/get_authentiator');
    return await auth.data;
}


export const setDp=async(imgurl:String)=>{

let data={status:false}
await api.post(responser+'/setdp',{dpurl:imgurl})
.then((res)=>data=res.data);

return data;
   
}




const genapi=import.meta.env.VITE_GEN_api
const genAI = new GoogleGenerativeAI(genapi)

export const  askAi=async(req:string)=>{


    let text="Somthing error try again after sometime.";
 try {
     
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  
      const result = await model.generateContent(req+"  give response in plain text without using any formatting.");
       text =  result.response.text();
      
    } catch{ }
    
     return text;
}




export const  deletemsg=async(activeuser:string,activechat:string,time:string)=>{
    try{ await api(responser+'/deletemsg?activeuser='+activeuser+'&&activechat='+activechat+'&&time='+time)
}catch(e){console.log(e)}
    } 
