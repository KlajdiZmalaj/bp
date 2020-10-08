import React, { useEffect, useState } from "react";
import { userConfirmation } from "services/auth";
import { AuthActions } from "redux-store/models";
import { connect } from "react-redux";
import images from "../../themes/images";
import PersonaFisicaConfirmation from "./PersonaFisicaConfirmation";
import AziendaOImpresaConfirmation from "./AziendaOImpresaConfirmation";

const PopUpConfirmationVisure = ({
  setButtonsSupport,
  popUpDataVisure,
  VisureByVisureId,
  role,
  getVisureByVisureId,
}) => {
  const [active, setState] = useState(false);
  useEffect(() => {
    if (popUpDataVisure.id) {
      getVisureByVisureId(popUpDataVisure.id);
      setState(true);
    }
  }, [popUpDataVisure, getVisureByVisureId]);
  return (
    VisureByVisureId &&
    Object.keys(VisureByVisureId).length > 1 &&
    active &&
    popUpDataVisure.data && (
      <React.Fragment>
        <div className="confirmationPopup">
          <div className="confirmationPopup--header">
            {" "}
            <img
              className="logoImg"
              src={images[`${VisureByVisureId.nome_agenzia}-logo`]}
              alt=""
            />
            <span>{`Id :BP- ${VisureByVisureId.id}`}</span>
          </div>
          {VisureByVisureId.type === 1 && (
            <PersonaFisicaConfirmation TicketByTcketId={VisureByVisureId} />
          )}
          {VisureByVisureId.type === 2 && (
            <AziendaOImpresaConfirmation TicketByTcketId={VisureByVisureId} />
          )}

          <div className="confirmationPopup--buttons">
            <button
              className="Eseguito"
              onClick={() => {
                userConfirmation(
                  setButtonsSupport,
                  popUpDataVisure.id,
                  role === "support" ? 4 : 3,
                  setState,
                  getVisureByVisureId,
                  null,
                  true
                );
              }}
            >
              ESEGUITO{" "}
            </button>
            <button
              className="Annullato"
              onClick={() => {
                userConfirmation(
                  setButtonsSupport,
                  popUpDataVisure.id,
                  5,
                  () => {},
                  getVisureByVisureId,
                  null,
                  true
                );
                setState(false);
              }}
            >
              ANNULLATO{" "}
            </button>
          </div>
        </div>
        <div
          className="backDrop"
          onClick={() => {
            setState(false);
          }}
        ></div>
      </React.Fragment>
    )
  );
};

export default connect(null, AuthActions)(PopUpConfirmationVisure);
