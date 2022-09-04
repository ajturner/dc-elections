import { Component, Host, h, Prop, State } from '@stencil/core';
import * as Response from '../../utils/response'
import state from '../../utils/store';
@Component({
  tag: 'dc-election-survey',
  styleUrl: 'dc-election-survey.css',
  shadow: true,
})
export class DcElectionSurvey {
  @Prop() filename:string = null;
  @Prop() format:string = "column";
  @Prop() filter:string = null;

  @State() candidates: Array<any> = [];
  @State() questions: Array<any> = [];

  async componentWillLoad() {
    this.questions = await Response.fetchResponses(this.filename, this.format);
    
    // set the filter state
    state.filter = this.filter;

    console.log("Hi! This is an open-source project by Andrew Turner - https://github.com/ajturner/dc-elections")
  }

  filterChanged(event: Event) {
    state.filter = (event.target as HTMLInputElement).value;
  }
  renderFilter() {
    return (
      <div class="filter">
        <label>Filter</label>
        <input onBlur={this.filterChanged} value={this.filter}></input>
      </div>
    )
  }
  
  // Render differently depending on type
  renderQuestion(question: Response.ISurveyResponse) {
    return (
      <dc-election-question 
        question={question.question}
        responses={question.responses}
        type={question.question.Type}
      ></dc-election-question>
    )
  }
  render() {
    return (
      <Host>
        <slot name="title"></slot>
        {this.renderFilter()}
        <div class="questions">
        <ol>
          {this.questions.map((question) => {
           return (<li>{this.renderQuestion(question)}</li>);  
          })}
        </ol>
        </div>
      </Host>
    );
  }

}
