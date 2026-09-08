const K=t=>Math.max(0,Math.min(100,t));function Le(t){const{focus:e,fatigue:n,featureSize:o,weeks:a,calendar:s,meetingTypes:r}=t,c=[];let l=0,i=0;for(let u=0;u<a;u+=1)for(let d=0;d<5;d+=1){let p=0,w=0;for(let g=0;g<8;g+=1){const k=r[s[`${d}-${g}`]??""];if(k){p=K(p+k.focus),w=K(w+k.fatigue),c.push({week:u,day:d,hour:g,inMeeting:!0,hourFocus:p,hourFatigue:w,hourProductivity:0,accumulatedProductivity:l,completedFeatures:i,featureCompleted:!1});continue}p=K(p+e),w=K(w+n);const x=K(p-w),M=o-l,A=x>M,D=A?M:x;A?(i+=1,l=0):l+=D,c.push({week:u,day:d,hour:g,inMeeting:!1,hourFocus:p,hourFatigue:w,hourProductivity:D,accumulatedProductivity:l,completedFeatures:i,featureCompleted:A}),A&&(p=0)}}return c}function Z(){return Array.from({length:8},()=>new Array(5).fill(0))}function Q(t,{hour:e,day:n},o){const a=t[e];a&&(a[n]=(a[n]??0)+o)}function He(t,{featureSize:e,weeks:n}){const o=t[t.length-1],a=o?.completedFeatures??0,s=o?.accumulatedProductivity??0,r=a+Math.round(10*s/e)/10,c=a*e+s,l=Array.from({length:5},()=>({productivity:0,features:0,meetings:0})),i={focus:Z(),fatigue:Z(),productivity:Z(),features:Z()};for(const d of t){const p=l[d.day];p.productivity+=d.hourProductivity,d.featureCompleted&&(p.features+=1),d.inMeeting&&(p.meetings+=1),Q(i.focus,d,d.hourFocus),Q(i.fatigue,d,d.hourFatigue),Q(i.productivity,d,d.hourProductivity),d.featureCompleted&&Q(i.features,d,1)}const u=d=>d.map(p=>p.map(w=>n>0?w/n:0));return{totalFeatures:r,totalProductivity:c,averageFeaturesPerWeek:n>0?r/n:0,averageProductivityPerWeek:n>0?c/n:0,days:l,hours:{focus:u(i.focus),fatigue:u(i.fatigue),productivity:u(i.productivity),features:i.features}}}const oe=480,H=240,I={top:10,right:10,bottom:34,left:36};function rt(t,e,n,o){const a=oe-I.left-I.right,s=H-I.top-I.bottom,r=i=>I.top+s-(t>0?i/t*s:0),c=o.map(i=>`<line class="grid" x1="${I.left}" x2="${oe-I.right}" y1="${r(i)}" y2="${r(i)}"/><text x="${I.left-4}" y="${r(i)+3}" text-anchor="end">${i}</text>`).join(""),l=(n>1?[1,Math.ceil(n/2),n]:[]).filter((i,u,d)=>d.indexOf(i)===u).map(i=>`<text x="${I.left+(i-1)/Math.max(1,n-1)*a}" y="${H-I.bottom+14}" text-anchor="middle">${i}</text>`).join("");return`${c}${l}<text x="${I.left+a/2}" y="${H-6}" text-anchor="middle">${e.x}</text><text transform="translate(9 ${I.top+s/2}) rotate(-90)" text-anchor="middle">${e.y}</text>`}function it(t){if(t<=0)return[0];const e=10**Math.floor(Math.log10(t)),n=t/e>=5?e:t/e>=2?e/2:e/5,o=[];for(let a=0;a<=t;a+=n)o.push(Math.round(a*100)/100);return o}function Wt(t,e){const n=Math.max(...t.map(u=>u.values.length),1),o=Math.max(1,...t.flatMap(u=>u.values)),a=oe-I.left-I.right,s=H-I.top-I.bottom,r=u=>I.left+u/Math.max(1,n-1)*a,c=u=>I.top+s-u/o*s,l=t.map(u=>{const d=u.values.map((p,w)=>`${r(w).toFixed(1)},${c(p).toFixed(1)}`).join(" ");return`<polyline class="line ${u.className}" points="${d}"><title>${u.name}</title></polyline>`}).join(""),i=t.map((u,d)=>`<rect class="${u.className}" x="${I.left+d*90}" y="${H-I.bottom+20}" width="10" height="3"/><text x="${I.left+d*90+14}" y="${H-I.bottom+24}">${u.name}</text>`).join("");return`<svg viewBox="0 0 ${oe} ${H}" role="img" aria-label="${e.y} by ${e.x}">${rt(o,e,n,it(o))}${l}${i}</svg>`}const Je=480,Y=240,W={top:10,right:10,bottom:34,left:36};function ct(t,e,n){const o=Math.max(...t.map(g=>g.values.length),1),a=Math.max(1,...t.flatMap(g=>g.values)),s=Je-W.left-W.right,r=Y-W.top-W.bottom,c=s/o,l=c*.7/t.length,i=g=>W.top+r-g/a*r,u=t.map((g,k)=>g.values.map((x,M)=>{const A=W.left+M*c+c*.15+k*l;return`<rect class="${g.className}" x="${A.toFixed(1)}" y="${i(x).toFixed(1)}" width="${l.toFixed(1)}" height="${(W.top+r-i(x)).toFixed(1)}"><title>${g.name}: ${Math.round(x*10)/10}</title></rect>`}).join("")).join(""),d=(n??[]).map((g,k)=>`<text x="${W.left+k*c+c/2}" y="${Y-W.bottom+14}" text-anchor="middle">${g}</text>`).join(""),p=t.map((g,k)=>`<rect class="${g.className}" x="${W.left+k*90}" y="${Y-W.bottom+20}" width="10" height="3"/><text x="${W.left+k*90+14}" y="${Y-W.bottom+24}">${g.name}</text>`).join(""),w=rt(a,e,n?0:o,it(a));return`<svg viewBox="0 0 ${Je} ${Y}" role="img" aria-label="${e.y} by ${e.x}">${w}${u}${d}${p}</svg>`}function h(t,e={},...n){const o=document.createElement(t);for(const[a,s]of Object.entries(e))s===void 0||s===!1||(typeof s=="function"?o.addEventListener(a.slice(2).toLowerCase(),s):s===!0?o.setAttribute(a,""):o.setAttribute(a,String(s)));for(const a of n)a==null||a===!1||o.append(a);return o}const ge=["Mon","Tue","Wed","Thu","Fri"],lt=Array.from({length:8},(t,e)=>`${9+e}:00`);function Bt(t){return t<=500?t:t<=750?500+(t-500)*2:t<1e3?1e3+(t-750)*35:1e4}function Nt(t){return t<=500?t:t<=1e3?500+(t-500)/2:t<1e4?750+(t-1e3)/35:1e3}function ee(t,e){const n=e.flat(),o=Math.min(...n),a=Math.max(...n),s=h("div",{class:"week"},h("span"),...ge.map(r=>h("span",{class:"head"},r)));return e.forEach((r,c)=>{s.append(h("span",{class:"hour"},lt[c]??""));for(const l of r){const i=a>o?(l-o)/(a-o):0;s.append(h("span",{class:"cell",style:`--heat:${(.1+i*.9).toFixed(2)}`},String(Math.round(l))))}}),h("div",{},h("h4",{},t),s)}function Lt(t){const e={focus:25,fatigue:15,featureSize:300,weeks:8},n={"🍽️ Lunch":{focus:-100,fatigue:-100},"🏃 Sprint plan":{focus:-100,fatigue:50},"😴 Boring":{focus:-50,fatigue:-25}},o={};for(let v=0;v<5;v+=1)o[`${v}-3`]="🍽️ Lunch";let a="🏃 Sprint plan",s=null;const r=h("div",{class:"figures"}),c=h("div",{class:"chart"}),l=h("div",{class:"maps"}),i=h("div",{class:"week"}),u=h("select"),d=h("input",{type:"number",min:-100,max:100}),p=h("input",{type:"number",min:-100,max:100}),w=h("input",{type:"text",placeholder:"New meeting name",size:16}),g=(v,f,$,S,E=P=>P,N=P=>P)=>{const P=h("output",{},String(e[v])),O=h("input",{type:"range",min:$,max:S,value:N(e[v]),oninput:()=>{e[v]=E(Number(O.value)),P.textContent=String(e[v]),C()}});return h("label",{},`${f}: `,P,O)},k=h("div",{class:"dials"},g("focus","Focus an hour",0,100),g("fatigue","Fatigue an hour",0,100),g("featureSize","Feature size",0,1e3,Bt,Nt),g("weeks","Weeks",1,16));function x(){u.replaceChildren(...Object.keys(n).map(f=>h("option",{value:f,selected:f===a},f)));const v=n[a];d.value=String(v?.focus??0),p.value=String(v?.fatigue??0)}u.addEventListener("change",()=>{a=u.value,x()});const M=()=>{n[a]={focus:Number(d.value)||0,fatigue:Number(p.value)||0},C()};d.addEventListener("change",M),p.addEventListener("change",M);const A=()=>{const v=w.value.trim();!v||n[v]||(n[v]={focus:0,fatigue:0},a=v,w.value="",x())},D=h("div",{class:"row"},h("span",{},"Paint: "),u,h("span",{},"focus "),d,h("span",{},"fatigue "),p,w,h("button",{type:"button",onclick:A},"Add"));let R=null;const m=v=>{if(R==="add"&&!o[v])o[v]=a;else if(R==="remove"&&o[v])delete o[v];else return;C()};function b(){i.replaceChildren(h("span"),...ge.map(v=>h("span",{class:"head"},v))),lt.forEach((v,f)=>{i.append(h("span",{class:"hour"},v));for(let $=0;$<5;$+=1){const S=`${$}-${f}`,E=o[S];i.append(h("span",{class:E?"slot meeting":"slot",title:E??"free",onpointerdown:N=>{N.preventDefault(),R=o[S]?"remove":"add",m(S)},onpointerenter:()=>{R&&m(S)}},E?E.slice(0,2):""))}})}window.addEventListener("pointerup",()=>{R=null});const y=h("div",{class:"row"}),T=()=>{s={summary:He(Le({...e,calendar:o,meetingTypes:n}),e),weeks:e.weeks},C()},F=()=>{s=null,C()};function C(){b();const v=Le({...e,calendar:o,meetingTypes:n}),f=He(v,e),$=e.weeks*5*8;r.replaceChildren(h("div",{class:"clean"},h("strong",{},f.totalFeatures.toFixed(1)),"features finished"),h("div",{},h("strong",{},f.averageFeaturesPerWeek.toFixed(2)),"features a week"),h("div",{},h("strong",{},Math.round(f.totalProductivity/$).toString()),"productivity an hour"),h("div",{},h("strong",{},String($)),"hours simulated")),y.replaceChildren(s?h("span",{},`Baseline: ${s.summary.averageFeaturesPerWeek.toFixed(2)} features a week over ${s.weeks} weeks; now ${f.averageFeaturesPerWeek.toFixed(2)}. `):h("span",{},"Keep this run to compare against: "),h("button",{type:"button",onclick:T},s?"Save again":"Save as baseline")),s&&y.append(h("button",{type:"button",onclick:F},"Clear")),c.innerHTML=ct([{name:"Productivity",className:"clean",values:f.days.map(S=>S.productivity/e.weeks)},{name:"Features ×100",className:"debt",values:f.days.map(S=>S.features/e.weeks*100)}],{x:"",y:"A day, on average"},ge),c.prepend(h("h4",{},"The shape of a week")),l.replaceChildren(ee("Focus",f.hours.focus),ee("Fatigue",f.hours.fatigue),ee("Productivity",f.hours.productivity),ee("Features finished",f.hours.features))}x(),t.append(k,D,h("div",{class:"charts"},i,c),r,y,l),C()}const Ht={name:"developer-meetings",apps:{"developer-meetings":Lt}};class Jt{listeners=new Set;send(e){for(const n of[...this.listeners])n(e)}on(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}}const ye=new Jt,_t=900,Gt=480,te={x:1600,y:1e3};function ne(t,e){return(t%e+e)%e}class qt{x=0;y=0;written="";driving=!1;follow({byRadians:e,tiltedBy:n,seconds:o}){const a=document.documentElement;if(a.dataset.sky!=="stars")return;this.driving||this.takeOver(a);const s=_t/(Math.PI*2),r=(o/Gt*Math.PI*2+e)*s;this.x=ne(this.x+r,te.x),this.y=ne(this.y-n*s,te.y);const c=`${(Math.round(this.x*2)/2).toFixed(1)}px ${(Math.round(this.y*2)/2).toFixed(1)}px`;if(c===this.written)return;this.written=c;const[l,i]=c.split(" ");a.style.setProperty("--sky-x",l??"0px"),a.style.setProperty("--sky-y",i??"0px")}release(){const e=document.documentElement;e.classList.remove("sky-driven"),e.style.removeProperty("--sky-x"),e.style.removeProperty("--sky-y"),this.x=0,this.y=0,this.written="",this.driving=!1}takeOver(e){const n=getComputedStyle(document.body,"::before").transform;if(n&&n!=="none")try{const o=new DOMMatrixReadOnly(n);this.x=ne(o.m41,te.x),this.y=ne(o.m42,te.y)}catch{}e.classList.add("sky-driven"),this.driving=!0}}function Kt(t){return ye.on(e=>t.follow(e))}const _e=new qt,Yt={name:"sky",install:()=>Kt(_e),arrive:()=>_e.release()},he=20;function Ut(t){const{baseTime:e,shortcutFactor:n,interestRate:o,timeHorizon:a}=t,s=[];let r=null;const c=e;let l=e*(1-n),i=0,u=0,d=0,p=0,w=0,g=0;for(let k=0;k<a*he;){for(;w<=k;)i+=1,d+=1,w+=c;for(;g<=k;)u+=1,p+=1,g+=l,l*=1+o;if(k+=1,k%he===0){const x=k/he;s.push({month:x,cleanCumulative:i,debtCumulative:u,cleanMonthly:d,debtMonthly:p,debtFeatureCost:l}),d=0,p=0,r===null&&i>u&&(r=x)}}return{months:s,breakEvenMonth:r}}const zt=[{key:"baseTime",label:"Base time",min:1,max:30,step:1,show:t=>`${t} days`},{key:"shortcutFactor",label:"Shortcuts",min:0,max:.9,step:.05,show:t=>`${Math.round(t*100)}%`},{key:"interestRate",label:"Interest",min:0,max:1,step:.01,show:t=>`${Math.round(t*100)}%`},{key:"timeHorizon",label:"Timeline",min:6,max:60,step:1,show:t=>`${t} months`}];function Vt(t){const e={baseTime:20,shortcutFactor:.25,interestRate:.1,timeHorizon:24},n=h("div",{class:"figures"}),o=h("div",{class:"chart"}),a=h("div",{class:"chart"}),s=h("p"),r=h("div",{class:"dials"},...zt.map(l=>{const i=h("output",{},l.show(e[l.key])),u=h("input",{type:"range",min:l.min,max:l.max,step:l.step,value:e[l.key],oninput:()=>{e[l.key]=Number(u.value),i.textContent=l.show(e[l.key]),c()}});return h("label",{},`${l.label}: `,i,u)}));function c(){const{months:l,breakEvenMonth:i}=Ut(e),u=l[l.length-1],d=u?.cleanCumulative??0,p=u?.debtCumulative??0,w=d>0?(d-p)/d*100:0,g=Math.abs(w)<.1?"Even":w>0?"Loss":"Gain",k=Math.abs(w)<.1?"≈0%":`${Math.abs(w).toFixed(1)}%`;n.replaceChildren(h("div",{class:"clean"},h("strong",{},String(d)),"clean features"),h("div",{class:"debt"},h("strong",{},String(p)),"debt features"),h("div",{},h("strong",{},i?`month ${i}`:"never"),"break-even"),h("div",{},h("strong",{},k),`${g.toLowerCase()} on the shortcut road`)),o.innerHTML=Wt([{name:"Clean",className:"clean",values:l.map(x=>x.cleanCumulative)},{name:"Debt-driven",className:"debt",values:l.map(x=>x.debtCumulative)}],{x:"Months",y:"Features"}),o.prepend(h("h4",{},"Cumulative features")),a.innerHTML=ct([{name:"Clean",className:"clean",values:l.slice(1).map(x=>x.cleanMonthly)},{name:"Debt-driven",className:"debt",values:l.slice(1).map(x=>x.debtMonthly)}],{x:"Months",y:"Features a month"}),a.prepend(h("h4",{},"Monthly delivery rate")),s.textContent=e.interestRate===0?"With no interest there is no compound slowdown, and the shortcut simply wins. That is the one case that does not happen to real code.":i?`${Math.round(e.shortcutFactor*100)}% saved at first, ${Math.round(e.interestRate*100)}% interest on every feature: clean development overtakes at month ${i}, and by month ${e.timeHorizon} the shortcut road has delivered ${k} less.`:`${Math.round(e.shortcutFactor*100)}% saved at first, ${Math.round(e.interestRate*100)}% interest on every feature: in ${e.timeHorizon} months the clean road has not yet caught up. Give it longer, or raise the interest.`}t.append(r,n,h("div",{class:"charts"},o,a),s),c()}const Xt={name:"technical-debt",apps:{"technical-debt":Vt}},Zt="theme";function ht(){const t=document.documentElement,e=t.dataset.pageTheme;let n=null;try{n=localStorage.getItem(Zt)}catch{n=null}const o=e??(n==="light"||n==="dark"?n:null);o?t.dataset.theme=o:delete t.dataset.theme}const we="theme";function Qt(){return window.matchMedia("(prefers-color-scheme: dark)").matches}function en(){let t=null;try{t=localStorage.getItem(we)}catch{t=document.documentElement.dataset.theme??null}return t==="light"||t==="dark"?t:Qt()?"dark":"light"}class tn{apply(e){const n=e==="toggle"?en()==="dark"?"light":"dark":e;try{n==="system"?localStorage.removeItem(we):localStorage.setItem(we,n)}catch{}return ht(),n}}function nn(t){const e=document.querySelector(".theme-toggle");return e?(e.classList.add("ready"),e.removeAttribute("aria-hidden"),e.removeAttribute("tabindex"),e.addEventListener("click",t),()=>e.removeEventListener("click",t)):()=>{}}const on={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function j(t){return t.replace(/[&<>"]/g,e=>on[e]??e)}const ut=["light","dark","system"];function an(t){return ut.includes(t)}function Ge(t){const e=ut.filter(o=>o!==t),n=o=>`theme ${o}`;return{text:`theme: ${t}
  ${e.map(n).join("   ")}`,html:`<pre>theme: ${t}
  ${e.map(o=>`<a href="#" data-run="${j(n(o))}">${j(n(o))}</a>`).join("   ")}</pre>`}}function sn(t){return{name:"theme",usage:"theme [light|dark|system|auto]",description:"switch the colours, or toggle them",run({site:e,cwd:n},[o]){const a=e.at(n)?.fields.theme;if(a)return{text:`theme: this page keeps its own, ${a}. It works everywhere else.`,error:!0};if(o===void 0)return Ge(t.apply("toggle"));const s=o==="auto"?"system":o;return an(s)?Ge(t.apply(s)):{text:`theme: ${o}: choose light, dark or system`,error:!0}}}}const rn={name:"theme",commands:[sn(new tn)],install:t=>nn(()=>t.run("theme")),arrive:()=>ht()},ke="header-world";function dt(){try{const t=localStorage.getItem(ke);if(!t)return null;const e=JSON.parse(t);return[e.seed,e.levels,e.roughness,e.share].every(o=>typeof o=="number"&&Number.isFinite(o))?e:null}catch{return null}}function cn(t){try{localStorage.setItem(ke,JSON.stringify(t))}catch{}}function ln(){try{localStorage.removeItem(ke)}catch{}}const B=(1+Math.sqrt(5))/2,hn=[[-1,B,0],[1,B,0],[-1,-B,0],[1,-B,0],[0,-1,B],[0,1,B],[0,-1,-B],[0,1,-B],[B,0,-1],[B,0,1],[-B,0,-1],[-B,0,1]],un=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];function dn(){const t=hn.map(([e,n,o])=>{const a=Math.hypot(e,n,o);return{direction:[e/a,n/a,o/a],radius:1,surface:0}});return mt(t,un.map(e=>[...e]))}const mn=(t,e)=>(t+e)/2;function pn(t,e,n=mn){const o=Array.from({length:t.vertexCount},(c,l)=>({direction:[t.directions[l*3]??0,t.directions[l*3+1]??0,t.directions[l*3+2]??0],radius:t.radii[l]??1,surface:t.surface[l]??0})),a=new Map,s=(c,l)=>{const i=c<l?`${c}:${l}`:`${l}:${c}`,u=a.get(i);if(u!==void 0)return u;const d=o[c],p=o[l],[w,g,k]=d.direction,[x,M,A]=p.direction,D=Math.hypot(w*d.radius-x*p.radius,g*d.radius-M*p.radius,k*d.radius-A*p.radius),[R,m,b]=[(w+x)/2,(g+M)/2,(k+A)/2],y=Math.hypot(R,m,b)||1,T=n(d.surface,p.surface);o.push({direction:[R/y,m/y,b/y],radius:(d.radius+p.radius)/2+e(D),surface:T});const F=o.length-1;return a.set(i,F),F},r=[];for(let c=0;c<t.faceCount;c+=1){const l=t.faces[c*3],i=t.faces[c*3+1],u=t.faces[c*3+2],d=s(l,i),p=s(i,u),w=s(u,l);r.push([l,d,w],[i,p,d],[u,w,p],[d,p,w])}return mt(o,r)}function mt(t,e){const n=new Float32Array(t.length*3),o=new Float32Array(t.length),a=new Float32Array(t.length);t.forEach((r,c)=>{n[c*3]=r.direction[0],n[c*3+1]=r.direction[1],n[c*3+2]=r.direction[2],o[c]=r.radius,a[c]=r.surface});const s=new Uint32Array(e.length*3);return e.forEach(([r,c,l],i)=>{s[i*3]=r,s[i*3+1]=c,s[i*3+2]=l}),{directions:n,radii:o,surface:a,faces:s,faceCount:e.length,vertexCount:t.length}}function fn(t){let e=t>>>0;return()=>{e=e+1831565813>>>0;let n=Math.imul(e^e>>>15,1|e);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function gn(t){const e=dn();return{seed:t,mesh:e,temperature:new Float32Array(e.vertexCount),faceColour:new Uint8ClampedArray(e.faceCount*3),seaRadius:0}}function yn(t,e){return{...t,mesh:e,temperature:new Float32Array(e.vertexCount),faceColour:new Uint8ClampedArray(e.faceCount*3)}}function wn(t,e){return Math.abs(t.mesh.directions[e*3+1]??0)}function pt(t,e,n){const o=t.mesh.faces[n*3]??0,a=t.mesh.faces[n*3+1]??0,s=t.mesh.faces[n*3+2]??0;return((e[o]??0)+(e[a]??0)+(e[s]??0))/3}function bn(t,e){return pt(t,t.mesh.radii,e)}const ft=(t=4,e=.28,n=.2)=>o=>{const a=fn(o.seed);let s=o.mesh;const r=Float32Array.from(s.surface,()=>a());s={...s,surface:r};for(let c=0;c<t;c+=1)s=pn(s,l=>l*e*(a()-.5),(l,i)=>{const u=.5+(a()-.5)*(l-i)*n;return Math.min(1,Math.max(0,l*(1-u)+i*u))});return yn(o,s)},gt=({equator:t=1,pole:e=.05,peak:n=0}={})=>o=>{const a=new Float32Array(o.mesh.vertexCount),s=o.mesh.radii,r=s.reduce((i,u)=>Math.min(i,u),1/0),l=s.reduce((i,u)=>Math.max(i,u),-1/0)-r||1;for(let i=0;i<o.mesh.vertexCount;i+=1){const u=((s[i]??1)-r)/l,d=wn(o,i)**2.2;a[i]=t+(e-t)*d+(n-t)*u}return{...o,temperature:a}},yt=(t=.55)=>e=>{const n=Float32Array.from(e.mesh.radii).sort(),o=Math.min(n.length-1,Math.floor(n.length*t)),a=n[o]??1,s=Float32Array.from(e.mesh.radii,r=>Math.max(r,a));return{...e,mesh:{...e.mesh,radii:s},seaRadius:a}},vn=[24,92,168],kn=[62,176,206],xn=[214,196,138],qe=[190,158,84],ue=[70,138,66],Tn=[74,104,76],Sn=[136,128,116],Ke=[238,243,247];function L(t,e,n){const o=Math.min(1,Math.max(0,n));return[t[0]+(e[0]-t[0])*o,t[1]+(e[1]-t[1])*o,t[2]+(e[2]-t[2])*o]}function $n(t){return t>.78?qe:t>.62?L(ue,qe,(t-.62)/.16):t>.3?ue:L(Tn,ue,(t-.12)*5.5)}const wt=t=>{const e=new Uint8ClampedArray(t.mesh.faceCount*3),n=t.mesh.radii.reduce((a,s)=>Math.max(a,s),-1/0),o=Math.max(1e-6,n-t.seaRadius);for(let a=0;a<t.mesh.faceCount;a+=1){const s=(bn(t,a)-t.seaRadius)/o,r=pt(t,t.temperature,a);let c;s<=.002?(c=L(kn,vn,.55),r<.16&&(c=L(c,Ke,(.16-r)*6))):(c=L(xn,$n(r),Math.min(1,s*9)),c=L(c,Sn,Math.max(0,s-.55)*2.2),r<.26&&(c=L(c,Ke,(.26-r)*4))),e[a*3]=c[0],e[a*3+1]=c[1],e[a*3+2]=c[2]}return{...t,faceColour:e}},Mn=[ft(),yt(),gt(),wt];function An(t,e=Mn){return e.reduce((n,o)=>o(n),gn(t))}function bt(t){return An(t.seed,[ft(t.levels,t.roughness),yt(t.share),gt(),wt])}const Ye=.3,In=[-.5,.45,.74],En=1.02;class xe{size;pixels;depth;view=new Float32Array(0);screen=new Float32Array(0);constructor(e,n=new Uint8ClampedArray(e*e*4)){if(n.length!==e*e*4)throw new Error(`SphereRaster: ${e}×${e} needs ${e*e*4} bytes, not ${n.length}`);this.size=e,this.pixels=n,this.depth=new Float32Array(e*e)}paint(e,n){const{size:o,pixels:a,depth:s}=this;a.fill(0),s.fill(-1/0);const[r,c,l]=Cn(n.light??In),i=n.tilt??-.38,u=Math.cos(i),d=Math.sin(i),p=Math.cos(n.rotation),w=Math.sin(n.rotation),{directions:g,radii:k,faces:x,faceCount:M,vertexCount:A}=e.mesh;let D=1;for(let y=0;y<A;y+=1){const T=k[y]??1;T>D&&(D=T)}const R=o/(2*D*En);this.view.length<A*3&&(this.view=new Float32Array(A*3),this.screen=new Float32Array(A*3));const m=this.view,b=this.screen;for(let y=0;y<A;y+=1){const T=k[y]??1,F=(g[y*3]??0)*T,C=(g[y*3+1]??0)*T,v=(g[y*3+2]??0)*T,f=F*p-v*w,$=F*w+v*p,S=C*u+$*d,E=-C*d+$*u;m[y*3]=f,m[y*3+1]=S,m[y*3+2]=E,b[y*3]=o/2+f*R,b[y*3+1]=o/2-S*R,b[y*3+2]=E}for(let y=0;y<M;y+=1){const T=x[y*3]??0,F=x[y*3+1]??0,C=x[y*3+2]??0,v=b[T*3],f=b[T*3+1],$=b[T*3+2],S=b[F*3],E=b[F*3+1],N=b[F*3+2],P=b[C*3],O=b[C*3+1],q=b[C*3+2],se=(S-v)*(O-f)-(E-f)*(P-v);if(se>=0)continue;const Te=m[T*3],Se=m[T*3+1],$e=m[T*3+2],Me=m[F*3]-Te,Ae=m[F*3+1]-Se,Ie=m[F*3+2]-$e,Ee=m[C*3]-Te,Ce=m[C*3+1]-Se,De=m[C*3+2]-$e,Re=Ae*De-Ie*Ce,Pe=Ie*Ee-Me*De,Fe=Me*Ce-Ae*Ee,re=Math.hypot(Re,Pe,Fe)||1,It=Re/re*r+Pe/re*c+Fe/re*l,ie=Ye+(1-Ye)*Math.max(0,It),Et=(e.faceColour[y*3]??0)*ie,Ct=(e.faceColour[y*3+1]??0)*ie,Dt=(e.faceColour[y*3+2]??0)*ie,Rt=Math.max(0,Math.floor(Math.min(v,S,P))),Pt=Math.min(o-1,Math.ceil(Math.max(v,S,P))),Ft=Math.max(0,Math.floor(Math.min(f,E,O))),jt=Math.min(o-1,Math.ceil(Math.max(f,E,O)));for(let V=Ft;V<=jt;V+=1)for(let X=Rt;X<=Pt;X+=1){const ce=X+.5,le=V+.5,Ot=(S-v)*(le-f)-(E-f)*(ce-v),je=(P-S)*(le-E)-(O-E)*(ce-S),Oe=(v-P)*(le-O)-(f-O)*(ce-P);if(Ot>0||je>0||Oe>0)continue;const We=je/se,Be=Oe/se,Ne=$*We+N*Be+q*(1-We-Be),_=V*o+X;Ne<=s[_]||(s[_]=Ne,a[_*4]=Et,a[_*4+1]=Ct,a[_*4+2]=Dt,a[_*4+3]=255)}}return a}}function Cn([t,e,n]){const o=Math.hypot(t,e,n)||1;return[t/o,e/o,n/o]}const be={levels:4,roughness:.28,share:.55},U=32;let de=null,Ue=null,me=null;function ze(t,e){const n=document.querySelector('link[rel="icon"]');if(!n)return;de??=Object.assign(document.createElement("canvas"),{width:U,height:U});const o=de.getContext("2d");o&&(me??=o.createImageData(U,U),Ue??=new xe(U,me.data),Ue.paint(t,{rotation:e}),o.putImageData(me,0,0),n.type="image/png",n.href=de.toDataURL("image/png"))}function vt(t){let e=!0;if(typeof IntersectionObserver!="function")return{onScreen:()=>e,stop:()=>{}};const n=new IntersectionObserver(o=>{for(const a of o)e=a.isIntersecting},{rootMargin:"100px"});return n.observe(t),{onScreen:()=>e,stop:()=>n.disconnect()}}const Dn=90,Rn=400,pe=new WeakMap;function ve(t,e){pe.get(t)?.();const n=t.getContext("2d");if(!n)return()=>{};const o=e??{...be,seed:Math.floor(Math.random()*16777215)},a=t.width,s=bt(o),r=n.createImageData(a,a),c=new xe(a,r.data);t.dataset.seed=String(o.seed),t.title=`World ${o.seed}, ${s.mesh.faceCount.toLocaleString("en")} triangles`;const l=k=>{c.paint(s,{rotation:k}),n.putImageData(r,0,0),t.classList.add("grown")};if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return l(.6),ze(s,.6),pe.set(t,()=>{}),()=>{};let i=0,u=-1/0;const d=performance.now(),p=vt(t),w=k=>{const x=(k-d)/1e3/Dn*Math.PI*2;p.onScreen()&&l(x),k-u>Rn&&(ze(s,x),u=k),i=requestAnimationFrame(w)};i=requestAnimationFrame(w);const g=()=>{cancelAnimationFrame(i),p.stop()};return pe.set(t,g),g}function Pn(){const t=document.querySelector("canvas.planet");return t?ve(t,dt()??void 0):()=>{}}const G=360,Fn=60,jn=1.4,Ve=Math.PI*2/Fn,Xe=Math.PI*4;function On(t){const e=h("canvas",{class:"world",width:G,height:G}),n=e.getContext("2d");if(!n)return()=>{};const o={...be,seed:Math.floor(Math.random()*16777215)},a=n.createImageData(G,G),s=new xe(G,a.data),r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let c,l=.6,i=-.38,u=!r,d=null,p=0,w=performance.now();const g=h("p",{class:"hint"}),k=document.querySelector("canvas.planet"),x=(20*4**be.levels).toLocaleString("en"),M=()=>{c=bt(o);const f=dt();g.textContent=`World ${o.seed}: ${c.mesh.faceCount.toLocaleString("en")} triangles. `+(f?`The header is keeping world ${f.seed}, ${(20*4**f.levels).toLocaleString("en")} triangles.`:`The header grows a new one every visit, ${x} triangles each.`),D.hidden=!f,R()},A=h("button",{type:"button",onclick:()=>{cn({...o}),k&&ve(k,{...o}),M()}},"Put it in the header"),D=h("button",{type:"button",hidden:!0,onclick:()=>{ln(),k&&ve(k),M()}},"Let the header grow its own"),R=()=>{s.paint(c,{rotation:l,tilt:i}),n.putImageData(a,0,0)};let m=0;const b=vt(e),y=f=>{const $=Math.min(.1,(f-w)/1e3);if(!d&&b.onScreen()){if(p!==0){p*=Math.exp(-$/jn);const S=u?Ve:0;(Math.abs(p)<=S||Math.abs(p)<.01)&&(p=0)}p!==0?(l-=p*$,R()):u&&(l+=Ve*$,R()),ye.send({byRadians:p*$,tiltedBy:0,seconds:$})}w=f,m=requestAnimationFrame(y)};e.addEventListener("pointerdown",f=>{d={x:f.clientX,y:f.clientY,at:f.timeStamp},p=0,e.setPointerCapture(f.pointerId)}),e.addEventListener("pointermove",f=>{if(!d)return;const $=e.clientWidth||G,S=(f.clientX-d.x)/$*Math.PI;l-=S;const E=i;i=Math.max(-1.2,Math.min(1.2,i-(f.clientY-d.y)/$*Math.PI)),ye.send({byRadians:S,tiltedBy:i-E,seconds:0});const N=Math.max(.004,(f.timeStamp-d.at)/1e3);p=Math.max(-Xe,Math.min(Xe,p*.4+S/N*.6)),d={x:f.clientX,y:f.clientY,at:f.timeStamp},R()}),e.addEventListener("pointerup",f=>{d&&f.timeStamp-d.at>120&&(p=0),d=null,w=performance.now()}),e.addEventListener("pointercancel",()=>{d=null,p=0});const T=h("input",{type:"number",min:0,value:o.seed,onchange:()=>{o.seed=Math.max(0,Math.floor(Number(T.value)||0)),M()}}),F=h("button",{type:"button",onclick:()=>{o.seed=Math.floor(Math.random()*16777215),T.value=String(o.seed),M()}},"Another world"),C=h("button",{type:"button",onclick:()=>{u=!u,C.textContent=u?"Hold still":"Turn"}},u?"Hold still":"Turn"),v=(f,$,S,E,N,P)=>{const O=h("output",{},P(o[f])),q=h("input",{type:"range",min:S,max:E,step:N,value:o[f],onchange:()=>{o[f]=Number(q.value),O.textContent=P(o[f]),M()},oninput:()=>{O.textContent=P(Number(q.value))}});return h("label",{},`${$}: `,O,q)};return t.append(e,h("div",{class:"row"},h("span",{},"Seed "),T,F,C,A,D),h("div",{class:"dials"},v("levels","Detail",2,6,1,f=>`${f} splits`),v("roughness","Roughness",.02,1,.01,f=>f.toFixed(2)),v("share","Sea",0,.98,.01,f=>`${Math.round(f*100)}%`)),g),M(),m=requestAnimationFrame(y),()=>{cancelAnimationFrame(m),b.stop()}}const Wn={name:"world",apps:{worlds:On},install:()=>Pn()},z=[Wn,rn,Yt,Xt,Ht];function Ze(t){const e=[];for(const n of document.querySelectorAll(".app[data-app]")){const o=t[n.dataset.app??""]?.(n);o&&e.push(o)}return()=>{for(const n of e)n()}}function Bn(t){const e={},n=t.fields.theme;(n==="dark"||n==="light")&&(e["data-page-theme"]=n);const o=t.fields.sky;return o&&(e["data-sky"]=o),e}const Nn=["data-page-theme","data-sky"];function Ln(t,e){const o=/^https?:/.test(e)?' target="_blank" rel="noopener noreferrer"':"";return`<a href="${j(e)}"${o}>${t}</a>`}const Hn=["large","wide"];function Jn(t,e,n){const o=n&&Hn.includes(n)?` class="${n}"`:"";return`<img src="${j(e)}" alt="${j(t)}"${o}>`}const _n=/(`[^`]+`|!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)|\[[^\]]+\]\([^)\s]+\))/g,Gn=/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/,qn=/^\[([^\]]+)\]\(([^)\s]+)\)$/;function kt(t){return t.split(_n).map(e=>{if(e.startsWith("`")&&e.endsWith("`")&&e.length>1)return`<code>${j(e.slice(1,-1))}</code>`;const n=Gn.exec(e);if(n)return Jn(n[1]??"",n[2]??"",n[3]);const o=qn.exec(e);return o?Ln(kt(o[1]??""),o[2]??""):j(e)}).join("")}function Kn(t){return t.split(/(<code>[\s\S]*?<\/code>)/g).map(e=>e.startsWith("<code>")?e:e.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/(^|[^*])\*([^*]+)\*/g,"$1<em>$2</em>").replace(/ {2,}\n/g,"<br>").replace(/\n/g," ").replace(/ -- /g," — ")).join("")}function J(t){return Kn(kt(t))}const Qe=/^(?:[-*]|\d+\.)\s/;function Yn(t,e,n){if(!Qe.test(t[0]??""))return!1;const o=e.slice(n).find(a=>a.trim()!=="");return o!==void 0&&Qe.test(o)}function Un(t){const e=[],n=t.replace(/\r\n?/g,`
`).split(`
`);let o=[],a=!1;return n.forEach((s,r)=>{if(s.startsWith("```")){a=!a,o.push(s),a||(e.push(o),o=[]);return}if(!a&&s.trim()===""){if(Yn(o,n,r+1))return;o.length&&e.push(o),o=[];return}o.push(s)}),o.length&&e.push(o),e}function zn(t){return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function Vn(t){const e=/^(#{1,4})\s+(.*)$/.exec(t[0]??"");if(!e||!t.slice(0,-1).every(s=>/ {2,}$/.test(s)))return null;const o=e[1]?.length??1,a=[e[2]??"",...t.slice(1)].join(`
`);return`<h${o} id="${zn(a)}">${J(a)}</h${o}>`}function Xn(t){if(!t[0]?.startsWith("```"))return null;const e=t.slice(1,-1).join(`
`);return`<pre><code>${j(e)}</code></pre>`}function Zn(t,e){const n=[];for(const o of t)e.test(o)?n.push(o.replace(e,"")):n.length&&(n[n.length-1]+=`
${o.trim()}`);return n}function Qn(t){const e=t[0]??"",n=/^\d+\.\s/.test(e),o=/^[-*]\s/.test(e);if(!n&&!o)return null;const a=n?/^\d+\.\s+/:/^[-*]\s+/;if(!t.every(c=>a.test(c)||/^\s/.test(c)))return null;const s=n?"ol":"ul",r=Zn(t,a).map(c=>`<li>${J(c)}</li>`).join("");return`<${s}>${r}</${s}>`}function eo(t){return t.every(n=>n.includes(" :: "))?`<dl>${t.map(n=>{const o=n.indexOf(" :: ");return[n.slice(0,o),n.slice(o+4)]}).map(([n,o])=>`<dt>${J(n)}</dt><dd>${J(o)}</dd>`).join("")}</dl>`:null}function to(t){if(!t.every(n=>n.startsWith(">")))return null;const e=t.map(n=>n.replace(/^>\s?/,"")).join(" ");return`<blockquote>${J(e)}</blockquote>`}function no(t){const e=/^::([a-z0-9-]+)$/.exec(t[0]??"");return!e||t.length!==1?null:`<div class="app" data-app="${e[1]}"></div>`}function oo(t){return t.length===1&&/^-{3,}$/.test(t[0]??"")?"<hr>":null}function ao(t){const e=t.length===1&&/^(\\+)$/.exec(t[0]??"");return e?`<div class="space" style="--n:${e[1]?.length??1}"></div>`:null}function so(t){return t.length===1&&/^!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)$/.test(t[0]??"")?`<figure>${J(t[0]??"")}</figure>`:null}function ro(t){return`<p>${J(t.join(`
`))}</p>`}const io=[oo,ao,Vn,Xn,to,no,so,eo,Qn];function xt(t){return Un(t).map(e=>{for(const n of io){const o=n(e);if(o!==null)return o}return ro(e)}).join(`
`)}function co(t,e){if(e.parent===null)return"";const n=t.childrenOf(e.route);return n.length===0?"":`<ul class="listing">${n.map(a=>`<li><a href="${a.route}">${j(a.title)}</a>`+(a.summary?` <span class="summary">${j(a.summary)}</span>`:"")+"</li>").join("")}</ul>`}function lo(t,e){const n=t.trailTo(e.route);if(n.length<=1)return"";const o=n.slice(1).map(a=>a.name).join("/");return`<p class="ran"><span class="ps1">~ $</span> cd ${j(o)} &amp;&amp; cat *</p>`}function ho(t,e){return`${lo(t,e)}
${xt(e.body)}
${co(t,e)}`}function uo(t,e){const n=document.querySelector("main");if(!n)return()=>!1;const o=(a,s=!0)=>{const r=t.at(a);if(!r)return!1;n.innerHTML=ho(t,r);const c=Bn(r);for(const l of Nn){const i=c[l];i?document.documentElement.setAttribute(l,i):document.documentElement.removeAttribute(l)}document.title=r.route==="/"?"David Rodenas":`${r.title} — David Rodenas`;for(const l of document.querySelectorAll("nav .navlink"))a.startsWith(l.getAttribute("href")??"\0")?l.setAttribute("aria-current","page"):l.removeAttribute("aria-current");return s&&(window.history.pushState({route:a},"",a),window.scrollTo({top:0})),window.goatcounter?.count?.({path:a,title:document.title}),e(r),!0};return document.addEventListener("click",a=>{if(a.defaultPrevented||a.button!==0||a.metaKey||a.ctrlKey||a.shiftKey||a.altKey)return;const s=a.target?.closest("a[href]");if(!s||s.target||s.dataset.run)return;const r=new URL(s.href,window.location.href);if(r.origin!==window.location.origin)return;const c=r.pathname.endsWith("/")?r.pathname:`${r.pathname}/`;t.at(c)&&(a.preventDefault(),c!==window.location.pathname&&o(c))}),window.addEventListener("popstate",()=>{const a=window.location.pathname.endsWith("/")?window.location.pathname:`${window.location.pathname}/`;o(a,!1)}),o}class mo{lines=[];drafts=[];index=0;add(e){this.lines.push(e),this.drafts=[...this.lines,""],this.index=this.lines.length}previous(e){return this.moveTo(this.index-1,e)}next(e){return this.moveTo(this.index+1,e)}moveTo(e,n){return this.drafts.length===0&&(this.drafts=[""]),e<0||e>=this.drafts.length?n:(this.drafts[this.index]=n,this.index=e,this.drafts[e]??n)}}function po(t,e,n,o){if(t==="k"){const a=e.slice(n);return{line:e.slice(0,n),caret:n,killed:a||o}}if(t==="u"){const a=e.slice(0,n);return{line:e.slice(n),caret:0,killed:a||o}}return t==="y"?{line:e.slice(0,n)+o+e.slice(n),caret:n+o.length,killed:o}:null}function Tt(t){return t.split(/\s*(?:;|&&)\s*/).map(e=>e.trim().split(/\s+/).filter(Boolean)).filter(e=>e.length>0)}function ae(t,e){const o=e.startsWith("~")||e.startsWith("/")?[]:t.split("/").filter(Boolean),a=e.replace(/^~/,"").split("/").filter(Boolean),s=[...o];for(const r of a)r!=="."&&(r===".."?s.pop():s.push(r));return s.length===0?"/":`/${s.join("/")}/`}function fo(t){return t.replace(/(?:^|\/)(?:README\.md|\*)$/,"")||"."}const go={name:"cat",usage:"cat <file>",description:"print a page, README.md or * for the one here",run({site:t,cwd:e},[n]){if(!n)return{text:"cat: usage: cat <file>",error:!0};const o=t.at(ae(e,fo(n)));return!o||/\.md$/.test(n)!==/README\.md$/.test(n)?{text:`cat: ${n}: no such file`,error:!0}:{html:xt(o.body)}}},yo={name:"cd",usage:"cd [dir]",description:"go to a directory (the page follows)",run(t,[e="~"]){const n=ae(t.cwd,e);return t.site.at(n)?(t.cwd=n,{navigate:n}):{text:`cd: ${e}: no such directory`,error:!0}}},wo={name:"clear",usage:"clear",description:"clear what the shell has printed",run(){return{clear:!0}}},bo={name:"help",usage:"help [command]",description:"this",run({commands:t},[e]){if(e){const s=t.find(r=>r.name===e);return s?{text:`${s.usage}
  ${s.description}`}:{text:`help: ${e}: no such command`,error:!0}}const n=Math.max(...t.map(s=>s.usage.length));return{text:["Commands:",...t.map(s=>`${s.usage.padEnd(n)}  ${s.description}`),"","Tab completes. Arrows recall. ^K kills to the end of the line, ^U back to the start, ^Y puts it back."].join(`
`)}}};function vo(t){const e=t.filter(o=>o.startsWith("-")).flatMap(o=>o.slice(1).split("")),n=t.find(o=>!o.startsWith("-"))??".";return{flags:e,path:n}}function ko(t,e,n){const o=n==="."?"":`${n.replace(/\/$/,"")}/`;return[{mode:"--r-",name:"README.md",title:t.title,href:t.route,run:`cat ${o}README.md`},...e.map(a=>({mode:"dr-x",name:`${a.name}/`,title:a.title,href:a.route}))]}function et(t){const e=t.run?` data-run="${j(t.run)}"`:"";return`<a href="${j(t.href)}"${e}>${j(t.name)}</a>`}function xo(t,e){const n=(s,r)=>e?`${s.mode}  ${r.padEnd(20)}  ${s.title}`:r,o=s=>e?`${s.mode}  ${et(s)}${" ".repeat(Math.max(0,20-s.name.length))}  ${j(s.title)}`:et(s),a=e?[`total ${t.length}`]:[];return{text:[...a,...t.map(s=>n(s,s.name))].join(`
`),html:`<pre>${[...a,...t.map(o)].join(`
`)}</pre>`}}const To={name:"ls",usage:"ls [-l] [path]",description:"list what a directory holds; -l says what each is",run({site:t,cwd:e},n){const{flags:o,path:a}=vo(n),s=o.find(l=>l!=="l");if(s)return{text:`ls: -${s}: no such option. Try ls -l`,error:!0};const r=ae(e,a),c=t.at(r);return c?xo(ko(c,t.childrenOf(r),a),o.includes("l")):{text:`ls: ${a}: no such directory`,error:!0}}};function St(t){return t==="/"?"~":`~${t.replace(/\/$/,"")}`}const So={name:"pwd",usage:"pwd",description:"print where you are",run({cwd:t}){return{text:St(t)}}},$t=[To,yo,go,So,bo,wo];class $o{context;constructor(e,n,o=$t){this.context={site:e,cwd:n,commands:o}}get prompt(){return`${St(this.context.cwd)} $`}moveTo(e){return this.context.site.at(e)?(this.context.cwd=e,!0):!1}run(e){const n=[];for(const[o="",...a]of Tt(e)){const s=this.context.commands.find(c=>c.name===o),r=s?s.run(this.context,a):{text:`${o}: command not found. Try help`,error:!0};if(n.push(r),r.error)break}return n}complete(e){const n=e.split(/\s+/),o=n.pop()??"",a=n.length===0?"":`${n.join(" ")} `;return(n.length===0?this.commandNames():this.pathNames(o)).filter(r=>r.startsWith(o)).map(r=>a+r)}commandNames(){return this.context.commands.map(e=>e.name).sort()}pathNames(e){const n=e.lastIndexOf("/"),o=n<0?".":e.slice(0,n+1),a=ae(this.context.cwd,o);if(!this.context.site.at(a))return[];const s=n<0?"":o;return["README.md",...this.context.site.childrenOf(a).map(c=>`${c.name}/`)].map(c=>s+c)}}const Mt="shell-screen",At="shell-pending";function Mo(t,e){try{sessionStorage.setItem(Mt,t.innerHTML),e&&sessionStorage.setItem(At,e)}catch{}}function tt(t){try{const e=sessionStorage.getItem(t)??"";return sessionStorage.removeItem(t),e}catch{return""}}function Ao(){window.__stopTyped?.();const t=window.__typed??[];if(window.__typed=[],t.length===0)return null;const e=[];let n="";for(const o of t)o==="Enter"?(e.push(n),n=""):o==="Backspace"?n=n.slice(0,-1):n+=o;return{finished:e,unfinished:n}}function Io(t,e,n={}){const o=document.querySelector(".terminal"),a=o?.querySelector(".screen"),s=o?.querySelector("form.prompt"),r=s?.querySelector("input"),c=s?.querySelector(".ps1");if(!o||!a||!s||!r||!c)return null;const l=new $o(t,e,n.commands),i=new mo;let u=null;const d=m=>{a.append(m)},p=()=>{u?.remove(),u=null},w=m=>{if(m.clear&&a.replaceChildren(),m.html){const b=h("div",{class:m.text?"listing-out":"cat"});b.innerHTML=m.html,d(b)}else m.text&&d(h("pre",{class:m.error?"error":""},m.text))},g=m=>{p(),d(h("p",{class:"echo"},h("span",{class:"ps1"},l.prompt),` ${m}`));const b=Tt(m).map(y=>y.join(" "));for(let y=0;y<b.length;y+=1){const[T]=l.run(b[y]??"");if(T){if(T.navigate){if(n.navigate?.(T.navigate))continue;Mo(a,b.slice(y+1).join(" && ")),window.location.assign(T.navigate);return}if(w(T),T.error)break}}c.textContent=l.prompt,r.scrollIntoView({block:"nearest"})},k=()=>{if(p(),r.value.trim()===""){r.value="help";return}const m=l.complete(r.value);m.length===1?r.value=m[0]??r.value:m.length>1&&(u=h("p",{class:"hint"},m.map(b=>b.split(" ").pop()).join("  ")),d(u))};s.addEventListener("submit",m=>{m.preventDefault();const b=r.value.trim();r.value="",b&&(i.add(b),g(b))});let x="";r.addEventListener("keydown",m=>{if(m.key==="Tab")m.preventDefault(),k();else if(m.key==="ArrowUp")m.preventDefault(),r.value=i.previous(r.value);else if(m.key==="ArrowDown")m.preventDefault(),r.value=i.next(r.value);else if(m.ctrlKey&&!m.metaKey&&!m.altKey){const b=po(m.key,r.value,r.selectionStart??r.value.length,x);if(!b)return;m.preventDefault(),p(),r.value=b.line,r.setSelectionRange(b.caret,b.caret),x=b.killed}else p()}),a.addEventListener("click",m=>{const b=m.target?.closest("a[data-run]");b?.dataset.run&&(m.preventDefault(),g(b.dataset.run))}),window.addEventListener("keydown",m=>{const y=m.target?.matches("input, textarea, select, [contenteditable]")??!1,T=m.key.length===1&&!m.ctrlKey&&!m.metaKey&&!m.altKey;y||!T||r.focus({preventScroll:!1})}),o.hidden=!1;const M=tt(Mt);M&&(a.innerHTML=M);const A=tt(At);A&&g(A);const D=Ao();if(D){for(const m of D.finished)m.trim()&&(i.add(m.trim()),g(m.trim()));r.value=D.unfinished,r.focus()}return{run:g,moveTo:m=>{l.moveTo(m)&&(c.textContent=l.prompt)}}}const Eo=[{file:"book/index.md",markdown:`---
title: The Emotional and Technical Guide to Rescue Stalled Software
summary: Never rewrite. Never stop delivery. A book about rescuing stalled software, 2024, 156 pages.
order: 1
isbn: 978-8409652532
published: 2024-10-19
pages: 156
cover: /book/BookGuide.jpeg
---



#  The Emotional and Technical Guide to Rescue Stalled Software

\\

![The cover of the book](/book/BookGuide.jpeg "large")

> Never rewrite. Never stop delivery.

Conquering technical debt without sacrificing your sanity or shipping
schedule. This guide acknowledges both the technical and emotional challenges
developers face when dealing with legacy code.

**Technical mastery.** Practical techniques to transform legacy code into
maintainable, reliable paths, using TDD as a transformation tool.

**Emotional intelligence.** The fear, anxiety and frustration that come from
maintaining unsustainable code, and proven strategies to address them.

**Continuous delivery.** Making impactful changes while keeping continuous
delivery and team momentum.

It grew out of [an essay of the same name](https://drpicox.medium.com/the-emotional-and-technical-guide-to-rescue-stalled-software-e8aad48d95f4)
from 2023 and the pieces that followed it, woven into one argument: TDD is not
a testing tool but a transformation tool, and changes small enough to always
be deliverable are the only kind that rescue a stalled project.

Paperback and Kindle on [Amazon](https://www.amazon.com/Emotional-Technical-Stalled-Software-Stories/dp/8409652536),
and on [Goodreads](https://www.goodreads.com/book/show/220915522-the-emotional-and-technical-guide-to-rescue-stalled-software-and-other-s).
Self-published, 19 October 2024, 156 pages, ISBN 978-8409652532.
`},{file:"code/index.md",markdown:`---
title: Two public APIs of AngularJS are mine
summary: Core work in AngularJS, none of it documentation — the compiler, ngClass, the testing module, two benchmark suites and a directive — and what is still in the final release.
order: 3
---

# Two public APIs  
of AngularJS  
are mine.

\`$compileProvider.commentDirectivesEnabled()\` and
\`$compileProvider.cssClassDirectivesEnabled()\` went into the AngularJS
compiler on 8 August 2016 -- 1,115 lines across eight files -- and they are
still there. They shipped in 1.5.9 and 1.6.0 and they are in 1.8.3, the last
release the framework ever had, in April 2022. The commit message says what
they were for: *this can result in a compilation speed-up of around 10%*. They
are [in the compiler](https://github.com/angular/angular.js/blob/master/src/ng/compile.js)
today, and the argument that got them in is
[in the pull request](https://github.com/angular/angular.js/pull/14850).

\`\`\`
app.config(function ($compileProvider) {
  // Nobody writes directives as <!-- comments --> or as CSS classes any more,
  // so stop the compiler looking for them in every node it visits.
  $compileProvider.commentDirectivesEnabled(false);
  $compileProvider.cssClassDirectivesEnabled(false);
});
\`\`\`

## Where I worked

Not on the documentation. Of the lines I put into AngularJS, thirty-four are
documentation, and they describe the option I had just added. The rest went
into the parts of a framework that people are careful about letting you touch:

The compiler :: Two performance changes in \`src/ng/compile.js\`, both listed under *Performance Improvements* in the changelog, in [1.5.8](https://github.com/angular/angular.js/pull/14848) and [1.5.9](https://github.com/angular/angular.js/pull/14850). Both still in the released bundle.
\`ngClass\` :: [A fix to how it watches](https://github.com/angular/angular.js/pull/14405), in 1.5.5 and backported to 1.4.11. [A test suite](https://github.com/angular/angular.js/commit/7b2ed4ae41956656079c6e411ccf4012aaf611f6). [A benchmark](https://github.com/angular/angular.js/pull/15243). And [the idea and much of the implementation](https://github.com/angular/angular.js/pull/14404) behind the rewrite that shipped in 1.6.1 -- the one with the big number.
The testing module :: [The implementation](https://github.com/angular/angular.js/commit/72b96ef57a28743e2dfed523701cc2e88e3b473b) of \`$componentController\`, the helper \`ngMock\` gives you to unit-test a component's controller without compiling any DOM. Mine since 1.5.0-rc.1, and still mine, verbatim, in 1.8.3.
The benchmarks :: Two benchpress suites, [\`bootstrap-compile-bp\`](https://github.com/angular/angular.js/tree/master/benchmarks/bootstrap-compile-bp) and [\`ng-class-bp\`](https://github.com/angular/angular.js/tree/master/benchmarks/ng-class-bp), both written because a maintainer asked for numbers he could check. Both still in the repository.
A directive :: [\`ngRef\`](https://github.com/angular/angular.js/blob/master/src/ng/directive/ngRef.js), which I [proposed as \`ngAs\`](https://github.com/angular/angular.js/pull/14080) in February 2016 and which [shipped](https://github.com/angular/angular.js/commit/bf841d35120bf3c4655fde46af4105c85a0f1cdc) in June 2018 with my name in the commit.

## The compiler

A maintainer asked, reasonably, for numbers he could check. So I wrote a
benchmark for the compiler in benchpress -- AngularJS's own measuring harness --
and posted what it said: about 12% off compiling Bootstrap's carousel template,
about 10% off its theme. Ten per cent is what this change is worth, and I have
seen much larger figures attributed to me for it. The large number is real, but
it belongs further down this page and to a different change.

[The second compiler change](https://github.com/angular/angular.js/commit/3aedb1a70d9f925cf866ed7ba07f59c7eb13baa3)
is smaller and I like it more: a \`try/catch\` inside the function that
collected comment directives was stopping V8 from optimising the whole
function, so I moved it into a function of its own. Nineteen lines. The
comment I left explaining why is still in the source.

## ngClass, and the hundredfold number

\`ng-class="{lent: book.lendTo}"\` needs exactly one thing from \`book.lendTo\`:
whether it is there. But \`lendTo\` might be a person, and a person has books,
and those books have people. AngularJS was deep-watching the expression --
copying that whole graph and comparing the copy -- on every digest, for every
element on the page. The cost was proportional to your data, and as I wrote in
the pull request at the time, the data could be big enough to take seconds to
copy.

Everyone who knew this wrote the second line instead, so the watcher saw a
boolean:

\`\`\`
<li ng-class="{ lent: book.lendTo }">     <!-- copies the person, and their books, every digest -->
<li ng-class="{ lent: !!book.lendTo }">   <!-- copies true -->
\`\`\`

Everyone who did not know spent the afternoon finding out why the page had
frozen, and the answer was a \`!!\` somebody had forgotten -- or had never heard
of. The fix makes the first line cost what the second one does, so the \`!!\`
stopped being a thing you had to know. That is the whole of it, and it is why
it was worth months.

It shipped in 1.6.1, in [a commit](https://github.com/angular/angular.js/commit/b82097085d53ad89940828d3c0825518569b1e4a)
written by another maintainer on top of [mine](https://github.com/angular/angular.js/pull/14404), and the
changelog entry for it links to my pull request. His commit message:

> In large based on #14404. Kudos to @drpicox for the initial idea and a big
> part of the implementation.

He asked for a benchmark, so I wrote that too: [\`ng-class-bp\`](https://github.com/angular/angular.js/pull/15243),
reviewed and merged into AngularJS's own benchmark suite, where it still is.
It has the case twice: once written the way everyone writes it, and once with
the \`!!\`. On a single element bound to a large object the fix
measured **more than a hundred times faster** -- about 1.5 milliseconds a
digest down to between 0.02 and 0.08, which is to say down to what the \`!!\`
had been buying by hand. On long lists, five to ten times, from seven or
thirteen milliseconds down to about one.

Those are the numbers I posted, from the framework's benchmark, and the
maintainers took them and shipped the change. The same benchmark also says
that on data already written the careful way, by hand, the new code is about
25% *slower*. Which is the honest summary of the whole thing:
it does automatically what an experienced Angular programmer would have done
manually, and it is worth having for the same reason type inference is.

## The testing module

\`$componentController\` is how you unit-test an AngularJS component: give it
the component's name and it hands you the controller, with its bindings,
without compiling a template or touching the DOM. It is the API the component
guide teaches.

\`\`\`
it("greets whoever it is given", inject(function ($componentController) {
  var ctrl = $componentController("greeting", null, { name: "Ada" });
  expect(ctrl.text()).toBe("Hello, Ada");
}));
\`\`\`

I did not invent it. A maintainer added it on 10 January 2016. Two days later I
rewrote how it worked, for two reasons. His version kept a registry inside the
production compiler purely so that a test helper could read it -- test-only
code in \`angular.min.js\` -- and mine derives the same thing from the injector,
entirely inside the testing module. And if two directives shared a name, his
picked whichever had been registered last; mine filters for the one that is a
component, and refuses if there is not exactly one. That second point came out
of [the review](https://github.com/angular/angular.js/pull/13732), where the objection to my version turned out
to be a bug in the existing one, and the design that settled it is the code
that shipped.

It shipped in 1.5.0-rc.1, so the production bundle never carried the extra
bytes in any public release, and it is the implementation in
\`angular-mocks.js\` at 1.8.3, comments included. It is [there
today](https://github.com/angular/angular.js/blob/master/src/ngMock/angular-mocks.js).

## ngRef, and how long it took

\`ngRef\` publishes a controller, or an element, into scope, so that the template
around a component can talk to it:

\`\`\`
<todo-list ng-ref="todos"></todo-list>
<p>{{ todos.remaining() }} left</p>
\`\`\`

I [proposed it](https://github.com/angular/angular.js/pull/14080) on 18
February 2016. It was discussed for two years and three months and
fifty-eight comments. On 1 June 2018 my pull request was closed. Four days
later a maintainer [opened his own](https://github.com/angular/angular.js/pull/16511), rebased from mine with two
changes, and merged that.
The directive shipped in 1.7.1 three days after that. His commit message:

> Thanks to @drpicox for the original implementation: PR #14080.

## Whose name is on the commit

There is no count of anything on this page, and this is why. On that project a
maintainer would take your pull request, rebase it, and land it himself:

> @drpicox I can also make these changes, so just tell me if you'll do it or I
> should. :) -- [a maintainer, July 2016](https://github.com/angular/angular.js/pull/14850#issuecomment-234206359)

Every commit of mine on the main branch was put there by a maintainer's hand,
and GitHub records almost all of my pull requests as never merged -- two of
them my own scaffolding for another. The merge button measures who pressed it.
What it does not measure, one of them wrote down while turning down a different
idea of mine:

> But totally 👍 for all the great ideas and work that you've been putting in
> to this and other features lately-ish. Really great stuff! -- [another, September 2016](https://github.com/angular/angular.js/pull/15112)

## Elsewhere

- [RxJS](https://github.com/Reactive-Extensions/RxJS/pull/1177) -- merged.
- [ducks-modular-redux](https://github.com/erikras/ducks-modular-redux) -- merged,
  and the canonical repository for the Ducks pattern lists two of my
  implementations in its README: \`ducks-reducer\` and \`ducks-middleware\`.
- Merged, too, into webpack's documentation site, \`rollupify\`, \`kata-log\`,
  \`jest-runner-eslint\` and \`fetch-intercept\`.
`},{file:"essays/index.md",markdown:`---
title: Essays with more than half a million views
summary: More than 250 essays on Medium, one every Saturday since 2022, read more than half a million times.
order: 2
---

# Essays with more than half a million views

One every Saturday since 2022, on [Medium](https://drpicox.medium.com), without
missing one. More than 250 of them, in fourteen publications, read more than
half a million times between them. Grouped here by what they are about, and
within each group the ones Medium's members stayed with longest come first.

## Testing

The subject most of them are about, and the one with the longest argument: that the industry's idea of a unit test is what makes tests fragile.

- [Confirmed: Code Coverage Is a Useless Management Metric](https://medium.com/better-programming/confirmed-code-coverage-is-a-useless-management-metric-35afa05e8549)  
  A simple proof that dismantles the metric every tech leader trusts.

- [Two Disks: Code and Tests. You Can Only Save One.](https://drpicox.medium.com/two-disks-code-and-tests-you-can-only-save-one-3628f537ef6e)  
  Rolldown threw away the code and kept the tests. Robert C. Martin's parable, solved.

- [The Unit Test Trap](https://medium.com/p/4a83e4012b17)  
  Do you find your unit tests costly? You have fallen into the trap.

- [QA-Unit Tests vs. Agile-Unit Tests](https://medium.com/p/qa-unit-tests-vs-agile-unit-tests-f437fbd3bc2c)  
  How different agile testing is from traditional testing, and why the confusion costs so much.

- [BDD is not E2E](https://medium.com/p/bdd-is-not-e2e-365a58f13097)  
  Why people confuse the two, and what BDD actually is.

- [What Is Business Rules Coverage?](https://medium.com/p/what-is-business-rules-coverage-a7ec9fe5ebbd)  
  Everyone knows code coverage. You may want to change your focus.

- [Improve Your Testing #1: Play With Your Tests](https://medium.com/p/level-up-testing-1-play-with-tests-bdaa154bc4bf)  
  Turn testing into a game and see the hidden connections between code and tests. The first of nineteen.

## Technical debt and legacy code

What the book is about, in pieces: never rewrite, never stop delivery.

- [The Strangler Fig Pattern](https://drpicox.medium.com/the-strangler-fig-pattern-a8ea077e4480)  
  A pattern from 2004 that every developer should know: never rewrite from scratch, transform incrementally.

- [Technical Debt Is Brain Debt](https://drpicox.medium.com/technical-debt-is-brain-debt-15440a72c773)  
  Teams that stop refactoring may lose the ability to write clean code at all.

- [Refactor All the Things All the Time](https://drpicox.medium.com/refactor-all-the-things-all-the-time-9cfbd49df35e)  
  Stop tiptoeing through the code; make it embrace the next feature.

- [Improving Software Quality through Small Changes](https://drpicox.medium.com/improving-software-quality-through-small-changes-70a3c6cb4e45)  
  Not new developers, not more process: one chain reaction that tips the balance.

- [We've Been Rewriting the Same Software for 70 Years](https://medium.com/p/weve-been-rewriting-the-same-software-for-70-years-691ea9b0e4ec)  
  Languages, architectures and paradigms changed. The applications did not. The limit was never the machine.

- [The Craziest Piece of Software I've Ever Seen](https://drpicox.medium.com/the-craziest-piece-of-software-ive-ever-seen-4605085ceb5b)  
  A library that made computers share memory by crashing on purpose.

## Teams, agile and estimates

How the work actually gets done, against how the method says it does.

- [Scrum vs Extreme Programming: Was XP Right All Along?](https://drpicox.medium.com/scrum-vs-extreme-programming-was-xp-right-all-along-1bb1061e9e6b)  
  Could the most popular methodology be the thing holding teams back?

- [Asking for Estimates: The Telltale Sign of Ineffective Software Development Practices](https://medium.com/p/cd54a9d8c60d)  
  "When will it be done?" is the wrong question.

- [If Developers Nail Estimates, They Are Lying To You](https://medium.com/p/if-developers-nail-estimates-they-are-lying-to-you-1b69a3ad5ad0)  
  Reliable estimates are read as maturity. Are they?

- [Improve Your Story Breakdown](https://medium.com/p/how-to-properly-breakdown-stories-b58b9e44e596)  
  The most effective agile technique, and the most overlooked.

- [Stop Tracking Every Version Manually](https://drpicox.medium.com/if-you-know-which-version-is-in-production-you-are-not-using-continuous-delivery-218714df8a31)  
  If you know which version is in production, you are not doing continuous delivery.

- [This Simulator Shows What Meetings Do to Developer Productivity](https://medium.com/p/this-simulator-shows-why-developers-hate-meetings-16ecf426f43b)  
  That 2 PM meeting just cost you the afternoon. Drag it around and watch.

## Code, languages and architecture

The most read one is here, and the one that argues with Dijkstra.

- [The JavaScript framework war is over](https://medium.com/p/bd110ddab732)  
  And there is only one winner.

- [Software Development Is A Beautiful Mess](https://drpicox.medium.com/software-development-is-a-beautiful-mess-45edab1fab73)  
  In 1968 Dijkstra banned GOTO, and he did it for the wrong reason.

- [Coroutines, The Old Gem That Keeps Making Complex Code Simple](https://drpicox.medium.com/coroutines-the-old-gem-that-keeps-making-complex-code-simple-c44c2fbe473f)  
  A trick from the 1980s, right under our noses, that still untangles overlapping behaviours.

- [What Are Micro-Frontends Really For?](https://drpicox.medium.com/what-are-micro-frontends-for-aad66e9c2cf8)  
  They got lost in the microservices hype; their real value is somewhere else.

- [Domain-Driven Design Was the Key Piece Missing from My Computer Science Degree](https://medium.com/p/domain-driven-design-was-the-key-piece-missing-from-my-computer-science-degree-0819acd7bbc4)  
  What finally connected requirements, design and code.

- [React 19 Broke Update Stability, Keeping Half of Developers Stuck](https://drpicox.medium.com/react-19-broke-update-stability-keeping-half-of-developers-stuck-8f6f152dd695)  
  A two-stage update strategy should have prevented it. It did not.

- [We're All Typing Commands Again](https://drpicox.medium.com/were-all-typing-commands-again-ec3cad3b143d)  
  Keyboards are back, and this time they are solving what the GUI never could.

## Working with an AI

Since December 2022, from the angle of someone who tests things: what an agent is, what it costs, and what it does to the person using it.

- [Context Engineering Makes AI Behave Like Software That Works](https://medium.com/p/context-engineering-makes-ai-behave-like-software-that-works-2adc0c4c7706)  
  Your agent does not run out of skill; it runs out of a clean context. Compaction, subagents, skills, RAG and guardrails, seen as one thing.

- [A Tool Call Is Just Text and a Loop You Own](https://drpicox.medium.com/llms-never-call-tools-5904ac72d686)  
  Tool calling is a calling convention: the model writes a request, your code writes the result back. Real Ollama code, zero credits.

- [An LLM Can't Keep a Secret](https://drpicox.medium.com/an-llm-cant-keep-a-secret-a87216dcc461)  
  It fails at hangman for a reason no bigger model will fix, and solving it shows what tool calls are really for.

- [Don't Chat With Your AI. Mob With It.](https://drpicox.medium.com/dont-chat-with-your-ai-mob-with-it-83358a68f6ac)  
  The chat loop makes you wait. Put the agent in a loop over your files, leave the instructions in the files, and run several at once.

- [Tab, Tab, Tab: Copilot's Ticking Technical and Cognitive Debt](https://medium.com/p/tab-tab-tab-copilots-ticking-technical-and-cognitive-debt-2a009993ef86)  
  Copy-paste on steroids removed the pain that made us better developers.

- [Two Months of Pure Prompting Almost Ruined My Coding](https://medium.com/p/two-months-of-pure-prompting-almost-ruined-my-coding-37023881ba0a)  
  A week without Copilot showed what had been lost, and how to take it back.

- [GitHub Copilot Code Review Is Probably Better Than Your Team](https://medium.com/p/github-copilot-code-review-is-probably-better-than-your-team-816c3de54b86)  
  It is not smarter. It is always available and paying attention.

- [Your AI Is Not Your Intern. It's Your Senior, Junior](https://medium.com/p/your-ai-is-not-your-intern-its-your-senior-junior-1598e97dce5c)  
  An Anthropic trial, 52 developers, half with AI. The deciding factor was not AI versus no AI.

- [The New Role of TDD in the Incoming AI Era](https://medium.com/p/now-tdd-is-more-important-than-ever-dfaf65024d9)  
  December 2022: now that ChatGPT and Copilot are here, TDD matters more than ever.

## In series

Some of them are courses in disguise: *Improve Your Testing*, in nineteen
parts (2024–2025), and *How to TDD with BDD-Gherkin*, in six. And one essay
grew until it became [the book](/book/).
`},{file:"index.md",markdown:`---
title: David Rodenas
summary: PhD. I lay the foundations other engineers build on.
order: 0
---

# I lay  
the foundations  
other engineers build on.

Computer enthusiast, doctor and engineer. Former vice-dean of COEINF, the
professional college of computer engineers of Catalonia. I write every
Saturday and I have not missed one since 2022.

## The book

![The cover of the book](/book/BookGuide.jpeg) *The Emotional and Technical
Guide to Rescue Stalled Software* (2024) is about conquering technical debt
without sacrificing your sanity or your shipping schedule. Its rule fits on one
line: never rewrite, never stop delivery. [About the book.](/book/)

## Essays

> > More than half a million views.

More than 250 of them on [Medium](https://drpicox.medium.com), one every
Saturday since 2022. The most read one, and the ones read longest, argue with
the canon:

- [The JavaScript framework war is over](https://medium.com/p/bd110ddab732)
- [Software Development Is A Beautiful Mess](https://drpicox.medium.com/software-development-is-a-beautiful-mess-45edab1fab73)
- [Scrum vs Extreme Programming: Was XP Right All Along?](https://drpicox.medium.com/scrum-vs-extreme-programming-was-xp-right-all-along-1bb1061e9e6b)
- [Confirmed: Code Coverage Is a Useless Management Metric](https://medium.com/better-programming/confirmed-code-coverage-is-a-useless-management-metric-35afa05e8549)
- [The Craziest Piece of Software I've Ever Seen](https://drpicox.medium.com/the-craziest-piece-of-software-ive-ever-seen-4605085ceb5b)
- [What Are Micro-Frontends Really For?](https://drpicox.medium.com/what-are-micro-frontends-for-aad66e9c2cf8)

[Twenty of them, with a line on each.](/essays/)

## Two public APIs of AngularJS are mine

> I made its compiler faster.

Two performance changes in the AngularJS compiler are mine, and they are in
1.8.3, the last release the framework ever had. So is my implementation of
\`$componentController\`, the helper its testing module gives you to unit-test a
component. So are two benchmark suites I wrote when maintainers asked for
numbers they could check -- one of which measured the \`ngClass\` rewrite built
on my work at more than a hundred times faster on the case that mattered. None
of it is documentation. [The whole account.](/code/)

## The world at the top

The mark in the header is not a picture. It is a planet, grown the moment this
page opened, by the pipeline of a program I wrote before the year 2000 for a
university graphics course: [Mons fractals](https://david-rodenas.com/mons-fractals/),
Java 1.1.8 on MS-DOS, writing worlds out as VRML.

It is a pipeline of filters, and the order is part of the meaning. Start from
an icosahedron. Split every edge and push each new midpoint out or in by a
fraction of the edge it came from, so the first rounds carve continents and the
last ones only roughen a slope. Put in the sea as a minimum radius:
everything below it is raised up to it, which is why a coastline reads as a
coastline and not as a change of colour. Work out the climate from height
above the sea and from latitude, so that a summit is white wherever it stands,
the way the Himalaya is. Only then paint it. Paint first and you get a ball of
one colour.

Reload, and it is a different world. The same pipeline runs here, rewritten in
TypeScript with nothing underneath it, and you can [turn the dials yourself](/worlds/).
`},{file:"kata/index.md",markdown:`---
title: The Bowling Game Kata
summary: Robert C. Martin's kata, with slides and a repository to do it in JavaScript or Java.
order: 5
---

# The Bowling Game Kata

Robert C. Martin published the Bowling Game Kata in 2005 at
[butunclebob.com](http://www.butunclebob.com/ArticleS.UncleBob.TheBowlingGameKata).

He describes the kata intention as:

> A kata is meant to be memorized. Students of a kata study it as a form, not as
> a conclusion. It is not the conclusion of the kata that matters, it's the
> steps that lead to the conclusion. If you want to lean to think the way I
> think, to design the way I design, then you must learn to react to minutia the
> way I react. Following this form will help you to do that. As you learn the
> form, and repeat it, and repeat it, you will condition your mind and body to
> respond the way I respond to the minute factors that lead to design
> decisions. -- Robert C. Martin

It contrasts with other katas that you might know. It is not an exercise of the
resolution of a problem; it is the study of each step to create a solution.

The intention is to show and learn TDD. This kata is a profound study of the
TDD. It presents a list of steps that you must follow in a TDD development.

The way of the kata is simple: repeat step by step, innovate nothing, replicate
what you see. Be careful, do not add extra steps; do not skip any step.

Although you have the code, do not copy blindly. Try to understand each step;
try to see the beauty. Enjoy how the code takes form and how the test transforms
itself. Learn how tests leverage in the code and how the code leverages on
tests. Code changing the internal representation step by step, first adding the
new representation, then adding the setters, changing the getters, and finally
removing the old code. And all in green.

And repeat, and repeat. Once you have finished the kata, wait a week, and repeat
it. Then, wait a few weeks and repeat. Then wait a month and repeat. And then,
repeat the kata twice a while.

## Updated kata

Here you have the slides and the instructions to do the kata in JavaScript and Java.

1. Download the slides for [JavaScript](/docs/BowlingGameKata-JS.pdf) or [Java](/docs/BowlingGameKata-Java.pdf)
2. Clone the repository at [JavaScript](https://classroom.github.com/a/jLHCISqT) or [Java](https://classroom.github.com/a/BC1YAdho)
3. Follow the steps of the kata

There are three sections in the slides:

- The Kata analysis: it replicates the study of a developer of the problem.
- TDD Overview: it explains what is TDD
- The Kata

The last section is the exercise itself. Each slide is meaningful by itself and
deserves a moment of attention. If you look carefully, some slides have a
message on the top right in orange: «commit X.» It starts at zero and increments
in one each time that appears. Some slides also have a green or a red bar; it
represents the current state of tests. Red if tests are failing, green if tests
pass after the current slide.

The code is in a git repository. It starts in the «commit 0,» and it expects
from you to replicate each slide in it. Be careful, and go slide by slide. Each
time that you finish copying the changes of a slide verify two things: the
commit number and the test bar status. If the test bar status matches the
condition of your current tests, and there is a commit number, then commit the
git repository with the commit number as a message. Once you have finished it,
remember to push changes.
`},{file:"simulators/developer-meetings.md",markdown:`---
title: Developer Meetings Simulator
summary: How the kind and timing of meetings affect focus, fatigue and how many features a week finishes.
order: 2
---

# Developer Meetings Simulator

How different meeting types and schedules, through their effect on focus and
fatigue, change what a developer delivers over several weeks.

## How it works

1. **Focus and fatigue**: each hour of work adds to both. What gets done in that hour is the difference, clamped between 0 and 100.
2. **Meetings** produce nothing, and move focus and fatigue by what that kind of meeting does to a person. Lunch resets both; a planning session drains focus and adds fatigue.
3. **A feature** is finished when the hours add up to its size. Finishing one costs the focus that was built up for it.
4. **Weeks** are five days of eight hours, 9:00 to 17:00.

## The simulation

Pick a meeting type, then click and drag on the calendar to schedule it. Click
a meeting to remove it. Everything recalculates as you change it.

::developer-meetings

## Things to try

- **High focus, low fatigue**: focus 75, fatigue 10, and few meetings. Watch the features pile up.
- **A meeting-heavy week**: several boring meetings a day. Watch the compound effect on delivery.
- **No lunch**: remove the lunches and watch fatigue build through the afternoon.
- **Planning on Monday**: put the sprint planning first thing, and compare with spreading it through the week.

## What it tends to show

Breaks that reduce fatigue pay for themselves. Meetings that break focus cost
more than their length. Where a disruptive meeting sits in the day matters as
much as whether it happens. And a consistent rhythm beats an erratic one.
`},{file:"simulators/index.md",markdown:`---
title: Simulators
summary: Two things you can turn the dials of: technical debt, and a week of meetings.
order: 6
---

# Simulators

Software development concepts like technical debt or team dynamics are
abstract and hard to visualise. These two are not lectures: they are small
models you can turn the dials of and watch.

- [Technical debt](/simulators/technical-debt/) -- how shortcuts create compound productivity losses over time: the true cost of a shortcut, the break-even point between clean and debt-driven development, and what the interest rate does to it.
- [Developer meetings](/simulators/developer-meetings/) -- how the kind and the timing of meetings affect a developer's focus and fatigue, and with them how many features a week actually finishes. Paint a calendar and see.

Use \`ls\` to see them, or \`cat technical-debt\` to read one here.
`},{file:"simulators/technical-debt.md",markdown:`---
title: Technical Debt Simulator
summary: How shortcuts create compound productivity losses over time.
order: 1
---

# Technical Debt Simulator

The compound effect of technical debt on productivity. Taking shortcuts saves
time at first, and creates interest that slows every feature after.

The simulator models two teams building the same features:

1. **Clean development**: a consistent pace, no shortcuts, steady productivity.
2. **Debt-driven development**: an initial boost from shortcuts, then a compound slowdown.

::technical-debt

## What the dials do

- **Base time**: how long a feature takes when it is done properly.
- **Shortcuts**: how much of that time a shortcut saves, at first.
- **Interest**: how much dearer each shortcut feature makes the next one.
- **Timeline**: how far ahead to look.

## What it shows

The moment when clean development overtakes debt-driven development in total
features is the break-even point. Short-term gains become long-term losses;
the higher the interest, the sooner. Zero interest is the only case where the
shortcut wins, and zero interest is not a thing that happens to real code:
skipped tests, quick fixes and accumulated complexity are all paid for by
whoever touches the code next.

## Real-world implications

This is what happens in projects that skip tests, documentation or design,
take quick fixes instead of proper solutions, and let complexity accumulate.
The hidden cost is not the shortcut. It is every change that comes after it.
`},{file:"talks/index.md",markdown:`---
title: Talks
summary: Twenty-one years of them: two international conferences as first author, the Barcelona JavaScript circuit of 2013–2017, and ten public talks about algorithms since 2024.
order: 4
---

# Twenty-one years  
of standing up  
and explaining.

The archive holds more than sixty decks between 2013 and 2024, and about forty
occasions I can date and name. The early ones were written as repositories, so
they could be read and run, and they are still on GitHub: [GruntJS](https://github.com/drpicox/tutorial-gruntjs-v1),
[Promises](https://github.com/drpicox/tutorial-promises-v1), [JS & Patterns](https://github.com/drpicox/tutorial-jspatterns-v1),
[AngularJS for designers](https://github.com/drpicox/tutorial-angulardesigners-v1). Most of the rest
were written for a room.

## The one I am proudest of, and never put on a CV

On **21 June 2016** I moderated a public Q&A with **Miško Hevery**, who created
AngularJS, at the FIB, the computing faculty of the UPC in Barcelona. My deck
for it is not slides. It is the list of questions: dependency injection, the
hierarchical injector, why TypeScript, what the web looks like in five years.

## Barcelona, 2013–2017

The years of the meetups. I spoke at BarcelonaJS and helped organise it, and
co-organised the WeNode conference in 2014.

2013-05 :: **[GruntJS](https://github.com/drpicox/tutorial-gruntjs-v1)**, BarcelonaJS.
2013-09 :: **[Promises](https://github.com/drpicox/tutorial-promises-v1)**, BarcelonaJS -- promises against callbacks, when that was the argument.
2014-05-25 :: **[JS & Patterns](https://github.com/drpicox/tutorial-jspatterns-v1)**, BarcelonaJS. Given again a year later.
2016-01-29/31 :: Three talks across one weekend at the **first AngularCamp Barcelona** -- an un-conference backed by Google Developers, born out of the AngularBeers meetup: *Angular Community and API Decisions*, *MVC: the Model, the great forgotten*, and *Modules in Angular 2*.
2016-03 and 2016-07 :: **MVS: MVC in Angular**, twice, the second time with exercises.
2016-06 :: **The Bowling Game Kata**, twice in a fortnight. It is [still here](/kata/).
2016-11 → 2017-12 :: **Testing**, four times, and each time a different room: a workshop, then *from the company to the university and back*, then *company, university and professionalism*.
2017-03-17 :: **Jornades de l'Institut Bernat el Ferrer**, Molins de Rei -- a secondary school. The history of software engineering from Dijkstra in 1968 to Agile in 2001, TDD with a calculator, and how to get into university.

## Before that, the conferences

2005 :: **IPDPS**, Denver. First author and speaker on *Optimizing NANOS OpenMP for the IBM Cyclops multithreaded architecture*, with co-authors from IBM T.J. Watson.
2006 :: Co-organiser of the **7th IEEE/ACM Grid Computing Conference**, Barcelona.
2007 :: **HiPEAC industrial workshop** at IBM Haifa, on the Cell simulator.
2011 :: **GbR**, Münster. First author and speaker on parallel graph matching on GPGPUs -- Springer LNCS 6658.
2012 :: Co-organiser of the graph-database track at **FOSDEM**.

## Inside companies, 2017–2023

Training weeks on JavaScript, React and Redux, run twice, in Barcelona and in
Denver. Brown bags and TAST sessions. Sessions on TDD and BDD for teams in two
countries, one of which someone recorded and passed around. And in October 2022,
*TDD is not a stupid idea, it's brilliant* -- BarcelonaJS, in the office.

## Since 2024: algorithms, for people who do not write them

Two talks, ten times, in seven towns. They are about data, algorithms and
generative AI, for families and teachers -- the audience that has to make
decisions about all three and was never given the vocabulary.

2025-02-05 :: **Els nostres fills no són un experiment**, invited to *III Jornada. L'educació a debat*, at the Universitat Pompeu Fabra. [The session is on the university's channel.](https://youtu.be/4i-mpwbL7Fg)
2024 → 2026 :: **Vols una galeta?** -- Badalona, Sabadell, Barcelona, Altafulla, Sant Celoni, Teià, el Masnou. It grew from 125 slides to 188, and then I cut it to 54, which took eight drafts of the script and is the version I would give again.
2026-03-27 :: **Qui crIA els teus fills?**, Escolàpies, el Masnou. Commissioned and paid for by the parents' association -- the only one anybody has ever paid me for. They then recommended me to the town council, which is how the last one happened.
`},{file:"worlds/index.md",markdown:`---
title: Worlds
summary: The fractal planet generator of 1999, in the browser, with the dials exposed.
order: 7
theme: dark
sky: stars
---

# Worlds

[Mons fractals](https://david-rodenas.com/mons-fractals/) was a university
graphics assignment from before the year 2000: Java 1.1.8 on MS-DOS, a pipeline
of filters that grew a planet and wrote it out as VRML for a browser plugin to
fly around. This is the same pipeline, in TypeScript, with nothing underneath
it, and the dials on the outside so you can play.

::worlds

Drag the world to turn it; let it go and it keeps turning. Every dial is one of
the filters:

- **Seed** picks the world. The same seed always grows the same one.
- **Detail** is how many times every edge is split in two. Each round has four times the triangles of the one before; six rounds are 81,920.
- **Roughness** is how far a new midpoint may move, as a fraction of the edge it came from. The 1999 default was 0.1; a little more makes for better mountains at this size, and a lot more makes something that is not a planet.
- **Sea** is the share of the surface under water. The sea is a minimum radius: everything below it is raised up to it.

The pipeline runs in order, and the order is the meaning: raise the land, put
in the sea, work out the climate from height and latitude, and only then
paint. Paint first and there is nothing to paint.
`}],nt="---";function Co(t){return(/^"(.*)"$/.exec(t)??/^'(.*)'$/.exec(t))?.[1]??t}function Do(t){const e=t.replace(/\r\n?/g,`
`).split(`
`);if(e[0]?.trim()!==nt)return{fields:{},body:t.trim()};const n=e.indexOf(nt,1);if(n<0)return{fields:{},body:t.trim()};const o={};for(const a of e.slice(1,n)){const s=a.indexOf(":");s<=0||(o[a.slice(0,s).trim()]=Co(a.slice(s+1).trim()))}return{fields:o,body:e.slice(n+1).join(`
`).trim()}}function Ro(t){const n=t.replace(/\.md$/,"").replace(/(^|\/)index$/,"");return n===""?"/":`/${n}/`}function Po(t){if(t==="/")return null;const e=t.slice(0,-1);return e.slice(0,e.lastIndexOf("/")+1)}function ot(t){if(t==="/")return"/";const e=t.slice(0,-1);return e.slice(e.lastIndexOf("/")+1)}function Fo(t){const{fields:e,body:n}=Do(t.markdown),o=Ro(t.file);return{file:t.file,route:o,parent:Po(o),name:ot(o),title:e.title??ot(o),summary:e.summary??"",order:Number(e.order??"100"),body:n,fields:e}}function at(t,e){return t.order-e.order||t.name.localeCompare(e.name)}class jo{byRoute;constructor(e){const n=e.map(Fo).sort(at);this.byRoute=new Map(n.map(o=>[o.route,o]))}get pages(){return[...this.byRoute.values()]}at(e){return this.byRoute.get(e)}childrenOf(e){return this.pages.filter(n=>n.parent===e).sort(at)}trailTo(e){const n=this.at(e);return n?n.parent===null?[n]:[...this.trailTo(n.parent),n]:[]}}const fe=new jo(Eo);function st(){const t=[...$t,...z.flatMap(i=>i.commands??[])],e=Object.assign({},...z.map(i=>i.apps??{})),o=(i=>i.endsWith("/")?i:`${i}/`)(window.location.pathname),a=fe.at(o);let s=Ze(e),r=null;const c=uo(fe,i=>{s(),s=Ze(e);for(const u of z)u.arrive?.(i);r?.moveTo(i.route)});if(r=Io(fe,a?o:"/",{navigate:c,commands:t}),a)for(const i of z)i.arrive?.(a);const l={run:i=>r?.run(i)};for(const i of z)i.install?.(l)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",st):st();
