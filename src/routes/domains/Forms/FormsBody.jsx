import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import Voli from "./Voli";
import Treni from "./Treni";
import Eventi from "./Eventi";
import OnlineShop from "./OnlineShop";
import Bgame from "./Bgame";
import Auto from "./Auto";
import Energia from "./Energia";
import images from "themes/images";
import "./style.css";

const Card = ({
  title,
  icon,
  clickHandler,
  accountInfo,
  name,
  prestoOnline,
}) => {
  return (
    <div
      onClick={() => {
        if (accountInfo?.token) {
          clickHandler();
        } else {
          window.location.hash = "login";
        }
      }}
      className="formsContainer--cards__item animated fadeIn"
    >
      <div className="titleCard">
        {name ? name : title.replace("-", " ")} <i className={icon}></i>{" "}
      </div>
      <img className="bgImg" src={images[`${title}-card`]} alt="" />
      <div className="imageCard">
        <img className="logoImg" src={images[`${title}-logo`]} alt="" />
        {prestoOnline && <div className="coomingsoon">COMMING SOON</div>}
      </div>
    </div>
  );
};

export class FormsBody extends Component {
  state = {
    isSelected: true,
    typee: 8,
    bagaglio: 1,
    nome_agenzia: "energia",
    color: "#18819B",
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
                icon={"fal fa-plane"}
                color="#11375dad"
                accountInfo={accountInfo}
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
                icon={"fal fa-bus"}
                color="#588a17a3"
                accountInfo={accountInfo}
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
                icon={"fal fa-subway"}
                color="#bf0013b3"
                accountInfo={accountInfo}
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
                icon={"fal fa-ticket-alt"}
                color="#151515c4"
                accountInfo={accountInfo}
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
                icon={"fal fa-ticket-alt"}
                color="#edbf00bf"
                accountInfo={accountInfo}
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
                icon={"fal fa-ticket-alt"}
                color="#3f1d74b5"
                accountInfo={accountInfo}
              />
              <Card
                clickHandler={() => (window.location.hash = "visure")}
                title="visure"
                icon={"fal fa-file-alt"}
                color="#277d74b5"
                accountInfo={accountInfo}
              />
              <Card
                clickHandler={() =>
                  this.setState({
                    isSelected: true,
                    nome_agenzia: "shop-online",
                    typee: 4,
                    color: "#F26521",
                  })
                }
                title="shop-online"
                icon={"fal fa-shopping-cart"}
                color="#F26521"
                accountInfo={accountInfo}
              />
              <Card
                clickHandler={() =>
                  this.setState({
                    isSelected: true,
                    nome_agenzia: "bgame",
                    typee: 5,
                    color: "#F26521",
                  })
                }
                title="bgame"
                icon={"fal fa-futbol"}
                color="#F26521"
                accountInfo={accountInfo}
                name="REGISTRAZIONE CONTI GIOCO ONLINE"
              />
              <Card
                clickHandler={() =>
                  this.setState({
                    isSelected: true,
                    nome_agenzia: "auto",
                    typee: 6,
                    color: "#22A094",
                  })
                }
                title="auto"
                icon={"fal fa-car"}
                color="#22A094"
                accountInfo={accountInfo}
                name="NOLEGGIO AUTO"
                prestoOnline
              />
              <Card
                clickHandler={() =>
                  this.setState({
                    isSelected: false,
                    nome_agenzia: "assicurazioni",
                    typee: 7,
                    color: "#22A094",
                  })
                }
                title="assicurazioni"
                icon={"fal fa-file-alt"}
                accountInfo={accountInfo}
                name="ASSICURAZIONI"
                prestoOnline
              />
              <Card
                clickHandler={() =>
                  this.setState({
                    isSelected: true,
                    nome_agenzia: "energia",
                    typee: 8,
                    color: "#18819B",
                  })
                }
                title="energia"
                icon={"fal fa-lightbulb-on"}
                accountInfo={accountInfo}
                name={`CONTRATTI LUCE & GAS`}
                prestoOnline
              />
            </div>
          )}

          {isSelected && typee === 1 && (
            <Voli
              goBack={() => this.setState({ isSelected: false })}
              nome_agenzia={nome_agenzia}
              color={color}
              typee={typee}
              sendDataForm={this.props.sendDataForm}
              accountInfo={accountInfo}
            />
          )}
          {isSelected && typee === 2 && (
            <Treni
              goBack={() => this.setState({ isSelected: false })}
              nome_agenzia={nome_agenzia}
              color={color}
              typee={typee}
              sendDataForm={this.props.sendDataForm}
              accountInfo={accountInfo}
            />
          )}
          {isSelected && typee === 3 && (
            <Eventi
              goBack={() => this.setState({ isSelected: false })}
              nome_agenzia={nome_agenzia}
              color={color}
              typee={typee}
              sendDataForm={this.props.sendDataForm}
              accountInfo={accountInfo}
            />
          )}
          {isSelected && typee === 4 && (
            <OnlineShop
              goBack={() => this.setState({ isSelected: false })}
              nome_agenzia={nome_agenzia}
              color={color}
              typee={typee}
              sendDataForm={this.props.sendDataForm}
              accountInfo={accountInfo}
            />
          )}
          {isSelected && typee === 5 && (
            <Bgame
              goBack={() => this.setState({ isSelected: false })}
              nome_agenzia={nome_agenzia}
              color={color}
              typee={typee}
              sendDataForm={this.props.sendDataForm}
              accountInfo={accountInfo}
            />
          )}
          {isSelected && typee === 6 && (
            <Auto
              goBack={() => this.setState({ isSelected: false })}
              nome_agenzia={nome_agenzia}
              color={color}
              typee={typee}
              sendDataForm={this.props.sendDataForm}
              accountInfo={accountInfo}
            />
          )}
          {isSelected && typee === 8 && (
            <Energia
              goBack={() => this.setState({ isSelected: false })}
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
