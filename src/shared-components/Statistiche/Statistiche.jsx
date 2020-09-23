import React from "react";
import "./Statistiche.css";
import SimpleGraph from "shared-components/Graph/SimpleGraph";
class Statistiche extends React.Component {
  state = {
    minimize: false,
  };
  render() {
    const obj = {
      8_23: "334,00",
      8_24: "2.800,87",
      8_25: "1.148,15",
      8_26: "943,26",
      8_27: "727,05",
      8_28: "1.418,50",
      8_29: "857,00",
      8_30: "519,00",
      8_31: "1.448,72",
      9_1: "918,19",
      9_2: "1.110,50",
      9_3: "1.005,24",
      9_4: "518,00",
      9_5: "823,83",
      9_6: "450,00",
      9_7: "962,49",
      9_8: "793,92",
      9_9: "378,60",
      9_10: "962,90",
      9_11: "883,49",
      9_12: "1.211,69",
      9_13: "195,00",
      9_14: "570,50",
      9_15: "1.210,16",
      9_16: "1.662,17",
      9_17: "1.800,12",
      9_18: "1.279,42",
      9_19: "351,00",
      9_20: "133,00",
      9_21: "1.008,30",
      9_22: "971,90",
      9_23: "349,10",
    };
    const { minimize } = this.state;
    return (
      <div
        id="SpecStatistich"
        className={`Statistiche ${minimize ? "min" : ""}`}
      >
        <div className="Filters Categories">
          <div>
            <i className="fal fa-analytics" />
            <span>Statistiche</span>
          </div>
          <div>
            <span className="Bordered">
              <span>23/06/2020-23/07/2020</span>
              <span>
                <i className="fal fa-calendar-alt" />
              </span>
            </span>
            <span
              className="Bordered"
              onClick={() => {
                this.setState({ minimize: !minimize });
              }}
            >
              <i className={`fal fa-angle-${minimize ? "up" : "down"}`} />
            </span>
          </div>
        </div>
        {!minimize && (
          <div className="data Categories">
            <SimpleGraph
              graphicData={obj}
              handleMouseEntering={() => {
                console.log("enter mouse");
              }}
              handleClick={() => {
                console.log("click with mouse");
              }}
            />
            <SimpleGraph
              graphicData={obj}
              handleMouseEntering={() => {
                console.log("enter mouse");
              }}
              handleClick={() => {
                console.log("click with mouse");
              }}
            />
            <SimpleGraph
              graphicData={obj}
              handleMouseEntering={() => {
                console.log("enter mouse");
              }}
              handleClick={() => {
                console.log("click with mouse");
              }}
            />
            <div className="Additinal Statist">
              <div className="saldoRete">
                <span>256.43</span>
                <span>Saldo Rete</span>
              </div>

              <div>
                <div className="agenti">
                  <span>53</span>
                  <span>
                    <span>
                      <i className="fal fa-user-tie" />
                    </span>
                    <span>Agenti</span>
                  </span>
                </div>
                <div className="agenzie">
                  <span>256</span>
                  <span>
                    <span>
                      <i className="fal fa-store" />
                    </span>
                    <span>Agenzie</span>
                  </span>
                </div>
                <div className="utenti">
                  <span>256</span>
                  <span>
                    <span>
                      <i className="fal fa-user " />
                    </span>
                    <span>Utenti</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Statistiche;
