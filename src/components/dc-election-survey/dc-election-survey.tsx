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
  
  render() {
    return (
      <Host>
        <slot name="title"></slot>
        <div class="questions">
          {this.questions.map((question) => {
          return (
            <dc-election-question 
              question={question.question}
              responses={question.responses}
            ></dc-election-question>
          )
        })}
        </div>
      </Host>
    );
  }

}
