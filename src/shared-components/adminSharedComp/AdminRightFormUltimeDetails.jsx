import React from "react";

const AdminRightFormUltimeDetailsHelper = ({ leUltimeTransazioniDet }) => (
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
const AdminRightFormUltimeDetails = ({
  leUltimeTransazioniDet,
  ModalOrNo,
  Close,
}) => (
  <React.Fragment>
    {ModalOrNo === true ? (
      <div className="RightFormModal">
        <div
          className="backDrop"
          onClick={() => {
            Close({ visibility: false, data: "" });
          }}
        ></div>
        <div className="Header">LE ULTIME TRANSAZIONI</div>

        <AdminRightFormUltimeDetailsHelper
          leUltimeTransazioniDet={leUltimeTransazioniDet}
        />
        <div className="Close">
          <i
            className="fal fa-times"
            onClick={() => {
              Close({ visibility: false, data: "" });
            }}
          ></i>
        </div>
      </div>
    ) : (
      <AdminRightFormUltimeDetailsHelper
        leUltimeTransazioniDet={leUltimeTransazioniDet}
      />
    )}
  </React.Fragment>
);
export default AdminRightFormUltimeDetails;
