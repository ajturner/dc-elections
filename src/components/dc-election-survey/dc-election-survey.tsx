import { Component, Host, h, Prop, State } from '@stencil/core';
import * as Response from '../../utils/response'

@Component({
  tag: 'dc-election-survey',
  styleUrl: 'dc-election-survey.css',
  shadow: true,
})
export class DcElectionSurvey {
  @Prop() filename:string = null;
  @Prop() format:string = "column";
  @State() candidates: Array<any> = [];
  @State() questions: Array<any> = [];

  async componentWillLoad() {
    this.questions = await Response.fetchResponses(this.filename, this.format);
    console.log("Hi! This is an open-source project by Andrew Turner - https://github.com/ajturner/dc-elections")
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
