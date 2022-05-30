import { Component, Host, h, Prop, State } from '@stencil/core';
import * as Papa from 'papaparse';

@Component({
  tag: 'dc-election-survey',
  styleUrl: 'dc-election-survey.css',
  shadow: true,
})
export class DcElectionSurvey {
  @Prop() filename:string = null;

  @State() candidates: Array<any> = [];
  @State() questions: Array<any> = [];

async fetchCandidates(filename: string): Promise<Array<any>> { 
    if(filename === null) {
      return [];
    }
    // TODO: make parse configuration a Prop option
    const parseConfig = {
      header: true
    }
    // Convert the file into a structured candidates object
    // [ { "Candidate": "Jane Doe", "Race": "Mayor", ...questions:answers}]
    const candidatesFile = await fetch(filename);
    const candidatesText = await candidatesFile.text();
    const candidatesParse = Papa.parse(candidatesText, parseConfig);
    this.candidates = candidatesParse.data;

    // Skip first two columns: Candidate, Race
    this.questions = candidatesParse.meta.fields.slice(2).map((question) => {
      const responses = this.groupQuestionResponses(question, this.candidates);
      return { question, responses }
      // return {"question": question, responses: [
      //   {response: "Yes", candidates: ["c1", "c2"]},
      //   {response: "No", candidates: ["c3", "c4"]}
      // ]}

    })

    console.log("DcElectionGallery: fetchCandidates", [candidatesParse, this.candidates, this.questions]);
    return [];
  }

  /** Always returns a valid answer
  * if empty response, return 'No Response'
  */ 
  validateAnswer( answer:string, defaultAswer:string = "No Response" ): string {
    if(!answer || answer.length === 0) {
      return defaultAswer;
    }
     
    return answer;
  }
  // Create an index of responses to set of candidates
  groupQuestionResponses(question:string, candidates: Array<any>): Array<any> {
    const responses = [];

    // For each candidate, lookup their response to a question,
    // then add to the groups responses
    candidates.map((candidate) => {

      // Lookup the candidate's answer to a given question
      const answer = this.validateAnswer( candidate[question] );

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

    console.log("DcElectionGallery: groupQuestionResponses", {
      question,
      candidates,
      responses
    })

    return responses;
  }

  componentWillLoad() {
    this.fetchCandidates(this.filename);
  }
  render() {
    return (
      <Host>
        <slot></slot>
        <div class="questions">
          {this.questions.map((question) => {
          return (
            <dc-election-question 
              question={question.question}
              responses={question.responses}
            ></dc-election-question>
          )
        })}
        </div>        
      </Host>
    );
  }

}
