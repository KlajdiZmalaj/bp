import React, { useState } from "react";
import { Tooltip } from "antd";
import moment from "moment";
const graphForMap = (graphData) => {
  let arrayForMax = [];
  let arrayForMap = [];
  if (graphData) {
    Object.keys(graphData).forEach((key) => {
      arrayForMax.push(
        parseFloat(graphData[key].replace(".", "").replace(",", "."))
      );
      arrayForMap.push({
        value: parseFloat(graphData[key].replace(".", "").replace(",", ".")),
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
const SimpleGraph = ({
  graphicData,
  handleMouseEntering,
  handleClick,
  AdditionalComp,
}) => {
  const max = graphForMap(graphicData).max;
  const arrayForMap = graphForMap(graphicData).arrayForMap;
  const [date, setDate] = useState(new Date());
  return (
    <div className="Graph">
      {arrayForMap &&
        Array.isArray(arrayForMap) &&
        arrayForMap.map((graphData) => {
          const { realValue, day, month, value } = graphData;
          return (
            <Tooltip title={realValue} key={`${day}${month}`}>
              <div
                onMouseEnter={() => {
                  handleMouseEntering(realValue);
                  setDate(
                    new Date(`${month}-${day}-${new Date().getFullYear()}`)
                  );
                }}
                onClick={() => {
                  handleClick(realValue);
                  setDate(
                    new Date(`${month}-${day}-${new Date().getFullYear()}`)
                  );
                }}
                key={`${realValue}${day}${month}`}
                className={"Graph--Element"}
                style={{
                  height: `${value === 0 ? 0 : (value / max) * 100}%`,
                }}
              ></div>
            </Tooltip>
          );
        })}
      <div className="Additional">{AdditionalComp}</div>
      <div className="Date">
        <div>
          <span>{date.getDate()}</span>
        </div>
        <div>
          <i className="fal fa-calendar-alt"></i>
        </div>
      </div>
    </div>
  );
};
export default SimpleGraph;
