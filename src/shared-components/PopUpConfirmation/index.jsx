import React, { useEffect, useState } from "react";
import EventiConfirmation from "./EventiConfirmation";
import TreniConfirmation from "./TreniConfirmation";
import VoliConfirmation from "./VoliConfirmation";
import { userConfirmation } from "services/auth";
import "./style.css";
import images from "themes/images";

const PopUpConfirmation = ({
  popUpData,
  getTicketByTicketId,
  TicketByTcketId,
  role,
}) => {
  const [active, setState] = useState(false);
  useEffect(() => {
    console.log("popUpData changed", popUpData, TicketByTcketId);
    if (popUpData.id) {
      getTicketByTicketId(popUpData.id);
      setState(true);
    }
  }, [popUpData]);
  console.log("ca ka ticket", TicketByTcketId, popUpData);

  return (
    ((TicketByTcketId &&
      Object.keys(TicketByTcketId).length > 1 &&
      active &&
      popUpData.data) ||
      true) && (
      <React.Fragment>
        <div className="confirmationPopup">
          <div className="confirmationPopup--header">
            {" "}
            <img
              className="logoImg"
              src={images[`${TicketByTcketId.nome_agenzia}-logo`]}
              alt=""
            />{" "}
            Id :
          </div>
          {TicketByTcketId.type == 3 && (
            <EventiConfirmation TicketByTcketId={TicketByTcketId} />
          )}
          {TicketByTcketId.type == 1 && (
            <TreniConfirmation TicketByTcketId={TicketByTcketId} />
          )}
          {TicketByTcketId.type == 2 && (
            <VoliConfirmation TicketByTcketId={TicketByTcketId} />
          )}
          <div className="confirmationPopup--buttons">
            <button
              onClick={() => {
                userConfirmation(
                  popUpData.id,
                  role === "support" ? 4 : 3,
                  setState
                );
              }}
            >
              YES
            </button>
            <button
              onClick={() => {
                userConfirmation(popUpData.id, 5, () => {});
                setState(false);
              }}
            >
              NO
            </button>
          </div>
        </div>
        <div className="backDrop"></div>
      </React.Fragment>
    )
  );
};

export default PopUpConfirmation;
