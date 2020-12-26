import React from 'react';

const Card = (props) => {
    return (
        <div className="card" style={{width: '22rem'}}>
          <img src={props.imgSrc} 
          className="card-img-top" alt={props.imgAlt} />
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.text}</p>
            <a href={props.link} className="btn btn-primary">{props.buttonLabel}</a>
          </div>
        </div>
    )
}

export default Card;