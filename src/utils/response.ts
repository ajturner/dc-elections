// Parse responses
import * as Papa from 'papaparse';

export enum ISurveyQuestionType {
  Text = 'Text',
  Rank = 'Rank',
  Choice = 'Choice',
  Option = 'Option'
}
export interface ISurveyQuestion {
  Question: string;
  Type: ISurveyQuestionType
}


export interface ISurveyCandidate {
  Photo: string;
  Candidate: string;
  Race?: string;
  // Answers
  [index: string]: string;
}
export interface ISurveyResponse {
  question: ISurveyQuestion;
  responses: Array<ISurveyCandidate>;
}

// Get survey and return array of responses and candidates
export async function fetchResponses(filename: string): Promise<Array<ISurveyResponse>> { 
  if(filename === null) {
    return [];
  }
  const candidatesFile = await fetch(filename);
  const candidatesText = await candidatesFile.text();
  
  const responses = parseResponse(candidatesText);

  return responses;
}

// 
function parseResponse(responseText: string): Array<ISurveyResponse> {

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
function parseColumnQuestions( parseFile: any, parseData: any ):Array<ISurveyResponse> {

  // console.log("parseFile", [parseFile, parseFile.meta.fields]);
  // console.log("parseData", [parseData, parseData]);
  let questions = [];

  // Skip first three columns: Photo, Candidate, Race
  questions = parseFile.meta.fields.slice(3).map((question) => {
    const responses = groupQuestionResponses(question, parseData);
    return { question: { Question: question, Type: ISurveyQuestionType.Choice }, responses }
  })
  return questions;
}

// For responses files that have questions as rows and candidates in Columns
function parseRowQuestions(parseFile: any, parseData: any ):Array<ISurveyResponse> {

  // console.log("parseRowQuestions: [parseFile, parseData]", [parseFile, parseData]);
  // Question #, Type, Question, Sub question, ...[candidate last names]
  const candidates = parseFile.meta.fields.slice(4).map((candidate) => {
    // TODO: fix default candidate race from at-large to a candidate directory?
    let formattedCandidate = {Candidate: candidate, Photo: `${candidate}.jpg`, Race: 'At-Large'};

    // RANKED OPTIONS
    // Flag if currently gathering Rank options
    let rankedOptions = [];
    // ---

    // Each row is a question (or sub-question)
    // Add the question + their response to the candidate index
    parseData.map((row) => {
      const question = row['Question'];
      let answer:string = null; // we'll build the answer depending on type

      // If the question is ranked-choice, gather respondants answers in order
      // TODO: move this into a function
      if(row['Type'] === ISurveyQuestionType.Rank) {
        rankedOptions = [];
      
      } else if (row['Type'] === ISurveyQuestionType.Option) {
        // The candidate cell (question row/candidate column) will have a number 0-Number options
        // if 0, consider lowest ranked and mark "will not pursue" with a tilde ~
        let rankIndex = row[candidate];
        let rankOption = row['Sub question'];
        if(rankIndex === '0' ) {
          rankOption = '~' + rankOption + '~'; // + operator faster than other methods
          rankIndex = 1000;
        } else if(rankIndex === '' ) {
          // When there was an unselected option
          rankOption = null;
        } else {
          rankOption = `${rankIndex}) ${rankOption}`;
        }

        // If the option was not selected
        if(!!rankOption) {
          // Add index and then sort
          rankedOptions.push(rankOption)
        }
        // serialize the answer in case this is the last option
        answer = rankedOptions.sort().map(s => {return s.replace(/\d\)/,'')}).join('|');
      } else {
        // done processing
        answer = row[candidate];
      }

      // Don't save the response unless there is an answer
      if(!!answer) {
        // console.debug("response: parse answers", answer);
        formattedCandidate[question] = answer;
      }
    })

    return formattedCandidate;
  })

  // Loop back over the questions and group
  const questions = parseData.filter((question) => {
    // We aggregated Rank + Options, so keep out of summary
    return question.Type !== ISurveyQuestionType.Option; 
  }).map((question) => {
    const responses = groupQuestionResponses(question.Question, candidates);
    return { question, responses }
  });

  // console.log("parseRowQuestions: {candidates}", {candidates, questions})

  return questions;
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

  // console.log("groupQuestionResponses: candidates", {question, candidates})
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