import React, { Component } from "react";
import { connect } from "react-redux";
import MainActions from "redux-store/models/main";
import AuthActions from "redux-store/models/auth";
import UserDoc from "./UserDoc";
import UserNoDoc from "./UserNoDoc";
import SingleUser from "./SingleUser";
import FastCarica from "./FastCarica";
import { get, isArray } from "lodash";
import AdminComp from "./AdminComp";
import AgentComp from "./AgetnComp";
import UserComp from "./UserComp";
import { Select, Pagination } from "antd";
import { Loader } from "shared-components";

import { switchUserStatus, transferMoney } from "services/auth";

const { Option } = Select;
const InitialState = {
  valueInput: "",
  password: "",
  confirm_password: "",
  mobileRowData: {},
  perPage: 25,
  page_number: 1,
  searchedVal: "",
};
class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = InitialState;
  }
  componentDidMount() {
    this.props.getUsers(null, null, 25, 1);
  }
  inpHandler = (e) => {
    this.setState({ valueInput: e.target.value });
  };
  switchCallBack = () => {
    this.setState({ isPopUpActive: false });
    this.props.getUsers(null, null, 25, this.state.page_number);
  };
  setRowData = (mobileRowData) => {
    this.setState({ mobileRowData });
  };
  handleSearch = (searchedVal) => {
    this.setState({ searchedVal });
  };
  resetState = () => {
    this.setState({
      changedInsegna: null,
      changedcomune: null,
      changedprovincia: null,
      changedcap: null,
      changednazione: null,
      changedpagamento_mensile: null,
      changedSede_operativa: null,
      changedCordinate: null,
      changeda_phone: null,
    });
  };
  updateUser = async () => {
    await this.props.updateUserDetail(
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
      this.state.confirm_password,
      "",
      this.resetState
    );
    await setTimeout(() => {
      this.props.userDetail && this.props.userDetail.role === "user"
        ? this.props.getUserByUserId(this.props.userDetail.id)
        : this.props.userDetail.role === "agent"
        ? this.props.getAgentByUserId(this.props.userDetail.id)
        : this.props.getUserDetail(this.props.userDetail.id);
      this.props.getUsers(null, null, 25, this.state.page_number);
    }, 100);
  };
  render() {
    const {
      userList,
      accountInfo,
      userDetail,
      DepositoPopup,
      total_pages,
      LoaderAU,
    } = this.props;
    const {
      valueInput,
      mobileRowData,
      perPage,
      page_number,
      searchedVal,
    } = this.state;
    const userWithPhoto = userList && userList.photo;
    const userNoPhoto = userList && userList.no_photo;
    const role = get(this.props.accountInfo, "profile.role.name");
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
              <div className="buttons">
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
              </div>
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
        {!LoaderAU ? (
          get(accountInfo, "profile.role.name") === "agency" ? (
            <React.Fragment>
              <div className="userList--Doc">
                <div className="title">Utenti</div>
                {((userWithPhoto && userWithPhoto.length > 0) ||
                  (userNoPhoto && userNoPhoto.length > 0)) && (
                  <div className="header">
                    <span className="headerId">Id</span>
                    <span>Name</span>
                    <span>codice fiscale</span>
                    <span>creato da</span>
                    <span>city</span>
                    <span>comune code</span>
                    <span className="seeMore">Documenti</span>
                  </div>
                )}

                {(userWithPhoto && userWithPhoto.length > 0) ||
                (userNoPhoto && userNoPhoto.length > 0) ? (
                  <React.Fragment>
                    {userWithPhoto.map((user) => {
                      return (
                        <UserDoc
                          page_number={page_number}
                          key={user.id}
                          user={user}
                        />
                      );
                    })}
                    {userNoPhoto.map((user) => {
                      return (
                        <UserNoDoc
                          page_number={page_number}
                          key={user.id}
                          user={user}
                        />
                      );
                    })}
                  </React.Fragment>
                ) : (
                  <div className="noUsers">
                    No utenti
                    <i className="fal fa-times text-danger ml-1"></i>
                  </div>
                )}
              </div>
            </React.Fragment>
          ) : (
            <div className="userList--AllUsers">
              <div className="title">
                Agenzie
                <FastCarica
                  searchedVal={searchedVal}
                  handleSearch={this.handleSearch}
                  users={userList}
                  page_number={page_number}
                />
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
                  return (
                    (user?.username
                      ?.toLowerCase()
                      .includes(searchedVal.toLowerCase()) ||
                      user?.rag_soc
                        ?.toLowerCase()
                        .includes(searchedVal.toLowerCase())) && (
                      <SingleUser
                        page_number={page_number}
                        setRowData={this.setRowData}
                        key={user.id}
                        user={user}
                      />
                    )
                  );
                })}
            </div>
          )
        ) : (
          <Loader />
        )}
        <div className="paginationWrapper">
          <Pagination
            onChange={(e) => {
              this.setState({ page_number: parseInt(e) }, () => {
                this.props.getUsers(null, null, perPage, e);
              });
            }}
            total={total_pages ? total_pages * 10 : 10}
          />
          <Select
            defaultValue={25}
            onChange={(e) => {
              this.setState({ perPage: parseInt(e) }, () => {
                this.props.getUsers(null, null, e, page_number);
              });
            }}
            value={this.state.perPage}
          >
            <Option value={10}>10 / Pagina</Option>
            <Option value={25}>25 / Pagina</Option>
            <Option value={50}>50 / Pagina</Option>
          </Select>
        </div>
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
                {userDetail.username}
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
                />
              ) : userDetail.role === "user" ? (
                <UserComp
                  state={this.state}
                  userDetail={userDetail}
                  handleChange={(name, value) => {
                    this.setState({ [name]: value });
                  }}
                />
              ) : (
                <AdminComp
                  state={this.state}
                  userDetail={userDetail}
                  handleChange={(name, value) => {
                    this.setState({ [name]: value });
                  }}
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
        {Object.keys(mobileRowData).length > 0 && (
          <React.Fragment>
            <div className="rowPopUp">
              <div className="rowPopUp--header">
                Dettagli
                <i
                  onClick={() => {
                    this.setRowData({});
                  }}
                  className="fa lfa-times"
                  aria-hidden="true"
                ></i>{" "}
              </div>
              <div className="rowPopUp--body">
                <div className="rowPopUp--body__item">
                  <span>Username</span>
                  <span>{mobileRowData.username}</span>
                </div>

                <div className="rowPopUp--body__item">
                  <span>Ultimo Login</span>
                  <span>{mobileRowData.last_login_time}</span>
                </div>
                <div className="rowPopUp--body__item">
                  <span>Ultimo Deposito</span>
                  <span>{mobileRowData.last_deposit}</span>
                </div>
                <div className="rowPopUp--body__item">
                  <span>Rag Sociale</span>
                  <span>{mobileRowData.rag_soc}</span>
                </div>
                <div className="rowPopUp--body__item">
                  <span>Cita</span>
                  <span className="text-right justify-content-start">
                    {mobileRowData.city}
                  </span>
                </div>
                <div className="rowPopUp--body__item">
                  <button
                    onClick={() => {
                      this.props.setDepositoPopup({
                        val: "deposit",
                        data: mobileRowData,
                        visibility: true,
                      });
                    }}
                  >
                    Deposito
                  </button>
                  <button
                    onClick={() => {
                      this.props.setDepositoPopup({
                        val: "withdraw",
                        data: mobileRowData,
                        visibility: true,
                      });
                    }}
                  >
                    Addebito
                  </button>
                </div>
              </div>
            </div>
            <div
              className="backDrop"
              onClick={() => {
                this.setRowData({});
              }}
            ></div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userList: state.main.userList.users,
  total_pages: state.main.userList.total_pages,
  accountInfo: state.auth.accountInfo,
  userDetail: state.auth.userDetail,
  agents: state.auth.agents,
  LoaderAU: state.main.LoaderAU,
  DepositoPopup: state.auth.DepositoPopup,
});
export default connect(mapStateToProps, { ...MainActions, ...AuthActions })(
  UsersList
);
