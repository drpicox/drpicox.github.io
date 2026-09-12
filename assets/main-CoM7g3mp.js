const U=t=>Math.max(0,Math.min(100,t));function Ue(t){const{focus:e,fatigue:n,featureSize:o,weeks:a,calendar:s,meetingTypes:r}=t,i=[];let l=0,c=0;for(let h=0;h<a;h+=1)for(let u=0;u<5;u+=1){let m=0,y=0;for(let w=0;w<8;w+=1){const v=r[s[`${u}-${w}`]??""];if(v){m=U(m+v.focus),y=U(y+v.fatigue),i.push({week:h,day:u,hour:w,inMeeting:!0,hourFocus:m,hourFatigue:y,hourProductivity:0,accumulatedProductivity:l,completedFeatures:c,featureCompleted:!1});continue}m=U(m+e),y=U(y+n);const b=U(m-y),f=o-l,$=b>f,M=$?f:b;$?(c+=1,l=0):l+=M,i.push({week:h,day:u,hour:w,inMeeting:!1,hourFocus:m,hourFatigue:y,hourProductivity:M,accumulatedProductivity:l,completedFeatures:c,featureCompleted:$}),$&&(m=0)}}return i}function ne(){return Array.from({length:8},()=>new Array(5).fill(0))}function oe(t,{hour:e,day:n},o){const a=t[e];a&&(a[n]=(a[n]??0)+o)}function ze(t,{featureSize:e,weeks:n}){const o=t[t.length-1],a=o?.completedFeatures??0,s=o?.accumulatedProductivity??0,r=a+Math.round(10*s/e)/10,i=a*e+s,l=Array.from({length:5},()=>({productivity:0,features:0,meetings:0})),c={focus:ne(),fatigue:ne(),productivity:ne(),features:ne()};for(const u of t){const m=l[u.day];m.productivity+=u.hourProductivity,u.featureCompleted&&(m.features+=1),u.inMeeting&&(m.meetings+=1),oe(c.focus,u,u.hourFocus),oe(c.fatigue,u,u.hourFatigue),oe(c.productivity,u,u.hourProductivity),u.featureCompleted&&oe(c.features,u,1)}const h=u=>u.map(m=>m.map(y=>n>0?y/n:0));return{totalFeatures:r,totalProductivity:i,averageFeaturesPerWeek:n>0?r/n:0,averageProductivityPerWeek:n>0?i/n:0,days:l,hours:{focus:h(c.focus),fatigue:h(c.fatigue),productivity:h(c.productivity),features:c.features}}}const ie=480,q=240,j={top:10,right:10,bottom:34,left:36};function gt(t,e,n,o){const a=ie-j.left-j.right,s=q-j.top-j.bottom,r=c=>j.top+s-(t>0?c/t*s:0),i=o.map(c=>`<line class="grid" x1="${j.left}" x2="${ie-j.right}" y1="${r(c)}" y2="${r(c)}"/><text x="${j.left-4}" y="${r(c)+3}" text-anchor="end">${c}</text>`).join(""),l=(n>1?[1,Math.ceil(n/2),n]:[]).filter((c,h,u)=>u.indexOf(c)===h).map(c=>`<text x="${j.left+(c-1)/Math.max(1,n-1)*a}" y="${q-j.bottom+14}" text-anchor="middle">${c}</text>`).join("");return`${i}${l}<text x="${j.left+a/2}" y="${q-6}" text-anchor="middle">${e.x}</text><text transform="translate(9 ${j.top+s/2}) rotate(-90)" text-anchor="middle">${e.y}</text>`}function wt(t){if(t<=0)return[0];const e=10**Math.floor(Math.log10(t)),n=t/e>=5?e:t/e>=2?e/2:e/5,o=[];for(let a=0;a<=t;a+=n)o.push(Math.round(a*100)/100);return o}function Yt(t,e){const n=Math.max(...t.map(h=>h.values.length),1),o=Math.max(1,...t.flatMap(h=>h.values)),a=ie-j.left-j.right,s=q-j.top-j.bottom,r=h=>j.left+h/Math.max(1,n-1)*a,i=h=>j.top+s-h/o*s,l=t.map(h=>{const u=h.values.map((m,y)=>`${r(y).toFixed(1)},${i(m).toFixed(1)}`).join(" ");return`<polyline class="line ${h.className}" points="${u}"><title>${h.name}</title></polyline>`}).join(""),c=t.map((h,u)=>`<rect class="${h.className}" x="${j.left+u*90}" y="${q-j.bottom+20}" width="10" height="3"/><text x="${j.left+u*90+14}" y="${q-j.bottom+24}">${h.name}</text>`).join("");return`<svg viewBox="0 0 ${ie} ${q}" role="img" aria-label="${e.y} by ${e.x}">${gt(o,e,n,wt(o))}${l}${c}</svg>`}const Ve=480,z=240,H={top:10,right:10,bottom:34,left:36};function yt(t,e,n){const o=Math.max(...t.map(w=>w.values.length),1),a=Math.max(1,...t.flatMap(w=>w.values)),s=Ve-H.left-H.right,r=z-H.top-H.bottom,i=s/o,l=i*.7/t.length,c=w=>H.top+r-w/a*r,h=t.map((w,v)=>w.values.map((b,f)=>{const $=H.left+f*i+i*.15+v*l;return`<rect class="${w.className}" x="${$.toFixed(1)}" y="${c(b).toFixed(1)}" width="${l.toFixed(1)}" height="${(H.top+r-c(b)).toFixed(1)}"><title>${w.name}: ${Math.round(b*10)/10}</title></rect>`}).join("")).join(""),u=(n??[]).map((w,v)=>`<text x="${H.left+v*i+i/2}" y="${z-H.bottom+14}" text-anchor="middle">${w}</text>`).join(""),m=t.map((w,v)=>`<rect class="${w.className}" x="${H.left+v*90}" y="${z-H.bottom+20}" width="10" height="3"/><text x="${H.left+v*90+14}" y="${z-H.bottom+24}">${w.name}</text>`).join(""),y=gt(a,e,n?0:o,wt(a));return`<svg viewBox="0 0 ${Ve} ${z}" role="img" aria-label="${e.y} by ${e.x}">${y}${h}${u}${m}</svg>`}function p(t,e={},...n){const o=document.createElement(t);for(const[a,s]of Object.entries(e))s===void 0||s===!1||(typeof s=="function"?o.addEventListener(a.slice(2).toLowerCase(),s):s===!0?o.setAttribute(a,""):o.setAttribute(a,String(s)));for(const a of n)a==null||a===!1||o.append(a);return o}const ke=["Mon","Tue","Wed","Thu","Fri"],vt=Array.from({length:8},(t,e)=>`${9+e}:00`);function Kt(t){return t<=500?t:t<=750?500+(t-500)*2:t<1e3?1e3+(t-750)*35:1e4}function Ut(t){return t<=500?t:t<=1e3?500+(t-500)/2:t<1e4?750+(t-1e3)/35:1e3}function ae(t,e){const n=e.flat(),o=Math.min(...n),a=Math.max(...n),s=p("div",{class:"week"},p("span"),...ke.map(r=>p("span",{class:"head"},r)));return e.forEach((r,i)=>{s.append(p("span",{class:"hour"},vt[i]??""));for(const l of r){const c=a>o?(l-o)/(a-o):0;s.append(p("span",{class:"cell",style:`--heat:${(.1+c*.9).toFixed(2)}`},String(Math.round(l))))}}),p("div",{},p("h4",{},t),s)}function zt(t){const e={focus:25,fatigue:15,featureSize:300,weeks:8},n={"🍽️ Lunch":{focus:-100,fatigue:-100},"🏃 Sprint plan":{focus:-100,fatigue:50},"😴 Boring":{focus:-50,fatigue:-25}},o={};for(let x=0;x<5;x+=1)o[`${x}-3`]="🍽️ Lunch";let a="🏃 Sprint plan",s=null;const r=p("div",{class:"figures"}),i=p("div",{class:"chart"}),l=p("div",{class:"maps"}),c=p("div",{class:"week"}),h=p("select"),u=p("input",{type:"number",min:-100,max:100}),m=p("input",{type:"number",min:-100,max:100}),y=p("input",{type:"text",placeholder:"New meeting name",size:16}),w=(x,g,E,d,T=R=>R,W=R=>R)=>{const R=p("output",{},String(e[x])),F=p("input",{type:"range",min:E,max:d,value:W(e[x]),oninput:()=>{e[x]=T(Number(F.value)),R.textContent=String(e[x]),P()}});return p("label",{},`${g}: `,R,F)},v=p("div",{class:"dials"},w("focus","Focus an hour",0,100),w("fatigue","Fatigue an hour",0,100),w("featureSize","Feature size",0,1e3,Kt,Ut),w("weeks","Weeks",1,16));function b(){h.replaceChildren(...Object.keys(n).map(g=>p("option",{value:g,selected:g===a},g)));const x=n[a];u.value=String(x?.focus??0),m.value=String(x?.fatigue??0)}h.addEventListener("change",()=>{a=h.value,b()});const f=()=>{n[a]={focus:Number(u.value)||0,fatigue:Number(m.value)||0},P()};u.addEventListener("change",f),m.addEventListener("change",f);const $=()=>{const x=y.value.trim();!x||n[x]||(n[x]={focus:0,fatigue:0},a=x,y.value="",b())},M=p("div",{class:"row"},p("span",{},"Paint: "),h,p("span",{},"focus "),u,p("span",{},"fatigue "),m,y,p("button",{type:"button",onclick:$},"Add"));let A=null;const S=x=>{if(A==="add"&&!o[x])o[x]=a;else if(A==="remove"&&o[x])delete o[x];else return;P()};function I(){c.replaceChildren(p("span"),...ke.map(x=>p("span",{class:"head"},x))),vt.forEach((x,g)=>{c.append(p("span",{class:"hour"},x));for(let E=0;E<5;E+=1){const d=`${E}-${g}`,T=o[d];c.append(p("span",{class:T?"slot meeting":"slot",title:T??"free",onpointerdown:W=>{W.preventDefault(),A=o[d]?"remove":"add",S(d)},onpointerenter:()=>{A&&S(d)}},T?T.slice(0,2):""))}})}window.addEventListener("pointerup",()=>{A=null});const k=p("div",{class:"row"}),D=()=>{s={summary:ze(Ue({...e,calendar:o,meetingTypes:n}),e),weeks:e.weeks},P()},O=()=>{s=null,P()};function P(){I();const x=Ue({...e,calendar:o,meetingTypes:n}),g=ze(x,e),E=e.weeks*5*8;r.replaceChildren(p("div",{class:"clean"},p("strong",{},g.totalFeatures.toFixed(1)),"features finished"),p("div",{},p("strong",{},g.averageFeaturesPerWeek.toFixed(2)),"features a week"),p("div",{},p("strong",{},Math.round(g.totalProductivity/E).toString()),"productivity an hour"),p("div",{},p("strong",{},String(E)),"hours simulated")),k.replaceChildren(s?p("span",{},`Baseline: ${s.summary.averageFeaturesPerWeek.toFixed(2)} features a week over ${s.weeks} weeks; now ${g.averageFeaturesPerWeek.toFixed(2)}. `):p("span",{},"Keep this run to compare against: "),p("button",{type:"button",onclick:D},s?"Save again":"Save as baseline")),s&&k.append(p("button",{type:"button",onclick:O},"Clear")),i.innerHTML=yt([{name:"Productivity",className:"clean",values:g.days.map(d=>d.productivity/e.weeks)},{name:"Features ×100",className:"debt",values:g.days.map(d=>d.features/e.weeks*100)}],{x:"",y:"A day, on average"},ke),i.prepend(p("h4",{},"The shape of a week")),l.replaceChildren(ae("Focus",g.hours.focus),ae("Fatigue",g.hours.fatigue),ae("Productivity",g.hours.productivity),ae("Features finished",g.hours.features))}b(),t.append(v,M,p("div",{class:"charts"},c,i),r,k,l),P()}const Vt={name:"developer-meetings",apps:{"developer-meetings":zt}};class Xt{listeners=new Set;send(e){for(const n of[...this.listeners])n(e)}on(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}}const xe=new Xt,Zt=900,Qt=480,se={x:1600,y:1e3};function re(t,e){return(t%e+e)%e}class en{x=0;y=0;written="";driving=!1;follow({byRadians:e,tiltedBy:n,seconds:o}){const a=document.documentElement;if(a.dataset.sky!=="stars")return;this.driving||this.takeOver(a);const s=Zt/(Math.PI*2),r=(o/Qt*Math.PI*2+e)*s;this.x=re(this.x+r,se.x),this.y=re(this.y-n*s,se.y);const i=`${(Math.round(this.x*2)/2).toFixed(1)}px ${(Math.round(this.y*2)/2).toFixed(1)}px`;if(i===this.written)return;this.written=i;const[l,c]=i.split(" ");a.style.setProperty("--sky-x",l??"0px"),a.style.setProperty("--sky-y",c??"0px")}release(){const e=document.documentElement;e.classList.remove("sky-driven"),e.style.removeProperty("--sky-x"),e.style.removeProperty("--sky-y"),this.x=0,this.y=0,this.written="",this.driving=!1}takeOver(e){const n=getComputedStyle(document.body,"::before").transform;if(n&&n!=="none")try{const o=new DOMMatrixReadOnly(n);this.x=re(o.m41,se.x),this.y=re(o.m42,se.y)}catch{}e.classList.add("sky-driven"),this.driving=!0}}function tn(t){return xe.on(e=>t.follow(e))}const Xe=new en,nn={name:"sky",install:()=>tn(Xe),arrive:()=>Xe.release()},pe=20;function on(t){const{baseTime:e,shortcutFactor:n,interestRate:o,timeHorizon:a}=t,s=[];let r=null;const i=e;let l=e*(1-n),c=0,h=0,u=0,m=0,y=0,w=0;for(let v=0;v<a*pe;){for(;y<=v;)c+=1,u+=1,y+=i;for(;w<=v;)h+=1,m+=1,w+=l,l*=1+o;if(v+=1,v%pe===0){const b=v/pe;s.push({month:b,cleanCumulative:c,debtCumulative:h,cleanMonthly:u,debtMonthly:m,debtFeatureCost:l}),u=0,m=0,r===null&&c>h&&(r=b)}}return{months:s,breakEvenMonth:r}}const an=[{key:"baseTime",label:"Base time",min:1,max:30,step:1,show:t=>`${t} days`},{key:"shortcutFactor",label:"Shortcuts",min:0,max:.9,step:.05,show:t=>`${Math.round(t*100)}%`},{key:"interestRate",label:"Interest",min:0,max:1,step:.01,show:t=>`${Math.round(t*100)}%`},{key:"timeHorizon",label:"Timeline",min:6,max:60,step:1,show:t=>`${t} months`}];function sn(t){const e={baseTime:20,shortcutFactor:.25,interestRate:.1,timeHorizon:24},n=p("div",{class:"figures"}),o=p("div",{class:"chart"}),a=p("div",{class:"chart"}),s=p("p"),r=p("div",{class:"dials"},...an.map(l=>{const c=p("output",{},l.show(e[l.key])),h=p("input",{type:"range",min:l.min,max:l.max,step:l.step,value:e[l.key],oninput:()=>{e[l.key]=Number(h.value),c.textContent=l.show(e[l.key]),i()}});return p("label",{},`${l.label}: `,c,h)}));function i(){const{months:l,breakEvenMonth:c}=on(e),h=l[l.length-1],u=h?.cleanCumulative??0,m=h?.debtCumulative??0,y=u>0?(u-m)/u*100:0,w=Math.abs(y)<.1?"Even":y>0?"Loss":"Gain",v=Math.abs(y)<.1?"≈0%":`${Math.abs(y).toFixed(1)}%`;n.replaceChildren(p("div",{class:"clean"},p("strong",{},String(u)),"clean features"),p("div",{class:"debt"},p("strong",{},String(m)),"debt features"),p("div",{},p("strong",{},c?`month ${c}`:"never"),"break-even"),p("div",{},p("strong",{},v),`${w.toLowerCase()} on the shortcut road`)),o.innerHTML=Yt([{name:"Clean",className:"clean",values:l.map(b=>b.cleanCumulative)},{name:"Debt-driven",className:"debt",values:l.map(b=>b.debtCumulative)}],{x:"Months",y:"Features"}),o.prepend(p("h4",{},"Cumulative features")),a.innerHTML=yt([{name:"Clean",className:"clean",values:l.slice(1).map(b=>b.cleanMonthly)},{name:"Debt-driven",className:"debt",values:l.slice(1).map(b=>b.debtMonthly)}],{x:"Months",y:"Features a month"}),a.prepend(p("h4",{},"Monthly delivery rate")),s.textContent=e.interestRate===0?"With no interest there is no compound slowdown, and the shortcut simply wins. That is the one case that does not happen to real code.":c?`${Math.round(e.shortcutFactor*100)}% saved at first, ${Math.round(e.interestRate*100)}% interest on every feature: clean development overtakes at month ${c}, and by month ${e.timeHorizon} the shortcut road has delivered ${v} less.`:`${Math.round(e.shortcutFactor*100)}% saved at first, ${Math.round(e.interestRate*100)}% interest on every feature: in ${e.timeHorizon} months the clean road has not yet caught up. Give it longer, or raise the interest.`}t.append(r,n,p("div",{class:"charts"},o,a),s),i()}const rn={name:"technical-debt",apps:{"technical-debt":sn}},cn="theme";function bt(){const t=document.documentElement,e=t.dataset.pageTheme;let n=null;try{n=localStorage.getItem(cn)}catch{n=null}const o=e??(n==="light"||n==="dark"?n:null);o?t.dataset.theme=o:delete t.dataset.theme}const Te="theme";function ln(){return window.matchMedia("(prefers-color-scheme: dark)").matches}function hn(){let t=null;try{t=localStorage.getItem(Te)}catch{t=document.documentElement.dataset.theme??null}return t==="light"||t==="dark"?t:ln()?"dark":"light"}class un{apply(e){const n=e==="toggle"?hn()==="dark"?"light":"dark":e;try{n==="system"?localStorage.removeItem(Te):localStorage.setItem(Te,n)}catch{}return bt(),n}}function dn(t){const e=document.querySelector(".theme-toggle");return e?(e.classList.add("ready"),e.removeAttribute("aria-hidden"),e.removeAttribute("tabindex"),e.addEventListener("click",t),()=>e.removeEventListener("click",t)):()=>{}}const mn={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function C(t){return t.replace(/[&<>"]/g,e=>mn[e]??e)}const kt=["light","dark","system"];function pn(t){return kt.includes(t)}function Ze(t){const e=kt.filter(o=>o!==t),n=o=>`theme ${o}`;return{text:`theme: ${t}
  ${e.map(n).join("   ")}`,html:`<pre>theme: ${t}
  ${e.map(o=>`<a href="#" data-run="${C(n(o))}">${C(n(o))}</a>`).join("   ")}</pre>`}}function fn(t){return{name:"theme",usage:"theme [light|dark|system|auto]",description:"switch the colours, or toggle them",run({site:e,cwd:n},[o]){const a=e.at(n)?.fields.theme;if(a)return{text:`theme: this page keeps its own, ${a}. It works everywhere else.`,error:!0};if(o===void 0)return Ze(t.apply("toggle"));const s=o==="auto"?"system":o;return pn(s)?Ze(t.apply(s)):{text:`theme: ${o}: choose light, dark or system`,error:!0}}}}const gn={name:"theme",commands:[fn(new un)],install:t=>dn(()=>t.run("theme")),arrive:()=>bt()},Ie="header-world";function xt(){try{const t=localStorage.getItem(Ie);if(!t)return null;const e=JSON.parse(t);return[e.seed,e.levels,e.roughness,e.share].every(o=>typeof o=="number"&&Number.isFinite(o))?e:null}catch{return null}}function wn(t){try{localStorage.setItem(Ie,JSON.stringify(t))}catch{}}function yn(){try{localStorage.removeItem(Ie)}catch{}}const N=(1+Math.sqrt(5))/2,vn=[[-1,N,0],[1,N,0],[-1,-N,0],[1,-N,0],[0,-1,N],[0,1,N],[0,-1,-N],[0,1,-N],[N,0,-1],[N,0,1],[-N,0,-1],[-N,0,1]],bn=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];function kn(){const t=vn.map(([e,n,o])=>{const a=Math.hypot(e,n,o);return{direction:[e/a,n/a,o/a],radius:1,surface:0}});return Tt(t,bn.map(e=>[...e]))}const xn=(t,e)=>(t+e)/2;function Tn(t,e,n=xn){const o=Array.from({length:t.vertexCount},(i,l)=>({direction:[t.directions[l*3]??0,t.directions[l*3+1]??0,t.directions[l*3+2]??0],radius:t.radii[l]??1,surface:t.surface[l]??0})),a=new Map,s=(i,l)=>{const c=i<l?`${i}:${l}`:`${l}:${i}`,h=a.get(c);if(h!==void 0)return h;const u=o[i],m=o[l],[y,w,v]=u.direction,[b,f,$]=m.direction,M=Math.hypot(y*u.radius-b*m.radius,w*u.radius-f*m.radius,v*u.radius-$*m.radius),[A,S,I]=[(y+b)/2,(w+f)/2,(v+$)/2],k=Math.hypot(A,S,I)||1,D=n(u.surface,m.surface);o.push({direction:[A/k,S/k,I/k],radius:(u.radius+m.radius)/2+e(M),surface:D});const O=o.length-1;return a.set(c,O),O},r=[];for(let i=0;i<t.faceCount;i+=1){const l=t.faces[i*3],c=t.faces[i*3+1],h=t.faces[i*3+2],u=s(l,c),m=s(c,h),y=s(h,l);r.push([l,u,y],[c,m,u],[h,y,m],[u,m,y])}return Tt(o,r)}function Tt(t,e){const n=new Float32Array(t.length*3),o=new Float32Array(t.length),a=new Float32Array(t.length);t.forEach((r,i)=>{n[i*3]=r.direction[0],n[i*3+1]=r.direction[1],n[i*3+2]=r.direction[2],o[i]=r.radius,a[i]=r.surface});const s=new Uint32Array(e.length*3);return e.forEach(([r,i,l],c)=>{s[c*3]=r,s[c*3+1]=i,s[c*3+2]=l}),{directions:n,radii:o,surface:a,faces:s,faceCount:e.length,vertexCount:t.length}}function $n(t){let e=t>>>0;return()=>{e=e+1831565813>>>0;let n=Math.imul(e^e>>>15,1|e);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function Sn(t){const e=kn();return{seed:t,mesh:e,temperature:new Float32Array(e.vertexCount),faceColour:new Uint8ClampedArray(e.faceCount*3),seaRadius:0}}function Mn(t,e){return{...t,mesh:e,temperature:new Float32Array(e.vertexCount),faceColour:new Uint8ClampedArray(e.faceCount*3)}}function An(t,e){return Math.abs(t.mesh.directions[e*3+1]??0)}function $t(t,e,n){const o=t.mesh.faces[n*3]??0,a=t.mesh.faces[n*3+1]??0,s=t.mesh.faces[n*3+2]??0;return((e[o]??0)+(e[a]??0)+(e[s]??0))/3}function In(t,e){return $t(t,t.mesh.radii,e)}const St=(t=4,e=.28,n=.2)=>o=>{const a=$n(o.seed);let s=o.mesh;const r=Float32Array.from(s.surface,()=>a());s={...s,surface:r};for(let i=0;i<t;i+=1)s=Tn(s,l=>l*e*(a()-.5),(l,c)=>{const h=.5+(a()-.5)*(l-c)*n;return Math.min(1,Math.max(0,l*(1-h)+c*h))});return Mn(o,s)},Mt=({equator:t=1,pole:e=.05,peak:n=0}={})=>o=>{const a=new Float32Array(o.mesh.vertexCount),s=o.mesh.radii,r=s.reduce((c,h)=>Math.min(c,h),1/0),l=s.reduce((c,h)=>Math.max(c,h),-1/0)-r||1;for(let c=0;c<o.mesh.vertexCount;c+=1){const h=((s[c]??1)-r)/l,u=An(o,c)**2.2;a[c]=t+(e-t)*u+(n-t)*h}return{...o,temperature:a}},At=(t=.55)=>e=>{const n=Float32Array.from(e.mesh.radii).sort(),o=Math.min(n.length-1,Math.floor(n.length*t)),a=n[o]??1,s=Float32Array.from(e.mesh.radii,r=>Math.max(r,a));return{...e,mesh:{...e.mesh,radii:s},seaRadius:a}},En=[24,92,168],Cn=[62,176,206],Dn=[214,196,138],Qe=[190,158,84],fe=[70,138,66],Rn=[74,104,76],Pn=[136,128,116],et=[238,243,247];function G(t,e,n){const o=Math.min(1,Math.max(0,n));return[t[0]+(e[0]-t[0])*o,t[1]+(e[1]-t[1])*o,t[2]+(e[2]-t[2])*o]}function jn(t){return t>.78?Qe:t>.62?G(fe,Qe,(t-.62)/.16):t>.3?fe:G(Rn,fe,(t-.12)*5.5)}const It=t=>{const e=new Uint8ClampedArray(t.mesh.faceCount*3),n=t.mesh.radii.reduce((a,s)=>Math.max(a,s),-1/0),o=Math.max(1e-6,n-t.seaRadius);for(let a=0;a<t.mesh.faceCount;a+=1){const s=(In(t,a)-t.seaRadius)/o,r=$t(t,t.temperature,a);let i;s<=.002?(i=G(Cn,En,.55),r<.16&&(i=G(i,et,(.16-r)*6))):(i=G(Dn,jn(r),Math.min(1,s*9)),i=G(i,Pn,Math.max(0,s-.55)*2.2),r<.26&&(i=G(i,et,(.26-r)*4))),e[a*3]=i[0],e[a*3+1]=i[1],e[a*3+2]=i[2]}return{...t,faceColour:e}},Fn=[St(),At(),Mt(),It];function On(t,e=Fn){return e.reduce((n,o)=>o(n),Sn(t))}function Et(t){return On(t.seed,[St(t.levels,t.roughness),At(t.share),Mt(),It])}const tt=.3,Ln=[-.5,.45,.74],Wn=1.02;class Ee{size;pixels;depth;view=new Float32Array(0);screen=new Float32Array(0);constructor(e,n=new Uint8ClampedArray(e*e*4)){if(n.length!==e*e*4)throw new Error(`SphereRaster: ${e}×${e} needs ${e*e*4} bytes, not ${n.length}`);this.size=e,this.pixels=n,this.depth=new Float32Array(e*e)}paint(e,n){const{size:o,pixels:a,depth:s}=this;a.fill(0),s.fill(-1/0);const[r,i,l]=Bn(n.light??Ln),c=n.tilt??-.38,h=Math.cos(c),u=Math.sin(c),m=Math.cos(n.rotation),y=Math.sin(n.rotation),{directions:w,radii:v,faces:b,faceCount:f,vertexCount:$}=e.mesh;let M=1;for(let k=0;k<$;k+=1){const D=v[k]??1;D>M&&(M=D)}const A=o/(2*M*Wn);this.view.length<$*3&&(this.view=new Float32Array($*3),this.screen=new Float32Array($*3));const S=this.view,I=this.screen;for(let k=0;k<$;k+=1){const D=v[k]??1,O=(w[k*3]??0)*D,P=(w[k*3+1]??0)*D,x=(w[k*3+2]??0)*D,g=O*m-x*y,E=O*y+x*m,d=P*h+E*u,T=-P*u+E*h;S[k*3]=g,S[k*3+1]=d,S[k*3+2]=T,I[k*3]=o/2+g*A,I[k*3+1]=o/2-d*A,I[k*3+2]=T}for(let k=0;k<f;k+=1){const D=b[k*3]??0,O=b[k*3+1]??0,P=b[k*3+2]??0,x=I[D*3],g=I[D*3+1],E=I[D*3+2],d=I[O*3],T=I[O*3+1],W=I[O*3+2],R=I[P*3],F=I[P*3+1],B=I[P*3+2],le=(d-x)*(F-g)-(T-g)*(R-x);if(le>=0)continue;const De=S[D*3],Re=S[D*3+1],Pe=S[D*3+2],je=S[O*3]-De,Fe=S[O*3+1]-Re,Oe=S[O*3+2]-Pe,Le=S[P*3]-De,We=S[P*3+1]-Re,Be=S[P*3+2]-Pe,He=Fe*Be-Oe*We,Ne=Oe*Le-je*Be,_e=je*We-Fe*Le,he=Math.hypot(He,Ne,_e)||1,Lt=He/he*r+Ne/he*i+_e/he*l,ue=tt+(1-tt)*Math.max(0,Lt),Wt=(e.faceColour[k*3]??0)*ue,Bt=(e.faceColour[k*3+1]??0)*ue,Ht=(e.faceColour[k*3+2]??0)*ue,Nt=Math.max(0,Math.floor(Math.min(x,d,R))),_t=Math.min(o-1,Math.ceil(Math.max(x,d,R))),Gt=Math.max(0,Math.floor(Math.min(g,T,F))),qt=Math.min(o-1,Math.ceil(Math.max(g,T,F)));for(let ee=Gt;ee<=qt;ee+=1)for(let te=Nt;te<=_t;te+=1){const de=te+.5,me=ee+.5,Jt=(d-x)*(me-g)-(T-g)*(de-x),Ge=(R-d)*(me-T)-(F-T)*(de-d),qe=(x-R)*(me-F)-(g-F)*(de-R);if(Jt>0||Ge>0||qe>0)continue;const Je=Ge/le,Ye=qe/le,Ke=E*Je+W*Ye+B*(1-Je-Ye),Y=ee*o+te;Ke<=s[Y]||(s[Y]=Ke,a[Y*4]=Wt,a[Y*4+1]=Bt,a[Y*4+2]=Ht,a[Y*4+3]=255)}}return a}}function Bn([t,e,n]){const o=Math.hypot(t,e,n)||1;return[t/o,e/o,n/o]}const Hn=.2,Nn=.36,_n=[{upTo:20,dark:4,bright:12},{upTo:70,dark:6,bright:14},{upTo:160,dark:2,bright:10},{upTo:198,dark:3,bright:11},{upTo:275,dark:1,bright:9},{upTo:330,dark:5,bright:13},{upTo:360,dark:4,bright:12}];function Gn(t,e,n){const o=Math.max(t,e,n),a=Math.min(t,e,n),s=(o+a)/2/255;if((o===0?0:(o-a)/o)<Hn)return s<.08?0:s<.5?8:s<.8?7:15;const i=o-a;let l;o===t?l=(e-n)/i*60:o===e?l=(2+(n-t)/i)*60:l=(4+(t-e)/i)*60,l<0&&(l+=360);const c=_n.find(({upTo:h})=>l<h)??{dark:4,bright:12};return s<.08?0:s>=Nn?c.bright:c.dark}function qn(t,e){const n=(a,s)=>{const r=(s*e+a)*4;return(t[r+3]??0)===0?-1:Gn(t[r]??0,t[r+1]??0,t[r+2]??0)},o=[];for(let a=0;a<e/2;a+=1){const s=[];for(let r=0;r<e;r+=1)s.push({top:n(r,a*2),bottom:n(r,a*2+1)});o.push(s)}return o}const V=["#000000","#0000aa","#00aa00","#00aaaa","#aa0000","#aa00aa","#aa5500","#aaaaaa","#555555","#5555ff","#55ff55","#55ffff","#ff5555","#ff55ff","#ffff55","#ffffff"];function Jn(t){const e=({top:n,bottom:o})=>n<0&&o<0?"<span> </span>":n<0?`<span style="color:${V[o]}">▄</span>`:o<0?`<span style="color:${V[n]}">▀</span>`:n===o?`<span style="color:${V[n]}">█</span>`:`<span style="color:${V[n]};background:${V[o]}">▀</span>`;return t.map(n=>n.map(e).join("")).join(`
`)}const $e={levels:4,roughness:.28,share:.55},X=32;let ge=null,nt=null,we=null;function ot(t,e){const n=document.querySelector('link[rel="icon"]');if(!n)return;ge??=Object.assign(document.createElement("canvas"),{width:X,height:X});const o=ge.getContext("2d");o&&(we??=o.createImageData(X,X),nt??=new Ee(X,we.data),nt.paint(t,{rotation:e}),o.putImageData(we,0,0),n.type="image/png",n.href=ge.toDataURL("image/png"))}function Ct(t){let e=!0;if(typeof IntersectionObserver!="function")return{onScreen:()=>e,stop:()=>{}};const n=new IntersectionObserver(o=>{for(const a of o)e=a.isIntersecting},{rootMargin:"100px"});return n.observe(t),{onScreen:()=>e,stop:()=>n.disconnect()}}const Yn=90,Kn=1e3/12,Un=400,ye=new WeakMap;function zn(t){const e=(t.textContent??"").split(`
`);return{columns:Math.max(...e.map(n=>n.length)),rows:e.length}}function Se(t,e){ye.get(t)?.();const n=e??{...$e,seed:Math.floor(Math.random()*16777215)},{columns:o,rows:a}=zn(t),s=Math.min(o,a*2),r=Et(n),i=new Ee(s);t.dataset.seed=String(n.seed),t.title=`World ${n.seed}, ${r.mesh.faceCount.toLocaleString("en")} triangles`;const l=b=>{t.innerHTML=Jn(qn(i.paint(r,{rotation:b}),s)),t.classList.add("grown")};if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return l(.6),ot(r,.6),ye.set(t,()=>{}),()=>{};let c=0,h=-1/0,u=-1/0;const m=performance.now(),y=Ct(t),w=b=>{const f=(b-m)/1e3/Yn*Math.PI*2;y.onScreen()&&b-h>=Kn&&(l(f),h=b),b-u>Un&&(ot(r,f),u=b),c=requestAnimationFrame(w)};c=requestAnimationFrame(w);const v=()=>{cancelAnimationFrame(c),y.stop()};return ye.set(t,v),v}function Vn(){const t=document.querySelector(".planet");return t?Se(t,xt()??void 0):()=>{}}const K=360,Xn=60,Zn=1.4,at=Math.PI*2/Xn,st=Math.PI*4;function Qn(t){const e=p("canvas",{class:"world",width:K,height:K}),n=e.getContext("2d");if(!n)return()=>{};const o={...$e,seed:Math.floor(Math.random()*16777215)},a=n.createImageData(K,K),s=new Ee(K,a.data),r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let i,l=.6,c=-.38,h=!r,u=null,m=0,y=performance.now();const w=p("p",{class:"hint"}),v=document.querySelector(".planet"),b=(20*4**$e.levels).toLocaleString("en"),f=()=>{i=Et(o);const g=xt();w.textContent=`World ${o.seed}: ${i.mesh.faceCount.toLocaleString("en")} triangles. `+(g?`The header is keeping world ${g.seed}, ${(20*4**g.levels).toLocaleString("en")} triangles.`:`The header grows a new one every visit, ${b} triangles each.`),M.hidden=!g,A()},$=p("button",{type:"button",onclick:()=>{wn({...o}),v&&Se(v,{...o}),f()}},"Put it in the header"),M=p("button",{type:"button",hidden:!0,onclick:()=>{yn(),v&&Se(v),f()}},"Let the header grow its own"),A=()=>{s.paint(i,{rotation:l,tilt:c}),n.putImageData(a,0,0)};let S=0;const I=Ct(e),k=g=>{const E=Math.min(.1,(g-y)/1e3);if(!u&&I.onScreen()){if(m!==0){m*=Math.exp(-E/Zn);const d=h?at:0;(Math.abs(m)<=d||Math.abs(m)<.01)&&(m=0)}m!==0?(l-=m*E,A()):h&&(l+=at*E,A()),xe.send({byRadians:m*E,tiltedBy:0,seconds:E})}y=g,S=requestAnimationFrame(k)};e.addEventListener("pointerdown",g=>{u={x:g.clientX,y:g.clientY,at:g.timeStamp},m=0,e.setPointerCapture(g.pointerId)}),e.addEventListener("pointermove",g=>{if(!u)return;const E=e.clientWidth||K,d=(g.clientX-u.x)/E*Math.PI;l-=d;const T=c;c=Math.max(-1.2,Math.min(1.2,c-(g.clientY-u.y)/E*Math.PI)),xe.send({byRadians:d,tiltedBy:c-T,seconds:0});const W=Math.max(.004,(g.timeStamp-u.at)/1e3);m=Math.max(-st,Math.min(st,m*.4+d/W*.6)),u={x:g.clientX,y:g.clientY,at:g.timeStamp},A()}),e.addEventListener("pointerup",g=>{u&&g.timeStamp-u.at>120&&(m=0),u=null,y=performance.now()}),e.addEventListener("pointercancel",()=>{u=null,m=0});const D=p("input",{type:"number",min:0,value:o.seed,onchange:()=>{o.seed=Math.max(0,Math.floor(Number(D.value)||0)),f()}}),O=p("button",{type:"button",onclick:()=>{o.seed=Math.floor(Math.random()*16777215),D.value=String(o.seed),f()}},"Another world"),P=p("button",{type:"button",onclick:()=>{h=!h,P.textContent=h?"Hold still":"Turn"}},h?"Hold still":"Turn"),x=(g,E,d,T,W,R)=>{const F=p("output",{},R(o[g])),B=p("input",{type:"range",min:d,max:T,step:W,value:o[g],onchange:()=>{o[g]=Number(B.value),F.textContent=R(o[g]),f()},oninput:()=>{F.textContent=R(Number(B.value))}});return p("label",{},`${E}: `,F,B)};return t.append(e,p("div",{class:"row"},p("span",{},"Seed "),D,O,P,$,M),p("div",{class:"dials"},x("levels","Detail",2,6,1,g=>`${g} splits`),x("roughness","Roughness",.02,1,.01,g=>g.toFixed(2)),x("share","Sea",0,.98,.01,g=>`${Math.round(g*100)}%`)),w),f(),S=requestAnimationFrame(k),()=>{cancelAnimationFrame(S),I.stop()}}const eo={name:"world",apps:{worlds:Qn},install:()=>Vn()},Z=[eo,gn,nn,rn,Vt];function rt(t){const e=[];for(const n of document.querySelectorAll(".app[data-app]")){const o=t[n.dataset.app??""]?.(n);o&&e.push(o)}return()=>{for(const n of e)n()}}function to(t){const e={},n=t.fields.theme;(n==="dark"||n==="light")&&(e["data-page-theme"]=n);const o=t.fields.sky;return o&&(e["data-sky"]=o),e}const no=["data-page-theme","data-sky"];function oo(t,e){return e==="/"?t==="/":t.startsWith(e)}const ao=7.8,it=17,so=12,ro=8,ve=28,ct=44,Q=8,io=16;function co(t){const e=new Map;for(const f of t.nodes){const $=f.label.split(`
`),M=Math.max(...$.map(A=>A.length),1);e.set(f.id,{id:f.id,label:f.label,real:!0,rank:-1,along:Math.max(40,M*ao+so*2),across:$.length*it+ro*2,pos:0,preds:[],succs:[]})}for(const f of t.edges){const $=e.get(f.from),M=e.get(f.to);if(!$||!M)throw new Error(`flow: edge ${f.from} --> ${f.to} names a node that is not there`);$.succs.push(M),M.preds.push($)}lo(e);const n=ho(e,t),o=uo(e);mo(o);const a=o.length,s=o.map(f=>Math.max(it,...f.map($=>$.real?$.across:0))),r=[];let i=Q;for(let f=0;f<a;f+=1)r.push(i),i+=(s[f]??0)+ct;const l=f=>(r[f.rank]??0)+((s[f.rank]??0)-(f.real?f.across:0))/2,c=Math.max(...[...e.values()].map(f=>f.pos+f.along))+Q,h=i-ct+Q,u=t.direction==="LR",m=(f,$)=>u?[$,f]:[f,$],y=[...e.values()].filter(f=>f.real).map(f=>{const[$,M]=m(f.pos,l(f));return{id:f.id,label:f.label,x:$,y:M,width:u?f.across:f.along,height:u?f.along:f.across}}),w=t.edges.map((f,$)=>{const M=n[$]??[],A=M[0],S=M[M.length-1];if(!A||!S)throw new Error("flow: an edge lost its ends");const I=[m(A.pos+A.along/2,l(A)+A.across),...M.slice(1,-1).map(k=>m(k.pos+k.along/2,l(k)+(s[k.rank]??0)/2)),m(S.pos+S.along/2,l(S))];return f.label===void 0?{from:f.from,to:f.to,points:I}:{from:f.from,to:f.to,label:f.label,points:I}}),[v,b]=m(c,h);return{direction:t.direction,width:v,height:b,nodes:y,edges:w}}function lo(t){const e=new Set,n=o=>{if(o.rank>=0)return o.rank;if(e.has(o))throw new Error(`flow: there is a cycle through ${o.id}, and a flow has a direction`);return e.add(o),o.rank=o.preds.length===0?0:Math.max(...o.preds.map(n))+1,e.delete(o),o.rank};for(const o of t.values())n(o)}function ho(t,e){let n=0;return e.edges.map(o=>{const a=t.get(o.from),s=t.get(o.to);if(!a||!s)return[];const r=[a];let i=a;for(let l=a.rank+1;l<s.rank;l+=1){n+=1;const c={id:`\0${n}`,label:"",real:!1,rank:l,along:io,across:0,pos:0,preds:[i],succs:[]};t.set(c.id,c),i.succs.push(c),r.push(c),i=c}return i!==a&&(i.succs.push(s),s.preds.push(i),a.succs.splice(a.succs.indexOf(s),1),s.preds.splice(s.preds.indexOf(a),1)),r.push(s),r})}function uo(t){const e=Math.max(...[...t.values()].map(r=>r.rank))+1,n=Array.from({length:e},()=>[]);for(const r of t.values())n[r.rank]?.push(r);const o=new Map,a=r=>r.forEach((i,l)=>o.set(i,l));n.forEach(a);const s=(r,i)=>i.length===0?o.get(r)??0:i.reduce((l,c)=>l+(o.get(c)??0),0)/i.length;for(let r=0;r<4;r+=1){for(let i=1;i<e;i+=1){const l=n[i]??[];l.sort((c,h)=>s(c,c.preds)-s(h,h.preds)),a(l)}for(let i=e-2;i>=0;i-=1){const l=n[i]??[];l.sort((c,h)=>s(c,c.succs)-s(h,h.succs)),a(l)}}return n}function mo(t){const e=r=>r.reduce((i,l)=>i+l.along,0)+ve*Math.max(0,r.length-1),n=Math.max(...t.map(e));for(const r of t){let i=Q+(n-e(r))/2;for(const l of r)l.pos=i,i+=l.along+ve}const o=r=>r.pos+r.along/2,a=(r,i)=>{for(const l of r){const c=i(l);if(c.length===0)continue;const h=c.reduce((u,m)=>u+o(m),0)/c.length;l.pos=h-l.along/2}for(let l=1;l<r.length;l+=1){const c=r[l-1],h=r[l];if(!c||!h)continue;const u=c.pos+c.along+ve;h.pos<u&&(h.pos=u)}};for(let r=0;r<3;r+=1){for(let i=1;i<t.length;i+=1)a(t[i]??[],l=>l.preds);for(let i=t.length-2;i>=0;i-=1)a(t[i]??[],l=>l.succs)}const s=Math.min(...t.flat().map(r=>r.pos));for(const r of t.flat())r.pos+=Q-s}const Me=/(\w[\w.-]*)(?:\[([^\]]*)\])?/,po=new RegExp(`^${Me.source}\\s*-->(?:\\|([^|]*)\\|)?\\s*${Me.source}$`),fo=new RegExp(`^${Me.source}$`),go=/^(?:flow\s+)?(TD|LR)$/i;function wo(t){const e=new Map,n=[];let o="TD";const a=(i,l)=>{i&&(e.has(i)||e.set(i,i),l!==void 0&&e.set(i,l.replace(/\\n/g,`
`)))},s=t.split(`
`);let r=!0;return s.forEach((i,l)=>{const c=i.trim();if(c===""||c.startsWith("%"))return;if(r){r=!1;const m=go.exec(c);if(m){o=m[1]?.toUpperCase()==="LR"?"LR":"TD";return}}const h=po.exec(c);if(h){const[,m,y,w,v,b]=h;a(m,y),a(v,b),n.push(w===void 0?{from:m??"",to:v??""}:{from:m??"",to:v??"",label:w});return}const u=fo.exec(c);if(u){a(u[1],u[2]);return}throw new Error(`flow: cannot read line ${l+1}: "${c}"`)}),{direction:o,nodes:[...e].map(([i,l])=>({id:i,label:l})),edges:n}}const yo=20,lt=17;function vo(t){let e=5381;for(let n=0;n<t.length;n+=1)e=(e*33^t.charCodeAt(n))>>>0;return e.toString(36)}const L=t=>String(Math.round(t*10)/10);function bo(t,e){const[n,...o]=t.points;if(!n)return"";let a=`M${L(n[0])},${L(n[1])}`,s=n;for(const r of o){const[i,l]=s,[c,h]=r,u=e?[(i+c)/2,l]:[i,(l+h)/2],m=e?[(i+c)/2,h]:[c,(l+h)/2];a+=` C${L(u[0])},${L(u[1])} ${L(m[0])},${L(m[1])} ${L(c)},${L(h)}`,s=r}return a}function ko(t){const{points:e}=t,n=e[Math.floor((e.length-1)/2)]??[0,0],o=e[Math.ceil((e.length-1)/2)]??n;return[(n[0]+o[0])/2,(n[1]+o[1])/2]}function xo(t){const e=co(wo(t)),n=e.direction==="LR",o=`arrow-${vo(t)}`,a=e.edges.map(l=>{const c=`<path class="edge" d="${bo(l,n)}" marker-end="url(#${o})"/>`;if(l.label===void 0)return c;const[h,u]=ko(l);return`${c}<text class="edge-label" x="${L(h)}" y="${L(u)}" text-anchor="middle" dominant-baseline="middle">${C(l.label)}</text>`}).join(""),s=e.nodes.map(l=>{const c=l.x+l.width/2,h=l.label.split(`
`),u=l.y+(l.height-h.length*lt)/2,m=h.map((y,w)=>`<tspan x="${L(c)}" y="${L(u+yo-8+w*lt)}">${C(y)}</tspan>`).join("");return`<g class="node"><rect x="${L(l.x)}" y="${L(l.y)}" width="${L(l.width)}" height="${L(l.height)}" rx="4"/><text text-anchor="middle" dominant-baseline="middle">${m}</text></g>`}).join(""),r=L(e.width),i=L(e.height);return`<figure class="flow"><svg class="flow" viewBox="0 0 ${r} ${i}" width="${r}" height="${i}" style="max-width: 100%; height: auto" role="img"><defs><marker id="${o}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z"/></marker></defs>${a}${s}</svg></figure>`}const To=new Set("var let const function return if else for while do break continue new this true false null undefined class extends import export from default async await throw try catch finally typeof instanceof in of switch case delete void yield".split(" "));function _(t,e){return`<span class="hl-${t}">${C(e)}</span>`}function Dt(t,e,n){for(let o=e+1;o<t.length;o+=1)if(t[o]==="\\")o+=1;else if(t[o]===n)return o+1;return t.length}function $o(t){let e="",n=0;for(;n<t.length;){const o=t.slice(n);let a;if(o.startsWith("//")){const s=t.indexOf(`
`,n),r=s<0?t.length:s;e+=_("c",t.slice(n,r)),n=r}else if(o.startsWith("/*")){const s=t.indexOf("*/",n+2),r=s<0?t.length:s+2;e+=_("c",t.slice(n,r)),n=r}else if(o[0]==='"'||o[0]==="'"||o[0]==="`"){const s=Dt(t,n,o[0]??"");e+=_("s",t.slice(n,s)),n=s}else if(a=/^[A-Za-z_$][\w$]*/.exec(o)){const s=a[0];e+=To.has(s)?_("k",s):C(s),n+=s.length}else(a=/^\d+(?:\.\d+)?/.exec(o))?(e+=_("n",a[0]),n+=a[0].length):(e+=C(o[0]??""),n+=1)}return e}function So(t){let e="",n=0;for(;n<t.length;){const o=t.slice(n);if(o.startsWith("<!--")){const s=t.indexOf("-->",n+4),r=s<0?t.length:s+3;e+=_("c",t.slice(n,r)),n=r;continue}const a=/^<(\/?)([A-Za-z][\w-]*)/.exec(o);if(!a){const s=t.indexOf("<",n+1),r=s<0?t.length:s;e+=C(t.slice(n,r)),n=r;continue}for(e+=`&lt;${a[1]}${_("t",a[2]??"")}`,n+=a[0].length;n<t.length&&t[n]!==">";){const s=t.slice(n);let r;if(r=/^\s+/.exec(s))e+=r[0],n+=r[0].length;else if(r=/^[A-Za-z_:][\w:.-]*/.exec(s))e+=_("a",r[0]),n+=r[0].length;else if(s[0]==="="&&(s[1]==='"'||s[1]==="'")){const i=Dt(t,n+1,s[1]??"");e+=`=${_("s",t.slice(n+1,i))}`,n=i}else e+=C(s[0]??""),n+=1}t[n]===">"&&(e+="&gt;",n+=1)}return e}function Mo(t,e){return e==="js"||e==="javascript"?$o(t):e==="html"?So(t):C(t)}function Ao(t,e){const o=/^https?:/.test(e)?' target="_blank" rel="noopener noreferrer"':"";return`<a href="${C(e)}"${o}>${t}</a>`}const Io=["large","wide"];function Eo(t,e,n){const o=n&&Io.includes(n)?` class="${n}"`:"";return`<img src="${C(e)}" alt="${C(t)}"${o}>`}const Co=/(`[^`]+`|!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)|\[[^\]]+\]\([^)\s]+\))/g,Do=/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/,Ro=/^\[([^\]]+)\]\(([^)\s]+)\)$/;function Rt(t){return t.split(Co).map(e=>{if(e.startsWith("`")&&e.endsWith("`")&&e.length>1)return`<code>${C(e.slice(1,-1))}</code>`;const n=Do.exec(e);if(n)return Eo(n[1]??"",n[2]??"",n[3]);const o=Ro.exec(e);return o?Ao(Rt(o[1]??""),o[2]??""):C(e)}).join("")}function Po(t){return t.split(/(<code>[\s\S]*?<\/code>)/g).map(e=>e.startsWith("<code>")?e:e.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/(^|[^*])\*([^*]+)\*/g,"$1<em>$2</em>").replace(/ {2,}\n/g,"<br>").replace(/\n/g," ").replace(/ -- /g," — ")).join("")}function J(t){return Po(Rt(t))}const ht=/^(?:[-*]|\d+\.)\s/;function jo(t,e,n){if(!ht.test(t[0]??""))return!1;const o=e.slice(n).find(a=>a.trim()!=="");return o!==void 0&&ht.test(o)}function Fo(t){const e=[],n=t.replace(/\r\n?/g,`
`).split(`
`);let o=[],a=!1;return n.forEach((s,r)=>{if(s.startsWith("```")){a=!a,o.push(s),a||(e.push(o),o=[]);return}if(!a&&s.trim()===""){if(jo(o,n,r+1))return;o.length&&e.push(o),o=[];return}o.push(s)}),o.length&&e.push(o),e}function Oo(t){return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function Lo(t){const e=/^(#{1,4})\s+(.*)$/.exec(t[0]??"");if(!e||!t.slice(0,-1).every(s=>/ {2,}$/.test(s)))return null;const o=e[1]?.length??1,a=[e[2]??"",...t.slice(1)].join(`
`);return`<h${o} id="${Oo(a)}">${J(a)}</h${o}>`}function Wo(t){if(!t[0]?.startsWith("```"))return null;const e=t[0].slice(3).trim(),n=t.slice(1,-1).join(`
`);return e==="flow"?xo(n):`<pre><code>${Mo(n,e)}</code></pre>`}function Bo(t,e){const n=[];for(const o of t)e.test(o)?n.push(o.replace(e,"")):n.length&&(n[n.length-1]+=`
${o.trim()}`);return n}function Ho(t){const e=t[0]??"",n=/^\d+\.\s/.test(e),o=/^[-*]\s/.test(e);if(!n&&!o)return null;const a=n?/^\d+\.\s+/:/^[-*]\s+/;if(!t.every(i=>a.test(i)||/^\s/.test(i)))return null;const s=n?"ol":"ul",r=Bo(t,a).map(i=>`<li>${J(i)}</li>`).join("");return`<${s}>${r}</${s}>`}function No(t){return t.every(n=>n.includes(" :: "))?`<dl>${t.map(n=>{const o=n.indexOf(" :: ");return[n.slice(0,o),n.slice(o+4)]}).map(([n,o])=>`<dt>${J(n)}</dt><dd>${J(o)}</dd>`).join("")}</dl>`:null}function _o(t){if(!t.every(n=>n.startsWith(">")))return null;const e=t.map(n=>n.replace(/^>\s?/,"")).join(" ");return`<blockquote>${J(e)}</blockquote>`}function Go(t){const e=/^::([a-z0-9-]+)$/.exec(t[0]??"");return!e||t.length!==1?null:`<div class="app" data-app="${e[1]}"></div>`}function qo(t){return t.length===1&&/^-{3,}$/.test(t[0]??"")?"<hr>":null}function Jo(t){const e=t.length===1&&/^(\\+)$/.exec(t[0]??"");return e?`<div class="space" style="--n:${e[1]?.length??1}"></div>`:null}function Yo(t){return t.length===1&&/^!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)$/.test(t[0]??"")?`<figure>${J(t[0]??"")}</figure>`:null}function Ko(t){return`<p>${J(t.join(`
`))}</p>`}const Uo=[qo,Jo,Lo,Wo,_o,Go,Yo,No,Ho];function Pt(t){return Fo(t).map(e=>{for(const n of Uo){const o=n(e);if(o!==null)return o}return Ko(e)}).join(`
`)}function Ce(t){return t==="/"?"~":`~${t.replace(/\/$/,"")}`}function jt(t,e){return`<p class="ran"><span class="ps1">${C(t)} $</span> ${C(e)}</p>`}function zo(t,e){if(e.parent===null)return"";const n=t.childrenOf(e.route);if(n.length===0)return"";const o=n.map(a=>`<li><a class="entry" href="${a.route}"><code>${C(a.name)}/</code><span class="title">${C(a.title)}</span>`+(a.summary?`<span class="summary">${C(a.summary)}</span>`:"")+"</a></li>").join("");return`${jt(Ce(e.route),"ls")}
<ul class="listing">${o}</ul>`}function Vo(t,e){const n=t.trailTo(e.route).slice(1).map(o=>o.name).join("/");return jt("~",n?`cd ${n} && cat README.md`:"cat README.md")}function Xo(t,e){return`${Vo(t,e)}
${Pt(e.body)}
${zo(t,e)}`}function Zo(t,e){const n=document.querySelector("main");if(!n)return()=>!1;const o=(a,{push:s=!0,keep:r=!1}={})=>{const i=t.at(a);if(!i)return!1;r||(n.innerHTML=Xo(t,i));const l=to(i);for(const c of no){const h=l[c];h?document.documentElement.setAttribute(c,h):document.documentElement.removeAttribute(c)}document.title=i.route==="/"?"David Rodenas":`${i.title} — David Rodenas`;for(const c of document.querySelectorAll("nav .navlink"))oo(a,c.getAttribute("href")??"\0")?c.setAttribute("aria-current","page"):c.removeAttribute("aria-current");return s&&(a===window.location.pathname?window.history.replaceState({route:a},"",a):window.history.pushState({route:a},"",a),r||window.scrollTo({top:0})),window.goatcounter?.count?.({path:a,title:document.title}),e(i,r),!0};return document.addEventListener("click",a=>{if(a.defaultPrevented||a.button!==0||a.metaKey||a.ctrlKey||a.shiftKey||a.altKey)return;const s=a.target?.closest("a[href]");if(!s||s.target||s.dataset.run)return;const r=new URL(s.href,window.location.href);if(r.origin!==window.location.origin)return;const i=r.pathname.endsWith("/")?r.pathname:`${r.pathname}/`;t.at(i)&&(a.preventDefault(),i!==window.location.pathname&&o(i))}),window.addEventListener("popstate",()=>{const a=window.location.pathname.endsWith("/")?window.location.pathname:`${window.location.pathname}/`;o(a,{push:!1})}),o}class Qo{typed=[];drafts=[];index=0;get lines(){return this.typed}add(e){this.typed.push(e),this.drafts=[...this.typed,""],this.index=this.typed.length}previous(e){return this.moveTo(this.index-1,e)}next(e){return this.moveTo(this.index+1,e)}moveTo(e,n){return this.drafts.length===0&&(this.drafts=[""]),e<0||e>=this.drafts.length?n:(this.drafts[this.index]=n,this.index=e,this.drafts[e]??n)}}function ea(t,e,n,o){if(t==="k"){const a=e.slice(n);return{line:e.slice(0,n),caret:n,killed:a||o}}if(t==="u"){const a=e.slice(0,n);return{line:e.slice(n),caret:0,killed:a||o}}return t==="y"?{line:e.slice(0,n)+o+e.slice(n),caret:n+o.length,killed:o}:null}function Ft(t){return t.split(/\s*(?:;|&&)\s*/).map(e=>e.trim().split(/\s+/).filter(Boolean)).filter(e=>e.length>0)}function ce(t,e){const o=e.startsWith("~")||e.startsWith("/")?[]:t.split("/").filter(Boolean),a=e.replace(/^~/,"").split("/").filter(Boolean),s=[...o];for(const r of a)r!=="."&&(r===".."?s.pop():s.push(r));return s.length===0?"/":`/${s.join("/")}/`}function ta(t){return t.replace(/(?:^|\/)(?:README\.md|\*)$/,"")||"."}const na={name:"cat",usage:"cat <file>",description:"print a page, README.md or * for the one here",run({site:t,cwd:e},[n]){if(!n)return{text:"cat: usage: cat <file>",error:!0};const o=ce(e,ta(n)),a=t.at(o);return!a||/\.md$/.test(n)!==/README\.md$/.test(n)?{text:`cat: ${n}: no such file`,error:!0}:{html:Pt(a.body),at:o}}},oa={name:"cd",usage:"cd [dir]",description:"go to a directory (the address follows)",run(t,[e="~"]){const n=ce(t.cwd,e);return t.site.at(n)?(t.cwd=n,{at:n}):{text:`cd: ${e}: no such directory`,error:!0}}},aa={name:"clear",usage:"clear",description:"clear what the shell has printed",run(){return{clear:!0}}},sa={name:"help",usage:"help [command]",description:"this",run({commands:t},[e]){if(e){const s=t.find(r=>r.name===e);return s?{text:`${s.usage}
  ${s.description}`}:{text:`help: ${e}: no such command`,error:!0}}const n=Math.max(...t.map(s=>s.usage.length));return{text:["Commands:",...t.map(s=>`${s.usage.padEnd(n)}  ${s.description}`),"","Tab completes; → takes the grey suggestion. ↑↓ recall. ^K kills to the end of the line, ^U back to the start, ^Y puts it back."].join(`
`)}}};function ra(t){const e=t.filter(o=>o.startsWith("-")).flatMap(o=>o.slice(1).split("")),n=t.find(o=>!o.startsWith("-"))??".";return{flags:e,path:n}}function ia(t,e,n){const o=n==="."?"":`${n.replace(/\/$/,"")}/`;return[{mode:"--r-",name:"README.md",title:t.title,href:t.route,run:`cat ${o}README.md`},...e.map(a=>({mode:"dr-x",name:`${a.name}/`,title:a.title,href:a.route}))]}function ut(t){const e=t.run?` data-run="${C(t.run)}"`:"";return`<a href="${C(t.href)}"${e}>${C(t.name)}</a>`}function ca(t,e){const n=(s,r)=>e?`${s.mode}  ${r.padEnd(20)}  ${s.title}`:r,o=s=>e?`${s.mode}  ${ut(s)}${" ".repeat(Math.max(0,20-s.name.length))}  ${C(s.title)}`:ut(s),a=e?[`total ${t.length}`]:[];return{text:[...a,...t.map(s=>n(s,s.name))].join(`
`),html:`<pre>${[...a,...t.map(o)].join(`
`)}</pre>`}}const la={name:"ls",usage:"ls [-l] [path]",description:"list what a directory holds; -l says what each is",run({site:t,cwd:e},n){const{flags:o,path:a}=ra(n),s=o.find(l=>l!=="l");if(s)return{text:`ls: -${s}: no such option. Try ls -l`,error:!0};const r=ce(e,a),i=t.at(r);return i?ca(ia(i,t.childrenOf(r),a),o.includes("l")):{text:`ls: ${a}: no such directory`,error:!0}}},ha={name:"pwd",usage:"pwd",description:"print where you are",run({cwd:t}){return{text:Ce(t)}}},Ot=[la,oa,na,ha,sa,aa];class ua{context;constructor(e,n,o=Ot){this.context={site:e,cwd:n,commands:o}}get prompt(){return`${Ce(this.context.cwd)} $`}moveTo(e){return this.context.site.at(e)?(this.context.cwd=e,!0):!1}run(e){const n=[];for(const[o="",...a]of Ft(e)){const s=this.context.commands.find(i=>i.name===o),r=s?s.run(this.context,a):{text:`${o}: command not found. Try help`,error:!0};if(n.push(r),r.error)break}return n}complete(e){const n=e.split(/\s+/),o=n.pop()??"",a=n.length===0?"":`${n.join(" ")} `;return(n.length===0?this.commandNames():this.pathNames(o)).filter(r=>r.startsWith(o)).map(r=>a+r)}commandNames(){return this.context.commands.map(e=>e.name).sort()}pathNames(e){const n=e.lastIndexOf("/"),o=n<0?".":e.slice(0,n+1),a=ce(this.context.cwd,o);if(!this.context.site.at(a))return[];const s=n<0?"":o;return["README.md",...this.context.site.childrenOf(a).map(i=>`${i.name}/`)].map(i=>s+i)}}function da(t,e,n){if(t==="")return"help";const a=[...[...e].reverse(),...n].find(s=>s.startsWith(t)&&s!==t);return a?a.slice(t.length):""}const Ae="shell-pending";function ma(t){try{t&&sessionStorage.setItem(Ae,t)}catch{}}function pa(){try{const t=sessionStorage.getItem(Ae)??"";return sessionStorage.removeItem(Ae),t}catch{return""}}function fa(){window.__stopTyped?.();const t=window.__typed??[];if(window.__typed=[],t.length===0)return null;const e=[];let n="";for(const o of t)o==="Enter"?(e.push(n),n=""):o==="Backspace"?n=n.slice(0,-1):n+=o;return{finished:e,unfinished:n}}function ga(t,e,n={}){const o=document.querySelector(".terminal"),a=document.querySelector(".screen"),s=o?.querySelector("form.prompt"),r=s?.querySelector("input"),i=s?.querySelector(".line"),l=s?.querySelector(".suggest"),c=s?.querySelector(".ps1"),h=document.querySelector(".ran.end"),u=h?.querySelector(".ps1"),m=h?.querySelector(".line"),y=h?.querySelector(".typed");if(!o||!a||!s||!r||!i||!l||!c||!h||!u||!m||!y)return null;const w=()=>{c.textContent=v.prompt,u.textContent=v.prompt},v=new ua(t,e,n.commands),b=new Qo;let f=null;const $=d=>{a.append(d)},M=()=>{f?.remove(),f=null},A=()=>{const d=r.selectionStart??r.value.length;i.style.setProperty("--caret",String(d)),i.style.setProperty("--typed",String(r.value.length)),y.textContent=r.value,m.style.setProperty("--caret",String(d)),l.textContent=d===r.value.length?da(r.value,b.lines,v.complete(r.value)):""},S=(d,T=d.length)=>{r.value=d,r.setSelectionRange(T,T),A()},I=d=>{if(d.clear&&a.replaceChildren(),d.html){const T=p("div",{class:d.text?"listing-out":"cat"});T.innerHTML=d.html,$(T)}else d.text&&$(p("pre",{class:d.error?"error":""},d.text))},k=d=>{M();const T=p("p",{class:"echo"},p("span",{class:"ps1"},v.prompt),` ${d}`);$(T);let W=!1;const R=Ft(d).map(F=>F.join(" "));for(let F=0;F<R.length;F+=1){const[B]=v.run(R[F]??"");if(B){if(I(B),B.html&&!B.text&&(W=!0),B.at&&!n.moveTo?.(B.at)){ma(R.slice(F+1).join(" && ")),window.location.assign(B.at);return}if(B.error)break}}w(),A(),W?T.scrollIntoView({block:"start"}):window.scrollTo({top:document.documentElement.scrollHeight})},D=()=>{if(M(),r.value.trim()===""){S("help");return}const d=v.complete(r.value);d.length===1?S(d[0]??r.value):d.length>1&&(f=p("p",{class:"hint"},d.map(T=>T.split(" ").pop()).join("  ")),s.insertAdjacentElement("afterend",f),window.scrollTo({top:document.documentElement.scrollHeight}))};s.addEventListener("submit",d=>{d.preventDefault();const T=r.value.trim();S(""),T&&(b.add(T),k(T))});let O="";r.addEventListener("keydown",d=>{if(d.key==="Tab")d.preventDefault(),D();else if(d.key==="ArrowUp")d.preventDefault(),S(b.previous(r.value));else if(d.key==="ArrowDown")d.preventDefault(),S(b.next(r.value));else if(d.key==="ArrowRight"&&r.selectionStart===r.value.length&&l.textContent)d.preventDefault(),S(r.value+l.textContent);else if(d.ctrlKey&&!d.metaKey&&!d.altKey){const T=ea(d.key,r.value,r.selectionStart??r.value.length,O);if(!T)return;d.preventDefault(),M(),S(T.line,T.caret),O=T.killed}else M()});for(const d of["input","keyup","click","focus","select"])r.addEventListener(d,A);let P=!0;r.addEventListener("input",()=>{P&&r.value!==""&&window.scrollTo({top:document.documentElement.scrollHeight}),P=r.value===""}),document.addEventListener("selectionchange",()=>{document.activeElement===r&&A()}),a.addEventListener("click",d=>{const T=d.target?.closest("a[data-run]");T?.dataset.run&&(d.preventDefault(),k(T.dataset.run))}),window.addEventListener("keydown",d=>{const W=d.target?.matches("input, textarea, select, [contenteditable]")??!1,R=d.key.length===1&&!d.ctrlKey&&!d.metaKey&&!d.altKey;W||!R||r.focus({preventScroll:!1})}),s.addEventListener("click",()=>r.focus()),h.addEventListener("click",()=>r.focus()),A();const x=pa();x&&k(x);const g=fa();if(g){for(const d of g.finished)d.trim()&&(b.add(d.trim()),k(d.trim()));S(g.unfinished),r.focus()}return{run:k,moveTo:d=>{v.moveTo(d)&&(a.replaceChildren(),w(),A())}}}const wa=[{file:"book/index.md",markdown:`---
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
compiler on 8 August 2016 -- 1,115 lines across eight files -- and they were
never taken out. They shipped in 1.5.9 and 1.6.0 that same year, and six years
of releases later they are still in 1.8.3, the last one the framework had, in
April 2022. The commit message says what
they were for: *this can result in a compilation speed-up of around 10%*. They
are [in the compiler](https://github.com/angular/angular.js/blob/master/src/ng/compile.js)
today; [the change itself](https://github.com/angular/angular.js/commit/4c2964d01b55ebb279ea526ae9f44343e513bb8f)
and [the argument that got it in](https://github.com/angular/angular.js/pull/14850) are both there to read.

\`\`\`js
app.config(function ($compileProvider) {
  // Nobody writes directives as comments or classes
  // any more: stop the compiler looking for them.
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
function, so I moved it into a function of its own. Nineteen lines, and
measured on a customer's code over two hundred runs, [about 5% off parsing
and compiling](https://github.com/angular/angular.js/pull/14848). It shipped in 1.5.8. The comment I left
explaining why is still in the source.

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

\`\`\`html
<!-- copies the person, their books, their people -->
<li ng-class="{ lent: book.lendTo }">

<!-- copies true -->
<li ng-class="{ lent: !!book.lendTo }">
\`\`\`

Everyone who did not know spent the afternoon finding out why the page had
frozen, and the answer was a \`!!\` somebody had forgotten -- or had never heard
of. The fix makes the first line cost what the second one does, so the \`!!\`
stopped being a thing you had to know. That is the whole of it, and it is why
it was worth months.

It shipped in 1.6.1, in [a commit](https://github.com/angular/angular.js/commit/b82097085d53ad89940828d3c0825518569b1e4a)
written by another maintainer on top of [mine](https://github.com/angular/angular.js/pull/14404), and the
changelog entry for it links to my pull request. His commit message:

> "In large based on #14404. Kudos to @drpicox for the initial idea and a big
> part of the implementation." -- Georgios Kalpakas, [in the commit that shipped it](https://github.com/angular/angular.js/commit/b82097085d53ad89940828d3c0825518569b1e4a)

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

\`\`\`js
it("greets", inject(function ($componentController) {
  var bindings = { name: "Ada" };
  var hello = $componentController("hello", {}, bindings);
  expect(hello.text()).toBe("Hello, Ada");
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

\`\`\`html
<todo-list ng-ref="todos"></todo-list>
<p>{{ todos.remaining() }} left</p>
\`\`\`

I [proposed it](https://github.com/angular/angular.js/pull/14080) on 18
February 2016. It was discussed for two years and three months and
fifty-eight comments. On 1 June 2018 my pull request was closed. Four days
later a maintainer [opened his own](https://github.com/angular/angular.js/pull/16511), rebased from mine with two
changes, and merged that.
The directive shipped in 1.7.1 three days after that. His commit message:

> "Thanks to @drpicox for the original implementation: PR #14080." -- Martin Staffa, [in the commit](https://github.com/angular/angular.js/commit/bf841d35120bf3c4655fde46af4105c85a0f1cdc)

## Whose name is on the commit

There is no count of anything on this page, and this is why. On that project a
maintainer would take your pull request, rebase it, and land it himself:

> "@drpicox I can also make these changes, so just tell me if you'll do it or I
> should. :)" -- Martin Staffa, [July 2016](https://github.com/angular/angular.js/pull/14850#issuecomment-234206359)

Every commit of mine on the main branch was put there by a maintainer's hand,
and GitHub records almost all of my pull requests as never merged -- two of
them my own scaffolding for another. The merge button measures who pressed it.
What it does not measure, one of them wrote down while turning down a different
idea of mine:

> "But totally 👍 for all the great ideas and work that you've been putting in
> to this and other features lately-ish. Really great stuff!" -- Georgios Kalpakas, [September 2016](https://github.com/angular/angular.js/pull/15112)

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

Two performance changes in the AngularJS compiler are mine. They shipped in
2016 and were never taken out: six years of releases later they are still in
1.8.3, the last one the framework had. So is my implementation of
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
order: 6
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
order: 7
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
summary: Twenty-one years of them: two international conferences as first author, the Barcelona JavaScript circuit of 2013–2017, and since 2022 talks about algorithms for people who do not write them.
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

## Since 2022: algorithms, for people who do not write them

Data, algorithms and generative AI, for neighbours, families and teachers --
the audience that has to make decisions about all three and was never given
the vocabulary. Since 2024 mostly with [Aixeca el cap](https://aixecaelcap.cat/),
a platform for a responsible use of screens, of which I am a member.

2022-10-15 :: **Algorismes i Intel·ligència Artificial, influència en la vida quotidiana** -- the opening talk of the XXII Fòrum TIC Social, the open-air evening that Llefi@net, the citizens' network of Llefià, has held in Plaça Trafalgar in Badalona every summer since 2000. [The slides](https://llefia.org/wpforum/wp-content/uploads/sites/10/2022/10/Algorismes_i_IA_a-_la_vida_quotidiana.pdf) and [their account of the evening](https://llefia.org/blog/2022/11/19/cronica-xxii-forum-tic-social-de-badalona/) are on llefia.org.
2024-07-06 :: **Impacte social de la Intel·ligència Artificial**, the same forum two summers on, in conversation with Ariel Guersenzvaig and Xavier Vinaixa -- and the talk that followed, on screens at school, whose slides I wrote with Marina Gispert. [Documents and video.](https://llefia.org/blog/2024/07/07/documents-i-videos-xxiii-forum-tic-social-2024/)
2025-02-05 :: **Els nostres fills no són un experiment**, invited to *III Jornada. L'educació a debat*, at the Universitat Pompeu Fabra. [The session is on the university's channel.](https://youtu.be/4i-mpwbL7Fg)
2025 → 2026 :: **Vols una galeta?** -- Sabadell, Barcelona, Altafulla, Sant Celoni, Teià, el Masnou. It grew from 125 slides to 188, and then I cut it to 54, which took eight drafts of the script and is the version I would give again.
2026-03-27 :: **Qui crIA els teus fills?**, Escolàpies, el Masnou. Commissioned and paid for by the parents' association -- the only one anybody has ever paid me for. They then recommended me to the town council, which is how the last one happened.
`},{file:"teaching/index.md",markdown:`---
title: Teaching
summary: Six autumns of Laboratori de Software 2 at Tecnocampus, and the platform built for it — posts in markdown compiled into tests for server and client, the server's answers replayed to the client, and a grader that read the repository.
order: 5
---

# The post comes first.  
Then the test.  
Then the code.

Six autumns, 2017 to 2022, of a fourth-year course at the Tecnocampus in
Mataró: *Laboratori de Software 2*. Teams -- of three at first, of five give or
take one later -- each with its own repository and its own game to build: an
adventure game, then planets, then cards, then cities, then cards again. And a
term to build it in, the way software is built: a small piece at a time, on a
branch, through a pull request, with a test.

It was one of three subjects I designed from scratch there, between 2017 and
2023, alongside *Enginyeria del Software III* and *Arquitectura de Serveis* --
with a first-year lab, a front-end course and final-project tutoring around
them. It is the one I built the most for.

The games are the students'. What is mine is what they stood on.

## A post is a test

Before writing code, a student writes a post: a markdown file with a title, a
writer, and a list of steps.

\`\`\`
* Go to the blog section,
* You should see a list of posts,
* The last post title should be "Hello Blog", this post
\`\`\`

The template reads the post and writes the tests -- one in Java for the server,
one in JavaScript for the client -- with one call per step, in the order
written: \`context.goToTheBlogSection()\`, then
\`context.theLastPostTitleShouldBeSThisPost("Hello Blog")\`. Those methods do not
exist yet. Writing them is the work. The generated test carries the post's
checksum, so a post edited after the fact fails until the tests are made again;
the file the student fills in is written once and never overwritten.

If that sounds like BDD, it is -- reinvented so that the specification is a
blog post the team wanted to write anyway, in their own words rather than in
Gherkin's, and compiled into the tests rather than interpreted at run time.

One rule, enforced in code: *the writer of a post cannot be the coder who
implements it.* And the compiler read the steps and refused the vague ones.
Every post had to have at least one step with *should* in it, and to end on
one. A step could not say *given* and *should* at once. A step with *there is*,
*has* or *needs* in it had to say which it was, setup or assertion, or it was
sent back. Every refusal said what it had found, what it had expected, and what
to do about it.

That makes it a harness, in the sense the word has since taken for working
with a coding agent: it did not write the code, it made sure the specification
was one a machine could hold you to, and it told you plainly when it was not.
The same guidance would do an AI good today.

## The server answers once

\`\`\`flow
post[post.md\\ntitle · writer · steps] --> gen[yarn create-tests]
gen --> java[Post_Test.java\\nthe server's test]
gen --> js[Post_Test.spec.js\\nthe client's test]
java -->|mvn test| calls[apiCalls/post.json\\nevery request and answer,\\nsaved only when green]
calls -->|replayed, in order| js
\`\`\`

The server is implemented first. While its test runs, every request the test
makes and every answer it gets is recorded -- and saved only when the test
passes. The client's test for the same post then replays the recording: the
same steps, the same calls, in the same order, without a server running. The
client is tested against what the server actually said. Ask for something the
server was never asked and the test stops, with a diff of the two requests.

The error messages were written for people meeting this for the first time:

> Did you run the backend tests before the frontend tests?

From 2019 the posts were executed as tests, by an interpreter that read them
at run time. From 2022 they were compiled. The same idea, three generations
of it.

## The week is the unit

One small post at a time -- *better little, simple and clear*, the first day's
slide said, and then showed a post that tried to do too much, with the seven
questions it left unanswered. The grade was computed week by week and capped, so
a burst at the end could not stand in for cadence. Roles rotated every week, and
every student did both the server and the client of the same pull request.

## The exam is the same thing, alone

At the start of the term a team took a week over one feature. At the exam each
student had three, alone, in one sitting: the post first, then the code, with
the commit messages prescribed so that the order could be checked. In 2022
every student got a different pairing of scenarios -- ninety-four
permutations for forty-eight people -- and the repositories were harvested
every ten minutes throughout, ten times, so the grade could see when each
thing happened as well as whether it worked.

## From a post to production

\`\`\`flow
write[write the post] --> tests[yarn create-tests\\nwrites both tests, red]
tests --> fill[fill in the Context\\nuntil both are green]
fill --> pr[commit · push · pull request]
pr --> ci[GitHub Actions\\ncreate-tests · mvn test\\njest --coverage · build]
ci -->|every line covered| review[review · merge to main]
review -->|the week's release manager| deploy[deploy.sh\\nboth suites again, then push]
deploy --> heroku[Heroku]
\`\`\`

On every push and every pull request, the repository compiled the posts into
tests, ran the Java suite, ran the JavaScript suite with coverage, refused any
line left uncovered, and built both. The pipeline itself is ordinary; what it
runs is not. Until 2021 the week's release manager deployed to Heroku with a
script that would not push until both suites had passed. In 2022 there was no
release environment, and the first day's slide said so.

## Reading the repository

Grades did not come from a form. In 2019 and 2020 a dashboard over the GitHub
GraphQL API scored each student by role -- posts written, pull requests opened,
reviews given, merges made, server, client, coverage -- and showed each team
its own numbers. In 2022 the grader read the git history itself, and wrote one
page per student and one per team, week by week. It was written five times in
six years, from a GitHub client in 2017 to a reader of git history in 2022,
and the last one is the one I would keep.

The 2021 and 2022 templates are public:
[classroom--cities-game--2021](https://github.com/drpicox/classroom--cities-game--2021)
and
[classroom--cards-game--2022](https://github.com/drpicox/classroom--cards-game--2022).
`},{file:"worlds/index.md",markdown:`---
title: Worlds
summary: The fractal planet generator of 1999, in the browser, with the dials exposed.
order: 8
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
`}],dt="---";function ya(t){return(/^"(.*)"$/.exec(t)??/^'(.*)'$/.exec(t))?.[1]??t}function va(t){const e=t.replace(/\r\n?/g,`
`).split(`
`);if(e[0]?.trim()!==dt)return{fields:{},body:t.trim()};const n=e.indexOf(dt,1);if(n<0)return{fields:{},body:t.trim()};const o={};for(const a of e.slice(1,n)){const s=a.indexOf(":");s<=0||(o[a.slice(0,s).trim()]=ya(a.slice(s+1).trim()))}return{fields:o,body:e.slice(n+1).join(`
`).trim()}}function ba(t){const n=t.replace(/\.md$/,"").replace(/(^|\/)index$/,"");return n===""?"/":`/${n}/`}function ka(t){if(t==="/")return null;const e=t.slice(0,-1);return e.slice(0,e.lastIndexOf("/")+1)}function mt(t){if(t==="/")return"/";const e=t.slice(0,-1);return e.slice(e.lastIndexOf("/")+1)}function xa(t){const{fields:e,body:n}=va(t.markdown),o=ba(t.file);return{file:t.file,route:o,parent:ka(o),name:mt(o),title:e.title??mt(o),summary:e.summary??"",order:Number(e.order??"100"),body:n,fields:e}}function pt(t,e){return t.order-e.order||t.name.localeCompare(e.name)}class Ta{byRoute;constructor(e){const n=e.map(xa).sort(pt);this.byRoute=new Map(n.map(o=>[o.route,o]))}get pages(){return[...this.byRoute.values()]}at(e){return this.byRoute.get(e)}childrenOf(e){return this.pages.filter(n=>n.parent===e).sort(pt)}trailTo(e){const n=this.at(e);return n?n.parent===null?[n]:[...this.trailTo(n.parent),n]:[]}}const be=new Ta(wa);function ft(){const t=[...Ot,...Z.flatMap(c=>c.commands??[])],e=Object.assign({},...Z.map(c=>c.apps??{})),o=(c=>c.endsWith("/")?c:`${c}/`)(window.location.pathname),a=be.at(o);let s=rt(e),r=null;const i=Zo(be,(c,h)=>{s(),s=rt(e);for(const u of Z)u.arrive?.(c);h||r?.moveTo(c.route)});if(r=ga(be,a?o:"/",{moveTo:c=>i(c,{keep:!0}),commands:t}),a)for(const c of Z)c.arrive?.(a);const l={run:c=>r?.run(c)};for(const c of Z)c.install?.(l)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ft):ft();
