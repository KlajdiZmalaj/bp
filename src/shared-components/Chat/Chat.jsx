import React from "react";
import { connect } from "react-redux";
export const open = (screenWidth, innerHeight) => {
  var winparams =
    "dependent=yes,locationbar=no,scrollbars=yes,menubar=yes," +
    `resizable,screenX=${
      screenWidth >= 1000
        ? (screenWidth - screenWidth / 4) / 2
        : screenWidth >= 600 && screenWidth <= 1000
        ? screenWidth / 2 / 2
        : 0
    },screenY=${(innerHeight - 600) / 2},width=${
      screenWidth >= 1000
        ? screenWidth / 4
        : screenWidth >= 600 && screenWidth <= 1000
        ? screenWidth / 2
        : screenWidth
    },height=600`;
  var htmlPop =
    "<iframe width=100% height=100%" +
    ' src="https://tawk.to/chat/5d443c5f7d27204601c8f6b8/default' +
    '"></iframe>';

  var printWindow = window.open("", "PDF", winparams);
  printWindow.document.title = "SUPPORT";
  printWindow.document.write(htmlPop);
};
const Chat = ({ screenWidth }) => {
  return (
    <React.Fragment>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          open(screenWidth, window.innerHeight);
        }}
      >
        <i
          className="far fa-comments"
          style={
            screenWidth >= 1024
              ? {
                  paddingRight: "10px",
                  fontSize: "16px",
                  fontWeight: 300,
                }
              : {
                  fontSize: "16px",
                  fontWeight: 300,
                }
          }
        ></i>

        <span
          style={{ fontSize: "14px", fontFamily: "Roboto", fontWeight: 400 }}
        >
          SUPPORT
        </span>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  screenWidth: state.main.screenWidth,
});
export default connect(mapStateToProps, null)(Chat);
