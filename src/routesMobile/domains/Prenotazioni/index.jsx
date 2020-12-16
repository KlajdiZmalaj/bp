import React, { useState } from "react";
import images from "themes/images";
import { capitalize } from "lodash";
import Voli from "routes/domains/Forms/Voli";
import Treni from "routes/domains/Forms/Treni";
import Eventi from "routes/domains/Forms/Eventi";
import OnlineShop from "routes/domains/Forms/OnlineShop";
import Bgame from "routes/domains/Forms/Bgame";
import Energia from "routes/domains/Forms/Energia";

import { withRouter } from "react-router-dom";
import "./style.css";
const Item = ({ name, activeService, setService, priorityName }) => (
  <div
    onClick={() => {
      setService(name);
    }}
    className={
      "prenotation--services__item" + (activeService === name ? " active" : "")
    }
  >
    <img
      className={name}
      src={images[`${name}-mobile`]}
      alt={`${name}-mobile`}
    />
    <span>{priorityName ? priorityName : capitalize(name)}</span>
  </div>
);

const Prenotazione = ({ match: { params } }) => {
  const { id } = params;
  const [activeService, setService] = useState(id || "expedia");

  React.useEffect(() => {
    document.querySelector(".wrapperServices").scrollLeft =
      document.querySelector(".prenotation--services__item.active").offsetLeft -
      //padding right 18
      18;
  }, [id, activeService]);
  return (
    <div className="mobileWrapper prenotation">
      <div className="prenotation--services">
        <div className="wrapperServices">
          <Item
            activeService={activeService}
            setService={setService}
            name="expedia"
          />
          <Item
            activeService={activeService}
            setService={setService}
            name="flixbus"
          />
          <Item
            activeService={activeService}
            setService={setService}
            name="trenitalia"
          />
          <Item
            activeService={activeService}
            setService={setService}
            name="vivaticket"
          />
          <Item
            activeService={activeService}
            setService={setService}
            name="ticketone"
          />
          <Item
            activeService={activeService}
            setService={setService}
            name="stubhub"
          />
          <Item
            activeService={activeService}
            setService={setService}
            name="shop-online"
            priorityName="Online Shop"
          />
          <Item
            activeService={activeService}
            setService={setService}
            name="bgame"
            priorityName="Registrazione"
          />
          <Item
            activeService={activeService}
            setService={setService}
            name="luce-gas"
            priorityName="Luce - Gas"
          />
        </div>
      </div>
      <div className="prenotation--view">
        {activeService === "expedia" && (
          <Voli
            nome_agenzia={activeService}
            typee={1}
            isMobile
            activeService={activeService}
          />
        )}
        {(activeService === "flixbus" || activeService === "trenitalia") && (
          <Treni
            nome_agenzia={activeService}
            typee={2}
            isMobile
            activeService={activeService}
          />
        )}
        {(activeService === "vivaticket" ||
          activeService === "stubhub" ||
          activeService === "ticketone") && (
          <Eventi
            nome_agenzia={activeService}
            typee={3}
            isMobile
            activeService={activeService}
          />
        )}
        {activeService === "shop-online" && (
          <OnlineShop
            nome_agenzia={"Online Shop"}
            typee={4}
            isMobile
            activeService={activeService}
          />
        )}
        {activeService === "bgame" && (
          <Bgame
            nome_agenzia={"bgame"}
            typee={5}
            isMobile
            activeService={activeService}
          />
        )}
        {activeService === "luce-gas" && (
          <Energia
            nome_agenzia={"luce-gas"}
            typee={8}
            isMobile
            activeService={activeService}
          />
        )}
      </div>
    </div>
  );
};
export default withRouter(Prenotazione);
