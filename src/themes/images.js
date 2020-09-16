let skin = "";

if (
  window.location.href.includes("bpoint") ||
  window.location.href.includes("localhost") ||
  window.location.href.includes("192.168")
) {
  skin = 1;
} else if (window.location.href.includes("gfb")) {
  skin = 5;
} else if (window.location.href.includes("derby")) {
  skin = 3;
} else if (window.location.href.includes("planet")) {
  skin = 4;
} else if (window.location.href.includes("sirpay")) {
  skin = 6;
}
export default {
  loader: require(`../assets/images/loader.gif`),
  logo: require(`../assets/images${skin}/logo.svg`),
  logoFooter: require(`../assets/images${skin}/logoFooter.svg`),
  leftLogin: require(`../assets/images${skin}/login.png`),
  customFav: require(`../assets/images${skin}/favicon-32x32.svg`),
  footerBottom: require(`../assets/images${skin}/footerb.svg`),
  tickets: require(`../assets/images${skin}/tickets.svg`),
  uparrow: require(`../assets/images${skin}/uparrow.svg`),
  mario: require(`../assets/images${skin}/mario.jpg`),
  admAZZ: require(`../assets/images${skin}/admAZZ.svg`),
  click: require(`../assets/images${skin}/click.svg`),
  girl: require(`../assets/images${skin}/girl.png`),
  billDark: require(`../assets/images${skin}/bill-dark.svg`),
  billBlue: require(`../assets/images${skin}/bill-blue.svg`),
  billOrange: require(`../assets/images${skin}/bill-orange.svg`),
  Car: require(`../assets/images${skin}/Car.svg`),
  postpayimg: require(`../assets/images${skin}/postpayimg.svg`),
  TIM_logo_2016: require(`../assets/images${skin}/TIM_logo_2016.svg`),
  wind_logo_svg_vector: require(`../assets/images${skin}/wind-logo-svg-vector.svg`),
  three_logo: require(`../assets/images${skin}/three-logo.svg`),
  rightTriangle: require(`../assets/images${skin}/rightTriangle.svg`),
  posteitalia: require(`../assets/images${skin}/posteitalia.svg`),
  coop: require(`../assets/images${skin}/coop.svg`),
  paysafe: require(`../assets/images${skin}/paysafe.svg`),
  Stanleybet_logo_international: require(`../assets/images${skin}/Stanleybet_logo_international.svg`),
  Sky_Italia_Logo_2018: require(`../assets/images${skin}/Sky_Italia_-_Logo_2018.svg`),
  bitcoinorange: require(`../assets/images${skin}/bitcoinorange.svg`),
  bitcoingreen: require(`../assets/images${skin}/bitcoingreen.svg`),
  ethereum: require(`../assets/images${skin}/ethereum.svg`),
  riple: require(`../assets/images${skin}/riple.svg`),
  litecoin: require(`../assets/images${skin}/litecoin.svg`),
  dashcoin: require(`../assets/images${skin}/dashcoin.svg`),
  cancelMob: require(`../assets/images${skin}/cancelMob.svg`),
  close: require(`../assets/images${skin}/close.svg`),
  euro: require(`../assets/images${skin}/euro.svg`),
  checkSymbol: require(`../assets/images${skin}/check-symbol.svg`),
  print: require(`../assets/images${skin}/print.svg`),
  logoGray: require(`../assets/images${skin}/logoGray.svg`),
  postepayBlue: require(`../assets/images${skin}/postepayBlue.svg`),

  BOLL: require(`../assets/images${skin}/bill-dark.svg`),
  RCPP: require(`../assets/images${skin}/postpayimg.svg`),
  RPP001: require(`../assets/images${skin}/postpayimg.svg`),

  TIM: require(`../assets/images${skin}/TIM_logo_2016.svg`),
  TIMO: require(`../assets/images${skin}/TIM_logo_2016.svg`),

  VODA: require(`../assets/images${skin}/vodafone.svg`),
  VODO: require(`../assets/images${skin}/vodafone.svg`),

  WIND: require(`../assets/images${skin}/wind-logo-svg-vector.svg`),
  WINO: require(`../assets/images${skin}/wind-logo-svg-vector.svg`),

  TRE: require(`../assets/images${skin}/three-logo.svg`),
  TREO: require(`../assets/images${skin}/three-logo.svg`),
  SKY: require(`../assets/images${skin}/Sky_Italia_-_Logo_2018.svg`),
  PMOB: require(`../assets/images${skin}/posteitalia.svg`),
  CRP00B: require(`../assets/images${skin}/bitcoinorange.svg`),
  CRP0BC: require(`../assets/images${skin}/bitcoingreen.svg`),
  CRP00E: require(`../assets/images${skin}/ethereum.svg`),
  CRP00R: require(`../assets/images${skin}/riple.svg`),
  CRP00L: require(`../assets/images${skin}/litecoin.svg`),
  CRP00D: require(`../assets/images${skin}/dashcoin.svg`),
  PAYS: require(`../assets/images${skin}/paysafe.svg`),
  DDIGIM: require(`../assets/images/DDIGIM.svg`),
  DKENA: require(`../assets/images/DKENA.svg`),
  HOX: require(`../assets/images/HOX.svg`),
  FSTW: require(`../assets/images/FSTW.svg`),
  ILIO: require(`../assets/images/ILIO.svg`),
  WIND3: require(`../assets/images/WIND3.svg`),
  VERYMB: require(`../assets/images/VERYMB.svg`),
  COOPV: require(`../assets/images/COOPV.png`),
  LYCA: require(`../assets/images/LYCA.svg`),
  DTEL: require(`../assets/images/DTEL.jpg`),
  SATO: require(`../assets/images/STPL.png`),
  CHILLI: require(`../assets/images/CHILLI.png`),
  SIMF: require(`../assets/images/SIMF.png`),
  DIGIM: require(`../assets/images/DDIGIM.svg`),
  KENA: require(`../assets/images/DKENA.svg`),
  // LMAX: require(`../assets/images/CHILLI.png`),
  VECTO: require(`../assets/images/VECTO.svg`),
  // TALKH: require(`../assets/images/TALKH.svg`),
  ORCHE: require(`../assets/images/ORCHE.png`),
  WIND3O: require(`../assets/images/WIND3.svg`),
  FSTWO: require(`../assets/images/FSTW.svg`),
  PALL: require(`../assets/images/PALL.png`),
  LBRA: require(`../assets/images/LBRA.svg`),
  BTIT: require(`../assets/images/BTIT.svg`),
  CELK: require(`../assets/images/CELK.png`),
  BITC: require(`../assets/images/BITC.png`),
  NSHP: require(`../assets/images/NSHP.png`),
  BWIN: require(`../assets/images/BWIN.svg`),
  PKST: require(`../assets/images/PKST.svg`),
  WHIL: require(`../assets/images/WHIL.svg`),
  STCS: require(`../assets/images/STCS.svg`),
  STPL: require(`../assets/images/STPL.png`),
  DAZN: require(`../assets/images/DAZN.svg`),
  AMZNP: require(`../assets/images/AMZNP.svg`),
  AMZNC: require(`../assets/images/AMZNP.svg`),
  ZALAND: require(`../assets/images/ZALAND.svg`),
  BTFG: require(`../assets/images/BTFG.png`),
  TELC: require(`../assets/images${skin}/TIM_logo_2016.svg`),
  UNOM: require(`../assets/images/UNOM.png`),
  TALKH: require(`../assets/images/TALKH.png`),
  // COOPV: require(`../assets/images${skin}/bill-dark.svg`),
  // DKENA: require(`../assets/images${skin}/bill-dark.svg`),
  // HOX: require(`../assets/images${skin}/bill-dark.svg`),
  // FSTW: require(`../assets/images${skin}/bill-dark.svg`),
  // ILIO: require(`../assets/images${skin}/bill-dark.svg`)
  "google-authenticator": require(`../assets/images/google-authenticator-2.svg`),
  //prenotazioni images
  "expedia-logo": require(`../assets/images/prenotazioni/expedia.svg`),
  "expedia-bg": require(`../assets/images/prenotazioni/expedia-bg.jpg`),
  "expedia-card": require(`../assets/images/prenotazioni/expedia-card.png`),
  "expedia-mobile": require(`../assets/images/prenotazioni/expedia-mobile.svg`),

  "flixbus-logo": require(`../assets/images/prenotazioni/flixbus.svg`),
  "flixbus-bg": require(`../assets/images/prenotazioni/flixbus-bg.jpg`),
  "flixbus-card": require(`../assets/images/prenotazioni/flixbus-card.png`),
  "flixbus-mobile": require(`../assets/images/prenotazioni/flixbus-mobile.svg`),

  "trenitalia-logo": require(`../assets/images/prenotazioni/trenitalia.svg`),
  "trenitalia-bg": require(`../assets/images/prenotazioni/trenitalia-bg.jpg`),
  "trenitalia-card": require(`../assets/images/prenotazioni/trenitalia-card.png`),
  "trenitalia-mobile": require(`../assets/images/prenotazioni/trenitalia-mobile.svg`),

  "vivaticket-logo": require(`../assets/images/prenotazioni/vivaticket.svg`),
  "vivaticket-bg": require(`../assets/images/prenotazioni/vivaticket-bg.jpg`),
  "vivaticket-card": require(`../assets/images/prenotazioni/vivaticket-card.png`),
  "trenitalia-mobile": require(`../assets/images/prenotazioni/trenitalia-mobile.svg`),

  "ticketing-logo": require(`../assets/images/prenotazioni/ticketing.svg`),
  "ticketing-bg": require(`../assets/images/prenotazioni/ticketing-bg.jpg`),
  "ticketing-card": require(`../assets/images/prenotazioni/ticketing-card.png`),
  "vivaticket-mobile": require(`../assets/images/prenotazioni/vivaticket-mobile.svg`),

  "stubhub-logo": require(`../assets/images/prenotazioni/stubhub.svg`),
  "stubhub-bg": require(`../assets/images/prenotazioni/stubhub-bg.jpg`),
  "stubhub-card": require(`../assets/images/prenotazioni/stubhub-card.png`),
  "visure-card": require(`../assets/images/prenotazioni/stubhub-card.png`),
  "stubhub-mobile": require(`../assets/images/prenotazioni/stubhub-mobile.svg`),

  // "visure-logo": require(`../assets/images/prenotazioni/stubhub.svg`),

  faturaBackground: require(`../assets/images/FaturaBackground.png`),
  mobileLoginGirl: require(`../assets/images/girrrl.jpg`),
};
