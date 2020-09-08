import React from "react";
import "./mRFT.css";
const ModalResponsiveForTables = ({
  Close,
  Rows,
  Header,
  Footer,
  beforeFooter,
}) => {
  const styles = {};
  if (Footer === null && beforeFooter === null) {
    styles.height = "60%";
    styles.top = "25%";
  }
  return (
    <div className="TrMoRes">
      <div className="backDrop" onClick={Close}></div>
      <div className="TrMoRes--Data" style={{ ...styles }}>
        <div
          className="TrMoRes--Data--Header"
          style={Object.keys(styles).length >= 1 ? { height: "17%" } : {}}
        >
          <div className="TrMoRes--Data--Header--Title">{Header}</div>
          <div className="TrMoRes--Data--Header--Close" onClick={Close}>
            <i className="fal fa-times" aria-hidden="true"></i>
          </div>
        </div>

        <div className="TrMoRes--Data--Row">{Rows}</div>
        {beforeFooter && (
          <div className="TrMoRes--Data--BeforeFooter">{beforeFooter}</div>
        )}
        {Footer && <div className="TrMoRes--Data--Footer">{Footer}</div>}
      </div>
    </div>
  );
};
export default ModalResponsiveForTables;
