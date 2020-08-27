import React from "react";
import ReactToPrint from "react-to-print";
import {
  Header,
  //  Overview,
  Azioni,
} from "shared-components";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";
import images from "themes/images";

class UseCode extends React.Component {
  state = {
    inputVal: "",
    popUpViz: false,
  };
  togglePopUp = (popUpViz) => {
    this.setState({ popUpViz });
  };
  inputHandler = (e) => {
    this.setState({ inputVal: e.target.value });
  };
  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      let btn = document.querySelector(".input-group-append");
      btn.click();
    }
  };
  componentDidMount() {
    let input = document.querySelector(".form-control");
    input.focus();
  }
  render() {
    const { inputVal, popUpViz } = this.state;
    const { paymentsFromCode, getCodiceTicket } = this.props;
    // console.log("paymentsFromCode", paymentsFromCode, inputVal);
    return (
      <div className="Container">
        {/* <Header></Header> */}
        {/* <Overview></Overview> */}
        <div className="container-fluid overview ">
          {/* <Azioni active="use-code"></Azioni> */}
          <div className="panels-container">
            <div className="sort-annunci max-width border-0 mb-0">
              <h1 className="heading-tab mx-auto mb-0">
                Utilizza codice VPTPlus
              </h1>
            </div>
            <div className="row no-gutters max-width">
              <div className="col-md-12 carica-conto">
                <p className="text-center">
                  Scrivi il codice o leggilo con apposito lettore
                </p>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    onChange={(e) => {
                      this.inputHandler(e);
                    }}
                    onKeyPress={this.handleKeyPress}
                    className="form-control"
                  />
                  <div
                    className="input-group-append"
                    onClick={() => {
                      this.props.getCodiceTicket(inputVal, "omeLale");
                      this.props.showModal("", inputVal);
                      // this.togglePopUp(true);
                    }}
                  >
                    <span className="input-group-text">
                      <i className="fal fa-check"></i>Esegui
                    </span>
                  </div>
                </div>
                <a href="/#" className="mx-auto d-block mt-5">
                  <img
                    className="mx-auto d-block"
                    src="img/redCancek.svg"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* <!--Chat icon botm right corner--> */}
        {/* <div className="chatSticky">
          <img src="img/chatSticky.svg" alt="" />
        </div> */}
      </div>
    );
  }
}

const mapsStateToProps = (state) => ({
  paymentsFromCode: state.auth.paymentsFromCode,
  skinExtras: state.auth.skinExtras,
});

export default connect(mapsStateToProps, { ...MainActions, ...AuthActions })(
  UseCode
);
