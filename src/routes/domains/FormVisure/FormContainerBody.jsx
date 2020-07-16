import React, { Component } from "react";
class FormContainerBody extends Component {
  render() {
    return (
      <div>
        <div className="VisureHeader">{this.props.headerTitle}</div>
        <div>{this.props.form}</div>
        <button className="SubmitButton">Invia</button>
      </div>
    );
  }
}

export default FormContainerBody;
