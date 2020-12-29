import React from "react";
import "./style.css";
const CheckOutDom = () => {
  return (
    <div className="shopCheckout maxWidth">
      <div className="shopCheckout--form">
        <div className="shopCheckout--form__left">
          <div className="titleTop">Dettagli di fatturazione</div>
          <div className="formContainer">
            <input type="text" placeholder="Nome" />
            <input type="text" placeholder="Cognome" />
            <input type="text" placeholder="Codice Fiscale/P.Iva" />
            <input type="text" placeholder="Nome della società (opzionale)" />
            <input type="text" placeholder="Paese/regione" />
            <input type="text" placeholder="Via e numero" />
            <input type="text" placeholder="Indirizzo email" />
            <input type="text" placeholder="Telefono" />
            <input type="text" placeholder="Città" />
            <div className="inpGr">
              <input type="text" placeholder="Provincia" className="w-60" />
              <input type="text" placeholder="C.A.P." className="w-40" />
            </div>
          </div>
          <div className="checkContainer">
            <input id="check1" type="checkbox" />
            <label htmlFor="check1">
              <div>
                <i className="fal fa-check" aria-hidden="true"></i>
              </div>
              Spedire ad un indirizzo differente?
            </label>

            <input id="check2" type="checkbox" />
            <label htmlFor="check2">
              <div>
                <i className="fal fa-check" aria-hidden="true"></i>
              </div>
              Ritiro presso il punto vendita
            </label>
          </div>
        </div>
        <div className="shopCheckout--form__right">
          <div className="titleTop">Il tuo ordine</div>
          <div className="infos">
            <div className="subTotal">
              <div>Subtotale:</div>
              <div>€19,80</div>
            </div>
            <div className="shipping">
              <div>Shipping:</div>
              <div>
                Tariffa unica: <span>€5,00</span>
              </div>
            </div>
            <div className="total">
              <div>Totale:</div>
              <div>475,00 €</div>
            </div>
          </div>
          <div className="titleTop">Payments:</div>
          <div className="checkContainer right">
            <input id="pwall" type="checkbox" />
            <label htmlFor="pwall">
              <div>
                <i className="fal fa-check" aria-hidden="true"></i>
              </div>
              BPoint Wallet
            </label>

            <input id="scrill" type="checkbox" />
            <label htmlFor="scrill">
              <div>
                <i className="fal fa-check" aria-hidden="true"></i>
              </div>
              Skrill
            </label>
            <input id="sp" type="checkbox" />
            <label htmlFor="sp">
              <div>
                <i className="fal fa-check" aria-hidden="true"></i>
              </div>
              Satispay
            </label>
            <input id="pp" type="checkbox" />
            <label htmlFor="pp">
              <div>
                <i className="fal fa-check" aria-hidden="true"></i>
              </div>
              Paypal
            </label>
          </div>
          <div className="checkContainer bottom">
            <input id="termi" type="checkbox" />
            <label htmlFor="termi">
              <div>
                <i className="fal fa-check" aria-hidden="true"></i>
              </div>
              <span>
                Ho letto e accetto <span>termini e condizioni*</span>
              </span>
            </label>
          </div>
          <button className="pagaBtn">PAGA CON BPOINT WALLET</button>
        </div>
      </div>
    </div>
  );
};
export default CheckOutDom;
