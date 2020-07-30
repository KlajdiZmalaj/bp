import React from "react";
import "./styles.css";

import AdminListaUtentiRow from "./AdminListaUtentiRow";
class AdminListaUtentiRowForLoop extends React.Component {
  state = {
    activateChildren: false,
    lock: "",
    eyeClicked: false,
    plusVisibility: false,
  };

  render() {
    const allRoles = {
      user: "fal fa-user",
      agency: "fas fa-store",
      agent: "fas fa-user-tie",
      super_admin: "fas fa-store",
    };
    const { itemList } = this.props;
    console.log(itemList.children);

    const { activateChildren, lock, eyeClicked } = this.state;
    return (
      <div className="AdminListaUtentiRow--Complete">
        <div
          className={`AdminListaUtentiRow--Complete--Main ${
            itemList && itemList.children?.length > 0 ? "active" : ""
          }`}
        >
          <span>{itemList.user_id}</span>

          <span>
            <i
              className={`fal fa-${
                this.state.plusVisibility === false ? "plus" : "minus"
              }-square`}
              onClick={() => {
                this.setState({
                  plusVisibility: !this.state.plusVisibility,
                  activateChildren: !activateChildren,
                });
              }}
            ></i>
            <div className="Link"></div>

            <i className={`${allRoles[itemList.role]}`} />

            {itemList.username}
          </span>
          <span>{itemList.rag_sociale}</span>
          <span>{itemList.credito}</span>
          <span>{itemList.city}</span>
          <span>{itemList.ultimo_deposit}</span>
          <span>{itemList.ultimo_login}</span>
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
                this.setState({ eyeClicked: !eyeClicked });
              }}
            ></i>
          </span>
        </div>
        {itemList &&
          itemList.children?.length > 0 &&
          this.state.activateChildren === true &&
          itemList.children.map((child, i, arr) =>
            arr.length - 1 === i ? (
              <div className="AdminListaUtentiRow--Complete--Main--Child children Last">
                <AdminListaUtentiRow itemList={child} />
              </div>
            ) : (
              <div className="AdminListaUtentiRow--Complete--Main--Child children ">
                <AdminListaUtentiRow itemList={child} />
              </div>
            )
          )}
      </div>
    );
  }
}
export default AdminListaUtentiRowForLoop;
