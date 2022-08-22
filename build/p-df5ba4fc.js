"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var t,i,e=(function(t){
/* @license
Papa Parse
v5.3.2
https://github.com/mholt/PapaParse
License: MIT
*/
t.exports=function t(){var i="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==i?i:{},e=!i.document&&!!i.postMessage,n=e&&/blob:/i.test((i.location||{}).protocol),r={},s=0,o={parse:function(e,n){var f=(n=n||{}).dynamicTyping||!1;if(j(f)&&(n.dynamicTypingFunction=f,f={}),n.dynamicTyping=f,n.transform=!!j(n.transform)&&n.transform,n.worker&&o.WORKERS_SUPPORTED){var u=function(){if(!o.WORKERS_SUPPORTED)return!1;var e,n,f=(e=i.URL||i.webkitURL||null,n=t.toString(),o.BLOB_URL||(o.BLOB_URL=e.createObjectURL(new Blob(["(",n,")();"],{type:"text/javascript"})))),u=new i.Worker(f);return u.onmessage=y,u.id=s++,r[u.id]=u}();return u.userStep=n.step,u.userChunk=n.chunk,u.userComplete=n.complete,u.userError=n.error,n.step=j(n.step),n.chunk=j(n.chunk),n.complete=j(n.complete),n.error=j(n.error),delete n.worker,void u.postMessage({input:e,config:n,workerId:u.id})}var l=null;return"string"==typeof e?l=n.download?new h(n):new c(n):!0===e.readable&&j(e.read)&&j(e.on)?l=new d(n):(i.File&&e instanceof File||e instanceof Object)&&(l=new a(n)),l.stream(e)},unparse:function(t,i){var e=!1,n=!0,r=",",s="\r\n",f='"',u=f+f,h=!1,a=null,c=!1;!function(){if("object"==typeof i){if("string"!=typeof i.delimiter||o.BAD_DELIMITERS.filter((function(t){return-1!==i.delimiter.indexOf(t)})).length||(r=i.delimiter),("boolean"==typeof i.quotes||"function"==typeof i.quotes||Array.isArray(i.quotes))&&(e=i.quotes),"boolean"!=typeof i.skipEmptyLines&&"string"!=typeof i.skipEmptyLines||(h=i.skipEmptyLines),"string"==typeof i.newline&&(s=i.newline),"string"==typeof i.quoteChar&&(f=i.quoteChar),"boolean"==typeof i.header&&(n=i.header),Array.isArray(i.columns)){if(0===i.columns.length)throw new Error("Option columns is empty");a=i.columns}void 0!==i.escapeChar&&(u=i.escapeChar+f),("boolean"==typeof i.escapeFormulae||i.escapeFormulae instanceof RegExp)&&(c=i.escapeFormulae instanceof RegExp?i.escapeFormulae:/^[=+\-@\t\r].*$/)}}();var d=new RegExp(v(f),"g");if("string"==typeof t&&(t=JSON.parse(t)),Array.isArray(t)){if(!t.length||Array.isArray(t[0]))return l(null,t,h);if("object"==typeof t[0])return l(a||Object.keys(t[0]),t,h)}else if("object"==typeof t)return"string"==typeof t.data&&(t.data=JSON.parse(t.data)),Array.isArray(t.data)&&(t.fields||(t.fields=t.meta&&t.meta.fields||a),t.fields||(t.fields=Array.isArray(t.data[0])?t.fields:"object"==typeof t.data[0]?Object.keys(t.data[0]):[]),Array.isArray(t.data[0])||"object"==typeof t.data[0]||(t.data=[t.data])),l(t.fields||[],t.data||[],h);throw new Error("Unable to serialize unrecognized input");function l(t,i,e){var o="";"string"==typeof t&&(t=JSON.parse(t)),"string"==typeof i&&(i=JSON.parse(i));var f=Array.isArray(t)&&0<t.length,u=!Array.isArray(i[0]);if(f&&n){for(var h=0;h<t.length;h++)0<h&&(o+=r),o+=p(t[h],h);0<i.length&&(o+=s)}for(var a=0;a<i.length;a++){var c=f?t.length:i[a].length,d=!1,l=f?0===Object.keys(i[a]).length:0===i[a].length;if(e&&!f&&(d="greedy"===e?""===i[a].join("").trim():1===i[a].length&&0===i[a][0].length),"greedy"===e&&f){for(var v=[],y=0;y<c;y++)v.push(i[a][u?t[y]:y]);d=""===v.join("").trim()}if(!d){for(var g=0;g<c;g++)0<g&&!l&&(o+=r),o+=p(i[a][f&&u?t[g]:g],g);a<i.length-1&&(!e||0<c&&!l)&&(o+=s)}}return o}function p(t,i){if(null==t)return"";if(t.constructor===Date)return JSON.stringify(t).slice(1,25);var n=!1;c&&"string"==typeof t&&c.test(t)&&(t="'"+t,n=!0);var s=t.toString().replace(d,u);return(n=n||!0===e||"function"==typeof e&&e(t,i)||Array.isArray(e)&&e[i]||function(t,i){for(var e=0;e<i.length;e++)if(-1<t.indexOf(i[e]))return!0;return!1}(s,o.BAD_DELIMITERS)||-1<s.indexOf(r)||" "===s.charAt(0)||" "===s.charAt(s.length-1))?f+s+f:s}}};if(o.RECORD_SEP=String.fromCharCode(30),o.UNIT_SEP=String.fromCharCode(31),o.BYTE_ORDER_MARK="\ufeff",o.BAD_DELIMITERS=["\r","\n",'"',o.BYTE_ORDER_MARK],o.WORKERS_SUPPORTED=!e&&!!i.Worker,o.NODE_STREAM_INPUT=1,o.LocalChunkSize=10485760,o.RemoteChunkSize=5242880,o.DefaultDelimiter=",",o.Parser=p,o.ParserHandle=l,o.NetworkStreamer=h,o.FileStreamer=a,o.StringStreamer=c,o.ReadableStreamStreamer=d,i.jQuery){var f=i.jQuery;f.fn.parse=function(t){var e=t.config||{},n=[];return this.each((function(){if("INPUT"!==f(this).prop("tagName").toUpperCase()||"file"!==f(this).attr("type").toLowerCase()||!i.FileReader||!this.files||0===this.files.length)return!0;for(var t=0;t<this.files.length;t++)n.push({file:this.files[t],inputElem:this,instanceConfig:f.extend({},e)})})),r(),this;function r(){if(0!==n.length){var i,e,r,u=n[0];if(j(t.before)){var h=t.before(u.file,u.inputElem);if("object"==typeof h){if("abort"===h.action)return"AbortError",i=u.file,e=u.inputElem,r=h.reason,void(j(t.error)&&t.error({name:"AbortError"},i,e,r));if("skip"===h.action)return void s();"object"==typeof h.config&&(u.instanceConfig=f.extend(u.instanceConfig,h.config))}else if("skip"===h)return void s()}var a=u.instanceConfig.complete;u.instanceConfig.complete=function(t){j(a)&&a(t,u.file,u.inputElem),s()},o.parse(u.file,u.instanceConfig)}else j(t.complete)&&t.complete()}function s(){n.splice(0,1),r()}}}function u(t){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(t){var i=b(t);i.chunkSize=parseInt(i.chunkSize),t.step||t.chunk||(i.chunkSize=null),this._handle=new l(i),(this._handle.streamer=this)._config=i}.call(this,t),this.parseChunk=function(t,e){if(this.isFirstChunk&&j(this._config.beforeFirstChunk)){var r=this._config.beforeFirstChunk(t);void 0!==r&&(t=r)}this.isFirstChunk=!1,this._halted=!1;var s=this._partialLine+t;this._partialLine="";var f=this._handle.parse(s,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var u=f.meta.cursor;this._finished||(this._partialLine=s.substring(u-this._baseIndex),this._baseIndex=u),f&&f.data&&(this._rowCount+=f.data.length);var h=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(n)i.postMessage({results:f,workerId:o.WORKER_ID,finished:h});else if(j(this._config.chunk)&&!e){if(this._config.chunk(f,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);f=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(f.data),this._completeResults.errors=this._completeResults.errors.concat(f.errors),this._completeResults.meta=f.meta),this._completed||!h||!j(this._config.complete)||f&&f.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),h||f&&f.meta.paused||this._nextChunk(),f}this._halted=!0},this._sendError=function(t){j(this._config.error)?this._config.error(t):n&&this._config.error&&i.postMessage({workerId:o.WORKER_ID,error:t,finished:!1})}}function h(t){var i;(t=t||{}).chunkSize||(t.chunkSize=o.RemoteChunkSize),u.call(this,t),this._nextChunk=e?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(t){this._input=t,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(i=new XMLHttpRequest,this._config.withCredentials&&(i.withCredentials=this._config.withCredentials),e||(i.onload=m(this._chunkLoaded,this),i.onerror=m(this._chunkError,this)),i.open(this._config.downloadRequestBody?"POST":"GET",this._input,!e),this._config.downloadRequestHeaders){var t=this._config.downloadRequestHeaders;for(var n in t)i.setRequestHeader(n,t[n])}this._config.chunkSize&&i.setRequestHeader("Range","bytes="+this._start+"-"+(this._start+this._config.chunkSize-1));try{i.send(this._config.downloadRequestBody)}catch(t){this._chunkError(t.message)}e&&0===i.status&&this._chunkError()}},this._chunkLoaded=function(){4===i.readyState&&(i.status<200||400<=i.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:i.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(t){var i=t.getResponseHeader("Content-Range");return null===i?-1:parseInt(i.substring(i.lastIndexOf("/")+1))}(i),this.parseChunk(i.responseText)))},this._chunkError=function(t){this._sendError(new Error(i.statusText||t))}}function a(t){var i,e;(t=t||{}).chunkSize||(t.chunkSize=o.LocalChunkSize),u.call(this,t);var n="undefined"!=typeof FileReader;this.stream=function(t){this._input=t,e=t.slice||t.webkitSlice||t.mozSlice,n?((i=new FileReader).onload=m(this._chunkLoaded,this),i.onerror=m(this._chunkError,this)):i=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var t=this._input;if(this._config.chunkSize){var r=Math.min(this._start+this._config.chunkSize,this._input.size);t=e.call(t,this._start,r)}var s=i.readAsText(t,this._config.encoding);n||this._chunkLoaded({target:{result:s}})},this._chunkLoaded=function(t){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(t.target.result)},this._chunkError=function(){this._sendError(i.error)}}function c(t){var i;u.call(this,t=t||{}),this.stream=function(t){return i=t,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var t,e=this._config.chunkSize;return e?(t=i.substring(0,e),i=i.substring(e)):(t=i,i=""),this._finished=!i,this.parseChunk(t)}}}function d(t){u.call(this,t=t||{});var i=[],e=!0,n=!1;this.pause=function(){u.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){u.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(t){this._input=t,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){n&&1===i.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),i.length?this.parseChunk(i.shift()):e=!0},this._streamData=m((function(t){try{i.push("string"==typeof t?t:t.toString(this._config.encoding)),e&&(e=!1,this._checkIsFinished(),this.parseChunk(i.shift()))}catch(t){this._streamError(t)}}),this),this._streamError=m((function(t){this._streamCleanUp(),this._sendError(t)}),this),this._streamEnd=m((function(){this._streamCleanUp(),n=!0,this._streamData("")}),this),this._streamCleanUp=m((function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)}),this)}function l(t){var i,e,n,r=Math.pow(2,53),s=-r,f=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,u=/^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/,h=this,a=0,c=0,d=!1,l=!1,y=[],g={data:[],errors:[],meta:{}};if(j(t.step)){var w=t.step;t.step=function(i){if(g=i,A())E();else{if(E(),0===g.data.length)return;a+=i.data.length,t.preview&&a>t.preview?e.abort():(g.data=g.data[0],w(g,h))}}}function m(i){return"greedy"===t.skipEmptyLines?""===i.join("").trim():1===i.length&&0===i[0].length}function E(){return g&&n&&(T("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+o.DefaultDelimiter+"'"),n=!1),t.skipEmptyLines&&(g.data=g.data.filter((function(t){return!m(t)}))),A()&&function(){if(g)if(Array.isArray(g.data[0])){for(var i=0;A()&&i<g.data.length;i++)g.data[i].forEach(e);g.data.splice(0,1)}else g.data.forEach(e);function e(i,e){j(t.transformHeader)&&(i=t.transformHeader(i,e)),y.push(i)}}(),function(){if(!g||!t.header&&!t.dynamicTyping&&!t.transform)return g;function i(i,e){var n,r=t.header?{}:[];for(n=0;n<i.length;n++){var s=n,o=i[n];t.header&&(s=n>=y.length?"__parsed_extra":y[n]),t.transform&&(o=t.transform(o,s)),o=O(s,o),"__parsed_extra"===s?(r[s]=r[s]||[],r[s].push(o)):r[s]=o}return t.header&&(n>y.length?T("FieldMismatch","TooManyFields","Too many fields: expected "+y.length+" fields but parsed "+n,c+e):n<y.length&&T("FieldMismatch","TooFewFields","Too few fields: expected "+y.length+" fields but parsed "+n,c+e)),r}var e=1;return!g.data.length||Array.isArray(g.data[0])?(g.data=g.data.map(i),e=g.data.length):g.data=i(g.data,0),t.header&&g.meta&&(g.meta.fields=y),c+=e,g}()}function A(){return t.header&&0===y.length}function O(i,e){return n=i,t.dynamicTypingFunction&&void 0===t.dynamicTyping[n]&&(t.dynamicTyping[n]=t.dynamicTypingFunction(n)),!0===(t.dynamicTyping[n]||t.dynamicTyping)?"true"===e||"TRUE"===e||"false"!==e&&"FALSE"!==e&&(function(t){if(f.test(t)){var i=parseFloat(t);if(s<i&&i<r)return!0}return!1}(e)?parseFloat(e):u.test(e)?new Date(e):""===e?null:e):e;var n}function T(t,i,e,n){var r={type:t,code:i,message:e};void 0!==n&&(r.row=n),g.errors.push(r)}this.parse=function(r,s,f){if(t.newline||(t.newline=function(t,i){t=t.substring(0,1048576);var e=new RegExp(v(i)+"([^]*?)"+v(i),"gm"),n=(t=t.replace(e,"")).split("\r"),r=t.split("\n");if(1===n.length||1<r.length&&r[0].length<n[0].length)return"\n";for(var s=0,o=0;o<n.length;o++)"\n"===n[o][0]&&s++;return s>=n.length/2?"\r\n":"\r"}(r,t.quoteChar||'"')),n=!1,t.delimiter)j(t.delimiter)&&(t.delimiter=t.delimiter(r),g.meta.delimiter=t.delimiter);else{var u=function(i,e,n,r,s){var f,u,h,a;s=s||[",","\t","|",";",o.RECORD_SEP,o.UNIT_SEP];for(var c=0;c<s.length;c++){var d=s[c],l=0,v=0,y=0;h=void 0;for(var g=new p({comments:r,delimiter:d,newline:e,preview:10}).parse(i),w=0;w<g.data.length;w++)if(n&&m(g.data[w]))y++;else{var b=g.data[w].length;v+=b,void 0!==h?0<b&&(l+=Math.abs(b-h),h=b):h=b}0<g.data.length&&(v/=g.data.length-y),(void 0===u||l<=u)&&(void 0===a||a<v)&&1.99<v&&(u=l,f=d,a=v)}return{successful:!!(t.delimiter=f),bestDelimiter:f}}(r,t.newline,t.skipEmptyLines,t.comments,t.delimitersToGuess);u.successful?t.delimiter=u.bestDelimiter:(n=!0,t.delimiter=o.DefaultDelimiter),g.meta.delimiter=t.delimiter}var h=b(t);return t.preview&&t.header&&h.preview++,i=r,e=new p(h),g=e.parse(i,s,f),E(),d?{meta:{paused:!0}}:g||{meta:{paused:!1}}},this.paused=function(){return d},this.pause=function(){d=!0,e.abort(),i=j(t.chunk)?"":i.substring(e.getCharIndex())},this.resume=function(){h.streamer._halted?(d=!1,h.streamer.parseChunk(i,!0)):setTimeout(h.resume,3)},this.aborted=function(){return l},this.abort=function(){l=!0,e.abort(),g.meta.aborted=!0,j(t.complete)&&t.complete(g),i=""}}function v(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function p(t){var i,e=(t=t||{}).delimiter,n=t.newline,r=t.comments,s=t.step,f=t.preview,u=t.fastMode,h=i=null==t.quoteChar?'"':t.quoteChar;if(void 0!==t.escapeChar&&(h=t.escapeChar),("string"!=typeof e||-1<o.BAD_DELIMITERS.indexOf(e))&&(e=","),r===e)throw new Error("Comment character same as delimiter");!0===r?r="#":("string"!=typeof r||-1<o.BAD_DELIMITERS.indexOf(r))&&(r=!1),"\n"!==n&&"\r"!==n&&"\r\n"!==n&&(n="\n");var a=0,c=!1;this.parse=function(t,o,d){if("string"!=typeof t)throw new Error("Input must be a string");var l=t.length,p=e.length,y=n.length,g=r.length,w=j(s),b=[],m=[],E=[],A=a=0;if(!t)return Q();if(u||!1!==u&&-1===t.indexOf(i)){for(var O=t.split(n),T=0;T<O.length;T++){if(a+=(E=O[T]).length,T!==O.length-1)a+=n.length;else if(d)return Q();if(!r||E.substring(0,g)!==r){if(w){if(b=[],M(E.split(e)),D(),c)return Q()}else M(E.split(e));if(f&&f<=T)return b=b.slice(0,f),Q(!0)}}return Q()}for(var x=t.indexOf(e,a),R=t.indexOf(n,a),F=new RegExp(v(h)+v(i),"g"),k=t.indexOf(i,a);;)if(t[a]!==i)if(r&&0===E.length&&t.substring(a,a+g)===r){if(-1===R)return Q();R=t.indexOf(n,a=R+y),x=t.indexOf(e,a)}else if(-1!==x&&(x<R||-1===R))E.push(t.substring(a,x)),x=t.indexOf(e,a=x+p);else{if(-1===R)break;if(E.push(t.substring(a,R)),q(R+y),w&&(D(),c))return Q();if(f&&b.length>=f)return Q(!0)}else for(k=a,a++;;){if(-1===(k=t.indexOf(i,k+1)))return d||m.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:b.length,index:a}),$();if(k===l-1)return $(t.substring(a,k).replace(F,i));if(i!==h||t[k+1]!==h){if(i===h||0===k||t[k-1]!==h){-1!==x&&x<k+1&&(x=t.indexOf(e,k+1)),-1!==R&&R<k+1&&(R=t.indexOf(n,k+1));var I=N(-1===R?x:Math.min(x,R));if(t.substr(k+1+I,p)===e){E.push(t.substring(a,k).replace(F,i)),t[a=k+1+I+p]!==i&&(k=t.indexOf(i,a)),x=t.indexOf(e,a),R=t.indexOf(n,a);break}var S=N(R);if(t.substring(k+1+S,k+1+S+y)===n){if(E.push(t.substring(a,k).replace(F,i)),q(k+1+S+y),x=t.indexOf(e,a),k=t.indexOf(i,a),w&&(D(),c))return Q();if(f&&b.length>=f)return Q(!0);break}m.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:b.length,index:a}),k++}}else k++}return $();function M(t){b.push(t),A=a}function N(i){var e=0;if(-1!==i){var n=t.substring(k+1,i);n&&""===n.trim()&&(e=n.length)}return e}function $(i){return d||(void 0===i&&(i=t.substring(a)),E.push(i),a=l,M(E),w&&D()),Q()}function q(i){a=i,M(E),E=[],R=t.indexOf(n,a)}function Q(t){return{data:b,errors:m,meta:{delimiter:e,linebreak:n,aborted:c,truncated:!!t,cursor:A+(o||0)}}}function D(){s(Q()),b=[],m=[]}},this.abort=function(){c=!0},this.getCharIndex=function(){return a}}function y(t){var i=t.data,e=r[i.workerId],n=!1;if(i.error)e.userError(i.error,i.file);else if(i.results&&i.results.data){var s={abort:function(){n=!0,g(i.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:w,resume:w};if(j(e.userStep)){for(var o=0;o<i.results.data.length&&(e.userStep({data:i.results.data[o],errors:i.results.errors,meta:i.results.meta},s),!n);o++);delete i.results}else j(e.userChunk)&&(e.userChunk(i.results,s,i.file),delete i.results)}i.finished&&!n&&g(i.workerId,i.results)}function g(t,i){var e=r[t];j(e.userComplete)&&e.userComplete(i),e.terminate(),delete r[t]}function w(){throw new Error("Not implemented.")}function b(t){if("object"!=typeof t||null===t)return t;var i=Array.isArray(t)?[]:{};for(var e in t)i[e]=b(t[e]);return i}function m(t,i){return function(){t.apply(i,arguments)}}function j(t){return"function"==typeof t}return n&&(i.onmessage=function(t){var e=t.data;if(void 0===o.WORKER_ID&&e&&(o.WORKER_ID=e.workerId),"string"==typeof e.input)i.postMessage({workerId:o.WORKER_ID,results:o.parse(e.input,e.config),finished:!0});else if(i.File&&e.input instanceof File||e.input instanceof Object){var n=o.parse(e.input,e.config);n&&i.postMessage({workerId:o.WORKER_ID,results:n,finished:!0})}}),(h.prototype=Object.create(u.prototype)).constructor=h,(a.prototype=Object.create(u.prototype)).constructor=a,(c.prototype=Object.create(c.prototype)).constructor=c,(d.prototype=Object.create(u.prototype)).constructor=d,o}()}(t={path:undefined,exports:{},require:function(){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}()}}),t.exports);async function n(t){if(null===t)return[];const n=await fetch(t);return function(t){const n=e.parse(t,{header:!0}),s=n.data;if("Photo"===n.meta.fields[0])return function(t,e){let n=[];return n=t.meta.fields.slice(3).map((t=>{const n=r(t,e);return{question:{Question:t,Type:i.Choice},responses:n}})),n}(n,s);if("Question #"===n.meta.fields[0])return function(t,e){const n=t.meta.fields.slice(4).map((t=>{let n={Candidate:t,Photo:`${t}.jpg`,Race:"At-Large"},r=[];return e.map((e=>{const s=e.Question;let o=null;if(e.Type===i.Rank)r=[];else if(e.Type===i.Option){let i=e[t],n=e["Sub question"];"0"===i?(n="~"+n+"~",i=1e3):n=""===i?null:`${i}) ${n}`,n&&r.push(n),o=r.sort().map((t=>t.replace(/\d\)/,""))).join("|")}else o=e[t];o&&(n[s]=o)})),n}));return e.filter((t=>t.Type!==i.Option)).map((t=>({question:t,responses:r(t.Question,n,t.Type!==i.Rank)})))}(n,s);throw"Unrecognized file"}(await n.text())}function r(t,i,e=!0){const n=[];return i.map((i=>{const r=function(t,i="No Response"){return t&&0!==t.length?t:i}(i[t]);let s=null;if(e&&(s=n.find((t=>t.response===r))),!s){const t=n.push({response:r,candidates:[]});s=n[t-1]}s.candidates.push(i)})),n}!function(t){t.Text="Text",t.Rank="Rank",t.Choice="Choice",t.Option="Option"}(i||(i={}));export{i as I,n as f}