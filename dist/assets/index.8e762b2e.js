var Y=Object.defineProperty,ee=Object.defineProperties;var te=Object.getOwnPropertyDescriptors;var G=Object.getOwnPropertySymbols;var ne=Object.prototype.hasOwnProperty,ae=Object.prototype.propertyIsEnumerable;var O=(t,a,o)=>a in t?Y(t,a,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[a]=o,l=(t,a)=>{for(var o in a||(a={}))ne.call(a,o)&&O(t,o,a[o]);if(G)for(var o of G(a))ae.call(a,o)&&O(t,o,a[o]);return t},h=(t,a)=>ee(t,te(a));import{j as L,R as j,r as _,l as x,e as D,a as ie}from"./vendor.953d3f7a.js";const oe=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function o(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerpolicy&&(s.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?s.credentials="include":i.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=o(i);fetch(i.href,s)}};oe();function W(t){const a=l({},t),o=n=>{for(const i in n)(n[i]===null||n[i]==="")&&delete n[i],!(!n[i]||typeof n[i]!="object")&&(o(n[i]),Object.keys(n[i]).length===0&&delete n[i]);return n};return o(a)}async function K(t){const a=n=>{const i=document.querySelector("#message");i&&(i.textContent=`${i.textContent}
${n}`.trim(),setTimeout(()=>{i.textContent=""},15e3))},o=await t.json();if(t.status!==200){const n=o.message;console.error(`Error: ${t.status} - ${n}`),a(`${n} \u{1F612}`)}else a(" \u{1F355}");return{content:typeof o.content=="string"?JSON.parse(atob(o.content)):null,sha:o.sha}}const B=JSON.parse(localStorage.getItem("login")||"{}"),Z={getDescriptionClovis:"https://api.github.com/repos/Clovis-Breh/clarity-database/contents/descriptions.json",getDescriptionIce:"https://api.github.com/repos/Ice-mourne/clarity-database/contents/descriptions.json",getRateLimit:"https://api.github.com/rate_limit",putDescriptionClovis:"https://api.github.com/repos/Clovis-Breh/clarity-database/contents/descriptions.json",putDescriptionIce:"https://api.github.com/repos/Ice-mourne/clarity-database/contents/descriptions.json"};async function F(t){if(!B.password)return;const a=await fetch(Z[t],{method:"GET",mode:"cors",headers:{authorization:`token ${atob(B.password)}`,accept:"application/vnd.github.v3+json"}});return await K(a)}async function J(t,a){const o=await fetch(Z[t],{method:"PUT",mode:"cors",headers:{authorization:`token ${atob(B.password)}`,accept:"application/vnd.github.v3+json"},body:JSON.stringify({sha:a.sha,branch:"main",message:`Updated ${new Date().toLocaleString()}`,content:btoa(`${a.content}
`)})});K(o)}async function re(){const t=await F("getDescriptionClovis");if(!!(t==null?void 0:t.content))return t.content}async function z(t){const a=t.ItemData,o=t.dataFromEditor.converted,n=t.dataFromEditor.original,i=m=>{if(!m)return;const y=l({},m),b=u=>{for(const d in u)typeof u[d]=="string"&&(u[d]=u[d].split(",").map(f=>Number(f))),typeof u[d]=="object"&&b(u[d]);return u};return b(y)},s=h(l({},a),{type:t.inputData.type,stats:i(a.stats),description:o.mainEditor,simpleDescription:o.secondaryEditor,lastUpdate:Date.now(),updatedBy:B.username}),c=await F("getDescriptionClovis");if(!c)return;const r=W(h(l({},c.content),{[s.id]:h(l({},s),{editor:n})}));return J("putDescriptionClovis",{sha:c.sha,content:JSON.stringify(r,null,2)}),s}async function se(t){const a=await z(t),o=await F("getDescriptionIce");if(!o||!a)return;const n=W(h(l({},o.content),{[a.id]:a}));J("putDescriptionIce",{sha:o.sha,content:JSON.stringify(n)})}async function ce(){return fetch("https://raw.githubusercontent.com/Clovis-Breh/clarity-database/main/descriptions.json",{method:"GET",mode:"cors"}).then(t=>t.json()).then(t=>t).catch(t=>{})}const e=L.exports.jsx,p=L.exports.jsxs,w=L.exports.Fragment,N=j.createContext({}),S=j.createContext({});function le({children:t}){const[a,o]=_.exports.useState({inputData:{id:"",type:void 0},ItemData:{id:0,name:"",lastUpdate:""},dataFromEditor:{converted:{mainEditor:[],secondaryEditor:[]},original:{mainEditor:"",secondaryEditor:""}},dataFromGithub:{},message:""});return _.exports.useEffect(()=>{ce().then(n=>{n||o(i=>h(l({},i),{message:"AdBlock Error"})),o(i=>h(l({},i),{dataFromGithub:n}))}),F("getRateLimit").then(console.log)},[]),e(N.Provider,{value:a,children:e(S.Provider,{value:o,children:t})})}const de="_info_display_4rosf_1";var me={info_display:de};function ue(){const t=_.exports.useContext(N),a=t.ItemData;function o(){switch(t.inputData.type){case"armorExotic":return p(w,{children:[e("label",{children:"Armor name"}),e("span",{id:"input_item_name",children:a.itemName||""}),e("label",{children:"Armor id"}),e("span",{id:"input_item_id",children:a.itemId||""}),e("label",{children:"Perk name"}),e("span",{id:"input_name",children:a.name||""}),e("label",{children:"Perk id"}),e("span",{id:"input_id",children:a.id||""})]});case"armorMod":case"weaponMod":case"ghostMod":return p(w,{children:[e("label",{children:"Mod name"}),e("span",{id:"input_item_name",children:a.name||""}),e("label",{children:"Mod id"}),e("span",{id:"input_item_id",children:a.id||""})]});case"weaponFrameExotic":case"weaponFrame":return p(w,{children:[e("label",{children:"Frame name"}),e("span",{id:"input_item_name",children:a.name||""}),e("label",{children:"Frame id"}),e("span",{id:"input_item_id",children:a.id||""})]});case"weaponCatalystExotic":return p(w,{children:[e("label",{children:"Catalyst name"}),e("span",{id:"input_item_name",children:a.name||""}),e("label",{children:"Catalyst id"}),e("span",{id:"input_item_id",children:a.id||""})]});default:return p(w,{children:[e("label",{children:"Perk name"}),e("span",{id:"input_item_name",children:a.name||""}),e("label",{children:"Perk id"}),e("span",{id:"input_item_id",children:a.id||""})]})}}return p("div",{className:me.info_display,children:[o(),e("label",{children:"Last update"}),e("span",{children:t.ItemData.lastUpdate}),e("label",{children:"Updated by"}),e("span",{children:t.ItemData.updatedBy||""})]})}const pe="_selection_list_1ygau_1";var fe={selection_list:pe};function he(){const t=_.exports.useContext(S),a=_.exports.useContext(N),o=s=>{t(c=>h(l({},c),{inputData:h(l({},c.inputData),{type:s.target.value})}))},n=()=>a.dataFromGithub?Object.values(a.dataFromGithub).flatMap(r=>r.type===a.inputData.type?r:[]).sort((r,m)=>r.itemName&&m.itemName?r.itemName.localeCompare(m.itemName):r.name.localeCompare(m.name)).map((r,m)=>e("option",{value:r.id,children:r.itemName||r.name},m)):void 0,i=s=>{var r;const c=(r=a.dataFromGithub)==null?void 0:r[s.target.value];!c||t(m=>h(l({},m),{ItemData:{id:c.id,name:c.name,itemId:c.itemId,itemName:c.itemName,lastUpdate:new Date(c.lastUpdate).toLocaleString(),updatedBy:c.updatedBy,stats:c.stats},dataFromEditor:{converted:{mainEditor:c.description,secondaryEditor:c.simpleDescription},original:c.editor}}))};return p("div",{className:fe.selection_list,children:[p("select",{onChange:s=>o(s),children:[e("option",{children:"Select description type"}),p("optgroup",{label:"Armor",children:[e("option",{value:"armorExotic",children:"Exotic Armor"}),e("option",{value:"armorMod",children:"Armor Mod"})]}),p("optgroup",{label:"Exotic Weapon",children:[e("option",{value:"weaponPerkExotic",children:"Exotic Weapon Perk"}),e("option",{value:"weaponFrameExotic",children:"Exotic Weapon Frame"}),e("option",{value:"weaponCatalystExotic",children:"Exotic Weapon catalyst"})]}),p("optgroup",{label:"Exotic Weapon",children:[e("option",{value:"weaponPerk",children:"Weapon Perk"}),e("option",{value:"weaponPerkEnhanced",children:"Weapon Perk Enhanced"})]}),p("optgroup",{label:"Weapon",children:[e("option",{value:"weaponFrame",children:"Weapon Frame"}),e("option",{value:"weaponMod",children:"Weapon Mod"})]}),e("optgroup",{label:"Other",children:e("option",{value:"ghostMod",children:"Ghost Mod"})})]}),e("select",{onChange:s=>i(s),children:n()})]})}const q=async t=>new Promise((a,o)=>{fetch(`https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${t}`,{method:"GET",mode:"cors",headers:{"X-API-Key":"cda7b6e4fc9f49ada4fed618e11841ab"}}).then(n=>n.json()).then(n=>a(n.Response)).catch(o)});function ge(t){const a=async n=>{const i=n.sockets.socketEntries[11].singleInitialItemHash,s=await q(i);return{id:s.hash,name:s.displayProperties.name,itemId:n.hash,itemName:n.displayProperties.name}},o=n=>({id:n.hash,name:n.displayProperties.name});return q(t).then(n=>n.itemType==2?a(n):o(n)).catch(console.error)}const _e="_button_r0kka_1";var be={button:_e};function A({labelText:t,fnName:a}){const o=_.exports.useContext(N),n=_.exports.useContext(S),i=!!o.ItemData.id,s=!!o.inputData.type,c=!!localStorage.getItem("login"),r=()=>{const u=[`${i?"":"Id is missing"}`,`${s?"":"Type is missing"}`,`${c?"":"Login to upload"}`].join(`
`).trim();n(h(l({},o),{message:u})),setTimeout(()=>{n(h(l({},o),{message:""}))},15e3)},m=!!(i&&s&&c),y={addBungieData:()=>ge(o.inputData.id).then(u=>{var g;if(!u)return;const{lastUpdate:d,updatedBy:f}=((g=o.dataFromGithub)==null?void 0:g[u.id])||{};n(h(l({},o),{ItemData:l(h(l({},o.ItemData),{lastUpdate:d?new Date(d).toLocaleString():void 0,updatedBy:f}),u)}))}),download:()=>re().then(u=>n(d=>h(l({},d),{dataFromGithub:u}))),uploadClovis:()=>m?z(o):r(),uploadIce:()=>m?se(o):r(),doNothing:()=>{}},b=t=="Change Editor"?"toggleEditor":void 0;return e("button",{className:be.button,onClick:y[a||"doNothing"],id:b,children:t})}const ve="_id_input_1pgx1_1";var ye={id_input:ve};function ke(){const t=l({},_.exports.useContext(N)),a=_.exports.useContext(S),o=n=>(t.inputData.id=n.target.value,a(t));return p("div",{className:ye.id_input,children:[e("span",{children:"ID:"}),e("input",{type:"number",onChange:n=>o(n)})]})}const xe="_message_mry3j_1";var we={message:xe};function Ce(){const t=_.exports.useContext(N);return e("div",{className:we.message,id:"message",children:t.message})}const Ie="_stat_input_c86co_1",Ne="_stat_name_c86co_16",Ee="_buttons_c86co_21",De="_stat_container_c86co_34",Te="_active_button_c86co_38",Se="_default_button_c86co_42";var C={stat_input:Ie,stat_name:Ne,buttons:Ee,stat_container:De,active_button:Te,default_button:Se};function Ae(){const[t,a]=_.exports.useState({}),o=_.exports.useContext(S),n=_.exports.useContext(N),i=["range","reload","handling","stability","zoom","aimAssist","chargeDraw","stow","draw","damage"],s=(u,d)=>a(f=>{var g;return h(l({},f),{[u]:h(l({},f[u]),{[d]:!((g=f[u])==null?void 0:g[d])})})}),c=u=>{console.log(u),!u.key.match(/[0-9]|[ ,.]|Backspace|Delete|Arrow(Left|Right)/)&&(u.key.match(/[axv]|[zy]/i)&&u.ctrlKey||u.preventDefault())},r=(u,d,f,g)=>{const I=k=>{var v,R,V;return h(l({},(v=k.ItemData.stats)==null?void 0:v[i[g]]),{[d]:h(l({},(V=(R=k.ItemData.stats)==null?void 0:R[i[g]])==null?void 0:V[d]),{[f]:u.target.value})})};o(k=>h(l({},k),{ItemData:h(l({},k.ItemData),{stats:h(l({},k.ItemData.stats),{[i[g]]:I(k)})})}))};_.exports.useEffect(()=>{a(()=>({})),!!n.ItemData.stats&&Object.entries(n.ItemData.stats).forEach(([u,d])=>{const f=i.indexOf(u);a(g=>h(l({},g),{[f]:{active:!!d.active,passive:!!d.passive}}))})},[n.ItemData.id]);const m=(u,d,f)=>{var I,k,v;const g=(v=(k=(I=n.ItemData.stats)==null?void 0:I[u])==null?void 0:k[d])==null?void 0:v[f];return typeof g=="string"?g:g?g.join(", "):""},y=u=>{var d;return(d=u.match(/([A-Z][a-z]+)|([a-z]+)/g))==null?void 0:d.join(" ")},b=i.map((u,d)=>{var f,g,I,k;return p("div",{className:C.stat_container,children:[p("div",{className:C.buttons,children:[e("button",{onClick:()=>s(d,"active"),className:((f=t[d])==null?void 0:f.active)?C.active_button:C.default_button,children:"Active"}),e("span",{className:C.stat_name,children:y(u)}),e("button",{onClick:()=>s(d,"passive"),className:((g=t[d])==null?void 0:g.passive)?C.active_button:C.default_button,children:"Passive"})]}),((I=t[d])==null?void 0:I.active)?p(w,{children:[e("div",{className:C.stat_name,children:"Active"}),p("div",{className:C.stat_input,children:[e("span",{children:"Stat"}),e("input",{onKeyDown:c,onChange:v=>r(v,"active","stat",d),value:m(i[d],"active","stat")}),e("span",{children:"Multiplier"}),e("input",{onKeyDown:c,onChange:v=>r(v,"active","multiplier",d),value:m(i[d],"active","multiplier")})]})]}):null,((k=t[d])==null?void 0:k.passive)?p(w,{children:[e("div",{className:C.stat_name,children:"Passive"}),p("div",{className:C.stat_input,children:[e("span",{children:"Stat"}),e("input",{onKeyDown:c,onChange:v=>r(v,"passive","stat",d),value:m(i[d],"passive","stat")}),e("span",{children:"Multiplier"}),e("input",{onKeyDown:c,onChange:v=>r(v,"passive","multiplier",d),value:m(i[d],"passive","multiplier")})]})]}):null]},d)});return e(w,{children:e("div",{children:b})})}const Me="_login_container_1o4dx_1",Pe="_login_btn_1o4dx_14";var U={login_container:Me,login_btn:Pe};function Be(){const[t,a]=_.exports.useState({username:"",password:""}),[o,n]=_.exports.useState(localStorage.getItem("login")!==null),i=m=>{a(h(l({},t),{username:m.target.value}))},s=m=>{a(h(l({},t),{password:btoa(m.target.value)}))},c=()=>{localStorage.setItem("login",JSON.stringify(t)),n(!0)};return o?e(w,{children:e("button",{onClick:()=>{localStorage.removeItem("login"),n(!1)},className:U.login_btn,children:"Logout"})}):p(w,{children:[p("div",{className:U.login_container,children:[e("span",{children:"Username"}),e("input",{onChange:m=>i(m)}),e("span",{children:"Password"}),e("input",{onChange:m=>s(m),type:"password"})]}),e("button",{onClick:c,className:U.login_btn,children:"Login"})]})}const Fe="_pvp_1l6kr_1",$e="_pve_1l6kr_5",Re="_highlight_1_1l6kr_9",Le="_highlight_2_1l6kr_13",je="_highlight_3_1l6kr_17",Ue="_highlight_4_1l6kr_21",Ve="_arc_1l6kr_25",Ge="_solar_1l6kr_26",Oe="_stasis_1l6kr_28",We="_primary_1l6kr_33",Ke="_special_1l6kr_34",Ze="_heavy_1l6kr_35",Je="_center_1l6kr_110",ze="_spacer_1l6kr_114",qe="_bold_1l6kr_118",He="_background_1l6kr_122",Qe="_title_1l6kr_126",Xe="_link_1l6kr_130",Ye="_table_1l6kr_137";var H={pvp:Fe,pve:$e,highlight_1:Re,highlight_2:Le,highlight_3:je,highlight_4:Ue,arc:Ve,solar:Ge,void:"_void_1l6kr_27",stasis:Oe,primary:We,special:Ke,heavy:Ze,center:Je,spacer:ze,bold:qe,background:He,title:Qe,link:Xe,table:Ye};const et=t=>{if(t)return`${Math.round(Math.random()*1e3)}ms`},tt=t=>{if(t.linkUrl)return e("a",{href:t.linkUrl,children:t.linkText});if(t.formula||t.formulaText)return p("span",{children:[t.formulaText," ",et(t.formula)]})},Q=t=>t==null?void 0:t.split(" ").map(a=>H[a]).join(" ");function nt({description:t}){const a=(i,s)=>{var c;return e("div",{className:Q(i.className),children:(c=i.lineText)==null?void 0:c.map((r,m)=>e("span",{className:Q(r.className),title:r.title,children:r.text||tt(r)},m))},s)},o=(i,s)=>e("div",{className:H.table,children:i.map((c,r)=>a(c,r))},s);return e("div",{children:(i=>{if(!(!i||Object.keys(i).length===0))return i==null?void 0:i.map((s,c)=>(s==null?void 0:s.table)?o(s.table,c):a(s,c))})(t)})}const at="_notes_1hbar_1",it="_pencil_1hbar_7";var ot={notes:at,pencil:it};function rt(){return p("div",{className:ot.notes,children:[e("div",{className:"fas fa-pencil-alt"}),e("div",{className:"text",children:"Add a note"})]})}var st="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAoCAYAAACrUDmFAAAAAXNSR0IArs4c6QAABXlJREFUaEPdWu1yIjkMlGd/JnncvQUeAAh53MDPta9aUtvyMJCAuU32qFQKgsd267MlJcmV1+b4VvA1fiVdV6QUkaQf8KtIkeTf2Tp80G9ykTThjT3Jl60p+NHF+Nre379m+/xPf0jY6+IXCs4wtMuFzwbNwZZkUFUStigXkckF0QTE7bg1hMOdKMQb1uBACFySbJ9/LmJZ/OPawdmFHR/20g2TQI3UIvE37HZ51Y4/amv1sSYz1zT+mCW5MG5c4/vaPYtsn841eQZwc3orBQCqFZ7LIILKpXSagkjtWRPE3ZcP5v7RPqZFs4TdTJPd7dfvB1ONa8oewl2pAtNi9R9XiWExX4x++NHFdNf/QAjbp2auFSDMMpViMSElwXuLGMuq78PC13yqrrQgKIJUgIyWus68RbWGSLh7uRyhvgZWf+r69GZxesESYK4pRkuCo+Z2C077HUDN74C4ccnUO4BRg7srueU7glRzZZYKETsZ+pq39e6Xcsp3BBbvBGuc59xegx4GHwGQh83D9pl5HQ8a5B91ZtxfwZ5pMInEMHuP1jbHA1KpUTVcPoTtuF8fBcctR7G4n5FZGUA634M0aNprjOaSdjang+clgz2qxZgNKiRG0UijPjKra1qF9ipNC1RqfnmAU3IAkmBMS0P9diAt0RprUAEjq2kiaHHERNfQSnamVrnNOYXqBOFRDixpP5CaYvWjSgBPqWo16qhXGjEVZUSoJpTjt/A8TzsM660Ys7Uj1mNnm6Z4cgeQvjgC8J6g9Khn1Hq8wIT5I8b1GnRf+GsB1uDWirf/lwaPh1rTWKeBQcYdktFsRIMsuRIijUxSchb5IbJ7+tWXZriMVi/B+UVk99yvu8V8V6e3MqGVUEu+mYk+wgfXmuRRjUxSSjYASeR1Fh1XClAke9uA6PcDHJg+qMFNrTQ93gdXIL0lK4tBueWdJ9nPNPPr/VAmgQAgCPRvrJDevtyvQQi3mYk3TuZ5ECt2F6jVZ8xF67NS5LeI/EioYkyT+9nF1++vRbWrhgxNWpE9UsVAuFqvh35fTfRKw/01losOJXm3C0ehZwNtzn1wc3y1liQ7cXDFLLIfYDItt7YejXJRBhcmx5EgA0fX4MFEj86AnDMUaNrOzUoKgHRKSPT3dxCwJ9lKUrohkmhSjVVdZv+fMlEtPN3J/eJLDMVcw5ZCGOR3I1SNPlgVBrOPB5Ekj5toMtO7QtW0pFJ/Me2ZP475oAF0ssaOX9VgcM0RgMZtq6VoTgKQ+Z61VCI4b1WOnE0NIgMzFXZBhtFnzA/6Go9he+7XIARKG11z5JAjja6V93Urycf+QG19UHJwSPt+R2c1zxmFmsxCl4DBzZyQ3HG0mghYOLdoJuXFZxHZvSwPMj4TZL5yTavoW85TE9UIps4uUnTkJTJCmb4CJCxHa1BP6Bw3pI37AnmoTZDgG9NQ8fknQa5O4LWYNVrmqbMSfMZFzOFbk8gAWpAf8cc/AVLBMYnTlz2mILCF4curVsPZc5d+k1AVf+Phi2su5lHPrLXt0tVokAanllOcvao6vfRhKnUN19lcGLHVmMipm/t87JfwIp2WQc69YaUmlL0D4ZGY3MF5j02Y2V0K+TSmmg4gzVXrXyRojnh9IGr3rFyhTnGNXCfJPrUl1yZmHWdXu6cM+9l+azKQKMezKAZvJuEimI8r5+V/Cdh953n0DKCC9N5mHNArVmy6KFU7JDIIFgnYLwJsWnAi5zf4nBCMIRlNsWhPq8A5S/+MsAiwB5m9IJ08H8f/qyDbZOuhzkx9MmySvxXgNSE0swxgr3DYiwAV5OlQsrbfWPxYCiFLsc6qU3SPYHo5j2K1mHBj1jgdJH+rlo0/u4l7SwLHXeOv/wLWRuBwVZFjtwAAAABJRU5ErkJggg==";const ct="_header_abt89_1",lt="_name_abt89_10",dt="_bottom_abt89_19",mt="_left_abt89_25",ut="_right_abt89_32",pt="_type_abt89_38",ft="_ammo_abt89_43",ht="_breaker_abt89_49",gt="_element_abt89_55",_t="_power_abt89_60";var E={header:ct,name:lt,bottom:dt,left:mt,right:ut,type:pt,ammo:ft,breaker:ht,element:gt,power:_t};function bt(t){var n;const a=p("div",{className:E.left,children:[e("div",{className:E.type,children:"Shadow Rifle"}),t.ammo.img?e("img",{className:E.ammo,src:st}):null,t.breaker.img?e("img",{className:E.breaker,src:t.breaker.img}):null]}),o=p("div",{className:E.right,children:[((n=t.element)==null?void 0:n.img)?e("img",{className:E.element,src:t.element.img}):null,e("div",{className:E.power,children:t.power})]});return p("div",{className:E.header,children:[e("a",{className:E.name,children:t.name}),p("div",{className:E.bottom,children:[a,o]})]})}const vt="_perk_box_z1cvm_1",yt="_perk_list_z1cvm_9",kt="_perk_z1cvm_1",xt="_perk_active_z1cvm_28",wt="_icon_container_z1cvm_32",Ct="_icon_container_active_z1cvm_45",It="_name_z1cvm_49",Nt="_name_active_z1cvm_55",Et="_description_z1cvm_59";var T={perk_box:vt,perk_list:yt,perk:kt,perk_active:xt,icon_container:wt,icon_container_active:Ct,name:It,name_active:Nt,description:Et};function Dt(){const t=_.exports.useContext(N),a=[];for(let o=0;o<4;o++){const n=o==0?t==null?void 0:t.dataFromEditor.converted.mainEditor:o==1?t==null?void 0:t.dataFromEditor.converted.secondaryEditor:null;a.push(p("div",{className:T.perk_list,children:[n?e("div",{className:T.description,children:e(nt,{description:n})}):null,p("div",{className:`${T.perk} ${T.perk_active}`,children:[e("div",{className:`${T.icon_container} ${T.icon_container_active}`,children:e("img",{src:"https://bungie.net/common/destiny2_content/icons/f2ff6ea4498ad2d808b4af21e93cf5fe.png"})}),e("div",{className:`${T.name} ${T.name_active}`,children:t==null?void 0:t.ItemData.name})]})]},o))}return e("div",{className:T.perk_box,children:a})}const Tt="_item_sockets_1hqtd_1",St="_frame_img_1hqtd_9",At="_sockets_1hqtd_16",Mt="_frame_info_1hqtd_32",Pt="_masterwork_img_1hqtd_44";var M={item_sockets:Tt,frame_img:St,sockets:At,frame_info:Mt,masterwork_img:Pt};function Bt(){return p("div",{className:M.item_sockets,children:[e("img",{className:M.frame_img,src:"https://www.bungie.net/common/destiny2_content/icons/2a53b9dc2c9c90d3d8ee224d06368412.png"}),p("div",{className:M.frame_info,children:[e("div",{children:"Shadow Frame"}),e("div",{children:"420 rpm / 69 impact"})]}),p("div",{className:M.sockets,children:[e("div",{children:e("img",{src:"https://www.bungie.net/common/destiny2_content/icons/aeacc06cbe147ec400a10225a4dcd504.png"})}),e("div",{children:e("img",{src:"https://www.bungie.net/common/destiny2_content/icons/4e3573080845b4ee9efcb000d4924cb0.jpg"})}),p("div",{className:M.masterwork_img,children:[e("img",{src:"https://www.bungie.net/common/destiny2_content/icons/8ebd558417d6c02e3ed2ffadc4bdbc48.jpg"}),e("img",{src:"https://www.bungie.net/common/destiny2_content/icons/5c935649e5d3e72c967d6b20c3e44e85.png"})]})]})]})}function Ft(t){const a=t.recoilStat,o=1+Math.cos((-20-a*.6)*Math.PI/180),n=1+Math.sin((-20-a*.6)*Math.PI/180),i=2-o,s=Math.sin((5+a)*Math.PI/10)*(100-a);return p("svg",{height:"12",viewBox:"0 0 2 1",children:[e("circle",{r:"1",cx:"1",cy:"1",fill:"rgba(24, 30, 37, 1)"}),e("path",{style:{transform:`rotate(${s*.8}deg)`,transformOrigin:"50% 100%"},d:`M 1 1 L ${i} ${n} A 1 1 0 0 1 ${o} ${n} Z`,fill:"#FFF"})]})}const $t="_stats_vihyy_1",Rt="_name_vihyy_14",Lt="_value_vihyy_20",jt="_barr_vihyy_26";var $={stats:$t,name:Rt,value:Lt,barr:jt};function Ut(t){switch(t){case"Auto Rifle":case"Hand Cannon":case"Pulse Rifle":case"Scout Rifle":case"Shotgun":case"Sniper Rifle":case"Submachine Gun":case"Machine Gun":return[4284893193,4043523819,1240592695,155624089,943549884,4188031367,1345609583,3555269338,2715839340,3871231066];case"Fusion Rifle":case"Linear Fusion Rifle":return[2961396640,4043523819,1240592695,155624089,943549884,4188031367,1345609583,3555269338,2715839340,3871231066];case"Rocket Launcher":case"Grenade Launcher":return[3611281802,2523465841,155624089,943549884,4188031367,1345609583,3555269338,2715839340,3871231066];case"Combat Bow":return[447667954,4043523819,1591432999,1556424089,943549884,4188031367,1345609583,3555269338,2715839340,1931675084];case"Sword":return[2837207746,4043523819,2762071195,209426660,3022301683,3736848092,925767036]}}const P={perks:{155624089:29.8,943549884:55,1240592695:79.3,1345609583:52,2715839340:86,3555269338:20,3871231066:31.6,4043523819:33,4188031367:44.2,4284893193:360},all:{155624089:30,943549884:55,1240592695:79,1345609583:52,2715839340:86,3555269338:20,3871231066:32,4043523819:33,4188031367:45,4284893193:360},mod:{155624089:0,943549884:0,1240592695:0,1345609583:0,2715839340:0,3555269338:0,3871231066:0,4043523819:0,4188031367:0,4284893193:0},masterwork:{155624089:0,943549884:0,1240592695:0,1345609583:0,2715839340:0,3555269338:0,3871231066:0,4043523819:0,4188031367:.8999999999999986,4284893193:0}};function Vt(){const t={4284893193:{statBarPlace:null,name:"Rounds Per Minute"},447667954:{statBarPlace:"ms",name:"Draw Time"},2961396640:{statBarPlace:"ms",name:"Charge Time"},2837207746:{statBarPlace:"stat_bar",name:"Swing Speed"},4043523819:{statBarPlace:"stat_bar",name:"Impact"},3614673599:{statBarPlace:"stat_bar",name:"Blast Radius"},1591432999:{statBarPlace:"stat_bar",name:"Accuracy"},2523465841:{statBarPlace:"stat_bar",name:"Velocity"},2762071195:{statBarPlace:"stat_bar",name:"Guard Efficiency"},209426660:{statBarPlace:"stat_bar",name:"Guard Resistance"},1240592695:{statBarPlace:"stat_bar",name:"Range"},155624089:{statBarPlace:"stat_bar",name:"Stability"},943549884:{statBarPlace:"stat_bar",name:"Handling"},4188031367:{statBarPlace:"stat_bar",name:"Reload Speed"},1345609583:{statBarPlace:"stat_bar",name:"Aim Assistance"},3555269338:{statBarPlace:"stat_bar",name:"Zoom"},2715839340:{statBarPlace:"stat_svg",name:"Recoil Direction"},3022301683:{statBarPlace:"stat_bar",name:"Charge Rate"},3736848092:{statBarPlace:"stat_bar",name:"Guard Endurance"},3871231066:{statBarPlace:null,name:"Magazine"},1931675084:{statBarPlace:null,name:"Inventory Size"},925767036:{statBarPlace:null,name:"Ammo Capacity"}},a=Ut("Auto Rifle"),o=[];return a==null||a.forEach((n,i)=>{const s=t[n];switch(o.push(e("div",{className:$.name,children:s.name},`${i}a`)),o.push(e("div",{className:$.value,children:P.all[n]},`${i}b`)),s.statBarPlace){case"stat_bar":const c=P.perks[n],r=P.mod[n],m=P.masterwork[n];o.push(p("div",{className:$.barr,children:[c?e("div",{style:{width:`${c}%`}}):null,r?e("div",{style:{width:`${r}%`}}):null,m?e("div",{style:{width:`${m}%`}}):null]},`${i}c`));break;case"stat_svg":o.push(e(Ft,{recoilStat:P.perks[n]},i+30));break;case"stat_letter":o.push(p("div",{children:[" ",s.statBarPlace]},`${i}g`))}}),p("div",{className:$.stats,children:[o,"add in game stats"]})}const Gt="_add_block_6ydba_1";var Ot={add_block:Gt};function Wt(){return _.exports.useContext(N).message=="AdBlock Error"?p("div",{className:Ot.add_block,children:[e("h1",{children:"Seems like AdBlock is being stupid and blocking description download."}),e("h2",{children:"Please disable AdBlock and try again."}),e("h3",{children:"If you use uBlock Origin ctrl + lmb is to disable only for current website."}),e("h3",{children:"Other AdBlockers should have similar option."})]}):null}const Kt=t=>t.replace(/\r/g,"").split(/(< table (?:formula )?>[^]*?<\$>)/g).flatMap(a=>{if(!a)return[];const o=a.startsWith(`
`)?a.slice(1):a;return o.endsWith(`
`)?o.slice(0,-1):o}),Zt=t=>t.map(a=>a.startsWith("< table ")?{tableLines:a.split(/\n/)}:{lines:a.split(/\n/)}),Jt=t=>{const a=i=>i.map(s=>{var y;const c=new RegExp(/(<center\/>)|(<bold\/>)|(<background\/>)/g),r=(y=s.match(c))==null?void 0:y.join(" ").replace(/<|\/>/g,""),m=s.replace(c,"");return{lineText:m===""?void 0:m,className:m==""?"spacer":r}}),o=i=>{const s=!!i[0].match(/formula/);return{table:i.flatMap(r=>r.match(/(< table (?:formula )?>|<\$>)/)?[]:a([r])),className:"table",formula:s}},n=[];return t.forEach(i=>{i.lines&&a(i.lines).forEach(s=>n.push(s)),i.tableLines&&n.push(o(i.tableLines))}),n},zt=t=>t.map(a=>{if(!a.table)return a;const o=a.table.map(n=>{var c;const i="(\\|)(?!.*\\|).*",s="\\|?.*?(?=\\|)";return h(l({},n),{lineText:(c=n.lineText)==null?void 0:c.match(new RegExp(`(${i})|(${s})`,"g"))})});return h(l({},a),{table:o})}),qt=t=>{const a=n=>{const i=[n.startsWith("|")?"(\\||\\|b)\\s*<(?:bold":"<(?:bold","highlight_[1-4]","pve|pvp","link|title|formula","stasis|arc|solar|void","primary|special|heavy","background|center)"].join("|"),s="/>";return n.split(new RegExp(`(${i}.*?${s})`,"g")).flatMap(r=>{var g,I,k;if(r.trim()==="")return[];if(!r.match(/^(<|\|)/))return{text:r};const m=r.includes("<formula"),y=r.includes("<title");let b=((g=r.match(new RegExp(i,"g")))==null?void 0:g.join(" ").replaceAll("<",""))||"",u=r.replace(new RegExp(`${i}|${s}`,"g"),"");r.startsWith("|")&&(b=`${b} ${r.startsWith("|b")?"bold":""}`.trim(),u=u.replace(/\|b|\|/g,"").trim());const d=r.match(/(https:.+? )|((?<=https:.+? ).*(?=\/>))/g);if(d)return{linkUrl:(I=d==null?void 0:d[0])==null?void 0:I.trim(),linkText:d==null?void 0:d[1].trim(),className:b};const f=r.match(/\[.*\]/g);if(f&&y)return{title:f[0].replace(/[[\]]/g,""),text:u.replace(/\[.*\]/g,"").trim(),className:b};if(m){const v=(k=u.match(/(ready|stow|range|reload)_\d+/g))==null?void 0:k[0];return{formulaText:u.replace(v||"","").trim(),formula:v==null?void 0:v.trim(),className:b}}return!u.trim()&&!b.trim()?[]:{text:u,className:b}})},o=n=>n.map(i=>{var c;const s=(c=i.lineText)==null?void 0:c.flatMap(r=>a(r));return h(l({},i),{lineText:s})});return t.map(n=>n.table?h(l({},n),{table:o(n.table)}):n.lineText?h(l({},n),{lineText:a(n.lineText)}):n)};function X(t){const a=Kt(t),o=Zt(a),n=Jt(o),i=zt(n);return qt(i)}function Ht({onMount:t}){const a=_.exports.useContext(S),o=_.exports.useContext(N),[n,i]=_.exports.useState(null),[s,c]=_.exports.useState(!1);return _.exports.useEffect(()=>{var m,y,b,u;if(!n){i(t()),c(!0);return}const r=d=>{const f={normal:{main:n.normal.main.getValue(),secondary:n.normal.secondary.getValue()},diff:{main:n.diff.main.getModifiedEditor().getValue(),secondary:n.diff.secondary.getModifiedEditor().getValue()}};a(g=>h(l({},g),{dataFromEditor:{converted:{mainEditor:X(f.normal.main),secondaryEditor:X(f.normal.secondary)},original:{mainEditor:f.normal.main,secondaryEditor:f.normal.secondary}}})),d==="normal"&&(f.normal.main!=f.diff.main&&n.diff.main.getModifiedEditor().setValue(f.normal.main),f.normal.secondary!=f.diff.secondary&&n.diff.secondary.getModifiedEditor().setValue(f.normal.secondary)),d==="diff"&&(f.normal.main!=f.diff.main&&n.normal.main.setValue(f.diff.main),f.normal.secondary!=f.diff.secondary&&n.normal.secondary.setValue(f.diff.secondary))};(m=n.normal.main.getModel())==null||m.onDidChangeContent(()=>r("normal")),(y=n.normal.secondary.getModel())==null||y.onDidChangeContent(()=>r("normal")),(b=n.diff.main.getModifiedEditor().getModel())==null||b.onDidChangeContent(()=>r("diff")),(u=n.diff.secondary.getModifiedEditor().getModel())==null||u.onDidChangeContent(()=>r("diff"))},[s]),_.exports.useEffect(()=>{var u,d,f;if(!n)return;const r=o.ItemData.id,m=(u=o.dataFromGithub)==null?void 0:u[r],y=((d=m==null?void 0:m.editor)==null?void 0:d.mainEditor)||"",b=((f=m==null?void 0:m.editor)==null?void 0:f.secondaryEditor)||"";n.normal.main.setValue(y),n.diff.main.getModifiedEditor().setValue(y),n.diff.main.getOriginalEditor().setValue(y),n.normal.secondary.setValue(b),n.diff.secondary.getModifiedEditor().setValue(b),n.diff.secondary.getOriginalEditor().setValue(b)},[o.ItemData.id]),p("div",{className:"editor-container",children:[e("div",{id:"editor-1"}),e("div",{id:"editor-2"}),e("div",{id:"diffEditor-1",className:"hidden"}),e("div",{id:"diffEditor-2",className:"hidden"})]})}function Qt(){var c;x.register({id:"clarityLangue"}),x.setMonarchTokensProvider("clarityLangue",{tokenizer:{root:[[/< table >/,"table","@table"],[/<(stasis|arc|solar|void|primary|special|heavy|background|center)/,"selfContained","@selfContained"],[/<(highlight_[1-4]|pve|pvp|bold)/,"highlight","@highlight"],[/<(formula|link)/,"extra","@extra"],[/<title /,"title","@title"]],table:[[/<\$>/,"tableEnd","@pop"],[/\|b|\|/,"tableSeparator"],[/<(stasis|arc|void|solar|background|center)/,"selfContained","@selfContained"],[/<(highlight_[1-4]|bold|primary|special|heavy|pve|pvp)/,"highlight","@highlight"],[/<(formula|link)/,"extra","@extra"]],selfContained:[[/\/>/,"selfContained","@pop"],[/./,"selfContained.text"]],highlight:[[/\/>/,"highlight","@pop"],[/./,"highlight.text"]],extra:[[/\/>/,"extra","@pop"],[/(ready|stow|range|reload)_\d+/,"extra.content"],[/https:.+? /,"extra.content"],[/./,"extra.text"]],title:[[/\/>/,"title","@pop"],[/\[.*\]/,"title.text"]]}}),D.defineTheme("myCoolTheme",{base:"vs",inherit:!1,rules:[{token:"table",foreground:"4fc1ff"},{token:"tableSeparator",foreground:"4fc1ff"},{token:"tableEnd",foreground:"4fc1ff"},{token:"selfContained",foreground:"9cdcfe"},{token:"selfContained.text",foreground:"d16969"},{token:"highlight",foreground:"4fc1ff"},{token:"highlight.text",foreground:"ffffff"},{token:"extra",foreground:"4ec9b0"},{token:"extra.text",foreground:"ffffff"},{token:"extra.content",foreground:"4fc1ff"},{token:"bold.selfContained",foreground:"9cdcfe"},{token:"bold",foreground:"4fc1ff"},{token:"bold.text",foreground:"ffffff"},{token:"title",foreground:"4ec9b0"},{token:"title.text",foreground:"4fc1ff"}],colors:{"editor.foreground":"#ffffff","editor.background":"#1e1e1e","editorLineNumber.foreground":"#858585","editorLineNumber.activeForeground":"#c6c6c6","editorCursor.foreground":"#ffffff","editor.lineHighlightBorder":"#fff0","editor.selectionBackground":"#004972b8","editorSuggestWidget.background":"#252526","editorSuggestWidget.border":"#454545","list.hoverBackground":"#2a2d2e","diffEditor.removedTextBackground":"#ff000070","diffEditor.insertedTextBackground":"#a0bf5652"}}),x.registerCompletionItemProvider("clarityLangue",{provideCompletionItems:()=>{const r={kind:x.CompletionItemKind.Snippet,insertTextRules:x.CompletionItemInsertTextRule.InsertAsSnippet};return{suggestions:[l({label:"table",insertText:["< table > ","$0","<$>"].join(`
`)},r),{label:"background",kind:x.CompletionItemKind.Text,insertText:"<background/>"},{label:"center",kind:x.CompletionItemKind.Text,insertText:"<center/>"},{label:"bold line",kind:x.CompletionItemKind.Text,insertText:"<bold/>"},{label:"stasis",kind:x.CompletionItemKind.Text,insertText:"<stasis/>"},{label:"arc",kind:x.CompletionItemKind.Text,insertText:"<arc/>"},{label:"void",kind:x.CompletionItemKind.Text,insertText:"<void/>"},{label:"solar",kind:x.CompletionItemKind.Text,insertText:"<solar/>"},{label:"primary",kind:x.CompletionItemKind.Text,insertText:"<primary/>"},{label:"special",kind:x.CompletionItemKind.Text,insertText:"<special/>"},{label:"heavy",kind:x.CompletionItemKind.Text,insertText:"<heavy/>"},l({label:"highlight",insertText:"<highlight_${1:1} ${2: } />"},r),l({label:"bold text",insertText:"<bold ${1: } />"},r),l({label:"pve",insertText:"<pve ${1: } />"},r),l({label:"pvp",insertText:"<pvp ${1: } />"},r),l({label:"link",insertText:"<link ${1: } ${2: }>"},r),l({label:"combatant",insertText:"<link https://d2clarity.page.link/combatant ${1:Combatant}/>"},r),l({label:"formula_ready",insertText:"<formula ${2:Ready Speed:} ready_${1:0} />"},r),l({label:"formula_stow",insertText:"<formula ${2:Stow Speed:} stow_${1:0} />"},r),l({label:"formula_range",insertText:"<formula ${2:In_Game Range:} range_${1:0} />"},r),l({label:"formula_reload",insertText:"<formula ${2:Reload Time:} reload_${1:0} />"},r),l({label:"formula_ready_empty",insertText:"<formula ready_${1:0} />"},r),l({label:"formula_stow_empty",insertText:"<formula stow_${1:0} />"},r),l({label:"formula_range_empty",insertText:"<formula range_${1:0} />"},r),l({label:"formula_reload_empty",insertText:"<formula reload_${1:0} />"},r),l({label:"title",insertText:"<title ${1: } [${1: }] />"},r)]}}});const t={theme:"myCoolTheme",language:"clarityLangue",minimap:{enabled:!1},automaticLayout:!0,wordWrap:"on",mouseWheelZoom:!0},a=h(l({},t),{lineNumbersMinChars:2,lineDecorationsWidth:0}),o=h(l({},t),{lineNumbersMinChars:3,lineDecorationsWidth:15,renderOverviewRuler:!1,renderIndicators:!1}),n={normal:{main:document.querySelector("#editor-1"),secondary:document.querySelector("#editor-2")},diff:{main:document.querySelector("#diffEditor-1"),secondary:document.querySelector("#diffEditor-2")}},i={main:{original:D.createModel("","clarityLangue"),modified:D.createModel("","clarityLangue")},secondary:{original:D.createModel("","clarityLangue"),modified:D.createModel("","clarityLangue")}},s={normal:{main:D.create(n.normal.main,a),secondary:D.create(n.normal.secondary,a)},diff:{main:D.createDiffEditor(n.diff.main,o),secondary:D.createDiffEditor(n.diff.secondary,o)}};return s.diff.main.setModel({modified:i.main.modified,original:i.main.original}),s.diff.secondary.setModel({modified:i.secondary.modified,original:i.secondary.original}),(c=document.querySelector("#toggleEditor"))==null||c.addEventListener("click",()=>{const r=n.normal,m=n.diff;r.main.classList.toggle("hidden"),r.secondary.classList.toggle("hidden"),m.main.classList.toggle("hidden"),m.secondary.classList.toggle("hidden")}),l({},s)}const Xt={ammo:{img:"https://bungie.net/common/destiny2_content/icons/b6d3805ca8400272b7ee7935b0b75c79.png",type:"special"},breaker:{img:"https://www.bungie.net/common/destiny2_content/icons/DestinyBreakerTypeDefinition_825a438c85404efd6472ff9e97fc7251.png",type:"special"},element:{img:"https://www.bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_530c4c3e7981dc2aefd24fd3293482bf.png",type:"special"},power:69420,name:"FADING SHADOW'S BURDEN"};function Yt(){return p(w,{children:[p("div",{className:"item_popup",children:[e(bt,l({},Xt)),e(rt,{}),e(Vt,{}),e(Bt,{}),e(Dt,{})]}),e(Ht,{onMount:Qt}),p("div",{className:"side_bar",children:[p("div",{className:"id_button",children:[e(ke,{}),e(A,{labelText:"Get data from bungie",fnName:"addBungieData"})]}),e(he,{}),e(ue,{}),e(A,{labelText:"Change Editor"}),e(A,{labelText:"Get updated data",fnName:"download"}),e(Ae,{}),e(A,{labelText:"Add / Update - Database",fnName:"uploadClovis"}),e(A,{labelText:"Add / Update - Live database",fnName:"uploadIce"}),e(Ce,{}),e(Be,{})]}),e(Wt,{})]})}ie.render(e(j.StrictMode,{children:e(le,{children:e(Yt,{})})}),document.getElementById("app"));
