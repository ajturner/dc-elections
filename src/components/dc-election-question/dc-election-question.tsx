import { Component, Host, h, Prop } from '@stencil/core';
import { shuffle } from '../../utils/utils';
@Component({
  tag: 'dc-election-question',
  styleUrl: 'dc-election-question.css',
  shadow: true,
})
export class DcElectionQuestion {

  @Prop() question: string = null;
  @Prop() showNoResponse: boolean = false;e

  /**
  * Holds an Array of answers to candidates
  * [ 
  *   {response: "Yes", "candidates": ["C1", "C2"]}, 
  *   {response: "No", "candidates": ["C3", "C4"]} 
  * ]
  */
  @Prop() responses: Array<any> = [];

  renderCandidates(candidates: Array<any> ) {

    return (
       shuffle(candidates, "Race").map((candidate) => {
        return (<dc-election-candidate photo={candidate.Photo} fullname={candidate.Candidate} office={candidate.Race}></dc-election-candidate>)
      })
    )
  }
  
  renderResponse(response, responseCount:number = 2) {
    
    // TODO: remove the prior change of this default response.
    if(response.response !== "No Response") {
      // remove numeric prefix like `1. answer` -> `answer`
      let formattedString = response.response.replace(/^[0-9]\.\s+/, '')
      
      return (
        <div class="response-gallery">
          <dc-election-gallery 
              appearance={responseCount > 3 ? 'narrow':'grid'} 
              candidates={shuffle(response.candidates, "Race")}>
            <div class="response">{formattedString}</div>
          </dc-election-gallery>
        </div>
      )
    } else if(this.showNoResponse) {
      const names = response.candidates.map((c) => {
        return (c?.Candidate)
      })
      return (
        <div class="footnote">No response from {shuffle(names).join(', ')}</div>
      )
    }

    // otherwise no response;
  }
  renderQuestion(question: string):string {
    let formattedString = question.replace(/_(.*)_/g, '<span class="preface">$1</span>');

    return (
      <div class="question" innerHTML={formattedString} />
    );
  }

  render() {
    return (
      <Host>
        <slot></slot>
        {this.renderQuestion(this.question)}
        <div class="graphic">
          {shuffle(this.responses, "response", "asc").map((response) => {
            return (
              this.renderResponse(response, this.responses.length)
            )
          })}
        </div>
      </Host>
    );
  }

}
