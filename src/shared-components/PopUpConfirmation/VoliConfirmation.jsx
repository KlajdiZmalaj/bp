import React from "react";
import SpanFormater from "shared-components/SpanFormater/SpanFormater";

const Voli = ({ TicketByTcketId }) => {
  const extra_data =
    TicketByTcketId.nome_agenzia === "expedia"
      ? JSON.parse(TicketByTcketId.extra_data)
      : TicketByTcketId.extra_data;
  return (
    TicketByTcketId && (
      <div className="confirmationPopup--body ">
        <div className="NomeEmail">
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
    )
  );
};
export default Voli;
