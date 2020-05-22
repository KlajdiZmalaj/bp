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
  },
  0: {
    cel: "",
    mail: "",
    address: ``,
    name: "",
  },
  1: {
    cel: "+39 0541 087890",
    mail: "info@bpoint.store",
    address: `Viale XXIII Settembre 1845 n. 67
    Rimini (RN) Italia`,
    name: "BPoint",
  },
  3: {
    cel: "+39 0906782360",
    mail: "info@derbypoint.it",
    address: `Via Don Giovanni Minzoni, 199 A
    98123 MESSINA, ITALIA`,
    name: "Derbypoint",
  },
  4: {
    cel: "+39 0774 503745",
    mail: "amministrazione@planetservizi.com",
    address: `Via Rapagnano 90/92
    00138 Roma (RM) Italia`,
    name: "Planetservizi",
  },
  5: {
    cel: "+39 392 1431998",
    mail: "info@gfbwin.it",
    address: ` Via del Corso, 23 Roma, ITALIA`,
    name: "Gfbwin",
  },
};
