import React from "react";
const OnlineShopConfirmation = ({ TicketByTcketId }) => {
  return (
    <div className="confirmationPopup--body ">
      <div className="NomeEmail">
        <div className="confirmationPopup--body__item">
          <span className="light">Link Prodotto</span>
          <span className="dark">{TicketByTcketId.link}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light">Prezzo</span>
          <span className="dark">{TicketByTcketId.total_cost}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light">Nome</span>
          <span className="dark">{TicketByTcketId.nome}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light"> Cognome</span>
          <span className="dark">{TicketByTcketId.cognome}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light">Company Name</span>
          <span className="dark">{TicketByTcketId.company_name}</span>
        </div>
      </div>
      <div className="Others">
        <div className="confirmationPopup--body__item">
          <span className="light">Consegna a:</span>
          <span className="dark">{TicketByTcketId.consegna}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light">Note acquisti</span>
          <span className="dark">{TicketByTcketId.extra_data}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light">Email</span>
          <span className="dark">{TicketByTcketId.email}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light">Telefono</span>
          <span className="dark">{TicketByTcketId.telefono}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light">Stato</span>
          <span className="dark">{TicketByTcketId.stato}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light">Citta</span>
          <span className="dark">{TicketByTcketId.citta}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light">Indirizzo 1</span>
          <span className="dark">{TicketByTcketId.address1}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light">Indirizzo 2</span>
          <span className="dark">{TicketByTcketId.address2}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light">Cap</span>
          <span className="dark">{TicketByTcketId.cap}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light">Provincia</span>
          <span className="dark">{TicketByTcketId.provincia}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light">Note</span>
          <span className="dark">{TicketByTcketId.note_address}</span>
        </div>
      </div>
    </div>
  );
};
export default OnlineShopConfirmation;
