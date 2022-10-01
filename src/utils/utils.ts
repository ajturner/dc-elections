import { ISurveySort } from "./response";

const filterName = "location-filter";

// Get current window bookmark
export function getFilterBookmark() {
  let filter = "";
  var url = window?.location?.search;
  
  let searchParams = new URLSearchParams(url);

  // console.debug("getFilterBookmark", {url, value: searchParams.get(filterName), searchParams})

  if(searchParams.has(filterName)) {
    filter = searchParams.get(filterName)
  }
  return filter;
  // window.location.search = searchParams;
}

export function setFilterBookmark(filter: string) {
  //@ts-ignore
  const url = new URL(window.location);

  if(!!filter && filter.length !== 0) {
    url.searchParams.set(filterName, filter);
  } else {
    url.searchParams.delete(filterName);
  }
  window.history.pushState({}, '', url);  

}

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

function getShuffleComparisons(a, b, attribute): Array<any> {

    let alpha = a[attribute];
    let beta = b[attribute];
    if(alpha === undefined && a['candidates'] && a['candidates'][0] && a['candidates'][0][attribute] !== undefined ) {
      alpha = a['candidates'][0][attribute];
      beta = b['candidates'][0][attribute];
    }

    return [alpha, beta]
} 
export function sortShuffle(array: Array<any>, sort:Array<ISurveySort>): Array<any> {
  
  return array.sort((a, b) => {
    // console.debug("sortShuffle", {a, b, attribute, order})
    // For the ternary below we want to use order to create a boolean
    let orderResp = sort[0].order === "asc" ? 1 : -1;
    let attribute = sort[0].attribute;
    
    let [alpha, beta] = getShuffleComparisons(a,b, attribute)
    let index = 1;

    // iterate through 
    while(alpha === beta && sort[index] !== undefined) {
      orderResp = sort[index].order === "asc" ? 1 : -1;
      attribute = sort[index].attribute;
      [alpha, beta] = getShuffleComparisons(a,b, attribute)
      index++;
    }
    // console.debug(`compare: [${alpha > beta}]`, {a, b, alpha, beta, attribute, sort})
    
    return alpha > beta ? orderResp : -orderResp;
  })
}

// TODO: add option for what type of shuffle: sort | random, and attribute
export function shuffle(array: Array<any>, sort:Array<ISurveySort>): Array<any> {
  // console.debug("shuffle", array);
  const response = sortShuffle(array, sort);
  return response;
}