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
import AdminLoginDom from "../AdminLogin/AdminLoginDom";
import AdminLoginSkins from "../AdminLogin/AdminLoginSkins";
import { Time } from "shared-components";
import { message } from "antd";
import "./styles.css";
import { numberWithCommas } from "utils/HelperFunc";
import { allRoles } from "config/index";
import { switchUserStatus } from "services/auth";

const { Option } = Select;

class AdminPanelDom extends React.Component {
  state = {
    menuSkinVisible: window.innerWidth <= 550 ? true : false,
    depositoActiveVisibility: true,
    addebitoActiveVisibility: false,
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
      this.state.confirm_password,
      this.props.activeSkinId
    );
  };
  async componentDidMount() {
    await this.props.getSkins();
    await this.props.getStatistiche(this.props.activeSkinId);
    await this.props.getWidgetPayments(this.props.activeSkinId);
    document.body.classList.add("bodyAdmin");
    if (this.props.screenWidth <= 550) {
      this.setState({ menuSkinVisible: true });
    } else {
      this.setState({ menuSkinVisible: false });
    }
  }
  componentWillUnmount() {
    document.body.classList.remove("bodyAdmin");
  }
  componentDidUpdate(prevProps) {
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
      this.props.activeSkinId != prevProps.activeSkinId &&
      this.props.screenWidth < 1024
    ) {
      this.props.getStatistiche(this.props.activeSkinId);
      this.props.getWidgetPayments(this.props.activeSkinId);
    }
  }
  render() {
    const {
      menuSkinVisible,
      depositoActiveVisibility,
      addebitoActiveVisibility,
    } = this.state;
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
      skinList,
      updateMsg,
      goToAdminPanelVis,
      leUltimeTransazioniDet,
      accountInfo,
      activeSkinId,
    } = this.props;
    return (
      <React.Fragment>
        {goToAdminPanelVis === true ? (
          <div className="Admin-Panel">
            {userDetail && Object.keys(userDetail).length > 0 && (
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
                  {userDetail?.role === "agent" ? (
                    <AgentComp
                      state={this.state}
                      userDetail={userDetail}
                      handleChange={(name, value) => {
                        this.setState({ [name]: value });
                      }}
                      updateMsg={updateMsg}
                    />
                  ) : userDetail?.role === "user" ? (
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
                            activeSkinId != -1
                          ? "-alt"
                          : "-open-alt active"
                      }`}
                      onClick={async () => {
                        const changeStatus = await (activeSkinId === -1 &&
                        utentiResModal.data.status === 1
                          ? 0
                          : utentiResModal.data.status === 1 &&
                            activeSkinId != -1
                          ? 2
                          : 1);
                        await switchUserStatus(
                          utentiResModal.data.id,
                          changeStatus,
                          () => {
                            (changeStatus === 0 && activeSkinId === -1) ||
                            (changeStatus === 1 && activeSkinId != -1)
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
                          await this.props.getUsers(null, {
                            skin_id: 1,
                          });
                        } else {
                          await this.props.getUsers(null, {
                            skin_id: this.props.activeSkinId,
                            backoffice: true,
                          });
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
                      utentiResModal.data.city != "-" && (
                        <ModalRow
                          title="City"
                          data={utentiResModal.data.city}
                        />
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
            {statModal?.visibility === true && screenWidth < 1024 && (
              <AdminRightFormStatisticheDetails
                graphData={statModal.data.graphData}
                Tranzacioni={numberWithCommas(statModal.data.Tranzacioni)}
                Commisione={numberWithCommas(statModal.data.Commisione)}
                Proviggioni={numberWithCommas(statModal.data.Proviggioni)}
                ModalOrNo={true}
                Close={editStatModal}
              />
            )}
            {ultModal && ultModal.visibility === true && screenWidth < 1024 && (
              <AdminRightFormUltimeDetails
                leUltimeTransazioniDet={ultModal.data.leUltimeTransazioniDet}
                ModalOrNo={true}
                Close={editUltModal}
              />
            )}
            {depModal && depModal.visibility === true && screenWidth < 1024 && (
              <AdminRightFormWalletDetails
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
        ) : (
          <React.Fragment>
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
              history={this.props.history}
              location={this.props.location}
            />

            <AdminLoginDom
              component={<AdminLoginSkins skinList={skinList} />}
              goToAdminPanello={() => {
                // this.props.goToAdminPanel(true);
              }}
            />
          </React.Fragment>
        )}
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
  updateMsg: state.auth.updateMsg,
  activeSkinId: state.main.activeSkinId,
  goToAdminPanelVis: state.auth.goToAdminPanelVis,
  skinList: state.auth.skinList,
  leUltimeTransazioniDet: state.auth.leUltimeTransazioniDet,
  accountInfo: state.auth.accountInfo,
});
export default connect(mapStateToProps, { ...AuthActions, ...MainActions })(
  AdminPanelDom
);
