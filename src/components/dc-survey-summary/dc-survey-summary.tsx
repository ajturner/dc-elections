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
  @State() numberResponses:number = 179;

  calculatePercentage(value: number): number {
    return Math.ceil(value / this.numberResponses * 100)
  }
  formatResponse(text:string):string {
    return text.replace(/^\d+\./,'').replace(/_(.*)_/, '').trim();
  }
  renderEnumerationSummary(question) {
    // console.debug("dc-survey-summary: renderEnumeration", {question});
    const responses = shuffle(question.responses, question.question.Sort);

    // Responses might have footnotes that should be left out of summary
    const summary = responses.reduce((output, response) => {
      const r = this.formatResponse( response.response );
      if(!output[r]) {
        output[r] = {
          response: r,
          count: 0
        }
      }
      output[r].count += response.candidates.length;
      return output;
    }, {})
    console.debug("dc-survey-summery: renderEnumerationSummary", summary);
    return (
      <dl>
        <dt class="question">
          <dc-election-query question={question.question}></dc-election-query>
        </dt>
        {Object.keys(summary).map((response) => {
          return (
          <dd class={`percentage percentage-${this.calculatePercentage(summary[response].count)}`}>
            <span class="text">
              {response}: {summary[response].count}
            </span>
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
