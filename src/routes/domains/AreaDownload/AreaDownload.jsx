import React, { useState } from "react";
import { connect } from "react-redux";
import { Loader } from "shared-components";
import "./styles.css";
const AreaDownload = ({ link6 }) => {
  const [showIframe, setShowIframe] = useState(false);
  return (
    <React.Fragment>
      <iframe
        id="the_iframe"
        title="area_download_frame"
        onLoadCapture={() => {
          setShowIframe(true);
        }}
        className={`${showIframe ? "" : "HiddenFrame"} maxWidth`}
        frameBorder="0"
        src={
          link6
            ? link6 + "?footer=false&header=false"
            : "https://bpoint.store/area-marketing/?footer=false&header=false"
        }
      />
      {showIframe === false && (
        <div className="LoadContainer">
          <Loader />
        </div>
      )}
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  link6: state.auth.skinExtras.link6,
});
export default connect(mapStateToProps)(AreaDownload);
