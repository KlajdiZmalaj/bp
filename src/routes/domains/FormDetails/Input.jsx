import React, { Component } from "react";
import ClickOut from "react-onclickout";
import { getCopy } from "utils";
class MyInput extends Component {
  state = { hasData: false };
  render() {
    const { type, editable, value, handleChange, semi, labelName } = this.props;
    const { hasData } = this.state;

    const jsonCheck = /^[\],:{}\s]*$/.test(
      labelName === "Dati Passegeri" &&
        value &&
        value
          // eslint-disable-next-line no-useless-escape
          .replace(/\\["\\\/bfnrtu]/g, "@")
          // eslint-disable-next-line no-useless-escape
          .replace(
            // eslint-disable-next-line no-useless-escape
            /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            "]"
          )
          .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
    );

    // console.log("value", labelName, value, jsonCheck);
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
          <ClickOut onClickOut={() => this.setState({ hasData: false })}>
            <div className="datiPassageri">
              <div className="datiPassageri--header">
                <span>Dati Passegeri</span>
                <i
                  onClick={() => this.setState({ hasData: false })}
                  className="fal fa-times"
                  aria-hidden="true"
                ></i>
              </div>
              <div className="datiPassageri--body">
                {(Object.keys(jsonCheck ? JSON.parse(value) : {}) || []).map(
                  (p, i) => {
                    return (
                      <div className="datiPassageri--body__pass" key={i}>
                        <div className="header">{p}</div>
                        <ul>
                          <li>
                            <span>
                              Nome : {JSON.parse(value)[p]?.name}{" "}
                              <i
                                onClick={() => {
                                  getCopy(JSON.parse(value)[p]?.name || "");
                                }}
                                className="fal fa-copy"
                              ></i>
                            </span>
                          </li>
                          <li>
                            <span>
                              Cognome : {JSON.parse(value)[p]?.cogname}{" "}
                              <i
                                onClick={() => {
                                  getCopy(JSON.parse(value)[p]?.cogname || "");
                                }}
                                className="fal fa-copy"
                              ></i>
                            </span>
                          </li>
                          <li>
                            <span>
                              Data di Nascita : {JSON.parse(value)[p]?.date}{" "}
                              <i
                                onClick={() => {
                                  getCopy(JSON.parse(value)[p]?.date || "");
                                }}
                                className="fal fa-copy"
                              ></i>
                            </span>
                          </li>
                          {p === "adult1" && (
                            <>
                              <li>
                                <span>
                                  Telefono : {JSON.parse(value)[p]?.tel}{" "}
                                  <i
                                    onClick={() => {
                                      getCopy(JSON.parse(value)[p]?.tel || "");
                                    }}
                                    className="fal fa-copy"
                                  ></i>
                                </span>
                              </li>
                              <li>
                                <span>
                                  Email : {JSON.parse(value)[p]?.email}{" "}
                                  <i
                                    onClick={() => {
                                      getCopy(
                                        JSON.parse(value)[p]?.email || ""
                                      );
                                    }}
                                    className="fal fa-copy"
                                  ></i>
                                </span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </ClickOut>
        )}
      </React.Fragment>
    );
  }
}
export default MyInput;
