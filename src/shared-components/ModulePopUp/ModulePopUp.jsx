import React, { Fragment } from "react";

import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";
import ModulePopUp1 from "./ModulePopUp1";
import ModulePopUp3 from "./ModulePopUp3";
import ModulePopUp4 from "./ModulePopUp4";
import { withRouter } from "react-router-dom";
import "./style.css";

class ModulePopUp extends React.Component {
  setFromUrl = () => {
    const SID = this.props.services?.[this.props.match.params.c1]?.[
      this.props.match.params.c2
    ];
    this.props.setServiceType(this.props.match.params.c1);
    this.props.setServiceId(SID?.services?.[0]);
    this.props.setServiceS({
      ...SID,
      id: this.props.match.params.c2,
    });
    this.props.togglePopUp(true);
    console.log("set", SID);
  };
  componentDidUpdate(prevProps) {
    console.log("upd");
    const _ = this;

    if (this.props.services !== prevProps.services) {
      _.setFromUrl();
    }

    if (
      this.props.match.params.c1 !== prevProps.match.params.c1 ||
      this.props.match.params.c2 !== prevProps.match.params.c2
    ) {
      _.setFromUrl();
    }
  }

  render() {
    const {
      isShowing,
      service,
      bolletiniBianchi,
      serviceType,
      service_s,
    } = this.props;
    const service_id = service?.service_id;

    // const arr = [
    //   {
    //     message: "User transactions fetched successfully",
    //     receipt:
    //       "\nRICARICA WIND\n\nNumero op.:               106288\nReceipt-Nr:                 7957\nWind ID:     1247920200124130031\nTerminal id:            IT016546\n--------------------------------\nNUMERO DI TELEFONO\n335398618\nImporto:                 6  Euro\nData op.:    24.01.2020 13:00:31\n--------------------------------\nWind accreditera' la ricarica en\n24 ore. Per info chiami il 155.\nCON RICARICA SPECIAL 5\u20ac\nhai Minuti e Giga Illimitati\nper 24 ore e 4\u20ac di credito\nCON RICARICA SPECIAL 10\u20ac\nhai Minuti e Giga Illimita\nti    per 24 ore e 9\u20ac di credi\nto\nIVA assolta ex art. 74,\nco.1, leDPR 633/72 da da Wind Tr\ne S.p.A.P.Iva 13378520152\nOperazione eseguita da E\nuronet P' Transaction service sr\nl       P.Iva 05445540965\nTRANSAZIONE ESEGUIT\nA\n\n\n",
    //     barcode: "0000073770107",
    //   },
    // ];

    console.log("service_id", serviceType, service_s.id);
    const module1 = [
      "BOL001",
      "BOL002",
      "PPA001",
      "BOL006",
      "BOL007",
      "BOL004",
      "BOL003",
      "PAGF24",
    ];

    // console.log(
    //   "sid",
    //   this.props.match.params.c1,
    //   this.props.match.params.c2,
    //   SID,
    //   this.props.services
    // );
    return isShowing ? (
      <Fragment>
        {module1.includes(service_id) && (
          <ModulePopUp1
            service_id={service_id}
            bolletiniBianchi={bolletiniBianchi}
          ></ModulePopUp1>
        )}

        {service?.service_id?.toString() === "RPP001" && (
          <ModulePopUp3 service_id={service_id}></ModulePopUp3>
        )}

        {(serviceType?.toString() === "RTELD" ||
          serviceType?.toString() === "RTELI" ||
          serviceType?.toString() === "SCMS" ||
          serviceType?.toString() === "SND000" ||
          serviceType?.toString() === "CCARD" ||
          serviceType?.toString() === "RTVD" ||
          serviceType?.toString() === "GIFT" ||
          serviceType?.toString() === "RTELC") &&
          (service?.type?.toString() === "1" ||
            service?.type?.toString() === "0") && (
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

const mapsStateToProps = (state) => ({
  isShowing: state.main.isShowing,
  service: state.auth.service_id,
  bolletiniBianchi: state.auth.bolletiniBianchi,
  serviceType: state.auth.serviceType,
  services: state.main.services,
  service_s: state.auth.service_s,
});

export default withRouter(
  connect(mapsStateToProps, { ...MainActions, ...AuthActions })(ModulePopUp)
);
