import { Component, Host, h, Prop, State } from '@stencil/core';
import { ISurveyQuestionType } from '../../utils/response';
import { shuffle } from '../../utils/utils';

@Component({
  tag: 'dc-survey-summary',
  styleUrl: 'dc-survey-summary.scss',
  shadow: true,
})
export class DcSurveySummary {

  @Prop() questions = null;
  @State() numberResponses:number = 180;

  calculatePercentage(value: number): number {
    return Math.ceil(value / this.numberResponses * 100)
  }
  renderEnumerationSummary(question) {
    // console.debug("dc-survey-summary: renderEnumeration", {question});
    const responses = shuffle(question.responses, question.question.Sort);
    return (
      <dl>
        <dt class="question"><dc-election-query question={question.question}></dc-election-query></dt>
        {responses.map((response) => {
          return (<dd class={`percentage percentage-${this.calculatePercentage(response.candidates.length)}`}>
            <span class="text">{response.response.replace(/^\d+\./,'')}: {response.candidates.length}</span>
          </dd>)
        })}
      </dl>
    )
  }

  renderQuestionSummary(question) {
    // console.debug("dc-survey-summary: renderQuestionSummary", {question})
    switch (question.question.Type) {
      case ISurveyQuestionType.Choice:
        
        return this.renderEnumerationSummary(question);
        // break;
    
      default:
        return <span class="no-summary">No summary</span>;
        // break;
    }
  }

  render() {
    return (
      <Host>
        <slot></slot>
        <h3>Summary of All {this.numberResponses} Responses</h3> 
        {this.questions.map((question) => {
          return this.renderQuestionSummary(question);
        })}
      </Host>
    );
  }

}
