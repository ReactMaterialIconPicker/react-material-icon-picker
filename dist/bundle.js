/*! For license information please see bundle.js.LICENSE.txt */
(()=>{"use strict";var e={719:(e,t,r)=>{var o=r(258),i=Symbol.for("react.element"),n=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),a=o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function s(e,t,r){var o,s={},d=null,p=null;for(o in void 0!==r&&(d=""+r),void 0!==t.key&&(d=""+t.key),void 0!==t.ref&&(p=t.ref),t)n.call(t,o)&&!l.hasOwnProperty(o)&&(s[o]=t[o]);if(e&&e.defaultProps)for(o in t=e.defaultProps)void 0===s[o]&&(s[o]=t[o]);return{$$typeof:i,type:e,key:d,ref:p,props:s,_owner:a.current}}t.jsx=s,t.jsxs=s},873:(e,t,r)=>{e.exports=r(719)},258:e=>{e.exports=require("react")}},t={};function r(o){var i=t[o];if(void 0!==i)return i.exports;var n=t[o]={exports:{}};return e[o](n,n.exports,r),n.exports}r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};(()=>{r.r(o),r.d(o,{MaterialIconsPicker:()=>m});var e=r(873),t=r(258);const i={width:"100%",minWidth:"230px",height:"100%",boxShadow:"rgba(0, 0, 0, 0.25) 1px 1px 7px 2px"},n={width:"100%",height:"40px",borderBottom:"1px solid rgb(229, 229, 229)",boxSizing:"border-box",padding:"11px 10px",display:"flex",alignItems:"center"},a={height:"100%",aspectRatio:"1 / 1",cursor:"pointer",marginRight:"10px"},l={flexGrow:"1",outline:"none",border:"0px",fontSize:"12px",fontFamily:"Arial, serif"},s={width:"100%",height:"40px",borderBottom:"1px solid rgb(229, 229, 229)",boxSizing:"border-box",display:"flex",alignItems:"center"},d={height:"100%",width:"0px",flexGrow:"1",borderRight:"1px solid #E5E5E5",position:"relative",display:"flex",alignItems:"center",boxSizing:"border-box",padding:"11px 13px",cursor:"pointer"},p={fontFamily:"Arial, serif",fontSize:"12px"},c={height:"50%",cursor:"pointer",marginLeft:"auto"},u={position:"absolute",zIndex:"10",top:"100%",left:"0px",border:"1px solid black",width:"100%",height:"fit-content",backgroundColor:"rgb(34, 34, 34)",boxShadow:"rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",boxSizing:"border-box"},y={width:"100%",height:"20px",margin:"5px 13px",fontFamily:"Arial, serif",fontSize:"12px",cursor:"pointer",color:"rgb(253, 253, 253)",boxSizing:"border-box"},h={height:"100%",width:"0px",flexGrow:"1",boxSizing:"border-box",padding:"11px 13px",position:"relative",display:"flex",alignItems:"center",cursor:"pointer"},x=e=>"function"==typeof e,g=(0,t.memo)((r=>{const{styles:o,setIconSearch:i,defaultSearchValue:s,searchValue:d,onSearchValueChange:p,searchBoxPlaceholder:c}=r||{},{searchContainer:u,searchIcon:y,searchInput:h}=o||{},g=(0,t.useRef)(null);return(0,e.jsxs)("div",{style:u?u(n):n,"data-testid":"ip-searchContainer",children:[(0,e.jsx)("img",{src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAiIGhlaWdodD0iNzAiIHZpZXdCb3g9IjAgMCA3MCA3MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUwIDQ0SDQ2Ljg0TDQ1LjcyIDQyLjkyQzQ5LjY0IDM4LjM2IDUyIDMyLjQ0IDUyIDI2QzUyIDExLjY0IDQwLjM2IDAgMjYgMEMxMS42NCAwIDAgMTEuNjQgMCAyNkMwIDQwLjM2IDExLjY0IDUyIDI2IDUyQzMyLjQ0IDUyIDM4LjM2IDQ5LjY0IDQyLjkyIDQ1LjcyTDQ0IDQ2Ljg0VjUwTDY0IDY5Ljk2TDY5Ljk2IDY0TDUwIDQ0Wk0yNiA0NEMxNi4wNCA0NCA4IDM1Ljk2IDggMjZDOCAxNi4wNCAxNi4wNCA4IDI2IDhDMzUuOTYgOCA0NCAxNi4wNCA0NCAyNkM0NCAzNS45NiAzNS45NiA0NCAyNiA0NFoiIGZpbGw9IiMzMzMzMzMiLz4KPC9zdmc+",style:y?y(a):a,onClick:()=>{var e;return i((null===(e=g.current)||void 0===e?void 0:e.value)||"")},"data-testid":"ip-searchIcon"}),(0,e.jsx)("input",{style:h?h(l):l,value:d,defaultValue:s,onChange:e=>x(p)&&p(e.target.value),placeholder:c||"Search",ref:g,onKeyDown:e=>{var t;return"Enter"===e.key&&i((null===(t=g.current)||void 0===t?void 0:t.value)||"")},"data-testid":"ip-searchInput"})]})})),f=[{label:"Filled",value:"filled"},{label:"Outlined",value:"outlined"},{label:"Rounded",value:"round"},{label:"Sharp",value:"sharp"},{label:"Two Tone",value:"two-tone"}],I=(0,t.memo)((0,t.forwardRef)((r=>{const{styles:o,type:i,selectedType:n,setSelectedType:a,onTypeChange:l}=r||{},{typeContainer:s,typeSelected:h,typeArrow:g,typeOptionsContainer:I,typeOption:b}=o||{},m=i||n,[D,j]=(0,t.useState)(!1),M=(0,t.useRef)(null),C=(0,t.useRef)(null);return((e,r,o)=>{const i=e=>{let t=!0;for(const r of o)if(r.current&&r.current.contains(e.target))return void(t=!1);t&&j(!1)};(0,t.useEffect)((()=>(document.addEventListener(e,i),()=>document.removeEventListener(e,i))),[])})("mousedown",0,[M,C]),(0,e.jsxs)("div",{style:s?s(d):d,onClick:()=>j(!D),ref:M,"data-testid":"ip-typeContainer",children:[(0,e.jsx)("span",{style:h?h(p):p,"data-testid":"ip-typeLabel",children:m.label}),(0,e.jsx)("img",{src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCA0OCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuNjQgMC4zNTk5ODVMMjQgMTguNjhMNDIuMzYgMC4zNTk5ODVMNDggNS45OTk5OEwyNCAzMEwwIDUuOTk5OThMNS42NCAwLjM1OTk4NVoiIGZpbGw9IiM2NjY2NjYiLz4KPC9zdmc+",style:g?g(c):c,"data-testid":"ip-typeArrow"}),D&&(0,e.jsx)("div",{style:I?I(u):u,ref:C,"data-testid":"ip-typeOptions",children:f.map((t=>(0,e.jsx)("div",{style:b?b(y):y,onClick:()=>{x(l)&&l(t),a(t)},"data-testid":"ip-typeOption",children:t.label})))})]})}))),b=(0,t.memo)((t=>{const{styles:r}=t||{},{colorSelectorContainer:o}=r||{};return(0,e.jsx)("div",{style:o?o(h):h})})),m=(0,t.memo)((r=>{const{styles:o,defaultSearchValue:n,searchValue:a,onSearchValueChange:l,searchBoxPlaceholder:d,type:p,onTypeChange:c}=r||{},{container:u,optionContainer:y}=o||{},[h,x]=(0,t.useState)(""),[m,D]=(0,t.useState)(f[0]);return(0,t.useEffect)((()=>{const e=document.querySelector("head");if(e&&!e.querySelector('link[href="https://fonts.googleapis.com/icon?family=Material+Icons"]')){const t=document.createElement("link");t.setAttribute("href","https://fonts.googleapis.com/icon?family=Material+Icons"),t.setAttribute("rel","stylesheet"),e.appendChild(t)}}),[]),(0,e.jsxs)("div",{style:u?u(i):i,children:[(0,e.jsx)(g,{styles:o,setIconSearch:x,defaultSearchValue:n,searchValue:a,onSearchValueChange:l,searchBoxPlaceholder:d}),(0,e.jsxs)("div",{"data-testid":"mip-optionContainer",style:y?y(s):s,children:[(0,e.jsx)(I,{type:p,styles:o,selectedType:m,setSelectedType:D,onTypeChange:c}),(0,e.jsx)(b,{styles:o})]})]})}))})(),module.exports=o})();