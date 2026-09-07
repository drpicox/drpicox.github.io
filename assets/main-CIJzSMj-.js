const Z=e=>Math.max(0,Math.min(100,e));function Pe(e){const{focus:t,fatigue:n,featureSize:o,weeks:a,calendar:s,meetingTypes:r}=e,i=[];let c=0,l=0;for(let d=0;d<a;d+=1)for(let u=0;u<5;u+=1){let f=0,p=0;for(let g=0;g<8;g+=1){const y=r[s[`${u}-${g}`]??""];if(y){f=Z(f+y.focus),p=Z(p+y.fatigue),i.push({week:d,day:u,hour:g,inMeeting:!0,hourFocus:f,hourFatigue:p,hourProductivity:0,accumulatedProductivity:c,completedFeatures:l,featureCompleted:!1});continue}f=Z(f+t),p=Z(p+n);const w=Z(f-p),b=o-c,M=w>b,E=M?b:w;M?(l+=1,c=0):c+=E,i.push({week:d,day:u,hour:g,inMeeting:!1,hourFocus:f,hourFatigue:p,hourProductivity:E,accumulatedProductivity:c,completedFeatures:l,featureCompleted:M}),M&&(f=0)}}return i}function oe(){return Array.from({length:8},()=>new Array(5).fill(0))}function ae(e,{hour:t,day:n},o){const a=e[t];a&&(a[n]=(a[n]??0)+o)}function Fe(e,{featureSize:t,weeks:n}){const o=e[e.length-1],a=o?.completedFeatures??0,s=o?.accumulatedProductivity??0,r=a+Math.round(10*s/t)/10,i=a*t+s,c=Array.from({length:5},()=>({productivity:0,features:0,meetings:0})),l={focus:oe(),fatigue:oe(),productivity:oe(),features:oe()};for(const u of e){const f=c[u.day];f.productivity+=u.hourProductivity,u.featureCompleted&&(f.features+=1),u.inMeeting&&(f.meetings+=1),ae(l.focus,u,u.hourFocus),ae(l.fatigue,u,u.hourFatigue),ae(l.productivity,u,u.hourProductivity),u.featureCompleted&&ae(l.features,u,1)}const d=u=>u.map(f=>f.map(p=>n>0?p/n:0));return{totalFeatures:r,totalProductivity:i,averageFeaturesPerWeek:n>0?r/n:0,averageProductivityPerWeek:n>0?i/n:0,days:c,hours:{focus:d(l.focus),fatigue:d(l.fatigue),productivity:d(l.productivity),features:l.features}}}const ie=480,K=240,C={top:10,right:10,bottom:34,left:36};function tt(e,t,n,o){const a=ie-C.left-C.right,s=K-C.top-C.bottom,r=l=>C.top+s-(e>0?l/e*s:0),i=o.map(l=>`<line class="grid" x1="${C.left}" x2="${ie-C.right}" y1="${r(l)}" y2="${r(l)}"/><text x="${C.left-4}" y="${r(l)+3}" text-anchor="end">${l}</text>`).join(""),c=(n>1?[1,Math.ceil(n/2),n]:[]).filter((l,d,u)=>u.indexOf(l)===d).map(l=>`<text x="${C.left+(l-1)/Math.max(1,n-1)*a}" y="${K-C.bottom+14}" text-anchor="middle">${l}</text>`).join("");return`${i}${c}<text x="${C.left+a/2}" y="${K-6}" text-anchor="middle">${t.x}</text><text transform="translate(9 ${C.top+s/2}) rotate(-90)" text-anchor="middle">${t.y}</text>`}function nt(e){if(e<=0)return[0];const t=10**Math.floor(Math.log10(e)),n=e/t>=5?t:e/t>=2?t/2:t/5,o=[];for(let a=0;a<=e;a+=n)o.push(Math.round(a*100)/100);return o}function It(e,t){const n=Math.max(...e.map(d=>d.values.length),1),o=Math.max(1,...e.flatMap(d=>d.values)),a=ie-C.left-C.right,s=K-C.top-C.bottom,r=d=>C.left+d/Math.max(1,n-1)*a,i=d=>C.top+s-d/o*s,c=e.map(d=>{const u=d.values.map((f,p)=>`${r(p).toFixed(1)},${i(f).toFixed(1)}`).join(" ");return`<polyline class="line ${d.className}" points="${u}"><title>${d.name}</title></polyline>`}).join(""),l=e.map((d,u)=>`<rect class="${d.className}" x="${C.left+u*90}" y="${K-C.bottom+20}" width="10" height="3"/><text x="${C.left+u*90+14}" y="${K-C.bottom+24}">${d.name}</text>`).join("");return`<svg viewBox="0 0 ${ie} ${K}" role="img" aria-label="${t.y} by ${t.x}">${tt(o,t,n,nt(o))}${c}${l}</svg>`}const Oe=480,Q=240,O={top:10,right:10,bottom:34,left:36};function ot(e,t,n){const o=Math.max(...e.map(g=>g.values.length),1),a=Math.max(1,...e.flatMap(g=>g.values)),s=Oe-O.left-O.right,r=Q-O.top-O.bottom,i=s/o,c=i*.7/e.length,l=g=>O.top+r-g/a*r,d=e.map((g,y)=>g.values.map((w,b)=>{const M=O.left+b*i+i*.15+y*c;return`<rect class="${g.className}" x="${M.toFixed(1)}" y="${l(w).toFixed(1)}" width="${c.toFixed(1)}" height="${(O.top+r-l(w)).toFixed(1)}"><title>${g.name}: ${Math.round(w*10)/10}</title></rect>`}).join("")).join(""),u=(n??[]).map((g,y)=>`<text x="${O.left+y*i+i/2}" y="${Q-O.bottom+14}" text-anchor="middle">${g}</text>`).join(""),f=e.map((g,y)=>`<rect class="${g.className}" x="${O.left+y*90}" y="${Q-O.bottom+20}" width="10" height="3"/><text x="${O.left+y*90+14}" y="${Q-O.bottom+24}">${g.name}</text>`).join(""),p=tt(a,t,n?0:o,nt(a));return`<svg viewBox="0 0 ${Oe} ${Q}" role="img" aria-label="${t.y} by ${t.x}">${p}${d}${u}${f}</svg>`}function h(e,t={},...n){const o=document.createElement(e);for(const[a,s]of Object.entries(t))s===void 0||s===!1||(typeof s=="function"?o.addEventListener(a.slice(2).toLowerCase(),s):s===!0?o.setAttribute(a,""):o.setAttribute(a,String(s)));for(const a of n)a==null||a===!1||o.append(a);return o}const ke=["Mon","Tue","Wed","Thu","Fri"],at=Array.from({length:8},(e,t)=>`${9+t}:00`);function Dt(e){return e<=500?e:e<=750?500+(e-500)*2:e<1e3?1e3+(e-750)*35:1e4}function Rt(e){return e<=500?e:e<=1e3?500+(e-500)/2:e<1e4?750+(e-1e3)/35:1e3}function se(e,t){const n=t.flat(),o=Math.min(...n),a=Math.max(...n),s=h("div",{class:"week"},h("span"),...ke.map(r=>h("span",{class:"head"},r)));return t.forEach((r,i)=>{s.append(h("span",{class:"hour"},at[i]??""));for(const c of r){const l=a>o?(c-o)/(a-o):0;s.append(h("span",{class:"cell",style:`--heat:${(.1+l*.9).toFixed(2)}`},String(Math.round(c))))}}),h("div",{},h("h4",{},e),s)}function Pt(e){const t={focus:25,fatigue:15,featureSize:300,weeks:8},n={"🍽️ Lunch":{focus:-100,fatigue:-100},"🏃 Sprint plan":{focus:-100,fatigue:50},"😴 Boring":{focus:-50,fatigue:-25}},o={};for(let k=0;k<5;k+=1)o[`${k}-3`]="🍽️ Lunch";let a="🏃 Sprint plan",s=null;const r=h("div",{class:"figures"}),i=h("div",{class:"chart"}),c=h("div",{class:"maps"}),l=h("div",{class:"week"}),d=h("select"),u=h("input",{type:"number",min:-100,max:100}),f=h("input",{type:"number",min:-100,max:100}),p=h("input",{type:"text",placeholder:"New meeting name",size:16}),g=(k,T,L,I,F=A=>A,v=A=>A)=>{const A=h("output",{},String(t[k])),P=h("input",{type:"range",min:L,max:I,value:v(t[k]),oninput:()=>{t[k]=F(Number(P.value)),A.textContent=String(t[k]),W()}});return h("label",{},`${T}: `,A,P)},y=h("div",{class:"dials"},g("focus","Focus an hour",0,100),g("fatigue","Fatigue an hour",0,100),g("featureSize","Feature size",0,1e3,Dt,Rt),g("weeks","Weeks",1,16));function w(){d.replaceChildren(...Object.keys(n).map(T=>h("option",{value:T,selected:T===a},T)));const k=n[a];u.value=String(k?.focus??0),f.value=String(k?.fatigue??0)}d.addEventListener("change",()=>{a=d.value,w()});const b=()=>{n[a]={focus:Number(u.value)||0,fatigue:Number(f.value)||0},W()};u.addEventListener("change",b),f.addEventListener("change",b);const M=()=>{const k=p.value.trim();!k||n[k]||(n[k]={focus:0,fatigue:0},a=k,p.value="",w())},E=h("div",{class:"row"},h("span",{},"Paint: "),d,h("span",{},"focus "),u,h("span",{},"fatigue "),f,p,h("button",{type:"button",onclick:M},"Add"));let m=null;const x=k=>{if(m==="add"&&!o[k])o[k]=a;else if(m==="remove"&&o[k])delete o[k];else return;W()};function $(){l.replaceChildren(h("span"),...ke.map(k=>h("span",{class:"head"},k))),at.forEach((k,T)=>{l.append(h("span",{class:"hour"},k));for(let L=0;L<5;L+=1){const I=`${L}-${T}`,F=o[I];l.append(h("span",{class:F?"slot meeting":"slot",title:F??"free",onpointerdown:v=>{v.preventDefault(),m=o[I]?"remove":"add",x(I)},onpointerenter:()=>{m&&x(I)}},F?F.slice(0,2):""))}})}window.addEventListener("pointerup",()=>{m=null});const S=h("div",{class:"row"}),D=()=>{s={summary:Fe(Pe({...t,calendar:o,meetingTypes:n}),t),weeks:t.weeks},W()},R=()=>{s=null,W()};function W(){$();const k=Pe({...t,calendar:o,meetingTypes:n}),T=Fe(k,t),L=t.weeks*5*8;r.replaceChildren(h("div",{class:"clean"},h("strong",{},T.totalFeatures.toFixed(1)),"features finished"),h("div",{},h("strong",{},T.averageFeaturesPerWeek.toFixed(2)),"features a week"),h("div",{},h("strong",{},Math.round(T.totalProductivity/L).toString()),"productivity an hour"),h("div",{},h("strong",{},String(L)),"hours simulated")),S.replaceChildren(s?h("span",{},`Baseline: ${s.summary.averageFeaturesPerWeek.toFixed(2)} features a week over ${s.weeks} weeks; now ${T.averageFeaturesPerWeek.toFixed(2)}. `):h("span",{},"Keep this run to compare against: "),h("button",{type:"button",onclick:D},s?"Save again":"Save as baseline")),s&&S.append(h("button",{type:"button",onclick:R},"Clear")),i.innerHTML=ot([{name:"Productivity",className:"clean",values:T.days.map(I=>I.productivity/t.weeks)},{name:"Features ×100",className:"debt",values:T.days.map(I=>I.features/t.weeks*100)}],{x:"",y:"A day, on average"},ke),i.prepend(h("h4",{},"The shape of a week")),c.replaceChildren(se("Focus",T.hours.focus),se("Fatigue",T.hours.fatigue),se("Productivity",T.hours.productivity),se("Features finished",T.hours.features))}w(),e.append(y,E,h("div",{class:"charts"},l,i),r,S,c),W()}const de=20;function Ft(e){const{baseTime:t,shortcutFactor:n,interestRate:o,timeHorizon:a}=e,s=[];let r=null;const i=t;let c=t*(1-n),l=0,d=0,u=0,f=0,p=0,g=0;for(let y=0;y<a*de;){for(;p<=y;)l+=1,u+=1,p+=i;for(;g<=y;)d+=1,f+=1,g+=c,c*=1+o;if(y+=1,y%de===0){const w=y/de;s.push({month:w,cleanCumulative:l,debtCumulative:d,cleanMonthly:u,debtMonthly:f,debtFeatureCost:c}),u=0,f=0,r===null&&l>d&&(r=w)}}return{months:s,breakEvenMonth:r}}const Ot=[{key:"baseTime",label:"Base time",min:1,max:30,step:1,show:e=>`${e} days`},{key:"shortcutFactor",label:"Shortcuts",min:0,max:.9,step:.05,show:e=>`${Math.round(e*100)}%`},{key:"interestRate",label:"Interest",min:0,max:1,step:.01,show:e=>`${Math.round(e*100)}%`},{key:"timeHorizon",label:"Timeline",min:6,max:60,step:1,show:e=>`${e} months`}];function Wt(e){const t={baseTime:20,shortcutFactor:.25,interestRate:.1,timeHorizon:24},n=h("div",{class:"figures"}),o=h("div",{class:"chart"}),a=h("div",{class:"chart"}),s=h("p"),r=h("div",{class:"dials"},...Ot.map(c=>{const l=h("output",{},c.show(t[c.key])),d=h("input",{type:"range",min:c.min,max:c.max,step:c.step,value:t[c.key],oninput:()=>{t[c.key]=Number(d.value),l.textContent=c.show(t[c.key]),i()}});return h("label",{},`${c.label}: `,l,d)}));function i(){const{months:c,breakEvenMonth:l}=Ft(t),d=c[c.length-1],u=d?.cleanCumulative??0,f=d?.debtCumulative??0,p=u>0?(u-f)/u*100:0,g=Math.abs(p)<.1?"Even":p>0?"Loss":"Gain",y=Math.abs(p)<.1?"≈0%":`${Math.abs(p).toFixed(1)}%`;n.replaceChildren(h("div",{class:"clean"},h("strong",{},String(u)),"clean features"),h("div",{class:"debt"},h("strong",{},String(f)),"debt features"),h("div",{},h("strong",{},l?`month ${l}`:"never"),"break-even"),h("div",{},h("strong",{},y),`${g.toLowerCase()} on the shortcut road`)),o.innerHTML=It([{name:"Clean",className:"clean",values:c.map(w=>w.cleanCumulative)},{name:"Debt-driven",className:"debt",values:c.map(w=>w.debtCumulative)}],{x:"Months",y:"Features"}),o.prepend(h("h4",{},"Cumulative features")),a.innerHTML=ot([{name:"Clean",className:"clean",values:c.slice(1).map(w=>w.cleanMonthly)},{name:"Debt-driven",className:"debt",values:c.slice(1).map(w=>w.debtMonthly)}],{x:"Months",y:"Features a month"}),a.prepend(h("h4",{},"Monthly delivery rate")),s.textContent=t.interestRate===0?"With no interest there is no compound slowdown, and the shortcut simply wins. That is the one case that does not happen to real code.":l?`${Math.round(t.shortcutFactor*100)}% saved at first, ${Math.round(t.interestRate*100)}% interest on every feature: clean development overtakes at month ${l}, and by month ${t.timeHorizon} the shortcut road has delivered ${y} less.`:`${Math.round(t.shortcutFactor*100)}% saved at first, ${Math.round(t.interestRate*100)}% interest on every feature: in ${t.timeHorizon} months the clean road has not yet caught up. Give it longer, or raise the interest.`}e.append(r,n,h("div",{class:"charts"},o,a),s),i()}const N=(1+Math.sqrt(5))/2,Lt=[[-1,N,0],[1,N,0],[-1,-N,0],[1,-N,0],[0,-1,N],[0,1,N],[0,-1,-N],[0,1,-N],[N,0,-1],[N,0,1],[-N,0,-1],[-N,0,1]],Nt=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];function _t(){const e=Lt.map(([t,n,o])=>{const a=Math.hypot(t,n,o);return{direction:[t/a,n/a,o/a],radius:1,surface:0}});return st(e,Nt.map(t=>[...t]))}const Ht=(e,t)=>(e+t)/2;function Bt(e,t,n=Ht){const o=Array.from({length:e.vertexCount},(i,c)=>({direction:[e.directions[c*3]??0,e.directions[c*3+1]??0,e.directions[c*3+2]??0],radius:e.radii[c]??1,surface:e.surface[c]??0})),a=new Map,s=(i,c)=>{const l=i<c?`${i}:${c}`:`${c}:${i}`,d=a.get(l);if(d!==void 0)return d;const u=o[i],f=o[c],[p,g,y]=u.direction,[w,b,M]=f.direction,E=Math.hypot(p*u.radius-w*f.radius,g*u.radius-b*f.radius,y*u.radius-M*f.radius),[m,x,$]=[(p+w)/2,(g+b)/2,(y+M)/2],S=Math.hypot(m,x,$)||1,D=n(u.surface,f.surface);o.push({direction:[m/S,x/S,$/S],radius:(u.radius+f.radius)/2+t(E),surface:D});const R=o.length-1;return a.set(l,R),R},r=[];for(let i=0;i<e.faceCount;i+=1){const c=e.faces[i*3],l=e.faces[i*3+1],d=e.faces[i*3+2],u=s(c,l),f=s(l,d),p=s(d,c);r.push([c,u,p],[l,f,u],[d,p,f],[u,f,p])}return st(o,r)}function st(e,t){const n=new Float32Array(e.length*3),o=new Float32Array(e.length),a=new Float32Array(e.length);e.forEach((r,i)=>{n[i*3]=r.direction[0],n[i*3+1]=r.direction[1],n[i*3+2]=r.direction[2],o[i]=r.radius,a[i]=r.surface});const s=new Uint32Array(t.length*3);return t.forEach(([r,i,c],l)=>{s[l*3]=r,s[l*3+1]=i,s[l*3+2]=c}),{directions:n,radii:o,surface:a,faces:s,faceCount:t.length,vertexCount:e.length}}function Yt(e,t){const n=e.radii[t]??1;return[(e.directions[t*3]??0)*n,(e.directions[t*3+1]??0)*n,(e.directions[t*3+2]??0)*n]}function jt(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let n=Math.imul(t^t>>>15,1|t);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function Gt(e){const t=_t();return{seed:e,mesh:t,temperature:new Float32Array(t.vertexCount),faceColour:new Uint8ClampedArray(t.faceCount*3),seaRadius:0}}function Kt(e,t){return{...e,mesh:t,temperature:new Float32Array(t.vertexCount),faceColour:new Uint8ClampedArray(t.faceCount*3)}}function We(e,t,n){const o=e.mesh.faces[n*3]??0,a=e.mesh.faces[n*3+1]??0,s=e.mesh.faces[n*3+2]??0;return((t[o]??0)+(t[a]??0)+(t[s]??0))/3}const rt=(e=4,t=.28,n=.2)=>o=>{const a=jt(o.seed);let s=o.mesh;const r=Float32Array.from(s.surface,()=>a());s={...s,surface:r};for(let i=0;i<e;i+=1)s=Bt(s,c=>c*t*(a()-.5),(c,l)=>{const d=.5+(a()-.5)*(c-l)*n;return Math.min(1,Math.max(0,c*(1-d)+l*d))});return Kt(o,s)},it=({equator:e=300,pole:t=240,peak:n=240}={})=>o=>{const a=new Float32Array(o.mesh.vertexCount),s=o.mesh.radii,r=s.reduce((p,g)=>Math.min(p,g),1/0),i=s.reduce((p,g)=>Math.max(p,g),-1/0),c=i-r||1,l=(e-n)/c,d=e+l*r,u=(t-e)/r,f=(n-d)/i;for(let p=0;p<o.mesh.vertexCount;p+=1){const g=s[p]??1,y=Math.abs((o.mesh.directions[p*3+1]??0)*g);a[p]=Math.max(0,Math.floor(d+u*y+f*g))}return{...o,temperature:a}},ct=(e=.55)=>t=>{const n=Float32Array.from(t.mesh.radii).sort(),o=Math.min(n.length-1,Math.floor(n.length*e)),a=n[o]??1,s=Float32Array.from(t.mesh.radii,r=>Math.max(r,a));return{...t,mesh:{...t.mesh,radii:s},seaRadius:a}},Le=[217,249,255],j=[47,47,28],Ne=[177,160,143],qt=[67,88,37],_e=[79,172,51],me=[163,231,61],pe=[169,160,54],Ut=[252,64,10],fe=[90,12,12],ge=[222,73,10],re=[231,203,5],He=[254,247,194],zt=[194,254,231],lt=[255,255,255],G=[218,190,80],ye=[0,0,255],we=[0,255,255],Jt=[[Le,j,G],[G,Le,j],[_e,qt,j],[me,_e,j],[pe,me,G],[me,pe,G],[j,G,pe],[G,Ne,Ut],[j,Ne,G],[ge,fe,j],[re,ge,fe],[ge,re,fe],[re,He,re],[He,zt,lt]],Be=[220,273,283,293,303,323,373,473,1e3,2e3,2500,5e3,5500];function Vt(e){const t=Be.findIndex(n=>e<n);return t<0?Be.length:t}function Xt(e){return e<.3?0:e>.8?2:1}function Zt([e,t,n],o){const a=i=>Math.floor(Math.min(i,255-i)*o/5),s=e>=t&&e>=n?0:t>=e&&t>=n?1:2,r=[e,t,n].map((i,c)=>c===s?i+a(i):i-a(i));return[r[0]??0,r[1]??0,r[2]??0]}function Qt(e){return[Math.floor(ye[0]*e+we[0]*(1-e)),Math.floor(ye[1]*e+we[1]*(1-e)),Math.floor(ye[2]*e+we[2]*(1-e))]}const ut=e=>{const t=new Uint8ClampedArray(e.mesh.faceCount*3),n=e.seaRadius*1.0000001;for(let o=0;o<e.mesh.faceCount;o+=1){const a=We(e,e.mesh.surface,o),s=e.mesh.faces[o*3]??0,r=e.mesh.faces[o*3+1]??0,i=e.mesh.faces[o*3+2]??0,l=[s,r,i].every(d=>(e.mesh.radii[d]??1)<=n)?Qt(a):Zt(Jt[Vt(Math.floor(We(e,e.temperature,o)))]?.[Xt(a)]??lt,a);t[o*3]=l[0],t[o*3+1]=l[1],t[o*3+2]=l[2]}return{...e,faceColour:t}},en=[rt(),ct(),it(),ut];function tn(e,t=en){return t.reduce((n,o)=>o(n),Gt(e))}function ht(e){return tn(e.seed,[rt(e.levels,e.roughness),ct(e.share),it(),ut])}const Ye=.3,nn=[-.5,.45,.74],on=1.02;function je([e,t,n]){const o=Math.hypot(e,t,n)||1;return[e/o,t/o,n/o]}function Se(e,t,n){const o=new Uint8ClampedArray(t*t*4),a=new Float32Array(t*t).fill(-1/0),[s,r,i]=je(n.light??nn),c=n.tilt??-.38,l=Math.cos(c),d=Math.sin(c),u=Math.cos(n.rotation),f=Math.sin(n.rotation),p=e.mesh.radii.reduce((b,M)=>Math.max(b,M),1),g=t/(2*p*on),y=new Float32Array(e.mesh.vertexCount*3),w=new Float32Array(e.mesh.vertexCount*3);for(let b=0;b<e.mesh.vertexCount;b+=1){const[M,E,m]=Yt(e.mesh,b),x=M*u-m*f,$=M*f+m*u,S=E*l+$*d,D=-E*d+$*l;y[b*3]=x,y[b*3+1]=S,y[b*3+2]=D,w[b*3]=t/2+x*g,w[b*3+1]=t/2-S*g,w[b*3+2]=D}for(let b=0;b<e.mesh.faceCount;b+=1){const M=e.mesh.faces[b*3]??0,E=e.mesh.faces[b*3+1]??0,m=e.mesh.faces[b*3+2]??0,x=w[M*3],$=w[M*3+1],S=w[M*3+2],D=w[E*3],R=w[E*3+1],W=w[E*3+2],k=w[m*3],T=w[m*3+1],L=w[m*3+2],I=(D-x)*(T-$)-(R-$)*(k-x);if(I>=0)continue;const F=y[M*3],v=y[M*3+1],A=y[M*3+2],P=y[E*3]-F,H=y[E*3+1]-v,B=y[E*3+2]-A,Y=y[m*3]-F,U=y[m*3+1]-v,z=y[m*3+2]-A,[vt,bt,xt]=je([H*z-B*U,B*Y-P*z,P*U-H*Y]),le=Ye+(1-Ye)*Math.max(0,vt*s+bt*r+xt*i),kt=(e.faceColour[b*3]??0)*le,$t=(e.faceColour[b*3+1]??0)*le,Mt=(e.faceColour[b*3+2]??0)*le,Tt=Math.max(0,Math.floor(Math.min(x,D,k))),St=Math.min(t-1,Math.ceil(Math.max(x,D,k))),At=Math.max(0,Math.floor(Math.min($,R,T))),Ct=Math.min(t-1,Math.ceil(Math.max($,R,T)));for(let te=At;te<=Ct;te+=1)for(let ne=Tt;ne<=St;ne+=1){const ue=ne+.5,he=te+.5,Et=(D-x)*(he-$)-(R-$)*(ue-x),Ce=(k-D)*(he-R)-(T-R)*(ue-D),Ee=(x-k)*(he-T)-($-T)*(ue-k);if(Et>0||Ce>0||Ee>0)continue;const Ie=Ce/I,De=Ee/I,Re=S*Ie+W*De+L*(1-Ie-De),J=te*t+ne;Re<=a[J]||(a[J]=Re,o[J*4]=kt,o[J*4+1]=$t,o[J*4+2]=Mt,o[J*4+3]=255)}}return o}const $e={levels:4,roughness:.28,share:.55},Ae="header-world";function dt(){try{const e=localStorage.getItem(Ae);if(!e)return null;const t=JSON.parse(e);return[t.seed,t.levels,t.roughness,t.share].every(o=>typeof o=="number"&&Number.isFinite(o))?t:null}catch{return null}}function an(e){try{localStorage.setItem(Ae,JSON.stringify(e))}catch{}}function sn(){try{localStorage.removeItem(Ae)}catch{}}const ee=32;let ve=null;function Ge(e,t){const n=document.querySelector('link[rel="icon"]');if(!n)return;ve??=Object.assign(document.createElement("canvas"),{width:ee,height:ee});const o=ve.getContext("2d");if(!o)return;const a=o.createImageData(ee,ee);a.data.set(Se(e,ee,{rotation:t})),o.putImageData(a,0,0),n.type="image/png",n.href=ve.toDataURL("image/png")}const rn=90,cn=400,be=new WeakMap;function Me(e,t){be.get(e)?.();const n=e.getContext("2d");if(!n)return()=>{};const o=t??{...$e,seed:Math.floor(Math.random()*16777215)},a=e.width,s=ht(o),r=n.createImageData(a,a);e.dataset.seed=String(o.seed),e.title=`World ${o.seed}, ${s.mesh.faceCount.toLocaleString("en")} triangles`;const i=p=>{r.data.set(Se(s,a,{rotation:p})),n.putImageData(r,0,0),e.classList.add("grown")};if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return i(.6),Ge(s,.6),be.set(e,()=>{}),()=>{};let c=0,l=-1/0;const d=performance.now(),u=p=>{const g=(p-d)/1e3/rn*Math.PI*2;i(g),p-l>cn&&(Ge(s,g),l=p),c=requestAnimationFrame(u)};c=requestAnimationFrame(u);const f=()=>cancelAnimationFrame(c);return be.set(e,f),f}const V=360,ln=60,un=480,hn=900,X={x:1600,y:1e3},dn=1.4,Ke=Math.PI*2/ln,qe=Math.PI*4;function mn(e){const t=h("canvas",{class:"world",width:V,height:V}),n=t.getContext("2d");if(!n)return()=>{};const o={...$e,seed:Math.floor(Math.random()*16777215)},a=n.createImageData(V,V),s=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let r,i=.6,c=-.38,l=!s,d=null,u=0,f=performance.now();const p=document.documentElement,g=p.dataset.sky==="stars";let y=0,w=0,b="";g&&p.classList.add("sky-driven");const M=(v,A=0)=>{if(!g)return;const P=hn/(Math.PI*2);y=((y+v*P)%X.x+X.x)%X.x,w=((w-A*P)%X.y+X.y)%X.y;const H=`${(Math.round(y*2)/2).toFixed(1)}px ${(Math.round(w*2)/2).toFixed(1)}px`;if(H===b)return;b=H;const[B,Y]=H.split(" ");p.style.setProperty("--sky-x",B??"0px"),p.style.setProperty("--sky-y",Y??"0px")},E=h("p",{class:"hint"}),m=document.querySelector("canvas.planet"),x=(20*4**$e.levels).toLocaleString("en"),$=()=>{r=ht(o);const v=dt();E.textContent=`World ${o.seed}: ${r.mesh.faceCount.toLocaleString("en")} triangles. `+(v?`The header is keeping world ${v.seed}, ${(20*4**v.levels).toLocaleString("en")} triangles.`:`The header grows a new one every visit, ${x} triangles each.`),D.hidden=!v,R()},S=h("button",{type:"button",onclick:()=>{an({...o}),m&&Me(m,{...o}),$()}},"Put it in the header"),D=h("button",{type:"button",hidden:!0,onclick:()=>{sn(),m&&Me(m),$()}},"Let the header grow its own"),R=()=>{a.data.set(Se(r,V,{rotation:i,tilt:c})),n.putImageData(a,0,0)};let W=0;const k=v=>{const A=Math.min(.1,(v-f)/1e3);if(!d){if(u!==0){u*=Math.exp(-A/dn);const P=l?Ke:0;(Math.abs(u)<=P||Math.abs(u)<.01)&&(u=0)}u!==0?(i-=u*A,R()):l&&(i+=Ke*A,R()),M((u!==0?u:0)*A+A/un*Math.PI*2)}f=v,W=requestAnimationFrame(k)};t.addEventListener("pointerdown",v=>{d={x:v.clientX,y:v.clientY,at:v.timeStamp},u=0,t.setPointerCapture(v.pointerId)}),t.addEventListener("pointermove",v=>{if(!d)return;const A=t.clientWidth||V,P=(v.clientX-d.x)/A*Math.PI;i-=P;const H=c;c=Math.max(-1.2,Math.min(1.2,c-(v.clientY-d.y)/A*Math.PI)),M(P,c-H);const B=Math.max(.004,(v.timeStamp-d.at)/1e3);u=Math.max(-qe,Math.min(qe,u*.4+P/B*.6)),d={x:v.clientX,y:v.clientY,at:v.timeStamp},R()}),t.addEventListener("pointerup",v=>{d&&v.timeStamp-d.at>120&&(u=0),d=null,f=performance.now()}),t.addEventListener("pointercancel",()=>{d=null,u=0});const T=h("input",{type:"number",min:0,value:o.seed,onchange:()=>{o.seed=Math.max(0,Math.floor(Number(T.value)||0)),$()}}),L=h("button",{type:"button",onclick:()=>{o.seed=Math.floor(Math.random()*16777215),T.value=String(o.seed),$()}},"Another world"),I=h("button",{type:"button",onclick:()=>{l=!l,I.textContent=l?"Hold still":"Turn"}},l?"Hold still":"Turn"),F=(v,A,P,H,B,Y)=>{const U=h("output",{},Y(o[v])),z=h("input",{type:"range",min:P,max:H,step:B,value:o[v],onchange:()=>{o[v]=Number(z.value),U.textContent=Y(o[v]),$()},oninput:()=>{U.textContent=Y(Number(z.value))}});return h("label",{},`${A}: `,U,z)};return e.append(t,h("div",{class:"row"},h("span",{},"Seed "),T,L,I,S,D),h("div",{class:"dials"},F("levels","Detail",2,6,1,v=>`${v} splits`),F("roughness","Roughness",.02,1,.01,v=>v.toFixed(2)),F("share","Sea",0,.98,.01,v=>`${Math.round(v*100)}%`)),E),$(),W=requestAnimationFrame(k),()=>{cancelAnimationFrame(W),p.classList.remove("sky-driven"),p.style.removeProperty("--sky-x"),p.style.removeProperty("--sky-y")}}const pn={"technical-debt":Wt,"developer-meetings":Pt,worlds:mn};function Ue(){const e=[];for(const t of document.querySelectorAll(".app[data-app]")){const n=pn[t.dataset.app??""],o=n?.(t);o&&e.push(o)}return()=>{for(const t of e)t()}}const fn={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function _(e){return e.replace(/[&<>"]/g,t=>fn[t]??t)}function gn(e,t){const o=/^https?:/.test(t)?' target="_blank" rel="noopener noreferrer"':"";return`<a href="${_(t)}"${o}>${e}</a>`}const yn=["large","wide"];function wn(e,t,n){const o=n&&yn.includes(n)?` class="${n}"`:"";return`<img src="${_(t)}" alt="${e}"${o}>`}function vn(e){return _(e).replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g,(t,n,o,a)=>wn(n,o,a)).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,(t,n,o)=>gn(n,o)).replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/(^|[^*])\*([^*]+)\*/g,"$1<em>$2</em>").replace(/ -- /g," — ").replace(/ {2,}\n/g,"<br>").replace(/\n/g," ")}function q(e){return e.split(/(`[^`]+`)/g).map(t=>t.startsWith("`")&&t.endsWith("`")&&t.length>1?`<code>${_(t.slice(1,-1))}</code>`:vn(t)).join("")}const ze=/^(?:[-*]|\d+\.)\s/;function bn(e,t,n){if(!ze.test(e[0]??""))return!1;const o=t.slice(n).find(a=>a.trim()!=="");return o!==void 0&&ze.test(o)}function xn(e){const t=[],n=e.replace(/\r\n?/g,`
`).split(`
`);let o=[],a=!1;return n.forEach((s,r)=>{if(s.startsWith("```")){a=!a,o.push(s),a||(t.push(o),o=[]);return}if(!a&&s.trim()===""){if(bn(o,n,r+1))return;o.length&&t.push(o),o=[];return}o.push(s)}),o.length&&t.push(o),t}function kn(e){return e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function $n(e){const t=/^(#{1,4})\s+(.*)$/.exec(e[0]??"");if(!t||!e.slice(0,-1).every(s=>/ {2,}$/.test(s)))return null;const o=t[1]?.length??1,a=[t[2]??"",...e.slice(1)].join(`
`);return`<h${o} id="${kn(a)}">${q(a)}</h${o}>`}function Mn(e){if(!e[0]?.startsWith("```"))return null;const t=e.slice(1,-1).join(`
`);return`<pre><code>${_(t)}</code></pre>`}function Tn(e,t){const n=[];for(const o of e)t.test(o)?n.push(o.replace(t,"")):n.length&&(n[n.length-1]+=`
${o.trim()}`);return n}function Sn(e){const t=e[0]??"",n=/^\d+\.\s/.test(t),o=/^[-*]\s/.test(t);if(!n&&!o)return null;const a=n?/^\d+\.\s+/:/^[-*]\s+/;if(!e.every(i=>a.test(i)||/^\s/.test(i)))return null;const s=n?"ol":"ul",r=Tn(e,a).map(i=>`<li>${q(i)}</li>`).join("");return`<${s}>${r}</${s}>`}function An(e){return e.every(n=>n.includes(" :: "))?`<dl>${e.map(n=>{const o=n.indexOf(" :: ");return[n.slice(0,o),n.slice(o+4)]}).map(([n,o])=>`<dt>${q(n)}</dt><dd>${q(o)}</dd>`).join("")}</dl>`:null}function Cn(e){if(!e.every(n=>n.startsWith(">")))return null;const t=e.map(n=>n.replace(/^>\s?/,"")).join(" ");return`<blockquote>${q(t)}</blockquote>`}function En(e){const t=/^::([a-z0-9-]+)$/.exec(e[0]??"");return!t||e.length!==1?null:`<div class="app" data-app="${t[1]}"></div>`}function In(e){return e.length===1&&/^-{3,}$/.test(e[0]??"")?"<hr>":null}function Dn(e){const t=e.length===1&&/^(\\+)$/.exec(e[0]??"");return t?`<div class="space" style="--n:${t[1]?.length??1}"></div>`:null}function Rn(e){return e.length===1&&/^!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)$/.test(e[0]??"")?`<figure>${q(e[0]??"")}</figure>`:null}function Pn(e){return`<p>${q(e.join(`
`))}</p>`}const Fn=[In,Dn,$n,Mn,Cn,En,Rn,An,Sn];function mt(e){return xn(e).map(t=>{for(const n of Fn){const o=n(t);if(o!==null)return o}return Pn(t)}).join(`
`)}function On(e,t){if(t.parent===null)return"";const n=e.childrenOf(t.route);return n.length===0?"":`<ul class="listing">${n.map(a=>`<li><a href="${a.route}">${_(a.title)}</a>`+(a.summary?` <span class="summary">${_(a.summary)}</span>`:"")+"</li>").join("")}</ul>`}function Wn(e,t){const n=e.trailTo(t.route);if(n.length<=1)return"";const o=n.slice(1).map(a=>a.name).join("/");return`<p class="ran"><span class="ps1">~ $</span> cd ${_(o)} &amp;&amp; cat *</p>`}function Ln(e,t){return`${Wn(e,t)}
${mt(t.body)}
${On(e,t)}`}const Nn="theme";function pt(){const e=document.documentElement,t=e.dataset.pageTheme;let n=null;try{n=localStorage.getItem(Nn)}catch{n=null}const o=t??(n==="light"||n==="dark"?n:null);o?e.dataset.theme=o:delete e.dataset.theme}function _n(e,t){const n=document.querySelector("main");if(!n)return()=>!1;const o=(a,s=!0)=>{const r=e.at(a);if(!r)return!1;n.innerHTML=Ln(e,r);const i=document.documentElement,c=r.fields.theme;c==="dark"||c==="light"?i.dataset.pageTheme=c:delete i.dataset.pageTheme,r.fields.sky?i.dataset.sky=r.fields.sky:delete i.dataset.sky,pt(),document.title=r.route==="/"?"David Rodenas":`${r.title} — David Rodenas`;for(const l of document.querySelectorAll("nav .navlink"))a.startsWith(l.getAttribute("href")??"\0")?l.setAttribute("aria-current","page"):l.removeAttribute("aria-current");return s&&(window.history.pushState({route:a},"",a),window.scrollTo({top:0})),window.goatcounter?.count?.({path:a,title:document.title}),t(a),!0};return document.addEventListener("click",a=>{if(a.defaultPrevented||a.button!==0||a.metaKey||a.ctrlKey||a.shiftKey||a.altKey)return;const s=a.target?.closest("a[href]");if(!s||s.target||s.dataset.run)return;const r=new URL(s.href,window.location.href);if(r.origin!==window.location.origin)return;const i=r.pathname.endsWith("/")?r.pathname:`${r.pathname}/`;e.at(i)&&(a.preventDefault(),i!==window.location.pathname&&o(i))}),window.addEventListener("popstate",()=>{const a=window.location.pathname.endsWith("/")?window.location.pathname:`${window.location.pathname}/`;o(a,!1)}),o}const Hn=[{file:"book/index.md",markdown:`---
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

## Essays with more than half a million views

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
coastline and not as a change of colour. Work out the climate, in kelvin,
from height above the sea and from latitude, so that a summit is cold wherever
it stands. Only then paint it, from the 1999 table of colours by temperature.
Paint first and you get a ball of one colour.

Reload, and it is a different world. The same pipeline runs here, rewritten in
TypeScript with nothing underneath it, and you can [turn the dials yourself](/worlds/).
`},{file:"kata/index.md",markdown:`---
title: The Bowling Game Kata
summary: Robert C. Martin's kata, with slides and a repository to do it in JavaScript or Java.
order: 3
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
order: 4
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
`},{file:"worlds/index.md",markdown:`---
title: Worlds
summary: The fractal planet generator of 1999, in the browser, with the dials exposed.
order: 5
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
in the sea, work out the climate from height and latitude, and only then paint
from the 1999 table of colours by temperature and surface. Paint first and
there is nothing to paint.
`}],Je="---";function Bn(e){return(/^"(.*)"$/.exec(e)??/^'(.*)'$/.exec(e))?.[1]??e}function Yn(e){const t=e.replace(/\r\n?/g,`
`).split(`
`);if(t[0]?.trim()!==Je)return{fields:{},body:e.trim()};const n=t.indexOf(Je,1);if(n<0)return{fields:{},body:e.trim()};const o={};for(const a of t.slice(1,n)){const s=a.indexOf(":");s<=0||(o[a.slice(0,s).trim()]=Bn(a.slice(s+1).trim()))}return{fields:o,body:t.slice(n+1).join(`
`).trim()}}function jn(e){const n=e.replace(/\.md$/,"").replace(/(^|\/)index$/,"");return n===""?"/":`/${n}/`}function Gn(e){if(e==="/")return null;const t=e.slice(0,-1);return t.slice(0,t.lastIndexOf("/")+1)}function Ve(e){if(e==="/")return"/";const t=e.slice(0,-1);return t.slice(t.lastIndexOf("/")+1)}function Kn(e){const{fields:t,body:n}=Yn(e.markdown),o=jn(e.file);return{file:e.file,route:o,parent:Gn(o),name:Ve(o),title:t.title??Ve(o),summary:t.summary??"",order:Number(t.order??"100"),body:n,fields:t}}function Xe(e,t){return e.order-t.order||e.name.localeCompare(t.name)}class qn{byRoute;constructor(t){const n=t.map(Kn).sort(Xe);this.byRoute=new Map(n.map(o=>[o.route,o]))}get pages(){return[...this.byRoute.values()]}at(t){return this.byRoute.get(t)}childrenOf(t){return this.pages.filter(n=>n.parent===t).sort(Xe)}trailTo(t){const n=this.at(t);return n?n.parent===null?[n]:[...this.trailTo(n.parent),n]:[]}}const xe=new qn(Hn);class Un{lines=[];drafts=[];index=0;add(t){this.lines.push(t),this.drafts=[...this.lines,""],this.index=this.lines.length}previous(t){return this.moveTo(this.index-1,t)}next(t){return this.moveTo(this.index+1,t)}moveTo(t,n){return this.drafts.length===0&&(this.drafts=[""]),t<0||t>=this.drafts.length?n:(this.drafts[this.index]=n,this.index=t,this.drafts[t]??n)}}function ft(e){return e.split(/\s*(?:;|&&)\s*/).map(t=>t.trim().split(/\s+/).filter(Boolean)).filter(t=>t.length>0)}function ce(e,t){const o=t.startsWith("~")||t.startsWith("/")?[]:e.split("/").filter(Boolean),a=t.replace(/^~/,"").split("/").filter(Boolean),s=[...o];for(const r of a)r!=="."&&(r===".."?s.pop():s.push(r));return s.length===0?"/":`/${s.join("/")}/`}function zn(e){return e.replace(/(?:^|\/)(?:README\.md|\*)$/,"")||"."}const Jn={name:"cat",usage:"cat <file>",description:"print a page, README.md or * for the one here",run({site:e,cwd:t},[n]){if(!n)return{text:"cat: usage: cat <file>",error:!0};const o=e.at(ce(t,zn(n)));return!o||/\.md$/.test(n)!==/README\.md$/.test(n)?{text:`cat: ${n}: no such file`,error:!0}:{html:mt(o.body)}}},Vn={name:"cd",usage:"cd [dir]",description:"go to a directory (the page follows)",run(e,[t="~"]){const n=ce(e.cwd,t);return e.site.at(n)?(e.cwd=n,{navigate:n}):{text:`cd: ${t}: no such directory`,error:!0}}},Xn={name:"clear",usage:"clear",description:"clear what the shell has printed",run(){return{clear:!0}}},Zn={name:"help",usage:"help [command]",description:"this",run({commands:e},[t]){if(t){const a=e.find(s=>s.name===t);return a?{text:`${a.usage}
  ${a.description}`}:{text:`help: ${t}: no such command`,error:!0}}const n=Math.max(...e.map(a=>a.usage.length));return{text:["Commands:",...e.map(a=>`${a.usage.padEnd(n)}  ${a.description}`),"","Tab completes. Arrows recall."].join(`
`)}}};function Qn(e){const t=e.filter(o=>o.startsWith("-")).flatMap(o=>o.slice(1).split("")),n=e.find(o=>!o.startsWith("-"))??".";return{flags:t,path:n}}function eo(e,t,n){const o=n==="."?"":`${n.replace(/\/$/,"")}/`;return[{mode:"--r-",name:"README.md",title:e.title,href:e.route,run:`cat ${o}README.md`},...t.map(a=>({mode:"dr-x",name:`${a.name}/`,title:a.title,href:a.route}))]}function Ze(e){const t=e.run?` data-run="${_(e.run)}"`:"";return`<a href="${_(e.href)}"${t}>${_(e.name)}</a>`}function to(e,t){const n=(s,r)=>t?`${s.mode}  ${r.padEnd(20)}  ${s.title}`:r,o=s=>t?`${s.mode}  ${Ze(s)}${" ".repeat(Math.max(0,20-s.name.length))}  ${_(s.title)}`:Ze(s),a=t?[`total ${e.length}`]:[];return{text:[...a,...e.map(s=>n(s,s.name))].join(`
`),html:`<pre>${[...a,...e.map(o)].join(`
`)}</pre>`}}const no={name:"ls",usage:"ls [-l] [path]",description:"list what a directory holds; -l says what each is",run({site:e,cwd:t},n){const{flags:o,path:a}=Qn(n),s=o.find(c=>c!=="l");if(s)return{text:`ls: -${s}: no such option. Try ls -l`,error:!0};const r=ce(t,a),i=e.at(r);return i?to(eo(i,e.childrenOf(r),a),o.includes("l")):{text:`ls: ${a}: no such directory`,error:!0}}};function gt(e){return e==="/"?"~":`~${e.replace(/\/$/,"")}`}const oo={name:"pwd",usage:"pwd",description:"print where you are",run({cwd:e}){return{text:gt(e)}}},ao=["light","dark","system"];function so(e){return ao.includes(e)}const ro={name:"theme",usage:"theme [light|dark|system|auto]",description:"switch the colours, or toggle them",run({site:e,cwd:t},[n]){const o=e.at(t)?.fields.theme;if(o)return{text:`theme: this page keeps its own, ${o}. It works everywhere else.`,error:!0};if(n===void 0)return{theme:"toggle",text:"theme: toggled"};const a=n==="auto"?"system":n;return so(a)?{theme:a,text:`theme: ${a}`}:{text:`theme: ${n}: choose light, dark or system`,error:!0}}},io=[no,Vn,Jn,oo,Zn,Xn,ro];class co{context;constructor(t,n,o=io){this.context={site:t,cwd:n,commands:o}}get prompt(){return`${gt(this.context.cwd)} $`}moveTo(t){return this.context.site.at(t)?(this.context.cwd=t,!0):!1}run(t){const n=[];for(const[o="",...a]of ft(t)){const s=this.context.commands.find(i=>i.name===o),r=s?s.run(this.context,a):{text:`${o}: command not found. Try help`,error:!0};if(n.push(r),r.error)break}return n}complete(t){const n=t.split(/\s+/),o=n.pop()??"",a=n.length===0?"":`${n.join(" ")} `;return(n.length===0?this.commandNames():this.pathNames(o)).filter(r=>r.startsWith(o)).map(r=>a+r)}commandNames(){return this.context.commands.map(t=>t.name).sort()}pathNames(t){const n=t.lastIndexOf("/"),o=n<0?".":t.slice(0,n+1),a=ce(this.context.cwd,o);if(!this.context.site.at(a))return[];const s=n<0?"":o;return["README.md",...this.context.site.childrenOf(a).map(i=>`${i.name}/`)].map(i=>s+i)}}const Te="theme";function lo(){return window.matchMedia("(prefers-color-scheme: dark)").matches}function uo(){let e=null;try{e=localStorage.getItem(Te)}catch{e=document.documentElement.dataset.theme??null}return e==="light"||e==="dark"?e:lo()?"dark":"light"}function ho(e){const t=e==="toggle"?uo()==="dark"?"light":"dark":e;try{t==="system"?localStorage.removeItem(Te):localStorage.setItem(Te,t)}catch{}return pt(),t}const yt="shell-screen",wt="shell-pending";function mo(e,t){try{sessionStorage.setItem(yt,e.innerHTML),t&&sessionStorage.setItem(wt,t)}catch{}}function Qe(e){try{const t=sessionStorage.getItem(e)??"";return sessionStorage.removeItem(e),t}catch{return""}}function po(){window.__stopTyped?.();const e=window.__typed??[];if(window.__typed=[],e.length===0)return null;const t=[];let n="";for(const o of e)o==="Enter"?(t.push(n),n=""):o==="Backspace"?n=n.slice(0,-1):n+=o;return{finished:t,unfinished:n}}function fo(e,t,n={}){const o=document.querySelector(".terminal"),a=o?.querySelector(".screen"),s=o?.querySelector("form.prompt"),r=s?.querySelector("input"),i=s?.querySelector(".ps1");if(!o||!a||!s||!r||!i)return null;const c=new co(e,t),l=new Un;let d=null;const u=m=>{a.append(m)},f=()=>{d?.remove(),d=null},p=m=>{if(m.clear&&a.replaceChildren(),m.theme){const x=ho(m.theme);u(h("pre",{},`theme: ${x}`));return}if(m.html){const x=h("div",{class:m.text?"listing-out":"cat"});x.innerHTML=m.html,u(x)}else m.text&&u(h("pre",{class:m.error?"error":""},m.text))},g=m=>{f(),u(h("p",{class:"echo"},h("span",{class:"ps1"},c.prompt),` ${m}`));const x=ft(m).map($=>$.join(" "));for(let $=0;$<x.length;$+=1){const[S]=c.run(x[$]??"");if(S){if(S.navigate){if(n.navigate?.(S.navigate))continue;mo(a,x.slice($+1).join(" && ")),window.location.assign(S.navigate);return}if(p(S),S.error)break}}i.textContent=c.prompt,r.scrollIntoView({block:"nearest"})},y=()=>{if(f(),r.value.trim()===""){r.value="help";return}const m=c.complete(r.value);m.length===1?r.value=m[0]??r.value:m.length>1&&(d=h("p",{class:"hint"},m.map(x=>x.split(" ").pop()).join("  ")),u(d))};s.addEventListener("submit",m=>{m.preventDefault();const x=r.value.trim();r.value="",x&&(l.add(x),g(x))}),r.addEventListener("keydown",m=>{m.key==="Tab"?(m.preventDefault(),y()):m.key==="ArrowUp"?(m.preventDefault(),r.value=l.previous(r.value)):m.key==="ArrowDown"?(m.preventDefault(),r.value=l.next(r.value)):f()}),a.addEventListener("click",m=>{const x=m.target?.closest("a[data-run]");x?.dataset.run&&(m.preventDefault(),g(x.dataset.run))}),window.addEventListener("keydown",m=>{const $=m.target?.matches("input, textarea, select, [contenteditable]")??!1,S=m.key.length===1&&!m.ctrlKey&&!m.metaKey&&!m.altKey;$||!S||r.focus({preventScroll:!1})}),o.hidden=!1;const w=Qe(yt);w&&(a.innerHTML=w);const b=Qe(wt);b&&g(b);const M=po();if(M){for(const m of M.finished)m.trim()&&(l.add(m.trim()),g(m.trim()));r.value=M.unfinished,r.focus()}return{run:g,moveTo:m=>{c.moveTo(m)&&(i.textContent=c.prompt)}}}function et(){const e=document.querySelector("canvas.planet");e&&Me(e,dt()??void 0);const t=window.location.pathname.endsWith("/")?window.location.pathname:`${window.location.pathname}/`;let n=Ue(),o=null;const a=_n(xe,r=>{n(),n=Ue(),o?.moveTo(r)});o=fo(xe,xe.at(t)?t:"/",{navigate:a});const s=document.querySelector(".theme-toggle");s&&o&&(s.classList.add("ready"),s.removeAttribute("aria-hidden"),s.removeAttribute("tabindex"),s.addEventListener("click",()=>o?.run("theme")))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",et):et();
