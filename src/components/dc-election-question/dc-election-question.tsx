import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'dc-election-question',
  styleUrl: 'dc-election-question.css',
  shadow: true,
})
export class DcElectionQuestion {

  @Prop() question: string = null;

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
       candidates.map((candidate) => {
        return (<dc-election-candidate fullname={candidate.Candidate} office={candidate.Race}></dc-election-candidate>)
      })
    )
  }
  renderResponse(response) {
    console.log("DcElectionQuestion: renderResponse", {
      response
    });
    return (
      <dc-election-gallery candidates={response.candidates}>
        <div class="response">{response.response}</div>
      </dc-election-gallery>
      
    )
  }
  render() {
    return (
      <Host>
        <slot></slot>
        <div class="question">{this.question}</div>
        {this.responses.map((response) => {
          return (
            this.renderResponse(response)
          )
        })}
      </Host>
    );
  }

}
