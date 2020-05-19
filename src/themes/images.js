let skin = "";

if (
  window.location.href.includes("bpoint")
  // ||
  // window.location.href.includes("localhost")
) {
  skin = 1;
} else {
  skin = 3;
}

export default {
  logo: require(`../assets/images${skin}/logo.svg`),
  logoFooter: require(`../assets/images${skin}/logoFooter.svg`),
  leftLogin: require(`../assets/images${skin}/login.png`),

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
  // COOPV: require(`../assets/images${skin}/bill-dark.svg`),
  // DKENA: require(`../assets/images${skin}/bill-dark.svg`),
  // HOX: require(`../assets/images${skin}/bill-dark.svg`),
  // FSTW: require(`../assets/images${skin}/bill-dark.svg`),
  // ILIO: require(`../assets/images${skin}/bill-dark.svg`)
};
