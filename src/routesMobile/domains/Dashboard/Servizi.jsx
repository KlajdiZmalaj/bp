import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MainActions from "redux-store/models/main";
import { capitalize } from "lodash";
const OneTab = ({ serviceCategory, services }) => {
  console.log("tab", services, serviceCategory);
  const [open, setDD] = useState(false);
  return (
    services && (
      <div className="mobileServices--panel">
        <div className="mobileServices--header" onClick={() => setDD(!open)}>
          {capitalize(services[serviceCategory].name)}
          <i
            className={`fal fa-chevron-${open ? "down" : "up"}`}
            aria-hidden="true"
          ></i>{" "}
        </div>
        {open && (
          <div className="mobileServices--body animated fadeIn">
            {Object.keys(services[serviceCategory]).map((serviceId) => {
              return (
                serviceId !== "name" && (
                  <div key={serviceId} className="mobileServices--body__item">
                    <i className="fas fa-dot-circle"></i>{" "}
                    {services[serviceCategory][serviceId].name}
                    <i className="fal fa-star" aria-hidden="true"></i>
                  </div>
                )
              );
            })}
          </div>
        )}
      </div>
    )
  );
};
const Servizi = ({ services, getServices }) => {
  useEffect(() => {
    getServices();
  }, []);
  console.log("services", services);
  return (
    <div className="mobileServices">
      {Object.keys(services).map((serviceCategory) => {
        return (
          <OneTab
            key={serviceCategory}
            serviceCategory={serviceCategory}
            services={services}
          />
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
