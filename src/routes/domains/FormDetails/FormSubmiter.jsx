import React, { Component } from "react";
import { connect } from "react-redux";
import { userConfirmation, uploadPdf } from "services/auth";
import { AuthActions } from "redux-store/models";
import { downloadFile as downloadApi } from "services/main";

export const downloadFile = (fileName) => {
  downloadApi(fileName);
};
export class FormSubmiter extends Component {
  constructor() {
    super();
    this.state = {
      base64: "",
      fileType: {},
      file: {},
    };
    this.fileUpInput = this.fileUpInput.bind(this);
  }
  fileUpInput = (e) => {
    let _self = this;
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = function () {
      let data = reader.result;
      _self.setState({
        base64: data,
      });
    };
    file instanceof Blob && reader.readAsDataURL(file);
    let fileType = file && file.name.split(".")[1];
    this.setState({
      file: file,
      fileType: fileType,
    });
  };
  render() {
    const { enableButtons, TicketByTcketId, getDataFormDetails } = this.props;
    return JSON.parse(localStorage.accountDataB)?.profile?.role?.name ===
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
        <input
          className="d-none"
          required
          id="doc"
          type="file"
          accept="image/*,.doc,.docx,application/msword,application/pdf"
          onChange={(e) => this.fileUpInput(e)}
        />
        {TicketByTcketId.document ? (
          <div
            onClick={() => {
              downloadFile(TicketByTcketId.document);
            }}
            className="formSubmit--download"
            data-file={TicketByTcketId.document}
          >
            <i className="fal fa-download" aria-hidden="true"></i>
            Download Documenti
          </div>
        ) : (
          <label
            htmlFor="doc"
            className={
              "formSubmit--download" +
              (this.props.TicketByTcketId.status === "Eseguibile" ||
              this.props.TicketByTcketId.status === "Completato" ||
              enableButtons
                ? ""
                : " dissableBtn") +
              (this.state.base64 ? " toUpload" : "")
            }
          >
            {this.state.base64 ? (
              <div>
                {" "}
                <i
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    this.setState({ base64: null, fileType: null, file: {} });
                  }}
                  className="fal fa-trash-alt"
                ></i>{" "}
                {this.state.file.name}{" "}
                {enableButtons ||
                this.props.TicketByTcketId.status === "Eseguibile" ? (
                  ""
                ) : (
                  <i
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      uploadPdf(TicketByTcketId.id, this.state.base64);
                    }}
                    className="fal fa-check-circle"
                  ></i>
                )}
              </div>
            ) : (
              <div>
                {" "}
                <i className="fal fa-cloud-upload-alt"></i> ALLEGA BIGLIETTO
              </div>
            )}
          </label>
        )}

        <div
          onClick={() => {
            userConfirmation(
              this.props.setButtonsSupport,
              this.props.TicketByTcketId.id,
              4,
              () => {},
              getDataFormDetails,
              this.state.base64 && this.state.base64
            );
          }}
          className={
            "formSubmit--button -s" +
            (enableButtons || this.props.TicketByTcketId.status === "Eseguibile"
              ? ""
              : " dissableBtn")
          }
        >
          <span>Esegui</span>
        </div>
        <div
          onClick={() => {
            userConfirmation(
              this.props.setButtonsSupport,
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
          <span>Annulla</span>
        </div>
      </div>
    ) : (
      TicketByTcketId.status === "Nuova Offerta" && (
        <div className="formSubmit">
          <div
            onClick={() => {
              userConfirmation(
                this.props.setButtonsSupport,
                this.props.TicketByTcketId.id,
                3,
                () => {},
                getDataFormDetails
              );
            }}
            className={"formSubmit--button -s"}
          >
            <span>{`${
              this.props.accountInfo.profile.role.name !== "support"
                ? "Conferma"
                : "Eseguito"
            }`}</span>
          </div>
          <div
            onClick={() => {
              userConfirmation(
                this.props.setButtonsSupport,
                this.props.TicketByTcketId.id,
                5,
                () => {},
                getDataFormDetails
              );
            }}
            className={"formSubmit--button -c"}
          >
            <span>
              {this.props.accountInfo.profile.role.name !== "support"
                ? "Rifiuta"
                : "Annullato"}
            </span>
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
    accountInfo: state.auth.accountInfo,
  };
};
export default connect(mstp, AuthActions)(FormSubmiter);
