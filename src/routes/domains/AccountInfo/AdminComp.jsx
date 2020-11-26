import React from "react";
import { Select, DatePicker } from "antd";
import { docType } from "config";
import moment from "moment";

const { Option } = Select;
export const ItemFull = ({
  readOnly,
  value,
  title,
  handleChange,
  changeValue,
  Class,
}) => (
  <div className={`itemCol ${Class}`}>
    <div className="inputLabel">{title}</div>
    <input
      onChange={(e) =>
        changeValue ? handleChange(changeValue, e.target.value) : null
      }
      value={value || ""}
      className="ant-input"
      type="text"
      readOnly={readOnly}
    />
  </div>
);
class AdminComp extends React.Component {
  render() {
    const { userDetail, state, handleChange } = this.props;
    return (
      <div className="newReg--row">
        <div className="newReg--row__col admcomp">
          <ItemFull
            Class={"full"}
            readOnly={true}
            handleChange={handleChange}
            changeValue={"a_ragione_sociale"}
            title={"Ragione Sociale"}
            value={state.a_ragione_sociale || userDetail.ragione_sociale}
          />
          <ItemFull
            Class="semi"
            readOnly={false}
            handleChange={handleChange}
            changeValue={"changedInsegna"}
            title={"Insegna"}
            value={state.changedInsegna || userDetail.insegna}
          />
          <ItemFull
            Class="semi"
            readOnly={false}
            handleChange={handleChange}
            changeValue={"changedCordinate"}
            title={"Cordinate"}
            value={state.changedCordinate || userDetail.cordinate}
          />
          <ItemFull
            Class="full"
            readOnly={false}
            handleChange={handleChange}
            changeValue={"changeda_phone"}
            title={"Telefono Agenzia"}
            value={state.changeda_phone || userDetail.a_phone}
          />
          <ItemFull
            Class="full"
            readOnly={false}
            handleChange={handleChange}
            changeValue={"changedSede_operativa"}
            title={"Sede Operativa"}
            value={state.changedSede_operativa || userDetail.sede_operativa}
          />
          <ItemFull
            Class="semi"
            readOnly={false}
            handleChange={handleChange}
            changeValue={"changedcomune"}
            title={"Comune"}
            value={state.changedcomune || userDetail.comune}
          />
          <ItemFull
            Class="semi"
            readOnly={false}
            handleChange={handleChange}
            changeValue={"changedcap"}
            title={"Cap"}
            value={state.changedcap || userDetail.cap}
          />
          <ItemFull
            Class="semi"
            changeValue={"changedprovincia"}
            readOnly={false}
            handleChange={handleChange}
            title={"Provincia di residenza: *"}
            value={state.changedprovincia || userDetail.provincia}
          />

          <ItemFull
            Class="semi"
            readOnly={false}
            handleChange={handleChange}
            changeValue={"changednazione"}
            title={"Nazione di residenza: *"}
            value={state.changednazione || userDetail.nazione}
          />
          <ItemFull
            Class="semi"
            changeValue={"a_iva"}
            readOnly={false}
            handleChange={handleChange}
            title={"P.Iva: *"}
            value={state.a_iva || userDetail.p_iva}
          />
          <ItemFull
            Class="semi"
            readOnly={false}
            handleChange={handleChange}
            changeValue={"changedpagamento_mensile"}
            title={"Pagamento Mensile *"}
            value={
              state.changedpagamento_mensile || userDetail.pagamento_mensile
            }
          />
          <ItemFull
            Class="full"
            readOnly={false}
            handleChange={handleChange}
            changeValue={"email"}
            title={"Email *"}
            value={state.email || userDetail.email}
          />
        </div>
        <div className="newReg--row__col">
          <ItemFull
            Class="full"
            readOnly={false}
            handleChange={handleChange}
            changeValue={"username"}
            title={"Nickname"}
            value={userDetail.username}
          />
          <ItemFull
            Class="full"
            readOnly={false}
            handleChange={handleChange}
            changeValue={"password"}
            title={"Password"}
            value={state.password}
          />
          <ItemFull
            Class="full"
            readOnly={false}
            handleChange={handleChange}
            changeValue={"confirm_password"}
            title={"Conferma password"}
            value={state.confirm_password}
          />
          <ItemFull
            Class="full"
            readOnly={false}
            handleChange={handleChange}
            changeValue={"changedphone"}
            title={"Cellulare"}
            value={state.changedphone || userDetail.phone}
          />
          <div className="itemCol full">
            <div className="inputLabel">Tipo Documento</div>
            <Select
              onChange={(changeddocument_type) => {
                handleChange("changeddocument_type", changeddocument_type);
              }}
              defaultValue={
                (state.changeddocument_type &&
                  state.changeddocument_type.toString()) ||
                (userDetail.document_type &&
                  userDetail.document_type.toString())
              }
            >
              {docType.map((doc) => {
                return (
                  <Option key={doc.id} value={doc.id}>
                    {doc.name}
                  </Option>
                );
              })}
            </Select>
          </div>
          <ItemFull
            Class="full"
            readOnly={false}
            handleChange={handleChange}
            changeValue={"changeddocument_number"}
            title={"Numero Documento"}
            value={state.changeddocument_number || userDetail.document_number}
          />
          <div className="itemCol semi">
            <div className="inputLabel">Rilasciato da:</div>

            <Select
              onChange={(rilasciato_da) => {
                handleChange("rilasciato_da", rilasciato_da);
              }}
              defaultValue={
                (state.rilasciato_da && state.rilasciato_da.toString()) ||
                (userDetail.rilasciato_da &&
                  userDetail.rilasciato_da.toString())
              }
            >
              <Option value="1">Comune</Option>
              <Option value="10">Motorizzazione</Option>
              <Option value="13">Questura</Option>
              <Option value="14">Polizia</Option>
              <Option value="16">Commissariato</Option>
              <Option value="19">Altro</Option>
            </Select>
          </div>
          <ItemFull
            Class="semi"
            readOnly={false}
            handleChange={handleChange}
            changeValue={"luogo_di_rilascio"}
            title={"Luogo di rilascio"}
            value={state.luogo_di_rilascio || userDetail.luogo_di_rilascio}
          />
          <div className="itemCol semi">
            <div className="inputLabel">Data di rilascio:</div>
            <DatePicker
              onChange={(data_di_rilascio) => {
                handleChange("data_di_rilascio", data_di_rilascio);
              }}
              defaultValue={
                moment(state.data_di_rilascio) ||
                moment(userDetail.data_di_rilascio)
              }
              format={("DD/MM/YYYY", "DD/MM/YYYY")}
            />
          </div>
          <div className="itemCol semi">
            <div className="inputLabel">Data di scadenza:</div>
            <DatePicker
              onChange={(data_di_scadenza) => {
                handleChange("data_di_scadenza", data_di_scadenza);
              }}
              defaultValue={
                moment(state.data_di_scadenza) ||
                moment(userDetail.data_di_scadenza)
              }
              format={("DD/MM/YYYY", "DD/MM/YYYY")}
            />
          </div>
          <div className="itemCol full"></div>
        </div>
      </div>
    );
  }
}
export default AdminComp;
