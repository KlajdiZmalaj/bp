import React, { Component } from "react";
import { notification } from "antd";
import { DatePicker } from "antd";
import moment from "moment";
import MyInput from "./Input";
import FormSubmiter from "./FormSubmiter";

class Treni extends Component {
  state = {
    price: this.props.TicketByTcketId.total_cost,
    link: this.props.TicketByTcketId.link,
    nome_agenzia: this.props.TicketByTcketId.nome_agenzia,
    extra_data: this.props.TicketByTcketId.extra_data,
    partenza: this.props.TicketByTcketId.partenza,
    partenza_stazione: this.props.TicketByTcketId.partenza_stazione,
    andata_time: this.props.TicketByTcketId.andata_time,
    destinazione: this.props.TicketByTcketId.destinazione,
    destinazione_stazione: this.props.TicketByTcketId.destinazione_stazione,
    tipologia_biglietto: this.props.TicketByTcketId.tipologia_biglietto,
    compagnie: this.props.TicketByTcketId.compagnie,
    adulti: this.props.TicketByTcketId.adulti,
    ragazzi: this.props.TicketByTcketId.ragazzi,
    ritorno_date: this.props.TicketByTcketId.ritorno_date,
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
  submitData = async () => {
    const {
      link,
      nome_agenzia,
      extra_data,
      partenza,
      partenza_stazione,
      andata_time,
      destinazione,
      destinazione_stazione,
      tipologia_biglietto,
      compagnie,
      adulti,
      ragazzi,
      ritorno_date,
      price,
    } = await this.state;
    await this.props.updateDataForm(
      this.props.typee,
      link,
      nome_agenzia,
      extra_data,
      "",
      "",
      this.resetState,
      partenza,
      partenza_stazione,
      andata_time,
      destinazione,
      destinazione_stazione,
      compagnie,
      adulti,
      ragazzi,
      tipologia_biglietto,
      ritorno_date,
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
      link,
      nome_agenzia,
      extra_data,
      partenza,
      partenza_stazione,
      destinazione,
      destinazione_stazione,
      tipologia_biglietto,
      compagnie,
      adulti,
      ragazzi,
      price,
      ritorno_date,
      andata_time,
    } = this.state;
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
            <MyInput
              labelName={" Nome passeggeri e dettagli per il biglietto"}
              type={"text"}
              editable={editable}
              value={extra_data}
              handleChange={(e) => {
                this.setState({ extra_data: e.target.value });
              }}
            />
            <MyInput
              semi={true}
              labelName={"Partenza"}
              type={"text"}
              editable={editable}
              value={partenza}
              handleChange={(e) => {
                this.setState({ partenza: e.target.value });
              }}
            />

            <MyInput
              semi={true}
              labelName={"Stazione"}
              type={"text"}
              editable={editable}
              value={partenza_stazione}
              handleChange={(e) => {
                this.setState({ partenza_stazione: e.target.value });
              }}
            />
            <div className="itemCol full">
              <label className="inputLabel">Andata</label>
              <DatePicker
                className={` ${editable ? "disabled" : ""}`}
                value={moment(andata_time)}
                disabled={editable}
                showTime
                onChange={(e) => {
                  this.setState({ andata_time: moment(e).format() });
                }}
              />
            </div>
            {tipologia_biglietto == 1 ? (
              <div className="itemCol full">
                <label className="inputLabel">Ritorno</label>

                <DatePicker
                  className={` ${editable ? "disabled" : ""}`}
                  disabled={editable}
                  value={moment(ritorno_date)}
                  showTime
                  onChange={(e) => {
                    this.setState({ ritorno_date: moment(e).format() });
                  }}
                />
              </div>
            ) : null}

            <div className="itemCol full Bagalio">
              <div className="inputLabel">Tipologia Biglietto</div>
              <div
                className={`itemCol full full-radio ant-input ${
                  editable ? "disabled" : ""
                }`}
              >
                <span className="inputLabel">Andata e ritorno</span>

                <input
                  checked={tipologia_biglietto == 1}
                  onChange={(e) => {
                    if (e.target.checked) {
                      this.setState({ tipologia_biglietto: e.target.value });
                    }
                  }}
                  type="radio"
                  disabled={editable}
                  name="bagaglio"
                  value="1"
                  id="bagaglio1"
                />
                <span className="inputLabel">Solo Andata</span>

                <input
                  checked={tipologia_biglietto == 2}
                  onChange={(e) => {
                    if (e.target.checked) {
                      this.setState({ tipologia_biglietto: e.target.value });
                    }
                  }}
                  type="radio"
                  name="bagaglio"
                  disabled={editable}
                  value="2"
                  id="bagaglio2"
                />
              </div>
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
              semi={true}
              labelName={"Adulti"}
              type={"number"}
              editable={editable}
              value={adulti}
              handleChange={(e) => {
                this.setState({ adulti: e.target.value });
              }}
            />
            <MyInput
              semi={true}
              labelName={"Ragazzi"}
              type={"number"}
              editable={editable}
              value={ragazzi}
              handleChange={(e) => {
                this.setState({ ragazzi: e.target.value });
              }}
            />
            <MyInput
              labelName={"Destinazione"}
              type={"text"}
              editable={editable}
              value={destinazione}
              handleChange={(e) => {
                this.setState({ destinazione: e.target.value });
              }}
            />
            <MyInput
              labelName={"Destinazione Stazione"}
              type={"text"}
              editable={editable}
              value={destinazione_stazione}
              handleChange={(e) => {
                this.setState({ destinazione_stazione: e.target.value });
              }}
            />
            <div className="itemCol full Bagalio">
              <div className="inputLabel">Compagnie</div>
              <div
                className={`itemCol full full-radio ant-input ${
                  editable ? "disabled" : ""
                }`}
              >
                <span className="inputLabel">TrenItalia</span>

                <input
                  checked={compagnie == "trenitalia"}
                  onChange={(e) => {
                    if (e.target.checked) {
                      this.setState({ compagnie: "trenitalia" });
                    }
                  }}
                  disabled={editable}
                  type="radio"
                  name="c"
                  value="1"
                  id="c1"
                />
                <span className="inputLabel">Italio</span>
                <input
                  onChange={(e) => {
                    if (e.target.checked) {
                      this.setState({ compagnie: "italio" });
                    }
                  }}
                  disabled={editable}
                  type="radio"
                  name="c"
                  value="2"
                  id="c2"
                  checked={compagnie == "italio"}
                />
              </div>
            </div>
          </div>
        </div>
        <FormSubmiter
          priceChange={(e) => {
            this.setState({ price: e });
          }}
          sendOffert={this.submitData}
          price={price}
        />
      </React.Fragment>
    );
  }
}

export default Treni;
