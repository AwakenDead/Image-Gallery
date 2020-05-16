import React from 'react';
import './Image.css';

function Image (props ){
  
  return(
    <React.Fragment>
      <img 
      src={props.data.src.large} 
      alt={props.data.alt}
      onClick={props.onclick.bind(this, props.data)}
      />
    </React.Fragment>
  );
}

export default Image;