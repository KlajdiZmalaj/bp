import React from "react";
import { Header, Footer, UserInfoBar } from "shared-componentsMobile";
import Prenotazionebody from "../domains/Prenotazioni";
const Prenotazione = () => {
  return (
    <div className="PrenotazioniMob">
      <Header />

      <Prenotazionebody />
      <UserInfoBar />
      <Footer />
    </div>
  );
};
export default Prenotazione;
