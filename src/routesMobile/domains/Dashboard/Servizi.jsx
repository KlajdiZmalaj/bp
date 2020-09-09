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
}) => {
  console.log("tab", services, serviceCategory);
  const [open, setDD] = useState(false);
  useEffect(() => {
    if (panelOpen !== serviceCategory) {
      setDD(false);
    }
  }, [panelOpen]);
  return (
    services && (
      <div className="mobileServices--panel">
        <div
          className="mobileServices--header"
          onClick={() => {
            if (!open) {
              setPanelOpen(serviceCategory);
              setDD(true);
            } else {
              setDD(false);
            }
          }}
        >
          {capitalize(services[serviceCategory].name)}
          <i
            className={`fal fa-chevron-${
              open && panelOpen === serviceCategory ? "down" : "up"
            }`}
            aria-hidden="true"
          ></i>
        </div>
        {open && panelOpen === serviceCategory && (
          <div className="mobileServices--body animated fadeIn">
            {Object.keys(services[serviceCategory]).map((serviceId) => {
              return (
                serviceCategory !== "PRDPST" &&
                serviceId !== "name" && (
                  <div
                    onClick={() => {
                      setService(serviceId);
                      setCategory(serviceCategory);
                    }}
                    key={serviceId}
                    className="mobileServices--body__item"
                  >
                    <img
                      src={
                        images[
                          services[serviceCategory][serviceId].services[0]
                            ?.service_id
                        ]
                          ? images[
                              services[serviceCategory][serviceId].services[0]
                                ?.service_id
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
              Object.values(services["PRDPST"]).map((item) => {
                return (
                  item.services &&
                  item.services.map((serviceI) => {
                    return (
                      <div
                        className="mobileServices--body__item"
                        onClick={() => {
                          setService(serviceI.service_id);
                          setCategory("PRDPST");
                        }}
                        key={serviceI.service_id}
                      >
                        <img
                          src={images[serviceI.service_id] || images["BOLL"]}
                          alt={serviceI.service_id}
                        />
                        <span>{serviceI.name} </span>
                      </div>
                    );
                  })
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
}) => {
  useEffect(() => {
    getServices();
  }, []);
  const [panelOpen, setPanelOpen] = useState(null);
  return (
    <div className="mobileServices">
      {Object.keys(services).map((serviceCategory) => {
        return (
          services[serviceCategory].name
            .toLowerCase()
            .includes(serviceSearched.toLowerCase()) &&
          (tab === 0 || tab.includes(serviceCategory)) && (
            <OneTab
              setService={setService}
              panelOpen={panelOpen}
              setPanelOpen={setPanelOpen}
              key={serviceCategory}
              serviceCategory={serviceCategory}
              services={services}
              setCategory={setCategory}
            />
          )
        );
      })}
    </div>
  );
};
const mstp = ({ main: { services } }) => {
  return {
    services,
  };
};
export default connect(mstp, MainActions)(Servizi);
