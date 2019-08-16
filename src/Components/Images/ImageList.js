import React from 'react';
import Image from './Image';
import './ImageList.css';
import Loader from 'react-loader';
function ImageList ({list} ){
    if(list.length === 0){
        return(
            <div style={{padding:"400px"}}>
                <Loader loaded={false}></Loader>
            </div>
        );
    }else{
        var rows = [];
        var ind;
        for(var i = 0; i < 4; i++){
            rows.push([]);
            for(var j = 0; j < list.length/4; j++){
                ind = i*5 + j;
                rows[i].push( <Image id={list[ind].id} urls={list[ind].src} onclick={onclick} key={ind}/>);
            }
        }

        onclick = (event) =>{
            var modal = document.getElementById("myModal");
            var modalImg = document.getElementById("img01");
            var captionText = document.getElementById("caption");
            modal.style.display = "block";
            modalImg.src = event.target.src;
            captionText.innerHTML = event.target.alt;
        }
        
        onclose = (event) => { 
            var modal = document.getElementById("myModal");
            var modalImg = document.getElementById("img01");
            var captionText = document.getElementById("caption");
            modal.style.display = "none";
            modalImg.src = "";
            captionText.innerHTML = "";
        }
                
    }

    return(
        <div className="row1"> 
            <div id="myModal" className="modal">
                <span id="close" className="close" onclick={onclose}>&times;</span>
                <img className="modal-content" id="img01" alt="Can't load"/>
                <div id="caption"></div>
            </div>

            <div className="column">
                {rows[0]}
            </div>
            <div className="column">
                {rows[1]}
            </div>
            <div className="column">
                {rows[2]}
            </div>
            <div className="column">
                {rows[3]}
            </div>
        </div>
    );
}

export default ImageList;

