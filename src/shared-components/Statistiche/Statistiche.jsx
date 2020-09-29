import React, { Fragment } from "react";
import "./Statistiche.css";
import SimpleGraph from "shared-components/Graph/SimpleGraph";
import moment from "moment";
import AuthAction from "redux-store/models/auth";
import { connect } from "react-redux";
import CalendarRangePicker from "shared-components/CalendarRangePicker/CalendarRangePicker";
class Statistiche extends React.Component {
  state = {
    minimize: false,
    CalendarVis: false,
    fromLabel: null,
    toLabel: null,
    picker: [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
        color: "var(--accent-bg)",
      },
    ],
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };
  setCalendar = (val) => {
    this.setState({ CalendarVis: val });
  };
  setS = (item) => {
    this.setState({
      picker: [item.selection],
      from: moment(item.selection.startDate).format("yyyy-MM-dd"),
      to: moment(item.selection.endDate).format("yyyy-MM-dd"),
      fromLabel: moment(item.selection.startDate).format("DD/MM/YYYY"),
      toLabel: moment(item.selection.endDate).format("DD/MM/YYYY"),
    });
  };
  componentDidMount() {
    this.props.getStatisticheMain();
  }
  componentDidCatch(error) {
    console.log(error);
  }

  render() {
    const obj = {
      "8_23": "334,00",
      "8_24": "2.800,87",
      "8_25": "1.148,15",
      "8_26": "943,26",
      "8_27": "727,05",
      "8_28": "1.418,50",
      "8_29": "857,00",
      "8_30": "519,00",
      "8_31": "1.448,72",
      "9_1": "918,19",
      "9_2": "1.110,50",
      "9_3": "1.005,24",
      "9_4": "518,00",
      "9_5": "823,83",
      "9_6": "450,00",
      "9_7": "962,49",
      "9_8": "793,92",
      "9_9": "378,60",
      "9_10": "962,90",
      "9_11": "883,49",
      "9_12": "1.211,69",
      "9_13": "195,00",
      "9_14": "570,50",
      "9_15": "1.210,16",
      "9_16": "1.662,17",
      "9_17": "1.800,12",
      "9_18": "1.279,42",
      "9_19": "351,00",
      "9_20": "133,00",
      "9_21": "1.008,30",
      "9_22": "971,90",
      "9_23": "349,10",
    };
    const { minimize, CalendarVis } = this.state;
    const { userRole, StatisticheMain, ReportisticaDet } = this.props;
    return (
      StatisticheMain && (
        <div
          id="SpecStatistich"
          className={`Statist ${ReportisticaDet ? "min" : ""}`}
        >
          {CalendarVis && (
            <CalendarRangePicker
              setStateFunc={this.setS}
              setStateFuncEmpty={() => {
                this.setState({
                  from: "",
                  to: "",
                  fromLabel: "",
                  toLabel: "",
                });
              }}
              picker={this.state.picker}
              setCalendar={this.setCalendar}
              handleSubmit={this.handleSubmit}
            />
          )}
          <div className="Filters Categories">
            <div>
              <i className="fal fa-analytics" />
              <span>Statistiche</span>
            </div>
            <div>
              <span
                className="Bordered"
                onClick={() => {
                  this.setState((state) => ({
                    CalendarVis: !state.CalendarVis,
                  }));
                }}
              >
                <span>
                  {this.state.fromLabel && this.state.toLabel
                    ? `${this.state.fromLabel}-${this.state.toLabel}`
                    : "Selezione la data"}
                </span>
                <span>
                  <i className="fal fa-calendar-alt" />
                </span>
              </span>
              <span
                className="Bordered"
                onClick={() => {
                  this.props.editReportistica(!ReportisticaDet);
                }}
              >
                <i
                  className={`fal fa-angle-${ReportisticaDet ? "up" : "down"}`}
                />
              </span>
            </div>
          </div>
          {!ReportisticaDet && (
            <div className="data Categories">
              <SimpleGraph
                graphicData={StatisticheMain.data.transazioni}
                handleMouseEntering={() => {
                  console.log("enter mouse");
                }}
                handleClick={() => {
                  console.log("click with mouse");
                }}
                AdditionalComp={
                  <Fragment>
                    <div>{StatisticheMain.total.transazioni + "€"}</div>
                    <div>TRANSAZIONI TOTALI</div>
                  </Fragment>
                }
              />
              <SimpleGraph
                graphicData={StatisticheMain.data.commissioni}
                handleMouseEntering={() => {
                  console.log("enter mouse");
                }}
                handleClick={() => {
                  console.log("click with mouse");
                }}
                AdditionalComp={
                  <Fragment>
                    <div>{StatisticheMain.total.commissioni + "€"}</div>
                    <div>Commisioni</div>
                  </Fragment>
                }
              />
              {userRole !== "user" && (
                <SimpleGraph
                  graphicData={StatisticheMain.data.proviggioni}
                  handleMouseEntering={() => {
                    console.log("enter mouse");
                  }}
                  handleClick={() => {
                    console.log("click with mouse");
                  }}
                  AdditionalComp={
                    <Fragment>
                      <div>{StatisticheMain.total.proviggioni + "€"}</div>
                      <div>Proviggioni</div>
                    </Fragment>
                  }
                />
              )}
              {userRole === "super_admin" && (
                <div className="Additinal Statist">
                  <div className="saldoRete">
                    <span>{StatisticheMain.rete.saldo_rete + "€"}</span>
                    <span>Saldo Rete</span>
                  </div>

                  <div>
                    <div className="agenti">
                      <span>{StatisticheMain.rete.agenti}</span>
                      <span>
                        <span>
                          <i className="fal fa-user-tie" />
                        </span>
                        <span>Agenti</span>
                      </span>
                    </div>
                    <div className="agenzie">
                      <span>{StatisticheMain.rete.agencie}</span>
                      <span>
                        <span>
                          <i className="fal fa-store" />
                        </span>
                        <span>Agenzie</span>
                      </span>
                    </div>
                    <div className="utenti">
                      <span>{StatisticheMain.rete.utenti}</span>
                      <span>
                        <span>
                          <i className="fal fa-user " />
                        </span>
                        <span>Utenti</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}{" "}
            </div>
          )}
        </div>
      )
    );
  }
}
const mapStateToProps = (state) => ({
  StatisticheMain: state.auth.StatisticheMain,
  ReportisticaDet: state.auth.ReportisticaDet,
});
export default connect(mapStateToProps, AuthAction)(Statistiche);
