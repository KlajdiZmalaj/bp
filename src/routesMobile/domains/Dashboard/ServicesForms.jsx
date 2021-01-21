import React, { useEffect } from "react";
import NumpadForm from "./modals/NumpadForm";
import NewBolletiniBianchi from "./modals/NewBolletiniBianchi";
import NewBolletiniPremercati from "./modals/NewBolletiniPremercati";
import BolletiniBianchi from "./modals/BolletiniBianchi";
import BolletiniPremercati from "./modals/BolletiniPremarcati";
import PostePay from "./modals/PostePay";
import BolloAuto from "./modals/BolloAuto";
import PagoPa from "./modals/PagoPa";
import MavRav from "./modals/MavRav";
import F24 from "./modals/F24";
import Freccia from "./modals/Freccia";
import { connect } from "react-redux";
const ServicesForms = ({
  activeService,
  activeCategory,
  setService,
  favorites,
  toggleFavorite,
  accountInfo,
  services,
}) => {
  const isTestAcc =
    accountInfo.profile.username === "mynewagency" &&
    accountInfo.profile.role.name === "agency" &&
    accountInfo.profile.role.id === 11;
  const isSepaUser =
    accountInfo.profile.username === "sepaagency" ||
    accountInfo.profile.username === "sepa_user";
  let allFavServices = [];
  Object.keys(favorites).forEach((item) => {
    Object.keys(favorites[item]).forEach((subitem) => {
      allFavServices.push(subitem);
    });
  });

  let serviceObj = {};
  Object.keys(services).forEach((category) => {
    Object.keys(services[category]).forEach((serviceKey) => {
      if (serviceKey === activeService) {
        serviceObj = services[category][serviceKey];
      }
    });
  });
  //console.log("serviceObj", serviceObj);
  const ValidService =
    serviceObj?.services?.[0].type?.toString?.() === "0" ||
    serviceObj?.services?.[0].type?.toString?.() === "1";
  return (
    <div className="servicesForms">
      {activeCategory === "RTELD" && ValidService ? (
        <NumpadForm
          setService={setService}
          activeCategory={activeCategory}
          activeService={activeService}
          toggleFavorite={toggleFavorite}
          allFavServices={allFavServices}
        />
      ) : (activeCategory === "GIFT" ||
          activeCategory === "SND000" ||
          activeCategory === "RTELI" ||
          activeCategory === "RTVD" ||
          activeCategory === "CCARD" ||
          activeCategory === "RTELC" ||
          activeCategory === "SCMS") &&
        ValidService ? (
        <NumpadForm
          noNumbers={true}
          setService={setService}
          activeCategory={activeCategory}
          activeService={activeService}
          toggleFavorite={toggleFavorite}
          allFavServices={allFavServices}
        />
      ) : activeService === "BOL001" ? (
        isTestAcc || isSepaUser ? (
          <NewBolletiniBianchi
            setService={setService}
            activeService={activeService}
            toggleFavorite={toggleFavorite}
            allFavServices={allFavServices}
          />
        ) : (
          <BolletiniBianchi
            setService={setService}
            activeService={activeService}
            toggleFavorite={toggleFavorite}
            allFavServices={allFavServices}
          />
        )
      ) : activeService === "BOL002" ? (
        isTestAcc || isSepaUser ? (
          <NewBolletiniPremercati
            setService={setService}
            activeService={activeService}
            toggleFavorite={toggleFavorite}
            allFavServices={allFavServices}
          />
        ) : (
          <BolletiniPremercati
            setService={setService}
            activeService={activeService}
            toggleFavorite={toggleFavorite}
            allFavServices={allFavServices}
          />
        )
      ) : activeService === "BOL004" || activeService === "BOL003" ? (
        <MavRav
          setService={setService}
          activeService={activeService}
          toggleFavorite={toggleFavorite}
          allFavServices={allFavServices}
        />
      ) : activeService === "PPA001" ? (
        <PagoPa
          setService={setService}
          activeService={activeService}
          toggleFavorite={toggleFavorite}
          allFavServices={allFavServices}
        />
      ) : activeService === "PAGF24" ? (
        <F24
          setService={setService}
          activeService={activeService}
          toggleFavorite={toggleFavorite}
          allFavServices={allFavServices}
        />
      ) : activeService === "BOL006" ? (
        <BolloAuto
          setService={setService}
          activeService={activeService}
          toggleFavorite={toggleFavorite}
          allFavServices={allFavServices}
        />
      ) : activeService === "BOL007" ? (
        <Freccia
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
const mstp = ({ main: { services } }) => {
  return {
    services,
  };
};
export default connect(mstp)(ServicesForms);
