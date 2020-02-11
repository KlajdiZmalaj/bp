import React, { Fragment } from "react";

import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";
import ModulePopUp1 from "./ModulePopUp1";
import ModulePopUp4 from "./ModulePopUp4";
import "./style.css";

class ModulePopUp extends React.Component {
  render() {
    const { isShowing, service, bolletiniBianchi, serviceType } = this.props;
    const service_id = service && service.service_id;
    console.log("this.props", this.props.service);
    const arr = [
      {
        message: "User transactions fetched successfully",
        receipt:
          "\nRICARICA WIND\n\nNumero op.:               106288\nReceipt-Nr:                 7957\nWind ID:     1247920200124130031\nTerminal id:            IT016546\n--------------------------------\nNUMERO DI TELEFONO\n335398618\nImporto:                 6  Euro\nData op.:    24.01.2020 13:00:31\n--------------------------------\nWind accreditera' la ricarica en\n24 ore. Per info chiami il 155.\nCON RICARICA SPECIAL 5\u20ac\nhai Minuti e Giga Illimitati\nper 24 ore e 4\u20ac di credito\nCON RICARICA SPECIAL 10\u20ac\nhai Minuti e Giga Illimita\nti    per 24 ore e 9\u20ac di credi\nto\nIVA assolta ex art. 74,\nco.1, leDPR 633/72 da da Wind Tr\ne S.p.A.P.Iva 13378520152\nOperazione eseguita da E\nuronet P' Transaction service sr\nl       P.Iva 05445540965\nTRANSAZIONE ESEGUIT\nA\n\n\n",
        barcode: "0000073770107"
      }
    ];

    const module1 = ["BOL001"];

    return isShowing ? (
      <Fragment>
        {module1.includes(service_id) && (
          <ModulePopUp1
            service_id={service_id}
            bolletiniBianchi={bolletiniBianchi}
          ></ModulePopUp1>
        )}

        {(serviceType.toString() === "RTELD" ||
          serviceType.toString() === "RTELI" ||
          serviceType.toString() === "SCMS" ||
          serviceType.toString() === "RTVD" ||
          serviceType.toString() === "GIFT" ||
          serviceType.toString() === "RTELC") &&
          (service.type.toString() === "1" ||
            service.type.toString() === "0") && (
            <ModulePopUp4
              service_id={service_id}
              bolletiniBianchi={bolletiniBianchi}
              serviceSelected={service}
              serviceType={serviceType}
              service={service}
            ></ModulePopUp4>
          )}
      </Fragment>
    ) : null;
  }
}

const mapsStateToProps = state => ({
  isShowing: state.main.isShowing,
  service: state.auth.service_id,
  bolletiniBianchi: state.auth.bolletiniBianchi,
  serviceType: state.auth.serviceType
});

export default connect(mapsStateToProps, { ...MainActions, ...AuthActions })(
  ModulePopUp
);
