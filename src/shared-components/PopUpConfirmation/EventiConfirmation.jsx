import React from "react";
import SpanFormater from "shared-components/SpanFormater/SpanFormater";

const Eventi = ({ TicketByTcketId }) => {
  const extra_data =
    TicketByTcketId.nome_agenzia === "expedia"
      ? JSON.parse(TicketByTcketId.extra_data)
      : TicketByTcketId.extra_data;

  return (
    <div className="confirmationPopup--body ">
      <div className="NomeEmail">
        <div className="confirmationPopup--body__item">
          <span className="light">E-mail</span>
          <span className="dark">{TicketByTcketId.email}</span>
        </div>
        <div className="confirmationPopup--body__item">
          <span className="light">Prezzo</span>
          <span className="dark">{TicketByTcketId.total_cost}</span>
        </div>
      </div>
      <div className="Others">
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
export default Eventi;
