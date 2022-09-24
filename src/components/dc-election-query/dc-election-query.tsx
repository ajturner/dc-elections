import { Component, Host, h, Prop } from '@stencil/core';
import { ISurveyQuestion } from '../../utils/response';

@Component({
  tag: 'dc-election-query',
  styleUrl: 'dc-election-query.css',
  shadow: true,
})
export class DcElectionQuery {
  @Prop() question: ISurveyQuestion = null;

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
      </Host>
    );
  }

}
