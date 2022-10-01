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
  @State() numberResponses:number = 0;

  componentDidLoad() {
    // todo - fix count to be more resilient in case first question is open-ended
    this.numberResponses = this.questions[0].responses.length;
    
    const testSummaryQuestion = "_The District's inclusionary zoning law requires that eight to 10 percent of the residential floor area be set-aside for affordable units in most new residential development projects of 10 or more units. The cost of doing so is paid by a project's developer. Because the number of IZ units is tied to floor-area ratio, the larger a building is, the more IZ units will be built. Conversely, if the initial density proposed by a developer is reduced during the approvals process, rather than maintained or increased, fewer IZ units will be built. ANC commissioners are likely to hear from some constituents concerned by a project's potential impact‚ real or assumed‚ on traffic, parking, views, and property values and rents, and whether it fits the character of the neighborhood._ While it is not a guarantee that a development proposal including IZ units will come before your ANC, if one does, what would you do, given the likelihood of at least some pushback?";
    const testSummaryResponse = "I would encourage developers to maximize the height and density of the project.";
    const summaryCandidates = this.getSummary(testSummaryQuestion, testSummaryResponse);
    console.debug("summaryCandidates", summaryCandidates);

    debugger;
  }
  calculatePercentage(value: number): number {
    return Math.ceil(value / this.numberResponses * 100)
  }
  formatResponse(text:string):string {
    return text.replace(/^\d+\./,'').replace(/_(.*)_/, '').trim();
  }

  getSummary(summaryQuestion:string, summaryResponse:string) {
    const summaryCandidates = this.questions.filter((q) => {
      if(q.question.Question === summaryQuestion) {
        const responseCandidates = q.responses.filter((r) => {
          if(r.response === summaryResponse) {
            return r.candidates
          }
        });
        return responseCandidates;
      }
    })
    debugger;
    return summaryCandidates;
  }

  renderEnumerationSummary(question) {
    // console.debug("dc-survey-summary: renderEnumeration", {question});
    
    const responses = shuffle(question.responses, question.question.Sort);

    // Responses might have footnotes that should be left out of summary
    const summary = responses.reduce((output, response) => {
      const r = this.formatResponse( response.response );
      if(!output[r]) {
        output[r] = {
          count: 0
        }
      }
      output[r].count += response.candidates.length;
      return output;
    }, {})

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
