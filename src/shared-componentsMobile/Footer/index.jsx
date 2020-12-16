import React from "react";
import { connect } from "react-redux";

const Footer = ({ skinExtras }) => (
  <footer className="footerMob">
    ©{skinExtras.name} {new Date().getFullYear()}. All rights reserved.
  </footer>
);
export default connect(({ auth: { skinExtras } }) => ({
  skinExtras,
}))(Footer);
