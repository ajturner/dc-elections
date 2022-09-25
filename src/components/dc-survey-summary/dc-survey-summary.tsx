import { Component, Host, h, Prop, State } from '@stencil/core';
import { ISurveyQuestionType } from '../../utils/response';

@Component({
  tag: 'dc-survey-summary',
  styleUrl: 'dc-survey-summary.scss',
  shadow: true,
})
export class DcSurveySummary {

  @Prop() questions = null;
  @State() numberResponses:number = 172;

  calculatePercentage(value: number): number {
    return Math.ceil(value / this.numberResponses * 100)
  }
  renderEnumerationSummary(question) {
    return (
      <dl>
        <dt class="question"><dc-election-query question={question.question}></dc-election-query></dt>
        {question.responses.map((response) => {
          return (<dd class={`percentage percentage-${this.calculatePercentage(response.candidates.length)}`}>
            <span class="text">{response.response}: {response.candidates.length}</span>
          </dd>)
        })}
      </dl>
    )
  }

  renderQuestionSummary(question) {
    console.debug("dc-survey-summary: renderQuestionSummary", {question})
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
