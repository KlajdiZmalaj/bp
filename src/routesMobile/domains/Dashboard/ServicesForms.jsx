import React, { useEffect } from "react";
import NumpadForm from "./modals/NumpadForm";
import BolletiniBianchi from "./modals/BolletiniBianchi";
import BolletiniPremercati from "./modals/BolletiniPremercati";
import PostePay from "./modals/PostePay";
const ServicesForms = ({
  activeService,
  activeCategory,
  setService,
  favorites,
  toggleFavorite,
}) => {
  let allFavServices = [];
  Object.keys(favorites).forEach((item) => {
    Object.keys(favorites[item]).forEach((subitem) => {
      allFavServices.push(subitem);
    });
  });
  return (
    <div className="servicesForms">
      {activeCategory === "RTELD" ||
      activeCategory === "RTELC" ||
      activeCategory === "RTELI" ? (
        <NumpadForm
          setService={setService}
          activeCategory={activeCategory}
          activeService={activeService}
          toggleFavorite={toggleFavorite}
          allFavServices={allFavServices}
        />
      ) : activeService === "BOL001" ? (
        <BolletiniBianchi
          setService={setService}
          activeService={activeService}
          toggleFavorite={toggleFavorite}
          allFavServices={allFavServices}
        />
      ) : activeService === "BOL002" ? (
        <BolletiniPremercati
          setService={setService}
          activeService={activeService}
          toggleFavorite={toggleFavorite}
          allFavServices={allFavServices}
        />
      ) : activeService === "RPP001" ? (
        <PostePay
          setService={setService}
          activeService={activeService}
          toggleFavorite={toggleFavorite}
          allFavServices={allFavServices}
        />
      ) : (
        <RedirectDashboard
          activeService={activeService}
          setService={setService}
        />
      )}
    </div>
  );
};
const RedirectDashboard = ({ setService, activeService }) => {
  useEffect(() => {
    setTimeout(() => {
      setService(null);
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="serviceSoon">
      Servizio {activeService} {` `}disponibile a breve. Reindirizzamento alla
      schermata iniziale ...
    </div>
  );
};
export default ServicesForms;
