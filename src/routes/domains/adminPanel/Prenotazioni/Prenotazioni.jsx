import React from "react";
import "./Prenotazioni.css";
import FormDetails from "../../../views/FormDetails";
import { Tooltip } from "antd";
import CalendarRangePicker from "shared-components/CalendarRangePicker/CalendarRangePicker";
import { format } from "date-fns";
import {
  graphData,
  Tranzacioni,
  Commisione,
  Proviggioni,
} from "../StaticAdminData";
import { numberWithCommas } from "utils/HelperFunc";

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
}) => (
  <div className="Prenotazioni--Statistiche--Box--Informazioni">
    <div className="Prenotazioni--Statistiche--Box--Informazioni--Header">
      <div className="Prenotazioni--Statistiche--Box--Informazioni--Header--Stato">
        {stato}
      </div>
      <div className="Prenotazioni--Statistiche--Box--Informazioni--Header--TotalInfo">
        {totalInfo}
      </div>
    </div>
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
      <PartsType partType={"Bus"} iconClass={"fas fa-bus"} number={nrOfBus} />
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
  </div>
);
const Graph = ({ graphData, month }) => (
  <div className="Graph">
    <div className="Graph--TM">TRANSAZIONI MENSILI</div>
    <div className="Graph--Month">{month}</div>
    {graphData &&
      Array.isArray(graphData) &&
      graphData.map((heigh, i) => {
        return (
          <Tooltip title={heigh.price}>
            <div
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
                from: format(item.selection.startDate, "yyyy-MM-dd"),
                to: format(item.selection.endDate, "yyyy-MM-dd"),
                fromLabel: format(item.selection.startDate, "dd/MM/yyyy"),
                toLabel: format(item.selection.endDate, "dd/MM/yyyy"),
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
              <i class="fal fa-analytics"></i>
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
              <div className="Prenotazioni--Statistiche--Arrow">
                <i
                  className={`far fa-angle-${
                    dropdownVisibility === false ? "down" : "up"
                  }`}
                  onClick={() =>
                    this.setState((state) => ({
                      dropdownVisibility: !state.dropdownVisibility,
                    }))
                  }
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
              title={"COMMISIONI"}
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
            />
            <InformazioniDependeAlStato
              stato={"IN ATTESA"}
              totalInfo={31}
              nrOfPlane={80}
              nrOfTrain={14}
              nrOfBus={126}
              nrOfEvent={30}
              nrOfShopping={12}
            />
            <InformazioniDependeAlStato
              stato={"NUOVE RICHIESTE"}
              totalInfo={17}
              nrOfPlane={80}
              nrOfTrain={14}
              nrOfBus={126}
              nrOfEvent={30}
              nrOfShopping={12}
            />
            <InformazioniDependeAlStato
              stato={"ANNULLATE"}
              totalInfo={28}
              nrOfPlane={80}
              nrOfTrain={14}
              nrOfBus={126}
              nrOfEvent={30}
              nrOfShopping={12}
            />
          </div>
        </div>
        <FormDetails forAdmin={true} />
      </div>
    );
  }
}
export default Prenotazioni;
