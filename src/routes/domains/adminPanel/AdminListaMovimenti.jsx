import React from "react";
import "./styles.css";
import AdminListaUtentiRow from "./AdminListaUtentiRow";
class AdminListaUtenti extends React.Component {
  render() {
    return (
      <div className="AdminListaUtenti">
        <div className="AdminListaUtenti--Header">
          <span>DATE / ORA</span>
          <span>USER</span>
          <span>RAG SOCIALE</span>

          <span>SERVICE</span>
          <span>Importo</span>
          <span>ULTIMO DEPOSIT</span>
          <span>ULTIMO LOGIN</span>
          <span>AZIONI</span>
        </div>
        <div className="AdminListaUtentiRow">
          {list.map((itemList) => {
            return <AdminListaUtentiRow itemList={itemList} />;
          })}
        </div>
      </div>
    );
  }
}
export default AdminListaUtenti;
