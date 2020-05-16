import React from 'react';
import './Modal.css';

function Modal(props){
    console.log(props.image);
    return(
        <div id="myModal" className="modal" style={{display:"block"}}>
            <a href={props.image.src.original} target="blank" className="download">DownLoad</a>
            <span id="close" className="close" onClick={props.onclose}>&times;</span>
            <img className="modal-content" id="img01" alt={props.image.url} src={props.image.src.large}/>
            <div id="caption">{props.image.url}</div>
        </div>
    );
}
export default Modal;