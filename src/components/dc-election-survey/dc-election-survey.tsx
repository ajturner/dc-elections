import { Component, Host, h, Prop, State } from '@stencil/core';
import * as Response from '../../utils/response'

@Component({
  tag: 'dc-election-survey',
  styleUrl: 'dc-election-survey.css',
  shadow: true,
})
export class DcElectionSurvey {
  @Prop() filename:string = null;

  @State() candidates: Array<any> = [];
  @State() questions: Array<any> = [];


  async componentWillLoad() {
    this.questions = await Response.fetchResponses(this.filename);
  }
  
  // Render differently depending on type
  renderQuestion(question: Response.ISurveyResponse) {
    console.debug("dc-election-survey: renderQuestion", {type: question.question.Type, question})
    // switch (question.question.Type) {
    //   case Response.ISurveyQuestionType.Choice:
        return (
          <dc-election-question 
            question={question.question}
            responses={question.responses}
            type={question.question.Type}
          ></dc-election-question>
        )
    //     // break;
    
    //   default:
    //     return (<span>{question.question.Type}</span>);
    //     // break;
    // }
  }
  render() {
    return (
      <Host>
        <slot name="title"></slot>
        <div class="questions">
          {this.questions.map((question) => {
           return this.renderQuestion(question);  
          })}
        </div>
      </Host>
    );
  }

}
