import React from 'react';

function Button(props) {
    return(
        <button 
        type="button" 
        className={props.className}>{props.children}</button>
    )
  }

export default Button