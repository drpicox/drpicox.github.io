function f(e,t={},...n){const a=document.createElement(e);for(const[o,s]of Object.entries(t))s===void 0||s===!1||(typeof s=="function"?a.addEventListener(o.slice(2).toLowerCase(),s):s===!0?a.setAttribute(o,""):a.setAttribute(o,String(s)));for(const o of n)o==null||o===!1||a.append(o);return a}const Ma={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function O(e){return e.replace(/[&<>"]/g,t=>Ma[t]??t)}const Sa=["January","February","March","April","May","June","July","August","September","October","November","December"];function He(e){const[t,n,a]=e.refreshed.split("-").map(Number),o=`${a} ${Sa[(n??1)-1]} ${t}`,s=`${Math.min(...e.years)} to ${Math.max(...e.years)}`;return`<p class="source">Source: ${O(e.attribution)} <a href="${O(e.dataset)}">The dataset, at its source.</a> This site keeps sums of the finished years ${s}, last added to on ${o}.</p>`}function Mt(e,t){const n=e.querySelector("p.source");if(n)return n;const a=document.createElement("div");return fetch(t).then(o=>o.json()).then(o=>{a.innerHTML=He(o)}).catch(()=>{}),a}const ae=[{code:"08019004",name:"Barcelona (Poblenou)",kind:"background",area:"urban"},{code:"08019043",name:"Barcelona (Eixample)",kind:"traffic",area:"urban"},{code:"08019044",name:"Barcelona (Gràcia - Sant Gervasi)",kind:"traffic",area:"urban"},{code:"08019057",name:"Barcelona (Palau Reial)",kind:"background",area:"urban"},{code:"08019058",name:"Barcelona (Observatori Fabra)",kind:"background",area:"suburban"},{code:"08015021",name:"Badalona",kind:"background",area:"urban"},{code:"08187012",name:"Sabadell",kind:"traffic",area:"urban"},{code:"17079003",name:"Girona (Escola de Música)",kind:"traffic",area:"urban"},{code:"25120001",name:"Lleida",kind:"traffic",area:"urban"},{code:"43148028",name:"Tarragona (Parc de la Ciutat)",kind:"background",area:"urban"},{code:"08137001",name:"Montseny (La Castanya)",kind:"background",area:"rural"}];function dt(e,t){return t==="workdays"?[e.workdays]:t==="weekends"?[e.weekends]:[e.workdays,e.weekends]}const Aa=e=>(e%4===0&&e%100!==0||e%400===0?366:365)*24,ze=e=>e.reduce((t,n)=>t+n.reduce((a,o)=>a+o,0),0);function Ia(e,t){return Object.entries(e.years).map(([n,a])=>{const o=dt(a,t),s=o.reduce((c,h)=>c+ze(h.counts),0),r=o.reduce((c,h)=>c+ze(h.sums),0),i=dt(a,"all").reduce((c,h)=>c+ze(h.counts),0);return{year:Number(n),mean:s>0?r/s:Number.NaN,measured:i/Aa(Number(n))}}).filter(({mean:n})=>!Number.isNaN(n)).sort((n,a)=>n.year-a.year)}function Ea(e,t){const n=Object.entries(e.years).filter(([a])=>Number(a)>=t.from&&Number(a)<=t.to).flatMap(([,a])=>dt(a,t.days));return Array.from({length:24},(a,o)=>Array.from({length:12},(s,r)=>{const i=n.reduce((h,l)=>h+(l.sums[r]?.[o]??0),0),c=n.reduce((h,l)=>h+(l.counts[r]?.[o]??0),0);return{mean:c>0?i/c:null,count:c}}))}const te=[[0,[0,255,0]],[20,[225,225,0]],[40,[255,0,0]],[60,[225,0,225]],[80,[64,0,64]],[230,[16,0,8]]],Ca=([e,t,n])=>(.299*e+.587*t+.114*n)/255;function St(e){const t=Math.max(0,Math.min(e,230)),n=Math.max(1,te.findIndex(([h])=>h>=t)),[a,o]=te[n-1]??te[0],[s,r]=te[n]??te[te.length-1],i=(t-a)/(s-a),c=o.map((h,l)=>Math.round(h+((r[l]??0)-h)*i));return{background:`rgb(${c.join(",")})`,light:Ca(c)<.45}}const Ne=80,Rn=["January","February","March","April","May","June","July","August","September","October","November","December"],Nn=e=>String(e+1).padStart(2,"0");function ja(e,t,n){if(e.mean===null)return'<td class="none"></td>';const{background:a,light:o}=St(e.mean),s=o?' class="deep"':"",r=`${Rn[n]}, hour ${Nn(t)}: ${e.mean.toFixed(1)} µg/m³, the mean of ${e.count} measurements`;return`<td${s} style="background:${a}" title="${r}">${Math.round(e.mean)}</td>`}function Pa(e){const t=`<tr><th></th>${Rn.map(a=>`<th scope="col">${a.slice(0,3)}</th>`).join("")}</tr>`,n=e.map((a,o)=>`<tr><th scope="row">${Nn(o)}</th>${a.map((s,r)=>ja(s,o,r)).join("")}</tr>`);return`<table class="heat graded"><thead>${t}</thead><tbody>${n.join("")}</tbody></table>`}function At(e){if(e<=0)return[0];const t=10**Math.floor(Math.log10(e)),n=e/t>=5?t:e/t>=2?t/2:t/5,a=[];for(let o=0;o<=e;o+=n)a.push(Math.round(o*100)/100);return a}const $e=720,Ke=190,_={top:14,right:8,bottom:22,left:34},L=e=>e.toFixed(1);function Fn(e,t,n){const a=Math.min(...e),o=Math.max(...e),s=$e-_.left-_.right,r=Ke-_.top-_.bottom,i=s/Math.max(1,o-a+1),c=u=>_.left+(u-a)*i,h=u=>_.top+r-(u-t)/Math.max(1e-9,n-t)*r,d=At(n-t).map(u=>Math.round((u+t)*100)/100).map(u=>`<line class="grid" x1="${_.left}" x2="${$e-_.right}" y1="${L(h(u))}" y2="${L(h(u))}"/><text x="${_.left-4}" y="${L(h(u)+3)}" text-anchor="end">${u}</text>`).join(""),m=o-a>12?5:1,y=Array.from({length:o-a+1},(u,g)=>a+g).filter(u=>u%m===0).map(u=>`<text x="${L(c(u)+i/2)}" y="${Ke-6}" text-anchor="middle">${u}</text>`).join("");return{slot:i,x:c,y:h,left:_.left,right:$e-_.right,top:_.top,height:r,levels:u=>u.map(({from:g,to:v,value:p,label:w})=>`<line class="span" x1="${L(c(g))}" x2="${L(c(v)+i)}" y1="${L(h(p))}" y2="${L(h(p))}"/><text class="span" x="${L((c(g)+c(v)+i)/2)}" y="${L(h(p)-5)}" text-anchor="middle">${w}</text>`).join(""),wrap:(u,g)=>`<svg class="years" viewBox="0 0 ${$e} ${Ke}" role="img" aria-label="${u}">${d}${y}${g}</svg>`}}function ut(e,t){const n=Math.max(t.top??0,...e.map(({value:l})=>l),1),a=Fn(e.map(({year:l})=>l),0,n),{x:o,y:s,slot:r}=a,i=e.map(({year:l,value:d,title:m,chosen:y,partial:u,colour:g})=>`<rect class="${["bar",y?"chosen":"",u?"partial":""].filter(Boolean).join(" ")}" data-year="${l}"${g?` style="--bar:${g}"`:""} x="${L(o(l)+r*.15)}" y="${L(s(d))}" width="${L(r*.7)}" height="${L(s(0)-s(d))}"/><rect class="hit" data-year="${l}" x="${L(o(l))}" y="${a.top}" width="${L(r)}" height="${a.height}"><title>${m}</title></rect>`).join(""),c=(t.references??[]).map(({value:l,label:d})=>`<line class="reference" x1="${a.left}" x2="${a.right}" y1="${L(s(l))}" y2="${L(s(l))}"/><text class="reference" x="${a.right-2}" y="${L(s(l)-3)}" text-anchor="end">${d}</text>`).join(""),h=a.levels(t.spans??[]);return a.wrap(t.label,`${i}${c}${h}`)}const Da=.75,Oa=[{value:40,label:"EU limit, 40"},{value:10,label:"WHO guideline, 10"}];function Ra(e,t){const n=e.map(({year:a,mean:o,measured:s})=>{const r=s<Da,i=r?`, from only ${Math.round(s*100)}% of the year's hours`:"";return{year:a,value:o,partial:r,colour:St(o).background,chosen:a>=t.from&&a<=t.to,title:`${a}: ${o.toFixed(1)} µg/m³${i}`}});return ut(n,{label:"Mean NO2 of each year, µg/m³",top:Ne,references:Oa})}const Ut={all:"every day of the week",workdays:"Monday to Friday",weekends:"Saturdays and Sundays"};function Na(){const e=Array.from({length:Ne/5+1},(n,a)=>St(a*5).background),t=[0,20,40,60,Ne].map(n=>`<span>${n===Ne?`${n}+`:n}</span>`).join("");return`<div class="scale" aria-hidden="true"><div class="ramp" style="background:linear-gradient(to right,${e.join(",")})"></div><div class="ticks">${t}</div><div class="ticks words"><span>clean</span><span>EU limit</span><span>twice it</span></div></div>`}function Ln(e,t){const n=Object.keys(e.years).map(Number),a=Math.max(t.from,Math.min(...n)),o=Math.min(t.to,Math.max(...n)),s=a===o?String(a):`${a}–${o}`;return`<figure class="no2"><figcaption><strong>${e.name}</strong> · ${e.kind}, ${e.area} · mean NO2 in µg/m³ by hour of the day and month of the year · ${Ut[t.days]}, ${s}</figcaption>`+Pa(Ea(e,t))+Na()+`<h4>The mean of each year, ${Ut[t.days]}</h4>`+Ra(Ia(e,t.days),{from:a,to:o})+"</figure>"}function mt(e){const t=Object.keys(e.years).map(Number);return{from:Math.min(...t),to:Math.max(...t),days:"all"}}const Fa=[["all","every day"],["workdays","Monday to Friday"],["weekends","Saturday and Sunday"]];function La(e){const t=new Map,n=Mt(e,"/data/no2/index.json"),a=f("div");a.append(...e.querySelectorAll("figure"));let o=null,s={from:0,to:9999,days:"all"},r=!1;const i=(p,w=String(p))=>f("option",{value:p},w),c=f("select",{onchange:()=>{g(c.value)}},...ae.map(({code:p,name:w})=>i(p,w))),h=f("select",{onchange:()=>u({days:h.value})},...Fa.map(([p,w])=>i(p,w))),l=f("select",{onchange:()=>u({from:Number(l.value),to:Math.max(Number(l.value),s.to)})}),d=f("select",{onchange:()=>u({to:Number(d.value),from:Math.min(Number(d.value),s.from)})}),m=f("button",{type:"button",onclick:()=>o&&u(mt(o))},"every year");function y(){o&&(a.innerHTML=Ln(o,s),l.value=String(s.from),d.value=String(s.to),h.value=s.days)}function u(p){s={...s,...p},y()}async function g(p){const w=t.get(p)??fetch(`/data/no2/${p}.json`).then(T=>T.json());t.set(p,w);try{const T=await w;if(r||c.value!==p)return;o=T,s={...mt(T),days:s.days};const S=Object.keys(T.years);l.replaceChildren(...S.map(M=>i(M))),d.replaceChildren(...S.map(M=>i(M))),y()}catch{t.delete(p),a.replaceChildren(f("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}a.addEventListener("click",p=>{const w=p.target?.closest("[data-year]")?.getAttribute("data-year");w&&u({from:Number(w),to:Number(w)})});const v=f("div",{class:"row"},f("label",{},"Station ",c),f("label",{},"Days ",h),f("label",{},"Years ",l," to ",d),m);return e.replaceChildren(v,a,n),g(c.value),()=>{r=!0}}const Wa="https://analisi.transparenciacatalunya.cat/resource";function Wn(e,t){const n=new URL(`${Wa}/${e}.json`);for(const[a,o]of Object.entries(t))o!==void 0&&n.searchParams.set(`$${a}`,String(o));return n.toString()}const zt="tasf-thgu",Bn=Array.from({length:24},(e,t)=>String(t+1).padStart(2,"0")),Ba=0,Ha=6,xe=()=>Array.from({length:12},()=>new Array(24).fill(0)),Ga=()=>({workdays:{sums:xe(),counts:xe()},weekends:{sums:xe(),counts:xe()}});function Ja(e){if(!Array.isArray(e))throw new Error("the portal did not answer with rows");if(e.length===0)throw new Error("the portal answered with no rows");return e}function _a(e,t){const n=Number(t.month)-1;Bn.forEach((a,o)=>{const s=e.sums[n],r=e.counts[n];if(!s||!r)throw new Error(`month ${t.month} is not a month`);s[o]=(s[o]??0)+Number(t[`s${a}`]??0),r[o]=(r[o]??0)+Number(t[`n${a}`]??0)})}const Ya={name:"no2",directory:"public/data/no2",firstYear:1991,files:ae.map(e=>`${e.code}.json`),about:{measures:"NO2, hourly, µg/m³",network:"Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica",attribution:"Generalitat de Catalunya, Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica. Dades obertes.",dataset:`https://analisi.transparenciacatalunya.cat/d/${zt}`,stations:ae},requestsFor(e){const t=ae.map(a=>`'${a.code}'`).join(","),n=Bn.map(a=>`sum(h${a}) as s${a}, count(h${a}) as n${a}`).join(", ");return[Wn(zt,{select:`codi_eoi, date_extract_m(data) as month, date_extract_dow(data) as dow, count(*) as days, ${n}`,where:`contaminant='NO2' and codi_eoi in (${t}) and data between '${e}-01-01T00:00:00' and '${e}-12-31T23:59:59'`,group:"codi_eoi,month,dow",limit:5e3})]},withYear(e,t,n){const a=Ja(n[0]);if(a.some(s=>Number(s.days)>5))throw new Error("some days are in the portal twice");if(!a.some(s=>s.month==="12"))throw new Error("the year does not reach December yet");const o=new Map;for(const s of a){const r=s.codi_eoi??"",i=o.get(r)??Ga();o.set(r,i);const c=Number(s.dow);_a(c===Ba||c===Ha?i.weekends:i.workdays,s)}return Object.fromEntries(ae.map(s=>{const r=`${s.code}.json`,i=o.get(s.code),c={...e[r]?.years,...i?{[t]:i}:{}};return[r,{...s,years:c}]}))}},qa=e=>{const t=JSON.parse(e(`/data/no2/${ae[0]?.code}.json`)),n=JSON.parse(e("/data/no2/index.json"));return Ln(t,mt(t))+He(n)},Ua={name:"air-quality",apps:{no2:La},stills:{no2:qa},sources:[Ya]},se=5,Ge=8,le=e=>Math.max(0,Math.min(100,e));function Kt(e){const{focus:t,fatigue:n,featureSize:a,weeks:o,calendar:s,meetingTypes:r}=e,i=[];let c=0,h=0;for(let l=0;l<o;l+=1)for(let d=0;d<se;d+=1){let m=0,y=0;for(let u=0;u<Ge;u+=1){const g=r[s[`${d}-${u}`]??""];if(g){m=le(m+g.focus),y=le(y+g.fatigue),i.push({week:l,day:d,hour:u,inMeeting:!0,hourFocus:m,hourFatigue:y,hourProductivity:0,accumulatedProductivity:c,completedFeatures:h,featureCompleted:!1});continue}m=le(m+t),y=le(y+n);const v=le(m-y),p=a-c,w=v>p,T=w?p:v;w?(h+=1,c=0):c+=T,i.push({week:l,day:d,hour:u,inMeeting:!1,hourFocus:m,hourFatigue:y,hourProductivity:T,accumulatedProductivity:c,completedFeatures:h,featureCompleted:w}),w&&(m=0)}}return i}function Te(){return Array.from({length:Ge},()=>new Array(se).fill(0))}function Me(e,{hour:t,day:n},a){const o=e[t];o&&(o[n]=(o[n]??0)+a)}function Vt(e,{featureSize:t,weeks:n}){const a=e[e.length-1],o=a?.completedFeatures??0,s=a?.accumulatedProductivity??0,r=o+Math.round(10*s/t)/10,i=o*t+s,c=Array.from({length:se},()=>({productivity:0,features:0,meetings:0})),h={focus:Te(),fatigue:Te(),productivity:Te(),features:Te()};for(const d of e){const m=c[d.day];m.productivity+=d.hourProductivity,d.featureCompleted&&(m.features+=1),d.inMeeting&&(m.meetings+=1),Me(h.focus,d,d.hourFocus),Me(h.fatigue,d,d.hourFatigue),Me(h.productivity,d,d.hourProductivity),d.featureCompleted&&Me(h.features,d,1)}const l=d=>d.map(m=>m.map(y=>n>0?y/n:0));return{totalFeatures:r,totalProductivity:i,averageFeaturesPerWeek:n>0?r/n:0,averageProductivityPerWeek:n>0?i/n:0,days:c,hours:{focus:l(h.focus),fatigue:l(h.fatigue),productivity:l(h.productivity),features:h.features}}}const We=480,Z=240,W={top:10,right:10,bottom:34,left:36};function Hn(e,t,n,a){const o=We-W.left-W.right,s=Z-W.top-W.bottom,r=h=>W.top+s-(e>0?h/e*s:0),i=a.map(h=>`<line class="grid" x1="${W.left}" x2="${We-W.right}" y1="${r(h)}" y2="${r(h)}"/><text x="${W.left-4}" y="${r(h)+3}" text-anchor="end">${h}</text>`).join(""),c=(n>1?[1,Math.ceil(n/2),n]:[]).filter((h,l,d)=>d.indexOf(h)===l).map(h=>`<text x="${W.left+(h-1)/Math.max(1,n-1)*o}" y="${Z-W.bottom+14}" text-anchor="middle">${h}</text>`).join("");return`${i}${c}<text x="${W.left+o/2}" y="${Z-6}" text-anchor="middle">${t.x}</text><text transform="translate(9 ${W.top+s/2}) rotate(-90)" text-anchor="middle">${t.y}</text>`}function za(e,t){const n=Math.max(...e.map(l=>l.values.length),1),a=Math.max(1,...e.flatMap(l=>l.values)),o=We-W.left-W.right,s=Z-W.top-W.bottom,r=l=>W.left+l/Math.max(1,n-1)*o,i=l=>W.top+s-l/a*s,c=e.map(l=>{const d=l.values.map((m,y)=>`${r(y).toFixed(1)},${i(m).toFixed(1)}`).join(" ");return`<polyline class="line ${l.className}" points="${d}"><title>${l.name}</title></polyline>`}).join(""),h=e.map((l,d)=>`<rect class="${l.className}" x="${W.left+d*90}" y="${Z-W.bottom+20}" width="10" height="3"/><text x="${W.left+d*90+14}" y="${Z-W.bottom+24}">${l.name}</text>`).join("");return`<svg viewBox="0 0 ${We} ${Z}" role="img" aria-label="${t.y} by ${t.x}">${Hn(a,t,n,At(a))}${c}${h}</svg>`}const Xt=480,he=240,G={top:10,right:10,bottom:34,left:36};function Gn(e,t,n){const a=Math.max(...e.map(u=>u.values.length),1),o=Math.max(1,...e.flatMap(u=>u.values)),s=Xt-G.left-G.right,r=he-G.top-G.bottom,i=s/a,c=i*.7/e.length,h=u=>G.top+r-u/o*r,l=e.map((u,g)=>u.values.map((v,p)=>{const w=G.left+p*i+i*.15+g*c;return`<rect class="${u.className}" x="${w.toFixed(1)}" y="${h(v).toFixed(1)}" width="${c.toFixed(1)}" height="${(G.top+r-h(v)).toFixed(1)}"><title>${u.name}: ${Math.round(v*10)/10}</title></rect>`}).join("")).join(""),d=(n??[]).map((u,g)=>`<text x="${G.left+g*i+i/2}" y="${he-G.bottom+14}" text-anchor="middle">${u}</text>`).join(""),m=e.map((u,g)=>`<rect class="${u.className}" x="${G.left+g*90}" y="${he-G.bottom+20}" width="10" height="3"/><text x="${G.left+g*90+14}" y="${he-G.bottom+24}">${u.name}</text>`).join(""),y=Hn(o,t,n?0:a,At(o));return`<svg viewBox="0 0 ${Xt} ${he}" role="img" aria-label="${t.y} by ${t.x}">${y}${l}${d}${m}</svg>`}const pt=["Mon","Tue","Wed","Thu","Fri"],Jn=Array.from({length:Ge},(e,t)=>`${9+t}:00`);function Ka(e){return e<=500?e:e<=750?500+(e-500)*2:e<1e3?1e3+(e-750)*35:1e4}function Va(e){return e<=500?e:e<=1e3?500+(e-500)/2:e<1e4?750+(e-1e3)/35:1e3}function Se(e,t){const n=t.flat(),a=Math.min(...n),o=Math.max(...n),s=f("div",{class:"week"},f("span"),...pt.map(r=>f("span",{class:"head"},r)));return t.forEach((r,i)=>{s.append(f("span",{class:"hour"},Jn[i]??""));for(const c of r){const h=o>a?(c-a)/(o-a):0;s.append(f("span",{class:"cell",style:`--heat:${(.1+h*.9).toFixed(2)}`},String(Math.round(c))))}}),f("div",{},f("h4",{},e),s)}function Xa(e){const t={focus:25,fatigue:15,featureSize:300,weeks:8},n={"🍽️ Lunch":{focus:-100,fatigue:-100},"🏃 Sprint plan":{focus:-100,fatigue:50},"😴 Boring":{focus:-50,fatigue:-25}},a={};for(let A=0;A<se;A+=1)a[`${A}-3`]="🍽️ Lunch";let o="🏃 Sprint plan",s=null;const r=f("div",{class:"figures"}),i=f("div",{class:"chart"}),c=f("div",{class:"maps"}),h=f("div",{class:"week"}),l=f("select"),d=f("input",{type:"number",min:-100,max:100}),m=f("input",{type:"number",min:-100,max:100}),y=f("input",{type:"text",placeholder:"New meeting name",size:16}),u=(A,k,R,b,x=D=>D,j=D=>D)=>{const D=f("output",{},String(t[A])),E=f("input",{type:"range",min:R,max:b,value:j(t[A]),oninput:()=>{t[A]=x(Number(E.value)),D.textContent=String(t[A]),P()}});return f("label",{},`${k}: `,D,E)},g=f("div",{class:"dials"},u("focus","Focus an hour",0,100),u("fatigue","Fatigue an hour",0,100),u("featureSize","Feature size",0,1e3,Ka,Va),u("weeks","Weeks",1,16));function v(){l.replaceChildren(...Object.keys(n).map(k=>f("option",{value:k,selected:k===o},k)));const A=n[o];d.value=String(A?.focus??0),m.value=String(A?.fatigue??0)}l.addEventListener("change",()=>{o=l.value,v()});const p=()=>{n[o]={focus:Number(d.value)||0,fatigue:Number(m.value)||0},P()};d.addEventListener("change",p),m.addEventListener("change",p);const w=()=>{const A=y.value.trim();!A||n[A]||(n[A]={focus:0,fatigue:0},o=A,y.value="",v())},T=f("div",{class:"row"},f("span",{},"Paint: "),l,f("span",{},"focus "),d,f("span",{},"fatigue "),m,y,f("button",{type:"button",onclick:w},"Add"));let S=null;const M=A=>{if(S==="add"&&!a[A])a[A]=o;else if(S==="remove"&&a[A])delete a[A];else return;P()};function I(){h.replaceChildren(f("span"),...pt.map(A=>f("span",{class:"head"},A))),Jn.forEach((A,k)=>{h.append(f("span",{class:"hour"},A));for(let R=0;R<se;R+=1){const b=`${R}-${k}`,x=a[b];h.append(f("span",{class:x?"slot meeting":"slot",title:x??"free",onpointerdown:j=>{j.preventDefault(),S=a[b]?"remove":"add",M(b)},onpointerenter:()=>{S&&M(b)}},x?x.slice(0,2):""))}})}window.addEventListener("pointerup",()=>{S=null});const $=f("div",{class:"row"}),C=()=>{s={summary:Vt(Kt({...t,calendar:a,meetingTypes:n}),t),weeks:t.weeks},P()},F=()=>{s=null,P()};function P(){I();const A=Kt({...t,calendar:a,meetingTypes:n}),k=Vt(A,t),R=t.weeks*se*Ge;r.replaceChildren(f("div",{class:"clean"},f("strong",{},k.totalFeatures.toFixed(1)),"features finished"),f("div",{},f("strong",{},k.averageFeaturesPerWeek.toFixed(2)),"features a week"),f("div",{},f("strong",{},Math.round(k.totalProductivity/R).toString()),"productivity an hour"),f("div",{},f("strong",{},String(R)),"hours simulated")),$.replaceChildren(s?f("span",{},`Baseline: ${s.summary.averageFeaturesPerWeek.toFixed(2)} features a week over ${s.weeks} weeks; now ${k.averageFeaturesPerWeek.toFixed(2)}. `):f("span",{},"Keep this run to compare against: "),f("button",{type:"button",onclick:C},s?"Save again":"Save as baseline")),s&&$.append(f("button",{type:"button",onclick:F},"Clear")),i.innerHTML=Gn([{name:"Productivity",className:"clean",values:k.days.map(b=>b.productivity/t.weeks)},{name:"Features ×100",className:"debt",values:k.days.map(b=>b.features/t.weeks*100)}],{x:"",y:"A day, on average"},pt),i.prepend(f("h4",{},"The shape of a week")),c.replaceChildren(Se("Focus",k.hours.focus),Se("Fatigue",k.hours.fatigue),Se("Productivity",k.hours.productivity),Se("Features finished",k.hours.features))}v(),e.append(g,T,f("div",{class:"charts"},h,i),r,$,c),P()}const Za={name:"developer-meetings",apps:{"developer-meetings":Xa}};function Qa(e,t){const n=[];for(let a=e.length-1;a>=0;a-=1)n.push(e.slice(0,a));for(let a=1;a<=t.length;a+=1)n.push(t.slice(0,a));return n}const eo=3800,to=6500,no=26,ao=46,oo=420;function so(e){return[...e.childNodes].map(t=>t.nodeName==="BR"?`
`:t.textContent??"").join("")}function ro(e){const t=document.querySelector("main h1");if(!t||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return()=>{};const n={text:so(t)};t.setAttribute("aria-label",n.text),t.classList.add("typing");const a=document.createElement("span");a.className="caret idle",a.setAttribute("aria-hidden","true");const o=(l,d)=>{const m=l.split(`
`).flatMap((y,u)=>u===0?[y]:[document.createElement("br"),y]);if(d){const y=document.createElement("a");y.href=d,y.append(...m,a),t.replaceChildren(y)}else t.replaceChildren(...m,a)};o(n.text);let s=n,r=[],i=performance.now()+eo,c=0;const h=l=>{if(c=requestAnimationFrame(h),l<i)return;if(r.length===0){const m=e(s,n);r=Qa(s.text,m.text),s=m,a.classList.remove("idle")}const d=r.shift()??s.text;o(d,r.length===0?s.href:void 0),r.length===0?(a.classList.add("idle"),i=l+to):d===""?i=l+oo:i=l+(d.length<(r[0]?.length??0)?ao:no)};return c=requestAnimationFrame(h),()=>{cancelAnimationFrame(c),o(n.text),a.remove(),t.classList.remove("typing"),t.removeAttribute("aria-label")}}function io(e,t){const n=[...e];for(let a=n.length-1;a>0;a-=1){const o=Math.min(a,Math.floor(t()*(a+1)));[n[a],n[o]]=[n[o],n[a]]}return n}function co(e,t){let n=[];return a=>(n.length===0&&(n=io(e,t),n.length>1&&n[0]===a&&n.push(n.shift())),n.shift()??a)}const lo=[{text:`More than
half a million views
on Medium.`,href:"/essays/"},{text:`One essay
every Saturday
since 2022.`,href:"/essays/"},{text:`I made
the AngularJS compiler
faster.`,href:"/open-source/angularjs/"},{text:`Two public APIs
of AngularJS
are mine.`,href:"/open-source/angularjs/"},{text:`I wrote a book
on technical debt
and its emotional cost.`,href:"/book/"},{text:`Never rewrite,
never stop delivery:
the book's one rule.`,href:"/book/"},{text:`The world above
was grown
as this page opened.`,href:"/worlds/"}];let Ve=null;const ho={name:"headline",arrive:e=>{if(Ve?.(),Ve=null,e.route!=="/")return;let t=null;Ve=ro((n,a)=>(t??=co([a,...lo],Math.random),t(n)))}};function uo(e,t){let n=Array.from({length:t.length+1},(a,o)=>o);for(let a=1;a<=e.length;a+=1){const o=[a];for(let s=1;s<=t.length;s+=1){const r=(n[s-1]??0)+(e[a-1]===t[s-1]?0:1);o[s]=Math.min(r,(n[s]??0)+1,(o[s-1]??0)+1)}n=o}return n[t.length]??0}function mo(e,t){if(t.includes(e))return e;let n=null,a=1/0;for(const o of t){const s=uo(e,o);s<a&&([n,a]=[o,s])}return n}const po=/[\p{L}\p{M}\p{N}']+|[.,!?;:]/gu,fo=/\]\([^)]*\)|^---[\s\S]*?\n---|[#*_`>\[\]|]|::[a-z-]+/gm;function Be(e){return e.normalize("NFKC").replace(fo," ").toLowerCase().match(po)??[]}const Ae=" ";class ft{constructor(t,n){this.memory=n;const a=Be(t),o=new Map;for(const s of a)o.set(s,(o.get(s)??0)+1);this.vocabulary=[...o.keys()],this.commonest=[...o].reduce((s,r)=>s&&s[1]>=r[1]?s:r,null)?.[0]??null;for(let s=1;s<a.length;s+=1)for(let r=1;r<=n&&r<=s;r+=1){const i=a.slice(s-r,s).join(Ae),c=this.followers.get(i)??new Map;c.set(a[s]??"",(c.get(a[s]??"")??0)+1),this.followers.set(i,c)}}memory;vocabulary;commonest;followers=new Map;after(t){for(let n=Math.min(this.memory,t.length);n>=1;n-=1){const a=t.slice(-n),o=this.followers.get(a.join(Ae));if(o)return{context:a,candidates:Zt(o)}}return{context:[],candidates:[]}}transitions(){return[...this.followers].filter(([t])=>t.split(Ae).length===this.memory).flatMap(([t,n])=>Zt(n).map(a=>({context:t.split(Ae),...a}))).sort((t,n)=>n.probability-t.probability||n.count-t.count)}}function Zt(e){const t=[...e.values()].reduce((n,a)=>n+a,0);return[...e].map(([n,a])=>({word:n,count:a,probability:a/t})).sort((n,a)=>a.count-n.count)}function go(e,t){let n=t();for(const a of e)if(n-=a.probability,n<=0)return a.word;return e[e.length-1]?.word??null}function Qt(e){return e.reduce((t,n)=>t===""||/^[.,!?;:]$/.test(n)?t+n:`${t} ${n}`,"")}function _n(e,t){if(t<=0)return e.map((o,s)=>({...o,probability:s===0?1:0}));const n=e.map(o=>o.probability**(1/t)),a=n.reduce((o,s)=>o+s,0);return e.map((o,s)=>({...o,probability:(n[s]??0)/a}))}const Xe=40,en=8,Ze=e=>`${Math.round(e*100)}%`;function Yn(e,t,n){const{context:a,candidates:o}=e.after(t),s=o.slice(0,en),r=_n(o,n).slice(0,en),i=o.reduce((g,{count:v})=>g+v,0),c=t.slice(0,t.length-a.length),h=`<p class="written">${O(Qt(c))}${c.length&&a.length?" ":""}${a.length?`<mark>${O(Qt(a))}</mark>`:""}<span class="caret"></span></p>`,l=s.length?`<ol class="offered">${s.map(({word:g,count:v,probability:p},w)=>{const T=r[w]?.probability??0;return`<li><button type="button" data-word="${O(g)}" title="seen ${v} of ${i} times: ${Ze(p)} as learnt"><span class="word">${O(g)}</span><span class="chance" style="--p:${T.toFixed(3)}"></span><span class="figure">${Ze(T)}</span></button></li>`}).join("")}</ol>`:`<p class="offered">It never saw anything follow “${O(t[t.length-1]??"")}”. This is where it stops.</p>`,d=g=>a.length===e.memory&&g.context.join(" ")===a.join(" "),m=e.transitions(),y=[...m.filter(d),...m.filter(g=>!d(g))].slice(0,Xe).map(g=>`<tr${d(g)?' class="now"':""}><td>${O(g.context.join(" "))}</td><td>${O(g.word)}</td><td>${g.count}</td><td>${Ze(g.probability)}</td></tr>`).join(""),u=`<table class="learnt"><caption>What it learnt: ${m.length} transitions between ${e.vocabulary.length} words${m.length>Xe?`, the first ${Xe} shown`:""}</caption><thead><tr><th>after</th><th>comes</th><th>seen</th><th>chance</th></tr></thead><tbody>${y}</tbody></table>`;return`<div class="next-word">${h}<h4>What may come next</h4>${l}${u}</div>`}const Fe="The cat is happy. The dog is glad. The cat sleeps. The dog plays. The cat eats. The dog runs. The car is fast. The car goes far.",yo=350;function wo(e,{site:t}){const n={small:()=>Fe,site:()=>t.pages.map($=>$.body).join(`

`),own:()=>l.value};let a=new ft(Fe,1),o=Be("the"),s=null;const r=f("div"),i=($,C)=>f("option",{value:$},C),c=f("select",{onchange:()=>p()},i("small","eight short sentences"),i("site","this website"),i("own","your own text")),h=f("select",{onchange:()=>p()},i(1,"one word back"),i(2,"two words back"),i(3,"three words back")),l=f("textarea",{rows:5,hidden:!0,placeholder:"Paste any text here. The longer, the better it pretends.",oninput:()=>p()}),d=f("output",{},"1"),m=f("input",{type:"range",min:0,max:2,step:.1,value:1,oninput:()=>g()}),y=f("input",{type:"text",value:"the",onchange:()=>v()}),u=f("button",{type:"button",onclick:()=>s?S():T()},"write");function g(){d.textContent=m.value,r.innerHTML=Yn(a,o,Number(m.value))}function v(){S();const $=Be(y.value).flatMap(C=>mo(C,a.vocabulary)??[]);o=$.length?$:a.commonest?[a.commonest]:[],g()}function p(){l.hidden=c.value!=="own",a=new ft(n[c.value]?.()??Fe,Number(h.value)),v()}function w(){const $=go(_n(a.after(o).candidates,Number(m.value)),Math.random);return $===null?!1:(o=[...o,$],g(),!0)}function T(){u.textContent="stop",s=setInterval(()=>{w()||S()},yo)}function S(){s&&clearInterval(s),s=null,u.textContent="write"}r.addEventListener("click",$=>{const C=$.target?.closest("[data-word]")?.getAttribute("data-word");C&&(o=[...o,C],g())});const M=f("div",{class:"dials"},f("label",{},"It has read",c),f("label",{},"It looks",h),f("label",{},"Temperature: ",d,m),f("label",{},"Start from",y)),I=f("div",{class:"row"},f("button",{type:"button",onclick:()=>{w()}},"next word"),u,f("button",{type:"button",onclick:()=>v()},"start over"));return e.replaceChildren(M,l,I,r),g(),S}const bo=()=>Yn(new ft(Fe,1),Be("the"),1),vo={name:"next-word",apps:{"next-word":wo},stills:{"next-word":bo}},Qe={"string-cache-map":"a WeakMap replacement for string keys, with a bounded cache behind it","async-barrier":"a helper that makes async/await tests say what they wait for","spy-middleware":"a Redux middleware for spying on actions in tests","grunt-frontmatter":"a Grunt task: many files with YAML front matter into one JSON","object-canonical-keys":"always the same array of keys for the same keys, so comparisons stay cheap","async-deferrer":"one function that returns a promise, or resolves it"},tn=160,et=28,Le=e=>e.toLocaleString("en-US");function tt(e,t){const n=Math.max(1,...e.map(t)),a=tn/e.length,o=e.map((s,r)=>{const i=t(s)/n*(et-2);return`<rect x="${(r*a+1).toFixed(1)}" y="${(et-i).toFixed(1)}" width="${(a-2).toFixed(1)}" height="${i.toFixed(1)}"><title>${s}: ${Le(t(s))}</title></rect>`}).join("");return`<svg class="spark" viewBox="0 0 ${tn} ${et}" role="img" aria-label="Downloads a year, ${e[0]} to ${e[e.length-1]}">${o}</svg>`}function qn(e){const t=Object.keys(e.years).sort(),n=l=>d=>e.years[d]?.[l]??0,a=l=>t.reduce((d,m)=>d+l(m),0),o=Object.keys(Qe).sort((l,d)=>a(n(d))-a(n(l))),s=[...new Set(t.flatMap(l=>Object.keys(e.years[l]??{})))].filter(l=>!(l in Qe)),r=l=>s.reduce((d,m)=>d+n(m)(l),0),i=l=>Object.values(e.years[l]??{}).reduce((d,m)=>d+m,0),c=o.filter(l=>a(n(l))>0).map(l=>`<tr><th scope="row"><a href="https://www.npmjs.com/package/${l}"><code>${l}</code></a><span>${Qe[l]}</span></th><td>${tt(t,n(l))}</td><td>${Le(a(n(l)))}</td></tr>`).join(""),h=s.length?`<tr><th scope="row">the other ${s.length}<span>mostly AngularJS and Redux helpers written for one project each</span></th><td>${tt(t,r)}</td><td>${Le(a(r))}</td></tr>`:"";return`<figure class="packages"><table class="packages"><thead><tr><th>package</th><th>${t[0]} to ${t[t.length-1]}, a bar a year</th><th>downloads</th></tr></thead><tbody>${c}${h}</tbody><tfoot><tr><th scope="row">all of them</th><td>${tt(t,i)}</td><td>${Le(a(i))}</td></tr></tfoot></table></figure>`}function ko(e){if(e.querySelector("figure"))return;const t=Mt(e,"/data/npm/index.json");fetch("/data/npm/downloads.json").then(n=>n.json()).then(n=>{e.innerHTML=qn(n),e.append(t)}).catch(()=>{e.textContent="The download counts did not arrive. The rest of the page does not depend on them."})}const nt=["string-cache-map","async-barrier","spy-middleware","grunt-frontmatter","object-canonical-keys","gherkin-genie","async-deferrer","egg-hatchery","angular-tags","class-strict","micro-egg-hatchery","node-dio","ducks-middleware","drpx-updateable","generator-drpx","grunt-ngtags","teal-redux-egg","ducks-reducer","drpx-storage-mocks","strict-classes","ngtags","redux-egg","esmoquin","drpx-storage","dio-provider","drpx-components","grunt-angular-tags","drpx-bind-angular","drpx-toggle","drpx-id","drpx-seo","drpx-otherwisehome","drpx-class-route","drpx-transcludeto"],at="downloads.json",$o={name:"npm",directory:"public/data/npm",firstYear:2015,files:[at],about:{measures:"downloads a year of the npm packages published as drpicox",attribution:"npm, Inc. Download counts of the public registry.",dataset:"https://github.com/npm/registry/blob/main/docs/download-counts.md",packages:nt},requestsFor(e){return[`https://api.npmjs.org/downloads/point/${e}-01-01:${e}-12-31/${nt.join(",")}`]},withYear(e,t,n){const a=n[0],o=Object.entries(typeof a=="object"&&a!==null?a:{}).flatMap(([s,r])=>{const i=r?.downloads;return nt.includes(s)&&typeof i=="number"&&i>0?[[s,i]]:[]});if(o.length===0)throw new Error("the registry did not answer with downloads");return{[at]:{years:{...e[at]?.years,[t]:Object.fromEntries(o)}}}}},xo=e=>qn(JSON.parse(e("/data/npm/downloads.json")))+He(JSON.parse(e("/data/npm/index.json"))),To={name:"packages",apps:{packages:ko},stills:{packages:xo},sources:[$o]},we={dryMass:25e3,fuel:5e3,exhaust:.72,acceleration:.3},Ie=149597870700,de=94607e11,gt=[{name:"the Moon",metres:3844e5,said:"384,400 km"},{name:"Mars",metres:.52*Ie,said:"0.52 au"},{name:"Jupiter",metres:4.2*Ie,said:"4.2 au"},{name:"Saturn",metres:8.5*Ie,said:"8.5 au"},{name:"Pluto",metres:38.5*Ie,said:"38.5 au"},{name:"Proxima Centauri",metres:4.24*de,said:"4.24 light-years"},{name:"Sirius",metres:8.58*de,said:"8.58 light-years"},{name:"Epsilon Eridani",metres:10.52*de,said:"10.52 light-years"},{name:"the centre of the galaxy",metres:26e3*de,said:"26,000 light-years",towards:{ra:17.76,dec:-29}},{name:"Andromeda",metres:25e5*de,said:"2.5 million light-years",towards:{ra:.712,dec:41.27}}],Mo=[[365.25*86400*1e6,"million years"],[365.25*86400,"years"],[86400,"days"],[3600,"hours"],[60,"minutes"],[1,"seconds"]];function re(e){const[t,n]=Mo.find(([s])=>e>=s)??[1,"seconds"],a=e/t;return`${a>=10?Math.round(a).toLocaleString("en-US"):String(Math.round(a*10)/10)} ${n}`}const q=299792458,So=9.81;function Un(e,t){const n=t.acceleration*So,a=t.dryMass+t.fuel,o=t.exhaust*q,s=q/n*Math.acosh(1+n*e/(2*q*q)),r=a*(1-Math.exp(-2*n*s/o)),i=r>t.fuel,c=i?o/n*Math.log(a/(a-t.fuel/2)):s,h=Math.tanh(n*c/q),l=q/n*Math.sinh(n*c/q),d=q*q/n*(Math.cosh(n*c/q)-1),m=Math.max(0,e-2*d),y=i?m/(h*q):0,u=y*Math.sqrt(1-h*h);return{shipTime:2*c+u,homeTime:2*l+y,burnTime:c,coastTime:u,topSpeed:h,fuelBurnt:i?t.fuel:r,coasts:i}}const zn=299792458,Ao=9.81,ue=720,Ee=170,J={top:12,right:10,bottom:24,left:40};function Kn(e){if(e<.01)return`${Math.round(e*zn/1e3).toLocaleString("en-US")} km/s`;if(e<.99)return`${(e*100).toPrecision(2)}% of c`;const t=Math.min(12,Math.ceil(-Math.log10(1-e)));return`${(Math.floor(e*10**t)/10**(t-2)).toFixed(t-2)}% of c`}const Io=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:3});function nn(e){return e>=1e6?`${Io.format(e)} t`:`${e>=100?Math.round(e).toLocaleString("en-US"):e.toPrecision(2)} t`}function Eo(e,t){const n=ue-J.left-J.right,a=Ee-J.top-J.bottom,o=m=>J.left+m/e.shipTime*n,s=m=>J.top+a-m/Math.max(e.topSpeed,1e-12)*a,r=t.acceleration*Ao,i=24,c=Array.from({length:i+1},(m,y)=>e.burnTime*y/i).map(m=>[m,Math.tanh(r*m/zn)]),l=[...c.map(([m,y])=>[m,y]),...c.reverse().map(([m,y])=>[e.shipTime-m,y])].map(([m,y])=>`${o(m).toFixed(1)},${s(y).toFixed(1)}`).join(" "),d=e.coasts?`<text x="${((o(e.burnTime)+o(e.shipTime-e.burnTime))/2).toFixed(1)}" y="${(s(e.topSpeed)+14).toFixed(1)}" text-anchor="middle">engine off, ${re(e.coastTime)}</text>`:"";return`<svg class="trip" viewBox="0 0 ${ue} ${Ee}" role="img" aria-label="Speed against the ship's clock"><line class="grid" x1="${J.left}" x2="${ue-J.right}" y1="${s(0)}" y2="${s(0)}"/><line class="grid" x1="${J.left}" x2="${ue-J.right}" y1="${s(e.topSpeed)}" y2="${s(e.topSpeed)}"/><text x="${J.left}" y="${s(e.topSpeed)-3}">${Kn(e.topSpeed)}</text><polyline class="line" points="${l}"/>${d}<text x="${J.left}" y="${Ee-6}">departure</text><text x="${ue-J.right}" y="${Ee-6}" text-anchor="end">arrival, ${re(e.shipTime)} on board</text></svg>`}function Vn(e,t){const n=gt.map(s=>({destination:s,trip:Un(s.metres,e)})),a=n.map(({destination:s,trip:r})=>{const i=[s.name===t?"chosen":"",r.coasts?"coasts":""].filter(Boolean).join(" "),c=r.coasts?`all ${nn(e.fuel)}, then coasts`:nn(r.fuelBurnt);return`<tr${i?` class="${i}"`:""} data-destination="${s.name}"><th scope="row">${s.name}</th><td>${s.said}</td><td>${re(r.shipTime)}</td><td>${re(r.homeTime)}</td><td>${Kn(r.topSpeed)}</td><td>${c}</td></tr>`}).join(""),o=n.find(({destination:s})=>s.name===t)??n[0];return`<figure class="rocket"><table class="voyages"><thead><tr><th>to</th><th>distance</th><th>on board</th><th>at home</th><th>top speed</th><th>fuel burnt</th></tr></thead><tbody>${a}</tbody></table>`+(o?`<h4>To ${o.destination.name}: speed against the ship's clock</h4>${Eo(o.trip,e)}`:"")+"</figure>"}const Ce=[{name:"Proxima Centauri",ra:14.495,dec:-62.68,lightYears:4.24},{name:"Alpha Centauri",ra:14.66,dec:-60.83,lightYears:4.37},{name:"Barnard's Star",ra:17.963,dec:4.69,lightYears:5.96},{name:"Wolf 359",ra:10.941,dec:7.01,lightYears:7.86},{name:"Lalande 21185",ra:11.056,dec:35.97,lightYears:8.31},{name:"Sirius",ra:6.752,dec:-16.72,lightYears:8.58},{name:"Luyten 726-8",ra:1.65,dec:-17.95,lightYears:8.73},{name:"Ross 154",ra:18.83,dec:-23.84,lightYears:9.69},{name:"Ross 248",ra:23.699,dec:44.18,lightYears:10.3},{name:"Epsilon Eridani",ra:3.549,dec:-9.46,lightYears:10.52},{name:"Lacaille 9352",ra:23.098,dec:-35.85,lightYears:10.72},{name:"Ross 128",ra:11.796,dec:.8,lightYears:11.01},{name:"EZ Aquarii",ra:22.643,dec:-15.3,lightYears:11.1},{name:"61 Cygni",ra:21.115,dec:38.75,lightYears:11.4},{name:"Procyon",ra:7.655,dec:5.22,lightYears:11.46},{name:"Struve 2398",ra:18.713,dec:59.63,lightYears:11.5},{name:"Groombridge 34",ra:.306,dec:44.02,lightYears:11.6},{name:"Epsilon Indi",ra:22.056,dec:-56.78,lightYears:11.87},{name:"Tau Ceti",ra:1.734,dec:-15.94,lightYears:11.91}];function je(e,t){const n=t.radius/t.reach;return e.map(({name:a,ra:o,dec:s,lightYears:r})=>{const i=o/24*2*Math.PI,c=s/180*Math.PI,h=r*Math.cos(c)*Math.cos(i),l=r*Math.cos(c)*Math.sin(i),d=r*Math.sin(c),m=l*Math.cos(t.yaw)-h*Math.sin(t.yaw),y=h*Math.cos(t.yaw)+l*Math.sin(t.yaw),u=d*Math.cos(t.pitch)-y*Math.sin(t.pitch),g=y*Math.cos(t.pitch)+d*Math.sin(t.pitch);return{name:a,x:m*n,y:-u*n,depth:g}})}const V=299792458,Co=9.81;function jo(e,t,n){const a=t.acceleration*Co,o=d=>({distance:V*V/a*(Math.cosh(a*d/V)-1),homeTime:V/a*Math.sinh(a*d/V),speed:Math.tanh(a*d/V)}),s=o(e.burnTime),r=e.homeTime-2*s.homeTime,i=r*e.topSpeed*V,c=2*s.distance+i,h=Math.max(0,Math.min(n,e.shipTime));if(h<=e.burnTime){const d=o(h);return{along:d.distance/c,homeTime:d.homeTime,speed:d.speed}}if(h<=e.burnTime+e.coastTime){const d=(h-e.burnTime)/e.coastTime;return{along:(s.distance+d*i)/c,homeTime:s.homeTime+d*r,speed:e.topSpeed}}const l=o(e.shipTime-h);return{along:1-l.distance/c,homeTime:e.homeTime-l.homeTime,speed:l.speed}}const Pe=12.5,an=9,on=1.5,Po=new Set(["Alpha Centauri"]),H={ground:"#06080f",ring:"rgba(127,166,234,0.22)",stem:"rgba(127,166,234,0.18)",star:"#dfe7f5",dim:"#7d8aa3",sun:"#ffd98a",way:"#ff9d6e",ship:"#ffffff"};function Do(e,t,n){const a=e.getContext("2d");if(!a)return()=>{};const o=a,s=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=new Set(gt.map(({name:w})=>w));let i={yaw:.6,pitch:.45,radius:1,reach:Pe},c=0,h=performance.now(),l=null,d=[];const m=()=>({x:e.clientWidth/2,y:e.clientHeight/2});function y(w){const T=e.clientWidth,S=e.clientHeight,M=window.devicePixelRatio||1;e.width!==Math.round(T*M)&&(e.width=Math.round(T*M),e.height=Math.round(S*M)),o.setTransform(M,0,0,M,0,0),o.fillStyle=H.ground,o.fillRect(0,0,T,S),!s&&!l&&(i={...i,yaw:i.yaw+.0015}),i={...i,radius:Math.min(T,S)*.47};const I=m(),$=x=>({x:I.x+x.x,y:I.y+x.y});o.font="11px ui-monospace, Menlo, monospace";for(const x of[5,10]){const j=je(Array.from({length:73},(E,N)=>({name:"",ra:N/72*24,dec:0,lightYears:x})),i);o.beginPath(),j.forEach((E,N)=>N?o.lineTo($(E).x,$(E).y):o.moveTo($(E).x,$(E).y)),o.strokeStyle=H.ring,o.stroke();const D=$(j[0]??{x:0,y:0});o.fillStyle=H.dim,o.fillText(`${x} ly`,D.x+4,D.y-3)}const{ship:C,chosen:F}=t(),P=gt.find(({name:x})=>x===F),A=Ce.find(({name:x})=>x===F),k=P?Un(P.metres,C):null;d=je(Ce,i);const R=je(Ce.map(x=>({...x,lightYears:x.lightYears*Math.cos(x.dec/180*Math.PI),dec:0})),i),b=d.map((x,j)=>j).sort((x,j)=>(d[x]?.depth??0)-(d[j]?.depth??0));for(const x of b){const j=$(d[x]??{x:0,y:0}),D=$(R[x]??{x:0,y:0}),E=d[x]?.name??"",N=((d[x]?.depth??0)+Pe)/(2*Pe);o.strokeStyle=H.stem,o.beginPath(),o.moveTo(j.x,j.y),o.lineTo(D.x,D.y),o.stroke(),o.fillStyle=E===F?H.way:H.star,o.globalAlpha=.45+.55*N,o.beginPath(),o.arc(j.x,j.y,1.6+1.8*N,0,2*Math.PI),o.fill(),r.has(E)&&(o.strokeStyle=E===F?H.way:H.dim,o.beginPath(),o.arc(j.x,j.y,7,0,2*Math.PI),o.stroke()),o.fillStyle=E===F?H.way:H.dim,Po.has(E)||o.fillText(E,j.x+10,j.y+4),o.globalAlpha=1}if(o.fillStyle=H.sun,o.beginPath(),o.arc(I.x,I.y,4,0,2*Math.PI),o.fill(),o.fillText("the Sun",I.x+8,I.y-6),k&&P){const x=P.towards?je([{name:"",...P.towards,lightYears:Pe*1.15}],i)[0]:null,j=A?d[Ce.indexOf(A)]:x,D=(w-h)/1e3%(an+2*on),E=s?.5:Math.min(1,Math.max(0,(D-on)/an)),N=jo(k,C,E*k.shipTime);if(j){const z=$(j);o.strokeStyle=H.way,o.setLineDash(A?[]:[4,4]),o.beginPath(),o.moveTo(I.x,I.y),o.lineTo(z.x,z.y),o.stroke(),o.setLineDash([]);const ce={x:I.x+(z.x-I.x)*N.along,y:I.y+(z.y-I.y)*N.along};o.fillStyle=H.ship,o.beginPath(),o.arc(ce.x,ce.y,3,0,2*Math.PI),o.fill(),A||o.fillText(`to ${P.name}, ${P.said}: not to scale`,12,S-34)}else o.fillStyle=H.dim,o.fillText(`${P.name} is inside the dot: the planets are a thousandth of a light-year away`,12,S-34);o.fillStyle=H.star,o.font="13px ui-monospace, Menlo, monospace",o.fillText(`on board ${re(E*k.shipTime)}`,12,22),o.fillText(`at home  ${re(N.homeTime)}`,12,40),o.fillStyle=H.dim,o.fillText(`${(N.speed*100).toFixed(N.speed>.99?4:1)}% of c`,12,58),o.fillText("drag to turn",T-96,S-14)}c=s&&!l?0:requestAnimationFrame(y)}const u=w=>{const T=e.getBoundingClientRect();return{x:w.clientX-T.left,y:w.clientY-T.top}},g=w=>{l=u(w),e.setPointerCapture(w.pointerId),c||(c=requestAnimationFrame(y))},v=w=>{if(!l)return;const T=u(w);i={...i,yaw:i.yaw+(T.x-l.x)*.01,pitch:Math.max(-1.4,Math.min(1.4,i.pitch+(T.y-l.y)*.01))},l=T},p=w=>{const T=u(w),S=m(),M=d.find(I=>r.has(I.name)&&Math.hypot(S.x+I.x-T.x,S.y+I.y-T.y)<12);l=null,M&&(h=performance.now(),n(M.name))};return e.addEventListener("pointerdown",g),e.addEventListener("pointermove",v),e.addEventListener("pointerup",p),c=requestAnimationFrame(y),()=>{cancelAnimationFrame(c),e.removeEventListener("pointerdown",g),e.removeEventListener("pointermove",v),e.removeEventListener("pointerup",p)}}const De=e=>e,Oo=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:2}),Ro=[{key:"acceleration",label:"Acceleration",min:.05,max:3,step:.05,toSlider:De,fromSlider:De,show:e=>`${e.toFixed(2)} g`},{key:"fuel",label:"Fuel",min:-1,max:13,step:.05,toSlider:e=>Math.log10(e/we.dryMass),fromSlider:e=>we.dryMass*10**e,show:e=>`${Oo.format(e/we.dryMass)} × the ship`},{key:"exhaust",label:"Exhaust speed",min:.01,max:1,step:.01,toSlider:De,fromSlider:De,show:e=>`${Math.round(e*100)}% of c`}];function No(e){let t=we,n="Proxima Centauri";const a=f("div"),o=()=>{a.innerHTML=Vn(t,n)},s=f("div",{class:"dials"},...Ro.map(i=>{const c=f("output",{},i.show(t[i.key])),h=f("input",{type:"range",min:i.min,max:i.max,step:i.step,value:i.toSlider(t[i.key]),oninput:()=>{t={...t,[i.key]:i.fromSlider(Number(h.value))},c.textContent=i.show(t[i.key]),o()}});return f("label",{},`${i.label}: `,c,h)}));a.addEventListener("click",i=>{const c=i.target?.closest("[data-destination]")?.getAttribute("data-destination");c&&(n=c,o())});const r=f("canvas",{class:"starmap","aria-label":"The stars within twelve light-years of the Sun, turning, with the ship flying the chosen trip"});return e.replaceChildren(r,s,a),o(),Do(r,()=>({ship:t,chosen:n}),i=>{n=i,o()})}const Fo=()=>Vn(we,"Proxima Centauri"),Lo={name:"rocket",apps:{rocket:No},stills:{rocket:Fo}};class Wo{listeners=new Set;send(t){for(const n of[...this.listeners])n(t)}on(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}}const yt=new Wo,Bo=900,Ho=480,Oe={x:1600,y:1e3};function Re(e,t){return(e%t+t)%t}class Go{x=0;y=0;written="";driving=!1;follow({byRadians:t,tiltedBy:n,seconds:a}){const o=document.documentElement;if(o.dataset.sky!=="stars")return;this.driving||this.takeOver(o);const s=Bo/(Math.PI*2),r=(a/Ho*Math.PI*2+t)*s;this.x=Re(this.x+r,Oe.x),this.y=Re(this.y-n*s,Oe.y);const i=`${(Math.round(this.x*2)/2).toFixed(1)}px ${(Math.round(this.y*2)/2).toFixed(1)}px`;if(i===this.written)return;this.written=i;const[c,h]=i.split(" ");o.style.setProperty("--sky-x",c??"0px"),o.style.setProperty("--sky-y",h??"0px")}release(){const t=document.documentElement;t.classList.remove("sky-driven"),t.style.removeProperty("--sky-x"),t.style.removeProperty("--sky-y"),this.x=0,this.y=0,this.written="",this.driving=!1}takeOver(t){const n=getComputedStyle(document.body,"::before").transform;if(n&&n!=="none")try{const a=new DOMMatrixReadOnly(n);this.x=Re(a.m41,Oe.x),this.y=Re(a.m42,Oe.y)}catch{}t.classList.add("sky-driven"),this.driving=!0}}function Jo(e){return yt.on(t=>e.follow(t))}const sn=new Go,_o={name:"sky",install:()=>Jo(sn),arrive:()=>sn.release()},ot=20;function Yo(e){const{baseTime:t,shortcutFactor:n,interestRate:a,timeHorizon:o}=e,s=[];let r=null;const i=t;let c=t*(1-n),h=0,l=0,d=0,m=0,y=0,u=0;for(let g=0;g<o*ot;){for(;y<=g;)h+=1,d+=1,y+=i;for(;u<=g;)l+=1,m+=1,u+=c,c*=1+a;if(g+=1,g%ot===0){const v=g/ot;s.push({month:v,cleanCumulative:h,debtCumulative:l,cleanMonthly:d,debtMonthly:m,debtFeatureCost:c}),d=0,m=0,r===null&&h>l&&(r=v)}}return{months:s,breakEvenMonth:r}}const qo=[{key:"baseTime",label:"Base time",min:1,max:30,step:1,show:e=>`${e} days`},{key:"shortcutFactor",label:"Shortcuts",min:0,max:.9,step:.05,show:e=>`${Math.round(e*100)}%`},{key:"interestRate",label:"Interest",min:0,max:1,step:.01,show:e=>`${Math.round(e*100)}%`},{key:"timeHorizon",label:"Timeline",min:6,max:60,step:1,show:e=>`${e} months`}];function Uo(e){const t={baseTime:20,shortcutFactor:.25,interestRate:.1,timeHorizon:24},n=f("div",{class:"figures"}),a=f("div",{class:"chart"}),o=f("div",{class:"chart"}),s=f("p"),r=f("div",{class:"dials"},...qo.map(c=>{const h=f("output",{},c.show(t[c.key])),l=f("input",{type:"range",min:c.min,max:c.max,step:c.step,value:t[c.key],oninput:()=>{t[c.key]=Number(l.value),h.textContent=c.show(t[c.key]),i()}});return f("label",{},`${c.label}: `,h,l)}));function i(){const{months:c,breakEvenMonth:h}=Yo(t),l=c[c.length-1],d=l?.cleanCumulative??0,m=l?.debtCumulative??0,y=d>0?(d-m)/d*100:0,u=Math.abs(y)<.1?"Even":y>0?"Loss":"Gain",g=Math.abs(y)<.1?"≈0%":`${Math.abs(y).toFixed(1)}%`;n.replaceChildren(f("div",{class:"clean"},f("strong",{},String(d)),"clean features"),f("div",{class:"debt"},f("strong",{},String(m)),"debt features"),f("div",{},f("strong",{},h?`month ${h}`:"never"),"break-even"),f("div",{},f("strong",{},g),`${u.toLowerCase()} on the shortcut road`)),a.innerHTML=za([{name:"Clean",className:"clean",values:c.map(v=>v.cleanCumulative)},{name:"Debt-driven",className:"debt",values:c.map(v=>v.debtCumulative)}],{x:"Months",y:"Features"}),a.prepend(f("h4",{},"Cumulative features")),o.innerHTML=Gn([{name:"Clean",className:"clean",values:c.slice(1).map(v=>v.cleanMonthly)},{name:"Debt-driven",className:"debt",values:c.slice(1).map(v=>v.debtMonthly)}],{x:"Months",y:"Features a month"}),o.prepend(f("h4",{},"Monthly delivery rate")),s.textContent=t.interestRate===0?"With no interest there is no compound slowdown, and the shortcut simply wins. That is the one case that does not happen to real code.":h?`${Math.round(t.shortcutFactor*100)}% saved at first, ${Math.round(t.interestRate*100)}% interest on every feature: clean development overtakes at month ${h}, and by month ${t.timeHorizon} the shortcut road has delivered ${g} less.`:`${Math.round(t.shortcutFactor*100)}% saved at first, ${Math.round(t.interestRate*100)}% interest on every feature: in ${t.timeHorizon} months the clean road has not yet caught up. Give it longer, or raise the interest.`}e.append(r,n,f("div",{class:"charts"},a,o),s),i()}const zo={name:"technical-debt",apps:{"technical-debt":Uo}},Ko="theme";function Xn(){const e=document.documentElement,t=e.dataset.pageTheme;let n=null;try{n=localStorage.getItem(Ko)}catch{n=null}const a=t??(n==="light"||n==="dark"?n:null);a?e.dataset.theme=a:delete e.dataset.theme}const wt="theme";function Vo(){return window.matchMedia("(prefers-color-scheme: dark)").matches}function Xo(){let e=null;try{e=localStorage.getItem(wt)}catch{e=document.documentElement.dataset.theme??null}return e==="light"||e==="dark"?e:Vo()?"dark":"light"}class Zo{apply(t){const n=t==="toggle"?Xo()==="dark"?"light":"dark":t;try{n==="system"?localStorage.removeItem(wt):localStorage.setItem(wt,n)}catch{}return Xn(),n}}function Qo(e){const t=document.querySelector(".theme-toggle");return t?(t.classList.add("ready"),t.removeAttribute("aria-hidden"),t.removeAttribute("tabindex"),t.addEventListener("click",e),()=>t.removeEventListener("click",e)):()=>{}}const bt=["light","dark","system"];function es(e){return bt.includes(e)}const ts={light:"☀︎",dark:"☾︎",system:"◐︎"};function rn(e){const t=n=>`${ts[n]} ${n}`;return{text:`theme   ${bt.map(n=>n===e?`[${t(n)}]`:t(n)).join("   ")}`,html:`<pre class="choices">theme   ${bt.map(n=>n===e?`<strong aria-current="true">${t(n)}</strong>`:`<a href="#" data-run="theme ${n}" title="theme ${n}">${t(n)}</a>`).join("   ")}</pre>`}}function ns(e){return{name:"theme",usage:"theme [light|dark|system|auto]",description:"switch the colours, or toggle them",run({site:t,cwd:n},[a]){const o=t.at(n)?.fields.theme;if(o)return{text:`theme: this page keeps its own, ${o}. It works everywhere else.`,error:!0};if(a===void 0)return rn(e.apply("toggle"));const s=a==="auto"?"system":a;return es(s)?rn(e.apply(s)):{text:`theme: ${a}: choose light, dark or system`,error:!0}}}}const as={name:"theme",commands:[ns(new Zo)],install:e=>Qo(()=>e.run("theme")),arrive:()=>Xn()},cn=[{algorithm:"pairs",vertices:8,graphs:150,serial:42.43,openmp:14.34,cuda:2.572},{algorithm:"pairs",vertices:16,graphs:150,serial:738.92,openmp:247.95,cuda:33.06},{algorithm:"pairs",vertices:24,graphs:150,serial:4387.13,openmp:1208.97,cuda:109.093},{algorithm:"common-labelling",vertices:8,graphs:50,serial:843.21,openmp:214.51,cuda:33.404},{algorithm:"common-labelling",vertices:16,graphs:50,serial:17061.4,openmp:4284.01,cuda:550.153},{algorithm:"common-labelling",vertices:24,graphs:50,serial:71670.13,openmp:20274.32,cuda:2332.076}],os={pairs:e=>`Matching every pair of ${e} graphs`,"common-labelling":e=>`Finding one labelling common to ${e} graphs`};function st(e){if(e<10)return`${e.toFixed(1)} s`;if(e<60)return`${Math.round(e)} s`;const t=Math.floor(e/60);return t<60?t<10?`${t} min ${Math.round(e-t*60)} s`:`${Math.round(e/60)} min`:`${Math.floor(t/60)} h ${t%60} min`}const ss=e=>`×${e>=10?Math.round(e):e.toFixed(1)}`;function ln(e){const t=Math.max(...e.map(o=>o.serial/o.cuda)),n=(o,s)=>`<span class="bar ${s}" style="--p:${(o/t).toFixed(3)}"></span><span class="factor">${ss(o)}</span>`;return`<figure class="runs"><table class="runs"><thead><tr><th>each graph has</th><th>one thread</th><th>OpenMP, 2 cores · 8 W</th><th>CUDA, 16 cores · 10 W</th></tr></thead>${[...new Set(e.map(o=>o.algorithm))].map(o=>{const s=e.filter(i=>i.algorithm===o),r=s.map(i=>`<tr><th scope="row">${i.vertices} vertices</th><td>${st(i.serial)}</td><td>${st(i.openmp)}<div class="speedup">${n(i.serial/i.openmp,"openmp")}</div></td><td>${st(i.cuda)}<div class="speedup">${n(i.serial/i.cuda,"cuda")}</div></td></tr>`).join("");return`<tbody><tr class="group"><th colspan="4">${os[o](s[0]?.graphs??0)}</th></tr>${r}</tbody>`}).join("")}</table><figcaption>Measured in 2011 on an Intel Atom 330 with an NVIDIA 9400M beside it, on graphs of the GREC dataset. The bars are how many times faster than one thread, all on one scale.</figcaption></figure>`}const rs={name:"thesis-results",stills:{"graph-matching-runs":()=>ln(cn)},apps:{"graph-matching-runs":e=>{e.firstChild||(e.innerHTML=ln(cn))}}},vt={variable:"tn",atLeast:!0,threshold:20,months:[0,1,2,3,4,5,6,7,8,9,10,11]};function is(e,t){const n=e.map(({value:u})=>u),a=Math.floor(Math.min(...n,...(t.spans??[]).map(({value:u})=>u))),o=Math.ceil(Math.max(...n,a+1)),s=Fn(e.map(({year:u})=>u),a,o),{x:r,y:i,slot:c}=s,h=u=>r(u)+c/2,l=[];for(const u of e){const g=l[l.length-1];g&&g[g.length-1]?.year===u.year-1?g.push(u):l.push([u])}const d=l.map(u=>`<polyline class="line" points="${u.map(({year:g,value:v})=>`${L(h(g))},${L(i(v))}`).join(" ")}"/>`).join(""),m=e.map(({year:u,value:g,title:v,partial:p})=>`<circle class="dot${p?" partial":""}" cx="${L(h(u))}" cy="${L(i(g))}" r="3.5"><title>${v}</title></circle>`).join(""),y=s.levels(t.spans??[]);return s.wrap(t.label,`${d}${m}${y}`)}function cs(e,{threshold:t,atLeast:n},a){if(!e)return 0;const[o=0,...s]=e;return s.reduce((r,i,c)=>o+c*a>=t-1e-9===n?r+i:r,0)}const ie={tn:{code:1002,unit:"°C",name:"daily minimum",summary:"mean",bin:.5,range:[-30,35]},tx:{code:1001,unit:"°C",name:"daily maximum",summary:"mean",bin:.5,range:[-25,50]},pp:{code:1300,unit:"mm",name:"daily rain",summary:"sum",bin:.5,range:[0,250]},pi:{code:1303,unit:"mm/h",name:"most rain in one hour",summary:"max",bin:.5,range:[0,100]}},ls=.95,hs=(e,t)=>new Date(Date.UTC(e,t+1,0)).getUTCDate(),K=e=>e.reduce((t,n)=>t+n,0);function ds(e,t){return e.length===0?null:t==="sum"?K(e.map(({figure:n})=>n)):t==="max"?Math.max(...e.map(({figure:n})=>n)):K(e.map(({figure:n,weight:a})=>n*a))/K(e.map(({weight:n})=>n))}function us(e,t){const n=ie[t.variable];return Object.entries(e.years).flatMap(([a,o])=>{const s=o[t.variable];if(!s)return[];const r=Number(a),i=s.months.map(u=>({days:cs(u,t,n.bin),measured:K(u?.slice(1)??[])})),c=u=>t.months.includes(u),h=K(i.filter((u,g)=>c(g)).map(u=>u.measured)),l=K(t.months.map(u=>hs(r,u))),d=K(i.filter((u,g)=>c(g)).map(u=>u.days)),m=s.summaries.flatMap((u,g)=>c(g)&&u!==null?[{figure:u,weight:i[g]?.measured??0}]:[]),y=ds(m,n.summary);return[{year:r,days:d,elsewhere:K(i.map(u=>u.days))-d,measured:h,expected:l,whole:h/l>=ls,summary:y,months:i}]}).sort((a,o)=>a.year-o.year)}const hn=["January","February","March","April","May","June","July","August","September","October","November","December"];function dn(e){const{name:t,unit:n}=ie[e.variable],a=e.variable==="pi"?"":"a ",o=e.atLeast?`of ${e.threshold} ${n} or more`:`below ${e.threshold} ${n}`,s=hn[e.months[0]??0],r=hn[e.months[e.months.length-1]??11],i=e.months.length===12?"whole year":`${s} to ${r}`;return`days with ${a}${t} ${o}, ${i}`}const Zn=["January","February","March","April","May","June","July","August","September","October","November","December"],ms=.55;function ps(e,t,{days:n,measured:a}){const o=`${Zn[t]} ${e}`;if(a===0)return`<td class="none" title="${o}: not measured"></td>`;const s=Math.round(n/a*1e3)/1e3;return`<td${s>=ms?' class="deep"':""} style="--v:${s}" title="${o}: ${n} of ${a} days">${n||""}</td>`}function fs(e,t){const n=`<tr><th></th>${Zn.map(o=>`<th scope="col">${o.slice(0,3)}</th>`).join("")}</tr>`,a=[...e].reverse().map(({year:o,months:s})=>`<tr><th scope="row">${o}</th>${s.map((r,i)=>ps(o,i,r)).join("")}</tr>`);return`<table class="heat calendar${t?" warm":""}"><thead>${n}</thead><tbody>${a.join("")}</tbody></table>`}const un=e=>e.reduce((t,n)=>t+n,0)/e.length;function mn(e){const t=e.flatMap(({summary:n})=>n===null?[]:[n]);return{from:e[0]?.year??0,to:e[e.length-1]?.year??0,years:e.length,days:un(e.map(({days:n})=>n)),summary:t.length?un(t):null}}function gs(e){const t=e.filter(a=>a.whole);if(t.length<4)return null;const n=Math.floor(t.length/2);return[mn(t.slice(0,n)),mn(t.slice(n))]}const ys=["January","February","March","April","May","June","July","August","September","October","November","December"],ws={mean:"The mean",sum:"The total",max:"The highest"},ye=e=>String(Math.round(e*10)/10),bs=e=>`${e>0?"+":e<0?"−":""}${ye(Math.abs(e))}`,vs=e=>`${Number(e.slice(8,10))} ${ys[Number(e.slice(5,7))-1]} ${e.slice(0,4)}`;function ks(e,t){const{unit:n,name:a}=ie[t.variable],o=Object.values(e.years).flatMap(i=>i[t.variable]?[i[t.variable].record]:[]),[s,r]=t.atLeast?o.map(([i,c])=>[i,c]).reduce((i,c)=>c[0]>i[0]?c:i):o.map(([,,i,c])=>[i,c]).reduce((i,c)=>c[0]<i[0]?c:i);return`<p class="record">The ${t.atLeast?"highest":"lowest"} ${a} on record here: ${s} ${n} on ${vs(r)}, whatever months are chosen.</p>`}function Qn(e,t){const n=ie[t.variable],a=`<figcaption><strong>${e.name}</strong> · ${e.altitude} m, ${e.setting} · ${dn(t)}</figcaption>`,o=us(e,t);if(o.length===0)return`<figure class="weather">${a}<p>This station has no ${n.name} on record.</p></figure>`;const s=gs(o),r=({from:u,to:g})=>`${u}–${g}`,i=s?'<div class="figures">'+s.map(u=>`<div><strong>${ye(u.days)}</strong>days a year, ${r(u)}</div>`).join("")+`<div><strong>${bs(s[1].days-s[0].days)}</strong>days a year, from one half to the other</div></div>`:"",c=o.map(({year:u,days:g,elsewhere:v,measured:p,expected:w,whole:T})=>{const S=v>0?`, and ${v} more outside the months chosen`:"",M=T?"":`, with only ${p} of ${w} days measured`;return{year:u,value:g,partial:!T,title:`${u}: ${g} days${M}${S}`}}),h=(s??[]).map(u=>({from:u.from,to:u.to,value:u.days,label:`${ye(u.days)} a year`})),l=o.flatMap(({year:u,summary:g,whole:v})=>g===null||!v?[]:[{year:u,value:g,title:`${u}: ${ye(g)} ${n.unit}`}]),d=(s??[]).flatMap(u=>u.summary===null?[]:[{from:u.from,to:u.to,value:u.summary,label:`${ye(u.summary)} ${n.unit}`}]),m=`${ws[n.summary]} ${n.name} of each year, ${n.unit}`,y=(n.summary==="mean"?is:ut)(l,{label:m,spans:d});return`<figure class="weather">${a}${i}<h4>Days a year</h4>${ut(c,{label:`Days a year: ${dn(t)}`,spans:h})}<h4>When in the year they fell</h4>${fs(o,t.atLeast&&n.unit==="°C")}<h4>${m}, in the months chosen</h4>${y}`+ks(e,t)+"</figure>"}const pn=[{id:"tropical-nights",name:"tropical nights",variable:"tn",atLeast:!0,threshold:20},{id:"torrid-nights",name:"torrid nights",variable:"tn",atLeast:!0,threshold:25},{id:"hot-days",name:"hot days",variable:"tx",atLeast:!0,threshold:30},{id:"torrid-days",name:"torrid days",variable:"tx",atLeast:!0,threshold:35},{id:"frost-days",name:"frost days",variable:"tn",atLeast:!1,threshold:0},{id:"rainy-days",name:"rainy days",variable:"pp",atLeast:!0,threshold:1},{id:"heavy-rain",name:"days of heavy rain",variable:"pp",atLeast:!0,threshold:20},{id:"downpours",name:"days with a downpour",variable:"pi",atLeast:!0,threshold:10}],oe=[{code:"WU",name:"Badalona - Museu",municipality:"Badalona",altitude:42,setting:"urban, by the sea"},{code:"X4",name:"Barcelona - el Raval",municipality:"Barcelona",altitude:33,setting:"dense city, on a roof"},{code:"X8",name:"Barcelona - Zona Universitària",municipality:"Barcelona",altitude:82,setting:"city edge"},{code:"D5",name:"Barcelona - Observatori Fabra",municipality:"Barcelona",altitude:410,setting:"wooded hill above the city"},{code:"UP",name:"Cabrils",municipality:"Cabrils",altitude:81,setting:"coastal slope, half rural"},{code:"XF",name:"Sabadell - Parc Agrari",municipality:"Sabadell",altitude:259,setting:"farmland beside a city"},{code:"XJ",name:"Girona",municipality:"Girona",altitude:72,setting:"market gardens by the city"},{code:"XE",name:"Tarragona - Complex Educatiu",municipality:"Tarragona",altitude:6,setting:"coast"},{code:"VK",name:"Raimat",municipality:"Lleida",altitude:286,setting:"inland plain, vineyards"}],fn=[["whole year",[0,1,2,3,4,5,6,7,8,9,10,11]],["June to August",[5,6,7]],["May to October",[4,5,6,7,8,9]],["December to February",[0,1,11]]],$s={tn:[-10,30],tx:[0,45],pp:[.5,100],pi:[.5,60]};function xs(e){const t=new Map,n=Mt(e,"/data/weather/index.json"),a=f("div");a.append(...e.querySelectorAll("figure"));let o=null,s=vt,r=!1;const i=(p,w)=>f("option",{value:p},w),c=f("select",{onchange:()=>{g(c.value)}},...oe.map(({code:p,name:w})=>i(p,w))),h=f("select",{onchange:()=>{const p=pn.find(({id:w})=>w===h.value);p&&u({variable:p.variable,atLeast:p.atLeast,threshold:p.threshold})}},...pn.map(({id:p,name:w})=>i(p,w))),l=f("select",{onchange:()=>u({months:fn[Number(l.value)]?.[1]??vt.months})},...fn.map(([p],w)=>i(w,p))),d=f("output"),m=f("input",{type:"range",step:.5,oninput:()=>u({threshold:Number(m.value)})});function y(){const[p,w]=$s[s.variable];m.min=String(p),m.max=String(w),m.value=String(s.threshold),d.textContent=`${s.atLeast?"":"below "}${s.threshold} ${ie[s.variable].unit}${s.atLeast?" or more":""}`,o&&(a.innerHTML=Qn(o,s))}function u(p){s={...s,...p},y()}async function g(p){const w=t.get(p)??fetch(`/data/weather/${p}.json`).then(T=>T.json());t.set(p,w);try{const T=await w;if(r||c.value!==p)return;o=T,y()}catch{t.delete(p),a.replaceChildren(f("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}const v=f("div",{class:"dials"},f("label",{},"Station",c),f("label",{},"Counting",h),f("label",{},"Threshold: ",d,m),f("label",{},"Months",l));return e.replaceChildren(v,a,n),g(c.value),()=>{r=!0}}function Ts(e,t,[n,a]){if(e.length===0)return null;const o=Math.round((a-n)/t),s=new Map;for(const h of e){const l=Math.min(o-1,Math.max(0,Math.floor((h-n)/t+1e-9)));s.set(l,(s.get(l)??0)+1)}const r=Math.min(...s.keys()),i=Math.max(...s.keys());return[Math.round((n+r*t)*1e3)/1e3,...Array.from({length:i-r+1},(h,l)=>s.get(r+l)??0)]}const gn="7bvh-jvq2",ea=5e4,yn=Object.entries(ie),Ms="No representatiu",Ss=["Representatiu",""],As=(e,t)=>Math.round(e*10**t)/10**t;function Is(e,t){if(e.length===0)return null;if(t==="max")return Math.max(...e);const n=e.reduce((a,o)=>a+o,0);return As(t==="sum"?n:n/e.length,2)}function Es(e,t){const n=Array.from({length:12},(s,r)=>e.filter(({date:i})=>Number(i.slice(5,7))===r+1).map(({value:i})=>i)),a=e.reduce((s,r)=>r.value>s.value?r:s),o=e.reduce((s,r)=>r.value<s.value?r:s);return{months:n.map(s=>Ts(s,t.bin,t.range)),summaries:n.map(s=>Is(s,t.summary)),record:[a.value,a.date,o.value,o.date]}}function Cs(e){if(!Array.isArray(e))throw new Error("the portal did not answer with rows");if(e.length>=ea)throw new Error("the answer was cut short at the limit");const t=e;if(!t.some(o=>o.data_lectura?.slice(5,7)==="12"))throw new Error("the year does not reach December yet");const n=new Map,a=new Set;for(const o of t){const s=o.estat??"";if(s===Ms)continue;if(!Ss.includes(s))throw new Error(`the network marks days as "${s}", which nobody has decided how to read`);const r=o.data_lectura?.slice(0,10)??"",i=`${o.codi_estacio}/${o.codi_variable}`;if(a.has(`${i}/${r}`))throw new Error(`${i} has ${r} twice`);a.add(`${i}/${r}`);const c=Number(o.valor);Number.isFinite(c)&&n.set(i,[...n.get(i)??[],{date:r,value:c}])}return n}const js={name:"weather",directory:"public/data/weather",firstYear:1988,files:oe.map(e=>`${e.code}.json`),about:{measures:"daily minimum and maximum temperature, daily rain, most rain in one hour",network:"Xarxa d'Estacions Meteorològiques Automàtiques (XEMA)",attribution:"Servei Meteorològic de Catalunya (XEMA). Dades obertes de la Generalitat de Catalunya.",dataset:`https://analisi.transparenciacatalunya.cat/d/${gn}`,stations:oe},requestsFor(e){const t=oe.map(a=>`'${a.code}'`).join(","),n=yn.map(([,a])=>a.code).join(",");return[Wn(gn,{select:"codi_estacio,codi_variable,data_lectura,valor,estat",where:`codi_estacio in (${t}) and codi_variable in (${n}) and data_lectura between '${e}-01-01T00:00:00' and '${e}-12-31T23:59:59'`,limit:ea})]},withYear(e,t,n){const a=Cs(n[0]);return Object.fromEntries(oe.map(o=>{const s=`${o.code}.json`,r=yn.flatMap(([h,l])=>{const d=a.get(`${o.code}/${l.code}`);return d?[[h,Es(d,l)]]:[]}),i=Object.fromEntries(r),c={...e[s]?.years,...r.length?{[t]:i}:{}};return[s,{...o,years:c}]}))}},Ps=e=>{const t=JSON.parse(e(`/data/weather/${oe[0]?.code}.json`)),n=JSON.parse(e("/data/weather/index.json"));return Qn(t,vt)+He(n)},Ds={name:"weather",apps:{weather:xs},stills:{weather:Ps},sources:[js]},It="header-world";function ta(){try{const e=localStorage.getItem(It);if(!e)return null;const t=JSON.parse(e);return[t.seed,t.levels,t.roughness,t.share].every(a=>typeof a=="number"&&Number.isFinite(a))?t:null}catch{return null}}function Os(e){try{localStorage.setItem(It,JSON.stringify(e))}catch{}}function Rs(){try{localStorage.removeItem(It)}catch{}}const Y=(1+Math.sqrt(5))/2,Ns=[[-1,Y,0],[1,Y,0],[-1,-Y,0],[1,-Y,0],[0,-1,Y],[0,1,Y],[0,-1,-Y],[0,1,-Y],[Y,0,-1],[Y,0,1],[-Y,0,-1],[-Y,0,1]],Fs=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];function Ls(){const e=Ns.map(([t,n,a])=>{const o=Math.hypot(t,n,a);return{direction:[t/o,n/o,a/o],radius:1,surface:0}});return na(e,Fs.map(t=>[...t]))}const Ws=(e,t)=>(e+t)/2;function Bs(e,t,n=Ws){const a=Array.from({length:e.vertexCount},(i,c)=>({direction:[e.directions[c*3]??0,e.directions[c*3+1]??0,e.directions[c*3+2]??0],radius:e.radii[c]??1,surface:e.surface[c]??0})),o=new Map,s=(i,c)=>{const h=i<c?`${i}:${c}`:`${c}:${i}`,l=o.get(h);if(l!==void 0)return l;const d=a[i],m=a[c],[y,u,g]=d.direction,[v,p,w]=m.direction,T=Math.hypot(y*d.radius-v*m.radius,u*d.radius-p*m.radius,g*d.radius-w*m.radius),[S,M,I]=[(y+v)/2,(u+p)/2,(g+w)/2],$=Math.hypot(S,M,I)||1,C=n(d.surface,m.surface);a.push({direction:[S/$,M/$,I/$],radius:(d.radius+m.radius)/2+t(T),surface:C});const F=a.length-1;return o.set(h,F),F},r=[];for(let i=0;i<e.faceCount;i+=1){const c=e.faces[i*3],h=e.faces[i*3+1],l=e.faces[i*3+2],d=s(c,h),m=s(h,l),y=s(l,c);r.push([c,d,y],[h,m,d],[l,y,m],[d,m,y])}return na(a,r)}function na(e,t){const n=new Float32Array(e.length*3),a=new Float32Array(e.length),o=new Float32Array(e.length);e.forEach((r,i)=>{n[i*3]=r.direction[0],n[i*3+1]=r.direction[1],n[i*3+2]=r.direction[2],a[i]=r.radius,o[i]=r.surface});const s=new Uint32Array(t.length*3);return t.forEach(([r,i,c],h)=>{s[h*3]=r,s[h*3+1]=i,s[h*3+2]=c}),{directions:n,radii:a,surface:o,faces:s,faceCount:t.length,vertexCount:e.length}}function Hs(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let n=Math.imul(t^t>>>15,1|t);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function Gs(e){const t=Ls();return{seed:e,mesh:t,temperature:new Float32Array(t.vertexCount),faceColour:new Uint8ClampedArray(t.faceCount*3),seaRadius:0}}function Js(e,t){return{...e,mesh:t,temperature:new Float32Array(t.vertexCount),faceColour:new Uint8ClampedArray(t.faceCount*3)}}function _s(e,t){return Math.abs(e.mesh.directions[t*3+1]??0)}function aa(e,t,n){const a=e.mesh.faces[n*3]??0,o=e.mesh.faces[n*3+1]??0,s=e.mesh.faces[n*3+2]??0;return((t[a]??0)+(t[o]??0)+(t[s]??0))/3}function Ys(e,t){return aa(e,e.mesh.radii,t)}const oa=(e=4,t=.28,n=.2)=>a=>{const o=Hs(a.seed);let s=a.mesh;const r=Float32Array.from(s.surface,()=>o());s={...s,surface:r};for(let i=0;i<e;i+=1)s=Bs(s,c=>c*t*(o()-.5),(c,h)=>{const l=.5+(o()-.5)*(c-h)*n;return Math.min(1,Math.max(0,c*(1-l)+h*l))});return Js(a,s)},sa=({equator:e=1,pole:t=.05,peak:n=0}={})=>a=>{const o=new Float32Array(a.mesh.vertexCount),s=a.mesh.radii,r=s.reduce((h,l)=>Math.min(h,l),1/0),c=s.reduce((h,l)=>Math.max(h,l),-1/0)-r||1;for(let h=0;h<a.mesh.vertexCount;h+=1){const l=((s[h]??1)-r)/c,d=_s(a,h)**2.2;o[h]=e+(t-e)*d+(n-e)*l}return{...a,temperature:o}},ra=(e=.55)=>t=>{const n=Float32Array.from(t.mesh.radii).sort(),a=Math.min(n.length-1,Math.floor(n.length*e)),o=n[a]??1,s=Float32Array.from(t.mesh.radii,r=>Math.max(r,o));return{...t,mesh:{...t.mesh,radii:s},seaRadius:o}},qs=[24,92,168],Us=[62,176,206],zs=[214,196,138],wn=[190,158,84],rt=[70,138,66],Ks=[74,104,76],Vs=[136,128,116],bn=[238,243,247];function X(e,t,n){const a=Math.min(1,Math.max(0,n));return[e[0]+(t[0]-e[0])*a,e[1]+(t[1]-e[1])*a,e[2]+(t[2]-e[2])*a]}function Xs(e){return e>.78?wn:e>.62?X(rt,wn,(e-.62)/.16):e>.3?rt:X(Ks,rt,(e-.12)*5.5)}const ia=e=>{const t=new Uint8ClampedArray(e.mesh.faceCount*3),n=e.mesh.radii.reduce((o,s)=>Math.max(o,s),-1/0),a=Math.max(1e-6,n-e.seaRadius);for(let o=0;o<e.mesh.faceCount;o+=1){const s=(Ys(e,o)-e.seaRadius)/a,r=aa(e,e.temperature,o);let i;s<=.002?(i=X(Us,qs,.55),r<.16&&(i=X(i,bn,(.16-r)*6))):(i=X(zs,Xs(r),Math.min(1,s*9)),i=X(i,Vs,Math.max(0,s-.55)*2.2),r<.26&&(i=X(i,bn,(.26-r)*4))),t[o*3]=i[0],t[o*3+1]=i[1],t[o*3+2]=i[2]}return{...e,faceColour:t}},Zs=[oa(),ra(),sa(),ia];function Qs(e,t=Zs){return t.reduce((n,a)=>a(n),Gs(e))}function ca(e){return Qs(e.seed,[oa(e.levels,e.roughness),ra(e.share),sa(),ia])}const vn=.3,er=[-.5,.45,.74],tr=1.02;class Et{size;pixels;depth;view=new Float32Array(0);screen=new Float32Array(0);constructor(t,n=new Uint8ClampedArray(t*t*4)){if(n.length!==t*t*4)throw new Error(`SphereRaster: ${t}×${t} needs ${t*t*4} bytes, not ${n.length}`);this.size=t,this.pixels=n,this.depth=new Float32Array(t*t)}paint(t,n){const{size:a,pixels:o,depth:s}=this;o.fill(0),s.fill(-1/0);const[r,i,c]=nr(n.light??er),h=n.tilt??-.38,l=Math.cos(h),d=Math.sin(h),m=Math.cos(n.rotation),y=Math.sin(n.rotation),{directions:u,radii:g,faces:v,faceCount:p,vertexCount:w}=t.mesh;let T=1;for(let $=0;$<w;$+=1){const C=g[$]??1;C>T&&(T=C)}const S=a/(2*T*tr);this.view.length<w*3&&(this.view=new Float32Array(w*3),this.screen=new Float32Array(w*3));const M=this.view,I=this.screen;for(let $=0;$<w;$+=1){const C=g[$]??1,F=(u[$*3]??0)*C,P=(u[$*3+1]??0)*C,A=(u[$*3+2]??0)*C,k=F*m-A*y,R=F*y+A*m,b=P*l+R*d,x=-P*d+R*l;M[$*3]=k,M[$*3+1]=b,M[$*3+2]=x,I[$*3]=a/2+k*S,I[$*3+1]=a/2-b*S,I[$*3+2]=x}for(let $=0;$<p;$+=1){const C=v[$*3]??0,F=v[$*3+1]??0,P=v[$*3+2]??0,A=I[C*3],k=I[C*3+1],R=I[C*3+2],b=I[F*3],x=I[F*3+1],j=I[F*3+2],D=I[P*3],E=I[P*3+1],N=I[P*3+2],z=(b-A)*(E-k)-(x-k)*(D-A);if(z>=0)continue;const ce=M[C*3],jt=M[C*3+1],Pt=M[C*3+2],Dt=M[F*3]-ce,Ot=M[F*3+1]-jt,Rt=M[F*3+2]-Pt,Nt=M[P*3]-ce,Ft=M[P*3+1]-jt,Lt=M[P*3+2]-Pt,Wt=Ot*Lt-Rt*Ft,Bt=Rt*Nt-Dt*Lt,Ht=Dt*Ft-Ot*Nt,_e=Math.hypot(Wt,Bt,Ht)||1,ga=Wt/_e*r+Bt/_e*i+Ht/_e*c,Ye=vn+(1-vn)*Math.max(0,ga),ya=(t.faceColour[$*3]??0)*Ye,wa=(t.faceColour[$*3+1]??0)*Ye,ba=(t.faceColour[$*3+2]??0)*Ye,va=Math.max(0,Math.floor(Math.min(A,b,D))),ka=Math.min(a-1,Math.ceil(Math.max(A,b,D))),$a=Math.max(0,Math.floor(Math.min(k,x,E))),xa=Math.min(a-1,Math.ceil(Math.max(k,x,E)));for(let ve=$a;ve<=xa;ve+=1)for(let ke=va;ke<=ka;ke+=1){const qe=ke+.5,Ue=ve+.5,Ta=(b-A)*(Ue-k)-(x-k)*(qe-A),Gt=(D-b)*(Ue-x)-(E-x)*(qe-b),Jt=(A-D)*(Ue-E)-(k-E)*(qe-D);if(Ta>0||Gt>0||Jt>0)continue;const _t=Gt/z,Yt=Jt/z,qt=R*_t+j*Yt+N*(1-_t-Yt),ee=ve*a+ke;qt<=s[ee]||(s[ee]=qt,o[ee*4]=ya,o[ee*4+1]=wa,o[ee*4+2]=ba,o[ee*4+3]=255)}}return o}}function nr([e,t,n]){const a=Math.hypot(e,t,n)||1;return[e/a,t/a,n/a]}const ar=.2,or=.36,sr=[{upTo:20,dark:4,bright:12},{upTo:70,dark:6,bright:14},{upTo:160,dark:2,bright:10},{upTo:198,dark:3,bright:11},{upTo:275,dark:1,bright:9},{upTo:330,dark:5,bright:13},{upTo:360,dark:4,bright:12}];function rr(e,t,n){const a=Math.max(e,t,n),o=Math.min(e,t,n),s=(a+o)/2/255;if((a===0?0:(a-o)/a)<ar)return s<.08?0:s<.5?8:s<.8?7:15;const i=a-o;let c;a===e?c=(t-n)/i*60:a===t?c=(2+(n-e)/i)*60:c=(4+(e-t)/i)*60,c<0&&(c+=360);const h=sr.find(({upTo:l})=>c<l)??{dark:4,bright:12};return s<.08?0:s>=or?h.bright:h.dark}function ir(e,t){const n=(o,s)=>{const r=(s*t+o)*4;return(e[r+3]??0)===0?-1:rr(e[r]??0,e[r+1]??0,e[r+2]??0)},a=[];for(let o=0;o<t/2;o+=1){const s=[];for(let r=0;r<t;r+=1)s.push({top:n(r,o*2),bottom:n(r,o*2+1)});a.push(s)}return a}const me=["#000000","#0000aa","#00aa00","#00aaaa","#aa0000","#aa00aa","#aa5500","#aaaaaa","#555555","#5555ff","#55ff55","#55ffff","#ff5555","#ff55ff","#ffff55","#ffffff"];function cr(e){const t=({top:n,bottom:a})=>n<0&&a<0?"<span> </span>":n<0?`<span style="color:${me[a]}">▄</span>`:a<0?`<span style="color:${me[n]}">▀</span>`:n===a?`<span style="color:${me[n]}">█</span>`:`<span style="color:${me[n]};background:${me[a]}">▀</span>`;return e.map(n=>n.map(t).join("")).join(`
`)}const kt={levels:4,roughness:.28,share:.55},pe=32;let it=null,kn=null,ct=null;function $n(e,t){const n=document.querySelector('link[rel="icon"]');if(!n)return;it??=Object.assign(document.createElement("canvas"),{width:pe,height:pe});const a=it.getContext("2d");a&&(ct??=a.createImageData(pe,pe),kn??=new Et(pe,ct.data),kn.paint(e,{rotation:t}),a.putImageData(ct,0,0),n.type="image/png",n.href=it.toDataURL("image/png"))}function la(e){let t=!0;if(typeof IntersectionObserver!="function")return{onScreen:()=>t,stop:()=>{}};const n=new IntersectionObserver(a=>{for(const o of a)t=o.isIntersecting},{rootMargin:"100px"});return n.observe(e),{onScreen:()=>t,stop:()=>n.disconnect()}}const lr=90,hr=1e3/12,dr=400,lt=new WeakMap;function ur(e){const t=(e.textContent??"").split(`
`);return{columns:Math.max(...t.map(n=>n.length)),rows:t.length}}function $t(e,t){lt.get(e)?.();const n=t??{...kt,seed:Math.floor(Math.random()*16777215)},{columns:a,rows:o}=ur(e),s=Math.min(a,o*2),r=ca(n),i=new Et(s);e.dataset.seed=String(n.seed),e.title=`World ${n.seed}, ${r.mesh.faceCount.toLocaleString("en")} triangles`;const c=v=>{e.innerHTML=cr(ir(i.paint(r,{rotation:v}),s)),e.classList.add("grown")};if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return c(.6),$n(r,.6),lt.set(e,()=>{}),()=>{};let h=0,l=-1/0,d=-1/0;const m=performance.now(),y=la(e),u=v=>{const p=(v-m)/1e3/lr*Math.PI*2;y.onScreen()&&v-l>=hr&&(c(p),l=v),v-d>dr&&($n(r,p),d=v),h=requestAnimationFrame(u)};h=requestAnimationFrame(u);const g=()=>{cancelAnimationFrame(h),y.stop()};return lt.set(e,g),g}function mr(){const e=document.querySelector(".planet");return e?$t(e,ta()??void 0):()=>{}}const ne=360,pr=60,fr=1.4,xn=Math.PI*2/pr,Tn=Math.PI*4;function gr(e){const t=f("canvas",{class:"world",width:ne,height:ne}),n=t.getContext("2d");if(!n)return()=>{};const a={...kt,seed:Math.floor(Math.random()*16777215)},o=n.createImageData(ne,ne),s=new Et(ne,o.data),r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let i,c=.6,h=-.38,l=!r,d=null,m=0,y=performance.now();const u=f("p",{class:"hint"}),g=document.querySelector(".planet"),v=(20*4**kt.levels).toLocaleString("en"),p=()=>{i=ca(a);const k=ta();u.textContent=`World ${a.seed}: ${i.mesh.faceCount.toLocaleString("en")} triangles. `+(k?`The header is keeping world ${k.seed}, ${(20*4**k.levels).toLocaleString("en")} triangles.`:`The header grows a new one every visit, ${v} triangles each.`),T.hidden=!k,S()},w=f("button",{type:"button",onclick:()=>{Os({...a}),g&&$t(g,{...a}),p()}},"Put it in the header"),T=f("button",{type:"button",hidden:!0,onclick:()=>{Rs(),g&&$t(g),p()}},"Let the header grow its own"),S=()=>{s.paint(i,{rotation:c,tilt:h}),n.putImageData(o,0,0)};let M=0;const I=la(t),$=k=>{const R=Math.min(.1,(k-y)/1e3);if(!d&&I.onScreen()){if(m!==0){m*=Math.exp(-R/fr);const b=l?xn:0;(Math.abs(m)<=b||Math.abs(m)<.01)&&(m=0)}m!==0?(c-=m*R,S()):l&&(c+=xn*R,S()),yt.send({byRadians:m*R,tiltedBy:0,seconds:R})}y=k,M=requestAnimationFrame($)};t.addEventListener("pointerdown",k=>{d={x:k.clientX,y:k.clientY,at:k.timeStamp},m=0,t.setPointerCapture(k.pointerId)}),t.addEventListener("pointermove",k=>{if(!d)return;const R=t.clientWidth||ne,b=(k.clientX-d.x)/R*Math.PI;c-=b;const x=h;h=Math.max(-1.2,Math.min(1.2,h-(k.clientY-d.y)/R*Math.PI)),yt.send({byRadians:b,tiltedBy:h-x,seconds:0});const j=Math.max(.004,(k.timeStamp-d.at)/1e3);m=Math.max(-Tn,Math.min(Tn,m*.4+b/j*.6)),d={x:k.clientX,y:k.clientY,at:k.timeStamp},S()}),t.addEventListener("pointerup",k=>{d&&k.timeStamp-d.at>120&&(m=0),d=null,y=performance.now()}),t.addEventListener("pointercancel",()=>{d=null,m=0});const C=f("input",{type:"number",min:0,value:a.seed,onchange:()=>{a.seed=Math.max(0,Math.floor(Number(C.value)||0)),p()}}),F=f("button",{type:"button",onclick:()=>{a.seed=Math.floor(Math.random()*16777215),C.value=String(a.seed),p()}},"Another world"),P=f("button",{type:"button",onclick:()=>{l=!l,P.textContent=l?"Hold still":"Turn"}},l?"Hold still":"Turn"),A=(k,R,b,x,j,D)=>{const E=f("output",{},D(a[k])),N=f("input",{type:"range",min:b,max:x,step:j,value:a[k],onchange:()=>{a[k]=Number(N.value),E.textContent=D(a[k]),p()},oninput:()=>{E.textContent=D(Number(N.value))}});return f("label",{},`${R}: `,E,N)};return e.append(t,f("div",{class:"row"},f("span",{},"Seed "),C,F,P,w,T),f("div",{class:"dials"},A("levels","Detail",2,6,1,k=>`${k} splits`),A("roughness","Roughness",.02,1,.01,k=>k.toFixed(2)),A("share","Sea",0,.98,.01,k=>`${Math.round(k*100)}%`)),u),p(),M=requestAnimationFrame($),()=>{cancelAnimationFrame(M),I.stop()}}const yr={name:"world",apps:{worlds:gr},install:()=>mr()},fe=[yr,as,_o,zo,Za,ho,Ua,Ds,vo,Lo,To,rs];function Mn(e,t){const n=[];for(const a of document.querySelectorAll(".app[data-app]")){const o=e[a.dataset.app??""]?.(a,t);o&&n.push(o)}return()=>{for(const a of n)a()}}function wr(e){const t={},n=e.fields.theme;(n==="dark"||n==="light")&&(t["data-page-theme"]=n);const a=e.fields.sky;return a&&(t["data-sky"]=a),t}const br=["data-page-theme","data-sky"];function vr(e,t){return t==="/"?e==="/":e.startsWith(t)}const kr=7.8,Sn=17,$r=12,xr=8,ht=28,An=44,be=8,Tr=16;function Mr(e){const t=new Map;for(const p of e.nodes){const w=p.label.split(`
`),T=Math.max(...w.map(S=>S.length),1);t.set(p.id,{id:p.id,label:p.label,real:!0,rank:-1,along:Math.max(40,T*kr+$r*2),across:w.length*Sn+xr*2,pos:0,preds:[],succs:[]})}for(const p of e.edges){const w=t.get(p.from),T=t.get(p.to);if(!w||!T)throw new Error(`flow: edge ${p.from} --> ${p.to} names a node that is not there`);w.succs.push(T),T.preds.push(w)}Sr(t);const n=Ar(t,e),a=Ir(t);Er(a);const o=a.length,s=a.map(p=>Math.max(Sn,...p.map(w=>w.real?w.across:0))),r=[];let i=be;for(let p=0;p<o;p+=1)r.push(i),i+=(s[p]??0)+An;const c=p=>(r[p.rank]??0)+((s[p.rank]??0)-(p.real?p.across:0))/2,h=Math.max(...[...t.values()].map(p=>p.pos+p.along))+be,l=i-An+be,d=e.direction==="LR",m=(p,w)=>d?[w,p]:[p,w],y=[...t.values()].filter(p=>p.real).map(p=>{const[w,T]=m(p.pos,c(p));return{id:p.id,label:p.label,x:w,y:T,width:d?p.across:p.along,height:d?p.along:p.across}}),u=e.edges.map((p,w)=>{const T=n[w]??[],S=T[0],M=T[T.length-1];if(!S||!M)throw new Error("flow: an edge lost its ends");const I=[m(S.pos+S.along/2,c(S)+S.across),...T.slice(1,-1).map($=>m($.pos+$.along/2,c($)+(s[$.rank]??0)/2)),m(M.pos+M.along/2,c(M))];return p.label===void 0?{from:p.from,to:p.to,points:I}:{from:p.from,to:p.to,label:p.label,points:I}}),[g,v]=m(h,l);return{direction:e.direction,width:g,height:v,nodes:y,edges:u}}function Sr(e){const t=new Set,n=a=>{if(a.rank>=0)return a.rank;if(t.has(a))throw new Error(`flow: there is a cycle through ${a.id}, and a flow has a direction`);return t.add(a),a.rank=a.preds.length===0?0:Math.max(...a.preds.map(n))+1,t.delete(a),a.rank};for(const a of e.values())n(a)}function Ar(e,t){let n=0;return t.edges.map(a=>{const o=e.get(a.from),s=e.get(a.to);if(!o||!s)return[];const r=[o];let i=o;for(let c=o.rank+1;c<s.rank;c+=1){n+=1;const h={id:`\0${n}`,label:"",real:!1,rank:c,along:Tr,across:0,pos:0,preds:[i],succs:[]};e.set(h.id,h),i.succs.push(h),r.push(h),i=h}return i!==o&&(i.succs.push(s),s.preds.push(i),o.succs.splice(o.succs.indexOf(s),1),s.preds.splice(s.preds.indexOf(o),1)),r.push(s),r})}function Ir(e){const t=Math.max(...[...e.values()].map(r=>r.rank))+1,n=Array.from({length:t},()=>[]);for(const r of e.values())n[r.rank]?.push(r);const a=new Map,o=r=>r.forEach((i,c)=>a.set(i,c));n.forEach(o);const s=(r,i)=>i.length===0?a.get(r)??0:i.reduce((c,h)=>c+(a.get(h)??0),0)/i.length;for(let r=0;r<4;r+=1){for(let i=1;i<t;i+=1){const c=n[i]??[];c.sort((h,l)=>s(h,h.preds)-s(l,l.preds)),o(c)}for(let i=t-2;i>=0;i-=1){const c=n[i]??[];c.sort((h,l)=>s(h,h.succs)-s(l,l.succs)),o(c)}}return n}function Er(e){const t=r=>r.reduce((i,c)=>i+c.along,0)+ht*Math.max(0,r.length-1),n=Math.max(...e.map(t));for(const r of e){let i=be+(n-t(r))/2;for(const c of r)c.pos=i,i+=c.along+ht}const a=r=>r.pos+r.along/2,o=(r,i)=>{for(const c of r){const h=i(c);if(h.length===0)continue;const l=h.reduce((d,m)=>d+a(m),0)/h.length;c.pos=l-c.along/2}for(let c=1;c<r.length;c+=1){const h=r[c-1],l=r[c];if(!h||!l)continue;const d=h.pos+h.along+ht;l.pos<d&&(l.pos=d)}};for(let r=0;r<3;r+=1){for(let i=1;i<e.length;i+=1)o(e[i]??[],c=>c.preds);for(let i=e.length-2;i>=0;i-=1)o(e[i]??[],c=>c.succs)}const s=Math.min(...e.flat().map(r=>r.pos));for(const r of e.flat())r.pos+=be-s}const xt=/(\w[\w.-]*)(?:\[([^\]]*)\])?/,Cr=new RegExp(`^${xt.source}\\s*-->(?:\\|([^|]*)\\|)?\\s*${xt.source}$`),jr=new RegExp(`^${xt.source}$`),Pr=/^(?:flow\s+)?(TD|LR)$/i;function Dr(e){const t=new Map,n=[];let a="TD";const o=(i,c)=>{i&&(t.has(i)||t.set(i,i),c!==void 0&&t.set(i,c.replace(/\\n/g,`
`)))},s=e.split(`
`);let r=!0;return s.forEach((i,c)=>{const h=i.trim();if(h===""||h.startsWith("%"))return;if(r){r=!1;const m=Pr.exec(h);if(m){a=m[1]?.toUpperCase()==="LR"?"LR":"TD";return}}const l=Cr.exec(h);if(l){const[,m,y,u,g,v]=l;o(m,y),o(g,v),n.push(u===void 0?{from:m??"",to:g??""}:{from:m??"",to:g??"",label:u});return}const d=jr.exec(h);if(d){o(d[1],d[2]);return}throw new Error(`flow: cannot read line ${c+1}: "${h}"`)}),{direction:a,nodes:[...t].map(([i,c])=>({id:i,label:c})),edges:n}}const Or=20,In=17;function Rr(e){let t=5381;for(let n=0;n<e.length;n+=1)t=(t*33^e.charCodeAt(n))>>>0;return t.toString(36)}const B=e=>String(Math.round(e*10)/10);function Nr(e,t){const[n,...a]=e.points;if(!n)return"";let o=`M${B(n[0])},${B(n[1])}`,s=n;for(const r of a){const[i,c]=s,[h,l]=r,d=t?[(i+h)/2,c]:[i,(c+l)/2],m=t?[(i+h)/2,l]:[h,(c+l)/2];o+=` C${B(d[0])},${B(d[1])} ${B(m[0])},${B(m[1])} ${B(h)},${B(l)}`,s=r}return o}function Fr(e){const{points:t}=e,n=t[Math.floor((t.length-1)/2)]??[0,0],a=t[Math.ceil((t.length-1)/2)]??n;return[(n[0]+a[0])/2,(n[1]+a[1])/2]}function Lr(e){const t=Mr(Dr(e)),n=t.direction==="LR",a=`arrow-${Rr(e)}`,o=t.edges.map(c=>{const h=`<path class="edge" d="${Nr(c,n)}" marker-end="url(#${a})"/>`;if(c.label===void 0)return h;const[l,d]=Fr(c);return`${h}<text class="edge-label" x="${B(l)}" y="${B(d)}" text-anchor="middle" dominant-baseline="middle">${O(c.label)}</text>`}).join(""),s=t.nodes.map(c=>{const h=c.x+c.width/2,l=c.label.split(`
`),d=c.y+(c.height-l.length*In)/2,m=l.map((y,u)=>`<tspan x="${B(h)}" y="${B(d+Or-8+u*In)}">${O(y)}</tspan>`).join("");return`<g class="node"><rect x="${B(c.x)}" y="${B(c.y)}" width="${B(c.width)}" height="${B(c.height)}" rx="4"/><text text-anchor="middle" dominant-baseline="middle">${m}</text></g>`}).join(""),r=B(t.width),i=B(t.height);return`<figure class="flow"><svg class="flow" viewBox="0 0 ${r} ${i}" width="${r}" height="${i}" style="max-width: 100%; height: auto" role="img"><defs><marker id="${a}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z"/></marker></defs>${o}${s}</svg></figure>`}const Wr=new Set("var let const function return if else for while do break continue new this true false null undefined class extends import export from default async await throw try catch finally typeof instanceof in of switch case delete void yield".split(" "));function U(e,t){return`<span class="hl-${e}">${O(t)}</span>`}function ha(e,t,n){for(let a=t+1;a<e.length;a+=1)if(e[a]==="\\")a+=1;else if(e[a]===n)return a+1;return e.length}function Br(e){let t="",n=0;for(;n<e.length;){const a=e.slice(n);let o;if(a.startsWith("//")){const s=e.indexOf(`
`,n),r=s<0?e.length:s;t+=U("c",e.slice(n,r)),n=r}else if(a.startsWith("/*")){const s=e.indexOf("*/",n+2),r=s<0?e.length:s+2;t+=U("c",e.slice(n,r)),n=r}else if(a[0]==='"'||a[0]==="'"||a[0]==="`"){const s=ha(e,n,a[0]??"");t+=U("s",e.slice(n,s)),n=s}else if(o=/^[A-Za-z_$][\w$]*/.exec(a)){const s=o[0];t+=Wr.has(s)?U("k",s):O(s),n+=s.length}else(o=/^\d+(?:\.\d+)?/.exec(a))?(t+=U("n",o[0]),n+=o[0].length):(t+=O(a[0]??""),n+=1)}return t}function Hr(e){let t="",n=0;for(;n<e.length;){const a=e.slice(n);if(a.startsWith("<!--")){const s=e.indexOf("-->",n+4),r=s<0?e.length:s+3;t+=U("c",e.slice(n,r)),n=r;continue}const o=/^<(\/?)([A-Za-z][\w-]*)/.exec(a);if(!o){const s=e.indexOf("<",n+1),r=s<0?e.length:s;t+=O(e.slice(n,r)),n=r;continue}for(t+=`&lt;${o[1]}${U("t",o[2]??"")}`,n+=o[0].length;n<e.length&&e[n]!==">";){const s=e.slice(n);let r;if(r=/^\s+/.exec(s))t+=r[0],n+=r[0].length;else if(r=/^[A-Za-z_:][\w:.-]*/.exec(s))t+=U("a",r[0]),n+=r[0].length;else if(s[0]==="="&&(s[1]==='"'||s[1]==="'")){const i=ha(e,n+1,s[1]??"");t+=`=${U("s",e.slice(n+1,i))}`,n=i}else t+=O(s[0]??""),n+=1}e[n]===">"&&(t+="&gt;",n+=1)}return t}function Gr(e,t){return t==="js"||t==="javascript"?Br(e):t==="html"?Hr(e):O(e)}function Jr(e,t){const a=/^https?:/.test(t)?' target="_blank" rel="noopener noreferrer"':"";return`<a href="${O(t)}"${a}>${e}</a>`}const _r=["large","wide"];function Yr(e,t,n){const a=n&&_r.includes(n)?` class="${n}"`:"";return`<img src="${O(t)}" alt="${O(e)}"${a}>`}const qr=/(`[^`]+`|!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)|\[[^\]]+\]\([^)\s]+\))/g,Ur=/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/,zr=/^\[([^\]]+)\]\(([^)\s]+)\)$/;function da(e){return e.split(qr).map(t=>{if(t.startsWith("`")&&t.endsWith("`")&&t.length>1)return`<code>${O(t.slice(1,-1))}</code>`;const n=Ur.exec(t);if(n)return Yr(n[1]??"",n[2]??"",n[3]);const a=zr.exec(t);return a?Jr(da(a[1]??""),a[2]??""):O(t)}).join("")}function Kr(e){return e.split(/(<code>[\s\S]*?<\/code>)/g).map(t=>t.startsWith("<code>")?t:t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/(^|[^*])\*([^*]+)\*/g,"$1<em>$2</em>").replace(/ {2,}\n/g,"<br>").replace(/\n/g," ").replace(/ -- /g," — ")).join("")}function Q(e){return Kr(da(e))}const En=/^(?:[-*]|\d+\.)\s/;function Vr(e,t,n){if(!En.test(e[0]??""))return!1;const a=t.slice(n).find(o=>o.trim()!=="");return a!==void 0&&En.test(a)}function Xr(e){const t=[],n=e.replace(/\r\n?/g,`
`).split(`
`);let a=[],o=!1;return n.forEach((s,r)=>{if(s.startsWith("```")){o=!o,a.push(s),o||(t.push(a),a=[]);return}if(!o&&s.trim()===""){if(Vr(a,n,r+1))return;a.length&&t.push(a),a=[];return}a.push(s)}),a.length&&t.push(a),t}function Zr(e){return e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function Qr(e){const t=/^(#{1,4})\s+(.*)$/.exec(e[0]??"");if(!t||!e.slice(0,-1).every(s=>/ {2,}$/.test(s)))return null;const a=t[1]?.length??1,o=[t[2]??"",...e.slice(1)].join(`
`);return`<h${a} id="${Zr(o)}">${Q(o)}</h${a}>`}function ei(e){if(!e[0]?.startsWith("```"))return null;const t=e[0].slice(3).trim(),n=e.slice(1,-1).join(`
`);return t==="flow"?Lr(n):`<pre><code>${Gr(n,t)}</code></pre>`}function ti(e,t){const n=[];for(const a of e)t.test(a)?n.push(a.replace(t,"")):n.length&&(n[n.length-1]+=`
${a.trim()}`);return n}function ni(e){const t=e[0]??"",n=/^\d+\.\s/.test(t),a=/^[-*]\s/.test(t);if(!n&&!a)return null;const o=n?/^\d+\.\s+/:/^[-*]\s+/;if(!e.every(i=>o.test(i)||/^\s/.test(i)))return null;const s=n?"ol":"ul",r=ti(e,o).map(i=>`<li>${Q(i)}</li>`).join("");return`<${s}>${r}</${s}>`}function ai(e){return e.every(n=>n.includes(" :: "))?`<dl>${e.map(n=>{const a=n.indexOf(" :: ");return[n.slice(0,a),n.slice(a+4)]}).map(([n,a])=>`<dt>${Q(n)}</dt><dd>${Q(a)}</dd>`).join("")}</dl>`:null}function oi(e){if(!e.every(n=>n.startsWith(">")))return null;const t=e.map(n=>n.replace(/^>\s?/,"")).join(" ");return`<blockquote>${Q(t)}</blockquote>`}function si(e){const t=/^::([a-z0-9-]+)$/.exec(e[0]??"");return!t||e.length!==1?null:`<div class="app" data-app="${t[1]}"></div>`}function ri(e){return e.length===1&&/^-{3,}$/.test(e[0]??"")?"<hr>":null}function ii(e){const t=e.length===1&&/^(\\+)$/.exec(e[0]??"");return t?`<div class="space" style="--n:${t[1]?.length??1}"></div>`:null}function ci(e){return e.length===1&&/^!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)$/.test(e[0]??"")?`<figure>${Q(e[0]??"")}</figure>`:null}function li(e){return`<p>${Q(e.join(`
`))}</p>`}const hi=[ri,ii,Qr,ei,oi,si,ci,ai,ni];function ua(e){return Xr(e).map(t=>{for(const n of hi){const a=n(t);if(a!==null)return a}return li(t)}).join(`
`)}function Ct(e){return e==="/"?"~":`~${e.replace(/\/$/,"")}`}function ma(e,t){return`<p class="ran"><span class="ps1">${O(e)} $</span> ${O(t)}</p>`}function di(e,t){if(t.parent===null)return"";const n=e.childrenOf(t.route);if(n.length===0)return"";const a=n.map(o=>`<li><a class="entry" href="${o.route}"><code>${O(o.name)}/</code><span class="title">${O(o.title)}</span>`+(o.summary?`<span class="summary">${O(o.summary)}</span>`:"")+"</a></li>").join("");return`${ma(Ct(t.route),"ls")}
<ul class="listing">${a}</ul>`}function ui(e,t){const n=e.trailTo(t.route).slice(1).map(a=>a.name).join("/");return ma("~",n?`cd ${n} && cat README.md`:"cat README.md")}function mi(e,t){return`${ui(e,t)}
${ua(t.body)}
${di(e,t)}`}function pi(e,t){const n=document.querySelector("main");if(!n)return()=>!1;const a=(o,{push:s=!0,keep:r=!1}={})=>{const i=e.at(o);if(!i)return!1;r||(n.innerHTML=mi(e,i));const c=wr(i);for(const h of br){const l=c[h];l?document.documentElement.setAttribute(h,l):document.documentElement.removeAttribute(h)}document.title=i.route==="/"?"David Rodenas":`${i.title} — David Rodenas`;for(const h of document.querySelectorAll("nav .navlink"))vr(o,h.getAttribute("href")??"\0")?h.setAttribute("aria-current","page"):h.removeAttribute("aria-current");return s&&(o===window.location.pathname?window.history.replaceState({route:o},"",o):window.history.pushState({route:o},"",o),r||window.scrollTo({top:0})),window.goatcounter?.count?.({path:o,title:document.title}),t(i,r),!0};return document.addEventListener("click",o=>{if(o.defaultPrevented||o.button!==0||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey)return;const s=o.target?.closest("a[href]");if(!s||s.target||s.dataset.run)return;const r=new URL(s.href,window.location.href);if(r.origin!==window.location.origin)return;const i=r.pathname.endsWith("/")?r.pathname:`${r.pathname}/`;e.at(i)&&(o.preventDefault(),i!==window.location.pathname&&a(i))}),window.addEventListener("popstate",()=>{const o=window.location.pathname.endsWith("/")?window.location.pathname:`${window.location.pathname}/`;a(o,{push:!1})}),a}class fi{typed=[];drafts=[];index=0;get lines(){return this.typed}add(t){this.typed.push(t),this.drafts=[...this.typed,""],this.index=this.typed.length}previous(t){return this.moveTo(this.index-1,t)}next(t){return this.moveTo(this.index+1,t)}moveTo(t,n){return this.drafts.length===0&&(this.drafts=[""]),t<0||t>=this.drafts.length?n:(this.drafts[this.index]=n,this.index=t,this.drafts[t]??n)}}function gi(e,t,n,a){if(e==="k"){const o=t.slice(n);return{line:t.slice(0,n),caret:n,killed:o||a}}if(e==="u"){const o=t.slice(0,n);return{line:t.slice(n),caret:0,killed:o||a}}return e==="y"?{line:t.slice(0,n)+a+t.slice(n),caret:n+a.length,killed:a}:null}function pa(e){return e.split(/\s*(?:;|&&)\s*/).map(t=>t.trim().split(/\s+/).filter(Boolean)).filter(t=>t.length>0)}function Je(e,t){const a=t.startsWith("~")||t.startsWith("/")?[]:e.split("/").filter(Boolean),o=t.replace(/^~/,"").split("/").filter(Boolean),s=[...a];for(const r of o)r!=="."&&(r===".."?s.pop():s.push(r));return s.length===0?"/":`/${s.join("/")}/`}function yi(e){return e.replace(/(?:^|\/)(?:README\.md|\*)$/,"")||"."}const wi={name:"cat",usage:"cat <file>",description:"print a page, README.md or * for the one here",run({site:e,cwd:t},[n]){if(!n)return{text:"cat: usage: cat <file>",error:!0};const a=Je(t,yi(n)),o=e.at(a);return!o||/\.md$/.test(n)!==/README\.md$/.test(n)?{text:`cat: ${n}: no such file`,error:!0}:{html:ua(o.body),at:a}}},bi={name:"cd",usage:"cd [dir]",description:"go to a directory (the address follows)",run(e,[t="~"]){const n=Je(e.cwd,t);return e.site.at(n)?(e.cwd=n,{at:n}):{text:`cd: ${t}: no such directory`,error:!0}}},vi={name:"clear",usage:"clear",description:"clear what the shell has printed",run(){return{clear:!0}}},ki={name:"help",usage:"help [command]",description:"this",run({commands:e},[t]){if(t){const s=e.find(r=>r.name===t);return s?{text:`${s.usage}
  ${s.description}`}:{text:`help: ${t}: no such command`,error:!0}}const n=Math.max(...e.map(s=>s.usage.length));return{text:["Commands:",...e.map(s=>`${s.usage.padEnd(n)}  ${s.description}`),"","Tab completes; → takes the grey suggestion. ↑↓ recall. ^K kills to the end of the line, ^U back to the start, ^Y puts it back."].join(`
`)}}};function $i(e){const t=e.filter(a=>a.startsWith("-")).flatMap(a=>a.slice(1).split("")),n=e.find(a=>!a.startsWith("-"))??".";return{flags:t,path:n}}function xi(e,t,n){const a=n==="."?"":`${n.replace(/\/$/,"")}/`;return[{mode:"--r-",name:"README.md",title:e.title,href:e.route,run:`cat ${a}README.md`},...t.map(o=>({mode:"dr-x",name:`${o.name}/`,title:o.title,href:o.route}))]}function Cn(e){const t=e.run?` data-run="${O(e.run)}"`:"";return`<a href="${O(e.href)}"${t}>${O(e.name)}</a>`}function Ti(e,t){const n=(s,r)=>t?`${s.mode}  ${r.padEnd(20)}  ${s.title}`:r,a=s=>t?`${s.mode}  ${Cn(s)}${" ".repeat(Math.max(0,20-s.name.length))}  ${O(s.title)}`:Cn(s),o=t?[`total ${e.length}`]:[];return{text:[...o,...e.map(s=>n(s,s.name))].join(`
`),html:`<pre>${[...o,...e.map(a)].join(`
`)}</pre>`}}const Mi={name:"ls",usage:"ls [-l] [path]",description:"list what a directory holds; -l says what each is",run({site:e,cwd:t},n){const{flags:a,path:o}=$i(n),s=a.find(c=>c!=="l");if(s)return{text:`ls: -${s}: no such option. Try ls -l`,error:!0};const r=Je(t,o),i=e.at(r);return i?Ti(xi(i,e.childrenOf(r),o),a.includes("l")):{text:`ls: ${o}: no such directory`,error:!0}}},Si={name:"pwd",usage:"pwd",description:"print where you are",run({cwd:e}){return{text:Ct(e)}}},fa=[Mi,bi,wi,Si,ki,vi];class Ai{context;constructor(t,n,a=fa){this.context={site:t,cwd:n,commands:a}}get prompt(){return`${Ct(this.context.cwd)} $`}moveTo(t){return this.context.site.at(t)?(this.context.cwd=t,!0):!1}run(t){const n=[];for(const[a="",...o]of pa(t)){const s=this.context.commands.find(i=>i.name===a),r=s?s.run(this.context,o):{text:`${a}: command not found. Try help`,error:!0};if(n.push(r),r.error)break}return n}complete(t){const n=t.split(/\s+/),a=n.pop()??"",o=n.length===0?"":`${n.join(" ")} `;return(n.length===0?this.commandNames():this.pathNames(a)).filter(r=>r.startsWith(a)).map(r=>o+r)}commandNames(){return this.context.commands.map(t=>t.name).sort()}pathNames(t){const n=t.lastIndexOf("/"),a=n<0?".":t.slice(0,n+1),o=Je(this.context.cwd,a);if(!this.context.site.at(o))return[];const s=n<0?"":a;return["README.md",...this.context.site.childrenOf(o).map(i=>`${i.name}/`)].map(i=>s+i)}}function Ii(e,t,n){if(e==="")return"help";const o=[...[...t].reverse(),...n].find(s=>s.startsWith(e)&&s!==e);return o?o.slice(e.length):""}const Tt="shell-pending";function Ei(e){try{e&&sessionStorage.setItem(Tt,e)}catch{}}function Ci(){try{const e=sessionStorage.getItem(Tt)??"";return sessionStorage.removeItem(Tt),e}catch{return""}}function ji(){window.__stopTyped?.();const e=window.__typed??[];if(window.__typed=[],e.length===0)return null;const t=[];let n="";for(const a of e)a==="Enter"?(t.push(n),n=""):a==="Backspace"?n=n.slice(0,-1):n+=a;return{finished:t,unfinished:n}}function Pi(e,t,n={}){const a=document.querySelector(".terminal"),o=document.querySelector(".screen"),s=a?.querySelector("form.prompt"),r=s?.querySelector("input"),i=s?.querySelector(".line"),c=s?.querySelector(".suggest"),h=s?.querySelector(".ps1"),l=document.querySelector(".ran.end"),d=l?.querySelector(".ps1"),m=l?.querySelector(".line"),y=l?.querySelector(".typed");if(!a||!o||!s||!r||!i||!c||!h||!l||!d||!m||!y)return null;const u=()=>{h.textContent=g.prompt,d.textContent=g.prompt},g=new Ai(e,t,n.commands),v=new fi;let p=null;const w=b=>{o.append(b)},T=()=>{p?.remove(),p=null},S=()=>{const b=r.selectionStart??r.value.length;i.style.setProperty("--caret",String(b)),i.style.setProperty("--typed",String(r.value.length)),y.textContent=r.value,m.style.setProperty("--caret",String(b)),c.textContent=b===r.value.length?Ii(r.value,v.lines,g.complete(r.value)):""},M=(b,x=b.length)=>{r.value=b,r.setSelectionRange(x,x),S()},I=b=>{if(b.clear&&(o.replaceChildren(),n.clearPage?.()),b.html){const x=f("div",{class:b.text?"listing-out":"cat"});x.innerHTML=b.html,w(x)}else b.text&&w(f("pre",{class:b.error?"error":""},b.text))},$=b=>{T();const x=f("p",{class:"echo"},f("span",{class:"ps1"},g.prompt),` ${b}`);w(x);let j=!1;const D=pa(b).map(E=>E.join(" "));for(let E=0;E<D.length;E+=1){const[N]=g.run(D[E]??"");if(N){if(I(N),N.html&&!N.text&&(j=!0),N.at&&!n.moveTo?.(N.at)){Ei(D.slice(E+1).join(" && ")),window.location.assign(N.at);return}if(N.error)break}}u(),S(),j?x.scrollIntoView({block:"start"}):window.scrollTo({top:document.documentElement.scrollHeight})},C=()=>{if(T(),r.value.trim()===""){M("help");return}const b=g.complete(r.value);b.length===1?M(b[0]??r.value):b.length>1&&(p=f("p",{class:"hint"},b.map(x=>x.split(" ").pop()).join("  ")),s.insertAdjacentElement("afterend",p),window.scrollTo({top:document.documentElement.scrollHeight}))};s.addEventListener("submit",b=>{b.preventDefault();const x=r.value.trim();M(""),x&&(v.add(x),$(x))});let F="";r.addEventListener("keydown",b=>{if(b.key==="Tab")b.preventDefault(),C();else if(b.key==="ArrowUp")b.preventDefault(),M(v.previous(r.value));else if(b.key==="ArrowDown")b.preventDefault(),M(v.next(r.value));else if(b.key==="ArrowRight"&&r.selectionStart===r.value.length&&c.textContent)b.preventDefault(),M(r.value+c.textContent);else if(b.ctrlKey&&!b.metaKey&&!b.altKey){const x=gi(b.key,r.value,r.selectionStart??r.value.length,F);if(!x)return;b.preventDefault(),T(),M(x.line,x.caret),F=x.killed}else T()});for(const b of["input","keyup","click","focus","select"])r.addEventListener(b,S);let P=!0;r.addEventListener("input",()=>{P&&r.value!==""&&window.scrollTo({top:document.documentElement.scrollHeight}),P=r.value===""}),document.addEventListener("selectionchange",()=>{document.activeElement===r&&S()}),o.addEventListener("click",b=>{const x=b.target?.closest("a[data-run]");x?.dataset.run&&(b.preventDefault(),$(x.dataset.run))}),window.addEventListener("keydown",b=>{const j=b.target?.matches("input, textarea, select, [contenteditable]")??!1,D=b.key.length===1&&!b.ctrlKey&&!b.metaKey&&!b.altKey;j||!D||r.focus({preventScroll:!1})}),s.addEventListener("click",()=>r.focus()),l.addEventListener("click",()=>r.focus()),S();const A=Ci();A&&$(A);const k=ji();if(k){for(const b of k.finished)b.trim()&&(v.add(b.trim()),$(b.trim()));M(k.unfinished),r.focus()}return{run:$,moveTo:b=>{g.moveTo(b)&&(o.replaceChildren(),u(),S())}}}const Di=[{file:"book/index.md",markdown:`---
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
of it is documentation. [The whole account.](/open-source/angularjs/)

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

- [NO2 by the hour and the month](/open-data/no2/) -- thirty years of hourly measurements, averaged by hour of the day and month of the year. A city's working day turns out to have a shape, and it does not reach the top of the hill.
- [Hot nights, counted](/open-data/hot-nights/) -- how many nights a year never cool below 20 °C, at nine weather stations, and whether the second half of each record differs from the first.

Use \`ls\` to see them, or \`cat no2\` to read one here.
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
`},{file:"open-source/angularjs.md",markdown:`---
title: Two public APIs of AngularJS are mine
summary: Core work in AngularJS, none of it documentation — the compiler, ngClass, the testing module, two benchmark suites and a directive — and what is still in the final release.
order: 1
was: /code/
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
`},{file:"open-source/index.md",markdown:`---
title: Open source
summary: Code of mine that is in other people's hands: what is still inside AngularJS, the npm packages strangers install, and what else is public.
order: 3
---

# Open source

Most of what I have written belongs to whoever paid for it. This is the part
that does not: code that is public, and that other people have run, merged,
or built on.

- [AngularJS](/open-source/angularjs/) -- two public APIs of the compiler are mine, with the \`ngClass\` rewrite built on my work, the testing module's \`$componentController\`, two benchmark suites and a directive. All of it still in 1.8.3, the last release the framework had. The whole account, commit by commit.
- [What strangers install](/open-source/packages/) -- thirty-four npm packages, most written for one project. A few kept being downloaded for years by people nobody told about them: what npm counted, year by year.

Elsewhere on this site, and just as public:

- [Worlds](/worlds/) -- the fractal planet generator of 1999, [Mons fractals](https://github.com/drpicox/mons-fractals), rewritten here with its dials outside.
- [Raft, and a recipe for concurrency](/teaching/raft/) -- [a consensus algorithm in one Java class](https://github.com/drpicox/uoc-raft-2013p), from the year before its paper was presented.
- [Research](/research/) -- the tools of my thesis were released under the GPL: the [stream compiler](https://github.com/drpicox/acotescc), its [runtime](https://github.com/drpicox/acolib) and a [tracing library](https://github.com/drpicox/mintaka).
- [The next word](/projects/next-word/) and [a relativistic rocket](/projects/rocinante/) -- two small things rewritten for this site, each with its original a link away.

And this site itself, with nothing underneath it:
[drpicox/david-rodenas.com](https://github.com/drpicox/david-rodenas.com).

Use \`ls\` to see them, or \`cat angularjs\` to read one here.
`},{file:"open-source/packages.md",markdown:`---
title: What strangers install
summary: Thirty-four npm packages, most written for one project. A few kept being downloaded for years, by people nobody told about them.
order: 2
was: /projects/packages/
---

# What strangers install

Thirty-four packages on npm are mine. Most were written for one project and
are of interest only to it. None was ever promoted, and a few kept being
installed anyway, years after I had stopped looking:

::packages

Each row of bars is on its own scale: it shows the shape of a package's life,
and the number beside it says how much.

## What is in it

- **\`string-cache-map\` had its best year four years after it was written.**
  It is from 2018 and was downloaded a few hundred times a year until 2021;
  in 2022 it was downloaded fifty thousand times.
- **\`async-barrier\` is still growing.** Its best year so far is 2024, six
  years after it was published, and it is a helper for writing tests.
- **\`grunt-frontmatter\` is the other shape**: it peaked in 2017 with Grunt
  itself, and has been going quietly ever since.

## What it is not

A download is not a person. The registry counts every mirror, every robot and
every build server that ever ran an install, and one company's continuous
integration can be most of a package's year. What the numbers do say is that
the code is in use somewhere, by someone who found it on their own and did not
replace it.
`},{file:"projects/index.md",markdown:`---
title: Projects
summary: Things built to be looked at and played with: a language model you can count by hand, and a relativistic rocket.
order: 10
---

# Projects

Small things, each made to show one idea by letting you move it.

- [The next word](/projects/next-word/) -- a language model with everything taken away but the idea: count which word follows which, then throw the dice. Let it read this website.
- [A relativistic rocket](/projects/rocinante/) -- how long a trip takes on board and how long for those left at home, and why a ship that crosses the solar system in days cannot reach a star in a lifetime.

Use \`ls\` to see them, or \`cat next-word\` to read one here.
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

The map is the neighbourhood: every star within twelve light-years of the
Sun, each on a stem down to the plane of the celestial equator, so that the
eye can tell above from below. Drag it to turn it. The ship flies the chosen
trip over and over with its two clocks beside it — watch them part when the
ship is fast. Press a row of the table, or a ringed star, to fly there.

The ship it opens with is a fusion torch: thirty thousand tonnes, a sixth of
it fuel, a third of a g.

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

Straight lines from a standing start, and star positions good to a picture, not to a navigator: no orbits, no launch windows, no gravity
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
`},{file:"research/graph-matching.md",markdown:`---
title: Graph matching on a desktop
summary: Universitat Rovira i Virgili, 2009–2011. Two computer-vision algorithms rewritten for CUDA and OpenMP on an eighteen-watt desktop: an hour and a quarter became under two minutes, without changing the result by a bit.
order: 2
---

# Graph matching on a desktop

The second half of [the thesis](/research/), at the Universitat Rovira i
Virgili between 2009 and 2011: the [tools of the first
half](/research/parallel-tools/), put to work on a problem that needed them.

Computer vision likes to describe things as graphs: a house is a roof, a
door, two windows, and how they touch. Comparing two graphs exactly is
exponential in their size, and even the good approximations were too slow to
use outside a laboratory.

I took two of those algorithms, graduated assignment for a pair of graphs and
for the common labelling of many, and rewrote them for what a desktop had
become: a multi-core processor beside a graphics card. The method is what the
first half had taught. Transform the equations, not the code — splitting,
tiling and reordering loops in a notation close to the mathematics — so that
the program falls into the same two levels of parallelism, and the result
does not change by a single bit.

The machine was chosen for what it did not have: an Intel Atom with two
cores, the kind put in netbooks, and the small graphics chip sold beside it.
Eighteen watts between them.

::graph-matching-runs

Matching every pair of 150 graphs of 24 vertices took one thread an hour and
a quarter. OpenMP on the same two cores brought it to twenty minutes; the
graphics chip, to under two. The common labelling of fifty such graphs went
from twenty hours to thirty-nine minutes. And the larger the graphs, the
larger the gain — sixteen, twenty-two, forty times — which is the right way
round: it is the large ones that were out of reach.

That is close to real time, on hardware a robot or a fingerprint reader could
carry, which is what the algorithms had been waiting for.

Both are first-author papers in Springer's Lecture Notes in Computer Science:
[IbPRIA 2011](https://doi.org/10.1007/978-3-642-21257-4_63) and
[GbR 2011](https://doi.org/10.1007/978-3-642-20844-7_14).
`},{file:"research/index.md",markdown:`---
title: Research
summary: A PhD on making parallel hardware usable by people who are not parallel programmers. Runtimes, a simulator, a compiler, and then graph matching on a GPU.
order: 6
---

# Research

In 2003 every new processor had run old programs faster for twenty-five
years, and it seemed it would last for ever. My thesis began from the hunch
that it would not: that the desktop would go multi-core, and that the problem
would stop being the hardware and become **the programmer**, who now had to
write many coordinated lists of instructions instead of one, and mostly did
not know how.

So the question of the whole PhD is one of usability. Supercomputers had been
parallel for decades, and most of their users were not computer scientists.
What they used, OpenMP, lets you take a serial program and annotate it, a
line at a time, until it runs in parallel. Could that way of working be
carried to the machines everyone was about to own, which did not share
memory, and whose cores were not all the same?

*Algorithms Acceleration of Pattern-Matching in Multi-Core Architectures*,
Universitat Rovira i Virgili, defended in Tarragona on 8 July 2011, cum laude,
directed by Francesc Serratosa. Eight years, two universities, and an unusual
spread for one thesis: a runtime, a simulator, a compiler, and an algorithm.

## What is in it

- [Tools for parallel machines](/research/parallel-tools/) -- UPC and the Barcelona Supercomputing Center, 2003–2008. OpenMP on a chip with 128 hardware threads, written with IBM Research; OpenMP on a cluster with no shared memory; a simulator of a heterogeneous processor; and a compiler that turns annotated serial C into streams, in a European project.
- [Graph matching on a desktop](/research/graph-matching/) -- Universitat Rovira i Virgili, 2009–2011. Two computer-vision algorithms rewritten for CUDA and OpenMP on an eighteen-watt desktop, with the measurements: up to forty times faster, without changing the result by a bit.

In between the two I spent a year making the core of a database engine
concurrent.

## What it left

The thesis ends on a sentence I still use: *desktop computers are indeed
desktop supercomputers, not only by their performance, but also by their
complexity*. Its tools were released under the GPL, and its last slide argued
that research software should be published with its sources, the way a paper
is published with its proofs.

And it left a habit. Everything I have built since for other engineers — a
platform, a test harness, a course — starts from the question this started
from: not what the machine can do, but what the person in front of it can be
expected to get right. A small case of it: [the recipe for concurrency](/teaching/raft/) I
wrote a consensus algorithm by, so that students could.

The thesis lists sixteen publications. The record:
[the thesis, at Dialnet](https://dialnet.unirioja.es/servlet/tesis?codigo=99231),
and [what DBLP indexes](https://dblp.org/pid/36/5675).

Use \`ls\` to see the parts, or \`cat parallel-tools\` to read one here.
`},{file:"research/parallel-tools.md",markdown:`---
title: Tools for parallel machines
summary: UPC and the Barcelona Supercomputing Center, 2003–2008. OpenMP on a chip with 128 threads and on a cluster with no shared memory, a simulator of a heterogeneous processor, and a compiler that turns serial C into streams.
order: 1
---

# Tools for parallel machines

The first half of [the thesis](/research/), at UPC and the Barcelona
Supercomputing Center between 2003 and 2008. Four pieces of work with one
aim: that a program written one line after another can be made parallel by
annotating it, a line at a time, on machines that make that hard.

OpenMP on many cores :: IBM's Cyclops put 32 cores and 128 hardware threads on one chip, with small caches. A first port of OpenMP to it had scaled poorly. I found why: the threads' stacks were fighting over the same cache lines. I fixed it twice, once in the runtime and once as a change proposed to the hardware, and showed scalability 40% to 100% better than the earlier port, and speed-ups above 80 on the multi-zone benchmarks. Written with IBM T.J. Watson Research; I am first author. [IPDPS 2005](https://doi.org/10.1109/IPDPS.2005.317).
OpenMP without shared memory :: The same annotated programs running on a cluster, over software distributed shared memory instead of MPI. It works, and it works best on programs with two levels of parallelism, coarse outside and fine inside. That observation came back six years later.
A simulator of a heterogeneous chip :: CellSim, a modular simulator of the Cell processor, built by two teams; I am third author of its papers. The accelerator cores are the other team's. Ours was the rest, and what I wrote is its base: the general-purpose core, which is an interpreter of its PowerPC instructions; the emulation of the operating system under it, where a system call runs natively and reaches into the simulated program's memory as it needs to; the loader that puts a compiled binary in that memory; and the protocol by which modules talk to each other purely as memory accesses, so that any of them can be connected to any other. A program compiled for the real chip ran on it unchanged: only the library of system calls and threads had to be swapped for mine. My thesis calls the protocol its best contribution.
A compiler for streams :: In the European project ACOTES, with NXP, IBM Haifa, INRIA and STMicroelectronics: annotations that turn a serial C program into a pipeline of tasks passing data along. Two clauses, \`input\` and \`output\`, are enough. I wrote the ACOTES phase of the BSC's Mercurium compiler — the compiler itself is not mine — with its runtime library and a tracing library. [SAMOS 2007](https://doi.org/10.1007/978-3-540-73625-7_13), and the consortium's paper in the [International Journal of Parallel Programming](https://doi.org/10.1007/s10766-010-0132-7).

## What connects them

Each piece took away something OpenMP assumed: that caches were large, that
memory was shared, that the cores were all alike, that the program was a loop
rather than a stream. What survived every time was the way of working: keep the serial program, keep it readable, and
say in the margin what may run together. The thesis calls it incremental
parallelisation, and its conclusions call it the corner stone of everything
else in it.

Next: [what all this was for](/research/graph-matching/).
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

Also in here, from another university and another year: [Raft, and a recipe
for concurrency](/teaching/raft/) -- a consensus algorithm as a laboratory
assignment, and three steps that let someone writing their first concurrent
program get it right.

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
implements it.* Within a team, one student wrote the post and another built
it, so sooner or later the two had to sit down over a sentence that one of
them had thought was clear. That was the lesson, and no lecture gives it: what
you wrote is what the other person understood, and the only way to find out
the difference is to watch someone build from it. Then you learn to write the
next one better.

The compiler did its part: it read the steps and refused the vague ones.
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
`},{file:"teaching/raft.md",markdown:`---
title: Raft, and a recipe for concurrency
summary: A consensus algorithm as a laboratory assignment in 2013, and the three-step recipe that lets someone who has never written concurrent code get it right.
order: 1
---

# Raft, and a recipe for concurrency

In the autumn of 2013 the distributed systems laboratory at the UOC set its
students a consensus algorithm to implement: Raft, which was then a draft
going round, a year away from being presented. I worked on that laboratory,
and [my implementation is public](https://github.com/drpicox/uoc-raft-2013p):
one Java class over the course's skeleton, dated October 2013.

Raft was designed to be understandable, and it is. The hard part of the
assignment is somewhere else. A server is doing four things at once —
timing out, asking for votes, answering other servers' requests, replicating
its log — every one of them reads and writes the same few fields, and between
any two lines the network may hand it a message that makes it a different
kind of server. That is a lot to ask of someone writing their first
concurrent program.

## The recipe

So the implementation follows a recipe simple enough to be followed by
someone who cannot yet reason about interleavings, and still concurrent:

\`\`\`flow
lock1[1 · inside the guard\\ncheck who you are\\ncopy what you need] --> out[2 · outside the guard\\ncompute, wait, talk\\nto the network]
out --> lock2[3 · inside the guard again\\ncheck nothing changed\\nonly then write]
lock2 -->|something changed| drop[give up quietly\\nthe next timeout\\nwill try again]
\`\`\`

1. **One guard for all the state.** Not a lock per field: one. Take it,
   check that you are still what you think you are — *only leaders send
   heartbeats* — and copy everything you are about to need into local
   variables that nothing else can touch.
2. **Let go before doing anything slow.** Never hold the guard across the
   network. The remote call runs with the copies, on another thread, for as
   long as it takes, and the server goes on answering everyone else.
3. **Take the guard again, and trust nothing.** The answer arrives in a world
   that has moved. Am I still the leader? Is it still the same term? Is this
   follower's index still where I left it? If any answer is no, drop the
   result and return. There is nothing to undo, because nothing was written.

That is the whole of it, and the code says so in its own comments: *gather
common info (from iteration to iteration may become rotten)* going in, and
*execute inside the guard, any sent data could be changed and must be
reevaluated* coming back.

## Why it works

It removes the two things a beginner gets wrong. There is one lock, so there
is no order of locks to get wrong and no deadlock. And no lock is held while
waiting, so nothing stalls behind a slow server. What is left is the one real
difficulty, stale data, and the recipe turns it from something to reason
about into something to check: a list of \`if\`s at the top of step three.

It costs something. Work is sometimes thrown away, and it leans on Raft
being built the same way — terms and indices are exactly the version numbers
step three needs. But that is not a coincidence to apologise for. Optimistic
concurrency, compare-and-swap, a database's \`UPDATE … WHERE version = ?\`:
read, work outside, write only if nothing moved. It is the pattern most
concurrent code that works turns out to have.

Making parallel machines usable by people who are not parallel programmers
was [what my PhD was about](/research/). This was the same problem, with
students in place of scientists.
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
`}],jn="---";function Oi(e){return(/^"(.*)"$/.exec(e)??/^'(.*)'$/.exec(e))?.[1]??e}function Ri(e){const t=e.replace(/\r\n?/g,`
`).split(`
`);if(t[0]?.trim()!==jn)return{fields:{},body:e.trim()};const n=t.indexOf(jn,1);if(n<0)return{fields:{},body:e.trim()};const a={};for(const o of t.slice(1,n)){const s=o.indexOf(":");s<=0||(a[o.slice(0,s).trim()]=Oi(o.slice(s+1).trim()))}return{fields:a,body:t.slice(n+1).join(`
`).trim()}}function Ni(e){const n=e.replace(/\.md$/,"").replace(/(^|\/)index$/,"");return n===""?"/":`/${n}/`}function Fi(e){if(e==="/")return null;const t=e.slice(0,-1);return t.slice(0,t.lastIndexOf("/")+1)}function Pn(e){if(e==="/")return"/";const t=e.slice(0,-1);return t.slice(t.lastIndexOf("/")+1)}function Li(e){const{fields:t,body:n}=Ri(e.markdown),a=Ni(e.file);return{file:e.file,route:a,parent:Fi(a),name:Pn(a),title:t.title??Pn(a),summary:t.summary??"",order:Number(t.order??"100"),body:n,fields:t}}function Dn(e,t){return e.order-t.order||e.name.localeCompare(t.name)}class Wi{byRoute;constructor(t){const n=t.map(Li).sort(Dn);this.byRoute=new Map(n.map(a=>[a.route,a]))}get pages(){return[...this.byRoute.values()]}at(t){return this.byRoute.get(t)}childrenOf(t){return this.pages.filter(n=>n.parent===t).sort(Dn)}trailTo(t){const n=this.at(t);return n?n.parent===null?[n]:[...this.trailTo(n.parent),n]:[]}}const ge=new Wi(Di);function On(){const e=[...fa,...fe.flatMap(l=>l.commands??[])],t=Object.assign({},...fe.map(l=>l.apps??{})),a=(l=>l.endsWith("/")?l:`${l}/`)(window.location.pathname),o=ge.at(a);let s=Mn(t,{site:ge}),r=null;const i=pi(ge,(l,d)=>{s(),s=Mn(t,{site:ge});for(const m of fe)m.arrive?.(l);d||r?.moveTo(l.route)});if(r=Pi(ge,o?a:"/",{moveTo:l=>i(l,{keep:!0}),clearPage:()=>{s(),s=()=>{},document.querySelector("main")?.replaceChildren()},commands:e}),o)for(const l of fe)l.arrive?.(o);const h={run:l=>r?.run(l)};for(const l of fe)l.install?.(h)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",On):On();
