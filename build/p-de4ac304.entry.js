import{r as e,c as t,h as i,H as s}from"./p-2b9429d0.js";import{f as r,a as l,s as n}from"./p-cf4847a6.js";const o=class{constructor(i){e(this,i),this.filterChanged=t(this,"filterChanged",6),this.filename=null,this.format="column",this.candidatesFile=null,this.filter=null,this.showFilter=!1,this.candidates=[],this.questions=[],this.loading=!0}async componentDidLoad(){this.questions=await r(this.filename,this.format),this.candidatesFile&&(this.candidates=await l(this.candidatesFile)),this.filter&&(n.filter=this.filter),this.loading=!1}featureSelectedHandler(e){console.debug("dc-election-survey: featureSelectedHandler",e.detail.feature.attributes),this.featureSummaryEl.race=e.detail.feature.attributes.SMD_ID,this.featureSummaryEl.website=e.detail.feature.attributes.WEB_URL,this.filter=e.detail.feature.attributes.ANC_ID,n.filter=this.filter}filterChangedHandler(e){console.debug("dc-election-survey: filterChangedHandler",e.detail.value)}filterPropChanged(e){console.debug("dc-election-survey: filterPropChanged"),this.filterDropdownEl.value=e,n.filter=e}clearFilters(){return this.filter="",n.filter="",this.filterInput&&(this.filterInput.value=""),!1}renderFilter(e){if(this.showFilter)return i("div",{class:"filter"},i("slot",{name:"filter"}),i("dc-map",{ref:e=>this.mapEl=e}),i("dc-feature-summary",{candidates:this.candidates,ref:e=>this.featureSummaryEl=e}),i("dc-filter",{ref:e=>this.filterDropdownEl=e,filter:e}))}renderQuestion(e){return i("dc-election-question",{question:e.question,responses:e.responses,type:e.question.Type})}renderHelp(){return i("div",{class:"help"},"Filter to local candidates by clicking on the map, search by address, or select ANC or SMD.")}renderBody(){const e=i("ol",null,this.questions.map((e=>i("li",null,this.renderQuestion(e)))));return i("div",{class:"questions"},this.renderFilter(this.filter),null===this.filter||this.filter&&0!==this.filter.length?e:this.renderHelp())}renderLoader(){return i("dc-loader",null,"Loading survey responses...")}render(){return i(s,null,i("slot",{name:"title"}),this.loading||0===this.questions.length?this.renderLoader():this.renderBody())}static get watchers(){return{filter:["filterPropChanged"]}}};o.style=":host{display:block;font-family:sans-serif}.filter{max-width:800px}.help{margin:1em 0;padding:1em 0 1em 1em;border:thin solid #0f9535;max-width:780px}dc-map{height:400px;width:400px}dc-feature-summary{position:absolute;top:200px;background-color:rgba(255,255,255, 0.8);width:300px}ol{padding:0;font:italic 2em Georgia;color:#666;list-style-position:outside;padding-left:1.5em}ol dc-election-question{font:normal 16px Helvetica, Arial, Sans-Serif;color:#000}ol li{border-top:thin solid #444;margin-top:1em}input{font-size:1.2em;height:2em;width:12em;margin:0 1em}";export{o as dc_election_survey}