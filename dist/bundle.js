!function(e){var t={};function i(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=t,i.d=function(e,t,o){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(o,n,function(t){return e[t]}.bind(null,n));return o},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";function o(){let e=document.getElementById("f-hamburger-icon-click"),t=(document.getElementById("hamburger-icon-click"),document.getElementById("sidebar"));t.classList.contains("slide-out")?(console.log("inside if"),t.classList.remove("slide-out"),t.classList.add("slide-in"),e.classList.remove("slide-in"),e.classList.add("slide-out")):(t.classList.remove("slide-in"),t.classList.add("slide-out"),e.classList.remove("slide-out"),e.classList.add("slide-in"))}function n(e){let t=e.childNodes[1].childNodes[1].innerHTML,i=e.childNodes[3].childNodes[1];e.classList.add("to-do-edit"),i.value=t,i.focus()}function r({text:e,priority:t,checked:i=!1}){let o=document.createElement("template"),n=`\n    <li class="to-do-item ${i?"checked":""}">\n      <p>${e}</p>\n      <span class="${t} enter-edit-mode"/>\n    </li>\n  `.trim();return o.innerHTML=n,o.content.firstChild}function l(e=""){let t=document.createElement("template");return t.innerHTML=`\n    <li class="to-do-item-edit" id='to-do-item-edit'>\n      <input class="text edit-project" id='to-do-item-edit-input' value="${e}" placeholder="To do Item name"/>\n      <span class="low-priority to-do-priority-selector"></span>\n      <span class="medium-priority to-do-priority-selector"></span>\n      <span class="high-priority to-do-priority-selector"></span>\n      <span class="uh-priority to-do-priority-selector"></span>\n       <svg class='icon'>\n        <use class='delete-icon' xlink:href='#delete-icon' />\n      </svg>\n    </li>\n  `.trim(),t.content.firstChild}function c({title:e,priority:t="low-priority",index:i=-1}){let o,n=localStorage.getItem("projects");null==n?o=[{title:e,priority:t,toDo:[]}]:-1==i?o=[JSON.parse(n),{title:e,priority:t,toDo:[]}].flat():(o=JSON.parse(n),o[i].title=e,o[i].priority=t),localStorage.clear(),localStorage.setItem("projects",JSON.stringify(o))}function s(){let e=Array.from(document.getElementById("projects-container").children),t=["low-priority","medium-priority","high-priority","uh-priority"];e.sort((e,i)=>{let o=t.findIndex(t=>t===e.firstElementChild.classList[2]),n=t.findIndex(e=>e===i.firstElementChild.classList[2]);return n<e.Index?1:n<o?-1:0}),e.forEach(e=>{e.parentNode.appendChild(e)})}function d(e){let t=document.getElementById("card-container"),i=document.getElementById("to-do-container"),o=function(e){let t=document.createElement("ul");return t.classList.add("to-do-container"),t.setAttribute("id","to-do-container"),e.map(e=>{let i,o,n;({text:i,priority:o,checked:n}=e),t.appendChild(r({text:i,priority:o,checked:n}))}),t}(e);null!==i&&i.remove(),t.appendChild(o),y()}function a({title:e,priority:t="low-priority",toDo:i=[]},o=!0){let r=document.getElementById("projects-container"),l=function({title:e="To-do",priority:t="low-priority"}){let i=document.createElement("template"),o=`\n    <li class='to-do-project'>\n      <div class='project-container text-container ${t}'>\n        <h4 class='text'>${e}</h4>\n      </div>\n      <div class='edit-container'>\n        <input class='text edit-project'/>\n        <span class='low-priority priority-selector'></span>\n        <span class='medium-priority priority-selector'></span>\n        <span class='high-priority priority-selector'></span>\n        <span class='uh-priority priority-selector'></span>\n      </div>\n      <svg class='icon'>\n        <use class='edit-icon' xlink:href='#edit-icon' />\n        <use class='delete-icon delete-project-icon' xlink:href='#delete-icon' />\n      </svg>\n    </li>\n  `.trim();return i.innerHTML=o,i.content.firstChild}({title:e,priority:t,toDo:i});r.appendChild(l),o&&(m(),h(),c({title:"To-do"}),u(l),n(l))}function m(){Array.from(document.getElementsByClassName("to-do-project")).forEach(e=>{e.onclick=t=>{let i=t.target.classList;if(i.contains("delete-icon")){let e=document.getElementsByClassName("to-do-edit")[0];e&&(!function(e){let t=JSON.parse(localStorage.getItem("projects"));t.splice(e,1),localStorage.clear(),localStorage.setItem("projects",JSON.stringify(t))}(L()),e.remove())}else i.contains("edit-icon")?n(e):u(e)}})}function u(e){var t;t=e,Array.from(document.getElementsByClassName("to-do-project")).map(e=>{e.classList.remove("selected"),e.classList.remove("to-do-edit")}),t.classList.add("selected");let i=(o=L(),JSON.parse(localStorage.getItem("projects"))[o]);var o;let n=document.getElementById("project-title");n.classList.remove("title-uh-priority","title-high-priority","title-medium-priority","title-low-priority"),n.classList.add("title-"+i.priority),n.textContent=i.title,d(i.toDo),p()}function p(){let e=Array.from(document.getElementById("to-do-container").children),t=["uh-priority","high-priority","medium-priority","low-priority"];e.sort((e,i)=>{if(e.classList.contains("checked")&&!i.classList.contains("checked"))return 1;if(e.classList.contains("checked")&&i.classList.contains("checked"))return 0;if(!e.classList.contains("checked")&&i.classList.contains("checked"))return-1;let o=t.findIndex(t=>t===e.lastElementChild.classList[0]),n=t.findIndex(e=>e===i.lastElementChild.classList[0]);return o<n?-1:o>n?1:0}),e.forEach(e=>e.parentNode.appendChild(e))}function f(){let e=l(),t=document.getElementById("to-do-container");null==document.getElementById("to-do-item-edit")&&t.insertBefore(e,t.firstChild);let i=document.getElementById("to-do-item-edit-input"),o=Array.from(document.getElementsByClassName("to-do-priority-selector"));i.focus(),o.forEach(e=>{e.onclick=()=>{g(e)}}),y()}function y(){Array.from(document.getElementsByClassName("to-do-item")).forEach(e=>{e.onclick=t=>{var i;t.target.classList.contains("enter-edit-mode")?function(e){let t=l(e.firstElementChild.textContent),i=document.getElementById("to-do-container"),o=document.getElementById("to-do-item-edit"),n=t.lastElementChild;e.remove(),o&&o.remove();i.insertBefore(t,i.firstChild);let r=document.getElementById("to-do-item-edit-input"),c=Array.from(document.getElementsByClassName("to-do-priority-selector"));r.focus(),c.forEach(e=>{e.onclick=()=>{g(e)}}),n.onclick=()=>{t.remove()}}(e):((i=e).classList.contains("checked")?i.classList.remove("checked"):i.classList.add("checked"),p(),E())}})}function h(){Array.from(document.getElementsByClassName("priority-selector")).forEach(e=>{e.onclick=()=>{!function(e){let t=e.classList[0],i=e.parentElement.firstElementChild.value,o=e.parentNode.parentNode.firstElementChild;o.classList.remove("uh-priority","high-priority","medium-priority","low-priority"),o.classList.add(t),o.parentElement.firstElementChild.firstElementChild.innerHTML=i,s(),c({title:i,priority:t,index:L()})}(e)}})}function g(e){let t=e.classList[0],i=e.parentElement.firstElementChild.value,o=r({text:i,priority:t}),n=document.getElementById("to-do-container"),l=document.getElementById("to-do-item-edit");0!==i.length&&i.trim()&&(l.remove(),n.insertBefore(o,n.firstChild),y(),p(),E())}function E(){let e=document.getElementById("to-do-container"),t=Array.from(e.children).filter(e=>!e.classList.contains("to-do-item-edit")).map(e=>({priority:e.lastElementChild.classList[0],checked:e.classList.contains("checked"),text:e.firstElementChild.textContent}));!function({index:e,toDoList:t}){if(-1==e)return;let i,o=localStorage.getItem("projects");i=JSON.parse(o),i[e].toDo=t,localStorage.clear(),localStorage.setItem("projects",JSON.stringify(i))}({index:L(),toDoList:t})}function L(){let e=document.getElementById("projects-container"),t=document.getElementsByClassName("selected")[0],i=Array.from(e.childNodes).filter(e=>e.nodeType!=Node.TEXT_NODE);return Array.prototype.indexOf.call(i,t)}i.r(t),function(){let e=document.getElementById("f-hamburger-icon-click"),t=document.getElementById("hamburger-icon-click");document.getElementById("sidebar"),t.onclick=o,e.onclick=o}(),function(){let e=document.getElementById("add-project-icon"),t=document.getElementById("add-to-do-icon");e.onclick=a,t.onclick=f}(),function(){let e=function(){let e=JSON.parse(localStorage.getItem("projects"));return null==e?[]:e}();e.forEach(e=>{a(e,!1)}),e.length>0&&u(document.getElementById("projects-container").firstElementChild)}(),s(),m(),y(),h()}]);