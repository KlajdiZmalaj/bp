import React, { useState } from "react";
import Graph from "../Graph/Graph";
import "./aRFSD.css";
const AdminRightFormStatisticheDetailsHelper = ({
  graphData,
  Tranzacioni,
  Commisione,
  Proviggioni,
}) => {
  const [date, setDate] = useState(new Date());
  return (
    <div className="Statistiche Dropdown">
      <Graph graphicData={graphData} date={date} setDate={setDate} />
      <div className="Tranzacioni">
        <div>
          <span>Transazioni</span> <span>{`${Tranzacioni} `} &euro;</span>{" "}
        </div>
        <div>
          <span>Commisioni</span> <span>{`${Commisione} `} &euro;</span>{" "}
        </div>
        <div>
          <span>Proviggioni</span> <span>{`${Proviggioni} `} &euro;</span>
        </div>
      </div>
    </div>
  );
};
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
