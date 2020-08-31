import React from "react";
import SpanFormater from "shared-components/SpanFormater/SpanFormater";

const Voli = ({ TicketByTcketId }) => (
  <div className="confirmationPopup--body ">
    <div className="NomeEmail">
      <div className="confirmationPopup--body__item">
        <span className="light">Nome Agenzia</span>
        <span className="dark">{TicketByTcketId.nome_agenzia}</span>
      </div>
      <div className="confirmationPopup--body__item">
        <span className="light">Bagaglio</span>
        <span className="dark">
          {TicketByTcketId.bagaglio === 1 ? "A mano" : "In Stiva"}
        </span>
      </div>
      <div className="confirmationPopup--body__item">
        <span className="light">Prezzo</span>
        <span className="dark">{TicketByTcketId.total_cost}</span>
      </div>
    </div>
    <div className="Others">
      {TicketByTcketId.bagaglio === 2 ? (
        <div className="confirmationPopup--body__item">
          <span className="light">Bagaglio in stiva</span>
          <span className="dark">{TicketByTcketId.bagaglio_stiva}</span>
        </div>
      ) : null}

      <div className="confirmationPopup--body__item">
        <span className="light">Link</span>
        <span className="dark">
          <a href={TicketByTcketId.link} target="_blank">
            <SpanFormater
              Word={TicketByTcketId.link}
              size={28}
              nrOfRows={1}
              formatWord={false}
            />
          </a>
        </span>
      </div>
      {/* <div className="confirmationPopup--body__item">
        <span className="light">Extra Dati/Notes</span>
        <SpanFormater
          Word={TicketByTcketId.extra_data}
          size={28}
          myClassName="dark"
          nrOfRows={1}
          formatWord={false}
        />
      </div> */}
    </div>
  </div>
);
export default Voli;
