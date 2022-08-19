import React from "react";
import {Link} from "react-router-dom"

function NavBar() {

    return(
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/form">Add Word</Link>
            </li>
            <li>
              <Link to="/input">What to Type</Link>
            </li>
            <li>
              <Link to="/container">Result</Link>
            </li>
          </ul>
        </nav>
    )
}

export default NavBar