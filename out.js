var cg=Object.create;var vh=Object.defineProperty;var ug=Object.getOwnPropertyDescriptor;var lg=Object.getOwnPropertyNames;var hg=Object.getPrototypeOf,dg=Object.prototype.hasOwnProperty;var wh=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports);var fg=(n,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of lg(e))!dg.call(n,i)&&i!==t&&vh(n,i,{get:()=>e[i],enumerable:!(r=ug(e,i))||r.enumerable});return n};var pg=(n,e,t)=>(t=n!=null?cg(hg(n)):{},fg(e||!n||!n.__esModule?vh(t,"default",{value:n,enumerable:!0}):t,n));var Nh=wh(Y=>{"use strict";var ti=Symbol.for("react.element"),mg=Symbol.for("react.portal"),gg=Symbol.for("react.fragment"),yg=Symbol.for("react.strict_mode"),_g=Symbol.for("react.profiler"),Ig=Symbol.for("react.provider"),vg=Symbol.for("react.context"),wg=Symbol.for("react.forward_ref"),Eg=Symbol.for("react.suspense"),Tg=Symbol.for("react.memo"),bg=Symbol.for("react.lazy"),Eh=Symbol.iterator;function Sg(n){return n===null||typeof n!="object"?null:(n=Eh&&n[Eh]||n["@@iterator"],typeof n=="function"?n:null)}var Sh={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ah=Object.assign,Rh={};function or(n,e,t){this.props=n,this.context=e,this.refs=Rh,this.updater=t||Sh}or.prototype.isReactComponent={};or.prototype.setState=function(n,e){if(typeof n!="object"&&typeof n!="function"&&n!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,n,e,"setState")};or.prototype.forceUpdate=function(n){this.updater.enqueueForceUpdate(this,n,"forceUpdate")};function xh(){}xh.prototype=or.prototype;function _a(n,e,t){this.props=n,this.context=e,this.refs=Rh,this.updater=t||Sh}var Ia=_a.prototype=new xh;Ia.constructor=_a;Ah(Ia,or.prototype);Ia.isPureReactComponent=!0;var Th=Array.isArray,Ph=Object.prototype.hasOwnProperty,va={current:null},Ch={key:!0,ref:!0,__self:!0,__source:!0};function kh(n,e,t){var r,i={},o=null,a=null;if(e!=null)for(r in e.ref!==void 0&&(a=e.ref),e.key!==void 0&&(o=""+e.key),e)Ph.call(e,r)&&!Ch.hasOwnProperty(r)&&(i[r]=e[r]);var u=arguments.length-2;if(u===1)i.children=t;else if(1<u){for(var l=Array(u),d=0;d<u;d++)l[d]=arguments[d+2];i.children=l}if(n&&n.defaultProps)for(r in u=n.defaultProps,u)i[r]===void 0&&(i[r]=u[r]);return{$$typeof:ti,type:n,key:o,ref:a,props:i,_owner:va.current}}function Ag(n,e){return{$$typeof:ti,type:n.type,key:e,ref:n.ref,props:n.props,_owner:n._owner}}function wa(n){return typeof n=="object"&&n!==null&&n.$$typeof===ti}function Rg(n){var e={"=":"=0",":":"=2"};return"$"+n.replace(/[=:]/g,function(t){return e[t]})}var bh=/\/+/g;function ya(n,e){return typeof n=="object"&&n!==null&&n.key!=null?Rg(""+n.key):e.toString(36)}function hs(n,e,t,r,i){var o=typeof n;(o==="undefined"||o==="boolean")&&(n=null);var a=!1;if(n===null)a=!0;else switch(o){case"string":case"number":a=!0;break;case"object":switch(n.$$typeof){case ti:case mg:a=!0}}if(a)return a=n,i=i(a),n=r===""?"."+ya(a,0):r,Th(i)?(t="",n!=null&&(t=n.replace(bh,"$&/")+"/"),hs(i,e,t,"",function(d){return d})):i!=null&&(wa(i)&&(i=Ag(i,t+(!i.key||a&&a.key===i.key?"":(""+i.key).replace(bh,"$&/")+"/")+n)),e.push(i)),1;if(a=0,r=r===""?".":r+":",Th(n))for(var u=0;u<n.length;u++){o=n[u];var l=r+ya(o,u);a+=hs(o,e,t,l,i)}else if(l=Sg(n),typeof l=="function")for(n=l.call(n),u=0;!(o=n.next()).done;)o=o.value,l=r+ya(o,u++),a+=hs(o,e,t,l,i);else if(o==="object")throw e=String(n),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function ls(n,e,t){if(n==null)return n;var r=[],i=0;return hs(n,r,"","",function(o){return e.call(t,o,i++)}),r}function xg(n){if(n._status===-1){var e=n._result;e=e(),e.then(function(t){(n._status===0||n._status===-1)&&(n._status=1,n._result=t)},function(t){(n._status===0||n._status===-1)&&(n._status=2,n._result=t)}),n._status===-1&&(n._status=0,n._result=e)}if(n._status===1)return n._result.default;throw n._result}var Ge={current:null},ds={transition:null},Pg={ReactCurrentDispatcher:Ge,ReactCurrentBatchConfig:ds,ReactCurrentOwner:va};function Dh(){throw Error("act(...) is not supported in production builds of React.")}Y.Children={map:ls,forEach:function(n,e,t){ls(n,function(){e.apply(this,arguments)},t)},count:function(n){var e=0;return ls(n,function(){e++}),e},toArray:function(n){return ls(n,function(e){return e})||[]},only:function(n){if(!wa(n))throw Error("React.Children.only expected to receive a single React element child.");return n}};Y.Component=or;Y.Fragment=gg;Y.Profiler=_g;Y.PureComponent=_a;Y.StrictMode=yg;Y.Suspense=Eg;Y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Pg;Y.act=Dh;Y.cloneElement=function(n,e,t){if(n==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+n+".");var r=Ah({},n.props),i=n.key,o=n.ref,a=n._owner;if(e!=null){if(e.ref!==void 0&&(o=e.ref,a=va.current),e.key!==void 0&&(i=""+e.key),n.type&&n.type.defaultProps)var u=n.type.defaultProps;for(l in e)Ph.call(e,l)&&!Ch.hasOwnProperty(l)&&(r[l]=e[l]===void 0&&u!==void 0?u[l]:e[l])}var l=arguments.length-2;if(l===1)r.children=t;else if(1<l){u=Array(l);for(var d=0;d<l;d++)u[d]=arguments[d+2];r.children=u}return{$$typeof:ti,type:n.type,key:i,ref:o,props:r,_owner:a}};Y.createContext=function(n){return n={$$typeof:vg,_currentValue:n,_currentValue2:n,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},n.Provider={$$typeof:Ig,_context:n},n.Consumer=n};Y.createElement=kh;Y.createFactory=function(n){var e=kh.bind(null,n);return e.type=n,e};Y.createRef=function(){return{current:null}};Y.forwardRef=function(n){return{$$typeof:wg,render:n}};Y.isValidElement=wa;Y.lazy=function(n){return{$$typeof:bg,_payload:{_status:-1,_result:n},_init:xg}};Y.memo=function(n,e){return{$$typeof:Tg,type:n,compare:e===void 0?null:e}};Y.startTransition=function(n){var e=ds.transition;ds.transition={};try{n()}finally{ds.transition=e}};Y.unstable_act=Dh;Y.useCallback=function(n,e){return Ge.current.useCallback(n,e)};Y.useContext=function(n){return Ge.current.useContext(n)};Y.useDebugValue=function(){};Y.useDeferredValue=function(n){return Ge.current.useDeferredValue(n)};Y.useEffect=function(n,e){return Ge.current.useEffect(n,e)};Y.useId=function(){return Ge.current.useId()};Y.useImperativeHandle=function(n,e,t){return Ge.current.useImperativeHandle(n,e,t)};Y.useInsertionEffect=function(n,e){return Ge.current.useInsertionEffect(n,e)};Y.useLayoutEffect=function(n,e){return Ge.current.useLayoutEffect(n,e)};Y.useMemo=function(n,e){return Ge.current.useMemo(n,e)};Y.useReducer=function(n,e,t){return Ge.current.useReducer(n,e,t)};Y.useRef=function(n){return Ge.current.useRef(n)};Y.useState=function(n){return Ge.current.useState(n)};Y.useSyncExternalStore=function(n,e,t){return Ge.current.useSyncExternalStore(n,e,t)};Y.useTransition=function(){return Ge.current.useTransition()};Y.version="18.3.1"});var Vh=wh((wE,Oh)=>{"use strict";Oh.exports=Nh()});var V=pg(Vh(),1);var Mh=()=>{};var Uh=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Cg=function(n){let e=[],t=0,r=0;for(;t<n.length;){let i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){let o=n[t++];e[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){let o=n[t++],a=n[t++],u=n[t++],l=((i&7)<<18|(o&63)<<12|(a&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{let o=n[t++],a=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|a&63)}}return e.join("")},Bh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){let o=n[i],a=i+1<n.length,u=a?n[i+1]:0,l=i+2<n.length,d=l?n[i+2]:0,p=o>>2,m=(o&3)<<4|u>>4,g=(u&15)<<2|d>>6,S=d&63;l||(S=64,a||(g=64)),r.push(t[p],t[m],t[g],t[S])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Uh(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Cg(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){let o=t[n.charAt(i++)],u=i<n.length?t[n.charAt(i)]:0;++i;let d=i<n.length?t[n.charAt(i)]:64;++i;let m=i<n.length?t[n.charAt(i)]:64;if(++i,o==null||u==null||d==null||m==null)throw new Ta;let g=o<<2|u>>4;if(r.push(g),d!==64){let S=u<<4&240|d>>2;if(r.push(S),m!==64){let P=d<<6&192|m;r.push(P)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},Ta=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},kg=function(n){let e=Uh(n);return Bh.encodeByteArray(e,!0)},ri=function(n){return kg(n).replace(/\./g,"")},ps=function(n){try{return Bh.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function qh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var Dg=()=>qh().__FIREBASE_DEFAULTS__,Ng=()=>{if(typeof process>"u"||typeof process.env>"u")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Og=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&ps(n[1]);return e&&JSON.parse(e)},ms=()=>{try{return Mh()||Dg()||Ng()||Og()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Sa=n=>ms()?.emulatorHosts?.[n],zh=n=>{let e=Sa(n);if(!e)return;let t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Aa=()=>ms()?.config,Ra=n=>ms()?.[`_${n}`];var fs=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};function rn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function gs(n){return(await fetch(n,{credentials:"include"})).ok}function jh(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}},...n};return[ri(JSON.stringify(t)),ri(JSON.stringify(a)),""].join(".")}var ni={};function Vg(){let n={prod:[],emulator:[]};for(let e of Object.keys(ni))ni[e]?n.emulator.push(e):n.prod.push(e);return n}function Mg(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}var Lh=!1;function ys(n,e){if(typeof window>"u"||typeof document>"u"||!rn(window.location.host)||ni[n]===e||ni[n]||Lh)return;ni[n]=e;function t(g){return`__firebase__banner__${g}`}let r="__firebase__banner",o=Vg().prod.length>0;function a(){let g=document.getElementById(r);g&&g.remove()}function u(g){g.style.display="flex",g.style.background="#7faaf0",g.style.position="fixed",g.style.bottom="5px",g.style.left="5px",g.style.padding=".5em",g.style.borderRadius="5px",g.style.alignItems="center"}function l(g,S){g.setAttribute("width","24"),g.setAttribute("id",S),g.setAttribute("height","24"),g.setAttribute("viewBox","0 0 24 24"),g.setAttribute("fill","none"),g.style.marginLeft="-6px"}function d(){let g=document.createElement("span");return g.style.cursor="pointer",g.style.marginLeft="16px",g.style.fontSize="24px",g.innerHTML=" &times;",g.onclick=()=>{Lh=!0,a()},g}function p(g,S){g.setAttribute("id",S),g.innerText="Learn more",g.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",g.setAttribute("target","__blank"),g.style.paddingLeft="5px",g.style.textDecoration="underline"}function m(){let g=Mg(r),S=t("text"),P=document.getElementById(S)||document.createElement("span"),k=t("learnmore"),R=document.getElementById(k)||document.createElement("a"),M=t("preprendIcon"),B=document.getElementById(M)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(g.created){let K=g.element;u(K),p(R,k);let Q=d();l(B,M),K.append(B,P,R,Q),document.body.appendChild(K)}o?(P.innerText="Preview backend disconnected.",B.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(B.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,P.innerText="Preview backend running in this workspace."),P.setAttribute("id",S)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",m):m()}function Me(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function $h(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Me())}function Lg(){let n=ms()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Wh(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Gh(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Hh(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Kh(){let n=Me();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Qh(){return!Lg()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function xa(){try{return typeof indexedDB=="object"}catch{return!1}}function Jh(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{e(i.error?.message||"")}}catch(t){e(t)}})}var Fg="FirebaseError",nt=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Fg,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Vt.prototype.create)}},Vt=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},i=`${this.service}/${e}`,o=this.errors[e],a=o?Ug(o,r):"Error",u=`${this.serviceName}: ${a} (${i}).`;return new nt(i,u,r)}};function Ug(n,e){return n.replace(Bg,(t,r)=>{let i=e[r];return i!=null?String(i):`<${r}?>`})}var Bg=/\{\$([^}]+)}/g;function Yh(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function ft(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let i of t){if(!r.includes(i))return!1;let o=n[i],a=e[i];if(Fh(o)&&Fh(a)){if(!ft(o,a))return!1}else if(o!==a)return!1}for(let i of r)if(!t.includes(i))return!1;return!0}function Fh(n){return n!==null&&typeof n=="object"}function ar(n){let e=[];for(let[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function cr(n){let e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){let[i,o]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(o)}}),e}function ur(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Xh(n,e){let t=new ba(n,e);return t.subscribe.bind(t)}var ba=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");qg(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=Ea),i.error===void 0&&(i.error=Ea),i.complete===void 0&&(i.complete=Ea);let o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function qg(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Ea(){}var bE=4*60*60*1e3;function ze(n){return n&&n._delegate?n._delegate:n}var ot=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var Tn="[DEFAULT]";var Pa=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new fs;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){let t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(jg(e))try{this.getOrInitializeService({instanceIdentifier:Tn})}catch{}for(let[t,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(t);try{let o=this.getOrInitializeService({instanceIdentifier:i});r.resolve(o)}catch{}}}}clearInstance(e=Tn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Tn){return this.instances.has(e)}getOptions(e=Tn){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[o,a]of this.instancesDeferred.entries()){let u=this.normalizeInstanceIdentifier(o);r===u&&a.resolve(i)}return i}onInit(e,t){let r=this.normalizeInstanceIdentifier(t),i=this.onInitCallbacks.get(r)??new Set;i.add(e),this.onInitCallbacks.set(r,i);let o=this.instances.get(r);return o&&e(o,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:zg(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Tn){return this.component?this.component.multipleInstances?e:Tn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function zg(n){return n===Tn?void 0:n}function jg(n){return n.instantiationMode==="EAGER"}var _s=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new Pa(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var $g=[],J;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(J||(J={}));var Wg={debug:J.DEBUG,verbose:J.VERBOSE,info:J.INFO,warn:J.WARN,error:J.ERROR,silent:J.SILENT},Gg=J.INFO,Hg={[J.DEBUG]:"log",[J.VERBOSE]:"log",[J.INFO]:"info",[J.WARN]:"warn",[J.ERROR]:"error"},Kg=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),i=Hg[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},sn=class{constructor(e){this.name=e,this._logLevel=Gg,this._logHandler=Kg,this._userLogHandler=null,$g.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in J))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Wg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,J.DEBUG,...e),this._logHandler(this,J.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,J.VERBOSE,...e),this._logHandler(this,J.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,J.INFO,...e),this._logHandler(this,J.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,J.WARN,...e),this._logHandler(this,J.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,J.ERROR,...e),this._logHandler(this,J.ERROR,...e)}};var Qg=(n,e)=>e.some(t=>n instanceof t),Zh,ed;function Jg(){return Zh||(Zh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Yg(){return ed||(ed=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var td=new WeakMap,ka=new WeakMap,nd=new WeakMap,Ca=new WeakMap,Na=new WeakMap;function Xg(n){let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{t(Tt(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",o),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&td.set(t,n)}).catch(()=>{}),Na.set(e,n),e}function Zg(n){if(ka.has(n))return;let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{t(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});ka.set(n,e)}var Da={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ka.get(n);if(e==="objectStoreNames")return n.objectStoreNames||nd.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Tt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function rd(n){Da=n(Da)}function ey(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(Is(this),e,...t);return nd.set(r,e.sort?e.sort():[e]),Tt(r)}:Yg().includes(n)?function(...e){return n.apply(Is(this),e),Tt(td.get(this))}:function(...e){return Tt(n.apply(Is(this),e))}}function ty(n){return typeof n=="function"?ey(n):(n instanceof IDBTransaction&&Zg(n),Qg(n,Jg())?new Proxy(n,Da):n)}function Tt(n){if(n instanceof IDBRequest)return Xg(n);if(Ca.has(n))return Ca.get(n);let e=ty(n);return e!==n&&(Ca.set(n,e),Na.set(e,n)),e}var Is=n=>Na.get(n);function sd(n,e,{blocked:t,upgrade:r,blocking:i,terminated:o}={}){let a=indexedDB.open(n,e),u=Tt(a);return r&&a.addEventListener("upgradeneeded",l=>{r(Tt(a.result),l.oldVersion,l.newVersion,Tt(a.transaction),l)}),t&&a.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),u.then(l=>{o&&l.addEventListener("close",()=>o()),i&&l.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),u}var ny=["get","getKey","getAll","getAllKeys","count"],ry=["put","add","delete","clear"],Oa=new Map;function id(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Oa.get(e))return Oa.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,i=ry.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||ny.includes(t)))return;let o=async function(a,...u){let l=this.transaction(a,i?"readwrite":"readonly"),d=l.store;return r&&(d=d.index(u.shift())),(await Promise.all([d[t](...u),i&&l.done]))[0]};return Oa.set(e,o),o}rd(n=>({...n,get:(e,t,r)=>id(e,t)||n.get(e,t,r),has:(e,t)=>!!id(e,t)||n.has(e,t)}));var Ma=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(iy(t)){let r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}};function iy(n){return n.getComponent()?.type==="VERSION"}var La="@firebase/app",od="0.14.9";var Mt=new sn("@firebase/app"),sy="@firebase/app-compat",oy="@firebase/analytics-compat",ay="@firebase/analytics",cy="@firebase/app-check-compat",uy="@firebase/app-check",ly="@firebase/auth",hy="@firebase/auth-compat",dy="@firebase/database",fy="@firebase/data-connect",py="@firebase/database-compat",my="@firebase/functions",gy="@firebase/functions-compat",yy="@firebase/installations",_y="@firebase/installations-compat",Iy="@firebase/messaging",vy="@firebase/messaging-compat",wy="@firebase/performance",Ey="@firebase/performance-compat",Ty="@firebase/remote-config",by="@firebase/remote-config-compat",Sy="@firebase/storage",Ay="@firebase/storage-compat",Ry="@firebase/firestore",xy="@firebase/ai",Py="@firebase/firestore-compat",Cy="firebase",ky="12.10.0";var Fa="[DEFAULT]",Dy={[La]:"fire-core",[sy]:"fire-core-compat",[ay]:"fire-analytics",[oy]:"fire-analytics-compat",[uy]:"fire-app-check",[cy]:"fire-app-check-compat",[ly]:"fire-auth",[hy]:"fire-auth-compat",[dy]:"fire-rtdb",[fy]:"fire-data-connect",[py]:"fire-rtdb-compat",[my]:"fire-fn",[gy]:"fire-fn-compat",[yy]:"fire-iid",[_y]:"fire-iid-compat",[Iy]:"fire-fcm",[vy]:"fire-fcm-compat",[wy]:"fire-perf",[Ey]:"fire-perf-compat",[Ty]:"fire-rc",[by]:"fire-rc-compat",[Sy]:"fire-gcs",[Ay]:"fire-gcs-compat",[Ry]:"fire-fst",[Py]:"fire-fst-compat",[xy]:"fire-vertex","fire-js":"fire-js",[Cy]:"fire-js-all"};var vs=new Map,Ny=new Map,Ua=new Map;function ad(n,e){try{n.container.addComponent(e)}catch(t){Mt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function an(n){let e=n.name;if(Ua.has(e))return Mt.debug(`There were multiple attempts to register component ${e}.`),!1;Ua.set(e,n);for(let t of vs.values())ad(t,n);for(let t of Ny.values())ad(t,n);return!0}function si(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function rt(n){return n==null?!1:n.settings!==void 0}var Oy={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},on=new Vt("app","Firebase",Oy);var Ba=class{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new ot("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw on.create("app-deleted",{appName:this._name})}};var cn=ky;function ja(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r={name:Fa,automaticDataCollectionEnabled:!0,...e},i=r.name;if(typeof i!="string"||!i)throw on.create("bad-app-name",{appName:String(i)});if(t||(t=Aa()),!t)throw on.create("no-options");let o=vs.get(i);if(o){if(ft(t,o.options)&&ft(r,o.config))return o;throw on.create("duplicate-app",{appName:i})}let a=new _s(i);for(let l of Ua.values())a.addComponent(l);let u=new Ba(t,r,a);return vs.set(i,u),u}function ws(n=Fa){let e=vs.get(n);if(!e&&n===Fa&&Aa())return ja();if(!e)throw on.create("no-app",{appName:n});return e}function pt(n,e,t){let r=Dy[n]??n;t&&(r+=`-${t}`);let i=r.match(/\s|\//),o=e.match(/\s|\//);if(i||o){let a=[`Unable to register library "${r}" with version "${e}":`];i&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Mt.warn(a.join(" "));return}an(new ot(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}var Vy="firebase-heartbeat-database",My=1,ii="firebase-heartbeat-store",Va=null;function hd(){return Va||(Va=sd(Vy,My,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(ii)}catch(t){console.warn(t)}}}}).catch(n=>{throw on.create("idb-open",{originalErrorMessage:n.message})})),Va}async function Ly(n){try{let t=(await hd()).transaction(ii),r=await t.objectStore(ii).get(dd(n));return await t.done,r}catch(e){if(e instanceof nt)Mt.warn(e.message);else{let t=on.create("idb-get",{originalErrorMessage:e?.message});Mt.warn(t.message)}}}async function cd(n,e){try{let r=(await hd()).transaction(ii,"readwrite");await r.objectStore(ii).put(e,dd(n)),await r.done}catch(t){if(t instanceof nt)Mt.warn(t.message);else{let r=on.create("idb-set",{originalErrorMessage:t?.message});Mt.warn(r.message)}}}function dd(n){return`${n.name}!${n.options.appId}`}var Fy=1024,Uy=30,qa=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new za(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{let t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=ud();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(i=>i.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>Uy){let i=qy(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Mt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";let e=ud(),{heartbeatsToSend:t,unsentEntries:r}=By(this._heartbeatsCache.heartbeats),i=ri(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return Mt.warn(e),""}}};function ud(){return new Date().toISOString().substring(0,10)}function By(n,e=Fy){let t=[],r=n.slice();for(let i of n){let o=t.find(a=>a.agent===i.agent);if(o){if(o.dates.push(i.date),ld(t)>e){o.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),ld(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var za=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return xa()?Jh().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await Ly(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){let r=await this.read();return cd(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){let r=await this.read();return cd(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}};function ld(n){return ri(JSON.stringify({version:2,heartbeats:n})).length}function qy(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}function zy(n){an(new ot("platform-logger",e=>new Ma(e),"PRIVATE")),an(new ot("heartbeat",e=>new qa(e),"PRIVATE")),pt(La,od,n),pt(La,od,"esm2020"),pt("fire-js","")}zy("");var jy="firebase",$y="12.10.0";pt(jy,$y,"app");function kd(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var Dd=kd,Nd=new Vt("auth","Firebase",kd());var xs=new sn("@firebase/auth");function Wy(n,...e){xs.logLevel<=J.WARN&&xs.warn(`Auth (${cn}): ${n}`,...e)}function Ts(n,...e){xs.logLevel<=J.ERROR&&xs.error(`Auth (${cn}): ${n}`,...e)}function at(n,...e){throw pc(n,...e)}function mt(n,...e){return pc(n,...e)}function fc(n,e,t){let r={...Dd(),[e]:t};return new Vt("auth","Firebase",r).create(e,{appName:n.name})}function bn(n){return fc(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Gy(n,e,t){let r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&at(n,"argument-error"),fc(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function pc(n,...e){if(typeof n!="string"){let t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Nd.create(n,...e)}function U(n,e,...t){if(!n)throw pc(e,...t)}function bt(n){let e="INTERNAL ASSERTION FAILED: "+n;throw Ts(e),new Error(e)}function Ft(n,e){n||bt(e)}function Qa(){return typeof self<"u"&&self.location?.href||""}function Hy(){return fd()==="http:"||fd()==="https:"}function fd(){return typeof self<"u"&&self.location?.protocol||null}function Ky(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Hy()||Gh()||"connection"in navigator)?navigator.onLine:!0}function Qy(){if(typeof navigator>"u")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}var Sn=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,Ft(t>e,"Short delay should be less than long delay!"),this.isMobile=$h()||Hh()}get(){return Ky()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function mc(n,e){Ft(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var Ps=class{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;bt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;bt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;bt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var Jy={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var Yy=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Xy=new Sn(3e4,6e4);function Le(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function je(n,e,t,r,i={}){return Od(n,i,async()=>{let o={},a={};r&&(e==="GET"?a=r:o={body:JSON.stringify(r)});let u=ar({key:n.config.apiKey,...a}).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);let d={method:e,headers:l,...o};return Wh()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&rn(n.emulatorConfig.host)&&(d.credentials="include"),Ps.fetch()(await Vd(n,n.config.apiHost,t,u),d)})}async function Od(n,e,t){n._canInitEmulator=!1;let r={...Jy,...e};try{let i=new Ja(n),o=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();let a=await o.json();if("needConfirmation"in a)throw ai(n,"account-exists-with-different-credential",a);if(o.ok&&!("errorMessage"in a))return a;{let u=o.ok?a.errorMessage:a.error.message,[l,d]=u.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw ai(n,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw ai(n,"email-already-in-use",a);if(l==="USER_DISABLED")throw ai(n,"user-disabled",a);let p=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw fc(n,p,d);at(n,p)}}catch(i){if(i instanceof nt)throw i;at(n,"network-request-failed",{message:String(i)})}}async function kn(n,e,t,r,i={}){let o=await je(n,e,t,r,i);return"mfaPendingCredential"in o&&at(n,"multi-factor-auth-required",{_serverResponse:o}),o}async function Vd(n,e,t,r){let i=`${e}${t}?${r}`,o=n,a=o.config.emulator?mc(n.config,i):`${n.config.apiScheme}://${i}`;return Yy.includes(t)&&(await o._persistenceManagerAvailable,o._getPersistenceType()==="COOKIE")?o._getPersistence()._getFinalTarget(a).toString():a}function Zy(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var Ja=class{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(mt(this.auth,"network-request-failed")),Xy.get())})}};function ai(n,e,t){let r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);let i=mt(n,e,r);return i.customData._tokenResponse=t,i}function pd(n){return n!==void 0&&n.enterprise!==void 0}var Cs=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Zy(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}};async function Md(n,e){return je(n,"GET","/v2/recaptchaConfig",Le(n,e))}async function e_(n,e){return je(n,"POST","/v1/accounts:delete",e)}async function ks(n,e){return je(n,"POST","/v1/accounts:lookup",e)}function ci(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Ld(n,e=!1){let t=ze(n),r=await t.getIdToken(e),i=gc(r);U(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");let o=typeof i.firebase=="object"?i.firebase:void 0,a=o?.sign_in_provider;return{claims:i,token:r,authTime:ci($a(i.auth_time)),issuedAtTime:ci($a(i.iat)),expirationTime:ci($a(i.exp)),signInProvider:a||null,signInSecondFactor:o?.sign_in_second_factor||null}}function $a(n){return Number(n)*1e3}function gc(n){let[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Ts("JWT malformed, contained fewer than 3 sections"),null;try{let i=ps(t);return i?JSON.parse(i):(Ts("Failed to decode base64 JWT payload"),null)}catch(i){return Ts("Caught error parsing JWT payload as JSON",i?.toString()),null}}function md(n){let e=gc(n);return U(e,"internal-error"),U(typeof e.exp<"u","internal-error"),U(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}async function di(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof nt&&t_(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function t_({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}var Ya=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){let t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;let r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var fi=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ci(this.lastLoginAt),this.creationTime=ci(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function Ds(n){let e=n.auth,t=await n.getIdToken(),r=await di(n,ks(e,{idToken:t}));U(r?.users.length,e,"internal-error");let i=r.users[0];n._notifyReloadListener(i);let o=i.providerUserInfo?.length?Ud(i.providerUserInfo):[],a=n_(n.providerData,o),u=n.isAnonymous,l=!(n.email&&i.passwordHash)&&!a?.length,d=u?l:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new fi(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(n,p)}async function Fd(n){let e=ze(n);await Ds(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function n_(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Ud(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}async function r_(n,e){let t=await Od(n,{},async()=>{let r=ar({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:o}=n.config,a=await Vd(n,i,"/v1/token",`key=${o}`),u=await n._getAdditionalHeaders();u["Content-Type"]="application/x-www-form-urlencoded";let l={method:"POST",headers:u,body:r};return n.emulatorConfig&&rn(n.emulatorConfig.host)&&(l.credentials="include"),Ps.fetch()(a,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function i_(n,e){return je(n,"POST","/v2/accounts:revokeToken",Le(n,e))}var ui=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){U(e.idToken,"internal-error"),U(typeof e.idToken<"u","internal-error"),U(typeof e.refreshToken<"u","internal-error");let t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):md(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){U(e.length!==0,"internal-error");let t=md(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(U(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:i,expiresIn:o}=await r_(e,t);this.updateTokensAndExpiration(r,i,Number(o))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){let{refreshToken:r,accessToken:i,expirationTime:o}=t,a=new n;return r&&(U(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(U(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),o&&(U(typeof o=="number","internal-error",{appName:e}),a.expirationTime=o),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return bt("not implemented")}};function un(n,e){U(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}var ln=class n{constructor({uid:e,auth:t,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new Ya(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new fi(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){let t=await di(this,this.stsTokenManager.getToken(this.auth,e));return U(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Ld(this,e)}reload(){return Fd(this)}_assign(e){this!==e&&(U(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){U(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Ds(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(rt(this.auth.app))return Promise.reject(bn(this.auth));let e=await this.getIdToken();return await di(this,e_(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){let r=t.displayName??void 0,i=t.email??void 0,o=t.phoneNumber??void 0,a=t.photoURL??void 0,u=t.tenantId??void 0,l=t._redirectEventId??void 0,d=t.createdAt??void 0,p=t.lastLoginAt??void 0,{uid:m,emailVerified:g,isAnonymous:S,providerData:P,stsTokenManager:k}=t;U(m&&k,e,"internal-error");let R=ui.fromJSON(this.name,k);U(typeof m=="string",e,"internal-error"),un(r,e.name),un(i,e.name),U(typeof g=="boolean",e,"internal-error"),U(typeof S=="boolean",e,"internal-error"),un(o,e.name),un(a,e.name),un(u,e.name),un(l,e.name),un(d,e.name),un(p,e.name);let M=new n({uid:m,auth:e,email:i,emailVerified:g,displayName:r,isAnonymous:S,photoURL:a,phoneNumber:o,tenantId:u,stsTokenManager:R,createdAt:d,lastLoginAt:p});return P&&Array.isArray(P)&&(M.providerData=P.map(B=>({...B}))),l&&(M._redirectEventId=l),M}static async _fromIdTokenResponse(e,t,r=!1){let i=new ui;i.updateFromServerResponse(t);let o=new n({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Ds(o),o}static async _fromGetAccountInfoResponse(e,t,r){let i=t.users[0];U(i.localId!==void 0,"internal-error");let o=i.providerUserInfo!==void 0?Ud(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!o?.length,u=new ui;u.updateFromIdToken(r);let l=new n({uid:i.localId,auth:e,stsTokenManager:u,isAnonymous:a}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new fi(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!o?.length};return Object.assign(l,d),l}};var gd=new Map;function Lt(n){Ft(n instanceof Function,"Expected a class definition");let e=gd.get(n);return e?(Ft(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,gd.set(n,e),e)}var Ns=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};Ns.type="NONE";var Xa=Ns;function bs(n,e,t){return`firebase:${n}:${e}:${t}`}var Os=class n{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:i,name:o}=this.auth;this.fullUserKey=bs(this.userKey,i.apiKey,o),this.fullPersistenceKey=bs("persistence",i.apiKey,o),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){let t=await ks(this.auth,{idToken:e}).catch(()=>{});return t?ln._fromGetAccountInfoResponse(this.auth,t,e):null}return ln._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new n(Lt(Xa),e,r);let i=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d),o=i[0]||Lt(Xa),a=bs(r,e.config.apiKey,e.name),u=null;for(let d of t)try{let p=await d._get(a);if(p){let m;if(typeof p=="string"){let g=await ks(e,{idToken:p}).catch(()=>{});if(!g)break;m=await ln._fromGetAccountInfoResponse(e,g,p)}else m=ln._fromJSON(e,p);d!==o&&(u=m),o=d;break}}catch{}let l=i.filter(d=>d._shouldAllowMigration);return!o._shouldAllowMigration||!l.length?new n(o,e,r):(o=l[0],u&&await o._set(a,u.toJSON()),await Promise.all(t.map(async d=>{if(d!==o)try{await d._remove(a)}catch{}})),new n(o,e,r))}};function yd(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(jd(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Bd(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Wd(e))return"Blackberry";if(Gd(e))return"Webos";if(qd(e))return"Safari";if((e.includes("chrome/")||zd(e))&&!e.includes("edge/"))return"Chrome";if($d(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Bd(n=Me()){return/firefox\//i.test(n)}function qd(n=Me()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function zd(n=Me()){return/crios\//i.test(n)}function jd(n=Me()){return/iemobile/i.test(n)}function $d(n=Me()){return/android/i.test(n)}function Wd(n=Me()){return/blackberry/i.test(n)}function Gd(n=Me()){return/webos/i.test(n)}function yc(n=Me()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function s_(n=Me()){return yc(n)&&!!window.navigator?.standalone}function o_(){return Kh()&&document.documentMode===10}function Hd(n=Me()){return yc(n)||$d(n)||Gd(n)||Wd(n)||/windows phone/i.test(n)||jd(n)}function Kd(n,e=[]){let t;switch(n){case"Browser":t=yd(Me());break;case"Worker":t=`${yd(Me())}-${n}`;break;default:t=n}let r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${cn}/${r}`}var Za=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=o=>new Promise((a,u)=>{try{let l=e(o);a(l)}catch(l){u(l)}});r.onAbort=t,this.queue.push(r);let i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(let i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}};async function a_(n,e={}){return je(n,"GET","/v2/passwordPolicy",Le(n,e))}var c_=6,ec=class{constructor(e){let t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??c_,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){let t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}};var tc=class{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Vs(this),this.idTokenSubscription=new Vs(this),this.beforeStateQueue=new Za(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Nd,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(o=>this._resolvePersistenceManagerAvailable=o)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Lt(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Os.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await ks(this,{idToken:e}),r=await ln._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(rt(this.app)){let o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}let t=await this.assertedPersistence.getCurrentUser(),r=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let o=this.redirectUser?._redirectEventId,a=r?._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===a)&&u?.user&&(r=u.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return U(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ds(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Qy()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(rt(this.app))return Promise.reject(bn(this));let t=e?ze(e):null;return t&&U(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&U(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return rt(this.app)?Promise.reject(bn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return rt(this.app)?Promise.reject(bn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Lt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await a_(this),t=new ec(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Vt("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await i_(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&Lt(e)||this._popupRedirectResolver;U(t,this,"argument-error"),this.redirectPersistenceManager=await Os.create(this,[Lt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};let o=typeof t=="function"?t:t.next.bind(t),a=!1,u=this._isInitialized?Promise.resolve():this._initializationPromise;if(U(u,this,"internal-error"),u.then(()=>{a||o(this.currentUser)}),typeof t=="function"){let l=e.addObserver(t,r,i);return()=>{a=!0,l()}}else{let l=e.addObserver(t);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return U(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Kd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){let e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);let t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);let r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(rt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;let e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&Wy(`Error while retrieving App Check token: ${e.error}`),e?.token}};function Dn(n){return ze(n)}var Vs=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=Xh(t=>this.observer=t)}get next(){return U(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};var Zs={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function u_(n){Zs=n}function Qd(n){return Zs.loadJS(n)}function l_(){return Zs.recaptchaEnterpriseScript}function h_(){return Zs.gapiScript}function Jd(n){return`__${n}${Math.floor(Math.random()*1e6)}`}var nc=class{constructor(){this.enterprise=new rc}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}},rc=class{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}};var d_="recaptcha-enterprise",li="NO_RECAPTCHA",Ms=class{constructor(e){this.type=d_,this.auth=Dn(e)}async verify(e="verify",t=!1){async function r(o){if(!t){if(o.tenantId==null&&o._agentRecaptchaConfig!=null)return o._agentRecaptchaConfig.siteKey;if(o.tenantId!=null&&o._tenantRecaptchaConfigs[o.tenantId]!==void 0)return o._tenantRecaptchaConfigs[o.tenantId].siteKey}return new Promise(async(a,u)=>{Md(o,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)u(new Error("recaptcha Enterprise site key undefined"));else{let d=new Cs(l);return o.tenantId==null?o._agentRecaptchaConfig=d:o._tenantRecaptchaConfigs[o.tenantId]=d,a(d.siteKey)}}).catch(l=>{u(l)})})}function i(o,a,u){let l=window.grecaptcha;pd(l)?l.enterprise.ready(()=>{l.enterprise.execute(o,{action:e}).then(d=>{a(d)}).catch(()=>{a(li)})}):u(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new nc().execute("siteKey",{action:"verify"}):new Promise((o,a)=>{r(this.auth).then(u=>{if(!t&&pd(window.grecaptcha))i(u,o,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let l=l_();l.length!==0&&(l+=u),Qd(l).then(()=>{i(u,o,a)}).catch(d=>{a(d)})}}).catch(u=>{a(u)})})}};async function oi(n,e,t,r=!1,i=!1){let o=new Ms(n),a;if(i)a=li;else try{a=await o.verify(t)}catch{a=await o.verify(t,!0)}let u={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in u){let l=u.phoneEnrollmentInfo.phoneNumber,d=u.phoneEnrollmentInfo.recaptchaToken;Object.assign(u,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:d,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in u){let l=u.phoneSignInInfo.recaptchaToken;Object.assign(u,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return u}return r?Object.assign(u,{captchaResp:a}):Object.assign(u,{captchaResponse:a}),Object.assign(u,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(u,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),u}async function hi(n,e,t,r,i){if(i==="EMAIL_PASSWORD_PROVIDER")if(n._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let o=await oi(n,e,t,t==="getOobCode");return r(n,o)}else return r(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let a=await oi(n,e,t,t==="getOobCode");return r(n,a)}else return Promise.reject(o)});else if(i==="PHONE_PROVIDER")if(n._getRecaptchaConfig()?.isProviderEnabled("PHONE_PROVIDER")){let o=await oi(n,e,t);return r(n,o).catch(async a=>{if(n._getRecaptchaConfig()?.getProviderEnforcementState("PHONE_PROVIDER")==="AUDIT"&&(a.code==="auth/missing-recaptcha-token"||a.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);let u=await oi(n,e,t,!1,!0);return r(n,u)}return Promise.reject(a)})}else{let o=await oi(n,e,t,!1,!0);return r(n,o)}else return Promise.reject(i+" provider is not supported.")}async function f_(n){let e=Dn(n),t=await Md(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new Cs(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new Ms(e).verify()}function Yd(n,e){let t=si(n,"auth");if(t.isInitialized()){let i=t.getImmediate(),o=t.getOptions();if(ft(o,e??{}))return i;at(i,"already-initialized")}return t.initialize({options:e})}function p_(n,e){let t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(Lt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function Xd(n,e,t){let r=Dn(n);U(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");let i=!!t?.disableWarnings,o=Zd(e),{host:a,port:u}=m_(e),l=u===null?"":`:${u}`,d={url:`${o}//${a}${l}/`},p=Object.freeze({host:a,port:u,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){U(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),U(ft(d,r.config.emulator)&&ft(p,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=p,r.settings.appVerificationDisabledForTesting=!0,rn(a)?(gs(`${o}//${a}${l}`),ys("Auth",!0)):i||g_()}function Zd(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function m_(n){let e=Zd(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){let o=i[1];return{host:o,port:_d(r.substr(o.length+1))}}else{let[o,a]=r.split(":");return{host:o,port:_d(a)}}}function _d(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function g_(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}var An=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return bt("not implemented")}_getIdTokenResponse(e){return bt("not implemented")}_linkToIdToken(e,t){return bt("not implemented")}_getReauthenticationResolver(e){return bt("not implemented")}};async function y_(n,e){return je(n,"POST","/v1/accounts:signUp",e)}async function __(n,e){return kn(n,"POST","/v1/accounts:signInWithPassword",Le(n,e))}async function I_(n,e){return kn(n,"POST","/v1/accounts:signInWithEmailLink",Le(n,e))}async function v_(n,e){return kn(n,"POST","/v1/accounts:signInWithEmailLink",Le(n,e))}var pi=class n extends An{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new n(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return hi(e,t,"signInWithPassword",__,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return I_(e,{email:this._email,oobCode:this._password});default:at(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return hi(e,r,"signUpPassword",y_,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return v_(e,{idToken:t,email:this._email,oobCode:this._password});default:at(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function lr(n,e){return kn(n,"POST","/v1/accounts:signInWithIdp",Le(n,e))}var w_="http://localhost",Rn=class n extends An{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):at("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...o}=t;if(!r||!i)return null;let a=new n(r,i);return a.idToken=o.idToken||void 0,a.accessToken=o.accessToken||void 0,a.secret=o.secret,a.nonce=o.nonce,a.pendingToken=o.pendingToken||null,a}_getIdTokenResponse(e){let t=this.buildRequest();return lr(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,lr(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,lr(e,t)}buildRequest(){let e={requestUri:w_,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ar(t)}return e}};async function Id(n,e){return je(n,"POST","/v1/accounts:sendVerificationCode",Le(n,e))}async function E_(n,e){return kn(n,"POST","/v1/accounts:signInWithPhoneNumber",Le(n,e))}async function T_(n,e){let t=await kn(n,"POST","/v1/accounts:signInWithPhoneNumber",Le(n,e));if(t.temporaryProof)throw ai(n,"account-exists-with-different-credential",t);return t}var b_={USER_NOT_FOUND:"user-not-found"};async function S_(n,e){let t={...e,operation:"REAUTH"};return kn(n,"POST","/v1/accounts:signInWithPhoneNumber",Le(n,t),b_)}var mi=class n extends An{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return E_(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return T_(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return S_(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:o}=e;return!r&&!t&&!i&&!o?null:new n({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:o})}};function A_(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function R_(n){let e=cr(ur(n)).link,t=e?cr(ur(e)).deep_link_id:null,r=cr(ur(n)).deep_link_id;return(r?cr(ur(r)).link:null)||r||t||e||n}var Ls=class n{constructor(e){let t=cr(ur(e)),r=t.apiKey??null,i=t.oobCode??null,o=A_(t.mode??null);U(r&&i&&o,"argument-error"),this.apiKey=r,this.operation=o,this.code=i,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){let t=R_(e);try{return new n(t)}catch{return null}}};var hr=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return pi._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=Ls.parseLink(t);return U(r,"argument-error"),pi._fromEmailAndCode(e,r.code,r.tenantId)}};hr.PROVIDER_ID="password";hr.EMAIL_PASSWORD_SIGN_IN_METHOD="password";hr.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var gi=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var xn=class extends gi{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var yi=class n extends xn{constructor(){super("facebook.com")}static credential(e){return Rn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};yi.FACEBOOK_SIGN_IN_METHOD="facebook.com";yi.PROVIDER_ID="facebook.com";var Pn=class n extends xn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Rn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return n.credential(t,r)}catch{return null}}};Pn.GOOGLE_SIGN_IN_METHOD="google.com";Pn.PROVIDER_ID="google.com";var _i=class n extends xn{constructor(){super("github.com")}static credential(e){return Rn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};_i.GITHUB_SIGN_IN_METHOD="github.com";_i.PROVIDER_ID="github.com";var Ii=class n extends xn{constructor(){super("twitter.com")}static credential(e,t){return Rn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return n.credential(t,r)}catch{return null}}};Ii.TWITTER_SIGN_IN_METHOD="twitter.com";Ii.PROVIDER_ID="twitter.com";var vi=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){let o=await ln._fromIdTokenResponse(e,r,i),a=vd(r);return new n({user:o,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let i=vd(r);return new n({user:e,providerId:i,_tokenResponse:r,operationType:t})}};function vd(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}var ic=class n extends nt{constructor(e,t,r,i){super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new n(e,t,r,i)}};function ef(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?ic._fromErrorAndOperation(n,o,e,r):o})}async function x_(n,e,t=!1){let r=await di(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return vi._forOperation(n,"link",r)}async function P_(n,e,t=!1){let{auth:r}=n;if(rt(r.app))return Promise.reject(bn(r));let i="reauthenticate";try{let o=await di(n,ef(r,i,e,n),t);U(o.idToken,r,"internal-error");let a=gc(o.idToken);U(a,r,"internal-error");let{sub:u}=a;return U(n.uid===u,r,"user-mismatch"),vi._forOperation(n,i,o)}catch(o){throw o?.code==="auth/user-not-found"&&at(r,"user-mismatch"),o}}async function C_(n,e,t=!1){if(rt(n.app))return Promise.reject(bn(n));let r="signIn",i=await ef(n,r,e),o=await vi._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(o.user),o}function tf(n,e,t,r){return ze(n).onIdTokenChanged(e,t,r)}function nf(n,e,t){return ze(n).beforeAuthStateChanged(e,t)}function _c(n,e,t,r){return ze(n).onAuthStateChanged(e,t,r)}function Ic(n){return ze(n).signOut()}function wd(n,e){return je(n,"POST","/v2/accounts/mfaEnrollment:start",Le(n,e))}function k_(n,e){return je(n,"POST","/v2/accounts/mfaEnrollment:finalize",Le(n,e))}function D_(n,e){return je(n,"POST","/v2/accounts/mfaEnrollment:start",Le(n,e))}function N_(n,e){return je(n,"POST","/v2/accounts/mfaEnrollment:finalize",Le(n,e))}var Fs="__sak";var Us=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Fs,"1"),this.storage.removeItem(Fs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};var O_=1e3,V_=10,Bs=class extends Us{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Hd(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,u,l)=>{this.notifyListeners(a,l)});return}let r=e.key;t?this.detachListener():this.stopPolling();let i=()=>{let a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},o=this.storage.getItem(r);o_()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,V_):i()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},O_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};Bs.type="LOCAL";var rf=Bs;var M_=1e3;function Wa(n){let e=n.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),t=RegExp(`${e}=([^;]+)`);return document.cookie.match(t)?.[1]??null}function Ga(n){return`${window.location.protocol==="http:"?"__dev_":"__HOST-"}FIREBASE_${n.split(":")[3]}`}var sc=class{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(typeof window===void 0)return e;let t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set("finalTarget",e),t}async _isAvailable(){return typeof isSecureContext=="boolean"&&!isSecureContext||typeof navigator>"u"||typeof document>"u"?!1:navigator.cookieEnabled??!0}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;let t=Ga(e);return window.cookieStore?(await window.cookieStore.get(t))?.value:Wa(t)}async _remove(e){if(!this._isAvailable()||!await this._get(e))return;let r=Ga(e);document.cookie=`${r}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch(()=>{})}_addListener(e,t){if(!this._isAvailable())return;let r=Ga(e);if(window.cookieStore){let u=d=>{let p=d.changed.find(g=>g.name===r);p&&t(p.value),d.deleted.find(g=>g.name===r)&&t(null)},l=()=>window.cookieStore.removeEventListener("change",u);return this.listenerUnsubscribes.set(t,l),window.cookieStore.addEventListener("change",u)}let i=Wa(r),o=setInterval(()=>{let u=Wa(r);u!==i&&(t(u),i=u)},M_),a=()=>clearInterval(o);this.listenerUnsubscribes.set(t,a)}_removeListener(e,t){let r=this.listenerUnsubscribes.get(t);r&&(r(),this.listenerUnsubscribes.delete(t))}};sc.type="COOKIE";var qs=class extends Us{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};qs.type="SESSION";var vc=qs;function L_(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var zs=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;let r=new n(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:r,eventType:i,data:o}=t.data,a=this.handlersMap[i];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});let u=Array.from(a).map(async d=>d(t.origin,o)),l=await L_(u);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};zs.receivers=[];function wc(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}var oc=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let o,a;return new Promise((u,l)=>{let d=wc("",20);i.port1.start();let p=setTimeout(()=>{l(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(m){let g=m;if(g.data.eventId===d)switch(g.data.status){case"ack":clearTimeout(p),o=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),u(g.data.response);break;default:clearTimeout(p),clearTimeout(o),l(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}};function St(){return window}function F_(n){St().location.href=n}function sf(){return typeof St().WorkerGlobalScope<"u"&&typeof St().importScripts=="function"}async function U_(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function B_(){return navigator?.serviceWorker?.controller||null}function q_(){return sf()?self:null}var of="firebaseLocalStorageDb",z_=1,js="firebaseLocalStorage",af="fbase_key",Cn=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function eo(n,e){return n.transaction([js],e?"readwrite":"readonly").objectStore(js)}function j_(){let n=indexedDB.deleteDatabase(of);return new Cn(n).toPromise()}function ac(){let n=indexedDB.open(of,z_);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let r=n.result;try{r.createObjectStore(js,{keyPath:af})}catch(i){t(i)}}),n.addEventListener("success",async()=>{let r=n.result;r.objectStoreNames.contains(js)?e(r):(r.close(),await j_(),e(await ac()))})})}async function Ed(n,e,t){let r=eo(n,!0).put({[af]:e,value:t});return new Cn(r).toPromise()}async function $_(n,e){let t=eo(n,!1).get(e),r=await new Cn(t).toPromise();return r===void 0?null:r.value}function Td(n,e){let t=eo(n,!0).delete(e);return new Cn(t).toPromise()}var W_=800,G_=3,$s=class{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ac(),this.db)}async _withRetries(e){let t=0;for(;;)try{let r=await this._openDb();return await e(r)}catch(r){if(t++>G_)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return sf()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=zs._getInstance(q_()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await U_(),!this.activeServiceWorker)return;this.sender=new oc(this.activeServiceWorker);let e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||B_()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await ac();return await Ed(e,Fs,"1"),await Td(e,Fs),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Ed(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(r=>$_(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Td(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(i=>{let o=eo(i,!1).getAll();return new Cn(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],r=new Set;if(e.length!==0)for(let{fbase_key:i,value:o}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(o)&&(this.notifyListeners(i,o),t.push(i));for(let i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),W_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};$s.type="LOCAL";var cf=$s;function bd(n,e){return je(n,"POST","/v2/accounts/mfaSignIn:start",Le(n,e))}function H_(n,e){return je(n,"POST","/v2/accounts/mfaSignIn:finalize",Le(n,e))}function K_(n,e){return je(n,"POST","/v2/accounts/mfaSignIn:finalize",Le(n,e))}var JE=Jd("rcb"),YE=new Sn(3e4,6e4);var Ss="recaptcha";async function Q_(n,e,t){if(!n._getRecaptchaConfig())try{await f_(n)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let r;if(typeof e=="string"?r={phoneNumber:e}:r=e,"session"in r){let i=r.session;if("phoneNumber"in r){U(i.type==="enroll",n,"internal-error");let o={idToken:i.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await hi(n,o,"mfaSmsEnrollment",async(d,p)=>{if(p.phoneEnrollmentInfo.captchaResponse===li){U(t?.type===Ss,d,"argument-error");let m=await Ha(d,p,t);return wd(d,m)}return wd(d,p)},"PHONE_PROVIDER").catch(d=>Promise.reject(d))).phoneSessionInfo.sessionInfo}else{U(i.type==="signin",n,"internal-error");let o=r.multiFactorHint?.uid||r.multiFactorUid;U(o,n,"missing-multi-factor-info");let a={mfaPendingCredential:i.credential,mfaEnrollmentId:o,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await hi(n,a,"mfaSmsSignIn",async(p,m)=>{if(m.phoneSignInInfo.captchaResponse===li){U(t?.type===Ss,p,"argument-error");let g=await Ha(p,m,t);return bd(p,g)}return bd(p,m)},"PHONE_PROVIDER").catch(p=>Promise.reject(p))).phoneResponseInfo.sessionInfo}}else{let i={phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await hi(n,i,"sendVerificationCode",async(l,d)=>{if(d.captchaResponse===li){U(t?.type===Ss,l,"argument-error");let p=await Ha(l,d,t);return Id(l,p)}return Id(l,d)},"PHONE_PROVIDER").catch(l=>Promise.reject(l))).sessionInfo}}finally{t?._reset()}}async function Ha(n,e,t){U(t.type===Ss,n,"argument-error");let r=await t.verify();U(typeof r=="string",n,"argument-error");let i={...e};if("phoneEnrollmentInfo"in i){let o=i.phoneEnrollmentInfo.phoneNumber,a=i.phoneEnrollmentInfo.captchaResponse,u=i.phoneEnrollmentInfo.clientType,l=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:o,recaptchaToken:r,captchaResponse:a,clientType:u,recaptchaVersion:l}}),i}else if("phoneSignInInfo"in i){let o=i.phoneSignInInfo.captchaResponse,a=i.phoneSignInInfo.clientType,u=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:o,clientType:a,recaptchaVersion:u}}),i}else return Object.assign(i,{recaptchaToken:r}),i}var wi=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=Dn(e)}verifyPhoneNumber(e,t){return Q_(this.auth,e,ze(t))}static credential(e,t){return mi._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?mi._fromTokenResponse(t,r):null}};wi.PROVIDER_ID="phone";wi.PHONE_SIGN_IN_METHOD="phone";function uf(n,e){return e?Lt(e):(U(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}var Ei=class extends An{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return lr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return lr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return lr(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function J_(n){return C_(n.auth,new Ei(n),n.bypassAuthState)}function Y_(n){let{auth:e,user:t}=n;return U(t,e,"internal-error"),P_(t,new Ei(n),n.bypassAuthState)}async function X_(n){let{auth:e,user:t}=n;return U(t,e,"internal-error"),x_(t,new Ei(n),n.bypassAuthState)}var Ws=class{constructor(e,t,r,i,o=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:i,tenantId:o,error:a,type:u}=e;if(a){this.reject(a);return}let l={auth:this.auth,requestUri:t,sessionId:r,tenantId:o||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(l))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return J_;case"linkViaPopup":case"linkViaRedirect":return X_;case"reauthViaPopup":case"reauthViaRedirect":return Y_;default:at(this.auth,"internal-error")}}resolve(e){Ft(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ft(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var Z_=new Sn(2e3,1e4);async function Ec(n,e,t){if(rt(n.app))return Promise.reject(mt(n,"operation-not-supported-in-this-environment"));let r=Dn(n);Gy(n,e,gi);let i=uf(r,t);return new Gs(r,"signInViaPopup",e,i).executeNotNull()}var Gs=class n extends Ws{constructor(e,t,r,i,o){super(e,t,i,o),this.provider=r,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return U(e,this.auth,"internal-error"),e}async onExecution(){Ft(this.filter.length===1,"Popup operations only handle one event");let e=wc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(mt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(mt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(mt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Z_.get())};e()}};Gs.currentPopupAction=null;var eI="pendingRedirect",As=new Map,cc=class extends Ws{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=As.get(this.auth._key());if(!e){try{let r=await tI(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}As.set(this.auth._key(),e)}return this.bypassAuthState||As.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function tI(n,e){let t=iI(e),r=rI(n);if(!await r._isAvailable())return!1;let i=await r._get(t)==="true";return await r._remove(t),i}function nI(n,e){As.set(n._key(),e)}function rI(n){return Lt(n._redirectPersistence)}function iI(n){return bs(eI,n.config.apiKey,n.name)}async function sI(n,e,t=!1){if(rt(n.app))return Promise.reject(bn(n));let r=Dn(n),i=uf(r,e),a=await new cc(r,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}var oI=10*60*1e3,uc=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!aI(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!lf(e)){let r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(mt(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=oI&&this.cachedEventUids.clear(),this.cachedEventUids.has(Sd(e))}saveEventToCache(e){this.cachedEventUids.add(Sd(e)),this.lastProcessedEventTime=Date.now()}};function Sd(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function lf({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function aI(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return lf(n);default:return!1}}async function cI(n,e={}){return je(n,"GET","/v1/projects",e)}var uI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,lI=/^https?/;async function hI(n){if(n.config.emulator)return;let{authorizedDomains:e}=await cI(n);for(let t of e)try{if(dI(t))return}catch{}at(n,"unauthorized-domain")}function dI(n){let e=Qa(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){let a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!lI.test(t))return!1;if(uI.test(n))return r===n;let i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}var fI=new Sn(3e4,6e4);function Ad(){let n=St().___jsl;if(n?.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function pI(n){return new Promise((e,t)=>{function r(){Ad(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ad(),t(mt(n,"network-request-failed"))},timeout:fI.get()})}if(St().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(St().gapi?.load)r();else{let i=Jd("iframefcb");return St()[i]=()=>{gapi.load?r():t(mt(n,"network-request-failed"))},Qd(`${h_()}?onload=${i}`).catch(o=>t(o))}}).catch(e=>{throw Rs=null,e})}var Rs=null;function mI(n){return Rs=Rs||pI(n),Rs}var gI=new Sn(5e3,15e3),yI="__/auth/iframe",_I="emulator/auth/iframe",II={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},vI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function wI(n){let e=n.config;U(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?mc(e,_I):`https://${n.config.authDomain}/${yI}`,r={apiKey:e.apiKey,appName:n.name,v:cn},i=vI.get(n.config.apiHost);i&&(r.eid=i);let o=n._getFrameworks();return o.length&&(r.fw=o.join(",")),`${t}?${ar(r).slice(1)}`}async function EI(n){let e=await mI(n),t=St().gapi;return U(t,n,"internal-error"),e.open({where:document.body,url:wI(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:II,dontclear:!0},r=>new Promise(async(i,o)=>{await r.restyle({setHideOnLeave:!1});let a=mt(n,"network-request-failed"),u=St().setTimeout(()=>{o(a)},gI.get());function l(){St().clearTimeout(u),i(r)}r.ping(l).then(l,()=>{o(a)})}))}var TI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},bI=500,SI=600,AI="_blank",RI="http://localhost",Hs=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function xI(n,e,t,r=bI,i=SI){let o=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString(),u="",l={...TI,width:r.toString(),height:i.toString(),top:o,left:a},d=Me().toLowerCase();t&&(u=zd(d)?AI:t),Bd(d)&&(e=e||RI,l.scrollbars="yes");let p=Object.entries(l).reduce((g,[S,P])=>`${g}${S}=${P},`,"");if(s_(d)&&u!=="_self")return PI(e||"",u),new Hs(null);let m=window.open(e||"",u,p);U(m,n,"popup-blocked");try{m.focus()}catch{}return new Hs(m)}function PI(n,e){let t=document.createElement("a");t.href=n,t.target=e;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}var CI="__/auth/handler",kI="emulator/auth/handler",DI=encodeURIComponent("fac");async function Rd(n,e,t,r,i,o){U(n.config.authDomain,n,"auth-domain-config-required"),U(n.config.apiKey,n,"invalid-api-key");let a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:cn,eventId:i};if(e instanceof gi){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Yh(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(let[p,m]of Object.entries(o||{}))a[p]=m}if(e instanceof xn){let p=e.getScopes().filter(m=>m!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);let u=a;for(let p of Object.keys(u))u[p]===void 0&&delete u[p];let l=await n._getAppCheckToken(),d=l?`#${DI}=${encodeURIComponent(l)}`:"";return`${NI(n)}?${ar(u).slice(1)}${d}`}function NI({config:n}){return n.emulator?mc(n,kI):`https://${n.authDomain}/${CI}`}var Ka="webStorageSupport",lc=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=vc,this._completeRedirectFn=sI,this._overrideRedirectResult=nI}async _openPopup(e,t,r,i){Ft(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");let o=await Rd(e,t,r,Qa(),i);return xI(e,o,wc())}async _openRedirect(e,t,r,i){await this._originValidation(e);let o=await Rd(e,t,r,Qa(),i);return F_(o),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:i,promise:o}=this.eventManagers[t];return i?Promise.resolve(i):(Ft(o,"If manager is not set, promise should be"),o)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await EI(e),r=new uc(e);return t.register("authEvent",i=>(U(i?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ka,{type:Ka},i=>{let o=i?.[0]?.[Ka];o!==void 0&&t(!!o),at(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=hI(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Hd()||qd()||yc()}},hf=lc,Ks=class{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return bt("unexpected MultiFactorSessionType")}}},hc=class n extends Ks{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,r){return k_(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return H_(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},Qs=class{constructor(){}static assertion(e){return hc._fromCredential(e)}};Qs.FACTOR_ID="phone";var Js=class{static assertionForEnrollment(e,t){return Ys._fromSecret(e,t)}static assertionForSignIn(e,t){return Ys._fromEnrollmentId(e,t)}static async generateSecret(e){let t=e;U(typeof t.user?.auth<"u","internal-error");let r=await D_(t.user.auth,{idToken:t.credential,totpEnrollmentInfo:{}});return Xs._fromStartTotpMfaEnrollmentResponse(r,t.user.auth)}};Js.FACTOR_ID="totp";var Ys=class n extends Ks{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,r){return U(typeof this.secret<"u",e,"argument-error"),N_(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){U(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let r={verificationCode:this.otp};return K_(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},Xs=class n{constructor(e,t,r,i,o,a,u){this.sessionInfo=a,this.auth=u,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=o}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){let r=!1;return(Es(e)||Es(t))&&(r=!0),r&&(Es(e)&&(e=this.auth.currentUser?.email||"unknownuser"),Es(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function Es(n){return typeof n>"u"||n?.length===0}var xd="@firebase/auth",Pd="1.12.1";var dc=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){U(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function OI(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function VI(n){an(new ot("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:a,authDomain:u}=r.options;U(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});let l={apiKey:a,authDomain:u,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Kd(n)},d=new tc(r,i,o,l);return p_(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),an(new ot("auth-internal",e=>{let t=Dn(e.getProvider("auth").getImmediate());return(r=>new dc(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),pt(xd,Pd,OI(n)),pt(xd,Pd,"esm2020")}var MI=5*60,LI=Ra("authIdTokenMaxAge")||MI,Cd=null,FI=n=>async e=>{let t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>LI)return;let i=t?.token;Cd!==i&&(Cd=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function Tc(n=ws()){let e=si(n,"auth");if(e.isInitialized())return e.getImmediate();let t=Yd(n,{popupRedirectResolver:hf,persistence:[cf,rf,vc]}),r=Ra("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){let o=new URL(r,location.origin);if(location.origin===o.origin){let a=FI(o.toString());nf(t,a,()=>a(t.currentUser)),tf(t,u=>a(u))}}let i=Sa("auth");return i&&Xd(t,`http://${i}`),t}function UI(){return document.getElementsByTagName("head")?.[0]??document}u_({loadJS(n){return new Promise((e,t)=>{let r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{let o=mt("internal-error");o.customData=i,t(o)},r.type="text/javascript",r.charset="UTF-8",UI().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});VI("Browser");var df=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},ff={};var Ut,bc;(function(){var n;function e(E,y){function v(){}v.prototype=y.prototype,E.F=y.prototype,E.prototype=new v,E.prototype.constructor=E,E.D=function(_,w,T){for(var I=Array(arguments.length-2),ye=2;ye<arguments.length;ye++)I[ye-2]=arguments[ye];return y.prototype[w].apply(_,I)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,y,v){v||(v=0);let _=Array(16);if(typeof y=="string")for(var w=0;w<16;++w)_[w]=y.charCodeAt(v++)|y.charCodeAt(v++)<<8|y.charCodeAt(v++)<<16|y.charCodeAt(v++)<<24;else for(w=0;w<16;++w)_[w]=y[v++]|y[v++]<<8|y[v++]<<16|y[v++]<<24;y=E.g[0],v=E.g[1],w=E.g[2];let T=E.g[3],I;I=y+(T^v&(w^T))+_[0]+3614090360&4294967295,y=v+(I<<7&4294967295|I>>>25),I=T+(w^y&(v^w))+_[1]+3905402710&4294967295,T=y+(I<<12&4294967295|I>>>20),I=w+(v^T&(y^v))+_[2]+606105819&4294967295,w=T+(I<<17&4294967295|I>>>15),I=v+(y^w&(T^y))+_[3]+3250441966&4294967295,v=w+(I<<22&4294967295|I>>>10),I=y+(T^v&(w^T))+_[4]+4118548399&4294967295,y=v+(I<<7&4294967295|I>>>25),I=T+(w^y&(v^w))+_[5]+1200080426&4294967295,T=y+(I<<12&4294967295|I>>>20),I=w+(v^T&(y^v))+_[6]+2821735955&4294967295,w=T+(I<<17&4294967295|I>>>15),I=v+(y^w&(T^y))+_[7]+4249261313&4294967295,v=w+(I<<22&4294967295|I>>>10),I=y+(T^v&(w^T))+_[8]+1770035416&4294967295,y=v+(I<<7&4294967295|I>>>25),I=T+(w^y&(v^w))+_[9]+2336552879&4294967295,T=y+(I<<12&4294967295|I>>>20),I=w+(v^T&(y^v))+_[10]+4294925233&4294967295,w=T+(I<<17&4294967295|I>>>15),I=v+(y^w&(T^y))+_[11]+2304563134&4294967295,v=w+(I<<22&4294967295|I>>>10),I=y+(T^v&(w^T))+_[12]+1804603682&4294967295,y=v+(I<<7&4294967295|I>>>25),I=T+(w^y&(v^w))+_[13]+4254626195&4294967295,T=y+(I<<12&4294967295|I>>>20),I=w+(v^T&(y^v))+_[14]+2792965006&4294967295,w=T+(I<<17&4294967295|I>>>15),I=v+(y^w&(T^y))+_[15]+1236535329&4294967295,v=w+(I<<22&4294967295|I>>>10),I=y+(w^T&(v^w))+_[1]+4129170786&4294967295,y=v+(I<<5&4294967295|I>>>27),I=T+(v^w&(y^v))+_[6]+3225465664&4294967295,T=y+(I<<9&4294967295|I>>>23),I=w+(y^v&(T^y))+_[11]+643717713&4294967295,w=T+(I<<14&4294967295|I>>>18),I=v+(T^y&(w^T))+_[0]+3921069994&4294967295,v=w+(I<<20&4294967295|I>>>12),I=y+(w^T&(v^w))+_[5]+3593408605&4294967295,y=v+(I<<5&4294967295|I>>>27),I=T+(v^w&(y^v))+_[10]+38016083&4294967295,T=y+(I<<9&4294967295|I>>>23),I=w+(y^v&(T^y))+_[15]+3634488961&4294967295,w=T+(I<<14&4294967295|I>>>18),I=v+(T^y&(w^T))+_[4]+3889429448&4294967295,v=w+(I<<20&4294967295|I>>>12),I=y+(w^T&(v^w))+_[9]+568446438&4294967295,y=v+(I<<5&4294967295|I>>>27),I=T+(v^w&(y^v))+_[14]+3275163606&4294967295,T=y+(I<<9&4294967295|I>>>23),I=w+(y^v&(T^y))+_[3]+4107603335&4294967295,w=T+(I<<14&4294967295|I>>>18),I=v+(T^y&(w^T))+_[8]+1163531501&4294967295,v=w+(I<<20&4294967295|I>>>12),I=y+(w^T&(v^w))+_[13]+2850285829&4294967295,y=v+(I<<5&4294967295|I>>>27),I=T+(v^w&(y^v))+_[2]+4243563512&4294967295,T=y+(I<<9&4294967295|I>>>23),I=w+(y^v&(T^y))+_[7]+1735328473&4294967295,w=T+(I<<14&4294967295|I>>>18),I=v+(T^y&(w^T))+_[12]+2368359562&4294967295,v=w+(I<<20&4294967295|I>>>12),I=y+(v^w^T)+_[5]+4294588738&4294967295,y=v+(I<<4&4294967295|I>>>28),I=T+(y^v^w)+_[8]+2272392833&4294967295,T=y+(I<<11&4294967295|I>>>21),I=w+(T^y^v)+_[11]+1839030562&4294967295,w=T+(I<<16&4294967295|I>>>16),I=v+(w^T^y)+_[14]+4259657740&4294967295,v=w+(I<<23&4294967295|I>>>9),I=y+(v^w^T)+_[1]+2763975236&4294967295,y=v+(I<<4&4294967295|I>>>28),I=T+(y^v^w)+_[4]+1272893353&4294967295,T=y+(I<<11&4294967295|I>>>21),I=w+(T^y^v)+_[7]+4139469664&4294967295,w=T+(I<<16&4294967295|I>>>16),I=v+(w^T^y)+_[10]+3200236656&4294967295,v=w+(I<<23&4294967295|I>>>9),I=y+(v^w^T)+_[13]+681279174&4294967295,y=v+(I<<4&4294967295|I>>>28),I=T+(y^v^w)+_[0]+3936430074&4294967295,T=y+(I<<11&4294967295|I>>>21),I=w+(T^y^v)+_[3]+3572445317&4294967295,w=T+(I<<16&4294967295|I>>>16),I=v+(w^T^y)+_[6]+76029189&4294967295,v=w+(I<<23&4294967295|I>>>9),I=y+(v^w^T)+_[9]+3654602809&4294967295,y=v+(I<<4&4294967295|I>>>28),I=T+(y^v^w)+_[12]+3873151461&4294967295,T=y+(I<<11&4294967295|I>>>21),I=w+(T^y^v)+_[15]+530742520&4294967295,w=T+(I<<16&4294967295|I>>>16),I=v+(w^T^y)+_[2]+3299628645&4294967295,v=w+(I<<23&4294967295|I>>>9),I=y+(w^(v|~T))+_[0]+4096336452&4294967295,y=v+(I<<6&4294967295|I>>>26),I=T+(v^(y|~w))+_[7]+1126891415&4294967295,T=y+(I<<10&4294967295|I>>>22),I=w+(y^(T|~v))+_[14]+2878612391&4294967295,w=T+(I<<15&4294967295|I>>>17),I=v+(T^(w|~y))+_[5]+4237533241&4294967295,v=w+(I<<21&4294967295|I>>>11),I=y+(w^(v|~T))+_[12]+1700485571&4294967295,y=v+(I<<6&4294967295|I>>>26),I=T+(v^(y|~w))+_[3]+2399980690&4294967295,T=y+(I<<10&4294967295|I>>>22),I=w+(y^(T|~v))+_[10]+4293915773&4294967295,w=T+(I<<15&4294967295|I>>>17),I=v+(T^(w|~y))+_[1]+2240044497&4294967295,v=w+(I<<21&4294967295|I>>>11),I=y+(w^(v|~T))+_[8]+1873313359&4294967295,y=v+(I<<6&4294967295|I>>>26),I=T+(v^(y|~w))+_[15]+4264355552&4294967295,T=y+(I<<10&4294967295|I>>>22),I=w+(y^(T|~v))+_[6]+2734768916&4294967295,w=T+(I<<15&4294967295|I>>>17),I=v+(T^(w|~y))+_[13]+1309151649&4294967295,v=w+(I<<21&4294967295|I>>>11),I=y+(w^(v|~T))+_[4]+4149444226&4294967295,y=v+(I<<6&4294967295|I>>>26),I=T+(v^(y|~w))+_[11]+3174756917&4294967295,T=y+(I<<10&4294967295|I>>>22),I=w+(y^(T|~v))+_[2]+718787259&4294967295,w=T+(I<<15&4294967295|I>>>17),I=v+(T^(w|~y))+_[9]+3951481745&4294967295,E.g[0]=E.g[0]+y&4294967295,E.g[1]=E.g[1]+(w+(I<<21&4294967295|I>>>11))&4294967295,E.g[2]=E.g[2]+w&4294967295,E.g[3]=E.g[3]+T&4294967295}r.prototype.v=function(E,y){y===void 0&&(y=E.length);let v=y-this.blockSize,_=this.C,w=this.h,T=0;for(;T<y;){if(w==0)for(;T<=v;)i(this,E,T),T+=this.blockSize;if(typeof E=="string"){for(;T<y;)if(_[w++]=E.charCodeAt(T++),w==this.blockSize){i(this,_),w=0;break}}else for(;T<y;)if(_[w++]=E[T++],w==this.blockSize){i(this,_),w=0;break}}this.h=w,this.o+=y},r.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var y=1;y<E.length-8;++y)E[y]=0;y=this.o*8;for(var v=E.length-8;v<E.length;++v)E[v]=y&255,y/=256;for(this.v(E),E=Array(16),y=0,v=0;v<4;++v)for(let _=0;_<32;_+=8)E[y++]=this.g[v]>>>_&255;return E};function o(E,y){var v=u;return Object.prototype.hasOwnProperty.call(v,E)?v[E]:v[E]=y(E)}function a(E,y){this.h=y;let v=[],_=!0;for(let w=E.length-1;w>=0;w--){let T=E[w]|0;_&&T==y||(v[w]=T,_=!1)}this.g=v}var u={};function l(E){return-128<=E&&E<128?o(E,function(y){return new a([y|0],y<0?-1:0)}):new a([E|0],E<0?-1:0)}function d(E){if(isNaN(E)||!isFinite(E))return m;if(E<0)return R(d(-E));let y=[],v=1;for(let _=0;E>=v;_++)y[_]=E/v|0,v*=4294967296;return new a(y,0)}function p(E,y){if(E.length==0)throw Error("number format error: empty string");if(y=y||10,y<2||36<y)throw Error("radix out of range: "+y);if(E.charAt(0)=="-")return R(p(E.substring(1),y));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');let v=d(Math.pow(y,8)),_=m;for(let T=0;T<E.length;T+=8){var w=Math.min(8,E.length-T);let I=parseInt(E.substring(T,T+w),y);w<8?(w=d(Math.pow(y,w)),_=_.j(w).add(d(I))):(_=_.j(v),_=_.add(d(I)))}return _}var m=l(0),g=l(1),S=l(16777216);n=a.prototype,n.m=function(){if(k(this))return-R(this).m();let E=0,y=1;for(let v=0;v<this.g.length;v++){let _=this.i(v);E+=(_>=0?_:4294967296+_)*y,y*=4294967296}return E},n.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(P(this))return"0";if(k(this))return"-"+R(this).toString(E);let y=d(Math.pow(E,6));var v=this;let _="";for(;;){let w=Q(v,y).g;v=M(v,w.j(y));let T=((v.g.length>0?v.g[0]:v.h)>>>0).toString(E);if(v=w,P(v))return T+_;for(;T.length<6;)T="0"+T;_=T+_}},n.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function P(E){if(E.h!=0)return!1;for(let y=0;y<E.g.length;y++)if(E.g[y]!=0)return!1;return!0}function k(E){return E.h==-1}n.l=function(E){return E=M(this,E),k(E)?-1:P(E)?0:1};function R(E){let y=E.g.length,v=[];for(let _=0;_<y;_++)v[_]=~E.g[_];return new a(v,~E.h).add(g)}n.abs=function(){return k(this)?R(this):this},n.add=function(E){let y=Math.max(this.g.length,E.g.length),v=[],_=0;for(let w=0;w<=y;w++){let T=_+(this.i(w)&65535)+(E.i(w)&65535),I=(T>>>16)+(this.i(w)>>>16)+(E.i(w)>>>16);_=I>>>16,T&=65535,I&=65535,v[w]=I<<16|T}return new a(v,v[v.length-1]&-2147483648?-1:0)};function M(E,y){return E.add(R(y))}n.j=function(E){if(P(this)||P(E))return m;if(k(this))return k(E)?R(this).j(R(E)):R(R(this).j(E));if(k(E))return R(this.j(R(E)));if(this.l(S)<0&&E.l(S)<0)return d(this.m()*E.m());let y=this.g.length+E.g.length,v=[];for(var _=0;_<2*y;_++)v[_]=0;for(_=0;_<this.g.length;_++)for(let w=0;w<E.g.length;w++){let T=this.i(_)>>>16,I=this.i(_)&65535,ye=E.i(w)>>>16,Oe=E.i(w)&65535;v[2*_+2*w]+=I*Oe,B(v,2*_+2*w),v[2*_+2*w+1]+=T*Oe,B(v,2*_+2*w+1),v[2*_+2*w+1]+=I*ye,B(v,2*_+2*w+1),v[2*_+2*w+2]+=T*ye,B(v,2*_+2*w+2)}for(E=0;E<y;E++)v[E]=v[2*E+1]<<16|v[2*E];for(E=y;E<2*y;E++)v[E]=0;return new a(v,0)};function B(E,y){for(;(E[y]&65535)!=E[y];)E[y+1]+=E[y]>>>16,E[y]&=65535,y++}function K(E,y){this.g=E,this.h=y}function Q(E,y){if(P(y))throw Error("division by zero");if(P(E))return new K(m,m);if(k(E))return y=Q(R(E),y),new K(R(y.g),R(y.h));if(k(y))return y=Q(E,R(y)),new K(R(y.g),y.h);if(E.g.length>30){if(k(E)||k(y))throw Error("slowDivide_ only works with positive integers.");for(var v=g,_=y;_.l(E)<=0;)v=pe(v),_=pe(_);var w=G(v,1),T=G(_,1);for(_=G(_,2),v=G(v,2);!P(_);){var I=T.add(_);I.l(E)<=0&&(w=w.add(v),T=I),_=G(_,1),v=G(v,1)}return y=M(E,w.j(y)),new K(w,y)}for(w=m;E.l(y)>=0;){for(v=Math.max(1,Math.floor(E.m()/y.m())),_=Math.ceil(Math.log(v)/Math.LN2),_=_<=48?1:Math.pow(2,_-48),T=d(v),I=T.j(y);k(I)||I.l(E)>0;)v-=_,T=d(v),I=T.j(y);P(T)&&(T=g),w=w.add(T),E=M(E,I)}return new K(w,E)}n.B=function(E){return Q(this,E).h},n.and=function(E){let y=Math.max(this.g.length,E.g.length),v=[];for(let _=0;_<y;_++)v[_]=this.i(_)&E.i(_);return new a(v,this.h&E.h)},n.or=function(E){let y=Math.max(this.g.length,E.g.length),v=[];for(let _=0;_<y;_++)v[_]=this.i(_)|E.i(_);return new a(v,this.h|E.h)},n.xor=function(E){let y=Math.max(this.g.length,E.g.length),v=[];for(let _=0;_<y;_++)v[_]=this.i(_)^E.i(_);return new a(v,this.h^E.h)};function pe(E){let y=E.g.length+1,v=[];for(let _=0;_<y;_++)v[_]=E.i(_)<<1|E.i(_-1)>>>31;return new a(v,E.h)}function G(E,y){let v=y>>5;y%=32;let _=E.g.length-v,w=[];for(let T=0;T<_;T++)w[T]=y>0?E.i(T+v)>>>y|E.i(T+v+1)<<32-y:E.i(T+v);return new a(w,E.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,bc=ff.Md5=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=p,Ut=ff.Integer=a}).apply(typeof df<"u"?df:typeof self<"u"?self:typeof window<"u"?window:{});var to=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Bt={};var Sc,BI,dr,Ac,Ti,no,Rc,xc,Pc;(function(){var n,e=Object.defineProperty;function t(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof to=="object"&&to];for(var c=0;c<s.length;++c){var h=s[c];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function i(s,c){if(c)e:{var h=r;s=s.split(".");for(var f=0;f<s.length-1;f++){var b=s[f];if(!(b in h))break e;h=h[b]}s=s[s.length-1],f=h[s],c=c(f),c!=f&&c!=null&&e(h,s,{configurable:!0,writable:!0,value:c})}}i("Symbol.dispose",function(s){return s||Symbol("Symbol.dispose")}),i("Array.prototype.values",function(s){return s||function(){return this[Symbol.iterator]()}}),i("Object.entries",function(s){return s||function(c){var h=[],f;for(f in c)Object.prototype.hasOwnProperty.call(c,f)&&h.push([f,c[f]]);return h}});var o=o||{},a=this||self;function u(s){var c=typeof s;return c=="object"&&s!=null||c=="function"}function l(s,c,h){return s.call.apply(s.bind,arguments)}function d(s,c,h){return d=l,d.apply(null,arguments)}function p(s,c){var h=Array.prototype.slice.call(arguments,1);return function(){var f=h.slice();return f.push.apply(f,arguments),s.apply(this,f)}}function m(s,c){function h(){}h.prototype=c.prototype,s.Z=c.prototype,s.prototype=new h,s.prototype.constructor=s,s.Ob=function(f,b,A){for(var D=Array(arguments.length-2),H=2;H<arguments.length;H++)D[H-2]=arguments[H];return c.prototype[b].apply(f,D)}}var g=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?s=>s&&AsyncContext.Snapshot.wrap(s):s=>s;function S(s){let c=s.length;if(c>0){let h=Array(c);for(let f=0;f<c;f++)h[f]=s[f];return h}return[]}function P(s,c){for(let f=1;f<arguments.length;f++){let b=arguments[f];var h=typeof b;if(h=h!="object"?h:b?Array.isArray(b)?"array":h:"null",h=="array"||h=="object"&&typeof b.length=="number"){h=s.length||0;let A=b.length||0;s.length=h+A;for(let D=0;D<A;D++)s[h+D]=b[D]}else s.push(b)}}class k{constructor(c,h){this.i=c,this.j=h,this.h=0,this.g=null}get(){let c;return this.h>0?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function R(s){a.setTimeout(()=>{throw s},0)}function M(){var s=E;let c=null;return s.g&&(c=s.g,s.g=s.g.next,s.g||(s.h=null),c.next=null),c}class B{constructor(){this.h=this.g=null}add(c,h){let f=K.get();f.set(c,h),this.h?this.h.next=f:this.g=f,this.h=f}}var K=new k(()=>new Q,s=>s.reset());class Q{constructor(){this.next=this.g=this.h=null}set(c,h){this.h=c,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let pe,G=!1,E=new B,y=()=>{let s=Promise.resolve(void 0);pe=()=>{s.then(v)}};function v(){for(var s;s=M();){try{s.h.call(s.g)}catch(h){R(h)}var c=K;c.j(s),c.h<100&&(c.h++,s.next=c.g,c.g=s)}G=!1}function _(){this.u=this.u,this.C=this.C}_.prototype.u=!1,_.prototype.dispose=function(){this.u||(this.u=!0,this.N())},_.prototype[Symbol.dispose]=function(){this.dispose()},_.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function w(s,c){this.type=s,this.g=this.target=c,this.defaultPrevented=!1}w.prototype.h=function(){this.defaultPrevented=!0};var T=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var s=!1,c=Object.defineProperty({},"passive",{get:function(){s=!0}});try{let h=()=>{};a.addEventListener("test",h,c),a.removeEventListener("test",h,c)}catch{}return s}();function I(s){return/^[\s\xa0]*$/.test(s)}function ye(s,c){w.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s&&this.init(s,c)}m(ye,w),ye.prototype.init=function(s,c){let h=this.type=s.type,f=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;this.target=s.target||s.srcElement,this.g=c,c=s.relatedTarget,c||(h=="mouseover"?c=s.fromElement:h=="mouseout"&&(c=s.toElement)),this.relatedTarget=c,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=s.pointerType,this.state=s.state,this.i=s,s.defaultPrevented&&ye.Z.h.call(this)},ye.prototype.h=function(){ye.Z.h.call(this);let s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var Oe="closure_listenable_"+(Math.random()*1e6|0),It=0;function st(s,c,h,f,b){this.listener=s,this.proxy=null,this.src=c,this.type=h,this.capture=!!f,this.ha=b,this.key=++It,this.da=this.fa=!1}function Ye(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function Xe(s,c,h){for(let f in s)c.call(h,s[f],f,s)}function Qt(s,c){for(let h in s)c.call(void 0,s[h],h,s)}function Xn(s){let c={};for(let h in s)c[h]=s[h];return c}let Zn="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function yn(s,c){let h,f;for(let b=1;b<arguments.length;b++){f=arguments[b];for(h in f)s[h]=f[h];for(let A=0;A<Zn.length;A++)h=Zn[A],Object.prototype.hasOwnProperty.call(f,h)&&(s[h]=f[h])}}function He(s){this.src=s,this.g={},this.h=0}He.prototype.add=function(s,c,h,f,b){let A=s.toString();s=this.g[A],s||(s=this.g[A]=[],this.h++);let D=N(s,c,f,b);return D>-1?(c=s[D],h||(c.fa=!1)):(c=new st(c,this.src,A,!!f,b),c.fa=h,s.push(c)),c};function er(s,c){let h=c.type;if(h in s.g){var f=s.g[h],b=Array.prototype.indexOf.call(f,c,void 0),A;(A=b>=0)&&Array.prototype.splice.call(f,b,1),A&&(Ye(c),s.g[h].length==0&&(delete s.g[h],s.h--))}}function N(s,c,h,f){for(let b=0;b<s.length;++b){let A=s[b];if(!A.da&&A.listener==c&&A.capture==!!h&&A.ha==f)return b}return-1}var Z="closure_lm_"+(Math.random()*1e6|0),oe={};function vt(s,c,h,f,b){if(f&&f.once)return Ur(s,c,h,f,b);if(Array.isArray(c)){for(let A=0;A<c.length;A++)vt(s,c[A],h,f,b);return null}return h=Ze(h),s&&s[Oe]?s.J(c,h,u(f)?!!f.capture:!!f,b):Se(s,c,h,!1,f,b)}function Se(s,c,h,f,b,A){if(!c)throw Error("Invalid event type");let D=u(b)?!!b.capture:!!b,H=he(s);if(H||(s[Z]=H=new He(s)),h=H.add(c,h,f,D,A),h.proxy)return h;if(f=ht(),h.proxy=f,f.src=s,f.listener=h,s.addEventListener)T||(b=D),b===void 0&&(b=!1),s.addEventListener(c.toString(),f,b);else if(s.attachEvent)s.attachEvent(L(c.toString()),f);else if(s.addListener&&s.removeListener)s.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return h}function ht(){function s(h){return c.call(s.src,s.listener,h)}let c=me;return s}function Ur(s,c,h,f,b){if(Array.isArray(c)){for(let A=0;A<c.length;A++)Ur(s,c[A],h,f,b);return null}return h=Ze(h),s&&s[Oe]?s.K(c,h,u(f)?!!f.capture:!!f,b):Se(s,c,h,!0,f,b)}function Br(s,c,h,f,b){if(Array.isArray(c))for(var A=0;A<c.length;A++)Br(s,c[A],h,f,b);else f=u(f)?!!f.capture:!!f,h=Ze(h),s&&s[Oe]?(s=s.i,A=String(c).toString(),A in s.g&&(c=s.g[A],h=N(c,h,f,b),h>-1&&(Ye(c[h]),Array.prototype.splice.call(c,h,1),c.length==0&&(delete s.g[A],s.h--)))):s&&(s=he(s))&&(c=s.g[c.toString()],s=-1,c&&(s=N(c,h,f,b)),(h=s>-1?c[s]:null)&&tr(h))}function tr(s){if(typeof s!="number"&&s&&!s.da){var c=s.src;if(c&&c[Oe])er(c.i,s);else{var h=s.type,f=s.proxy;c.removeEventListener?c.removeEventListener(h,f,s.capture):c.detachEvent?c.detachEvent(L(h),f):c.addListener&&c.removeListener&&c.removeListener(f),(h=he(c))?(er(h,s),h.h==0&&(h.src=null,c[Z]=null)):Ye(s)}}}function L(s){return s in oe?oe[s]:oe[s]="on"+s}function me(s,c){if(s.da)s=!0;else{c=new ye(c,this);let h=s.listener,f=s.ha||s.src;s.fa&&tr(s),s=h.call(f,c)}return s}function he(s){return s=s[Z],s instanceof He?s:null}var Ee="__closure_events_fn_"+(Math.random()*1e9>>>0);function Ze(s){return typeof s=="function"?s:(s[Ee]||(s[Ee]=function(c){return s.handleEvent(c)}),s[Ee])}function ae(){_.call(this),this.i=new He(this),this.M=this,this.G=null}m(ae,_),ae.prototype[Oe]=!0,ae.prototype.removeEventListener=function(s,c,h,f){Br(this,s,c,h,f)};function Pe(s,c){var h,f=s.G;if(f)for(h=[];f;f=f.G)h.push(f);if(s=s.M,f=c.type||c,typeof c=="string")c=new w(c,s);else if(c instanceof w)c.target=c.target||s;else{var b=c;c=new w(f,s),yn(c,b)}b=!0;let A,D;if(h)for(D=h.length-1;D>=0;D--)A=c.g=h[D],b=te(A,f,!0,c)&&b;if(A=c.g=s,b=te(A,f,!0,c)&&b,b=te(A,f,!1,c)&&b,h)for(D=0;D<h.length;D++)A=c.g=h[D],b=te(A,f,!1,c)&&b}ae.prototype.N=function(){if(ae.Z.N.call(this),this.i){var s=this.i;for(let c in s.g){let h=s.g[c];for(let f=0;f<h.length;f++)Ye(h[f]);delete s.g[c],s.h--}}this.G=null},ae.prototype.J=function(s,c,h,f){return this.i.add(String(s),c,!1,h,f)},ae.prototype.K=function(s,c,h,f){return this.i.add(String(s),c,!0,h,f)};function te(s,c,h,f){if(c=s.i.g[String(c)],!c)return!0;c=c.concat();let b=!0;for(let A=0;A<c.length;++A){let D=c[A];if(D&&!D.da&&D.capture==h){let H=D.listener,Ne=D.ha||D.src;D.fa&&er(s.i,D),b=H.call(Ne,f)!==!1&&b}}return b&&!f.defaultPrevented}function $(s,c){if(typeof s!="function")if(s&&typeof s.handleEvent=="function")s=d(s.handleEvent,s);else throw Error("Invalid listener argument");return Number(c)>2147483647?-1:a.setTimeout(s,c||0)}function de(s){s.g=$(()=>{s.g=null,s.i&&(s.i=!1,de(s))},s.l);let c=s.h;s.h=null,s.m.apply(null,c)}class ie extends _{constructor(c,h){super(),this.m=c,this.l=h,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:de(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ce(s){_.call(this),this.h=s,this.g={}}m(ce,_);var Ce=[];function ke(s){Xe(s.g,function(c,h){this.g.hasOwnProperty(h)&&tr(c)},s),s.g={}}ce.prototype.N=function(){ce.Z.N.call(this),ke(this)},ce.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var De=a.JSON.stringify,et=a.JSON.parse,dt=class{stringify(s){return a.JSON.stringify(s,void 0)}parse(s){return a.JSON.parse(s,void 0)}};function Ke(){}function Jt(){}var _n={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Ji(){w.call(this,"d")}m(Ji,w);function nr(){w.call(this,"c")}m(nr,w);var Ot={},Yi=null;function Xi(){return Yi=Yi||new ae}Ot.Ia="serverreachability";function Dl(s){w.call(this,Ot.Ia,s)}m(Dl,w);function qr(s){let c=Xi();Pe(c,new Dl(c))}Ot.STAT_EVENT="statevent";function Nl(s,c){w.call(this,Ot.STAT_EVENT,s),this.stat=c}m(Nl,w);function We(s){let c=Xi();Pe(c,new Nl(c,s))}Ot.Ja="timingevent";function Ol(s,c){w.call(this,Ot.Ja,s),this.size=c}m(Ol,w);function zr(s,c){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){s()},c)}function jr(){this.g=!0}jr.prototype.ua=function(){this.g=!1};function Bm(s,c,h,f,b,A){s.info(function(){if(s.g)if(A){var D="",H=A.split("&");for(let se=0;se<H.length;se++){var Ne=H[se].split("=");if(Ne.length>1){let Ve=Ne[0];Ne=Ne[1];let Et=Ve.split("_");D=Et.length>=2&&Et[1]=="type"?D+(Ve+"="+Ne+"&"):D+(Ve+"=redacted&")}}}else D=null;else D=A;return"XMLHTTP REQ ("+f+") [attempt "+b+"]: "+c+`
`+h+`
`+D})}function qm(s,c,h,f,b,A,D){s.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+b+"]: "+c+`
`+h+`
`+A+" "+D})}function rr(s,c,h,f){s.info(function(){return"XMLHTTP TEXT ("+c+"): "+jm(s,h)+(f?" "+f:"")})}function zm(s,c){s.info(function(){return"TIMEOUT: "+c})}jr.prototype.info=function(){};function jm(s,c){if(!s.g)return c;if(!c)return null;try{let A=JSON.parse(c);if(A){for(s=0;s<A.length;s++)if(Array.isArray(A[s])){var h=A[s];if(!(h.length<2)){var f=h[1];if(Array.isArray(f)&&!(f.length<1)){var b=f[0];if(b!="noop"&&b!="stop"&&b!="close")for(let D=1;D<f.length;D++)f[D]=""}}}}return De(A)}catch{return c}}var Zi={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Vl={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Ml;function ia(){}m(ia,Ke),ia.prototype.g=function(){return new XMLHttpRequest},Ml=new ia;function $r(s){return encodeURIComponent(String(s))}function $m(s){var c=1;s=s.split(":");let h=[];for(;c>0&&s.length;)h.push(s.shift()),c--;return s.length&&h.push(s.join(":")),h}function Yt(s,c,h,f){this.j=s,this.i=c,this.l=h,this.S=f||1,this.V=new ce(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Ll}function Ll(){this.i=null,this.g="",this.h=!1}var Fl={},sa={};function oa(s,c,h){s.M=1,s.A=ts(wt(c)),s.u=h,s.R=!0,Ul(s,null)}function Ul(s,c){s.F=Date.now(),es(s),s.B=wt(s.A);var h=s.B,f=s.S;Array.isArray(f)||(f=[String(f)]),Xl(h.i,"t",f),s.C=0,h=s.j.L,s.h=new Ll,s.g=gh(s.j,h?c:null,!s.u),s.P>0&&(s.O=new ie(d(s.Y,s,s.g),s.P)),c=s.V,h=s.g,f=s.ba;var b="readystatechange";Array.isArray(b)||(b&&(Ce[0]=b.toString()),b=Ce);for(let A=0;A<b.length;A++){let D=vt(h,b[A],f||c.handleEvent,!1,c.h||c);if(!D)break;c.g[D.key]=D}c=s.J?Xn(s.J):{},s.u?(s.v||(s.v="POST"),c["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.B,s.v,s.u,c)):(s.v="GET",s.g.ea(s.B,s.v,null,c)),qr(),Bm(s.i,s.v,s.B,s.l,s.S,s.u)}Yt.prototype.ba=function(s){s=s.target;let c=this.O;c&&en(s)==3?c.j():this.Y(s)},Yt.prototype.Y=function(s){try{if(s==this.g)e:{let H=en(this.g),Ne=this.g.ya(),se=this.g.ca();if(!(H<3)&&(H!=3||this.g&&(this.h.h||this.g.la()||sh(this.g)))){this.K||H!=4||Ne==7||(Ne==8||se<=0?qr(3):qr(2)),aa(this);var c=this.g.ca();this.X=c;var h=Wm(this);if(this.o=c==200,qm(this.i,this.v,this.B,this.l,this.S,H,c),this.o){if(this.U&&!this.L){t:{if(this.g){var f,b=this.g;if((f=b.g?b.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!I(f)){var A=f;break t}}A=null}if(s=A)rr(this.i,this.l,s,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,ca(this,s);else{this.o=!1,this.m=3,We(12),In(this),Wr(this);break e}}if(this.R){s=!0;let Ve;for(;!this.K&&this.C<h.length;)if(Ve=Gm(this,h),Ve==sa){H==4&&(this.m=4,We(14),s=!1),rr(this.i,this.l,null,"[Incomplete Response]");break}else if(Ve==Fl){this.m=4,We(15),rr(this.i,this.l,h,"[Invalid Chunk]"),s=!1;break}else rr(this.i,this.l,Ve,null),ca(this,Ve);if(Bl(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),H!=4||h.length!=0||this.h.h||(this.m=1,We(16),s=!1),this.o=this.o&&s,!s)rr(this.i,this.l,h,"[Invalid Chunked Response]"),In(this),Wr(this);else if(h.length>0&&!this.W){this.W=!0;var D=this.j;D.g==this&&D.aa&&!D.P&&(D.j.info("Great, no buffering proxy detected. Bytes received: "+h.length),ma(D),D.P=!0,We(11))}}else rr(this.i,this.l,h,null),ca(this,h);H==4&&In(this),this.o&&!this.K&&(H==4?dh(this.j,this):(this.o=!1,es(this)))}else og(this.g),c==400&&h.indexOf("Unknown SID")>0?(this.m=3,We(12)):(this.m=0,We(13)),In(this),Wr(this)}}}catch{}finally{}};function Wm(s){if(!Bl(s))return s.g.la();let c=sh(s.g);if(c==="")return"";let h="",f=c.length,b=en(s.g)==4;if(!s.h.i){if(typeof TextDecoder>"u")return In(s),Wr(s),"";s.h.i=new a.TextDecoder}for(let A=0;A<f;A++)s.h.h=!0,h+=s.h.i.decode(c[A],{stream:!(b&&A==f-1)});return c.length=0,s.h.g+=h,s.C=0,s.h.g}function Bl(s){return s.g?s.v=="GET"&&s.M!=2&&s.j.Aa:!1}function Gm(s,c){var h=s.C,f=c.indexOf(`
`,h);return f==-1?sa:(h=Number(c.substring(h,f)),isNaN(h)?Fl:(f+=1,f+h>c.length?sa:(c=c.slice(f,f+h),s.C=f+h,c)))}Yt.prototype.cancel=function(){this.K=!0,In(this)};function es(s){s.T=Date.now()+s.H,ql(s,s.H)}function ql(s,c){if(s.D!=null)throw Error("WatchDog timer not null");s.D=zr(d(s.aa,s),c)}function aa(s){s.D&&(a.clearTimeout(s.D),s.D=null)}Yt.prototype.aa=function(){this.D=null;let s=Date.now();s-this.T>=0?(zm(this.i,this.B),this.M!=2&&(qr(),We(17)),In(this),this.m=2,Wr(this)):ql(this,this.T-s)};function Wr(s){s.j.I==0||s.K||dh(s.j,s)}function In(s){aa(s);var c=s.O;c&&typeof c.dispose=="function"&&c.dispose(),s.O=null,ke(s.V),s.g&&(c=s.g,s.g=null,c.abort(),c.dispose())}function ca(s,c){try{var h=s.j;if(h.I!=0&&(h.g==s||ua(h.h,s))){if(!s.L&&ua(h.h,s)&&h.I==3){try{var f=h.Ba.g.parse(c)}catch{f=null}if(Array.isArray(f)&&f.length==3){var b=f;if(b[0]==0){e:if(!h.v){if(h.g)if(h.g.F+3e3<s.F)as(h),ss(h);else break e;pa(h),We(18)}}else h.xa=b[1],0<h.xa-h.K&&b[2]<37500&&h.F&&h.A==0&&!h.C&&(h.C=zr(d(h.Va,h),6e3));$l(h.h)<=1&&h.ta&&(h.ta=void 0)}else wn(h,11)}else if((s.L||h.g==s)&&as(h),!I(c))for(b=h.Ba.g.parse(c),c=0;c<b.length;c++){let se=b[c],Ve=se[0];if(!(Ve<=h.K))if(h.K=Ve,se=se[1],h.I==2)if(se[0]=="c"){h.M=se[1],h.ba=se[2];let Et=se[3];Et!=null&&(h.ka=Et,h.j.info("VER="+h.ka));let En=se[4];En!=null&&(h.za=En,h.j.info("SVER="+h.za));let tn=se[5];tn!=null&&typeof tn=="number"&&tn>0&&(f=1.5*tn,h.O=f,h.j.info("backChannelRequestTimeoutMs_="+f)),f=h;let nn=s.g;if(nn){let us=nn.g?nn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(us){var A=f.h;A.g||us.indexOf("spdy")==-1&&us.indexOf("quic")==-1&&us.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(la(A,A.h),A.h=null))}if(f.G){let ga=nn.g?nn.g.getResponseHeader("X-HTTP-Session-Id"):null;ga&&(f.wa=ga,fe(f.J,f.G,ga))}}h.I=3,h.l&&h.l.ra(),h.aa&&(h.T=Date.now()-s.F,h.j.info("Handshake RTT: "+h.T+"ms")),f=h;var D=s;if(f.na=mh(f,f.L?f.ba:null,f.W),D.L){Wl(f.h,D);var H=D,Ne=f.O;Ne&&(H.H=Ne),H.D&&(aa(H),es(H)),f.g=D}else lh(f);h.i.length>0&&os(h)}else se[0]!="stop"&&se[0]!="close"||wn(h,7);else h.I==3&&(se[0]=="stop"||se[0]=="close"?se[0]=="stop"?wn(h,7):fa(h):se[0]!="noop"&&h.l&&h.l.qa(se),h.A=0)}}qr(4)}catch{}}var Hm=class{constructor(s,c){this.g=s,this.map=c}};function zl(s){this.l=s||10,a.PerformanceNavigationTiming?(s=a.performance.getEntriesByType("navigation"),s=s.length>0&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function jl(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function $l(s){return s.h?1:s.g?s.g.size:0}function ua(s,c){return s.h?s.h==c:s.g?s.g.has(c):!1}function la(s,c){s.g?s.g.add(c):s.h=c}function Wl(s,c){s.h&&s.h==c?s.h=null:s.g&&s.g.has(c)&&s.g.delete(c)}zl.prototype.cancel=function(){if(this.i=Gl(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let s of this.g.values())s.cancel();this.g.clear()}};function Gl(s){if(s.h!=null)return s.i.concat(s.h.G);if(s.g!=null&&s.g.size!==0){let c=s.i;for(let h of s.g.values())c=c.concat(h.G);return c}return S(s.i)}var Hl=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Km(s,c){if(s){s=s.split("&");for(let h=0;h<s.length;h++){let f=s[h].indexOf("="),b,A=null;f>=0?(b=s[h].substring(0,f),A=s[h].substring(f+1)):b=s[h],c(b,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function Xt(s){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let c;s instanceof Xt?(this.l=s.l,Gr(this,s.j),this.o=s.o,this.g=s.g,Hr(this,s.u),this.h=s.h,ha(this,Zl(s.i)),this.m=s.m):s&&(c=String(s).match(Hl))?(this.l=!1,Gr(this,c[1]||"",!0),this.o=Kr(c[2]||""),this.g=Kr(c[3]||"",!0),Hr(this,c[4]),this.h=Kr(c[5]||"",!0),ha(this,c[6]||"",!0),this.m=Kr(c[7]||"")):(this.l=!1,this.i=new Jr(null,this.l))}Xt.prototype.toString=function(){let s=[];var c=this.j;c&&s.push(Qr(c,Kl,!0),":");var h=this.g;return(h||c=="file")&&(s.push("//"),(c=this.o)&&s.push(Qr(c,Kl,!0),"@"),s.push($r(h).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.u,h!=null&&s.push(":",String(h))),(h=this.h)&&(this.g&&h.charAt(0)!="/"&&s.push("/"),s.push(Qr(h,h.charAt(0)=="/"?Ym:Jm,!0))),(h=this.i.toString())&&s.push("?",h),(h=this.m)&&s.push("#",Qr(h,Zm)),s.join("")},Xt.prototype.resolve=function(s){let c=wt(this),h=!!s.j;h?Gr(c,s.j):h=!!s.o,h?c.o=s.o:h=!!s.g,h?c.g=s.g:h=s.u!=null;var f=s.h;if(h)Hr(c,s.u);else if(h=!!s.h){if(f.charAt(0)!="/")if(this.g&&!this.h)f="/"+f;else{var b=c.h.lastIndexOf("/");b!=-1&&(f=c.h.slice(0,b+1)+f)}if(b=f,b==".."||b==".")f="";else if(b.indexOf("./")!=-1||b.indexOf("/.")!=-1){f=b.lastIndexOf("/",0)==0,b=b.split("/");let A=[];for(let D=0;D<b.length;){let H=b[D++];H=="."?f&&D==b.length&&A.push(""):H==".."?((A.length>1||A.length==1&&A[0]!="")&&A.pop(),f&&D==b.length&&A.push("")):(A.push(H),f=!0)}f=A.join("/")}else f=b}return h?c.h=f:h=s.i.toString()!=="",h?ha(c,Zl(s.i)):h=!!s.m,h&&(c.m=s.m),c};function wt(s){return new Xt(s)}function Gr(s,c,h){s.j=h?Kr(c,!0):c,s.j&&(s.j=s.j.replace(/:$/,""))}function Hr(s,c){if(c){if(c=Number(c),isNaN(c)||c<0)throw Error("Bad port number "+c);s.u=c}else s.u=null}function ha(s,c,h){c instanceof Jr?(s.i=c,eg(s.i,s.l)):(h||(c=Qr(c,Xm)),s.i=new Jr(c,s.l))}function fe(s,c,h){s.i.set(c,h)}function ts(s){return fe(s,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),s}function Kr(s,c){return s?c?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function Qr(s,c,h){return typeof s=="string"?(s=encodeURI(s).replace(c,Qm),h&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function Qm(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var Kl=/[#\/\?@]/g,Jm=/[#\?:]/g,Ym=/[#\?]/g,Xm=/[#\?@]/g,Zm=/#/g;function Jr(s,c){this.h=this.g=null,this.i=s||null,this.j=!!c}function vn(s){s.g||(s.g=new Map,s.h=0,s.i&&Km(s.i,function(c,h){s.add(decodeURIComponent(c.replace(/\+/g," ")),h)}))}n=Jr.prototype,n.add=function(s,c){vn(this),this.i=null,s=ir(this,s);let h=this.g.get(s);return h||this.g.set(s,h=[]),h.push(c),this.h+=1,this};function Ql(s,c){vn(s),c=ir(s,c),s.g.has(c)&&(s.i=null,s.h-=s.g.get(c).length,s.g.delete(c))}function Jl(s,c){return vn(s),c=ir(s,c),s.g.has(c)}n.forEach=function(s,c){vn(this),this.g.forEach(function(h,f){h.forEach(function(b){s.call(c,b,f,this)},this)},this)};function Yl(s,c){vn(s);let h=[];if(typeof c=="string")Jl(s,c)&&(h=h.concat(s.g.get(ir(s,c))));else for(s=Array.from(s.g.values()),c=0;c<s.length;c++)h=h.concat(s[c]);return h}n.set=function(s,c){return vn(this),this.i=null,s=ir(this,s),Jl(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[c]),this.h+=1,this},n.get=function(s,c){return s?(s=Yl(this,s),s.length>0?String(s[0]):c):c};function Xl(s,c,h){Ql(s,c),h.length>0&&(s.i=null,s.g.set(ir(s,c),S(h)),s.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";let s=[],c=Array.from(this.g.keys());for(let f=0;f<c.length;f++){var h=c[f];let b=$r(h);h=Yl(this,h);for(let A=0;A<h.length;A++){let D=b;h[A]!==""&&(D+="="+$r(h[A])),s.push(D)}}return this.i=s.join("&")};function Zl(s){let c=new Jr;return c.i=s.i,s.g&&(c.g=new Map(s.g),c.h=s.h),c}function ir(s,c){return c=String(c),s.j&&(c=c.toLowerCase()),c}function eg(s,c){c&&!s.j&&(vn(s),s.i=null,s.g.forEach(function(h,f){let b=f.toLowerCase();f!=b&&(Ql(this,f),Xl(this,b,h))},s)),s.j=c}function tg(s,c){let h=new jr;if(a.Image){let f=new Image;f.onload=p(Zt,h,"TestLoadImage: loaded",!0,c,f),f.onerror=p(Zt,h,"TestLoadImage: error",!1,c,f),f.onabort=p(Zt,h,"TestLoadImage: abort",!1,c,f),f.ontimeout=p(Zt,h,"TestLoadImage: timeout",!1,c,f),a.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=s}else c(!1)}function ng(s,c){let h=new jr,f=new AbortController,b=setTimeout(()=>{f.abort(),Zt(h,"TestPingServer: timeout",!1,c)},1e4);fetch(s,{signal:f.signal}).then(A=>{clearTimeout(b),A.ok?Zt(h,"TestPingServer: ok",!0,c):Zt(h,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(b),Zt(h,"TestPingServer: error",!1,c)})}function Zt(s,c,h,f,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),f(h)}catch{}}function rg(){this.g=new dt}function ns(s){this.i=s.Sb||null,this.h=s.ab||!1}m(ns,Ke),ns.prototype.g=function(){return new rs(this.i,this.h)};function rs(s,c){ae.call(this),this.H=s,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}m(rs,ae),n=rs.prototype,n.open=function(s,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=s,this.D=c,this.readyState=1,Xr(this)},n.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;let c={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};s&&(c.body=s),(this.H||a).fetch(new Request(this.D,c)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Yr(this)),this.readyState=0},n.Pa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,Xr(this)),this.g&&(this.readyState=3,Xr(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;eh(this)}else s.text().then(this.Oa.bind(this),this.ga.bind(this))};function eh(s){s.j.read().then(s.Ma.bind(s)).catch(s.ga.bind(s))}n.Ma=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var c=s.value?s.value:new Uint8Array(0);(c=this.B.decode(c,{stream:!s.done}))&&(this.response=this.responseText+=c)}s.done?Yr(this):Xr(this),this.readyState==3&&eh(this)}},n.Oa=function(s){this.g&&(this.response=this.responseText=s,Yr(this))},n.Na=function(s){this.g&&(this.response=s,Yr(this))},n.ga=function(){this.g&&Yr(this)};function Yr(s){s.readyState=4,s.l=null,s.j=null,s.B=null,Xr(s)}n.setRequestHeader=function(s,c){this.A.append(s,c)},n.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";let s=[],c=this.h.entries();for(var h=c.next();!h.done;)h=h.value,s.push(h[0]+": "+h[1]),h=c.next();return s.join(`\r
`)};function Xr(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(rs.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function th(s){let c="";return Xe(s,function(h,f){c+=f,c+=":",c+=h,c+=`\r
`}),c}function da(s,c,h){e:{for(f in h){var f=!1;break e}f=!0}f||(h=th(h),typeof s=="string"?h!=null&&$r(h):fe(s,c,h))}function _e(s){ae.call(this),this.headers=new Map,this.L=s||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}m(_e,ae);var ig=/^https?$/i,sg=["POST","PUT"];n=_e.prototype,n.Fa=function(s){this.H=s},n.ea=function(s,c,h,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);c=c?c.toUpperCase():"GET",this.D=s,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Ml.g(),this.g.onreadystatechange=g(d(this.Ca,this));try{this.B=!0,this.g.open(c,String(s),!0),this.B=!1}catch(A){nh(this,A);return}if(s=h||"",h=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var b in f)h.set(b,f[b]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(let A of f.keys())h.set(A,f.get(A));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(h.keys()).find(A=>A.toLowerCase()=="content-type"),b=a.FormData&&s instanceof a.FormData,!(Array.prototype.indexOf.call(sg,c,void 0)>=0)||f||b||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[A,D]of h)this.g.setRequestHeader(A,D);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(s),this.v=!1}catch(A){nh(this,A)}};function nh(s,c){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=c,s.o=5,rh(s),is(s)}function rh(s){s.A||(s.A=!0,Pe(s,"complete"),Pe(s,"error"))}n.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=s||7,Pe(this,"complete"),Pe(this,"abort"),is(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),is(this,!0)),_e.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?ih(this):this.Xa())},n.Xa=function(){ih(this)};function ih(s){if(s.h&&typeof o<"u"){if(s.v&&en(s)==4)setTimeout(s.Ca.bind(s),0);else if(Pe(s,"readystatechange"),en(s)==4){s.h=!1;try{let A=s.ca();e:switch(A){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var h;if(!(h=c)){var f;if(f=A===0){let D=String(s.D).match(Hl)[1]||null;!D&&a.self&&a.self.location&&(D=a.self.location.protocol.slice(0,-1)),f=!ig.test(D?D.toLowerCase():"")}h=f}if(h)Pe(s,"complete"),Pe(s,"success");else{s.o=6;try{var b=en(s)>2?s.g.statusText:""}catch{b=""}s.l=b+" ["+s.ca()+"]",rh(s)}}finally{is(s)}}}}function is(s,c){if(s.g){s.m&&(clearTimeout(s.m),s.m=null);let h=s.g;s.g=null,c||Pe(s,"ready");try{h.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function en(s){return s.g?s.g.readyState:0}n.ca=function(){try{return en(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(s){if(this.g){var c=this.g.responseText;return s&&c.indexOf(s)==0&&(c=c.substring(s.length)),et(c)}};function sh(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.F){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function og(s){let c={};s=(s.g&&en(s)>=2&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<s.length;f++){if(I(s[f]))continue;var h=$m(s[f]);let b=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();let A=c[b]||[];c[b]=A,A.push(h)}Qt(c,function(f){return f.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Zr(s,c,h){return h&&h.internalChannelParams&&h.internalChannelParams[s]||c}function oh(s){this.za=0,this.i=[],this.j=new jr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Zr("failFast",!1,s),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Zr("baseRetryDelayMs",5e3,s),this.Za=Zr("retryDelaySeedMs",1e4,s),this.Ta=Zr("forwardChannelMaxRetries",2,s),this.va=Zr("forwardChannelRequestTimeoutMs",2e4,s),this.ma=s&&s.xmlHttpFactory||void 0,this.Ua=s&&s.Rb||void 0,this.Aa=s&&s.useFetchStreams||!1,this.O=void 0,this.L=s&&s.supportsCrossDomainXhr||!1,this.M="",this.h=new zl(s&&s.concurrentRequestLimit),this.Ba=new rg,this.S=s&&s.fastHandshake||!1,this.R=s&&s.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=s&&s.Pb||!1,s&&s.ua&&this.j.ua(),s&&s.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&s&&s.detectBufferingProxy||!1,this.ia=void 0,s&&s.longPollingTimeout&&s.longPollingTimeout>0&&(this.ia=s.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=oh.prototype,n.ka=8,n.I=1,n.connect=function(s,c,h,f){We(0),this.W=s,this.H=c||{},h&&f!==void 0&&(this.H.OSID=h,this.H.OAID=f),this.F=this.X,this.J=mh(this,null,this.W),os(this)};function fa(s){if(ah(s),s.I==3){var c=s.V++,h=wt(s.J);if(fe(h,"SID",s.M),fe(h,"RID",c),fe(h,"TYPE","terminate"),ei(s,h),c=new Yt(s,s.j,c),c.M=2,c.A=ts(wt(h)),h=!1,a.navigator&&a.navigator.sendBeacon)try{h=a.navigator.sendBeacon(c.A.toString(),"")}catch{}!h&&a.Image&&(new Image().src=c.A,h=!0),h||(c.g=gh(c.j,null),c.g.ea(c.A)),c.F=Date.now(),es(c)}ph(s)}function ss(s){s.g&&(ma(s),s.g.cancel(),s.g=null)}function ah(s){ss(s),s.v&&(a.clearTimeout(s.v),s.v=null),as(s),s.h.cancel(),s.m&&(typeof s.m=="number"&&a.clearTimeout(s.m),s.m=null)}function os(s){if(!jl(s.h)&&!s.m){s.m=!0;var c=s.Ea;pe||y(),G||(pe(),G=!0),E.add(c,s),s.D=0}}function ag(s,c){return $l(s.h)>=s.h.j-(s.m?1:0)?!1:s.m?(s.i=c.G.concat(s.i),!0):s.I==1||s.I==2||s.D>=(s.Sa?0:s.Ta)?!1:(s.m=zr(d(s.Ea,s,c),fh(s,s.D)),s.D++,!0)}n.Ea=function(s){if(this.m)if(this.m=null,this.I==1){if(!s){this.V=Math.floor(Math.random()*1e5),s=this.V++;let b=new Yt(this,this.j,s),A=this.o;if(this.U&&(A?(A=Xn(A),yn(A,this.U)):A=this.U),this.u!==null||this.R||(b.J=A,A=null),this.S)e:{for(var c=0,h=0;h<this.i.length;h++){t:{var f=this.i[h];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(c+=f,c>4096){c=h;break e}if(c===4096||h===this.i.length-1){c=h+1;break e}}c=1e3}else c=1e3;c=uh(this,b,c),h=wt(this.J),fe(h,"RID",s),fe(h,"CVER",22),this.G&&fe(h,"X-HTTP-Session-Id",this.G),ei(this,h),A&&(this.R?c="headers="+$r(th(A))+"&"+c:this.u&&da(h,this.u,A)),la(this.h,b),this.Ra&&fe(h,"TYPE","init"),this.S?(fe(h,"$req",c),fe(h,"SID","null"),b.U=!0,oa(b,h,null)):oa(b,h,c),this.I=2}}else this.I==3&&(s?ch(this,s):this.i.length==0||jl(this.h)||ch(this))};function ch(s,c){var h;c?h=c.l:h=s.V++;let f=wt(s.J);fe(f,"SID",s.M),fe(f,"RID",h),fe(f,"AID",s.K),ei(s,f),s.u&&s.o&&da(f,s.u,s.o),h=new Yt(s,s.j,h,s.D+1),s.u===null&&(h.J=s.o),c&&(s.i=c.G.concat(s.i)),c=uh(s,h,1e3),h.H=Math.round(s.va*.5)+Math.round(s.va*.5*Math.random()),la(s.h,h),oa(h,f,c)}function ei(s,c){s.H&&Xe(s.H,function(h,f){fe(c,f,h)}),s.l&&Xe({},function(h,f){fe(c,f,h)})}function uh(s,c,h){h=Math.min(s.i.length,h);let f=s.l?d(s.l.Ka,s.l,s):null;e:{var b=s.i;let H=-1;for(;;){let Ne=["count="+h];H==-1?h>0?(H=b[0].g,Ne.push("ofs="+H)):H=0:Ne.push("ofs="+H);let se=!0;for(let Ve=0;Ve<h;Ve++){var A=b[Ve].g;let Et=b[Ve].map;if(A-=H,A<0)H=Math.max(0,b[Ve].g-100),se=!1;else try{A="req"+A+"_"||"";try{var D=Et instanceof Map?Et:Object.entries(Et);for(let[En,tn]of D){let nn=tn;u(tn)&&(nn=De(tn)),Ne.push(A+En+"="+encodeURIComponent(nn))}}catch(En){throw Ne.push(A+"type="+encodeURIComponent("_badmap")),En}}catch{f&&f(Et)}}if(se){D=Ne.join("&");break e}}D=void 0}return s=s.i.splice(0,h),c.G=s,D}function lh(s){if(!s.g&&!s.v){s.Y=1;var c=s.Da;pe||y(),G||(pe(),G=!0),E.add(c,s),s.A=0}}function pa(s){return s.g||s.v||s.A>=3?!1:(s.Y++,s.v=zr(d(s.Da,s),fh(s,s.A)),s.A++,!0)}n.Da=function(){if(this.v=null,hh(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var s=4*this.T;this.j.info("BP detection timer enabled: "+s),this.B=zr(d(this.Wa,this),s)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,We(10),ss(this),hh(this))};function ma(s){s.B!=null&&(a.clearTimeout(s.B),s.B=null)}function hh(s){s.g=new Yt(s,s.j,"rpc",s.Y),s.u===null&&(s.g.J=s.o),s.g.P=0;var c=wt(s.na);fe(c,"RID","rpc"),fe(c,"SID",s.M),fe(c,"AID",s.K),fe(c,"CI",s.F?"0":"1"),!s.F&&s.ia&&fe(c,"TO",s.ia),fe(c,"TYPE","xmlhttp"),ei(s,c),s.u&&s.o&&da(c,s.u,s.o),s.O&&(s.g.H=s.O);var h=s.g;s=s.ba,h.M=1,h.A=ts(wt(c)),h.u=null,h.R=!0,Ul(h,s)}n.Va=function(){this.C!=null&&(this.C=null,ss(this),pa(this),We(19))};function as(s){s.C!=null&&(a.clearTimeout(s.C),s.C=null)}function dh(s,c){var h=null;if(s.g==c){as(s),ma(s),s.g=null;var f=2}else if(ua(s.h,c))h=c.G,Wl(s.h,c),f=1;else return;if(s.I!=0){if(c.o)if(f==1){h=c.u?c.u.length:0,c=Date.now()-c.F;var b=s.D;f=Xi(),Pe(f,new Ol(f,h)),os(s)}else lh(s);else if(b=c.m,b==3||b==0&&c.X>0||!(f==1&&ag(s,c)||f==2&&pa(s)))switch(h&&h.length>0&&(c=s.h,c.i=c.i.concat(h)),b){case 1:wn(s,5);break;case 4:wn(s,10);break;case 3:wn(s,6);break;default:wn(s,2)}}}function fh(s,c){let h=s.Qa+Math.floor(Math.random()*s.Za);return s.isActive()||(h*=2),h*c}function wn(s,c){if(s.j.info("Error code "+c),c==2){var h=d(s.bb,s),f=s.Ua;let b=!f;f=new Xt(f||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Gr(f,"https"),ts(f),b?tg(f.toString(),h):ng(f.toString(),h)}else We(2);s.I=0,s.l&&s.l.pa(c),ph(s),ah(s)}n.bb=function(s){s?(this.j.info("Successfully pinged google.com"),We(2)):(this.j.info("Failed to ping google.com"),We(1))};function ph(s){if(s.I=0,s.ja=[],s.l){let c=Gl(s.h);(c.length!=0||s.i.length!=0)&&(P(s.ja,c),P(s.ja,s.i),s.h.i.length=0,S(s.i),s.i.length=0),s.l.oa()}}function mh(s,c,h){var f=h instanceof Xt?wt(h):new Xt(h);if(f.g!="")c&&(f.g=c+"."+f.g),Hr(f,f.u);else{var b=a.location;f=b.protocol,c=c?c+"."+b.hostname:b.hostname,b=+b.port;let A=new Xt(null);f&&Gr(A,f),c&&(A.g=c),b&&Hr(A,b),h&&(A.h=h),f=A}return h=s.G,c=s.wa,h&&c&&fe(f,h,c),fe(f,"VER",s.ka),ei(s,f),f}function gh(s,c,h){if(c&&!s.L)throw Error("Can't create secondary domain capable XhrIo object.");return c=s.Aa&&!s.ma?new _e(new ns({ab:h})):new _e(s.ma),c.Fa(s.L),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function yh(){}n=yh.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function cs(){}cs.prototype.g=function(s,c){return new tt(s,c)};function tt(s,c){ae.call(this),this.g=new oh(c),this.l=s,this.h=c&&c.messageUrlParams||null,s=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(s?s["X-WebChannel-Content-Type"]=c.messageContentType:s={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.sa&&(s?s["X-WebChannel-Client-Profile"]=c.sa:s={"X-WebChannel-Client-Profile":c.sa}),this.g.U=s,(s=c&&c.Qb)&&!I(s)&&(this.g.u=s),this.A=c&&c.supportsCrossDomainXhr||!1,this.v=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!I(c)&&(this.g.G=c,s=this.h,s!==null&&c in s&&(s=this.h,c in s&&delete s[c])),this.j=new sr(this)}m(tt,ae),tt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},tt.prototype.close=function(){fa(this.g)},tt.prototype.o=function(s){var c=this.g;if(typeof s=="string"){var h={};h.__data__=s,s=h}else this.v&&(h={},h.__data__=De(s),s=h);c.i.push(new Hm(c.Ya++,s)),c.I==3&&os(c)},tt.prototype.N=function(){this.g.l=null,delete this.j,fa(this.g),delete this.g,tt.Z.N.call(this)};function _h(s){Ji.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var c=s.__sm__;if(c){e:{for(let h in c){s=h;break e}s=void 0}(this.i=s)&&(s=this.i,c=c!==null&&s in c?c[s]:void 0),this.data=c}else this.data=s}m(_h,Ji);function Ih(){nr.call(this),this.status=1}m(Ih,nr);function sr(s){this.g=s}m(sr,yh),sr.prototype.ra=function(){Pe(this.g,"a")},sr.prototype.qa=function(s){Pe(this.g,new _h(s))},sr.prototype.pa=function(s){Pe(this.g,new Ih)},sr.prototype.oa=function(){Pe(this.g,"b")},cs.prototype.createWebChannel=cs.prototype.g,tt.prototype.send=tt.prototype.o,tt.prototype.open=tt.prototype.m,tt.prototype.close=tt.prototype.close,Pc=Bt.createWebChannelTransport=function(){return new cs},xc=Bt.getStatEventTarget=function(){return Xi()},Rc=Bt.Event=Ot,no=Bt.Stat={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Zi.NO_ERROR=0,Zi.TIMEOUT=8,Zi.HTTP_ERROR=6,Ti=Bt.ErrorCode=Zi,Vl.COMPLETE="complete",Ac=Bt.EventType=Vl,Jt.EventType=_n,_n.OPEN="a",_n.CLOSE="b",_n.ERROR="c",_n.MESSAGE="d",ae.prototype.listen=ae.prototype.J,dr=Bt.WebChannel=Jt,BI=Bt.FetchXmlHttpFactory=ns,_e.prototype.listenOnce=_e.prototype.K,_e.prototype.getLastError=_e.prototype.Ha,_e.prototype.getLastErrorCode=_e.prototype.ya,_e.prototype.getStatus=_e.prototype.ca,_e.prototype.getResponseJson=_e.prototype.La,_e.prototype.getResponseText=_e.prototype.la,_e.prototype.send=_e.prototype.ea,_e.prototype.setWithCredentials=_e.prototype.Fa,Sc=Bt.XhrIo=_e}).apply(typeof to<"u"?to:typeof self<"u"?self:typeof window<"u"?window:{});var Fe=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};Fe.UNAUTHENTICATED=new Fe(null),Fe.GOOGLE_CREDENTIALS=new Fe("google-credentials-uid"),Fe.FIRST_PARTY=new Fe("first-party-uid"),Fe.MOCK_USER=new Fe("mock-user");var Nr="12.10.0";function Xf(n){Nr=n}var Vn=new sn("@firebase/firestore");function fr(){return Vn.logLevel}function O(n,...e){if(Vn.logLevel<=J.DEBUG){let t=e.map(al);Vn.debug(`Firestore (${Nr}): ${n}`,...t)}}function zt(n,...e){if(Vn.logLevel<=J.ERROR){let t=e.map(al);Vn.error(`Firestore (${Nr}): ${n}`,...t)}}function jt(n,...e){if(Vn.logLevel<=J.WARN){let t=e.map(al);Vn.warn(`Firestore (${Nr}): ${n}`,...t)}}function al(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}function z(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Zf(n,r,t)}function Zf(n,e,t){let r=`FIRESTORE (${Nr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw zt(r),new Error(r)}function re(n,e,t,r){let i="Unexpected state";typeof t=="string"?i=t:r=t,n||Zf(e,i,r)}function j(n,e){return n}var x={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},F=class extends nt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var Rt=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};var uo=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},lo=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Fe.UNAUTHENTICATED))}shutdown(){}},Vc=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}},ho=class{constructor(e){this.t=e,this.currentUser=Fe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){re(this.o===void 0,42304);let r=this.i,i=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve(),o=new Rt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Rt,e.enqueueRetryable(()=>i(this.currentUser))};let a=()=>{let l=o;e.enqueueRetryable(async()=>{await l.promise,await i(this.currentUser)})},u=l=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(l=>u(l)),setTimeout(()=>{if(!this.auth){let l=this.t.getImmediate({optional:!0});l?u(l):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Rt)}},0),a()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(re(typeof r.accessToken=="string",31837,{l:r}),new uo(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){let e=this.auth&&this.auth.getUid();return re(e===null||typeof e=="string",2055,{h:e}),new Fe(e)}},Mc=class{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Fe.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);let e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}},Lc=class{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new Mc(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Fe.FIRST_PARTY))}shutdown(){}invalidateToken(){}},fo=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},po=class{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,rt(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){re(this.o===void 0,3512);let r=o=>{o.error!=null&&O("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);let a=o.token!==this.m;return this.m=o.token,O("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable(()=>r(o))};let i=o=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(o=>i(o)),setTimeout(()=>{if(!this.appCheck){let o=this.V.getImmediate({optional:!0});o?i(o):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new fo(this.p));let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(re(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new fo(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}};function qI(n){let e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}var Mn=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516),r="";for(;r.length<20;){let i=qI(40);for(let o=0;o<i.length;++o)r.length<20&&i[o]<t&&(r+=e.charAt(i[o]%62))}return r}};function ee(n,e){return n<e?-1:n>e?1:0}function Fc(n,e){let t=Math.min(n.length,e.length);for(let r=0;r<t;r++){let i=n.charAt(r),o=e.charAt(r);if(i!==o)return Cc(i)===Cc(o)?ee(i,o):Cc(i)?1:-1}return ee(n.length,e.length)}var zI=55296,jI=57343;function Cc(n){let e=n.charCodeAt(0);return e>=zI&&e<=jI}function vr(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}var pf="__name__",mo=class n{constructor(e,t,r){t===void 0?t=0:t>e.length&&z(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&z(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return n.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof n?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let i=0;i<r;i++){let o=n.compareSegments(e.get(i),t.get(i));if(o!==0)return o}return ee(e.length,t.length)}static compareSegments(e,t){let r=n.isNumericId(e),i=n.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?n.extractNumericId(e).compare(n.extractNumericId(t)):Fc(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Ut.fromString(e.substring(4,e.length-2))}},Ie=class n extends mo{construct(e,t,r){return new n(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new F(x.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new n(t)}static emptyPath(){return new n([])}},$I=/^[_a-zA-Z][_a-zA-Z0-9]*$/,Qe=class n extends mo{construct(e,t,r){return new n(e,t,r)}static isValidIdentifier(e){return $I.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),n.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===pf}static keyField(){return new n([pf])}static fromServerFormat(e){let t=[],r="",i=0,o=()=>{if(r.length===0)throw new F(x.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},a=!1;for(;i<e.length;){let u=e[i];if(u==="\\"){if(i+1===e.length)throw new F(x.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let l=e[i+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new F(x.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,i+=2}else u==="`"?(a=!a,i++):u!=="."||a?(r+=u,i++):(o(),i++)}if(o(),a)throw new F(x.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new n(t)}static emptyPath(){return new n([])}};var q=class n{constructor(e){this.path=e}static fromPath(e){return new n(Ie.fromString(e))}static fromName(e){return new n(Ie.fromString(e).popFirst(5))}static empty(){return new n(Ie.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ie.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Ie.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new n(new Ie(e.slice()))}};function WI(n,e,t){if(!t)throw new F(x.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function ep(n,e,t,r){if(e===!0&&r===!0)throw new F(x.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function mf(n){if(!q.isDocumentKey(n))throw new F(x.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function tp(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function $o(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":z(12329,{type:typeof n})}function Hn(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new F(x.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=$o(n);throw new F(x.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function Te(n,e){let t={typeString:n};return e&&(t.value=e),t}function Or(n,e){if(!tp(n))throw new F(x.INVALID_ARGUMENT,"JSON must be an object");let t;for(let r in e)if(e[r]){let i=e[r].typeString,o="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}let a=n[r];if(i&&typeof a!==i){t=`JSON field '${r}' must be a ${i}.`;break}if(o!==void 0&&a!==o.value){t=`Expected '${r}' field to equal '${o.value}'`;break}}if(t)throw new F(x.INVALID_ARGUMENT,t);return!0}var gf=-62135596800,yf=1e6,be=class n{static now(){return n.fromMillis(Date.now())}static fromDate(e){return n.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*yf);return new n(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new F(x.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new F(x.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<gf)throw new F(x.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new F(x.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/yf}_compareTo(e){return this.seconds===e.seconds?ee(this.nanoseconds,e.nanoseconds):ee(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:n._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Or(e,n._jsonSchema))return new n(e.seconds,e.nanoseconds)}valueOf(){let e=this.seconds-gf;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};be._jsonSchemaVersion="firestore/timestamp/1.0",be._jsonSchema={type:Te("string",be._jsonSchemaVersion),seconds:Te("number"),nanoseconds:Te("number")};var W=class n{static fromTimestamp(e){return new n(e)}static min(){return new n(new be(0,0))}static max(){return new n(new be(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var Pi=-1,go=class{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}};go.UNKNOWN_ID=-1;function GI(n,e){let t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=W.fromTimestamp(r===1e9?new be(t+1,0):new be(t,r));return new Ln(i,q.empty(),e)}function HI(n){return new Ln(n.readTime,n.key,Pi)}var Ln=class n{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new n(W.min(),q.empty(),Pi)}static max(){return new n(W.max(),q.empty(),Pi)}};function KI(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=q.comparator(n.documentKey,e.documentKey),t!==0?t:ee(n.largestBatchId,e.largestBatchId))}var QI="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",Uc=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}};async function Vr(n){if(n.code!==x.FAILED_PRECONDITION||n.message!==QI)throw n;O("LocalStore","Unexpectedly lost primary lease")}var C=class n{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&z(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new n((r,i)=>{this.nextCallback=o=>{this.wrapSuccess(e,o).next(r,i)},this.catchCallback=o=>{this.wrapFailure(t,o).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof n?t:n.resolve(t)}catch(t){return n.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):n.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):n.reject(t)}static resolve(e){return new n((t,r)=>{t(e)})}static reject(e){return new n((t,r)=>{r(e)})}static waitFor(e){return new n((t,r)=>{let i=0,o=0,a=!1;e.forEach(u=>{++i,u.next(()=>{++o,a&&o===i&&t()},l=>r(l))}),a=!0,o===i&&t()})}static or(e){let t=n.resolve(!1);for(let r of e)t=t.next(i=>i?n.resolve(i):r());return t}static forEach(e,t){let r=[];return e.forEach((i,o)=>{r.push(t.call(this,i,o))}),this.waitFor(r)}static mapArray(e,t){return new n((r,i)=>{let o=e.length,a=new Array(o),u=0;for(let l=0;l<o;l++){let d=l;t(e[d]).next(p=>{a[d]=p,++u,u===o&&r(a)},p=>i(p))}})}static doWhile(e,t){return new n((r,i)=>{let o=()=>{e()===!0?t().next(()=>{o()},i):r()};o()})}};function JI(n){let e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Mr(n){return n.name==="IndexedDbTransactionError"}var wr=class{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.ue&&this.ue(e),e}};wr.ce=-1;var cl=-1;function Wo(n){return n==null}function Ci(n){return n===0&&1/n==-1/0}function YI(n){return typeof n=="number"&&Number.isInteger(n)&&!Ci(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}var np="";function XI(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=_f(e)),e=ZI(n.get(t),e);return _f(e)}function ZI(n,e){let t=e,r=n.length;for(let i=0;i<r;i++){let o=n.charAt(i);switch(o){case"\0":t+="";break;case np:t+="";break;default:t+=o}}return t}function _f(n){return n+np+""}var ev="remoteDocuments",rp="owner";var ip="mutationQueues";var sp="mutations";var op="documentMutations",tv="remoteDocumentsV14";var ap="remoteDocumentGlobal";var cp="targets";var up="targetDocuments";var lp="targetGlobal",hp="collectionParents";var dp="clientMetadata";var fp="bundles";var pp="namedQueries";var nv="indexConfiguration";var rv="indexState";var iv="indexEntries";var mp="documentOverlays";var sv="globals";var ov=[ip,sp,op,ev,cp,rp,lp,up,dp,ap,hp,fp,pp],IT=[...ov,mp],av=[ip,sp,op,tv,cp,rp,lp,up,dp,ap,hp,fp,pp,mp],cv=av,uv=[...cv,nv,rv,iv];var vT=[...uv,sv];function If(n){let e=0;for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Kn(n,e){for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function gp(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}var ve=class n{constructor(e,t){this.comparator=e,this.root=t||xt.EMPTY}insert(e,t){return new n(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,xt.BLACK,null,null))}remove(e){return new n(this.comparator,this.root.remove(e,this.comparator).copy(null,null,xt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new yr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new yr(this.root,e,this.comparator,!1)}getReverseIterator(){return new yr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new yr(this.root,e,this.comparator,!0)}},yr=class{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let o=1;for(;!e.isEmpty();)if(o=t?r(e.key,t):1,t&&i&&(o*=-1),o<0)e=this.isReverse?e.left:e.right;else{if(o===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},xt=class n{constructor(e,t,r,i,o){this.key=e,this.value=t,this.color=r??n.RED,this.left=i??n.EMPTY,this.right=o??n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,o){return new n(e??this.key,t??this.value,r??this.color,i??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this,o=r(e,i.key);return i=o<0?i.copy(null,null,null,i.left.insert(e,t,r),null):o===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return n.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw z(43730,{key:this.key,value:this.value});if(this.right.isRed())throw z(14113,{key:this.key,value:this.value});let e=this.left.check();if(e!==this.right.check())throw z(27949);return e+(this.isRed()?0:1)}};xt.EMPTY=null,xt.RED=!0,xt.BLACK=!1;xt.EMPTY=new class{constructor(){this.size=0}get key(){throw z(57766)}get value(){throw z(16141)}get color(){throw z(16727)}get left(){throw z(29726)}get right(){throw z(36894)}copy(e,t,r,i,o){return this}insert(e,t,r){return new xt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var Ue=class n{constructor(e){this.comparator=e,this.data=new ve(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new yo(this.data.getIterator())}getIteratorFrom(e){return new yo(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let i=t.getNext().key,o=r.getNext().key;if(this.comparator(i,o)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new n(this.comparator);return t.data=e,t}},yo=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var At=class n{constructor(e){this.fields=e,e.sort(Qe.comparator)}static empty(){return new n([])}unionWith(e){let t=new Ue(Qe.comparator);for(let r of this.fields)t=t.add(r);for(let r of e)t=t.add(r);return new n(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return vr(this.fields,e.fields,(t,r)=>t.isEqual(r))}};var _o=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var qe=class n{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(i){try{return atob(i)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new _o("Invalid base64 string: "+o):o}}(e);return new n(t)}static fromUint8Array(e){let t=function(i){let o="";for(let a=0;a<i.length;++a)o+=String.fromCharCode(i[a]);return o}(e);return new n(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){let r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ee(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};qe.EMPTY_BYTE_STRING=new qe("");var lv=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function $t(n){if(re(!!n,39018),typeof n=="string"){let e=0,t=lv.exec(n);if(re(!!t,46558,{timestamp:n}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ge(n.seconds),nanos:ge(n.nanos)}}function ge(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Wt(n){return typeof n=="string"?qe.fromBase64String(n):qe.fromUint8Array(n)}var yp="server_timestamp",_p="__type__",Ip="__previous_value__",vp="__local_write_time__";function Go(n){return(n?.mapValue?.fields||{})[_p]?.stringValue===yp}function Ho(n){let e=n.mapValue.fields[Ip];return Go(e)?Ho(e):e}function ki(n){let e=$t(n.mapValue.fields[vp].timestampValue);return new be(e.seconds,e.nanos)}var Bc=class{constructor(e,t,r,i,o,a,u,l,d,p,m){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=l,this.useFetchStreams=d,this.isUsingEmulator=p,this.apiKey=m}},Io="(default)",Di=class n{constructor(e,t){this.projectId=e,this.database=t||Io}static empty(){return new n("","")}get isDefaultDatabase(){return this.database===Io}isEqual(e){return e instanceof n&&e.projectId===this.projectId&&e.database===this.database}};function wp(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new F(x.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Di(n.options.projectId,e)}var ul="__type__",Ep="__max__",ro={mapValue:{fields:{__type__:{stringValue:Ep}}}},ll="__vector__",Er="value";function dn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Go(n)?4:bp(n)?9007199254740991:Tp(n)?10:11:z(28295,{value:n})}function Nt(n,e){if(n===e)return!0;let t=dn(n);if(t!==dn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ki(n).isEqual(ki(e));case 3:return function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;let a=$t(i.timestampValue),u=$t(o.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,o){return Wt(i.bytesValue).isEqual(Wt(o.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,o){return ge(i.geoPointValue.latitude)===ge(o.geoPointValue.latitude)&&ge(i.geoPointValue.longitude)===ge(o.geoPointValue.longitude)}(n,e);case 2:return function(i,o){if("integerValue"in i&&"integerValue"in o)return ge(i.integerValue)===ge(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){let a=ge(i.doubleValue),u=ge(o.doubleValue);return a===u?Ci(a)===Ci(u):isNaN(a)&&isNaN(u)}return!1}(n,e);case 9:return vr(n.arrayValue.values||[],e.arrayValue.values||[],Nt);case 10:case 11:return function(i,o){let a=i.mapValue.fields||{},u=o.mapValue.fields||{};if(If(a)!==If(u))return!1;for(let l in a)if(a.hasOwnProperty(l)&&(u[l]===void 0||!Nt(a[l],u[l])))return!1;return!0}(n,e);default:return z(52216,{left:n})}}function Ni(n,e){return(n.values||[]).find(t=>Nt(t,e))!==void 0}function Tr(n,e){if(n===e)return 0;let t=dn(n),r=dn(e);if(t!==r)return ee(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ee(n.booleanValue,e.booleanValue);case 2:return function(o,a){let u=ge(o.integerValue||o.doubleValue),l=ge(a.integerValue||a.doubleValue);return u<l?-1:u>l?1:u===l?0:isNaN(u)?isNaN(l)?0:-1:1}(n,e);case 3:return vf(n.timestampValue,e.timestampValue);case 4:return vf(ki(n),ki(e));case 5:return Fc(n.stringValue,e.stringValue);case 6:return function(o,a){let u=Wt(o),l=Wt(a);return u.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(o,a){let u=o.split("/"),l=a.split("/");for(let d=0;d<u.length&&d<l.length;d++){let p=ee(u[d],l[d]);if(p!==0)return p}return ee(u.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(o,a){let u=ee(ge(o.latitude),ge(a.latitude));return u!==0?u:ee(ge(o.longitude),ge(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return wf(n.arrayValue,e.arrayValue);case 10:return function(o,a){let u=o.fields||{},l=a.fields||{},d=u[Er]?.arrayValue,p=l[Er]?.arrayValue,m=ee(d?.values?.length||0,p?.values?.length||0);return m!==0?m:wf(d,p)}(n.mapValue,e.mapValue);case 11:return function(o,a){if(o===ro.mapValue&&a===ro.mapValue)return 0;if(o===ro.mapValue)return 1;if(a===ro.mapValue)return-1;let u=o.fields||{},l=Object.keys(u),d=a.fields||{},p=Object.keys(d);l.sort(),p.sort();for(let m=0;m<l.length&&m<p.length;++m){let g=Fc(l[m],p[m]);if(g!==0)return g;let S=Tr(u[l[m]],d[p[m]]);if(S!==0)return S}return ee(l.length,p.length)}(n.mapValue,e.mapValue);default:throw z(23264,{he:t})}}function vf(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ee(n,e);let t=$t(n),r=$t(e),i=ee(t.seconds,r.seconds);return i!==0?i:ee(t.nanos,r.nanos)}function wf(n,e){let t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){let o=Tr(t[i],r[i]);if(o)return o}return ee(t.length,r.length)}function br(n){return qc(n)}function qc(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){let r=$t(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Wt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return q.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(let o of t.values||[])i?i=!1:r+=",",r+=qc(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){let r=Object.keys(t.fields||{}).sort(),i="{",o=!0;for(let a of r)o?o=!1:i+=",",i+=`${a}:${qc(t.fields[a])}`;return i+"}"}(n.mapValue):z(61005,{value:n})}function oo(n){switch(dn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:let e=Ho(n);return e?16+oo(e):16;case 5:return 2*n.stringValue.length;case 6:return Wt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,o)=>i+oo(o),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return Kn(r.fields,(o,a)=>{i+=o.length+oo(a)}),i}(n.mapValue);default:throw z(13486,{value:n})}}function zc(n){return!!n&&"integerValue"in n}function hl(n){return!!n&&"arrayValue"in n}function Ef(n){return!!n&&"nullValue"in n}function Tf(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ao(n){return!!n&&"mapValue"in n}function Tp(n){return(n?.mapValue?.fields||{})[ul]?.stringValue===ll}function Ai(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){let e={mapValue:{fields:{}}};return Kn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Ai(r)),e}if(n.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ai(n.arrayValue.values[t]);return e}return{...n}}function bp(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Ep}var ET={mapValue:{fields:{[ul]:{stringValue:ll},[Er]:{arrayValue:{}}}}};var ut=class n{constructor(e){this.value=e}static empty(){return new n({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!ao(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ai(t)}setAll(e){let t=Qe.emptyPath(),r={},i=[];e.forEach((a,u)=>{if(!t.isImmediateParentOf(u)){let l=this.getFieldsMap(t);this.applyChanges(l,r,i),r={},i=[],t=u.popLast()}a?r[u.lastSegment()]=Ai(a):i.push(u.lastSegment())});let o=this.getFieldsMap(t);this.applyChanges(o,r,i)}delete(e){let t=this.field(e.popLast());ao(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Nt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];ao(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){Kn(t,(i,o)=>e[i]=o);for(let i of r)delete e[i]}clone(){return new n(Ai(this.value))}};function Sp(n){let e=[];return Kn(n.fields,(t,r)=>{let i=new Qe([t]);if(ao(r)){let o=Sp(r.mapValue).fields;if(o.length===0)e.push(i);else for(let a of o)e.push(i.child(a))}else e.push(i)}),new At(e)}var gt=class n{constructor(e,t,r,i,o,a,u){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=o,this.data=a,this.documentState=u}static newInvalidDocument(e){return new n(e,0,W.min(),W.min(),W.min(),ut.empty(),0)}static newFoundDocument(e,t,r,i){return new n(e,1,t,W.min(),r,i,0)}static newNoDocument(e,t){return new n(e,2,t,W.min(),W.min(),ut.empty(),0)}static newUnknownDocument(e,t){return new n(e,3,t,W.min(),W.min(),ut.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(W.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ut.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ut.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=W.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof n&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var Fn=class{constructor(e,t){this.position=e,this.inclusive=t}};function bf(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){let o=e[i],a=n.position[i];if(o.field.isKeyField()?r=q.comparator(q.fromName(a.referenceValue),t.key):r=Tr(a,t.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function Sf(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Nt(n.position[t],e.position[t]))return!1;return!0}var Un=class{constructor(e,t="asc"){this.field=e,this.dir=t}};function hv(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}var vo=class{},xe=class n extends vo{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new $c(e,t,r):t==="array-contains"?new Hc(e,r):t==="in"?new Kc(e,r):t==="not-in"?new Qc(e,r):t==="array-contains-any"?new Jc(e,r):new n(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Wc(e,r):new Gc(e,r)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Tr(t,this.value)):t!==null&&dn(this.value)===dn(t)&&this.matchesComparison(Tr(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return z(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},yt=class n extends vo{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new n(e,t)}matches(e){return Ap(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}};function Ap(n){return n.op==="and"}function Rp(n){return dv(n)&&Ap(n)}function dv(n){for(let e of n.filters)if(e instanceof yt)return!1;return!0}function jc(n){if(n instanceof xe)return n.field.canonicalString()+n.op.toString()+br(n.value);if(Rp(n))return n.filters.map(e=>jc(e)).join(",");{let e=n.filters.map(t=>jc(t)).join(",");return`${n.op}(${e})`}}function xp(n,e){return n instanceof xe?function(r,i){return i instanceof xe&&r.op===i.op&&r.field.isEqual(i.field)&&Nt(r.value,i.value)}(n,e):n instanceof yt?function(r,i){return i instanceof yt&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((o,a,u)=>o&&xp(a,i.filters[u]),!0):!1}(n,e):void z(19439)}function Pp(n){return n instanceof xe?function(t){return`${t.field.canonicalString()} ${t.op} ${br(t.value)}`}(n):n instanceof yt?function(t){return t.op.toString()+" {"+t.getFilters().map(Pp).join(" ,")+"}"}(n):"Filter"}var $c=class extends xe{constructor(e,t,r){super(e,t,r),this.key=q.fromName(r.referenceValue)}matches(e){let t=q.comparator(e.key,this.key);return this.matchesComparison(t)}},Wc=class extends xe{constructor(e,t){super(e,"in",t),this.keys=Cp("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}},Gc=class extends xe{constructor(e,t){super(e,"not-in",t),this.keys=Cp("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}};function Cp(n,e){return(e.arrayValue?.values||[]).map(t=>q.fromName(t.referenceValue))}var Hc=class extends xe{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return hl(t)&&Ni(t.arrayValue,this.value)}},Kc=class extends xe{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&Ni(this.value.arrayValue,t)}},Qc=class extends xe{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ni(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Ni(this.value.arrayValue,t)}},Jc=class extends xe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!hl(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Ni(this.value.arrayValue,r))}};var Yc=class{constructor(e,t=null,r=[],i=[],o=null,a=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=o,this.startAt=a,this.endAt=u,this.Te=null}};function Af(n,e=null,t=[],r=[],i=null,o=null,a=null){return new Yc(n,e,t,r,i,o,a)}function dl(n){let e=j(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>jc(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),Wo(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>br(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>br(r)).join(",")),e.Te=t}return e.Te}function fl(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!hv(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!xp(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Sf(n.startAt,e.startAt)&&Sf(n.endAt,e.endAt)}function Xc(n){return q.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}var Sr=class{constructor(e,t=null,r=[],i=[],o=null,a="F",u=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=o,this.limitType=a,this.startAt=u,this.endAt=l,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}};function fv(n,e,t,r,i,o,a,u){return new Sr(n,e,t,r,i,o,a,u)}function Ko(n){return new Sr(n)}function Rf(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function pv(n){return q.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function kp(n){return n.collectionGroup!==null}function _r(n){let e=j(n);if(e.Ie===null){e.Ie=[];let t=new Set;for(let o of e.explicitOrderBy)e.Ie.push(o),t.add(o.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new Ue(Qe.comparator);return a.filters.forEach(l=>{l.getFlattenedFilters().forEach(d=>{d.isInequality()&&(u=u.add(d.field))})}),u})(e).forEach(o=>{t.has(o.canonicalString())||o.isKeyField()||e.Ie.push(new Un(o,r))}),t.has(Qe.keyField().canonicalString())||e.Ie.push(new Un(Qe.keyField(),r))}return e.Ie}function Pt(n){let e=j(n);return e.Ee||(e.Ee=mv(e,_r(n))),e.Ee}function mv(n,e){if(n.limitType==="F")return Af(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{let o=i.dir==="desc"?"asc":"desc";return new Un(i.field,o)});let t=n.endAt?new Fn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Fn(n.startAt.position,n.startAt.inclusive):null;return Af(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function wo(n,e,t){return new Sr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Qo(n,e){return fl(Pt(n),Pt(e))&&n.limitType===e.limitType}function Dp(n){return`${dl(Pt(n))}|lt:${n.limitType}`}function pr(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>Pp(i)).join(", ")}]`),Wo(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>br(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>br(i)).join(",")),`Target(${r})`}(Pt(n))}; limitType=${n.limitType})`}function Jo(n,e){return e.isFoundDocument()&&function(r,i){let o=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):q.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,e)&&function(r,i){for(let o of _r(r))if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0}(n,e)&&function(r,i){for(let o of r.filters)if(!o.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(a,u,l){let d=bf(a,u,l);return a.inclusive?d<=0:d<0}(r.startAt,_r(r),i)||r.endAt&&!function(a,u,l){let d=bf(a,u,l);return a.inclusive?d>=0:d>0}(r.endAt,_r(r),i))}(n,e)}function gv(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Np(n){return(e,t)=>{let r=!1;for(let i of _r(n)){let o=yv(i,e,t);if(o!==0)return o;r=r||i.field.isKeyField()}return 0}}function yv(n,e,t){let r=n.field.isKeyField()?q.comparator(e.key,t.key):function(o,a,u){let l=a.data.field(o),d=u.data.field(o);return l!==null&&d!==null?Tr(l,d):z(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return z(19790,{direction:n.dir})}}var Gt=class{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(let[i,o]of r)if(this.equalsFn(i,e))return o}}has(e){return this.get(e)!==void 0}set(e,t){let r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],e))return void(i[o]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Kn(this.inner,(t,r)=>{for(let[i,o]of r)e(i,o)})}isEmpty(){return gp(this.inner)}size(){return this.innerSize}};var _v=new ve(q.comparator);function Ht(){return _v}var Op=new ve(q.comparator);function Si(...n){let e=Op;for(let t of n)e=e.insert(t.key,t);return e}function Vp(n){let e=Op;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Nn(){return Ri()}function Mp(){return Ri()}function Ri(){return new Gt(n=>n.toString(),(n,e)=>n.isEqual(e))}var Iv=new ve(q.comparator),vv=new Ue(q.comparator);function X(...n){let e=vv;for(let t of n)e=e.add(t);return e}var wv=new Ue(ee);function Ev(){return wv}function pl(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ci(e)?"-0":e}}function Lp(n){return{integerValue:""+n}}function Tv(n,e){return YI(e)?Lp(e):pl(n,e)}var Ar=class{constructor(){this._=void 0}};function bv(n,e,t){return n instanceof Rr?function(i,o){let a={fields:{[_p]:{stringValue:yp},[vp]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&Go(o)&&(o=Ho(o)),o&&(a.fields[Ip]=o),{mapValue:a}}(t,e):n instanceof Bn?Up(n,e):n instanceof qn?Bp(n,e):function(i,o){let a=Fp(i,o),u=xf(a)+xf(i.Ae);return zc(a)&&zc(i.Ae)?Lp(u):pl(i.serializer,u)}(n,e)}function Sv(n,e,t){return n instanceof Bn?Up(n,e):n instanceof qn?Bp(n,e):t}function Fp(n,e){return n instanceof xr?function(r){return zc(r)||function(o){return!!o&&"doubleValue"in o}(r)}(e)?e:{integerValue:0}:null}var Rr=class extends Ar{},Bn=class extends Ar{constructor(e){super(),this.elements=e}};function Up(n,e){let t=qp(e);for(let r of n.elements)t.some(i=>Nt(i,r))||t.push(r);return{arrayValue:{values:t}}}var qn=class extends Ar{constructor(e){super(),this.elements=e}};function Bp(n,e){let t=qp(e);for(let r of n.elements)t=t.filter(i=>!Nt(i,r));return{arrayValue:{values:t}}}var xr=class extends Ar{constructor(e,t){super(),this.serializer=e,this.Ae=t}};function xf(n){return ge(n.integerValue||n.doubleValue)}function qp(n){return hl(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function Av(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof Bn&&i instanceof Bn||r instanceof qn&&i instanceof qn?vr(r.elements,i.elements,Nt):r instanceof xr&&i instanceof xr?Nt(r.Ae,i.Ae):r instanceof Rr&&i instanceof Rr}(n.transform,e.transform)}var Zc=class{constructor(e,t){this.version=e,this.transformResults=t}},hn=class n{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new n}static exists(e){return new n(void 0,e)}static updateTime(e){return new n(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function co(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}var Pr=class{};function zp(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Oi(n.key,hn.none()):new zn(n.key,n.data,hn.none());{let t=n.data,r=ut.empty(),i=new Ue(Qe.comparator);for(let o of e.fields)if(!i.has(o)){let a=t.field(o);a===null&&o.length>1&&(o=o.popLast(),a=t.field(o)),a===null?r.delete(o):r.set(o,a),i=i.add(o)}return new Kt(n.key,r,new At(i.toArray()),hn.none())}}function Rv(n,e,t){n instanceof zn?function(i,o,a){let u=i.value.clone(),l=Cf(i.fieldTransforms,o,a.transformResults);u.setAll(l),o.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):n instanceof Kt?function(i,o,a){if(!co(i.precondition,o))return void o.convertToUnknownDocument(a.version);let u=Cf(i.fieldTransforms,o,a.transformResults),l=o.data;l.setAll(jp(i)),l.setAll(u),o.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):function(i,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function xi(n,e,t,r){return n instanceof zn?function(o,a,u,l){if(!co(o.precondition,a))return u;let d=o.value.clone(),p=kf(o.fieldTransforms,l,a);return d.setAll(p),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof Kt?function(o,a,u,l){if(!co(o.precondition,a))return u;let d=kf(o.fieldTransforms,l,a),p=a.data;return p.setAll(jp(o)),p.setAll(d),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),u===null?null:u.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(m=>m.field))}(n,e,t,r):function(o,a,u){return co(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u}(n,e,t)}function xv(n,e){let t=null;for(let r of n.fieldTransforms){let i=e.data.field(r.field),o=Fp(r.transform,i||null);o!=null&&(t===null&&(t=ut.empty()),t.set(r.field,o))}return t||null}function Pf(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&vr(r,i,(o,a)=>Av(o,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}var zn=class extends Pr{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}},Kt=class extends Pr{constructor(e,t,r,i,o=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}};function jp(n){let e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){let r=n.data.field(t);e.set(t,r)}}),e}function Cf(n,e,t){let r=new Map;re(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let i=0;i<t.length;i++){let o=n[i],a=o.transform,u=e.data.field(o.field);r.set(o.field,Sv(a,u,t[i]))}return r}function kf(n,e,t){let r=new Map;for(let i of n){let o=i.transform,a=t.data.field(i.field);r.set(i.field,bv(o,a,e))}return r}var Oi=class extends Pr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},eu=class extends Pr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var tu=class{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){let o=this.mutations[i];o.key.isEqual(e.key)&&Rv(o,e,r[i])}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=xi(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=xi(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=Mp();return this.mutations.forEach(i=>{let o=e.get(i.key),a=o.overlayedDocument,u=this.applyToLocalView(a,o.mutatedFields);u=t.has(i.key)?null:u;let l=zp(a,u);l!==null&&r.set(i.key,l),a.isValidDocument()||a.convertToNoDocument(W.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),X())}isEqual(e){return this.batchId===e.batchId&&vr(this.mutations,e.mutations,(t,r)=>Pf(t,r))&&vr(this.baseMutations,e.baseMutations,(t,r)=>Pf(t,r))}},nu=class n{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){re(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let i=function(){return Iv}(),o=e.mutations;for(let a=0;a<o.length;a++)i=i.insert(o[a].key,r[a].version);return new n(e,t,r,i)}};var ru=class{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};var iu=class{constructor(e,t){this.count=e,this.unchangedNames=t}};var Ae,ne;function Pv(n){switch(n){case x.OK:return z(64938);case x.CANCELLED:case x.UNKNOWN:case x.DEADLINE_EXCEEDED:case x.RESOURCE_EXHAUSTED:case x.INTERNAL:case x.UNAVAILABLE:case x.UNAUTHENTICATED:return!1;case x.INVALID_ARGUMENT:case x.NOT_FOUND:case x.ALREADY_EXISTS:case x.PERMISSION_DENIED:case x.FAILED_PRECONDITION:case x.ABORTED:case x.OUT_OF_RANGE:case x.UNIMPLEMENTED:case x.DATA_LOSS:return!0;default:return z(15467,{code:n})}}function $p(n){if(n===void 0)return zt("GRPC error has no .code"),x.UNKNOWN;switch(n){case Ae.OK:return x.OK;case Ae.CANCELLED:return x.CANCELLED;case Ae.UNKNOWN:return x.UNKNOWN;case Ae.DEADLINE_EXCEEDED:return x.DEADLINE_EXCEEDED;case Ae.RESOURCE_EXHAUSTED:return x.RESOURCE_EXHAUSTED;case Ae.INTERNAL:return x.INTERNAL;case Ae.UNAVAILABLE:return x.UNAVAILABLE;case Ae.UNAUTHENTICATED:return x.UNAUTHENTICATED;case Ae.INVALID_ARGUMENT:return x.INVALID_ARGUMENT;case Ae.NOT_FOUND:return x.NOT_FOUND;case Ae.ALREADY_EXISTS:return x.ALREADY_EXISTS;case Ae.PERMISSION_DENIED:return x.PERMISSION_DENIED;case Ae.FAILED_PRECONDITION:return x.FAILED_PRECONDITION;case Ae.ABORTED:return x.ABORTED;case Ae.OUT_OF_RANGE:return x.OUT_OF_RANGE;case Ae.UNIMPLEMENTED:return x.UNIMPLEMENTED;case Ae.DATA_LOSS:return x.DATA_LOSS;default:return z(39323,{code:n})}}(ne=Ae||(Ae={}))[ne.OK=0]="OK",ne[ne.CANCELLED=1]="CANCELLED",ne[ne.UNKNOWN=2]="UNKNOWN",ne[ne.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ne[ne.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ne[ne.NOT_FOUND=5]="NOT_FOUND",ne[ne.ALREADY_EXISTS=6]="ALREADY_EXISTS",ne[ne.PERMISSION_DENIED=7]="PERMISSION_DENIED",ne[ne.UNAUTHENTICATED=16]="UNAUTHENTICATED",ne[ne.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ne[ne.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ne[ne.ABORTED=10]="ABORTED",ne[ne.OUT_OF_RANGE=11]="OUT_OF_RANGE",ne[ne.UNIMPLEMENTED=12]="UNIMPLEMENTED",ne[ne.INTERNAL=13]="INTERNAL",ne[ne.UNAVAILABLE=14]="UNAVAILABLE",ne[ne.DATA_LOSS=15]="DATA_LOSS";var Cv=null;function kv(){return new TextEncoder}var Dv=new Ut([4294967295,4294967295],0);function Df(n){let e=kv().encode(n),t=new bc;return t.update(e),new Uint8Array(t.digest())}function Nf(n){let e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),o=e.getUint32(12,!0);return[new Ut([t,r],0),new Ut([i,o],0)]}var su=class n{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new On(`Invalid padding: ${t}`);if(r<0)throw new On(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new On(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new On(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Ut.fromNumber(this.ge)}ye(e,t,r){let i=e.add(t.multiply(Ut.fromNumber(r)));return i.compare(Dv)===1&&(i=new Ut([i.getBits(0),i.getBits(1)],0)),i.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;let t=Df(e),[r,i]=Nf(t);for(let o=0;o<this.hashCount;o++){let a=this.ye(r,i,o);if(!this.we(a))return!1}return!0}static create(e,t,r){let i=e%8==0?0:8-e%8,o=new Uint8Array(Math.ceil(e/8)),a=new n(o,i,t);return r.forEach(u=>a.insert(u)),a}insert(e){if(this.ge===0)return;let t=Df(e),[r,i]=Nf(t);for(let o=0;o<this.hashCount;o++){let a=this.ye(r,i,o);this.be(a)}}be(e){let t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}},On=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};var Eo=class n{constructor(e,t,r,i,o){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(e,t,r){let i=new Map;return i.set(e,Vi.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new n(W.min(),i,new ve(ee),Ht(),X())}},Vi=class n{constructor(e,t,r,i,o){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new n(r,t,X(),X(),X())}};var Ir=class{constructor(e,t,r,i){this.Se=e,this.removedTargetIds=t,this.key=r,this.De=i}},To=class{constructor(e,t){this.targetId=e,this.Ce=t}},bo=class{constructor(e,t,r=qe.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}},So=class{constructor(){this.ve=0,this.Fe=Of(),this.Me=qe.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=X(),t=X(),r=X();return this.Fe.forEach((i,o)=>{switch(o){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:z(38017,{changeType:o})}}),new Vi(this.Me,this.xe,e,t,r)}Ke(){this.Oe=!1,this.Fe=Of()}qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,re(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}},ou=class{constructor(e){this.Ge=e,this.ze=new Map,this.je=Ht(),this.He=io(),this.Je=io(),this.Ze=new ve(ee)}Xe(e){for(let t of e.Se)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(let t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{let r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.Ke(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:z(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((r,i)=>{this.rt(i)&&t(i)})}st(e){let t=e.targetId,r=e.Ce.count,i=this.ot(t);if(i){let o=i.target;if(Xc(o))if(r===0){let a=new q(o.path);this.et(t,a,gt.newNoDocument(a,W.min()))}else re(r===1,20013,{expectedCount:r});else{let a=this._t(t);if(a!==r){let u=this.ut(e),l=u?this.ct(u,e,a):1;if(l!==0){this.it(t);let d=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,d)}Cv?.lt(function(p,m,g,S,P){let k={localCacheCount:p,existenceFilterCount:m.count,databaseId:g.database,projectId:g.projectId},R=m.unchangedNames;return R&&(k.bloomFilter={applied:P===0,hashCount:R?.hashCount??0,bitmapLength:R?.bits?.bitmap?.length??0,padding:R?.bits?.padding??0,mightContain:M=>S?.mightContain(M)??!1}),k}(a,e.Ce,this.Ge.ht(),u,l))}}}}ut(e){let t=e.Ce.unchangedNames;if(!t||!t.bits)return null;let{bits:{bitmap:r="",padding:i=0},hashCount:o=0}=t,a,u;try{a=Wt(r).toUint8Array()}catch(l){if(l instanceof _o)return jt("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{u=new su(a,i,o)}catch(l){return jt(l instanceof On?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return u.ge===0?null:u}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){let r=this.Ge.getRemoteKeysForTarget(t),i=0;return r.forEach(o=>{let a=this.Ge.ht(),u=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;e.mightContain(u)||(this.et(t,o,null),i++)}),i}Tt(e){let t=new Map;this.ze.forEach((o,a)=>{let u=this.ot(a);if(u){if(o.current&&Xc(u.target)){let l=new q(u.target.path);this.It(l).has(a)||this.Et(a,l)||this.et(a,l,gt.newNoDocument(l,e))}o.Be&&(t.set(a,o.ke()),o.Ke())}});let r=X();this.Je.forEach((o,a)=>{let u=!0;a.forEachWhile(l=>{let d=this.ot(l);return!d||d.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)}),u&&(r=r.add(o))}),this.je.forEach((o,a)=>a.setReadTime(e));let i=new Eo(e,t,this.Ze,this.je,r);return this.je=Ht(),this.He=io(),this.Je=io(),this.Ze=new ve(ee),i}Ye(e,t){if(!this.rt(e))return;let r=this.Et(e,t.key)?2:0;this.nt(e).qe(t.key,r),this.je=this.je.insert(t.key,t),this.He=this.He.insert(t.key,this.It(t.key).add(e)),this.Je=this.Je.insert(t.key,this.Rt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;let i=this.nt(e);this.Et(e,t)?i.qe(t,1):i.Ue(t),this.Je=this.Je.insert(t,this.Rt(t).delete(e)),this.Je=this.Je.insert(t,this.Rt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){let t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new So,this.ze.set(e,t)),t}Rt(e){let t=this.Je.get(e);return t||(t=new Ue(ee),this.Je=this.Je.insert(e,t)),t}It(e){let t=this.He.get(e);return t||(t=new Ue(ee),this.He=this.He.insert(e,t)),t}rt(e){let t=this.ot(e)!==null;return t||O("WatchChangeAggregator","Detected inactive target",e),t}ot(e){let t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new So),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}};function io(){return new ve(q.comparator)}function Of(){return new ve(q.comparator)}var Nv={asc:"ASCENDING",desc:"DESCENDING"},Ov={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Vv={and:"AND",or:"OR"},au=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function cu(n,e){return n.useProto3Json||Wo(e)?e:{value:e}}function Ao(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Wp(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Mv(n,e){return Ao(n,e.toTimestamp())}function Ct(n){return re(!!n,49232),W.fromTimestamp(function(t){let r=$t(t);return new be(r.seconds,r.nanos)}(n))}function ml(n,e){return uu(n,e).canonicalString()}function uu(n,e){let t=function(i){return new Ie(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Gp(n){let e=Ie.fromString(n);return re(Yp(e),10190,{key:e.toString()}),e}function lu(n,e){return ml(n.databaseId,e.path)}function kc(n,e){let t=Gp(e);if(t.get(1)!==n.databaseId.projectId)throw new F(x.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new F(x.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new q(Kp(t))}function Hp(n,e){return ml(n.databaseId,e)}function Lv(n){let e=Gp(n);return e.length===4?Ie.emptyPath():Kp(e)}function hu(n){return new Ie(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Kp(n){return re(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Vf(n,e,t){return{name:lu(n,e),fields:t.value.mapValue.fields}}function Fv(n,e){let t;if("targetChange"in e){e.targetChange;let r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:z(39313,{state:d})}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],o=function(d,p){return d.useProto3Json?(re(p===void 0||typeof p=="string",58123),qe.fromBase64String(p||"")):(re(p===void 0||p instanceof Buffer||p instanceof Uint8Array,16193),qe.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,u=a&&function(d){let p=d.code===void 0?x.UNKNOWN:$p(d.code);return new F(p,d.message||"")}(a);t=new bo(r,i,o,u||null)}else if("documentChange"in e){e.documentChange;let r=e.documentChange;r.document,r.document.name,r.document.updateTime;let i=kc(n,r.document.name),o=Ct(r.document.updateTime),a=r.document.createTime?Ct(r.document.createTime):W.min(),u=new ut({mapValue:{fields:r.document.fields}}),l=gt.newFoundDocument(i,o,a,u),d=r.targetIds||[],p=r.removedTargetIds||[];t=new Ir(d,p,l.key,l)}else if("documentDelete"in e){e.documentDelete;let r=e.documentDelete;r.document;let i=kc(n,r.document),o=r.readTime?Ct(r.readTime):W.min(),a=gt.newNoDocument(i,o),u=r.removedTargetIds||[];t=new Ir([],u,a.key,a)}else if("documentRemove"in e){e.documentRemove;let r=e.documentRemove;r.document;let i=kc(n,r.document),o=r.removedTargetIds||[];t=new Ir([],o,i,null)}else{if(!("filter"in e))return z(11601,{Vt:e});{e.filter;let r=e.filter;r.targetId;let{count:i=0,unchangedNames:o}=r,a=new iu(i,o),u=r.targetId;t=new To(u,a)}}return t}function Uv(n,e){let t;if(e instanceof zn)t={update:Vf(n,e.key,e.value)};else if(e instanceof Oi)t={delete:lu(n,e.key)};else if(e instanceof Kt)t={update:Vf(n,e.key,e.data),updateMask:Kv(e.fieldMask)};else{if(!(e instanceof eu))return z(16599,{dt:e.type});t={verify:lu(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(o,a){let u=a.transform;if(u instanceof Rr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof Bn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof qn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof xr)return{fieldPath:a.field.canonicalString(),increment:u.Ae};throw z(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,o){return o.updateTime!==void 0?{updateTime:Mv(i,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:z(27497)}(n,e.precondition)),t}function Bv(n,e){return n&&n.length>0?(re(e!==void 0,14353),n.map(t=>function(i,o){let a=i.updateTime?Ct(i.updateTime):Ct(o);return a.isEqual(W.min())&&(a=Ct(o)),new Zc(a,i.transformResults||[])}(t,e))):[]}function qv(n,e){return{documents:[Hp(n,e.path)]}}function zv(n,e){let t={structuredQuery:{}},r=e.path,i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Hp(n,i);let o=function(d){if(d.length!==0)return Jp(yt.create(d,"and"))}(e.filters);o&&(t.structuredQuery.where=o);let a=function(d){if(d.length!==0)return d.map(p=>function(g){return{field:mr(g.field),direction:Wv(g.dir)}}(p))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);let u=cu(n,e.limit);return u!==null&&(t.structuredQuery.limit=u),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ft:t,parent:i}}function jv(n){let e=Lv(n.parent),t=n.structuredQuery,r=t.from?t.from.length:0,i=null;if(r>0){re(r===1,65062);let p=t.from[0];p.allDescendants?i=p.collectionId:e=e.child(p.collectionId)}let o=[];t.where&&(o=function(m){let g=Qp(m);return g instanceof yt&&Rp(g)?g.getFilters():[g]}(t.where));let a=[];t.orderBy&&(a=function(m){return m.map(g=>function(P){return new Un(gr(P.field),function(R){switch(R){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(P.direction))}(g))}(t.orderBy));let u=null;t.limit&&(u=function(m){let g;return g=typeof m=="object"?m.value:m,Wo(g)?null:g}(t.limit));let l=null;t.startAt&&(l=function(m){let g=!!m.before,S=m.values||[];return new Fn(S,g)}(t.startAt));let d=null;return t.endAt&&(d=function(m){let g=!m.before,S=m.values||[];return new Fn(S,g)}(t.endAt)),fv(e,i,a,o,u,"F",l,d)}function $v(n,e){let t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return z(28987,{purpose:i})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Qp(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":let r=gr(t.unaryFilter.field);return xe.create(r,"==",{doubleValue:NaN});case"IS_NULL":let i=gr(t.unaryFilter.field);return xe.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let o=gr(t.unaryFilter.field);return xe.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let a=gr(t.unaryFilter.field);return xe.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return z(61313);default:return z(60726)}}(n):n.fieldFilter!==void 0?function(t){return xe.create(gr(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return z(58110);default:return z(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return yt.create(t.compositeFilter.filters.map(r=>Qp(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return z(1026)}}(t.compositeFilter.op))}(n):z(30097,{filter:n})}function Wv(n){return Nv[n]}function Gv(n){return Ov[n]}function Hv(n){return Vv[n]}function mr(n){return{fieldPath:n.canonicalString()}}function gr(n){return Qe.fromServerFormat(n.fieldPath)}function Jp(n){return n instanceof xe?function(t){if(t.op==="=="){if(Tf(t.value))return{unaryFilter:{field:mr(t.field),op:"IS_NAN"}};if(Ef(t.value))return{unaryFilter:{field:mr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Tf(t.value))return{unaryFilter:{field:mr(t.field),op:"IS_NOT_NAN"}};if(Ef(t.value))return{unaryFilter:{field:mr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:mr(t.field),op:Gv(t.op),value:t.value}}}(n):n instanceof yt?function(t){let r=t.getFilters().map(i=>Jp(i));return r.length===1?r[0]:{compositeFilter:{op:Hv(t.op),filters:r}}}(n):z(54877,{filter:n})}function Kv(n){let e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Yp(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Xp(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}var Mi=class n{constructor(e,t,r,i,o=W.min(),a=W.min(),u=qe.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=l}withSequenceNumber(e){return new n(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}};var du=class{constructor(e){this.yt=e}};function Zp(n){let e=jv({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?wo(e,e.limit,"L"):e}var Ro=class{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(ge(e.integerValue));else if("doubleValue"in e){let r=ge(e.doubleValue);isNaN(r)?this.Ft(t,13):(this.Ft(t,15),Ci(r)?t.Mt(0):t.Mt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Ft(t,20),typeof r=="string"&&(r=$t(r)),t.xt(`${r.seconds||""}`),t.Mt(r.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(Wt(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.Ft(t,45),t.Mt(r.latitude||0),t.Mt(r.longitude||0)}else"mapValue"in e?bp(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):Tp(e)?this.kt(e.mapValue,t):(this.Kt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.qt(e.arrayValue,t),this.Nt(t)):z(19022,{Ut:e})}Ot(e,t){this.Ft(t,25),this.$t(e,t)}$t(e,t){t.xt(e)}Kt(e,t){let r=e.fields||{};this.Ft(t,55);for(let i of Object.keys(r))this.Ot(i,t),this.Ct(r[i],t)}kt(e,t){let r=e.fields||{};this.Ft(t,53);let i=Er,o=r[i].arrayValue?.values?.length||0;this.Ft(t,15),t.Mt(ge(o)),this.Ot(i,t),this.Ct(r[i],t)}qt(e,t){let r=e.values||[];this.Ft(t,50);for(let i of r)this.Ct(i,t)}Lt(e,t){this.Ft(t,37),q.fromName(e).path.forEach(r=>{this.Ft(t,60),this.$t(r,t)})}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}};Ro.Wt=new Ro;var fu=class{constructor(){this.Sn=new pu}addToCollectionParentIndex(e,t){return this.Sn.add(t),C.resolve()}getCollectionParents(e,t){return C.resolve(this.Sn.getEntries(t))}addFieldIndex(e,t){return C.resolve()}deleteFieldIndex(e,t){return C.resolve()}deleteAllFieldIndexes(e){return C.resolve()}createTargetIndexes(e,t){return C.resolve()}getDocumentsMatchingTarget(e,t){return C.resolve(null)}getIndexType(e,t){return C.resolve(0)}getFieldIndexes(e,t){return C.resolve([])}getNextCollectionGroupToUpdate(e){return C.resolve(null)}getMinOffset(e,t){return C.resolve(Ln.min())}getMinOffsetFromCollectionGroup(e,t){return C.resolve(Ln.min())}updateCollectionGroup(e,t,r){return C.resolve()}updateIndexEntries(e,t){return C.resolve()}},pu=class{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new Ue(Ie.comparator),o=!i.has(r);return this.index[t]=i.add(r),o}has(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Ue(Ie.comparator)).toArray()}};var TT=new Uint8Array(0);var Mf={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},em=41943040,ct=class n{static withCacheSize(e){return new n(e,n.DEFAULT_COLLECTION_PERCENTILE,n.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}};ct.DEFAULT_COLLECTION_PERCENTILE=10,ct.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ct.DEFAULT=new ct(em,ct.DEFAULT_COLLECTION_PERCENTILE,ct.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ct.DISABLED=new ct(-1,0,0);var Li=class n{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new n(0)}static ar(){return new n(-1)}};var Lf="LruGarbageCollector",Qv=1048576;function Ff([n,e],[t,r]){let i=ee(n,t);return i===0?ee(e,r):i}var mu=class{constructor(e){this.Pr=e,this.buffer=new Ue(Ff),this.Tr=0}Ir(){return++this.Tr}Er(e){let t=[e,this.Ir()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{let r=this.buffer.last();Ff(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}},gu=class{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){O(Lf,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Mr(t)?O(Lf,"Ignoring IndexedDB error during garbage collection: ",t):await Vr(t)}await this.Ar(3e5)})}},yu=class{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return C.resolve(wr.ce);let r=new mu(t);return this.Vr.forEachTarget(e,i=>r.Er(i.sequenceNumber)).next(()=>this.Vr.mr(e,i=>r.Er(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(O("LruGarbageCollector","Garbage collection skipped; disabled"),C.resolve(Mf)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(O("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Mf):this.gr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let r,i,o,a,u,l,d,p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(O("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),i=this.params.maximumSequenceNumbersToCollect):i=m,a=Date.now(),this.nthSequenceNumber(e,i))).next(m=>(r=m,u=Date.now(),this.removeTargets(e,r,t))).next(m=>(o=m,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(m=>(d=Date.now(),fr()<=J.DEBUG&&O("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-p}ms
	Determined least recently used ${i} in `+(u-a)+`ms
	Removed ${o} targets in `+(l-u)+`ms
	Removed ${m} documents in `+(d-l)+`ms
Total Duration: ${d-p}ms`),C.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:o,documentsRemoved:m})))}};function Jv(n,e){return new yu(n,e)}var _u=class{constructor(){this.changes=new Gt(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,gt.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return r!==void 0?C.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};var Iu=class{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}};var vu=class{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&xi(r.mutation,i,At.empty(),be.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,X()).next(()=>r))}getLocalViewOfDocuments(e,t,r=X()){let i=Nn();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(o=>{let a=Si();return o.forEach((u,l)=>{a=a.insert(u,l.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){let r=Nn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,X()))}populateOverlays(e,t,r){let i=[];return r.forEach(o=>{t.has(o)||i.push(o)}),this.documentOverlayCache.getOverlays(e,i).next(o=>{o.forEach((a,u)=>{t.set(a,u)})})}computeViews(e,t,r,i){let o=Ht(),a=Ri(),u=function(){return Ri()}();return t.forEach((l,d)=>{let p=r.get(d.key);i.has(d.key)&&(p===void 0||p.mutation instanceof Kt)?o=o.insert(d.key,d):p!==void 0?(a.set(d.key,p.mutation.getFieldMask()),xi(p.mutation,d,p.mutation.getFieldMask(),be.now())):a.set(d.key,At.empty())}),this.recalculateAndSaveOverlays(e,o).next(l=>(l.forEach((d,p)=>a.set(d,p)),t.forEach((d,p)=>u.set(d,new Iu(p,a.get(d)??null))),u))}recalculateAndSaveOverlays(e,t){let r=Ri(),i=new ve((a,u)=>a-u),o=X();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(let u of a)u.keys().forEach(l=>{let d=t.get(l);if(d===null)return;let p=r.get(l)||At.empty();p=u.applyToLocalView(d,p),r.set(l,p);let m=(i.get(u.batchId)||X()).add(l);i=i.insert(u.batchId,m)})}).next(()=>{let a=[],u=i.getReverseIterator();for(;u.hasNext();){let l=u.getNext(),d=l.key,p=l.value,m=Mp();p.forEach(g=>{if(!o.has(g)){let S=zp(t.get(g),r.get(g));S!==null&&m.set(g,S),o=o.add(g)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,m))}return C.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return pv(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):kp(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(o=>{let a=i-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-o.size):C.resolve(Nn()),u=Pi,l=o;return a.next(d=>C.forEach(d,(p,m)=>(u<m.largestBatchId&&(u=m.largestBatchId),o.get(p)?C.resolve():this.remoteDocumentCache.getEntry(e,p).next(g=>{l=l.insert(p,g)}))).next(()=>this.populateOverlays(e,d,o)).next(()=>this.computeViews(e,l,d,X())).next(p=>({batchId:u,changes:Vp(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new q(t)).next(r=>{let i=Si();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){let o=t.collectionGroup,a=Si();return this.indexManager.getCollectionParents(e,o).next(u=>C.forEach(u,l=>{let d=function(m,g){return new Sr(g,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(t,l.child(o));return this.getDocumentsMatchingCollectionQuery(e,d,r,i).next(p=>{p.forEach((m,g)=>{a=a.insert(m,g)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,i){let o;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,o,i))).next(a=>{o.forEach((l,d)=>{let p=d.getKey();a.get(p)===null&&(a=a.insert(p,gt.newInvalidDocument(p)))});let u=Si();return a.forEach((l,d)=>{let p=o.get(l);p!==void 0&&xi(p.mutation,d,At.empty(),be.now()),Jo(t,d)&&(u=u.insert(l,d))}),u})}};var wu=class{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return C.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:Ct(i.createTime)}}(t)),C.resolve()}getNamedQuery(e,t){return C.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,function(i){return{name:i.name,query:Zp(i.bundledQuery),readTime:Ct(i.readTime)}}(t)),C.resolve()}};var Eu=class{constructor(){this.overlays=new ve(q.comparator),this.Lr=new Map}getOverlay(e,t){return C.resolve(this.overlays.get(t))}getOverlays(e,t){let r=Nn();return C.forEach(t,i=>this.getOverlay(e,i).next(o=>{o!==null&&r.set(i,o)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,o)=>{this.bt(e,t,o)}),C.resolve()}removeOverlaysForBatchId(e,t,r){let i=this.Lr.get(r);return i!==void 0&&(i.forEach(o=>this.overlays=this.overlays.remove(o)),this.Lr.delete(r)),C.resolve()}getOverlaysForCollection(e,t,r){let i=Nn(),o=t.length+1,a=new q(t.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){let l=u.getNext().value,d=l.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===o&&l.largestBatchId>r&&i.set(l.getKey(),l)}return C.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let o=new ve((d,p)=>d-p),a=this.overlays.getIterator();for(;a.hasNext();){let d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let p=o.get(d.largestBatchId);p===null&&(p=Nn(),o=o.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}let u=Nn(),l=o.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((d,p)=>u.set(d,p)),!(u.size()>=i)););return C.resolve(u)}bt(e,t,r){let i=this.overlays.get(r.key);if(i!==null){let a=this.Lr.get(i.largestBatchId).delete(r.key);this.Lr.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new ru(t,r));let o=this.Lr.get(t);o===void 0&&(o=X(),this.Lr.set(t,o)),this.Lr.set(t,o.add(r.key))}};var Tu=class{constructor(){this.sessionToken=qe.EMPTY_BYTE_STRING}getSessionToken(e){return C.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,C.resolve()}};var Fi=class{constructor(){this.kr=new Ue(Re.Kr),this.qr=new Ue(Re.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){let r=new Re(e,t);this.kr=this.kr.add(r),this.qr=this.qr.add(r)}$r(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Wr(new Re(e,t))}Qr(e,t){e.forEach(r=>this.removeReference(r,t))}Gr(e){let t=new q(new Ie([])),r=new Re(t,e),i=new Re(t,e+1),o=[];return this.qr.forEachInRange([r,i],a=>{this.Wr(a),o.push(a.key)}),o}zr(){this.kr.forEach(e=>this.Wr(e))}Wr(e){this.kr=this.kr.delete(e),this.qr=this.qr.delete(e)}jr(e){let t=new q(new Ie([])),r=new Re(t,e),i=new Re(t,e+1),o=X();return this.qr.forEachInRange([r,i],a=>{o=o.add(a.key)}),o}containsKey(e){let t=new Re(e,0),r=this.kr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}},Re=class{constructor(e,t){this.key=e,this.Hr=t}static Kr(e,t){return q.comparator(e.key,t.key)||ee(e.Hr,t.Hr)}static Ur(e,t){return ee(e.Hr,t.Hr)||q.comparator(e.key,t.key)}};var bu=class{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Jr=new Ue(Re.Kr)}checkEmpty(e){return C.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){let o=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let a=new tu(o,t,r,i);this.mutationQueue.push(a);for(let u of i)this.Jr=this.Jr.add(new Re(u.key,o)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return C.resolve(a)}lookupMutationBatch(e,t){return C.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){let r=t+1,i=this.Xr(r),o=i<0?0:i;return C.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return C.resolve(this.mutationQueue.length===0?cl:this.Yn-1)}getAllMutationBatches(e){return C.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new Re(t,0),i=new Re(t,Number.POSITIVE_INFINITY),o=[];return this.Jr.forEachInRange([r,i],a=>{let u=this.Zr(a.Hr);o.push(u)}),C.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ue(ee);return t.forEach(i=>{let o=new Re(i,0),a=new Re(i,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([o,a],u=>{r=r.add(u.Hr)})}),C.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,i=r.length+1,o=r;q.isDocumentKey(o)||(o=o.child(""));let a=new Re(new q(o),0),u=new Ue(ee);return this.Jr.forEachWhile(l=>{let d=l.key.path;return!!r.isPrefixOf(d)&&(d.length===i&&(u=u.add(l.Hr)),!0)},a),C.resolve(this.Yr(u))}Yr(e){let t=[];return e.forEach(r=>{let i=this.Zr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){re(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Jr;return C.forEach(t.mutations,i=>{let o=new Re(i.key,t.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Jr=r})}nr(e){}containsKey(e,t){let r=new Re(t,0),i=this.Jr.firstAfterOrEqual(r);return C.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,C.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){let t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}};var Su=class{constructor(e){this.ti=e,this.docs=function(){return new ve(q.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,i=this.docs.get(r),o=i?i.size:0,a=this.ti(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return C.resolve(r?r.document.mutableCopy():gt.newInvalidDocument(t))}getEntries(e,t){let r=Ht();return t.forEach(i=>{let o=this.docs.get(i);r=r.insert(i,o?o.document.mutableCopy():gt.newInvalidDocument(i))}),C.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let o=Ht(),a=t.path,u=new q(a.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(u);for(;l.hasNext();){let{key:d,value:{document:p}}=l.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||KI(HI(p),r)<=0||(i.has(p.key)||Jo(t,p))&&(o=o.insert(p.key,p.mutableCopy()))}return C.resolve(o)}getAllFromCollectionGroup(e,t,r,i){z(9500)}ni(e,t){return C.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Au(this)}getSize(e){return C.resolve(this.size)}},Au=class extends _u{constructor(e){super(),this.Mr=e}applyChanges(e){let t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.Mr.addEntry(e,i)):this.Mr.removeEntry(r)}),C.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}};var Ru=class{constructor(e){this.persistence=e,this.ri=new Gt(t=>dl(t),fl),this.lastRemoteSnapshotVersion=W.min(),this.highestTargetId=0,this.ii=0,this.si=new Fi,this.targetCount=0,this.oi=Li._r()}forEachTarget(e,t){return this.ri.forEach((r,i)=>t(i)),C.resolve()}getLastRemoteSnapshotVersion(e){return C.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return C.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),C.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ii&&(this.ii=t),C.resolve()}lr(e){this.ri.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.oi=new Li(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,C.resolve()}updateTargetData(e,t){return this.lr(t),C.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,C.resolve()}removeTargets(e,t,r){let i=0,o=[];return this.ri.forEach((a,u)=>{u.sequenceNumber<=t&&r.get(u.targetId)===null&&(this.ri.delete(a),o.push(this.removeMatchingKeysForTargetId(e,u.targetId)),i++)}),C.waitFor(o).next(()=>i)}getTargetCount(e){return C.resolve(this.targetCount)}getTargetData(e,t){let r=this.ri.get(t)||null;return C.resolve(r)}addMatchingKeys(e,t,r){return this.si.$r(t,r),C.resolve()}removeMatchingKeys(e,t,r){this.si.Qr(t,r);let i=this.persistence.referenceDelegate,o=[];return i&&t.forEach(a=>{o.push(i.markPotentiallyOrphaned(e,a))}),C.waitFor(o)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),C.resolve()}getMatchingKeysForTargetId(e,t){let r=this.si.jr(t);return C.resolve(r)}containsKey(e,t){return C.resolve(this.si.containsKey(t))}};var xo=class{constructor(e,t){this._i={},this.overlays={},this.ai=new wr(0),this.ui=!1,this.ui=!0,this.ci=new Tu,this.referenceDelegate=e(this),this.li=new Ru(this),this.indexManager=new fu,this.remoteDocumentCache=function(i){return new Su(i)}(r=>this.referenceDelegate.hi(r)),this.serializer=new du(t),this.Pi=new wu(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Eu,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this._i[e.toKey()];return r||(r=new bu(t,this.referenceDelegate),this._i[e.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,r){O("MemoryPersistence","Starting transaction:",e);let i=new xu(this.ai.next());return this.referenceDelegate.Ti(),r(i).next(o=>this.referenceDelegate.Ii(i).next(()=>o)).toPromise().then(o=>(i.raiseOnCommittedEvent(),o))}Ei(e,t){return C.or(Object.values(this._i).map(r=>()=>r.containsKey(e,t)))}},xu=class extends Uc{constructor(e){super(),this.currentSequenceNumber=e}},Pu=class n{constructor(e){this.persistence=e,this.Ri=new Fi,this.Ai=null}static Vi(e){return new n(e)}get di(){if(this.Ai)return this.Ai;throw z(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.di.delete(r.toString()),C.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.di.add(r.toString()),C.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),C.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach(i=>this.di.add(i.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(o=>this.di.add(o.toString()))}).next(()=>r.removeTargetData(e,t))}Ti(){this.Ai=new Set}Ii(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return C.forEach(this.di,r=>{let i=q.fromPath(r);return this.mi(e,i).next(o=>{o||t.removeEntry(i,W.min())})}).next(()=>(this.Ai=null,t.apply(e)))}updateLimboDocument(e,t){return this.mi(e,t).next(r=>{r?this.di.delete(t.toString()):this.di.add(t.toString())})}hi(e){return 0}mi(e,t){return C.or([()=>C.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}},Po=class n{constructor(e,t){this.persistence=e,this.fi=new Gt(r=>XI(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=Jv(this,t)}static Vi(e,t){return new n(e,t)}Ti(){}Ii(e){return C.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){let t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}pr(e){let t=0;return this.mr(e,r=>{t++}).next(()=>t)}mr(e,t){return C.forEach(this.fi,(r,i)=>this.wr(e,r,i).next(o=>o?C.resolve():t(i)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0,i=this.persistence.getRemoteDocumentCache(),o=i.newChangeBuffer();return i.ni(e,a=>this.wr(e,a,t).next(u=>{u||(r++,o.removeEntry(a,W.min()))})).next(()=>o.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),C.resolve()}removeTarget(e,t){let r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),C.resolve()}removeReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),C.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),C.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=oo(e.data.value)),t}wr(e,t,r){return C.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{let i=this.fi.get(t);return C.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}};var Cu=class n{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Ts=r,this.Is=i}static Es(e,t){let r=X(),i=X();for(let o of t.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:i=i.add(o.doc.key)}return new n(e,t.fromCache,r,i)}};var ku=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}};var Du=class{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=function(){return Qh()?8:JI(Me())>0?6:4}()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,i){let o={result:null};return this.gs(e,t).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.ps(e,t,i,r).next(a=>{o.result=a})}).next(()=>{if(o.result)return;let a=new ku;return this.ys(e,t,a).next(u=>{if(o.result=u,this.As)return this.ws(e,t,a,u.size)})}).next(()=>o.result)}ws(e,t,r,i){return r.documentReadCount<this.Vs?(fr()<=J.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",pr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),C.resolve()):(fr()<=J.DEBUG&&O("QueryEngine","Query:",pr(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.ds*i?(fr()<=J.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",pr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Pt(t))):C.resolve())}gs(e,t){if(Rf(t))return C.resolve(null);let r=Pt(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=wo(t,null,"F"),r=Pt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(o=>{let a=X(...o);return this.fs.getDocuments(e,a).next(u=>this.indexManager.getMinOffset(e,r).next(l=>{let d=this.bs(t,u);return this.Ss(t,d,a,l.readTime)?this.gs(e,wo(t,null,"F")):this.Ds(e,d,t,l)}))})))}ps(e,t,r,i){return Rf(t)||i.isEqual(W.min())?C.resolve(null):this.fs.getDocuments(e,r).next(o=>{let a=this.bs(t,o);return this.Ss(t,a,r,i)?C.resolve(null):(fr()<=J.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),pr(t)),this.Ds(e,a,t,GI(i,Pi)).next(u=>u))})}bs(e,t){let r=new Ue(Np(e));return t.forEach((i,o)=>{Jo(e,o)&&(r=r.add(o))}),r}Ss(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;let o=e.limitType==="F"?t.last():t.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(i)>0)}ys(e,t,r){return fr()<=J.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",pr(t)),this.fs.getDocumentsMatchingQuery(e,t,Ln.min(),r)}Ds(e,t,r,i){return this.fs.getDocumentsMatchingQuery(e,r,i).next(o=>(t.forEach(a=>{o=o.insert(a.key,a)}),o))}};var gl="LocalStore",Yv=3e8,Nu=class{constructor(e,t,r,i){this.persistence=e,this.Cs=t,this.serializer=i,this.vs=new ve(ee),this.Fs=new Gt(o=>dl(o),fl),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(r)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new vu(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.vs))}};function Xv(n,e,t,r){return new Nu(n,e,t,r)}async function tm(n,e){let t=j(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(o=>(i=o,t.Os(e),t.mutationQueue.getAllMutationBatches(r))).next(o=>{let a=[],u=[],l=X();for(let d of i){a.push(d.batchId);for(let p of d.mutations)l=l.add(p.key)}for(let d of o){u.push(d.batchId);for(let p of d.mutations)l=l.add(p.key)}return t.localDocuments.getDocuments(r,l).next(d=>({Ns:d,removedBatchIds:a,addedBatchIds:u}))})})}function Zv(n,e){let t=j(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{let i=e.batch.keys(),o=t.xs.newChangeBuffer({trackRemovals:!0});return function(u,l,d,p){let m=d.batch,g=m.keys(),S=C.resolve();return g.forEach(P=>{S=S.next(()=>p.getEntry(l,P)).next(k=>{let R=d.docVersions.get(P);re(R!==null,48541),k.version.compareTo(R)<0&&(m.applyToRemoteDocument(k,d),k.isValidDocument()&&(k.setReadTime(d.commitVersion),p.addEntry(k)))})}),S.next(()=>u.mutationQueue.removeMutationBatch(l,m))}(t,r,e,o).next(()=>o.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(u){let l=X();for(let d=0;d<u.mutationResults.length;++d)u.mutationResults[d].transformResults.length>0&&(l=l.add(u.batch.mutations[d].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function nm(n){let e=j(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.li.getLastRemoteSnapshotVersion(t))}function ew(n,e){let t=j(n),r=e.snapshotVersion,i=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{let a=t.xs.newChangeBuffer({trackRemovals:!0});i=t.vs;let u=[];e.targetChanges.forEach((p,m)=>{let g=i.get(m);if(!g)return;u.push(t.li.removeMatchingKeys(o,p.removedDocuments,m).next(()=>t.li.addMatchingKeys(o,p.addedDocuments,m)));let S=g.withSequenceNumber(o.currentSequenceNumber);e.targetMismatches.get(m)!==null?S=S.withResumeToken(qe.EMPTY_BYTE_STRING,W.min()).withLastLimboFreeSnapshotVersion(W.min()):p.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(p.resumeToken,r)),i=i.insert(m,S),function(k,R,M){return k.resumeToken.approximateByteSize()===0||R.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=Yv?!0:M.addedDocuments.size+M.modifiedDocuments.size+M.removedDocuments.size>0}(g,S,p)&&u.push(t.li.updateTargetData(o,S))});let l=Ht(),d=X();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&u.push(t.persistence.referenceDelegate.updateLimboDocument(o,p))}),u.push(tw(o,a,e.documentUpdates).next(p=>{l=p.Bs,d=p.Ls})),!r.isEqual(W.min())){let p=t.li.getLastRemoteSnapshotVersion(o).next(m=>t.li.setTargetsMetadata(o,o.currentSequenceNumber,r));u.push(p)}return C.waitFor(u).next(()=>a.apply(o)).next(()=>t.localDocuments.getLocalViewOfDocuments(o,l,d)).next(()=>l)}).then(o=>(t.vs=i,o))}function tw(n,e,t){let r=X(),i=X();return t.forEach(o=>r=r.add(o)),e.getEntries(n,r).next(o=>{let a=Ht();return t.forEach((u,l)=>{let d=o.get(u);l.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(u)),l.isNoDocument()&&l.version.isEqual(W.min())?(e.removeEntry(u,l.readTime),a=a.insert(u,l)):!d.isValidDocument()||l.version.compareTo(d.version)>0||l.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(l),a=a.insert(u,l)):O(gl,"Ignoring outdated watch update for ",u,". Current version:",d.version," Watch version:",l.version)}),{Bs:a,Ls:i}})}function nw(n,e){let t=j(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=cl),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function rw(n,e){let t=j(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.li.getTargetData(r,e).next(o=>o?(i=o,C.resolve(i)):t.li.allocateTargetId(r).next(a=>(i=new Mi(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.li.addTargetData(r,i).next(()=>i))))}).then(r=>{let i=t.vs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.vs=t.vs.insert(r.targetId,r),t.Fs.set(e,r.targetId)),r})}async function Ou(n,e,t){let r=j(n),i=r.vs.get(e),o=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",o,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!Mr(a))throw a;O(gl,`Failed to update sequence numbers for target ${e}: ${a}`)}r.vs=r.vs.remove(e),r.Fs.delete(i.target)}function Uf(n,e,t){let r=j(n),i=W.min(),o=X();return r.persistence.runTransaction("Execute query","readwrite",a=>function(l,d,p){let m=j(l),g=m.Fs.get(p);return g!==void 0?C.resolve(m.vs.get(g)):m.li.getTargetData(d,p)}(r,a,Pt(e)).next(u=>{if(u)return i=u.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(a,u.targetId).next(l=>{o=l})}).next(()=>r.Cs.getDocumentsMatchingQuery(a,e,t?i:W.min(),t?o:X())).next(u=>(iw(r,gv(e),u),{documents:u,ks:o})))}function iw(n,e,t){let r=n.Ms.get(e)||W.min();t.forEach((i,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)}),n.Ms.set(e,r)}var Co=class{constructor(){this.activeTargetIds=Ev()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}};var Vu=class{constructor(){this.vo=new Co,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,r){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new Co,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};var Mu=class{Mo(e){}shutdown(){}};var Bf="ConnectivityMonitor",ko=class{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){O(Bf,"Network connectivity changed: AVAILABLE");for(let e of this.Lo)e(0)}Bo(){O(Bf,"Network connectivity changed: UNAVAILABLE");for(let e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var so=null;function Lu(){return so===null?so=function(){return 268435456+Math.round(2147483648*Math.random())}():so++,"0x"+so.toString(16)}var Dc="RestConnection",sw={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"},Fu=class{get Ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Uo=`projects/${r}/databases/${i}`,this.$o=this.databaseId.database===Io?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(e,t,r,i,o){let a=Lu(),u=this.Qo(e,t.toUriEncodedString());O(Dc,`Sending RPC '${e}' ${a}:`,u,r);let l={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(l,i,o);let{host:d}=new URL(u),p=rn(d);return this.zo(e,u,l,r,p).then(m=>(O(Dc,`Received RPC '${e}' ${a}: `,m),m),m=>{throw jt(Dc,`RPC '${e}' ${a} failed with error: `,m,"url: ",u,"request:",r),m})}jo(e,t,r,i,o,a){return this.Wo(e,t,r,i,o)}Go(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Nr}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,o)=>e[o]=i),r&&r.headers.forEach((i,o)=>e[o]=i)}Qo(e,t){let r=sw[e],i=`${this.qo}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(i=`${i}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),i}terminate(){}};var Uu=class{constructor(e){this.Ho=e.Ho,this.Jo=e.Jo}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Jo()}send(e){this.Ho(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}};var $e="WebChannelConnection",bi=(n,e,t)=>{n.listen(e,r=>{try{t(r)}catch(i){setTimeout(()=>{throw i},0)}})},Do=class n extends Fu{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!n.c_){let e=xc();bi(e,Rc.STAT_EVENT,t=>{t.stat===no.PROXY?O($e,"STAT_EVENT: detected buffering proxy"):t.stat===no.NOPROXY&&O($e,"STAT_EVENT: detected no buffering proxy")}),n.c_=!0}}zo(e,t,r,i,o){let a=Lu();return new Promise((u,l)=>{let d=new Sc;d.setWithCredentials(!0),d.listenOnce(Ac.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case Ti.NO_ERROR:let m=d.getResponseJson();O($e,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(m)),u(m);break;case Ti.TIMEOUT:O($e,`RPC '${e}' ${a} timed out`),l(new F(x.DEADLINE_EXCEEDED,"Request time out"));break;case Ti.HTTP_ERROR:let g=d.getStatus();if(O($e,`RPC '${e}' ${a} failed with status:`,g,"response text:",d.getResponseText()),g>0){let S=d.getResponseJson();Array.isArray(S)&&(S=S[0]);let P=S?.error;if(P&&P.status&&P.message){let k=function(M){let B=M.toLowerCase().replace(/_/g,"-");return Object.values(x).indexOf(B)>=0?B:x.UNKNOWN}(P.status);l(new F(k,P.message))}else l(new F(x.UNKNOWN,"Server responded with status "+d.getStatus()))}else l(new F(x.UNAVAILABLE,"Connection failed."));break;default:z(9055,{l_:e,streamId:a,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{O($e,`RPC '${e}' ${a} completed.`)}});let p=JSON.stringify(i);O($e,`RPC '${e}' ${a} sending request:`,i),d.send(t,"POST",p,r,15)})}T_(e,t,r){let i=Lu(),o=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(u.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Go(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;let d=o.join("");O($e,`Creating RPC '${e}' stream ${i}: ${d}`,u);let p=a.createWebChannel(d,u);this.I_(p);let m=!1,g=!1,S=new Uu({Ho:P=>{g?O($e,`Not sending because RPC '${e}' stream ${i} is closed:`,P):(m||(O($e,`Opening RPC '${e}' stream ${i} transport.`),p.open(),m=!0),O($e,`RPC '${e}' stream ${i} sending:`,P),p.send(P))},Jo:()=>p.close()});return bi(p,dr.EventType.OPEN,()=>{g||(O($e,`RPC '${e}' stream ${i} transport opened.`),S.i_())}),bi(p,dr.EventType.CLOSE,()=>{g||(g=!0,O($e,`RPC '${e}' stream ${i} transport closed`),S.o_(),this.E_(p))}),bi(p,dr.EventType.ERROR,P=>{g||(g=!0,jt($e,`RPC '${e}' stream ${i} transport errored. Name:`,P.name,"Message:",P.message),S.o_(new F(x.UNAVAILABLE,"The operation could not be completed")))}),bi(p,dr.EventType.MESSAGE,P=>{if(!g){let k=P.data[0];re(!!k,16349);let R=k,M=R?.error||R[0]?.error;if(M){O($e,`RPC '${e}' stream ${i} received error:`,M);let B=M.status,K=function(G){let E=Ae[G];if(E!==void 0)return $p(E)}(B),Q=M.message;B==="NOT_FOUND"&&Q.includes("database")&&Q.includes("does not exist")&&Q.includes(this.databaseId.database)&&jt(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),K===void 0&&(K=x.INTERNAL,Q="Unknown error status: "+B+" with message "+M.message),g=!0,S.o_(new F(K,Q)),p.close()}else O($e,`RPC '${e}' stream ${i} received:`,k),S.__(k)}}),n.u_(),setTimeout(()=>{S.s_()},0),S}terminate(){this.a_.forEach(e=>e.close()),this.a_=[]}I_(e){this.a_.push(e)}E_(e){this.a_=this.a_.filter(t=>t===e)}Go(e,t,r){super.Go(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Pc()}};function ow(n){return new Do(n)}function Nc(){return typeof document<"u"?document:null}function $i(n){return new au(n,!0)}Do.c_=!1;var No=class{constructor(e,t,r=1e3,i=1.5,o=6e4){this.Ci=e,this.timerId=t,this.R_=r,this.A_=i,this.V_=o,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();let t=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),i=Math.max(0,t-r);i>0&&O("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,i,()=>(this.f_=Date.now(),e())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}};var qf="PersistentStream",Oo=class{constructor(e,t,r,i,o,a,u,l){this.Ci=e,this.b_=r,this.S_=i,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=l,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new No(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.b_,6e4,()=>this.k_()))}K_(e){this.q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===x.RESOURCE_EXHAUSTED?(zt(t.toString()),zt("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===x.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;let e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.D_===t&&this.G_(r,i)},r=>{e(()=>{let i=new F(x.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(i)})})}G_(e,t){let r=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.Yo(()=>{r(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.S_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(i=>{r(()=>this.z_(i))}),this.stream.onMessage(i=>{r(()=>++this.F_==1?this.H_(i):this.onNext(i))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return O(qf,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget(()=>this.D_===e?t():(O(qf,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}},Bu=class extends Oo{constructor(e,t,r,i,o,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,a),this.serializer=o}j_(e,t){return this.connection.T_("Listen",e,t)}H_(e){return this.onNext(e)}onNext(e){this.M_.reset();let t=Fv(this.serializer,e),r=function(o){if(!("targetChange"in o))return W.min();let a=o.targetChange;return a.targetIds&&a.targetIds.length?W.min():a.readTime?Ct(a.readTime):W.min()}(e);return this.listener.J_(t,r)}Z_(e){let t={};t.database=hu(this.serializer),t.addTarget=function(o,a){let u,l=a.target;if(u=Xc(l)?{documents:qv(o,l)}:{query:zv(o,l).ft},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=Wp(o,a.resumeToken);let d=cu(o,a.expectedCount);d!==null&&(u.expectedCount=d)}else if(a.snapshotVersion.compareTo(W.min())>0){u.readTime=Ao(o,a.snapshotVersion.toTimestamp());let d=cu(o,a.expectedCount);d!==null&&(u.expectedCount=d)}return u}(this.serializer,e);let r=$v(this.serializer,e);r&&(t.labels=r),this.K_(t)}X_(e){let t={};t.database=hu(this.serializer),t.removeTarget=e,this.K_(t)}},qu=class extends Oo{constructor(e,t,r,i,o,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,a),this.serializer=o}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}H_(e){return re(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,re(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){re(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();let t=Bv(e.writeResults,e.commitTime),r=Ct(e.commitTime);return this.listener.na(r,t)}ra(){let e={};e.database=hu(this.serializer),this.K_(e)}ea(e){let t={streamToken:this.lastStreamToken,writes:e.map(r=>Uv(this.serializer,r))};this.K_(t)}};var zu=class{},ju=class extends zu{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.ia=!1}sa(){if(this.ia)throw new F(x.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Wo(e,uu(t,r),i,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===x.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new F(x.UNKNOWN,o.toString())})}jo(e,t,r,i,o){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,u])=>this.connection.jo(e,uu(t,r),i,a,u,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===x.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new F(x.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}};function aw(n,e,t,r){return new ju(n,e,t,r)}var $u=class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(zt(t),this.aa=!1):O("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}};var jn="RemoteStore",Wu=class{constructor(e,t,r,i,o){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.Ra=[],this.Aa=o,this.Aa.Mo(a=>{r.enqueueAndForget(async()=>{Qn(this)&&(O(jn,"Restarting streams for network reachability change."),await async function(l){let d=j(l);d.Ea.add(4),await Wi(d),d.Va.set("Unknown"),d.Ea.delete(4),await Yo(d)}(this))})}),this.Va=new $u(r,i)}};async function Yo(n){if(Qn(n))for(let e of n.Ra)await e(!0)}async function Wi(n){for(let e of n.Ra)await e(!1)}function rm(n,e){let t=j(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),vl(t)?Il(t):Lr(t).O_()&&_l(t,e))}function yl(n,e){let t=j(n),r=Lr(t);t.Ia.delete(e),r.O_()&&im(t,e),t.Ia.size===0&&(r.O_()?r.L_():Qn(t)&&t.Va.set("Unknown"))}function _l(n,e){if(n.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(W.min())>0){let t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Lr(n).Z_(e)}function im(n,e){n.da.$e(e),Lr(n).X_(e)}function Il(n){n.da=new ou({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),Lr(n).start(),n.Va.ua()}function vl(n){return Qn(n)&&!Lr(n).x_()&&n.Ia.size>0}function Qn(n){return j(n).Ea.size===0}function sm(n){n.da=void 0}async function cw(n){n.Va.set("Online")}async function uw(n){n.Ia.forEach((e,t)=>{_l(n,e)})}async function lw(n,e){sm(n),vl(n)?(n.Va.ha(e),Il(n)):n.Va.set("Unknown")}async function hw(n,e,t){if(n.Va.set("Online"),e instanceof bo&&e.state===2&&e.cause)try{await async function(i,o){let a=o.cause;for(let u of o.targetIds)i.Ia.has(u)&&(await i.remoteSyncer.rejectListen(u,a),i.Ia.delete(u),i.da.removeTarget(u))}(n,e)}catch(r){O(jn,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Vo(n,r)}else if(e instanceof Ir?n.da.Xe(e):e instanceof To?n.da.st(e):n.da.tt(e),!t.isEqual(W.min()))try{let r=await nm(n.localStore);t.compareTo(r)>=0&&await function(o,a){let u=o.da.Tt(a);return u.targetChanges.forEach((l,d)=>{if(l.resumeToken.approximateByteSize()>0){let p=o.Ia.get(d);p&&o.Ia.set(d,p.withResumeToken(l.resumeToken,a))}}),u.targetMismatches.forEach((l,d)=>{let p=o.Ia.get(l);if(!p)return;o.Ia.set(l,p.withResumeToken(qe.EMPTY_BYTE_STRING,p.snapshotVersion)),im(o,l);let m=new Mi(p.target,l,d,p.sequenceNumber);_l(o,m)}),o.remoteSyncer.applyRemoteEvent(u)}(n,t)}catch(r){O(jn,"Failed to raise snapshot:",r),await Vo(n,r)}}async function Vo(n,e,t){if(!Mr(e))throw e;n.Ea.add(1),await Wi(n),n.Va.set("Offline"),t||(t=()=>nm(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{O(jn,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await Yo(n)})}function om(n,e){return e().catch(t=>Vo(n,t,e))}async function Xo(n){let e=j(n),t=fn(e),r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:cl;for(;dw(e);)try{let i=await nw(e.localStore,r);if(i===null){e.Ta.length===0&&t.L_();break}r=i.batchId,fw(e,i)}catch(i){await Vo(e,i)}am(e)&&cm(e)}function dw(n){return Qn(n)&&n.Ta.length<10}function fw(n,e){n.Ta.push(e);let t=fn(n);t.O_()&&t.Y_&&t.ea(e.mutations)}function am(n){return Qn(n)&&!fn(n).x_()&&n.Ta.length>0}function cm(n){fn(n).start()}async function pw(n){fn(n).ra()}async function mw(n){let e=fn(n);for(let t of n.Ta)e.ea(t.mutations)}async function gw(n,e,t){let r=n.Ta.shift(),i=nu.from(r,e,t);await om(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await Xo(n)}async function yw(n,e){e&&fn(n).Y_&&await async function(r,i){if(function(a){return Pv(a)&&a!==x.ABORTED}(i.code)){let o=r.Ta.shift();fn(r).B_(),await om(r,()=>r.remoteSyncer.rejectFailedWrite(o.batchId,i)),await Xo(r)}}(n,e),am(n)&&cm(n)}async function zf(n,e){let t=j(n);t.asyncQueue.verifyOperationInProgress(),O(jn,"RemoteStore received new credentials");let r=Qn(t);t.Ea.add(3),await Wi(t),r&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await Yo(t)}async function _w(n,e){let t=j(n);e?(t.Ea.delete(2),await Yo(t)):e||(t.Ea.add(2),await Wi(t),t.Va.set("Unknown"))}function Lr(n){return n.ma||(n.ma=function(t,r,i){let o=j(t);return o.sa(),new Bu(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(n.datastore,n.asyncQueue,{Zo:cw.bind(null,n),Yo:uw.bind(null,n),t_:lw.bind(null,n),J_:hw.bind(null,n)}),n.Ra.push(async e=>{e?(n.ma.B_(),vl(n)?Il(n):n.Va.set("Unknown")):(await n.ma.stop(),sm(n))})),n.ma}function fn(n){return n.fa||(n.fa=function(t,r,i){let o=j(t);return o.sa(),new qu(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:pw.bind(null,n),t_:yw.bind(null,n),ta:mw.bind(null,n),na:gw.bind(null,n)}),n.Ra.push(async e=>{e?(n.fa.B_(),await Xo(n)):(await n.fa.stop(),n.Ta.length>0&&(O(jn,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}var Gu=class n{constructor(e,t,r,i,o){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=o,this.deferred=new Rt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,o){let a=Date.now()+r,u=new n(e,t,a,i,o);return u.start(r),u}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new F(x.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function wl(n,e){if(zt("AsyncQueue",`${e}: ${n}`),Mr(n))return new F(x.UNAVAILABLE,`${e}: ${n}`);throw n}var Ui=class n{static emptySet(e){return new n(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||q.comparator(t.key,r.key):(t,r)=>q.comparator(t.key,r.key),this.keyedMap=Si(),this.sortedSet=new ve(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){let i=t.getNext().key,o=r.getNext().key;if(!i.isEqual(o))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){let r=new n;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}};var Mo=class{constructor(){this.ga=new ve(q.comparator)}track(e){let t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):z(63341,{Vt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){let e=[];return this.ga.inorderTraversal((t,r)=>{e.push(r)}),e}},$n=class n{constructor(e,t,r,i,o,a,u,l,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=l,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,i,o){let a=[];return t.forEach(u=>{a.push({type:0,doc:u})}),new n(e,t,Ui.emptySet(t),a,r,i,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Qo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}};var Hu=class{constructor(){this.wa=void 0,this.ba=[]}Sa(){return this.ba.some(e=>e.Da())}},Ku=class{constructor(){this.queries=jf(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){let i=j(t),o=i.queries;i.queries=jf(),o.forEach((a,u)=>{for(let l of u.ba)l.onError(r)})})(this,new F(x.ABORTED,"Firestore shutting down"))}};function jf(){return new Gt(n=>Dp(n),Qo)}async function Iw(n,e){let t=j(n),r=3,i=e.query,o=t.queries.get(i);o?!o.Sa()&&e.Da()&&(r=2):(o=new Hu,r=e.Da()?0:1);try{switch(r){case 0:o.wa=await t.onListen(i,!0);break;case 1:o.wa=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(a){let u=wl(a,`Initialization of query '${pr(e.query)}' failed`);return void e.onError(u)}t.queries.set(i,o),o.ba.push(e),e.va(t.onlineState),o.wa&&e.Fa(o.wa)&&El(t)}async function vw(n,e){let t=j(n),r=e.query,i=3,o=t.queries.get(r);if(o){let a=o.ba.indexOf(e);a>=0&&(o.ba.splice(a,1),o.ba.length===0?i=e.Da()?0:1:!o.Sa()&&e.Da()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function ww(n,e){let t=j(n),r=!1;for(let i of e){let o=i.query,a=t.queries.get(o);if(a){for(let u of a.ba)u.Fa(i)&&(r=!0);a.wa=i}}r&&El(t)}function Ew(n,e,t){let r=j(n),i=r.queries.get(e);if(i)for(let o of i.ba)o.onError(t);r.queries.delete(e)}function El(n){n.Ca.forEach(e=>{e.next()})}var Qu,$f;($f=Qu||(Qu={})).Ma="default",$f.Cache="cache";var Ju=class{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){let r=[];for(let i of e.docChanges)i.type!==3&&r.push(i);e=new $n(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;let r=t!=="Offline";return(!this.options.Ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;let t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=$n.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Qu.Cache}};var Lo=class{constructor(e){this.key=e}},Fo=class{constructor(e){this.key=e}},Yu=class{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=X(),this.mutatedKeys=X(),this.eu=Np(e),this.tu=new Ui(this.eu)}get nu(){return this.Za}ru(e,t){let r=t?t.iu:new Mo,i=t?t.tu:this.tu,o=t?t.mutatedKeys:this.mutatedKeys,a=i,u=!1,l=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((p,m)=>{let g=i.get(p),S=Jo(this.query,m)?m:null,P=!!g&&this.mutatedKeys.has(g.key),k=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations),R=!1;g&&S?g.data.isEqual(S.data)?P!==k&&(r.track({type:3,doc:S}),R=!0):this.su(g,S)||(r.track({type:2,doc:S}),R=!0,(l&&this.eu(S,l)>0||d&&this.eu(S,d)<0)&&(u=!0)):!g&&S?(r.track({type:0,doc:S}),R=!0):g&&!S&&(r.track({type:1,doc:g}),R=!0,(l||d)&&(u=!0)),R&&(S?(a=a.add(S),o=k?o.add(p):o.delete(p)):(a=a.delete(p),o=o.delete(p)))}),this.query.limit!==null)for(;a.size>this.query.limit;){let p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),o=o.delete(p.key),r.track({type:1,doc:p})}return{tu:a,iu:r,Ss:u,mutatedKeys:o}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){let o=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;let a=e.iu.ya();a.sort((p,m)=>function(S,P){let k=R=>{switch(R){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return z(20277,{Vt:R})}};return k(S)-k(P)}(p.type,m.type)||this.eu(p.doc,m.doc)),this.ou(r),i=i??!1;let u=t&&!i?this._u():[],l=this.Ya.size===0&&this.current&&!i?1:0,d=l!==this.Xa;return this.Xa=l,a.length!==0||d?{snapshot:new $n(this.query,e.tu,o,a,e.mutatedKeys,l===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:u}:{au:u}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Mo,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Za=this.Za.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Za=this.Za.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];let e=this.Ya;this.Ya=X(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Ya=this.Ya.add(r.key))});let t=[];return e.forEach(r=>{this.Ya.has(r)||t.push(new Fo(r))}),this.Ya.forEach(r=>{e.has(r)||t.push(new Lo(r))}),t}cu(e){this.Za=e.ks,this.Ya=X();let t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return $n.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}},Tl="SyncEngine",Xu=class{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}},Zu=class{constructor(e){this.key=e,this.hu=!1}},el=class{constructor(e,t,r,i,o,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new Gt(u=>Dp(u),Qo),this.Iu=new Map,this.Eu=new Set,this.Ru=new ve(q.comparator),this.Au=new Map,this.Vu=new Fi,this.du={},this.mu=new Map,this.fu=Li.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}};async function Tw(n,e,t=!0){let r=pm(n),i,o=r.Tu.get(e);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),i=o.view.lu()):i=await um(r,e,t,!0),i}async function bw(n,e){let t=pm(n);await um(t,e,!0,!1)}async function um(n,e,t,r){let i=await rw(n.localStore,Pt(e)),o=i.targetId,a=n.sharedClientState.addLocalQueryTarget(o,t),u;return r&&(u=await Sw(n,e,o,a==="current",i.resumeToken)),n.isPrimaryClient&&t&&rm(n.remoteStore,i),u}async function Sw(n,e,t,r,i){n.pu=(m,g,S)=>async function(k,R,M,B){let K=R.view.ru(M);K.Ss&&(K=await Uf(k.localStore,R.query,!1).then(({documents:E})=>R.view.ru(E,K)));let Q=B&&B.targetChanges.get(R.targetId),pe=B&&B.targetMismatches.get(R.targetId)!=null,G=R.view.applyChanges(K,k.isPrimaryClient,Q,pe);return Gf(k,R.targetId,G.au),G.snapshot}(n,m,g,S);let o=await Uf(n.localStore,e,!0),a=new Yu(e,o.ks),u=a.ru(o.documents),l=Vi.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),d=a.applyChanges(u,n.isPrimaryClient,l);Gf(n,t,d.au);let p=new Xu(e,t,a);return n.Tu.set(e,p),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),d.snapshot}async function Aw(n,e,t){let r=j(n),i=r.Tu.get(e),o=r.Iu.get(i.targetId);if(o.length>1)return r.Iu.set(i.targetId,o.filter(a=>!Qo(a,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Ou(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&yl(r.remoteStore,i.targetId),tl(r,i.targetId)}).catch(Vr)):(tl(r,i.targetId),await Ou(r.localStore,i.targetId,!0))}async function Rw(n,e){let t=j(n),r=t.Tu.get(e),i=t.Iu.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),yl(t.remoteStore,r.targetId))}async function xw(n,e,t){let r=Vw(n);try{let i=await function(a,u){let l=j(a),d=be.now(),p=u.reduce((S,P)=>S.add(P.key),X()),m,g;return l.persistence.runTransaction("Locally write mutations","readwrite",S=>{let P=Ht(),k=X();return l.xs.getEntries(S,p).next(R=>{P=R,P.forEach((M,B)=>{B.isValidDocument()||(k=k.add(M))})}).next(()=>l.localDocuments.getOverlayedDocuments(S,P)).next(R=>{m=R;let M=[];for(let B of u){let K=xv(B,m.get(B.key).overlayedDocument);K!=null&&M.push(new Kt(B.key,K,Sp(K.value.mapValue),hn.exists(!0)))}return l.mutationQueue.addMutationBatch(S,d,M,u)}).next(R=>{g=R;let M=R.applyToLocalDocumentSet(m,k);return l.documentOverlayCache.saveOverlays(S,R.batchId,M)})}).then(()=>({batchId:g.batchId,changes:Vp(m)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(a,u,l){let d=a.du[a.currentUser.toKey()];d||(d=new ve(ee)),d=d.insert(u,l),a.du[a.currentUser.toKey()]=d}(r,i.batchId,t),await Gi(r,i.changes),await Xo(r.remoteStore)}catch(i){let o=wl(i,"Failed to persist write");t.reject(o)}}async function lm(n,e){let t=j(n);try{let r=await ew(t.localStore,e);e.targetChanges.forEach((i,o)=>{let a=t.Au.get(o);a&&(re(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?a.hu=!0:i.modifiedDocuments.size>0?re(a.hu,14607):i.removedDocuments.size>0&&(re(a.hu,42227),a.hu=!1))}),await Gi(t,r,e)}catch(r){await Vr(r)}}function Wf(n,e,t){let r=j(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){let i=[];r.Tu.forEach((o,a)=>{let u=a.view.va(e);u.snapshot&&i.push(u.snapshot)}),function(a,u){let l=j(a);l.onlineState=u;let d=!1;l.queries.forEach((p,m)=>{for(let g of m.ba)g.va(u)&&(d=!0)}),d&&El(l)}(r.eventManager,e),i.length&&r.Pu.J_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Pw(n,e,t){let r=j(n);r.sharedClientState.updateQueryState(e,"rejected",t);let i=r.Au.get(e),o=i&&i.key;if(o){let a=new ve(q.comparator);a=a.insert(o,gt.newNoDocument(o,W.min()));let u=X().add(o),l=new Eo(W.min(),new Map,new ve(ee),a,u);await lm(r,l),r.Ru=r.Ru.remove(o),r.Au.delete(e),bl(r)}else await Ou(r.localStore,e,!1).then(()=>tl(r,e,t)).catch(Vr)}async function Cw(n,e){let t=j(n),r=e.batch.batchId;try{let i=await Zv(t.localStore,e);dm(t,r,null),hm(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Gi(t,i)}catch(i){await Vr(i)}}async function kw(n,e,t){let r=j(n);try{let i=await function(a,u){let l=j(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let p;return l.mutationQueue.lookupMutationBatch(d,u).next(m=>(re(m!==null,37113),p=m.keys(),l.mutationQueue.removeMutationBatch(d,m))).next(()=>l.mutationQueue.performConsistencyCheck(d)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(d,p,u)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p)).next(()=>l.localDocuments.getDocuments(d,p))})}(r.localStore,e);dm(r,e,t),hm(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Gi(r,i)}catch(i){await Vr(i)}}function hm(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function dm(n,e,t){let r=j(n),i=r.du[r.currentUser.toKey()];if(i){let o=i.get(e);o&&(t?o.reject(t):o.resolve(),i=i.remove(e)),r.du[r.currentUser.toKey()]=i}}function tl(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(let r of n.Iu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Iu.delete(e),n.isPrimaryClient&&n.Vu.Gr(e).forEach(r=>{n.Vu.containsKey(r)||fm(n,r)})}function fm(n,e){n.Eu.delete(e.path.canonicalString());let t=n.Ru.get(e);t!==null&&(yl(n.remoteStore,t),n.Ru=n.Ru.remove(e),n.Au.delete(t),bl(n))}function Gf(n,e,t){for(let r of t)r instanceof Lo?(n.Vu.addReference(r.key,e),Dw(n,r)):r instanceof Fo?(O(Tl,"Document no longer in limbo: "+r.key),n.Vu.removeReference(r.key,e),n.Vu.containsKey(r.key)||fm(n,r.key)):z(19791,{wu:r})}function Dw(n,e){let t=e.key,r=t.path.canonicalString();n.Ru.get(t)||n.Eu.has(r)||(O(Tl,"New document in limbo: "+t),n.Eu.add(r),bl(n))}function bl(n){for(;n.Eu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){let e=n.Eu.values().next().value;n.Eu.delete(e);let t=new q(Ie.fromString(e)),r=n.fu.next();n.Au.set(r,new Zu(t)),n.Ru=n.Ru.insert(t,r),rm(n.remoteStore,new Mi(Pt(Ko(t.path)),r,"TargetPurposeLimboResolution",wr.ce))}}async function Gi(n,e,t){let r=j(n),i=[],o=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach((u,l)=>{a.push(r.pu(l,e,t).then(d=>{if((d||t)&&r.isPrimaryClient){let p=d?!d.fromCache:t?.targetChanges.get(l.targetId)?.current;r.sharedClientState.updateQueryState(l.targetId,p?"current":"not-current")}if(d){i.push(d);let p=Cu.Es(l.targetId,d);o.push(p)}}))}),await Promise.all(a),r.Pu.J_(i),await async function(l,d){let p=j(l);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>C.forEach(d,g=>C.forEach(g.Ts,S=>p.persistence.referenceDelegate.addReference(m,g.targetId,S)).next(()=>C.forEach(g.Is,S=>p.persistence.referenceDelegate.removeReference(m,g.targetId,S)))))}catch(m){if(!Mr(m))throw m;O(gl,"Failed to update sequence numbers: "+m)}for(let m of d){let g=m.targetId;if(!m.fromCache){let S=p.vs.get(g),P=S.snapshotVersion,k=S.withLastLimboFreeSnapshotVersion(P);p.vs=p.vs.insert(g,k)}}}(r.localStore,o))}async function Nw(n,e){let t=j(n);if(!t.currentUser.isEqual(e)){O(Tl,"User change. New user:",e.toKey());let r=await tm(t.localStore,e);t.currentUser=e,function(o,a){o.mu.forEach(u=>{u.forEach(l=>{l.reject(new F(x.CANCELLED,a))})}),o.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Gi(t,r.Ns)}}function Ow(n,e){let t=j(n),r=t.Au.get(e);if(r&&r.hu)return X().add(r.key);{let i=X(),o=t.Iu.get(e);if(!o)return i;for(let a of o){let u=t.Tu.get(a);i=i.unionWith(u.view.nu)}return i}}function pm(n){let e=j(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=lm.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Ow.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Pw.bind(null,e),e.Pu.J_=ww.bind(null,e.eventManager),e.Pu.yu=Ew.bind(null,e.eventManager),e}function Vw(n){let e=j(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Cw.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=kw.bind(null,e),e}var Wn=class{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=$i(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return Xv(this.persistence,new Du,e.initialUser,this.serializer)}Cu(e){return new xo(Pu.Vi,this.serializer)}Du(e){return new Vu}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};Wn.provider={build:()=>new Wn};var Uo=class extends Wn{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){re(this.persistence.referenceDelegate instanceof Po,46915);let r=this.persistence.referenceDelegate.garbageCollector;return new gu(r,e.asyncQueue,t)}Cu(e){let t=this.cacheSizeBytes!==void 0?ct.withCacheSize(this.cacheSizeBytes):ct.DEFAULT;return new xo(r=>Po.Vi(r,t),this.serializer)}};var Cr=class{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Wf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Nw.bind(null,this.syncEngine),await _w(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Ku}()}createDatastore(e){let t=$i(e.databaseInfo.databaseId),r=ow(e.databaseInfo);return aw(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,o,a,u){return new Wu(r,i,o,a,u)}(this.localStore,this.datastore,e.asyncQueue,t=>Wf(this.syncEngine,t,0),function(){return ko.v()?new ko:new Mu}())}createSyncEngine(e,t){return function(i,o,a,u,l,d,p){let m=new el(i,o,a,u,l,d);return p&&(m.gu=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(t){let r=j(t);O(jn,"RemoteStore shutting down."),r.Ea.add(5),await Wi(r),r.Aa.shutdown(),r.Va.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}};Cr.provider={build:()=>new Cr};var nl=class{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):zt("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}};var pn="FirestoreClient",rl=class{constructor(e,t,r,i,o){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=i,this.user=Fe.UNAUTHENTICATED,this.clientId=Mn.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async a=>{O(pn,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(O(pn,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();let e=new Rt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){let r=wl(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}};async function Oc(n,e){n.asyncQueue.verifyOperationInProgress(),O(pn,"Initializing OfflineComponentProvider");let t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await tm(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Hf(n,e){n.asyncQueue.verifyOperationInProgress();let t=await Mw(n);O(pn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>zf(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>zf(e.remoteStore,i)),n._onlineComponents=e}async function Mw(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){O(pn,"Using user provided OfflineComponentProvider");try{await Oc(n,n._uninitializedComponentsProvider._offline)}catch(e){let t=e;if(!function(i){return i.name==="FirebaseError"?i.code===x.FAILED_PRECONDITION||i.code===x.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;jt("Error using user provided cache. Falling back to memory cache: "+t),await Oc(n,new Wn)}}else O(pn,"Using default OfflineComponentProvider"),await Oc(n,new Uo(void 0));return n._offlineComponents}async function mm(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(O(pn,"Using user provided OnlineComponentProvider"),await Hf(n,n._uninitializedComponentsProvider._online)):(O(pn,"Using default OnlineComponentProvider"),await Hf(n,new Cr))),n._onlineComponents}function Lw(n){return mm(n).then(e=>e.syncEngine)}async function Fw(n){let e=await mm(n),t=e.eventManager;return t.onListen=Tw.bind(null,e.syncEngine),t.onUnlisten=Aw.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=bw.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Rw.bind(null,e.syncEngine),t}function gm(n,e,t={}){let r=new Rt;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,u,l,d){let p=new nl({next:g=>{p.Nu(),a.enqueueAndForget(()=>vw(o,m));let S=g.docs.has(u);!S&&g.fromCache?d.reject(new F(x.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&g.fromCache&&l&&l.source==="server"?d.reject(new F(x.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(g)},error:g=>d.reject(g)}),m=new Ju(Ko(u.path),p,{includeMetadataChanges:!0,Ka:!0});return Iw(o,m)}(await Fw(n),n.asyncQueue,e,t,r)),r.promise}function ym(n,e){let t=new Rt;return n.asyncQueue.enqueueAndForget(async()=>xw(await Lw(n),e,t)),t.promise}function _m(n){let e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}var Uw="ComponentProvider",Kf=new Map;function Bw(n,e,t,r,i){return new Bc(n,e,t,i.host,i.ssl,i.experimentalForceLongPolling,i.experimentalAutoDetectLongPolling,_m(i.experimentalLongPollingOptions),i.useFetchStreams,i.isUsingEmulator,r)}var Im="firestore.googleapis.com",Qf=!0,Bo=class{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new F(x.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Im,this.ssl=Qf}else this.host=e.host,this.ssl=e.ssl??Qf;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=em;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Qv)throw new F(x.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}ep("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=_m(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new F(x.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new F(x.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new F(x.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}},Bi=class{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Bo({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new F(x.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new F(x.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Bo(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new lo;switch(r.type){case"firstParty":return new Lc(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new F(x.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){let r=Kf.get(t);r&&(O(Uw,"Removing Datastore"),Kf.delete(t),r.terminate())}(this),Promise.resolve()}};function vm(n,e,t,r={}){n=Hn(n,Bi);let i=rn(e),o=n._getSettings(),a={...o,emulatorOptions:n._getEmulatorOptions()},u=`${e}:${t}`;i&&(gs(`https://${u}`),ys("Firestore",!0)),o.host!==Im&&o.host!==u&&jt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");let l={...o,host:u,ssl:i,emulatorOptions:r};if(!ft(l,a)&&(n._setSettings(l),r.mockUserToken)){let d,p;if(typeof r.mockUserToken=="string")d=r.mockUserToken,p=Fe.MOCK_USER;else{d=jh(r.mockUserToken,n._app?.options.projectId);let m=r.mockUserToken.sub||r.mockUserToken.user_id;if(!m)throw new F(x.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new Fe(m)}n._authCredentials=new Vc(new uo(d,p))}}var qi=class n{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new n(this.firestore,e,this._query)}},Be=class n{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new kr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new n(this.firestore,e,this._key)}toJSON(){return{type:n._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Or(t,n._jsonSchema))return new n(e,r||null,new q(Ie.fromString(t.referencePath)))}};Be._jsonSchemaVersion="firestore/documentReference/1.0",Be._jsonSchema={type:Te("string",Be._jsonSchemaVersion),referencePath:Te("string")};var kr=class n extends qi{constructor(e,t,r){super(e,t,Ko(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new Be(this.firestore,null,new q(e))}withConverter(e){return new n(this.firestore,e,this._path)}};function Hi(n,e,...t){if(n=ze(n),arguments.length===1&&(e=Mn.newId()),WI("doc","path",e),n instanceof Bi){let r=Ie.fromString(e,...t);return mf(r),new Be(n,null,new q(r))}{if(!(n instanceof Be||n instanceof kr))throw new F(x.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(Ie.fromString(e,...t));return mf(r),new Be(n.firestore,n instanceof kr?n.converter:null,new q(r))}}var Jf="AsyncQueue",qo=class{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new No(this,"async_queue_retry"),this._c=()=>{let r=Nc();r&&O(Jf,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;let t=Nc();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;let t=Nc();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});let t=new Rt;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Yu.push(e),this.lc()))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!Mr(e))throw e;O(Jf,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){let t=this.ac.then(()=>(this.rc=!0,e().catch(r=>{throw this.nc=r,this.rc=!1,zt("INTERNAL UNHANDLED ERROR: ",Yf(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);let i=Gu.createAndSchedule(this,e,t,r,o=>this.hc(o));return this.tc.push(i),i}uc(){this.nc&&z(47125,{Pc:Yf(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(let t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(let t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}Rc(e){this.oc.push(e)}hc(e){let t=this.tc.indexOf(e);this.tc.splice(t,1)}};function Yf(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}var Gn=class extends Bi{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new qo,this._persistenceKey=i?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new qo(e),this._firestoreClient=void 0,await e}}};function Sl(n,e){let t=typeof n=="object"?n:ws(),r=typeof n=="string"?n:e||Io,i=si(t,"firestore").getImmediate({identifier:r});if(!i._initialized){let o=zh("firestore");o&&vm(i,...o)}return i}function Zo(n){if(n._terminated)throw new F(x.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||qw(n),n._firestoreClient}function qw(n){let e=n._freezeSettings(),t=Bw(n._databaseId,n._app?.options.appId||"",n._persistenceKey,n._app?.options.apiKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new rl(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(i){let o=i?._online.build();return{_offline:i?._offline.build(o),_online:o}}(n._componentsProvider))}var kt=class n{constructor(e){this._byteString=e}static fromBase64String(e){try{return new n(qe.fromBase64String(e))}catch(t){throw new F(x.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new n(qe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:n._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Or(e,n._jsonSchema))return n.fromBase64String(e.bytes)}};kt._jsonSchemaVersion="firestore/bytes/1.0",kt._jsonSchema={type:Te("string",kt._jsonSchemaVersion),bytes:Te("string")};var Dr=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new F(x.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Qe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};var zi=class{constructor(e){this._methodName=e}};var qt=class n{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new F(x.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new F(x.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ee(this._lat,e._lat)||ee(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:n._jsonSchemaVersion}}static fromJSON(e){if(Or(e,n._jsonSchema))return new n(e.latitude,e.longitude)}};qt._jsonSchemaVersion="firestore/geoPoint/1.0",qt._jsonSchema={type:Te("string",qt._jsonSchemaVersion),latitude:Te("number"),longitude:Te("number")};var Dt=class n{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==i[o])return!1;return!0}(this._values,e._values)}toJSON(){return{type:n._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Or(e,n._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new n(e.vectorValues);throw new F(x.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}};Dt._jsonSchemaVersion="firestore/vectorValue/1.0",Dt._jsonSchema={type:Te("string",Dt._jsonSchemaVersion),vectorValues:Te("object")};var zw=/^__.*__$/,il=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Kt(e,this.data,this.fieldMask,t,this.fieldTransforms):new zn(e,this.data,t,this.fieldTransforms)}};function wm(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw z(40011,{dataSource:n})}}var sl=class n{constructor(e,t,r,i,o,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,o===void 0&&this.validatePath(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new n({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){let t=this.path?.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePathSegment(e),r}childContextForFieldPath(e){let t=this.path?.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePath(),r}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return zo(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(wm(this.dataSource)&&zw.test(e))throw this.createError('Document fields cannot begin and end with "__"')}},ol=class{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||$i(e)}createContext(e,t,r,i=!1){return new sl({dataSource:e,methodName:t,targetDoc:r,path:Qe.emptyPath(),arrayElement:!1,hasConverter:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function Em(n){let e=n._freezeSettings(),t=$i(n._databaseId);return new ol(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Tm(n,e,t,r,i,o={}){let a=n.createContext(o.merge||o.mergeFields?2:0,e,t,i);Rm("Data must be an object, but it was:",a,r);let u=Sm(r,a),l,d;if(o.merge)l=new At(a.fieldMask),d=a.fieldTransforms;else if(o.mergeFields){let p=[];for(let m of o.mergeFields){let g=ea(e,m,t);if(!a.contains(g))throw new F(x.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);$w(p,g)||p.push(g)}l=new At(p),d=a.fieldTransforms.filter(m=>l.covers(m.field))}else l=null,d=a.fieldTransforms;return new il(new ut(u),l,d)}function bm(n,e){if(Am(n=ze(n)))return Rm("Unsupported field value:",e,n),Sm(n,e);if(n instanceof zi)return function(r,i){if(!wm(i.dataSource))throw i.createError(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${r._methodName}() is not currently supported inside arrays`);let o=r._toFieldTransform(i);o&&i.fieldTransforms.push(o)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return function(r,i){let o=[],a=0;for(let u of r){let l=bm(u,i.childContextForArray(a));l==null&&(l={nullValue:"NULL_VALUE"}),o.push(l),a++}return{arrayValue:{values:o}}}(n,e)}return function(r,i){if((r=ze(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Tv(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){let o=be.fromDate(r);return{timestampValue:Ao(i.serializer,o)}}if(r instanceof be){let o=new be(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ao(i.serializer,o)}}if(r instanceof qt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof kt)return{bytesValue:Wp(i.serializer,r._byteString)};if(r instanceof Be){let o=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw i.createError(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:ml(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Dt)return function(a,u){let l=a instanceof Dt?a.toArray():a;return{mapValue:{fields:{[ul]:{stringValue:ll},[Er]:{arrayValue:{values:l.map(p=>{if(typeof p!="number")throw u.createError("VectorValues must only contain numeric values.");return pl(u.serializer,p)})}}}}}}(r,i);if(Xp(r))return r._toProto(i.serializer);throw i.createError(`Unsupported field value: ${$o(r)}`)}(n,e)}function Sm(n,e){let t={};return gp(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Kn(n,(r,i)=>{let o=bm(i,e.childContextForField(r));o!=null&&(t[r]=o)}),{mapValue:{fields:t}}}function Am(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof be||n instanceof qt||n instanceof kt||n instanceof Be||n instanceof zi||n instanceof Dt||Xp(n))}function Rm(n,e,t){if(!Am(t)||!tp(t)){let r=$o(t);throw r==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+r)}}function ea(n,e,t){if((e=ze(e))instanceof Dr)return e._internalPath;if(typeof e=="string")return xm(n,e);throw zo("Field path arguments must be of type string or ",n,!1,void 0,t)}var jw=new RegExp("[~\\*/\\[\\]]");function xm(n,e,t){if(e.search(jw)>=0)throw zo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Dr(...e.split("."))._internalPath}catch{throw zo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function zo(n,e,t,r,i){let o=r&&!r.isEmpty(),a=i!==void 0,u=`Function ${e}() called with invalid data`;t&&(u+=" (via `toFirestore()`)"),u+=". ";let l="";return(o||a)&&(l+=" (found",o&&(l+=` in field ${r}`),a&&(l+=` in document ${i}`),l+=")"),new F(x.INVALID_ARGUMENT,u+n+l)}function $w(n,e){return n.some(t=>t.isEqual(e))}var ji=class{convertValue(e,t="none"){switch(dn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ge(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Wt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw z(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let r={};return Kn(e,(i,o)=>{r[i]=this.convertValue(o,t)}),r}convertVectorValue(e){let t=e.fields?.[Er].arrayValue?.values?.map(r=>ge(r.doubleValue));return new Dt(t)}convertGeoPoint(e){return new qt(ge(e.latitude),ge(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":let r=Ho(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(ki(e));default:return null}}convertTimestamp(e){let t=$t(e);return new be(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=Ie.fromString(e);re(Yp(r),9688,{name:e});let i=new Di(r.get(1),r.get(3)),o=new q(r.popFirst(5));return i.isEqual(t)||zt(`Document ${o} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),o}};var jo=class extends ji{constructor(e){super(),this.firestore=e}convertBytes(e){return new kt(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new Be(this.firestore,null,t)}};var Pm="@firebase/firestore",Cm="4.12.0";var ta=class{constructor(e,t,r,i,o){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new Be(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new Al(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){let t=this._document.data.field(ea("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},Al=class extends ta{data(){return super.data()}};function Kw(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}var Jn=class{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}},Yn=class n extends ta{constructor(e,t,r,i,o,a){super(e,t,r,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=o}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new Fr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let r=this._document.data.field(ea("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new F(x.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e=this._document,t={};return t.type=n._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}};Yn._jsonSchemaVersion="firestore/documentSnapshot/1.0",Yn._jsonSchema={type:Te("string",Yn._jsonSchemaVersion),bundleSource:Te("string","DocumentSnapshot"),bundleName:Te("string"),bundle:Te("string")};var Fr=class extends Yn{data(e={}){return super.data(e)}},Ki=class n{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Jn(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Fr(this._firestore,this._userDataWriter,r.key,r,new Jn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new F(x.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,o){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(u=>{let l=new Fr(i._firestore,i._userDataWriter,u.doc.key,u.doc,new Jn(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter);return u.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(u=>o||u.type!==3).map(u=>{let l=new Fr(i._firestore,i._userDataWriter,u.doc.key,u.doc,new Jn(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter),d=-1,p=-1;return u.type!==0&&(d=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),p=a.indexOf(u.doc.key)),{type:Qw(u.type),doc:l,oldIndex:d,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new F(x.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e={};e.type=n._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Mn.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;let t=[],r=[],i=[];return this.docs.forEach(o=>{o._document!==null&&(t.push(o._document),r.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),i.push(o.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}};function Qw(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return z(61501,{type:n})}}Ki._jsonSchemaVersion="firestore/querySnapshot/1.0",Ki._jsonSchema={type:Te("string",Ki._jsonSchemaVersion),bundleSource:Te("string","QuerySnapshot"),bundleName:Te("string"),bundle:Te("string")};function km(n){n=Hn(n,Be);let e=Hn(n.firestore,Gn),t=Zo(e);return gm(t,n._key).then(r=>Yw(e,n,r))}function Dm(n,e,t){n=Hn(n,Be);let r=Hn(n.firestore,Gn),i=Kw(n.converter,e,t),o=Em(r);return Jw(r,[Tm(o,"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,hn.none())])}function Jw(n,e){let t=Zo(n);return ym(t,e)}function Yw(n,e,t){let r=t.docs.get(e._key),i=new jo(n);return new Yn(n,i,e._key,r,new Jn(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){Xf(cn),an(new ot("firestore",(r,{instanceIdentifier:i,options:o})=>{let a=r.getProvider("app").getImmediate(),u=new Gn(new ho(r.getProvider("auth-internal")),new po(a,r.getProvider("app-check-internal")),wp(a,i),a);return o={useFetchStreams:t,...o},u._setSettings(o),u},"PUBLIC").setMultipleInstances(!0)),pt(Pm,Cm,e),pt(Pm,Cm,"esm2020")})();var Xw={apiKey:"AIzaSyArmnHk6JQLOSbXOfadLaJdGqi4vKUjB9s",authDomain:"the-adaptable-shadow.firebaseapp.com",projectId:"the-adaptable-shadow",storageBucket:"the-adaptable-shadow.firebasestorage.app",messagingSenderId:"1077681265759",appId:"1:1077681265759:web:76a5802c58793799a14fea"},Nm=ja(Xw),Rl=Tc(Nm),Om=Sl(Nm),Zw=new Pn;async function Vm(){return(await Ec(Rl,Zw)).user}async function Mm(){await Ic(Rl)}async function Lm(n,e){await Dm(Hi(Om,"users",n),{...e,updatedAt:Date.now()},{merge:!0})}async function Fm(n){let e=await km(Hi(Om,"users",n));return e.exists()?e.data():null}function Um(n){return _c(Rl,n)}var na="shadow_stats",Qi="shadow_ctx",lt="shadow_history",xl="shadow_last_plan";function it(n,e){try{let t=localStorage.getItem(n);return t?JSON.parse(t):e}catch{return e}}function _t(n,e){try{localStorage.setItem(n,JSON.stringify(e))}catch{}}function eE(n){let e=it(lt,[]);e.unshift({...n,id:Date.now()}),e.length>50&&(e.length=50),_t(lt,e)}var tE=window.AudioContext||window.webkitAudioContext,Pl=null,ra=!0;function nE(){return Pl||(Pl=new tE),Pl}function mn(n=880,e=.1,t="sine",r=.3){if(ra)try{let i=nE(),o=i.createOscillator(),a=i.createGain();o.type=t,o.frequency.setValueAtTime(n,i.currentTime),a.gain.setValueAtTime(r,i.currentTime),a.gain.exponentialRampToValueAtTime(.001,i.currentTime+e),o.connect(a),a.connect(i.destination),o.start(i.currentTime),o.stop(i.currentTime+e)}catch{}}var we={rep:()=>mn(880,.12,"sine",.35),error:()=>{mn(220,.15,"square",.2),setTimeout(()=>mn(180,.15,"square",.2),160)},tick:()=>mn(660,.06,"sine",.15),complete:()=>{mn(523,.15,"sine",.3),setTimeout(()=>mn(659,.15,"sine",.3),150),setTimeout(()=>mn(784,.2,"sine",.3),300),setTimeout(()=>mn(1047,.3,"sine",.35),450)}};function gn(n,e,t){let r=[n[0]-e[0],n[1]-e[1]],i=[t[0]-e[0],t[1]-e[1]],o=r[0]*i[0]+r[1]*i[1],a=Math.sqrt(r[0]**2+r[1]**2)*Math.sqrt(i[0]**2+i[1]**2);return Math.acos(Math.max(-1,Math.min(1,o/(a+1e-9))))*180/Math.PI}var ue={L_SHOULDER:11,R_SHOULDER:12,L_ELBOW:13,R_ELBOW:14,L_WRIST:15,R_WRIST:16,L_HIP:23,R_HIP:24,L_KNEE:25,R_KNEE:26,L_ANKLE:27,R_ANKLE:28};function le(n,e){return[n[e].x,n[e].y]}var kl=[{level:1,label:"\u0E1E\u0E25\u0E31\u0E07\u0E40\u0E15\u0E47\u0E21",sets:3,reps:12,color:"#00ff88"},{level:2,label:"\u0E2A\u0E14\u0E43\u0E2A",sets:3,reps:10,color:"#00ff88"},{level:3,label:"\u0E1E\u0E23\u0E49\u0E2D\u0E21",sets:3,reps:8,color:"#66ff99"},{level:4,label:"\u0E1B\u0E01\u0E15\u0E34",sets:2,reps:10,color:"#ffd700"},{level:5,label:"\u0E40\u0E23\u0E34\u0E48\u0E21\u0E40\u0E2B\u0E19\u0E37\u0E48\u0E2D\u0E22",sets:2,reps:8,color:"#ffd700"},{level:6,label:"\u0E40\u0E2B\u0E19\u0E37\u0E48\u0E2D\u0E22",sets:2,reps:6,color:"#ff9800"},{level:7,label:"\u0E40\u0E2B\u0E19\u0E37\u0E48\u0E2D\u0E22\u0E21\u0E32\u0E01",sets:1,reps:10,color:"#ff6633"},{level:8,label:"\u0E2B\u0E21\u0E14\u0E41\u0E23\u0E07",sets:1,reps:8,color:"#ff4444"},{level:9,label:"\u0E2B\u0E21\u0E14\u0E2A\u0E20\u0E32\u0E1E",sets:1,reps:6,color:"#ff3366"}];async function rE(n,e){console.log("Fetching AI plan from Backend...");let t=kl.find(u=>u.level===e.fatigue)||kl[4],r=t.sets,i=t.reps,o=await fetch("/api/generate-plan",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({stats:n,ctx:e,targetSets:r,targetReps:i})});if(!o.ok){let u=await o.json().catch(()=>({}));throw console.error("Backend/Gemini Error:",o.status,u),new Error(u.message||`Backend Error (${o.status})`)}let a=await o.json();return a.pushup||(a.pushup={sets:r,reps:i,rest_sec:45}),a.squat||(a.squat={sets:r,reps:i,rest_sec:45}),a.plank||(a.plank={sets:r,hold_sec:30,rest_sec:30}),a.lunge||(a.lunge={sets:r,reps:i,rest_sec:45}),a.situp||(a.situp={sets:r,reps:i,rest_sec:45}),a.jumpingjack||(a.jumpingjack={sets:r,reps:i,rest_sec:30}),a.mode||(a.mode="moderate"),a.estimated_duration_min||(a.estimated_duration_min=10),a}function iE({onLogin:n,loading:e}){return React.createElement("div",{style:{minHeight:"100vh",background:"#0a0a12",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 20px",position:"relative",overflow:"hidden"}},React.createElement("div",{style:{position:"absolute",top:"-20%",right:"-10%",width:"500px",height:"500px",borderRadius:"50%",background:"radial-gradient(circle, rgba(0,255,136,0.08), transparent 70%)",pointerEvents:"none"}}),React.createElement("div",{style:{position:"absolute",bottom:"-10%",left:"-10%",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle, rgba(0,191,255,0.06), transparent 70%)",pointerEvents:"none"}}),React.createElement("div",{style:{display:"inline-flex",alignItems:"center",gap:"8px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"50px",padding:"8px 16px",marginBottom:"32px",zIndex:1}},React.createElement("span",{style:{width:"8px",height:"8px",borderRadius:"50%",background:"#00ff88",boxShadow:"0 0 8px #00ff8888"}}),React.createElement("span",{style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",color:"#ffffff88"}},"AI Personal Trainer V2.0")),React.createElement("div",{style:{textAlign:"center",zIndex:1,maxWidth:"560px",marginBottom:"40px"}},React.createElement("h1",{style:{fontFamily:"'Space Mono',monospace",fontSize:"clamp(32px,7vw,56px)",fontWeight:700,lineHeight:1.1,margin:0,color:"#ffffff"}},"\u0E1B\u0E31\u0E49\u0E19\u0E2B\u0E38\u0E48\u0E19\u0E43\u0E19\u0E1D\u0E31\u0E19\u0E14\u0E49\u0E27\u0E22",React.createElement("br",null),React.createElement("span",{style:{background:"linear-gradient(135deg, #00ff88, #00bfff, #3b82f6)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}},"\u0E40\u0E17\u0E23\u0E19\u0E40\u0E19\u0E2D\u0E23\u0E4C AI \u0E2A\u0E48\u0E27\u0E19\u0E15\u0E31\u0E27")),React.createElement("p",{style:{fontFamily:"'Space Mono',monospace",fontSize:"13px",color:"#ffffff55",marginTop:"20px",lineHeight:1.8}},"AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E23\u0E48\u0E32\u0E07\u0E01\u0E32\u0E22 \u0E15\u0E23\u0E27\u0E08\u0E17\u0E48\u0E32 real-time \u0E41\u0E25\u0E30\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E41\u0E1C\u0E19\u0E17\u0E35\u0E48\u0E1B\u0E23\u0E31\u0E1A\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E15\u0E32\u0E21\u0E04\u0E38\u0E13")),React.createElement("button",{onClick:n,disabled:e,style:{padding:"16px 40px",background:"#00ff88",border:"none",borderRadius:"50px",cursor:e?"not-allowed":"pointer",display:"flex",alignItems:"center",gap:"12px",fontFamily:"'Space Mono',monospace",fontSize:"15px",fontWeight:700,color:"#0a0a12",transition:"all 0.3s",boxShadow:"0 0 30px rgba(0,255,136,0.3)",opacity:e?.6:1,minHeight:"56px",zIndex:1,letterSpacing:"0.5px"},onMouseEnter:t=>{e||(t.currentTarget.style.transform="translateY(-3px) scale(1.02)",t.currentTarget.style.boxShadow="0 0 40px rgba(0,255,136,0.5)")},onMouseLeave:t=>{t.currentTarget.style.transform="translateY(0) scale(1)",t.currentTarget.style.boxShadow="0 0 30px rgba(0,255,136,0.3)"}},React.createElement("svg",{width:"20",height:"20",viewBox:"0 0 24 24"},React.createElement("path",{fill:"#4285F4",d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"}),React.createElement("path",{fill:"#34A853",d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"}),React.createElement("path",{fill:"#FBBC05",d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"}),React.createElement("path",{fill:"#EA4335",d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"})),e?"\u0E01\u0E33\u0E25\u0E31\u0E07\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A...":"\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A\u0E14\u0E49\u0E27\u0E22 Google"),React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"16px",maxWidth:"560px",width:"100%",marginTop:"48px",zIndex:1}},[{icon:"",title:"\u0E41\u0E1C\u0E19\u0E1D\u0E36\u0E01\u0E2D\u0E31\u0E08\u0E09\u0E23\u0E34\u0E22\u0E30",desc:"AI \u0E1B\u0E23\u0E31\u0E1A\u0E15\u0E32\u0E21\u0E23\u0E48\u0E32\u0E07\u0E01\u0E32\u0E22\u0E04\u0E38\u0E13"},{icon:"",title:"\u0E15\u0E23\u0E27\u0E08\u0E17\u0E48\u0E32 Real-time",desc:"\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19\u0E17\u0E31\u0E19\u0E17\u0E35\u0E17\u0E33\u0E1C\u0E34\u0E14"},{icon:"",title:"Cloud Sync",desc:"\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22\u0E17\u0E38\u0E01\u0E2D\u0E38\u0E1B\u0E01\u0E23\u0E13\u0E4C"}].map(t=>React.createElement("div",{key:t.title,style:{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"20px",padding:"24px 16px",textAlign:"center",transition:"all 0.3s"},onMouseEnter:r=>{r.currentTarget.style.borderColor="rgba(0,255,136,0.3)",r.currentTarget.style.transform="translateY(-4px)"},onMouseLeave:r=>{r.currentTarget.style.borderColor="rgba(255,255,255,0.06)",r.currentTarget.style.transform="translateY(0)"}},React.createElement("div",{style:{fontSize:"28px",marginBottom:"12px"}},t.icon),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",fontWeight:700,color:"#ffffff",marginBottom:"6px"}},t.title),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"9px",color:"#ffffff44",lineHeight:1.5}},t.desc)))),React.createElement("div",{style:{marginTop:"48px",fontFamily:"'Space Mono',monospace",fontSize:"9px",color:"#ffffff15",letterSpacing:"2px",zIndex:1}},"THE ADAPTABLE SHADOW \u2014 POWERED BY AI + MEDIAPIPE"))}function Je({children:n,onClick:e,variant:t="primary",disabled:r,style:i}){let a={primary:{bg:"linear-gradient(135deg, #00ff88, #00cc6a)",color:"#060810",shadow:"0 0 30px #00ff8888, 0 0 60px #00ff8833"},ghost:{bg:"transparent",color:"#00ff88",shadow:"0 0 15px #00ff8844",border:"2px solid #00ff8866"},danger:{bg:"linear-gradient(135deg, #ff3366, #cc2255)",color:"#fff",shadow:"0 0 30px #ff336688, 0 0 60px #ff336633"}}[t];return React.createElement(React.Fragment,null,React.createElement("style",null,`@keyframes btnPulse{0%,100%{box-shadow:${a.shadow}}50%{box-shadow:${a.shadow.replace(/\d+px/g,u=>parseInt(u)*1.5+"px")}}}`),React.createElement("button",{onClick:e,disabled:r,style:{padding:"16px 36px",fontFamily:"'Space Mono',monospace",fontWeight:700,fontSize:"14px",letterSpacing:"2px",textTransform:"uppercase",cursor:r?"not-allowed":"pointer",border:a.border||"none",borderRadius:"8px",background:a.bg,color:a.color,boxShadow:a.shadow,opacity:r?.4:1,transition:"all 0.25s",animation:r?"none":"btnPulse 2s ease-in-out infinite",...i},onMouseEnter:u=>{r||(u.currentTarget.style.transform="translateY(-2px) scale(1.02)")},onMouseLeave:u=>{u.currentTarget.style.transform="translateY(0) scale(1)"}},n))}function Cl({label:n,value:e,onChange:t,min:r,max:i,step:o=1,unit:a}){return React.createElement("div",{style:{marginBottom:"20px"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",letterSpacing:"2px",color:"#00ff8899",textTransform:"uppercase",marginBottom:"8px"}},n),React.createElement("div",{style:{display:"flex",alignItems:"center",gap:"8px"}},React.createElement("input",{type:"number",min:r,max:i,step:o,value:e,onChange:u=>{let l=Number(u.target.value);isNaN(l)||t(l)},onBlur:u=>{let l=Number(u.target.value);l<r&&(l=r),l>i&&(l=i),t(l)},style:{flex:1,background:"#060810",border:"1px solid #00ff8833",borderRadius:"4px",padding:"12px 14px",color:"#00ff88",fontFamily:"'Space Mono',monospace",fontSize:"18px",fontWeight:700,outline:"none",boxSizing:"border-box",textAlign:"center",appearance:"textfield",MozAppearance:"textfield",WebkitAppearance:"none"}}),React.createElement("span",{style:{fontFamily:"'Space Mono',monospace",fontSize:"14px",color:"#ffffff66",minWidth:"30px"}},a)),React.createElement("style",null,"input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}"))}function sE({mode:n}){let e={micro:{color:"#ff9800",bg:"#ff980022",label:"MICRO"},moderate:{color:"#00bfff",bg:"#00bfff22",label:"MODERATE"},full:{color:"#00ff88",bg:"#00ff8822",label:"FULL POWER"}},t=e[n]||e.moderate;return React.createElement("span",{style:{padding:"4px 12px",borderRadius:"2px",border:`1px solid ${t.color}`,background:t.bg,color:t.color,fontFamily:"'Space Mono',monospace",fontSize:"11px",letterSpacing:"2px",fontWeight:700}},t.label)}function oE({stats:n,setStats:e,onNext:t,onQuickStart:r,hasLastPlan:i}){let o=()=>{let a=n.weight/(n.height/100)**2,u=Math.round((1.2*a+.23*25-5.4)*10)/10;e(l=>({...l,bodyFat:Math.max(5,Math.min(50,u))}))};return React.createElement("div",{style:{maxWidth:"480px",margin:"0 auto",padding:"32px 20px"}},React.createElement("div",{style:{marginBottom:"32px"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"10px",letterSpacing:"4px",color:"#00ff8855",marginBottom:"10px"}},"\u0E02\u0E31\u0E49\u0E19\u0E15\u0E2D\u0E19 1/2"),React.createElement("h1",{style:{fontFamily:"'Space Mono',monospace",fontSize:"clamp(24px,5vw,36px)",fontWeight:700,color:"#ffffff",lineHeight:1.15,margin:0}},"\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25",React.createElement("span",{style:{color:"#00ff88"}},"\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13")),React.createElement("p",{style:{color:"#ffffff44",fontFamily:"'Space Mono',monospace",fontSize:"11px",marginTop:"12px",lineHeight:1.8}},"AI \u0E08\u0E30\u0E43\u0E0A\u0E49\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E19\u0E35\u0E49\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E1B\u0E23\u0E41\u0E01\u0E23\u0E21\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E15\u0E31\u0E27")),React.createElement("div",{style:{marginBottom:"16px",background:"#12141d",border:"1px solid #ffffff11",borderRadius:"12px",padding:"20px"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"10px",letterSpacing:"2px",color:"#00ff8877",textTransform:"uppercase",marginBottom:"10px"}}," \u0E0A\u0E37\u0E48\u0E2D\u0E40\u0E25\u0E48\u0E19"),React.createElement("input",{value:n.nickname||"",onChange:a=>e(u=>({...u,nickname:a.target.value})),placeholder:"\u0E40\u0E0A\u0E48\u0E19: \u0E40\u0E1A\u0E2A\u0E17\u0E4C, \u0E1E\u0E35\u0E48\u0E21\u0E32\u0E23\u0E4C\u0E04, \u0E40\u0E1A\u0E19\u0E0B\u0E4C",style:{width:"100%",background:"#0d0f18",border:"1px solid #ffffff15",borderRadius:"8px",padding:"12px 14px",color:"#00ff88",fontFamily:"'Space Mono',monospace",fontSize:"14px",fontWeight:700,outline:"none",boxSizing:"border-box"}})),React.createElement("div",{style:{background:"#12141d",border:"1px solid #ffffff11",borderRadius:"12px",padding:"24px"}},React.createElement(Cl,{label:"\u0E19\u0E49\u0E33\u0E2B\u0E19\u0E31\u0E01",value:n.weight,onChange:a=>e(u=>({...u,weight:a})),min:40,max:150,step:.5,unit:"kg"}),React.createElement(Cl,{label:"\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E39\u0E07",value:n.height,onChange:a=>e(u=>({...u,height:a})),min:140,max:220,unit:"cm"}),React.createElement(Cl,{label:"\u0E44\u0E02\u0E21\u0E31\u0E19\u0E43\u0E19\u0E23\u0E48\u0E32\u0E07\u0E01\u0E32\u0E22",value:n.bodyFat,onChange:a=>e(u=>({...u,bodyFat:a})),min:5,max:50,step:.5,unit:"%"}),React.createElement("button",{onClick:o,style:{width:"100%",marginTop:"8px",padding:"12px 16px",background:"#ffd70011",border:"1px solid #ffd70033",borderRadius:"8px",cursor:"pointer",fontFamily:"'Space Mono',monospace",fontSize:"12px",fontWeight:700,color:"#ffd700",transition:"all 0.2s",minHeight:"48px"},onMouseEnter:a=>{a.currentTarget.style.background="#ffd70022"},onMouseLeave:a=>{a.currentTarget.style.background="#ffd70011"}},"\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E04\u0E48\u0E32\u0E44\u0E02\u0E21\u0E31\u0E19\u0E43\u0E2B\u0E49"),React.createElement("div",{style:{marginTop:"16px",padding:"14px",background:"#0d0f18",borderRadius:"8px",border:"1px solid #ffffff08"}},React.createElement("div",{style:{display:"flex",justifyContent:"space-around"}},[["BMI",(n.weight/(n.height/100)**2).toFixed(1)],["\u0E44\u0E02\u0E21\u0E31\u0E19",(n.weight*n.bodyFat/100).toFixed(1)+"kg"],["\u0E01\u0E25\u0E49\u0E32\u0E21",(n.weight*(1-n.bodyFat/100)).toFixed(1)+"kg"]].map(([a,u])=>React.createElement("div",{key:a,style:{textAlign:"center"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"18px",fontWeight:700,color:"#ffd700"}},u),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"9px",color:"#ffffff33",letterSpacing:"1px",marginTop:"4px"}},a)))))),React.createElement("div",{style:{marginTop:"16px",background:"#12141d",border:"1px solid #ffffff11",borderRadius:"12px",padding:"20px"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"10px",letterSpacing:"2px",color:"#ffd70088",marginBottom:"10px"}}," \u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49"),React.createElement("textarea",{value:n.goal||"",onChange:a=>e(u=>({...u,goal:a.target.value})),rows:2,placeholder:"\u0E40\u0E0A\u0E48\u0E19: \u0E2D\u0E22\u0E32\u0E01\u0E25\u0E14\u0E1E\u0E38\u0E07, \u0E40\u0E2A\u0E23\u0E34\u0E21\u0E41\u0E02\u0E19, \u0E1D\u0E36\u0E01\u0E04\u0E27\u0E32\u0E21\u0E2D\u0E14\u0E17\u0E19",style:{width:"100%",background:"#0d0f18",border:"1px solid #ffffff15",borderRadius:"8px",padding:"12px 14px",color:"#ffd700",fontFamily:"'Space Mono',monospace",fontSize:"12px",outline:"none",boxSizing:"border-box",resize:"vertical",lineHeight:1.7}})),React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"12px",marginTop:"28px"}},React.createElement(Je,{onClick:t,style:{width:"100%",minHeight:"52px"}},"\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E23\u0E48\u0E32\u0E07\u0E01\u0E32\u0E22 \u2192"),i&&React.createElement(Je,{variant:"ghost",onClick:r,style:{width:"100%",borderColor:"#ffd70044",color:"#ffd700",minHeight:"52px"}}," \u0E40\u0E23\u0E34\u0E48\u0E21\u0E2D\u0E2D\u0E01\u0E01\u0E33\u0E25\u0E31\u0E07\u0E40\u0E25\u0E22 (\u0E41\u0E1C\u0E19\u0E40\u0E14\u0E34\u0E21)")))}function aE({ctx:n,setCtx:e,onBack:t,onAnalyze:r,loading:i,error:o}){let a=kl,u=a.find(l=>l.level===n.fatigue)||a[4];return React.createElement("div",{style:{maxWidth:"480px",margin:"0 auto",padding:"32px 20px"}},React.createElement("div",{style:{marginBottom:"28px"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"10px",letterSpacing:"4px",color:"#00ff8855",marginBottom:"10px"}},"\u0E02\u0E31\u0E49\u0E19\u0E15\u0E2D\u0E19 2/2"),React.createElement("h1",{style:{fontFamily:"'Space Mono',monospace",fontSize:"clamp(24px,5vw,36px)",fontWeight:700,color:"#ffffff",lineHeight:1.15,margin:0}},"\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49",React.createElement("span",{style:{color:"#00ff88"}},"\u0E40\u0E1B\u0E47\u0E19\u0E22\u0E31\u0E07\u0E44\u0E07?"))),React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"16px"}},React.createElement("div",{style:{background:"#12141d",border:"1px solid #ffffff11",borderRadius:"12px",padding:"24px"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"10px",letterSpacing:"2px",color:"#00ff8877",textTransform:"uppercase",marginBottom:"16px"}}," \u0E23\u0E30\u0E14\u0E31\u0E1A\u0E1E\u0E25\u0E31\u0E07\u0E07\u0E32\u0E19\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49"),React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"20px",padding:"16px",background:`${u.color}08`,border:`1px solid ${u.color}22`,borderRadius:"10px"}},React.createElement("div",null,React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"20px",fontWeight:700,color:u.color}},u.label),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",color:"#ffffff44",marginTop:"4px"}},"\u0E23\u0E30\u0E14\u0E31\u0E1A ",u.level,"/9")),React.createElement("div",{style:{textAlign:"right"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"28px",fontWeight:700,color:u.color}},u.sets,"\xD7",u.reps),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"9px",color:"#ffffff33",marginTop:"2px"}},"SET \xD7 REP"))),React.createElement("input",{type:"range",min:"1",max:"9",step:"1",value:n.fatigue,onChange:l=>e(d=>({...d,fatigue:Number(l.target.value)})),style:{width:"100%",height:"8px",borderRadius:"4px",background:"linear-gradient(to right, #00ff88, #ffd700, #ff4444)",cursor:"pointer",outline:"none",WebkitAppearance:"none",appearance:"none"}}),React.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"8px"}},React.createElement("span",{style:{fontFamily:"'Space Mono',monospace",fontSize:"9px",color:"#00ff8877"}},"\u0E1E\u0E25\u0E31\u0E07\u0E40\u0E15\u0E47\u0E21"),React.createElement("span",{style:{fontFamily:"'Space Mono',monospace",fontSize:"9px",color:"#ff444477"}},"\u0E2B\u0E21\u0E14\u0E2A\u0E20\u0E32\u0E1E"))),[{key:"calendar",label:" \u0E15\u0E32\u0E23\u0E32\u0E07\u0E07\u0E32\u0E19",placeholder:"\u0E40\u0E0A\u0E48\u0E19: \u0E1B\u0E23\u0E30\u0E0A\u0E38\u0E21 3 \u0E0A\u0E21., \u0E27\u0E48\u0E32\u0E07..."},{key:"location",label:" \u0E2A\u0E16\u0E32\u0E19\u0E17\u0E35\u0E48",placeholder:"\u0E40\u0E0A\u0E48\u0E19: \u0E1A\u0E49\u0E32\u0E19, \u0E2D\u0E2D\u0E1F\u0E1F\u0E34\u0E28, \u0E22\u0E34\u0E21..."},{key:"weather",label:" \u0E2D\u0E32\u0E01\u0E32\u0E28",placeholder:"\u0E40\u0E0A\u0E48\u0E19: \u0E23\u0E49\u0E2D\u0E19, \u0E1D\u0E19\u0E15\u0E01, \u0E41\u0E14\u0E14\u0E08\u0E49\u0E32..."}].map(({key:l,label:d,placeholder:p})=>React.createElement("div",{key:l,style:{background:"#12141d",border:"1px solid #ffffff11",borderRadius:"12px",padding:"18px 20px"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"10px",letterSpacing:"2px",color:"#00ff8877",marginBottom:"10px"}},d),React.createElement("input",{value:n[l],onChange:m=>e(g=>({...g,[l]:m.target.value})),placeholder:p,style:{width:"100%",background:"#0d0f18",border:"1px solid #ffffff15",borderRadius:"8px",padding:"12px 14px",color:"#ffffff",fontFamily:"'Space Mono',monospace",fontSize:"13px",outline:"none",boxSizing:"border-box"}})))),o&&React.createElement("div",{style:{marginTop:"16px",padding:"12px",background:"#ff336615",border:"1px solid #ff336644",borderRadius:"8px",color:"#ff6688",fontFamily:"'Space Mono',monospace",fontSize:"12px"}},o),React.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"28px",gap:"12px"}},React.createElement("button",{onClick:t,style:{padding:"14px 24px",background:"transparent",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"50px",cursor:"pointer",fontFamily:"'Space Mono',monospace",fontSize:"12px",color:"#ffffff55",transition:"all 0.2s",minHeight:"52px"}},"\u2190 \u0E01\u0E25\u0E31\u0E1A"),React.createElement("button",{onClick:r,disabled:i,style:{flex:1,padding:"14px 24px",background:"#00ff88",border:"none",borderRadius:"50px",cursor:i?"not-allowed":"pointer",fontFamily:"'Space Mono',monospace",fontSize:"14px",fontWeight:700,color:"#0a0a12",transition:"all 0.3s",boxShadow:"0 0 30px rgba(0,255,136,0.3)",opacity:i?.6:1,minHeight:"52px"}},i?"\u0E01\u0E33\u0E25\u0E31\u0E07\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C...":"\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E41\u0E1C\u0E19 AI ")))}function cE(){let[n,e]=(0,V.useState)(0);return(0,V.useEffect)(()=>{let t=setInterval(()=>e(r=>(r+1)%4),400);return()=>clearInterval(t)},[]),React.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"80vh",textAlign:"center",padding:"40px"}},React.createElement("div",{style:{width:"60px",height:"60px",border:"3px solid rgba(255,255,255,0.06)",borderTop:"3px solid #00ff88",borderRadius:"50%",animation:"spin 1s linear infinite",marginBottom:"40px"}}),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"10px",letterSpacing:"4px",color:"#ffffff33"}},"AI \u0E01\u0E33\u0E25\u0E31\u0E07\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C"),React.createElement("h2",{style:{fontFamily:"'Space Mono',monospace",color:"#ffffff",fontSize:"24px",margin:"16px 0"}},"\u0E01\u0E33\u0E25\u0E31\u0E07\u0E04\u0E34\u0E14",".".repeat(n)),React.createElement("p",{style:{color:"#ffffff44",fontFamily:"'Space Mono',monospace",fontSize:"12px",maxWidth:"300px",lineHeight:1.8}},"\u0E01\u0E33\u0E25\u0E31\u0E07\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E23\u0E48\u0E32\u0E07\u0E01\u0E32\u0E22\u0E41\u0E25\u0E30\u0E1A\u0E23\u0E34\u0E1A\u0E17\u0E0A\u0E35\u0E27\u0E34\u0E15\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13"))}function uE({plan:n,onStart:e,onStartGuided:t,onBack:r,onHistory:i,onDashboard:o}){let u={micro:"#ff9800",moderate:"#00bfff",full:"#00ff88"}[n.mode]||"#00ff88",l=()=>{let p=encodeURIComponent(`The Adaptable Shadow: ${n.mode.toUpperCase()} WORKOUT`),m=encodeURIComponent(`\u0E15\u0E32\u0E23\u0E32\u0E07\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49:
${n.message}
Push-up: ${n.pushup.sets}x${n.pushup.reps}
Squat: ${n.squat.sets}x${n.squat.reps}`),g=new Date,S=new Date(g.getTime()+10*6e4),P=new Date(S.getTime()+n.estimated_duration_min*6e4),k=S.toISOString().replace(/-|:|\.\d\d\d/g,""),R=P.toISOString().replace(/-|:|\.\d\d\d/g,"");return`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${p}&dates=${k}/${R}&details=${m}`},d=[{key:"pushup",label:"Push-up",img:"/exercises/pushup.png",stat:`${n.pushup.sets}\xD7${n.pushup.reps}`,sub:`\u0E1E\u0E31\u0E01 ${n.pushup.rest_sec}\u0E27\u0E34`,accent:"#00ff88"},{key:"squat",label:"Squat",img:"/exercises/squat.png",stat:`${n.squat.sets}\xD7${n.squat.reps}`,sub:`\u0E1E\u0E31\u0E01 ${n.squat.rest_sec}\u0E27\u0E34`,accent:"#00bfff"},{key:"plank",label:"Plank",img:"/exercises/plank.png",stat:`${n.plank.sets}\xD7${n.plank.hold_sec}s`,sub:`\u0E1E\u0E31\u0E01 ${n.plank.rest_sec}\u0E27\u0E34`,accent:"#ffd700"},{key:"lunge",label:"Lunge",img:"/exercises/lunge.png",stat:`${n.lunge.sets}\xD7${n.lunge.reps}`,sub:`\u0E1E\u0E31\u0E01 ${n.lunge.rest_sec}\u0E27\u0E34`,accent:"#ff6633"},{key:"situp",label:"Sit-up",img:"/exercises/situp.png",stat:`${n.situp.sets}\xD7${n.situp.reps}`,sub:`\u0E1E\u0E31\u0E01 ${n.situp.rest_sec}\u0E27\u0E34`,accent:"#a855f7"},{key:"jumpingjack",label:"Jumping Jack",img:"/exercises/jumpingjack.png",stat:`${n.jumpingjack.sets}\xD7${n.jumpingjack.reps}`,sub:`\u0E1E\u0E31\u0E01 ${n.jumpingjack.rest_sec}\u0E27\u0E34`,accent:"#ff3366"}];return React.createElement("div",{style:{maxWidth:"520px",margin:"0 auto",padding:"32px 20px"}},React.createElement("div",{style:{marginBottom:"28px"}},React.createElement("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"}},React.createElement(sE,{mode:n.mode}),React.createElement("span",{style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",color:"#ffffff44"}},n.estimated_duration_min," \u0E19\u0E32\u0E17\u0E35")),React.createElement("h1",{style:{fontFamily:"'Space Mono',monospace",fontSize:"clamp(24px,5vw,36px)",fontWeight:700,color:"#ffffff",lineHeight:1.15,margin:0}},"\u0E41\u0E1C\u0E19\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13 ",React.createElement("span",{style:{background:"linear-gradient(135deg, #00ff88, #00bfff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}},"\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E41\u0E25\u0E49\u0E27!"))),React.createElement("div",{style:{background:"#111318",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"20px",padding:"20px",marginBottom:"24px"}},React.createElement("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px"}},React.createElement("div",{style:{width:"40px",height:"40px",borderRadius:"50%",background:`${u}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px"}}),React.createElement("div",null,React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"12px",fontWeight:700,color:"#ffffff"}},"AI Coach"),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"9px",color:u}},"\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E2A\u0E31\u0E01\u0E04\u0E23\u0E39\u0E48"))),React.createElement("p",{style:{color:"#ffffffcc",fontFamily:"'Space Mono',monospace",fontSize:"13px",lineHeight:1.8,margin:0}},n.message),React.createElement("p",{style:{color:u,fontFamily:"'Space Mono',monospace",fontSize:"12px",margin:"10px 0 0",fontStyle:"italic"}}," ",n.motivation)),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"10px",color:"#ffffff44",letterSpacing:"2px",marginBottom:"12px"}},"\u0E41\u0E1C\u0E19\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E27\u0E31\u0E19"),React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"10px",marginBottom:"24px"}},d.map(({key:p,label:m,img:g,stat:S,sub:P,accent:k})=>React.createElement("button",{key:p,onClick:()=>e(p),style:{background:"#111318",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"16px",padding:"16px 18px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",transition:"all 0.2s",textAlign:"left"},onMouseEnter:R=>{R.currentTarget.style.borderColor=`${k}44`,R.currentTarget.style.transform="translateX(4px)"},onMouseLeave:R=>{R.currentTarget.style.borderColor="rgba(255,255,255,0.06)",R.currentTarget.style.transform="translateX(0)"}},React.createElement("div",{style:{display:"flex",alignItems:"center",gap:"14px"}},React.createElement("img",{src:g,alt:m,style:{width:"44px",height:"44px",borderRadius:"12px",objectFit:"cover",flexShrink:0}}),React.createElement("div",null,React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"13px",fontWeight:700,color:"#ffffff"}},m),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"10px",color:"#ffffff44",marginTop:"2px"}},P))),React.createElement("div",{style:{display:"flex",alignItems:"center",gap:"12px"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"16px",fontWeight:700,color:k}},S),React.createElement("div",{style:{color:"#ffffff33",fontSize:"16px"}},"\u203A"))))),React.createElement("div",{style:{background:"#111318",border:"1px solid #ffd70022",borderRadius:"14px",padding:"14px 18px",marginBottom:"24px",display:"flex",alignItems:"center",gap:"10px"}},React.createElement("span",{style:{fontSize:"16px"}}),React.createElement("span",{style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",color:"#ffd700cc"}},n.form_tip)),React.createElement("button",{onClick:t,style:{width:"100%",padding:"18px",background:"#00ff88",border:"none",borderRadius:"50px",cursor:"pointer",fontFamily:"'Space Mono',monospace",fontSize:"14px",fontWeight:700,color:"#0a0a12",transition:"all 0.3s",boxShadow:"0 0 30px rgba(0,255,136,0.3)",minHeight:"56px",marginBottom:"16px"},onMouseEnter:p=>{p.currentTarget.style.transform="translateY(-2px)",p.currentTarget.style.boxShadow="0 0 40px rgba(0,255,136,0.5)"},onMouseLeave:p=>{p.currentTarget.style.transform="translateY(0)",p.currentTarget.style.boxShadow="0 0 30px rgba(0,255,136,0.3)"}}," \u0E40\u0E23\u0E34\u0E48\u0E21\u0E2D\u0E2D\u0E01\u0E01\u0E33\u0E25\u0E31\u0E07\u0E01\u0E32\u0E22\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34 (\u0E17\u0E33\u0E17\u0E38\u0E01\u0E17\u0E48\u0E32)"),React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"10px",marginBottom:"16px"}},[{label:" Calendar",onClick:()=>window.open(l(),"_blank"),accent:"#00ff88"},{label:" History",onClick:i,accent:"#00bfff"},{label:" Stats",onClick:o,accent:"#a855f7"}].map(p=>React.createElement("button",{key:p.label,onClick:p.onClick,style:{padding:"12px",background:"#111318",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"14px",cursor:"pointer",fontFamily:"'Space Mono',monospace",fontSize:"10px",fontWeight:700,color:p.accent,transition:"all 0.2s"},onMouseEnter:m=>m.currentTarget.style.borderColor=`${p.accent}44`,onMouseLeave:m=>m.currentTarget.style.borderColor="rgba(255,255,255,0.06)"},p.label))),React.createElement("button",{onClick:r,style:{width:"100%",padding:"14px",background:"transparent",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"50px",cursor:"pointer",fontFamily:"'Space Mono',monospace",fontSize:"12px",color:"#ffffff44",transition:"all 0.2s"}},"\u2190 \u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19\u0E43\u0E2B\u0E21\u0E48"))}function lE({exercise:n,onNext:e,onBack:t}){let r={pushup:"/exercises/pushup.png",squat:"/exercises/squat.png",plank:"/exercises/plank.png",lunge:"/exercises/lunge.png",situp:"/exercises/situp.png",jumpingjack:"/exercises/jumpingjack.png"},i={pushup:["\u0E2B\u0E25\u0E31\u0E07\u0E41\u0E25\u0E30\u0E25\u0E33\u0E15\u0E31\u0E27\u0E15\u0E49\u0E2D\u0E07\u0E15\u0E23\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E41\u0E1C\u0E48\u0E19\u0E01\u0E23\u0E30\u0E14\u0E32\u0E19","\u0E25\u0E07\u0E43\u0E2B\u0E49\u0E25\u0E36\u0E01\u0E08\u0E19\u0E02\u0E49\u0E2D\u0E28\u0E2D\u0E01\u0E17\u0E33\u0E21\u0E38\u0E21 90 \u0E2D\u0E07\u0E28\u0E32","\u0E21\u0E37\u0E2D\u0E15\u0E49\u0E2D\u0E07\u0E27\u0E32\u0E07\u0E1A\u0E19\u0E1E\u0E37\u0E49\u0E19 \u0E44\u0E21\u0E48\u0E43\u0E0A\u0E48\u0E22\u0E37\u0E19\u0E01\u0E32\u0E07\u0E41\u0E02\u0E19","\u0E15\u0E32\u0E04\u0E27\u0E23\u0E21\u0E2D\u0E07\u0E15\u0E23\u0E07\u0E44\u0E1B\u0E02\u0E49\u0E32\u0E07\u0E2B\u0E19\u0E49\u0E32\u0E40\u0E25\u0E47\u0E01\u0E19\u0E49\u0E2D\u0E22"],squat:["\u0E17\u0E34\u0E49\u0E07\u0E19\u0E49\u0E33\u0E2B\u0E19\u0E31\u0E01\u0E25\u0E07\u0E17\u0E35\u0E48\u0E2A\u0E49\u0E19\u0E40\u0E17\u0E49\u0E32","\u0E22\u0E48\u0E2D\u0E25\u0E07\u0E08\u0E19\u0E2A\u0E30\u0E42\u0E1E\u0E01\u0E43\u0E01\u0E25\u0E49\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E40\u0E02\u0E48\u0E32","\u0E2B\u0E49\u0E32\u0E21\u0E43\u0E2B\u0E49\u0E40\u0E02\u0E48\u0E32\u0E2B\u0E38\u0E1A\u0E40\u0E02\u0E49\u0E32\u0E2B\u0E32\u0E01\u0E31\u0E19","\u0E25\u0E33\u0E15\u0E31\u0E27\u0E15\u0E31\u0E49\u0E07\u0E15\u0E23\u0E07 \u0E2B\u0E49\u0E32\u0E21\u0E40\u0E2D\u0E19\u0E44\u0E1B\u0E02\u0E49\u0E32\u0E07\u0E2B\u0E19\u0E49\u0E32"],plank:["\u0E25\u0E33\u0E15\u0E31\u0E27\u0E15\u0E23\u0E07\u0E40\u0E2A\u0E49\u0E19\u0E40\u0E14\u0E35\u0E22\u0E27\u0E15\u0E31\u0E49\u0E07\u0E41\u0E15\u0E48\u0E2B\u0E31\u0E27\u0E16\u0E36\u0E07\u0E2A\u0E49\u0E19\u0E40\u0E17\u0E49\u0E32","\u0E22\u0E01\u0E15\u0E31\u0E27\u0E02\u0E36\u0E49\u0E19\u0E08\u0E32\u0E01\u0E1E\u0E37\u0E49\u0E19 \u0E2B\u0E49\u0E32\u0E21\u0E19\u0E2D\u0E19\u0E23\u0E32\u0E1A","\u0E02\u0E49\u0E2D\u0E28\u0E2D\u0E01\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E15\u0E49\u0E44\u0E2B\u0E25\u0E48\u0E1E\u0E2D\u0E14\u0E35","\u0E2B\u0E32\u0E22\u0E43\u0E08\u0E15\u0E32\u0E21\u0E1B\u0E01\u0E15\u0E34 \u0E2D\u0E22\u0E48\u0E32\u0E01\u0E25\u0E31\u0E49\u0E19\u0E2B\u0E32\u0E22\u0E43\u0E08"],lunge:["\u0E01\u0E49\u0E32\u0E27\u0E02\u0E32\u0E44\u0E1B\u0E02\u0E49\u0E32\u0E07\u0E2B\u0E19\u0E49\u0E32 1 \u0E01\u0E49\u0E32\u0E27\u0E22\u0E32\u0E27","\u0E2A\u0E30\u0E42\u0E1E\u0E01\u0E25\u0E07\u0E43\u0E01\u0E25\u0E49\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E40\u0E02\u0E48\u0E32","\u0E40\u0E02\u0E48\u0E32\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E33\u0E21\u0E38\u0E21 90\xB0 \u0E40\u0E02\u0E48\u0E32\u0E2B\u0E25\u0E31\u0E07\u0E40\u0E01\u0E37\u0E2D\u0E1A\u0E16\u0E36\u0E07\u0E1E\u0E37\u0E49\u0E19","\u0E25\u0E33\u0E15\u0E31\u0E27\u0E15\u0E31\u0E49\u0E07\u0E15\u0E23\u0E07 \u0E44\u0E21\u0E48\u0E40\u0E2D\u0E19\u0E44\u0E1B\u0E02\u0E49\u0E32\u0E07\u0E2B\u0E19\u0E49\u0E32"],situp:["\u0E19\u0E2D\u0E19\u0E2B\u0E07\u0E32\u0E22 \u0E0A\u0E31\u0E19\u0E40\u0E02\u0E48\u0E32\u0E02\u0E36\u0E49\u0E19","\u0E43\u0E0A\u0E49\u0E01\u0E25\u0E49\u0E32\u0E21\u0E40\u0E19\u0E37\u0E49\u0E2D\u0E17\u0E49\u0E2D\u0E07\u0E22\u0E01\u0E25\u0E33\u0E15\u0E31\u0E27\u0E02\u0E36\u0E49\u0E19","\u0E2D\u0E22\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E21\u0E37\u0E2D\u0E14\u0E36\u0E07\u0E04\u0E2D","\u0E25\u0E07\u0E0A\u0E49\u0E32\u0E46 \u0E2D\u0E22\u0E48\u0E32\u0E07\u0E04\u0E27\u0E1A\u0E04\u0E38\u0E21"],jumpingjack:["\u0E01\u0E23\u0E30\u0E42\u0E14\u0E14\u0E01\u0E32\u0E07\u0E02\u0E32\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E22\u0E01\u0E41\u0E02\u0E19\u0E02\u0E36\u0E49\u0E19","\u0E01\u0E23\u0E30\u0E42\u0E14\u0E14\u0E2B\u0E38\u0E1A\u0E02\u0E32\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E40\u0E2D\u0E32\u0E41\u0E02\u0E19\u0E25\u0E07","\u0E23\u0E31\u0E01\u0E29\u0E32\u0E08\u0E31\u0E07\u0E2B\u0E27\u0E30\u0E43\u0E2B\u0E49\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07","\u0E25\u0E07\u0E14\u0E49\u0E27\u0E22\u0E1B\u0E25\u0E32\u0E22\u0E40\u0E17\u0E49\u0E32\u0E40\u0E1A\u0E32\u0E46"]},o={pushup:"PUSH-UP",squat:"SQUAT",plank:"PLANK",lunge:"LUNGE",situp:"SIT-UP",jumpingjack:"JUMPING JACK"},u={pushup:"#00ff88",squat:"#00bfff",plank:"#ffd700",lunge:"#ff6633",situp:"#a855f7",jumpingjack:"#ff3366"}[n]||"#00ff88";return React.createElement("div",{style:{maxWidth:"480px",margin:"0 auto",padding:"32px 20px"}},React.createElement("div",{style:{marginBottom:"24px"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"10px",letterSpacing:"4px",color:`${u}88`,marginBottom:"8px"}},"FORM CHECK"),React.createElement("h1",{style:{fontFamily:"'Space Mono',monospace",fontSize:"clamp(22px,4vw,32px)",fontWeight:700,color:"#ffffff",lineHeight:1.15,margin:0}},o[n]||n.toUpperCase())),React.createElement("div",{style:{background:"#111318",border:`1px solid ${u}22`,borderRadius:"20px",overflow:"hidden",marginBottom:"20px"}},React.createElement("img",{src:r[n]||r.pushup,alt:`${o[n]} demonstration`,style:{width:"100%",height:"240px",objectFit:"cover",display:"block"}}),React.createElement("div",{style:{padding:"20px"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",fontWeight:700,color:u,letterSpacing:"2px",marginBottom:"14px"}},"\u0E27\u0E34\u0E18\u0E35\u0E17\u0E33\u0E17\u0E48\u0E32\u0E17\u0E35\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07"),React.createElement("ul",{style:{fontFamily:"'Space Mono',monospace",fontSize:"12px",color:"#ffffffbb",lineHeight:2,paddingLeft:"18px",margin:0}},(i[n]||[]).map((l,d)=>React.createElement("li",{key:d,style:{marginBottom:"4px"}},l))))),React.createElement("button",{onClick:e,style:{width:"100%",padding:"18px",background:u,border:"none",borderRadius:"50px",cursor:"pointer",fontFamily:"'Space Mono',monospace",fontSize:"14px",fontWeight:700,color:"#0a0a12",transition:"all 0.3s",boxShadow:`0 0 30px ${u}44`,minHeight:"56px",marginBottom:"12px"},onMouseEnter:l=>{l.currentTarget.style.transform="translateY(-2px)"},onMouseLeave:l=>{l.currentTarget.style.transform="translateY(0)"}},"\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E2D\u0E2D\u0E01\u0E01\u0E33\u0E25\u0E31\u0E07\u0E01\u0E32\u0E22"),React.createElement("button",{onClick:t,style:{width:"100%",padding:"14px",background:"transparent",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"50px",cursor:"pointer",fontFamily:"'Space Mono',monospace",fontSize:"12px",color:"#ffffff44",transition:"all 0.2s"}},"\u2190 \u0E01\u0E25\u0E31\u0E1A"))}function hE({exercise:n,onNext:e,onBack:t}){let r={pushup:{position:"\u0E14\u0E49\u0E32\u0E19\u0E02\u0E49\u0E32\u0E07 (Side View)",distance:"1.5 - 2 \u0E40\u0E21\u0E15\u0E23",height:"\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E40\u0E2D\u0E27 (40-60 cm)",reason:"AI \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E2B\u0E47\u0E19\u0E25\u0E33\u0E15\u0E31\u0E27-\u0E41\u0E02\u0E19-\u0E02\u0E32\u0E08\u0E32\u0E01\u0E14\u0E49\u0E32\u0E19\u0E02\u0E49\u0E32\u0E07 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E15\u0E23\u0E27\u0E08\u0E21\u0E38\u0E21\u0E02\u0E49\u0E2D\u0E28\u0E2D\u0E01\u0E41\u0E25\u0E30\u0E04\u0E27\u0E32\u0E21\u0E15\u0E23\u0E07\u0E02\u0E2D\u0E07\u0E2B\u0E25\u0E31\u0E07",checkpoints:["\u0E40\u0E2B\u0E47\u0E19\u0E2B\u0E31\u0E27\u0E08\u0E23\u0E14\u0E40\u0E17\u0E49\u0E32","\u0E40\u0E2B\u0E47\u0E19\u0E02\u0E49\u0E2D\u0E28\u0E2D\u0E01\u0E07\u0E2D\u0E0A\u0E31\u0E14\u0E40\u0E08\u0E19","\u0E40\u0E2B\u0E47\u0E19\u0E25\u0E33\u0E15\u0E31\u0E27\u0E15\u0E23\u0E07\u0E2B\u0E23\u0E37\u0E2D\u0E04\u0E48\u0E2D\u0E21"],wrongWays:["\u0E14\u0E49\u0E32\u0E19\u0E2B\u0E19\u0E49\u0E32: \u0E08\u0E30\u0E40\u0E2B\u0E47\u0E19\u0E41\u0E02\u0E19\u0E0B\u0E49\u0E2D\u0E19\u0E01\u0E31\u0E19 \u0E27\u0E31\u0E14\u0E21\u0E38\u0E21\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49","\u0E43\u0E01\u0E25\u0E49\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B: \u0E44\u0E21\u0E48\u0E40\u0E2B\u0E47\u0E19\u0E40\u0E17\u0E49\u0E32"]},squat:{position:"\u0E40\u0E09\u0E35\u0E22\u0E07 45\xB0 (Front-Angle View)",distance:"1.5 - 2.5 \u0E40\u0E21\u0E15\u0E23",height:"\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E40\u0E2D\u0E27 (50-70 cm)",reason:"AI \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E2B\u0E47\u0E19\u0E01\u0E32\u0E23\u0E22\u0E48\u0E2D\u0E15\u0E31\u0E27\u0E41\u0E25\u0E30\u0E21\u0E38\u0E21\u0E40\u0E02\u0E48\u0E32 \u0E21\u0E2D\u0E07\u0E40\u0E09\u0E35\u0E22\u0E07\u0E08\u0E30\u0E40\u0E2B\u0E47\u0E19\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E31\u0E27\u0E40\u0E02\u0E48\u0E32\u0E41\u0E25\u0E30\u0E25\u0E33\u0E15\u0E31\u0E27",checkpoints:["\u0E40\u0E2B\u0E47\u0E19\u0E40\u0E02\u0E48\u0E32\u0E07\u0E2D-\u0E44\u0E21\u0E48\u0E07\u0E2D","\u0E40\u0E2B\u0E47\u0E19\u0E2B\u0E25\u0E31\u0E07\u0E15\u0E23\u0E07\u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E2D\u0E19","\u0E40\u0E2B\u0E47\u0E19\u0E2A\u0E30\u0E42\u0E1E\u0E01\u0E25\u0E07\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E40\u0E02\u0E48\u0E32"],wrongWays:["\u0E14\u0E49\u0E32\u0E19\u0E2B\u0E25\u0E31\u0E07: \u0E44\u0E21\u0E48\u0E40\u0E2B\u0E47\u0E19\u0E04\u0E27\u0E32\u0E21\u0E25\u0E36\u0E01\u0E02\u0E2D\u0E07\u0E2A\u0E30\u0E42\u0E1E\u0E01","\u0E44\u0E01\u0E25\u0E40\u0E01\u0E34\u0E19: \u0E22\u0E48\u0E2D\u0E15\u0E31\u0E27\u0E41\u0E25\u0E49\u0E27\u0E2B\u0E25\u0E38\u0E14\u0E01\u0E23\u0E2D\u0E1A"]},plank:{position:"\u0E14\u0E49\u0E32\u0E19\u0E02\u0E49\u0E32\u0E07 (Side View)",distance:"1.5 - 2 \u0E40\u0E21\u0E15\u0E23",height:"\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E40\u0E2D\u0E27 (30-50 cm)",reason:"AI \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E2B\u0E47\u0E19\u0E27\u0E48\u0E32\u0E25\u0E33\u0E15\u0E31\u0E27\u0E15\u0E23\u0E07\u0E2B\u0E23\u0E37\u0E2D\u0E22\u0E49\u0E2D\u0E22 \u0E08\u0E36\u0E07\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E2B\u0E47\u0E19\u0E08\u0E32\u0E01\u0E14\u0E49\u0E32\u0E19\u0E02\u0E49\u0E32\u0E07",checkpoints:["\u0E40\u0E2B\u0E47\u0E19\u0E2B\u0E31\u0E27-\u0E44\u0E2B\u0E25\u0E48-\u0E2A\u0E30\u0E42\u0E1E\u0E01-\u0E40\u0E17\u0E49\u0E32","\u0E40\u0E2B\u0E47\u0E19\u0E27\u0E48\u0E32\u0E22\u0E01\u0E15\u0E31\u0E27\u0E02\u0E36\u0E49\u0E19\u0E08\u0E32\u0E01\u0E1E\u0E37\u0E49\u0E19","\u0E40\u0E2B\u0E47\u0E19\u0E25\u0E33\u0E15\u0E31\u0E27\u0E15\u0E23\u0E07\u0E2B\u0E23\u0E37\u0E2D\u0E22\u0E49\u0E2D\u0E22"],wrongWays:["\u0E14\u0E49\u0E32\u0E19\u0E2B\u0E19\u0E49\u0E32: \u0E44\u0E21\u0E48\u0E40\u0E2B\u0E47\u0E19\u0E27\u0E48\u0E32\u0E2B\u0E25\u0E31\u0E07\u0E22\u0E49\u0E2D\u0E22\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48","\u0E21\u0E38\u0E21\u0E2A\u0E39\u0E07: \u0E44\u0E21\u0E48\u0E40\u0E2B\u0E47\u0E19\u0E25\u0E33\u0E15\u0E31\u0E27\u0E40\u0E15\u0E47\u0E21\u0E15\u0E31\u0E27 \u0E15\u0E31\u0E14\u0E2B\u0E31\u0E27\u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E17\u0E49\u0E32\u0E2D\u0E2D\u0E01"]},lunge:{position:"\u0E40\u0E09\u0E35\u0E22\u0E07 45\xB0 (Front-Angle View)",distance:"1.5 - 2 \u0E40\u0E21\u0E15\u0E23",height:"\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E40\u0E2D\u0E27 (50-70 cm)",reason:"AI \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E2B\u0E47\u0E19\u0E01\u0E32\u0E23\u0E01\u0E49\u0E32\u0E27\u0E02\u0E32\u0E41\u0E25\u0E30\u0E21\u0E38\u0E21\u0E40\u0E02\u0E48\u0E32\u0E17\u0E31\u0E49\u0E07 2 \u0E02\u0E49\u0E32\u0E07\u0E0A\u0E31\u0E14\u0E40\u0E08\u0E19",checkpoints:["\u0E40\u0E2B\u0E47\u0E19\u0E40\u0E02\u0E48\u0E32\u0E2B\u0E19\u0E49\u0E32-\u0E2B\u0E25\u0E31\u0E07","\u0E40\u0E2B\u0E47\u0E19\u0E01\u0E49\u0E32\u0E27\u0E22\u0E32\u0E27-\u0E2A\u0E31\u0E49\u0E19\u0E02\u0E2D\u0E07\u0E01\u0E49\u0E32\u0E27","\u0E40\u0E2B\u0E47\u0E19\u0E25\u0E33\u0E15\u0E31\u0E27\u0E15\u0E31\u0E49\u0E07\u0E15\u0E23\u0E07"],wrongWays:["\u0E14\u0E49\u0E32\u0E19\u0E2B\u0E25\u0E31\u0E07: \u0E44\u0E21\u0E48\u0E40\u0E2B\u0E47\u0E19\u0E21\u0E38\u0E21\u0E40\u0E02\u0E48\u0E32\u0E2B\u0E19\u0E49\u0E32","\u0E14\u0E49\u0E32\u0E19\u0E02\u0E49\u0E32\u0E07\u0E15\u0E23\u0E07: \u0E40\u0E2B\u0E47\u0E19\u0E02\u0E32\u0E0B\u0E49\u0E2D\u0E19\u0E01\u0E31\u0E19"]},situp:{position:"\u0E14\u0E49\u0E32\u0E19\u0E02\u0E49\u0E32\u0E07 (Side View)",distance:"1.5 - 2 \u0E40\u0E21\u0E15\u0E23",height:"\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E40\u0E2D\u0E27 (30-50 cm)",reason:"AI \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E2B\u0E47\u0E19\u0E25\u0E33\u0E15\u0E31\u0E27\u0E22\u0E01\u0E02\u0E36\u0E49\u0E19-\u0E25\u0E07 \u0E08\u0E36\u0E07\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E2B\u0E47\u0E19\u0E08\u0E32\u0E01\u0E14\u0E49\u0E32\u0E19\u0E02\u0E49\u0E32\u0E07",checkpoints:["\u0E40\u0E2B\u0E47\u0E19\u0E25\u0E33\u0E15\u0E31\u0E27\u0E22\u0E01\u0E02\u0E36\u0E49\u0E19-\u0E19\u0E2D\u0E19\u0E25\u0E07","\u0E40\u0E2B\u0E47\u0E19\u0E21\u0E37\u0E2D\u0E17\u0E35\u0E48\u0E28\u0E35\u0E23\u0E29\u0E30","\u0E40\u0E2B\u0E47\u0E19\u0E40\u0E02\u0E48\u0E32\u0E07\u0E2D\u0E0A\u0E31\u0E14\u0E40\u0E08\u0E19"],wrongWays:["\u0E14\u0E49\u0E32\u0E19\u0E2B\u0E19\u0E49\u0E32: \u0E08\u0E30\u0E40\u0E2B\u0E47\u0E19\u0E41\u0E04\u0E48\u0E2B\u0E31\u0E27 \u0E44\u0E21\u0E48\u0E40\u0E2B\u0E47\u0E19\u0E25\u0E33\u0E15\u0E31\u0E27","\u0E21\u0E38\u0E21\u0E2A\u0E39\u0E07: \u0E44\u0E21\u0E48\u0E40\u0E2B\u0E47\u0E19\u0E25\u0E33\u0E15\u0E31\u0E27\u0E22\u0E01\u0E02\u0E36\u0E49\u0E19"]},jumpingjack:{position:"\u0E14\u0E49\u0E32\u0E19\u0E2B\u0E19\u0E49\u0E32 (Front View)",distance:"2 - 2.5 \u0E40\u0E21\u0E15\u0E23",height:"\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E40\u0E2D\u0E27 (60-80 cm)",reason:"AI \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E2B\u0E47\u0E19\u0E02\u0E32 2 \u0E02\u0E49\u0E32\u0E07\u0E01\u0E32\u0E07\u0E2D\u0E2D\u0E01\u0E41\u0E25\u0E30\u0E41\u0E02\u0E19 2 \u0E02\u0E49\u0E32\u0E07\u0E22\u0E01\u0E02\u0E36\u0E49\u0E19 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E27\u0E48\u0E32\u0E17\u0E33\u0E17\u0E48\u0E32\u0E04\u0E23\u0E1A",checkpoints:["\u0E40\u0E2B\u0E47\u0E19\u0E17\u0E31\u0E49\u0E07\u0E15\u0E31\u0E27\u0E0A\u0E31\u0E14\u0E40\u0E08\u0E19","\u0E40\u0E2B\u0E47\u0E19\u0E02\u0E32\u0E01\u0E32\u0E07-\u0E0A\u0E34\u0E14\u0E44\u0E14\u0E49\u0E0A\u0E31\u0E14","\u0E40\u0E2B\u0E47\u0E19\u0E41\u0E02\u0E19 2 \u0E02\u0E49\u0E32\u0E07\u0E22\u0E01\u0E02\u0E36\u0E49\u0E19"],wrongWays:["\u0E14\u0E49\u0E32\u0E19\u0E02\u0E49\u0E32\u0E07: \u0E08\u0E30\u0E40\u0E2B\u0E47\u0E19\u0E02\u0E32\u0E0B\u0E49\u0E2D\u0E19\u0E01\u0E31\u0E19 \u0E27\u0E31\u0E14\u0E01\u0E32\u0E23\u0E01\u0E32\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49","\u0E43\u0E01\u0E25\u0E49\u0E40\u0E01\u0E34\u0E19: \u0E01\u0E23\u0E30\u0E42\u0E14\u0E14\u0E41\u0E25\u0E49\u0E27\u0E2B\u0E25\u0E38\u0E14\u0E01\u0E23\u0E2D\u0E1A"]}},i=r[n]||r.pushup;return React.createElement("div",{style:{maxWidth:"520px",margin:"0 auto",padding:"40px 24px"}},React.createElement("div",{style:{marginBottom:"32px"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",letterSpacing:"4px",color:"#ffd70066",marginBottom:"12px"}},"// CAMERA SETUP GUIDE"),React.createElement("h1",{style:{fontFamily:"'Space Mono',monospace",fontSize:"clamp(24px,4vw,34px)",fontWeight:700,color:"#ffffff",lineHeight:1.15,margin:0}},"SET UP",React.createElement("br",null),React.createElement("span",{style:{color:"#ffd700"}},"YOUR CAMERA")),React.createElement("p",{style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",color:"#ffffff55",marginTop:"12px",lineHeight:1.8}},i.reason)),React.createElement("div",{style:{background:"#111318",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"16px",padding:"20px",marginBottom:"24px"}},React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"}},React.createElement("div",null,React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"9px",color:"#ffd70088",letterSpacing:"1px",marginBottom:"4px"}},"POSITION"),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"13px",fontWeight:700,color:"#ffd700"}},i.position)),React.createElement("div",null,React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"9px",color:"#ffd70088",letterSpacing:"1px",marginBottom:"4px"}},"DISTANCE"),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"13px",fontWeight:700,color:"#ffd700"}},i.distance)))),React.createElement("div",{style:{background:"#0d1a0d",border:"1px solid #00ff8833",borderRadius:"8px",padding:"20px",marginBottom:"16px"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",letterSpacing:"2px",color:"#00ff8899",marginBottom:"12px"}}," AI \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E2B\u0E47\u0E19\u0E2D\u0E30\u0E44\u0E23\u0E1A\u0E49\u0E32\u0E07"),i.checkpoints.map((o,a)=>React.createElement("div",{key:a,style:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"8px"}},React.createElement("div",{style:{width:"6px",height:"6px",borderRadius:"50%",background:"#00ff88",flexShrink:0}}),React.createElement("span",{style:{fontFamily:"'Space Mono',monospace",fontSize:"12px",color:"#ffffffbb"}},o)))),React.createElement("div",{style:{background:"#1a0d0d",border:"1px solid #ff336633",borderRadius:"8px",padding:"20px",marginBottom:"24px"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",letterSpacing:"2px",color:"#ff336699",marginBottom:"12px"}}," \u0E15\u0E33\u0E41\u0E2B\u0E19\u0E48\u0E07\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E04\u0E27\u0E23\u0E43\u0E0A\u0E49"),i.wrongWays.map((o,a)=>React.createElement("div",{key:a,style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",color:"#ff668899",marginBottom:"6px",lineHeight:1.6}},o))),React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}},React.createElement(Je,{onClick:e,style:{width:"100%"}}," \u0E15\u0E31\u0E49\u0E07\u0E01\u0E25\u0E49\u0E2D\u0E07\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22 \u2192"),React.createElement(Je,{variant:"ghost",onClick:t,style:{width:"100%",opacity:.5}},"\u2190 \u0E01\u0E25\u0E31\u0E1A")))}function dE({result:n,stats:e,onPlayAgain:t,onBack:r}){let i={pushup:"",squat:"",plank:"",lunge:""},o={pushup:"PUSH-UP",squat:"SQUAT",plank:"PLANK",lunge:"LUNGE"},a=Math.floor(n.elapsed/60),u=n.elapsed%60,l=`${String(a).padStart(2,"0")}:${String(u).padStart(2,"0")}`,d=n.exercise==="plank",p=d?`${n.totalReps}s HELD`:`${n.totalReps} REPS`,m=`${n.calories} KCAL`,g=[{label:"EXERCISE",val:o[n.exercise]||n.exercise.toUpperCase()},{label:"SETS",val:`${n.sets}\xD7${d?n.exPlan.hold_sec+"s":n.exPlan.reps}`},{label:d?"HELD":"REPS",val:p},{label:"TIME",val:l},{label:"CALORIES",val:m}];return React.createElement("div",{style:{maxWidth:"480px",margin:"0 auto",padding:"40px 24px"}},React.createElement("div",{style:{textAlign:"center",marginBottom:"40px"}},React.createElement("div",{style:{fontSize:"72px",marginBottom:"16px"}}),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",letterSpacing:"4px",color:"#00ff8866",marginBottom:"12px"}},"// SESSION COMPLETE"),React.createElement("h1",{style:{fontFamily:"'Space Mono',monospace",fontSize:"clamp(28px,5vw,40px)",fontWeight:700,color:"#ffffff",lineHeight:1.1,margin:0}},"MISSION",React.createElement("br",null),React.createElement("span",{style:{color:"#00ff88"}},"ACCOMPLISHED"))),React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"32px"}},g.map(({label:S,val:P})=>React.createElement("div",{key:S,style:{background:"#0d1a0d",border:"1px solid #00ff8822",borderRadius:"8px",padding:"16px",textAlign:"center"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"20px",fontWeight:700,color:"#00ff88"}},P),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"9px",color:"#ffffff44",letterSpacing:"1px",marginTop:"4px"}},S)))),React.createElement("div",{style:{background:"linear-gradient(135deg, #0d1a0d, #001a0a)",border:"1px solid #00ff8844",borderRadius:"8px",padding:"20px",marginBottom:"32px",display:"flex",alignItems:"center",gap:"16px"}},React.createElement("div",{style:{fontSize:"36px"}}),React.createElement("div",null,React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"28px",fontWeight:700,color:"#ffd700"}},n.calories," kcal"),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",color:"#ffffff55",marginTop:"4px"}},"\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E01\u0E32\u0E23\u0E41\u0E04\u0E25\u0E2D\u0E23\u0E35\u0E48\u0E17\u0E35\u0E48\u0E40\u0E1C\u0E32\u0E1C\u0E25\u0E32\u0E0D"))),React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}},React.createElement(Je,{onClick:t,style:{width:"100%"}}," \u0E2D\u0E2D\u0E01\u0E01\u0E33\u0E25\u0E31\u0E07\u0E17\u0E48\u0E32\u0E2D\u0E37\u0E48\u0E19"),React.createElement(Je,{variant:"ghost",onClick:r,style:{width:"100%"}},"\u2190 \u0E01\u0E25\u0E31\u0E1A\u0E41\u0E1C\u0E19\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49")))}function fE({onBack:n,stats:e}){let[t,r]=(0,V.useState)(()=>it(lt,[])),i={pushup:"",squat:"",plank:"",lunge:"",situp:"",jumpingjack:""},o={pushup:"PUSH-UP",squat:"SQUAT",plank:"PLANK",lunge:"LUNGE",situp:"SIT-UP",jumpingjack:"JUMPING JACK"},a=()=>{_t(lt,[]),r([])},u=t.reduce((d,p)=>d+(p.calories||0),0),l=t.length;return React.createElement("div",{style:{maxWidth:"520px",margin:"0 auto",padding:"40px 24px"}},React.createElement("div",{style:{marginBottom:"32px"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",letterSpacing:"4px",color:"#00bfff66",marginBottom:"12px"}},"// WORKOUT HISTORY"),React.createElement("h1",{style:{fontFamily:"'Space Mono',monospace",fontSize:"clamp(24px,4vw,36px)",fontWeight:700,color:"#ffffff",lineHeight:1.2,margin:0}},"YOUR",React.createElement("br",null),React.createElement("span",{style:{color:"#00bfff"}},"JOURNEY"))),React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"24px"}},[[" SESSIONS",l],[" TOTAL KCAL",u]].map(([d,p])=>React.createElement("div",{key:d,style:{background:"#0d1a0d",border:"1px solid #00bfff22",borderRadius:"8px",padding:"16px",textAlign:"center"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"24px",fontWeight:700,color:"#00bfff"}},p),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"9px",color:"#ffffff44",letterSpacing:"1px",marginTop:"4px"}},d)))),t.length===0?React.createElement("div",{style:{textAlign:"center",padding:"60px 24px",color:"#ffffff33",fontFamily:"'Space Mono',monospace",fontSize:"13px",lineHeight:2}},React.createElement("div",{style:{fontSize:"48px",marginBottom:"16px"}}),"\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23\u0E2D\u0E2D\u0E01\u0E01\u0E33\u0E25\u0E31\u0E07",React.createElement("br",null),"\u0E40\u0E23\u0E34\u0E48\u0E21\u0E2D\u0E2D\u0E01\u0E01\u0E33\u0E25\u0E31\u0E07\u0E41\u0E25\u0E49\u0E27\u0E08\u0E30\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E17\u0E35\u0E48\u0E19\u0E35\u0E48"):React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"10px",marginBottom:"24px"}},t.map(d=>{let p=new Date(d.id),m=p.toLocaleDateString("th-TH",{day:"numeric",month:"short",year:"2-digit"}),g=p.toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"}),S=d.exercise==="plank",P=d.elapsed||0,k=Math.floor(P/60),R=P%60;return React.createElement("div",{key:d.id,style:{background:"#0d1a0d",border:"1px solid #00bfff22",borderRadius:"8px",padding:"16px",display:"flex",alignItems:"center",gap:"16px"}},React.createElement("div",{style:{fontSize:"28px",flexShrink:0}},i[d.exercise]||""),React.createElement("div",{style:{flex:1,minWidth:0}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"12px",fontWeight:700,color:"#00bfff"}},o[d.exercise]||d.exercise?.toUpperCase()),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"10px",color:"#ffffff55",marginTop:"3px"}},d.sets," sets \xB7 ",S?`${d.exPlan?.hold_sec||0}s hold`:`${d.exPlan?.reps||0} reps`," \xB7 ",`${String(k).padStart(2,"0")}:${String(R).padStart(2,"0")}`)),React.createElement("div",{style:{textAlign:"right",flexShrink:0}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"12px",color:"#ffd700"}},d.calories||0," kcal"),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"9px",color:"#ffffff33",marginTop:"3px"}},m," ",g)))})),React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"10px"}},React.createElement("div",{style:{display:"flex",gap:"10px"}},React.createElement(Je,{variant:"ghost",onClick:n,style:{flex:1}},"\u2190 \u0E01\u0E25\u0E31\u0E1A"),t.length>0&&React.createElement(Je,{variant:"danger",onClick:a,style:{flex:1}}," \u0E25\u0E49\u0E32\u0E07\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34")),React.createElement("div",{style:{display:"flex",gap:"10px"}},React.createElement("button",{onClick:()=>{let d={stats:e,history:it(lt,[]),ctx:it(Qi,{})},p=new Blob([JSON.stringify(d,null,2)],{type:"application/json"}),m=URL.createObjectURL(p),g=document.createElement("a");g.href=m,g.download=`shadow_backup_${new Date().toISOString().slice(0,10)}.json`,g.click(),URL.revokeObjectURL(m)},style:{flex:1,padding:"12px",background:"#0d1a0d",border:"1px solid #00ff8844",borderRadius:"4px",color:"#00ff88",fontFamily:"'Space Mono',monospace",fontSize:"11px",fontWeight:700,cursor:"pointer",letterSpacing:"1px"}},"EXPORT \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25"),React.createElement("label",{style:{flex:1,padding:"12px",background:"#0d1a0d",border:"1px solid #00bfff44",borderRadius:"4px",color:"#00bfff",fontFamily:"'Space Mono',monospace",fontSize:"11px",fontWeight:700,cursor:"pointer",letterSpacing:"1px",textAlign:"center"}},"IMPORT \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25",React.createElement("input",{type:"file",accept:".json",style:{display:"none"},onChange:d=>{let p=d.target.files?.[0];if(!p)return;let m=new FileReader;m.onload=g=>{try{let S=JSON.parse(g.target.result);S.history&&(_t(lt,S.history),r(S.history)),S.stats&&_t(na,S.stats),S.ctx&&_t(Qi,S.ctx),alert("\u0E19\u0E33\u0E40\u0E02\u0E49\u0E32\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08! \u0E23\u0E35\u0E40\u0E1F\u0E23\u0E0A\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E43\u0E2B\u0E21\u0E48")}catch{alert("\u0E44\u0E1F\u0E25\u0E4C\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E43\u0E0A\u0E49\u0E44\u0E1F\u0E25\u0E4C\u0E17\u0E35\u0E48 export \u0E08\u0E32\u0E01\u0E41\u0E2D\u0E1B\u0E19\u0E35\u0E49\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19")}},m.readAsText(p),d.target.value=""}}))),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"10px",color:"#ffffff22",textAlign:"center",marginTop:"4px"}},"Export \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \xB7 Import \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E01\u0E39\u0E49\u0E04\u0E37\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E02\u0E49\u0E32\u0E21\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07")))}function pE({onBack:n}){let e=(0,V.useRef)(null),t=it(lt,[]),r=t.reduce((m,g)=>m+(g.calories||0),0),i=t.length,o=[];for(let m=6;m>=0;m--){let g=new Date;g.setDate(g.getDate()-m);let S=g.toISOString().slice(0,10),P=g.toLocaleDateString("th-TH",{weekday:"short"}),k=t.filter(R=>new Date(R.id).toISOString().slice(0,10)===S);o.push({label:P,cal:k.reduce((R,M)=>R+(M.calories||0),0),count:k.length})}let a=Math.max(...o.map(m=>m.cal),1),u=0;for(let m=0;m<30;m++){let g=new Date;g.setDate(g.getDate()-m);let S=g.toISOString().slice(0,10);if(t.some(P=>new Date(P.id).toISOString().slice(0,10)===S))u++;else break}let l={};t.forEach(m=>{l[m.exercise]=(l[m.exercise]||0)+1});let d={pushup:"PUSH-UP",squat:"SQUAT",plank:"PLANK",lunge:"LUNGE",situp:"SIT-UP",jumpingjack:"JUMPING JACK"},p={pushup:"#00ff88",squat:"#00bfff",plank:"#ffd700",lunge:"#ff9800",situp:"#a855f7",jumpingjack:"#ff3366"};return(0,V.useEffect)(()=>{let m=e.current;if(!m)return;let g=m.getContext("2d"),S=m.width,P=m.height;g.clearRect(0,0,S,P),g.fillStyle="#0d1a0d",g.fillRect(0,0,S,P),g.strokeStyle="#00ff8811",g.lineWidth=1;for(let R=0;R<5;R++){let M=30+R*(P-70)/4;g.beginPath(),g.moveTo(50,M),g.lineTo(S-20,M),g.stroke()}let k=(S-90)/7-8;o.forEach((R,M)=>{let B=60+M*((S-90)/7),K=R.cal>0?R.cal/a*(P-90):0,Q=P-50-K,pe=g.createLinearGradient(B,Q,B,P-50);pe.addColorStop(0,"#00ff88"),pe.addColorStop(1,"#00ff8833"),g.fillStyle=pe,g.fillRect(B,Q,k,K),g.shadowColor="#00ff88",g.shadowBlur=R.cal>0?6:0,g.fillRect(B,Q,k,2),g.shadowBlur=0,R.cal>0&&(g.fillStyle="#00ff88",g.font="bold 10px 'Space Mono',monospace",g.textAlign="center",g.fillText(`${R.cal}`,B+k/2,Q-6)),g.fillStyle="#ffffff55",g.font="10px 'Space Mono',monospace",g.textAlign="center",g.fillText(R.label,B+k/2,P-28),R.count>0&&(g.fillStyle="#ffd700",g.font="9px 'Space Mono',monospace",g.fillText(`${R.count}x`,B+k/2,P-14))}),g.fillStyle="#ffffff33",g.font="9px 'Space Mono',monospace",g.textAlign="right",g.fillText("kcal",45,25)},[]),React.createElement("div",{style:{maxWidth:"520px",margin:"0 auto",padding:"40px 24px"}},React.createElement("div",{style:{marginBottom:"32px"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",letterSpacing:"4px",color:"#a855f766",marginBottom:"12px"}},"// DASHBOARD"),React.createElement("h1",{style:{fontFamily:"'Space Mono',monospace",fontSize:"clamp(24px,4vw,36px)",fontWeight:700,color:"#ffffff",lineHeight:1.2,margin:0}},"YOUR",React.createElement("br",null),React.createElement("span",{style:{color:"#a855f7"}},"PROGRESS"))),React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"12px",marginBottom:"24px"}},[["",i,"SESSIONS"],["",r,"TOTAL KCAL"],["",u,"DAY STREAK"]].map(([m,g,S])=>React.createElement("div",{key:S,style:{background:"#0d1a0d",border:"1px solid #a855f722",borderRadius:"8px",padding:"16px",textAlign:"center"}},React.createElement("div",{style:{fontSize:"20px",marginBottom:"6px"}},m),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"22px",fontWeight:700,color:"#a855f7"}},g),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"9px",color:"#ffffff44",letterSpacing:"1px",marginTop:"4px"}},S)))),React.createElement("div",{style:{background:"#0d1a0d",border:"1px solid #a855f722",borderRadius:"8px",overflow:"hidden",marginBottom:"24px"}},React.createElement("div",{style:{background:"#060810",padding:"12px",borderBottom:"1px solid #a855f722",fontFamily:"'Space Mono',monospace",fontSize:"11px",color:"#a855f7",letterSpacing:"2px"}}," WEEKLY CALORIES"),React.createElement("canvas",{ref:e,width:520,height:260,style:{width:"100%",height:"auto",display:"block"}})),Object.keys(l).length>0&&React.createElement("div",{style:{background:"#0d1a0d",border:"1px solid #a855f722",borderRadius:"8px",padding:"20px",marginBottom:"24px"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",letterSpacing:"2px",color:"#a855f799",marginBottom:"16px"}},"EXERCISE BREAKDOWN"),Object.entries(l).sort((m,g)=>g[1]-m[1]).map(([m,g])=>React.createElement("div",{key:m,style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"10px"}},React.createElement("span",{style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",color:p[m]||"#00ff88",width:"100px",flexShrink:0}},d[m]||m.toUpperCase()),React.createElement("div",{style:{flex:1,height:"8px",background:"#060810",borderRadius:"4px",overflow:"hidden"}},React.createElement("div",{style:{height:"100%",width:`${g/i*100}%`,background:p[m]||"#00ff88",borderRadius:"4px",boxShadow:`0 0 6px ${p[m]||"#00ff88"}44`}})),React.createElement("span",{style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",color:"#ffffff66",width:"30px",textAlign:"right"}},g,"x")))),React.createElement(Je,{variant:"ghost",onClick:n,style:{width:"100%"}},"\u2190 \u0E01\u0E25\u0E31\u0E1A"))}function mE({exercise:n,plan:e,onGranted:t,onBack:r}){let[i,o]=(0,V.useState)("idle"),a=e[n],u=async()=>{o("requesting");try{let p=await navigator.mediaDevices.getUserMedia({video:{width:640,height:480,facingMode:"user"}});t(p)}catch(p){o(p.name==="NotAllowedError"||p.name==="PermissionDeniedError"?"denied":"error")}},d={idle:{icon:"",title:"\u0E02\u0E2D\u0E2D\u0E19\u0E38\u0E0D\u0E32\u0E15\u0E43\u0E0A\u0E49\u0E01\u0E25\u0E49\u0E2D\u0E07",desc:`The Adaptable Shadow \u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E40\u0E02\u0E49\u0E32\u0E16\u0E36\u0E07\u0E01\u0E25\u0E49\u0E2D\u0E07\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E15\u0E23\u0E27\u0E08\u0E08\u0E31\u0E1A\u0E17\u0E48\u0E32\u0E2D\u0E2D\u0E01\u0E01\u0E33\u0E25\u0E31\u0E07\u0E01\u0E32\u0E22 Real-time

\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E20\u0E32\u0E1E\u0E1B\u0E23\u0E30\u0E21\u0E27\u0E25\u0E1C\u0E25\u0E43\u0E19\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19`,cta:"\u0E2D\u0E19\u0E38\u0E0D\u0E32\u0E15\u0E41\u0E25\u0E30\u0E40\u0E1B\u0E34\u0E14\u0E01\u0E25\u0E49\u0E2D\u0E07",ctaVariant:"primary"},requesting:{icon:"",title:"\u0E01\u0E33\u0E25\u0E31\u0E07\u0E02\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C...",desc:"\u0E42\u0E1B\u0E23\u0E14\u0E01\u0E14 '\u0E2D\u0E19\u0E38\u0E0D\u0E32\u0E15' \u0E43\u0E19\u0E1B\u0E4A\u0E2D\u0E1B\u0E2D\u0E31\u0E1B\u0E02\u0E2D\u0E07\u0E40\u0E1A\u0E23\u0E32\u0E27\u0E4C\u0E40\u0E0B\u0E2D\u0E23\u0E4C",cta:null},denied:{icon:"",title:"\u0E16\u0E39\u0E01\u0E1B\u0E0F\u0E34\u0E40\u0E2A\u0E18\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C",desc:`\u0E27\u0E34\u0E18\u0E35\u0E41\u0E01\u0E49:
1. \u0E04\u0E25\u0E34\u0E01\u0E44\u0E2D\u0E04\u0E2D\u0E19 \u0E43\u0E19\u0E41\u0E16\u0E1A URL
2. \u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E01\u0E25\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19 '\u0E2D\u0E19\u0E38\u0E0D\u0E32\u0E15'
3. \u0E23\u0E35\u0E40\u0E1F\u0E23\u0E0A\u0E41\u0E25\u0E49\u0E27\u0E25\u0E2D\u0E07\u0E43\u0E2B\u0E21\u0E48`,cta:"\u0E25\u0E2D\u0E07\u0E43\u0E2B\u0E21\u0E48\u0E2D\u0E35\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07",ctaVariant:"ghost"},error:{icon:"",title:"\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E01\u0E25\u0E49\u0E2D\u0E07",desc:"\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E27\u0E48\u0E32\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E21\u0E35\u0E01\u0E25\u0E49\u0E2D\u0E07\u0E41\u0E25\u0E30\u0E44\u0E21\u0E48\u0E21\u0E35\u0E41\u0E2D\u0E1B\u0E2D\u0E37\u0E48\u0E19\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E2D\u0E22\u0E39\u0E48",cta:"\u0E25\u0E2D\u0E07\u0E43\u0E2B\u0E21\u0E48",ctaVariant:"ghost"}}[i];return React.createElement("div",{style:{maxWidth:"460px",margin:"0 auto",padding:"40px 24px"}},React.createElement("div",{style:{marginBottom:"40px"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",letterSpacing:"4px",color:"#00ff8866",marginBottom:"12px"}},"// CAMERA ACCESS"),React.createElement("h1",{style:{fontFamily:"'Space Mono',monospace",fontSize:"clamp(26px,4vw,38px)",fontWeight:700,color:"#ffffff",lineHeight:1.15,margin:0}},"READY TO",React.createElement("br",null),React.createElement("span",{style:{color:"#00ff88"}},"TRACK?"))),React.createElement("div",{style:{display:"flex",gap:"12px",marginBottom:"32px"}},React.createElement("div",{style:{background:"#0d1a0d",border:"1px solid #00ff8833",borderRadius:"6px",padding:"12px 20px",flex:1,textAlign:"center"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"22px",fontWeight:700,color:"#00ff88"}},a.sets,"\xD7",a.reps),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"10px",color:"#ffffff44",letterSpacing:"2px",marginTop:"4px"}},n==="pushup"?"PUSH-UP":"SQUAT")),React.createElement("div",{style:{background:"#0d1a0d",border:"1px solid #00ff8833",borderRadius:"6px",padding:"12px 20px",flex:1,textAlign:"center"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"22px",fontWeight:700,color:"#ffd700"}},e.estimated_duration_min,"m"),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"10px",color:"#ffffff44",letterSpacing:"2px",marginTop:"4px"}},"EST. TIME"))),React.createElement("div",{style:{background:"#0d1a0d",border:`1px solid ${i==="denied"||i==="error"?"#ff336633":"#00ff8822"}`,borderRadius:"12px",padding:"36px 28px",textAlign:"center",transition:"border-color 0.3s"}},React.createElement("div",{style:{fontSize:"56px",marginBottom:"20px",lineHeight:1}},d.icon),i==="requesting"&&React.createElement("div",{style:{width:"48px",height:"48px",border:"3px solid #00ff8822",borderTop:"3px solid #00ff88",borderRadius:"50%",animation:"spin 1s linear infinite",margin:"0 auto 24px"}}),React.createElement("h2",{style:{fontFamily:"'Space Mono',monospace",fontSize:"18px",fontWeight:700,color:"#ffffff",marginBottom:"16px"}},d.title),React.createElement("p",{style:{fontFamily:"'Space Mono',monospace",fontSize:"12px",color:"#ffffff66",lineHeight:2,whiteSpace:"pre-line",marginBottom:"28px"}},d.desc),i==="idle"&&React.createElement("div",{style:{display:"flex",gap:"8px",justifyContent:"center",flexWrap:"wrap",marginBottom:"28px"}},[" \u0E1B\u0E23\u0E30\u0E21\u0E27\u0E25\u0E1C\u0E25\u0E43\u0E19\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07"," \u0E44\u0E21\u0E48\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E27\u0E34\u0E14\u0E35\u0E42\u0E2D"," Real-time AI"].map(p=>React.createElement("span",{key:p,style:{fontFamily:"'Space Mono',monospace",fontSize:"10px",padding:"5px 10px",background:"#060810",border:"1px solid #00ff8833",borderRadius:"20px",color:"#00ff8899"}},p))),d.cta&&React.createElement(Je,{onClick:u,variant:d.ctaVariant,style:{width:"100%"}},"",d.cta)),React.createElement("div",{style:{marginTop:"20px"}},React.createElement(Je,{variant:"ghost",onClick:r,style:{width:"100%",opacity:.5}},"\u2190 \u0E01\u0E25\u0E31\u0E1A")))}function gE({exercise:n,plan:e,mediapipeReady:t,initialStream:r,onStart:i,onBack:o}){let a=(0,V.useRef)(null),u=(0,V.useRef)(null),l=(0,V.useRef)(null),d=(0,V.useRef)(null),p=(0,V.useRef)(null),[m,g]=(0,V.useState)(!1),[S,P]=(0,V.useState)(null),[k,R]=(0,V.useState)(0),M=e[n];return(0,V.useEffect)(()=>{d.current=r||null},[r]),(0,V.useEffect)(()=>{if(!t)return;let B=!0;return(async()=>{try{let Q=d.current;if(!Q)try{Q=await navigator.mediaDevices.getUserMedia({video:{width:640,height:480,facingMode:"user"}})}catch{P("\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E2D\u0E19\u0E38\u0E0D\u0E32\u0E15\u0E43\u0E0A\u0E49\u0E01\u0E25\u0E49\u0E2D\u0E07 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E14 \u2190 \u0E01\u0E25\u0E31\u0E1A \u0E41\u0E25\u0E49\u0E27\u0E2D\u0E19\u0E38\u0E0D\u0E32\u0E15\u0E43\u0E2B\u0E21\u0E48\u0E2D\u0E35\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07");return}if(!B){Q.getTracks().forEach(E=>E.stop());return}d.current=Q,a.current.srcObject=Q,await a.current.play();let pe=new window.Pose({locateFile:E=>`https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/${E}`});pe.setOptions({modelComplexity:0,smoothLandmarks:!0,enableSegmentation:!1,minDetectionConfidence:.55,minTrackingConfidence:.55}),pe.onResults(E=>{if(!B)return;let y=u.current,v=a.current;if(!y||!v)return;let _=y.getContext("2d"),w=y.width,T=y.height;_.save(),_.translate(w,0),_.scale(-1,1),_.drawImage(E.image,0,0,w,T),_.restore();let I=_.createRadialGradient(w/2,T/2,T*.3,w/2,T/2,T*.85);I.addColorStop(0,"rgba(0,0,0,0)"),I.addColorStop(1,"rgba(6,8,16,0.55)"),_.fillStyle=I,_.fillRect(0,0,w,T),E.poseLandmarks?(g(!0),R(E.poseLandmarks.length),window.drawConnectors&&window.POSE_CONNECTIONS&&window.drawConnectors(_,E.poseLandmarks,window.POSE_CONNECTIONS,{color:"#00ff8866",lineWidth:2}),E.poseLandmarks.forEach((Oe,It)=>{let st=(1-Oe.x)*w,Ye=Oe.y*T,Xe=Oe.visibility||0;if(Xe<.3)return;_.beginPath(),_.arc(st,Ye,10,0,Math.PI*2),_.strokeStyle=`rgba(0,255,136,${Xe*.35})`,_.lineWidth=6,_.stroke(),_.beginPath(),_.arc(st,Ye,4,0,Math.PI*2),_.fillStyle=`rgba(0,255,136,${Xe})`,_.fill(),[11,12,13,14,15,16,23,24,25,26,27,28].includes(It)&&(_.fillStyle="rgba(0,255,136,0.9)",_.font="bold 10px 'Space Mono',monospace",_.fillText(It,st+7,Ye-7))})):g(!1),_.fillStyle="rgba(6,8,16,0.78)",_.fillRect(0,0,w,64),_.fillStyle="#00ff88",_.font="bold 12px 'Space Mono',monospace",_.fillText(" AI BODY SCAN ACTIVE",20,26),_.fillStyle=E.poseLandmarks?"#00ff88":"#ff9800",_.font="11px 'Space Mono',monospace",_.fillText(E.poseLandmarks?` POSE DETECTED \u2014 ${E.poseLandmarks.length} JOINTS`:"\u27F3 SCANNING...",20,50),_.fillStyle="#ffd700",_.font="bold 12px 'Space Mono',monospace";let ye=n==="pushup"?"PUSH-UP":"SQUAT";_.fillText(ye,w-_.measureText(ye).width-20,26),_.fillStyle="#ffffff44",_.font="10px 'Space Mono',monospace",_.fillText(`${M.sets} SETS \xD7 ${M.reps} REPS`,w-_.measureText(`${M.sets} SETS \xD7 ${M.reps} REPS`).width-20,50),_.fillStyle="rgba(6,8,16,0.78)",_.fillRect(0,T-56,w,56),_.strokeStyle="#00ff8833",_.lineWidth=1,_.beginPath(),_.moveTo(0,T-56),_.lineTo(w,T-56),_.stroke(),_.fillStyle="#ffffff55",_.font="11px 'Space Mono',monospace",_.fillText("// \u0E15\u0E31\u0E49\u0E07\u0E15\u0E31\u0E27\u0E43\u0E2B\u0E49 AI \u0E40\u0E2B\u0E47\u0E19\u0E23\u0E48\u0E32\u0E07\u0E01\u0E32\u0E22\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 \u0E41\u0E25\u0E49\u0E27\u0E01\u0E14 '\u0E40\u0E23\u0E34\u0E48\u0E21\u0E2D\u0E2D\u0E01\u0E01\u0E33\u0E25\u0E31\u0E07'",20,T-22)}),await pe.initialize(),l.current=pe;let G=async()=>{B&&(l.current&&a.current?.readyState>=2&&await l.current.send({image:a.current}),p.current=requestAnimationFrame(G))};p.current=requestAnimationFrame(G)}catch(Q){P("\u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E40\u0E02\u0E49\u0E32\u0E16\u0E36\u0E07\u0E01\u0E25\u0E49\u0E2D\u0E07\u0E44\u0E14\u0E49 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E14 \u2190 \u0E01\u0E25\u0E31\u0E1A \u0E41\u0E25\u0E49\u0E27\u0E25\u0E2D\u0E07\u0E43\u0E2B\u0E21\u0E48: "+Q.message)}})(),()=>{if(B=!1,p.current&&cancelAnimationFrame(p.current),l.current){try{l.current.close()}catch{}l.current=null}}},[t]),React.createElement("div",{style:{position:"relative",width:"100%",minHeight:"100vh",background:"#060810",display:"flex",flexDirection:"column"}},React.createElement("video",{ref:a,style:{position:"absolute",opacity:0,width:"1px",height:"1px"},playsInline:!0,muted:!0}),React.createElement("div",{style:{position:"relative",flex:1}},React.createElement("canvas",{ref:u,width:1280,height:720,style:{width:"100%",height:"auto",display:"block",maxHeight:"calc(100vh - 130px)",background:"#000"}}),!t&&React.createElement("div",{style:{position:"absolute",inset:0,background:"rgba(6,8,16,0.92)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"20px"}},React.createElement("div",{style:{width:"48px",height:"48px",border:"3px solid #00ff8833",borderTop:"3px solid #00ff88",borderRadius:"50%",animation:"spin 1s linear infinite"}}),React.createElement("p",{style:{fontFamily:"'Space Mono',monospace",color:"#00ff88",fontSize:"12px",letterSpacing:"2px"}},"\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14 AI...")),S&&React.createElement("div",{style:{position:"absolute",inset:0,background:"rgba(6,8,16,0.95)",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px",flexDirection:"column",gap:"16px"}},React.createElement("div",{style:{fontSize:"48px"}}),React.createElement("p",{style:{fontFamily:"'Space Mono',monospace",color:"#ff4466",fontSize:"13px",textAlign:"center"}},S)),React.createElement("div",{style:{position:"absolute",top:"72px",right:"16px",display:"flex",alignItems:"center",gap:"8px",background:"rgba(6,8,16,0.7)",border:`1px solid ${m?"#00ff8866":"#ff980066"}`,borderRadius:"20px",padding:"6px 14px"}},React.createElement("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:m?"#00ff88":"#ff9800",boxShadow:m?"0 0 8px #00ff88":"0 0 8px #ff9800",animation:"pulse 1.5s ease-in-out infinite"}}),React.createElement("span",{style:{fontFamily:"'Space Mono',monospace",fontSize:"10px",color:m?"#00ff88":"#ff9800",letterSpacing:"1px"}},m?"AI TRACKING":"SCANNING"))),React.createElement("div",{style:{background:"rgba(6,8,16,0.95)",borderTop:"1px solid #00ff8822",padding:"16px 20px",display:"flex",alignItems:"center",gap:"12px"}},React.createElement("button",{onClick:o,style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",color:"#ffffff44",background:"none",border:"1px solid #ffffff22",borderRadius:"4px",padding:"10px 18px",cursor:"pointer",letterSpacing:"1px",flexShrink:0}},"\u2190 \u0E01\u0E25\u0E31\u0E1A"),React.createElement("div",{style:{flex:1}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"10px",color:m?"#00ff8899":"#ff980099",letterSpacing:"2px",marginBottom:"4px"}},m?` \u0E1E\u0E1A ${k} \u0E08\u0E38\u0E14\u0E02\u0E49\u0E2D\u0E15\u0E48\u0E2D \u2014 \u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E41\u0E25\u0E49\u0E27!`:"\u27F3 \u0E15\u0E31\u0E49\u0E07\u0E15\u0E31\u0E27\u0E43\u0E2B\u0E49 AI \u0E21\u0E2D\u0E07\u0E40\u0E2B\u0E47\u0E19\u0E23\u0E48\u0E32\u0E07\u0E01\u0E32\u0E22\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"),React.createElement("div",{style:{height:"3px",background:"#0d1a0d",borderRadius:"2px",overflow:"hidden"}},React.createElement("div",{style:{height:"100%",width:m?"100%":"40%",background:m?"#00ff88":"#ff9800",transition:"all 0.6s ease",boxShadow:m?"0 0 8px #00ff88":"none"}}))),React.createElement(Je,{onClick:i,style:{flexShrink:0,padding:"12px 24px"}}," \u0E40\u0E23\u0E34\u0E48\u0E21\u0E2D\u0E2D\u0E01\u0E01\u0E33\u0E25\u0E31\u0E07")),React.createElement("style",null,"@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}"))}function yE({exercise:n,plan:e,onFinish:t,onDone:r,mediapipeReady:i,initialStream:o,weightKg:a}){let u=(0,V.useRef)(null),l=(0,V.useRef)(null),d=(0,V.useRef)(null),p=(0,V.useRef)(null),m=(0,V.useRef)(null),g=(0,V.useRef)("up"),S=(0,V.useRef)(0),P=(0,V.useRef)(1),k=(0,V.useRef)(!1),R=(0,V.useRef)(0),M=(0,V.useRef)(0),B=(0,V.useRef)(0),K=(0,V.useRef)(null),Q=(0,V.useRef)(!1),[pe,G]=(0,V.useState)(0),[E,y]=(0,V.useState)(1),[v,_]=(0,V.useState)(0),[w,T]=(0,V.useState)(!0),[I,ye]=(0,V.useState)("\u0E15\u0E31\u0E49\u0E07\u0E15\u0E31\u0E27\u0E43\u0E2B\u0E49\u0E01\u0E25\u0E49\u0E2D\u0E07\u0E21\u0E2D\u0E07\u0E40\u0E2B\u0E47\u0E19"),[Oe,It]=(0,V.useState)(!1),[st,Ye]=(0,V.useState)(0),[Xe,Qt]=(0,V.useState)(null),[Xn,Zn]=(0,V.useState)(!1),[yn]=(0,V.useState)(Date.now()),[He,er]=(0,V.useState)(0),N=e[n],Z=n==="plank",oe={pushup:"PUSH-UP",squat:"SQUAT",plank:"PLANK",lunge:"LUNGE",situp:"SIT-UP",jumpingjack:"JUMPING JACK"};(0,V.useEffect)(()=>{p.current=o||null},[o]),(0,V.useEffect)(()=>{let L=setInterval(()=>er(Math.floor((Date.now()-yn)/1e3)),1e3);return()=>clearInterval(L)},[yn]),(0,V.useEffect)(()=>{if(!i)return;let L=!0;return(async()=>{try{let he=p.current;if(he||(he=await navigator.mediaDevices.getUserMedia({video:{width:640,height:480}})),!L){he.getTracks().forEach(ae=>ae.stop());return}p.current=he,u.current.srcObject=he,await u.current.play();let Ee=new window.Pose({locateFile:ae=>`https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/${ae}`});Ee.setOptions({modelComplexity:0,smoothLandmarks:!0,enableSegmentation:!1,minDetectionConfidence:.6,minTrackingConfidence:.6}),Ee.onResults(vt),await Ee.initialize(),d.current=Ee;let Ze=async()=>{L&&(d.current&&u.current?.readyState>=2&&!k.current&&await d.current.send({image:u.current}),m.current=requestAnimationFrame(Ze))};m.current=requestAnimationFrame(Ze)}catch{Qt("\u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E40\u0E02\u0E49\u0E32\u0E16\u0E36\u0E07\u0E01\u0E25\u0E49\u0E2D\u0E07\u0E44\u0E14\u0E49 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E2D\u0E19\u0E38\u0E0D\u0E32\u0E15\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E01\u0E25\u0E49\u0E2D\u0E07\u0E41\u0E25\u0E30\u0E23\u0E35\u0E40\u0E1F\u0E23\u0E0A")}})(),()=>{if(L=!1,m.current&&cancelAnimationFrame(m.current),p.current&&p.current.getTracks().forEach(he=>he.stop()),d.current){try{d.current.close()}catch{}d.current=null}}},[i]);let vt=(0,V.useCallback)(L=>{let me=l.current,he=u.current;if(!me||!he)return;let Ee=me.getContext("2d"),Ze=me.width,ae=me.height;Ee.save(),Ee.translate(Ze,0),Ee.scale(-1,1),Ee.drawImage(L.image,0,0,Ze,ae),Ee.restore();let Pe=Z?N.hold_sec:N.reps;if(!L.poseLandmarks){ye("\u0E15\u0E31\u0E49\u0E07\u0E15\u0E31\u0E27\u0E43\u0E2B\u0E49\u0E01\u0E25\u0E49\u0E2D\u0E07\u0E21\u0E2D\u0E07\u0E40\u0E2B\u0E47\u0E19"),Ur(Ee,Ze,ae,S.current,P.current,Pe,N.sets,0,!0,"\u0E15\u0E31\u0E49\u0E07\u0E15\u0E31\u0E27\u0E43\u0E2B\u0E49\u0E01\u0E25\u0E49\u0E2D\u0E07\u0E21\u0E2D\u0E07\u0E40\u0E2B\u0E47\u0E19",g.current,He);return}let te=L.poseLandmarks;window.drawConnectors&&window.POSE_CONNECTIONS&&window.drawConnectors(Ee,te,window.POSE_CONNECTIONS,{color:"#00ff8833",lineWidth:2}),window.drawLandmarks&&window.drawLandmarks(Ee,te,{color:"#00ff88",lineWidth:1,radius:3});let $=0,de=!0,ie=" Good!";try{if(n==="pushup"){let ce=le(te,ue.L_SHOULDER),Ce=le(te,ue.L_ELBOW),ke=le(te,ue.L_WRIST),De=le(te,ue.L_HIP),et=le(te,ue.L_ANKLE);$=gn(ce,Ce,ke);let dt=gn(ce,De,et),Ke=ke[1]>ce[1]+.05,Jt=Math.abs(dt-180)<=15;Ke?Jt?$<70&&$>40?ie=" Perfect Form!":$>=70&&$<=160?ie="\u2193 \u0E25\u0E07\u0E43\u0E2B\u0E49\u0E25\u0E36\u0E01\u0E01\u0E27\u0E48\u0E32\u0E19\u0E35\u0E49!":ie=" Perfect Form!":(de=!1,ie=" \u0E2B\u0E25\u0E31\u0E07\u0E04\u0E48\u0E2D\u0E21! \u0E02\u0E36\u0E07\u0E25\u0E33\u0E15\u0E31\u0E27\u0E43\u0E2B\u0E49\u0E15\u0E23\u0E07",we.error()):(de=!1,ie=" \u0E25\u0E07\u0E44\u0E1B\u0E17\u0E48\u0E32 Push-up! \u0E21\u0E37\u0E2D\u0E15\u0E49\u0E2D\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E1A\u0E19\u0E1E\u0E37\u0E49\u0E19",we.error()),$>160&&(g.current="up"),$<70&&g.current==="up"&&Date.now()-R.current>500&&(g.current="down",R.current=Date.now(),de?(S.current+=1,G(S.current),we.rep()):(M.current+=1,M.current>=2&&(M.current=0,S.current+=1,G(S.current),we.rep())),S.current>=N.reps&&(P.current<N.sets?Se():ht()))}else if(n==="squat"||n==="lunge"){let ce=le(te,ue.L_HIP),Ce=le(te,ue.L_KNEE),ke=le(te,ue.L_ANKLE),De=le(te,ue.L_SHOULDER);$=gn(ce,Ce,ke);let et=n==="squat"?" Solid Squat!":" Good Lunge!",dt=ce[1]>Ce[1]-.15,Ke=Math.abs(Ce[0]-ke[0])<=.07,Jt=Math.abs(De[0]-ce[0])<=.08;$<90&&!dt?(de=!1,ie=" \u0E22\u0E48\u0E2D\u0E25\u0E07\u0E43\u0E2B\u0E49\u0E25\u0E36\u0E01\u0E01\u0E27\u0E48\u0E32\u0E19\u0E35\u0E49! \u0E2A\u0E30\u0E42\u0E1E\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E25\u0E07",we.error()):Ke?Jt?ie=et:(de=!1,ie=" \u0E25\u0E33\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E19! \u0E15\u0E31\u0E49\u0E07\u0E15\u0E31\u0E27\u0E43\u0E2B\u0E49\u0E15\u0E23\u0E07",we.error()):(de=!1,ie=n==="squat"?" \u0E40\u0E02\u0E48\u0E32\u0E1E\u0E31\u0E1A\u0E40\u0E02\u0E49\u0E32! \u0E40\u0E1B\u0E34\u0E14\u0E40\u0E02\u0E48\u0E32\u0E2D\u0E2D\u0E01":" \u0E04\u0E38\u0E21 balance \u0E14\u0E49\u0E27\u0E22",we.error()),$>160&&(g.current="up"),$<90&&g.current==="up"&&Date.now()-R.current>500&&(g.current="down",R.current=Date.now(),de?(S.current+=1,G(S.current),we.rep()):(M.current+=1,M.current>=2&&(M.current=0,S.current+=1,G(S.current),we.rep())),S.current>=N.reps&&(P.current<N.sets?Se():ht()))}else if(n==="situp"){let ce=le(te,ue.L_SHOULDER),Ce=le(te,ue.L_HIP),ke=le(te,ue.L_KNEE),De=le(te,ue.L_ELBOW);$=gn(ce,Ce,ke),gn(Ce,ke,le(te,ue.L_ANKLE))>120?(de=!1,ie=" \u0E07\u0E2D\u0E40\u0E02\u0E48\u0E32\u0E43\u0E2B\u0E49\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32\u0E19\u0E35\u0E49!",we.error()):Math.abs(De[1]-ce[1])>.15&&$<90?(de=!1,ie=" \u0E2D\u0E22\u0E48\u0E32\u0E14\u0E36\u0E07\u0E04\u0E2D! \u0E43\u0E0A\u0E49\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E49\u0E2D\u0E07\u0E22\u0E01\u0E15\u0E31\u0E27",we.error()):ie=$>140?" \u0E25\u0E07\u0E44\u0E1B! \u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E02\u0E36\u0E49\u0E19":$<70?" \u0E02\u0E36\u0E49\u0E19\u0E21\u0E32\u0E41\u0E25\u0E49\u0E27! \u0E14\u0E35\u0E21\u0E32\u0E01":" Good Form!",$>140&&(g.current="down"),$<70&&g.current==="down"&&Date.now()-R.current>500&&(g.current="up",R.current=Date.now(),de?(S.current+=1,G(S.current),we.rep()):(M.current+=1,M.current>=2&&(M.current=0,S.current+=1,G(S.current),we.rep())),S.current>=N.reps&&(P.current<N.sets?Se():ht()))}else if(n==="jumpingjack"){let ce=le(te,ue.L_HIP),Ce=le(te,ue.L_SHOULDER),ke=le(te,ue.L_WRIST),De=le(te,ue.R_SHOULDER),et=le(te,ue.R_WRIST),dt=le(te,ue.R_HIP),Ke=le(te,ue.L_ANKLE),Jt=le(te,ue.R_ANKLE);$=gn(ce,Ce,ke);let _n=gn(dt,De,et),nr=Math.abs(Ke[0]-Jt[0])>.15,Ot=Math.abs($-_n)<=30,Yi=Math.abs(Ce[0]-ce[0])<=.08;Ot?Yi?$>140&&!nr?(de=!1,ie=" \u0E01\u0E32\u0E07\u0E02\u0E32\u0E2D\u0E2D\u0E01\u0E14\u0E49\u0E27\u0E22! \u0E44\u0E21\u0E48\u0E43\u0E0A\u0E48\u0E41\u0E04\u0E48\u0E41\u0E02\u0E19",we.error()):ie=$>140&&nr?" \u0E01\u0E32\u0E07\u0E41\u0E02\u0E19+\u0E02\u0E32\u0E2D\u0E2D\u0E01!":$<40?" \u0E2B\u0E38\u0E1A\u0E41\u0E02\u0E19+\u0E02\u0E32!":" Keep Going!":(de=!1,ie=" \u0E15\u0E31\u0E49\u0E07\u0E15\u0E31\u0E27\u0E15\u0E23\u0E07!",we.error()):(de=!1,ie=" \u0E01\u0E32\u0E07\u0E41\u0E02\u0E19\u0E43\u0E2B\u0E49\u0E40\u0E17\u0E48\u0E32\u0E01\u0E31\u0E19!",we.error()),$<40&&(g.current="down"),$>140&&g.current==="down"&&Date.now()-R.current>500&&(g.current="up",R.current=Date.now(),de?(S.current+=1,G(S.current),we.rep()):(M.current+=1,M.current>=2&&(M.current=0,S.current+=1,G(S.current),we.rep())),S.current>=N.reps&&(P.current<N.sets?Se():ht()))}else if(Z){let ce=le(te,ue.L_SHOULDER),Ce=le(te,ue.L_HIP),ke=le(te,ue.L_ANKLE),De=le(te,ue.L_ELBOW);$=gn(ce,Ce,ke);let et=Ce[1]<ke[1]-.03,dt=Math.abs($-180)<15,Ke=Math.abs(De[0]-ce[0])<.1;de=dt&&Ke&&et,et?Ke?$<165?ie=" \u0E2A\u0E30\u0E42\u0E1E\u0E01\u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19! \u0E25\u0E14\u0E25\u0E07\u0E21\u0E32":$>195?ie=" \u0E2A\u0E30\u0E42\u0E1E\u0E01\u0E15\u0E01! \u0E22\u0E01\u0E02\u0E36\u0E49\u0E19\u0E19\u0E34\u0E14":ie=" Hold it! \u0E04\u0E49\u0E32\u0E07\u0E44\u0E27\u0E49":ie=" \u0E02\u0E49\u0E2D\u0E28\u0E2D\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E15\u0E49\u0E44\u0E2B\u0E25\u0E48!":ie=" \u0E22\u0E01\u0E15\u0E31\u0E27\u0E02\u0E36\u0E49\u0E19! \u0E2B\u0E49\u0E32\u0E21\u0E19\u0E2D\u0E19\u0E23\u0E32\u0E1A",de||we.error(),de&&!Q.current&&!k.current?(Q.current=!0,K.current=setInterval(()=>{B.current+=1,G(B.current),we.tick(),B.current>=N.hold_sec&&(clearInterval(K.current),B.current=0,Q.current=!1,P.current<N.sets?Se():ht())},1e3)):!de&&Q.current&&(clearInterval(K.current),Q.current=!1,ie=" \u0E2B\u0E22\u0E38\u0E14\u0E19\u0E31\u0E1A! \u0E04\u0E37\u0E19 form \u0E41\u0E25\u0E49\u0E27 hold \u0E15\u0E48\u0E2D")}_(Math.round($)),T(de),ye(ie)}catch{}Ur(Ee,Ze,ae,S.current,P.current,Z?N.hold_sec:N.reps,N.sets,Math.round($),de,ie,g.current,He)},[n,N,He,Z]);function Se(){k.current=!0,It(!0),S.current=0,G(0),M.current=0,Z&&(B.current=0),P.current+=1,y(P.current);let L=N.rest_sec;Ye(L);let me=setInterval(()=>{L--,Ye(L),we.tick(),L<=0&&(clearInterval(me),k.current=!1,It(!1),g.current="up")},1e3)}function ht(){Z&&K.current&&clearInterval(K.current),we.complete();let L=estimateCalories(n,N.sets*(Z?N.hold_sec:N.reps),He,a||65);r?r({exercise:n,exPlan:N,sets:N.sets,totalReps:N.sets*(Z?N.hold_sec:N.reps),elapsed:He,calories:L}):Zn(!0)}function Ur(L,me,he,Ee,Ze,ae,Pe,te,$,de,ie,ce){L.fillStyle="rgba(6,8,16,0.75)",L.fillRect(0,0,me,70),L.fillStyle="#00ff88",L.font="bold 13px 'Space Mono',monospace";let Ce=oe[n]||n.toUpperCase();L.fillText(Ce,20,28),L.fillStyle="#ffffff66",L.font="11px 'Space Mono',monospace",L.fillText(`SET ${Ze}/${Pe}`,20,50),L.fillStyle="#ffd700",L.font="bold 42px 'Space Mono',monospace";let ke=Z?`${Ee}s`:`${Ee}/${ae}`;L.fillText(ke,me/2-L.measureText(ke).width/2,52),L.fillStyle=ie==="up"?"#00ff88":"#ff9800",L.font="bold 11px 'Space Mono',monospace",L.fillText(Z?"HOLD":ie.toUpperCase(),me-120,28),L.fillStyle="#ffd700",L.font="bold 20px 'Space Mono',monospace",L.fillText(`${te}\xB0`,me-120,52);let De=$?56:90;L.fillStyle=$?"rgba(0,255,136,0.12)":"rgba(255,51,102,0.35)",L.fillRect(0,he-De,me,De),$||(L.fillStyle="rgba(255,51,102,0.15)",L.fillRect(0,he-De-8,me,8)),L.strokeStyle=$?"#00ff8844":"#ff3366",L.lineWidth=$?1:3,L.beginPath(),L.moveTo(0,he-De),L.lineTo(me,he-De),L.stroke(),L.fillStyle=$?"#00ff88":"#ff4466",L.font=$?"bold 18px 'Space Mono',monospace":"bold 28px 'Space Mono',monospace",L.fillText(de,20,$?he-20:he-50),$||(L.fillStyle="#ff446699",L.font="14px 'Space Mono',monospace",L.fillText("\u0E41\u0E01\u0E49\u0E17\u0E48\u0E32\u0E43\u0E2B\u0E49\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07! (\u0E1C\u0E34\u0E14 2 \u0E04\u0E23\u0E31\u0E49\u0E07 = \u0E19\u0E31\u0E1A 1)",20,he-18));let et=Math.floor(ce/60),dt=ce%60,Ke=`${String(et).padStart(2,"0")}:${String(dt).padStart(2,"0")}`;L.fillStyle="#ffffff33",L.font="12px 'Space Mono',monospace",L.fillText(Ke,me/2-L.measureText(Ke).width/2,$?he-20:he-18)}let Br=Math.floor(He/60),tr=He%60;return React.createElement("div",{style:{position:"relative",width:"100%",minHeight:"100vh",background:"#060810",display:"flex",flexDirection:"column"}},React.createElement("div",{style:{position:"relative",width:"100%",flex:1}},React.createElement("video",{ref:u,style:{position:"absolute",opacity:0,width:"1px",height:"1px"},playsInline:!0,muted:!0}),React.createElement("canvas",{ref:l,width:1280,height:720,style:{width:"100%",height:"auto",display:"block",maxHeight:"calc(100vh - 120px)"}}),!i&&React.createElement("div",{style:{position:"absolute",inset:0,background:"rgba(6,8,16,0.9)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}},React.createElement("div",{style:{width:"40px",height:"40px",border:"3px solid #00ff8833",borderTop:"3px solid #00ff88",borderRadius:"50%",animation:"spin 1s linear infinite",marginBottom:"20px"}}),React.createElement("p",{style:{fontFamily:"'Space Mono',monospace",color:"#00ff88",fontSize:"12px"}},"Loading MediaPipe...")),Xe&&React.createElement("div",{style:{position:"absolute",inset:0,background:"rgba(6,8,16,0.95)",display:"flex",alignItems:"center",justifyContent:"center",padding:"32px"}},React.createElement("div",{style:{textAlign:"center"}},React.createElement("div",{style:{fontSize:"48px",marginBottom:"16px"}}),React.createElement("p",{style:{fontFamily:"'Space Mono',monospace",color:"#ff4466",fontSize:"13px",lineHeight:1.8}},Xe),React.createElement(Je,{variant:"ghost",onClick:()=>window.location.reload(),style:{marginTop:"24px"}},"RELOAD"))),Oe&&React.createElement("div",{style:{position:"absolute",inset:0,background:"rgba(6,8,16,0.88)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",letterSpacing:"4px",color:"#ffffff44",marginBottom:"16px"}},"// REST TIME"),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"96px",fontWeight:700,color:"#00ff88",lineHeight:1}},st),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"14px",color:"#ffffff66",marginTop:"16px"}},"SET ",E," COMING UP"),React.createElement("div",{style:{marginTop:"32px",background:"#0d1a0d",border:"1px solid #00ff8833",borderRadius:"4px",padding:"16px 32px"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"12px",color:"#00ff8899",letterSpacing:"2px"}},"COMPLETED SETS"),React.createElement("div",{style:{display:"flex",gap:"8px",marginTop:"8px",justifyContent:"center"}},Array.from({length:N.sets}).map((L,me)=>React.createElement("div",{key:me,style:{width:"12px",height:"12px",borderRadius:"50%",background:me<E-1?"#00ff88":"#1a2a1a",boxShadow:me<E-1?"0 0 8px #00ff88":"none"}}))))),Xn&&React.createElement("div",{style:{position:"absolute",inset:0,background:"rgba(6,8,16,0.95)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",padding:"32px"}},React.createElement("div",{style:{fontSize:"64px",marginBottom:"24px"}}),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",letterSpacing:"4px",color:"#00ff8866",marginBottom:"12px"}},"// SESSION COMPLETE"),React.createElement("h2",{style:{fontFamily:"'Space Mono',monospace",color:"#ffffff",fontSize:"28px",fontWeight:700,margin:"0 0 32px",textAlign:"center"}},"MISSION",React.createElement("br",null),React.createElement("span",{style:{color:"#00ff88"}},"ACCOMPLISHED")),React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"16px",marginBottom:"32px",width:"100%",maxWidth:"360px"}},[["EXERCISE",n.toUpperCase()],["SETS",`${N.sets}\xD7${N.reps}`],["TIME",`${String(Br).padStart(2,"0")}:${String(tr).padStart(2,"0")}`]].map(([L,me])=>React.createElement("div",{key:L,style:{background:"#0d1a0d",border:"1px solid #00ff8822",borderRadius:"8px",padding:"16px",textAlign:"center"}},React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"18px",fontWeight:700,color:"#00ff88"}},me),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"9px",color:"#ffffff44",letterSpacing:"1px",marginTop:"4px"}},L)))),React.createElement(Je,{onClick:t},"BACK TO PLAN"))),React.createElement("div",{style:{background:"#060810",borderTop:"1px solid #00ff8822",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}},React.createElement("div",null,React.createElement("span",{style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",color:"#00ff88",fontWeight:700}},n.toUpperCase()),React.createElement("span",{style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",color:"#ffffff44",marginLeft:"12px"}},"SET ",E,"/",N.sets," \xB7 ",pe,"/",N.reps," REPS \xB7 ",String(Br).padStart(2,"0"),":",String(tr).padStart(2,"0"))),React.createElement("button",{onClick:t,style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",color:"#ffffff44",background:"none",border:"1px solid #ffffff22",borderRadius:"4px",padding:"6px 14px",cursor:"pointer",letterSpacing:"1px"}},"STOP")))}function _E(){let[n,e]=(0,V.useState)("profile"),[t,r]=(0,V.useState)(()=>it(na,{weight:70,height:170,bodyFat:22})),[i,o]=(0,V.useState)(()=>it(Qi,{calendar:"\u0E27\u0E48\u0E32\u0E07",fatigue:5,location:"\u0E1A\u0E49\u0E32\u0E19",weather:"\u0E41\u0E14\u0E14\u0E08\u0E49\u0E32"})),[a,u]=(0,V.useState)(null),[l,d]=(0,V.useState)("pushup"),[p,m]=(0,V.useState)(null),[g,S]=(0,V.useState)(!1),[P,k]=(0,V.useState)(!1),[R,M]=(0,V.useState)(null),[B,K]=(0,V.useState)(null),[Q,pe]=(0,V.useState)(!0),[G,E]=(0,V.useState)(null),[y,v]=(0,V.useState)(!0),[_,w]=(0,V.useState)(!1),[T,I]=(0,V.useState)([]),[ye,Oe]=(0,V.useState)([]),It=["pushup","squat","plank","lunge","situp","jumpingjack"];(0,V.useEffect)(()=>{let N=Um(async Z=>{if(E(Z),v(!1),Z)try{let oe=await Fm(Z.uid);oe?(oe.stats&&(r(oe.stats),_t(na,oe.stats)),oe.ctx&&(o(oe.ctx),_t(Qi,oe.ctx)),oe.history&&_t(lt,oe.history)):st(Z.uid,t,i,it(lt,[]))}catch(oe){console.warn("Cloud load failed:",oe)}});return()=>N()},[]);let st=async(N,Z,oe,vt)=>{if(N)try{await Lm(N,{stats:Z,ctx:oe,history:vt})}catch(Se){console.warn("Cloud sync failed:",Se)}},Ye=async()=>{w(!0);try{await Vm()}catch(N){alert("\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08: "+N.message)}finally{w(!1)}},Xe=async()=>{window.confirm("\u0E04\u0E38\u0E13\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E23\u0E30\u0E1A\u0E1A\u0E43\u0E0A\u0E48\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48?")&&(await Mm(),alert("\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E23\u0E30\u0E1A\u0E1A\u0E41\u0E25\u0E49\u0E27 \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2B\u0E25\u0E31\u0E07\u0E08\u0E32\u0E01\u0E19\u0E35\u0E49\u0E08\u0E30\u0E16\u0E39\u0E01\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E41\u0E04\u0E48\u0E43\u0E19\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07"))};(0,V.useEffect)(()=>{_t(na,t),G&&st(G.uid,t,i,it(lt,[]))},[t]),(0,V.useEffect)(()=>{_t(Qi,i),G&&st(G.uid,t,i,it(lt,[]))},[i]),(0,V.useEffect)(()=>{let N=Z=>new Promise((oe,vt)=>{if(document.querySelector(`script[src="${Z}"]`)){oe();return}let Se=document.createElement("script");Se.src=Z,Se.crossOrigin="anonymous",Se.onload=oe,Se.onerror=()=>vt(new Error(`Failed: ${Z}`)),document.head.appendChild(Se)});N("https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/pose.js").then(()=>N("https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.3.1675466124/drawing_utils.js")).then(()=>k(!0)).catch(Z=>console.warn("MediaPipe load warn:",Z))},[]);let Qt=()=>{R&&(R.getTracks().forEach(N=>N.stop()),M(null))},Xn=N=>{if(Qt(),eE(N),G&&st(G.uid,t,i,it(lt,[])),T.length>1){let Z=T.slice(1);I(Z),Oe(oe=>[...oe,N]),d(Z[0]),e("tutorial")}else if(T.length===1){let Z=[...ye,N];I([]),Oe([]);let oe=Z.reduce((Se,ht)=>Se+(ht.calories||0),0),vt=Z.reduce((Se,ht)=>Se+(ht.elapsed||0),0);K({...N,calories:oe,elapsed:vt,isGuided:!0,exercises:Z}),e("summary")}else K(N),e("summary")},Zn=async()=>{S(!0),m(null),e("planning");try{let N=await rE(t,i);u(N),_t(xl,N),e("plan")}catch(N){m("\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D AI \u0E44\u0E21\u0E48\u0E44\u0E14\u0E49 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E25\u0E2D\u0E07\u0E43\u0E2B\u0E21\u0E48 ("+N.message+")"),e("context")}finally{S(!1)}},yn=()=>{let N=it(xl,null);N&&(u(N),e("plan"))},He=()=>{I([...It]),Oe([]);let N=It[0];d(N),e("tutorial")};return React.createElement(React.Fragment,null,React.createElement("style",null,`
 @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
 *{box-sizing:border-box;margin:0;padding:0;}body{background:#0a0a12;}
 input[type=range]{-webkit-appearance:none;appearance:none;}
 input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;background:#00ff88;border-radius:50%;box-shadow:0 0 12px #00ff8888;cursor:pointer;margin-top:-6px;}
 input[type=range]::-webkit-slider-runnable-track{height:8px;border-radius:4px;}
 ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:#0a0a0f;}::-webkit-scrollbar-thumb{background:#00ff8833;border-radius:2px;}
 @keyframes spin{to{transform:rotate(360deg)}}
 @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
 .fade-in{animation:fadeIn 0.3s ease forwards}
 `),y?React.createElement("div",{style:{minHeight:"100vh",background:"#0a0a12",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"20px"}},React.createElement("div",{style:{width:"40px",height:"40px",border:"3px solid rgba(255,255,255,0.06)",borderTop:"3px solid #00ff88",borderRadius:"50%",animation:"spin 1s linear infinite"}}),React.createElement("div",{style:{fontFamily:"'Space Mono',monospace",fontSize:"11px",color:"#ffffff33",letterSpacing:"3px"}},"\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14...")):G?React.createElement("div",{style:{minHeight:"100vh",background:"#0a0a12",color:"#ffffff"}},!(n==="tracker"||n==="camera-permission"||n==="camera-preview"||n==="camera-guide")&&React.createElement("div",{style:{position:"sticky",top:0,zIndex:50,borderBottom:"1px solid rgba(255,255,255,0.06)",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(10,10,18,0.85)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)"}},React.createElement("div",{style:{display:"flex",alignItems:"center",gap:"8px"}},React.createElement("span",{style:{fontSize:"18px",color:"#00ff88"}}),React.createElement("span",{style:{fontFamily:"'Space Mono',monospace",fontSize:"12px",fontWeight:700,background:"linear-gradient(135deg, #00ff88, #00bfff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}},"THE ADAPTABLE SHADOW")),React.createElement("div",{style:{display:"flex",gap:"10px",alignItems:"center"}},React.createElement("button",{onClick:Xe,style:{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"50px",padding:"5px 12px",cursor:"pointer",fontFamily:"'Space Mono',monospace",fontSize:"10px",color:"#ffffff88",transition:"all 0.2s",display:"flex",alignItems:"center",gap:"6px"}},React.createElement("img",{src:G.photoURL,alt:"profile",style:{width:"18px",height:"18px",borderRadius:"50%"},referrerPolicy:"no-referrer"}),G.displayName?.split("")[0]),React.createElement("button",{onClick:()=>{ra=!ra,pe(ra)},style:{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"50px",padding:"5px 10px",cursor:"pointer",fontSize:"14px",transition:"all 0.2s"}},""),React.createElement("div",{style:{display:"flex",gap:"6px"}},["profile","context","plan"].map((N,Z)=>React.createElement("div",{key:N,style:{width:"8px",height:"8px",borderRadius:"50%",background:n===N?"#00ff88":["profile","context","plan","planning"].indexOf(n)>Z?"#00ff8844":"rgba(255,255,255,0.08)",boxShadow:n===N?"0 0 8px #00ff88":"none",transition:"all 0.3s"}}))))),React.createElement("div",{className:"fade-in",key:n},n==="profile"&&React.createElement(oE,{stats:t,setStats:r,onNext:()=>e("context"),hasLastPlan:!!it(xl,null),onQuickStart:yn}),n==="context"&&React.createElement(aE,{ctx:i,setCtx:o,onBack:()=>e("profile"),onAnalyze:Zn,loading:g,error:p}),n==="planning"&&React.createElement(cE,null),n==="plan"&&a&&React.createElement(uE,{plan:a,onStart:N=>{d(N),I([]),e("tutorial")},onStartGuided:He,onBack:()=>e("context"),onHistory:()=>e("history"),onDashboard:()=>e("dashboard")}),n==="tutorial"&&a&&React.createElement(lE,{exercise:l,onNext:()=>e("camera-guide"),onBack:()=>e("plan")}),n==="camera-guide"&&a&&React.createElement(hE,{exercise:l,onNext:()=>{M(null),e("camera-permission")},onBack:()=>e("tutorial")}),n==="camera-permission"&&a&&React.createElement(mE,{exercise:l,plan:a,onGranted:N=>{M(N),e("camera-preview")},onBack:()=>e("camera-guide")}),n==="camera-preview"&&a&&React.createElement(gE,{exercise:l,plan:a,mediapipeReady:P,initialStream:R,onStart:()=>e("tracker"),onBack:()=>{Qt(),e("camera-permission")}}),n==="tracker"&&a&&React.createElement(yE,{exercise:l,plan:a,mediapipeReady:P,initialStream:R,weightKg:t.weight,onDone:Xn,onFinish:()=>{Qt(),e("plan")}}),n==="summary"&&B&&React.createElement(dE,{result:B,stats:t,onPlayAgain:()=>e("plan"),onBack:()=>e("plan")}),n==="history"&&React.createElement(fE,{onBack:()=>e("plan"),stats:t}),n==="dashboard"&&React.createElement(pE,{onBack:()=>e("plan")}))):React.createElement(iE,{onLogin:Ye,loading:_}))}export{_E as default};
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-3398f4bb.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/webchannel-wrapper/dist/webchannel-blob/esm/webchannel_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law | agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-091f2944.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
