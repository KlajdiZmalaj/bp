import React from "react";
import { AuthActions } from "redux-store/models";
import { connect } from "react-redux";
import { notification } from "antd";
import { addLogo } from "services/auth";
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
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base64: "",
      step1: {
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
        color_skin: "",
        youtube: "",
      },
    };
  }
  async componentDidUpdate(prevProps) {
    const {
      addEditSkinDetails,
      addEditSkin,
      newSkinId,
      AddExtraData,
    } = this.props;
    const { base64, step1 } = this.state;
    const {
      nome_skin,
      upload_logo,
      color_skin,
      email,
      indirizzo,
      telefono,
      nome_banca,
      iban,
      home,
      chi_siamo,
      contatti,
      servizi,
      affiliazioni,
      instagram,
      facebook,
      pinterest,
      youtube,
    } = step1;
    if (prevProps.newSkinId != newSkinId) {
      try {
        if (newSkinId === -1) {
          await notification["error"]({
            message: "Ops...",
            description:
              "I tuoi dati per la creazione della skin sono sbagliati",
            duration: "5",
          });
        } else {
          let ifempty = false;
          await Object.keys(this.state.step1).forEach((key) => {
            if (!this.state.step1[key] || this.state.step1[key] === "") {
              ifempty = true;
            }
          });
          if (ifempty) {
            await notification["error"]({
              message: "Ops...",
              description:
                "Non puoi continuare al secondo step ,completi tutti i dati prima",
              duration: "5",
            });
          } else {
            await AddExtraData(
              telefono,
              email,
              indirizzo,
              chi_siamo,
              servizi,
              home,
              contatti,
              affiliazioni,
              instagram,
              pinterest,
              youtube,
              facebook,
              nome_banca,
              nome_skin,
              iban,
              color_skin,
              newSkinId
            );
          }
          if (upload_logo?.includes(".png")) {
            await addLogo(base64, newSkinId);
            if (
              this.props.registerSkin?.addExtraDataSucc &&
              this.props.registerSkin?.addSkinSucc
            ) {
              await addEditSkinDetails({
                step1: {
                  ...this.state.step1,
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
          } else {
            await notification["error"]({
              message: "Ops...",
              description: "Il formato dell'immagine dovrebbe essere png",
              duration: "5",
            });
          }
        }
        if (
          this.props.registerSkin?.addExtraDataSucc &&
          this.props.registerSkin?.addSkinSucc
        ) {
          await notification["success"]({
            message: "Molto Bene",
            description: "la pelle viene creata con successo",
            duration: "5",
          });
        }
      } catch (error) {
        notification["error"]({
          message: "Ops..",
          description: "Something wrong happened please contact administrator",
          duration: "5",
        });
      }
    }
  }

  componentDidMount() {
    if (
      !JSON.stringify(this.state.step1) !=
      JSON.stringify(this.props.addEditSkin?.step1)
    ) {
      this.setState({
        step1: { ...this.props.addEditSkin?.step1 },
      });
    }
  }
  render() {
    const {
      addEditSkinDetails,
      addEditSkin,
      newSkinId,
      AddExtraData,
    } = this.props;
    const { step1, base64 } = this.state;
    const {
      nome_skin,
      link_servizi,
      color_skin,
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
    } = step1;
    return (
      <div className="AdminLogin--Step1">
        <i
          class="fal fa-long-arrow-left"
          onClick={() => {
            addEditSkinDetails({
              step1: {
                ...this.state.step1,
                upload_logo: "",
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
                this.setState({
                  step1: { ...step1, nome_skin: e.target.value },
                });
              }}
              value={nome_skin}
            />
            <MySpan
              title="LINK SERVIZI"
              iconClass="fal fa-globe"
              handleChange={(e) => {
                this.setState({
                  step1: { ...step1, link_servizi: e.target.value },
                });
              }}
              value={link_servizi}
            />
            <span>
              <input
                type="file"
                id="myfile"
                onChange={async (e) => {
                  this.setState({
                    step1: {
                      ...step1,
                      upload_logo: e.target?.files[0]?.name
                        ? e.target.files[0].name
                        : "",
                    },
                  });

                  const file = document.querySelector("#myfile").files[0];
                  const Base64 = await toBase64(file);
                  this.setState({ base64: Base64 });
                }}
              />
              <i className="fal fa-cloud-upload" />
              <label>
                {!upload_logo || upload_logo === ""
                  ? "Select Logo"
                  : upload_logo}
              </label>
            </span>
            <MySpan
              title="EMAIL"
              iconClass="fal fa-envelope"
              handleChange={(e) => {
                this.setState({
                  step1: { ...step1, email: e.target.value },
                });
              }}
              value={email}
            />
            <MySpan
              title="NOREPLY EMAIL"
              iconClass="fal fa-envelope"
              handleChange={(e) => {
                this.setState({
                  step1: { ...step1, noreply_email: e.target.value },
                });
              }}
              value={noreply_email}
            />
            <MySpan
              title="INDIRIZZO"
              iconClass="fal fa-map-marker-alt"
              handleChange={(e) => {
                this.setState({
                  step1: { ...step1, indirizzo: e.target.value },
                });
              }}
              value={indirizzo}
            />
            <MySpan
              title="TELEFONO"
              iconClass="fal fa-mobile"
              handleChange={(e) => {
                this.setState({
                  step1: { ...step1, telefono: e.target.value },
                });
              }}
              value={telefono}
            />
            <MySpan
              title="Canone Mensile Agenzie"
              iconClass="fal fa-euro-sign"
              handleChange={(e) => {
                this.setState({
                  step1: { ...step1, canone_mensile_agenzie: e.target.value },
                });
              }}
              value={canone_mensile_agenzie}
            />
            <MySpan
              title="Color Dell Skin (Solo numeri in codice esadecimale es: ffffff)"
              iconClass="fal fa-euro-sign"
              handleChange={(e) => {
                this.setState({
                  step1: { ...step1, color_skin: e.target.value },
                });
              }}
              value={color_skin}
              component={<div className="colorSkin">#</div>}
            />
          </div>
          <div className="AdminLogin--Step1--Right--Payment">
            <h1>PAYMENT</h1>
            <MySpan
              title="NOME BANCA"
              iconClass="fal fa-university"
              handleChange={(e) => {
                this.setState({
                  step1: { ...step1, nome_banca: e.target.value },
                });
              }}
              value={nome_banca}
            />
            <MySpan
              title="SOCIETA BENEFICIARIA"
              iconClass="fal fa-university"
              handleChange={(e) => {
                this.setState({
                  step1: { ...step1, societa_beneficiare: e.target.value },
                });
              }}
              value={societa_beneficiare}
            />
            <MySpan
              title="IBAN"
              iconClass="fal fa-university"
              handleChange={(e) => {
                this.setState({
                  step1: { ...step1, iban: e.target.value },
                });
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
                this.setState({
                  step1: { ...step1, home: e.target.value },
                });
              }}
              value={home}
            />
            <MySpan
              title="CHI SIAMO"
              iconClass="fal fa-globe"
              handleChange={(e) => {
                this.setState({
                  step1: { ...step1, chi_siamo: e.target.value },
                });
              }}
              value={chi_siamo}
            />
            <MySpan
              title="CONTATTI"
              iconClass="fal fa-globe"
              handleChange={(e) => {
                this.setState({
                  step1: { ...step1, contatti: e.target.value },
                });
              }}
              value={contatti}
            />
            <MySpan
              title="SERVIZI"
              iconClass="fal fa-globe"
              handleChange={(e) => {
                this.setState({
                  step1: { ...step1, servizi: e.target.value },
                });
              }}
              value={servizi}
            />
            <MySpan
              title="AFFILIAZIONI"
              iconClass="fal fa-globe"
              handleChange={(e) => {
                this.setState({
                  step1: { ...step1, affiliazioni: e.target.value },
                });
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
                this.setState({
                  step1: { ...step1, facebook: e.target.value },
                });
              }}
              value={facebook}
            />
            <MySpan
              title="INSTAGRAM"
              iconClass="fab fa-instagram"
              handleChange={(e) => {
                this.setState({
                  step1: { ...step1, instagram: e.target.value },
                });
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
                this.setState({
                  step1: { ...step1, pinterest: e.target.value },
                });
              }}
              value={pinterest}
            />
            <MySpan
              title="YOUTUBE"
              iconClass="fab fa-youtube"
              handleChange={(e) => {
                this.setState({
                  step1: { ...step1, youtube: e.target.value },
                });
              }}
              value={youtube}
            />
            <button
              onClick={async (e) => {
                e.preventDefault();
                if (
                  link_servizi.includes("http") &&
                  link_servizi.includes("://")
                ) {
                  await this.props.AddSkinNew(
                    nome_skin,
                    link_servizi,
                    noreply_email,
                    canone_mensile_agenzie
                  );
                } else {
                  await notification["error"]({
                    message: "Ops...",
                    description: "Link Servizzi should be link type 'http://",
                    duration: "5",
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
  newSkinId: state.auth.newSkinId,
  registerSkin: state.auth.registerSkin,
});
export default connect(mapsStateToProps, AuthActions)(Step1);
