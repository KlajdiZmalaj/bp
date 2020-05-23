export let skinID = 0;
var skinName = window.location.href;
if (skinName.includes("bpoint")) {
  skinID = 1;
} else if (skinName.includes("derby")) {
  skinID = 3;
} else if (skinName.includes("planet")) {
  skinID = 4;
} else if (skinName.includes("bwin")) {
  skinID = 5;
} else if (skinName.includes("localhost")) {
  skinID = 999;
}
export const skinTexts = {
  999: {
    cel: "123",
    mail: "localmail",
    address: `local add`,
    name: "local host",
    link1: "#",
    link2: "#",
    link3: "#",
    link4: "#",
    link5: "#",
    ig: "#",
    pin: "#",
    yt: "#",
  },
  0: {
    cel: "",
    mail: "",
    address: ``,
    name: "",
    link1: "#",
    link2: "#",
    link3: "#",
    link4: "#",
    link5: "#",
    ig: "#",
    pin: "#",
    yt: "#",
  },
  1: {
    cel: "+39 0541 087890",
    mail: "info@bpoint.store",
    address: `Viale XXIII Settembre 1845 n. 67
    Rimini (RN) Italia`,
    name: "BPoint",
    link1: "https://bpoint.store/chi-siamo/",
    link2: "https://bpoint.store/servizi/",
    link3: "https://bpoint.store/",
    link4: "https://bpoint.store/contatti/",
    link5: "https://bpoint.store/affiliazioni/",
    ig: "#",
    pin: "#",
    yt: "#",
  },
  3: {
    cel: "+39 0906782360",
    mail: "info@derbypoint.it",
    address: `Via Don Giovanni Minzoni, 199 A
    98123 MESSINA, ITALIA`,
    name: "Derbypoint",
    link1: "https://derbypoint.it/chi-siamo/",
    link2: "https://derbypoint.it/servizi/",
    link3: "https://derbypoint.it/",
    link4: "https://derbypoint.it/contatti/",
    link5: "https://derbypoint.it/affiliazioni/",
    ig: "#",
    pin: "#",
    yt: "#",
  },
  4: {
    cel: "+39 0774 503745",
    mail: "amministrazione@planetservizi.com",
    address: `Via Rapagnano 90/92
    00138 Roma (RM) Italia`,
    name: "Planetservizi",
    link1: "https://planetservizi.it/chi-siamo/",
    link2: "https://planetservizi.it/servizi/",
    link3: "https://planetservizi.it/",
    link4: "https://planetservizi.it/contatti/",
    link5: "https://planetservizi.it/affiliazioni/",
    ig: "#",
    pin: "#",
    yt: "#",
  },
  5: {
    cel: "+39 392 1431998",
    mail: "info@gfbwin.it",
    address: ` Via del Corso, 23 Roma, ITALIA`,
    name: "Gfbwin",
    link1: "https://gfbwin.store/chi-siamo/",
    link2: "https://gfbwin.store/servizi/",
    link3: "https://gfbwin.store/",
    link4: "https://gfbwin.store/contatti/",
    link5: "https://gfbwin.store/affiliazioni/",
    ig: "#",
    pin: "#",
    yt: "#",
  },
};
