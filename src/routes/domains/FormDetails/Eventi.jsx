import React, { Component } from "react";
import { Select, notification } from "antd";
import MyInput from "./Input";
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
    price: this.props.TicketByTcketId.total_cost,

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
      price,
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
    const { editable, TicketByTcketId } = this.props;
    const {
      nome_agenzia,
      telefono,
      email,
      link,
      name,
      descrizione_categoria,
      price,
    } = this.state;
    return (
      <div className="newReg--row">
        <div className="newReg--row__col">
          <MyInput
            labelName={"Nome Agenzia"}
            type={"text"}
            editable={editable}
            value={nome_agenzia}
            handleChange={(e) => {
              this.setState({ nome_agenzia: e.target.value });
            }}
          />
          <div className="itemCol full">
            <label className="inputLabel">Categoria</label>
            <Select
              disabled={editable}
              onChange={(value) => {
                this.setState({ categoria: value });
              }}
              defaultValue={TicketByTcketId.categoria}
            >
              <Option value="0">Selezionare Evento</Option>
              <Option value="1">Concerti</Option>
              <Option value="2">Sport</Option>
              <Option value="3">Museo</Option>
              <Option value="4">Teatro</Option>
              <Option value="5">Altro</Option>
            </Select>
          </div>
          <MyInput
            labelName={"Telefono"}
            type={"text"}
            editable={editable}
            value={telefono}
            handleChange={(e) => {
              this.setState({ telefono: e.target.value });
            }}
          />
          <MyInput
            labelName={"Email"}
            type={"text"}
            editable={editable}
            value={email}
            handleChange={(e) => {
              this.setState({ email: e.target.value });
            }}
          />
          <MyInput
            labelName={"Prezzo"}
            type={"text"}
            editable={editable}
            value={price}
            handleChange={(e) => {
              this.setState({ price: e.target.value });
            }}
          />
        </div>
        <div className="newReg--row__col">
          <MyInput
            labelName={"Link"}
            type={"text"}
            editable={editable}
            value={link}
            handleChange={(e) => {
              this.setState({ link: e.target.value });
            }}
          />
          <div className="itemCol full">
            <label className="inputLabel">Qta biglietti</label>
            <Select
              disabled={editable}
              onChange={(value) => {
                this.setState({ quantity: value });
              }}
              defaultValue={TicketByTcketId.quantity}
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
          <MyInput
            labelName={"Nome"}
            type={"text"}
            editable={editable}
            value={name}
            handleChange={(e) => {
              this.setState({ name: e.target.value });
            }}
          />
          <MyInput
            labelName={"Descrizione"}
            type={"text"}
            editable={editable}
            value={descrizione_categoria}
            handleChange={(e) => {
              this.setState({ descrizione_categoria: e.target.value });
            }}
          />

          <div className="rowForButton">
            <button
              disabled={editable}
              className="SubmitButton"
              onClick={this.submitData}
            >
              Invia
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Eventi;
