import React from "react";
import { AuthActions } from "redux-store/models";
import { connect } from "react-redux";
import { notification, DatePicker } from "antd";
import { MySpan } from "./Step1";
import moment from "moment";
class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownVis: false,
      step2: {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        gender: "Male",
        address: "",
        city: "",
        provincia: "",
        cap: "",
        country: "",
        phone: "",
        personal_number: "",
        comune_nascita: "",
        stato_nascita: "",
        data_di_nascita: "",
        password: "",
        conferma_password: "",
        ragione_sociale: "",
        p_iva: "",
        codice_fiscale: "",
      },
    };
  }
  componentDidMount() {
    if (
      !JSON.stringify(this.state.step2) !=
      JSON.stringify(this.props.addEditSkin?.step2)
    ) {
      this.setState({
        step2: { ...this.state.step2, ...this.props.addEditSkin?.step2 },
      });
    }
  }

  render() {
    const { addEditSkinDetails, addEditSkin } = this.props;
    const { step2 } = this.state;
    const {
      first_name,
      last_name,
      username,
      gender,
      email,
      address,
      city,
      provincia,
      cap,
      country,
      conferma_password,
      phone,
      personal_number,
      comune_nascita,
      stato_nascita,
      data_di_nascita,
      password,
      ragione_sociale,
      codice_fiscale,
      p_iva,
    } = step2;
    return (
      <div className="AdminLogin--Step1">
        <div className="AdminLogin--Step1--Step2">
          <i
            class="fal fa-long-arrow-left"
            onClick={() => {
              addEditSkinDetails({
                step2: {
                  ...this.state.step2,
                },
                step1: {
                  ...(addEditSkin?.step1 ? addEditSkin.step1 : {}),
                },
                skinId: addEditSkin?.skinId,
                skinName: addEditSkin?.skinName,
                skinPannel: true,
                stepNumber: addEditSkin?.stepNumber - 1,
              });
            }}
          ></i>

          <div className="AdminLogin--Step1--Right">
            <MySpan
              title="FIRST NAME"
              iconClass="fal fa-user"
              handleChange={(e) => {
                this.setState({
                  step2: { ...step2, first_name: e.target.value },
                });
              }}
              value={first_name}
            />
            <MySpan
              title="LAST NAME"
              iconClass="fal fa-user"
              handleChange={(e) => {
                this.setState({
                  step2: { ...step2, last_name: e.target.value },
                });
              }}
              value={last_name}
            />
            <MySpan
              title="USERNAME"
              iconClass="fal fa-user-circle   "
              handleChange={(e) => {
                this.setState({
                  step2: { ...step2, username: e.target.value },
                });
              }}
              value={username}
            />
            <span>
              <div
                onClick={() => {
                  this.setState((state) => ({
                    dropdownVis: !state.dropdownVis,
                  }));
                }}
              >
                <div>{step2.gender}</div>
                <i
                  className={`fal fa-chevron-${
                    this.state.dropdownVis ? "up" : "down"
                  }`}
                ></i>
              </div>
              {this.state.dropdownVis === true && (
                <div className="dropdown">
                  <div
                    className={step2.gender === "Male" ? "active" : ""}
                    onClick={() => {
                      this.setState({
                        step2: { ...step2, gender: "Male" },
                        dropdownVis: false,
                      });
                    }}
                  >
                    Male
                  </div>
                  <div
                    className={step2.gender === "Female" ? "active" : ""}
                    onClick={() => {
                      this.setState({
                        step2: { ...step2, gender: "Female" },
                        dropdownVis: false,
                      });
                    }}
                  >
                    Female
                  </div>
                </div>
              )}
            </span>

            <MySpan
              title="EMAIL"
              iconClass="fal fa-envelope"
              handleChange={(e) => {
                this.setState({
                  step2: { ...step2, email: e.target.value },
                });
              }}
              value={email}
            />
            <MySpan
              title="ADDRESS"
              iconClass="fal fa-map-marker-alt"
              handleChange={(e) => {
                this.setState({
                  step2: { ...step2, address: e.target.value },
                });
              }}
              value={address}
            />
            <MySpan
              title="CITY"
              iconClass="fal fa-globe-americas"
              handleChange={(e) => {
                this.setState({
                  step2: { ...step2, city: e.target.value },
                });
              }}
              value={city}
            />
            <MySpan
              title="PROVINCIA"
              iconClass="fal fa-building"
              handleChange={(e) => {
                this.setState({
                  step2: { ...step2, provincia: e.target.value },
                });
              }}
              value={provincia}
            />
            <MySpan
              title="CAP"
              iconClass="fal fa-mailbox"
              handleChange={(e) => {
                this.setState({
                  step2: { ...step2, cap: e.target.value },
                });
              }}
              value={cap}
            />
            <MySpan
              title="COUNTRY"
              iconClass="fal fa-globe-americas"
              handleChange={(e) => {
                this.setState({
                  step2: { ...step2, country: e.target.value },
                });
              }}
              value={country}
            />
            <MySpan
              title="PHONE"
              iconClass="fal fa-mobile"
              handleChange={(e) => {
                this.setState({
                  step2: { ...step2, phone: e.target.value },
                });
              }}
              value={phone}
            />
            <MySpan
              title="PERSONAL NUMBER"
              iconClass="fal fa-id-card "
              handleChange={(e) => {
                this.setState({
                  step2: { ...step2, personal_number: e.target.value },
                });
              }}
              value={personal_number}
            />
          </div>
          <div className="AdminLogin--Step1--Left">
            <MySpan
              title="COMUNE NASCITA"
              iconClass="fal fa-home"
              handleChange={(e) => {
                this.setState({
                  step2: { ...step2, comune_nascita: e.target.value },
                });
              }}
              value={comune_nascita}
            />
            <MySpan
              title="STATO NASCITA"
              iconClass="fal fa-globe"
              handleChange={(e) => {
                this.setState({
                  step2: { ...step2, stato_nascita: e.target.value },
                });
              }}
              value={stato_nascita}
            />
            <span>
              <DatePicker
                onChange={(data_di_nascita) => {
                  data_di_nascita && data_di_nascita.isValid()
                    ? this.setState({
                        step2: {
                          ...step2,
                          data_di_nascita: data_di_nascita.format("DD/MM/YYYY"),
                        },
                      })
                    : this.setState({
                        step2: {
                          ...step2,
                          data_di_nascita: null,
                        },
                      });
                }}
                value={
                  data_di_nascita ? moment(data_di_nascita, "DD/MM/YYYY") : null
                }
                format={("DD/MM/YYYY", "DD/MM/YYYY")}
              />
            </span>

            <MySpan
              title="PASSWORD"
              iconClass="fal fa-key"
              handleChange={(e) => {
                this.setState({
                  step2: { ...step2, password: e.target.value },
                });
              }}
              value={password}
            />
            <MySpan
              title="CONFERMA PASSWORD"
              iconClass="fab fa-key"
              handleChange={(e) => {
                this.setState({
                  step2: { ...step2, conferma_password: e.target.value },
                });
              }}
              value={conferma_password}
            />
            <MySpan
              title="RAGIONE SOCIALE"
              iconClass="fal fa-briefcase"
              handleChange={(e) => {
                this.setState({
                  step2: { ...step2, ragione_sociale: e.target.value },
                });
              }}
              value={ragione_sociale}
            />
            <MySpan
              title="P.IVA"
              iconClass="fab fa-receipt"
              handleChange={(e) => {
                this.setState({
                  step2: { ...step2, p_iva: e.target.value },
                });
              }}
              value={p_iva}
            />
            <MySpan
              title="CODICE FISCALE "
              iconClass="fab fa-id-card"
              handleChange={(e) => {
                this.setState({
                  step2: { ...step2, codice_fiscale: e.target.value },
                });
              }}
              value={codice_fiscale}
            />
            <button
              onClick={() => {
                let ifempty = false;
                Object.keys(step2).forEach((key) => {
                  if (!step2[key] || step2[key] === "") {
                    ifempty = true;
                  }
                });
                if (ifempty) {
                  notification["error"]({
                    message: "Ops...",
                    description:
                      "Non puoi continuare al  ,completi tutti i dati prima",
                    duration: "5",
                  });
                } else {
                  addEditSkinDetails({
                    step1: {
                      ...(addEditSkin?.step1 ? addEditSkin.step1 : {}),
                    },
                    step2: {
                      ...this.state.step2,
                    },
                    skinId: addEditSkin?.skinId,
                    skinName: addEditSkin?.skinName,
                    skinPannel: true,
                    stepNumber: addEditSkin?.stepNumber + 1,
                  });
                }
              }}
            >
              CREATE ADMIN
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapsStateToProps = (state) => ({
  addEditSkin: state.auth.addEditSkin,
});
export default connect(mapsStateToProps, AuthActions)(Step1);
