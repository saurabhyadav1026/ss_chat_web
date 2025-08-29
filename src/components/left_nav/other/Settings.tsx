
import {SettingIcon} from '../../icons'


const others=()=>{


    return (
        <>
        <div id="left_nav_bottom" className="left_bar">
    <div className="left_nav_icons " >

       {/*  <!-- setting icon --> */}
        
            <SettingIcon ></SettingIcon>
           {/*  <PrivacyIcon></PrivacyIcon>
            <HelpIcon></HelpIcon>
            <AboutIcon></AboutIcon> */}
        
        {/* <!--     <div id="privacyIcon"></div>
    <div id="aboutIcon"></div>
    <div id="helpIcon"></div>
--> */}
    </div>
    <div className="left_nav_bar">
        <div>
            <h3 style={{paddingLeft:"5px"}}>Setting</h3>
        {/*     <h3  style={{padding:"5px"}}>Privacy & Policy</h3>
            <h3  style={{padding:"5px"}}>Help</h3>
            <h3  style={{padding:"5px"}}>About</h3> */}
        </div>
       {/*  <div><h4>Privacy & Policy</h4></div>
    <div><h4>Help</h4></div>
    <div ><h4>About</h4></div> */}

    </div>

</div>
        </>
    );
}

export default others;