import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
class FormContainerBody extends Component {
  submitData = () => {
    const {
      codice_fiscale,
      provincia,
      address,
      telefono,
      email,
      nome,
      cognome,
      data_di_nascita,
      luogo_di_nascita,
      ragione_sociale,
      p_iva,
      comune,
    } = this.props.data;
    const typee = this.props.type;
    this.props.sendVisureDetails(
      typee,
      codice_fiscale,
      provincia,
      address,
      telefono,
      email,
      nome,
      cognome,
      data_di_nascita,
      luogo_di_nascita,
      ragione_sociale,
      p_iva,
      comune,
      this.props.resetOfState
    );
  };
  render() {
    return (
      <div className="formsContainer--body animated fadeIn">
        <div className="leftForm"></div>
        <div className="rightForm">
          <div className="rightForm--header">
            <div>
              <i
                className="fal fa-chevron-left Arrow"
                onClick={this.props.goBack}
              ></i>

              <span className="HeaderTitle">{this.props.headerTitle}</span>
            </div>
          </div>
          <div className="rightForm--left">{this.props.leftForm}</div>
          <div className="rightForm--right">
            {this.props.rightForm}
            <div className="formsContainer--body__item submit">
              <button
                onClick={this.submitData}
                style={{ backgroundColor: "rgba(17, 55, 93, 0.68)" }}
              >
                Invia
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// const mstp = (state) => {
//   return {};
// };
export default connect(null, AuthActions)(FormContainerBody);
