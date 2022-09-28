import { Component, Event, EventEmitter, Host, h, Prop, State, Watch, Listen } from '@stencil/core';
import * as Response from '../../utils/response'
import state from '../../utils/store';
// @ts-ignore
import HTMLCalciteComboboxElement from "@esri/calcite-components/dist/components/calcite-combobox";
// @ts-ignore
import HTMLDcFilterElement from '../dc-filter';
import { getFilterBookmark, setFilterBookmark } from '../../utils/utils';

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
  @Prop() candidateFiles:string = null;

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
    if(!!this.candidateFiles) {
      this.candidates = await Response.fetchCandidates( this.candidateFiles )
    }

    this.filter = getFilterBookmark();
    if(!!this.filter) {
      // set the filter state
      state.filter = this.filter;
    }
    // console.debug("dc-election-survey", {candidates: this.candidates, questions: this.questions})
    this.loading = false;
  }

  // TODO: This is a hack to stop propagating events all around, stopping map zoom
  @State() stopFilterPropagation: boolean = false;

  @Listen("featureSelected")
  featureSelectedHandler(event) {
    
    this.stopFilterPropagation = true;
    if(event.detail.feature !== undefined) {
      console.debug("dc-election-survey: featureSelectedHandler", event.detail.feature.attributes);
      this.featureSummaryEl.race = event.detail.feature.attributes.SMD_ID;
      this.featureSummaryEl.website = event.detail.feature.attributes.WEB_URL;
      this.filter = event.detail.feature.attributes.ANC_ID;
    } else {
      this.filter = "";
      this.featureSummaryEl.race = "";
    }
    state.filter = this.filter;
    
  }
  @Listen("filterChanged")
  filterChangedHandler(event) {
    // console.debug("dc-election-survey: filterChangedHandler", event.detail.value)
    this.filter = event.detail.value;

    // Update summary if the filter is an SMD
    if(!this.stopFilterPropagation) {
      this.featureSummaryEl.race = event.detail.value;
    }
    this.stopFilterPropagation = false;
  }

  @Watch('filter')
  filterPropChanged(newValue: string) {
    // console.debug("dc-election-survey: filterPropChanged", {newValue})
    // TODO move these to reactive props on elements
    if(!!this.filterDropdownEl) {
      this.filterDropdownEl.value = newValue;
    }

    setFilterBookmark(newValue)
    
    const feature = { attributes: {
      ANC_ID: newValue.slice(0,2)
    }};
    if(newValue.length === 4) {
      feature.attributes['SMD_ID'] = newValue;
    }
    
    if(!this.stopFilterPropagation && !!this.mapEl) {
      // @ts-ignore for some reason doesn't detect that mathod has two parameters
      this.mapEl.selectFeature( feature, false /* emitEvent */ );    
      state.filter = newValue;
    }
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
    console.debug("dc-election-survey: renderFilter", {filter})
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
          >
          
          </dc-filter>

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
      <div>
        <div class="help">
          Filter to local candidates by clicking on the map, search by address, or select ANC or SMD.
        </div>
        {this.renderSummary()}
      </div>
    )
  }
  renderSummary() {
    return (
      <dc-survey-summary
        class="summary"
        questions={this.questions}
      ></dc-survey-summary>      
    )
  }

  // TODO: Simplify the filter logic
  renderBody(filter:string) {
    const questions = (
      <ol>
        {this.questions.map((question) => {
          return (<li>{this.renderQuestion(question)}</li>);  
        })}
      </ol>)
    return (
      <div class="questions">
        {this.renderFilter(filter)}
        {!this.showFilter || filter === null || (!!filter && filter.length !== 0) ? questions : this.renderHelp()}
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
        
        {this.loading || this.questions.length === 0 ? this.renderLoader() : this.renderBody(this.filter) }
        
      </Host>
    );
  }

}
