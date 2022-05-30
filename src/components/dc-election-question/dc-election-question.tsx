import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'dc-election-question',
  styleUrl: 'dc-election-question.css',
  shadow: true,
})
export class DcElectionQuestion {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
