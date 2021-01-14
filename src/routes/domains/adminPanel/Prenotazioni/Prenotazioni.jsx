import React, { useState } from "react";
import "./Prenotazioni.css";
import FormDetails from "../../../views/FormDetails";
import { Tooltip } from "antd";
import CalendarRangePicker from "shared-components/CalendarRangePicker/CalendarRangePicker";
import { connect } from "react-redux";
import {
  graphData,
  Tranzacioni,
  Commisione,
  Proviggioni,
} from "../StaticAdminData";
import { numberWithCommas } from "utils/HelperFunc";
import moment from "moment";
const PartsType = ({ partType, iconClass, number }) => (
  <div
    className={`Prenotazioni--Statistiche--Box--Informazioni--Parts--${partType}`}
  >
    <div>
      <i className={iconClass} />
      <div
        className={`Prenotazioni--Statistiche--Box--Informazioni--Parts--${partType}--Name`}
      >
        {partType}
      </div>
    </div>
    <div
      className={`Prenotazioni--Statistiche--Box--Informazioni--Parts--${partType}--Number numbers`}
    >
      {number}
    </div>
  </div>
);
const TranCommProv = ({ title, price }) => (
  <div className="Prenotazioni--Statistiche--Box--PriceBox">
    <div className="Prenotazioni--Statistiche--Box--PriceBox--Price">
      {`${price}   `}
      &euro;
    </div>
    <div className="Prenotazioni--Statistiche--Box--PriceBox--Title">
      {title}
    </div>
  </div>
);
const InformazioniDependeAlStato = ({
  stato,
  totalInfo,
  nrOfPlane,
  nrOfTrain,
  nrOfBus,
  nrOfEvent,
  nrOfShopping,
  screenWidth,
}) => {
  const [visibility, setVisibility] = useState(true);
  return (
    <div
      className={`Prenotazioni--Statistiche--Box--Informazioni ${
        visibility ? "" : "none"
      }`}
    >
      <div className="Prenotazioni--Statistiche--Box--Informazioni--Header">
        <div className="Prenotazioni--Statistiche--Box--Informazioni--Header--Stato">
          {stato}
        </div>
        <div className="Prenotazioni--Statistiche--Box--Informazioni--Header--TotalInfo">
          {totalInfo}
          {screenWidth <= 550 && (
            <i
              className={`fal fa-angle-${visibility ? "up" : "down"}`}
              onClick={() => {
                setVisibility(!visibility);
              }}
            ></i>
          )}
        </div>
      </div>
      {(screenWidth <= 550 && visibility === true) || screenWidth >= 550 ? (
        <div className="Prenotazioni--Statistiche--Box--Informazioni--Parts">
          <PartsType
            partType={"Plain"}
            iconClass={"fas fa-plane"}
            number={nrOfPlane}
          />
          <PartsType
            partType={"Train"}
            iconClass={"fas fa-train"}
            number={nrOfTrain}
          />
          <PartsType
            partType={"Bus"}
            iconClass={"fas fa-bus"}
            number={nrOfBus}
          />
          <PartsType
            partType={"Event"}
            iconClass={"fas fa-ticket-alt"}
            number={nrOfEvent}
          />
          <PartsType
            partType={"Shopping"}
            iconClass={"fas fa-shopping-cart"}
            number={nrOfShopping}
          />
        </div>
      ) : null}
    </div>
  );
};

const Graph = ({ graphData, month }) => (
  <div className="Graph">
    <div className="Graph--TM">TRANSAZIONI MENSILI</div>
    <div className="Graph--Month">{month}</div>
    {graphData &&
      Array.isArray(graphData) &&
      graphData.map((heigh, i) => {
        return (
          <Tooltip title={heigh.price} key={i}>
            <div
              key={i + 99}
              className="Graph--Element"
              style={{ height: `${heigh.height}%` }}
            ></div>
          </Tooltip>
        );
      })}
  </div>
);
class Prenotazioni extends React.Component {
  state = {
    dropdownVisibility: false,
    from: "",
    to: "",
    fromLabel: "",
    toLabel: "",
    picker: [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
        color: "var(--accent-bg)",
      },
    ],
    isCalendarOpen: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
  };
  setCalendar = (val) => {
    this.setState({ isCalendarOpen: val });
  };
  render() {
    const { screenWidth } = this.props;
    const {
      dropdownVisibility,
      picker,
      isCalendarOpen,
      fromLabel,
      toLabel,
    } = this.state;
    return (
      <div className="Prenotazioni">
        {isCalendarOpen && (
          <CalendarRangePicker
            setStateFunc={(item) => {
              this.setState({
                picker: [item.selection],
                from: moment(item.selection.startDate).format("YYYY-MM-DD"),
                to: moment(item.selection.endDate).format("YYYY-MM-DD"),
                fromLabel: moment(item.selection.startDate).format(
                  "DD/MM/YYYY"
                ),
                toLabel: moment(item.selection.endDate).format("DD/MM/YYYY"),
              });
            }}
            setStateFuncEmpty={() => {
              this.setState({
                from: "",
                to: "",
                fromLabel: "",
                toLabel: "",
              });
            }}
            picker={picker}
            setCalendar={this.setCalendar}
            handleSubmit={this.handleSubmit}
          />
        )}

        <div
          className={`Prenotazioni--Statistiche ${
            dropdownVisibility === false ? "Minimize" : ""
          }`}
        >
          <div className="Prenotazioni--Statistiche--First">
            <div className="Prenotazioni--Statistiche--TitleHeaderLeft">
              <i className="fal fa-analytics"></i>
              <span>PRENOTAZIONI</span>
            </div>
            <div className="Right">
              <div className="Prenotazioni--Statistiche--DatePicker">
                <div
                  className="Prenotazioni--Statistiche--DatePicker-CalendarLabel"
                  onClick={() => {
                    this.setCalendar(true);
                  }}
                >
                  {fromLabel
                    ? `${fromLabel} - ${toLabel}`
                    : "Seleziona la data"}
                  <i className="fal fa-calendar-alt"></i>
                </div>
              </div>
              <div
                className="Prenotazioni--Statistiche--Arrow"
                onClick={() =>
                  this.setState({
                    dropdownVisibility: !this.state.dropdownVisibility,
                  })
                }
              >
                <i
                  className={`far fa-angle-${
                    dropdownVisibility === false ? "down" : "up"
                  }`}
                ></i>
              </div>
            </div>
          </div>
          <div className="Prenotazioni--Statistiche--Other--Second">
            <TranCommProv
              title={"TRANSAZIONI"}
              price={numberWithCommas(Tranzacioni)}
            />
            <TranCommProv
              title={"COMMISSIONI"}
              price={numberWithCommas(Commisione)}
            />
            <TranCommProv
              title={"PROVIGGIONI"}
              price={numberWithCommas(Proviggioni)}
            />
            <Graph month={"LUGLIO 2020"} graphData={graphData} />
          </div>

          <div className="Prenotazioni--Statistiche--Other--Third">
            <InformazioniDependeAlStato
              stato={"ESEGUITI"}
              totalInfo={262}
              nrOfPlane={80}
              nrOfTrain={14}
              nrOfBus={126}
              nrOfEvent={30}
              nrOfShopping={12}
              screenWidth={screenWidth}
            />
            <InformazioniDependeAlStato
              stato={"IN ATTESA"}
              totalInfo={31}
              nrOfPlane={80}
              nrOfTrain={14}
              nrOfBus={126}
              nrOfEvent={30}
              nrOfShopping={12}
              screenWidth={screenWidth}
            />
            <InformazioniDependeAlStato
              stato={"NUOVE RICHIESTE"}
              totalInfo={17}
              nrOfPlane={80}
              nrOfTrain={14}
              nrOfBus={126}
              nrOfEvent={30}
              nrOfShopping={12}
              screenWidth={screenWidth}
            />
            <InformazioniDependeAlStato
              stato={"ANNULLATE"}
              totalInfo={28}
              nrOfPlane={80}
              nrOfTrain={14}
              nrOfBus={126}
              nrOfEvent={30}
              nrOfShopping={12}
              screenWidth={screenWidth}
            />
          </div>
        </div>
        <FormDetails forAdmin={true} />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  screenWidth: state.main.screenWidth,
});
export default connect(mapStateToProps)(Prenotazioni);
