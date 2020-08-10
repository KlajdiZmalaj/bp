import React from "react";
import "./styles.css";
import images from "themes/images";
class AdminServiziItem extends React.Component {
  state = {
    buttonActiveVisibility: true,
    buttonInactiveVisibility: false,
  };
  render() {
    const { buttonActiveVisibility, buttonInactiveVisibility } = this.state;
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
          <button
            onClick={() => {
              this.setState({
                buttonActiveVisibility: true,
                buttonInactiveVisibility: false,
              });
            }}
            className={`${buttonActiveVisibility === true ? "active" : ""}`}
          >
            ACTIVE
          </button>
          <button
            onClick={() => {
              this.setState({
                buttonActiveVisibility: false,
                buttonInactiveVisibility: true,
              });
            }}
            className={`${buttonInactiveVisibility === true ? "active" : ""}`}
          >
            INACTIVE
          </button>
        </div>
      </div>
    );
  }
}
export default AdminServiziItem;
