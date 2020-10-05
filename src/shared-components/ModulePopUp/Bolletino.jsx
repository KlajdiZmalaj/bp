import React from "react";
import { connect } from "react-redux";
import { AuthActions, MainActions } from "redux-store/models";
import { Form, Input, message, Checkbox, Row } from "antd";
import Condizioni from "./Condizioni";
import images from "themes/images";
import { Select, Radio } from "antd";
import { get } from "lodash";
const { Option } = Select;
const ReturnFormItem = ({
  name,
  message,
  barcodeData,
  descName,
  getFieldDecorator,
  icon,
  NotInput,
  placeholder,
}) => (
  <div className="InputItem">
    <span>
      {descName} <span className="Red">*</span>
    </span>
    <Form.Item>
      {getFieldDecorator(`${name}`, {
        rules: [
          {
            required: message ? true : false,
            message: message ? `${message}` : "",
            whitespace: true,
          },
        ],
        initialValue: get(barcodeData, `data.${name}` || ""),
      })(
        NotInput ? (
          NotInput
        ) : (
          <Input placeholder={placeholder ? placeholder : name} />
        )
      )}
    </Form.Item>
    {icon && icon}
  </div>
);
class Bolletino extends React.Component {
  state = {
    confirmDirty: false,
    barcodeInput: false,
    BinpVal: "",
    codInd: "",
    data: {},
    condizioniAgreement: true,
    condizioniShow: true,
  };
  setbarcodeInp = (e) => {
    this.setState({ barcodeInput: e });
    document.getElementById("barcodeInp").focus();
  };
  callback = (data) => {
    this.setState({ data });
    // console.log("callback", data);
    message.success(data.message);
    setTimeout(() => {
      // console.log("timeout called");

      this.props.form.setFieldsValue({
        codice_identificativo: data.data.codice_identificativo,
        importo: data.data.importo,
        numero_conto_corrente: data.data.numero_conto_corrente,
        tipologia: data.data.tipologia,
      });
    }, 10);
  };

  clearFields = () => {
    this.props.form.setFieldsValue({
      numero_conto_corrente: "",
      importo: "",
      codice_identificativo: "",
      intestato_a: "",
      eseguito_da: "",
      causale: "",
      via_piazza: "",
      cap: "",
      citta: "",
      provincia: "",
      tipologia: "",
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.props.service_id === "BOL001") {
          this.props.getBolletiniBianchi(
            this.props.service_id,
            values.numero_conto_corrente.toString(),
            values.importo,
            values.intestato_a,
            values.causale,
            values.eseguito_da,
            values.via_piazza,
            values.cap,
            values.citta,
            values.provincia,
            this.clearFields
          );
        }
        if (this.props.service_id === "BOL002") {
          this.props.getBolletiniPremercati(
            this.props.service_id,
            values.numero_conto_corrente.toString(),
            values.importo,
            values.codice_identificativo.toString(),
            parseInt(values.tipologia),
            values.eseguito_da,
            values.via_piazza,
            values.cap,
            values.citta,
            values.provincia,
            this.clearFields
          );
        }
      }
    });
  };

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  hideAlert = () => {
    this.props.setBolletiniBianchi({});
    this.props.setBolletiniPremercati({});
  };
  componentDidMount() {}
  render() {
    const { getFieldDecorator } = this.props.form;
    const { barcodeData } = this.props;
    const { barcodeInput, condizioniShow } = this.state;

    return (
      <div className="Bolletini">
        <div className="Bolletini-Header">
          <span>BOLLETINI</span>
          <span>
            <img src={images["BOLO_AUTO"]} />
          </span>
        </div>
        <div className="Bolletini-Form">
          <Form>
            <div className={"inpPopUp" + (barcodeInput ? " active" : "")}>
              <input
                onBlur={(e) => {
                  let bartcode = e.target.value;

                  const counter1 = bartcode.substring(0, 2); //2shifror
                  const codiceIdf = bartcode.substring(
                    2,
                    2 + parseInt(counter1)
                  );
                  const counter2 = bartcode.substring(20, 22); //2shifror
                  const sulCC = bartcode.substring(22, 22 + parseInt(counter2));

                  const counter3 = bartcode.substring(34, 36); //2shifror
                  const shuma = bartcode.substring(36, 36 + parseInt(counter3));

                  const counter4 = bartcode.substring(46, 47); //1shifror
                  const tipologia = bartcode.substring(
                    47,
                    47 + parseInt(counter4)
                  );
                  this.props.form.setFieldsValue({
                    codice_identificativo: codiceIdf,
                    importo: (parseFloat(shuma.toString()) / 100)
                      .toString()
                      .replace(".", ","),
                    numero_conto_corrente: sulCC,
                    tipologia: tipologia,
                  });
                }}
                type="text"
                id="barcodeInp"
                placeholder="barcode"
              />
            </div>
            <div className="Left">
              <ReturnFormItem
                descName="Scansiona Qui Il Codice A Barre "
                name="scansiona"
                message="Please input your importo!"
                barcodeData={barcodeData}
                getFieldDecorator={getFieldDecorator}
                placeholder="(per bollettini di tipo 896)"
                icon={<i className="fal fa-question-circle" />}
              />
              <ReturnFormItem
                descName="Tipo Veicolo"
                name="tipo_veicolo"
                message="Please input your tipo veicolo!"
                barcodeData={barcodeData}
                getFieldDecorator={getFieldDecorator}
                NotInput={
                  <Select defaultValue="Tipo bollettino">
                    <Select.Option value="Tipo bollettino">
                      Tipo bollettino
                    </Select.Option>
                  </Select>
                }
              />
              <ReturnFormItem
                descName="Numero Conto Corrente"
                name="numero_conto_corrente"
                message="Please input your Numero Conto!"
                barcodeData={barcodeData}
                getFieldDecorator={getFieldDecorator}
                icon={<i className="fal fa-search" />}
              />
              <ReturnFormItem
                descName="Text"
                name="text"
                message="Please input your text!"
                placeholder="00,00"
                barcodeData={barcodeData}
                getFieldDecorator={getFieldDecorator}
              />
              <ReturnFormItem
                descName="Causale"
                name="casuale"
                message="Please input your casuale!"
                barcodeData={barcodeData}
                getFieldDecorator={getFieldDecorator}
              />
              <ReturnFormItem
                descName="Codice Bollettino"
                name="codice_bolletino"
                placeholder="Codice bollettino (per tipi 674 e 896)"
                message="Please input your Codice Bolletino!"
                barcodeData={barcodeData}
                getFieldDecorator={getFieldDecorator}
              />
              <ReturnFormItem
                descName="Persona"
                name="persona"
                message="Please input your persona tipo!"
                barcodeData={barcodeData}
                getFieldDecorator={getFieldDecorator}
                NotInput={
                  <Radio.Group>
                    <Radio value="1">Fisica</Radio>
                    <Radio value="2">Giuridica</Radio>
                  </Radio.Group>
                }
              />
              <ReturnFormItem
                descName="Nome "
                name="nome"
                message="Please input your Nome!"
                barcodeData={barcodeData}
                getFieldDecorator={getFieldDecorator}
              />
              <ReturnFormItem
                descName="Cognome "
                name="cognome"
                message="Please input your Cognome!"
                barcodeData={barcodeData}
                getFieldDecorator={getFieldDecorator}
              />
              <ReturnFormItem
                descName="Codice Fiscale "
                name="codice_fiscale"
                message="Please input your Codice Fiscale!"
                barcodeData={barcodeData}
                getFieldDecorator={getFieldDecorator}
                icon={<i className="fal fa-question-circle" />}
              />
            </div>
            <div className="Left">
              <ReturnFormItem
                descName="Indirizzo"
                name="indirizzo"
                message="Please input your indirizzo!"
                barcodeData={barcodeData}
                getFieldDecorator={getFieldDecorator}
              />
              <ReturnFormItem
                descName="Città"
                name="citta"
                message="Please input your citta!"
                barcodeData={barcodeData}
                getFieldDecorator={getFieldDecorator}
              />
              <ReturnFormItem
                descName="Email"
                name="email"
                message="Please input your importo!"
                barcodeData={barcodeData}
                getFieldDecorator={getFieldDecorator}
              />
              <ReturnFormItem
                descName="Telefono"
                name="telefono"
                message="Please input your importo!"
                barcodeData={barcodeData}
                getFieldDecorator={getFieldDecorator}
              />
              <div className="Condizioni">
                <div
                  className="Condizioni control"
                  onClick={() => {
                    this.setState((state) => ({
                      condizioniShow: !state.condizioniShow,
                    }));
                  }}
                >
                  <span>Condizioni d' uso</span>
                  <span>
                    <i
                      className={`fal fa-chevron-${
                        condizioniShow ? "up" : "down"
                      }`}
                    ></i>
                  </span>
                </div>
                {condizioniShow && <Condizioni></Condizioni>}
                <Checkbox
                  onChange={(e) => {
                    this.setState({
                      condizioniAgreement: e.target.value,
                    });
                  }}
                >
                  La persona che hai di fronte non è il intestatario del
                  pagamento del bollo
                </Checkbox>
              </div>
              <div className="Actions">
                <div
                  className="Actions--Item"
                  onClick={(e) => {
                    if (this.props.accountInfo?.token) {
                      this.handleSubmit(e);
                    } else {
                      window.location.hash = "login";
                      this.props.togglePopUp(false);
                    }
                  }}
                  htmltype="submit"
                >
                  <h3>esegui</h3>
                  <img src={images.checkSymbol} alt="" />
                </div>
                <div
                  className="Actions--Item"
                  onClick={() => {
                    if (barcodeInput) {
                      this.setbarcodeInp(false);
                    } else {
                      this.setbarcodeInp(true);
                    }
                  }}
                >
                  <h3>barcode</h3>
                  <p>
                    pagemento <br /> differito
                  </p>
                </div>
                <div className="Actions--Item">
                  <h3>stampa</h3>
                  <p>
                    pre <br /> scontrino
                  </p>
                </div>
                <div
                  className="Actions--Item"
                  onClick={() => this.props.togglePopUp(false)}
                >
                  <h3>anulla</h3>
                  <img src={images.close} alt="" />
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

const CenterAccountMenuu = Form.create({ name: "bolletino" })(Bolletino);

const mapsStateToProps = (state) => ({
  bolletiniBianchi: state.auth.bolletiniBianchi,
  barcodeData: state.auth.barcodeData,
  bolletiniPremercati: state.auth.bolletiniPremercati,
  accountInfo: state.auth.accountInfo,
});

export default connect(mapsStateToProps, { ...AuthActions, ...MainActions })(
  CenterAccountMenuu
);
