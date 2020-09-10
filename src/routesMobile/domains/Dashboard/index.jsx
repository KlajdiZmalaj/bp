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
    onClick={() => setTab(id)}
    className={
      "serviziFilter--cards__item" + (isEqual(tab, id) ? " active" : "")
    }
  >
    <i className={`fal ${icon}`}></i>
    <span>{name}</span>
  </div>
);
const Dashboard = ({ getFavorites }) => {
  useEffect(() => {
    getFavorites();
  }, []);
  const [tab, setTab] = useState(0);
  const [serviceSearched, setSearch] = useState("");
  const [activeCategory, setCategory] = useState(null);
  const [activeService, setService] = useState(null);
  return (
    <div className="dashBoardContainer">
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
                id={0}
                icon="fa-file-alt"
                tab={tab}
                setTab={setTab}
                name="Tutte"
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
                name="Ricariche Telefoniche"
              />
              <Card
                id={["RTVD", "SCMS"]}
                icon="fa-tv"
                tab={tab}
                setTab={setTab}
                name="Ricariche Tv Digitali"
              />
              <Card
                icon="fa-user-headset"
                id={4}
                tab={tab}
                setTab={() => {
                  window.location.hash = "forms";
                }}
                name="Servizi su Prenotazione"
              />
            </div>
          </div>

          <Servizi
            setService={setService}
            setCategory={setCategory}
            serviceSearched={serviceSearched}
            tab={tab}
          />
        </React.Fragment>
      ) : (
        <ServicesForms
          setService={setService}
          activeCategory={activeCategory}
          activeService={activeService}
        />
      )}
    </div>
  );
};

export default connect(null, MainActions)(Dashboard);
