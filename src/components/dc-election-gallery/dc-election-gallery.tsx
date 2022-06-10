import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'dc-election-gallery',
  styleUrl: 'dc-election-gallery.css',
  shadow: true,
})
export class DcElectionGallery {
  @Prop() candidates: Array<any> = [];
  @Prop({mutable: true}) appearance: "grid" | "stack" | "narrow" = "grid";

  render() {
    return (
      <Host>
        <slot></slot>
        <div class={`gallery ${this.appearance}`}>
        {this.candidates.map((candidate) => {
          // don't display placeholder candidates.
          // used to add another column but with no responses.
          if(candidate["Candidate"] === undefined || candidate["Candidate"].length === 0) {
            return;
          }
          return (
            <dc-election-candidate 
              class={`race${candidate.Race.replace(/\s+/,'')}`}
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
