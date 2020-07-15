import React, { Component } from "react";
import { Select, notification } from "antd";
const { Option } = Select;

class Eventi extends Component {
  state = {
    categoryArray: [
      "Selezionare Evento",
      "Concerti",
      "Sport",
      "Museo",
      "Teatro",
      "Altro",
    ],
    quantityArray: [
      "Selezionare un numero",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6+(specificare su note)",
    ],
    link: this.props.TicketByTcketId.link,
    nome_agenzia: this.props.TicketByTcketId.nome_agenzia,
    extra_data: this.props.TicketByTcketId.extra_data,
    categoria: this.props.TicketByTcketId.categoria,
    descrizione_categoria: this.props.TicketByTcketId.link,
    quantity: this.props.TicketByTcketId.quantity,
    name: this.props.TicketByTcketId.name,
    email: this.props.TicketByTcketId.email,
    telefono: this.props.TicketByTcketId.telefono,
  };
  resetState = (msg) => {
    if (!msg.error) {
      this.setState({
        link: "",
        nome_agenzia: "",
        extra_data: "",
        categoria: 0,
        descrizione_categoria: "",
        quantity: 0,
        name: "",
        email: "",
        telefono: "",
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
      categoria,
      descrizione_categoria,
      quantity,
      name,
      email,
      telefono,
    } = this.state;
    this.props.sendDataForm(
      this.props.typee,
      link,
      nome_agenzia,
      extra_data,
      null,
      null,
      this.resetState,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      categoria,
      descrizione_categoria,
      quantity,
      name,
      email,
      telefono
    );
  };
  render() {
    return (
      <div className="newReg--row">
        <div className="newReg--row__col">
          <div className="itemCol full">
            <label className="inputLabel">Nome Agenzia</label>
            <input
              class="ant-input"
              type="text"
              readOnly={this.props.editable}
              value={this.state.nome_agenzia}
              onChange={(e) => {
                this.setState({ nome_agenzia: e.target.value });
              }}
            ></input>
          </div>
          <div className="itemCol full">
            <label className="inputLabel">Categoria</label>
            <Select
              disabled={this.props.editable}
              onChange={(value) => {
                this.setState({ categoria: value });
              }}
              defaultValue={this.props.TicketByTcketId.categoria}
            >
              <Option value="0">Selezionare Evento</Option>
              <Option value="1">Concerti</Option>
              <Option value="2">Sport</Option>
              <Option value="3">Museo</Option>
              <Option value="4">Teatro</Option>
              <Option value="5">Altro</Option>
            </Select>
          </div>
          <div className="itemCol full">
            <label className="inputLabel">Telefono</label>
            <input
              class="ant-input"
              type="text"
              value={this.state.telefono}
              readOnly={this.props.editable}
              onChange={(e) => {
                this.setState({ telefono: e.target.value });
              }}
            ></input>
          </div>

          <div className="itemCol full">
            <label className="inputLabel">Email</label>
            <input
              class="ant-input"
              type="text"
              value={this.state.email}
              readOnly={this.props.editable}
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
            ></input>
          </div>
        </div>

        <div className="newReg--row__col">
          <div className="itemCol full">
            <label className="inputLabel">Link</label>
            <input
              class="ant-input"
              type="text"
              value={this.state.link}
              readOnly={this.props.editable}
              onChange={(e) => {
                this.setState({ link: e.target.value });
              }}
            ></input>
          </div>
          <div className="itemCol full">
            <label className="inputLabel">Qta biglietti</label>
            <Select
              disabled={this.props.editable}
              onChange={(value) => {
                this.setState({ quantity: value });
              }}
              defaultValue={this.props.TicketByTcketId.quantity}
            >
              <Option value="0">Selezionare un numero</Option>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
              <Option value="6">6+(specificare su note)</Option>
            </Select>
          </div>
          <div className="itemCol full">
            <label className="inputLabel">Nome</label>
            <input
              class="ant-input"
              type="text"
              value={this.state.name}
              readOnly={this.props.editable}
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
            ></input>
          </div>
          <div className="itemCol full">
            <label className="inputLabel">Descrizione</label>
            <input
              class="ant-input"
              type="text"
              value={this.state.descrizione_categoria}
              readOnly={this.props.editable}
              onChange={(e) => {
                this.setState({ descrizione_categoria: e.target.value });
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

export default Eventi;
