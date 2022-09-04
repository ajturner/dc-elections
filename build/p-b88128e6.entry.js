import{r as t,h as i,H as e}from"./p-6cbca430.js";import{f as s,s as l}from"./p-fe46a67d.js";const r=class{constructor(i){t(this,i),this.filename=null,this.format="column",this.filter=null,this.showFilter=!1,this.candidates=[],this.questions=[]}async componentWillLoad(){this.questions=await s(this.filename,this.format),l.filter=this.filter,console.log("Hi! This is an open-source project by Andrew Turner - https://github.com/ajturner/dc-elections")}filterChanged(t){l.filter=t}filterHandler(t){console.log("filterHandled",t),this.filter=t.target.value,l.filter=this.filter}clearFilters(){return this.filter="",l.filter="",this.filterInput.value="",!1}renderFilter(){if(this.showFilter)return i("div",{class:"filter"},i("label",null,"Filter"),i("input",{onChange:this.filterHandler,ref:t=>this.filterInput=t,value:this.filter}),i("a",{href:"#",onClick:this.clearFilters},"clear"))}renderQuestion(t){return i("dc-election-question",{question:t.question,responses:t.responses,type:t.question.Type})}render(){return i(e,null,i("slot",{name:"title"}),this.renderFilter(),i("div",{class:"questions"},i("ol",null,this.questions.map((t=>i("li",null,this.renderQuestion(t)))))))}static get watchers(){return{filter:["filterChanged"]}}};r.style=":host{display:block;font-family:sans-serif}ol{padding:0;font:italic 2em Georgia;color:#666;list-style-position:outside;padding-left:1.5em}ol dc-election-question{font:normal 16px Helvetica, Arial, Sans-Serif;color:#000}ol li{border-top:thin solid #444;margin-top:1em}";export{r as dc_election_survey}