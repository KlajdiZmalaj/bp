import React from "react";

import { connect } from "react-redux";

import AuthActions from "redux-store/models/auth";
import LoginComponent from "routes/domains/Login";

class Login extends React.Component {
  render() {
    return <LoginComponent></LoginComponent>;
  }
}

const mapsStateToProps = ({ auth }) => ({
  personalInfo: auth.personalInfo,
  register: auth.register
});

export default connect(mapsStateToProps, { ...AuthActions })(Login);
