import React, { useState, Fragment } from "react";

const SingleError = ({ error, deleteError }) => {
  const [isHover, setHover] = useState(false);
  const [hasPopup, setPopUp] = useState(false);

  return (
    <div className="userList--noDoc__user singleUser">
      <div className="body">
        <span>{error.id}</span>
        <span> {error.time}</span>
        <span> {error.title}</span>
        <span> {error.user_full_name}</span>
        <span> {error.username}</span>
        <span className="description">
          {" "}
          <i
            onClick={() => {
              setHover(!isHover);
            }}
            className="fal fa-plus-circle"
          ></i>{" "}
          {error.description}
        </span>
        <span onClick={() => setPopUp(true)} className="deleteError">
          <i className="fal fa-trash-alt"></i>
        </span>
      </div>
      {isHover && (
        <div className="info animated fadeIn"> {error.description}</div>
      )}
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
                  deleteError(error.id, setPopUp(false));
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
