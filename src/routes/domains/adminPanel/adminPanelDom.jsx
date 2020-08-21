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
import {
  graphData,
  Tranzacioni,
  Commisione,
  Proviggioni,
  leUltimeTransazioniDet,
} from "./StaticAdminData";
import "./styles.css";
import { numberWithCommas } from "utils/HelperFunc";

const { Option } = Select;
class AdminPanelDom extends React.Component {
  state = {
    menuSkinVisible: false,
    depositoActiveVisibility: true,
    addebitoActiveVisibility: false,
  };
  componentDidMount() {
    this.props.getSkins();
    this.props.getAgents();
    document.body.classList.add("bodyAdmin");
  }
  componentWillUnmount() {
    document.body.classList.remove("bodyAdmin");
  }
  componentDidUpdate() {
    if (this.state.menuSkinVisible === true && this.props.screenWidth <= 1320) {
      this.setState({ menuSkinVisible: false });
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
      agents,
      updateMsg,
    } = this.props;
    console.log(agents);
    return (
      <React.Fragment>
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
                                  userDetail.id
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

          {utentiResModal?.visibility === true && screenWidth <= 950 ? (
            <ModalResponsiveForTables
              Close={() => {
                editUtentiRespModal({
                  visibility: false,
                  data: "",
                });
              }}
              Rows={
                <React.Fragment>
                  <ModalRow
                    title="User Id"
                    data={utentiResModal.data.user_id}
                  />
                  <ModalRow
                    title="Username"
                    data={utentiResModal.data.username}
                  />

                  <ModalRow title="City" data={utentiResModal.data.city} />
                  <ModalRow
                    title="Credito"
                    data={utentiResModal.data.credito}
                  />
                  <ModalRow
                    title="Rag Sociale"
                    data={utentiResModal.data.rag_sociale}
                  />
                  <ModalRow title="Role" data={utentiResModal.data.role} />
                  <ModalRow
                    title="Ultimo Deposit"
                    data={utentiResModal.data.ultimo_deposit}
                  />
                  <ModalRow
                    title="Ultimo Login"
                    data={utentiResModal.data.ultimo_login}
                  />
                </React.Fragment>
              }
            />
          ) : null}
          {statModal?.visibility === true && screenWidth <= 1050 && (
            <AdminRightFormStatisticheDetails
              graphData={statModal.data.graphData}
              Tranzacioni={numberWithCommas(statModal.data.Tranzacioni)}
              Commisione={numberWithCommas(statModal.data.Commisione)}
              Proviggioni={numberWithCommas(statModal.data.Proviggioni)}
              ModalOrNo={true}
              Close={editStatModal}
            />
          )}
          {ultModal && ultModal.visibility === true && screenWidth <= 1050 && (
            <AdminRightFormUltimeDetails
              leUltimeTransazioniDet={ultModal.data.leUltimeTransazioniDet}
              ModalOrNo={true}
              Close={editUltModal}
            />
          )}
          {depModal && depModal.visibility === true && screenWidth <= 1050 && (
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
          <AdminHeader
            history={this.props.history}
            location={this.props.location}
          />
          <div className="AdminColumns">
            <div
              className={`${
                menuSkinVisible === false && screenWidth <= 1320
                  ? "Left--Min"
                  : menuSkinVisible === true
                  ? "Left--Min"
                  : "Left"
              }`}
            >
              <AdminLeftForm
                graphData={graphData}
                leUltimeTransazioniDet={leUltimeTransazioniDet}
                Tranzacioni={numberWithCommas(Tranzacioni)}
                Commisione={numberWithCommas(Commisione)}
                Proviggioni={numberWithCommas(Proviggioni)}
                handleClick={() => {
                  this.setState({
                    menuSkinVisible:
                      screenWidth >= 1320 ? !menuSkinVisible : false,
                  });
                }}
                visible={menuSkinVisible}
              />
            </div>
            <div
              className={`${
                !menuSkinVisible && screenWidth >= 1320
                  ? "Center"
                  : screenWidth >= 1320
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
                />
              )}
              {this.props.component}
            </div>
            <AdminRightForm
              graphData={graphData}
              leUltimeTransazioniDet={leUltimeTransazioniDet}
              Tranzacioni={numberWithCommas(Tranzacioni)}
              Commisione={numberWithCommas(Commisione)}
              Proviggioni={numberWithCommas(Proviggioni)}
            />
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
  updateMsg: state.auth.updateMsg,
});
export default connect(mapStateToProps, { ...AuthActions, ...MainActions })(
  AdminPanelDom
);
