import { useState } from "react"
import { EllipsisVertical } from "lucide-react";
import "./style.css"


const PopUPmenu=({options}:any)=>{

    const [checked ,setChecked]=useState(true)


    const changeChecked=()=>{
        if(checked)setChecked(false);
        else setChecked(true)
    }
    return<>
    
<div>
   <label className="main ms-auto">
   <input className="inp" checked={checked} onClick={changeChecked} type="checkbox" />
  <div className="bar ms-auto ">
  <EllipsisVertical/>
  </div>
  <section className="menu-container border ">
    {
       options&& Object.keys(options).map((key:string,i:number)=><div id={i+""} onClick={options[key]} className="menu-list text-center">{key}</div>)
    }
    
    
  </section>
</label>
</div>
    
    </>
}

export default PopUPmenu