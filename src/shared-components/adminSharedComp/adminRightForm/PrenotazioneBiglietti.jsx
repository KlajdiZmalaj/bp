import React from "react";
import "./PrBil.css";
class PrenotazioneBiglietti extends React.Component {
  state = {
    logo: "",
    costo_servizio: "",
    commissioni: "",
    provigioni: "",
    ivaServizzio: "",
    descrizione_iva: "",
    utile_netto: "",
    informazioni: "",
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleFileChange = (e) => {
    this.setState({
      logo: e.target?.files[0]?.name ? e.target.files[0].name : "",
    });
    // const file = document.querySelector("#myfile").files[0];
    // const Base64 = await toBase64(file);
    // this.setState({ base64: Base64 });
  };
  render() {
    const { status, image } = this.props;
    const {
      costo_servizio,
      commissioni,
      provigioni,
      ivaServizzio,
      descrizione_iva,
      utile_netto,
      informazioni,
      logo,
    } = this.state;
    return (
      <div className="Serv-Sett">
        <div className="backDrop"></div>

        <div className="TopPart">
          <div
            className="Header"
            style={
              status === "active" ? { color: "#00B850" } : { color: "#E30000" }
            }
          >
            <span>PRENOTAZIONE B?IGLIETTI</span>
            <span>
              {status === "active" ? "ACTIVE" : "INACTIVE"}{" "}
              <i
                className={`far fa-${
                  status === "active" ? "check" : "times"
                }-circle`}
              ></i>
            </span>
          </div>
          <div className="Image">
            <img
              src={
                image ? image : `http://www.perdemo.it/ricaricheSPS/CRYP.png`
              }
            />
          </div>
          <div className="Inputs">
            <div className="full">
              <div className="Input">
                <label>Logo</label>
                <div className="Input--InputHolder">
                  <input type="file" onChange={this.handleFileChange} />
                  <span className="FileInputLabel">
                    {!logo || logo === "" ? "Select Logo" : logo}
                  </span>
                  <i className="fal fa-camera"></i>
                </div>
              </div>
            </div>
            <div className="full">
              <div className="Input Semi">
                <label>Costo Servizzio</label>
                <div className="Input--InputHolder">
                  <input
                    type="text"
                    name="costo_servizio"
                    value={costo_servizio}
                    onChange={this.handleChange}
                  />
                  <i className="fal fa-euro-sign active"></i>
                  <i className="fal fa-percent inactive"></i>
                </div>
              </div>
            </div>
            <div className="double">
              <div className="Input">
                <label>Commissioni</label>
                <div className="Input--InputHolder">
                  <input
                    type="text"
                    name="commissioni"
                    value={commissioni}
                    onChange={this.handleChange}
                  />
                  <i className="fal fa-euro-sign active"></i>
                  <i className="fal fa-percent inactive"></i>
                </div>{" "}
              </div>{" "}
              <div className="Input">
                <label>Provvigioni</label>
                <div className="Input--InputHolder">
                  <input
                    type="text"
                    name="provigioni"
                    value={provigioni}
                    onChange={this.handleChange}
                  />
                  <i className="fal fa-euro-sign active"></i>
                  <i className="fal fa-percent inactive"></i>
                </div>{" "}
              </div>
            </div>

            <div className="double">
              <div className="Input--Quarter">
                <label>IVA SERVIZZIO</label>
                <div className="Input--InputHolder">
                  <input
                    type="text"
                    name="ivaServizzio"
                    value={ivaServizzio}
                    onChange={this.handleChange}
                  />
                </div>{" "}
              </div>
              <div className="Input--Left">
                <label>DESCRIZIONE IVA</label>
                <div className="Input--InputHolder">
                  <input
                    type="text"
                    name="descrizione_iva"
                    value={descrizione_iva}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="full">
              <div className="Input">
                <label>Utile Netto</label>
                <div className="Input--InputHolder">
                  <input
                    type="text"
                    name="utile_netto"
                    value={utile_netto}
                    onChange={this.handleChange}
                  />
                </div>{" "}
              </div>
            </div>
            <div className="full">
              <div className="Input">
                <label>Informazione aggiunto ascontrino</label>
                <div className="Input--InputHolder">
                  <textarea
                    type="text"
                    name="informazioni"
                    value={informazioni}
                    onChange={this.handleChange}
                  />
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="BotPart">
          <div className="Buttons">
            <button>
              <i className="fal fa-times"></i>
              <span>CANCEL</span>
            </button>
            <button>
              <i className="fal fa-check"></i>
              <span>SAVE</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default PrenotazioneBiglietti;
