import React, { Component } from "react";
import { connect } from "react-redux";
import MainActions from "redux-store/models/main";
import AuthActions from "redux-store/models/auth";
import UserDoc from "./UserDoc";
import UserNoDoc from "./UserNoDoc";
import SingleUser from "./SingleUser";
import FastCarica from "./FastCarica";
import { get, isArray } from "lodash";
class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { userList, accountInfo } = this.props;
    const userWithPhoto = userList.photo;
    const userNoPhoto = userList.no_photo;
    console.log("userList", userWithPhoto, userNoPhoto, userList, accountInfo);

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
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userList: state.main.userList,
  accountInfo: state.auth.accountInfo,
});
export default connect(mapStateToProps, { ...MainActions, ...AuthActions })(
  UsersList
);
