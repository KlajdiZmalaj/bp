import React, { Component } from "react";
import images from "themes/images";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md fixed-top navbar-light">
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fal fa-bars"></i>
        </button>
        <a className="navbar-brand" href="dashboard.html">
          <img src={images.logo} alt="" />
        </a>

        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item ">
              <a className="nav-link credito-nav" href="/#">
                Credito <span>2,400$</span>
              </a>
            </li>
            <li className="nav-item active">
              <form action="#">
                <input
                  type="text"
                  className="search-nav"
                  placeholder="Search here..."
                />
              </form>
            </li>
          </ul>
          <ul className="navbar-nav mt-2 mt-lg-0 mr-2 menus-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#/">
                Menu2
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#">
                Menu1
              </a>
            </li>
          </ul>
          <ul className="navbar-nav mt-2 mt-lg-0 mr-2 icons-nav">
            <li className="nav-item ">
              <a className="nav-link" href="/#">
                <i className="fas fa-bell"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#">
                <i className="fas fa-envelope"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#">
                <i className="fas fa-cog"></i>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav mt-2 mt-lg-0 profile-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle  "
                href="/#"
                id="dropdownId"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {" "}
                <img className="profile-img" alt="" src={images.mario} /> Mario
                Rossi
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownId">
                <a className="dropdown-item" href="dashboard.html">
                  AGS
                </a>
                <a className="dropdown-item" href="admin-acc.html">
                  ADM
                </a>
              </div>
            </li>
          </ul>
        </div>
        <img
          className="profile-img d-block d-md-none"
          alt=""
          src={images.mario}
        />
      </nav>
    );
  }
}

export default Header;
