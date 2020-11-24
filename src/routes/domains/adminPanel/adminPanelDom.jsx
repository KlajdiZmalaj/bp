import React from "react";
import AdminRightForm from "shared-components/adminSharedComp/adminRightForm/adminRightForm";
import AdminLeftForm from "shared-components/adminSharedComp/adminLeftForm/adminLeftForm";
import AdminHeader from "shared-components/adminSharedComp/adminHeader/adminHeader";
import { connect } from "react-redux";
import AdminRightFormStatisticheDetails from "shared-components/adminSharedComp/AdminRightFormStatDet/AdminRightFormStatisticheDetails";
import AdminRightFormUltimeDetails from "shared-components/adminSharedComp/AdminRightFormUltDet/AdminRightFormUltimeDetails";
import AdminRightFormWalletDetails from "shared-components/adminSharedComp/AdminRightFormWallDet/AdminRightFormWalletDetails";
import AuthActions from "redux-store/models/auth";
import ModalResponsiveForTables from "shared-components/ModalResponsiveForTables/ModalResponsiveForTables";
import ModalRow from "shared-components/ModalResponsiveForTables/ModalRow";
import DepositoModal from "shared-components/adminSharedComp/DepositoModal/DepositoModal";
import AdminComp from "../AccountInfo/AdminComp";
import AgentComp from "../AccountInfo/AgetnComp";
import UserComp from "../AccountInfo/UserComp";
import { Select } from "antd";
import MainActions from "redux-store/models/main";
import { Time } from "shared-components";
import { message } from "antd";
import "./adminStyles.css";
import { numberWithCommas } from "utils/HelperFunc";
import { allRoles, resetUserStateChangeFields } from "config/index";
import { switchUserStatus } from "services/auth";

const { Option } = Select;
const INITIAL_STATE = {
  menuSkinVisible: window.innerWidth <= 550 ? true : false,
  depositoActiveVisibility: true,
  addebitoActiveVisibility: false,
  ...resetUserStateChangeFields,
};

class AdminPanelDom extends React.Component {
  state = INITIAL_STATE;
  resetState = async (id) => {
    const role = this.props.userDetail.role;
    if (role === "user") {
      await this.props.getUserByUserId(id);
    } else if (role === "agency") {
      await this.props.getUserDetail(id);
    } else if (role === "agent") {
      await this.props.getAgentByUserId(id);
    }
    this.setState(resetUserStateChangeFields);
  };
  updateUser = () => {
    //s val from state , one that changed, p val from get request from registration form
    const s = this.state;
    const p = this.props.userDetail;
    this.props.updateUserDetail(
      p.id,
      s.changedphone || p.phone,
      (s.changeddocument_type || p.document_type).toString(),
      s.changeddocument_number || p.document_number,
      s.rilasciato_da || p.rilasciato_da,
      s.luogo_di_rilascio || p.luogo_di_rilascio,
      s.data_di_rilascio || p.data_di_rilascio,
      s.data_di_scadenza || p.data_di_scadenza,
      s.changedInsegna || p.insegna,
      s.changedCordinate || p.cordinate,
      s.changeda_phone || p.a_phone,
      s.changedSede_operativa || p.a_address || p.sede_operativa,
      s.changedcomune || p.a_city || p.comune,
      s.changedprovincia || p.provincia,
      s.changedcap || p.cap,
      s.changednazione || p.nazione,
      s.changedpagamento_mensile || p.pagamento_mensile,
      s.password,
      s.confirm_password,
      this.props.activeSkinId,
      this.resetState,
      {
        username: s.username || p.username,
        email: s.email || p.email,
        a_ragione_sociale: s.a_ragione_sociale || p.ragione_sociale,
        a_iva: s.a_iva || p.p_iva,
        first_name: s.first_name || p.first_name,
        last_name: s.last_name || p.last_name,
        birth_comune_code: s.birth_comune_code || p.birth_comune_code,
        birth_country: s.birth_country || p.birth_country,
        birth_place: s.birth_place || p.birth_place,
        birthday: s.birthday || p.birthday,
        city: s.city || p.city,
        gender: s.gender || p.gender,
        personal_number: s.personal_number || p.personal_number,
        ragione_sociale: s.ragione_sociale || p.ragione_sociale,
        p_iva: s.p_iva || p.p_iva,
        country: s.country || p.country,
        address: s.address || p.address,
        cap: s.cap || p.cap,
        comune_code: s.comune_code || p.comune_code,
      }
    );
  };
  componentDidMount() {
    this.props.getSkins();
    this.props.getStatistiche(this.props.activeSkinId);
    this.props.getWidgetPayments(this.props.activeSkinId);
    document.body.classList.add("bodyAdmin");
    if (this.props.screenWidth <= 550) {
      this.setState({ menuSkinVisible: true });
    } else {
      this.setState({ menuSkinVisible: false });
    }
    document.querySelector("#tabTheme").setAttribute("content", "#0078FF");
  }
  componentWillUnmount() {
    document.body.classList.remove("bodyAdmin");
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.menuSkinVisible === true &&
      this.props.screenWidth < 1024 &&
      this.props.screenWidth > 550
    ) {
      this.setState({ menuSkinVisible: false });
    }
    if (prevProps.screenWidth > 550 && this.props.screenWidth <= 550) {
      this.setState({ menuSkinVisible: true });
    }
    if (
      this.props.activeSkinId !== prevProps.activeSkinId &&
      this.props.screenWidth <= 1320
    ) {
      this.props.getStatistiche(this.props.activeSkinId);
      this.props.getWidgetPayments(this.props.activeSkinId);
    }
    if (
      this.state.menuSkinVisible !== prevState.menuSkinVisible ||
      this.props.screenWidth !== prevProps.screenWidth
    ) {
      !this.state.menuSkinVisible && this.props.screenWidth >= 1024
        ? this.props.setAdminPanelClass("Center")
        : this.props.screenWidth > 1024
        ? this.props.setAdminPanelClass("Center--Big")
        : this.props.setAdminPanelClass("Center--Big");
    }
  }
  render() {
    const {
      menuSkinVisible,
      depositoActiveVisibility,
      addebitoActiveVisibility,
    } = this.state;
    // console.log("ca ngel state", this.state);
    const {
      statModal,
      ultModal,
      screenWidth,
      depModal,
      editUltModal,
      editStatModal,
      editDepModal,
      utentiResModal,
      editUtentiRespModal,
      adminDepModal,
      setDepositoModalAdmin,
      userDetail,
      leUltimeTransazioniDet,
      accountInfo,
      activeSkinId,
    } = this.props;
    return (
      <React.Fragment>
        <div className="Admin-Panel">
          {userDetail && Object.keys(userDetail).length > 0 && (
            <React.Fragment>
              <div
                style={{ animationDuration: "0.5s" }}
                className={
                  "newReg userDetailPopup animated bounceIn" +
                  (this.state.isClosing ? "bounceOut" : "")
                }
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
                {userDetail?.role === "agent" ? (
                  <AgentComp
                    accountInfo={accountInfo}
                    state={this.state}
                    userDetail={userDetail}
                    updateUser={this.updateUser}
                    handleChange={(name, value) => {
                      this.setState({ [name]: value });
                    }}
                  />
                ) : userDetail?.role === "user" ? (
                  <UserComp
                    accountInfo={accountInfo}
                    updateUser={this.updateUser}
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
                  {userDetail.role !== "agent" && userDetail.role !== "user" ? (
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
                                  userDetail.id,
                                  this.props.activeSkinId
                                );
                              }}
                            >
                              <i
                                className="fal fa-check"
                                aria-hidden="true"
                              ></i>
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

          {utentiResModal?.visibility === true &&
          screenWidth <= 950 &&
          window.location.href.includes("utenti") ? (
            <ModalResponsiveForTables
              Close={() => {
                editUtentiRespModal({
                  visibility: false,
                  data: "",
                });
              }}
              Header={
                <React.Fragment>
                  <i className={`${allRoles[utentiResModal.data.role]}`} />
                  <span>{utentiResModal.data.username}</span>
                </React.Fragment>
              }
              beforeFooter={
                <ModalRow
                  title="Credito"
                  data={numberWithCommas(utentiResModal.data.wallet) + "€"}
                />
              }
              Footer={
                <span>
                  <button
                    onClick={() => {
                      this.props.setDepositoModalAdmin({
                        depositoModalVis: true,
                        type: "deposit",
                        username: utentiResModal.data.username,
                        id: utentiResModal.data.id,
                        Close: () => {
                          editUtentiRespModal({
                            visibility: false,
                            data: "",
                          });
                        },
                      });
                    }}
                  >
                    DEPOSITO
                  </button>
                  <button
                    onClick={() => {
                      this.props.setDepositoModalAdmin({
                        depositoModalVis: true,
                        type: "withdraw",
                        username: utentiResModal.data.username,
                        id: utentiResModal.data.id,
                        Close: () => {
                          editUtentiRespModal({
                            visibility: false,
                            data: "",
                          });
                        },
                      });
                    }}
                  >
                    ADDEBITO
                  </button>
                  <i
                    id="lock"
                    className={`fal fa-lock${
                      activeSkinId === -1 && utentiResModal.data.status === 0
                        ? "-alt"
                        : utentiResModal.data.status === 1 &&
                          activeSkinId !== -1
                        ? "-alt"
                        : "-open-alt active"
                    }`}
                    onClick={async () => {
                      const changeStatus = await (activeSkinId === -1 &&
                      utentiResModal.data.status === 1
                        ? 0
                        : utentiResModal.data.status === 1 &&
                          activeSkinId !== -1
                        ? 2
                        : 1);
                      await switchUserStatus(
                        utentiResModal.data.id,
                        changeStatus,
                        () => {
                          (changeStatus === 0 && activeSkinId === -1) ||
                          (changeStatus === 1 && activeSkinId !== -1)
                            ? message.error(
                                `lo stato dell${
                                  utentiResModal.data.username
                                } ${`è cambiato : 'DISATTIVATO'`}`
                              )
                            : message.success(
                                `lo stato dell${
                                  utentiResModal.data.username
                                } ${`è cambiato : 'ATTIVATO'`}`
                              );
                        },
                        accountInfo.role,
                        activeSkinId
                      );
                      if (this.props.activeSkinId === -1) {
                        await this.props.getUsers(
                          null,
                          {
                            skin_id: 1,
                          },
                          25,
                          1
                        );
                      } else {
                        await this.props.getUsers(
                          null,
                          {
                            skin_id: this.props.activeSkinId,
                            backoffice: true,
                          },
                          25,
                          1
                        );
                      }
                      await editUtentiRespModal({
                        visibility: false,
                        data: "",
                      });
                    }}
                  ></i>
                  {/* <i
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        utentiResModal.data && utentiResModal.data.role === "user"
                          ? this.props.getUserByUserId(
                            utentiResModal.data.id,
                              activeSkinId
                            )
                          : utentiResModal.data.role === "agent"
                          ? this.props.getAgentByUserId(
                            utentiResModal.data.id,
                              activeSkinId
                            )
                          : this.props.getUserDetail(utentiResModal.data.id, activeSkinId);
                      }}
                      className={`fal fa-eye${
                        this.state.eyeClicked === true ? "-slash active" : ""
                      }`}
                    ></i> */}
                </span>
              }
              Rows={
                <React.Fragment>
                  <ModalRow title="User Id" data={utentiResModal.data.id} />
                  {utentiResModal.data.city &&
                    utentiResModal.data.city !== "-" && (
                      <ModalRow title="City" data={utentiResModal.data.city} />
                    )}

                  <ModalRow
                    title="Rag Sociale"
                    data={utentiResModal.data.rag_soc}
                  />
                  <ModalRow title="Role" data={utentiResModal.data.role} />
                  <ModalRow
                    title="Ultimo Deposit"
                    data={utentiResModal.data.last_deposit}
                  />
                  <ModalRow
                    title="Ultimo Login"
                    data={utentiResModal.data.last_login_time}
                  />
                </React.Fragment>
              }
            />
          ) : null}
          {statModal?.visibility === true && screenWidth <= 1320 && (
            <AdminRightFormStatisticheDetails
              graphData={statModal.data.graphData}
              Tranzacioni={numberWithCommas(statModal.data.Tranzacioni)}
              Commisione={numberWithCommas(statModal.data.Commisione)}
              Proviggioni={numberWithCommas(statModal.data.Proviggioni)}
              ModalOrNo={true}
              menuSkinVisible={
                screenWidth <= 1320 && screenWidth >= 1024
                  ? menuSkinVisible
                  : true
              }
              Close={editStatModal}
            />
          )}
          {ultModal && ultModal.visibility === true && screenWidth <= 1320 && (
            <AdminRightFormUltimeDetails
              leUltimeTransazioniDet={ultModal.data.leUltimeTransazioniDet}
              ModalOrNo={true}
              menuSkinVisible={
                screenWidth <= 1320 && screenWidth >= 1024
                  ? menuSkinVisible
                  : true
              }
              Close={editUltModal}
            />
          )}
          {depModal && depModal.visibility === true && screenWidth <= 1320 && (
            <AdminRightFormWalletDetails
              menuSkinVisible={
                screenWidth <= 1320 && screenWidth >= 1024
                  ? menuSkinVisible
                  : true
              }
              handleDepositoVisibility={() => {
                this.setState({
                  depositoActiveVisibility: true,
                  addebitoActiveVisibility: false,
                });
              }}
              handleDebitoVisibility={() => {
                this.setState({
                  depositoActiveVisibility: false,
                  addebitoActiveVisibility: true,
                });
              }}
              addebitoActiveVisibility={addebitoActiveVisibility}
              depositoActiveVisibility={depositoActiveVisibility}
              ModalOrNo={true}
              Close={editDepModal}
            />
          )}
          <div className="TopHeader">
            <Time />
            <span className="creditoD">
              Credito : {accountInfo?.profile?.wallet}€{" "}
            </span>
            <span
              className="logOutBtn"
              onClick={() => {
                this.props.logOut();
                this.props.history.push("/login");
              }}
            >
              Log OUT
            </span>
          </div>

          <AdminHeader
            handleClick={() => {
              this.setState({
                menuSkinVisible:
                  screenWidth <= 550
                    ? !menuSkinVisible
                    : screenWidth >= 1024
                    ? !menuSkinVisible
                    : false,
              });
            }}
            history={this.props.history}
            location={this.props.location}
          />
          {screenWidth <= 550 && (
            <AdminHeader
              small={true}
              handleClick={() => {
                this.setState({
                  menuSkinVisible: false,
                });
              }}
              history={this.props.history}
              location={this.props.location}
            />
          )}
          <div className="AdminColumns">
            <div
              className={`${
                screenWidth <= 550
                  ? menuSkinVisible === true
                    ? "Left--Min"
                    : "Left"
                  : screenWidth < 1024
                  ? menuSkinVisible === false
                    ? "Left--Min"
                    : "Left--Min"
                  : menuSkinVisible === true
                  ? "Left--Min"
                  : "Left"
              }`}
            >
              {screenWidth <= 550 && (
                <div
                  className="backDrop LeftFormbD"
                  onClick={() => {
                    this.setState({ menuSkinVisible: true });
                  }}
                ></div>
              )}
              <AdminLeftForm
                visible={menuSkinVisible}
                history={this.props.history}
                setVisible={(visible) => {
                  this.setState({ menuSkinVisible: visible });
                }}
                small={screenWidth <= 550 ? true : false}
              />
            </div>
            <div
              className={`${
                !menuSkinVisible && screenWidth >= 1024
                  ? "Center"
                  : screenWidth > 1024
                  ? "Center--Big"
                  : "Center--Big"
              }`}
            >
              {adminDepModal?.depositoModalVis && (
                <DepositoModal
                  type={adminDepModal.type}
                  id={adminDepModal.id}
                  amountGiven={
                    adminDepModal?.amount ? adminDepModal.amount : null
                  }
                  username={adminDepModal.username}
                  Close={() => {
                    setDepositoModalAdmin({
                      depositoModalVis: false,
                      type: "deposit",
                      username: "",
                      id: "",
                    });
                  }}
                  SecondClose={adminDepModal.Close}
                />
              )}
              {this.props.component}
            </div>
            <AdminRightForm leUltimeTransazioniDet={leUltimeTransazioniDet} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  screenWidth: state.main.screenWidth,
  statModal: state.auth.statModal,
  ultModal: state.auth.ultModal,
  depModal: state.auth.depModal,
  openAdminModal: state.auth.openAdminModal,
  utentiResModal: state.auth.utentiResModal,
  adminDepModal: state.auth.adminDepModal,
  userDetail: state.auth.userDetail,
  agents: state.auth.agents,
  activeSkinId: state.main.activeSkinId,
  skinList: state.auth.skinList,
  leUltimeTransazioniDet: state.auth.leUltimeTransazioniDet,
  accountInfo: state.auth.accountInfo,
});
export default connect(mapStateToProps, { ...AuthActions, ...MainActions })(
  AdminPanelDom
);
