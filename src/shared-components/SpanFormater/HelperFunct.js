export function longer(champ, contender) {
  return contender.length > champ.length ? contender : champ;
}
export function longestWord(str) {
  var words = str.split(" ");
  return words.reduce(longer);
}
export function returnNumberThatPasses(WordsLength, size) {
  let count = 0;
  for (let i = 0; i < WordsLength.length; i++) {
    if (WordsLength[i].length >= size) {
      count++;
    }
  }
  return count;
}
