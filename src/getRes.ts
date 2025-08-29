


const getRes=async(req:String)=>{


   const isOnline:string='gen'
    const responser:string=import.meta.env.VITE_API_KEY+'/sbh/'+isOnline+'?req='+req||"";
 let data:any=""

    try{

 data=(await fetch(responser)
                    .then(async(res)=> await res.json())
                    .then((res)=> res.value));

    }
    catch{
    }
return data;

}




export default  getRes;