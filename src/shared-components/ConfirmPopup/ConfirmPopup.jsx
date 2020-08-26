import React, { Component } from "react";
import { numberWithCommas } from "utils/HelperFunc";
class ConfirmPopup extends Component {
  componentDidMount() {
    const { confirmTranzacionModal } = this.props;
    if (
      confirmTranzacionModal.data.amount === 0 ||
      !confirmTranzacionModal.data.userName
    ) {
      setTimeout(() => {
        this.props.settingState();
      }, 800);
    }
  }
  render() {
    const { confirmTranzacionModal, settingState, confirmation } = this.props;
    return (
      <div className="Confirma">
        {confirmTranzacionModal?.data?.amount === 0 ||
        !confirmTranzacionModal?.data?.userName ? (
          <div className="Message">
            <div>
              Verifica nome utente e importo non devono essere vuoti o 0{" "}
            </div>
          </div>
        ) : (
          <div className="Message">
            <div>
              {" "}
              {` Stai per ${
                confirmTranzacionModal.data.type === "deposit"
                  ? "Accreditare"
                  : "Prelevare"
              } la somma di:  € ${numberWithCommas(
                confirmTranzacionModal.data.amount
              )}   
                  a ${confirmTranzacionModal.data.userName} `}
            </div>
            <div>Confermi ?</div>
            <div className="Buttons">
              <button
                onClick={() => {
                  confirmation();
                }}
              >
                Si
              </button>
              <button onClick={settingState}>No</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default ConfirmPopup;
