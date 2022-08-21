// Parse responses
import * as Papa from 'papaparse';

// Get survey and return array of responses and candidates
export async function fetchResponses(filename: string): Promise<Array<any>> { 
  if(filename === null) {
    return [];
  }
  const candidatesFile = await fetch(filename);
  const candidatesText = await candidatesFile.text();
  
  const responses = parseResponse(candidatesText);
  return responses;
}


function parseResponse(responseText: string): Array<any> {

  // TODO: make parse configuration a Prop option
  const parseConfig = {
    header: true
  }

  const parseFile = Papa.parse(responseText, parseConfig);
  const parseData = parseFile.data;

  if(parseFile.meta.fields[0] === "Photo") {
    return parseColumnQuestions(parseFile, parseData);
  } else if (parseFile.meta.fields[0] === "Question #") {
    return parseRowQuestions(parseFile, parseData);
  } else {
    throw "Unrecognized file";
  }


}

// For responses files that have questions as columns and candidates in Rows
function parseColumnQuestions( parseFile: any, parseData: any ):Array<any> {

  console.log("parseFile", [parseFile, parseFile.meta.fields]);
  console.log("parseData", [parseData, parseData]);
  let questions = [];

  // Skip first three columns: Photo, Candidate, Race
  questions = parseFile.meta.fields.slice(3).map((question) => {
    const responses = groupQuestionResponses(question, parseData);
    return { question, responses }
  })
  return questions;
}

// For responses files that have questions as rows and candidates in Columns
function parseRowQuestions(_parseFile: any, _parseData: any ):Array<any> {
  // const candidates = parseData.meta.fields.slice(3).map((candidate) => {
    
  // })

  return [];
}

/** Always returns a valid answer
* if empty response, return 'No Response'
*/ 
function validateAnswer( answer:string, defaultAswer:string = "No Response" ): string {
  if(!answer || answer.length === 0) {
    return defaultAswer;
  }
    
  return answer;
}
// Create an index of responses to set of candidates
function groupQuestionResponses(question:string, candidates: Array<any>): Array<any> {
  const responses = [];

  console.log("candidates", candidates)
  // For each candidate, lookup their response to a question,
  // then add to the groups responses
  candidates.map((candidate) => {

    // Lookup the candidate's answer to a given question
    const answer = validateAnswer( candidate[question] );

    // Find out if other candidates have provided this answer
    let response = responses.find((_response) => { return _response.response === answer });

    // Add the response to the set if it doesn't exist yet.
    if(!response) {
      const length = responses.push( { response:answer, candidates: [ ] } )
      response = responses[length-1];
    }

    // Add this candidate to the cohort of responses
    response.candidates.push( candidate );
  })

  return responses;
}