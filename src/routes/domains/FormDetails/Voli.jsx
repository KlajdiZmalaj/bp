import React, { Component } from "react";
import { notification } from "antd";
import MyInput from "./Input";
import FormSubmiter from "./FormSubmiter";
class Voli extends Component {
  state = {
    price: this.props.TicketByTcketId.total_cost,
    bagaglio: this.props.TicketByTcketId.bagaglio || 1,
    link: this.props.TicketByTcketId.link,
    nome_agenzia: this.props.TicketByTcketId.nome_agenzia,
    extra_data: this.props.TicketByTcketId.extra_data,
    bagaglio_stiva: this.props.TicketByTcketId.bagaglio_stiva,
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
        duration: 5,
      });
    }
  };
  submitData = async () => {
    const {
      link,
      nome_agenzia,
      extra_data,
      bagaglio,
      bagaglio_stiva,
      price,
    } = await this.state;

    await this.props.updateDataForm(
      this.props.typee,
      link,
      nome_agenzia,
      extra_data,
      bagaglio,
      bagaglio_stiva,
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
      "",
      "",
      "",
      "",
      "",
      "",
      parseFloat(price),
      this.props.ticketId
    );
  };
  render() {
    const { editable } = this.props;
    const {
      nome_agenzia,
      extra_data,
      link,
      bagaglio,
      bagaglio_stiva,
      price,
    } = this.state;
    // console.log("ca ka voli ", bagaglio, bagaglio_stiva);
    return (
      <React.Fragment>
        <div className="formBody">
          <div className="formBody--col">
            <MyInput
              labelName={"Nome Agenzia"}
              type={"text"}
              editable={editable}
              value={nome_agenzia}
              handleChange={(e) => {
                this.setState({ nome_agenzia: e.target.value });
              }}
            />
            <div className="itemCol full Bagalio">
              <div className="inputLabel">Bagaglio</div>
              <div
                className={`itemCol full full-radio ant-input ${
                  editable ? "disabled" : ""
                }`}
              >
                <span className="inputLabel">A mano</span>

                <input
                  checked={bagaglio === 1}
                  onChange={(e) => {
                    if (e.target.checked) {
                      this.setState({ bagaglio: e.target.value });
                    }
                  }}
                  disabled={true}
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
                  disabled={true}
                  type="radio"
                  name="bagaglio"
                  value="2"
                  id="bagaglio2"
                  checked={bagaglio === 2}
                />
              </div>
            </div>
            <div className="itemCol full">
              <div className="inputLabel">Prezzo</div>
              <input className="ant-input" value={price} readOnly />
            </div>

            <div className="itemCol full">
              {
                <div
                  className={
                    "d-flex w-100" + (bagaglio === 2 ? "" : " invisible")
                  }
                >
                  <div className="inputLabel">Bagaglio in stiva</div>
                  <input
                    className="ant-input"
                    value={bagaglio_stiva || ""}
                    readOnly={editable}
                    onChange={(e) => {
                      this.setState({ bagaglio_stiva: e.target.value });
                    }}
                    type="text"
                  />
                </div>
              }
            </div>
          </div>
          <div className="formBody--col">
            <MyInput
              labelName={"Link"}
              type={"text"}
              editable={editable}
              value={link}
              handleChange={(e) => {
                this.setState({ link: e.target.value });
              }}
            />

            <MyInput
              labelName={"Dati Passegeri"}
              type={"text"}
              editable={""}
              value={extra_data}
              handleChange={(e) => {
                this.setState({ extra_data: e.target.value });
              }}
            />
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

export default Voli;
