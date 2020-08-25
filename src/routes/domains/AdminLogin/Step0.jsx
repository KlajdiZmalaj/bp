import React from "react";
import { AuthActions } from "redux-store/models";
import { connect } from "react-redux";
const Step0 = ({ skinList, addEditSkinDetails, addEditSkin }) => {
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
        skinList.map((skin) => (
          <div
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
              <img
                src={require(`../../../assets/images${
                  skin.id != 2 && skin.id < 7 ? skin.id : 1
                }/logo.svg`)}
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
