import { Component, Host, h, Prop, State } from '@stencil/core';
import { fetchCandidates } from '../../utils/response';

@Component({
  tag: 'dc-feature-summary',
  styleUrl: 'dc-feature-summary.css',
  shadow: true,
})
export class DcFeatureSummary {

  @Prop({ }) race: string = null;
  @Prop({ }) website: string = "";
  @State() candidates: any;

  async componentWillLoad() {
    this.candidates = await fetchCandidates('/assets/2022_anc_candidates.csv')
    console.debug("dc-feature-summary", this.candidates)
  }

  renderWebsite(website:string) {
    console.log("renderWebsite", website)
    if(!!website && website.length > 0) {
      return (<span>Website: <a href={website}>{website}</a></span>)
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
          return <li>{candidate['Candidate']} <a href={`mailto:${candidate['Email']}`}>email</a></li>
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
      <div>
        <h3>{info.race}</h3>
        {this.renderWebsite(this.website)}
      <br/><strong>Candidates</strong>
        {this.renderCandidates(candidates)}
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
