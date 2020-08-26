import React, { Component } from "react";
import { connect } from "react-redux";
import MainActions from "redux-store/models/main";
import AuthActions from "redux-store/models/auth";
import UserDoc from "./UserDoc";
import UserNoDoc from "./UserNoDoc";
import SingleUser from "./SingleUser";
import FastCarica from "./FastCarica";
import { get, isArray } from "lodash";
import { Select } from "antd";
import AdminComp from "./AdminComp";
import AgentComp from "./AgetnComp";
import UserComp from "./UserComp";

import { switchUserStatus, transferMoney } from "services/auth";

const { Option } = Select;

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueInput: "",
      password: "",
      confirm_password: "",
    };
  }
  componentDidMount() {
    this.props.getUsers();
  }
  inpHandler = (e) => {
    this.setState({ valueInput: e.target.value });
  };
  switchCallBack = () => {
    this.setState({ isPopUpActive: false });
    this.props.getUsers();
  };
  updateUser = () => {
    this.props.updateUserDetail(
      this.props.userDetail.id,
      this.state.changedphone || this.props.userDetail.phone,
      (
        this.state.changeddocument_type || this.props.userDetail.document_type
      ).toString(),
      this.state.changeddocument_number ||
        this.props.userDetail.document_number,
      this.state.rilasciato_da || this.props.userDetail.rilasciato_da,
      this.state.luogo_di_rilascio || this.props.userDetail.luogo_di_rilascio,
      this.state.data_di_rilascio || this.props.userDetail.data_di_rilascio,
      this.state.data_di_scadenza || this.props.userDetail.data_di_scadenza,
      this.state.changedInsegna || this.props.userDetail.insegna,
      this.state.changedCordinate || this.props.userDetail.cordinate,
      this.state.changeda_phone || this.props.userDetail.a_phone,
      this.state.changedSede_operativa || this.props.userDetail.sede_operativa,
      this.state.changedcomune || this.props.userDetail.comune,
      this.state.changedprovincia || this.props.userDetail.provincia,
      this.state.changedcap || this.props.userDetail.cap,
      this.state.changednazione || this.props.userDetail.nazione,
      this.state.changedpagamento_mensile ||
        this.props.userDetail.pagamento_mensile,
      this.state.password,
      this.state.confirm_password
    );
  };
  render() {
    const {
      userList,
      accountInfo,
      userDetail,
      updateMsg,
      DepositoPopup,
    } = this.props;
    const { valueInput } = this.state;
    const userWithPhoto = userList && userList.photo;
    const userNoPhoto = userList && userList.no_photo;
    const role = get(this.props.accountInfo, "profile.role.name");
    // console.log("userDetail", userDetail);
    return (
      <div className="userList">
        {DepositoPopup?.visibility === true ? (
          <React.Fragment>
            {" "}
            <div className="popUp">
              <div className="title">{DepositoPopup.val}</div>
              <p>
                Il credito verrà{" "}
                {DepositoPopup.val == "deposit" ? "aggiunto" : "rimosso"} al{" "}
                <span>
                  {DepositoPopup.data.username}{" "}
                  {DepositoPopup.data.role === "agency" && (
                    <i
                      className={
                        "fal fa-store" +
                        (DepositoPopup.data.status === 1
                          ? " text-success"
                          : " text-danger")
                      }
                    ></i>
                  )}
                  {DepositoPopup.data.role === "agent" && (
                    <i
                      className={
                        "fas fa-user-tie" +
                        (DepositoPopup.data.status === 1
                          ? " text-success"
                          : " text-danger")
                      }
                    ></i>
                  )}
                  {DepositoPopup.data.role === "user" && (
                    <i
                      className={
                        "fal fa-user" +
                        (DepositoPopup.data.status === 1
                          ? " text-success"
                          : " text-danger")
                      }
                    ></i>
                  )}
                </span>
              </p>
              <div className="inpgr">
                <div className="inplabel">Amount</div>
                <input
                  type="number"
                  placeholder="0.00€"
                  onChange={(e) => {
                    this.inpHandler(e);
                  }}
                />
              </div>

              <button
                className="sendInput"
                onClick={() => {
                  transferMoney(
                    DepositoPopup.data.id,
                    valueInput,
                    DepositoPopup.val,
                    this.switchCallBack,
                    role
                  );
                }}
              >
                <i className="fa fa-check"></i> Conferma
              </button>
              <button
                className="sendInput cancelInput"
                onClick={() => {
                  this.props.setDepositoPopup({
                    val: "",
                    data: "",
                    visibility: false,
                  });
                }}
              >
                <i className="fa fa-times"></i> Cancel
              </button>
              {DepositoPopup.data.status === 2 && (
                <p className="info">
                  <i className="fad fa-info-circle"></i> L'UTENTE È BLOCCATO
                </p>
              )}
            </div>
            <div
              className="backDrop"
              onClick={() => {
                this.props.setDepositoPopup({
                  val: "",
                  data: "",
                  visibility: false,
                });
              }}
            ></div>
          </React.Fragment>
        ) : null}
        {get(accountInfo, "profile.role.name") === "agency" ? (
          <React.Fragment>
            <div className="userList--Doc">
              <div className="title">Utenti con documenti</div>
              {userWithPhoto && userWithPhoto.length > 0 && (
                <div className="header">
                  <span className="headerId">Id</span>
                  <span>Name</span>
                  <span>codice fiscale</span>
                  <span>creato da</span>
                  <span>city</span>
                  <span>comune code</span>
                </div>
              )}

              {userWithPhoto && userWithPhoto.length > 0 ? (
                userWithPhoto.map((user) => {
                  return <UserDoc key={user.id} user={user} />;
                })
              ) : (
                <div className="noUsers">
                  Tutti gli utenti non hanno documenti
                  <i className="fal fa-times text-danger ml-1"></i>
                </div>
              )}
            </div>
            <div className="userList--noDoc">
              <div className="title"> Tutti gli utenti senza documenti</div>
              {userNoPhoto && userNoPhoto.length > 0 && (
                <div className="header">
                  <span>Id</span>
                  <span>Name</span>
                  <span>codice fiscale</span>
                  <span>creato da</span>
                  <span>city</span>
                  <span>comune code</span>
                </div>
              )}

              {userNoPhoto && userNoPhoto.length > 0 ? (
                userNoPhoto.map((user) => {
                  return <UserNoDoc key={user.id} user={user} />;
                })
              ) : (
                <div className="noUsers">
                  Tutti gli utenti hanno documenti
                  <i className="fal fa-check ml-1"></i>
                </div>
              )}
            </div>
          </React.Fragment>
        ) : (
          <div className="userList--AllUsers">
            <div className="title">
              Agenzie
              <FastCarica users={userList} />
            </div>
            <div className="header">
              <span>User Id</span>
              <span>Username</span>
              <span>Rag.Sociale</span>
              <span className="text-right">Credito</span>
              <span className="text-left">City</span>
              <span>Ultimo Deposit</span>
              <span>Ultimo Login</span>
              <span>Azioni</span>
            </div>
            {isArray(userList) &&
              (userList || []).map((user) => {
                return <SingleUser key={user.id} user={user} />;
              })}
          </div>
        )}
        {userDetail && userDetail.username && (
          <React.Fragment>
            <div
              className={
                "newReg userDetailPopup animated bounceIn" +
                (this.state.isClosing ? " bounceOut" : "")
              }
              style={{ animationDuration: "0.5s" }}
            >
              <div className="newReg--header">
                punta ancora di {userDetail.username}
                <div
                  className="closeBtn"
                  onClick={() => {
                    this.setState({ isClosing: true });

                    setTimeout(() => {
                      this.setState({ isClosing: false });
                      this.props.setUserDetail({});
                    }, 500);
                  }}
                >
                  <i className="fal fa-times" aria-hidden="true"></i>
                </div>
              </div>

              {userDetail.role === "agent" ? (
                <AgentComp
                  state={this.state}
                  userDetail={userDetail}
                  handleChange={(name, value) => {
                    this.setState({ [name]: value });
                  }}
                  updateMsg={updateMsg}
                />
              ) : userDetail.role === "user" ? (
                <UserComp
                  state={this.state}
                  userDetail={userDetail}
                  handleChange={(name, value) => {
                    this.setState({ [name]: value });
                  }}
                  updateMsg={updateMsg}
                />
              ) : (
                <AdminComp
                  state={this.state}
                  userDetail={userDetail}
                  handleChange={(name, value) => {
                    this.setState({ [name]: value });
                  }}
                  updateMsg={updateMsg}
                />
              )}

              <div className="newReg--row lastRow">
                {userDetail.role != "agent" && userDetail.role != "user" ? (
                  <React.Fragment>
                    <div className="newReg--row__col">Cambia Agente</div>
                    <div className="newReg--row__col checkCol">
                      {this.props.agents && (
                        <React.Fragment>
                          <Select
                            defaultValue={userDetail.agent_id}
                            onChange={(e) => {
                              this.setState({ agentSelected: e });
                            }}
                          >
                            {(this.props.agents || []).map((agent, id) => (
                              <Option key={id} value={agent.id}>
                                {agent.first_name} {agent.last_name} [
                                {`${agent.username}`}]
                              </Option>
                            ))}
                          </Select>
                          <button
                            onClick={() => {
                              this.props.changeAgent(
                                this.state.agentSelected,
                                userDetail.id
                              );
                            }}
                          >
                            <i className="fal fa-check" aria-hidden="true"></i>
                          </button>{" "}
                        </React.Fragment>
                      )}
                    </div>
                    <div className="newReg--row__col submitcol ml-auto">
                      <button
                        onClick={() => {
                          this.updateUser();
                        }}
                        className="SubmitButton"
                      >
                        Salva
                      </button>
                    </div>
                  </React.Fragment>
                ) : null}
              </div>
            </div>
            <div
              onClick={() => {
                this.setState({ isClosing: true });

                setTimeout(() => {
                  this.setState({ isClosing: false });
                  this.props.setUserDetail({});
                }, 500);
              }}
              className="backDrop"
            ></div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userList: state.main.userList,
  accountInfo: state.auth.accountInfo,
  userDetail: state.auth.userDetail,
  updateMsg: state.auth.updateMsg,
  agents: state.auth.agents,
  DepositoPopup: state.auth.DepositoPopup,
});
export default connect(mapStateToProps, { ...MainActions, ...AuthActions })(
  UsersList
);
