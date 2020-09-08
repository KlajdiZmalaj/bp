import React from "react";
import { connect } from "react-redux";
import AuthActions from "redux-store/models/auth";
import "./adminHeader.css";
import Chat from "shared-components/Chat/Chat";
import { Tooltip } from "antd";

class AdminHeader extends React.Component {
  state = {
    chat: false,
  };
  render() {
    const { small } = this.props;

    return (
      <div className="AdminHeader">
        {!small && (
          <div className="AdminHeader--Title">
            {window.innerWidth > 550 && window.innerWidth <= 1320 ? (
              <Tooltip title="Impossibile aprire il menu sullo schermo tra 550 px e 1320 px">
                <span style={{ cursor: "pointer" }}>
                  <i
                    className="fal fa-bars"
                    onClick={this.props.handleClick}
                  ></i>
                </span>
              </Tooltip>
            ) : (
              <span style={{ cursor: "pointer" }}>
                <i className="fal fa-bars" onClick={this.props.handleClick}></i>
              </span>
            )}
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
          {small && (
            <div
              className={`AdminHeader--Category `}
              onClick={() => {
                this.setState((state) => ({ chat: !state.chat }));
                this.props.goToAdminPanel(true);
              }}
            >
              <div>
                <Chat />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  accountInfo: state.auth.accountInfo,
});
export default connect(mapStateToProps, AuthActions)(AdminHeader);
