

//import Tesseract from 'tesseract.js';



 const getImageText=async(file:String)=>{
return file;
   /*   if (!file) return;
    
     let text:string = await Tesseract.recognize(
      file,
      'eng', // language
      {
        logger: (m:String) => console.log(m), // optional progress logs
      }
    ).then(({ data: { text } }:any) => {
      return text;
      
    });

return text; */
}

export default getImageText;