import { Children,createContext } from "react"


const LogContext:any=createContext(null);


export const LogProvider:any=()=>{



    return(
        <LogContext.Provider>
            {Children}
        </LogContext.Provider>
    )


}
