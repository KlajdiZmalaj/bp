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
      name: "Rendi Conto",
      link: "fatture",
      displayRole: ["super_admin", "agency"],
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
    link: `products`,
    active: "products",
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
  0: {
    name: "Fiat",
    models: ["Fiat 500", "Fiat500X", "Fiat124"],
    colors: ["Tech House Grey", "Glam Coral", "Pasodoble Red", "Epic Blue"],
  },
  1: {
    name: "Citroen",
    models: ["c1", "c2", "c4"],
    colors: ["red", "green", "blue"],
  },
};

const date = new Date().getMonth();
export const isWinter = date === 11 || date === 0 || date === 1;
