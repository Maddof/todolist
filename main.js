(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};function e(t){const e=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===e?new t.constructor(+t):"number"==typeof t||"[object Number]"===e||"string"==typeof t||"[object String]"===e?new Date(t):new Date(NaN)}function n(t){const n=e(t);return n.setHours(0,0,0,0),n}function r(t){return e=t,r=Date.now(),+n(e)==+n(r);var e,r}function o(t,n){const r=e(t);return isNaN(n)?function(t,e){return t instanceof Date?new t.constructor(e):new Date(e)}(t,NaN):n?(r.setDate(r.getDate()+n),r):r}function s(t,n){const r=+e(t),[o,s]=[+e(n.start),+e(n.end)].sort(((t,e)=>t-e));return r>=o&&r<=s}t.d({},{y:()=>X,F:()=>W});const c=document.getElementById("all-tasks-amount"),a=document.getElementById("today-tasks-amount"),i=document.getElementById("next7days-tasks-amount"),l=document.getElementById("important-tasks-amount");function d(){c.textContent=`(${function(){let t=0;for(let e=0;e<W.tasksArr.length;e++)t++;return t}()})`,i.textContent=`(${function(){const t=new Date,e=o(t,7);let n=0;return W.tasksArr.forEach(((r,o)=>{s(r.date,{start:t,end:e})&&n++})),n}()})`,l.textContent=`(${function(){let t=0;return W.tasksArr.forEach(((e,n)=>{"Important"===e.priority&&t++})),t}()})`,a.textContent=`(${function(){let t=0;return W.tasksArr.forEach(((e,n)=>{r(e.date)&&t++})),t}()})`}const u="tasks",m=function(){localStorage.setItem(u,JSON.stringify(W.tasksArr))};function p(t){return t.target.attributes.index.value}const f="projects",g=function(){localStorage.setItem(f,JSON.stringify(X.projectsArr))},y=document.querySelector(".tasks"),v=document.querySelector(".addtask-form"),k=document.querySelector(".addproject-form"),b=document.querySelector(".projects"),A=document.getElementById("project-selection"),j=document.querySelector(".tasks-filter"),E=document.getElementById("date");let h=document.querySelector(".currentview-title");function x(t){const e=new Date,n=o(e,7);y.innerHTML="",H(t),W.tasksArr.forEach(((t,r)=>{if(s(t.date,{start:e,end:n})){const e=G(t,r);y.insertAdjacentHTML("beforeend",e)}}))}function L(t){y.innerHTML="",H(t),W.tasksArr.forEach(((t,e)=>{if(r(t.date)){const n=G(t,e);y.insertAdjacentHTML("beforeend",n)}}))}y.addEventListener("click",(function(t){if(t.target.classList.contains("priority")){const e=p(t);"Not important"===W.tasksArr[e].priority?W.tasksArr[e].priority="Important":W.tasksArr[e].priority="Not important",Y(),m()}})),y.addEventListener("click",(function(t){if(t.target.classList.contains("delete")){const e=p(t);W.tasksArr.splice(e,1),S(),d(),Y()}m()})),v.addEventListener("submit",(function(t){0===A.length?(t.preventDefault(),alert("Please specify or create a project first")):(function(t){t.preventDefault();let e=new FormData(v),n=Object.fromEntries(e);W.tasksArr.push(n),m()}(t),v.reset(),K(),Y(),d(),S())})),k.addEventListener("submit",(function(t){(function(t){t.preventDefault();let e=new FormData(k),n=Object.fromEntries(e);X.projectsArr.push(n),g()})(t),k.reset(),S(),D()})),j.addEventListener("click",(function(t){const e=t.target.childNodes[0].textContent.trim();switch(console.log(e),e){case"All Tasks":w();break;case"Next 7 days":x(e);break;case"Important":I(e);break;case"Today":L(e)}}));const D=function(){A.innerHTML="",X.projectsArr.forEach((t=>{const e=`\n      <option value="${t.name}">${t.name}</option>\n    `;A.insertAdjacentHTML("beforeend",e)}))},I=function(t){y.innerHTML="",H(t),W.tasksArr.forEach(((e,n)=>{if(e.priority===t){const t=G(e,n);y.insertAdjacentHTML("beforeend",t)}}))},C=function(t){y.innerHTML="",function(t){const e=A.children,n=t;[...e].forEach((t=>{t.value===n?t.setAttribute("selected",""):t.removeAttribute("selected","")}))}(t),W.tasksArr.forEach(((e,n)=>{if(e.project===t){const t=G(e,n);y.insertAdjacentHTML("beforeend",t)}}))};b.addEventListener("click",(t=>{t.target.classList.contains("project-btn")&&(C(t.target.value),H(t.target.value))}));const H=function(t){h.textContent=t||"My tasks"},w=function(){y.innerHTML="",H(),W.tasksArr.forEach(((t,e)=>{const n=G(t,e);y.insertAdjacentHTML("beforeend",n)}))},S=function(){b.innerHTML="",X.projectsArr.forEach(((t,e)=>{const n=`\n      <li class="project-item">\n        <button class="project-btn" index="${e}" value="${t.name}">\n        ${t.name} \n        <span class="project-task-count-info">\n        (${function(t){let e=0;for(let n=0;n<W.tasksArr.length;n++)W.tasksArr[n].project===t&&e++;return e}(t.name)})\n        </span></button>\n        <button class="project-edit-btn" index="${e}" value="${t.name}">\n        Edit\n        </button>\n        </li>\n    `;b.insertAdjacentHTML("beforeend",n)}))},$=document.querySelector(".addproject-btn"),M=document.querySelector(".addproject-wrapper");$.addEventListener("click",(()=>{$.classList.toggle("active"),$.classList.contains("active")?M.style.maxHeight=M.scrollHeight+"px":M.style.maxHeight=0}));const T=document.getElementById("add-task-btn"),N=document.querySelector(".task-form-wrapper");T.addEventListener("click",(()=>{T.classList.toggle("active"),T.classList.contains("active")?N.style.maxHeight=N.scrollHeight+"px":N.style.maxHeight=0}));const B=document.getElementById("rename-project-btn"),q=document.getElementById("rename-form");B.addEventListener("click",(()=>{B.classList.toggle("active"),B.classList.contains("active")?q.style.maxHeight=q.scrollHeight+"px":q.style.maxHeight=0}));const O=document.getElementById("close-modal-btn"),J=document.getElementById("project-dialog"),z=document.getElementById("dialog-title"),P=document.getElementById("delete-project-btn"),F=document.getElementById("rename"),R=document.getElementById("rename-submit"),V=document.getElementById("dialog-messages");function Y(){const t=h.textContent;"Important"!==t?"Today"!==t?"Next 7 days"!==t?"My tasks"!=t?C(t):(S(),w()):x(t):L(t):I(t)}function G(t,e){return`\n  <li class ="task-item" index="${e}">\n  <h3 class="task-title">${t.title}</h3>\n  <div class="task-date-project-wrapper"><div>${t.date}</div> / <div>${t.project}</div></div>\n  <p class="task-description">${t.description}</p>\n  <button class="priority" index="${e}" value="${t.priority}">\n  <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 -0.5 21 21" class="important-icon"><path d="M11.55 5.007v7c0 .552-.47 1-1.05 1s-1.05-.448-1.05-1v-7c0-.552.47-1 1.05-1s1.05.448 1.05 1h0zm0 10c0 .552-.47 1-1.05 1s-1.05-.448-1.05-1 .47-1 1.05-1 1.05.448 1.05 1h0zM18.9 17c0 .552-.47 1-1.05 1H3.15c-.58 0-1.05-.448-1.05-1V3c0-.552.47-1 1.05-1h14.7c.58 0 1.05.448 1.05 1v14zm0-17H2.1C.94 0 0 .899 0 2.003v.004 16C0 19.112.94 20 2.1 20h16.8c1.16 0 2.1-.892 2.1-1.997V2.007C21 .902 19.95 0 18.9 0h0z" fill-rule="evenodd"/></svg>\n  <span class="tooltiptext">Important status</span>  \n  </button>\n  <button class="delete" index="${e}">Done</button>\n</li>\n`}function K(){E.valueAsDate=new Date}R.addEventListener("click",(function(){const t=F.value,e=z.textContent,n=X.projectsArr.findIndex((t=>t.name===z.textContent));F.value.length<3&&(V.textContent="Please specify a longer name"),void 0===X.projectsArr[n]?V.textContent="SHIIET ALREADY DELETED":(function(t,e){X.projectsArr[t].name=e,g()}(n,t),function(t,e){W.tasksArr.forEach((n=>{n.project===t&&(n.project=e)})),m()}(e,t),V.textContent=`Renamed to: ${t}`,z.textContent=t,F.value="",S(),D())})),b.addEventListener("click",(function(t){V.textContent="",t.target.classList.contains("project-edit-btn")&&(function(t){z.textContent=t.target.value,P.textContent="Delete",P.setAttribute("value",z.textContent)}(t),J.showModal())})),P.addEventListener("click",(function(){const t=X.projectsArr.findIndex((t=>t.name===z.textContent));var e;-1===t?P.textContent="Already deleted":(e=t,X.projectsArr.splice(e,1),g(),P.textContent="Deleted",S(),D(),function(){if(W.tasksArr.filter((t=>t.project===z.textContent)).length>0){const t=document.createElement("button");t.textContent="Delete all tasks in this project?",V.appendChild(t),t.addEventListener("click",(()=>{var e;e=z.textContent,W.tasksArr=W.tasksArr.filter((t=>t.project!==e)),m(),d(),w(),t.remove()}))}}())})),O.addEventListener("click",(()=>{J.close()}));const Q=document.querySelector(".left-panel"),U=document.querySelector(".mobile-nav-btn");U.addEventListener("click",(function(){const t=Q.getAttribute("mobile-visible");console.log(t),"false"===t?(Q.setAttribute("mobile-visible","true"),U.setAttribute("aria-expanded","true")):"true"===t&&(Q.setAttribute("mobile-visible","false"),U.setAttribute("aria-expanded","false"))}));const W={tasksArr:[{title:"A test task",description:"You can delete these tasks anytime you like",priority:"Important",project:"Default",date:"2024-02-09"},{title:"Doctor appointment",description:"Take 09.00AM bus",priority:"Not important",project:"Default",date:"2024-02-08"},{title:"Random title",description:"Just do it.",priority:"Not important",project:"Default",date:"2024-02-10"}]};let X={projectsArr:[{name:"Default"}]};!function(){const t=localStorage.getItem(f);t&&(X.projectsArr=JSON.parse(t))}(),function(){const t=localStorage.getItem(u);t&&(W.tasksArr=JSON.parse(t))}(),w(),S(),D(),d(),K()})();