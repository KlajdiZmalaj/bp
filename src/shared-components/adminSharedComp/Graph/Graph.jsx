import React from "react";
import { Tooltip } from "antd";
import moment from "moment";
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
const Graph = ({ graphicData, date, setDate }) => {
  const max = graphForMap(graphicData).max;
  const arrayForMap = graphForMap(graphicData).arrayForMap;
  return (
    <div className="Graph">
      {arrayForMap &&
        Array.isArray(arrayForMap) &&
        arrayForMap.map((graphData) => {
          return (
            <Tooltip
              title={graphData.realValue}
              key={graphData.realValue + graphData.day + graphData.value}
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
                key={
                  graphData.realValue +
                  graphData.day +
                  graphData.value +
                  graphData.month
                }
                className="Graph--Element"
                style={{ height: `${(graphData.value / max) * 100}%` }}
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
export default Graph;
