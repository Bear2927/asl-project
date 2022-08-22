import React from "react";
import {Link} from "react-router-dom"

function NavBar() {

    return(
      <header>
        <nav id="navbar">
          <ul>
              <Link className="link" to="/">Home</Link>  |        
              <Link className="link" to="/form">Add Word</Link> |
              <Link className="link" to="/input">Translate</Link> | 
              <Link className="link" to="/practice">Practice</Link>        
          </ul>
            
            
        </nav>
      </header>
    )
}

export default NavBar