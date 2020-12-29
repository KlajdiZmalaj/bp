import React, { useState, Fragment } from "react";
import { Tooltip } from "antd";
const SingleError = ({
  error,
  deleteError,
  getErrors,
  perPage,
  page_number,
}) => {
  const [isHover, setHover] = useState(false);
  const [hasPopup, setPopUp] = useState(false);
  const formatString = (string) => {
    return (
      string.charAt(0).toUpperCase() +
      string.substring(1, string.length).toLowerCase()
    );
  };

  return (
    <div className="userList--noDoc__user singleUser">
      <div className="body">
        <span> {error.time}</span>
        <span>{error.skin}</span>
        <span> {formatString(error.username)}</span>
        <span> {formatString(error.user_full_name)}</span>

        <span> {error.title}</span>
        <span className="description">
          <Tooltip title={error.description}>
            <div className="descriptionErrorMsg">{error.description}</div>
          </Tooltip>

          <div className="ErrorAdd">
            {" "}
            {/* <i
              onClick={() => {
                setHover(!isHover);
              }}
              style={{ cursor: "pointer" }}
              className={`fal fa-${isHover ? "minus" : "plus"}-circle`}
            ></i> */}
          </div>
        </span>
        <span onClick={() => setPopUp(true)} className="deleteError">
          <i className="fal fa-trash-alt"></i>
        </span>
      </div>
      {/* {isHover && (
        <div className="info animated fadeIn"> {error.description}</div>
      )} */}
      {hasPopup && (
        <Fragment>
          <div
            style={{ animationDuration: "0.6s" }}
            className="userDetailPopup animated bounceIn confirmationDelete"
          >
            <h1>Are you sure you want to delete msg nr.{error.id}?</h1>
            <div>
              <button
                onClick={() => {
                  deleteError(error.id, () => {
                    getErrors(perPage, page_number, "DONT_LOAD");
                    setPopUp(false);
                  });
                }}
              >
                Yes
              </button>
              <button onClick={() => setPopUp(false)}>No</button>
            </div>
          </div>
          <div className="backDrop" onClick={() => setPopUp(false)}></div>
        </Fragment>
      )}
    </div>
  );
};
export default SingleError;
