import React, { Component } from "react";

class UserDoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopUpOpen: false
    };
  }
  setPopUp = () => {
    this.setState({ isPopUpOpen: !this.state.isPopUpOpen });
  };
  render() {
    const { user } = this.props;
    const { isPopUpOpen } = this.state;
    return (
      <React.Fragment>
        <div
          className="userList--Doc__user"
          onClick={() => {
            this.setPopUp();
          }}
        >
          <div className="header">
            <span>Id</span>
            <span>Name</span>
            <span>codice fiscale</span>
            <span>creato da</span>
            <span>city</span>
            <span>comune code</span>
          </div>
          <div className="body">
            <span>{user.id}</span>
            <span>{user.name}</span>
            <span>{user.codice_fiscale_ordinante}</span>
            <span>{user.created_at}</span>
            <span>{user.city}</span>
            <span>{user.comune_code}</span>
          </div>
        </div>
        {isPopUpOpen && <div className="popUp"></div>}
        {isPopUpOpen && <div className="backDrop"></div>}
      </React.Fragment>
    );
  }
}

export default UserDoc;
