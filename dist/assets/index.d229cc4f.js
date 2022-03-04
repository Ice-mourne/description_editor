var Y=Object.defineProperty,ee=Object.defineProperties;var te=Object.getOwnPropertyDescriptors;var O=Object.getOwnPropertySymbols;var ne=Object.prototype.hasOwnProperty,ae=Object.prototype.propertyIsEnumerable;var G=(t,a,r)=>a in t?Y(t,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[a]=r,l=(t,a)=>{for(var r in a||(a={}))ne.call(a,r)&&G(t,r,a[r]);if(O)for(var r of O(a))ae.call(a,r)&&G(t,r,a[r]);return t},h=(t,a)=>ee(t,te(a));import{j as L,R as j,r as g,l as x,e as D,a as ie}from"./vendor.953d3f7a.js";const re=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function r(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerpolicy&&(s.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?s.credentials="include":i.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=r(i);fetch(i.href,s)}};re();function W(t){const a=l({},t),r=n=>{for(const i in n)(n[i]===null||n[i]==="")&&delete n[i],!(!n[i]||typeof n[i]!="object")&&(r(n[i]),Object.keys(n[i]).length===0&&delete n[i]);return n};return r(a)}async function K(t){const a=n=>{const i=document.querySelector("#message");i&&(i.textContent=`${i.textContent}
${n}`.trim(),setTimeout(()=>{i.textContent=""},15e3))},r=await t.json();if(t.status!==200){const n=r.message;console.error(`Error: ${t.status} - ${n}`),a(`${n} \u{1F612}`)}else a(" \u{1F355}");return{content:typeof r.content=="string"?JSON.parse(atob(r.content)):null,sha:r.sha}}const B=JSON.parse(localStorage.getItem("login")||"{}"),Z={getDescriptionClovis:"https://api.github.com/repos/Clovis-Breh/clarity-database/contents/descriptions.json",getDescriptionIce:"https://api.github.com/repos/Ice-mourne/clarity-database/contents/descriptions.json",getRateLimit:"https://api.github.com/rate_limit",putDescriptionClovis:"https://api.github.com/repos/Clovis-Breh/clarity-database/contents/descriptions.json",putDescriptionIce:"https://api.github.com/repos/Ice-mourne/clarity-database/contents/descriptions.json"};async function F(t){if(!B.password)return;const a=await fetch(Z[t],{method:"GET",mode:"cors",headers:{authorization:`token ${atob(B.password)}`,accept:"application/vnd.github.v3+json"}});return await K(a)}async function J(t,a){const r=await fetch(Z[t],{method:"PUT",mode:"cors",headers:{authorization:`token ${atob(B.password)}`,accept:"application/vnd.github.v3+json"},body:JSON.stringify({sha:a.sha,branch:"main",message:`Updated ${new Date().toLocaleString()}`,content:btoa(`${a.content}
`)})});K(r)}async function oe(){const t=await F("getDescriptionClovis");if(!!(t==null?void 0:t.content))return t.content}async function z(t){const a=t.ItemData,r=t.dataFromEditor.converted,n=t.dataFromEditor.original,i=d=>{if(!d)return;const y=l({},d),_=u=>{for(const m in u)typeof u[m]=="string"&&(u[m]=u[m].split(",").map(f=>Number(f))),typeof u[m]=="object"&&_(u[m]);return u};return _(y)},s=h(l({},a),{type:t.inputData.type,stats:i(a.stats),description:r.mainEditor,simpleDescription:r.secondaryEditor,lastUpdate:Date.now(),updatedBy:B.username}),c=await F("getDescriptionClovis");if(!c)return;const o=W(h(l({},c.content),{[s.id]:h(l({},s),{editor:n})}));return J("putDescriptionClovis",{sha:c.sha,content:JSON.stringify(o,null,2)}),s}async function se(t){const a=await z(t),r=await F("getDescriptionIce");if(!r||!a)return;const n=W(h(l({},r.content),{[a.id]:a}));J("putDescriptionIce",{sha:r.sha,content:JSON.stringify(n)})}async function ce(){return fetch("https://raw.githubusercontent.com/Clovis-Breh/clarity-database/main/descriptions.json",{method:"GET",mode:"cors"}).then(t=>t.json()).then(t=>t).catch(t=>{})}const e=L.exports.jsx,p=L.exports.jsxs,w=L.exports.Fragment,N=j.createContext({}),S=j.createContext({});function le({children:t}){const[a,r]=g.exports.useState({inputData:{id:"",type:void 0},ItemData:{id:0,name:"",lastUpdate:""},dataFromEditor:{converted:{mainEditor:[],secondaryEditor:[]},original:{mainEditor:"",secondaryEditor:""}},dataFromGithub:{},message:""});return g.exports.useEffect(()=>{ce().then(n=>{n||r(i=>h(l({},i),{message:"AdBlock Error"})),r(i=>h(l({},i),{dataFromGithub:n}))}),F("getRateLimit").then(console.log)},[]),e(N.Provider,{value:a,children:e(S.Provider,{value:r,children:t})})}const de="_info_display_4rosf_1";var me={info_display:de};function ue(){const t=g.exports.useContext(N),a=t.ItemData;function r(){switch(t.inputData.type){case"armorExotic":return p(w,{children:[e("label",{children:"Armor name"}),e("span",{id:"input_item_name",children:a.itemName||""}),e("label",{children:"Armor id"}),e("span",{id:"input_item_id",children:a.itemId||""}),e("label",{children:"Perk name"}),e("span",{id:"input_name",children:a.name||""}),e("label",{children:"Perk id"}),e("span",{id:"input_id",children:a.id||""})]});case"armorMod":case"weaponMod":case"ghostMod":return p(w,{children:[e("label",{children:"Mod name"}),e("span",{id:"input_item_name",children:a.name||""}),e("label",{children:"Mod id"}),e("span",{id:"input_item_id",children:a.id||""})]});case"weaponFrameExotic":case"weaponFrame":return p(w,{children:[e("label",{children:"Frame name"}),e("span",{id:"input_item_name",children:a.name||""}),e("label",{children:"Frame id"}),e("span",{id:"input_item_id",children:a.id||""})]});case"weaponCatalystExotic":return p(w,{children:[e("label",{children:"Catalyst name"}),e("span",{id:"input_item_name",children:a.name||""}),e("label",{children:"Catalyst id"}),e("span",{id:"input_item_id",children:a.id||""})]});default:return p(w,{children:[e("label",{children:"Perk name"}),e("span",{id:"input_item_name",children:a.name||""}),e("label",{children:"Perk id"}),e("span",{id:"input_item_id",children:a.id||""})]})}}return p("div",{className:me.info_display,children:[r(),e("label",{children:"Last update"}),e("span",{children:t.ItemData.lastUpdate}),e("label",{children:"Updated by"}),e("span",{children:t.ItemData.updatedBy||""})]})}const pe="_selection_list_1ygau_1";var fe={selection_list:pe};function he(){const t=g.exports.useContext(S),a=g.exports.useContext(N),r=s=>{t(c=>h(l({},c),{inputData:h(l({},c.inputData),{type:s.target.value})}))},n=()=>a.dataFromGithub?Object.values(a.dataFromGithub).flatMap(o=>o.type===a.inputData.type?o:[]).sort((o,d)=>o.itemName&&d.itemName?o.itemName.localeCompare(d.itemName):o.name.localeCompare(d.name)).map((o,d)=>e("option",{value:o.id,children:o.itemName||o.name},d)):void 0,i=s=>{var o;const c=(o=a.dataFromGithub)==null?void 0:o[s.target.value];!c||t(d=>h(l({},d),{ItemData:{id:c.id,name:c.name,itemId:c.itemId,itemName:c.itemName,lastUpdate:new Date(c.lastUpdate).toLocaleString(),updatedBy:c.updatedBy,stats:c.stats},dataFromEditor:{converted:{mainEditor:c.description,secondaryEditor:c.simpleDescription},original:c.editor}}))};return p("div",{className:fe.selection_list,children:[p("select",{onChange:s=>r(s),children:[e("option",{children:"Select description type"}),p("optgroup",{label:"Armor",children:[e("option",{value:"armorExotic",children:"Exotic Armor"}),e("option",{value:"armorMod",children:"Armor Mod"})]}),p("optgroup",{label:"Exotic Weapon",children:[e("option",{value:"weaponPerkExotic",children:"Exotic Weapon Perk"}),e("option",{value:"weaponFrameExotic",children:"Exotic Weapon Frame"}),e("option",{value:"weaponCatalystExotic",children:"Exotic Weapon catalyst"})]}),p("optgroup",{label:"Exotic Weapon",children:[e("option",{value:"weaponPerk",children:"Weapon Perk"}),e("option",{value:"weaponPerkEnhanced",children:"Weapon Perk Enhanced"})]}),p("optgroup",{label:"Weapon",children:[e("option",{value:"weaponFrame",children:"Weapon Frame"}),e("option",{value:"weaponMod",children:"Weapon Mod"})]}),e("optgroup",{label:"Other",children:e("option",{value:"ghostMod",children:"Ghost Mod"})})]}),e("select",{onChange:s=>i(s),children:n()})]})}const q=async t=>new Promise((a,r)=>{fetch(`https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${t}`,{method:"GET",mode:"cors",headers:{"X-API-Key":"cda7b6e4fc9f49ada4fed618e11841ab"}}).then(n=>n.json()).then(n=>a(n.Response)).catch(r)});function ge(t){const a=async n=>{const i=n.sockets.socketEntries[11].singleInitialItemHash,s=await q(i);return{id:s.hash,name:s.displayProperties.name,itemId:n.hash,itemName:n.displayProperties.name,lastUpdate:"Never"}},r=n=>({id:n.hash,name:n.displayProperties.name,lastUpdate:"Never"});return q(t).then(n=>n.itemType==2?a(n):r(n)).catch(console.error)}const _e="_button_r0kka_1";var be={button:_e};function A({labelText:t,fnName:a}){const r=g.exports.useContext(N),n=g.exports.useContext(S),i=!!r.ItemData.id,s=!!r.inputData.type,c=!!localStorage.getItem("login"),o=()=>{const u=[`${i?"":"Id is missing"}`,`${s?"":"Type is missing"}`,`${c?"":"Login to upload"}`].join(`
`).trim();n(h(l({},r),{message:u})),setTimeout(()=>{n(h(l({},r),{message:""}))},15e3)},d=!!(i&&s&&c),y={addBungieData:()=>ge(r.inputData.id).then(u=>n(h(l({},r),{ItemData:l(l({},r.ItemData),u)}))),download:()=>oe().then(u=>n(m=>h(l({},m),{dataFromGithub:u}))),uploadClovis:()=>d?z(r):o(),uploadIce:()=>d?se(r):o(),doNothing:()=>{}},_=t=="Change Editor"?"toggleEditor":void 0;return e("button",{className:be.button,onClick:y[a||"doNothing"],id:_,children:t})}const ve="_id_input_1pgx1_1";var ye={id_input:ve};function ke(){const t=l({},g.exports.useContext(N)),a=g.exports.useContext(S),r=n=>(t.inputData.id=n.target.value,a(t));return p("div",{className:ye.id_input,children:[e("span",{children:"ID:"}),e("input",{type:"number",onChange:n=>r(n)})]})}const xe="_message_mry3j_1";var we={message:xe};function Ce(){const t=g.exports.useContext(N);return e("div",{className:we.message,id:"message",children:t.message})}const Ie="_stat_input_c86co_1",Ne="_stat_name_c86co_16",Ee="_buttons_c86co_21",De="_stat_container_c86co_34",Te="_active_button_c86co_38",Se="_default_button_c86co_42";var C={stat_input:Ie,stat_name:Ne,buttons:Ee,stat_container:De,active_button:Te,default_button:Se};function Ae(){const[t,a]=g.exports.useState({}),r=g.exports.useContext(S),n=g.exports.useContext(N),i=["range","reload","handling","stability","zoom","aimAssist","chargeDraw","stow","draw","damage"],s=(u,m)=>a(f=>{var b;return h(l({},f),{[u]:h(l({},f[u]),{[m]:!((b=f[u])==null?void 0:b[m])})})}),c=u=>{console.log(u),!u.key.match(/[0-9]|[ ,.]|Backspace|Delete|Arrow(Left|Right)/)&&(u.key.match(/[axv]|[zy]/i)&&u.ctrlKey||u.preventDefault())},o=(u,m,f,b)=>{const I=k=>{var v,R,V;return h(l({},(v=k.ItemData.stats)==null?void 0:v[i[b]]),{[m]:h(l({},(V=(R=k.ItemData.stats)==null?void 0:R[i[b]])==null?void 0:V[m]),{[f]:u.target.value})})};r(k=>h(l({},k),{ItemData:h(l({},k.ItemData),{stats:h(l({},k.ItemData.stats),{[i[b]]:I(k)})})}))};g.exports.useEffect(()=>{a(()=>({})),!!n.ItemData.stats&&Object.entries(n.ItemData.stats).forEach(([u,m])=>{const f=i.indexOf(u);a(b=>h(l({},b),{[f]:{active:!!m.active,passive:!!m.passive}}))})},[n.ItemData.id]);const d=(u,m,f)=>{var I,k,v;const b=(v=(k=(I=n.ItemData.stats)==null?void 0:I[u])==null?void 0:k[m])==null?void 0:v[f];return typeof b=="string"?b:b?b.join(", "):""},y=u=>{var m;return(m=u.match(/([A-Z][a-z]+)|([a-z]+)/g))==null?void 0:m.join(" ")},_=i.map((u,m)=>{var f,b,I,k;return p("div",{className:C.stat_container,children:[p("div",{className:C.buttons,children:[e("button",{onClick:()=>s(m,"active"),className:((f=t[m])==null?void 0:f.active)?C.active_button:C.default_button,children:"Active"}),e("span",{className:C.stat_name,children:y(u)}),e("button",{onClick:()=>s(m,"passive"),className:((b=t[m])==null?void 0:b.passive)?C.active_button:C.default_button,children:"Passive"})]}),((I=t[m])==null?void 0:I.active)?p(w,{children:[e("div",{className:C.stat_name,children:"Active"}),p("div",{className:C.stat_input,children:[e("span",{children:"Stat"}),e("input",{onKeyDown:c,onChange:v=>o(v,"active","stat",m),value:d(i[m],"active","stat")}),e("span",{children:"Multiplier"}),e("input",{onKeyDown:c,onChange:v=>o(v,"active","multiplier",m),value:d(i[m],"active","multiplier")})]})]}):null,((k=t[m])==null?void 0:k.passive)?p(w,{children:[e("div",{className:C.stat_name,children:"Passive"}),p("div",{className:C.stat_input,children:[e("span",{children:"Stat"}),e("input",{onKeyDown:c,onChange:v=>o(v,"passive","stat",m),value:d(i[m],"passive","stat")}),e("span",{children:"Multiplier"}),e("input",{onKeyDown:c,onChange:v=>o(v,"passive","multiplier",m),value:d(i[m],"passive","multiplier")})]})]}):null]},m)});return e(w,{children:e("div",{children:_})})}const Me="_login_container_1o4dx_1",Pe="_login_btn_1o4dx_14";var U={login_container:Me,login_btn:Pe};function Be(){const[t,a]=g.exports.useState({username:"",password:""}),[r,n]=g.exports.useState(localStorage.getItem("login")!==null),i=d=>{a(h(l({},t),{username:d.target.value}))},s=d=>{a(h(l({},t),{password:btoa(d.target.value)}))},c=()=>{localStorage.setItem("login",JSON.stringify(t)),n(!0)};return r?e(w,{children:e("button",{onClick:()=>{localStorage.removeItem("login"),n(!1)},className:U.login_btn,children:"Logout"})}):p(w,{children:[p("div",{className:U.login_container,children:[e("span",{children:"Username"}),e("input",{onChange:d=>i(d)}),e("span",{children:"Password"}),e("input",{onChange:d=>s(d),type:"password"})]}),e("button",{onClick:c,className:U.login_btn,children:"Login"})]})}const Fe="_pvp_1l6kr_1",$e="_pve_1l6kr_5",Re="_highlight_1_1l6kr_9",Le="_highlight_2_1l6kr_13",je="_highlight_3_1l6kr_17",Ue="_highlight_4_1l6kr_21",Ve="_arc_1l6kr_25",Oe="_solar_1l6kr_26",Ge="_stasis_1l6kr_28",We="_primary_1l6kr_33",Ke="_special_1l6kr_34",Ze="_heavy_1l6kr_35",Je="_center_1l6kr_110",ze="_spacer_1l6kr_114",qe="_bold_1l6kr_118",He="_background_1l6kr_122",Qe="_title_1l6kr_126",Xe="_link_1l6kr_130",Ye="_table_1l6kr_137";var H={pvp:Fe,pve:$e,highlight_1:Re,highlight_2:Le,highlight_3:je,highlight_4:Ue,arc:Ve,solar:Oe,void:"_void_1l6kr_27",stasis:Ge,primary:We,special:Ke,heavy:Ze,center:Je,spacer:ze,bold:qe,background:He,title:Qe,link:Xe,table:Ye};const et=t=>{if(t)return`${Math.round(Math.random()*1e3)}ms`},tt=t=>{if(t.linkUrl)return e("a",{href:t.linkUrl,children:t.linkText});if(t.formula||t.formulaText)return p("span",{children:[t.formulaText," ",et(t.formula)]})},Q=t=>t==null?void 0:t.split(" ").map(a=>H[a]).join(" ");function nt({description:t}){const a=(i,s)=>{var c;return e("div",{className:Q(i.className),children:(c=i.lineText)==null?void 0:c.map((o,d)=>e("span",{className:Q(o.className),title:o.title,children:o.text||tt(o)},d))},s)},r=(i,s)=>e("div",{className:H.table,children:i.map((c,o)=>a(c,o))},s);return e("div",{children:(i=>{if(!(!i||Object.keys(i).length===0))return i==null?void 0:i.map((s,c)=>(s==null?void 0:s.table)?r(s.table,c):a(s,c))})(t)})}const at="_notes_1hbar_1",it="_pencil_1hbar_7";var rt={notes:at,pencil:it};function ot(){return p("div",{className:rt.notes,children:[e("div",{className:"fas fa-pencil-alt"}),e("div",{className:"text",children:"Add a note"})]})}var st="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAoCAYAAACrUDmFAAAAAXNSR0IArs4c6QAABXlJREFUaEPdWu1yIjkMlGd/JnncvQUeAAh53MDPta9aUtvyMJCAuU32qFQKgsd267MlJcmV1+b4VvA1fiVdV6QUkaQf8KtIkeTf2Tp80G9ykTThjT3Jl60p+NHF+Nre379m+/xPf0jY6+IXCs4wtMuFzwbNwZZkUFUStigXkckF0QTE7bg1hMOdKMQb1uBACFySbJ9/LmJZ/OPawdmFHR/20g2TQI3UIvE37HZ51Y4/amv1sSYz1zT+mCW5MG5c4/vaPYtsn841eQZwc3orBQCqFZ7LIILKpXSagkjtWRPE3ZcP5v7RPqZFs4TdTJPd7dfvB1ONa8oewl2pAtNi9R9XiWExX4x++NHFdNf/QAjbp2auFSDMMpViMSElwXuLGMuq78PC13yqrrQgKIJUgIyWus68RbWGSLh7uRyhvgZWf+r69GZxesESYK4pRkuCo+Z2C077HUDN74C4ccnUO4BRg7srueU7glRzZZYKETsZ+pq39e6Xcsp3BBbvBGuc59xegx4GHwGQh83D9pl5HQ8a5B91ZtxfwZ5pMInEMHuP1jbHA1KpUTVcPoTtuF8fBcctR7G4n5FZGUA634M0aNprjOaSdjang+clgz2qxZgNKiRG0UijPjKra1qF9ipNC1RqfnmAU3IAkmBMS0P9diAt0RprUAEjq2kiaHHERNfQSnamVrnNOYXqBOFRDixpP5CaYvWjSgBPqWo16qhXGjEVZUSoJpTjt/A8TzsM660Ys7Uj1mNnm6Z4cgeQvjgC8J6g9Khn1Hq8wIT5I8b1GnRf+GsB1uDWirf/lwaPh1rTWKeBQcYdktFsRIMsuRIijUxSchb5IbJ7+tWXZriMVi/B+UVk99yvu8V8V6e3MqGVUEu+mYk+wgfXmuRRjUxSSjYASeR1Fh1XClAke9uA6PcDHJg+qMFNrTQ93gdXIL0lK4tBueWdJ9nPNPPr/VAmgQAgCPRvrJDevtyvQQi3mYk3TuZ5ECt2F6jVZ8xF67NS5LeI/EioYkyT+9nF1++vRbWrhgxNWpE9UsVAuFqvh35fTfRKw/01losOJXm3C0ehZwNtzn1wc3y1liQ7cXDFLLIfYDItt7YejXJRBhcmx5EgA0fX4MFEj86AnDMUaNrOzUoKgHRKSPT3dxCwJ9lKUrohkmhSjVVdZv+fMlEtPN3J/eJLDMVcw5ZCGOR3I1SNPlgVBrOPB5Ekj5toMtO7QtW0pFJ/Me2ZP475oAF0ssaOX9VgcM0RgMZtq6VoTgKQ+Z61VCI4b1WOnE0NIgMzFXZBhtFnzA/6Go9he+7XIARKG11z5JAjja6V93Urycf+QG19UHJwSPt+R2c1zxmFmsxCl4DBzZyQ3HG0mghYOLdoJuXFZxHZvSwPMj4TZL5yTavoW85TE9UIps4uUnTkJTJCmb4CJCxHa1BP6Bw3pI37AnmoTZDgG9NQ8fknQa5O4LWYNVrmqbMSfMZFzOFbk8gAWpAf8cc/AVLBMYnTlz2mILCF4curVsPZc5d+k1AVf+Phi2su5lHPrLXt0tVokAanllOcvao6vfRhKnUN19lcGLHVmMipm/t87JfwIp2WQc69YaUmlL0D4ZGY3MF5j02Y2V0K+TSmmg4gzVXrXyRojnh9IGr3rFyhTnGNXCfJPrUl1yZmHWdXu6cM+9l+azKQKMezKAZvJuEimI8r5+V/Cdh953n0DKCC9N5mHNArVmy6KFU7JDIIFgnYLwJsWnAi5zf4nBCMIRlNsWhPq8A5S/+MsAiwB5m9IJ08H8f/qyDbZOuhzkx9MmySvxXgNSE0swxgr3DYiwAV5OlQsrbfWPxYCiFLsc6qU3SPYHo5j2K1mHBj1jgdJH+rlo0/u4l7SwLHXeOv/wLWRuBwVZFjtwAAAABJRU5ErkJggg==";const ct="_header_abt89_1",lt="_name_abt89_10",dt="_bottom_abt89_19",mt="_left_abt89_25",ut="_right_abt89_32",pt="_type_abt89_38",ft="_ammo_abt89_43",ht="_breaker_abt89_49",gt="_element_abt89_55",_t="_power_abt89_60";var E={header:ct,name:lt,bottom:dt,left:mt,right:ut,type:pt,ammo:ft,breaker:ht,element:gt,power:_t};function bt(t){var n;const a=p("div",{className:E.left,children:[e("div",{className:E.type,children:"Shadow Rifle"}),t.ammo.img?e("img",{className:E.ammo,src:st}):null,t.breaker.img?e("img",{className:E.breaker,src:t.breaker.img}):null]}),r=p("div",{className:E.right,children:[((n=t.element)==null?void 0:n.img)?e("img",{className:E.element,src:t.element.img}):null,e("div",{className:E.power,children:t.power})]});return p("div",{className:E.header,children:[e("a",{className:E.name,children:t.name}),p("div",{className:E.bottom,children:[a,r]})]})}const vt="_perk_box_z1cvm_1",yt="_perk_list_z1cvm_9",kt="_perk_z1cvm_1",xt="_perk_active_z1cvm_28",wt="_icon_container_z1cvm_32",Ct="_icon_container_active_z1cvm_45",It="_name_z1cvm_49",Nt="_name_active_z1cvm_55",Et="_description_z1cvm_59";var T={perk_box:vt,perk_list:yt,perk:kt,perk_active:xt,icon_container:wt,icon_container_active:Ct,name:It,name_active:Nt,description:Et};function Dt(){const t=g.exports.useContext(N),a=[];for(let r=0;r<4;r++){const n=r==0?t==null?void 0:t.dataFromEditor.converted.mainEditor:r==1?t==null?void 0:t.dataFromEditor.converted.secondaryEditor:null;a.push(p("div",{className:T.perk_list,children:[n?e("div",{className:T.description,children:e(nt,{description:n})}):null,p("div",{className:`${T.perk} ${T.perk_active}`,children:[e("div",{className:`${T.icon_container} ${T.icon_container_active}`,children:e("img",{src:"https://bungie.net/common/destiny2_content/icons/f2ff6ea4498ad2d808b4af21e93cf5fe.png"})}),e("div",{className:`${T.name} ${T.name_active}`,children:t==null?void 0:t.ItemData.name})]})]},r))}return e("div",{className:T.perk_box,children:a})}const Tt="_item_sockets_1hqtd_1",St="_frame_img_1hqtd_9",At="_sockets_1hqtd_16",Mt="_frame_info_1hqtd_32",Pt="_masterwork_img_1hqtd_44";var M={item_sockets:Tt,frame_img:St,sockets:At,frame_info:Mt,masterwork_img:Pt};function Bt(){return p("div",{className:M.item_sockets,children:[e("img",{className:M.frame_img,src:"https://www.bungie.net/common/destiny2_content/icons/2a53b9dc2c9c90d3d8ee224d06368412.png"}),p("div",{className:M.frame_info,children:[e("div",{children:"Shadow Frame"}),e("div",{children:"420 rpm / 69 impact"})]}),p("div",{className:M.sockets,children:[e("div",{children:e("img",{src:"https://www.bungie.net/common/destiny2_content/icons/aeacc06cbe147ec400a10225a4dcd504.png"})}),e("div",{children:e("img",{src:"https://www.bungie.net/common/destiny2_content/icons/4e3573080845b4ee9efcb000d4924cb0.jpg"})}),p("div",{className:M.masterwork_img,children:[e("img",{src:"https://www.bungie.net/common/destiny2_content/icons/8ebd558417d6c02e3ed2ffadc4bdbc48.jpg"}),e("img",{src:"https://www.bungie.net/common/destiny2_content/icons/5c935649e5d3e72c967d6b20c3e44e85.png"})]})]})]})}function Ft(t){const a=t.recoilStat,r=1+Math.cos((-20-a*.6)*Math.PI/180),n=1+Math.sin((-20-a*.6)*Math.PI/180),i=2-r,s=Math.sin((5+a)*Math.PI/10)*(100-a);return p("svg",{height:"12",viewBox:"0 0 2 1",children:[e("circle",{r:"1",cx:"1",cy:"1",fill:"rgba(24, 30, 37, 1)"}),e("path",{style:{transform:`rotate(${s*.8}deg)`,transformOrigin:"50% 100%"},d:`M 1 1 L ${i} ${n} A 1 1 0 0 1 ${r} ${n} Z`,fill:"#FFF"})]})}const $t="_stats_vihyy_1",Rt="_name_vihyy_14",Lt="_value_vihyy_20",jt="_barr_vihyy_26";var $={stats:$t,name:Rt,value:Lt,barr:jt};function Ut(t){switch(t){case"Auto Rifle":case"Hand Cannon":case"Pulse Rifle":case"Scout Rifle":case"Shotgun":case"Sniper Rifle":case"Submachine Gun":case"Machine Gun":return[4284893193,4043523819,1240592695,155624089,943549884,4188031367,1345609583,3555269338,2715839340,3871231066];case"Fusion Rifle":case"Linear Fusion Rifle":return[2961396640,4043523819,1240592695,155624089,943549884,4188031367,1345609583,3555269338,2715839340,3871231066];case"Rocket Launcher":case"Grenade Launcher":return[3611281802,2523465841,155624089,943549884,4188031367,1345609583,3555269338,2715839340,3871231066];case"Combat Bow":return[447667954,4043523819,1591432999,1556424089,943549884,4188031367,1345609583,3555269338,2715839340,1931675084];case"Sword":return[2837207746,4043523819,2762071195,209426660,3022301683,3736848092,925767036]}}const P={perks:{155624089:29.8,943549884:55,1240592695:79.3,1345609583:52,2715839340:86,3555269338:20,3871231066:31.6,4043523819:33,4188031367:44.2,4284893193:360},all:{155624089:30,943549884:55,1240592695:79,1345609583:52,2715839340:86,3555269338:20,3871231066:32,4043523819:33,4188031367:45,4284893193:360},mod:{155624089:0,943549884:0,1240592695:0,1345609583:0,2715839340:0,3555269338:0,3871231066:0,4043523819:0,4188031367:0,4284893193:0},masterwork:{155624089:0,943549884:0,1240592695:0,1345609583:0,2715839340:0,3555269338:0,3871231066:0,4043523819:0,4188031367:.8999999999999986,4284893193:0}};function Vt(){const t={4284893193:{statBarPlace:null,name:"Rounds Per Minute"},447667954:{statBarPlace:"ms",name:"Draw Time"},2961396640:{statBarPlace:"ms",name:"Charge Time"},2837207746:{statBarPlace:"stat_bar",name:"Swing Speed"},4043523819:{statBarPlace:"stat_bar",name:"Impact"},3614673599:{statBarPlace:"stat_bar",name:"Blast Radius"},1591432999:{statBarPlace:"stat_bar",name:"Accuracy"},2523465841:{statBarPlace:"stat_bar",name:"Velocity"},2762071195:{statBarPlace:"stat_bar",name:"Guard Efficiency"},209426660:{statBarPlace:"stat_bar",name:"Guard Resistance"},1240592695:{statBarPlace:"stat_bar",name:"Range"},155624089:{statBarPlace:"stat_bar",name:"Stability"},943549884:{statBarPlace:"stat_bar",name:"Handling"},4188031367:{statBarPlace:"stat_bar",name:"Reload Speed"},1345609583:{statBarPlace:"stat_bar",name:"Aim Assistance"},3555269338:{statBarPlace:"stat_bar",name:"Zoom"},2715839340:{statBarPlace:"stat_svg",name:"Recoil Direction"},3022301683:{statBarPlace:"stat_bar",name:"Charge Rate"},3736848092:{statBarPlace:"stat_bar",name:"Guard Endurance"},3871231066:{statBarPlace:null,name:"Magazine"},1931675084:{statBarPlace:null,name:"Inventory Size"},925767036:{statBarPlace:null,name:"Ammo Capacity"}},a=Ut("Auto Rifle"),r=[];return a==null||a.forEach((n,i)=>{const s=t[n];switch(r.push(e("div",{className:$.name,children:s.name},`${i}a`)),r.push(e("div",{className:$.value,children:P.all[n]},`${i}b`)),s.statBarPlace){case"stat_bar":const c=P.perks[n],o=P.mod[n],d=P.masterwork[n];r.push(p("div",{className:$.barr,children:[c?e("div",{style:{width:`${c}%`}}):null,o?e("div",{style:{width:`${o}%`}}):null,d?e("div",{style:{width:`${d}%`}}):null]},`${i}c`));break;case"stat_svg":r.push(e(Ft,{recoilStat:P.perks[n]},i+30));break;case"stat_letter":r.push(p("div",{children:[" ",s.statBarPlace]},`${i}g`))}}),p("div",{className:$.stats,children:[r,"add in game stats"]})}const Ot="_add_block_6ydba_1";var Gt={add_block:Ot};function Wt(){return g.exports.useContext(N).message=="AdBlock Error"?p("div",{className:Gt.add_block,children:[e("h1",{children:"Seems like AdBlock is being stupid and blocking description download."}),e("h2",{children:"Please disable AdBlock and try again."}),e("h3",{children:"If you use uBlock Origin ctrl + lmb is to disable only for current website."}),e("h3",{children:"Other AdBlockers should have similar option."})]}):null}const Kt=t=>t.replace(/\r/g,"").split(/(< table (?:formula )?>[^]*?<\$>)/g).flatMap(a=>{if(!a)return[];const r=a.startsWith(`
`)?a.slice(1):a;return r.endsWith(`
`)?r.slice(0,-1):r}),Zt=t=>t.map(a=>a.startsWith("< table ")?{tableLines:a.split(/\n/)}:{lines:a.split(/\n/)}),Jt=t=>{const a=i=>i.map(s=>{var y;const c=new RegExp(/(<center\/>)|(<bold\/>)|(<background\/>)/g),o=(y=s.match(c))==null?void 0:y.join(" ").replace(/<|\/>/g,""),d=s.replace(c,"");return{lineText:d===""?void 0:d,className:d==""?"spacer":o}}),r=i=>{const s=!!i[0].match(/formula/);return{table:i.flatMap(o=>o.match(/(< table (?:formula )?>|<\$>)/)?[]:a([o])),className:"table",formula:s}},n=[];return t.forEach(i=>{i.lines&&a(i.lines).forEach(s=>n.push(s)),i.tableLines&&n.push(r(i.tableLines))}),n},zt=t=>t.map(a=>{if(!a.table)return a;const r=a.table.map(n=>{var c;const i="(\\|)(?!.*\\|).*",s="\\|?.*?(?=\\|)";return h(l({},n),{lineText:(c=n.lineText)==null?void 0:c.match(new RegExp(`(${i})|(${s})`,"g"))})});return h(l({},a),{table:r})}),qt=t=>{const a=n=>{const i=[n.startsWith("|")?"(\\||\\|b)\\s*<(?:bold":"<(?:bold","highlight_[1-4]","pve|pvp","link|title|formula","stasis|arc|solar|void","primary|special|heavy","background|center)"].join("|"),s="/>";return n.split(new RegExp(`(${i}.*?${s})`,"g")).flatMap(o=>{var b,I,k;if(o.trim()==="")return[];if(!o.match(/^(<|\|)/))return{text:o};const d=o.includes("<formula"),y=o.includes("<title");let _=((b=o.match(new RegExp(i,"g")))==null?void 0:b.join(" ").replaceAll("<",""))||"",u=o.replace(new RegExp(`${i}|${s}`,"g"),"");o.startsWith("|")&&(_=`${_} ${o.startsWith("|b")?"bold":""}`.trim(),u=u.replace(/\|b|\|/g,"").trim());const m=o.match(/(https:.+? )|((?<=https:.+? ).*(?=\/>))/g);if(m)return{linkUrl:(I=m==null?void 0:m[0])==null?void 0:I.trim(),linkText:m==null?void 0:m[1].trim(),className:_};const f=o.match(/\[.*\]/g);if(f&&y)return{title:f[0].replace(/[[\]]/g,""),text:u.replace(/\[.*\]/g,"").trim(),className:_};if(d){const v=(k=u.match(/(ready|stow|range|reload)_\d+/g))==null?void 0:k[0];return{formulaText:u.replace(v||"","").trim(),formula:v==null?void 0:v.trim(),className:_}}return!u.trim()&&!_.trim()?[]:{text:u,className:_}})},r=n=>n.map(i=>{var c;const s=(c=i.lineText)==null?void 0:c.flatMap(o=>a(o));return h(l({},i),{lineText:s})});return t.map(n=>n.table?h(l({},n),{table:r(n.table)}):n.lineText?h(l({},n),{lineText:a(n.lineText)}):n)};function X(t){const a=Kt(t),r=Zt(a),n=Jt(r),i=zt(n);return qt(i)}function Ht({onMount:t}){const a=g.exports.useContext(S),r=g.exports.useContext(N),[n,i]=g.exports.useState(null),[s,c]=g.exports.useState(!1);return g.exports.useEffect(()=>{var d,y,_,u;if(!n){i(t()),c(!0);return}const o=m=>{const f={normal:{main:n.normal.main.getValue(),secondary:n.normal.secondary.getValue()},diff:{main:n.diff.main.getModifiedEditor().getValue(),secondary:n.diff.secondary.getModifiedEditor().getValue()}};a(b=>h(l({},b),{dataFromEditor:{converted:{mainEditor:X(f.normal.main),secondaryEditor:X(f.normal.secondary)},original:{mainEditor:f.normal.main,secondaryEditor:f.normal.secondary}}})),m==="normal"&&(f.normal.main!=f.diff.main&&n.diff.main.getModifiedEditor().setValue(f.normal.main),f.normal.secondary!=f.diff.secondary&&n.diff.secondary.getModifiedEditor().setValue(f.normal.secondary)),m==="diff"&&(f.normal.main!=f.diff.main&&n.normal.main.setValue(f.diff.main),f.normal.secondary!=f.diff.secondary&&n.normal.secondary.setValue(f.diff.secondary))};(d=n.normal.main.getModel())==null||d.onDidChangeContent(()=>o("normal")),(y=n.normal.secondary.getModel())==null||y.onDidChangeContent(()=>o("normal")),(_=n.diff.main.getModifiedEditor().getModel())==null||_.onDidChangeContent(()=>o("diff")),(u=n.diff.secondary.getModifiedEditor().getModel())==null||u.onDidChangeContent(()=>o("diff"))},[s]),g.exports.useEffect(()=>{var u,m,f;if(!n)return;const o=r.ItemData.id,d=(u=r.dataFromGithub)==null?void 0:u[o],y=((m=d==null?void 0:d.editor)==null?void 0:m.mainEditor)||"",_=((f=d==null?void 0:d.editor)==null?void 0:f.secondaryEditor)||"";n.normal.main.setValue(y),n.diff.main.getModifiedEditor().setValue(y),n.diff.main.getOriginalEditor().setValue(y),n.normal.secondary.setValue(_),n.diff.secondary.getModifiedEditor().setValue(_),n.diff.secondary.getOriginalEditor().setValue(_)},[r.ItemData.id]),p("div",{className:"editor-container",children:[e("div",{id:"editor-1"}),e("div",{id:"editor-2"}),e("div",{id:"diffEditor-1",className:"hidden"}),e("div",{id:"diffEditor-2",className:"hidden"})]})}function Qt(){var c;x.register({id:"clarityLangue"}),x.setMonarchTokensProvider("clarityLangue",{tokenizer:{root:[[/< table >/,"table","@table"],[/<(stasis|arc|solar|void|primary|special|heavy|background|center)/,"selfContained","@selfContained"],[/<(highlight_[1-4]|pve|pvp|bold)/,"highlight","@highlight"],[/<(formula|link)/,"extra","@extra"],[/<title /,"title","@title"]],table:[[/<\$>/,"tableEnd","@pop"],[/\|b|\|/,"tableSeparator"],[/<(stasis|arc|void|solar|background|center)/,"selfContained","@selfContained"],[/<(highlight_[1-4]|bold|primary|special|heavy|pve|pvp)/,"highlight","@highlight"],[/<(formula|link)/,"extra","@extra"]],selfContained:[[/\/>/,"selfContained","@pop"],[/./,"selfContained.text"]],highlight:[[/\/>/,"highlight","@pop"],[/./,"highlight.text"]],extra:[[/\/>/,"extra","@pop"],[/(ready|stow|range|reload)_\d+/,"extra.content"],[/https:.+? /,"extra.content"],[/./,"extra.text"]],title:[[/\/>/,"title","@pop"],[/\[.*\]/,"title.text"]]}}),D.defineTheme("myCoolTheme",{base:"vs",inherit:!1,rules:[{token:"table",foreground:"4fc1ff"},{token:"tableSeparator",foreground:"4fc1ff"},{token:"tableEnd",foreground:"4fc1ff"},{token:"selfContained",foreground:"9cdcfe"},{token:"selfContained.text",foreground:"d16969"},{token:"highlight",foreground:"4fc1ff"},{token:"highlight.text",foreground:"ffffff"},{token:"extra",foreground:"4ec9b0"},{token:"extra.text",foreground:"ffffff"},{token:"extra.content",foreground:"4fc1ff"},{token:"bold.selfContained",foreground:"9cdcfe"},{token:"bold",foreground:"4fc1ff"},{token:"bold.text",foreground:"ffffff"},{token:"title",foreground:"4ec9b0"},{token:"title.text",foreground:"4fc1ff"}],colors:{"editor.foreground":"#ffffff","editor.background":"#1e1e1e","editorLineNumber.foreground":"#858585","editorLineNumber.activeForeground":"#c6c6c6","editorCursor.foreground":"#ffffff","editor.lineHighlightBorder":"#fff0","editor.selectionBackground":"#004972b8","editorSuggestWidget.background":"#252526","editorSuggestWidget.border":"#454545","list.hoverBackground":"#2a2d2e","diffEditor.removedTextBackground":"#ff000070","diffEditor.insertedTextBackground":"#a0bf5652"}}),x.registerCompletionItemProvider("clarityLangue",{provideCompletionItems:()=>{const o={kind:x.CompletionItemKind.Snippet,insertTextRules:x.CompletionItemInsertTextRule.InsertAsSnippet};return{suggestions:[l({label:"table",insertText:["< table > ","$0","<$>"].join(`
`)},o),{label:"background",kind:x.CompletionItemKind.Text,insertText:"<background/>"},{label:"center",kind:x.CompletionItemKind.Text,insertText:"<center/>"},{label:"bold line",kind:x.CompletionItemKind.Text,insertText:"<bold/>"},{label:"stasis",kind:x.CompletionItemKind.Text,insertText:"<stasis/>"},{label:"arc",kind:x.CompletionItemKind.Text,insertText:"<arc/>"},{label:"void",kind:x.CompletionItemKind.Text,insertText:"<void/>"},{label:"solar",kind:x.CompletionItemKind.Text,insertText:"<solar/>"},{label:"primary",kind:x.CompletionItemKind.Text,insertText:"<primary/>"},{label:"special",kind:x.CompletionItemKind.Text,insertText:"<special/>"},{label:"heavy",kind:x.CompletionItemKind.Text,insertText:"<heavy/>"},l({label:"highlight",insertText:"<highlight_${1:1} ${2: } />"},o),l({label:"bold text",insertText:"<bold ${1: } />"},o),l({label:"pve",insertText:"<pve ${1: } />"},o),l({label:"pvp",insertText:"<pvp ${1: } />"},o),l({label:"link",insertText:"<link ${1: } ${2: }>"},o),l({label:"combatant",insertText:"<link https://d2clarity.page.link/combatant ${1:Combatant}/>"},o),l({label:"formula_ready",insertText:"<formula ${2:Ready Speed:} ready_${1:0} />"},o),l({label:"formula_stow",insertText:"<formula ${2:Stow Speed:} stow_${1:0} />"},o),l({label:"formula_range",insertText:"<formula ${2:In_Game Range:} range_${1:0} />"},o),l({label:"formula_reload",insertText:"<formula ${2:Reload Time:} reload_${1:0} />"},o),l({label:"formula_ready_empty",insertText:"<formula ready_${1:0} />"},o),l({label:"formula_stow_empty",insertText:"<formula stow_${1:0} />"},o),l({label:"formula_range_empty",insertText:"<formula range_${1:0} />"},o),l({label:"formula_reload_empty",insertText:"<formula reload_${1:0} />"},o),l({label:"title",insertText:"<title ${1: } [${1: }] />"},o)]}}});const t={theme:"myCoolTheme",language:"clarityLangue",minimap:{enabled:!1},automaticLayout:!0,wordWrap:"on",mouseWheelZoom:!0},a=h(l({},t),{lineNumbersMinChars:2,lineDecorationsWidth:0}),r=h(l({},t),{lineNumbersMinChars:3,lineDecorationsWidth:15,renderOverviewRuler:!1,renderIndicators:!1}),n={normal:{main:document.querySelector("#editor-1"),secondary:document.querySelector("#editor-2")},diff:{main:document.querySelector("#diffEditor-1"),secondary:document.querySelector("#diffEditor-2")}},i={main:{original:D.createModel("","clarityLangue"),modified:D.createModel("","clarityLangue")},secondary:{original:D.createModel("","clarityLangue"),modified:D.createModel("","clarityLangue")}},s={normal:{main:D.create(n.normal.main,a),secondary:D.create(n.normal.secondary,a)},diff:{main:D.createDiffEditor(n.diff.main,r),secondary:D.createDiffEditor(n.diff.secondary,r)}};return s.diff.main.setModel({modified:i.main.modified,original:i.main.original}),s.diff.secondary.setModel({modified:i.secondary.modified,original:i.secondary.original}),(c=document.querySelector("#toggleEditor"))==null||c.addEventListener("click",()=>{const o=n.normal,d=n.diff;o.main.classList.toggle("hidden"),o.secondary.classList.toggle("hidden"),d.main.classList.toggle("hidden"),d.secondary.classList.toggle("hidden")}),l({},s)}const Xt={ammo:{img:"https://bungie.net/common/destiny2_content/icons/b6d3805ca8400272b7ee7935b0b75c79.png",type:"special"},breaker:{img:"https://www.bungie.net/common/destiny2_content/icons/DestinyBreakerTypeDefinition_825a438c85404efd6472ff9e97fc7251.png",type:"special"},element:{img:"https://www.bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_530c4c3e7981dc2aefd24fd3293482bf.png",type:"special"},power:69420,name:"FADING SHADOW'S BURDEN"};function Yt(){return p(w,{children:[p("div",{className:"item_popup",children:[e(bt,l({},Xt)),e(ot,{}),e(Vt,{}),e(Bt,{}),e(Dt,{})]}),e(Ht,{onMount:Qt}),p("div",{className:"side_bar",children:[p("div",{className:"id_button",children:[e(ke,{}),e(A,{labelText:"Get data from bungie",fnName:"addBungieData"})]}),e(he,{}),e(ue,{}),e(A,{labelText:"Change Editor"}),e(A,{labelText:"Get updated data",fnName:"download"}),e(Ae,{}),e(A,{labelText:"Add / Update - Database",fnName:"uploadClovis"}),e(A,{labelText:"Add / Update - Live database",fnName:"uploadIce"}),e(Ce,{}),e(Be,{})]}),e(Wt,{})]})}ie.render(e(j.StrictMode,{children:e(le,{children:e(Yt,{})})}),document.getElementById("app"));