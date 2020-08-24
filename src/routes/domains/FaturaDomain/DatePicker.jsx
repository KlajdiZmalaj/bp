import React, { Fragment } from "react";

let years = [];
for (let i = 2000; i <= new Date().getFullYear(); i++) {
  years.push({ id: i - 1999, name: i });
}
const months = [
  { id: 1, name: "Gennaio" },
  { id: 2, name: "Febbraio" },
  { id: 3, name: "Marzo" },
  { id: 4, name: "Aprile" },
  { id: 5, name: "Maggio" },
  { id: 6, name: "giugno" },
  { id: 7, name: "Luglio" },
  { id: 8, name: "Agosto" },
  { id: 9, name: "Settembre" },
  { id: 10, name: "Ottobre" },
  { id: 11, name: "Novembre" },
  { id: 12, name: "Dicembre" },
];

const DatePicker = ({
  setMonthDropdown,
  setMonthChosen,
  setYearDropdown,
  setYearChosen,
  yearChosen,
  yearDropdown,
  monthDropdown,
  monthChosen,
}) => (
  <React.Fragment>
    <div className="Chose--Month">
      <div className="Header" onClick={setMonthDropdown}>
        {`${monthChosen?.name ? monthChosen.name : " Chose Month"}`}
      </div>
      {monthDropdown && (
        <div className="Body">
          {months.map((month) => {
            return (
              <div
                className="month"
                onClick={() => {
                  setMonthChosen(month);
                }}
                className={`${monthChosen.name === month.name ? "active" : ""}`}
                key={month.id}
              >
                {month.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
    <div className="Chose--Year">
      <div className="Header" onClick={setYearDropdown}>
        {`${yearChosen ? yearChosen : " Chose Year"}`}
      </div>
      {yearDropdown && (
        <div className="Body">
          {years.map((year) => {
            return (
              <div
                className="year"
                onClick={() => {
                  setYearChosen(year);
                }}
                className={`${yearChosen === year.name ? "active" : ""}`}
                key={year.id}
              >
                {year.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  </React.Fragment>
);
export default DatePicker;
