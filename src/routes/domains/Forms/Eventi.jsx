import React, { Component } from "react";
import { Select, notification } from "antd";
import TextArea from "antd/lib/input/TextArea";
import images from "themes/images";
import { connect } from "react-redux";
import { AuthActions, MainActions } from "redux-store/models";
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
        descrizione_categoria: "",
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
      this.props.nome_agenzia,
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
    const { nome_agenzia, color, goBack, isMobile, activeService } = this.props;

    return (
      <div className="formsContainer--body animated fadeIn eventi">
        {!isMobile && (
          <div className="leftForm">
            <img src={images[`${nome_agenzia}-bg`]} alt="" className="imgBg" />
            <img
              src={images[`${nome_agenzia}-logo`]}
              alt=""
              className="imgLogo"
            />
            <div
              className="overlayImg"
              style={{ backgroundColor: color }}
            ></div>
          </div>
        )}

        <div className="rightForm">
          <div className="rightForm--header">
            {!isMobile && (
              <div className="TitleBack">
                <i class="fal fa-chevron-left Arrow" onClick={goBack}></i>
                Prenotazione Biglietti{" "}
              </div>
            )}

            {isMobile && (
              <div className="TitleBack">
                {" "}
                <i className="fal fa-receipt"></i> {activeService}{" "}
              </div>
            )}
            <img src={images[`${nome_agenzia}-logo`]} alt="" />
          </div>
          <div className="rightForm--left">
            <div className="formsContainer--body__item d-none">
              <div className="label">Nome Agenzia</div>
              <input
                value={this.props.accountInfo?.profile?.name || ""}
                type="text"
                disabled
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Link </div>
              <input
                value={this.state.link || ""}
                onChange={(e) => {
                  this.setState({ link: e.target.value });
                }}
                type="text"
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Categoria </div>

              <Select
                onChange={(value) => {
                  this.setState({ categoria: value });
                }}
                defaultValue={"Selezionare Evento"}
              >
                <Option value="0">Selezionare Evento</Option>
                <Option value="1">Concerti</Option>
                <Option value="2">Sport</Option>
                <Option value="3">Museo</Option>
                <Option value="4">Teatro</Option>
                <Option value="5">Altro</Option>
              </Select>
            </div>
            <div className="formsContainer--body__item datiPass">
              <div className="label"> Note</div>
              <TextArea
                value={this.state.extra_data || ""}
                type="number"
                onChange={(e) => {
                  this.setState({ extra_data: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="rightForm--right">
            <div className="formsContainer--body__item ">
              <div className="label">Nome </div>
              <input
                value={this.state.name || ""}
                type="text"
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Descrizione</div>
              <input
                value={this.state.descrizione_categoria || ""}
                type="text"
                onChange={(e) => {
                  this.setState({ descrizione_categoria: e.target.value });
                }}
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Qta biglietti </div>
              <Select
                onChange={(value) => {
                  this.setState({ quantity: value });
                }}
                defaultValue={"Selezionare un numero"}
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
            <div className="formsContainer--body__item">
              <div className="label">Email</div>
              <input
                value={this.state.email || ""}
                type="text"
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
              />
            </div>
            <div className="formsContainer--body__item ">
              <div className="label"> Telefono</div>
              <input
                value={this.state.telefono || ""}
                type="number"
                onChange={(e) => {
                  this.setState({ telefono: e.target.value });
                }}
              />
            </div>
            <div className="formsContainer--body__item submit">
              <button
                style={{ backgroundColor: color }}
                onClick={this.submitData}
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
const mstp = (state) => {
  return {
    accountInfo: state.auth.accountInfo,
  };
};
export default connect(mstp, { ...AuthActions, ...MainActions })(Eventi);
