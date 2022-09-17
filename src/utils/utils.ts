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
    // console.debug("sortShuffle", {a, b, attribute, order})

    let alpha = a[attribute];
    let beta = b[attribute];
    if(alpha === undefined && a['candidates'] && a['candidates'][attribute] !== undefined ) {
      alpha = a['candidates'][attribute];
      beta = b['candidates'][attribute];
    }
    // console.debug(`compare: [${alpha > beta}] ${a[attribute]} > ${b[attribute]}`, {a, b, alpha, beta, attribute})
    
    return alpha > beta ? orderResp : -orderResp;
  })
}

// TODO: add option for what type of shuffle: sort | random, and attribute
export function shuffle(array: Array<any>, _attribute?:string, _order?:string): Array<any> {
  
  const response = sortShuffle(array, _attribute, _order);
  return response;
}