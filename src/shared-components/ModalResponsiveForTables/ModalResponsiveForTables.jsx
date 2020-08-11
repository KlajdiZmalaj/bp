import React from "react";
const ModalResponsiveForTables = ({ Close, Rows }) => (
  <div className="TranzacioniModalResponsive">
    <div className="backDrop" onClick={Close}></div>
    <div className="TranzacioniModalResponsive--Data">
      <div className="TranzacioniModalResponsive--Data--Header">
        <div className="TranzacioniModalResponsive--Data--Header--Title">
          Dettagli completi per la riga della tabella
        </div>
        <div
          className="TranzacioniModalResponsive--Data--Header--Close"
          onClick={Close}
        >
          <i className="fal fa-times" aria-hidden="true"></i>
        </div>
      </div>

      <div className="TranzacioniModalResponsive--Data--Row">{Rows}</div>
    </div>
  </div>
);
export default ModalResponsiveForTables;
