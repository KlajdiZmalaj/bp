import React from "react";

const Voli = ({ TicketByTcketId }) => (
  <div className="confirmationPopup--body ">
    <div className="NomeEmail">
      <div className="confirmationPopup--body__item">
        <span className="light">Nome Agenzia</span>
        <span className="dark">{TicketByTcketId.nome_agenzia}</span>
      </div>
      <div className="confirmationPopup--body__item">
        <span className="light">Bagaglio</span>
        <span className="dark">{TicketByTcketId.bagaglio}</span>
      </div>
    </div>
    <div className="Others">
      <div className="confirmationPopup--body__item">
        <span className="light">Bagaglio in stiva</span>
        <span className="dark">{TicketByTcketId.bagaglio_stiva}</span>
      </div>
      <div className="confirmationPopup--body__item">
        <span className="light">Link</span>
        <span className="dark">{TicketByTcketId.link}</span>
      </div>
      <div className="confirmationPopup--body__item">
        <span className="light">Extra Dati/Notes</span>
        <span className="dark">{TicketByTcketId.extra_data}</span>
      </div>
    </div>
  </div>
);
export default Voli;
