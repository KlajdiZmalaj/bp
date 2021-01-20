import React from "react";
import { DateRangePicker } from "react-date-range";
import * as locales from "react-date-range/dist/locale";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import "./styles.css";
import ClickOut from "react-onclickout";
import moment from "moment";
const renderStaticRangeLabel = (e) => (
  <CustomStaticRangeLabelContent text={e} />
);
class CustomStaticRangeLabelContent extends React.Component {
  render() {
    const { text } = this.props;
    return (
      <span>
        <i>{text}</i>
      </span>
    );
  }
}
const CalendarRangePicker = ({
  setStateFunc,
  picker,
  setCalendar,
  handleSubmit,
  setStateFuncEmpty,
}) => {
  return (
    <ClickOut
      onClickOut={() => {
        setCalendar(false);
      }}
    >
      <div className="calendarWrapper">
        <DateRangePicker
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onChange={(item) => {
            //console.log("item", item);
            setStateFunc(item);
          }}
          locale={locales["it"]}
          color="#00e2b6"
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={1}
          maxDate={new Date()}
          dateDisplayFormat={"dd LLLL , yyyy"}
          ranges={picker}
          direction="horizontal"
          renderStaticRangeLabel={(e) => {
            return renderStaticRangeLabel(e.label);
          }}
          staticRanges={[
            {
              label: "Oggi",
              hasCustomRendering: true,
              range: () => ({
                endDate: new Date(),
                startDate: new Date(),
              }),
              isSelected() {
                return false;
              },
            },
            {
              label: "Ultima settimana",
              hasCustomRendering: true,
              range: () => ({
                endDate: new Date(),
                startDate: moment(new Date()).subtract(6, "days").toDate(),
              }),
              isSelected() {
                return false;
              },
            },
            {
              label: "Ultimo mese",
              hasCustomRendering: true,
              range: () => ({
                endDate: new Date(),
                startDate: moment(new Date()).subtract(29, "days").toDate(),
              }),
              isSelected() {
                return false;
              },
            },
            {
              label: "Ultimi 3 mesi",
              hasCustomRendering: true,
              range: () => ({
                endDate: new Date(),
                startDate: moment(new Date()).subtract(89, "days").toDate(),
              }),
              isSelected() {
                return false;
              },
            },
          ]}
          // scroll={{ enabled: true }}
        />
        <div
          className="blurCalendar"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setCalendar(false);
          }}
        ></div>
        {
          <div className="buttons">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCalendar(false);
                setStateFuncEmpty();
              }}
            >
              Cancella
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCalendar(false);
                handleSubmit(e);
              }}
            >
              Esegui
            </button>
          </div>
        }
      </div>
    </ClickOut>
  );
};
export default CalendarRangePicker;
