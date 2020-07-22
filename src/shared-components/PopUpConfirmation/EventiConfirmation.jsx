import React from "react";

const Eventi = ({ TicketByTcketId }) => {
  console.log(TicketByTcketId);
  return (
    <div className="confirmationPopup--body">
      <div className="confirmationPopup--body__item">
        <span>Nome Agenzia</span>
        <span>{TicketByTcketId.nome_agenzia}</span>
      </div>
      <div className="confirmationPopup--body__item">
        <span>E-mail</span>
        <span>{TicketByTcketId.email}</span>
      </div>

      <div className="confirmationPopup--body__item">
        <span>Extra Dati/Notes</span>
        <span>{TicketByTcketId.extra_data}</span>
      </div>

      <div className="confirmationPopup--body__item">
        <span>Link</span>
        <span>{TicketByTcketId.link}</span>
      </div>
      <div className="confirmationPopup--body__item">
        <span>Nome</span>
        <span>{TicketByTcketId.name}</span>
      </div>
      <div className="confirmationPopup--body__item">
        <span>Quantity</span>
        <span>{TicketByTcketId.quantity}</span>
      </div>

      <div className="confirmationPopup--body__item">
        <span>Telefono</span>
        <span>{TicketByTcketId.telefono}</span>
      </div>
      <div className="confirmationPopup--body__item">
        <span>Costo totale</span>
        <span>{TicketByTcketId.total_cost}</span>
      </div>
    </div>
  );
};
export default Eventi;
