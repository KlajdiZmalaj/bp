export let skinID = 0;
var skinName = location.href;
if (skinName.includes("bpoint")) {
  skinID = 1;
} else if (skinName.includes("derby")) {
  skinID = 3;
} else if (skinName.includes("planet")) {
  skinID = 4;
} else if (skinName.includes("bwin")) {
  skinID = 5;
}

export const skinTexts = {
  1: {
    cel: "+39 0541 087890",
    mail: "info@bpoint.store",
  },
};
