import React from "react";

import images from "themes/images";
class Service extends React.Component {
  render() {
    const { serviceSelected, servicesItems } = this.props;
    console.log("servicesItems", servicesItems[serviceSelected]);
    const arrayServices = servicesItems[serviceSelected]; // beji map arrayServices

    return (
      <div
        className={
          "col-md-3 tab-content " + (serviceSelected === "" ? "" : "d-block")
        }
      >
        {/* <!--first ITEMS  Bolletini postali services--> */}
        {arrayServices &&
          arrayServices.map((item, index) => {
            return (
              <div
                key={index}
                className={
                  "tab-pane fade in panel-services " +
                  (serviceSelected !== "#service1" ? "active show" : "")
                }
              >
                <table className="bolletini bolletini1">
                  <tbody>
                    <tr>
                      <td>
                        <img src={images.billDark} alt="" />
                        <p>{item.name}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}

        {/* <!--first ITEMS bollo auto services--> */}
        <div
          id="service2"
          className={
            "tab-pane fade in panel-services " +
            (serviceSelected === "#service2" ? "active show" : "")
          }
        >
          <table className="bolletini bolletini2">
            <tbody>
              <tr>
                <td>
                  <img src={images.Car} alt="" />
                  <p>Bollo Auto</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <!-- first ITEMS postepay services--> */}
        <div
          id="service3"
          className={
            "tab-pane fade in panel-services " +
            (serviceSelected === "#service3" ? "active show" : "")
          }
        >
          <table className="bolletini bolletini3">
            <tbody>
              <tr>
                <td>
                  <img src={images.postpayimg} alt="" />
                  <p>post pay</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <!--SECOND ITEMS (dirette services)--> */}
        <div
          id="service4"
          className={
            "tab-pane fade in panel-services " +
            (serviceSelected === "#service4" ? "active show" : "")
          }
        >
          <table className="carriers">
            <tbody>
              <tr>
                <td>
                  <img src={images.TIM_logo_2016} alt="" />
                  <p>tim</p>
                </td>
                <td>
                  <img src={images.vodafone} alt="" />
                  <p>vodafone</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img src={images.wind_logo_svg_vector} alt="" />
                  <p>Bollettini rav</p>
                </td>
                <td>
                  <img src={images.three_logo} alt="" />
                  <p>tre</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img src={images.posteitalia} alt="" />
                  <p>poste mobile</p>
                </td>
                <td>
                  <img src={images.coop} alt="" />
                  <p>coop voce</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <!--THIRD ITEMS (phone,telecom,onnet libra,idt services)--> */}
        <div
          id="service5"
          className={
            "tab-pane fade in panel-services " +
            (serviceSelected === "#service5" ? "active show" : "")
          }
        >
          <table className="phoneall">
            <tbody>
              <tr>
                <td>
                  <p>new colombus</p>
                  <h3>
                    5<sup>€</sup>
                  </h3>
                </td>
                <td>
                  <p>new colombus</p>
                  <h3>
                    12<sup>€</sup>
                  </h3>
                </td>
              </tr>
              <tr>
                <td>
                  <p>easy africa</p>
                  <h3>
                    5<sup>€</sup>
                  </h3>
                </td>
                <td>
                  <p>easy east europe</p>
                  <h3>
                    5<sup>€</sup>
                  </h3>
                </td>
              </tr>
              <tr>
                <td>
                  <p>easy south africa</p>
                  <h3>
                    5<sup>€</sup>
                  </h3>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <!--4th ITEMS (credit cards services)--> */}
        <div
          id="service6"
          className={
            "tab-pane fade in panel-services " +
            (serviceSelected === "#service6" ? "active show" : "")
          }
        >
          <table className=" phoneall cardeCredite">
            <tbody>
              <tr>
                <td>
                  <img src={images.paysafe} alt="" />
                  <h3>
                    10<sup>€</sup>
                  </h3>
                </td>
                <td>
                  <img src={images.paysafe} alt="" />
                  <h3>
                    25<sup>€</sup>
                  </h3>
                </td>
              </tr>
              <tr>
                <td>
                  <img src={images.paysafe} alt="" />
                  <h3>
                    50<sup>€</sup>
                  </h3>
                </td>
                <td>
                  <img src={images.paysafe} alt="" />
                  <h3>
                    100<sup>€</sup>
                  </h3>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <!--5th ITEMS (scommesso sprotive services)--> */}
        <div
          id="service7"
          className={
            "tab-pane fade in panel-services " +
            (serviceSelected === "#service7" ? "active show" : "")
          }
        >
          <table className=" phoneall cardeCredite">
            <tbody>
              <tr>
                <td>
                  <img src={images.Stanleybet_logo_international} alt="" />
                  <h3>
                    5<sup>€</sup>
                  </h3>
                </td>
                <td>
                  <img src={images.Stanleybet_logo_international} alt="" />
                  <h3>
                    10<sup>€</sup>
                  </h3>
                </td>
              </tr>
              <tr>
                <td>
                  <img src={images.Stanleybet_logo_international} alt="" />
                  <h3>
                    25<sup>€</sup>
                  </h3>
                </td>
                <td>
                  <img src={images.Stanleybet_logo_international} alt="" />
                  <h3>
                    50<sup>€</sup>
                  </h3>
                </td>
              </tr>
              <tr>
                <td>
                  <img src={images.Stanleybet_logo_international} alt="" />
                  <h3>
                    100<sup>€</sup>
                  </h3>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <!--6th ITEMS (TVs services)--> */}
        <div
          id="service8"
          className={
            "tab-pane fade in panel-services " +
            (serviceSelected === "#service8" ? "active show" : "")
          }
        >
          <table className=" phoneall cardeCredite">
            <tbody>
              <tr>
                <td>
                  <img src={images.Sky_Italia_Logo_2018} alt="" />
                  <h3>
                    15<sup>€</sup>
                  </h3>
                </td>
                <td>
                  <img src={images.Sky_Italia_Logo_2018} alt="" />
                  <h3>
                    25<sup>€</sup>
                  </h3>
                </td>
              </tr>
              <tr>
                <td>
                  <img src={images.Sky_Italia_Logo_2018} alt="" />
                  <h3>
                    50<sup>€</sup>
                  </h3>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <!--7th ITEMS (gift card services)--> */}
        <div
          id="service9"
          className={
            "tab-pane fade in panel-services " +
            (serviceSelected === "#service9" ? "active show" : "")
          }
        >
          <table className=" phoneall giftCards">
            <tbody>
              <tr>
                <td>
                  <img src={images.Amazon_logo} alt="" />
                  <h3>
                    10<sup>€</sup>
                  </h3>
                </td>
                <td>
                  <img src={images.Amazon_logo} alt="" />
                  <h3>
                    25<sup>€</sup>
                  </h3>
                </td>
              </tr>
              <tr>
                <td>
                  <img src={images.Amazon_logo} alt="" />
                  <h3>
                    50<sup>€</sup>
                  </h3>
                </td>
                <td>
                  <img src={images.Amazon_logo} alt="" />
                  <h3>
                    100<sup>€</sup>
                  </h3>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <!--8th ITEMS (crypto valute services)--> */}
        <div
          id="service10"
          className={
            "tab-pane fade in panel-services " +
            (serviceSelected === "#service10" ? "active show" : "")
          }
        >
          <table className=" phoneall cryptoValute">
            <tbody>
              <tr>
                <td>
                  <img src={images.bitcoinorange} alt="" />
                  <p>Bitcoin</p>
                </td>
                <td>
                  <img src={images.bitcoingreen} alt="" />
                  <p>Bitcoin cash</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img src={images.ethereum} alt="" />
                  <p>etherum </p>
                </td>
                <td>
                  <img src={images.riple} alt="" />
                  <p>ripple</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img src={images.litecoin} alt="" />
                  <p>litecoin </p>
                </td>
                <td>
                  <img src={images.dashcoin} alt="" />
                  <p>
                    DASH <br /> DIGITAL CASH
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="cancelMobile">
          <img src={images.cancelMob} alt="" />
        </div>
      </div>
    );
  }
}

export default Service;
