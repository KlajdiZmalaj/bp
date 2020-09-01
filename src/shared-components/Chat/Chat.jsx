import React from "react";
const open = () => {
  var winparams =
    "dependent=yes,locationbar=no,scrollbars=yes,menubar=yes," +
    `resizable,screenX=50,screenY=50,width=300
        ,height=600`;
  var htmlPop =
    "<embed width=100% height=100%" +
    ' src="https://tawk.to/chat/5f4e3671f0e7167d000c81cc/default' +
    '"></embed>';

  var printWindow = window.open("", "PDF", winparams);
  printWindow.document.write(htmlPop);
};
const Chat = () => {
  return (
    <React.Fragment>
      <div
        onClick={() => {
          open();
        }}
      >
        <span>Chat</span>
        <i className="far fa-comments"></i>
      </div>
    </React.Fragment>
  );
};
export default Chat;
