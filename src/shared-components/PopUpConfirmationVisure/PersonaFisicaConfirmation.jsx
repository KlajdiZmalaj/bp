import React from "react";

export default ({ TicketByTcketId }) => {
  return (
    <div className="confirmationPopup--body ">
      <div className="NomeEmail">
        <div className="confirmationPopup--body__item">
          <span className="light">Servizi</span>
          <span className="dark">{TicketByTcketId.servizi}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light">E-mail</span>
          <span className="dark">{TicketByTcketId.email}</span>
        </div>
      </div>
      <div className="Others">
        <div className="confirmationPopup--body__item">
          <span className="light">Nome</span>
          <span className="dark">{TicketByTcketId.name}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light"> Cognome</span>
          <span className="dark">{TicketByTcketId.last_name}</span>
        </div>

        <div className="confirmationPopup--body__item">
          <span className="light">Telefono</span>
          <span className="dark">{TicketByTcketId.telefono}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light">Costo totale</span>
          <span className="dark">{TicketByTcketId.total_cost}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light">Address</span>
          <span className="dark">{TicketByTcketId.address}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light">Codice Fiscale</span>
          <span className="dark">{TicketByTcketId.codice_fiscale}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light">Data di Nascita</span>
          <span className="dark">{TicketByTcketId.data_di_nascita}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light">Lungo di Nascita</span>
          <span className="dark">{TicketByTcketId.luogo_di_nascita}</span>
        </div>
      </div>
    </div>
  );
};
