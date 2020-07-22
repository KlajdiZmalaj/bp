import React, { Component } from "react";
import { connect } from "react-redux";
import { userConfirmation } from "services/auth";
import { AuthActions } from "redux-store/models";

export class FormSubmiter extends Component {
  render() {
    const { enableButtons, TicketByTcketId, getDataFormDetails } = this.props;
    return JSON.parse(localStorage.accountDataB).profile.role.name ===
      "support" ? (
      <div className="formSubmit">
        <div
          className={
            "formSubmit--price" +
            (this.props.TicketByTcketId.status === "Eseguibile"
              ? " dissableBtn"
              : "")
          }
        >
          <span>Importo Totale</span>
          <div>
            <div>€</div>
            <input
              type="text"
              value={this.props.price}
              onChange={(e) => {
                this.props.priceChange(e.target.value);
              }}
            />
          </div>
          <div className="submit" onClick={this.props.sendOffert}>
            INVIA OFFERTA <i className="fal fa-chevron-circle-right"></i>{" "}
          </div>
        </div>
        <div
          className={
            "formSubmit--download" +
            (this.props.TicketByTcketId.status === "Eseguibile"
              ? " dissableBtn"
              : "")
          }
        >
          <i className="fal fa-cloud-upload-alt"></i> ALLEGA biglietto
        </div>
        <div
          onClick={() => {
            userConfirmation(
              this.props.TicketByTcketId.id,
              4,
              () => {},
              getDataFormDetails
            );
          }}
          className={
            "formSubmit--button -s" +
            (enableButtons || this.props.TicketByTcketId.status === "Eseguibile"
              ? ""
              : " dissableBtn")
          }
        >
          <span>Eseguito</span>
        </div>
        <div
          onClick={() => {
            userConfirmation(
              this.props.TicketByTcketId.id,
              5,
              () => {},
              getDataFormDetails
            );
          }}
          className={
            "formSubmit--button -c" +
            (enableButtons || this.props.TicketByTcketId.status === "Eseguibile"
              ? ""
              : " dissableBtn")
          }
        >
          <span>Anullato</span>
        </div>
      </div>
    ) : (
      TicketByTcketId.status === "Nuova Offerta" && (
        <div className="formSubmit">
          <div
            onClick={() => {
              userConfirmation(
                this.props.TicketByTcketId.id,
                3,
                () => {},
                getDataFormDetails
              );
            }}
            className={"formSubmit--button -s"}
          >
            <span>Eseguito</span>
          </div>
          <div
            onClick={() => {
              userConfirmation(
                this.props.TicketByTcketId.id,
                5,
                () => {},
                getDataFormDetails
              );
            }}
            className={"formSubmit--button -c"}
          >
            <span>Anullato</span>
          </div>
        </div>
      )
    );
  }
}
const mstp = (state) => {
  return {
    enableButtons: state.auth.enableButtons,
    TicketByTcketId: state.auth.TicketByTcketId,
  };
};
export default connect(mstp, AuthActions)(FormSubmiter);
