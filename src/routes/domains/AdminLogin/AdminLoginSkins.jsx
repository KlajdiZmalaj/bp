import React from "react";
import { AuthActions } from "redux-store/models";
import { connect } from "react-redux";
import Step0 from "./Step0";
import Step1 from "./Step1";
import Step2 from "./Step2";

const AdminLoginSkins = ({ skinList, addEditSkinDetails, addEditSkin }) => {
  return addEditSkin?.stepNumber === 1 ? (
    <Step1 skinList={skinList} addEditSkinDetails={addEditSkinDetails} />
  ) : addEditSkin?.stepNumber === 2 ? (
    <Step2 addEditSkinDetails={addEditSkinDetails} />
  ) : (
    <Step0 skinList={skinList} addEditSkinDetails={addEditSkinDetails} />
  );
};
const mapsStateToProps = (state) => {
  return {
    addEditSkin: state.auth.addEditSkin,
  };
};
export default connect(mapsStateToProps, AuthActions)(AdminLoginSkins);
