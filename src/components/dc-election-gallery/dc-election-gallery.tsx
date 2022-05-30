import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'dc-election-gallery',
  styleUrl: 'dc-election-gallery.css',
  shadow: true,
})
export class DcElectionGallery {

  @Prop() filename:string = null;

  async fetchCandidates(filename: string): Promise<Array<any>> { 
    if(filename === null) {
      return [];
    }
    
    const candidatesFile = await fetch(filename);
    const candidatesList = await candidatesFile.text();
    cons
    console.log("DcElectionGallery: fetchCandidates", [candidatesFile, candidatesList]);
    return [];
  }
  componentWillLoad() {
    this.fetchCandidates(this.filename);
  }
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
