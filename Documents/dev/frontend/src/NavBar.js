import React from 'react';

function NavBar(props) {
    return (
      <nav className={`navbar navbar-dark bg-dark ${props.className}`}>
        <div className="container-fluid">
  
          <a className="navbar-brand">Navbar</a>
  
          <div className="d-flex flex-grow-1">
            {props.children}
          </div>
          
          {props.extraComponent}
        </div>
      </nav>
    )
  }

export default NavBar;