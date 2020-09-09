import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import images from "themes/images";
const Numpad = ({ services, activeService, activeCategory, setService }) => {
  const [selectedCost, setCost] = useState(null);
  const [inpVal, setVal] = useState("");
  useEffect(() => {
    if (!selectedCost) {
      setCost(services[activeCategory][activeService].services[0]);
    }
  }, [services, activeService]);
  console.log(
    "numpad activeService",
    services,
    activeService,
    activeCategory,
    selectedCost
  );

  return (
    <div className="mobileNumPad">
      <div className="mobileNumPad--services">
        {services &&
          services[activeCategory][activeService].services.map(
            (priceService) => {
              return (
                <div
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
      <div className="mobileNumPad--header">
        <img src={images[activeService] || images[activeCategory]} alt="" />
        {selectedCost?.name}
      </div>
      <div className="mobileNumPad--subh">
        INSERIRE IL NUMERO DI TELEFONO DA RICARICARE
      </div>
      <div className="mobileNumPad--input">
        <span>+39</span> <input value={inpVal} type="text" readOnly />{" "}
        <i class="fas fa-address-book"></i>
      </div>
      <div className="mobileNumPad--numbers">
        {[...new Array(9)].map((a, b) => {
          return <div onClick={() => setVal(`${inpVal}${b + 1}`)}>{b + 1}</div>;
        })}
        <div onClick={() => setVal(`${inpVal}${0}`)}>0</div>
        <div onClick={() => setVal("")}>C</div>
      </div>
      <div className="mobileNumPad--buttons">
        <button>
          Esegui <i className="fal fa-check" aria-hidden="true"></i>
        </button>
        <button>
          Stampa <span>Pre Scontrino</span>
        </button>
        <button
          onClick={() => {
            setService(null);
          }}
        >
          Anulla <i className="fal fa-times" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};
const mstp = ({ main: { services } }) => {
  return {
    services,
  };
};
export default connect(mstp, null)(Numpad);
