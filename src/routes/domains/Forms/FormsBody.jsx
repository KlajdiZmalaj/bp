import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import Voli from "./Voli";
import Treni from "./Treni";
import Eventi from "./Eventi";
import images from "themes/images";
import "./style.css";

const Card = ({ title, icon, color, clickHandler }) => {
  return (
    <div
      onClick={clickHandler}
      className="formsContainer--cards__item animated fadeIn"
    >
      <div className="titleCard">
        {title} <i className={icon}></i>{" "}
      </div>
      <img className="bgImg" src={images[`${title}-bg`]} alt="" />
      <div className="imageCard" style={{ backgroundColor: color }}>
        <img className="logoImg" src={images[`${title}-logo`]} alt="" />
      </div>
    </div>
  );
};

export class FormsBody extends Component {
  state = {
    isSelected: false,
    typee: 1,
    bagaglio: 1,
    nome_agenzia: "",
    color: "",
  };
  render() {
    const { accountInfo } = this.props;
    const { typee, isSelected, nome_agenzia, color } = this.state;
    return (
      <div className="forms--body">
        <div className="formsContainer">
          {!isSelected && <h1>Prenotazione</h1>}

          {!isSelected && (
            <div className="formsContainer--cards">
              <Card
                clickHandler={() =>
                  this.setState({
                    isSelected: true,
                    nome_agenzia: "expedia",
                    typee: 1,
                    color: "#11375dad",
                  })
                }
                title="expedia"
                icon={"fas fa-plane"}
                color="#11375dad"
              />
              <Card
                clickHandler={() =>
                  this.setState({
                    isSelected: true,
                    nome_agenzia: "flixbus",
                    typee: 2,
                    color: "#588a17a3",
                  })
                }
                title="flixbus"
                icon={"fas fa-subway"}
                color="#588a17a3"
              />
              <Card
                clickHandler={() =>
                  this.setState({
                    isSelected: true,
                    nome_agenzia: "trenitalia",
                    typee: 2,
                    color: "#bf0013b3",
                  })
                }
                title="trenitalia"
                icon={"fas fa-subway"}
                color="#bf0013b3"
              />
              <Card
                clickHandler={() =>
                  this.setState({
                    isSelected: true,
                    nome_agenzia: "vivaticket",
                    typee: 3,
                    color: "#151515c4",
                  })
                }
                title="vivaticket"
                icon={"fas fa-receipt"}
                color="#151515c4"
              />
              <Card
                clickHandler={() =>
                  this.setState({
                    isSelected: true,
                    nome_agenzia: "ticketing",
                    typee: 3,
                    color: "#edbf00bf",
                  })
                }
                title="ticketing"
                icon={"fas fa-receipt"}
                color="#edbf00bf"
              />
              <Card
                clickHandler={() =>
                  this.setState({
                    isSelected: true,
                    nome_agenzia: "stubhub",
                    typee: 3,
                    color: "#3f1d74b5",
                  })
                }
                title="stubhub"
                icon={"fas fa-receipt"}
                color="#3f1d74b5"
              />
            </div>
          )}

          {isSelected && typee === 1 && (
            <Voli
              nome_agenzia={nome_agenzia}
              color={color}
              typee={typee}
              sendDataForm={this.props.sendDataForm}
              accountInfo={accountInfo}
            />
          )}
          {isSelected && typee === 2 && (
            <Treni
              nome_agenzia={nome_agenzia}
              color={color}
              typee={typee}
              sendDataForm={this.props.sendDataForm}
              accountInfo={accountInfo}
            />
          )}
          {isSelected && typee === 3 && (
            <Eventi
              nome_agenzia={nome_agenzia}
              color={color}
              typee={typee}
              sendDataForm={this.props.sendDataForm}
              accountInfo={accountInfo}
            />
          )}
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
export default connect(mstp, AuthActions)(FormsBody);
//
