import React, { useEffect } from "react";
import { AuthActions } from "redux-store/models";
import { connect } from "react-redux";
const Step0 = ({ skinList, addEditSkinDetails, addEditSkin, getSkins }) => {
  useEffect(() => {
    getSkins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="AdminLogin--LoginForm">
      <div
        onClick={() => {
          addEditSkinDetails({
            ...{
              skinId: -1,
              skinName: "newSkin",
              skinPannel: true,
              stepNumber: 1,
              step1: addEditSkin?.step1 ? addEditSkin.step1 : {},
              step2: addEditSkin?.step2 ? addEditSkin.step1 : {},
            },
          });
        }}
      >
        <span>
          <i className="fal fa-plus"></i>
        </span>
        <span>Create Skin</span>
      </div>
      {skinList &&
        Array.isArray(skinList) &&
        skinList.map((skin, i) => (
          <div
            key={skin.id + i}
            onClick={() => {
              addEditSkinDetails({
                ...{
                  skinId: skin.id,
                  skinName: skin.username,
                  skinPannel: true,
                  stepNumber: 1,
                  step1: addEditSkin?.step1 ? addEditSkin.step1 : {},
                  step2: addEditSkin?.step2 ? addEditSkin.step1 : {},
                },
              });
            }}
          >
            <span>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img
                src={
                  "https://services-api.bpoint.store/storage/" +
                  skin.username.toLowerCase().split(" ").join("") +
                  ".png"
                }
              />
            </span>
            <span>{skin.username}</span>
          </div>
        ))}
    </div>
  );
};
const mapsStateToProps = (state) => {
  return {
    addEditSkin: state.auth.addEditSkin,
  };
};
export default connect(mapsStateToProps, AuthActions)(Step0);
