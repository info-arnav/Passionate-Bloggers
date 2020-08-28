import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div class="navbar-fixed">
        <nav class="z-depth-0">
          <div class="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: "monospace",
              }}
              class="col s5 brand-logo center black-text"
            >
              <i class="material-icons"></i>
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
