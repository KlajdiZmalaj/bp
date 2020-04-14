import React, { Component } from "react";
import SingleUser from "./SingleUser";
import { connect } from "react-redux";
import { MainActions } from "redux-store/models";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getUsersSimple();
  }
  render() {
    const { userListSimple } = this.props;
    console.log("userListSimple", userListSimple);
    return (
      <div className="accountInfo">
        <div className="contentAcc">
          <div className="userList">
            <div className="userList--AllUsers">
              <div className="title">Users</div>
              <div class="header">
                <span>User Id</span>
                <span>Username</span>
                <span>Nome</span>
                <span className="text-right">Credito</span>
                <span>Totale speso</span>
                <span>Ultimo Deposit</span>
                <span>Ultimo Login</span>
                <span>Azioni</span>
              </div>
              {userListSimple.map((user) => {
                return (
                  <SingleUser
                    getUsers={this.props.getUsersSimple}
                    user={user}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapsStateToProps = (state) => ({
  userListSimple: state.main.userListSimple,
});

export default connect(mapsStateToProps, MainActions)(index);
