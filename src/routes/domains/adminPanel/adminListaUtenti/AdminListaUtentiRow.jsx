import React from "react";
import { connect } from "react-redux";
import AdminListaUtentiRowForLoop from "./AdminListaUtentiRowForLoop";
import AuthActions from "redux-store/models/auth";
import { allRoles } from "config/index";
import SpanFormater from "shared-components/SpanFormater/SpanFormater";

class AdminListaUtentiRow extends React.Component {
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
              />
            </span>
            <SpanFormater
              Word={itemList.rag_soc}
              size={screenWidth <= 1600 ? 13 : 17}
              nrOfRows={2}
              formatWord={true}
            />
            <SpanFormater Word={itemList.wallet} size={8} nrOfRows={1} />
            <SpanFormater
              Word={itemList.city}
              size={screenWidth <= 1600 ? 8 : 11}
              nrOfRows={1}
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
            Array.isArray(itemList.children) &&
            itemList.children?.length > 0 &&
            this.state.activateChildren === true &&
            itemList.children.map((child, i, arr) =>
              arr.length - 1 === i ? (
                <div
                  className="AdminListaUtentiRow--Complete--Main--Child children last"
                  key={child.id}
                >
                  <AdminListaUtentiRowForLoop itemList={child} last={false} />
                </div>
              ) : (
                <div
                  className="AdminListaUtentiRow--Complete--Main--Child children"
                  key={child.id}
                >
                  <AdminListaUtentiRowForLoop itemList={child} last={true} />
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
export default connect(mstp, AuthActions)(AdminListaUtentiRow);
