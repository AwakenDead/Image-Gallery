import React from 'react';
import logo from'./logo.png';


function Navigation({onchange, onclick, onpress}) {
    return(
        <div >
            <div className="flex flex-wrap">
                <img src={logo} alt="logo" className="br-100" style={{ animation: 'App-logo-spin infinite 20s linear', width: "100px", height: "100px", verticalAlign:"middle"}}/>
                <div style={{height:"100px"}}>
                    <h1 className="georgia pa2" style={{paddingRight:"0px",verticalAlign:"middle" }}>Image Gallery</h1>
                </div>
            </div>
            <div className="bg-black tr"  >
                <input type="text" placeholder="Search images"  className="pa2 br1" onChange={onchange} onKeyPress={onpress}/>
                <button className="pa2 ma2 bg-blue white b--blue br1" onClick={onclick}>Search</button>
            </div>
        </div>
    );
}

export default Navigation;