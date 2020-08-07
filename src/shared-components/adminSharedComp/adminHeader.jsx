import React from "react";
import "./styles.css";
import { connect } from "react-redux";
import AuthActions from "redux-store/models/auth";
class AdminHeader extends React.Component {
  render() {
    return (
      <div className="AdminHeader">
        <div className="AdminHeader--Title">ADMIN PANEL</div>
        <div className="AdminHeader--Box">
          <div
            className={`AdminHeader--Category ${
              this.props.location.pathname.includes("utenti") ? "active" : ""
            }`}
            onClick={() => {
              this.props.history.push("/back-office/utenti");
            }}
          >
            <div>
              <i className="fal fa-user-circle"></i>
              <span>UTENTI</span>
            </div>
          </div>
          <div
            className={`AdminHeader--Category ${
              this.props.location.pathname.includes("movimenti") ? "active" : ""
            }`}
            onClick={() => {
              this.props.history.push("/back-office/movimenti");
            }}
          >
            <div>
              <i className="fal fa-wallet"></i>
              <span>MOVIMENTI</span>
            </div>
          </div>

          <div
            className={`AdminHeader--Category ${
              this.props.location.pathname.includes("servizzi") ? "active" : ""
            }`}
            onClick={() => {
              this.props.history.push("/back-office/servizzi");
            }}
          >
            <div>
              <i className="far fa-briefcase"></i>
              <span>SERVIZI</span>
            </div>
          </div>
          <div
            className={`AdminHeader--Category--Prenotazioni ${
              this.props.location.pathname.includes("prenotazioni")
                ? "active"
                : ""
            }`}
            onClick={() => {
              this.props.history.push("/back-office/prenotazioni");
            }}
          >
            <div>
              <i className="fal fa-ticket"></i>
              <span>PRENOTAZIONI</span>
            </div>
          </div>
          <div className="AdminHeader--ButtonWrapper">
            <button
              onClick={() => {
                this.props.logOut();
              }}
            >
              LOG OUT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, AuthActions)(AdminHeader);
