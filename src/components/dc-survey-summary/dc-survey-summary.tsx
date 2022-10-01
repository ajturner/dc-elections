import { Component, Event, EventEmitter, Host, h, Prop, State } from '@stencil/core';
import { ISurveyQuestionType, ISurveyResponse, ISurveySummary } from '../../utils/response';
import { shuffle } from '../../utils/utils';
@Component({
  tag: 'dc-survey-summary',
  styleUrl: 'dc-survey-summary.scss',
  shadow: true,
})
export class DcSurveySummary {

  @Prop() questions = null;
  @State() numberResponses:number = 0;

  @Event({ cancelable: false })  aggregateSummary: EventEmitter<any>;

  componentDidLoad() {
    // todo - fix count to be more resilient in case first question is open-ended
    this.numberResponses = this.questions[0].responses.length;
    
  }
  calculatePercentage(value: number): number {
    return Math.ceil(value / this.numberResponses * 100)
  }
  formatResponse(text:string):string {
    return text.replace(/^\d+\./,'').replace(/_(.*)_/, '').trim();
  }
  
  getQuestion(summaryQuestion:string):ISurveyResponse {
    const filteredQuestion = this.questions.filter((q) => {
      return q.question.Question === summaryQuestion;
    });
    return filteredQuestion.length > 0 ? filteredQuestion[0] : null;
  }
  getResponse(question:ISurveyResponse, responseText:string): ISurveySummary {
    const filteredResponse = question.responses.filter((r) => {

      // We need to handle formatted output that removed 1. and other elements
      // return(!!r.response.match(responseText))
      return(r.response.replace(responseText, '') !== r.response)
    });
    return filteredResponse.length > 0 ? filteredResponse[0] : null;
  }
  aggregateResponses(response:ISurveySummary, attribute:string, aggregates: Object = {}) {
    const aggregate = response?.candidates.reduce((agg, candidate) => {
      const candidateAttribute = candidate[attribute];
      if(!agg[candidateAttribute]) {
        agg[candidateAttribute] = 0;
      }
      agg[candidateAttribute]++;
      return agg;
    }, {})
    aggregates[attribute] = aggregate;
    return aggregates;
  }

  getSummary(summaryQuestion:string, summaryResponse:string) {
    const question = this.getQuestion(summaryQuestion);

    const response = this.getResponse(question, summaryResponse);

    const aggregate = this.aggregateResponses(response, 'Race')
    
    return aggregate;
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
          <dd 
            onClick={(_e) => this.exploreSummaryAggregation(question.question.Question, response)}
            class={`percentage percentage-${this.calculatePercentage(summary[response].count)}`}>
            <span class="text">
              {response}: {summary[response].count}
            </span>
          </dd>)
        })}
      </dl>
    )
  }

  // Handles click on Chart emit event for map to display
  exploreSummaryAggregation(questionText, responseTeext) {
    const summaryCandidates = this.getSummary(questionText, responseTeext);
    console.debug("summaryCandidates", summaryCandidates);
    this.aggregateSummary.emit(summaryCandidates);
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
