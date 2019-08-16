import React from 'react';
import './Image.css';

function Image ({id, urls, onclick} ){
  // var classes=`gallery__item gallery__item--${index}`;

  return(
    <React.Fragment>
      <img src={urls.large} alt={id} id={id} onClick={onclick}/>
    </React.Fragment>
  );
}

export default Image;