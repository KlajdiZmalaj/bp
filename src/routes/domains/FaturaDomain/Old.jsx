import React, { Fragment } from "react";
import ReactToPrint from "react-to-print";
import images from "themes/images";
import "./oldStyles.css";
const bolli = 2;
class FatturaDetails extends React.Component {
  render() {
    const { faturaDetails, skinExtras } = this.props;
    console.log(faturaDetails);
    return (
      <Fragment>
        {faturaDetails && (
          <div className="Fatura" ref={(el) => (this.componentRef = el)}>
            <img
              className="Fatura--Background"
              src={images.faturaBackground}
              style={{ zIndex: -1 }}
            />
            <div className="Head">
              <img className="Fatura--Logo" src={images.logo} />
              <div className="Fatura--RightPart">
                <p>
                  COORDINATE BANCARIE: UNICREDIT: Mape di Hristova Mariya
                  Hristova e C. sas IBAN: IT24J0200824203000100898936 Numero C/C
                  000100898936 - BIC/SWIFT UNCRITM1SR2 POSTE ITALIANE: Mape sas
                  IBAN: IT35A0760113200001048987398 Numero C/C 001048987398 -
                  BIC/SWIFT BPPIITRRXXX
                </p>
              </div>
            </div>

            <div className="Fatura--Body">
              <div className="Fatura--Body--TopPart">
                <div className="Fatura--Body--TopPart--Left">
                  <span className="head">Periodo di riferimento</span>
                  <span className="data">
                    <span>Dal :</span>
                    <span>11/07/2019</span>
                  </span>
                  <span className="data">
                    <span>Al :</span>
                    <span>11/07/2029</span>
                  </span>
                  <span className="totale">
                    <span>Totale :</span>
                    <span>{faturaDetails?.user_data?.totale}</span>
                  </span>
                  <span className="Prepagato">Prepagato</span>
                </div>
                <div className="Fatura--Body--TopPart--Right">
                  <span className="head">{`PUNTA ANCORA DI ${faturaDetails?.user_data?.full_name?.toUpperCase()}`}</span>
                  <span className="data">
                    {`Via del Lavoro: ${faturaDetails?.user_data?.address?.toUpperCase()}-${
                      faturaDetails?.user_data?.cap
                    },${faturaDetails?.user_data?.city?.toUpperCase()} (${faturaDetails?.user_data?.comune_code?.toUpperCase()})`}
                  </span>
                  <span className="data">
                    {`C.F./P. Iva: ${faturaDetails?.user_data?.p_iva}`}
                  </span>
                  <span className="data">
                    {`Cod. cliente: ${faturaDetails?.user_data?.codice_cliente}`}
                  </span>
                </div>
              </div>
              <div className="Fatura--Body--CenterTable">
                <table>
                  <thead>
                    <tr>
                      <td>SO</td>
                      <td>Descrizione</td>
                      <td>Cod. Art.</td>
                      <td>Quantità</td>
                      <td>Imp. Unitario</td>
                      <td>Imp. Totale</td>
                      <td>Cod. Iva</td>
                    </tr>
                  </thead>
                  <tbody>
                    {faturaDetails?.payment_data &&
                      (faturaDetails?.payment_data || []).map((payment) => (
                        <tr>
                          <td>{payment.so}</td>
                          <td> {payment.descrizione} </td>
                          <td>{payment.cod_art}</td>
                          <td>{payment.quantita}</td>
                          <td>{payment.imp_unitario}</td>
                          <td>{payment.imp_totale}</td>
                          <td>{payment.cod_iva}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="Fatura--Body--BottomPart">
                <div className="Fatura--Body--BottomPart--Left">
                  <span className="Data">Totale:</span>
                  <span className="Data">Bolli</span>
                  <span className="Data">
                    Importo residuo da versare a Mape C.s.a.s:
                  </span>
                </div>
                <div className="Fatura--Body--BottomPart--Right">
                  <span className="Data">
                    {faturaDetails?.user_data?.totale}
                  </span>
                  <span className="Data">{bolli}</span>
                  <span className="Data">
                    {parseInt(faturaDetails?.user_data?.totale) + bolli}
                  </span>
                </div>
              </div>
            </div>
            <div className="Fatura--Body--BeforeFooter">
              <div>
                Descrizione IVA A=IVA assolta ai sensi dell'art. 74 DPR 633/72 -
                B=Es.10 Imposta di bollo assolta in modo virtuale da Mape
                C.s.a.s. / Autorizzazione dellʼAgenzia delle Entrate Ufficio di
                Rimini ....
              </div>
              <div>Pagina 1/1</div>
            </div>
            <div className="Fatura--footer">
              <div className="Fatura--footer--Left">
                <div>
                  <span>MAPE di Hristova Mariya Hristova e C.s.a.s.</span>
                </div>
                <div>
                  <span>
                    <i className="fas fa-home"></i>
                  </span>
                  <span>
                    {`${skinExtras.address}`}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8.949"
                      height="6.557"
                      viewBox="0 0 8.949 6.557"
                    >
                      <path
                        class="a"
                        d="M251.431,809.006c-.181-.012-1.092-.068-1.5-.132a1.023,1.023,0,0,1-.788-.772v-.849a6.262,6.262,0,0,0-1.005-.078h-.311a6.167,6.167,0,0,0-1.006.08v.847a1.01,1.01,0,0,1-.788.772c-.412.064-1.322.12-1.5.13h-.03a.946.946,0,0,1-.838-.916c-.071-.569-.139-1.289-.153-1.428l-.012-.138.092-.1a7.08,7.08,0,0,1,8.764,0l.093.1-.012.134c-.014.143-.083.863-.153,1.432a.948.948,0,0,1-.812.916h-.038Zm-7.3-2.259c.026.261.08.8.137,1.266.036.308.189.368.237.38.153,0,1.037-.064,1.407-.122a.388.388,0,0,0,.277-.278v-1.22l.233-.058a6.085,6.085,0,0,1,1.392-.143h.315a6.044,6.044,0,0,1,1.381.149l.233.058V808a.391.391,0,0,0,.278.278c.368.056,1.206.11,1.407.122.048-.012.2-.074.237-.38.058-.464.115-1.035.137-1.264a6.6,6.6,0,0,0-7.671-.012Zm6.338,4.712a1,1,0,0,0,1.005-1.005v-1.005h-.6v1.005a.386.386,0,0,1-.386.386h-5.013a.386.386,0,0,1-.386-.386v-1.005h-.6v1.005a1,1,0,0,0,1.005,1.005Z"
                        transform="translate(-243.497 -804.902)"
                      />
                    </svg>{" "}
                    {`${skinExtras.cel}`}
                  </span>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="6.832"
                    height="7.11"
                    viewBox="0 0 6.832 7.11"
                  >
                    <defs></defs>
                    <path
                      class="a"
                      d="M40.762,817.565a2.661,2.661,0,0,0-.641-.912,2.974,2.974,0,0,0-1-.6,3.954,3.954,0,0,0-2.307-.088,3.528,3.528,0,0,0-1.615.952,3.538,3.538,0,0,0-.561.761,3.8,3.8,0,0,0-.356.911,4.169,4.169,0,0,0-.125,1.027,3.619,3.619,0,0,0,.256,1.4,2.829,2.829,0,0,0,.737,1.046,3.284,3.284,0,0,0,1.175.656,5.022,5.022,0,0,0,1.572.227,5.224,5.224,0,0,0,.92-.075,3.829,3.829,0,0,0,.821-.246l-.218-.528a3.321,3.321,0,0,1-.7.208,4.445,4.445,0,0,1-.832.071,4.348,4.348,0,0,1-1.318-.184,2.7,2.7,0,0,1-.984-.539,2.321,2.321,0,0,1-.618-.866,3,3,0,0,1-.214-1.168,3.423,3.423,0,0,1,.227-1.257,3.118,3.118,0,0,1,.632-1.016,2.948,2.948,0,0,1,.967-.682,3.006,3.006,0,0,1,1.231-.249,2.972,2.972,0,0,1,1.032.174,2.479,2.479,0,0,1,.815.48,2.212,2.212,0,0,1,.534.727,2.182,2.182,0,0,1,.193.918,2.969,2.969,0,0,1-.114.855,2.065,2.065,0,0,1-.307.641,1.363,1.363,0,0,1-.45.4,1.128,1.128,0,0,1-.545.14.218.218,0,0,1-.18-.069.3.3,0,0,1-.056-.193,1.293,1.293,0,0,1,.028-.238c.019-.093.041-.215.067-.338l.553-2.475H38.7l-.081.365a1.4,1.4,0,0,0-.468-.331,1.491,1.491,0,0,0-.613-.113,1.588,1.588,0,0,0-.755.191,2.01,2.01,0,0,0-.624.522,2.532,2.532,0,0,0-.422.787,3.048,3.048,0,0,0-.155.987,1.922,1.922,0,0,0,.1.641,1.4,1.4,0,0,0,.274.476,1.138,1.138,0,0,0,.423.3,1.445,1.445,0,0,0,1.19-.058,1.793,1.793,0,0,0,.553-.45.632.632,0,0,0,.234.433.808.808,0,0,0,.233.129.87.87,0,0,0,.288.047,1.981,1.981,0,0,0,.843-.18,1.92,1.92,0,0,0,.671-.521,2.489,2.489,0,0,0,.441-.834,3.645,3.645,0,0,0,.159-1.12A2.848,2.848,0,0,0,40.762,817.565Zm-2.575,2.047a1.891,1.891,0,0,1-.172.47,1.51,1.51,0,0,1-.259.356,1.074,1.074,0,0,1-.328.227.917.917,0,0,1-.374.08q-.737,0-.737-.931a2.493,2.493,0,0,1,.1-.721,2.183,2.183,0,0,1,.268-.591,1.391,1.391,0,0,1,.388-.4.813.813,0,0,1,.461-.148,1.173,1.173,0,0,1,.553.12,1.3,1.3,0,0,1,.377.291Z"
                      transform="translate(-34.155 -815.83)"
                    />
                  </svg>
                  <span>{`${skinExtras.mail}`}</span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8.504"
                      height="8.504"
                      viewBox="0 0 8.504 8.504"
                    >
                      <path
                        class="a"
                        d="M115.583,815.064a4.252,4.252,0,1,0,4.252,4.252A4.252,4.252,0,0,0,115.583,815.064Zm3.7,4.115h-1.645a5.449,5.449,0,0,0-.315-1.719,4.5,4.5,0,0,0,1.025-.6A3.685,3.685,0,0,1,119.28,819.179Zm-3.849,3.833a4.395,4.395,0,0,1-1.118-1.445,4.236,4.236,0,0,1,1.133-.187v1.632Zm.3-7.391a4.408,4.408,0,0,1,1.225,1.68,4.232,4.232,0,0,1-1.239.225V815.62Zm.457.046a3.7,3.7,0,0,1,1.966.992,4.239,4.239,0,0,1-.941.548A4.816,4.816,0,0,0,116.191,815.667Zm-.745-.047v1.906a4.232,4.232,0,0,1-1.239-.225,4.408,4.408,0,0,1,1.225-1.68Zm-1.5,1.587a4.2,4.2,0,0,1-.94-.548,3.691,3.691,0,0,1,1.965-.992A4.832,4.832,0,0,0,113.95,817.207Zm.153.347a4.526,4.526,0,0,0,1.343.247v1.378h-1.64A5.192,5.192,0,0,1,114.1,817.554Zm1.343,1.9v1.653a4.491,4.491,0,0,0-1.245.211,5.141,5.141,0,0,1-.395-1.864Zm-.471,3.512a3.683,3.683,0,0,1-1.795-.837,4.159,4.159,0,0,1,.874-.466A4.732,4.732,0,0,0,114.975,822.965Zm.745.048v-1.632a4.238,4.238,0,0,1,1.133.186,4.382,4.382,0,0,1-1.118,1.445Zm1.392-1.351a4.192,4.192,0,0,1,.875.466,3.687,3.687,0,0,1-1.8.837A4.732,4.732,0,0,0,117.112,821.662Zm-.147-.345a4.491,4.491,0,0,0-1.245-.211v-1.653h1.641A5.163,5.163,0,0,1,116.965,821.317Zm-1.245-2.138V817.8a4.526,4.526,0,0,0,1.343-.247,5.222,5.222,0,0,1,.3,1.625Zm-2.9-2.322a4.494,4.494,0,0,0,1.024.6,5.477,5.477,0,0,0-.314,1.719h-1.645A3.685,3.685,0,0,1,112.822,816.857Zm-.935,2.6h1.645a5.407,5.407,0,0,0,.412,1.958,4.454,4.454,0,0,0-.971.53A3.694,3.694,0,0,1,111.887,819.453Zm6.306,2.488a4.413,4.413,0,0,0-.971-.53,5.408,5.408,0,0,0,.413-1.958h1.645A3.7,3.7,0,0,1,118.193,821.941Z"
                        transform="translate(-111.331 -815.064)"
                      />
                    </svg>
                  </span>
                  <span>{`${skinExtras.link3}`}</span>
                </div>
              </div>
              <div className="Fatura--footer--Right">
                <div>
                  <span>P. IVA 03852290406</span>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17.008"
                    height="17.008"
                    viewBox="0 0 17.008 17.008"
                  >
                    <g transform="translate(-504.169 -806.187)">
                      <path
                        class="a"
                        d="M512.673,806.187a8.5,8.5,0,1,0,8.5,8.5A8.5,8.5,0,0,0,512.673,806.187Zm0,15.987a7.484,7.484,0,1,1,7.484-7.483A7.483,7.483,0,0,1,512.673,822.174Z"
                      />
                      <path
                        class="a"
                        d="M513.29,818.433V814.69H514.4l.147-1.289H513.29l0-.646c0-.336.035-.516.552-.516h.692v-1.29h-1.107c-1.33,0-1.8.626-1.8,1.678v.774H510.8v1.29h.829v3.742Z"
                      />
                    </g>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17.008"
                    height="17.008"
                    viewBox="0 0 17.008 17.008"
                  >
                    <g transform="translate(-524.415 -806.187)">
                      <path
                        class="a"
                        d="M530.084,810.609a.856.856,0,1,0-.021,1.709h.01a.856.856,0,1,0,.011-1.709Z"
                      />
                      <path
                        class="a"
                        d="M534.816,813.03a1.583,1.583,0,0,0-1.444.817v-.7h-1.6c.022.464,0,4.945,0,4.945h1.6V815.33a1.138,1.138,0,0,1,.053-.4.879.879,0,0,1,.822-.6c.58,0,.812.454.812,1.118v2.646h1.6v-2.835C536.661,813.737,535.87,813.03,534.816,813.03Z"
                      />
                      <rect
                        class="a"
                        width="1.602"
                        height="4.946"
                        transform="translate(529.177 813.03)"
                      />
                      <path
                        class="a"
                        d="M532.919,806.187a8.5,8.5,0,1,0,8.5,8.5A8.5,8.5,0,0,0,532.919,806.187Zm0,15.987a7.484,7.484,0,1,1,7.483-7.483A7.484,7.484,0,0,1,532.919,822.174Z"
                      />
                    </g>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17.008"
                    height="17.008"
                    viewBox="0 0 17.008 17.008"
                  >
                    <g transform="translate(-544.252 -806.187)">
                      <path
                        class="a"
                        d="M556.811,814.882a3.923,3.923,0,0,0-3.9-3.941,3.824,3.824,0,0,0-.629.052,2.3,2.3,0,0,0-1.273-.384,2.347,2.347,0,0,0-2.33,2.364,2.382,2.382,0,0,0,.375,1.288,3.966,3.966,0,0,0-.048.621,3.9,3.9,0,0,0,4.615,3.875,2.308,2.308,0,0,0,1.232.356,2.347,2.347,0,0,0,2.33-2.364,2.379,2.379,0,0,0-.4-1.332A4.118,4.118,0,0,0,556.811,814.882Zm-3.54,3.04a2.753,2.753,0,0,1-2.355-.723c-.6-.57-.356-1.219.128-1.252s.775.56,1.034.725,1.24.538,1.759-.066c.564-.659-.376-1-1.065-1.1-.985-.149-2.227-.692-2.131-1.762a1.819,1.819,0,0,1,1.727-1.7,2.854,2.854,0,0,1,2.307.642c.634.551.291,1.168-.113,1.217s-.854-.907-1.742-.921c-.915-.015-1.533.971-.4,1.251s2.34.395,2.776,1.448S554.514,817.856,553.271,817.922Z"
                      />
                      <path
                        class="a"
                        d="M552.756,806.187a8.5,8.5,0,1,0,8.5,8.5A8.5,8.5,0,0,0,552.756,806.187Zm0,15.987a7.484,7.484,0,1,1,7.484-7.483A7.483,7.483,0,0,1,552.756,822.174Z"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
        <ReactToPrint
          trigger={() => (
            <button className="printBtn Buttons--Print">
              <span>PRINT</span>
              <i className="fal fa-print"></i>
            </button>
          )}
          content={() => this.componentRef}
          bodyClass="afterprint"
        />
      </Fragment>
    );
  }
}
export default FatturaDetails;
