import React from "react";
import {Link} from "react-router-dom"

function NavBar() {

    return(
      <header>
        <nav className="navbar std-style" style={{"backgroundColor": "orange"}}>
          <ul>
              <Link className="link std-style" to="/">Home</Link>  |        
              <Link className="link std-style" to="/form">Add Word</Link> |
              <Link className="link std-style" to="/input">Translate</Link> | 
              <Link className="link std-style" to="/practice">Practice</Link> |
              <Link className="link std-style" to="/glossary">Glossary</Link>
          </ul>
            
            
        </nav>
      </header>
    )
}

export default NavBar