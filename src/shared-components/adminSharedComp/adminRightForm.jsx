import React from "react";
class AdminRightForm extends React.Component {
  render() {
    return (
      <div className="AdminRightForm">
        <div className="AdminRightForm--Box">
          <div className="AdminRightForm--Box--Statistic">
            <i class="fal fa-analytics"></i>
            <span>STATISTICHE</span>
          </div>

          <i class="far fa-chevron-down"></i>
        </div>
        <div className="AdminRightForm--Box">
          <div className="AdminRightForm--Box--HeartRate">
            <i class="fal fa-heart-rate"></i>
            <span>LE ULTIME TRANSAZIONI</span>
          </div>

          <i class="far fa-chevron-down"></i>
        </div>
        <div className="AdminRightForm--Box">
          <div className="AdminRightForm--Box--Wallet">
            {" "}
            <i class="fal fa-wallet"></i>
            <span>DEPOSITO / ADDEVITO</span>
          </div>
          <i class="far fa-chevron-down"></i>
        </div>
      </div>
    );
  }
}
export default AdminRightForm;
