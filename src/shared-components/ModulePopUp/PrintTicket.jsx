import React from "react";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";

class PrintTicket extends React.Component {
  render() {
    const { arr } = this.props;
    const barcode = Array.isArray(arr) ? arr[0]?.barcode : arr?.barcode;
    const receipt = Array.isArray(arr) ? arr[0]?.receipt : arr?.receipt;
    return barcode && receipt ? (
      <div className="col-5 rightCol_Module">
        <div className="row no-gutters">
          <div className="_modulePopUP__cupon">
            <div className="_modulePopUP__cupon--header">
              <img src="img/print.svg" alt="" />
              <h3>Stampa dello scontrino {barcode}</h3>
            </div>
            <div className="_modulePopUP__cupon--body">
              <img src="img/logoGray.svg" alt="" />
              <h6>OTC srl</h6>

              <div
                dangerouslySetInnerHTML={{
                  __html: receipt
                    // .replace(/</g, "&lt;")
                    // .replace(/>/g, "&gt;")
                    .replace(/\t/g, "\u00a0")
                    .replace(/\n/g, "<br/> ")
                    .replace(/\+/g, " ")
                    .replace(/: /g, ":<div class='marginB'></div>")
                    .replace(
                      /<div class='marginB'><\/div>([^>]+)<br\/>/g,
                      "<div class='marginB'></div><div class='marginC'>$1</div><br/>"
                    ),
                }}
              />
              <span className="__cupon--body__address">
                Via Risorgimento n.50 - castel san pietro terme
              </span>
              <span className="__cupon--body__phone">234234234</span>
              <h4>SCONTRINO VERIFICA</h4>
              <h3>Prodotto: Bollettini Bianchi</h3>
            </div>
            <div className="_modulePopUP__cupon--table">
              <table>
                <tbody>
                  <tr>
                    <td>CC:</td>
                    <td>123123</td>
                  </tr>
                  <tr>
                    <td>INTESTATARIO:</td>
                    <td>mario rossi</td>
                  </tr>
                  <tr>
                    <td>CAUSALE:</td>
                    <td>MULTA COMUNE</td>
                  </tr>
                  <tr>
                    <td>ESEGUITO DA:</td>
                    <td>BPOINT</td>
                  </tr>
                  <tr>
                    <td>INDIRIZZO:</td>
                    <td>VIA RISORGIMENTO</td>
                  </tr>
                  <tr>
                    <td>cap:</td>
                    <td>70026</td>
                  </tr>
                  <tr>
                    <td>localita:</td>
                    <td>san pietro terme</td>
                  </tr>
                  <tr>
                    <td>provincia:</td>
                    <td>rn</td>
                  </tr>
                </tbody>
              </table>
              <table className="import-bottom">
                <tbody>
                  <tr>
                    <td>
                      IMPORTO: <br />
                      <span>€50</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-secondary">
                <img src="img/check-symbol.svg" alt="" /> <br />
                Stampa
              </button>
              <button type="button" className="btn btn-secondary">
                <img src="img/close.svg" alt="" /> <br />
                Annulla
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

const mapsStateToProps = (state) => ({
  isShowing: state.main.isShowing,
  service_id: state.auth.service_id,
});

export default connect(mapsStateToProps, { ...MainActions, ...AuthActions })(
  PrintTicket
);
