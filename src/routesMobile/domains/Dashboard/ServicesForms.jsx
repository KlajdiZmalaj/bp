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

const ServicesForms = ({
  activeService,
  activeCategory,
  setService,
  favorites,
  toggleFavorite,
  accountInfo,
}) => {
  const isTestAcc =
    accountInfo.profile.username === "mynewagency" &&
    accountInfo.profile.role.name === "agency" &&
    accountInfo.profile.role.id === 11;
  const isSepaUser =
    accountInfo.profile.username === "sepa_agency" ||
    accountInfo.profile.username === "sepa_user";
  let allFavServices = [];
  Object.keys(favorites).forEach((item) => {
    Object.keys(favorites[item]).forEach((subitem) => {
      allFavServices.push(subitem);
    });
  });
  return (
    <div className="servicesForms">
      {activeCategory === "RTELD" || activeCategory === "RTELC" ? (
        <NumpadForm
          setService={setService}
          activeCategory={activeCategory}
          activeService={activeService}
          toggleFavorite={toggleFavorite}
          allFavServices={allFavServices}
        />
      ) : activeCategory === "GIFT" ||
        activeCategory === "SND000" ||
        activeCategory === "RTELI" ||
        activeCategory === "RTVD" ||
        activeCategory === "CCARD" ||
        activeCategory === "SCMS" ? (
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
      ) : activeService === "PAGF24" && isTestAcc ? (
        <BolletiniPremercati
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
