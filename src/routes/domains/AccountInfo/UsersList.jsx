import React, { Component } from "react";
import { connect } from "react-redux";
import MainActions from "redux-store/models/main";
import AuthActions from "redux-store/models/auth";
import UserDoc from "./UserDoc";
import UserNoDoc from "./UserNoDoc";
import SingleUser from "./SingleUser";
import FastCarica from "./FastCarica";
import { get, isArray, isString } from "lodash";
import moment from "moment";
import { Select, DatePicker } from "antd";
const { Option } = Select;

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirm_password: "",
    };
  }
  componentDidMount() {
    this.props.getUsers();
  }
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
    const { userList, accountInfo, userDetail, updateMsg } = this.props;
    const userWithPhoto = userList && userList.photo;
    const userNoPhoto = userList && userList.no_photo;
    console.log("userDetail", userDetail);

    return (
      <div className="userList">
        {get(accountInfo, "profile.role.name") === "agency" ? (
          <React.Fragment>
            <div className="userList--Doc">
              <div className="title">Utenti con documenti</div>
              {userWithPhoto && userWithPhoto.length > 0 && (
                <div className="header">
                  <span>Id</span>
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
                    }, 600);
                  }}
                >
                  <i className="fal fa-times" aria-hidden="true"></i>
                </div>
              </div>

              <div className="newReg--row">
                <div className="newReg--row__col">
                  <div className="itemCol full">
                    <div className="inputLabel">Ragione Sociale</div>
                    <input
                      value={userDetail.ragione_sociale}
                      className="ant-input"
                      type="text"
                      readOnly
                    />
                  </div>
                  <div className="itemCol semi">
                    <div className="inputLabel">Insegna</div>
                    <input
                      onChange={(e) => {
                        this.setState({ changedInsegna: e.target.value });
                      }}
                      value={this.state.changedInsegna || userDetail.insegna}
                      className="ant-input"
                      type="text"
                    />
                  </div>
                  <div className="itemCol semi">
                    <div className="inputLabel">Cordinate</div>
                    <input
                      onChange={(e) => {
                        this.setState({ changedCordinate: e.target.value });
                      }}
                      value={
                        this.state.changedCordinate ||
                        userDetail.cordinate ||
                        "0"
                      }
                      className="ant-input"
                      type="text"
                    />
                  </div>
                  <div className="itemCol full">
                    <div className="inputLabel">Telefono Agenzia</div>
                    <input
                      onChange={(e) => {
                        this.setState({ changeda_phone: e.target.value });
                      }}
                      value={this.state.changeda_phone || userDetail.a_phone}
                      className="ant-input"
                      type="text"
                    />
                  </div>
                  <div className="itemCol full">
                    <div className="inputLabel">Sede Operativa</div>
                    <input
                      onChange={(e) => {
                        this.setState({
                          changedSede_operativa: e.target.value,
                        });
                      }}
                      value={
                        this.state.changedSede_operativa ||
                        userDetail.sede_operativa
                      }
                      className="ant-input"
                      type="text"
                    />
                  </div>
                  <div className="itemCol semi">
                    <div className="inputLabel">Comune</div>
                    <input
                      onChange={(e) => {
                        this.setState({
                          changedcomune: e.target.value,
                        });
                      }}
                      value={this.state.changedcomune || userDetail.comune}
                      className="ant-input"
                      type="text"
                    />
                  </div>
                  <div className="itemCol semi">
                    <div className="inputLabel">Cap</div>
                    <input
                      onChange={(e) => {
                        this.setState({
                          changedcap: e.target.value,
                        });
                      }}
                      value={this.state.changedcap || userDetail.cap}
                      className="ant-input"
                      type="text"
                    />
                  </div>
                  <div className="itemCol semi">
                    <div className="inputLabel">Provincia di residenza: *</div>
                    <input
                      onChange={(e) => {
                        this.setState({
                          changedprovincia: e.target.value,
                        });
                      }}
                      value={
                        this.state.changedprovincia || userDetail.provincia
                      }
                      className="ant-input"
                      type="text"
                    />
                  </div>
                  <div className="itemCol semi">
                    <div className="inputLabel">Nazione di residenza: *</div>
                    <input
                      onChange={(e) => {
                        this.setState({
                          changednazione: e.target.value,
                        });
                      }}
                      value={
                        this.state.changednazione || userDetail.nazione || " "
                      }
                      className="ant-input"
                      type="text"
                    />
                  </div>
                  <div className="itemCol semi">
                    <div className="inputLabel">P.Iva: *</div>
                    <input
                      onChange={(e) => {
                        this.setState({
                          changedp_iva: e.target.value,
                        });
                      }}
                      value={this.state.p_iva || userDetail.p_iva}
                      className="ant-input"
                      type="text"
                      readOnly
                    />
                  </div>
                  <div className="itemCol semi">
                    <div className="inputLabel">Pagamento Mensile *</div>
                    <input
                      onChange={(e) => {
                        this.setState({
                          changedpagamento_mensile: e.target.value,
                        });
                      }}
                      value={
                        this.state.changedpagamento_mensile ||
                        userDetail.pagamento_mensile
                      }
                      className="ant-input"
                      type="text"
                    />
                  </div>
                </div>
                <div className="newReg--row__col">
                  <div className="itemCol full">
                    <div className="inputLabel">Nickname</div>
                    <input
                      value={userDetail.username}
                      className="ant-input"
                      type="text"
                      readOnly
                    />
                  </div>
                  <div className="itemCol full">
                    <div className="inputLabel">Password</div>
                    <input
                      className="ant-input"
                      onChange={(e) => {
                        this.setState({ password: e.target.value });
                      }}
                      type="password"
                    />
                  </div>
                  <div className="itemCol full">
                    <div className="inputLabel">Conferma password</div>
                    <input
                      className="ant-input"
                      type="password"
                      onChange={(e) => {
                        this.setState({ confirm_password: e.target.value });
                      }}
                    />
                  </div>
                  <div className="itemCol full">
                    <div className="inputLabel">Cellulare</div>
                    <input
                      onChange={(e) => {
                        this.setState({
                          changedphone: e.target.value,
                        });
                      }}
                      value={this.state.changedphone || userDetail.phone}
                      className="ant-input"
                      type="text"
                    />
                  </div>
                  <div className="itemCol full">
                    <div className="inputLabel">Tipo Documento</div>
                    <Select
                      onChange={(changeddocument_type) => {
                        this.setState({
                          changeddocument_type,
                        });
                      }}
                      defaultValue={
                        (this.state.changeddocument_type &&
                          this.state.changeddocument_type.toString()) ||
                        (userDetail.document_type &&
                          userDetail.document_type.toString())
                      }
                    >
                      <Option value="1">Carta di identita</Option>
                      <Option value="2">Patenta di guida</Option>
                      <Option value="3">Passaporto</Option>
                    </Select>
                  </div>
                  <div className="itemCol full">
                    <div className="inputLabel">Numero Documento</div>
                    <input
                      onChange={(e) => {
                        this.setState({
                          changeddocument_number: e.target.value,
                        });
                      }}
                      value={
                        this.state.changeddocument_number ||
                        userDetail.document_number
                      }
                      className="ant-input"
                      type="text"
                    />
                  </div>
                  <div className="itemCol semi">
                    <div className="inputLabel">Rilasciato da:</div>

                    <Select
                      onChange={(rilasciato_da) => {
                        this.setState({
                          rilasciato_da,
                        });
                      }}
                      defaultValue={
                        (this.state.rilasciato_da &&
                          this.state.rilasciato_da.toString()) ||
                        (userDetail.rilasciato_da &&
                          userDetail.rilasciato_da.toString())
                      }
                    >
                      <Option value="1">Comune</Option>
                      <Option value="10">Motorizzazione</Option>
                      <Option value="13">Questura</Option>
                      <Option value="14">Polizia</Option>
                      <Option value="16">Commissariato</Option>
                      <Option value="19">Altro</Option>
                    </Select>
                  </div>
                  <div className="itemCol semi">
                    <div className="inputLabel">Luogo di rilascio:</div>
                    <input
                      onChange={(e) => {
                        this.setState({
                          luogo_di_rilascio: e.target.value,
                        });
                      }}
                      value={
                        this.state.luogo_di_rilascio ||
                        userDetail.luogo_di_rilascio ||
                        ""
                      }
                      className="ant-input"
                      type="text"
                    />
                  </div>
                  <div className="itemCol semi">
                    <div className="inputLabel">Data di rilascio:</div>
                    <DatePicker
                      onChange={(data_di_rilascio) => {
                        this.setState({ data_di_rilascio });
                      }}
                      defaultValue={
                        moment(this.state.data_di_rilascio) ||
                        moment(userDetail.data_di_rilascio)
                      }
                      format={("DD/MM/YYYY", "DD/MM/YYYY")}
                    />
                  </div>
                  <div className="itemCol semi">
                    <div className="inputLabel">Data di scadenza:</div>
                    <DatePicker
                      onChange={(data_di_scadenza) => {
                        this.setState({ data_di_scadenza });
                      }}
                      defaultValue={
                        moment(this.state.data_di_scadenza) ||
                        moment(userDetail.data_di_scadenza)
                      }
                      format={("DD/MM/YYYY", "DD/MM/YYYY")}
                    />
                  </div>
                  <div className="itemCol full">
                    {isString(updateMsg) && updateMsg && (
                      <div className="Nmessage S">{updateMsg}</div>
                    )}
                    {updateMsg.errorMsg && (
                      <div className="Nmessage E">{updateMsg.errorMsg}</div>
                    )}
                    {updateMsg.errors &&
                      Object.values(updateMsg.errors).map((error) => (
                        <div className="Nmessage E">{error}</div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="newReg--row lastRow">
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
              </div>
            </div>
            <div
              onClick={() => {
                this.setState({ isClosing: true });

                setTimeout(() => {
                  this.setState({ isClosing: false });
                  this.props.setUserDetail({});
                }, 600);
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
});
export default connect(mapStateToProps, { ...MainActions, ...AuthActions })(
  UsersList
);
