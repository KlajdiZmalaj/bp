export const allRoles = {
  user: "fal fa-user",
  agency: "fas fa-store",
  agent: "fas fa-user-tie",
  super_admin: "fas fa-store",
};
export const BannerColors = {
  BET: "#042842",
  BGM: "#03312E",
  BBT: "#ed4d1d",
  BWN: "#fec90b",
  PKS: "#d70909",
  PPB: "#e44b23",
  STC: "#00bfd2",
  WHL: "#01153a",
  default: "var(--accent-bg)",
};
export const docType = [
  {
    id: "1",
    name: "Carta di identita",
  },
  {
    id: "2",
    name: "Patenta di guida",
  },
  {
    id: "3",
    name: "Passporto",
  },
];
export const newAzioniSubmenu = {
  dashboard: [
    {
      id: 1,
      name: "RICARICHE",
      link: "dashboard/ricariche",
      displayRole: ["super_admin", "agency", "agent", "user", "noUser"],
    },
    {
      id: 2,
      name: "PAGAMENTI",
      link: "dashboard/pagamenti",
      displayRole: ["super_admin", "agency", "agent", "user", "noUser"],
    },
    {
      id: 3,
      name: "GIFT CARDS",
      link: "dashboard/gift_cards",
      displayRole: ["super_admin", "agency", "agent", "user", "noUser"],
    },
    {
      id: 4,
      name: "SPEDIZIONI",
      link: "dashboard/spedizioni",
      displayRole: ["super_admin", "agency", "agent", "user", "noUser"],
    },
    {
      id: 5,
      name: "PRENOTAZIONI",
      link: "forms",
      displayRole: ["super_admin", "agency", "agent", "user", "noUser"],
    },
    {
      id: 6,
      name: "VOUCHER",
      link: "dashboard/voucher",
      displayRole: ["super_admin", "agency", "agent", "user", "noUser"],
    },
  ],
  support: [
    {
      id: 1,
      name: "Dettagli prenotazioni",
      link: "dettagli-prenotazioni",
      displayRole: ["support", "super_admin", "agency", "user"],
    },
    {
      id: 2,
      name: "Configura",
      link: "configura",
      displayRole: ["super_admin", "agency", "agent", "user"],
    },
    {
      id: 3,
      name: "Messaggi",
      link: "annunci",
      displayRole: ["super_admin", "agency", "agent", "user"],
    },
    {
      id: 4,
      name: "Support",
      link: "support",
      displayRole: ["support"],
    },
  ],
  shop: [
    {
      id: 1,
      name: "E-commerce",
      link: "Messaggi/e_commerce",
      displayRole: ["super_admin", "agency", "agent", "user"],
    },
  ],
  contabilita: [
    {
      id: 1,
      name: "Lista Movimenti",
      link: "transazioni",
      displayRole: ["super_admin", "agency", "agent", "user"],
    },
    {
      id: 2,
      name: "Lista Utenti",
      link: "account-info",
      displayRole: ["super_admin", "agency", "agent"],
    },
    {
      id: 3,
      name: "Ricarica Utenti",
      link: "wallet",
      i: "fal fa-wallet",
      displayRole: ["agency"],
    },
    {
      id: 4,
      name: "Ricarica Conto",
      link: "carica-conto",
      displayRole: ["super_admin", "agency", "user"],
    },
    {
      id: 5,
      name: "Fatture",
      link: "fatture",
      displayRole: ["super_admin"],
    },
  ],
};
export const newAzioni = [
  {
    id: 1,
    name: "Servizi",
    link: `${newAzioniSubmenu["dashboard"][0].link}`,
    active: "dashboard",
    i: "fal fa-list-alt",
    displayRole: ["super_admin", "agency", "agent", "user", "noUser"],
  },
  {
    id: 2,
    name: "SUPPORT",
    link: `${newAzioniSubmenu["support"][0].link}`,
    active: "support",
    i: "fal fa-user-headset",
    displayRole: ["super_admin", "agency", "agent", "user", "support"],
  },
  {
    id: 3,
    name: "SHOP",
    link: `underDevelopment`,
    active: "underDevelopment",
    i: "fal fa-store",
    displayRole: ["super_admin", "agency", "agent", "user"],
  },
  {
    id: 4,
    name: "Contabilità",
    link: `${newAzioniSubmenu["contabilita"][0].link}`,
    active: "contabilita",
    i: "fal fa-wallet",
    displayRole: ["super_admin", "agency", "agent", "user"],
  },
  {
    id: 5,
    name: "Statistiche",
    link: "reportistica",
    active: "reportistica",
    type: "span",
    i: "fal fa-analytics",
    displayRole: ["super_admin", "agency", "agent", "user"],
  },
  {
    id: 6,
    name: "AREA DOWNLOAD",
    link: "areaDownload",
    active: "areaDownload",
    i: "fal fa-download",
    displayRole: ["super_admin", "agency", "agent"],
  },
];
export const azioni = [
  {
    id: 1,
    name: "messaggi",
    link: "annunci",
    i: "fal fa-comment-alt-lines",
    displayRole: ["super_admin", "agency", "agent", "user"],
  },
  {
    id: 2,
    name: "lista utenti",
    link: "account-info",
    i: "fal fa-user-friends",
    displayRole: ["super_admin", "agency", "agent", "main_admin"],
  },
  {
    id: 8,
    name: "ricarica utenti",
    link: "wallet",
    i: "fal fa-wallet",
    displayRole: ["agency"],
  },
  {
    id: 3,
    name: "lista movimenti",
    link: "transazioni",
    i: "fal fa-file-invoice-dollar",
    displayRole: ["super_admin", "agency", "agent", "user"],
  },
  // {
  //   id: 4,
  //   name: "ricerca movimenti",
  //   link: "use-code",
  //   i: "fal fa-barcode-read",
  //   displayRole: ["super_admin", "agency"],
  // },
  {
    id: 5,
    name: "servizi",
    link: "dashboard",
    i: "fal fa-shopping-cart",
    displayRole: ["super_admin", "agency", "agent", "user"],
  },
  {
    id: 9,
    name: "Prenotazioni",
    link: "forms",
    i: "fab fa-wpforms",
    displayRole: ["super_admin", "user", "agency"],
  },
  // {
  //   id: 12,
  //   name: "Visure",
  //   link: "visure",
  //   i: "fab fa-wpforms",
  //   displayRole: ["super_admin", "user", "agency"],
  // },
  {
    id: 6,
    name: "configura",
    link: "configura",
    i: "fal fa-cogs",
    displayRole: ["super_admin", "agency", "agent", "user"],
  },
  {
    id: 7,
    name: "carica conto",
    link: "carica-conto",
    i: "fal fa-receipt",
    displayRole: ["super_admin", "agency", "user"],
  },
  {
    id: 10,
    name: "Support",
    link: "support",
    i: "fal fa-user-headset",
    displayRole: ["support"],
  },
  {
    id: 11,
    name: "Dettagli Prenotazioni",
    link: "dettagli-prenotazioni",
    i: "fab fa-wpforms",
    displayRole: ["support", "super_admin", "agency", "user"],
  },
  // {
  //   id: 13,
  //   name: "Dettagli Visure",
  //   link: "dettagli-visure",
  //   i: "fab fa-wpforms",
  //   displayRole: ["super_admin", "user", "agency", "support"],
  // },
  {
    id: 13,
    name: "Fatture",
    link: "fatture",
    i: "fas fa-ballot-check",
    displayRole: ["super_admin"],
  },
];

export const administrazioni = [
  {
    id: 1,
    name: "account",
    link: "admin-account",
  },
  {
    id: 2,
    name: "annunci",
    link: "annunci-admin",
  },
  {
    id: 3,
    name: "operazioni",
    link: "operazioni",
  },
  {
    id: 4,
    name: "impostazioni",
    link: "impostazioni",
  },
];

export const servicesVisure = {
  Catasto: {
    services: [
      {
        name: "Visura Catastale",
        price: 13,
        sco: "40",
        time: "in pochi secondi",
      },
      {
        name: "Visura per soggetto storica",
        price: 13,
        sco: "35",
        time: "2 ore",
      },
      {
        name: "Planimetria Catastale",
        price: 29,
        sco: "35",
        time: "2 ore",
      },
      {
        name: "Mappa Catastale / Estratto di Mappa",
        price: 13,
        sco: "35",
        time: "2 ore",
      },
      {
        name: "Elenco Imobili",
        price: 9,
        sco: "35",
        time: "2 ore",
      },
      {
        name: "Mappa Edificio / Elaborato Planimetrico",
        price: 13,
        sco: "35",
        time: "4 ore",
      },
      {
        name: "Rendita catastale",
        price: 5,
        sco: "35",
        time: "2 ore",
      },
      {
        name: "Reddito dominicale e reddito agrario",
        price: 5,
        sco: "35",
        time: "2 ore",
      },
      {
        name: "Certificato Castale",
        price: 28,
        sco: "35",
        time: "2 giorni",
      },
      {
        name: "Calcolo della Superficie da Planimetria",
        price: 40,
        sco: "35",
        time: "2 ore",
      },
      {
        name: "Correzione Visura Catastale",
        price: 29,
        sco: "35",
        time: "40 giorni",
      },
      {
        name: "Voltura Catastale",
        price: 149,
        sco: "35",
        time: "40 giorni",
      },
    ],
  },
  "Camera di Commercio": {
    services: [
      {
        name: "Report Azienda Full",
        price: 19,
        sco: "25",
        time: "in pochi secondi",
      },
      {
        name: "Report Azienda Light",
        price: 14,
        sco: "25",
        time: "in pochi secondi",
      },
      {
        name: "Visura Camerale",
        price: 15,
        sco: "40",
        time: "in pochi secondi",
      },
      {
        name: "Bilancio Aziendale",
        price: 13,
        sco: "25",
        time: "2 ore",
      },
      {
        name: "Visura Protesti",
        price: 6,
        sco: "25",
        time: "2 ore",
      },
      {
        name: "Analisi bilancio",
        price: 13,
        sco: "25",
        time: "2 ore",
      },
      {
        name: "Certificato Camerale",
        price: 29,
        sco: "25",
        time: "2 ore",
      },
      {
        name: "Certificato camerale ordinario",
        price: 29,
        sco: "25",
        time: "2 ore",
      },
      {
        name: "Certificato camerale storico",
        price: 29,
        sco: "25",
        time: "2 ore",
      },
      {
        name: "Scheda Persona",
        price: 16,
        sco: "25",
        time: "in pochi secondi",
      },
      {
        name: "Certificato di Vigenza",
        price: 29,
        sco: "25",
        time: "2 ore",
      },
      {
        name: "Cariche Aziendali",
        price: 9,
        sco: "25",
        time: "in pochi secondi",
      },
      {
        name: "Elenco Soci Azienda",
        price: 9,
        sco: "25",
        time: "in pochi secondi",
      },
      {
        name: "Visura Amministratori",
        price: 9,
        sco: "25",
        time: "in pochi secondi",
      },
      {
        name: "Visura Camerale in Inglese",
        price: 15,
        sco: "25",
        time: "2 ore",
      },
      {
        name: "Carta cronotachigrafica",
        price: 59,
        sco: "25",
        time: "15 giorni",
      },
      {
        name: "Visura Procedure in corso",
        price: 12,
        sco: "25",
        time: "in pochi secondi",
      },
      {
        name: "Visura Statuto / Patti Sociali",
        price: 12,
        sco: "25",
        time: "in pochi secondi",
      },
      {
        name: "Scheda Partecipazioni in Società",
        price: 10,
        sco: "25",
        time: "in pochi secondi",
      },
      {
        name: "Visura Sede ed Unità locali",
        price: 5,
        sco: "25",
        time: "in pochi secondi",
      },
      {
        name: "Atto in Camera di Commercio",
        price: 11,
        sco: "25",
        time: "2 ore",
      },
      {
        name: "Report su Persona",
        price: 15,
        sco: "25",
        time: "2 ore",
      },
    ],
  },
  Conservatoria: {
    services: [
      {
        name: "Visura Ipotecaria",
        price: 39,
        sco: "35",
        time: "in pochi secondi",
      },
      {
        name: "Ispezione Nazionale in Conservatoria",
        price: 35,
        sco: "35",
        time: "4 ore",
      },
      {
        name: "Visura Ipoteche e Compravendite",
        price: 39,
        sco: "35",
        time: "in pochi secondi",
      },
      {
        name: "Visura per Nota",
        price: 18,
        sco: "35",
        time: "4 ore",
      },
      {
        name: "Visura Pregiudizievoli",
        price: 29,
        sco: "35",
        time: "4 ore",
      },
      {
        name: "Copia Atto Notarile",
        price: 98,
        sco: "35",
        time: "3 ettimane",
      },
    ],
  },
  "P.R.A. e Pratiche Veicoli": {
    services: [
      {
        name: "Visura Targa PRA",
        price: 18,
        sco: "50",
        time: "in pochi secondi",
      },
      {
        name: "Aggiornamento indirizzo su Libretto Veicolo",
        price: 49,
        sco: "25",
        time: "15 giorni",
      },
      {
        name: "Visura Targa in Motorizzazione",
        price: 29,
        sco: "25",
        time: "15 giorni",
      },
      {
        name: "Perdita di possesso motociclo",
        price: 49,
        sco: "25",
        time: "15 giorni",
      },
      {
        name: "Certificato Cronologico PRA",
        price: 45,
        sco: "35",
        time: "15 giorni",
      },
      {
        name: "Visura Proprietari PRA",
        price: 13,
        sco: "25",
        time: "2 ore",
      },
      {
        name: "Visura Telaio PRA",
        price: 13,
        sco: "25",
        time: "2 ore",
      },
      {
        name: "Visura Bolli",
        price: 19,
        sco: "25",
        time: "3 giorni",
      },
      {
        name: "Visura veicoli intestati",
        price: 29,
        sco: "25",
        time: "15 giorni",
      },
      {
        name: "Copia atto di vendita PRA",
        price: 55,
        sco: "30",
        time: "15 giorni",
      },
      {
        name: "Copia Certificato Proprietà Veicolo",
        price: 49,
        sco: "25",
        time: "15 giorni",
      },
      {
        name: "Perdita Possesso Veicolo",
        price: 49,
        sco: "25",
        time: "15 giorni",
      },
      {
        name: "Rientro in Possesso",
        price: 49,
        sco: "25",
        time: "15 giorni",
      },
      {
        name: "Duplicato Carta Circolazione",
        price: 49,
        sco: "25",
        time: "15 giorni",
      },
    ],
  },
  "Anagrafe / Comune": {
    services: [
      {
        name: "Estratto di Nascita Multilingua",
        price: 34,
        sco: "30",
        time: "10 giorni",
      },
      {
        name: "Estratto di Matrimonio Multilingua",
        price: 34,
        sco: "30",
        time: "10 giorni",
      },
      {
        name: "Estratto di Morte Multilingua",
        price: 34,
        sco: "30",
        time: "10 giorni",
      },
      {
        name: "Certificato Aire",
        price: 29,
        sco: "30",
        time: "10 giorni",
      },
      {
        name: "Certificato / Estratto di Nascita",
        price: 29,
        sco: "30",
        time: "10 giorni",
      },
      {
        name: "Certificato / Estratto di Matrimonio",
        price: 29,
        sco: "30",
        time: "10 giorni",
      },
      {
        name: "Certificato di Residenza",
        price: 29,
        sco: "30",
        time: "10 giorni",
      },
      {
        name: "Certificato Stato di Famiglia",
        price: 29,
        sco: "30",
        time: "10 giorni",
      },
      {
        name: "Certificato / Estratto di Morte",
        price: 29,
        sco: "30",
        time: "10 giorni",
      },
      {
        name: "Certificato Contestuale",
        price: 29,
        sco: "30",
        time: "10 giorni",
      },
      {
        name: "Certificato di Stato Libero",
        price: 29,
        sco: "30",
        time: "10 giorni",
      },
      {
        name: "Certificato di Esistenza in Vita",
        price: 29,
        sco: "30",
        time: "10 giorni",
      },
      {
        name: "Certificato di Battesimo",
        price: 39,
        sco: "30",
        time: "20 giorni",
      },
      {
        name: "Certificato di Cittadinanza",
        price: 29,
        sco: "30",
        time: "10 giorni",
      },
      {
        name: "Certificato di Cresima",
        price: 39,
        sco: "30",
        time: "20 giorni",
      },
      {
        name: "Certificato Storico",
        price: 39,
        sco: "30",
        time: "20 giorni",
      },
      {
        name: "Certificato Godimento dei Diritti Politici",
        price: 29,
        sco: "30",
        time: "10 giorni",
      },
    ],
  },
  "Altri Uffici": {
    services: [
      {
        name: "Estratto Conto Riscossione (ex Equitalia)",
        price: 59,
        sco: "25",
        time: "5 giorni",
      },
      {
        name: "Certificato Iscrizione Albo",
        price: 39,
        sco: "25",
        time: "10 giorni",
      },
      {
        name: "Visura Centrale Rischi",
        price: 39,
        sco: "25",
        time: "20 giorni",
      },
      {
        name: "Certificato di Laurea",
        price: 39,
        sco: "25",
        time: "20 giorni",
      },
      {
        name: "Posta Elettronica Certificata - PEC Aruba",
        price: 5,
        sco: "30",
        time: "3 ore",
      },
    ],
  },
  "Agenzia delle Entrate": {
    services: [
      {
        name: "Certificato di Residenza Fiscale",
        price: 39,
        sco: "25",
        time: "30 giorni",
      },
      {
        name: "Certificato contro le doppie imposizioni",
        price: 39,
        sco: "25",
        time: "30 giorni",
      },
      {
        name: "Certificato di Attribuzione/Cessazione Partita IVA",
        price: 39,
        sco: "25",
        time: "30 giorni",
      },
    ],
  },
  "Fatturazione Elettronica": {
    services: [
      {
        name: "Fatturazione Elettronica",
        price: 25,
        sco: "28",
        time: "8 ore",
      },
    ],
  },
  Prefettura: {
    services: [
      {
        name: "Certificato Apostillato",
        price: 32,
        sco: "78",
        time: "20 giorni",
      },
      {
        name: "Estratto Apostillato",
        price: 32,
        sco: "78",
        time: "20 giorni",
      },
    ],
  },
  Tribunale: {
    services: [
      {
        name: "Casellario Giudiziale",
        price: 49,
        sco: "25",
        time: "7 giorni",
      },
      {
        name: "Certificato Carichi Pendenti",
        price: 49,
        sco: "25",
        time: "12 giorni",
      },
      {
        name: "Certificato dell'anagrafe delle sanzioni amministrative",
        price: 49,
        sco: "25",
        time: "7 giorni",
      },
      {
        name: "Carichi Pendenti degli illeciti amministrativi ",
        price: 49,
        sco: "25",
        time: "12 giorni",
      },
      {
        name: "Certificato Antipedofilia",
        price: 49,
        sco: "25",
        time: "7 giorni",
      },
      {
        name: "Certificato Fallimentare",
        price: 59,
        sco: "25",
        time: "20 giorni",
      },
    ],
  },
};
export const BgameServices = [
  {
    cost: "10.00",
    name: "BGame Voucher",
    service_id: "BGM001",
    type: "1",
  },
  {
    cost: "25.00",
    name: "BGame Voucher",
    service_id: "BGM001",
    type: "1",
  },
  {
    cost: "50.00",
    name: "BGame Voucher",
    service_id: "BGM001",
    type: "1",
  },
  {
    cost: "100.00",
    name: "BGame Voucher",
    service_id: "BGM001",
    type: "1",
  },
];

export const BbetServices = [
  {
    cost: "10.00",
    name: "BBet Voucher",
    service_id: "BBT001",
    type: "1",
  },
  {
    cost: "25.00",
    name: "BBet Voucher",
    service_id: "BBT001",
    type: "1",
  },
  {
    cost: "50.00",
    name: "BBet Voucher",
    service_id: "BBT001",
    type: "1",
  },
  {
    cost: "100.00",
    name: "BBet Voucher",
    service_id: "BBT001",
    type: "1",
  },
];

//http://prntscr.com/vmqp68  reset state so next popup states are cleaned
export const resetUserStateChangeFields = {
  changedphone: "",
  changeddocument_type: "",
  changeddocument_number: "",
  rilasciato_da: "",
  luogo_di_rilascio: "",
  data_di_rilascio: "",
  data_di_scadenza: "",
  changedInsegna: "",
  changedCordinate: "",
  changeda_phone: "",
  changedSede_operativa: "",
  changedcomune: "",
  changedprovincia: "",
  changedcap: "",
  changednazione: "",
  changedpagamento_mensile: "",
  password: "",
  confirm_password: "",
  username: "",
  email: "",
  a_ragione_sociale: "",
  a_iva: "",
  first_name: "",
  last_name: "",
  birth_comune_code: "",
  birth_country: "",
  birth_place: "",
  birthday: "",
  city: "",
  gender: "",
  personal_number: "",
  ragione_sociale: "",
  p_iva: "",
  country: "",
  address: "",
  cap: "",
  comune_code: "",
};

//

export const autoConfig = {
  "0": {
    name: "Fiat",
    models: ["Fiat 500", "Fiat500X", "Fiat124"],
    colors: ["Tech House Grey", "Glam Coral", "Pasodoble Red", "Epic Blue"],
  },
  "1": {
    name: "Citroen",
    models: ["c1", "c2", "c4"],
    colors: ["red", "green", "blue"],
  },
};
