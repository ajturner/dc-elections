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
  @Prop() groups: Array<any> = [];

  renderCandidates(candidates: Array<any> ) {
    return (
       candidates.map((candidate) => {
        return (<dc-election-candidate fullname={candidate}></dc-election-candidate>)
      })
    )
  }
  renderGroup(group) {
    return (
      <div>
      <span class="response">{group.response}</span>
      {this.renderCandidates(group.candidates)}
      </div>
    )
  }
  render() {
    return (
      <Host>
        <slot></slot>
        <span class="question">{this.question}</span>
        {this.groups.map((group) => {
          return (
            this.renderGroup(group)
          )
        })}
      </Host>
    );
  }

}
