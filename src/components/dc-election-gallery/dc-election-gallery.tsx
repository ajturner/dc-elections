import { Component, Host, h, Prop, State } from '@stencil/core';
import * as Papa from 'papaparse';

@Component({
  tag: 'dc-election-gallery',
  styleUrl: 'dc-election-gallery.css',
  shadow: true,
})
export class DcElectionGallery {

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
    const candidatesFile = await fetch(filename);
    const candidatesText = await candidatesFile.text();
    const candidatesParse = Papa.parse(candidatesText, parseConfig);
    this.candidates = candidatesParse.data;

    // Skip first two columns: Candidate, Race
    this.questions = candidatesParse.meta.fields.slice(2).map((question) => {
      return {"question": question, groups: [
        {response: "Yes", candidates: ["c1", "c2"]},
        {response: "No", candidates: ["c3", "c4"]}
      ]}

    })

    console.log("DcElectionGallery: fetchCandidates", [candidatesParse, this.candidates, this.questions]);
    return [];
  }

  buildResponses() {

  }

  componentWillLoad() {
    this.fetchCandidates(this.filename);
  }
  render() {
    return (
      <Host>
        <slot></slot>
        {this.candidates.length} candidates
        <div class="gallery">
        {this.candidates.map((candidate) => {
          return (
            <dc-election-candidate 
              fullname={candidate["Candidate"]}
              office={candidate?.Race}
            ></dc-election-candidate>
          )
        })}
        </div>
        <h3>Questions</h3>
        <div class="questions">
          {this.questions.map((question) => {
          return (
            <dc-election-question 
              question={question.question}
              groups={question.groups}
            ></dc-election-question>
          )
        })}
        </div>
      </Host>
    );
  }

}
