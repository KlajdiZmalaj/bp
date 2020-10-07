import React from "react";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";
import { isEqual } from "lodash";
import { notification } from "antd";
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
  componentDidUpdate(prevProp) {
    if (
      !isEqual(prevProp.paymentsFromCode, this.props.paymentsFromCode) &&
      !this.props.paymentsFromCode.errors &&
      this.props.paymentsFromCode.agency_name
    ) {
      this.props.showModal("", this.state.inputVal);
    }
    if (this.props.paymentsFromCode.errors) {
      notification["error"]({
        message: this.props.paymentsFromCode.message,
        description: Object.values(this.props.paymentsFromCode.errors),
      });
    }
  }
  render() {
    const { inputVal } = this.state;
    const { paymentsFromCode } = this.props;
    return (
      <div className="Container">
        <div className="container-fluid overview ">
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
