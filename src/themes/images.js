const month = new Date().getMonth();
const day = new Date().getDate();
export const isWinter =
  (month === 11 && day.toString().match(/^(24|25|26|27|28|29|30|31)$/g)) ||
  (month === 0 && day.toString().match(/^(1|2|3|4|5)$/g));
let skin = "";

if (window.location.href.includes("bpoint")) {
  skin = 1;
} else if (window.location.href.includes("gfb")) {
  skin = 5;
} else if (window.location.href.includes("derby")) {
  skin = 3;
} else if (window.location.href.includes("planet")) {
  skin = 4;
} else if (window.location.href.includes("sirpay")) {
  skin = 6;
} else if (window.location.href.includes("imperialpay")) {
  skin = 7;
} else if (
  window.location.href.includes("bullpay") ||
  window.location.href.includes("192.168") ||
  window.location.href.includes("localhost")
) {
  //
  skin = 52;
}
let imgObj = {};
try {
  imgObj = {
    //pagamanti logo
    BOLO_AUTO: require(`../assets/images/boloAuto-form.svg`),
    PAGO_PA: require(`../assets/images/pagoPa-form.svg`),
    agenzia_entrata: require(`../assets/images/agenzia_entrata.png`),
    BOLLETINO: require(`../assets/images/bolletino-form.svg`),
    "BOLO_AUTO-logo": require(`../assets/images/boloauto.svg`),
    "PAGO_PA-logo": require(`../assets/images/pagopa.svg`),
    "BOLLETINO-logo": require(`../assets/images/BOLL-Black.svg`),
    "f24-logo": require(`../assets/images/f24.svg`),
    //mobile-pagamenti
    "BOL006-Black-Mobile": require(`../assets/images/BOL006-Black.svg`),
    "PPA001-Black-Mobile": require(`../assets/images/PPA-Black.svg`),
    "PAGF24-Black-Mobile": require(`../assets/images/PAGF24-Black.svg`),
    "BOLL-Black-Mobile": require(`../assets/images/BOLL-Black.svg`),

    baner_servizi_header: require(`../assets/images/baner_servizi_header.png`),
    //Static home page images
    SER_POS: require(`../assets/images/servizi_postali.png`),
    RIC_CEL: require(`../assets/images/richariche_cellulari.png`),
    RIC_PVR: require(`../assets/images/richariche_pvr.png`),
    PRE_VOL: require(`../assets/images/prenotazione_biglietti_voli.png`),
    PRE_TRE: require(`../assets/images/Prenotazione_biglietti_treni.png`),
    PRE_EVE: require(`../assets/images/prenotazione_biglietti_eventi.png`),
    ACQ_ONL: require(`../assets/images/aqcquisti_online.png`),
    RIC_DIG: require(`../assets/images/ricariche_television_digitali.png`),
    GIF_CAR: require(`../assets/images/gift_card.png`),
    SPE_DIZ: require(`../assets/images/spedizione.png`),
    CRY_VAL: require(`../assets/images/crypto_valute.png`),
    ALT_SER: require(`../assets/images/altri_servizi.png`),
    //*//
    servizi_banner: require(`../assets/images/servizi_banner.png`),
    loader: require(`../assets/images/loader.gif`),
    logo: require(`../assets/images${skin}/${
      isWinter ? "logoWinter" : "logo"
    }.svg`),
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
    BOLL: require(`../assets/images/BOLL-Black.svg`),
    RCPP: require(`../assets/images${skin}/postpayimg.svg`),
    RPP001: require(`../assets/images${skin}/postpayimg.svg`),
    PARTYP: require(`../assets/images${skin}/partypoker.svg`),
    TIM: require(`../assets/images${skin}/TIM_logo_2016.svg`),
    TIMO: require(`../assets/images${skin}/TIM_logo_2016.svg`),
    VODA: require(`../assets/images${skin}/vodafone.svg`),
    VODO: require(`../assets/images${skin}/vodafone.svg`),
    BGAM: require(`../assets/images/bgame.svg`),
    BBET: require(`../assets/images/bbet.svg`),
    WIND: require(`../assets/images${skin}/wind-logo-svg-vector.svg`),
    WINO: require(`../assets/images${skin}/wind-logo-svg-vector.svg`),
    LMAX: require(`../assets/images${skin}/linkeln.svg`),
    LINKEM: require(`../assets/images${skin}/linkeln.svg`),
    BSTC: require(`../assets/images/Best_card.svg`),
    NNET: require(`../assets/images/on_net.svg`),
    IDTB: require(`../assets/images/IDTB.svg`),
    TRE: require(`../assets/images${skin}/three-logo.svg`),
    TREO: require(`../assets/images${skin}/three-logo.svg`),
    SKY: require(`../assets/images${skin}/Sky_Italia_-_Logo_2018.png`),
    PMOB: require(`../assets/images${skin}/posteitalia.png`),
    STBT: require(`../assets/images/stbt.svg`),
    CRYP: require(`../assets/images${skin}/bitcoinorange.svg`),
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
    TALKH: require(`../assets/images/TALKH.png`),
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
    PSSTO: require(`../assets/images/PSSTO.svg`),
    NINT: require(`../assets/images/NINT.svg`),
    XBOX: require(`../assets/images/XBOX.svg`),
    HELBIZ: require(`../assets/images/helbiz.svg`),
    TOTOWB: require(`../assets/images/TOTOWB.png`),
    MUCHB: require(`../assets/images/MUCHB.svg`),
    NETFL: require(`../assets/images/NETFL.png`),
    EUROSP: require(`../assets/images/EUROSP.svg`),
    WISHC: require(`../assets/images/WISHC.png`),
    BITN: require(`../assets/images/BITN.svg`),
    SPOTI: require(`../assets/images/SPOTIFY.svg`),
    VOLAGR: require(`../assets/images/VOLAGR.png`),
    SND000: require(`../assets/images/BOLL-Black.svg`),
    ALIPER: require(`../assets/images/ALIPER.svg`),
    ASOS: require(`../assets/images/ASOS.svg`),
    BENNET: require(`../assets/images/BENNET.svg`),
    BORBON: require(`../assets/images/borbone.svg`),
    BRICOI: require(`../assets/images/BRICOI.svg`),
    DESPAR: require(`../assets/images/DESPAR.svg`),
    FOOTL: require(`../assets/images/FOOTL.svg`),
    MEDIAW: require(`../assets/images/MEDIAW.svg`),
    MUSEM: require(`../assets/images/MUSEM.svg`),
    NESPRE: require(`../assets/images/NESPRE.svg`),
    NIKE: require(`../assets/images/nike2.svg`),
    PANORA: require(`../assets/images/PANORA.svg`),
    PRENAT: require(`../assets/images/PRENAT.svg`),
    Q8: require(`../assets/images/Q8.svg`),
    TIGOTA: require(`../assets/images/TIGOTA.svg`),
    UNES: require(`../assets/images/UNES.svg`),
    VIAGGI: require(`../assets/images/VIAGGI.svg`),

    // COOPV: require(`../assets/images${skin}/bill-dark.svg`),
    // DKENA: require(`../assets/images${skin}/bill-dark.svg`),
    // HOX: require(`../assets/images${skin}/bill-dark.svg`),
    // FSTW: require(`../assets/images${skin}/bill-dark.svg`),
    // ILIO: require(`../assets/images${skin}/bill-dark.svg`)
    "google-authenticator": require(`../assets/images/google-authenticator-2.svg`),
    //prenotazioni images
    "bgame-logo": require(`../assets/images/prenotazioni/bgame-logo.svg`),
    "bgame-mobile": require(`../assets/images/bgame-mobile.svg`),

    "bgame-bg": require(`../assets/images/prenotazioni/bgame-bg.jpg`),
    "bgame-card": require(`../assets/images/prenotazioni/bgame-card.png`),

    "auto-logo": require(`../assets/images/prenotazioni/auto-logo.svg`),
    "auto-card": require(`../assets/images/prenotazioni/auto-card.png`),
    "auto-bg": require(`../assets/images/prenotazioni/auto-bg.jpg`),
    "assicurazioni-logo": require(`../assets/images/prenotazioni/assicurazioni-logo.svg`),
    "assicurazioni-card": require(`../assets/images/prenotazioni/assicurazioni-card.jpg`),
    "energia-logo": require(`../assets/images/prenotazioni/energia-logo.svg`),
    "energia-mobile": require(`../assets/images/prenotazioni/energia-logo.svg`),
    "luce-gas-mobile": require(`../assets/images/prenotazioni/energia-logo.svg`),
    "energia-card": require(`../assets/images/prenotazioni/energia-card.png`),

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
    "vivaticket-mobile": require(`../assets/images/prenotazioni/vivaticket-mobile.svg`),

    "ticketing-logo": require(`../assets/images/prenotazioni/ticketing.svg`),
    "ticketone-logo": require(`../assets/images/prenotazioni/ticketing.svg`),
    "ticketing-bg": require(`../assets/images/prenotazioni/ticketing-bg.jpg`),
    "ticketing-card": require(`../assets/images/prenotazioni/ticketing-card.png`),
    "ticketone-mobile": require(`../assets/images/prenotazioni/ticketone-mobile.svg`),

    "stubhub-logo": require(`../assets/images/prenotazioni/stubhub.svg`),
    "stubhub-bg": require(`../assets/images/prenotazioni/stubhub-bg.jpg`),
    "stubhub-card": require(`../assets/images/prenotazioni/stubhub-card.png`),
    "stubhub-mobile": require(`../assets/images/prenotazioni/stubhub-mobile.svg`),
    "shop-online-mobile": require(`../assets/images/prenotazioni/online-shop-mobile.svg`),

    "visure-logo": require(`../assets/images/prenotazioni/visure-logo.svg`),

    "visure-card": require(`../assets/images/prenotazioni/visure-card.png`),
    "shop-online-card": require(`../assets/images/prenotazioni/shop-online-card.png`),
    "shop-online-logo": require(`../assets/images/prenotazioni/shop-online-logo.svg`),
    "shop-online-bg": require(`../assets/images/prenotazioni/shop-online-bg.png`),

    "energia-bg": require(`../assets/images/prenotazioni/energia.png`),

    ServiceDefault: require(`../assets/images/ServiceDefault.jpg`),
    ServiceBET: require(`../assets/images/ServiceBET.jpg`),
    ServiceBGM: require(`../assets/images/ServiceDefault.jpg`),
    ServiceBWN: require(`../assets/images/ServiceBWN.jpg`),
    ServicePKS: require(`../assets/images/ServicePKS.jpg`),
    ServicePPB: require(`../assets/images/ServicePPB.jpg`),
    ServiceSTC: require(`../assets/images/ServiceSTC.jpg`),
    ServiceWHL: require(`../assets/images/ServiceWHL.jpg`),
    ServiceBBT: require(`../assets/images/ServiceBGM.jpg`),
    // "visure-logo": require(`../assets/images/prenotazioni/stubhub.svg`),

    faturaBackground: require(`../assets/images/FaturaBackground.png`),
    mobileLoginGirl: require(`../assets/images/Banner Avvocato for Servizi Mobile.jpg`),

    // shop

    mainBanner: require(`../assets/shop/banner.jpg`),
    mainBanner2: require(`../assets/shop/banner2.jpg`),
    mainBanner3: require(`../assets/shop/banner3.jpg`),
    adidas: require(`../assets/shop/adidas.svg`),
    zara: require(`../assets/shop/zara.svg`),
    lacoste: require(`../assets/shop/lacoste.svg`),
    nike: require(`../assets/shop/nike.svg`),
    philipPlein: require(`../assets/shop/phillip-plein.svg`),
    calvinClein: require(`../assets/shop/calvin-klein.svg`),

    product: require(`../assets/shop/product.svg`),
    product2: require(`../assets/shop/product-2.svg`),

    promotionBottom: require(`../assets/shop/promotionBottom.svg`),

    bg1: require(`../assets/shop/Bg1.svg`),
    bg2: require(`../assets/shop/Bg2.svg`),
    bg3: require(`../assets/shop/Bg3.svg`),
    bg4: require(`../assets/shop/Bg4.svg`),
    informaticaelettronica: require(`../assets/shop/informaticaelettronica.svg`),
    sportfitness: require(`../assets/shop/sportfitness.svg`),
    sportrelax: require(`../assets/shop/sportfitness.svg`),

    casagiardino: require(`../assets/shop/casagiardino.jpg`),
    cucinagourmet: require(`../assets/shop/cucinagourmet.jpg`),
    giochibambini: require(`../assets/shop/giochibambini.jpg`),
    giocattolicostumi: require(`../assets/shop/giochibambini.jpg`),
    modaaccessori: require(`../assets/shop/modaaccessori.jpg`),
    outletofferte: require(`../assets/shop/Bg2.svg`),
    outletofferteMob: require(`../assets/shop/shopBannerMob.png`),
    offerterefurbished: require(`../assets/shop/Bg2.svg`),
    profumeriacosmesi: require(`../assets/shop/profumeriacosmesi.jpg`),
    salutebellezza: require(`../assets/shop/salutebellezza.jpg`),
    relaxtempolibero: require(`../assets/shop/relaxtempolibero.jpg`),

    regalioriginali: require(`../assets/shop/relaxtempolibero.jpg`),
    sexyshoperotico: require(`../assets/shop/sexyshoperotico.jpg`),

    tnt: require(`../assets/shop/tnt.png`),
    ups: require(`../assets/shop/ups.png`),
    ups_aereo: require(`../assets/shop/ups.png`),
    posteitaliane: require(`../assets/shop/posteitaliane.png`),
    gls: require(`../assets/shop/gls.png`),
    seur: require(`../assets/shop/seur.png`),
    dhl: require(`../assets/shop/dhl.png`),

    placeholder: require(`../assets/images/placeholder.jpg`),
    getLogoBySkinId: (e) => {
      return require(`../assets/images${
        e === 8 ? 6 : e === 51 ? 7 : e === 2 ? 1 : e
      }/logo.svg`);
    },
  };
} catch (err) {
  console.error("error", err);
}
export default imgObj;
