import React, { Component } from "react";
import { connect } from "react-redux";
import MainActions from "redux-store/models/main";
import { deleteImages } from "services/main.js";
class UserDoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopUpOpen: false,
    };
  }

  callBack = () => {
    this.props.getUsers();
  };
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
              className="fal fa-times"
              onClick={() => {
                this.setPopUp();
              }}
            ></i>
            <div className="title">Images</div>
            {user.document_front && (
              <img
                src={
                  "https://services-api.bpoint.store/storage/users/" +
                  user.document_front
                }
                onClick={() => {
                  window.open(
                    "https://services-api.bpoint.store/storage/users/" +
                      user.document_front,
                    "_blank"
                  );
                }}
                alt={user.document_front}
              />
            )}
            {user.document_back && (
              <img
                onClick={() => {
                  window.open(
                    "https://services-api.bpoint.store/storage/users/" +
                      user.document_back,
                    "_blank"
                  );
                }}
                src={
                  "https://services-api.bpoint.store/storage/users/" +
                  user.document_back
                }
                alt={user.document_back}
              />
            )}
            <div
              className="deleteDiv"
              onClick={() => {
                deleteImages(parseInt(user.id), () => {
                  this.callBack();
                });
              }}
            >
              Remove uploaded images <i className="far fa-trash-alt"></i>
            </div>
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

export default connect(null, { ...MainActions })(UserDoc);
