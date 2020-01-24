import React from "react";

import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";

import PrintTicket from "./PrintTicket";
import Bolletino from "./Bolletino";
import "./style.css";

class ModulePopUp extends React.Component {
  render() {
    const { isShowing, service_id, bolletiniBianchi } = this.props;
    const arr = [
      {
        message: "User transactions fetched successfully",
        receipt:
          "\nRICARICA WIND\n\nNumero op.:               106288\nReceipt-Nr:                 7957\nWind ID:     1247920200124130031\nTerminal id:            IT016546\n--------------------------------\nNUMERO DI TELEFONO\n335398618\nImporto:                 6  Euro\nData op.:    24.01.2020 13:00:31\n--------------------------------\nWind accreditera' la ricarica en\n24 ore. Per info chiami il 155.\nCON RICARICA SPECIAL 5\u20ac\nhai Minuti e Giga Illimitati\nper 24 ore e 4\u20ac di credito\nCON RICARICA SPECIAL 10\u20ac\nhai Minuti e Giga Illimita\nti    per 24 ore e 9\u20ac di credi\nto\nIVA assolta ex art. 74,\nco.1, leDPR 633/72 da da Wind Tr\ne S.p.A.P.Iva 13378520152\nOperazione eseguita da E\nuronet P' Transaction service sr\nl       P.Iva 05445540965\nTRANSAZIONE ESEGUIT\nA\n\n\n",
        barcode: "0000073770107"
      }
    ];
    console.log("arr", arr);
    return isShowing ? (
      <div className="modulePopUP modulePopUP1">
        <div className="module container-fluid max-width_modulePopUP">
          <div className="row">
            <Bolletino service_id={service_id}></Bolletino>
            {bolletiniBianchi[0] && bolletiniBianchi[0].receipt && (
              <PrintTicket arr={bolletiniBianchi}></PrintTicket>
            )}
          </div>
        </div>
      </div>
    ) : null;
  }
}

const mapsStateToProps = state => ({
  isShowing: state.main.isShowing,
  service_id: state.auth.service_id,
  bolletiniBianchi: state.auth.bolletiniBianchi
});

export default connect(mapsStateToProps, { ...MainActions, ...AuthActions })(
  ModulePopUp
);
