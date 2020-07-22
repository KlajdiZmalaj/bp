import React, { Component } from "react";
import { connect } from "react-redux";
import { userConfirmation } from "services/auth";
export class FormSubmiter extends Component {
  render() {
    const { enableButtons, TicketByTcketId } = this.props;
    return (
      JSON.parse(localStorage.accountDataB).profile.role.name === "support" && (
        <div className="formSubmit">
          <div className="formSubmit--price">
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
          <div className="formSubmit--download">
            <i className="fal fa-cloud-upload-alt"></i> ALLEGA biglietto
          </div>
          <div
            onClick={() => {
              userConfirmation(this.props.TicketByTcketId.id, 4, () => {});
            }}
            className={
              "formSubmit--button -s" + (enableButtons ? "" : " dissableBtn")
            }
          >
            Eseguito
          </div>
          <div
            onClick={() => {
              userConfirmation(this.props.TicketByTcketId.id, 5, () => {});
            }}
            className={
              "formSubmit--button -c" + (enableButtons ? "" : " dissableBtn")
            }
          >
            Anullato
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
export default connect(mstp, null)(FormSubmiter);
