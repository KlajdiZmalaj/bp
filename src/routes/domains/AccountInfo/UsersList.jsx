import React, { Component } from "react";
import { connect } from "react-redux";
import MainActions from "redux-store/models/main";
import UserDoc from "./UserDoc";
import UserNoDoc from "./UserNoDoc";

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const x = new Array(3).fill("user");
    return (
      <div className="userList">
        <div className="userList--noDoc">
          {x.map(user => {
            return <UserDoc name={user} />;
          })}
        </div>
        <div className="userList--Doc">
          {x.map(user => {
            return <UserNoDoc name={user} />;
          })}
        </div>
      </div>
    );
  }
}

export default connect(null, { ...MainActions })(UsersList);
