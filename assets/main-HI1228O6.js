function mr(t){const e=new Map,n=new Map;return t.changes.map(a=>{for(const s of a.removed)e.delete(s);for(const[s,o,r,i,l]of a.added)e.set(s,l?{id:s,path:o,lines:r,test:i,typesOnly:l}:{id:s,path:o,lines:r,test:i});for(const[s,o]of a.moved){const r=e.get(s);r&&e.set(s,{...r,path:o})}for(const[s,o]of a.resized){const r=e.get(s);r&&e.set(s,{...r,lines:o})}for(const[s,o]of a.unlinked)n.delete(`${s}>${o}`);for(const[s,o,r]of a.linked)n.set(`${s}>${o}`,r);return{modules:[...e.values()].sort((s,o)=>s.id-o.id),dependencies:[...n].map(([s,o])=>{const[r=0,i=0]=s.split(">").map(Number);return{from:r,to:i,typeOnly:o}}).sort((s,o)=>s.from-o.from||s.to-o.to)}})}function Be(t){const e=t.split("/");return e.length<=2?t:`${e[0]}/${e[1]}`}function pr(t){const e=new Map;for(const{from:h,to:d}of t.dependencies){const[c,u]=[Be(h),Be(d)];c!==u&&(e.has(c)||e.set(c,new Set),e.has(u)||e.set(u,new Set),e.get(c)?.add(u))}let n=0;const a=new Map,s=new Map,o=[],r=new Set,i=[],l=h=>{a.set(h,n),s.set(h,n),n+=1,o.push(h),r.add(h);for(const c of e.get(h)??[])a.has(c)?r.has(c)&&s.set(h,Math.min(s.get(h)??0,a.get(c)??0)):(l(c),s.set(h,Math.min(s.get(h)??0,s.get(c)??0)));if(s.get(h)!==a.get(h))return;const d=[];for(let c=o.pop();c!==void 0&&(r.delete(c),d.push(c),c!==h);c=o.pop());d.length>1&&i.push(d.sort())};for(const h of e.keys())a.has(h)||l(h);return i.sort((h,d)=>(h[0]??"").localeCompare(d[0]??""))}const We=12,In=6,fr=14,mn=14,En=12,Ji=14,is=40,ot=10,Ki=16,Vi=t=>Math.min(6,2.2+Math.sqrt(t)/4),gr=t=>t.split("/").pop()?.replace(/\.ts$/,"")??t,Bt=t=>t.includes("/")?t.split("/")[0]??t:"src";function ls(t,e){const n=new Map,a=s=>{const o=n.get(s);if(o!==void 0)return o;n.set(s,0);const r=Math.max(-1,...[...e.get(s)??[]].map(a))+1;return n.set(s,r),r};for(const s of t)a(s);return n}function Xi(t,e){const n=new Map;for(const{from:a,to:s,typeOnly:o}of t.dependencies){const[r,i]=[e.get(a),e.get(s)];if(r===void 0||i===void 0||r===i)continue;const l=n.get(`${r}>${i}`)??{from:r,to:i,count:0,typeOnly:!0};n.set(`${r}>${i}`,{...l,count:l.count+1,typeOnly:l.typeOnly&&o})}return[...n.values()].sort((a,s)=>a.from.localeCompare(s.from)||a.to.localeCompare(s.to))}function Zi(t,e,n){const a=new Map(t.map(u=>[u,u]));for(const u of n)for(const p of u)a.set(p,u[0]??p);const s=u=>a.get(u)??u,o=new Map,r=new Map;for(const{from:u,to:p}of e){const[m,f]=[Bt(u),Bt(p)];m!==f?o.set(m,(o.get(m)??new Set).add(f)):s(u)!==s(p)&&r.set(s(u),(r.get(s(u))??new Set).add(s(p)))}const i=[...new Set(t.map(Bt))],l=ls(i,o);i.sort((u,p)=>(l.get(p)??0)-(l.get(u)??0)||u.localeCompare(p));const h=ls([...new Set(t.map(s))],r),d=i.flatMap(u=>{const p=t.filter(f=>Bt(f)===u);return[...new Set(p.map(f=>h.get(s(f))??0))].sort((f,y)=>y-f).map(f=>({band:u,boxes:p.filter(y=>(h.get(s(y))??0)===f).sort()}))}),c=new Map;for(const u of d){const p=m=>{const f=e.filter(y=>y.to===m&&c.has(y.from)).map(y=>c.get(y.from)??.5);return f.length?f.reduce((y,w)=>y+w,0)/f.length:.5};u.boxes.sort((m,f)=>p(m)-p(f)||m.localeCompare(f)),u.boxes.forEach((m,f)=>c.set(m,f/Math.max(1,u.boxes.length-1)))}return d}function jn(t,e){const n=Math.max(1,Math.ceil(Math.sqrt(e*2.2))),a=n*mn;return{columns:n,inner:a,width:Math.max(a+In*2,gr(t).length*6+In*2),height:fr+Math.ceil(e/n)*mn+In}}function Qi(t,e){const n=s=>{const o=e.get(s);return o?o.x+o.width/2:0},a=(s,o,r)=>s?s.x+s.width*(o+1)/(r+1):0;return t.map(s=>{const[o,r]=[e.get(s.from),e.get(s.to)],i=t.filter(h=>h.from===s.from).sort((h,d)=>n(h.to)-n(d.to)),l=t.filter(h=>h.to===s.to).sort((h,d)=>n(h.from)-n(d.from));return{...s,x1:a(o,i.indexOf(s),i.length),y1:o?o.y+o.height:0,x2:a(r,l.indexOf(s),l.length),y2:r?r.y:0}})}function wr(t,{tests:e=!1,width:n=1100}={}){const a=t.modules.filter(f=>e||!f.test),s=new Map(a.map(f=>[f.id,f])),o=new Map(a.map(f=>[f.id,Be(f.path)])),r=new Map;for(const f of[...a].sort((y,w)=>y.path.localeCompare(w.path))){const y=Be(f.path);r.set(y,[...r.get(y)??[],f])}const i=Xi(t,o),l=pr({dependencies:t.dependencies.flatMap(({from:f,to:y,typeOnly:w})=>{const[v,b]=[s.get(f),s.get(y)];return v&&b?[{from:v.path,to:b.path,typeOnly:w}]:[]})}),h=new Set(l.flat()),d=Zi([...r.keys()],i,l),c=[],u=new Map,p=[];let m=We;return d.forEach((f,y)=>{const w=y===0||d[y-1]?.band!==f.band,v=d[y+1]?.band!==f.band;w&&(c.push({name:f.band,x:We,y:m,width:n-We*2,height:0}),m+=Ki+ot);const b=n-(We+ot)*2,T=[[]];let I=0;for(const k of f.boxes){const A=jn(k,r.get(k)?.length??0).width;I>0&&I+A>b&&(T.push([]),I=0),T[T.length-1]?.push(k),I+=A+En}let M=0;if(T.forEach((k,A)=>{A>0&&(m+=M+Ji);const C=k.map(S=>jn(S,r.get(S)?.length??0)),O=C.reduce((S,L)=>S+L.width,0)+En*(k.length-1);let j=We+ot+(b-O)/2;M=0,k.forEach((S,L)=>{const $=C[L]??jn(S,0);u.set(S,{name:S,label:gr(S),x:j,y:m,width:$.width,height:$.height,rank:d.length-y,cyclic:h.has(S)});const E=j+($.width-$.inner)/2;(r.get(S)??[]).forEach((R,D)=>{const[B,H]=[D%$.columns,Math.floor(D/$.columns)];p.push({id:R.id,path:R.path,box:S,x:E+(B+.5)*mn,y:m+fr+(H+.5)*mn,radius:Vi(R.lines),test:R.test,typesOnly:R.typesOnly??!1})}),j+=$.width+En,M=Math.max(M,$.height)})}),m+=M,v){const k=c[c.length-1];k&&(c[c.length-1]={...k,height:m+ot-k.y}),m+=ot}m+=is}),{width:n,height:m-is+We,bands:c,boxes:[...u.values()],balls:p,links:Qi(i,u)}}function el(t,e=!1){const n=t.modules.filter(s=>!e||!s.test),a=new Map(n.map(s=>[s.id,s.path]));return{modules:n.map(({path:s,lines:o,test:r,typesOnly:i=!1})=>({path:s,lines:o,test:r,typesOnly:i})),dependencies:t.dependencies.flatMap(({from:s,to:o,typeOnly:r})=>{const[i,l]=[a.get(s),a.get(o)];return i!==void 0&&l!==void 0?[{from:i,to:l,typeOnly:r}]:[]})}}function yr(t){const e=new Set(t.modules.filter(n=>n.test).map(n=>n.id));return new Set(t.dependencies.filter(n=>e.has(n.from)&&!e.has(n.to)).map(n=>n.to))}function pn(t){const e=el(t,!0),n=new Set(t.modules.filter(s=>!s.test&&!s.typesOnly).map(s=>s.id)),a=e.dependencies.filter(s=>Be(s.from)!==Be(s.to));return{files:e.modules.length,tests:t.modules.length-e.modules.length,lines:e.modules.reduce((s,o)=>s+o.lines,0),boxes:new Set(e.modules.map(s=>Be(s.path))).size,arrows:e.dependencies.length,crossing:a.length,typeOnly:e.dependencies.filter(s=>s.typeOnly).length,inCycles:pr(e).flat().length,testable:n.size,tested:[...yr(t)].filter(s=>n.has(s)).length}}const tl={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function x(t){return t.replace(/[&<>"]/g,e=>tl[e]??e)}const nl=new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"long",year:"numeric",timeZone:"Europe/Madrid"}),rt=(t,e,n=`${e}s`)=>`${t} ${t===1?e:n}`;function br(t,e){const n=[`${rt(e.files,"file")} in ${rt(e.boxes,"box","boxes")}, ${rt(e.tests,"test")}`,`${rt(e.crossing,"arrow")} between boxes, ${e.typeOnly} of all ${e.arrows} onto a type`,`a test reaches ${e.tested} of the ${e.testable} files with something to test`,e.inCycles?`${rt(e.inCycles,"box","boxes")} in a circle`:"no boxes in a circle"].join(" · ");return`<code>${x(t.sha)}</code> ${nl.format(new Date(t.date))} — ${x(t.subject)}<br><span class="measured">${n}</span>`}const q=t=>Math.round(t*10)/10;function al({x1:t,y1:e,x2:n,y2:a}){const s=Math.max(18,(a-e)/2);return`M${q(t)} ${q(e)} C${q(t)} ${q(e+s)} ${q(n)} ${q(a-s)} ${q(n)} ${q(a)}`}function sl(t){const e=t.bands.map(r=>`<g class="band" data-band="${x(r.name)}"><rect x="${q(r.x)}" y="${q(r.y)}" width="${q(r.width)}" height="${q(r.height)}" rx="6"/><text x="${q(r.x+8)}" y="${q(r.y+12)}">${x(r.name)}</text></g>`).join(""),n=t.links.map(r=>{const i=q(Math.min(4,.8+Math.log2(r.count)*.7));return`<path class="link${r.typeOnly?" type-only":""}" stroke-width="${i}" d="${al(r)}" marker-end="url(#arrowhead)"><title>${x(`${r.from} → ${r.to}: ${r.count}`)}</title></path>`}).join(""),a=t.boxes.map(r=>`<g class="box${r.cyclic?" cyclic":""}" data-box="${x(r.name)}"><rect x="${q(r.x)}" y="${q(r.y)}" width="${q(r.width)}" height="${q(r.height)}" rx="4"/><text x="${q(r.x+6)}" y="${q(r.y+10)}">${x(r.label)}</text></g>`).join(""),s=t.balls.map(r=>`<circle class="ball${r.test?" test":""}" cx="${q(r.x)}" cy="${q(r.y)}" r="${q(r.radius)}"><title>${x(r.path)}</title></circle>`).join(""),o=`${t.boxes.length} boxes, ${t.balls.length} files, ${t.links.length} arrows between boxes`;return`<svg class="architecture" viewBox="0 0 ${t.width} ${q(t.height)}" role="img" aria-label="${o}"><defs><marker id="arrowhead" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z"/></marker></defs><g class="bands">${e}</g><g class="links">${n}</g><g class="boxes">${a}</g><g class="balls">${s}</g></svg>`}const Cn=600,it=60,Ee=4;function vr(t,e){const n=i=>Ee+i/Math.max(1,t.length-1)*(Cn-Ee*2),a=(i,l)=>{const h=Math.max(1,...t.map(i)),d=t.map((c,u)=>`${n(u).toFixed(1)},${(it-Ee-i(c)/h*(it-Ee*2)).toFixed(1)}`).join(" ");return`<polyline class="${l}" points="${d}"/>`},s=(Cn-Ee*2)/Math.max(1,t.length-1),o=t.map((i,l)=>i.inCycles?`<rect class="cycle" x="${(n(l)-s/2).toFixed(1)}" y="0" width="${s.toFixed(1)}" height="${it}"/>`:"").join(""),r=n(e).toFixed(1);return`<svg class="sparks" viewBox="0 0 ${Cn} ${it}" role="img" aria-label="Files and arrows between boxes, commit by commit">${o}${a(i=>i.files,"files")}${a(i=>i.crossing,"crossing")}<line class="now" x1="${r}" x2="${r}" y1="0" y2="${it}"/><text x="${Ee}" y="11" class="files">files</text><text x="${Ee+34}" y="11" class="crossing">arrows between boxes</text></svg>`}function ol(t,e){const n=mr(t),[a,s]=[n[e],t.commits[e]];return!a||!s?"":`<figure class="architecture-figure">${sl(wr(a))}<figcaption>${br(s,pn(a))}</figcaption>${vr(n.map(pn),e)}</figure>`}const rl=t=>{const e=JSON.parse(t("/data/architecture.json"));return ol(e,e.commits.length-1)};function g(t,e={},...n){const a=document.createElement(t);for(const[s,o]of Object.entries(e))o===void 0||o===!1||(typeof o=="function"?a.addEventListener(s.slice(2).toLowerCase(),o):o===!0?a.setAttribute(s,""):a.setAttribute(s,String(o)));for(const s of n)s==null||s===!1||a.append(s);return a}function vn(t){let e=!0;if(typeof IntersectionObserver!="function")return{onScreen:()=>e,stop:()=>{}};const n=new IntersectionObserver(a=>{for(const s of a)e=s.isIntersecting},{rootMargin:"100px"});return n.observe(t),{onScreen:()=>e,stop:()=>n.disconnect()}}const hs=90,cs=15;function ds(t,e,n,a){const s=Math.min(a,.03333333333333333);t.vx+=((e-t.x)*hs-t.vx*cs)*s,t.vy+=((n-t.y)*hs-t.vy*cs)*s,t.x+=t.vx*s,t.y+=t.vy*s}const il=900,ll=34,hl=.02,us=.004,ms=.82;function cl(t,e,{width:n,height:a}){const s=new Float64Array(t.length),o=new Float64Array(t.length);for(let r=0;r<t.length;r+=1){const i=t[r];for(let l=r+1;l<t.length;l+=1){const h=t[l];let d=i.x-h.x,c=i.y-h.y;d===0&&c===0&&([d,c]=[r%7-3||1,l%5-2||1]);const u=Math.max(4,d*d+c*c),p=il/u,m=Math.sqrt(u);s[r]=(s[r]??0)+d/m*p,o[r]=(o[r]??0)+c/m*p,s[l]=(s[l]??0)-d/m*p,o[l]=(o[l]??0)-c/m*p}}for(const[r,i]of e){const[l,h]=[t[r],t[i]];if(!l||!h)continue;const d=h.x-l.x,c=h.y-l.y,u=Math.hypot(d,c)||1,p=(u-ll)*hl;s[r]=(s[r]??0)+d/u*p,o[r]=(o[r]??0)+c/u*p,s[i]=(s[i]??0)-d/u*p,o[i]=(o[i]??0)-c/u*p}t.forEach((r,i)=>{r.vx=(r.vx+(s[i]??0)+(n/2-r.x)*us)*ms,r.vy=(r.vy+(o[i]??0)+(a/2-r.y)*us)*ms,r.x=Math.min(n,Math.max(0,r.x+r.vx)),r.y=Math.min(a,Math.max(0,r.y+r.vy))})}const On=760,ps=260,dl=10,Ae=(t,e,n,a=8)=>t+(e-t)*(1-Math.exp(-a*n)),ul=(t,e,n)=>{t.x=Ae(t.x,e.x,n),t.y=Ae(t.y,e.y,n),t.width=Ae(t.width,e.width,n),t.height=Ae(t.height,e.height,n)};class ml{constructor(e,n){this.width=e,this.still=n}width;still;balls=new Map;boxes=new Map;bands=new Map;layout=null;mode="boxes";time=0;boxAlpha=1;fileLinks=[];hovered={};height=On;get wanted(){const e=this.layout?.height??On;return this.mode==="tangle"?Math.max(e,On):e}reached=null;coverage=null;show(e,n,{untangling:a=!1,reached:s=null,coverage:o=null}={}){this.reached=s,this.coverage=o,this.layout=n,(this.still||this.balls.size===0)&&(this.height=this.wanted);const r=Math.max(0,...n.boxes.map(c=>c.rank)),i=new Map(n.boxes.map(c=>[c.name,c.rank])),l=new Set;for(const c of n.balls){l.add(c.id);const u=this.balls.get(c.id),p=a?(r-(i.get(c.box)??0))*.07+Math.random()*.12:0;if(u)Object.assign(u,{leaving:!1,box:c.box,path:c.path,test:c.test,typesOnly:c.typesOnly,radius:c.radius,wait:p});else{const[m,f]=this.mode==="tangle"?[this.width/2+(Math.random()-.5)*80,this.height/2+(Math.random()-.5)*80]:[c.x,c.y];this.balls.set(c.id,{id:c.id,body:{x:m,y:f,vx:0,vy:0},size:{x:this.still?c.radius:0,y:0,vx:0,vy:0},radius:c.radius,alpha:this.still?1:0,leaving:!1,box:c.box,path:c.path,test:c.test,typesOnly:c.typesOnly,wait:p,trail:[],bornAt:this.time})}}for(const[c,u]of this.balls)l.has(c)||(u.leaving=!0);const h=(c,u)=>{const p=new Set(u.map(m=>m.name));for(const m of u){const f={x:m.x,y:m.y,width:m.width,height:m.height},y=c.get(m.name);y?Object.assign(y,{target:f,leaving:!1,cyclic:m.cyclic??!1,label:m.label??m.name}):c.set(m.name,{...f,target:f,label:m.label??m.name,alpha:this.still?1:0,leaving:!1,cyclic:m.cyclic??!1})}for(const[m,f]of c)p.has(m)||(f.leaving=!0)};h(this.boxes,n.boxes),h(this.bands,n.bands);const d=new Map(n.balls.map((c,u)=>[c.id,u]));this.fileLinks=e.dependencies.flatMap(({from:c,to:u})=>d.has(c)&&d.has(u)?[[c,u]]:[])}setMode(e){this.mode=e}step(e){this.time+=e,this.height=this.still?this.wanted:Ae(this.height,this.wanted,e,6);const n=new Map(this.layout?.balls.map(a=>[a.id,a])??[]);if(this.boxAlpha=Ae(this.boxAlpha,this.mode==="boxes"?1:0,e,5),this.mode==="tangle"){const a=[...this.balls.entries()].filter(([,r])=>!r.leaving),s=new Map(a.map(([r],i)=>[r,i])),o=this.fileLinks.flatMap(([r,i])=>{const[l,h]=[s.get(r),s.get(i)];return l!==void 0&&h!==void 0?[[l,h]]:[]});cl(a.map(([,r])=>r.body),o,{width:this.width,height:this.height})}for(const[a,s]of this.balls){const o=n.get(a);this.mode==="boxes"&&o&&(s.wait>0?s.wait-=e:this.still?Object.assign(s.body,{x:o.x,y:o.y,vx:0,vy:0}):ds(s.body,o.x,o.y,e)),ds(s.size,s.leaving?0:s.radius,0,e),s.alpha=Ae(s.alpha,s.leaving?0:1,e,6);const r=Math.hypot(s.body.vx,s.body.vy);r>ps&&this.mode==="boxes"&&s.trail.push({x:s.body.x,y:s.body.y}),(s.trail.length>dl||r<ps&&s.trail.length)&&s.trail.shift(),s.leaving&&s.alpha<.02&&this.balls.delete(a)}for(const a of[this.boxes,this.bands])for(const[s,o]of a)this.still?Object.assign(o,o.target):ul(o,o.target,e),o.alpha=Ae(o.alpha,o.leaving?0:1,e,6),o.leaving&&o.alpha<.02&&a.delete(s)}hit(e,n){for(const a of this.balls.values())if(Math.hypot(a.body.x-e,a.body.y-n)<=Math.max(5,a.size.x+2))return{path:a.path,box:a.box};if(this.mode==="boxes"){for(const[a,s]of this.boxes)if(e>=s.x&&e<=s.x+s.width&&n>=s.y&&n<=s.y+s.height)return{box:a}}return{}}draw(e,n){e.clearRect(0,0,this.width,this.height),e.lineCap="round";const a=.5+.5*Math.sin(this.time*4);e.font="bold 10px ui-monospace, Menlo, monospace";for(const l of this.bands.values())e.globalAlpha=l.alpha*this.boxAlpha*.9,e.setLineDash([2,4]),e.strokeStyle=n.rule,e.lineWidth=1,e.beginPath(),e.roundRect(l.x,l.y,l.width,l.height,6),e.stroke(),e.setLineDash([]),e.fillStyle=n.dim,e.fillText(l.label,l.x+8,l.y+12);e.font="9px ui-monospace, Menlo, monospace";for(const[l,h]of this.boxes){const d=this.hovered.box===l;e.globalAlpha=h.alpha*this.boxAlpha,e.fillStyle=n.sunken,e.strokeStyle=h.cyclic?n.warn:d?n.accent:n.rule,e.lineWidth=h.cyclic?1.5+a*1.5:d?1.5:1,h.cyclic&&(e.shadowColor=n.warn,e.shadowBlur=6+a*10),e.beginPath(),e.roundRect(h.x,h.y,h.width,h.height,4),e.fill(),e.stroke(),e.shadowBlur=0,e.fillStyle=d?n.accent:n.dim,e.fillText(h.label,h.x+6,h.y+10)}const s=this.hovered.path?[...this.balls.values()].find(l=>l.path===this.hovered.path):void 0,o=s?this.fileLinks.filter(([l])=>l===s.id).map(([,l])=>l):[],r=s?this.fileLinks.filter(([,l])=>l===s.id).map(([l])=>l):[],i=new Set([...s?[s.id]:[],...o,...r]);this.drawLinks(e,n,s!==void 0),s&&this.drawFileArrows(e,n,s,o,r);for(const l of this.balls.values()){const h=Math.max(0,l.size.x);if(l.trail.length>1){e.strokeStyle=n.accent;for(let f=1;f<l.trail.length;f+=1)e.globalAlpha=f/l.trail.length*.35*l.alpha,e.lineWidth=h*(f/l.trail.length)*1.4,e.beginPath(),e.moveTo(l.trail[f-1].x,l.trail[f-1].y),e.lineTo(l.trail[f].x,l.trail[f].y),e.stroke()}const d=this.time-l.bornAt;d<.8&&!this.still&&(e.globalAlpha=(1-d/.8)*.6,e.strokeStyle=n.accent,e.lineWidth=1.2,e.beginPath(),e.arc(l.body.x,l.body.y,h+d*22,0,Math.PI*2),e.stroke());const c=this.hovered.path===l.path,u=s!==void 0&&!i.has(l.id),p=this.reached!==null&&!l.test&&!l.typesOnly&&!this.reached.has(l.id),m=!l.test&&!l.typesOnly?this.coverage?.get(l.path):void 0;if(e.globalAlpha=l.alpha*(u?.22:1),e.beginPath(),e.arc(l.body.x,l.body.y,c?h+2:Math.max(0,p||m!==void 0?h-.6:h),0,Math.PI*2),m!==void 0)e.strokeStyle=m>=99.5?n.accent:n.warn,e.lineWidth=1.2,e.stroke(),e.fillStyle=n.accent,e.beginPath(),e.moveTo(l.body.x,l.body.y),e.arc(l.body.x,l.body.y,Math.max(0,h-.6),-Math.PI/2,-Math.PI/2+Math.PI*2*m/100),e.closePath(),e.fill();else if(l.test){const f=Math.max(0,(c?h+2:h)*1.6);e.beginPath(),e.rect(l.body.x-f/2,l.body.y-f/2,f,f),e.fillStyle=n.test,e.fill()}else p?(e.strokeStyle=n.warn,e.lineWidth=1.2,e.stroke()):(e.fillStyle=l.test?n.soft:n.accent,e.fill());c&&(e.strokeStyle=n.ink,e.lineWidth=1.5,e.stroke())}if(s){const l=this.coverage?.get(s.path),h=l!==void 0&&!s.test&&!s.typesOnly?` · tests run ${Math.round(l)}% of it`:"";this.label(e,n,`${s.path}   needs ${o.length} · needed by ${r.length}${h}`,s.body.x,s.body.y-10)}e.globalAlpha=1}drawFileArrows(e,n,a,s,o){const r=(i,l,h,d)=>{const[c,u]=[l.body.x-i.body.x,l.body.y-i.body.y],p=Math.hypot(c,u)||1,[m,f]=[c/p,u/p],y={x:l.body.x-m*(l.size.x+2),y:l.body.y-f*(l.size.x+2)},w={x:(i.body.x+y.x)/2-f*p*.12,y:(i.body.y+y.y)/2+m*p*.12};e.globalAlpha=d,e.strokeStyle=h,e.fillStyle=h,e.lineWidth=1.4,e.beginPath(),e.moveTo(i.body.x,i.body.y),e.quadraticCurveTo(w.x,w.y,y.x,y.y),e.stroke();const[v,b]=[y.x-w.x,y.y-w.y],T=Math.atan2(b,v);e.beginPath(),e.moveTo(y.x,y.y),e.lineTo(y.x-7*Math.cos(T-.4),y.y-7*Math.sin(T-.4)),e.lineTo(y.x-7*Math.cos(T+.4),y.y-7*Math.sin(T+.4)),e.closePath(),e.fill()};for(const i of s){const l=this.balls.get(i);l&&r(a,l,n.accent,.9)}for(const i of o){const l=this.balls.get(i);l&&r(l,a,n.soft,.75)}}drawLinks(e,n,a){if(this.boxAlpha<.98){e.globalAlpha=(1-this.boxAlpha)*.22,e.strokeStyle=n.accent,e.lineWidth=.7,e.beginPath();for(const[o,r]of this.fileLinks){const[i,l]=[this.balls.get(o),this.balls.get(r)];!i||!l||(e.moveTo(i.body.x,i.body.y),e.lineTo(l.body.x,l.body.y))}e.stroke()}if(!this.layout||this.boxAlpha<.02)return;const s=this.hovered.box;for(const o of this.layout.links){const[r,i]=[this.boxes.get(o.from),this.boxes.get(o.to)],[l,h]=[this.layout.boxes.find(w=>w.name===o.to),this.layout.boxes.find(w=>w.name===o.from)];if(!r||!i||!l||!h)continue;const d=r.x+(o.x1-h.x)/h.width*r.width,c=r.y+r.height,u=i.x+(o.x2-l.x)/l.width*i.width,p=i.y,m=s!==void 0&&(o.from===s||o.to===s),f=s!==void 0&&!m;e.globalAlpha=this.boxAlpha*Math.min(r.alpha,i.alpha)*(a?.06:m?.95:f?.08:.4),e.strokeStyle=m?n.accent:n.soft,e.lineWidth=Math.min(4,.8+Math.log2(o.count)*.7)*(m?1.4:1),e.setLineDash(o.typeOnly?[4,3]:[]);const y=Math.max(18,(p-c)/2);e.beginPath(),e.moveTo(d,c),e.bezierCurveTo(d,c+y,u,p-y,u,p-4),e.stroke(),e.setLineDash([]),e.fillStyle=e.strokeStyle,e.beginPath(),e.moveTo(u,p),e.lineTo(u-3.5,p-7),e.lineTo(u+3.5,p-7),e.closePath(),e.fill()}}label(e,n,a,s,o){e.font="11px ui-monospace, Menlo, monospace";const r=e.measureText(a).width+12,i=Math.min(this.width-r-4,Math.max(4,s-r/2));e.globalAlpha=.95,e.fillStyle=n.ink,e.beginPath(),e.roundRect(i,o-18,r,18,4),e.fill(),e.fillStyle=n.sunken,e.fillText(a,i+6,o-5)}}const je=1100,pl=.45;function fs(t){const e=getComputedStyle(t),n=(a,s)=>e.getPropertyValue(a).trim()||s;return{ink:n("--ink","#16181c"),dim:n("--dim","#6b7280"),rule:n("--rule","#d8dbe1"),sunken:n("--sunken","#f2f4f8"),accent:n("--accent","#1a4b9c"),soft:n("--accent-soft","#6b83b8"),warn:n("--warn","#b4443c"),test:n("--hl-string","#2f6f4e")}}function fl(t){let e=!1,n=()=>{e=!0};const a=fetch("/data/coverage.json").then(s=>s.ok?s.json():null).catch(()=>null);return fetch("/data/architecture.json").then(s=>s.json()).then(async s=>{const o=await a;e||(n=gl(t,s,o))}).catch(()=>{}),()=>n()}function gl(t,e,n){const a=n&&e.commits.findIndex(z=>z.sha===n.sha),s=n?new Map(Object.entries(n.lines)):null,o=mr(e),r=o.map(pn),i=new Map,l=(z,W)=>{const X=`${z}:${W}`;let me=i.get(X);return me||(me=wr(o[z]??{modules:[],dependencies:[]},{tests:W,width:je}),i.set(X,me)),me},h=o.length-1,d=window.matchMedia("(prefers-reduced-motion: reduce)").matches,c=new ml(je,d);let u=h,p=!1,m="boxes",f=!1,y=0;const w=g("canvas",{class:"architecture-canvas","aria-label":"The source of this site: its files as balls, its folders as boxes, and arrows for what needs what"}),v=g("figcaption"),b=g("div",{class:"sparks-host"}),T=g("input",{type:"range",min:0,max:h,step:1,value:u,"aria-label":"Commit"}),I=g("button",{type:"button"},"▶ play the history"),M=g("button",{type:"button"},"tangle it"),k=g("input",{type:"checkbox"}),A=g("div",{class:"architecture-controls"},I,M,g("label",{},k," the tests"),T),C=g("p",{class:"architecture-legend",hidden:!0},g("span",{class:"key file"}),"a file, as full as the tests run it",g("span",{class:"key untested"}),"a file no test reaches",g("span",{class:"key test"}),"a test"),O=(z,W=!1)=>{u=Math.max(0,Math.min(h,z)),T.value=String(u);const X=o[u],me=e.commits[u];!X||!me||(c.show(X,l(u,p),{untangling:W,reached:p?yr(X):null,coverage:p&&u===a?s:null}),v.innerHTML=br(me,r[u]??pn(X)),b.innerHTML=vr(r,u))},j=z=>{f=z,I.textContent=f?"❚❚ pause":"▶ play the history",f&&u===h&&O(0),y=0};I.addEventListener("click",()=>j(!f)),M.addEventListener("click",()=>{m=m==="boxes"?"tangle":"boxes",c.setMode(m),M.textContent=m==="boxes"?"tangle it":"untangle it",m==="boxes"&&O(u,!0)}),k.addEventListener("change",()=>{p=k.checked,C.hidden=!p,O(u)}),T.addEventListener("input",()=>{j(!1),O(Number(T.value))}),b.addEventListener("click",z=>{const W=b.getBoundingClientRect();j(!1),O(Math.round((z.clientX-W.left)/W.width*h))});const S=z=>{const W=w.getBoundingClientRect();return[(z.clientX-W.left)/W.width*je,(z.clientY-W.top)/W.height*c.height]};w.addEventListener("mousemove",z=>{const[W,X]=S(z);c.hovered=c.hit(W,X),w.style.cursor=c.hovered.path||c.hovered.box?"pointer":"",w.dataset.hovered=c.hovered.path??c.hovered.box??""}),w.addEventListener("mouseleave",()=>{c.hovered={}}),t.replaceChildren(g("figure",{class:"architecture-figure"},A,w,C,v,b)),O(u);const L=w.getContext("2d");if(!L)return()=>{};const $=vn(w);let E=fs(t),R=0,D=performance.now(),B=0,H={width:0,height:0};const G=()=>{const z=window.devicePixelRatio||1,W=w.clientWidth||je,X=Math.round(W*c.height/je);W===H.width&&Math.abs(X-H.height)<1||(H={width:W,height:X},w.width=Math.round(W*z),w.height=Math.round(X*z),w.style.height=`${X}px`)};G(),window.addEventListener("resize",G);const $e=z=>{B=requestAnimationFrame($e);const W=Math.min(.05,(z-D)/1e3);D=z,$.onScreen()&&(R++%30===0&&(E=fs(t)),f&&(y+=W,y>=pl&&(y=0,u>=h?j(!1):O(u+1))),c.step(W),G(),L.setTransform(w.width/je,0,0,w.width/je,0,0),c.draw(L,E))};return B=requestAnimationFrame($e),()=>{cancelAnimationFrame(B),$.stop(),window.removeEventListener("resize",G)}}const wl={name:"architecture",apps:{architecture:fl},stills:{architecture:rl}},yl=[{name:"llave de laton",kind:"key",value:111},{name:"cristal magico",kind:"key",value:1112},{name:"llave de casa",kind:"key",value:1314},{name:"llave de la verja",kind:"key",value:2636},{name:"llave del puente",kind:"key",value:3444},{name:"llave del gnomo",kind:"key",value:4636},{name:"barca",kind:"key",value:3233},{name:"llave de la despensa",kind:"key",value:2010},{name:"diario",kind:"weapon",value:1},{name:"matamoscas",kind:"weapon",value:2},{name:"espada de madera",kind:"weapon",value:4},{name:"espada",kind:"weapon",value:8},{name:"espada venenosa",kind:"weapon",value:12},{name:"Thurmei",kind:"weapon",value:16},{name:"camisa",kind:"shield",value:2},{name:"escudo de madera",kind:"shield",value:4},{name:"escudo de escamas",kind:"shield",value:8},{name:"escudo",kind:"shield",value:12},{name:"Rharmei",kind:"shield",value:16},{name:"caramelo",kind:"food",value:2},{name:"judia",kind:"food",value:4},{name:"manzana",kind:"food",value:8},{name:"naranja",kind:"food",value:12},{name:"pocima",kind:"food",value:16}],bl=[{name:"mosca acida",attack:4,defence:0,drops:"cristal magico"},{name:"mosca",attack:0,defence:0,drops:"caramelo"},{name:"mosquito",attack:2,defence:0,drops:"matamoscas"},{name:"polilla",attack:1,defence:1,drops:"camisa"},{name:"cucaracha",attack:1,defence:1,drops:"llave de casa"},{name:"raton",attack:2,defence:2,drops:"judia"},{name:"rana venenosa",attack:2,defence:1,drops:"espada de madera"},{name:"planta carnivora",attack:1,defence:3,drops:"escudo de madera"},{name:"raton salvaje",attack:3,defence:3,drops:"llave de la verja"},{name:"escorpion dorado",attack:12,defence:2,drops:"espada venenosa"},{name:"trucha",attack:3,defence:3,drops:"manzana"},{name:"trucha asesina",attack:4,defence:7,drops:"escudo de escamas"},{name:"minimonstruo aquatico",attack:8,defence:4,drops:"llave del puente"},{name:"lobo",attack:8,defence:6,drops:"manzana"},{name:"lobo asesino",attack:12,defence:7,drops:"escudo"},{name:"ogro",attack:6,defence:10,drops:"naranja"},{name:"gnomo de puente",attack:11,defence:11,drops:"llave del gnomo"},{name:"murcielago",attack:8,defence:8,drops:"judia"},{name:"aranya",attack:14,defence:4,drops:"Thurmei"},{name:"vampiro",attack:12,defence:13,drops:"Rharmei"},{name:"aranya gigante",attack:14,defence:14,drops:"barca"},{name:"monstruo aquatico enorme",attack:32,defence:15,drops:"llave de la despensa"}],vl={"0,0":{name:"Bienvenida",exits:[-1,-1,0,-1],holds:"diario",text:`Bienvenido a este juego de aventura. 
Esta es la habitacion de bienvenida, donde aprenderas a moverte. 
Los comandos son:
 'norte',
 'sur',
 'este',
 'oeste'. 
Prueba de ir a la siguiente habitacion al 'este', y volver al 'oeste'.`},"0,1":{name:"Usa las llaves",exits:[111,-1,-1,0],holds:"llave de laton",text:`En esta sala aprenderas a coger objetos y abrir puertas con llave. 
Los comandos son:
 'coger',
 y los de movimiento.
Si vas al norte directamente no podras, intentalo.
Despues coge la llave ('coger') y ves hacia el norte.`},"0,2":{name:"Comedor sur",exits:[0,-1,0,-1],holds:"mosca",text:`Es el ala sur de tu comedor. La luz entra difusa desde la salita y
las sillas esperan a tus invitados.`},"0,3":{name:"Salita",exits:[0,-1,-1,0],holds:"polilla",text:`Es la salita de tu casa, la luz entra por la ventana y las cortinas
desdibujan el exterior. Puedes ver tu sillon, una mesita con un 
candelabro y estanterias con varios libros.`},"0,4":{name:"Huerto de pepinos",exits:[0,-1,0,-1],holds:"nada",text:`Junto a la verja sur de tu granja tienes el huerto de pepinos. 
Apenas levantan un dedo del suelo, pero ya te relames pensando
en su sabor.`},"0,5":{name:"Huerto de tomates",exits:[0,-1,0,0],holds:"nada",text:`Junto a la verja sur de tu granja tienes el huerto de tomates. Aun
estan verdes, pero parece que este anyo tendras muy buena cosecha.`},"0,6":{name:"Caminito",exits:[-1,-1,0,0],holds:"nada",text:`Un bonito caminito se alarga hacia el este, la parte mas alejada 
de tu granja.`},"0,7":{name:"Caminito",exits:[0,-1,-1,0],holds:"planta carnivora",text:`Es el fin de tu caminito, al norte tienes las plantaciones frutales.
Siempre te gusta pasear en primavera y ver las flores.`},"1,0":{name:"Despensa",exits:[0,-1,-1,-1],holds:"nada",text:`Al fin has podido entrar en la despensa!
Ahora ya puedes empezar a preparar la comida para tus comensales.
FELICIDADES!`},"1,1":{name:"Aprende a atacar",exits:[-1,0,1112,-1],holds:"mosca acida",text:`Es hora de que aprendas a atacar a tus enemigos. Debes ir con cuidado
ya que ellos se defenderan.
Solo hay un comando:
 'atacar'.
Para ello debes conseguir primero un arma. Busca una, cogela y ataca.
Cuando venzas podras continuar.`},"1,2":{name:"Comedor",exits:[0,0,0,-1],holds:"nada",text:`Estas en el comedor de tu casa, fuera hace un dia fantastico y
esperas visita. Hoy tienes decidido preparar un buen banquete!
La entrada esta al oeste, la salita al sur, y la cocina al oeste.`},"1,3":{name:"Recibidor",exits:[0,0,1314,0],holds:"mosca",text:`Es un recibidor pequenyo pero acogedor. Esta decorado austeramente
pero dispone de colgarropas para dejar la chaqueta.
Desde el puedes acceder directamente a la salita, al comedor y a la
cocina.`},"1,4":{name:"Patio",exits:[0,0,0,0],holds:"nada",text:`Hace un dia esplendido y estas en el jardin de tu granja. Aqui puedes
ver varias flores que has plantado y una fuente. Te rodean varios 
huertos y mas lejos al este tienes los frutales.`},"1,5":{name:"Huerto de Judias",exits:[-1,0,-1,0],holds:"raton salvaje",text:`Un bonito huerto de judias se abre delante de ti. Hace apenas unas
semanas que las plantaste, pero ya estan florecidas. El fuerte color
amarillo de las flores contrastan con el verde de las plantas.`},"1,6":{name:"Manzanos",exits:[0,-1,0,-1],holds:"raton",text:`Este es tu cultivo de manzanas. Este anyo las lluvias han sido 
generosas y tendras una buena cosecha. Hay ya alguna manzana, pero
a mayoria demasiado verdes.`},"1,7":{name:"Ciruelos",exits:[0,0,-1,0],holds:"nada",text:`Siempre te ha gustado esta parte de la granja. Los ciruelos tienen
hojas rojas y le dan un aspecto muy fresco. El rio esta hacia el norte,
y tu casa hacia el suroeste.`},"2,0":{name:"Banyo",exits:[-1,2010,0,-1],holds:"mosca",text:`Este es el banyo de tu casa. Es mas bien rustico pero funcional. La 
banyera la compraste recientemente y al lado tienes bien ordenadas
las toallas. Al sur esta la despensa.`},"2,1":{name:"Habitacion",exits:[-1,-1,0,0],holds:"mosquito",text:`Es la habitacion donde duermes. Tienes una cama de madera trabajada,
con numerosas mantas que te protegen del frio, y un tocador donde 
guardas tu ropa. Dese la habitacion puedes acceder al comedor y al
lavabo.`},"2,2":{name:"Comedor norte",exits:[-1,0,0,0],holds:"nada",text:`Es la parte norte de tu gran comedor. La mesa para la ocasion se 
extiende y todos los servicios estan en su sitio. Desde aqui puedes
acceder a la cocina y a tu habitacion.`},"2,3":{name:"Cocina",exits:[-1,0,-1,0],holds:"cucaracha",text:`Esta es tu cocina. Estas contento con tu nuevo horno de lenya, cocina
a las mil maravillas. Tienes todo preparado para hacer la comida, 
pero te faltan los ingredientes. Tendrias que recogerlos de la 
despensa.`},"2,4":{name:"Huerto de calabazas",exits:[-1,0,-1,-1],holds:"escorpion dorado",text:`Este es tu huerto de calabazas. Apenas han empezado a crecer pero 
dependes de ellas para comer este otonyo. No puedes evitar pensar
si te has de llevar alguna a tus padres.`},"2,5":{name:"Naranjos",exits:[-1,-1,0,-1],holds:"naranja",text:`Aqui tienes uno de los cultivos mas sufridos. No sueles tener 
demasiadas naranjas, pero te gustan demasiado. Su color y aroma
te resultan estupendas.`},"2,6":{name:"Entrada",exits:[2636,0,0,0],holds:"rana venenosa",text:`Aqui esta la entrada norte de tu granja. La coronan dos magnificos 
cipreses y numerosos arbustos. La reja la sueles tener cerrada, 
nunca te ha gustado adentrarte en el bosque. Al norte esta el rio.`},"2,7":{name:"Nogal",exits:[-1,0,-1,0],holds:"raton",text:`Unos grandes nogales se extienden es este cultivo de tu granja. 
Son especialmente interesantes, porque, aunque su fruto no sea tan
bueno como las manzanas, son resistentes y te permiten superar los
inviernos.`},"3,0":{name:"Cueva",exits:[0,-1,0,-1],holds:"murcielago",text:`Sigue el tunel de la cueva oscura y sombria. Las paredes estan 
humedas y se escucha un rumor de agua a lo lejos. Has de caminar
con cuidado para no resbalar o tropezar.`},"3,1":{name:"Cueva",exits:[0,-1,-1,0],holds:"nada",text:`Sigue el tunel de la cueva oscura y sombria. Las paredes estan 
humedas y se escucha un rumor de agua a lo lejos. Has de caminar
con cuidado para no resbalar o tropezar.`},"3,2":{name:"Lago interno",exits:[0,-1,3233,-1],holds:"nada",text:`Un inmenso lago interior se abre delante tuyo. Esta oscuro y 
apenas se ve bien, pero intuyes que algo se mueve al este. 
Necesitas una barca para ir al centro del lago.`},"3,3":{name:"Centro del lago",exits:[-1,-1,-1,0],holds:"monstruo aquatico enorme",text:`Estas en el centro del lago con una pequenya y fragil barca.
Es hogar de Troildhem, un increible monstruo misterioso. 
Ya habias visto otro igual antes, pero mas pequenyo.
Troildhem tiene varios metros de altura, y una decena de 
tentaculos con hojos.`},"3,4":{name:"Rio salvaje",exits:[3444,-1,0,-1],holds:"espada",text:`Aqui el rio se hace mas salvaje, sin embargo hay un puente que 
te permite pasar con segurida a la otra orilla. El puente se debe
desbloquear con una llave para poder pasar.`},"3,5":{name:"Rio",exits:[-1,-1,0,0],holds:"trucha asesina",text:`Por aqui discurre el rio. No puedes cruzar, pero mas al oeste
hay un puente.`},"3,6":{name:"Rio",exits:[-1,0,0,0],holds:"nada",text:`Tu granja va a parar a este rio. En el norte esta el bosque 
misterioso pero no puedes cruzar por aqui.`},"3,7":{name:"Rio",exits:[-1,-1,-1,0],holds:"minimonstruo aquatico",text:`El rio se ensancha y sus aguas se tranquilizan, hay numerosos
peces pero algo se remueve enre las aguas.`},"4,0":{name:"Cueva",exits:[0,0,-1,-1],holds:"nada",text:`Sigue el tunel de la cueva oscura y sombria. Las paredes estan 
humedas y se escucha un rumor de agua a lo lejos. Has de caminar
con cuidado para no resbalar o tropezar.`},"4,1":{name:"Cueva",exits:[0,0,-1,-1],holds:"murcielago",text:`Sigue el tunel de la cueva oscura y sombria. Las paredes estan 
humedas y se escucha un rumor de agua a lo lejos. Has de caminar
con cuidado para no resbalar o tropezar.`},"4,2":{name:"Cueva",exits:[0,0,-1,-1],holds:"nada",text:`Sigue el tunel de la cueva oscura y sombria. Las paredes estan 
humedas y se escucha un rumor de agua a lo lejos. Has de caminar
con cuidado para no resbalar o tropezar.`},"4,3":{name:"Bosque oscuro",exits:[0,-1,-1,-1],holds:"lobo",text:`A pesar de ser de dia apenas llega un apice de luz. Arbustos, 
arboles y zarzas dificultan el paso. Algo se mueve en la 
oscuridad.`},"4,4":{name:"Rio salvaje",exits:[-1,0,0,-1],holds:"nada",text:`La orilla norte del rio es lugubre. Se escuchan extranyos ruidos
y se intuye una maldicion. Aqui esta el punte que cruza a la 
orilla sur, el ambiente parece hostil e invita cruzarlo.`},"4,5":{name:"Rio oscuro",exits:[-1,-1,0,0],holds:"trucha",text:`El rio fluye bajo las rocas y raizes de los arboles del bosque.
Los sonios del bosque se intensifican y te sientes vigilado.`},"4,6":{name:"Bosque tenebroso",exits:[0,-1,-1,0],holds:"nada",text:`Una brecha entre zarzas y arbustos te da la entrada al bosque
tenebroso. La luz escasea y las sombras son amenazadoras.`},"4,7":{name:"Bosque oscuro",exits:[0,-1,-1,-1],holds:"ogro",text:`A pesar de ser de dia apenas llega un apice de luz. Arbustos, 
arboles y zarzas dificultan el paso. Algo se mueve en la 
oscuridad.`},"5,0":{name:"Cueva",exits:[0,0,-1,-1],holds:"aranya gigante",text:`Sigue el tunel de la cueva oscura y sombria. Una gran telaranya
dificulta el paso hacia el sud. Un movimiento poco cuidadoso te
podria hacer presa de ella.`},"5,1":{name:"Cueva",exits:[-1,0,0,-1],holds:"nada",text:`Sigue el tunel de la cueva oscura y sombria. Las paredes estan 
humedas y se escucha un rumor de agua a lo lejos. Has de caminar
con cuidado para no resbalar o tropezar.`},"5,2":{name:"Cueva",exits:[-1,0,-1,0],holds:"vampiro",text:`Sigue el tunel de la cueva oscura y sombria. Las paredes estan 
humedas, y el rumor de agua se magnifica. Has de caminar con cuidado 
para no resbalar o tropezar.`},"5,3":{name:"Bosque sombrio",exits:[0,0,-1,-1],holds:"nada",text:`El bosque es oscuro y junto a ti has descubierto un gran pared 
de roca solida al oeste, probablemente la montanya.`},"5,4":{name:"Bosque humedo",exits:[0,-1,0,-1],holds:"nada",text:`La luz escasea entre las hojas de los arboles. Zarzas y arbustos
dan paso a un pequenyo riachuelo. Algo se mueve en la oscuridad.`},"5,5":{name:"Bosque",exits:[-1,-1,0,0],holds:"nada",text:`El bosque se extiende oscuro y misterioso. La luz se desdibuja a
traves de las hojas. Se escuchan los ruidos de los animales y
sus otros habitantes.`},"5,6":{name:"Claro del Bosque",exits:[0,0,-1,0],holds:"nada",text:`El bosque se extiende oscuro y misterioso. Estas en un pequenyo
claro del bosque donde se puede contemplar el cielo. Notas que
el bosque esta agitado.`},"5,7":{name:"Bosque",exits:[0,0,-1,-1],holds:"nada",text:`El bosque se extiende oscuro y misterioso. La luz se desdibuja a
traves de las hojas. Se escuchan los ruidos de los animales y
sus otros habitantes.`},"6,0":{name:"Cueva",exits:[0,0,-1,-1],holds:"nada",text:`Sigue el tunel de la cueva oscura y sombria. Las paredes estan 
humedas y se escucha un rumor de agua a lo lejos. Has de caminar
con cuidado para no resbalar o tropezar.`},"6,1":{name:"Cueva",exits:[0,-1,0,-1],holds:"nada",text:`Sigue el tunel de la cueva oscura y sombria. Las paredes estan 
humedas y se escucha un rumor de agua a lo lejos. Has de caminar
con cuidado para no resbalar o tropezar.`},"6,2":{name:"Cueva",exits:[0,-1,-1,0],holds:"murcielago",text:`Estas dentro de la cueva, es oscura y sombria. Las paredes estan 
humedas y se escucha un rumor de agua a lo lejos. Intentas mirar
pero parece que no tiene fin.`},"6,3":{name:"Bosque sombrio",exits:[0,0,0,-1],holds:"nada",text:`El bosque es oscuro y junto a ti has descubierto un gran pared 
de roca solida al oeste, probablemente la montanya. Notas que la
roca esta humeda, muy probablemente haya alguna cueva.`},"6,4":{name:"Puente del bosque",exits:[0,0,-1,0],holds:"gnomo de puente",text:`La luz escasea entre las hojas de los arboles. Zarzas y arbustos
dan paso a un pequenyo riachuelo. Un puente cruza el riachuelo y
permite alcanzar la parte este del bosque, alli, bajo un arbol
hay la casa de un troll que tenras que atravesar si quieres ir
al este.`},"6,5":{name:"Bosque oscuro",exits:[-1,-1,0,-1],holds:"lobo asesino",text:`A pesar de ser de dia apenas llega un apice de luz. Arbustos, 
arboles y zarzas dificultan el paso. Algo se mueve en la 
oscuridad.`},"6,6":{name:"Claro del Bosque",exits:[-1,0,0,0],holds:"nada",text:`El bosque se extiende oscuro, misterioso y agitado. Estas en un 
pequenyo claro del bosque donde se puede contemplar el cielo.`},"6,7":{name:"Bosque",exits:[0,0,-1,0],holds:"nada",text:`En esta parte del bosque la luz empieza a escasear. Maranyas de
arbustos y zarzales dificultan tus pasos. Notas que algo se mueve
entre las sombras.`},"7,0":{name:"Cueva",exits:[-1,0,0,-1],holds:"nada",text:`Sigue el tunel de la cueva oscura y sombria. Las paredes estan 
humedas y se escucha un rumor de agua a lo lejos. Has de caminar
con cuidado para no resbalar o tropezar.`},"7,1":{name:"Cueva",exits:[-1,0,-1,0],holds:"aranya",text:`Sigue el tunel de la cueva oscura y sombria. Las paredes estan 
humedas y se escucha un rumor de agua a lo lejos. Has de caminar
con cuidado para no resbalar o tropezar.`},"7,2":{name:"Cueva",exits:[-1,0,0,-1],holds:"nada",text:`Estas en los primeros pasos dentro de la cueva. Aire frio y
humedo te invade de su interior. Intentas ver donde se acaba, 
pero no puedes. Oyes murmullos provinientes de lo mas profundo.`},"7,3":{name:"Bosque",exits:[-1,0,-1,0],holds:"nada",text:`La luz escasea entre las hojas de los arboles. Un grupo de 
plantas trepadoras se mueven al oeste, es la entrada a una 
cueva. Sientes una presencia que te observa.`},"7,4":{name:"Bosque humedo",exits:[-1,0,0,-1],holds:"nada",text:`La luz escasea entre las hojas de los arboles. Zarzas y arbustos
dan paso a un pequenyo riachuelo. Algo se mueve en la oscuridad.`},"7,5":{name:"Bosque",exits:[-1,-1,0,0],holds:"lobo",text:`El bosque se extiende oscuro y misterioso. La luz se desdibuja a
traves de las hojas. Se escuchan los ruidos de los animales y
sus otros habitantes.`},"7,6":{name:"Bosque",exits:[-1,-1,0,0],holds:"nada",text:`El bosque se extiende oscuro y misterioso. La luz se desdibuja a
traves de las hojas. Se escuchan los ruidos de los animales y
sus otros habitantes.`},"7,7":{name:"Bosque",exits:[-1,0,-1,0],holds:"lobo",text:`El bosque se extiende oscuro y misterioso. La luz se desdibuja a
traves de las hojas. Se escuchan los ruidos de los animales y
sus otros habitantes.`}},kl={items:yl,monsters:bl,rooms:vl},{items:xl,monsters:$l,rooms:Tl}=kl,Ba={"llave de laton":"brass key","cristal magico":"magic crystal","llave de casa":"house key","llave de la verja":"gate key","llave del puente":"bridge key","llave del gnomo":"gnome's key",barca:"boat","llave de la despensa":"pantry key",diario:"newspaper",matamoscas:"fly swatter","espada de madera":"wooden sword",espada:"sword","espada venenosa":"poisoned sword",Thurmei:"Thurmei",camisa:"shirt","escudo de madera":"wooden shield","escudo de escamas":"scale shield",escudo:"shield",Rharmei:"Rharmei",caramelo:"sweet",judia:"bean",manzana:"apple",naranja:"orange",pocima:"potion"},kr={"mosca acida":"acid fly",mosca:"fly",mosquito:"mosquito",polilla:"moth",cucaracha:"cockroach",raton:"mouse","rana venenosa":"poison frog","planta carnivora":"carnivorous plant","raton salvaje":"wild mouse","escorpion dorado":"golden scorpion",trucha:"trout","trucha asesina":"killer trout","minimonstruo aquatico":"small water monster",lobo:"wolf","lobo asesino":"killer wolf",ogro:"ogre","gnomo de puente":"bridge gnome",murcielago:"bat",aranya:"spider",vampiro:"vampire","aranya gigante":"giant spider","monstruo aquatico enorme":"enormous water monster"},Sl={Bienvenida:"Welcome","Usa las llaves":"Use the keys","Comedor sur":"Dining room, south",Salita:"Sitting room","Huerto de pepinos":"Cucumber patch","Huerto de tomates":"Tomato patch",Caminito:"Little path",Despensa:"Pantry","Aprende a atacar":"Learn to attack",Comedor:"Dining room",Recibidor:"Hall",Patio:"Yard","Huerto de Judias":"Bean patch",Manzanos:"Apple trees",Ciruelos:"Plum trees",Banyo:"Bathroom",Habitacion:"Bedroom","Comedor norte":"Dining room, north",Cocina:"Kitchen","Huerto de calabazas":"Pumpkin patch",Naranjos:"Orange trees",Entrada:"Gate",Nogal:"Walnut trees",Cueva:"Cave","Lago interno":"Underground lake","Centro del lago":"Middle of the lake","Rio salvaje":"Wild river",Rio:"River","Bosque oscuro":"Dark forest","Rio oscuro":"Dark river","Bosque tenebroso":"Gloomy forest","Bosque sombrio":"Shadowy forest","Bosque humedo":"Damp forest",Bosque:"Forest","Claro del Bosque":"Forest clearing","Puente del bosque":"Forest bridge"},pe=`The tunnel of the dark, gloomy cave goes on. The walls are damp and
water can be heard running somewhere far off. Walk carefully, or you
will slip or trip.`,lt=`The forest stretches out, dark and mysterious. The light blurs
through the leaves. You can hear the animals and the forest's other
inhabitants.`,Ln=`Though it is day, barely a glimmer of light gets in. Bushes, trees
and brambles make the going hard. Something moves in the dark.`,gs=`Little light comes through the leaves of the trees. Brambles and
bushes give way to a small stream. Something moves in the dark.`,Ml={"0,0":`Welcome to this adventure game.
This is the welcome room, where you will learn to move.
The commands are:
 'north',
 'south',
 'east',
 'west'.
Try going to the next room to the 'east', and coming back 'west'.`,"0,1":`In this room you will learn to take things and open locked doors.
The commands are:
 'take',
 and the ones for moving.
If you go north straight away you will not be able to; try it.
Then take the key ('take') and go north.`,"0,2":`It is the south end of your dining room. Soft light comes in from the
sitting room, and the chairs are waiting for your guests.`,"0,3":`It is the sitting room of your house; the light comes in through the
window and the curtains blur the outside. You can see your armchair,
a small table with a candlestick, and shelves with several books.`,"0,4":`By the south fence of your farm you have the cucumber patch. They
barely lift a finger off the ground, but you are already licking your
lips at the thought of them.`,"0,5":`By the south fence of your farm you have the tomato patch. They are
still green, but it looks like a very good harvest this year.`,"0,6":`A pretty little path runs off to the east, the farthest part of your
farm.`,"0,7":`This is the end of your little path; to the north are the fruit trees.
You have always liked walking here in spring to see the blossom.`,"1,0":`At last you have got into the pantry!
Now you can start cooking for your guests.
CONGRATULATIONS!`,"1,1":`It is time you learnt to attack your enemies. Go carefully, because
they will defend themselves.
There is only one command:
 'attack'.
For that you first need a weapon. Find one, take it, and attack.
When you win you can go on.`,"1,2":`You are in the dining room of your house; outside it is a glorious day
and you are expecting company. Today you have decided to lay on a
feast! The hall is to the west, the sitting room to the south, and the
kitchen to the west.`,"1,3":`It is a small hall, but a welcoming one. It is plainly decorated but
has a coat rack to leave a jacket on.
From here you can go straight to the sitting room, the dining room and
the kitchen.`,"1,4":`It is a splendid day and you are in the garden of your farm. Here you
can see several flowers you planted, and a fountain. Vegetable patches
surround you, and farther east are the fruit trees.`,"1,5":`A pretty bean patch opens up in front of you. You planted them only a
few weeks ago, but they are already in flower. The strong yellow of
the flowers stands out against the green of the plants.`,"1,6":`These are your apple trees. The rains have been generous this year and
you will have a good harvest. There are already a few apples, but most
are too green.`,"1,7":`You have always liked this part of the farm. The plum trees have red
leaves and give it a very fresh look. The river is to the north, and
your house to the south-west.`,"2,0":`This is the bathroom of your house. It is rustic, but it works. You
bought the bath recently, and beside it the towels are neatly folded.
To the south is the pantry.`,"2,1":`It is the room where you sleep. You have a bed of worked wood, with
plenty of blankets against the cold, and a dresser where you keep your
clothes. From the bedroom you can reach the dining room and the
bathroom.`,"2,2":`It is the north end of your big dining room. The table is extended for
the occasion and every place is laid. From here you can reach the
kitchen and your bedroom.`,"2,3":`This is your kitchen. You are pleased with your new wood-fired oven;
it cooks wonderfully. You have everything ready to make the meal, but
the ingredients are missing. You would have to fetch them from the
pantry.`,"2,4":`This is your pumpkin patch. They have barely begun to grow, but you
depend on them to eat this autumn. You cannot help wondering whether
to take one to your parents.`,"2,5":`Here you have one of your hardest-suffering crops. You do not usually
get many oranges, but you like them far too much. Their colour and
scent are wonderful to you.`,"2,6":`Here is the north gate of your farm. Two magnificent cypresses and
plenty of bushes crown it. You usually keep the gate shut; you have
never liked going into the forest. To the north is the river.`,"2,7":`Big walnut trees spread over this part of your farm. They are
especially interesting because, though their fruit is not as good as
the apples, they are hardy and get you through the winters.`,"3,0":pe,"3,1":pe,"3,2":`An immense underground lake opens up before you. It is dark and you
can barely see, but you sense something moving to the east.
You need a boat to get to the middle of the lake.`,"3,3":`You are in the middle of the lake in a small, fragile boat.
It is the home of Troildhem, an incredible, mysterious monster.
You had seen one like it before, but smaller.
Troildhem is several metres tall, with a dozen tentacles with eyes
on them.`,"3,4":`Here the river turns wild, but there is a bridge that lets you cross
safely to the other bank. The bridge has to be unlocked with a key
before you can cross.`,"3,5":`The river runs through here. You cannot cross, but farther west there
is a bridge.`,"3,6":`Your farm runs down to this river. To the north is the mysterious
forest, but you cannot cross here.`,"3,7":`The river widens and its waters grow calm; there are plenty of fish,
but something stirs beneath the surface.`,"4,0":pe,"4,1":pe,"4,2":pe,"4,3":Ln,"4,4":`The north bank of the river is dismal. Strange noises can be heard,
and you sense a curse. Here is the bridge that crosses to the south
bank; the air feels hostile and urges you across.`,"4,5":`The river flows under the rocks and the roots of the forest's trees.
The sounds of the forest grow louder and you feel watched.`,"4,6":`A gap between brambles and bushes lets you into the gloomy forest.
Light is scarce and the shadows are threatening.`,"4,7":Ln,"5,0":`The tunnel of the dark, gloomy cave goes on. A great cobweb blocks
the way south. One careless move could make you its prey.`,"5,1":pe,"5,2":`The tunnel of the dark, gloomy cave goes on. The walls are damp, and
the sound of water grows louder. Walk carefully, or you will slip or
trip.`,"5,3":`The forest is dark, and beside you you have found a great wall of
solid rock to the west: the mountain, probably.`,"5,4":gs,"5,5":lt,"5,6":`The forest stretches out, dark and mysterious. You are in a small
clearing where the sky can be seen. You notice the forest is
restless.`,"5,7":lt,"6,0":pe,"6,1":pe,"6,2":`You are inside the cave; it is dark and gloomy. The walls are damp and
water can be heard running somewhere far off. You try to look ahead,
but it seems to have no end.`,"6,3":`The forest is dark, and beside you you have found a great wall of
solid rock to the west: the mountain, probably. You notice the rock
is damp; there is very likely a cave.`,"6,4":`Little light comes through the leaves of the trees. Brambles and
bushes give way to a small stream. A bridge crosses the stream to the
eastern part of the forest; there, under a tree, is the house of a
troll you will have to get past if you want to go east.`,"6,5":Ln,"6,6":`The forest stretches out, dark, mysterious and restless. You are in a
small clearing where the sky can be seen.`,"6,7":`In this part of the forest the light begins to fail. Tangles of
bushes and brambles slow your steps. You notice something moving
among the shadows.`,"7,0":pe,"7,1":pe,"7,2":`You are a few steps inside the cave. Cold, damp air reaches you from
within. You try to see where it ends, but you cannot. You hear
murmurs from deep inside.`,"7,3":`Little light comes through the leaves of the trees. A tangle of
climbing plants stirs to the west: it is the mouth of a cave. You
feel a presence watching you.`,"7,4":gs,"7,5":lt,"7,6":lt,"7,7":lt},Ze=(t,e)=>t[e]??e,Al=xl.map(t=>({...t,name:Ze(Ba,t.name)})),Il=$l.map(t=>({...t,name:Ze(kr,t.name),drops:Ze(Ba,t.drops)})),El=Object.fromEntries(Object.entries(Tl).map(([t,e])=>[t,{...e,name:Ze(Sl,e.name),holds:Ze(Ba,Ze(kr,e.holds)),text:Ml[t]??e.text}])),jl={items:Al,monsters:Il,rooms:El},fn=16,{items:ga,monsters:Cl,rooms:Ol}=jl,ws=["norte","sur","este","oeste"],Ll={norte:[1,0],sur:[-1,0],este:[0,1],oeste:[0,-1]},ys=[0,0],bs=[1,0],gn=(t,e)=>t.find(n=>n.name===e);function vs(t){const e=gn(ga,t);if(e)return{item:e};const n=gn(Cl,t);return n?{monster:n}:null}class nt{places=new Map;at=[ys[0],ys[1]];life=fn;weapon=null;shield=null;key=null;visited=new Set;constructor(){for(const[e,n]of Object.entries(Ol))this.places.set(e,{room:n,exits:[...n.exits],holds:vs(n.holds)});this.visited.add(this.here())}here(){return`${this.at[0]},${this.at[1]}`}place(){const e=this.places.get(this.here());if(!e)throw new Error(`no room at ${this.here()}`);return e}get won(){return this.at[0]===bs[0]&&this.at[1]===bs[1]}get spent(){return this.life<=0}save(){return JSON.stringify({at:this.at,life:this.life,held:[this.weapon?.name??null,this.shield?.name??null,this.key?.name??null],visited:[...this.visited],places:[...this.places].map(([e,n])=>[e,n.exits,n.holds?"item"in n.holds?n.holds.item.name:n.holds.monster.name:null])})}static load(e){const n=JSON.parse(e),a=new nt;a.at=n.at,a.life=n.life,[a.weapon,a.shield,a.key]=n.held.map(s=>s?gn(ga,s)??null:null),a.visited.clear();for(const s of n.visited)a.visited.add(s);for(const[s,o,r]of n.places){const i=a.places.get(s);i&&Object.assign(i,{exits:o,holds:r?vs(r):null})}return a}charted(){return[...this.visited].sort().flatMap(e=>{const n=this.places.get(e);if(!n)return[];const{holds:a}=n;return[{where:e,name:n.room.name,exits:[n.exits[0],n.exits[1],n.exits[2],n.exits[3]],holds:a?"item"in a?{kind:a.item.kind,name:a.item.name}:{kind:"monster",name:a.monster.name}:null}]})}look(){const{room:e,exits:n,holds:a}=this.place();return{name:e.name,text:e.text,...a&&"monster"in a?{monster:a.monster.name}:{},...a&&"item"in a?{item:a.item.name,itemKind:a.item.kind}:{},exits:ws.flatMap((s,o)=>(n[o]??-1)>=0?[{direction:s,locked:(n[o]??0)>0}]:[]),at:[this.at[0],this.at[1]],life:this.life,...this.weapon?{weapon:this.weapon.name}:{},...this.shield?{shield:this.shield.name}:{},...this.key?{key:this.key.name}:{}}}go(e){const n=this.place(),a=ws.indexOf(e),s=n.exits[a]??-1;if(s<0)return"There is no way out that way.";if(s>0){if(!this.key||this.key.value!==s)return"The way is locked and you are not carrying the key.";n.exits[a]=0,this.key=null}const[o,r]=Ll[e];return this.at=[this.at[0]+o,this.at[1]+r],this.visited.add(this.here()),""}take(){const e=this.place();if(!e.holds||!("item"in e.holds))return"There is nothing here to take!";const{item:n}=e.holds;if(n.kind==="food")return this.life=Math.min(fn,this.life+n.value),e.holds=null,"Yum yum!";const a=n.kind,s=this[a];return this[a]=n,e.holds=s?{item:s}:null,{weapon:"You have taken a weapon.",shield:"You have taken a shield.",key:"You have taken a key."}[a]}attack(){const e=this.place();if(!e.holds||!("monster"in e.holds))return"There is no monster to attack!";if(!this.weapon)return"You have no weapon to attack with!";const{monster:n}=e.holds,a=[];if(this.weapon.value-n.defence>0){const o=gn(ga,n.drops);e.holds=o?{item:o}:null,a.push("The monster has been defeated!")}const s=n.attack-(this.shield?.value??0);return s>0&&(this.life-=s,a.push("OUCH!")),a.join(" ")||"Neither of you gets anywhere."}run(e){const n=e.trim().toLowerCase(),a={norte:"norte",north:"norte",n:"norte",sur:"sur",south:"sur",s:"sur",este:"este",east:"este",e:"este",oeste:"oeste",west:"oeste",w:"oeste"}[n];return a?this.go(a):n==="coger"||n==="take"||n==="get"?this.take():n==="atacar"||n==="attack"||n==="hit"?this.attack():n==="mirar"||n==="look"||n==="l"||n===""?"":"I do not understand you."}}function _e(t,e){const n=Math.max(...t.map(s=>s.length)),a=[];return t.forEach((s,o)=>{for(let r=0;r<s.length;){const i=s[r]??".";let l=r+1;for(;s[l]===i;)l+=1;const h=e[i];i!=="."&&h&&a.push(`<rect x="${r}" y="${o}" width="${l-r}" height="1" fill="${h}"/>`),r=l}}),`<svg class="pixel" viewBox="0 0 ${n} ${t.length}" shape-rendering="crispEdges" aria-hidden="true">${a.join("")}</svg>`}const qe={k:"var(--ink)",a:"var(--accent)",m:"#aeb8c4",g:"#d4a017",b:"#8a5a2b",r:"#c0392b",w:"#f1f1ee",l:"#3f9b4b"},Lt={weapon:_e(["......mm",".....mmm","....mmm.","g..mmm..",".gmmm...","..bg....",".b..g...","b......."],qe),shield:_e([".kkkkkk.","kmmrrmmk","kmmrrmmk","krrrrrrk","kmmrrmmk",".kmrrmk.","..kmmk..","...kk..."],qe),food:_e(["....b...","...b.ll.",".rrbrr..","rrrrrrr.","rwrrrrr.","rrrrrrr.",".rrrrr..","..r.r..."],qe),key:_e(["........",".ggg....","g...g...","g...gggg","g...g.g.",".ggg..gg","........","........"],qe),monster:_e(["........","...rr...","..rrrr..",".rwrrwr.",".rkrrkr.","rrrrrrrr","rrkkkkrr","r.r..r.r"],qe),player:_e(["...kk...","..kkkk..","...kk...",".aaaaaa.","a.aaaa.a","..aaaa..","..a..a..",".kk..kk."],qe)},Dt=8,Nl=["n","s","e","w"];function Pl(t,e){const n=new Map(t.map(s=>[s.where,s])),a=[];for(let s=Dt-1;s>=0;s-=1)for(let o=0;o<Dt;o+=1){const r=`${s},${o}`,i=n.get(r),l=e[0]===s&&e[1]===o;if(!i){a.push(`<span class="cell" data-where="${r}"><span></span></span>`);continue}const h=Nl.flatMap((p,m)=>{const f=i.exits[m]??-1;return f<0?[`wall-${p}`]:f>0?[`door-${p}`]:[]}),d=["cell","seen",l?"here":"",...h].filter(Boolean).join(" "),c=i.holds?`<span class="thing${i.holds.kind==="monster"?" monster":""}" title="${x(i.holds.name)}">${Lt[i.holds.kind]}</span>`:"",u=l?`<span class="player">${Lt.player}</span>`:"";a.push(`<span class="${d}" data-where="${r}" title="${x(i.name)}"><span class="room">${x(i.name)}</span>${c}${u}</span>`)}return`<div class="map" role="img" aria-label="The map: ${t.length} of ${Dt*Dt} rooms seen">${a.join("")}</div>`}const Rl={norte:"north",sur:"south",este:"east",oeste:"west"};function Fl(t){const e=["weapon","shield","key"].flatMap(a=>t[a]?[`<span class="held">${Lt[a]}${x(t[a]??"")}</span>`]:[]),n=Array.from({length:fn},(a,s)=>`<span class="heart${s<t.life?" full":""}"></span>`).join("");return`<p class="gear"><span class="hearts" title="${t.life} of ${fn} life">${n}</span>${e.join("")}</p>`}function Bl(t){const e=t.exits.map(({direction:a,locked:s})=>`${Rl[a]}${s?" (locked)":""}`),n=[t.weapon&&`weapon:${t.weapon}`,t.shield&&`shield:${t.shield}`,t.key&&`key:${t.key}`].filter(Boolean).join(" ");return`<div class="seen"><h4>===== ${x(t.name)} =====</h4><p>${x(t.text).replace(/\n/g,"<br>")}</p>`+(t.monster?`<p class="monster">${Lt.monster}There is a monster here: ${x(t.monster)}</p>`:"")+(t.item?`<p class="item">${Lt[t.itemKind??"weapon"]}There is: ${x(t.item)}</p>`:"")+`<p class="exits">Exits: ${e.length?e.join(", "):"none"}.</p>`+Fl(t)+`<p class="status">(${t.at[1]},${t.at[0]})| ${x(n)} ${t.life}&gt;</p></div>`}function xr(t){return`<div class="adventure">${Pl(t.charted(),t.look().at)}${Bl(t.look())}</div>`}const Dl=()=>xr(new nt),$r="adventure",Hl=["north","south","east","west","take","attack"];function Wl(t){let e=_l()??new nt;const n=g("div"),a=g("p",{class:"said"}),s=g("input",{type:"text",autocomplete:"off",spellcheck:!1,placeholder:"north, south, east, west, take, attack"});function o(d=""){n.innerHTML=xr(e),a.textContent=e.spent&&!d?"Game over; better luck next time.":d,e.won&&(a.textContent="CONGRATULATIONS! You have reached the pantry."),i()}function r(d){const c=e.run(d);o(c),s.value="",s.focus()}function i(){try{localStorage.setItem($r,e.save())}catch{}}const l=g("form",{onsubmit:d=>(d.preventDefault(),r(s.value))},g("span",{class:"ps1"},"> "),s),h=g("div",{class:"row"},...Hl.map(d=>g("button",{type:"button",onclick:()=>r(d)},d)),g("button",{type:"button",class:"quiet",onclick:()=>(e=new nt,o(""))},"start again"));return t.replaceChildren(n,a,l,h),o(""),()=>i()}function _l(){try{const t=localStorage.getItem($r);return t?nt.load(t):null}catch{return null}}const ql={name:"adventure",apps:{adventure:Wl},stills:{adventure:Dl}},zl=["January","February","March","April","May","June","July","August","September","October","November","December"];function kn(t){const[e,n,a]=t.refreshed.split("-").map(Number),s=`${a} ${zl[(n??1)-1]} ${e}`,o=`${Math.min(...t.years)} to ${Math.max(...t.years)}`;return`<p class="source">Source: ${x(t.attribution)} <a href="${x(t.dataset)}">The dataset, at its source.</a> This site keeps sums of the finished years ${o}, last added to on ${s}.</p>`}function Da(t,e){const n=t.querySelector("p.source");if(n)return n;const a=document.createElement("div");return fetch(e).then(s=>s.json()).then(s=>{a.innerHTML=kn(s)}).catch(()=>{}),a}const Ve=[{code:"08019004",name:"Barcelona (Poblenou)",kind:"background",area:"urban"},{code:"08019043",name:"Barcelona (Eixample)",kind:"traffic",area:"urban"},{code:"08019044",name:"Barcelona (Gràcia - Sant Gervasi)",kind:"traffic",area:"urban"},{code:"08019057",name:"Barcelona (Palau Reial)",kind:"background",area:"urban"},{code:"08019058",name:"Barcelona (Observatori Fabra)",kind:"background",area:"suburban"},{code:"08015021",name:"Badalona",kind:"background",area:"urban"},{code:"08187012",name:"Sabadell",kind:"traffic",area:"urban"},{code:"17079003",name:"Girona (Escola de Música)",kind:"traffic",area:"urban"},{code:"25120001",name:"Lleida",kind:"traffic",area:"urban"},{code:"43148028",name:"Tarragona (Parc de la Ciutat)",kind:"background",area:"urban"},{code:"08137001",name:"Montseny (La Castanya)",kind:"background",area:"rural"}];function wa(t,e){return e==="workdays"?[t.workdays]:e==="weekends"?[t.weekends]:[t.workdays,t.weekends]}const Gl=t=>(t%4===0&&t%100!==0||t%400===0?366:365)*24,Nn=t=>t.reduce((e,n)=>e+n.reduce((a,s)=>a+s,0),0);function Yl(t,e){return Object.entries(t.years).map(([n,a])=>{const s=wa(a,e),o=s.reduce((l,h)=>l+Nn(h.counts),0),r=s.reduce((l,h)=>l+Nn(h.sums),0),i=wa(a,"all").reduce((l,h)=>l+Nn(h.counts),0);return{year:Number(n),mean:o>0?r/o:Number.NaN,measured:i/Gl(Number(n))}}).filter(({mean:n})=>!Number.isNaN(n)).sort((n,a)=>n.year-a.year)}function Ul(t,e){const n=Object.entries(t.years).filter(([a])=>Number(a)>=e.from&&Number(a)<=e.to).flatMap(([,a])=>wa(a,e.days));return Array.from({length:24},(a,s)=>Array.from({length:12},(o,r)=>{const i=n.reduce((h,d)=>h+(d.sums[r]?.[s]??0),0),l=n.reduce((h,d)=>h+(d.counts[r]?.[s]??0),0);return{mean:l>0?i/l:null,count:l}}))}const ze=[[0,[0,255,0]],[20,[225,225,0]],[40,[255,0,0]],[60,[225,0,225]],[80,[64,0,64]],[230,[16,0,8]]],Jl=([t,e,n])=>(.299*t+.587*e+.114*n)/255;function Ha(t){const e=Math.max(0,Math.min(t,230)),n=Math.max(1,ze.findIndex(([h])=>h>=e)),[a,s]=ze[n-1]??ze[0],[o,r]=ze[n]??ze[ze.length-1],i=(e-a)/(o-a),l=s.map((h,d)=>Math.round(h+((r[d]??0)-h)*i));return{background:`rgb(${l.join(",")})`,light:Jl(l)<.45}}const ln=80,Tr=["January","February","March","April","May","June","July","August","September","October","November","December"],Sr=t=>String(t+1).padStart(2,"0");function Kl(t,e,n){if(t.mean===null)return'<td class="none"></td>';const{background:a,light:s}=Ha(t.mean),o=s?' class="deep"':"",r=`${Tr[n]}, hour ${Sr(e)}: ${t.mean.toFixed(1)} µg/m³, the mean of ${t.count} measurements`;return`<td${o} style="background:${a}" title="${r}">${Math.round(t.mean)}</td>`}function Vl(t){const e=`<tr><th></th>${Tr.map(a=>`<th scope="col">${a.slice(0,3)}</th>`).join("")}</tr>`,n=t.map((a,s)=>`<tr><th scope="row">${Sr(s)}</th>${a.map((o,r)=>Kl(o,s,r)).join("")}</tr>`);return`<table class="heat graded"><thead>${e}</thead><tbody>${n.join("")}</tbody></table>`}const Y=t=>t.toFixed(1);function Wa(t){if(t<=0)return[0];const e=10**Math.floor(Math.log10(t)),n=t/e>=5?e:t/e>=2?e/2:e/5,a=[];for(let s=0;s<=t;s+=n)a.push(Math.round(s*100)/100);return a}const Ht=720,Pn=190,ie={top:14,right:8,bottom:22,left:34};function Mr(t,e,n){const a=Math.min(...t),s=Math.max(...t),o=Ht-ie.left-ie.right,r=Pn-ie.top-ie.bottom,i=o/Math.max(1,s-a+1),l=m=>ie.left+(m-a)*i,h=m=>ie.top+r-(m-e)/Math.max(1e-9,n-e)*r,c=Wa(n-e).map(m=>Math.round((m+e)*100)/100).map(m=>`<line class="grid" x1="${ie.left}" x2="${Ht-ie.right}" y1="${Y(h(m))}" y2="${Y(h(m))}"/><text x="${ie.left-4}" y="${Y(h(m)+3)}" text-anchor="end">${m}</text>`).join(""),u=s-a>12?5:1,p=Array.from({length:s-a+1},(m,f)=>a+f).filter(m=>m%u===0).map(m=>`<text x="${Y(l(m)+i/2)}" y="${Pn-6}" text-anchor="middle">${m}</text>`).join("");return{slot:i,x:l,y:h,left:ie.left,right:Ht-ie.right,top:ie.top,height:r,levels:m=>m.map(({from:f,to:y,value:w,label:v})=>`<line class="span" x1="${Y(l(f))}" x2="${Y(l(y)+i)}" y1="${Y(h(w))}" y2="${Y(h(w))}"/><text class="span" x="${Y((l(f)+l(y)+i)/2)}" y="${Y(h(w)-5)}" text-anchor="middle">${v}</text>`).join(""),wrap:(m,f)=>`<svg class="years" viewBox="0 0 ${Ht} ${Pn}" role="img" aria-label="${m}">${c}${p}${f}</svg>`}}function ya(t,e){const n=Math.max(e.top??0,...t.map(({value:d})=>d),1),a=Mr(t.map(({year:d})=>d),0,n),{x:s,y:o,slot:r}=a,i=t.map(({year:d,value:c,title:u,chosen:p,partial:m,colour:f})=>`<rect class="${["bar",p?"chosen":"",m?"partial":""].filter(Boolean).join(" ")}" data-year="${d}"${f?` style="--bar:${f}"`:""} x="${Y(s(d)+r*.15)}" y="${Y(o(c))}" width="${Y(r*.7)}" height="${Y(o(0)-o(c))}"/><rect class="hit" data-year="${d}" x="${Y(s(d))}" y="${a.top}" width="${Y(r)}" height="${a.height}"><title>${u}</title></rect>`).join(""),l=(e.references??[]).map(({value:d,label:c})=>`<line class="reference" x1="${a.left}" x2="${a.right}" y1="${Y(o(d))}" y2="${Y(o(d))}"/><text class="reference" x="${a.right-2}" y="${Y(o(d)-3)}" text-anchor="end">${c}</text>`).join(""),h=a.levels(e.spans??[]);return a.wrap(e.label,`${i}${l}${h}`)}const Xl=.75,Zl=[{value:40,label:"EU limit, 40"},{value:10,label:"WHO guideline, 10"}];function Ql(t,e){const n=t.map(({year:a,mean:s,measured:o})=>{const r=o<Xl,i=r?`, from only ${Math.round(o*100)}% of the year's hours`:"";return{year:a,value:s,partial:r,colour:Ha(s).background,chosen:a>=e.from&&a<=e.to,title:`${a}: ${s.toFixed(1)} µg/m³${i}`}});return ya(n,{label:"Mean NO2 of each year, µg/m³",top:ln,references:Zl})}const ks={all:"every day of the week",workdays:"Monday to Friday",weekends:"Saturdays and Sundays"};function eh(){const t=Array.from({length:ln/5+1},(n,a)=>Ha(a*5).background),e=[0,20,40,60,ln].map(n=>`<span>${n===ln?`${n}+`:n}</span>`).join("");return`<div class="scale" aria-hidden="true"><div class="ramp" style="background:linear-gradient(to right,${t.join(",")})"></div><div class="ticks">${e}</div><div class="ticks words"><span>clean</span><span>EU limit</span><span>twice it</span></div></div>`}function Ar(t,e){const n=Object.keys(t.years).map(Number),a=Math.max(e.from,Math.min(...n)),s=Math.min(e.to,Math.max(...n)),o=a===s?String(a):`${a}–${s}`;return`<figure class="no2"><figcaption><strong>${t.name}</strong> · ${t.kind}, ${t.area} · mean NO2 in µg/m³ by hour of the day and month of the year · ${ks[e.days]}, ${o}</figcaption>`+Vl(Ul(t,e))+eh()+`<h4>The mean of each year, ${ks[e.days]}</h4>`+Ql(Yl(t,e.days),{from:a,to:s})+"</figure>"}function Tt(t){const e=Object.keys(t.years).map(Number);return{from:Math.min(...e),to:Math.max(...e),days:"all"}}const th=[["all","every day"],["workdays","Monday to Friday"],["weekends","Saturday and Sunday"]];function nh(t){const e=new Map,n=Da(t,"/data/no2/index.json"),a=g("div");a.append(...t.querySelectorAll("figure"));let s=null,o={from:0,to:9999,days:"all"},r=!1;const i=(w,v=String(w))=>g("option",{value:w},v),l=g("select",{onchange:()=>{f(l.value)}},...Ve.map(({code:w,name:v})=>i(w,v))),h=g("select",{onchange:()=>m({days:h.value})},...th.map(([w,v])=>i(w,v))),d=g("select",{onchange:()=>m({from:Number(d.value),to:Math.max(Number(d.value),o.to)})}),c=g("select",{onchange:()=>m({to:Number(c.value),from:Math.min(Number(c.value),o.from)})}),u=g("button",{type:"button",onclick:()=>s&&m(Tt(s))},"every year");function p(){s&&(a.innerHTML=Ar(s,o),d.value=String(o.from),c.value=String(o.to),h.value=o.days)}function m(w){o={...o,...w},p()}async function f(w){const v=e.get(w)??fetch(`/data/no2/${w}.json`).then(b=>b.json());e.set(w,v);try{const b=await v;if(r||l.value!==w)return;const T=Tt(b),I=s!==null&&(o.from!==Tt(s).from||o.to!==Tt(s).to),M=Object.keys(b.years).map(Number).filter(C=>C>=o.from&&C<=o.to),k=I&&M.length>0?{from:Math.min(...M),to:Math.max(...M)}:T;s=b,o={...k,days:o.days};const A=Object.keys(b.years);d.replaceChildren(...A.map(C=>i(C))),c.replaceChildren(...A.map(C=>i(C))),p()}catch{e.delete(w),a.replaceChildren(g("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}a.addEventListener("click",w=>{const v=w.target?.closest("[data-year]")?.getAttribute("data-year");v&&m({from:Number(v),to:Number(v)})});const y=g("div",{class:"row"},g("label",{},"Station ",l),g("label",{},"Days ",h),g("label",{},"Years ",d," to ",c),u);return t.replaceChildren(y,a,n),f(l.value),()=>{r=!0}}const ah="https://analisi.transparenciacatalunya.cat/resource";function Ir(t,e){const n=new URL(`${ah}/${t}.json`);for(const[a,s]of Object.entries(e))s!==void 0&&n.searchParams.set(`$${a}`,String(s));return n.toString()}const xs="tasf-thgu",Er=Array.from({length:24},(t,e)=>String(e+1).padStart(2,"0")),sh=0,oh=6,Wt=()=>Array.from({length:12},()=>new Array(24).fill(0)),rh=()=>({workdays:{sums:Wt(),counts:Wt()},weekends:{sums:Wt(),counts:Wt()}});function ih(t){if(!Array.isArray(t))throw new Error("the portal did not answer with rows");if(t.length===0)throw new Error("the portal answered with no rows");return t}function lh(t,e){const n=Number(e.month)-1;Er.forEach((a,s)=>{const o=t.sums[n],r=t.counts[n];if(!o||!r)throw new Error(`month ${e.month} is not a month`);o[s]=(o[s]??0)+Number(e[`s${a}`]??0),r[s]=(r[s]??0)+Number(e[`n${a}`]??0)})}const hh={name:"no2",directory:"public/data/no2",firstYear:1991,files:Ve.map(t=>`${t.code}.json`),about:{measures:"NO2, hourly, µg/m³",network:"Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica",attribution:"Generalitat de Catalunya, Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica. Dades obertes.",dataset:`https://analisi.transparenciacatalunya.cat/d/${xs}`,stations:Ve},requestsFor(t){const e=Ve.map(a=>`'${a.code}'`).join(","),n=Er.map(a=>`sum(h${a}) as s${a}, count(h${a}) as n${a}`).join(", ");return[Ir(xs,{select:`codi_eoi, date_extract_m(data) as month, date_extract_dow(data) as dow, count(*) as days, ${n}`,where:`contaminant='NO2' and codi_eoi in (${e}) and data between '${t}-01-01T00:00:00' and '${t}-12-31T23:59:59'`,group:"codi_eoi,month,dow",limit:5e3})]},withYear(t,e,n){const a=ih(n[0]);if(a.some(o=>Number(o.days)>5))throw new Error("some days are in the portal twice");if(!a.some(o=>o.month==="12"))throw new Error("the year does not reach December yet");const s=new Map;for(const o of a){const r=o.codi_eoi??"",i=s.get(r)??rh();s.set(r,i);const l=Number(o.dow);lh(l===sh||l===oh?i.weekends:i.workdays,o)}return Object.fromEntries(Ve.map(o=>{const r=`${o.code}.json`,i=s.get(o.code),l={...t[r]?.years,...i?{[e]:i}:{}};return[r,{...o,years:l}]}))}},ch=t=>{const e=JSON.parse(t(`/data/no2/${Ve[0]?.code}.json`)),n=JSON.parse(t("/data/no2/index.json"));return Ar(e,Tt(e))+kn(n)},dh={name:"air-quality",apps:{no2:nh},stills:{no2:ch},sources:[hh]},uh=9,$s=8,ae={days:5,hoursADay:$s,dayNames:["Mon","Tue","Wed","Thu","Fri"],hourNames:Array.from({length:$s},(t,e)=>`${uh+e}:00`)},ht=t=>Math.max(0,Math.min(100,t));function Ts(t){const{focus:e,fatigue:n,featureSize:a,weeks:s,calendar:o,meetingTypes:r}=t,i=[];let l=0,h=0;for(let d=0;d<s;d+=1)for(let c=0;c<ae.days;c+=1){let u=0,p=0;for(let m=0;m<ae.hoursADay;m+=1){const f=r[o[`${c}-${m}`]??""];if(f){u=ht(u+f.focus),p=ht(p+f.fatigue),i.push({week:d,day:c,hour:m,inMeeting:!0,hourFocus:u,hourFatigue:p,hourProductivity:0,accumulatedProductivity:l,completedFeatures:h,featureCompleted:!1});continue}u=ht(u+e),p=ht(p+n);const y=ht(u-p),w=a-l,v=y>w,b=v?w:y;v?(h+=1,l=0):l+=b,i.push({week:d,day:c,hour:m,inMeeting:!1,hourFocus:u,hourFatigue:p,hourProductivity:b,accumulatedProductivity:l,completedFeatures:h,featureCompleted:v}),v&&(u=0)}}return i}function _t(){return Array.from({length:ae.hoursADay},()=>new Array(ae.days).fill(0))}function qt(t,{hour:e,day:n},a){const s=t[e];s&&(s[n]=(s[n]??0)+a)}function Ss(t,{featureSize:e,weeks:n}){const a=t[t.length-1],s=a?.completedFeatures??0,o=a?.accumulatedProductivity??0,r=s+Math.round(10*o/e)/10,i=s*e+o,l=Array.from({length:ae.days},()=>({productivity:0,features:0,meetings:0})),h={focus:_t(),fatigue:_t(),productivity:_t(),features:_t()};for(const c of t){const u=l[c.day];u.productivity+=c.hourProductivity,c.featureCompleted&&(u.features+=1),c.inMeeting&&(u.meetings+=1),qt(h.focus,c,c.hourFocus),qt(h.fatigue,c,c.hourFatigue),qt(h.productivity,c,c.hourProductivity),c.featureCompleted&&qt(h.features,c,1)}const d=c=>c.map(u=>u.map(p=>n>0?p/n:0));return{totalFeatures:r,totalProductivity:i,averageFeaturesPerWeek:n>0?r/n:0,averageProductivityPerWeek:n>0?i/n:0,days:l,hours:{focus:d(h.focus),fatigue:d(h.fatigue),productivity:d(h.productivity),features:h.features}}}const _a={width:480,height:240,pad:{top:10,right:10,bottom:34,left:36}},{width:Ms,height:Rn,pad:le}=_a;function jr(t,e,n,a){const s=Ms-le.left-le.right,o=Rn-le.top-le.bottom,r=h=>le.top+o-(t>0?h/t*o:0),i=a.map(h=>`<line class="grid" x1="${le.left}" x2="${Ms-le.right}" y1="${r(h)}" y2="${r(h)}"/><text x="${le.left-4}" y="${r(h)+3}" text-anchor="end">${h}</text>`).join(""),l=(n>1?[1,Math.ceil(n/2),n]:[]).filter((h,d,c)=>c.indexOf(h)===d).map(h=>`<text x="${le.left+(h-1)/Math.max(1,n-1)*s}" y="${Rn-le.bottom+14}" text-anchor="middle">${h}</text>`).join("");return`${i}${l}<text x="${le.left+s/2}" y="${Rn-6}" text-anchor="middle">${e.x}</text><text transform="translate(9 ${le.top+o/2}) rotate(-90)" text-anchor="middle">${e.y}</text>`}const{width:As,height:ct,pad:se}=_a;function Cr(t,e,n){const a=Math.max(...t.map(m=>m.values.length),1),s=Math.max(1,...t.flatMap(m=>m.values)),o=As-se.left-se.right,r=ct-se.top-se.bottom,i=o/a,l=i*.7/t.length,h=m=>se.top+r-m/s*r,d=t.map((m,f)=>m.values.map((y,w)=>{const v=se.left+w*i+i*.15+f*l;return`<rect class="${m.className}" x="${v.toFixed(1)}" y="${h(y).toFixed(1)}" width="${l.toFixed(1)}" height="${(se.top+r-h(y)).toFixed(1)}"><title>${m.name}: ${Math.round(y*10)/10}</title></rect>`}).join("")).join(""),c=(n??[]).map((m,f)=>`<text x="${se.left+f*i+i/2}" y="${ct-se.bottom+14}" text-anchor="middle">${m}</text>`).join(""),u=t.map((m,f)=>`<rect class="${m.className}" x="${se.left+f*90}" y="${ct-se.bottom+20}" width="10" height="3"/><text x="${se.left+f*90+14}" y="${ct-se.bottom+24}">${m.name}</text>`).join(""),p=jr(s,e,n?0:a,Wa(s));return`<svg viewBox="0 0 ${As} ${ct}" role="img" aria-label="${e.y} by ${e.x}">${p}${d}${c}${u}</svg>`}const Is={sizeAt(t){return t<=500?t:t<=750?500+(t-500)*2:t<1e3?1e3+(t-750)*35:1e4},positionOf(t){return t<=500?t:t<=1e3?500+(t-500)/2:t<1e4?750+(t-1e3)/35:1e3}};function zt(t,e){const n=e.flat(),a=Math.min(...n),s=Math.max(...n),o=g("div",{class:"week"},g("span"),...ae.dayNames.map(r=>g("span",{class:"head"},r)));return e.forEach((r,i)=>{o.append(g("span",{class:"hour"},ae.hourNames[i]??""));for(const l of r){const h=s>a?(l-a)/(s-a):0;o.append(g("span",{class:"cell",style:`--heat:${(.1+h*.9).toFixed(2)}`},String(Math.round(l))))}}),g("div",{},g("h4",{},t),o)}function mh(t){const e={focus:25,fatigue:15,featureSize:300,weeks:8},n={"🍽️ Lunch":{focus:-100,fatigue:-100},"🏃 Sprint plan":{focus:-100,fatigue:50},"😴 Boring":{focus:-50,fatigue:-25}},a={};for(let j=0;j<ae.days;j+=1)a[`${j}-3`]="🍽️ Lunch";let s="🏃 Sprint plan",o=null;const r=g("div",{class:"figures"}),i=g("div",{class:"chart"}),l=g("div",{class:"maps"}),h=g("div",{class:"week"}),d=g("select"),c=g("input",{type:"number",min:-100,max:100}),u=g("input",{type:"number",min:-100,max:100}),p=g("input",{type:"text",placeholder:"New meeting name",size:16}),m=(j,S,L,$,E=D=>D,R=D=>D)=>{const D=g("output",{},String(e[j])),B=g("input",{type:"range",min:L,max:$,value:R(e[j]),oninput:()=>{e[j]=E(Number(B.value)),D.textContent=String(e[j]),O()}});return g("label",{},`${S}: `,D,B)},f=g("div",{class:"dials"},m("focus","Focus an hour",0,100),m("fatigue","Fatigue an hour",0,100),m("featureSize","Feature size",0,1e3,Is.sizeAt,Is.positionOf),m("weeks","Weeks",1,16));function y(){d.replaceChildren(...Object.keys(n).map(S=>g("option",{value:S,selected:S===s},S)));const j=n[s];c.value=String(j?.focus??0),u.value=String(j?.fatigue??0)}d.addEventListener("change",()=>{s=d.value,y()});const w=()=>{n[s]={focus:Number(c.value)||0,fatigue:Number(u.value)||0},O()};c.addEventListener("change",w),u.addEventListener("change",w);const v=()=>{const j=p.value.trim();!j||n[j]||(n[j]={focus:0,fatigue:0},s=j,p.value="",y())},b=g("div",{class:"row"},g("span",{},"Paint: "),d,g("span",{},"focus "),c,g("span",{},"fatigue "),u,p,g("button",{type:"button",onclick:v},"Add"));let T=null;const I=j=>{if(T==="add"&&!a[j])a[j]=s;else if(T==="remove"&&a[j])delete a[j];else return;O()};function M(){h.replaceChildren(g("span"),...ae.dayNames.map(j=>g("span",{class:"head"},j))),ae.hourNames.forEach((j,S)=>{h.append(g("span",{class:"hour"},j));for(let L=0;L<ae.days;L+=1){const $=`${L}-${S}`,E=a[$];h.append(g("span",{class:E?"slot meeting":"slot",title:E??"free",onpointerdown:R=>{R.preventDefault(),T=a[$]?"remove":"add",I($)},onpointerenter:()=>{T&&I($)}},E?E.slice(0,2):""))}})}window.addEventListener("pointerup",()=>{T=null});const k=g("div",{class:"row"}),A=()=>{o={summary:Ss(Ts({...e,calendar:a,meetingTypes:n}),e),weeks:e.weeks},O()},C=()=>{o=null,O()};function O(){M();const j=Ts({...e,calendar:a,meetingTypes:n}),S=Ss(j,e),L=e.weeks*ae.days*ae.hoursADay;r.replaceChildren(g("div",{class:"clean"},g("strong",{},S.totalFeatures.toFixed(1)),"features finished"),g("div",{},g("strong",{},S.averageFeaturesPerWeek.toFixed(2)),"features a week"),g("div",{},g("strong",{},Math.round(S.totalProductivity/L).toString()),"productivity an hour"),g("div",{},g("strong",{},String(L)),"hours simulated")),k.replaceChildren(o?g("span",{},`Baseline: ${o.summary.averageFeaturesPerWeek.toFixed(2)} features a week over ${o.weeks} weeks; now ${S.averageFeaturesPerWeek.toFixed(2)}. `):g("span",{},"Keep this run to compare against: "),g("button",{type:"button",onclick:A},o?"Save again":"Save as baseline")),o&&k.append(g("button",{type:"button",onclick:C},"Clear")),i.innerHTML=Cr([{name:"Productivity",className:"clean",values:S.days.map($=>$.productivity/e.weeks)},{name:"Features ×100",className:"debt",values:S.days.map($=>$.features/e.weeks*100)}],{x:"",y:"A day, on average"},ae.dayNames),i.prepend(g("h4",{},"The shape of a week")),l.replaceChildren(zt("Focus",S.hours.focus),zt("Fatigue",S.hours.fatigue),zt("Productivity",S.hours.productivity),zt("Features finished",S.hours.features))}y(),t.append(f,b,g("div",{class:"charts"},h,i),r,k,l),O()}const ph={name:"developer-meetings",apps:{"developer-meetings":mh}},dt={exams:[.01,.01,.02,.01,.05,.2,.05,.1,.2,.3,.5,.4,.3,.2,.1,.05,.1,.3,.8,1,.4],labs:[.01,.02,.03,.04,.06,.09,.12,.17,.23,.32,.44,.48,.58,.78,.87,.89,.78,.75,.62,.45,.2]},Fn={x:{frames:1,pace:1},normal:{frames:2,pace:1},normal1:{frames:2,pace:1},normal2:{frames:2,pace:1},est:{frames:7,pace:5},zz:{frames:2,pace:5},bt:{frames:6,pace:1},http:{frames:8,pace:2},pract:{frames:5,pace:1},no:{frames:4,pace:3},bar0:{frames:6,pace:1},amig:{frames:4,pace:3},suplica:{frames:2,pace:3}};class Or{static everyImage=Object.entries(Fn).flatMap(([e,{frames:n}])=>Array.from({length:n},(a,s)=>`${e}${s}`));series="x";frame=0;wait=0;after=null;shaking=-1;get image(){return`${this.series}${this.frame}`}play(e){if(this.shaking>=0){this.after=e;return}e!==this.series&&(this.wait=0),this.show(e)}flash(e,n){this.shaking<0&&(this.after=this.series),this.shaking=n,this.show(e)}stop(){this.shaking=-1,this.after=null,this.series="x",this.frame=0}beat(){if(this.shaking===0&&this.after&&this.show(this.after),this.shaking>=0&&(this.shaking-=1),this.wait>0&&(this.wait-=1),this.wait>0)return;const{frames:e,pace:n}=Fn[this.series];this.frame=(this.frame+1)%e,this.wait=n}show(e){this.series=e,this.frame%=Fn[e].frames}}const re=3,Ce=16,fh=25,Te=20,Es=22,Bn=200,Dn=100,Hn=100,js=30,Cs=-10,gh=.05,wh=.3,Os=10/re,Ls={superior:40,tecnica:25},yh={step:0,hour:0,day:0,term:1,doing:"idle",boredom:0,stress:0,labHabit:10,studyHabit:10,chatHabit:10,barHabit:10,friends:10,sleep:0,terminal:0,exams:Array(10).fill(0),labs:Array(10).fill(0),enrolled:4,passed:0,left:9,selection:!0,alfas:Array(6).fill(1),asks:null,suggested:0,ended:null,said:[]},bh=`Sorry, but you no longer belong to this faculty. :(



Normal.`,vh=`Hey, what are you playing at????
Have you never had a pet??!!!??
Thanks to you the poor thing nearly died of
boredom in this faculty!!!! Let's see if
we give it a little more attention,
and the excuse that it gets bored
because there are no girls at the FIB won't do!
(because there are, and some of them are really
pretty, and this is not flattery, boti boti boti).
So now you know, this is all
YOUR FAULT (a pet gets a little
attention, doesn't it?)`,kh=`Don't you know that stress is really bad
for your health? Your Fibergochi has had to
leave the faculty, be more careful next time!
See if you can take its mind off things a little,
make new and interesting friends... or not so much...`;class ba{constructor(e,n={}){this.random=e;const a={...yh,...n};this.s={...a,exams:[...a.exams],labs:[...a.labs],alfas:[...a.alfas],said:[...a.said]},this.s.ended===null&&this.show(this.s.doing)}random;s;sprite=new Or;beats=0;get state(){return{...this.s,exams:[...this.s.exams],labs:[...this.s.labs],alfas:[...this.s.alfas],said:[...this.s.said]}}get picture(){return this.sprite.image}get clock(){const e=this.s.step+this.s.hour*re,n=e*30%60;return`${this.s.day+1}, ${Math.floor(e/(re*Ce)*24)}:${n<10?"0":""}${n}h (${this.s.term})`}get examsPending(){return this.studyLeft>0}get labsPending(){return this.labLeft>0}get studyLeft(){return this.taken(this.s.exams).reduce((e,n)=>e+Math.max(n,0),0)}get labLeft(){return this.taken(this.s.labs).reduce((e,n)=>e+Math.max(n,0),0)}get hasTerminal(){return this.s.terminal>0}get lampsLit(){return this.s.day<Te||this.beats%3===1}get enrolment(){return{most:Math.min(10,this.s.left),suggested:this.s.suggested}}get alive(){return this.s.ended===null}get waiting(){return this.s.said.length>0||this.s.asks!==null}step(){!this.alive||this.waiting||(this.keepHabits(),this.studyOrWork(),this.holdTerminal(),this.browseOn(),this.getBored(),this.calmDown(),this.alive&&(this.searchTerminal(),this.followHabits(),this.stayAtBar(),this.s.step+=1,this.s.step>=re&&(this.s.step=0,this.nextHour())))}animate(){!this.alive||this.waiting||(this.beats+=1,this.sprite.beat())}studyOrSleep(){this.alive&&(this.s.day<=Te?this.set(this.random()<.5?"studying":"asleep"):this.sprite.flash("no",24))}browse(){this.alive&&(this.s.terminal?this.set("browsing"):this.sprite.flash("no",14))}goToBar(){this.alive&&this.set("bar")}makeFriends(){this.alive&&this.set("friends")}lookForTerminal(){this.alive&&(this.s.terminal<=0?this.set("looking"):this.sprite.flash("no",10))}beg(){if(!this.alive)return;const{exams:e,labs:n}=this.s,a=r=>e[r]+n[r],s=this.taken(e).map((r,i)=>i).filter(r=>a(r)>0);if(this.s.day<Te||s.length===0)return this.sprite.flash("no",10);const o=s.reduce((r,i)=>a(i)<a(r)?i:r);this.sprite.flash("suplica",20),this.random()<wh&&(e[o]-=this.random()*Os),this.s.stress+=Os*this.random()}alfa(){if(!this.alive)return;const{term:e,left:n,selection:a,alfas:s,enrolled:o,exams:r,labs:i,day:l,passed:h}=this.s;let d=`Score: this is term ${e} you have been at the FIB.

`;if(a)d+=`You are doing the Selection Phase.
You have ${n} credits left to finish it.

`;else{d+=`You are in the middle of the degree, and have ${n} credits left to finish.

`;const c=s.filter(p=>p<1).length,u=s.filter(p=>p<=.5).length;c>0?(d+=`Of your last six alfa parameters at most, you have:
 - ${c} notable.
`,u>0&&(d+=` - of these, ${u} dangerous.
`),d+=`
`,s.forEach((p,m)=>{p<1&&(d+=`The alfa of ${s.length-m} terms ago:	${Math.round(p*100)/100}.
`)}),d+=`
`):d+=`You have an impeccable record. (swot)

`}if(l<=Es){const c=[0,0,0,0,0];for(let p=0;p<o;p+=1){const m=r[p]+i[p];c[m<=0?0:m<=2*re?1:m<=5*re?2:m<=8*re?3:4]+=1}const u=["subjects going well","that will go well with a little effort","subjects you should get down to","subjects you find hard","subjects you had better pray for"];c.forEach((p,m)=>{p>0&&(d+=`You have ${p} ${u[m]}.
`)}),d+=`You are enrolled in ${o} subjects in all.`}else d+=`Of ${o}, ${h} are passed.`;this.s.said.push(d)}dismiss(){this.s.said.shift()}enrol(e){return this.s.asks!=="enrol"||!Number.isInteger(e)||e<1||e>this.enrolment.most?!1:(this.s.enrolled=e,this.s.asks=null,!0)}choose(e){this.s.asks==="degree"&&(this.s.left=Ls[e],this.askEnrolment())}keepHabits(){const{doing:e}=this.s;e==="lab"?this.s.labHabit+=1:e==="studying"?this.s.studyHabit+=1:e==="browsing"?this.s.chatHabit+=1:e==="friends"?this.s.friends+=1:e==="bar"&&(this.s.barHabit+=1,this.s.friends+=.4),this.s.friends=Math.min(this.s.friends,Hn)}studyOrWork(){if(this.s.doing==="lab"){if(!this.labsPending)return this.set("idle");const e=this.easiest(this.s.labs);100-this.s.exams[e]>this.random()*100&&(this.s.labs[e]-=1)}else if(this.s.doing==="studying"){if(!this.examsPending)return this.set("idle");this.s.exams[this.easiest(this.s.exams)]-=1}}easiest(e){const{exams:n,labs:a}=this.s;let s=this.taken(e).findIndex(r=>r>0),o=n[s]+a[s]+s;for(let r=s+1;r<this.s.enrolled;r+=1){const i=n[r]+a[r];o>i&&e[r]>0&&(s=r,o=i+r)}return s}holdTerminal(){if(this.s.day>Te||this.s.terminal<=0){this.s.terminal=0;return}this.s.doing==="idle"&&this.labsPending&&this.set("lab"),this.s.doing==="lab"?this.s.terminal=Math.round(this.s.terminal+this.random()):(this.s.doing!=="browsing"||this.random()<=dt.labs[this.s.day])&&(this.s.terminal-=1),this.s.terminal=Math.max(this.s.terminal,0)}browseOn(){this.s.doing==="browsing"&&(this.s.boredom+=Math.round(.5*this.random()),this.s.terminal<=0&&this.set("idle"))}getBored(){const{doing:e}=this.s;if(e==="idle"?(this.s.boredom+=1,this.s.boredom%10===0&&this.set("idle")):e==="studying"?this.s.boredom+=.1:e==="lab"?this.s.boredom+=this.random()/2:e==="asleep"?this.s.boredom-=1:e==="bar"&&(this.s.boredom-=this.random()),this.s.boredom>Bn)return this.end("bad",vh);this.s.boredom=Math.max(this.s.boredom,-Bn/2)}calmDown(){this.s.doing==="bar"&&(this.s.stress-=1),this.s.stress=Math.max(this.s.stress,0),this.s.stress>Dn&&this.end("bad",kh)}searchTerminal(){const{doing:e,day:n}=this.s;if(e==="looking"&&n<=Te&&this.s.terminal<=0){this.s.stress+=1;const a=(.5+dt.exams[n])*(1-dt.labs[n]),s=this.random();if(s<=a){const o=(s<=a/2?4:2)*(re+1);this.s.terminal=Math.round(o*this.random()),this.set("idle")}}else e==="looking"&&this.set("idle");n>Te&&(this.s.terminal=0)}followHabits(){const{doing:e,hour:n}=this.s,a=this.s.labHabit/this.s.chatHabit/2,s=this.s.chatHabit/this.s.labHabit/2,o=this.s.studyHabit/this.s.barHabit/2,r=this.labsPending,i=l=>this.random()<l;if(this.s.terminal>0)if(e==="lab")a<=.5?i(.5-a)&&this.set("browsing"):r||this.set(this.random()>(.5-s)*2?"browsing":"idle");else if(e==="browsing")if(r){const[l,h]=this.s.terminal<re?[2,1]:[1,2];(s<=.5?i((.5-s)*l):this.random()>(.5-a)*h)&&this.set("lab")}else s<.5&&this.random()*.4>s&&this.set("idle");else(e==="idle"||e==="studying")&&(this.s.friends>Hn/2&&i(.5-o)&&this.set("bar"),s<=.5&&i(.5-s)&&this.set("browsing"),a<=.5&&i(.5-a)&&r&&this.set("lab"));else if(e==="studying"&&o<=.5){const l=n<Ce/4?re:n>3*Ce/4?re/2:1;this.random()*l<.5-o&&this.set("bar")}}stayAtBar(){this.s.doing==="bar"&&this.s.friends/Hn<this.random()/2&&this.set("idle")}nextHour(){if(this.getSleepy(),this.s.doing==="lab"&&(this.s.boredom+=Math.round(4*this.random())),this.classInTheRoom(),this.s.hour<Ce-1){this.s.hour+=1;return}this.s.hour=0,this.nextDay()}getSleepy(){const e=this.s.hour<Ce*3/4;this.s.doing!=="asleep"?(e?this.s.sleep+=1:this.s.doing==="idle"&&this.s.sleep>5?this.set("asleep"):this.s.sleep+=2+(this.s.terminal>0?1:0),this.s.sleep>(this.s.terminal>0?js*1.25:js)&&this.set("asleep")):e&&this.s.sleep<Cs/4?this.set("idle"):(this.s.sleep-=2,this.s.sleep<Cs&&this.set("idle"))}classInTheRoom(){const{hour:e}=this.s;e>=Ce/3&&e<=2*Ce/3&&this.random()<gh&&(this.s.terminal=0)}nextDay(){const{day:e}=this.s;if(this.fadeHabits(),e<Te?this.bringWork():e===Es&&this.mark(),e<fh-1){this.s.day+=1;return}this.s.day=0,this.nextTerm()}fadeHabits(){const e=n=>Math.max(1,Math.round(n*.9));this.s.labHabit=e(this.s.labHabit),this.s.studyHabit=e(this.s.studyHabit),this.s.barHabit=e(this.s.barHabit),this.s.chatHabit=e(this.s.chatHabit),this.s.friends=e(this.s.friends)}bringWork(){const e=this.s.day+5;if(this.s.day===0)for(let n=e;n>=0;n-=1)this.bringWorkFor(n);else e<Te&&this.bringWorkFor(e)}bringWorkFor(e){for(let n=0;n<this.s.enrolled;n+=1){const a=re*((n+1)/2)+1;this.random()<=dt.labs[e]&&(this.s.labs[n]+=Math.round(a*this.random())),this.random()<=dt.exams[e]&&(this.s.exams[n]+=Math.round(a*this.random()))}}mark(){for(let e=0;e<this.s.enrolled;e+=1)this.s.exams[e]+this.s.labs[e]<re&&(this.s.passed+=1);this.s.alfas=[...this.s.alfas.slice(1),this.s.alfas[5]],this.s.exams.fill(0),this.s.labs.fill(0)}nextTerm(){const{enrolled:e,passed:n,selection:a,term:s}=this.s;if(this.s.alfas[5]=a?1:e?n/e:0,this.s.alfas.filter(o=>o<.5).length>3)return this.end("bad","You have 4 Alfa parameters below 0.5, bye, bye.");if(this.s.left-=n,this.s.passed=0,this.s.term+=1,this.s.left<=0){if(!a)return this.end("good",`Very Good!
You did it!!!!!!!
Your Fibergochi has finished the degree!!!!!
`,`ERROR 315: in module KERNEL386.EXE,
page 0137:0A285F43.
An UNFORESEEN situation has occurred,
we are very sorry, but we thought that
nobody would ever get here, where no
other man has gone before!.`);this.s.selection=!1,this.s.said.push("You have SUCCESSFULLY finished the SELECTION PHASE!!!!!"),this.s.asks="degree";return}if(a&&s===2&&this.s.left>8)return this.end("bad","BACARRA!!!!");if(a&&s>3){if(this.s.left>2)return this.end("bad","You have not got through the Selection Phase.");this.s.said.push(`You have not passed everything, but it is not serious.
YOU HAVE GOT THROUGH THE SELECTION PHASE, but... They will not throw you out, but you have to go to
the Técnica (or rather, they make you).`),this.s.left=Ls.tecnica,this.s.selection=!1}this.askEnrolment()}askEnrolment(){this.s.asks="enrol",this.s.suggested=Math.min(Math.round(this.random()*4)+3,this.s.left)}taken(e){return e.slice(0,this.s.enrolled)}set(e){this.s.doing=e,this.show(e)}show(e){if(e==="lab")this.sprite.play("pract");else if(e==="studying")this.sprite.play("est");else if(e==="asleep")this.sprite.play("zz");else if(e==="looking")this.sprite.play("bt");else if(e==="friends")this.sprite.play("amig");else if(e==="browsing")this.sprite.play("http");else if(e==="bar")this.sprite.play("bar0");else{const n=this.s.boredom+this.s.stress,a=Bn+Dn;n<a/3?this.sprite.play("normal"):n<a/1.5?this.sprite.play("normal1"):this.sprite.play("normal2"),this.s.stress>Dn*2/3&&this.sprite.play("normal2")}}end(e,...n){this.s.said.push(...n),e==="bad"&&this.s.said.push(bh),this.s.ended=e,this.s.asks=null,this.sprite.stop()}}const xh=["step","hour","day","term","boredom","stress","labHabit","studyHabit","chatHabit","barHabit","friends","sleep","terminal","enrolled","passed","left","suggested"],$h=["idle","asleep","studying","browsing","looking","lab","bar","friends"],Wn=(t,e)=>Array.isArray(t)&&t.length===e&&t.every(n=>Number.isFinite(n));function Th(t){let e;try{e=JSON.parse(t??"null")}catch{return null}return typeof e!="object"||e===null||Array.isArray(e)?null:xh.every(a=>Number.isFinite(e[a]))&&$h.includes(e.doing)&&Wn(e.exams,10)&&Wn(e.labs,10)&&Wn(e.alfas,6)&&typeof e.selection=="boolean"&&[null,"enrol","degree"].includes(e.asks)&&[null,"good","bad"].includes(e.ended)&&Array.isArray(e.said)&&e.said.every(a=>typeof a=="string")?e:null}const Sh={x:"A cross: there is no Fibergochi.",normal:"The Fibergochi, standing about.",normal1:"The Fibergochi, standing about, getting bored.",normal2:"The Fibergochi, bored stiff.",est:"The Fibergochi at a desk, studying.",zz:"The Fibergochi, asleep.",bt:"A room full of terminals, all taken, and the Fibergochi looking for a free one.",http:"A terminal, and the Fibergochi browsing: http.",pract:"The Fibergochi at a terminal, doing a lab.",no:"The Fibergochi, shaking its head.",bar0:"The Fibergochi at the bar with its friends, drinks on the table.",amig:"The Fibergochi with a group of friends.",suplica:"The Fibergochi on the floor, begging."},Mh=[[["study","estudio","Study/Sleep","to study or to sleep."]],[["http","http","http","to have a good time at a terminal (if you have one)."],["alfa","alfa","alfa","see the score."],["bar","bar","Bar","go to the bar, have a drink or play mus."]],"screen",[["friends","amigos","Friends","to make new friends."],["terminal","bt","Find terminal","look for a terminal to do labs, or not."],["beg","suplica","Beg","to try to get more passes."]]],Ah={slow:"slow",normal:"normal",fast:"fast"};function Ns(t,[e,n,a,s]){if(t<=0)return e;if(t<3)return`${n}, under an hour`;const o=Math.round(t/3);return`${t<15?a:s}, about ${o} ${o===1?"hour":"hours"}`}const ke=(t,e,{title:n="",disabled:a=!1}={})=>`<button type="button" data-do="${t}"${n?` title="${x(n)}"`:""}${a?" disabled":""}>${e}</button>`;function Lr(t,{running:e,confirmingNew:n,pace:a,picked:s=null}){const o=!t.alive||t.waiting||n,r=m=>m&&t.lampsLit?"on":"off",i=[["exam",r(t.examsPending),Ns(t.studyLeft,["nothing to study","a little to study","something to study","a lot to study"])],["lab",r(t.labsPending),Ns(t.labLeft,["no lab to do","a little lab work","some lab work","a lot of lab work"])],["terminal",t.hasTerminal?"on":"off",t.hasTerminal?"a terminal":t.labsPending?"no terminal, and labs need one":"no terminal"]],l=i.map(([m,f,y])=>`<li><button type="button" class="lamp ${f}" data-do="lamp-${m}" data-lamp="${m}" title="${m}: ${y}">${m}</button></li>`).join(""),h=i.map(([m,f,y])=>`<li class="${f}${m===s?" picked":""}" data-lamp="${m}"><b>${m}</b> ${y}</li>`).join(""),d=t.picture,c=Sh[d.replace(/\d$/,"")]??"",u=`<div class="screen"><ul class="lamps" data-show="lamps">${l}</ul><img data-show="picture" src="/fibergochi/${d}.gif" alt="${c}" width="200" height="160"></div>`;return`<div class="fibergochi"><div class="egg"><p class="by"><span>by</span> Night</p>${Mh.map(m=>m==="screen"?u:`<div class="keys">${m.map(([f,y,w,v])=>{const[b,T]=y==="alfa"?[15,11]:[22,21];return ke(f,`<img src="/fibergochi/keys/${y}.gif" alt="${w}" width="${b*2}" height="${T*2}">`,{title:`${w}: ${v}`,disabled:o})}).join("")}</div>`).join("")}</div><div class="panel"><p class="time"><output data-show="clock">${t.clock}</output> ${ke("pause",e?"pause":"go on")} ${ke("speed",`speed: ${Ah[a]}`,{title:"Change the speed of time."})} ${ke("new","new")}</p><ul class="legend" data-show="legend">${h}</ul>${Ih(t,n)}</div></div>`}function Ih(t,e){const{said:n,asks:a}=t.state,s=(o,...r)=>`<div class="dialog" role="alertdialog"><p>${x(o).replaceAll(`
`,"<br>")}</p><p>${r.join(" ")}</p></div>`;if(e)return s("Are you sure you want a new Fibergochi?",ke("new-yes","OK"),ke("new-no","Cancel"));if(n.length>0)return s(n[0],ke("ok","OK"));if(a==="degree")return s("Do you want to do the Superior?",ke("superior","OK"),ke("tecnica","Cancel"));if(a==="enrol"){const{most:o,suggested:r}=t.enrolment;return`<form class="dialog" data-do="enrol"><label>How many credits do you want to enrol in? [1..${o}] <input type="number" name="credits" min="1" max="${o}" value="${r}"></label> <button type="submit">OK</button></form>`}return""}const Ps="fibergochi:1999-03-02",_n={slow:1e3,normal:400,fast:10},Eh={slow:"normal",normal:"fast",fast:"slow"},jh=100,Ch=10;function Oh(t){let e=new ba(Math.random,p()??{}),n=!0,a=!1,s=null,o="slow",r=0;const i=vn(t),l=document.createElement("div"),h=g("div",{hidden:!0},...Or.everyImage.map(k=>g("img",{src:`/fibergochi/${k}.gif`,alt:"",width:50,height:40}))),d=()=>Lr(e,{running:n,confirmingNew:a,pace:o,picked:s});function c(){const k=document.activeElement instanceof HTMLElement&&l.contains(document.activeElement)?document.activeElement.dataset.do:void 0;l.innerHTML=d(),k&&l.querySelector(`[data-do="${k}"]`)?.focus()}function u(){const k=document.createElement("div");k.innerHTML=d();for(const A of l.querySelectorAll("[data-show]")){const C=k.querySelector(`[data-show="${A.dataset.show}"]`);C&&(A instanceof HTMLImageElement?A.getAttribute("src")!==C.getAttribute("src")&&(A.src=C.getAttribute("src")??"",A.alt=C.getAttribute("alt")??""):A.innerHTML!==C.innerHTML&&(A.innerHTML=C.innerHTML))}}function p(){try{return Th(localStorage.getItem(Ps))}catch{return null}}function m(){try{localStorage.setItem(Ps,JSON.stringify(e.state))}catch{}}const f=()=>n&&i.onScreen()&&e.alive&&!e.waiting;let y=setTimeout(w,_n[o]);function w(){if(y=setTimeout(w,_n[o]),!!f()){if(e.step(),r+=1,e.waiting||!e.alive){m(),c();return}r%Ch===0&&m(),u()}}const v=setInterval(()=>{f()&&(e.animate(),u())},jh),b={study:()=>e.studyOrSleep(),http:()=>e.browse(),alfa:()=>e.alfa(),bar:()=>e.goToBar(),friends:()=>e.makeFriends(),terminal:()=>e.lookForTerminal(),beg:()=>e.beg()},T={pause:()=>n=!n,speed:()=>{o=Eh[o],clearTimeout(y),y=setTimeout(w,_n[o])},new:()=>a=!0,"new-no":()=>a=!1,"new-yes":()=>{e=new ba(Math.random),a=!1,n=!0},ok:()=>e.dismiss(),superior:()=>e.choose("superior"),tecnica:()=>e.choose("tecnica")};function I(k){const A=k.target.closest("button[data-do]")?.dataset.do??"";A.startsWith("lamp-")?(s=A.slice(5),u()):b[A]?(b[A](),e.waiting?c():u()):T[A]&&(T[A](),m(),c())}function M(k){k.preventDefault();const A=k.target.querySelector("input[name=credits]");A&&e.enrol(Number(A.value))&&(m(),c())}return t.addEventListener("click",I),t.addEventListener("submit",M),window.addEventListener("pagehide",m),t.replaceChildren(l,h),c(),()=>{clearTimeout(y),clearInterval(v),i.stop(),m(),t.removeEventListener("click",I),t.removeEventListener("submit",M),window.removeEventListener("pagehide",m)}}const Lh=()=>Lr(new ba(Math.random),{running:!0,confirmingNew:!1,pace:"slow"}),Nh={name:"fibergochi",apps:{fibergochi:Oh},stills:{fibergochi:Lh}},ye=t=>[...t.replace(/\s/g,"")].map(e=>e==="#"?1:0),at={A:ye(".###. #...# ##### #...# #...#"),B:ye("####. #...# ####. #...# ####."),C:ye(".#### #.... #.... #.... .####"),D:ye("####. #...# #...# #...# ####."),E:ye("##### #.... ####. #.... #####"),H:ye("#...# #...# ##### #...# #...#"),O:ye(".###. #...# #...# #...# .###."),T:ye("##### ..#.. ..#.. ..#.. ..#.."),X:ye("#...# .#.#. ..#.. .#.#. #...#")};function Pt(t){let e=t>>>0;return()=>{e=e+1831565813>>>0;let n=Math.imul(e^e>>>15,1|e);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}const Ph=t=>1/(1+Math.exp(-t));class Rh{weights;constructor(e,n){const a=Pt(n);this.weights=e.slice(1).map((s,o)=>Array.from({length:s},()=>Array.from({length:e[o]+1},()=>a()-.5)))}forward(e){const n=[[...e]];for(const a of this.weights){const s=[...n[n.length-1],1];n.push(a.map(o=>Ph(o.reduce((r,i,l)=>r+i*s[l],0))))}return n}answer(e){return this.forward(e).pop()}learn(e,n,a){const s=this.forward(e),o=s[s.length-1];let r=o.map((l,h)=>(l-n[h])*l*(1-l));for(let l=this.weights.length-1;l>=0;l-=1){const h=[...s[l],1],d=this.weights[l],c=s[l].map((u,p)=>{let m=0;for(let f=0;f<d.length;f+=1)m+=d[f][p]*r[f];return m*u*(1-u)});for(let u=0;u<d.length;u+=1)for(let p=0;p<h.length;p+=1)d[u][p]-=a*r[u]*h[p];r=c}let i=0;for(let l=0;l<o.length;l+=1)i+=(o[l]-n[l])**2;return i/2}}const Fh=10,Rs=.5;class Nr{constructor(e,n){this.shapes=e,this.network=new Rh([25,Fh,e.length],n),this.noise=Pt(n+1)}shapes;network;noise;rounds=0;error=0;train(e){for(let n=0;n<e;n+=1){let a=0;this.shapes.forEach(({pixels:s},o)=>{const r=this.shapes.map((l,h)=>h===o?1:0),i=Math.floor(this.noise()*s.length);a+=this.network.learn(s,r,Rs),a+=this.network.learn(s.map((l,h)=>h===i?1-l:l),r,Rs)}),this.error=a,this.rounds+=1}}read(e){const n=this.network.answer(e);return this.shapes.map(({name:a},s)=>({letter:a,score:n[s]}))}}const Bh=[{name:"A",pixels:at.A},{name:"B",pixels:at.B}];function va(t=Bh){const e=new Nr(t,1);return e.train(200),e}const Dh=3;function Pr(t,e,n){const a=t.trim();return a===""?"Give it a name first.":[...a].length>Dh?"A name of three characters at most.":n.includes(a)?`“${a}” is already a letter it knows.`:e.some(Boolean)?null:"There is no ink on the grid to remember."}const Hh=t=>Array.isArray(t)&&t.length===25&&t.every(e=>e===0||e===1);function Wh(t,e=[]){let n;try{n=JSON.parse(t??"[]")}catch{return[]}if(!Array.isArray(n))return[];const a=[];for(const s of n){const{name:o,pixels:r}=s??{};typeof o!="string"||!Hh(r)||Pr(o,r,[...e,...a.map(i=>i.name)])||a.push({name:o.trim(),pixels:r})}return a}function Rr(t,e){const n=e.map((i,l)=>`<button type="button" class="cell" data-at="${l}" aria-pressed="${i?"true":"false"}" aria-label="cell ${l+1}"></button>`).join(""),a=t.read(e),s=a.reduce((i,l)=>l.score>i.score?l:i),o=a.map(({letter:i,score:l})=>`<tr${i===s.letter?' class="best"':""}><th scope="row">${x(i)}</th><td class="sure"><span class="bar" style="--p:${l.toFixed(3)}"></span>${Math.round(l*100)}%</td></tr>`).join(""),r=t.rounds===0?"It has not been taught anything yet: every answer is a guess.":`It reads <b>${x(s.letter)}</b>, after ${t.rounds} rounds of lessons.`;return`<div class="letters"><div class="grid" role="group" aria-label="the drawing, five cells by five">${n}</div><div class="reading"><p>${r}</p><table class="answers"><tbody>${o}</tbody></table></div></div>`}const Fs="first-network:own",Bs=Object.entries(at).map(([t,e])=>({name:t,pixels:e}));function _h(t){let e=f();const n=new Set(["A","B",...e.map(({name:k})=>k)]),a=()=>[...Bs,...e];let s=va(p()),o=[...at.A];const r=g("div",{onclick:k=>{const A=k.target.closest("[data-at]")?.dataset.at;A!==void 0&&(o[Number(A)]=1-o[Number(A)],c())}}),i=g("div",{class:"row"}),l=g("div",{class:"row taught"}),h=g("input",{type:"text",maxlength:3,size:4,"aria-label":"a name for the drawing"}),d=g("p",{class:"error",hidden:!0});function c(){r.innerHTML=Rr(s,o)}function u(k){o=k,c()}function p(){return a().filter(k=>n.has(k.name))}function m(){s=va(p()),c()}function f(){try{return Wh(localStorage.getItem(Fs),Object.keys(at))}catch{return[]}}function y(){try{localStorage.setItem(Fs,JSON.stringify(e))}catch{}}function w(){const k=Pr(h.value,o,a().map(C=>C.name));if(d.textContent=k??"",d.hidden=k===null,k)return;const A={name:h.value.trim(),pixels:[...o]};e=[...e,A],n.add(A.name),h.value="",y(),T(),m()}function v(k){e=e.filter(A=>A.name!==k),n.delete(k);for(const A of Bs)n.size<2&&n.add(A.name);y(),T(),m()}const b=(k,A)=>g("button",{type:"button",onclick:A},k);function T(){i.replaceChildren("Draw ",...a().map(k=>b(k.name,()=>u([...k.pixels]))),b("one cell wrong",()=>{const k=Math.floor(Math.random()*o.length);u(o.map((A,C)=>C===k?1-A:A))}),b("clear",()=>u(o.map(()=>0)))),l.replaceChildren("Taught: ",...a().map(k=>{const A=g("input",{type:"checkbox",value:k.name,checked:n.has(k.name),onchange:()=>{A.checked?n.add(k.name):n.size>2?n.delete(k.name):A.checked=!0,m()}}),C=e.includes(k)&&g("button",{type:"button",class:"forget","aria-label":`forget ${k.name}`,onclick:()=>v(k.name)},"×");return g("label",{},A,` ${k.name}`,C)}))}const I=g("div",{class:"row"},b("teach 100 more rounds",()=>{s.train(100),c()}),b("forget everything",()=>{s=new Nr(s.shapes,1),c()})),M=g("div",{class:"row own"},"Your own: draw it, name it ",h,b("remember this drawing",()=>w()),d);T(),t.replaceChildren(i,r,l,I,M),c()}const qh=()=>Rr(va(),at.A),zh={name:"first-network",apps:{letters:_h},stills:{letters:qh}},Gh=1.5,Yh=.02,Uh=.25;class Jh{constructor(e,n,a,s){this.credit=a,this.random=s,this.remaining=[...e],this.buyers=n.map(o=>({bidder:o,credit:a,won:[],error:null}))}credit;random;buyers;remaining;sold=[];turns=[];get over(){return this.remaining.length===0}get next(){return this.remaining[0]}get market(){return{lots:this.remaining,credits:Object.fromEntries(this.buyers.map(e=>[e.bidder.name,e.credit])),sales:this.sold}}demands(){const e=this.next;return Object.fromEntries(this.buyers.map(n=>[n.bidder.name,e?this.demandOf(n,e):null]))}sell(){const e=this.remaining.shift();if(!e)throw new Error("the floor is empty");const n=this.buyers.map(o=>this.demandOf(o,e)),a=Object.fromEntries(this.buyers.map((o,r)=>[o.bidder.name,n[r]===null?null:e.value/(1+n[r])])),s=this.buyers.filter(o=>(a[o.bidder.name]??0)>o.credit).map(o=>o.bidder.name);for(let o=e.value*Gh;o>=e.value*Uh;o-=e.value*Yh){const r=(e.value-o)/o,i=this.buyers.filter((h,d)=>h.credit>=o&&r>=(n[d]??1/0));if(i.length===0)continue;const l=i[Math.min(i.length-1,Math.floor(this.random()*i.length))];return l.credit-=o,l.won.push(e),this.record({lot:e,buyer:l.bidder.name,price:o},a,s)}return this.record({lot:e,buyer:null,price:null},a,s)}standings(){return this.buyers.map(({bidder:e,credit:n,won:a,error:s})=>{const o=a.reduce((i,l)=>i+l.value,0),r=this.credit-n;return{name:e.name,credit0:this.credit,credit:n,spent:r,lots:a.length,value:o,profit:o-r,error:s}})}record(e,n,a){return this.sold.push(e),this.turns.push({sale:e,bids:n,short:a}),e}demandOf(e,n){try{const a=e.bidder.demands(n,this.market,e.bidder.name);if(typeof a!="number"||Number.isNaN(a))throw new Error(`demanded ${String(a)}, not a margin`);return e.error=null,a}catch(a){return e.error=a instanceof Error?a.message:String(a),null}}}const Ds=[["sardines",30],["anchovies",40],["squid",90],["hake",120],["sole",180],["prawns",250],["monkfish",300],["tuna",400]];function Kh(t,e){return Array.from({length:t},(n,a)=>{const[s,o]=Ds[Math.floor(e()*Ds.length)];return{id:a+1,kind:s,value:Math.round(o*(.7+.6*e()))}})}const Vh=60;function Fr(t,e,n){const a=Pt(t),s=Kh(Vh,a),o=s.reduce((r,i)=>r+i.value,0);return new Jh(s,e,n*o/Math.max(1,e.length),a)}function Hs(t,e="You"){const n=new Function("lot","market","me",t);return{name:e,demands:n}}const Ws=`// Return the margin you demand: (value - price) / price.
// You are told the lots still to sell, everyone's credit, and every sale so far.
// This is Vicente. Change the 0.9 first.
const fish = market.lots.reduce((sum, lot) => sum + lot.value, 0);
const money = 0.9 * Object.values(market.credits).reduce((sum, c) => sum + c, 0);
if (money <= 0) return 0.001;
return Math.max(0.001, (fish - money) / money);
`,Xh=12,fe=t=>Math.round(t).toString(),_s=t=>t===null?"—":t===1/0?"∞":`${Math.round(t*100)}%`;function Br(t){const e=t.next,n=t.demands(),a=[...t.standings()].sort((d,c)=>c.profit-d.profit),s=Math.max(1,...a.map(d=>Math.abs(d.profit))),o=e?`<p class="lot">Next on the floor: <b>a box of ${x(e.kind)}</b>, which resells for ${fe(e.value)}. The price starts at ${fe(e.value*1.5)} and falls.</p>`:'<p class="lot">The floor is empty.</p>',i=`<table class="board"><thead><tr><th>buyer</th><th>asks</th><th>holds</th><th>spent</th><th>worth</th><th>credit</th><th>profit</th></tr></thead><tbody>${a.map(({name:d,lots:c,spent:u,value:p,profit:m,credit:f,error:y})=>{const w=y?`<td class="asks error" colspan="5">${x(y)}</td>`:`<td class="asks">${_s(n[d]??null)}</td>`;return`<tr${m<0?' class="loss"':""}><th scope="row">${x(d)}</th>${w}`+(y?"":`<td>${c} lot${c===1?"":"s"}</td><td>${fe(u)}</td><td>${fe(p)}</td><td>${fe(f)}</td>`)+`<td class="profit"><span class="bar" style="--p:${(Math.abs(m)/s).toFixed(3)}"></span>${fe(m)}</td></tr>`}).join("")}</tbody></table>`,l=t.turns,h=l.length?`<ol class="sales" reversed start="${l.length}">${[...l].reverse().slice(0,Xh).map(({sale:{lot:d,buyer:c,price:u},bids:p,short:m})=>{const f=u===null||c===null?"<i>withdrawn</i>":`sold at <b>${fe(u)}</b>, a margin of ${_s((d.value-u)/u)}`,y=Object.entries(p).map(([w,v])=>{if(v===null)return`${x(w)} —`;const b=w===c?`<b>${x(w)}</b>`:x(w);return m.includes(w)?`<s title="more than it had">${b} at ${fe(v)}</s>`:`${b} at ${fe(v)}`}).join(", ");return`<li><span class="went">${x(d.kind)}, ${fe(d.value)}: ${f}.</span> <span class="ready">Ready to shout: ${y}.</span></li>`}).join("")}</ol>`:"";return`<div class="fish-market">${o}${i}${h}</div>`}function qs(t,e){return{name:t,demands:()=>e}}const zs=.001;function qa(t,e){const n=t.lots.reduce((s,o)=>s+o.value,0),a=e*Object.values(t.credits).reduce((s,o)=>s+o,0);return a<=0?zs:Math.max(zs,(n-a)/a)}const Zh=.9,Qh=3,Gt=10;function ec(t="Planner"){return{name:t,demands(e,n,a){const s=qa(n,Zh),o=s*(Qh-1)/Gt,r=p=>s+p*o,i=p=>Math.max(0,Math.min(Gt-1,Math.floor((p-s)/o))),l=new Array(Gt).fill(0);for(const p of n.sales){if(p.price===null)continue;const m=i((p.lot.value-p.price)/p.price);l[m]=l[m]+p.lot.value}const h=l.reduce((p,m)=>p+m,0);if(h===0)return s;const d=n.lots.reduce((p,m)=>p+m.value,0),c=n.credits[a]??0;let u=0;for(let p=Gt-1;p>=0;p-=1)if(u+=d*l[p]/h/(1+r(p)),u>=c)return r(p);return s}}}function tc(t=.9,e="Vicente"){return{name:e,demands:(n,a)=>qa(a,t)}}const nc=.98,ac=1.05,sc=.95,oc=t=>(t.lot.value-t.price)/t.price;function Gs(t,e){const n=e.filter(s=>s.buyer===t),a=n.reduce((s,o)=>s+o.price,0);return a>0?(n.reduce((s,o)=>s+o.lot.value,0)-a)/a:0}function rc(t="Wanda"){return{name:t,demands(e,n,a){const s=qa(n,nc),o=Gs(a,n.sales);let r=1;for(const i of n.sales)i.buyer!==null&&(i.buyer===a?r*=ac:Gs(i.buyer,n.sales)>=o&&oc(i)>=s&&(r*=sc));return s*r}}}function Dr(t=.9){return[qs("Patient",1),qs("Hasty",.05),tc(t),rc(),ec()]}const ic=250,lc=1,Ys="fish-market:own",Yt="fish-market:seated";function hc(t){let e=lc,n=null,a,s=null;const o=g("div"),r=g("p",{class:"error",hidden:!0}),i=g("output",{},"90%"),l=g("input",{type:"range",min:.5,max:1,step:.02,value:.9,oninput:()=>m()}),h=g("output",{},"50%"),d=g("input",{type:"range",min:.3,max:1.2,step:.05,value:.5,oninput:()=>m()}),c=g("textarea",{class:"agent",spellcheck:!1,rows:9,oninput:()=>v()}),u=g("button",{type:"button",onclick:()=>s?w():y()},"run");function p(){o.innerHTML=Br(a)}function m(){w(),i.textContent=`${Math.round(Number(l.value)*100)}%`,h.textContent=`${Math.round(Number(d.value)*100)}%`,a=Fr(e,[...Dr(Number(l.value)),...n?[n]:[]],Number(d.value)),p()}function f(){return a.over?!1:(a.sell(),p(),!0)}function y(){u.textContent="stop",s=setInterval(()=>{f()||w()},ic)}function w(){s&&clearInterval(s),s=null,u.textContent="run"}function v(){try{localStorage.setItem(Ys,c.value)}catch{}}function b(){try{n=Hs(c.value),r.hidden=!0,localStorage.setItem(Yt,"yes")}catch(C){n=null,r.textContent=C instanceof Error?C.message:String(C),r.hidden=!1,localStorage.removeItem(Yt)}m()}function T(){n=null,localStorage.removeItem(Yt),m()}const I=g("div",{class:"dials"},g("label",{},"Vicente believes the others will spend: ",i,l),g("label",{},"Money in the room, as a share of the fish: ",h,d)),M=g("div",{class:"row"},g("button",{type:"button",onclick:()=>{f()}},"next lot"),u,g("button",{type:"button",onclick:()=>{for(w();f(););}},"whole morning"),g("button",{type:"button",onclick:()=>{e=Math.floor(Math.random()*1e9),m()}},"new morning")),k=g("div",{class:"row"},g("button",{type:"button",onclick:()=>b()},"seat it"),g("button",{type:"button",onclick:()=>T()},"stand it down")),A=g("details",{class:"own"},g("summary",{},"Seat your own agent"),c,k,r);try{c.value=localStorage.getItem(Ys)??Ws,localStorage.getItem(Yt)&&(n=Hs(c.value))}catch{c.value=Ws}return t.replaceChildren(I,M,o,A),m(),w}const cc=()=>Br(Fr(1,Dr(),.5)),dc={name:"fish-market",apps:{"fish-market":hc},stills:{"fish-market":cc}};function uc(t,e){const n=[];for(let a=t.length-1;a>=0;a-=1)n.push(t.slice(0,a));for(let a=1;a<=e.length;a+=1)n.push(e.slice(0,a));return n}const mc=3800,pc=6500,fc=26,gc=46,wc=420;function yc(t){return[...t.childNodes].map(e=>e.nodeName==="BR"?`
`:e.textContent??"").join("")}function bc(t){const e=document.querySelector("main h1");if(!e||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return()=>{};const n={text:yc(e)};e.setAttribute("aria-label",n.text),e.classList.add("typing");const a=document.createElement("span");a.className="caret idle",a.setAttribute("aria-hidden","true");const s=(d,c)=>{const u=d.split(`
`).flatMap((p,m)=>m===0?[p]:[document.createElement("br"),p]);if(c){const p=document.createElement("a");p.href=c,p.append(...u,a),e.replaceChildren(p)}else e.replaceChildren(...u,a)};s(n.text);let o=n,r=[],i=performance.now()+mc,l=0;const h=d=>{if(l=requestAnimationFrame(h),d<i)return;if(r.length===0){const u=t(o,n);r=uc(o.text,u.text),o=u,a.classList.remove("idle")}const c=r.shift()??o.text;s(c,r.length===0?o.href:void 0),r.length===0?(a.classList.add("idle"),i=d+pc):c===""?i=d+wc:i=d+(c.length<(r[0]?.length??0)?gc:fc)};return l=requestAnimationFrame(h),()=>{cancelAnimationFrame(l),s(n.text),a.remove(),e.classList.remove("typing"),e.removeAttribute("aria-label")}}function vc(t,e){const n=[...t];for(let a=n.length-1;a>0;a-=1){const s=Math.min(a,Math.floor(e()*(a+1)));[n[a],n[s]]=[n[s],n[a]]}return n}function kc(t,e){let n=[];return a=>(n.length===0&&(n=vc(t,e),n.length>1&&n[0]===a&&n.push(n.shift())),n.shift()??a)}const xc=[{text:`More than
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
as this page opened.`,href:"/projects/worlds/"}];let qn=null;const $c={name:"headline",arrive:t=>{if(qn?.(),qn=null,t.route!=="/")return;let e=null;qn=bc((n,a)=>(e??=kc([a,...xc],Math.random),e(n)))}};function Us(t,e="You"){const n=new Function("fish","weeks","bots","me","rounds",t);return{name:e,orders:n}}const Js=`// Return your orders for the round: one number a week, 0 to rest.
// You know the fish at the start, the weeks, who is on the lagoon (bots),
// your name (me), and every round before (rounds), but not what the others
// will do this time.
// This one rests, lets the lagoon grow, and takes one share the last week.
let grown = fish;
for (let week = 1; week < weeks; week++) grown += Math.floor(grown / 2);
const orders = new Array(weeks).fill(0);
orders[weeks - 1] = Math.floor(grown / bots.length);
return orders;
`;function Hr(t){const e=t.rounds[t.rounds.length-1],n=t.scores(),a=Math.max(1,...Object.values(n)),s=[...t.names].sort((u,p)=>n[p]-n[u]).map(u=>{const p=t.errors[u];return`<tr><th scope="row">${x(u)}</th>`+(p?`<td class="error" colspan="2">${x(p)}</td>`:`<td>${e?.totals[u]??0}</td><td class="profit"><span class="bar" style="--p:${(n[u]/a).toFixed(3)}"></span>${n[u]}</td>`)+"</tr>"}).join(""),o=t.rounds.length,r=`<table class="board"><caption>${o===0?"The season has not started":`After ${o} round${o===1?"":"s"}`}</caption><thead><tr><th>bot</th><th>last round</th><th>season</th></tr></thead><tbody>${s}</tbody></table>`;if(!e)return`<div class="lagoon"><p class="lot">The lagoon has <b>${t.fish} fish</b>, and ${t.weeks} weeks ahead. Nobody has been out yet.</p>${r}</div>`;const i=e.weeks.map((u,p)=>`<th>${p+1}</th>`).join(""),l=Math.max(1,...e.weeks.map(u=>u.fish)),h=e.weeks.map(u=>`<td><span class="fish" style="--p:${(u.fish/l).toFixed(3)}"></span>${u.fish}</td>`).join(""),d=t.names.map(u=>{const p=e.weeks.map((m,f)=>{const y=e.orders[u]?.[f]??0,w=m.caught[u]??0;return`<td${y>w?' class="short"':""} title="asked for ${y}">${w}</td>`}).join("");return`<tr><th scope="row">${x(u)}</th>${p}<td class="total">${e.totals[u]}</td></tr>`}).join("");return`<div class="lagoon">${`<table class="weeks"><caption>Round ${o}, week by week: what each bot caught, and what was left in the lagoon</caption><thead><tr><th>week</th>${i}<th>total</th></tr></thead><tbody>${d}<tr class="water"><th scope="row">in the lagoon</th>${h}<td></td></tr></tbody></table>`}${r}</div>`}function Wr(t,e,n){const a=[];let s=t;for(let o=0;o<e;o+=1){const r=Math.max(0,Math.min(s,Math.floor(n(s,o))));a.push(r),s-=r,s+=Math.floor(s/2)}return a}const Ut={rest:{name:"Rest",orders:(t,e)=>new Array(e).fill(0)},one:{name:"One",orders:(t,e)=>new Array(e).fill(1)},power:{name:"Power",orders:(t,e)=>Array.from({length:e},(n,a)=>a*a)},percent:t=>({name:`${Math.round(t*100)}%`,orders:(e,n)=>Wr(e,n,a=>a*t)})},Ks=(t,e)=>Math.ceil(t/e);function Vs(t="Tit for tat"){const e=new Set;return{name:t,orders(n,a,s,o,r){for(const l of r)for(const h of Object.keys(l.orders))h!==o&&(l.orders[h]?.[0]??0)>=Ks(l.start,s.length)&&e.add(h);if(s.some(l=>l!==o&&e.has(l)))return Wr(n,a,l=>Ks(l,s.length));let i=n;for(let l=1;l<a;l+=1)i+=Math.floor(i/2);return[...new Array(a-1).fill(0),Math.floor(i/s.length)]}}}function _r(){return[{fisher:Ut.one,seated:!0},{fisher:Ut.power,seated:!0},{fisher:Ut.percent(.1),seated:!0},{fisher:Ut.percent(.4),seated:!1},{fisher:Vs("Tit for tat"),seated:!0},{fisher:Vs("Tat for tit"),seated:!0}]}function Tc(t,e,n){const a=Object.keys(n),s=[],o=Object.fromEntries(a.map(i=>[i,0]));let r=t;for(let i=0;i<e;i+=1){const l=Object.fromEntries(a.map(d=>[d,0])),h=a.map(d=>({name:d,order:Math.max(0,Math.floor(n[d]?.[i]??0))})).filter(({order:d})=>d>0);for(const d of[...new Set(h.map(({order:c})=>c))].sort((c,u)=>c-u)){const c=h.filter(p=>p.order===d),u=Math.min(Math.floor(r/c.length),d);for(const{name:p}of c)l[p]=u,o[p]=o[p]+u;r-=u*c.length}r+=Math.floor(r/2),s.push({fish:r,caught:l})}return{start:t,orders:n,weeks:s,totals:o}}class qr{constructor(e,n,a){this.fish=e,this.weeks=n,this.fishers=a}fish;weeks;fishers;rounds=[];errors={};get names(){return this.fishers.map(e=>e.name)}play(){const e=Object.fromEntries(this.fishers.map(a=>[a.name,this.ordersOf(a)])),n=Tc(this.fish,this.weeks,e);return this.rounds.push(n),n}scores(){return Object.fromEntries(this.names.map(e=>[e,this.rounds.reduce((n,a)=>n+(a.totals[e]??0),0)]))}ordersOf(e){try{const n=e.orders(this.fish,this.weeks,this.names,e.name,this.rounds);if(!Array.isArray(n)||n.some(a=>typeof a!="number"||Number.isNaN(a)))throw new Error("orders must be an array of numbers, one a week");return delete this.errors[e.name],Array.from({length:this.weeks},(a,s)=>n[s]??0)}catch(n){return this.errors[e.name]=n instanceof Error?n.message:String(n),new Array(this.weeks).fill(0)}}}const Xs="lagoon:own",Jt="lagoon:seated";function Sc(t){let e=null,n;const a=g("div"),s=g("p",{class:"error",hidden:!0}),o=g("output",{},"100"),r=g("input",{type:"range",min:5,max:200,step:1,value:100,oninput:()=>u()}),i=g("output",{},"10"),l=g("input",{type:"range",min:4,max:14,step:1,value:10,oninput:()=>u()}),h=g("textarea",{class:"agent",spellcheck:!1,rows:11,oninput:()=>m()}),d=_r().map(({fisher:M,seated:k})=>({fisher:M,box:g("input",{type:"checkbox",checked:k,onchange:()=>u()})}));function c(){a.innerHTML=Hr(n)}function u(){o.textContent=r.value,i.textContent=l.value;const M=d.filter(({box:k})=>k.checked).map(({fisher:k})=>k);n=new qr(Number(r.value),Number(l.value),[...M,...e?[e]:[]]),c()}function p(M){for(let k=0;k<M;k+=1)n.play();c()}function m(){try{localStorage.setItem(Xs,h.value)}catch{}}function f(){try{e=Us(h.value),s.hidden=!0,localStorage.setItem(Jt,"yes")}catch(M){e=null,s.textContent=M instanceof Error?M.message:String(M),s.hidden=!1,localStorage.removeItem(Jt)}u()}function y(){e=null,localStorage.removeItem(Jt),u()}const w=g("div",{class:"dials"},g("label",{},"Fish in the lagoon at the start: ",o,r),g("label",{},"Weeks in a round: ",i,l)),v=g("div",{class:"row bench"},"On the lagoon: ",...d.map(({fisher:M,box:k})=>g("label",{},k,` ${M.name}`))),b=g("div",{class:"row"},g("button",{type:"button",onclick:()=>p(1)},"play a round"),g("button",{type:"button",onclick:()=>p(5)},"play five"),g("button",{type:"button",onclick:()=>u()},"new season")),T=g("div",{class:"row"},g("button",{type:"button",onclick:()=>f()},"seat it"),g("button",{type:"button",onclick:()=>y()},"stand it down")),I=g("details",{class:"own"},g("summary",{},"Seat your own bot"),h,T,s);try{h.value=localStorage.getItem(Xs)??Js,localStorage.getItem(Jt)&&(e=Us(h.value))}catch{h.value=Js}t.replaceChildren(w,v,b,a,I),u()}const Mc=()=>Hr(new qr(100,10,_r().filter(({seated:t})=>t).map(({fisher:t})=>t))),Ac={name:"lagoon",apps:{lagoon:Sc},stills:{lagoon:Mc}},ce={N:1,S:2,E:4,W:8};function zr(t){const{width:e,height:n,cells:a,links:s}=t,o=e*n-1,r=new Map([[0,-1]]),i=[0];for(let h=0;h<i.length;h+=1){const d=i[h];if(d===o)break;const c=d%e,u=Math.floor(d/e),p=a[d],m=[];p&ce.E&&c+1<e&&m.push(d+1),p&ce.W&&c>0&&m.push(d-1),p&ce.N&&u+1<n&&m.push(d+e),p&ce.S&&u>0&&m.push(d-e);const f=s.get(d);f!==void 0&&s.get(f)===d&&m.push(f);for(const y of m)r.has(y)||(r.set(y,d),i.push(y))}if(!r.has(o))return null;const l=[];for(let h=o;h!==-1;h=r.get(h))l.unshift({x:h%e,y:Math.floor(h/e)});return l}function Gr(t){const e=zr(t);if(!e)return"There is no way out: the only one ran through a sphere that leads nowhere.";const n=e.slice(1).filter((s,o)=>Math.abs(s.x-e[o].x)+Math.abs(s.y-e[o].y)>1).length,a=n===0?"touches no sphere":`jumps through ${n===1?"one sphere":`${n} spheres`}`;return`The way out is ${e.length} rooms long, and ${a}.`}const Zs=0x5deece66dn,Ic=0xbn,Qs=(1n<<48n)-1n;class Ec{seed;constructor(e){this.seed=(BigInt(e)^Zs)&Qs}nextInt(e){if((e&-e)===e)return Number(BigInt(e)*BigInt(this.next(31))>>31n);for(;;){const n=this.next(31),a=n%e;if((n-a+(e-1)|0)>=0)return a}}next(e){return this.seed=this.seed*Zs+Ic&Qs,Number(BigInt.asIntN(32,this.seed>>BigInt(48-e)))}}const eo=16,jc=[["N","E","W","S"],["W","S","E","N"],["S","E","W","N"]],Cc={N:[0,1,"S"],S:[0,-1,"N"],E:[1,0,"W"],W:[-1,0,"E"]};function Yr(t,e,n,{spheres:a=!0}={}){const s=new Ec(n),o=new Array(t*e).fill(0),r=new Map,i=[],l=(c,u)=>c+u*t;function h(c,u){i.push({x:c,y:u}),a&&s.nextInt(10)<1&&d(c,u);for(const p of jc[s.nextInt(3)]){const[m,f,y]=Cc[p],w=c+m,v=u+f;w<0||v<0||w>=t||v>=e||o[l(w,v)]!==0||(o[l(c,u)]|=ce[p],o[l(w,v)]=ce[y],h(w,v),i.push({x:c,y:u}))}}function d(c,u){const p=s.nextInt(t),m=s.nextInt(e);o[l(p,m)]===0&&(o[l(c,u)]|=eo,o[l(p,m)]=eo,r.set(l(c,u),l(p,m)),r.set(l(p,m),l(c,u)),h(p,m),i.push({x:c,y:u}))}return h(0,0),o[l(0,0)]|=ce.S,o[l(t-1,e-1)]|=ce.N,{width:t,height:e,cells:o,links:r,path:i}}const Q=10,Kt=4;function Ur(t,{trail:e,way:n}={}){const{width:a,height:s,cells:o,links:r}=t,i=w=>Kt+w*Q,l=w=>Kt+(s-1-w)*Q,h=({x:w,y:v})=>[i(w)+Q/2,l(v)+Q/2],d=[];for(let w=0;w<s;w+=1)for(let v=0;v<a;v+=1){const b=o[v+w*a];b&ce.S||d.push(`M${i(v)} ${l(w)+Q}h${Q}`),b&ce.W||d.push(`M${i(v)} ${l(w)}v${Q}`),w===s-1&&!(b&ce.N)&&d.push(`M${i(v)} ${l(w)}h${Q}`),v===a-1&&!(b&ce.E)&&d.push(`M${i(v)+Q} ${l(w)}v${Q}`)}const c=new Map;let u=0;const p=[...r].map(([w,v])=>{const b=r.get(v)===w;if(!b)u+=1;else if(!c.has(w)){const M=String.fromCharCode(97+c.size/2%26);c.set(w,M).set(v,M)}const[T,I]=h({x:w%a,y:Math.floor(w/a)});return`<circle class="sphere${b?"":" dead"}" cx="${T}" cy="${I}" r="${Q*.3}"/><text class="letter" x="${T}" y="${I}">${b?c.get(w):"×"}</text>`}),m=w=>w.map((v,b)=>{const T=w[b-1];return`${T&&Math.abs(v.x-T.x)+Math.abs(v.y-T.y)===1?"L":"M"}${h(v).join(" ")}`}).join(""),f=[];if(n&&f.push(`<path class="way" d="${m(n)}"/>`),e!==void 0&&e>0){const w=t.path.slice(0,e),[v,b]=h(w[w.length-1]);f.push(`<path class="trail" d="${m(w)}"/>`,`<circle class="walker" cx="${v}" cy="${b}" r="${Q*.22}"/>`)}return`<svg class="maze" role="img" aria-label="${`A ${a} by ${s} maze with ${r.size} sphere${r.size===1?"":"s"}`+(u?`, ${u} leading nowhere`:"")+"."}" viewBox="0 0 ${a*Q+2*Kt} ${s*Q+2*Kt}">`+f.join("")+`<path class="walls" d="${d.join("")}"/>`+p.join("")+"</svg>"}const Qe={size:7,seed:543},Oc=100;function Lc(t){let e,n=0,a=!1,s=null;const o=g("div",{class:"figure"}),r=g("p",{class:"status"}),i=g("output",{},String(Qe.size)),l=g("input",{type:"range",min:5,max:30,step:1,value:Qe.size,oninput:()=>m()}),h=g("input",{type:"number",value:Qe.seed,onchange:()=>m()}),d=g("input",{type:"checkbox",checked:!0,onchange:()=>m()}),c=g("button",{type:"button",onclick:()=>s?y():f()},"walk the camera"),u=g("button",{type:"button",onclick:()=>w()},"show the way out");function p(){o.innerHTML=Ur(e,{trail:n,way:a?zr(e):null})}function m(){y(),n=0,i.textContent=l.value,e=Yr(Number(l.value),Number(l.value),Number(h.value),{spheres:d.checked}),r.textContent=Gr(e),p()}function f(){n>=e.path.length&&(n=0),c.textContent="stop",s=setInterval(()=>{n+=1,p(),n>=e.path.length&&y()},Oc)}function y(){s&&clearInterval(s),s=null,c.textContent="walk the camera"}function w(){a=!a,u.textContent=a?"hide the way out":"show the way out",p()}const v=g("button",{type:"button",onclick:()=>(h.value=String(Math.floor(Math.random()*1e6)),m())},"another"),b=g("div",{class:"dials"},g("label",{},"Rooms a side: ",i,l),g("label",{},"Seed: ",h,v),g("label",{},d," spheres, as on 20 May (unticked: 13 May)"));return t.replaceChildren(g("div",{class:"maze-app"},o,r,g("div",{class:"row"},c,u),b)),m(),y}const Nc=()=>{const t=Yr(Qe.size,Qe.size,Qe.seed);return`<div class="maze-app"><div class="figure">${Ur(t)}</div><p class="status">${Gr(t)}</p></div>`},Pc={name:"maze",apps:{maze:Lc},stills:{maze:Nc}};function Rc(t,e){let n=Array.from({length:e.length+1},(a,s)=>s);for(let a=1;a<=t.length;a+=1){const s=[a];for(let o=1;o<=e.length;o+=1){const r=(n[o-1]??0)+(t[a-1]===e[o-1]?0:1);s[o]=Math.min(r,(n[o]??0)+1,(s[o-1]??0)+1)}n=s}return n[e.length]??0}function Fc(t,e){if(e.includes(t))return t;let n=null,a=1/0;for(const s of e){const o=Rc(t,s);o<a&&([n,a]=[s,o])}return n}const Bc=/[\p{L}\p{M}\p{N}']+|[.,!?;:]/gu,Dc=/\]\([^)]*\)|^---[\s\S]*?\n---|[#*_`>\[\]|]|::[a-z-]+/gm;function wn(t){return t.normalize("NFKC").replace(Dc," ").toLowerCase().match(Bc)??[]}const Vt=" ";class ka{constructor(e,n){this.memory=n;const a=wn(e),s=new Map;for(const o of a)s.set(o,(s.get(o)??0)+1);this.vocabulary=[...s.keys()],this.commonest=[...s].reduce((o,r)=>o&&o[1]>=r[1]?o:r,null)?.[0]??null;for(let o=1;o<a.length;o+=1)for(let r=1;r<=n&&r<=o;r+=1){const i=a.slice(o-r,o).join(Vt),l=this.followers.get(i)??new Map;l.set(a[o]??"",(l.get(a[o]??"")??0)+1),this.followers.set(i,l)}}memory;vocabulary;commonest;followers=new Map;after(e){for(let n=Math.min(this.memory,e.length);n>=1;n-=1){const a=e.slice(-n),s=this.followers.get(a.join(Vt));if(s)return{context:a,candidates:to(s)}}return{context:[],candidates:[]}}transitions(){return[...this.followers].filter(([e])=>e.split(Vt).length===this.memory).flatMap(([e,n])=>to(n).map(a=>({context:e.split(Vt),...a}))).sort((e,n)=>n.probability-e.probability||n.count-e.count)}}function to(t){const e=[...t.values()].reduce((n,a)=>n+a,0);return[...t].map(([n,a])=>({word:n,count:a,probability:a/e})).sort((n,a)=>a.count-n.count)}function Hc(t,e){let n=e();for(const a of t)if(n-=a.probability,n<=0)return a.word;return t[t.length-1]?.word??null}function no(t){return t.reduce((e,n)=>e===""||/^[.,!?;:]$/.test(n)?e+n:`${e} ${n}`,"")}function Jr(t,e){if(e<=0)return t.map((s,o)=>({...s,probability:o===0?1:0}));const n=t.map(s=>s.probability**(1/e)),a=n.reduce((s,o)=>s+o,0);return t.map((s,o)=>({...s,probability:(n[o]??0)/a}))}const zn=40,ao=8,Gn=t=>`${Math.round(t*100)}%`;function Kr(t,e,n){const{context:a,candidates:s}=t.after(e),o=s.slice(0,ao),r=Jr(s,n).slice(0,ao),i=s.reduce((f,{count:y})=>f+y,0),l=e.slice(0,e.length-a.length),h=`<p class="written">${x(no(l))}${l.length&&a.length?" ":""}${a.length?`<mark>${x(no(a))}</mark>`:""}<span class="caret"></span></p>`,d=o.length?`<ol class="offered">${o.map(({word:f,count:y,probability:w},v)=>{const b=r[v]?.probability??0;return`<li><button type="button" data-word="${x(f)}" title="seen ${y} of ${i} times: ${Gn(w)} as learnt"><span class="word">${x(f)}</span><span class="chance" style="--p:${b.toFixed(3)}"></span><span class="figure">${Gn(b)}</span></button></li>`}).join("")}</ol>`:`<p class="offered">It never saw anything follow “${x(e[e.length-1]??"")}”. This is where it stops.</p>`,c=f=>a.length===t.memory&&f.context.join(" ")===a.join(" "),u=t.transitions(),p=[...u.filter(c),...u.filter(f=>!c(f))].slice(0,zn).map(f=>`<tr${c(f)?' class="now"':""}><td>${x(f.context.join(" "))}</td><td>${x(f.word)}</td><td>${f.count}</td><td>${Gn(f.probability)}</td></tr>`).join(""),m=`<table class="learnt"><caption>What it learnt: ${u.length} transitions between ${t.vocabulary.length} words${u.length>zn?`, the first ${zn} shown`:""}</caption><thead><tr><th>after</th><th>comes</th><th>seen</th><th>chance</th></tr></thead><tbody>${p}</tbody></table>`;return`<div class="next-word">${h}<h4>What may come next</h4>${d}${m}</div>`}const hn="The cat is happy. The dog is glad. The cat sleeps. The dog plays. The cat eats. The dog runs. The car is fast. The car goes far.",Wc=350;function _c(t,{site:e}){const n={small:()=>hn,site:()=>e.pages.map(k=>k.body).join(`

`),own:()=>d.value};let a=new ka(hn,1),s=wn("the"),o=null;const r=g("div"),i=(k,A)=>g("option",{value:k},A),l=g("select",{onchange:()=>w()},i("small","eight short sentences"),i("site","this website"),i("own","your own text")),h=g("select",{onchange:()=>w()},i(1,"one word back"),i(2,"two words back"),i(3,"three words back")),d=g("textarea",{rows:5,hidden:!0,placeholder:"Paste any text here. The longer, the better it pretends.",oninput:()=>w()}),c=g("output",{},"1"),u=g("input",{type:"range",min:0,max:2,step:.1,value:1,oninput:()=>f()}),p=g("input",{type:"text",value:"the",onchange:()=>y()}),m=g("button",{type:"button",onclick:()=>o?T():b()},"write");function f(){c.textContent=u.value,r.innerHTML=Kr(a,s,Number(u.value))}function y(){T();const k=wn(p.value).flatMap(A=>Fc(A,a.vocabulary)??[]);s=k.length?k:a.commonest?[a.commonest]:[],f()}function w(){d.hidden=l.value!=="own",a=new ka(n[l.value]?.()??hn,Number(h.value)),y()}function v(){const k=Hc(Jr(a.after(s).candidates,Number(u.value)),Math.random);return k===null?!1:(s=[...s,k],f(),!0)}function b(){m.textContent="stop",o=setInterval(()=>{v()||T()},Wc)}function T(){o&&clearInterval(o),o=null,m.textContent="write"}r.addEventListener("click",k=>{const A=k.target?.closest("[data-word]")?.getAttribute("data-word");A&&(s=[...s,A],f())});const I=g("div",{class:"dials"},g("label",{},"It has read",l),g("label",{},"It looks",h),g("label",{},"Temperature: ",c,u),g("label",{},"Start from",p)),M=g("div",{class:"row"},g("button",{type:"button",onclick:()=>{v()}},"next word"),m,g("button",{type:"button",onclick:()=>y()},"start over"));return t.replaceChildren(I,d,M,r),f(),T}const qc=()=>Kr(new ka(hn,1),wn("the"),1),zc={name:"next-word",apps:{"next-word":_c},stills:{"next-word":qc}},Yn={"string-cache-map":"a WeakMap replacement for string keys, with a bounded cache behind it","async-barrier":"a helper that makes async/await tests say what they wait for","spy-middleware":"a Redux middleware for spying on actions in tests","grunt-frontmatter":"a Grunt task: many files with YAML front matter into one JSON","object-canonical-keys":"always the same array of keys for the same keys, so comparisons stay cheap","async-deferrer":"one function that returns a promise, or resolves it"},so=160,Un=28,cn=t=>t.toLocaleString("en-US");function Jn(t,e){const n=Math.max(1,...t.map(e)),a=so/t.length,s=t.map((o,r)=>{const i=e(o)/n*(Un-2);return`<rect x="${(r*a+1).toFixed(1)}" y="${(Un-i).toFixed(1)}" width="${(a-2).toFixed(1)}" height="${i.toFixed(1)}"><title>${o}: ${cn(e(o))}</title></rect>`}).join("");return`<svg class="spark" viewBox="0 0 ${so} ${Un}" role="img" aria-label="Downloads a year, ${t[0]} to ${t[t.length-1]}">${s}</svg>`}function Vr(t){const e=Object.keys(t.years).sort(),n=d=>c=>t.years[c]?.[d]??0,a=d=>e.reduce((c,u)=>c+d(u),0),s=Object.keys(Yn).sort((d,c)=>a(n(c))-a(n(d))),o=[...new Set(e.flatMap(d=>Object.keys(t.years[d]??{})))].filter(d=>!(d in Yn)),r=d=>o.reduce((c,u)=>c+n(u)(d),0),i=d=>Object.values(t.years[d]??{}).reduce((c,u)=>c+u,0),l=s.filter(d=>a(n(d))>0).map(d=>`<tr><th scope="row"><a href="https://www.npmjs.com/package/${d}"><code>${d}</code></a><span>${Yn[d]}</span></th><td>${Jn(e,n(d))}</td><td>${cn(a(n(d)))}</td></tr>`).join(""),h=o.length?`<tr><th scope="row">the other ${o.length}<span>mostly AngularJS and Redux helpers written for one project each</span></th><td>${Jn(e,r)}</td><td>${cn(a(r))}</td></tr>`:"";return`<figure class="packages"><table class="packages"><thead><tr><th>package</th><th>${e[0]} to ${e[e.length-1]}, a bar a year</th><th>downloads</th></tr></thead><tbody>${l}${h}</tbody><tfoot><tr><th scope="row">all of them</th><td>${Jn(e,i)}</td><td>${cn(a(i))}</td></tr></tfoot></table></figure>`}function Gc(t){if(t.querySelector("figure"))return;const e=Da(t,"/data/npm/index.json");fetch("/data/npm/downloads.json").then(n=>n.json()).then(n=>{t.innerHTML=Vr(n),t.append(e)}).catch(()=>{t.textContent="The download counts did not arrive. The rest of the page does not depend on them."})}const Kn=["string-cache-map","async-barrier","spy-middleware","grunt-frontmatter","object-canonical-keys","gherkin-genie","async-deferrer","egg-hatchery","angular-tags","class-strict","micro-egg-hatchery","node-dio","ducks-middleware","drpx-updateable","generator-drpx","grunt-ngtags","teal-redux-egg","ducks-reducer","drpx-storage-mocks","strict-classes","ngtags","redux-egg","esmoquin","drpx-storage","dio-provider","drpx-components","grunt-angular-tags","drpx-bind-angular","drpx-toggle","drpx-id","drpx-seo","drpx-otherwisehome","drpx-class-route","drpx-transcludeto"],Vn="downloads.json",Yc={name:"npm",directory:"public/data/npm",firstYear:2015,files:[Vn],about:{measures:"downloads a year of the npm packages published as drpicox",attribution:"npm, Inc. Download counts of the public registry.",dataset:"https://github.com/npm/registry/blob/main/docs/download-counts.md",packages:Kn},requestsFor(t){return[`https://api.npmjs.org/downloads/point/${t}-01-01:${t}-12-31/${Kn.join(",")}`]},withYear(t,e,n){const a=n[0],s=Object.entries(typeof a=="object"&&a!==null?a:{}).flatMap(([o,r])=>{const i=r?.downloads;return Kn.includes(o)&&typeof i=="number"&&i>0?[[o,i]]:[]});if(s.length===0)throw new Error("the registry did not answer with downloads");return{[Vn]:{years:{...t[Vn]?.years,[e]:Object.fromEntries(s)}}}}},Uc=t=>Vr(JSON.parse(t("/data/npm/downloads.json")))+kn(JSON.parse(t("/data/npm/index.json"))),Jc={name:"packages",apps:{packages:Gc},stills:{packages:Uc},sources:[Yc]},Kc={name:"portfolio",flags:[{name:"portfolio",description:"the lists with pictures as cards, the width of a program",trial:.5}]},Vc=/^\s*\* (.*)$/,Xc=/^#{1,6} /;function Zc(t){let e="";const n=[],a={s:0,n:0},s=i=>e+=e===""?i.toLowerCase():i[0].toUpperCase()+i.slice(1).toLowerCase(),o=(i,l)=>{a[l]+=1;const h=/shouldBe/i.test(e)&&!n.some(d=>d.name==="expected");n.push({value:i,name:h?"expected":`${l}${a[l]}`})},r=t.matchAll(/([A-Za-z]+)|("[^"]+")|(\d+)/g);for(const[,i,l,h]of r)i?s(i):l?(o(l,"s"),s("S")):h&&(o(h,"n"),s("N"));return{name:e,args:n}}const Qc=["there","is","are","has","have","need","needs"],ut=(t,e)=>new RegExp(`\\b${e}\\b`,"i").test(t);function ed(t,e){if(t.length===0)return[{line:e,message:'does not have any executable instruction by tests. Post lines that run must begin with " * ".'}];if(!t.some(s=>/should/i.test(s.name)))return[{line:t[t.length-1].line,message:'does not have any executable instruction that contains "should": at least one line must test that the outcome is the expected.'}];for(const s of t){const o=Qc.find(r=>ut(s.text,r));if(o&&!ut(s.text,"given")&&!ut(s.text,"should"))return[{line:s.line,message:`has an instruction with the word "${o}" but no "should" or "given". Add "given" if it sets up, or "should" if it checks a result.`}]}const n=t.find(s=>ut(s.text,"given")&&ut(s.text,"should"));if(n)return[{line:n.line,message:'has an instruction with the word "given" and "should" at the same time. Keep "given" for a setup, "should" for an assertion.'}];if(t.some(s=>s.name===""))return[{line:t.find(s=>s.name==="").line,message:"has an instruction with no words in it."}];const a=t[t.length-1];return/should/i.test(a.name)?[]:[{line:a.line,message:'the last instruction must contain "should": a post ends by checking what it set out to show.'}]}function td(t){const[e="",...n]=t.replace(/\.md$/,"").split("_");return`Post_${e.replace(/-/g,"")}_${n.map(a=>a[0].toUpperCase()+a.slice(1)).join("")}_Context`}function Xr(t,e){const n=t.replace(/^---[\s\S]*?\n---\n/,p=>p.replace(/[^\n]/g,"")).split(`
`),a=n.find(p=>/^# /.test(p))?.slice(2).trim()??e,s=td(e),o=[],r=[];n.forEach((p,m)=>{const f=Vc.exec(p);if(f){const{name:y,args:w}=Zc(f[1]??""),v=`${y}(${w.map(b=>b.value).join(", ")})`;o.push({line:m+1,text:p.trim(),name:y,args:w,call:v}),r.push(`  await context.${v};	// ${p.trim()}`)}else Xc.test(p)&&r.push("",`  // ${p.trim()}`)});const i=Math.max(0,...r.map(p=>p.indexOf("	"))),l=r.map(p=>p.includes("	")?p.replace("	"," ".repeat(i-p.indexOf("	")+1)):p),h=["// !!! IMPORTANT !!!","// This test file is AUTOGENERATED by yarn create-tests","// DO NOT MODIFY manually.","",`test("${e}", async () => {`,`  const context = new ${s}();`,"  await context.beforeTest();",...l,"","  await context.afterTest();","});",""].join(`
`),d=new Set,c=o.filter(p=>!d.has(p.name)&&d.add(p.name)),u=[`export class ${s} {`,"  async beforeTest() {}","",...c.flatMap(p=>[`  async ${p.name}(${p.args.map(m=>m.name).join(", ")}) {`,"    // TODO","  }",""]),"  async afterTest() {}","}",""].join(`
`);return{title:a,className:s,steps:o,test:h,context:u,problems:ed(o,n.length)}}const St=[{file:"2022-07-15_hello_blog.md",label:"Hello Blog — the first post of the course",markdown:`---
writer: drpicox
coder: drpicox
package: blog
---
# Hello Blog

You can find here the blog.
The blog is a contract, between you, the player, and me, the maker of this game.

## How to use the blog

The blog is available in the application, and you can arrive through the header.

 * Go to the blog section,
 * You should see a list of posts,
 * The last post title should be "Hello Blog", this post
 * Go to the "Hello Blog" post,
 * You should see the "Hello Blog" post
 * The post should contain "this text", which is here.

_Thanks for the read._
`},{file:"2022-07-25_ideas_have_xp.md",label:"Ideas Have XP — a rule of the game, shortened",markdown:`---
writer: drpicox
package: idea
---
# Ideas Have XP

The more you practice an idea, more skilled you become.
So get ready to accumulate experience points.

## Increasing XP

When the game begins, the XP in any idea is zero.

 * Enter the game.
 * There should be the "Harvest Idea" idea.
 * The "Harvest Idea" should have 0 XP.

But when you start using them, the XP in the "Harvest Idea" idea should increase.

 * Draw a card from the "Harvest Idea" idea.
 * Move the "Harvest Idea" card to its own stack.
 * Move the "Villager" card on top of the "Harvest Idea" card.
 * Move the "Berry Bush" card on top of the "Villager" card.
 * There should be 1 stack of 1 "Harvest Idea", 1 "Villager", and 1 "Berry Bush" cards.
 * End the current moon.
 * The "Harvest Idea" should have 1 XP.

### Gaining several XP at once

We won only one XP because there was only one use of the idea.
But what if we create two piles?

 * Given a new game.
 * Given there is the "Harvest Idea" idea.
 * Given there are 1 "Berry" cards.
 * Given there are 2 stacks of 1 "Harvest Idea", 1 "Villager", and 1 "Berry Bush" cards.
 * End the current moon.
 * The "Harvest Idea" should have 2 XP.
`}],xn=t=>new Set(t.split(/\s+/).filter(Boolean)),nd=xn(`
  var let const function return if else for while do break continue new this
  true false null undefined class extends import export from default async await
  throw try catch finally typeof instanceof in of switch case delete void yield`),ad=xn(`
  auto break case char const continue default do double else enum extern float for goto if
  inline int long register restrict return short signed sizeof static struct switch typedef
  union unsigned void volatile while NULL true false`),sd=xn(`
  abstract assert boolean break byte case catch char class const continue default do double
  else enum extends final finally float for goto if implements import instanceof int interface
  long native new package private protected public return short static strictfp super switch
  synchronized this throw throws transient try var void volatile while true false null`),od=xn(`
  AND AS CASE CLS CONST DECLARE DEFDBL DIM DO DOUBLE ELSE END EXIT FOR FUNCTION IF IS
  LOCATE LOOP NEXT NOT OR PRINT RANDOMIZE SCREEN SELECT SHARED STATIC STEP SUB THEN TO
  UNTIL WHILE OPTION BASE`);function V(t,e){return`<span class="hl-${t}">${x(e)}</span>`}function za(t,e,n){for(let a=e+1;a<t.length;a+=1)if(t[a]==="\\")a+=1;else if(t[a]===n)return a+1;return t.length}function Xn(t,e,n){let a="",s=0;for(;s<t.length;){const o=t.slice(s);let r;const i=t.lastIndexOf(`
`,s-1)+1,l=/^\s*$/.test(t.slice(i,s));if(o.startsWith("//")||n&&o[0]==="#"&&l){const h=t.indexOf(`
`,s),d=h<0?t.length:h;a+=V(o[0]==="#"?"a":"c",t.slice(s,d)),s=d}else if(o.startsWith("/*")){const h=t.indexOf("*/",s+2),d=h<0?t.length:h+2;a+=V("c",t.slice(s,d)),s=d}else if(o[0]==='"'||o[0]==="'"||o[0]==="`"){const h=za(t,s,o[0]??"");a+=V("s",t.slice(s,h)),s=h}else if(r=/^[A-Za-z_$][\w$]*/.exec(o)){const h=r[0];a+=e.has(h)?V("k",h):x(h),s+=h.length}else(r=/^\d+(?:\.\d+)?/.exec(o))?(a+=V("n",r[0]),s+=r[0].length):(a+=x(o[0]??""),s+=1)}return a}function rd(t){let e="",n=0;for(;n<t.length;){const a=t.slice(n);let s;if(a.startsWith("%")){const o=t.indexOf(`
`,n),r=o<0?t.length:o;e+=V("c",t.slice(n,r)),n=r}else if(a.startsWith("/*")){const o=t.indexOf("*/",n+2),r=o<0?t.length:o+2;e+=V("c",t.slice(n,r)),n=r}else if(a[0]==="'"){const o=za(t,n,"'");e+=V("s",t.slice(n,o)),n=o}else if(a.startsWith("-->")||a.startsWith(":-")){const o=a.startsWith("-->")?"-->":":-";e+=V("k",o),n+=o.length}else(s=/^[A-Z_][\w]*/.exec(a))?(e+=V("a",s[0]),n+=s[0].length):(s=/^[a-z][\w]*/.exec(a))?(e+=x(s[0]),n+=s[0].length):(e+=x(a[0]??""),n+=1)}return e}function id(t){let e="",n=0;for(;n<t.length;){const a=t.slice(n);let s;if(a[0]==="'"||/^REM\b/i.test(a)){const o=t.indexOf(`
`,n),r=o<0?t.length:o;e+=V("c",t.slice(n,r)),n=r}else if(a[0]==='"'){const o=t.indexOf('"',n+1),r=o<0?t.length:o+1;e+=V("s",t.slice(n,r)),n=r}else(s=/^[A-Za-z_][\w]*[$!#%&]?/.exec(a))?(e+=od.has(s[0].toUpperCase())?V("k",s[0]):x(s[0]),n+=s[0].length):(s=/^\d+(?:\.\d+)?/.exec(a))?(e+=V("n",s[0]),n+=s[0].length):(e+=x(a[0]??""),n+=1)}return e}function ld(t){let e="",n=0;for(;n<t.length;){const a=t.slice(n);if(a.startsWith("<!--")){const o=t.indexOf("-->",n+4),r=o<0?t.length:o+3;e+=V("c",t.slice(n,r)),n=r;continue}const s=/^<(\/?)([A-Za-z][\w-]*)/.exec(a);if(!s){const o=t.indexOf("<",n+1),r=o<0?t.length:o;e+=x(t.slice(n,r)),n=r;continue}for(e+=`&lt;${s[1]}${V("t",s[2]??"")}`,n+=s[0].length;n<t.length&&t[n]!==">";){const o=t.slice(n);let r;if(r=/^\s+/.exec(o))e+=r[0],n+=r[0].length;else if(r=/^[A-Za-z_:][\w:.-]*/.exec(o))e+=V("a",r[0]),n+=r[0].length;else if(o[0]==="="&&(o[1]==='"'||o[1]==="'")){const i=za(t,n+1,o[1]??"");e+=`=${V("s",t.slice(n+1,i))}`,n=i}else e+=x(o[0]??""),n+=1}t[n]===">"&&(e+="&gt;",n+=1)}return e}function we(t,e){return e==="js"||e==="javascript"?Xn(t,nd,!1):e==="c"?Xn(t,ad,!0):e==="java"?Xn(t,sd,!1):e==="prolog"?rd(t):e==="html"?ld(t):e==="basic"?id(t):x(t)}function Zr(t,e){return`<div class="compiled">${t.problems.length?`<div class="refused"><strong>${x(e)}</strong> line ${t.problems[0].line}: ${x(t.problems[0].message)}<br>The tests are not written until the post is fixed.</div>`:""}<h4>${x(e.replace(/\.md$/,""))} → the test, never edited by hand</h4><pre><code>${we(t.test,"js")}</code></pre><h4>→ the context, written once and filled in by the coder</h4><pre><code>${we(t.context,"js")}</code></pre></div>`}function hd(t){const e=g("div"),n=g("textarea",{class:"post",spellcheck:!1,rows:28,oninput:()=>r()}),a=g("input",{type:"text",value:St[0].file,oninput:()=>r()}),s=g("select",{onchange:()=>o(Number(s.value))},...St.map((i,l)=>g("option",{value:l},i.label)));function o(i){const l=St[i]??St[0];n.value=l.markdown,a.value=l.file,r()}function r(){e.innerHTML=Zr(Xr(n.value,a.value),a.value)}t.replaceChildren(g("div",{class:"row"},g("label",{},"Post ",s),g("label",{},"File ",a)),g("div",{class:"post-tests"},n,e)),o(0)}const cd=()=>{const t=St[0];return`<div class="post-tests"><pre class="post">${t.markdown.replace(/&/g,"&amp;").replace(/</g,"&lt;")}</pre>${Zr(Xr(t.markdown,t.file),t.file)}</div>`},dd={name:"post-tests",apps:{"post-tests":hd},stills:{"post-tests":cd}},xa="program-asked";function $a(t,e){t.dispatchEvent(new CustomEvent(xa,{detail:e}))}function et(t){return t.toLowerCase().replace(/\s+/g,"-")}const Zn=t=>typeof t=="string"?et(t):String(Number(t.toPrecision(4)));function ud(t,e){const n=t.parameters.flatMap(a=>{const s=e[a.name];return s===void 0||Zn(s)===Zn(a.initial)?[]:[`--${a.name} ${Zn(s)}`]});return[t.name,...n].join(" ")}function Qr(t){return Object.fromEntries(t.parameters.map(e=>[e.name,e.initial]))}function md(t){return t.scale!=="log"?{min:t.min,max:t.max,step:t.step,positionOf:e=>e,valueAt:e=>e}:{min:Math.log10(t.min),max:Math.log10(t.max),step:t.step,positionOf:e=>Math.log10(e),valueAt:e=>10**e}}const Ta="program-ran";function pd(t,e){const n=md(t),a=t.show??String,s=g("output"),o=g("input",{type:"range",name:t.name,min:n.min,max:n.max,step:n.step});return o.addEventListener("input",()=>e(n.valueAt(Number(o.value)))),{label:g("label",{},`${t.label}: `,s,o),settle:r=>{o.value=String(n.positionOf(Number(r))),s.textContent=a(Number(r))}}}function fd(t,e){const n=g("select",{name:t.name},...t.choices.map(a=>g("option",{value:a},a)));return n.addEventListener("change",()=>e(n.value)),{label:g("label",{},`${t.label} `,n),settle:a=>{n.value=String(a)}}}function ei(t){return e=>{let n=Qr(t);const a=e.dataset.dials?.split(" "),s=a!==void 0&&t.glance!==void 0,o=g("code"),r=g("div",{class:s?"program-figure glance":"program-figure"}),i=c=>u=>{n={...n,[c]:u},h()},l=t.parameters.filter(c=>!a||a.includes(c.name)).map(c=>({name:c.name,dial:"choices"in c?fd(c,i(c.name)):pd(c,i(c.name))}));function h(){for(const{name:c,dial:u}of l)u.settle(n[c]??"");o.textContent=`$ ${ud(t,n)}`,r.innerHTML=s?t.glance?.(n)??"":t.run(n).html,e.dispatchEvent(new CustomEvent(Ta,{detail:n}))}const d=c=>{n={...n,...c.detail},h()};return e.addEventListener(xa,d),e.replaceChildren(g("div",{class:"dials"},...l.map(({dial:c})=>c.label)),g("p",{class:"program-line"},o),r),h(),()=>e.removeEventListener(xa,d)}}const Xt=149597870700,Ge=94607e11,Nt=[{name:"the Moon",metres:3844e5,said:"384,400 km"},{name:"Mars",metres:.52*Xt,said:"0.52 au"},{name:"Jupiter",metres:4.2*Xt,said:"4.2 au"},{name:"Saturn",metres:8.5*Xt,said:"8.5 au"},{name:"Pluto",metres:38.5*Xt,said:"38.5 au"},{name:"Proxima Centauri",metres:4.24*Ge,said:"4.24 light-years"},{name:"Sirius",metres:8.58*Ge,said:"8.58 light-years"},{name:"Epsilon Eridani",metres:10.52*Ge,said:"10.52 light-years"},{name:"Tau Ceti",metres:11.91*Ge,said:"11.91 light-years"},{name:"the centre of the galaxy",metres:26e3*Ge,said:"26,000 light-years",towards:{ra:17.76,dec:-29}},{name:"Andromeda",metres:25e5*Ge,said:"2.5 million light-years",towards:{ra:.712,dec:41.27}}],Et={dryMass:25e3,fuel:5e3,exhaust:.72},gd=299792458;function Ga(t){if(t<.01)return`${Math.round(t*gd/1e3).toLocaleString("en-US")} km/s`;if(t<.99)return`${(t*100).toPrecision(2)}% of c`;const e=Math.min(12,Math.ceil(-Math.log10(1-t)));return`${(Math.floor(t*10**e)/10**(e-2)).toFixed(e-2)}% of c`}const wd=[[365.25*86400*1e6,"million years"],[365.25*86400,"years"],[86400,"days"],[3600,"hours"],[60,"minutes"],[1,"seconds"]];function Ie(t){const[e,n]=wd.find(([o])=>t>=o)??[1,"seconds"],a=t/e;return`${a>=10?Math.round(a).toLocaleString("en-US"):String(Math.round(a*10)/10)} ${n}`}const yd=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:3});function yn(t){return t>=1e6?`${yd.format(t)} t`:`${t>=100?Math.round(t).toLocaleString("en-US"):t.toPrecision(2)} t`}const de=299792458,bd=9.81;function Ya(t,e){const n=e.acceleration*bd,a=e.dryMass+e.fuel,s=e.exhaust*de,o=de/n*Math.acosh(1+n*t/(2*de*de)),r=a*(1-Math.exp(-2*n*o/s)),i=r>e.fuel,l=i?s/(2*n)*Math.log(a/e.dryMass):o,h=Math.tanh(n*l/de),d=de/n*Math.sinh(n*l/de),c=de*de/n*(Math.cosh(n*l/de)-1),u=Math.max(0,t-2*c),p=i?u/(h*de):0,m=p*Math.sqrt(1-h*h);return{shipTime:2*l+m,homeTime:2*d+p,burnTime:l,coastTime:m,topSpeed:h,fuelBurnt:i?e.fuel:r,coasts:i}}const vd=299792458,kd=9.81,mt=720,Zt=170,oe={top:12,right:10,bottom:24,left:40};function xd(t,e){const n=mt-oe.left-oe.right,a=Zt-oe.top-oe.bottom,s=u=>oe.left+u/t.shipTime*n,o=u=>oe.top+a-u/Math.max(t.topSpeed,1e-12)*a,r=e.acceleration*kd,i=24,l=Array.from({length:i+1},(u,p)=>t.burnTime*p/i).map(u=>[u,Math.tanh(r*u/vd)]),d=[...l.map(([u,p])=>[u,p]),...l.reverse().map(([u,p])=>[t.shipTime-u,p])].map(([u,p])=>`${s(u).toFixed(1)},${o(p).toFixed(1)}`).join(" "),c=t.coasts?`<text x="${((s(t.burnTime)+s(t.shipTime-t.burnTime))/2).toFixed(1)}" y="${(o(t.topSpeed)+14).toFixed(1)}" text-anchor="middle">engine off, ${Ie(t.coastTime)}</text>`:"";return`<svg class="trip" viewBox="0 0 ${mt} ${Zt}" role="img" aria-label="Speed against the ship's clock"><line class="grid" x1="${oe.left}" x2="${mt-oe.right}" y1="${o(0)}" y2="${o(0)}"/><line class="grid" x1="${oe.left}" x2="${mt-oe.right}" y1="${o(t.topSpeed)}" y2="${o(t.topSpeed)}"/><text x="${oe.left}" y="${o(t.topSpeed)-3}">${Ga(t.topSpeed)}</text><polyline class="line" points="${d}"/>${c}<text x="${oe.left}" y="${Zt-6}">departure</text><text x="${mt-oe.right}" y="${Zt-6}" text-anchor="end">arrival, ${Ie(t.shipTime)} on board</text></svg>`}function $d(t,e){const n=Nt.map(o=>({destination:o,trip:Ya(o.metres,t)})),a=n.map(({destination:o,trip:r})=>{const i=[o.name===e?"chosen":"",r.coasts?"coasts":""].filter(Boolean).join(" "),l=r.coasts?`all ${yn(t.fuel)}, then coasts`:yn(r.fuelBurnt);return`<tr${i?` class="${i}"`:""} data-destination="${o.name}"><th scope="row">${o.name}</th><td>${o.said}</td><td>${Ie(r.shipTime)}</td><td>${Ie(r.homeTime)}</td><td>${Ga(r.topSpeed)}</td><td>${l}</td></tr>`}).join(""),s=n.find(({destination:o})=>o.name===e)??n[0];return`<figure class="rocket"><table class="voyages"><thead><tr><th>to</th><th>distance</th><th>on board</th><th>at home</th><th>top speed</th><th>fuel burnt</th></tr></thead><tbody>${a}</tbody></table>`+(s?`<h4>To ${s.destination.name}: speed against the ship's clock</h4>${xd(s.trip,t)}`:"")+"</figure>"}function ti(t){return{dryMass:Et.dryMass,fuel:Number(t.fuel)*Et.dryMass,exhaust:Number(t.exhaust)/100,acceleration:Number(t.acceleration)}}const oo=365.25*86400,Td=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:2}),Sa={name:"rocket",summary:"a relativistic rocket: how long a trip takes on board and at home, and what it burns",parameters:[{name:"acceleration",label:"Acceleration",description:"what the crew feels while the engine burns, in g",min:.05,max:3,step:.05,initial:.3,show:t=>`${t.toFixed(2)} g`},{name:"fuel",label:"Fuel",description:"fuel on board, as a multiple of the ship's own mass",min:.1,max:1e13,step:.05,initial:Et.fuel/Et.dryMass,scale:"log",show:t=>`${Td.format(t)} × the ship`},{name:"exhaust",label:"Exhaust speed",description:"the speed of what leaves the engine, in percent of the speed of light",min:1,max:100,step:1,initial:Et.exhaust*100,show:t=>`${Math.round(t)}% of c`},{name:"to",label:"To",description:"where to fly",choices:Nt.map(t=>t.name),initial:"Proxima Centauri"}],run(t){const e=ti(t),n=String(t.to),a=Nt.map(l=>({destination:l,trip:Ya(l.metres,e)})),s=a.find(({destination:l})=>l.name===n)??a[0],{destination:o,trip:r}=s,i=r.coasts?`all ${yn(e.fuel)} of fuel, then coasts`:`${yn(r.fuelBurnt)} of fuel`;return{text:`to ${o.name}, ${o.said}: ${Ie(r.shipTime)} on board, ${Ie(r.homeTime)} at home, top speed ${Ga(r.topSpeed)}, ${i}`,html:$d(e,n),data:{ship:{dryMassTonnes:e.dryMass,fuelTonnes:e.fuel,exhaust:e.exhaust,accelerationG:e.acceleration},trips:a.map(({destination:l,trip:h})=>({to:l.name,distance:l.said,onBoardYears:h.shipTime/oo,atHomeYears:h.homeTime/oo,topSpeed:h.topSpeed,fuelBurntTonnes:h.fuelBurnt,coasts:h.coasts}))}}}},Qt=[{name:"Proxima Centauri",ra:14.495,dec:-62.68,lightYears:4.24},{name:"Alpha Centauri",ra:14.66,dec:-60.83,lightYears:4.37},{name:"Barnard's Star",ra:17.963,dec:4.69,lightYears:5.96},{name:"Wolf 359",ra:10.941,dec:7.01,lightYears:7.86},{name:"Lalande 21185",ra:11.056,dec:35.97,lightYears:8.31},{name:"Sirius",ra:6.752,dec:-16.72,lightYears:8.58},{name:"Luyten 726-8",ra:1.65,dec:-17.95,lightYears:8.73},{name:"Ross 154",ra:18.83,dec:-23.84,lightYears:9.69},{name:"Ross 248",ra:23.699,dec:44.18,lightYears:10.3},{name:"Epsilon Eridani",ra:3.549,dec:-9.46,lightYears:10.52},{name:"Lacaille 9352",ra:23.098,dec:-35.85,lightYears:10.72},{name:"Ross 128",ra:11.796,dec:.8,lightYears:11.01},{name:"EZ Aquarii",ra:22.643,dec:-15.3,lightYears:11.1},{name:"61 Cygni",ra:21.115,dec:38.75,lightYears:11.4},{name:"Procyon",ra:7.655,dec:5.22,lightYears:11.46},{name:"Struve 2398",ra:18.713,dec:59.63,lightYears:11.5},{name:"Groombridge 34",ra:.306,dec:44.02,lightYears:11.6},{name:"Epsilon Indi",ra:22.056,dec:-56.78,lightYears:11.87},{name:"Tau Ceti",ra:1.734,dec:-15.94,lightYears:11.91}];function en(t,e){const n=e.radius/e.reach;return t.map(({name:a,ra:s,dec:o,lightYears:r})=>{const i=s/24*2*Math.PI,l=o/180*Math.PI,h=r*Math.cos(l)*Math.cos(i),d=r*Math.cos(l)*Math.sin(i),c=r*Math.sin(l),u=d*Math.cos(e.yaw)-h*Math.sin(e.yaw),p=h*Math.cos(e.yaw)+d*Math.sin(e.yaw),m=c*Math.cos(e.pitch)-p*Math.sin(e.pitch),f=p*Math.cos(e.pitch)+c*Math.sin(e.pitch);return{name:a,x:u*n,y:-m*n,depth:f}})}const Oe=299792458,Sd=9.81;function Md(t,e,n){const a=e.acceleration*Sd,s=c=>({distance:Oe*Oe/a*(Math.cosh(a*c/Oe)-1),homeTime:Oe/a*Math.sinh(a*c/Oe),speed:Math.tanh(a*c/Oe)}),o=s(t.burnTime),r=t.homeTime-2*o.homeTime,i=r*t.topSpeed*Oe,l=2*o.distance+i,h=Math.max(0,Math.min(n,t.shipTime));if(h<=t.burnTime){const c=s(h);return{along:c.distance/l,homeTime:c.homeTime,speed:c.speed}}if(h<=t.burnTime+t.coastTime){const c=(h-t.burnTime)/t.coastTime;return{along:(o.distance+c*i)/l,homeTime:o.homeTime+c*r,speed:t.topSpeed}}const d=s(t.shipTime-h);return{along:1-d.distance/l,homeTime:t.homeTime-d.homeTime,speed:d.speed}}const tn=12.5,ro=9,io=1.5,Ad=new Set(["Alpha Centauri"]),Z={ground:"#06080f",ring:"rgba(127,166,234,0.22)",stem:"rgba(127,166,234,0.18)",star:"#dfe7f5",dim:"#7d8aa3",sun:"#ffd98a",way:"#ff9d6e",ship:"#ffffff"};function Id(t,e,n){const a=t.getContext("2d");if(!a)return()=>{};const s=a,o=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=new Set(Nt.map(({name:v})=>v));let i={yaw:.6,pitch:.45,radius:1,reach:tn},l=0,h=performance.now(),d=null,c=[];const u=()=>({x:t.clientWidth/2,y:t.clientHeight/2});function p(v){const b=t.clientWidth,T=t.clientHeight,I=window.devicePixelRatio||1;t.width!==Math.round(b*I)&&(t.width=Math.round(b*I),t.height=Math.round(T*I)),s.setTransform(I,0,0,I,0,0),s.fillStyle=Z.ground,s.fillRect(0,0,b,T),!o&&!d&&(i={...i,yaw:i.yaw+.0015}),i={...i,radius:Math.min(b,T)*.47};const M=u(),k=E=>({x:M.x+E.x,y:M.y+E.y});s.font="11px ui-monospace, Menlo, monospace";for(const E of[5,10]){const R=en(Array.from({length:73},(B,H)=>({name:"",ra:H/72*24,dec:0,lightYears:E})),i);s.beginPath(),R.forEach((B,H)=>H?s.lineTo(k(B).x,k(B).y):s.moveTo(k(B).x,k(B).y)),s.strokeStyle=Z.ring,s.stroke();const D=k(R[0]??{x:0,y:0});s.fillStyle=Z.dim,s.fillText(`${E} ly`,D.x+4,D.y-3)}const{ship:A,chosen:C}=e(),O=Nt.find(({name:E})=>E===C),j=Qt.find(({name:E})=>E===C),S=O?Ya(O.metres,A):null;c=en(Qt,i);const L=en(Qt.map(E=>({...E,lightYears:E.lightYears*Math.cos(E.dec/180*Math.PI),dec:0})),i),$=c.map((E,R)=>R).sort((E,R)=>(c[E]?.depth??0)-(c[R]?.depth??0));for(const E of $){const R=k(c[E]??{x:0,y:0}),D=k(L[E]??{x:0,y:0}),B=c[E]?.name??"",H=((c[E]?.depth??0)+tn)/(2*tn);s.strokeStyle=Z.stem,s.beginPath(),s.moveTo(R.x,R.y),s.lineTo(D.x,D.y),s.stroke(),s.fillStyle=B===C?Z.way:Z.star,s.globalAlpha=.45+.55*H,s.beginPath(),s.arc(R.x,R.y,1.6+1.8*H,0,2*Math.PI),s.fill(),r.has(B)&&(s.strokeStyle=B===C?Z.way:Z.dim,s.beginPath(),s.arc(R.x,R.y,7,0,2*Math.PI),s.stroke()),s.fillStyle=B===C?Z.way:Z.dim,Ad.has(B)||s.fillText(B,R.x+10,R.y+4),s.globalAlpha=1}if(s.fillStyle=Z.sun,s.beginPath(),s.arc(M.x,M.y,4,0,2*Math.PI),s.fill(),s.fillText("the Sun",M.x+8,M.y-6),S&&O){const E=O.towards?en([{name:"",...O.towards,lightYears:tn*1.15}],i)[0]:null,R=j?c[Qt.indexOf(j)]:E,D=(v-h)/1e3%(ro+2*io),B=o?.5:Math.min(1,Math.max(0,(D-io)/ro)),H=Md(S,A,B*S.shipTime);if(R){const G=k(R);s.strokeStyle=Z.way,s.setLineDash(j?[]:[4,4]),s.beginPath(),s.moveTo(M.x,M.y),s.lineTo(G.x,G.y),s.stroke(),s.setLineDash([]);const $e={x:M.x+(G.x-M.x)*H.along,y:M.y+(G.y-M.y)*H.along};s.fillStyle=Z.ship,s.beginPath(),s.arc($e.x,$e.y,3,0,2*Math.PI),s.fill(),j||s.fillText(`to ${O.name}, ${O.said}: not to scale`,12,T-34)}else s.fillStyle=Z.dim,s.fillText(`${O.name} is inside the dot: the planets are a thousandth of a light-year away`,12,T-34);s.fillStyle=Z.star,s.font="13px ui-monospace, Menlo, monospace",s.fillText(`on board ${Ie(B*S.shipTime)}`,12,22),s.fillText(`at home  ${Ie(H.homeTime)}`,12,40),s.fillStyle=Z.dim,s.fillText(`${(H.speed*100).toFixed(H.speed>.99?4:1)}% of c`,12,58),s.fillText("drag to turn",b-96,T-14)}l=o&&!d?0:requestAnimationFrame(p)}const m=v=>{const b=t.getBoundingClientRect();return{x:v.clientX-b.left,y:v.clientY-b.top}},f=v=>{d=m(v),t.setPointerCapture(v.pointerId),l||(l=requestAnimationFrame(p))},y=v=>{if(!d)return;const b=m(v);i={...i,yaw:i.yaw+(b.x-d.x)*.01,pitch:Math.max(-1.4,Math.min(1.4,i.pitch+(b.y-d.y)*.01))},d=b},w=v=>{const b=m(v),T=u(),I=c.find(M=>r.has(M.name)&&Math.hypot(T.x+M.x-b.x,T.y+M.y-b.y)<12);d=null,I&&(h=performance.now(),n(I.name))};return t.addEventListener("pointerdown",f),t.addEventListener("pointermove",y),t.addEventListener("pointerup",w),l=requestAnimationFrame(p),()=>{cancelAnimationFrame(l),t.removeEventListener("pointerdown",f),t.removeEventListener("pointermove",y),t.removeEventListener("pointerup",w)}}const Ed=(t,e)=>{let n=Qr(Sa);const a=l=>{n=l.detail};t.addEventListener(Ta,a);const s=ei(Sa)(t,e),o=l=>{const h=l.target?.closest("[data-destination]")?.getAttribute("data-destination");h&&$a(t,{to:h})};t.addEventListener("click",o);const r=g("canvas",{class:"starmap","aria-label":"The stars within twelve light-years of the Sun, turning, with the ship flying the chosen trip"});t.prepend(r);const i=Id(r,()=>({ship:ti(n),chosen:String(n.to)}),l=>$a(t,{to:l}));return()=>{i(),s?.(),t.removeEventListener(Ta,a),t.removeEventListener("click",o)}},jd={name:"rocket",programs:[Sa],apps:{rocket:Ed}},Ma=["Go to the blog section,","You should see a list of posts,",'The last post title should be "Hello Blog", this post'];function Cd(t){let e=0,n="";const a=[],s={},o=h=>{const d=h.exec(t.slice(e));return d&&(e+=d[0].length),d?.[0]},r=h=>{n+=n.length===0?h.toLowerCase():h[0]?.toUpperCase()+h.slice(1).toLowerCase()},i=(h,d,c)=>{const u=s[d]??1;s[d]=u+1;const p=/shouldBe/i.test(n)&&!a.some(m=>m.name==="expected");a.push({value:h,name:p?"expected":`${d}${u}`,type:c})};let l=-1;for(;e<t.length&&l!==e;){l=e,o(/^[^a-z0-9"]+/i);const h=o(/^[a-z]+/i);h&&r(h);const d=o(/^"[^"]+"/);d&&(i(d,"s","String"),r("S"));const c=o(/^[0-9]+/);c&&(i(c,"n","int"),r("N"))}return{name:n,arguments:a,text:t}}const nn=(t,e,n,a)=>`<div class="${a}"><h4>${x(t)}</h4><pre><code>${we(n,e)}</code></pre></div>`;function lo(t){const e=t.map(a=>`context.${a.name}(${a.arguments.map(s=>s.value).join(", ")});`),n=Math.max(0,...e.map(a=>a.length));return e.map((a,s)=>`  ${a.padEnd(n)}  // ${t[s]?.text.trim()}`).join(`
`)}function ho(t){const e=new Set;return t.filter(n=>!e.has(n.name)&&e.add(n.name))}function ni(t){const e=t.map(Cd).filter(r=>r.name.length>0),n=`@Test
public void post() {
${lo(e)}
}`,a=`test("post", () => {
${lo(e)}
});`,s=ho(e).map(r=>`public void ${r.name}(${r.arguments.map(i=>`${i.type} ${i.name}`).join(", ")}) {
  // to write
}`).join(`

`),o=ho(e).map(r=>`${r.name}(${r.arguments.map(i=>i.name).join(", ")}) {
  // to write
}`).join(`

`);return'<div class="step-code">'+nn("The test, for the server","java",n,"step-test")+nn("The test, for the client","js",a,"step-test")+nn("What is left to write, in Java","java",s,"step-context")+nn("And in JavaScript","js",o,"step-context")+"</div>"}function Od(t){const e=g("textarea",{class:"step-post",rows:6,spellcheck:!1,"aria-label":"A post, one step a line"});e.value=Ma.map(s=>`* ${s}`).join(`
`);const n=g("div"),a=()=>{n.innerHTML=ni(e.value.split(`
`).map(s=>s.replace(/^\s*[*-]\s*/,"")))};e.addEventListener("input",a),t.replaceChildren(e,n),a()}const Ld=()=>`<pre class="step-post">${Ma.map(t=>`* ${t}`).join(`
`)}</pre>${ni(Ma)}`,Nd={name:"step-names",apps:{"step-names":Od},stills:{"step-names":Ld}},Mt='import Game from "./bowling";',ee=`${Mt}

let g;
beforeEach(() => (g = new Game()));`,Ye=(t,e,n="i++")=>`test("gutter game", () => {
${t?`  const g = new Game();
`:""}  for (let i = 0; i < 20; ${n})
    g.roll(0);
${e?`  expect(g.score()).toBe(0);
`:""}});`,Le=(t,e="i++")=>`test("all ones", () => {
${t?`  const g = new Game();
`:""}  for (let i = 0; i < 20; ${e})
    g.roll(1);
  expect(g.score()).toBe(20);
});`,be=`test("gutter game", () => {
  rollMany(20, 0);
  expect(g.score()).toBe(0);
});`,Se=`test("all ones", () => {
  rollMany(20, 1);
  expect(g.score()).toBe(20);
});`,ai=`test("one spare", () => {
  g.roll(5);
  g.roll(5); // spare
  g.roll(3);
  rollMany(17, 0);
  expect(g.score()).toBe(16);
});`,Pd=ai.split(`
`).map(t=>`// ${t}`).join(`
`),pt=`test("one spare", () => {
  rollSpare();
  g.roll(3);
  rollMany(17, 0);
  expect(g.score()).toBe(16);
});`,Rd=`test("one strike", () => {
  g.roll(10); // strike
  g.roll(3);
  g.roll(4);
  rollMany(16, 0);
  expect(g.score()).toBe(24);
});`,Qn=`test("one strike", () => {
  rollStrike();
  g.roll(3);
  g.roll(4);
  rollMany(16, 0);
  expect(g.score()).toBe(24);
});`,co=t=>`test("perfect game", () => {
  rollMany(12, 10);
  expect(g.score()).toBe(${t});
});`,ft=`function rollMany(rolls, pins) {
  for (let i = 0; i < rolls; i += 1)
    g.roll(pins);
}`,gt=`function rollMany(rolls, pins) {
  for (let i = 0; i < rolls; i += 1) g.roll(pins);
}`,wt=`function rollSpare() {
  g.roll(5);
  g.roll(5);
}`,ea=`function rollStrike() {
  g.roll(10);
}`,U=(...t)=>t.join(`

`),F={gutterNoImport:`test('gutter game', () => {
  const g = new Game();
});`,gutterNew:U(Mt,`test("gutter game", () => {
  const g = new Game();
});`),gutterRolls:U(Mt,Ye(!0,!1)),gutterScore:U(Mt,Ye(!0,!0)),allOnes:U(Mt,Ye(!0,!0),Le(!0)),setUp:U(ee,Ye(!0,!0),Le(!0)),gutterShared:U(ee,Ye(!1,!0),Le(!0)),bothShared:U(ee,Ye(!1,!0),Le(!1)),named:U(ee,`test("gutter game", () => {
  const pins = 0;
  const rolls = 20;
  for (let i = 0; i < rolls; i += 1)
    g.roll(pins);
  expect(g.score()).toBe(0);
});`,Le(!1,"i += 1")),extracted:U(ee,`test("gutter game", () => {
  const pins = 0;
  const rolls = 20;
  rollMany(rolls, pins);
  expect(g.score()).toBe(0);
});`,Le(!1,"i += 1"),ft),inlined:U(ee,be,Le(!1,"i += 1"),ft),rollMany:U(ee,be,Se,ft),spare:U(ee,be,Se,ai,ft),spareAside:U(ee,be,Se,Pd,ft),rollSpare:U(ee,be,Se,pt,gt,wt),strike:U(ee,be,Se,pt,Rd,gt,wt),rollStrike:U(ee,be,Se,pt,Qn,gt,wt,ea),perfect:U(ee,be,Se,pt,Qn,co("300"),gt,wt,ea),perfectFails:U(ee,be,Se,pt,Qn,co('"fail"'),gt,wt,ea)},J=(...t)=>`export default class Game {
${t.join(`
`)}
}`,_=(t,...e)=>e.length?`  ${t} {
${e.map(n=>`    ${n}`).join(`
`)}
  }`:`  ${t} {}`,ta=["let score = 0;","for (let i = 0; i < this._rolls.length; i++) {","  score += this._rolls[i];","}","return score;"],Ne=(...t)=>["const rolls = this._rolls;","let score = 0;",...t,"return score;"],te="  _rolls = [];",ue=_("roll(pins)","this._rolls.push(pins);"),Ue=`function isSpare(rolls, frameIndex) {
  return rolls[frameIndex] + rolls[frameIndex + 1] == 10;
}`,Fd=`function isStrike(rolls, frameIndex) {
  return rolls[frameIndex] === 10;
}`,an=`function strikeBonus(rolls, frameIndex) {
  return rolls[frameIndex + 1] + rolls[frameIndex + 2];
}`,na=`function spareBonus(rolls, frameIndex) {
  return rolls[frameIndex + 2];
}`,uo=`function sumOfBallsInFrame(rolls, frameIndex) {
  return rolls[frameIndex] + rolls[frameIndex + 1];
}`,Pe=t=>["let frameIndex = 0;","for (let frame = 0; frame < 10; frame++) {",...t.map(e=>`  ${e}`),"}"],mo=(t,e)=>[`if (${t}) {`,...t.includes("isSpare")?[]:["  // spare"],"  score += 10 + rolls[frameIndex + 2];","  frameIndex += 2;","} else {",`  score += ${e};`,"  frameIndex += 2;","}"],N={none:"",empty:"export default class Game {}",roll:J(_("roll()")),scoreEmpty:J(_("roll()"),_("score()")),scoreZero:J(_("roll()"),_("score()","return 0;")),summing:J("  _score = 0;",_("roll(pins)","this._score += pins;"),_("score()","return this._score;")),rollsField:J("  _score = 0;",te,_("roll(pins)","this._score += pins;"),_("score()","return this._score;")),bothWritten:J("  _score = 0;",te,_("roll(pins)","this._score += pins;","this._rolls.push(pins);"),_("score()","return this._score;")),readFromRolls:J("  _score = 0;",te,_("roll(pins)","this._score += pins;","this._rolls.push(pins);"),_("score()",...ta)),oldUnwritten:J("  _score = 0;",te,ue,_("score()",...ta)),rollsOnly:J(te,ue,_("score()",...ta)),twoAtATime:J(te,ue,_("score()","const rolls = this._rolls;","let score = 0;","let i = 0;","for (let frame = 0; frame < 10; frame++) {","  score += rolls[i] + rolls[i + 1];","  i += 2;","}","return score;")),spareByI:J(te,ue,_("score()","const rolls = this._rolls;","let score = 0;","let i = 0;","for (let frame = 0; frame < 10; frame++) {","  if (rolls[i] + rolls[i + 1] == 10) {","    // spare","    score += 10 + rolls[i + 2];","    i += 2;","  } else {","    score += rolls[i] + rolls[i + 1];","    i += 2;","  }","}","return score;")),frameIndex:J(te,ue,_("score()",...Ne(...Pe(mo("rolls[frameIndex] + rolls[frameIndex + 1] == 10","rolls[frameIndex] + rolls[frameIndex + 1]"))))),isSpare:`${J(te,ue,_("score()",...Ne(...Pe(mo("isSpare(rolls, frameIndex)","rolls[frameIndex] + rolls[frameIndex + 1]")))))}

${Ue}`,strike:`${J(te,ue,_("score()",...Ne(...Pe(["if (rolls[frameIndex] == 10) {","  // strike","  score += 10 +","    rolls[frameIndex + 1] +","    rolls[frameIndex + 2];","  frameIndex += 1;","} else if (isSpare(rolls, frameIndex)) {","  score += 10 + rolls[frameIndex + 2];","  frameIndex += 2;","} else {","  score += rolls[frameIndex] + rolls[frameIndex + 1];","  frameIndex += 2;","}"]))))}

${Ue}`,strikeBonus:`${J(te,ue,_("score()",...Ne(...Pe(["if (rolls[frameIndex] == 10) {","  // strike","  score += 10 + strikeBonus(rolls, frameIndex);","  frameIndex += 1;","} else if (isSpare(rolls, frameIndex)) {","  score += 10 + rolls[frameIndex + 2];","  frameIndex += 2;","} else {","  score += rolls[frameIndex]+rolls[frameIndex + 1];","  frameIndex += 2;","}"]))))}

${an}

${Ue}`,spareBonus:`${J(te,ue,_("score()",...Ne(...Pe(["if (rolls[frameIndex] == 10) {","  // strike","  score += 10 + strikeBonus(rolls, frameIndex);","  frameIndex += 1;","} else if (isSpare(rolls, frameIndex)) {","  score += 10 + spareBonus(rolls, frameIndex);","  frameIndex += 2;","} else {","  score += rolls[frameIndex]+rolls[frameIndex + 1];","  frameIndex += 2;","}"]))))}

${an}

${na}

${Ue}`,sumOfBalls:`${J(te,ue,_("score()",...Ne(...Pe(["if (rolls[frameIndex] == 10) {","  // strike","  score += 10 + strikeBonus(rolls, frameIndex);","  frameIndex += 1;","} else if (isSpare(rolls, frameIndex)) {","  score += 10 + spareBonus(rolls, frameIndex);","  frameIndex += 2;","} else {","  score += sumOfBallsInFrame(rolls, frameIndex);","  frameIndex += 2;","}"]))))}

${an}

${na}

${uo}

${Ue}`,isStrike:`${J(te,ue,_("score()",...Ne(...Pe(["if (isStrike(rolls, frameIndex)) {","  score += 10 + strikeBonus(rolls, frameIndex);","  frameIndex += 1;","} else if (isSpare(rolls, frameIndex)) {","  score += 10 + spareBonus(rolls, frameIndex);","  frameIndex += 2;","} else {","  score += sumOfBallsInFrame(rolls, frameIndex);","  frameIndex += 2;","}"]))))}

${Fd}

${an}

${na}

${uo}

${Ue}`},ve=["Roll loop is duplicated","Game creation duplicated"],ne=["ugly comment in test."],aa=["ugly comment in test.","ugly comment in conditional.","i is a bad name for this variable"],yt=["ugly comment in test.","ugly comment in conditional.","ugly expressions."],P=(t,e,n,a,s=[],o)=>o===void 0?{commit:t,stage:e,test:n,code:a,smells:s}:{commit:t,stage:e,test:n,code:a,smells:s,note:o},tt=[P(0,"test","",N.none,[],"Create the BowlingGame project. Create a test file bowling.spec.js. Execute the test and verify that you get the following error."),P(1,"test",F.gutterNoImport,N.none),P(2,"code",F.gutterNew,N.empty),P(3,"test",F.gutterRolls,N.empty),P(4,"code",F.gutterRolls,N.roll),P(5,"test",F.gutterScore,N.roll),P(6,"code",F.gutterScore,N.scoreEmpty),P(7,"code",F.gutterScore,N.scoreZero),P(8,"test",F.allOnes,N.scoreZero,ve),P(9,"code",F.allOnes,N.summing,ve),P(10,"clean",F.setUp,N.summing,ve),P(11,"clean",F.gutterShared,N.summing,ve),P(12,"clean",F.bothShared,N.summing,ve),P(13,"clean",F.named,N.summing,ve),P(14,"clean",F.extracted,N.summing,ve),P(15,"clean",F.inlined,N.summing,ve),P(16,"clean",F.rollMany,N.summing,ve),P(17,"test",F.spare,N.summing,ne),P(18,"test",F.spareAside,N.summing,ne,"Tempted to use flag to remember previous roll. So design must be wrong. roll() calculates score, but name does not imply that. score() does not calculate score, but name implies that it does. Design is wrong. Responsibilities are misplaced."),P(19,"clean",F.spareAside,N.rollsField,ne),P(20,"clean",F.spareAside,N.bothWritten,ne),P(21,"clean",F.spareAside,N.readFromRolls,ne),P(22,"clean",F.spareAside,N.oldUnwritten,ne),P(23,"clean",F.spareAside,N.rollsOnly,ne),P(24,"test",F.spare,N.rollsOnly,ne),P(25,"test",F.spareAside,N.rollsOnly,ne,"This isn’t going to work because i might not refer to the first ball of the frame. Design is still wrong. Need to walk through array two balls (one frame) at a time."),P(26,"clean",F.spareAside,N.twoAtATime,ne),P(27,"test",F.spare,N.twoAtATime,ne),P(28,"code",F.spare,N.spareByI,ne),P(29,"clean",F.spare,N.frameIndex,aa),P(30,"clean",F.spare,N.isSpare,aa),P(31,"clean",F.rollSpare,N.isSpare,aa),P(32,"test",F.strike,N.isSpare,ne),P(33,"code",F.strike,N.strike,ne),P(34,"clean",F.strike,N.strikeBonus,yt),P(35,"clean",F.strike,N.spareBonus,yt),P(36,"clean",F.strike,N.sumOfBalls,yt),P(37,"clean",F.strike,N.isStrike,yt),P(38,"clean",F.rollStrike,N.isStrike,yt),P(39,"test",F.perfect,N.isStrike),P(40,"test",F.perfectFails,N.isStrike),P(41,"test",F.perfect,N.isStrike)];function Bd(t,e){const n=t===""?[]:t.split(`
`),a=e.split(`
`),s=Array.from({length:n.length+1},()=>new Array(a.length+1).fill(0));for(let r=n.length-1;r>=0;r-=1)for(let i=a.length-1;i>=0;i-=1)s[r][i]=n[r]===a[i]?(s[r+1][i+1]??0)+1:Math.max(s[r+1][i]??0,s[r][i+1]??0);const o=new Array(a.length).fill(!0);for(let r=0,i=0;r<n.length&&i<a.length;)n[r]===a[i]?(o[i]=!1,r+=1,i+=1):(s[r+1][i]??0)>=(s[r][i+1]??0)?r+=1:i+=1;return o}function $n(t){return t instanceof Error?`${t.name}: ${t.message}`:String(t)}const si=new WeakSet,At=t=>typeof t=="string"?JSON.stringify(t):typeof t=="function"?si.has(t)?"[MockFunction]":`[Function ${t.name||"anonymous"}]`:String(t),oi=t=>t.map(At).join(", "),po=t=>t.length===0?"called with no arguments":`called with ${oi(t)}`;class dn extends Error{}const fo=t=>t instanceof dn?t.message:$n(t);function Dd(){const t=[],e=Object.assign((...n)=>{t.push(n)},{calls:t});return si.add(e),e}const Hd=(t,e)=>t.length===e.length&&t.every((n,a)=>Object.is(n,e[a]));function Wd(t){return{toBe(e){if(!Object.is(t,e))throw new dn(`Expected: ${At(e)}. Received: ${At(t)}.`)},toContain(e){if(!Array.isArray(t)||!t.includes(e))throw new dn(`Expected: something containing ${At(e)}. Received: ${Array.isArray(t)?`[${oi(t)}]`:At(t)}.`)},toHaveBeenCalledWith(...e){const n=t?.calls??[];if(n.some(s=>Hd(s,e)))return;const a=n[n.length-1];throw new dn(`Expected: ${po(e)}. Received: ${a?po(a):"never called"}.`)}}}function bn(t,e={}){const n=[],a=[],s=[],o=(c,u)=>n.push({name:[...s,c].join(" "),body:u}),r=(c,u)=>{s.push(c),u(),s.pop()},i=["test","it","describe","beforeEach","expect","fn",...Object.keys(e)],l=[o,o,r,c=>a.push(c),Wd,Dd,...Object.values(e)];try{new Function(...i,t)(...l)}catch(c){return{passed:!1,message:fo(c),results:[]}}if(n.length===0)return{passed:!1,message:"Your test suite must contain at least one test.",results:[]};const h=n.map(({name:c,body:u})=>{try{for(const p of a)p();return u(),{name:c,passed:!0}}catch(p){return{name:c,passed:!1,message:fo(p)}}}),d=h.find(c=>!c.passed);return d?{passed:!1,message:d.message,results:h}:{passed:!0,results:h}}const go=/^\s*import Game from "\.\/bowling";\s*$/m;function ri(t,e){let n;try{n=e.trim()?new Function(`${e.replace(/export default class Game/,"class Game")}
return Game;`)():void 0}catch(a){return{passed:!1,message:$n(a),results:[]}}return go.test(t)?bn(t.replace(go,""),{Game:n}):bn(t)}const _d={test:"Test: write or change a test",code:"Code: write what the test asks for",clean:"Clean: tidy, and stay green"};function wo(t,e,n,a){if(!e.trim())return`<figure class="kata-file"><figcaption>${t}</figcaption><p class="kata-empty">${a}</p></figure>`;const s=n===void 0?e.split(`
`).map(()=>!1):Bd(n,e),o=e.split(`
`).map((r,i)=>`<span class="line${s[i]?" added":""}">${we(r,"js")||" "}</span>`);return`<figure class="kata-file"><figcaption>${t}</figcaption><pre><code>${o.join(`
`)}</code></pre></figure>`}function ii(t,e){const n=ri(t.test,t.code),a=n.passed?'<p class="kata-bar green">All tests pass.</p>':`<p class="kata-bar red">${x(n.message??"")}</p>`,s=t.smells.length?`<div class="kata-smells"><h4>Still to clean</h4><ul>${t.smells.map(r=>`<li>${x(r)}</li>`).join("")}</ul></div>`:"",o=t.note?`<p class="kata-note">${x(t.note)}</p>`:"";return`<div class="kata-step"><p class="kata-move"><strong>commit ${t.commit}</strong> · ${_d[t.stage]}</p>${a}<div class="kata-files">${wo("bowling.spec.js",t.test,e?.test,"An empty file.")}${wo("bowling.js",t.code,e?.code,"Not written yet.")}</div>${o}${s}</div>`}function qd(t,e){return`commit ${t.commit} · ${t.stage} · ${e.passed?"All tests pass.":e.message}`}function li(t,e){return`<ol class="kata-strip" aria-label="The commits of the kata, red or green">${t.map(s=>{const o=ri(s.test,s.code),r=o.passed?"green":"red",i=s.commit===e;return`<li class="${r} ${s.stage}${i?" here":""}" data-commit="${s.commit}" title="${x(qd(s,o))}"${i?' aria-current="step"':""}>${s.commit}</li>`}).join("")}</ol><p class="kata-legend"><span class="red">a test fails</span> <span class="green code">all pass</span> <span class="green clean">a clean step: all still pass</span></p>`}const zd=()=>`<div class="kata">${li(tt,0)}${ii(tt[0])}</div>`,yo=tt.length-1;function Gd(t){let e=0;const n=g("div"),a=g("div"),s=g("button",{type:"button"},"← previous"),o=g("button",{type:"button",class:"invite"},"next →"),r=g("span",{class:"kata-hint"},"click any commit, or use ← →"),i=l=>{l!==e&&o.classList.remove("invite"),e=Math.max(0,Math.min(yo,l)),n.innerHTML=li(tt,e),a.innerHTML=ii(tt[e],tt[e-1]),s.disabled=e===0,o.disabled=e===yo};s.addEventListener("click",()=>i(e-1)),o.addEventListener("click",()=>i(e+1)),n.addEventListener("click",l=>{const h=l.target?.closest("[data-commit]");h&&i(Number(h.dataset.commit))}),t.tabIndex=0,t.addEventListener("keydown",l=>{if(l.key==="ArrowRight")i(e+1);else if(l.key==="ArrowLeft")i(e-1);else return;l.preventDefault()}),t.replaceChildren(g("div",{class:"kata"},n,g("div",{class:"kata-nav"},s,o,r),a)),i(0)}const Yd={name:"bowling-kata",apps:{"bowling-kata":Gd},stills:{"bowling-kata":zd}},Aa=[{name:"original",label:"Original",said:"The dispatcher the three tests imply: its listeners kept in an array, _queue.",source:`class Dispatcher {
  _queue = [];

  addListener(cb) {
    this._queue.push(cb);
  }

  deliver(message) {
    this._queue.forEach((cb) => cb(message));
  }
}`},{name:"refactored",label:"Refactored",said:"The same array, renamed and made private. Nothing a user of it can see has changed.",source:`class Dispatcher {
  #listeners = [];

  addListener(cb) {
    this.#listeners.push(cb);
  }

  deliver(message) {
    this.#listeners.forEach((cb) => cb(message));
  }
}`},{name:"with-a-bug",label:"With a bug",said:"addListener now copies the queue instead of changing it, and deliver, bound once in the constructor, still reads the first one.",source:`class Dispatcher {
  _queue = [];

  constructor() {
    const queue = this._queue;
    this.deliver = (message) => queue.forEach((cb) => cb(message));
  }

  addListener(cb) {
    this._queue = [...this._queue, cb];
  }
}`}],Ud=`let dispatcher, cb;
beforeEach(() => {
  dispatcher = new Dispatcher();
  cb = fn();
});

describe("addListener", () => {
  it("should add a callback to the queue", () => {
    dispatcher.addListener(cb);
    expect(dispatcher._queue).toContain(cb);
  });
});

describe("deliver", () => {
  it("should invoke queue callbacks with the received argument", () => {
    dispatcher._queue.push(cb);
    dispatcher.deliver("message");
    expect(cb).toHaveBeenCalledWith("message");
  });
});

it("delivers messages to listeners", () => {
  dispatcher.addListener(cb);
  dispatcher.deliver("message");
  expect(cb).toHaveBeenCalledWith("message");
});`;function Jd(t,e=Ud){let n;try{n=new Function(`${t}
return Dispatcher;`)()}catch(a){return{passed:!1,message:$n(a),results:[]}}return bn(e,{Dispatcher:n})}const bo=["addListener should add a callback to the queue","deliver should invoke queue callbacks with the received argument"];function Ia(t){const e=Jd(t.source),n=s=>{const o=e.results.find(l=>l.name===s),r=o?.passed??!1,i=r?"":`<span class="said">${x(o?.message??e.message??"")}</span>`;return`<li class="${r?"green":"red"}"><code>${x(s)}</code>${i}</li>`},a=e.results.map(s=>s.name).filter(s=>!bo.includes(s));return`<div class="dispatcher-run"><figure class="kata-file"><figcaption>dispatcher.js — ${x(t.label.toLowerCase())}</figcaption><pre><code>${we(t.source,"js")}</code></pre></figure><div class="dispatcher-tests"><p class="said-change">${x(t.said)}</p><h4>Looking inside</h4><ul class="test-results">${bo.map(n).join("")}</ul><h4>Reading like documentation</h4><ul class="test-results">${a.map(n).join("")}</ul></div></div>`}function Kd(t){const e=g("div"),n=Aa.map((a,s)=>{const o=g("input",{type:"radio",name:"dispatcher",value:a.name,checked:s===0});return o.addEventListener("change",()=>{e.innerHTML=Ia(a)}),g("label",{},o,` ${a.label}`)});t.replaceChildren(g("div",{class:"dispatcher-choice",role:"radiogroup","aria-label":"The dispatcher"},...n),e),e.innerHTML=Ia(Aa[0])}const Vd=()=>Aa.map(t=>`<section><h4>${t.label}</h4>${Ia(t)}</section>`).join(""),Xd={name:"tests-as-examples",apps:{"tests-as-examples":Kd},stills:{"tests-as-examples":Vd}},hi=`Feature: Magic of Disappearing Cucumbers

  Scenario: Eating 5 out of 12 cucumbers
    Given I have 12 cucumbers
    When I eat 5 cucumbers
    Then I should have 7 cucumbers remaining`,ci=`class CucumberSteps {
  #count = 0;

  givenIHaveNCucumbers(count) {
    this.#count = count;
  }
}`,vo=(t,e)=>`<p class="kata-bar ${t?"green":"red"}">${x(e)}</p>`;function di(t){if(t.error)return vo(!1,t.error);if(t.wished)return`<pre class="genie-wished">${x(t.wished)}</pre>`;const e=t.run;if(!e)return"";const n=e.results.map(a=>`<li class="${a.passed?"green":"red"}"><code>${x(a.name)}</code>${a.passed?"":`<span class="said">${x(a.message??"")}</span>`}</li>`);return`${vo(e.passed,e.passed?"Every scenario passes.":e.message??"")}<ul class="test-results">${n.join("")}</ul>`}const Zd={n:`
`,r:"\r",t:"	",b:"\b",f:"\f",v:"\v",0:"\0",s:" "},ko=t=>t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();function Qd(t,e){return t.endsWith(e)?t.at(-2)!=="\\"||/(^|[^\\])(\\\\)+.$/.test(t):!1}function ui(t){const e=t.split(" "),n=[],a=[];for(let s=0;s<e.length;){const o=e[s]??"",r=o[0];if(r==='"'||r==="'"){let l=e[s++]??"";for(;s<e.length&&!Qd(l,r);)l+=` ${e[s++]}`;a.push(l.slice(1,-1).replace(/\\(.)/g,(h,d)=>Zd[d]??d)),n.push("S");continue}if(s+=1,o&&!Number.isNaN(Number(o))){a.push(Number(o)),n.push("N");continue}const i=o.normalize("NFD").replace(/([^\w]|\d)/g,"");i?n.push(ko(i)):o&&(n.push("X"),a.push(o))}return{matchName:n.map(ko).join(""),args:a}}const eu=/^(Given|When|Then|And|But) (.*)$/,tu=/^(?:Scenario|Example):\s*(.*)$/,nu=/^("""|```)/;function au(t){const e=[];let n=null,a=null;const s=t.split(`
`),o=()=>a?.at(-1),r=i=>{a&&(a[a.length-1]=i)};for(let i=0;i<s.length;i+=1){const l=(s[i]??"").trim();if(!l||l.startsWith("#")||l.startsWith("@"))continue;if(l.startsWith("Background:")){n=[],a=n;continue}const h=tu.exec(l);if(h){const p=[...n??[]];e.push({name:h[1]??"",steps:p}),a=p;continue}const d=eu.exec(l);if(d){a?.push({keyword:d[1]??"",text:d[2]??""});continue}const c=o();if(l.startsWith("|")&&c){const p=l.replace(/^\||\|$/g,"").split("|").map(m=>m.trim());r({...c,table:[...c.table??[],p]});continue}const u=nu.exec(l);if(u&&c){const p=(s[i]??"").indexOf(u[1]??""),m=[];for(i+=1;i<s.length&&!(s[i]??"").trim().startsWith(u[1]??"");i+=1){const f=s[i]??"";m.push(f.slice(Math.min(p,f.length-f.trimStart().length)))}r({...c,docString:m.join(`
`)})}}return e}function su(t,e){const n=new Set(e),a=[];for(const s of t.flatMap(o=>o.steps)){const{matchName:o,args:r}=ui(s.text);if(n.has(o))continue;let i=1,l=1;const h=r.map(d=>typeof d=="number"?`number${i++}`:`string${l++}`);s.docString!==void 0&&h.push("docString"),s.table&&h.push("table"),a.push(`  ${s.keyword.toLowerCase()}${o}(${h.join(", ")}) {
    throw new Error("Unimplemented");
  }`),n.add(o)}return a.length===0?"":["There are missing steps. Please implement them:","","class WishedSteps {",a.join(`

`),"}"].join(`
`)}const xo=/^(given|when|then|and|but)([A-Z])/,bt=t=>JSON.stringify(t);function ou(t){const[e=[],...n]=t;return n.map(a=>Object.fromEntries(e.map((s,o)=>[s,a[o]??""])))}function mi(t,e){const n=e.trim().replace(/;+$/,"");let a;try{a=new Function(`return (${n});`)()}catch(l){return{wished:"",error:$n(l)}}if(typeof a!="function")return{wished:"",error:"The steps must be a class."};const s=new Map;for(const l of Object.getOwnPropertyNames(a.prototype))xo.test(l)&&s.set(l.replace(xo,"$2"),l);const o=au(t),r=su(o,new Set(s.keys()));if(r)return{wished:r};const i=o.map(l=>{const h=l.steps.map(d=>{const{matchName:c,args:u}=ui(d.text),p=[...u.map(bt),...d.docString===void 0?[]:[bt(d.docString)],...d.table?[bt(ou(d.table))]:[]];return`  steps[${bt(s.get(c))}](${p.join(", ")});`});return`test(${bt(l.name)}, () => {
  const steps = new Steps();
${h.join(`
`)}
});`});return{wished:"",run:bn(`const Steps = (${n});
${i.join(`
`)}`)}}function $o(t,e,n,a,s){const o=s?`<textarea class="genie-source" data-genie="${e}" rows="${a}" spellcheck="false" autocapitalize="off" aria-label="${x(t)}">${x(n)}</textarea>`:`<pre class="genie-source">${x(n)}</pre>`;return`<figure class="kata-file"><figcaption>${x(t)}</figcaption>${o}</figure>`}function pi(t,e,n){return`<div class="genie"><div class="genie-in">${$o("cucumbers.feature","feature",t,7,n)}${$o("steps.js","steps",e,10,n)}</div><figure class="kata-file genie-out"><figcaption>npm test</figcaption><div class="genie-output">${di(mi(t,e))}</div></figure></div>`}function ru(t){t.innerHTML=pi(hi,ci,!0);const e=t.querySelector('[data-genie="feature"]'),n=t.querySelector('[data-genie="steps"]'),a=t.querySelector(".genie-output");if(!e||!n||!a)return;const s=()=>{a.innerHTML=di(mi(e.value,n.value))};e.addEventListener("input",s),n.addEventListener("input",s)}const iu=()=>pi(hi,ci,!1),lu={name:"gherkin-genie",apps:{"gherkin-genie":ru},stills:{"gherkin-genie":iu}};function fi(t,e){if(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)return()=>{};let n=e(),a=!0,s=!1,o=!0,r;const i=g("button",{type:"button",class:"player"}),l=(u,p)=>{i.setAttribute("aria-label",u),i.textContent=p};l("Pause","⏸");const h=()=>{if(r=void 0,!a||!o||s)return;const u=n();if(u===null){s=!0,l("Play again","↻");return}r=setTimeout(h,u)},d=()=>{clearTimeout(r),r=void 0};i.addEventListener("click",()=>{if(s){n=e(),s=!1,a=!0,l("Pause","⏸"),d(),h();return}a=!a,l(a?"Pause":"Play",a?"⏸":"▶"),a?h():d()}),t.append(i);const c=typeof IntersectionObserver=="function"?new IntersectionObserver(u=>{for(const p of u)o=p.isIntersecting;o?r===void 0&&h():d()}):void 0;return c?.observe(t),h(),()=>{d(),c?.disconnect(),i.remove()}}function gi(t,e){const n=[];for(;n.length<e;){n.push("test");const a=Math.floor(t()*4);for(let s=0;s<a&&n.length<e;s+=1)n.push("clean")}return n}function wi(t){return`<ol class="small-steps" role="img" aria-label="Small steps: a test fails and is put right at once; clean steps between; again and again">${t.map(n=>`<li class="${n}"></li>`).join("")}</ol>`}const Ea=40,To=220,hu=950,cu=2200,du=45;function uu(t,{wipe:e=!0}={}){const n=t.map(()=>"empty"),a=[{marks:[...n],hold:To}],s=o=>a.push({marks:[...n],hold:o});return t.forEach((o,r)=>{o==="test"?(n[r]="red",s(hu),n[r]="fixed"):n[r]="clean",s(r===t.length-1?cu:To)}),e&&t.forEach((o,r)=>{n[r]="empty",s(du)}),a}const So=3;function mu(t){const e=g("div",{class:"small-steps-row"});return t.replaceChildren(e),fi(t,()=>{e.innerHTML=wi(Array.from({length:Ea},()=>"empty"));const a=[...e.querySelectorAll("li")],s=Array.from({length:So},(r,i)=>uu(gi(Math.random,Ea),{wipe:i<So-1})).flat();let o=0;return()=>{const r=s[o++];return r?(r.marks.forEach((i,l)=>{const h=a[l];h&&h.className!==i&&(h.className=i)}),r.hold):null}})}const pu=()=>wi(gi(Pt(2026),Ea).map(t=>t==="test"?"green":"clean")),fu={name:"small-steps",apps:{"small-steps":mu},stills:{"small-steps":pu}};class gu{listeners=new Set;send(e){for(const n of[...this.listeners])n(e)}on(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}}const ja=new gu,wu=900,yu=480,sn={x:1600,y:1e3};function on(t,e){return(t%e+e)%e}class bu{x=0;y=0;written="";driving=!1;follow({byRadians:e,tiltedBy:n,seconds:a}){const s=document.documentElement;if(s.dataset.sky!=="stars")return;this.driving||this.takeOver(s);const o=wu/(Math.PI*2),r=(a/yu*Math.PI*2+e)*o;this.x=on(this.x+r,sn.x),this.y=on(this.y-n*o,sn.y);const i=`${(Math.round(this.x*2)/2).toFixed(1)}px ${(Math.round(this.y*2)/2).toFixed(1)}px`;if(i===this.written)return;this.written=i;const[l,h]=i.split(" ");s.style.setProperty("--sky-x",l??"0px"),s.style.setProperty("--sky-y",h??"0px")}release(){const e=document.documentElement;e.classList.remove("sky-driven"),e.style.removeProperty("--sky-x"),e.style.removeProperty("--sky-y"),this.x=0,this.y=0,this.written="",this.driving=!1}takeOver(e){const n=getComputedStyle(document.body,"::before").transform;if(n&&n!=="none")try{const a=new DOMMatrixReadOnly(n);this.x=on(a.m41,sn.x),this.y=on(a.m42,sn.y)}catch{}e.classList.add("sky-driven"),this.driving=!0}}function vu(t){return ja.on(e=>t.follow(e))}const Mo=new bu,ku={name:"sky",install:()=>vu(Mo),arrive:()=>Mo.release()},{width:Ao,height:rn,pad:ge}=_a;function xu(t,e){const n=Math.max(...t.map(d=>d.values.length),1),a=Math.max(1,...t.flatMap(d=>d.values)),s=Ao-ge.left-ge.right,o=rn-ge.top-ge.bottom,r=d=>ge.left+d/Math.max(1,n-1)*s,i=d=>ge.top+o-d/a*o,l=t.map(d=>{const c=d.values.map((u,p)=>`${r(p).toFixed(1)},${i(u).toFixed(1)}`).join(" ");return`<polyline class="line ${d.className}" points="${c}"><title>${d.name}</title></polyline>`}).join(""),h=t.map((d,c)=>`<rect class="${d.className}" x="${ge.left+c*90}" y="${rn-ge.bottom+20}" width="10" height="3"/><text x="${ge.left+c*90+14}" y="${rn-ge.bottom+24}">${d.name}</text>`).join("");return`<svg viewBox="0 0 ${Ao} ${rn}" role="img" aria-label="${e.y} by ${e.x}">${jr(a,e,n,Wa(a))}${l}${h}</svg>`}const sa=20;function $u(t){const{baseTime:e,shortcutFactor:n,interestRate:a,timeHorizon:s}=t,o=[];let r=null;const i=e;let l=e*(1-n),h=0,d=0,c=0,u=0,p=0,m=0;for(let f=0;f<s*sa;){for(;p<=f;)h+=1,c+=1,p+=i;for(;m<=f;)d+=1,u+=1,m+=l,l*=1+a;if(f+=1,f%sa===0){const y=f/sa;o.push({month:y,cleanCumulative:h,debtCumulative:d,cleanMonthly:c,debtMonthly:u,debtFeatureCost:l}),c=0,u=0,r===null&&h>d&&(r=y)}}return{months:o,breakEvenMonth:r}}const Io=t=>$u({baseTime:Number(t["base-time"]),shortcutFactor:Number(t.shortcuts)/100,interestRate:Number(t.interest)/100,timeHorizon:Number(t.timeline)}),Eo=({months:t})=>`<div class="chart"><h4>Cumulative features</h4>${xu([{name:"Clean",className:"clean",values:t.map(e=>e.cleanCumulative)},{name:"Debt-driven",className:"debt",values:t.map(e=>e.debtCumulative)}],{x:"Months",y:"Features"})}</div>`,Tu={name:"technical-debt",summary:"what shortcuts cost, compounded: two teams build the same features, one of them cutting corners",parameters:[{name:"base-time",label:"Base time",description:"days a feature takes when it is done properly",min:1,max:30,step:1,initial:20,show:t=>`${t} days`},{name:"shortcuts",label:"Shortcuts",description:"percent of that time a shortcut saves, at first",min:0,max:90,step:5,initial:25,show:t=>`${t}%`},{name:"interest",label:"Interest",description:"percent dearer every shortcut feature makes the next one",min:0,max:100,step:1,initial:10,show:t=>`${t}%`},{name:"timeline",label:"Timeline",description:"months to look ahead",min:6,max:60,step:1,initial:24,show:t=>`${t} months`}],run(t){const e=Number(t.shortcuts),n=Number(t.interest),a=Number(t.timeline),s=Io(t),{months:o,breakEvenMonth:r}=s,i=o[o.length-1],l=i?.cleanCumulative??0,h=i?.debtCumulative??0,d=l>0?(l-h)/l*100:0,c=Math.abs(d)<.1,u=c?"even":d>0?"loss":"gain",p=c?"≈0%":`${Math.abs(d).toFixed(1)}%`,m=r?`month ${r}`:"never",f=n===0?"With no interest there is no compound slowdown, and the shortcut simply wins. That is the one case that does not happen to real code.":r?`${e}% saved at first, ${n}% interest on every feature: clean development overtakes at month ${r}, and by month ${a} the shortcut road has delivered ${p} less.`:`${e}% saved at first, ${n}% interest on every feature: in ${a} months the clean road has not yet caught up. Give it longer, or raise the interest.`,y=[`<div class="clean"><strong>${l}</strong>clean features</div>`,`<div class="debt"><strong>${h}</strong>debt features</div>`,`<div><strong>${m}</strong>break-even</div>`,`<div><strong>${p}</strong>${u} on the shortcut road</div>`].join(""),w=Cr([{name:"Clean",className:"clean",values:o.slice(1).map(v=>v.cleanMonthly)},{name:"Debt-driven",className:"debt",values:o.slice(1).map(v=>v.debtMonthly)}],{x:"Months",y:"Features a month"});return{text:`clean ${l} features, debt-driven ${h}, break-even ${m}
${f}`,html:`<div class="figures">${y}</div><div class="charts">${Eo(s)}<div class="chart"><h4>Monthly delivery rate</h4>${w}</div></div><p>${f}</p>`,data:{cleanFeatures:l,debtFeatures:h,breakEvenMonth:r,months:o}}},glance:t=>Eo(Io(t))},Su={name:"technical-debt",programs:[Tu]},Mu="theme";function yi(){const t=document.documentElement,e=t.dataset.pageTheme;let n=null;try{n=localStorage.getItem(Mu)}catch{n=null}const a=e??(n==="light"||n==="dark"||n==="pink"?n:null);a?t.dataset.theme=a:delete t.dataset.theme}function jt(...t){return t.map(e=>e.replace(/^[a-z]+:\/\//,"").replace(/^\/+|\/+$/g,"")).filter(Boolean).join("-")}const Au=1e4,Ca=[];let vt=null;function jo(){const t=window.goatcounter?.count;if(!t)return!1;for(const e of Ca.splice(0))t({path:e,title:e,event:!0});return!0}function Ct(t){if(Ca.push(t),jo()||vt)return;const e=Date.now();vt=setInterval(()=>{(jo()||Date.now()-e>Au)&&(vt&&clearInterval(vt),vt=null,Ca.splice(0))},250)}const Oa="theme";function Iu(){return window.matchMedia("(prefers-color-scheme: dark)").matches}function Eu(){let t=null;try{t=localStorage.getItem(Oa)}catch{t=document.documentElement.dataset.theme??null}return t==="light"||t==="dark"?t:t==="pink"?"light":Iu()?"dark":"light"}class ju{apply(e){const n=e==="toggle"?Eu()==="dark"?"light":"dark":e;try{n==="system"?localStorage.removeItem(Oa):localStorage.setItem(Oa,n)}catch{}return yi(),Ct(jt("theme","set",n)),n}}function Cu(){let t=null;try{t=localStorage.getItem("theme")}catch{}Ct(jt("theme","start",t??"system"))}function Ou(t){const e=document.querySelector(".theme-toggle");return e?(e.classList.add("ready"),e.removeAttribute("aria-hidden"),e.removeAttribute("tabindex"),e.addEventListener("click",t),()=>e.removeEventListener("click",t)):()=>{}}const La=["light","dark","system","pink"];function Lu(t){return La.includes(t)}const Nu={light:"☀︎",dark:"☾︎",system:"◐︎",pink:"❀︎"};function Co(t){const e=n=>`${Nu[n]} ${n}`;return{text:`theme   ${La.map(n=>n===t?`[${e(n)}]`:e(n)).join("   ")}`,html:`<pre class="choices">theme   ${La.map(n=>n===t?`<strong aria-current="true">${e(n)}</strong>`:`<a href="#" data-run="theme ${n}" title="theme ${n}">${e(n)}</a>`).join("   ")}</pre>`}}function Pu(t){return{name:"theme",usage:"theme [light|dark|system|pink|auto]",description:"switch the colours, or toggle them",run({site:e,cwd:n},[a]){const s=e.at(n)?.fields.theme;if(s)return{text:`theme: this page keeps its own, ${s}. It works everywhere else.`,error:!0};if(a===void 0)return Co(t.apply("toggle"));const o=a==="auto"?"system":a;return Lu(o)?Co(t.apply(o)):{text:`theme: ${a}: choose light, dark, system or pink`,error:!0}}}}const Ru={name:"theme",commands:[Pu(new ju)],install:t=>(Cu(),Ou(()=>t.run("theme"))),arrive:()=>yi()},Oo=[{machine:"small",algorithm:"pairs",vertices:8,graphs:150,serial:42.43,openmp:14.34,cuda:2.572},{machine:"small",algorithm:"pairs",vertices:16,graphs:150,serial:738.92,openmp:247.95,cuda:33.06},{machine:"small",algorithm:"pairs",vertices:24,graphs:150,serial:4387.13,openmp:1208.97,cuda:109.093},{machine:"large",algorithm:"pairs",vertices:8,graphs:150,serial:7.483,openmp:1.511,cuda:.653},{machine:"large",algorithm:"pairs",vertices:16,graphs:150,serial:135.505,openmp:25.061,cuda:5.24},{machine:"large",algorithm:"pairs",vertices:24,graphs:150,serial:515.757,openmp:126.228,cuda:18.99},{machine:"small",algorithm:"common-labelling",vertices:8,graphs:50,serial:843.21,openmp:214.51,cuda:33.404},{machine:"small",algorithm:"common-labelling",vertices:16,graphs:50,serial:17061.4,openmp:4284.01,cuda:550.153},{machine:"small",algorithm:"common-labelling",vertices:24,graphs:50,serial:71670.13,openmp:20274.32,cuda:2332.076}],Fu={small:"Intel Atom 330, 2 cores, 8 W · NVIDIA 9400M, 16 cores, 10 W",large:"Intel i7 950, 4 cores, 130 W · NVIDIA GT 430, 96 cores, 49 W"},Bu={pairs:t=>`Matching every pair of ${t} graphs`,"common-labelling":t=>`Finding one labelling common to ${t} graphs`};function oa(t){if(t<10)return`${t.toFixed(1)} s`;if(t<60)return`${Math.round(t)} s`;const e=Math.floor(t/60);return e<60?e<10?`${e} min ${Math.round(t-e*60)} s`:`${Math.round(t/60)} min`:`${Math.floor(e/60)} h ${e%60} min`}const Du=t=>`×${t>=10?Math.round(t):t.toFixed(1)}`;function Lo(t){const e=Math.max(...t.map(s=>s.serial/s.cuda)),n=(s,o)=>`<span class="bar ${o}" style="--p:${(s/e).toFixed(3)}"></span><span class="factor">${Du(s)}</span>`;return`<figure class="runs"><table class="runs"><thead><tr><th>each graph has</th><th>one thread</th><th>OpenMP, every core</th><th>CUDA, the graphics card</th></tr></thead>${[...new Set(t.map(s=>`${s.algorithm}/${s.machine}`))].map(s=>{const o=t.filter(h=>`${h.algorithm}/${h.machine}`===s),{algorithm:r,machine:i}=o[0],l=o.map(h=>`<tr><th scope="row">${h.vertices} vertices</th><td>${oa(h.serial)}</td><td>${oa(h.openmp)}<div class="speedup">${n(h.serial/h.openmp,"openmp")}</div></td><td>${oa(h.cuda)}<div class="speedup">${n(h.serial/h.cuda,"cuda")}</div></td></tr>`).join("");return`<tbody><tr class="group"><th colspan="4">${Bu[r](o[0]?.graphs??0)}<span>${Fu[i]}</span></th></tr>${l}</tbody>`}).join("")}</table><figcaption>Measured in 2011, on graphs of the GREC dataset. Each bar is how many times faster than one thread of the same machine, and all the bars are on one scale.</figcaption></figure>`}const Hu={name:"thesis-results",stills:{"graph-matching-runs":()=>Lo(Oo)},apps:{"graph-matching-runs":t=>{t.firstChild||(t.innerHTML=Lo(Oo))}}},Na={variable:"tn",atLeast:!0,threshold:20,months:[0,1,2,3,4,5,6,7,8,9,10,11]};function Wu(t,e){const n=t.map(({value:m})=>m),a=Math.floor(Math.min(...n,...(e.spans??[]).map(({value:m})=>m))),s=Math.ceil(Math.max(...n,a+1)),o=Mr(t.map(({year:m})=>m),a,s),{x:r,y:i,slot:l}=o,h=m=>r(m)+l/2,d=[];for(const m of t){const f=d[d.length-1];f&&f[f.length-1]?.year===m.year-1?f.push(m):d.push([m])}const c=d.map(m=>`<polyline class="line" points="${m.map(({year:f,value:y})=>`${Y(h(f))},${Y(i(y))}`).join(" ")}"/>`).join(""),u=t.map(({year:m,value:f,title:y,partial:w})=>`<circle class="dot${w?" partial":""}" cx="${Y(h(m))}" cy="${Y(i(f))}" r="3.5"><title>${y}</title></circle>`).join(""),p=o.levels(e.spans??[]);return o.wrap(e.label,`${c}${u}${p}`)}function _u(t,{threshold:e,atLeast:n},a){if(!t)return 0;const[s=0,...o]=t;return o.reduce((r,i,l)=>s+l*a>=e-1e-9===n?r+i:r,0)}const st={tn:{code:1002,unit:"°C",name:"daily minimum",summary:"mean",bin:.5,range:[-30,35]},tx:{code:1001,unit:"°C",name:"daily maximum",summary:"mean",bin:.5,range:[-25,50]},pp:{code:1300,unit:"mm",name:"daily rain",summary:"sum",bin:.5,range:[0,250]},pi:{code:1303,unit:"mm/h",name:"most rain in one hour",summary:"max",bin:.5,range:[0,100]}},qu=.95,zu=(t,e)=>new Date(Date.UTC(t,e+1,0)).getUTCDate(),Me=t=>t.reduce((e,n)=>e+n,0);function Gu(t,e){return t.length===0?null:e==="sum"?Me(t.map(({figure:n})=>n)):e==="max"?Math.max(...t.map(({figure:n})=>n)):Me(t.map(({figure:n,weight:a})=>n*a))/Me(t.map(({weight:n})=>n))}function Yu(t,e){const n=st[e.variable];return Object.entries(t.years).flatMap(([a,s])=>{const o=s[e.variable];if(!o)return[];const r=Number(a),i=o.months.map(m=>({days:_u(m,e,n.bin),measured:Me(m?.slice(1)??[])})),l=m=>e.months.includes(m),h=Me(i.filter((m,f)=>l(f)).map(m=>m.measured)),d=Me(e.months.map(m=>zu(r,m))),c=Me(i.filter((m,f)=>l(f)).map(m=>m.days)),u=o.summaries.flatMap((m,f)=>l(f)&&m!==null?[{figure:m,weight:i[f]?.measured??0}]:[]),p=Gu(u,n.summary);return[{year:r,days:c,elsewhere:Me(i.map(m=>m.days))-c,measured:h,expected:d,whole:h/d>=qu,summary:p,months:i}]}).sort((a,s)=>a.year-s.year)}const No=["January","February","March","April","May","June","July","August","September","October","November","December"];function Po(t){const{name:e,unit:n}=st[t.variable],a=t.variable==="pi"?"":"a ",s=t.atLeast?`of ${t.threshold} ${n} or more`:`below ${t.threshold} ${n}`,o=No[t.months[0]??0],r=No[t.months[t.months.length-1]??11],i=t.months.length===12?"whole year":`${o} to ${r}`;return`days with ${a}${e} ${s}, ${i}`}const bi=["January","February","March","April","May","June","July","August","September","October","November","December"],Uu=.55;function Ju(t,e,{days:n,measured:a}){const s=`${bi[e]} ${t}`;if(a===0)return`<td class="none" title="${s}: not measured"></td>`;const o=Math.round(n/a*1e3)/1e3;return`<td${o>=Uu?' class="deep"':""} style="--v:${o}" title="${s}: ${n} of ${a} days">${n||""}</td>`}function Ku(t,e){const n=`<tr><th></th>${bi.map(s=>`<th scope="col">${s.slice(0,3)}</th>`).join("")}</tr>`,a=[...t].reverse().map(({year:s,months:o})=>`<tr><th scope="row">${s}</th>${o.map((r,i)=>Ju(s,i,r)).join("")}</tr>`);return`<table class="heat calendar${e?" warm":""}"><thead>${n}</thead><tbody>${a.join("")}</tbody></table>`}const Ro=t=>t.reduce((e,n)=>e+n,0)/t.length;function Fo(t){const e=t.flatMap(({summary:n})=>n===null?[]:[n]);return{from:t[0]?.year??0,to:t[t.length-1]?.year??0,years:t.length,days:Ro(t.map(({days:n})=>n)),summary:e.length?Ro(e):null}}function Vu(t){const e=t.filter(a=>a.whole);if(e.length<4)return null;const n=Math.floor(e.length/2);return[Fo(e.slice(0,n)),Fo(e.slice(n))]}const Xu=["January","February","March","April","May","June","July","August","September","October","November","December"],Zu={mean:"The mean",sum:"The total",max:"The highest"},It=t=>String(Math.round(t*10)/10),Qu=t=>`${t>0?"+":t<0?"−":""}${It(Math.abs(t))}`,em=t=>`${Number(t.slice(8,10))} ${Xu[Number(t.slice(5,7))-1]} ${t.slice(0,4)}`;function tm(t,e){const{unit:n,name:a}=st[e.variable],s=Object.values(t.years).flatMap(i=>i[e.variable]?[i[e.variable].record]:[]),[o,r]=e.atLeast?s.map(([i,l])=>[i,l]).reduce((i,l)=>l[0]>i[0]?l:i):s.map(([,,i,l])=>[i,l]).reduce((i,l)=>l[0]<i[0]?l:i);return`<p class="record">The ${e.atLeast?"highest":"lowest"} ${a} on record here: ${o} ${n} on ${em(r)}, whatever months are chosen.</p>`}function vi(t,e){const n=st[e.variable],a=`<figcaption><strong>${t.name}</strong> · ${t.altitude} m, ${t.setting} · ${Po(e)}</figcaption>`,s=Yu(t,e);if(s.length===0)return`<figure class="weather">${a}<p>This station has no ${n.name} on record.</p></figure>`;const o=Vu(s),r=({from:m,to:f})=>`${m}–${f}`,i=o?'<div class="figures">'+o.map(m=>`<div><strong>${It(m.days)}</strong>days a year, ${r(m)}</div>`).join("")+`<div><strong>${Qu(o[1].days-o[0].days)}</strong>days a year, from one half to the other</div></div>`:"",l=s.map(({year:m,days:f,elsewhere:y,measured:w,expected:v,whole:b})=>{const T=y>0?`, and ${y} more outside the months chosen`:"",I=b?"":`, with only ${w} of ${v} days measured`;return{year:m,value:f,partial:!b,title:`${m}: ${f} days${I}${T}`}}),h=(o??[]).map(m=>({from:m.from,to:m.to,value:m.days,label:`${It(m.days)} a year`})),d=s.flatMap(({year:m,summary:f,whole:y})=>f===null||!y?[]:[{year:m,value:f,title:`${m}: ${It(f)} ${n.unit}`}]),c=(o??[]).flatMap(m=>m.summary===null?[]:[{from:m.from,to:m.to,value:m.summary,label:`${It(m.summary)} ${n.unit}`}]),u=`${Zu[n.summary]} ${n.name} of each year, ${n.unit}`,p=(n.summary==="mean"?Wu:ya)(d,{label:u,spans:c});return`<figure class="weather">${a}${i}<h4>Days a year</h4>${ya(l,{label:`Days a year: ${Po(e)}`,spans:h})}<h4>When in the year they fell</h4>${Ku(s,e.atLeast&&n.unit==="°C")}<h4>${u}, in the months chosen</h4>${p}`+tm(t,e)+"</figure>"}const Bo=[{id:"tropical-nights",name:"tropical nights",variable:"tn",atLeast:!0,threshold:20},{id:"torrid-nights",name:"torrid nights",variable:"tn",atLeast:!0,threshold:25},{id:"hot-days",name:"hot days",variable:"tx",atLeast:!0,threshold:30},{id:"torrid-days",name:"torrid days",variable:"tx",atLeast:!0,threshold:35},{id:"frost-days",name:"frost days",variable:"tn",atLeast:!1,threshold:0},{id:"rainy-days",name:"rainy days",variable:"pp",atLeast:!0,threshold:1},{id:"heavy-rain",name:"days of heavy rain",variable:"pp",atLeast:!0,threshold:20},{id:"downpours",name:"days with a downpour",variable:"pi",atLeast:!0,threshold:10}],Xe=[{code:"WU",name:"Badalona - Museu",municipality:"Badalona",altitude:42,setting:"urban, by the sea"},{code:"X4",name:"Barcelona - el Raval",municipality:"Barcelona",altitude:33,setting:"dense city, on a roof"},{code:"X8",name:"Barcelona - Zona Universitària",municipality:"Barcelona",altitude:82,setting:"city edge"},{code:"D5",name:"Barcelona - Observatori Fabra",municipality:"Barcelona",altitude:410,setting:"wooded hill above the city"},{code:"UP",name:"Cabrils",municipality:"Cabrils",altitude:81,setting:"coastal slope, half rural"},{code:"XF",name:"Sabadell - Parc Agrari",municipality:"Sabadell",altitude:259,setting:"farmland beside a city"},{code:"XJ",name:"Girona",municipality:"Girona",altitude:72,setting:"market gardens by the city"},{code:"XE",name:"Tarragona - Complex Educatiu",municipality:"Tarragona",altitude:6,setting:"coast"},{code:"VK",name:"Raimat",municipality:"Lleida",altitude:286,setting:"inland plain, vineyards"}],Do=[["whole year",[0,1,2,3,4,5,6,7,8,9,10,11]],["June to August",[5,6,7]],["May to October",[4,5,6,7,8,9]],["December to February",[0,1,11]]],nm={tn:[-10,30],tx:[0,45],pp:[.5,100],pi:[.5,60]};function am(t){const e=new Map,n=Da(t,"/data/weather/index.json"),a=g("div");a.append(...t.querySelectorAll("figure"));let s=null,o=Na,r=!1;const i=(w,v)=>g("option",{value:w},v),l=g("select",{onchange:()=>{f(l.value)}},...Xe.map(({code:w,name:v})=>i(w,v))),h=g("select",{onchange:()=>{const w=Bo.find(({id:v})=>v===h.value);w&&m({variable:w.variable,atLeast:w.atLeast,threshold:w.threshold})}},...Bo.map(({id:w,name:v})=>i(w,v))),d=g("select",{onchange:()=>m({months:Do[Number(d.value)]?.[1]??Na.months})},...Do.map(([w],v)=>i(v,w))),c=g("output"),u=g("input",{type:"range",step:.5,oninput:()=>m({threshold:Number(u.value)})});function p(){const[w,v]=nm[o.variable];u.min=String(w),u.max=String(v),u.value=String(o.threshold),c.textContent=`${o.atLeast?"":"below "}${o.threshold} ${st[o.variable].unit}${o.atLeast?" or more":""}`,s&&(a.innerHTML=vi(s,o))}function m(w){o={...o,...w},p()}async function f(w){const v=e.get(w)??fetch(`/data/weather/${w}.json`).then(b=>b.json());e.set(w,v);try{const b=await v;if(r||l.value!==w)return;s=b,p()}catch{e.delete(w),a.replaceChildren(g("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}const y=g("div",{class:"dials"},g("label",{},"Station",l),g("label",{},"Counting",h),g("label",{},"Threshold: ",c,u),g("label",{},"Months",d));return t.replaceChildren(y,a,n),f(l.value),()=>{r=!0}}function sm(t,e,[n,a]){if(t.length===0)return null;const s=Math.round((a-n)/e),o=new Map;for(const h of t){const d=Math.min(s-1,Math.max(0,Math.floor((h-n)/e+1e-9)));o.set(d,(o.get(d)??0)+1)}const r=Math.min(...o.keys()),i=Math.max(...o.keys());return[Math.round((n+r*e)*1e3)/1e3,...Array.from({length:i-r+1},(h,d)=>o.get(r+d)??0)]}const Ho="7bvh-jvq2",ki=5e4,Wo=Object.entries(st),om="No representatiu",rm=["Representatiu",""],im=(t,e)=>Math.round(t*10**e)/10**e;function lm(t,e){if(t.length===0)return null;if(e==="max")return Math.max(...t);const n=t.reduce((a,s)=>a+s,0);return im(e==="sum"?n:n/t.length,2)}function hm(t,e){const n=Array.from({length:12},(o,r)=>t.filter(({date:i})=>Number(i.slice(5,7))===r+1).map(({value:i})=>i)),a=t.reduce((o,r)=>r.value>o.value?r:o),s=t.reduce((o,r)=>r.value<o.value?r:o);return{months:n.map(o=>sm(o,e.bin,e.range)),summaries:n.map(o=>lm(o,e.summary)),record:[a.value,a.date,s.value,s.date]}}function cm(t){if(!Array.isArray(t))throw new Error("the portal did not answer with rows");if(t.length>=ki)throw new Error("the answer was cut short at the limit");const e=t;if(!e.some(s=>s.data_lectura?.slice(5,7)==="12"))throw new Error("the year does not reach December yet");const n=new Map,a=new Set;for(const s of e){const o=s.estat??"";if(o===om)continue;if(!rm.includes(o))throw new Error(`the network marks days as "${o}", which nobody has decided how to read`);const r=s.data_lectura?.slice(0,10)??"",i=`${s.codi_estacio}/${s.codi_variable}`;if(a.has(`${i}/${r}`))throw new Error(`${i} has ${r} twice`);a.add(`${i}/${r}`);const l=Number(s.valor);Number.isFinite(l)&&n.set(i,[...n.get(i)??[],{date:r,value:l}])}return n}const dm={name:"weather",directory:"public/data/weather",firstYear:1988,files:Xe.map(t=>`${t.code}.json`),about:{measures:"daily minimum and maximum temperature, daily rain, most rain in one hour",network:"Xarxa d'Estacions Meteorològiques Automàtiques (XEMA)",attribution:"Servei Meteorològic de Catalunya (XEMA). Dades obertes de la Generalitat de Catalunya.",dataset:`https://analisi.transparenciacatalunya.cat/d/${Ho}`,stations:Xe},requestsFor(t){const e=Xe.map(a=>`'${a.code}'`).join(","),n=Wo.map(([,a])=>a.code).join(",");return[Ir(Ho,{select:"codi_estacio,codi_variable,data_lectura,valor,estat",where:`codi_estacio in (${e}) and codi_variable in (${n}) and data_lectura between '${t}-01-01T00:00:00' and '${t}-12-31T23:59:59'`,limit:ki})]},withYear(t,e,n){const a=cm(n[0]);return Object.fromEntries(Xe.map(s=>{const o=`${s.code}.json`,r=Wo.flatMap(([h,d])=>{const c=a.get(`${s.code}/${d.code}`);return c?[[h,hm(c,d)]]:[]}),i=Object.fromEntries(r),l={...t[o]?.years,...r.length?{[e]:i}:{}};return[o,{...s,years:l}]}))}},um=t=>{const e=JSON.parse(t(`/data/weather/${Xe[0]?.code}.json`)),n=JSON.parse(t("/data/weather/index.json"));return vi(e,Na)+kn(n)},mm={name:"weather",apps:{weather:am},stills:{weather:um},sources:[dm]},ra="header-world",un={saved(){try{const t=localStorage.getItem(ra);if(!t)return null;const e=JSON.parse(t);return[e.seed,e.levels,e.roughness,e.share].every(a=>typeof a=="number"&&Number.isFinite(a))?e:null}catch{return null}},remember(t){try{localStorage.setItem(ra,JSON.stringify(t))}catch{}},forget(){try{localStorage.removeItem(ra)}catch{}}};function xi(t,e,n){const a=t.mesh.faces[n*3]??0,s=t.mesh.faces[n*3+1]??0,o=t.mesh.faces[n*3+2]??0;return((e[a]??0)+(e[s]??0)+(e[o]??0))/3}function pm(t,e){return xi(t,t.mesh.radii,e)}const fm=[24,92,168],gm=[62,176,206],wm=[214,196,138],_o=[190,158,84],ia=[70,138,66],ym=[74,104,76],bm=[136,128,116],qo=[238,243,247];function Fe(t,e,n){const a=Math.min(1,Math.max(0,n));return[t[0]+(e[0]-t[0])*a,t[1]+(e[1]-t[1])*a,t[2]+(e[2]-t[2])*a]}function vm(t){return t>.78?_o:t>.62?Fe(ia,_o,(t-.62)/.16):t>.3?ia:Fe(ym,ia,(t-.12)*5.5)}const $i=t=>{const e=new Uint8ClampedArray(t.mesh.faceCount*3),n=t.mesh.radii.reduce((s,o)=>Math.max(s,o),-1/0),a=Math.max(1e-6,n-t.seaRadius);for(let s=0;s<t.mesh.faceCount;s+=1){const o=(pm(t,s)-t.seaRadius)/a,r=xi(t,t.temperature,s);let i;o<=.002?(i=Fe(gm,fm,.55),r<.16&&(i=Fe(i,qo,(.16-r)*6))):(i=Fe(wm,vm(r),Math.min(1,o*9)),i=Fe(i,bm,Math.max(0,o-.55)*2.2),r<.26&&(i=Fe(i,qo,(.26-r)*4))),e[s*3]=i[0],e[s*3+1]=i[1],e[s*3+2]=i[2]}return{...t,faceColour:e}};function Ti(t,e){const n=new Float32Array(t.length*3),a=new Float32Array(t.length),s=new Float32Array(t.length);t.forEach((r,i)=>{n[i*3]=r.direction[0],n[i*3+1]=r.direction[1],n[i*3+2]=r.direction[2],a[i]=r.radius,s[i]=r.surface});const o=new Uint32Array(e.length*3);return e.forEach(([r,i,l],h)=>{o[h*3]=r,o[h*3+1]=i,o[h*3+2]=l}),{directions:n,radii:a,surface:s,faces:o,faceCount:e.length,vertexCount:t.length}}const km=(t,e)=>(t+e)/2;function xm(t,e,n=km){const a=Array.from({length:t.vertexCount},(i,l)=>({direction:[t.directions[l*3]??0,t.directions[l*3+1]??0,t.directions[l*3+2]??0],radius:t.radii[l]??1,surface:t.surface[l]??0})),s=new Map,o=(i,l)=>{const h=i<l?`${i}:${l}`:`${l}:${i}`,d=s.get(h);if(d!==void 0)return d;const c=a[i],u=a[l],[p,m,f]=c.direction,[y,w,v]=u.direction,b=Math.hypot(p*c.radius-y*u.radius,m*c.radius-w*u.radius,f*c.radius-v*u.radius),[T,I,M]=[(p+y)/2,(m+w)/2,(f+v)/2],k=Math.hypot(T,I,M)||1,A=n(c.surface,u.surface);a.push({direction:[T/k,I/k,M/k],radius:(c.radius+u.radius)/2+e(b),surface:A});const C=a.length-1;return s.set(h,C),C},r=[];for(let i=0;i<t.faceCount;i+=1){const l=t.faces[i*3],h=t.faces[i*3+1],d=t.faces[i*3+2],c=o(l,h),u=o(h,d),p=o(d,l);r.push([l,c,p],[h,u,c],[d,p,u],[c,u,p])}return Ti(a,r)}function $m(t,e){return{...t,mesh:e,temperature:new Float32Array(e.vertexCount),faceColour:new Uint8ClampedArray(e.faceCount*3)}}const Si=(t=4,e=.28,n=.2)=>a=>{const s=Pt(a.seed);let o=a.mesh;const r=Float32Array.from(o.surface,()=>s());o={...o,surface:r};for(let i=0;i<t;i+=1)o=xm(o,l=>l*e*(s()-.5),(l,h)=>{const d=.5+(s()-.5)*(l-h)*n;return Math.min(1,Math.max(0,l*(1-d)+h*d))});return $m(a,o)},Mi=(t=.55)=>e=>{const n=Float32Array.from(e.mesh.radii).sort(),a=Math.min(n.length-1,Math.floor(n.length*t)),s=n[a]??1,o=Float32Array.from(e.mesh.radii,r=>Math.max(r,s));return{...e,mesh:{...e.mesh,radii:o},seaRadius:s}};function Tm(t,e){return Math.abs(t.mesh.directions[e*3+1]??0)}const Ai=({equator:t=1,pole:e=.05,peak:n=0}={})=>a=>{const s=new Float32Array(a.mesh.vertexCount),o=a.mesh.radii,r=o.reduce((h,d)=>Math.min(h,d),1/0),l=o.reduce((h,d)=>Math.max(h,d),-1/0)-r||1;for(let h=0;h<a.mesh.vertexCount;h+=1){const d=((o[h]??1)-r)/l,c=Tm(a,h)**2.2;s[h]=t+(e-t)*c+(n-t)*d}return{...a,temperature:s}},he=(1+Math.sqrt(5))/2,Sm=[[-1,he,0],[1,he,0],[-1,-he,0],[1,-he,0],[0,-1,he],[0,1,he],[0,-1,-he],[0,1,-he],[he,0,-1],[he,0,1],[-he,0,-1],[-he,0,1]],Mm=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];function Am(){const t=Sm.map(([e,n,a])=>{const s=Math.hypot(e,n,a);return{direction:[e/s,n/s,a/s],radius:1,surface:0}});return Ti(t,Mm.map(e=>[...e]))}function Im(t){const e=Am();return{seed:t,mesh:e,temperature:new Float32Array(e.vertexCount),faceColour:new Uint8ClampedArray(e.faceCount*3),seaRadius:0}}const Em=[Si(),Mi(),Ai(),$i];function jm(t,e=Em){return e.reduce((n,a)=>a(n),Im(t))}function Ii(t){return jm(t.seed,[Si(t.levels,t.roughness),Mi(t.share),Ai(),$i])}const zo=.3,Cm=[-.5,.45,.74],Om=1.02;class Ua{size;pixels;depth;view=new Float32Array(0);screen=new Float32Array(0);constructor(e,n=new Uint8ClampedArray(e*e*4)){if(n.length!==e*e*4)throw new Error(`SphereRaster: ${e}×${e} needs ${e*e*4} bytes, not ${n.length}`);this.size=e,this.pixels=n,this.depth=new Float32Array(e*e)}paint(e,n){const{size:a,pixels:s,depth:o}=this;s.fill(0),o.fill(-1/0);const[r,i,l]=Lm(n.light??Cm),h=n.tilt??-.38,d=Math.cos(h),c=Math.sin(h),u=Math.cos(n.rotation),p=Math.sin(n.rotation),{directions:m,radii:f,faces:y,faceCount:w,vertexCount:v}=e.mesh;let b=1;for(let k=0;k<v;k+=1){const A=f[k]??1;A>b&&(b=A)}const T=a/(2*b*Om);this.view.length<v*3&&(this.view=new Float32Array(v*3),this.screen=new Float32Array(v*3));const I=this.view,M=this.screen;for(let k=0;k<v;k+=1){const A=f[k]??1,C=(m[k*3]??0)*A,O=(m[k*3+1]??0)*A,j=(m[k*3+2]??0)*A,S=C*u-j*p,L=C*p+j*u,$=O*d+L*c,E=-O*c+L*d;I[k*3]=S,I[k*3+1]=$,I[k*3+2]=E,M[k*3]=a/2+S*T,M[k*3+1]=a/2-$*T,M[k*3+2]=E}for(let k=0;k<w;k+=1){const A=y[k*3]??0,C=y[k*3+1]??0,O=y[k*3+2]??0,j=M[A*3],S=M[A*3+1],L=M[A*3+2],$=M[C*3],E=M[C*3+1],R=M[C*3+2],D=M[O*3],B=M[O*3+1],H=M[O*3+2],G=($-j)*(B-S)-(E-S)*(D-j);if(G>=0)continue;const $e=I[A*3],z=I[A*3+1],W=I[A*3+2],X=I[C*3]-$e,me=I[C*3+1]-z,Ka=I[C*3+2]-W,Va=I[O*3]-$e,Xa=I[O*3+1]-z,Za=I[O*3+2]-W,Qa=me*Za-Ka*Xa,es=Ka*Va-X*Za,ts=X*Xa-me*Va,Tn=Math.hypot(Qa,es,ts)||1,Di=Qa/Tn*r+es/Tn*i+ts/Tn*l,Sn=zo+(1-zo)*Math.max(0,Di),Hi=(e.faceColour[k*3]??0)*Sn,Wi=(e.faceColour[k*3+1]??0)*Sn,_i=(e.faceColour[k*3+2]??0)*Sn,qi=Math.max(0,Math.floor(Math.min(j,$,D))),zi=Math.min(a-1,Math.ceil(Math.max(j,$,D))),Gi=Math.max(0,Math.floor(Math.min(S,E,B))),Yi=Math.min(a-1,Math.ceil(Math.max(S,E,B)));for(let Rt=Gi;Rt<=Yi;Rt+=1)for(let Ft=qi;Ft<=zi;Ft+=1){const Mn=Ft+.5,An=Rt+.5,Ui=($-j)*(An-S)-(E-S)*(Mn-j),ns=(D-$)*(An-E)-(B-E)*(Mn-$),as=(j-D)*(An-B)-(S-B)*(Mn-D);if(Ui>0||ns>0||as>0)continue;const ss=ns/G,os=as/G,rs=L*ss+R*os+H*(1-ss-os),He=Rt*a+Ft;rs<=o[He]||(o[He]=rs,s[He*4]=Hi,s[He*4+1]=Wi,s[He*4+2]=_i,s[He*4+3]=255)}}return s}}function Lm([t,e,n]){const a=Math.hypot(t,e,n)||1;return[t/a,e/a,n/a]}const Nm=.2,Pm=.36,Rm=[{upTo:20,dark:4,bright:12},{upTo:70,dark:6,bright:14},{upTo:160,dark:2,bright:10},{upTo:198,dark:3,bright:11},{upTo:275,dark:1,bright:9},{upTo:330,dark:5,bright:13},{upTo:360,dark:4,bright:12}];function Fm(t,e,n){const a=Math.max(t,e,n),s=Math.min(t,e,n),o=(a+s)/2/255;if((a===0?0:(a-s)/a)<Nm)return o<.08?0:o<.5?8:o<.8?7:15;const i=a-s;let l;a===t?l=(e-n)/i*60:a===e?l=(2+(n-t)/i)*60:l=(4+(t-e)/i)*60,l<0&&(l+=360);const h=Rm.find(({upTo:d})=>l<d)??{dark:4,bright:12};return o<.08?0:o>=Pm?h.bright:h.dark}function Bm(t,e){const n=(s,o)=>{const r=(o*e+s)*4;return(t[r+3]??0)===0?-1:Fm(t[r]??0,t[r+1]??0,t[r+2]??0)},a=[];for(let s=0;s<e/2;s+=1){const o=[];for(let r=0;r<e;r+=1)o.push({top:n(r,s*2),bottom:n(r,s*2+1)});a.push(o)}return a}const kt=["#000000","#0000aa","#00aa00","#00aaaa","#aa0000","#aa00aa","#aa5500","#aaaaaa","#555555","#5555ff","#55ff55","#55ffff","#ff5555","#ff55ff","#ffff55","#ffffff"];function Dm(t){const e=({top:n,bottom:a})=>n<0&&a<0?"<span> </span>":n<0?`<span style="color:${kt[a]}">▄</span>`:a<0?`<span style="color:${kt[n]}">▀</span>`:n===a?`<span style="color:${kt[n]}">█</span>`:`<span style="color:${kt[n]};background:${kt[a]}">▀</span>`;return t.map(n=>n.map(e).join("")).join(`
`)}const Pa={levels:4,roughness:.28,share:.55},xt=32;let la=null,Go=null,ha=null;function Yo(t,e){const n=document.querySelector('link[rel="icon"]');if(!n)return;la??=Object.assign(document.createElement("canvas"),{width:xt,height:xt});const a=la.getContext("2d");a&&(ha??=a.createImageData(xt,xt),Go??=new Ua(xt,ha.data),Go.paint(t,{rotation:e}),a.putImageData(ha,0,0),n.type="image/png",n.href=la.toDataURL("image/png"))}const Hm=90,Wm=1e3/12,_m=400,ca=new WeakMap;function qm(t){const e=(t.textContent??"").split(`
`);return{columns:Math.max(...e.map(n=>n.length)),rows:e.length}}function Ra(t,e){ca.get(t)?.();const n=e??{...Pa,seed:Math.floor(Math.random()*16777215)},{columns:a,rows:s}=qm(t),o=Math.min(a,s*2),r=Ii(n),i=new Ua(o);t.dataset.seed=String(n.seed),t.title=`World ${n.seed}, ${r.mesh.faceCount.toLocaleString("en")} triangles`;const l=y=>{t.innerHTML=Dm(Bm(i.paint(r,{rotation:y}),o)),t.classList.add("grown")};if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return l(.6),Yo(r,.6),ca.set(t,()=>{}),()=>{};let h=0,d=-1/0,c=-1/0;const u=performance.now(),p=vn(t),m=y=>{const w=(y-u)/1e3/Hm*Math.PI*2;p.onScreen()&&y-d>=Wm&&(l(w),d=y),y-c>_m&&(Yo(r,w),c=y),h=requestAnimationFrame(m)};h=requestAnimationFrame(m);const f=()=>{cancelAnimationFrame(h),p.stop()};return ca.set(t,f),f}function zm(){const t=document.querySelector(".planet");return t?Ra(t,un.saved()??void 0):()=>{}}const Je=360,Gm=60,Ym=1.4,Uo=Math.PI*2/Gm,Jo=Math.PI*4;function Um(t){const e=g("canvas",{class:"world",width:Je,height:Je}),n=e.getContext("2d");if(!n)return()=>{};const a={...Pa,seed:Math.floor(Math.random()*16777215)},s=n.createImageData(Je,Je),o=new Ua(Je,s.data),r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let i,l=.6,h=-.38,d=!r,c=null,u=0,p=performance.now();const m=g("p",{class:"hint"}),f=document.querySelector(".planet"),y=(20*4**Pa.levels).toLocaleString("en"),w=()=>{i=Ii(a);const S=un.saved();m.textContent=`World ${a.seed}: ${i.mesh.faceCount.toLocaleString("en")} triangles. `+(S?`The header is keeping world ${S.seed}, ${(20*4**S.levels).toLocaleString("en")} triangles.`:`The header grows a new one every visit, ${y} triangles each.`),b.hidden=!S,T()},v=g("button",{type:"button",onclick:()=>{un.remember({...a}),f&&Ra(f,{...a}),w()}},"Put it in the header"),b=g("button",{type:"button",hidden:!0,onclick:()=>{un.forget(),f&&Ra(f),w()}},"Let the header grow its own"),T=()=>{o.paint(i,{rotation:l,tilt:h}),n.putImageData(s,0,0)};let I=0;const M=vn(e),k=S=>{const L=Math.min(.1,(S-p)/1e3);if(!c&&M.onScreen()){if(u!==0){u*=Math.exp(-L/Ym);const $=d?Uo:0;(Math.abs(u)<=$||Math.abs(u)<.01)&&(u=0)}u!==0?(l-=u*L,T()):d&&(l+=Uo*L,T()),ja.send({byRadians:u*L,tiltedBy:0,seconds:L})}p=S,I=requestAnimationFrame(k)};e.addEventListener("pointerdown",S=>{c={x:S.clientX,y:S.clientY,at:S.timeStamp},u=0,e.setPointerCapture(S.pointerId)}),e.addEventListener("pointermove",S=>{if(!c)return;const L=e.clientWidth||Je,$=(S.clientX-c.x)/L*Math.PI;l-=$;const E=h;h=Math.max(-1.2,Math.min(1.2,h-(S.clientY-c.y)/L*Math.PI)),ja.send({byRadians:$,tiltedBy:h-E,seconds:0});const R=Math.max(.004,(S.timeStamp-c.at)/1e3);u=Math.max(-Jo,Math.min(Jo,u*.4+$/R*.6)),c={x:S.clientX,y:S.clientY,at:S.timeStamp},T()}),e.addEventListener("pointerup",S=>{c&&S.timeStamp-c.at>120&&(u=0),c=null,p=performance.now()}),e.addEventListener("pointercancel",()=>{c=null,u=0});const A=g("input",{type:"number",min:0,value:a.seed,onchange:()=>{a.seed=Math.max(0,Math.floor(Number(A.value)||0)),w()}}),C=g("button",{type:"button",onclick:()=>{a.seed=Math.floor(Math.random()*16777215),A.value=String(a.seed),w()}},"Another world"),O=g("button",{type:"button",onclick:()=>{d=!d,O.textContent=d?"Hold still":"Turn"}},d?"Hold still":"Turn"),j=(S,L,$,E,R,D)=>{const B=g("output",{},D(a[S])),H=g("input",{type:"range",min:$,max:E,step:R,value:a[S],onchange:()=>{a[S]=Number(H.value),B.textContent=D(a[S]),w()},oninput:()=>{B.textContent=D(Number(H.value))}});return g("label",{},`${L}: `,B,H)};return t.append(e,g("div",{class:"row"},g("span",{},"Seed "),A,C,O,v,b),g("div",{class:"dials"},j("levels","Detail",2,6,1,S=>`${S} splits`),j("roughness","Roughness",.02,1,.01,S=>S.toFixed(2)),j("share","Sea",0,.98,.01,S=>`${Math.round(S*100)}%`)),m),w(),I=requestAnimationFrame(k),()=>{cancelAnimationFrame(I),M.stop()}}const Jm={name:"world",apps:{worlds:Um},install:()=>zm()},Re=[Jm,Ru,ku,Su,ph,$c,dh,mm,zc,jd,Jc,Hu,ql,dd,dc,Ac,Pc,zh,Nh,Kc,wl,Nd,Yd,Xd,lu,fu];function Km(t){return Object.assign({},...t.flatMap(e=>e.programs??[]).map(e=>({[e.name]:ei(e)})),...t.map(e=>e.apps??{}))}const Ko="flags",Vo="flags-chosen",Xo="flags-drawn";function da(t){try{return localStorage.getItem(t)??""}catch{return""}}function ua(t,e){try{e?localStorage.setItem(t,e):localStorage.removeItem(t)}catch{}}class Vm{on;picked;lots;constructor(){this.on=new Set((da(Ko)||document.documentElement.dataset.flags||"").split(" ").filter(Boolean)),this.picked=new Set(da(Vo).split(" ").filter(Boolean));let e={};try{e=JSON.parse(da(Xo)||"{}")}catch{}this.lots=e}isOn(e){return this.on.has(e)}chosen(e){return this.picked.has(e)}drawn(e){return this.lots[e]}set(e,n){this.picked.add(e),delete this.lots[e],this.keep(e,n)}draw(e,n){this.lots[e]=n,this.keep(e,n)}keep(e,n){n?this.on.add(e):this.on.delete(e);const a=[...this.on].join(" ");ua(Ko,a),ua(Vo,[...this.picked].join(" ")),ua(Xo,Object.keys(this.lots).length?JSON.stringify(this.lots):""),a?document.documentElement.dataset.flags=a:delete document.documentElement.dataset.flags}}function Xm(){return[document,navigator].map(e=>e.modelContext).find(e=>typeof e?.registerTool=="function")}function Zo(t,e){const n=[];for(const a of document.querySelectorAll(".app[data-app]")){const s=t[a.dataset.app??""]?.(a,e);s&&n.push(s)}return()=>{for(const a of n)a()}}function Zm(t){const e={},n=t.fields.theme;(n==="dark"||n==="light")&&(e["data-page-theme"]=n);const a=t.fields.sky;return a&&(e["data-sky"]=a),e}const Qm=["data-page-theme","data-sky"];function ep(t,e){return e==="/"?t==="/":t.startsWith(e)}const Ei=7.8,Qo=17,ji=12,tp=8,ma=28,er=44,Ot=8,np=40,ap=16;function sp(t){const e=new Map;for(const b of t.nodes){const T=b.label.split(`
`),I=Math.max(...T.map(M=>M.length),1);e.set(b.id,{id:b.id,label:b.label,real:!0,rank:-1,along:Math.max(40,I*Ei+ji*2),across:T.length*Qo+tp*2,pos:0,preds:[],succs:[]})}for(const b of t.edges)if(!e.has(b.from)||!e.has(b.to))throw new Error(`flow: edge ${b.from} --> ${b.to} names a node that is not there`);const n=op(t),a={...t,edges:t.edges.map((b,T)=>n.has(T)?{...b,from:b.to,to:b.from}:b)};for(const b of a.edges){const T=e.get(b.from),I=e.get(b.to);T.succs.push(I),I.preds.push(T)}rp(e);const s=ip(e,a),o=lp(e);hp(o);const r=o.length,i=o.map(b=>Math.max(Qo,...b.map(T=>T.real?T.across:0))),l=[];let h=Ot;for(let b=0;b<r;b+=1)l.push(h),h+=(i[b]??0)+er;const d=b=>(l[b.rank]??0)+((i[b.rank]??0)-(b.real?b.across:0))/2,c=Math.max(...[...e.values()].map(b=>b.pos+b.along))+Ot,u=h-er+Ot,p=t.direction==="LR",m=(b,T)=>p?[T,b]:[b,T],f=[...e.values()].filter(b=>b.real).map(b=>{const[T,I]=m(b.pos,d(b));return{id:b.id,label:b.label,x:T,y:I,width:p?b.across:b.along,height:p?b.along:b.across}}),y=t.edges.map((b,T)=>{const I=s[T]??[],M=I[0],k=I[I.length-1];if(!M||!k)throw new Error("flow: an edge lost its ends");const A=t.edges.some(L=>L.from===b.to&&L.to===b.from),C=Math.min(np,M.along/3,k.along/3),O=A?n.has(T)?C:-C:0,j=[m(M.pos+M.along/2+O,d(M)+M.across),...I.slice(1,-1).map(L=>m(L.pos+L.along/2,d(L)+(i[L.rank]??0)/2)),m(k.pos+k.along/2+O,d(k))],S=n.has(T)?j.reverse():j;return b.label===void 0?{from:b.from,to:b.to,points:S}:{from:b.from,to:b.to,label:b.label,points:S}}),[w,v]=m(c,u);return{direction:t.direction,width:w,height:v,nodes:f,edges:y}}function op(t){const e=new Set,n=new Map,a=s=>{n.set(s,"walking"),t.edges.forEach((o,r)=>{o.from!==s||e.has(r)||(n.get(o.to)==="walking"?e.add(r):n.has(o.to)||a(o.to))}),n.set(s,"done")};for(const s of t.nodes)n.has(s.id)||a(s.id);return e}function rp(t){const e=new Set,n=a=>{if(a.rank>=0)return a.rank;if(e.has(a))throw new Error(`flow: there is a cycle through ${a.id}, and a flow has a direction`);return e.add(a),a.rank=a.preds.length===0?0:Math.max(...a.preds.map(n))+1,e.delete(a),a.rank};for(const a of t.values())n(a)}function ip(t,e){let n=0;return e.edges.map(a=>{const s=t.get(a.from),o=t.get(a.to);if(!s||!o)return[];const r=[s];let i=s;for(let l=s.rank+1;l<o.rank;l+=1){n+=1;const h={id:`\0${n}`,label:"",real:!1,rank:l,along:Math.max(ap,(a.label?.length??0)*Ei+ji),across:0,pos:0,preds:[i],succs:[]};t.set(h.id,h),i.succs.push(h),r.push(h),i=h}return i!==s&&(i.succs.push(o),o.preds.push(i),s.succs.splice(s.succs.indexOf(o),1),o.preds.splice(o.preds.indexOf(s),1)),r.push(o),r})}function lp(t){const e=Math.max(...[...t.values()].map(r=>r.rank))+1,n=Array.from({length:e},()=>[]);for(const r of t.values())n[r.rank]?.push(r);const a=new Map,s=r=>r.forEach((i,l)=>a.set(i,l));n.forEach(s);const o=(r,i)=>i.length===0?a.get(r)??0:i.reduce((l,h)=>l+(a.get(h)??0),0)/i.length;for(let r=0;r<4;r+=1){for(let i=1;i<e;i+=1){const l=n[i]??[];l.sort((h,d)=>o(h,h.preds)-o(d,d.preds)),s(l)}for(let i=e-2;i>=0;i-=1){const l=n[i]??[];l.sort((h,d)=>o(h,h.succs)-o(d,d.succs)),s(l)}}return n}function hp(t){const e=r=>r.reduce((i,l)=>i+l.along,0)+ma*Math.max(0,r.length-1),n=Math.max(...t.map(e));for(const r of t){let i=Ot+(n-e(r))/2;for(const l of r)l.pos=i,i+=l.along+ma}const a=r=>r.pos+r.along/2,s=(r,i)=>{const l=r.map(c=>{const u=i(c);return u.length===0?a(c):u.reduce((p,m)=>p+a(m),0)/u.length});let h=-1/0;r.forEach((c,u)=>{c.pos=Math.max((l[u]??0)-c.along/2,h),h=c.pos+c.along+ma});const d=r.reduce((c,u,p)=>c+a(u)-(l[p]??0),0)/Math.max(1,r.length);for(const c of r)c.pos-=d};for(let r=0;r<3;r+=1){for(let i=1;i<t.length;i+=1)s(t[i]??[],l=>l.preds);for(let i=t.length-2;i>=0;i-=1)s(t[i]??[],l=>l.succs)}const o=Math.min(...t.flat().map(r=>r.pos));for(const r of t.flat())r.pos+=Ot-o}const Fa=/(\w[\w.-]*)(?:\[([^\]]*)\])?/,cp=new RegExp(`^${Fa.source}\\s*-->(?:\\|([^|]*)\\|)?\\s*${Fa.source}$`),dp=new RegExp(`^${Fa.source}$`),up=/^(?:flow\s+)?(TD|LR)$/i;function mp(t){const e=new Map,n=[];let a="TD";const s=(i,l)=>{i&&(e.has(i)||e.set(i,i),l!==void 0&&e.set(i,l.replace(/\\n/g,`
`)))},o=t.split(`
`);let r=!0;return o.forEach((i,l)=>{const h=i.trim();if(h===""||h.startsWith("%"))return;if(r){r=!1;const u=up.exec(h);if(u){a=u[1]?.toUpperCase()==="LR"?"LR":"TD";return}}const d=cp.exec(h);if(d){const[,u,p,m,f,y]=d;s(u,p),s(f,y),n.push(m===void 0?{from:u??"",to:f??""}:{from:u??"",to:f??"",label:m});return}const c=dp.exec(h);if(c){s(c[1],c[2]);return}throw new Error(`flow: cannot read line ${l+1}: "${h}"`)}),{direction:a,nodes:[...e].map(([i,l])=>({id:i,label:l})),edges:n}}const pp=20,tr=17;function fp(t){let e=5381;for(let n=0;n<t.length;n+=1)e=(e*33^t.charCodeAt(n))>>>0;return e.toString(36)}const K=t=>String(Math.round(t*10)/10);function gp(t,e){const[n,...a]=t.points;if(!n)return"";let s=`M${K(n[0])},${K(n[1])}`,o=n;for(const r of a){const[i,l]=o,[h,d]=r,c=e?[(i+h)/2,l]:[i,(l+d)/2],u=e?[(i+h)/2,d]:[h,(l+d)/2];s+=` C${K(c[0])},${K(c[1])} ${K(u[0])},${K(u[1])} ${K(h)},${K(d)}`,o=r}return s}function wp(t){const{points:e}=t,n=e[Math.floor((e.length-1)/2)]??[0,0],a=e[Math.ceil((e.length-1)/2)]??n;return[(n[0]+a[0])/2,(n[1]+a[1])/2]}function yp(t){const e=sp(mp(t)),n=e.direction==="LR",a=`arrow-${fp(t)}`,s=e.edges.map(l=>{const h=`<path class="edge" d="${gp(l,n)}" marker-end="url(#${a})"/>`;if(l.label===void 0)return h;const[d,c]=wp(l);return`${h}<text class="edge-label" x="${K(d)}" y="${K(c)}" text-anchor="middle" dominant-baseline="middle">${x(l.label)}</text>`}).join(""),o=e.nodes.map(l=>{const h=l.x+l.width/2,d=l.label.split(`
`),c=l.y+(l.height-d.length*tr)/2,u=d.map((p,m)=>`<tspan x="${K(h)}" y="${K(c+pp-8+m*tr)}">${x(p)}</tspan>`).join("");return`<g class="node"><rect x="${K(l.x)}" y="${K(l.y)}" width="${K(l.width)}" height="${K(l.height)}" rx="4"/><text text-anchor="middle" dominant-baseline="middle">${u}</text></g>`}).join(""),r=K(e.width),i=K(e.height);return`<figure class="flow"><svg class="flow" viewBox="0 0 ${r} ${i}" width="${r}" height="${i}" style="max-width: 100%; height: auto" role="img"><defs><marker id="${a}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z"/></marker></defs>${s}${o}</svg></figure>`}const bp=/^---(?:\s+(.*))?$/;function vp(t){const e=[];let n=[];for(const a of t.split(`
`)){const s=bp.exec(a);if(!s){n.push(a);continue}const o=s[1]?.trim()??"",r=/^(red|green)\s/.exec(o)?.[1],i=n.join(`
`);o?e.push({text:i,status:r?{kind:r,text:o.slice(r.length).trim()}:{kind:"note",text:o}}):e.push({text:i}),n=[]}return n.some(a=>a.trim())&&e.push({text:n.join(`
`)}),e}function kp(t,e){const n=vp(t),a=n.map((s,o)=>{const r=s.status?`<p class="slide-status ${s.status.kind}">${x(s.status.text)}</p>`:"";return`<div class="slide${o===n.length-1?" current":""}"><pre><code>${we(s.text,e)}</code></pre>${r}</div>`});return`<figure class="slides" data-language="${x(e)}"><div class="slides-screen">${a.join("")}</div></figure>`}const $t={">=":"≥","<=":"≤","!=":"≠","->":"→","...":"…","*":"·",star:"∗","-":"−","'":"′",cdot:"·",inf:"∞",alpha:"α",beta:"β",gamma:"γ",delta:"δ",epsilon:"ε",lambda:"λ",mu:"μ",pi:"π",sigma:"σ",tau:"τ",phi:"φ",omega:"ω",Delta:"Δ",Sigma:"Σ"},nr={sum:"∑",prod:"∏",int:"∫"},xp=new Set(["max","min","lim","log","ln","sin","cos","exp","arg"]);function $p(t){const e=[],n=/\s+|\.\.\.|>=|<=|!=|->|\d+(?:\.\d+)?|[A-Za-z]+|[{}]|[_^]|./g;for(const[a]of t.matchAll(n))/^\s+$/.test(a)||(a==="{"||a==="}"?e.push({kind:"brace",text:a}):a==="_"||a==="^"?e.push({kind:"script",text:a}):/^\d/.test(a)?e.push({kind:"number",text:a}):/^[A-Za-z]/.test(a)?e.push({kind:"name",text:a}):e.push({kind:"sign",text:a}));return e}function Tp(t){return t.split(`
`).map(e=>e.trim()).filter(Boolean).map(e=>`<math display="block"><mrow>${new Sp($p(e)).expression()}</mrow></math>`).join("")}class Sp{constructor(e){this.tokens=e}tokens;at=0;limits=!1;expression(){let e="";for(;this.at<this.tokens.length&&this.peek()?.text!=="}"&&this.peek()?.text!==")";)e+=this.item();return e}item(){let e=this.atom();const n=this.limits;this.limits=!1;let a=null,s=null;for(;this.peek()?.kind==="script";){const r=this.next().text,i=`<mrow>${this.group()}</mrow>`;r==="_"?a=i:s=i}const o=a&&s?n?"munderover":"msubsup":a?n?"munder":"msub":n?"mover":"msup";return!a&&!s?e:`<${o}>${e}${a??""}${s??""}</${o}>`}atom(){const e=this.next();if(e.kind==="brace"&&e.text==="{"){const n=this.expression();return this.expect("}"),`<mrow>${n}</mrow>`}if(e.text==="("){const n=this.expression();return this.peek()?.text===")"&&(this.at+=1),`<mrow><mo>(</mo>${n}<mo>)</mo></mrow>`}return e.kind==="number"?`<mn>${e.text}</mn>`:e.kind==="name"?e.text==="frac"?`<mfrac><mrow>${this.group()}</mrow><mrow>${this.group()}</mrow></mfrac>`:e.text==="sqrt"?`<msqrt>${this.group()}</msqrt>`:e.text==="text"?`<mtext>${x(this.phrase())}</mtext>`:e.text in nr?(this.limits=!0,`<mo>${nr[e.text]}</mo>`):xp.has(e.text)?`<mo>${e.text}</mo>`:e.text in $t?/^[α-ωΑ-Ω]$/.test($t[e.text])?`<mi>${$t[e.text]}</mi>`:`<mo>${$t[e.text]}</mo>`:`<mi>${x(e.text)}</mi>`:`<mo>${x($t[e.text]??e.text)}</mo>`}group(){if(this.peek()?.text==="{"){this.next();const e=this.expression();return this.expect("}"),e}return this.atom()}phrase(){this.expect("{");const e=[];for(;this.at<this.tokens.length&&this.peek()?.text!=="}";)e.push(this.next().text);return this.expect("}"),e.join(" ")}peek(){return this.tokens[this.at]}next(){const e=this.tokens[this.at];if(!e)throw new Error("the formula ends early");return this.at+=1,e}expect(e){if(this.peek()?.text!==e)throw new Error(`expected ${e} in the formula`);this.at+=1}}function Mp(t,e){const a=/^https?:/.test(e)?' target="_blank" rel="noopener noreferrer"':"",s=/^\d+$/.test(t)?' class="ref"':"";return`<a href="${x(e)}"${a}${s}>${t}</a>`}const Ap=["large","wide","card"];function Ip(t,e,n){const a=n&&Ap.includes(n)?` class="${n}"`:"",s=n==="card"?' loading="lazy"':"";return`<img src="${x(e)}" alt="${x(t)}"${a}${s}>`}const Ep=/(`[^`]+`|!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)|\[[^[\]]+\]\([^)\s]+\))/g,jp=/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/,Cp=/^\[([^[\]]+)\]\(([^)\s]+)\)$/;function Ci(t){return t.split(Ep).map(e=>{if(e.startsWith("`")&&e.endsWith("`")&&e.length>1)return`<code>${x(e.slice(1,-1))}</code>`;const n=jp.exec(e);if(n)return Ip(n[1]??"",n[2]??"",n[3]);const a=Cp.exec(e);return a?Mp(Ci(a[1]??""),a[2]??""):x(e)}).join("")}function Op(t){const e=[];return t.replace(/<code>[\s\S]*?<\/code>/g,a=>`\0${e.push(a)-1}\0`).replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/(^|[^*])\*([^*]+)\*/g,"$1<em>$2</em>").replace(/ {2,}\n/g,"<br>").replace(/\n/g," ").replace(/ -- /g," — ").replace(/\u0000(\d+)\u0000/g,(a,s)=>e[Number(s)]??"")}function xe(t){return Op(Ci(t))}function Lp(t){const e=t.split(`
`).map(p=>p.trim()).filter(Boolean),n=e.find(p=>!p.includes(" :: ")),a=e.filter(p=>p.includes(" :: ")).map(p=>{const m=p.indexOf(" :: ");return{left:p.slice(0,m).trim(),right:p.slice(m+4).trim()}}),s=a.filter(({left:p})=>p.startsWith("=")).map(({left:p,right:m})=>({value:Number(p.slice(1)),name:m})),o=a.filter(({left:p})=>!p.startsWith("=")).map(({left:p,right:m})=>{const[f="",y]=m.split("|").map(v=>v.trim()),w=Number(f.replace(/!$/,"").trim());return{label:p,value:w,shown:y??String(w),marked:f.endsWith("!")}}),r=Math.max(0,...o.map(({value:p})=>p),...s.map(({value:p})=>p))||1,i=p=>(Math.max(0,p)/r).toFixed(3),l=s[0],h=o.map(({label:p,value:m,shown:f,marked:y})=>`<tr${y?' class="marked"':""}><th scope="row">${xe(p)}</th><td><span class="bar" style="--p:${i(m)}"></span><span class="value">${x(f)}</span></td></tr>`).join(""),d=l?` style="--rule:${i(l.value)}"`:"",c=l?` The line is ${x(l.name)}, at ${l.value}.`:"",u=n||l?`<figcaption>${n?xe(n)+".":""}${c}</figcaption>`:"";return`<figure class="bars"><table${d}${l?' class="ruled"':""}><tbody>${h}</tbody></table>${u}</figure>`}function Np(t){return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}const ar=/^(?:[-*]|\d+\.)\s/;function Pp(t,e,n){if(!ar.test(t[0]??""))return!1;const a=e.slice(n).find(s=>s.trim()!=="");return a!==void 0&&ar.test(a)}function Rp(t){const e=[],n=t.replace(/\r\n?/g,`
`).split(`
`);let a=[],s=!1;return n.forEach((o,r)=>{if(o.startsWith("```")){s=!s,a.push(o),s||(e.push(a),a=[]);return}if(!s&&o.trim()===""){if(Pp(a,n,r+1))return;a.length&&e.push(a),a=[];return}a.push(o)}),a.length&&e.push(a),e}function Fp(t){const e=/^(#{1,4})\s+(.*)$/.exec(t[0]??"");if(!e||!t.slice(0,-1).every(o=>/ {2,}$/.test(o)))return null;const a=e[1]?.length??1,s=[e[2]??"",...t.slice(1)].join(`
`);return`<h${a} id="${Np(s)}">${xe(s)}</h${a}>`}function Bp(t){if(!t[0]?.startsWith("```"))return null;const e=t[0].slice(3).trim(),n=t.slice(1,-1).join(`
`);return e==="flow"?yp(n):e==="bars"?Lp(n):e==="math"?Tp(n):e==="slides"||e.startsWith("slides ")?kp(n,e.slice(6).trim()):`<pre><code>${we(n,e)}</code></pre>`}function Dp(t,e){const n=[];for(const a of t)e.test(a)?n.push(a.replace(e,"")):n.length&&(n[n.length-1]+=`
${a.trim()}`);return n}function Hp(t){const e=t[0]??"",n=/^\d+\.\s/.test(e),a=/^[-*]\s/.test(e);if(!n&&!a)return null;const s=n?/^\d+\.\s+/:/^[-*]\s+/;if(!t.every(i=>s.test(i)||/^\s/.test(i)))return null;const o=n?"ol":"ul",r=Dp(t,s).map(i=>`<li>${xe(i)}</li>`).join("");return`<${o}>${r}</${o}>`}function Wp(t){return t.every(n=>n.includes(" :: "))?`<dl>${t.map(n=>{const a=n.indexOf(" :: ");return[n.slice(0,a),n.slice(a+4)]}).map(([n,a])=>`<dt>${xe(n)}</dt><dd>${xe(a)}</dd>`).join("")}</dl>`:null}function _p(t){if(!t.every(n=>n.startsWith(">")))return null;const e=t.map(n=>n.replace(/^>\s?/,"")).join(" ");return`<blockquote>${xe(e)}</blockquote>`}function qp(t){const e=/^::([a-z0-9-]+)((?:\s+--[a-z0-9-]+)*)$/.exec(t[0]??"");if(!e||t.length!==1)return null;const n=(e[2]??"").split(/\s+/).filter(Boolean).map(a=>a.slice(2));return`<div class="app" data-app="${e[1]}"${n.length?` data-dials="${n.join(" ")}"`:""}></div>`}function zp(t){return t.length===1&&/^-{3,}$/.test(t[0]??"")?"<hr>":null}function Gp(t){const e=t.length===1&&/^(\\+)$/.exec(t[0]??"");return e?`<div class="space" style="--n:${e[1]?.length??1}"></div>`:null}function Yp(t){return t.length===1&&/^!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)$/.test(t[0]??"")?`<figure>${xe(t[0]??"")}</figure>`:null}function Up(t){return`<p>${xe(t.join(`
`))}</p>`}const Jp=[zp,Gp,Fp,Bp,_p,qp,Yp,Wp,Hp];function Oi(t){return Rp(t).map(e=>{for(const n of Jp){const a=n(e);if(a!==null)return a}return Up(e)}).join(`
`)}function Ja(t){return t==="/"?"~":`~${t.replace(/\/$/,"")}`}function Li(t,e){return`<p class="ran"><span class="ps1">${x(t)} $</span> ${x(e)}</p>`}function Kp(t,e){const n=t.childrenOf(e.route);if(n.length===0)return"";const a=n.map(s=>`<li><a class="entry" href="${s.route}"><code>${x(s.name)}${s.link?"@":"/"}</code><span class="title">${x(s.title)}</span>`+(s.summary?`<span class="summary">${x(s.summary)}</span>`:"")+"</a></li>").join("");return`${Li(Ja(e.route),"ls")}
<ul class="listing">${a}</ul>`}function Vp(t,e){const n=t.trailTo(e.route).slice(1).map(a=>a.name).join("/");return Li("~",n?`cd ${n} && cat README.md`:"cat README.md")}function Xp(t,e){return`${Vp(t,e)}
${Oi(e.body)}
${Kp(t,e)}`}function Zp(t,e){const n=document.querySelector("main");if(!n)return()=>!1;const a=(s,{push:o=!0,keep:r=!1}={})=>{const i=t.at(s);if(!i)return!1;r||(n.innerHTML=Xp(t,i));const l=Zm(i);for(const h of Qm){const d=l[h];d?document.documentElement.setAttribute(h,d):document.documentElement.removeAttribute(h)}document.title=i.route==="/"?"David Rodenas":`${i.title} — David Rodenas`;for(const h of document.querySelectorAll("nav .navlink"))ep(s,h.getAttribute("href")??"\0")?h.setAttribute("aria-current","page"):h.removeAttribute("aria-current");return o&&(s===window.location.pathname?window.history.replaceState({route:s},"",s):window.history.pushState({route:s},"",s),r||window.scrollTo({top:0})),window.goatcounter?.count?.({path:s,title:document.title}),e(i,r),!0};return document.addEventListener("click",s=>{if(s.defaultPrevented||s.button!==0||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey)return;const o=s.target?.closest("a[href]");if(!o||o.target||o.dataset.run)return;const r=new URL(o.href,window.location.href);if(r.origin!==window.location.origin)return;const i=r.pathname.endsWith("/")?r.pathname:`${r.pathname}/`;t.at(i)&&(s.preventDefault(),i!==window.location.pathname&&a(i))}),window.addEventListener("popstate",()=>{const s=window.location.pathname.endsWith("/")?window.location.pathname:`${window.location.pathname}/`;a(s,{push:!1})}),a}function Qp(t,e){let n=0;for(;n<t.length&&n<e.length&&t[n]===e[n];)n+=1;let a=0;for(;a<t.length-n&&a<e.length-n&&t[t.length-1-a]===e[e.length-1-a];)a+=1;const s=t.slice(0,n),o=t.slice(t.length-a),r=t.slice(n,t.length-a),i=e.slice(n,e.length-a),l=[];for(let h=r.length-1;h>=0;h-=1)l.push({text:s+r.slice(0,h)+o,caret:n+h});for(let h=1;h<=i.length;h+=1)l.push({text:s+i.slice(0,h)+o,caret:n+h});return l}const ef=32,tf=14,nf=450,af=1900,sf=1300;function of(t){const e=[];let n="";for(const a of t){for(const s of Qp(n,a.text))e.push({...s,hold:s.text.length<n.length?tf:ef}),n=s.text;n=a.text,a.status?e.push({text:n,hold:nf},{text:n,status:a.status,hold:af}):e.push({text:n,hold:sf})}return e}function rf(t){return[...t.querySelectorAll(".slide:not(.live)")].map(e=>{const n=e.querySelector("code")?.textContent??"",a=e.querySelector(".slide-status"),s=["red","green","note"].find(o=>a?.classList.contains(o));return a&&s?{text:n,status:{kind:s,text:a.textContent??""}}:{text:n}})}function lf(t){const e=t.dataset.language??"",n=rf(t),a=g("code"),s=g("p",{class:"slide-status",hidden:!0}),o=g("div",{class:"slide live"},g("pre",{},a),s),r=h=>{a.innerHTML=h.caret===void 0?we(h.text,e):`${we(h.text.slice(0,h.caret),e)}<span class="caret"></span>${we(h.text.slice(h.caret),e)}`,s.hidden=!h.status,h.status&&(s.className=`slide-status ${h.status.kind}`,s.textContent=h.status.text)},l=fi(t,()=>{o.isConnected||t.querySelector(".slides-screen")?.append(o),t.classList.add("playing");const h=of(n);let d=0;return()=>{const c=h[d++];return c?(r(c),c.hold):null}});return()=>{l(),o.remove(),t.classList.remove("playing")}}function sr(t){const e=[...t.querySelectorAll("figure.slides")].map(lf);return()=>{for(const n of e)n()}}class hf{typed=[];drafts=[];index=0;get lines(){return this.typed}add(e){this.typed.push(e),this.drafts=[...this.typed,""],this.index=this.typed.length}previous(e){return this.moveTo(this.index-1,e)}next(e){return this.moveTo(this.index+1,e)}moveTo(e,n){return this.drafts.length===0&&(this.drafts=[""]),e<0||e>=this.drafts.length?n:(this.drafts[this.index]=n,this.index=e,this.drafts[e]??n)}}function cf(t,e,n,a){if(t==="k"){const s=e.slice(n);return{line:e.slice(0,n),caret:n,killed:s||a}}if(t==="u"){const s=e.slice(0,n);return{line:e.slice(n),caret:0,killed:s||a}}return t==="y"?{line:e.slice(0,n)+a+e.slice(n),caret:n+a.length,killed:a}:null}function Ni(t){return t.split(/\s*(?:;|&&)\s*/).map(e=>e.trim().split(/\s+/).filter(Boolean)).filter(e=>e.length>0)}function De(t,e){const a=e.startsWith("~")||e.startsWith("/")?[]:t.split("/").filter(Boolean),s=e.replace(/^~/,"").split("/").filter(Boolean),o=[...a];for(const r of s)r!=="."&&(r===".."?o.pop():o.push(r));return o.length===0?"/":`/${o.join("/")}/`}function df(t){return t.replace(/(?:^|\/)(?:README\.md|\*)$/,"")||"."}const uf={name:"cat",usage:"cat <file>",description:"print a page, README.md or * for the one here",run({site:t,cwd:e},[n]){if(!n)return{text:"cat: usage: cat <file>",error:!0};const a=De(e,df(n)),s=t.at(a);return!s||/\.md$/.test(n)!==/README\.md$/.test(n)?{text:`cat: ${n}: no such file`,error:!0}:{html:Oi(s.body),at:s.route}}},mf={name:"cd",usage:"cd [dir]",description:"go to a directory (the address follows)",run(t,[e="~"]){const n=De(t.cwd,e),a=t.site.at(n);return a?(t.cwd=a.route,{at:a.route}):{text:`cd: ${e}: no such directory`,error:!0}}},pf={name:"clear",usage:"clear",description:"clear what the shell has printed",run(){return{clear:!0}}},ff={name:"find",usage:"find [path] [word]",description:"every page under a directory; with a word, only those it is in the name or title of",run({site:t,cwd:e},n){const[a,s]=n,o=a!==void 0&&(a==="."||a.includes("/")||t.at(De(e,a))!==void 0),r=o?a??".":".",i=(o?s:a)?.toLowerCase(),l=De(e,r);if(!t.at(l))return{text:`find: ${r}: no such directory`,error:!0};const h=m=>t.childrenOf(m).filter(f=>!f.link).flatMap(f=>[f,...h(f.route)]),c=[t.at(l),...h(l)].filter(m=>!i||m.route.toLowerCase().includes(i)||m.title.toLowerCase().includes(i));if(c.length===0)return{text:`find: nothing under ${r}${i?` with "${i}" in it`:""}`};const u=Math.max(...c.map(m=>m.route.length)),p=m=>" ".repeat(u-m.route.length);return{text:c.map(m=>`${m.route}${p(m)}  # ${m.title}`).join(`
`),html:`<pre class="listing">${c.map(m=>`<span class="line"><a href="${x(m.route)}">${x(m.route)}</a>${p(m)}<span class="hint">  # ${x(m.title)}</span></span>`).join("")}</pre>`}}},pa=40,gf=t=>t.replace(/\]\([^)]*\)/g,"]").replace(/[#*_`>\[\]]/g,"").trim(),wf={name:"grep",usage:"grep <word> [path]",description:"the lines of every page under a directory that say a word",run({site:t,cwd:e},[n,a="."]){if(!n)return{text:"grep: usage: grep <word> [path]",error:!0};const s=De(e,a);if(!t.at(s))return{text:`grep: ${a}: no such directory`,error:!0};const o=n.toLowerCase(),r=t.pages.filter(d=>d.route.startsWith(s)).flatMap(d=>d.body.split(`
`).map((c,u)=>({page:d,number:u+1,line:gf(c)})).filter(({line:c})=>c.toLowerCase().includes(o)));if(r.length===0)return{text:`grep: no page under ${a} says "${n}"`};const i=r.slice(0,pa),l=r.length>pa?[`… and ${r.length-pa} more. Give grep a directory to look in.`]:[],h=d=>x(d).replace(new RegExp(x(n).replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"ig"),c=>`<mark>${c}</mark>`);return{text:[...i.map(({page:d,number:c,line:u})=>`${d.route}:${c}: ${u}`),...l].join(`
`),html:`<pre class="listing wrap">${[...i.map(({page:d,number:c,line:u})=>`<span class="line"><a href="${x(d.route)}">${x(d.route)}</a>:${c}: <span class="hint">${h(u)}</span></span>`),...l.map(d=>`<span class="line">${x(d)}</span>`)].join("")}</pre>`}}},yf={name:"help",usage:"help [command]",description:"this",run({commands:t},[e]){if(e){const r=t.find(i=>i.name===e);return r?{text:`${r.usage}
  ${r.description}`}:{text:`help: ${e}: no such command`,error:!0}}const n=Math.max(...t.map(r=>r.usage.length)),a=t.map(r=>`${r.usage.padEnd(n)}  ${r.description}`),s="Tab completes; → takes the grey suggestion. ↑↓ recall. ^K kills to the end of the line, ^U back to the start, ^Y puts it back.",o=t.map(r=>`<dt><a href="#" data-run="help ${r.name}">${x(r.usage)}</a></dt><dd>${x(r.description)}</dd>`).join("");return{text:["Commands:",...a,"",s].join(`
`),html:`<p>Commands:</p><dl class="help">${o}</dl><p>${x(s)}</p>`}}};function bf(t){const e=t.filter(a=>a.startsWith("-")).flatMap(a=>a.slice(1).split("")),n=t.find(a=>!a.startsWith("-"))??".";return{flags:e,path:n}}function vf(t,e,n,a){const s=a==="."?"":`${a.replace(/\/$/,"")}/`;return[...e?[{mode:"dr-x",name:"..",title:e.title,summary:e.summary,href:e.route,run:`cd ${s}..`}]:[],{mode:"--r-",name:"README.md",title:t.title,summary:t.summary,href:t.route,run:`cat ${s}README.md`},...n.map(o=>o.link?{mode:"lr-x",name:`${o.name}@`,title:`-> ${o.route}  ${o.title}`,summary:o.summary,href:o.route}:{mode:"dr-x",name:`${o.name}/`,title:o.title,summary:o.summary,href:o.route})]}function or(t){const e=t.run?` data-run="${x(t.run)}"`:"";return`<a href="${x(t.href)}"${e}>${x(t.name)}</a>`}function kf(t,e){const n=Math.max(...t.map(i=>i.name.length)),a=i=>" ".repeat(n-i.length),s=i=>e?`${i.mode}  ${i.name}${a(i.name)}  ${i.title}${i.summary?` — ${i.summary}`:""}`:`${i.name}${a(i.name)}  # ${i.title}`,o=i=>e?`<span class="line">${i.mode}  ${or(i)}${a(i.name)}  ${x(i.title)}${i.summary?`<span class="hint"> — ${x(i.summary)}</span>`:""}</span>`:`<span class="line">${or(i)}${a(i.name)}<span class="hint">  # ${x(i.title)}</span></span>`,r=e?[`total ${t.length}`]:[];return{text:[...r,...t.map(s)].join(`
`),html:`<pre class="listing">${[...r.map(i=>`<span class="line">${i}</span>`),...t.map(o)].join("")}</pre>`}}const xf={name:"ls",usage:"ls [-lnr] [path]",description:"what a directory holds, in the site's own order; -l says more, -n sorts by name, -r reverses",run({site:t,cwd:e},n){const{flags:a,path:s}=bf(n),o=a.find(d=>!["l","n","r"].includes(d));if(o)return{text:`ls: -${o}: no such option. Try ls -l, -n by name, -r reversed`,error:!0};const r=De(e,s),i=t.at(r);if(!i)return{text:`ls: ${s}: no such directory`,error:!0};const l=i.parent===null?void 0:t.at(i.parent),h=[...t.childrenOf(r)];return a.includes("n")&&h.sort((d,c)=>d.name.localeCompare(c.name)),a.includes("r")&&h.reverse(),kf(vf(i,l,h,s),a.includes("l"))}},$f={name:"pwd",usage:"pwd",description:"print where you are",run({cwd:t}){return{text:Ja(t)}}},Pi=[xf,mf,uf,ff,wf,$f,yf,pf];class Tf{context;constructor(e,n,a=Pi){this.context={site:e,cwd:n,commands:a}}get prompt(){return`${Ja(this.context.cwd)} $`}moveTo(e){return this.context.site.at(e)?(this.context.cwd=e,!0):!1}run(e){const n=[];for(const[a="",...s]of Ni(e)){const o=this.context.commands.find(i=>i.name===a),r=o?o.run(this.context,s):{text:`${a}: command not found. Try help`,error:!0};if(n.push(r),r.error)break}return n}complete(e){const n=e.split(/\s+/),a=n.pop()??"",s=n.length===0?"":`${n.join(" ")} `;return(n.length===0?this.commandNames():this.pathNames(a)).filter(r=>r.startsWith(a)).map(r=>s+r)}commandNames(){return this.context.commands.map(e=>e.name).sort()}pathNames(e){const n=e.lastIndexOf("/"),a=n<0?".":e.slice(0,n+1),s=De(this.context.cwd,a);if(!this.context.site.at(s))return[];const o=n<0?"":a;return["README.md",...this.context.site.childrenOf(s).map(i=>`${i.name}/`)].map(i=>o+i)}}function Sf(t,e,n){if(t==="")return"help";const s=[...[...e].reverse(),...n].find(o=>o.startsWith(t)&&o!==t);return s?s.slice(t.length):""}function Mf(t){if(t.length===0)return null;const e=[];let n="";for(const a of t)a==="Enter"?(e.push(n),n=""):a==="Backspace"?n=n.slice(0,-1):n+=a;return{finished:e,unfinished:n}}const fa="shell-pending",rr={carry(t){try{t&&sessionStorage.setItem(fa,t)}catch{}},take(){try{const t=sessionStorage.getItem(fa)??"";return sessionStorage.removeItem(fa),t}catch{return""}}};function Af(){window.__stopTyped?.();const t=window.__typed??[];return window.__typed=[],Mf(t)}function If(t,e,n={}){const a=document.querySelector(".terminal"),s=document.querySelector(".screen"),o=a?.querySelector("form.prompt"),r=o?.querySelector("input"),i=o?.querySelector(".line"),l=o?.querySelector(".suggest"),h=o?.querySelector(".ps1"),d=document.querySelector(".ran.end"),c=d?.querySelector(".ps1"),u=d?.querySelector(".line"),p=d?.querySelector(".typed");if(!a||!s||!o||!r||!i||!l||!h||!d||!c||!u||!p)return null;const m=()=>{h.textContent=f.prompt,c.textContent=f.prompt},f=new Tf(t,e,n.commands),y=new hf;let w=null;const v=$=>{s.append($)},b=()=>{w?.remove(),w=null},T=()=>{const $=r.selectionStart??r.value.length;i.style.setProperty("--caret",String($)),i.style.setProperty("--typed",String(r.value.length)),p.textContent=r.value,u.style.setProperty("--caret",String($)),l.textContent=$===r.value.length?Sf(r.value,y.lines,f.complete(r.value)):""},I=($,E=$.length)=>{r.value=$,r.setSelectionRange(E,E),T()},M=$=>{if($.clear&&(s.replaceChildren(),n.clearPage?.()),$.html){const E=g("div",{class:$.text?"listing-out":"cat"});E.innerHTML=$.html,v(E)}else $.text&&v(g("pre",{class:$.error?"error":""},$.text))},k=$=>{b();const E=[],R=g("p",{class:"echo"},g("span",{class:"ps1"},f.prompt),` ${$}`);v(R);let D=!1;const B=Ni($).map(H=>H.join(" "));for(let H=0;H<B.length;H+=1){n.heard?.((B[H]??"").split(" ")[0]??"");const[G]=f.run(B[H]??"");if(G){if(E.push(G),M(G),G.html&&!G.text&&(D=!0),G.at&&!n.moveTo?.(G.at))return rr.carry(B.slice(H+1).join(" && ")),window.location.assign(G.at),E;if(G.error)break}}return m(),T(),D?R.scrollIntoView({block:"start"}):window.scrollTo({top:document.documentElement.scrollHeight}),E},A=()=>{if(b(),r.value.trim()===""){I("help");return}const $=f.complete(r.value);$.length===1?I($[0]??r.value):$.length>1&&(w=g("p",{class:"hint"},$.map(E=>E.split(" ").pop()).join("  ")),o.insertAdjacentElement("afterend",w),window.scrollTo({top:document.documentElement.scrollHeight}))};o.addEventListener("submit",$=>{$.preventDefault();const E=r.value.trim();I(""),E&&(y.add(E),k(E))});let C="";r.addEventListener("keydown",$=>{if($.key==="Tab")$.preventDefault(),A();else if($.key==="ArrowUp")$.preventDefault(),I(y.previous(r.value));else if($.key==="ArrowDown")$.preventDefault(),I(y.next(r.value));else if($.key==="ArrowRight"&&r.selectionStart===r.value.length&&l.textContent)$.preventDefault(),I(r.value+l.textContent);else if($.ctrlKey&&!$.metaKey&&!$.altKey){const E=cf($.key,r.value,r.selectionStart??r.value.length,C);if(!E)return;$.preventDefault(),b(),I(E.line,E.caret),C=E.killed}else b()});for(const $ of["input","keyup","click","focus","select"])r.addEventListener($,T);let O=!0;r.addEventListener("input",()=>{O&&r.value!==""&&window.scrollTo({top:document.documentElement.scrollHeight}),O=r.value===""}),document.addEventListener("selectionchange",()=>{document.activeElement===r&&T()}),s.addEventListener("click",$=>{const E=$.target?.closest("a[data-run]");E?.dataset.run&&($.preventDefault(),k(E.dataset.run))}),window.addEventListener("keydown",$=>{const R=$.target?.matches("input, textarea, select, [contenteditable]")??!1,D=$.key.length===1&&!$.ctrlKey&&!$.metaKey&&!$.altKey;R||!D||r.focus({preventScroll:!1})}),o.addEventListener("click",()=>r.focus()),d.addEventListener("click",()=>r.focus()),T();const j=rr.take();j&&k(j);const S=Af();if(S){for(const $ of S.finished)$.trim()&&(y.add($.trim()),k($.trim()));I(S.unfinished),r.focus()}return{run:k,moveTo:$=>{f.moveTo($)&&(s.replaceChildren(),m(),T())}}}function Ef(t,e){return t.pages.find(n=>n.body.split(`
`).some(a=>a.trim()===`::${e}`))}function jf(t){const e=`${t.label}: ${t.description}`;return"choices"in t?{type:"string",enum:t.choices,default:t.initial,description:e}:{type:"number",minimum:t.min,maximum:t.max,default:t.initial,description:e}}function Cf(t){return{type:"object",properties:Object.fromEntries(t.parameters.map(n=>[n.name,jf(n)])),required:[],additionalProperties:!1}}const Ri=t=>t.length<2?t.join(""):`${t.slice(0,-1).join(", ")} or ${t.at(-1)}`;function Of(t,e){if("choices"in t){if(e===void 0)return{value:t.initial};const a=et(String(e)),s=t.choices.find(o=>et(o)===a);return s===void 0?{error:`${t.name}: ${String(e)} is not one of ${Ri(t.choices.map(et))}`}:{value:s}}const n=e===void 0?t.initial:typeof e=="number"?e:typeof e=="string"&&e.trim()!==""?Number(e):Number.NaN;return Number.isFinite(n)?n<t.min||n>t.max?{error:`${t.name}: ${n} is outside ${t.min} to ${t.max}`}:{value:n}:{error:`${t.name}: ${String(e)} is not a number`}}function Fi(t,e){const n=t.parameters.map(o=>o.name),a=Object.keys(e).find(o=>!n.includes(o));if(a!==void 0)return{error:`no option ${a}: choose ${Ri(n)}`};const s={};for(const o of t.parameters){const r=Of(o,e[o.name]);if("error"in r)return r;s[o.name]=r.value}return{values:s}}const Lf={amp:"&",lt:"<",gt:">",quot:'"',"#39":"'",nbsp:" "};function Nf(t){return t.text?t.text:t.html?t.html.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g,"").replace(/<\/(p|h[1-6]|li|tr|div|pre|dt|dd|figcaption|blockquote)>|<br\s*\/?>/g,`
`).replace(/<[^>]+>/g,"").replace(/&(amp|lt|gt|quot|#39|nbsp);/g,(e,n)=>Lf[n]??"").split(`
`).map(e=>e.replace(/\s+/g," ").trim()).filter(Boolean).join(`
`):""}const Bi=t=>`Refused, nothing was run: ${t}`;function Pf(t,{site:e,goTo:n}){const a=`.app[data-app="${t}"]`,s=document.querySelector(a);if(s)return s;const o=Ef(e,t);return!o||!n(o.route)?null:document.querySelector(a)}function Rf(t,e){return{name:t.name,description:`${t.summary}. The reader sees it too: the site goes to the program's page and its dials move to what was asked. Answers in words, then the figures as JSON.`,inputSchema:Cf(t),annotations:{readOnlyHint:!0},async execute(n){const a=Fi(t,n);if("error"in a)return Bi(a.error);const s=t.run(a.values);return Ff(t.name,a.values,e),`${s.text}

${JSON.stringify(s.data)}`}}}function Ff(t,e,n){const a=Pf(t,n);a&&($a(a,e),a.scrollIntoView?.({behavior:"smooth",block:"start"}))}function Bf({run:t,programs:e}){return{name:"shell",description:`Runs a line at this site's prompt, as if the reader had typed it, and they see it echoed and answered. The site is laid out as directories of pages: ls, cd, cat README.md, find, grep and help work over it, and so does every program: ${e.map(n=>n.name).join(", ")}. Commands chain with &&.`,inputSchema:{type:"object",properties:{line:{type:"string",description:"the line to run, e.g. `cd projects && ls`"}},required:["line"],additionalProperties:!1},async execute(n){const a=t(String(n.line??"")),s=a.map(Nf).filter(Boolean).join(`

`);return a.some(o=>o.error)?Bi(s):s}}}function Df(t,e){if(!t)return()=>{};const n=new AbortController,a=[...e.programs.map(s=>Rf(s,e)),Bf(e)];for(const s of a)t.registerTool(s,{signal:n.signal});return()=>{n.abort();for(const s of a)t.unregisterTool?.(s.name)}}const Hf=[{file:"book/index.md",markdown:`---
title: The Emotional and Technical Guide to Rescue Stalled Software
summary: Never rewrite. Never stop delivery. A book about rescuing stalled software, 2024, 156 pages.
order: 10
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
`},{file:"craft/a-sentence-is-a-step.md",markdown:`---
title: A sentence is a step
summary: In my course the post came first, and my students got stuck on the expressions that tie each of its sentences to code — so a sentence became the name of its code. The idea, running, and where it went after the course.
order: 3
was: /craft/the-post-is-the-test/
---

# A sentence is a step,  
named by its own words.

A behaviour test written in plain sentences needs, for every sentence, a
piece of code that knows what to do with it, and the usual way to find that
piece is a pattern — a regular expression, or a Cucumber expression — written
to match the sentence. That is where my
students got stuck: on the expressions, and on naming the functions behind
the steps.

So the course's platform stopped matching sentences, and read them instead.
Every word goes into the name of a method; a quoted string becomes an
argument and an \`S\` in the name, a number an argument and an \`N\`. There is
nothing to match, because the sentence is the name. In that course [the post
came first](/teaching/software-lab/) and was the test, and each of its
sentences a step: write one, a step a line, and see what it becomes:

::step-names

The test is the same for the server and for the client, one call a step,
with the step's sentence beside it — so a line that fails says, in the student's own
words, what did not happen. What is left to write are the methods at the
bottom, and writing them is the work. The rest of that course is in [its own
page](/teaching/software-lab/).

## Where it went

The idea went through several versions in the course, and then out of it, as
[Gherkin Genie](https://github.com/drpicox/gherkin-genie): the same reading of
sentences, for Gherkin and for any test runner, with no regular expressions at
all. A missing step is printed as the method to paste in, already named.
Later it was adapted once more, for the tests of a product at work.

Here it is with the example of its own README: a feature about cucumbers, and
the steps with one method written. Genie prints the two still missing; paste
them into the steps, fill them in, and the scenario runs.

::gherkin-genie

Genie reads a feature with Cucumber's own parser; the page reads a part of
Gherkin — scenarios, a background, steps, tables and doc strings — with a few
lines of its own, and names each step by Genie's own rules.
`},{file:"craft/a-test-is-an-example.md",markdown:`---
title: A test is an example
summary: One of the first essays I published was about this — a test that reads like the documentation of what it tests survives a refactor, and tests that look inside can pass over a bug. The same tests, run here against three dispatchers.
order: 2
---

# A test  
is an example  
of use.

One of the first essays I published, in 2018, has an example that begins with
two tests of a dispatcher that pass, cover every line of it, and say almost
nothing: they look at its \`_queue\`, a part meant to be private. It ends with
one test written the way the dispatcher would be documented — add a listener,
deliver a message, the listener gets it.

Here are the three, run against a dispatcher they all pass, against the same
dispatcher refactored, and against one with a bug in it. Choose one:

::tests-as-examples

Refactored, nothing a user of the dispatcher could see has changed, and the
two tests that looked inside break anyway. With the bug, both of them stay
green: each checks its own half against \`_queue\`, and the bug is where the
halves meet. Only the one that reads like documentation is right both times.
In Kent Beck's words: [“Tests should be coupled to the behavior of code and
decoupled from the structure of code.”](https://x.com/KentBeck/status/1182714083230904320)

So I write tests the way the thing would be explained to someone about to
use it, and a test is also the example that someone can copy. Three of the
rules I ended that essay with still hold:

- “Never use ‘private’ properties in testing code.”
- “Test functionalities, not functions/methods.”
- “Verify that testing code should be copy-pasteable to new production code.”

The essay is [Why you should start writing tests as they were
documentation](https://medium.com/p/73a356df3523).
`},{file:"craft/architecture.md",markdown:`---
link: /projects/architecture/
order: 12
---
`},{file:"craft/index.md",markdown:`---
title: The craft
summary: How I work, and how I think about it — in the code, with others, and behind it all. Each line runs here, or has the essays where I argued it.
order: 35
was: /craft/writing/
---

# One small step,  
and the code  
works again.

That is the mantra I try to keep with every change, and the rest of how I
work grows from it. The links go to where each line runs, here; the numbers,
to the essays where I argued it.

## In the code

**Small, safe steps, always.** Not only when testing: it is how I make any
change, in steps small enough to check one by one, so that the code is never
more than a step away from working: a test that fails is put right before the
next step is taken.
[[1](https://medium.com/p/1d28b3a78b08), [2](https://medium.com/p/8582157a2953), [3](https://medium.com/p/264b61d489f8)]

::small-steps

**A test first, and seen failing.** A test that has never failed has not yet
shown that it can. At the end of the kata the perfect game passes the moment
it is written, so it is made to fail once, and only then gets its 300 back.
[[1](https://medium.com/p/6813582074f3), [2](https://medium.com/p/dfaf65024d9)]

\`\`\`slides js
test("perfect game", () => {
  rollMany(12, 10);
  expect(g.score()).toBe(300);
});
--- green All tests pass.
test("perfect game", () => {
  rollMany(12, 10);
  expect(g.score()).toBe("fail");
});
--- red Expected: "fail". Received: 300.
test("perfect game", () => {
  rollMany(12, 10);
  expect(g.score()).toBe(300);
});
--- green All tests pass.
\`\`\`

**A test is an example of use.** I write it the way I would explain the code
to someone about to use it. Then it survives a refactor, and it catches the bug
that the tests looking inside sleep through: [an
example](/craft/a-test-is-an-example/) shows it.
[[1](https://medium.com/p/73a356df3523), [2](https://medium.com/p/54c509852ab8), [3](https://medium.com/p/4a83e4012b17)]

\`\`\`slides js
it("delivers messages to listeners", () => {
  dispatcher.addListener(cb);
  dispatcher.deliver("message");
  expect(cb).toHaveBeenCalledWith("message");
});
--- green All tests pass.
\`\`\`

**The need comes first, in its own words.** A feature starts as the words of
whoever needs it — in my course, [the post came first](/teaching/software-lab/)
— and [each sentence becomes a step](/craft/a-sentence-is-a-step/) of its test.
[[1](https://medium.com/p/788421126b13), [2](https://medium.com/p/301eddc7e566)]

\`\`\`slides
* The last post title should be "Hello Blog", this post
---
* The last post title should be "Hello Blog", this post
context.theLastPostTitleShouldBeSThisPost("Hello Blog");
\`\`\`

**Clean as I go.** Before a change, where it will land; while I make it; and
once more when it is done, for whoever reads it next. Not as a phase saved for
the end, and never by starting again: when the design is wrong, I move the code
towards the right one a little with every change. Kent Beck put the first part
in one line: [make the change easy (warning: this may be hard), then make the
easy change](https://x.com/KentBeck/status/250733358307500032). [The
book](/book/) is the rest, whole.
[[1](https://medium.com/p/f678a10ac1fa), [2](https://medium.com/p/24e3408767dc), [3](https://medium.com/p/a37d8d11be9c)]

\`\`\`slides js
score += rolls[frameIndex]+rolls[frameIndex + 1];
--- green All tests pass.
score += sumOfBallsInFrame(rolls, frameIndex);
--- green All tests pass.
\`\`\`

**I build the tools.** When a part of the work can be done by a program, I
write the program, so that nothing starts from scratch: [a compiler from posts
to tests](/teaching/software-lab/), [a reader of Gherkin that names its own
steps](/craft/a-sentence-is-a-step/), graders that read a repository's history,
[koans](https://github.com/drpicox/learn-javascript-bytesting-jest), and [a game
of passing a test in the fewest keystrokes](https://david-rodenas.com/test-putter/).
[[1](https://medium.com/p/d4e6be5e7ef1), [2](https://medium.com/p/c7b59f00eefe), [3](https://medium.com/p/a824a05b7273)]

\`\`\`slides
Given I have 12 cucumbers
---
Given I have 12 cucumbers
givenIHaveNCucumbers(number1)
\`\`\`

## With others

**Pairing is the better code review.** It never stops, I often use it to bring
beginners up to speed, and it leaves nobody indispensable — and nobody should
be, not even an AI. On the critical parts that all of us will work on later, I
would rather we mob, test first.
[[1](https://medium.com/p/eddf750ba19b), [2](https://medium.com/p/f6e1fa82ee1), [3](https://medium.com/p/b3f6fcbc3b95)]

> If they find any problem, it’s been written for only a few seconds;
> therefore, it can be changed instantly.

**Help is a smaller step, not the answer.** When someone asks me for help, I
often keep the solution to myself and propose trying again in steps so small
that the way becomes plain. It looks simple, and it takes practice; that is what
[katas](/craft/kata/) are for. [[1](https://medium.com/p/264b61d489f8)]

\`\`\`slides js
function add(a, b) {
  return 11;
}
--- green All tests pass.
function add(a, b) {
  return 0+11;
}
--- green All tests pass.
function add(a, b) {
  return 7+4;
}
--- green All tests pass.
function add(a, b) {
  return a + 4;
}
--- green All tests pass.
function add(a, b) {
  return a + b;
}
--- green All tests pass.
\`\`\`

**Curious before right.** In a review I try to understand why the author did
it, and ask with genuine curiosity. A comment should block a merge only when
the product is at risk; the rest can wait for a later change, or for the whole
team, on a Friday.
[[1](https://medium.com/p/206be5c44a92), [2](https://medium.com/p/f6e1fa82ee1)]

> “Why did you put this variable here?” — or — “I have seen this variable
> here, I tried to understand how is it here, but I failed, what I am missing?”

**Change the environment, not the people.** The environment changes us, so a
rule that matters goes into the code, where it holds for a person and for an
agent alike, rather than into a guide: [this site](/projects/architecture/) is
built that way. And a change to how we work is an experiment, with a date to
look back at it together.
[[1](https://medium.com/p/834692848569), [2](https://medium.com/p/70a3c6cb4e45), [3](https://medium.com/p/9e94fba6beb3)]

\`\`\`slides js
it("has no boxes that need each other round in a circle", () => {
  expect(boxCycles(shipped)).toEqual([]);
});
--- green All tests pass.
\`\`\`

**The credit is the team's.** When a system where every new feature brought
new bugs turned around without stopping delivery, it was not me who fixed it:
it was my team, working a new way.
[[1](https://medium.com/p/9467d18a788b), [2](https://medium.com/p/b3f6fcbc3b95)]

> The programmer had to separate his ego from the code itself: egoless
> programming.

## Behind it

**I started against it.** I was a detractor of testing: at meetups everyone
showed how, and no one showed why. That began to change when I contributed to
[AngularJS](/open-source/angularjs/). So I teach it starting from why — at the
Legacy Code Rocks meetup, the talk was [*Testing: what, how, why?*](/talks/) —
because it is counterintuitive. In 2017 I told a room of students that doctors
have the Hippocratic oath, and we have testing.
[[1](https://medium.com/p/96c7a7dfff1e), [2](https://medium.com/p/9a3911bfd7e0), [3](https://medium.com/p/6518d83c833a)]

> Why test code that I know works?

**Assume I got it wrong.** That, for me, is the essence of agile: leave room to
find the mistake and fix it, in the design and in the requirement alike.
[[1](https://medium.com/p/aa012cd24186), [2](https://medium.com/p/9e94fba6beb3), [3](https://medium.com/p/b5d0b6faca9e)]

\`\`\`slides
  1,  2,  3  ✅ # ascending order!
---
  1,  2,  3  ✅ # ascending order!
  1,  1,  1  ❌ # but it might be a <= b < c
---
  1,  2,  3  ✅ # ascending order!
  1,  1,  1  ❌ # but it might be a <= b < c
  1,  2,  2  ❌ # or it might be a < b <= c
\`\`\`

**The responsibility stays mine.** With an AI, on code I mean to keep, the
rhythm is the same: I direct it one step at a time and commit between steps. I
ask for the clean step on every cycle, because left alone it forgets the
refactor; and I tell it that finding nothing to clean is a correct answer,
because pushed, it invents something. When I caught myself letting my
assistant do the designing, I switched it off until the design was mine again.
[[1](https://medium.com/p/dfaf65024d9), [2](https://medium.com/p/0b5058e302bf), [3](https://medium.com/p/37023881ba0a)]

\`\`\`slides js
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
---
function Greeting({ name = 'John' }) {
  return <h1>Hello, {name}!</h1>;
}
\`\`\`

> What did the AI do? Add a name = ‘John’ just in case it was empty.

**Share what worked.** Whoever has something worth sharing should share it: it
is what took me to meetups, and what keeps me publishing every Saturday — [the
essays](/essays/) are gathered by subject. I teach it as well — [a recipe for
concurrency](/teaching/raft/), [a course built on posts that are
tests](/teaching/software-lab/) — and say it out loud in [talks](/talks/).
[[1](https://medium.com/p/82d0f511023e), [2](https://medium.com/p/e265a5f3048f)]

> Whoever came to present was presenting something that had actually worked
> for them.
`},{file:"craft/kata.md",markdown:`---
title: The kata, one commit at a time
summary: Robert C. Martin's Bowling Game Kata in the commits a student makes, each one run here as you reach it — the rhythm of test, code and clean, the step back to green before the design changes, and the one step I added.
order: 1
---

# The kata,  
one commit  
at a time.

Robert C. Martin wrote the Bowling Game Kata to be repeated like a form, until
its steps come without thinking. This is it in JavaScript, as I taught it,
split into the commits a student makes: each one a single move — a test, the
code it asks for, or a clean-up — and the bar says whether the tests passed. Every
commit is run here, in the page, as you reach it: walk it with the arrows, or
jump from the strip.

::bowling-kata

## What to watch

**The rhythm.** Red, then green, then as many clean steps as it takes, all of
them green. The strip at the top is that rhythm, seen before a line of it is
read.

**Refactor only after it works.** The duplication in the tests is marked at
commit 8, and it waits: nothing is cleaned while a test fails. At 17 the spare
test fails, and the design is wrong for it — the slide says so. So the next
commit sets the test aside, and the design changes with every test passing.
The test comes back, is set aside once more when the design is still wrong,
and passes at 28.

**Add new code before removing the old.** Commit 10 creates a game for every
test, and ignores it; only then do 11 and 12 take the old one out, one test at
a time. Commits 19 to 23 do the same to the score itself: add a list of rolls
beside the running total, write to both, read from the list, stop writing the
total, delete it. After each step, the code works again. Elsewhere this shape
is called a [parallel change](https://martinfowler.com/bliki/ParallelChange.html).

**A test seen failing once.** The perfect game passes the moment it is
written. A test that has never failed has not yet shown it can: so at commit
40 it expects \`"fail"\`, to see it go red and show the 300 it really got, and
at 41 it gets its 300 back. That step is the one I added; I wrote why in [Don't Trust
Tests](https://medium.com/p/6813582074f3). Since then I do it with every test
that passes without asking for any code.

What else the kata taught me, I wrote down as I found it: its lessons on
refactoring, [part one](https://medium.com/p/90b110a2ad17) and [part
two](https://medium.com/p/1d28b3a78b08), then [what to
test](https://medium.com/p/fc771d5e39e8) and [how to
design](https://medium.com/p/a37d8d11be9c).

## Whose it is

The kata, its steps and the notes on its slides are Robert C. Martin's, from
his slides of 2005. Mine are the JavaScript, the commits a student makes one
by one, each labelled with its move, and the perfect game made to fail. The
slides it follows are on [the kata's page](/teaching/kata/), with a version in
Java.
`},{file:"craft/raft.md",markdown:`---
link: /teaching/raft/
order: 14
---
`},{file:"craft/software-lab.md",markdown:`---
link: /teaching/software-lab/
order: 13
---
`},{file:"essays/index.md",markdown:`---
title: Essays with more than half a million views
summary: More than 250 essays on Medium, one every Saturday since 2022, read more than half a million times.
order: 20
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
professional college of computer engineers of Catalonia.

## The book

![The cover of the book](/book/BookGuide.jpeg) *The Emotional and Technical
Guide to Rescue Stalled Software* (2024) is about conquering technical debt
without sacrificing your sanity or your shipping schedule. Its rule fits on
one line: never rewrite, never stop delivery. [About the book.](/book/)

What a shortcut costs, in one dial: two teams build the same features, and
one of them saves time on each and pays interest on it after.

::technical-debt --shortcuts

## Essays

> > More than half a million views.

More than 250 on [Medium](https://drpicox.medium.com), one every Saturday
since 2022, and not one missed. The most read, and two of the ones read
longest:

- ![The cover of the essay](/essays/covers/framework-war.jpg "card") [The JavaScript framework war is over](https://medium.com/p/bd110ddab732)  
  And there is only one winner.

- ![The cover of the essay](/essays/covers/beautiful-mess.jpg "card") [Software Development Is A Beautiful Mess](https://drpicox.medium.com/software-development-is-a-beautiful-mess-45edab1fab73)  
  In 1968 Dijkstra banned GOTO, and he did it for the wrong reason.

- ![The cover of the essay](/essays/covers/scrum-vs-xp.jpg "card") [Scrum vs Extreme Programming: Was XP Right All Along?](https://drpicox.medium.com/scrum-vs-extreme-programming-was-xp-right-all-along-1bb1061e9e6b)  
  Could the most popular methodology be the thing holding teams back?

[All of them, by subject.](/essays/)

## More to run

- ![The Rocinante Simulator: the inner solar system in three dimensions, and the ship's dials](/rocinante-simulator.jpg "card") [A relativistic rocket](/projects/rocinante/)  
  Both clocks, the ship's and home's, and the fuel.

- ![The auction floor: five buyers and a box of prawns](/projects/shots/fish-market.jpg "card") [The agent that won the fish auction](/projects/fish-market/)  
  A Dutch auction, December 2000. Seat your own agent.

- ![The Fibergochi, a stick figure in a yellow egg](/projects/shots/fibergochi.jpg "card") [The Fibergochi](/projects/fibergochi/)  
  A student kept like a Tamagotchi, 1999. Playable.

- ![A letter A drawn on a grid, and the network reading it](/projects/shots/letters.jpg "card") [My first neural network](/projects/first-network/)  
  Letters told apart by backpropagation, first written in C in 1994. Draw your own.

- ![The source of this site as boxes and arrows, the features above the frame they stand on](/projects/shots/architecture.jpg "card") [How this site is built](/projects/architecture/)  
  Its source as boxes and arrows, commit by commit: the program an AI wrote, and the rules it is held to.

- ![A fractal planet of seas, land and snow](/projects/shots/worlds.jpg "card") [The planet in the header](/projects/worlds/)  
  Grown as this page opened, by a program I wrote in 2000. Reload for another.

[All of them.](/projects/)

## Open source

[Two public APIs of AngularJS are mine](/open-source/angularjs/), and I made
its compiler faster. They are still in 1.8.3, the last release it had.
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
order: 40
---

# Open source

Most of what I have written belongs to whoever paid for it. This is the part
that does not: code that is public, and that other people have run, merged,
or built on.

- [AngularJS](/open-source/angularjs/) -- two public APIs of the compiler are mine, with the \`ngClass\` rewrite built on my work, the testing module's \`$componentController\`, two benchmark suites and a directive. All of it still in 1.8.3, the last release the framework had. The whole account, commit by commit.
- [What strangers install](/open-source/packages/) -- thirty-four npm packages, most written for one project. A few kept being downloaded for years by people nobody told about them: what npm counted, year by year.

Elsewhere on this site, and just as public:

- [Worlds](/projects/worlds/) -- the fractal planet generator of 2000, [Mons fractals](https://github.com/drpicox/mons-fractals), rewritten here with its dials outside.
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
`},{file:"projects/adventure.md",markdown:`---
link: /teaching/adventure/
order: 51
---
`},{file:"projects/architecture.md",markdown:`---
title: How this site is built
summary: The source of this site as boxes and arrows, commit by commit — the program an AI wrote, and the rules it is held to.
order: 90
---

# How this site is built

The code of this site is written by an AI — Claude, in Claude Code — from
what I ask of it. I say what the site is and how it should be made; it
writes the program, and the tests.

The picture is that program. Every ball is a file, every box a folder of the
frame or a feature, and every arrow a box that needs another. It is read from
the source by the TypeScript compiler, at every commit that changed it. Play
it and watch it grow; tangle it to see the same files with nobody saying
where anything goes, and untangle it again. Put the tests in, and every file
with something in it to run that no test imports directly is drawn as a
ring. Point at a file, and its own arrows come out: what it needs, and what
needs it.

::architecture

## The arrows point one way

A rule written in a document is a rule that can be missed, by a person or by
an AI. So the rules of this code are not in a document: they are tests it has
to pass. \`architecture.test.ts\` reads the same graph this picture draws, and
fails when

- a file outside a folder named \`browser/\` touches the page,
- the frame imports a feature,
- two boxes need each other round in a circle,
- a file exports more than one value,
- a feature is missing from the diagrams in \`ARCHITECTURE.md\`.

The dashed arrows need only a type: a box that depends on an interface, not
on what implements it. That is dependency inversion, and it is what lets a
feature be removed by removing its folder.

## 8 September 2026

On its first day the source was sorted by kind of file: a \`core\` and a \`ui\`.
On the second it was sorted by what the site is — a frame, and the features
standing in it — in one commit: *The folders say what the site is, not what
kind of file each one holds*. Drag the slider back to it and watch the files
cross.
`},{file:"projects/bird-cards.md",markdown:`---
title: The program that finished before the professor left
summary: A Prolog parser for a field guide to birds, 1999, and the one idea that made it instant where everyone else's took twenty minutes.
order: 42
---

# The program that finished before the professor left

*Tècniques i Mètodes d'Intel·ligència Artificial*, FIB, June 1999. The lab
was a parser: a field guide to birds, one card per species written in
ordinary Spanish sentences, to be read by a Prolog program and turned into
facts a program could ask questions of.

\`\`\`
Nombre: Abubilla, Upupa epops.

Identificación: Plumaje pardo-rosado; en vuelo alas y cola blancas y
negras, muy anchas; moño rosado, con puntas negras y largo pico…
\`\`\`

becomes

\`\`\`prolog
nombre(vulgar([abubilla]), cientifico([upupa, epops]))
identificacion([plumaje([plumaje, pardo-rosado]), vuelo([vuelo]),
                alas([alas]), cola([cola, blancas, y, negras, muy, anchas]), …])
\`\`\`

The day it was due, the professor came round with a floppy of test cards,
handed it over, and started to walk away, because with everyone else's
program the test took ten or twenty minutes to run. We put the disk in,
looked at what was on it, ran the program, and called after him before he
had reached the door. It was done.

## What the code says happened

I remembered the reason as *an LL grammar*, and after twenty-seven years I
was not sure the memory was right. The ten versions are still on a floppy — \`T1.PL\` to \`TF.PL\`, the eighth
to the fourteenth of June — and a classmate's beside them, so it can be
checked. Both are the same size and both are DCGs, Prolog's grammar rules.
The difference is the shape of the rules.

The other program looks for **keys inside a sentence**: it walks the words,
and at each one asks whether it is a key, or a superkey with keys inside it,
or a separator, and on failure it backs up and tries another reading —

\`\`\`prolog
s_SuperClave(F)        --> s_LClaves(F, [], Ffin, _), s_SuperClave(Ffin).
s_SuperClave([F|Ffin]) --> t_SuperClave(_, F, Fdins), s_VariasClaves(Fdins, []), s_SuperClave(Ffin).
s_SuperClave(F)        --> s_LPalabras(Lp, Lf), s_SuperClave_F1(F, Lp, Lf).
\`\`\`

Three alternatives for the same head, none of which can be told apart
without reading ahead, so Prolog tries them in turn and, deep inside a long
card, tries them again and again. That is what a twenty-minute run is.

Mine decides at the **first word**:

\`\`\`prolog
s_UnaFicha(F) --> s_Identificacion(F).
s_UnaFicha(F) --> s_Nidificacion(F).
s_UnaFicha(F) --> s_Alimentacion(F).
s_UnaFicha(F) --> s_Habitat(F).
s_UnaFicha(F) --> s_Nombre(F).

s_Nombre(nombre(vulgar(Lv), cientifico(Lc)))
    --> t_Nombre, t_DosPuntos, s_NomPalabras(Lv), s_NomSeparador, s_NomPalabras(Lc), s_Punto_PotserNula.
\`\`\`

Every alternative of \`s_UnaFicha\` begins with a terminal that no other
begins with — \`Nombre\`, \`Identificación\`, \`Alimentación\` — so the first
token picks the rule and nothing is ever tried twice. Inside each rule the
same holds: lists are read by "one more, or none" pairs that never need to
look back, and \`analisis\` cuts, with \`!\`, at the first parse. The grammar is
LL(1) by construction — which is what I had set out to write, having just
learnt in the compilers course what it bought — and the facts the cards had
to become were rewritten until a grammar of that kind could produce them,
which is the other half of the trick.

It is the same lesson as the one the thesis taught later about
[loops](/research/loops-into-zones/): the algorithm was not made faster. It
was rewritten so that the machine underneath — here, Prolog's search — had
nothing to search.
`},{file:"projects/developer-meetings.md",markdown:`---
title: Developer meetings
summary: How the kind and timing of meetings affect focus, fatigue and how many features a week finishes.
order: 22
was: /simulators/developer-meetings/
---

# Developer meetings

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
`},{file:"projects/fibergochi.md",markdown:`---
title: The Fibergochi
summary: A student of the FIB kept like a Tamagotchi, written in JavaScript in 1999, one of the first interactive pages I made. Keep it studying, working at a terminal, sleeping and going to the bar, until it gets its degree, or it will be thrown out.
order: 41.5
---

# The Fibergochi

A Tamagotchi, but the pet is a student at the FIB, the computer science
faculty in Barcelona. It has to study for exams, find a free terminal for
its labs, sleep, go to the bar with its friends, and not get bored or
stressed, until it gets its degree, or it is thrown out. I wrote it in
JavaScript in the winter of 1999; the code is signed *Night*. It was one of
the first interactive pages I made.

This is the version of 2 March 1999, the one that was online, with its own
drawings. I drew them pixel by pixel in February, as sixteen-colour bitmaps,
and made them into GIFs for the web. Its words were in Spanish, and here
they are in English.

::fibergochi

The keys on the egg are its own little drawings; the mouse over one says
what it does. **Study/Sleep** sends it to study or to bed, and it decides
which: it tosses a coin. **Find terminal** sends it to look for a free
terminal, and once it has one, it does its labs there on its own. **http**
sets it browsing, if it holds a terminal. **Bar** takes it for a drink, and
it stays for as long as it has friends there; **Friends** makes more.
**Beg** is for after the last day of class: it begs for the subject nearest
to passing, and three times in ten it works. **alfa** tells the score.

The three lamps beside the drawing are an exam to study for, a lab to do,
and a terminal held. After the last day of class the first two blink, and
under the date it says how much there is of each.

It has habits. What it has lately done most, it goes back to on its own: a
student who chats more than works drifts from the lab to http, and one who
drinks more than studies is taken to the bar from the books, easily by day
and hardly early in the morning. The habits fade a tenth every day. Looking
for a terminal and begging stress it, and the bar calms it down. The
terminal rooms were classrooms too, and in the middle of the day a class
can turn it out.

A day has sixteen hours, and a term has twenty-five days, twenty of them
with classes. The marks come out on the twenty-second day. A subject is
passed if less than an hour of work is left on it. It had three speeds, and
has them here: a step every second, which it starts at, every 0.4 seconds,
and every hundredth. The drawings move on a clock of their own, whatever
the speed. Time passes only while the egg is on screen. The Fibergochi is
kept in your browser, as a cookie kept it then, and **new** starts another.

Left alone, it is thrown out for boredom on the sixteenth day of its first
term.

## The rules of the faculty

It starts in the *Fase de Selección*, the first phase of the degree: nine
credits, and in this game a credit is a subject. Anyone who has passed none
after two terms is out, with a single word: *BACARRA*. After four terms,
anyone more than two credits short is out. Anyone one or two short is let
through, but only to the *Técnica*, the shorter degree, twenty-five credits
more. Anyone who passes all nine chooses: the *Superior*, forty, or the
*Técnica*.

After that come the *alfas*: for each of the last six terms, the credits
passed over the credits taken. Four of them below half, and it is out. More
than a hundred of stress, and it leaves. And anyone who finishes the degree
gets two messages, the second of which is an error in \`KERNEL386.EXE\`,
because nobody was expected to get that far.

## What the code of 1999 says

The notes at the top of the file tell how it was made. I did not know how
to use arrays in JavaScript, and I had no internet connection to find out.
So the ten subjects are ten variables, \`credito0\` to \`credito9\`, and they
are reached by building the variable's name and evaluating it:

\`\`\`js
function LeerArray (nom, index)
  {
    return eval (nom + index);
  }
\`\`\`

A browser kept only twenty cookies, which was not enough for a cookie per
number. So all fifty numbers went into one cookie, four characters each,
which is why every number in it had to stay between −999 and 9999. The notes
also warn that Netscape did not tell upper case from lower case in names. So
anything changed was to be tried in Explorer first.

Two things were wrong, and are mended here. A student let through to the
*Técnica* after four terms was never taken out of the *Fase de Selección*,
so the next term threw them out after all. And the score counted its alfas
starting from nothing at all, not from zero, so it always found a spotless
record. Two slips in what the score says are mended with it: it counted the
subjects to pray for with the count of the ones going well, and numbered
the alfas from the oldest as if it were the latest. The rules are otherwise
as they were.

## Where it was found

The copy I had kept was of 15 February, two weeks before this one, and in
it the bar, the friends and begging did nothing yet. The version of March
was on the Internet Archive, from the university server it lived on, but
not its drawings. Those were on a backup disk, the bitmaps beside the GIFs.

The credits in the code give the original idea to Sardakuar, and the idea
of actually making it to Josep Llosa, "who does not know we have mentioned
him, or does".
`},{file:"projects/first-network.md",markdown:`---
title: My first neural network
summary: A network that tells letters apart, taught by backpropagation, first written in C in 1994 and shown to my class on the PC I carried from home. Draw on its grid, and teach it letters of your own.
order: 41
---

# My first neural network

In 1994, in my second year of BUP, I wrote a neural network in C that told
two letters apart, drawn on a small grid. To learn how, I went to the
university and, with help, searched for papers over Gopher. It was a school
project, and I presented it to the whole class. To do it I carried the PC
from home: the tower and its CRT screen.

This is the same idea again, in this site's own code: a grid of five cells
by five, ten hidden nodes, one output for each letter, and
backpropagation. Press a cell to ink it or clear it, and the network reads
the drawing again.

::letters

It has been taught A and B, two hundred rounds. Each round shows it every
letter twice, once as drawn and once with one cell wrong, so that it learns
the letter and not the drawing. Tick more letters and it starts again with
all of them. O, C and D are there to be confused. **Forget everything**
leaves it guessing; **teach 100 more rounds** and it comes back.

Or teach it a letter of your own. Draw it, give it a name of up to three
characters, and press **remember this drawing**. It joins the letters
taught, and the network learns them all again from the start. Your
letters stay in your browser, and × forgets one.

## The code

This is the whole of the learning, as it runs on this page:

\`\`\`js
learn(input, target, rate) {
  const values = this.forward(input);
  const output = values[values.length - 1];
  // Each output is to blame for its error,
  // times the slope of the squash where it stands.
  let blame = output.map((value, n) => {
    return (value - target[n]) * value * (1 - value);
  });
  for (let layer = this.weights.length - 1; layer >= 0; layer -= 1) {
    const below = [...values[layer], 1];
    const nodes = this.weights[layer];
    // A node below takes the blame of the nodes it feeds,
    // by its weight on each: before those weights move.
    const passed = values[layer].map((value, i) => {
      let sum = 0;
      for (let n = 0; n < nodes.length; n += 1) {
        sum += nodes[n][i] * blame[n];
      }
      return sum * value * (1 - value);
    });
    for (let n = 0; n < nodes.length; n += 1) {
      for (let i = 0; i < below.length; i += 1) {
        nodes[n][i] -= rate * blame[n] * below[i];
      }
    }
    blame = passed;
  }
  let error = 0;
  for (let n = 0; n < output.length; n += 1) {
    error += (output[n] - target[n]) ** 2;
  }
  return error / 2;
}
\`\`\`

\`forward\` works the other way: every node adds up the values below it by
its weights, plus a bias, and squashes the sum between 0 and 1. Then
\`learn\` starts from the answer. Each output is to blame for how far it
missed. The blame goes down a layer, shared out by the weights. Every
weight moves a little against its share.

## A robot, the same year

That same school year I did a robotics workshop at the Museu de la Ciència.
We had to move a small robot, and in theory in plain C, with the moves
written out by hand. I used what I knew about networks to simulate one
instead, with the weights set by hand and no backpropagation, and it worked
at once. They changed the problem: first find a light, then find it avoiding
obstacles. It was enough to give the robot a *feeling*: aversion to
obstacles. Then they asked for a maze, and told us the trick of keeping a
hand on the right-hand wall. The robot got the feeling of *needing to touch
something on its right*, and the change was almost instant. This part is
memory. None of that code is here.
`},{file:"projects/fish-market.md",markdown:`---
title: The agent that won the fish auction
summary: A Dutch auction, a class of competing agents, December 2000, and the one number ours stood on — the margin at which the market clears. Run it again, and seat your own.
order: 43
---

# The agent that won the fish auction

*Aplicacions d'Intel·ligència Artificial*, FIB, autumn 2000. The lab was a
competition. Every group wrote a buyer for the same simulated fish market
and the marks went by how the buyers did against each other: a 10 for the
best, down to about a 4 for the worst. There were two general rounds with
every group's agent in the room, the second counting for more. Ours won
both — the first with the agent below, the second with the one we handed in
two weeks later.

The market is a **Dutch auction**. A box of fish comes onto the floor, every
buyer is told what it resells for, and the auctioneer names a price *above*
that and brings it down. The first buyer to shout takes the box at that
price. Nobody bids up; there is nothing to decide but *when*. And since a
price on a box of known resale value is a margin, \`(value − price) / price\`,
what a buyer decides is the margin below which it will not shout.

::fish-market

Press **next lot** and one box is sold, or withdrawn if nobody wanted it.
**Run** sells them at reading pace, **whole morning** at once. The board
shows what each buyer asks for the box on the floor, what it holds, and what
it has made; under it, box by box, who took it at what price and the price
every buyer was ready to shout at — which is the whole of each one's mind
at that moment. **Seat your own agent** below the board and it plays too.

## The one number

Vicente — the agent was called that — knows two sums: what all the fish
still on the floor resells for, and how much credit the buyers have left
between them. If that money bought all that fish, every unit spent would
return

\`\`\`math
margin = frac{fish - money}{money}
\`\`\`

That is the margin at which the market *clears*: the price level at which
the money in the room and the fish in the room exactly meet. Vicente shouts
at that margin and not before. Both sums move as the morning goes — each box
sold leaves the first, each price paid leaves the second — and the margin
moves with them.

\`\`\`java
private void recalcularGanancia()
{
    ganancia = sumValor - sumCredito;
    ganancia /= sumCredito;
}

public void evOffer(Good g, double precio)
{
    double valor;
    double gananciaActual;
    valor = g.getResalePrice();
    gananciaActual = valor - precio;
    gananciaActual /= precio;
    if (gananciaActual <= 0)
        return;
    if (gananciaActual >= ganancia && canIBid)
        bid(precio);
}
\`\`\`

That is \`Vicente.java\`, less a line that printed. In English, name for
name:

\`\`\`java
private void recomputeMargin()
{
    margin = fishLeft - moneyLeft;
    margin /= moneyLeft;
}

public void onOffer(Good g, double price)
{
    double value;
    double marginNow;
    value = g.getResalePrice();
    marginNow = value - price;
    marginNow /= price;
    if (marginNow <= 0)
        return;
    if (marginNow >= margin && canIBid)
        bid(price);
}
\`\`\`

\`fishLeft\` is \`sumValor\`, the resale value of what is still on the floor;
\`moneyLeft\` is \`sumCredito\`, the credit in the room counted at 90%. The one dial is \`eficacia\`, 0.9: the credit of the others is counted at 90%,
on the assumption that they will not manage to spend it all. Less money
chasing the same fish means a higher clearing margin, so 0.9 is a measure of
greed. The dial above the board is that number. Turn it down and Vicente
asks for more and buys less; turn it to 100% and he asks exactly what the
room can pay.

## Why it wins

Watch a morning with the dial at 50% money. The two naive buyers act first:
the hasty one takes box after box at a 5% margin, and the patient one waits
for half price and gets it now and then, when nobody else wants a box. For
the first twenty or thirty boxes Vicente does nothing. The market's margin is over 100% and
no box falls that far while the hasty one has credit — so he does not shout,
and he keeps his money.

Then the hasty one is out of credit. Now the money left in the room is
mostly Vicente's, the fish left is most of the fish, and the clearing margin
tells him so: he can demand twice what the room could have paid an hour ago,
and get it, box after box, until his credit and the fish run out together.
He does not chase the best box. He buys everything that returns more than
the average, and lets the others fight over the rest.

This is not a trick against those two buyers. The clearing margin is where
the price would settle if every buyer were rational; a buyer asking more
than that goes home with money, a buyer accepting less has overpaid against
the room. The agent that stands on the number is the one that cannot be
argued down.

## What came after it, in seventeen days

The files kept their dates, and there was not one agent but four.

- **1–3 December — Vicente.** The clearing margin, alone.
- **2 December — Nulo.** A buyer that never shouts. It only watches, and
  writes down the margin each kind of fish went for. It was the instrument
  for the next one.
- **10 December — Wanda.** The clearing margin, believing the others will
  spend 98%, corrected as the morning goes: 5% choosier each time she wins a
  box, 5% less each time a rival who is doing at least as well takes a box at
  a margin she would have accepted — because somebody is buying under her.
  She also carried a margin learnt per kind of fish, meant to cap the
  market's; the one line that chose between the two returned the market's on
  both branches, so the kinds never spoke. She is seated above as she ran.
- **15 December — the one we handed in.** Where Wanda corrected her margin
  after the fact, this one *plans* it. It keeps a histogram of the value
  sold so far by the margin it went at — \`p(m)\`, the share of everything
  sold that went at margin \`m\` — and assumes the fish still on the floor
  will go the same way. Then it sums over every margin it could demand,
  from the highest down, what the fish it expects to find there would cost,
  and demands the largest \`m\` at which that sum still covers the credit it
  has left:

\`\`\`math
sum_{m' >= m} p(m') · frac{fish}{1 + m'} >= credit
\`\`\`

That margin is the most it can ask and still spend all its money. Until
anything has sold, it is Vicente.

The thread is clean: one global number, then measure, then a number that
corrects itself, then a number computed from what was measured and what is
left to spend. On the board the three are close, and which of them comes out
ahead depends on the morning; the two naive buyers are never in it.

## Your own agent

Under the board is an editor with the body of a JavaScript function. It is
given \`lot\`, the box on the floor; \`market\`, with the lots still to sell,
everyone's remaining credit and every sale so far; and \`me\`, your name in
the credits. It returns the margin you demand. It starts out as Vicente in
eight lines, so the first agent you seat already holds its own — change the
0.9 first, then try to beat him. A mistake in it is shown in the engine's own
words, and the auction goes on without you. It runs in your browser and
stays there.

## What this is and is not

The auction here is a reconstruction, not the original market: the price
falls in steps of 2% of the resale value from 150% of it, a box is withdrawn
at 25%, and when two buyers shout at once a coin decides where the original
restarted the round higher. The agents are the ones in the files, rule for
rule. The two naive buyers are not from the class; they are
there to show what the number is for.

Eighteen years later I set a class the same problem turned inside out:
[a lagoon whose fish breed if left alone](/teaching/fishing-lagoon/), and
bots that have to decide how much to take from it.
`},{file:"projects/fishing-lagoon.md",markdown:`---
link: /teaching/fishing-lagoon/
order: 52
---
`},{file:"projects/hot-nights.md",markdown:`---
title: Hot nights, counted
summary: How many nights a year never cool below 20 °C, at nine weather stations, and whether the second half of each record differs from the first.
order: 32
was: /open-data/hot-nights/
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
`},{file:"projects/index.md",markdown:`---
title: Projects
summary: Small programs you can run here, each made of one idea — from a network of 1994 and an auction of 2000 to a language model you can count by hand, with public data added up and two models of how software work goes wrong.
order: 30
was: /simulators/, /open-data/
---

# Projects

Small things, each made of one idea, and almost all of them something you
can move: a dial, a grid, a seed, a seat at the table.

## Ideas, taken apart

- [The next word](/projects/next-word/) -- a language model with everything taken away but the idea: count which word follows which, then throw the dice. Let it read this website.
- [A relativistic rocket](/projects/rocinante/) -- how long a trip takes on board and how long for those left at home, and why a ship that crosses the solar system in days cannot reach a star in a lifetime.

## How software work goes

Abstract things in software development, as small models you can turn the
dials of and watch.

- [Technical debt](/projects/technical-debt/) -- how shortcuts create compound productivity losses over time: the true cost of a shortcut, the break-even point between clean and debt-driven development, and what the interest rate does to it.
- [Developer meetings](/projects/developer-meetings/) -- how the kind and the timing of meetings affect a developer's focus and fatigue, and with them how many features a week actually finishes. Paint a calendar and see.

## Public data, added up

The Generalitat de Catalunya publishes what its measuring networks record,
and most of it is only ever looked at a day at a time. These add it up
another way. The sums are kept in this site's repository, a finished year at
a time, and the portal is asked again only when a year has ended; while you
read, nothing is fetched from anyone but this site.

- [NO2 by the hour and the month](/projects/no2/) -- thirty years of hourly measurements, averaged by hour of the day and month of the year. A city's working day turns out to have a shape, and it does not reach the top of the hill.
- [Hot nights, counted](/projects/hot-nights/) -- how many nights a year never cool below 20 °C, at nine weather stations, and whether the second half of each record differs from the first.

## Before the doctorate, in the order they were made

- [My first neural network](/projects/first-network/) -- a network that tells letters apart, taught by backpropagation, first written in C in 1994 and shown in class. Draw on its grid, and teach it letters of your own.
- [The Fibergochi](/projects/fibergochi/) -- a student of the FIB kept like a Tamagotchi, in the JavaScript of March 1999: study, sleep, find a terminal, go to the bar, and get through the Fase de Selección. Playable, in its own drawings.
- [The program that finished before the professor left](/projects/bird-cards/) -- a Prolog parser for a field guide to birds, 1999, and the one idea that made it instant where everyone else's took twenty minutes: a grammar that never has to look back.
- [The agent that won the fish auction](/projects/fish-market/) -- a Dutch auction, a class of competing agents in December 2000, and the one number ours stood on: the margin at which the market clears. Run it again, and seat your own.
- [Worlds](/projects/worlds/) -- the fractal planet generator of 2000, the one that grows the world in the header, with its dials exposed.
- [A maze you could not fly over](/projects/maze/) -- a VRML maze generator of May 2001: a depth-first dig, and spheres that jump across the walls so it cannot be solved from above. Grown again from the same seeds, with two things the spheres did that nobody noticed.

## Also here, from the teaching

Two labs I set, which are just as much things to play: they live under
[teaching](/teaching/), and are listed here too.

- [Sixty-four rooms](/teaching/adventure/) -- the text adventure of a first-year course, 2007, playable.
- [The fishing lagoon](/teaching/fishing-lagoon/) -- a commons whose fish breed if left alone, 2018. Seat your own bot.

## And the site itself

- [How this site is built](/projects/architecture/) -- its source as boxes and arrows, commit by commit: the program an AI wrote, and the rules it is held to. Play it, tangle it, untangle it.

Use \`ls\` to see them all, or \`cat next-word\` to read one here.
`},{file:"projects/maze.md",markdown:`---
title: A maze you could not fly over
summary: A VRML maze generator from May 2001, a depth-first dig with spheres that jump you across the walls, grown again here room for room from the same seeds, and what the spheres did that nobody noticed.
order: 45
---
# A maze you could not fly over

*Realitat Virtual i Geometria*, FIB, spring 2001, with Toni Preciado. The
course was VRML, the language the web of 2000 was going to walk around in: a
scene is a text file, and a plug-in in the browser lets you move through it.
Our project was a maze. Not one drawn by hand: a Java program,
\`LaberintoSimple\`, that grew one of any size and wrote it out as a VRML
world, a floor for every room and a wall wherever two rooms were not joined.

::maze

That is the maze the program wrote on 20 May 2001, seven rooms a side, from
seed 543: the file it produced, \`test.wrl\`, is still there, and the maze
above is grown again from the same seed and checked against it wall for
wall. North is at the top, the way in is at the bottom left and the way out
at the top right. **Walk the camera** follows the route the program dug the
rooms in; **another** grows a new one.

## The dig

Start in the corner. From the room you are in, try the neighbours in turn;
for each one nobody has dug yet, knock down the wall between you and dig
from there. When there is nowhere left to go, step back and try the next
neighbour of the room before. That is a depth-first search, and since every
room is entered exactly once, from exactly one other, the result is a tree:
one way, and only one, between any two rooms. The report that went with it
says it plainly: *"todos los laberintos tienen una única solución"*, and
from anywhere you can reach anywhere.

The steps back are kept too. The program wrote the whole route, back-tracks
and all, into the VRML as an animation, and a camera rode along it: pick
*Cam DFS* in the viewer and you watched the maze being dug, room by room.
The report offers it as the first of the two games — a replacement for the
Windows OpenGL screensaver — and the second as solving the maze on foot.

One thing about "try the neighbours in turn": the order is not shuffled. The
program picks one of three fixed orders — north, east, west, south; west,
south, east, north; or south, east, west, north — so of the twenty-four ways
to order four directions it only ever uses three. The mazes do not look it.

## The spheres

A week after the first version, the program learnt to cheat. In one room in
ten, before digging on, it picks a room anywhere in the maze. If nobody has
dug that room yet, it puts a green sphere in both, joins them, and digs on
from the far one. In the viewer the sphere was a link, meant to take you to
its pair through every wall in between. The maze above marks both ends of a
jump with the same letter.

\`\`\`java
public void generar(int x, int y)
{
    int orden;

    anadirDFS(x, y);
    if (random.nextInt(10) < 1)
        generarHLink(x, y);

    orden = random.nextInt(3);
    switch (orden)
    {
        case 0:  generarNorte(x, y); generarEste(x, y); generarOeste(x, y); generarSur(x, y);   break;
        case 1:  generarOeste(x, y); generarSur(x, y);  generarEste(x, y);  generarNorte(x, y); break;
        default: generarSur(x, y);   generarEste(x, y); generarOeste(x, y); generarNorte(x, y); break;
    }
}

public void generarHLink(int x, int y)
{
    int x2 = random.nextInt(w);
    int y2 = random.nextInt(h);

    if (laberinto[x2][y2] != 0)
        return;

    laberinto[x][y] |= CNX_HLINK;
    laberinto[x2][y2] = CNX_HLINK;
    hLinks[x][y] = new Pt(x2, y2);
    hLinks[x2][y2] = new Pt(x, y);

    generar(x2, y2);
    anadirDFS(x, y);
}
\`\`\`

That is \`LaberintoSimple.java\`, with the four \`switch\` cases set a line
each. In English, name for name:

\`\`\`java
public void dig(int x, int y)
{
    int order;

    rememberStep(x, y);
    if (random.nextInt(10) < 1)
        digSphere(x, y);

    order = random.nextInt(3);
    switch (order)
    {
        case 0:  digNorth(x, y); digEast(x, y);  digWest(x, y);  digSouth(x, y); break;
        case 1:  digWest(x, y);  digSouth(x, y); digEast(x, y);  digNorth(x, y); break;
        default: digSouth(x, y); digEast(x, y);  digWest(x, y);  digNorth(x, y); break;
    }
}

public void digSphere(int x, int y)
{
    int x2 = random.nextInt(width);
    int y2 = random.nextInt(height);

    if (maze[x2][y2] != 0)
        return;

    maze[x][y] |= HAS_SPHERE;
    maze[x2][y2] = HAS_SPHERE;
    sphereTo[x][y] = new Point(x2, y2);
    sphereTo[x2][y2] = new Point(x, y);

    dig(x2, y2);
    rememberStep(x, y);
}
\`\`\`

A jump is just another way into an undug room, so the maze is still a tree
and still has one way through. But now the tree is no longer flat. The
report: *"El laberinto es de dos dimensiones (en ningún momento hay que
subir ningún piso), pero dado que hay partes incomunicadas tan solo
alcanzables con los hipervínculos se puede considerar que está en 3
dimensiones."* Two dimensions you can walk, and a third you can only jump
along. That was the point. A maze in VRML has a weakness a maze on paper
does not: you can leave the floor and look down. We added fog, which also
made large scenes faster, and the spheres, and with those a maze could not
be solved from above, because from above there is no seeing where a sphere
goes.

The report names five files, \`mini.wrl\`, \`med.wrl\`, \`gran.wrl\`, \`mm.wrl\` and
\`10k.wrl\`, *"el más complicado y con diferencia"*. They did not survive; the
program did, so the dial above goes to thirty a side, which is plenty on a
screen. Untick the spheres and you have the version of 13 May, which never
rolled for them.

## What the spheres did that nobody noticed

Run the Java today and it grows the same mazes it grew then — the page's
generator is checked against it — and it shows two things the report does
not.

**Some spheres lead nowhere.** When the room a sphere lands in rolls a
sphere of its own, the program overwrites that room's pair. The new pair
works both ways; the first sphere now points at a viewpoint nobody wrote.
And since the rooms behind it were reached only through that sphere, they
are cut off, way out included if it was among them. In the first thousand
seven-by-seven mazes the Java grows, 133 have a dead sphere and 117 have no
way out at all; at twenty a side, it is most of them. The maze of 20 May
happens to be one of the lucky ones. On the page a dead sphere is a dashed
circle with a cross, and **show the way out** says when there is none.

**The live ones all land in the same place.** Each sphere carries the
viewpoint it jumps to, but the viewpoint is written without a position, and
VRML puts a viewpoint without one at its default, (0, 0, 10). Every link in
the file takes you to that one spot, on a wall a few steps north of the way
in. Here a sphere joins the rooms it was meant to join, which is what the
report describes.`},{file:"projects/next-word.md",markdown:`---
title: The next word
summary: A language model with everything taken away but the idea: count which word follows which, then throw the dice.
order: 11
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
`},{file:"projects/no2.md",markdown:`---
title: NO2 by the hour and the month
summary: Thirty years of hourly NO2, averaged by hour of the day and month of the year. A city's working day turns out to have a shape.
order: 31
was: /open-data/no2/
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
`},{file:"projects/rocinante.md",markdown:`---
title: A relativistic rocket
summary: How long a trip takes on board, how long for those left at home, and why a ship that crosses the solar system in days cannot reach a star in a lifetime.
order: 12
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
  Pluto in a month, on a little over a thousand tonnes of fuel. Proxima
  Centauri takes sixty-five years: in the first eleven weeks it burns a
  little more than half its fuel, keeping just enough to stop, reaches 7% of
  the speed of light, and coasts with the engine off for sixty-four years.
  At that speed the two clocks still agree.
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
- **Go where Project Hail Mary goes.** Tau Ceti is 11.9 light-years away.
  With the perfect engine at one g it is 5.1 years on board and 13.7 at
  home. Turn the acceleration up and see how little it buys at home, and
  how much on board.

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

![The Rocinante Simulator: the inner solar system in three dimensions, the ship's dials on the right, and on the left a trip to Mars of 3.76 days and 132.71 tonnes of fuel](/rocinante-simulator.jpg "wide")

Its Mars is this page's Mars: the same ship, 3.76 days and 133 tonnes.

## The two books behind it

The name is the ship of *The Expanse*, the novels of James S. A. Corey,
the pen name of Daniel Abraham and Ty Franck, which begin with *Leviathan
Wakes* in 2011, and the television series made of them. The *Rocinante* is
named after Don Quixote's horse. What makes that universe possible is the
Epstein drive, which keeps up a steady thrust on almost no fuel. This page
is what the rocket equation says when there is no Epstein drive.

*Project Hail Mary*, Andy Weir's novel of 2021, filmed in 2026, sends its
ship to Tau Ceti on an engine fed by Astrophage, single-celled organisms
that take in light and give it out again. Its story turns on the two clocks
this page keeps apart: the years its crew lives through are not the years
that pass at home.
`},{file:"projects/technical-debt.md",markdown:`---
title: Technical debt
summary: How shortcuts create compound productivity losses over time.
order: 21
was: /simulators/technical-debt/
---

# Technical debt

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
`},{file:"projects/worlds.md",markdown:`---
title: Worlds
summary: The fractal planet generator of 2000, in the browser, with the dials exposed.
order: 44
theme: dark
sky: stars
was: /worlds/
---

# Worlds

[Mons fractals](https://david-rodenas.com/mons-fractals/) was a university
graphics assignment of the autumn of 2000: Java 1.1.8 on MS-DOS, a pipeline
of filters that grew a planet and wrote it out as VRML for a browser plugin to
fly around. This is the same pipeline, in TypeScript, with nothing underneath
it, and the dials on the outside so you can play.

::worlds

Drag the world to turn it; let it go and it keeps turning. Every dial is one of
the filters:

- **Seed** picks the world. The same seed always grows the same one.
- **Detail** is how many times every edge is split in two. Each round has four times the triangles of the one before; six rounds are 81,920.
- **Roughness** is how far a new midpoint may move, as a fraction of the edge it came from. The original default was 0.1; a little more makes for better mountains at this size, and a lot more makes something that is not a planet.
- **Sea** is the share of the surface under water. The sea is a minimum radius: everything below it is raised up to it.

The pipeline runs in order, and the order is the meaning: raise the land, put
in the sea, work out the climate from height and latitude, and only then
paint. Paint first and there is nothing to paint.
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
order: 50
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
`},{file:"talks/index.md",markdown:`---
title: Talks
summary: Twenty-one years of them: two international conferences as first author, the Barcelona JavaScript circuit of 2013–2017, and since 2022 talks about algorithms for people who do not write them.
order: 70
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

## BarcelonaJS and the Barcelona meetups

2013 to 2017 were the years of the meetups. I spoke at BarcelonaJS and helped
organise it, and co-organised the WeNode conference in 2014. In 2022 and
2023 I went back to it, twice.

2013-05 :: **[GruntJS](https://github.com/drpicox/tutorial-gruntjs-v1)**, BarcelonaJS.
2013-09 :: **[Promises](https://github.com/drpicox/tutorial-promises-v1)**, BarcelonaJS -- promises against callbacks, when that was the argument.
2014-05-25 :: **[JS & Patterns](https://github.com/drpicox/tutorial-jspatterns-v1)**, BarcelonaJS. Given again a year later.
2016-01-29/31 :: Three talks across one weekend at the **first AngularCamp Barcelona** -- an un-conference backed by Google Developers, born out of the AngularBeers meetup: *Angular Community and API Decisions*, *MVC: the Model, the great forgotten*, and *Modules in Angular 2*.
2016-03 and 2016-07 :: **MVS: MVC in Angular**, twice, the second time with exercises.
2016-06 :: **The Bowling Game Kata**, twice in a fortnight. It is [still here](/teaching/kata/).
2016-11 → 2017-12 :: **Testing**, three times, each in a different room: *what, how, why?* at the Legacy Code Rocks meetup; *from the company to the university and back*, for the FIB's alumni and the COEINF; and *company, university and professionalism*, at the UAB.
2017-03-17 :: **Jornades de l'Institut Bernat el Ferrer**, Molins de Rei -- a secondary school. The history of software engineering from Dijkstra in 1968 to Agile in 2001, TDD with a calculator, and how to get into university.
2022-10-25 :: **[TDD is not a stupid idea, it's brilliant](https://www.meetup.com/barcelonajs/events/289045382/)**, BarcelonaJS -- an open meetup, hosted in the Travelport office, with two of my former students in the audience.
2023-04-25 :: **[Redux and Domain-Driven Design](https://www.meetup.com/barcelonajs/events/293039826/)**, BarcelonaJS, again in the Travelport office -- how much the two have in common, and what an implementation gains by taking the design principles they share from both.

## Before that, the conferences

2005 :: **IPDPS**, Denver. First author and speaker on *Optimizing NANOS OpenMP for the IBM Cyclops multithreaded architecture*, with co-authors from IBM T.J. Watson.
2006 :: Co-organiser of the **7th IEEE/ACM Grid Computing Conference**, Barcelona.
2007 :: **HiPEAC industrial workshop** at IBM Haifa, on the Cell simulator.
2011 :: **GbR**, Münster. First author and speaker on parallel graph matching on GPGPUs -- Springer LNCS 6658.
2012 :: Co-organiser of the graph-database track at **FOSDEM**.

## Inside companies, 2017–2023

Training weeks on JavaScript, React and Redux, run twice, in Barcelona and in
Denver. Brown bags and TAST sessions. Sessions on TDD and BDD for teams in two
countries, one of which someone recorded and passed around.

## Since 2022: algorithms, for people who do not write them

Data, algorithms and generative AI, for neighbours, families and teachers --
the audience that has to make decisions about all three and was never given
the vocabulary. Since 2024 mostly with [Aixeca el cap](https://aixecaelcap.cat/),
a platform for a responsible use of screens, of which I am a member.

It began a year earlier, in front of my own profession.

2021-11-26 :: **Realitats ètiques d'avui i demà a les professions informàtiques**, a round table at La Lul·liana 2021, the yearly celebration of COEINF, the college of computer engineers of Catalonia. I was the developer, beside a sociologist, a CIO and a lawyer. I spoke of the six months I had spent in the pilot of GitHub Copilot, and how fast it had changed; of software that has killed people, and the oath Robert C. Martin asks programmers to take; and of TDD as a discipline. Asked at the end who is responsible for the code a machine writes, I said the programmer: whoever accepts the change, and with the test written first, knows what they accepted. [The college's account](https://enginyeriainformatica.cat/letica-lenginyeria-informatica-i-la-3a-edicio-talent-tic-a-la-lulliana-2021/); the video [from my first turn](https://youtu.be/v1GHzQGZtfg?t=5981), and [that answer](https://youtu.be/v1GHzQGZtfg?t=9504).

2022-10-15 :: **Algorismes i Intel·ligència Artificial, influència en la vida quotidiana** -- the opening talk of the XXII Fòrum TIC Social, the open-air evening that Llefi@net, the citizens' network of Llefià, has held in Plaça Trafalgar in Badalona every summer since 2000. [The slides](https://llefia.org/wpforum/wp-content/uploads/sites/10/2022/10/Algorismes_i_IA_a-_la_vida_quotidiana.pdf) and [their account of the evening](https://llefia.org/blog/2022/11/19/cronica-xxii-forum-tic-social-de-badalona/) are on llefia.org.
2024-07-06 :: **Impacte social de la Intel·ligència Artificial**, the same forum two summers on, in conversation with Ariel Guersenzvaig and Xavier Vinaixa -- and the talk that followed, on screens at school, whose slides I wrote with Marina Gispert. [Documents and video.](https://llefia.org/blog/2024/07/07/documents-i-videos-xxiii-forum-tic-social-2024/)
2025-02-05 :: **Els nostres fills no són un experiment**, invited to *III Jornada. L'educació a debat*, at the Universitat Pompeu Fabra. [The session is on the university's channel.](https://youtu.be/4i-mpwbL7Fg)
2025 → 2026 :: **Vols una galeta?** -- Sabadell, Barcelona, Altafulla, Sant Celoni, Teià, el Masnou. It grew from 125 slides to 188, and then I cut it to 54, which took eight drafts of the script and is the version I would give again.
2026-03-27 :: **Qui crIA els teus fills?**, Escolàpies, el Masnou. Commissioned and paid for by the parents' association -- the only one anybody has ever paid me for. They then recommended me to the town council, which is how the last one happened.
`},{file:"teaching/adventure.md",markdown:`---
title: Sixty-four rooms
summary: UPC, 2007. A text adventure as the lab of a first-year course, built so that four traversal-and-search schemas were all a student needed. Playable.
order: 2
---

# Sixty-four rooms

In the autumn of 2007 I taught the lab of *Introducció als Ordinadors* at the
UPC: first year, first term, first programs in C. The lab was a text
adventure. It is small — one file of C, six hundred lines, and three text
files it reads at the start — and it is playable, here, exactly as it was:

::adventure

The game was written in Spanish for the class and is translated here, word
for word; its own words still work at the prompt — \`norte\`, \`sur\`, \`este\`,
\`oeste\`, \`coger\`, \`atacar\` — beside the English ones. You start in the south-west corner with sixteen points of life and
nothing in your hands, and the pantry is one room away through a door you
have no key for. The map fills in as you go, walls and doors and all. The map and its little
pictures are this page's: the game itself was only words, and they are all
still here, as it printed them.

## Four schemas, and nothing else

A first-year student cannot yet hold a program in their head. What they can
hold is a recipe. So the course taught **four schemas** and the lab was
designed so that four schemas were all it took:

\`\`\`
traversal, without a mark        search, without a mark
  first();                         found = 0;
  while (more()) {                 first();
    e = get();                     while (more() && !found) {
    treat(e);                        e = get();
    next();                          if (is_it(e)) { treat(e); found = 1; }
  }                                  next();
  finish();                        }
                                   finish();
\`\`\`

and the same two again *with a mark*, for a sequence that ends in a sentinel
rather than a count — a file, a line ending in a full stop. Every problem in
the lab is one of the four, with \`first\`, \`more\`, \`get\`, \`treat\` and \`is_it\`
filled in for the case at hand: reading the items file is a traversal with a
mark (end of file); finding the monster a room names is a search over a list;
the game loop itself is a traversal with a mark, the mark being the word
\`salir\`. The theory sheet said so in as many words: *decide which of the four
it is, then replace each operation for the case*.

The data structures followed the same rule. A list is an array and a count.
A room is a record: a name, a description, four exits, what it holds. The
world is a matrix of rooms, eight by eight, so that *north* is \`i + 1\` and
*east* is \`j + 1\` and there is no graph to traverse, only a grid to index.

## The map came first

I drew the map on squared paper before anything else, so that it would be
worth exploring: the house in the south-west corner, the orchard and the
farm along the south, the river across the middle, the forest to the
north-east and the caves to the north-west, and the pantry — the goal — one
locked door from where you start. Then I typed it into \`habitaciones.txt\`,
one room at a time, each with its four exits and what it holds.

Everything the game knows is in those three files, and a student could
change any of it without touching the C: add a room, move a monster, invent
a weapon. The program reads them with \`fscanf\` and a format string, which is
its own small lesson in what a sequence is.

## What it does not do

Kill you. The check on the player's life is in the source, commented out: a
first-year lab is not the place to lose. So the numbers were never balanced
for survival, and the last fight, as it happens, costs exactly the sixteen
points there are. A door you open stays open only from the side you opened
it. And one line of the rooms file had a typo that left the bridge in the
forest without its gnome; here the gnome is on his bridge, which is the one
thing changed.
`},{file:"teaching/fishing-lagoon.md",markdown:`---
title: The fishing lagoon
summary: A lab from 2018 where the assignment is a commons: a lagoon whose fish breed if left alone, bots that share it, and a tit-for-tat that only cooperates with those who do. Play it, and seat your own bot.
order: 3
---

# The fishing lagoon

Tecnocampus, spring 2018, *Laboratori de Software 1*. Eighteen years after
[the fish auction](/projects/fish-market/) I set a class the same shape of
problem turned inside out. There, buyers competed for fish somebody else had
caught. Here, the fish are still in the water, they breed if they are left
alone, and the bots have to decide how much to take from a lagoon they
share. The starter is public:
[fishing-lagoon-starter](https://github.com/drpicox/fishing-lagoon-starter).

The rules fit in a paragraph. A round is a lagoon with some fish in it and a
number of weeks. Before the round, each bot hands in its orders for every
week — a number of fish, or a rest — knowing who else is on the lagoon and
what happened in earlier rounds, but not what the others will order now.
Each week the lagoon serves the smallest order first, whole, and splits
what is there between equal orders when it does not stretch; then the fish
that are left breed, half as many again. A bot's score is what it caught.

::lagoon

**Play a round** and the board shows the week by week: what each bot
caught, in grey when it got less than it asked for, and what was left in
the water. **Play five** and the season builds; the tit-for-tats remember.
The 40% bot starts on the bank. **Seat your own bot** below and it plays too.

## What there is to see

Three fish left alone become four, six, nine, thirteen, nineteen,
twenty-eight, forty-two, sixty-three, ninety-four. A hundred fished by
nobody for nine weeks are over three thousand in the tenth. So the most a
lagoon can give is everyone resting until the last week and splitting what
grew — and every fish taken early is one that would have bred.

Play the first round as it is set. The lagoon grows all round, to about six
hundred, and the two tit-for-tats rest and take their share the last week.
But the bot that takes 10% of what it believes is there ends the round with
the most, nearly three times what either of them got: it fed on their
patience, a tenth a week of a lagoon they were letting grow. And in the
last week, when the tit-for-tats finally order, the smaller orders are
served first — they always are — and the two of them split what is left: a
quarter of what they had planned on.

Now tick **40%** and play again. It takes forty the first week and the
lagoon is empty by the third; nobody catches anything after that, not the
bot that only ever asked for one. Play a second round and watch the two
tit-for-tats: they take a full share from the first week now, and the 40%
bot ends with half of what it got before. That is the strategy the starter
shipped as the one worth beating. **Tit for tat** rests every week but the
last and takes one share. But whoever took a full share or more in the
first week of a round is a traitor, for good, and on a lagoon with a traitor
tit for tat takes a full share every week itself, so that the traitor
cannot grow rich on its patience. Two of them cooperate; against a greedy
bot they take back what they can. Its test is the first week only, which is why it
never turns on Power, which rests the first week and takes everything in
the last two — the kind of hole a student finds by losing to it.

## Why a software lab

The subject was software, not game theory. What a student had to build was
the strategy behind an interface of three methods — where to sit, what to
order, what to learn from the round — against a server the class shared, and
the lagoon itself came with its tests: the breeding sequence, the smallest
order served first, a bot that fishes more than there is. The commons was
there so that the strategy was worth testing: a bot's orders depend on what
it believes the lagoon will hold, and that belief is a small simulation of
the rules, which is wrong the first time everyone writes it.

## Your own bot

Under the board is an editor with the body of a JavaScript function. It is
given \`fish\`, what the lagoon starts with; \`weeks\`; \`bots\`, the names on the
lagoon; \`me\`; and \`rounds\`, every round played so far, each with everyone's
orders, the weeks as they went, and the totals. It returns your orders: one
number a week, 0 to rest. It starts out as the cooperative half of tit for
tat, so the first bot you seat is a good neighbour — the first thing to try
is being a bad one, and then watching what the two tit-for-tats do to you
in the round after. A mistake in it is shown in the engine's own words and
your bot rests that round. It runs in your browser and stays there.
`},{file:"teaching/index.md",markdown:`---
title: Teaching
summary: Courses I taught and what I built for students to stand on: a lab whose specifications are blog posts that compile into tests, a text adventure, a commons of fish that breed, Raft through a recipe for concurrency, and a kata.
order: 60
---

# Teaching

I have taught at three universities. The first time was in 2002, through the
UPC's foundation: computing for people between 65 and 97 years old; five years
later, at the UPC itself, the first programs of the first year. In the courses
below I ended up building what the students stood on, so that the difficulty
they met was the one the course was about and not three others.

- [The post comes first](/teaching/software-lab/) -- Tecnocampus, six autumns, 2017 to 2022. *Laboratori de Software 2*: teams building a game the way software is built, where a feature starts as a blog post in markdown that compiles into a test for the server and a test for the client, the writer of a post is never its coder, and the grades are read from the repository's history.
- [Sixty-four rooms](/teaching/adventure/) -- UPC, 2007, *Introducció als Ordinadors*. A text adventure as the lab of a first-year course, built so that four traversal-and-search schemas were all a student needed, on a map drawn on squared paper first. Playable.
- [The fishing lagoon](/teaching/fishing-lagoon/) -- Tecnocampus, 2018, *Laboratori de Software 1*. A lab whose assignment is a commons: a lagoon whose fish breed if left alone, bots that share it and hand in their orders blind, and a tit-for-tat that cooperates only with those who do. Play it, and seat your own bot.
- [Raft, and a recipe for concurrency](/teaching/raft/) -- UOC, the distributed systems laboratory, 2013. A consensus algorithm as the assignment, the year before its paper was presented, and the three steps -- copy inside the guard, work outside it, check before writing -- simple enough for someone who cannot yet reason about interleavings.
- [The Bowling Game Kata](/teaching/kata/) -- Robert C. Martin's kata, which I first gave as a workshop twice in June 2016 and later taught in class, with my slides and a repository to do it in JavaScript or Java.

At the Tecnocampus, between 2017 and 2023, I designed three subjects from
scratch -- *Enginyeria del Software III*, *Laboratori de Software 2* and
*Arquitectura de Serveis* -- with a first-year lab, a front-end course and
final-project tutoring around them.

Use \`ls\` to see them, or \`cat software-lab\` to read one here.
`},{file:"teaching/kata.md",markdown:`---
title: The Bowling Game Kata
summary: Robert C. Martin's kata, with slides and a repository to do it in JavaScript or Java.
order: 5
was: /kata/
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

Two messages on the JavaScript slides are printed wrong. When the fourth test
fails, the runner says \`Expected: 24. Received: NaN.\`; and when the fifth is
made to fail, \`Expected: "fail". Received: 300.\`

[The kata, one commit at a time](/craft/kata/) follows the JavaScript slides:
every commit run in the page, with what the runner really says.
`},{file:"teaching/raft.md",markdown:`---
title: Raft, and a recipe for concurrency
summary: A consensus algorithm as a laboratory assignment in 2013, and the three hints given to simplify it — above all a three-step recipe, simple enough for someone who cannot yet reason about interleavings.
order: 4
---

# Raft, and a recipe for concurrency

In the autumn of 2013 the distributed systems laboratory at the UOC set its
students a consensus algorithm to implement: Raft, which was then a draft
going round, a year away from being presented. I taught that laboratory. The
assignment took three months, and [my implementation is
public](https://github.com/drpicox/uoc-raft-2013p): one Java class over the
course's skeleton, dated October 2013, which was the reference the students'
work was compared against, and was given back to them as the solution.

Raft was designed to be understandable, and it is. The hard part of the
assignment is somewhere else. A server is doing four things at once —
timing out, asking for votes, answering other servers' requests, replicating
its log — every one of them reads and writes the same few fields, and between
any two lines the network may hand it a message that makes it a different
kind of server. That is a lot to ask of someone writing their first
concurrent program.

So the students were given three hints, and the implementation follows
them.

## One: the timeouts are always on

The obvious way to write a timeout is to arm it, and to cancel it and arm it
again whenever a message says it is not needed yet. Every one of those is a
chance for a message and a timer to cross. Here the timers are started once,
and they tick for as long as the server runs; each tick asks one question
instead — *has a leader been heard from since the last one?* — and returns if
it has:

\`\`\`java
timerQueue.schedule(electionTimeoutTask, electionTimeout, electionTimeout);
…
private void electionTimeout() {
    // abort timeout if leader has been seen
    if (seenLeader.getAndSet(false)) { return; }
\`\`\`

It does a little work for nothing, and it has no race left to lose.

## Two: a recipe for the shared state

The Java habit is to make the whole method \`synchronized\` and be safe. It is
not always safe — a \`synchronized\` method is a monitor, and a student who
knows mutexes and semaphores does not yet know what a monitor will do — and it
makes long stretches of the program wait on each other. So the
implementation follows a recipe simple enough to be followed by someone who
cannot yet reason about interleavings, and still concurrent:

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

## Three: the answer is handled where the question is asked

A server sends many requests and gets their answers back in any order. The
usual Java of the time had a handler for each kind of answer, somewhere else,
matching answers to questions; every attempt written that way was hard to
follow and full of races. The idea that worked came from JavaScript: each
request goes to an executor as a small anonymous task that sends it, waits,
and deals with its own answer, with everything it needs already in its local
variables. Here is the vote, as the election asks for it:

\`\`\`java
// request votes
for (final Host otherHost : otherServers) {
    executorQueue.execute(new Runnable() {
        public void run() {
            RequestVoteResponse response = RMIsd.getInstance()
                .requestVote(otherHost, term, candidateId, lastLogIndex, lastLogTerm);
            // not now or not me
            if (response.getTerm() != term || !response.isVoteGranted()) { checkReceivedTerm(term); return; }

            // who wons?
            int votes = voteCount.incrementAndGet();
            if (votes == minimumVoteCount) {
                synchronized (GUARD) {
                    if (persistentState.getCurrentTerm() != term || state != RaftState.CANDIDATE) {
                        // Ops! Something changed while network RPC go and come
                        return;
                    }
                    // I'm the leader
                    state = RaftState.LEADER;
                    // …
                }
            } // else greater values ignored to avoid become leader to often
        }
    });
}
\`\`\`

It is the second hint again, from the other side: the task carries the
copies it was given, and when the answer arrives it takes the guard and
checks that the world it was asked in is still there.

## Why the recipe works

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

Here is the compiler itself, with the two files it writes. Edit the post and
the test follows; break a rule and it says what it said to the students:

::post-tests

If that sounds like BDD, it is. It is not Cucumber, and not because of any
objection to Cucumber. In the first editions the students had to bind each
step to its code with a regular expression, and they did not know regular
expressions, and they said so. Worse, they could not see the link between the
post and the code: the step was read at run time by something they had not
written, and it was magic to them. Compiling the post into a test file they
could open, with one method call per line and the line beside it as a
comment, took the magic out. The post had a body. So the change was not
away from BDD; it was towards being able to see it.

The post itself was doing a second job. To write one, a student has to explain
the feature to the player -- what they will see, what they should do, what
should happen -- and that puts them in the player's head. Written from there,
the post says nothing about functions, identifiers, tables or databases,
because the player has none of those; it says what the game does. The
implementation followed the post, not the other way round, and the low-level
reflex that first-year programmers arrive with had nowhere to go.

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
`}],ir="---";function Wf(t){return(/^"(.*)"$/.exec(t)??/^'(.*)'$/.exec(t))?.[1]??t}function _f(t){const e=t.replace(/\r\n?/g,`
`).split(`
`);if(e[0]?.trim()!==ir)return{fields:{},body:t.trim()};const n=e.indexOf(ir,1);if(n<0)return{fields:{},body:t.trim()};const a={};for(const s of e.slice(1,n)){const o=s.indexOf(":");o<=0||(a[s.slice(0,o).trim()]=Wf(s.slice(o+1).trim()))}return{fields:a,body:e.slice(n+1).join(`
`).trim()}}function qf(t){const n=t.replace(/\.md$/,"").replace(/(^|\/)index$/,"");return n===""?"/":`/${n}/`}function lr(t){if(t==="/")return"/";const e=t.slice(0,-1);return e.slice(e.lastIndexOf("/")+1)}function zf(t){if(t==="/")return null;const e=t.slice(0,-1);return e.slice(0,e.lastIndexOf("/")+1)}function Gf(t){const{fields:e,body:n}=_f(t.markdown),a=qf(t.file);return{file:t.file,route:a,parent:zf(a),name:lr(a),title:e.title??lr(a),summary:e.summary??"",order:Number(e.order??"100"),body:n,fields:e}}function Yf(t){return t.endsWith("/")?t:`${t}/`}function hr(t,e){return t.order-e.order||t.name.localeCompare(e.name)}class Uf{byRoute;linked;constructor(e){const n=e.map(Gf),a=n.filter(s=>!s.fields.link).sort(hr);this.byRoute=new Map(a.map(s=>[s.route,s])),this.linked=new Map(n.flatMap(s=>{const o=this.byRoute.get(Yf(s.fields.link??""));return!s.fields.link||!o?[]:[[s.route,{...o,parent:s.parent,name:s.name,order:s.order,link:s.route}]]}))}get links(){return[...this.linked.values()].map(e=>({from:e.link,to:e.route}))}get pages(){return[...this.byRoute.values()]}at(e){const n=this.linked.get(e);return this.byRoute.get(n?n.route:e)}childrenOf(e){return[...this.pages,...this.linked.values()].filter(n=>n.parent===e).sort(hr)}trailTo(e){const n=this.at(e);return n?n.parent===null?[n]:[...this.trailTo(n.parent),n]:[]}}const Ke=new Uf(Hf),cr=["on","off"];function dr(t,e){if(t.length===0)return{text:"No flags to try just now."};const n=Math.max(...t.map(r=>r.name.length)),a=r=>e.isOn(r.name)?"on":"off",s=t.map(r=>{const i=cr.map(l=>l===a(r)?`[${l}]`:` ${l} `).join("");return`${r.name.padEnd(n)}  ${i}  ${r.description}`}),o=t.map(r=>{const i=cr.map(l=>l===a(r)?`<strong aria-current="true">${l}</strong>`:`<a href="#" data-run="flags ${r.name} ${l}" title="flags ${r.name} ${l}">${l}</a>`).join(" ");return`<dt>${x(r.name)} <span class="switch">${i}</span></dt><dd>${x(r.description)}</dd>`});return{text:s.map(r=>r.trimEnd()).join(`
`),html:`<dl class="help flags">${o.join("")}</dl>`}}function Jf(t,e){return{name:"flags",usage:"flags [name [on|off]]",description:"list the trials this site can be switched into, or switch one",run(n,[a,s]){return a===void 0?dr(t,e):t.some(o=>o.name===a)?s!==void 0&&s!=="on"&&s!=="off"?{text:`flags: ${a}: choose on or off`,error:!0}:(e.set(a,s===void 0?!e.isOn(a):s==="on"),dr(t,e)):{text:`flags: ${a}: no such flag. Try flags`,error:!0}}}}function Kf(t,e,n){return t.flatMap(a=>{if(a.trial===void 0||e.chosen(a.name))return[];let s=e.drawn(a.name);return s===void 0&&(s=n()<a.trial,e.draw(a.name,s)),[{name:a.name,on:s}]})}function Vf(t,e){const n=new URLSearchParams(e),a={};for(const{name:s}of t){const o=n.get(s);(o==="on"||o==="off")&&(a[s]=o==="on")}return a}function Xf(t){if(t.includes("--help"))return{help:!0};const e={};for(let n=0;n<t.length;n+=1){const a=t[n]??"";if(!a.startsWith("--"))return{error:`${a}: options are written --name value`};const s=a.indexOf("=");if(s>0){e[a.slice(2,s)]=a.slice(s+1);continue}const o=t[n+1];if(o===void 0)return{error:`${a} needs a value`};e[a.slice(2)]=o,n+=1}return{given:e}}const Zf=t=>"choices"in t?t.choices.map(et).join("|"):"n",Qf=t=>"choices"in t?et(t.initial):`${t.min} to ${t.max}, ${t.initial}`;function eg(t){const e=[t.name,...t.parameters.map(s=>`[--${s.name} ${Zf(s)}]`)].join(" "),n=Math.max(...t.parameters.map(s=>s.name.length+2)),a=t.parameters.map(s=>`  ${`--${s.name}`.padEnd(n)}  ${s.description} (${Qf(s)})`);return[e,`  ${t.summary}`,"",...a].join(`
`)}function tg(t){return{name:t.name,usage:`${t.name} [--help] [--option n]...`,description:t.summary,run(e,n){const a=Xf(n);if("help"in a)return{text:eg(t)};const s="error"in a?a:Fi(t,a.given);if("error"in s)return{text:`${t.name}: ${s.error}`,error:!0};const o=t.run(s.values);return{text:o.text,html:`<div class="app program-out">${o.html}</div>`}}}}function ng(t){return[...t.flatMap(e=>e.commands??[]),...t.flatMap(e=>e.programs??[]).map(tg)]}function ur(){const t=Re.flatMap(w=>w.flags??[]),e=new Vm;for(const[w,v]of Object.entries(Vf(t,window.location.search)))e.set(w,v);const n=Kf(t,e,Math.random),a=w=>`${w.name}-${w.on?"on":"off"}`;for(const w of n)Ct(jt("trial",a(w)));document.addEventListener("click",w=>{const v=w.target?.closest("main a[href]");if(!v||window.location.pathname!=="/"||n.length===0)return;const b=v.host===window.location.host?v.pathname:v.href;for(const T of n)Ct(jt(a(T),"open",b))},{capture:!0});const s=[...Pi,...ng(Re),Jf(t,e)],o=Km(Re),i=(w=>w.endsWith("/")?w:`${w}/`)(window.location.pathname),l=Ke.at(i);let h=Zo(o,{site:Ke}),d=sr(document),c=null;const u=Zp(Ke,(w,v)=>{h(),h=Zo(o,{site:Ke}),d(),d=sr(document);for(const b of Re)b.arrive?.(w);v||c?.moveTo(w.route)});if(c=If(Ke,l?i:"/",{moveTo:w=>u(w,{keep:!0}),clearPage:()=>{h(),h=()=>{},d(),d=()=>{},document.querySelector("main")?.replaceChildren()},commands:s,heard:w=>Ct(jt("command",s.some(v=>v.name===w)?w:"unknown"))}),l)for(const w of Re)w.arrive?.(l);const f={run:w=>{c?.run(w)}};for(const w of Re)w.install?.(f);const y=Re.flatMap(w=>w.programs??[]);Df(Xm(),{programs:y,site:Ke,goTo:w=>u(w),run:w=>c?.run(w)??[]})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ur):ur();
