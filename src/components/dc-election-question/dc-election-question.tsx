import { Component, Host, h, Prop } from '@stencil/core';
import { ISurveyQuestion, ISurveyQuestionType } from '../../utils/response';
import { shuffle } from '../../utils/utils';
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

  renderCandidates(candidates: Array<any> ) {

    return (
       shuffle(candidates, "Race").map((candidate) => {
        return (<dc-election-candidate photo={candidate.Photo} fullname={candidate.Candidate} office={candidate.Race}></dc-election-candidate>)
      })
    )
  }
  
  renderResponse(response, _responseCount:number = 2) {
    
    if(response.response.match(/EVERYWHERE/)) {
      console.debug("dc-election-question", response.response)
    }
    // TODO: remove the prior change of this default response.
    if(response.response !== "No Response") {
      // remove numeric prefix like `1. answer` -> `answer`
      let formattedString = response.response.replace(/^[0-9]\.\s+/, '').replace(/(?:\r\n|\r|\n)/g, '<br>');
      
      let appearance: "grid" | "stack" | "narrow" | "quote" = 'grid';
      switch (this.type) {
        case ISurveyQuestionType.Choice:
          // appearance = responseCount > 3 ? 'narrow':'grid';
          return (
              <div class="response-gallery">
                <dc-election-gallery 
                    appearance={appearance} 
                    candidates={shuffle(response.candidates, "Race")}
                  >
                  <div class="response" innerHTML={formattedString}></div>
                </dc-election-gallery>
              </div>
            )
          // break;

        case ISurveyQuestionType.Text:
          appearance = 'quote';
          return (
              <div class="response-quote">
                <dc-election-gallery 
                    appearance={appearance} 
                    candidates={shuffle(response.candidates, "Race")}
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
                    candidates={shuffle(response.candidates, "Race")}
                  >
                </dc-election-gallery>
                <div class="response">{formattedString}</div>
              </div>
            )            
          // break;

        default:
          break;
      }

      // return (
      //   <div class={`response-gallery layout-${this.type.toLowerCase()}`}>
      //     <dc-election-gallery 
      //         appearance={appearance} 
      //         candidates={shuffle(response.candidates, "Race")}
      //       >
      //       <div class="response">{formattedString}</div>
      //     </dc-election-gallery>
      //   </div>
      // )
    } else if(this.showNoResponse) {
      const names = response.candidates.map((c) => {
        return (c?.Candidate)
      })
      return (
        <div class="footnote">No response from {shuffle(names).join(', ')}</div>
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

  renderQuestion(question: ISurveyQuestion) {
    const q = question.Question.replace(/(?:\r\n|\r|\n)/g, '<br>')
    let preface = '', focus = q;

    try {
      [, preface, focus] = q.match(/_(.*)_(.*)/);
    } catch (error) {
      // we'll just ignore...
    }

    // return (
    //   <div class="question" innerHTML={formattedString} />
    // );
    const output = [
      <span class="preface" innerHTML={preface}>{}</span>,
      <span class="focus" innerHTML={focus}></span>
    ]
    return output;
  }

  render() {

    return (
      <Host>
        <slot></slot>
        {this.renderQuestion(this.question)}
        <div class={`layout-${this.type.toLowerCase()}`}>
          {shuffle(this.responses, "response", "asc").map((response) => {
            return (
              this.renderResponse(response, this.responses.length)
            )
          })}
        </div>
      </Host>
    );
  }

}
