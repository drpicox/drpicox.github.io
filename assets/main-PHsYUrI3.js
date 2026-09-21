function p(e,t={},...n){const a=document.createElement(e);for(const[o,s]of Object.entries(t))s===void 0||s===!1||(typeof s=="function"?a.addEventListener(o.slice(2).toLowerCase(),s):s===!0?a.setAttribute(o,""):a.setAttribute(o,String(s)));for(const o of n)o==null||o===!1||a.append(o);return a}const Fn={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function E(e){return e.replace(/[&<>"]/g,t=>Fn[t]??t)}const Pn=["January","February","March","April","May","June","July","August","September","October","November","December"];function Ke(e){const[t,n,a]=e.refreshed.split("-").map(Number),o=`${a} ${Pn[(n??1)-1]} ${t}`,s=`${Math.min(...e.years)} to ${Math.max(...e.years)}`;return`<p class="source">Source: ${E(e.attribution)} <a href="${E(e.dataset)}">The dataset, at its source.</a> This site keeps sums of the finished years ${s}, last added to on ${o}.</p>`}function zt(e,t){const n=e.querySelector("p.source");if(n)return n;const a=document.createElement("div");return fetch(t).then(o=>o.json()).then(o=>{a.innerHTML=Ke(o)}).catch(()=>{}),a}const Z=[{code:"08019043",name:"Barcelona (Eixample)",kind:"traffic",area:"urban"},{code:"08019044",name:"Barcelona (Gràcia - Sant Gervasi)",kind:"traffic",area:"urban"},{code:"08019004",name:"Barcelona (Poblenou)",kind:"background",area:"urban"},{code:"08019058",name:"Barcelona (Observatori Fabra)",kind:"background",area:"suburban"},{code:"08015021",name:"Badalona",kind:"background",area:"urban"},{code:"08187012",name:"Sabadell",kind:"traffic",area:"urban"},{code:"17079003",name:"Girona (Escola de Música)",kind:"traffic",area:"urban"},{code:"25120001",name:"Lleida",kind:"traffic",area:"urban"},{code:"43148028",name:"Tarragona (Parc de la Ciutat)",kind:"background",area:"urban"},{code:"08137001",name:"Montseny (La Castanya)",kind:"background",area:"rural"}];function Le(e,t){return t==="workdays"?[e.workdays]:t==="weekends"?[e.weekends]:[e.workdays,e.weekends]}const Ln=e=>(e%4===0&&e%100!==0||e%400===0?366:365)*24,Ae=e=>e.reduce((t,n)=>t+n.reduce((a,o)=>a+o,0),0);function Rn(e,t){return Object.entries(e.years).map(([n,a])=>{const o=Le(a,t),s=o.reduce((c,l)=>c+Ae(l.counts),0),r=o.reduce((c,l)=>c+Ae(l.sums),0),i=Le(a,"all").reduce((c,l)=>c+Ae(l.counts),0);return{year:Number(n),mean:s>0?r/s:Number.NaN,measured:i/Ln(Number(n))}}).filter(({mean:n})=>!Number.isNaN(n)).sort((n,a)=>n.year-a.year)}function Wn(e,t){const n=Object.entries(e.years).filter(([a])=>Number(a)>=t.from&&Number(a)<=t.to).flatMap(([,a])=>Le(a,t.days));return Array.from({length:24},(a,o)=>Array.from({length:12},(s,r)=>{const i=n.reduce((l,h)=>l+(h.sums[r]?.[o]??0),0),c=n.reduce((l,h)=>l+(h.counts[r]?.[o]??0),0);return{mean:c>0?i/c:null,count:c}}))}const X=[[0,[0,255,0]],[20,[225,225,0]],[40,[255,0,0]],[60,[225,0,225]],[80,[64,0,64]],[230,[16,0,8]]],Bn=([e,t,n])=>(.299*e+.587*t+.114*n)/255;function ze(e){const t=Math.max(0,Math.min(e,230)),n=Math.max(1,X.findIndex(([l])=>l>=t)),[a,o]=X[n-1]??X[0],[s,r]=X[n]??X[X.length-1],i=(t-a)/(s-a),c=o.map((l,h)=>Math.round(l+((r[h]??0)-l)*i));return{background:`rgb(${c.join(",")})`,light:Bn(c)<.45}}const we=80,Xt=["January","February","March","April","May","June","July","August","September","October","November","December"],Vt=e=>String(e+1).padStart(2,"0");function Hn(e,t,n){if(e.mean===null)return'<td class="none"></td>';const{background:a,light:o}=ze(e.mean),s=o?' class="deep"':"",r=`${Xt[n]}, hour ${Vt(t)}: ${e.mean.toFixed(1)} µg/m³, the mean of ${e.count} measurements`;return`<td${s} style="background:${a}" title="${r}">${Math.round(e.mean)}</td>`}function _n(e){const t=`<tr><th></th>${Xt.map(a=>`<th scope="col">${a.slice(0,3)}</th>`).join("")}</tr>`,n=e.map((a,o)=>`<tr><th scope="row">${Vt(o)}</th>${a.map((s,r)=>Hn(s,o,r)).join("")}</tr>`);return`<table class="heat graded"><thead>${t}</thead><tbody>${n.join("")}</tbody></table>`}function Xe(e){if(e<=0)return[0];const t=10**Math.floor(Math.log10(e)),n=e/t>=5?t:e/t>=2?t/2:t/5,a=[];for(let o=0;o<=e;o+=n)a.push(Math.round(o*100)/100);return a}const de=720,Ee=190,_={top:14,right:8,bottom:22,left:34},O=e=>e.toFixed(1);function Zt(e,t,n){const a=Math.min(...e),o=Math.max(...e),s=de-_.left-_.right,r=Ee-_.top-_.bottom,i=s/Math.max(1,o-a+1),c=d=>_.left+(d-a)*i,l=d=>_.top+r-(d-t)/Math.max(1e-9,n-t)*r,u=Xe(n-t).map(d=>Math.round((d+t)*100)/100).map(d=>`<line class="grid" x1="${_.left}" x2="${de-_.right}" y1="${O(l(d))}" y2="${O(l(d))}"/><text x="${_.left-4}" y="${O(l(d)+3)}" text-anchor="end">${d}</text>`).join(""),f=o-a>12?5:1,w=Array.from({length:o-a+1},(d,g)=>a+g).filter(d=>d%f===0).map(d=>`<text x="${O(c(d)+i/2)}" y="${Ee-6}" text-anchor="middle">${d}</text>`).join("");return{slot:i,x:c,y:l,left:_.left,right:de-_.right,top:_.top,height:r,levels:d=>d.map(({from:g,to:$,value:m,label:b})=>`<line class="span" x1="${O(c(g))}" x2="${O(c($)+i)}" y1="${O(l(m))}" y2="${O(l(m))}"/><text class="span" x="${O((c(g)+c($)+i)/2)}" y="${O(l(m)-5)}" text-anchor="middle">${b}</text>`).join(""),wrap:(d,g)=>`<svg class="years" viewBox="0 0 ${de} ${Ee}" role="img" aria-label="${d}">${u}${w}${g}</svg>`}}function Re(e,t){const n=Math.max(t.top??0,...e.map(({value:h})=>h),1),a=Zt(e.map(({year:h})=>h),0,n),{x:o,y:s,slot:r}=a,i=e.map(({year:h,value:u,title:f,chosen:w,partial:d,colour:g})=>`<rect class="${["bar",w?"chosen":"",d?"partial":""].filter(Boolean).join(" ")}" data-year="${h}"${g?` style="--bar:${g}"`:""} x="${O(o(h)+r*.15)}" y="${O(s(u))}" width="${O(r*.7)}" height="${O(s(0)-s(u))}"/><rect class="hit" data-year="${h}" x="${O(o(h))}" y="${a.top}" width="${O(r)}" height="${a.height}"><title>${f}</title></rect>`).join(""),c=(t.references??[]).map(({value:h,label:u})=>`<line class="reference" x1="${a.left}" x2="${a.right}" y1="${O(s(h))}" y2="${O(s(h))}"/><text class="reference" x="${a.right-2}" y="${O(s(h)-3)}" text-anchor="end">${u}</text>`).join(""),l=a.levels(t.spans??[]);return a.wrap(t.label,`${i}${c}${l}`)}const Jn=.75,Gn=[{value:40,label:"EU limit, 40"},{value:10,label:"WHO guideline, 10"}];function qn(e,t){const n=e.map(({year:a,mean:o,measured:s})=>{const r=s<Jn,i=r?`, from only ${Math.round(s*100)}% of the year's hours`:"";return{year:a,value:o,partial:r,colour:ze(o).background,chosen:a>=t.from&&a<=t.to,title:`${a}: ${o.toFixed(1)} µg/m³${i}`}});return Re(n,{label:"Mean NO2 of each year, µg/m³",top:we,references:Gn})}const yt={all:"every day of the week",workdays:"Monday to Friday",weekends:"Saturdays and Sundays"};function Yn(){const e=Array.from({length:we/5+1},(n,a)=>ze(a*5).background),t=[0,20,40,60,we].map(n=>`<span>${n===we?`${n}+`:n}</span>`).join("");return`<div class="scale" aria-hidden="true"><div class="ramp" style="background:linear-gradient(to right,${e.join(",")})"></div><div class="ticks">${t}</div><div class="ticks words"><span>clean</span><span>EU limit</span><span>twice it</span></div></div>`}function Qt(e,t){const n=Object.keys(e.years).map(Number),a=Math.max(t.from,Math.min(...n)),o=Math.min(t.to,Math.max(...n)),s=a===o?String(a):`${a}–${o}`;return`<figure class="no2"><figcaption><strong>${e.name}</strong> · ${e.kind}, ${e.area} · mean NO2 in µg/m³ by hour of the day and month of the year · ${yt[t.days]}, ${s}</figcaption>`+_n(Wn(e,t))+Yn()+`<h4>The mean of each year, ${yt[t.days]}</h4>`+qn(Rn(e,t.days),{from:a,to:o})+"</figure>"}function We(e){const t=Object.keys(e.years).map(Number);return{from:Math.min(...t),to:Math.max(...t),days:"all"}}const Un=[["all","every day"],["workdays","Monday to Friday"],["weekends","Saturday and Sunday"]];function Kn(e){const t=new Map,n=zt(e,"/data/no2/index.json"),a=p("div");a.append(...e.querySelectorAll("figure"));let o=null,s={from:0,to:9999,days:"all"},r=!1;const i=(m,b=String(m))=>p("option",{value:m},b),c=p("select",{onchange:()=>{g(c.value)}},...Z.map(({code:m,name:b})=>i(m,b))),l=p("select",{onchange:()=>d({days:l.value})},...Un.map(([m,b])=>i(m,b))),h=p("select",{onchange:()=>d({from:Number(h.value),to:Math.max(Number(h.value),s.to)})}),u=p("select",{onchange:()=>d({to:Number(u.value),from:Math.min(Number(u.value),s.from)})}),f=p("button",{type:"button",onclick:()=>o&&d(We(o))},"every year");function w(){o&&(a.innerHTML=Qt(o,s),h.value=String(s.from),u.value=String(s.to),l.value=s.days)}function d(m){s={...s,...m},w()}async function g(m){const b=t.get(m)??fetch(`/data/no2/${m}.json`).then(T=>T.json());t.set(m,b);try{const T=await b;if(r||c.value!==m)return;o=T,s={...We(T),days:s.days};const A=Object.keys(T.years);h.replaceChildren(...A.map(M=>i(M))),u.replaceChildren(...A.map(M=>i(M))),w()}catch{t.delete(m),a.replaceChildren(p("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}a.addEventListener("click",m=>{const b=m.target?.closest("[data-year]")?.getAttribute("data-year");b&&d({from:Number(b),to:Number(b)})});const $=p("div",{class:"row"},p("label",{},"Station ",c),p("label",{},"Days ",l),p("label",{},"Years ",h," to ",u),f);return e.replaceChildren($,a,n),g(c.value),()=>{r=!0}}const zn="https://analisi.transparenciacatalunya.cat/resource";function en(e,t){const n=new URL(`${zn}/${e}.json`);for(const[a,o]of Object.entries(t))o!==void 0&&n.searchParams.set(`$${a}`,String(o));return n.toString()}const wt="tasf-thgu",tn=Array.from({length:24},(e,t)=>String(t+1).padStart(2,"0")),Xn=0,Vn=6,ue=()=>Array.from({length:12},()=>new Array(24).fill(0)),Zn=()=>({workdays:{sums:ue(),counts:ue()},weekends:{sums:ue(),counts:ue()}});function Qn(e){if(!Array.isArray(e))throw new Error("the portal did not answer with rows");if(e.length===0)throw new Error("the portal answered with no rows");return e}function ea(e,t){const n=Number(t.month)-1;tn.forEach((a,o)=>{const s=e.sums[n],r=e.counts[n];if(!s||!r)throw new Error(`month ${t.month} is not a month`);s[o]=(s[o]??0)+Number(t[`s${a}`]??0),r[o]=(r[o]??0)+Number(t[`n${a}`]??0)})}const ta={name:"no2",directory:"public/data/no2",firstYear:1991,files:Z.map(e=>`${e.code}.json`),about:{measures:"NO2, hourly, µg/m³",network:"Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica",attribution:"Generalitat de Catalunya, Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica. Dades obertes.",dataset:`https://analisi.transparenciacatalunya.cat/d/${wt}`,stations:Z},requestsFor(e){const t=Z.map(a=>`'${a.code}'`).join(","),n=tn.map(a=>`sum(h${a}) as s${a}, count(h${a}) as n${a}`).join(", ");return[en(wt,{select:`codi_eoi, date_extract_m(data) as month, date_extract_dow(data) as dow, count(*) as days, ${n}`,where:`contaminant='NO2' and codi_eoi in (${t}) and data between '${e}-01-01T00:00:00' and '${e}-12-31T23:59:59'`,group:"codi_eoi,month,dow",limit:5e3})]},withYear(e,t,n){const a=Qn(n[0]);if(a.some(s=>Number(s.days)>5))throw new Error("some days are in the portal twice");if(!a.some(s=>s.month==="12"))throw new Error("the year does not reach December yet");const o=new Map;for(const s of a){const r=s.codi_eoi??"",i=o.get(r)??Zn();o.set(r,i);const c=Number(s.dow);ea(c===Xn||c===Vn?i.weekends:i.workdays,s)}return Object.fromEntries(Z.map(s=>{const r=`${s.code}.json`,i=o.get(s.code),c={...e[r]?.years,...i?{[t]:i}:{}};return[r,{...s,years:c}]}))}},na=e=>{const t=JSON.parse(e(`/data/no2/${Z[0]?.code}.json`)),n=JSON.parse(e("/data/no2/index.json"));return Qt(t,We(t))+Ke(n)},aa={name:"air-quality",apps:{no2:Kn},stills:{no2:na},sources:[ta]},ee=5,ve=8,ne=e=>Math.max(0,Math.min(100,e));function bt(e){const{focus:t,fatigue:n,featureSize:a,weeks:o,calendar:s,meetingTypes:r}=e,i=[];let c=0,l=0;for(let h=0;h<o;h+=1)for(let u=0;u<ee;u+=1){let f=0,w=0;for(let d=0;d<ve;d+=1){const g=r[s[`${u}-${d}`]??""];if(g){f=ne(f+g.focus),w=ne(w+g.fatigue),i.push({week:h,day:u,hour:d,inMeeting:!0,hourFocus:f,hourFatigue:w,hourProductivity:0,accumulatedProductivity:c,completedFeatures:l,featureCompleted:!1});continue}f=ne(f+t),w=ne(w+n);const $=ne(f-w),m=a-c,b=$>m,T=b?m:$;b?(l+=1,c=0):c+=T,i.push({week:h,day:u,hour:d,inMeeting:!1,hourFocus:f,hourFatigue:w,hourProductivity:T,accumulatedProductivity:c,completedFeatures:l,featureCompleted:b}),b&&(f=0)}}return i}function me(){return Array.from({length:ve},()=>new Array(ee).fill(0))}function fe(e,{hour:t,day:n},a){const o=e[t];o&&(o[n]=(o[n]??0)+a)}function vt(e,{featureSize:t,weeks:n}){const a=e[e.length-1],o=a?.completedFeatures??0,s=a?.accumulatedProductivity??0,r=o+Math.round(10*s/t)/10,i=o*t+s,c=Array.from({length:ee},()=>({productivity:0,features:0,meetings:0})),l={focus:me(),fatigue:me(),productivity:me(),features:me()};for(const u of e){const f=c[u.day];f.productivity+=u.hourProductivity,u.featureCompleted&&(f.features+=1),u.inMeeting&&(f.meetings+=1),fe(l.focus,u,u.hourFocus),fe(l.fatigue,u,u.hourFatigue),fe(l.productivity,u,u.hourProductivity),u.featureCompleted&&fe(l.features,u,1)}const h=u=>u.map(f=>f.map(w=>n>0?w/n:0));return{totalFeatures:r,totalProductivity:i,averageFeaturesPerWeek:n>0?r/n:0,averageProductivityPerWeek:n>0?i/n:0,days:c,hours:{focus:h(l.focus),fatigue:h(l.fatigue),productivity:h(l.productivity),features:l.features}}}const be=480,U=240,F={top:10,right:10,bottom:34,left:36};function nn(e,t,n,a){const o=be-F.left-F.right,s=U-F.top-F.bottom,r=l=>F.top+s-(e>0?l/e*s:0),i=a.map(l=>`<line class="grid" x1="${F.left}" x2="${be-F.right}" y1="${r(l)}" y2="${r(l)}"/><text x="${F.left-4}" y="${r(l)+3}" text-anchor="end">${l}</text>`).join(""),c=(n>1?[1,Math.ceil(n/2),n]:[]).filter((l,h,u)=>u.indexOf(l)===h).map(l=>`<text x="${F.left+(l-1)/Math.max(1,n-1)*o}" y="${U-F.bottom+14}" text-anchor="middle">${l}</text>`).join("");return`${i}${c}<text x="${F.left+o/2}" y="${U-6}" text-anchor="middle">${t.x}</text><text transform="translate(9 ${F.top+s/2}) rotate(-90)" text-anchor="middle">${t.y}</text>`}function oa(e,t){const n=Math.max(...e.map(h=>h.values.length),1),a=Math.max(1,...e.flatMap(h=>h.values)),o=be-F.left-F.right,s=U-F.top-F.bottom,r=h=>F.left+h/Math.max(1,n-1)*o,i=h=>F.top+s-h/a*s,c=e.map(h=>{const u=h.values.map((f,w)=>`${r(w).toFixed(1)},${i(f).toFixed(1)}`).join(" ");return`<polyline class="line ${h.className}" points="${u}"><title>${h.name}</title></polyline>`}).join(""),l=e.map((h,u)=>`<rect class="${h.className}" x="${F.left+u*90}" y="${U-F.bottom+20}" width="10" height="3"/><text x="${F.left+u*90+14}" y="${U-F.bottom+24}">${h.name}</text>`).join("");return`<svg viewBox="0 0 ${be} ${U}" role="img" aria-label="${t.y} by ${t.x}">${nn(a,t,n,Xe(a))}${c}${l}</svg>`}const $t=480,ae=240,H={top:10,right:10,bottom:34,left:36};function an(e,t,n){const a=Math.max(...e.map(d=>d.values.length),1),o=Math.max(1,...e.flatMap(d=>d.values)),s=$t-H.left-H.right,r=ae-H.top-H.bottom,i=s/a,c=i*.7/e.length,l=d=>H.top+r-d/o*r,h=e.map((d,g)=>d.values.map(($,m)=>{const b=H.left+m*i+i*.15+g*c;return`<rect class="${d.className}" x="${b.toFixed(1)}" y="${l($).toFixed(1)}" width="${c.toFixed(1)}" height="${(H.top+r-l($)).toFixed(1)}"><title>${d.name}: ${Math.round($*10)/10}</title></rect>`}).join("")).join(""),u=(n??[]).map((d,g)=>`<text x="${H.left+g*i+i/2}" y="${ae-H.bottom+14}" text-anchor="middle">${d}</text>`).join(""),f=e.map((d,g)=>`<rect class="${d.className}" x="${H.left+g*90}" y="${ae-H.bottom+20}" width="10" height="3"/><text x="${H.left+g*90+14}" y="${ae-H.bottom+24}">${d.name}</text>`).join(""),w=nn(o,t,n?0:a,Xe(o));return`<svg viewBox="0 0 ${$t} ${ae}" role="img" aria-label="${t.y} by ${t.x}">${w}${h}${u}${f}</svg>`}const Be=["Mon","Tue","Wed","Thu","Fri"],on=Array.from({length:ve},(e,t)=>`${9+t}:00`);function sa(e){return e<=500?e:e<=750?500+(e-500)*2:e<1e3?1e3+(e-750)*35:1e4}function ra(e){return e<=500?e:e<=1e3?500+(e-500)/2:e<1e4?750+(e-1e3)/35:1e3}function pe(e,t){const n=t.flat(),a=Math.min(...n),o=Math.max(...n),s=p("div",{class:"week"},p("span"),...Be.map(r=>p("span",{class:"head"},r)));return t.forEach((r,i)=>{s.append(p("span",{class:"hour"},on[i]??""));for(const c of r){const l=o>a?(c-a)/(o-a):0;s.append(p("span",{class:"cell",style:`--heat:${(.1+l*.9).toFixed(2)}`},String(Math.round(c))))}}),p("div",{},p("h4",{},e),s)}function ia(e){const t={focus:25,fatigue:15,featureSize:300,weeks:8},n={"🍽️ Lunch":{focus:-100,fatigue:-100},"🏃 Sprint plan":{focus:-100,fatigue:50},"😴 Boring":{focus:-50,fatigue:-25}},a={};for(let x=0;x<ee;x+=1)a[`${x}-3`]="🍽️ Lunch";let o="🏃 Sprint plan",s=null;const r=p("div",{class:"figures"}),i=p("div",{class:"chart"}),c=p("div",{class:"maps"}),l=p("div",{class:"week"}),h=p("select"),u=p("input",{type:"number",min:-100,max:100}),f=p("input",{type:"number",min:-100,max:100}),w=p("input",{type:"text",placeholder:"New meeting name",size:16}),d=(x,v,C,y,S=j=>j,W=j=>j)=>{const j=p("output",{},String(t[x])),P=p("input",{type:"range",min:C,max:y,value:W(t[x]),oninput:()=>{t[x]=S(Number(P.value)),j.textContent=String(t[x]),N()}});return p("label",{},`${v}: `,j,P)},g=p("div",{class:"dials"},d("focus","Focus an hour",0,100),d("fatigue","Fatigue an hour",0,100),d("featureSize","Feature size",0,1e3,sa,ra),d("weeks","Weeks",1,16));function $(){h.replaceChildren(...Object.keys(n).map(v=>p("option",{value:v,selected:v===o},v)));const x=n[o];u.value=String(x?.focus??0),f.value=String(x?.fatigue??0)}h.addEventListener("change",()=>{o=h.value,$()});const m=()=>{n[o]={focus:Number(u.value)||0,fatigue:Number(f.value)||0},N()};u.addEventListener("change",m),f.addEventListener("change",m);const b=()=>{const x=w.value.trim();!x||n[x]||(n[x]={focus:0,fatigue:0},o=x,w.value="",$())},T=p("div",{class:"row"},p("span",{},"Paint: "),h,p("span",{},"focus "),u,p("span",{},"fatigue "),f,w,p("button",{type:"button",onclick:b},"Add"));let A=null;const M=x=>{if(A==="add"&&!a[x])a[x]=o;else if(A==="remove"&&a[x])delete a[x];else return;N()};function I(){l.replaceChildren(p("span"),...Be.map(x=>p("span",{class:"head"},x))),on.forEach((x,v)=>{l.append(p("span",{class:"hour"},x));for(let C=0;C<ee;C+=1){const y=`${C}-${v}`,S=a[y];l.append(p("span",{class:S?"slot meeting":"slot",title:S??"free",onpointerdown:W=>{W.preventDefault(),A=a[y]?"remove":"add",M(y)},onpointerenter:()=>{A&&M(y)}},S?S.slice(0,2):""))}})}window.addEventListener("pointerup",()=>{A=null});const k=p("div",{class:"row"}),D=()=>{s={summary:vt(bt({...t,calendar:a,meetingTypes:n}),t),weeks:t.weeks},N()},L=()=>{s=null,N()};function N(){I();const x=bt({...t,calendar:a,meetingTypes:n}),v=vt(x,t),C=t.weeks*ee*ve;r.replaceChildren(p("div",{class:"clean"},p("strong",{},v.totalFeatures.toFixed(1)),"features finished"),p("div",{},p("strong",{},v.averageFeaturesPerWeek.toFixed(2)),"features a week"),p("div",{},p("strong",{},Math.round(v.totalProductivity/C).toString()),"productivity an hour"),p("div",{},p("strong",{},String(C)),"hours simulated")),k.replaceChildren(s?p("span",{},`Baseline: ${s.summary.averageFeaturesPerWeek.toFixed(2)} features a week over ${s.weeks} weeks; now ${v.averageFeaturesPerWeek.toFixed(2)}. `):p("span",{},"Keep this run to compare against: "),p("button",{type:"button",onclick:D},s?"Save again":"Save as baseline")),s&&k.append(p("button",{type:"button",onclick:L},"Clear")),i.innerHTML=an([{name:"Productivity",className:"clean",values:v.days.map(y=>y.productivity/t.weeks)},{name:"Features ×100",className:"debt",values:v.days.map(y=>y.features/t.weeks*100)}],{x:"",y:"A day, on average"},Be),i.prepend(p("h4",{},"The shape of a week")),c.replaceChildren(pe("Focus",v.hours.focus),pe("Fatigue",v.hours.fatigue),pe("Productivity",v.hours.productivity),pe("Features finished",v.hours.features))}$(),e.append(g,T,p("div",{class:"charts"},l,i),r,k,c),N()}const ca={name:"developer-meetings",apps:{"developer-meetings":ia}};function la(e,t){const n=[];for(let a=e.length-1;a>=0;a-=1)n.push(e.slice(0,a));for(let a=1;a<=t.length;a+=1)n.push(t.slice(0,a));return n}const ha=3800,da=6500,ua=26,ma=46,fa=420;function pa(e){return[...e.childNodes].map(t=>t.nodeName==="BR"?`
`:t.textContent??"").join("")}function ga(e){const t=document.querySelector("main h1");if(!t||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return()=>{};const n={text:pa(t)};t.setAttribute("aria-label",n.text),t.classList.add("typing");const a=document.createElement("span");a.className="caret idle",a.setAttribute("aria-hidden","true");const o=(h,u)=>{const f=h.split(`
`).flatMap((w,d)=>d===0?[w]:[document.createElement("br"),w]);if(u){const w=document.createElement("a");w.href=u,w.append(...f,a),t.replaceChildren(w)}else t.replaceChildren(...f,a)};o(n.text);let s=n,r=[],i=performance.now()+ha,c=0;const l=h=>{if(c=requestAnimationFrame(l),h<i)return;if(r.length===0){const f=e(s,n);r=la(s.text,f.text),s=f,a.classList.remove("idle")}const u=r.shift()??s.text;o(u,r.length===0?s.href:void 0),r.length===0?(a.classList.add("idle"),i=h+da):u===""?i=h+fa:i=h+(u.length<(r[0]?.length??0)?ma:ua)};return c=requestAnimationFrame(l),()=>{cancelAnimationFrame(c),o(n.text),a.remove(),t.classList.remove("typing"),t.removeAttribute("aria-label")}}function ya(e,t){const n=[...e];for(let a=n.length-1;a>0;a-=1){const o=Math.min(a,Math.floor(t()*(a+1)));[n[a],n[o]]=[n[o],n[a]]}return n}function wa(e,t){let n=[];return a=>(n.length===0&&(n=ya(e,t),n.length>1&&n[0]===a&&n.push(n.shift())),n.shift()??a)}const ba=[{text:`More than
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
as this page opened.`,href:"/worlds/"}];let Ie=null;const va={name:"headline",arrive:e=>{if(Ie?.(),Ie=null,e.route!=="/")return;let t=null;Ie=ga((n,a)=>(t??=wa([a,...ba],Math.random),t(n)))}};class $a{listeners=new Set;send(t){for(const n of[...this.listeners])n(t)}on(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}}const He=new $a,ka=900,xa=480,ge={x:1600,y:1e3};function ye(e,t){return(e%t+t)%t}class Ta{x=0;y=0;written="";driving=!1;follow({byRadians:t,tiltedBy:n,seconds:a}){const o=document.documentElement;if(o.dataset.sky!=="stars")return;this.driving||this.takeOver(o);const s=ka/(Math.PI*2),r=(a/xa*Math.PI*2+t)*s;this.x=ye(this.x+r,ge.x),this.y=ye(this.y-n*s,ge.y);const i=`${(Math.round(this.x*2)/2).toFixed(1)}px ${(Math.round(this.y*2)/2).toFixed(1)}px`;if(i===this.written)return;this.written=i;const[c,l]=i.split(" ");o.style.setProperty("--sky-x",c??"0px"),o.style.setProperty("--sky-y",l??"0px")}release(){const t=document.documentElement;t.classList.remove("sky-driven"),t.style.removeProperty("--sky-x"),t.style.removeProperty("--sky-y"),this.x=0,this.y=0,this.written="",this.driving=!1}takeOver(t){const n=getComputedStyle(document.body,"::before").transform;if(n&&n!=="none")try{const a=new DOMMatrixReadOnly(n);this.x=ye(a.m41,ge.x),this.y=ye(a.m42,ge.y)}catch{}t.classList.add("sky-driven"),this.driving=!0}}function Sa(e){return He.on(t=>e.follow(t))}const kt=new Ta,Ma={name:"sky",install:()=>Sa(kt),arrive:()=>kt.release()},Ce=20;function Aa(e){const{baseTime:t,shortcutFactor:n,interestRate:a,timeHorizon:o}=e,s=[];let r=null;const i=t;let c=t*(1-n),l=0,h=0,u=0,f=0,w=0,d=0;for(let g=0;g<o*Ce;){for(;w<=g;)l+=1,u+=1,w+=i;for(;d<=g;)h+=1,f+=1,d+=c,c*=1+a;if(g+=1,g%Ce===0){const $=g/Ce;s.push({month:$,cleanCumulative:l,debtCumulative:h,cleanMonthly:u,debtMonthly:f,debtFeatureCost:c}),u=0,f=0,r===null&&l>h&&(r=$)}}return{months:s,breakEvenMonth:r}}const Ea=[{key:"baseTime",label:"Base time",min:1,max:30,step:1,show:e=>`${e} days`},{key:"shortcutFactor",label:"Shortcuts",min:0,max:.9,step:.05,show:e=>`${Math.round(e*100)}%`},{key:"interestRate",label:"Interest",min:0,max:1,step:.01,show:e=>`${Math.round(e*100)}%`},{key:"timeHorizon",label:"Timeline",min:6,max:60,step:1,show:e=>`${e} months`}];function Ia(e){const t={baseTime:20,shortcutFactor:.25,interestRate:.1,timeHorizon:24},n=p("div",{class:"figures"}),a=p("div",{class:"chart"}),o=p("div",{class:"chart"}),s=p("p"),r=p("div",{class:"dials"},...Ea.map(c=>{const l=p("output",{},c.show(t[c.key])),h=p("input",{type:"range",min:c.min,max:c.max,step:c.step,value:t[c.key],oninput:()=>{t[c.key]=Number(h.value),l.textContent=c.show(t[c.key]),i()}});return p("label",{},`${c.label}: `,l,h)}));function i(){const{months:c,breakEvenMonth:l}=Aa(t),h=c[c.length-1],u=h?.cleanCumulative??0,f=h?.debtCumulative??0,w=u>0?(u-f)/u*100:0,d=Math.abs(w)<.1?"Even":w>0?"Loss":"Gain",g=Math.abs(w)<.1?"≈0%":`${Math.abs(w).toFixed(1)}%`;n.replaceChildren(p("div",{class:"clean"},p("strong",{},String(u)),"clean features"),p("div",{class:"debt"},p("strong",{},String(f)),"debt features"),p("div",{},p("strong",{},l?`month ${l}`:"never"),"break-even"),p("div",{},p("strong",{},g),`${d.toLowerCase()} on the shortcut road`)),a.innerHTML=oa([{name:"Clean",className:"clean",values:c.map($=>$.cleanCumulative)},{name:"Debt-driven",className:"debt",values:c.map($=>$.debtCumulative)}],{x:"Months",y:"Features"}),a.prepend(p("h4",{},"Cumulative features")),o.innerHTML=an([{name:"Clean",className:"clean",values:c.slice(1).map($=>$.cleanMonthly)},{name:"Debt-driven",className:"debt",values:c.slice(1).map($=>$.debtMonthly)}],{x:"Months",y:"Features a month"}),o.prepend(p("h4",{},"Monthly delivery rate")),s.textContent=t.interestRate===0?"With no interest there is no compound slowdown, and the shortcut simply wins. That is the one case that does not happen to real code.":l?`${Math.round(t.shortcutFactor*100)}% saved at first, ${Math.round(t.interestRate*100)}% interest on every feature: clean development overtakes at month ${l}, and by month ${t.timeHorizon} the shortcut road has delivered ${g} less.`:`${Math.round(t.shortcutFactor*100)}% saved at first, ${Math.round(t.interestRate*100)}% interest on every feature: in ${t.timeHorizon} months the clean road has not yet caught up. Give it longer, or raise the interest.`}e.append(r,n,p("div",{class:"charts"},a,o),s),i()}const Ca={name:"technical-debt",apps:{"technical-debt":Ia}},Da="theme";function sn(){const e=document.documentElement,t=e.dataset.pageTheme;let n=null;try{n=localStorage.getItem(Da)}catch{n=null}const a=t??(n==="light"||n==="dark"?n:null);a?e.dataset.theme=a:delete e.dataset.theme}const _e="theme";function ja(){return window.matchMedia("(prefers-color-scheme: dark)").matches}function Oa(){let e=null;try{e=localStorage.getItem(_e)}catch{e=document.documentElement.dataset.theme??null}return e==="light"||e==="dark"?e:ja()?"dark":"light"}class Na{apply(t){const n=t==="toggle"?Oa()==="dark"?"light":"dark":t;try{n==="system"?localStorage.removeItem(_e):localStorage.setItem(_e,n)}catch{}return sn(),n}}function Fa(e){const t=document.querySelector(".theme-toggle");return t?(t.classList.add("ready"),t.removeAttribute("aria-hidden"),t.removeAttribute("tabindex"),t.addEventListener("click",e),()=>t.removeEventListener("click",e)):()=>{}}const rn=["light","dark","system"];function Pa(e){return rn.includes(e)}function xt(e){const t=rn.filter(a=>a!==e),n=a=>`theme ${a}`;return{text:`theme: ${e}
  ${t.map(n).join("   ")}`,html:`<pre>theme: ${e}
  ${t.map(a=>`<a href="#" data-run="${E(n(a))}">${E(n(a))}</a>`).join("   ")}</pre>`}}function La(e){return{name:"theme",usage:"theme [light|dark|system|auto]",description:"switch the colours, or toggle them",run({site:t,cwd:n},[a]){const o=t.at(n)?.fields.theme;if(o)return{text:`theme: this page keeps its own, ${o}. It works everywhere else.`,error:!0};if(a===void 0)return xt(e.apply("toggle"));const s=a==="auto"?"system":a;return Pa(s)?xt(e.apply(s)):{text:`theme: ${a}: choose light, dark or system`,error:!0}}}}const Ra={name:"theme",commands:[La(new Na)],install:e=>Fa(()=>e.run("theme")),arrive:()=>sn()},Je={variable:"tn",atLeast:!0,threshold:20,months:[0,1,2,3,4,5,6,7,8,9,10,11]};function Wa(e,t){const n=e.map(({value:d})=>d),a=Math.floor(Math.min(...n,...(t.spans??[]).map(({value:d})=>d))),o=Math.ceil(Math.max(...n,a+1)),s=Zt(e.map(({year:d})=>d),a,o),{x:r,y:i,slot:c}=s,l=d=>r(d)+c/2,h=[];for(const d of e){const g=h[h.length-1];g&&g[g.length-1]?.year===d.year-1?g.push(d):h.push([d])}const u=h.map(d=>`<polyline class="line" points="${d.map(({year:g,value:$})=>`${O(l(g))},${O(i($))}`).join(" ")}"/>`).join(""),f=e.map(({year:d,value:g,title:$,partial:m})=>`<circle class="dot${m?" partial":""}" cx="${O(l(d))}" cy="${O(i(g))}" r="3.5"><title>${$}</title></circle>`).join(""),w=s.levels(t.spans??[]);return s.wrap(t.label,`${u}${f}${w}`)}function Ba(e,{threshold:t,atLeast:n},a){if(!e)return 0;const[o=0,...s]=e;return s.reduce((r,i,c)=>o+c*a>=t-1e-9===n?r+i:r,0)}const te={tn:{code:1002,unit:"°C",name:"daily minimum",summary:"mean",bin:.5,range:[-30,35]},tx:{code:1001,unit:"°C",name:"daily maximum",summary:"mean",bin:.5,range:[-25,50]},pp:{code:1300,unit:"mm",name:"daily rain",summary:"sum",bin:.5,range:[0,250]},pi:{code:1303,unit:"mm/h",name:"most rain in one hour",summary:"max",bin:.5,range:[0,100]}},Ha=.95,_a=(e,t)=>new Date(Date.UTC(e,t+1,0)).getUTCDate(),q=e=>e.reduce((t,n)=>t+n,0);function Ja(e,t){return e.length===0?null:t==="sum"?q(e.map(({figure:n})=>n)):t==="max"?Math.max(...e.map(({figure:n})=>n)):q(e.map(({figure:n,weight:a})=>n*a))/q(e.map(({weight:n})=>n))}function Ga(e,t){const n=te[t.variable];return Object.entries(e.years).flatMap(([a,o])=>{const s=o[t.variable];if(!s)return[];const r=Number(a),i=s.months.map(d=>({days:Ba(d,t,n.bin),measured:q(d?.slice(1)??[])})),c=d=>t.months.includes(d),l=q(i.filter((d,g)=>c(g)).map(d=>d.measured)),h=q(t.months.map(d=>_a(r,d))),u=q(i.filter((d,g)=>c(g)).map(d=>d.days)),f=s.summaries.flatMap((d,g)=>c(g)&&d!==null?[{figure:d,weight:i[g]?.measured??0}]:[]),w=Ja(f,n.summary);return[{year:r,days:u,elsewhere:q(i.map(d=>d.days))-u,measured:l,expected:h,whole:l/h>=Ha,summary:w,months:i}]}).sort((a,o)=>a.year-o.year)}const Tt=["January","February","March","April","May","June","July","August","September","October","November","December"];function St(e){const{name:t,unit:n}=te[e.variable],a=e.variable==="pi"?"":"a ",o=e.atLeast?`of ${e.threshold} ${n} or more`:`below ${e.threshold} ${n}`,s=Tt[e.months[0]??0],r=Tt[e.months[e.months.length-1]??11],i=e.months.length===12?"whole year":`${s} to ${r}`;return`days with ${a}${t} ${o}, ${i}`}const cn=["January","February","March","April","May","June","July","August","September","October","November","December"],qa=.55;function Ya(e,t,{days:n,measured:a}){const o=`${cn[t]} ${e}`;if(a===0)return`<td class="none" title="${o}: not measured"></td>`;const s=Math.round(n/a*1e3)/1e3;return`<td${s>=qa?' class="deep"':""} style="--v:${s}" title="${o}: ${n} of ${a} days">${n||""}</td>`}function Ua(e,t){const n=`<tr><th></th>${cn.map(o=>`<th scope="col">${o.slice(0,3)}</th>`).join("")}</tr>`,a=[...e].reverse().map(({year:o,months:s})=>`<tr><th scope="row">${o}</th>${s.map((r,i)=>Ya(o,i,r)).join("")}</tr>`);return`<table class="heat calendar${t?" warm":""}"><thead>${n}</thead><tbody>${a.join("")}</tbody></table>`}const Mt=e=>e.reduce((t,n)=>t+n,0)/e.length;function At(e){const t=e.flatMap(({summary:n})=>n===null?[]:[n]);return{from:e[0]?.year??0,to:e[e.length-1]?.year??0,years:e.length,days:Mt(e.map(({days:n})=>n)),summary:t.length?Mt(t):null}}function Ka(e){const t=e.filter(a=>a.whole);if(t.length<4)return null;const n=Math.floor(t.length/2);return[At(t.slice(0,n)),At(t.slice(n))]}const za=["January","February","March","April","May","June","July","August","September","October","November","December"],Xa={mean:"The mean",sum:"The total",max:"The highest"},ie=e=>String(Math.round(e*10)/10),Va=e=>`${e>0?"+":e<0?"−":""}${ie(Math.abs(e))}`,Za=e=>`${Number(e.slice(8,10))} ${za[Number(e.slice(5,7))-1]} ${e.slice(0,4)}`;function Qa(e,t){const{unit:n,name:a}=te[t.variable],o=Object.values(e.years).flatMap(i=>i[t.variable]?[i[t.variable].record]:[]),[s,r]=t.atLeast?o.map(([i,c])=>[i,c]).reduce((i,c)=>c[0]>i[0]?c:i):o.map(([,,i,c])=>[i,c]).reduce((i,c)=>c[0]<i[0]?c:i);return`<p class="record">The ${t.atLeast?"highest":"lowest"} ${a} on record here: ${s} ${n} on ${Za(r)}, whatever months are chosen.</p>`}function ln(e,t){const n=te[t.variable],a=`<figcaption><strong>${e.name}</strong> · ${e.altitude} m, ${e.setting} · ${St(t)}</figcaption>`,o=Ga(e,t);if(o.length===0)return`<figure class="weather">${a}<p>This station has no ${n.name} on record.</p></figure>`;const s=Ka(o),r=({from:d,to:g})=>`${d}–${g}`,i=s?'<div class="figures">'+s.map(d=>`<div><strong>${ie(d.days)}</strong>days a year, ${r(d)}</div>`).join("")+`<div><strong>${Va(s[1].days-s[0].days)}</strong>days a year, from one half to the other</div></div>`:"",c=o.map(({year:d,days:g,elsewhere:$,measured:m,expected:b,whole:T})=>{const A=$>0?`, and ${$} more outside the months chosen`:"",M=T?"":`, with only ${m} of ${b} days measured`;return{year:d,value:g,partial:!T,title:`${d}: ${g} days${M}${A}`}}),l=(s??[]).map(d=>({from:d.from,to:d.to,value:d.days,label:`${ie(d.days)} a year`})),h=o.flatMap(({year:d,summary:g,whole:$})=>g===null||!$?[]:[{year:d,value:g,title:`${d}: ${ie(g)} ${n.unit}`}]),u=(s??[]).flatMap(d=>d.summary===null?[]:[{from:d.from,to:d.to,value:d.summary,label:`${ie(d.summary)} ${n.unit}`}]),f=`${Xa[n.summary]} ${n.name} of each year, ${n.unit}`,w=(n.summary==="mean"?Wa:Re)(h,{label:f,spans:u});return`<figure class="weather">${a}${i}<h4>Days a year</h4>${Re(c,{label:`Days a year: ${St(t)}`,spans:l})}<h4>When in the year they fell</h4>${Ua(o,t.atLeast&&n.unit==="°C")}<h4>${f}, in the months chosen</h4>${w}`+Qa(e,t)+"</figure>"}const Et=[{id:"tropical-nights",name:"tropical nights",variable:"tn",atLeast:!0,threshold:20},{id:"torrid-nights",name:"torrid nights",variable:"tn",atLeast:!0,threshold:25},{id:"hot-days",name:"hot days",variable:"tx",atLeast:!0,threshold:30},{id:"torrid-days",name:"torrid days",variable:"tx",atLeast:!0,threshold:35},{id:"frost-days",name:"frost days",variable:"tn",atLeast:!1,threshold:0},{id:"rainy-days",name:"rainy days",variable:"pp",atLeast:!0,threshold:1},{id:"heavy-rain",name:"days of heavy rain",variable:"pp",atLeast:!0,threshold:20},{id:"downpours",name:"days with a downpour",variable:"pi",atLeast:!0,threshold:10}],Q=[{code:"WU",name:"Badalona - Museu",municipality:"Badalona",altitude:42,setting:"urban, by the sea"},{code:"X4",name:"Barcelona - el Raval",municipality:"Barcelona",altitude:33,setting:"dense city, on a roof"},{code:"X8",name:"Barcelona - Zona Universitària",municipality:"Barcelona",altitude:82,setting:"city edge"},{code:"D5",name:"Barcelona - Observatori Fabra",municipality:"Barcelona",altitude:410,setting:"wooded hill above the city"},{code:"UP",name:"Cabrils",municipality:"Cabrils",altitude:81,setting:"coastal slope, half rural"},{code:"XF",name:"Sabadell - Parc Agrari",municipality:"Sabadell",altitude:259,setting:"farmland beside a city"},{code:"XJ",name:"Girona",municipality:"Girona",altitude:72,setting:"market gardens by the city"},{code:"XE",name:"Tarragona - Complex Educatiu",municipality:"Tarragona",altitude:6,setting:"coast"},{code:"VK",name:"Raimat",municipality:"Lleida",altitude:286,setting:"inland plain, vineyards"}],It=[["whole year",[0,1,2,3,4,5,6,7,8,9,10,11]],["June to August",[5,6,7]],["May to October",[4,5,6,7,8,9]],["December to February",[0,1,11]]],eo={tn:[-10,30],tx:[0,45],pp:[.5,100],pi:[.5,60]};function to(e){const t=new Map,n=zt(e,"/data/weather/index.json"),a=p("div");a.append(...e.querySelectorAll("figure"));let o=null,s=Je,r=!1;const i=(m,b)=>p("option",{value:m},b),c=p("select",{onchange:()=>{g(c.value)}},...Q.map(({code:m,name:b})=>i(m,b))),l=p("select",{onchange:()=>{const m=Et.find(({id:b})=>b===l.value);m&&d({variable:m.variable,atLeast:m.atLeast,threshold:m.threshold})}},...Et.map(({id:m,name:b})=>i(m,b))),h=p("select",{onchange:()=>d({months:It[Number(h.value)]?.[1]??Je.months})},...It.map(([m],b)=>i(b,m))),u=p("output"),f=p("input",{type:"range",step:.5,oninput:()=>d({threshold:Number(f.value)})});function w(){const[m,b]=eo[s.variable];f.min=String(m),f.max=String(b),f.value=String(s.threshold),u.textContent=`${s.atLeast?"":"below "}${s.threshold} ${te[s.variable].unit}${s.atLeast?" or more":""}`,o&&(a.innerHTML=ln(o,s))}function d(m){s={...s,...m},w()}async function g(m){const b=t.get(m)??fetch(`/data/weather/${m}.json`).then(T=>T.json());t.set(m,b);try{const T=await b;if(r||c.value!==m)return;o=T,w()}catch{t.delete(m),a.replaceChildren(p("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}const $=p("div",{class:"dials"},p("label",{},"Station",c),p("label",{},"Counting",l),p("label",{},"Threshold: ",u,f),p("label",{},"Months",h));return e.replaceChildren($,a,n),g(c.value),()=>{r=!0}}function no(e,t,[n,a]){if(e.length===0)return null;const o=Math.round((a-n)/t),s=new Map;for(const l of e){const h=Math.min(o-1,Math.max(0,Math.floor((l-n)/t+1e-9)));s.set(h,(s.get(h)??0)+1)}const r=Math.min(...s.keys()),i=Math.max(...s.keys());return[Math.round((n+r*t)*1e3)/1e3,...Array.from({length:i-r+1},(l,h)=>s.get(r+h)??0)]}const Ct="7bvh-jvq2",hn=5e4,Dt=Object.entries(te),ao="No representatiu",oo=["Representatiu",""],so=(e,t)=>Math.round(e*10**t)/10**t;function ro(e,t){if(e.length===0)return null;if(t==="max")return Math.max(...e);const n=e.reduce((a,o)=>a+o,0);return so(t==="sum"?n:n/e.length,2)}function io(e,t){const n=Array.from({length:12},(s,r)=>e.filter(({date:i})=>Number(i.slice(5,7))===r+1).map(({value:i})=>i)),a=e.reduce((s,r)=>r.value>s.value?r:s),o=e.reduce((s,r)=>r.value<s.value?r:s);return{months:n.map(s=>no(s,t.bin,t.range)),summaries:n.map(s=>ro(s,t.summary)),record:[a.value,a.date,o.value,o.date]}}function co(e){if(!Array.isArray(e))throw new Error("the portal did not answer with rows");if(e.length>=hn)throw new Error("the answer was cut short at the limit");const t=e;if(!t.some(o=>o.data_lectura?.slice(5,7)==="12"))throw new Error("the year does not reach December yet");const n=new Map,a=new Set;for(const o of t){const s=o.estat??"";if(s===ao)continue;if(!oo.includes(s))throw new Error(`the network marks days as "${s}", which nobody has decided how to read`);const r=o.data_lectura?.slice(0,10)??"",i=`${o.codi_estacio}/${o.codi_variable}`;if(a.has(`${i}/${r}`))throw new Error(`${i} has ${r} twice`);a.add(`${i}/${r}`);const c=Number(o.valor);Number.isFinite(c)&&n.set(i,[...n.get(i)??[],{date:r,value:c}])}return n}const lo={name:"weather",directory:"public/data/weather",firstYear:1988,files:Q.map(e=>`${e.code}.json`),about:{measures:"daily minimum and maximum temperature, daily rain, most rain in one hour",network:"Xarxa d'Estacions Meteorològiques Automàtiques (XEMA)",attribution:"Servei Meteorològic de Catalunya (XEMA). Dades obertes de la Generalitat de Catalunya.",dataset:`https://analisi.transparenciacatalunya.cat/d/${Ct}`,stations:Q},requestsFor(e){const t=Q.map(a=>`'${a.code}'`).join(","),n=Dt.map(([,a])=>a.code).join(",");return[en(Ct,{select:"codi_estacio,codi_variable,data_lectura,valor,estat",where:`codi_estacio in (${t}) and codi_variable in (${n}) and data_lectura between '${e}-01-01T00:00:00' and '${e}-12-31T23:59:59'`,limit:hn})]},withYear(e,t,n){const a=co(n[0]);return Object.fromEntries(Q.map(o=>{const s=`${o.code}.json`,r=Dt.flatMap(([l,h])=>{const u=a.get(`${o.code}/${h.code}`);return u?[[l,io(u,h)]]:[]}),i=Object.fromEntries(r),c={...e[s]?.years,...r.length?{[t]:i}:{}};return[s,{...o,years:c}]}))}},ho=e=>{const t=JSON.parse(e(`/data/weather/${Q[0]?.code}.json`)),n=JSON.parse(e("/data/weather/index.json"));return ln(t,Je)+Ke(n)},uo={name:"weather",apps:{weather:to},stills:{weather:ho},sources:[lo]},Ve="header-world";function dn(){try{const e=localStorage.getItem(Ve);if(!e)return null;const t=JSON.parse(e);return[t.seed,t.levels,t.roughness,t.share].every(a=>typeof a=="number"&&Number.isFinite(a))?t:null}catch{return null}}function mo(e){try{localStorage.setItem(Ve,JSON.stringify(e))}catch{}}function fo(){try{localStorage.removeItem(Ve)}catch{}}const J=(1+Math.sqrt(5))/2,po=[[-1,J,0],[1,J,0],[-1,-J,0],[1,-J,0],[0,-1,J],[0,1,J],[0,-1,-J],[0,1,-J],[J,0,-1],[J,0,1],[-J,0,-1],[-J,0,1]],go=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];function yo(){const e=po.map(([t,n,a])=>{const o=Math.hypot(t,n,a);return{direction:[t/o,n/o,a/o],radius:1,surface:0}});return un(e,go.map(t=>[...t]))}const wo=(e,t)=>(e+t)/2;function bo(e,t,n=wo){const a=Array.from({length:e.vertexCount},(i,c)=>({direction:[e.directions[c*3]??0,e.directions[c*3+1]??0,e.directions[c*3+2]??0],radius:e.radii[c]??1,surface:e.surface[c]??0})),o=new Map,s=(i,c)=>{const l=i<c?`${i}:${c}`:`${c}:${i}`,h=o.get(l);if(h!==void 0)return h;const u=a[i],f=a[c],[w,d,g]=u.direction,[$,m,b]=f.direction,T=Math.hypot(w*u.radius-$*f.radius,d*u.radius-m*f.radius,g*u.radius-b*f.radius),[A,M,I]=[(w+$)/2,(d+m)/2,(g+b)/2],k=Math.hypot(A,M,I)||1,D=n(u.surface,f.surface);a.push({direction:[A/k,M/k,I/k],radius:(u.radius+f.radius)/2+t(T),surface:D});const L=a.length-1;return o.set(l,L),L},r=[];for(let i=0;i<e.faceCount;i+=1){const c=e.faces[i*3],l=e.faces[i*3+1],h=e.faces[i*3+2],u=s(c,l),f=s(l,h),w=s(h,c);r.push([c,u,w],[l,f,u],[h,w,f],[u,f,w])}return un(a,r)}function un(e,t){const n=new Float32Array(e.length*3),a=new Float32Array(e.length),o=new Float32Array(e.length);e.forEach((r,i)=>{n[i*3]=r.direction[0],n[i*3+1]=r.direction[1],n[i*3+2]=r.direction[2],a[i]=r.radius,o[i]=r.surface});const s=new Uint32Array(t.length*3);return t.forEach(([r,i,c],l)=>{s[l*3]=r,s[l*3+1]=i,s[l*3+2]=c}),{directions:n,radii:a,surface:o,faces:s,faceCount:t.length,vertexCount:e.length}}function vo(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let n=Math.imul(t^t>>>15,1|t);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function $o(e){const t=yo();return{seed:e,mesh:t,temperature:new Float32Array(t.vertexCount),faceColour:new Uint8ClampedArray(t.faceCount*3),seaRadius:0}}function ko(e,t){return{...e,mesh:t,temperature:new Float32Array(t.vertexCount),faceColour:new Uint8ClampedArray(t.faceCount*3)}}function xo(e,t){return Math.abs(e.mesh.directions[t*3+1]??0)}function mn(e,t,n){const a=e.mesh.faces[n*3]??0,o=e.mesh.faces[n*3+1]??0,s=e.mesh.faces[n*3+2]??0;return((t[a]??0)+(t[o]??0)+(t[s]??0))/3}function To(e,t){return mn(e,e.mesh.radii,t)}const fn=(e=4,t=.28,n=.2)=>a=>{const o=vo(a.seed);let s=a.mesh;const r=Float32Array.from(s.surface,()=>o());s={...s,surface:r};for(let i=0;i<e;i+=1)s=bo(s,c=>c*t*(o()-.5),(c,l)=>{const h=.5+(o()-.5)*(c-l)*n;return Math.min(1,Math.max(0,c*(1-h)+l*h))});return ko(a,s)},pn=({equator:e=1,pole:t=.05,peak:n=0}={})=>a=>{const o=new Float32Array(a.mesh.vertexCount),s=a.mesh.radii,r=s.reduce((l,h)=>Math.min(l,h),1/0),c=s.reduce((l,h)=>Math.max(l,h),-1/0)-r||1;for(let l=0;l<a.mesh.vertexCount;l+=1){const h=((s[l]??1)-r)/c,u=xo(a,l)**2.2;o[l]=e+(t-e)*u+(n-e)*h}return{...a,temperature:o}},gn=(e=.55)=>t=>{const n=Float32Array.from(t.mesh.radii).sort(),a=Math.min(n.length-1,Math.floor(n.length*e)),o=n[a]??1,s=Float32Array.from(t.mesh.radii,r=>Math.max(r,o));return{...t,mesh:{...t.mesh,radii:s},seaRadius:o}},So=[24,92,168],Mo=[62,176,206],Ao=[214,196,138],jt=[190,158,84],De=[70,138,66],Eo=[74,104,76],Io=[136,128,116],Ot=[238,243,247];function Y(e,t,n){const a=Math.min(1,Math.max(0,n));return[e[0]+(t[0]-e[0])*a,e[1]+(t[1]-e[1])*a,e[2]+(t[2]-e[2])*a]}function Co(e){return e>.78?jt:e>.62?Y(De,jt,(e-.62)/.16):e>.3?De:Y(Eo,De,(e-.12)*5.5)}const yn=e=>{const t=new Uint8ClampedArray(e.mesh.faceCount*3),n=e.mesh.radii.reduce((o,s)=>Math.max(o,s),-1/0),a=Math.max(1e-6,n-e.seaRadius);for(let o=0;o<e.mesh.faceCount;o+=1){const s=(To(e,o)-e.seaRadius)/a,r=mn(e,e.temperature,o);let i;s<=.002?(i=Y(Mo,So,.55),r<.16&&(i=Y(i,Ot,(.16-r)*6))):(i=Y(Ao,Co(r),Math.min(1,s*9)),i=Y(i,Io,Math.max(0,s-.55)*2.2),r<.26&&(i=Y(i,Ot,(.26-r)*4))),t[o*3]=i[0],t[o*3+1]=i[1],t[o*3+2]=i[2]}return{...e,faceColour:t}},Do=[fn(),gn(),pn(),yn];function jo(e,t=Do){return t.reduce((n,a)=>a(n),$o(e))}function wn(e){return jo(e.seed,[fn(e.levels,e.roughness),gn(e.share),pn(),yn])}const Nt=.3,Oo=[-.5,.45,.74],No=1.02;class Ze{size;pixels;depth;view=new Float32Array(0);screen=new Float32Array(0);constructor(t,n=new Uint8ClampedArray(t*t*4)){if(n.length!==t*t*4)throw new Error(`SphereRaster: ${t}×${t} needs ${t*t*4} bytes, not ${n.length}`);this.size=t,this.pixels=n,this.depth=new Float32Array(t*t)}paint(t,n){const{size:a,pixels:o,depth:s}=this;o.fill(0),s.fill(-1/0);const[r,i,c]=Fo(n.light??Oo),l=n.tilt??-.38,h=Math.cos(l),u=Math.sin(l),f=Math.cos(n.rotation),w=Math.sin(n.rotation),{directions:d,radii:g,faces:$,faceCount:m,vertexCount:b}=t.mesh;let T=1;for(let k=0;k<b;k+=1){const D=g[k]??1;D>T&&(T=D)}const A=a/(2*T*No);this.view.length<b*3&&(this.view=new Float32Array(b*3),this.screen=new Float32Array(b*3));const M=this.view,I=this.screen;for(let k=0;k<b;k+=1){const D=g[k]??1,L=(d[k*3]??0)*D,N=(d[k*3+1]??0)*D,x=(d[k*3+2]??0)*D,v=L*f-x*w,C=L*w+x*f,y=N*h+C*u,S=-N*u+C*h;M[k*3]=v,M[k*3+1]=y,M[k*3+2]=S,I[k*3]=a/2+v*A,I[k*3+1]=a/2-y*A,I[k*3+2]=S}for(let k=0;k<m;k+=1){const D=$[k*3]??0,L=$[k*3+1]??0,N=$[k*3+2]??0,x=I[D*3],v=I[D*3+1],C=I[D*3+2],y=I[L*3],S=I[L*3+1],W=I[L*3+2],j=I[N*3],P=I[N*3+1],B=I[N*3+2],ke=(y-x)*(P-v)-(S-v)*(j-x);if(ke>=0)continue;const et=M[D*3],tt=M[D*3+1],nt=M[D*3+2],at=M[L*3]-et,ot=M[L*3+1]-tt,st=M[L*3+2]-nt,rt=M[N*3]-et,it=M[N*3+1]-tt,ct=M[N*3+2]-nt,lt=ot*ct-st*it,ht=st*rt-at*ct,dt=at*it-ot*rt,xe=Math.hypot(lt,ht,dt)||1,Mn=lt/xe*r+ht/xe*i+dt/xe*c,Te=Nt+(1-Nt)*Math.max(0,Mn),An=(t.faceColour[k*3]??0)*Te,En=(t.faceColour[k*3+1]??0)*Te,In=(t.faceColour[k*3+2]??0)*Te,Cn=Math.max(0,Math.floor(Math.min(x,y,j))),Dn=Math.min(a-1,Math.ceil(Math.max(x,y,j))),jn=Math.max(0,Math.floor(Math.min(v,S,P))),On=Math.min(a-1,Math.ceil(Math.max(v,S,P)));for(let le=jn;le<=On;le+=1)for(let he=Cn;he<=Dn;he+=1){const Se=he+.5,Me=le+.5,Nn=(y-x)*(Me-v)-(S-v)*(Se-x),ut=(j-y)*(Me-S)-(P-S)*(Se-y),mt=(x-j)*(Me-P)-(v-P)*(Se-j);if(Nn>0||ut>0||mt>0)continue;const ft=ut/ke,pt=mt/ke,gt=C*ft+W*pt+B*(1-ft-pt),z=le*a+he;gt<=s[z]||(s[z]=gt,o[z*4]=An,o[z*4+1]=En,o[z*4+2]=In,o[z*4+3]=255)}}return o}}function Fo([e,t,n]){const a=Math.hypot(e,t,n)||1;return[e/a,t/a,n/a]}const Po=.2,Lo=.36,Ro=[{upTo:20,dark:4,bright:12},{upTo:70,dark:6,bright:14},{upTo:160,dark:2,bright:10},{upTo:198,dark:3,bright:11},{upTo:275,dark:1,bright:9},{upTo:330,dark:5,bright:13},{upTo:360,dark:4,bright:12}];function Wo(e,t,n){const a=Math.max(e,t,n),o=Math.min(e,t,n),s=(a+o)/2/255;if((a===0?0:(a-o)/a)<Po)return s<.08?0:s<.5?8:s<.8?7:15;const i=a-o;let c;a===e?c=(t-n)/i*60:a===t?c=(2+(n-e)/i)*60:c=(4+(e-t)/i)*60,c<0&&(c+=360);const l=Ro.find(({upTo:h})=>c<h)??{dark:4,bright:12};return s<.08?0:s>=Lo?l.bright:l.dark}function Bo(e,t){const n=(o,s)=>{const r=(s*t+o)*4;return(e[r+3]??0)===0?-1:Wo(e[r]??0,e[r+1]??0,e[r+2]??0)},a=[];for(let o=0;o<t/2;o+=1){const s=[];for(let r=0;r<t;r+=1)s.push({top:n(r,o*2),bottom:n(r,o*2+1)});a.push(s)}return a}const oe=["#000000","#0000aa","#00aa00","#00aaaa","#aa0000","#aa00aa","#aa5500","#aaaaaa","#555555","#5555ff","#55ff55","#55ffff","#ff5555","#ff55ff","#ffff55","#ffffff"];function Ho(e){const t=({top:n,bottom:a})=>n<0&&a<0?"<span> </span>":n<0?`<span style="color:${oe[a]}">▄</span>`:a<0?`<span style="color:${oe[n]}">▀</span>`:n===a?`<span style="color:${oe[n]}">█</span>`:`<span style="color:${oe[n]};background:${oe[a]}">▀</span>`;return e.map(n=>n.map(t).join("")).join(`
`)}const Ge={levels:4,roughness:.28,share:.55},se=32;let je=null,Ft=null,Oe=null;function Pt(e,t){const n=document.querySelector('link[rel="icon"]');if(!n)return;je??=Object.assign(document.createElement("canvas"),{width:se,height:se});const a=je.getContext("2d");a&&(Oe??=a.createImageData(se,se),Ft??=new Ze(se,Oe.data),Ft.paint(e,{rotation:t}),a.putImageData(Oe,0,0),n.type="image/png",n.href=je.toDataURL("image/png"))}function bn(e){let t=!0;if(typeof IntersectionObserver!="function")return{onScreen:()=>t,stop:()=>{}};const n=new IntersectionObserver(a=>{for(const o of a)t=o.isIntersecting},{rootMargin:"100px"});return n.observe(e),{onScreen:()=>t,stop:()=>n.disconnect()}}const _o=90,Jo=1e3/12,Go=400,Ne=new WeakMap;function qo(e){const t=(e.textContent??"").split(`
`);return{columns:Math.max(...t.map(n=>n.length)),rows:t.length}}function qe(e,t){Ne.get(e)?.();const n=t??{...Ge,seed:Math.floor(Math.random()*16777215)},{columns:a,rows:o}=qo(e),s=Math.min(a,o*2),r=wn(n),i=new Ze(s);e.dataset.seed=String(n.seed),e.title=`World ${n.seed}, ${r.mesh.faceCount.toLocaleString("en")} triangles`;const c=$=>{e.innerHTML=Ho(Bo(i.paint(r,{rotation:$}),s)),e.classList.add("grown")};if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return c(.6),Pt(r,.6),Ne.set(e,()=>{}),()=>{};let l=0,h=-1/0,u=-1/0;const f=performance.now(),w=bn(e),d=$=>{const m=($-f)/1e3/_o*Math.PI*2;w.onScreen()&&$-h>=Jo&&(c(m),h=$),$-u>Go&&(Pt(r,m),u=$),l=requestAnimationFrame(d)};l=requestAnimationFrame(d);const g=()=>{cancelAnimationFrame(l),w.stop()};return Ne.set(e,g),g}function Yo(){const e=document.querySelector(".planet");return e?qe(e,dn()??void 0):()=>{}}const V=360,Uo=60,Ko=1.4,Lt=Math.PI*2/Uo,Rt=Math.PI*4;function zo(e){const t=p("canvas",{class:"world",width:V,height:V}),n=t.getContext("2d");if(!n)return()=>{};const a={...Ge,seed:Math.floor(Math.random()*16777215)},o=n.createImageData(V,V),s=new Ze(V,o.data),r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let i,c=.6,l=-.38,h=!r,u=null,f=0,w=performance.now();const d=p("p",{class:"hint"}),g=document.querySelector(".planet"),$=(20*4**Ge.levels).toLocaleString("en"),m=()=>{i=wn(a);const v=dn();d.textContent=`World ${a.seed}: ${i.mesh.faceCount.toLocaleString("en")} triangles. `+(v?`The header is keeping world ${v.seed}, ${(20*4**v.levels).toLocaleString("en")} triangles.`:`The header grows a new one every visit, ${$} triangles each.`),T.hidden=!v,A()},b=p("button",{type:"button",onclick:()=>{mo({...a}),g&&qe(g,{...a}),m()}},"Put it in the header"),T=p("button",{type:"button",hidden:!0,onclick:()=>{fo(),g&&qe(g),m()}},"Let the header grow its own"),A=()=>{s.paint(i,{rotation:c,tilt:l}),n.putImageData(o,0,0)};let M=0;const I=bn(t),k=v=>{const C=Math.min(.1,(v-w)/1e3);if(!u&&I.onScreen()){if(f!==0){f*=Math.exp(-C/Ko);const y=h?Lt:0;(Math.abs(f)<=y||Math.abs(f)<.01)&&(f=0)}f!==0?(c-=f*C,A()):h&&(c+=Lt*C,A()),He.send({byRadians:f*C,tiltedBy:0,seconds:C})}w=v,M=requestAnimationFrame(k)};t.addEventListener("pointerdown",v=>{u={x:v.clientX,y:v.clientY,at:v.timeStamp},f=0,t.setPointerCapture(v.pointerId)}),t.addEventListener("pointermove",v=>{if(!u)return;const C=t.clientWidth||V,y=(v.clientX-u.x)/C*Math.PI;c-=y;const S=l;l=Math.max(-1.2,Math.min(1.2,l-(v.clientY-u.y)/C*Math.PI)),He.send({byRadians:y,tiltedBy:l-S,seconds:0});const W=Math.max(.004,(v.timeStamp-u.at)/1e3);f=Math.max(-Rt,Math.min(Rt,f*.4+y/W*.6)),u={x:v.clientX,y:v.clientY,at:v.timeStamp},A()}),t.addEventListener("pointerup",v=>{u&&v.timeStamp-u.at>120&&(f=0),u=null,w=performance.now()}),t.addEventListener("pointercancel",()=>{u=null,f=0});const D=p("input",{type:"number",min:0,value:a.seed,onchange:()=>{a.seed=Math.max(0,Math.floor(Number(D.value)||0)),m()}}),L=p("button",{type:"button",onclick:()=>{a.seed=Math.floor(Math.random()*16777215),D.value=String(a.seed),m()}},"Another world"),N=p("button",{type:"button",onclick:()=>{h=!h,N.textContent=h?"Hold still":"Turn"}},h?"Hold still":"Turn"),x=(v,C,y,S,W,j)=>{const P=p("output",{},j(a[v])),B=p("input",{type:"range",min:y,max:S,step:W,value:a[v],onchange:()=>{a[v]=Number(B.value),P.textContent=j(a[v]),m()},oninput:()=>{P.textContent=j(Number(B.value))}});return p("label",{},`${C}: `,P,B)};return e.append(t,p("div",{class:"row"},p("span",{},"Seed "),D,L,N,b,T),p("div",{class:"dials"},x("levels","Detail",2,6,1,v=>`${v} splits`),x("roughness","Roughness",.02,1,.01,v=>v.toFixed(2)),x("share","Sea",0,.98,.01,v=>`${Math.round(v*100)}%`)),d),m(),M=requestAnimationFrame(k),()=>{cancelAnimationFrame(M),I.stop()}}const Xo={name:"world",apps:{worlds:zo},install:()=>Yo()},re=[Xo,Ra,Ma,Ca,ca,va,aa,uo];function Wt(e){const t=[];for(const n of document.querySelectorAll(".app[data-app]")){const a=e[n.dataset.app??""]?.(n);a&&t.push(a)}return()=>{for(const n of t)n()}}function Vo(e){const t={},n=e.fields.theme;(n==="dark"||n==="light")&&(t["data-page-theme"]=n);const a=e.fields.sky;return a&&(t["data-sky"]=a),t}const Zo=["data-page-theme","data-sky"];function Qo(e,t){return t==="/"?e==="/":e.startsWith(t)}const es=7.8,Bt=17,ts=12,ns=8,Fe=28,Ht=44,ce=8,as=16;function os(e){const t=new Map;for(const m of e.nodes){const b=m.label.split(`
`),T=Math.max(...b.map(A=>A.length),1);t.set(m.id,{id:m.id,label:m.label,real:!0,rank:-1,along:Math.max(40,T*es+ts*2),across:b.length*Bt+ns*2,pos:0,preds:[],succs:[]})}for(const m of e.edges){const b=t.get(m.from),T=t.get(m.to);if(!b||!T)throw new Error(`flow: edge ${m.from} --> ${m.to} names a node that is not there`);b.succs.push(T),T.preds.push(b)}ss(t);const n=rs(t,e),a=is(t);cs(a);const o=a.length,s=a.map(m=>Math.max(Bt,...m.map(b=>b.real?b.across:0))),r=[];let i=ce;for(let m=0;m<o;m+=1)r.push(i),i+=(s[m]??0)+Ht;const c=m=>(r[m.rank]??0)+((s[m.rank]??0)-(m.real?m.across:0))/2,l=Math.max(...[...t.values()].map(m=>m.pos+m.along))+ce,h=i-Ht+ce,u=e.direction==="LR",f=(m,b)=>u?[b,m]:[m,b],w=[...t.values()].filter(m=>m.real).map(m=>{const[b,T]=f(m.pos,c(m));return{id:m.id,label:m.label,x:b,y:T,width:u?m.across:m.along,height:u?m.along:m.across}}),d=e.edges.map((m,b)=>{const T=n[b]??[],A=T[0],M=T[T.length-1];if(!A||!M)throw new Error("flow: an edge lost its ends");const I=[f(A.pos+A.along/2,c(A)+A.across),...T.slice(1,-1).map(k=>f(k.pos+k.along/2,c(k)+(s[k.rank]??0)/2)),f(M.pos+M.along/2,c(M))];return m.label===void 0?{from:m.from,to:m.to,points:I}:{from:m.from,to:m.to,label:m.label,points:I}}),[g,$]=f(l,h);return{direction:e.direction,width:g,height:$,nodes:w,edges:d}}function ss(e){const t=new Set,n=a=>{if(a.rank>=0)return a.rank;if(t.has(a))throw new Error(`flow: there is a cycle through ${a.id}, and a flow has a direction`);return t.add(a),a.rank=a.preds.length===0?0:Math.max(...a.preds.map(n))+1,t.delete(a),a.rank};for(const a of e.values())n(a)}function rs(e,t){let n=0;return t.edges.map(a=>{const o=e.get(a.from),s=e.get(a.to);if(!o||!s)return[];const r=[o];let i=o;for(let c=o.rank+1;c<s.rank;c+=1){n+=1;const l={id:`\0${n}`,label:"",real:!1,rank:c,along:as,across:0,pos:0,preds:[i],succs:[]};e.set(l.id,l),i.succs.push(l),r.push(l),i=l}return i!==o&&(i.succs.push(s),s.preds.push(i),o.succs.splice(o.succs.indexOf(s),1),s.preds.splice(s.preds.indexOf(o),1)),r.push(s),r})}function is(e){const t=Math.max(...[...e.values()].map(r=>r.rank))+1,n=Array.from({length:t},()=>[]);for(const r of e.values())n[r.rank]?.push(r);const a=new Map,o=r=>r.forEach((i,c)=>a.set(i,c));n.forEach(o);const s=(r,i)=>i.length===0?a.get(r)??0:i.reduce((c,l)=>c+(a.get(l)??0),0)/i.length;for(let r=0;r<4;r+=1){for(let i=1;i<t;i+=1){const c=n[i]??[];c.sort((l,h)=>s(l,l.preds)-s(h,h.preds)),o(c)}for(let i=t-2;i>=0;i-=1){const c=n[i]??[];c.sort((l,h)=>s(l,l.succs)-s(h,h.succs)),o(c)}}return n}function cs(e){const t=r=>r.reduce((i,c)=>i+c.along,0)+Fe*Math.max(0,r.length-1),n=Math.max(...e.map(t));for(const r of e){let i=ce+(n-t(r))/2;for(const c of r)c.pos=i,i+=c.along+Fe}const a=r=>r.pos+r.along/2,o=(r,i)=>{for(const c of r){const l=i(c);if(l.length===0)continue;const h=l.reduce((u,f)=>u+a(f),0)/l.length;c.pos=h-c.along/2}for(let c=1;c<r.length;c+=1){const l=r[c-1],h=r[c];if(!l||!h)continue;const u=l.pos+l.along+Fe;h.pos<u&&(h.pos=u)}};for(let r=0;r<3;r+=1){for(let i=1;i<e.length;i+=1)o(e[i]??[],c=>c.preds);for(let i=e.length-2;i>=0;i-=1)o(e[i]??[],c=>c.succs)}const s=Math.min(...e.flat().map(r=>r.pos));for(const r of e.flat())r.pos+=ce-s}const Ye=/(\w[\w.-]*)(?:\[([^\]]*)\])?/,ls=new RegExp(`^${Ye.source}\\s*-->(?:\\|([^|]*)\\|)?\\s*${Ye.source}$`),hs=new RegExp(`^${Ye.source}$`),ds=/^(?:flow\s+)?(TD|LR)$/i;function us(e){const t=new Map,n=[];let a="TD";const o=(i,c)=>{i&&(t.has(i)||t.set(i,i),c!==void 0&&t.set(i,c.replace(/\\n/g,`
`)))},s=e.split(`
`);let r=!0;return s.forEach((i,c)=>{const l=i.trim();if(l===""||l.startsWith("%"))return;if(r){r=!1;const f=ds.exec(l);if(f){a=f[1]?.toUpperCase()==="LR"?"LR":"TD";return}}const h=ls.exec(l);if(h){const[,f,w,d,g,$]=h;o(f,w),o(g,$),n.push(d===void 0?{from:f??"",to:g??""}:{from:f??"",to:g??"",label:d});return}const u=hs.exec(l);if(u){o(u[1],u[2]);return}throw new Error(`flow: cannot read line ${c+1}: "${l}"`)}),{direction:a,nodes:[...t].map(([i,c])=>({id:i,label:c})),edges:n}}const ms=20,_t=17;function fs(e){let t=5381;for(let n=0;n<e.length;n+=1)t=(t*33^e.charCodeAt(n))>>>0;return t.toString(36)}const R=e=>String(Math.round(e*10)/10);function ps(e,t){const[n,...a]=e.points;if(!n)return"";let o=`M${R(n[0])},${R(n[1])}`,s=n;for(const r of a){const[i,c]=s,[l,h]=r,u=t?[(i+l)/2,c]:[i,(c+h)/2],f=t?[(i+l)/2,h]:[l,(c+h)/2];o+=` C${R(u[0])},${R(u[1])} ${R(f[0])},${R(f[1])} ${R(l)},${R(h)}`,s=r}return o}function gs(e){const{points:t}=e,n=t[Math.floor((t.length-1)/2)]??[0,0],a=t[Math.ceil((t.length-1)/2)]??n;return[(n[0]+a[0])/2,(n[1]+a[1])/2]}function ys(e){const t=os(us(e)),n=t.direction==="LR",a=`arrow-${fs(e)}`,o=t.edges.map(c=>{const l=`<path class="edge" d="${ps(c,n)}" marker-end="url(#${a})"/>`;if(c.label===void 0)return l;const[h,u]=gs(c);return`${l}<text class="edge-label" x="${R(h)}" y="${R(u)}" text-anchor="middle" dominant-baseline="middle">${E(c.label)}</text>`}).join(""),s=t.nodes.map(c=>{const l=c.x+c.width/2,h=c.label.split(`
`),u=c.y+(c.height-h.length*_t)/2,f=h.map((w,d)=>`<tspan x="${R(l)}" y="${R(u+ms-8+d*_t)}">${E(w)}</tspan>`).join("");return`<g class="node"><rect x="${R(c.x)}" y="${R(c.y)}" width="${R(c.width)}" height="${R(c.height)}" rx="4"/><text text-anchor="middle" dominant-baseline="middle">${f}</text></g>`}).join(""),r=R(t.width),i=R(t.height);return`<figure class="flow"><svg class="flow" viewBox="0 0 ${r} ${i}" width="${r}" height="${i}" style="max-width: 100%; height: auto" role="img"><defs><marker id="${a}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z"/></marker></defs>${o}${s}</svg></figure>`}const ws=new Set("var let const function return if else for while do break continue new this true false null undefined class extends import export from default async await throw try catch finally typeof instanceof in of switch case delete void yield".split(" "));function G(e,t){return`<span class="hl-${e}">${E(t)}</span>`}function vn(e,t,n){for(let a=t+1;a<e.length;a+=1)if(e[a]==="\\")a+=1;else if(e[a]===n)return a+1;return e.length}function bs(e){let t="",n=0;for(;n<e.length;){const a=e.slice(n);let o;if(a.startsWith("//")){const s=e.indexOf(`
`,n),r=s<0?e.length:s;t+=G("c",e.slice(n,r)),n=r}else if(a.startsWith("/*")){const s=e.indexOf("*/",n+2),r=s<0?e.length:s+2;t+=G("c",e.slice(n,r)),n=r}else if(a[0]==='"'||a[0]==="'"||a[0]==="`"){const s=vn(e,n,a[0]??"");t+=G("s",e.slice(n,s)),n=s}else if(o=/^[A-Za-z_$][\w$]*/.exec(a)){const s=o[0];t+=ws.has(s)?G("k",s):E(s),n+=s.length}else(o=/^\d+(?:\.\d+)?/.exec(a))?(t+=G("n",o[0]),n+=o[0].length):(t+=E(a[0]??""),n+=1)}return t}function vs(e){let t="",n=0;for(;n<e.length;){const a=e.slice(n);if(a.startsWith("<!--")){const s=e.indexOf("-->",n+4),r=s<0?e.length:s+3;t+=G("c",e.slice(n,r)),n=r;continue}const o=/^<(\/?)([A-Za-z][\w-]*)/.exec(a);if(!o){const s=e.indexOf("<",n+1),r=s<0?e.length:s;t+=E(e.slice(n,r)),n=r;continue}for(t+=`&lt;${o[1]}${G("t",o[2]??"")}`,n+=o[0].length;n<e.length&&e[n]!==">";){const s=e.slice(n);let r;if(r=/^\s+/.exec(s))t+=r[0],n+=r[0].length;else if(r=/^[A-Za-z_:][\w:.-]*/.exec(s))t+=G("a",r[0]),n+=r[0].length;else if(s[0]==="="&&(s[1]==='"'||s[1]==="'")){const i=vn(e,n+1,s[1]??"");t+=`=${G("s",e.slice(n+1,i))}`,n=i}else t+=E(s[0]??""),n+=1}e[n]===">"&&(t+="&gt;",n+=1)}return t}function $s(e,t){return t==="js"||t==="javascript"?bs(e):t==="html"?vs(e):E(e)}function ks(e,t){const a=/^https?:/.test(t)?' target="_blank" rel="noopener noreferrer"':"";return`<a href="${E(t)}"${a}>${e}</a>`}const xs=["large","wide"];function Ts(e,t,n){const a=n&&xs.includes(n)?` class="${n}"`:"";return`<img src="${E(t)}" alt="${E(e)}"${a}>`}const Ss=/(`[^`]+`|!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)|\[[^\]]+\]\([^)\s]+\))/g,Ms=/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/,As=/^\[([^\]]+)\]\(([^)\s]+)\)$/;function $n(e){return e.split(Ss).map(t=>{if(t.startsWith("`")&&t.endsWith("`")&&t.length>1)return`<code>${E(t.slice(1,-1))}</code>`;const n=Ms.exec(t);if(n)return Ts(n[1]??"",n[2]??"",n[3]);const a=As.exec(t);return a?ks($n(a[1]??""),a[2]??""):E(t)}).join("")}function Es(e){return e.split(/(<code>[\s\S]*?<\/code>)/g).map(t=>t.startsWith("<code>")?t:t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/(^|[^*])\*([^*]+)\*/g,"$1<em>$2</em>").replace(/ {2,}\n/g,"<br>").replace(/\n/g," ").replace(/ -- /g," — ")).join("")}function K(e){return Es($n(e))}const Jt=/^(?:[-*]|\d+\.)\s/;function Is(e,t,n){if(!Jt.test(e[0]??""))return!1;const a=t.slice(n).find(o=>o.trim()!=="");return a!==void 0&&Jt.test(a)}function Cs(e){const t=[],n=e.replace(/\r\n?/g,`
`).split(`
`);let a=[],o=!1;return n.forEach((s,r)=>{if(s.startsWith("```")){o=!o,a.push(s),o||(t.push(a),a=[]);return}if(!o&&s.trim()===""){if(Is(a,n,r+1))return;a.length&&t.push(a),a=[];return}a.push(s)}),a.length&&t.push(a),t}function Ds(e){return e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function js(e){const t=/^(#{1,4})\s+(.*)$/.exec(e[0]??"");if(!t||!e.slice(0,-1).every(s=>/ {2,}$/.test(s)))return null;const a=t[1]?.length??1,o=[t[2]??"",...e.slice(1)].join(`
`);return`<h${a} id="${Ds(o)}">${K(o)}</h${a}>`}function Os(e){if(!e[0]?.startsWith("```"))return null;const t=e[0].slice(3).trim(),n=e.slice(1,-1).join(`
`);return t==="flow"?ys(n):`<pre><code>${$s(n,t)}</code></pre>`}function Ns(e,t){const n=[];for(const a of e)t.test(a)?n.push(a.replace(t,"")):n.length&&(n[n.length-1]+=`
${a.trim()}`);return n}function Fs(e){const t=e[0]??"",n=/^\d+\.\s/.test(t),a=/^[-*]\s/.test(t);if(!n&&!a)return null;const o=n?/^\d+\.\s+/:/^[-*]\s+/;if(!e.every(i=>o.test(i)||/^\s/.test(i)))return null;const s=n?"ol":"ul",r=Ns(e,o).map(i=>`<li>${K(i)}</li>`).join("");return`<${s}>${r}</${s}>`}function Ps(e){return e.every(n=>n.includes(" :: "))?`<dl>${e.map(n=>{const a=n.indexOf(" :: ");return[n.slice(0,a),n.slice(a+4)]}).map(([n,a])=>`<dt>${K(n)}</dt><dd>${K(a)}</dd>`).join("")}</dl>`:null}function Ls(e){if(!e.every(n=>n.startsWith(">")))return null;const t=e.map(n=>n.replace(/^>\s?/,"")).join(" ");return`<blockquote>${K(t)}</blockquote>`}function Rs(e){const t=/^::([a-z0-9-]+)$/.exec(e[0]??"");return!t||e.length!==1?null:`<div class="app" data-app="${t[1]}"></div>`}function Ws(e){return e.length===1&&/^-{3,}$/.test(e[0]??"")?"<hr>":null}function Bs(e){const t=e.length===1&&/^(\\+)$/.exec(e[0]??"");return t?`<div class="space" style="--n:${t[1]?.length??1}"></div>`:null}function Hs(e){return e.length===1&&/^!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)$/.test(e[0]??"")?`<figure>${K(e[0]??"")}</figure>`:null}function _s(e){return`<p>${K(e.join(`
`))}</p>`}const Js=[Ws,Bs,js,Os,Ls,Rs,Hs,Ps,Fs];function kn(e){return Cs(e).map(t=>{for(const n of Js){const a=n(t);if(a!==null)return a}return _s(t)}).join(`
`)}function Qe(e){return e==="/"?"~":`~${e.replace(/\/$/,"")}`}function xn(e,t){return`<p class="ran"><span class="ps1">${E(e)} $</span> ${E(t)}</p>`}function Gs(e,t){if(t.parent===null)return"";const n=e.childrenOf(t.route);if(n.length===0)return"";const a=n.map(o=>`<li><a class="entry" href="${o.route}"><code>${E(o.name)}/</code><span class="title">${E(o.title)}</span>`+(o.summary?`<span class="summary">${E(o.summary)}</span>`:"")+"</a></li>").join("");return`${xn(Qe(t.route),"ls")}
<ul class="listing">${a}</ul>`}function qs(e,t){const n=e.trailTo(t.route).slice(1).map(a=>a.name).join("/");return xn("~",n?`cd ${n} && cat README.md`:"cat README.md")}function Ys(e,t){return`${qs(e,t)}
${kn(t.body)}
${Gs(e,t)}`}function Us(e,t){const n=document.querySelector("main");if(!n)return()=>!1;const a=(o,{push:s=!0,keep:r=!1}={})=>{const i=e.at(o);if(!i)return!1;r||(n.innerHTML=Ys(e,i));const c=Vo(i);for(const l of Zo){const h=c[l];h?document.documentElement.setAttribute(l,h):document.documentElement.removeAttribute(l)}document.title=i.route==="/"?"David Rodenas":`${i.title} — David Rodenas`;for(const l of document.querySelectorAll("nav .navlink"))Qo(o,l.getAttribute("href")??"\0")?l.setAttribute("aria-current","page"):l.removeAttribute("aria-current");return s&&(o===window.location.pathname?window.history.replaceState({route:o},"",o):window.history.pushState({route:o},"",o),r||window.scrollTo({top:0})),window.goatcounter?.count?.({path:o,title:document.title}),t(i,r),!0};return document.addEventListener("click",o=>{if(o.defaultPrevented||o.button!==0||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey)return;const s=o.target?.closest("a[href]");if(!s||s.target||s.dataset.run)return;const r=new URL(s.href,window.location.href);if(r.origin!==window.location.origin)return;const i=r.pathname.endsWith("/")?r.pathname:`${r.pathname}/`;e.at(i)&&(o.preventDefault(),i!==window.location.pathname&&a(i))}),window.addEventListener("popstate",()=>{const o=window.location.pathname.endsWith("/")?window.location.pathname:`${window.location.pathname}/`;a(o,{push:!1})}),a}class Ks{typed=[];drafts=[];index=0;get lines(){return this.typed}add(t){this.typed.push(t),this.drafts=[...this.typed,""],this.index=this.typed.length}previous(t){return this.moveTo(this.index-1,t)}next(t){return this.moveTo(this.index+1,t)}moveTo(t,n){return this.drafts.length===0&&(this.drafts=[""]),t<0||t>=this.drafts.length?n:(this.drafts[this.index]=n,this.index=t,this.drafts[t]??n)}}function zs(e,t,n,a){if(e==="k"){const o=t.slice(n);return{line:t.slice(0,n),caret:n,killed:o||a}}if(e==="u"){const o=t.slice(0,n);return{line:t.slice(n),caret:0,killed:o||a}}return e==="y"?{line:t.slice(0,n)+a+t.slice(n),caret:n+a.length,killed:a}:null}function Tn(e){return e.split(/\s*(?:;|&&)\s*/).map(t=>t.trim().split(/\s+/).filter(Boolean)).filter(t=>t.length>0)}function $e(e,t){const a=t.startsWith("~")||t.startsWith("/")?[]:e.split("/").filter(Boolean),o=t.replace(/^~/,"").split("/").filter(Boolean),s=[...a];for(const r of o)r!=="."&&(r===".."?s.pop():s.push(r));return s.length===0?"/":`/${s.join("/")}/`}function Xs(e){return e.replace(/(?:^|\/)(?:README\.md|\*)$/,"")||"."}const Vs={name:"cat",usage:"cat <file>",description:"print a page, README.md or * for the one here",run({site:e,cwd:t},[n]){if(!n)return{text:"cat: usage: cat <file>",error:!0};const a=$e(t,Xs(n)),o=e.at(a);return!o||/\.md$/.test(n)!==/README\.md$/.test(n)?{text:`cat: ${n}: no such file`,error:!0}:{html:kn(o.body),at:a}}},Zs={name:"cd",usage:"cd [dir]",description:"go to a directory (the address follows)",run(e,[t="~"]){const n=$e(e.cwd,t);return e.site.at(n)?(e.cwd=n,{at:n}):{text:`cd: ${t}: no such directory`,error:!0}}},Qs={name:"clear",usage:"clear",description:"clear what the shell has printed",run(){return{clear:!0}}},er={name:"help",usage:"help [command]",description:"this",run({commands:e},[t]){if(t){const s=e.find(r=>r.name===t);return s?{text:`${s.usage}
  ${s.description}`}:{text:`help: ${t}: no such command`,error:!0}}const n=Math.max(...e.map(s=>s.usage.length));return{text:["Commands:",...e.map(s=>`${s.usage.padEnd(n)}  ${s.description}`),"","Tab completes; → takes the grey suggestion. ↑↓ recall. ^K kills to the end of the line, ^U back to the start, ^Y puts it back."].join(`
`)}}};function tr(e){const t=e.filter(a=>a.startsWith("-")).flatMap(a=>a.slice(1).split("")),n=e.find(a=>!a.startsWith("-"))??".";return{flags:t,path:n}}function nr(e,t,n){const a=n==="."?"":`${n.replace(/\/$/,"")}/`;return[{mode:"--r-",name:"README.md",title:e.title,href:e.route,run:`cat ${a}README.md`},...t.map(o=>({mode:"dr-x",name:`${o.name}/`,title:o.title,href:o.route}))]}function Gt(e){const t=e.run?` data-run="${E(e.run)}"`:"";return`<a href="${E(e.href)}"${t}>${E(e.name)}</a>`}function ar(e,t){const n=(s,r)=>t?`${s.mode}  ${r.padEnd(20)}  ${s.title}`:r,a=s=>t?`${s.mode}  ${Gt(s)}${" ".repeat(Math.max(0,20-s.name.length))}  ${E(s.title)}`:Gt(s),o=t?[`total ${e.length}`]:[];return{text:[...o,...e.map(s=>n(s,s.name))].join(`
`),html:`<pre>${[...o,...e.map(a)].join(`
`)}</pre>`}}const or={name:"ls",usage:"ls [-l] [path]",description:"list what a directory holds; -l says what each is",run({site:e,cwd:t},n){const{flags:a,path:o}=tr(n),s=a.find(c=>c!=="l");if(s)return{text:`ls: -${s}: no such option. Try ls -l`,error:!0};const r=$e(t,o),i=e.at(r);return i?ar(nr(i,e.childrenOf(r),o),a.includes("l")):{text:`ls: ${o}: no such directory`,error:!0}}},sr={name:"pwd",usage:"pwd",description:"print where you are",run({cwd:e}){return{text:Qe(e)}}},Sn=[or,Zs,Vs,sr,er,Qs];class rr{context;constructor(t,n,a=Sn){this.context={site:t,cwd:n,commands:a}}get prompt(){return`${Qe(this.context.cwd)} $`}moveTo(t){return this.context.site.at(t)?(this.context.cwd=t,!0):!1}run(t){const n=[];for(const[a="",...o]of Tn(t)){const s=this.context.commands.find(i=>i.name===a),r=s?s.run(this.context,o):{text:`${a}: command not found. Try help`,error:!0};if(n.push(r),r.error)break}return n}complete(t){const n=t.split(/\s+/),a=n.pop()??"",o=n.length===0?"":`${n.join(" ")} `;return(n.length===0?this.commandNames():this.pathNames(a)).filter(r=>r.startsWith(a)).map(r=>o+r)}commandNames(){return this.context.commands.map(t=>t.name).sort()}pathNames(t){const n=t.lastIndexOf("/"),a=n<0?".":t.slice(0,n+1),o=$e(this.context.cwd,a);if(!this.context.site.at(o))return[];const s=n<0?"":a;return["README.md",...this.context.site.childrenOf(o).map(i=>`${i.name}/`)].map(i=>s+i)}}function ir(e,t,n){if(e==="")return"help";const o=[...[...t].reverse(),...n].find(s=>s.startsWith(e)&&s!==e);return o?o.slice(e.length):""}const Ue="shell-pending";function cr(e){try{e&&sessionStorage.setItem(Ue,e)}catch{}}function lr(){try{const e=sessionStorage.getItem(Ue)??"";return sessionStorage.removeItem(Ue),e}catch{return""}}function hr(){window.__stopTyped?.();const e=window.__typed??[];if(window.__typed=[],e.length===0)return null;const t=[];let n="";for(const a of e)a==="Enter"?(t.push(n),n=""):a==="Backspace"?n=n.slice(0,-1):n+=a;return{finished:t,unfinished:n}}function dr(e,t,n={}){const a=document.querySelector(".terminal"),o=document.querySelector(".screen"),s=a?.querySelector("form.prompt"),r=s?.querySelector("input"),i=s?.querySelector(".line"),c=s?.querySelector(".suggest"),l=s?.querySelector(".ps1"),h=document.querySelector(".ran.end"),u=h?.querySelector(".ps1"),f=h?.querySelector(".line"),w=h?.querySelector(".typed");if(!a||!o||!s||!r||!i||!c||!l||!h||!u||!f||!w)return null;const d=()=>{l.textContent=g.prompt,u.textContent=g.prompt},g=new rr(e,t,n.commands),$=new Ks;let m=null;const b=y=>{o.append(y)},T=()=>{m?.remove(),m=null},A=()=>{const y=r.selectionStart??r.value.length;i.style.setProperty("--caret",String(y)),i.style.setProperty("--typed",String(r.value.length)),w.textContent=r.value,f.style.setProperty("--caret",String(y)),c.textContent=y===r.value.length?ir(r.value,$.lines,g.complete(r.value)):""},M=(y,S=y.length)=>{r.value=y,r.setSelectionRange(S,S),A()},I=y=>{if(y.clear&&(o.replaceChildren(),n.clearPage?.()),y.html){const S=p("div",{class:y.text?"listing-out":"cat"});S.innerHTML=y.html,b(S)}else y.text&&b(p("pre",{class:y.error?"error":""},y.text))},k=y=>{T();const S=p("p",{class:"echo"},p("span",{class:"ps1"},g.prompt),` ${y}`);b(S);let W=!1;const j=Tn(y).map(P=>P.join(" "));for(let P=0;P<j.length;P+=1){const[B]=g.run(j[P]??"");if(B){if(I(B),B.html&&!B.text&&(W=!0),B.at&&!n.moveTo?.(B.at)){cr(j.slice(P+1).join(" && ")),window.location.assign(B.at);return}if(B.error)break}}d(),A(),W?S.scrollIntoView({block:"start"}):window.scrollTo({top:document.documentElement.scrollHeight})},D=()=>{if(T(),r.value.trim()===""){M("help");return}const y=g.complete(r.value);y.length===1?M(y[0]??r.value):y.length>1&&(m=p("p",{class:"hint"},y.map(S=>S.split(" ").pop()).join("  ")),s.insertAdjacentElement("afterend",m),window.scrollTo({top:document.documentElement.scrollHeight}))};s.addEventListener("submit",y=>{y.preventDefault();const S=r.value.trim();M(""),S&&($.add(S),k(S))});let L="";r.addEventListener("keydown",y=>{if(y.key==="Tab")y.preventDefault(),D();else if(y.key==="ArrowUp")y.preventDefault(),M($.previous(r.value));else if(y.key==="ArrowDown")y.preventDefault(),M($.next(r.value));else if(y.key==="ArrowRight"&&r.selectionStart===r.value.length&&c.textContent)y.preventDefault(),M(r.value+c.textContent);else if(y.ctrlKey&&!y.metaKey&&!y.altKey){const S=zs(y.key,r.value,r.selectionStart??r.value.length,L);if(!S)return;y.preventDefault(),T(),M(S.line,S.caret),L=S.killed}else T()});for(const y of["input","keyup","click","focus","select"])r.addEventListener(y,A);let N=!0;r.addEventListener("input",()=>{N&&r.value!==""&&window.scrollTo({top:document.documentElement.scrollHeight}),N=r.value===""}),document.addEventListener("selectionchange",()=>{document.activeElement===r&&A()}),o.addEventListener("click",y=>{const S=y.target?.closest("a[data-run]");S?.dataset.run&&(y.preventDefault(),k(S.dataset.run))}),window.addEventListener("keydown",y=>{const W=y.target?.matches("input, textarea, select, [contenteditable]")??!1,j=y.key.length===1&&!y.ctrlKey&&!y.metaKey&&!y.altKey;W||!j||r.focus({preventScroll:!1})}),s.addEventListener("click",()=>r.focus()),h.addEventListener("click",()=>r.focus()),A();const x=lr();x&&k(x);const v=hr();if(v){for(const y of v.finished)y.trim()&&($.add(y.trim()),k(y.trim()));M(v.unfinished),r.focus()}return{run:k,moveTo:y=>{g.moveTo(y)&&(o.replaceChildren(),d(),A())}}}const ur=[{file:"book/index.md",markdown:`---
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

At Barcelona's Eixample, over its whole record:

- **Two ridges.** The morning one peaks at hour 09 and is there all year. The
  evening one, around hours 20 and 21, is as high as the morning's from
  October to February, and lower from spring to the end of summer.
- **August.** Its mean is 43 µg/m³; no other month is below 51. The city
  leaves, and it shows at every hour.
- **The week.** From Monday to Friday the mean is about a quarter higher than
  on Saturdays and Sundays. Choose the weekends and the morning ridge is gone,
  while the small hours are higher than on a working day: the night before
  was a Friday or a Saturday.
- **The years.** 70 µg/m³ in 1999, 49.5 in 2019, 35.2 in 2020. The year of
  the lockdowns was the first under the European limit of 40; 2022 went back
  over it, and 2025 closed at 29.1.

The same shape, lower, is at every urban station here.

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
measures. Those two are the only stations of these ten that ended 2025 under
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
`}],qt="---";function mr(e){return(/^"(.*)"$/.exec(e)??/^'(.*)'$/.exec(e))?.[1]??e}function fr(e){const t=e.replace(/\r\n?/g,`
`).split(`
`);if(t[0]?.trim()!==qt)return{fields:{},body:e.trim()};const n=t.indexOf(qt,1);if(n<0)return{fields:{},body:e.trim()};const a={};for(const o of t.slice(1,n)){const s=o.indexOf(":");s<=0||(a[o.slice(0,s).trim()]=mr(o.slice(s+1).trim()))}return{fields:a,body:t.slice(n+1).join(`
`).trim()}}function pr(e){const n=e.replace(/\.md$/,"").replace(/(^|\/)index$/,"");return n===""?"/":`/${n}/`}function gr(e){if(e==="/")return null;const t=e.slice(0,-1);return t.slice(0,t.lastIndexOf("/")+1)}function Yt(e){if(e==="/")return"/";const t=e.slice(0,-1);return t.slice(t.lastIndexOf("/")+1)}function yr(e){const{fields:t,body:n}=fr(e.markdown),a=pr(e.file);return{file:e.file,route:a,parent:gr(a),name:Yt(a),title:t.title??Yt(a),summary:t.summary??"",order:Number(t.order??"100"),body:n,fields:t}}function Ut(e,t){return e.order-t.order||e.name.localeCompare(t.name)}class wr{byRoute;constructor(t){const n=t.map(yr).sort(Ut);this.byRoute=new Map(n.map(a=>[a.route,a]))}get pages(){return[...this.byRoute.values()]}at(t){return this.byRoute.get(t)}childrenOf(t){return this.pages.filter(n=>n.parent===t).sort(Ut)}trailTo(t){const n=this.at(t);return n?n.parent===null?[n]:[...this.trailTo(n.parent),n]:[]}}const Pe=new wr(ur);function Kt(){const e=[...Sn,...re.flatMap(h=>h.commands??[])],t=Object.assign({},...re.map(h=>h.apps??{})),a=(h=>h.endsWith("/")?h:`${h}/`)(window.location.pathname),o=Pe.at(a);let s=Wt(t),r=null;const i=Us(Pe,(h,u)=>{s(),s=Wt(t);for(const f of re)f.arrive?.(h);u||r?.moveTo(h.route)});if(r=dr(Pe,o?a:"/",{moveTo:h=>i(h,{keep:!0}),clearPage:()=>{s(),s=()=>{},document.querySelector("main")?.replaceChildren()},commands:e}),o)for(const h of re)h.arrive?.(o);const l={run:h=>r?.run(h)};for(const h of re)h.install?.(l)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Kt):Kt();
