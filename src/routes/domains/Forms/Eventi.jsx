import React, { Component } from "react";
<<<<<<< HEAD
import { Select, notification } from "antd";
import { DownOutlined } from "@ant-design/icons";
=======
import { Menu, Dropdown, Button, notification } from "antd";
>>>>>>> 5c4dcd27fe3c1099df14f9ac1555047cb3a3d501
import TextArea from "antd/lib/input/TextArea";
const { Option } = Select;

class Eventi extends Component {
  state = {
    categoria: 0,
    quantity: 0,
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
      <div className="formsContainer--body">
        <div className="formsItemTogether">
          <div className="formsContainer--body__item w-25">
            <div className="label">Nome Agenzia</div>
            <input
              value={this.state.nome_agenzia}
              type="text"
              onChange={(e) => {
                this.setState({ nome_agenzia: e.target.value });
              }}
            />
          </div>
          <div className="formsContainer--body__item w-40">
            <div className="label">Link </div>
            <input
              value={this.state.link}
              onChange={(e) => {
                this.setState({ link: e.target.value });
              }}
              type="text"
            />
          </div>

          <div className="formsContainer--body__item w-25">
            <div className="label">Categoria </div>

            <Select
              onChange={(value) => {
                this.setState({ categoria: value });
              }}
              defaultValue={"Selezionare Evento"}
            >
<<<<<<< HEAD
              <Option value="0">Selezionare Evento</Option>
              <Option value="1">Concerti</Option>
              <Option value="2">Sport</Option>
              <Option value="3">Museo</Option>
              <Option value="4">Teatro</Option>
              <Option value="5">Altro</Option>
            </Select>
=======
              <Button>
                {this.state.categoryArray[this.state.categoria]}{" "}
                <i className="fal fa-chevron-down" aria-hidden="true"></i>
              </Button>
            </Dropdown>
>>>>>>> 5c4dcd27fe3c1099df14f9ac1555047cb3a3d501
          </div>
        </div>
        <div className="formsItemTogether">
          <div className="formsContainer--body__item w-25">
            <div className="label">Nome </div>
            <input
              value={this.state.name}
              type="text"
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
            />
          </div>
          <div className="formsContainer--body__item w-40">
            <div className="label">Descrizione</div>
            <input
              value={this.state.descrizione_categoria}
              type="text"
              onChange={(e) => {
                this.setState({ descrizione_categoria: e.target.value });
              }}
            />
          </div>
          <div className="formsContainer--body__item w-25">
            <div className="label">Qta biglietti </div>
            <Select
              onChange={(value) => {
                this.setState({ quantity: value });
              }}
              defaultValue={"Selezionare un numero"}
            >
<<<<<<< HEAD
              <Option value="0">Selezionare un numero</Option>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
              <Option value="6">6+(specificare su note)</Option>
            </Select>
=======
              <Button>
                {this.state.quantityArray[this.state.quantity]}{" "}
                <i className="fal fa-chevron-down" aria-hidden="true"></i>
              </Button>
            </Dropdown>
>>>>>>> 5c4dcd27fe3c1099df14f9ac1555047cb3a3d501
          </div>
        </div>
        <div className="formsItemTogetherStart">
          <div className="formsContainer--body__item w-25">
            <div className="label">Email</div>
            <input
              value={this.state.email}
              type="text"
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
            />
          </div>
          <div className="formsContainer--body__item w-25">
            <div className="label"> Telefono</div>
            <input
              value={this.state.telefono}
              type="number"
              onChange={(e) => {
                this.setState({ telefono: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="formsContainer--body__item ">
          <div className="label"> Note</div>
          <TextArea
            value={this.state.extra_data}
            type="number"
            onChange={(e) => {
              this.setState({ extra_data: e.target.value });
            }}
          />
        </div>

        <div className="formsContainer--body__item submit">
          <button onClick={this.submitData}>Invia</button>
        </div>
      </div>
    );
  }
}

export default Eventi;
