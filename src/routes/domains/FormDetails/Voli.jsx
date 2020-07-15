import React, { Component } from "react";
import { notification } from "antd";
class Voli extends Component {
  state = {
    bagaglio: this.props.TicketByTcketId.bagaglio,
    link: this.props.TicketByTcketId.link,
    nome_agenzia: this.props.TicketByTcketId.nome_agenzia,
    extra_data: this.props.TicketByTcketId.extra_data,
    bagaglio_stiva: this.props.TicketByTcketId.bagaglio_stiva,
  };
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
      <div className="newReg--row">
        <div className="newReg--row__col">
          <div className="itemCol full">
            <label className="inputLabel">Nome Agenzia</label>
            <input
              className="ant-input"
              type="text"
              readOnly={this.props.editable}
              value={this.state.nome_agenzia}
            ></input>
          </div>
          <div className="itemCol full Bagalio">
            <div className="inputLabel">Bagaglio</div>
            <div className="itemCol full full-radio ant-input">
              <span className="inputLabel">A mano</span>

              <input
                checked={this.state.bagaglio == 1}
                onChange={(e) => {
                  if (e.target.checked) {
                    this.setState({ bagaglio: e.target.value });
                  }
                }}
                disabled={this.props.editable}
                type="radio"
                name="bagaglio"
                value="1"
                id="bagaglio1"
              />
              <span className="inputLabel">In stiva</span>

              <input
                onChange={(e) => {
                  if (e.target.checked) {
                    this.setState({ bagaglio: e.target.value });
                  }
                }}
                disabled={this.props.editable}
                type="radio"
                name="bagaglio"
                value="2"
                id="bagaglio2"
                checked={this.state.bagaglio == 2}
              />
            </div>
          </div>
          <div className="itemCol full">
            {
              <div
                className={"" + (this.state.bagaglio == 2 ? "" : " invisible")}
              >
                <div className="inputLabel">Bagaglio in stiva</div>
                <input
                  className="ant-input"
                  value={this.state.bagaglio_stiva}
                  readOnly={this.props.editable}
                  onChange={(e) => {
                    this.setState({ bagaglio_stiva: e.target.value });
                  }}
                  type="text"
                />
              </div>
            }
          </div>
        </div>
        <div className="newReg--row__col">
          <div className="itemCol full">
            <label className="inputLabel">Link</label>
            <input
              className="ant-input"
              type="text"
              readOnly={this.props.editable}
              value={this.state.link}
            ></input>
          </div>
          <div className="itemCol full">
            <label className="inputLabel">Dati Passegeri</label>
            <input
              className="ant-input"
              type="text"
              readOnly={this.props.editable}
              value={this.state.extra_data}
              onChange={(e) => {
                this.setState({ extra_data: e.target.value });
              }}
            ></input>
          </div>
          <div className="rowForButton">
            <button disabled className="SubmitButton" onClick={this.submitData}>
              Invia
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Voli;
