const X=e=>Math.max(0,Math.min(100,e));function Me(e){const{focus:t,fatigue:n,featureSize:o,weeks:a,calendar:s,meetingTypes:r}=e,i=[];let l=0,c=0;for(let h=0;h<a;h+=1)for(let d=0;d<5;d+=1){let p=0,v=0;for(let f=0;f<8;f+=1){const g=r[s[`${d}-${f}`]??""];if(g){p=X(p+g.focus),v=X(v+g.fatigue),i.push({week:h,day:d,hour:f,inMeeting:!0,hourFocus:p,hourFatigue:v,hourProductivity:0,accumulatedProductivity:l,completedFeatures:c,featureCompleted:!1});continue}p=X(p+t),v=X(v+n);const y=X(p-v),k=o-l,$=y>k,M=$?k:y;$?(c+=1,l=0):l+=M,i.push({week:h,day:d,hour:f,inMeeting:!1,hourFocus:p,hourFatigue:v,hourProductivity:M,accumulatedProductivity:l,completedFeatures:c,featureCompleted:$}),$&&(p=0)}}return i}function te(){return Array.from({length:8},()=>new Array(5).fill(0))}function ne(e,{hour:t,day:n},o){const a=e[t];a&&(a[n]=(a[n]??0)+o)}function Ee(e,{featureSize:t,weeks:n}){const o=e[e.length-1],a=o?.completedFeatures??0,s=o?.accumulatedProductivity??0,r=a+Math.round(10*s/t)/10,i=a*t+s,l=Array.from({length:5},()=>({productivity:0,features:0,meetings:0})),c={focus:te(),fatigue:te(),productivity:te(),features:te()};for(const d of e){const p=l[d.day];p.productivity+=d.hourProductivity,d.featureCompleted&&(p.features+=1),d.inMeeting&&(p.meetings+=1),ne(c.focus,d,d.hourFocus),ne(c.fatigue,d,d.hourFatigue),ne(c.productivity,d,d.hourProductivity),d.featureCompleted&&ne(c.features,d,1)}const h=d=>d.map(p=>p.map(v=>n>0?v/n:0));return{totalFeatures:r,totalProductivity:i,averageFeaturesPerWeek:n>0?r/n:0,averageProductivityPerWeek:n>0?i/n:0,days:l,hours:{focus:h(c.focus),fatigue:h(c.fatigue),productivity:h(c.productivity),features:c.features}}}const ae=480,j=240,C={top:10,right:10,bottom:34,left:36};function je(e,t,n,o){const a=ae-C.left-C.right,s=j-C.top-C.bottom,r=c=>C.top+s-(e>0?c/e*s:0),i=o.map(c=>`<line class="grid" x1="${C.left}" x2="${ae-C.right}" y1="${r(c)}" y2="${r(c)}"/><text x="${C.left-4}" y="${r(c)+3}" text-anchor="end">${c}</text>`).join(""),l=(n>1?[1,Math.ceil(n/2),n]:[]).filter((c,h,d)=>d.indexOf(c)===h).map(c=>`<text x="${C.left+(c-1)/Math.max(1,n-1)*a}" y="${j-C.bottom+14}" text-anchor="middle">${c}</text>`).join("");return`${i}${l}<text x="${C.left+a/2}" y="${j-6}" text-anchor="middle">${t.x}</text><text transform="translate(9 ${C.top+s/2}) rotate(-90)" text-anchor="middle">${t.y}</text>`}function Be(e){if(e<=0)return[0];const t=10**Math.floor(Math.log10(e)),n=e/t>=5?t:e/t>=2?t/2:t/5,o=[];for(let a=0;a<=e;a+=n)o.push(Math.round(a*100)/100);return o}function yt(e,t){const n=Math.max(...e.map(h=>h.values.length),1),o=Math.max(1,...e.flatMap(h=>h.values)),a=ae-C.left-C.right,s=j-C.top-C.bottom,r=h=>C.left+h/Math.max(1,n-1)*a,i=h=>C.top+s-h/o*s,l=e.map(h=>{const d=h.values.map((p,v)=>`${r(v).toFixed(1)},${i(p).toFixed(1)}`).join(" ");return`<polyline class="line ${h.className}" points="${d}"><title>${h.name}</title></polyline>`}).join(""),c=e.map((h,d)=>`<rect class="${h.className}" x="${C.left+d*90}" y="${j-C.bottom+20}" width="10" height="3"/><text x="${C.left+d*90+14}" y="${j-C.bottom+24}">${h.name}</text>`).join("");return`<svg viewBox="0 0 ${ae} ${j}" role="img" aria-label="${t.y} by ${t.x}">${je(o,t,n,Be(o))}${l}${c}</svg>`}const Ce=480,V=240,W={top:10,right:10,bottom:34,left:36};function Ke(e,t,n){const o=Math.max(...e.map(f=>f.values.length),1),a=Math.max(1,...e.flatMap(f=>f.values)),s=Ce-W.left-W.right,r=V-W.top-W.bottom,i=s/o,l=i*.7/e.length,c=f=>W.top+r-f/a*r,h=e.map((f,g)=>f.values.map((y,k)=>{const $=W.left+k*i+i*.15+g*l;return`<rect class="${f.className}" x="${$.toFixed(1)}" y="${c(y).toFixed(1)}" width="${l.toFixed(1)}" height="${(W.top+r-c(y)).toFixed(1)}"><title>${f.name}: ${Math.round(y*10)/10}</title></rect>`}).join("")).join(""),d=(n??[]).map((f,g)=>`<text x="${W.left+g*i+i/2}" y="${V-W.bottom+14}" text-anchor="middle">${f}</text>`).join(""),p=e.map((f,g)=>`<rect class="${f.className}" x="${W.left+g*90}" y="${V-W.bottom+20}" width="10" height="3"/><text x="${W.left+g*90+14}" y="${V-W.bottom+24}">${f.name}</text>`).join(""),v=je(a,t,n?0:o,Be(a));return`<svg viewBox="0 0 ${Ce} ${V}" role="img" aria-label="${t.y} by ${t.x}">${v}${h}${d}${p}</svg>`}function u(e,t={},...n){const o=document.createElement(e);for(const[a,s]of Object.entries(t))s===void 0||s===!1||(typeof s=="function"?o.addEventListener(a.slice(2).toLowerCase(),s):s===!0?o.setAttribute(a,""):o.setAttribute(a,String(s)));for(const a of n)a==null||a===!1||o.append(a);return o}const pe=["Mon","Tue","Wed","Thu","Fri"],qe=Array.from({length:8},(e,t)=>`${9+t}:00`);function wt(e){return e<=500?e:e<=750?500+(e-500)*2:e<1e3?1e3+(e-750)*35:1e4}function vt(e){return e<=500?e:e<=1e3?500+(e-500)/2:e<1e4?750+(e-1e3)/35:1e3}function oe(e,t){const n=t.flat(),o=Math.min(...n),a=Math.max(...n),s=u("div",{class:"week"},u("span"),...pe.map(r=>u("span",{class:"head"},r)));return t.forEach((r,i)=>{s.append(u("span",{class:"hour"},qe[i]??""));for(const l of r){const c=a>o?(l-o)/(a-o):0;s.append(u("span",{class:"cell",style:`--heat:${(.1+c*.9).toFixed(2)}`},String(Math.round(l))))}}),u("div",{},u("h4",{},e),s)}function bt(e){const t={focus:25,fatigue:15,featureSize:300,weeks:8},n={"🍽️ Lunch":{focus:-100,fatigue:-100},"🏃 Sprint plan":{focus:-100,fatigue:50},"😴 Boring":{focus:-50,fatigue:-25}},o={};for(let x=0;x<5;x+=1)o[`${x}-3`]="🍽️ Lunch";let a="🏃 Sprint plan",s=null;const r=u("div",{class:"figures"}),i=u("div",{class:"chart"}),l=u("div",{class:"maps"}),c=u("div",{class:"week"}),h=u("select"),d=u("input",{type:"number",min:-100,max:100}),p=u("input",{type:"number",min:-100,max:100}),v=u("input",{type:"text",placeholder:"New meeting name",size:16}),f=(x,S,P,A,b=I=>I,D=I=>I)=>{const I=u("output",{},String(t[x])),F=u("input",{type:"range",min:P,max:A,value:D(t[x]),oninput:()=>{t[x]=b(Number(F.value)),I.textContent=String(t[x]),H()}});return u("label",{},`${S}: `,I,F)},g=u("div",{class:"dials"},f("focus","Focus an hour",0,100),f("fatigue","Fatigue an hour",0,100),f("featureSize","Feature size",0,1e3,wt,vt),f("weeks","Weeks",1,16));function y(){h.replaceChildren(...Object.keys(n).map(S=>u("option",{value:S,selected:S===a},S)));const x=n[a];d.value=String(x?.focus??0),p.value=String(x?.fatigue??0)}h.addEventListener("change",()=>{a=h.value,y()});const k=()=>{n[a]={focus:Number(d.value)||0,fatigue:Number(p.value)||0},H()};d.addEventListener("change",k),p.addEventListener("change",k);const $=()=>{const x=v.value.trim();!x||n[x]||(n[x]={focus:0,fatigue:0},a=x,v.value="",y())},M=u("div",{class:"row"},u("span",{},"Paint: "),h,u("span",{},"focus "),d,u("span",{},"fatigue "),p,v,u("button",{type:"button",onclick:$},"Add"));let m=null;const w=x=>{if(m==="add"&&!o[x])o[x]=a;else if(m==="remove"&&o[x])delete o[x];else return;H()};function T(){c.replaceChildren(u("span"),...pe.map(x=>u("span",{class:"head"},x))),qe.forEach((x,S)=>{c.append(u("span",{class:"hour"},x));for(let P=0;P<5;P+=1){const A=`${P}-${S}`,b=o[A];c.append(u("span",{class:b?"slot meeting":"slot",title:b??"free",onpointerdown:D=>{D.preventDefault(),m=o[A]?"remove":"add",w(A)},onpointerenter:()=>{m&&w(A)}},b?b.slice(0,2):""))}})}window.addEventListener("pointerup",()=>{m=null});const E=u("div",{class:"row"}),R=()=>{s={summary:Ee(Me({...t,calendar:o,meetingTypes:n}),t),weeks:t.weeks},H()},O=()=>{s=null,H()};function H(){T();const x=Me({...t,calendar:o,meetingTypes:n}),S=Ee(x,t),P=t.weeks*5*8;r.replaceChildren(u("div",{class:"clean"},u("strong",{},S.totalFeatures.toFixed(1)),"features finished"),u("div",{},u("strong",{},S.averageFeaturesPerWeek.toFixed(2)),"features a week"),u("div",{},u("strong",{},Math.round(S.totalProductivity/P).toString()),"productivity an hour"),u("div",{},u("strong",{},String(P)),"hours simulated")),E.replaceChildren(s?u("span",{},`Baseline: ${s.summary.averageFeaturesPerWeek.toFixed(2)} features a week over ${s.weeks} weeks; now ${S.averageFeaturesPerWeek.toFixed(2)}. `):u("span",{},"Keep this run to compare against: "),u("button",{type:"button",onclick:R},s?"Save again":"Save as baseline")),s&&E.append(u("button",{type:"button",onclick:O},"Clear")),i.innerHTML=Ke([{name:"Productivity",className:"clean",values:S.days.map(A=>A.productivity/t.weeks)},{name:"Features ×100",className:"debt",values:S.days.map(A=>A.features/t.weeks*100)}],{x:"",y:"A day, on average"},pe),i.prepend(u("h4",{},"The shape of a week")),l.replaceChildren(oe("Focus",S.hours.focus),oe("Fatigue",S.hours.fatigue),oe("Productivity",S.hours.productivity),oe("Features finished",S.hours.features))}y(),e.append(g,M,u("div",{class:"charts"},c,i),r,E,l),H()}const le=20;function xt(e){const{baseTime:t,shortcutFactor:n,interestRate:o,timeHorizon:a}=e,s=[];let r=null;const i=t;let l=t*(1-n),c=0,h=0,d=0,p=0,v=0,f=0;for(let g=0;g<a*le;){for(;v<=g;)c+=1,d+=1,v+=i;for(;f<=g;)h+=1,p+=1,f+=l,l*=1+o;if(g+=1,g%le===0){const y=g/le;s.push({month:y,cleanCumulative:c,debtCumulative:h,cleanMonthly:d,debtMonthly:p,debtFeatureCost:l}),d=0,p=0,r===null&&c>h&&(r=y)}}return{months:s,breakEvenMonth:r}}const kt=[{key:"baseTime",label:"Base time",min:1,max:30,step:1,show:e=>`${e} days`},{key:"shortcutFactor",label:"Shortcuts",min:0,max:.9,step:.05,show:e=>`${Math.round(e*100)}%`},{key:"interestRate",label:"Interest",min:0,max:1,step:.01,show:e=>`${Math.round(e*100)}%`},{key:"timeHorizon",label:"Timeline",min:6,max:60,step:1,show:e=>`${e} months`}];function $t(e){const t={baseTime:20,shortcutFactor:.25,interestRate:.1,timeHorizon:24},n=u("div",{class:"figures"}),o=u("div",{class:"chart"}),a=u("div",{class:"chart"}),s=u("p"),r=u("div",{class:"dials"},...kt.map(l=>{const c=u("output",{},l.show(t[l.key])),h=u("input",{type:"range",min:l.min,max:l.max,step:l.step,value:t[l.key],oninput:()=>{t[l.key]=Number(h.value),c.textContent=l.show(t[l.key]),i()}});return u("label",{},`${l.label}: `,c,h)}));function i(){const{months:l,breakEvenMonth:c}=xt(t),h=l[l.length-1],d=h?.cleanCumulative??0,p=h?.debtCumulative??0,v=d>0?(d-p)/d*100:0,f=Math.abs(v)<.1?"Even":v>0?"Loss":"Gain",g=Math.abs(v)<.1?"≈0%":`${Math.abs(v).toFixed(1)}%`;n.replaceChildren(u("div",{class:"clean"},u("strong",{},String(d)),"clean features"),u("div",{class:"debt"},u("strong",{},String(p)),"debt features"),u("div",{},u("strong",{},c?`month ${c}`:"never"),"break-even"),u("div",{},u("strong",{},g),`${f.toLowerCase()} on the shortcut road`)),o.innerHTML=yt([{name:"Clean",className:"clean",values:l.map(y=>y.cleanCumulative)},{name:"Debt-driven",className:"debt",values:l.map(y=>y.debtCumulative)}],{x:"Months",y:"Features"}),o.prepend(u("h4",{},"Cumulative features")),a.innerHTML=Ke([{name:"Clean",className:"clean",values:l.slice(1).map(y=>y.cleanMonthly)},{name:"Debt-driven",className:"debt",values:l.slice(1).map(y=>y.debtMonthly)}],{x:"Months",y:"Features a month"}),a.prepend(u("h4",{},"Monthly delivery rate")),s.textContent=t.interestRate===0?"With no interest there is no compound slowdown, and the shortcut simply wins. That is the one case that does not happen to real code.":c?`${Math.round(t.shortcutFactor*100)}% saved at first, ${Math.round(t.interestRate*100)}% interest on every feature: clean development overtakes at month ${c}, and by month ${t.timeHorizon} the shortcut road has delivered ${g} less.`:`${Math.round(t.shortcutFactor*100)}% saved at first, ${Math.round(t.interestRate*100)}% interest on every feature: in ${t.timeHorizon} months the clean road has not yet caught up. Give it longer, or raise the interest.`}e.append(r,n,u("div",{class:"charts"},o,a),s),i()}const L=(1+Math.sqrt(5))/2,Tt=[[-1,L,0],[1,L,0],[-1,-L,0],[1,-L,0],[0,-1,L],[0,1,L],[0,-1,-L],[0,1,-L],[L,0,-1],[L,0,1],[-L,0,-1],[-L,0,1]],St=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];function Mt(){const e=Tt.map(([t,n,o])=>{const a=Math.hypot(t,n,o);return{direction:[t/a,n/a,o/a],radius:1}});return Ge(e,St.map(t=>[...t]))}function Et(e,t){const n=Array.from({length:e.vertexCount},(r,i)=>({direction:[e.directions[i*3]??0,e.directions[i*3+1]??0,e.directions[i*3+2]??0],radius:e.radii[i]??1})),o=new Map,a=(r,i)=>{const l=r<i?`${r}:${i}`:`${i}:${r}`,c=o.get(l);if(c!==void 0)return c;const h=n[r],d=n[i],[p,v,f]=h.direction,[g,y,k]=d.direction,$=Math.hypot(p*h.radius-g*d.radius,v*h.radius-y*d.radius,f*h.radius-k*d.radius),[M,m,w]=[(p+g)/2,(v+y)/2,(f+k)/2],T=Math.hypot(M,m,w)||1;n.push({direction:[M/T,m/T,w/T],radius:(h.radius+d.radius)/2+t($)});const E=n.length-1;return o.set(l,E),E},s=[];for(let r=0;r<e.faceCount;r+=1){const i=e.faces[r*3],l=e.faces[r*3+1],c=e.faces[r*3+2],h=a(i,l),d=a(l,c),p=a(c,i);s.push([i,h,p],[l,d,h],[c,p,d],[h,d,p])}return Ge(n,s)}function Ge(e,t){const n=new Float32Array(e.length*3),o=new Float32Array(e.length);e.forEach(({direction:s,radius:r},i)=>{n[i*3]=s[0],n[i*3+1]=s[1],n[i*3+2]=s[2],o[i]=r});const a=new Uint32Array(t.length*3);return t.forEach(([s,r,i],l)=>{a[l*3]=s,a[l*3+1]=r,a[l*3+2]=i}),{directions:n,radii:o,faces:a,faceCount:t.length,vertexCount:e.length}}function Ct(e,t){const n=e.radii[t]??1;return[(e.directions[t*3]??0)*n,(e.directions[t*3+1]??0)*n,(e.directions[t*3+2]??0)*n]}function At(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let n=Math.imul(t^t>>>15,1|t);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function It(e){const t=Mt();return{seed:e,mesh:t,temperature:new Float32Array(t.vertexCount),faceColour:new Uint8ClampedArray(t.faceCount*3),seaRadius:0}}function Dt(e,t){return{...e,mesh:t,temperature:new Float32Array(t.vertexCount),faceColour:new Uint8ClampedArray(t.faceCount*3)}}function Rt(e,t){return Math.abs(e.mesh.directions[t*3+1]??0)}function Ue(e,t,n){const o=e.mesh.faces[n*3]??0,a=e.mesh.faces[n*3+1]??0,s=e.mesh.faces[n*3+2]??0;return((t[o]??0)+(t[a]??0)+(t[s]??0))/3}function Pt(e,t){return Ue(e,e.mesh.radii,t)}const ze=(e=4,t=.28)=>n=>{const o=At(n.seed);let a=n.mesh;for(let s=0;s<e;s+=1)a=Et(a,r=>r*t*(o()-.5));return Dt(n,a)},Je=({equator:e=1,pole:t=.05,peak:n=.42}={})=>o=>{const a=new Float32Array(o.mesh.vertexCount),s=o.mesh.radii,r=s.reduce((c,h)=>Math.min(c,h),1/0),l=s.reduce((c,h)=>Math.max(c,h),-1/0)-r||1;for(let c=0;c<o.mesh.vertexCount;c+=1){const h=((s[c]??1)-r)/l,d=Rt(o,c)**2.2;a[c]=e+(t-e)*d+(n-e)*h}return{...o,temperature:a}},Xe=(e=.55)=>t=>{const n=Float32Array.from(t.mesh.radii).sort(),o=Math.min(n.length-1,Math.floor(n.length*e)),a=n[o]??1,s=Float32Array.from(t.mesh.radii,r=>Math.max(r,a));return{...t,mesh:{...t.mesh,radii:s},seaRadius:a}},Ft=[24,92,168],Wt=[62,176,206],Ot=[214,196,138],Ae=[190,158,84],ue=[70,138,66],Lt=[74,104,76],Nt=[136,128,116],Ie=[238,243,247];function Y(e,t,n){const o=Math.min(1,Math.max(0,n));return[e[0]+(t[0]-e[0])*o,e[1]+(t[1]-e[1])*o,e[2]+(t[2]-e[2])*o]}function Ht(e){return e>.78?Ae:e>.62?Y(ue,Ae,(e-.62)/.16):e>.3?ue:Y(Lt,ue,(e-.12)*5.5)}const Ve=e=>{const t=new Uint8ClampedArray(e.mesh.faceCount*3),n=e.mesh.radii.reduce((a,s)=>Math.max(a,s),-1/0),o=Math.max(1e-6,n-e.seaRadius);for(let a=0;a<e.mesh.faceCount;a+=1){const s=(Pt(e,a)-e.seaRadius)/o,r=Ue(e,e.temperature,a);let i;s<=.002?(i=Y(Wt,Ft,.55),r<.16&&(i=Y(i,Ie,(.16-r)*6))):(i=Y(Ot,Ht(r),Math.min(1,s*9)),i=Y(i,Nt,Math.max(0,s-.55)*2.2),r<.26&&(i=Y(i,Ie,(.26-r)*4))),t[a*3]=i[0],t[a*3+1]=i[1],t[a*3+2]=i[2]}return{...e,faceColour:t}},_t=[ze(),Je(),Xe(),Ve];function Yt(e,t=_t){return t.reduce((n,o)=>o(n),It(e))}function Ze(e){return Yt(e.seed,[ze(e.levels,e.roughness),Je(),Xe(e.share),Ve])}const De=.3,jt=[-.5,.45,.74],Bt=1.02;function Re([e,t,n]){const o=Math.hypot(e,t,n)||1;return[e/o,t/o,n/o]}function we(e,t,n){const o=new Uint8ClampedArray(t*t*4),a=new Float32Array(t*t).fill(-1/0),[s,r,i]=Re(n.light??jt),l=n.tilt??-.38,c=Math.cos(l),h=Math.sin(l),d=Math.cos(n.rotation),p=Math.sin(n.rotation),v=e.mesh.radii.reduce((k,$)=>Math.max(k,$),1),f=t/(2*v*Bt),g=new Float32Array(e.mesh.vertexCount*3),y=new Float32Array(e.mesh.vertexCount*3);for(let k=0;k<e.mesh.vertexCount;k+=1){const[$,M,m]=Ct(e.mesh,k),w=$*d-m*p,T=$*p+m*d,E=M*c+T*h,R=-M*h+T*c;g[k*3]=w,g[k*3+1]=E,g[k*3+2]=R,y[k*3]=t/2+w*f,y[k*3+1]=t/2-E*f,y[k*3+2]=R}for(let k=0;k<e.mesh.faceCount;k+=1){const $=e.mesh.faces[k*3]??0,M=e.mesh.faces[k*3+1]??0,m=e.mesh.faces[k*3+2]??0,w=y[$*3],T=y[$*3+1],E=y[$*3+2],R=y[M*3],O=y[M*3+1],H=y[M*3+2],x=y[m*3],S=y[m*3+1],P=y[m*3+2],A=(R-w)*(S-T)-(O-T)*(x-w);if(A>=0)continue;const b=g[$*3],D=g[$*3+1],I=g[$*3+2],F=g[M*3]-b,K=g[M*3+1]-D,_=g[M*3+2]-I,q=g[m*3]-b,G=g[m*3+1]-D,be=g[m*3+2]-I,[rt,it,ct]=Re([K*be-_*G,_*q-F*be,F*G-K*q]),re=De+(1-De)*Math.max(0,rt*s+it*r+ct*i),lt=(e.faceColour[k*3]??0)*re,ut=(e.faceColour[k*3+1]??0)*re,ht=(e.faceColour[k*3+2]??0)*re,dt=Math.max(0,Math.floor(Math.min(w,R,x))),mt=Math.min(t-1,Math.ceil(Math.max(w,R,x))),pt=Math.max(0,Math.floor(Math.min(T,O,S))),ft=Math.min(t-1,Math.ceil(Math.max(T,O,S)));for(let Q=pt;Q<=ft;Q+=1)for(let ee=dt;ee<=mt;ee+=1){const ie=ee+.5,ce=Q+.5,gt=(R-w)*(ce-T)-(O-T)*(ie-w),xe=(x-R)*(ce-O)-(S-O)*(ie-R),ke=(w-x)*(ce-S)-(T-S)*(ie-x);if(gt>0||xe>0||ke>0)continue;const $e=xe/A,Te=ke/A,Se=E*$e+H*Te+P*(1-$e-Te),U=Q*t+ee;Se<=a[U]||(a[U]=Se,o[U*4]=lt,o[U*4+1]=ut,o[U*4+2]=ht,o[U*4+3]=255)}}return o}const fe={levels:4,roughness:.28,share:.55},ve="header-world";function Qe(){try{const e=localStorage.getItem(ve);if(!e)return null;const t=JSON.parse(e);return[t.seed,t.levels,t.roughness,t.share].every(o=>typeof o=="number"&&Number.isFinite(o))?t:null}catch{return null}}function Kt(e){try{localStorage.setItem(ve,JSON.stringify(e))}catch{}}function qt(){try{localStorage.removeItem(ve)}catch{}}const Z=32;let he=null;function Pe(e,t){const n=document.querySelector('link[rel="icon"]');if(!n)return;he??=Object.assign(document.createElement("canvas"),{width:Z,height:Z});const o=he.getContext("2d");if(!o)return;const a=o.createImageData(Z,Z);a.data.set(we(e,Z,{rotation:t})),o.putImageData(a,0,0),n.type="image/png",n.href=he.toDataURL("image/png")}const Gt=90,Ut=400,de=new WeakMap;function ge(e,t){de.get(e)?.();const n=e.getContext("2d");if(!n)return()=>{};const o=t??{...fe,seed:Math.floor(Math.random()*16777215)},a=e.width,s=Ze(o),r=n.createImageData(a,a);e.dataset.seed=String(o.seed),e.title=`World ${o.seed}, ${s.mesh.faceCount.toLocaleString("en")} triangles`;const i=v=>{r.data.set(we(s,a,{rotation:v})),n.putImageData(r,0,0),e.classList.add("grown")};if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return i(.6),Pe(s,.6),de.set(e,()=>{}),()=>{};let l=0,c=-1/0;const h=performance.now(),d=v=>{const f=(v-h)/1e3/Gt*Math.PI*2;i(f),v-c>Ut&&(Pe(s,f),c=v),l=requestAnimationFrame(d)};l=requestAnimationFrame(d);const p=()=>cancelAnimationFrame(l);return de.set(e,p),p}const z=360,zt=60,Jt=480,Xt=900,J={x:1600,y:1e3};function Vt(e){const t=u("canvas",{class:"world",width:z,height:z}),n=t.getContext("2d");if(!n)return()=>{};const o={...fe,seed:Math.floor(Math.random()*16777215)},a=n.createImageData(z,z),s=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let r,i=.6,l=-.38,c=!s,h=null,d=performance.now();const p=document.documentElement,v=p.dataset.sky==="stars";let f=0,g=0,y="";v&&p.classList.add("sky-driven");const k=(b,D=0)=>{if(!v)return;const I=Xt/(Math.PI*2);f=((f-b*I)%J.x+J.x)%J.x,g=((g+D*I)%J.y+J.y)%J.y;const F=`${(Math.round(f*2)/2).toFixed(1)}px ${(Math.round(g*2)/2).toFixed(1)}px`;if(F===y)return;y=F;const[K,_]=F.split(" ");p.style.setProperty("--sky-x",K??"0px"),p.style.setProperty("--sky-y",_??"0px")},$=u("p",{class:"hint"}),M=document.querySelector("canvas.planet"),m=(20*4**fe.levels).toLocaleString("en"),w=()=>{r=Ze(o);const b=Qe();$.textContent=`World ${o.seed}: ${r.mesh.faceCount.toLocaleString("en")} triangles. `+(b?`The header is keeping world ${b.seed}, ${(20*4**b.levels).toLocaleString("en")} triangles.`:`The header grows a new one every visit, ${m} triangles each.`),E.hidden=!b,R()},T=u("button",{type:"button",onclick:()=>{Kt({...o}),M&&ge(M,{...o}),w()}},"Put it in the header"),E=u("button",{type:"button",hidden:!0,onclick:()=>{qt(),M&&ge(M),w()}},"Let the header grow its own"),R=()=>{a.data.set(we(r,z,{rotation:i,tilt:l})),n.putImageData(a,0,0)};let O=0;const H=b=>{const D=(b-d)/1e3;c&&!h&&(i+=D/zt*Math.PI*2,R()),h||k(D/Jt*Math.PI*2),d=b,O=requestAnimationFrame(H)};t.addEventListener("pointerdown",b=>{h={x:b.clientX,y:b.clientY},t.setPointerCapture(b.pointerId)}),t.addEventListener("pointermove",b=>{if(!h)return;const D=t.clientWidth||z,I=(b.clientX-h.x)/D*Math.PI;i+=I;const F=l;l=Math.max(-1.2,Math.min(1.2,l-(b.clientY-h.y)/D*Math.PI)),k(I,l-F),h={x:b.clientX,y:b.clientY},R()}),t.addEventListener("pointerup",()=>{h=null}),t.addEventListener("pointercancel",()=>{h=null});const x=u("input",{type:"number",min:0,value:o.seed,onchange:()=>{o.seed=Math.max(0,Math.floor(Number(x.value)||0)),w()}}),S=u("button",{type:"button",onclick:()=>{o.seed=Math.floor(Math.random()*16777215),x.value=String(o.seed),w()}},"Another world"),P=u("button",{type:"button",onclick:()=>{c=!c,P.textContent=c?"Hold still":"Turn"}},c?"Hold still":"Turn"),A=(b,D,I,F,K,_)=>{const q=u("output",{},_(o[b])),G=u("input",{type:"range",min:I,max:F,step:K,value:o[b],onchange:()=>{o[b]=Number(G.value),q.textContent=_(o[b]),w()},oninput:()=>{q.textContent=_(Number(G.value))}});return u("label",{},`${D}: `,q,G)};return e.append(t,u("div",{class:"row"},u("span",{},"Seed "),x,S,P,T,E),u("div",{class:"dials"},A("levels","Detail",2,5,1,b=>`${b} splits`),A("roughness","Roughness",.05,.5,.01,b=>b.toFixed(2)),A("share","Sea",.2,.85,.01,b=>`${Math.round(b*100)}%`)),$),w(),O=requestAnimationFrame(H),()=>{cancelAnimationFrame(O),p.classList.remove("sky-driven"),p.style.removeProperty("--sky-x"),p.style.removeProperty("--sky-y")}}const Zt={"technical-debt":$t,"developer-meetings":bt,worlds:Vt};function Fe(){const e=[];for(const t of document.querySelectorAll(".app[data-app]")){const n=Zt[t.dataset.app??""],o=n?.(t);o&&e.push(o)}return()=>{for(const t of e)t()}}const Qt={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function N(e){return e.replace(/[&<>"]/g,t=>Qt[t]??t)}function en(e,t){const o=/^https?:/.test(t)?' target="_blank" rel="noopener noreferrer"':"";return`<a href="${N(t)}"${o}>${e}</a>`}const tn=["large","wide"];function nn(e,t,n){const o=n&&tn.includes(n)?` class="${n}"`:"";return`<img src="${N(t)}" alt="${e}"${o}>`}function on(e){return N(e).replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g,(t,n,o,a)=>nn(n,o,a)).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,(t,n,o)=>en(n,o)).replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/(^|[^*])\*([^*]+)\*/g,"$1<em>$2</em>").replace(/ -- /g," — ").replace(/ {2,}\n/g,"<br>").replace(/\n/g," ")}function B(e){return e.split(/(`[^`]+`)/g).map(t=>t.startsWith("`")&&t.endsWith("`")&&t.length>1?`<code>${N(t.slice(1,-1))}</code>`:on(t)).join("")}const We=/^(?:[-*]|\d+\.)\s/;function an(e,t,n){if(!We.test(e[0]??""))return!1;const o=t.slice(n).find(a=>a.trim()!=="");return o!==void 0&&We.test(o)}function sn(e){const t=[],n=e.replace(/\r\n?/g,`
`).split(`
`);let o=[],a=!1;return n.forEach((s,r)=>{if(s.startsWith("```")){a=!a,o.push(s),a||(t.push(o),o=[]);return}if(!a&&s.trim()===""){if(an(o,n,r+1))return;o.length&&t.push(o),o=[];return}o.push(s)}),o.length&&t.push(o),t}function rn(e){return e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function cn(e){const t=/^(#{1,4})\s+(.*)$/.exec(e[0]??"");if(!t||!e.slice(0,-1).every(s=>/ {2,}$/.test(s)))return null;const o=t[1]?.length??1,a=[t[2]??"",...e.slice(1)].join(`
`);return`<h${o} id="${rn(a)}">${B(a)}</h${o}>`}function ln(e){if(!e[0]?.startsWith("```"))return null;const t=e.slice(1,-1).join(`
`);return`<pre><code>${N(t)}</code></pre>`}function un(e,t){const n=[];for(const o of e)t.test(o)?n.push(o.replace(t,"")):n.length&&(n[n.length-1]+=`
${o.trim()}`);return n}function hn(e){const t=e[0]??"",n=/^\d+\.\s/.test(t),o=/^[-*]\s/.test(t);if(!n&&!o)return null;const a=n?/^\d+\.\s+/:/^[-*]\s+/;if(!e.every(i=>a.test(i)||/^\s/.test(i)))return null;const s=n?"ol":"ul",r=un(e,a).map(i=>`<li>${B(i)}</li>`).join("");return`<${s}>${r}</${s}>`}function dn(e){return e.every(n=>n.includes(" :: "))?`<dl>${e.map(n=>{const o=n.indexOf(" :: ");return[n.slice(0,o),n.slice(o+4)]}).map(([n,o])=>`<dt>${B(n)}</dt><dd>${B(o)}</dd>`).join("")}</dl>`:null}function mn(e){if(!e.every(n=>n.startsWith(">")))return null;const t=e.map(n=>n.replace(/^>\s?/,"")).join(" ");return`<blockquote>${B(t)}</blockquote>`}function pn(e){const t=/^::([a-z0-9-]+)$/.exec(e[0]??"");return!t||e.length!==1?null:`<div class="app" data-app="${t[1]}"></div>`}function fn(e){return e.length===1&&/^-{3,}$/.test(e[0]??"")?"<hr>":null}function gn(e){const t=e.length===1&&/^(\\+)$/.exec(e[0]??"");return t?`<div class="space" style="--n:${t[1]?.length??1}"></div>`:null}function yn(e){return e.length===1&&/^!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)$/.test(e[0]??"")?`<figure>${B(e[0]??"")}</figure>`:null}function wn(e){return`<p>${B(e.join(`
`))}</p>`}const vn=[fn,gn,cn,ln,mn,pn,yn,dn,hn];function et(e){return sn(e).map(t=>{for(const n of vn){const o=n(t);if(o!==null)return o}return wn(t)}).join(`
`)}function bn(e,t){if(t.parent===null)return"";const n=e.childrenOf(t.route);return n.length===0?"":`<ul class="listing">${n.map(a=>`<li><a href="${a.route}">${N(a.title)}</a>`+(a.summary?` <span class="summary">${N(a.summary)}</span>`:"")+"</li>").join("")}</ul>`}function xn(e,t){const n=e.trailTo(t.route);if(n.length<=1)return"";const o=n.slice(1).map(a=>a.name).join("/");return`<p class="ran"><span class="ps1">~ $</span> cd ${N(o)} &amp;&amp; cat *</p>`}function kn(e,t){return`${xn(e,t)}
${et(t.body)}
${bn(e,t)}`}const $n="theme";function tt(){const e=document.documentElement,t=e.dataset.pageTheme;let n=null;try{n=localStorage.getItem($n)}catch{n=null}const o=t??(n==="light"||n==="dark"?n:null);o?e.dataset.theme=o:delete e.dataset.theme}function Tn(e,t){const n=document.querySelector("main");if(!n)return()=>!1;const o=(a,s=!0)=>{const r=e.at(a);if(!r)return!1;n.innerHTML=kn(e,r);const i=document.documentElement,l=r.fields.theme;l==="dark"||l==="light"?i.dataset.pageTheme=l:delete i.dataset.pageTheme,r.fields.sky?i.dataset.sky=r.fields.sky:delete i.dataset.sky,tt(),document.title=r.route==="/"?"David Rodenas":`${r.title} — David Rodenas`;for(const c of document.querySelectorAll("nav .navlink"))a.startsWith(c.getAttribute("href")??"\0")?c.setAttribute("aria-current","page"):c.removeAttribute("aria-current");return s&&(window.history.pushState({route:a},"",a),window.scrollTo({top:0})),window.goatcounter?.count?.({path:a,title:document.title}),t(a),!0};return document.addEventListener("click",a=>{if(a.defaultPrevented||a.button!==0||a.metaKey||a.ctrlKey||a.shiftKey||a.altKey)return;const s=a.target?.closest("a[href]");if(!s||s.target||s.dataset.run)return;const r=new URL(s.href,window.location.href);if(r.origin!==window.location.origin)return;const i=r.pathname.endsWith("/")?r.pathname:`${r.pathname}/`;e.at(i)&&(a.preventDefault(),i!==window.location.pathname&&o(i))}),window.addEventListener("popstate",()=>{const a=window.location.pathname.endsWith("/")?window.location.pathname:`${window.location.pathname}/`;o(a,!1)}),o}const Sn=[{file:"book/index.md",markdown:`---
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
last ones only roughen a slope. Work out the climate from latitude and height.
Put in the sea as a minimum radius: everything below it is raised up to it,
which is why a coastline reads as a coastline and not as a change of colour.
Only then paint it. Paint first and you get a ball of one colour.

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
- **Detail** is how many times every edge is split in two. Each round has four times the triangles of the one before.
- **Roughness** is how far a new midpoint may move, as a fraction of the edge it came from. The 1999 default was 0.1; a little more makes for better mountains at this size.
- **Sea** is the share of the surface under water. The sea is a minimum radius: everything below it is raised up to it.

The pipeline runs in order, and the order is the meaning: raise the land, work
out the climate, put in the sea, and only then paint. Paint first and there is
nothing to paint.
`}],Oe="---";function Mn(e){return(/^"(.*)"$/.exec(e)??/^'(.*)'$/.exec(e))?.[1]??e}function En(e){const t=e.replace(/\r\n?/g,`
`).split(`
`);if(t[0]?.trim()!==Oe)return{fields:{},body:e.trim()};const n=t.indexOf(Oe,1);if(n<0)return{fields:{},body:e.trim()};const o={};for(const a of t.slice(1,n)){const s=a.indexOf(":");s<=0||(o[a.slice(0,s).trim()]=Mn(a.slice(s+1).trim()))}return{fields:o,body:t.slice(n+1).join(`
`).trim()}}function Cn(e){const n=e.replace(/\.md$/,"").replace(/(^|\/)index$/,"");return n===""?"/":`/${n}/`}function An(e){if(e==="/")return null;const t=e.slice(0,-1);return t.slice(0,t.lastIndexOf("/")+1)}function Le(e){if(e==="/")return"/";const t=e.slice(0,-1);return t.slice(t.lastIndexOf("/")+1)}function In(e){const{fields:t,body:n}=En(e.markdown),o=Cn(e.file);return{file:e.file,route:o,parent:An(o),name:Le(o),title:t.title??Le(o),summary:t.summary??"",order:Number(t.order??"100"),body:n,fields:t}}function Ne(e,t){return e.order-t.order||e.name.localeCompare(t.name)}class Dn{byRoute;constructor(t){const n=t.map(In).sort(Ne);this.byRoute=new Map(n.map(o=>[o.route,o]))}get pages(){return[...this.byRoute.values()]}at(t){return this.byRoute.get(t)}childrenOf(t){return this.pages.filter(n=>n.parent===t).sort(Ne)}trailTo(t){const n=this.at(t);return n?n.parent===null?[n]:[...this.trailTo(n.parent),n]:[]}}const me=new Dn(Sn);class Rn{lines=[];drafts=[];index=0;add(t){this.lines.push(t),this.drafts=[...this.lines,""],this.index=this.lines.length}previous(t){return this.moveTo(this.index-1,t)}next(t){return this.moveTo(this.index+1,t)}moveTo(t,n){return this.drafts.length===0&&(this.drafts=[""]),t<0||t>=this.drafts.length?n:(this.drafts[this.index]=n,this.index=t,this.drafts[t]??n)}}function nt(e){return e.split(/\s*(?:;|&&)\s*/).map(t=>t.trim().split(/\s+/).filter(Boolean)).filter(t=>t.length>0)}function se(e,t){const o=t.startsWith("~")||t.startsWith("/")?[]:e.split("/").filter(Boolean),a=t.replace(/^~/,"").split("/").filter(Boolean),s=[...o];for(const r of a)r!=="."&&(r===".."?s.pop():s.push(r));return s.length===0?"/":`/${s.join("/")}/`}function Pn(e){return e.replace(/(?:^|\/)(?:README\.md|\*)$/,"")||"."}const Fn={name:"cat",usage:"cat <file>",description:"print a page, README.md or * for the one here",run({site:e,cwd:t},[n]){if(!n)return{text:"cat: usage: cat <file>",error:!0};const o=e.at(se(t,Pn(n)));return!o||/\.md$/.test(n)!==/README\.md$/.test(n)?{text:`cat: ${n}: no such file`,error:!0}:{html:et(o.body)}}},Wn={name:"cd",usage:"cd [dir]",description:"go to a directory (the page follows)",run(e,[t="~"]){const n=se(e.cwd,t);return e.site.at(n)?(e.cwd=n,{navigate:n}):{text:`cd: ${t}: no such directory`,error:!0}}},On={name:"clear",usage:"clear",description:"clear what the shell has printed",run(){return{clear:!0}}},Ln={name:"help",usage:"help [command]",description:"this",run({commands:e},[t]){if(t){const a=e.find(s=>s.name===t);return a?{text:`${a.usage}
  ${a.description}`}:{text:`help: ${t}: no such command`,error:!0}}const n=Math.max(...e.map(a=>a.usage.length));return{text:["Commands:",...e.map(a=>`${a.usage.padEnd(n)}  ${a.description}`),"","Tab completes. Arrows recall."].join(`
`)}}};function Nn(e){const t=e.filter(o=>o.startsWith("-")).flatMap(o=>o.slice(1).split("")),n=e.find(o=>!o.startsWith("-"))??".";return{flags:t,path:n}}function Hn(e,t,n){const o=n==="."?"":`${n.replace(/\/$/,"")}/`;return[{mode:"--r-",name:"README.md",title:e.title,href:e.route,run:`cat ${o}README.md`},...t.map(a=>({mode:"dr-x",name:`${a.name}/`,title:a.title,href:a.route}))]}function He(e){const t=e.run?` data-run="${N(e.run)}"`:"";return`<a href="${N(e.href)}"${t}>${N(e.name)}</a>`}function _n(e,t){const n=(s,r)=>t?`${s.mode}  ${r.padEnd(20)}  ${s.title}`:r,o=s=>t?`${s.mode}  ${He(s)}${" ".repeat(Math.max(0,20-s.name.length))}  ${N(s.title)}`:He(s),a=t?[`total ${e.length}`]:[];return{text:[...a,...e.map(s=>n(s,s.name))].join(`
`),html:`<pre>${[...a,...e.map(o)].join(`
`)}</pre>`}}const Yn={name:"ls",usage:"ls [-l] [path]",description:"list what a directory holds; -l says what each is",run({site:e,cwd:t},n){const{flags:o,path:a}=Nn(n),s=o.find(l=>l!=="l");if(s)return{text:`ls: -${s}: no such option. Try ls -l`,error:!0};const r=se(t,a),i=e.at(r);return i?_n(Hn(i,e.childrenOf(r),a),o.includes("l")):{text:`ls: ${a}: no such directory`,error:!0}}};function ot(e){return e==="/"?"~":`~${e.replace(/\/$/,"")}`}const jn={name:"pwd",usage:"pwd",description:"print where you are",run({cwd:e}){return{text:ot(e)}}},Bn=["light","dark","system"];function Kn(e){return Bn.includes(e)}const qn={name:"theme",usage:"theme [light|dark|system]",description:"switch the colours, or toggle them",run({site:e,cwd:t},[n]){const o=e.at(t)?.fields.theme;return o?{text:`theme: this page keeps its own, ${o}. It works everywhere else.`,error:!0}:n===void 0?{theme:"toggle",text:"theme: toggled"}:Kn(n)?{theme:n,text:`theme: ${n}`}:{text:`theme: ${n}: choose light, dark or system`,error:!0}}},Gn=[Yn,Wn,Fn,jn,Ln,On,qn];class Un{context;constructor(t,n,o=Gn){this.context={site:t,cwd:n,commands:o}}get prompt(){return`${ot(this.context.cwd)} $`}moveTo(t){return this.context.site.at(t)?(this.context.cwd=t,!0):!1}run(t){const n=[];for(const[o="",...a]of nt(t)){const s=this.context.commands.find(i=>i.name===o),r=s?s.run(this.context,a):{text:`${o}: command not found. Try help`,error:!0};if(n.push(r),r.error)break}return n}complete(t){const n=t.split(/\s+/),o=n.pop()??"",a=n.length===0?"":`${n.join(" ")} `;return(n.length===0?this.commandNames():this.pathNames(o)).filter(r=>r.startsWith(o)).map(r=>a+r)}commandNames(){return this.context.commands.map(t=>t.name).sort()}pathNames(t){const n=t.lastIndexOf("/"),o=n<0?".":t.slice(0,n+1),a=se(this.context.cwd,o);if(!this.context.site.at(a))return[];const s=n<0?"":o;return["README.md",...this.context.site.childrenOf(a).map(i=>`${i.name}/`)].map(i=>s+i)}}const ye="theme";function zn(){return window.matchMedia("(prefers-color-scheme: dark)").matches}function Jn(){let e=null;try{e=localStorage.getItem(ye)}catch{e=document.documentElement.dataset.theme??null}return e==="light"||e==="dark"?e:zn()?"dark":"light"}function Xn(e){const t=e==="toggle"?Jn()==="dark"?"light":"dark":e;try{t==="system"?localStorage.removeItem(ye):localStorage.setItem(ye,t)}catch{}return tt(),t}const at="shell-screen",st="shell-pending";function Vn(e,t){try{sessionStorage.setItem(at,e.innerHTML),t&&sessionStorage.setItem(st,t)}catch{}}function _e(e){try{const t=sessionStorage.getItem(e)??"";return sessionStorage.removeItem(e),t}catch{return""}}function Zn(){window.__stopTyped?.();const e=window.__typed??[];if(window.__typed=[],e.length===0)return null;const t=[];let n="";for(const o of e)o==="Enter"?(t.push(n),n=""):o==="Backspace"?n=n.slice(0,-1):n+=o;return{finished:t,unfinished:n}}function Qn(e,t,n={}){const o=document.querySelector(".terminal"),a=o?.querySelector(".screen"),s=o?.querySelector("form.prompt"),r=s?.querySelector("input"),i=s?.querySelector(".ps1");if(!o||!a||!s||!r||!i)return null;const l=new Un(e,t),c=new Rn;let h=null;const d=m=>{a.append(m)},p=()=>{h?.remove(),h=null},v=m=>{if(m.clear&&a.replaceChildren(),m.theme){const w=Xn(m.theme);d(u("pre",{},`theme: ${w}`));return}if(m.html){const w=u("div",{class:m.text?"listing-out":"cat"});w.innerHTML=m.html,d(w)}else m.text&&d(u("pre",{class:m.error?"error":""},m.text))},f=m=>{p(),d(u("p",{class:"echo"},u("span",{class:"ps1"},l.prompt),` ${m}`));const w=nt(m).map(T=>T.join(" "));for(let T=0;T<w.length;T+=1){const[E]=l.run(w[T]??"");if(E){if(E.navigate){if(n.navigate?.(E.navigate))continue;Vn(a,w.slice(T+1).join(" && ")),window.location.assign(E.navigate);return}if(v(E),E.error)break}}i.textContent=l.prompt,r.scrollIntoView({block:"nearest"})},g=()=>{if(p(),r.value.trim()===""){r.value="help";return}const m=l.complete(r.value);m.length===1?r.value=m[0]??r.value:m.length>1&&(h=u("p",{class:"hint"},m.map(w=>w.split(" ").pop()).join("  ")),d(h))};s.addEventListener("submit",m=>{m.preventDefault();const w=r.value.trim();r.value="",w&&(c.add(w),f(w))}),r.addEventListener("keydown",m=>{m.key==="Tab"?(m.preventDefault(),g()):m.key==="ArrowUp"?(m.preventDefault(),r.value=c.previous(r.value)):m.key==="ArrowDown"?(m.preventDefault(),r.value=c.next(r.value)):p()}),a.addEventListener("click",m=>{const w=m.target?.closest("a[data-run]");w?.dataset.run&&(m.preventDefault(),f(w.dataset.run))}),window.addEventListener("keydown",m=>{const T=m.target?.matches("input, textarea, select, [contenteditable]")??!1,E=m.key.length===1&&!m.ctrlKey&&!m.metaKey&&!m.altKey;T||!E||r.focus({preventScroll:!1})}),o.hidden=!1;const y=_e(at);y&&(a.innerHTML=y);const k=_e(st);k&&f(k);const $=Zn();if($){for(const m of $.finished)m.trim()&&(c.add(m.trim()),f(m.trim()));r.value=$.unfinished,r.focus()}return{run:f,moveTo:m=>{l.moveTo(m)&&(i.textContent=l.prompt)}}}function Ye(){const e=document.querySelector("canvas.planet");e&&ge(e,Qe()??void 0);const t=window.location.pathname.endsWith("/")?window.location.pathname:`${window.location.pathname}/`;let n=Fe(),o=null;const a=Tn(me,r=>{n(),n=Fe(),o?.moveTo(r)});o=Qn(me,me.at(t)?t:"/",{navigate:a});const s=document.querySelector(".theme-toggle");s&&o&&(s.classList.add("ready"),s.removeAttribute("aria-hidden"),s.removeAttribute("tabindex"),s.addEventListener("click",()=>o?.run("theme")))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ye):Ye();
