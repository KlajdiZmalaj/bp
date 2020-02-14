import React, { Component } from "react";

class UserDoc extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { name } = this.props;
    return <div className="userList--noDoc__user">{name}</div>;
  }
}

export default UserDoc;
