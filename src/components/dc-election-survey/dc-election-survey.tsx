import { Component, Host, h, Prop, State, Watch } from '@stencil/core';
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
  @Prop({ mutable: true, reflect: true }) filter:string = null;
  @Prop() showFilter:boolean = false;

  @State() candidates: Array<any> = [];
  @State() questions: Array<any> = [];

  filterInput!: HTMLInputElement;

  async componentWillLoad() {
    this.questions = await Response.fetchResponses(this.filename, this.format);
    
    // set the filter state
    state.filter = this.filter;

    console.log("Hi! This is an open-source project by Andrew Turner - https://github.com/ajturner/dc-elections")
  }

  @Watch('filter')
  filterChanged(newValue: string) {
    state.filter = newValue;
  }
  filterHandler(event: Event) {
    console.log("filterHandled", event)
    this.filter = (event.target as HTMLInputElement).value;
    state.filter = this.filter;
  }
  clearFilters() {
    this.filter = '';
    state.filter = '';
    this.filterInput.value = ''
    return false; // prevent routing/actions
  }

  renderFilter() {
    if(this.showFilter) {
      return (
        <div class="filter">
          <label>Filter</label>
          <input onChange={this.filterHandler} ref={(el) => this.filterInput = el} value={this.filter}></input>
          <a href='#' onClick={this.clearFilters}>clear</a>
        </div>
      )
    }
    
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
