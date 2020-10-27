import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import images from "themes/images";
import AuthActions from "redux-store/models/auth";
import { notification } from "antd";
import ReactToPrint from "react-to-print";
import { BannerColors } from "config/index";
import { getScale } from "utils/HelperFunc";
const range = (start, end) => {
  var array = [];
  for (var i = start; i <= end; i++) {
    array.push(i);
  }
  return array;
};
const BgameServices = [
  {
    cost: "10.00",
    name: "BGame Voucher",
    service_id: "BGM001",
    type: "1",
  },
  {
    cost: "25.00",
    name: "BGame Voucher",
    service_id: "BGM002",
    type: "1",
  },
  {
    cost: "50.00",
    name: "BGame Voucher",
    service_id: "BGM003",
    type: "1",
  },
  {
    cost: "100.00",
    name: "BGame Voucher",
    service_id: "BGM004",
    type: "1",
  },
  {
    cost: "+",
    name: "BGame Voucher",
    service_id: "BGM005",
    type: "+",
  },
];
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
  noNumbers,
}) => {
  const [selectedCost, setCost] = useState(null);
  const [inpVal, setVal] = useState("");
  const [toPrint, setPrint] = useState(false);
  const [bgamePad, setBgamePad] = useState(false);

  const printT = useRef();
  useEffect(() => {
    if (!selectedCost) {
      setCost(services[activeCategory][activeService].services[0]);
    }
  }, [services, activeService, activeCategory, setCost, selectedCost]);

  useEffect(() => {
    if (Object.values(rechargeMobile).length > 0)
      notification[rechargeMobile.errors ? "error" : "success"]({
        message: rechargeMobile.message,
        description: Object.values(rechargeMobile.errors || {}),
      });
  }, [rechargeMobile]);
  useEffect(() => {
    if (selectedCost?.service_id === "BGM005") {
      setBgamePad(true);
    } else if (bgamePad === true) {
      setBgamePad(false);
    }
  }, [bgamePad, selectedCost, setBgamePad]);

  useEffect(() => {
    if (loadingRechargeMobile)
      notification["info"]({
        message: "Transazione di caricamento...",
      });
  }, [loadingRechargeMobile]);
  useEffect(() => {
    getScale(".img.Page", ".GamingBanner.mobile");
  }, []);

  return (
    <div className="mobileNumPad">
      {/* <div className="mobileNumPad--services">
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
          </div>*/}
      <div className="mobileNumPad--services">
        <React.Fragment>
          {(activeService !== "BGAM"
            ? services[activeCategory][activeService].services
            : BgameServices
          ).map((item, index) => {
            let bgamePadCondition =
              item.cost === "+" && item.service_id === "BGM005";
            return selectedCost?.service_id === item.service_id ? (
              <div
                key={index}
                className={`serv ${
                  selectedCost?.service_id === item.service_id ? "active" : ""
                }`}
                onClick={() => setCost(item)}
              >
                <div className="Upper">
                  <div className="Upper--Left"></div>
                  <div className="Upper--Right"></div>
                </div>
                <div className="Bottom">
                  <span className="Price">
                    {bgamePadCondition ? item.cost : parseInt(item.cost)}
                  </span>
                  {!bgamePadCondition && <span className="Euro">€</span>}
                </div>
              </div>
            ) : (
              <div
                key={index}
                className={`serv ${
                  selectedCost?.service_id === item.service_id ? "active" : ""
                }`}
                onClick={() => setCost(item)}
              >
                <span className="Price">
                  {bgamePadCondition ? item.cost : parseInt(item.cost)}
                </span>
                {!bgamePadCondition && <span className="Euro">€</span>}
              </div>
            );
          })}
          {services[activeCategory][activeService].services &&
            Array.isArray(services[activeCategory][activeService].services) &&
            services[activeCategory][activeService].services.length < 5 &&
            range(
              services[activeCategory][activeService].services.length + 1,
              5
            ).map((item) => {
              return <div key={item} className="serv noborder"></div>;
            })}
        </React.Fragment>
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
          {!noNumbers
            ? "INSERIRE IL NUMERO DI TELEFONO DA RICARICARE"
            : "SELEZIONA LE RICARICHE IN BASSO ED ESEGUI"}
        </div>
      </div>
      {!noNumbers || bgamePad === true ? (
        <>
          <div className="mobileNumPad--input">
            {!bgamePad && <span>+39</span>}{" "}
            <input
              value={
                bgamePad === true
                  ? inpVal
                    ? parseFloat(inpVal).toLocaleString("it-IT", {
                        minimumFractionDigits: 2,
                      })
                    : "0,00"
                  : inpVal
              }
              type="text"
              readOnly
            />{" "}
            {"contacts" in navigator && "ContactsManager" in window && (
              <i
                onClick={async () => {
                  const props = ["tel"];
                  const opts = { multiple: false };

                  try {
                    const contacts = await navigator.contacts.select(
                      props,
                      opts
                    );
                    setVal((contacts[0]?.tel?.[0] || "").replace("+39", ""));
                  } catch (ex) {}
                }}
                className="fas fa-address-book"
              ></i>
            )}
          </div>
          <div className="mobileNumPad--numbers">
            {bgamePad === true
              ? [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", "0", "x"].map((num) => (
                  <div
                    key={num}
                    id={`num${num}`}
                    className={`bgm ${num === "x" ? "x" : ""}`}
                    onClick={() =>
                      num === "x"
                        ? inpVal.charAt(inpVal.length - 1) === "."
                          ? setVal(inpVal.slice(0, -2))
                          : setVal(inpVal.slice(0, -1))
                        : num === "."
                        ? inpVal.includes(".")
                          ? setVal(inpVal)
                          : setVal(`${inpVal}.`)
                        : setVal(`${inpVal}${num}`)
                    }
                  >
                    {num === "x" ? (
                      <span>
                        <i className="fal fa-times" />
                        <div className="triangle"></div>
                      </span>
                    ) : (
                      num
                    )}
                  </div>
                ))
              : [7, 8, 9, 4, 5, 6, 1, 2, 3].map((a) => {
                  return (
                    <div key={a} onClick={() => setVal(`${inpVal}${a}`)}>
                      {a}
                    </div>
                  );
                })}
            <div onClick={() => setVal("")}>C</div>
            <div onClick={() => setVal(`${inpVal}${0}`)}>0</div>
          </div>
        </>
      ) : (
        <div
          className="GamingBanner mobile"
          style={{
            background: `${
              BannerColors?.[selectedCost?.service_id.substring(0, 3)]
            }`,
          }}
        >
          <div className="img Page">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img
              src={
                images?.[`Service${selectedCost?.service_id.substring(0, 3)}`]
              }
            />
            <span>{selectedCost?.cost}€</span>
          </div>
        </div>
      )}

      <div className="mobileNumPad--buttons">
        <button
          className={`${loadingRechargeMobile ? "disable" : ""}`}
          onClick={() => {
            setLoadingRecharge(true);
            getRechargeMobile(
              selectedCost?.service_id
                ? selectedCost?.service_id.includes("BGM00")
                  ? "BGM001"
                  : selectedCost?.service_id
                : selectedCost?.service_id,
              noNumbers
                ? selectedCost?.service_id.includes("BGM00")
                  ? inpVal
                  : null
                : `39${inpVal}`,
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
                message: "Ticket non compilato",
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
