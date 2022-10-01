import{r as t,a as s,h as e,H as i}from"./p-09054bd8.js";const l=":host{display:grid}.fullname{font-weight:600;font-size:1em}.bio,.office{color:#444;font-size:0.9em;font-weight:300}img{font-weight:200;font-size:0.6em;font-style:italic;width:100px}a{font-size:0.8em;font-weight:400}";const n=class{constructor(s){t(this,s);this.fullname=null;this.photo=null;this.office=null;this.bio=null;this.website=null}displayName(t){return t.replace(/'/,"'​")}render(){const t=s(`../assets/photos/${this.photo}`);return e(i,null,e("slot",null),this.photo?e("img",{src:t,alt:`Photograph of ${this.fullname}`}):null,this.fullname?e("span",{class:"fullname"},this.displayName(this.fullname)):null,this.office?e("span",{class:"office"},this.office):null,this.bio?e("span",{class:"bio"},this.bio):null,this.website?e("span",{class:"website"},e("a",{href:this.website,target:"_new",title:`Website of ${this.fullname}`},"website")):null)}static get assetsDirs(){return["assets"]}};n.style=l;const o=':host{display:block}.gallery{display:grid;max-width:800px;grid-gap:0.3em;grid-template-columns:repeat(3, 1fr)}.narrow{grid-template-columns:repeat(2, 1fr)}.gallery.grid{margin-left:1em;padding:0.5em 0 0 0.5em;border-left:3px solid #0f9535}.gallery dc-election-candidate{border:thin solid #eee;padding:0.5em}.gallery:empty::after{margin:5px 0 0 5px;color:#AAA;font-weight:300;content:"no responses"}';const r=class{constructor(s){t(this,s);this.candidates=[];this.appearance="grid"}renderResponses(){let t=[];if(this.candidates.length<=0){t.push(e("em",null,"no support"))}else{this.candidates.map((s=>{if(s["Candidate"]===undefined||s["Candidate"].length===0){return}t.push(e("dc-election-candidate",{class:`race${s.Race.replace(/\s+/,"")}`,photo:`${s["Photo"]}`,fullname:s["Candidate"],office:s===null||s===void 0?void 0:s.Race,website:s===null||s===void 0?void 0:s.Website}))}))}return t}render(){return e(i,null,e("slot",null),e("div",{class:`gallery ${this.appearance}`},this.renderResponses()))}};r.style=o;const a=":host{display:block;position:sticky;top:0;background-color:white;opacity:0.9}.preface{font-weight:300;font-size:1em;display:block}.focus{font-weight:800;font-size:1.2em;padding-top:0.3em;padding-bottom:0.5em;display:block}";const c=class{constructor(s){t(this,s);this.question=null}renderQuestion(t){const s=t.Question.replace(/(?:\r\n|\r|\n)/g,"<br>");let i="",l=s;try{[,i,l]=s.match(/_(.*)_(.*)/)}catch(t){}const n=[e("span",{class:"preface",innerHTML:i}),e("span",{class:"focus",innerHTML:l})];return n}render(){return e(i,null,e("slot",null),this.renderQuestion(this.question))}};c.style=a;export{n as dc_election_candidate,r as dc_election_gallery,c as dc_election_query};
//# sourceMappingURL=p-c874d639.entry.js.map