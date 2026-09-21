function p(e,t={},...n){const a=document.createElement(e);for(const[s,o]of Object.entries(t))o===void 0||o===!1||(typeof o=="function"?a.addEventListener(s.slice(2).toLowerCase(),o):o===!0?a.setAttribute(s,""):a.setAttribute(s,String(o)));for(const s of n)s==null||s===!1||a.append(s);return a}const ga={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function I(e){return e.replace(/[&<>"]/g,t=>ga[t]??t)}const wa=["January","February","March","April","May","June","July","August","September","October","November","December"];function Pe(e){const[t,n,a]=e.refreshed.split("-").map(Number),s=`${a} ${wa[(n??1)-1]} ${t}`,o=`${Math.min(...e.years)} to ${Math.max(...e.years)}`;return`<p class="source">Source: ${I(e.attribution)} <a href="${I(e.dataset)}">The dataset, at its source.</a> This site keeps sums of the finished years ${o}, last added to on ${s}.</p>`}function yt(e,t){const n=e.querySelector("p.source");if(n)return n;const a=document.createElement("div");return fetch(t).then(s=>s.json()).then(s=>{a.innerHTML=Pe(s)}).catch(()=>{}),a}const ee=[{code:"08019004",name:"Barcelona (Poblenou)",kind:"background",area:"urban"},{code:"08019043",name:"Barcelona (Eixample)",kind:"traffic",area:"urban"},{code:"08019044",name:"Barcelona (Gràcia - Sant Gervasi)",kind:"traffic",area:"urban"},{code:"08019057",name:"Barcelona (Palau Reial)",kind:"background",area:"urban"},{code:"08019058",name:"Barcelona (Observatori Fabra)",kind:"background",area:"suburban"},{code:"08015021",name:"Badalona",kind:"background",area:"urban"},{code:"08187012",name:"Sabadell",kind:"traffic",area:"urban"},{code:"17079003",name:"Girona (Escola de Música)",kind:"traffic",area:"urban"},{code:"25120001",name:"Lleida",kind:"traffic",area:"urban"},{code:"43148028",name:"Tarragona (Parc de la Ciutat)",kind:"background",area:"urban"},{code:"08137001",name:"Montseny (La Castanya)",kind:"background",area:"rural"}];function st(e,t){return t==="workdays"?[e.workdays]:t==="weekends"?[e.weekends]:[e.workdays,e.weekends]}const ya=e=>(e%4===0&&e%100!==0||e%400===0?366:365)*24,Je=e=>e.reduce((t,n)=>t+n.reduce((a,s)=>a+s,0),0);function ba(e,t){return Object.entries(e.years).map(([n,a])=>{const s=st(a,t),o=s.reduce((c,h)=>c+Je(h.counts),0),r=s.reduce((c,h)=>c+Je(h.sums),0),i=st(a,"all").reduce((c,h)=>c+Je(h.counts),0);return{year:Number(n),mean:o>0?r/o:Number.NaN,measured:i/ya(Number(n))}}).filter(({mean:n})=>!Number.isNaN(n)).sort((n,a)=>n.year-a.year)}function va(e,t){const n=Object.entries(e.years).filter(([a])=>Number(a)>=t.from&&Number(a)<=t.to).flatMap(([,a])=>st(a,t.days));return Array.from({length:24},(a,s)=>Array.from({length:12},(o,r)=>{const i=n.reduce((h,l)=>h+(l.sums[r]?.[s]??0),0),c=n.reduce((h,l)=>h+(l.counts[r]?.[s]??0),0);return{mean:c>0?i/c:null,count:c}}))}const Z=[[0,[0,255,0]],[20,[225,225,0]],[40,[255,0,0]],[60,[225,0,225]],[80,[64,0,64]],[230,[16,0,8]]],ka=([e,t,n])=>(.299*e+.587*t+.114*n)/255;function bt(e){const t=Math.max(0,Math.min(e,230)),n=Math.max(1,Z.findIndex(([h])=>h>=t)),[a,s]=Z[n-1]??Z[0],[o,r]=Z[n]??Z[Z.length-1],i=(t-a)/(o-a),c=s.map((h,l)=>Math.round(h+((r[l]??0)-h)*i));return{background:`rgb(${c.join(",")})`,light:ka(c)<.45}}const Ie=80,An=["January","February","March","April","May","June","July","August","September","October","November","December"],In=e=>String(e+1).padStart(2,"0");function $a(e,t,n){if(e.mean===null)return'<td class="none"></td>';const{background:a,light:s}=bt(e.mean),o=s?' class="deep"':"",r=`${An[n]}, hour ${In(t)}: ${e.mean.toFixed(1)} µg/m³, the mean of ${e.count} measurements`;return`<td${o} style="background:${a}" title="${r}">${Math.round(e.mean)}</td>`}function xa(e){const t=`<tr><th></th>${An.map(a=>`<th scope="col">${a.slice(0,3)}</th>`).join("")}</tr>`,n=e.map((a,s)=>`<tr><th scope="row">${In(s)}</th>${a.map((o,r)=>$a(o,s,r)).join("")}</tr>`);return`<table class="heat graded"><thead>${t}</thead><tbody>${n.join("")}</tbody></table>`}function vt(e){if(e<=0)return[0];const t=10**Math.floor(Math.log10(e)),n=e/t>=5?t:e/t>=2?t/2:t/5,a=[];for(let s=0;s<=e;s+=n)a.push(Math.round(s*100)/100);return a}const we=720,Ge=190,G={top:14,right:8,bottom:22,left:34},O=e=>e.toFixed(1);function En(e,t,n){const a=Math.min(...e),s=Math.max(...e),o=we-G.left-G.right,r=Ge-G.top-G.bottom,i=o/Math.max(1,s-a+1),c=u=>G.left+(u-a)*i,h=u=>G.top+r-(u-t)/Math.max(1e-9,n-t)*r,d=vt(n-t).map(u=>Math.round((u+t)*100)/100).map(u=>`<line class="grid" x1="${G.left}" x2="${we-G.right}" y1="${O(h(u))}" y2="${O(h(u))}"/><text x="${G.left-4}" y="${O(h(u)+3)}" text-anchor="end">${u}</text>`).join(""),m=s-a>12?5:1,w=Array.from({length:s-a+1},(u,g)=>a+g).filter(u=>u%m===0).map(u=>`<text x="${O(c(u)+i/2)}" y="${Ge-6}" text-anchor="middle">${u}</text>`).join("");return{slot:i,x:c,y:h,left:G.left,right:we-G.right,top:G.top,height:r,levels:u=>u.map(({from:g,to:v,value:f,label:b})=>`<line class="span" x1="${O(c(g))}" x2="${O(c(v)+i)}" y1="${O(h(f))}" y2="${O(h(f))}"/><text class="span" x="${O((c(g)+c(v)+i)/2)}" y="${O(h(f)-5)}" text-anchor="middle">${b}</text>`).join(""),wrap:(u,g)=>`<svg class="years" viewBox="0 0 ${we} ${Ge}" role="img" aria-label="${u}">${d}${w}${g}</svg>`}}function rt(e,t){const n=Math.max(t.top??0,...e.map(({value:l})=>l),1),a=En(e.map(({year:l})=>l),0,n),{x:s,y:o,slot:r}=a,i=e.map(({year:l,value:d,title:m,chosen:w,partial:u,colour:g})=>`<rect class="${["bar",w?"chosen":"",u?"partial":""].filter(Boolean).join(" ")}" data-year="${l}"${g?` style="--bar:${g}"`:""} x="${O(s(l)+r*.15)}" y="${O(o(d))}" width="${O(r*.7)}" height="${O(o(0)-o(d))}"/><rect class="hit" data-year="${l}" x="${O(s(l))}" y="${a.top}" width="${O(r)}" height="${a.height}"><title>${m}</title></rect>`).join(""),c=(t.references??[]).map(({value:l,label:d})=>`<line class="reference" x1="${a.left}" x2="${a.right}" y1="${O(o(l))}" y2="${O(o(l))}"/><text class="reference" x="${a.right-2}" y="${O(o(l)-3)}" text-anchor="end">${d}</text>`).join(""),h=a.levels(t.spans??[]);return a.wrap(t.label,`${i}${c}${h}`)}const Ta=.75,Ma=[{value:40,label:"EU limit, 40"},{value:10,label:"WHO guideline, 10"}];function Sa(e,t){const n=e.map(({year:a,mean:s,measured:o})=>{const r=o<Ta,i=r?`, from only ${Math.round(o*100)}% of the year's hours`:"";return{year:a,value:s,partial:r,colour:bt(s).background,chosen:a>=t.from&&a<=t.to,title:`${a}: ${s.toFixed(1)} µg/m³${i}`}});return rt(n,{label:"Mean NO2 of each year, µg/m³",top:Ie,references:Ma})}const Ht={all:"every day of the week",workdays:"Monday to Friday",weekends:"Saturdays and Sundays"};function Aa(){const e=Array.from({length:Ie/5+1},(n,a)=>bt(a*5).background),t=[0,20,40,60,Ie].map(n=>`<span>${n===Ie?`${n}+`:n}</span>`).join("");return`<div class="scale" aria-hidden="true"><div class="ramp" style="background:linear-gradient(to right,${e.join(",")})"></div><div class="ticks">${t}</div><div class="ticks words"><span>clean</span><span>EU limit</span><span>twice it</span></div></div>`}function Cn(e,t){const n=Object.keys(e.years).map(Number),a=Math.max(t.from,Math.min(...n)),s=Math.min(t.to,Math.max(...n)),o=a===s?String(a):`${a}–${s}`;return`<figure class="no2"><figcaption><strong>${e.name}</strong> · ${e.kind}, ${e.area} · mean NO2 in µg/m³ by hour of the day and month of the year · ${Ht[t.days]}, ${o}</figcaption>`+xa(va(e,t))+Aa()+`<h4>The mean of each year, ${Ht[t.days]}</h4>`+Sa(ba(e,t.days),{from:a,to:s})+"</figure>"}function it(e){const t=Object.keys(e.years).map(Number);return{from:Math.min(...t),to:Math.max(...t),days:"all"}}const Ia=[["all","every day"],["workdays","Monday to Friday"],["weekends","Saturday and Sunday"]];function Ea(e){const t=new Map,n=yt(e,"/data/no2/index.json"),a=p("div");a.append(...e.querySelectorAll("figure"));let s=null,o={from:0,to:9999,days:"all"},r=!1;const i=(f,b=String(f))=>p("option",{value:f},b),c=p("select",{onchange:()=>{g(c.value)}},...ee.map(({code:f,name:b})=>i(f,b))),h=p("select",{onchange:()=>u({days:h.value})},...Ia.map(([f,b])=>i(f,b))),l=p("select",{onchange:()=>u({from:Number(l.value),to:Math.max(Number(l.value),o.to)})}),d=p("select",{onchange:()=>u({to:Number(d.value),from:Math.min(Number(d.value),o.from)})}),m=p("button",{type:"button",onclick:()=>s&&u(it(s))},"every year");function w(){s&&(a.innerHTML=Cn(s,o),l.value=String(o.from),d.value=String(o.to),h.value=o.days)}function u(f){o={...o,...f},w()}async function g(f){const b=t.get(f)??fetch(`/data/no2/${f}.json`).then(x=>x.json());t.set(f,b);try{const x=await b;if(r||c.value!==f)return;s=x,o={...it(x),days:o.days};const A=Object.keys(x.years);l.replaceChildren(...A.map(M=>i(M))),d.replaceChildren(...A.map(M=>i(M))),w()}catch{t.delete(f),a.replaceChildren(p("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}a.addEventListener("click",f=>{const b=f.target?.closest("[data-year]")?.getAttribute("data-year");b&&u({from:Number(b),to:Number(b)})});const v=p("div",{class:"row"},p("label",{},"Station ",c),p("label",{},"Days ",h),p("label",{},"Years ",l," to ",d),m);return e.replaceChildren(v,a,n),g(c.value),()=>{r=!0}}const Ca="https://analisi.transparenciacatalunya.cat/resource";function jn(e,t){const n=new URL(`${Ca}/${e}.json`);for(const[a,s]of Object.entries(t))s!==void 0&&n.searchParams.set(`$${a}`,String(s));return n.toString()}const Jt="tasf-thgu",Dn=Array.from({length:24},(e,t)=>String(t+1).padStart(2,"0")),ja=0,Da=6,ye=()=>Array.from({length:12},()=>new Array(24).fill(0)),Oa=()=>({workdays:{sums:ye(),counts:ye()},weekends:{sums:ye(),counts:ye()}});function Pa(e){if(!Array.isArray(e))throw new Error("the portal did not answer with rows");if(e.length===0)throw new Error("the portal answered with no rows");return e}function Na(e,t){const n=Number(t.month)-1;Dn.forEach((a,s)=>{const o=e.sums[n],r=e.counts[n];if(!o||!r)throw new Error(`month ${t.month} is not a month`);o[s]=(o[s]??0)+Number(t[`s${a}`]??0),r[s]=(r[s]??0)+Number(t[`n${a}`]??0)})}const Ra={name:"no2",directory:"public/data/no2",firstYear:1991,files:ee.map(e=>`${e.code}.json`),about:{measures:"NO2, hourly, µg/m³",network:"Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica",attribution:"Generalitat de Catalunya, Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica. Dades obertes.",dataset:`https://analisi.transparenciacatalunya.cat/d/${Jt}`,stations:ee},requestsFor(e){const t=ee.map(a=>`'${a.code}'`).join(","),n=Dn.map(a=>`sum(h${a}) as s${a}, count(h${a}) as n${a}`).join(", ");return[jn(Jt,{select:`codi_eoi, date_extract_m(data) as month, date_extract_dow(data) as dow, count(*) as days, ${n}`,where:`contaminant='NO2' and codi_eoi in (${t}) and data between '${e}-01-01T00:00:00' and '${e}-12-31T23:59:59'`,group:"codi_eoi,month,dow",limit:5e3})]},withYear(e,t,n){const a=Pa(n[0]);if(a.some(o=>Number(o.days)>5))throw new Error("some days are in the portal twice");if(!a.some(o=>o.month==="12"))throw new Error("the year does not reach December yet");const s=new Map;for(const o of a){const r=o.codi_eoi??"",i=s.get(r)??Oa();s.set(r,i);const c=Number(o.dow);Na(c===ja||c===Da?i.weekends:i.workdays,o)}return Object.fromEntries(ee.map(o=>{const r=`${o.code}.json`,i=s.get(o.code),c={...e[r]?.years,...i?{[t]:i}:{}};return[r,{...o,years:c}]}))}},Fa=e=>{const t=JSON.parse(e(`/data/no2/${ee[0]?.code}.json`)),n=JSON.parse(e("/data/no2/index.json"));return Cn(t,it(t))+Pe(n)},La={name:"air-quality",apps:{no2:Ea},stills:{no2:Fa},sources:[Ra]},ne=5,Ne=8,oe=e=>Math.max(0,Math.min(100,e));function Gt(e){const{focus:t,fatigue:n,featureSize:a,weeks:s,calendar:o,meetingTypes:r}=e,i=[];let c=0,h=0;for(let l=0;l<s;l+=1)for(let d=0;d<ne;d+=1){let m=0,w=0;for(let u=0;u<Ne;u+=1){const g=r[o[`${d}-${u}`]??""];if(g){m=oe(m+g.focus),w=oe(w+g.fatigue),i.push({week:l,day:d,hour:u,inMeeting:!0,hourFocus:m,hourFatigue:w,hourProductivity:0,accumulatedProductivity:c,completedFeatures:h,featureCompleted:!1});continue}m=oe(m+t),w=oe(w+n);const v=oe(m-w),f=a-c,b=v>f,x=b?f:v;b?(h+=1,c=0):c+=x,i.push({week:l,day:d,hour:u,inMeeting:!1,hourFocus:m,hourFatigue:w,hourProductivity:x,accumulatedProductivity:c,completedFeatures:h,featureCompleted:b}),b&&(m=0)}}return i}function be(){return Array.from({length:Ne},()=>new Array(ne).fill(0))}function ve(e,{hour:t,day:n},a){const s=e[t];s&&(s[n]=(s[n]??0)+a)}function _t(e,{featureSize:t,weeks:n}){const a=e[e.length-1],s=a?.completedFeatures??0,o=a?.accumulatedProductivity??0,r=s+Math.round(10*o/t)/10,i=s*t+o,c=Array.from({length:ne},()=>({productivity:0,features:0,meetings:0})),h={focus:be(),fatigue:be(),productivity:be(),features:be()};for(const d of e){const m=c[d.day];m.productivity+=d.hourProductivity,d.featureCompleted&&(m.features+=1),d.inMeeting&&(m.meetings+=1),ve(h.focus,d,d.hourFocus),ve(h.fatigue,d,d.hourFatigue),ve(h.productivity,d,d.hourProductivity),d.featureCompleted&&ve(h.features,d,1)}const l=d=>d.map(m=>m.map(w=>n>0?w/n:0));return{totalFeatures:r,totalProductivity:i,averageFeaturesPerWeek:n>0?r/n:0,averageProductivityPerWeek:n>0?i/n:0,days:c,hours:{focus:l(h.focus),fatigue:l(h.fatigue),productivity:l(h.productivity),features:h.features}}}const je=480,K=240,N={top:10,right:10,bottom:34,left:36};function On(e,t,n,a){const s=je-N.left-N.right,o=K-N.top-N.bottom,r=h=>N.top+o-(e>0?h/e*o:0),i=a.map(h=>`<line class="grid" x1="${N.left}" x2="${je-N.right}" y1="${r(h)}" y2="${r(h)}"/><text x="${N.left-4}" y="${r(h)+3}" text-anchor="end">${h}</text>`).join(""),c=(n>1?[1,Math.ceil(n/2),n]:[]).filter((h,l,d)=>d.indexOf(h)===l).map(h=>`<text x="${N.left+(h-1)/Math.max(1,n-1)*s}" y="${K-N.bottom+14}" text-anchor="middle">${h}</text>`).join("");return`${i}${c}<text x="${N.left+s/2}" y="${K-6}" text-anchor="middle">${t.x}</text><text transform="translate(9 ${N.top+o/2}) rotate(-90)" text-anchor="middle">${t.y}</text>`}function Wa(e,t){const n=Math.max(...e.map(l=>l.values.length),1),a=Math.max(1,...e.flatMap(l=>l.values)),s=je-N.left-N.right,o=K-N.top-N.bottom,r=l=>N.left+l/Math.max(1,n-1)*s,i=l=>N.top+o-l/a*o,c=e.map(l=>{const d=l.values.map((m,w)=>`${r(w).toFixed(1)},${i(m).toFixed(1)}`).join(" ");return`<polyline class="line ${l.className}" points="${d}"><title>${l.name}</title></polyline>`}).join(""),h=e.map((l,d)=>`<rect class="${l.className}" x="${N.left+d*90}" y="${K-N.bottom+20}" width="10" height="3"/><text x="${N.left+d*90+14}" y="${K-N.bottom+24}">${l.name}</text>`).join("");return`<svg viewBox="0 0 ${je} ${K}" role="img" aria-label="${t.y} by ${t.x}">${On(a,t,n,vt(a))}${c}${h}</svg>`}const qt=480,se=240,H={top:10,right:10,bottom:34,left:36};function Pn(e,t,n){const a=Math.max(...e.map(u=>u.values.length),1),s=Math.max(1,...e.flatMap(u=>u.values)),o=qt-H.left-H.right,r=se-H.top-H.bottom,i=o/a,c=i*.7/e.length,h=u=>H.top+r-u/s*r,l=e.map((u,g)=>u.values.map((v,f)=>{const b=H.left+f*i+i*.15+g*c;return`<rect class="${u.className}" x="${b.toFixed(1)}" y="${h(v).toFixed(1)}" width="${c.toFixed(1)}" height="${(H.top+r-h(v)).toFixed(1)}"><title>${u.name}: ${Math.round(v*10)/10}</title></rect>`}).join("")).join(""),d=(n??[]).map((u,g)=>`<text x="${H.left+g*i+i/2}" y="${se-H.bottom+14}" text-anchor="middle">${u}</text>`).join(""),m=e.map((u,g)=>`<rect class="${u.className}" x="${H.left+g*90}" y="${se-H.bottom+20}" width="10" height="3"/><text x="${H.left+g*90+14}" y="${se-H.bottom+24}">${u.name}</text>`).join(""),w=On(s,t,n?0:a,vt(s));return`<svg viewBox="0 0 ${qt} ${se}" role="img" aria-label="${t.y} by ${t.x}">${w}${l}${d}${m}</svg>`}const ct=["Mon","Tue","Wed","Thu","Fri"],Nn=Array.from({length:Ne},(e,t)=>`${9+t}:00`);function Ba(e){return e<=500?e:e<=750?500+(e-500)*2:e<1e3?1e3+(e-750)*35:1e4}function Ha(e){return e<=500?e:e<=1e3?500+(e-500)/2:e<1e4?750+(e-1e3)/35:1e3}function ke(e,t){const n=t.flat(),a=Math.min(...n),s=Math.max(...n),o=p("div",{class:"week"},p("span"),...ct.map(r=>p("span",{class:"head"},r)));return t.forEach((r,i)=>{o.append(p("span",{class:"hour"},Nn[i]??""));for(const c of r){const h=s>a?(c-a)/(s-a):0;o.append(p("span",{class:"cell",style:`--heat:${(.1+h*.9).toFixed(2)}`},String(Math.round(c))))}}),p("div",{},p("h4",{},e),o)}function Ja(e){const t={focus:25,fatigue:15,featureSize:300,weeks:8},n={"🍽️ Lunch":{focus:-100,fatigue:-100},"🏃 Sprint plan":{focus:-100,fatigue:50},"😴 Boring":{focus:-50,fatigue:-25}},a={};for(let T=0;T<ne;T+=1)a[`${T}-3`]="🍽️ Lunch";let s="🏃 Sprint plan",o=null;const r=p("div",{class:"figures"}),i=p("div",{class:"chart"}),c=p("div",{class:"maps"}),h=p("div",{class:"week"}),l=p("select"),d=p("input",{type:"number",min:-100,max:100}),m=p("input",{type:"number",min:-100,max:100}),w=p("input",{type:"text",placeholder:"New meeting name",size:16}),u=(T,k,j,y,S=D=>D,W=D=>D)=>{const D=p("output",{},String(t[T])),R=p("input",{type:"range",min:j,max:y,value:W(t[T]),oninput:()=>{t[T]=S(Number(R.value)),D.textContent=String(t[T]),P()}});return p("label",{},`${k}: `,D,R)},g=p("div",{class:"dials"},u("focus","Focus an hour",0,100),u("fatigue","Fatigue an hour",0,100),u("featureSize","Feature size",0,1e3,Ba,Ha),u("weeks","Weeks",1,16));function v(){l.replaceChildren(...Object.keys(n).map(k=>p("option",{value:k,selected:k===s},k)));const T=n[s];d.value=String(T?.focus??0),m.value=String(T?.fatigue??0)}l.addEventListener("change",()=>{s=l.value,v()});const f=()=>{n[s]={focus:Number(d.value)||0,fatigue:Number(m.value)||0},P()};d.addEventListener("change",f),m.addEventListener("change",f);const b=()=>{const T=w.value.trim();!T||n[T]||(n[T]={focus:0,fatigue:0},s=T,w.value="",v())},x=p("div",{class:"row"},p("span",{},"Paint: "),l,p("span",{},"focus "),d,p("span",{},"fatigue "),m,w,p("button",{type:"button",onclick:b},"Add"));let A=null;const M=T=>{if(A==="add"&&!a[T])a[T]=s;else if(A==="remove"&&a[T])delete a[T];else return;P()};function C(){h.replaceChildren(p("span"),...ct.map(T=>p("span",{class:"head"},T))),Nn.forEach((T,k)=>{h.append(p("span",{class:"hour"},T));for(let j=0;j<ne;j+=1){const y=`${j}-${k}`,S=a[y];h.append(p("span",{class:S?"slot meeting":"slot",title:S??"free",onpointerdown:W=>{W.preventDefault(),A=a[y]?"remove":"add",M(y)},onpointerenter:()=>{A&&M(y)}},S?S.slice(0,2):""))}})}window.addEventListener("pointerup",()=>{A=null});const $=p("div",{class:"row"}),E=()=>{o={summary:_t(Gt({...t,calendar:a,meetingTypes:n}),t),weeks:t.weeks},P()},F=()=>{o=null,P()};function P(){C();const T=Gt({...t,calendar:a,meetingTypes:n}),k=_t(T,t),j=t.weeks*ne*Ne;r.replaceChildren(p("div",{class:"clean"},p("strong",{},k.totalFeatures.toFixed(1)),"features finished"),p("div",{},p("strong",{},k.averageFeaturesPerWeek.toFixed(2)),"features a week"),p("div",{},p("strong",{},Math.round(k.totalProductivity/j).toString()),"productivity an hour"),p("div",{},p("strong",{},String(j)),"hours simulated")),$.replaceChildren(o?p("span",{},`Baseline: ${o.summary.averageFeaturesPerWeek.toFixed(2)} features a week over ${o.weeks} weeks; now ${k.averageFeaturesPerWeek.toFixed(2)}. `):p("span",{},"Keep this run to compare against: "),p("button",{type:"button",onclick:E},o?"Save again":"Save as baseline")),o&&$.append(p("button",{type:"button",onclick:F},"Clear")),i.innerHTML=Pn([{name:"Productivity",className:"clean",values:k.days.map(y=>y.productivity/t.weeks)},{name:"Features ×100",className:"debt",values:k.days.map(y=>y.features/t.weeks*100)}],{x:"",y:"A day, on average"},ct),i.prepend(p("h4",{},"The shape of a week")),c.replaceChildren(ke("Focus",k.hours.focus),ke("Fatigue",k.hours.fatigue),ke("Productivity",k.hours.productivity),ke("Features finished",k.hours.features))}v(),e.append(g,x,p("div",{class:"charts"},h,i),r,$,c),P()}const Ga={name:"developer-meetings",apps:{"developer-meetings":Ja}};function _a(e,t){const n=[];for(let a=e.length-1;a>=0;a-=1)n.push(e.slice(0,a));for(let a=1;a<=t.length;a+=1)n.push(t.slice(0,a));return n}const qa=3800,Ua=6500,Ya=26,za=46,Ka=420;function Va(e){return[...e.childNodes].map(t=>t.nodeName==="BR"?`
`:t.textContent??"").join("")}function Xa(e){const t=document.querySelector("main h1");if(!t||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return()=>{};const n={text:Va(t)};t.setAttribute("aria-label",n.text),t.classList.add("typing");const a=document.createElement("span");a.className="caret idle",a.setAttribute("aria-hidden","true");const s=(l,d)=>{const m=l.split(`
`).flatMap((w,u)=>u===0?[w]:[document.createElement("br"),w]);if(d){const w=document.createElement("a");w.href=d,w.append(...m,a),t.replaceChildren(w)}else t.replaceChildren(...m,a)};s(n.text);let o=n,r=[],i=performance.now()+qa,c=0;const h=l=>{if(c=requestAnimationFrame(h),l<i)return;if(r.length===0){const m=e(o,n);r=_a(o.text,m.text),o=m,a.classList.remove("idle")}const d=r.shift()??o.text;s(d,r.length===0?o.href:void 0),r.length===0?(a.classList.add("idle"),i=l+Ua):d===""?i=l+Ka:i=l+(d.length<(r[0]?.length??0)?za:Ya)};return c=requestAnimationFrame(h),()=>{cancelAnimationFrame(c),s(n.text),a.remove(),t.classList.remove("typing"),t.removeAttribute("aria-label")}}function Za(e,t){const n=[...e];for(let a=n.length-1;a>0;a-=1){const s=Math.min(a,Math.floor(t()*(a+1)));[n[a],n[s]]=[n[s],n[a]]}return n}function Qa(e,t){let n=[];return a=>(n.length===0&&(n=Za(e,t),n.length>1&&n[0]===a&&n.push(n.shift())),n.shift()??a)}const eo=[{text:`More than
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
as this page opened.`,href:"/worlds/"}];let _e=null;const to={name:"headline",arrive:e=>{if(_e?.(),_e=null,e.route!=="/")return;let t=null;_e=Xa((n,a)=>(t??=Qa([a,...eo],Math.random),t(n)))}};function no(e,t){let n=Array.from({length:t.length+1},(a,s)=>s);for(let a=1;a<=e.length;a+=1){const s=[a];for(let o=1;o<=t.length;o+=1){const r=(n[o-1]??0)+(e[a-1]===t[o-1]?0:1);s[o]=Math.min(r,(n[o]??0)+1,(s[o-1]??0)+1)}n=s}return n[t.length]??0}function ao(e,t){if(t.includes(e))return e;let n=null,a=1/0;for(const s of t){const o=no(e,s);o<a&&([n,a]=[s,o])}return n}const oo=/[\p{L}\p{M}\p{N}']+|[.,!?;:]/gu,so=/\]\([^)]*\)|^---[\s\S]*?\n---|[#*_`>\[\]|]|::[a-z-]+/gm;function De(e){return e.normalize("NFKC").replace(so," ").toLowerCase().match(oo)??[]}const $e=" ";class lt{constructor(t,n){this.memory=n;const a=De(t),s=new Map;for(const o of a)s.set(o,(s.get(o)??0)+1);this.vocabulary=[...s.keys()],this.commonest=[...s].reduce((o,r)=>o&&o[1]>=r[1]?o:r,null)?.[0]??null;for(let o=1;o<a.length;o+=1)for(let r=1;r<=n&&r<=o;r+=1){const i=a.slice(o-r,o).join($e),c=this.followers.get(i)??new Map;c.set(a[o]??"",(c.get(a[o]??"")??0)+1),this.followers.set(i,c)}}memory;vocabulary;commonest;followers=new Map;after(t){for(let n=Math.min(this.memory,t.length);n>=1;n-=1){const a=t.slice(-n),s=this.followers.get(a.join($e));if(s)return{context:a,candidates:Ut(s)}}return{context:[],candidates:[]}}transitions(){return[...this.followers].filter(([t])=>t.split($e).length===this.memory).flatMap(([t,n])=>Ut(n).map(a=>({context:t.split($e),...a}))).sort((t,n)=>n.probability-t.probability||n.count-t.count)}}function Ut(e){const t=[...e.values()].reduce((n,a)=>n+a,0);return[...e].map(([n,a])=>({word:n,count:a,probability:a/t})).sort((n,a)=>a.count-n.count)}function ro(e,t){let n=t();for(const a of e)if(n-=a.probability,n<=0)return a.word;return e[e.length-1]?.word??null}function Yt(e){return e.reduce((t,n)=>t===""||/^[.,!?;:]$/.test(n)?t+n:`${t} ${n}`,"")}function Rn(e,t){if(t<=0)return e.map((s,o)=>({...s,probability:o===0?1:0}));const n=e.map(s=>s.probability**(1/t)),a=n.reduce((s,o)=>s+o,0);return e.map((s,o)=>({...s,probability:(n[o]??0)/a}))}const qe=40,zt=8,Ue=e=>`${Math.round(e*100)}%`;function Fn(e,t,n){const{context:a,candidates:s}=e.after(t),o=s.slice(0,zt),r=Rn(s,n).slice(0,zt),i=s.reduce((g,{count:v})=>g+v,0),c=t.slice(0,t.length-a.length),h=`<p class="written">${I(Yt(c))}${c.length&&a.length?" ":""}${a.length?`<mark>${I(Yt(a))}</mark>`:""}<span class="caret"></span></p>`,l=o.length?`<ol class="offered">${o.map(({word:g,count:v,probability:f},b)=>{const x=r[b]?.probability??0;return`<li><button type="button" data-word="${I(g)}" title="seen ${v} of ${i} times: ${Ue(f)} as learnt"><span class="word">${I(g)}</span><span class="chance" style="--p:${x.toFixed(3)}"></span><span class="figure">${Ue(x)}</span></button></li>`}).join("")}</ol>`:`<p class="offered">It never saw anything follow “${I(t[t.length-1]??"")}”. This is where it stops.</p>`,d=g=>a.length===e.memory&&g.context.join(" ")===a.join(" "),m=e.transitions(),w=[...m.filter(d),...m.filter(g=>!d(g))].slice(0,qe).map(g=>`<tr${d(g)?' class="now"':""}><td>${I(g.context.join(" "))}</td><td>${I(g.word)}</td><td>${g.count}</td><td>${Ue(g.probability)}</td></tr>`).join(""),u=`<table class="learnt"><caption>What it learnt: ${m.length} transitions between ${e.vocabulary.length} words${m.length>qe?`, the first ${qe} shown`:""}</caption><thead><tr><th>after</th><th>comes</th><th>seen</th><th>chance</th></tr></thead><tbody>${w}</tbody></table>`;return`<div class="next-word">${h}<h4>What may come next</h4>${l}${u}</div>`}const Ee="The cat is happy. The dog is glad. The cat sleeps. The dog plays. The cat eats. The dog runs. The car is fast. The car goes far.",io=350;function co(e,{site:t}){const n={small:()=>Ee,site:()=>t.pages.map($=>$.body).join(`

`),own:()=>l.value};let a=new lt(Ee,1),s=De("the"),o=null;const r=p("div"),i=($,E)=>p("option",{value:$},E),c=p("select",{onchange:()=>f()},i("small","eight short sentences"),i("site","this website"),i("own","your own text")),h=p("select",{onchange:()=>f()},i(1,"one word back"),i(2,"two words back"),i(3,"three words back")),l=p("textarea",{rows:5,hidden:!0,placeholder:"Paste any text here. The longer, the better it pretends.",oninput:()=>f()}),d=p("output",{},"1"),m=p("input",{type:"range",min:0,max:2,step:.1,value:1,oninput:()=>g()}),w=p("input",{type:"text",value:"the",onchange:()=>v()}),u=p("button",{type:"button",onclick:()=>o?A():x()},"write");function g(){d.textContent=m.value,r.innerHTML=Fn(a,s,Number(m.value))}function v(){A();const $=De(w.value).flatMap(E=>ao(E,a.vocabulary)??[]);s=$.length?$:a.commonest?[a.commonest]:[],g()}function f(){l.hidden=c.value!=="own",a=new lt(n[c.value]?.()??Ee,Number(h.value)),v()}function b(){const $=ro(Rn(a.after(s).candidates,Number(m.value)),Math.random);return $===null?!1:(s=[...s,$],g(),!0)}function x(){u.textContent="stop",o=setInterval(()=>{b()||A()},io)}function A(){o&&clearInterval(o),o=null,u.textContent="write"}r.addEventListener("click",$=>{const E=$.target?.closest("[data-word]")?.getAttribute("data-word");E&&(s=[...s,E],g())});const M=p("div",{class:"dials"},p("label",{},"It has read",c),p("label",{},"It looks",h),p("label",{},"Temperature: ",d,m),p("label",{},"Start from",w)),C=p("div",{class:"row"},p("button",{type:"button",onclick:()=>{b()}},"next word"),u,p("button",{type:"button",onclick:()=>v()},"start over"));return e.replaceChildren(M,l,C,r),g(),A}const lo=()=>Fn(new lt(Ee,1),De("the"),1),ho={name:"next-word",apps:{"next-word":co},stills:{"next-word":lo}},Ye={"string-cache-map":"a WeakMap replacement for string keys, with a bounded cache behind it","async-barrier":"a helper that makes async/await tests say what they wait for","spy-middleware":"a Redux middleware for spying on actions in tests","grunt-frontmatter":"a Grunt task: many files with YAML front matter into one JSON","object-canonical-keys":"always the same array of keys for the same keys, so comparisons stay cheap","async-deferrer":"one function that returns a promise, or resolves it"},Kt=160,ze=28,Ce=e=>e.toLocaleString("en-US");function Ke(e,t){const n=Math.max(1,...e.map(t)),a=Kt/e.length,s=e.map((o,r)=>{const i=t(o)/n*(ze-2);return`<rect x="${(r*a+1).toFixed(1)}" y="${(ze-i).toFixed(1)}" width="${(a-2).toFixed(1)}" height="${i.toFixed(1)}"><title>${o}: ${Ce(t(o))}</title></rect>`}).join("");return`<svg class="spark" viewBox="0 0 ${Kt} ${ze}" role="img" aria-label="Downloads a year, ${e[0]} to ${e[e.length-1]}">${s}</svg>`}function Ln(e){const t=Object.keys(e.years).sort(),n=l=>d=>e.years[d]?.[l]??0,a=l=>t.reduce((d,m)=>d+l(m),0),s=Object.keys(Ye).sort((l,d)=>a(n(d))-a(n(l))),o=[...new Set(t.flatMap(l=>Object.keys(e.years[l]??{})))].filter(l=>!(l in Ye)),r=l=>o.reduce((d,m)=>d+n(m)(l),0),i=l=>Object.values(e.years[l]??{}).reduce((d,m)=>d+m,0),c=s.filter(l=>a(n(l))>0).map(l=>`<tr><th scope="row"><a href="https://www.npmjs.com/package/${l}"><code>${l}</code></a><span>${Ye[l]}</span></th><td>${Ke(t,n(l))}</td><td>${Ce(a(n(l)))}</td></tr>`).join(""),h=o.length?`<tr><th scope="row">the other ${o.length}<span>mostly AngularJS and Redux helpers written for one project each</span></th><td>${Ke(t,r)}</td><td>${Ce(a(r))}</td></tr>`:"";return`<figure class="packages"><table class="packages"><thead><tr><th>package</th><th>${t[0]} to ${t[t.length-1]}, a bar a year</th><th>downloads</th></tr></thead><tbody>${c}${h}</tbody><tfoot><tr><th scope="row">all of them</th><td>${Ke(t,i)}</td><td>${Ce(a(i))}</td></tr></tfoot></table></figure>`}function uo(e){if(e.querySelector("figure"))return;const t=yt(e,"/data/npm/index.json");fetch("/data/npm/downloads.json").then(n=>n.json()).then(n=>{e.innerHTML=Ln(n),e.append(t)}).catch(()=>{e.textContent="The download counts did not arrive. The rest of the page does not depend on them."})}const Ve=["string-cache-map","async-barrier","spy-middleware","grunt-frontmatter","object-canonical-keys","gherkin-genie","async-deferrer","egg-hatchery","angular-tags","class-strict","micro-egg-hatchery","node-dio","ducks-middleware","drpx-updateable","generator-drpx","grunt-ngtags","teal-redux-egg","ducks-reducer","drpx-storage-mocks","strict-classes","ngtags","redux-egg","esmoquin","drpx-storage","dio-provider","drpx-components","grunt-angular-tags","drpx-bind-angular","drpx-toggle","drpx-id","drpx-seo","drpx-otherwisehome","drpx-class-route","drpx-transcludeto"],Xe="downloads.json",mo={name:"npm",directory:"public/data/npm",firstYear:2015,files:[Xe],about:{measures:"downloads a year of the npm packages published as drpicox",attribution:"npm, Inc. Download counts of the public registry.",dataset:"https://github.com/npm/registry/blob/main/docs/download-counts.md",packages:Ve},requestsFor(e){return[`https://api.npmjs.org/downloads/point/${e}-01-01:${e}-12-31/${Ve.join(",")}`]},withYear(e,t,n){const a=n[0],s=Object.entries(typeof a=="object"&&a!==null?a:{}).flatMap(([o,r])=>{const i=r?.downloads;return Ve.includes(o)&&typeof i=="number"&&i>0?[[o,i]]:[]});if(s.length===0)throw new Error("the registry did not answer with downloads");return{[Xe]:{years:{...e[Xe]?.years,[t]:Object.fromEntries(s)}}}}},po=e=>Ln(JSON.parse(e("/data/npm/downloads.json")))+Pe(JSON.parse(e("/data/npm/index.json"))),fo={name:"packages",apps:{packages:uo},stills:{packages:po},sources:[mo]},me={dryMass:25e3,fuel:5e3,exhaust:.72,acceleration:.3},xe=149597870700,re=94607e11,go=[{name:"the Moon",metres:3844e5,said:"384,400 km"},{name:"Mars",metres:.52*xe,said:"0.52 au"},{name:"Jupiter",metres:4.2*xe,said:"4.2 au"},{name:"Saturn",metres:8.5*xe,said:"8.5 au"},{name:"Pluto",metres:38.5*xe,said:"38.5 au"},{name:"Proxima Centauri",metres:4.24*re,said:"4.24 light-years"},{name:"Sirius",metres:8.58*re,said:"8.58 light-years"},{name:"Epsilon Eridani",metres:10.52*re,said:"10.52 light-years"},{name:"the centre of the galaxy",metres:26e3*re,said:"26,000 light-years"},{name:"Andromeda",metres:25e5*re,said:"2.5 million light-years"}],wo=[[365.25*86400*1e6,"million years"],[365.25*86400,"years"],[86400,"days"],[3600,"hours"],[60,"minutes"],[1,"seconds"]];function Oe(e){const[t,n]=wo.find(([o])=>e>=o)??[1,"seconds"],a=e/t;return`${a>=10?Math.round(a).toLocaleString("en-US"):String(Math.round(a*10)/10)} ${n}`}const q=299792458,yo=9.81;function bo(e,t){const n=t.acceleration*yo,a=t.dryMass+t.fuel,s=t.exhaust*q,o=q/n*Math.acosh(1+n*e/(2*q*q)),r=a*(1-Math.exp(-2*n*o/s)),i=r>t.fuel,c=i?s/n*Math.log(a/(a-t.fuel/2)):o,h=Math.tanh(n*c/q),l=q/n*Math.sinh(n*c/q),d=q*q/n*(Math.cosh(n*c/q)-1),m=Math.max(0,e-2*d),w=i?m/(h*q):0,u=w*Math.sqrt(1-h*h);return{shipTime:2*c+u,homeTime:2*l+w,burnTime:c,coastTime:u,topSpeed:h,fuelBurnt:i?t.fuel:r,coasts:i}}const Wn=299792458,vo=9.81,ie=720,Te=170,J={top:12,right:10,bottom:24,left:40};function Bn(e){if(e<.01)return`${Math.round(e*Wn/1e3).toLocaleString("en-US")} km/s`;if(e<.99)return`${(e*100).toPrecision(2)}% of c`;const t=Math.min(12,Math.ceil(-Math.log10(1-e)));return`${(Math.floor(e*10**t)/10**(t-2)).toFixed(t-2)}% of c`}const ko=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:3});function Vt(e){return e>=1e6?`${ko.format(e)} t`:`${e>=100?Math.round(e).toLocaleString("en-US"):e.toPrecision(2)} t`}function $o(e,t){const n=ie-J.left-J.right,a=Te-J.top-J.bottom,s=m=>J.left+m/e.shipTime*n,o=m=>J.top+a-m/Math.max(e.topSpeed,1e-12)*a,r=t.acceleration*vo,i=24,c=Array.from({length:i+1},(m,w)=>e.burnTime*w/i).map(m=>[m,Math.tanh(r*m/Wn)]),l=[...c.map(([m,w])=>[m,w]),...c.reverse().map(([m,w])=>[e.shipTime-m,w])].map(([m,w])=>`${s(m).toFixed(1)},${o(w).toFixed(1)}`).join(" "),d=e.coasts?`<text x="${((s(e.burnTime)+s(e.shipTime-e.burnTime))/2).toFixed(1)}" y="${(o(e.topSpeed)+14).toFixed(1)}" text-anchor="middle">engine off, ${Oe(e.coastTime)}</text>`:"";return`<svg class="trip" viewBox="0 0 ${ie} ${Te}" role="img" aria-label="Speed against the ship's clock"><line class="grid" x1="${J.left}" x2="${ie-J.right}" y1="${o(0)}" y2="${o(0)}"/><line class="grid" x1="${J.left}" x2="${ie-J.right}" y1="${o(e.topSpeed)}" y2="${o(e.topSpeed)}"/><text x="${J.left}" y="${o(e.topSpeed)-3}">${Bn(e.topSpeed)}</text><polyline class="line" points="${l}"/>${d}<text x="${J.left}" y="${Te-6}">departure</text><text x="${ie-J.right}" y="${Te-6}" text-anchor="end">arrival, ${Oe(e.shipTime)} on board</text></svg>`}function Hn(e,t){const n=go.map(o=>({destination:o,trip:bo(o.metres,e)})),a=n.map(({destination:o,trip:r})=>{const i=[o.name===t?"chosen":"",r.coasts?"coasts":""].filter(Boolean).join(" "),c=r.coasts?`all ${Vt(e.fuel)}, then coasts`:Vt(r.fuelBurnt);return`<tr${i?` class="${i}"`:""} data-destination="${o.name}"><th scope="row">${o.name}</th><td>${o.said}</td><td>${Oe(r.shipTime)}</td><td>${Oe(r.homeTime)}</td><td>${Bn(r.topSpeed)}</td><td>${c}</td></tr>`}).join(""),s=n.find(({destination:o})=>o.name===t)??n[0];return`<figure class="rocket"><table class="voyages"><thead><tr><th>to</th><th>distance</th><th>on board</th><th>at home</th><th>top speed</th><th>fuel burnt</th></tr></thead><tbody>${a}</tbody></table>`+(s?`<h4>To ${s.destination.name}: speed against the ship's clock</h4>${$o(s.trip,e)}`:"")+"</figure>"}const Me=e=>e,xo=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:2}),To=[{key:"acceleration",label:"Acceleration",min:.05,max:3,step:.05,toSlider:Me,fromSlider:Me,show:e=>`${e.toFixed(2)} g`},{key:"fuel",label:"Fuel",min:-1,max:13,step:.05,toSlider:e=>Math.log10(e/me.dryMass),fromSlider:e=>me.dryMass*10**e,show:e=>`${xo.format(e/me.dryMass)} × the ship`},{key:"exhaust",label:"Exhaust speed",min:.01,max:1,step:.01,toSlider:Me,fromSlider:Me,show:e=>`${Math.round(e*100)}% of c`}];function Mo(e){let t=me,n="Proxima Centauri";const a=p("div"),s=()=>{a.innerHTML=Hn(t,n)},o=p("div",{class:"dials"},...To.map(r=>{const i=p("output",{},r.show(t[r.key])),c=p("input",{type:"range",min:r.min,max:r.max,step:r.step,value:r.toSlider(t[r.key]),oninput:()=>{t={...t,[r.key]:r.fromSlider(Number(c.value))},i.textContent=r.show(t[r.key]),s()}});return p("label",{},`${r.label}: `,i,c)}));a.addEventListener("click",r=>{const i=r.target?.closest("[data-destination]")?.getAttribute("data-destination");i&&(n=i,s())}),e.replaceChildren(o,a),s()}const So=()=>Hn(me,"Proxima Centauri"),Ao={name:"rocket",apps:{rocket:Mo},stills:{rocket:So}};class Io{listeners=new Set;send(t){for(const n of[...this.listeners])n(t)}on(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}}const ht=new Io,Eo=900,Co=480,Se={x:1600,y:1e3};function Ae(e,t){return(e%t+t)%t}class jo{x=0;y=0;written="";driving=!1;follow({byRadians:t,tiltedBy:n,seconds:a}){const s=document.documentElement;if(s.dataset.sky!=="stars")return;this.driving||this.takeOver(s);const o=Eo/(Math.PI*2),r=(a/Co*Math.PI*2+t)*o;this.x=Ae(this.x+r,Se.x),this.y=Ae(this.y-n*o,Se.y);const i=`${(Math.round(this.x*2)/2).toFixed(1)}px ${(Math.round(this.y*2)/2).toFixed(1)}px`;if(i===this.written)return;this.written=i;const[c,h]=i.split(" ");s.style.setProperty("--sky-x",c??"0px"),s.style.setProperty("--sky-y",h??"0px")}release(){const t=document.documentElement;t.classList.remove("sky-driven"),t.style.removeProperty("--sky-x"),t.style.removeProperty("--sky-y"),this.x=0,this.y=0,this.written="",this.driving=!1}takeOver(t){const n=getComputedStyle(document.body,"::before").transform;if(n&&n!=="none")try{const a=new DOMMatrixReadOnly(n);this.x=Ae(a.m41,Se.x),this.y=Ae(a.m42,Se.y)}catch{}t.classList.add("sky-driven"),this.driving=!0}}function Do(e){return ht.on(t=>e.follow(t))}const Xt=new jo,Oo={name:"sky",install:()=>Do(Xt),arrive:()=>Xt.release()},Ze=20;function Po(e){const{baseTime:t,shortcutFactor:n,interestRate:a,timeHorizon:s}=e,o=[];let r=null;const i=t;let c=t*(1-n),h=0,l=0,d=0,m=0,w=0,u=0;for(let g=0;g<s*Ze;){for(;w<=g;)h+=1,d+=1,w+=i;for(;u<=g;)l+=1,m+=1,u+=c,c*=1+a;if(g+=1,g%Ze===0){const v=g/Ze;o.push({month:v,cleanCumulative:h,debtCumulative:l,cleanMonthly:d,debtMonthly:m,debtFeatureCost:c}),d=0,m=0,r===null&&h>l&&(r=v)}}return{months:o,breakEvenMonth:r}}const No=[{key:"baseTime",label:"Base time",min:1,max:30,step:1,show:e=>`${e} days`},{key:"shortcutFactor",label:"Shortcuts",min:0,max:.9,step:.05,show:e=>`${Math.round(e*100)}%`},{key:"interestRate",label:"Interest",min:0,max:1,step:.01,show:e=>`${Math.round(e*100)}%`},{key:"timeHorizon",label:"Timeline",min:6,max:60,step:1,show:e=>`${e} months`}];function Ro(e){const t={baseTime:20,shortcutFactor:.25,interestRate:.1,timeHorizon:24},n=p("div",{class:"figures"}),a=p("div",{class:"chart"}),s=p("div",{class:"chart"}),o=p("p"),r=p("div",{class:"dials"},...No.map(c=>{const h=p("output",{},c.show(t[c.key])),l=p("input",{type:"range",min:c.min,max:c.max,step:c.step,value:t[c.key],oninput:()=>{t[c.key]=Number(l.value),h.textContent=c.show(t[c.key]),i()}});return p("label",{},`${c.label}: `,h,l)}));function i(){const{months:c,breakEvenMonth:h}=Po(t),l=c[c.length-1],d=l?.cleanCumulative??0,m=l?.debtCumulative??0,w=d>0?(d-m)/d*100:0,u=Math.abs(w)<.1?"Even":w>0?"Loss":"Gain",g=Math.abs(w)<.1?"≈0%":`${Math.abs(w).toFixed(1)}%`;n.replaceChildren(p("div",{class:"clean"},p("strong",{},String(d)),"clean features"),p("div",{class:"debt"},p("strong",{},String(m)),"debt features"),p("div",{},p("strong",{},h?`month ${h}`:"never"),"break-even"),p("div",{},p("strong",{},g),`${u.toLowerCase()} on the shortcut road`)),a.innerHTML=Wa([{name:"Clean",className:"clean",values:c.map(v=>v.cleanCumulative)},{name:"Debt-driven",className:"debt",values:c.map(v=>v.debtCumulative)}],{x:"Months",y:"Features"}),a.prepend(p("h4",{},"Cumulative features")),s.innerHTML=Pn([{name:"Clean",className:"clean",values:c.slice(1).map(v=>v.cleanMonthly)},{name:"Debt-driven",className:"debt",values:c.slice(1).map(v=>v.debtMonthly)}],{x:"Months",y:"Features a month"}),s.prepend(p("h4",{},"Monthly delivery rate")),o.textContent=t.interestRate===0?"With no interest there is no compound slowdown, and the shortcut simply wins. That is the one case that does not happen to real code.":h?`${Math.round(t.shortcutFactor*100)}% saved at first, ${Math.round(t.interestRate*100)}% interest on every feature: clean development overtakes at month ${h}, and by month ${t.timeHorizon} the shortcut road has delivered ${g} less.`:`${Math.round(t.shortcutFactor*100)}% saved at first, ${Math.round(t.interestRate*100)}% interest on every feature: in ${t.timeHorizon} months the clean road has not yet caught up. Give it longer, or raise the interest.`}e.append(r,n,p("div",{class:"charts"},a,s),o),i()}const Fo={name:"technical-debt",apps:{"technical-debt":Ro}},Lo="theme";function Jn(){const e=document.documentElement,t=e.dataset.pageTheme;let n=null;try{n=localStorage.getItem(Lo)}catch{n=null}const a=t??(n==="light"||n==="dark"?n:null);a?e.dataset.theme=a:delete e.dataset.theme}const dt="theme";function Wo(){return window.matchMedia("(prefers-color-scheme: dark)").matches}function Bo(){let e=null;try{e=localStorage.getItem(dt)}catch{e=document.documentElement.dataset.theme??null}return e==="light"||e==="dark"?e:Wo()?"dark":"light"}class Ho{apply(t){const n=t==="toggle"?Bo()==="dark"?"light":"dark":t;try{n==="system"?localStorage.removeItem(dt):localStorage.setItem(dt,n)}catch{}return Jn(),n}}function Jo(e){const t=document.querySelector(".theme-toggle");return t?(t.classList.add("ready"),t.removeAttribute("aria-hidden"),t.removeAttribute("tabindex"),t.addEventListener("click",e),()=>t.removeEventListener("click",e)):()=>{}}const ut=["light","dark","system"];function Go(e){return ut.includes(e)}const _o={light:"☀︎",dark:"☾︎",system:"◐︎"};function Zt(e){const t=n=>`${_o[n]} ${n}`;return{text:`theme   ${ut.map(n=>n===e?`[${t(n)}]`:t(n)).join("   ")}`,html:`<pre class="choices">theme   ${ut.map(n=>n===e?`<strong aria-current="true">${t(n)}</strong>`:`<a href="#" data-run="theme ${n}" title="theme ${n}">${t(n)}</a>`).join("   ")}</pre>`}}function qo(e){return{name:"theme",usage:"theme [light|dark|system|auto]",description:"switch the colours, or toggle them",run({site:t,cwd:n},[a]){const s=t.at(n)?.fields.theme;if(s)return{text:`theme: this page keeps its own, ${s}. It works everywhere else.`,error:!0};if(a===void 0)return Zt(e.apply("toggle"));const o=a==="auto"?"system":a;return Go(o)?Zt(e.apply(o)):{text:`theme: ${a}: choose light, dark or system`,error:!0}}}}const Uo={name:"theme",commands:[qo(new Ho)],install:e=>Jo(()=>e.run("theme")),arrive:()=>Jn()},Qt=[{algorithm:"pairs",vertices:8,graphs:150,serial:42.43,openmp:14.34,cuda:2.572},{algorithm:"pairs",vertices:16,graphs:150,serial:738.92,openmp:247.95,cuda:33.06},{algorithm:"pairs",vertices:24,graphs:150,serial:4387.13,openmp:1208.97,cuda:109.093},{algorithm:"common-labelling",vertices:8,graphs:50,serial:843.21,openmp:214.51,cuda:33.404},{algorithm:"common-labelling",vertices:16,graphs:50,serial:17061.4,openmp:4284.01,cuda:550.153},{algorithm:"common-labelling",vertices:24,graphs:50,serial:71670.13,openmp:20274.32,cuda:2332.076}],Yo={pairs:e=>`Matching every pair of ${e} graphs`,"common-labelling":e=>`Finding one labelling common to ${e} graphs`};function Qe(e){if(e<10)return`${e.toFixed(1)} s`;if(e<60)return`${Math.round(e)} s`;const t=Math.floor(e/60);return t<60?t<10?`${t} min ${Math.round(e-t*60)} s`:`${Math.round(e/60)} min`:`${Math.floor(t/60)} h ${t%60} min`}const zo=e=>`×${e>=10?Math.round(e):e.toFixed(1)}`;function en(e){const t=Math.max(...e.map(s=>s.serial/s.cuda)),n=(s,o)=>`<span class="bar ${o}" style="--p:${(s/t).toFixed(3)}"></span><span class="factor">${zo(s)}</span>`;return`<figure class="runs"><table class="runs"><thead><tr><th>each graph has</th><th>one thread</th><th>OpenMP, 2 cores · 8 W</th><th>CUDA, 16 cores · 10 W</th></tr></thead>${[...new Set(e.map(s=>s.algorithm))].map(s=>{const o=e.filter(i=>i.algorithm===s),r=o.map(i=>`<tr><th scope="row">${i.vertices} vertices</th><td>${Qe(i.serial)}</td><td>${Qe(i.openmp)}<div class="speedup">${n(i.serial/i.openmp,"openmp")}</div></td><td>${Qe(i.cuda)}<div class="speedup">${n(i.serial/i.cuda,"cuda")}</div></td></tr>`).join("");return`<tbody><tr class="group"><th colspan="4">${Yo[s](o[0]?.graphs??0)}</th></tr>${r}</tbody>`}).join("")}</table><figcaption>Measured in 2011 on an Intel Atom 330 with an NVIDIA 9400M beside it, on graphs of the GREC dataset. The bars are how many times faster than one thread, all on one scale.</figcaption></figure>`}const Ko={name:"thesis-results",stills:{"graph-matching-runs":()=>en(Qt)},apps:{"graph-matching-runs":e=>{e.firstChild||(e.innerHTML=en(Qt))}}},mt={variable:"tn",atLeast:!0,threshold:20,months:[0,1,2,3,4,5,6,7,8,9,10,11]};function Vo(e,t){const n=e.map(({value:u})=>u),a=Math.floor(Math.min(...n,...(t.spans??[]).map(({value:u})=>u))),s=Math.ceil(Math.max(...n,a+1)),o=En(e.map(({year:u})=>u),a,s),{x:r,y:i,slot:c}=o,h=u=>r(u)+c/2,l=[];for(const u of e){const g=l[l.length-1];g&&g[g.length-1]?.year===u.year-1?g.push(u):l.push([u])}const d=l.map(u=>`<polyline class="line" points="${u.map(({year:g,value:v})=>`${O(h(g))},${O(i(v))}`).join(" ")}"/>`).join(""),m=e.map(({year:u,value:g,title:v,partial:f})=>`<circle class="dot${f?" partial":""}" cx="${O(h(u))}" cy="${O(i(g))}" r="3.5"><title>${v}</title></circle>`).join(""),w=o.levels(t.spans??[]);return o.wrap(t.label,`${d}${m}${w}`)}function Xo(e,{threshold:t,atLeast:n},a){if(!e)return 0;const[s=0,...o]=e;return o.reduce((r,i,c)=>s+c*a>=t-1e-9===n?r+i:r,0)}const ae={tn:{code:1002,unit:"°C",name:"daily minimum",summary:"mean",bin:.5,range:[-30,35]},tx:{code:1001,unit:"°C",name:"daily maximum",summary:"mean",bin:.5,range:[-25,50]},pp:{code:1300,unit:"mm",name:"daily rain",summary:"sum",bin:.5,range:[0,250]},pi:{code:1303,unit:"mm/h",name:"most rain in one hour",summary:"max",bin:.5,range:[0,100]}},Zo=.95,Qo=(e,t)=>new Date(Date.UTC(e,t+1,0)).getUTCDate(),Y=e=>e.reduce((t,n)=>t+n,0);function es(e,t){return e.length===0?null:t==="sum"?Y(e.map(({figure:n})=>n)):t==="max"?Math.max(...e.map(({figure:n})=>n)):Y(e.map(({figure:n,weight:a})=>n*a))/Y(e.map(({weight:n})=>n))}function ts(e,t){const n=ae[t.variable];return Object.entries(e.years).flatMap(([a,s])=>{const o=s[t.variable];if(!o)return[];const r=Number(a),i=o.months.map(u=>({days:Xo(u,t,n.bin),measured:Y(u?.slice(1)??[])})),c=u=>t.months.includes(u),h=Y(i.filter((u,g)=>c(g)).map(u=>u.measured)),l=Y(t.months.map(u=>Qo(r,u))),d=Y(i.filter((u,g)=>c(g)).map(u=>u.days)),m=o.summaries.flatMap((u,g)=>c(g)&&u!==null?[{figure:u,weight:i[g]?.measured??0}]:[]),w=es(m,n.summary);return[{year:r,days:d,elsewhere:Y(i.map(u=>u.days))-d,measured:h,expected:l,whole:h/l>=Zo,summary:w,months:i}]}).sort((a,s)=>a.year-s.year)}const tn=["January","February","March","April","May","June","July","August","September","October","November","December"];function nn(e){const{name:t,unit:n}=ae[e.variable],a=e.variable==="pi"?"":"a ",s=e.atLeast?`of ${e.threshold} ${n} or more`:`below ${e.threshold} ${n}`,o=tn[e.months[0]??0],r=tn[e.months[e.months.length-1]??11],i=e.months.length===12?"whole year":`${o} to ${r}`;return`days with ${a}${t} ${s}, ${i}`}const Gn=["January","February","March","April","May","June","July","August","September","October","November","December"],ns=.55;function as(e,t,{days:n,measured:a}){const s=`${Gn[t]} ${e}`;if(a===0)return`<td class="none" title="${s}: not measured"></td>`;const o=Math.round(n/a*1e3)/1e3;return`<td${o>=ns?' class="deep"':""} style="--v:${o}" title="${s}: ${n} of ${a} days">${n||""}</td>`}function os(e,t){const n=`<tr><th></th>${Gn.map(s=>`<th scope="col">${s.slice(0,3)}</th>`).join("")}</tr>`,a=[...e].reverse().map(({year:s,months:o})=>`<tr><th scope="row">${s}</th>${o.map((r,i)=>as(s,i,r)).join("")}</tr>`);return`<table class="heat calendar${t?" warm":""}"><thead>${n}</thead><tbody>${a.join("")}</tbody></table>`}const an=e=>e.reduce((t,n)=>t+n,0)/e.length;function on(e){const t=e.flatMap(({summary:n})=>n===null?[]:[n]);return{from:e[0]?.year??0,to:e[e.length-1]?.year??0,years:e.length,days:an(e.map(({days:n})=>n)),summary:t.length?an(t):null}}function ss(e){const t=e.filter(a=>a.whole);if(t.length<4)return null;const n=Math.floor(t.length/2);return[on(t.slice(0,n)),on(t.slice(n))]}const rs=["January","February","March","April","May","June","July","August","September","October","November","December"],is={mean:"The mean",sum:"The total",max:"The highest"},ue=e=>String(Math.round(e*10)/10),cs=e=>`${e>0?"+":e<0?"−":""}${ue(Math.abs(e))}`,ls=e=>`${Number(e.slice(8,10))} ${rs[Number(e.slice(5,7))-1]} ${e.slice(0,4)}`;function hs(e,t){const{unit:n,name:a}=ae[t.variable],s=Object.values(e.years).flatMap(i=>i[t.variable]?[i[t.variable].record]:[]),[o,r]=t.atLeast?s.map(([i,c])=>[i,c]).reduce((i,c)=>c[0]>i[0]?c:i):s.map(([,,i,c])=>[i,c]).reduce((i,c)=>c[0]<i[0]?c:i);return`<p class="record">The ${t.atLeast?"highest":"lowest"} ${a} on record here: ${o} ${n} on ${ls(r)}, whatever months are chosen.</p>`}function _n(e,t){const n=ae[t.variable],a=`<figcaption><strong>${e.name}</strong> · ${e.altitude} m, ${e.setting} · ${nn(t)}</figcaption>`,s=ts(e,t);if(s.length===0)return`<figure class="weather">${a}<p>This station has no ${n.name} on record.</p></figure>`;const o=ss(s),r=({from:u,to:g})=>`${u}–${g}`,i=o?'<div class="figures">'+o.map(u=>`<div><strong>${ue(u.days)}</strong>days a year, ${r(u)}</div>`).join("")+`<div><strong>${cs(o[1].days-o[0].days)}</strong>days a year, from one half to the other</div></div>`:"",c=s.map(({year:u,days:g,elsewhere:v,measured:f,expected:b,whole:x})=>{const A=v>0?`, and ${v} more outside the months chosen`:"",M=x?"":`, with only ${f} of ${b} days measured`;return{year:u,value:g,partial:!x,title:`${u}: ${g} days${M}${A}`}}),h=(o??[]).map(u=>({from:u.from,to:u.to,value:u.days,label:`${ue(u.days)} a year`})),l=s.flatMap(({year:u,summary:g,whole:v})=>g===null||!v?[]:[{year:u,value:g,title:`${u}: ${ue(g)} ${n.unit}`}]),d=(o??[]).flatMap(u=>u.summary===null?[]:[{from:u.from,to:u.to,value:u.summary,label:`${ue(u.summary)} ${n.unit}`}]),m=`${is[n.summary]} ${n.name} of each year, ${n.unit}`,w=(n.summary==="mean"?Vo:rt)(l,{label:m,spans:d});return`<figure class="weather">${a}${i}<h4>Days a year</h4>${rt(c,{label:`Days a year: ${nn(t)}`,spans:h})}<h4>When in the year they fell</h4>${os(s,t.atLeast&&n.unit==="°C")}<h4>${m}, in the months chosen</h4>${w}`+hs(e,t)+"</figure>"}const sn=[{id:"tropical-nights",name:"tropical nights",variable:"tn",atLeast:!0,threshold:20},{id:"torrid-nights",name:"torrid nights",variable:"tn",atLeast:!0,threshold:25},{id:"hot-days",name:"hot days",variable:"tx",atLeast:!0,threshold:30},{id:"torrid-days",name:"torrid days",variable:"tx",atLeast:!0,threshold:35},{id:"frost-days",name:"frost days",variable:"tn",atLeast:!1,threshold:0},{id:"rainy-days",name:"rainy days",variable:"pp",atLeast:!0,threshold:1},{id:"heavy-rain",name:"days of heavy rain",variable:"pp",atLeast:!0,threshold:20},{id:"downpours",name:"days with a downpour",variable:"pi",atLeast:!0,threshold:10}],te=[{code:"WU",name:"Badalona - Museu",municipality:"Badalona",altitude:42,setting:"urban, by the sea"},{code:"X4",name:"Barcelona - el Raval",municipality:"Barcelona",altitude:33,setting:"dense city, on a roof"},{code:"X8",name:"Barcelona - Zona Universitària",municipality:"Barcelona",altitude:82,setting:"city edge"},{code:"D5",name:"Barcelona - Observatori Fabra",municipality:"Barcelona",altitude:410,setting:"wooded hill above the city"},{code:"UP",name:"Cabrils",municipality:"Cabrils",altitude:81,setting:"coastal slope, half rural"},{code:"XF",name:"Sabadell - Parc Agrari",municipality:"Sabadell",altitude:259,setting:"farmland beside a city"},{code:"XJ",name:"Girona",municipality:"Girona",altitude:72,setting:"market gardens by the city"},{code:"XE",name:"Tarragona - Complex Educatiu",municipality:"Tarragona",altitude:6,setting:"coast"},{code:"VK",name:"Raimat",municipality:"Lleida",altitude:286,setting:"inland plain, vineyards"}],rn=[["whole year",[0,1,2,3,4,5,6,7,8,9,10,11]],["June to August",[5,6,7]],["May to October",[4,5,6,7,8,9]],["December to February",[0,1,11]]],ds={tn:[-10,30],tx:[0,45],pp:[.5,100],pi:[.5,60]};function us(e){const t=new Map,n=yt(e,"/data/weather/index.json"),a=p("div");a.append(...e.querySelectorAll("figure"));let s=null,o=mt,r=!1;const i=(f,b)=>p("option",{value:f},b),c=p("select",{onchange:()=>{g(c.value)}},...te.map(({code:f,name:b})=>i(f,b))),h=p("select",{onchange:()=>{const f=sn.find(({id:b})=>b===h.value);f&&u({variable:f.variable,atLeast:f.atLeast,threshold:f.threshold})}},...sn.map(({id:f,name:b})=>i(f,b))),l=p("select",{onchange:()=>u({months:rn[Number(l.value)]?.[1]??mt.months})},...rn.map(([f],b)=>i(b,f))),d=p("output"),m=p("input",{type:"range",step:.5,oninput:()=>u({threshold:Number(m.value)})});function w(){const[f,b]=ds[o.variable];m.min=String(f),m.max=String(b),m.value=String(o.threshold),d.textContent=`${o.atLeast?"":"below "}${o.threshold} ${ae[o.variable].unit}${o.atLeast?" or more":""}`,s&&(a.innerHTML=_n(s,o))}function u(f){o={...o,...f},w()}async function g(f){const b=t.get(f)??fetch(`/data/weather/${f}.json`).then(x=>x.json());t.set(f,b);try{const x=await b;if(r||c.value!==f)return;s=x,w()}catch{t.delete(f),a.replaceChildren(p("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}const v=p("div",{class:"dials"},p("label",{},"Station",c),p("label",{},"Counting",h),p("label",{},"Threshold: ",d,m),p("label",{},"Months",l));return e.replaceChildren(v,a,n),g(c.value),()=>{r=!0}}function ms(e,t,[n,a]){if(e.length===0)return null;const s=Math.round((a-n)/t),o=new Map;for(const h of e){const l=Math.min(s-1,Math.max(0,Math.floor((h-n)/t+1e-9)));o.set(l,(o.get(l)??0)+1)}const r=Math.min(...o.keys()),i=Math.max(...o.keys());return[Math.round((n+r*t)*1e3)/1e3,...Array.from({length:i-r+1},(h,l)=>o.get(r+l)??0)]}const cn="7bvh-jvq2",qn=5e4,ln=Object.entries(ae),ps="No representatiu",fs=["Representatiu",""],gs=(e,t)=>Math.round(e*10**t)/10**t;function ws(e,t){if(e.length===0)return null;if(t==="max")return Math.max(...e);const n=e.reduce((a,s)=>a+s,0);return gs(t==="sum"?n:n/e.length,2)}function ys(e,t){const n=Array.from({length:12},(o,r)=>e.filter(({date:i})=>Number(i.slice(5,7))===r+1).map(({value:i})=>i)),a=e.reduce((o,r)=>r.value>o.value?r:o),s=e.reduce((o,r)=>r.value<o.value?r:o);return{months:n.map(o=>ms(o,t.bin,t.range)),summaries:n.map(o=>ws(o,t.summary)),record:[a.value,a.date,s.value,s.date]}}function bs(e){if(!Array.isArray(e))throw new Error("the portal did not answer with rows");if(e.length>=qn)throw new Error("the answer was cut short at the limit");const t=e;if(!t.some(s=>s.data_lectura?.slice(5,7)==="12"))throw new Error("the year does not reach December yet");const n=new Map,a=new Set;for(const s of t){const o=s.estat??"";if(o===ps)continue;if(!fs.includes(o))throw new Error(`the network marks days as "${o}", which nobody has decided how to read`);const r=s.data_lectura?.slice(0,10)??"",i=`${s.codi_estacio}/${s.codi_variable}`;if(a.has(`${i}/${r}`))throw new Error(`${i} has ${r} twice`);a.add(`${i}/${r}`);const c=Number(s.valor);Number.isFinite(c)&&n.set(i,[...n.get(i)??[],{date:r,value:c}])}return n}const vs={name:"weather",directory:"public/data/weather",firstYear:1988,files:te.map(e=>`${e.code}.json`),about:{measures:"daily minimum and maximum temperature, daily rain, most rain in one hour",network:"Xarxa d'Estacions Meteorològiques Automàtiques (XEMA)",attribution:"Servei Meteorològic de Catalunya (XEMA). Dades obertes de la Generalitat de Catalunya.",dataset:`https://analisi.transparenciacatalunya.cat/d/${cn}`,stations:te},requestsFor(e){const t=te.map(a=>`'${a.code}'`).join(","),n=ln.map(([,a])=>a.code).join(",");return[jn(cn,{select:"codi_estacio,codi_variable,data_lectura,valor,estat",where:`codi_estacio in (${t}) and codi_variable in (${n}) and data_lectura between '${e}-01-01T00:00:00' and '${e}-12-31T23:59:59'`,limit:qn})]},withYear(e,t,n){const a=bs(n[0]);return Object.fromEntries(te.map(s=>{const o=`${s.code}.json`,r=ln.flatMap(([h,l])=>{const d=a.get(`${s.code}/${l.code}`);return d?[[h,ys(d,l)]]:[]}),i=Object.fromEntries(r),c={...e[o]?.years,...r.length?{[t]:i}:{}};return[o,{...s,years:c}]}))}},ks=e=>{const t=JSON.parse(e(`/data/weather/${te[0]?.code}.json`)),n=JSON.parse(e("/data/weather/index.json"));return _n(t,mt)+Pe(n)},$s={name:"weather",apps:{weather:us},stills:{weather:ks},sources:[vs]},kt="header-world";function Un(){try{const e=localStorage.getItem(kt);if(!e)return null;const t=JSON.parse(e);return[t.seed,t.levels,t.roughness,t.share].every(a=>typeof a=="number"&&Number.isFinite(a))?t:null}catch{return null}}function xs(e){try{localStorage.setItem(kt,JSON.stringify(e))}catch{}}function Ts(){try{localStorage.removeItem(kt)}catch{}}const _=(1+Math.sqrt(5))/2,Ms=[[-1,_,0],[1,_,0],[-1,-_,0],[1,-_,0],[0,-1,_],[0,1,_],[0,-1,-_],[0,1,-_],[_,0,-1],[_,0,1],[-_,0,-1],[-_,0,1]],Ss=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];function As(){const e=Ms.map(([t,n,a])=>{const s=Math.hypot(t,n,a);return{direction:[t/s,n/s,a/s],radius:1,surface:0}});return Yn(e,Ss.map(t=>[...t]))}const Is=(e,t)=>(e+t)/2;function Es(e,t,n=Is){const a=Array.from({length:e.vertexCount},(i,c)=>({direction:[e.directions[c*3]??0,e.directions[c*3+1]??0,e.directions[c*3+2]??0],radius:e.radii[c]??1,surface:e.surface[c]??0})),s=new Map,o=(i,c)=>{const h=i<c?`${i}:${c}`:`${c}:${i}`,l=s.get(h);if(l!==void 0)return l;const d=a[i],m=a[c],[w,u,g]=d.direction,[v,f,b]=m.direction,x=Math.hypot(w*d.radius-v*m.radius,u*d.radius-f*m.radius,g*d.radius-b*m.radius),[A,M,C]=[(w+v)/2,(u+f)/2,(g+b)/2],$=Math.hypot(A,M,C)||1,E=n(d.surface,m.surface);a.push({direction:[A/$,M/$,C/$],radius:(d.radius+m.radius)/2+t(x),surface:E});const F=a.length-1;return s.set(h,F),F},r=[];for(let i=0;i<e.faceCount;i+=1){const c=e.faces[i*3],h=e.faces[i*3+1],l=e.faces[i*3+2],d=o(c,h),m=o(h,l),w=o(l,c);r.push([c,d,w],[h,m,d],[l,w,m],[d,m,w])}return Yn(a,r)}function Yn(e,t){const n=new Float32Array(e.length*3),a=new Float32Array(e.length),s=new Float32Array(e.length);e.forEach((r,i)=>{n[i*3]=r.direction[0],n[i*3+1]=r.direction[1],n[i*3+2]=r.direction[2],a[i]=r.radius,s[i]=r.surface});const o=new Uint32Array(t.length*3);return t.forEach(([r,i,c],h)=>{o[h*3]=r,o[h*3+1]=i,o[h*3+2]=c}),{directions:n,radii:a,surface:s,faces:o,faceCount:t.length,vertexCount:e.length}}function Cs(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let n=Math.imul(t^t>>>15,1|t);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function js(e){const t=As();return{seed:e,mesh:t,temperature:new Float32Array(t.vertexCount),faceColour:new Uint8ClampedArray(t.faceCount*3),seaRadius:0}}function Ds(e,t){return{...e,mesh:t,temperature:new Float32Array(t.vertexCount),faceColour:new Uint8ClampedArray(t.faceCount*3)}}function Os(e,t){return Math.abs(e.mesh.directions[t*3+1]??0)}function zn(e,t,n){const a=e.mesh.faces[n*3]??0,s=e.mesh.faces[n*3+1]??0,o=e.mesh.faces[n*3+2]??0;return((t[a]??0)+(t[s]??0)+(t[o]??0))/3}function Ps(e,t){return zn(e,e.mesh.radii,t)}const Kn=(e=4,t=.28,n=.2)=>a=>{const s=Cs(a.seed);let o=a.mesh;const r=Float32Array.from(o.surface,()=>s());o={...o,surface:r};for(let i=0;i<e;i+=1)o=Es(o,c=>c*t*(s()-.5),(c,h)=>{const l=.5+(s()-.5)*(c-h)*n;return Math.min(1,Math.max(0,c*(1-l)+h*l))});return Ds(a,o)},Vn=({equator:e=1,pole:t=.05,peak:n=0}={})=>a=>{const s=new Float32Array(a.mesh.vertexCount),o=a.mesh.radii,r=o.reduce((h,l)=>Math.min(h,l),1/0),c=o.reduce((h,l)=>Math.max(h,l),-1/0)-r||1;for(let h=0;h<a.mesh.vertexCount;h+=1){const l=((o[h]??1)-r)/c,d=Os(a,h)**2.2;s[h]=e+(t-e)*d+(n-e)*l}return{...a,temperature:s}},Xn=(e=.55)=>t=>{const n=Float32Array.from(t.mesh.radii).sort(),a=Math.min(n.length-1,Math.floor(n.length*e)),s=n[a]??1,o=Float32Array.from(t.mesh.radii,r=>Math.max(r,s));return{...t,mesh:{...t.mesh,radii:o},seaRadius:s}},Ns=[24,92,168],Rs=[62,176,206],Fs=[214,196,138],hn=[190,158,84],et=[70,138,66],Ls=[74,104,76],Ws=[136,128,116],dn=[238,243,247];function z(e,t,n){const a=Math.min(1,Math.max(0,n));return[e[0]+(t[0]-e[0])*a,e[1]+(t[1]-e[1])*a,e[2]+(t[2]-e[2])*a]}function Bs(e){return e>.78?hn:e>.62?z(et,hn,(e-.62)/.16):e>.3?et:z(Ls,et,(e-.12)*5.5)}const Zn=e=>{const t=new Uint8ClampedArray(e.mesh.faceCount*3),n=e.mesh.radii.reduce((s,o)=>Math.max(s,o),-1/0),a=Math.max(1e-6,n-e.seaRadius);for(let s=0;s<e.mesh.faceCount;s+=1){const o=(Ps(e,s)-e.seaRadius)/a,r=zn(e,e.temperature,s);let i;o<=.002?(i=z(Rs,Ns,.55),r<.16&&(i=z(i,dn,(.16-r)*6))):(i=z(Fs,Bs(r),Math.min(1,o*9)),i=z(i,Ws,Math.max(0,o-.55)*2.2),r<.26&&(i=z(i,dn,(.26-r)*4))),t[s*3]=i[0],t[s*3+1]=i[1],t[s*3+2]=i[2]}return{...e,faceColour:t}},Hs=[Kn(),Xn(),Vn(),Zn];function Js(e,t=Hs){return t.reduce((n,a)=>a(n),js(e))}function Qn(e){return Js(e.seed,[Kn(e.levels,e.roughness),Xn(e.share),Vn(),Zn])}const un=.3,Gs=[-.5,.45,.74],_s=1.02;class $t{size;pixels;depth;view=new Float32Array(0);screen=new Float32Array(0);constructor(t,n=new Uint8ClampedArray(t*t*4)){if(n.length!==t*t*4)throw new Error(`SphereRaster: ${t}×${t} needs ${t*t*4} bytes, not ${n.length}`);this.size=t,this.pixels=n,this.depth=new Float32Array(t*t)}paint(t,n){const{size:a,pixels:s,depth:o}=this;s.fill(0),o.fill(-1/0);const[r,i,c]=qs(n.light??Gs),h=n.tilt??-.38,l=Math.cos(h),d=Math.sin(h),m=Math.cos(n.rotation),w=Math.sin(n.rotation),{directions:u,radii:g,faces:v,faceCount:f,vertexCount:b}=t.mesh;let x=1;for(let $=0;$<b;$+=1){const E=g[$]??1;E>x&&(x=E)}const A=a/(2*x*_s);this.view.length<b*3&&(this.view=new Float32Array(b*3),this.screen=new Float32Array(b*3));const M=this.view,C=this.screen;for(let $=0;$<b;$+=1){const E=g[$]??1,F=(u[$*3]??0)*E,P=(u[$*3+1]??0)*E,T=(u[$*3+2]??0)*E,k=F*m-T*w,j=F*w+T*m,y=P*l+j*d,S=-P*d+j*l;M[$*3]=k,M[$*3+1]=y,M[$*3+2]=S,C[$*3]=a/2+k*A,C[$*3+1]=a/2-y*A,C[$*3+2]=S}for(let $=0;$<f;$+=1){const E=v[$*3]??0,F=v[$*3+1]??0,P=v[$*3+2]??0,T=C[E*3],k=C[E*3+1],j=C[E*3+2],y=C[F*3],S=C[F*3+1],W=C[F*3+2],D=C[P*3],R=C[P*3+1],B=C[P*3+2],Fe=(y-T)*(R-k)-(S-k)*(D-T);if(Fe>=0)continue;const Tt=M[E*3],Mt=M[E*3+1],St=M[E*3+2],At=M[F*3]-Tt,It=M[F*3+1]-Mt,Et=M[F*3+2]-St,Ct=M[P*3]-Tt,jt=M[P*3+1]-Mt,Dt=M[P*3+2]-St,Ot=It*Dt-Et*jt,Pt=Et*Ct-At*Dt,Nt=At*jt-It*Ct,Le=Math.hypot(Ot,Pt,Nt)||1,ia=Ot/Le*r+Pt/Le*i+Nt/Le*c,We=un+(1-un)*Math.max(0,ia),ca=(t.faceColour[$*3]??0)*We,la=(t.faceColour[$*3+1]??0)*We,ha=(t.faceColour[$*3+2]??0)*We,da=Math.max(0,Math.floor(Math.min(T,y,D))),ua=Math.min(a-1,Math.ceil(Math.max(T,y,D))),ma=Math.max(0,Math.floor(Math.min(k,S,R))),pa=Math.min(a-1,Math.ceil(Math.max(k,S,R)));for(let fe=ma;fe<=pa;fe+=1)for(let ge=da;ge<=ua;ge+=1){const Be=ge+.5,He=fe+.5,fa=(y-T)*(He-k)-(S-k)*(Be-T),Rt=(D-y)*(He-S)-(R-S)*(Be-y),Ft=(T-D)*(He-R)-(k-R)*(Be-D);if(fa>0||Rt>0||Ft>0)continue;const Lt=Rt/Fe,Wt=Ft/Fe,Bt=j*Lt+W*Wt+B*(1-Lt-Wt),X=fe*a+ge;Bt<=o[X]||(o[X]=Bt,s[X*4]=ca,s[X*4+1]=la,s[X*4+2]=ha,s[X*4+3]=255)}}return s}}function qs([e,t,n]){const a=Math.hypot(e,t,n)||1;return[e/a,t/a,n/a]}const Us=.2,Ys=.36,zs=[{upTo:20,dark:4,bright:12},{upTo:70,dark:6,bright:14},{upTo:160,dark:2,bright:10},{upTo:198,dark:3,bright:11},{upTo:275,dark:1,bright:9},{upTo:330,dark:5,bright:13},{upTo:360,dark:4,bright:12}];function Ks(e,t,n){const a=Math.max(e,t,n),s=Math.min(e,t,n),o=(a+s)/2/255;if((a===0?0:(a-s)/a)<Us)return o<.08?0:o<.5?8:o<.8?7:15;const i=a-s;let c;a===e?c=(t-n)/i*60:a===t?c=(2+(n-e)/i)*60:c=(4+(e-t)/i)*60,c<0&&(c+=360);const h=zs.find(({upTo:l})=>c<l)??{dark:4,bright:12};return o<.08?0:o>=Ys?h.bright:h.dark}function Vs(e,t){const n=(s,o)=>{const r=(o*t+s)*4;return(e[r+3]??0)===0?-1:Ks(e[r]??0,e[r+1]??0,e[r+2]??0)},a=[];for(let s=0;s<t/2;s+=1){const o=[];for(let r=0;r<t;r+=1)o.push({top:n(r,s*2),bottom:n(r,s*2+1)});a.push(o)}return a}const ce=["#000000","#0000aa","#00aa00","#00aaaa","#aa0000","#aa00aa","#aa5500","#aaaaaa","#555555","#5555ff","#55ff55","#55ffff","#ff5555","#ff55ff","#ffff55","#ffffff"];function Xs(e){const t=({top:n,bottom:a})=>n<0&&a<0?"<span> </span>":n<0?`<span style="color:${ce[a]}">▄</span>`:a<0?`<span style="color:${ce[n]}">▀</span>`:n===a?`<span style="color:${ce[n]}">█</span>`:`<span style="color:${ce[n]};background:${ce[a]}">▀</span>`;return e.map(n=>n.map(t).join("")).join(`
`)}const pt={levels:4,roughness:.28,share:.55},le=32;let tt=null,mn=null,nt=null;function pn(e,t){const n=document.querySelector('link[rel="icon"]');if(!n)return;tt??=Object.assign(document.createElement("canvas"),{width:le,height:le});const a=tt.getContext("2d");a&&(nt??=a.createImageData(le,le),mn??=new $t(le,nt.data),mn.paint(e,{rotation:t}),a.putImageData(nt,0,0),n.type="image/png",n.href=tt.toDataURL("image/png"))}function ea(e){let t=!0;if(typeof IntersectionObserver!="function")return{onScreen:()=>t,stop:()=>{}};const n=new IntersectionObserver(a=>{for(const s of a)t=s.isIntersecting},{rootMargin:"100px"});return n.observe(e),{onScreen:()=>t,stop:()=>n.disconnect()}}const Zs=90,Qs=1e3/12,er=400,at=new WeakMap;function tr(e){const t=(e.textContent??"").split(`
`);return{columns:Math.max(...t.map(n=>n.length)),rows:t.length}}function ft(e,t){at.get(e)?.();const n=t??{...pt,seed:Math.floor(Math.random()*16777215)},{columns:a,rows:s}=tr(e),o=Math.min(a,s*2),r=Qn(n),i=new $t(o);e.dataset.seed=String(n.seed),e.title=`World ${n.seed}, ${r.mesh.faceCount.toLocaleString("en")} triangles`;const c=v=>{e.innerHTML=Xs(Vs(i.paint(r,{rotation:v}),o)),e.classList.add("grown")};if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return c(.6),pn(r,.6),at.set(e,()=>{}),()=>{};let h=0,l=-1/0,d=-1/0;const m=performance.now(),w=ea(e),u=v=>{const f=(v-m)/1e3/Zs*Math.PI*2;w.onScreen()&&v-l>=Qs&&(c(f),l=v),v-d>er&&(pn(r,f),d=v),h=requestAnimationFrame(u)};h=requestAnimationFrame(u);const g=()=>{cancelAnimationFrame(h),w.stop()};return at.set(e,g),g}function nr(){const e=document.querySelector(".planet");return e?ft(e,Un()??void 0):()=>{}}const Q=360,ar=60,or=1.4,fn=Math.PI*2/ar,gn=Math.PI*4;function sr(e){const t=p("canvas",{class:"world",width:Q,height:Q}),n=t.getContext("2d");if(!n)return()=>{};const a={...pt,seed:Math.floor(Math.random()*16777215)},s=n.createImageData(Q,Q),o=new $t(Q,s.data),r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let i,c=.6,h=-.38,l=!r,d=null,m=0,w=performance.now();const u=p("p",{class:"hint"}),g=document.querySelector(".planet"),v=(20*4**pt.levels).toLocaleString("en"),f=()=>{i=Qn(a);const k=Un();u.textContent=`World ${a.seed}: ${i.mesh.faceCount.toLocaleString("en")} triangles. `+(k?`The header is keeping world ${k.seed}, ${(20*4**k.levels).toLocaleString("en")} triangles.`:`The header grows a new one every visit, ${v} triangles each.`),x.hidden=!k,A()},b=p("button",{type:"button",onclick:()=>{xs({...a}),g&&ft(g,{...a}),f()}},"Put it in the header"),x=p("button",{type:"button",hidden:!0,onclick:()=>{Ts(),g&&ft(g),f()}},"Let the header grow its own"),A=()=>{o.paint(i,{rotation:c,tilt:h}),n.putImageData(s,0,0)};let M=0;const C=ea(t),$=k=>{const j=Math.min(.1,(k-w)/1e3);if(!d&&C.onScreen()){if(m!==0){m*=Math.exp(-j/or);const y=l?fn:0;(Math.abs(m)<=y||Math.abs(m)<.01)&&(m=0)}m!==0?(c-=m*j,A()):l&&(c+=fn*j,A()),ht.send({byRadians:m*j,tiltedBy:0,seconds:j})}w=k,M=requestAnimationFrame($)};t.addEventListener("pointerdown",k=>{d={x:k.clientX,y:k.clientY,at:k.timeStamp},m=0,t.setPointerCapture(k.pointerId)}),t.addEventListener("pointermove",k=>{if(!d)return;const j=t.clientWidth||Q,y=(k.clientX-d.x)/j*Math.PI;c-=y;const S=h;h=Math.max(-1.2,Math.min(1.2,h-(k.clientY-d.y)/j*Math.PI)),ht.send({byRadians:y,tiltedBy:h-S,seconds:0});const W=Math.max(.004,(k.timeStamp-d.at)/1e3);m=Math.max(-gn,Math.min(gn,m*.4+y/W*.6)),d={x:k.clientX,y:k.clientY,at:k.timeStamp},A()}),t.addEventListener("pointerup",k=>{d&&k.timeStamp-d.at>120&&(m=0),d=null,w=performance.now()}),t.addEventListener("pointercancel",()=>{d=null,m=0});const E=p("input",{type:"number",min:0,value:a.seed,onchange:()=>{a.seed=Math.max(0,Math.floor(Number(E.value)||0)),f()}}),F=p("button",{type:"button",onclick:()=>{a.seed=Math.floor(Math.random()*16777215),E.value=String(a.seed),f()}},"Another world"),P=p("button",{type:"button",onclick:()=>{l=!l,P.textContent=l?"Hold still":"Turn"}},l?"Hold still":"Turn"),T=(k,j,y,S,W,D)=>{const R=p("output",{},D(a[k])),B=p("input",{type:"range",min:y,max:S,step:W,value:a[k],onchange:()=>{a[k]=Number(B.value),R.textContent=D(a[k]),f()},oninput:()=>{R.textContent=D(Number(B.value))}});return p("label",{},`${j}: `,R,B)};return e.append(t,p("div",{class:"row"},p("span",{},"Seed "),E,F,P,b,x),p("div",{class:"dials"},T("levels","Detail",2,6,1,k=>`${k} splits`),T("roughness","Roughness",.02,1,.01,k=>k.toFixed(2)),T("share","Sea",0,.98,.01,k=>`${Math.round(k*100)}%`)),u),f(),M=requestAnimationFrame($),()=>{cancelAnimationFrame(M),C.stop()}}const rr={name:"world",apps:{worlds:sr},install:()=>nr()},he=[rr,Uo,Oo,Fo,Ga,to,La,$s,ho,Ao,fo,Ko];function wn(e,t){const n=[];for(const a of document.querySelectorAll(".app[data-app]")){const s=e[a.dataset.app??""]?.(a,t);s&&n.push(s)}return()=>{for(const a of n)a()}}function ir(e){const t={},n=e.fields.theme;(n==="dark"||n==="light")&&(t["data-page-theme"]=n);const a=e.fields.sky;return a&&(t["data-sky"]=a),t}const cr=["data-page-theme","data-sky"];function lr(e,t){return t==="/"?e==="/":e.startsWith(t)}const hr=7.8,yn=17,dr=12,ur=8,ot=28,bn=44,pe=8,mr=16;function pr(e){const t=new Map;for(const f of e.nodes){const b=f.label.split(`
`),x=Math.max(...b.map(A=>A.length),1);t.set(f.id,{id:f.id,label:f.label,real:!0,rank:-1,along:Math.max(40,x*hr+dr*2),across:b.length*yn+ur*2,pos:0,preds:[],succs:[]})}for(const f of e.edges){const b=t.get(f.from),x=t.get(f.to);if(!b||!x)throw new Error(`flow: edge ${f.from} --> ${f.to} names a node that is not there`);b.succs.push(x),x.preds.push(b)}fr(t);const n=gr(t,e),a=wr(t);yr(a);const s=a.length,o=a.map(f=>Math.max(yn,...f.map(b=>b.real?b.across:0))),r=[];let i=pe;for(let f=0;f<s;f+=1)r.push(i),i+=(o[f]??0)+bn;const c=f=>(r[f.rank]??0)+((o[f.rank]??0)-(f.real?f.across:0))/2,h=Math.max(...[...t.values()].map(f=>f.pos+f.along))+pe,l=i-bn+pe,d=e.direction==="LR",m=(f,b)=>d?[b,f]:[f,b],w=[...t.values()].filter(f=>f.real).map(f=>{const[b,x]=m(f.pos,c(f));return{id:f.id,label:f.label,x:b,y:x,width:d?f.across:f.along,height:d?f.along:f.across}}),u=e.edges.map((f,b)=>{const x=n[b]??[],A=x[0],M=x[x.length-1];if(!A||!M)throw new Error("flow: an edge lost its ends");const C=[m(A.pos+A.along/2,c(A)+A.across),...x.slice(1,-1).map($=>m($.pos+$.along/2,c($)+(o[$.rank]??0)/2)),m(M.pos+M.along/2,c(M))];return f.label===void 0?{from:f.from,to:f.to,points:C}:{from:f.from,to:f.to,label:f.label,points:C}}),[g,v]=m(h,l);return{direction:e.direction,width:g,height:v,nodes:w,edges:u}}function fr(e){const t=new Set,n=a=>{if(a.rank>=0)return a.rank;if(t.has(a))throw new Error(`flow: there is a cycle through ${a.id}, and a flow has a direction`);return t.add(a),a.rank=a.preds.length===0?0:Math.max(...a.preds.map(n))+1,t.delete(a),a.rank};for(const a of e.values())n(a)}function gr(e,t){let n=0;return t.edges.map(a=>{const s=e.get(a.from),o=e.get(a.to);if(!s||!o)return[];const r=[s];let i=s;for(let c=s.rank+1;c<o.rank;c+=1){n+=1;const h={id:`\0${n}`,label:"",real:!1,rank:c,along:mr,across:0,pos:0,preds:[i],succs:[]};e.set(h.id,h),i.succs.push(h),r.push(h),i=h}return i!==s&&(i.succs.push(o),o.preds.push(i),s.succs.splice(s.succs.indexOf(o),1),o.preds.splice(o.preds.indexOf(s),1)),r.push(o),r})}function wr(e){const t=Math.max(...[...e.values()].map(r=>r.rank))+1,n=Array.from({length:t},()=>[]);for(const r of e.values())n[r.rank]?.push(r);const a=new Map,s=r=>r.forEach((i,c)=>a.set(i,c));n.forEach(s);const o=(r,i)=>i.length===0?a.get(r)??0:i.reduce((c,h)=>c+(a.get(h)??0),0)/i.length;for(let r=0;r<4;r+=1){for(let i=1;i<t;i+=1){const c=n[i]??[];c.sort((h,l)=>o(h,h.preds)-o(l,l.preds)),s(c)}for(let i=t-2;i>=0;i-=1){const c=n[i]??[];c.sort((h,l)=>o(h,h.succs)-o(l,l.succs)),s(c)}}return n}function yr(e){const t=r=>r.reduce((i,c)=>i+c.along,0)+ot*Math.max(0,r.length-1),n=Math.max(...e.map(t));for(const r of e){let i=pe+(n-t(r))/2;for(const c of r)c.pos=i,i+=c.along+ot}const a=r=>r.pos+r.along/2,s=(r,i)=>{for(const c of r){const h=i(c);if(h.length===0)continue;const l=h.reduce((d,m)=>d+a(m),0)/h.length;c.pos=l-c.along/2}for(let c=1;c<r.length;c+=1){const h=r[c-1],l=r[c];if(!h||!l)continue;const d=h.pos+h.along+ot;l.pos<d&&(l.pos=d)}};for(let r=0;r<3;r+=1){for(let i=1;i<e.length;i+=1)s(e[i]??[],c=>c.preds);for(let i=e.length-2;i>=0;i-=1)s(e[i]??[],c=>c.succs)}const o=Math.min(...e.flat().map(r=>r.pos));for(const r of e.flat())r.pos+=pe-o}const gt=/(\w[\w.-]*)(?:\[([^\]]*)\])?/,br=new RegExp(`^${gt.source}\\s*-->(?:\\|([^|]*)\\|)?\\s*${gt.source}$`),vr=new RegExp(`^${gt.source}$`),kr=/^(?:flow\s+)?(TD|LR)$/i;function $r(e){const t=new Map,n=[];let a="TD";const s=(i,c)=>{i&&(t.has(i)||t.set(i,i),c!==void 0&&t.set(i,c.replace(/\\n/g,`
`)))},o=e.split(`
`);let r=!0;return o.forEach((i,c)=>{const h=i.trim();if(h===""||h.startsWith("%"))return;if(r){r=!1;const m=kr.exec(h);if(m){a=m[1]?.toUpperCase()==="LR"?"LR":"TD";return}}const l=br.exec(h);if(l){const[,m,w,u,g,v]=l;s(m,w),s(g,v),n.push(u===void 0?{from:m??"",to:g??""}:{from:m??"",to:g??"",label:u});return}const d=vr.exec(h);if(d){s(d[1],d[2]);return}throw new Error(`flow: cannot read line ${c+1}: "${h}"`)}),{direction:a,nodes:[...t].map(([i,c])=>({id:i,label:c})),edges:n}}const xr=20,vn=17;function Tr(e){let t=5381;for(let n=0;n<e.length;n+=1)t=(t*33^e.charCodeAt(n))>>>0;return t.toString(36)}const L=e=>String(Math.round(e*10)/10);function Mr(e,t){const[n,...a]=e.points;if(!n)return"";let s=`M${L(n[0])},${L(n[1])}`,o=n;for(const r of a){const[i,c]=o,[h,l]=r,d=t?[(i+h)/2,c]:[i,(c+l)/2],m=t?[(i+h)/2,l]:[h,(c+l)/2];s+=` C${L(d[0])},${L(d[1])} ${L(m[0])},${L(m[1])} ${L(h)},${L(l)}`,o=r}return s}function Sr(e){const{points:t}=e,n=t[Math.floor((t.length-1)/2)]??[0,0],a=t[Math.ceil((t.length-1)/2)]??n;return[(n[0]+a[0])/2,(n[1]+a[1])/2]}function Ar(e){const t=pr($r(e)),n=t.direction==="LR",a=`arrow-${Tr(e)}`,s=t.edges.map(c=>{const h=`<path class="edge" d="${Mr(c,n)}" marker-end="url(#${a})"/>`;if(c.label===void 0)return h;const[l,d]=Sr(c);return`${h}<text class="edge-label" x="${L(l)}" y="${L(d)}" text-anchor="middle" dominant-baseline="middle">${I(c.label)}</text>`}).join(""),o=t.nodes.map(c=>{const h=c.x+c.width/2,l=c.label.split(`
`),d=c.y+(c.height-l.length*vn)/2,m=l.map((w,u)=>`<tspan x="${L(h)}" y="${L(d+xr-8+u*vn)}">${I(w)}</tspan>`).join("");return`<g class="node"><rect x="${L(c.x)}" y="${L(c.y)}" width="${L(c.width)}" height="${L(c.height)}" rx="4"/><text text-anchor="middle" dominant-baseline="middle">${m}</text></g>`}).join(""),r=L(t.width),i=L(t.height);return`<figure class="flow"><svg class="flow" viewBox="0 0 ${r} ${i}" width="${r}" height="${i}" style="max-width: 100%; height: auto" role="img"><defs><marker id="${a}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z"/></marker></defs>${s}${o}</svg></figure>`}const Ir=new Set("var let const function return if else for while do break continue new this true false null undefined class extends import export from default async await throw try catch finally typeof instanceof in of switch case delete void yield".split(" "));function U(e,t){return`<span class="hl-${e}">${I(t)}</span>`}function ta(e,t,n){for(let a=t+1;a<e.length;a+=1)if(e[a]==="\\")a+=1;else if(e[a]===n)return a+1;return e.length}function Er(e){let t="",n=0;for(;n<e.length;){const a=e.slice(n);let s;if(a.startsWith("//")){const o=e.indexOf(`
`,n),r=o<0?e.length:o;t+=U("c",e.slice(n,r)),n=r}else if(a.startsWith("/*")){const o=e.indexOf("*/",n+2),r=o<0?e.length:o+2;t+=U("c",e.slice(n,r)),n=r}else if(a[0]==='"'||a[0]==="'"||a[0]==="`"){const o=ta(e,n,a[0]??"");t+=U("s",e.slice(n,o)),n=o}else if(s=/^[A-Za-z_$][\w$]*/.exec(a)){const o=s[0];t+=Ir.has(o)?U("k",o):I(o),n+=o.length}else(s=/^\d+(?:\.\d+)?/.exec(a))?(t+=U("n",s[0]),n+=s[0].length):(t+=I(a[0]??""),n+=1)}return t}function Cr(e){let t="",n=0;for(;n<e.length;){const a=e.slice(n);if(a.startsWith("<!--")){const o=e.indexOf("-->",n+4),r=o<0?e.length:o+3;t+=U("c",e.slice(n,r)),n=r;continue}const s=/^<(\/?)([A-Za-z][\w-]*)/.exec(a);if(!s){const o=e.indexOf("<",n+1),r=o<0?e.length:o;t+=I(e.slice(n,r)),n=r;continue}for(t+=`&lt;${s[1]}${U("t",s[2]??"")}`,n+=s[0].length;n<e.length&&e[n]!==">";){const o=e.slice(n);let r;if(r=/^\s+/.exec(o))t+=r[0],n+=r[0].length;else if(r=/^[A-Za-z_:][\w:.-]*/.exec(o))t+=U("a",r[0]),n+=r[0].length;else if(o[0]==="="&&(o[1]==='"'||o[1]==="'")){const i=ta(e,n+1,o[1]??"");t+=`=${U("s",e.slice(n+1,i))}`,n=i}else t+=I(o[0]??""),n+=1}e[n]===">"&&(t+="&gt;",n+=1)}return t}function jr(e,t){return t==="js"||t==="javascript"?Er(e):t==="html"?Cr(e):I(e)}function Dr(e,t){const a=/^https?:/.test(t)?' target="_blank" rel="noopener noreferrer"':"";return`<a href="${I(t)}"${a}>${e}</a>`}const Or=["large","wide"];function Pr(e,t,n){const a=n&&Or.includes(n)?` class="${n}"`:"";return`<img src="${I(t)}" alt="${I(e)}"${a}>`}const Nr=/(`[^`]+`|!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)|\[[^\]]+\]\([^)\s]+\))/g,Rr=/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/,Fr=/^\[([^\]]+)\]\(([^)\s]+)\)$/;function na(e){return e.split(Nr).map(t=>{if(t.startsWith("`")&&t.endsWith("`")&&t.length>1)return`<code>${I(t.slice(1,-1))}</code>`;const n=Rr.exec(t);if(n)return Pr(n[1]??"",n[2]??"",n[3]);const a=Fr.exec(t);return a?Dr(na(a[1]??""),a[2]??""):I(t)}).join("")}function Lr(e){return e.split(/(<code>[\s\S]*?<\/code>)/g).map(t=>t.startsWith("<code>")?t:t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/(^|[^*])\*([^*]+)\*/g,"$1<em>$2</em>").replace(/ {2,}\n/g,"<br>").replace(/\n/g," ").replace(/ -- /g," — ")).join("")}function V(e){return Lr(na(e))}const kn=/^(?:[-*]|\d+\.)\s/;function Wr(e,t,n){if(!kn.test(e[0]??""))return!1;const a=t.slice(n).find(s=>s.trim()!=="");return a!==void 0&&kn.test(a)}function Br(e){const t=[],n=e.replace(/\r\n?/g,`
`).split(`
`);let a=[],s=!1;return n.forEach((o,r)=>{if(o.startsWith("```")){s=!s,a.push(o),s||(t.push(a),a=[]);return}if(!s&&o.trim()===""){if(Wr(a,n,r+1))return;a.length&&t.push(a),a=[];return}a.push(o)}),a.length&&t.push(a),t}function Hr(e){return e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function Jr(e){const t=/^(#{1,4})\s+(.*)$/.exec(e[0]??"");if(!t||!e.slice(0,-1).every(o=>/ {2,}$/.test(o)))return null;const a=t[1]?.length??1,s=[t[2]??"",...e.slice(1)].join(`
`);return`<h${a} id="${Hr(s)}">${V(s)}</h${a}>`}function Gr(e){if(!e[0]?.startsWith("```"))return null;const t=e[0].slice(3).trim(),n=e.slice(1,-1).join(`
`);return t==="flow"?Ar(n):`<pre><code>${jr(n,t)}</code></pre>`}function _r(e,t){const n=[];for(const a of e)t.test(a)?n.push(a.replace(t,"")):n.length&&(n[n.length-1]+=`
${a.trim()}`);return n}function qr(e){const t=e[0]??"",n=/^\d+\.\s/.test(t),a=/^[-*]\s/.test(t);if(!n&&!a)return null;const s=n?/^\d+\.\s+/:/^[-*]\s+/;if(!e.every(i=>s.test(i)||/^\s/.test(i)))return null;const o=n?"ol":"ul",r=_r(e,s).map(i=>`<li>${V(i)}</li>`).join("");return`<${o}>${r}</${o}>`}function Ur(e){return e.every(n=>n.includes(" :: "))?`<dl>${e.map(n=>{const a=n.indexOf(" :: ");return[n.slice(0,a),n.slice(a+4)]}).map(([n,a])=>`<dt>${V(n)}</dt><dd>${V(a)}</dd>`).join("")}</dl>`:null}function Yr(e){if(!e.every(n=>n.startsWith(">")))return null;const t=e.map(n=>n.replace(/^>\s?/,"")).join(" ");return`<blockquote>${V(t)}</blockquote>`}function zr(e){const t=/^::([a-z0-9-]+)$/.exec(e[0]??"");return!t||e.length!==1?null:`<div class="app" data-app="${t[1]}"></div>`}function Kr(e){return e.length===1&&/^-{3,}$/.test(e[0]??"")?"<hr>":null}function Vr(e){const t=e.length===1&&/^(\\+)$/.exec(e[0]??"");return t?`<div class="space" style="--n:${t[1]?.length??1}"></div>`:null}function Xr(e){return e.length===1&&/^!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)$/.test(e[0]??"")?`<figure>${V(e[0]??"")}</figure>`:null}function Zr(e){return`<p>${V(e.join(`
`))}</p>`}const Qr=[Kr,Vr,Jr,Gr,Yr,zr,Xr,Ur,qr];function aa(e){return Br(e).map(t=>{for(const n of Qr){const a=n(t);if(a!==null)return a}return Zr(t)}).join(`
`)}function xt(e){return e==="/"?"~":`~${e.replace(/\/$/,"")}`}function oa(e,t){return`<p class="ran"><span class="ps1">${I(e)} $</span> ${I(t)}</p>`}function ei(e,t){if(t.parent===null)return"";const n=e.childrenOf(t.route);if(n.length===0)return"";const a=n.map(s=>`<li><a class="entry" href="${s.route}"><code>${I(s.name)}/</code><span class="title">${I(s.title)}</span>`+(s.summary?`<span class="summary">${I(s.summary)}</span>`:"")+"</a></li>").join("");return`${oa(xt(t.route),"ls")}
<ul class="listing">${a}</ul>`}function ti(e,t){const n=e.trailTo(t.route).slice(1).map(a=>a.name).join("/");return oa("~",n?`cd ${n} && cat README.md`:"cat README.md")}function ni(e,t){return`${ti(e,t)}
${aa(t.body)}
${ei(e,t)}`}function ai(e,t){const n=document.querySelector("main");if(!n)return()=>!1;const a=(s,{push:o=!0,keep:r=!1}={})=>{const i=e.at(s);if(!i)return!1;r||(n.innerHTML=ni(e,i));const c=ir(i);for(const h of cr){const l=c[h];l?document.documentElement.setAttribute(h,l):document.documentElement.removeAttribute(h)}document.title=i.route==="/"?"David Rodenas":`${i.title} — David Rodenas`;for(const h of document.querySelectorAll("nav .navlink"))lr(s,h.getAttribute("href")??"\0")?h.setAttribute("aria-current","page"):h.removeAttribute("aria-current");return o&&(s===window.location.pathname?window.history.replaceState({route:s},"",s):window.history.pushState({route:s},"",s),r||window.scrollTo({top:0})),window.goatcounter?.count?.({path:s,title:document.title}),t(i,r),!0};return document.addEventListener("click",s=>{if(s.defaultPrevented||s.button!==0||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey)return;const o=s.target?.closest("a[href]");if(!o||o.target||o.dataset.run)return;const r=new URL(o.href,window.location.href);if(r.origin!==window.location.origin)return;const i=r.pathname.endsWith("/")?r.pathname:`${r.pathname}/`;e.at(i)&&(s.preventDefault(),i!==window.location.pathname&&a(i))}),window.addEventListener("popstate",()=>{const s=window.location.pathname.endsWith("/")?window.location.pathname:`${window.location.pathname}/`;a(s,{push:!1})}),a}class oi{typed=[];drafts=[];index=0;get lines(){return this.typed}add(t){this.typed.push(t),this.drafts=[...this.typed,""],this.index=this.typed.length}previous(t){return this.moveTo(this.index-1,t)}next(t){return this.moveTo(this.index+1,t)}moveTo(t,n){return this.drafts.length===0&&(this.drafts=[""]),t<0||t>=this.drafts.length?n:(this.drafts[this.index]=n,this.index=t,this.drafts[t]??n)}}function si(e,t,n,a){if(e==="k"){const s=t.slice(n);return{line:t.slice(0,n),caret:n,killed:s||a}}if(e==="u"){const s=t.slice(0,n);return{line:t.slice(n),caret:0,killed:s||a}}return e==="y"?{line:t.slice(0,n)+a+t.slice(n),caret:n+a.length,killed:a}:null}function sa(e){return e.split(/\s*(?:;|&&)\s*/).map(t=>t.trim().split(/\s+/).filter(Boolean)).filter(t=>t.length>0)}function Re(e,t){const a=t.startsWith("~")||t.startsWith("/")?[]:e.split("/").filter(Boolean),s=t.replace(/^~/,"").split("/").filter(Boolean),o=[...a];for(const r of s)r!=="."&&(r===".."?o.pop():o.push(r));return o.length===0?"/":`/${o.join("/")}/`}function ri(e){return e.replace(/(?:^|\/)(?:README\.md|\*)$/,"")||"."}const ii={name:"cat",usage:"cat <file>",description:"print a page, README.md or * for the one here",run({site:e,cwd:t},[n]){if(!n)return{text:"cat: usage: cat <file>",error:!0};const a=Re(t,ri(n)),s=e.at(a);return!s||/\.md$/.test(n)!==/README\.md$/.test(n)?{text:`cat: ${n}: no such file`,error:!0}:{html:aa(s.body),at:a}}},ci={name:"cd",usage:"cd [dir]",description:"go to a directory (the address follows)",run(e,[t="~"]){const n=Re(e.cwd,t);return e.site.at(n)?(e.cwd=n,{at:n}):{text:`cd: ${t}: no such directory`,error:!0}}},li={name:"clear",usage:"clear",description:"clear what the shell has printed",run(){return{clear:!0}}},hi={name:"help",usage:"help [command]",description:"this",run({commands:e},[t]){if(t){const o=e.find(r=>r.name===t);return o?{text:`${o.usage}
  ${o.description}`}:{text:`help: ${t}: no such command`,error:!0}}const n=Math.max(...e.map(o=>o.usage.length));return{text:["Commands:",...e.map(o=>`${o.usage.padEnd(n)}  ${o.description}`),"","Tab completes; → takes the grey suggestion. ↑↓ recall. ^K kills to the end of the line, ^U back to the start, ^Y puts it back."].join(`
`)}}};function di(e){const t=e.filter(a=>a.startsWith("-")).flatMap(a=>a.slice(1).split("")),n=e.find(a=>!a.startsWith("-"))??".";return{flags:t,path:n}}function ui(e,t,n){const a=n==="."?"":`${n.replace(/\/$/,"")}/`;return[{mode:"--r-",name:"README.md",title:e.title,href:e.route,run:`cat ${a}README.md`},...t.map(s=>({mode:"dr-x",name:`${s.name}/`,title:s.title,href:s.route}))]}function $n(e){const t=e.run?` data-run="${I(e.run)}"`:"";return`<a href="${I(e.href)}"${t}>${I(e.name)}</a>`}function mi(e,t){const n=(o,r)=>t?`${o.mode}  ${r.padEnd(20)}  ${o.title}`:r,a=o=>t?`${o.mode}  ${$n(o)}${" ".repeat(Math.max(0,20-o.name.length))}  ${I(o.title)}`:$n(o),s=t?[`total ${e.length}`]:[];return{text:[...s,...e.map(o=>n(o,o.name))].join(`
`),html:`<pre>${[...s,...e.map(a)].join(`
`)}</pre>`}}const pi={name:"ls",usage:"ls [-l] [path]",description:"list what a directory holds; -l says what each is",run({site:e,cwd:t},n){const{flags:a,path:s}=di(n),o=a.find(c=>c!=="l");if(o)return{text:`ls: -${o}: no such option. Try ls -l`,error:!0};const r=Re(t,s),i=e.at(r);return i?mi(ui(i,e.childrenOf(r),s),a.includes("l")):{text:`ls: ${s}: no such directory`,error:!0}}},fi={name:"pwd",usage:"pwd",description:"print where you are",run({cwd:e}){return{text:xt(e)}}},ra=[pi,ci,ii,fi,hi,li];class gi{context;constructor(t,n,a=ra){this.context={site:t,cwd:n,commands:a}}get prompt(){return`${xt(this.context.cwd)} $`}moveTo(t){return this.context.site.at(t)?(this.context.cwd=t,!0):!1}run(t){const n=[];for(const[a="",...s]of sa(t)){const o=this.context.commands.find(i=>i.name===a),r=o?o.run(this.context,s):{text:`${a}: command not found. Try help`,error:!0};if(n.push(r),r.error)break}return n}complete(t){const n=t.split(/\s+/),a=n.pop()??"",s=n.length===0?"":`${n.join(" ")} `;return(n.length===0?this.commandNames():this.pathNames(a)).filter(r=>r.startsWith(a)).map(r=>s+r)}commandNames(){return this.context.commands.map(t=>t.name).sort()}pathNames(t){const n=t.lastIndexOf("/"),a=n<0?".":t.slice(0,n+1),s=Re(this.context.cwd,a);if(!this.context.site.at(s))return[];const o=n<0?"":a;return["README.md",...this.context.site.childrenOf(s).map(i=>`${i.name}/`)].map(i=>o+i)}}function wi(e,t,n){if(e==="")return"help";const s=[...[...t].reverse(),...n].find(o=>o.startsWith(e)&&o!==e);return s?s.slice(e.length):""}const wt="shell-pending";function yi(e){try{e&&sessionStorage.setItem(wt,e)}catch{}}function bi(){try{const e=sessionStorage.getItem(wt)??"";return sessionStorage.removeItem(wt),e}catch{return""}}function vi(){window.__stopTyped?.();const e=window.__typed??[];if(window.__typed=[],e.length===0)return null;const t=[];let n="";for(const a of e)a==="Enter"?(t.push(n),n=""):a==="Backspace"?n=n.slice(0,-1):n+=a;return{finished:t,unfinished:n}}function ki(e,t,n={}){const a=document.querySelector(".terminal"),s=document.querySelector(".screen"),o=a?.querySelector("form.prompt"),r=o?.querySelector("input"),i=o?.querySelector(".line"),c=o?.querySelector(".suggest"),h=o?.querySelector(".ps1"),l=document.querySelector(".ran.end"),d=l?.querySelector(".ps1"),m=l?.querySelector(".line"),w=l?.querySelector(".typed");if(!a||!s||!o||!r||!i||!c||!h||!l||!d||!m||!w)return null;const u=()=>{h.textContent=g.prompt,d.textContent=g.prompt},g=new gi(e,t,n.commands),v=new oi;let f=null;const b=y=>{s.append(y)},x=()=>{f?.remove(),f=null},A=()=>{const y=r.selectionStart??r.value.length;i.style.setProperty("--caret",String(y)),i.style.setProperty("--typed",String(r.value.length)),w.textContent=r.value,m.style.setProperty("--caret",String(y)),c.textContent=y===r.value.length?wi(r.value,v.lines,g.complete(r.value)):""},M=(y,S=y.length)=>{r.value=y,r.setSelectionRange(S,S),A()},C=y=>{if(y.clear&&(s.replaceChildren(),n.clearPage?.()),y.html){const S=p("div",{class:y.text?"listing-out":"cat"});S.innerHTML=y.html,b(S)}else y.text&&b(p("pre",{class:y.error?"error":""},y.text))},$=y=>{x();const S=p("p",{class:"echo"},p("span",{class:"ps1"},g.prompt),` ${y}`);b(S);let W=!1;const D=sa(y).map(R=>R.join(" "));for(let R=0;R<D.length;R+=1){const[B]=g.run(D[R]??"");if(B){if(C(B),B.html&&!B.text&&(W=!0),B.at&&!n.moveTo?.(B.at)){yi(D.slice(R+1).join(" && ")),window.location.assign(B.at);return}if(B.error)break}}u(),A(),W?S.scrollIntoView({block:"start"}):window.scrollTo({top:document.documentElement.scrollHeight})},E=()=>{if(x(),r.value.trim()===""){M("help");return}const y=g.complete(r.value);y.length===1?M(y[0]??r.value):y.length>1&&(f=p("p",{class:"hint"},y.map(S=>S.split(" ").pop()).join("  ")),o.insertAdjacentElement("afterend",f),window.scrollTo({top:document.documentElement.scrollHeight}))};o.addEventListener("submit",y=>{y.preventDefault();const S=r.value.trim();M(""),S&&(v.add(S),$(S))});let F="";r.addEventListener("keydown",y=>{if(y.key==="Tab")y.preventDefault(),E();else if(y.key==="ArrowUp")y.preventDefault(),M(v.previous(r.value));else if(y.key==="ArrowDown")y.preventDefault(),M(v.next(r.value));else if(y.key==="ArrowRight"&&r.selectionStart===r.value.length&&c.textContent)y.preventDefault(),M(r.value+c.textContent);else if(y.ctrlKey&&!y.metaKey&&!y.altKey){const S=si(y.key,r.value,r.selectionStart??r.value.length,F);if(!S)return;y.preventDefault(),x(),M(S.line,S.caret),F=S.killed}else x()});for(const y of["input","keyup","click","focus","select"])r.addEventListener(y,A);let P=!0;r.addEventListener("input",()=>{P&&r.value!==""&&window.scrollTo({top:document.documentElement.scrollHeight}),P=r.value===""}),document.addEventListener("selectionchange",()=>{document.activeElement===r&&A()}),s.addEventListener("click",y=>{const S=y.target?.closest("a[data-run]");S?.dataset.run&&(y.preventDefault(),$(S.dataset.run))}),window.addEventListener("keydown",y=>{const W=y.target?.matches("input, textarea, select, [contenteditable]")??!1,D=y.key.length===1&&!y.ctrlKey&&!y.metaKey&&!y.altKey;W||!D||r.focus({preventScroll:!1})}),o.addEventListener("click",()=>r.focus()),l.addEventListener("click",()=>r.focus()),A();const T=bi();T&&$(T);const k=vi();if(k){for(const y of k.finished)y.trim()&&(v.add(y.trim()),$(y.trim()));M(k.unfinished),r.focus()}return{run:$,moveTo:y=>{g.moveTo(y)&&(s.replaceChildren(),u(),A())}}}const $i=[{file:"book/index.md",markdown:`---
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
`}],xn="---";function xi(e){return(/^"(.*)"$/.exec(e)??/^'(.*)'$/.exec(e))?.[1]??e}function Ti(e){const t=e.replace(/\r\n?/g,`
`).split(`
`);if(t[0]?.trim()!==xn)return{fields:{},body:e.trim()};const n=t.indexOf(xn,1);if(n<0)return{fields:{},body:e.trim()};const a={};for(const s of t.slice(1,n)){const o=s.indexOf(":");o<=0||(a[s.slice(0,o).trim()]=xi(s.slice(o+1).trim()))}return{fields:a,body:t.slice(n+1).join(`
`).trim()}}function Mi(e){const n=e.replace(/\.md$/,"").replace(/(^|\/)index$/,"");return n===""?"/":`/${n}/`}function Si(e){if(e==="/")return null;const t=e.slice(0,-1);return t.slice(0,t.lastIndexOf("/")+1)}function Tn(e){if(e==="/")return"/";const t=e.slice(0,-1);return t.slice(t.lastIndexOf("/")+1)}function Ai(e){const{fields:t,body:n}=Ti(e.markdown),a=Mi(e.file);return{file:e.file,route:a,parent:Si(a),name:Tn(a),title:t.title??Tn(a),summary:t.summary??"",order:Number(t.order??"100"),body:n,fields:t}}function Mn(e,t){return e.order-t.order||e.name.localeCompare(t.name)}class Ii{byRoute;constructor(t){const n=t.map(Ai).sort(Mn);this.byRoute=new Map(n.map(a=>[a.route,a]))}get pages(){return[...this.byRoute.values()]}at(t){return this.byRoute.get(t)}childrenOf(t){return this.pages.filter(n=>n.parent===t).sort(Mn)}trailTo(t){const n=this.at(t);return n?n.parent===null?[n]:[...this.trailTo(n.parent),n]:[]}}const de=new Ii($i);function Sn(){const e=[...ra,...he.flatMap(l=>l.commands??[])],t=Object.assign({},...he.map(l=>l.apps??{})),a=(l=>l.endsWith("/")?l:`${l}/`)(window.location.pathname),s=de.at(a);let o=wn(t,{site:de}),r=null;const i=ai(de,(l,d)=>{o(),o=wn(t,{site:de});for(const m of he)m.arrive?.(l);d||r?.moveTo(l.route)});if(r=ki(de,s?a:"/",{moveTo:l=>i(l,{keep:!0}),clearPage:()=>{o(),o=()=>{},document.querySelector("main")?.replaceChildren()},commands:e}),s)for(const l of he)l.arrive?.(s);const h={run:l=>r?.run(l)};for(const l of he)l.install?.(h)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Sn):Sn();
