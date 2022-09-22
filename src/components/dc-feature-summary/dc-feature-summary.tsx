import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'dc-feature-summary',
  styleUrl: 'dc-feature-summary.css',
  shadow: true,
})
export class DcFeatureSummary {

  @Prop({ }) race: string = null;
  @Prop({ }) website: string = "";
  @Prop() candidates: any;

  async componentWillLoad() {
  }

  renderWebsite(website:string) {
    console.log("renderWebsite", website)
    if(!!website && website.length > 0) {
      return (<span>Website: <a target="_new" href={website}>{website}</a></span>)
    } else {
      return "";
    }


  }
  renderCandidates(candidates: Array<any> = []) {
    let output = <em>No candidates</em>;
    if(candidates.length > 0) {
      output = (
          <ul>
        {candidates.map((candidate) =>{
          return <li>{candidate['Candidate']} <a href={candidate['Website']}>email</a></li>
        })}
      </ul>
      )
    }
    return output;
  }
  renderInfo(info) {
    
    console.debug("render-feature-summary", {info})
    if(info === undefined) {
      return "";
    }

    const candidates = info.candidates.filter(c => c['Candidate'] !== '')
    return (
      <div id="summary">
        <div id="summary-race">{info.race}</div>
        <div id="summary-website">{this.renderWebsite(this.website)}</div>
        <div id="summary-candidates">
          <h4>Candidates</h4>

          {this.renderCandidates(candidates)}
        </div>
      </div>
    )
  }
  render() {
    let output = [];
    if(this.race !== null) {
      const info = this.candidates[this.race];
      output = this.renderInfo(info);
    }
    return (
      <Host>
        <slot></slot>
        {output}
      
      </Host>
    );
  }

}
