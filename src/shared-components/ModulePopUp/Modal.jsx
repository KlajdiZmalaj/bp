import React from "react";

const Modal = (props) =>
  props.show ? (
    <div className="universalModal">
      <div className="content">
        <div className="universalModal--header">
          {props.tittle && (
            <div className="universalModal--title">
              <h3>{props.tittle}</h3>
            </div>
          )}
          <button onClick={props.hide}>X</button>
        </div>
        <div className="universalModal--main">{props.children}</div>
      </div>
      <div onClick={props.hide} className="modalbackdrop"></div>
    </div>
  ) : null;

export default Modal;
