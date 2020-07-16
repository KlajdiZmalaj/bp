import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import "./style.scss";
import FormDetailPopup from "./FormDetailPopup";
class FormDetailsDomain extends Component {
  componentDidMount() {
    this.props.setTicketByTicketId({ data: null });
    this.props.getDataFormDetails();
  }
  render() {
    const { formDetails, TicketByTcketId } = this.props;
    const allRoles = {
      user: "fal fa-user text-success",
      agency: "fal fa-store text-success",
      agent: "fas fa-user-tie text-success",
      super_admin: "fal fa-store text-success",
    };
    return (
      <div>
        {TicketByTcketId ? <FormDetailPopup /> : null}
        <div className="accountInfo">
          <div className="contentAcc supportContent">
            <div className="userList">
              <div className="userList--AllUsers">
                <div className="header">
                  <span>Id</span>
                  <span>User</span>
                  <span>nome_agenzia</span>
                  <span>type</span>
                </div>
                {formDetails
                  ? formDetails.map((form) => {
                      return (
                        <div
                          className="userList--noDoc__user singleUser"
                          key={form.id}
                        >
                          <div className="body">
                            <span>{form.id}</span>
                            <span>
                              {form.role === "user" ||
                              form.role === "agency" ||
                              form.role === "agent" ||
                              form.role === "super_admin" ? (
                                <i className={allRoles[form.role]} />
                              ) : null}
                              {form.user}
                            </span>

                            <span>{form.nome_agenzia}</span>

                            <span>
                              {form.type}
                              <i
                                className="fal fa-eye"
                                aria-hidden="true"
                                onClick={() => {
                                  this.props.getTicketByTicketId(form.id);
                                }}
                              />
                            </span>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mstp = (state) => {
  return {
    formDetails: state.auth.formDetails,
    TicketByTcketId: state.auth.TicketByTcketId,
  };
};
export default connect(mstp, AuthActions)(FormDetailsDomain);
