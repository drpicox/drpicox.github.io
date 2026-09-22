function f(e,t={},...n){const a=document.createElement(e);for(const[o,s]of Object.entries(t))s===void 0||s===!1||(typeof s=="function"?a.addEventListener(o.slice(2).toLowerCase(),s):s===!0?a.setAttribute(o,""):a.setAttribute(o,String(s)));for(const o of n)o==null||o===!1||a.append(o);return a}const Ea={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function C(e){return e.replace(/[&<>"]/g,t=>Ea[t]??t)}const Pa=["January","February","March","April","May","June","July","August","September","October","November","December"];function _e(e){const[t,n,a]=e.refreshed.split("-").map(Number),o=`${a} ${Pa[(n??1)-1]} ${t}`,s=`${Math.min(...e.years)} to ${Math.max(...e.years)}`;return`<p class="source">Source: ${C(e.attribution)} <a href="${C(e.dataset)}">The dataset, at its source.</a> This site keeps sums of the finished years ${s}, last added to on ${o}.</p>`}function At(e,t){const n=e.querySelector("p.source");if(n)return n;const a=document.createElement("div");return fetch(t).then(o=>o.json()).then(o=>{a.innerHTML=_e(o)}).catch(()=>{}),a}const oe=[{code:"08019004",name:"Barcelona (Poblenou)",kind:"background",area:"urban"},{code:"08019043",name:"Barcelona (Eixample)",kind:"traffic",area:"urban"},{code:"08019044",name:"Barcelona (Gràcia - Sant Gervasi)",kind:"traffic",area:"urban"},{code:"08019057",name:"Barcelona (Palau Reial)",kind:"background",area:"urban"},{code:"08019058",name:"Barcelona (Observatori Fabra)",kind:"background",area:"suburban"},{code:"08015021",name:"Badalona",kind:"background",area:"urban"},{code:"08187012",name:"Sabadell",kind:"traffic",area:"urban"},{code:"17079003",name:"Girona (Escola de Música)",kind:"traffic",area:"urban"},{code:"25120001",name:"Lleida",kind:"traffic",area:"urban"},{code:"43148028",name:"Tarragona (Parc de la Ciutat)",kind:"background",area:"urban"},{code:"08137001",name:"Montseny (La Castanya)",kind:"background",area:"rural"}];function pt(e,t){return t==="workdays"?[e.workdays]:t==="weekends"?[e.weekends]:[e.workdays,e.weekends]}const ja=e=>(e%4===0&&e%100!==0||e%400===0?366:365)*24,Ke=e=>e.reduce((t,n)=>t+n.reduce((a,o)=>a+o,0),0);function Oa(e,t){return Object.entries(e.years).map(([n,a])=>{const o=pt(a,t),s=o.reduce((h,l)=>h+Ke(l.counts),0),r=o.reduce((h,l)=>h+Ke(l.sums),0),i=pt(a,"all").reduce((h,l)=>h+Ke(l.counts),0);return{year:Number(n),mean:s>0?r/s:Number.NaN,measured:i/ja(Number(n))}}).filter(({mean:n})=>!Number.isNaN(n)).sort((n,a)=>n.year-a.year)}function Da(e,t){const n=Object.entries(e.years).filter(([a])=>Number(a)>=t.from&&Number(a)<=t.to).flatMap(([,a])=>pt(a,t.days));return Array.from({length:24},(a,o)=>Array.from({length:12},(s,r)=>{const i=n.reduce((l,c)=>l+(c.sums[r]?.[o]??0),0),h=n.reduce((l,c)=>l+(c.counts[r]?.[o]??0),0);return{mean:h>0?i/h:null,count:h}}))}const ne=[[0,[0,255,0]],[20,[225,225,0]],[40,[255,0,0]],[60,[225,0,225]],[80,[64,0,64]],[230,[16,0,8]]],Ra=([e,t,n])=>(.299*e+.587*t+.114*n)/255;function It(e){const t=Math.max(0,Math.min(e,230)),n=Math.max(1,ne.findIndex(([l])=>l>=t)),[a,o]=ne[n-1]??ne[0],[s,r]=ne[n]??ne[ne.length-1],i=(t-a)/(s-a),h=o.map((l,c)=>Math.round(l+((r[c]??0)-l)*i));return{background:`rgb(${h.join(",")})`,light:Ra(h)<.45}}const Ne=80,Nn=["January","February","March","April","May","June","July","August","September","October","November","December"],Wn=e=>String(e+1).padStart(2,"0");function La(e,t,n){if(e.mean===null)return'<td class="none"></td>';const{background:a,light:o}=It(e.mean),s=o?' class="deep"':"",r=`${Nn[n]}, hour ${Wn(t)}: ${e.mean.toFixed(1)} µg/m³, the mean of ${e.count} measurements`;return`<td${s} style="background:${a}" title="${r}">${Math.round(e.mean)}</td>`}function Fa(e){const t=`<tr><th></th>${Nn.map(a=>`<th scope="col">${a.slice(0,3)}</th>`).join("")}</tr>`,n=e.map((a,o)=>`<tr><th scope="row">${Wn(o)}</th>${a.map((s,r)=>La(s,o,r)).join("")}</tr>`);return`<table class="heat graded"><thead>${t}</thead><tbody>${n.join("")}</tbody></table>`}function Ct(e){if(e<=0)return[0];const t=10**Math.floor(Math.log10(e)),n=e/t>=5?t:e/t>=2?t/2:t/5,a=[];for(let o=0;o<=e;o+=n)a.push(Math.round(o*100)/100);return a}const Te=720,Ve=190,q={top:14,right:8,bottom:22,left:34},N=e=>e.toFixed(1);function Bn(e,t,n){const a=Math.min(...e),o=Math.max(...e),s=Te-q.left-q.right,r=Ve-q.top-q.bottom,i=s/Math.max(1,o-a+1),h=u=>q.left+(u-a)*i,l=u=>q.top+r-(u-t)/Math.max(1e-9,n-t)*r,d=Ct(n-t).map(u=>Math.round((u+t)*100)/100).map(u=>`<line class="grid" x1="${q.left}" x2="${Te-q.right}" y1="${N(l(u))}" y2="${N(l(u))}"/><text x="${q.left-4}" y="${N(l(u)+3)}" text-anchor="end">${u}</text>`).join(""),m=o-a>12?5:1,p=Array.from({length:o-a+1},(u,g)=>a+g).filter(u=>u%m===0).map(u=>`<text x="${N(h(u)+i/2)}" y="${Ve-6}" text-anchor="middle">${u}</text>`).join("");return{slot:i,x:h,y:l,left:q.left,right:Te-q.right,top:q.top,height:r,levels:u=>u.map(({from:g,to:v,value:y,label:k})=>`<line class="span" x1="${N(h(g))}" x2="${N(h(v)+i)}" y1="${N(l(y))}" y2="${N(l(y))}"/><text class="span" x="${N((h(g)+h(v)+i)/2)}" y="${N(l(y)-5)}" text-anchor="middle">${k}</text>`).join(""),wrap:(u,g)=>`<svg class="years" viewBox="0 0 ${Te} ${Ve}" role="img" aria-label="${u}">${d}${p}${g}</svg>`}}function ft(e,t){const n=Math.max(t.top??0,...e.map(({value:c})=>c),1),a=Bn(e.map(({year:c})=>c),0,n),{x:o,y:s,slot:r}=a,i=e.map(({year:c,value:d,title:m,chosen:p,partial:u,colour:g})=>`<rect class="${["bar",p?"chosen":"",u?"partial":""].filter(Boolean).join(" ")}" data-year="${c}"${g?` style="--bar:${g}"`:""} x="${N(o(c)+r*.15)}" y="${N(s(d))}" width="${N(r*.7)}" height="${N(s(0)-s(d))}"/><rect class="hit" data-year="${c}" x="${N(o(c))}" y="${a.top}" width="${N(r)}" height="${a.height}"><title>${m}</title></rect>`).join(""),h=(t.references??[]).map(({value:c,label:d})=>`<line class="reference" x1="${a.left}" x2="${a.right}" y1="${N(s(c))}" y2="${N(s(c))}"/><text class="reference" x="${a.right-2}" y="${N(s(c)-3)}" text-anchor="end">${d}</text>`).join(""),l=a.levels(t.spans??[]);return a.wrap(t.label,`${i}${h}${l}`)}const Na=.75,Wa=[{value:40,label:"EU limit, 40"},{value:10,label:"WHO guideline, 10"}];function Ba(e,t){const n=e.map(({year:a,mean:o,measured:s})=>{const r=s<Na,i=r?`, from only ${Math.round(s*100)}% of the year's hours`:"";return{year:a,value:o,partial:r,colour:It(o).background,chosen:a>=t.from&&a<=t.to,title:`${a}: ${o.toFixed(1)} µg/m³${i}`}});return ft(n,{label:"Mean NO2 of each year, µg/m³",top:Ne,references:Wa})}const Vt={all:"every day of the week",workdays:"Monday to Friday",weekends:"Saturdays and Sundays"};function Ha(){const e=Array.from({length:Ne/5+1},(n,a)=>It(a*5).background),t=[0,20,40,60,Ne].map(n=>`<span>${n===Ne?`${n}+`:n}</span>`).join("");return`<div class="scale" aria-hidden="true"><div class="ramp" style="background:linear-gradient(to right,${e.join(",")})"></div><div class="ticks">${t}</div><div class="ticks words"><span>clean</span><span>EU limit</span><span>twice it</span></div></div>`}function Hn(e,t){const n=Object.keys(e.years).map(Number),a=Math.max(t.from,Math.min(...n)),o=Math.min(t.to,Math.max(...n)),s=a===o?String(a):`${a}–${o}`;return`<figure class="no2"><figcaption><strong>${e.name}</strong> · ${e.kind}, ${e.area} · mean NO2 in µg/m³ by hour of the day and month of the year · ${Vt[t.days]}, ${s}</figcaption>`+Fa(Da(e,t))+Ha()+`<h4>The mean of each year, ${Vt[t.days]}</h4>`+Ba(Oa(e,t.days),{from:a,to:o})+"</figure>"}function ye(e){const t=Object.keys(e.years).map(Number);return{from:Math.min(...t),to:Math.max(...t),days:"all"}}const Ga=[["all","every day"],["workdays","Monday to Friday"],["weekends","Saturday and Sunday"]];function _a(e){const t=new Map,n=At(e,"/data/no2/index.json"),a=f("div");a.append(...e.querySelectorAll("figure"));let o=null,s={from:0,to:9999,days:"all"},r=!1;const i=(y,k=String(y))=>f("option",{value:y},k),h=f("select",{onchange:()=>{g(h.value)}},...oe.map(({code:y,name:k})=>i(y,k))),l=f("select",{onchange:()=>u({days:l.value})},...Ga.map(([y,k])=>i(y,k))),c=f("select",{onchange:()=>u({from:Number(c.value),to:Math.max(Number(c.value),s.to)})}),d=f("select",{onchange:()=>u({to:Number(d.value),from:Math.min(Number(d.value),s.from)})}),m=f("button",{type:"button",onclick:()=>o&&u(ye(o))},"every year");function p(){o&&(a.innerHTML=Hn(o,s),c.value=String(s.from),d.value=String(s.to),l.value=s.days)}function u(y){s={...s,...y},p()}async function g(y){const k=t.get(y)??fetch(`/data/no2/${y}.json`).then(w=>w.json());t.set(y,k);try{const w=await k;if(r||h.value!==y)return;const S=ye(w),M=o!==null&&(s.from!==ye(o).from||s.to!==ye(o).to),A=Object.keys(w.years).map(Number).filter(j=>j>=s.from&&j<=s.to),$=M&&A.length>0?{from:Math.min(...A),to:Math.max(...A)}:S;o=w,s={...$,days:s.days};const E=Object.keys(w.years);c.replaceChildren(...E.map(j=>i(j))),d.replaceChildren(...E.map(j=>i(j))),p()}catch{t.delete(y),a.replaceChildren(f("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}a.addEventListener("click",y=>{const k=y.target?.closest("[data-year]")?.getAttribute("data-year");k&&u({from:Number(k),to:Number(k)})});const v=f("div",{class:"row"},f("label",{},"Station ",h),f("label",{},"Days ",l),f("label",{},"Years ",c," to ",d),m);return e.replaceChildren(v,a,n),g(h.value),()=>{r=!0}}const qa="https://analisi.transparenciacatalunya.cat/resource";function Gn(e,t){const n=new URL(`${qa}/${e}.json`);for(const[a,o]of Object.entries(t))o!==void 0&&n.searchParams.set(`$${a}`,String(o));return n.toString()}const Xt="tasf-thgu",_n=Array.from({length:24},(e,t)=>String(t+1).padStart(2,"0")),Ja=0,Ua=6,Se=()=>Array.from({length:12},()=>new Array(24).fill(0)),Ya=()=>({workdays:{sums:Se(),counts:Se()},weekends:{sums:Se(),counts:Se()}});function za(e){if(!Array.isArray(e))throw new Error("the portal did not answer with rows");if(e.length===0)throw new Error("the portal answered with no rows");return e}function Ka(e,t){const n=Number(t.month)-1;_n.forEach((a,o)=>{const s=e.sums[n],r=e.counts[n];if(!s||!r)throw new Error(`month ${t.month} is not a month`);s[o]=(s[o]??0)+Number(t[`s${a}`]??0),r[o]=(r[o]??0)+Number(t[`n${a}`]??0)})}const Va={name:"no2",directory:"public/data/no2",firstYear:1991,files:oe.map(e=>`${e.code}.json`),about:{measures:"NO2, hourly, µg/m³",network:"Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica",attribution:"Generalitat de Catalunya, Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica. Dades obertes.",dataset:`https://analisi.transparenciacatalunya.cat/d/${Xt}`,stations:oe},requestsFor(e){const t=oe.map(a=>`'${a.code}'`).join(","),n=_n.map(a=>`sum(h${a}) as s${a}, count(h${a}) as n${a}`).join(", ");return[Gn(Xt,{select:`codi_eoi, date_extract_m(data) as month, date_extract_dow(data) as dow, count(*) as days, ${n}`,where:`contaminant='NO2' and codi_eoi in (${t}) and data between '${e}-01-01T00:00:00' and '${e}-12-31T23:59:59'`,group:"codi_eoi,month,dow",limit:5e3})]},withYear(e,t,n){const a=za(n[0]);if(a.some(s=>Number(s.days)>5))throw new Error("some days are in the portal twice");if(!a.some(s=>s.month==="12"))throw new Error("the year does not reach December yet");const o=new Map;for(const s of a){const r=s.codi_eoi??"",i=o.get(r)??Ya();o.set(r,i);const h=Number(s.dow);Ka(h===Ja||h===Ua?i.weekends:i.workdays,s)}return Object.fromEntries(oe.map(s=>{const r=`${s.code}.json`,i=o.get(s.code),h={...e[r]?.years,...i?{[t]:i}:{}};return[r,{...s,years:h}]}))}},Xa=e=>{const t=JSON.parse(e(`/data/no2/${oe[0]?.code}.json`)),n=JSON.parse(e("/data/no2/index.json"));return Hn(t,ye(t))+_e(n)},Qa={name:"air-quality",apps:{no2:_a},stills:{no2:Xa},sources:[Va]},re=5,qe=8,le=e=>Math.max(0,Math.min(100,e));function Qt(e){const{focus:t,fatigue:n,featureSize:a,weeks:o,calendar:s,meetingTypes:r}=e,i=[];let h=0,l=0;for(let c=0;c<o;c+=1)for(let d=0;d<re;d+=1){let m=0,p=0;for(let u=0;u<qe;u+=1){const g=r[s[`${d}-${u}`]??""];if(g){m=le(m+g.focus),p=le(p+g.fatigue),i.push({week:c,day:d,hour:u,inMeeting:!0,hourFocus:m,hourFatigue:p,hourProductivity:0,accumulatedProductivity:h,completedFeatures:l,featureCompleted:!1});continue}m=le(m+t),p=le(p+n);const v=le(m-p),y=a-h,k=v>y,w=k?y:v;k?(l+=1,h=0):h+=w,i.push({week:c,day:d,hour:u,inMeeting:!1,hourFocus:m,hourFatigue:p,hourProductivity:w,accumulatedProductivity:h,completedFeatures:l,featureCompleted:k}),k&&(m=0)}}return i}function Me(){return Array.from({length:qe},()=>new Array(re).fill(0))}function Ae(e,{hour:t,day:n},a){const o=e[t];o&&(o[n]=(o[n]??0)+a)}function Zt(e,{featureSize:t,weeks:n}){const a=e[e.length-1],o=a?.completedFeatures??0,s=a?.accumulatedProductivity??0,r=o+Math.round(10*s/t)/10,i=o*t+s,h=Array.from({length:re},()=>({productivity:0,features:0,meetings:0})),l={focus:Me(),fatigue:Me(),productivity:Me(),features:Me()};for(const d of e){const m=h[d.day];m.productivity+=d.hourProductivity,d.featureCompleted&&(m.features+=1),d.inMeeting&&(m.meetings+=1),Ae(l.focus,d,d.hourFocus),Ae(l.fatigue,d,d.hourFatigue),Ae(l.productivity,d,d.hourProductivity),d.featureCompleted&&Ae(l.features,d,1)}const c=d=>d.map(m=>m.map(p=>n>0?p/n:0));return{totalFeatures:r,totalProductivity:i,averageFeaturesPerWeek:n>0?r/n:0,averageProductivityPerWeek:n>0?i/n:0,days:h,hours:{focus:c(l.focus),fatigue:c(l.fatigue),productivity:c(l.productivity),features:l.features}}}const He=480,Z=240,W={top:10,right:10,bottom:34,left:36};function qn(e,t,n,a){const o=He-W.left-W.right,s=Z-W.top-W.bottom,r=l=>W.top+s-(e>0?l/e*s:0),i=a.map(l=>`<line class="grid" x1="${W.left}" x2="${He-W.right}" y1="${r(l)}" y2="${r(l)}"/><text x="${W.left-4}" y="${r(l)+3}" text-anchor="end">${l}</text>`).join(""),h=(n>1?[1,Math.ceil(n/2),n]:[]).filter((l,c,d)=>d.indexOf(l)===c).map(l=>`<text x="${W.left+(l-1)/Math.max(1,n-1)*o}" y="${Z-W.bottom+14}" text-anchor="middle">${l}</text>`).join("");return`${i}${h}<text x="${W.left+o/2}" y="${Z-6}" text-anchor="middle">${t.x}</text><text transform="translate(9 ${W.top+s/2}) rotate(-90)" text-anchor="middle">${t.y}</text>`}function Za(e,t){const n=Math.max(...e.map(c=>c.values.length),1),a=Math.max(1,...e.flatMap(c=>c.values)),o=He-W.left-W.right,s=Z-W.top-W.bottom,r=c=>W.left+c/Math.max(1,n-1)*o,i=c=>W.top+s-c/a*s,h=e.map(c=>{const d=c.values.map((m,p)=>`${r(p).toFixed(1)},${i(m).toFixed(1)}`).join(" ");return`<polyline class="line ${c.className}" points="${d}"><title>${c.name}</title></polyline>`}).join(""),l=e.map((c,d)=>`<rect class="${c.className}" x="${W.left+d*90}" y="${Z-W.bottom+20}" width="10" height="3"/><text x="${W.left+d*90+14}" y="${Z-W.bottom+24}">${c.name}</text>`).join("");return`<svg viewBox="0 0 ${He} ${Z}" role="img" aria-label="${t.y} by ${t.x}">${qn(a,t,n,Ct(a))}${h}${l}</svg>`}const en=480,de=240,G={top:10,right:10,bottom:34,left:36};function Jn(e,t,n){const a=Math.max(...e.map(u=>u.values.length),1),o=Math.max(1,...e.flatMap(u=>u.values)),s=en-G.left-G.right,r=de-G.top-G.bottom,i=s/a,h=i*.7/e.length,l=u=>G.top+r-u/o*r,c=e.map((u,g)=>u.values.map((v,y)=>{const k=G.left+y*i+i*.15+g*h;return`<rect class="${u.className}" x="${k.toFixed(1)}" y="${l(v).toFixed(1)}" width="${h.toFixed(1)}" height="${(G.top+r-l(v)).toFixed(1)}"><title>${u.name}: ${Math.round(v*10)/10}</title></rect>`}).join("")).join(""),d=(n??[]).map((u,g)=>`<text x="${G.left+g*i+i/2}" y="${de-G.bottom+14}" text-anchor="middle">${u}</text>`).join(""),m=e.map((u,g)=>`<rect class="${u.className}" x="${G.left+g*90}" y="${de-G.bottom+20}" width="10" height="3"/><text x="${G.left+g*90+14}" y="${de-G.bottom+24}">${u.name}</text>`).join(""),p=qn(o,t,n?0:a,Ct(o));return`<svg viewBox="0 0 ${en} ${de}" role="img" aria-label="${t.y} by ${t.x}">${p}${c}${d}${m}</svg>`}const gt=["Mon","Tue","Wed","Thu","Fri"],Un=Array.from({length:qe},(e,t)=>`${9+t}:00`);function eo(e){return e<=500?e:e<=750?500+(e-500)*2:e<1e3?1e3+(e-750)*35:1e4}function to(e){return e<=500?e:e<=1e3?500+(e-500)/2:e<1e4?750+(e-1e3)/35:1e3}function Ie(e,t){const n=t.flat(),a=Math.min(...n),o=Math.max(...n),s=f("div",{class:"week"},f("span"),...gt.map(r=>f("span",{class:"head"},r)));return t.forEach((r,i)=>{s.append(f("span",{class:"hour"},Un[i]??""));for(const h of r){const l=o>a?(h-a)/(o-a):0;s.append(f("span",{class:"cell",style:`--heat:${(.1+l*.9).toFixed(2)}`},String(Math.round(h))))}}),f("div",{},f("h4",{},e),s)}function no(e){const t={focus:25,fatigue:15,featureSize:300,weeks:8},n={"🍽️ Lunch":{focus:-100,fatigue:-100},"🏃 Sprint plan":{focus:-100,fatigue:50},"😴 Boring":{focus:-50,fatigue:-25}},a={};for(let I=0;I<re;I+=1)a[`${I}-3`]="🍽️ Lunch";let o="🏃 Sprint plan",s=null;const r=f("div",{class:"figures"}),i=f("div",{class:"chart"}),h=f("div",{class:"maps"}),l=f("div",{class:"week"}),c=f("select"),d=f("input",{type:"number",min:-100,max:100}),m=f("input",{type:"number",min:-100,max:100}),p=f("input",{type:"text",placeholder:"New meeting name",size:16}),u=(I,x,O,b,T=L=>L,R=L=>L)=>{const L=f("output",{},String(t[I])),P=f("input",{type:"range",min:O,max:b,value:R(t[I]),oninput:()=>{t[I]=T(Number(P.value)),L.textContent=String(t[I]),D()}});return f("label",{},`${x}: `,L,P)},g=f("div",{class:"dials"},u("focus","Focus an hour",0,100),u("fatigue","Fatigue an hour",0,100),u("featureSize","Feature size",0,1e3,eo,to),u("weeks","Weeks",1,16));function v(){c.replaceChildren(...Object.keys(n).map(x=>f("option",{value:x,selected:x===o},x)));const I=n[o];d.value=String(I?.focus??0),m.value=String(I?.fatigue??0)}c.addEventListener("change",()=>{o=c.value,v()});const y=()=>{n[o]={focus:Number(d.value)||0,fatigue:Number(m.value)||0},D()};d.addEventListener("change",y),m.addEventListener("change",y);const k=()=>{const I=p.value.trim();!I||n[I]||(n[I]={focus:0,fatigue:0},o=I,p.value="",v())},w=f("div",{class:"row"},f("span",{},"Paint: "),c,f("span",{},"focus "),d,f("span",{},"fatigue "),m,p,f("button",{type:"button",onclick:k},"Add"));let S=null;const M=I=>{if(S==="add"&&!a[I])a[I]=o;else if(S==="remove"&&a[I])delete a[I];else return;D()};function A(){l.replaceChildren(f("span"),...gt.map(I=>f("span",{class:"head"},I))),Un.forEach((I,x)=>{l.append(f("span",{class:"hour"},I));for(let O=0;O<re;O+=1){const b=`${O}-${x}`,T=a[b];l.append(f("span",{class:T?"slot meeting":"slot",title:T??"free",onpointerdown:R=>{R.preventDefault(),S=a[b]?"remove":"add",M(b)},onpointerenter:()=>{S&&M(b)}},T?T.slice(0,2):""))}})}window.addEventListener("pointerup",()=>{S=null});const $=f("div",{class:"row"}),E=()=>{s={summary:Zt(Qt({...t,calendar:a,meetingTypes:n}),t),weeks:t.weeks},D()},j=()=>{s=null,D()};function D(){A();const I=Qt({...t,calendar:a,meetingTypes:n}),x=Zt(I,t),O=t.weeks*re*qe;r.replaceChildren(f("div",{class:"clean"},f("strong",{},x.totalFeatures.toFixed(1)),"features finished"),f("div",{},f("strong",{},x.averageFeaturesPerWeek.toFixed(2)),"features a week"),f("div",{},f("strong",{},Math.round(x.totalProductivity/O).toString()),"productivity an hour"),f("div",{},f("strong",{},String(O)),"hours simulated")),$.replaceChildren(s?f("span",{},`Baseline: ${s.summary.averageFeaturesPerWeek.toFixed(2)} features a week over ${s.weeks} weeks; now ${x.averageFeaturesPerWeek.toFixed(2)}. `):f("span",{},"Keep this run to compare against: "),f("button",{type:"button",onclick:E},s?"Save again":"Save as baseline")),s&&$.append(f("button",{type:"button",onclick:j},"Clear")),i.innerHTML=Jn([{name:"Productivity",className:"clean",values:x.days.map(b=>b.productivity/t.weeks)},{name:"Features ×100",className:"debt",values:x.days.map(b=>b.features/t.weeks*100)}],{x:"",y:"A day, on average"},gt),i.prepend(f("h4",{},"The shape of a week")),h.replaceChildren(Ie("Focus",x.hours.focus),Ie("Fatigue",x.hours.fatigue),Ie("Productivity",x.hours.productivity),Ie("Features finished",x.hours.features))}v(),e.append(g,w,f("div",{class:"charts"},l,i),r,$,h),D()}const ao={name:"developer-meetings",apps:{"developer-meetings":no}};function oo(e,t){const n=[];for(let a=e.length-1;a>=0;a-=1)n.push(e.slice(0,a));for(let a=1;a<=t.length;a+=1)n.push(t.slice(0,a));return n}const so=3800,ro=6500,io=26,ho=46,co=420;function lo(e){return[...e.childNodes].map(t=>t.nodeName==="BR"?`
`:t.textContent??"").join("")}function uo(e){const t=document.querySelector("main h1");if(!t||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return()=>{};const n={text:lo(t)};t.setAttribute("aria-label",n.text),t.classList.add("typing");const a=document.createElement("span");a.className="caret idle",a.setAttribute("aria-hidden","true");const o=(c,d)=>{const m=c.split(`
`).flatMap((p,u)=>u===0?[p]:[document.createElement("br"),p]);if(d){const p=document.createElement("a");p.href=d,p.append(...m,a),t.replaceChildren(p)}else t.replaceChildren(...m,a)};o(n.text);let s=n,r=[],i=performance.now()+so,h=0;const l=c=>{if(h=requestAnimationFrame(l),c<i)return;if(r.length===0){const m=e(s,n);r=oo(s.text,m.text),s=m,a.classList.remove("idle")}const d=r.shift()??s.text;o(d,r.length===0?s.href:void 0),r.length===0?(a.classList.add("idle"),i=c+ro):d===""?i=c+co:i=c+(d.length<(r[0]?.length??0)?ho:io)};return h=requestAnimationFrame(l),()=>{cancelAnimationFrame(h),o(n.text),a.remove(),t.classList.remove("typing"),t.removeAttribute("aria-label")}}function mo(e,t){const n=[...e];for(let a=n.length-1;a>0;a-=1){const o=Math.min(a,Math.floor(t()*(a+1)));[n[a],n[o]]=[n[o],n[a]]}return n}function po(e,t){let n=[];return a=>(n.length===0&&(n=mo(e,t),n.length>1&&n[0]===a&&n.push(n.shift())),n.shift()??a)}const fo=[{text:`More than
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
as this page opened.`,href:"/worlds/"}];let Xe=null;const go={name:"headline",arrive:e=>{if(Xe?.(),Xe=null,e.route!=="/")return;let t=null;Xe=uo((n,a)=>(t??=po([a,...fo],Math.random),t(n)))}};function wo(e,t){let n=Array.from({length:t.length+1},(a,o)=>o);for(let a=1;a<=e.length;a+=1){const o=[a];for(let s=1;s<=t.length;s+=1){const r=(n[s-1]??0)+(e[a-1]===t[s-1]?0:1);o[s]=Math.min(r,(n[s]??0)+1,(o[s-1]??0)+1)}n=o}return n[t.length]??0}function yo(e,t){if(t.includes(e))return e;let n=null,a=1/0;for(const o of t){const s=wo(e,o);s<a&&([n,a]=[o,s])}return n}const bo=/[\p{L}\p{M}\p{N}']+|[.,!?;:]/gu,vo=/\]\([^)]*\)|^---[\s\S]*?\n---|[#*_`>\[\]|]|::[a-z-]+/gm;function Ge(e){return e.normalize("NFKC").replace(vo," ").toLowerCase().match(bo)??[]}const Ce=" ";class wt{constructor(t,n){this.memory=n;const a=Ge(t),o=new Map;for(const s of a)o.set(s,(o.get(s)??0)+1);this.vocabulary=[...o.keys()],this.commonest=[...o].reduce((s,r)=>s&&s[1]>=r[1]?s:r,null)?.[0]??null;for(let s=1;s<a.length;s+=1)for(let r=1;r<=n&&r<=s;r+=1){const i=a.slice(s-r,s).join(Ce),h=this.followers.get(i)??new Map;h.set(a[s]??"",(h.get(a[s]??"")??0)+1),this.followers.set(i,h)}}memory;vocabulary;commonest;followers=new Map;after(t){for(let n=Math.min(this.memory,t.length);n>=1;n-=1){const a=t.slice(-n),o=this.followers.get(a.join(Ce));if(o)return{context:a,candidates:tn(o)}}return{context:[],candidates:[]}}transitions(){return[...this.followers].filter(([t])=>t.split(Ce).length===this.memory).flatMap(([t,n])=>tn(n).map(a=>({context:t.split(Ce),...a}))).sort((t,n)=>n.probability-t.probability||n.count-t.count)}}function tn(e){const t=[...e.values()].reduce((n,a)=>n+a,0);return[...e].map(([n,a])=>({word:n,count:a,probability:a/t})).sort((n,a)=>a.count-n.count)}function ko(e,t){let n=t();for(const a of e)if(n-=a.probability,n<=0)return a.word;return e[e.length-1]?.word??null}function nn(e){return e.reduce((t,n)=>t===""||/^[.,!?;:]$/.test(n)?t+n:`${t} ${n}`,"")}function Yn(e,t){if(t<=0)return e.map((o,s)=>({...o,probability:s===0?1:0}));const n=e.map(o=>o.probability**(1/t)),a=n.reduce((o,s)=>o+s,0);return e.map((o,s)=>({...o,probability:(n[s]??0)/a}))}const Qe=40,an=8,Ze=e=>`${Math.round(e*100)}%`;function zn(e,t,n){const{context:a,candidates:o}=e.after(t),s=o.slice(0,an),r=Yn(o,n).slice(0,an),i=o.reduce((g,{count:v})=>g+v,0),h=t.slice(0,t.length-a.length),l=`<p class="written">${C(nn(h))}${h.length&&a.length?" ":""}${a.length?`<mark>${C(nn(a))}</mark>`:""}<span class="caret"></span></p>`,c=s.length?`<ol class="offered">${s.map(({word:g,count:v,probability:y},k)=>{const w=r[k]?.probability??0;return`<li><button type="button" data-word="${C(g)}" title="seen ${v} of ${i} times: ${Ze(y)} as learnt"><span class="word">${C(g)}</span><span class="chance" style="--p:${w.toFixed(3)}"></span><span class="figure">${Ze(w)}</span></button></li>`}).join("")}</ol>`:`<p class="offered">It never saw anything follow “${C(t[t.length-1]??"")}”. This is where it stops.</p>`,d=g=>a.length===e.memory&&g.context.join(" ")===a.join(" "),m=e.transitions(),p=[...m.filter(d),...m.filter(g=>!d(g))].slice(0,Qe).map(g=>`<tr${d(g)?' class="now"':""}><td>${C(g.context.join(" "))}</td><td>${C(g.word)}</td><td>${g.count}</td><td>${Ze(g.probability)}</td></tr>`).join(""),u=`<table class="learnt"><caption>What it learnt: ${m.length} transitions between ${e.vocabulary.length} words${m.length>Qe?`, the first ${Qe} shown`:""}</caption><thead><tr><th>after</th><th>comes</th><th>seen</th><th>chance</th></tr></thead><tbody>${p}</tbody></table>`;return`<div class="next-word">${l}<h4>What may come next</h4>${c}${u}</div>`}const We="The cat is happy. The dog is glad. The cat sleeps. The dog plays. The cat eats. The dog runs. The car is fast. The car goes far.",xo=350;function $o(e,{site:t}){const n={small:()=>We,site:()=>t.pages.map($=>$.body).join(`

`),own:()=>c.value};let a=new wt(We,1),o=Ge("the"),s=null;const r=f("div"),i=($,E)=>f("option",{value:$},E),h=f("select",{onchange:()=>y()},i("small","eight short sentences"),i("site","this website"),i("own","your own text")),l=f("select",{onchange:()=>y()},i(1,"one word back"),i(2,"two words back"),i(3,"three words back")),c=f("textarea",{rows:5,hidden:!0,placeholder:"Paste any text here. The longer, the better it pretends.",oninput:()=>y()}),d=f("output",{},"1"),m=f("input",{type:"range",min:0,max:2,step:.1,value:1,oninput:()=>g()}),p=f("input",{type:"text",value:"the",onchange:()=>v()}),u=f("button",{type:"button",onclick:()=>s?S():w()},"write");function g(){d.textContent=m.value,r.innerHTML=zn(a,o,Number(m.value))}function v(){S();const $=Ge(p.value).flatMap(E=>yo(E,a.vocabulary)??[]);o=$.length?$:a.commonest?[a.commonest]:[],g()}function y(){c.hidden=h.value!=="own",a=new wt(n[h.value]?.()??We,Number(l.value)),v()}function k(){const $=ko(Yn(a.after(o).candidates,Number(m.value)),Math.random);return $===null?!1:(o=[...o,$],g(),!0)}function w(){u.textContent="stop",s=setInterval(()=>{k()||S()},xo)}function S(){s&&clearInterval(s),s=null,u.textContent="write"}r.addEventListener("click",$=>{const E=$.target?.closest("[data-word]")?.getAttribute("data-word");E&&(o=[...o,E],g())});const M=f("div",{class:"dials"},f("label",{},"It has read",h),f("label",{},"It looks",l),f("label",{},"Temperature: ",d,m),f("label",{},"Start from",p)),A=f("div",{class:"row"},f("button",{type:"button",onclick:()=>{k()}},"next word"),u,f("button",{type:"button",onclick:()=>v()},"start over"));return e.replaceChildren(M,c,A,r),g(),S}const To=()=>zn(new wt(We,1),Ge("the"),1),So={name:"next-word",apps:{"next-word":$o},stills:{"next-word":To}},et={"string-cache-map":"a WeakMap replacement for string keys, with a bounded cache behind it","async-barrier":"a helper that makes async/await tests say what they wait for","spy-middleware":"a Redux middleware for spying on actions in tests","grunt-frontmatter":"a Grunt task: many files with YAML front matter into one JSON","object-canonical-keys":"always the same array of keys for the same keys, so comparisons stay cheap","async-deferrer":"one function that returns a promise, or resolves it"},on=160,tt=28,Be=e=>e.toLocaleString("en-US");function nt(e,t){const n=Math.max(1,...e.map(t)),a=on/e.length,o=e.map((s,r)=>{const i=t(s)/n*(tt-2);return`<rect x="${(r*a+1).toFixed(1)}" y="${(tt-i).toFixed(1)}" width="${(a-2).toFixed(1)}" height="${i.toFixed(1)}"><title>${s}: ${Be(t(s))}</title></rect>`}).join("");return`<svg class="spark" viewBox="0 0 ${on} ${tt}" role="img" aria-label="Downloads a year, ${e[0]} to ${e[e.length-1]}">${o}</svg>`}function Kn(e){const t=Object.keys(e.years).sort(),n=c=>d=>e.years[d]?.[c]??0,a=c=>t.reduce((d,m)=>d+c(m),0),o=Object.keys(et).sort((c,d)=>a(n(d))-a(n(c))),s=[...new Set(t.flatMap(c=>Object.keys(e.years[c]??{})))].filter(c=>!(c in et)),r=c=>s.reduce((d,m)=>d+n(m)(c),0),i=c=>Object.values(e.years[c]??{}).reduce((d,m)=>d+m,0),h=o.filter(c=>a(n(c))>0).map(c=>`<tr><th scope="row"><a href="https://www.npmjs.com/package/${c}"><code>${c}</code></a><span>${et[c]}</span></th><td>${nt(t,n(c))}</td><td>${Be(a(n(c)))}</td></tr>`).join(""),l=s.length?`<tr><th scope="row">the other ${s.length}<span>mostly AngularJS and Redux helpers written for one project each</span></th><td>${nt(t,r)}</td><td>${Be(a(r))}</td></tr>`:"";return`<figure class="packages"><table class="packages"><thead><tr><th>package</th><th>${t[0]} to ${t[t.length-1]}, a bar a year</th><th>downloads</th></tr></thead><tbody>${h}${l}</tbody><tfoot><tr><th scope="row">all of them</th><td>${nt(t,i)}</td><td>${Be(a(i))}</td></tr></tfoot></table></figure>`}function Mo(e){if(e.querySelector("figure"))return;const t=At(e,"/data/npm/index.json");fetch("/data/npm/downloads.json").then(n=>n.json()).then(n=>{e.innerHTML=Kn(n),e.append(t)}).catch(()=>{e.textContent="The download counts did not arrive. The rest of the page does not depend on them."})}const at=["string-cache-map","async-barrier","spy-middleware","grunt-frontmatter","object-canonical-keys","gherkin-genie","async-deferrer","egg-hatchery","angular-tags","class-strict","micro-egg-hatchery","node-dio","ducks-middleware","drpx-updateable","generator-drpx","grunt-ngtags","teal-redux-egg","ducks-reducer","drpx-storage-mocks","strict-classes","ngtags","redux-egg","esmoquin","drpx-storage","dio-provider","drpx-components","grunt-angular-tags","drpx-bind-angular","drpx-toggle","drpx-id","drpx-seo","drpx-otherwisehome","drpx-class-route","drpx-transcludeto"],ot="downloads.json",Ao={name:"npm",directory:"public/data/npm",firstYear:2015,files:[ot],about:{measures:"downloads a year of the npm packages published as drpicox",attribution:"npm, Inc. Download counts of the public registry.",dataset:"https://github.com/npm/registry/blob/main/docs/download-counts.md",packages:at},requestsFor(e){return[`https://api.npmjs.org/downloads/point/${e}-01-01:${e}-12-31/${at.join(",")}`]},withYear(e,t,n){const a=n[0],o=Object.entries(typeof a=="object"&&a!==null?a:{}).flatMap(([s,r])=>{const i=r?.downloads;return at.includes(s)&&typeof i=="number"&&i>0?[[s,i]]:[]});if(o.length===0)throw new Error("the registry did not answer with downloads");return{[ot]:{years:{...e[ot]?.years,[t]:Object.fromEntries(o)}}}}},Io=e=>Kn(JSON.parse(e("/data/npm/downloads.json")))+_e(JSON.parse(e("/data/npm/index.json"))),Co={name:"packages",apps:{packages:Mo},stills:{packages:Io},sources:[Ao]},ve={dryMass:25e3,fuel:5e3,exhaust:.72,acceleration:.3},Ee=149597870700,ue=94607e11,yt=[{name:"the Moon",metres:3844e5,said:"384,400 km"},{name:"Mars",metres:.52*Ee,said:"0.52 au"},{name:"Jupiter",metres:4.2*Ee,said:"4.2 au"},{name:"Saturn",metres:8.5*Ee,said:"8.5 au"},{name:"Pluto",metres:38.5*Ee,said:"38.5 au"},{name:"Proxima Centauri",metres:4.24*ue,said:"4.24 light-years"},{name:"Sirius",metres:8.58*ue,said:"8.58 light-years"},{name:"Epsilon Eridani",metres:10.52*ue,said:"10.52 light-years"},{name:"the centre of the galaxy",metres:26e3*ue,said:"26,000 light-years",towards:{ra:17.76,dec:-29}},{name:"Andromeda",metres:25e5*ue,said:"2.5 million light-years",towards:{ra:.712,dec:41.27}}],Eo=[[365.25*86400*1e6,"million years"],[365.25*86400,"years"],[86400,"days"],[3600,"hours"],[60,"minutes"],[1,"seconds"]];function ie(e){const[t,n]=Eo.find(([s])=>e>=s)??[1,"seconds"],a=e/t;return`${a>=10?Math.round(a).toLocaleString("en-US"):String(Math.round(a*10)/10)} ${n}`}const U=299792458,Po=9.81;function Vn(e,t){const n=t.acceleration*Po,a=t.dryMass+t.fuel,o=t.exhaust*U,s=U/n*Math.acosh(1+n*e/(2*U*U)),r=a*(1-Math.exp(-2*n*s/o)),i=r>t.fuel,h=i?o/n*Math.log(a/(a-t.fuel/2)):s,l=Math.tanh(n*h/U),c=U/n*Math.sinh(n*h/U),d=U*U/n*(Math.cosh(n*h/U)-1),m=Math.max(0,e-2*d),p=i?m/(l*U):0,u=p*Math.sqrt(1-l*l);return{shipTime:2*h+u,homeTime:2*c+p,burnTime:h,coastTime:u,topSpeed:l,fuelBurnt:i?t.fuel:r,coasts:i}}const Xn=299792458,jo=9.81,me=720,Pe=170,_={top:12,right:10,bottom:24,left:40};function Qn(e){if(e<.01)return`${Math.round(e*Xn/1e3).toLocaleString("en-US")} km/s`;if(e<.99)return`${(e*100).toPrecision(2)}% of c`;const t=Math.min(12,Math.ceil(-Math.log10(1-e)));return`${(Math.floor(e*10**t)/10**(t-2)).toFixed(t-2)}% of c`}const Oo=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:3});function sn(e){return e>=1e6?`${Oo.format(e)} t`:`${e>=100?Math.round(e).toLocaleString("en-US"):e.toPrecision(2)} t`}function Do(e,t){const n=me-_.left-_.right,a=Pe-_.top-_.bottom,o=m=>_.left+m/e.shipTime*n,s=m=>_.top+a-m/Math.max(e.topSpeed,1e-12)*a,r=t.acceleration*jo,i=24,h=Array.from({length:i+1},(m,p)=>e.burnTime*p/i).map(m=>[m,Math.tanh(r*m/Xn)]),c=[...h.map(([m,p])=>[m,p]),...h.reverse().map(([m,p])=>[e.shipTime-m,p])].map(([m,p])=>`${o(m).toFixed(1)},${s(p).toFixed(1)}`).join(" "),d=e.coasts?`<text x="${((o(e.burnTime)+o(e.shipTime-e.burnTime))/2).toFixed(1)}" y="${(s(e.topSpeed)+14).toFixed(1)}" text-anchor="middle">engine off, ${ie(e.coastTime)}</text>`:"";return`<svg class="trip" viewBox="0 0 ${me} ${Pe}" role="img" aria-label="Speed against the ship's clock"><line class="grid" x1="${_.left}" x2="${me-_.right}" y1="${s(0)}" y2="${s(0)}"/><line class="grid" x1="${_.left}" x2="${me-_.right}" y1="${s(e.topSpeed)}" y2="${s(e.topSpeed)}"/><text x="${_.left}" y="${s(e.topSpeed)-3}">${Qn(e.topSpeed)}</text><polyline class="line" points="${c}"/>${d}<text x="${_.left}" y="${Pe-6}">departure</text><text x="${me-_.right}" y="${Pe-6}" text-anchor="end">arrival, ${ie(e.shipTime)} on board</text></svg>`}function Zn(e,t){const n=yt.map(s=>({destination:s,trip:Vn(s.metres,e)})),a=n.map(({destination:s,trip:r})=>{const i=[s.name===t?"chosen":"",r.coasts?"coasts":""].filter(Boolean).join(" "),h=r.coasts?`all ${sn(e.fuel)}, then coasts`:sn(r.fuelBurnt);return`<tr${i?` class="${i}"`:""} data-destination="${s.name}"><th scope="row">${s.name}</th><td>${s.said}</td><td>${ie(r.shipTime)}</td><td>${ie(r.homeTime)}</td><td>${Qn(r.topSpeed)}</td><td>${h}</td></tr>`}).join(""),o=n.find(({destination:s})=>s.name===t)??n[0];return`<figure class="rocket"><table class="voyages"><thead><tr><th>to</th><th>distance</th><th>on board</th><th>at home</th><th>top speed</th><th>fuel burnt</th></tr></thead><tbody>${a}</tbody></table>`+(o?`<h4>To ${o.destination.name}: speed against the ship's clock</h4>${Do(o.trip,e)}`:"")+"</figure>"}const je=[{name:"Proxima Centauri",ra:14.495,dec:-62.68,lightYears:4.24},{name:"Alpha Centauri",ra:14.66,dec:-60.83,lightYears:4.37},{name:"Barnard's Star",ra:17.963,dec:4.69,lightYears:5.96},{name:"Wolf 359",ra:10.941,dec:7.01,lightYears:7.86},{name:"Lalande 21185",ra:11.056,dec:35.97,lightYears:8.31},{name:"Sirius",ra:6.752,dec:-16.72,lightYears:8.58},{name:"Luyten 726-8",ra:1.65,dec:-17.95,lightYears:8.73},{name:"Ross 154",ra:18.83,dec:-23.84,lightYears:9.69},{name:"Ross 248",ra:23.699,dec:44.18,lightYears:10.3},{name:"Epsilon Eridani",ra:3.549,dec:-9.46,lightYears:10.52},{name:"Lacaille 9352",ra:23.098,dec:-35.85,lightYears:10.72},{name:"Ross 128",ra:11.796,dec:.8,lightYears:11.01},{name:"EZ Aquarii",ra:22.643,dec:-15.3,lightYears:11.1},{name:"61 Cygni",ra:21.115,dec:38.75,lightYears:11.4},{name:"Procyon",ra:7.655,dec:5.22,lightYears:11.46},{name:"Struve 2398",ra:18.713,dec:59.63,lightYears:11.5},{name:"Groombridge 34",ra:.306,dec:44.02,lightYears:11.6},{name:"Epsilon Indi",ra:22.056,dec:-56.78,lightYears:11.87},{name:"Tau Ceti",ra:1.734,dec:-15.94,lightYears:11.91}];function Oe(e,t){const n=t.radius/t.reach;return e.map(({name:a,ra:o,dec:s,lightYears:r})=>{const i=o/24*2*Math.PI,h=s/180*Math.PI,l=r*Math.cos(h)*Math.cos(i),c=r*Math.cos(h)*Math.sin(i),d=r*Math.sin(h),m=c*Math.cos(t.yaw)-l*Math.sin(t.yaw),p=l*Math.cos(t.yaw)+c*Math.sin(t.yaw),u=d*Math.cos(t.pitch)-p*Math.sin(t.pitch),g=p*Math.cos(t.pitch)+d*Math.sin(t.pitch);return{name:a,x:m*n,y:-u*n,depth:g}})}const X=299792458,Ro=9.81;function Lo(e,t,n){const a=t.acceleration*Ro,o=d=>({distance:X*X/a*(Math.cosh(a*d/X)-1),homeTime:X/a*Math.sinh(a*d/X),speed:Math.tanh(a*d/X)}),s=o(e.burnTime),r=e.homeTime-2*s.homeTime,i=r*e.topSpeed*X,h=2*s.distance+i,l=Math.max(0,Math.min(n,e.shipTime));if(l<=e.burnTime){const d=o(l);return{along:d.distance/h,homeTime:d.homeTime,speed:d.speed}}if(l<=e.burnTime+e.coastTime){const d=(l-e.burnTime)/e.coastTime;return{along:(s.distance+d*i)/h,homeTime:s.homeTime+d*r,speed:e.topSpeed}}const c=o(e.shipTime-l);return{along:1-c.distance/h,homeTime:e.homeTime-c.homeTime,speed:c.speed}}const De=12.5,rn=9,hn=1.5,Fo=new Set(["Alpha Centauri"]),H={ground:"#06080f",ring:"rgba(127,166,234,0.22)",stem:"rgba(127,166,234,0.18)",star:"#dfe7f5",dim:"#7d8aa3",sun:"#ffd98a",way:"#ff9d6e",ship:"#ffffff"};function No(e,t,n){const a=e.getContext("2d");if(!a)return()=>{};const o=a,s=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=new Set(yt.map(({name:k})=>k));let i={yaw:.6,pitch:.45,radius:1,reach:De},h=0,l=performance.now(),c=null,d=[];const m=()=>({x:e.clientWidth/2,y:e.clientHeight/2});function p(k){const w=e.clientWidth,S=e.clientHeight,M=window.devicePixelRatio||1;e.width!==Math.round(w*M)&&(e.width=Math.round(w*M),e.height=Math.round(S*M)),o.setTransform(M,0,0,M,0,0),o.fillStyle=H.ground,o.fillRect(0,0,w,S),!s&&!c&&(i={...i,yaw:i.yaw+.0015}),i={...i,radius:Math.min(w,S)*.47};const A=m(),$=T=>({x:A.x+T.x,y:A.y+T.y});o.font="11px ui-monospace, Menlo, monospace";for(const T of[5,10]){const R=Oe(Array.from({length:73},(P,F)=>({name:"",ra:F/72*24,dec:0,lightYears:T})),i);o.beginPath(),R.forEach((P,F)=>F?o.lineTo($(P).x,$(P).y):o.moveTo($(P).x,$(P).y)),o.strokeStyle=H.ring,o.stroke();const L=$(R[0]??{x:0,y:0});o.fillStyle=H.dim,o.fillText(`${T} ly`,L.x+4,L.y-3)}const{ship:E,chosen:j}=t(),D=yt.find(({name:T})=>T===j),I=je.find(({name:T})=>T===j),x=D?Vn(D.metres,E):null;d=Oe(je,i);const O=Oe(je.map(T=>({...T,lightYears:T.lightYears*Math.cos(T.dec/180*Math.PI),dec:0})),i),b=d.map((T,R)=>R).sort((T,R)=>(d[T]?.depth??0)-(d[R]?.depth??0));for(const T of b){const R=$(d[T]??{x:0,y:0}),L=$(O[T]??{x:0,y:0}),P=d[T]?.name??"",F=((d[T]?.depth??0)+De)/(2*De);o.strokeStyle=H.stem,o.beginPath(),o.moveTo(R.x,R.y),o.lineTo(L.x,L.y),o.stroke(),o.fillStyle=P===j?H.way:H.star,o.globalAlpha=.45+.55*F,o.beginPath(),o.arc(R.x,R.y,1.6+1.8*F,0,2*Math.PI),o.fill(),r.has(P)&&(o.strokeStyle=P===j?H.way:H.dim,o.beginPath(),o.arc(R.x,R.y,7,0,2*Math.PI),o.stroke()),o.fillStyle=P===j?H.way:H.dim,Fo.has(P)||o.fillText(P,R.x+10,R.y+4),o.globalAlpha=1}if(o.fillStyle=H.sun,o.beginPath(),o.arc(A.x,A.y,4,0,2*Math.PI),o.fill(),o.fillText("the Sun",A.x+8,A.y-6),x&&D){const T=D.towards?Oe([{name:"",...D.towards,lightYears:De*1.15}],i)[0]:null,R=I?d[je.indexOf(I)]:T,L=(k-l)/1e3%(rn+2*hn),P=s?.5:Math.min(1,Math.max(0,(L-hn)/rn)),F=Lo(x,E,P*x.shipTime);if(R){const K=$(R);o.strokeStyle=H.way,o.setLineDash(I?[]:[4,4]),o.beginPath(),o.moveTo(A.x,A.y),o.lineTo(K.x,K.y),o.stroke(),o.setLineDash([]);const ce={x:A.x+(K.x-A.x)*F.along,y:A.y+(K.y-A.y)*F.along};o.fillStyle=H.ship,o.beginPath(),o.arc(ce.x,ce.y,3,0,2*Math.PI),o.fill(),I||o.fillText(`to ${D.name}, ${D.said}: not to scale`,12,S-34)}else o.fillStyle=H.dim,o.fillText(`${D.name} is inside the dot: the planets are a thousandth of a light-year away`,12,S-34);o.fillStyle=H.star,o.font="13px ui-monospace, Menlo, monospace",o.fillText(`on board ${ie(P*x.shipTime)}`,12,22),o.fillText(`at home  ${ie(F.homeTime)}`,12,40),o.fillStyle=H.dim,o.fillText(`${(F.speed*100).toFixed(F.speed>.99?4:1)}% of c`,12,58),o.fillText("drag to turn",w-96,S-14)}h=s&&!c?0:requestAnimationFrame(p)}const u=k=>{const w=e.getBoundingClientRect();return{x:k.clientX-w.left,y:k.clientY-w.top}},g=k=>{c=u(k),e.setPointerCapture(k.pointerId),h||(h=requestAnimationFrame(p))},v=k=>{if(!c)return;const w=u(k);i={...i,yaw:i.yaw+(w.x-c.x)*.01,pitch:Math.max(-1.4,Math.min(1.4,i.pitch+(w.y-c.y)*.01))},c=w},y=k=>{const w=u(k),S=m(),M=d.find(A=>r.has(A.name)&&Math.hypot(S.x+A.x-w.x,S.y+A.y-w.y)<12);c=null,M&&(l=performance.now(),n(M.name))};return e.addEventListener("pointerdown",g),e.addEventListener("pointermove",v),e.addEventListener("pointerup",y),h=requestAnimationFrame(p),()=>{cancelAnimationFrame(h),e.removeEventListener("pointerdown",g),e.removeEventListener("pointermove",v),e.removeEventListener("pointerup",y)}}const Re=e=>e,Wo=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:2}),Bo=[{key:"acceleration",label:"Acceleration",min:.05,max:3,step:.05,toSlider:Re,fromSlider:Re,show:e=>`${e.toFixed(2)} g`},{key:"fuel",label:"Fuel",min:-1,max:13,step:.05,toSlider:e=>Math.log10(e/ve.dryMass),fromSlider:e=>ve.dryMass*10**e,show:e=>`${Wo.format(e/ve.dryMass)} × the ship`},{key:"exhaust",label:"Exhaust speed",min:.01,max:1,step:.01,toSlider:Re,fromSlider:Re,show:e=>`${Math.round(e*100)}% of c`}];function Ho(e){let t=ve,n="Proxima Centauri";const a=f("div"),o=()=>{a.innerHTML=Zn(t,n)},s=f("div",{class:"dials"},...Bo.map(i=>{const h=f("output",{},i.show(t[i.key])),l=f("input",{type:"range",min:i.min,max:i.max,step:i.step,value:i.toSlider(t[i.key]),oninput:()=>{t={...t,[i.key]:i.fromSlider(Number(l.value))},h.textContent=i.show(t[i.key]),o()}});return f("label",{},`${i.label}: `,h,l)}));a.addEventListener("click",i=>{const h=i.target?.closest("[data-destination]")?.getAttribute("data-destination");h&&(n=h,o())});const r=f("canvas",{class:"starmap","aria-label":"The stars within twelve light-years of the Sun, turning, with the ship flying the chosen trip"});return e.replaceChildren(r,s,a),o(),No(r,()=>({ship:t,chosen:n}),i=>{n=i,o()})}const Go=()=>Zn(ve,"Proxima Centauri"),_o={name:"rocket",apps:{rocket:Ho},stills:{rocket:Go}};class qo{listeners=new Set;send(t){for(const n of[...this.listeners])n(t)}on(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}}const bt=new qo,Jo=900,Uo=480,Le={x:1600,y:1e3};function Fe(e,t){return(e%t+t)%t}class Yo{x=0;y=0;written="";driving=!1;follow({byRadians:t,tiltedBy:n,seconds:a}){const o=document.documentElement;if(o.dataset.sky!=="stars")return;this.driving||this.takeOver(o);const s=Jo/(Math.PI*2),r=(a/Uo*Math.PI*2+t)*s;this.x=Fe(this.x+r,Le.x),this.y=Fe(this.y-n*s,Le.y);const i=`${(Math.round(this.x*2)/2).toFixed(1)}px ${(Math.round(this.y*2)/2).toFixed(1)}px`;if(i===this.written)return;this.written=i;const[h,l]=i.split(" ");o.style.setProperty("--sky-x",h??"0px"),o.style.setProperty("--sky-y",l??"0px")}release(){const t=document.documentElement;t.classList.remove("sky-driven"),t.style.removeProperty("--sky-x"),t.style.removeProperty("--sky-y"),this.x=0,this.y=0,this.written="",this.driving=!1}takeOver(t){const n=getComputedStyle(document.body,"::before").transform;if(n&&n!=="none")try{const a=new DOMMatrixReadOnly(n);this.x=Fe(a.m41,Le.x),this.y=Fe(a.m42,Le.y)}catch{}t.classList.add("sky-driven"),this.driving=!0}}function zo(e){return bt.on(t=>e.follow(t))}const cn=new Yo,Ko={name:"sky",install:()=>zo(cn),arrive:()=>cn.release()},st=20;function Vo(e){const{baseTime:t,shortcutFactor:n,interestRate:a,timeHorizon:o}=e,s=[];let r=null;const i=t;let h=t*(1-n),l=0,c=0,d=0,m=0,p=0,u=0;for(let g=0;g<o*st;){for(;p<=g;)l+=1,d+=1,p+=i;for(;u<=g;)c+=1,m+=1,u+=h,h*=1+a;if(g+=1,g%st===0){const v=g/st;s.push({month:v,cleanCumulative:l,debtCumulative:c,cleanMonthly:d,debtMonthly:m,debtFeatureCost:h}),d=0,m=0,r===null&&l>c&&(r=v)}}return{months:s,breakEvenMonth:r}}const Xo=[{key:"baseTime",label:"Base time",min:1,max:30,step:1,show:e=>`${e} days`},{key:"shortcutFactor",label:"Shortcuts",min:0,max:.9,step:.05,show:e=>`${Math.round(e*100)}%`},{key:"interestRate",label:"Interest",min:0,max:1,step:.01,show:e=>`${Math.round(e*100)}%`},{key:"timeHorizon",label:"Timeline",min:6,max:60,step:1,show:e=>`${e} months`}];function Qo(e){const t={baseTime:20,shortcutFactor:.25,interestRate:.1,timeHorizon:24},n=f("div",{class:"figures"}),a=f("div",{class:"chart"}),o=f("div",{class:"chart"}),s=f("p"),r=f("div",{class:"dials"},...Xo.map(h=>{const l=f("output",{},h.show(t[h.key])),c=f("input",{type:"range",min:h.min,max:h.max,step:h.step,value:t[h.key],oninput:()=>{t[h.key]=Number(c.value),l.textContent=h.show(t[h.key]),i()}});return f("label",{},`${h.label}: `,l,c)}));function i(){const{months:h,breakEvenMonth:l}=Vo(t),c=h[h.length-1],d=c?.cleanCumulative??0,m=c?.debtCumulative??0,p=d>0?(d-m)/d*100:0,u=Math.abs(p)<.1?"Even":p>0?"Loss":"Gain",g=Math.abs(p)<.1?"≈0%":`${Math.abs(p).toFixed(1)}%`;n.replaceChildren(f("div",{class:"clean"},f("strong",{},String(d)),"clean features"),f("div",{class:"debt"},f("strong",{},String(m)),"debt features"),f("div",{},f("strong",{},l?`month ${l}`:"never"),"break-even"),f("div",{},f("strong",{},g),`${u.toLowerCase()} on the shortcut road`)),a.innerHTML=Za([{name:"Clean",className:"clean",values:h.map(v=>v.cleanCumulative)},{name:"Debt-driven",className:"debt",values:h.map(v=>v.debtCumulative)}],{x:"Months",y:"Features"}),a.prepend(f("h4",{},"Cumulative features")),o.innerHTML=Jn([{name:"Clean",className:"clean",values:h.slice(1).map(v=>v.cleanMonthly)},{name:"Debt-driven",className:"debt",values:h.slice(1).map(v=>v.debtMonthly)}],{x:"Months",y:"Features a month"}),o.prepend(f("h4",{},"Monthly delivery rate")),s.textContent=t.interestRate===0?"With no interest there is no compound slowdown, and the shortcut simply wins. That is the one case that does not happen to real code.":l?`${Math.round(t.shortcutFactor*100)}% saved at first, ${Math.round(t.interestRate*100)}% interest on every feature: clean development overtakes at month ${l}, and by month ${t.timeHorizon} the shortcut road has delivered ${g} less.`:`${Math.round(t.shortcutFactor*100)}% saved at first, ${Math.round(t.interestRate*100)}% interest on every feature: in ${t.timeHorizon} months the clean road has not yet caught up. Give it longer, or raise the interest.`}e.append(r,n,f("div",{class:"charts"},a,o),s),i()}const Zo={name:"technical-debt",apps:{"technical-debt":Qo}},es="theme";function ea(){const e=document.documentElement,t=e.dataset.pageTheme;let n=null;try{n=localStorage.getItem(es)}catch{n=null}const a=t??(n==="light"||n==="dark"?n:null);a?e.dataset.theme=a:delete e.dataset.theme}const vt="theme";function ts(){return window.matchMedia("(prefers-color-scheme: dark)").matches}function ns(){let e=null;try{e=localStorage.getItem(vt)}catch{e=document.documentElement.dataset.theme??null}return e==="light"||e==="dark"?e:ts()?"dark":"light"}class as{apply(t){const n=t==="toggle"?ns()==="dark"?"light":"dark":t;try{n==="system"?localStorage.removeItem(vt):localStorage.setItem(vt,n)}catch{}return ea(),n}}function os(e){const t=document.querySelector(".theme-toggle");return t?(t.classList.add("ready"),t.removeAttribute("aria-hidden"),t.removeAttribute("tabindex"),t.addEventListener("click",e),()=>t.removeEventListener("click",e)):()=>{}}const kt=["light","dark","system"];function ss(e){return kt.includes(e)}const rs={light:"☀︎",dark:"☾︎",system:"◐︎"};function ln(e){const t=n=>`${rs[n]} ${n}`;return{text:`theme   ${kt.map(n=>n===e?`[${t(n)}]`:t(n)).join("   ")}`,html:`<pre class="choices">theme   ${kt.map(n=>n===e?`<strong aria-current="true">${t(n)}</strong>`:`<a href="#" data-run="theme ${n}" title="theme ${n}">${t(n)}</a>`).join("   ")}</pre>`}}function is(e){return{name:"theme",usage:"theme [light|dark|system|auto]",description:"switch the colours, or toggle them",run({site:t,cwd:n},[a]){const o=t.at(n)?.fields.theme;if(o)return{text:`theme: this page keeps its own, ${o}. It works everywhere else.`,error:!0};if(a===void 0)return ln(e.apply("toggle"));const s=a==="auto"?"system":a;return ss(s)?ln(e.apply(s)):{text:`theme: ${a}: choose light, dark or system`,error:!0}}}}const hs={name:"theme",commands:[is(new as)],install:e=>os(()=>e.run("theme")),arrive:()=>ea()},cs={small:"Intel Atom 330, 2 cores, 8 W · NVIDIA 9400M, 16 cores, 10 W",large:"Intel i7 950, 4 cores, 130 W · NVIDIA GT 430, 96 cores, 49 W"},dn=[{machine:"small",algorithm:"pairs",vertices:8,graphs:150,serial:42.43,openmp:14.34,cuda:2.572},{machine:"small",algorithm:"pairs",vertices:16,graphs:150,serial:738.92,openmp:247.95,cuda:33.06},{machine:"small",algorithm:"pairs",vertices:24,graphs:150,serial:4387.13,openmp:1208.97,cuda:109.093},{machine:"large",algorithm:"pairs",vertices:8,graphs:150,serial:7.483,openmp:1.511,cuda:.653},{machine:"large",algorithm:"pairs",vertices:16,graphs:150,serial:135.505,openmp:25.061,cuda:5.24},{machine:"large",algorithm:"pairs",vertices:24,graphs:150,serial:515.757,openmp:126.228,cuda:18.99},{machine:"small",algorithm:"common-labelling",vertices:8,graphs:50,serial:843.21,openmp:214.51,cuda:33.404},{machine:"small",algorithm:"common-labelling",vertices:16,graphs:50,serial:17061.4,openmp:4284.01,cuda:550.153},{machine:"small",algorithm:"common-labelling",vertices:24,graphs:50,serial:71670.13,openmp:20274.32,cuda:2332.076}],ls={pairs:e=>`Matching every pair of ${e} graphs`,"common-labelling":e=>`Finding one labelling common to ${e} graphs`};function rt(e){if(e<10)return`${e.toFixed(1)} s`;if(e<60)return`${Math.round(e)} s`;const t=Math.floor(e/60);return t<60?t<10?`${t} min ${Math.round(e-t*60)} s`:`${Math.round(e/60)} min`:`${Math.floor(t/60)} h ${t%60} min`}const ds=e=>`×${e>=10?Math.round(e):e.toFixed(1)}`;function un(e){const t=Math.max(...e.map(o=>o.serial/o.cuda)),n=(o,s)=>`<span class="bar ${s}" style="--p:${(o/t).toFixed(3)}"></span><span class="factor">${ds(o)}</span>`;return`<figure class="runs"><table class="runs"><thead><tr><th>each graph has</th><th>one thread</th><th>OpenMP, every core</th><th>CUDA, the graphics card</th></tr></thead>${[...new Set(e.map(o=>`${o.algorithm}/${o.machine}`))].map(o=>{const s=e.filter(l=>`${l.algorithm}/${l.machine}`===o),{algorithm:r,machine:i}=s[0],h=s.map(l=>`<tr><th scope="row">${l.vertices} vertices</th><td>${rt(l.serial)}</td><td>${rt(l.openmp)}<div class="speedup">${n(l.serial/l.openmp,"openmp")}</div></td><td>${rt(l.cuda)}<div class="speedup">${n(l.serial/l.cuda,"cuda")}</div></td></tr>`).join("");return`<tbody><tr class="group"><th colspan="4">${ls[r](s[0]?.graphs??0)}<span>${cs[i]}</span></th></tr>${h}</tbody>`}).join("")}</table><figcaption>Measured in 2011, on graphs of the GREC dataset. Each bar is how many times faster than one thread of the same machine, and all the bars are on one scale.</figcaption></figure>`}const us={name:"thesis-results",stills:{"graph-matching-runs":()=>un(dn)},apps:{"graph-matching-runs":e=>{e.firstChild||(e.innerHTML=un(dn))}}},xt={variable:"tn",atLeast:!0,threshold:20,months:[0,1,2,3,4,5,6,7,8,9,10,11]};function ms(e,t){const n=e.map(({value:u})=>u),a=Math.floor(Math.min(...n,...(t.spans??[]).map(({value:u})=>u))),o=Math.ceil(Math.max(...n,a+1)),s=Bn(e.map(({year:u})=>u),a,o),{x:r,y:i,slot:h}=s,l=u=>r(u)+h/2,c=[];for(const u of e){const g=c[c.length-1];g&&g[g.length-1]?.year===u.year-1?g.push(u):c.push([u])}const d=c.map(u=>`<polyline class="line" points="${u.map(({year:g,value:v})=>`${N(l(g))},${N(i(v))}`).join(" ")}"/>`).join(""),m=e.map(({year:u,value:g,title:v,partial:y})=>`<circle class="dot${y?" partial":""}" cx="${N(l(u))}" cy="${N(i(g))}" r="3.5"><title>${v}</title></circle>`).join(""),p=s.levels(t.spans??[]);return s.wrap(t.label,`${d}${m}${p}`)}function ps(e,{threshold:t,atLeast:n},a){if(!e)return 0;const[o=0,...s]=e;return s.reduce((r,i,h)=>o+h*a>=t-1e-9===n?r+i:r,0)}const he={tn:{code:1002,unit:"°C",name:"daily minimum",summary:"mean",bin:.5,range:[-30,35]},tx:{code:1001,unit:"°C",name:"daily maximum",summary:"mean",bin:.5,range:[-25,50]},pp:{code:1300,unit:"mm",name:"daily rain",summary:"sum",bin:.5,range:[0,250]},pi:{code:1303,unit:"mm/h",name:"most rain in one hour",summary:"max",bin:.5,range:[0,100]}},fs=.95,gs=(e,t)=>new Date(Date.UTC(e,t+1,0)).getUTCDate(),V=e=>e.reduce((t,n)=>t+n,0);function ws(e,t){return e.length===0?null:t==="sum"?V(e.map(({figure:n})=>n)):t==="max"?Math.max(...e.map(({figure:n})=>n)):V(e.map(({figure:n,weight:a})=>n*a))/V(e.map(({weight:n})=>n))}function ys(e,t){const n=he[t.variable];return Object.entries(e.years).flatMap(([a,o])=>{const s=o[t.variable];if(!s)return[];const r=Number(a),i=s.months.map(u=>({days:ps(u,t,n.bin),measured:V(u?.slice(1)??[])})),h=u=>t.months.includes(u),l=V(i.filter((u,g)=>h(g)).map(u=>u.measured)),c=V(t.months.map(u=>gs(r,u))),d=V(i.filter((u,g)=>h(g)).map(u=>u.days)),m=s.summaries.flatMap((u,g)=>h(g)&&u!==null?[{figure:u,weight:i[g]?.measured??0}]:[]),p=ws(m,n.summary);return[{year:r,days:d,elsewhere:V(i.map(u=>u.days))-d,measured:l,expected:c,whole:l/c>=fs,summary:p,months:i}]}).sort((a,o)=>a.year-o.year)}const mn=["January","February","March","April","May","June","July","August","September","October","November","December"];function pn(e){const{name:t,unit:n}=he[e.variable],a=e.variable==="pi"?"":"a ",o=e.atLeast?`of ${e.threshold} ${n} or more`:`below ${e.threshold} ${n}`,s=mn[e.months[0]??0],r=mn[e.months[e.months.length-1]??11],i=e.months.length===12?"whole year":`${s} to ${r}`;return`days with ${a}${t} ${o}, ${i}`}const ta=["January","February","March","April","May","June","July","August","September","October","November","December"],bs=.55;function vs(e,t,{days:n,measured:a}){const o=`${ta[t]} ${e}`;if(a===0)return`<td class="none" title="${o}: not measured"></td>`;const s=Math.round(n/a*1e3)/1e3;return`<td${s>=bs?' class="deep"':""} style="--v:${s}" title="${o}: ${n} of ${a} days">${n||""}</td>`}function ks(e,t){const n=`<tr><th></th>${ta.map(o=>`<th scope="col">${o.slice(0,3)}</th>`).join("")}</tr>`,a=[...e].reverse().map(({year:o,months:s})=>`<tr><th scope="row">${o}</th>${s.map((r,i)=>vs(o,i,r)).join("")}</tr>`);return`<table class="heat calendar${t?" warm":""}"><thead>${n}</thead><tbody>${a.join("")}</tbody></table>`}const fn=e=>e.reduce((t,n)=>t+n,0)/e.length;function gn(e){const t=e.flatMap(({summary:n})=>n===null?[]:[n]);return{from:e[0]?.year??0,to:e[e.length-1]?.year??0,years:e.length,days:fn(e.map(({days:n})=>n)),summary:t.length?fn(t):null}}function xs(e){const t=e.filter(a=>a.whole);if(t.length<4)return null;const n=Math.floor(t.length/2);return[gn(t.slice(0,n)),gn(t.slice(n))]}const $s=["January","February","March","April","May","June","July","August","September","October","November","December"],Ts={mean:"The mean",sum:"The total",max:"The highest"},be=e=>String(Math.round(e*10)/10),Ss=e=>`${e>0?"+":e<0?"−":""}${be(Math.abs(e))}`,Ms=e=>`${Number(e.slice(8,10))} ${$s[Number(e.slice(5,7))-1]} ${e.slice(0,4)}`;function As(e,t){const{unit:n,name:a}=he[t.variable],o=Object.values(e.years).flatMap(i=>i[t.variable]?[i[t.variable].record]:[]),[s,r]=t.atLeast?o.map(([i,h])=>[i,h]).reduce((i,h)=>h[0]>i[0]?h:i):o.map(([,,i,h])=>[i,h]).reduce((i,h)=>h[0]<i[0]?h:i);return`<p class="record">The ${t.atLeast?"highest":"lowest"} ${a} on record here: ${s} ${n} on ${Ms(r)}, whatever months are chosen.</p>`}function na(e,t){const n=he[t.variable],a=`<figcaption><strong>${e.name}</strong> · ${e.altitude} m, ${e.setting} · ${pn(t)}</figcaption>`,o=ys(e,t);if(o.length===0)return`<figure class="weather">${a}<p>This station has no ${n.name} on record.</p></figure>`;const s=xs(o),r=({from:u,to:g})=>`${u}–${g}`,i=s?'<div class="figures">'+s.map(u=>`<div><strong>${be(u.days)}</strong>days a year, ${r(u)}</div>`).join("")+`<div><strong>${Ss(s[1].days-s[0].days)}</strong>days a year, from one half to the other</div></div>`:"",h=o.map(({year:u,days:g,elsewhere:v,measured:y,expected:k,whole:w})=>{const S=v>0?`, and ${v} more outside the months chosen`:"",M=w?"":`, with only ${y} of ${k} days measured`;return{year:u,value:g,partial:!w,title:`${u}: ${g} days${M}${S}`}}),l=(s??[]).map(u=>({from:u.from,to:u.to,value:u.days,label:`${be(u.days)} a year`})),c=o.flatMap(({year:u,summary:g,whole:v})=>g===null||!v?[]:[{year:u,value:g,title:`${u}: ${be(g)} ${n.unit}`}]),d=(s??[]).flatMap(u=>u.summary===null?[]:[{from:u.from,to:u.to,value:u.summary,label:`${be(u.summary)} ${n.unit}`}]),m=`${Ts[n.summary]} ${n.name} of each year, ${n.unit}`,p=(n.summary==="mean"?ms:ft)(c,{label:m,spans:d});return`<figure class="weather">${a}${i}<h4>Days a year</h4>${ft(h,{label:`Days a year: ${pn(t)}`,spans:l})}<h4>When in the year they fell</h4>${ks(o,t.atLeast&&n.unit==="°C")}<h4>${m}, in the months chosen</h4>${p}`+As(e,t)+"</figure>"}const wn=[{id:"tropical-nights",name:"tropical nights",variable:"tn",atLeast:!0,threshold:20},{id:"torrid-nights",name:"torrid nights",variable:"tn",atLeast:!0,threshold:25},{id:"hot-days",name:"hot days",variable:"tx",atLeast:!0,threshold:30},{id:"torrid-days",name:"torrid days",variable:"tx",atLeast:!0,threshold:35},{id:"frost-days",name:"frost days",variable:"tn",atLeast:!1,threshold:0},{id:"rainy-days",name:"rainy days",variable:"pp",atLeast:!0,threshold:1},{id:"heavy-rain",name:"days of heavy rain",variable:"pp",atLeast:!0,threshold:20},{id:"downpours",name:"days with a downpour",variable:"pi",atLeast:!0,threshold:10}],se=[{code:"WU",name:"Badalona - Museu",municipality:"Badalona",altitude:42,setting:"urban, by the sea"},{code:"X4",name:"Barcelona - el Raval",municipality:"Barcelona",altitude:33,setting:"dense city, on a roof"},{code:"X8",name:"Barcelona - Zona Universitària",municipality:"Barcelona",altitude:82,setting:"city edge"},{code:"D5",name:"Barcelona - Observatori Fabra",municipality:"Barcelona",altitude:410,setting:"wooded hill above the city"},{code:"UP",name:"Cabrils",municipality:"Cabrils",altitude:81,setting:"coastal slope, half rural"},{code:"XF",name:"Sabadell - Parc Agrari",municipality:"Sabadell",altitude:259,setting:"farmland beside a city"},{code:"XJ",name:"Girona",municipality:"Girona",altitude:72,setting:"market gardens by the city"},{code:"XE",name:"Tarragona - Complex Educatiu",municipality:"Tarragona",altitude:6,setting:"coast"},{code:"VK",name:"Raimat",municipality:"Lleida",altitude:286,setting:"inland plain, vineyards"}],yn=[["whole year",[0,1,2,3,4,5,6,7,8,9,10,11]],["June to August",[5,6,7]],["May to October",[4,5,6,7,8,9]],["December to February",[0,1,11]]],Is={tn:[-10,30],tx:[0,45],pp:[.5,100],pi:[.5,60]};function Cs(e){const t=new Map,n=At(e,"/data/weather/index.json"),a=f("div");a.append(...e.querySelectorAll("figure"));let o=null,s=xt,r=!1;const i=(y,k)=>f("option",{value:y},k),h=f("select",{onchange:()=>{g(h.value)}},...se.map(({code:y,name:k})=>i(y,k))),l=f("select",{onchange:()=>{const y=wn.find(({id:k})=>k===l.value);y&&u({variable:y.variable,atLeast:y.atLeast,threshold:y.threshold})}},...wn.map(({id:y,name:k})=>i(y,k))),c=f("select",{onchange:()=>u({months:yn[Number(c.value)]?.[1]??xt.months})},...yn.map(([y],k)=>i(k,y))),d=f("output"),m=f("input",{type:"range",step:.5,oninput:()=>u({threshold:Number(m.value)})});function p(){const[y,k]=Is[s.variable];m.min=String(y),m.max=String(k),m.value=String(s.threshold),d.textContent=`${s.atLeast?"":"below "}${s.threshold} ${he[s.variable].unit}${s.atLeast?" or more":""}`,o&&(a.innerHTML=na(o,s))}function u(y){s={...s,...y},p()}async function g(y){const k=t.get(y)??fetch(`/data/weather/${y}.json`).then(w=>w.json());t.set(y,k);try{const w=await k;if(r||h.value!==y)return;o=w,p()}catch{t.delete(y),a.replaceChildren(f("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}const v=f("div",{class:"dials"},f("label",{},"Station",h),f("label",{},"Counting",l),f("label",{},"Threshold: ",d,m),f("label",{},"Months",c));return e.replaceChildren(v,a,n),g(h.value),()=>{r=!0}}function Es(e,t,[n,a]){if(e.length===0)return null;const o=Math.round((a-n)/t),s=new Map;for(const l of e){const c=Math.min(o-1,Math.max(0,Math.floor((l-n)/t+1e-9)));s.set(c,(s.get(c)??0)+1)}const r=Math.min(...s.keys()),i=Math.max(...s.keys());return[Math.round((n+r*t)*1e3)/1e3,...Array.from({length:i-r+1},(l,c)=>s.get(r+c)??0)]}const bn="7bvh-jvq2",aa=5e4,vn=Object.entries(he),Ps="No representatiu",js=["Representatiu",""],Os=(e,t)=>Math.round(e*10**t)/10**t;function Ds(e,t){if(e.length===0)return null;if(t==="max")return Math.max(...e);const n=e.reduce((a,o)=>a+o,0);return Os(t==="sum"?n:n/e.length,2)}function Rs(e,t){const n=Array.from({length:12},(s,r)=>e.filter(({date:i})=>Number(i.slice(5,7))===r+1).map(({value:i})=>i)),a=e.reduce((s,r)=>r.value>s.value?r:s),o=e.reduce((s,r)=>r.value<s.value?r:s);return{months:n.map(s=>Es(s,t.bin,t.range)),summaries:n.map(s=>Ds(s,t.summary)),record:[a.value,a.date,o.value,o.date]}}function Ls(e){if(!Array.isArray(e))throw new Error("the portal did not answer with rows");if(e.length>=aa)throw new Error("the answer was cut short at the limit");const t=e;if(!t.some(o=>o.data_lectura?.slice(5,7)==="12"))throw new Error("the year does not reach December yet");const n=new Map,a=new Set;for(const o of t){const s=o.estat??"";if(s===Ps)continue;if(!js.includes(s))throw new Error(`the network marks days as "${s}", which nobody has decided how to read`);const r=o.data_lectura?.slice(0,10)??"",i=`${o.codi_estacio}/${o.codi_variable}`;if(a.has(`${i}/${r}`))throw new Error(`${i} has ${r} twice`);a.add(`${i}/${r}`);const h=Number(o.valor);Number.isFinite(h)&&n.set(i,[...n.get(i)??[],{date:r,value:h}])}return n}const Fs={name:"weather",directory:"public/data/weather",firstYear:1988,files:se.map(e=>`${e.code}.json`),about:{measures:"daily minimum and maximum temperature, daily rain, most rain in one hour",network:"Xarxa d'Estacions Meteorològiques Automàtiques (XEMA)",attribution:"Servei Meteorològic de Catalunya (XEMA). Dades obertes de la Generalitat de Catalunya.",dataset:`https://analisi.transparenciacatalunya.cat/d/${bn}`,stations:se},requestsFor(e){const t=se.map(a=>`'${a.code}'`).join(","),n=vn.map(([,a])=>a.code).join(",");return[Gn(bn,{select:"codi_estacio,codi_variable,data_lectura,valor,estat",where:`codi_estacio in (${t}) and codi_variable in (${n}) and data_lectura between '${e}-01-01T00:00:00' and '${e}-12-31T23:59:59'`,limit:aa})]},withYear(e,t,n){const a=Ls(n[0]);return Object.fromEntries(se.map(o=>{const s=`${o.code}.json`,r=vn.flatMap(([l,c])=>{const d=a.get(`${o.code}/${c.code}`);return d?[[l,Rs(d,c)]]:[]}),i=Object.fromEntries(r),h={...e[s]?.years,...r.length?{[t]:i}:{}};return[s,{...o,years:h}]}))}},Ns=e=>{const t=JSON.parse(e(`/data/weather/${se[0]?.code}.json`)),n=JSON.parse(e("/data/weather/index.json"));return na(t,xt)+_e(n)},Ws={name:"weather",apps:{weather:Cs},stills:{weather:Ns},sources:[Fs]},Et="header-world";function oa(){try{const e=localStorage.getItem(Et);if(!e)return null;const t=JSON.parse(e);return[t.seed,t.levels,t.roughness,t.share].every(a=>typeof a=="number"&&Number.isFinite(a))?t:null}catch{return null}}function Bs(e){try{localStorage.setItem(Et,JSON.stringify(e))}catch{}}function Hs(){try{localStorage.removeItem(Et)}catch{}}const J=(1+Math.sqrt(5))/2,Gs=[[-1,J,0],[1,J,0],[-1,-J,0],[1,-J,0],[0,-1,J],[0,1,J],[0,-1,-J],[0,1,-J],[J,0,-1],[J,0,1],[-J,0,-1],[-J,0,1]],_s=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];function qs(){const e=Gs.map(([t,n,a])=>{const o=Math.hypot(t,n,a);return{direction:[t/o,n/o,a/o],radius:1,surface:0}});return sa(e,_s.map(t=>[...t]))}const Js=(e,t)=>(e+t)/2;function Us(e,t,n=Js){const a=Array.from({length:e.vertexCount},(i,h)=>({direction:[e.directions[h*3]??0,e.directions[h*3+1]??0,e.directions[h*3+2]??0],radius:e.radii[h]??1,surface:e.surface[h]??0})),o=new Map,s=(i,h)=>{const l=i<h?`${i}:${h}`:`${h}:${i}`,c=o.get(l);if(c!==void 0)return c;const d=a[i],m=a[h],[p,u,g]=d.direction,[v,y,k]=m.direction,w=Math.hypot(p*d.radius-v*m.radius,u*d.radius-y*m.radius,g*d.radius-k*m.radius),[S,M,A]=[(p+v)/2,(u+y)/2,(g+k)/2],$=Math.hypot(S,M,A)||1,E=n(d.surface,m.surface);a.push({direction:[S/$,M/$,A/$],radius:(d.radius+m.radius)/2+t(w),surface:E});const j=a.length-1;return o.set(l,j),j},r=[];for(let i=0;i<e.faceCount;i+=1){const h=e.faces[i*3],l=e.faces[i*3+1],c=e.faces[i*3+2],d=s(h,l),m=s(l,c),p=s(c,h);r.push([h,d,p],[l,m,d],[c,p,m],[d,m,p])}return sa(a,r)}function sa(e,t){const n=new Float32Array(e.length*3),a=new Float32Array(e.length),o=new Float32Array(e.length);e.forEach((r,i)=>{n[i*3]=r.direction[0],n[i*3+1]=r.direction[1],n[i*3+2]=r.direction[2],a[i]=r.radius,o[i]=r.surface});const s=new Uint32Array(t.length*3);return t.forEach(([r,i,h],l)=>{s[l*3]=r,s[l*3+1]=i,s[l*3+2]=h}),{directions:n,radii:a,surface:o,faces:s,faceCount:t.length,vertexCount:e.length}}function Ys(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let n=Math.imul(t^t>>>15,1|t);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function zs(e){const t=qs();return{seed:e,mesh:t,temperature:new Float32Array(t.vertexCount),faceColour:new Uint8ClampedArray(t.faceCount*3),seaRadius:0}}function Ks(e,t){return{...e,mesh:t,temperature:new Float32Array(t.vertexCount),faceColour:new Uint8ClampedArray(t.faceCount*3)}}function Vs(e,t){return Math.abs(e.mesh.directions[t*3+1]??0)}function ra(e,t,n){const a=e.mesh.faces[n*3]??0,o=e.mesh.faces[n*3+1]??0,s=e.mesh.faces[n*3+2]??0;return((t[a]??0)+(t[o]??0)+(t[s]??0))/3}function Xs(e,t){return ra(e,e.mesh.radii,t)}const ia=(e=4,t=.28,n=.2)=>a=>{const o=Ys(a.seed);let s=a.mesh;const r=Float32Array.from(s.surface,()=>o());s={...s,surface:r};for(let i=0;i<e;i+=1)s=Us(s,h=>h*t*(o()-.5),(h,l)=>{const c=.5+(o()-.5)*(h-l)*n;return Math.min(1,Math.max(0,h*(1-c)+l*c))});return Ks(a,s)},ha=({equator:e=1,pole:t=.05,peak:n=0}={})=>a=>{const o=new Float32Array(a.mesh.vertexCount),s=a.mesh.radii,r=s.reduce((l,c)=>Math.min(l,c),1/0),h=s.reduce((l,c)=>Math.max(l,c),-1/0)-r||1;for(let l=0;l<a.mesh.vertexCount;l+=1){const c=((s[l]??1)-r)/h,d=Vs(a,l)**2.2;o[l]=e+(t-e)*d+(n-e)*c}return{...a,temperature:o}},ca=(e=.55)=>t=>{const n=Float32Array.from(t.mesh.radii).sort(),a=Math.min(n.length-1,Math.floor(n.length*e)),o=n[a]??1,s=Float32Array.from(t.mesh.radii,r=>Math.max(r,o));return{...t,mesh:{...t.mesh,radii:s},seaRadius:o}},Qs=[24,92,168],Zs=[62,176,206],er=[214,196,138],kn=[190,158,84],it=[70,138,66],tr=[74,104,76],nr=[136,128,116],xn=[238,243,247];function Q(e,t,n){const a=Math.min(1,Math.max(0,n));return[e[0]+(t[0]-e[0])*a,e[1]+(t[1]-e[1])*a,e[2]+(t[2]-e[2])*a]}function ar(e){return e>.78?kn:e>.62?Q(it,kn,(e-.62)/.16):e>.3?it:Q(tr,it,(e-.12)*5.5)}const la=e=>{const t=new Uint8ClampedArray(e.mesh.faceCount*3),n=e.mesh.radii.reduce((o,s)=>Math.max(o,s),-1/0),a=Math.max(1e-6,n-e.seaRadius);for(let o=0;o<e.mesh.faceCount;o+=1){const s=(Xs(e,o)-e.seaRadius)/a,r=ra(e,e.temperature,o);let i;s<=.002?(i=Q(Zs,Qs,.55),r<.16&&(i=Q(i,xn,(.16-r)*6))):(i=Q(er,ar(r),Math.min(1,s*9)),i=Q(i,nr,Math.max(0,s-.55)*2.2),r<.26&&(i=Q(i,xn,(.26-r)*4))),t[o*3]=i[0],t[o*3+1]=i[1],t[o*3+2]=i[2]}return{...e,faceColour:t}},or=[ia(),ca(),ha(),la];function sr(e,t=or){return t.reduce((n,a)=>a(n),zs(e))}function da(e){return sr(e.seed,[ia(e.levels,e.roughness),ca(e.share),ha(),la])}const $n=.3,rr=[-.5,.45,.74],ir=1.02;class Pt{size;pixels;depth;view=new Float32Array(0);screen=new Float32Array(0);constructor(t,n=new Uint8ClampedArray(t*t*4)){if(n.length!==t*t*4)throw new Error(`SphereRaster: ${t}×${t} needs ${t*t*4} bytes, not ${n.length}`);this.size=t,this.pixels=n,this.depth=new Float32Array(t*t)}paint(t,n){const{size:a,pixels:o,depth:s}=this;o.fill(0),s.fill(-1/0);const[r,i,h]=hr(n.light??rr),l=n.tilt??-.38,c=Math.cos(l),d=Math.sin(l),m=Math.cos(n.rotation),p=Math.sin(n.rotation),{directions:u,radii:g,faces:v,faceCount:y,vertexCount:k}=t.mesh;let w=1;for(let $=0;$<k;$+=1){const E=g[$]??1;E>w&&(w=E)}const S=a/(2*w*ir);this.view.length<k*3&&(this.view=new Float32Array(k*3),this.screen=new Float32Array(k*3));const M=this.view,A=this.screen;for(let $=0;$<k;$+=1){const E=g[$]??1,j=(u[$*3]??0)*E,D=(u[$*3+1]??0)*E,I=(u[$*3+2]??0)*E,x=j*m-I*p,O=j*p+I*m,b=D*c+O*d,T=-D*d+O*c;M[$*3]=x,M[$*3+1]=b,M[$*3+2]=T,A[$*3]=a/2+x*S,A[$*3+1]=a/2-b*S,A[$*3+2]=T}for(let $=0;$<y;$+=1){const E=v[$*3]??0,j=v[$*3+1]??0,D=v[$*3+2]??0,I=A[E*3],x=A[E*3+1],O=A[E*3+2],b=A[j*3],T=A[j*3+1],R=A[j*3+2],L=A[D*3],P=A[D*3+1],F=A[D*3+2],K=(b-I)*(P-x)-(T-x)*(L-I);if(K>=0)continue;const ce=M[E*3],Dt=M[E*3+1],Rt=M[E*3+2],Lt=M[j*3]-ce,Ft=M[j*3+1]-Dt,Nt=M[j*3+2]-Rt,Wt=M[D*3]-ce,Bt=M[D*3+1]-Dt,Ht=M[D*3+2]-Rt,Gt=Ft*Ht-Nt*Bt,_t=Nt*Wt-Lt*Ht,qt=Lt*Bt-Ft*Wt,Je=Math.hypot(Gt,_t,qt)||1,ka=Gt/Je*r+_t/Je*i+qt/Je*h,Ue=$n+(1-$n)*Math.max(0,ka),xa=(t.faceColour[$*3]??0)*Ue,$a=(t.faceColour[$*3+1]??0)*Ue,Ta=(t.faceColour[$*3+2]??0)*Ue,Sa=Math.max(0,Math.floor(Math.min(I,b,L))),Ma=Math.min(a-1,Math.ceil(Math.max(I,b,L))),Aa=Math.max(0,Math.floor(Math.min(x,T,P))),Ia=Math.min(a-1,Math.ceil(Math.max(x,T,P)));for(let xe=Aa;xe<=Ia;xe+=1)for(let $e=Sa;$e<=Ma;$e+=1){const Ye=$e+.5,ze=xe+.5,Ca=(b-I)*(ze-x)-(T-x)*(Ye-I),Jt=(L-b)*(ze-T)-(P-T)*(Ye-b),Ut=(I-L)*(ze-P)-(x-P)*(Ye-L);if(Ca>0||Jt>0||Ut>0)continue;const Yt=Jt/K,zt=Ut/K,Kt=O*Yt+R*zt+F*(1-Yt-zt),te=xe*a+$e;Kt<=s[te]||(s[te]=Kt,o[te*4]=xa,o[te*4+1]=$a,o[te*4+2]=Ta,o[te*4+3]=255)}}return o}}function hr([e,t,n]){const a=Math.hypot(e,t,n)||1;return[e/a,t/a,n/a]}const cr=.2,lr=.36,dr=[{upTo:20,dark:4,bright:12},{upTo:70,dark:6,bright:14},{upTo:160,dark:2,bright:10},{upTo:198,dark:3,bright:11},{upTo:275,dark:1,bright:9},{upTo:330,dark:5,bright:13},{upTo:360,dark:4,bright:12}];function ur(e,t,n){const a=Math.max(e,t,n),o=Math.min(e,t,n),s=(a+o)/2/255;if((a===0?0:(a-o)/a)<cr)return s<.08?0:s<.5?8:s<.8?7:15;const i=a-o;let h;a===e?h=(t-n)/i*60:a===t?h=(2+(n-e)/i)*60:h=(4+(e-t)/i)*60,h<0&&(h+=360);const l=dr.find(({upTo:c})=>h<c)??{dark:4,bright:12};return s<.08?0:s>=lr?l.bright:l.dark}function mr(e,t){const n=(o,s)=>{const r=(s*t+o)*4;return(e[r+3]??0)===0?-1:ur(e[r]??0,e[r+1]??0,e[r+2]??0)},a=[];for(let o=0;o<t/2;o+=1){const s=[];for(let r=0;r<t;r+=1)s.push({top:n(r,o*2),bottom:n(r,o*2+1)});a.push(s)}return a}const pe=["#000000","#0000aa","#00aa00","#00aaaa","#aa0000","#aa00aa","#aa5500","#aaaaaa","#555555","#5555ff","#55ff55","#55ffff","#ff5555","#ff55ff","#ffff55","#ffffff"];function pr(e){const t=({top:n,bottom:a})=>n<0&&a<0?"<span> </span>":n<0?`<span style="color:${pe[a]}">▄</span>`:a<0?`<span style="color:${pe[n]}">▀</span>`:n===a?`<span style="color:${pe[n]}">█</span>`:`<span style="color:${pe[n]};background:${pe[a]}">▀</span>`;return e.map(n=>n.map(t).join("")).join(`
`)}const $t={levels:4,roughness:.28,share:.55},fe=32;let ht=null,Tn=null,ct=null;function Sn(e,t){const n=document.querySelector('link[rel="icon"]');if(!n)return;ht??=Object.assign(document.createElement("canvas"),{width:fe,height:fe});const a=ht.getContext("2d");a&&(ct??=a.createImageData(fe,fe),Tn??=new Pt(fe,ct.data),Tn.paint(e,{rotation:t}),a.putImageData(ct,0,0),n.type="image/png",n.href=ht.toDataURL("image/png"))}function ua(e){let t=!0;if(typeof IntersectionObserver!="function")return{onScreen:()=>t,stop:()=>{}};const n=new IntersectionObserver(a=>{for(const o of a)t=o.isIntersecting},{rootMargin:"100px"});return n.observe(e),{onScreen:()=>t,stop:()=>n.disconnect()}}const fr=90,gr=1e3/12,wr=400,lt=new WeakMap;function yr(e){const t=(e.textContent??"").split(`
`);return{columns:Math.max(...t.map(n=>n.length)),rows:t.length}}function Tt(e,t){lt.get(e)?.();const n=t??{...$t,seed:Math.floor(Math.random()*16777215)},{columns:a,rows:o}=yr(e),s=Math.min(a,o*2),r=da(n),i=new Pt(s);e.dataset.seed=String(n.seed),e.title=`World ${n.seed}, ${r.mesh.faceCount.toLocaleString("en")} triangles`;const h=v=>{e.innerHTML=pr(mr(i.paint(r,{rotation:v}),s)),e.classList.add("grown")};if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return h(.6),Sn(r,.6),lt.set(e,()=>{}),()=>{};let l=0,c=-1/0,d=-1/0;const m=performance.now(),p=ua(e),u=v=>{const y=(v-m)/1e3/fr*Math.PI*2;p.onScreen()&&v-c>=gr&&(h(y),c=v),v-d>wr&&(Sn(r,y),d=v),l=requestAnimationFrame(u)};l=requestAnimationFrame(u);const g=()=>{cancelAnimationFrame(l),p.stop()};return lt.set(e,g),g}function br(){const e=document.querySelector(".planet");return e?Tt(e,oa()??void 0):()=>{}}const ae=360,vr=60,kr=1.4,Mn=Math.PI*2/vr,An=Math.PI*4;function xr(e){const t=f("canvas",{class:"world",width:ae,height:ae}),n=t.getContext("2d");if(!n)return()=>{};const a={...$t,seed:Math.floor(Math.random()*16777215)},o=n.createImageData(ae,ae),s=new Pt(ae,o.data),r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let i,h=.6,l=-.38,c=!r,d=null,m=0,p=performance.now();const u=f("p",{class:"hint"}),g=document.querySelector(".planet"),v=(20*4**$t.levels).toLocaleString("en"),y=()=>{i=da(a);const x=oa();u.textContent=`World ${a.seed}: ${i.mesh.faceCount.toLocaleString("en")} triangles. `+(x?`The header is keeping world ${x.seed}, ${(20*4**x.levels).toLocaleString("en")} triangles.`:`The header grows a new one every visit, ${v} triangles each.`),w.hidden=!x,S()},k=f("button",{type:"button",onclick:()=>{Bs({...a}),g&&Tt(g,{...a}),y()}},"Put it in the header"),w=f("button",{type:"button",hidden:!0,onclick:()=>{Hs(),g&&Tt(g),y()}},"Let the header grow its own"),S=()=>{s.paint(i,{rotation:h,tilt:l}),n.putImageData(o,0,0)};let M=0;const A=ua(t),$=x=>{const O=Math.min(.1,(x-p)/1e3);if(!d&&A.onScreen()){if(m!==0){m*=Math.exp(-O/kr);const b=c?Mn:0;(Math.abs(m)<=b||Math.abs(m)<.01)&&(m=0)}m!==0?(h-=m*O,S()):c&&(h+=Mn*O,S()),bt.send({byRadians:m*O,tiltedBy:0,seconds:O})}p=x,M=requestAnimationFrame($)};t.addEventListener("pointerdown",x=>{d={x:x.clientX,y:x.clientY,at:x.timeStamp},m=0,t.setPointerCapture(x.pointerId)}),t.addEventListener("pointermove",x=>{if(!d)return;const O=t.clientWidth||ae,b=(x.clientX-d.x)/O*Math.PI;h-=b;const T=l;l=Math.max(-1.2,Math.min(1.2,l-(x.clientY-d.y)/O*Math.PI)),bt.send({byRadians:b,tiltedBy:l-T,seconds:0});const R=Math.max(.004,(x.timeStamp-d.at)/1e3);m=Math.max(-An,Math.min(An,m*.4+b/R*.6)),d={x:x.clientX,y:x.clientY,at:x.timeStamp},S()}),t.addEventListener("pointerup",x=>{d&&x.timeStamp-d.at>120&&(m=0),d=null,p=performance.now()}),t.addEventListener("pointercancel",()=>{d=null,m=0});const E=f("input",{type:"number",min:0,value:a.seed,onchange:()=>{a.seed=Math.max(0,Math.floor(Number(E.value)||0)),y()}}),j=f("button",{type:"button",onclick:()=>{a.seed=Math.floor(Math.random()*16777215),E.value=String(a.seed),y()}},"Another world"),D=f("button",{type:"button",onclick:()=>{c=!c,D.textContent=c?"Hold still":"Turn"}},c?"Hold still":"Turn"),I=(x,O,b,T,R,L)=>{const P=f("output",{},L(a[x])),F=f("input",{type:"range",min:b,max:T,step:R,value:a[x],onchange:()=>{a[x]=Number(F.value),P.textContent=L(a[x]),y()},oninput:()=>{P.textContent=L(Number(F.value))}});return f("label",{},`${O}: `,P,F)};return e.append(t,f("div",{class:"row"},f("span",{},"Seed "),E,j,D,k,w),f("div",{class:"dials"},I("levels","Detail",2,6,1,x=>`${x} splits`),I("roughness","Roughness",.02,1,.01,x=>x.toFixed(2)),I("share","Sea",0,.98,.01,x=>`${Math.round(x*100)}%`)),u),y(),M=requestAnimationFrame($),()=>{cancelAnimationFrame(M),A.stop()}}const $r={name:"world",apps:{worlds:xr},install:()=>br()},ge=[$r,hs,Ko,Zo,ao,go,Qa,Ws,So,_o,Co,us];function In(e,t){const n=[];for(const a of document.querySelectorAll(".app[data-app]")){const o=e[a.dataset.app??""]?.(a,t);o&&n.push(o)}return()=>{for(const a of n)a()}}function Tr(e){const t={},n=e.fields.theme;(n==="dark"||n==="light")&&(t["data-page-theme"]=n);const a=e.fields.sky;return a&&(t["data-sky"]=a),t}const Sr=["data-page-theme","data-sky"];function Mr(e,t){return t==="/"?e==="/":e.startsWith(t)}const ma=7.8,Cn=17,pa=12,Ar=8,dt=28,En=44,ke=8,Ir=40,Cr=16;function Er(e){const t=new Map;for(const w of e.nodes){const S=w.label.split(`
`),M=Math.max(...S.map(A=>A.length),1);t.set(w.id,{id:w.id,label:w.label,real:!0,rank:-1,along:Math.max(40,M*ma+pa*2),across:S.length*Cn+Ar*2,pos:0,preds:[],succs:[]})}for(const w of e.edges)if(!t.has(w.from)||!t.has(w.to))throw new Error(`flow: edge ${w.from} --> ${w.to} names a node that is not there`);const n=Pr(e),a={...e,edges:e.edges.map((w,S)=>n.has(S)?{...w,from:w.to,to:w.from}:w)};for(const w of a.edges){const S=t.get(w.from),M=t.get(w.to);S.succs.push(M),M.preds.push(S)}jr(t);const o=Or(t,a),s=Dr(t);Rr(s);const r=s.length,i=s.map(w=>Math.max(Cn,...w.map(S=>S.real?S.across:0))),h=[];let l=ke;for(let w=0;w<r;w+=1)h.push(l),l+=(i[w]??0)+En;const c=w=>(h[w.rank]??0)+((i[w.rank]??0)-(w.real?w.across:0))/2,d=Math.max(...[...t.values()].map(w=>w.pos+w.along))+ke,m=l-En+ke,p=e.direction==="LR",u=(w,S)=>p?[S,w]:[w,S],g=[...t.values()].filter(w=>w.real).map(w=>{const[S,M]=u(w.pos,c(w));return{id:w.id,label:w.label,x:S,y:M,width:p?w.across:w.along,height:p?w.along:w.across}}),v=e.edges.map((w,S)=>{const M=o[S]??[],A=M[0],$=M[M.length-1];if(!A||!$)throw new Error("flow: an edge lost its ends");const E=e.edges.some(O=>O.from===w.to&&O.to===w.from),j=Math.min(Ir,A.along/3,$.along/3),D=E?n.has(S)?j:-j:0,I=[u(A.pos+A.along/2+D,c(A)+A.across),...M.slice(1,-1).map(O=>u(O.pos+O.along/2,c(O)+(i[O.rank]??0)/2)),u($.pos+$.along/2+D,c($))],x=n.has(S)?I.reverse():I;return w.label===void 0?{from:w.from,to:w.to,points:x}:{from:w.from,to:w.to,label:w.label,points:x}}),[y,k]=u(d,m);return{direction:e.direction,width:y,height:k,nodes:g,edges:v}}function Pr(e){const t=new Set,n=new Map,a=o=>{n.set(o,"walking"),e.edges.forEach((s,r)=>{s.from!==o||t.has(r)||(n.get(s.to)==="walking"?t.add(r):n.has(s.to)||a(s.to))}),n.set(o,"done")};for(const o of e.nodes)n.has(o.id)||a(o.id);return t}function jr(e){const t=new Set,n=a=>{if(a.rank>=0)return a.rank;if(t.has(a))throw new Error(`flow: there is a cycle through ${a.id}, and a flow has a direction`);return t.add(a),a.rank=a.preds.length===0?0:Math.max(...a.preds.map(n))+1,t.delete(a),a.rank};for(const a of e.values())n(a)}function Or(e,t){let n=0;return t.edges.map(a=>{const o=e.get(a.from),s=e.get(a.to);if(!o||!s)return[];const r=[o];let i=o;for(let h=o.rank+1;h<s.rank;h+=1){n+=1;const l={id:`\0${n}`,label:"",real:!1,rank:h,along:Math.max(Cr,(a.label?.length??0)*ma+pa),across:0,pos:0,preds:[i],succs:[]};e.set(l.id,l),i.succs.push(l),r.push(l),i=l}return i!==o&&(i.succs.push(s),s.preds.push(i),o.succs.splice(o.succs.indexOf(s),1),s.preds.splice(s.preds.indexOf(o),1)),r.push(s),r})}function Dr(e){const t=Math.max(...[...e.values()].map(r=>r.rank))+1,n=Array.from({length:t},()=>[]);for(const r of e.values())n[r.rank]?.push(r);const a=new Map,o=r=>r.forEach((i,h)=>a.set(i,h));n.forEach(o);const s=(r,i)=>i.length===0?a.get(r)??0:i.reduce((h,l)=>h+(a.get(l)??0),0)/i.length;for(let r=0;r<4;r+=1){for(let i=1;i<t;i+=1){const h=n[i]??[];h.sort((l,c)=>s(l,l.preds)-s(c,c.preds)),o(h)}for(let i=t-2;i>=0;i-=1){const h=n[i]??[];h.sort((l,c)=>s(l,l.succs)-s(c,c.succs)),o(h)}}return n}function Rr(e){const t=r=>r.reduce((i,h)=>i+h.along,0)+dt*Math.max(0,r.length-1),n=Math.max(...e.map(t));for(const r of e){let i=ke+(n-t(r))/2;for(const h of r)h.pos=i,i+=h.along+dt}const a=r=>r.pos+r.along/2,o=(r,i)=>{const h=r.map(d=>{const m=i(d);return m.length===0?a(d):m.reduce((p,u)=>p+a(u),0)/m.length});let l=-1/0;r.forEach((d,m)=>{d.pos=Math.max((h[m]??0)-d.along/2,l),l=d.pos+d.along+dt});const c=r.reduce((d,m,p)=>d+a(m)-(h[p]??0),0)/Math.max(1,r.length);for(const d of r)d.pos-=c};for(let r=0;r<3;r+=1){for(let i=1;i<e.length;i+=1)o(e[i]??[],h=>h.preds);for(let i=e.length-2;i>=0;i-=1)o(e[i]??[],h=>h.succs)}const s=Math.min(...e.flat().map(r=>r.pos));for(const r of e.flat())r.pos+=ke-s}const St=/(\w[\w.-]*)(?:\[([^\]]*)\])?/,Lr=new RegExp(`^${St.source}\\s*-->(?:\\|([^|]*)\\|)?\\s*${St.source}$`),Fr=new RegExp(`^${St.source}$`),Nr=/^(?:flow\s+)?(TD|LR)$/i;function Wr(e){const t=new Map,n=[];let a="TD";const o=(i,h)=>{i&&(t.has(i)||t.set(i,i),h!==void 0&&t.set(i,h.replace(/\\n/g,`
`)))},s=e.split(`
`);let r=!0;return s.forEach((i,h)=>{const l=i.trim();if(l===""||l.startsWith("%"))return;if(r){r=!1;const m=Nr.exec(l);if(m){a=m[1]?.toUpperCase()==="LR"?"LR":"TD";return}}const c=Lr.exec(l);if(c){const[,m,p,u,g,v]=c;o(m,p),o(g,v),n.push(u===void 0?{from:m??"",to:g??""}:{from:m??"",to:g??"",label:u});return}const d=Fr.exec(l);if(d){o(d[1],d[2]);return}throw new Error(`flow: cannot read line ${h+1}: "${l}"`)}),{direction:a,nodes:[...t].map(([i,h])=>({id:i,label:h})),edges:n}}const Br=20,Pn=17;function Hr(e){let t=5381;for(let n=0;n<e.length;n+=1)t=(t*33^e.charCodeAt(n))>>>0;return t.toString(36)}const B=e=>String(Math.round(e*10)/10);function Gr(e,t){const[n,...a]=e.points;if(!n)return"";let o=`M${B(n[0])},${B(n[1])}`,s=n;for(const r of a){const[i,h]=s,[l,c]=r,d=t?[(i+l)/2,h]:[i,(h+c)/2],m=t?[(i+l)/2,c]:[l,(h+c)/2];o+=` C${B(d[0])},${B(d[1])} ${B(m[0])},${B(m[1])} ${B(l)},${B(c)}`,s=r}return o}function _r(e){const{points:t}=e,n=t[Math.floor((t.length-1)/2)]??[0,0],a=t[Math.ceil((t.length-1)/2)]??n;return[(n[0]+a[0])/2,(n[1]+a[1])/2]}function qr(e){const t=Er(Wr(e)),n=t.direction==="LR",a=`arrow-${Hr(e)}`,o=t.edges.map(h=>{const l=`<path class="edge" d="${Gr(h,n)}" marker-end="url(#${a})"/>`;if(h.label===void 0)return l;const[c,d]=_r(h);return`${l}<text class="edge-label" x="${B(c)}" y="${B(d)}" text-anchor="middle" dominant-baseline="middle">${C(h.label)}</text>`}).join(""),s=t.nodes.map(h=>{const l=h.x+h.width/2,c=h.label.split(`
`),d=h.y+(h.height-c.length*Pn)/2,m=c.map((p,u)=>`<tspan x="${B(l)}" y="${B(d+Br-8+u*Pn)}">${C(p)}</tspan>`).join("");return`<g class="node"><rect x="${B(h.x)}" y="${B(h.y)}" width="${B(h.width)}" height="${B(h.height)}" rx="4"/><text text-anchor="middle" dominant-baseline="middle">${m}</text></g>`}).join(""),r=B(t.width),i=B(t.height);return`<figure class="flow"><svg class="flow" viewBox="0 0 ${r} ${i}" width="${r}" height="${i}" style="max-width: 100%; height: auto" role="img"><defs><marker id="${a}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z"/></marker></defs>${o}${s}</svg></figure>`}const jt=e=>new Set(e.split(/\s+/).filter(Boolean)),Jr=jt(`
  var let const function return if else for while do break continue new this
  true false null undefined class extends import export from default async await
  throw try catch finally typeof instanceof in of switch case delete void yield`),Ur=jt(`
  auto break case char const continue default do double else enum extern float for goto if
  inline int long register restrict return short signed sizeof static struct switch typedef
  union unsigned void volatile while NULL true false`),Yr=jt(`
  abstract assert boolean break byte case catch char class const continue default do double
  else enum extends final finally float for goto if implements import instanceof int interface
  long native new package private protected public return short static strictfp super switch
  synchronized this throw throws transient try var void volatile while true false null`);function Y(e,t){return`<span class="hl-${e}">${C(t)}</span>`}function fa(e,t,n){for(let a=t+1;a<e.length;a+=1)if(e[a]==="\\")a+=1;else if(e[a]===n)return a+1;return e.length}function ut(e,t,n){let a="",o=0;for(;o<e.length;){const s=e.slice(o);let r;const i=e.lastIndexOf(`
`,o-1)+1,h=/^\s*$/.test(e.slice(i,o));if(s.startsWith("//")||n&&s[0]==="#"&&h){const l=e.indexOf(`
`,o),c=l<0?e.length:l;a+=Y(s[0]==="#"?"a":"c",e.slice(o,c)),o=c}else if(s.startsWith("/*")){const l=e.indexOf("*/",o+2),c=l<0?e.length:l+2;a+=Y("c",e.slice(o,c)),o=c}else if(s[0]==='"'||s[0]==="'"||s[0]==="`"){const l=fa(e,o,s[0]??"");a+=Y("s",e.slice(o,l)),o=l}else if(r=/^[A-Za-z_$][\w$]*/.exec(s)){const l=r[0];a+=t.has(l)?Y("k",l):C(l),o+=l.length}else(r=/^\d+(?:\.\d+)?/.exec(s))?(a+=Y("n",r[0]),o+=r[0].length):(a+=C(s[0]??""),o+=1)}return a}function zr(e){let t="",n=0;for(;n<e.length;){const a=e.slice(n);if(a.startsWith("<!--")){const s=e.indexOf("-->",n+4),r=s<0?e.length:s+3;t+=Y("c",e.slice(n,r)),n=r;continue}const o=/^<(\/?)([A-Za-z][\w-]*)/.exec(a);if(!o){const s=e.indexOf("<",n+1),r=s<0?e.length:s;t+=C(e.slice(n,r)),n=r;continue}for(t+=`&lt;${o[1]}${Y("t",o[2]??"")}`,n+=o[0].length;n<e.length&&e[n]!==">";){const s=e.slice(n);let r;if(r=/^\s+/.exec(s))t+=r[0],n+=r[0].length;else if(r=/^[A-Za-z_:][\w:.-]*/.exec(s))t+=Y("a",r[0]),n+=r[0].length;else if(s[0]==="="&&(s[1]==='"'||s[1]==="'")){const i=fa(e,n+1,s[1]??"");t+=`=${Y("s",e.slice(n+1,i))}`,n=i}else t+=C(s[0]??""),n+=1}e[n]===">"&&(t+="&gt;",n+=1)}return t}function Kr(e,t){return t==="js"||t==="javascript"?ut(e,Jr,!1):t==="c"?ut(e,Ur,!0):t==="java"?ut(e,Yr,!1):t==="html"?zr(e):C(e)}function Vr(e,t){const a=/^https?:/.test(t)?' target="_blank" rel="noopener noreferrer"':"";return`<a href="${C(t)}"${a}>${e}</a>`}const Xr=["large","wide"];function Qr(e,t,n){const a=n&&Xr.includes(n)?` class="${n}"`:"";return`<img src="${C(t)}" alt="${C(e)}"${a}>`}const Zr=/(`[^`]+`|!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)|\[[^\]]+\]\([^)\s]+\))/g,ei=/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/,ti=/^\[([^\]]+)\]\(([^)\s]+)\)$/;function ga(e){return e.split(Zr).map(t=>{if(t.startsWith("`")&&t.endsWith("`")&&t.length>1)return`<code>${C(t.slice(1,-1))}</code>`;const n=ei.exec(t);if(n)return Qr(n[1]??"",n[2]??"",n[3]);const a=ti.exec(t);return a?Vr(ga(a[1]??""),a[2]??""):C(t)}).join("")}function ni(e){const t=[];return e.replace(/<code>[\s\S]*?<\/code>/g,a=>`\0${t.push(a)-1}\0`).replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/(^|[^*])\*([^*]+)\*/g,"$1<em>$2</em>").replace(/ {2,}\n/g,"<br>").replace(/\n/g," ").replace(/ -- /g," — ").replace(/\u0000(\d+)\u0000/g,(a,o)=>t[Number(o)]??"")}function z(e){return ni(ga(e))}function ai(e){const t=e.split(`
`).map(p=>p.trim()).filter(Boolean),n=t.find(p=>!p.includes(" :: ")),a=t.filter(p=>p.includes(" :: ")).map(p=>{const u=p.indexOf(" :: ");return{left:p.slice(0,u).trim(),right:p.slice(u+4).trim()}}),o=a.filter(({left:p})=>p.startsWith("=")).map(({left:p,right:u})=>({value:Number(p.slice(1)),name:u})),s=a.filter(({left:p})=>!p.startsWith("=")).map(({left:p,right:u})=>{const[g="",v]=u.split("|").map(k=>k.trim()),y=Number(g.replace(/!$/,"").trim());return{label:p,value:y,shown:v??String(y),marked:g.endsWith("!")}}),r=Math.max(0,...s.map(({value:p})=>p),...o.map(({value:p})=>p))||1,i=p=>(Math.max(0,p)/r).toFixed(3),h=o[0],l=s.map(({label:p,value:u,shown:g,marked:v})=>`<tr${v?' class="marked"':""}><th scope="row">${z(p)}</th><td><span class="bar" style="--p:${i(u)}"></span><span class="value">${C(g)}</span></td></tr>`).join(""),c=h?` style="--rule:${i(h.value)}"`:"",d=h?` The line is ${C(h.name)}, at ${h.value}.`:"",m=n||h?`<figcaption>${n?z(n)+".":""}${d}</figcaption>`:"";return`<figure class="bars"><table${c}${h?' class="ruled"':""}><tbody>${l}</tbody></table>${m}</figure>`}const jn=/^(?:[-*]|\d+\.)\s/;function oi(e,t,n){if(!jn.test(e[0]??""))return!1;const a=t.slice(n).find(o=>o.trim()!=="");return a!==void 0&&jn.test(a)}function si(e){const t=[],n=e.replace(/\r\n?/g,`
`).split(`
`);let a=[],o=!1;return n.forEach((s,r)=>{if(s.startsWith("```")){o=!o,a.push(s),o||(t.push(a),a=[]);return}if(!o&&s.trim()===""){if(oi(a,n,r+1))return;a.length&&t.push(a),a=[];return}a.push(s)}),a.length&&t.push(a),t}function ri(e){return e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function ii(e){const t=/^(#{1,4})\s+(.*)$/.exec(e[0]??"");if(!t||!e.slice(0,-1).every(s=>/ {2,}$/.test(s)))return null;const a=t[1]?.length??1,o=[t[2]??"",...e.slice(1)].join(`
`);return`<h${a} id="${ri(o)}">${z(o)}</h${a}>`}function hi(e){if(!e[0]?.startsWith("```"))return null;const t=e[0].slice(3).trim(),n=e.slice(1,-1).join(`
`);return t==="flow"?qr(n):t==="bars"?ai(n):`<pre><code>${Kr(n,t)}</code></pre>`}function ci(e,t){const n=[];for(const a of e)t.test(a)?n.push(a.replace(t,"")):n.length&&(n[n.length-1]+=`
${a.trim()}`);return n}function li(e){const t=e[0]??"",n=/^\d+\.\s/.test(t),a=/^[-*]\s/.test(t);if(!n&&!a)return null;const o=n?/^\d+\.\s+/:/^[-*]\s+/;if(!e.every(i=>o.test(i)||/^\s/.test(i)))return null;const s=n?"ol":"ul",r=ci(e,o).map(i=>`<li>${z(i)}</li>`).join("");return`<${s}>${r}</${s}>`}function di(e){return e.every(n=>n.includes(" :: "))?`<dl>${e.map(n=>{const a=n.indexOf(" :: ");return[n.slice(0,a),n.slice(a+4)]}).map(([n,a])=>`<dt>${z(n)}</dt><dd>${z(a)}</dd>`).join("")}</dl>`:null}function ui(e){if(!e.every(n=>n.startsWith(">")))return null;const t=e.map(n=>n.replace(/^>\s?/,"")).join(" ");return`<blockquote>${z(t)}</blockquote>`}function mi(e){const t=/^::([a-z0-9-]+)$/.exec(e[0]??"");return!t||e.length!==1?null:`<div class="app" data-app="${t[1]}"></div>`}function pi(e){return e.length===1&&/^-{3,}$/.test(e[0]??"")?"<hr>":null}function fi(e){const t=e.length===1&&/^(\\+)$/.exec(e[0]??"");return t?`<div class="space" style="--n:${t[1]?.length??1}"></div>`:null}function gi(e){return e.length===1&&/^!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)$/.test(e[0]??"")?`<figure>${z(e[0]??"")}</figure>`:null}function wi(e){return`<p>${z(e.join(`
`))}</p>`}const yi=[pi,fi,ii,hi,ui,mi,gi,di,li];function wa(e){return si(e).map(t=>{for(const n of yi){const a=n(t);if(a!==null)return a}return wi(t)}).join(`
`)}function Ot(e){return e==="/"?"~":`~${e.replace(/\/$/,"")}`}function ya(e,t){return`<p class="ran"><span class="ps1">${C(e)} $</span> ${C(t)}</p>`}function bi(e,t){if(t.parent===null)return"";const n=e.childrenOf(t.route);if(n.length===0)return"";const a=n.map(o=>`<li><a class="entry" href="${o.route}"><code>${C(o.name)}/</code><span class="title">${C(o.title)}</span>`+(o.summary?`<span class="summary">${C(o.summary)}</span>`:"")+"</a></li>").join("");return`${ya(Ot(t.route),"ls")}
<ul class="listing">${a}</ul>`}function vi(e,t){const n=e.trailTo(t.route).slice(1).map(a=>a.name).join("/");return ya("~",n?`cd ${n} && cat README.md`:"cat README.md")}function ki(e,t){return`${vi(e,t)}
${wa(t.body)}
${bi(e,t)}`}function xi(e,t){const n=document.querySelector("main");if(!n)return()=>!1;const a=(o,{push:s=!0,keep:r=!1}={})=>{const i=e.at(o);if(!i)return!1;r||(n.innerHTML=ki(e,i));const h=Tr(i);for(const l of Sr){const c=h[l];c?document.documentElement.setAttribute(l,c):document.documentElement.removeAttribute(l)}document.title=i.route==="/"?"David Rodenas":`${i.title} — David Rodenas`;for(const l of document.querySelectorAll("nav .navlink"))Mr(o,l.getAttribute("href")??"\0")?l.setAttribute("aria-current","page"):l.removeAttribute("aria-current");return s&&(o===window.location.pathname?window.history.replaceState({route:o},"",o):window.history.pushState({route:o},"",o),r||window.scrollTo({top:0})),window.goatcounter?.count?.({path:o,title:document.title}),t(i,r),!0};return document.addEventListener("click",o=>{if(o.defaultPrevented||o.button!==0||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey)return;const s=o.target?.closest("a[href]");if(!s||s.target||s.dataset.run)return;const r=new URL(s.href,window.location.href);if(r.origin!==window.location.origin)return;const i=r.pathname.endsWith("/")?r.pathname:`${r.pathname}/`;e.at(i)&&(o.preventDefault(),i!==window.location.pathname&&a(i))}),window.addEventListener("popstate",()=>{const o=window.location.pathname.endsWith("/")?window.location.pathname:`${window.location.pathname}/`;a(o,{push:!1})}),a}class $i{typed=[];drafts=[];index=0;get lines(){return this.typed}add(t){this.typed.push(t),this.drafts=[...this.typed,""],this.index=this.typed.length}previous(t){return this.moveTo(this.index-1,t)}next(t){return this.moveTo(this.index+1,t)}moveTo(t,n){return this.drafts.length===0&&(this.drafts=[""]),t<0||t>=this.drafts.length?n:(this.drafts[this.index]=n,this.index=t,this.drafts[t]??n)}}function Ti(e,t,n,a){if(e==="k"){const o=t.slice(n);return{line:t.slice(0,n),caret:n,killed:o||a}}if(e==="u"){const o=t.slice(0,n);return{line:t.slice(n),caret:0,killed:o||a}}return e==="y"?{line:t.slice(0,n)+a+t.slice(n),caret:n+a.length,killed:a}:null}function ba(e){return e.split(/\s*(?:;|&&)\s*/).map(t=>t.trim().split(/\s+/).filter(Boolean)).filter(t=>t.length>0)}function ee(e,t){const a=t.startsWith("~")||t.startsWith("/")?[]:e.split("/").filter(Boolean),o=t.replace(/^~/,"").split("/").filter(Boolean),s=[...a];for(const r of o)r!=="."&&(r===".."?s.pop():s.push(r));return s.length===0?"/":`/${s.join("/")}/`}function Si(e){return e.replace(/(?:^|\/)(?:README\.md|\*)$/,"")||"."}const Mi={name:"cat",usage:"cat <file>",description:"print a page, README.md or * for the one here",run({site:e,cwd:t},[n]){if(!n)return{text:"cat: usage: cat <file>",error:!0};const a=ee(t,Si(n)),o=e.at(a);return!o||/\.md$/.test(n)!==/README\.md$/.test(n)?{text:`cat: ${n}: no such file`,error:!0}:{html:wa(o.body),at:a}}},Ai={name:"cd",usage:"cd [dir]",description:"go to a directory (the address follows)",run(e,[t="~"]){const n=ee(e.cwd,t);return e.site.at(n)?(e.cwd=n,{at:n}):{text:`cd: ${t}: no such directory`,error:!0}}},Ii={name:"clear",usage:"clear",description:"clear what the shell has printed",run(){return{clear:!0}}},Ci={name:"find",usage:"find [path] [word]",description:"every page under a directory; with a word, only those it is in the name or title of",run({site:e,cwd:t},n){const[a,o]=n,s=a!==void 0&&(a==="."||a.includes("/")||e.at(ee(t,a))!==void 0),r=s?a??".":".",i=(s?o:a)?.toLowerCase(),h=ee(t,r);if(!e.at(h))return{text:`find: ${r}: no such directory`,error:!0};const c=e.pages.filter(d=>d.route.startsWith(h)).filter(d=>!i||d.route.toLowerCase().includes(i)||d.title.toLowerCase().includes(i));return c.length===0?{text:`find: nothing under ${r}${i?` with "${i}" in it`:""}`}:{text:c.map(d=>`${d.route}  # ${d.title}`).join(`
`),html:`<pre class="listing">${c.map(d=>`<span class="line"><a href="${C(d.route)}">${C(d.route)}</a><span class="hint">  # ${C(d.title)}</span></span>`).join("")}</pre>`}}},mt=40,Ei=e=>e.replace(/\]\([^)]*\)/g,"]").replace(/[#*_`>\[\]]/g,"").trim(),Pi={name:"grep",usage:"grep <word> [path]",description:"the lines of every page under a directory that say a word",run({site:e,cwd:t},[n,a="."]){if(!n)return{text:"grep: usage: grep <word> [path]",error:!0};const o=ee(t,a);if(!e.at(o))return{text:`grep: ${a}: no such directory`,error:!0};const s=n.toLowerCase(),r=e.pages.filter(c=>c.route.startsWith(o)).flatMap(c=>c.body.split(`
`).map((d,m)=>({page:c,number:m+1,line:Ei(d)})).filter(({line:d})=>d.toLowerCase().includes(s)));if(r.length===0)return{text:`grep: no page under ${a} says "${n}"`};const i=r.slice(0,mt),h=r.length>mt?[`… and ${r.length-mt} more. Give grep a directory to look in.`]:[],l=c=>C(c).replace(new RegExp(C(n).replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"ig"),d=>`<mark>${d}</mark>`);return{text:[...i.map(({page:c,number:d,line:m})=>`${c.route}:${d}: ${m}`),...h].join(`
`),html:`<pre class="listing wrap">${[...i.map(({page:c,number:d,line:m})=>`<span class="line"><a href="${C(c.route)}">${C(c.route)}</a>:${d}: <span class="hint">${l(m)}</span></span>`),...h.map(c=>`<span class="line">${C(c)}</span>`)].join("")}</pre>`}}},ji={name:"help",usage:"help [command]",description:"this",run({commands:e},[t]){if(t){const r=e.find(i=>i.name===t);return r?{text:`${r.usage}
  ${r.description}`}:{text:`help: ${t}: no such command`,error:!0}}const n=Math.max(...e.map(r=>r.usage.length)),a=e.map(r=>`${r.usage.padEnd(n)}  ${r.description}`),o="Tab completes; → takes the grey suggestion. ↑↓ recall. ^K kills to the end of the line, ^U back to the start, ^Y puts it back.",s=e.map(r=>`<dt><a href="#" data-run="help ${r.name}">${C(r.usage)}</a></dt><dd>${C(r.description)}</dd>`).join("");return{text:["Commands:",...a,"",o].join(`
`),html:`<p>Commands:</p><dl class="help">${s}</dl><p>${C(o)}</p>`}}};function Oi(e){const t=e.filter(a=>a.startsWith("-")).flatMap(a=>a.slice(1).split("")),n=e.find(a=>!a.startsWith("-"))??".";return{flags:t,path:n}}function Di(e,t,n,a){const o=a==="."?"":`${a.replace(/\/$/,"")}/`;return[...t?[{mode:"dr-x",name:"..",title:t.title,summary:t.summary,href:t.route,run:`cd ${o}..`}]:[],{mode:"--r-",name:"README.md",title:e.title,summary:e.summary,href:e.route,run:`cat ${o}README.md`},...n.map(s=>({mode:"dr-x",name:`${s.name}/`,title:s.title,summary:s.summary,href:s.route}))]}function On(e){const t=e.run?` data-run="${C(e.run)}"`:"";return`<a href="${C(e.href)}"${t}>${C(e.name)}</a>`}function Ri(e,t){const n=r=>" ".repeat(Math.max(0,20-r.length)),a=r=>t?`${r.mode}  ${r.name}${n(r.name)}  ${r.title}${r.summary?` — ${r.summary}`:""}`:`${r.name}${n(r.name)}  # ${r.title}`,o=r=>t?`<span class="line">${r.mode}  ${On(r)}${n(r.name)}  ${C(r.title)}${r.summary?`<span class="hint"> — ${C(r.summary)}</span>`:""}</span>`:`<span class="line">${On(r)}${n(r.name)}<span class="hint">  # ${C(r.title)}</span></span>`,s=t?[`total ${e.length}`]:[];return{text:[...s,...e.map(a)].join(`
`),html:`<pre class="listing">${[...s.map(r=>`<span class="line">${r}</span>`),...e.map(o)].join("")}</pre>`}}const Li={name:"ls",usage:"ls [-l] [path]",description:"list what a directory holds, each with its title; -l adds a line on each",run({site:e,cwd:t},n){const{flags:a,path:o}=Oi(n),s=a.find(l=>l!=="l");if(s)return{text:`ls: -${s}: no such option. Try ls -l`,error:!0};const r=ee(t,o),i=e.at(r);if(!i)return{text:`ls: ${o}: no such directory`,error:!0};const h=i.parent===null?void 0:e.at(i.parent);return Ri(Di(i,h,e.childrenOf(r),o),a.includes("l"))}},Fi={name:"pwd",usage:"pwd",description:"print where you are",run({cwd:e}){return{text:Ot(e)}}},va=[Li,Ai,Mi,Ci,Pi,Fi,ji,Ii];class Ni{context;constructor(t,n,a=va){this.context={site:t,cwd:n,commands:a}}get prompt(){return`${Ot(this.context.cwd)} $`}moveTo(t){return this.context.site.at(t)?(this.context.cwd=t,!0):!1}run(t){const n=[];for(const[a="",...o]of ba(t)){const s=this.context.commands.find(i=>i.name===a),r=s?s.run(this.context,o):{text:`${a}: command not found. Try help`,error:!0};if(n.push(r),r.error)break}return n}complete(t){const n=t.split(/\s+/),a=n.pop()??"",o=n.length===0?"":`${n.join(" ")} `;return(n.length===0?this.commandNames():this.pathNames(a)).filter(r=>r.startsWith(a)).map(r=>o+r)}commandNames(){return this.context.commands.map(t=>t.name).sort()}pathNames(t){const n=t.lastIndexOf("/"),a=n<0?".":t.slice(0,n+1),o=ee(this.context.cwd,a);if(!this.context.site.at(o))return[];const s=n<0?"":a;return["README.md",...this.context.site.childrenOf(o).map(i=>`${i.name}/`)].map(i=>s+i)}}function Wi(e,t,n){if(e==="")return"help";const o=[...[...t].reverse(),...n].find(s=>s.startsWith(e)&&s!==e);return o?o.slice(e.length):""}const Mt="shell-pending";function Bi(e){try{e&&sessionStorage.setItem(Mt,e)}catch{}}function Hi(){try{const e=sessionStorage.getItem(Mt)??"";return sessionStorage.removeItem(Mt),e}catch{return""}}function Gi(){window.__stopTyped?.();const e=window.__typed??[];if(window.__typed=[],e.length===0)return null;const t=[];let n="";for(const a of e)a==="Enter"?(t.push(n),n=""):a==="Backspace"?n=n.slice(0,-1):n+=a;return{finished:t,unfinished:n}}function _i(e,t,n={}){const a=document.querySelector(".terminal"),o=document.querySelector(".screen"),s=a?.querySelector("form.prompt"),r=s?.querySelector("input"),i=s?.querySelector(".line"),h=s?.querySelector(".suggest"),l=s?.querySelector(".ps1"),c=document.querySelector(".ran.end"),d=c?.querySelector(".ps1"),m=c?.querySelector(".line"),p=c?.querySelector(".typed");if(!a||!o||!s||!r||!i||!h||!l||!c||!d||!m||!p)return null;const u=()=>{l.textContent=g.prompt,d.textContent=g.prompt},g=new Ni(e,t,n.commands),v=new $i;let y=null;const k=b=>{o.append(b)},w=()=>{y?.remove(),y=null},S=()=>{const b=r.selectionStart??r.value.length;i.style.setProperty("--caret",String(b)),i.style.setProperty("--typed",String(r.value.length)),p.textContent=r.value,m.style.setProperty("--caret",String(b)),h.textContent=b===r.value.length?Wi(r.value,v.lines,g.complete(r.value)):""},M=(b,T=b.length)=>{r.value=b,r.setSelectionRange(T,T),S()},A=b=>{if(b.clear&&(o.replaceChildren(),n.clearPage?.()),b.html){const T=f("div",{class:b.text?"listing-out":"cat"});T.innerHTML=b.html,k(T)}else b.text&&k(f("pre",{class:b.error?"error":""},b.text))},$=b=>{w();const T=f("p",{class:"echo"},f("span",{class:"ps1"},g.prompt),` ${b}`);k(T);let R=!1;const L=ba(b).map(P=>P.join(" "));for(let P=0;P<L.length;P+=1){const[F]=g.run(L[P]??"");if(F){if(A(F),F.html&&!F.text&&(R=!0),F.at&&!n.moveTo?.(F.at)){Bi(L.slice(P+1).join(" && ")),window.location.assign(F.at);return}if(F.error)break}}u(),S(),R?T.scrollIntoView({block:"start"}):window.scrollTo({top:document.documentElement.scrollHeight})},E=()=>{if(w(),r.value.trim()===""){M("help");return}const b=g.complete(r.value);b.length===1?M(b[0]??r.value):b.length>1&&(y=f("p",{class:"hint"},b.map(T=>T.split(" ").pop()).join("  ")),s.insertAdjacentElement("afterend",y),window.scrollTo({top:document.documentElement.scrollHeight}))};s.addEventListener("submit",b=>{b.preventDefault();const T=r.value.trim();M(""),T&&(v.add(T),$(T))});let j="";r.addEventListener("keydown",b=>{if(b.key==="Tab")b.preventDefault(),E();else if(b.key==="ArrowUp")b.preventDefault(),M(v.previous(r.value));else if(b.key==="ArrowDown")b.preventDefault(),M(v.next(r.value));else if(b.key==="ArrowRight"&&r.selectionStart===r.value.length&&h.textContent)b.preventDefault(),M(r.value+h.textContent);else if(b.ctrlKey&&!b.metaKey&&!b.altKey){const T=Ti(b.key,r.value,r.selectionStart??r.value.length,j);if(!T)return;b.preventDefault(),w(),M(T.line,T.caret),j=T.killed}else w()});for(const b of["input","keyup","click","focus","select"])r.addEventListener(b,S);let D=!0;r.addEventListener("input",()=>{D&&r.value!==""&&window.scrollTo({top:document.documentElement.scrollHeight}),D=r.value===""}),document.addEventListener("selectionchange",()=>{document.activeElement===r&&S()}),o.addEventListener("click",b=>{const T=b.target?.closest("a[data-run]");T?.dataset.run&&(b.preventDefault(),$(T.dataset.run))}),window.addEventListener("keydown",b=>{const R=b.target?.matches("input, textarea, select, [contenteditable]")??!1,L=b.key.length===1&&!b.ctrlKey&&!b.metaKey&&!b.altKey;R||!L||r.focus({preventScroll:!1})}),s.addEventListener("click",()=>r.focus()),c.addEventListener("click",()=>r.focus()),S();const I=Hi();I&&$(I);const x=Gi();if(x){for(const b of x.finished)b.trim()&&(v.add(b.trim()),$(b.trim()));M(x.unfinished),r.focus()}return{run:$,moveTo:b=>{g.moveTo(b)&&(o.replaceChildren(),u(),S())}}}const qi=[{file:"book/index.md",markdown:`---
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
order: 3
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
first half had taught, and [it has a page of its own](/research/loops-into-zones/). Transform the equations, not the code — splitting,
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

The same programs on a fast desktop of the day, a four-core i7 with a
ninety-six-core card, did that hour and a quarter in nineteen seconds: two
hundred and thirty times faster than where it started, one thread of the
Atom. The thesis rounds it to 250.

On the largest graphs tried, 512 vertices, the thesis reports the parallel
version 366 times faster than the serial one, whose run at 1,024 vertices was
not attempted: it was estimated at forty-two days.

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
- [Streams by annotation](/research/streams-by-annotation/) -- the stream compiler by the examples of its own poster: a serial C program becomes a pipeline of tasks by writing in its margin what goes in and what comes out, with what the prototype measured.
- [Graph matching on a desktop](/research/graph-matching/) -- Universitat Rovira i Virgili, 2009–2011. Two computer-vision algorithms rewritten for CUDA and OpenMP on an eighteen-watt desktop, with the measurements: up to forty times faster, without changing the result by a bit.
- [Loops into zones](/research/loops-into-zones/) -- the method of the thesis, step by step: two loop transformations and two annotations that give a serial algorithm the shape of a graphics card, without changing what it computes.

- [One lock at a time](/research/one-lock-at-a-time/) -- in between the two, a year inside a database engine, making its core concurrent: each technique with the speed-up it bought, including the right change that made everything twice as slow.

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
`},{file:"research/loops-into-zones.md",markdown:`---
title: Loops into zones
summary: The method of the thesis, step by step. Two loop transformations and two annotations turn a serial algorithm into one shaped like a graphics card, without changing what it computes.
order: 4
---

# Loops into zones

A graphics card is not many processors. It is two kinds of parallelism, one
inside the other. Outside, **blocks**: many of them, loosely coupled, which
should hardly talk to each other. Inside each block, **threads**: tightly
coupled, in step, sharing a small memory that is private to the block and
very fast. A program is quick on a card when its work has that same shape,
and slow, whatever else is done to it, when it has not.

I had met that shape before. The NAS multi-zone benchmarks, which had scaled
so well [on Cyclops and over distributed memory](/research/parallel-tools/),
are built the same way: coarse zones outside that barely communicate, fine
loops inside each. So the method of the second half of the thesis is one
sentence: **take the algorithm you have and make it multi-zone**. The rest is
how to do that to an algorithm nobody wrote that way, without changing what
it computes.

## The algorithm

Graduated assignment matches two graphs by refining a matrix of
probabilities, \`P[a,i]\`: how likely it is that vertex \`a\` of one graph is
vertex \`i\` of the other. Each round computes, for every pair,

\`\`\`
Q[a,i] = sum over b, j of  P[b,j] · C[a,i,b,j]
P[a,i] = exp(β · Q[a,i])
\`\`\`

where \`C\` says how compatible matching \`a\` with \`i\` is with matching \`b\` with
\`j\`. Written the way anyone would write it first, it is two loop nests:

\`\`\`
for a in 1 .. R:
  for i in 1 .. R:
    Q[a,i] = 0
    for b in 1 .. R:
      for j in 1 .. R:
        Q[a,i] += P[b,j] · C[a,i,b,j]

for a in 1 .. R:
  for i in 1 .. R:
    P[a,i] = exp(β · Q[a,i])
\`\`\`

Four loops deep over the vertices, \`R⁴\` products a round. It is correct, and
it has no shape at all: every iteration may touch any part of \`P\` and of \`C\`,
so on a card every thread wants both whole, and nothing fits in a block's
memory. The two steps that follow are done to the short nest first, where
they are easy to see, and then to the long one.

## Step one: tile the loops

Replace each index by a tile and a position inside it: \`a = c·B + d\`,
\`i = k·B + l\`. The loop over \`a\` becomes two, one over the tiles \`c\` and one
over the positions \`d\`, and the loop over \`i\` likewise:

\`\`\`
for a in 1 .. R:          before

for c in 0 .. R/B:        after: which tile,
  for d in 1 .. B:        and where in it
    a = c·B + d
\`\`\`

Done to both loops of the short nest:

\`\`\`
for c in 0 .. R/B:
  for d in 1 .. B:
    for k in 0 .. R/B:
      for l in 1 .. B:
        a = c·B + d
        i = k·B + l
        P[a,i] = exp(β · Q[a,i])
\`\`\`

Nothing has changed: the same assignments happen, in the same order. But the
matrices are now visibly cut into sub-matrices of \`B × B\`, and a sub-matrix
is something that fits in a block. These are the zones.

## Step two: reorder the loops

Now move the loops until the nest has the card's shape: the tile loops
outside, the position loops inside.

\`\`\`
for c in 0 .. R/B:            ← blocks
  for k in 0 .. R/B:          ← blocks
    for d in 1 .. B:          ← threads
      for l in 1 .. B:        ← threads
        P[a,i] = exp(β · Q[a,i])
\`\`\`

The long nest gets the same two steps. Its inner indices are tiled too,
\`b = e·B + f\` and \`j = u·B + v\`, and the tile loops \`e\`, \`u\` go outside the
position loops \`f\`, \`v\`:

\`\`\`
for c, k in tiles:                      ← blocks
  for d, l in positions:                ← threads
    Q[a,i] = 0
    for e, u in tiles:                  ← one sub-matrix of P at a time
      for f, v in positions:
        b = e·B + f
        j = u·B + v
        Q[a,i] += P[b,j] · C[a,i,b,j]
\`\`\`

Now the innermost two loops walk one \`B × B\` sub-matrix of \`P\` from corner to
corner before moving to the next, which is exactly what a block's small
memory can hold. One thing is still in the way: \`C\` has four dimensions and
no sub-matrix of it is small. So \`C\` is replaced by what it is made of — the
adjacency of each graph and the compatibility of their attributes — four
small factors that can each be fetched a sub-matrix at a time.

Reordering is where a programmer knows what a compiler does not: that these
iterations do not depend on each other. Compilers tile and reorder loops by
themselves when they can prove it is safe, and here they cannot.

## Step three: say it in the margin

The loops now have the right shape; what is left is to say which is which.
Two annotations, in the manner of OpenMP:

\`\`\`
#pragma hy parallel for [into(threads)] [reduction(OP:r)]
#pragma hy parallel fetch(m : sizes : origin : indexes [: permutation])
\`\`\`

\`parallel for\` alone spreads a loop across blocks; with \`into(threads)\`,
across the threads of a block. \`parallel fetch\` copies a sub-matrix of \`m\`
into the block's private memory and redirects every access inside the
statement to the copy, in whatever order of dimensions keeps the accesses
contiguous; if the statement writes to it, it is flushed back. It comes from
the \`peek\` of [the stream compiler](/research/parallel-tools/) of the first
half.

On a processor, \`into(threads)\` and \`fetch\` are ignored and the rest is
OpenMP. **The same source is the CPU version and the GPU version**, which is
what the whole thesis had been after: a serial program, still readable, with
its parallelism written beside it.

## One algorithm, two parallelisations

The method does not give one answer, and that turned out to be a result.

Large graphs :: The graph does not fit in a block. Tile it, as above, and let blocks work on different sub-matrices. It scales with the size of the graph — up to 1,024 vertices, where the serial version was estimated at forty-two days and not run — and is poor on small graphs, which do not have enough tiles to fill a card.
Many small graphs :: A whole graph fits in a block. So a block is a graph: the outer level is many matchings at once that never talk to each other, the inner level is one matching. That is a multi-zone program exactly, and it is the one [measured against OpenMP and one thread](/research/graph-matching/).

The common labelling of many graphs is a different algorithm, and the method
carried over: reordering to find loops that several parts of it shared and
merge them into tightly coupled kernels, and fission to split what did not
belong together. Of the tile sizes tried, \`B = 8\` was the best for CUDA.

## What it does not change

The result. Tiling and reordering move the same operations around; they do
not approximate, drop or relax anything, and the thesis reports the parallel
versions giving the same values as the serial one. That matters more than
the speed: a faster algorithm that answers slightly differently is a new
algorithm, and has to be validated again by the people who trusted the old
one. This one does not.
`},{file:"research/one-lock-at-a-time.md",markdown:`---
title: One lock at a time
summary: Making a database engine's core concurrent, one technique at a time, each with its number — including the right change that made everything twice as slow.
order: 5
---

# One lock at a time

For a year I worked inside a database engine. It was not mine — everything
that makes it a database was there when I arrived — and I worked all over it.
This page is about one part of that year: making its core concurrent. It ran
under one global lock, and that is worse than it sounds.

What follows is about the techniques, which are anybody's, and about what
each one bought, which I measured. How the engine is made inside is its
owners' business, and is not here.

## Where it started

The benchmark was a standard one: twenty queries, run by 1, 2, 4, 8 and 16
threads at once, three times each after a warm-up. Every figure on this page
is a speed-up against the same thing: the original engine, doing the same
work with one thread.

\`\`\`bars
speed-up, the original engine
= 1 :: one thread alone
2 threads :: 0.62
4 threads :: 0.67
8 threads :: 0.78
\`\`\`

Below one, all the way. Eight threads finished the work in a quarter more
time than one thread would have needed. A global lock does not merely fail to
help: the threads spend their time handing it to each other.

## Measure the locks, not the program

A profiler says where the time goes. It does not say who was waiting for
whom. So I put counters inside the locks themselves: how many times each was
taken, and how many of those found it already held.

The answer was not spread out. One lock was taken 93 million times in a run,
and 6.6% of those collided; every other lock sat near zero. That redirected
the whole effort.

## The steps, and what each one bought

Every step lived on a branch of its own and was run through the same
benchmark, so each has a number. Speed-up with eight threads:

\`\`\`bars
speed-up with eight threads, as each technique went in
= 1 :: the original with one thread
where it started: one global lock :: 0.77
scratch space of each thread's own :: 0.75
readers share, writers exclude :: 0.36 !
a lock replaced by atomic counters :: 2.41
the hottest path made lock-free :: 2.82
one lock split into many :: 3.34
the same, tuned :: 4.39
\`\`\`

Six techniques, and none of them is exotic.

Thread-local scratch space :: What every operation scribbles on while it works stops being shared. On its own it bought nothing, because nothing could run side by side yet to fight over it; it had to be there before anything else could work.
A shared/exclusive lock :: Queries read and rarely write, so the one lock becomes shared for readers and exclusive for writers, swapped in a critical section at a time.
Atomic counters :: Where a lock only protected a count going up and down, the count becomes atomic and the lock goes.
A lock-free hot path :: The operation every query performs thousands of times is rewritten around compare-and-swap: read the state, compute the new one, swap only if nobody moved it, and undo if a second thing it depends on changed meanwhile.
Finer granularity :: What is left of that lock is split: one lock for each part of the structure instead of one for all of it, so that two threads collide only when they want the same part.
Positional I/O, and ordered locking :: Files read and written by position, so that a file needs no lock just to keep its cursor still; and whenever several locks must be held at once, they are taken in order of memory address, which is the whole of deadlock avoidance when you can do it.

## The bar that went the wrong way

The marked bar is the one worth the page. Letting readers in together was
the right change, and it made everything twice as slow.

Why would letting readers in be slower than making them queue? Because of
what is underneath. With one exclusive lock at the door, a thread waits once,
and then finds every lock inside free: they are all taken and released with
nobody else asking, which costs almost nothing. Open the door and the readers
meet at every one of those inner locks instead, many times an operation, and
a thread that finds a lock taken gives up the processor and has to be woken
again. My notes of the time say it in a line: *each conflict means losing the
CPU*. One long queue had been traded for thousands of short ones, each with a
sleep in it.

The next bar says which lock it was. Replacing one inner lock by atomic
counters, and nothing else, took the same benchmark from 0.36 to 2.41. Nearly
every query had slowed down by the same factor under the shared lock, and
nearly every one came back with that single change.

A concurrent program is only as wide as its narrowest lock, and widening any
other makes the queue at that one longer. Coarse to fine is the right
direction, and the first step along it can cost you, until the last of the
narrow places is gone.

## Which lock

Which primitive, too, mattered more than I expected. I timed some twenty
combinations of mutex and lock — POSIX's, spins, futexes, condition
variables, with priority for readers or without — and on the same query with
eight threads the slowest took eight times as long as the fastest.

The lock I ended with has five states. Readers see three of them, and the
one called *closing* is where its fairness is: once a writer has asked, no
new reader gets in, so a stream of readers cannot starve it.

\`\`\`flow
free[Free] -->|a reader enters| shared[Shared\\nreaders counted in and out]
shared -->|a writer asks| closing[Shared, closing\\nno new readers]
closing -->|the last reader leaves| free
\`\`\`

Writers see the other two, and the same idea the other way round: whoever
asks while a writer is inside is remembered, and woken when it leaves.

\`\`\`flow
idle[Free] -->|a writer enters| exclusive[Exclusive]
exclusive -->|someone asks| awaited[Exclusive, awaited]
awaited -->|the writer leaves, and wakes them| idle
\`\`\`

## Write it down first

Before writing the lock-free path I wrote it down: every atomic step
numbered, each with its precondition and postcondition, under the invariants
of the whole, and drew its states. A first attempt, without that, had been
thrown away for its bugs. No test finds the interleaving that happens once a
week; an invariant does.

## Where it ended

The same benchmark, the same machine, at the end of the year:

\`\`\`bars
speed-up at the end of the year
= 1 :: the original with one thread
1 thread :: 1.24
2 threads :: 1.93
4 threads :: 3.07
8 threads :: 4.39
16 threads :: 4.42
\`\`\`

Faster than the original even with a single thread: a lock nobody contends
for still costs something, and most of them were gone.

From 0.78 to 4.39 at eight threads. The queries that mostly read went
further: 7.0 for the best of them, and above 6 for three more. One query of
the twenty never scaled at all: 0.83 at sixteen threads.

Sixteen threads added nothing over eight. And it was not finished when I
left: the most advanced version still had bugs open.

## The other half: tasks

Making an engine safe for threads is no use to someone who cannot write
threads. So its programming interface got a small framework of tasks: serial,
parallel and for-each, with cancellation, and exceptions that arrive where
the task was started. The benchmark's queries were rewritten on it to see
whether it held.

It is the same idea as [my thesis](/research/), which it sat in the middle of, and as
[the recipe I used for Raft](/teaching/raft/) four years later: the machine
being parallel is the easy part.
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
A simulator of a heterogeneous chip :: CellSim, a modular simulator of the Cell processor, built by two teams; I am third author of its papers. The accelerator cores are the other team's. Ours was the rest, and what I wrote is its base: the general-purpose core, which is an interpreter of its PowerPC instructions; the emulation of the operating system under it, where a system call runs natively and reaches into the simulated program's memory as it needs to; the loader that puts a compiled binary in that memory; and the protocol by which modules talk to each other purely as memory accesses, so that any of them can be connected to any other. A program compiled for the real chip ran on it unchanged: only the library of system calls and threads had to be swapped for mine. My thesis calls the protocol its best contribution. [The paper, at the BSC](https://www.bsc.es/ca/research-and-development/publications/cellsim-cell-processor-simulation-infrastructure).
A compiler for streams :: In the European project ACOTES, with NXP, IBM Haifa, INRIA and STMicroelectronics: annotations that turn a serial C program into a pipeline of tasks passing data along. Two clauses, \`input\` and \`output\`, are enough. I wrote the ACOTES phase of the BSC's Mercurium compiler — the compiler itself is not mine — with its runtime library and a tracing library. [The model, by its own examples](/research/streams-by-annotation/). [SAMOS 2007](https://doi.org/10.1007/978-3-540-73625-7_13), and the consortium's paper in the [International Journal of Parallel Programming](https://doi.org/10.1007/s10766-010-0132-7).

## In numbers

The Cyclops chip had 32 cores and 128 hardware threads, and caches small
enough that how the threads were laid out over them decided everything.

\`\`\`bars
speed-up on one Cyclops chip, as the thesis and its defence state it
= 32 :: one for each core
the earlier port of OpenMP, 128 threads :: 15
the NAS multi-zone benchmark SP, 127 threads in 16 groups :: 80 !
\`\`\`

Past the line, because a core there ran four threads at once and the
multi-zone programs kept every one of them fed. The fix for the cache
conflict alone, without touching the programs, was worth 10% to 70% done in
the runtime, and 40% to 100% as the change proposed to the hardware. The
programs that did not balance their work across threads stopped near 30
whatever was done for them, which is its own lesson.

On the cluster with no shared memory, the same annotated program came close
to its hand-written MPI version, and was far easier to write and keep. And
the stream compiler took an FM radio written as plain serial C and ran it 3.5
times faster as a pipeline, with nobody drawing the pipeline by hand; the
limit was one filter heavier than all the others.

## What connects them

Each piece took away something OpenMP assumed: that caches were large, that
memory was shared, that the cores were all alike, that the program was a loop
rather than a stream. What survived every time was the way of working: keep the serial program, keep it readable, and
say in the margin what may run together. The thesis calls it incremental
parallelisation, and its conclusions call it the corner stone of everything
else in it.

Next: [what all this was for](/research/graph-matching/).
`},{file:"research/streams-by-annotation.md",markdown:`---
title: Streams by annotation
summary: A serial C program becomes a pipeline of tasks by writing in its margin what goes in and what comes out. The model, by the examples of its own poster, and what the prototype measured.
order: 2
---

# Streams by annotation

A radio, a video decoder, a filter: a program that reads a value, works on
it, writes a result, and does it again for ever. Written in C it is a \`while\`
loop. Run on several cores it should be a pipeline, every stage on a core of
its own with the data flowing between them — and the usual way to get there
is to throw the C away and write it again in a streaming language.

The stream programming model of the European project ACOTES, which is [the
compiler I wrote](/research/parallel-tools/) at the Barcelona Supercomputing
Center, does it the way OpenMP does loops: **the program stays, and the
pipeline is written in its margin**. What follows are the examples of the
poster it was presented with at HiPEAC's summer school in 2008, which I
signed with Roger Ferrer, Xavier Martorell and Eduard Ayguadé.

## From plain C, one line at a time

A program that turns capitals into small letters:

\`\`\`c
int main()
{
  char c;

  while (fread(&c, sizeof(c), 1, stdin)) {

    if ('A' <= c && c <= 'Z')
      c= c - 'A' + 'a';

    fwrite(&c, sizeof(c), 1, stdout);
  }
  return 0;
}
\`\`\`

First say where the stream is. One line, and the program still runs exactly
as it did, because a compiler that does not know the annotation ignores it:

\`\`\`c
  #pragma acotes taskgroup
  while (fread(&c, sizeof(c), 1, stdin)) {
\`\`\`

Then say what the stages are, and what each takes in and gives out:

\`\`\`c
  #pragma acotes taskgroup
  while (fread(&c, sizeof(c), 1, stdin)) {

    #pragma acotes task input(c) output(c)
    if ('A' <= c && c <= 'Z')
      c= c - 'A' + 'a';

    #pragma acotes task input(c)
    fwrite(&c, sizeof(c), 1, stdout);
  }
\`\`\`

That is the whole of it. From \`input\` and \`output\` the compiler isolates each
task's code, works out who feeds whom, and builds the graph:

\`\`\`flow
read[the loop\\nfread] -->|c| lower[task\\nto lower case]
lower -->|c| write[task\\nfwrite]
\`\`\`

Three things run at once: the loop reading, the first task converting the
character before, the second writing the one before that. Add a suffix,
\`output(c:bp)\`, and the values travel in blocks instead of one at a time,
which is where most of the speed of a stream is.

The point of doing it a line at a time is that the program works after every
line. It can be debugged serially, the annotations can be switched off, and
the code that was already written and trusted is still the code.

## A task with a memory

Real filters remember things. A task's variables are its own, and the
annotation says how they start and how they end:

\`\`\`c
  #pragma acotes task input(v) output(o) \\
          copyinstate(stats) copyoutstate(stats) \\
          initializestate(buff) finalizestate(buff)
  {
    o= compute_buffer(buff, v);
    stats++;
  }
\`\`\`

And a filter that needs the last few values does not have to keep them
itself. \`peek\` gives the task a window on its input stream, so the task stays
without state and nothing is copied:

\`\`\`c
  #pragma acotes task copyinstate(i, a[3]) input(v) output(o)
  {
    #pragma acotes peek(v;a)
    {
      a[2]= a[1];  a[1]= a[0];  a[0]= v;
    }
    o= a[0]*.25 + a[1]*.5 + a[2]*.25;
  }
\`\`\`

## Splitting a task that is too slow

A pipeline runs at the speed of its slowest stage. When one task is the
bottleneck, it is split: \`team(3)\` makes three instances of it, a replicator
deals the input out among them and a merger puts the results back in order.

\`\`\`c
  #pragma acotes task team(3) copyinstate(a[3]) inputreplicate(c) output(o)
  {
    #pragma acotes teamreplicate
    h(c, a)

    o= ffd(c, a);
  }
\`\`\`

\`\`\`flow
read[the loop\\nfread] --> deal[replicator]
deal --> one[ffd · instance 1]
deal --> two[ffd · instance 2]
deal --> three[ffd · instance 3]
one --> merge[merger]
two --> merge
three --> merge
merge --> write[task\\nfwrite]
\`\`\`

The difficulty is that the task has state, and three copies of a task with
state compute three different things. \`teamreplicate\` marks the part that
updates the state, and that part runs in *every* instance for *every* value,
so each copy's state stays exactly what the single task's would have been;
only the expensive part is shared out. Data parallelism, from a task that was
not data-parallel.

A loop that is already in the program can be used the same way:
\`forreplicate(i)\` turns its iterations into instances, and a \`port\` says
which elements of an array go to which. And tasks that are not in a pipeline
at all — a microphone being played while a keyboard changes the volume — can
share a value with \`async\`, \`update\` and \`check\`, the programmer deciding
when it is looked at.

## What it measured

The prototype compiler and its runtime ran on a machine with four cores. They
were a proof that the model could be compiled, not an attempt to be fast, and
the numbers should be read that way.

\`\`\`bars
speed-up of the FM radio on four cores
= 4 :: one for each core
tasks and pipeline only :: 3.5
\`\`\`

An FM radio written as plain C, annotated, and turned into a stream program
by the compiler with nobody drawing the graph by hand: 3.5 times faster on
four cores. What held it back was one filter much heavier than the rest, the
FFD. Give that one task a \`team\` and, in the thesis's words, the radio *is
able to use effectively all four available cores*. A Wi-Fi 802.11a receiver
scaled slightly better than the number of cores.

Replicating the FFD alone scaled poorly with the radio's own parameters — the
runtime's overhead was larger than the work — and well once the filter was
made heavier, as well as the same filter did in StreamIt, the streaming
language it was being compared with. Which is the honest summary of the whole
model: the same three kinds of parallelism as a language designed for them —
task, pipeline and data — from a C program that was never rewritten.

The FM radio, taken from GNU Radio's examples and stripped down to pure
serial C, is one of the tools the thesis released. The
[compiler](https://github.com/drpicox/acotescc), its
[runtime](https://github.com/drpicox/acolib) and the
[tracing library](https://github.com/drpicox/mintaka) are public, under the GPL.
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
summary: A software laboratory where the specification is a blog post that compiles into tests, and a consensus algorithm taught through a recipe for concurrency anyone can follow.
order: 5
---

# Teaching

I have taught at three universities. The first time was in 2002, through the
UPC's foundation: computing for people between 65 and 97 years old. The other
two are here. In both the subject was the part of software
that a lecture cannot give — what happens when several people, or several
threads, touch the same thing at once — and both times I ended up building
what the students stood on, so that the difficulty they met was the one the
course was about and not three others.

- [The post comes first](/teaching/software-lab/) -- Tecnocampus, six autumns, 2017 to 2022. *Laboratori de Software 2*: teams building a game the way software is built, where a feature starts as a blog post in markdown that compiles into a test for the server and a test for the client, the writer of a post is never its coder, and the grades are read from the repository's history.
- [Raft, and a recipe for concurrency](/teaching/raft/) -- UOC, the distributed systems laboratory, 2013. A consensus algorithm as the assignment, the year before its paper was presented, and the three steps -- copy inside the guard, work outside it, check before writing -- that let someone writing their first concurrent program get it right.

At the Tecnocampus, between 2017 and 2023, I designed three subjects from
scratch -- *Enginyeria del Software III*, *Laboratori de Software 2* and
*Arquitectura de Serveis* -- with a first-year lab, a front-end course and
final-project tutoring around them.

Use \`ls\` to see them, or \`cat software-lab\` to read one here.
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

Here it is in the leader's heartbeat, shortened but in the code's own words
and with its own comments:

\`\`\`java
synchronized (GUARD) {
    // only leaders perform heartbeats
    if (state != RaftState.LEADER) return;

    // gather common info (from iteration to iteration may become rotten)
    term = persistentState.getCurrentTerm();
    prevLogIndex = nextIndexes.get(otherServer) - 1;
    prevLogTerm = persistentState.getTerm(prevLogIndex);
    entries = prevLogIndex > -1 ? persistentState.getLogEntries(prevLogIndex+1) : new ArrayList<LogEntry>();
    commitIndex = this.commitIndex;
}

// send the message (and listen the answer) in concurrent
executorQueue.execute(new Runnable() {
    public void run() {
        AppendEntriesResponse response = RMIsd.getInstance()
            .appendEntries(otherServer, term, leaderId, prevLogIndex, prevLogTerm, entries, commitIndex);

        // execute inside the guard, any sent data could be changed and must be reevaluated
        synchronized (GUARD) {
            // still leader?
            if (state != RaftState.LEADER) return;
            // term changed?
            if (term != persistentState.getCurrentTerm()) return;
            // prevLogIndex changed?
            if (nextIndexes.get(otherServer) - 1 != prevLogIndex) return;

            // … only now is anything written
        }
    }
});
\`\`\`

That is the whole of it. The two comments that matter are the code's own: *gather
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
`},{file:"teaching/software-lab.md",markdown:`---
title: The post comes first
summary: Six autumns of Laboratori de Software 2 at Tecnocampus, and the platform built for it — posts in markdown compiled into tests for server and client, the server's answers replayed to the client, and a grader that read the repository.
order: 1
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

This is the client's test for that post, exactly as the 2022 template wrote it,
each step beside the line it came from:

\`\`\`js
// !!! IMPORTANT !!!
// This test file is AUTOGENERATED by yarn create-tests
// DO NOT MODIFY manually. Keep running yarn create-tests instead,
// while editing your posts.

test("2022-07-15_hello_blog.md", async () => {
  await runBeforeTestStarts(
    "2022-07-15_hello_blog",
    "ee5216b03b56d4c41fe753c274af3c88"
  );

  const context = new Post_20220715_HelloBlog_Context();
  await context.beforeTest();

  // ## How to use the blog
  await context.goToTheBlogSection(); //                            // * Go to the blog section,
  await context.youShouldSeeAListOfPosts(); //                      // * You should see a list of posts,
  await context.theLastPostTitleShouldBeSThisPost("Hello Blog"); // // * The last post title should be "Hello Blog", this post
  await context.goToTheSPost("Hello Blog"); //                      // * Go to the "Hello Blog" post,
  await context.youShouldSeeTheSPost("Hello Blog"); //              // * You should see the "Hello Blog" post
  await context.thePostShouldContainSWhichIsHere("this text"); //   // * The post should contain "this text", which is here.

  await context.afterTest();
  await runWhenTestSuccessful();
});
\`\`\`

A quoted word in a step becomes an argument, and the long number is the
post's checksum. The Java test for the server is the same list of calls.

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
`}],Dn="---";function Ji(e){return(/^"(.*)"$/.exec(e)??/^'(.*)'$/.exec(e))?.[1]??e}function Ui(e){const t=e.replace(/\r\n?/g,`
`).split(`
`);if(t[0]?.trim()!==Dn)return{fields:{},body:e.trim()};const n=t.indexOf(Dn,1);if(n<0)return{fields:{},body:e.trim()};const a={};for(const o of t.slice(1,n)){const s=o.indexOf(":");s<=0||(a[o.slice(0,s).trim()]=Ji(o.slice(s+1).trim()))}return{fields:a,body:t.slice(n+1).join(`
`).trim()}}function Yi(e){const n=e.replace(/\.md$/,"").replace(/(^|\/)index$/,"");return n===""?"/":`/${n}/`}function zi(e){if(e==="/")return null;const t=e.slice(0,-1);return t.slice(0,t.lastIndexOf("/")+1)}function Rn(e){if(e==="/")return"/";const t=e.slice(0,-1);return t.slice(t.lastIndexOf("/")+1)}function Ki(e){const{fields:t,body:n}=Ui(e.markdown),a=Yi(e.file);return{file:e.file,route:a,parent:zi(a),name:Rn(a),title:t.title??Rn(a),summary:t.summary??"",order:Number(t.order??"100"),body:n,fields:t}}function Ln(e,t){return e.order-t.order||e.name.localeCompare(t.name)}class Vi{byRoute;constructor(t){const n=t.map(Ki).sort(Ln);this.byRoute=new Map(n.map(a=>[a.route,a]))}get pages(){return[...this.byRoute.values()]}at(t){return this.byRoute.get(t)}childrenOf(t){return this.pages.filter(n=>n.parent===t).sort(Ln)}trailTo(t){const n=this.at(t);return n?n.parent===null?[n]:[...this.trailTo(n.parent),n]:[]}}const we=new Vi(qi);function Fn(){const e=[...va,...ge.flatMap(c=>c.commands??[])],t=Object.assign({},...ge.map(c=>c.apps??{})),a=(c=>c.endsWith("/")?c:`${c}/`)(window.location.pathname),o=we.at(a);let s=In(t,{site:we}),r=null;const i=xi(we,(c,d)=>{s(),s=In(t,{site:we});for(const m of ge)m.arrive?.(c);d||r?.moveTo(c.route)});if(r=_i(we,o?a:"/",{moveTo:c=>i(c,{keep:!0}),clearPage:()=>{s(),s=()=>{},document.querySelector("main")?.replaceChildren()},commands:e}),o)for(const c of ge)c.arrive?.(o);const l={run:c=>r?.run(c)};for(const c of ge)c.install?.(l)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Fn):Fn();
