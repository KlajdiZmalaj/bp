import React from "react";
import { Tooltip } from "antd";

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
const SimpleGraph = ({
  graphicData,
  handleMouseEntering,
  handleClick,
  AdditionComp,
}) => {
  const max = graphForMap(graphicData).max;
  const arrayForMap = graphForMap(graphicData).arrayForMap;
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
                }}
                onClick={() => {
                  handleClick(realValue);
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
      <div className="Addition">{AdditionComp}</div>
    </div>
  );
};
export default SimpleGraph;
