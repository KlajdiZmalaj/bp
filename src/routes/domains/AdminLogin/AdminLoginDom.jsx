import React from "react";
import "./styles.css";
import { connect } from "react-redux";
import { AuthActions, MainActions } from "redux-store/models";
class AdminLoginDom extends React.Component {
  state = {};

  render() {
    const { component, addEditSkin } = this.props;
    return (
      <div className="AdminLogin">
        <div className="AdminLogin--Part--Blue">
          <span
            className={
              addEditSkin?.skinPannel === true
                ? addEditSkin?.stepNumber === 1
                  ? "title--Stepper"
                  : "title--Stepper"
                : "title"
            }
          >
            {addEditSkin?.skinPannel === true
              ? addEditSkin?.stepNumber === 1
                ? "CREATE SKIN "
                : "CREATE ADMIN"
              : "Skin"}
          </span>
          {addEditSkin?.stepNumber === 1 ? (
            <span> STEP 1/2</span>
          ) : addEditSkin?.stepNumber === 2 ? (
            <span> STEP 2/2</span>
          ) : null}
        </div>
        <div className="AdminLogin--Part"></div>
        <div className="AdminLogin--LoginForm--Back">{component}</div>
      </div>
    );
  }
}
const mapsStateToProps = (state) => {
  return {
    addEditSkin: state.auth.addEditSkin,
  };
};

export default connect(mapsStateToProps, { ...AuthActions, ...MainActions })(
  AdminLoginDom
);
