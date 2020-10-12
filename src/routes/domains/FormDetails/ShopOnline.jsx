import React, { Component, Fragment } from "react";
import { notification } from "antd";
import MyInput from "./Input";
import FormSubmiter from "./FormSubmiter";
import { Radio } from "antd";

class ShopOnline extends Component {
  state = {
    link: "",
    price: "",
    consegna: 2,
    nome: "",
    cognome: "",
    email: "",
    phone: "",
    extra_data: "",
    citta: "",
    provincia: "",
    note_address: "",
    stato: "",
    address1: "",
    address2: "",
    cap: "",
    company_name: "",
  };
  componentDidMount() {
    const { TicketByTcketId } = this.props;
    this.setState({
      ...TicketByTcketId,
      consegna: parseInt(TicketByTcketId.consegna),
      price: TicketByTcketId.total_cost,
      phone: TicketByTcketId.telefono,
    });
  }
  componentDidUpdate(prevProps) {
    const { TicketByTcketId } = this.props;
    if (prevProps.TicketByTcketId !== TicketByTcketId) {
      this.setState({
        ...TicketByTcketId,
        consegna: parseInt(TicketByTcketId.consegna),
        price: TicketByTcketId.total_cost,
        phone: TicketByTcketId.telefono,
      });
    }
  }
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
      price,
      consegna,
      nome,
      cognome,
      email,
      phone,
      extra_data,
      citta,
      provincia,
      note_address,
      stato,
      address1,
      address2,
      cap,
      company_name,
    } = this.state;
    this.props.updateDataForm(
      this.props.typee,
      link,
      this.props.TicketByTcketId.nome_agenzia,
      extra_data,
      null,
      null,
      this.resetState,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      nome,
      email,
      null,
      parseFloat(price),
      this.props.ticketId,
      consegna,
      cognome,
      phone,
      stato,
      citta,
      address1,
      address2,
      provincia,
      cap,
      note_address,
      company_name
    );
  };
  render() {
    const { editable } = this.props;
    const {
      link,
      price,
      consegna,
      nome,
      cognome,
      email,
      phone,
      extra_data,
      citta,
      provincia,
      note_address,
      stato,
      address1,
      address2,
      cap,
      company_name,
    } = this.state;
    console.log(price);
    return (
      <React.Fragment>
        <div className="formBody">
          <div className="formBody--col">
            <MyInput
              labelName={"Link Prodotto"}
              type={"text"}
              editable={editable}
              value={link}
              handleChange={(e) => {
                this.setState({ link: e.target.value });
              }}
            />

            <MyInput
              labelName={"Prezzo Prodotto"}
              type={"text"}
              editable={editable}
              value={price}
              handleChange={(e) => {
                this.setState({ price: e.target.value });
              }}
            />

            {this.state.consegna === 2 && (
              <Fragment>
                <MyInput
                  labelName={"Nome"}
                  type={"text"}
                  editable={editable}
                  value={nome}
                  handleChange={(e) => {
                    this.setState({ nome: e.target.value });
                  }}
                />
                <MyInput
                  labelName={"Cognome"}
                  type={"text"}
                  editable={editable}
                  value={cognome}
                  handleChange={(e) => {
                    this.setState({ cognome: e.target.value });
                  }}
                />
                <MyInput
                  labelName={"Company Name"}
                  type={"text"}
                  editable={editable}
                  value={company_name}
                  handleChange={(e) => {
                    this.setState({ company_name: e.target.value });
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
                  labelName={"Telefono"}
                  type={"text"}
                  editable={editable}
                  value={phone}
                  handleChange={(e) => {
                    this.setState({ phone: e.target.value });
                  }}
                />
                <MyInput
                  labelName={"Stato"}
                  type={"text"}
                  editable={editable}
                  value={stato}
                  handleChange={(e) => {
                    this.setState({ stato: e.target.value });
                  }}
                />
                <MyInput
                  labelName={"Citta"}
                  type={"text"}
                  editable={editable}
                  value={citta}
                  handleChange={(e) => {
                    this.setState({ citta: e.target.value });
                  }}
                />
              </Fragment>
            )}
          </div>
          <div className="formBody--col">
            <div className="itemCol full">
              <label className="inputLabel">Consegna a:</label>
              <Radio.Group
                onChange={(e) => {
                  this.setState({
                    consegna: e.target.value,
                  });
                }}
                value={consegna}
              >
                <Radio value={1}>Nome Agenzia</Radio>
                <Radio value={2}>Indirizzo Cliente</Radio>
              </Radio.Group>
            </div>
            {this.state.consegna === 2 && (
              <Fragment>
                <MyInput
                  labelName={"Indirizzo 1"}
                  type={"text"}
                  editable={editable}
                  value={address1}
                  handleChange={(e) => {
                    this.setState({ address1: e.target.value });
                  }}
                />
                <MyInput
                  labelName={"Indirizzo 2"}
                  type={"text"}
                  editable={editable}
                  value={address2}
                  handleChange={(e) => {
                    this.setState({ address2: e.target.value });
                  }}
                />

                <MyInput
                  labelName={"CAP"}
                  type={"text"}
                  editable={editable}
                  value={cap}
                  handleChange={(e) => {
                    this.setState({ cap: e.target.value });
                  }}
                />
                <MyInput
                  labelName={"Provincia"}
                  type={"text"}
                  editable={editable}
                  value={provincia}
                  handleChange={(e) => {
                    this.setState({ provincia: e.target.value });
                  }}
                />

                <div className="itemCol full">
                  <label className="inputLabel">Note </label>
                  <textarea
                    onChange={(e) => {
                      this.setState({ note_address: e.target.value });
                    }}
                    value={note_address || ""}
                  />{" "}
                </div>
              </Fragment>
            )}

            <div className="itemCol full">
              <label className="inputLabel">Note acquisti</label>
              <textarea
                onChange={(e) => {
                  this.setState({ extra_data: e.target.value });
                }}
                value={extra_data || ""}
              />{" "}
            </div>
          </div>
        </div>
        <FormSubmiter
          price={price}
          priceChange={(e) => {
            this.setState({ price: e });
          }}
          sendOffert={this.submitData}
        />
      </React.Fragment>
    );
  }
}

export default ShopOnline;
