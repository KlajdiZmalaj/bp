import React from "react";
import { Azioni, Header } from "shared-components";
import { connect } from "react-redux";
class CaricaConto extends React.Component {
  render() {
    const { skinExtras, accountInfo } = this.props;
    return (
      <div className="Container">
        <Header />

        <div className="container-fluid overview ">
          <Azioni activeMain="contabilita" active="carica-conto"></Azioni>
          <div className="panels-container">
            <div className="sort-annunci maxWidth">
              <h1 className="heading-tab mr-auto">Carica Conto</h1>
            </div>
            <div className="row no-gutters maxWidth">
              <div className="col-md-12 carica-conto">
                <h3>PROCEDURA PER LA RICARICA DEL BORSELLINO ELETTRONICO</h3>
                <p>
                  Suggeriamo ai gentili partner, di utilizzare la modalità sotto
                  descritta per assicurarsi un trasferimento più veloce delle
                  somme versate e quindi un più veloce accredito.
                </p>
                <p>
                  Le ricariche verranno caricate sul borsellino nei seguenti
                  orari:
                </p>
                <span>
                  Lunedì / Venerdì dalle h. 09.00 alle h. 18.00 Sabato dalle h.
                  09.00 alle h. 13.00
                </span>
                <p>
                  Ricarica tramite bonifico bancario:{" "}
                  <span>{skinExtras.bank_name}</span>
                </p>
                <br />
                <p>{skinExtras.account_name}</p>
                <p>{skinExtras.address}</p>
                <p>
                  Iban: <span>{skinExtras.iban}</span>
                </p>
                {/* <p>numero c/c 000100898936</p>
                <p>BIC/SWIFT UNCRITM1SR2</p> */}
                <p>
                  Indicare causale: “Ricarica Borsellino di User{" "}
                  {accountInfo.profile.username} .”
                </p>
                <p>
                  Una volta effettuato il bonifico si prega di inviare la
                  distinta al nostro indirizzo e-mail:
                </p>
                <address> {skinExtras.mail}</address>
              </div>
            </div>
          </div>
        </div>
        {/* <!--Chat icon botm right corner--> */}
        <div className="chatSticky">
          <img src="img/chatSticky.svg" alt="" />
        </div>
      </div>
    );
  }
}
const a = (s) => {
  return {
    skinExtras: s.auth.skinExtras,
    accountInfo: s.auth.accountInfo,
  };
};
export default connect(a, null)(CaricaConto);
