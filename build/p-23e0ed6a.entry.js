import{r as t,h as i,H as e}from"./p-feb2bdf4.js";"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var n,r=(function(t){
/* @license
Papa Parse
v5.3.2
https://github.com/mholt/PapaParse
License: MIT
*/
t.exports=function t(){var i="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==i?i:{},e=!i.document&&!!i.postMessage,n=e&&/blob:/i.test((i.location||{}).protocol),r={},s=0,o={parse:function(e,n){var f=(n=n||{}).dynamicTyping||!1;if(j(f)&&(n.dynamicTypingFunction=f,f={}),n.dynamicTyping=f,n.transform=!!j(n.transform)&&n.transform,n.worker&&o.WORKERS_SUPPORTED){var h=function(){if(!o.WORKERS_SUPPORTED)return!1;var e,n,f=(e=i.URL||i.webkitURL||null,n=t.toString(),o.BLOB_URL||(o.BLOB_URL=e.createObjectURL(new Blob(["(",n,")();"],{type:"text/javascript"})))),h=new i.Worker(f);return h.onmessage=y,h.id=s++,r[h.id]=h}();return h.userStep=n.step,h.userChunk=n.chunk,h.userComplete=n.complete,h.userError=n.error,n.step=j(n.step),n.chunk=j(n.chunk),n.complete=j(n.complete),n.error=j(n.error),delete n.worker,void h.postMessage({input:e,config:n,workerId:h.id})}var l=null;return"string"==typeof e?l=n.download?new u(n):new c(n):!0===e.readable&&j(e.read)&&j(e.on)?l=new d(n):(i.File&&e instanceof File||e instanceof Object)&&(l=new a(n)),l.stream(e)},unparse:function(t,i){var e=!1,n=!0,r=",",s="\r\n",f='"',h=f+f,u=!1,a=null,c=!1;!function(){if("object"==typeof i){if("string"!=typeof i.delimiter||o.BAD_DELIMITERS.filter((function(t){return-1!==i.delimiter.indexOf(t)})).length||(r=i.delimiter),("boolean"==typeof i.quotes||"function"==typeof i.quotes||Array.isArray(i.quotes))&&(e=i.quotes),"boolean"!=typeof i.skipEmptyLines&&"string"!=typeof i.skipEmptyLines||(u=i.skipEmptyLines),"string"==typeof i.newline&&(s=i.newline),"string"==typeof i.quoteChar&&(f=i.quoteChar),"boolean"==typeof i.header&&(n=i.header),Array.isArray(i.columns)){if(0===i.columns.length)throw new Error("Option columns is empty");a=i.columns}void 0!==i.escapeChar&&(h=i.escapeChar+f),("boolean"==typeof i.escapeFormulae||i.escapeFormulae instanceof RegExp)&&(c=i.escapeFormulae instanceof RegExp?i.escapeFormulae:/^[=+\-@\t\r].*$/)}}();var d=new RegExp(v(f),"g");if("string"==typeof t&&(t=JSON.parse(t)),Array.isArray(t)){if(!t.length||Array.isArray(t[0]))return l(null,t,u);if("object"==typeof t[0])return l(a||Object.keys(t[0]),t,u)}else if("object"==typeof t)return"string"==typeof t.data&&(t.data=JSON.parse(t.data)),Array.isArray(t.data)&&(t.fields||(t.fields=t.meta&&t.meta.fields||a),t.fields||(t.fields=Array.isArray(t.data[0])?t.fields:"object"==typeof t.data[0]?Object.keys(t.data[0]):[]),Array.isArray(t.data[0])||"object"==typeof t.data[0]||(t.data=[t.data])),l(t.fields||[],t.data||[],u);throw new Error("Unable to serialize unrecognized input");function l(t,i,e){var o="";"string"==typeof t&&(t=JSON.parse(t)),"string"==typeof i&&(i=JSON.parse(i));var f=Array.isArray(t)&&0<t.length,h=!Array.isArray(i[0]);if(f&&n){for(var u=0;u<t.length;u++)0<u&&(o+=r),o+=p(t[u],u);0<i.length&&(o+=s)}for(var a=0;a<i.length;a++){var c=f?t.length:i[a].length,d=!1,l=f?0===Object.keys(i[a]).length:0===i[a].length;if(e&&!f&&(d="greedy"===e?""===i[a].join("").trim():1===i[a].length&&0===i[a][0].length),"greedy"===e&&f){for(var v=[],y=0;y<c;y++)v.push(i[a][h?t[y]:y]);d=""===v.join("").trim()}if(!d){for(var w=0;w<c;w++)0<w&&!l&&(o+=r),o+=p(i[a][f&&h?t[w]:w],w);a<i.length-1&&(!e||0<c&&!l)&&(o+=s)}}return o}function p(t,i){if(null==t)return"";if(t.constructor===Date)return JSON.stringify(t).slice(1,25);var n=!1;c&&"string"==typeof t&&c.test(t)&&(t="'"+t,n=!0);var s=t.toString().replace(d,h);return(n=n||!0===e||"function"==typeof e&&e(t,i)||Array.isArray(e)&&e[i]||function(t,i){for(var e=0;e<i.length;e++)if(-1<t.indexOf(i[e]))return!0;return!1}(s,o.BAD_DELIMITERS)||-1<s.indexOf(r)||" "===s.charAt(0)||" "===s.charAt(s.length-1))?f+s+f:s}}};if(o.RECORD_SEP=String.fromCharCode(30),o.UNIT_SEP=String.fromCharCode(31),o.BYTE_ORDER_MARK="\ufeff",o.BAD_DELIMITERS=["\r","\n",'"',o.BYTE_ORDER_MARK],o.WORKERS_SUPPORTED=!e&&!!i.Worker,o.NODE_STREAM_INPUT=1,o.LocalChunkSize=10485760,o.RemoteChunkSize=5242880,o.DefaultDelimiter=",",o.Parser=p,o.ParserHandle=l,o.NetworkStreamer=u,o.FileStreamer=a,o.StringStreamer=c,o.ReadableStreamStreamer=d,i.jQuery){var f=i.jQuery;f.fn.parse=function(t){var e=t.config||{},n=[];return this.each((function(){if("INPUT"!==f(this).prop("tagName").toUpperCase()||"file"!==f(this).attr("type").toLowerCase()||!i.FileReader||!this.files||0===this.files.length)return!0;for(var t=0;t<this.files.length;t++)n.push({file:this.files[t],inputElem:this,instanceConfig:f.extend({},e)})})),r(),this;function r(){if(0!==n.length){var i,e,r,h=n[0];if(j(t.before)){var u=t.before(h.file,h.inputElem);if("object"==typeof u){if("abort"===u.action)return"AbortError",i=h.file,e=h.inputElem,r=u.reason,void(j(t.error)&&t.error({name:"AbortError"},i,e,r));if("skip"===u.action)return void s();"object"==typeof u.config&&(h.instanceConfig=f.extend(h.instanceConfig,u.config))}else if("skip"===u)return void s()}var a=h.instanceConfig.complete;h.instanceConfig.complete=function(t){j(a)&&a(t,h.file,h.inputElem),s()},o.parse(h.file,h.instanceConfig)}else j(t.complete)&&t.complete()}function s(){n.splice(0,1),r()}}}function h(t){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(t){var i=g(t);i.chunkSize=parseInt(i.chunkSize),t.step||t.chunk||(i.chunkSize=null),this._handle=new l(i),(this._handle.streamer=this)._config=i}.call(this,t),this.parseChunk=function(t,e){if(this.isFirstChunk&&j(this._config.beforeFirstChunk)){var r=this._config.beforeFirstChunk(t);void 0!==r&&(t=r)}this.isFirstChunk=!1,this._halted=!1;var s=this._partialLine+t;this._partialLine="";var f=this._handle.parse(s,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var h=f.meta.cursor;this._finished||(this._partialLine=s.substring(h-this._baseIndex),this._baseIndex=h),f&&f.data&&(this._rowCount+=f.data.length);var u=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(n)i.postMessage({results:f,workerId:o.WORKER_ID,finished:u});else if(j(this._config.chunk)&&!e){if(this._config.chunk(f,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);f=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(f.data),this._completeResults.errors=this._completeResults.errors.concat(f.errors),this._completeResults.meta=f.meta),this._completed||!u||!j(this._config.complete)||f&&f.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),u||f&&f.meta.paused||this._nextChunk(),f}this._halted=!0},this._sendError=function(t){j(this._config.error)?this._config.error(t):n&&this._config.error&&i.postMessage({workerId:o.WORKER_ID,error:t,finished:!1})}}function u(t){var i;(t=t||{}).chunkSize||(t.chunkSize=o.RemoteChunkSize),h.call(this,t),this._nextChunk=e?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(t){this._input=t,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(i=new XMLHttpRequest,this._config.withCredentials&&(i.withCredentials=this._config.withCredentials),e||(i.onload=m(this._chunkLoaded,this),i.onerror=m(this._chunkError,this)),i.open(this._config.downloadRequestBody?"POST":"GET",this._input,!e),this._config.downloadRequestHeaders){var t=this._config.downloadRequestHeaders;for(var n in t)i.setRequestHeader(n,t[n])}this._config.chunkSize&&i.setRequestHeader("Range","bytes="+this._start+"-"+(this._start+this._config.chunkSize-1));try{i.send(this._config.downloadRequestBody)}catch(t){this._chunkError(t.message)}e&&0===i.status&&this._chunkError()}},this._chunkLoaded=function(){4===i.readyState&&(i.status<200||400<=i.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:i.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(t){var i=t.getResponseHeader("Content-Range");return null===i?-1:parseInt(i.substring(i.lastIndexOf("/")+1))}(i),this.parseChunk(i.responseText)))},this._chunkError=function(t){this._sendError(new Error(i.statusText||t))}}function a(t){var i,e;(t=t||{}).chunkSize||(t.chunkSize=o.LocalChunkSize),h.call(this,t);var n="undefined"!=typeof FileReader;this.stream=function(t){this._input=t,e=t.slice||t.webkitSlice||t.mozSlice,n?((i=new FileReader).onload=m(this._chunkLoaded,this),i.onerror=m(this._chunkError,this)):i=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var t=this._input;if(this._config.chunkSize){var r=Math.min(this._start+this._config.chunkSize,this._input.size);t=e.call(t,this._start,r)}var s=i.readAsText(t,this._config.encoding);n||this._chunkLoaded({target:{result:s}})},this._chunkLoaded=function(t){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(t.target.result)},this._chunkError=function(){this._sendError(i.error)}}function c(t){var i;h.call(this,t=t||{}),this.stream=function(t){return i=t,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var t,e=this._config.chunkSize;return e?(t=i.substring(0,e),i=i.substring(e)):(t=i,i=""),this._finished=!i,this.parseChunk(t)}}}function d(t){h.call(this,t=t||{});var i=[],e=!0,n=!1;this.pause=function(){h.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){h.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(t){this._input=t,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){n&&1===i.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),i.length?this.parseChunk(i.shift()):e=!0},this._streamData=m((function(t){try{i.push("string"==typeof t?t:t.toString(this._config.encoding)),e&&(e=!1,this._checkIsFinished(),this.parseChunk(i.shift()))}catch(t){this._streamError(t)}}),this),this._streamError=m((function(t){this._streamCleanUp(),this._sendError(t)}),this),this._streamEnd=m((function(){this._streamCleanUp(),n=!0,this._streamData("")}),this),this._streamCleanUp=m((function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)}),this)}function l(t){var i,e,n,r=Math.pow(2,53),s=-r,f=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,h=/^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/,u=this,a=0,c=0,d=!1,l=!1,y=[],w={data:[],errors:[],meta:{}};if(j(t.step)){var b=t.step;t.step=function(i){if(w=i,A())E();else{if(E(),0===w.data.length)return;a+=i.data.length,t.preview&&a>t.preview?e.abort():(w.data=w.data[0],b(w,u))}}}function m(i){return"greedy"===t.skipEmptyLines?""===i.join("").trim():1===i.length&&0===i[0].length}function E(){return w&&n&&(T("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+o.DefaultDelimiter+"'"),n=!1),t.skipEmptyLines&&(w.data=w.data.filter((function(t){return!m(t)}))),A()&&function(){if(w)if(Array.isArray(w.data[0])){for(var i=0;A()&&i<w.data.length;i++)w.data[i].forEach(e);w.data.splice(0,1)}else w.data.forEach(e);function e(i,e){j(t.transformHeader)&&(i=t.transformHeader(i,e)),y.push(i)}}(),function(){if(!w||!t.header&&!t.dynamicTyping&&!t.transform)return w;function i(i,e){var n,r=t.header?{}:[];for(n=0;n<i.length;n++){var s=n,o=i[n];t.header&&(s=n>=y.length?"__parsed_extra":y[n]),t.transform&&(o=t.transform(o,s)),o=O(s,o),"__parsed_extra"===s?(r[s]=r[s]||[],r[s].push(o)):r[s]=o}return t.header&&(n>y.length?T("FieldMismatch","TooManyFields","Too many fields: expected "+y.length+" fields but parsed "+n,c+e):n<y.length&&T("FieldMismatch","TooFewFields","Too few fields: expected "+y.length+" fields but parsed "+n,c+e)),r}var e=1;return!w.data.length||Array.isArray(w.data[0])?(w.data=w.data.map(i),e=w.data.length):w.data=i(w.data,0),t.header&&w.meta&&(w.meta.fields=y),c+=e,w}()}function A(){return t.header&&0===y.length}function O(i,e){return n=i,t.dynamicTypingFunction&&void 0===t.dynamicTyping[n]&&(t.dynamicTyping[n]=t.dynamicTypingFunction(n)),!0===(t.dynamicTyping[n]||t.dynamicTyping)?"true"===e||"TRUE"===e||"false"!==e&&"FALSE"!==e&&(function(t){if(f.test(t)){var i=parseFloat(t);if(s<i&&i<r)return!0}return!1}(e)?parseFloat(e):h.test(e)?new Date(e):""===e?null:e):e;var n}function T(t,i,e,n){var r={type:t,code:i,message:e};void 0!==n&&(r.row=n),w.errors.push(r)}this.parse=function(r,s,f){if(t.newline||(t.newline=function(t,i){t=t.substring(0,1048576);var e=new RegExp(v(i)+"([^]*?)"+v(i),"gm"),n=(t=t.replace(e,"")).split("\r"),r=t.split("\n");if(1===n.length||1<r.length&&r[0].length<n[0].length)return"\n";for(var s=0,o=0;o<n.length;o++)"\n"===n[o][0]&&s++;return s>=n.length/2?"\r\n":"\r"}(r,t.quoteChar||'"')),n=!1,t.delimiter)j(t.delimiter)&&(t.delimiter=t.delimiter(r),w.meta.delimiter=t.delimiter);else{var h=function(i,e,n,r,s){var f,h,u,a;s=s||[",","\t","|",";",o.RECORD_SEP,o.UNIT_SEP];for(var c=0;c<s.length;c++){var d=s[c],l=0,v=0,y=0;u=void 0;for(var w=new p({comments:r,delimiter:d,newline:e,preview:10}).parse(i),b=0;b<w.data.length;b++)if(n&&m(w.data[b]))y++;else{var g=w.data[b].length;v+=g,void 0!==u?0<g&&(l+=Math.abs(g-u),u=g):u=g}0<w.data.length&&(v/=w.data.length-y),(void 0===h||l<=h)&&(void 0===a||a<v)&&1.99<v&&(h=l,f=d,a=v)}return{successful:!!(t.delimiter=f),bestDelimiter:f}}(r,t.newline,t.skipEmptyLines,t.comments,t.delimitersToGuess);h.successful?t.delimiter=h.bestDelimiter:(n=!0,t.delimiter=o.DefaultDelimiter),w.meta.delimiter=t.delimiter}var u=g(t);return t.preview&&t.header&&u.preview++,i=r,e=new p(u),w=e.parse(i,s,f),E(),d?{meta:{paused:!0}}:w||{meta:{paused:!1}}},this.paused=function(){return d},this.pause=function(){d=!0,e.abort(),i=j(t.chunk)?"":i.substring(e.getCharIndex())},this.resume=function(){u.streamer._halted?(d=!1,u.streamer.parseChunk(i,!0)):setTimeout(u.resume,3)},this.aborted=function(){return l},this.abort=function(){l=!0,e.abort(),w.meta.aborted=!0,j(t.complete)&&t.complete(w),i=""}}function v(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function p(t){var i,e=(t=t||{}).delimiter,n=t.newline,r=t.comments,s=t.step,f=t.preview,h=t.fastMode,u=i=null==t.quoteChar?'"':t.quoteChar;if(void 0!==t.escapeChar&&(u=t.escapeChar),("string"!=typeof e||-1<o.BAD_DELIMITERS.indexOf(e))&&(e=","),r===e)throw new Error("Comment character same as delimiter");!0===r?r="#":("string"!=typeof r||-1<o.BAD_DELIMITERS.indexOf(r))&&(r=!1),"\n"!==n&&"\r"!==n&&"\r\n"!==n&&(n="\n");var a=0,c=!1;this.parse=function(t,o,d){if("string"!=typeof t)throw new Error("Input must be a string");var l=t.length,p=e.length,y=n.length,w=r.length,b=j(s),g=[],m=[],E=[],A=a=0;if(!t)return D();if(h||!1!==h&&-1===t.indexOf(i)){for(var O=t.split(n),T=0;T<O.length;T++){if(a+=(E=O[T]).length,T!==O.length-1)a+=n.length;else if(d)return D();if(!r||E.substring(0,w)!==r){if(b){if(g=[],q(E.split(e)),Q(),c)return D()}else q(E.split(e));if(f&&f<=T)return g=g.slice(0,f),D(!0)}}return D()}for(var x=t.indexOf(e,a),R=t.indexOf(n,a),F=new RegExp(v(u)+v(i),"g"),k=t.indexOf(i,a);;)if(t[a]!==i)if(r&&0===E.length&&t.substring(a,a+w)===r){if(-1===R)return D();R=t.indexOf(n,a=R+y),x=t.indexOf(e,a)}else if(-1!==x&&(x<R||-1===R))E.push(t.substring(a,x)),x=t.indexOf(e,a=x+p);else{if(-1===R)break;if(E.push(t.substring(a,R)),_(R+y),b&&(Q(),c))return D();if(f&&g.length>=f)return D(!0)}else for(k=a,a++;;){if(-1===(k=t.indexOf(i,k+1)))return d||m.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:g.length,index:a}),N();if(k===l-1)return N(t.substring(a,k).replace(F,i));if(i!==u||t[k+1]!==u){if(i===u||0===k||t[k-1]!==u){-1!==x&&x<k+1&&(x=t.indexOf(e,k+1)),-1!==R&&R<k+1&&(R=t.indexOf(n,k+1));var I=M(-1===R?x:Math.min(x,R));if(t.substr(k+1+I,p)===e){E.push(t.substring(a,k).replace(F,i)),t[a=k+1+I+p]!==i&&(k=t.indexOf(i,a)),x=t.indexOf(e,a),R=t.indexOf(n,a);break}var S=M(R);if(t.substring(k+1+S,k+1+S+y)===n){if(E.push(t.substring(a,k).replace(F,i)),_(k+1+S+y),x=t.indexOf(e,a),k=t.indexOf(i,a),b&&(Q(),c))return D();if(f&&g.length>=f)return D(!0);break}m.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:g.length,index:a}),k++}}else k++}return N();function q(t){g.push(t),A=a}function M(i){var e=0;if(-1!==i){var n=t.substring(k+1,i);n&&""===n.trim()&&(e=n.length)}return e}function N(i){return d||(void 0===i&&(i=t.substring(a)),E.push(i),a=l,q(E),b&&Q()),D()}function _(i){a=i,q(E),E=[],R=t.indexOf(n,a)}function D(t){return{data:g,errors:m,meta:{delimiter:e,linebreak:n,aborted:c,truncated:!!t,cursor:A+(o||0)}}}function Q(){s(D()),g=[],m=[]}},this.abort=function(){c=!0},this.getCharIndex=function(){return a}}function y(t){var i=t.data,e=r[i.workerId],n=!1;if(i.error)e.userError(i.error,i.file);else if(i.results&&i.results.data){var s={abort:function(){n=!0,w(i.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:b,resume:b};if(j(e.userStep)){for(var o=0;o<i.results.data.length&&(e.userStep({data:i.results.data[o],errors:i.results.errors,meta:i.results.meta},s),!n);o++);delete i.results}else j(e.userChunk)&&(e.userChunk(i.results,s,i.file),delete i.results)}i.finished&&!n&&w(i.workerId,i.results)}function w(t,i){var e=r[t];j(e.userComplete)&&e.userComplete(i),e.terminate(),delete r[t]}function b(){throw new Error("Not implemented.")}function g(t){if("object"!=typeof t||null===t)return t;var i=Array.isArray(t)?[]:{};for(var e in t)i[e]=g(t[e]);return i}function m(t,i){return function(){t.apply(i,arguments)}}function j(t){return"function"==typeof t}return n&&(i.onmessage=function(t){var e=t.data;if(void 0===o.WORKER_ID&&e&&(o.WORKER_ID=e.workerId),"string"==typeof e.input)i.postMessage({workerId:o.WORKER_ID,results:o.parse(e.input,e.config),finished:!0});else if(i.File&&e.input instanceof File||e.input instanceof Object){var n=o.parse(e.input,e.config);n&&i.postMessage({workerId:o.WORKER_ID,results:n,finished:!0})}}),(u.prototype=Object.create(h.prototype)).constructor=u,(a.prototype=Object.create(h.prototype)).constructor=a,(c.prototype=Object.create(c.prototype)).constructor=c,(d.prototype=Object.create(h.prototype)).constructor=d,o}()}(n={path:undefined,exports:{},require:function(){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}()}}),n.exports);const s=class{constructor(i){t(this,i),this.filename=null,this.candidates=[],this.questions=[]}async fetchCandidates(t){if(null===t)return[];const i=await fetch(t),e=await i.text(),n=r.parse(e,{header:!0});return this.candidates=n.data,this.questions=n.meta.fields.slice(3).map((t=>({question:t,responses:this.groupQuestionResponses(t,this.candidates)}))),[]}validateAnswer(t,i="No Response"){return t&&0!==t.length?t:i}groupQuestionResponses(t,i){const e=[];return i.map((i=>{const n=this.validateAnswer(i[t]);let r=e.find((t=>t.response===n));if(!r){const t=e.push({response:n,candidates:[]});r=e[t-1]}r.candidates.push(i)})),e}componentWillLoad(){this.fetchCandidates(this.filename)}render(){return i(e,null,i("slot",{name:"title"}),i("div",{class:"questions"},this.questions.map((t=>i("dc-election-question",{question:t.question,responses:t.responses})))))}};s.style=":host{display:block;font-family:sans-serif}";export{s as dc_election_survey}