import React, { Component } from "react";
import { connect } from "react-redux";
import MainActions from "redux-store/models/main";
import { deleteImages } from "services/main.js";
import { Loader } from "shared-components";

class UserDoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopUpOpen: false,
    };
  }

  callBack = () => {
    this.props.getUsers(null, null, 25, this.props.page_number);
  };
  setPopUp = () => {
    this.setState({ isPopUpOpen: !this.state.isPopUpOpen });
  };

  render() {
    const { user, userPhotos, photoLoading } = this.props;
    const { isPopUpOpen } = this.state;
    //console.log("photoLoading", photoLoading);

    return (
      <React.Fragment>
        <div className="userList--Doc__user">
          <div className="body">
            <span>{user.id}</span>
            <span>{user.name}</span>
            <span>{user.codice_fiscale_ordinante}</span>
            <span>{user.created_at}</span>
            <span>{user.city}</span>
            <span>{user.comune_code}</span>
            <span
              className="seeMore"
              onClick={() => {
                this.props.getUserPhotos(user.id);
                this.setPopUp();
              }}
            >
              <i className="fal fa-eye"></i>
            </span>
          </div>
        </div>
        {isPopUpOpen && (
          <div className="popUp">
            <i
              className="fal fa-times"
              onClick={() => {
                this.setPopUp();
                this.props.setUserPhotos({});
              }}
            ></i>
            <div className="title">Images</div>
            {photoLoading ? (
              <Loader />
            ) : (
              <>
                {user.document_front && (
                  <img
                    src={userPhotos.front}
                    onClick={() => {
                      fetch(userPhotos.front)
                        .then((res) => {
                          return res.blob();
                        })
                        .then((blob) => {
                          // console.log("ca ka blob", blob);
                          window.open(URL.createObjectURL(blob), "_blank");
                        });
                    }}
                    alt={user.document_front}
                  />
                )}
                {user.document_back && (
                  <img
                    onClick={() => {
                      fetch(userPhotos.back)
                        .then((res) => {
                          return res.blob();
                        })
                        .then((blob) => {
                          // console.log("ca ka blob", blob);
                          window.open(URL.createObjectURL(blob), "_blank");
                        });
                    }}
                    src={userPhotos.back}
                    alt={user.document_back}
                  />
                )}
              </>
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
              this.props.setUserPhotos({});
            }}
          ></div>
        )}
      </React.Fragment>
    );
  }
}
const m = (state) => ({
  userPhotos: state.main.userPhotos,
  photoLoading: state.main.photoLoading,
});
export default connect(m, { ...MainActions })(UserDoc);
