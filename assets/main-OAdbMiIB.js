function f(e,t={},...n){const a=document.createElement(e);for(const[s,o]of Object.entries(t))o===void 0||o===!1||(typeof o=="function"?a.addEventListener(s.slice(2).toLowerCase(),o):o===!0?a.setAttribute(s,""):a.setAttribute(s,String(o)));for(const s of n)s==null||s===!1||a.append(s);return a}const sa={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function I(e){return e.replace(/[&<>"]/g,t=>sa[t]??t)}const ra=["January","February","March","April","May","June","July","August","September","October","November","December"];function lt(e){const[t,n,a]=e.refreshed.split("-").map(Number),s=`${a} ${ra[(n??1)-1]} ${t}`,o=`${Math.min(...e.years)} to ${Math.max(...e.years)}`;return`<p class="source">Source: ${I(e.attribution)} <a href="${I(e.dataset)}">The dataset, at its source.</a> This site keeps sums of the finished years ${o}, last added to on ${s}.</p>`}function pn(e,t){const n=e.querySelector("p.source");if(n)return n;const a=document.createElement("div");return fetch(t).then(s=>s.json()).then(s=>{a.innerHTML=lt(s)}).catch(()=>{}),a}const ee=[{code:"08019004",name:"Barcelona (Poblenou)",kind:"background",area:"urban"},{code:"08019043",name:"Barcelona (Eixample)",kind:"traffic",area:"urban"},{code:"08019044",name:"Barcelona (Gràcia - Sant Gervasi)",kind:"traffic",area:"urban"},{code:"08019057",name:"Barcelona (Palau Reial)",kind:"background",area:"urban"},{code:"08019058",name:"Barcelona (Observatori Fabra)",kind:"background",area:"suburban"},{code:"08015021",name:"Badalona",kind:"background",area:"urban"},{code:"08187012",name:"Sabadell",kind:"traffic",area:"urban"},{code:"17079003",name:"Girona (Escola de Música)",kind:"traffic",area:"urban"},{code:"25120001",name:"Lleida",kind:"traffic",area:"urban"},{code:"43148028",name:"Tarragona (Parc de la Ciutat)",kind:"background",area:"urban"},{code:"08137001",name:"Montseny (La Castanya)",kind:"background",area:"rural"}];function Ve(e,t){return t==="workdays"?[e.workdays]:t==="weekends"?[e.weekends]:[e.workdays,e.weekends]}const ia=e=>(e%4===0&&e%100!==0||e%400===0?366:365)*24,Be=e=>e.reduce((t,n)=>t+n.reduce((a,s)=>a+s,0),0);function ca(e,t){return Object.entries(e.years).map(([n,a])=>{const s=Ve(a,t),o=s.reduce((c,l)=>c+Be(l.counts),0),r=s.reduce((c,l)=>c+Be(l.sums),0),i=Ve(a,"all").reduce((c,l)=>c+Be(l.counts),0);return{year:Number(n),mean:o>0?r/o:Number.NaN,measured:i/ia(Number(n))}}).filter(({mean:n})=>!Number.isNaN(n)).sort((n,a)=>n.year-a.year)}function la(e,t){const n=Object.entries(e.years).filter(([a])=>Number(a)>=t.from&&Number(a)<=t.to).flatMap(([,a])=>Ve(a,t.days));return Array.from({length:24},(a,s)=>Array.from({length:12},(o,r)=>{const i=n.reduce((l,h)=>l+(h.sums[r]?.[s]??0),0),c=n.reduce((l,h)=>l+(h.counts[r]?.[s]??0),0);return{mean:c>0?i/c:null,count:c}}))}const Z=[[0,[0,255,0]],[20,[225,225,0]],[40,[255,0,0]],[60,[225,0,225]],[80,[64,0,64]],[230,[16,0,8]]],ha=([e,t,n])=>(.299*e+.587*t+.114*n)/255;function ht(e){const t=Math.max(0,Math.min(e,230)),n=Math.max(1,Z.findIndex(([l])=>l>=t)),[a,s]=Z[n-1]??Z[0],[o,r]=Z[n]??Z[Z.length-1],i=(t-a)/(o-a),c=s.map((l,h)=>Math.round(l+((r[h]??0)-l)*i));return{background:`rgb(${c.join(",")})`,light:ha(c)<.45}}const Ie=80,gn=["January","February","March","April","May","June","July","August","September","October","November","December"],yn=e=>String(e+1).padStart(2,"0");function da(e,t,n){if(e.mean===null)return'<td class="none"></td>';const{background:a,light:s}=ht(e.mean),o=s?' class="deep"':"",r=`${gn[n]}, hour ${yn(t)}: ${e.mean.toFixed(1)} µg/m³, the mean of ${e.count} measurements`;return`<td${o} style="background:${a}" title="${r}">${Math.round(e.mean)}</td>`}function ua(e){const t=`<tr><th></th>${gn.map(a=>`<th scope="col">${a.slice(0,3)}</th>`).join("")}</tr>`,n=e.map((a,s)=>`<tr><th scope="row">${yn(s)}</th>${a.map((o,r)=>da(o,s,r)).join("")}</tr>`);return`<table class="heat graded"><thead>${t}</thead><tbody>${n.join("")}</tbody></table>`}function dt(e){if(e<=0)return[0];const t=10**Math.floor(Math.log10(e)),n=e/t>=5?t:e/t>=2?t/2:t/5,a=[];for(let s=0;s<=e;s+=n)a.push(Math.round(s*100)/100);return a}const ye=720,He=190,J={top:14,right:8,bottom:22,left:34},O=e=>e.toFixed(1);function wn(e,t,n){const a=Math.min(...e),s=Math.max(...e),o=ye-J.left-J.right,r=He-J.top-J.bottom,i=o/Math.max(1,s-a+1),c=d=>J.left+(d-a)*i,l=d=>J.top+r-(d-t)/Math.max(1e-9,n-t)*r,u=dt(n-t).map(d=>Math.round((d+t)*100)/100).map(d=>`<line class="grid" x1="${J.left}" x2="${ye-J.right}" y1="${O(l(d))}" y2="${O(l(d))}"/><text x="${J.left-4}" y="${O(l(d)+3)}" text-anchor="end">${d}</text>`).join(""),m=s-a>12?5:1,y=Array.from({length:s-a+1},(d,g)=>a+g).filter(d=>d%m===0).map(d=>`<text x="${O(c(d)+i/2)}" y="${He-6}" text-anchor="middle">${d}</text>`).join("");return{slot:i,x:c,y:l,left:J.left,right:ye-J.right,top:J.top,height:r,levels:d=>d.map(({from:g,to:v,value:p,label:b})=>`<line class="span" x1="${O(c(g))}" x2="${O(c(v)+i)}" y1="${O(l(p))}" y2="${O(l(p))}"/><text class="span" x="${O((c(g)+c(v)+i)/2)}" y="${O(l(p)-5)}" text-anchor="middle">${b}</text>`).join(""),wrap:(d,g)=>`<svg class="years" viewBox="0 0 ${ye} ${He}" role="img" aria-label="${d}">${u}${y}${g}</svg>`}}function Ze(e,t){const n=Math.max(t.top??0,...e.map(({value:h})=>h),1),a=wn(e.map(({year:h})=>h),0,n),{x:s,y:o,slot:r}=a,i=e.map(({year:h,value:u,title:m,chosen:y,partial:d,colour:g})=>`<rect class="${["bar",y?"chosen":"",d?"partial":""].filter(Boolean).join(" ")}" data-year="${h}"${g?` style="--bar:${g}"`:""} x="${O(s(h)+r*.15)}" y="${O(o(u))}" width="${O(r*.7)}" height="${O(o(0)-o(u))}"/><rect class="hit" data-year="${h}" x="${O(s(h))}" y="${a.top}" width="${O(r)}" height="${a.height}"><title>${m}</title></rect>`).join(""),c=(t.references??[]).map(({value:h,label:u})=>`<line class="reference" x1="${a.left}" x2="${a.right}" y1="${O(o(h))}" y2="${O(o(h))}"/><text class="reference" x="${a.right-2}" y="${O(o(h)-3)}" text-anchor="end">${u}</text>`).join(""),l=a.levels(t.spans??[]);return a.wrap(t.label,`${i}${c}${l}`)}const ma=.75,fa=[{value:40,label:"EU limit, 40"},{value:10,label:"WHO guideline, 10"}];function pa(e,t){const n=e.map(({year:a,mean:s,measured:o})=>{const r=o<ma,i=r?`, from only ${Math.round(o*100)}% of the year's hours`:"";return{year:a,value:s,partial:r,colour:ht(s).background,chosen:a>=t.from&&a<=t.to,title:`${a}: ${s.toFixed(1)} µg/m³${i}`}});return Ze(n,{label:"Mean NO2 of each year, µg/m³",top:Ie,references:fa})}const jt={all:"every day of the week",workdays:"Monday to Friday",weekends:"Saturdays and Sundays"};function ga(){const e=Array.from({length:Ie/5+1},(n,a)=>ht(a*5).background),t=[0,20,40,60,Ie].map(n=>`<span>${n===Ie?`${n}+`:n}</span>`).join("");return`<div class="scale" aria-hidden="true"><div class="ramp" style="background:linear-gradient(to right,${e.join(",")})"></div><div class="ticks">${t}</div><div class="ticks words"><span>clean</span><span>EU limit</span><span>twice it</span></div></div>`}function bn(e,t){const n=Object.keys(e.years).map(Number),a=Math.max(t.from,Math.min(...n)),s=Math.min(t.to,Math.max(...n)),o=a===s?String(a):`${a}–${s}`;return`<figure class="no2"><figcaption><strong>${e.name}</strong> · ${e.kind}, ${e.area} · mean NO2 in µg/m³ by hour of the day and month of the year · ${jt[t.days]}, ${o}</figcaption>`+ua(la(e,t))+ga()+`<h4>The mean of each year, ${jt[t.days]}</h4>`+pa(ca(e,t.days),{from:a,to:s})+"</figure>"}function Qe(e){const t=Object.keys(e.years).map(Number);return{from:Math.min(...t),to:Math.max(...t),days:"all"}}const ya=[["all","every day"],["workdays","Monday to Friday"],["weekends","Saturday and Sunday"]];function wa(e){const t=new Map,n=pn(e,"/data/no2/index.json"),a=f("div");a.append(...e.querySelectorAll("figure"));let s=null,o={from:0,to:9999,days:"all"},r=!1;const i=(p,b=String(p))=>f("option",{value:p},b),c=f("select",{onchange:()=>{g(c.value)}},...ee.map(({code:p,name:b})=>i(p,b))),l=f("select",{onchange:()=>d({days:l.value})},...ya.map(([p,b])=>i(p,b))),h=f("select",{onchange:()=>d({from:Number(h.value),to:Math.max(Number(h.value),o.to)})}),u=f("select",{onchange:()=>d({to:Number(u.value),from:Math.min(Number(u.value),o.from)})}),m=f("button",{type:"button",onclick:()=>s&&d(Qe(s))},"every year");function y(){s&&(a.innerHTML=bn(s,o),h.value=String(o.from),u.value=String(o.to),l.value=o.days)}function d(p){o={...o,...p},y()}async function g(p){const b=t.get(p)??fetch(`/data/no2/${p}.json`).then(x=>x.json());t.set(p,b);try{const x=await b;if(r||c.value!==p)return;s=x,o={...Qe(x),days:o.days};const A=Object.keys(x.years);h.replaceChildren(...A.map(S=>i(S))),u.replaceChildren(...A.map(S=>i(S))),y()}catch{t.delete(p),a.replaceChildren(f("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}a.addEventListener("click",p=>{const b=p.target?.closest("[data-year]")?.getAttribute("data-year");b&&d({from:Number(b),to:Number(b)})});const v=f("div",{class:"row"},f("label",{},"Station ",c),f("label",{},"Days ",l),f("label",{},"Years ",h," to ",u),m);return e.replaceChildren(v,a,n),g(c.value),()=>{r=!0}}const ba="https://analisi.transparenciacatalunya.cat/resource";function vn(e,t){const n=new URL(`${ba}/${e}.json`);for(const[a,s]of Object.entries(t))s!==void 0&&n.searchParams.set(`$${a}`,String(s));return n.toString()}const Ot="tasf-thgu",$n=Array.from({length:24},(e,t)=>String(t+1).padStart(2,"0")),va=0,$a=6,we=()=>Array.from({length:12},()=>new Array(24).fill(0)),ka=()=>({workdays:{sums:we(),counts:we()},weekends:{sums:we(),counts:we()}});function xa(e){if(!Array.isArray(e))throw new Error("the portal did not answer with rows");if(e.length===0)throw new Error("the portal answered with no rows");return e}function Ta(e,t){const n=Number(t.month)-1;$n.forEach((a,s)=>{const o=e.sums[n],r=e.counts[n];if(!o||!r)throw new Error(`month ${t.month} is not a month`);o[s]=(o[s]??0)+Number(t[`s${a}`]??0),r[s]=(r[s]??0)+Number(t[`n${a}`]??0)})}const Sa={name:"no2",directory:"public/data/no2",firstYear:1991,files:ee.map(e=>`${e.code}.json`),about:{measures:"NO2, hourly, µg/m³",network:"Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica",attribution:"Generalitat de Catalunya, Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica. Dades obertes.",dataset:`https://analisi.transparenciacatalunya.cat/d/${Ot}`,stations:ee},requestsFor(e){const t=ee.map(a=>`'${a.code}'`).join(","),n=$n.map(a=>`sum(h${a}) as s${a}, count(h${a}) as n${a}`).join(", ");return[vn(Ot,{select:`codi_eoi, date_extract_m(data) as month, date_extract_dow(data) as dow, count(*) as days, ${n}`,where:`contaminant='NO2' and codi_eoi in (${t}) and data between '${e}-01-01T00:00:00' and '${e}-12-31T23:59:59'`,group:"codi_eoi,month,dow",limit:5e3})]},withYear(e,t,n){const a=xa(n[0]);if(a.some(o=>Number(o.days)>5))throw new Error("some days are in the portal twice");if(!a.some(o=>o.month==="12"))throw new Error("the year does not reach December yet");const s=new Map;for(const o of a){const r=o.codi_eoi??"",i=s.get(r)??ka();s.set(r,i);const c=Number(o.dow);Ta(c===va||c===$a?i.weekends:i.workdays,o)}return Object.fromEntries(ee.map(o=>{const r=`${o.code}.json`,i=s.get(o.code),c={...e[r]?.years,...i?{[t]:i}:{}};return[r,{...o,years:c}]}))}},Ma=e=>{const t=JSON.parse(e(`/data/no2/${ee[0]?.code}.json`)),n=JSON.parse(e("/data/no2/index.json"));return bn(t,Qe(t))+lt(n)},Aa={name:"air-quality",apps:{no2:wa},stills:{no2:Ma},sources:[Sa]},ne=5,Oe=8,oe=e=>Math.max(0,Math.min(100,e));function Pt(e){const{focus:t,fatigue:n,featureSize:a,weeks:s,calendar:o,meetingTypes:r}=e,i=[];let c=0,l=0;for(let h=0;h<s;h+=1)for(let u=0;u<ne;u+=1){let m=0,y=0;for(let d=0;d<Oe;d+=1){const g=r[o[`${u}-${d}`]??""];if(g){m=oe(m+g.focus),y=oe(y+g.fatigue),i.push({week:h,day:u,hour:d,inMeeting:!0,hourFocus:m,hourFatigue:y,hourProductivity:0,accumulatedProductivity:c,completedFeatures:l,featureCompleted:!1});continue}m=oe(m+t),y=oe(y+n);const v=oe(m-y),p=a-c,b=v>p,x=b?p:v;b?(l+=1,c=0):c+=x,i.push({week:h,day:u,hour:d,inMeeting:!1,hourFocus:m,hourFatigue:y,hourProductivity:x,accumulatedProductivity:c,completedFeatures:l,featureCompleted:b}),b&&(m=0)}}return i}function be(){return Array.from({length:Oe},()=>new Array(ne).fill(0))}function ve(e,{hour:t,day:n},a){const s=e[t];s&&(s[n]=(s[n]??0)+a)}function Nt(e,{featureSize:t,weeks:n}){const a=e[e.length-1],s=a?.completedFeatures??0,o=a?.accumulatedProductivity??0,r=s+Math.round(10*o/t)/10,i=s*t+o,c=Array.from({length:ne},()=>({productivity:0,features:0,meetings:0})),l={focus:be(),fatigue:be(),productivity:be(),features:be()};for(const u of e){const m=c[u.day];m.productivity+=u.hourProductivity,u.featureCompleted&&(m.features+=1),u.inMeeting&&(m.meetings+=1),ve(l.focus,u,u.hourFocus),ve(l.fatigue,u,u.hourFatigue),ve(l.productivity,u,u.hourProductivity),u.featureCompleted&&ve(l.features,u,1)}const h=u=>u.map(m=>m.map(y=>n>0?y/n:0));return{totalFeatures:r,totalProductivity:i,averageFeaturesPerWeek:n>0?r/n:0,averageProductivityPerWeek:n>0?i/n:0,days:c,hours:{focus:h(l.focus),fatigue:h(l.fatigue),productivity:h(l.productivity),features:l.features}}}const Ce=480,z=240,N={top:10,right:10,bottom:34,left:36};function kn(e,t,n,a){const s=Ce-N.left-N.right,o=z-N.top-N.bottom,r=l=>N.top+o-(e>0?l/e*o:0),i=a.map(l=>`<line class="grid" x1="${N.left}" x2="${Ce-N.right}" y1="${r(l)}" y2="${r(l)}"/><text x="${N.left-4}" y="${r(l)+3}" text-anchor="end">${l}</text>`).join(""),c=(n>1?[1,Math.ceil(n/2),n]:[]).filter((l,h,u)=>u.indexOf(l)===h).map(l=>`<text x="${N.left+(l-1)/Math.max(1,n-1)*s}" y="${z-N.bottom+14}" text-anchor="middle">${l}</text>`).join("");return`${i}${c}<text x="${N.left+s/2}" y="${z-6}" text-anchor="middle">${t.x}</text><text transform="translate(9 ${N.top+o/2}) rotate(-90)" text-anchor="middle">${t.y}</text>`}function Ia(e,t){const n=Math.max(...e.map(h=>h.values.length),1),a=Math.max(1,...e.flatMap(h=>h.values)),s=Ce-N.left-N.right,o=z-N.top-N.bottom,r=h=>N.left+h/Math.max(1,n-1)*s,i=h=>N.top+o-h/a*o,c=e.map(h=>{const u=h.values.map((m,y)=>`${r(y).toFixed(1)},${i(m).toFixed(1)}`).join(" ");return`<polyline class="line ${h.className}" points="${u}"><title>${h.name}</title></polyline>`}).join(""),l=e.map((h,u)=>`<rect class="${h.className}" x="${N.left+u*90}" y="${z-N.bottom+20}" width="10" height="3"/><text x="${N.left+u*90+14}" y="${z-N.bottom+24}">${h.name}</text>`).join("");return`<svg viewBox="0 0 ${Ce} ${z}" role="img" aria-label="${t.y} by ${t.x}">${kn(a,t,n,dt(a))}${c}${l}</svg>`}const Ft=480,se=240,H={top:10,right:10,bottom:34,left:36};function xn(e,t,n){const a=Math.max(...e.map(d=>d.values.length),1),s=Math.max(1,...e.flatMap(d=>d.values)),o=Ft-H.left-H.right,r=se-H.top-H.bottom,i=o/a,c=i*.7/e.length,l=d=>H.top+r-d/s*r,h=e.map((d,g)=>d.values.map((v,p)=>{const b=H.left+p*i+i*.15+g*c;return`<rect class="${d.className}" x="${b.toFixed(1)}" y="${l(v).toFixed(1)}" width="${c.toFixed(1)}" height="${(H.top+r-l(v)).toFixed(1)}"><title>${d.name}: ${Math.round(v*10)/10}</title></rect>`}).join("")).join(""),u=(n??[]).map((d,g)=>`<text x="${H.left+g*i+i/2}" y="${se-H.bottom+14}" text-anchor="middle">${d}</text>`).join(""),m=e.map((d,g)=>`<rect class="${d.className}" x="${H.left+g*90}" y="${se-H.bottom+20}" width="10" height="3"/><text x="${H.left+g*90+14}" y="${se-H.bottom+24}">${d.name}</text>`).join(""),y=kn(s,t,n?0:a,dt(s));return`<svg viewBox="0 0 ${Ft} ${se}" role="img" aria-label="${t.y} by ${t.x}">${y}${h}${u}${m}</svg>`}const et=["Mon","Tue","Wed","Thu","Fri"],Tn=Array.from({length:Oe},(e,t)=>`${9+t}:00`);function Ea(e){return e<=500?e:e<=750?500+(e-500)*2:e<1e3?1e3+(e-750)*35:1e4}function Ca(e){return e<=500?e:e<=1e3?500+(e-500)/2:e<1e4?750+(e-1e3)/35:1e3}function $e(e,t){const n=t.flat(),a=Math.min(...n),s=Math.max(...n),o=f("div",{class:"week"},f("span"),...et.map(r=>f("span",{class:"head"},r)));return t.forEach((r,i)=>{o.append(f("span",{class:"hour"},Tn[i]??""));for(const c of r){const l=s>a?(c-a)/(s-a):0;o.append(f("span",{class:"cell",style:`--heat:${(.1+l*.9).toFixed(2)}`},String(Math.round(c))))}}),f("div",{},f("h4",{},e),o)}function Da(e){const t={focus:25,fatigue:15,featureSize:300,weeks:8},n={"🍽️ Lunch":{focus:-100,fatigue:-100},"🏃 Sprint plan":{focus:-100,fatigue:50},"😴 Boring":{focus:-50,fatigue:-25}},a={};for(let T=0;T<ne;T+=1)a[`${T}-3`]="🍽️ Lunch";let s="🏃 Sprint plan",o=null;const r=f("div",{class:"figures"}),i=f("div",{class:"chart"}),c=f("div",{class:"maps"}),l=f("div",{class:"week"}),h=f("select"),u=f("input",{type:"number",min:-100,max:100}),m=f("input",{type:"number",min:-100,max:100}),y=f("input",{type:"text",placeholder:"New meeting name",size:16}),d=(T,$,D,w,M=j=>j,W=j=>j)=>{const j=f("output",{},String(t[T])),F=f("input",{type:"range",min:D,max:w,value:W(t[T]),oninput:()=>{t[T]=M(Number(F.value)),j.textContent=String(t[T]),P()}});return f("label",{},`${$}: `,j,F)},g=f("div",{class:"dials"},d("focus","Focus an hour",0,100),d("fatigue","Fatigue an hour",0,100),d("featureSize","Feature size",0,1e3,Ea,Ca),d("weeks","Weeks",1,16));function v(){h.replaceChildren(...Object.keys(n).map($=>f("option",{value:$,selected:$===s},$)));const T=n[s];u.value=String(T?.focus??0),m.value=String(T?.fatigue??0)}h.addEventListener("change",()=>{s=h.value,v()});const p=()=>{n[s]={focus:Number(u.value)||0,fatigue:Number(m.value)||0},P()};u.addEventListener("change",p),m.addEventListener("change",p);const b=()=>{const T=y.value.trim();!T||n[T]||(n[T]={focus:0,fatigue:0},s=T,y.value="",v())},x=f("div",{class:"row"},f("span",{},"Paint: "),h,f("span",{},"focus "),u,f("span",{},"fatigue "),m,y,f("button",{type:"button",onclick:b},"Add"));let A=null;const S=T=>{if(A==="add"&&!a[T])a[T]=s;else if(A==="remove"&&a[T])delete a[T];else return;P()};function C(){l.replaceChildren(f("span"),...et.map(T=>f("span",{class:"head"},T))),Tn.forEach((T,$)=>{l.append(f("span",{class:"hour"},T));for(let D=0;D<ne;D+=1){const w=`${D}-${$}`,M=a[w];l.append(f("span",{class:M?"slot meeting":"slot",title:M??"free",onpointerdown:W=>{W.preventDefault(),A=a[w]?"remove":"add",S(w)},onpointerenter:()=>{A&&S(w)}},M?M.slice(0,2):""))}})}window.addEventListener("pointerup",()=>{A=null});const k=f("div",{class:"row"}),E=()=>{o={summary:Nt(Pt({...t,calendar:a,meetingTypes:n}),t),weeks:t.weeks},P()},L=()=>{o=null,P()};function P(){C();const T=Pt({...t,calendar:a,meetingTypes:n}),$=Nt(T,t),D=t.weeks*ne*Oe;r.replaceChildren(f("div",{class:"clean"},f("strong",{},$.totalFeatures.toFixed(1)),"features finished"),f("div",{},f("strong",{},$.averageFeaturesPerWeek.toFixed(2)),"features a week"),f("div",{},f("strong",{},Math.round($.totalProductivity/D).toString()),"productivity an hour"),f("div",{},f("strong",{},String(D)),"hours simulated")),k.replaceChildren(o?f("span",{},`Baseline: ${o.summary.averageFeaturesPerWeek.toFixed(2)} features a week over ${o.weeks} weeks; now ${$.averageFeaturesPerWeek.toFixed(2)}. `):f("span",{},"Keep this run to compare against: "),f("button",{type:"button",onclick:E},o?"Save again":"Save as baseline")),o&&k.append(f("button",{type:"button",onclick:L},"Clear")),i.innerHTML=xn([{name:"Productivity",className:"clean",values:$.days.map(w=>w.productivity/t.weeks)},{name:"Features ×100",className:"debt",values:$.days.map(w=>w.features/t.weeks*100)}],{x:"",y:"A day, on average"},et),i.prepend(f("h4",{},"The shape of a week")),c.replaceChildren($e("Focus",$.hours.focus),$e("Fatigue",$.hours.fatigue),$e("Productivity",$.hours.productivity),$e("Features finished",$.hours.features))}v(),e.append(g,x,f("div",{class:"charts"},l,i),r,k,c),P()}const ja={name:"developer-meetings",apps:{"developer-meetings":Da}};function Oa(e,t){const n=[];for(let a=e.length-1;a>=0;a-=1)n.push(e.slice(0,a));for(let a=1;a<=t.length;a+=1)n.push(t.slice(0,a));return n}const Pa=3800,Na=6500,Fa=26,La=46,Ra=420;function Wa(e){return[...e.childNodes].map(t=>t.nodeName==="BR"?`
`:t.textContent??"").join("")}function Ba(e){const t=document.querySelector("main h1");if(!t||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return()=>{};const n={text:Wa(t)};t.setAttribute("aria-label",n.text),t.classList.add("typing");const a=document.createElement("span");a.className="caret idle",a.setAttribute("aria-hidden","true");const s=(h,u)=>{const m=h.split(`
`).flatMap((y,d)=>d===0?[y]:[document.createElement("br"),y]);if(u){const y=document.createElement("a");y.href=u,y.append(...m,a),t.replaceChildren(y)}else t.replaceChildren(...m,a)};s(n.text);let o=n,r=[],i=performance.now()+Pa,c=0;const l=h=>{if(c=requestAnimationFrame(l),h<i)return;if(r.length===0){const m=e(o,n);r=Oa(o.text,m.text),o=m,a.classList.remove("idle")}const u=r.shift()??o.text;s(u,r.length===0?o.href:void 0),r.length===0?(a.classList.add("idle"),i=h+Na):u===""?i=h+Ra:i=h+(u.length<(r[0]?.length??0)?La:Fa)};return c=requestAnimationFrame(l),()=>{cancelAnimationFrame(c),s(n.text),a.remove(),t.classList.remove("typing"),t.removeAttribute("aria-label")}}function Ha(e,t){const n=[...e];for(let a=n.length-1;a>0;a-=1){const s=Math.min(a,Math.floor(t()*(a+1)));[n[a],n[s]]=[n[s],n[a]]}return n}function _a(e,t){let n=[];return a=>(n.length===0&&(n=Ha(e,t),n.length>1&&n[0]===a&&n.push(n.shift())),n.shift()??a)}const Ja=[{text:`More than
half a million views
on Medium.`,href:"/essays/"},{text:`One essay
every Saturday
since 2022.`,href:"/essays/"},{text:`I made
the AngularJS compiler
faster.`,href:"/code/"},{text:`Two public APIs
of AngularJS
are mine.`,href:"/code/"},{text:`I wrote a book
on technical debt
and its emotional cost.`,href:"/book/"},{text:`Never rewrite,
never stop delivery:
the book's one rule.`,href:"/book/"},{text:`The world above
was grown
as this page opened.`,href:"/worlds/"}];let _e=null;const Ga={name:"headline",arrive:e=>{if(_e?.(),_e=null,e.route!=="/")return;let t=null;_e=Ba((n,a)=>(t??=_a([a,...Ja],Math.random),t(n)))}};function qa(e,t){let n=Array.from({length:t.length+1},(a,s)=>s);for(let a=1;a<=e.length;a+=1){const s=[a];for(let o=1;o<=t.length;o+=1){const r=(n[o-1]??0)+(e[a-1]===t[o-1]?0:1);s[o]=Math.min(r,(n[o]??0)+1,(s[o-1]??0)+1)}n=s}return n[t.length]??0}function Ya(e,t){if(t.includes(e))return e;let n=null,a=1/0;for(const s of t){const o=qa(e,s);o<a&&([n,a]=[s,o])}return n}const Ua=/[\p{L}\p{M}\p{N}']+|[.,!?;:]/gu,Ka=/\]\([^)]*\)|^---[\s\S]*?\n---|[#*_`>\[\]|]|::[a-z-]+/gm;function De(e){return e.normalize("NFKC").replace(Ka," ").toLowerCase().match(Ua)??[]}const ke=" ";class tt{constructor(t,n){this.memory=n;const a=De(t),s=new Map;for(const o of a)s.set(o,(s.get(o)??0)+1);this.vocabulary=[...s.keys()],this.commonest=[...s].reduce((o,r)=>o&&o[1]>=r[1]?o:r,null)?.[0]??null;for(let o=1;o<a.length;o+=1)for(let r=1;r<=n&&r<=o;r+=1){const i=a.slice(o-r,o).join(ke),c=this.followers.get(i)??new Map;c.set(a[o]??"",(c.get(a[o]??"")??0)+1),this.followers.set(i,c)}}memory;vocabulary;commonest;followers=new Map;after(t){for(let n=Math.min(this.memory,t.length);n>=1;n-=1){const a=t.slice(-n),s=this.followers.get(a.join(ke));if(s)return{context:a,candidates:Lt(s)}}return{context:[],candidates:[]}}transitions(){return[...this.followers].filter(([t])=>t.split(ke).length===this.memory).flatMap(([t,n])=>Lt(n).map(a=>({context:t.split(ke),...a}))).sort((t,n)=>n.probability-t.probability||n.count-t.count)}}function Lt(e){const t=[...e.values()].reduce((n,a)=>n+a,0);return[...e].map(([n,a])=>({word:n,count:a,probability:a/t})).sort((n,a)=>a.count-n.count)}function za(e,t){let n=t();for(const a of e)if(n-=a.probability,n<=0)return a.word;return e[e.length-1]?.word??null}function Rt(e){return e.reduce((t,n)=>t===""||/^[.,!?;:]$/.test(n)?t+n:`${t} ${n}`,"")}function Sn(e,t){if(t<=0)return e.map((s,o)=>({...s,probability:o===0?1:0}));const n=e.map(s=>s.probability**(1/t)),a=n.reduce((s,o)=>s+o,0);return e.map((s,o)=>({...s,probability:(n[o]??0)/a}))}const Je=40,Wt=8,Ge=e=>`${Math.round(e*100)}%`;function Mn(e,t,n){const{context:a,candidates:s}=e.after(t),o=s.slice(0,Wt),r=Sn(s,n).slice(0,Wt),i=s.reduce((g,{count:v})=>g+v,0),c=t.slice(0,t.length-a.length),l=`<p class="written">${I(Rt(c))}${c.length&&a.length?" ":""}${a.length?`<mark>${I(Rt(a))}</mark>`:""}<span class="caret"></span></p>`,h=o.length?`<ol class="offered">${o.map(({word:g,count:v,probability:p},b)=>{const x=r[b]?.probability??0;return`<li><button type="button" data-word="${I(g)}" title="seen ${v} of ${i} times: ${Ge(p)} as learnt"><span class="word">${I(g)}</span><span class="chance" style="--p:${x.toFixed(3)}"></span><span class="figure">${Ge(x)}</span></button></li>`}).join("")}</ol>`:`<p class="offered">It never saw anything follow “${I(t[t.length-1]??"")}”. This is where it stops.</p>`,u=g=>a.length===e.memory&&g.context.join(" ")===a.join(" "),m=e.transitions(),y=[...m.filter(u),...m.filter(g=>!u(g))].slice(0,Je).map(g=>`<tr${u(g)?' class="now"':""}><td>${I(g.context.join(" "))}</td><td>${I(g.word)}</td><td>${g.count}</td><td>${Ge(g.probability)}</td></tr>`).join(""),d=`<table class="learnt"><caption>What it learnt: ${m.length} transitions between ${e.vocabulary.length} words${m.length>Je?`, the first ${Je} shown`:""}</caption><thead><tr><th>after</th><th>comes</th><th>seen</th><th>chance</th></tr></thead><tbody>${y}</tbody></table>`;return`<div class="next-word">${l}<h4>What may come next</h4>${h}${d}</div>`}const Ee="The cat is happy. The dog is glad. The cat sleeps. The dog plays. The cat eats. The dog runs. The car is fast. The car goes far.",Xa=350;function Va(e,{site:t}){const n={small:()=>Ee,site:()=>t.pages.map(k=>k.body).join(`

`),own:()=>h.value};let a=new tt(Ee,1),s=De("the"),o=null;const r=f("div"),i=(k,E)=>f("option",{value:k},E),c=f("select",{onchange:()=>p()},i("small","eight short sentences"),i("site","this website"),i("own","your own text")),l=f("select",{onchange:()=>p()},i(1,"one word back"),i(2,"two words back"),i(3,"three words back")),h=f("textarea",{rows:5,hidden:!0,placeholder:"Paste any text here. The longer, the better it pretends.",oninput:()=>p()}),u=f("output",{},"1"),m=f("input",{type:"range",min:0,max:2,step:.1,value:1,oninput:()=>g()}),y=f("input",{type:"text",value:"the",onchange:()=>v()}),d=f("button",{type:"button",onclick:()=>o?A():x()},"write");function g(){u.textContent=m.value,r.innerHTML=Mn(a,s,Number(m.value))}function v(){A();const k=De(y.value).flatMap(E=>Ya(E,a.vocabulary)??[]);s=k.length?k:a.commonest?[a.commonest]:[],g()}function p(){h.hidden=c.value!=="own",a=new tt(n[c.value]?.()??Ee,Number(l.value)),v()}function b(){const k=za(Sn(a.after(s).candidates,Number(m.value)),Math.random);return k===null?!1:(s=[...s,k],g(),!0)}function x(){d.textContent="stop",o=setInterval(()=>{b()||A()},Xa)}function A(){o&&clearInterval(o),o=null,d.textContent="write"}r.addEventListener("click",k=>{const E=k.target?.closest("[data-word]")?.getAttribute("data-word");E&&(s=[...s,E],g())});const S=f("div",{class:"dials"},f("label",{},"It has read",c),f("label",{},"It looks",l),f("label",{},"Temperature: ",u,m),f("label",{},"Start from",y)),C=f("div",{class:"row"},f("button",{type:"button",onclick:()=>{b()}},"next word"),d,f("button",{type:"button",onclick:()=>v()},"start over"));return e.replaceChildren(S,h,C,r),g(),A}const Za=()=>Mn(new tt(Ee,1),De("the"),1),Qa={name:"next-word",apps:{"next-word":Va},stills:{"next-word":Za}},me={dryMass:25e3,fuel:5e3,exhaust:.72,acceleration:.3},xe=149597870700,re=94607e11,eo=[{name:"the Moon",metres:3844e5,said:"384,400 km"},{name:"Mars",metres:.52*xe,said:"0.52 au"},{name:"Jupiter",metres:4.2*xe,said:"4.2 au"},{name:"Saturn",metres:8.5*xe,said:"8.5 au"},{name:"Pluto",metres:38.5*xe,said:"38.5 au"},{name:"Proxima Centauri",metres:4.24*re,said:"4.24 light-years"},{name:"Sirius",metres:8.58*re,said:"8.58 light-years"},{name:"Epsilon Eridani",metres:10.52*re,said:"10.52 light-years"},{name:"the centre of the galaxy",metres:26e3*re,said:"26,000 light-years"},{name:"Andromeda",metres:25e5*re,said:"2.5 million light-years"}],to=[[365.25*86400*1e6,"million years"],[365.25*86400,"years"],[86400,"days"],[3600,"hours"],[60,"minutes"],[1,"seconds"]];function je(e){const[t,n]=to.find(([o])=>e>=o)??[1,"seconds"],a=e/t;return`${a>=10?Math.round(a).toLocaleString("en-US"):String(Math.round(a*10)/10)} ${n}`}const q=299792458,no=9.81;function ao(e,t){const n=t.acceleration*no,a=t.dryMass+t.fuel,s=t.exhaust*q,o=q/n*Math.acosh(1+n*e/(2*q*q)),r=a*(1-Math.exp(-2*n*o/s)),i=r>t.fuel,c=i?s/n*Math.log(a/(a-t.fuel/2)):o,l=Math.tanh(n*c/q),h=q/n*Math.sinh(n*c/q),u=q*q/n*(Math.cosh(n*c/q)-1),m=Math.max(0,e-2*u),y=i?m/(l*q):0,d=y*Math.sqrt(1-l*l);return{shipTime:2*c+d,homeTime:2*h+y,burnTime:c,coastTime:d,topSpeed:l,fuelBurnt:i?t.fuel:r,coasts:i}}const An=299792458,oo=9.81,ie=720,Te=170,_={top:12,right:10,bottom:24,left:40};function In(e){if(e<.01)return`${Math.round(e*An/1e3).toLocaleString("en-US")} km/s`;if(e<.99)return`${(e*100).toPrecision(2)}% of c`;const t=Math.min(12,Math.ceil(-Math.log10(1-e)));return`${(Math.floor(e*10**t)/10**(t-2)).toFixed(t-2)}% of c`}const so=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:3});function Bt(e){return e>=1e6?`${so.format(e)} t`:`${e>=100?Math.round(e).toLocaleString("en-US"):e.toPrecision(2)} t`}function ro(e,t){const n=ie-_.left-_.right,a=Te-_.top-_.bottom,s=m=>_.left+m/e.shipTime*n,o=m=>_.top+a-m/Math.max(e.topSpeed,1e-12)*a,r=t.acceleration*oo,i=24,c=Array.from({length:i+1},(m,y)=>e.burnTime*y/i).map(m=>[m,Math.tanh(r*m/An)]),h=[...c.map(([m,y])=>[m,y]),...c.reverse().map(([m,y])=>[e.shipTime-m,y])].map(([m,y])=>`${s(m).toFixed(1)},${o(y).toFixed(1)}`).join(" "),u=e.coasts?`<text x="${((s(e.burnTime)+s(e.shipTime-e.burnTime))/2).toFixed(1)}" y="${(o(e.topSpeed)+14).toFixed(1)}" text-anchor="middle">engine off, ${je(e.coastTime)}</text>`:"";return`<svg class="trip" viewBox="0 0 ${ie} ${Te}" role="img" aria-label="Speed against the ship's clock"><line class="grid" x1="${_.left}" x2="${ie-_.right}" y1="${o(0)}" y2="${o(0)}"/><line class="grid" x1="${_.left}" x2="${ie-_.right}" y1="${o(e.topSpeed)}" y2="${o(e.topSpeed)}"/><text x="${_.left}" y="${o(e.topSpeed)-3}">${In(e.topSpeed)}</text><polyline class="line" points="${h}"/>${u}<text x="${_.left}" y="${Te-6}">departure</text><text x="${ie-_.right}" y="${Te-6}" text-anchor="end">arrival, ${je(e.shipTime)} on board</text></svg>`}function En(e,t){const n=eo.map(o=>({destination:o,trip:ao(o.metres,e)})),a=n.map(({destination:o,trip:r})=>{const i=[o.name===t?"chosen":"",r.coasts?"coasts":""].filter(Boolean).join(" "),c=r.coasts?`all ${Bt(e.fuel)}, then coasts`:Bt(r.fuelBurnt);return`<tr${i?` class="${i}"`:""} data-destination="${o.name}"><th scope="row">${o.name}</th><td>${o.said}</td><td>${je(r.shipTime)}</td><td>${je(r.homeTime)}</td><td>${In(r.topSpeed)}</td><td>${c}</td></tr>`}).join(""),s=n.find(({destination:o})=>o.name===t)??n[0];return`<figure class="rocket"><table class="voyages"><thead><tr><th>to</th><th>distance</th><th>on board</th><th>at home</th><th>top speed</th><th>fuel burnt</th></tr></thead><tbody>${a}</tbody></table>`+(s?`<h4>To ${s.destination.name}: speed against the ship's clock</h4>${ro(s.trip,e)}`:"")+"</figure>"}const Se=e=>e,io=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:2}),co=[{key:"acceleration",label:"Acceleration",min:.05,max:3,step:.05,toSlider:Se,fromSlider:Se,show:e=>`${e.toFixed(2)} g`},{key:"fuel",label:"Fuel",min:-1,max:13,step:.05,toSlider:e=>Math.log10(e/me.dryMass),fromSlider:e=>me.dryMass*10**e,show:e=>`${io.format(e/me.dryMass)} × the ship`},{key:"exhaust",label:"Exhaust speed",min:.01,max:1,step:.01,toSlider:Se,fromSlider:Se,show:e=>`${Math.round(e*100)}% of c`}];function lo(e){let t=me,n="Proxima Centauri";const a=f("div"),s=()=>{a.innerHTML=En(t,n)},o=f("div",{class:"dials"},...co.map(r=>{const i=f("output",{},r.show(t[r.key])),c=f("input",{type:"range",min:r.min,max:r.max,step:r.step,value:r.toSlider(t[r.key]),oninput:()=>{t={...t,[r.key]:r.fromSlider(Number(c.value))},i.textContent=r.show(t[r.key]),s()}});return f("label",{},`${r.label}: `,i,c)}));a.addEventListener("click",r=>{const i=r.target?.closest("[data-destination]")?.getAttribute("data-destination");i&&(n=i,s())}),e.replaceChildren(o,a),s()}const ho=()=>En(me,"Proxima Centauri"),uo={name:"rocket",apps:{rocket:lo},stills:{rocket:ho}};class mo{listeners=new Set;send(t){for(const n of[...this.listeners])n(t)}on(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}}const nt=new mo,fo=900,po=480,Me={x:1600,y:1e3};function Ae(e,t){return(e%t+t)%t}class go{x=0;y=0;written="";driving=!1;follow({byRadians:t,tiltedBy:n,seconds:a}){const s=document.documentElement;if(s.dataset.sky!=="stars")return;this.driving||this.takeOver(s);const o=fo/(Math.PI*2),r=(a/po*Math.PI*2+t)*o;this.x=Ae(this.x+r,Me.x),this.y=Ae(this.y-n*o,Me.y);const i=`${(Math.round(this.x*2)/2).toFixed(1)}px ${(Math.round(this.y*2)/2).toFixed(1)}px`;if(i===this.written)return;this.written=i;const[c,l]=i.split(" ");s.style.setProperty("--sky-x",c??"0px"),s.style.setProperty("--sky-y",l??"0px")}release(){const t=document.documentElement;t.classList.remove("sky-driven"),t.style.removeProperty("--sky-x"),t.style.removeProperty("--sky-y"),this.x=0,this.y=0,this.written="",this.driving=!1}takeOver(t){const n=getComputedStyle(document.body,"::before").transform;if(n&&n!=="none")try{const a=new DOMMatrixReadOnly(n);this.x=Ae(a.m41,Me.x),this.y=Ae(a.m42,Me.y)}catch{}t.classList.add("sky-driven"),this.driving=!0}}function yo(e){return nt.on(t=>e.follow(t))}const Ht=new go,wo={name:"sky",install:()=>yo(Ht),arrive:()=>Ht.release()},qe=20;function bo(e){const{baseTime:t,shortcutFactor:n,interestRate:a,timeHorizon:s}=e,o=[];let r=null;const i=t;let c=t*(1-n),l=0,h=0,u=0,m=0,y=0,d=0;for(let g=0;g<s*qe;){for(;y<=g;)l+=1,u+=1,y+=i;for(;d<=g;)h+=1,m+=1,d+=c,c*=1+a;if(g+=1,g%qe===0){const v=g/qe;o.push({month:v,cleanCumulative:l,debtCumulative:h,cleanMonthly:u,debtMonthly:m,debtFeatureCost:c}),u=0,m=0,r===null&&l>h&&(r=v)}}return{months:o,breakEvenMonth:r}}const vo=[{key:"baseTime",label:"Base time",min:1,max:30,step:1,show:e=>`${e} days`},{key:"shortcutFactor",label:"Shortcuts",min:0,max:.9,step:.05,show:e=>`${Math.round(e*100)}%`},{key:"interestRate",label:"Interest",min:0,max:1,step:.01,show:e=>`${Math.round(e*100)}%`},{key:"timeHorizon",label:"Timeline",min:6,max:60,step:1,show:e=>`${e} months`}];function $o(e){const t={baseTime:20,shortcutFactor:.25,interestRate:.1,timeHorizon:24},n=f("div",{class:"figures"}),a=f("div",{class:"chart"}),s=f("div",{class:"chart"}),o=f("p"),r=f("div",{class:"dials"},...vo.map(c=>{const l=f("output",{},c.show(t[c.key])),h=f("input",{type:"range",min:c.min,max:c.max,step:c.step,value:t[c.key],oninput:()=>{t[c.key]=Number(h.value),l.textContent=c.show(t[c.key]),i()}});return f("label",{},`${c.label}: `,l,h)}));function i(){const{months:c,breakEvenMonth:l}=bo(t),h=c[c.length-1],u=h?.cleanCumulative??0,m=h?.debtCumulative??0,y=u>0?(u-m)/u*100:0,d=Math.abs(y)<.1?"Even":y>0?"Loss":"Gain",g=Math.abs(y)<.1?"≈0%":`${Math.abs(y).toFixed(1)}%`;n.replaceChildren(f("div",{class:"clean"},f("strong",{},String(u)),"clean features"),f("div",{class:"debt"},f("strong",{},String(m)),"debt features"),f("div",{},f("strong",{},l?`month ${l}`:"never"),"break-even"),f("div",{},f("strong",{},g),`${d.toLowerCase()} on the shortcut road`)),a.innerHTML=Ia([{name:"Clean",className:"clean",values:c.map(v=>v.cleanCumulative)},{name:"Debt-driven",className:"debt",values:c.map(v=>v.debtCumulative)}],{x:"Months",y:"Features"}),a.prepend(f("h4",{},"Cumulative features")),s.innerHTML=xn([{name:"Clean",className:"clean",values:c.slice(1).map(v=>v.cleanMonthly)},{name:"Debt-driven",className:"debt",values:c.slice(1).map(v=>v.debtMonthly)}],{x:"Months",y:"Features a month"}),s.prepend(f("h4",{},"Monthly delivery rate")),o.textContent=t.interestRate===0?"With no interest there is no compound slowdown, and the shortcut simply wins. That is the one case that does not happen to real code.":l?`${Math.round(t.shortcutFactor*100)}% saved at first, ${Math.round(t.interestRate*100)}% interest on every feature: clean development overtakes at month ${l}, and by month ${t.timeHorizon} the shortcut road has delivered ${g} less.`:`${Math.round(t.shortcutFactor*100)}% saved at first, ${Math.round(t.interestRate*100)}% interest on every feature: in ${t.timeHorizon} months the clean road has not yet caught up. Give it longer, or raise the interest.`}e.append(r,n,f("div",{class:"charts"},a,s),o),i()}const ko={name:"technical-debt",apps:{"technical-debt":$o}},xo="theme";function Cn(){const e=document.documentElement,t=e.dataset.pageTheme;let n=null;try{n=localStorage.getItem(xo)}catch{n=null}const a=t??(n==="light"||n==="dark"?n:null);a?e.dataset.theme=a:delete e.dataset.theme}const at="theme";function To(){return window.matchMedia("(prefers-color-scheme: dark)").matches}function So(){let e=null;try{e=localStorage.getItem(at)}catch{e=document.documentElement.dataset.theme??null}return e==="light"||e==="dark"?e:To()?"dark":"light"}class Mo{apply(t){const n=t==="toggle"?So()==="dark"?"light":"dark":t;try{n==="system"?localStorage.removeItem(at):localStorage.setItem(at,n)}catch{}return Cn(),n}}function Ao(e){const t=document.querySelector(".theme-toggle");return t?(t.classList.add("ready"),t.removeAttribute("aria-hidden"),t.removeAttribute("tabindex"),t.addEventListener("click",e),()=>t.removeEventListener("click",e)):()=>{}}const Dn=["light","dark","system"];function Io(e){return Dn.includes(e)}function _t(e){const t=Dn.filter(a=>a!==e),n=a=>`theme ${a}`;return{text:`theme: ${e}
  ${t.map(n).join("   ")}`,html:`<pre>theme: ${e}
  ${t.map(a=>`<a href="#" data-run="${I(n(a))}">${I(n(a))}</a>`).join("   ")}</pre>`}}function Eo(e){return{name:"theme",usage:"theme [light|dark|system|auto]",description:"switch the colours, or toggle them",run({site:t,cwd:n},[a]){const s=t.at(n)?.fields.theme;if(s)return{text:`theme: this page keeps its own, ${s}. It works everywhere else.`,error:!0};if(a===void 0)return _t(e.apply("toggle"));const o=a==="auto"?"system":a;return Io(o)?_t(e.apply(o)):{text:`theme: ${a}: choose light, dark or system`,error:!0}}}}const Co={name:"theme",commands:[Eo(new Mo)],install:e=>Ao(()=>e.run("theme")),arrive:()=>Cn()},ot={variable:"tn",atLeast:!0,threshold:20,months:[0,1,2,3,4,5,6,7,8,9,10,11]};function Do(e,t){const n=e.map(({value:d})=>d),a=Math.floor(Math.min(...n,...(t.spans??[]).map(({value:d})=>d))),s=Math.ceil(Math.max(...n,a+1)),o=wn(e.map(({year:d})=>d),a,s),{x:r,y:i,slot:c}=o,l=d=>r(d)+c/2,h=[];for(const d of e){const g=h[h.length-1];g&&g[g.length-1]?.year===d.year-1?g.push(d):h.push([d])}const u=h.map(d=>`<polyline class="line" points="${d.map(({year:g,value:v})=>`${O(l(g))},${O(i(v))}`).join(" ")}"/>`).join(""),m=e.map(({year:d,value:g,title:v,partial:p})=>`<circle class="dot${p?" partial":""}" cx="${O(l(d))}" cy="${O(i(g))}" r="3.5"><title>${v}</title></circle>`).join(""),y=o.levels(t.spans??[]);return o.wrap(t.label,`${u}${m}${y}`)}function jo(e,{threshold:t,atLeast:n},a){if(!e)return 0;const[s=0,...o]=e;return o.reduce((r,i,c)=>s+c*a>=t-1e-9===n?r+i:r,0)}const ae={tn:{code:1002,unit:"°C",name:"daily minimum",summary:"mean",bin:.5,range:[-30,35]},tx:{code:1001,unit:"°C",name:"daily maximum",summary:"mean",bin:.5,range:[-25,50]},pp:{code:1300,unit:"mm",name:"daily rain",summary:"sum",bin:.5,range:[0,250]},pi:{code:1303,unit:"mm/h",name:"most rain in one hour",summary:"max",bin:.5,range:[0,100]}},Oo=.95,Po=(e,t)=>new Date(Date.UTC(e,t+1,0)).getUTCDate(),U=e=>e.reduce((t,n)=>t+n,0);function No(e,t){return e.length===0?null:t==="sum"?U(e.map(({figure:n})=>n)):t==="max"?Math.max(...e.map(({figure:n})=>n)):U(e.map(({figure:n,weight:a})=>n*a))/U(e.map(({weight:n})=>n))}function Fo(e,t){const n=ae[t.variable];return Object.entries(e.years).flatMap(([a,s])=>{const o=s[t.variable];if(!o)return[];const r=Number(a),i=o.months.map(d=>({days:jo(d,t,n.bin),measured:U(d?.slice(1)??[])})),c=d=>t.months.includes(d),l=U(i.filter((d,g)=>c(g)).map(d=>d.measured)),h=U(t.months.map(d=>Po(r,d))),u=U(i.filter((d,g)=>c(g)).map(d=>d.days)),m=o.summaries.flatMap((d,g)=>c(g)&&d!==null?[{figure:d,weight:i[g]?.measured??0}]:[]),y=No(m,n.summary);return[{year:r,days:u,elsewhere:U(i.map(d=>d.days))-u,measured:l,expected:h,whole:l/h>=Oo,summary:y,months:i}]}).sort((a,s)=>a.year-s.year)}const Jt=["January","February","March","April","May","June","July","August","September","October","November","December"];function Gt(e){const{name:t,unit:n}=ae[e.variable],a=e.variable==="pi"?"":"a ",s=e.atLeast?`of ${e.threshold} ${n} or more`:`below ${e.threshold} ${n}`,o=Jt[e.months[0]??0],r=Jt[e.months[e.months.length-1]??11],i=e.months.length===12?"whole year":`${o} to ${r}`;return`days with ${a}${t} ${s}, ${i}`}const jn=["January","February","March","April","May","June","July","August","September","October","November","December"],Lo=.55;function Ro(e,t,{days:n,measured:a}){const s=`${jn[t]} ${e}`;if(a===0)return`<td class="none" title="${s}: not measured"></td>`;const o=Math.round(n/a*1e3)/1e3;return`<td${o>=Lo?' class="deep"':""} style="--v:${o}" title="${s}: ${n} of ${a} days">${n||""}</td>`}function Wo(e,t){const n=`<tr><th></th>${jn.map(s=>`<th scope="col">${s.slice(0,3)}</th>`).join("")}</tr>`,a=[...e].reverse().map(({year:s,months:o})=>`<tr><th scope="row">${s}</th>${o.map((r,i)=>Ro(s,i,r)).join("")}</tr>`);return`<table class="heat calendar${t?" warm":""}"><thead>${n}</thead><tbody>${a.join("")}</tbody></table>`}const qt=e=>e.reduce((t,n)=>t+n,0)/e.length;function Yt(e){const t=e.flatMap(({summary:n})=>n===null?[]:[n]);return{from:e[0]?.year??0,to:e[e.length-1]?.year??0,years:e.length,days:qt(e.map(({days:n})=>n)),summary:t.length?qt(t):null}}function Bo(e){const t=e.filter(a=>a.whole);if(t.length<4)return null;const n=Math.floor(t.length/2);return[Yt(t.slice(0,n)),Yt(t.slice(n))]}const Ho=["January","February","March","April","May","June","July","August","September","October","November","December"],_o={mean:"The mean",sum:"The total",max:"The highest"},ue=e=>String(Math.round(e*10)/10),Jo=e=>`${e>0?"+":e<0?"−":""}${ue(Math.abs(e))}`,Go=e=>`${Number(e.slice(8,10))} ${Ho[Number(e.slice(5,7))-1]} ${e.slice(0,4)}`;function qo(e,t){const{unit:n,name:a}=ae[t.variable],s=Object.values(e.years).flatMap(i=>i[t.variable]?[i[t.variable].record]:[]),[o,r]=t.atLeast?s.map(([i,c])=>[i,c]).reduce((i,c)=>c[0]>i[0]?c:i):s.map(([,,i,c])=>[i,c]).reduce((i,c)=>c[0]<i[0]?c:i);return`<p class="record">The ${t.atLeast?"highest":"lowest"} ${a} on record here: ${o} ${n} on ${Go(r)}, whatever months are chosen.</p>`}function On(e,t){const n=ae[t.variable],a=`<figcaption><strong>${e.name}</strong> · ${e.altitude} m, ${e.setting} · ${Gt(t)}</figcaption>`,s=Fo(e,t);if(s.length===0)return`<figure class="weather">${a}<p>This station has no ${n.name} on record.</p></figure>`;const o=Bo(s),r=({from:d,to:g})=>`${d}–${g}`,i=o?'<div class="figures">'+o.map(d=>`<div><strong>${ue(d.days)}</strong>days a year, ${r(d)}</div>`).join("")+`<div><strong>${Jo(o[1].days-o[0].days)}</strong>days a year, from one half to the other</div></div>`:"",c=s.map(({year:d,days:g,elsewhere:v,measured:p,expected:b,whole:x})=>{const A=v>0?`, and ${v} more outside the months chosen`:"",S=x?"":`, with only ${p} of ${b} days measured`;return{year:d,value:g,partial:!x,title:`${d}: ${g} days${S}${A}`}}),l=(o??[]).map(d=>({from:d.from,to:d.to,value:d.days,label:`${ue(d.days)} a year`})),h=s.flatMap(({year:d,summary:g,whole:v})=>g===null||!v?[]:[{year:d,value:g,title:`${d}: ${ue(g)} ${n.unit}`}]),u=(o??[]).flatMap(d=>d.summary===null?[]:[{from:d.from,to:d.to,value:d.summary,label:`${ue(d.summary)} ${n.unit}`}]),m=`${_o[n.summary]} ${n.name} of each year, ${n.unit}`,y=(n.summary==="mean"?Do:Ze)(h,{label:m,spans:u});return`<figure class="weather">${a}${i}<h4>Days a year</h4>${Ze(c,{label:`Days a year: ${Gt(t)}`,spans:l})}<h4>When in the year they fell</h4>${Wo(s,t.atLeast&&n.unit==="°C")}<h4>${m}, in the months chosen</h4>${y}`+qo(e,t)+"</figure>"}const Ut=[{id:"tropical-nights",name:"tropical nights",variable:"tn",atLeast:!0,threshold:20},{id:"torrid-nights",name:"torrid nights",variable:"tn",atLeast:!0,threshold:25},{id:"hot-days",name:"hot days",variable:"tx",atLeast:!0,threshold:30},{id:"torrid-days",name:"torrid days",variable:"tx",atLeast:!0,threshold:35},{id:"frost-days",name:"frost days",variable:"tn",atLeast:!1,threshold:0},{id:"rainy-days",name:"rainy days",variable:"pp",atLeast:!0,threshold:1},{id:"heavy-rain",name:"days of heavy rain",variable:"pp",atLeast:!0,threshold:20},{id:"downpours",name:"days with a downpour",variable:"pi",atLeast:!0,threshold:10}],te=[{code:"WU",name:"Badalona - Museu",municipality:"Badalona",altitude:42,setting:"urban, by the sea"},{code:"X4",name:"Barcelona - el Raval",municipality:"Barcelona",altitude:33,setting:"dense city, on a roof"},{code:"X8",name:"Barcelona - Zona Universitària",municipality:"Barcelona",altitude:82,setting:"city edge"},{code:"D5",name:"Barcelona - Observatori Fabra",municipality:"Barcelona",altitude:410,setting:"wooded hill above the city"},{code:"UP",name:"Cabrils",municipality:"Cabrils",altitude:81,setting:"coastal slope, half rural"},{code:"XF",name:"Sabadell - Parc Agrari",municipality:"Sabadell",altitude:259,setting:"farmland beside a city"},{code:"XJ",name:"Girona",municipality:"Girona",altitude:72,setting:"market gardens by the city"},{code:"XE",name:"Tarragona - Complex Educatiu",municipality:"Tarragona",altitude:6,setting:"coast"},{code:"VK",name:"Raimat",municipality:"Lleida",altitude:286,setting:"inland plain, vineyards"}],Kt=[["whole year",[0,1,2,3,4,5,6,7,8,9,10,11]],["June to August",[5,6,7]],["May to October",[4,5,6,7,8,9]],["December to February",[0,1,11]]],Yo={tn:[-10,30],tx:[0,45],pp:[.5,100],pi:[.5,60]};function Uo(e){const t=new Map,n=pn(e,"/data/weather/index.json"),a=f("div");a.append(...e.querySelectorAll("figure"));let s=null,o=ot,r=!1;const i=(p,b)=>f("option",{value:p},b),c=f("select",{onchange:()=>{g(c.value)}},...te.map(({code:p,name:b})=>i(p,b))),l=f("select",{onchange:()=>{const p=Ut.find(({id:b})=>b===l.value);p&&d({variable:p.variable,atLeast:p.atLeast,threshold:p.threshold})}},...Ut.map(({id:p,name:b})=>i(p,b))),h=f("select",{onchange:()=>d({months:Kt[Number(h.value)]?.[1]??ot.months})},...Kt.map(([p],b)=>i(b,p))),u=f("output"),m=f("input",{type:"range",step:.5,oninput:()=>d({threshold:Number(m.value)})});function y(){const[p,b]=Yo[o.variable];m.min=String(p),m.max=String(b),m.value=String(o.threshold),u.textContent=`${o.atLeast?"":"below "}${o.threshold} ${ae[o.variable].unit}${o.atLeast?" or more":""}`,s&&(a.innerHTML=On(s,o))}function d(p){o={...o,...p},y()}async function g(p){const b=t.get(p)??fetch(`/data/weather/${p}.json`).then(x=>x.json());t.set(p,b);try{const x=await b;if(r||c.value!==p)return;s=x,y()}catch{t.delete(p),a.replaceChildren(f("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}const v=f("div",{class:"dials"},f("label",{},"Station",c),f("label",{},"Counting",l),f("label",{},"Threshold: ",u,m),f("label",{},"Months",h));return e.replaceChildren(v,a,n),g(c.value),()=>{r=!0}}function Ko(e,t,[n,a]){if(e.length===0)return null;const s=Math.round((a-n)/t),o=new Map;for(const l of e){const h=Math.min(s-1,Math.max(0,Math.floor((l-n)/t+1e-9)));o.set(h,(o.get(h)??0)+1)}const r=Math.min(...o.keys()),i=Math.max(...o.keys());return[Math.round((n+r*t)*1e3)/1e3,...Array.from({length:i-r+1},(l,h)=>o.get(r+h)??0)]}const zt="7bvh-jvq2",Pn=5e4,Xt=Object.entries(ae),zo="No representatiu",Xo=["Representatiu",""],Vo=(e,t)=>Math.round(e*10**t)/10**t;function Zo(e,t){if(e.length===0)return null;if(t==="max")return Math.max(...e);const n=e.reduce((a,s)=>a+s,0);return Vo(t==="sum"?n:n/e.length,2)}function Qo(e,t){const n=Array.from({length:12},(o,r)=>e.filter(({date:i})=>Number(i.slice(5,7))===r+1).map(({value:i})=>i)),a=e.reduce((o,r)=>r.value>o.value?r:o),s=e.reduce((o,r)=>r.value<o.value?r:o);return{months:n.map(o=>Ko(o,t.bin,t.range)),summaries:n.map(o=>Zo(o,t.summary)),record:[a.value,a.date,s.value,s.date]}}function es(e){if(!Array.isArray(e))throw new Error("the portal did not answer with rows");if(e.length>=Pn)throw new Error("the answer was cut short at the limit");const t=e;if(!t.some(s=>s.data_lectura?.slice(5,7)==="12"))throw new Error("the year does not reach December yet");const n=new Map,a=new Set;for(const s of t){const o=s.estat??"";if(o===zo)continue;if(!Xo.includes(o))throw new Error(`the network marks days as "${o}", which nobody has decided how to read`);const r=s.data_lectura?.slice(0,10)??"",i=`${s.codi_estacio}/${s.codi_variable}`;if(a.has(`${i}/${r}`))throw new Error(`${i} has ${r} twice`);a.add(`${i}/${r}`);const c=Number(s.valor);Number.isFinite(c)&&n.set(i,[...n.get(i)??[],{date:r,value:c}])}return n}const ts={name:"weather",directory:"public/data/weather",firstYear:1988,files:te.map(e=>`${e.code}.json`),about:{measures:"daily minimum and maximum temperature, daily rain, most rain in one hour",network:"Xarxa d'Estacions Meteorològiques Automàtiques (XEMA)",attribution:"Servei Meteorològic de Catalunya (XEMA). Dades obertes de la Generalitat de Catalunya.",dataset:`https://analisi.transparenciacatalunya.cat/d/${zt}`,stations:te},requestsFor(e){const t=te.map(a=>`'${a.code}'`).join(","),n=Xt.map(([,a])=>a.code).join(",");return[vn(zt,{select:"codi_estacio,codi_variable,data_lectura,valor,estat",where:`codi_estacio in (${t}) and codi_variable in (${n}) and data_lectura between '${e}-01-01T00:00:00' and '${e}-12-31T23:59:59'`,limit:Pn})]},withYear(e,t,n){const a=es(n[0]);return Object.fromEntries(te.map(s=>{const o=`${s.code}.json`,r=Xt.flatMap(([l,h])=>{const u=a.get(`${s.code}/${h.code}`);return u?[[l,Qo(u,h)]]:[]}),i=Object.fromEntries(r),c={...e[o]?.years,...r.length?{[t]:i}:{}};return[o,{...s,years:c}]}))}},ns=e=>{const t=JSON.parse(e(`/data/weather/${te[0]?.code}.json`)),n=JSON.parse(e("/data/weather/index.json"));return On(t,ot)+lt(n)},as={name:"weather",apps:{weather:Uo},stills:{weather:ns},sources:[ts]},ut="header-world";function Nn(){try{const e=localStorage.getItem(ut);if(!e)return null;const t=JSON.parse(e);return[t.seed,t.levels,t.roughness,t.share].every(a=>typeof a=="number"&&Number.isFinite(a))?t:null}catch{return null}}function os(e){try{localStorage.setItem(ut,JSON.stringify(e))}catch{}}function ss(){try{localStorage.removeItem(ut)}catch{}}const G=(1+Math.sqrt(5))/2,rs=[[-1,G,0],[1,G,0],[-1,-G,0],[1,-G,0],[0,-1,G],[0,1,G],[0,-1,-G],[0,1,-G],[G,0,-1],[G,0,1],[-G,0,-1],[-G,0,1]],is=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];function cs(){const e=rs.map(([t,n,a])=>{const s=Math.hypot(t,n,a);return{direction:[t/s,n/s,a/s],radius:1,surface:0}});return Fn(e,is.map(t=>[...t]))}const ls=(e,t)=>(e+t)/2;function hs(e,t,n=ls){const a=Array.from({length:e.vertexCount},(i,c)=>({direction:[e.directions[c*3]??0,e.directions[c*3+1]??0,e.directions[c*3+2]??0],radius:e.radii[c]??1,surface:e.surface[c]??0})),s=new Map,o=(i,c)=>{const l=i<c?`${i}:${c}`:`${c}:${i}`,h=s.get(l);if(h!==void 0)return h;const u=a[i],m=a[c],[y,d,g]=u.direction,[v,p,b]=m.direction,x=Math.hypot(y*u.radius-v*m.radius,d*u.radius-p*m.radius,g*u.radius-b*m.radius),[A,S,C]=[(y+v)/2,(d+p)/2,(g+b)/2],k=Math.hypot(A,S,C)||1,E=n(u.surface,m.surface);a.push({direction:[A/k,S/k,C/k],radius:(u.radius+m.radius)/2+t(x),surface:E});const L=a.length-1;return s.set(l,L),L},r=[];for(let i=0;i<e.faceCount;i+=1){const c=e.faces[i*3],l=e.faces[i*3+1],h=e.faces[i*3+2],u=o(c,l),m=o(l,h),y=o(h,c);r.push([c,u,y],[l,m,u],[h,y,m],[u,m,y])}return Fn(a,r)}function Fn(e,t){const n=new Float32Array(e.length*3),a=new Float32Array(e.length),s=new Float32Array(e.length);e.forEach((r,i)=>{n[i*3]=r.direction[0],n[i*3+1]=r.direction[1],n[i*3+2]=r.direction[2],a[i]=r.radius,s[i]=r.surface});const o=new Uint32Array(t.length*3);return t.forEach(([r,i,c],l)=>{o[l*3]=r,o[l*3+1]=i,o[l*3+2]=c}),{directions:n,radii:a,surface:s,faces:o,faceCount:t.length,vertexCount:e.length}}function ds(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let n=Math.imul(t^t>>>15,1|t);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function us(e){const t=cs();return{seed:e,mesh:t,temperature:new Float32Array(t.vertexCount),faceColour:new Uint8ClampedArray(t.faceCount*3),seaRadius:0}}function ms(e,t){return{...e,mesh:t,temperature:new Float32Array(t.vertexCount),faceColour:new Uint8ClampedArray(t.faceCount*3)}}function fs(e,t){return Math.abs(e.mesh.directions[t*3+1]??0)}function Ln(e,t,n){const a=e.mesh.faces[n*3]??0,s=e.mesh.faces[n*3+1]??0,o=e.mesh.faces[n*3+2]??0;return((t[a]??0)+(t[s]??0)+(t[o]??0))/3}function ps(e,t){return Ln(e,e.mesh.radii,t)}const Rn=(e=4,t=.28,n=.2)=>a=>{const s=ds(a.seed);let o=a.mesh;const r=Float32Array.from(o.surface,()=>s());o={...o,surface:r};for(let i=0;i<e;i+=1)o=hs(o,c=>c*t*(s()-.5),(c,l)=>{const h=.5+(s()-.5)*(c-l)*n;return Math.min(1,Math.max(0,c*(1-h)+l*h))});return ms(a,o)},Wn=({equator:e=1,pole:t=.05,peak:n=0}={})=>a=>{const s=new Float32Array(a.mesh.vertexCount),o=a.mesh.radii,r=o.reduce((l,h)=>Math.min(l,h),1/0),c=o.reduce((l,h)=>Math.max(l,h),-1/0)-r||1;for(let l=0;l<a.mesh.vertexCount;l+=1){const h=((o[l]??1)-r)/c,u=fs(a,l)**2.2;s[l]=e+(t-e)*u+(n-e)*h}return{...a,temperature:s}},Bn=(e=.55)=>t=>{const n=Float32Array.from(t.mesh.radii).sort(),a=Math.min(n.length-1,Math.floor(n.length*e)),s=n[a]??1,o=Float32Array.from(t.mesh.radii,r=>Math.max(r,s));return{...t,mesh:{...t.mesh,radii:o},seaRadius:s}},gs=[24,92,168],ys=[62,176,206],ws=[214,196,138],Vt=[190,158,84],Ye=[70,138,66],bs=[74,104,76],vs=[136,128,116],Zt=[238,243,247];function K(e,t,n){const a=Math.min(1,Math.max(0,n));return[e[0]+(t[0]-e[0])*a,e[1]+(t[1]-e[1])*a,e[2]+(t[2]-e[2])*a]}function $s(e){return e>.78?Vt:e>.62?K(Ye,Vt,(e-.62)/.16):e>.3?Ye:K(bs,Ye,(e-.12)*5.5)}const Hn=e=>{const t=new Uint8ClampedArray(e.mesh.faceCount*3),n=e.mesh.radii.reduce((s,o)=>Math.max(s,o),-1/0),a=Math.max(1e-6,n-e.seaRadius);for(let s=0;s<e.mesh.faceCount;s+=1){const o=(ps(e,s)-e.seaRadius)/a,r=Ln(e,e.temperature,s);let i;o<=.002?(i=K(ys,gs,.55),r<.16&&(i=K(i,Zt,(.16-r)*6))):(i=K(ws,$s(r),Math.min(1,o*9)),i=K(i,vs,Math.max(0,o-.55)*2.2),r<.26&&(i=K(i,Zt,(.26-r)*4))),t[s*3]=i[0],t[s*3+1]=i[1],t[s*3+2]=i[2]}return{...e,faceColour:t}},ks=[Rn(),Bn(),Wn(),Hn];function xs(e,t=ks){return t.reduce((n,a)=>a(n),us(e))}function _n(e){return xs(e.seed,[Rn(e.levels,e.roughness),Bn(e.share),Wn(),Hn])}const Qt=.3,Ts=[-.5,.45,.74],Ss=1.02;class mt{size;pixels;depth;view=new Float32Array(0);screen=new Float32Array(0);constructor(t,n=new Uint8ClampedArray(t*t*4)){if(n.length!==t*t*4)throw new Error(`SphereRaster: ${t}×${t} needs ${t*t*4} bytes, not ${n.length}`);this.size=t,this.pixels=n,this.depth=new Float32Array(t*t)}paint(t,n){const{size:a,pixels:s,depth:o}=this;s.fill(0),o.fill(-1/0);const[r,i,c]=Ms(n.light??Ts),l=n.tilt??-.38,h=Math.cos(l),u=Math.sin(l),m=Math.cos(n.rotation),y=Math.sin(n.rotation),{directions:d,radii:g,faces:v,faceCount:p,vertexCount:b}=t.mesh;let x=1;for(let k=0;k<b;k+=1){const E=g[k]??1;E>x&&(x=E)}const A=a/(2*x*Ss);this.view.length<b*3&&(this.view=new Float32Array(b*3),this.screen=new Float32Array(b*3));const S=this.view,C=this.screen;for(let k=0;k<b;k+=1){const E=g[k]??1,L=(d[k*3]??0)*E,P=(d[k*3+1]??0)*E,T=(d[k*3+2]??0)*E,$=L*m-T*y,D=L*y+T*m,w=P*h+D*u,M=-P*u+D*h;S[k*3]=$,S[k*3+1]=w,S[k*3+2]=M,C[k*3]=a/2+$*A,C[k*3+1]=a/2-w*A,C[k*3+2]=M}for(let k=0;k<p;k+=1){const E=v[k*3]??0,L=v[k*3+1]??0,P=v[k*3+2]??0,T=C[E*3],$=C[E*3+1],D=C[E*3+2],w=C[L*3],M=C[L*3+1],W=C[L*3+2],j=C[P*3],F=C[P*3+1],B=C[P*3+2],Ne=(w-T)*(F-$)-(M-$)*(j-T);if(Ne>=0)continue;const pt=S[E*3],gt=S[E*3+1],yt=S[E*3+2],wt=S[L*3]-pt,bt=S[L*3+1]-gt,vt=S[L*3+2]-yt,$t=S[P*3]-pt,kt=S[P*3+1]-gt,xt=S[P*3+2]-yt,Tt=bt*xt-vt*kt,St=vt*$t-wt*xt,Mt=wt*kt-bt*$t,Fe=Math.hypot(Tt,St,Mt)||1,Xn=Tt/Fe*r+St/Fe*i+Mt/Fe*c,Le=Qt+(1-Qt)*Math.max(0,Xn),Vn=(t.faceColour[k*3]??0)*Le,Zn=(t.faceColour[k*3+1]??0)*Le,Qn=(t.faceColour[k*3+2]??0)*Le,ea=Math.max(0,Math.floor(Math.min(T,w,j))),ta=Math.min(a-1,Math.ceil(Math.max(T,w,j))),na=Math.max(0,Math.floor(Math.min($,M,F))),aa=Math.min(a-1,Math.ceil(Math.max($,M,F)));for(let pe=na;pe<=aa;pe+=1)for(let ge=ea;ge<=ta;ge+=1){const Re=ge+.5,We=pe+.5,oa=(w-T)*(We-$)-(M-$)*(Re-T),At=(j-w)*(We-M)-(F-M)*(Re-w),It=(T-j)*(We-F)-($-F)*(Re-j);if(oa>0||At>0||It>0)continue;const Et=At/Ne,Ct=It/Ne,Dt=D*Et+W*Ct+B*(1-Et-Ct),V=pe*a+ge;Dt<=o[V]||(o[V]=Dt,s[V*4]=Vn,s[V*4+1]=Zn,s[V*4+2]=Qn,s[V*4+3]=255)}}return s}}function Ms([e,t,n]){const a=Math.hypot(e,t,n)||1;return[e/a,t/a,n/a]}const As=.2,Is=.36,Es=[{upTo:20,dark:4,bright:12},{upTo:70,dark:6,bright:14},{upTo:160,dark:2,bright:10},{upTo:198,dark:3,bright:11},{upTo:275,dark:1,bright:9},{upTo:330,dark:5,bright:13},{upTo:360,dark:4,bright:12}];function Cs(e,t,n){const a=Math.max(e,t,n),s=Math.min(e,t,n),o=(a+s)/2/255;if((a===0?0:(a-s)/a)<As)return o<.08?0:o<.5?8:o<.8?7:15;const i=a-s;let c;a===e?c=(t-n)/i*60:a===t?c=(2+(n-e)/i)*60:c=(4+(e-t)/i)*60,c<0&&(c+=360);const l=Es.find(({upTo:h})=>c<h)??{dark:4,bright:12};return o<.08?0:o>=Is?l.bright:l.dark}function Ds(e,t){const n=(s,o)=>{const r=(o*t+s)*4;return(e[r+3]??0)===0?-1:Cs(e[r]??0,e[r+1]??0,e[r+2]??0)},a=[];for(let s=0;s<t/2;s+=1){const o=[];for(let r=0;r<t;r+=1)o.push({top:n(r,s*2),bottom:n(r,s*2+1)});a.push(o)}return a}const ce=["#000000","#0000aa","#00aa00","#00aaaa","#aa0000","#aa00aa","#aa5500","#aaaaaa","#555555","#5555ff","#55ff55","#55ffff","#ff5555","#ff55ff","#ffff55","#ffffff"];function js(e){const t=({top:n,bottom:a})=>n<0&&a<0?"<span> </span>":n<0?`<span style="color:${ce[a]}">▄</span>`:a<0?`<span style="color:${ce[n]}">▀</span>`:n===a?`<span style="color:${ce[n]}">█</span>`:`<span style="color:${ce[n]};background:${ce[a]}">▀</span>`;return e.map(n=>n.map(t).join("")).join(`
`)}const st={levels:4,roughness:.28,share:.55},le=32;let Ue=null,en=null,Ke=null;function tn(e,t){const n=document.querySelector('link[rel="icon"]');if(!n)return;Ue??=Object.assign(document.createElement("canvas"),{width:le,height:le});const a=Ue.getContext("2d");a&&(Ke??=a.createImageData(le,le),en??=new mt(le,Ke.data),en.paint(e,{rotation:t}),a.putImageData(Ke,0,0),n.type="image/png",n.href=Ue.toDataURL("image/png"))}function Jn(e){let t=!0;if(typeof IntersectionObserver!="function")return{onScreen:()=>t,stop:()=>{}};const n=new IntersectionObserver(a=>{for(const s of a)t=s.isIntersecting},{rootMargin:"100px"});return n.observe(e),{onScreen:()=>t,stop:()=>n.disconnect()}}const Os=90,Ps=1e3/12,Ns=400,ze=new WeakMap;function Fs(e){const t=(e.textContent??"").split(`
`);return{columns:Math.max(...t.map(n=>n.length)),rows:t.length}}function rt(e,t){ze.get(e)?.();const n=t??{...st,seed:Math.floor(Math.random()*16777215)},{columns:a,rows:s}=Fs(e),o=Math.min(a,s*2),r=_n(n),i=new mt(o);e.dataset.seed=String(n.seed),e.title=`World ${n.seed}, ${r.mesh.faceCount.toLocaleString("en")} triangles`;const c=v=>{e.innerHTML=js(Ds(i.paint(r,{rotation:v}),o)),e.classList.add("grown")};if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return c(.6),tn(r,.6),ze.set(e,()=>{}),()=>{};let l=0,h=-1/0,u=-1/0;const m=performance.now(),y=Jn(e),d=v=>{const p=(v-m)/1e3/Os*Math.PI*2;y.onScreen()&&v-h>=Ps&&(c(p),h=v),v-u>Ns&&(tn(r,p),u=v),l=requestAnimationFrame(d)};l=requestAnimationFrame(d);const g=()=>{cancelAnimationFrame(l),y.stop()};return ze.set(e,g),g}function Ls(){const e=document.querySelector(".planet");return e?rt(e,Nn()??void 0):()=>{}}const Q=360,Rs=60,Ws=1.4,nn=Math.PI*2/Rs,an=Math.PI*4;function Bs(e){const t=f("canvas",{class:"world",width:Q,height:Q}),n=t.getContext("2d");if(!n)return()=>{};const a={...st,seed:Math.floor(Math.random()*16777215)},s=n.createImageData(Q,Q),o=new mt(Q,s.data),r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let i,c=.6,l=-.38,h=!r,u=null,m=0,y=performance.now();const d=f("p",{class:"hint"}),g=document.querySelector(".planet"),v=(20*4**st.levels).toLocaleString("en"),p=()=>{i=_n(a);const $=Nn();d.textContent=`World ${a.seed}: ${i.mesh.faceCount.toLocaleString("en")} triangles. `+($?`The header is keeping world ${$.seed}, ${(20*4**$.levels).toLocaleString("en")} triangles.`:`The header grows a new one every visit, ${v} triangles each.`),x.hidden=!$,A()},b=f("button",{type:"button",onclick:()=>{os({...a}),g&&rt(g,{...a}),p()}},"Put it in the header"),x=f("button",{type:"button",hidden:!0,onclick:()=>{ss(),g&&rt(g),p()}},"Let the header grow its own"),A=()=>{o.paint(i,{rotation:c,tilt:l}),n.putImageData(s,0,0)};let S=0;const C=Jn(t),k=$=>{const D=Math.min(.1,($-y)/1e3);if(!u&&C.onScreen()){if(m!==0){m*=Math.exp(-D/Ws);const w=h?nn:0;(Math.abs(m)<=w||Math.abs(m)<.01)&&(m=0)}m!==0?(c-=m*D,A()):h&&(c+=nn*D,A()),nt.send({byRadians:m*D,tiltedBy:0,seconds:D})}y=$,S=requestAnimationFrame(k)};t.addEventListener("pointerdown",$=>{u={x:$.clientX,y:$.clientY,at:$.timeStamp},m=0,t.setPointerCapture($.pointerId)}),t.addEventListener("pointermove",$=>{if(!u)return;const D=t.clientWidth||Q,w=($.clientX-u.x)/D*Math.PI;c-=w;const M=l;l=Math.max(-1.2,Math.min(1.2,l-($.clientY-u.y)/D*Math.PI)),nt.send({byRadians:w,tiltedBy:l-M,seconds:0});const W=Math.max(.004,($.timeStamp-u.at)/1e3);m=Math.max(-an,Math.min(an,m*.4+w/W*.6)),u={x:$.clientX,y:$.clientY,at:$.timeStamp},A()}),t.addEventListener("pointerup",$=>{u&&$.timeStamp-u.at>120&&(m=0),u=null,y=performance.now()}),t.addEventListener("pointercancel",()=>{u=null,m=0});const E=f("input",{type:"number",min:0,value:a.seed,onchange:()=>{a.seed=Math.max(0,Math.floor(Number(E.value)||0)),p()}}),L=f("button",{type:"button",onclick:()=>{a.seed=Math.floor(Math.random()*16777215),E.value=String(a.seed),p()}},"Another world"),P=f("button",{type:"button",onclick:()=>{h=!h,P.textContent=h?"Hold still":"Turn"}},h?"Hold still":"Turn"),T=($,D,w,M,W,j)=>{const F=f("output",{},j(a[$])),B=f("input",{type:"range",min:w,max:M,step:W,value:a[$],onchange:()=>{a[$]=Number(B.value),F.textContent=j(a[$]),p()},oninput:()=>{F.textContent=j(Number(B.value))}});return f("label",{},`${D}: `,F,B)};return e.append(t,f("div",{class:"row"},f("span",{},"Seed "),E,L,P,b,x),f("div",{class:"dials"},T("levels","Detail",2,6,1,$=>`${$} splits`),T("roughness","Roughness",.02,1,.01,$=>$.toFixed(2)),T("share","Sea",0,.98,.01,$=>`${Math.round($*100)}%`)),d),p(),S=requestAnimationFrame(k),()=>{cancelAnimationFrame(S),C.stop()}}const Hs={name:"world",apps:{worlds:Bs},install:()=>Ls()},he=[Hs,Co,wo,ko,ja,Ga,Aa,as,Qa,uo];function on(e,t){const n=[];for(const a of document.querySelectorAll(".app[data-app]")){const s=e[a.dataset.app??""]?.(a,t);s&&n.push(s)}return()=>{for(const a of n)a()}}function _s(e){const t={},n=e.fields.theme;(n==="dark"||n==="light")&&(t["data-page-theme"]=n);const a=e.fields.sky;return a&&(t["data-sky"]=a),t}const Js=["data-page-theme","data-sky"];function Gs(e,t){return t==="/"?e==="/":e.startsWith(t)}const qs=7.8,sn=17,Ys=12,Us=8,Xe=28,rn=44,fe=8,Ks=16;function zs(e){const t=new Map;for(const p of e.nodes){const b=p.label.split(`
`),x=Math.max(...b.map(A=>A.length),1);t.set(p.id,{id:p.id,label:p.label,real:!0,rank:-1,along:Math.max(40,x*qs+Ys*2),across:b.length*sn+Us*2,pos:0,preds:[],succs:[]})}for(const p of e.edges){const b=t.get(p.from),x=t.get(p.to);if(!b||!x)throw new Error(`flow: edge ${p.from} --> ${p.to} names a node that is not there`);b.succs.push(x),x.preds.push(b)}Xs(t);const n=Vs(t,e),a=Zs(t);Qs(a);const s=a.length,o=a.map(p=>Math.max(sn,...p.map(b=>b.real?b.across:0))),r=[];let i=fe;for(let p=0;p<s;p+=1)r.push(i),i+=(o[p]??0)+rn;const c=p=>(r[p.rank]??0)+((o[p.rank]??0)-(p.real?p.across:0))/2,l=Math.max(...[...t.values()].map(p=>p.pos+p.along))+fe,h=i-rn+fe,u=e.direction==="LR",m=(p,b)=>u?[b,p]:[p,b],y=[...t.values()].filter(p=>p.real).map(p=>{const[b,x]=m(p.pos,c(p));return{id:p.id,label:p.label,x:b,y:x,width:u?p.across:p.along,height:u?p.along:p.across}}),d=e.edges.map((p,b)=>{const x=n[b]??[],A=x[0],S=x[x.length-1];if(!A||!S)throw new Error("flow: an edge lost its ends");const C=[m(A.pos+A.along/2,c(A)+A.across),...x.slice(1,-1).map(k=>m(k.pos+k.along/2,c(k)+(o[k.rank]??0)/2)),m(S.pos+S.along/2,c(S))];return p.label===void 0?{from:p.from,to:p.to,points:C}:{from:p.from,to:p.to,label:p.label,points:C}}),[g,v]=m(l,h);return{direction:e.direction,width:g,height:v,nodes:y,edges:d}}function Xs(e){const t=new Set,n=a=>{if(a.rank>=0)return a.rank;if(t.has(a))throw new Error(`flow: there is a cycle through ${a.id}, and a flow has a direction`);return t.add(a),a.rank=a.preds.length===0?0:Math.max(...a.preds.map(n))+1,t.delete(a),a.rank};for(const a of e.values())n(a)}function Vs(e,t){let n=0;return t.edges.map(a=>{const s=e.get(a.from),o=e.get(a.to);if(!s||!o)return[];const r=[s];let i=s;for(let c=s.rank+1;c<o.rank;c+=1){n+=1;const l={id:`\0${n}`,label:"",real:!1,rank:c,along:Ks,across:0,pos:0,preds:[i],succs:[]};e.set(l.id,l),i.succs.push(l),r.push(l),i=l}return i!==s&&(i.succs.push(o),o.preds.push(i),s.succs.splice(s.succs.indexOf(o),1),o.preds.splice(o.preds.indexOf(s),1)),r.push(o),r})}function Zs(e){const t=Math.max(...[...e.values()].map(r=>r.rank))+1,n=Array.from({length:t},()=>[]);for(const r of e.values())n[r.rank]?.push(r);const a=new Map,s=r=>r.forEach((i,c)=>a.set(i,c));n.forEach(s);const o=(r,i)=>i.length===0?a.get(r)??0:i.reduce((c,l)=>c+(a.get(l)??0),0)/i.length;for(let r=0;r<4;r+=1){for(let i=1;i<t;i+=1){const c=n[i]??[];c.sort((l,h)=>o(l,l.preds)-o(h,h.preds)),s(c)}for(let i=t-2;i>=0;i-=1){const c=n[i]??[];c.sort((l,h)=>o(l,l.succs)-o(h,h.succs)),s(c)}}return n}function Qs(e){const t=r=>r.reduce((i,c)=>i+c.along,0)+Xe*Math.max(0,r.length-1),n=Math.max(...e.map(t));for(const r of e){let i=fe+(n-t(r))/2;for(const c of r)c.pos=i,i+=c.along+Xe}const a=r=>r.pos+r.along/2,s=(r,i)=>{for(const c of r){const l=i(c);if(l.length===0)continue;const h=l.reduce((u,m)=>u+a(m),0)/l.length;c.pos=h-c.along/2}for(let c=1;c<r.length;c+=1){const l=r[c-1],h=r[c];if(!l||!h)continue;const u=l.pos+l.along+Xe;h.pos<u&&(h.pos=u)}};for(let r=0;r<3;r+=1){for(let i=1;i<e.length;i+=1)s(e[i]??[],c=>c.preds);for(let i=e.length-2;i>=0;i-=1)s(e[i]??[],c=>c.succs)}const o=Math.min(...e.flat().map(r=>r.pos));for(const r of e.flat())r.pos+=fe-o}const it=/(\w[\w.-]*)(?:\[([^\]]*)\])?/,er=new RegExp(`^${it.source}\\s*-->(?:\\|([^|]*)\\|)?\\s*${it.source}$`),tr=new RegExp(`^${it.source}$`),nr=/^(?:flow\s+)?(TD|LR)$/i;function ar(e){const t=new Map,n=[];let a="TD";const s=(i,c)=>{i&&(t.has(i)||t.set(i,i),c!==void 0&&t.set(i,c.replace(/\\n/g,`
`)))},o=e.split(`
`);let r=!0;return o.forEach((i,c)=>{const l=i.trim();if(l===""||l.startsWith("%"))return;if(r){r=!1;const m=nr.exec(l);if(m){a=m[1]?.toUpperCase()==="LR"?"LR":"TD";return}}const h=er.exec(l);if(h){const[,m,y,d,g,v]=h;s(m,y),s(g,v),n.push(d===void 0?{from:m??"",to:g??""}:{from:m??"",to:g??"",label:d});return}const u=tr.exec(l);if(u){s(u[1],u[2]);return}throw new Error(`flow: cannot read line ${c+1}: "${l}"`)}),{direction:a,nodes:[...t].map(([i,c])=>({id:i,label:c})),edges:n}}const or=20,cn=17;function sr(e){let t=5381;for(let n=0;n<e.length;n+=1)t=(t*33^e.charCodeAt(n))>>>0;return t.toString(36)}const R=e=>String(Math.round(e*10)/10);function rr(e,t){const[n,...a]=e.points;if(!n)return"";let s=`M${R(n[0])},${R(n[1])}`,o=n;for(const r of a){const[i,c]=o,[l,h]=r,u=t?[(i+l)/2,c]:[i,(c+h)/2],m=t?[(i+l)/2,h]:[l,(c+h)/2];s+=` C${R(u[0])},${R(u[1])} ${R(m[0])},${R(m[1])} ${R(l)},${R(h)}`,o=r}return s}function ir(e){const{points:t}=e,n=t[Math.floor((t.length-1)/2)]??[0,0],a=t[Math.ceil((t.length-1)/2)]??n;return[(n[0]+a[0])/2,(n[1]+a[1])/2]}function cr(e){const t=zs(ar(e)),n=t.direction==="LR",a=`arrow-${sr(e)}`,s=t.edges.map(c=>{const l=`<path class="edge" d="${rr(c,n)}" marker-end="url(#${a})"/>`;if(c.label===void 0)return l;const[h,u]=ir(c);return`${l}<text class="edge-label" x="${R(h)}" y="${R(u)}" text-anchor="middle" dominant-baseline="middle">${I(c.label)}</text>`}).join(""),o=t.nodes.map(c=>{const l=c.x+c.width/2,h=c.label.split(`
`),u=c.y+(c.height-h.length*cn)/2,m=h.map((y,d)=>`<tspan x="${R(l)}" y="${R(u+or-8+d*cn)}">${I(y)}</tspan>`).join("");return`<g class="node"><rect x="${R(c.x)}" y="${R(c.y)}" width="${R(c.width)}" height="${R(c.height)}" rx="4"/><text text-anchor="middle" dominant-baseline="middle">${m}</text></g>`}).join(""),r=R(t.width),i=R(t.height);return`<figure class="flow"><svg class="flow" viewBox="0 0 ${r} ${i}" width="${r}" height="${i}" style="max-width: 100%; height: auto" role="img"><defs><marker id="${a}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z"/></marker></defs>${s}${o}</svg></figure>`}const lr=new Set("var let const function return if else for while do break continue new this true false null undefined class extends import export from default async await throw try catch finally typeof instanceof in of switch case delete void yield".split(" "));function Y(e,t){return`<span class="hl-${e}">${I(t)}</span>`}function Gn(e,t,n){for(let a=t+1;a<e.length;a+=1)if(e[a]==="\\")a+=1;else if(e[a]===n)return a+1;return e.length}function hr(e){let t="",n=0;for(;n<e.length;){const a=e.slice(n);let s;if(a.startsWith("//")){const o=e.indexOf(`
`,n),r=o<0?e.length:o;t+=Y("c",e.slice(n,r)),n=r}else if(a.startsWith("/*")){const o=e.indexOf("*/",n+2),r=o<0?e.length:o+2;t+=Y("c",e.slice(n,r)),n=r}else if(a[0]==='"'||a[0]==="'"||a[0]==="`"){const o=Gn(e,n,a[0]??"");t+=Y("s",e.slice(n,o)),n=o}else if(s=/^[A-Za-z_$][\w$]*/.exec(a)){const o=s[0];t+=lr.has(o)?Y("k",o):I(o),n+=o.length}else(s=/^\d+(?:\.\d+)?/.exec(a))?(t+=Y("n",s[0]),n+=s[0].length):(t+=I(a[0]??""),n+=1)}return t}function dr(e){let t="",n=0;for(;n<e.length;){const a=e.slice(n);if(a.startsWith("<!--")){const o=e.indexOf("-->",n+4),r=o<0?e.length:o+3;t+=Y("c",e.slice(n,r)),n=r;continue}const s=/^<(\/?)([A-Za-z][\w-]*)/.exec(a);if(!s){const o=e.indexOf("<",n+1),r=o<0?e.length:o;t+=I(e.slice(n,r)),n=r;continue}for(t+=`&lt;${s[1]}${Y("t",s[2]??"")}`,n+=s[0].length;n<e.length&&e[n]!==">";){const o=e.slice(n);let r;if(r=/^\s+/.exec(o))t+=r[0],n+=r[0].length;else if(r=/^[A-Za-z_:][\w:.-]*/.exec(o))t+=Y("a",r[0]),n+=r[0].length;else if(o[0]==="="&&(o[1]==='"'||o[1]==="'")){const i=Gn(e,n+1,o[1]??"");t+=`=${Y("s",e.slice(n+1,i))}`,n=i}else t+=I(o[0]??""),n+=1}e[n]===">"&&(t+="&gt;",n+=1)}return t}function ur(e,t){return t==="js"||t==="javascript"?hr(e):t==="html"?dr(e):I(e)}function mr(e,t){const a=/^https?:/.test(t)?' target="_blank" rel="noopener noreferrer"':"";return`<a href="${I(t)}"${a}>${e}</a>`}const fr=["large","wide"];function pr(e,t,n){const a=n&&fr.includes(n)?` class="${n}"`:"";return`<img src="${I(t)}" alt="${I(e)}"${a}>`}const gr=/(`[^`]+`|!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)|\[[^\]]+\]\([^)\s]+\))/g,yr=/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/,wr=/^\[([^\]]+)\]\(([^)\s]+)\)$/;function qn(e){return e.split(gr).map(t=>{if(t.startsWith("`")&&t.endsWith("`")&&t.length>1)return`<code>${I(t.slice(1,-1))}</code>`;const n=yr.exec(t);if(n)return pr(n[1]??"",n[2]??"",n[3]);const a=wr.exec(t);return a?mr(qn(a[1]??""),a[2]??""):I(t)}).join("")}function br(e){return e.split(/(<code>[\s\S]*?<\/code>)/g).map(t=>t.startsWith("<code>")?t:t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/(^|[^*])\*([^*]+)\*/g,"$1<em>$2</em>").replace(/ {2,}\n/g,"<br>").replace(/\n/g," ").replace(/ -- /g," — ")).join("")}function X(e){return br(qn(e))}const ln=/^(?:[-*]|\d+\.)\s/;function vr(e,t,n){if(!ln.test(e[0]??""))return!1;const a=t.slice(n).find(s=>s.trim()!=="");return a!==void 0&&ln.test(a)}function $r(e){const t=[],n=e.replace(/\r\n?/g,`
`).split(`
`);let a=[],s=!1;return n.forEach((o,r)=>{if(o.startsWith("```")){s=!s,a.push(o),s||(t.push(a),a=[]);return}if(!s&&o.trim()===""){if(vr(a,n,r+1))return;a.length&&t.push(a),a=[];return}a.push(o)}),a.length&&t.push(a),t}function kr(e){return e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function xr(e){const t=/^(#{1,4})\s+(.*)$/.exec(e[0]??"");if(!t||!e.slice(0,-1).every(o=>/ {2,}$/.test(o)))return null;const a=t[1]?.length??1,s=[t[2]??"",...e.slice(1)].join(`
`);return`<h${a} id="${kr(s)}">${X(s)}</h${a}>`}function Tr(e){if(!e[0]?.startsWith("```"))return null;const t=e[0].slice(3).trim(),n=e.slice(1,-1).join(`
`);return t==="flow"?cr(n):`<pre><code>${ur(n,t)}</code></pre>`}function Sr(e,t){const n=[];for(const a of e)t.test(a)?n.push(a.replace(t,"")):n.length&&(n[n.length-1]+=`
${a.trim()}`);return n}function Mr(e){const t=e[0]??"",n=/^\d+\.\s/.test(t),a=/^[-*]\s/.test(t);if(!n&&!a)return null;const s=n?/^\d+\.\s+/:/^[-*]\s+/;if(!e.every(i=>s.test(i)||/^\s/.test(i)))return null;const o=n?"ol":"ul",r=Sr(e,s).map(i=>`<li>${X(i)}</li>`).join("");return`<${o}>${r}</${o}>`}function Ar(e){return e.every(n=>n.includes(" :: "))?`<dl>${e.map(n=>{const a=n.indexOf(" :: ");return[n.slice(0,a),n.slice(a+4)]}).map(([n,a])=>`<dt>${X(n)}</dt><dd>${X(a)}</dd>`).join("")}</dl>`:null}function Ir(e){if(!e.every(n=>n.startsWith(">")))return null;const t=e.map(n=>n.replace(/^>\s?/,"")).join(" ");return`<blockquote>${X(t)}</blockquote>`}function Er(e){const t=/^::([a-z0-9-]+)$/.exec(e[0]??"");return!t||e.length!==1?null:`<div class="app" data-app="${t[1]}"></div>`}function Cr(e){return e.length===1&&/^-{3,}$/.test(e[0]??"")?"<hr>":null}function Dr(e){const t=e.length===1&&/^(\\+)$/.exec(e[0]??"");return t?`<div class="space" style="--n:${t[1]?.length??1}"></div>`:null}function jr(e){return e.length===1&&/^!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)$/.test(e[0]??"")?`<figure>${X(e[0]??"")}</figure>`:null}function Or(e){return`<p>${X(e.join(`
`))}</p>`}const Pr=[Cr,Dr,xr,Tr,Ir,Er,jr,Ar,Mr];function Yn(e){return $r(e).map(t=>{for(const n of Pr){const a=n(t);if(a!==null)return a}return Or(t)}).join(`
`)}function ft(e){return e==="/"?"~":`~${e.replace(/\/$/,"")}`}function Un(e,t){return`<p class="ran"><span class="ps1">${I(e)} $</span> ${I(t)}</p>`}function Nr(e,t){if(t.parent===null)return"";const n=e.childrenOf(t.route);if(n.length===0)return"";const a=n.map(s=>`<li><a class="entry" href="${s.route}"><code>${I(s.name)}/</code><span class="title">${I(s.title)}</span>`+(s.summary?`<span class="summary">${I(s.summary)}</span>`:"")+"</a></li>").join("");return`${Un(ft(t.route),"ls")}
<ul class="listing">${a}</ul>`}function Fr(e,t){const n=e.trailTo(t.route).slice(1).map(a=>a.name).join("/");return Un("~",n?`cd ${n} && cat README.md`:"cat README.md")}function Lr(e,t){return`${Fr(e,t)}
${Yn(t.body)}
${Nr(e,t)}`}function Rr(e,t){const n=document.querySelector("main");if(!n)return()=>!1;const a=(s,{push:o=!0,keep:r=!1}={})=>{const i=e.at(s);if(!i)return!1;r||(n.innerHTML=Lr(e,i));const c=_s(i);for(const l of Js){const h=c[l];h?document.documentElement.setAttribute(l,h):document.documentElement.removeAttribute(l)}document.title=i.route==="/"?"David Rodenas":`${i.title} — David Rodenas`;for(const l of document.querySelectorAll("nav .navlink"))Gs(s,l.getAttribute("href")??"\0")?l.setAttribute("aria-current","page"):l.removeAttribute("aria-current");return o&&(s===window.location.pathname?window.history.replaceState({route:s},"",s):window.history.pushState({route:s},"",s),r||window.scrollTo({top:0})),window.goatcounter?.count?.({path:s,title:document.title}),t(i,r),!0};return document.addEventListener("click",s=>{if(s.defaultPrevented||s.button!==0||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey)return;const o=s.target?.closest("a[href]");if(!o||o.target||o.dataset.run)return;const r=new URL(o.href,window.location.href);if(r.origin!==window.location.origin)return;const i=r.pathname.endsWith("/")?r.pathname:`${r.pathname}/`;e.at(i)&&(s.preventDefault(),i!==window.location.pathname&&a(i))}),window.addEventListener("popstate",()=>{const s=window.location.pathname.endsWith("/")?window.location.pathname:`${window.location.pathname}/`;a(s,{push:!1})}),a}class Wr{typed=[];drafts=[];index=0;get lines(){return this.typed}add(t){this.typed.push(t),this.drafts=[...this.typed,""],this.index=this.typed.length}previous(t){return this.moveTo(this.index-1,t)}next(t){return this.moveTo(this.index+1,t)}moveTo(t,n){return this.drafts.length===0&&(this.drafts=[""]),t<0||t>=this.drafts.length?n:(this.drafts[this.index]=n,this.index=t,this.drafts[t]??n)}}function Br(e,t,n,a){if(e==="k"){const s=t.slice(n);return{line:t.slice(0,n),caret:n,killed:s||a}}if(e==="u"){const s=t.slice(0,n);return{line:t.slice(n),caret:0,killed:s||a}}return e==="y"?{line:t.slice(0,n)+a+t.slice(n),caret:n+a.length,killed:a}:null}function Kn(e){return e.split(/\s*(?:;|&&)\s*/).map(t=>t.trim().split(/\s+/).filter(Boolean)).filter(t=>t.length>0)}function Pe(e,t){const a=t.startsWith("~")||t.startsWith("/")?[]:e.split("/").filter(Boolean),s=t.replace(/^~/,"").split("/").filter(Boolean),o=[...a];for(const r of s)r!=="."&&(r===".."?o.pop():o.push(r));return o.length===0?"/":`/${o.join("/")}/`}function Hr(e){return e.replace(/(?:^|\/)(?:README\.md|\*)$/,"")||"."}const _r={name:"cat",usage:"cat <file>",description:"print a page, README.md or * for the one here",run({site:e,cwd:t},[n]){if(!n)return{text:"cat: usage: cat <file>",error:!0};const a=Pe(t,Hr(n)),s=e.at(a);return!s||/\.md$/.test(n)!==/README\.md$/.test(n)?{text:`cat: ${n}: no such file`,error:!0}:{html:Yn(s.body),at:a}}},Jr={name:"cd",usage:"cd [dir]",description:"go to a directory (the address follows)",run(e,[t="~"]){const n=Pe(e.cwd,t);return e.site.at(n)?(e.cwd=n,{at:n}):{text:`cd: ${t}: no such directory`,error:!0}}},Gr={name:"clear",usage:"clear",description:"clear what the shell has printed",run(){return{clear:!0}}},qr={name:"help",usage:"help [command]",description:"this",run({commands:e},[t]){if(t){const o=e.find(r=>r.name===t);return o?{text:`${o.usage}
  ${o.description}`}:{text:`help: ${t}: no such command`,error:!0}}const n=Math.max(...e.map(o=>o.usage.length));return{text:["Commands:",...e.map(o=>`${o.usage.padEnd(n)}  ${o.description}`),"","Tab completes; → takes the grey suggestion. ↑↓ recall. ^K kills to the end of the line, ^U back to the start, ^Y puts it back."].join(`
`)}}};function Yr(e){const t=e.filter(a=>a.startsWith("-")).flatMap(a=>a.slice(1).split("")),n=e.find(a=>!a.startsWith("-"))??".";return{flags:t,path:n}}function Ur(e,t,n){const a=n==="."?"":`${n.replace(/\/$/,"")}/`;return[{mode:"--r-",name:"README.md",title:e.title,href:e.route,run:`cat ${a}README.md`},...t.map(s=>({mode:"dr-x",name:`${s.name}/`,title:s.title,href:s.route}))]}function hn(e){const t=e.run?` data-run="${I(e.run)}"`:"";return`<a href="${I(e.href)}"${t}>${I(e.name)}</a>`}function Kr(e,t){const n=(o,r)=>t?`${o.mode}  ${r.padEnd(20)}  ${o.title}`:r,a=o=>t?`${o.mode}  ${hn(o)}${" ".repeat(Math.max(0,20-o.name.length))}  ${I(o.title)}`:hn(o),s=t?[`total ${e.length}`]:[];return{text:[...s,...e.map(o=>n(o,o.name))].join(`
`),html:`<pre>${[...s,...e.map(a)].join(`
`)}</pre>`}}const zr={name:"ls",usage:"ls [-l] [path]",description:"list what a directory holds; -l says what each is",run({site:e,cwd:t},n){const{flags:a,path:s}=Yr(n),o=a.find(c=>c!=="l");if(o)return{text:`ls: -${o}: no such option. Try ls -l`,error:!0};const r=Pe(t,s),i=e.at(r);return i?Kr(Ur(i,e.childrenOf(r),s),a.includes("l")):{text:`ls: ${s}: no such directory`,error:!0}}},Xr={name:"pwd",usage:"pwd",description:"print where you are",run({cwd:e}){return{text:ft(e)}}},zn=[zr,Jr,_r,Xr,qr,Gr];class Vr{context;constructor(t,n,a=zn){this.context={site:t,cwd:n,commands:a}}get prompt(){return`${ft(this.context.cwd)} $`}moveTo(t){return this.context.site.at(t)?(this.context.cwd=t,!0):!1}run(t){const n=[];for(const[a="",...s]of Kn(t)){const o=this.context.commands.find(i=>i.name===a),r=o?o.run(this.context,s):{text:`${a}: command not found. Try help`,error:!0};if(n.push(r),r.error)break}return n}complete(t){const n=t.split(/\s+/),a=n.pop()??"",s=n.length===0?"":`${n.join(" ")} `;return(n.length===0?this.commandNames():this.pathNames(a)).filter(r=>r.startsWith(a)).map(r=>s+r)}commandNames(){return this.context.commands.map(t=>t.name).sort()}pathNames(t){const n=t.lastIndexOf("/"),a=n<0?".":t.slice(0,n+1),s=Pe(this.context.cwd,a);if(!this.context.site.at(s))return[];const o=n<0?"":a;return["README.md",...this.context.site.childrenOf(s).map(i=>`${i.name}/`)].map(i=>o+i)}}function Zr(e,t,n){if(e==="")return"help";const s=[...[...t].reverse(),...n].find(o=>o.startsWith(e)&&o!==e);return s?s.slice(e.length):""}const ct="shell-pending";function Qr(e){try{e&&sessionStorage.setItem(ct,e)}catch{}}function ei(){try{const e=sessionStorage.getItem(ct)??"";return sessionStorage.removeItem(ct),e}catch{return""}}function ti(){window.__stopTyped?.();const e=window.__typed??[];if(window.__typed=[],e.length===0)return null;const t=[];let n="";for(const a of e)a==="Enter"?(t.push(n),n=""):a==="Backspace"?n=n.slice(0,-1):n+=a;return{finished:t,unfinished:n}}function ni(e,t,n={}){const a=document.querySelector(".terminal"),s=document.querySelector(".screen"),o=a?.querySelector("form.prompt"),r=o?.querySelector("input"),i=o?.querySelector(".line"),c=o?.querySelector(".suggest"),l=o?.querySelector(".ps1"),h=document.querySelector(".ran.end"),u=h?.querySelector(".ps1"),m=h?.querySelector(".line"),y=h?.querySelector(".typed");if(!a||!s||!o||!r||!i||!c||!l||!h||!u||!m||!y)return null;const d=()=>{l.textContent=g.prompt,u.textContent=g.prompt},g=new Vr(e,t,n.commands),v=new Wr;let p=null;const b=w=>{s.append(w)},x=()=>{p?.remove(),p=null},A=()=>{const w=r.selectionStart??r.value.length;i.style.setProperty("--caret",String(w)),i.style.setProperty("--typed",String(r.value.length)),y.textContent=r.value,m.style.setProperty("--caret",String(w)),c.textContent=w===r.value.length?Zr(r.value,v.lines,g.complete(r.value)):""},S=(w,M=w.length)=>{r.value=w,r.setSelectionRange(M,M),A()},C=w=>{if(w.clear&&(s.replaceChildren(),n.clearPage?.()),w.html){const M=f("div",{class:w.text?"listing-out":"cat"});M.innerHTML=w.html,b(M)}else w.text&&b(f("pre",{class:w.error?"error":""},w.text))},k=w=>{x();const M=f("p",{class:"echo"},f("span",{class:"ps1"},g.prompt),` ${w}`);b(M);let W=!1;const j=Kn(w).map(F=>F.join(" "));for(let F=0;F<j.length;F+=1){const[B]=g.run(j[F]??"");if(B){if(C(B),B.html&&!B.text&&(W=!0),B.at&&!n.moveTo?.(B.at)){Qr(j.slice(F+1).join(" && ")),window.location.assign(B.at);return}if(B.error)break}}d(),A(),W?M.scrollIntoView({block:"start"}):window.scrollTo({top:document.documentElement.scrollHeight})},E=()=>{if(x(),r.value.trim()===""){S("help");return}const w=g.complete(r.value);w.length===1?S(w[0]??r.value):w.length>1&&(p=f("p",{class:"hint"},w.map(M=>M.split(" ").pop()).join("  ")),o.insertAdjacentElement("afterend",p),window.scrollTo({top:document.documentElement.scrollHeight}))};o.addEventListener("submit",w=>{w.preventDefault();const M=r.value.trim();S(""),M&&(v.add(M),k(M))});let L="";r.addEventListener("keydown",w=>{if(w.key==="Tab")w.preventDefault(),E();else if(w.key==="ArrowUp")w.preventDefault(),S(v.previous(r.value));else if(w.key==="ArrowDown")w.preventDefault(),S(v.next(r.value));else if(w.key==="ArrowRight"&&r.selectionStart===r.value.length&&c.textContent)w.preventDefault(),S(r.value+c.textContent);else if(w.ctrlKey&&!w.metaKey&&!w.altKey){const M=Br(w.key,r.value,r.selectionStart??r.value.length,L);if(!M)return;w.preventDefault(),x(),S(M.line,M.caret),L=M.killed}else x()});for(const w of["input","keyup","click","focus","select"])r.addEventListener(w,A);let P=!0;r.addEventListener("input",()=>{P&&r.value!==""&&window.scrollTo({top:document.documentElement.scrollHeight}),P=r.value===""}),document.addEventListener("selectionchange",()=>{document.activeElement===r&&A()}),s.addEventListener("click",w=>{const M=w.target?.closest("a[data-run]");M?.dataset.run&&(w.preventDefault(),k(M.dataset.run))}),window.addEventListener("keydown",w=>{const W=w.target?.matches("input, textarea, select, [contenteditable]")??!1,j=w.key.length===1&&!w.ctrlKey&&!w.metaKey&&!w.altKey;W||!j||r.focus({preventScroll:!1})}),o.addEventListener("click",()=>r.focus()),h.addEventListener("click",()=>r.focus()),A();const T=ei();T&&k(T);const $=ti();if($){for(const w of $.finished)w.trim()&&(v.add(w.trim()),k(w.trim()));S($.unfinished),r.focus()}return{run:k,moveTo:w=>{g.moveTo(w)&&(s.replaceChildren(),d(),A())}}}const ai=[{file:"book/index.md",markdown:`---
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
`},{file:"open-data/hot-nights.md",markdown:`---
title: Hot nights, counted
summary: How many nights a year never cool below 20 °C, at nine weather stations, and whether the second half of each record differs from the first.
order: 2
---

# Hot nights, counted

A night whose lowest temperature stays at 20 °C or above is called a tropical
night: the house does not cool down and nobody sleeps well. The Meteocat
publishes the daily minimum of every automatic station it runs. This counts
them, year by year, and cuts each record in two to see whether it has moved:

::weather

The threshold slides, because what the site keeps is not the count but a
histogram of each month's days. Move it to 25 °C and the nights are torrid;
choose another kind of day and the same page counts hot afternoons, frost, or
rain.

## What is in it

- **Every one of the nine stations has more tropical nights in the second
  half of its record than in the first.** At Badalona, 75.1 a year became
  86.1. At the Raval, in the middle of Barcelona, 93.2 became 103.0.
- **The nights at 25 °C or more are where the Raval changes most**: 6.1 a
  year before 2016, 19.8 since.
- **2022 is the year with most tropical nights at four of the nine, and with
  most days at 30 °C or more at eight of them.**
- **The exception is worth as much as the rule.** The Observatori Fabra, on
  its hill above Barcelona, has fewer days at 30 °C or more in its second
  half than in its first, 33.9 against 42.3. Its first half holds the summer
  of 2003.
- **Rain does not move the same way.** Days with 1 mm or more go slightly up
  at some stations and slightly down at others, and the largest difference
  between two halves is five days a year.

## What it is not

Each station is cut in half over its own years, so two stations' halves are
different periods: a record that starts in 2009 has no flat 1990s in it, and
will look steeper for that alone. Compare a station with itself.

The series are not homogenised. A sensor replaced, a screen moved, a car park
built next door: each can make a step that has nothing to do with the climate,
and nothing here corrects for it. A station is never joined to another, even
in the same town. A year missing more than one day in twenty is drawn as an
outline and kept out of every mean. The year still running is not shown.

The names — tropical night, torrid night — are common usage, not official
definitions. Frost is "below 0 °C" rather than "0 °C or below" because only
the first can be counted exactly from the histograms. The difference between
two halves is a description of what a record did. It is not a forecast, and it
does not say why.

## Where it comes from

This is the small version of an explorer I built in the summer of 2026, which
has every station of the network that is still reporting, humidity and a map:
[Nits de calor a Catalunya](https://david-rodenas.com/heatwave/). Here there
are nine stations and four variables, the daily series stays at its source,
and the site keeps only what it derives from it, a finished year at a time.
`},{file:"open-data/index.md",markdown:`---
title: Open data
summary: Public measurements of Catalonia, looked at until they show something.
order: 9
---

# Open data

The Generalitat de Catalunya publishes what its measuring networks record, and
most of it is only ever looked at a day at a time. These pages add it up
another way and keep the picture that came out.

The sums are kept in this site's repository, a finished year at a time, and
the portal is asked again only when a year has ended. While you read, nothing
is fetched from anyone but this site.
`},{file:"open-data/no2.md",markdown:`---
title: NO2 by the hour and the month
summary: Thirty years of hourly NO2, averaged by hour of the day and month of the year. A city's working day turns out to have a shape.
order: 1
---

# NO2 by the hour and the month

Nitrogen dioxide in a city is mostly traffic. The Generalitat de Catalunya
measures it every hour at fixed points and publishes every reading since 1991.
Looked at a day at a time it is noise. Averaged by **hour of the day** and
**month of the year**, it is a picture:

::no2

Each cell is the mean, in µg/m³, of every measurement taken at that hour in
that month over the years selected. The colour says whether it is good or bad
before the number is read: green is clean, red is the European annual limit of
40, and purple going to black is beyond it. Press a bar to see one year alone.

## What is in it

At Barcelona's Poblenou, a station away from the big roads, over its whole
record:

- **Two ridges.** The morning one peaks at hour 09 and is there all year. The
  evening one, around hours 20 to 22, is the higher of the two from November
  to February, and by July it is less than half of what it was in January.
- **The afternoon.** Between the ridges is a valley, deepest at hours 16 and
  17 in August, at 15 µg/m³: a quarter of a January evening.
- **August.** Its mean is 28 µg/m³; no other month is below 33. The city
  leaves, and it shows at every hour.
- **The week.** From Monday to Friday the mean is about a quarter higher than
  on Saturdays and Sundays. Choose the weekends and the morning ridge is gone.
- **The years.** 57.4 µg/m³ in 2003, 36.7 in 2019, 29.0 in 2020, 22.0 in 2025.
  It has not been over the European limit of 40 since 2017.

Choose the **Eixample**, which measures traffic, and the same shape is there
in purple: 70 µg/m³ in 1999, 49.5 in 2019, 35.2 in 2020. The year of the
lockdowns was its first under the limit; 2022 went back over it, and 2025
closed at 29.1. The same shape, higher or lower, is at every urban station
here.

## Height

Choose the **Observatori Fabra**. It is in Barcelona, 415 m up the hill the
city climbs, and its table is green: 7.4 µg/m³ in 2025, when the Eixample
below it closed at 29.1 and Poblenou at 22.0. It has no rush hours either. Its
highest cells are late morning in summer and late afternoon in winter, and
none of them reaches 20; its lowest are the early morning, just when the
streets below are filling. Same city, same traffic: little of it is measured
up there.

The other green table is La Castanya, in the Montseny, where the yearly mean
has stayed under 4 µg/m³ since 2013: that is what air with no road under it
measures. Those two are the only stations of these eleven that ended 2025 under
the 10 µg/m³ the WHO has recommended since 2021.

## What it is not

The cells are means, and a mean hides the bad days. Public holidays are
counted as whatever day of the week they fell on. The dataset numbers its
hours 01 to 24 and does not say by which clock. A year drawn as an outline had
less than three quarters of its hours measured; Eixample has no 2010 at all.
These are open data added up, not validated science: for anything that
matters, go to the source.

## Where it comes from

I first drew this table in 2021, for myself, in a small app that asked the
portal for everything on every visit. This page is that analysis again, with
the asking moved out of the reader's way: the site keeps the sums, a finished
year at a time, and asks the portal only when a year has ended.
`},{file:"projects/index.md",markdown:`---
title: Projects
summary: Things built to be looked at and played with: a language model you can count by hand, a relativistic rocket, and what strangers download.
order: 10
---

# Projects

Small things, each made to show one idea by letting you move it.
`},{file:"projects/next-word.md",markdown:`---
title: The next word
summary: A language model with everything taken away but the idea: count which word follows which, then throw the dice.
order: 1
---

# The next word

A language model does one thing: given the words so far, it says what may
come next, and how likely. Everything else is how well it says it. This one
says it as badly as possible, so that the whole of it can be seen. It reads a
text, counts which word followed which, and throws dice weighted by the counts.

::next-word

Press **next word** and it throws the dice once. Press a word it offers and
you are the dice. Press **write** and watch it go.

## Things to try

- **Count it yourself.** In the eight short sentences, *the* is followed by
  *cat* three times, *dog* three times and *car* twice. Those are the chances
  it offers, and there is nothing else inside.
- **Turn the temperature down to 0** and it always says the likeliest thing,
  and soon goes round in a circle. **Turn it up to 2** and the unlikely words
  get their turn. It is the same dial the real ones have, doing the same sum.
- **Let it read this website**, and look two or three words back instead of
  one. One word back it babbles; three words back it starts quoting the pages
  it read, because so long a context has usually been seen only once. More
  memory needs more text: that trade is the whole history of the field.
- **Start from a word it never saw.** It takes the nearest word it knows, by
  counting letters. A real model avoids the problem by cutting words into
  pieces.

## What it is not

A real model does not keep a table. It would need a row for every run of
thousands of words ever written, and nearly every row would be empty. It
squeezes the table into a network that answers for contexts nobody has seen,
because they resemble ones somebody has — which is where everything
interesting, and everything that goes wrong, comes from. But the question put
to it is this one, and the answer is used this way: a list of chances, a dial,
and dice.

## Where it comes from

The first version is from February 2026, made to be shown in a talk rather
than explained: [the original, with its Catalan
texts](https://david-rodenas.com/next-word-generator/). This one is written
again for this site, with nothing underneath it.
`},{file:"projects/rocinante.md",markdown:`---
title: A relativistic rocket
summary: How long a trip takes on board, how long for those left at home, and why a ship that crosses the solar system in days cannot reach a star in a lifetime.
order: 2
---

# A relativistic rocket

A ship that can keep its engine burning does not fly the way a probe does. It
speeds up to halfway, turns round, and slows down the rest. Near the speed of
light its own clock falls behind the ones at home, so a trip has two lengths.
Here they are side by side, for one ship, to ten places:

::rocket

Press a row to draw that trip. The ship it opens with is a fusion torch:
thirty thousand tonnes, a sixth of it fuel, a third of a g.

## Things to try

- **It owns the solar system and nothing else.** Mars in under four days,
  Pluto in a month, on a thousand tonnes of fuel at most. Proxima Centauri
  takes sixty-eight years: it burns half its fuel in the first ten weeks,
  reaches 6% of the speed of light, and coasts with the engine off for
  sixty-seven years. At that speed the two clocks still agree.
- **Give it fuel.** Slide it up until the row for Proxima stops saying
  *coasts*: twenty ships' worth of fuel for every ship. The trip drops to
  seven years on board and eight and a half at home. This is the rocket
  equation: fuel has to carry the fuel.
- **Make it perfect**: exhaust at 100% of c, one g, and all the fuel the
  slider has. Now the clocks part. Proxima is 3.5 years on board and 5.9 at
  home. The centre of the galaxy is 20 years on board and 26,002 at home, and
  Andromeda is 29. You could go, inside a working life; nobody you knew would
  hear of it. The fuel for Andromeda is six million million ships for every
  ship, with an engine nobody knows how to build.

## What it is not

Straight lines from a standing start: no orbits, no launch windows, no gravity
wells, and the planets are taken at the gap between their orbit and ours. No
shielding either, and at these speeds the thin gas between the stars arrives
as hard radiation. The arithmetic is the [relativistic rocket of the Usenet
Physics FAQ](https://math.ucr.edu/home/baez/physics/Relativity/SR/Rocket/rocket.html),
and its table of trips at one g is what this page's tests are checked against.

## Where it comes from

This is the arithmetic of the [Rocinante
Simulator](https://david-rodenas.com/rocinante-simulator/), which I built in
October 2025: the solar system and the thirty nearest stars in three
dimensions, a ship to configure, and a sphere showing how far it can reach.
Go there to fly it. This page keeps only the sums, written again for this
site with nothing underneath.
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
`}],dn="---";function oi(e){return(/^"(.*)"$/.exec(e)??/^'(.*)'$/.exec(e))?.[1]??e}function si(e){const t=e.replace(/\r\n?/g,`
`).split(`
`);if(t[0]?.trim()!==dn)return{fields:{},body:e.trim()};const n=t.indexOf(dn,1);if(n<0)return{fields:{},body:e.trim()};const a={};for(const s of t.slice(1,n)){const o=s.indexOf(":");o<=0||(a[s.slice(0,o).trim()]=oi(s.slice(o+1).trim()))}return{fields:a,body:t.slice(n+1).join(`
`).trim()}}function ri(e){const n=e.replace(/\.md$/,"").replace(/(^|\/)index$/,"");return n===""?"/":`/${n}/`}function ii(e){if(e==="/")return null;const t=e.slice(0,-1);return t.slice(0,t.lastIndexOf("/")+1)}function un(e){if(e==="/")return"/";const t=e.slice(0,-1);return t.slice(t.lastIndexOf("/")+1)}function ci(e){const{fields:t,body:n}=si(e.markdown),a=ri(e.file);return{file:e.file,route:a,parent:ii(a),name:un(a),title:t.title??un(a),summary:t.summary??"",order:Number(t.order??"100"),body:n,fields:t}}function mn(e,t){return e.order-t.order||e.name.localeCompare(t.name)}class li{byRoute;constructor(t){const n=t.map(ci).sort(mn);this.byRoute=new Map(n.map(a=>[a.route,a]))}get pages(){return[...this.byRoute.values()]}at(t){return this.byRoute.get(t)}childrenOf(t){return this.pages.filter(n=>n.parent===t).sort(mn)}trailTo(t){const n=this.at(t);return n?n.parent===null?[n]:[...this.trailTo(n.parent),n]:[]}}const de=new li(ai);function fn(){const e=[...zn,...he.flatMap(h=>h.commands??[])],t=Object.assign({},...he.map(h=>h.apps??{})),a=(h=>h.endsWith("/")?h:`${h}/`)(window.location.pathname),s=de.at(a);let o=on(t,{site:de}),r=null;const i=Rr(de,(h,u)=>{o(),o=on(t,{site:de});for(const m of he)m.arrive?.(h);u||r?.moveTo(h.route)});if(r=ni(de,s?a:"/",{moveTo:h=>i(h,{keep:!0}),clearPage:()=>{o(),o=()=>{},document.querySelector("main")?.replaceChildren()},commands:e}),s)for(const h of he)h.arrive?.(s);const l={run:h=>r?.run(h)};for(const h of he)h.install?.(l)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",fn):fn();
