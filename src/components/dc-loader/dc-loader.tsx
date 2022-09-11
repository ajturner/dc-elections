import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'dc-loader',
  styleUrl: 'dc-loader.css',
  shadow: true,
})
export class DcLoader {

  render() {
    return (
      <Host>
        <slot></slot>
        <div id="arrowAnim">
          <div class="arrowSliding">
            <div class="arrow"></div>
          </div>
          <div class="arrowSliding delay1">
            <div class="arrow"></div>
          </div>
          <div class="arrowSliding delay2">
            <div class="arrow"></div>
          </div>
          <div class="arrowSliding delay3">
            <div class="arrow"></div>
          </div>
        </div>

      </Host>
    );
  }

}
