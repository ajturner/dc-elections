import{r as e,h as t,H as s,c as i}from"./p-2b9429d0.js";import{I as r,s as n}from"./p-cf4847a6.js";function o(e,t,s){let i=e[s],r=t[s];return void 0===i&&e.candidates&&e.candidates[0]&&void 0!==e.candidates[0][s]&&(i=e.candidates[0][s],r=t.candidates[0][s]),[i,r]}const a=class{constructor(t){e(this,t),this.question=null,this.showNoResponse=!1,this.type=r.Choice,this.responses=[]}applyFilters(e){return n.filter&&0!==n.filter.length?e.filter((e=>e.Race.match(n.filter))):e}renderNoResponse(){return t("div",null,"We did not receive any responses from candidates in this jurisdiction")}renderResponse(e,s=2){const i=this.applyFilters(e.candidates);if("No Response"!==e.response&&0!==i.length){let s=e.response.replace(/^[0-9]\.\s+/,"").replace(/(?:\r\n|\r|\n)/g,"<br>"),n="grid";switch(this.type){case r.Choice:return t("div",{class:"response-gallery"},t("dc-election-gallery",{appearance:n,candidates:i},t("div",{class:"response",innerHTML:s})));case r.Text:return n="quote",t("div",{class:"response-quote"},t("dc-election-gallery",{appearance:n,candidates:i}),t("div",{class:"response",innerHTML:s}));case r.Rank:case r.Option:n="quote";const e=s.split("|");return s=t("ol",{class:"rank-options"},e.map((e=>this.formatRankOptions(e)))),t("div",{class:"response-rank"},t("dc-election-gallery",{appearance:n,candidates:i}),t("div",{class:"response"},s))}}else if(this.showNoResponse){const s=e.candidates.map((e=>null==e?void 0:e.Candidate));return t("div",{class:"footnote"},"No response from ",s.join(", "))}}formatRankOptions(e){let s="unranked";switch(!0){case/\~(.*)\~/g.test(e):s="omit";break;case/^#/.test(e):s="ranked",e=e.replace(/^#/,"")}return e=e.replace(/\~(.*)\~ (\([\w\s]+\))/g,"<span class='text'>$1</span> <span class='comment'>$2</span>"),t("li",{class:s,innerHTML:e=`<span>${e}</span>`})}renderQuestion(e){const s=e.Question.replace(/(?:\r\n|\r|\n)/g,"<br>");let i="",r=s;try{[,i,r]=s.match(/_(.*)_(.*)/)}catch(e){}return[t("span",{class:"preface",innerHTML:i}),t("span",{class:"focus",innerHTML:r})]}render(){const e=function(e,t){return e.sort(((e,s)=>{let i="asc"===t[0].order?1:-1,r=t[0].attribute,[n,a]=o(e,s,r),l=1;for(;n===a&&void 0!==t[l];)i="asc"===t[l].order?1:-1,r=t[l].attribute,[n,a]=o(e,s,r),l++;return n>a?i:-i}))}(this.responses,this.question.Sort);return t(s,null,t("slot",null),this.renderQuestion(this.question),t("div",{class:`response layout-${this.type.toLowerCase()}`},0===e.length?this.renderNoResponse():null,e.map((e=>this.renderResponse(e,this.responses.length)))))}};a.style=':host{display:block;}.preface{font-weight:300;font-size:1em;display:block}.focus{font-weight:800;font-size:1.2em;padding-top:0.3em;padding-bottom:0.5em;position:sticky;background-color:white;opacity:0.9;top:0px;display:block}.response:empty::before{content:"No response to this question.";font-style:italic;font-weight:400}.response{font-weight:600;font-size:1em;padding:1em 0;margin-top:0.5em}.response-gallery .response::before{content:"\\203A"}.footnote{font-weight:300px;font-size:0.8em;font-style:italic;padding-top:0.5em}.layout-choice{display:grid;grid-gap:0.3em;grid-template-columns:repeat( auto-fit, minmax(400px, 1fr) )}.layout-choice .response{padding:0 0.3em 0.3em 0.3em;vertical-align:bottom}.response-quote,.response-rank{display:grid;grid-template-columns:0.1fr 1fr;padding:1em 0;border-bottom:thin solid #DDD}.response-rank .response{font-weight:300;padding:0}.response-quote .response{font-weight:400;font-size:1em;padding:0.4em;font-style:oblique;quotes:"\\201C""\\201D""\\2018""\\2019"}.response-quote .response:before{content:open-quote;color:#ccc;font-size:3em;line-height:0.1em;margin-right:0.25em;vertical-align:-0.4em}.response-quote .response:after{content:close-quote;color:#ccc;font-size:3em;line-height:0.1em;margin-right:0.25em;vertical-align:-0.4em}.rank-options{padding:0;margin:0;font:italic 1em Georgia;color:#666}.rank-options span{font:normal 1em Arial;color:#000}.rank-options li{border:1px solid #CCC;padding:0.5em;margin-left:1.5em;margin-bottom:0.5em}.rank-options .ranked{border:1px solid #0f9535}.rank-options li.omit,.rank-options li.unranked{list-style:none}.omit .text{font:normal 1em Arial;text-decoration:line-through;color:#555}.omit .comment{display:inline-block;text-decoration:unset;font-weight:100;padding-left:0.5em;font-style:italic}';const l=class{constructor(t){e(this,t),this.race=null,this.website=""}async componentWillLoad(){}renderWebsite(e){return console.log("renderWebsite",e),e&&e.length>0?t("span",null,"Website: ",t("a",{target:"_new",href:e},e)):""}renderCandidates(e=[]){let s=t("em",null,"No candidates");return e.length>0&&(s=t("ul",null,e.map((e=>t("li",null,e.Candidate," ",t("a",{href:e.Website},"email")))))),s}renderInfo(e){if(console.debug("render-feature-summary",{info:e}),void 0===e)return"";const s=e.candidates.filter((e=>""!==e.Candidate));return t("div",{id:"summary"},t("div",{id:"summary-race"},e.race),t("div",{id:"summary-website"},this.renderWebsite(this.website)),t("div",{id:"summary-candidates"},t("h4",null,"Candidates"),this.renderCandidates(s)))}render(){let e=[];return null!==this.race&&(e=this.renderInfo(this.candidates[this.race])),t(s,null,t("slot",null),e)}};l.style=":host{display:block}#summary{border:thin solid #BBB;padding:5px}#summary-race{font-weight:600;font-size:1.2em}#summary-candidates ul{margin:0 0 0 20px;padding-left:0}h4{padding:0;margin:5px 0 0 0}";const c=class{constructor(t){e(this,t),this.filterChanged=i(this,"filterChanged",6),this.filter="",this.url="https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Administrative_Other_Boundaries_WebMercator/MapServer/55/query?where=1%3D1&text=&objectIds=&time=&timeRelation=esriTimeRelationOverlaps&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=ANC_ID%2CSMD_ID&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=SMD_ID&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&sqlFormat=none&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json",this.m_filterOptions=[]}componentWillLoad(){this.fetchOptions()}async fetchOptions(){const e=[],t=await fetch(this.url);(await t.json()).features.map((t=>{e.push({ANC_ID:t.attributes.ANC_ID,SMD_ID:t.attributes.SMD_ID})})),this.m_filterOptions=e}groupBy(e,t){return e.reduce((function(e,s){return e[s[t]]=e[s[t]]||[],e[s[t]].push(s),e}),Object.create(null))}dropdownChangedHandler(e){this.filterChanged.emit({value:this.m_dropdownEl.value})}filterPropChanged(e){this.m_dropdownEl.value=e}renderOption(e,s=null){return t("calcite-combobox-item",{value:e,textLabel:e,selected:e===this.filter},s)}render(){const e=this.groupBy(this.m_filterOptions,"ANC_ID"),i=[];for(let t in e){const s=e[t].map((e=>this.renderOption(e.SMD_ID)));i.push(this.renderOption(t,s))}return t(s,null,t("slot",null),t("div",null,t("calcite-combobox",{ref:e=>this.m_dropdownEl=e,label:"search",placeholder:"Search by ANC","selection-mode":"single",scale:"m","max-items":"0"},i)))}static get watchers(){return{filter:["filterPropChanged"]}}};c.style=":host{display:block}";const d=class{constructor(t){e(this,t)}render(){return t(s,null,t("div",{class:"message"},t("slot",null)),t("div",{id:"arrowAnim"},t("div",{class:"arrowSliding"},t("div",{class:"arrow"})),t("div",{class:"arrowSliding delay1"},t("div",{class:"arrow"})),t("div",{class:"arrowSliding delay2"},t("div",{class:"arrow"})),t("div",{class:"arrowSliding delay3"},t("div",{class:"arrow"}))))}};d.style=":host{display:block}.message{font-weight:400;font-style:italic;color:#444;text-align:center}#arrowAnim{width:100vw;height:80vh;display:flex;justify-content:center;align-items:center;color:blue}.arrow{width:5vw;height:5vw;border:2.5vw solid;border-color:#0f9535 transparent transparent #0f9535;transform:rotate(135deg)}.arrowSliding{position:absolute;-webkit-animation:slide 4s linear infinite;animation:slide 4s linear infinite}.delay1{-webkit-animation-delay:1s;animation-delay:1s}.delay2{-webkit-animation-delay:2s;animation-delay:2s}.delay3{-webkit-animation-delay:3s;animation-delay:3s}@-webkit-keyframes slide{0%{opacity:0;transform:translateX(15vw)}20%{opacity:1;transform:translateX(9vw)}80%{opacity:1;transform:translateX(-9vw)}100%{opacity:0;transform:translateX(-15vw)}}@keyframes slide{0%{opacity:0;transform:translateX(15vw)}20%{opacity:1;transform:translateX(9vw)}80%{opacity:1;transform:translateX(-9vw)}100%{opacity:0;transform:translateX(-15vw)}}";const h=class{constructor(t){e(this,t),this.featureSelected=i(this,"featureSelected",6),this.m_layerViews={},this.m_layers={}}async selectFeature(e){console.log("dc-map: selectFeature",{feature:e}),this.highlightFeature({attributes:{ANC_ID:e.attributes.ANC_ID}}),this.featureSelected.emit({feature:e})}async handleMapViewReady(e){const{detail:{view:t,loadModules:s}}=e;this.m_view=t,this.m_view.map.basemap="streets-vector",s(["esri/geometry/Extent","esri/layers/FeatureLayer","esri/widgets/Home","esri/layers/support/LabelClass","esri/widgets/Search"]).then((([e,s,i,r,n])=>{const o=new r({labelExpressionInfo:{expression:"$feature.NAME"},symbol:{type:"text",color:"white",haloSize:.5,haloColor:"black",font:{size:12,weight:"bold"}}});this.m_layers.ancLayer=new s({url:"https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Administrative_Other_Boundaries_WebMercator/MapServer/54",renderer:{type:"simple",symbol:{type:"simple-fill",opacity:1,color:[0,0,0,0],outline:{width:.5,color:[255,255,255,.8]}}},labelingInfo:[o]});const a=new r({labelExpressionInfo:{expression:"$feature.SMD_ID"},symbol:{type:"text",color:"black",haloSize:.5,haloColor:"white",font:{size:8}}});this.m_layers.smdLayer=new s({url:"https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Administrative_Other_Boundaries_WebMercator/MapServer/55",outFields:["*"],renderer:{type:"simple",symbol:{type:"simple-fill",opacity:0,color:[200,200,200,.1],outline:{width:.5,color:"#0f9535"}}},maxScale:0,minScale:1e6,labelingInfo:[a]}),this.m_view.map.add(this.m_layers.ancLayer),this.m_view.map.add(this.m_layers.smdLayer),this.m_layers.boundaryLayer=new s({url:"https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Washington_DC_Boundary/FeatureServer",blendMode:"destination-in",maxScale:0,minScale:1e6}),this.m_view.map.add(this.m_layers.boundaryLayer),this.m_view.highlightOptions={color:"#0f9535"};const l=new e({xmin:-8584947.85844689,ymin:4691862.387048862,xmax:-8561472.787091771,ymax:4721095.072076196,spatialReference:{wkid:3857}});this.m_view.constraints={geometry:l,minScale:5e5,maxScale:1e4,rotationEnabled:!1};const c=new n({view:this.m_view,includeDefaultSources:!1,sources:[{url:"https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",name:"DC Address Search",zoomScale:5e4,popupEnabled:!1,filter:{geometry:l}},{layer:this.m_layers.smdLayer,placeholder:"Search SMD",maxResults:5,searchFields:["NAME"],displayField:"NAME",name:"DC SMD"}]});this.m_view.ui.add(c,{position:"top-left",index:2});let d=new i({view:this.m_view});t.ui.add(d,"top-left"),t.ui.move("zoom","top-right"),c.on("search-complete",(e=>{this.searchCompleteHandler(e)})),this.m_view.when().then((()=>this.m_layers.smdLayer.when())).then((e=>this.m_view.whenLayerView(e))).then((e=>{this.m_layerViews.smdLayer=e,this.m_view.on("pointer-move",(e=>{this.mapMouseHandler(e)})),this.m_view.on("pointer-down",(e=>{this.mapMouseHandler(e)}))})).then((()=>this.m_layers.ancLayer.when())).then((e=>this.m_view.whenLayerView(e))).then((e=>{this.m_layerViews.ancLayer=e}))}))}searchCompleteHandler(e){let t=e.results[0].results[0].feature,s=this.m_layerViews.smdLayer.createQuery();s.geometry=t.geometry,this.m_layers.smdLayer.queryFeatures(s).then((e=>{this.selectFeature(e.features[0])}))}mapMouseHandler(e){this.m_view.hitTest(e,{include:this.m_layers.smdLayer}).then((t=>{if(t.results.length){const s=t.results[0].graphic;this.outlineFeature(s),"pointer-down"===e.type&&(console.debug("dc-map: mapMouseHandler",{feature:s}),this.selectFeature(s))}}))}highlightFeature(e){const t=this.m_layerViews.ancLayer.createQuery();t.where=`NAME = '${e.attributes.ANC_ID}'`,this.m_layerViews.ancLayer.queryFeatures(t).then((s=>{if(console.debug("selectFeature 1",{feature:e,where:t.where,result:s}),this.m_highlight&&this.m_highlight.remove(),s&&s.features.length>0){const e=s.features[0];this.m_view.goTo({target:e.geometry},{duration:2e3,easing:"in-out-expo"}),console.debug("dc-map: highlightFeature",{lv:this.m_layerViews,an:this.m_layerViews.ancLayer,hl:this.m_layerViews.ancLayer.highlight}),this.m_highlight=this.m_layerViews.ancLayer.highlight(e.attributes.OBJECTID)}}))}outlineFeature(e){this.m_layers.smdLayer.featureEffect={filter:{where:`SMD_ID = '${e.attributes.SMD_ID}'`},excludedLabelsVisible:!0,includedEffect:"brightness(5) hue-rotate(270deg) contrast(100%) saturate(150%) "}}render(){return t(s,null,t("slot",null),t("arcgis-hub-map",{style:{height:"400px"},zoom:"10",center:"-77.05,38.9",basemap:"gray-vector"}))}};h.style=":host{display:block}arcgis-hub-map{border:thin solid #BBB}";export{a as dc_election_question,l as dc_feature_summary,c as dc_filter,d as dc_loader,h as dc_map}