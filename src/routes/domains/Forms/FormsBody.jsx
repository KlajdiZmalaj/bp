import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import Voli from "./Voli";
import "./style.css";
const Tab = ({ name, icon, active, clickHandler }) => (
  <div
    onClick={clickHandler}
    className={"formsContainer--tabs__item" + (active ? " active" : "")}
  >
    {name} <i className={icon}></i>
  </div>
);

export class FormsBody extends Component {
  state = { typee: 1, bagaglio: 1 };
  render() {
    const { typee } = this.state;
    return (
      <div className="forms--body">
        <div className="formsContainer">
          <div className="formsContainer--tabs">
            <Tab
              clickHandler={() => {
                this.setState({ typee: 1 });
              }}
              active={typee === 1 ? true : false}
              name="Voli"
              icon={"fas fa-plane"}
            />
            <Tab
              clickHandler={() => {
                this.setState({ typee: 2 });
              }}
              active={typee === 2 ? true : false}
              name="Treni"
              icon={"fas fa-subway"}
            />
            <Tab
              clickHandler={() => {
                this.setState({ typee: 3 });
              }}
              active={typee === 3 ? true : false}
              name="Eventi"
              icon={"fas fa-receipt"}
            />
          </div>
          {typee === 1 && (
            <Voli typee={typee} sendDataForm={this.props.sendDataForm} />
          )}
        </div>
      </div>
    );
  }
}
const mstp = (state) => {
  return state;
};
export default connect(null, AuthActions)(FormsBody);
