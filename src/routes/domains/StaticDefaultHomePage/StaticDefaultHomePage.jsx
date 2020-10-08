import React from "react";
import images from "themes/images";
import { connect } from "react-redux";
import "./styles.css";
const Card = ({ imageUrl, Title, Info }) => (
  <div className="SDHome--Cards--Card">
    {/* eslint-disable-next-line jsx-a11y/alt-text */}
    <img src={imageUrl} />
    <h2>{Title}</h2>
    <p>{Info}</p>
  </div>
);
class StaticDefaultHomePage extends React.Component {
  render() {
    const { skinExtras } = this.props;
    const skinLink = skinExtras.link3
      ? skinExtras.link3.replace("https://", "")
      : "";
    const SkinName = skinExtras.name || "";
    return (
      <div className="Container">
        <div className="SDHome">
          <div className="SDHome--Header">
            <span>
              <span>{`${SkinName}`}</span> <span>SERVIZI</span>
            </span>
            <span>
              La nostra proposta di affiliazione prevede esclusivamente i costi
              di start-up, in cui sono compresi gli arredi per l’allestimento
              del punto vendita, le attrezzature tecniche necessarie allo
              svolgimento dell’attività e il materiale di marketing.
            </span>
          </div>
          <div className="SDHome--Cards">
            <Card
              Title={"SERVIZI POSTALI"}
              Info={`Con ${
                skinLink || ""
              } puoi pagare in totale sicurezza tutti i bollettini postali, MAV, RAV, Bollo
              Auto, F24, PagoPa, etc. Al termine dell’operazione sarà rilasciata una ricevuta
              dell’avvenuto pagamento.`}
              imageUrl={images["SER_POS"]}
            />
            <Card
              Title={"RICARICHE CELLULARI"}
              Info={`Ricarica il tuo cellulare nel ${skinLink} più vicino a te o anche direttamente dal tuo conto
              online. Eroghiamo tutti i tagli di ricarica dei gestori di telefonia mobile tradizionali.
              Bastano un paio di click per eseguire queste operazioni, communicare il gestore e
              l’importo.`}
              imageUrl={images["RIC_CEL"]}
            />
            <Card
              Title={"RICARICHE TELEVISIONI DIGITALI"}
              Info={`Nei punti ${SkinName} si possono ricaricare le tessere Sky, Sat+, Dazn, Mediaset Premium. Per le piattaforme che distribuiscono via internet, film, serie tv e altri contenuti multimendiali, come Netlix, Prime Video, etc, offriamo la possibilità di ricariche dei conti.`}
              imageUrl={images["RIC_DIG"]}
            />

            <Card
              Title={"PRENOTAZIONE BIGLIETTI VOLI"}
              Info={`Grazie al nuovo servizio offerto dai support ${SkinName} si creano nuove opportunità di business nella nostra piattaforma. Il servizio che consente alle nostre agenzie la possibilità di proporre alla clientela il servizio di prenotazione di treni, bus, aerei, nazionali ed internazionali. Questi servizi travel vi ampliaeranno i servizi offerti alla clientela incrementando così i guadagni e migliorando la visibilità della vostro punto.`}
              imageUrl={images["PRE_VOL"]}
            />
            <Card
              Title={"PRENOTAZIONE BIGLIETTI TRENI"}
              Info={`Grazie al nuovo servizio offerto dai support ${SkinName} si creano nuove opportunità di business nella nostra piattaforma. Il servizio che consente alle nostre agenzie la possibilità di proporre alla clientela il servizio di prenotazione di treni, bus, aerei, nazionali ed internazionali. Questi servizi travel vi ampliaeranno i servizi offerti alla clientela incrementando così i guadagni e migliorando la visibilità della vostro punto.`}
              imageUrl={images["PRE_TRE"]}
            />
            <Card
              Title={"PRENOTAZIONE BIGLIETTI EVENTI"}
              Info={`Nei ${skinLink} è attivo il servizio biglietteria eventi su prenotazione.
              Si potranno acquistare all'interno dei nostri punti: biglietti per eventi sportivi, nazionali
              ed internazionali ed i biglietti dei più importanti concerti, eventi culturali e teatrali sul
              territorio italiano.           
              `}
              imageUrl={images["PRE_EVE"]}
            />

            <Card
              Title={"ACQUISTI ONLINE"}
              Info={`I Vostri clienti possono prenotare qualunque prodotto online e pagare direttamente nelle
              agenzie dove i potranno anche ritirare il prodotto quando più comoo per loro.
              Il servizio è usufruibile su qualsiasi sito e-commerce online con la possibilità di
              guadagnare una commissione su ogni prenotazione.`}
              imageUrl={images["ACQ_ONL"]}
            />

            <Card
              Title={"NOLEGGIO AUTO"}
              Info={`Con il servizio puoi offrire alla tua clientela, noleggio auto a lungo termine, moto o veicoli
              commerciali. Il canone include RCA, Bollo, assicurazione furto e incendio, copertura
              danni al veicolo, manutenzione ordinaria e straordinaria, traino e soccorso stradale H24
              e gestione sinistri.
              Scopri tutti i veicoli disponibili tra automobili, motorini, moto e veicoli commerciali: le
              proposte hanno una durata da 12 a 60 mesi, i canoni proposti dai nostri broker, sono
              calcolati con anticipo e senza anticipo e sono tra i più vantaggiosi offerti oggi dal
              mercato. Richiedi un preventivo personalizzato per i tuoi clienti guadagnando ad
              contratto chiuso.`}
              imageUrl={images["GIF_CAR"]}
            />
            <Card
              Title={"SPEDIZIONE"}
              Info={`BRT è un’azienda flessibile e diversificata in grado di soddisfare le esigenze distributive dei clienti più esigenti: dalla consegna di diverse tipologie di spedizioni, alla fornitura di servizi logistici di supporto alla movimentazione ed alla distribuzione delle merci. Un’ampia e articolata gamma di servizi consente ai clienti di avvalersi di un unico interlocutore per tutte le esigenze di supporto logistico e distributivo in Italia, in Europa e nel mondo.`}
              imageUrl={images["SPE_DIZ"]}
            />
            <Card
              Title={"VISURE"}
              Info={`Scarica in pochi secondi Visure e Certificati rilasciati dagli Uffici Pubblici, accedi a Camera di
              Commercio, Catasto, Conservatoria, Tribunale, Anagrafe e Pra. Potrai chiedere qualsiasi
              documento in modo Veloce, Semplice e Sicuro.`}
              imageUrl={images["CRY_VAL"]}
            />
            <Card
              Title={"AVVOCATO ONLINE"}
              Info={`Nella gamma dei servizi offerti da ${SkinName}, si aggiunge l'Assistenza Legale. Per qualsiasi
              controversia come Divorzio, Regolamentazione mantenimento e affidamento figli e
              genitori non sposati, Sfratto, Vittime della strada, Infortunistica Stradale, cancellazione
              protesti (gratis per Agenzie Affiliate), rimborso della cessione del quinto, Malasanità,
              Cartelle Equitalia, Anatocismo Bancario, etc potrai richiedere online la consulenza e
              offrirla ai tuoi utenti con dei prezzi concorrenziali e un servizio di qualità.`}
              imageUrl={images["ALT_SER"]}
            />
            <Card
              Title={"RICARICHE PVR"}
              Info={`Ricaricare somme di denaro su un conto gioco, a prescindere dal bookmaker sul quale si è iscritti, è molto semplice. Si potranno effettuare le ricariche dei conti gioco dei più importanti siti di giochi e scommesse online. Al termine dell’operazione, dietro pagamento in contanti al punto vendita, sarà rilasciata una ricevuta con il codice voucher per eseguire la ricarica del tuo conto gioco.`}
              imageUrl={images["RIC_PVR"]}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  skinExtras: state.auth.skinExtras,
});
export default connect(mapStateToProps)(StaticDefaultHomePage);
