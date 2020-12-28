import React from "react";
import AdminLoginDom from "routes/domains/AdminLogin/AdminLoginDom";
import AdminLoginSkins from "routes/domains/AdminLogin/AdminLoginSkins";
import AdminHeader from "shared-components/adminSharedComp/adminHeader/adminHeader";
import { connect } from "react-redux";
import AuthActions from "redux-store/models/auth";

class CreateSkin extends React.Component {
  componentDidMount() {
    document.querySelector("body").classList.add("bodyAdmin");
  }
  render() {
    const { skinList } = this.props;
    return (
      <div className="Admin-Panel">
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
  skinList: state.auth.skinList,
});
export default connect(mapStateToProps, AuthActions)(CreateSkin);
