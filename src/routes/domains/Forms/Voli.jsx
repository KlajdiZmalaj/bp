import React, { Component } from "react";
import { notification } from "antd";
class Voli extends Component {
  state = { bagaglio: 1 };
  resetState = (msg) => {
    if (!msg.error) {
      this.setState({
        link: "",
        nome_agenzia: "",
        extra_data: "",
        bagaglio: 1,
        bagaglio_stiva: "",
      });
      notification["success"]({
        message: "Azione completata",
        description: msg.msg,
        placement: "bottomRight",
      });
    } else {
      notification["error"]({
        message: msg.msg[0],
        description: msg.msg[1],
        placement: "bottomRight",
        duration: "5",
      });
    }
  };
  submitData = () => {
    const {
      link,
      nome_agenzia,
      extra_data,
      bagaglio,
      bagaglio_stiva,
    } = this.state;
    this.props.sendDataForm(
      this.props.typee,
      link,
      nome_agenzia,
      extra_data,
      bagaglio,
      bagaglio_stiva,
      this.resetState
    );
  };
  render() {
    return (
      <div className="formsContainer--body">
        <div className="formsContainer--body__item">
          <div className="label">Nome Agenzia</div>
          <input
            value={this.state.nome_agenzia}
            type="text"
            onChange={(e) => {
              this.setState({ nome_agenzia: e.target.value });
            }}
          />
        </div>
        <div className="formsContainer--body__item">
          <div className="label">Link</div>
          <input
            value={this.state.link}
            onChange={(e) => {
              this.setState({ link: e.target.value });
            }}
            type="text"
          />
        </div>
        <div className="formsContainer--body__item">
          <div className="label">Dati Passegeri</div>
          <input
            value={this.state.extra_data}
            onChange={(e) => {
              this.setState({ extra_data: e.target.value });
            }}
            name="passageri"
            type="text"
          />
        </div>

        <div className="formsContainer--body__item w-25">
          <div className="label">Bagaglio</div>
          <div className="radioWrapper">
            <div className="radioGr">
              <span>A mano</span>
              <input
                checked={this.state.bagaglio == 1}
                onChange={(e) => {
                  if (e.target.checked) {
                    this.setState({ bagaglio: e.target.value });
                  }
                }}
                type="radio"
                name="bagaglio"
                value="1"
                id="bagaglio1"
              />
              <label htmlFor="bagaglio1" className="customRadio">
                <span></span>
              </label>
            </div>
            <div className="radioGr">
              <span>In stiva</span>
              <input
                onChange={(e) => {
                  if (e.target.checked) {
                    this.setState({ bagaglio: e.target.value });
                  }
                }}
                type="radio"
                name="bagaglio"
                value="2"
                id="bagaglio2"
                checked={this.state.bagaglio == 2}
              />
              <label htmlFor="bagaglio2" className="customRadio">
                <span></span>
              </label>
            </div>
          </div>
        </div>
        {
          <div
            className={
              "formsContainer--body__item w-50" +
              (this.state.bagaglio == 2 ? "" : " invisible")
            }
          >
            <div className="label">Bagaglio in stiva</div>
            <input
              value={this.state.bagaglio_stiva}
              onChange={(e) => {
                this.setState({ bagaglio_stiva: e.target.value });
              }}
              type="text"
            />
          </div>
        }

        <div className="formsContainer--body__item submit">
          <button onClick={this.submitData}>Invia</button>
        </div>
      </div>
    );
  }
}

export default Voli;
