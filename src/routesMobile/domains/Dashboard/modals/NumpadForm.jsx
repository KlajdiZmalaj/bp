import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import images from "themes/images";
import AuthActions from "redux-store/models/auth";
import { notification } from "antd";
import ReactToPrint from "react-to-print";

const Numpad = ({
  services,
  activeService,
  activeCategory,
  setService,
  getRechargeMobile,
  setRechargeMobile,
  rechargeMobile,
  loadingRechargeMobile,
  setLoadingRecharge,
  skinExtras,
  allFavServices,
  toggleFavorite,
}) => {
  const [selectedCost, setCost] = useState(null);
  const [inpVal, setVal] = useState("");
  const [toPrint, setPrint] = useState(false);
  const printT = useRef();

  useEffect(() => {
    if (!selectedCost) {
      setCost(services[activeCategory][activeService].services[0]);
    }
  }, [services, activeService]);
  useEffect(() => {
    if (Object.values(rechargeMobile).length > 0)
      notification[rechargeMobile.errors ? "error" : "success"]({
        message: rechargeMobile.message,
        description: Object.values(rechargeMobile.errors || {}),
      });
  }, [rechargeMobile]);
  useEffect(() => {
    if (loadingRechargeMobile)
      notification["info"]({
        message: "Transazione di caricamento...",
      });
  }, [loadingRechargeMobile]);
  // console.log(
  //   "services",
  //   services,
  //   activeCategory,
  //   activeService,
  //   services[activeCategory][activeService]
  // );
  return (
    <div className="mobileNumPad">
      <div className="mobileNumPad--services">
        {services &&
          services[activeCategory][activeService].services.map(
            (priceService) => {
              return (
                <div
                  key={priceService.service_id}
                  className={`mobileNumPad--services__tab${
                    selectedCost?.service_id === priceService.service_id
                      ? " active"
                      : ""
                  }`}
                  onClick={() => setCost(priceService)}
                >
                  <span>{priceService.cost.split(".")[0]}</span>
                  <sup>€</sup>
                </div>
              );
            }
          )}
      </div>
      <div className="mobileNumPad--headsub">
        <div className="mobileNumPad--header">
          <img src={images[activeService] || images[activeCategory]} alt="" />
          {selectedCost?.name}
          <i
            onClick={() => {
              if (allFavServices.includes(activeService)) {
                toggleFavorite(activeService, "remove");
              } else {
                toggleFavorite(activeService, "set");
              }
            }}
            className={
              "fas fa-star" +
              (allFavServices.includes(activeService) ? " active" : "")
            }
            aria-hidden="true"
          ></i>{" "}
        </div>
        <div className="mobileNumPad--subh">
          INSERIRE IL NUMERO DI TELEFONO DA RICARICARE
        </div>
      </div>

      <div className="mobileNumPad--input">
        <span>+39</span> <input value={inpVal} type="text" readOnly />{" "}
        <i className="fas fa-address-book"></i>
      </div>
      <div className="mobileNumPad--numbers">
        {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((a) => {
          return (
            <div key={a} onClick={() => setVal(`${inpVal}${a}`)}>
              {a}
            </div>
          );
        })}
        <div onClick={() => setVal("")}>C</div>
        <div onClick={() => setVal(`${inpVal}${0}`)}>0</div>
      </div>

      <div className="mobileNumPad--buttons">
        <button
          className={`${loadingRechargeMobile ? "disable" : ""}`}
          onClick={() => {
            setLoadingRecharge(true);
            getRechargeMobile(
              selectedCost?.service_id,
              `39${inpVal}`,
              setLoadingRecharge
            );
          }}
        >
          Esegui <i className="fal fa-check" aria-hidden="true"></i>
        </button>
        <button
          onClick={() => {
            if (!rechargeMobile.receipt) {
              notification["warning"]({
                message: "Ticket non e generata",
              });
            }
            setPrint(true);
          }}
        >
          Stampa
        </button>
        <button
          onClick={() => {
            setService(null);
            setRechargeMobile({});
          }}
        >
          Anulla <i className="fal fa-times" aria-hidden="true"></i>
        </button>
      </div>
      {rechargeMobile.receipt && toPrint && (
        <div className="mobileNumPad--ticket">
          <div className="printModal" ref={printT}>
            <div className="headerModal">
              <img className="logo" src={images.logo} alt="" />
              <span className="superSmall text-bold">
                MAPE <span>di Hristova Mariya Hristova e C.s.a.s.</span>
              </span>
              <span className="superSmall">{skinExtras.address}</span>
              <span className="superSmall link">{skinExtras.mail}</span>
              <span className="superSmall ">Tel: {skinExtras.cel}</span>
              <span className="superSmall tel">P.IVA 03852290406</span>
              <span className="fontSmall text-bold">
                {rechargeMobile.agency_name}
              </span>
              <span className="fontSmall address">
                {rechargeMobile.agency_address}
              </span>
              {/* <span className="userCel">
                          {" "}
                          Telefono: <b>{rechargeMobile.agency_phone}</b>{" "}
                        </span> */}
              {/* <span>BPOINT</span> */}
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  rechargeMobile.receipt &&
                  rechargeMobile.receipt
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
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
            <img
              className="qrCodeImg"
              src={`https://api.qrserver.com/v1/create-qr-code/?data=https%3A%2F%2F${window.location.host}%2F%23%2Fqr%2F${rechargeMobile.barcode}&size=420x420&margin=10`}
              alt=""
            />
            <img
              className="barcodeModal"
              src={`https://barcode.tec-it.com/barcode.ashx?data=${rechargeMobile.barcode}&code=Code128&multiplebarcodes=false&translate-esc=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=0`}
              alt=""
            />

            <div className="btn-group" role="group">
              <ReactToPrint
                trigger={() => (
                  <button type="button" className="stampBtn">
                    <img src={images.checkSymbol} alt="" />
                    <br />
                    Stampa
                  </button>
                )}
                content={() => printT.current}
                bodyClass="afterprint"
                // copyStyles="false"
              />

              <button
                type="button"
                className="anullaBtn"
                onClick={() => {
                  setPrint(false);
                }}
              >
                <img src={images.close} alt="" /> <br />
                Anulla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const mstp = ({
  main: { services },
  auth: { rechargeMobile, loadingRechargeMobile, skinExtras },
}) => {
  return {
    services,
    rechargeMobile,
    loadingRechargeMobile,
    skinExtras,
  };
};
export default connect(mstp, AuthActions)(Numpad);
