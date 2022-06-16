// Fisher-Yates (Knuth) array shuffle from http://sedition.com/perl/javascript-fy.html
export function randomShuffle(array: Array<any>): Array<any> {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export function sortShuffle(array: Array<any>, attribute:string = "Race"): Array<any> {
  return array.sort((a, b) => {
    return a[attribute] > b[attribute] ? 1 : -1;
  })
}

// TODO: add option for what type of shuffle: sort | random, and attribute
export function shuffle(array: Array<any>): Array<any> {
  return sortShuffle(array);
}