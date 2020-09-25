import "./style.css";
import React, { useState, useEffect } from "react";
import { UserInfoBar } from "shared-componentsMobile";
import Servizi from "./Servizi";
import { isEqual } from "lodash";
import MainActions from "redux-store/models/main";
import { connect } from "react-redux";
import ServicesForms from "./ServicesForms";
const Card = ({ setTab, tab, id, name, icon }) => (
  <div
    onClick={() => {
      setTab(id);
      if (id !== "0" && id.includes("PRDPST")) {
        const el = document.querySelector("#PRDPST");
        if (el) el.click();
      }
    }}
    id={`tab${id}`}
    className={
      "serviziFilter--cards__item" + (isEqual(tab, id) ? " active" : "")
    }
  >
    <i className={`fal ${icon}`}></i>
    <span>{name}</span>
  </div>
);
const Dashboard = ({ getFavorites, favorites, toggleFavorite }) => {
  useEffect(() => {
    getFavorites();
  }, []);
  const [tab, setTab] = useState("0");
  const [serviceSearched, setSearch] = useState("");
  const [activeCategory, setCategory] = useState(null);
  const [activeService, setService] = useState(null);
  return (
    <div className="mobileWrapper">
      <UserInfoBar />

      {!activeService ? (
        <React.Fragment>
          <div className="serviziFilter">
            <div className="serviziFilter--search">
              <input
                value={serviceSearched}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Cerca tra i servizi attivi"
              />
              <i className="fal fa-search" aria-hidden="true"></i>
            </div>

            <div className="serviziFilter--cards">
              <Card
                id={"fav"}
                icon="fa-star"
                tab={tab}
                setTab={setTab}
                name="Servizi Preferiti"
              />
              <Card
                id={"0"}
                icon="fa-file-alt"
                tab={tab}
                setTab={setTab}
                name={`Tutti${"\n"}Servizi`}
              />
              <Card
                id={["PRDPST"]}
                icon="fa-file-alt"
                tab={tab}
                setTab={setTab}
                name="Prodotti Postali"
              />
              <Card
                id={["RTELC", "RTELD", "RTELI"]}
                icon="fa-mobile"
                tab={tab}
                setTab={setTab}
                name={`Ricariche${"\n"}Telefoniche`}
              />
              <Card
                id={["RTVD"]}
                icon="fa-tv"
                tab={tab}
                setTab={setTab}
                name={`Ricariche${"\n"}Tv Digitali`}
              />
              <Card
                id={["SCMS"]}
                icon="icon-scomese"
                tab={tab}
                setTab={setTab}
                name={`Ricariche${"\n"}Conti Online`}
              />
              <Card
                icon="fa-user-headset"
                id={"4"}
                tab={tab}
                setTab={setTab}
                name="Servizi su Prenotazione"
              />
            </div>
          </div>

          <Servizi
            setService={setService}
            setCategory={setCategory}
            serviceSearched={serviceSearched}
            tab={tab}
            favorites={favorites}
          />
        </React.Fragment>
      ) : (
        <ServicesForms
          setService={setService}
          activeCategory={activeCategory}
          activeService={activeService}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
};
const mstp = ({ main: { favorites } }) => ({ favorites });

export default connect(mstp, MainActions)(Dashboard);
