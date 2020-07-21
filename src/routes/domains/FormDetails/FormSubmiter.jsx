import React, { Component } from "react";

export class FormSubmiter extends Component {
  render() {
    return (
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
        <div className="formSubmit--button -s">Eseguito</div>
        <div className="formSubmit--button -c">Anullato</div>
      </div>
    );
  }
}

export default FormSubmiter;
