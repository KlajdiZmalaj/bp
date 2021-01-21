import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import images from "themes/images";
import AuthActions from "redux-store/models/auth";
import { notification } from "antd";
import { BannerColors } from "config/index";
import { getScale } from "utils/HelperFunc";
import PrintTicketMob from "./PrintTicketMob";
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
const BbetServices = [
  {
    cost: "10.00",
    name: "BGame Voucher",
    service_id: "BBT001",
    type: "1",
  },
  {
    cost: "25.00",
    name: "BGame Voucher",
    service_id: "BBT002",
    type: "1",
  },
  {
    cost: "50.00",
    name: "BGame Voucher",
    service_id: "BBT003",
    type: "1",
  },
  {
    cost: "100.00",
    name: "BGame Voucher",
    service_id: "BBT004",
    type: "1",
  },
  {
    cost: "+",
    name: "BGame Voucher",
    service_id: "BBT005",
    type: "+",
  },
];
const Numpad = ({
  services,
  activeService,
  activeCategory,
  setService,
  getRechargeMobile,
  getCustomVoucherReq,
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
    //console.log("ca ka", services, activeService, activeCategory, selectedCost);
    if (!selectedCost) {
      if (activeService === "BGAM") {
        setCost(BgameServices[0]);
      } else if (activeService === "BBET") {
        setCost(BbetServices[0]);
      } else {
        setCost(services[activeCategory][activeService].services[0]);
      }
    }
  }, [services, activeService, activeCategory, setCost, selectedCost]);

  // useEffect(() => {
  //   if (Object.values(rechargeMobile).length > 0)
  //     notification[rechargeMobile.errors ? "error" : "success"]({
  //       message: rechargeMobile.message,
  //       description: Object.values(rechargeMobile.errors || {}),
  //     });
  // }, [rechargeMobile]);
  useEffect(() => {
    if (
      selectedCost?.service_id === "BGM005" ||
      selectedCost?.service_id === "BBT005"
    ) {
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
  }, [bgamePad]);

  return (
    <div className="mobileNumPad">
      <div className="mobileNumPad--services">
        <React.Fragment>
          {(activeService === "BGAM"
            ? BgameServices
            : activeService === "BBET"
            ? BbetServices
            : services[activeCategory][activeService].services
          ).map((item, index) => {
            let bgamePadCondition =
              item.cost === "+" &&
              (item.service_id === "BGM005" || item.service_id === "BBT005");
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
      ) : activeCategory === "SCMS" ? (
        <div
          className="GamingBanner mobile"
          style={{
            background: `${
              BannerColors?.[selectedCost?.service_id.substring(0, 3)] ||
              "#03312E"
            }`,
          }}
          alt={[selectedCost?.service_id.substring(0, 3)]}
        >
          <div className="img Page">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img
              src={
                images?.[
                  `Service${selectedCost?.service_id.substring(0, 3)}`
                ] || images["ServiceDefault"]
              }
            />
            <span>{selectedCost?.cost}€</span>
          </div>
        </div>
      ) : (
        <div className="OtherBanner">
          <img src={images[activeService] || images[activeCategory]} alt="" />
        </div>
      )}

      <div className="mobileNumPad--buttons">
        <button
          className={`${loadingRechargeMobile ? "disable" : ""}`}
          onClick={() => {
            setLoadingRecharge(true);

            if (
              selectedCost?.service_id.includes("BGM00") ||
              selectedCost?.service_id.includes("BBT00")
            ) {
              //("inpVal", inpVal, selectedCost);
              getCustomVoucherReq(
                selectedCost?.service_id.includes("BGM00")
                  ? "BGM001"
                  : selectedCost?.service_id.includes("BBT00")
                  ? "BBT001"
                  : "",
                inpVal || selectedCost?.cost,
                setLoadingRecharge
              );
            } else {
              getRechargeMobile(
                selectedCost?.service_id,
                `${inpVal}`,
                setLoadingRecharge
              );
            }
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
          Annulla <i className="fal fa-times" aria-hidden="true"></i>
        </button>
      </div>
      {rechargeMobile.receipt && toPrint && (
        <div className="mobileNumPad--ticket">
          <PrintTicketMob
            rechargeMobile={rechargeMobile}
            printT={printT}
            skinExtras={skinExtras}
            setPrint={setPrint}
          />
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
