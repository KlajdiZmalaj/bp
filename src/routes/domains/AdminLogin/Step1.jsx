import React from "react";
import { AuthActions } from "redux-store/models";
import { connect } from "react-redux";
import { notification } from "antd";
export const MySpan = ({
  title,
  iconClass,
  classNm,
  handleChange,
  value,
  component,
}) => (
  <span className={classNm ? classNm : ""}>
    <input
      placeholder={title}
      onChange={(e) => {
        handleChange(e);
      }}
      value={value}
    />
    {component ? component : <i className={iconClass} />}
  </span>
);
class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome_skin: "",
      link_servizi: "",
      upload_logo: "",
      email: "",
      noreply_email: "",
      indirizzo: "",
      telefono: "",
      canone_mensile_agenzie: "",
      nome_banca: "",
      societa_beneficiare: "",
      iban: "",
      home: "",
      chi_siamo: "",
      contatti: "",
      servizi: "",
      affiliazioni: "",
      facebook: "",
      instagram: "",
      pinterest: "",
      youtube: "",
    };
  }
  componentDidMount() {
    if (
      !JSON.stringify(this.state) !=
      JSON.stringify(this.props.addEditSkin?.step1)
    ) {
      this.setState({
        ...this.props.addEditSkin?.step1,
      });
    }
  }
  render() {
    const { addEditSkinDetails, addEditSkin } = this.props;
    const {
      nome_skin,
      link_servizi,
      upload_logo,
      email,
      noreply_email,
      indirizzo,
      telefono,
      canone_mensile_agenzie,
      nome_banca,
      societa_beneficiare,
      iban,
      home,
      chi_siamo,
      contatti,
      servizi,
      affiliazioni,
      facebook,
      instagram,
      pinterest,
      youtube,
    } = this.state;
    return (
      <div className="AdminLogin--Step1">
        <i
          class="fal fa-long-arrow-left"
          onClick={() => {
            addEditSkinDetails({
              step1: {
                ...this.state,
              },
              step2: {
                ...(addEditSkin?.step2 ? addEditSkin.step2 : {}),
              },
              skinId: addEditSkin?.skinId,
              skinName: addEditSkin?.skinName,
              skinPannel: true,
              stepNumber: addEditSkin?.stepNumber - 1,
            });
          }}
        ></i>

        <div className="AdminLogin--Step1--Right">
          <div className="AdminLogin--Step1--Right--Important">
            <h1>IMPORTANT</h1>
            <MySpan
              title="NOME SKIN"
              iconClass="fal fa-user"
              handleChange={(e) => {
                this.setState({ nome_skin: e.target.value });
              }}
              value={nome_skin}
            />
            <MySpan
              title="LINK SERVIZI"
              iconClass="fal fa-globe"
              handleChange={(e) => {
                this.setState({ link_servizi: e.target.value });
              }}
              value={link_servizi}
            />
            <span>
              <input
                type="file"
                onChange={(e) => {
                  this.setState({ upload_logo: e.target.files[0].name });
                }}
              />
              <i className="fal fa-cloud-upload" />
              <label>{upload_logo === "" ? "Select Logo" : upload_logo}</label>
            </span>
            <MySpan
              title="EMAIL"
              iconClass="fal fa-envelope"
              handleChange={(e) => {
                this.setState({ email: e.target.value });
              }}
              value={email}
            />
            <MySpan
              title="NOREPLY EMAIL"
              iconClass="fal fa-envelope"
              handleChange={(e) => {
                this.setState({ noreply_email: e.target.value });
              }}
              value={noreply_email}
            />
            <mySpan
              title="INDIRIZZO"
              iconClass="fal fa-map-marker-alt"
              handleChange={(e) => {
                this.setState({ indirizzo: e.target.value });
              }}
              value={indirizzo}
            />
            <MySpan
              title="TELEFONO"
              iconClass="fal fa-mobile"
              handleChange={(e) => {
                this.setState({ telefono: e.target.value });
              }}
              value={telefono}
            />
            <MySpan
              title="Canone Mensile Agenzie"
              iconClass="fal fa-euro-sign"
              handleChange={(e) => {
                this.setState({ canone_mensile_agenzie: e.target.value });
              }}
              value={canone_mensile_agenzie}
            />
          </div>
          <div className="AdminLogin--Step1--Right--Payment">
            <h1>PAYMENT</h1>
            <MySpan
              title="NOME BANCA"
              iconClass="fal fa-university"
              handleChange={(e) => {
                this.setState({ nome_banca: e.target.value });
              }}
              value={nome_banca}
            />
            <MySpan
              title="SOCIETA BENEFICIARIA"
              iconClass="fal fa-university"
              handleChange={(e) => {
                this.setState({ societa_beneficiare: e.target.value });
              }}
              value={societa_beneficiare}
            />
            <MySpan
              title="IBAN"
              iconClass="fal fa-university"
              handleChange={(e) => {
                this.setState({ iban: e.target.value });
              }}
              value={iban}
            />
          </div>
        </div>
        <div className="AdminLogin--Step1--Left">
          <div className="AdminLogin--Step1--Left--SkinUrl">
            <h1>SKIN URL</h1>
            <MySpan
              title="HOME"
              iconClass="fal fa-globe"
              handleChange={(e) => {
                this.setState({ home: e.target.value });
              }}
              value={home}
            />
            <MySpan
              title="CHI SIAMO"
              iconClass="fal fa-globe"
              handleChange={(e) => {
                this.setState({ chi_siamo: e.target.value });
              }}
              value={chi_siamo}
            />
            <MySpan
              title="CONTATTI"
              iconClass="fal fa-globe"
              handleChange={(e) => {
                this.setState({ contatti: e.target.value });
              }}
              value={contatti}
            />
            <MySpan
              title="SERVIZI"
              iconClass="fal fa-globe"
              handleChange={(e) => {
                this.setState({ servizi: e.target.value });
              }}
              value={servizi}
            />
            <MySpan
              title="AFFILIAZIONI"
              iconClass="fal fa-globe"
              handleChange={(e) => {
                this.setState({ affiliazioni: e.target.value });
              }}
              value={affiliazioni}
            />
          </div>
          <div className="AdminLogin--Step1--Left--SocialMedia">
            <h1>SOCIAL MEDIA</h1>
            <MySpan
              title="FACEBOOK"
              component={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="7.7"
                  height="15.4"
                  viewBox="0 0 7.7 15.4"
                >
                  <path
                    class="a"
                    d="M132.813,5.294V3.369a.963.963,0,0,1,.962-.962h.963V0h-1.925a2.887,2.887,0,0,0-2.887,2.887V5.294H128V7.7h1.925v7.7h2.887V7.7h1.925l.962-2.406Z"
                    transform="translate(-128)"
                  />
                </svg>
              }
              handleChange={(e) => {
                this.setState({ facebook: e.target.value });
              }}
              value={facebook}
            />
            <MySpan
              title="INSTAGRAM"
              iconClass="fab fa-instagram"
              handleChange={(e) => {
                this.setState({ instagram: e.target.value });
              }}
              value={instagram}
            />
            <MySpan
              title="PINTEREST"
              component={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11.704"
                  height="15.4"
                  viewBox="0 0 11.704 15.4"
                >
                  <path
                    class="a"
                    d="M1.832,8.368c.019-.048.212-.789.226-.839a5.175,5.175,0,0,1-.379-3.14c.277-1.767,2.149-2.635,3.916-2.635v0c2.213,0,3.869,1.233,3.871,3.353,0,1.66-1,3.854-2.706,3.854h0A2.435,2.435,0,0,1,5.176,8.41,1.213,1.213,0,0,1,5.008,7.3a14.684,14.684,0,0,0,.733-2.892A1.092,1.092,0,0,0,4.6,3.206,1.621,1.621,0,0,0,3.113,4.321a3,3,0,0,0,.018,2.186,14.207,14.207,0,0,1-.677,2.969C1.98,11.1,1.331,13.155,1.47,14.3L1.6,15.4l.673-.882A22.983,22.983,0,0,0,4.427,9.38a3.454,3.454,0,0,0,2.522,1.01A5.183,5.183,0,0,0,11.7,5.019C11.637,2.279,9.632,0,6.027,0V0C2.6,0,.6,1.833.109,4.145-.34,6.289.658,7.921,1.832,8.368Zm0,0"
                    transform="translate(0.001)"
                  />
                </svg>
              }
              handleChange={(e) => {
                this.setState({ pinterest: e.target.value });
              }}
              value={pinterest}
            />
            <MySpan
              title="YOUTUBE"
              iconClass="fab fa-youtube"
              handleChange={(e) => {
                this.setState({ youtube: e.target.value });
              }}
              value={youtube}
            />
            <button
              onClick={() => {
                let ifempty = false;
                if (
                  Object.keys(this.state).forEach((key) => {
                    if (!this.state[key] || this.state[key] === "") {
                      ifempty = true;
                    }
                  })
                )
                  if (ifempty) {
                    notification["error"]({
                      message: "Ops...",
                      description:
                        "Non puoi continuare al secondo step ,completi tutti i dati prima",
                      placement: "topCenter",
                      duration: "5",
                    });
                  } else {
                    addEditSkinDetails({
                      step1: {
                        ...this.state,
                      },
                      step2: {
                        ...(addEditSkin?.step2 ? addEditSkin.step2 : {}),
                      },
                      skinId: addEditSkin?.skinId,
                      skinName: addEditSkin?.skinName,
                      skinPannel: true,
                      stepNumber: addEditSkin?.stepNumber + 1,
                    });
                  }
              }}
            >
              Create Skin
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
