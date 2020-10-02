import React from "react";
import { Header } from "shared-components";
import images from "themes/images";
import { connect } from "react-redux";
import "./styles.css";
const Card = ({ imageUrl, Title, Info }) => (
  <div className="SDHome--Cards--Card">
    <img src={imageUrl} />
    <h2>{Title}</h2>
    <p>{Info}</p>
  </div>
);
class StaticDefaultHomePage extends React.Component {
  render() {
    const { skinExtras } = this.props;
    const SkinName = skinExtras.name;
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
              Info={`Con ${SkinName} puoi pagare in totale sicurezza tutti i bollettini postali bianchi e premarcati, MAV, RAV, Bollo Auto, etc. Al termine dell’operazione sarà rilasciata una ricevuta dell’avvenuto pagamento.`}
              imageUrl={images["SER_POS"]}
            />
            <Card
              Title={"RICARICHE CELLULARI"}
              Info={`Ricarica il tuo cellulare nel ${SkinName} più vicino a te, potrai eseguire queste operazioni anche direttamente dal tuo conto direttamente Online. Eroghiamo tutti i tagli di ricarica dei gestori di telefonia mobile tradizionali. Per ricaricare è necessario comunicare il gestore, l’importo della ricarica e il numero di telefono da ricaricare. Bastano un paio di click per eseguire queste operazioni.`}
              imageUrl={images["RIC_CEL"]}
            />
            <Card
              Title={"RICARICHE PVR"}
              Info={`Ricaricare somme di denaro su un conto gioco, a prescindere dal bookmaker sul quale si è iscritti, è molto semplice. Si potranno effettuare le ricariche dei conti gioco dei più importanti siti di giochi e scommesse online. Al termine dell’operazione, dietro pagamento in contanti al punto vendita, sarà rilasciata una ricevuta con il codice voucher per eseguire la ricarica del tuo conto gioco.`}
              imageUrl={images["RIC_PVR"]}
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
              Info={`Grazie al nuovo servizio offerto dai support ${SkinName} si creano nuove opportunità di business nella nostra piattaforma. Il servizio che consente alle nostre agenzie la possibilità di proporre alla clientela il servizio di prenotazione di treni, bus, aerei, nazionali ed internazionali. Questi servizi travel vi ampliaeranno i servizi offerti alla clientela incrementando così i guadagni e migliorando la visibilità della vostro punto.`}
              imageUrl={images["PRE_EVE"]}
            />

            <Card
              Title={"ACQUISTI ONLINE"}
              Info={`I Vostri clienti possono prenotare un prodotto e pagare direttamente nelle agenzie, usufruendo del servizio di acquisti online. I clienti potranno ritirare il prodotto direttamente nel punto ${SkinName}. Il servizio è usufruibile su qualsiasi sito e-commerce online con la possibilità di guadagnare una commissione su ogni prenotazione.`}
              imageUrl={images["ACQ_ONL"]}
            />
            <Card
              Title={"RICARICHE TELEVISIONI DIGITALI"}
              Info={`Nei punti ${SkinName} si possono ricaricare le tessere Sky, Sat+, Dazn, Mediaset Premium. Per le piattaforme che distribuiscono via internet, film, serie tv e altri contenuti multimendiali, come Netlix, Prime Video, etc, offriamo la possibilità di ricariche dei conti.`}
              imageUrl={images["RIC_DIG"]}
            />
            <Card
              Title={"GIFT CARD"}
              Info={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer`}
              imageUrl={images["GIF_CAR"]}
            />
            <Card
              Title={"SPEDIZIONE"}
              Info={`BRT è un’azienda flessibile e diversificata in grado di soddisfare le esigenze distributive dei clienti più esigenti: dalla consegna di diverse tipologie di spedizioni, alla fornitura di servizi logistici di supporto alla movimentazione ed alla distribuzione delle merci. Un’ampia e articolata gamma di servizi consente ai clienti di avvalersi di un unico interlocutore per tutte le esigenze di supporto logistico e distributivo in Italia, in Europa e nel mondo.`}
              imageUrl={images["SPE_DIZ"]}
            />
            <Card
              Title={"CRYPTO VALUTE"}
              Info={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer`}
              imageUrl={images["CRY_VAL"]}
            />
            <Card
              Title={"ALTRI SERVIZI"}
              Info={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer`}
              imageUrl={images["ALT_SER"]}
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
