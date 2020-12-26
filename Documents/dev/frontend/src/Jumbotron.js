import React from 'react';

function Jumbotron(props) {
    return(
      <div className="jumbotron">
        <h1 className="display-4">{props.title}</h1>
        <p className="lead">{props.lead}</p>
        <hr className="my-4" />
        <p>{props.description}</p>
        <a className="btn btn-primary btn-lg" 
        href="#" role="button">{props.buttonLabel}</a>
      </div>
    )
  }

export default Jumbotron;