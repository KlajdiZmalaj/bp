import React, { useEffect, useState } from "react";
import EventiConfirmation from "./EventiConfirmation";
import { userConfirmation } from "services/auth";
import "./style.css";
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
    TicketByTcketId &&
    Object.keys(TicketByTcketId).length > 1 &&
    active &&
    popUpData.data && (
      <React.Fragment>
        <div className="confirmationPopup">
          <div className="confirmationPopup--header">Ticket Confirmation</div>
          {TicketByTcketId.type == 3 && (
            <EventiConfirmation TicketByTcketId={TicketByTcketId} />
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
