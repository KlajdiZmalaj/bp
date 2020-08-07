import React from "react";

const NormalDrop = ({ leUltimeTransazioniDet }) => (
  <div className="AdminRightForm--Box--LeUltime--Dropdown">
    {leUltimeTransazioniDet.map((Tranzacioni) => (
      <div
        className="AdminRightForm--Box--LeUltime--Dropdown--Row"
        key={Tranzacioni.id}
      >
        <span className="AdminRightForm--Box--LeUltime--Dropdown--Row--Data Date">
          {Tranzacioni.date}
        </span>
        <span className="AdminRightForm--Box--LeUltime--Dropdown--Row--Data Id">
          {Tranzacioni.id}
        </span>

        <span className="AdminRightForm--Box--LeUltime--Dropdown--Row--Data User">
          {Tranzacioni.utente}
        </span>
        <span className="AdminRightForm--Box--LeUltime--Dropdown--Row--Data Price">
          {Tranzacioni.price}
        </span>
      </div>
    ))}
  </div>
);
const AdminRightFormUltimeDetails = ({ leUltimeTransazioniDet, ModalOrNo }) => (
  <React.Fragment>
    {ModalOrNo === true ? (
      <div className="RightFormModal">
        <div className="backDrop">
          <NormalDrop leUltimeTransazioniDet={leUltimeTransazioniDet} />
        </div>
      </div>
    ) : (
      <NormalDrop leUltimeTransazioniDet={leUltimeTransazioniDet} />
    )}
  </React.Fragment>
);
export default AdminRightFormUltimeDetails;
