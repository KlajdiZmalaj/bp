import React from "react";
import { Select, DatePicker } from "antd";
import { isString } from "lodash";

import moment from "moment";
import { ItemFull } from "./AdminComp";
const { Option } = Select;

class AgentComp extends React.Component {
  render() {
    const { userDetail, state, handleChange } = this.props;
    return (
      <div className="newReg--row">
        <div className="newReg--row__col">
          <ItemFull
            Class={"full"}
            readOnly={true}
            handleChange={null}
            changeValue={null}
            title={"Ragione Sociale"}
            value={userDetail.ragione_sociale || ""}
          />

          <ItemFull
            Class="full"
            readOnly={true}
            handleChange={handleChange}
            changeValue={"address"}
            title={"Address"}
            value={state.address || userDetail.address}
          />
          <ItemFull
            Class="semi"
            readOnly={true}
            handleChange={handleChange}
            changeValue={"birth_comune_code"}
            title={"Codice comune di nascita"}
            value={state.birth_comune_code || userDetail.birth_comune_code}
          />
          <ItemFull
            Class="semi"
            readOnly={true}
            handleChange={handleChange}
            changeValue={"first_name"}
            title={"First Name"}
            value={state.first_name || userDetail.first_name}
          />
          <ItemFull
            Class="semi"
            readOnly={true}
            handleChange={handleChange}
            changeValue={"birth_country"}
            title={"Nazione di residenza: *"}
            value={state.birth_country || userDetail.birth_country}
          />
          <ItemFull
            Class="semi"
            readOnly={true}
            handleChange={handleChange}
            changeValue={"birth_place"}
            title={"Provincia di residenza: *"}
            value={state.birth_place || userDetail.birth_place}
          />
          <ItemFull
            Class="semi"
            readOnly={true}
            handleChange={handleChange}
            changeValue={"birthday"}
            title={"Compleanno"}
            value={state.birthday || userDetail.birthday}
          />
          <ItemFull
            Class="semi"
            readOnly={true}
            handleChange={handleChange}
            changeValue={"changedcap"}
            title={"Cap"}
            value={state.cap || userDetail.cap}
          />
          <ItemFull
            Class="semi"
            changeValue={"city"}
            readOnly={true}
            handleChange={handleChange}
            title={"Citta"}
            value={state.city || userDetail.city}
          />

          <ItemFull
            Class="semi"
            readOnly={true}
            handleChange={handleChange}
            changeValue={"country"}
            title={"Nazione"}
            value={state.country || userDetail.country}
          />
          <ItemFull
            Class="full"
            changeValue={"p_iva"}
            readOnly={true}
            handleChange={handleChange}
            title={"P.Iva: *"}
            value={state.p_iva || userDetail.p_iva}
          />

          <ItemFull
            Class="semi"
            readOnly={true}
            handleChange={handleChange}
            changeValue={"last_name"}
            title={"Last Name"}
            value={state.last_name || userDetail.last_name}
          />
          <ItemFull
            Class="semi"
            readOnly={true}
            handleChange={handleChange}
            changeValue={"gender"}
            title={"Gender"}
            value={state.gender || userDetail.gender}
          />
          <ItemFull
            Class="full"
            readOnly={true}
            handleChange={handleChange}
            changeValue={"email"}
            title={"Email"}
            value={state.email || userDetail.email}
          />
        </div>
        <div className="newReg--row__col">
          <ItemFull
            Class="full"
            readOnly={true}
            handleChange={null}
            changeValue={"null"}
            title={"Soprannome"}
            value={userDetail.username}
          />

          <ItemFull
            Class="semi"
            readOnly={true}
            handleChange={handleChange}
            changeValue={"luogo_di_rilascio"}
            title={"Luogo Di Rilascio"}
            value={state.luogo_di_rilascio || userDetail.luogo_di_rilascio}
          />
          <ItemFull
            Class="semi"
            readOnly={true}
            handleChange={handleChange}
            changeValue={"wallet"}
            title={"Wallet"}
            value={state.wallet || userDetail.wallet}
          />
          <ItemFull
            Class="full"
            readOnly={true}
            handleChange={handleChange}
            changeValue={"personal_number"}
            title={"Personal Number"}
            value={state.personal_number || userDetail.personal_number}
          />
          <ItemFull
            Class="full"
            readOnly={true}
            handleChange={handleChange}
            changeValue={"ragione_sociale"}
            title={"Ragionale Sociale"}
            value={state.ragione_sociale || userDetail.ragione_sociale}
          />

          <ItemFull
            Class="full"
            readOnly={true}
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
            readOnly={true}
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
            readOnly={true}
            handleChange={handleChange}
            changeValue={"luogo_di_rilascio"}
            title={"Luogo di rilascio"}
            value={state.luogo_di_rilascio || userDetail.luogo_di_rilascio}
          />
          <div className="itemCol semi">
            <div className="inputLabel">Data di rilascio:</div>
            <DatePicker
              disabled
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
              disabled
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
export default AgentComp;
