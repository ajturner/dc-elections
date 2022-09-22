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
  /**
   * URL to Survey responses
   */
  @Prop() filename:string = null;

  /**
   * Format of the Survey: column | row | surveymonkey
   */
  @Prop() format:string = "column";
  
  /**
  * Optional URL to CSV to candidates: Race,Name,Website
  */
  @Prop() candidatesFile:string = null;

  /** String to filter Race
   */
  @Prop({ mutable: true, reflect: true }) filter:string = null;

  /**
   * Option to show or hide the Map + dropdown
   */
  @Prop() showFilter:boolean = false;

  // TODO: can this move to the state handler?
  @Event({ cancelable: false })  filterChanged: EventEmitter<any>;

  @State() candidates: Array<any> = [];
  @State() questions: Array<any> = [];
  @State() loading: boolean = true;

  filterInput!: HTMLInputElement;
  filterDropdownEl: HTMLDcFilterElement;
  featureSummaryEl: HTMLDcFeatureSummaryElement;
  mapEl: HTMLDcMapElement;

  async componentDidLoad() {
    this.questions = await Response.fetchResponses(this.filename, this.format);

    // Optionally load a CSV of Candidates (Race,Name,Website)
    if(!!this.candidatesFile) {
      this.candidates = await Response.fetchCandidates( this.candidatesFile )
    }
    
    if(!!this.filter) {
      // set the filter state
      state.filter = this.filter;
      // TODO: this fires before the map has loaded in HTML
      // this.filterChanged.emit({ value: this.filter});
    }
    this.loading = false;
  }

  @Listen("featureSelected")
  featureSelectedHandler(event) {
    console.debug("dc-election-survey: featureSelectedHandler", event.detail.feature.attributes);
    this.featureSummaryEl.race = event.detail.feature.attributes.SMD_ID;
    this.featureSummaryEl.website = event.detail.feature.attributes.WEB_URL;
    this.filter = event.detail.feature.attributes.ANC_ID;
  }
  @Listen("filterChanged")
  filterChangedHandler(event) {
    console.debug("dc-election-survey: filterChangedHandler", event.detail.value)

    // Quick fix to hide ANC based filter
    this.featureSummaryEl.race = event.detail.value;
    this.filter = event.detail.value;
    state.filter = this.filter;
  }

  @Watch('filter')
  filterPropChanged(newValue: string) {
    console.debug("dc-election-survey: filterPropChanged")
    // TODO move these to reactive props on elements
    this.filterDropdownEl.value = newValue;

    // TODO Fix to highlight map when drop-down chosen
    // this.mapEl.selectFeature( newValue );    
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
          <dc-map
            ref={(el) => this.mapEl = el}
          ></dc-map>
          <dc-feature-summary
            candidates={this.candidates}
            ref={(el) => this.featureSummaryEl = el}
          ></dc-feature-summary>
          <dc-filter
            ref={(el) => this.filterDropdownEl = el}
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
