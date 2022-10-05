import{r as e,h as t,H as r,c as a}from"./p-09054bd8.js";import{I as i,s,c as n}from"./p-e5a99d58.js";const o=':host{display:block;}.response:empty::before{content:"No candidates submitted responses in this ANC.";font-style:italic;font-weight:400}.response{font-weight:600;font-size:1em;padding:1em 0;margin-top:0.5em}.response-gallery .response::before{content:"\\203A"}.footnote{font-weight:300px;font-size:0.8em;font-style:italic;padding-top:0.5em}.layout-choice{display:grid;grid-gap:0.3em;grid-template-columns:repeat( auto-fit, minmax(400px, 1fr) )}.layout-choice .response{padding:0 0.3em 0.3em 0.3em;vertical-align:bottom}.response-quote,.response-rank{display:grid;grid-template-columns:0.1fr 1fr;padding:1em 0;border-bottom:thin solid #DDD}.response-rank .response{font-weight:300;padding:0}.response-quote .response{font-weight:400;font-size:1em;padding:0.4em;font-style:oblique;quotes:"\\201C""\\201D""\\2018""\\2019"}.response-quote .response:before{content:open-quote;color:#ccc;font-size:3em;line-height:0.1em;margin-right:0.25em;vertical-align:-0.4em}.response-quote .response:after{content:close-quote;color:#ccc;font-size:3em;line-height:0.1em;margin-right:0.25em;vertical-align:-0.4em}.rank-options{padding:0;margin:0;font:italic 1em Georgia;color:#666}.rank-options span{font:normal 1em Arial;color:#000}.rank-options li{border:1px solid #CCC;padding:0.5em;margin-left:1.5em;margin-bottom:0.5em}.rank-options .ranked{border:1px solid #0f9535}.rank-options li.omit,.rank-options li.unranked{list-style:none}.omit .text{font:normal 1em Arial;text-decoration:line-through;color:#555}.omit .comment{display:inline-block;text-decoration:unset;font-weight:100;padding-left:0.5em;font-style:italic}';const l=class{constructor(t){e(this,t);this.question=null;this.showNoResponse=false;this.type=i.Choice;this.responses=[]}applyFilters(e){if(s.filter&&s.filter.length!==0){let t=e.filter((e=>e.Race.match(s.filter)));return t}return e}renderNoResponse(){return t("div",null,"We did not receive any responses from candidates in this jurisdiction")}renderResponse(e,r=2){let a=this.applyFilters(e.candidates);if(e.response!=="No Response"&&a.length!==0){let r=e.response.replace(/^[0-9]\.\s+/,"").replace(/(?:\r\n|\r|\n)/g,"<br>");let s="",n=r;try{[,n,s]=r.match(/(.*)_(.*)_/)}catch(e){}r=`${n} <span class="footnote">${s}`;let o="grid";switch(this.type){case i.Choice:return t("div",{class:"response-gallery"},t("dc-election-gallery",{appearance:o,candidates:a},t("div",{class:"response",innerHTML:r})));case i.Text:o="quote";const e=a;return t("div",{class:"response-quote"},t("dc-election-gallery",{appearance:o,candidates:e}),t("div",{class:"response",innerHTML:r}));case i.Rank:case i.Option:o="quote";const s=r.split("|");r=t("ol",{class:"rank-options"},s.map((e=>this.formatRankOptions(e))));return t("div",{class:"response-rank"},t("dc-election-gallery",{appearance:o,candidates:a}),t("div",{class:"response"},r))}}else if(this.showNoResponse){const r=e.candidates.map((e=>e===null||e===void 0?void 0:e.Candidate));return t("div",{class:"footnote"},"No response from ",r.join(", "))}}formatRankOptions(e){let r="unranked";switch(true){case/\~(.*)\~/g.test(e):r="omit";break;case/^#/.test(e):r="ranked";e=e.replace(/^#/,"");break}e=e.replace(/\~(.*)\~ (\([\w\s]+\))/g,"<span class='text'>$1</span> <span class='comment'>$2</span>");e=`<span>${e}</span>`;const a=t("li",{class:r,innerHTML:e});return a}render(){const e=n(this.responses,this.question.Sort);return t(r,null,t("slot",null),t("dc-election-query",{question:this.question}),t("div",{class:`response layout-${this.type.toLowerCase()}`},e.length===0?this.renderNoResponse():null,e.map((t=>this.renderResponse(t,e.length)))))}};l.style=o;const c=":host{display:block}#summary{border:thin solid #BBB;padding:5px}#summary-race{font-weight:600;font-size:1.2em}#summary-candidates ul{margin:0 0 0 20px;padding-left:0}h4{padding:0;margin:5px 0 0 0}";const d=class{constructor(t){e(this,t);this.race=null;this.website=""}async componentWillLoad(){}renderWebsite(e){if(!!e&&e.length>0){return t("span",null,"Website: ",t("a",{target:"_new",href:e},e))}else{return""}}renderCandidates(e=[]){let r=t("em",null,"No candidates");if(e.length>0){r=t("ul",null,e.map((e=>t("li",null,e["Candidate"]," ",t("a",{href:e["Website"]},"email")))))}return r}renderInfo(e){console.debug("render-feature-summary",{info:e});if(e===undefined){return""}const r=e.candidates.filter((e=>e["Candidate"]!==""));return t("div",{id:"summary"},t("div",{id:"summary-race"},e.race),t("div",{id:"summary-website"},this.renderWebsite(this.website)),t("div",{id:"summary-candidates"},t("h4",null,"Candidates"),this.renderCandidates(r)))}render(){let e=[];if(this.race!==null){const t=this.candidates[this.race];e=this.renderInfo(t)}return t(r,null,t("slot",null),e)}};d.style=c;const h=":host{display:block}.filters{display:flex;flex-direction:row;flex-wrap:wrap;width:100%}.filter{display:flex;flex-direction:column;flex-basis:100%;flex:1;max-width:200px;padding-right:2em}";const p=class{constructor(t){e(this,t);this.filterChanged=a(this,"filterChanged",6);this.filter="";this.url="https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Administrative_Other_Boundaries_WebMercator/MapServer/55/query?where=1%3D1&text=&objectIds=&time=&timeRelation=esriTimeRelationOverlaps&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=ANC_ID%2CSMD_ID&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=SMD_ID&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&sqlFormat=none&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json";this.m_filterOptions=[]}componentWillLoad(){this.fetchOptions()}async fetchOptions(){const e=[];const t=await fetch(this.url);const r=await t.json();r.features.map((t=>{e.push({ANC_ID:t.attributes.ANC_ID,SMD_ID:t.attributes.SMD_ID})}));this.m_filterOptions=e}groupBy(e,t){const r=e.reduce((function(e,r){e[r[t]]=e[r[t]]||[];e[r[t]].push(r);return e}),Object.create(null));return r}dropdownChangedHandler(e){this.filterChanged.emit({value:this.m_dropdownEl.value})}filterPropChanged(e){console.debug("dc-filter: filterPropChanged",e);this.m_dropdownEl.value=e}renderOption(e,r=null){return t("calcite-combobox-item",{value:e,textLabel:e,selected:e===this.filter},r)}resetButton(){return t("calcite-button",{class:"filter",alignment:"start",appearance:"solid",color:"blue",scale:"m",href:"",type:"button",width:"auto",onClick:()=>this.filter=null},"Back to Summary")}render(){const e=this.groupBy(this.m_filterOptions,"ANC_ID");const a=[];for(let t in e){const r=e[t].map((e=>this.renderOption(e["SMD_ID"])));a.push(this.renderOption(t,r))}return t(r,null,t("div",{class:"filters"},t("slot",null),t("calcite-combobox",{class:"filter",ref:e=>this.m_dropdownEl=e,label:"search",placeholder:"Search by ANC","selection-mode":"single",scale:"m","max-items":"0"},a),this.filter?this.resetButton():""))}static get watchers(){return{filter:["filterPropChanged"]}}};p.style=h;const f=":host{display:block}.message{font-weight:400;font-style:italic;color:#444;text-align:center}#arrowAnim{width:100vw;height:80vh;display:flex;justify-content:center;align-items:center;color:blue}.arrow{width:5vw;height:5vw;border:2.5vw solid;border-color:#0f9535 transparent transparent #0f9535;transform:rotate(135deg)}.arrowSliding{position:absolute;-webkit-animation:slide 4s linear infinite;animation:slide 4s linear infinite}.delay1{-webkit-animation-delay:1s;animation-delay:1s}.delay2{-webkit-animation-delay:2s;animation-delay:2s}.delay3{-webkit-animation-delay:3s;animation-delay:3s}@-webkit-keyframes slide{0%{opacity:0;transform:translateX(15vw)}20%{opacity:1;transform:translateX(9vw)}80%{opacity:1;transform:translateX(-9vw)}100%{opacity:0;transform:translateX(-15vw)}}@keyframes slide{0%{opacity:0;transform:translateX(15vw)}20%{opacity:1;transform:translateX(9vw)}80%{opacity:1;transform:translateX(-9vw)}100%{opacity:0;transform:translateX(-15vw)}}";const g=class{constructor(t){e(this,t)}render(){return t(r,null,t("div",{class:"message"},t("slot",null)),t("div",{id:"arrowAnim"},t("div",{class:"arrowSliding"},t("div",{class:"arrow"})),t("div",{class:"arrowSliding delay1"},t("div",{class:"arrow"})),t("div",{class:"arrowSliding delay2"},t("div",{class:"arrow"})),t("div",{class:"arrowSliding delay3"},t("div",{class:"arrow"}))))}};g.style=f;const u=":host{display:block}arcgis-hub-map{border:thin solid #BBB}";const m=class{constructor(t){e(this,t);this.featureSelected=a(this,"featureSelected",6);this.mapLoaded=a(this,"mapLoaded",6);this.filter="";this.m_layerViews={};this.m_layers={};this.m_highlights={}}async selectFeature(e,t=true){this.highlightFeature(e);if(t){this.featureSelected.emit({feature:e})}}async highlightFeatures(e){this.outlineFeatures(e)}async handleMapViewReady(e){const{detail:{view:t,loadModules:r}}=e;this.m_view=t;this.m_view.map.basemap="streets-vector";this.m_view.navigation={mouseWheelZoomEnabled:false,browserTouchPanEnabled:false};r(["esri/geometry/Extent","esri/layers/FeatureLayer","esri/widgets/Home","esri/layers/support/LabelClass","esri/widgets/Search"]).then((([e,r,a,i,s])=>{const n={type:"simple",symbol:{type:"simple-fill",opacity:0,color:[200,200,200,.1],outline:{width:.5,color:"#0f9535"}}};const o={type:"simple",symbol:{type:"simple-fill",opacity:1,color:[0,0,0,0],outline:{width:.5,color:[255,255,255,.8]}}};this.m_layers["ancLayer"]=new r({url:"https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Administrative_Other_Boundaries_WebMercator/MapServer/54",renderer:o,outFields:["NAME"]});const l=new i({labelExpressionInfo:{expression:"$feature.SMD_ID"},symbol:{type:"text",color:"black",haloSize:.5,haloColor:"white",font:{size:8}}});this.m_layers["smdLayer"]=new r({url:"https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Administrative_Other_Boundaries_WebMercator/MapServer/55",outFields:["*"],renderer:n,maxScale:0,minScale:1e6,labelingInfo:[l]});this.m_view.map.add(this.m_layers["ancLayer"]);this.m_view.map.add(this.m_layers["smdLayer"]);const c="https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Washington_DC_Boundary/FeatureServer";this.m_layers["boundaryLayer"]=new r({url:c,blendMode:"destination-in",maxScale:0,minScale:1e6});this.m_view.map.add(this.m_layers["boundaryLayer"]);this.m_view.highlightOptions={color:"#0f9535"};const d=new e({xmin:-8584947.85844689,ymin:4691862.387048862,xmax:-8561472.787091771,ymax:4721095.072076196,spatialReference:{wkid:3857}});this.m_view.constraints={geometry:d,minScale:5e5,maxScale:1e4,rotationEnabled:false};const h={geometry:d};const p=[{url:"https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",name:"DC Address Search",zoomScale:5e4,popupEnabled:false,filter:h},{layer:this.m_layers["smdLayer"],placeholder:"Search SMD",maxResults:5,searchFields:["NAME"],displayField:"NAME",name:"DC SMD"}];const f=new s({view:this.m_view,includeDefaultSources:false,sources:p});this.m_view.ui.add(f,{position:"top-left",index:2});f.on("search-complete",(e=>{this.searchCompleteHandler(e)}));let g=new a({view:this.m_view});t.ui.add(g,"top-left");t.ui.move("zoom","top-right");g.on("go",(()=>{f.clear();this.highlightFeature();this.featureSelected.emit({})}));this.m_view.when().then((()=>this.m_layers["smdLayer"].when())).then((e=>this.m_view.whenLayerView(e))).then((e=>{this.m_layerViews["smdLayer"]=e;this.m_view.on("pointer-move",(e=>{this.mapMouseHandler(e)}));this.m_view.on("click",(e=>{this.mapMouseHandler(e)}))})).then((()=>this.m_layers["ancLayer"].when())).then((e=>this.m_view.whenLayerView(e))).then((e=>{this.m_layerViews["ancLayer"]=e;this.mapLoaded.emit()}))}))}searchCompleteHandler(e){let t=e.results[0].results[0].feature;let r=this.m_layerViews["smdLayer"].createQuery();r.geometry=t.geometry;this.m_layers["smdLayer"].queryFeatures(r).then((e=>{let t=e.features[0];this.selectFeature(t)}))}mapMouseHandler(e){const t={include:this.m_layers["smdLayer"]};this.m_view.hitTest(e,t).then((t=>{if(t.results.length){const r=t.results[0].graphic;this.outlineFeature(r);if(e.type==="click"){this.selectFeature(r)}}}))}highlightFeature(e=null){if(this.m_highlights["smdLayer"]){this.m_highlights["smdLayer"].remove()}if(this.m_highlights["ancLayer"]){this.m_highlights["ancLayer"].remove()}if(e===null){return}const t=this.m_layerViews["ancLayer"].createQuery();t.where=`NAME = '${e.attributes.ANC_ID}'`;this.m_layerViews["ancLayer"].queryFeatures(t).then((r=>{console.debug("dc-map: highlightFeature 1",{feature:e,where:t.where,result:r});if(!!r&&r.features.length>0){const e=r.features[0];this.m_view.goTo({target:e.geometry},{duration:2e3,easing:"in-out-expo"});this.m_highlights["ancLayer"]=this.m_layerViews["ancLayer"].highlight(e.attributes.OBJECTID)}}));if(e.attributes.SMD_ID!==undefined){const t=this.m_layerViews["smdLayer"].createQuery();t.where=`SMD_ID = '${e.attributes.SMD_ID}'`;this.m_layerViews["smdLayer"].queryFeatures(t).then((e=>{const t=e.features[0];this.m_highlights["smdLayer"]=this.m_layerViews["smdLayer"].highlight(t.attributes.OBJECTID)}))}}outlineFeature(e){this.m_layers["smdLayer"].featureEffect={filter:{where:`SMD_ID = '${e.attributes.SMD_ID}'`},excludedLabelsVisible:true,includedEffect:"brightness(5) hue-rotate(270deg) contrast(100%) saturate(150%) "}}outlineFeatures(e){this.m_layers["smdLayer"].featureEffect={filter:{where:`SMD_ID in ('${e.join("','")}')`},excludedLabelsVisible:false,excludedEffect:"brightness(0) contrast(0%)",includedEffect:"brightness(5) hue-rotate(270deg) contrast(100%) saturate(150%) "}}render(){return t(r,null,t("slot",null),t("arcgis-hub-map",{style:{height:"400px"},zoom:"10",center:"-77.05,38.9",basemap:"gray-vector"}))}};m.style=u;const w=':host{display:block;--label-width:300px;--label-height:60px}.no-summary{display:none}dl{font-size:0.9rem;border-top:thin solid #888;padding-top:0.7em}dl dd{font-size:0.9rem}dl{display:flex;background-color:white;flex-direction:column;width:100%;max-width:700px;position:relative;padding:20px}dt{align-self:flex-start;width:100%;font-weight:700;display:block;font-size:1.2em;font-weight:700;margin-bottom:20px}.text{font-weight:600;display:flex;text-align:right;align-items:center;height:var(--label-height);width:var(--label-width);background-color:white;position:absolute;left:0;justify-content:flex-end}.percentage{font-size:0.8em;line-height:1;height:var(--label-height);margin-left:var(--label-width);background:repeating-linear-gradient(to right, #ddd, #ddd 1px, #fff 1px, #fff 5%)}.percentage:after{content:"";display:block;background-color:#3d9970;width:50px;margin-bottom:10px;height:90%;position:relative;top:50%;transform:translateY(-50%);transition:background-color 0.3s ease;cursor:pointer}.percentage:hover:after,.percentage:focus:after{background-color:#aaa}.percentage-1:after{width:1%}.percentage-2:after{width:2%}.percentage-3:after{width:3%}.percentage-4:after{width:4%}.percentage-5:after{width:5%}.percentage-6:after{width:6%}.percentage-7:after{width:7%}.percentage-8:after{width:8%}.percentage-9:after{width:9%}.percentage-10:after{width:10%}.percentage-11:after{width:11%}.percentage-12:after{width:12%}.percentage-13:after{width:13%}.percentage-14:after{width:14%}.percentage-15:after{width:15%}.percentage-16:after{width:16%}.percentage-17:after{width:17%}.percentage-18:after{width:18%}.percentage-19:after{width:19%}.percentage-20:after{width:20%}.percentage-21:after{width:21%}.percentage-22:after{width:22%}.percentage-23:after{width:23%}.percentage-24:after{width:24%}.percentage-25:after{width:25%}.percentage-26:after{width:26%}.percentage-27:after{width:27%}.percentage-28:after{width:28%}.percentage-29:after{width:29%}.percentage-30:after{width:30%}.percentage-31:after{width:31%}.percentage-32:after{width:32%}.percentage-33:after{width:33%}.percentage-34:after{width:34%}.percentage-35:after{width:35%}.percentage-36:after{width:36%}.percentage-37:after{width:37%}.percentage-38:after{width:38%}.percentage-39:after{width:39%}.percentage-40:after{width:40%}.percentage-41:after{width:41%}.percentage-42:after{width:42%}.percentage-43:after{width:43%}.percentage-44:after{width:44%}.percentage-45:after{width:45%}.percentage-46:after{width:46%}.percentage-47:after{width:47%}.percentage-48:after{width:48%}.percentage-49:after{width:49%}.percentage-50:after{width:50%}.percentage-51:after{width:51%}.percentage-52:after{width:52%}.percentage-53:after{width:53%}.percentage-54:after{width:54%}.percentage-55:after{width:55%}.percentage-56:after{width:56%}.percentage-57:after{width:57%}.percentage-58:after{width:58%}.percentage-59:after{width:59%}.percentage-60:after{width:60%}.percentage-61:after{width:61%}.percentage-62:after{width:62%}.percentage-63:after{width:63%}.percentage-64:after{width:64%}.percentage-65:after{width:65%}.percentage-66:after{width:66%}.percentage-67:after{width:67%}.percentage-68:after{width:68%}.percentage-69:after{width:69%}.percentage-70:after{width:70%}.percentage-71:after{width:71%}.percentage-72:after{width:72%}.percentage-73:after{width:73%}.percentage-74:after{width:74%}.percentage-75:after{width:75%}.percentage-76:after{width:76%}.percentage-77:after{width:77%}.percentage-78:after{width:78%}.percentage-79:after{width:79%}.percentage-80:after{width:80%}.percentage-81:after{width:81%}.percentage-82:after{width:82%}.percentage-83:after{width:83%}.percentage-84:after{width:84%}.percentage-85:after{width:85%}.percentage-86:after{width:86%}.percentage-87:after{width:87%}.percentage-88:after{width:88%}.percentage-89:after{width:89%}.percentage-90:after{width:90%}.percentage-91:after{width:91%}.percentage-92:after{width:92%}.percentage-93:after{width:93%}.percentage-94:after{width:94%}.percentage-95:after{width:95%}.percentage-96:after{width:96%}.percentage-97:after{width:97%}.percentage-98:after{width:98%}.percentage-99:after{width:99%}.percentage-100:after{width:100%}';const y=class{constructor(t){e(this,t);this.aggregateSummary=a(this,"aggregateSummary",6);this.questions=null;this.numberResponses=0}componentDidLoad(){this.numberResponses=this.questions[0].responses.length}calculatePercentage(e){return Math.ceil(e/this.numberResponses*100)}formatResponse(e){return e.replace(/^\d+\./,"").replace(/_(.*)_/,"").trim()}getQuestion(e){const t=this.questions.filter((t=>t.question.Question===e));return t.length>0?t[0]:null}getResponse(e,t){const r=e.responses.filter((e=>e.response.replace(t,"")!==e.response));return r.length>0?r[0]:null}aggregateResponses(e,t,r={}){const a=e===null||e===void 0?void 0:e.candidates.reduce(((e,r)=>{const a=r[t];if(!e[a]){e[a]=0}e[a]++;return e}),{});r[t]=a;return r}getSummary(e,t){const r=this.getQuestion(e);const a=this.getResponse(r,t);const i=this.aggregateResponses(a,"Race");return i}renderEnumerationSummary(e){const r=n(e.responses,e.question.Sort);const a=r.reduce(((e,t)=>{const r=this.formatResponse(t.response);if(!e[r]){e[r]={count:0}}e[r].count+=t.candidates.length;return e}),{});return t("dl",null,t("dt",{class:"question"},t("dc-election-query",{question:e.question})),Object.keys(a).map((r=>t("dd",{onClick:t=>this.exploreSummaryAggregation(e.question.Question,r),class:`percentage percentage-${this.calculatePercentage(a[r].count)}`},t("span",{class:"text"},r,": ",a[r].count)))))}exploreSummaryAggregation(e,t){const r=this.getSummary(e,t);console.debug("summaryCandidates",r);this.aggregateSummary.emit(r)}renderQuestionSummary(e){switch(e.question.Type){case i.Choice:return this.renderEnumerationSummary(e);default:return t("span",{class:"no-summary"},"No summary")}}render(){return t(r,null,t("slot",null),t("h3",null,"Summary of All ",this.numberResponses," Responses"),this.questions.map((e=>this.renderQuestionSummary(e))))}};y.style=w;export{l as dc_election_question,d as dc_feature_summary,p as dc_filter,g as dc_loader,m as dc_map,y as dc_survey_summary};
//# sourceMappingURL=p-5ca63888.entry.js.map