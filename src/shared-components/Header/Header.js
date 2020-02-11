import React, { Component } from "react";
import { connect } from "react-redux";
import AuthActions from "redux-store/models/auth";
import images from "themes/images";
import "./Header.styles.scss";
import { withRouter } from "react-router-dom";

class Header extends Component {
  state = {
    userName: "",
    password: ""
  };

  handleChangeUsername = event => {
    this.setState({ userName: event.target.value });
  };

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { userName, password } = this.state;
    this.props.signInByEmail(userName, password);
  };

  render() {
    let isLogged = false;
    const { accountInfo } = this.props;

    if (Object.keys(accountInfo).length > 0) {
      isLogged = true;
    }

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
        <a className="navbar-brand" href="#/dashboard">
          <img src={images.logo} alt="" />
        </a>

        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            {isLogged && (
              <li className="nav-item ">
                <a className="nav-link credito-nav" href="/#">
                  Credito <span>{accountInfo.profile.wallet}€</span>
                </a>
              </li>
            )}

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
              <a className="nav-link" href="#/registerUser">
                Register user
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#">
                Menu1
              </a>
            </li>
            {!isLogged && (
              <li className="nav-item active">
                <a className="nav-link" href="#/register">
                  Register
                </a>
              </li>
            )}
          </ul>
          <ul className="navbar-nav mt-2 mt-lg-0 mr-2 icons-nav">
            <li className="nav-item ">
              <a className="nav-link" href="/#">
                <i className="fas fa-bell"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/annunci">
                <i className="fas fa-envelope"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/admin-account">
                <i className="fas fa-cog"></i>
              </a>
            </li>
          </ul>
          {isLogged && (
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
                  <img className="profile-img" alt="" src={images.mario} />
                  {accountInfo.profile.name}
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownId">
                  <a href="#/account-info" className="dropdown-item">
                    Account Info
                  </a>
                  <a className="dropdown-item" href="#/dashboard">
                    AGS
                  </a>
                  <a className="dropdown-item" href="#/admin-account">
                    ADM
                  </a>
                  <button className="dropdown-item" onClick={this.props.logOut}>
                    LogOut
                  </button>
                </div>
              </li>
            </ul>
          )}
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

const mapsStateToProps = state => ({
  accountInfo: state.auth.accountInfo
});

export default withRouter(
  connect(mapsStateToProps, { ...AuthActions })(Header)
);
