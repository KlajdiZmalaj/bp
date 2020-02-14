import React, { Component } from "react";
import { Upload, Icon, message } from "antd";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

class UserDoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopUpOpen: false,
      loading: false,
      imageUrl: "",
      imageUrl2: ""
    };
  }
  handleChangeFront = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
  };
  handleChangeBack = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl2 =>
        this.setState({
          imageUrl2,
          loading: false
        })
      );
    }
  };
  setPopUp = () => {
    this.setState({ isPopUpOpen: !this.state.isPopUpOpen });
  };
  render() {
    const { user } = this.props;
    const { isPopUpOpen, imageUrl, imageUrl2 } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <React.Fragment>
        <div
          className="userList--noDoc__user"
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
            <span>{user.created_at.split("T")[0]}</span>
            <span>{user.city}</span>
            <span>{user.comune_code}</span>
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
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={this.handleChangeFront}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </React.Fragment>
            )}
            {(parseInt(user.document_type) === 1 ||
              parseInt(user.document_type) === 2) && (
              <React.Fragment>
                <span className="uplTitle">Upload Back</span>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={this.handleChangeBack}
                >
                  {imageUrl2 ? (
                    <img
                      src={imageUrl2}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </React.Fragment>
            )}
            <i
              class="fal fa-times"
              onClick={() => {
                this.setPopUp();
              }}
            ></i>
            <button className="uploadSendBtn">
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

export default UserDoc;
