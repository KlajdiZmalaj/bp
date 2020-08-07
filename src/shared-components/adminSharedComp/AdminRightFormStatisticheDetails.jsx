import React from "react";
import { Tooltip } from "antd";
import moment from "moment";
const AdminRightFormStatisticheDetails = ({
  graphData,
  Tranzacioni,
  Commisione,
  Proviggioni,
}) => (
  <div className="Statistiche Dropdown">
    <div className="Graph">
      {graphData.map((heigh, i) => {
        return (
          <Tooltip title={heigh.price} key={heigh.price + heigh.height * 2 + i}>
            <div
              key={heigh.price + heigh.height * 3 + i}
              className="Graph--Element"
              style={{ height: `${heigh.height}%` }}
            ></div>
          </Tooltip>
        );
      })}
      <div className="Date">
        <div>
          <span>{new Date().getDate()}</span>
          <span>{moment().format("MMMM")}</span>
        </div>
        <div>
          <i className="fal fa-calendar-alt"></i>
        </div>
      </div>
    </div>
    <div className="Tranzacioni">
      <div>
        <span>Tranzacioni</span> <span>{`${Tranzacioni} `} &euro;</span>{" "}
      </div>
      <div>
        <span>Commisione</span> <span>{`${Commisione} `} &euro;</span>{" "}
      </div>
      <div>
        <span>Proviggioni</span> <span>{`${Proviggioni} `} &euro;</span>
      </div>
    </div>
  </div>
);
export default AdminRightFormStatisticheDetails;
