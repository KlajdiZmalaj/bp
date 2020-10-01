import React, { useState } from "react";
import images from "themes/images";
import { connect } from "react-redux";
import "./styles.css";
const AreaDownload = ({ link6 }) => {
  const [showIframe, setShowIframe] = useState(false);
  return (
    <React.Fragment>
      <iframe
        id="the_iframe"
        onLoadCapture={() => {
          setShowIframe(true);
        }}
        className={`${showIframe ? "" : "HiddenFrame"}`}
        frameBorder="0"
        src={
          link6
            ? link6 + "?footer=false&header=false"
            : "https://bpoint.store/area-marketing/?footer=false&header=false"
        }
      />
      {showIframe === false && (
        <div className="LoadContainer">
          <img className="loader" src={images.loader}></img>
        </div>
      )}
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  link6: state.auth.skinExtras.link6,
});
export default connect(mapStateToProps)(AreaDownload);
