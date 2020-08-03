import React from "react";
import "./styles.css";
import AdminListaUtentiRow from "./AdminListaUtentiRow";
class AdminServiziItem extends React.Component {
  render() {
    return (
      <div className="AdminServiziItem">
        <div className="AdminServiziItem--Prenotazione">
          PRENOTAZIONE BIGLIETTI
        </div>
        <div className="AdminServiziItem--Title">{this.props.name}</div>
        <img className="AdminServiziItem--Image" />
        <div className="AdminServiziItem--ButtonWrapper">
          <button>ACTIVE</button>
          <button>INACTIVE</button>
        </div>
      </div>
    );
  }
}
export default AdminServiziItem;
