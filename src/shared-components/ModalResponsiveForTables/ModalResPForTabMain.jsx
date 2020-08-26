import React from "react";

const ModalResPForTabMain = ({ Close, mobilePopUpData, exception }) => (
  <React.Fragment>
    <div className="rowPopUp ">
      <div className="rowPopUp--header">
        Dettagli della riga{" "}
        <i
          onClick={() => {
            Close();
          }}
          className="fal fa-times"
          aria-hidden="true"
        ></i>{" "}
      </div>
      <div className="rowPopUp--body">
        {mobilePopUpData &&
          typeof mobilePopUpData === "object" &&
          Object.keys(mobilePopUpData).map(
            (key, index) =>
              !exception ||
              (key != exception && (
                <div
                  className="rowPopUp--body__item"
                  key={`${mobilePopUpData[key]}${index}`}
                >
                  <span>
                    {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                  </span>
                  <span>{mobilePopUpData[key]}</span>
                </div>
              ))
          )}
      </div>
    </div>

    <div
      onClick={() => {
        Close();
      }}
      className="backDrop"
    ></div>
  </React.Fragment>
);
export default ModalResPForTabMain;
