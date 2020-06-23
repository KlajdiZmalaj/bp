fos.Router.setData({
  base_url: "https://www.tuttovisure.it",
  routes: {
    qm_cliente_business_ordine_nota_crea: {
      tokens: [
        ["text", "/ordine/nota/crea"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/area-riservata"],
      ],
      defaults: [],
      requirements: { _method: "POST" },
      hosttokens: [],
    },
    qm_cliente_business_ordine_nota_new: {
      tokens: [
        ["text", "/ordine/nota/new"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/area-riservata"],
      ],
      defaults: [],
      requirements: { _method: "GET" },
      hosttokens: [],
    },
    api_gesto_user_index: {
      tokens: [["text", "/dashboard/api/user/"]],
      defaults: [],
      requirements: { _method: "GET" },
      hosttokens: [],
    },
    api_attivita_new: {
      tokens: [["text", "/dashboard/api/attivita/"]],
      defaults: [],
      requirements: { _method: "GET" },
      hosttokens: [],
    },
    api_attivita_create: {
      tokens: [["text", "/dashboard/api/attivita/"]],
      defaults: [],
      requirements: { _method: "POST" },
      hosttokens: [],
    },
    api_attivita_personali_index: {
      tokens: [["text", "/dashboard/api/attivita/personali/"]],
      defaults: [],
      requirements: { _method: "GET" },
      hosttokens: [],
    },
    api_attivita_generiche_index: {
      tokens: [["text", "/dashboard/api/attivita/generiche/"]],
      defaults: [],
      requirements: { _method: "GET" },
      hosttokens: [],
    },
    api_attivita_delete: {
      tokens: [
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/api/attivita"],
      ],
      defaults: [],
      requirements: { _method: "DELETE" },
      hosttokens: [],
    },
    api_modelli_attivita_index: {
      tokens: [["text", "/dashboard/api/modelliAttivita/"]],
      defaults: [],
      requirements: { _method: "GET" },
      hosttokens: [],
    },
    api_clientiBusiness_index: {
      tokens: [["text", "/dashboard/api/clientiBusiness/index"]],
      defaults: [],
      requirements: { _method: "POST" },
      hosttokens: [],
    },
    api_clientiBusiness_get: {
      tokens: [
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/api/clientiBusiness/cliente"],
      ],
      defaults: [],
      requirements: { _method: "GET" },
      hosttokens: [],
    },
    api_clientiBusiness_csv: {
      tokens: [["text", "/dashboard/api/clientiBusiness/csv/"]],
      defaults: [],
      requirements: { _method: "GET" },
      hosttokens: [],
    },
    api_sconto_search: {
      tokens: [["text", "/dashboard/api/sconto/index"]],
      defaults: [],
      requirements: { _method: "POST" },
      hosttokens: [],
    },
    api_sconto_csv: {
      tokens: [["text", "/dashboard/api/sconto/csv"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    api_sconto_selected_csv: {
      tokens: [["text", "/dashboard/api/sconto/csv-selected"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    api_buono_search: {
      tokens: [["text", "/dashboard/api/buono/index"]],
      defaults: [],
      requirements: { _method: "POST" },
      hosttokens: [],
    },
    api_buono_csv: {
      tokens: [["text", "/dashboard/api/buono/csv"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    api_buono_selected_csv: {
      tokens: [["text", "/dashboard/api/buono/csv-selected"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    fattura_scadenzario: {
      tokens: [
        ["variable", "/", "[^/]++", "date"],
        ["text", "/dashboard/fattura/scadenzario-fatture"],
      ],
      defaults: { date: null },
      requirements: [],
      hosttokens: [],
    },
    fattura_scorpora_iva_json: {
      tokens: [["text", "/dashboard/fattura/scorpora-iva"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    modello_causale_json: {
      tokens: [
        ["text", "/json"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/causale"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    report_clientib2b_report: {
      tokens: [["text", "/dashboard/report-clientib2b/nuovo-report"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    report_clientib2b_tabclienti_report: {
      tokens: [
        ["variable", "/", "[^/]++", "idProdotto"],
        ["text", "/dashboard/report-clientib2b"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    integrazione_pagamento_json: {
      tokens: [
        ["text", "/json"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/integrazione-pagamento"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    modello_comunicazione_json_email: {
      tokens: [
        ["text", "/json-email"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/modello-comunicazione"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    modello_comunicazione_json_sms: {
      tokens: [
        ["text", "/json-sms"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/modello-comunicazione"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    notaio_json: {
      tokens: [
        ["text", "/json"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/notaio"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    notaio_new: {
      tokens: [["text", "/dashboard/notaio/new"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    notaio_edit: {
      tokens: [
        ["text", "/edit"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/notaio"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    tribunale_json: {
      tokens: [
        ["text", "/json"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/tribunale"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    tribunale_new: {
      tokens: [["text", "/dashboard/tribunale/new"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    tribunale_edit: {
      tokens: [
        ["text", "/edit"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/tribunale"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    comune_json: {
      tokens: [
        ["text", "/json"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/comune"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    comune_new: {
      tokens: [["text", "/dashboard/comune/new"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    comune_edit: {
      tokens: [
        ["text", "/edit"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/comune"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    conservatoria_json: {
      tokens: [
        ["text", "/json"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/conservatoria"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    conservatoria_new: {
      tokens: [["text", "/dashboard/conservatoria/new"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    conservatoria_edit: {
      tokens: [
        ["text", "/edit"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/conservatoria"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    contenuto_json: {
      tokens: [
        ["text", "/json"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/mail-preimpostate"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    contenuto_new: {
      tokens: [["text", "/dashboard/mail-preimpostate/new"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    contenuto_edit: {
      tokens: [
        ["text", "/edit"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/mail-preimpostate"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    clientebusinessfeed_new: {
      tokens: [["text", "/dashboard/clientebusinessfeed/new"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    clientebusinessfeed_edit: {
      tokens: [
        ["text", "/edit"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/clientebusinessfeed"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    clientebusiness_report: {
      tokens: [["text", "/dashboard/clientebusiness/report"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    clientebusiness_show: {
      tokens: [
        ["text", "/show"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/clientebusiness"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    clientebusiness_edit: {
      tokens: [
        ["text", "/edit"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/clientebusiness"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    clientebusiness_richiesta_ricarica: {
      tokens: [
        ["text", "/richiesta-ricarica"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/clientebusiness"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    conto: {
      tokens: [
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/conto"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    conto_crea_movimento_iva: {
      tokens: [
        ["text", "/crea-movimento-iva"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/conto"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    conto_crea_movimento_no_iva: {
      tokens: [
        ["text", "/crea-movimento-no-iva"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/conto"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    prodotto_nuova_opzione: {
      tokens: [["text", "/dashboard/prodotto/opzioni/nuova"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    prodotto_opzioni: {
      tokens: [
        ["text", "/opzioni"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/prodotto"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    prodotto_form_opzioni: {
      tokens: [
        ["text", "/form-opzioni"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/prodotto"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    prodotto_opzioni_classificate_options: {
      tokens: [
        ["variable", "/", "[^/]++", "gruppo"],
        ["text", "/dashboard/prodotto/opzioni-classificate"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    ordine_edit: {
      tokens: [
        ["text", "/edit"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/ordine"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    ordine_allegato_preview: {
      tokens: [["text", "/dashboard/ordine/allegato/preview"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    ordine_elimina_comunicazione_programmata: {
      tokens: [
        ["text", "/elimina"],
        ["variable", "/", "[^/]++", "idComlink"],
        ["variable", "/", "[^/]++", "idComunicazione"],
        ["text", "/comunicazioni"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/ordine"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    ordine_invia_comunicazione_programmata: {
      tokens: [
        ["text", "/invia"],
        ["variable", "/", "[^/]++", "idComlink"],
        ["variable", "/", "[^/]++", "idComunicazione"],
        ["text", "/comunicazioni"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/ordine"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    ordine_log: {
      tokens: [
        ["text", "/log"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/ordine"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    ordine_numero_urgenti: {
      tokens: [["text", "/dashboard/ordine/urgenti"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    ordine_da_lavorare_clienti_business_numero: {
      tokens: [["text", "/dashboard/ordine/da-lavorare/business"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    ordine_da_lavorare_numero: {
      tokens: [["text", "/dashboard/ordine/da-lavorare"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    ordine_msg_chat_numero: {
      tokens: [["text", "/dashboard/ordine/messaggi-chat"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    ordine_set_messaggio_chat_letto: {
      tokens: [
        ["text", "/set-messaggio-chat-letto"],
        ["variable", "/", "[^/]++", "comunicazioneId"],
        ["variable", "/", "[^/]++", "ordineId"],
        ["text", "/dashboard/ordine"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    ordine_create_buono: {
      tokens: [
        ["text", "/buono"],
        ["variable", "/", "[^/]++", "ordineId"],
        ["text", "/dashboard/ordine"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    nota_new: {
      tokens: [["text", "/dashboard/nota/new"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    sconto_show: {
      tokens: [
        ["text", "/show"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/sconto"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    sconto_edit: {
      tokens: [
        ["text", "/edit"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/sconto"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    buono_show: {
      tokens: [
        ["text", "/show"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/buono"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    pagamento_new: {
      tokens: [["text", "/dashboard/pagamento/new"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    pagamento_edit: {
      tokens: [
        ["text", "/edit"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/pagamento"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    richiesta_documenti_edit: {
      tokens: [
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/richiesta-documenti/edit"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    elenco_configurazioni: {
      tokens: [["text", "/dashboard/elenco-configurazioni/"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    elenco_configurazioni_edit: {
      tokens: [
        ["text", "/edit"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/elenco-configurazioni"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    elenco_configurazioni_update: {
      tokens: [
        ["text", "/update"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/elenco-configurazioni"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    elenco_configurazioni_delete: {
      tokens: [
        ["text", "/delete"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/elenco-configurazioni"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    elenco_configurazioni_clona: {
      tokens: [
        ["text", "/clona"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/elenco-configurazioni"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    template_comlink: {
      tokens: [["text", "/dashboard/template-comlink/"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    template_comlink_edit: {
      tokens: [
        ["text", "/edit"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/template-comlink"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    template_comlink_update: {
      tokens: [
        ["text", "/update"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/template-comlink"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    template_comlink_delete: {
      tokens: [
        ["text", "/delete"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/template-comlink"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    contenuto_orari_index: {
      tokens: [["text", "/dashboard/contenuto-orari/"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    contenuto_orari_edit: {
      tokens: [
        ["text", "/edit"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/contenuto-orari"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    contenuto_orari_update: {
      tokens: [
        ["text", "/update"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/contenuto-orari"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    contenuto_orari_delete: {
      tokens: [
        ["text", "/delete"],
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/contenuto-orari"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    qm_gesto_ordini_correlati: {
      tokens: [
        ["variable", "/", "[^/]++", "id"],
        ["text", "/dashboard/ordini-correlati"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    qm_tuttovisure_sconto_create: {
      tokens: [["text", "/sconto/"]],
      defaults: [],
      requirements: { _method: "POST" },
      hosttokens: [],
    },
    calcoloimu_index: {
      tokens: [["text", "/catasto/calcola-imu/."]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    calcoloimu_calcola: {
      tokens: [["text", "/catasto/calcola-imu/calcola-imu"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    modal_spedizioniInternazionali: {
      tokens: [["text", "/modal/modal-spedizioniInternazionali"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    modal_conservatorie: {
      tokens: [["text", "/modal/modal-conservatorie"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    modal_privacy: {
      tokens: [["text", "/modal/modal-privacy"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    modal_condizioni: {
      tokens: [["text", "/modal/modal-condizioni"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    confronta_listini_data: {
      tokens: [
        ["variable", "/", "\\w+", "listinoId"],
        ["variable", "/", "\\w+", "categoryId"],
        ["text", "/confronta-listini/data"],
      ],
      defaults: [],
      requirements: { methods: "GET", categoryId: "\\w+", listinoId: "\\w+" },
      hosttokens: [],
    },
    confronta_listini_max: {
      tokens: [["text", "/confronta-listini/listini/max"]],
      defaults: [],
      requirements: { methods: "GET" },
      hosttokens: [],
    },
    qm_tuttovisure_prodotto_parziali_ordine: {
      tokens: [["text", "/parziali-ordine"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    qm_tuttovisure_prodotto_parziali_ordine_no_session: {
      tokens: [
        ["text", "/parziali-ordine"],
        ["variable", "/", "[^/]++", "id"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    qm_tuttovisure_calcola_codicefiscale: {
      tokens: [["text", "/calcola-codicefiscale"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    qm_tuttovisure_calcola_codicefiscale_inverso: {
      tokens: [["text", "/calcola-codicefiscale-inverso"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    qm_tuttovisure_confronta: {
      tokens: [
        ["variable", "/", "[^/]++", "var"],
        ["variable", "/", "[^/]++", "cat"],
        ["text", "/confronta"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    qm_tuttovisure_comuni_options: {
      tokens: [["text", "/comuni-options"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    qm_tuttovisure_tribunali_options: {
      tokens: [["text", "/tribunali-options"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    qm_tuttovisure_conservatoria_options: {
      tokens: [["text", "/conservatoria-options"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    qm_tuttovisure_cerca_prodotti: {
      tokens: [["text", "/cercaAjax"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    qm_tuttovisure_cerca_google: {
      tokens: [["text", "/ricerca"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    qm_tuttovisure_privacy: {
      tokens: [["text", "/privacy"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    qm_tuttovisure_condizioni: {
      tokens: [["text", "/condizioni-generali-del-servizio"]],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
    qm_tuttovisure_prodotto: {
      tokens: [
        ["variable", "/", "[^/]++", "slug"],
        ["variable", "/", "[^/]++", "categoriaSlug"],
      ],
      defaults: [],
      requirements: [],
      hosttokens: [],
    },
  },
  prefix: "",
  host: "localhost",
  scheme: "http",
});
