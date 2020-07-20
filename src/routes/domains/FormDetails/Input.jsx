import React, { Component } from "react";
class MyInput extends Component {
  render() {
    const { type, editable, value, handleChange, semi } = this.props;
    return (
      <div className={`itemCol ${semi ? "semi" : "full"}`}>
        <label className="inputLabel">{this.props.labelName}</label>
        <input
          className={`ant-input ${editable ? "disabled" : ""}`}
          type={type}
          readOnly={editable}
          value={value}
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
      </div>
    );
  }
}
export default MyInput;
