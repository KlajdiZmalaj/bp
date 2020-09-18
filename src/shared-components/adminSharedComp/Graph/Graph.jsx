import React from "react";
import { Tooltip } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import AuthActions from "redux-store/models/auth";

const graphForMap = (graphData) => {
  let arrayForMax = [];
  let arrayForMap = [];
  if (graphData) {
    Object.keys(graphData).forEach((key) => {
      arrayForMax.push(parseFloat(graphData[key].replace(".", "")));
      arrayForMap.push({
        value: parseFloat(graphData[key].replace(".", "")),
        month: parseInt(key.substring(0, key.indexOf("_"))),
        day: parseInt(key.substring(key.indexOf("_") + 1, key.length)),
        realValue: graphData[key] + " €",
      });
    });
  }
  arrayForMax.sort(function (a, b) {
    return a - b;
  });

  return { max: arrayForMax[arrayForMax.length - 1], arrayForMap };
};
const Graph = ({
  graphicData,
  date,
  setDate,
  getPayments,
  activeSkinId,
  setFromDateToDate,
}) => {
  const max = graphForMap(graphicData).max;
  const arrayForMap = graphForMap(graphicData).arrayForMap;
  console.log(max, arrayForMap);
  return (
    <div className="Graph">
      {arrayForMap &&
        Array.isArray(arrayForMap) &&
        arrayForMap.map((graphData) => {
          return (
            <Tooltip
              title={graphData.realValue}
              key={`${graphData.day}${graphData.month}`}
            >
              <div
                onMouseEnter={() => {
                  setDate(
                    new Date(
                      `${graphData.month}-${
                        graphData.day
                      }-${new Date().getFullYear()}`
                    )
                  );
                }}
                onClick={() => {
                  if (window.location.href.includes("movimenti")) {
                    const date = moment(
                      `${graphData.month}-${
                        graphData.day
                      }-${new Date().getFullYear()}`
                    ).format("YYYY-MM-DD");
                    getPayments("", date, date, 1, 25, activeSkinId);
                    setFromDateToDate(date);
                  }
                }}
                key={`${graphData.realValue}${graphData.day}${graphData.month}`}
                className={`Graph--Element ${
                  parseInt(graphData.month) === date.getMonth() + 1 &&
                  parseInt(graphData.day) === date.getDate()
                    ? "active"
                    : ""
                }`}
                style={{
                  height: `${
                    graphData.value === 0 ? 0 : (graphData.value / max) * 100
                  }%`,
                }}
              ></div>
            </Tooltip>
          );
        })}
      <div className="Date">
        <div>
          <span>{date.getDate()}</span>
          <span>{moment(date).format("MMMM")}</span>
        </div>
        <div>
          <i className="fal fa-calendar-alt"></i>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  activeSkinId: state.main.activeSkinId,
});
export default connect(mapStateToProps, AuthActions)(Graph);
