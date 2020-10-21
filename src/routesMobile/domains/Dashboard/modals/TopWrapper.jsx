import React from "react";
import images from "themes/images";
const TopWrapper = ({ services, setService, activeService }) => (
  <div className="wrapperTop">
    {services["PRDPST"] &&
      Object.keys(services["PRDPST"]).map((keyBolletines) => {
        return keyBolletines !== "name" &&
          keyBolletines !== "group" &&
          services["PRDPST"][keyBolletines].services[0].service_id === "BOL001"
          ? services["PRDPST"][keyBolletines].services.map((item) => {
              return (
                <div
                  key={item.service_id}
                  onClick={() => {
                    setService(item?.service_id);
                  }}
                  className={
                    "bolletini--services__item" +
                    (activeService === item?.service_id ? " active" : "")
                  }
                >
                  <img
                    src={
                      item?.service_id === "BOL006" ||
                      item?.service_id === "PPA001" ||
                      item?.service_id === "PAGF24"
                        ? images[
                            `${item.service_id}-${
                              activeService === item.service_id
                                ? "White"
                                : "Black"
                            }-Mobile`
                          ]
                        : images[
                            `BOLL-${
                              activeService === item.service_id
                                ? "White"
                                : "Black"
                            }-Mobile`
                          ]
                    }
                    alt=""
                  />
                  <span>{item.name}</span>
                </div>
              );
            })
          : keyBolletines !== "name" && keyBolletines !== "group" && (
              <div
                key={services["PRDPST"][keyBolletines].services[0].service_id}
                onClick={() => {
                  setService(
                    services["PRDPST"][keyBolletines].services[0].service_id
                  );
                }}
                className={
                  "bolletini--services__item" +
                  ((activeService === "BOL003" || activeService === "BOL004") &&
                  services["PRDPST"][keyBolletines].services[0].service_id ===
                    "BOL004"
                    ? " active"
                    : services["PRDPST"][keyBolletines].services[0]
                        .service_id === activeService
                    ? " active"
                    : "")
                }
              >
                <img
                  src={
                    images[
                      services["PRDPST"][keyBolletines].services[0]
                        .service_id === "PPA001"
                        ? `${
                            services["PRDPST"][keyBolletines].services[0]
                              .service_id
                          }-${
                            activeService ===
                            services["PRDPST"][keyBolletines].services[0]
                              .service_id
                              ? "White"
                              : "Black"
                          }-Mobile`
                        : `${keyBolletines === "RCPP" ? "RCPP" : "BOLL"}${
                            keyBolletines === "RCPP"
                              ? ""
                              : `-${
                                  (activeService === "BOL003" ||
                                    activeService === "BOL004") &&
                                  services["PRDPST"][keyBolletines].services[0]
                                    .service_id === "BOL004"
                                    ? "White"
                                    : activeService ===
                                      services["PRDPST"][keyBolletines]
                                        .services[0].service_id
                                    ? "White"
                                    : "Black"
                                }-Mobile`
                          }`
                    ]
                  }
                  alt=""
                />
                <span>{services["PRDPST"][keyBolletines].name}</span>
              </div>
            );
      })}
  </div>
);

export default TopWrapper;
