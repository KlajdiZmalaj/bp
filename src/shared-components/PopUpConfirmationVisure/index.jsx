import React, { useEffect, useState } from "react";
import { userConfirmation } from "services/auth";
import { AuthActions } from "redux-store/models";
import { connect } from "react-redux";
import images from "../../themes/images";

const PopUpConfirmationVisure = ({
  popUpDataVisure,
  VisureByVisureId,
  role,
  getVisureByVisureId,
}) => {
  const [active, setState] = useState(false);
  useEffect(() => {
    console.log("popUpData changed", popUpDataVisure, VisureByVisureId);
    if (popUpDataVisure.id) {
      getVisureByVisureId(popUpDataVisure.id);
      setState(true);
    }
  }, [popUpDataVisure]);
  console.log("ca ka visuree", VisureByVisureId, popUpDataVisure);
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
          {/* {TicketByTcketId.type == 3 && (
            <EventiConfirmation TicketByTcketId={TicketByTcketId} />
          )}
          {TicketByTcketId.type == 2 && (
            <TreniConfirmation TicketByTcketId={TicketByTcketId} />
          )}
          {TicketByTcketId.type == 1 && (
            <VoliConfirmation TicketByTcketId={TicketByTcketId} />
          )} */}
          <div className="confirmationPopup--buttons">
            <button
              className="Eseguito"
              onClick={() => {
                userConfirmation(
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
