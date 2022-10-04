import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'dc-election-gallery',
  styleUrl: 'dc-election-gallery.css',
  shadow: true,
})
export class DcElectionGallery {
  @Prop({mutable: true, reflect: true}) candidates: Array<any> = [];
  @Prop({mutable: true}) appearance: "grid" | "stack" | "narrow"| "quote" = "grid";


  private renderResponses() {
    let output = [];
    if(this.candidates.length <= 0) {
      output.push(
        <em>no support</em>
      )
    }
    else {
      this.candidates.map((candidate) => {
          // don't display placeholder candidates.
          // used to add another column but with no responses.
          // console.debug("dc-election-gallery: candidate", {candidate})
          if(candidate["Candidate"] === undefined || candidate["Candidate"].length === 0) {
            return;
          }
          output.push(
            <dc-election-candidate 
              class={`race${candidate.Race.replace(/\s+/,'')}`}
              photo={`${candidate["Photo"]}`}
              fullname={candidate["Candidate"]}
              office={candidate?.Race}
              website={candidate?.Website}
              endorsed={candidate?.Endorsed === "Yes" ? true : false}
            ></dc-election-candidate>
          )
      })
    }

    return output;
  }
  render() {
    // console.debug("dc-election-gallery", this.candidates)
    return (
      <Host>
        <slot></slot>
        <div class={`gallery ${this.appearance}`}>
          {this.renderResponses()}
        </div>
      </Host>
    );
  }

}
