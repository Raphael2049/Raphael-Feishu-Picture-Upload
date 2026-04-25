import{M as de,s as _r,Y as Tt,a as Tn,d as Nr,A as Ae,X as we,I as J}from"./index.248cacae.js";var On=Ae((e,t)=>{t.exports=function(n){return n!=null&&n.constructor!=null&&typeof n.constructor.isBuffer=="function"&&n.constructor.isBuffer(n)}}),Hr=Ae((e,t)=>{var n=Object.prototype.hasOwnProperty,r=Object.prototype.toString,l=Object.defineProperty,i=Object.getOwnPropertyDescriptor,o=function(c){return typeof Array.isArray=="function"?Array.isArray(c):r.call(c)==="[object Array]"},a=function(c){if(!c||r.call(c)!=="[object Object]")return!1;var u=n.call(c,"constructor"),d=c.constructor&&c.constructor.prototype&&n.call(c.constructor.prototype,"isPrototypeOf");if(c.constructor&&!u&&!d)return!1;var p;for(p in c);return typeof p>"u"||n.call(c,p)},s=function(c,u){l&&u.name==="__proto__"?l(c,u.name,{enumerable:!0,configurable:!0,value:u.newValue,writable:!0}):c[u.name]=u.newValue},f=function(c,u){if(u==="__proto__")if(n.call(c,u)){if(i)return i(c,u).value}else return;return c[u]};t.exports=function c(){var u,d,p,y,k,w,m=arguments[0],F=1,S=arguments.length,T=!1;for(typeof m=="boolean"&&(T=m,m=arguments[1]||{},F=2),(m==null||typeof m!="object"&&typeof m!="function")&&(m={});F<S;++F)if(u=arguments[F],u!=null)for(d in u)p=f(m,d),y=f(u,d),m!==y&&(T&&y&&(a(y)||(k=o(y)))?(k?(k=!1,w=p&&o(p)?p:[]):w=p&&a(p)?p:{},s(m,{name:d,newValue:c(T,w,y)})):typeof y<"u"&&s(m,{name:d,newValue:y}));return m}}),Ur=Ae((e,t)=>{var n="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";t.exports=n}),Vr=Ae((e,t)=>{var n=Ur();function r(){}function l(){}l.resetWarningCache=r,t.exports=function(){function i(s,f,c,u,d,p){if(p!==n){var y=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw y.name="Invariant Violation",y}}i.isRequired=i;function o(){return i}var a={array:i,bigint:i,bool:i,func:i,number:i,object:i,string:i,symbol:i,any:i,arrayOf:o,element:i,elementType:i,instanceOf:o,node:i,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:l,resetWarningCache:r};return a.PropTypes=a,a}}),qr=Ae((e,t)=>{t.exports=Vr()()}),Wr=Ae((e,t)=>{var n=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,r=/\n/g,l=/^\s*/,i=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,o=/^:\s*/,a=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,s=/^[;\s]*/,f=/^\s+|\s+$/g,c=`
`,u="/",d="*",p="",y="comment",k="declaration";t.exports=function(m,F){if(typeof m!="string")throw new TypeError("First argument must be a string");if(!m)return[];F=F||{};var S=1,T=1;function L(P){var z=P.match(r);z&&(S+=z.length);var V=P.lastIndexOf(c);T=~V?P.length-V:T+P.length}function b(){var P={line:S,column:T};return function(z){return z.position=new A(P),x(),z}}function A(P){this.start=P,this.end={line:S,column:T},this.source=F.source}A.prototype.content=m;function R(P){var z=new Error(F.source+":"+S+":"+T+": "+P);if(z.reason=P,z.filename=F.source,z.line=S,z.column=T,z.source=m,!F.silent)throw z}function _(P){var z=P.exec(m);if(z){var V=z[0];return L(V),m=m.slice(V.length),z}}function x(){_(l)}function D(P){var z;for(P=P||[];z=O();)z!==!1&&P.push(z);return P}function O(){var P=b();if(!(u!=m.charAt(0)||d!=m.charAt(1))){for(var z=2;p!=m.charAt(z)&&(d!=m.charAt(z)||u!=m.charAt(z+1));)++z;if(z+=2,p===m.charAt(z-1))return R("End of comment missing");var V=m.slice(2,z-2);return T+=2,L(V),m=m.slice(z),T+=2,P({type:y,comment:V})}}function U(){var P=b(),z=_(i);if(z){if(O(),!_(o))return R("property missing ':'");var V=_(a),ne=P({type:k,property:w(z[0].replace(n,p)),value:V?w(V[0].replace(n,p)):p});return _(s),ne}}function $(){var P=[];D(P);for(var z;z=U();)z!==!1&&(P.push(z),D(P));return P}return x(),$()};function w(m){return m?m.replace(f,p):p}}),$r=Ae((e,t)=>{var n=Wr();function r(l,i){var o=null;if(!l||typeof l!="string")return o;for(var a,s=n(l),f=typeof i=="function",c,u,d=0,p=s.length;d<p;d++)a=s[d],c=a.property,u=a.value,f?i(c,u,a):u&&(o||(o={}),o[c]=u);return o}t.exports=r,t.exports.default=r}),Qr=de(_r(),1),Wt=["http","https","mailto","tel"];function Yr(e){let t=(e||"").trim(),n=t.charAt(0);if(n==="#"||n==="/")return t;let r=t.indexOf(":");if(r===-1)return t;let l=-1;for(;++l<Wt.length;){let i=Wt[l];if(r===i.length&&t.slice(0,i.length).toLowerCase()===i)return t}return l=t.indexOf("?"),l!==-1&&r>l||(l=t.indexOf("#"),l!==-1&&r>l)?t:"javascript:void(0)"}var lt=de(Tt(),1),Xr=de(On(),1);function Ne(e){return!e||typeof e!="object"?"":"position"in e||"type"in e?$t(e.position):"start"in e||"end"in e?$t(e):"line"in e||"column"in e?vt(e):""}function vt(e){return Qt(e&&e.line)+":"+Qt(e&&e.column)}function $t(e){return vt(e&&e.start)+"-"+vt(e&&e.end)}function Qt(e){return e&&typeof e=="number"?e:1}var oe=class extends Error{constructor(e,t,n){let r=[null,null],l={start:{line:null,column:null},end:{line:null,column:null}};if(super(),typeof t=="string"&&(n=t,t=void 0),typeof n=="string"){let i=n.indexOf(":");i===-1?r[1]=n:(r[0]=n.slice(0,i),r[1]=n.slice(i+1))}t&&("type"in t||"position"in t?t.position&&(l=t.position):"start"in t||"end"in t?l=t:("line"in t||"column"in t)&&(l.start=t)),this.name=Ne(t)||"1:1",this.message=typeof e=="object"?e.message:e,this.stack="",typeof e=="object"&&e.stack&&(this.stack=e.stack),this.reason=this.message,this.fatal,this.line=l.start.line,this.column=l.start.column,this.position=l,this.source=r[0],this.ruleId=r[1],this.file,this.actual,this.expected,this.url,this.note}};oe.prototype.file="";oe.prototype.name="";oe.prototype.reason="";oe.prototype.message="";oe.prototype.stack="";oe.prototype.fatal=null;oe.prototype.column=null;oe.prototype.line=null;oe.prototype.source=null;oe.prototype.ruleId=null;oe.prototype.position=null;var pe={basename:Kr,dirname:Jr,extname:Zr,join:Gr,sep:"/"};function Kr(e,t){if(t!==void 0&&typeof t!="string")throw new TypeError('"ext" argument must be a string');Ue(e);let n=0,r=-1,l=e.length,i;if(t===void 0||t.length===0||t.length>e.length){for(;l--;)if(e.charCodeAt(l)===47){if(i){n=l+1;break}}else r<0&&(i=!0,r=l+1);return r<0?"":e.slice(n,r)}if(t===e)return"";let o=-1,a=t.length-1;for(;l--;)if(e.charCodeAt(l)===47){if(i){n=l+1;break}}else o<0&&(i=!0,o=l+1),a>-1&&(e.charCodeAt(l)===t.charCodeAt(a--)?a<0&&(r=l):(a=-1,r=o));return n===r?r=o:r<0&&(r=e.length),e.slice(n,r)}function Jr(e){if(Ue(e),e.length===0)return".";let t=-1,n=e.length,r;for(;--n;)if(e.charCodeAt(n)===47){if(r){t=n;break}}else r||(r=!0);return t<0?e.charCodeAt(0)===47?"/":".":t===1&&e.charCodeAt(0)===47?"//":e.slice(0,t)}function Zr(e){Ue(e);let t=e.length,n=-1,r=0,l=-1,i=0,o;for(;t--;){let a=e.charCodeAt(t);if(a===47){if(o){r=t+1;break}continue}n<0&&(o=!0,n=t+1),a===46?l<0?l=t:i!==1&&(i=1):l>-1&&(i=-1)}return l<0||n<0||i===0||i===1&&l===n-1&&l===r+1?"":e.slice(l,n)}function Gr(...e){let t=-1,n;for(;++t<e.length;)Ue(e[t]),e[t]&&(n=n===void 0?e[t]:n+"/"+e[t]);return n===void 0?".":ei(n)}function ei(e){Ue(e);let t=e.charCodeAt(0)===47,n=ti(e,!t);return n.length===0&&!t&&(n="."),n.length>0&&e.charCodeAt(e.length-1)===47&&(n+="/"),t?"/"+n:n}function ti(e,t){let n="",r=0,l=-1,i=0,o=-1,a,s;for(;++o<=e.length;){if(o<e.length)a=e.charCodeAt(o);else{if(a===47)break;a=47}if(a===47){if(!(l===o-1||i===1))if(l!==o-1&&i===2){if(n.length<2||r!==2||n.charCodeAt(n.length-1)!==46||n.charCodeAt(n.length-2)!==46){if(n.length>2){if(s=n.lastIndexOf("/"),s!==n.length-1){s<0?(n="",r=0):(n=n.slice(0,s),r=n.length-1-n.lastIndexOf("/")),l=o,i=0;continue}}else if(n.length>0){n="",r=0,l=o,i=0;continue}}t&&(n=n.length>0?n+"/..":"..",r=2)}else n.length>0?n+="/"+e.slice(l+1,o):n=e.slice(l+1,o),r=o-l-1;l=o,i=0}else a===46&&i>-1?i++:i=-1}return n}function Ue(e){if(typeof e!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}var ni={cwd:ri};function ri(){return"/"}function wt(e){return e!==null&&typeof e=="object"&&e.href&&e.origin}function ii(e){if(typeof e=="string")e=new URL(e);else if(!wt(e)){let t=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+e+"`");throw t.code="ERR_INVALID_ARG_TYPE",t}if(e.protocol!=="file:"){let t=new TypeError("The URL must be of scheme file");throw t.code="ERR_INVALID_URL_SCHEME",t}return li(e)}function li(e){if(e.hostname!==""){let r=new TypeError('File URL host must be "localhost" or empty on darwin');throw r.code="ERR_INVALID_FILE_URL_HOST",r}let t=e.pathname,n=-1;for(;++n<t.length;)if(t.charCodeAt(n)===37&&t.charCodeAt(n+1)===50){let r=t.charCodeAt(n+2);if(r===70||r===102){let l=new TypeError("File URL path must not include encoded / characters");throw l.code="ERR_INVALID_FILE_URL_PATH",l}}return decodeURIComponent(t)}var ot=["history","path","basename","stem","extname","dirname"],Pn=class{constructor(e){let t;e?typeof e=="string"||oi(e)?t={value:e}:wt(e)?t={path:e}:t=e:t={},this.data={},this.messages=[],this.history=[],this.cwd=ni.cwd(),this.value,this.stored,this.result,this.map;let n=-1;for(;++n<ot.length;){let l=ot[n];l in t&&t[l]!==void 0&&t[l]!==null&&(this[l]=l==="history"?[...t[l]]:t[l])}let r;for(r in t)ot.includes(r)||(this[r]=t[r])}get path(){return this.history[this.history.length-1]}set path(e){wt(e)&&(e=ii(e)),ut(e,"path"),this.path!==e&&this.history.push(e)}get dirname(){return typeof this.path=="string"?pe.dirname(this.path):void 0}set dirname(e){Yt(this.basename,"dirname"),this.path=pe.join(e||"",this.basename)}get basename(){return typeof this.path=="string"?pe.basename(this.path):void 0}set basename(e){ut(e,"basename"),at(e,"basename"),this.path=pe.join(this.dirname||"",e)}get extname(){return typeof this.path=="string"?pe.extname(this.path):void 0}set extname(e){if(at(e,"extname"),Yt(this.dirname,"extname"),e){if(e.charCodeAt(0)!==46)throw new Error("`extname` must start with `.`");if(e.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=pe.join(this.dirname,this.stem+(e||""))}get stem(){return typeof this.path=="string"?pe.basename(this.path,this.extname):void 0}set stem(e){ut(e,"stem"),at(e,"stem"),this.path=pe.join(this.dirname||"",e+(this.extname||""))}toString(e){return(this.value||"").toString(e||void 0)}message(e,t,n){let r=new oe(e,t,n);return this.path&&(r.name=this.path+":"+r.name,r.file=this.path),r.fatal=!1,this.messages.push(r),r}info(e,t,n){let r=this.message(e,t,n);return r.fatal=null,r}fail(e,t,n){let r=this.message(e,t,n);throw r.fatal=!0,r}};function at(e,t){if(e&&e.includes(pe.sep))throw new Error("`"+t+"` cannot be a path: did not expect `"+pe.sep+"`")}function ut(e,t){if(!e)throw new Error("`"+t+"` cannot be empty")}function Yt(e,t){if(!e)throw new Error("Setting `"+t+"` requires `path` to be set too")}function oi(e){return(0,Xr.default)(e)}function Xt(e){if(e)throw e}var ai=de(On(),1),Kt=de(Hr(),1);function St(e){if(typeof e!="object"||e===null)return!1;let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function ui(){let e=[],t={run:n,use:r};return t;function n(...l){let i=-1,o=l.pop();if(typeof o!="function")throw new TypeError("Expected function as last argument, not "+o);a(null,...l);function a(s,...f){let c=e[++i],u=-1;if(s){o(s);return}for(;++u<l.length;)(f[u]===null||f[u]===void 0)&&(f[u]=l[u]);l=f,c?si(c,a)(...f):o(null,...f)}}function r(l){if(typeof l!="function")throw new TypeError("Expected `middelware` to be a function, not "+l);return e.push(l),t}}function si(e,t){let n;return r;function r(...o){let a=e.length>o.length,s;a&&o.push(l);try{s=e.apply(this,o)}catch(f){let c=f;if(a&&n)throw c;return l(c)}a||(s&&s.then&&typeof s.then=="function"?s.then(i,l):s instanceof Error?l(s):i(s))}function l(o,...a){n||(n=!0,t(o,...a))}function i(o){l(null,o)}}var ci=zn().freeze(),Ln={}.hasOwnProperty;function zn(){let e=ui(),t=[],n={},r,l=-1;return i.data=o,i.Parser=void 0,i.Compiler=void 0,i.freeze=a,i.attachers=t,i.use=s,i.parse=f,i.stringify=c,i.run=u,i.runSync=d,i.process=p,i.processSync=y,i;function i(){let k=zn(),w=-1;for(;++w<t.length;)k.use(...t[w]);return k.data((0,Kt.default)(!0,{},n)),k}function o(k,w){return typeof k=="string"?arguments.length===2?(ft("data",r),n[k]=w,i):Ln.call(n,k)&&n[k]||null:k?(ft("data",r),n=k,i):n}function a(){if(r)return i;for(;++l<t.length;){let[k,...w]=t[l];if(w[0]===!1)continue;w[0]===!0&&(w[0]=void 0);let m=k.call(i,...w);typeof m=="function"&&e.use(m)}return r=!0,l=Number.POSITIVE_INFINITY,i}function s(k,...w){let m;if(ft("use",r),k!=null)if(typeof k=="function")L(k,...w);else if(typeof k=="object")Array.isArray(k)?T(k):S(k);else throw new TypeError("Expected usable value, not `"+k+"`");return m&&(n.settings=Object.assign(n.settings||{},m)),i;function F(b){if(typeof b=="function")L(b);else if(typeof b=="object")if(Array.isArray(b)){let[A,...R]=b;L(A,...R)}else S(b);else throw new TypeError("Expected usable value, not `"+b+"`")}function S(b){T(b.plugins),b.settings&&(m=Object.assign(m||{},b.settings))}function T(b){let A=-1;if(b!=null)if(Array.isArray(b))for(;++A<b.length;){let R=b[A];F(R)}else throw new TypeError("Expected a list of plugins, not `"+b+"`")}function L(b,A){let R=-1,_;for(;++R<t.length;)if(t[R][0]===b){_=t[R];break}_?(St(_[1])&&St(A)&&(A=(0,Kt.default)(!0,_[1],A)),_[1]=A):t.push([...arguments])}}function f(k){i.freeze();let w=_e(k),m=i.Parser;return st("parse",m),Jt(m,"parse")?new m(String(w),w).parse():m(String(w),w)}function c(k,w){i.freeze();let m=_e(w),F=i.Compiler;return ct("stringify",F),Zt(k),Jt(F,"compile")?new F(k,m).compile():F(k,m)}function u(k,w,m){if(Zt(k),i.freeze(),!m&&typeof w=="function"&&(m=w,w=void 0),!m)return new Promise(F);F(null,m);function F(S,T){e.run(k,_e(w),L);function L(b,A,R){A=A||k,b?T(b):S?S(A):m(null,A,R)}}}function d(k,w){let m,F;return i.run(k,w,S),Gt("runSync","run",F),m;function S(T,L){Xt(T),m=L,F=!0}}function p(k,w){if(i.freeze(),st("process",i.Parser),ct("process",i.Compiler),!w)return new Promise(m);m(null,w);function m(F,S){let T=_e(k);i.run(i.parse(T),T,(b,A,R)=>{if(b||!A||!R)L(b);else{let _=i.stringify(A,R);_==null||(di(_)?R.value=_:R.result=_),L(b,R)}});function L(b,A){b||!A?S(b):F?F(A):w(null,A)}}}function y(k){let w;i.freeze(),st("processSync",i.Parser),ct("processSync",i.Compiler);let m=_e(k);return i.process(m,F),Gt("processSync","process",w),m;function F(S){w=!0,Xt(S)}}}function Jt(e,t){return typeof e=="function"&&e.prototype&&(fi(e.prototype)||t in e.prototype)}function fi(e){let t;for(t in e)if(Ln.call(e,t))return!0;return!1}function st(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `Parser`")}function ct(e,t){if(typeof t!="function")throw new TypeError("Cannot `"+e+"` without `Compiler`")}function ft(e,t){if(t)throw new Error("Cannot call `"+e+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function Zt(e){if(!St(e)||typeof e.type!="string")throw new TypeError("Expected node, got `"+e+"`")}function Gt(e,t,n){if(!n)throw new Error("`"+e+"` finished async. Use `"+t+"` instead")}function _e(e){return pi(e)?e:new Pn(e)}function pi(e){return!!(e&&typeof e=="object"&&"message"in e&&"messages"in e)}function di(e){return typeof e=="string"||(0,ai.default)(e)}var hi={};function gi(e,t){let n=t||hi,r=typeof n.includeImageAlt=="boolean"?n.includeImageAlt:!0,l=typeof n.includeHtml=="boolean"?n.includeHtml:!0;return In(e,r,l)}function In(e,t,n){if(mi(e)){if("value"in e)return e.type==="html"&&!n?"":e.value;if(t&&"alt"in e&&e.alt)return e.alt;if("children"in e)return en(e.children,t,n)}return Array.isArray(e)?en(e,t,n):""}function en(e,t,n){let r=[],l=-1;for(;++l<e.length;)r[l]=In(e[l],t,n);return r.join("")}function mi(e){return!!(e&&typeof e=="object")}function ie(e,t,n,r){let l=e.length,i=0,o;if(t<0?t=-t>l?0:l+t:t=t>l?l:t,n=n>0?n:0,r.length<1e4)o=Array.from(r),o.unshift(t,n),e.splice(...o);else for(n&&e.splice(t,n);i<r.length;)o=r.slice(i,i+1e4),o.unshift(t,0),e.splice(...o),i+=1e4,t+=1e4}function le(e,t){return e.length>0?(ie(e,e.length,0,t),e):t}var tn={}.hasOwnProperty;function Mn(e){let t={},n=-1;for(;++n<e.length;)yi(t,e[n]);return t}function yi(e,t){let n;for(n in t){let r=(tn.call(e,n)?e[n]:void 0)||(e[n]={}),l=t[n],i;if(l)for(i in l){tn.call(r,i)||(r[i]=[]);let o=l[i];bi(r[i],Array.isArray(o)?o:o?[o]:[])}}}function bi(e,t){let n=-1,r=[];for(;++n<t.length;)(t[n].add==="after"?e:r).push(t[n]);ie(e,0,0,r)}var ki=/[!-\/:-@\[-`\{-~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/,ee=Se(/[A-Za-z]/),G=Se(/[\dA-Za-z]/),xi=Se(/[#-'*+\--9=?A-Z^-~]/);function Xe(e){return e!==null&&(e<32||e===127)}var Ct=Se(/\d/),vi=Se(/[\dA-Fa-f]/),wi=Se(/[!-/:-@[-`{-~]/);function I(e){return e!==null&&e<-2}function W(e){return e!==null&&(e<0||e===32)}function N(e){return e===-2||e===-1||e===32}var Ge=Se(ki),Ee=Se(/\s/);function Se(e){return t;function t(n){return n!==null&&e.test(String.fromCharCode(n))}}function H(e,t,n,r){let l=r?r-1:Number.POSITIVE_INFINITY,i=0;return o;function o(s){return N(s)?(e.enter(n),a(s)):t(s)}function a(s){return N(s)&&i++<l?(e.consume(s),a):(e.exit(n),t(s))}}var Si={tokenize:Ci};function Ci(e){let t=e.attempt(this.parser.constructs.contentInitial,r,l),n;return t;function r(a){if(a===null){e.consume(a);return}return e.enter("lineEnding"),e.consume(a),e.exit("lineEnding"),H(e,t,"linePrefix")}function l(a){return e.enter("paragraph"),i(a)}function i(a){let s=e.enter("chunkText",{contentType:"text",previous:n});return n&&(n.next=s),n=s,o(a)}function o(a){if(a===null){e.exit("chunkText"),e.exit("paragraph"),e.consume(a);return}return I(a)?(e.consume(a),e.exit("chunkText"),i):(e.consume(a),o)}}var Fi={tokenize:Ei},nn={tokenize:Ai};function Ei(e){let t=this,n=[],r=0,l,i,o;return a;function a(S){if(r<n.length){let T=n[r];return t.containerState=T[1],e.attempt(T[0].continuation,s,f)(S)}return f(S)}function s(S){if(r++,t.containerState._closeFlow){t.containerState._closeFlow=void 0,l&&F();let T=t.events.length,L=T,b;for(;L--;)if(t.events[L][0]==="exit"&&t.events[L][1].type==="chunkFlow"){b=t.events[L][1].end;break}m(r);let A=T;for(;A<t.events.length;)t.events[A][1].end=Object.assign({},b),A++;return ie(t.events,L+1,0,t.events.slice(T)),t.events.length=A,f(S)}return a(S)}function f(S){if(r===n.length){if(!l)return d(S);if(l.currentConstruct&&l.currentConstruct.concrete)return y(S);t.interrupt=!!(l.currentConstruct&&!l._gfmTableDynamicInterruptHack)}return t.containerState={},e.check(nn,c,u)(S)}function c(S){return l&&F(),m(r),d(S)}function u(S){return t.parser.lazy[t.now().line]=r!==n.length,o=t.now().offset,y(S)}function d(S){return t.containerState={},e.attempt(nn,p,y)(S)}function p(S){return r++,n.push([t.currentConstruct,t.containerState]),d(S)}function y(S){if(S===null){l&&F(),m(0),e.consume(S);return}return l=l||t.parser.flow(t.now()),e.enter("chunkFlow",{contentType:"flow",previous:i,_tokenizer:l}),k(S)}function k(S){if(S===null){w(e.exit("chunkFlow"),!0),m(0),e.consume(S);return}return I(S)?(e.consume(S),w(e.exit("chunkFlow")),r=0,t.interrupt=void 0,a):(e.consume(S),k)}function w(S,T){let L=t.sliceStream(S);if(T&&L.push(null),S.previous=i,i&&(i.next=S),i=S,l.defineSkip(S.start),l.write(L),t.parser.lazy[S.start.line]){let b=l.events.length;for(;b--;)if(l.events[b][1].start.offset<o&&(!l.events[b][1].end||l.events[b][1].end.offset>o))return;let A=t.events.length,R=A,_,x;for(;R--;)if(t.events[R][0]==="exit"&&t.events[R][1].type==="chunkFlow"){if(_){x=t.events[R][1].end;break}_=!0}for(m(r),b=A;b<t.events.length;)t.events[b][1].end=Object.assign({},x),b++;ie(t.events,R+1,0,t.events.slice(A)),t.events.length=b}}function m(S){let T=n.length;for(;T-- >S;){let L=n[T];t.containerState=L[1],L[0].exit.call(t,e)}n.length=S}function F(){l.write([null]),i=void 0,l=void 0,t.containerState._closeFlow=void 0}}function Ai(e,t,n){return H(e,e.attempt(this.parser.constructs.document,t,n),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function Ke(e){if(e===null||W(e)||Ee(e))return 1;if(Ge(e))return 2}function et(e,t,n){let r=[],l=-1;for(;++l<e.length;){let i=e[l].resolveAll;i&&!r.includes(i)&&(t=i(t,n),r.push(i))}return t}var Ft={name:"attention",tokenize:Ti,resolveAll:Di};function Di(e,t){let n=-1,r,l,i,o,a,s,f,c;for(;++n<e.length;)if(e[n][0]==="enter"&&e[n][1].type==="attentionSequence"&&e[n][1]._close){for(r=n;r--;)if(e[r][0]==="exit"&&e[r][1].type==="attentionSequence"&&e[r][1]._open&&t.sliceSerialize(e[r][1]).charCodeAt(0)===t.sliceSerialize(e[n][1]).charCodeAt(0)){if((e[r][1]._close||e[n][1]._open)&&(e[n][1].end.offset-e[n][1].start.offset)%3&&!((e[r][1].end.offset-e[r][1].start.offset+e[n][1].end.offset-e[n][1].start.offset)%3))continue;s=e[r][1].end.offset-e[r][1].start.offset>1&&e[n][1].end.offset-e[n][1].start.offset>1?2:1;let u=Object.assign({},e[r][1].end),d=Object.assign({},e[n][1].start);rn(u,-s),rn(d,s),o={type:s>1?"strongSequence":"emphasisSequence",start:u,end:Object.assign({},e[r][1].end)},a={type:s>1?"strongSequence":"emphasisSequence",start:Object.assign({},e[n][1].start),end:d},i={type:s>1?"strongText":"emphasisText",start:Object.assign({},e[r][1].end),end:Object.assign({},e[n][1].start)},l={type:s>1?"strong":"emphasis",start:Object.assign({},o.start),end:Object.assign({},a.end)},e[r][1].end=Object.assign({},o.start),e[n][1].start=Object.assign({},a.end),f=[],e[r][1].end.offset-e[r][1].start.offset&&(f=le(f,[["enter",e[r][1],t],["exit",e[r][1],t]])),f=le(f,[["enter",l,t],["enter",o,t],["exit",o,t],["enter",i,t]]),f=le(f,et(t.parser.constructs.insideSpan.null,e.slice(r+1,n),t)),f=le(f,[["exit",i,t],["enter",a,t],["exit",a,t],["exit",l,t]]),e[n][1].end.offset-e[n][1].start.offset?(c=2,f=le(f,[["enter",e[n][1],t],["exit",e[n][1],t]])):c=0,ie(e,r-1,n-r+3,f),n=r+f.length-c-2;break}}for(n=-1;++n<e.length;)e[n][1].type==="attentionSequence"&&(e[n][1].type="data");return e}function Ti(e,t){let n=this.parser.constructs.attentionMarkers.null,r=this.previous,l=Ke(r),i;return o;function o(s){return i=s,e.enter("attentionSequence"),a(s)}function a(s){if(s===i)return e.consume(s),a;let f=e.exit("attentionSequence"),c=Ke(s),u=!c||c===2&&l||n.includes(s),d=!l||l===2&&c||n.includes(r);return f._open=!!(i===42?u:u&&(l||!d)),f._close=!!(i===42?d:d&&(c||!u)),t(s)}}function rn(e,t){e.column+=t,e.offset+=t,e._bufferIndex+=t}var Oi={name:"autolink",tokenize:Pi};function Pi(e,t,n){let r=0;return l;function l(p){return e.enter("autolink"),e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.enter("autolinkProtocol"),i}function i(p){return ee(p)?(e.consume(p),o):f(p)}function o(p){return p===43||p===45||p===46||G(p)?(r=1,a(p)):f(p)}function a(p){return p===58?(e.consume(p),r=0,s):(p===43||p===45||p===46||G(p))&&r++<32?(e.consume(p),a):(r=0,f(p))}function s(p){return p===62?(e.exit("autolinkProtocol"),e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.exit("autolink"),t):p===null||p===32||p===60||Xe(p)?n(p):(e.consume(p),s)}function f(p){return p===64?(e.consume(p),c):xi(p)?(e.consume(p),f):n(p)}function c(p){return G(p)?u(p):n(p)}function u(p){return p===46?(e.consume(p),r=0,c):p===62?(e.exit("autolinkProtocol").type="autolinkEmail",e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.exit("autolink"),t):d(p)}function d(p){if((p===45||G(p))&&r++<63){let y=p===45?d:u;return e.consume(p),y}return n(p)}}var Ve={tokenize:Li,partial:!0};function Li(e,t,n){return r;function r(i){return N(i)?H(e,l,"linePrefix")(i):l(i)}function l(i){return i===null||I(i)?t(i):n(i)}}var Rn={name:"blockQuote",tokenize:zi,continuation:{tokenize:Ii},exit:Mi};function zi(e,t,n){let r=this;return l;function l(o){if(o===62){let a=r.containerState;return a.open||(e.enter("blockQuote",{_container:!0}),a.open=!0),e.enter("blockQuotePrefix"),e.enter("blockQuoteMarker"),e.consume(o),e.exit("blockQuoteMarker"),i}return n(o)}function i(o){return N(o)?(e.enter("blockQuotePrefixWhitespace"),e.consume(o),e.exit("blockQuotePrefixWhitespace"),e.exit("blockQuotePrefix"),t):(e.exit("blockQuotePrefix"),t(o))}}function Ii(e,t,n){let r=this;return l;function l(o){return N(o)?H(e,i,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(o):i(o)}function i(o){return e.attempt(Rn,t,n)(o)}}function Mi(e){e.exit("blockQuote")}var jn={name:"characterEscape",tokenize:Ri};function Ri(e,t,n){return r;function r(i){return e.enter("characterEscape"),e.enter("escapeMarker"),e.consume(i),e.exit("escapeMarker"),l}function l(i){return wi(i)?(e.enter("characterEscapeValue"),e.consume(i),e.exit("characterEscapeValue"),e.exit("characterEscape"),t):n(i)}}var ln=document.createElement("i");function Ot(e){let t="&"+e+";";ln.innerHTML=t;let n=ln.textContent;return n.charCodeAt(n.length-1)===59&&e!=="semi"||n===t?!1:n}var Bn={name:"characterReference",tokenize:ji};function ji(e,t,n){let r=this,l=0,i,o;return a;function a(u){return e.enter("characterReference"),e.enter("characterReferenceMarker"),e.consume(u),e.exit("characterReferenceMarker"),s}function s(u){return u===35?(e.enter("characterReferenceMarkerNumeric"),e.consume(u),e.exit("characterReferenceMarkerNumeric"),f):(e.enter("characterReferenceValue"),i=31,o=G,c(u))}function f(u){return u===88||u===120?(e.enter("characterReferenceMarkerHexadecimal"),e.consume(u),e.exit("characterReferenceMarkerHexadecimal"),e.enter("characterReferenceValue"),i=6,o=vi,c):(e.enter("characterReferenceValue"),i=7,o=Ct,c(u))}function c(u){if(u===59&&l){let d=e.exit("characterReferenceValue");return o===G&&!Ot(r.sliceSerialize(d))?n(u):(e.enter("characterReferenceMarker"),e.consume(u),e.exit("characterReferenceMarker"),e.exit("characterReference"),t)}return o(u)&&l++<i?(e.consume(u),c):n(u)}}var on={tokenize:_i,partial:!0},an={name:"codeFenced",tokenize:Bi,concrete:!0};function Bi(e,t,n){let r=this,l={tokenize:L,partial:!0},i=0,o=0,a;return s;function s(b){return f(b)}function f(b){let A=r.events[r.events.length-1];return i=A&&A[1].type==="linePrefix"?A[2].sliceSerialize(A[1],!0).length:0,a=b,e.enter("codeFenced"),e.enter("codeFencedFence"),e.enter("codeFencedFenceSequence"),c(b)}function c(b){return b===a?(o++,e.consume(b),c):o<3?n(b):(e.exit("codeFencedFenceSequence"),N(b)?H(e,u,"whitespace")(b):u(b))}function u(b){return b===null||I(b)?(e.exit("codeFencedFence"),r.interrupt?t(b):e.check(on,k,T)(b)):(e.enter("codeFencedFenceInfo"),e.enter("chunkString",{contentType:"string"}),d(b))}function d(b){return b===null||I(b)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),u(b)):N(b)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),H(e,p,"whitespace")(b)):b===96&&b===a?n(b):(e.consume(b),d)}function p(b){return b===null||I(b)?u(b):(e.enter("codeFencedFenceMeta"),e.enter("chunkString",{contentType:"string"}),y(b))}function y(b){return b===null||I(b)?(e.exit("chunkString"),e.exit("codeFencedFenceMeta"),u(b)):b===96&&b===a?n(b):(e.consume(b),y)}function k(b){return e.attempt(l,T,w)(b)}function w(b){return e.enter("lineEnding"),e.consume(b),e.exit("lineEnding"),m}function m(b){return i>0&&N(b)?H(e,F,"linePrefix",i+1)(b):F(b)}function F(b){return b===null||I(b)?e.check(on,k,T)(b):(e.enter("codeFlowValue"),S(b))}function S(b){return b===null||I(b)?(e.exit("codeFlowValue"),F(b)):(e.consume(b),S)}function T(b){return e.exit("codeFenced"),t(b)}function L(b,A,R){let _=0;return x;function x(P){return b.enter("lineEnding"),b.consume(P),b.exit("lineEnding"),D}function D(P){return b.enter("codeFencedFence"),N(P)?H(b,O,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(P):O(P)}function O(P){return P===a?(b.enter("codeFencedFenceSequence"),U(P)):R(P)}function U(P){return P===a?(_++,b.consume(P),U):_>=o?(b.exit("codeFencedFenceSequence"),N(P)?H(b,$,"whitespace")(P):$(P)):R(P)}function $(P){return P===null||I(P)?(b.exit("codeFencedFence"),A(P)):R(P)}}}function _i(e,t,n){let r=this;return l;function l(o){return o===null?n(o):(e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),i)}function i(o){return r.parser.lazy[r.now().line]?n(o):t(o)}}var pt={name:"codeIndented",tokenize:Hi},Ni={tokenize:Ui,partial:!0};function Hi(e,t,n){let r=this;return l;function l(f){return e.enter("codeIndented"),H(e,i,"linePrefix",4+1)(f)}function i(f){let c=r.events[r.events.length-1];return c&&c[1].type==="linePrefix"&&c[2].sliceSerialize(c[1],!0).length>=4?o(f):n(f)}function o(f){return f===null?s(f):I(f)?e.attempt(Ni,o,s)(f):(e.enter("codeFlowValue"),a(f))}function a(f){return f===null||I(f)?(e.exit("codeFlowValue"),o(f)):(e.consume(f),a)}function s(f){return e.exit("codeIndented"),t(f)}}function Ui(e,t,n){let r=this;return l;function l(o){return r.parser.lazy[r.now().line]?n(o):I(o)?(e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),l):H(e,i,"linePrefix",4+1)(o)}function i(o){let a=r.events[r.events.length-1];return a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(o):I(o)?l(o):n(o)}}var Vi={name:"codeText",tokenize:$i,resolve:qi,previous:Wi};function qi(e){let t=e.length-4,n=3,r,l;if((e[n][1].type==="lineEnding"||e[n][1].type==="space")&&(e[t][1].type==="lineEnding"||e[t][1].type==="space")){for(r=n;++r<t;)if(e[r][1].type==="codeTextData"){e[n][1].type="codeTextPadding",e[t][1].type="codeTextPadding",n+=2,t-=2;break}}for(r=n-1,t++;++r<=t;)l===void 0?r!==t&&e[r][1].type!=="lineEnding"&&(l=r):(r===t||e[r][1].type==="lineEnding")&&(e[l][1].type="codeTextData",r!==l+2&&(e[l][1].end=e[r-1][1].end,e.splice(l+2,r-l-2),t-=r-l-2,r=l+2),l=void 0);return e}function Wi(e){return e!==96||this.events[this.events.length-1][1].type==="characterEscape"}function $i(e,t,n){let r=0,l,i;return o;function o(u){return e.enter("codeText"),e.enter("codeTextSequence"),a(u)}function a(u){return u===96?(e.consume(u),r++,a):(e.exit("codeTextSequence"),s(u))}function s(u){return u===null?n(u):u===32?(e.enter("space"),e.consume(u),e.exit("space"),s):u===96?(i=e.enter("codeTextSequence"),l=0,c(u)):I(u)?(e.enter("lineEnding"),e.consume(u),e.exit("lineEnding"),s):(e.enter("codeTextData"),f(u))}function f(u){return u===null||u===32||u===96||I(u)?(e.exit("codeTextData"),s(u)):(e.consume(u),f)}function c(u){return u===96?(e.consume(u),l++,c):l===r?(e.exit("codeTextSequence"),e.exit("codeText"),t(u)):(i.type="codeTextData",f(u))}}function _n(e){let t={},n=-1,r,l,i,o,a,s,f;for(;++n<e.length;){for(;n in t;)n=t[n];if(r=e[n],n&&r[1].type==="chunkFlow"&&e[n-1][1].type==="listItemPrefix"&&(s=r[1]._tokenizer.events,i=0,i<s.length&&s[i][1].type==="lineEndingBlank"&&(i+=2),i<s.length&&s[i][1].type==="content"))for(;++i<s.length&&s[i][1].type!=="content";)s[i][1].type==="chunkText"&&(s[i][1]._isInFirstContentOfListItem=!0,i++);if(r[0]==="enter")r[1].contentType&&(Object.assign(t,Qi(e,n)),n=t[n],f=!0);else if(r[1]._container){for(i=n,l=void 0;i--&&(o=e[i],o[1].type==="lineEnding"||o[1].type==="lineEndingBlank");)o[0]==="enter"&&(l&&(e[l][1].type="lineEndingBlank"),o[1].type="lineEnding",l=i);l&&(r[1].end=Object.assign({},e[l][1].start),a=e.slice(l,n),a.unshift(r),ie(e,l,n-l+1,a))}}return!f}function Qi(e,t){let n=e[t][1],r=e[t][2],l=t-1,i=[],o=n._tokenizer||r.parser[n.contentType](n.start),a=o.events,s=[],f={},c,u,d=-1,p=n,y=0,k=0,w=[k];for(;p;){for(;e[++l][1]!==p;);i.push(l),p._tokenizer||(c=r.sliceStream(p),p.next||c.push(null),u&&o.defineSkip(p.start),p._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=!0),o.write(c),p._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=void 0)),u=p,p=p.next}for(p=n;++d<a.length;)a[d][0]==="exit"&&a[d-1][0]==="enter"&&a[d][1].type===a[d-1][1].type&&a[d][1].start.line!==a[d][1].end.line&&(k=d+1,w.push(k),p._tokenizer=void 0,p.previous=void 0,p=p.next);for(o.events=[],p?(p._tokenizer=void 0,p.previous=void 0):w.pop(),d=w.length;d--;){let m=a.slice(w[d],w[d+1]),F=i.pop();s.unshift([F,F+m.length-1]),ie(e,F,2,m)}for(d=-1;++d<s.length;)f[y+s[d][0]]=y+s[d][1],y+=s[d][1]-s[d][0]-1;return f}var Yi={tokenize:Ji,resolve:Ki},Xi={tokenize:Zi,partial:!0};function Ki(e){return _n(e),e}function Ji(e,t){let n;return r;function r(a){return e.enter("content"),n=e.enter("chunkContent",{contentType:"content"}),l(a)}function l(a){return a===null?i(a):I(a)?e.check(Xi,o,i)(a):(e.consume(a),l)}function i(a){return e.exit("chunkContent"),e.exit("content"),t(a)}function o(a){return e.consume(a),e.exit("chunkContent"),n.next=e.enter("chunkContent",{contentType:"content",previous:n}),n=n.next,l}}function Zi(e,t,n){let r=this;return l;function l(o){return e.exit("chunkContent"),e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),H(e,i,"linePrefix")}function i(o){if(o===null||I(o))return n(o);let a=r.events[r.events.length-1];return!r.parser.constructs.disable.null.includes("codeIndented")&&a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(o):e.interrupt(r.parser.constructs.flow,n,t)(o)}}function Nn(e,t,n,r,l,i,o,a,s){let f=s||Number.POSITIVE_INFINITY,c=0;return u;function u(m){return m===60?(e.enter(r),e.enter(l),e.enter(i),e.consume(m),e.exit(i),d):m===null||m===32||m===41||Xe(m)?n(m):(e.enter(r),e.enter(o),e.enter(a),e.enter("chunkString",{contentType:"string"}),k(m))}function d(m){return m===62?(e.enter(i),e.consume(m),e.exit(i),e.exit(l),e.exit(r),t):(e.enter(a),e.enter("chunkString",{contentType:"string"}),p(m))}function p(m){return m===62?(e.exit("chunkString"),e.exit(a),d(m)):m===null||m===60||I(m)?n(m):(e.consume(m),m===92?y:p)}function y(m){return m===60||m===62||m===92?(e.consume(m),p):p(m)}function k(m){return!c&&(m===null||m===41||W(m))?(e.exit("chunkString"),e.exit(a),e.exit(o),e.exit(r),t(m)):c<f&&m===40?(e.consume(m),c++,k):m===41?(e.consume(m),c--,k):m===null||m===32||m===40||Xe(m)?n(m):(e.consume(m),m===92?w:k)}function w(m){return m===40||m===41||m===92?(e.consume(m),k):k(m)}}function Hn(e,t,n,r,l,i){let o=this,a=0,s;return f;function f(p){return e.enter(r),e.enter(l),e.consume(p),e.exit(l),e.enter(i),c}function c(p){return a>999||p===null||p===91||p===93&&!s||p===94&&!a&&"_hiddenFootnoteSupport"in o.parser.constructs?n(p):p===93?(e.exit(i),e.enter(l),e.consume(p),e.exit(l),e.exit(r),t):I(p)?(e.enter("lineEnding"),e.consume(p),e.exit("lineEnding"),c):(e.enter("chunkString",{contentType:"string"}),u(p))}function u(p){return p===null||p===91||p===93||I(p)||a++>999?(e.exit("chunkString"),c(p)):(e.consume(p),s||(s=!N(p)),p===92?d:u)}function d(p){return p===91||p===92||p===93?(e.consume(p),a++,u):u(p)}}function Un(e,t,n,r,l,i){let o;return a;function a(d){return d===34||d===39||d===40?(e.enter(r),e.enter(l),e.consume(d),e.exit(l),o=d===40?41:d,s):n(d)}function s(d){return d===o?(e.enter(l),e.consume(d),e.exit(l),e.exit(r),t):(e.enter(i),f(d))}function f(d){return d===o?(e.exit(i),s(o)):d===null?n(d):I(d)?(e.enter("lineEnding"),e.consume(d),e.exit("lineEnding"),H(e,f,"linePrefix")):(e.enter("chunkString",{contentType:"string"}),c(d))}function c(d){return d===o||d===null||I(d)?(e.exit("chunkString"),f(d)):(e.consume(d),d===92?u:c)}function u(d){return d===o||d===92?(e.consume(d),c):c(d)}}function He(e,t){let n;return r;function r(l){return I(l)?(e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),n=!0,r):N(l)?H(e,r,n?"linePrefix":"lineSuffix")(l):t(l)}}function ce(e){return e.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}var Gi={name:"definition",tokenize:tl},el={tokenize:nl,partial:!0};function tl(e,t,n){let r=this,l;return i;function i(p){return e.enter("definition"),o(p)}function o(p){return Hn.call(r,e,a,n,"definitionLabel","definitionLabelMarker","definitionLabelString")(p)}function a(p){return l=ce(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)),p===58?(e.enter("definitionMarker"),e.consume(p),e.exit("definitionMarker"),s):n(p)}function s(p){return W(p)?He(e,f)(p):f(p)}function f(p){return Nn(e,c,n,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(p)}function c(p){return e.attempt(el,u,u)(p)}function u(p){return N(p)?H(e,d,"whitespace")(p):d(p)}function d(p){return p===null||I(p)?(e.exit("definition"),r.parser.defined.push(l),t(p)):n(p)}}function nl(e,t,n){return r;function r(a){return W(a)?He(e,l)(a):n(a)}function l(a){return Un(e,i,n,"definitionTitle","definitionTitleMarker","definitionTitleString")(a)}function i(a){return N(a)?H(e,o,"whitespace")(a):o(a)}function o(a){return a===null||I(a)?t(a):n(a)}}var rl={name:"hardBreakEscape",tokenize:il};function il(e,t,n){return r;function r(i){return e.enter("hardBreakEscape"),e.consume(i),l}function l(i){return I(i)?(e.exit("hardBreakEscape"),t(i)):n(i)}}var ll={name:"headingAtx",tokenize:al,resolve:ol};function ol(e,t){let n=e.length-2,r=3,l,i;return e[r][1].type==="whitespace"&&(r+=2),n-2>r&&e[n][1].type==="whitespace"&&(n-=2),e[n][1].type==="atxHeadingSequence"&&(r===n-1||n-4>r&&e[n-2][1].type==="whitespace")&&(n-=r+1===n?2:4),n>r&&(l={type:"atxHeadingText",start:e[r][1].start,end:e[n][1].end},i={type:"chunkText",start:e[r][1].start,end:e[n][1].end,contentType:"text"},ie(e,r,n-r+1,[["enter",l,t],["enter",i,t],["exit",i,t],["exit",l,t]])),e}function al(e,t,n){let r=0;return l;function l(c){return e.enter("atxHeading"),i(c)}function i(c){return e.enter("atxHeadingSequence"),o(c)}function o(c){return c===35&&r++<6?(e.consume(c),o):c===null||W(c)?(e.exit("atxHeadingSequence"),a(c)):n(c)}function a(c){return c===35?(e.enter("atxHeadingSequence"),s(c)):c===null||I(c)?(e.exit("atxHeading"),t(c)):N(c)?H(e,a,"whitespace")(c):(e.enter("atxHeadingText"),f(c))}function s(c){return c===35?(e.consume(c),s):(e.exit("atxHeadingSequence"),a(c))}function f(c){return c===null||c===35||W(c)?(e.exit("atxHeadingText"),a(c)):(e.consume(c),f)}}var ul=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],un=["pre","script","style","textarea"],sl={name:"htmlFlow",tokenize:dl,resolveTo:pl,concrete:!0},cl={tokenize:gl,partial:!0},fl={tokenize:hl,partial:!0};function pl(e){let t=e.length;for(;t--&&!(e[t][0]==="enter"&&e[t][1].type==="htmlFlow"););return t>1&&e[t-2][1].type==="linePrefix"&&(e[t][1].start=e[t-2][1].start,e[t+1][1].start=e[t-2][1].start,e.splice(t-2,2)),e}function dl(e,t,n){let r=this,l,i,o,a,s;return f;function f(g){return c(g)}function c(g){return e.enter("htmlFlow"),e.enter("htmlFlowData"),e.consume(g),u}function u(g){return g===33?(e.consume(g),d):g===47?(e.consume(g),i=!0,k):g===63?(e.consume(g),l=3,r.interrupt?t:h):ee(g)?(e.consume(g),o=String.fromCharCode(g),w):n(g)}function d(g){return g===45?(e.consume(g),l=2,p):g===91?(e.consume(g),l=5,a=0,y):ee(g)?(e.consume(g),l=4,r.interrupt?t:h):n(g)}function p(g){return g===45?(e.consume(g),r.interrupt?t:h):n(g)}function y(g){let se="CDATA[";return g===se.charCodeAt(a++)?(e.consume(g),a===se.length?r.interrupt?t:O:y):n(g)}function k(g){return ee(g)?(e.consume(g),o=String.fromCharCode(g),w):n(g)}function w(g){if(g===null||g===47||g===62||W(g)){let se=g===47,Te=o.toLowerCase();return!se&&!i&&un.includes(Te)?(l=1,r.interrupt?t(g):O(g)):ul.includes(o.toLowerCase())?(l=6,se?(e.consume(g),m):r.interrupt?t(g):O(g)):(l=7,r.interrupt&&!r.parser.lazy[r.now().line]?n(g):i?F(g):S(g))}return g===45||G(g)?(e.consume(g),o+=String.fromCharCode(g),w):n(g)}function m(g){return g===62?(e.consume(g),r.interrupt?t:O):n(g)}function F(g){return N(g)?(e.consume(g),F):x(g)}function S(g){return g===47?(e.consume(g),x):g===58||g===95||ee(g)?(e.consume(g),T):N(g)?(e.consume(g),S):x(g)}function T(g){return g===45||g===46||g===58||g===95||G(g)?(e.consume(g),T):L(g)}function L(g){return g===61?(e.consume(g),b):N(g)?(e.consume(g),L):S(g)}function b(g){return g===null||g===60||g===61||g===62||g===96?n(g):g===34||g===39?(e.consume(g),s=g,A):N(g)?(e.consume(g),b):R(g)}function A(g){return g===s?(e.consume(g),s=null,_):g===null||I(g)?n(g):(e.consume(g),A)}function R(g){return g===null||g===34||g===39||g===47||g===60||g===61||g===62||g===96||W(g)?L(g):(e.consume(g),R)}function _(g){return g===47||g===62||N(g)?S(g):n(g)}function x(g){return g===62?(e.consume(g),D):n(g)}function D(g){return g===null||I(g)?O(g):N(g)?(e.consume(g),D):n(g)}function O(g){return g===45&&l===2?(e.consume(g),z):g===60&&l===1?(e.consume(g),V):g===62&&l===4?(e.consume(g),ue):g===63&&l===3?(e.consume(g),h):g===93&&l===5?(e.consume(g),ge):I(g)&&(l===6||l===7)?(e.exit("htmlFlowData"),e.check(cl,me,U)(g)):g===null||I(g)?(e.exit("htmlFlowData"),U(g)):(e.consume(g),O)}function U(g){return e.check(fl,$,me)(g)}function $(g){return e.enter("lineEnding"),e.consume(g),e.exit("lineEnding"),P}function P(g){return g===null||I(g)?U(g):(e.enter("htmlFlowData"),O(g))}function z(g){return g===45?(e.consume(g),h):O(g)}function V(g){return g===47?(e.consume(g),o="",ne):O(g)}function ne(g){if(g===62){let se=o.toLowerCase();return un.includes(se)?(e.consume(g),ue):O(g)}return ee(g)&&o.length<8?(e.consume(g),o+=String.fromCharCode(g),ne):O(g)}function ge(g){return g===93?(e.consume(g),h):O(g)}function h(g){return g===62?(e.consume(g),ue):g===45&&l===2?(e.consume(g),h):O(g)}function ue(g){return g===null||I(g)?(e.exit("htmlFlowData"),me(g)):(e.consume(g),ue)}function me(g){return e.exit("htmlFlow"),t(g)}}function hl(e,t,n){let r=this;return l;function l(o){return I(o)?(e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),i):n(o)}function i(o){return r.parser.lazy[r.now().line]?n(o):t(o)}}function gl(e,t,n){return r;function r(l){return e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),e.attempt(Ve,t,n)}}var ml={name:"htmlText",tokenize:yl};function yl(e,t,n){let r=this,l,i,o;return a;function a(h){return e.enter("htmlText"),e.enter("htmlTextData"),e.consume(h),s}function s(h){return h===33?(e.consume(h),f):h===47?(e.consume(h),L):h===63?(e.consume(h),S):ee(h)?(e.consume(h),R):n(h)}function f(h){return h===45?(e.consume(h),c):h===91?(e.consume(h),i=0,y):ee(h)?(e.consume(h),F):n(h)}function c(h){return h===45?(e.consume(h),p):n(h)}function u(h){return h===null?n(h):h===45?(e.consume(h),d):I(h)?(o=u,V(h)):(e.consume(h),u)}function d(h){return h===45?(e.consume(h),p):u(h)}function p(h){return h===62?z(h):h===45?d(h):u(h)}function y(h){let ue="CDATA[";return h===ue.charCodeAt(i++)?(e.consume(h),i===ue.length?k:y):n(h)}function k(h){return h===null?n(h):h===93?(e.consume(h),w):I(h)?(o=k,V(h)):(e.consume(h),k)}function w(h){return h===93?(e.consume(h),m):k(h)}function m(h){return h===62?z(h):h===93?(e.consume(h),m):k(h)}function F(h){return h===null||h===62?z(h):I(h)?(o=F,V(h)):(e.consume(h),F)}function S(h){return h===null?n(h):h===63?(e.consume(h),T):I(h)?(o=S,V(h)):(e.consume(h),S)}function T(h){return h===62?z(h):S(h)}function L(h){return ee(h)?(e.consume(h),b):n(h)}function b(h){return h===45||G(h)?(e.consume(h),b):A(h)}function A(h){return I(h)?(o=A,V(h)):N(h)?(e.consume(h),A):z(h)}function R(h){return h===45||G(h)?(e.consume(h),R):h===47||h===62||W(h)?_(h):n(h)}function _(h){return h===47?(e.consume(h),z):h===58||h===95||ee(h)?(e.consume(h),x):I(h)?(o=_,V(h)):N(h)?(e.consume(h),_):z(h)}function x(h){return h===45||h===46||h===58||h===95||G(h)?(e.consume(h),x):D(h)}function D(h){return h===61?(e.consume(h),O):I(h)?(o=D,V(h)):N(h)?(e.consume(h),D):_(h)}function O(h){return h===null||h===60||h===61||h===62||h===96?n(h):h===34||h===39?(e.consume(h),l=h,U):I(h)?(o=O,V(h)):N(h)?(e.consume(h),O):(e.consume(h),$)}function U(h){return h===l?(e.consume(h),l=void 0,P):h===null?n(h):I(h)?(o=U,V(h)):(e.consume(h),U)}function $(h){return h===null||h===34||h===39||h===60||h===61||h===96?n(h):h===47||h===62||W(h)?_(h):(e.consume(h),$)}function P(h){return h===47||h===62||W(h)?_(h):n(h)}function z(h){return h===62?(e.consume(h),e.exit("htmlTextData"),e.exit("htmlText"),t):n(h)}function V(h){return e.exit("htmlTextData"),e.enter("lineEnding"),e.consume(h),e.exit("lineEnding"),ne}function ne(h){return N(h)?H(e,ge,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(h):ge(h)}function ge(h){return e.enter("htmlTextData"),o(h)}}var Pt={name:"labelEnd",tokenize:Sl,resolveTo:wl,resolveAll:vl},bl={tokenize:Cl},kl={tokenize:Fl},xl={tokenize:El};function vl(e){let t=-1;for(;++t<e.length;){let n=e[t][1];(n.type==="labelImage"||n.type==="labelLink"||n.type==="labelEnd")&&(e.splice(t+1,n.type==="labelImage"?4:2),n.type="data",t++)}return e}function wl(e,t){let n=e.length,r=0,l,i,o,a;for(;n--;)if(l=e[n][1],i){if(l.type==="link"||l.type==="labelLink"&&l._inactive)break;e[n][0]==="enter"&&l.type==="labelLink"&&(l._inactive=!0)}else if(o){if(e[n][0]==="enter"&&(l.type==="labelImage"||l.type==="labelLink")&&!l._balanced&&(i=n,l.type!=="labelLink")){r=2;break}}else l.type==="labelEnd"&&(o=n);let s={type:e[i][1].type==="labelLink"?"link":"image",start:Object.assign({},e[i][1].start),end:Object.assign({},e[e.length-1][1].end)},f={type:"label",start:Object.assign({},e[i][1].start),end:Object.assign({},e[o][1].end)},c={type:"labelText",start:Object.assign({},e[i+r+2][1].end),end:Object.assign({},e[o-2][1].start)};return a=[["enter",s,t],["enter",f,t]],a=le(a,e.slice(i+1,i+r+3)),a=le(a,[["enter",c,t]]),a=le(a,et(t.parser.constructs.insideSpan.null,e.slice(i+r+4,o-3),t)),a=le(a,[["exit",c,t],e[o-2],e[o-1],["exit",f,t]]),a=le(a,e.slice(o+1)),a=le(a,[["exit",s,t]]),ie(e,i,e.length,a),e}function Sl(e,t,n){let r=this,l=r.events.length,i,o;for(;l--;)if((r.events[l][1].type==="labelImage"||r.events[l][1].type==="labelLink")&&!r.events[l][1]._balanced){i=r.events[l][1];break}return a;function a(d){return i?i._inactive?u(d):(o=r.parser.defined.includes(ce(r.sliceSerialize({start:i.end,end:r.now()}))),e.enter("labelEnd"),e.enter("labelMarker"),e.consume(d),e.exit("labelMarker"),e.exit("labelEnd"),s):n(d)}function s(d){return d===40?e.attempt(bl,c,o?c:u)(d):d===91?e.attempt(kl,c,o?f:u)(d):o?c(d):u(d)}function f(d){return e.attempt(xl,c,u)(d)}function c(d){return t(d)}function u(d){return i._balanced=!0,n(d)}}function Cl(e,t,n){return r;function r(u){return e.enter("resource"),e.enter("resourceMarker"),e.consume(u),e.exit("resourceMarker"),l}function l(u){return W(u)?He(e,i)(u):i(u)}function i(u){return u===41?c(u):Nn(e,o,a,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(u)}function o(u){return W(u)?He(e,s)(u):c(u)}function a(u){return n(u)}function s(u){return u===34||u===39||u===40?Un(e,f,n,"resourceTitle","resourceTitleMarker","resourceTitleString")(u):c(u)}function f(u){return W(u)?He(e,c)(u):c(u)}function c(u){return u===41?(e.enter("resourceMarker"),e.consume(u),e.exit("resourceMarker"),e.exit("resource"),t):n(u)}}function Fl(e,t,n){let r=this;return l;function l(a){return Hn.call(r,e,i,o,"reference","referenceMarker","referenceString")(a)}function i(a){return r.parser.defined.includes(ce(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)))?t(a):n(a)}function o(a){return n(a)}}function El(e,t,n){return r;function r(i){return e.enter("reference"),e.enter("referenceMarker"),e.consume(i),e.exit("referenceMarker"),l}function l(i){return i===93?(e.enter("referenceMarker"),e.consume(i),e.exit("referenceMarker"),e.exit("reference"),t):n(i)}}var Al={name:"labelStartImage",tokenize:Dl,resolveAll:Pt.resolveAll};function Dl(e,t,n){let r=this;return l;function l(a){return e.enter("labelImage"),e.enter("labelImageMarker"),e.consume(a),e.exit("labelImageMarker"),i}function i(a){return a===91?(e.enter("labelMarker"),e.consume(a),e.exit("labelMarker"),e.exit("labelImage"),o):n(a)}function o(a){return a===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(a):t(a)}}var Tl={name:"labelStartLink",tokenize:Ol,resolveAll:Pt.resolveAll};function Ol(e,t,n){let r=this;return l;function l(o){return e.enter("labelLink"),e.enter("labelMarker"),e.consume(o),e.exit("labelMarker"),e.exit("labelLink"),i}function i(o){return o===94&&"_hiddenFootnoteSupport"in r.parser.constructs?n(o):t(o)}}var dt={name:"lineEnding",tokenize:Pl};function Pl(e,t){return n;function n(r){return e.enter("lineEnding"),e.consume(r),e.exit("lineEnding"),H(e,t,"linePrefix")}}var Ye={name:"thematicBreak",tokenize:Ll};function Ll(e,t,n){let r=0,l;return i;function i(f){return e.enter("thematicBreak"),o(f)}function o(f){return l=f,a(f)}function a(f){return f===l?(e.enter("thematicBreakSequence"),s(f)):r>=3&&(f===null||I(f))?(e.exit("thematicBreak"),t(f)):n(f)}function s(f){return f===l?(e.consume(f),r++,s):(e.exit("thematicBreakSequence"),N(f)?H(e,a,"whitespace")(f):a(f))}}var te={name:"list",tokenize:Ml,continuation:{tokenize:Rl},exit:Bl},zl={tokenize:_l,partial:!0},Il={tokenize:jl,partial:!0};function Ml(e,t,n){let r=this,l=r.events[r.events.length-1],i=l&&l[1].type==="linePrefix"?l[2].sliceSerialize(l[1],!0).length:0,o=0;return a;function a(p){let y=r.containerState.type||(p===42||p===43||p===45?"listUnordered":"listOrdered");if(y==="listUnordered"?!r.containerState.marker||p===r.containerState.marker:Ct(p)){if(r.containerState.type||(r.containerState.type=y,e.enter(y,{_container:!0})),y==="listUnordered")return e.enter("listItemPrefix"),p===42||p===45?e.check(Ye,n,f)(p):f(p);if(!r.interrupt||p===49)return e.enter("listItemPrefix"),e.enter("listItemValue"),s(p)}return n(p)}function s(p){return Ct(p)&&++o<10?(e.consume(p),s):(!r.interrupt||o<2)&&(r.containerState.marker?p===r.containerState.marker:p===41||p===46)?(e.exit("listItemValue"),f(p)):n(p)}function f(p){return e.enter("listItemMarker"),e.consume(p),e.exit("listItemMarker"),r.containerState.marker=r.containerState.marker||p,e.check(Ve,r.interrupt?n:c,e.attempt(zl,d,u))}function c(p){return r.containerState.initialBlankLine=!0,i++,d(p)}function u(p){return N(p)?(e.enter("listItemPrefixWhitespace"),e.consume(p),e.exit("listItemPrefixWhitespace"),d):n(p)}function d(p){return r.containerState.size=i+r.sliceSerialize(e.exit("listItemPrefix"),!0).length,t(p)}}function Rl(e,t,n){let r=this;return r.containerState._closeFlow=void 0,e.check(Ve,l,i);function l(a){return r.containerState.furtherBlankLines=r.containerState.furtherBlankLines||r.containerState.initialBlankLine,H(e,t,"listItemIndent",r.containerState.size+1)(a)}function i(a){return r.containerState.furtherBlankLines||!N(a)?(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,o(a)):(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,e.attempt(Il,t,o)(a))}function o(a){return r.containerState._closeFlow=!0,r.interrupt=void 0,H(e,e.attempt(te,t,n),"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(a)}}function jl(e,t,n){let r=this;return H(e,l,"listItemIndent",r.containerState.size+1);function l(i){let o=r.events[r.events.length-1];return o&&o[1].type==="listItemIndent"&&o[2].sliceSerialize(o[1],!0).length===r.containerState.size?t(i):n(i)}}function Bl(e){e.exit(this.containerState.type)}function _l(e,t,n){let r=this;return H(e,l,"listItemPrefixWhitespace",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4+1);function l(i){let o=r.events[r.events.length-1];return!N(i)&&o&&o[1].type==="listItemPrefixWhitespace"?t(i):n(i)}}var sn={name:"setextUnderline",tokenize:Hl,resolveTo:Nl};function Nl(e,t){let n=e.length,r,l,i;for(;n--;)if(e[n][0]==="enter"){if(e[n][1].type==="content"){r=n;break}e[n][1].type==="paragraph"&&(l=n)}else e[n][1].type==="content"&&e.splice(n,1),!i&&e[n][1].type==="definition"&&(i=n);let o={type:"setextHeading",start:Object.assign({},e[l][1].start),end:Object.assign({},e[e.length-1][1].end)};return e[l][1].type="setextHeadingText",i?(e.splice(l,0,["enter",o,t]),e.splice(i+1,0,["exit",e[r][1],t]),e[r][1].end=Object.assign({},e[i][1].end)):e[r][1]=o,e.push(["exit",o,t]),e}function Hl(e,t,n){let r=this,l;return i;function i(f){let c=r.events.length,u;for(;c--;)if(r.events[c][1].type!=="lineEnding"&&r.events[c][1].type!=="linePrefix"&&r.events[c][1].type!=="content"){u=r.events[c][1].type==="paragraph";break}return!r.parser.lazy[r.now().line]&&(r.interrupt||u)?(e.enter("setextHeadingLine"),l=f,o(f)):n(f)}function o(f){return e.enter("setextHeadingLineSequence"),a(f)}function a(f){return f===l?(e.consume(f),a):(e.exit("setextHeadingLineSequence"),N(f)?H(e,s,"lineSuffix")(f):s(f))}function s(f){return f===null||I(f)?(e.exit("setextHeadingLine"),t(f)):n(f)}}var Ul={tokenize:Vl};function Vl(e){let t=this,n=e.attempt(Ve,r,e.attempt(this.parser.constructs.flowInitial,l,H(e,e.attempt(this.parser.constructs.flow,l,e.attempt(Yi,l)),"linePrefix")));return n;function r(i){if(i===null){e.consume(i);return}return e.enter("lineEndingBlank"),e.consume(i),e.exit("lineEndingBlank"),t.currentConstruct=void 0,n}function l(i){if(i===null){e.consume(i);return}return e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),t.currentConstruct=void 0,n}}var ql={resolveAll:qn()},Wl=Vn("string"),$l=Vn("text");function Vn(e){return{tokenize:t,resolveAll:qn(e==="text"?Ql:void 0)};function t(n){let r=this,l=this.parser.constructs[e],i=n.attempt(l,o,a);return o;function o(c){return f(c)?i(c):a(c)}function a(c){if(c===null){n.consume(c);return}return n.enter("data"),n.consume(c),s}function s(c){return f(c)?(n.exit("data"),i(c)):(n.consume(c),s)}function f(c){if(c===null)return!0;let u=l[c],d=-1;if(u)for(;++d<u.length;){let p=u[d];if(!p.previous||p.previous.call(r,r.previous))return!0}return!1}}}function qn(e){return t;function t(n,r){let l=-1,i;for(;++l<=n.length;)i===void 0?n[l]&&n[l][1].type==="data"&&(i=l,l++):(!n[l]||n[l][1].type!=="data")&&(l!==i+2&&(n[i][1].end=n[l-1][1].end,n.splice(i+2,l-i-2),l=i+2),i=void 0);return e?e(n,r):n}}function Ql(e,t){let n=0;for(;++n<=e.length;)if((n===e.length||e[n][1].type==="lineEnding")&&e[n-1][1].type==="data"){let r=e[n-1][1],l=t.sliceStream(r),i=l.length,o=-1,a=0,s;for(;i--;){let f=l[i];if(typeof f=="string"){for(o=f.length;f.charCodeAt(o-1)===32;)a++,o--;if(o)break;o=-1}else if(f===-2)s=!0,a++;else if(f!==-1){i++;break}}if(a){let f={type:n===e.length||s||a<2?"lineSuffix":"hardBreakTrailing",start:{line:r.end.line,column:r.end.column-a,offset:r.end.offset-a,_index:r.start._index+i,_bufferIndex:i?o:r.start._bufferIndex+o},end:Object.assign({},r.end)};r.end=Object.assign({},f.start),r.start.offset===r.end.offset?Object.assign(r,f):(e.splice(n,0,["enter",f,t],["exit",f,t]),n+=2)}n++}return e}function Yl(e,t,n){let r=Object.assign(n?Object.assign({},n):{line:1,column:1,offset:0},{_index:0,_bufferIndex:-1}),l={},i=[],o=[],a=[],s={consume:F,enter:S,exit:T,attempt:A(L),check:A(b),interrupt:A(b,{interrupt:!0})},f={previous:null,code:null,containerState:{},events:[],parser:e,sliceStream:p,sliceSerialize:d,now:y,defineSkip:k,write:u},c=t.tokenize.call(f,s);return t.resolveAll&&i.push(t),f;function u(D){return o=le(o,D),w(),o[o.length-1]!==null?[]:(R(t,0),f.events=et(i,f.events,f),f.events)}function d(D,O){return Kl(p(D),O)}function p(D){return Xl(o,D)}function y(){let{line:D,column:O,offset:U,_index:$,_bufferIndex:P}=r;return{line:D,column:O,offset:U,_index:$,_bufferIndex:P}}function k(D){l[D.line]=D.column,x()}function w(){let D;for(;r._index<o.length;){let O=o[r._index];if(typeof O=="string")for(D=r._index,r._bufferIndex<0&&(r._bufferIndex=0);r._index===D&&r._bufferIndex<O.length;)m(O.charCodeAt(r._bufferIndex));else m(O)}}function m(D){c=c(D)}function F(D){I(D)?(r.line++,r.column=1,r.offset+=D===-3?2:1,x()):D!==-1&&(r.column++,r.offset++),r._bufferIndex<0?r._index++:(r._bufferIndex++,r._bufferIndex===o[r._index].length&&(r._bufferIndex=-1,r._index++)),f.previous=D}function S(D,O){let U=O||{};return U.type=D,U.start=y(),f.events.push(["enter",U,f]),a.push(U),U}function T(D){let O=a.pop();return O.end=y(),f.events.push(["exit",O,f]),O}function L(D,O){R(D,O.from)}function b(D,O){O.restore()}function A(D,O){return U;function U($,P,z){let V,ne,ge,h;return Array.isArray($)?me($):"tokenize"in $?me([$]):ue($);function ue(Z){return Oe;function Oe(xe){let Pe=xe!==null&&Z[xe],Le=xe!==null&&Z.null,rt=[...Array.isArray(Pe)?Pe:Pe?[Pe]:[],...Array.isArray(Le)?Le:Le?[Le]:[]];return me(rt)(xe)}}function me(Z){return V=Z,ne=0,Z.length===0?z:g(Z[ne])}function g(Z){return Oe;function Oe(xe){return h=_(),ge=Z,Z.partial||(f.currentConstruct=Z),Z.name&&f.parser.constructs.disable.null.includes(Z.name)?Te():Z.tokenize.call(O?Object.assign(Object.create(f),O):f,s,se,Te)(xe)}}function se(Z){return D(ge,h),P}function Te(Z){return h.restore(),++ne<V.length?g(V[ne]):z}}}function R(D,O){D.resolveAll&&!i.includes(D)&&i.push(D),D.resolve&&ie(f.events,O,f.events.length-O,D.resolve(f.events.slice(O),f)),D.resolveTo&&(f.events=D.resolveTo(f.events,f))}function _(){let D=y(),O=f.previous,U=f.currentConstruct,$=f.events.length,P=Array.from(a);return{restore:z,from:$};function z(){r=D,f.previous=O,f.currentConstruct=U,f.events.length=$,a=P,x()}}function x(){r.line in l&&r.column<2&&(r.column=l[r.line],r.offset+=l[r.line]-1)}}function Xl(e,t){let n=t.start._index,r=t.start._bufferIndex,l=t.end._index,i=t.end._bufferIndex,o;if(n===l)o=[e[n].slice(r,i)];else{if(o=e.slice(n,l),r>-1){let a=o[0];typeof a=="string"?o[0]=a.slice(r):o.shift()}i>0&&o.push(e[l].slice(0,i))}return o}function Kl(e,t){let n=-1,r=[],l;for(;++n<e.length;){let i=e[n],o;if(typeof i=="string")o=i;else switch(i){case-5:{o="\r";break}case-4:{o=`
`;break}case-3:{o=`\r
`;break}case-2:{o=t?" ":"	";break}case-1:{if(!t&&l)continue;o=" ";break}default:o=String.fromCharCode(i)}l=i===-2,r.push(o)}return r.join("")}var Wn={};Tn(Wn,{attentionMarkers:()=>io,contentInitial:()=>Zl,disable:()=>lo,document:()=>Jl,flow:()=>eo,flowInitial:()=>Gl,insideSpan:()=>ro,string:()=>to,text:()=>no});var Jl={[42]:te,[43]:te,[45]:te,[48]:te,[49]:te,[50]:te,[51]:te,[52]:te,[53]:te,[54]:te,[55]:te,[56]:te,[57]:te,[62]:Rn},Zl={[91]:Gi},Gl={[-2]:pt,[-1]:pt,[32]:pt},eo={[35]:ll,[42]:Ye,[45]:[sn,Ye],[60]:sl,[61]:sn,[95]:Ye,[96]:an,[126]:an},to={[38]:Bn,[92]:jn},no={[-5]:dt,[-4]:dt,[-3]:dt,[33]:Al,[38]:Bn,[42]:Ft,[60]:[Oi,ml],[91]:Tl,[92]:[rl,jn],[93]:Pt,[95]:Ft,[96]:Vi},ro={null:[Ft,ql]},io={null:[42,95]},lo={null:[]};function oo(e){let t=Mn([Wn,...(e||{}).extensions||[]]),n={defined:[],lazy:{},constructs:t,content:r(Si),document:r(Fi),flow:r(Ul),string:r(Wl),text:r($l)};return n;function r(l){return i;function i(o){return Yl(n,l,o)}}}var cn=/[\0\t\n\r]/g;function ao(){let e=1,t="",n=!0,r;return l;function l(i,o,a){let s=[],f,c,u,d,p;for(i=t+i.toString(o),u=0,t="",n&&(i.charCodeAt(0)===65279&&u++,n=void 0);u<i.length;){if(cn.lastIndex=u,f=cn.exec(i),d=f&&f.index!==void 0?f.index:i.length,p=i.charCodeAt(d),!f){t=i.slice(u);break}if(p===10&&u===d&&r)s.push(-3),r=void 0;else switch(r&&(s.push(-5),r=void 0),u<d&&(s.push(i.slice(u,d)),e+=d-u),p){case 0:{s.push(65533),e++;break}case 9:{for(c=Math.ceil(e/4)*4,s.push(-2);e++<c;)s.push(-1);break}case 10:{s.push(-4),e=1;break}default:r=!0,e=1}u=d+1}return a&&(r&&s.push(-5),t&&s.push(t),s.push(null)),s}}function uo(e){for(;!_n(e););return e}function $n(e,t){let n=Number.parseInt(e,t);return n<9||n===11||n>13&&n<32||n>126&&n<160||n>55295&&n<57344||n>64975&&n<65008||(n&65535)===65535||(n&65535)===65534||n>1114111?"\uFFFD":String.fromCharCode(n)}var so=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function Qn(e){return e.replace(so,co)}function co(e,t,n){if(t)return t;if(n.charCodeAt(0)===35){let r=n.charCodeAt(1),l=r===120||r===88;return $n(n.slice(l?2:1),l?16:10)}return Ot(n)||e}var Yn={}.hasOwnProperty,fo=function(e,t,n){return typeof t!="string"&&(n=t,t=void 0),po(n)(uo(oo(n).document().write(ao()(e,t,!0))))};function po(e){let t={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:a(Vt),autolinkProtocol:D,autolinkEmail:D,atxHeading:a(Nt),blockQuote:a(rt),characterEscape:D,characterReference:D,codeFenced:a(_t),codeFencedFenceInfo:s,codeFencedFenceMeta:s,codeIndented:a(_t,s),codeText:a(Or,s),codeTextData:D,data:D,codeFlowValue:D,definition:a(Pr),definitionDestinationString:s,definitionLabelString:s,definitionTitleString:s,emphasis:a(Lr),hardBreakEscape:a(Ht),hardBreakTrailing:a(Ht),htmlFlow:a(Ut,s),htmlFlowData:D,htmlText:a(Ut,s),htmlTextData:D,image:a(zr),label:s,link:a(Vt),listItem:a(Ir),listItemValue:y,listOrdered:a(qt,p),listUnordered:a(qt),paragraph:a(Mr),reference:Te,referenceString:s,resourceDestinationString:s,resourceTitleString:s,setextHeading:a(Nt),strong:a(Rr),thematicBreak:a(Br)},exit:{atxHeading:c(),atxHeadingSequence:A,autolink:c(),autolinkEmail:Le,autolinkProtocol:Pe,blockQuote:c(),characterEscapeValue:O,characterReferenceMarkerHexadecimal:Oe,characterReferenceMarkerNumeric:Oe,characterReferenceValue:xe,codeFenced:c(F),codeFencedFence:m,codeFencedFenceInfo:k,codeFencedFenceMeta:w,codeFlowValue:O,codeIndented:c(S),codeText:c(V),codeTextData:O,data:O,definition:c(),definitionDestinationString:b,definitionLabelString:T,definitionTitleString:L,emphasis:c(),hardBreakEscape:c($),hardBreakTrailing:c($),htmlFlow:c(P),htmlFlowData:O,htmlText:c(z),htmlTextData:O,image:c(ge),label:ue,labelText:h,lineEnding:U,link:c(ne),listItem:c(),listOrdered:c(),listUnordered:c(),paragraph:c(),referenceString:Z,resourceDestinationString:me,resourceTitleString:g,resource:se,setextHeading:c(x),setextHeadingLineSequence:_,setextHeadingText:R,strong:c(),thematicBreak:c()}};Xn(t,(e||{}).mdastExtensions||[]);let n={};return r;function r(v){let E={type:"root",children:[]},M={stack:[E],tokenStack:[],config:t,enter:f,exit:u,buffer:s,resume:d,setData:i,getData:o},q=[],Q=-1;for(;++Q<v.length;)if(v[Q][1].type==="listOrdered"||v[Q][1].type==="listUnordered")if(v[Q][0]==="enter")q.push(Q);else{let fe=q.pop();Q=l(v,fe,Q)}for(Q=-1;++Q<v.length;){let fe=t[v[Q][0]];Yn.call(fe,v[Q][1].type)&&fe[v[Q][1].type].call(Object.assign({sliceSerialize:v[Q][2].sliceSerialize},M),v[Q][1])}if(M.tokenStack.length>0){let fe=M.tokenStack[M.tokenStack.length-1];(fe[1]||fn).call(M,void 0,fe[0])}for(E.position={start:ve(v.length>0?v[0][1].start:{line:1,column:1,offset:0}),end:ve(v.length>0?v[v.length-2][1].end:{line:1,column:1,offset:0})},Q=-1;++Q<t.transforms.length;)E=t.transforms[Q](E)||E;return E}function l(v,E,M){let q=E-1,Q=-1,fe=!1,Ce,ye,je,Be;for(;++q<=M;){let X=v[q];if(X[1].type==="listUnordered"||X[1].type==="listOrdered"||X[1].type==="blockQuote"?(X[0]==="enter"?Q++:Q--,Be=void 0):X[1].type==="lineEndingBlank"?X[0]==="enter"&&(Ce&&!Be&&!Q&&!je&&(je=q),Be=void 0):X[1].type==="linePrefix"||X[1].type==="listItemValue"||X[1].type==="listItemMarker"||X[1].type==="listItemPrefix"||X[1].type==="listItemPrefixWhitespace"||(Be=void 0),!Q&&X[0]==="enter"&&X[1].type==="listItemPrefix"||Q===-1&&X[0]==="exit"&&(X[1].type==="listUnordered"||X[1].type==="listOrdered")){if(Ce){let it=q;for(ye=void 0;it--;){let be=v[it];if(be[1].type==="lineEnding"||be[1].type==="lineEndingBlank"){if(be[0]==="exit")continue;ye&&(v[ye][1].type="lineEndingBlank",fe=!0),be[1].type="lineEnding",ye=it}else if(!(be[1].type==="linePrefix"||be[1].type==="blockQuotePrefix"||be[1].type==="blockQuotePrefixWhitespace"||be[1].type==="blockQuoteMarker"||be[1].type==="listItemIndent"))break}je&&(!ye||je<ye)&&(Ce._spread=!0),Ce.end=Object.assign({},ye?v[ye][1].start:X[1].end),v.splice(ye||q,0,["exit",Ce,X[2]]),q++,M++}X[1].type==="listItemPrefix"&&(Ce={type:"listItem",_spread:!1,start:Object.assign({},X[1].start),end:void 0},v.splice(q,0,["enter",Ce,X[2]]),q++,M++,je=void 0,Be=!0)}}return v[E][1]._spread=fe,M}function i(v,E){n[v]=E}function o(v){return n[v]}function a(v,E){return M;function M(q){f.call(this,v(q),q),E&&E.call(this,q)}}function s(){this.stack.push({type:"fragment",children:[]})}function f(v,E,M){return this.stack[this.stack.length-1].children.push(v),this.stack.push(v),this.tokenStack.push([E,M]),v.position={start:ve(E.start)},v}function c(v){return E;function E(M){v&&v.call(this,M),u.call(this,M)}}function u(v,E){let M=this.stack.pop(),q=this.tokenStack.pop();if(q)q[0].type!==v.type&&(E?E.call(this,v,q[0]):(q[1]||fn).call(this,v,q[0]));else throw new Error("Cannot close `"+v.type+"` ("+Ne({start:v.start,end:v.end})+"): it\u2019s not open");return M.position.end=ve(v.end),M}function d(){return gi(this.stack.pop())}function p(){i("expectingFirstListItemValue",!0)}function y(v){if(o("expectingFirstListItemValue")){let E=this.stack[this.stack.length-2];E.start=Number.parseInt(this.sliceSerialize(v),10),i("expectingFirstListItemValue")}}function k(){let v=this.resume(),E=this.stack[this.stack.length-1];E.lang=v}function w(){let v=this.resume(),E=this.stack[this.stack.length-1];E.meta=v}function m(){o("flowCodeInside")||(this.buffer(),i("flowCodeInside",!0))}function F(){let v=this.resume(),E=this.stack[this.stack.length-1];E.value=v.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),i("flowCodeInside")}function S(){let v=this.resume(),E=this.stack[this.stack.length-1];E.value=v.replace(/(\r?\n|\r)$/g,"")}function T(v){let E=this.resume(),M=this.stack[this.stack.length-1];M.label=E,M.identifier=ce(this.sliceSerialize(v)).toLowerCase()}function L(){let v=this.resume(),E=this.stack[this.stack.length-1];E.title=v}function b(){let v=this.resume(),E=this.stack[this.stack.length-1];E.url=v}function A(v){let E=this.stack[this.stack.length-1];if(!E.depth){let M=this.sliceSerialize(v).length;E.depth=M}}function R(){i("setextHeadingSlurpLineEnding",!0)}function _(v){let E=this.stack[this.stack.length-1];E.depth=this.sliceSerialize(v).charCodeAt(0)===61?1:2}function x(){i("setextHeadingSlurpLineEnding")}function D(v){let E=this.stack[this.stack.length-1],M=E.children[E.children.length-1];(!M||M.type!=="text")&&(M=jr(),M.position={start:ve(v.start)},E.children.push(M)),this.stack.push(M)}function O(v){let E=this.stack.pop();E.value+=this.sliceSerialize(v),E.position.end=ve(v.end)}function U(v){let E=this.stack[this.stack.length-1];if(o("atHardBreak")){let M=E.children[E.children.length-1];M.position.end=ve(v.end),i("atHardBreak");return}!o("setextHeadingSlurpLineEnding")&&t.canContainEols.includes(E.type)&&(D.call(this,v),O.call(this,v))}function $(){i("atHardBreak",!0)}function P(){let v=this.resume(),E=this.stack[this.stack.length-1];E.value=v}function z(){let v=this.resume(),E=this.stack[this.stack.length-1];E.value=v}function V(){let v=this.resume(),E=this.stack[this.stack.length-1];E.value=v}function ne(){let v=this.stack[this.stack.length-1];if(o("inReference")){let E=o("referenceType")||"shortcut";v.type+="Reference",v.referenceType=E,delete v.url,delete v.title}else delete v.identifier,delete v.label;i("referenceType")}function ge(){let v=this.stack[this.stack.length-1];if(o("inReference")){let E=o("referenceType")||"shortcut";v.type+="Reference",v.referenceType=E,delete v.url,delete v.title}else delete v.identifier,delete v.label;i("referenceType")}function h(v){let E=this.sliceSerialize(v),M=this.stack[this.stack.length-2];M.label=Qn(E),M.identifier=ce(E).toLowerCase()}function ue(){let v=this.stack[this.stack.length-1],E=this.resume(),M=this.stack[this.stack.length-1];if(i("inReference",!0),M.type==="link"){let q=v.children;M.children=q}else M.alt=E}function me(){let v=this.resume(),E=this.stack[this.stack.length-1];E.url=v}function g(){let v=this.resume(),E=this.stack[this.stack.length-1];E.title=v}function se(){i("inReference")}function Te(){i("referenceType","collapsed")}function Z(v){let E=this.resume(),M=this.stack[this.stack.length-1];M.label=E,M.identifier=ce(this.sliceSerialize(v)).toLowerCase(),i("referenceType","full")}function Oe(v){i("characterReferenceType",v.type)}function xe(v){let E=this.sliceSerialize(v),M=o("characterReferenceType"),q;M?(q=$n(E,M==="characterReferenceMarkerNumeric"?10:16),i("characterReferenceType")):q=Ot(E);let Q=this.stack.pop();Q.value+=q,Q.position.end=ve(v.end)}function Pe(v){O.call(this,v);let E=this.stack[this.stack.length-1];E.url=this.sliceSerialize(v)}function Le(v){O.call(this,v);let E=this.stack[this.stack.length-1];E.url="mailto:"+this.sliceSerialize(v)}function rt(){return{type:"blockquote",children:[]}}function _t(){return{type:"code",lang:null,meta:null,value:""}}function Or(){return{type:"inlineCode",value:""}}function Pr(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function Lr(){return{type:"emphasis",children:[]}}function Nt(){return{type:"heading",depth:void 0,children:[]}}function Ht(){return{type:"break"}}function Ut(){return{type:"html",value:""}}function zr(){return{type:"image",title:null,url:"",alt:null}}function Vt(){return{type:"link",title:null,url:"",children:[]}}function qt(v){return{type:"list",ordered:v.type==="listOrdered",start:null,spread:v._spread,children:[]}}function Ir(v){return{type:"listItem",spread:v._spread,checked:null,children:[]}}function Mr(){return{type:"paragraph",children:[]}}function Rr(){return{type:"strong",children:[]}}function jr(){return{type:"text",value:""}}function Br(){return{type:"thematicBreak"}}}function ve(e){return{line:e.line,column:e.column,offset:e.offset}}function Xn(e,t){let n=-1;for(;++n<t.length;){let r=t[n];Array.isArray(r)?Xn(e,r):ho(e,r)}}function ho(e,t){let n;for(n in t)if(Yn.call(t,n)){if(n==="canContainEols"){let r=t[n];r&&e[n].push(...r)}else if(n==="transforms"){let r=t[n];r&&e[n].push(...r)}else if(n==="enter"||n==="exit"){let r=t[n];r&&Object.assign(e[n],r)}}}function fn(e,t){throw e?new Error("Cannot close `"+e.type+"` ("+Ne({start:e.start,end:e.end})+"): a different token (`"+t.type+"`, "+Ne({start:t.start,end:t.end})+") is open"):new Error("Cannot close document, a token (`"+t.type+"`, "+Ne({start:t.start,end:t.end})+") is still open")}function go(e){Object.assign(this,{Parser:t=>{let n=this.data("settings");return fo(t,Object.assign({},n,e,{extensions:this.data("micromarkExtensions")||[],mdastExtensions:this.data("fromMarkdownExtensions")||[]}))}})}function mo(e,t){let n={type:"element",tagName:"blockquote",properties:{},children:e.wrap(e.all(t),!0)};return e.patch(t,n),e.applyData(t,n)}function yo(e,t){let n={type:"element",tagName:"br",properties:{},children:[]};return e.patch(t,n),[e.applyData(t,n),{type:"text",value:`
`}]}function bo(e,t){let n=t.value?t.value+`
`:"",r=t.lang?t.lang.match(/^[^ \t]+(?=[ \t]|$)/):null,l={};r&&(l.className=["language-"+r]);let i={type:"element",tagName:"code",properties:l,children:[{type:"text",value:n}]};return t.meta&&(i.data={meta:t.meta}),e.patch(t,i),i=e.applyData(t,i),i={type:"element",tagName:"pre",properties:{},children:[i]},e.patch(t,i),i}function ko(e,t){let n={type:"element",tagName:"del",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function xo(e,t){let n={type:"element",tagName:"em",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Me(e){let t=[],n=-1,r=0,l=0;for(;++n<e.length;){let i=e.charCodeAt(n),o="";if(i===37&&G(e.charCodeAt(n+1))&&G(e.charCodeAt(n+2)))l=2;else if(i<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(i))||(o=String.fromCharCode(i));else if(i>55295&&i<57344){let a=e.charCodeAt(n+1);i<56320&&a>56319&&a<57344?(o=String.fromCharCode(i,a),l=1):o="\uFFFD"}else o=String.fromCharCode(i);o&&(t.push(e.slice(r,n),encodeURIComponent(o)),r=n+l+1,o=""),l&&(n+=l,l=0)}return t.join("")+e.slice(r)}function Kn(e,t){let n=String(t.identifier).toUpperCase(),r=Me(n.toLowerCase()),l=e.footnoteOrder.indexOf(n),i;l===-1?(e.footnoteOrder.push(n),e.footnoteCounts[n]=1,i=e.footnoteOrder.length):(e.footnoteCounts[n]++,i=l+1);let o=e.footnoteCounts[n],a={type:"element",tagName:"a",properties:{href:"#"+e.clobberPrefix+"fn-"+r,id:e.clobberPrefix+"fnref-"+r+(o>1?"-"+o:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(i)}]};e.patch(t,a);let s={type:"element",tagName:"sup",properties:{},children:[a]};return e.patch(t,s),e.applyData(t,s)}function vo(e,t){let n=e.footnoteById,r=1;for(;r in n;)r++;let l=String(r);return n[l]={type:"footnoteDefinition",identifier:l,children:[{type:"paragraph",children:t.children}],position:t.position},Kn(e,{type:"footnoteReference",identifier:l,position:t.position})}function wo(e,t){let n={type:"element",tagName:"h"+t.depth,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function So(e,t){if(e.dangerous){let n={type:"raw",value:t.value};return e.patch(t,n),e.applyData(t,n)}return null}function Jn(e,t){let n=t.referenceType,r="]";if(n==="collapsed"?r+="[]":n==="full"&&(r+="["+(t.label||t.identifier)+"]"),t.type==="imageReference")return{type:"text",value:"!["+t.alt+r};let l=e.all(t),i=l[0];i&&i.type==="text"?i.value="["+i.value:l.unshift({type:"text",value:"["});let o=l[l.length-1];return o&&o.type==="text"?o.value+=r:l.push({type:"text",value:r}),l}function Co(e,t){let n=e.definition(t.identifier);if(!n)return Jn(e,t);let r={src:Me(n.url||""),alt:t.alt};n.title!==null&&n.title!==void 0&&(r.title=n.title);let l={type:"element",tagName:"img",properties:r,children:[]};return e.patch(t,l),e.applyData(t,l)}function Fo(e,t){let n={src:Me(t.url)};t.alt!==null&&t.alt!==void 0&&(n.alt=t.alt),t.title!==null&&t.title!==void 0&&(n.title=t.title);let r={type:"element",tagName:"img",properties:n,children:[]};return e.patch(t,r),e.applyData(t,r)}function Eo(e,t){let n={type:"text",value:t.value.replace(/\r?\n|\r/g," ")};e.patch(t,n);let r={type:"element",tagName:"code",properties:{},children:[n]};return e.patch(t,r),e.applyData(t,r)}function Ao(e,t){let n=e.definition(t.identifier);if(!n)return Jn(e,t);let r={href:Me(n.url||"")};n.title!==null&&n.title!==void 0&&(r.title=n.title);let l={type:"element",tagName:"a",properties:r,children:e.all(t)};return e.patch(t,l),e.applyData(t,l)}function Do(e,t){let n={href:Me(t.url)};t.title!==null&&t.title!==void 0&&(n.title=t.title);let r={type:"element",tagName:"a",properties:n,children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function To(e,t,n){let r=e.all(t),l=n?Oo(n):Zn(t),i={},o=[];if(typeof t.checked=="boolean"){let c=r[0],u;c&&c.type==="element"&&c.tagName==="p"?u=c:(u={type:"element",tagName:"p",properties:{},children:[]},r.unshift(u)),u.children.length>0&&u.children.unshift({type:"text",value:" "}),u.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:t.checked,disabled:!0},children:[]}),i.className=["task-list-item"]}let a=-1;for(;++a<r.length;){let c=r[a];(l||a!==0||c.type!=="element"||c.tagName!=="p")&&o.push({type:"text",value:`
`}),c.type==="element"&&c.tagName==="p"&&!l?o.push(...c.children):o.push(c)}let s=r[r.length-1];s&&(l||s.type!=="element"||s.tagName!=="p")&&o.push({type:"text",value:`
`});let f={type:"element",tagName:"li",properties:i,children:o};return e.patch(t,f),e.applyData(t,f)}function Oo(e){let t=!1;if(e.type==="list"){t=e.spread||!1;let n=e.children,r=-1;for(;!t&&++r<n.length;)t=Zn(n[r])}return t}function Zn(e){let t=e.spread;return t==null?e.children.length>1:t}function Po(e,t){let n={},r=e.all(t),l=-1;for(typeof t.start=="number"&&t.start!==1&&(n.start=t.start);++l<r.length;){let o=r[l];if(o.type==="element"&&o.tagName==="li"&&o.properties&&Array.isArray(o.properties.className)&&o.properties.className.includes("task-list-item")){n.className=["contains-task-list"];break}}let i={type:"element",tagName:t.ordered?"ol":"ul",properties:n,children:e.wrap(r,!0)};return e.patch(t,i),e.applyData(t,i)}function Lo(e,t){let n={type:"element",tagName:"p",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function zo(e,t){let n={type:"root",children:e.wrap(e.all(t))};return e.patch(t,n),e.applyData(t,n)}function Io(e,t){let n={type:"element",tagName:"strong",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}var Lt=Gn("start"),zt=Gn("end");function Mo(e){return{start:Lt(e),end:zt(e)}}function Gn(e){return t;function t(n){let r=n&&n.position&&n.position[e]||{};return{line:r.line||null,column:r.column||null,offset:r.offset>-1?r.offset:null}}}function Ro(e,t){let n=e.all(t),r=n.shift(),l=[];if(r){let o={type:"element",tagName:"thead",properties:{},children:e.wrap([r],!0)};e.patch(t.children[0],o),l.push(o)}if(n.length>0){let o={type:"element",tagName:"tbody",properties:{},children:e.wrap(n,!0)},a=Lt(t.children[1]),s=zt(t.children[t.children.length-1]);a.line&&s.line&&(o.position={start:a,end:s}),l.push(o)}let i={type:"element",tagName:"table",properties:{},children:e.wrap(l,!0)};return e.patch(t,i),e.applyData(t,i)}function jo(e,t,n){let r=n?n.children:void 0,l=(r?r.indexOf(t):1)===0?"th":"td",i=n&&n.type==="table"?n.align:void 0,o=i?i.length:t.children.length,a=-1,s=[];for(;++a<o;){let c=t.children[a],u={},d=i?i[a]:void 0;d&&(u.align=d);let p={type:"element",tagName:l,properties:u,children:[]};c&&(p.children=e.all(c),e.patch(c,p),p=e.applyData(t,p)),s.push(p)}let f={type:"element",tagName:"tr",properties:{},children:e.wrap(s,!0)};return e.patch(t,f),e.applyData(t,f)}function Bo(e,t){let n={type:"element",tagName:"td",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function _o(e){let t=String(e),n=/\r?\n|\r/g,r=n.exec(t),l=0,i=[];for(;r;)i.push(pn(t.slice(l,r.index),l>0,!0),r[0]),l=r.index+r[0].length,r=n.exec(t);return i.push(pn(t.slice(l),l>0,!1)),i.join("")}function pn(e,t,n){let r=0,l=e.length;if(t){let i=e.codePointAt(r);for(;i===9||i===32;)r++,i=e.codePointAt(r)}if(n){let i=e.codePointAt(l-1);for(;i===9||i===32;)l--,i=e.codePointAt(l-1)}return l>r?e.slice(r,l):""}function No(e,t){let n={type:"text",value:_o(String(t.value))};return e.patch(t,n),e.applyData(t,n)}function Ho(e,t){let n={type:"element",tagName:"hr",properties:{},children:[]};return e.patch(t,n),e.applyData(t,n)}var Uo={blockquote:mo,break:yo,code:bo,delete:ko,emphasis:xo,footnoteReference:Kn,footnote:vo,heading:wo,html:So,imageReference:Co,image:Fo,inlineCode:Eo,linkReference:Ao,link:Do,listItem:To,list:Po,paragraph:Lo,root:zo,strong:Io,table:Ro,tableCell:Bo,tableRow:jo,text:No,thematicBreak:Ho,toml:We,yaml:We,definition:We,footnoteDefinition:We};function We(){return null}var It=function(e){if(e==null)return $o;if(typeof e=="string")return Wo(e);if(typeof e=="object")return Array.isArray(e)?Vo(e):qo(e);if(typeof e=="function")return tt(e);throw new Error("Expected function, string, or object as test")};function Vo(e){let t=[],n=-1;for(;++n<e.length;)t[n]=It(e[n]);return tt(r);function r(...l){let i=-1;for(;++i<t.length;)if(t[i].call(this,...l))return!0;return!1}}function qo(e){return tt(t);function t(n){let r;for(r in e)if(n[r]!==e[r])return!1;return!0}}function Wo(e){return tt(t);function t(n){return n&&n.type===e}}function tt(e){return t;function t(n,...r){return!!(n&&typeof n=="object"&&"type"in n&&e.call(this,n,...r))}}function $o(){return!0}var Qo=!0,dn=!1,Yo="skip",er=function(e,t,n,r){typeof t=="function"&&typeof n!="function"&&(r=n,n=t,t=null);let l=It(t),i=r?-1:1;o(e,void 0,[])();function o(a,s,f){let c=a&&typeof a=="object"?a:{};if(typeof c.type=="string"){let d=typeof c.tagName=="string"?c.tagName:typeof c.name=="string"?c.name:void 0;Object.defineProperty(u,"name",{value:"node ("+(a.type+(d?"<"+d+">":""))+")"})}return u;function u(){let d=[],p,y,k;if((!t||l(a,s,f[f.length-1]||null))&&(d=Xo(n(a,f)),d[0]===dn))return d;if(a.children&&d[0]!==Yo)for(y=(r?a.children.length:-1)+i,k=f.concat(a);y>-1&&y<a.children.length;){if(p=o(a.children[y],y,k)(),p[0]===dn)return p;y=typeof p[1]=="number"?p[1]:y+i}return d}}};function Xo(e){return Array.isArray(e)?e:typeof e=="number"?[Qo,e]:[e]}var Mt=function(e,t,n,r){typeof t=="function"&&typeof n!="function"&&(r=n,n=t,t=null),er(e,t,l,r);function l(i,o){let a=o[o.length-1];return n(i,a?a.children.indexOf(i):null,a)}};function Ko(e){return!e||!e.position||!e.position.start||!e.position.start.line||!e.position.start.column||!e.position.end||!e.position.end.line||!e.position.end.column}var hn={}.hasOwnProperty;function Jo(e){let t=Object.create(null);if(!e||!e.type)throw new Error("mdast-util-definitions expected node");return Mt(e,"definition",r=>{let l=gn(r.identifier);l&&!hn.call(t,l)&&(t[l]=r)}),n;function n(r){let l=gn(r);return l&&hn.call(t,l)?t[l]:null}}function gn(e){return String(e||"").toUpperCase()}var Je={}.hasOwnProperty;function Zo(e,t){let n=t||{},r=n.allowDangerousHtml||!1,l={};return o.dangerous=r,o.clobberPrefix=n.clobberPrefix===void 0||n.clobberPrefix===null?"user-content-":n.clobberPrefix,o.footnoteLabel=n.footnoteLabel||"Footnotes",o.footnoteLabelTagName=n.footnoteLabelTagName||"h2",o.footnoteLabelProperties=n.footnoteLabelProperties||{className:["sr-only"]},o.footnoteBackLabel=n.footnoteBackLabel||"Back to content",o.unknownHandler=n.unknownHandler,o.passThrough=n.passThrough,o.handlers=J(J({},Uo),n.handlers),o.definition=Jo(e),o.footnoteById=l,o.footnoteOrder=[],o.footnoteCounts={},o.patch=Go,o.applyData=ea,o.one=a,o.all=s,o.wrap=na,o.augment=i,Mt(e,"footnoteDefinition",f=>{let c=String(f.identifier).toUpperCase();Je.call(l,c)||(l[c]=f)}),o;function i(f,c){if(f&&"data"in f&&f.data){let u=f.data;u.hName&&(c.type!=="element"&&(c={type:"element",tagName:"",properties:{},children:[]}),c.tagName=u.hName),c.type==="element"&&u.hProperties&&(c.properties=J(J({},c.properties),u.hProperties)),"children"in c&&c.children&&u.hChildren&&(c.children=u.hChildren)}if(f){let u="type"in f?f:{position:f};Ko(u)||(c.position={start:Lt(u),end:zt(u)})}return c}function o(f,c,u,d){return Array.isArray(u)&&(d=u,u={}),i(f,{type:"element",tagName:c,properties:u||{},children:d||[]})}function a(f,c){return tr(o,f,c)}function s(f){return Rt(o,f)}}function Go(e,t){e.position&&(t.position=Mo(e))}function ea(e,t){let n=t;if(e&&e.data){let r=e.data.hName,l=e.data.hChildren,i=e.data.hProperties;typeof r=="string"&&(n.type==="element"?n.tagName=r:n={type:"element",tagName:r,properties:{},children:[]}),n.type==="element"&&i&&(n.properties=J(J({},n.properties),i)),"children"in n&&n.children&&l!==null&&l!==void 0&&(n.children=l)}return n}function tr(e,t,n){let r=t&&t.type;if(!r)throw new Error("Expected node, got `"+t+"`");return Je.call(e.handlers,r)?e.handlers[r](e,t,n):e.passThrough&&e.passThrough.includes(r)?"children"in t?we(J({},t),{children:Rt(e,t)}):t:e.unknownHandler?e.unknownHandler(e,t,n):ta(e,t)}function Rt(e,t){let n=[];if("children"in t){let r=t.children,l=-1;for(;++l<r.length;){let i=tr(e,r[l],t);if(i){if(l&&r[l-1].type==="break"&&(!Array.isArray(i)&&i.type==="text"&&(i.value=i.value.replace(/^\s+/,"")),!Array.isArray(i)&&i.type==="element")){let o=i.children[0];o&&o.type==="text"&&(o.value=o.value.replace(/^\s+/,""))}Array.isArray(i)?n.push(...i):n.push(i)}}}return n}function ta(e,t){let n=t.data||{},r="value"in t&&!(Je.call(n,"hProperties")||Je.call(n,"hChildren"))?{type:"text",value:t.value}:{type:"element",tagName:"div",properties:{},children:Rt(e,t)};return e.patch(t,r),e.applyData(t,r)}function na(e,t){let n=[],r=-1;for(t&&n.push({type:"text",value:`
`});++r<e.length;)r&&n.push({type:"text",value:`
`}),n.push(e[r]);return t&&e.length>0&&n.push({type:"text",value:`
`}),n}function ra(e){let t=[],n=-1;for(;++n<e.footnoteOrder.length;){let r=e.footnoteById[e.footnoteOrder[n]];if(!r)continue;let l=e.all(r),i=String(r.identifier).toUpperCase(),o=Me(i.toLowerCase()),a=0,s=[];for(;++a<=e.footnoteCounts[i];){let u={type:"element",tagName:"a",properties:{href:"#"+e.clobberPrefix+"fnref-"+o+(a>1?"-"+a:""),dataFootnoteBackref:!0,className:["data-footnote-backref"],ariaLabel:e.footnoteBackLabel},children:[{type:"text",value:"\u21A9"}]};a>1&&u.children.push({type:"element",tagName:"sup",children:[{type:"text",value:String(a)}]}),s.length>0&&s.push({type:"text",value:" "}),s.push(u)}let f=l[l.length-1];if(f&&f.type==="element"&&f.tagName==="p"){let u=f.children[f.children.length-1];u&&u.type==="text"?u.value+=" ":f.children.push({type:"text",value:" "}),f.children.push(...s)}else l.push(...s);let c={type:"element",tagName:"li",properties:{id:e.clobberPrefix+"fn-"+o},children:e.wrap(l,!0)};e.patch(r,c),t.push(c)}if(t.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:e.footnoteLabelTagName,properties:we(J({},JSON.parse(JSON.stringify(e.footnoteLabelProperties))),{id:"footnote-label"}),children:[{type:"text",value:e.footnoteLabel}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:e.wrap(t,!0)},{type:"text",value:`
`}]}}function nr(e,t){let n=Zo(e,t),r=n.one(e,null),l=ra(n);return l&&r.children.push({type:"text",value:`
`},l),Array.isArray(r)?{type:"root",children:r}:r}var ia=function(e,t){return e&&"run"in e?oa(e,t):aa(e||t)},la=ia;function oa(e,t){return(n,r,l)=>{e.run(nr(n,t),r,i=>{l(i)})}}function aa(e){return t=>nr(t,e)}var j=de(qr(),1),qe=class{constructor(e,t,n){this.property=e,this.normal=t,n&&(this.space=n)}};qe.prototype.property={};qe.prototype.normal={};qe.prototype.space=null;function rr(e,t){let n={},r={},l=-1;for(;++l<e.length;)Object.assign(n,e[l].property),Object.assign(r,e[l].normal);return new qe(n,r,t)}function Et(e){return e.toLowerCase()}var ae=class{constructor(e,t){this.property=e,this.attribute=t}};ae.prototype.space=null;ae.prototype.boolean=!1;ae.prototype.booleanish=!1;ae.prototype.overloadedBoolean=!1;ae.prototype.number=!1;ae.prototype.commaSeparated=!1;ae.prototype.spaceSeparated=!1;ae.prototype.commaOrSpaceSeparated=!1;ae.prototype.mustUseProperty=!1;ae.prototype.defined=!1;var Ze={};Tn(Ze,{boolean:()=>B,booleanish:()=>K,commaOrSpaceSeparated:()=>re,commaSeparated:()=>Ie,number:()=>C,overloadedBoolean:()=>ir,spaceSeparated:()=>Y});var ua=0,B=De(),K=De(),ir=De(),C=De(),Y=De(),Ie=De(),re=De();function De(){return 2**++ua}var ht=Object.keys(Ze),jt=class extends ae{constructor(e,t,n,r){let l=-1;if(super(e,t),mn(this,"space",r),typeof n=="number")for(;++l<ht.length;){let i=ht[l];mn(this,ht[l],(n&Ze[i])===Ze[i])}}};jt.prototype.defined=!0;function mn(e,t,n){n&&(e[t]=n)}var sa={}.hasOwnProperty;function Re(e){let t={},n={},r;for(r in e.properties)if(sa.call(e.properties,r)){let l=e.properties[r],i=new jt(r,e.transform(e.attributes||{},r),l,e.space);e.mustUseProperty&&e.mustUseProperty.includes(r)&&(i.mustUseProperty=!0),t[r]=i,n[Et(r)]=r,n[Et(i.attribute)]=r}return new qe(t,n,e.space)}var lr=Re({space:"xlink",transform(e,t){return"xlink:"+t.slice(5).toLowerCase()},properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null}}),or=Re({space:"xml",transform(e,t){return"xml:"+t.slice(3).toLowerCase()},properties:{xmlLang:null,xmlBase:null,xmlSpace:null}});function ar(e,t){return t in e?e[t]:t}function ur(e,t){return ar(e,t.toLowerCase())}var sr=Re({space:"xmlns",attributes:{xmlnsxlink:"xmlns:xlink"},transform:ur,properties:{xmlns:null,xmlnsXLink:null}}),cr=Re({transform(e,t){return t==="role"?t:"aria-"+t.slice(4).toLowerCase()},properties:{ariaActiveDescendant:null,ariaAtomic:K,ariaAutoComplete:null,ariaBusy:K,ariaChecked:K,ariaColCount:C,ariaColIndex:C,ariaColSpan:C,ariaControls:Y,ariaCurrent:null,ariaDescribedBy:Y,ariaDetails:null,ariaDisabled:K,ariaDropEffect:Y,ariaErrorMessage:null,ariaExpanded:K,ariaFlowTo:Y,ariaGrabbed:K,ariaHasPopup:null,ariaHidden:K,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:Y,ariaLevel:C,ariaLive:null,ariaModal:K,ariaMultiLine:K,ariaMultiSelectable:K,ariaOrientation:null,ariaOwns:Y,ariaPlaceholder:null,ariaPosInSet:C,ariaPressed:K,ariaReadOnly:K,ariaRelevant:null,ariaRequired:K,ariaRoleDescription:Y,ariaRowCount:C,ariaRowIndex:C,ariaRowSpan:C,ariaSelected:K,ariaSetSize:C,ariaSort:null,ariaValueMax:C,ariaValueMin:C,ariaValueNow:C,ariaValueText:null,role:null}}),ca=Re({space:"html",attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},transform:ur,mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:Ie,acceptCharset:Y,accessKey:Y,action:null,allow:null,allowFullScreen:B,allowPaymentRequest:B,allowUserMedia:B,alt:null,as:null,async:B,autoCapitalize:null,autoComplete:Y,autoFocus:B,autoPlay:B,blocking:Y,capture:null,charSet:null,checked:B,cite:null,className:Y,cols:C,colSpan:null,content:null,contentEditable:K,controls:B,controlsList:Y,coords:C|Ie,crossOrigin:null,data:null,dateTime:null,decoding:null,default:B,defer:B,dir:null,dirName:null,disabled:B,download:ir,draggable:K,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:B,formTarget:null,headers:Y,height:C,hidden:B,high:C,href:null,hrefLang:null,htmlFor:Y,httpEquiv:Y,id:null,imageSizes:null,imageSrcSet:null,inert:B,inputMode:null,integrity:null,is:null,isMap:B,itemId:null,itemProp:Y,itemRef:Y,itemScope:B,itemType:Y,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:B,low:C,manifest:null,max:null,maxLength:C,media:null,method:null,min:null,minLength:C,multiple:B,muted:B,name:null,nonce:null,noModule:B,noValidate:B,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:B,optimum:C,pattern:null,ping:Y,placeholder:null,playsInline:B,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:B,referrerPolicy:null,rel:Y,required:B,reversed:B,rows:C,rowSpan:C,sandbox:Y,scope:null,scoped:B,seamless:B,selected:B,shadowRootClonable:B,shadowRootDelegatesFocus:B,shadowRootMode:null,shape:null,size:C,sizes:null,slot:null,span:C,spellCheck:K,src:null,srcDoc:null,srcLang:null,srcSet:null,start:C,step:null,style:null,tabIndex:C,target:null,title:null,translate:null,type:null,typeMustMatch:B,useMap:null,value:K,width:C,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:Y,axis:null,background:null,bgColor:null,border:C,borderColor:null,bottomMargin:C,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:B,declare:B,event:null,face:null,frame:null,frameBorder:null,hSpace:C,leftMargin:C,link:null,longDesc:null,lowSrc:null,marginHeight:C,marginWidth:C,noResize:B,noHref:B,noShade:B,noWrap:B,object:null,profile:null,prompt:null,rev:null,rightMargin:C,rules:null,scheme:null,scrolling:K,standby:null,summary:null,text:null,topMargin:C,valueType:null,version:null,vAlign:null,vLink:null,vSpace:C,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:B,disableRemotePlayback:B,prefix:null,property:null,results:C,security:null,unselectable:null}}),fa=Re({space:"svg",attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},transform:ar,properties:{about:re,accentHeight:C,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:C,amplitude:C,arabicForm:null,ascent:C,attributeName:null,attributeType:null,azimuth:C,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:C,by:null,calcMode:null,capHeight:C,className:Y,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:C,diffuseConstant:C,direction:null,display:null,dur:null,divisor:C,dominantBaseline:null,download:B,dx:null,dy:null,edgeMode:null,editable:null,elevation:C,enableBackground:null,end:null,event:null,exponent:C,externalResourcesRequired:null,fill:null,fillOpacity:C,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:Ie,g2:Ie,glyphName:Ie,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:C,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:C,horizOriginX:C,horizOriginY:C,id:null,ideographic:C,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:C,k:C,k1:C,k2:C,k3:C,k4:C,kernelMatrix:re,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:C,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:C,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:C,overlineThickness:C,paintOrder:null,panose1:null,path:null,pathLength:C,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:Y,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:C,pointsAtY:C,pointsAtZ:C,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:re,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:re,rev:re,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:re,requiredFeatures:re,requiredFonts:re,requiredFormats:re,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:C,specularExponent:C,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:C,strikethroughThickness:C,string:null,stroke:null,strokeDashArray:re,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:C,strokeOpacity:C,strokeWidth:null,style:null,surfaceScale:C,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:re,tabIndex:C,tableValues:null,target:null,targetX:C,targetY:C,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:re,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:C,underlineThickness:C,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:C,values:null,vAlphabetic:C,vMathematical:C,vectorEffect:null,vHanging:C,vIdeographic:C,version:null,vertAdvY:C,vertOriginX:C,vertOriginY:C,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:C,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null}}),pa=/^data[-\w.:]+$/i,yn=/-[a-z]/g,da=/[A-Z]/g;function ha(e,t){let n=Et(t),r=t,l=ae;if(n in e.normal)return e.property[e.normal[n]];if(n.length>4&&n.slice(0,4)==="data"&&pa.test(t)){if(t.charAt(4)==="-"){let i=t.slice(5).replace(yn,ma);r="data"+i.charAt(0).toUpperCase()+i.slice(1)}else{let i=t.slice(4);if(!yn.test(i)){let o=i.replace(da,ga);o.charAt(0)!=="-"&&(o="-"+o),t="data"+o}}l=jt}return new l(r,t)}function ga(e){return"-"+e.toLowerCase()}function ma(e){return e.charAt(1).toUpperCase()}var bn={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},ya=rr([or,lr,sr,cr,ca],"html"),ba=rr([or,lr,sr,cr,fa],"svg");function ka(e){if(e.allowedElements&&e.disallowedElements)throw new TypeError("Only one of `allowedElements` and `disallowedElements` should be defined");if(e.allowedElements||e.disallowedElements||e.allowElement)return t=>{Mt(t,"element",(n,r,l)=>{let i=l,o;if(e.allowedElements?o=!e.allowedElements.includes(n.tagName):e.disallowedElements&&(o=e.disallowedElements.includes(n.tagName)),!o&&e.allowElement&&typeof r=="number"&&(o=!e.allowElement(n,r,i)),o&&typeof r=="number")return e.unwrapDisallowed&&n.children?i.children.splice(r,1,...n.children):i.children.splice(r,1),r})}}var gt=de(Tt(),1),xa=de(Nr(),1);function va(e){let t=e&&typeof e=="object"&&e.type==="text"?e.value||"":e;return typeof t=="string"&&t.replace(/[ \t\n\f\r]/g,"")===""}function wa(e){return e.join(" ").trim()}function Sa(e,t){let n=t||{};return(e[e.length-1]===""?[...e,""]:e).join((n.padRight?" ":"")+","+(n.padLeft===!1?"":" ")).trim()}var Ca=de($r(),1),Fa=Ca.default,At={}.hasOwnProperty,Ea=new Set(["table","thead","tbody","tfoot","tr"]);function fr(e,t){let n=[],r=-1,l;for(;++r<t.children.length;)l=t.children[r],l.type==="element"?n.push(Aa(e,l,r,t)):l.type==="text"?(t.type!=="element"||!Ea.has(t.tagName)||!va(l))&&n.push(l.value):l.type==="raw"&&!e.options.skipHtml&&n.push(l.value);return n}function Aa(e,t,n,r){let l=e.options,i=l.transformLinkUri===void 0?Yr:l.transformLinkUri,o=e.schema,a=t.tagName,s={},f=o,c;if(o.space==="html"&&a==="svg"&&(f=ba,e.schema=f),t.properties)for(c in t.properties)At.call(t.properties,c)&&Ta(s,c,t.properties[c],e);(a==="ol"||a==="ul")&&e.listDepth++;let u=fr(e,t);(a==="ol"||a==="ul")&&e.listDepth--,e.schema=o;let d=t.position||{start:{line:null,column:null,offset:null},end:{line:null,column:null,offset:null}},p=l.components&&At.call(l.components,a)?l.components[a]:a,y=typeof p=="string"||p===gt.default.Fragment;if(!xa.default.isValidElementType(p))throw new TypeError(`Component for name \`${a}\` not defined or is not renderable`);if(s.key=n,a==="a"&&l.linkTarget&&(s.target=typeof l.linkTarget=="function"?l.linkTarget(String(s.href||""),t.children,typeof s.title=="string"?s.title:null):l.linkTarget),a==="a"&&i&&(s.href=i(String(s.href||""),t.children,typeof s.title=="string"?s.title:null)),!y&&a==="code"&&r.type==="element"&&r.tagName!=="pre"&&(s.inline=!0),!y&&(a==="h1"||a==="h2"||a==="h3"||a==="h4"||a==="h5"||a==="h6")&&(s.level=Number.parseInt(a.charAt(1),10)),a==="img"&&l.transformImageUri&&(s.src=l.transformImageUri(String(s.src||""),String(s.alt||""),typeof s.title=="string"?s.title:null)),!y&&a==="li"&&r.type==="element"){let k=Da(t);s.checked=k&&k.properties?!!k.properties.checked:null,s.index=mt(r,t),s.ordered=r.tagName==="ol"}return!y&&(a==="ol"||a==="ul")&&(s.ordered=a==="ol",s.depth=e.listDepth),(a==="td"||a==="th")&&(s.align&&(s.style||(s.style={}),s.style.textAlign=s.align,delete s.align),y||(s.isHeader=a==="th")),!y&&a==="tr"&&r.type==="element"&&(s.isHeader=r.tagName==="thead"),l.sourcePos&&(s["data-sourcepos"]=La(d)),!y&&l.rawSourcePos&&(s.sourcePosition=t.position),!y&&l.includeElementIndex&&(s.index=mt(r,t),s.siblingCount=mt(r)),y||(s.node=t),u.length>0?gt.default.createElement(p,s,u):gt.default.createElement(p,s)}function Da(e){let t=-1;for(;++t<e.children.length;){let n=e.children[t];if(n.type==="element"&&n.tagName==="input")return n}return null}function mt(e,t){let n=-1,r=0;for(;++n<e.children.length&&e.children[n]!==t;)e.children[n].type==="element"&&r++;return r}function Ta(e,t,n,r){let l=ha(r.schema,t),i=n;i==null||i!==i||(Array.isArray(i)&&(i=l.commaSeparated?Sa(i):wa(i)),l.property==="style"&&typeof i=="string"&&(i=Oa(i)),l.space&&l.property?e[At.call(bn,l.property)?bn[l.property]:l.property]=i:l.attribute&&(e[l.attribute]=i))}function Oa(e){let t={};try{Fa(e,n)}catch{}return t;function n(r,l){let i=r.slice(0,4)==="-ms-"?`ms-${r.slice(4)}`:r;t[i.replace(/-([a-z])/g,Pa)]=l}}function Pa(e,t){return t.toUpperCase()}function La(e){return[e.start.line,":",e.start.column,"-",e.end.line,":",e.end.column].map(String).join("")}var kn={}.hasOwnProperty,za="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",$e={plugins:{to:"remarkPlugins",id:"change-plugins-to-remarkplugins"},renderers:{to:"components",id:"change-renderers-to-components"},astPlugins:{id:"remove-buggy-html-in-markdown-parser"},allowDangerousHtml:{id:"remove-buggy-html-in-markdown-parser"},escapeHtml:{id:"remove-buggy-html-in-markdown-parser"},source:{to:"children",id:"change-source-to-children"},allowNode:{to:"allowElement",id:"replace-allownode-allowedtypes-and-disallowedtypes"},allowedTypes:{to:"allowedElements",id:"replace-allownode-allowedtypes-and-disallowedtypes"},disallowedTypes:{to:"disallowedElements",id:"replace-allownode-allowedtypes-and-disallowedtypes"},includeNodeIndex:{to:"includeElementIndex",id:"change-includenodeindex-to-includeelementindex"}};function pr(e){for(let i in $e)if(kn.call($e,i)&&kn.call(e,i)){let o=$e[i];console.warn(`[react-markdown] Warning: please ${o.to?`use \`${o.to}\` instead of`:"remove"} \`${i}\` (see <${za}#${o.id}> for more info)`),delete $e[i]}let t=ci().use(go).use(e.remarkPlugins||[]).use(la,we(J({},e.remarkRehypeOptions),{allowDangerousHtml:!0})).use(e.rehypePlugins||[]).use(ka,e),n=new Pn;typeof e.children=="string"?n.value=e.children:e.children!==void 0&&e.children!==null&&console.warn(`[react-markdown] Warning: please pass a string as \`children\` (not: \`${e.children}\`)`);let r=t.runSync(t.parse(n),n);if(r.type!=="root")throw new TypeError("Expected a `root` node");let l=lt.default.createElement(lt.default.Fragment,{},fr({options:e,schema:ya,listDepth:0},r));return e.className&&(l=lt.default.createElement("div",{className:e.className},l)),l}pr.propTypes={children:j.default.string,className:j.default.string,allowElement:j.default.func,allowedElements:j.default.arrayOf(j.default.string),disallowedElements:j.default.arrayOf(j.default.string),unwrapDisallowed:j.default.bool,remarkPlugins:j.default.arrayOf(j.default.oneOfType([j.default.object,j.default.func,j.default.arrayOf(j.default.oneOfType([j.default.bool,j.default.string,j.default.object,j.default.func,j.default.arrayOf(j.default.any)]))])),rehypePlugins:j.default.arrayOf(j.default.oneOfType([j.default.object,j.default.func,j.default.arrayOf(j.default.oneOfType([j.default.bool,j.default.string,j.default.object,j.default.func,j.default.arrayOf(j.default.any)]))])),sourcePos:j.default.bool,rawSourcePos:j.default.bool,skipHtml:j.default.bool,includeElementIndex:j.default.bool,transformLinkUri:j.default.oneOfType([j.default.func,j.default.bool]),linkTarget:j.default.oneOfType([j.default.func,j.default.string]),transformImageUri:j.default.func,components:j.default.object};var Ia=`
  color-scheme: light;
  --color-prettylights-syntax-comment: #6e7781;
  --color-prettylights-syntax-constant: #0550ae;
  --color-prettylights-syntax-entity: #8250df;
  --color-prettylights-syntax-storage-modifier-import: #24292f;
  --color-prettylights-syntax-entity-tag: #116329;
  --color-prettylights-syntax-keyword: #cf222e;
  --color-prettylights-syntax-string: #0a3069;
  --color-prettylights-syntax-variable: #953800;
  --color-prettylights-syntax-brackethighlighter-unmatched: #82071e;
  --color-prettylights-syntax-invalid-illegal-text: #f6f8fa;
  --color-prettylights-syntax-invalid-illegal-bg: #82071e;
  --color-prettylights-syntax-carriage-return-text: #f6f8fa;
  --color-prettylights-syntax-carriage-return-bg: #cf222e;
  --color-prettylights-syntax-string-regexp: #116329;
  --color-prettylights-syntax-markup-list: #3b2300;
  --color-prettylights-syntax-markup-heading: #0550ae;
  --color-prettylights-syntax-markup-italic: #24292f;
  --color-prettylights-syntax-markup-bold: #24292f;
  --color-prettylights-syntax-markup-deleted-text: #82071e;
  --color-prettylights-syntax-markup-deleted-bg: #ffebe9;
  --color-prettylights-syntax-markup-inserted-text: #116329;
  --color-prettylights-syntax-markup-inserted-bg: #dafbe1;
  --color-prettylights-syntax-markup-changed-text: #953800;
  --color-prettylights-syntax-markup-changed-bg: #ffd8b5;
  --color-prettylights-syntax-markup-ignored-text: #eaeef2;
  --color-prettylights-syntax-markup-ignored-bg: #0550ae;
  --color-prettylights-syntax-meta-diff-range: #8250df;
  --color-prettylights-syntax-brackethighlighter-angle: #57606a;
  --color-prettylights-syntax-sublimelinter-gutter-mark: #8c959f;
  --color-prettylights-syntax-constant-other-reference-link: #0a3069;
  --color-fg-default: #24292f;
  --color-fg-muted: #57606a;
  --color-fg-subtle: #6e7781;
  --color-canvas-default: #ffffff;
  --color-canvas-subtle: #f6f8fa;
  --color-border-default: #d0d7de;
  --color-border-muted: hsla(210, 18%, 87%, 1);
  --color-neutral-muted: rgba(175, 184, 193, 0.2);
  --color-accent-fg: #0969da;
  --color-accent-emphasis: #0969da;
  --color-attention-subtle: #fff8c5;
  --color-danger-fg: #cf222e;
`,Ma=(0,Qr.default)(pr)`
  ${Ia}
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  margin: 0;
  color: var(--color-fg-default);
  background-color: var(--color-canvas-default);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji';
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;

  .octicon {
    display: inline-block;
    fill: currentColor;
    vertical-align: text-bottom;
  }
  h1:hover .anchor .octicon-link:before,
  h2:hover .anchor .octicon-link:before,
  h3:hover .anchor .octicon-link:before,
  h4:hover .anchor .octicon-link:before,
  h5:hover .anchor .octicon-link:before,
  h6:hover .anchor .octicon-link:before {
    width: 16px;
    height: 16px;
    content: ' ';
    display: inline-block;
    background-color: currentColor;
    -webkit-mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
    mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
  }

  details,
  figcaption,
  figure {
    display: block;
  }

  summary {
    display: list-item;
  }

  [hidden] {
    display: none !important;
  }

  a {
    background-color: transparent;
    color: var(--color-accent-fg);
    text-decoration: none;
  }

  abbr[title] {
    border-bottom: none;
    text-decoration: underline dotted;
  }

  b,
  strong {
    font-weight: var(--base-text-weight-semibold, 600);
  }

  dfn {
    font-style: italic;
  }

  h1 {
    margin: 0.67em 0;
    font-weight: var(--base-text-weight-semibold, 600);
    padding-bottom: 0.3em;
    font-size: 2em;
    border-bottom: 1px solid var(--color-border-muted);
  }

  mark {
    background-color: var(--color-attention-subtle);
    color: var(--color-fg-default);
  }

  small {
    font-size: 90%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  img {
    border-style: none;
    max-width: 100%;
    box-sizing: content-box;
    background-color: var(--color-canvas-default);
  }

  code,
  kbd,
  pre,
  samp {
    font-family: monospace;
    font-size: 1em;
  }

  figure {
    margin: 1em 40px;
  }

  hr {
    box-sizing: content-box;
    overflow: hidden;
    background: transparent;
    border-bottom: 1px solid var(--color-border-muted);
    height: 0.25em;
    padding: 0;
    margin: 24px 0;
    background-color: var(--color-border-default);
    border: 0;
  }

  input {
    font: inherit;
    margin: 0;
    overflow: visible;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button;
  }

  [type='checkbox'],
  [type='radio'] {
    box-sizing: border-box;
    padding: 0;
  }

  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }

  [type='search']::-webkit-search-cancel-button,
  [type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-input-placeholder {
    color: inherit;
    opacity: 0.54;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }

  a:hover {
    text-decoration: underline;
  }

  ::placeholder {
    color: var(--color-fg-subtle);
    opacity: 1;
  }

  hr::before {
    display: table;
    content: '';
  }

  hr::after {
    display: table;
    clear: both;
    content: '';
  }

  table {
    border-spacing: 0;
    border-collapse: collapse;
    display: block;
    width: max-content;
    max-width: 100%;
    overflow: auto;
  }

  td,
  th {
    padding: 0;
  }

  details summary {
    cursor: pointer;
  }

  details:not([open]) > *:not(summary) {
    display: none !important;
  }

  a:focus,
  [role='button']:focus,
  input[type='radio']:focus,
  input[type='checkbox']:focus {
    outline: 2px solid var(--color-accent-fg);
    outline-offset: -2px;
    box-shadow: none;
  }

  a:focus:not(:focus-visible),
  [role='button']:focus:not(:focus-visible),
  input[type='radio']:focus:not(:focus-visible),
  input[type='checkbox']:focus:not(:focus-visible) {
    outline: solid 1px transparent;
  }

  a:focus-visible,
  [role='button']:focus-visible,
  input[type='radio']:focus-visible,
  input[type='checkbox']:focus-visible {
    outline: 2px solid var(--color-accent-fg);
    outline-offset: -2px;
    box-shadow: none;
  }

  a:not([class]):focus,
  a:not([class]):focus-visible,
  input[type='radio']:focus,
  input[type='radio']:focus-visible,
  input[type='checkbox']:focus,
  input[type='checkbox']:focus-visible {
    outline-offset: 0;
  }

  kbd {
    display: inline-block;
    padding: 3px 5px;
    font: 11px ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
    line-height: 10px;
    color: var(--color-fg-default);
    vertical-align: middle;
    background-color: var(--color-canvas-subtle);
    border: solid 1px var(--color-neutral-muted);
    border-bottom-color: var(--color-neutral-muted);
    border-radius: 6px;
    box-shadow: inset 0 -1px 0 var(--color-neutral-muted);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: var(--base-text-weight-semibold, 600);
    line-height: 1.25;
  }

  h2 {
    font-weight: var(--base-text-weight-semibold, 600);
    padding-bottom: 0.3em;
    font-size: 1.5em;
    border-bottom: 1px solid var(--color-border-muted);
  }

  h3 {
    font-weight: var(--base-text-weight-semibold, 600);
    font-size: 1.25em;
  }

  h4 {
    font-weight: var(--base-text-weight-semibold, 600);
    font-size: 1em;
  }

  h5 {
    font-weight: var(--base-text-weight-semibold, 600);
    font-size: 0.875em;
  }

  h6 {
    font-weight: var(--base-text-weight-semibold, 600);
    font-size: 0.85em;
    color: var(--color-fg-muted);
  }

  p {
    margin-top: 0;
    margin-bottom: 10px;
  }

  blockquote {
    margin: 0;
    padding: 0 1em;
    color: var(--color-fg-muted);
    border-left: 0.25em solid var(--color-border-default);
  }

  ul,
  ol {
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 2em;
  }

  ol ol,
  ul ol {
    list-style-type: lower-roman;
  }

  ul ul ol,
  ul ol ol,
  ol ul ol,
  ol ol ol {
    list-style-type: lower-alpha;
  }

  dd {
    margin-left: 0;
  }

  tt,
  code,
  samp {
    font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
    font-size: 12px;
  }

  pre {
    margin-top: 0;
    margin-bottom: 0;
    font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
    font-size: 12px;
    word-wrap: normal;
  }

  .octicon {
    display: inline-block;
    overflow: visible !important;
    vertical-align: text-bottom;
    fill: currentColor;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
    appearance: none;
  }

  .markdown-body::before {
    display: table;
    content: '';
  }

  .markdown-body::after {
    display: table;
    clear: both;
    content: '';
  }

  .markdown-body > *:first-child {
    margin-top: 0 !important;
  }

  .markdown-body > *:last-child {
    margin-bottom: 0 !important;
  }

  a:not([href]) {
    color: inherit;
    text-decoration: none;
  }

  .absent {
    color: var(--color-danger-fg);
  }

  .anchor {
    float: left;
    padding-right: 4px;
    margin-left: -20px;
    line-height: 1;
  }

  .anchor:focus {
    outline: none;
  }

  p,
  blockquote,
  ul,
  ol,
  dl,
  table,
  pre,
  details {
    margin-top: 0;
    margin-bottom: 16px;
  }

  blockquote > :first-child {
    margin-top: 0;
  }

  blockquote > :last-child {
    margin-bottom: 0;
  }

  h1 .octicon-link,
  h2 .octicon-link,
  h3 .octicon-link,
  h4 .octicon-link,
  h5 .octicon-link,
  h6 .octicon-link {
    color: var(--color-fg-default);
    vertical-align: middle;
    visibility: hidden;
  }

  h1:hover .anchor,
  h2:hover .anchor,
  h3:hover .anchor,
  h4:hover .anchor,
  h5:hover .anchor,
  h6:hover .anchor {
    text-decoration: none;
  }

  h1:hover .anchor .octicon-link,
  h2:hover .anchor .octicon-link,
  h3:hover .anchor .octicon-link,
  h4:hover .anchor .octicon-link,
  h5:hover .anchor .octicon-link,
  h6:hover .anchor .octicon-link {
    visibility: visible;
  }

  h1 tt,
  h1 code,
  h2 tt,
  h2 code,
  h3 tt,
  h3 code,
  h4 tt,
  h4 code,
  h5 tt,
  h5 code,
  h6 tt,
  h6 code {
    padding: 0 0.2em;
    font-size: inherit;
  }

  summary h1,
  summary h2,
  summary h3,
  summary h4,
  summary h5,
  summary h6 {
    display: inline-block;
  }

  summary h1 .anchor,
  summary h2 .anchor,
  summary h3 .anchor,
  summary h4 .anchor,
  summary h5 .anchor,
  summary h6 .anchor {
    margin-left: -40px;
  }

  summary h1,
  summary h2 {
    padding-bottom: 0;
    border-bottom: 0;
  }

  ul.no-list,
  ol.no-list {
    padding: 0;
    list-style-type: none;
  }

  ol[type='a'] {
    list-style-type: lower-alpha;
  }

  ol[type='A'] {
    list-style-type: upper-alpha;
  }

  ol[type='i'] {
    list-style-type: lower-roman;
  }

  ol[type='I'] {
    list-style-type: upper-roman;
  }

  ol[type='1'] {
    list-style-type: decimal;
  }

  div > ol:not([type]) {
    list-style-type: decimal;
  }

  ul ul,
  ul ol,
  ol ol,
  ol ul {
    margin-top: 0;
    margin-bottom: 0;
  }

  li > p {
    margin-top: 16px;
  }

  li + li {
    margin-top: 0.25em;
  }

  dl {
    padding: 0;
  }

  dl dt {
    padding: 0;
    margin-top: 16px;
    font-size: 1em;
    font-style: italic;
    font-weight: var(--base-text-weight-semibold, 600);
  }

  dl dd {
    padding: 0 16px;
    margin-bottom: 16px;
  }

  table th {
    font-weight: var(--base-text-weight-semibold, 600);
  }

  table th,
  table td {
    padding: 6px 13px;
    border: 1px solid var(--color-border-default);
  }

  table tr {
    background-color: var(--color-canvas-default);
    border-top: 1px solid var(--color-border-muted);
  }

  table tr:nth-child(2n) {
    background-color: var(--color-canvas-subtle);
  }

  table img {
    background-color: transparent;
  }

  img[align='right'] {
    padding-left: 20px;
  }

  img[align='left'] {
    padding-right: 20px;
  }

  .emoji {
    max-width: none;
    vertical-align: text-top;
    background-color: transparent;
  }

  span.frame {
    display: block;
    overflow: hidden;
  }

  span.frame > span {
    display: block;
    float: left;
    width: auto;
    padding: 7px;
    margin: 13px 0 0;
    overflow: hidden;
    border: 1px solid var(--color-border-default);
  }

  span.frame span img {
    display: block;
    float: left;
  }

  span.frame span span {
    display: block;
    padding: 5px 0 0;
    clear: both;
    color: var(--color-fg-default);
  }

  span.align-center {
    display: block;
    overflow: hidden;
    clear: both;
  }

  span.align-center > span {
    display: block;
    margin: 13px auto 0;
    overflow: hidden;
    text-align: center;
  }

  span.align-center span img {
    margin: 0 auto;
    text-align: center;
  }

  span.align-right {
    display: block;
    overflow: hidden;
    clear: both;
  }

  span.align-right > span {
    display: block;
    margin: 13px 0 0;
    overflow: hidden;
    text-align: right;
  }

  span.align-right span img {
    margin: 0;
    text-align: right;
  }

  span.float-left {
    display: block;
    float: left;
    margin-right: 13px;
    overflow: hidden;
  }

  span.float-left span {
    margin: 13px 0 0;
  }

  span.float-right {
    display: block;
    float: right;
    margin-left: 13px;
    overflow: hidden;
  }

  span.float-right > span {
    display: block;
    margin: 13px auto 0;
    overflow: hidden;
    text-align: right;
  }

  code,
  tt {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    white-space: break-spaces;
    background-color: var(--color-neutral-muted);
    border-radius: 6px;
  }

  code br,
  tt br {
    display: none;
  }

  del code {
    text-decoration: inherit;
  }

  samp {
    font-size: 85%;
  }

  pre code {
    font-size: 100%;
  }

  pre > code {
    padding: 0;
    margin: 0;
    word-break: normal;
    white-space: pre;
    background: transparent;
    border: 0;
  }

  .highlight {
    margin-bottom: 16px;
  }

  .highlight pre {
    margin-bottom: 0;
    word-break: normal;
  }

  .highlight pre,
  pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: var(--color-canvas-subtle);
    border-radius: 6px;
  }

  pre code,
  pre tt {
    display: inline;
    max-width: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    line-height: inherit;
    word-wrap: normal;
    background-color: transparent;
    border: 0;
  }

  .csv-data td,
  .csv-data th {
    padding: 5px;
    overflow: hidden;
    font-size: 12px;
    line-height: 1;
    text-align: left;
    white-space: nowrap;
  }

  .csv-data .blob-num {
    padding: 10px 8px 9px;
    text-align: right;
    background: var(--color-canvas-default);
    border: 0;
  }

  .csv-data tr {
    border-top: 0;
  }

  .csv-data th {
    font-weight: var(--base-text-weight-semibold, 600);
    background: var(--color-canvas-subtle);
    border-top: 0;
  }

  [data-footnote-ref]::before {
    content: '[';
  }

  [data-footnote-ref]::after {
    content: ']';
  }

  .footnotes {
    font-size: 12px;
    color: var(--color-fg-muted);
    border-top: 1px solid var(--color-border-default);
  }

  .footnotes ol {
    padding-left: 16px;
  }

  .footnotes ol ul {
    display: inline-block;
    padding-left: 16px;
    margin-top: 16px;
  }

  .footnotes li {
    position: relative;
  }

  .footnotes li:target::before {
    position: absolute;
    top: -8px;
    right: -8px;
    bottom: -8px;
    left: -24px;
    pointer-events: none;
    content: '';
    border: 2px solid var(--color-accent-emphasis);
    border-radius: 6px;
  }

  .footnotes li:target {
    color: var(--color-fg-default);
  }

  .footnotes .data-footnote-backref g-emoji {
    font-family: monospace;
  }

  .pl-c {
    color: var(--color-prettylights-syntax-comment);
  }

  .pl-c1,
  .pl-s .pl-v {
    color: var(--color-prettylights-syntax-constant);
  }

  .pl-e,
  .pl-en {
    color: var(--color-prettylights-syntax-entity);
  }

  .pl-smi,
  .pl-s .pl-s1 {
    color: var(--color-prettylights-syntax-storage-modifier-import);
  }

  .pl-ent {
    color: var(--color-prettylights-syntax-entity-tag);
  }

  .pl-k {
    color: var(--color-prettylights-syntax-keyword);
  }

  .pl-s,
  .pl-pds,
  .pl-s .pl-pse .pl-s1,
  .pl-sr,
  .pl-sr .pl-cce,
  .pl-sr .pl-sre,
  .pl-sr .pl-sra {
    color: var(--color-prettylights-syntax-string);
  }

  .pl-v,
  .pl-smw {
    color: var(--color-prettylights-syntax-variable);
  }

  .pl-bu {
    color: var(--color-prettylights-syntax-brackethighlighter-unmatched);
  }

  .pl-ii {
    color: var(--color-prettylights-syntax-invalid-illegal-text);
    background-color: var(--color-prettylights-syntax-invalid-illegal-bg);
  }

  .pl-c2 {
    color: var(--color-prettylights-syntax-carriage-return-text);
    background-color: var(--color-prettylights-syntax-carriage-return-bg);
  }

  .pl-sr .pl-cce {
    font-weight: bold;
    color: var(--color-prettylights-syntax-string-regexp);
  }

  .pl-ml {
    color: var(--color-prettylights-syntax-markup-list);
  }

  .pl-mh,
  .pl-mh .pl-en,
  .pl-ms {
    font-weight: bold;
    color: var(--color-prettylights-syntax-markup-heading);
  }

  .pl-mi {
    font-style: italic;
    color: var(--color-prettylights-syntax-markup-italic);
  }

  .pl-mb {
    font-weight: bold;
    color: var(--color-prettylights-syntax-markup-bold);
  }

  .pl-md {
    color: var(--color-prettylights-syntax-markup-deleted-text);
    background-color: var(--color-prettylights-syntax-markup-deleted-bg);
  }

  .pl-mi1 {
    color: var(--color-prettylights-syntax-markup-inserted-text);
    background-color: var(--color-prettylights-syntax-markup-inserted-bg);
  }

  .pl-mc {
    color: var(--color-prettylights-syntax-markup-changed-text);
    background-color: var(--color-prettylights-syntax-markup-changed-bg);
  }

  .pl-mi2 {
    color: var(--color-prettylights-syntax-markup-ignored-text);
    background-color: var(--color-prettylights-syntax-markup-ignored-bg);
  }

  .pl-mdr {
    font-weight: bold;
    color: var(--color-prettylights-syntax-meta-diff-range);
  }

  .pl-ba {
    color: var(--color-prettylights-syntax-brackethighlighter-angle);
  }

  .pl-sg {
    color: var(--color-prettylights-syntax-sublimelinter-gutter-mark);
  }

  .pl-corl {
    text-decoration: underline;
    color: var(--color-prettylights-syntax-constant-other-reference-link);
  }

  g-emoji {
    display: inline-block;
    min-width: 1ch;
    font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 1em;
    font-style: normal !important;
    font-weight: var(--base-text-weight-normal, 400);
    line-height: 1;
    vertical-align: -0.075em;
  }

  g-emoji img {
    width: 1em;
    height: 1em;
  }

  .task-list-item {
    list-style-type: none;
  }

  .task-list-item label {
    font-weight: var(--base-text-weight-normal, 400);
  }

  .task-list-item.enabled label {
    cursor: pointer;
  }

  .task-list-item + .task-list-item {
    margin-top: 4px;
  }

  .task-list-item .handle {
    display: none;
  }

  .task-list-item-checkbox {
    margin: 0 0.2em 0.25em -1.4em;
    vertical-align: middle;
  }

  .contains-task-list:dir(rtl) .task-list-item-checkbox {
    margin: 0 -1.6em 0.25em 0.2em;
  }

  .contains-task-list {
    position: relative;
  }

  .contains-task-list:hover .task-list-item-convert-container,
  .contains-task-list:focus-within .task-list-item-convert-container {
    display: block;
    width: auto;
    height: 24px;
    overflow: visible;
    clip: auto;
  }

  ::-webkit-calendar-picker-indicator {
    filter: invert(50%);
  }
`,Ra={tokenize:Ua,partial:!0},dr={tokenize:Va,partial:!0},hr={tokenize:qa,partial:!0},gr={tokenize:Wa,partial:!0},ja={tokenize:$a,partial:!0},mr={tokenize:Na,previous:br},yr={tokenize:Ha,previous:kr},ke={tokenize:_a,previous:xr},he={},Ba={text:he},Fe=48;for(;Fe<123;)he[Fe]=ke,Fe++,Fe===58?Fe=65:Fe===91&&(Fe=97);he[43]=ke;he[45]=ke;he[46]=ke;he[95]=ke;he[72]=[ke,yr];he[104]=[ke,yr];he[87]=[ke,mr];he[119]=[ke,mr];function _a(e,t,n){let r=this,l,i;return o;function o(u){return!Dt(u)||!xr.call(r,r.previous)||Bt(r.events)?n(u):(e.enter("literalAutolink"),e.enter("literalAutolinkEmail"),a(u))}function a(u){return Dt(u)?(e.consume(u),a):u===64?(e.consume(u),s):n(u)}function s(u){return u===46?e.check(ja,c,f)(u):u===45||u===95||G(u)?(i=!0,e.consume(u),s):c(u)}function f(u){return e.consume(u),l=!0,s}function c(u){return i&&l&&ee(r.previous)?(e.exit("literalAutolinkEmail"),e.exit("literalAutolink"),t(u)):n(u)}}function Na(e,t,n){let r=this;return l;function l(o){return o!==87&&o!==119||!br.call(r,r.previous)||Bt(r.events)?n(o):(e.enter("literalAutolink"),e.enter("literalAutolinkWww"),e.check(Ra,e.attempt(dr,e.attempt(hr,i),n),n)(o))}function i(o){return e.exit("literalAutolinkWww"),e.exit("literalAutolink"),t(o)}}function Ha(e,t,n){let r=this,l="",i=!1;return o;function o(u){return(u===72||u===104)&&kr.call(r,r.previous)&&!Bt(r.events)?(e.enter("literalAutolink"),e.enter("literalAutolinkHttp"),l+=String.fromCodePoint(u),e.consume(u),a):n(u)}function a(u){if(ee(u)&&l.length<5)return l+=String.fromCodePoint(u),e.consume(u),a;if(u===58){let d=l.toLowerCase();if(d==="http"||d==="https")return e.consume(u),s}return n(u)}function s(u){return u===47?(e.consume(u),i?f:(i=!0,s)):n(u)}function f(u){return u===null||Xe(u)||W(u)||Ee(u)||Ge(u)?n(u):e.attempt(dr,e.attempt(hr,c),n)(u)}function c(u){return e.exit("literalAutolinkHttp"),e.exit("literalAutolink"),t(u)}}function Ua(e,t,n){let r=0;return l;function l(o){return(o===87||o===119)&&r<3?(r++,e.consume(o),l):o===46&&r===3?(e.consume(o),i):n(o)}function i(o){return o===null?n(o):t(o)}}function Va(e,t,n){let r,l,i;return o;function o(f){return f===46||f===95?e.check(gr,s,a)(f):f===null||W(f)||Ee(f)||f!==45&&Ge(f)?s(f):(i=!0,e.consume(f),o)}function a(f){return f===95?r=!0:(l=r,r=void 0),e.consume(f),o}function s(f){return l||r||!i?n(f):t(f)}}function qa(e,t){let n=0,r=0;return l;function l(o){return o===40?(n++,e.consume(o),l):o===41&&r<n?i(o):o===33||o===34||o===38||o===39||o===41||o===42||o===44||o===46||o===58||o===59||o===60||o===63||o===93||o===95||o===126?e.check(gr,t,i)(o):o===null||W(o)||Ee(o)?t(o):(e.consume(o),l)}function i(o){return o===41&&r++,e.consume(o),l}}function Wa(e,t,n){return r;function r(a){return a===33||a===34||a===39||a===41||a===42||a===44||a===46||a===58||a===59||a===63||a===95||a===126?(e.consume(a),r):a===38?(e.consume(a),i):a===93?(e.consume(a),l):a===60||a===null||W(a)||Ee(a)?t(a):n(a)}function l(a){return a===null||a===40||a===91||W(a)||Ee(a)?t(a):r(a)}function i(a){return ee(a)?o(a):n(a)}function o(a){return a===59?(e.consume(a),r):ee(a)?(e.consume(a),o):n(a)}}function $a(e,t,n){return r;function r(i){return e.consume(i),l}function l(i){return G(i)?n(i):t(i)}}function br(e){return e===null||e===40||e===42||e===95||e===91||e===93||e===126||W(e)}function kr(e){return!ee(e)}function xr(e){return!(e===47||Dt(e))}function Dt(e){return e===43||e===45||e===46||e===95||G(e)}function Bt(e){let t=e.length,n=!1;for(;t--;){let r=e[t][1];if((r.type==="labelLink"||r.type==="labelImage")&&!r._balanced){n=!0;break}if(r._gfmAutolinkLiteralWalkedInto){n=!1;break}}return e.length>0&&!n&&(e[e.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),n}var Qa={tokenize:tu,partial:!0};function Ya(){return{document:{[91]:{tokenize:Za,continuation:{tokenize:Ga},exit:eu}},text:{[91]:{tokenize:Ja},[93]:{add:"after",tokenize:Xa,resolveTo:Ka}}}}function Xa(e,t,n){let r=this,l=r.events.length,i=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]),o;for(;l--;){let s=r.events[l][1];if(s.type==="labelImage"){o=s;break}if(s.type==="gfmFootnoteCall"||s.type==="labelLink"||s.type==="label"||s.type==="image"||s.type==="link")break}return a;function a(s){if(!o||!o._balanced)return n(s);let f=ce(r.sliceSerialize({start:o.end,end:r.now()}));return f.codePointAt(0)!==94||!i.includes(f.slice(1))?n(s):(e.enter("gfmFootnoteCallLabelMarker"),e.consume(s),e.exit("gfmFootnoteCallLabelMarker"),t(s))}}function Ka(e,t){let n=e.length;for(;n--;)if(e[n][1].type==="labelImage"&&e[n][0]==="enter"){e[n][1];break}e[n+1][1].type="data",e[n+3][1].type="gfmFootnoteCallLabelMarker";let r={type:"gfmFootnoteCall",start:Object.assign({},e[n+3][1].start),end:Object.assign({},e[e.length-1][1].end)},l={type:"gfmFootnoteCallMarker",start:Object.assign({},e[n+3][1].end),end:Object.assign({},e[n+3][1].end)};l.end.column++,l.end.offset++,l.end._bufferIndex++;let i={type:"gfmFootnoteCallString",start:Object.assign({},l.end),end:Object.assign({},e[e.length-1][1].start)},o={type:"chunkString",contentType:"string",start:Object.assign({},i.start),end:Object.assign({},i.end)},a=[e[n+1],e[n+2],["enter",r,t],e[n+3],e[n+4],["enter",l,t],["exit",l,t],["enter",i,t],["enter",o,t],["exit",o,t],["exit",i,t],e[e.length-2],e[e.length-1],["exit",r,t]];return e.splice(n,e.length-n+1,...a),e}function Ja(e,t,n){let r=this,l=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]),i=0,o;return a;function a(u){return e.enter("gfmFootnoteCall"),e.enter("gfmFootnoteCallLabelMarker"),e.consume(u),e.exit("gfmFootnoteCallLabelMarker"),s}function s(u){return u!==94?n(u):(e.enter("gfmFootnoteCallMarker"),e.consume(u),e.exit("gfmFootnoteCallMarker"),e.enter("gfmFootnoteCallString"),e.enter("chunkString").contentType="string",f)}function f(u){if(i>999||u===93&&!o||u===null||u===91||W(u))return n(u);if(u===93){e.exit("chunkString");let d=e.exit("gfmFootnoteCallString");return l.includes(ce(r.sliceSerialize(d)))?(e.enter("gfmFootnoteCallLabelMarker"),e.consume(u),e.exit("gfmFootnoteCallLabelMarker"),e.exit("gfmFootnoteCall"),t):n(u)}return W(u)||(o=!0),i++,e.consume(u),u===92?c:f}function c(u){return u===91||u===92||u===93?(e.consume(u),i++,f):f(u)}}function Za(e,t,n){let r=this,l=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]),i,o=0,a;return s;function s(y){return e.enter("gfmFootnoteDefinition")._container=!0,e.enter("gfmFootnoteDefinitionLabel"),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(y),e.exit("gfmFootnoteDefinitionLabelMarker"),f}function f(y){return y===94?(e.enter("gfmFootnoteDefinitionMarker"),e.consume(y),e.exit("gfmFootnoteDefinitionMarker"),e.enter("gfmFootnoteDefinitionLabelString"),e.enter("chunkString").contentType="string",c):n(y)}function c(y){if(o>999||y===93&&!a||y===null||y===91||W(y))return n(y);if(y===93){e.exit("chunkString");let k=e.exit("gfmFootnoteDefinitionLabelString");return i=ce(r.sliceSerialize(k)),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(y),e.exit("gfmFootnoteDefinitionLabelMarker"),e.exit("gfmFootnoteDefinitionLabel"),d}return W(y)||(a=!0),o++,e.consume(y),y===92?u:c}function u(y){return y===91||y===92||y===93?(e.consume(y),o++,c):c(y)}function d(y){return y===58?(e.enter("definitionMarker"),e.consume(y),e.exit("definitionMarker"),l.includes(i)||l.push(i),H(e,p,"gfmFootnoteDefinitionWhitespace")):n(y)}function p(y){return t(y)}}function Ga(e,t,n){return e.check(Ve,t,e.attempt(Qa,t,n))}function eu(e){e.exit("gfmFootnoteDefinition")}function tu(e,t,n){let r=this;return H(e,l,"gfmFootnoteDefinitionIndent",4+1);function l(i){let o=r.events[r.events.length-1];return o&&o[1].type==="gfmFootnoteDefinitionIndent"&&o[2].sliceSerialize(o[1],!0).length===4?t(i):n(i)}}function nu(e){let t=(e||{}).singleTilde,n={tokenize:l,resolveAll:r};return t==null&&(t=!0),{text:{[126]:n},insideSpan:{null:[n]},attentionMarkers:{null:[126]}};function r(i,o){let a=-1;for(;++a<i.length;)if(i[a][0]==="enter"&&i[a][1].type==="strikethroughSequenceTemporary"&&i[a][1]._close){let s=a;for(;s--;)if(i[s][0]==="exit"&&i[s][1].type==="strikethroughSequenceTemporary"&&i[s][1]._open&&i[a][1].end.offset-i[a][1].start.offset===i[s][1].end.offset-i[s][1].start.offset){i[a][1].type="strikethroughSequence",i[s][1].type="strikethroughSequence";let f={type:"strikethrough",start:Object.assign({},i[s][1].start),end:Object.assign({},i[a][1].end)},c={type:"strikethroughText",start:Object.assign({},i[s][1].end),end:Object.assign({},i[a][1].start)},u=[["enter",f,o],["enter",i[s][1],o],["exit",i[s][1],o],["enter",c,o]],d=o.parser.constructs.insideSpan.null;d&&ie(u,u.length,0,et(d,i.slice(s+1,a),o)),ie(u,u.length,0,[["exit",c,o],["enter",i[a][1],o],["exit",i[a][1],o],["exit",f,o]]),ie(i,s-1,a-s+3,u),a=s+u.length-2;break}}for(a=-1;++a<i.length;)i[a][1].type==="strikethroughSequenceTemporary"&&(i[a][1].type="data");return i}function l(i,o,a){let s=this.previous,f=this.events,c=0;return u;function u(p){return s===126&&f[f.length-1][1].type!=="characterEscape"?a(p):(i.enter("strikethroughSequenceTemporary"),d(p))}function d(p){let y=Ke(s);if(p===126)return c>1?a(p):(i.consume(p),c++,d);if(c<2&&!t)return a(p);let k=i.exit("strikethroughSequenceTemporary"),w=Ke(p);return k._open=!w||w===2&&!!y,k._close=!y||y===2&&!!w,o(p)}}}var ru=class{constructor(){this.map=[]}add(e,t,n){iu(this,e,t,n)}consume(e){if(this.map.sort((l,i)=>l[0]-i[0]),this.map.length===0)return;let t=this.map.length,n=[];for(;t>0;)t-=1,n.push(e.slice(this.map[t][0]+this.map[t][1])),n.push(this.map[t][2]),e.length=this.map[t][0];n.push([...e]),e.length=0;let r=n.pop();for(;r;)e.push(...r),r=n.pop();this.map.length=0}};function iu(e,t,n,r){let l=0;if(!(n===0&&r.length===0)){for(;l<e.map.length;){if(e.map[l][0]===t){e.map[l][1]+=n,e.map[l][2].push(...r);return}l+=1}e.map.push([t,n,r])}}function lu(e,t){let n=!1,r=[];for(;t<e.length;){let l=e[t];if(n){if(l[0]==="enter")l[1].type==="tableContent"&&r.push(e[t+1][1].type==="tableDelimiterMarker"?"left":"none");else if(l[1].type==="tableContent"){if(e[t-1][1].type==="tableDelimiterMarker"){let i=r.length-1;r[i]=r[i]==="left"?"center":"right"}}else if(l[1].type==="tableDelimiterRow")break}else l[0]==="enter"&&l[1].type==="tableDelimiterRow"&&(n=!0);t+=1}return r}var ou={flow:{null:{tokenize:au,resolveAll:uu}}};function au(e,t,n){let r=this,l=0,i=0,o;return a;function a(x){let D=r.events.length-1;for(;D>-1;){let $=r.events[D][1].type;if($==="lineEnding"||$==="linePrefix")D--;else break}let O=D>-1?r.events[D][1].type:null,U=O==="tableHead"||O==="tableRow"?b:s;return U===b&&r.parser.lazy[r.now().line]?n(x):U(x)}function s(x){return e.enter("tableHead"),e.enter("tableRow"),f(x)}function f(x){return x===124||(o=!0,i+=1),c(x)}function c(x){return x===null?n(x):I(x)?i>1?(i=0,r.interrupt=!0,e.exit("tableRow"),e.enter("lineEnding"),e.consume(x),e.exit("lineEnding"),p):n(x):N(x)?H(e,c,"whitespace")(x):(i+=1,o&&(o=!1,l+=1),x===124?(e.enter("tableCellDivider"),e.consume(x),e.exit("tableCellDivider"),o=!0,c):(e.enter("data"),u(x)))}function u(x){return x===null||x===124||W(x)?(e.exit("data"),c(x)):(e.consume(x),x===92?d:u)}function d(x){return x===92||x===124?(e.consume(x),u):u(x)}function p(x){return r.interrupt=!1,r.parser.lazy[r.now().line]?n(x):(e.enter("tableDelimiterRow"),o=!1,N(x)?H(e,y,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(x):y(x))}function y(x){return x===45||x===58?w(x):x===124?(o=!0,e.enter("tableCellDivider"),e.consume(x),e.exit("tableCellDivider"),k):L(x)}function k(x){return N(x)?H(e,w,"whitespace")(x):w(x)}function w(x){return x===58?(i+=1,o=!0,e.enter("tableDelimiterMarker"),e.consume(x),e.exit("tableDelimiterMarker"),m):x===45?(i+=1,m(x)):x===null||I(x)?T(x):L(x)}function m(x){return x===45?(e.enter("tableDelimiterFiller"),F(x)):L(x)}function F(x){return x===45?(e.consume(x),F):x===58?(o=!0,e.exit("tableDelimiterFiller"),e.enter("tableDelimiterMarker"),e.consume(x),e.exit("tableDelimiterMarker"),S):(e.exit("tableDelimiterFiller"),S(x))}function S(x){return N(x)?H(e,T,"whitespace")(x):T(x)}function T(x){return x===124?y(x):x===null||I(x)?!o||l!==i?L(x):(e.exit("tableDelimiterRow"),e.exit("tableHead"),t(x)):L(x)}function L(x){return n(x)}function b(x){return e.enter("tableRow"),A(x)}function A(x){return x===124?(e.enter("tableCellDivider"),e.consume(x),e.exit("tableCellDivider"),A):x===null||I(x)?(e.exit("tableRow"),t(x)):N(x)?H(e,A,"whitespace")(x):(e.enter("data"),R(x))}function R(x){return x===null||x===124||W(x)?(e.exit("data"),A(x)):(e.consume(x),x===92?_:R)}function _(x){return x===92||x===124?(e.consume(x),R):R(x)}}function uu(e,t){let n=-1,r=!0,l=0,i=[0,0,0,0],o=[0,0,0,0],a=!1,s=0,f,c,u,d=new ru;for(;++n<e.length;){let p=e[n],y=p[1];p[0]==="enter"?y.type==="tableHead"?(a=!1,s!==0&&(xn(d,t,s,f,c),c=void 0,s=0),f={type:"table",start:Object.assign({},y.start),end:Object.assign({},y.end)},d.add(n,0,[["enter",f,t]])):y.type==="tableRow"||y.type==="tableDelimiterRow"?(r=!0,u=void 0,i=[0,0,0,0],o=[0,n+1,0,0],a&&(a=!1,c={type:"tableBody",start:Object.assign({},y.start),end:Object.assign({},y.end)},d.add(n,0,[["enter",c,t]])),l=y.type==="tableDelimiterRow"?2:c?3:1):l&&(y.type==="data"||y.type==="tableDelimiterMarker"||y.type==="tableDelimiterFiller")?(r=!1,o[2]===0&&(i[1]!==0&&(o[0]=o[1],u=Qe(d,t,i,l,void 0,u),i=[0,0,0,0]),o[2]=n)):y.type==="tableCellDivider"&&(r?r=!1:(i[1]!==0&&(o[0]=o[1],u=Qe(d,t,i,l,void 0,u)),i=o,o=[i[1],n,0,0])):y.type==="tableHead"?(a=!0,s=n):y.type==="tableRow"||y.type==="tableDelimiterRow"?(s=n,i[1]!==0?(o[0]=o[1],u=Qe(d,t,i,l,n,u)):o[1]!==0&&(u=Qe(d,t,o,l,n,u)),l=0):l&&(y.type==="data"||y.type==="tableDelimiterMarker"||y.type==="tableDelimiterFiller")&&(o[3]=n)}for(s!==0&&xn(d,t,s,f,c),d.consume(t.events),n=-1;++n<t.events.length;){let p=t.events[n];p[0]==="enter"&&p[1].type==="table"&&(p[1]._align=lu(t.events,n))}return e}function Qe(e,t,n,r,l,i){let o=r===1?"tableHeader":r===2?"tableDelimiter":"tableData",a="tableContent";n[0]!==0&&(i.end=Object.assign({},ze(t.events,n[0])),e.add(n[0],0,[["exit",i,t]]));let s=ze(t.events,n[1]);if(i={type:o,start:Object.assign({},s),end:Object.assign({},s)},e.add(n[1],0,[["enter",i,t]]),n[2]!==0){let f=ze(t.events,n[2]),c=ze(t.events,n[3]),u={type:a,start:Object.assign({},f),end:Object.assign({},c)};if(e.add(n[2],0,[["enter",u,t]]),r!==2){let d=t.events[n[2]],p=t.events[n[3]];if(d[1].end=Object.assign({},p[1].end),d[1].type="chunkText",d[1].contentType="text",n[3]>n[2]+1){let y=n[2]+1,k=n[3]-n[2]-1;e.add(y,k,[])}}e.add(n[3]+1,0,[["exit",u,t]])}return l!==void 0&&(i.end=Object.assign({},ze(t.events,l)),e.add(l,0,[["exit",i,t]]),i=void 0),i}function xn(e,t,n,r,l){let i=[],o=ze(t.events,n);l&&(l.end=Object.assign({},o),i.push(["exit",l,t])),r.end=Object.assign({},o),i.push(["exit",r,t]),e.add(n+1,0,i)}function ze(e,t){let n=e[t],r=n[0]==="enter"?"start":"end";return n[1][r]}var su={tokenize:fu},cu={text:{[91]:su}};function fu(e,t,n){let r=this;return l;function l(s){return r.previous!==null||!r._gfmTasklistFirstContentOfListItem?n(s):(e.enter("taskListCheck"),e.enter("taskListCheckMarker"),e.consume(s),e.exit("taskListCheckMarker"),i)}function i(s){return W(s)?(e.enter("taskListCheckValueUnchecked"),e.consume(s),e.exit("taskListCheckValueUnchecked"),o):s===88||s===120?(e.enter("taskListCheckValueChecked"),e.consume(s),e.exit("taskListCheckValueChecked"),o):n(s)}function o(s){return s===93?(e.enter("taskListCheckMarker"),e.consume(s),e.exit("taskListCheckMarker"),e.exit("taskListCheck"),a):n(s)}function a(s){return I(s)?t(s):N(s)?e.check({tokenize:pu},t,n)(s):n(s)}}function pu(e,t,n){return H(e,r,"whitespace");function r(l){return l===null?n(l):t(l)}}function du(e){return Mn([Ba,Ya(),nu(e),ou,cu])}function vn(e,t){let n=String(e);if(typeof t!="string")throw new TypeError("Expected character");let r=0,l=n.indexOf(t);for(;l!==-1;)r++,l=n.indexOf(t,l+t.length);return r}function hu(e){if(typeof e!="string")throw new TypeError("Expected a string");return e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}var gu={}.hasOwnProperty,mu=function(e,t,n,r){let l,i;typeof t=="string"||t instanceof RegExp?(i=[[t,n]],l=r):(i=t,l=n),l||(l={});let o=It(l.ignore||[]),a=yu(i),s=-1;for(;++s<a.length;)er(e,"text",f);return e;function f(u,d){let p=-1,y;for(;++p<d.length;){let k=d[p];if(o(k,y?y.children.indexOf(k):void 0,y))return;y=k}if(y)return c(u,d)}function c(u,d){let p=d[d.length-1],y=a[s][0],k=a[s][1],w=0,m=p.children.indexOf(u),F=!1,S=[];y.lastIndex=0;let T=y.exec(u.value);for(;T;){let L=T.index,b={index:T.index,input:T.input,stack:[...d,u]},A=k(...T,b);if(typeof A=="string"&&(A=A.length>0?{type:"text",value:A}:void 0),A!==!1&&(w!==L&&S.push({type:"text",value:u.value.slice(w,L)}),Array.isArray(A)?S.push(...A):A&&S.push(A),w=L+T[0].length,F=!0),!y.global)break;T=y.exec(u.value)}return F?(w<u.value.length&&S.push({type:"text",value:u.value.slice(w)}),p.children.splice(m,1,...S)):S=[u],m+S.length}};function yu(e){let t=[];if(typeof e!="object")throw new TypeError("Expected array or object as schema");if(Array.isArray(e)){let n=-1;for(;++n<e.length;)t.push([wn(e[n][0]),Sn(e[n][1])])}else{let n;for(n in e)gu.call(e,n)&&t.push([wn(n),Sn(e[n])])}return t}function wn(e){return typeof e=="string"?new RegExp(hu(e),"g"):e}function Sn(e){return typeof e=="function"?e:()=>e}var yt="phrasing",bt=["autolink","link","image","label"],bu={transforms:[Fu],enter:{literalAutolink:xu,literalAutolinkEmail:kt,literalAutolinkHttp:kt,literalAutolinkWww:kt},exit:{literalAutolink:Cu,literalAutolinkEmail:Su,literalAutolinkHttp:vu,literalAutolinkWww:wu}},ku={unsafe:[{character:"@",before:"[+\\-.\\w]",after:"[\\-.\\w]",inConstruct:yt,notInConstruct:bt},{character:".",before:"[Ww]",after:"[\\-.\\w]",inConstruct:yt,notInConstruct:bt},{character:":",before:"[ps]",after:"\\/",inConstruct:yt,notInConstruct:bt}]};function xu(e){this.enter({type:"link",title:null,url:"",children:[]},e)}function kt(e){this.config.enter.autolinkProtocol.call(this,e)}function vu(e){this.config.exit.autolinkProtocol.call(this,e)}function wu(e){this.config.exit.data.call(this,e);let t=this.stack[this.stack.length-1];t.url="http://"+this.sliceSerialize(e)}function Su(e){this.config.exit.autolinkEmail.call(this,e)}function Cu(e){this.exit(e)}function Fu(e){mu(e,[[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,Eu],[/([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/g,Au]],{ignore:["link","linkReference"]})}function Eu(e,t,n,r,l){let i="";if(!vr(l)||(/^w/i.test(t)&&(n=t+n,t="",i="http://"),!Du(n)))return!1;let o=Tu(n+r);if(!o[0])return!1;let a={type:"link",title:null,url:i+t+o[0],children:[{type:"text",value:t+o[0]}]};return o[1]?[a,{type:"text",value:o[1]}]:a}function Au(e,t,n,r){return!vr(r,!0)||/[-\d_]$/.test(n)?!1:{type:"link",title:null,url:"mailto:"+t+"@"+n,children:[{type:"text",value:t+"@"+n}]}}function Du(e){let t=e.split(".");return!(t.length<2||t[t.length-1]&&(/_/.test(t[t.length-1])||!/[a-zA-Z\d]/.test(t[t.length-1]))||t[t.length-2]&&(/_/.test(t[t.length-2])||!/[a-zA-Z\d]/.test(t[t.length-2])))}function Tu(e){let t=/[!"&'),.:;<>?\]}]+$/.exec(e);if(!t)return[e,void 0];e=e.slice(0,t.index);let n=t[0],r=n.indexOf(")"),l=vn(e,"("),i=vn(e,")");for(;r!==-1&&l>i;)e+=n.slice(0,r+1),n=n.slice(r+1),r=n.indexOf(")"),i++;return[e,n]}function vr(e,t){let n=e.input.charCodeAt(e.index-1);return(e.index===0||Ee(n)||Ge(n))&&(!t||n!==47)}function wr(e){return e.label||!e.identifier?e.label||"":Qn(e.identifier)}function Ou(e,t,n){let r=t.indexStack,l=e.children||[],i=t.createTracker(n),o=[],a=-1;for(r.push(-1);++a<l.length;){let s=l[a];r[r.length-1]=a,o.push(i.move(t.handle(s,e,t,J({before:`
`,after:`
`},i.current())))),s.type!=="list"&&(t.bulletLastUsed=void 0),a<l.length-1&&o.push(i.move(Pu(s,l[a+1],e,t)))}return r.pop(),o.join("")}function Pu(e,t,n,r){let l=r.join.length;for(;l--;){let i=r.join[l](e,t,n,r);if(i===!0||i===1)break;if(typeof i=="number")return`
`.repeat(1+i);if(i===!1)return`

<!---->

`}return`

`}var Lu=/\r?\n|\r/g;function zu(e,t){let n=[],r=0,l=0,i;for(;i=Lu.exec(e);)o(e.slice(r,i.index)),n.push(i[0]),r=i.index+i[0].length,l++;return o(e.slice(r)),n.join("");function o(a){n.push(t(a,l,!a))}}function Sr(e){if(!e._compiled){let t=(e.atBreak?"[\\r\\n][\\t ]*":"")+(e.before?"(?:"+e.before+")":"");e._compiled=new RegExp((t?"("+t+")":"")+(/[|\\{}()[\]^$+*?.-]/.test(e.character)?"\\":"")+e.character+(e.after?"(?:"+e.after+")":""),"g")}return e._compiled}function Iu(e,t){return Cn(e,t.inConstruct,!0)&&!Cn(e,t.notInConstruct,!1)}function Cn(e,t,n){if(typeof t=="string"&&(t=[t]),!t||t.length===0)return n;let r=-1;for(;++r<t.length;)if(e.includes(t[r]))return!0;return!1}function Cr(e,t,n){let r=(n.before||"")+(t||"")+(n.after||""),l=[],i=[],o={},a=-1;for(;++a<e.unsafe.length;){let c=e.unsafe[a];if(!Iu(e.stack,c))continue;let u=Sr(c),d;for(;d=u.exec(r);){let p="before"in c||!!c.atBreak,y="after"in c,k=d.index+(p?d[1].length:0);l.includes(k)?(o[k].before&&!p&&(o[k].before=!1),o[k].after&&!y&&(o[k].after=!1)):(l.push(k),o[k]={before:p,after:y})}}l.sort(Mu);let s=n.before?n.before.length:0,f=r.length-(n.after?n.after.length:0);for(a=-1;++a<l.length;){let c=l[a];c<s||c>=f||c+1<f&&l[a+1]===c+1&&o[c].after&&!o[c+1].before&&!o[c+1].after||l[a-1]===c-1&&o[c].before&&!o[c-1].before&&!o[c-1].after||(s!==c&&i.push(Fn(r.slice(s,c),"\\")),s=c,/[!-/:-@[-`{-~]/.test(r.charAt(c))&&(!n.encode||!n.encode.includes(r.charAt(c)))?i.push("\\"):(i.push("&#x"+r.charCodeAt(c).toString(16).toUpperCase()+";"),s++))}return i.push(Fn(r.slice(s,f),n.after)),i.join("")}function Mu(e,t){return e-t}function Fn(e,t){let n=/\\(?=[!-/:-@[-`{-~])/g,r=[],l=[],i=e+t,o=-1,a=0,s;for(;s=n.exec(i);)r.push(s.index);for(;++o<r.length;)a!==r[o]&&l.push(e.slice(a,r[o])),l.push("\\"),a=r[o];return l.push(e.slice(a)),l.join("")}function nt(e){let t=e||{},n=t.now||{},r=t.lineShift||0,l=n.line||1,i=n.column||1;return{move:s,current:o,shift:a};function o(){return{now:{line:l,column:i},lineShift:r}}function a(f){r+=f}function s(f){let c=f||"",u=c.split(/\r?\n|\r/g),d=u[u.length-1];return l+=u.length-1,i=u.length===1?i+d.length:1+d.length+r,c}}Fr.peek=$u;function Ru(){return{enter:{gfmFootnoteDefinition:Bu,gfmFootnoteDefinitionLabelString:_u,gfmFootnoteCall:Uu,gfmFootnoteCallString:Vu},exit:{gfmFootnoteDefinition:Hu,gfmFootnoteDefinitionLabelString:Nu,gfmFootnoteCall:Wu,gfmFootnoteCallString:qu}}}function ju(){return{unsafe:[{character:"[",inConstruct:["phrasing","label","reference"]}],handlers:{footnoteDefinition:Qu,footnoteReference:Fr}}}function Bu(e){this.enter({type:"footnoteDefinition",identifier:"",label:"",children:[]},e)}function _u(){this.buffer()}function Nu(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.label=t,n.identifier=ce(this.sliceSerialize(e)).toLowerCase()}function Hu(e){this.exit(e)}function Uu(e){this.enter({type:"footnoteReference",identifier:"",label:""},e)}function Vu(){this.buffer()}function qu(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.label=t,n.identifier=ce(this.sliceSerialize(e)).toLowerCase()}function Wu(e){this.exit(e)}function Fr(e,t,n,r){let l=nt(r),i=l.move("[^"),o=n.enter("footnoteReference"),a=n.enter("reference");return i+=l.move(Cr(n,wr(e),we(J({},l.current()),{before:i,after:"]"}))),a(),o(),i+=l.move("]"),i}function $u(){return"["}function Qu(e,t,n,r){let l=nt(r),i=l.move("[^"),o=n.enter("footnoteDefinition"),a=n.enter("label");return i+=l.move(Cr(n,wr(e),we(J({},l.current()),{before:i,after:"]"}))),a(),i+=l.move("]:"+(e.children&&e.children.length>0?" ":"")),l.shift(4),i+=l.move(zu(Ou(e,n,l.current()),Yu)),o(),i}function Yu(e,t,n){return t===0?e:(n?"":"    ")+e}function Er(e,t,n){let r=t.indexStack,l=e.children||[],i=[],o=-1,a=n.before;r.push(-1);let s=t.createTracker(n);for(;++o<l.length;){let f=l[o],c;if(r[r.length-1]=o,o+1<l.length){let u=t.handle.handlers[l[o+1].type];u&&u.peek&&(u=u.peek),c=u?u(l[o+1],e,t,J({before:"",after:""},s.current())).charAt(0):""}else c=n.after;i.length>0&&(a==="\r"||a===`
`)&&f.type==="html"&&(i[i.length-1]=i[i.length-1].replace(/(\r?\n|\r)$/," "),a=" ",s=t.createTracker(n),s.move(i.join(""))),i.push(s.move(t.handle(f,e,t,we(J({},s.current()),{before:a,after:c})))),a=i[i.length-1].slice(-1)}return r.pop(),i.join("")}var Xu=["autolink","destinationLiteral","destinationRaw","reference","titleQuote","titleApostrophe"];Ar.peek=es;var Ku={canContainEols:["delete"],enter:{strikethrough:Zu},exit:{strikethrough:Gu}},Ju={unsafe:[{character:"~",inConstruct:"phrasing",notInConstruct:Xu}],handlers:{delete:Ar}};function Zu(e){this.enter({type:"delete",children:[]},e)}function Gu(e){this.exit(e)}function Ar(e,t,n,r){let l=nt(r),i=n.enter("strikethrough"),o=l.move("~~");return o+=Er(e,n,we(J({},l.current()),{before:o,after:"~"})),o+=l.move("~~"),i(),o}function es(){return"~"}Dr.peek=ts;function Dr(e,t,n){let r=e.value||"",l="`",i=-1;for(;new RegExp("(^|[^`])"+l+"([^`]|$)").test(r);)l+="`";for(/[^ \r\n]/.test(r)&&(/^[ \r\n]/.test(r)&&/[ \r\n]$/.test(r)||/^`|`$/.test(r))&&(r=" "+r+" ");++i<n.unsafe.length;){let o=n.unsafe[i],a=Sr(o),s;if(o.atBreak)for(;s=a.exec(r);){let f=s.index;r.charCodeAt(f)===10&&r.charCodeAt(f-1)===13&&f--,r=r.slice(0,f)+" "+r.slice(s.index+1)}}return l+r+l}function ts(){return"`"}function ns(e){return e.length}function rs(e,t){let n=t||{},r=(n.align||[]).concat(),l=n.stringLength||ns,i=[],o=[],a=[],s=[],f=0,c=-1;for(;++c<e.length;){let k=[],w=[],m=-1;for(e[c].length>f&&(f=e[c].length);++m<e[c].length;){let F=is(e[c][m]);if(n.alignDelimiters!==!1){let S=l(F);w[m]=S,(s[m]===void 0||S>s[m])&&(s[m]=S)}k.push(F)}o[c]=k,a[c]=w}let u=-1;if(typeof r=="object"&&"length"in r)for(;++u<f;)i[u]=En(r[u]);else{let k=En(r);for(;++u<f;)i[u]=k}u=-1;let d=[],p=[];for(;++u<f;){let k=i[u],w="",m="";k===99?(w=":",m=":"):k===108?w=":":k===114&&(m=":");let F=n.alignDelimiters===!1?1:Math.max(1,s[u]-w.length-m.length),S=w+"-".repeat(F)+m;n.alignDelimiters!==!1&&(F=w.length+F+m.length,F>s[u]&&(s[u]=F),p[u]=F),d[u]=S}o.splice(1,0,d),a.splice(1,0,p),c=-1;let y=[];for(;++c<o.length;){let k=o[c],w=a[c];u=-1;let m=[];for(;++u<f;){let F=k[u]||"",S="",T="";if(n.alignDelimiters!==!1){let L=s[u]-(w[u]||0),b=i[u];b===114?S=" ".repeat(L):b===99?L%2?(S=" ".repeat(L/2+.5),T=" ".repeat(L/2-.5)):(S=" ".repeat(L/2),T=S):T=" ".repeat(L)}n.delimiterStart!==!1&&!u&&m.push("|"),n.padding!==!1&&!(n.alignDelimiters===!1&&F==="")&&(n.delimiterStart!==!1||u)&&m.push(" "),n.alignDelimiters!==!1&&m.push(S),m.push(F),n.alignDelimiters!==!1&&m.push(T),n.padding!==!1&&m.push(" "),(n.delimiterEnd!==!1||u!==f-1)&&m.push("|")}y.push(n.delimiterEnd===!1?m.join("").replace(/ +$/,""):m.join(""))}return y.join(`
`)}function is(e){return e==null?"":String(e)}function En(e){let t=typeof e=="string"?e.codePointAt(0):0;return t===67||t===99?99:t===76||t===108?108:t===82||t===114?114:0}var ls={enter:{table:os,tableData:An,tableHeader:An,tableRow:us},exit:{codeText:ss,table:as,tableData:xt,tableHeader:xt,tableRow:xt}};function os(e){let t=e._align;this.enter({type:"table",align:t.map(n=>n==="none"?null:n),children:[]},e),this.setData("inTable",!0)}function as(e){this.exit(e),this.setData("inTable")}function us(e){this.enter({type:"tableRow",children:[]},e)}function xt(e){this.exit(e)}function An(e){this.enter({type:"tableCell",children:[]},e)}function ss(e){let t=this.resume();this.getData("inTable")&&(t=t.replace(/\\([\\|])/g,cs));let n=this.stack[this.stack.length-1];n.value=t,this.exit(e)}function cs(e,t){return t==="|"?t:e}function fs(e){let t=e||{},n=t.tableCellPadding,r=t.tablePipeAlign,l=t.stringLength,i=n?" ":"|";return{unsafe:[{character:"\r",inConstruct:"tableCell"},{character:`
`,inConstruct:"tableCell"},{atBreak:!0,character:"|",after:"[	 :-]"},{character:"|",inConstruct:"tableCell"},{atBreak:!0,character:":",after:"-"},{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{table:o,tableRow:a,tableCell:s,inlineCode:d}};function o(p,y,k,w){return f(c(p,k,w),p.align)}function a(p,y,k,w){let m=u(p,k,w),F=f([m]);return F.slice(0,F.indexOf(`
`))}function s(p,y,k,w){let m=k.enter("tableCell"),F=k.enter("phrasing"),S=Er(p,k,we(J({},w),{before:i,after:i}));return F(),m(),S}function f(p,y){return rs(p,{align:y,alignDelimiters:r,padding:n,stringLength:l})}function c(p,y,k){let w=p.children,m=-1,F=[],S=y.enter("table");for(;++m<w.length;)F[m]=u(w[m],y,k);return S(),F}function u(p,y,k){let w=p.children,m=-1,F=[],S=y.enter("tableRow");for(;++m<w.length;)F[m]=s(w[m],p,y,k);return S(),F}function d(p,y,k){let w=Dr(p,y,k);return k.stack.includes("tableCell")&&(w=w.replace(/\|/g,"\\$&")),w}}function ps(e){let t=e.options.bullet||"*";if(t!=="*"&&t!=="+"&&t!=="-")throw new Error("Cannot serialize items with `"+t+"` for `options.bullet`, expected `*`, `+`, or `-`");return t}function ds(e){let t=e.options.listItemIndent||"tab";if(t===1||t==="1")return"one";if(t!=="tab"&&t!=="one"&&t!=="mixed")throw new Error("Cannot serialize items with `"+t+"` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");return t}function hs(e,t,n,r){let l=ds(n),i=n.bulletCurrent||ps(n);t&&t.type==="list"&&t.ordered&&(i=(typeof t.start=="number"&&t.start>-1?t.start:1)+(n.options.incrementListMarker===!1?0:t.children.indexOf(e))+i);let o=i.length+1;(l==="tab"||l==="mixed"&&(t&&t.type==="list"&&t.spread||e.spread))&&(o=Math.ceil(o/4)*4);let a=n.createTracker(r);a.move(i+" ".repeat(o-i.length)),a.shift(o);let s=n.enter("listItem"),f=n.indentLines(n.containerFlow(e,a.current()),c);return s(),f;function c(u,d,p){return d?(p?"":" ".repeat(o))+u:(p?i:i+" ".repeat(o-i.length))+u}}var gs={exit:{taskListCheckValueChecked:Dn,taskListCheckValueUnchecked:Dn,paragraph:ys}},ms={unsafe:[{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{listItem:bs}};function Dn(e){let t=this.stack[this.stack.length-2];t.checked=e.type==="taskListCheckValueChecked"}function ys(e){let t=this.stack[this.stack.length-2];if(t&&t.type==="listItem"&&typeof t.checked=="boolean"){let n=this.stack[this.stack.length-1],r=n.children[0];if(r&&r.type==="text"){let l=t.children,i=-1,o;for(;++i<l.length;){let a=l[i];if(a.type==="paragraph"){o=a;break}}o===n&&(r.value=r.value.slice(1),r.value.length===0?n.children.shift():n.position&&r.position&&typeof r.position.start.offset=="number"&&(r.position.start.column++,r.position.start.offset++,n.position.start=Object.assign({},r.position.start)))}}this.exit(e)}function bs(e,t,n,r){let l=e.children[0],i=typeof e.checked=="boolean"&&l&&l.type==="paragraph",o="["+(e.checked?"x":" ")+"] ",a=nt(r);i&&a.move(o);let s=hs(e,t,n,J(J({},r),a.current()));return i&&(s=s.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/,f)),s;function f(c){return c+o}}function ks(){return[bu,Ru(),Ku,ls,gs]}function xs(e){return{extensions:[ku,ju(),Ju,fs(e),ms]}}function vs(e={}){let t=this.data();n("micromarkExtensions",du(e)),n("fromMarkdownExtensions",ks()),n("toMarkdownExtensions",xs(e));function n(r,l){(t[r]?t[r]:t[r]=[]).push(l)}}var Tr=de(Tt(),1);function ws(e){return Tr.default.createElement("a",{href:e.href,target:"_blank",rel:"noreferrer"},e.children)}function Cs({source:e}){return Tr.default.createElement(Ma,{components:{a:ws},rehypePlugins:[vs]},e)}export{Cs as default};
