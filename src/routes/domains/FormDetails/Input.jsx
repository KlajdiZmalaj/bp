import React, { Component } from "react";
class MyInput extends Component {
  state = { hasData: false };
  render() {
    const { type, editable, value, handleChange, semi } = this.props;
    const { hasData } = this.state;
    return (
      <React.Fragment>
        <div className={`itemCol ${semi ? "semi" : "full"}`}>
          <label className="inputLabel">{this.props.labelName}</label>
          <input
            className={`ant-input ${editable ? "disabled" : ""}`}
            type={type}
            readOnly={
              this.props.labelName === "Dati Passegeri" ? true : editable
            }
            value={
              this.props.labelName === "Dati Passegeri"
                ? "Visualizzare i dati"
                : value || ""
            }
            onChange={(e) => {
              handleChange(e);
            }}
            onClick={(e) => {
              if (this.props.labelName === "Link") {
                // console.log("click e", e.target.value);
                window.open(e.target.value);
              }
              if (this.props.labelName === "Dati Passegeri") {
                this.setState({ hasData: true });
              }
            }}
          ></input>
        </div>
        {this.props.labelName === "Dati Passegeri" && hasData && (
          <div className="datiPassageri">
            <div className="datiPassageri--header">
              <span>Dati Passegeri</span>
              <i
                onClick={() => this.setState({ hasData: false })}
                class="fal fa-times"
                aria-hidden="true"
              ></i>
            </div>
            <div className="datiPassageri--body">
              {Object.keys(JSON.parse(value)).map((p) => {
                return (
                  <div className="datiPassageri--body__pass">
                    <div className="header">{p}</div>
                    <ul>
                      <li>
                        <span>Nome : {JSON.parse(value)[p]?.name} </span>
                      </li>
                      <li>
                        <span>Cognome : {JSON.parse(value)[p]?.cogname} </span>
                      </li>
                      <li>
                        <span>
                          Data di Nascita : {JSON.parse(value)[p]?.date}{" "}
                        </span>
                      </li>
                      {p === "adult1" && (
                        <>
                          <li>
                            <span>Telefono : {JSON.parse(value)[p]?.tel} </span>
                          </li>
                          <li>
                            <span>Email : {JSON.parse(value)[p]?.email} </span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default MyInput;
