import React, { useEffect, useState } from "react";
import EventiConfirmation from "./EventiConfirmation";
import TreniConfirmation from "./TreniConfirmation";
import VoliConfirmation from "./VoliConfirmation";
import { userConfirmation } from "services/auth";
import "./style.css";
import images from "../../themes/images";

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
  const TicketbyTicketIdNew = {
    id: "test",
    nome_agenzia: "test",
    email: "test",
    extra_data: "test",
    link: "test",
    name: "test",
    quantity: "test",
    telefono: "test",
    total_cost: "test",
  };
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
              src={images[`${TicketbyTicketIdNew.nome_agenzia}-logo`]}
              alt=""
            />
            <span>{`Id :BP- ${TicketbyTicketIdNew.id}`}</span>
          </div>
          {TicketByTcketId.type == 3 && (
            <EventiConfirmation TicketByTcketId={TicketbyTicketIdNew} />
          )}
          {TicketByTcketId.type == 1 && (
            <TreniConfirmation TicketByTcketId={TicketbyTicketIdNew} />
          )}
          {TicketByTcketId.type == 2 && (
            <VoliConfirmation TicketByTcketId={TicketbyTicketIdNew} />
          )}
          <div className="confirmationPopup--buttons">
            <button
              className="Eseguito"
              onClick={() => {
                userConfirmation(
                  popUpData.id,
                  role === "support" ? 4 : 3,
                  setState
                );
              }}
            >
              ESEGUITO{" "}
            </button>
            <button
              className="Annullato"
              onClick={() => {
                userConfirmation(popUpData.id, 5, () => {});
                setState(false);
              }}
            >
              ANNULLATO{" "}
            </button>
          </div>
        </div>
        <div className="backDrop"></div>
      </React.Fragment>
    )
  );
};

export default PopUpConfirmation;
