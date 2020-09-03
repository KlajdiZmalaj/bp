import React from "react";
import { connect } from "react-redux";
import AuthActions from "redux-store/models/auth";
import "./adminHeader.css";
class AdminHeader extends React.Component {
  render() {
    const { small } = this.props;

    return (
      <div className="AdminHeader">
        {!small && (
          <div className="AdminHeader--Title">
            <span>
              <i className="fal fa-bars" onClick={this.props.handleClick}></i>
            </span>
            <span>
              {this.props.accountInfo.profile.role.name === "support"
                ? "Support"
                : "Admin"}
            </span>
            <span>Panel</span>
          </div>
        )}

        <div className="AdminHeader--Box">
          <div
            className={`AdminHeader--Category ${
              this.props.location.pathname.includes("utenti") ? "active" : ""
            }`}
            onClick={() => {
              this.props.history.push("/back-office/utenti");
              this.props.goToAdminPanel(true);
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
              this.props.goToAdminPanel(true);
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
              this.props.goToAdminPanel(true);
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
              this.props.goToAdminPanel(true);
            }}
          >
            <div>
              <i className="fal fa-ticket"></i>
              <span>PRENOTAZIONI</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  accountInfo: state.auth.accountInfo,
});
export default connect(mapStateToProps, AuthActions)(AdminHeader);
