import React from "react";
import { Overview, Header } from "shared-components";
import Amministrazione from "shared-components/Amministrazione/Amministrazione.jsx";

class AdminAccount extends React.Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Overview></Overview>
        <div className="container-fluid overview ">
          <Amministrazione active="admin-account"></Amministrazione>
          <div className="panels-container">
            <div className="sort-annunci sort-trasazioni max-width border-0">
              <h1 className="heading-tab ">Gestione Account</h1>
              <div className="datepics ml-auto mr-2">
                <div className="dal">
                  <label htmlFor="dpic1">
                    <img src="img/calendar (1).svg" alt="" />
                  </label>
                  <input type="text" id="dpic1" placeholder="DAL" />
                  <i className="fas fa-chevron-down ml-auto"></i>
                </div>
                <div className="al">
                  <input type="text" id="dpic2" placeholder="AL" />
                  <i className="fas fa-chevron-down ml-auto"></i>
                </div>
                <div className="codice"></div>
              </div>
              <a href="#/" className="creatutente">
                {" "}
                <img src="img/plus-button.svg" alt="" /> Crea Utente
              </a>
            </div>
            <div className="row no-gutters max-width">
              <div className="col-md-12">
                <table className="transTable">
                  <tbody>
                    <tr>
                      <td>USERNAME</td>
                      <td>RAG. SOCIALE</td>
                      <td>RAPPRESENTANTE</td>
                      <td>Creato il</td>
                      <td>Citta`</td>
                      <td>Provincia</td>
                    </tr>
                    <tr>
                      <td>
                        <img src="img/user.svg" alt="" /> Mario Rossi
                      </td>
                      <td>Lorem, ipsum.</td>
                      <td>Lorem, ipsum.</td>
                      <td>7/16/2019 ORE 20:45</td>
                      <td>TARANTO</td>
                      <td>TA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminAccount;
