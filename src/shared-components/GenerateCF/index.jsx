import React from "react";
import "./style.css";
const Generate = () => {
  const [form, setForm] = React.useState({});
  return (
    <div className="generateCodiceFiscale">
      <div className="generateCodiceFiscale--header">Fiscal Code Pop Up</div>
      <div className="generateCodiceFiscale--body">
        <div className="generateCodiceFiscale--body__item">
          <span>Nome*</span>
          <input type="text" value={form.name} />
        </div>
        <div className="generateCodiceFiscale--body__item">
          <span>Cognome*</span>
          <input type="text" value={form.lastname} />
        </div>
        <div className="generateCodiceFiscale--body__item">
          <span>Provinca*</span>
          <input type="text" value={form.province} />
        </div>
      </div>
      <div className="generateCodiceFiscale--footer">
        <button>Get Codice Fiscale</button>
      </div>
    </div>
  );
};

export default Generate;
