import React, { useState } from "react";
import images from "themes/images";
import { capitalize } from "lodash";
import Voli from "routes/domains/Forms/Voli";
import Treni from "routes/domains/Forms/Treni";
import Eventi from "routes/domains/Forms/Eventi";
import { withRouter } from "react-router-dom";
import "./style.css";
const Item = ({ name, activeService, setService }) => (
  <div
    onClick={() => {
      setService(name);
    }}
    className={
      "prenotation--services__item" + (activeService === name ? " active" : "")
    }
  >
    <img className={name} src={images[`${name}-mobile`]} alt="" />
    <span>{capitalize(name)}</span>
  </div>
);

const Prenotazione = ({ match: { params } }) => {
  const { id } = params;
  const [activeService, setService] = useState(id || "expedia");
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
      </div>
    </div>
  );
};
export default withRouter(Prenotazione);
