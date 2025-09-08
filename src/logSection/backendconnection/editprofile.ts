




class Profile{
 username:string="sbhunk";
 token_no:string="";


constructor (username:string,password:string,token_no:string){
    if(Profile.isUsernameAvailable(username)){
    this.username=username;
    this.token_no='token_no';
}
}


static isUsernameAvailable=(new_username:string)=>{
return false;
}

static logginUser=async(username:string,password:string)=>{
    let log_info={status:false}

    //  let res= fetch(responser) fetch log   {status:true,token_no}
   //   log_info=res.json() 
return log_info;
}


static registerUser=async(name:string,username:string,password:string,email:string)=>{

 let log_info={status:false}
  // let res= fetch(responser)fetch log   {status:true,token_no}
   //   log_info=res.json() 
return log_info;

}


checkLogginStatus=(token_no:string)=>{
let status=false;
status=false  // fetch is Loggin(token_no,username)

}


editName=(new_name:string)=>{

}  
editUsername=(new_username:string)=>{

}  
editAbout=(new_about:string)=>{
    
}
editDp=(new_dp:string)=>{

}

editPassword=(old_password:string,new_password:string)=>{

}



}