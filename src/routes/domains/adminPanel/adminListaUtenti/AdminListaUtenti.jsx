import React from "react";
import "./adminListaUtenti.css";
import AdminListaUtentiRow from "./AdminListaUtentiRow";
import { ListaUtenti } from "../StaticAdminData";
class AdminListaUtenti extends React.Component {
  render() {
    return (
      <div className="AdminListaUtenti">
        <div className="AdminListaUtenti--Header">
          <span>USER ID</span>
          <span>USERNAME</span>
          <span>RAG SOCIALE</span>
          <span>CREDITO</span>
          <span>CITY</span>
          <span>ULTIMO DEPOSIT</span>
          <span>ULTIMO LOGIN</span>
          <span>AZIONI</span>
        </div>
        <div className="AdminListaUtentiRow">
          {ListaUtenti &&
            Array.isArray(ListaUtenti) &&
            ListaUtenti.map((itemList) => {
              return (
                <AdminListaUtentiRow
                  itemList={itemList}
                  key={itemList.user_id}
                />
              );
            })}
        </div>
      </div>
    );
  }
}
export default AdminListaUtenti;
