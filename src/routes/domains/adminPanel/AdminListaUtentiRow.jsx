import React from "react";
import "./styles.css";
import { connect } from "react-redux";
import ModalResponsiveForTables from "shared-components/ModalResponsiveForTables/ModalResponsiveForTables";
import ModalRow from "shared-components/ModalResponsiveForTables/ModalRow";
import moment from "moment";
import AdminListaUtentiRowForLoop from "./AdminListaUtentiRowForLoop";
import { allRoles } from "config/index";
class AdminListaUtentiRow extends React.Component {
  state = {
    activateChildren: false,
    lock: "",
    eyeClicked: false,
    plusVisibility: false,
    ModalRowVisibility: false,
    ModalRowDetails: "",
  };
  render() {
    const { itemList, screenWidth } = this.props;
    const {
      ModalRowDetails,
      ModalRowVisibility,
      activateChildren,
      lock,
      eyeClicked,
    } = this.state;
    return (
      <React.Fragment>
        {ModalRowVisibility === true && screenWidth <= 950 ? (
          <ModalResponsiveForTables
            Close={() =>
              this.setState({
                ModalRowVisibility: "",
                ModalRowDetails: false,
              })
            }
            Rows={
              <React.Fragment>
                <ModalRow title="User Id" data={ModalRowDetails.user_id} />
                <ModalRow title="Username" data={ModalRowDetails.username} />

                <ModalRow title="City" data={ModalRowDetails.city} />
                <ModalRow title="Credito" data={ModalRowDetails.credito} />
                <ModalRow
                  title="Rag Sociale"
                  data={ModalRowDetails.rag_sociale}
                />
                <ModalRow title="Role" data={ModalRowDetails.role} />
                <ModalRow
                  title="Ultimo Deposit"
                  data={moment(ModalRowDetails.ultimo_deposit).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )}
                />
                <ModalRow
                  title="Ultimo Login"
                  data={moment(ModalRowDetails.ultimo_login).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )}
                />
              </React.Fragment>
            }
          />
        ) : null}
        <div className="AdminListaUtentiRow--Complete">
          <div
            className={`AdminListaUtentiRow--Complete--Main ${
              itemList && itemList.children?.length > 0 ? "active" : ""
            }`}
            onClick={(e) => {
              if (screenWidth <= 950 && e.target.tagName != "I") {
                this.setState({
                  ModalRowVisibility: true,
                  ModalRowDetails: { ...itemList },
                });
              }
            }}
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
            Array.isArray(itemList.children) &&
            itemList.children?.length > 0 &&
            this.state.activateChildren === true &&
            itemList.children.map((child, i, arr) =>
              arr.length - 1 === i ? (
                <div
                  className="AdminListaUtentiRow--Complete--Main--Child children last"
                  key={child.user_id}
                >
                  <AdminListaUtentiRowForLoop itemList={child} last={false} />
                </div>
              ) : (
                <div
                  className="AdminListaUtentiRow--Complete--Main--Child children"
                  key={child.user_id}
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
export default connect(mstp, null)(AdminListaUtentiRow);
