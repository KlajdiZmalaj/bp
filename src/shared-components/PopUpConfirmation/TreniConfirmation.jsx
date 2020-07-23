import React from "react";

const Treni = ({ TicketByTcketId }) => (
  <div className="confirmationPopup--body ">
    <div className="NomeEmail">
      <div className="confirmationPopup--body__item">
        <span className="light">Nome Agenzia</span>
        <span className="dark">{TicketByTcketId.nome_agenzia}</span>
      </div>
      <div className="confirmationPopup--body__item">
        <span className="light">Link</span>
        <span className="dark">{TicketByTcketId.link}</span>
      </div>
      <div className="confirmationPopup--body__item">
        <span className="light">Prezzo</span>
        <span className="dark">{TicketByTcketId.total_cost}</span>
      </div>
    </div>
    <div className="Others">
      <div className="confirmationPopup--body__item">
        <span className="light">Partenza</span>
        <span className="dark">{TicketByTcketId.partenza}</span>
      </div>
      <div className="confirmationPopup--body__item">
        <span className="light">Stazione</span>
        <span className="dark">{TicketByTcketId.partenza_stazione}</span>
      </div>
      <div className="confirmationPopup--body__item">
        <span className="light">Destinazione</span>
        <span className="dark">{TicketByTcketId.destinazione}</span>
      </div>
      <div className="confirmationPopup--body__item">
        <span className="light"> Destinazione Stazione</span>
        <span className="dark">{TicketByTcketId.destinazione_stazione}</span>
      </div>

      <div className="confirmationPopup--body__item">
        <span className="light">Tipologia Biglietto</span>
        <span className="dark">
          {TicketByTcketId.tipologia_biglietto === 1
            ? "Andata e ritorno"
            : "Solo Andata"}
        </span>
      </div>
      <div className="confirmationPopup--body__item">
        <span className="light">Compagnie</span>
        <span className="dark">{TicketByTcketId.compagnie}</span>
      </div>
      <div className="confirmationPopup--body__item">
        <span className="light">Adulti</span>
        <span className="dark">{TicketByTcketId.adulti}</span>
      </div>
      <div className="confirmationPopup--body__item">
        <span className="light">Ragazzi</span>
        <span className="dark">{TicketByTcketId.ragazzi}</span>
      </div>
      <div className="confirmationPopup--body__item">
        <span className="light">Andata</span>
        <span className="dark">{TicketByTcketId.andata_time}</span>
      </div>
      {TicketByTcketId.tipologia_biglietto == 1 && (
        <div className="confirmationPopup--body__item">
          <span className="light">Ritorno</span>
          <span className="dark">{TicketByTcketId.ritorno_date}</span>
        </div>
      )}
      <div className="confirmationPopup--body__item">
        <span className="light">Extra Dati/Notes</span>
        <span className="dark">{TicketByTcketId.extra_data}</span>
      </div>
    </div>
  </div>
);
export default Treni;
