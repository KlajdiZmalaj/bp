import React from "react";
import moment from "moment";
import { Tooltip } from "antd";
class AdminRightForm extends React.Component {
  state = {
    dropdownVisibility: false,
    statisticheDropdownVisibility: false,
    depositoActiveVisibility: true,
    addebitoActiveVisibility: false,
  };
  render() {
    const data = [
      { height: 50, price: "235 $" },
      { height: 10, price: "235 $" },
      { height: 90, price: "235 $" },
      { height: 35, price: "235 $" },
      { height: 20 },
      { height: 70 },
      { height: 50 },
      { height: 40 },
      { height: 20 },
      { height: 10 },
      { height: 40 },
      { height: 20 },
      { height: 40, price: "235 $" },
      { height: 30 },
      { height: 40 },
      { height: 60 },
      { height: 90 },
      { height: 40 },
      { height: 90 },
      { height: 40 },
      { height: 40 },
      { height: 40 },
      { height: 40 },
      { height: 100 },
      { height: 40 },
      { height: 40 },
      { height: 10 },
      { height: 40 },
      { height: 20 },
      { height: 40 },
      { height: 70 },
      { height: 40 },
    ];
    return (
      <div className="AdminRightForm">
        <div className="AdminRightForm--Box">
          <div className="AdminRightForm--Box--Statistic">
            <i class="fal fa-analytics"></i>
            <span>STATISTICHE</span>
          </div>
          <i
            className={`far fa-chevron-${
              this.state.statisticheDropdownVisibility === false ? "down" : "up"
            }`}
            onClick={() => {
              this.setState({
                statisticheDropdownVisibility: !this.state
                  .statisticheDropdownVisibility,
              });
            }}
          ></i>
        </div>
        {this.state.statisticheDropdownVisibility && (
          <div className="Statistiche Dropdown">
            <div className="Graph">
              {data.map((heigh, i) => {
                return (
                  <Tooltip title={heigh.price}>
                    <div
                      className="Graph--Element"
                      style={{ height: `${heigh.height}%` }}
                    ></div>
                  </Tooltip>
                );
              })}
              <div className="Date">
                <div>
                  <span>{new Date().getDate()}</span>
                  <span>{moment().format("MMMM")}</span>
                </div>
                <div>
                  <i className="fal fa-calendar-alt"></i>
                </div>
              </div>
            </div>
            <div className="Tranzacioni">
              <div>
                <span>Tranzacioni</span> <span>258.66 $</span>{" "}
              </div>
              <div>
                <span>Commisione</span> <span>360 $</span>{" "}
              </div>
              <div>
                <span>Proviggioni</span> <span>220 $</span>
              </div>
            </div>
          </div>
        )}

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
            <span>DEPOSITO / ADDEBITO</span>
          </div>
          <i
            className={`far fa-chevron-${
              this.state.dropdownVisibility === false ? "down" : "up"
            }`}
            onClick={() => {
              this.setState({
                dropdownVisibility: !this.state.dropdownVisibility,
              });
            }}
          ></i>
        </div>
        {this.state.dropdownVisibility && (
          <div className="AdminRightForm--Box--Wallet--Dropdown">
            <div className="AdminRightForm--Box--Wallet--Dropdown--ChoseButtons">
              <button
                onClick={() => {
                  this.setState({
                    depositoActiveVisibility: !this.state
                      .depositoActiveVisibility,
                    addebitoActiveVisibility: this.state
                      .depositoActiveVisibility,
                  });
                }}
                className={`${
                  this.state.depositoActiveVisibility === true ? "active" : ""
                }`}
              >
                DEPOSITO{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="7"
                  viewBox="0 0 11 7"
                >
                  <path class="a" d="M5.5,0,11,7H0Z" />
                </svg>
              </button>
              <button
                onClick={() => {
                  this.setState({
                    addebitoActiveVisibility: !this.state
                      .addebitoActiveVisibility,
                    depositoActiveVisibility: this.state
                      .addebitoActiveVisibility,
                  });
                }}
                className={`${
                  this.state.addebitoActiveVisibility === true ? "active" : ""
                }`}
              >
                ADDEBITO{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="7"
                  viewBox="0 0 11 7"
                >
                  <path class="a" d="M5.5,0,11,7H0Z" />
                </svg>
              </button>
            </div>
            <div className="InputHolder">
              <input placeholder="SEARCH USERNAME" />
              <i class="fal fa-search"></i>
            </div>

            <div className="InputHolder">
              <input placeholder="SOMMA" />
              <span>&euro;</span>
            </div>
            <div className="InputHolder">
              <input placeholder="NOTIFICA ALL’USER" />
              <i class="far fa-check"></i>
            </div>

            <button className="AdminRightForm--Box--Wallet--Dropdown--Submit">
              DEPOSITO
            </button>
          </div>
        )}
      </div>
    );
  }
}
export default AdminRightForm;
