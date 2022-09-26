// Parse responses
import * as Papa from 'papaparse';

export enum ISurveyQuestionType {
  Text = 'Open-Ended Response',
  Choice = 'Response',
  Rank = 'Rank',
  Option = 'Option'
}
export interface ISurveyQuestion {
  Question: string;
  Type: ISurveyQuestionType
  Options?: Array<string>
  Sort?: Array<ISurveySort> // sort option on responses
  Index?: string // Spreadsheet column/row index
}
export interface ISurveySort {
  order:string
  attribute: string
}

export interface ISurveyCandidate {
  Photo: string;
  Candidate: string;
  Race?: string;
  Website?: string
  // Answers based on Question as a key
  [index: string]: string;
}
// TODO Change these to ISurveyQuestionAggregation + ISurveyResponse below
export interface ISurveyResponse {
  question: ISurveyQuestion;
  responses: Array<ISurveySummary>;
}

export interface ISurveySummary {
  response: string
  candidates: Array<ISurveyCandidate>
}

// Get candidates from DC BOEE list
export async function fetchCandidates(filename:string):Promise<any> {
  const file = await fetch(filename);
  const responseText = await file.text();
  const parseConfig = {
    header: true
  }

  const parseFile = Papa.parse(responseText, parseConfig);
  const parseData = parseFile.data;

  // parseFile.meta.fields
  const response = parseData.reduce((candidateIndex, candidate) => {

    if(candidateIndex[candidate['Race']] === undefined) {
      candidateIndex[candidate['Race']] = {
        race: candidate['Race'],
        candidates: []
      }
    }
    candidateIndex[candidate['Race']].candidates.push({
      Race: candidate['Race'],
      Candidate: candidate['Name'],
      Website: candidate['Website']
    })
    return candidateIndex;

  }, {});
  return response;
}
// Get survey and return array of responses and candidates
export async function fetchResponses(filename: string, format: string = "column"): Promise<Array<ISurveyResponse>> { 
  if(filename === null) {
    return [];
  }
  const candidatesFile = await fetch(filename);
  const candidatesText = await candidatesFile.text();
  try {
    
    const responses = parseResponse(candidatesText, format);
    return responses;  
  } catch (error) {
    console.error("Error parsing file: ", {filename, error})
    console.error("test", candidatesText)
  }
}

// 
function parseResponse(responseText: string, format: string = "column"): Array<ISurveyResponse> {

  // TODO: make parse configuration a Prop option
  const parseConfig = {
    header: (format !== "surveymonkey")
  }

  const parseFile = Papa.parse(responseText, parseConfig);
  const parseData = parseFile.data;
  // console.debug("parseData", parseData);

  if (parseData[0][0] === "Respondent ID") {
    // Default SurveyMoneky output
      return parseSurveyMonkeyQuestions(parseFile, parseData);
  } else if(parseFile.meta.fields && parseFile.meta.fields[0] === "Photo") {
    return parseColumnQuestions(parseFile, parseData);
  } else if (parseFile.meta.fields && parseFile.meta.fields[0] === "Question") {
    return parseRowQuestions(parseFile, parseData);
  } else {
    console.debug("dc-election parseResponse: Unrecognized file type", {parseFile})
    throw "dc-election parseResponse: Unrecognized file type";
  }


}

// For responses files that are direct export from SurveyMonkey
// Row 1: Respondent ID,Collector ID,Start Date,End Date,IP Address,Email Address,First Name,Last Name,Custom Data 1,Contact information,,,,Select the Advisory Neighborhood Commission in which you are running:,Select the SMD in which you are running:,"Please upload a photo of yourself, preferably a headshot, that GGWash has your permission to use in its materials related to the 2022 election and endorsements process in DC, which may include publication on our website, in emails, on social media, or in other formats.","Where in your Advisory Neighborhood Commission, not just your SMD, do you think density should be increased to accommodate the construction of new housing?If you do not think density should be increased in your ANC, please write, ""I do not think density should be increased in my ANC.”","The District’s inclusionary zoning law “requires that eight to 10 percent of the residential floor area be set-aside for affordable units in most new residential development projects of 10 or more units.” The cost of doing so is paid by a project’s developer. Because the number of IZ units is tied to floor-area ratio, the larger a building is, the more IZ units will be built. Conversely, if the initial density proposed by a developer is reduced during the approvals process, rather than maintained or increased, fewer IZ units will be built. ANC commissioners are likely to hear from some constituents concerned by a project’s potential impact—real or assumed—on traffic, parking, views, and property values and rents, and whether it fits the character of the neighborhood. While it is not a guarantee that a development proposal including IZ units will come before your ANC, if one does, what would you do, given the likelihood of at least some pushback?","Planned unit developments are projects in which developers are able to exceed the height and density allowed by the District’s zoning code up to the density allowed by its Future Land Use Map (typically a modest increase in scale) in exchange for a community benefits agreement. While it is not a guarantee that a PUD will be proposed in your ANC, if one is, the commission is likely to be the party negotiating that community benefits agreement with a developer.The following are examples of benefits that an ANC might push for in such an agreement. Please rank them in the order in which you would prioritize them. If you would not consider a particular benefit at all, please select N/A in that row.",,,,,,,,Should apartments be legal to build District-wide?,Which of these statements best describes your feelings about historic districts and landmarks in the District?,"The District is likely to begin a rewrite of its Comprehensive Plan, its foundational land-use document, in 2025. In a rewrite of the Comprehensive Plan, which of these three options would be your top priority?",Which statement do you agree with most? ,"My ANC, not just my SMD, has:","Do you think there are not enough cars, enough cars, or too many cars in the District?",Do you think inducing residents and visitors to drive less should be an explicit policy goal of the District?,"On-street parking occurs in public space. This means that an on-street parking spot does not belong to a specific individual, and people park in different places at different times. What do you consider a reasonable rule of thumb for deciding if a neighborhood has enough street parking?","Do you support the projects in the bus priority plan in your ANC and, if necessary, would you support removing parking or travel lanes so that they can be built?","Do you support the projects in the bicycle priority network plan in your ANC, and, if necessary, would you support removing parking or travel lanes so that they can be built?","If there are projects in either plan in your ANC, choose one—bus or bike—and discuss what you see as its benefits, weaknesses, or both. If there are no projects in your ANC, please write, “N/A.”","The District's goal to be carbon-free by 2050 requires most of the reduction of its transportation emissions to come from residents turning existing single-occupancy vehicle trips into transit, walking, and biking trips. Please describe at least one trip you currently take by car (even if you, yourself, are not driving) that you can commit to taking on foot, by bus, by train, via a mobility device, or by bike instead.","First, what do you feel is the biggest issue in your neighborhood, and what is your position on it? Second, given the limited scope of commissioners’ and commissions’ authority, what would you, most realistically, do about that issue if you are elected?",,Why do you think you are the right person to serve as an ANC commissioner for your SMD?
// Row 2: ,,,,,,,,,Name,Email,Campaign-related social media accounts,"Fundraising link, if applicable (if not, please write ""N/A"")",Response,Response,Open-Ended Response,Open-Ended Response,Response,More inclusionary zoning units than are required by District law,Inclusionary zoning units restricted to lower income levels than initially proposed by the developer,Inclusionary zoning units with more than one bedroom,"Parks, landscaping, and/or public art",A Capital Bikeshare station,"Improvements or repairs to, or replacement of, streets and sidewalks","Direct cash payments to local organizations, such as civic associations and ANCs",Direct cash payments to local schools and youth programs,Response,Response,Response,Response,Response,Response,Response,Response,Response,Response,Open-Ended Response,Open-Ended Response,"I feel the biggest issue in my neighborhood is, and my position on it is:","If elected, I would:",Open-Ended Response
function parseSurveyMonkeyQuestions( _parseFile: any, parseData: any ):Array<ISurveyResponse> {
  let questions:Array<ISurveyQuestion> = [];

  //// 
  // indexes for working with spreadsheet
  const questionColumnStart = 16;
  const responseRowStart = 2;
  const idColumn = 0;
  const nameColumn = 9;
  const ancColumn = 13; // TODO fix this hard-coding of the schema
  const smdColumn = 14;
  const photoColumn = 15;
  
  // Row 1 is questions, Row 2 is question metadata
  const questionRow = 0;
  const metaRow = 1;
  ///

  // Get array of structured questions
  questions = parseData[questionRow].slice(questionColumnStart).reduce((questionArray, question, index) => {
    const metaIndex = index + questionColumnStart;
    let questionType = parseData[metaRow][metaIndex];
    let options = [];

    // Store the question, or add the Option to the previous Rank type question
    if(question && question.length !== 0) {

      // If this is a unique string it's a rank choice option
      if(! Object.values(ISurveyQuestionType).includes(questionType)) {
        // If second row has text it is a ranking option. Save this to the options and set the type to Rank
        options.push(questionType);
        questionType = ISurveyQuestionType.Rank;
      }

      let q = {
        Question: question, 
        Type: questionType,
        Sort: sortQuestionByType(questionType),
        Options: options,
        Index: metaIndex
      };
      
      questionArray.push(q)
    } else {
      // Rank question option. Add to array of previous question
      const lastQuestion = questionArray[questionArray.length-1];
      lastQuestion.Options.push(questionType)
    }

    return questionArray;
  }, []);

  // console.debug("questions", questions)
  
  // Now get candidates and their responses
  const respondants = parseData.slice(responseRowStart).reduce((responseArray, response) =>  {
    let candidate:ISurveyCandidate = {
      Candidate: response[nameColumn],
      Photo: `2022/${response[idColumn]}_${response[photoColumn]}`,
      Race: response[ancColumn] + response[smdColumn]
    }
    // console.debug({candidate})
    responseArray.push(candidate);
    questions.map((question) => {
      
      if (question.Type === ISurveyQuestionType.Rank) {
        // for Rank questions, build array of answers as CSV string: "1|#option,2|#option,3|#option"
        let rankedOptions = [];
        
        // loop through options until next question
        // 
        const optionIndexBegin:number = +question.Index;
        question.Options.map((rankOption, optionIndex) => {
          const rankIndex = response[optionIndex+optionIndexBegin];
          
          rankOption = formatRankOption(rankOption, "would not prioritize", rankIndex.toString(), true)
          rankedOptions.push(rankOption);
        })
        
        candidate[question.Question] = compileRankedOptions(rankedOptions);
      } else {
        candidate[question.Question] = response[question.Index];
      }
      
    });

    return responseArray;
  }, []);

  // TODO: determine if can be optimized to not double loop array
  const survey:Array<ISurveyResponse> = questions.map((question) => {
    const responses = groupQuestionResponses(question.Question, respondants);
    const surveyResponse:ISurveyResponse = { question, responses };
    return surveyResponse;
  })

  return survey;
}

// Determines sort attribute + order of responses by type
function sortQuestionByType(questionType:string): Array<ISurveySort> {
  switch(questionType) {
    case ISurveyQuestionType.Text:
      return [{attribute: 'Race', order: 'asc'}, {attribute: 'Candidate', order: 'asc'}];
    case ISurveyQuestionType.Rank:
      return [{attribute: 'Race', order: 'asc'}, {attribute: 'Candidate', order: 'asc'}];
    case ISurveyQuestionType.Option:
    case ISurveyQuestionType.Choice:
    default: 
      return [{attribute: 'response', order: 'asc'}, {attribute: 'Race', order: 'asc'}, {attribute: 'Candidate', order: 'asc'}];
  }

}

// For responses files that have questions as columns and candidates in Rows
function parseColumnQuestions( parseFile: any, parseData: any ):Array<ISurveyResponse> {

  // console.log("parseFile", [parseFile, parseFile.meta.fields]);
  // console.log("parseData", [parseData, parseData]);
  let questions:Array<ISurveyResponse> = [];

  // Skip first three columns: Photo, Candidate, Race
  questions = parseFile.meta.fields.slice(3).map((question) => {
    const responses = groupQuestionResponses(question, parseData);

    return { question: { 
      Question: question, 
      Type: ISurveyQuestionType.Choice,
      Sort: sortQuestionByType(ISurveyQuestionType.Choice)
    }, responses }
  })
  return questions;
}

// return the last name, but ignore suffix (Sr, III)
// Only works for last names with at least 4 characters
function findLastName(fullName:string):string {
  const matches = fullName.match(/\w+(?!.*[\w]{4,})/);
  return !!matches ? matches[0] : '';
}

function compileRankedOptions(rankedOptions:Array<string>) {
  return rankedOptions.sort().map((s)=> {return s.replace(/^.*\|/,'')}).join('|');
}

function formatRankOption(rankOption:string, rankedComment:string, rankIndex:string, rankOrdered:boolean):string {
  let rankOutput = "";
  // Candidate said they did not agree with this option
  if(rankIndex === '0' || rankIndex === '' || rankIndex === 'N/A') {
    rankOutput = `~${rankOption}~ (${rankedComment})`; 
    rankIndex = '1000';
  } else if(rankOrdered) {
    // the list should include numbers: 3|#option
    rankOutput = `${rankIndex}|#${rankOption}`;
  } else {
    rankOutput = `${rankIndex}|${rankOption}`;
  }

  return rankOutput;
}

// For responses files that have questions as rows and candidates in Columns
function parseRowQuestions(parseFile: any, parseData: any ):Array<ISurveyResponse> {

  // console.log("parseRowQuestions: [parseFile, parseData]", [parseFile, parseData]);
  // Question #, Type, Question, Sub question, ...[candidate last names]
  const candidates = parseFile.meta.fields.slice(3).map((candidate) => {
    // TODO: fix default candidate race from at-large to a candidate directory?
    let photo = findLastName(candidate);
    let formattedCandidate = {Candidate: candidate, Photo: `${photo}.jpg`, Race: 'At-Large'};

    // RANKED OPTIONS
    // Flag if currently gathering Rank options
    let rankedOptions = [];
    let rankedComment = null; // will be used from sub-question on rank question
    let rankOrdered = false; // determine if the options were 'ordered' like 1,2,3.. or just chosen from list
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
        let orderFlag = null;
        // value like 'would not vote for|unordered'
        [rankedComment,orderFlag] = row['Sub question'].split('|');
        rankOrdered = !!orderFlag && orderFlag === 'ordered';

      } else if (row['Type'] === ISurveyQuestionType.Option) {
        // The candidate cell (question row/candidate column) will have a number 0-Number options
        // if 0, consider lowest ranked and mark "will not pursue" with a tilde ~
        let rankIndex = row[candidate];
        let rankOption = row['Sub question'];

        rankOption = formatRankOption(rankOption, rankedComment, rankIndex, rankOrdered);
        
        // If the option was not selected
        if(!!rankOption) {
          // Add index and then sort
          rankedOptions.push(rankOption)
        }
        // serialize the answer in case this is the last option
        // remove the number prefix, e.g. '4|My Answer' -> 'My Answer'
        answer = compileRankedOptions(rankedOptions);
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
  const questions:Array<ISurveyResponse> = parseData.filter((question) => {
    // We aggregated Rank + Options, so keep out of summary
    return question.Type !== ISurveyQuestionType.Option; 
  }).map((question) => {
    // Don't group rank/options
    const group = question.Type === ISurveyQuestionType.Rank ? false : true;
    const responses = groupQuestionResponses(question.Question, candidates, group);

    
    question.Sort = sortQuestionByType(question.Type);
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
function groupQuestionResponses(question:string, candidates: Array<ISurveyCandidate>, group: boolean = true): Array<ISurveySummary> {
  const responses = [];

  // console.log("groupQuestionResponses: candidates", {question, candidates})
  // For each candidate, lookup their response to a question,
  // then add to the groups responses
  candidates.map((candidate) => {

    // Lookup the candidate's answer to a given question
    const answer = validateAnswer( candidate[question] );
    let response = null;
    
    // Find out if other candidates have provided this answer
    if(group) {
      response = responses.find((_response) => { return _response.response === answer });
    }

    // Add the response to the set if it doesn't exist yet.
    if(!response) {
      const length = responses.push( { response:answer, candidates: [ ] } )
      response = responses[length-1];
    }

    // Add this candidate to the cohort of responses
    response.candidates.push( candidate );
  })
  // console.debug("groupQuestionResponses", {question, responses, candidates})

  return responses;
}