import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'dc-election-gallery',
  styleUrl: 'dc-election-gallery.css',
  shadow: true,
})
export class DcElectionGallery {
  @Prop() candidates: Array<any> = [];

  render() {
    return (
      <Host>
        <slot></slot>
        <div class="gallery">
        {this.candidates.map((candidate) => {
          return (
            <dc-election-candidate 
              fullname={candidate["Candidate"]}
              office={candidate?.Race}
            ></dc-election-candidate>
          )
        })}
        </div>
      </Host>
    );
  }

}
