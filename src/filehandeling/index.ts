



export const getRootFolder = async () => {
    await navigator.storage.persist();
    return new Folder(await navigator.storage.getDirectory(), null, "root");

}

export const getStorageSize = async () => {

    return await navigator.storage.estimate();

}


export class Folder {
    #parentFolderHandle: any = null;
    #name: string = "unknown";
    #folderHande: any = null;
   


    constructor(folderHandle: any, parentFolderHandle: any, name: string) {
        this.#folderHande = folderHandle;
        this.#parentFolderHandle = parentFolderHandle;
        this.#name = name;
    }


    createFolder = async (name: string) => {
        const handler = await this.#folderHande.getDirectoryHandle(name, { create: true });

        return new Folder(this.#folderHande, handler, name);
       
        
    }


    getTextFile = async (name: string) => {
        const handler = await this.#folderHande.getFileHandle(name+".txt", { create: true })
      return new File(this.#folderHande, handler, name);
            
    }
    getJsonObjectFile = async (name: string) => {
        const handler = await this.#folderHande.getFileHandle(name+".json", { create: true })
      return new JsonObjectFile(this.#folderHande, handler, name);
             
    }

    clearAll = async () => {
        await navigator.storage.getDirectory();

        for await (const [name] of this.#folderHande.entries()) {

            await this.#folderHande.removeEntry(name, {
                recursive: true,
            });
        }
    }
    delete = async () => {
        if (this.#folderHande === null) {

            this.clearAll();
        }
        await this.#parentFolderHandle.removeEntry(this.#name, { recursive: true })
    }








}


class File {
    #fileHandler: any = null;
    #parentFolderHandle: any = null;
    #name: string = "unknown"


    constructor(parentFolderHandle: any, fileHandler: any, name: string) {
        this.#name = name;
        this.#fileHandler = fileHandler;
        this.#parentFolderHandle = parentFolderHandle;
    }

    write = async (text: String) => {
      
        const writable = await this.#fileHandler.createWritable();

        writable.write(text);
        await writable.close();

    }
    read = async () => {
        const readable = await this.#fileHandler.getFile();
        return readable.text();
    }


    delete = async () => {
        await this.#parentFolderHandle.removeEntry(this.#name);
    }





}






class JsonObjectFile extends File {



    jsonWrite = async (data: object) => {
        await this.write(JSON.stringify(data))
    }

    addOne = async (key: string, value: any) => {
      const text=  await this.read();

      if (text.trim()===""){
        const data:any={};
        data[key]=value;
       await this.jsonWrite(data)
return;
      }
        const data = JSON.parse(text);
        data[key] = value;
        this.jsonWrite(data)
    }


    deleteOne = async (key: string) => {
        const data = JSON.parse(await this.read());
        delete data[key];
        this.jsonWrite(data)
    }


    addMany = async (object: {}) => {

        const data = JSON.parse(await this.read());
        await this.jsonWrite({ ...object, ...data })

    }


    deleteMany = async (keys: string[]) => {
        const data = JSON.parse(await this.read());
        for (let key of keys) {
            delete data[key];
        }
        await this.jsonWrite(data)
    }

    getOne = async (key: string) => {
        const data = JSON.parse(await this.read());
        return data[key];
    }



    getAll = async () => {
        const text=await this.read();
        if(text.trim()==="")return {}
        else return JSON.parse(text)
    }
    removeAll = async () => {
        await this.jsonWrite({})
    }



}

