const X=e=>Math.max(0,Math.min(100,e));function Me(e){const{focus:t,fatigue:n,featureSize:o,weeks:a,calendar:s,meetingTypes:r}=e,i=[];let l=0,c=0;for(let d=0;d<a;d+=1)for(let u=0;u<5;u+=1){let p=0,f=0;for(let g=0;g<8;g+=1){const y=r[s[`${u}-${g}`]??""];if(y){p=X(p+y.focus),f=X(f+y.fatigue),i.push({week:d,day:u,hour:g,inMeeting:!0,hourFocus:p,hourFatigue:f,hourProductivity:0,accumulatedProductivity:l,completedFeatures:c,featureCompleted:!1});continue}p=X(p+t),f=X(f+n);const w=X(p-f),b=o-l,T=w>b,A=T?b:w;T?(c+=1,l=0):l+=A,i.push({week:d,day:u,hour:g,inMeeting:!1,hourFocus:p,hourFatigue:f,hourProductivity:A,accumulatedProductivity:l,completedFeatures:c,featureCompleted:T}),T&&(p=0)}}return i}function ne(){return Array.from({length:8},()=>new Array(5).fill(0))}function oe(e,{hour:t,day:n},o){const a=e[t];a&&(a[n]=(a[n]??0)+o)}function Ee(e,{featureSize:t,weeks:n}){const o=e[e.length-1],a=o?.completedFeatures??0,s=o?.accumulatedProductivity??0,r=a+Math.round(10*s/t)/10,i=a*t+s,l=Array.from({length:5},()=>({productivity:0,features:0,meetings:0})),c={focus:ne(),fatigue:ne(),productivity:ne(),features:ne()};for(const u of e){const p=l[u.day];p.productivity+=u.hourProductivity,u.featureCompleted&&(p.features+=1),u.inMeeting&&(p.meetings+=1),oe(c.focus,u,u.hourFocus),oe(c.fatigue,u,u.hourFatigue),oe(c.productivity,u,u.hourProductivity),u.featureCompleted&&oe(c.features,u,1)}const d=u=>u.map(p=>p.map(f=>n>0?f/n:0));return{totalFeatures:r,totalProductivity:i,averageFeaturesPerWeek:n>0?r/n:0,averageProductivityPerWeek:n>0?i/n:0,days:l,hours:{focus:d(c.focus),fatigue:d(c.fatigue),productivity:d(c.productivity),features:c.features}}}const se=480,K=240,C={top:10,right:10,bottom:34,left:36};function Ke(e,t,n,o){const a=se-C.left-C.right,s=K-C.top-C.bottom,r=c=>C.top+s-(e>0?c/e*s:0),i=o.map(c=>`<line class="grid" x1="${C.left}" x2="${se-C.right}" y1="${r(c)}" y2="${r(c)}"/><text x="${C.left-4}" y="${r(c)+3}" text-anchor="end">${c}</text>`).join(""),l=(n>1?[1,Math.ceil(n/2),n]:[]).filter((c,d,u)=>u.indexOf(c)===d).map(c=>`<text x="${C.left+(c-1)/Math.max(1,n-1)*a}" y="${K-C.bottom+14}" text-anchor="middle">${c}</text>`).join("");return`${i}${l}<text x="${C.left+a/2}" y="${K-6}" text-anchor="middle">${t.x}</text><text transform="translate(9 ${C.top+s/2}) rotate(-90)" text-anchor="middle">${t.y}</text>`}function qe(e){if(e<=0)return[0];const t=10**Math.floor(Math.log10(e)),n=e/t>=5?t:e/t>=2?t/2:t/5,o=[];for(let a=0;a<=e;a+=n)o.push(Math.round(a*100)/100);return o}function vt(e,t){const n=Math.max(...e.map(d=>d.values.length),1),o=Math.max(1,...e.flatMap(d=>d.values)),a=se-C.left-C.right,s=K-C.top-C.bottom,r=d=>C.left+d/Math.max(1,n-1)*a,i=d=>C.top+s-d/o*s,l=e.map(d=>{const u=d.values.map((p,f)=>`${r(f).toFixed(1)},${i(p).toFixed(1)}`).join(" ");return`<polyline class="line ${d.className}" points="${u}"><title>${d.name}</title></polyline>`}).join(""),c=e.map((d,u)=>`<rect class="${d.className}" x="${C.left+u*90}" y="${K-C.bottom+20}" width="10" height="3"/><text x="${C.left+u*90+14}" y="${K-C.bottom+24}">${d.name}</text>`).join("");return`<svg viewBox="0 0 ${se} ${K}" role="img" aria-label="${t.y} by ${t.x}">${Ke(o,t,n,qe(o))}${l}${c}</svg>`}const Ce=480,Z=240,W={top:10,right:10,bottom:34,left:36};function Ge(e,t,n){const o=Math.max(...e.map(g=>g.values.length),1),a=Math.max(1,...e.flatMap(g=>g.values)),s=Ce-W.left-W.right,r=Z-W.top-W.bottom,i=s/o,l=i*.7/e.length,c=g=>W.top+r-g/a*r,d=e.map((g,y)=>g.values.map((w,b)=>{const T=W.left+b*i+i*.15+y*l;return`<rect class="${g.className}" x="${T.toFixed(1)}" y="${c(w).toFixed(1)}" width="${l.toFixed(1)}" height="${(W.top+r-c(w)).toFixed(1)}"><title>${g.name}: ${Math.round(w*10)/10}</title></rect>`}).join("")).join(""),u=(n??[]).map((g,y)=>`<text x="${W.left+y*i+i/2}" y="${Z-W.bottom+14}" text-anchor="middle">${g}</text>`).join(""),p=e.map((g,y)=>`<rect class="${g.className}" x="${W.left+y*90}" y="${Z-W.bottom+20}" width="10" height="3"/><text x="${W.left+y*90+14}" y="${Z-W.bottom+24}">${g.name}</text>`).join(""),f=Ke(a,t,n?0:o,qe(a));return`<svg viewBox="0 0 ${Ce} ${Z}" role="img" aria-label="${t.y} by ${t.x}">${f}${d}${u}${p}</svg>`}function h(e,t={},...n){const o=document.createElement(e);for(const[a,s]of Object.entries(t))s===void 0||s===!1||(typeof s=="function"?o.addEventListener(a.slice(2).toLowerCase(),s):s===!0?o.setAttribute(a,""):o.setAttribute(a,String(s)));for(const a of n)a==null||a===!1||o.append(a);return o}const fe=["Mon","Tue","Wed","Thu","Fri"],Ue=Array.from({length:8},(e,t)=>`${9+t}:00`);function bt(e){return e<=500?e:e<=750?500+(e-500)*2:e<1e3?1e3+(e-750)*35:1e4}function xt(e){return e<=500?e:e<=1e3?500+(e-500)/2:e<1e4?750+(e-1e3)/35:1e3}function ae(e,t){const n=t.flat(),o=Math.min(...n),a=Math.max(...n),s=h("div",{class:"week"},h("span"),...fe.map(r=>h("span",{class:"head"},r)));return t.forEach((r,i)=>{s.append(h("span",{class:"hour"},Ue[i]??""));for(const l of r){const c=a>o?(l-o)/(a-o):0;s.append(h("span",{class:"cell",style:`--heat:${(.1+c*.9).toFixed(2)}`},String(Math.round(l))))}}),h("div",{},h("h4",{},e),s)}function kt(e){const t={focus:25,fatigue:15,featureSize:300,weeks:8},n={"🍽️ Lunch":{focus:-100,fatigue:-100},"🏃 Sprint plan":{focus:-100,fatigue:50},"😴 Boring":{focus:-50,fatigue:-25}},o={};for(let k=0;k<5;k+=1)o[`${k}-3`]="🍽️ Lunch";let a="🏃 Sprint plan",s=null;const r=h("div",{class:"figures"}),i=h("div",{class:"chart"}),l=h("div",{class:"maps"}),c=h("div",{class:"week"}),d=h("select"),u=h("input",{type:"number",min:-100,max:100}),p=h("input",{type:"number",min:-100,max:100}),f=h("input",{type:"text",placeholder:"New meeting name",size:16}),g=(k,S,L,I,F=E=>E,v=E=>E)=>{const E=h("output",{},String(t[k])),P=h("input",{type:"range",min:L,max:I,value:v(t[k]),oninput:()=>{t[k]=F(Number(P.value)),E.textContent=String(t[k]),O()}});return h("label",{},`${S}: `,E,P)},y=h("div",{class:"dials"},g("focus","Focus an hour",0,100),g("fatigue","Fatigue an hour",0,100),g("featureSize","Feature size",0,1e3,bt,xt),g("weeks","Weeks",1,16));function w(){d.replaceChildren(...Object.keys(n).map(S=>h("option",{value:S,selected:S===a},S)));const k=n[a];u.value=String(k?.focus??0),p.value=String(k?.fatigue??0)}d.addEventListener("change",()=>{a=d.value,w()});const b=()=>{n[a]={focus:Number(u.value)||0,fatigue:Number(p.value)||0},O()};u.addEventListener("change",b),p.addEventListener("change",b);const T=()=>{const k=f.value.trim();!k||n[k]||(n[k]={focus:0,fatigue:0},a=k,f.value="",w())},A=h("div",{class:"row"},h("span",{},"Paint: "),d,h("span",{},"focus "),u,h("span",{},"fatigue "),p,f,h("button",{type:"button",onclick:T},"Add"));let m=null;const x=k=>{if(m==="add"&&!o[k])o[k]=a;else if(m==="remove"&&o[k])delete o[k];else return;O()};function $(){c.replaceChildren(h("span"),...fe.map(k=>h("span",{class:"head"},k))),Ue.forEach((k,S)=>{c.append(h("span",{class:"hour"},k));for(let L=0;L<5;L+=1){const I=`${L}-${S}`,F=o[I];c.append(h("span",{class:F?"slot meeting":"slot",title:F??"free",onpointerdown:v=>{v.preventDefault(),m=o[I]?"remove":"add",x(I)},onpointerenter:()=>{m&&x(I)}},F?F.slice(0,2):""))}})}window.addEventListener("pointerup",()=>{m=null});const M=h("div",{class:"row"}),D=()=>{s={summary:Ee(Me({...t,calendar:o,meetingTypes:n}),t),weeks:t.weeks},O()},R=()=>{s=null,O()};function O(){$();const k=Me({...t,calendar:o,meetingTypes:n}),S=Ee(k,t),L=t.weeks*5*8;r.replaceChildren(h("div",{class:"clean"},h("strong",{},S.totalFeatures.toFixed(1)),"features finished"),h("div",{},h("strong",{},S.averageFeaturesPerWeek.toFixed(2)),"features a week"),h("div",{},h("strong",{},Math.round(S.totalProductivity/L).toString()),"productivity an hour"),h("div",{},h("strong",{},String(L)),"hours simulated")),M.replaceChildren(s?h("span",{},`Baseline: ${s.summary.averageFeaturesPerWeek.toFixed(2)} features a week over ${s.weeks} weeks; now ${S.averageFeaturesPerWeek.toFixed(2)}. `):h("span",{},"Keep this run to compare against: "),h("button",{type:"button",onclick:D},s?"Save again":"Save as baseline")),s&&M.append(h("button",{type:"button",onclick:R},"Clear")),i.innerHTML=Ge([{name:"Productivity",className:"clean",values:S.days.map(I=>I.productivity/t.weeks)},{name:"Features ×100",className:"debt",values:S.days.map(I=>I.features/t.weeks*100)}],{x:"",y:"A day, on average"},fe),i.prepend(h("h4",{},"The shape of a week")),l.replaceChildren(ae("Focus",S.hours.focus),ae("Fatigue",S.hours.fatigue),ae("Productivity",S.hours.productivity),ae("Features finished",S.hours.features))}w(),e.append(y,A,h("div",{class:"charts"},c,i),r,M,l),O()}const ue=20;function $t(e){const{baseTime:t,shortcutFactor:n,interestRate:o,timeHorizon:a}=e,s=[];let r=null;const i=t;let l=t*(1-n),c=0,d=0,u=0,p=0,f=0,g=0;for(let y=0;y<a*ue;){for(;f<=y;)c+=1,u+=1,f+=i;for(;g<=y;)d+=1,p+=1,g+=l,l*=1+o;if(y+=1,y%ue===0){const w=y/ue;s.push({month:w,cleanCumulative:c,debtCumulative:d,cleanMonthly:u,debtMonthly:p,debtFeatureCost:l}),u=0,p=0,r===null&&c>d&&(r=w)}}return{months:s,breakEvenMonth:r}}const Tt=[{key:"baseTime",label:"Base time",min:1,max:30,step:1,show:e=>`${e} days`},{key:"shortcutFactor",label:"Shortcuts",min:0,max:.9,step:.05,show:e=>`${Math.round(e*100)}%`},{key:"interestRate",label:"Interest",min:0,max:1,step:.01,show:e=>`${Math.round(e*100)}%`},{key:"timeHorizon",label:"Timeline",min:6,max:60,step:1,show:e=>`${e} months`}];function St(e){const t={baseTime:20,shortcutFactor:.25,interestRate:.1,timeHorizon:24},n=h("div",{class:"figures"}),o=h("div",{class:"chart"}),a=h("div",{class:"chart"}),s=h("p"),r=h("div",{class:"dials"},...Tt.map(l=>{const c=h("output",{},l.show(t[l.key])),d=h("input",{type:"range",min:l.min,max:l.max,step:l.step,value:t[l.key],oninput:()=>{t[l.key]=Number(d.value),c.textContent=l.show(t[l.key]),i()}});return h("label",{},`${l.label}: `,c,d)}));function i(){const{months:l,breakEvenMonth:c}=$t(t),d=l[l.length-1],u=d?.cleanCumulative??0,p=d?.debtCumulative??0,f=u>0?(u-p)/u*100:0,g=Math.abs(f)<.1?"Even":f>0?"Loss":"Gain",y=Math.abs(f)<.1?"≈0%":`${Math.abs(f).toFixed(1)}%`;n.replaceChildren(h("div",{class:"clean"},h("strong",{},String(u)),"clean features"),h("div",{class:"debt"},h("strong",{},String(p)),"debt features"),h("div",{},h("strong",{},c?`month ${c}`:"never"),"break-even"),h("div",{},h("strong",{},y),`${g.toLowerCase()} on the shortcut road`)),o.innerHTML=vt([{name:"Clean",className:"clean",values:l.map(w=>w.cleanCumulative)},{name:"Debt-driven",className:"debt",values:l.map(w=>w.debtCumulative)}],{x:"Months",y:"Features"}),o.prepend(h("h4",{},"Cumulative features")),a.innerHTML=Ge([{name:"Clean",className:"clean",values:l.slice(1).map(w=>w.cleanMonthly)},{name:"Debt-driven",className:"debt",values:l.slice(1).map(w=>w.debtMonthly)}],{x:"Months",y:"Features a month"}),a.prepend(h("h4",{},"Monthly delivery rate")),s.textContent=t.interestRate===0?"With no interest there is no compound slowdown, and the shortcut simply wins. That is the one case that does not happen to real code.":c?`${Math.round(t.shortcutFactor*100)}% saved at first, ${Math.round(t.interestRate*100)}% interest on every feature: clean development overtakes at month ${c}, and by month ${t.timeHorizon} the shortcut road has delivered ${y} less.`:`${Math.round(t.shortcutFactor*100)}% saved at first, ${Math.round(t.interestRate*100)}% interest on every feature: in ${t.timeHorizon} months the clean road has not yet caught up. Give it longer, or raise the interest.`}e.append(r,n,h("div",{class:"charts"},o,a),s),i()}const N=(1+Math.sqrt(5))/2,Mt=[[-1,N,0],[1,N,0],[-1,-N,0],[1,-N,0],[0,-1,N],[0,1,N],[0,-1,-N],[0,1,-N],[N,0,-1],[N,0,1],[-N,0,-1],[-N,0,1]],Et=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];function Ct(){const e=Mt.map(([t,n,o])=>{const a=Math.hypot(t,n,o);return{direction:[t/a,n/a,o/a],radius:1,surface:0}});return ze(e,Et.map(t=>[...t]))}const At=(e,t)=>(e+t)/2;function It(e,t,n=At){const o=Array.from({length:e.vertexCount},(i,l)=>({direction:[e.directions[l*3]??0,e.directions[l*3+1]??0,e.directions[l*3+2]??0],radius:e.radii[l]??1,surface:e.surface[l]??0})),a=new Map,s=(i,l)=>{const c=i<l?`${i}:${l}`:`${l}:${i}`,d=a.get(c);if(d!==void 0)return d;const u=o[i],p=o[l],[f,g,y]=u.direction,[w,b,T]=p.direction,A=Math.hypot(f*u.radius-w*p.radius,g*u.radius-b*p.radius,y*u.radius-T*p.radius),[m,x,$]=[(f+w)/2,(g+b)/2,(y+T)/2],M=Math.hypot(m,x,$)||1,D=n(u.surface,p.surface);o.push({direction:[m/M,x/M,$/M],radius:(u.radius+p.radius)/2+t(A),surface:D});const R=o.length-1;return a.set(c,R),R},r=[];for(let i=0;i<e.faceCount;i+=1){const l=e.faces[i*3],c=e.faces[i*3+1],d=e.faces[i*3+2],u=s(l,c),p=s(c,d),f=s(d,l);r.push([l,u,f],[c,p,u],[d,f,p],[u,p,f])}return ze(o,r)}function ze(e,t){const n=new Float32Array(e.length*3),o=new Float32Array(e.length),a=new Float32Array(e.length);e.forEach((r,i)=>{n[i*3]=r.direction[0],n[i*3+1]=r.direction[1],n[i*3+2]=r.direction[2],o[i]=r.radius,a[i]=r.surface});const s=new Uint32Array(t.length*3);return t.forEach(([r,i,l],c)=>{s[c*3]=r,s[c*3+1]=i,s[c*3+2]=l}),{directions:n,radii:o,surface:a,faces:s,faceCount:t.length,vertexCount:e.length}}function Dt(e,t){const n=e.radii[t]??1;return[(e.directions[t*3]??0)*n,(e.directions[t*3+1]??0)*n,(e.directions[t*3+2]??0)*n]}function Rt(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let n=Math.imul(t^t>>>15,1|t);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function Pt(e){const t=Ct();return{seed:e,mesh:t,temperature:new Float32Array(t.vertexCount),faceColour:new Uint8ClampedArray(t.faceCount*3),seaRadius:0}}function Ft(e,t){return{...e,mesh:t,temperature:new Float32Array(t.vertexCount),faceColour:new Uint8ClampedArray(t.faceCount*3)}}function Wt(e,t){return Math.abs(e.mesh.directions[t*3+1]??0)}function Je(e,t,n){const o=e.mesh.faces[n*3]??0,a=e.mesh.faces[n*3+1]??0,s=e.mesh.faces[n*3+2]??0;return((t[o]??0)+(t[a]??0)+(t[s]??0))/3}function Ot(e,t){return Je(e,e.mesh.radii,t)}const Ve=(e=4,t=.28,n=.2)=>o=>{const a=Rt(o.seed);let s=o.mesh;const r=Float32Array.from(s.surface,()=>a());s={...s,surface:r};for(let i=0;i<e;i+=1)s=It(s,l=>l*t*(a()-.5),(l,c)=>{const d=.5+(a()-.5)*(l-c)*n;return Math.min(1,Math.max(0,l*(1-d)+c*d))});return Ft(o,s)},Xe=({equator:e=1,pole:t=.05,peak:n=0}={})=>o=>{const a=new Float32Array(o.mesh.vertexCount),s=o.mesh.radii,r=s.reduce((c,d)=>Math.min(c,d),1/0),l=s.reduce((c,d)=>Math.max(c,d),-1/0)-r||1;for(let c=0;c<o.mesh.vertexCount;c+=1){const d=((s[c]??1)-r)/l,u=Wt(o,c)**2.2;a[c]=e+(t-e)*u+(n-e)*d}return{...o,temperature:a}},Ze=(e=.55)=>t=>{const n=Float32Array.from(t.mesh.radii).sort(),o=Math.min(n.length-1,Math.floor(n.length*e)),a=n[o]??1,s=Float32Array.from(t.mesh.radii,r=>Math.max(r,a));return{...t,mesh:{...t.mesh,radii:s},seaRadius:a}},Lt=[24,92,168],Nt=[62,176,206],Ht=[214,196,138],Ae=[190,158,84],he=[70,138,66],_t=[74,104,76],Yt=[136,128,116],Ie=[238,243,247];function B(e,t,n){const o=Math.min(1,Math.max(0,n));return[e[0]+(t[0]-e[0])*o,e[1]+(t[1]-e[1])*o,e[2]+(t[2]-e[2])*o]}function jt(e){return e>.78?Ae:e>.62?B(he,Ae,(e-.62)/.16):e>.3?he:B(_t,he,(e-.12)*5.5)}const Qe=e=>{const t=new Uint8ClampedArray(e.mesh.faceCount*3),n=e.mesh.radii.reduce((a,s)=>Math.max(a,s),-1/0),o=Math.max(1e-6,n-e.seaRadius);for(let a=0;a<e.mesh.faceCount;a+=1){const s=(Ot(e,a)-e.seaRadius)/o,r=Je(e,e.temperature,a);let i;s<=.002?(i=B(Nt,Lt,.55),r<.16&&(i=B(i,Ie,(.16-r)*6))):(i=B(Ht,jt(r),Math.min(1,s*9)),i=B(i,Yt,Math.max(0,s-.55)*2.2),r<.26&&(i=B(i,Ie,(.26-r)*4))),t[a*3]=i[0],t[a*3+1]=i[1],t[a*3+2]=i[2]}return{...e,faceColour:t}},Bt=[Ve(),Ze(),Xe(),Qe];function Kt(e,t=Bt){return t.reduce((n,o)=>o(n),Pt(e))}function et(e){return Kt(e.seed,[Ve(e.levels,e.roughness),Ze(e.share),Xe(),Qe])}const De=.3,qt=[-.5,.45,.74],Gt=1.02;function Re([e,t,n]){const o=Math.hypot(e,t,n)||1;return[e/o,t/o,n/o]}function ve(e,t,n){const o=new Uint8ClampedArray(t*t*4),a=new Float32Array(t*t).fill(-1/0),[s,r,i]=Re(n.light??qt),l=n.tilt??-.38,c=Math.cos(l),d=Math.sin(l),u=Math.cos(n.rotation),p=Math.sin(n.rotation),f=e.mesh.radii.reduce((b,T)=>Math.max(b,T),1),g=t/(2*f*Gt),y=new Float32Array(e.mesh.vertexCount*3),w=new Float32Array(e.mesh.vertexCount*3);for(let b=0;b<e.mesh.vertexCount;b+=1){const[T,A,m]=Dt(e.mesh,b),x=T*u-m*p,$=T*p+m*u,M=A*c+$*d,D=-A*d+$*c;y[b*3]=x,y[b*3+1]=M,y[b*3+2]=D,w[b*3]=t/2+x*g,w[b*3+1]=t/2-M*g,w[b*3+2]=D}for(let b=0;b<e.mesh.faceCount;b+=1){const T=e.mesh.faces[b*3]??0,A=e.mesh.faces[b*3+1]??0,m=e.mesh.faces[b*3+2]??0,x=w[T*3],$=w[T*3+1],M=w[T*3+2],D=w[A*3],R=w[A*3+1],O=w[A*3+2],k=w[m*3],S=w[m*3+1],L=w[m*3+2],I=(D-x)*(S-$)-(R-$)*(k-x);if(I>=0)continue;const F=y[T*3],v=y[T*3+1],E=y[T*3+2],P=y[A*3]-F,_=y[A*3+1]-v,Y=y[A*3+2]-E,j=y[m*3]-F,G=y[m*3+1]-v,U=y[m*3+2]-E,[ct,lt,ut]=Re([_*U-Y*G,Y*j-P*U,P*G-_*j]),ie=De+(1-De)*Math.max(0,ct*s+lt*r+ut*i),ht=(e.faceColour[b*3]??0)*ie,dt=(e.faceColour[b*3+1]??0)*ie,mt=(e.faceColour[b*3+2]??0)*ie,pt=Math.max(0,Math.floor(Math.min(x,D,k))),ft=Math.min(t-1,Math.ceil(Math.max(x,D,k))),gt=Math.max(0,Math.floor(Math.min($,R,S))),yt=Math.min(t-1,Math.ceil(Math.max($,R,S)));for(let ee=gt;ee<=yt;ee+=1)for(let te=pt;te<=ft;te+=1){const ce=te+.5,le=ee+.5,wt=(D-x)*(le-$)-(R-$)*(ce-x),xe=(k-D)*(le-R)-(S-R)*(ce-D),ke=(x-k)*(le-S)-($-S)*(ce-k);if(wt>0||xe>0||ke>0)continue;const $e=xe/I,Te=ke/I,Se=M*$e+O*Te+L*(1-$e-Te),z=ee*t+te;Se<=a[z]||(a[z]=Se,o[z*4]=ht,o[z*4+1]=dt,o[z*4+2]=mt,o[z*4+3]=255)}}return o}const ge={levels:4,roughness:.28,share:.55},be="header-world";function tt(){try{const e=localStorage.getItem(be);if(!e)return null;const t=JSON.parse(e);return[t.seed,t.levels,t.roughness,t.share].every(o=>typeof o=="number"&&Number.isFinite(o))?t:null}catch{return null}}function Ut(e){try{localStorage.setItem(be,JSON.stringify(e))}catch{}}function zt(){try{localStorage.removeItem(be)}catch{}}const Q=32;let de=null;function Pe(e,t){const n=document.querySelector('link[rel="icon"]');if(!n)return;de??=Object.assign(document.createElement("canvas"),{width:Q,height:Q});const o=de.getContext("2d");if(!o)return;const a=o.createImageData(Q,Q);a.data.set(ve(e,Q,{rotation:t})),o.putImageData(a,0,0),n.type="image/png",n.href=de.toDataURL("image/png")}const Jt=90,Vt=400,me=new WeakMap;function ye(e,t){me.get(e)?.();const n=e.getContext("2d");if(!n)return()=>{};const o=t??{...ge,seed:Math.floor(Math.random()*16777215)},a=e.width,s=et(o),r=n.createImageData(a,a);e.dataset.seed=String(o.seed),e.title=`World ${o.seed}, ${s.mesh.faceCount.toLocaleString("en")} triangles`;const i=f=>{r.data.set(ve(s,a,{rotation:f})),n.putImageData(r,0,0),e.classList.add("grown")};if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return i(.6),Pe(s,.6),me.set(e,()=>{}),()=>{};let l=0,c=-1/0;const d=performance.now(),u=f=>{const g=(f-d)/1e3/Jt*Math.PI*2;i(g),f-c>Vt&&(Pe(s,g),c=f),l=requestAnimationFrame(u)};l=requestAnimationFrame(u);const p=()=>cancelAnimationFrame(l);return me.set(e,p),p}const J=360,Xt=60,Zt=480,Qt=900,V={x:1600,y:1e3},en=1.4,Fe=Math.PI*2/Xt,We=Math.PI*4;function tn(e){const t=h("canvas",{class:"world",width:J,height:J}),n=t.getContext("2d");if(!n)return()=>{};const o={...ge,seed:Math.floor(Math.random()*16777215)},a=n.createImageData(J,J),s=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let r,i=.6,l=-.38,c=!s,d=null,u=0,p=performance.now();const f=document.documentElement,g=f.dataset.sky==="stars";let y=0,w=0,b="";g&&f.classList.add("sky-driven");const T=(v,E=0)=>{if(!g)return;const P=Qt/(Math.PI*2);y=((y+v*P)%V.x+V.x)%V.x,w=((w-E*P)%V.y+V.y)%V.y;const _=`${(Math.round(y*2)/2).toFixed(1)}px ${(Math.round(w*2)/2).toFixed(1)}px`;if(_===b)return;b=_;const[Y,j]=_.split(" ");f.style.setProperty("--sky-x",Y??"0px"),f.style.setProperty("--sky-y",j??"0px")},A=h("p",{class:"hint"}),m=document.querySelector("canvas.planet"),x=(20*4**ge.levels).toLocaleString("en"),$=()=>{r=et(o);const v=tt();A.textContent=`World ${o.seed}: ${r.mesh.faceCount.toLocaleString("en")} triangles. `+(v?`The header is keeping world ${v.seed}, ${(20*4**v.levels).toLocaleString("en")} triangles.`:`The header grows a new one every visit, ${x} triangles each.`),D.hidden=!v,R()},M=h("button",{type:"button",onclick:()=>{Ut({...o}),m&&ye(m,{...o}),$()}},"Put it in the header"),D=h("button",{type:"button",hidden:!0,onclick:()=>{zt(),m&&ye(m),$()}},"Let the header grow its own"),R=()=>{a.data.set(ve(r,J,{rotation:i,tilt:l})),n.putImageData(a,0,0)};let O=0;const k=v=>{const E=Math.min(.1,(v-p)/1e3);if(!d){if(u!==0){u*=Math.exp(-E/en);const P=c?Fe:0;(Math.abs(u)<=P||Math.abs(u)<.01)&&(u=0)}u!==0?(i-=u*E,R()):c&&(i+=Fe*E,R()),T((u!==0?u:0)*E+E/Zt*Math.PI*2)}p=v,O=requestAnimationFrame(k)};t.addEventListener("pointerdown",v=>{d={x:v.clientX,y:v.clientY,at:v.timeStamp},u=0,t.setPointerCapture(v.pointerId)}),t.addEventListener("pointermove",v=>{if(!d)return;const E=t.clientWidth||J,P=(v.clientX-d.x)/E*Math.PI;i-=P;const _=l;l=Math.max(-1.2,Math.min(1.2,l-(v.clientY-d.y)/E*Math.PI)),T(P,l-_);const Y=Math.max(.004,(v.timeStamp-d.at)/1e3);u=Math.max(-We,Math.min(We,u*.4+P/Y*.6)),d={x:v.clientX,y:v.clientY,at:v.timeStamp},R()}),t.addEventListener("pointerup",v=>{d&&v.timeStamp-d.at>120&&(u=0),d=null,p=performance.now()}),t.addEventListener("pointercancel",()=>{d=null,u=0});const S=h("input",{type:"number",min:0,value:o.seed,onchange:()=>{o.seed=Math.max(0,Math.floor(Number(S.value)||0)),$()}}),L=h("button",{type:"button",onclick:()=>{o.seed=Math.floor(Math.random()*16777215),S.value=String(o.seed),$()}},"Another world"),I=h("button",{type:"button",onclick:()=>{c=!c,I.textContent=c?"Hold still":"Turn"}},c?"Hold still":"Turn"),F=(v,E,P,_,Y,j)=>{const G=h("output",{},j(o[v])),U=h("input",{type:"range",min:P,max:_,step:Y,value:o[v],onchange:()=>{o[v]=Number(U.value),G.textContent=j(o[v]),$()},oninput:()=>{G.textContent=j(Number(U.value))}});return h("label",{},`${E}: `,G,U)};return e.append(t,h("div",{class:"row"},h("span",{},"Seed "),S,L,I,M,D),h("div",{class:"dials"},F("levels","Detail",2,6,1,v=>`${v} splits`),F("roughness","Roughness",.02,1,.01,v=>v.toFixed(2)),F("share","Sea",0,.98,.01,v=>`${Math.round(v*100)}%`)),A),$(),O=requestAnimationFrame(k),()=>{cancelAnimationFrame(O),f.classList.remove("sky-driven"),f.style.removeProperty("--sky-x"),f.style.removeProperty("--sky-y")}}const nn={"technical-debt":St,"developer-meetings":kt,worlds:tn};function Oe(){const e=[];for(const t of document.querySelectorAll(".app[data-app]")){const n=nn[t.dataset.app??""],o=n?.(t);o&&e.push(o)}return()=>{for(const t of e)t()}}const on={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function H(e){return e.replace(/[&<>"]/g,t=>on[t]??t)}function an(e,t){const o=/^https?:/.test(t)?' target="_blank" rel="noopener noreferrer"':"";return`<a href="${H(t)}"${o}>${e}</a>`}const sn=["large","wide"];function rn(e,t,n){const o=n&&sn.includes(n)?` class="${n}"`:"";return`<img src="${H(t)}" alt="${e}"${o}>`}function cn(e){return H(e).replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g,(t,n,o,a)=>rn(n,o,a)).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,(t,n,o)=>an(n,o)).replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/(^|[^*])\*([^*]+)\*/g,"$1<em>$2</em>").replace(/ -- /g," — ").replace(/ {2,}\n/g,"<br>").replace(/\n/g," ")}function q(e){return e.split(/(`[^`]+`)/g).map(t=>t.startsWith("`")&&t.endsWith("`")&&t.length>1?`<code>${H(t.slice(1,-1))}</code>`:cn(t)).join("")}const Le=/^(?:[-*]|\d+\.)\s/;function ln(e,t,n){if(!Le.test(e[0]??""))return!1;const o=t.slice(n).find(a=>a.trim()!=="");return o!==void 0&&Le.test(o)}function un(e){const t=[],n=e.replace(/\r\n?/g,`
`).split(`
`);let o=[],a=!1;return n.forEach((s,r)=>{if(s.startsWith("```")){a=!a,o.push(s),a||(t.push(o),o=[]);return}if(!a&&s.trim()===""){if(ln(o,n,r+1))return;o.length&&t.push(o),o=[];return}o.push(s)}),o.length&&t.push(o),t}function hn(e){return e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function dn(e){const t=/^(#{1,4})\s+(.*)$/.exec(e[0]??"");if(!t||!e.slice(0,-1).every(s=>/ {2,}$/.test(s)))return null;const o=t[1]?.length??1,a=[t[2]??"",...e.slice(1)].join(`
`);return`<h${o} id="${hn(a)}">${q(a)}</h${o}>`}function mn(e){if(!e[0]?.startsWith("```"))return null;const t=e.slice(1,-1).join(`
`);return`<pre><code>${H(t)}</code></pre>`}function pn(e,t){const n=[];for(const o of e)t.test(o)?n.push(o.replace(t,"")):n.length&&(n[n.length-1]+=`
${o.trim()}`);return n}function fn(e){const t=e[0]??"",n=/^\d+\.\s/.test(t),o=/^[-*]\s/.test(t);if(!n&&!o)return null;const a=n?/^\d+\.\s+/:/^[-*]\s+/;if(!e.every(i=>a.test(i)||/^\s/.test(i)))return null;const s=n?"ol":"ul",r=pn(e,a).map(i=>`<li>${q(i)}</li>`).join("");return`<${s}>${r}</${s}>`}function gn(e){return e.every(n=>n.includes(" :: "))?`<dl>${e.map(n=>{const o=n.indexOf(" :: ");return[n.slice(0,o),n.slice(o+4)]}).map(([n,o])=>`<dt>${q(n)}</dt><dd>${q(o)}</dd>`).join("")}</dl>`:null}function yn(e){if(!e.every(n=>n.startsWith(">")))return null;const t=e.map(n=>n.replace(/^>\s?/,"")).join(" ");return`<blockquote>${q(t)}</blockquote>`}function wn(e){const t=/^::([a-z0-9-]+)$/.exec(e[0]??"");return!t||e.length!==1?null:`<div class="app" data-app="${t[1]}"></div>`}function vn(e){return e.length===1&&/^-{3,}$/.test(e[0]??"")?"<hr>":null}function bn(e){const t=e.length===1&&/^(\\+)$/.exec(e[0]??"");return t?`<div class="space" style="--n:${t[1]?.length??1}"></div>`:null}function xn(e){return e.length===1&&/^!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)$/.test(e[0]??"")?`<figure>${q(e[0]??"")}</figure>`:null}function kn(e){return`<p>${q(e.join(`
`))}</p>`}const $n=[vn,bn,dn,mn,yn,wn,xn,gn,fn];function nt(e){return un(e).map(t=>{for(const n of $n){const o=n(t);if(o!==null)return o}return kn(t)}).join(`
`)}function Tn(e,t){if(t.parent===null)return"";const n=e.childrenOf(t.route);return n.length===0?"":`<ul class="listing">${n.map(a=>`<li><a href="${a.route}">${H(a.title)}</a>`+(a.summary?` <span class="summary">${H(a.summary)}</span>`:"")+"</li>").join("")}</ul>`}function Sn(e,t){const n=e.trailTo(t.route);if(n.length<=1)return"";const o=n.slice(1).map(a=>a.name).join("/");return`<p class="ran"><span class="ps1">~ $</span> cd ${H(o)} &amp;&amp; cat *</p>`}function Mn(e,t){return`${Sn(e,t)}
${nt(t.body)}
${Tn(e,t)}`}const En="theme";function ot(){const e=document.documentElement,t=e.dataset.pageTheme;let n=null;try{n=localStorage.getItem(En)}catch{n=null}const o=t??(n==="light"||n==="dark"?n:null);o?e.dataset.theme=o:delete e.dataset.theme}function Cn(e,t){const n=document.querySelector("main");if(!n)return()=>!1;const o=(a,s=!0)=>{const r=e.at(a);if(!r)return!1;n.innerHTML=Mn(e,r);const i=document.documentElement,l=r.fields.theme;l==="dark"||l==="light"?i.dataset.pageTheme=l:delete i.dataset.pageTheme,r.fields.sky?i.dataset.sky=r.fields.sky:delete i.dataset.sky,ot(),document.title=r.route==="/"?"David Rodenas":`${r.title} — David Rodenas`;for(const c of document.querySelectorAll("nav .navlink"))a.startsWith(c.getAttribute("href")??"\0")?c.setAttribute("aria-current","page"):c.removeAttribute("aria-current");return s&&(window.history.pushState({route:a},"",a),window.scrollTo({top:0})),window.goatcounter?.count?.({path:a,title:document.title}),t(a),!0};return document.addEventListener("click",a=>{if(a.defaultPrevented||a.button!==0||a.metaKey||a.ctrlKey||a.shiftKey||a.altKey)return;const s=a.target?.closest("a[href]");if(!s||s.target||s.dataset.run)return;const r=new URL(s.href,window.location.href);if(r.origin!==window.location.origin)return;const i=r.pathname.endsWith("/")?r.pathname:`${r.pathname}/`;e.at(i)&&(a.preventDefault(),i!==window.location.pathname&&o(i))}),window.addEventListener("popstate",()=>{const a=window.location.pathname.endsWith("/")?window.location.pathname:`${window.location.pathname}/`;o(a,!1)}),o}const An=[{file:"book/index.md",markdown:`---
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
coastline and not as a change of colour. Work out the climate from height
above the sea and from latitude, so that a summit is white wherever it stands,
the way the Himalaya is. Only then paint it. Paint first and you get a ball of
one colour.

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
in the sea, work out the climate from height and latitude, and only then
paint. Paint first and there is nothing to paint.
`}],Ne="---";function In(e){return(/^"(.*)"$/.exec(e)??/^'(.*)'$/.exec(e))?.[1]??e}function Dn(e){const t=e.replace(/\r\n?/g,`
`).split(`
`);if(t[0]?.trim()!==Ne)return{fields:{},body:e.trim()};const n=t.indexOf(Ne,1);if(n<0)return{fields:{},body:e.trim()};const o={};for(const a of t.slice(1,n)){const s=a.indexOf(":");s<=0||(o[a.slice(0,s).trim()]=In(a.slice(s+1).trim()))}return{fields:o,body:t.slice(n+1).join(`
`).trim()}}function Rn(e){const n=e.replace(/\.md$/,"").replace(/(^|\/)index$/,"");return n===""?"/":`/${n}/`}function Pn(e){if(e==="/")return null;const t=e.slice(0,-1);return t.slice(0,t.lastIndexOf("/")+1)}function He(e){if(e==="/")return"/";const t=e.slice(0,-1);return t.slice(t.lastIndexOf("/")+1)}function Fn(e){const{fields:t,body:n}=Dn(e.markdown),o=Rn(e.file);return{file:e.file,route:o,parent:Pn(o),name:He(o),title:t.title??He(o),summary:t.summary??"",order:Number(t.order??"100"),body:n,fields:t}}function _e(e,t){return e.order-t.order||e.name.localeCompare(t.name)}class Wn{byRoute;constructor(t){const n=t.map(Fn).sort(_e);this.byRoute=new Map(n.map(o=>[o.route,o]))}get pages(){return[...this.byRoute.values()]}at(t){return this.byRoute.get(t)}childrenOf(t){return this.pages.filter(n=>n.parent===t).sort(_e)}trailTo(t){const n=this.at(t);return n?n.parent===null?[n]:[...this.trailTo(n.parent),n]:[]}}const pe=new Wn(An);class On{lines=[];drafts=[];index=0;add(t){this.lines.push(t),this.drafts=[...this.lines,""],this.index=this.lines.length}previous(t){return this.moveTo(this.index-1,t)}next(t){return this.moveTo(this.index+1,t)}moveTo(t,n){return this.drafts.length===0&&(this.drafts=[""]),t<0||t>=this.drafts.length?n:(this.drafts[this.index]=n,this.index=t,this.drafts[t]??n)}}function at(e){return e.split(/\s*(?:;|&&)\s*/).map(t=>t.trim().split(/\s+/).filter(Boolean)).filter(t=>t.length>0)}function re(e,t){const o=t.startsWith("~")||t.startsWith("/")?[]:e.split("/").filter(Boolean),a=t.replace(/^~/,"").split("/").filter(Boolean),s=[...o];for(const r of a)r!=="."&&(r===".."?s.pop():s.push(r));return s.length===0?"/":`/${s.join("/")}/`}function Ln(e){return e.replace(/(?:^|\/)(?:README\.md|\*)$/,"")||"."}const Nn={name:"cat",usage:"cat <file>",description:"print a page, README.md or * for the one here",run({site:e,cwd:t},[n]){if(!n)return{text:"cat: usage: cat <file>",error:!0};const o=e.at(re(t,Ln(n)));return!o||/\.md$/.test(n)!==/README\.md$/.test(n)?{text:`cat: ${n}: no such file`,error:!0}:{html:nt(o.body)}}},Hn={name:"cd",usage:"cd [dir]",description:"go to a directory (the page follows)",run(e,[t="~"]){const n=re(e.cwd,t);return e.site.at(n)?(e.cwd=n,{navigate:n}):{text:`cd: ${t}: no such directory`,error:!0}}},_n={name:"clear",usage:"clear",description:"clear what the shell has printed",run(){return{clear:!0}}},Yn={name:"help",usage:"help [command]",description:"this",run({commands:e},[t]){if(t){const a=e.find(s=>s.name===t);return a?{text:`${a.usage}
  ${a.description}`}:{text:`help: ${t}: no such command`,error:!0}}const n=Math.max(...e.map(a=>a.usage.length));return{text:["Commands:",...e.map(a=>`${a.usage.padEnd(n)}  ${a.description}`),"","Tab completes. Arrows recall."].join(`
`)}}};function jn(e){const t=e.filter(o=>o.startsWith("-")).flatMap(o=>o.slice(1).split("")),n=e.find(o=>!o.startsWith("-"))??".";return{flags:t,path:n}}function Bn(e,t,n){const o=n==="."?"":`${n.replace(/\/$/,"")}/`;return[{mode:"--r-",name:"README.md",title:e.title,href:e.route,run:`cat ${o}README.md`},...t.map(a=>({mode:"dr-x",name:`${a.name}/`,title:a.title,href:a.route}))]}function Ye(e){const t=e.run?` data-run="${H(e.run)}"`:"";return`<a href="${H(e.href)}"${t}>${H(e.name)}</a>`}function Kn(e,t){const n=(s,r)=>t?`${s.mode}  ${r.padEnd(20)}  ${s.title}`:r,o=s=>t?`${s.mode}  ${Ye(s)}${" ".repeat(Math.max(0,20-s.name.length))}  ${H(s.title)}`:Ye(s),a=t?[`total ${e.length}`]:[];return{text:[...a,...e.map(s=>n(s,s.name))].join(`
`),html:`<pre>${[...a,...e.map(o)].join(`
`)}</pre>`}}const qn={name:"ls",usage:"ls [-l] [path]",description:"list what a directory holds; -l says what each is",run({site:e,cwd:t},n){const{flags:o,path:a}=jn(n),s=o.find(l=>l!=="l");if(s)return{text:`ls: -${s}: no such option. Try ls -l`,error:!0};const r=re(t,a),i=e.at(r);return i?Kn(Bn(i,e.childrenOf(r),a),o.includes("l")):{text:`ls: ${a}: no such directory`,error:!0}}};function st(e){return e==="/"?"~":`~${e.replace(/\/$/,"")}`}const Gn={name:"pwd",usage:"pwd",description:"print where you are",run({cwd:e}){return{text:st(e)}}},Un=["light","dark","system"];function zn(e){return Un.includes(e)}const Jn={name:"theme",usage:"theme [light|dark|system|auto]",description:"switch the colours, or toggle them",run({site:e,cwd:t},[n]){const o=e.at(t)?.fields.theme;if(o)return{text:`theme: this page keeps its own, ${o}. It works everywhere else.`,error:!0};if(n===void 0)return{theme:"toggle",text:"theme: toggled"};const a=n==="auto"?"system":n;return zn(a)?{theme:a,text:`theme: ${a}`}:{text:`theme: ${n}: choose light, dark or system`,error:!0}}},Vn=[qn,Hn,Nn,Gn,Yn,_n,Jn];class Xn{context;constructor(t,n,o=Vn){this.context={site:t,cwd:n,commands:o}}get prompt(){return`${st(this.context.cwd)} $`}moveTo(t){return this.context.site.at(t)?(this.context.cwd=t,!0):!1}run(t){const n=[];for(const[o="",...a]of at(t)){const s=this.context.commands.find(i=>i.name===o),r=s?s.run(this.context,a):{text:`${o}: command not found. Try help`,error:!0};if(n.push(r),r.error)break}return n}complete(t){const n=t.split(/\s+/),o=n.pop()??"",a=n.length===0?"":`${n.join(" ")} `;return(n.length===0?this.commandNames():this.pathNames(o)).filter(r=>r.startsWith(o)).map(r=>a+r)}commandNames(){return this.context.commands.map(t=>t.name).sort()}pathNames(t){const n=t.lastIndexOf("/"),o=n<0?".":t.slice(0,n+1),a=re(this.context.cwd,o);if(!this.context.site.at(a))return[];const s=n<0?"":o;return["README.md",...this.context.site.childrenOf(a).map(i=>`${i.name}/`)].map(i=>s+i)}}const we="theme";function Zn(){return window.matchMedia("(prefers-color-scheme: dark)").matches}function Qn(){let e=null;try{e=localStorage.getItem(we)}catch{e=document.documentElement.dataset.theme??null}return e==="light"||e==="dark"?e:Zn()?"dark":"light"}function eo(e){const t=e==="toggle"?Qn()==="dark"?"light":"dark":e;try{t==="system"?localStorage.removeItem(we):localStorage.setItem(we,t)}catch{}return ot(),t}const rt="shell-screen",it="shell-pending";function to(e,t){try{sessionStorage.setItem(rt,e.innerHTML),t&&sessionStorage.setItem(it,t)}catch{}}function je(e){try{const t=sessionStorage.getItem(e)??"";return sessionStorage.removeItem(e),t}catch{return""}}function no(){window.__stopTyped?.();const e=window.__typed??[];if(window.__typed=[],e.length===0)return null;const t=[];let n="";for(const o of e)o==="Enter"?(t.push(n),n=""):o==="Backspace"?n=n.slice(0,-1):n+=o;return{finished:t,unfinished:n}}function oo(e,t,n={}){const o=document.querySelector(".terminal"),a=o?.querySelector(".screen"),s=o?.querySelector("form.prompt"),r=s?.querySelector("input"),i=s?.querySelector(".ps1");if(!o||!a||!s||!r||!i)return null;const l=new Xn(e,t),c=new On;let d=null;const u=m=>{a.append(m)},p=()=>{d?.remove(),d=null},f=m=>{if(m.clear&&a.replaceChildren(),m.theme){const x=eo(m.theme);u(h("pre",{},`theme: ${x}`));return}if(m.html){const x=h("div",{class:m.text?"listing-out":"cat"});x.innerHTML=m.html,u(x)}else m.text&&u(h("pre",{class:m.error?"error":""},m.text))},g=m=>{p(),u(h("p",{class:"echo"},h("span",{class:"ps1"},l.prompt),` ${m}`));const x=at(m).map($=>$.join(" "));for(let $=0;$<x.length;$+=1){const[M]=l.run(x[$]??"");if(M){if(M.navigate){if(n.navigate?.(M.navigate))continue;to(a,x.slice($+1).join(" && ")),window.location.assign(M.navigate);return}if(f(M),M.error)break}}i.textContent=l.prompt,r.scrollIntoView({block:"nearest"})},y=()=>{if(p(),r.value.trim()===""){r.value="help";return}const m=l.complete(r.value);m.length===1?r.value=m[0]??r.value:m.length>1&&(d=h("p",{class:"hint"},m.map(x=>x.split(" ").pop()).join("  ")),u(d))};s.addEventListener("submit",m=>{m.preventDefault();const x=r.value.trim();r.value="",x&&(c.add(x),g(x))}),r.addEventListener("keydown",m=>{m.key==="Tab"?(m.preventDefault(),y()):m.key==="ArrowUp"?(m.preventDefault(),r.value=c.previous(r.value)):m.key==="ArrowDown"?(m.preventDefault(),r.value=c.next(r.value)):p()}),a.addEventListener("click",m=>{const x=m.target?.closest("a[data-run]");x?.dataset.run&&(m.preventDefault(),g(x.dataset.run))}),window.addEventListener("keydown",m=>{const $=m.target?.matches("input, textarea, select, [contenteditable]")??!1,M=m.key.length===1&&!m.ctrlKey&&!m.metaKey&&!m.altKey;$||!M||r.focus({preventScroll:!1})}),o.hidden=!1;const w=je(rt);w&&(a.innerHTML=w);const b=je(it);b&&g(b);const T=no();if(T){for(const m of T.finished)m.trim()&&(c.add(m.trim()),g(m.trim()));r.value=T.unfinished,r.focus()}return{run:g,moveTo:m=>{l.moveTo(m)&&(i.textContent=l.prompt)}}}function Be(){const e=document.querySelector("canvas.planet");e&&ye(e,tt()??void 0);const t=window.location.pathname.endsWith("/")?window.location.pathname:`${window.location.pathname}/`;let n=Oe(),o=null;const a=Cn(pe,r=>{n(),n=Oe(),o?.moveTo(r)});o=oo(pe,pe.at(t)?t:"/",{navigate:a});const s=document.querySelector(".theme-toggle");s&&o&&(s.classList.add("ready"),s.removeAttribute("aria-hidden"),s.removeAttribute("tabindex"),s.addEventListener("click",()=>o?.run("theme")))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Be):Be();
