import{r as e,h as t,H as s}from"./p-2aa67f1c.js";function n(e,t,s){return function(e,t="Race",s="asc"){const n="asc"===s?1:-1;return e.sort(((e,s)=>e[t]>s[t]?n:-n))}(e,t,s)}const i=class{constructor(t){e(this,t),this.question=null,this.showNoResponse=!1,this.responses=[]}renderCandidates(e){return n(e,"Race").map((e=>t("dc-election-candidate",{photo:e.Photo,fullname:e.Candidate,office:e.Race})))}renderResponse(e,s=2){if("No Response"!==e.response){let i=e.response.replace(/^[0-9]\.\s+/,"");return t("div",{class:"response-gallery"},t("dc-election-gallery",{appearance:s>3?"narrow":"grid",candidates:n(e.candidates,"Race")},t("div",{class:"response"},i)))}if(this.showNoResponse){const s=e.candidates.map((e=>null==e?void 0:e.Candidate));return t("div",{class:"footnote"},"No response from ",n(s).join(", "))}}renderQuestion(e){let s=e.replace(/_(.*)_/g,'<span class="preface">$1</span>');return t("div",{class:"question",innerHTML:s})}render(){return t(s,null,t("slot",null),this.renderQuestion(this.question),t("div",{class:"graphic"},n(this.responses,"response","asc").map((e=>this.renderResponse(e,this.responses.length)))))}};i.style=":host{display:block;border-top:thin solid #444;margin-bottom:2em}.preface{font-weight:300;font-size:1.4em;display:block;margin-bottom:0.3em}.question{font-weight:700;font-size:1.5em;padding:1em 0}.response{font-weight:600;font-size:1.3em;padding:1em 0}.footnote{font-weight:300px;font-size:0.8em;font-style:italic;padding-top:0.5em}.graphic{display:grid;grid-gap:0.3em;grid-template-columns:repeat( auto-fit, minmax(250px, 1fr) )}.graphic .response{padding:0 0.3em;vertical-align:bottom}.response-gallery:not(:last-child){border-right:1px solid #AAA;padding-right:0.3em}";export{i as dc_election_question}