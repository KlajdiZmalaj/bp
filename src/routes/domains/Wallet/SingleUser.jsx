import React, { Component } from "react";
class SingleUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { user } = this.props;
    return (
      <div className="userList--noDoc__user singleUser">
        <div className="body">
          <span>{user.id}</span>
          <span className="text-left justify-content-start">
            {" "}
            <i
              className={
                "fas fa-user-alt pr-2 d-flex align-items-center " +
                (user.stats === 1 ? "text-success" : "text-danger")
              }
              aria-hidden="true"
            ></i>{" "}
            {user.username}
          </span>
          <span>{user.full_name}</span>
          <span className="text-right justify-content-end">
            {user.credito}€
          </span>
          <span>{user.totale_speso}</span>
          <span>{user.last_deposit}</span>
          <span>{user.last_login}</span>
          <span>
            <button>Credito</button>
            <button>Debito</button>
            <i className="fal fa-lock" aria-hidden="true"></i>
            <i className="fal fa-eye" aria-hidden="true"></i>
          </span>
        </div>
      </div>
    );
  }
}

export default SingleUser;
