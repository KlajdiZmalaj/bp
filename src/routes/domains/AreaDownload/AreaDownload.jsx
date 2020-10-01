import React from "react";
import { connect } from "react-redux";
import "./styles.css";
const AreaDownload = ({ link6 }) => {
  return (
    <iframe
      id="the_iframe"
      frameBorder="0"
      src={
        link6
          ? link6 + "?footer=false&header=false"
          : "https://bpoint.store/area-marketing/?footer=false&header=false"
      }
    />
  );
};
const mapStateToProps = (state) => ({
  link6: state.auth.skinExtras.link6,
});
export default connect(mapStateToProps)(AreaDownload);
