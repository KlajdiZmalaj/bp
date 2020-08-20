import React from "react";
import { connect } from "react-redux";
import AdminListaUtentiRow from "./AdminListaUtentiRow";
import AuthActions from "redux-store/models/auth";
import { allRoles } from "config/index";
import SpanFormater from "shared-components/SpanFormater/SpanFormater";
import { numberWithCommas } from "utils/HelperFunc";

class AdminListaUtentiRowForLoop extends React.Component {
  state = {
    activateChildren: false,
    lock: "",
    eyeClicked: false,
    plusVisibility: false,
  };
  render() {
    const { itemList, screenWidth, editUtentiRespModal } = this.props;
    const { lock } = this.state;
    return (
      <React.Fragment>
        <div className="AdminListaUtentiRow--Complete">
          <div
            className={`AdminListaUtentiRow--Complete--Main ${
              itemList && itemList.children?.length > 0 ? "active" : ""
            }`}
            onClick={(e) => {
              if (screenWidth <= 950 && e.target.tagName != "I") {
                editUtentiRespModal({
                  visibility: true,
                  data: { ...itemList },
                });
              }
            }}
          >
            <span>{itemList.id}</span>
            <span>
              <i
                className={`fal fa-${
                  this.state.plusVisibility === false ? "plus" : "minus"
                }-square`}
                onClick={() => {
                  this.setState((state) => ({
                    plusVisibility: !state.plusVisibility,
                    activateChildren: !state.activateChildren,
                  }));
                }}
              ></i>
              <div className="Link"></div>
              <i className={`${allRoles[itemList.role]}`} />
              <SpanFormater
                myClassName="Username"
                Word={itemList.username}
                size={screenWidth <= 420 ? 7 : screenWidth <= 1600 ? 12 : 17}
                nrOfRows={2}
                formatWord={true}
              />{" "}
            </span>
            <SpanFormater
              Word={itemList.rag_soc}
              size={17}
              nrOfRows={2}
              formatWord={true}
            />
            <SpanFormater
              Word={numberWithCommas(itemList.wallet)}
              size={8}
              nrOfRows={2}
            />
            <SpanFormater
              Word={itemList.city}
              size={10}
              nrOfRows={2}
              formatWord={true}
            />
            <span>{itemList.last_deposit}</span>
            <span>{itemList.last_login_time}</span>
            <span>
              <button>DEPOSITO</button>
              <button>ADDEBITO</button>
              <i
                id="lock"
                className={`fal fa-lock${
                  this.state.lock === "" ? "-alt" : "-open-alt active"
                }`}
                onClick={() => {
                  lock === ""
                    ? this.setState({ lock: "open" })
                    : this.setState({ lock: "" });
                }}
              ></i>
              <i
                className={`fal fa-eye${
                  this.state.eyeClicked === true ? "-slash active" : ""
                }`}
                onClick={() => {
                  this.setState((state) => ({ eyeClicked: !state.eyeClicked }));
                }}
              ></i>
            </span>
          </div>
          {itemList &&
            itemList.children?.length > 0 &&
            Array.isArray(itemList.children) &&
            this.state.activateChildren === true &&
            itemList.children.map((child, i, arr) =>
              arr.length - 1 === i ? (
                <div
                  className="AdminListaUtentiRow--Complete--Main--Child children Last"
                  key={child.id}
                >
                  <AdminListaUtentiRow itemList={child} />
                </div>
              ) : (
                <div
                  className="AdminListaUtentiRow--Complete--Main--Child children "
                  key={child.id}
                >
                  <AdminListaUtentiRow itemList={child} />
                </div>
              )
            )}
        </div>
      </React.Fragment>
    );
  }
}
const mstp = (state) => ({
  screenWidth: state.main.screenWidth,
});
export default connect(mstp, AuthActions)(AdminListaUtentiRowForLoop);
