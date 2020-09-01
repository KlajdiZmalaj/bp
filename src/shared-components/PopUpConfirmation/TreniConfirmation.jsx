import React from "react";
import SpanFormater from "shared-components/SpanFormater/SpanFormater";

const Treni = ({ TicketByTcketId }) => {
  const extra_data =
    TicketByTcketId.nome_agenzia === "expedia"
      ? JSON.parse(TicketByTcketId.extra_data)
      : TicketByTcketId.extra_data;
  return (
    <div className="confirmationPopup--body ">
      <div className="NomeEmail">
        <div className="confirmationPopup--body__item">
          <span className="light">Link</span>
          <span className="dark">
            <a href={TicketByTcketId.link}>
              <SpanFormater
                Word={TicketByTcketId.link}
                size={28}
                nrOfRows={1}
                formatWord={false}
              />
            </a>
          </span>
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
        {TicketByTcketId.nome_agenzia === "expedia" ? (
          <div className="NomeEmail">
            <div className="confirmationPopup--body__item">
              <span className="light">Extra Dati/Notes</span>
              <span className="dark">
                {Object.keys(extra_data).map((key) => (
                  <span style={{ fontWeight: 600 }}>
                    {key}
                    <span>
                      {Object.keys(extra_data[key]).map((keyMapped) => (
                        <div>
                          {" "}
                          <span style={{ fontWeight: 500 }}>
                            {keyMapped} :
                          </span>{" "}
                          {"  "}
                          <span style={{ fontWeight: 400 }}>
                            {extra_data[key][keyMapped]}
                          </span>
                        </div>
                      ))}
                    </span>
                  </span>
                ))}
              </span>
            </div>
          </div>
        ) : (
          <div className="confirmationPopup--body__item">
            <span className="light">Extra Dati/Notes</span>
            <span className="dark">{extra_data}</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default Treni;
