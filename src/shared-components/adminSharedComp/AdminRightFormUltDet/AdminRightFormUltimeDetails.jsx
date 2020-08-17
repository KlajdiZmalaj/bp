import React from "react";
import "./aRFUD.css";
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
class AdminRightFormUltimeDetails extends React.Component {
  componentWillUnmount() {
    if (this.props.ModalOrNo) {
      this.props.Close({ visibility: false, data: "" });
    }
  }
  render() {
    const { leUltimeTransazioniDet, ModalOrNo, Close } = this.props;
    return (
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
  }
}
export default AdminRightFormUltimeDetails;
