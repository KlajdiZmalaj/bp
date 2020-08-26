import React from "react";
import { Tooltip } from "antd";
import moment from "moment";
import "./aRFSD.css";
const AdminRightFormStatisticheDetailsHelper = ({
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
class AdminRightFormStatisticheDetails extends React.Component {
  componentWillUnmount() {
    if (this.props.ModalOrNo) {
      this.props.Close({ visibility: false, data: "" });
    }
  }
  render() {
    const {
      graphData,
      Tranzacioni,
      Commisione,
      Proviggioni,
      ModalOrNo,
      Close,
    } = this.props;
    return (
      <React.Fragment>
        {ModalOrNo === true ? (
          <div className="RightFormModal">
            <div
              className="backDrop"
              onClick={() => {
                Close({ visibility: false, data: "" });
              }}
            ></div>
            <div
              className="Close"
              onClick={() => {
                Close({ visibility: false, data: "" });
              }}
            >
              <i className="fal fa-times"></i>
            </div>
            <div className="Header">Statistiche</div>
            <AdminRightFormStatisticheDetailsHelper
              graphData={graphData}
              Tranzacioni={Tranzacioni}
              Commisione={Commisione}
              Proviggioni={Proviggioni}
            />
          </div>
        ) : (
          <AdminRightFormStatisticheDetailsHelper
            graphData={graphData}
            Tranzacioni={Tranzacioni}
            Commisione={Commisione}
            Proviggioni={Proviggioni}
          />
        )}
      </React.Fragment>
    );
  }
}
export default AdminRightFormStatisticheDetails;
