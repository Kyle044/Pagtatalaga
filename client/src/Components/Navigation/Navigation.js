import React from "react";
import { Link } from "react-router-dom";
import "./navigation.css";

function Navigation() {
  return (
    <div className="navigation">
      <nav>
        <Link to="/">
          <img src="img/mergedlogo.png" height={170} />
        </Link>
        <div className="conttwo">
          <label for="toggle">&#9776;</label>

          <input type="checkbox" id="toggle" />
          <div className="navlinks">
            <ul>
              <Link to="/">
                <li className="li">
                  <div className="text-2xl text-white	">HOME</div>
                </li>
              </Link>
              <Link to="/About">
                <li className="li">
                  <div className="text-2xl text-white	">ABOUT</div>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
