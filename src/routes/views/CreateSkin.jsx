import React from "react";
import AdminLoginDom from "routes/domains/AdminLogin/AdminLoginDom";
import AdminLoginSkins from "routes/domains/AdminLogin/AdminLoginSkins";
import { Time } from "shared-components";
import AdminHeader from "shared-components/adminSharedComp/adminHeader/adminHeader";
import { connect } from "react-redux";
import AuthActions from "redux-store/models/auth";

class CreateSkin extends React.Component {
  componentDidMount() {
    document.querySelector("body").classList.add("bodyAdmin");
  }
  render() {
    const { accountInfo, skinList } = this.props;
    return (
      <div className="Admin-Panel">
        <div className="TopHeader">
          <Time />
          <span className="creditoD">
            Credito : {accountInfo?.profile?.wallet}€{" "}
          </span>
          <span
            className="logOutBtn"
            onClick={() => {
              this.props.logOut();
              this.props.history.push("/login");
            }}
          >
            Log OUT
          </span>
        </div>

        <AdminHeader
          history={this.props.history}
          location={this.props.location}
        />

        <AdminLoginDom component={<AdminLoginSkins skinList={skinList} />} />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  accountInfo: state.auth.accountInfo,
  skinList: state.auth.skinList,
});
export default connect(mapStateToProps, AuthActions)(CreateSkin);
