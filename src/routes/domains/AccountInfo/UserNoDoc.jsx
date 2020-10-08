import React, { Component } from "react";
import { connect } from "react-redux";
import MainActions from "redux-store/models/main";
import { postImages } from "services/main.js";
import { readFile } from "utils";

class UserDoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopUpOpen: false,
      loading: false,
      imageUrl: "",
      imageUrl2: "",
    };
  }

  handleChangeFront = (imageUrl) => {
    this.setState({
      imageUrl,
      loading: false,
    });
  };
  handleChangeBack = (imageUrl2) => {
    this.setState({
      imageUrl2,
      loading: false,
    });
  };
  setPopUp = () => {
    this.setState({ isPopUpOpen: !this.state.isPopUpOpen });
  };
  callBack = () => {
    this.props.getUsers(null, null, 25, this.props.page_number);
  };
  render() {
    const { user } = this.props;
    const { isPopUpOpen, imageUrl, imageUrl2 } = this.state;
    // console.log("ca jan img", imageUrl, imageUrl2);
    // const uploadButton = (
    //   <div>
    //     <Icon type={this.state.loading ? "loading" : "plus"} />
    //     <div className="ant-upload-text">Upload</div>
    //   </div>
    // );

    return (
      <React.Fragment>
        <div className="userList--noDoc__user">
          <div className="body">
            <span>{user.id}</span>
            <span>{user.name}</span>
            <span>{user.codice_fiscale_ordinante}</span>
            <span>{user.created_at.split("T")[0]}</span>
            <span>{user.city}</span>
            <span>{user.comune_code}</span>
            <span
              className="seeMore"
              onClick={() => {
                this.setPopUp();
              }}
            >
              <i class="fal fa-plus"></i>
            </span>
          </div>
        </div>
        {isPopUpOpen && (
          <div className="popUp">
            <div className="title">{user.document_name}</div>
            {(parseInt(user.document_type) === 1 ||
              parseInt(user.document_type) === 2 ||
              parseInt(user.document_type) === 3) && (
              <React.Fragment>
                <span className="uplTitle">Upload Front</span>

                <input
                  id={"inp1"}
                  type="file"
                  onChange={(e) => {
                    readFile(e, this.handleChangeFront);
                  }}
                />
                <label htmlFor="inp1">
                  {imageUrl ? (
                    // eslint-disable-next-line jsx-a11y/alt-text
                    <img src={imageUrl} />
                  ) : (
                    <>
                      {" "}
                      Choose File <i className="fal fa-images"></i>
                    </>
                  )}
                </label>
              </React.Fragment>
            )}
            {(parseInt(user.document_type) === 1 ||
              parseInt(user.document_type) === 2) && (
              <React.Fragment>
                <span className="uplTitle">Upload Back</span>
                <input
                  id={"inp2"}
                  type="file"
                  onChange={(e) => {
                    readFile(e, this.handleChangeBack);
                  }}
                />
                <label htmlFor="inp2">
                  {imageUrl2 ? (
                    // eslint-disable-next-line jsx-a11y/alt-text
                    <img src={imageUrl2} />
                  ) : (
                    <>
                      {" "}
                      Choose File <i className="fal fa-images"></i>{" "}
                    </>
                  )}
                </label>
              </React.Fragment>
            )}
            <i
              className="fal fa-times"
              onClick={() => {
                this.setPopUp();
              }}
            ></i>
            <button
              className={
                "uploadSendBtn" +
                ((parseInt(user.document_type) === 3 && imageUrl.length > 0) ||
                ((parseInt(user.document_type) === 1 ||
                  parseInt(user.document_type) === 2) &&
                  imageUrl2.length > 0)
                  ? ""
                  : " disabled")
              }
              onClick={() => {
                postImages(parseInt(user.id), imageUrl, imageUrl2, () => {
                  this.callBack();
                });
                setTimeout(() => {
                  this.setPopUp();
                }, 500);
              }}
            >
              Upload <i class="fas fa-upload"></i>
            </button>
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
