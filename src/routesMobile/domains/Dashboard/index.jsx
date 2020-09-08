import "./style.css";
import React, { useState } from "react";
import { UserInfoBar } from "shared-componentsMobile";
import Servizi from "./Servizi";
const Dashboard = () => {
  const [tab, setTab] = useState(1);
  return (
    <div className="dashBoardContainer">
      <UserInfoBar />
      <div className="serviziFilter">
        <div className="serviziFilter--search">
          <input type="text" placeholder="Cerca tra i servizi attivi" />
          <i className="fal fa-search" aria-hidden="true"></i>
        </div>
        <div className="serviziFilter--cards">
          <div
            onClick={() => setTab(1)}
            className={
              "serviziFilter--cards__item" + (tab === 1 ? " active" : "")
            }
          >
            <i className="fal fa-file-alt"></i>
            <span>Prodotti Postali</span>
          </div>
          <div
            onClick={() => setTab(2)}
            className={
              "serviziFilter--cards__item" + (tab === 2 ? " active" : "")
            }
          >
            <i className="fal fa-mobile"></i>
            <span>Ricariche Telefoniche</span>
          </div>
          <div
            onClick={() => setTab(3)}
            className={
              "serviziFilter--cards__item" + (tab === 3 ? " active" : "")
            }
          >
            <i className="fal fa-tv"></i>
            <span>Ricariche Tv Digitali</span>
          </div>
          <div
            onClick={() => setTab(4)}
            className={
              "serviziFilter--cards__item" + (tab === 4 ? " active" : "")
            }
          >
            <i className="fal fa-user-headset"></i>
            <span>Servizi su Prenotazione</span>
          </div>
        </div>
      </div>
      <Servizi filter={tab} />
    </div>
  );
};

export default Dashboard;
