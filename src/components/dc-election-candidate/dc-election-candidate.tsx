import { Component, Host, h, Prop, getAssetPath } from '@stencil/core';

@Component({
  tag: 'dc-election-candidate',
  styleUrl: 'dc-election-candidate.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class DcElectionCandidate {

  @Prop() fullname: string = null;
  @Prop() photo: string = null;
  @Prop() office: string = null;
  @Prop() bio: string = null;
  @Prop() website: string = null;
  @Prop() endorsed: boolean = null;

  // Add zero-width space for optional line-break on names with an apostrophe
  private displayName(fullname:string):string {
    return fullname.replace(/'/,"'\u200B").replace(/\~(.*)\~/, "<span class='withdrawn'>$1</span>");
  }

  render() {
    
    const imageSrc = getAssetPath(`../assets/photos/${this.photo}`);
    return (
      <Host>
      <div class={
          this.endorsed ? "endorsed" : ""
        }
        data-ribbon={ this.endorsed ? "GGWash Endorsed" : ""}
        >
        <slot></slot>
        {this.photo 
          ? <img src={imageSrc} alt={`Photograph of ${this.fullname}`} />
          : null}
        {this.fullname 
          ? <span class="fullname" innerHTML={this.displayName(this.fullname)}></span>
          : null}
        {this.office 
          ? <span class="office">{this.office}</span>
          : null}
        {this.bio 
          ? <span class="bio">{this.bio}</span>
          : null}
        {this.website 
          ? <span class="website"><a href={this.website} target="_new" title={`Website of ${this.fullname}`}>website</a></span>
          : null}  
        </div>        
      </Host>
    );
  }

}
