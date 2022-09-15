import { Component, Event, EventEmitter, Host, h, Prop, State, Watch, Listen } from '@stencil/core';
import * as Response from '../../utils/response'
import state from '../../utils/store';
// @ts-ignore
import HTMLCalciteComboboxElement from "@esri/calcite-components/dist/components/calcite-combobox";
// @ts-ignore
import HTMLDcFilterElement from '../dc-filter';

@Component({
  tag: 'dc-election-survey',
  styleUrl: 'dc-election-survey.css',
  shadow: false,
})
export class DcElectionSurvey {
  @Prop() filename:string = null;
  @Prop() format:string = "column";
  @Prop({ mutable: true, reflect: true }) filter:string = null;
  @Prop() showFilter:boolean = false;

  // TODO: can this move to the state handler?
  @Event({ cancelable: false })  filterChanged: EventEmitter<any>;

  @State() candidates: Array<any> = [];
  @State() questions: Array<any> = [];
  @State() loading: boolean = true;

  filterInput!: HTMLInputElement;
  filterDropdown: HTMLDcFilterElement;
  
  async componentDidLoad() {
    this.questions = await Response.fetchResponses(this.filename, this.format);
    if(!!this.filter) {
      // set the filter state
      state.filter = this.filter;
      // TODO: this fires before the map has loaded in HTML
      // this.filterChanged.emit({ value: this.filter});
    }
    this.loading = false;
  }

  @Listen("filterChanged")
  filterHandler(event) {
    this.filter = event.detail.value;
    state.filter = this.filter;
  }

  @Watch('filter')
  filterPropChanged(newValue: string) {
    this.filterDropdown.value = newValue;
    state.filter = newValue;
  }
  clearFilters() {
    this.filter = '';
    state.filter = '';
    if(this.filterInput) {
      this.filterInput.value = '';
    }
    
    return false; // prevent routing/actions
  }

  renderFilter(filter:string) {
    if(this.showFilter) {
      return (
        <div class="filter">
          <slot name="filter"></slot>
          <dc-map></dc-map>
          <dc-filter
            ref={(el) => this.filterDropdown = el}
            filter={filter}
          ></dc-filter>

          {/* <input onChange={this.filterHandler} 
                 ref={(el) => this.filterInput = el} 
                 value={filter} 
                 placeholder="Search by Ward or ANC"
            ></input>
          <a href='#' onClick={this.clearFilters}>clear</a> */}
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
  renderHelp() {
    return (
      <div class="help">
        Filter to local candidates by clicking on the map, search by address, or select ANC or SMD.
      </div>
    )
  }
  renderBody() {
    const questions = (
      <ol>
        {this.questions.map((question) => {
          return (<li>{this.renderQuestion(question)}</li>);  
        })}
      </ol>)

    return (
      <div class="questions">
        {this.renderFilter(this.filter)}

      {this.filter === null || (this.filter && this.filter.length !== 0) ? questions : this.renderHelp()}
      </div>
    )
  }
  renderLoader() {
    return (<dc-loader>Loading survey responses...</dc-loader>);
  }
  render() {
    return (
      <Host>
        <slot name="title"></slot>
        {this.loading || this.questions.length === 0 ? this.renderLoader() : this.renderBody() }
        
      </Host>
    );
  }

}
