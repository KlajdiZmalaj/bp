import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import FormDetailsPopupBody from "./FormDetailsPopupBody";
const Tab = ({ name, icon }) => (
  <div className={"formsContainer--tabs__item"}>
    {name} <i className={icon}></i>
  </div>
);
class FormDetailPopup extends Component {
  state = {
    editable: true,
    bounceOut: false,
  };
  componentWillUnmount() {
    this.setState({
      editable: true,
    });
  }
  exit = () => {
    this.setState(
      {
        bounceOut: true,
      },
      () => {
        setTimeout(() => {
          this.props.setTicketByTicketId({ data: null });
        }, 700);
      }
    );
  };
  render() {
    return (
      <div>
        <div
          className={`newReg userDetailPopup animated bounceIn ${
            this.state.bounceOut ? "bounceOut" : ""
          }`}
        >
          <div className="newReg--header">
            {this.props.TicketByTcketId.type === 1 && (
              <Tab name={"Voli"} icon={"fas fa-plane"} />
            )}
            {this.props.TicketByTcketId.type === 2 && (
              <Tab name="Treni" icon={"fas fa-subway"} />
            )}
            {this.props.TicketByTcketId.type === 3 && (
              <Tab name="Eventi" icon={"fas fa-receipt"} />
            )}
            <div className="closeBtn" onClick={this.exit}>
              <i className="fal fa-times" aria-hidden="true" />
            </div>
          </div>
          <FormDetailsPopupBody
            editable={this.state.editable}
            typee={
              this.props.TicketByTcketId
                ? this.props.TicketByTcketId.type
                : null
            }
          />
          <div className="newReg--row lastRow ">
            <div className="newReg--row__col submitcol ml-auto">
              {(this.props.roleName === "support" &&
                this.props.TicketByTcketId.status === "Nuova Richiesta") ||
              (this.props.roleName != "support" &&
                this.props.TicketByTcketId.status === "Nuova Offerta") ? (
                <button
                  className="SubmitButton"
                  onClick={() => {
                    this.setState({
                      editable: false,
                    });
                  }}
                >
                  Modificare
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <div className="backDrop" onClick={this.exit}></div>
      </div>
    );
  }
}
const mstp = (state) => {
  return {
    TicketByTcketId: state.auth.TicketByTcketId,
    roleName: state.auth.accountInfo.profile.role.name,
  };
};
export default connect(mstp, AuthActions)(FormDetailPopup);