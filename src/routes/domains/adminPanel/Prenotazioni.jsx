import React from "react";
import "./styles.css";
import FormDetails from "../../views/FormDetails";
import { Tooltip } from "antd";
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
const Graph = ({ data, month }) => (
  <div className="Graph">
    <div className="Graph--TM">TRANSAZIONI MENSILI</div>
    <div className="Graph--Month">{month}</div>
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
  </div>
);
class Prenotazioni extends React.Component {
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
      <div className="Prenotazioni">
        <div className="Prenotazioni--Statistiche">
          <div className="Prenotazioni--Statistiche--First">
            <div className="Prenotazioni--Statistiche--TitleHeaderLeft">
              <i class="fal fa-analytics"></i>
              <span>STATISTICHE</span>
            </div>
            <div className="Right">
              <div className="Prenotazioni--Statistiche--DatePicker">
                <div
                  className="Prenotazioni--Statistiche--DatePicker-CalendarLabel"
                  // onClick={() => {
                  //   this.setCalendar(true);
                  // }}
                >
                  {/* {fromLabel
                      ? `${fromLabel} - ${toLabel}` */}
                  Seleziona la data
                  <i className="fal fa-calendar-alt"></i>
                </div>
              </div>
              <div className="Prenotazioni--Statistiche--Arrow">
                <i className="far fa-angle-down"></i>
              </div>
            </div>
          </div>
          <div className="Prenotazioni--Statistiche--Other--Second">
            <TranCommProv title={"TRANSAZIONI"} price={825866} />
            <TranCommProv title={"COMMISIONI"} price={56837} />
            <TranCommProv title={"PROVIGGIONI"} price={25643} />
            <Graph month={"LUGLIO 2020"} data={data} />
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
