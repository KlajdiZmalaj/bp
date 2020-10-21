import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MainActions from "redux-store/models/main";
import { capitalize } from "lodash";
import images from "themes/images";
const OneTab = ({
  serviceCategory,
  services,
  panelOpen,
  setPanelOpen,
  setService,
  setCategory,
  accountInfo,
  isFav,
}) => {
  // console.log("tab", services, serviceCategory);
  const [open, setDD] = useState(false);
  useEffect(() => {
    if (panelOpen !== serviceCategory) {
      setDD(false);
    }
  }, [panelOpen, serviceCategory]);
  return (
    services && (
      <div className="mobileServices--panel">
        <div
          id={serviceCategory}
          className={"mobileServices--header" + (open ? " active" : "")}
          onClick={() => {
            if (!open) {
              setPanelOpen(serviceCategory);
              setDD(true);
            } else {
              setDD(false);
            }
          }}
        >
          <span>
            {" "}
            {isFav && "Preferiti "}
            {capitalize(services[serviceCategory].name)}
          </span>
          <i
            className={`fal fa-chevron-${
              open && panelOpen === serviceCategory ? "up" : "down"
            }`}
            aria-hidden="true"
          ></i>
        </div>
        {open && panelOpen === serviceCategory && (
          <div className="mobileServices--body animated fadeIn">
            {Object.keys(services[serviceCategory]).map((serviceId) => {
              return (
                serviceCategory !== "PRDPST" &&
                serviceId !== "name" &&
                serviceId !== "group" && (
                  <div
                    onClick={() => {
                      if (accountInfo?.profile) {
                        setService(serviceId);
                        setCategory(serviceCategory);
                      } else {
                        window.location.hash = "login";
                      }
                    }}
                    key={serviceId}
                    data-key={serviceId}
                    className="mobileServices--body__item"
                  >
                    <img
                      src={
                        images[
                          Array.isArray(services[serviceCategory][serviceId])
                            ? services[serviceCategory][serviceId].services[0]
                                ?.service_id
                            : images["BOLL"]
                        ]
                          ? images[
                              Array.isArray(
                                services[serviceCategory][serviceId]
                              )
                                ? services[serviceCategory][serviceId]
                                    .services[0]?.service_id
                                : images["BOLL"]
                            ]
                          : images[serviceId]
                          ? images[serviceId]
                          : images["BOLL"]
                      }
                      alt={
                        serviceId +
                        "||||" +
                        services[serviceCategory][serviceId].service_id
                      }
                    />
                    <span> {services[serviceCategory][serviceId].name}</span>
                  </div>
                )
              );
            })}
            {serviceCategory === "PRDPST" &&
              Object.keys(services["PRDPST"]).map((item) => {
                return item !== "name" &&
                  item !== "group" &&
                  services["PRDPST"][item].services[0].service_id === "BOL001"
                  ? services["PRDPST"][item].services.map((serviceI) => (
                      <div
                        className="mobileServices--body__item"
                        onClick={() => {
                          if (accountInfo?.profile) {
                            setService(serviceI.service_id);
                            setCategory("PRDPST");
                          } else {
                            window.location.hash = "login";
                          }
                        }}
                        key={serviceI.service_id}
                      >
                        <img
                          src={
                            serviceI.service_id === "BOL006" ||
                            serviceI.service_id === "PPA001" ||
                            serviceI.service_id === "PAGF24"
                              ? images[`${serviceI.service_id}-Black-Mobile`]
                              : images[`BOLL-Black-Mobile`]
                          }
                          alt={serviceI.service_id}
                        />
                        <span>{serviceI.name} </span>
                      </div>
                    ))
                  : item !== "name" && item !== "group" && (
                      <div
                        className="mobileServices--body__item"
                        onClick={() => {
                          if (accountInfo?.profile) {
                            setService(
                              services["PRDPST"][item].services[0].service_id
                            );
                            setCategory("PRDPST");
                          } else {
                            window.location.hash = "login";
                          }
                        }}
                        key={services["PRDPST"][item].services[0].service_id}
                      >
                        <img
                          src={
                            images[
                              services["PRDPST"][item].services[0]
                                .service_id === "PPA001"
                                ? `${services["PRDPST"][item].services[0].service_id}-Black-Mobile`
                                : `${item === "RCPP" ? "RCPP" : "BOLL"}${
                                    item === "RCPP" ? "" : "-Black-Mobile"
                                  }`
                            ]
                          }
                          alt={services["PRDPST"][item].services[0].service_id}
                        />
                        <span>{services["PRDPST"][item].name} </span>
                      </div>
                    );
              })}
          </div>
        )}
      </div>
    )
  );
};
const Servizi = ({
  services,
  getServices,
  serviceSearched,
  tab,
  setService,
  setCategory,
  accountInfo,
  favorites,
}) => {
  useEffect(() => {
    if (Object.keys(services).length === 0) {
      getServices();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [panelOpen, setPanelOpen] = useState(null);
  return (
    <div className="mobileServices">
      {Object.keys(services).map((serviceCategory) => {
        return (
          services[serviceCategory].name
            .toLowerCase()
            .includes(serviceSearched.toLowerCase()) &&
          (tab === "0" || tab.includes(serviceCategory)) && (
            <OneTab
              setService={setService}
              panelOpen={panelOpen}
              setPanelOpen={setPanelOpen}
              key={serviceCategory}
              serviceCategory={serviceCategory}
              services={services}
              setCategory={setCategory}
              accountInfo={accountInfo}
            />
          )
        );
      })}

      {tab === "4" && (
        <div className="mobileServices--panel">
          <div id="PRNOT" className="mobileServices--header active">
            <span>Prenotazioni</span>{" "}
            <i className="fal fa-chevron-down" aria-hidden="true"></i>
          </div>
          <div className="mobileServices--body animated fadeIn">
            <div className="mobileServices--body__item">
              <img
                src={images["expedia-mobile"]}
                alt=""
                onClick={() => {
                  window.location.hash = "/forms/expedia";
                }}
              />
              <span>Expedia</span>
            </div>
            <div
              className="mobileServices--body__item"
              onClick={() => {
                window.location.hash = "/forms/flixbus";
              }}
            >
              <img src={images["flixbus-mobile"]} alt="" />
              <span>Flixbus</span>
            </div>
            <div
              className="mobileServices--body__item"
              onClick={() => {
                window.location.hash = "/forms/trenitalia";
              }}
            >
              <img src={images["trenitalia-mobile"]} alt="" />
              <span>Trenitalia</span>
            </div>
            <div
              className="mobileServices--body__item"
              onClick={() => {
                window.location.hash = "/forms/vivaticket";
              }}
            >
              <img src={images["vivaticket-mobile"]} alt="" />
              <span>vivaticket</span>
            </div>
            <div
              className="mobileServices--body__item"
              onClick={() => {
                window.location.hash = "/forms/ticketone";
              }}
            >
              <img src={images["ticketone-mobile"]} alt="" />
              <span>ticketone</span>
            </div>
            <div
              className="mobileServices--body__item"
              onClick={() => {
                window.location.hash = "/forms/stubhub";
              }}
            >
              <img src={images["stubhub-mobile"]} alt="" />
              <span>stubhub</span>
            </div>
          </div>
        </div>
      )}

      {favorites && (
        <div className="mobileServices--favorites">
          {Object.keys(favorites).map((serviceCategory) => {
            return (
              favorites[serviceCategory].name
                .toLowerCase()
                .includes(serviceSearched.toLowerCase()) &&
              tab === "fav" && (
                <OneTab
                  setService={setService}
                  panelOpen={panelOpen}
                  setPanelOpen={setPanelOpen}
                  key={serviceCategory}
                  serviceCategory={serviceCategory}
                  services={favorites}
                  setCategory={setCategory}
                  accountInfo={accountInfo}
                  isFav
                />
              )
            );
          })}
        </div>
      )}
    </div>
  );
};
const mstp = ({ main: { services }, auth: { accountInfo } }) => {
  return {
    services,
    accountInfo,
  };
};
export default connect(mstp, MainActions)(Servizi);
