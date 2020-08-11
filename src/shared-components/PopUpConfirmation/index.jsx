import React, { useEffect, useState } from "react";
import EventiConfirmation from "./EventiConfirmation";
import TreniConfirmation from "./TreniConfirmation";
import VoliConfirmation from "./VoliConfirmation";
import { userConfirmation } from "services/auth";
import { AuthActions } from "redux-store/models";
import { connect } from "react-redux";
import "./style.css";
import images from "../../themes/images";

const PopUpConfirmation = ({
  popUpData,
  getTicketByTicketId,
  TicketByTcketId,
  role,
  getDataFormDetails,
}) => {
  const [active, setState] = useState(false);
  useEffect(() => {
    // console.log("popUpData changed", popUpData, TicketByTcketId);
    if (popUpData.id) {
      getTicketByTicketId(popUpData.id);
      setState(true);
    }
  }, [popUpData, getTicketByTicketId]);
  return (
    TicketByTcketId &&
    Object.keys(TicketByTcketId).length > 1 &&
    active &&
    popUpData.data && (
      <React.Fragment>
        <div className="confirmationPopup">
          <div className="confirmationPopup--header">
            {" "}
            <img
              className="logoImg"
              src={images[`${TicketByTcketId.nome_agenzia}-logo`]}
              alt=""
            />
            <span>{`Id :BP- ${TicketByTcketId.id}`}</span>
          </div>
          {TicketByTcketId.type == 3 && (
            <EventiConfirmation TicketByTcketId={TicketByTcketId} />
          )}
          {TicketByTcketId.type == 2 && (
            <TreniConfirmation TicketByTcketId={TicketByTcketId} />
          )}
          {TicketByTcketId.type == 1 && (
            <VoliConfirmation TicketByTcketId={TicketByTcketId} />
          )}
          <div className="confirmationPopup--buttons">
            <button
              className="Eseguito"
              onClick={() => {
                userConfirmation(
                  popUpData.id,
                  role === "support" ? 4 : 3,
                  setState,
                  getDataFormDetails
                );
              }}
            >
              ESEGUITO{" "}
            </button>
            <button
              className="Annullato"
              onClick={() => {
                userConfirmation(popUpData.id, 5, () => {}, getDataFormDetails);
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

export default connect(null, AuthActions)(PopUpConfirmation);
