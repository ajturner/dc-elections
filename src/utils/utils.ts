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

export function sortShuffle(array: Array<any>, attribute:string = "Race", order:string = "asc"): Array<any> {
  
  // For the ternary below we want to use order to create a boolean
  const orderResp = order === "asc" ? 1 : -1;

  return array.sort((a, b) => {
    return a[attribute] > b[attribute] ? orderResp : -orderResp;
  })
}

// TODO: add option for what type of shuffle: sort | random, and attribute
export function shuffle(array: Array<any>, _attribute?:string, _order?:string): Array<any> {
  return sortShuffle(array, _attribute, _order);
}