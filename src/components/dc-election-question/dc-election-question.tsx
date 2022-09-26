import { Component, Host, h, Prop } from '@stencil/core';
import { ISurveyCandidate, ISurveyQuestion, ISurveyQuestionType } from '../../utils/response';
import { shuffle } from '../../utils/utils';
import state from '../../utils/store'; // for passing filter

@Component({
  tag: 'dc-election-question',
  styleUrl: 'dc-election-question.css',
  shadow: true,
})
export class DcElectionQuestion {

  @Prop() question: ISurveyQuestion = null;
  @Prop() showNoResponse: boolean = false;
  @Prop() type: ISurveyQuestionType = ISurveyQuestionType.Choice;

  /**
  * Holds an Array of answers to candidates
  * [ 
  *   {response: "Yes", "candidates": ["C1", "C2"]}, 
  *   {response: "No", "candidates": ["C3", "C4"]} 
  * ]
  */
  @Prop() responses: Array<any> = [];

  applyFilters(candidates: Array<ISurveyCandidate>):Array<ISurveyCandidate> {  
    if(state.filter && state.filter.length !== 0) {

      let filteredCandidates = candidates.filter((candidate) => {
        return candidate.Race.match(state.filter);
      })
      // console.debug("dc-election-question: applyFilters", {filter: state.filter, question: this.question, filteredCandidates})
      return filteredCandidates;
    }
    return candidates;
  }
  renderNoResponse() {
    return (
      <div>
        We did not receive any responses from candidates in this jurisdiction
      </div>
    )
  }

  renderResponse(response, _responseCount:number = 2) {
    let filteredCandidates = this.applyFilters(response.candidates);

    // TODO: remove the prior change of this default response.
    if(response.response !== "No Response" && filteredCandidates.length !== 0) {
      // remove numeric prefix like `1. answer` -> `answer`
      let formattedString = response.response.replace(/^[0-9]\.\s+/, '').replace(/(?:\r\n|\r|\n)/g, '<br>');
      
      let appearance: "grid" | "stack" | "narrow" | "quote" = 'grid';
      console.debug("dc-election-question: Response", {type: this.type, formattedString, filteredCandidates})
      switch (this.type) {
        case ISurveyQuestionType.Choice:
          // appearance = responseCount > 3 ? 'narrow':'grid';
          // console.debug("dc-election-question: choice", {formattedString, filteredCandidates})

          return (
              <div class="response-gallery">
                <dc-election-gallery 
                    appearance={appearance} 
                    candidates={filteredCandidates}
                  >
                  <div class="response" innerHTML={formattedString}></div>
                </dc-election-gallery>
              </div>
            )
          // break;

        case ISurveyQuestionType.Text:
          appearance = 'quote';
          const candidates = filteredCandidates;
          console.debug("dc-election-question: text", {formattedString, filteredCandidates})

          return (
              <div class="response-quote">
                <dc-election-gallery 
                    appearance={appearance} 
                    candidates={candidates}
                  >
                </dc-election-gallery>
                  <div class="response" innerHTML={formattedString}></div>
              </div>
            )        
          // break;

        // Parsing logic shows Rank as Option b/c it's the "last one"
        case ISurveyQuestionType.Rank:
        case ISurveyQuestionType.Option:
          appearance = 'quote';
          // console.debug("dc-election-question", {formattedString, filteredCandidates})
          const options = formattedString.split('|');
          formattedString = (
            <ol class="rank-options">
              {options.map((option) => {
                return(
                  this.formatRankOptions(option)
                )
              })}
            </ol>  
          )
          return (
              <div class="response-rank">
                <dc-election-gallery 
                    appearance={appearance} 
                    candidates={filteredCandidates}
                  >
                </dc-election-gallery>
                <div class="response">{formattedString}</div>
              </div>
            )            
          // break;

        default:
          break;
      }

    } else if(this.showNoResponse) {
      const names = response.candidates.map((c) => {
        return (c?.Candidate)
      })
      return (
        <div class="footnote">No response from {names.join(', ')}</div>
      )
    }

    // otherwise no response;
  }

  // Logic for normal text and `~omit~ (comment)`
  // example: <span><span class='text'>omit</span><span class='comment'>comment</span>
  formatRankOptions(text:string):string {
    // const omit = text.match(/\~([\w\s,-]+)\~/g) ? true : false;
    let enumeration = 'unranked';
    switch (true) {
      case /\~(.*)\~/g.test(text):
        enumeration = 'omit';
        break;
      case /^#/.test(text):
        enumeration = 'ranked';
        text = text.replace(/^#/,'');
        break;
    
      default:
        break;
    }
    text = text.replace(/\~(.*)\~ (\([\w\s]+\))/g, "<span class='text'>$1</span> <span class='comment'>$2</span>");
    text = `<span>${text}</span>`;
    const output = <li class={enumeration} innerHTML={text}></li>;
    return output;
  }


  render() {
    const responses = shuffle(this.responses, this.question.Sort);
  
    console.debug("dc-election-question: render", {q: this.question, responses})
    return (
      <Host>
        <slot></slot>
        <dc-election-query
          question={this.question}
        >
        </dc-election-query>
        <div class={`response layout-${this.type.toLowerCase()}`}>
          {responses.length === 0 ? this.renderNoResponse() : null }
            
          {responses.map((response, idx) => {
            return (
              <div>
              {this.renderResponse(response, responses.length)}
              </div>
            )
          })}
        </div>
      </Host>
    );
  }

}
