import { useState } from "react";







const useBinaryState=(state1:any,state2:any)=>{

const [state,updateState]=useState(state1);

const setState=()=>{
   updateState((prev: any) => (prev === state1 ? state2 : state1));
}

return [state,setState];
}

export default useBinaryState;