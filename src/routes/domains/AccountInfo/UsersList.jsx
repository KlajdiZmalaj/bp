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
    const { userList } = this.props;
    const userWithPhoto = userList.photo;
    const userNoPhoto = userList.no_photo;
    console.log("userList", userWithPhoto, userNoPhoto);

    return (
      <div className="userList">
        <div className="userList--Doc">
          <div className="title">Users con doc</div>
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
            userWithPhoto.map(user => {
              return <UserDoc key={user.id} user={user} />;
            })
          ) : (
            <div className="noUsers">
              No users with photo <i className="fal fa-check"></i>
            </div>
          )}
        </div>
        <div className="userList--noDoc">
          <div className="title">No doc users</div>
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
            userNoPhoto.map(user => {
              return <UserNoDoc key={user.id} user={user} />;
            })
          ) : (
            <div className="noUsers">
              No users without photo <i className="fal fa-check"></i>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  userList: state.main.userList
});
export default connect(mapStateToProps, { ...MainActions })(UsersList);
