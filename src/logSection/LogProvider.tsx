import { Children,createContext } from "react"


const LogContext:any=createContext(null);


export const LogProvider:any=({Children}:any)=>{



    return(
        <LogContext.Provider>
            {Children}
        </LogContext.Provider>
    )


}
