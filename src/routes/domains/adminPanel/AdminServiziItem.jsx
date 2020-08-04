import React from "react";
import "./styles.css";
import images from "themes/images";

class AdminServiziItem extends React.Component {
  render() {
    return (
      <div className="AdminServiziItem">
        <div className="AdminServiziItem--Header">
          <div className="AdminServiziItem--Header--Prenotazione">
            PRENOTAZIONE BIGLIETTI
          </div>
          <div className="AdminServiziItem--Header--Title">
            {this.props.name}
          </div>
        </div>

        <img src={images["flixbus-logo"]} className="AdminServiziItem--Image" />
        <div className="AdminServiziItem--ButtonWrapper">
          <button>ACTIVE</button>
          <button>INACTIVE</button>
        </div>
      </div>
    );
  }
}
export default AdminServiziItem;
