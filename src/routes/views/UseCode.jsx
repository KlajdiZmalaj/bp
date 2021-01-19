import React from "react";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";
import { isEqual, debounce } from "lodash";
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
    let input = document.querySelector(".inpT");
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
    const { paymentsO } = this.props;
    console.log("paymentsO", paymentsO);
    return (
      <>
        <div
          className="vptCont"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <input
            type="text"
            onChange={debounce(() => {
              if (document.querySelector("#inpVal").value.length > 0) {
                this.props.getCodiceTicket(
                  document.querySelector("#inpVal").value,
                  "omeLale"
                );
              }
            }, 400)}
            onKeyPress={this.handleKeyPress}
            id={"inpVal"}
            className="inpT animated slideInTop"
          />
          <i className="fal fa-barcode" aria-hidden="true"></i>
        </div>
        {/* <div
          className="latestBarcodes animated slideInUp"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {(paymentsO || []).slice(0, 5).map((item) => {
            return (
              <div
                key={item.barcode}
                className="latestBarcodes__item"
                onClick={() => {
                  this.props.getCodiceTicket(item.barcode, "omeLale");
                }}
              >
                <i className="fal fa-barcode" aria-hidden="true"></i>
                <span>{item.barcode}</span>
                <span>{item.service_name}</span>
              </div>
            );
          })}
        </div> */}
      </>
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
