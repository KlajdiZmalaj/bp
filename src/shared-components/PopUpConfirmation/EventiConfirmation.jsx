import React from "react";

const Eventi = ({ TicketByTcketId }) => {
  return (
    <div className="confirmationPopup--body ">
      <div className="NomeEmail">
        <div className="confirmationPopup--body__item">
          <span className="light">Nome Agenzia</span>
          <span className="dark">{TicketByTcketId.nome_agenzia}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light">E-mail</span>
          <span className="dark">{TicketByTcketId.email}</span>
        </div>
      </div>
      <div className="Others">
        <div className="confirmationPopup--body__item">
          <span className="light">Extra Dati/Notes</span>
          <span className="dark">{TicketByTcketId.extra_data}</span>
        </div>

        <div className="confirmationPopup--body__item">
          <span className="light">Link</span>
          <span className="dark">{TicketByTcketId.link}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light">Nome</span>
          <span className="dark">{TicketByTcketId.name}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light"> Quantity</span>
          <span className="dark">{TicketByTcketId.quantity}</span>
        </div>

        <div className="confirmationPopup--body__item">
          <span className="light">Telefono</span>
          <span className="dark">{TicketByTcketId.telefono}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light">Costo totale</span>
          <span className="dark">{TicketByTcketId.total_cost}</span>
        </div>
      </div>
    </div>
  );
};
export default Eventi;
