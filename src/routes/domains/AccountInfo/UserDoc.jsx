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
          <div className="body">
            <span>{user.id}</span>
            <span>{user.name}</span>
            <span>{user.codice_fiscale_ordinante}</span>
            <span>{user.created_at}</span>
            <span>{user.city}</span>
            <span>{user.comune_code}</span>
          </div>
        </div>
        {isPopUpOpen && (
          <div className="popUp">
            <i
              class="fal fa-times"
              onClick={() => {
                this.setPopUp();
              }}
            ></i>
            <div className="title">Images</div>
            {user.document_front && (
              <img
                src={
                  "https://services-api.bpoint.store/storage/" +
                  user.document_front
                }
                alt={user.document_front}
              />
            )}
            {user.document_back && (
              <img
                src={
                  "https://services-api.bpoint.store/storage/" +
                  user.document_back
                }
                alt={user.document_back}
              />
            )}
          </div>
        )}
        {isPopUpOpen && (
          <div
            className="backDrop"
            onClick={() => {
              this.setPopUp();
            }}
          ></div>
        )}
      </React.Fragment>
    );
  }
}

export default UserDoc;
