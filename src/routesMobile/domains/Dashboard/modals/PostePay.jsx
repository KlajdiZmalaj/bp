import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import images from "themes/images";
import { AuthActions } from "redux-store/models";
import { notification } from "antd";

const PostePay = ({
  setService,
  services,
  activeService,
  allFavServices,
  toggleFavorite,
  postePay,
  postePayLoading,
  setPostePay,
  setPostePayLoading,
  getPostePay,
}) => {
  useEffect(() => {
    if (Object.values(postePay).length > 0)
      notification[postePay.errors ? "error" : "success"]({
        message: postePay.message,
        description: Object.values(postePay.errors || {}),
      });
  }, [postePay]);

  return (
    <div className="postepay">
      <div className="postepay--services">
        <div className="wrapperTop">
          {services["PRDPST"] &&
            Object.keys(services["PRDPST"]).map((keyBolletines) => {
              return (
                keyBolletines !== "name" &&
                services["PRDPST"][keyBolletines].services.map((item) => {
                  return (
                    <div
                      key={item.service_id}
                      onClick={() => {
                        setService(item?.service_id);
                        setPostePay({});
                      }}
                      className={
                        "postepay--services__item" +
                        (activeService === item?.service_id ? " active" : "")
                      }
                    >
                      <img src={images[keyBolletines]} alt="" />
                      <span>{item.name}</span>
                    </div>
                  );
                })
              );
            })}
        </div>
      </div>
      <div className="bolletini--header">
        PostePay{" "}
        <i
          onClick={() => {
            if (allFavServices.includes("RCPP")) {
              toggleFavorite("RCPP", "remove");
            } else {
              toggleFavorite("RCPP", "set");
            }
          }}
          className={
            "fas fa-star" + (allFavServices.includes("RCPP") ? " active" : "")
          }
          aria-hidden="true"
        ></i>{" "}
      </div>

      <div className="bolletini--condition">
        <div className="bolletini--condition__check">
          <label htmlFor="bollo">
            La persona che hai di fronte non è il intestatario del pagamento del
            bollo
          </label>

          <input id="bollo" type="checkbox" />
          <div></div>
        </div>
        <div className="bolletini--condition__orario">
          <span>ORARI DI SERVIZIO</span>
          <div>Tutti i giorni dalle ore 6:00 alle ore 00:30</div>
        </div>
        <div className="bolletini--condition__warning">
          <span>
            Attenzione! I Bolli Auto delle regioni Friuli-Venezia Giulia, Veneto
            e Sardegna non sono al momento Pagabili.
          </span>
        </div>
      </div>

      <div className="bolletini--buttons">
        <button
          className={`${postePayLoading ? "disable" : ""}`}
          onClick={() => {
            setPostePayLoading(true);
            getPostePay(
              "RCPP",
              "importo",
              "user_id",
              "intestazione",
              "codice_fiscale_intestatario",
              "ordinante",
              "codice_fiscale_ordinante",
              "numero_postepay",
              "document_type",
              "imageUrl",
              "imageUrl2",
              () => {},
              setPostePayLoading
            );
          }}
        >
          Esegui <i className="fal fa-check" aria-hidden="true"></i>
        </button>
        <button className="disable">Prenota</button>
        <button className="disable">Stampa</button>
        <button
          onClick={() => {
            setService(null);
            setPostePay({});
          }}
        >
          Anulla <i className="fal fa-times" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};

export default connect(
  ({ main: { services }, auth: { postePayLoading, postePay } }) => {
    return {
      services,
      postePayLoading,
      postePay,
    };
  },
  AuthActions
)(PostePay);
