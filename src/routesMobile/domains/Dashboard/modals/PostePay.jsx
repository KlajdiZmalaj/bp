import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import images from "themes/images";
import { AuthActions } from "redux-store/models";
import { notification } from "antd";

const Input = ({ label, handler, icon, value, iconHandler }) => (
  <div className={"postepay--inputs__item" + (icon ? " hasIcon" : "")}>
    <div className="label">{label}</div>
    <input
      type="text"
      onChange={(e) => {
        handler(e.target.value);
      }}
      value={value && value}
    />
    {icon && (
      <i
        onClick={() => {
          if (label.includes("Codice")) {
            //barcode camera to truee
            iconHandler(true);
          }
        }}
        className={icon}
      />
    )}
  </div>
);

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
  userList,
}) => {
  useEffect(() => {
    if (Object.values(postePay).length > 0)
      notification[postePay.errors ? "error" : "success"]({
        message: postePay.message,
        description: Object.values(postePay.errors || {}),
      });
  }, [postePay]);

  let options = [];
  let b = [];
  let c = [];
  if (userList && Object.keys(userList).length > 0) {
    c.concat({ photo: userList["photo"] });
    c.concat({ no_photo: userList["no_photo"] });
  }

  if (userList && Object.keys(userList).length > 0) {
    Object.keys(userList).map((item) => {
      if (userList[item] && userList[item].length > 0) {
        b = b.concat(userList[item]);

        options = (b || []).map((i) => {
          return (
            <option
              value={`${i.first_name} ${i.last_name}`}
              key={JSON.stringify({ [item]: i })}
            >
              {i.first_name} {i.last_name}
            </option>
          );
        });
        return options;
      }
    });
  }

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
      <div className="bolletini--subh">PAGAMENTI</div>
      <div className="bolletini--inputs">
        <Input icon={"fal fa-barcode-read"} label="Intestazione" />
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
  ({
    main: { services, userListBySearch },
    auth: { postePayLoading, postePay },
  }) => {
    return {
      services,
      postePayLoading,
      postePay,
      userList: userListBySearch,
    };
  },
  AuthActions
)(PostePay);
