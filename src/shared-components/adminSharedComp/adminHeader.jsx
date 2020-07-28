import React from "react";
import "./styles.css";
class AdminHeader extends React.Component {
  render() {
    return (
      <div className="AdminHeader">
        <div className="AdminHeader--Title">ADMIN PANEL</div>
        <div className="AdminHeader--Box">
          <div className="AdminHeader--Category">
            <div>
              <i class="fal fa-user-circle"></i>
              <span>UTENTI</span>
            </div>
          </div>
          <div className="AdminHeader--Category">
            <div>
              <i class="fal fa-wallet"></i>
              <span>MOVIMENTI</span>
            </div>
          </div>

          <div className="AdminHeader--Category">
            <div>
              <i class="far fa-briefcase"></i>
              <span>SERVIZI</span>
            </div>
          </div>
          <div className="AdminHeader--Category--Prenotazioni">
            <div>
              <i class="fal fa-ticket"></i>
              <span>PRENOTAZIONI</span>
            </div>
          </div>
          <div className="AdminHeader--ButtonWrapper">
            <button>LOG OUT</button>
          </div>
        </div>
      </div>
    );
  }
}
export default AdminHeader;
