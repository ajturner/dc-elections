import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'dc-election-gallery',
  styleUrl: 'dc-election-gallery.css',
  shadow: true,
})
export class DcElectionGallery {
  @Prop() candidates: Array<any> = [];
  @Prop() appearance: "grid" | "stack" = "grid";

  render() {
    return (
      <Host>
        <slot></slot>
        <div class={`gallery ${this.appearance}`}>
        {this.candidates.map((candidate) => {
          return (
            <dc-election-candidate 
              photo={`assets/photos/${candidate["Photo"]}`}
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
