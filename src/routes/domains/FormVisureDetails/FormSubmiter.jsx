import React, { Component } from "react";
import { connect } from "react-redux";
import { userConfirmation, uploadPdf } from "services/auth";
import { AuthActions } from "redux-store/models";
import { downloadFile as downloadApi } from "services/main";
import { notification } from "antd";
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
    const { enableButtons, VisureByVisureId, getDataFormDetails } = this.props;
    return JSON.parse(localStorage.accountDataB).profile.role.name ===
      "support" ? (
      <div className="formSubmit">
        <div
          className={
            "formSubmit--price" +
            (this.props.VisureByVisureId.status === "Eseguibile"
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
        {VisureByVisureId.document ? (
          <div
            onClick={() => {
              downloadFile(VisureByVisureId.document);
            }}
            className="formSubmit--download"
            data-file={VisureByVisureId.document}
          >
            <i className="fal fa-download" aria-hidden="true"></i>
            Download Documenti
          </div>
        ) : (
          <label
            htmlFor="doc"
            className={
              "formSubmit--download" +
              (this.props.VisureByVisureId.status === "Eseguibile" ||
              this.props.VisureByVisureId.status === "Completato" ||
              enableButtons
                ? " "
                : " dissableBtn") +
              (this.state.base64
                ? this.state.fileType === "pdf"
                  ? " toUpload"
                  : " toWarn"
                : "")
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
                this.props.VisureByVisureId.status === "Eseguibile" ? (
                  ""
                ) : (
                  <i
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      uploadPdf(VisureByVisureId.id, this.state.base64, true);
                    }}
                    className={`fal animated fa-${
                      this.state.fileType === "pdf"
                        ? "check-circle heartBeat"
                        : "exclamation-circle wobble "
                    }`}
                    style={{ animationIterationCount: "infinite" }}
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
              this.props.VisureByVisureId.id,
              4,
              () => {},
              getDataFormDetails,
              this.state.base64 && this.state.base64,
              true
            );
          }}
          className={
            "formSubmit--button -s" +
            (enableButtons ||
            this.props.VisureByVisureId.status === "Eseguibile"
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

              this.props.VisureByVisureId.id,
              5,
              () => {},
              getDataFormDetails,
              this.state.base64 && this.state.base64,
              true
            );
          }}
          className={
            "formSubmit--button -c" +
            (enableButtons ||
            this.props.VisureByVisureId.status === "Eseguibile"
              ? ""
              : " dissableBtn")
          }
        >
          <span>Annulla</span>
        </div>
      </div>
    ) : (
      VisureByVisureId.status === "Nuova Offerta" && (
        <div className="formSubmit">
          <div
            onClick={() => {
              userConfirmation(
                this.props.setButtonsSupport,
                this.props.VisureByVisureId.id,
                3,
                () => {},
                getDataFormDetails,
                this.state.base64 && this.state.base64,
                true
              );
            }}
            className={"formSubmit--button -s"}
          >
            <span>Esegui</span>
          </div>
          <div
            onClick={() => {
              userConfirmation(
                this.props.setButtonsSupport,
                this.props.VisureByVisureId.id,
                5,
                () => {},
                getDataFormDetails,
                this.state.base64 && this.state.base64,
                true
              );
            }}
            className={"formSubmit--button -c"}
          >
            <span>Annulla</span>
          </div>
        </div>
      )
    );
  }
}
const mstp = (state) => {
  return {
    enableButtons: state.auth.enableButtons,
    VisureByVisureId: state.auth.VisureByVisureId,
  };
};
export default connect(mstp, AuthActions)(FormSubmiter);
