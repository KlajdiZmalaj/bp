import React from "react";
import { Select, DatePicker } from "antd";

import moment from "moment";
import { ItemFull } from "./AdminComp";
const { Option } = Select;

class AgentComp extends React.Component {
  render() {
    const {
      userDetail,
      state,
      handleChange,
      accountInfo,
      updateUser,
    } = this.props;
    const isMainAdm =
      accountInfo?.profile?.role?.name === "main_admin" || false;
    // console.log("state", state, userDetail);
    return (
      <React.Fragment>
        <div className="newReg--row">
          <div className="newReg--row__col agentcomp">
            <ItemFull
              Class={"full"}
              readOnly={!isMainAdm}
              handleChange={handleChange}
              changeValue={"ragione_sociale"}
              title={"Ragione Sociale"}
              value={state.ragione_sociale || userDetail.ragione_sociale}
            />

            <ItemFull
              Class="full"
              readOnly={!isMainAdm}
              handleChange={handleChange}
              changeValue={"changedSede_operativa"}
              title={"Address"}
              value={state.changedSede_operativa || userDetail.a_address}
            />
            <ItemFull
              Class="full"
              readOnly={!isMainAdm}
              handleChange={handleChange}
              changeValue={"birth_comune_code"}
              title={"Codice comune di nascita"}
              value={state.birth_comune_code || userDetail.birth_comune_code}
            />
            <ItemFull
              Class="semi"
              readOnly={!isMainAdm}
              handleChange={handleChange}
              changeValue={"first_name"}
              title={"First Name"}
              value={state.first_name || userDetail.first_name}
            />
            <ItemFull
              Class="semi"
              readOnly={!isMainAdm}
              handleChange={handleChange}
              changeValue={"last_name"}
              title={"Last Name"}
              value={state.last_name || userDetail.last_name}
            />
            <ItemFull
              Class="semi"
              readOnly={!isMainAdm}
              handleChange={handleChange}
              changeValue={"birth_country"}
              title={"Nazione"}
              value={state.birth_country || userDetail.birth_country}
            />
            <ItemFull
              Class="semi"
              readOnly={!isMainAdm}
              handleChange={handleChange}
              changeValue={"birth_place"}
              title={"Provincia di residenza: *"}
              value={state.birth_place || userDetail.birth_place}
            />
            <ItemFull
              Class="semi"
              readOnly={!isMainAdm}
              handleChange={handleChange}
              changeValue={"birthday"}
              title={"Compleanno"}
              value={state.birthday || userDetail.birthday}
            />
            <ItemFull
              Class="semi"
              readOnly={!isMainAdm}
              handleChange={handleChange}
              changeValue={"changedcap"}
              title={"Cap"}
              value={state.changedcap || userDetail.cap}
            />
            <ItemFull
              Class="semi"
              changeValue={"changedcomune"}
              readOnly={!isMainAdm}
              handleChange={handleChange}
              title={"Citta"}
              value={state.changedcomune || userDetail.a_city}
            />

            <ItemFull
              Class="semi"
              readOnly={!isMainAdm}
              handleChange={handleChange}
              changeValue={"country"}
              title={"Nazione di residenza: *"}
              value={state.country || userDetail.country}
            />
            <ItemFull
              Class="full"
              changeValue={"p_iva"}
              readOnly={!isMainAdm}
              handleChange={handleChange}
              title={"P.Iva: *"}
              value={state.p_iva || userDetail.p_iva}
            />

            <ItemFull
              Class="full"
              readOnly={!isMainAdm}
              handleChange={handleChange}
              changeValue={"gender"}
              title={"Gender"}
              value={state.gender || userDetail.gender}
            />
            <ItemFull
              Class="full"
              readOnly={!isMainAdm}
              handleChange={handleChange}
              changeValue={"email"}
              title={"Email"}
              value={state.email || userDetail.email}
            />
          </div>
          <div className="newReg--row__col">
            <ItemFull
              Class="full"
              readOnly={!isMainAdm}
              handleChange={handleChange}
              changeValue={"username"}
              title={"Soprannome"}
              value={state.username || userDetail.username}
            />

            <ItemFull
              Class="full"
              readOnly={!isMainAdm}
              handleChange={handleChange}
              changeValue={"personal_number"}
              title={"Personal Number"}
              value={state.personal_number || userDetail.personal_number}
            />

            <ItemFull
              Class="full"
              readOnly={!isMainAdm}
              handleChange={handleChange}
              changeValue={"changedphone"}
              title={"Cellulare"}
              value={state.changedphone || userDetail.phone}
            />
            <div className="itemCol full">
              <div className="inputLabel">Tipo Documento</div>
              <Select
                disabled
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
                <Option value="1">Carta di identita</Option>
                <Option value="2">Patenta di guida</Option>
                <Option value="3">Passaporto</Option>
              </Select>
            </div>
            <ItemFull
              Class="full"
              readOnly={!isMainAdm}
              handleChange={handleChange}
              changeValue={"changeddocument_number"}
              title={"Numero Documento"}
              value={state.changeddocument_number || userDetail.document_number}
            />
            <div className="itemCol semi">
              <div className="inputLabel">Rilasciato da:</div>

              <Select
                disabled
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
              readOnly={!isMainAdm}
              handleChange={handleChange}
              changeValue={"luogo_di_rilascio"}
              title={"Luogo di rilascio"}
              value={state.luogo_di_rilascio || userDetail.luogo_di_rilascio}
            />
            <div className="itemCol semi">
              <div className="inputLabel">Data di rilascio:</div>
              <DatePicker
                disabled={!isMainAdm}
                onChange={(data_di_rilascio) => {
                  handleChange("data_di_rilascio", moment(data_di_rilascio));
                }}
                defaultValue={
                  moment(state.data_di_rilascio) ||
                  moment(userDetail.data_di_rilascio) ||
                  moment().format("L")
                }
                format={("DD/MM/YYYY", "DD/MM/YYYY")}
              />
            </div>
            <div className="itemCol semi">
              <div className="inputLabel">Data di scadenza:</div>
              <DatePicker
                disabled={!isMainAdm}
                onChange={(data_di_scadenza) => {
                  handleChange("data_di_scadenza", moment(data_di_scadenza));
                }}
                defaultValue={
                  moment(state.data_di_scadenza) ||
                  moment(userDetail.data_di_scadenza) ||
                  moment().format("L")
                }
                format={("DD/MM/YYYY", "DD/MM/YYYY")}
              />
            </div>
            <div className="itemCol full"></div>
          </div>
        </div>
        {isMainAdm && (
          <div className="newReg--row lastRow">
            <div className="newReg--row__col submitcol ml-auto">
              <button
                onClick={() => {
                  updateUser();
                }}
                className="SubmitButton"
              >
                Salva
              </button>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default AgentComp;
