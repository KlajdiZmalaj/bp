import React from "react";
import NumpadForm from "./modals/NumpadForm";
import BolletiniBianchi from "./modals/BolletiniBianchi";
import BolletiniPremercati from "./modals/BolletiniPremercati";
const ServicesForms = ({ activeService, activeCategory, setService }) => {
  console.log("activeCategory", activeCategory, activeService);
  return (
    <div className="servicesForms">
      {activeCategory === "RTELD" ||
      activeCategory === "RTELC" ||
      activeCategory === "RTELI" ? (
        <NumpadForm
          setService={setService}
          activeCategory={activeCategory}
          activeService={activeService}
        />
      ) : activeService === "BOL001" ? (
        <BolletiniBianchi
          setService={setService}
          activeService={activeService}
        />
      ) : activeService === "BOL002" ? (
        <BolletiniPremercati
          setService={setService}
          activeService={activeService}
        />
      ) : (
        <div className="serviceSoon">
          Servizio {activeService}
          disponibile a breve{" "}
          <button onClick={() => setService(null)}>Indietro</button>
        </div>
      )}
    </div>
  );
};
export default ServicesForms;
