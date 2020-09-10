import React from "react";
import { connect } from "react-redux";

const Footer = ({ skinExtras }) => (
  <footer className="footerMob">
    ©{skinExtras.name} 2020. All rights reserved. (New Mobile v1.0)
  </footer>
);
export default connect(({ auth: { skinExtras } }) => ({
  skinExtras,
}))(Footer);
