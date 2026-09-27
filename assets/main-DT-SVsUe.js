function uo(t){const e=new Map,n=new Map;return t.changes.map(a=>{for(const s of a.removed)e.delete(s);for(const[s,o,r,i,h]of a.added)e.set(s,h?{id:s,path:o,lines:r,test:i,typesOnly:h}:{id:s,path:o,lines:r,test:i});for(const[s,o]of a.moved){const r=e.get(s);r&&e.set(s,{...r,path:o})}for(const[s,o]of a.resized){const r=e.get(s);r&&e.set(s,{...r,lines:o})}for(const[s,o]of a.unlinked)n.delete(`${s}>${o}`);for(const[s,o,r]of a.linked)n.set(`${s}>${o}`,r);return{modules:[...e.values()].sort((s,o)=>s.id-o.id),dependencies:[...n].map(([s,o])=>{const[r=0,i=0]=s.split(">").map(Number);return{from:r,to:i,typeOnly:o}}).sort((s,o)=>s.from-o.from||s.to-o.to)}})}function ke(t){const e=t.split("/");return e.length<=2?t:`${e[0]}/${e[1]}`}function mo(t){const e=new Map;for(const{from:l,to:c}of t.dependencies){const[d,m]=[ke(l),ke(c)];d!==m&&(e.has(d)||e.set(d,new Set),e.has(m)||e.set(m,new Set),e.get(d)?.add(m))}let n=0;const a=new Map,s=new Map,o=[],r=new Set,i=[],h=l=>{a.set(l,n),s.set(l,n),n+=1,o.push(l),r.add(l);for(const d of e.get(l)??[])a.has(d)?r.has(d)&&s.set(l,Math.min(s.get(l)??0,a.get(d)??0)):(h(d),s.set(l,Math.min(s.get(l)??0,s.get(d)??0)));if(s.get(l)!==a.get(l))return;const c=[];for(let d=o.pop();d!==void 0&&(r.delete(d),c.push(d),d!==l);d=o.pop());c.length>1&&i.push(c.sort())};for(const l of e.keys())a.has(l)||h(l);return i.sort((l,c)=>(l[0]??"").localeCompare(c[0]??""))}const Te=12,Vt=6,po=14,Nt=14,Xt=12,Or=14,xa=40,Be=10,Pr=16,Lr=t=>Math.min(6,2.2+Math.sqrt(t)/4),fo=t=>t.split("/").pop()?.replace(/\.ts$/,"")??t,lt=t=>t.includes("/")?t.split("/")[0]??t:"src";function $a(t,e){const n=new Map,a=s=>{const o=n.get(s);if(o!==void 0)return o;n.set(s,0);const r=Math.max(-1,...[...e.get(s)??[]].map(a))+1;return n.set(s,r),r};for(const s of t)a(s);return n}function Nr(t,e){const n=new Map;for(const{from:a,to:s,typeOnly:o}of t.dependencies){const[r,i]=[e.get(a),e.get(s)];if(r===void 0||i===void 0||r===i)continue;const h=n.get(`${r}>${i}`)??{from:r,to:i,count:0,typeOnly:!0};n.set(`${r}>${i}`,{...h,count:h.count+1,typeOnly:h.typeOnly&&o})}return[...n.values()].sort((a,s)=>a.from.localeCompare(s.from)||a.to.localeCompare(s.to))}function Rr(t,e,n){const a=new Map(t.map(m=>[m,m]));for(const m of n)for(const p of m)a.set(p,m[0]??p);const s=m=>a.get(m)??m,o=new Map,r=new Map;for(const{from:m,to:p}of e){const[u,f]=[lt(m),lt(p)];u!==f?o.set(u,(o.get(u)??new Set).add(f)):s(m)!==s(p)&&r.set(s(m),(r.get(s(m))??new Set).add(s(p)))}const i=[...new Set(t.map(lt))],h=$a(i,o);i.sort((m,p)=>(h.get(p)??0)-(h.get(m)??0)||m.localeCompare(p));const l=$a([...new Set(t.map(s))],r),c=i.flatMap(m=>{const p=t.filter(f=>lt(f)===m);return[...new Set(p.map(f=>l.get(s(f))??0))].sort((f,y)=>y-f).map(f=>({band:m,boxes:p.filter(y=>(l.get(s(y))??0)===f).sort()}))}),d=new Map;for(const m of c){const p=u=>{const f=e.filter(y=>y.to===u&&d.has(y.from)).map(y=>d.get(y.from)??.5);return f.length?f.reduce((y,w)=>y+w,0)/f.length:.5};m.boxes.sort((u,f)=>p(u)-p(f)||u.localeCompare(f)),m.boxes.forEach((u,f)=>d.set(u,f/Math.max(1,m.boxes.length-1)))}return c}function Qt(t,e){const n=Math.max(1,Math.ceil(Math.sqrt(e*2.2))),a=n*Nt;return{columns:n,inner:a,width:Math.max(a+Vt*2,fo(t).length*6+Vt*2),height:po+Math.ceil(e/n)*Nt+Vt}}function Dr(t,e){const n=s=>{const o=e.get(s);return o?o.x+o.width/2:0},a=(s,o,r)=>s?s.x+s.width*(o+1)/(r+1):0;return t.map(s=>{const[o,r]=[e.get(s.from),e.get(s.to)],i=t.filter(l=>l.from===s.from).sort((l,c)=>n(l.to)-n(c.to)),h=t.filter(l=>l.to===s.to).sort((l,c)=>n(l.from)-n(c.from));return{...s,x1:a(o,i.indexOf(s),i.length),y1:o?o.y+o.height:0,x2:a(r,h.indexOf(s),h.length),y2:r?r.y:0}})}function go(t,{tests:e=!1,width:n=1100}={}){const a=t.modules.filter(f=>e||!f.test),s=new Map(a.map(f=>[f.id,f])),o=new Map(a.map(f=>[f.id,ke(f.path)])),r=new Map;for(const f of[...a].sort((y,w)=>y.path.localeCompare(w.path))){const y=ke(f.path);r.set(y,[...r.get(y)??[],f])}const i=Nr(t,o),h=mo({dependencies:t.dependencies.flatMap(({from:f,to:y,typeOnly:w})=>{const[k,b]=[s.get(f),s.get(y)];return k&&b?[{from:k.path,to:b.path,typeOnly:w}]:[]})}),l=new Set(h.flat()),c=Rr([...r.keys()],i,h),d=[],m=new Map,p=[];let u=Te;return c.forEach((f,y)=>{const w=y===0||c[y-1]?.band!==f.band,k=c[y+1]?.band!==f.band;w&&(d.push({name:f.band,x:Te,y:u,width:n-Te*2,height:0}),u+=Pr+Be);const b=n-(Te+Be)*2,$=[[]];let I=0;for(const v of f.boxes){const A=Qt(v,r.get(v)?.length??0).width;I>0&&I+A>b&&($.push([]),I=0),$[$.length-1]?.push(v),I+=A+Xt}let M=0;if($.forEach((v,A)=>{A>0&&(u+=M+Or);const j=v.map(S=>Qt(S,r.get(S)?.length??0)),O=j.reduce((S,P)=>S+P.width,0)+Xt*(v.length-1);let C=Te+Be+(b-O)/2;M=0,v.forEach((S,P)=>{const x=j[P]??Qt(S,0);m.set(S,{name:S,label:fo(S),x:C,y:u,width:x.width,height:x.height,rank:c.length-y,cyclic:l.has(S)});const E=C+(x.width-x.inner)/2;(r.get(S)??[]).forEach((L,R)=>{const[N,D]=[R%x.columns,Math.floor(R/x.columns)];p.push({id:L.id,path:L.path,box:S,x:E+(N+.5)*Nt,y:u+po+(D+.5)*Nt,radius:Lr(L.lines),test:L.test,typesOnly:L.typesOnly??!1})}),C+=x.width+Xt,M=Math.max(M,x.height)})}),u+=M,k){const v=d[d.length-1];v&&(d[d.length-1]={...v,height:u+Be-v.y}),u+=Be}u+=xa}),{width:n,height:u-xa+Te,bands:d,boxes:[...m.values()],balls:p,links:Dr(i,m)}}function Fr(t,e=!1){const n=t.modules.filter(s=>!e||!s.test),a=new Map(n.map(s=>[s.id,s.path]));return{modules:n.map(({path:s,lines:o,test:r,typesOnly:i=!1})=>({path:s,lines:o,test:r,typesOnly:i})),dependencies:t.dependencies.flatMap(({from:s,to:o,typeOnly:r})=>{const[i,h]=[a.get(s),a.get(o)];return i!==void 0&&h!==void 0?[{from:i,to:h,typeOnly:r}]:[]})}}function wo(t){const e=new Set(t.modules.filter(n=>n.test).map(n=>n.id));return new Set(t.dependencies.filter(n=>e.has(n.from)&&!e.has(n.to)).map(n=>n.to))}function Rt(t){const e=Fr(t,!0),n=new Set(t.modules.filter(s=>!s.test&&!s.typesOnly).map(s=>s.id)),a=e.dependencies.filter(s=>ke(s.from)!==ke(s.to));return{files:e.modules.length,tests:t.modules.length-e.modules.length,lines:e.modules.reduce((s,o)=>s+o.lines,0),boxes:new Set(e.modules.map(s=>ke(s.path))).size,arrows:e.dependencies.length,crossing:a.length,typeOnly:e.dependencies.filter(s=>s.typeOnly).length,inCycles:mo(e).flat().length,testable:n.size,tested:[...wo(t)].filter(s=>n.has(s)).length}}const Br={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function T(t){return t.replace(/[&<>"]/g,e=>Br[e]??e)}const Wr=new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"long",year:"numeric",timeZone:"Europe/Madrid"}),We=(t,e,n=`${e}s`)=>`${t} ${t===1?e:n}`;function yo(t,e){const n=[`${We(e.files,"file")} in ${We(e.boxes,"box","boxes")}, ${We(e.tests,"test")}`,`${We(e.crossing,"arrow")} between boxes, ${e.typeOnly} of all ${e.arrows} onto a type`,`a test reaches ${e.tested} of the ${e.testable} files with something to test`,e.inCycles?`${We(e.inCycles,"box","boxes")} in a circle`:"no boxes in a circle"].join(" · ");return`<code>${T(t.sha)}</code> ${Wr.format(new Date(t.date))} — ${T(t.subject)}<br><span class="measured">${n}</span>`}const B=t=>Math.round(t*10)/10;function Hr({x1:t,y1:e,x2:n,y2:a}){const s=Math.max(18,(a-e)/2);return`M${B(t)} ${B(e)} C${B(t)} ${B(e+s)} ${B(n)} ${B(a-s)} ${B(n)} ${B(a)}`}function qr(t){const e=t.bands.map(r=>`<g class="band" data-band="${T(r.name)}"><rect x="${B(r.x)}" y="${B(r.y)}" width="${B(r.width)}" height="${B(r.height)}" rx="6"/><text x="${B(r.x+8)}" y="${B(r.y+12)}">${T(r.name)}</text></g>`).join(""),n=t.links.map(r=>{const i=B(Math.min(4,.8+Math.log2(r.count)*.7));return`<path class="link${r.typeOnly?" type-only":""}" stroke-width="${i}" d="${Hr(r)}" marker-end="url(#arrowhead)"><title>${T(`${r.from} → ${r.to}: ${r.count}`)}</title></path>`}).join(""),a=t.boxes.map(r=>`<g class="box${r.cyclic?" cyclic":""}" data-box="${T(r.name)}"><rect x="${B(r.x)}" y="${B(r.y)}" width="${B(r.width)}" height="${B(r.height)}" rx="4"/><text x="${B(r.x+6)}" y="${B(r.y+10)}">${T(r.label)}</text></g>`).join(""),s=t.balls.map(r=>`<circle class="ball${r.test?" test":""}" cx="${B(r.x)}" cy="${B(r.y)}" r="${B(r.radius)}"><title>${T(r.path)}</title></circle>`).join(""),o=`${t.boxes.length} boxes, ${t.balls.length} files, ${t.links.length} arrows between boxes`;return`<svg class="architecture" viewBox="0 0 ${t.width} ${B(t.height)}" role="img" aria-label="${o}"><defs><marker id="arrowhead" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z"/></marker></defs><g class="bands">${e}</g><g class="links">${n}</g><g class="boxes">${a}</g><g class="balls">${s}</g></svg>`}const Zt=600,He=60,fe=4;function bo(t,e){const n=i=>fe+i/Math.max(1,t.length-1)*(Zt-fe*2),a=(i,h)=>{const l=Math.max(1,...t.map(i)),c=t.map((d,m)=>`${n(m).toFixed(1)},${(He-fe-i(d)/l*(He-fe*2)).toFixed(1)}`).join(" ");return`<polyline class="${h}" points="${c}"/>`},s=(Zt-fe*2)/Math.max(1,t.length-1),o=t.map((i,h)=>i.inCycles?`<rect class="cycle" x="${(n(h)-s/2).toFixed(1)}" y="0" width="${s.toFixed(1)}" height="${He}"/>`:"").join(""),r=n(e).toFixed(1);return`<svg class="sparks" viewBox="0 0 ${Zt} ${He}" role="img" aria-label="Files and arrows between boxes, commit by commit">${o}${a(i=>i.files,"files")}${a(i=>i.crossing,"crossing")}<line class="now" x1="${r}" x2="${r}" y1="0" y2="${He}"/><text x="${fe}" y="11" class="files">files</text><text x="${fe+34}" y="11" class="crossing">arrows between boxes</text></svg>`}function zr(t,e){const n=uo(t),[a,s]=[n[e],t.commits[e]];return!a||!s?"":`<figure class="architecture-figure">${qr(go(a))}<figcaption>${yo(s,Rt(a))}</figcaption>${bo(n.map(Rt),e)}</figure>`}const _r=t=>{const e=JSON.parse(t("/data/architecture.json"));return zr(e,e.commits.length-1)};function g(t,e={},...n){const a=document.createElement(t);for(const[s,o]of Object.entries(e))o===void 0||o===!1||(typeof o=="function"?a.addEventListener(s.slice(2).toLowerCase(),o):o===!0?a.setAttribute(s,""):a.setAttribute(s,String(o)));for(const s of n)s==null||s===!1||a.append(s);return a}function qt(t){let e=!0;if(typeof IntersectionObserver!="function")return{onScreen:()=>e,stop:()=>{}};const n=new IntersectionObserver(a=>{for(const s of a)e=s.isIntersecting},{rootMargin:"100px"});return n.observe(t),{onScreen:()=>e,stop:()=>n.disconnect()}}const Ta=90,Sa=15;function Ma(t,e,n,a){const s=Math.min(a,.03333333333333333);t.vx+=((e-t.x)*Ta-t.vx*Sa)*s,t.vy+=((n-t.y)*Ta-t.vy*Sa)*s,t.x+=t.vx*s,t.y+=t.vy*s}const Gr=900,Yr=34,Ur=.02,Aa=.004,Ia=.82;function Jr(t,e,{width:n,height:a}){const s=new Float64Array(t.length),o=new Float64Array(t.length);for(let r=0;r<t.length;r+=1){const i=t[r];for(let h=r+1;h<t.length;h+=1){const l=t[h];let c=i.x-l.x,d=i.y-l.y;c===0&&d===0&&([c,d]=[r%7-3||1,h%5-2||1]);const m=Math.max(4,c*c+d*d),p=Gr/m,u=Math.sqrt(m);s[r]=(s[r]??0)+c/u*p,o[r]=(o[r]??0)+d/u*p,s[h]=(s[h]??0)-c/u*p,o[h]=(o[h]??0)-d/u*p}}for(const[r,i]of e){const[h,l]=[t[r],t[i]];if(!h||!l)continue;const c=l.x-h.x,d=l.y-h.y,m=Math.hypot(c,d)||1,p=(m-Yr)*Ur;s[r]=(s[r]??0)+c/m*p,o[r]=(o[r]??0)+d/m*p,s[i]=(s[i]??0)-c/m*p,o[i]=(o[i]??0)-d/m*p}t.forEach((r,i)=>{r.vx=(r.vx+(s[i]??0)+(n/2-r.x)*Aa)*Ia,r.vy=(r.vy+(o[i]??0)+(a/2-r.y)*Aa)*Ia,r.x=Math.min(n,Math.max(0,r.x+r.vx)),r.y=Math.min(a,Math.max(0,r.y+r.vy))})}const en=760,Ea=260,Kr=10,me=(t,e,n,a=8)=>t+(e-t)*(1-Math.exp(-a*n)),Vr=(t,e,n)=>{t.x=me(t.x,e.x,n),t.y=me(t.y,e.y,n),t.width=me(t.width,e.width,n),t.height=me(t.height,e.height,n)};class Xr{constructor(e,n){this.width=e,this.still=n}width;still;balls=new Map;boxes=new Map;bands=new Map;layout=null;mode="boxes";time=0;boxAlpha=1;fileLinks=[];hovered={};height=en;get wanted(){const e=this.layout?.height??en;return this.mode==="tangle"?Math.max(e,en):e}reached=null;coverage=null;show(e,n,{untangling:a=!1,reached:s=null,coverage:o=null}={}){this.reached=s,this.coverage=o,this.layout=n,(this.still||this.balls.size===0)&&(this.height=this.wanted);const r=Math.max(0,...n.boxes.map(d=>d.rank)),i=new Map(n.boxes.map(d=>[d.name,d.rank])),h=new Set;for(const d of n.balls){h.add(d.id);const m=this.balls.get(d.id),p=a?(r-(i.get(d.box)??0))*.07+Math.random()*.12:0;if(m)Object.assign(m,{leaving:!1,box:d.box,path:d.path,test:d.test,typesOnly:d.typesOnly,radius:d.radius,wait:p});else{const[u,f]=this.mode==="tangle"?[this.width/2+(Math.random()-.5)*80,this.height/2+(Math.random()-.5)*80]:[d.x,d.y];this.balls.set(d.id,{id:d.id,body:{x:u,y:f,vx:0,vy:0},size:{x:this.still?d.radius:0,y:0,vx:0,vy:0},radius:d.radius,alpha:this.still?1:0,leaving:!1,box:d.box,path:d.path,test:d.test,typesOnly:d.typesOnly,wait:p,trail:[],bornAt:this.time})}}for(const[d,m]of this.balls)h.has(d)||(m.leaving=!0);const l=(d,m)=>{const p=new Set(m.map(u=>u.name));for(const u of m){const f={x:u.x,y:u.y,width:u.width,height:u.height},y=d.get(u.name);y?Object.assign(y,{target:f,leaving:!1,cyclic:u.cyclic??!1,label:u.label??u.name}):d.set(u.name,{...f,target:f,label:u.label??u.name,alpha:this.still?1:0,leaving:!1,cyclic:u.cyclic??!1})}for(const[u,f]of d)p.has(u)||(f.leaving=!0)};l(this.boxes,n.boxes),l(this.bands,n.bands);const c=new Map(n.balls.map((d,m)=>[d.id,m]));this.fileLinks=e.dependencies.flatMap(({from:d,to:m})=>c.has(d)&&c.has(m)?[[d,m]]:[])}setMode(e){this.mode=e}step(e){this.time+=e,this.height=this.still?this.wanted:me(this.height,this.wanted,e,6);const n=new Map(this.layout?.balls.map(a=>[a.id,a])??[]);if(this.boxAlpha=me(this.boxAlpha,this.mode==="boxes"?1:0,e,5),this.mode==="tangle"){const a=[...this.balls.entries()].filter(([,r])=>!r.leaving),s=new Map(a.map(([r],i)=>[r,i])),o=this.fileLinks.flatMap(([r,i])=>{const[h,l]=[s.get(r),s.get(i)];return h!==void 0&&l!==void 0?[[h,l]]:[]});Jr(a.map(([,r])=>r.body),o,{width:this.width,height:this.height})}for(const[a,s]of this.balls){const o=n.get(a);this.mode==="boxes"&&o&&(s.wait>0?s.wait-=e:this.still?Object.assign(s.body,{x:o.x,y:o.y,vx:0,vy:0}):Ma(s.body,o.x,o.y,e)),Ma(s.size,s.leaving?0:s.radius,0,e),s.alpha=me(s.alpha,s.leaving?0:1,e,6);const r=Math.hypot(s.body.vx,s.body.vy);r>Ea&&this.mode==="boxes"&&s.trail.push({x:s.body.x,y:s.body.y}),(s.trail.length>Kr||r<Ea&&s.trail.length)&&s.trail.shift(),s.leaving&&s.alpha<.02&&this.balls.delete(a)}for(const a of[this.boxes,this.bands])for(const[s,o]of a)this.still?Object.assign(o,o.target):Vr(o,o.target,e),o.alpha=me(o.alpha,o.leaving?0:1,e,6),o.leaving&&o.alpha<.02&&a.delete(s)}hit(e,n){for(const a of this.balls.values())if(Math.hypot(a.body.x-e,a.body.y-n)<=Math.max(5,a.size.x+2))return{path:a.path,box:a.box};if(this.mode==="boxes"){for(const[a,s]of this.boxes)if(e>=s.x&&e<=s.x+s.width&&n>=s.y&&n<=s.y+s.height)return{box:a}}return{}}draw(e,n){e.clearRect(0,0,this.width,this.height),e.lineCap="round";const a=.5+.5*Math.sin(this.time*4);e.font="bold 10px ui-monospace, Menlo, monospace";for(const h of this.bands.values())e.globalAlpha=h.alpha*this.boxAlpha*.9,e.setLineDash([2,4]),e.strokeStyle=n.rule,e.lineWidth=1,e.beginPath(),e.roundRect(h.x,h.y,h.width,h.height,6),e.stroke(),e.setLineDash([]),e.fillStyle=n.dim,e.fillText(h.label,h.x+8,h.y+12);e.font="9px ui-monospace, Menlo, monospace";for(const[h,l]of this.boxes){const c=this.hovered.box===h;e.globalAlpha=l.alpha*this.boxAlpha,e.fillStyle=n.sunken,e.strokeStyle=l.cyclic?n.warn:c?n.accent:n.rule,e.lineWidth=l.cyclic?1.5+a*1.5:c?1.5:1,l.cyclic&&(e.shadowColor=n.warn,e.shadowBlur=6+a*10),e.beginPath(),e.roundRect(l.x,l.y,l.width,l.height,4),e.fill(),e.stroke(),e.shadowBlur=0,e.fillStyle=c?n.accent:n.dim,e.fillText(l.label,l.x+6,l.y+10)}const s=this.hovered.path?[...this.balls.values()].find(h=>h.path===this.hovered.path):void 0,o=s?this.fileLinks.filter(([h])=>h===s.id).map(([,h])=>h):[],r=s?this.fileLinks.filter(([,h])=>h===s.id).map(([h])=>h):[],i=new Set([...s?[s.id]:[],...o,...r]);this.drawLinks(e,n,s!==void 0),s&&this.drawFileArrows(e,n,s,o,r);for(const h of this.balls.values()){const l=Math.max(0,h.size.x);if(h.trail.length>1){e.strokeStyle=n.accent;for(let f=1;f<h.trail.length;f+=1)e.globalAlpha=f/h.trail.length*.35*h.alpha,e.lineWidth=l*(f/h.trail.length)*1.4,e.beginPath(),e.moveTo(h.trail[f-1].x,h.trail[f-1].y),e.lineTo(h.trail[f].x,h.trail[f].y),e.stroke()}const c=this.time-h.bornAt;c<.8&&!this.still&&(e.globalAlpha=(1-c/.8)*.6,e.strokeStyle=n.accent,e.lineWidth=1.2,e.beginPath(),e.arc(h.body.x,h.body.y,l+c*22,0,Math.PI*2),e.stroke());const d=this.hovered.path===h.path,m=s!==void 0&&!i.has(h.id),p=this.reached!==null&&!h.test&&!h.typesOnly&&!this.reached.has(h.id),u=!h.test&&!h.typesOnly?this.coverage?.get(h.path):void 0;if(e.globalAlpha=h.alpha*(m?.22:1),e.beginPath(),e.arc(h.body.x,h.body.y,d?l+2:Math.max(0,p||u!==void 0?l-.6:l),0,Math.PI*2),u!==void 0)e.strokeStyle=u>=99.5?n.accent:n.warn,e.lineWidth=1.2,e.stroke(),e.fillStyle=n.accent,e.beginPath(),e.moveTo(h.body.x,h.body.y),e.arc(h.body.x,h.body.y,Math.max(0,l-.6),-Math.PI/2,-Math.PI/2+Math.PI*2*u/100),e.closePath(),e.fill();else if(h.test){const f=Math.max(0,(d?l+2:l)*1.6);e.beginPath(),e.rect(h.body.x-f/2,h.body.y-f/2,f,f),e.fillStyle=n.test,e.fill()}else p?(e.strokeStyle=n.warn,e.lineWidth=1.2,e.stroke()):(e.fillStyle=h.test?n.soft:n.accent,e.fill());d&&(e.strokeStyle=n.ink,e.lineWidth=1.5,e.stroke())}if(s){const h=this.coverage?.get(s.path),l=h!==void 0&&!s.test&&!s.typesOnly?` · tests run ${Math.round(h)}% of it`:"";this.label(e,n,`${s.path}   needs ${o.length} · needed by ${r.length}${l}`,s.body.x,s.body.y-10)}e.globalAlpha=1}drawFileArrows(e,n,a,s,o){const r=(i,h,l,c)=>{const[d,m]=[h.body.x-i.body.x,h.body.y-i.body.y],p=Math.hypot(d,m)||1,[u,f]=[d/p,m/p],y={x:h.body.x-u*(h.size.x+2),y:h.body.y-f*(h.size.x+2)},w={x:(i.body.x+y.x)/2-f*p*.12,y:(i.body.y+y.y)/2+u*p*.12};e.globalAlpha=c,e.strokeStyle=l,e.fillStyle=l,e.lineWidth=1.4,e.beginPath(),e.moveTo(i.body.x,i.body.y),e.quadraticCurveTo(w.x,w.y,y.x,y.y),e.stroke();const[k,b]=[y.x-w.x,y.y-w.y],$=Math.atan2(b,k);e.beginPath(),e.moveTo(y.x,y.y),e.lineTo(y.x-7*Math.cos($-.4),y.y-7*Math.sin($-.4)),e.lineTo(y.x-7*Math.cos($+.4),y.y-7*Math.sin($+.4)),e.closePath(),e.fill()};for(const i of s){const h=this.balls.get(i);h&&r(a,h,n.accent,.9)}for(const i of o){const h=this.balls.get(i);h&&r(h,a,n.soft,.75)}}drawLinks(e,n,a){if(this.boxAlpha<.98){e.globalAlpha=(1-this.boxAlpha)*.22,e.strokeStyle=n.accent,e.lineWidth=.7,e.beginPath();for(const[o,r]of this.fileLinks){const[i,h]=[this.balls.get(o),this.balls.get(r)];!i||!h||(e.moveTo(i.body.x,i.body.y),e.lineTo(h.body.x,h.body.y))}e.stroke()}if(!this.layout||this.boxAlpha<.02)return;const s=this.hovered.box;for(const o of this.layout.links){const[r,i]=[this.boxes.get(o.from),this.boxes.get(o.to)],[h,l]=[this.layout.boxes.find(w=>w.name===o.to),this.layout.boxes.find(w=>w.name===o.from)];if(!r||!i||!h||!l)continue;const c=r.x+(o.x1-l.x)/l.width*r.width,d=r.y+r.height,m=i.x+(o.x2-h.x)/h.width*i.width,p=i.y,u=s!==void 0&&(o.from===s||o.to===s),f=s!==void 0&&!u;e.globalAlpha=this.boxAlpha*Math.min(r.alpha,i.alpha)*(a?.06:u?.95:f?.08:.4),e.strokeStyle=u?n.accent:n.soft,e.lineWidth=Math.min(4,.8+Math.log2(o.count)*.7)*(u?1.4:1),e.setLineDash(o.typeOnly?[4,3]:[]);const y=Math.max(18,(p-d)/2);e.beginPath(),e.moveTo(c,d),e.bezierCurveTo(c,d+y,m,p-y,m,p-4),e.stroke(),e.setLineDash([]),e.fillStyle=e.strokeStyle,e.beginPath(),e.moveTo(m,p),e.lineTo(m-3.5,p-7),e.lineTo(m+3.5,p-7),e.closePath(),e.fill()}}label(e,n,a,s,o){e.font="11px ui-monospace, Menlo, monospace";const r=e.measureText(a).width+12,i=Math.min(this.width-r-4,Math.max(4,s-r/2));e.globalAlpha=.95,e.fillStyle=n.ink,e.beginPath(),e.roundRect(i,o-18,r,18,4),e.fill(),e.fillStyle=n.sunken,e.fillText(a,i+6,o-5)}}const ge=1100,Qr=.45;function Ca(t){const e=getComputedStyle(t),n=(a,s)=>e.getPropertyValue(a).trim()||s;return{ink:n("--ink","#16181c"),dim:n("--dim","#6b7280"),rule:n("--rule","#d8dbe1"),sunken:n("--sunken","#f2f4f8"),accent:n("--accent","#1a4b9c"),soft:n("--accent-soft","#6b83b8"),warn:n("--warn","#b4443c"),test:n("--hl-string","#2f6f4e")}}function Zr(t){let e=!1,n=()=>{e=!0};const a=fetch("/data/coverage.json").then(s=>s.ok?s.json():null).catch(()=>null);return fetch("/data/architecture.json").then(s=>s.json()).then(async s=>{const o=await a;e||(n=ei(t,s,o))}).catch(()=>{}),()=>n()}function ei(t,e,n){const a=n&&e.commits.findIndex(W=>W.sha===n.sha),s=n?new Map(Object.entries(n.lines)):null,o=uo(e),r=o.map(Rt),i=new Map,h=(W,F)=>{const G=`${W}:${F}`;let ae=i.get(G);return ae||(ae=go(o[W]??{modules:[],dependencies:[]},{tests:F,width:ge}),i.set(G,ae)),ae},l=o.length-1,c=window.matchMedia("(prefers-reduced-motion: reduce)").matches,d=new Xr(ge,c);let m=l,p=!1,u="boxes",f=!1,y=0;const w=g("canvas",{class:"architecture-canvas","aria-label":"The source of this site: its files as balls, its folders as boxes, and arrows for what needs what"}),k=g("figcaption"),b=g("div",{class:"sparks-host"}),$=g("input",{type:"range",min:0,max:l,step:1,value:m,"aria-label":"Commit"}),I=g("button",{type:"button"},"▶ play the history"),M=g("button",{type:"button"},"tangle it"),v=g("input",{type:"checkbox"}),A=g("div",{class:"architecture-controls"},I,M,g("label",{},v," the tests"),$),j=g("p",{class:"architecture-legend",hidden:!0},g("span",{class:"key file"}),"a file, as full as the tests run it",g("span",{class:"key untested"}),"a file no test reaches",g("span",{class:"key test"}),"a test"),O=(W,F=!1)=>{m=Math.max(0,Math.min(l,W)),$.value=String(m);const G=o[m],ae=e.commits[m];!G||!ae||(d.show(G,h(m,p),{untangling:F,reached:p?wo(G):null,coverage:p&&m===a?s:null}),k.innerHTML=yo(ae,r[m]??Rt(G)),b.innerHTML=bo(r,m))},C=W=>{f=W,I.textContent=f?"❚❚ pause":"▶ play the history",f&&m===l&&O(0),y=0};I.addEventListener("click",()=>C(!f)),M.addEventListener("click",()=>{u=u==="boxes"?"tangle":"boxes",d.setMode(u),M.textContent=u==="boxes"?"tangle it":"untangle it",u==="boxes"&&O(m,!0)}),v.addEventListener("change",()=>{p=v.checked,j.hidden=!p,O(m)}),$.addEventListener("input",()=>{C(!1),O(Number($.value))}),b.addEventListener("click",W=>{const F=b.getBoundingClientRect();C(!1),O(Math.round((W.clientX-F.left)/F.width*l))});const S=W=>{const F=w.getBoundingClientRect();return[(W.clientX-F.left)/F.width*ge,(W.clientY-F.top)/F.height*d.height]};w.addEventListener("mousemove",W=>{const[F,G]=S(W);d.hovered=d.hit(F,G),w.style.cursor=d.hovered.path||d.hovered.box?"pointer":"",w.dataset.hovered=d.hovered.path??d.hovered.box??""}),w.addEventListener("mouseleave",()=>{d.hovered={}}),t.replaceChildren(g("figure",{class:"architecture-figure"},A,w,j,k,b)),O(m);const P=w.getContext("2d");if(!P)return()=>{};const x=qt(w);let E=Ca(t),L=0,R=performance.now(),N=0,D={width:0,height:0};const H=()=>{const W=window.devicePixelRatio||1,F=w.clientWidth||ge,G=Math.round(F*d.height/ge);F===D.width&&Math.abs(G-D.height)<1||(D={width:F,height:G},w.width=Math.round(F*W),w.height=Math.round(G*W),w.style.height=`${G}px`)};H(),window.addEventListener("resize",H);const ce=W=>{N=requestAnimationFrame(ce);const F=Math.min(.05,(W-R)/1e3);R=W,x.onScreen()&&(L++%30===0&&(E=Ca(t)),f&&(y+=F,y>=Qr&&(y=0,m>=l?C(!1):O(m+1))),d.step(F),H(),P.setTransform(w.width/ge,0,0,w.width/ge,0,0),d.draw(P,E))};return N=requestAnimationFrame(ce),()=>{cancelAnimationFrame(N),x.stop(),window.removeEventListener("resize",H)}}const ti={name:"architecture",apps:{architecture:Zr},stills:{architecture:_r}},ni=[{name:"llave de laton",kind:"key",value:111},{name:"cristal magico",kind:"key",value:1112},{name:"llave de casa",kind:"key",value:1314},{name:"llave de la verja",kind:"key",value:2636},{name:"llave del puente",kind:"key",value:3444},{name:"llave del gnomo",kind:"key",value:4636},{name:"barca",kind:"key",value:3233},{name:"llave de la despensa",kind:"key",value:2010},{name:"diario",kind:"weapon",value:1},{name:"matamoscas",kind:"weapon",value:2},{name:"espada de madera",kind:"weapon",value:4},{name:"espada",kind:"weapon",value:8},{name:"espada venenosa",kind:"weapon",value:12},{name:"Thurmei",kind:"weapon",value:16},{name:"camisa",kind:"shield",value:2},{name:"escudo de madera",kind:"shield",value:4},{name:"escudo de escamas",kind:"shield",value:8},{name:"escudo",kind:"shield",value:12},{name:"Rharmei",kind:"shield",value:16},{name:"caramelo",kind:"food",value:2},{name:"judia",kind:"food",value:4},{name:"manzana",kind:"food",value:8},{name:"naranja",kind:"food",value:12},{name:"pocima",kind:"food",value:16}],ai=[{name:"mosca acida",attack:4,defence:0,drops:"cristal magico"},{name:"mosca",attack:0,defence:0,drops:"caramelo"},{name:"mosquito",attack:2,defence:0,drops:"matamoscas"},{name:"polilla",attack:1,defence:1,drops:"camisa"},{name:"cucaracha",attack:1,defence:1,drops:"llave de casa"},{name:"raton",attack:2,defence:2,drops:"judia"},{name:"rana venenosa",attack:2,defence:1,drops:"espada de madera"},{name:"planta carnivora",attack:1,defence:3,drops:"escudo de madera"},{name:"raton salvaje",attack:3,defence:3,drops:"llave de la verja"},{name:"escorpion dorado",attack:12,defence:2,drops:"espada venenosa"},{name:"trucha",attack:3,defence:3,drops:"manzana"},{name:"trucha asesina",attack:4,defence:7,drops:"escudo de escamas"},{name:"minimonstruo aquatico",attack:8,defence:4,drops:"llave del puente"},{name:"lobo",attack:8,defence:6,drops:"manzana"},{name:"lobo asesino",attack:12,defence:7,drops:"escudo"},{name:"ogro",attack:6,defence:10,drops:"naranja"},{name:"gnomo de puente",attack:11,defence:11,drops:"llave del gnomo"},{name:"murcielago",attack:8,defence:8,drops:"judia"},{name:"aranya",attack:14,defence:4,drops:"Thurmei"},{name:"vampiro",attack:12,defence:13,drops:"Rharmei"},{name:"aranya gigante",attack:14,defence:14,drops:"barca"},{name:"monstruo aquatico enorme",attack:32,defence:15,drops:"llave de la despensa"}],si={"0,0":{name:"Bienvenida",exits:[-1,-1,0,-1],holds:"diario",text:`Bienvenido a este juego de aventura. 
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
sus otros habitantes.`}},oi={items:ni,monsters:ai,rooms:si},{items:ri,monsters:ii,rooms:hi}=oi,Zn={"llave de laton":"brass key","cristal magico":"magic crystal","llave de casa":"house key","llave de la verja":"gate key","llave del puente":"bridge key","llave del gnomo":"gnome's key",barca:"boat","llave de la despensa":"pantry key",diario:"newspaper",matamoscas:"fly swatter","espada de madera":"wooden sword",espada:"sword","espada venenosa":"poisoned sword",Thurmei:"Thurmei",camisa:"shirt","escudo de madera":"wooden shield","escudo de escamas":"scale shield",escudo:"shield",Rharmei:"Rharmei",caramelo:"sweet",judia:"bean",manzana:"apple",naranja:"orange",pocima:"potion"},vo={"mosca acida":"acid fly",mosca:"fly",mosquito:"mosquito",polilla:"moth",cucaracha:"cockroach",raton:"mouse","rana venenosa":"poison frog","planta carnivora":"carnivorous plant","raton salvaje":"wild mouse","escorpion dorado":"golden scorpion",trucha:"trout","trucha asesina":"killer trout","minimonstruo aquatico":"small water monster",lobo:"wolf","lobo asesino":"killer wolf",ogro:"ogre","gnomo de puente":"bridge gnome",murcielago:"bat",aranya:"spider",vampiro:"vampire","aranya gigante":"giant spider","monstruo aquatico enorme":"enormous water monster"},li={Bienvenida:"Welcome","Usa las llaves":"Use the keys","Comedor sur":"Dining room, south",Salita:"Sitting room","Huerto de pepinos":"Cucumber patch","Huerto de tomates":"Tomato patch",Caminito:"Little path",Despensa:"Pantry","Aprende a atacar":"Learn to attack",Comedor:"Dining room",Recibidor:"Hall",Patio:"Yard","Huerto de Judias":"Bean patch",Manzanos:"Apple trees",Ciruelos:"Plum trees",Banyo:"Bathroom",Habitacion:"Bedroom","Comedor norte":"Dining room, north",Cocina:"Kitchen","Huerto de calabazas":"Pumpkin patch",Naranjos:"Orange trees",Entrada:"Gate",Nogal:"Walnut trees",Cueva:"Cave","Lago interno":"Underground lake","Centro del lago":"Middle of the lake","Rio salvaje":"Wild river",Rio:"River","Bosque oscuro":"Dark forest","Rio oscuro":"Dark river","Bosque tenebroso":"Gloomy forest","Bosque sombrio":"Shadowy forest","Bosque humedo":"Damp forest",Bosque:"Forest","Claro del Bosque":"Forest clearing","Puente del bosque":"Forest bridge"},se=`The tunnel of the dark, gloomy cave goes on. The walls are damp and
water can be heard running somewhere far off. Walk carefully, or you
will slip or trip.`,qe=`The forest stretches out, dark and mysterious. The light blurs
through the leaves. You can hear the animals and the forest's other
inhabitants.`,tn=`Though it is day, barely a glimmer of light gets in. Bushes, trees
and brambles make the going hard. Something moves in the dark.`,ja=`Little light comes through the leaves of the trees. Brambles and
bushes give way to a small stream. Something moves in the dark.`,ci={"0,0":`Welcome to this adventure game.
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
the apples, they are hardy and get you through the winters.`,"3,0":se,"3,1":se,"3,2":`An immense underground lake opens up before you. It is dark and you
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
but something stirs beneath the surface.`,"4,0":se,"4,1":se,"4,2":se,"4,3":tn,"4,4":`The north bank of the river is dismal. Strange noises can be heard,
and you sense a curse. Here is the bridge that crosses to the south
bank; the air feels hostile and urges you across.`,"4,5":`The river flows under the rocks and the roots of the forest's trees.
The sounds of the forest grow louder and you feel watched.`,"4,6":`A gap between brambles and bushes lets you into the gloomy forest.
Light is scarce and the shadows are threatening.`,"4,7":tn,"5,0":`The tunnel of the dark, gloomy cave goes on. A great cobweb blocks
the way south. One careless move could make you its prey.`,"5,1":se,"5,2":`The tunnel of the dark, gloomy cave goes on. The walls are damp, and
the sound of water grows louder. Walk carefully, or you will slip or
trip.`,"5,3":`The forest is dark, and beside you you have found a great wall of
solid rock to the west: the mountain, probably.`,"5,4":ja,"5,5":qe,"5,6":`The forest stretches out, dark and mysterious. You are in a small
clearing where the sky can be seen. You notice the forest is
restless.`,"5,7":qe,"6,0":se,"6,1":se,"6,2":`You are inside the cave; it is dark and gloomy. The walls are damp and
water can be heard running somewhere far off. You try to look ahead,
but it seems to have no end.`,"6,3":`The forest is dark, and beside you you have found a great wall of
solid rock to the west: the mountain, probably. You notice the rock
is damp; there is very likely a cave.`,"6,4":`Little light comes through the leaves of the trees. Brambles and
bushes give way to a small stream. A bridge crosses the stream to the
eastern part of the forest; there, under a tree, is the house of a
troll you will have to get past if you want to go east.`,"6,5":tn,"6,6":`The forest stretches out, dark, mysterious and restless. You are in a
small clearing where the sky can be seen.`,"6,7":`In this part of the forest the light begins to fail. Tangles of
bushes and brambles slow your steps. You notice something moving
among the shadows.`,"7,0":se,"7,1":se,"7,2":`You are a few steps inside the cave. Cold, damp air reaches you from
within. You try to see where it ends, but you cannot. You hear
murmurs from deep inside.`,"7,3":`Little light comes through the leaves of the trees. A tangle of
climbing plants stirs to the west: it is the mouth of a cave. You
feel a presence watching you.`,"7,4":ja,"7,5":qe,"7,6":qe,"7,7":qe},Pe=(t,e)=>t[e]??e,di=ri.map(t=>({...t,name:Pe(Zn,t.name)})),ui=ii.map(t=>({...t,name:Pe(vo,t.name),drops:Pe(Zn,t.drops)})),mi=Object.fromEntries(Object.entries(hi).map(([t,e])=>[t,{...e,name:Pe(li,e.name),holds:Pe(Zn,Pe(vo,e.holds)),text:ci[t]??e.text}])),pi={items:di,monsters:ui,rooms:mi},Dt=16,{items:Ln,monsters:fi,rooms:gi}=pi,Oa=["norte","sur","este","oeste"],wi={norte:[1,0],sur:[-1,0],este:[0,1],oeste:[0,-1]},Pa=[0,0],La=[1,0],Ft=(t,e)=>t.find(n=>n.name===e);function Na(t){const e=Ft(Ln,t);if(e)return{item:e};const n=Ft(fi,t);return n?{monster:n}:null}class Re{places=new Map;at=[Pa[0],Pa[1]];life=Dt;weapon=null;shield=null;key=null;visited=new Set;constructor(){for(const[e,n]of Object.entries(gi))this.places.set(e,{room:n,exits:[...n.exits],holds:Na(n.holds)});this.visited.add(this.here())}here(){return`${this.at[0]},${this.at[1]}`}place(){const e=this.places.get(this.here());if(!e)throw new Error(`no room at ${this.here()}`);return e}get won(){return this.at[0]===La[0]&&this.at[1]===La[1]}get spent(){return this.life<=0}save(){return JSON.stringify({at:this.at,life:this.life,held:[this.weapon?.name??null,this.shield?.name??null,this.key?.name??null],visited:[...this.visited],places:[...this.places].map(([e,n])=>[e,n.exits,n.holds?"item"in n.holds?n.holds.item.name:n.holds.monster.name:null])})}static load(e){const n=JSON.parse(e),a=new Re;a.at=n.at,a.life=n.life,[a.weapon,a.shield,a.key]=n.held.map(s=>s?Ft(Ln,s)??null:null),a.visited.clear();for(const s of n.visited)a.visited.add(s);for(const[s,o,r]of n.places){const i=a.places.get(s);i&&Object.assign(i,{exits:o,holds:r?Na(r):null})}return a}charted(){return[...this.visited].sort().flatMap(e=>{const n=this.places.get(e);if(!n)return[];const{holds:a}=n;return[{where:e,name:n.room.name,exits:[n.exits[0],n.exits[1],n.exits[2],n.exits[3]],holds:a?"item"in a?{kind:a.item.kind,name:a.item.name}:{kind:"monster",name:a.monster.name}:null}]})}look(){const{room:e,exits:n,holds:a}=this.place();return{name:e.name,text:e.text,...a&&"monster"in a?{monster:a.monster.name}:{},...a&&"item"in a?{item:a.item.name,itemKind:a.item.kind}:{},exits:Oa.flatMap((s,o)=>(n[o]??-1)>=0?[{direction:s,locked:(n[o]??0)>0}]:[]),at:[this.at[0],this.at[1]],life:this.life,...this.weapon?{weapon:this.weapon.name}:{},...this.shield?{shield:this.shield.name}:{},...this.key?{key:this.key.name}:{}}}go(e){const n=this.place(),a=Oa.indexOf(e),s=n.exits[a]??-1;if(s<0)return"There is no way out that way.";if(s>0){if(!this.key||this.key.value!==s)return"The way is locked and you are not carrying the key.";n.exits[a]=0,this.key=null}const[o,r]=wi[e];return this.at=[this.at[0]+o,this.at[1]+r],this.visited.add(this.here()),""}take(){const e=this.place();if(!e.holds||!("item"in e.holds))return"There is nothing here to take!";const{item:n}=e.holds;if(n.kind==="food")return this.life=Math.min(Dt,this.life+n.value),e.holds=null,"Yum yum!";const a=n.kind,s=this[a];return this[a]=n,e.holds=s?{item:s}:null,{weapon:"You have taken a weapon.",shield:"You have taken a shield.",key:"You have taken a key."}[a]}attack(){const e=this.place();if(!e.holds||!("monster"in e.holds))return"There is no monster to attack!";if(!this.weapon)return"You have no weapon to attack with!";const{monster:n}=e.holds,a=[];if(this.weapon.value-n.defence>0){const o=Ft(Ln,n.drops);e.holds=o?{item:o}:null,a.push("The monster has been defeated!")}const s=n.attack-(this.shield?.value??0);return s>0&&(this.life-=s,a.push("OUCH!")),a.join(" ")||"Neither of you gets anywhere."}run(e){const n=e.trim().toLowerCase(),a={norte:"norte",north:"norte",n:"norte",sur:"sur",south:"sur",s:"sur",este:"este",east:"este",e:"este",oeste:"oeste",west:"oeste",w:"oeste"}[n];return a?this.go(a):n==="coger"||n==="take"||n==="get"?this.take():n==="atacar"||n==="attack"||n==="hit"?this.attack():n==="mirar"||n==="look"||n==="l"||n===""?"":"I do not understand you."}}function Se(t,e){const n=Math.max(...t.map(s=>s.length)),a=[];return t.forEach((s,o)=>{for(let r=0;r<s.length;){const i=s[r]??".";let h=r+1;for(;s[h]===i;)h+=1;const l=e[i];i!=="."&&l&&a.push(`<rect x="${r}" y="${o}" width="${h-r}" height="1" fill="${l}"/>`),r=h}}),`<svg class="pixel" viewBox="0 0 ${n} ${t.length}" shape-rendering="crispEdges" aria-hidden="true">${a.join("")}</svg>`}const Me={k:"var(--ink)",a:"var(--accent)",m:"#aeb8c4",g:"#d4a017",b:"#8a5a2b",r:"#c0392b",w:"#f1f1ee",l:"#3f9b4b"},ot={weapon:Se(["......mm",".....mmm","....mmm.","g..mmm..",".gmmm...","..bg....",".b..g...","b......."],Me),shield:Se([".kkkkkk.","kmmrrmmk","kmmrrmmk","krrrrrrk","kmmrrmmk",".kmrrmk.","..kmmk..","...kk..."],Me),food:Se(["....b...","...b.ll.",".rrbrr..","rrrrrrr.","rwrrrrr.","rrrrrrr.",".rrrrr..","..r.r..."],Me),key:Se(["........",".ggg....","g...g...","g...gggg","g...g.g.",".ggg..gg","........","........"],Me),monster:Se(["........","...rr...","..rrrr..",".rwrrwr.",".rkrrkr.","rrrrrrrr","rrkkkkrr","r.r..r.r"],Me),player:Se(["...kk...","..kkkk..","...kk...",".aaaaaa.","a.aaaa.a","..aaaa..","..a..a..",".kk..kk."],Me)},ct=8,yi=["n","s","e","w"];function bi(t,e){const n=new Map(t.map(s=>[s.where,s])),a=[];for(let s=ct-1;s>=0;s-=1)for(let o=0;o<ct;o+=1){const r=`${s},${o}`,i=n.get(r),h=e[0]===s&&e[1]===o;if(!i){a.push(`<span class="cell" data-where="${r}"><span></span></span>`);continue}const l=yi.flatMap((p,u)=>{const f=i.exits[u]??-1;return f<0?[`wall-${p}`]:f>0?[`door-${p}`]:[]}),c=["cell","seen",h?"here":"",...l].filter(Boolean).join(" "),d=i.holds?`<span class="thing${i.holds.kind==="monster"?" monster":""}" title="${T(i.holds.name)}">${ot[i.holds.kind]}</span>`:"",m=h?`<span class="player">${ot.player}</span>`:"";a.push(`<span class="${c}" data-where="${r}" title="${T(i.name)}"><span class="room">${T(i.name)}</span>${d}${m}</span>`)}return`<div class="map" role="img" aria-label="The map: ${t.length} of ${ct*ct} rooms seen">${a.join("")}</div>`}const vi={norte:"north",sur:"south",este:"east",oeste:"west"};function ki(t){const e=["weapon","shield","key"].flatMap(a=>t[a]?[`<span class="held">${ot[a]}${T(t[a]??"")}</span>`]:[]),n=Array.from({length:Dt},(a,s)=>`<span class="heart${s<t.life?" full":""}"></span>`).join("");return`<p class="gear"><span class="hearts" title="${t.life} of ${Dt} life">${n}</span>${e.join("")}</p>`}function xi(t){const e=t.exits.map(({direction:a,locked:s})=>`${vi[a]}${s?" (locked)":""}`),n=[t.weapon&&`weapon:${t.weapon}`,t.shield&&`shield:${t.shield}`,t.key&&`key:${t.key}`].filter(Boolean).join(" ");return`<div class="seen"><h4>===== ${T(t.name)} =====</h4><p>${T(t.text).replace(/\n/g,"<br>")}</p>`+(t.monster?`<p class="monster">${ot.monster}There is a monster here: ${T(t.monster)}</p>`:"")+(t.item?`<p class="item">${ot[t.itemKind??"weapon"]}There is: ${T(t.item)}</p>`:"")+`<p class="exits">Exits: ${e.length?e.join(", "):"none"}.</p>`+ki(t)+`<p class="status">(${t.at[1]},${t.at[0]})| ${T(n)} ${t.life}&gt;</p></div>`}function ko(t){return`<div class="adventure">${bi(t.charted(),t.look().at)}${xi(t.look())}</div>`}const $i=()=>ko(new Re),xo="adventure",Ti=["north","south","east","west","take","attack"];function Si(t){let e=Mi()??new Re;const n=g("div"),a=g("p",{class:"said"}),s=g("input",{type:"text",autocomplete:"off",spellcheck:!1,placeholder:"north, south, east, west, take, attack"});function o(c=""){n.innerHTML=ko(e),a.textContent=e.spent&&!c?"Game over; better luck next time.":c,e.won&&(a.textContent="CONGRATULATIONS! You have reached the pantry."),i()}function r(c){const d=e.run(c);o(d),s.value="",s.focus()}function i(){try{localStorage.setItem(xo,e.save())}catch{}}const h=g("form",{onsubmit:c=>(c.preventDefault(),r(s.value))},g("span",{class:"ps1"},"> "),s),l=g("div",{class:"row"},...Ti.map(c=>g("button",{type:"button",onclick:()=>r(c)},c)),g("button",{type:"button",class:"quiet",onclick:()=>(e=new Re,o(""))},"start again"));return t.replaceChildren(n,a,h,l),o(""),()=>i()}function Mi(){try{const t=localStorage.getItem(xo);return t?Re.load(t):null}catch{return null}}const Ai={name:"adventure",apps:{adventure:Si},stills:{adventure:$i}},Ii=["January","February","March","April","May","June","July","August","September","October","November","December"];function zt(t){const[e,n,a]=t.refreshed.split("-").map(Number),s=`${a} ${Ii[(n??1)-1]} ${e}`,o=`${Math.min(...t.years)} to ${Math.max(...t.years)}`;return`<p class="source">Source: ${T(t.attribution)} <a href="${T(t.dataset)}">The dataset, at its source.</a> This site keeps sums of the finished years ${o}, last added to on ${s}.</p>`}function ea(t,e){const n=t.querySelector("p.source");if(n)return n;const a=document.createElement("div");return fetch(e).then(s=>s.json()).then(s=>{a.innerHTML=zt(s)}).catch(()=>{}),a}const je=[{code:"08019004",name:"Barcelona (Poblenou)",kind:"background",area:"urban"},{code:"08019043",name:"Barcelona (Eixample)",kind:"traffic",area:"urban"},{code:"08019044",name:"Barcelona (Gràcia - Sant Gervasi)",kind:"traffic",area:"urban"},{code:"08019057",name:"Barcelona (Palau Reial)",kind:"background",area:"urban"},{code:"08019058",name:"Barcelona (Observatori Fabra)",kind:"background",area:"suburban"},{code:"08015021",name:"Badalona",kind:"background",area:"urban"},{code:"08187012",name:"Sabadell",kind:"traffic",area:"urban"},{code:"17079003",name:"Girona (Escola de Música)",kind:"traffic",area:"urban"},{code:"25120001",name:"Lleida",kind:"traffic",area:"urban"},{code:"43148028",name:"Tarragona (Parc de la Ciutat)",kind:"background",area:"urban"},{code:"08137001",name:"Montseny (La Castanya)",kind:"background",area:"rural"}];function Nn(t,e){return e==="workdays"?[t.workdays]:e==="weekends"?[t.weekends]:[t.workdays,t.weekends]}const Ei=t=>(t%4===0&&t%100!==0||t%400===0?366:365)*24,nn=t=>t.reduce((e,n)=>e+n.reduce((a,s)=>a+s,0),0);function Ci(t,e){return Object.entries(t.years).map(([n,a])=>{const s=Nn(a,e),o=s.reduce((h,l)=>h+nn(l.counts),0),r=s.reduce((h,l)=>h+nn(l.sums),0),i=Nn(a,"all").reduce((h,l)=>h+nn(l.counts),0);return{year:Number(n),mean:o>0?r/o:Number.NaN,measured:i/Ei(Number(n))}}).filter(({mean:n})=>!Number.isNaN(n)).sort((n,a)=>n.year-a.year)}function ji(t,e){const n=Object.entries(t.years).filter(([a])=>Number(a)>=e.from&&Number(a)<=e.to).flatMap(([,a])=>Nn(a,e.days));return Array.from({length:24},(a,s)=>Array.from({length:12},(o,r)=>{const i=n.reduce((l,c)=>l+(c.sums[r]?.[s]??0),0),h=n.reduce((l,c)=>l+(c.counts[r]?.[s]??0),0);return{mean:h>0?i/h:null,count:h}}))}const Ae=[[0,[0,255,0]],[20,[225,225,0]],[40,[255,0,0]],[60,[225,0,225]],[80,[64,0,64]],[230,[16,0,8]]],Oi=([t,e,n])=>(.299*t+.587*e+.114*n)/255;function ta(t){const e=Math.max(0,Math.min(t,230)),n=Math.max(1,Ae.findIndex(([l])=>l>=e)),[a,s]=Ae[n-1]??Ae[0],[o,r]=Ae[n]??Ae[Ae.length-1],i=(e-a)/(o-a),h=s.map((l,c)=>Math.round(l+((r[c]??0)-l)*i));return{background:`rgb(${h.join(",")})`,light:Oi(h)<.45}}const jt=80,$o=["January","February","March","April","May","June","July","August","September","October","November","December"],To=t=>String(t+1).padStart(2,"0");function Pi(t,e,n){if(t.mean===null)return'<td class="none"></td>';const{background:a,light:s}=ta(t.mean),o=s?' class="deep"':"",r=`${$o[n]}, hour ${To(e)}: ${t.mean.toFixed(1)} µg/m³, the mean of ${t.count} measurements`;return`<td${o} style="background:${a}" title="${r}">${Math.round(t.mean)}</td>`}function Li(t){const e=`<tr><th></th>${$o.map(a=>`<th scope="col">${a.slice(0,3)}</th>`).join("")}</tr>`,n=t.map((a,s)=>`<tr><th scope="row">${To(s)}</th>${a.map((o,r)=>Pi(o,s,r)).join("")}</tr>`);return`<table class="heat graded"><thead>${e}</thead><tbody>${n.join("")}</tbody></table>`}const q=t=>t.toFixed(1);function na(t){if(t<=0)return[0];const e=10**Math.floor(Math.log10(t)),n=t/e>=5?e:t/e>=2?e/2:e/5,a=[];for(let s=0;s<=t;s+=n)a.push(Math.round(s*100)/100);return a}const dt=720,an=190,Q={top:14,right:8,bottom:22,left:34};function So(t,e,n){const a=Math.min(...t),s=Math.max(...t),o=dt-Q.left-Q.right,r=an-Q.top-Q.bottom,i=o/Math.max(1,s-a+1),h=u=>Q.left+(u-a)*i,l=u=>Q.top+r-(u-e)/Math.max(1e-9,n-e)*r,d=na(n-e).map(u=>Math.round((u+e)*100)/100).map(u=>`<line class="grid" x1="${Q.left}" x2="${dt-Q.right}" y1="${q(l(u))}" y2="${q(l(u))}"/><text x="${Q.left-4}" y="${q(l(u)+3)}" text-anchor="end">${u}</text>`).join(""),m=s-a>12?5:1,p=Array.from({length:s-a+1},(u,f)=>a+f).filter(u=>u%m===0).map(u=>`<text x="${q(h(u)+i/2)}" y="${an-6}" text-anchor="middle">${u}</text>`).join("");return{slot:i,x:h,y:l,left:Q.left,right:dt-Q.right,top:Q.top,height:r,levels:u=>u.map(({from:f,to:y,value:w,label:k})=>`<line class="span" x1="${q(h(f))}" x2="${q(h(y)+i)}" y1="${q(l(w))}" y2="${q(l(w))}"/><text class="span" x="${q((h(f)+h(y)+i)/2)}" y="${q(l(w)-5)}" text-anchor="middle">${k}</text>`).join(""),wrap:(u,f)=>`<svg class="years" viewBox="0 0 ${dt} ${an}" role="img" aria-label="${u}">${d}${p}${f}</svg>`}}function Rn(t,e){const n=Math.max(e.top??0,...t.map(({value:c})=>c),1),a=So(t.map(({year:c})=>c),0,n),{x:s,y:o,slot:r}=a,i=t.map(({year:c,value:d,title:m,chosen:p,partial:u,colour:f})=>`<rect class="${["bar",p?"chosen":"",u?"partial":""].filter(Boolean).join(" ")}" data-year="${c}"${f?` style="--bar:${f}"`:""} x="${q(s(c)+r*.15)}" y="${q(o(d))}" width="${q(r*.7)}" height="${q(o(0)-o(d))}"/><rect class="hit" data-year="${c}" x="${q(s(c))}" y="${a.top}" width="${q(r)}" height="${a.height}"><title>${m}</title></rect>`).join(""),h=(e.references??[]).map(({value:c,label:d})=>`<line class="reference" x1="${a.left}" x2="${a.right}" y1="${q(o(c))}" y2="${q(o(c))}"/><text class="reference" x="${a.right-2}" y="${q(o(c)-3)}" text-anchor="end">${d}</text>`).join(""),l=a.levels(e.spans??[]);return a.wrap(e.label,`${i}${h}${l}`)}const Ni=.75,Ri=[{value:40,label:"EU limit, 40"},{value:10,label:"WHO guideline, 10"}];function Di(t,e){const n=t.map(({year:a,mean:s,measured:o})=>{const r=o<Ni,i=r?`, from only ${Math.round(o*100)}% of the year's hours`:"";return{year:a,value:s,partial:r,colour:ta(s).background,chosen:a>=e.from&&a<=e.to,title:`${a}: ${s.toFixed(1)} µg/m³${i}`}});return Rn(n,{label:"Mean NO2 of each year, µg/m³",top:jt,references:Ri})}const Ra={all:"every day of the week",workdays:"Monday to Friday",weekends:"Saturdays and Sundays"};function Fi(){const t=Array.from({length:jt/5+1},(n,a)=>ta(a*5).background),e=[0,20,40,60,jt].map(n=>`<span>${n===jt?`${n}+`:n}</span>`).join("");return`<div class="scale" aria-hidden="true"><div class="ramp" style="background:linear-gradient(to right,${t.join(",")})"></div><div class="ticks">${e}</div><div class="ticks words"><span>clean</span><span>EU limit</span><span>twice it</span></div></div>`}function Mo(t,e){const n=Object.keys(t.years).map(Number),a=Math.max(e.from,Math.min(...n)),s=Math.min(e.to,Math.max(...n)),o=a===s?String(a):`${a}–${s}`;return`<figure class="no2"><figcaption><strong>${t.name}</strong> · ${t.kind}, ${t.area} · mean NO2 in µg/m³ by hour of the day and month of the year · ${Ra[e.days]}, ${o}</figcaption>`+Li(ji(t,e))+Fi()+`<h4>The mean of each year, ${Ra[e.days]}</h4>`+Di(Ci(t,e.days),{from:a,to:s})+"</figure>"}function Qe(t){const e=Object.keys(t.years).map(Number);return{from:Math.min(...e),to:Math.max(...e),days:"all"}}const Bi=[["all","every day"],["workdays","Monday to Friday"],["weekends","Saturday and Sunday"]];function Wi(t){const e=new Map,n=ea(t,"/data/no2/index.json"),a=g("div");a.append(...t.querySelectorAll("figure"));let s=null,o={from:0,to:9999,days:"all"},r=!1;const i=(w,k=String(w))=>g("option",{value:w},k),h=g("select",{onchange:()=>{f(h.value)}},...je.map(({code:w,name:k})=>i(w,k))),l=g("select",{onchange:()=>u({days:l.value})},...Bi.map(([w,k])=>i(w,k))),c=g("select",{onchange:()=>u({from:Number(c.value),to:Math.max(Number(c.value),o.to)})}),d=g("select",{onchange:()=>u({to:Number(d.value),from:Math.min(Number(d.value),o.from)})}),m=g("button",{type:"button",onclick:()=>s&&u(Qe(s))},"every year");function p(){s&&(a.innerHTML=Mo(s,o),c.value=String(o.from),d.value=String(o.to),l.value=o.days)}function u(w){o={...o,...w},p()}async function f(w){const k=e.get(w)??fetch(`/data/no2/${w}.json`).then(b=>b.json());e.set(w,k);try{const b=await k;if(r||h.value!==w)return;const $=Qe(b),I=s!==null&&(o.from!==Qe(s).from||o.to!==Qe(s).to),M=Object.keys(b.years).map(Number).filter(j=>j>=o.from&&j<=o.to),v=I&&M.length>0?{from:Math.min(...M),to:Math.max(...M)}:$;s=b,o={...v,days:o.days};const A=Object.keys(b.years);c.replaceChildren(...A.map(j=>i(j))),d.replaceChildren(...A.map(j=>i(j))),p()}catch{e.delete(w),a.replaceChildren(g("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}a.addEventListener("click",w=>{const k=w.target?.closest("[data-year]")?.getAttribute("data-year");k&&u({from:Number(k),to:Number(k)})});const y=g("div",{class:"row"},g("label",{},"Station ",h),g("label",{},"Days ",l),g("label",{},"Years ",c," to ",d),m);return t.replaceChildren(y,a,n),f(h.value),()=>{r=!0}}const Hi="https://analisi.transparenciacatalunya.cat/resource";function Ao(t,e){const n=new URL(`${Hi}/${t}.json`);for(const[a,s]of Object.entries(e))s!==void 0&&n.searchParams.set(`$${a}`,String(s));return n.toString()}const Da="tasf-thgu",Io=Array.from({length:24},(t,e)=>String(e+1).padStart(2,"0")),qi=0,zi=6,ut=()=>Array.from({length:12},()=>new Array(24).fill(0)),_i=()=>({workdays:{sums:ut(),counts:ut()},weekends:{sums:ut(),counts:ut()}});function Gi(t){if(!Array.isArray(t))throw new Error("the portal did not answer with rows");if(t.length===0)throw new Error("the portal answered with no rows");return t}function Yi(t,e){const n=Number(e.month)-1;Io.forEach((a,s)=>{const o=t.sums[n],r=t.counts[n];if(!o||!r)throw new Error(`month ${e.month} is not a month`);o[s]=(o[s]??0)+Number(e[`s${a}`]??0),r[s]=(r[s]??0)+Number(e[`n${a}`]??0)})}const Ui={name:"no2",directory:"public/data/no2",firstYear:1991,files:je.map(t=>`${t.code}.json`),about:{measures:"NO2, hourly, µg/m³",network:"Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica",attribution:"Generalitat de Catalunya, Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica. Dades obertes.",dataset:`https://analisi.transparenciacatalunya.cat/d/${Da}`,stations:je},requestsFor(t){const e=je.map(a=>`'${a.code}'`).join(","),n=Io.map(a=>`sum(h${a}) as s${a}, count(h${a}) as n${a}`).join(", ");return[Ao(Da,{select:`codi_eoi, date_extract_m(data) as month, date_extract_dow(data) as dow, count(*) as days, ${n}`,where:`contaminant='NO2' and codi_eoi in (${e}) and data between '${t}-01-01T00:00:00' and '${t}-12-31T23:59:59'`,group:"codi_eoi,month,dow",limit:5e3})]},withYear(t,e,n){const a=Gi(n[0]);if(a.some(o=>Number(o.days)>5))throw new Error("some days are in the portal twice");if(!a.some(o=>o.month==="12"))throw new Error("the year does not reach December yet");const s=new Map;for(const o of a){const r=o.codi_eoi??"",i=s.get(r)??_i();s.set(r,i);const h=Number(o.dow);Yi(h===qi||h===zi?i.weekends:i.workdays,o)}return Object.fromEntries(je.map(o=>{const r=`${o.code}.json`,i=s.get(o.code),h={...t[r]?.years,...i?{[e]:i}:{}};return[r,{...o,years:h}]}))}},Ji=t=>{const e=JSON.parse(t(`/data/no2/${je[0]?.code}.json`)),n=JSON.parse(t("/data/no2/index.json"));return Mo(e,Qe(e))+zt(n)},Ki={name:"air-quality",apps:{no2:Wi},stills:{no2:Ji},sources:[Ui]},Vi=9,Fa=8,J={days:5,hoursADay:Fa,dayNames:["Mon","Tue","Wed","Thu","Fri"],hourNames:Array.from({length:Fa},(t,e)=>`${Vi+e}:00`)},ze=t=>Math.max(0,Math.min(100,t));function Ba(t){const{focus:e,fatigue:n,featureSize:a,weeks:s,calendar:o,meetingTypes:r}=t,i=[];let h=0,l=0;for(let c=0;c<s;c+=1)for(let d=0;d<J.days;d+=1){let m=0,p=0;for(let u=0;u<J.hoursADay;u+=1){const f=r[o[`${d}-${u}`]??""];if(f){m=ze(m+f.focus),p=ze(p+f.fatigue),i.push({week:c,day:d,hour:u,inMeeting:!0,hourFocus:m,hourFatigue:p,hourProductivity:0,accumulatedProductivity:h,completedFeatures:l,featureCompleted:!1});continue}m=ze(m+e),p=ze(p+n);const y=ze(m-p),w=a-h,k=y>w,b=k?w:y;k?(l+=1,h=0):h+=b,i.push({week:c,day:d,hour:u,inMeeting:!1,hourFocus:m,hourFatigue:p,hourProductivity:b,accumulatedProductivity:h,completedFeatures:l,featureCompleted:k}),k&&(m=0)}}return i}function mt(){return Array.from({length:J.hoursADay},()=>new Array(J.days).fill(0))}function pt(t,{hour:e,day:n},a){const s=t[e];s&&(s[n]=(s[n]??0)+a)}function Wa(t,{featureSize:e,weeks:n}){const a=t[t.length-1],s=a?.completedFeatures??0,o=a?.accumulatedProductivity??0,r=s+Math.round(10*o/e)/10,i=s*e+o,h=Array.from({length:J.days},()=>({productivity:0,features:0,meetings:0})),l={focus:mt(),fatigue:mt(),productivity:mt(),features:mt()};for(const d of t){const m=h[d.day];m.productivity+=d.hourProductivity,d.featureCompleted&&(m.features+=1),d.inMeeting&&(m.meetings+=1),pt(l.focus,d,d.hourFocus),pt(l.fatigue,d,d.hourFatigue),pt(l.productivity,d,d.hourProductivity),d.featureCompleted&&pt(l.features,d,1)}const c=d=>d.map(m=>m.map(p=>n>0?p/n:0));return{totalFeatures:r,totalProductivity:i,averageFeaturesPerWeek:n>0?r/n:0,averageProductivityPerWeek:n>0?i/n:0,days:h,hours:{focus:c(l.focus),fatigue:c(l.fatigue),productivity:c(l.productivity),features:l.features}}}const aa={width:480,height:240,pad:{top:10,right:10,bottom:34,left:36}},{width:Ha,height:sn,pad:Z}=aa;function Eo(t,e,n,a){const s=Ha-Z.left-Z.right,o=sn-Z.top-Z.bottom,r=l=>Z.top+o-(t>0?l/t*o:0),i=a.map(l=>`<line class="grid" x1="${Z.left}" x2="${Ha-Z.right}" y1="${r(l)}" y2="${r(l)}"/><text x="${Z.left-4}" y="${r(l)+3}" text-anchor="end">${l}</text>`).join(""),h=(n>1?[1,Math.ceil(n/2),n]:[]).filter((l,c,d)=>d.indexOf(l)===c).map(l=>`<text x="${Z.left+(l-1)/Math.max(1,n-1)*s}" y="${sn-Z.bottom+14}" text-anchor="middle">${l}</text>`).join("");return`${i}${h}<text x="${Z.left+s/2}" y="${sn-6}" text-anchor="middle">${e.x}</text><text transform="translate(9 ${Z.top+o/2}) rotate(-90)" text-anchor="middle">${e.y}</text>`}const{width:qa,height:_e,pad:K}=aa;function Co(t,e,n){const a=Math.max(...t.map(u=>u.values.length),1),s=Math.max(1,...t.flatMap(u=>u.values)),o=qa-K.left-K.right,r=_e-K.top-K.bottom,i=o/a,h=i*.7/t.length,l=u=>K.top+r-u/s*r,c=t.map((u,f)=>u.values.map((y,w)=>{const k=K.left+w*i+i*.15+f*h;return`<rect class="${u.className}" x="${k.toFixed(1)}" y="${l(y).toFixed(1)}" width="${h.toFixed(1)}" height="${(K.top+r-l(y)).toFixed(1)}"><title>${u.name}: ${Math.round(y*10)/10}</title></rect>`}).join("")).join(""),d=(n??[]).map((u,f)=>`<text x="${K.left+f*i+i/2}" y="${_e-K.bottom+14}" text-anchor="middle">${u}</text>`).join(""),m=t.map((u,f)=>`<rect class="${u.className}" x="${K.left+f*90}" y="${_e-K.bottom+20}" width="10" height="3"/><text x="${K.left+f*90+14}" y="${_e-K.bottom+24}">${u.name}</text>`).join(""),p=Eo(s,e,n?0:a,na(s));return`<svg viewBox="0 0 ${qa} ${_e}" role="img" aria-label="${e.y} by ${e.x}">${p}${c}${d}${m}</svg>`}const za={sizeAt(t){return t<=500?t:t<=750?500+(t-500)*2:t<1e3?1e3+(t-750)*35:1e4},positionOf(t){return t<=500?t:t<=1e3?500+(t-500)/2:t<1e4?750+(t-1e3)/35:1e3}};function ft(t,e){const n=e.flat(),a=Math.min(...n),s=Math.max(...n),o=g("div",{class:"week"},g("span"),...J.dayNames.map(r=>g("span",{class:"head"},r)));return e.forEach((r,i)=>{o.append(g("span",{class:"hour"},J.hourNames[i]??""));for(const h of r){const l=s>a?(h-a)/(s-a):0;o.append(g("span",{class:"cell",style:`--heat:${(.1+l*.9).toFixed(2)}`},String(Math.round(h))))}}),g("div",{},g("h4",{},t),o)}function Xi(t){const e={focus:25,fatigue:15,featureSize:300,weeks:8},n={"🍽️ Lunch":{focus:-100,fatigue:-100},"🏃 Sprint plan":{focus:-100,fatigue:50},"😴 Boring":{focus:-50,fatigue:-25}},a={};for(let C=0;C<J.days;C+=1)a[`${C}-3`]="🍽️ Lunch";let s="🏃 Sprint plan",o=null;const r=g("div",{class:"figures"}),i=g("div",{class:"chart"}),h=g("div",{class:"maps"}),l=g("div",{class:"week"}),c=g("select"),d=g("input",{type:"number",min:-100,max:100}),m=g("input",{type:"number",min:-100,max:100}),p=g("input",{type:"text",placeholder:"New meeting name",size:16}),u=(C,S,P,x,E=R=>R,L=R=>R)=>{const R=g("output",{},String(e[C])),N=g("input",{type:"range",min:P,max:x,value:L(e[C]),oninput:()=>{e[C]=E(Number(N.value)),R.textContent=String(e[C]),O()}});return g("label",{},`${S}: `,R,N)},f=g("div",{class:"dials"},u("focus","Focus an hour",0,100),u("fatigue","Fatigue an hour",0,100),u("featureSize","Feature size",0,1e3,za.sizeAt,za.positionOf),u("weeks","Weeks",1,16));function y(){c.replaceChildren(...Object.keys(n).map(S=>g("option",{value:S,selected:S===s},S)));const C=n[s];d.value=String(C?.focus??0),m.value=String(C?.fatigue??0)}c.addEventListener("change",()=>{s=c.value,y()});const w=()=>{n[s]={focus:Number(d.value)||0,fatigue:Number(m.value)||0},O()};d.addEventListener("change",w),m.addEventListener("change",w);const k=()=>{const C=p.value.trim();!C||n[C]||(n[C]={focus:0,fatigue:0},s=C,p.value="",y())},b=g("div",{class:"row"},g("span",{},"Paint: "),c,g("span",{},"focus "),d,g("span",{},"fatigue "),m,p,g("button",{type:"button",onclick:k},"Add"));let $=null;const I=C=>{if($==="add"&&!a[C])a[C]=s;else if($==="remove"&&a[C])delete a[C];else return;O()};function M(){l.replaceChildren(g("span"),...J.dayNames.map(C=>g("span",{class:"head"},C))),J.hourNames.forEach((C,S)=>{l.append(g("span",{class:"hour"},C));for(let P=0;P<J.days;P+=1){const x=`${P}-${S}`,E=a[x];l.append(g("span",{class:E?"slot meeting":"slot",title:E??"free",onpointerdown:L=>{L.preventDefault(),$=a[x]?"remove":"add",I(x)},onpointerenter:()=>{$&&I(x)}},E?E.slice(0,2):""))}})}window.addEventListener("pointerup",()=>{$=null});const v=g("div",{class:"row"}),A=()=>{o={summary:Wa(Ba({...e,calendar:a,meetingTypes:n}),e),weeks:e.weeks},O()},j=()=>{o=null,O()};function O(){M();const C=Ba({...e,calendar:a,meetingTypes:n}),S=Wa(C,e),P=e.weeks*J.days*J.hoursADay;r.replaceChildren(g("div",{class:"clean"},g("strong",{},S.totalFeatures.toFixed(1)),"features finished"),g("div",{},g("strong",{},S.averageFeaturesPerWeek.toFixed(2)),"features a week"),g("div",{},g("strong",{},Math.round(S.totalProductivity/P).toString()),"productivity an hour"),g("div",{},g("strong",{},String(P)),"hours simulated")),v.replaceChildren(o?g("span",{},`Baseline: ${o.summary.averageFeaturesPerWeek.toFixed(2)} features a week over ${o.weeks} weeks; now ${S.averageFeaturesPerWeek.toFixed(2)}. `):g("span",{},"Keep this run to compare against: "),g("button",{type:"button",onclick:A},o?"Save again":"Save as baseline")),o&&v.append(g("button",{type:"button",onclick:j},"Clear")),i.innerHTML=Co([{name:"Productivity",className:"clean",values:S.days.map(x=>x.productivity/e.weeks)},{name:"Features ×100",className:"debt",values:S.days.map(x=>x.features/e.weeks*100)}],{x:"",y:"A day, on average"},J.dayNames),i.prepend(g("h4",{},"The shape of a week")),h.replaceChildren(ft("Focus",S.hours.focus),ft("Fatigue",S.hours.fatigue),ft("Productivity",S.hours.productivity),ft("Features finished",S.hours.features))}y(),t.append(f,b,g("div",{class:"charts"},l,i),r,v,h),O()}const Qi={name:"developer-meetings",apps:{"developer-meetings":Xi}},Ge={exams:[.01,.01,.02,.01,.05,.2,.05,.1,.2,.3,.5,.4,.3,.2,.1,.05,.1,.3,.8,1,.4],labs:[.01,.02,.03,.04,.06,.09,.12,.17,.23,.32,.44,.48,.58,.78,.87,.89,.78,.75,.62,.45,.2]},on={x:{frames:1,pace:1},normal:{frames:2,pace:1},normal1:{frames:2,pace:1},normal2:{frames:2,pace:1},est:{frames:7,pace:5},zz:{frames:2,pace:5},bt:{frames:6,pace:1},http:{frames:8,pace:2},pract:{frames:5,pace:1},no:{frames:4,pace:3},bar0:{frames:6,pace:1},amig:{frames:4,pace:3},suplica:{frames:2,pace:3}};class jo{static everyImage=Object.entries(on).flatMap(([e,{frames:n}])=>Array.from({length:n},(a,s)=>`${e}${s}`));series="x";frame=0;wait=0;after=null;shaking=-1;get image(){return`${this.series}${this.frame}`}play(e){if(this.shaking>=0){this.after=e;return}e!==this.series&&(this.wait=0),this.show(e)}flash(e,n){this.shaking<0&&(this.after=this.series),this.shaking=n,this.show(e)}stop(){this.shaking=-1,this.after=null,this.series="x",this.frame=0}beat(){if(this.shaking===0&&this.after&&this.show(this.after),this.shaking>=0&&(this.shaking-=1),this.wait>0&&(this.wait-=1),this.wait>0)return;const{frames:e,pace:n}=on[this.series];this.frame=(this.frame+1)%e,this.wait=n}show(e){this.series=e,this.frame%=on[e].frames}}const X=3,we=16,Zi=25,de=20,_a=22,rn=200,hn=100,ln=100,Ga=30,Ya=-10,eh=.05,th=.3,Ua=10/X,Ja={superior:40,tecnica:25},nh={step:0,hour:0,day:0,term:1,doing:"idle",boredom:0,stress:0,labHabit:10,studyHabit:10,chatHabit:10,barHabit:10,friends:10,sleep:0,terminal:0,exams:Array(10).fill(0),labs:Array(10).fill(0),enrolled:4,passed:0,left:9,selection:!0,alfas:Array(6).fill(1),asks:null,suggested:0,ended:null,said:[]},ah=`Sorry, but you no longer belong to this faculty. :(



Normal.`,sh=`Hey, what are you playing at????
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
attention, doesn't it?)`,oh=`Don't you know that stress is really bad
for your health? Your Fibergochi has had to
leave the faculty, be more careful next time!
See if you can take its mind off things a little,
make new and interesting friends... or not so much...`;class Dn{constructor(e,n={}){this.random=e;const a={...nh,...n};this.s={...a,exams:[...a.exams],labs:[...a.labs],alfas:[...a.alfas],said:[...a.said]},this.s.ended===null&&this.show(this.s.doing)}random;s;sprite=new jo;beats=0;get state(){return{...this.s,exams:[...this.s.exams],labs:[...this.s.labs],alfas:[...this.s.alfas],said:[...this.s.said]}}get picture(){return this.sprite.image}get clock(){const e=this.s.step+this.s.hour*X,n=e*30%60;return`${this.s.day+1}, ${Math.floor(e/(X*we)*24)}:${n<10?"0":""}${n}h (${this.s.term})`}get examsPending(){return this.studyLeft>0}get labsPending(){return this.labLeft>0}get studyLeft(){return this.taken(this.s.exams).reduce((e,n)=>e+Math.max(n,0),0)}get labLeft(){return this.taken(this.s.labs).reduce((e,n)=>e+Math.max(n,0),0)}get hasTerminal(){return this.s.terminal>0}get lampsLit(){return this.s.day<de||this.beats%3===1}get enrolment(){return{most:Math.min(10,this.s.left),suggested:this.s.suggested}}get alive(){return this.s.ended===null}get waiting(){return this.s.said.length>0||this.s.asks!==null}step(){!this.alive||this.waiting||(this.keepHabits(),this.studyOrWork(),this.holdTerminal(),this.browseOn(),this.getBored(),this.calmDown(),this.alive&&(this.searchTerminal(),this.followHabits(),this.stayAtBar(),this.s.step+=1,this.s.step>=X&&(this.s.step=0,this.nextHour())))}animate(){!this.alive||this.waiting||(this.beats+=1,this.sprite.beat())}studyOrSleep(){this.alive&&(this.s.day<=de?this.set(this.random()<.5?"studying":"asleep"):this.sprite.flash("no",24))}browse(){this.alive&&(this.s.terminal?this.set("browsing"):this.sprite.flash("no",14))}goToBar(){this.alive&&this.set("bar")}makeFriends(){this.alive&&this.set("friends")}lookForTerminal(){this.alive&&(this.s.terminal<=0?this.set("looking"):this.sprite.flash("no",10))}beg(){if(!this.alive)return;const{exams:e,labs:n}=this.s,a=r=>e[r]+n[r],s=this.taken(e).map((r,i)=>i).filter(r=>a(r)>0);if(this.s.day<de||s.length===0)return this.sprite.flash("no",10);const o=s.reduce((r,i)=>a(i)<a(r)?i:r);this.sprite.flash("suplica",20),this.random()<th&&(e[o]-=this.random()*Ua),this.s.stress+=Ua*this.random()}alfa(){if(!this.alive)return;const{term:e,left:n,selection:a,alfas:s,enrolled:o,exams:r,labs:i,day:h,passed:l}=this.s;let c=`Score: this is term ${e} you have been at the FIB.

`;if(a)c+=`You are doing the Selection Phase.
You have ${n} credits left to finish it.

`;else{c+=`You are in the middle of the degree, and have ${n} credits left to finish.

`;const d=s.filter(p=>p<1).length,m=s.filter(p=>p<=.5).length;d>0?(c+=`Of your last six alfa parameters at most, you have:
 - ${d} notable.
`,m>0&&(c+=` - of these, ${m} dangerous.
`),c+=`
`,s.forEach((p,u)=>{p<1&&(c+=`The alfa of ${s.length-u} terms ago:	${Math.round(p*100)/100}.
`)}),c+=`
`):c+=`You have an impeccable record. (swot)

`}if(h<=_a){const d=[0,0,0,0,0];for(let p=0;p<o;p+=1){const u=r[p]+i[p];d[u<=0?0:u<=2*X?1:u<=5*X?2:u<=8*X?3:4]+=1}const m=["subjects going well","that will go well with a little effort","subjects you should get down to","subjects you find hard","subjects you had better pray for"];d.forEach((p,u)=>{p>0&&(c+=`You have ${p} ${m[u]}.
`)}),c+=`You are enrolled in ${o} subjects in all.`}else c+=`Of ${o}, ${l} are passed.`;this.s.said.push(c)}dismiss(){this.s.said.shift()}enrol(e){return this.s.asks!=="enrol"||!Number.isInteger(e)||e<1||e>this.enrolment.most?!1:(this.s.enrolled=e,this.s.asks=null,!0)}choose(e){this.s.asks==="degree"&&(this.s.left=Ja[e],this.askEnrolment())}keepHabits(){const{doing:e}=this.s;e==="lab"?this.s.labHabit+=1:e==="studying"?this.s.studyHabit+=1:e==="browsing"?this.s.chatHabit+=1:e==="friends"?this.s.friends+=1:e==="bar"&&(this.s.barHabit+=1,this.s.friends+=.4),this.s.friends=Math.min(this.s.friends,ln)}studyOrWork(){if(this.s.doing==="lab"){if(!this.labsPending)return this.set("idle");const e=this.easiest(this.s.labs);100-this.s.exams[e]>this.random()*100&&(this.s.labs[e]-=1)}else if(this.s.doing==="studying"){if(!this.examsPending)return this.set("idle");this.s.exams[this.easiest(this.s.exams)]-=1}}easiest(e){const{exams:n,labs:a}=this.s;let s=this.taken(e).findIndex(r=>r>0),o=n[s]+a[s]+s;for(let r=s+1;r<this.s.enrolled;r+=1){const i=n[r]+a[r];o>i&&e[r]>0&&(s=r,o=i+r)}return s}holdTerminal(){if(this.s.day>de||this.s.terminal<=0){this.s.terminal=0;return}this.s.doing==="idle"&&this.labsPending&&this.set("lab"),this.s.doing==="lab"?this.s.terminal=Math.round(this.s.terminal+this.random()):(this.s.doing!=="browsing"||this.random()<=Ge.labs[this.s.day])&&(this.s.terminal-=1),this.s.terminal=Math.max(this.s.terminal,0)}browseOn(){this.s.doing==="browsing"&&(this.s.boredom+=Math.round(.5*this.random()),this.s.terminal<=0&&this.set("idle"))}getBored(){const{doing:e}=this.s;if(e==="idle"?(this.s.boredom+=1,this.s.boredom%10===0&&this.set("idle")):e==="studying"?this.s.boredom+=.1:e==="lab"?this.s.boredom+=this.random()/2:e==="asleep"?this.s.boredom-=1:e==="bar"&&(this.s.boredom-=this.random()),this.s.boredom>rn)return this.end("bad",sh);this.s.boredom=Math.max(this.s.boredom,-rn/2)}calmDown(){this.s.doing==="bar"&&(this.s.stress-=1),this.s.stress=Math.max(this.s.stress,0),this.s.stress>hn&&this.end("bad",oh)}searchTerminal(){const{doing:e,day:n}=this.s;if(e==="looking"&&n<=de&&this.s.terminal<=0){this.s.stress+=1;const a=(.5+Ge.exams[n])*(1-Ge.labs[n]),s=this.random();if(s<=a){const o=(s<=a/2?4:2)*(X+1);this.s.terminal=Math.round(o*this.random()),this.set("idle")}}else e==="looking"&&this.set("idle");n>de&&(this.s.terminal=0)}followHabits(){const{doing:e,hour:n}=this.s,a=this.s.labHabit/this.s.chatHabit/2,s=this.s.chatHabit/this.s.labHabit/2,o=this.s.studyHabit/this.s.barHabit/2,r=this.labsPending,i=h=>this.random()<h;if(this.s.terminal>0)if(e==="lab")a<=.5?i(.5-a)&&this.set("browsing"):r||this.set(this.random()>(.5-s)*2?"browsing":"idle");else if(e==="browsing")if(r){const[h,l]=this.s.terminal<X?[2,1]:[1,2];(s<=.5?i((.5-s)*h):this.random()>(.5-a)*l)&&this.set("lab")}else s<.5&&this.random()*.4>s&&this.set("idle");else(e==="idle"||e==="studying")&&(this.s.friends>ln/2&&i(.5-o)&&this.set("bar"),s<=.5&&i(.5-s)&&this.set("browsing"),a<=.5&&i(.5-a)&&r&&this.set("lab"));else if(e==="studying"&&o<=.5){const h=n<we/4?X:n>3*we/4?X/2:1;this.random()*h<.5-o&&this.set("bar")}}stayAtBar(){this.s.doing==="bar"&&this.s.friends/ln<this.random()/2&&this.set("idle")}nextHour(){if(this.getSleepy(),this.s.doing==="lab"&&(this.s.boredom+=Math.round(4*this.random())),this.classInTheRoom(),this.s.hour<we-1){this.s.hour+=1;return}this.s.hour=0,this.nextDay()}getSleepy(){const e=this.s.hour<we*3/4;this.s.doing!=="asleep"?(e?this.s.sleep+=1:this.s.doing==="idle"&&this.s.sleep>5?this.set("asleep"):this.s.sleep+=2+(this.s.terminal>0?1:0),this.s.sleep>(this.s.terminal>0?Ga*1.25:Ga)&&this.set("asleep")):e&&this.s.sleep<Ya/4?this.set("idle"):(this.s.sleep-=2,this.s.sleep<Ya&&this.set("idle"))}classInTheRoom(){const{hour:e}=this.s;e>=we/3&&e<=2*we/3&&this.random()<eh&&(this.s.terminal=0)}nextDay(){const{day:e}=this.s;if(this.fadeHabits(),e<de?this.bringWork():e===_a&&this.mark(),e<Zi-1){this.s.day+=1;return}this.s.day=0,this.nextTerm()}fadeHabits(){const e=n=>Math.max(1,Math.round(n*.9));this.s.labHabit=e(this.s.labHabit),this.s.studyHabit=e(this.s.studyHabit),this.s.barHabit=e(this.s.barHabit),this.s.chatHabit=e(this.s.chatHabit),this.s.friends=e(this.s.friends)}bringWork(){const e=this.s.day+5;if(this.s.day===0)for(let n=e;n>=0;n-=1)this.bringWorkFor(n);else e<de&&this.bringWorkFor(e)}bringWorkFor(e){for(let n=0;n<this.s.enrolled;n+=1){const a=X*((n+1)/2)+1;this.random()<=Ge.labs[e]&&(this.s.labs[n]+=Math.round(a*this.random())),this.random()<=Ge.exams[e]&&(this.s.exams[n]+=Math.round(a*this.random()))}}mark(){for(let e=0;e<this.s.enrolled;e+=1)this.s.exams[e]+this.s.labs[e]<X&&(this.s.passed+=1);this.s.alfas=[...this.s.alfas.slice(1),this.s.alfas[5]],this.s.exams.fill(0),this.s.labs.fill(0)}nextTerm(){const{enrolled:e,passed:n,selection:a,term:s}=this.s;if(this.s.alfas[5]=a?1:e?n/e:0,this.s.alfas.filter(o=>o<.5).length>3)return this.end("bad","You have 4 Alfa parameters below 0.5, bye, bye.");if(this.s.left-=n,this.s.passed=0,this.s.term+=1,this.s.left<=0){if(!a)return this.end("good",`Very Good!
You did it!!!!!!!
Your Fibergochi has finished the degree!!!!!
`,`ERROR 315: in module KERNEL386.EXE,
page 0137:0A285F43.
An UNFORESEEN situation has occurred,
we are very sorry, but we thought that
nobody would ever get here, where no
other man has gone before!.`);this.s.selection=!1,this.s.said.push("You have SUCCESSFULLY finished the SELECTION PHASE!!!!!"),this.s.asks="degree";return}if(a&&s===2&&this.s.left>8)return this.end("bad","BACARRA!!!!");if(a&&s>3){if(this.s.left>2)return this.end("bad","You have not got through the Selection Phase.");this.s.said.push(`You have not passed everything, but it is not serious.
YOU HAVE GOT THROUGH THE SELECTION PHASE, but... They will not throw you out, but you have to go to
the Técnica (or rather, they make you).`),this.s.left=Ja.tecnica,this.s.selection=!1}this.askEnrolment()}askEnrolment(){this.s.asks="enrol",this.s.suggested=Math.min(Math.round(this.random()*4)+3,this.s.left)}taken(e){return e.slice(0,this.s.enrolled)}set(e){this.s.doing=e,this.show(e)}show(e){if(e==="lab")this.sprite.play("pract");else if(e==="studying")this.sprite.play("est");else if(e==="asleep")this.sprite.play("zz");else if(e==="looking")this.sprite.play("bt");else if(e==="friends")this.sprite.play("amig");else if(e==="browsing")this.sprite.play("http");else if(e==="bar")this.sprite.play("bar0");else{const n=this.s.boredom+this.s.stress,a=rn+hn;n<a/3?this.sprite.play("normal"):n<a/1.5?this.sprite.play("normal1"):this.sprite.play("normal2"),this.s.stress>hn*2/3&&this.sprite.play("normal2")}}end(e,...n){this.s.said.push(...n),e==="bad"&&this.s.said.push(ah),this.s.ended=e,this.s.asks=null,this.sprite.stop()}}const rh=["step","hour","day","term","boredom","stress","labHabit","studyHabit","chatHabit","barHabit","friends","sleep","terminal","enrolled","passed","left","suggested"],ih=["idle","asleep","studying","browsing","looking","lab","bar","friends"],cn=(t,e)=>Array.isArray(t)&&t.length===e&&t.every(n=>Number.isFinite(n));function hh(t){let e;try{e=JSON.parse(t??"null")}catch{return null}return typeof e!="object"||e===null||Array.isArray(e)?null:rh.every(a=>Number.isFinite(e[a]))&&ih.includes(e.doing)&&cn(e.exams,10)&&cn(e.labs,10)&&cn(e.alfas,6)&&typeof e.selection=="boolean"&&[null,"enrol","degree"].includes(e.asks)&&[null,"good","bad"].includes(e.ended)&&Array.isArray(e.said)&&e.said.every(a=>typeof a=="string")?e:null}const lh={x:"A cross: there is no Fibergochi.",normal:"The Fibergochi, standing about.",normal1:"The Fibergochi, standing about, getting bored.",normal2:"The Fibergochi, bored stiff.",est:"The Fibergochi at a desk, studying.",zz:"The Fibergochi, asleep.",bt:"A room full of terminals, all taken, and the Fibergochi looking for a free one.",http:"A terminal, and the Fibergochi browsing: http.",pract:"The Fibergochi at a terminal, doing a lab.",no:"The Fibergochi, shaking its head.",bar0:"The Fibergochi at the bar with its friends, drinks on the table.",amig:"The Fibergochi with a group of friends.",suplica:"The Fibergochi on the floor, begging."},ch=[[["study","estudio","Study/Sleep","to study or to sleep."]],[["http","http","http","to have a good time at a terminal (if you have one)."],["alfa","alfa","alfa","see the score."],["bar","bar","Bar","go to the bar, have a drink or play mus."]],"screen",[["friends","amigos","Friends","to make new friends."],["terminal","bt","Find terminal","look for a terminal to do labs, or not."],["beg","suplica","Beg","to try to get more passes."]]],dh={slow:"slow",normal:"normal",fast:"fast"};function Ka(t,[e,n,a,s]){if(t<=0)return e;if(t<3)return`${n}, under an hour`;const o=Math.round(t/3);return`${t<15?a:s}, about ${o} ${o===1?"hour":"hours"}`}const he=(t,e,{title:n="",disabled:a=!1}={})=>`<button type="button" data-do="${t}"${n?` title="${T(n)}"`:""}${a?" disabled":""}>${e}</button>`;function Oo(t,{running:e,confirmingNew:n,pace:a,picked:s=null}){const o=!t.alive||t.waiting||n,r=u=>u&&t.lampsLit?"on":"off",i=[["exam",r(t.examsPending),Ka(t.studyLeft,["nothing to study","a little to study","something to study","a lot to study"])],["lab",r(t.labsPending),Ka(t.labLeft,["no lab to do","a little lab work","some lab work","a lot of lab work"])],["terminal",t.hasTerminal?"on":"off",t.hasTerminal?"a terminal":t.labsPending?"no terminal, and labs need one":"no terminal"]],h=i.map(([u,f,y])=>`<li><button type="button" class="lamp ${f}" data-do="lamp-${u}" data-lamp="${u}" title="${u}: ${y}">${u}</button></li>`).join(""),l=i.map(([u,f,y])=>`<li class="${f}${u===s?" picked":""}" data-lamp="${u}"><b>${u}</b> ${y}</li>`).join(""),c=t.picture,d=lh[c.replace(/\d$/,"")]??"",m=`<div class="screen"><ul class="lamps" data-show="lamps">${h}</ul><img data-show="picture" src="/fibergochi/${c}.gif" alt="${d}" width="200" height="160"></div>`;return`<div class="fibergochi"><div class="egg"><p class="by"><span>by</span> Night</p>${ch.map(u=>u==="screen"?m:`<div class="keys">${u.map(([f,y,w,k])=>{const[b,$]=y==="alfa"?[15,11]:[22,21];return he(f,`<img src="/fibergochi/keys/${y}.gif" alt="${w}" width="${b*2}" height="${$*2}">`,{title:`${w}: ${k}`,disabled:o})}).join("")}</div>`).join("")}</div><div class="panel"><p class="time"><output data-show="clock">${t.clock}</output> ${he("pause",e?"pause":"go on")} ${he("speed",`speed: ${dh[a]}`,{title:"Change the speed of time."})} ${he("new","new")}</p><ul class="legend" data-show="legend">${l}</ul>${uh(t,n)}</div></div>`}function uh(t,e){const{said:n,asks:a}=t.state,s=(o,...r)=>`<div class="dialog" role="alertdialog"><p>${T(o).replaceAll(`
`,"<br>")}</p><p>${r.join(" ")}</p></div>`;if(e)return s("Are you sure you want a new Fibergochi?",he("new-yes","OK"),he("new-no","Cancel"));if(n.length>0)return s(n[0],he("ok","OK"));if(a==="degree")return s("Do you want to do the Superior?",he("superior","OK"),he("tecnica","Cancel"));if(a==="enrol"){const{most:o,suggested:r}=t.enrolment;return`<form class="dialog" data-do="enrol"><label>How many credits do you want to enrol in? [1..${o}] <input type="number" name="credits" min="1" max="${o}" value="${r}"></label> <button type="submit">OK</button></form>`}return""}const Va="fibergochi:1999-03-02",dn={slow:1e3,normal:400,fast:10},mh={slow:"normal",normal:"fast",fast:"slow"},ph=100,fh=10;function gh(t){let e=new Dn(Math.random,p()??{}),n=!0,a=!1,s=null,o="slow",r=0;const i=qt(t),h=document.createElement("div"),l=g("div",{hidden:!0},...jo.everyImage.map(v=>g("img",{src:`/fibergochi/${v}.gif`,alt:"",width:50,height:40}))),c=()=>Oo(e,{running:n,confirmingNew:a,pace:o,picked:s});function d(){const v=document.activeElement instanceof HTMLElement&&h.contains(document.activeElement)?document.activeElement.dataset.do:void 0;h.innerHTML=c(),v&&h.querySelector(`[data-do="${v}"]`)?.focus()}function m(){const v=document.createElement("div");v.innerHTML=c();for(const A of h.querySelectorAll("[data-show]")){const j=v.querySelector(`[data-show="${A.dataset.show}"]`);j&&(A instanceof HTMLImageElement?A.getAttribute("src")!==j.getAttribute("src")&&(A.src=j.getAttribute("src")??"",A.alt=j.getAttribute("alt")??""):A.innerHTML!==j.innerHTML&&(A.innerHTML=j.innerHTML))}}function p(){try{return hh(localStorage.getItem(Va))}catch{return null}}function u(){try{localStorage.setItem(Va,JSON.stringify(e.state))}catch{}}const f=()=>n&&i.onScreen()&&e.alive&&!e.waiting;let y=setTimeout(w,dn[o]);function w(){if(y=setTimeout(w,dn[o]),!!f()){if(e.step(),r+=1,e.waiting||!e.alive){u(),d();return}r%fh===0&&u(),m()}}const k=setInterval(()=>{f()&&(e.animate(),m())},ph),b={study:()=>e.studyOrSleep(),http:()=>e.browse(),alfa:()=>e.alfa(),bar:()=>e.goToBar(),friends:()=>e.makeFriends(),terminal:()=>e.lookForTerminal(),beg:()=>e.beg()},$={pause:()=>n=!n,speed:()=>{o=mh[o],clearTimeout(y),y=setTimeout(w,dn[o])},new:()=>a=!0,"new-no":()=>a=!1,"new-yes":()=>{e=new Dn(Math.random),a=!1,n=!0},ok:()=>e.dismiss(),superior:()=>e.choose("superior"),tecnica:()=>e.choose("tecnica")};function I(v){const A=v.target.closest("button[data-do]")?.dataset.do??"";A.startsWith("lamp-")?(s=A.slice(5),m()):b[A]?(b[A](),e.waiting?d():m()):$[A]&&($[A](),u(),d())}function M(v){v.preventDefault();const A=v.target.querySelector("input[name=credits]");A&&e.enrol(Number(A.value))&&(u(),d())}return t.addEventListener("click",I),t.addEventListener("submit",M),window.addEventListener("pagehide",u),t.replaceChildren(h,l),d(),()=>{clearTimeout(y),clearInterval(k),i.stop(),u(),t.removeEventListener("click",I),t.removeEventListener("submit",M),window.removeEventListener("pagehide",u)}}const wh=()=>Oo(new Dn(Math.random),{running:!0,confirmingNew:!1,pace:"slow"}),yh={name:"fibergochi",apps:{fibergochi:gh},stills:{fibergochi:wh}},ie=t=>[...t.replace(/\s/g,"")].map(e=>e==="#"?1:0),De={A:ie(".###. #...# ##### #...# #...#"),B:ie("####. #...# ####. #...# ####."),C:ie(".#### #.... #.... #.... .####"),D:ie("####. #...# #...# #...# ####."),E:ie("##### #.... ####. #.... #####"),H:ie("#...# #...# ##### #...# #...#"),O:ie(".###. #...# #...# #...# .###."),T:ie("##### ..#.. ..#.. ..#.. ..#.."),X:ie("#...# .#.#. ..#.. .#.#. #...#")};function _t(t){let e=t>>>0;return()=>{e=e+1831565813>>>0;let n=Math.imul(e^e>>>15,1|e);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}const bh=t=>1/(1+Math.exp(-t));class vh{weights;constructor(e,n){const a=_t(n);this.weights=e.slice(1).map((s,o)=>Array.from({length:s},()=>Array.from({length:e[o]+1},()=>a()-.5)))}forward(e){const n=[[...e]];for(const a of this.weights){const s=[...n[n.length-1],1];n.push(a.map(o=>bh(o.reduce((r,i,h)=>r+i*s[h],0))))}return n}answer(e){return this.forward(e).pop()}learn(e,n,a){const s=this.forward(e),o=s[s.length-1];let r=o.map((h,l)=>(h-n[l])*h*(1-h));for(let h=this.weights.length-1;h>=0;h-=1){const l=[...s[h],1],c=this.weights[h],d=s[h].map((m,p)=>{let u=0;for(let f=0;f<c.length;f+=1)u+=c[f][p]*r[f];return u*m*(1-m)});for(let m=0;m<c.length;m+=1)for(let p=0;p<l.length;p+=1)c[m][p]-=a*r[m]*l[p];r=d}let i=0;for(let h=0;h<o.length;h+=1)i+=(o[h]-n[h])**2;return i/2}}const kh=10,Xa=.5;class Po{constructor(e,n){this.shapes=e,this.network=new vh([25,kh,e.length],n),this.noise=_t(n+1)}shapes;network;noise;rounds=0;error=0;train(e){for(let n=0;n<e;n+=1){let a=0;this.shapes.forEach(({pixels:s},o)=>{const r=this.shapes.map((h,l)=>l===o?1:0),i=Math.floor(this.noise()*s.length);a+=this.network.learn(s,r,Xa),a+=this.network.learn(s.map((h,l)=>l===i?1-h:h),r,Xa)}),this.error=a,this.rounds+=1}}read(e){const n=this.network.answer(e);return this.shapes.map(({name:a},s)=>({letter:a,score:n[s]}))}}const xh=[{name:"A",pixels:De.A},{name:"B",pixels:De.B}];function Fn(t=xh){const e=new Po(t,1);return e.train(200),e}const $h=3;function Lo(t,e,n){const a=t.trim();return a===""?"Give it a name first.":[...a].length>$h?"A name of three characters at most.":n.includes(a)?`“${a}” is already a letter it knows.`:e.some(Boolean)?null:"There is no ink on the grid to remember."}const Th=t=>Array.isArray(t)&&t.length===25&&t.every(e=>e===0||e===1);function Sh(t,e=[]){let n;try{n=JSON.parse(t??"[]")}catch{return[]}if(!Array.isArray(n))return[];const a=[];for(const s of n){const{name:o,pixels:r}=s??{};typeof o!="string"||!Th(r)||Lo(o,r,[...e,...a.map(i=>i.name)])||a.push({name:o.trim(),pixels:r})}return a}function No(t,e){const n=e.map((i,h)=>`<button type="button" class="cell" data-at="${h}" aria-pressed="${i?"true":"false"}" aria-label="cell ${h+1}"></button>`).join(""),a=t.read(e),s=a.reduce((i,h)=>h.score>i.score?h:i),o=a.map(({letter:i,score:h})=>`<tr${i===s.letter?' class="best"':""}><th scope="row">${T(i)}</th><td class="sure"><span class="bar" style="--p:${h.toFixed(3)}"></span>${Math.round(h*100)}%</td></tr>`).join(""),r=t.rounds===0?"It has not been taught anything yet: every answer is a guess.":`It reads <b>${T(s.letter)}</b>, after ${t.rounds} rounds of lessons.`;return`<div class="letters"><div class="grid" role="group" aria-label="the drawing, five cells by five">${n}</div><div class="reading"><p>${r}</p><table class="answers"><tbody>${o}</tbody></table></div></div>`}const Qa="first-network:own",Za=Object.entries(De).map(([t,e])=>({name:t,pixels:e}));function Mh(t){let e=f();const n=new Set(["A","B",...e.map(({name:v})=>v)]),a=()=>[...Za,...e];let s=Fn(p()),o=[...De.A];const r=g("div",{onclick:v=>{const A=v.target.closest("[data-at]")?.dataset.at;A!==void 0&&(o[Number(A)]=1-o[Number(A)],d())}}),i=g("div",{class:"row"}),h=g("div",{class:"row taught"}),l=g("input",{type:"text",maxlength:3,size:4,"aria-label":"a name for the drawing"}),c=g("p",{class:"error",hidden:!0});function d(){r.innerHTML=No(s,o)}function m(v){o=v,d()}function p(){return a().filter(v=>n.has(v.name))}function u(){s=Fn(p()),d()}function f(){try{return Sh(localStorage.getItem(Qa),Object.keys(De))}catch{return[]}}function y(){try{localStorage.setItem(Qa,JSON.stringify(e))}catch{}}function w(){const v=Lo(l.value,o,a().map(j=>j.name));if(c.textContent=v??"",c.hidden=v===null,v)return;const A={name:l.value.trim(),pixels:[...o]};e=[...e,A],n.add(A.name),l.value="",y(),$(),u()}function k(v){e=e.filter(A=>A.name!==v),n.delete(v);for(const A of Za)n.size<2&&n.add(A.name);y(),$(),u()}const b=(v,A)=>g("button",{type:"button",onclick:A},v);function $(){i.replaceChildren("Draw ",...a().map(v=>b(v.name,()=>m([...v.pixels]))),b("one cell wrong",()=>{const v=Math.floor(Math.random()*o.length);m(o.map((A,j)=>j===v?1-A:A))}),b("clear",()=>m(o.map(()=>0)))),h.replaceChildren("Taught: ",...a().map(v=>{const A=g("input",{type:"checkbox",value:v.name,checked:n.has(v.name),onchange:()=>{A.checked?n.add(v.name):n.size>2?n.delete(v.name):A.checked=!0,u()}}),j=e.includes(v)&&g("button",{type:"button",class:"forget","aria-label":`forget ${v.name}`,onclick:()=>k(v.name)},"×");return g("label",{},A,` ${v.name}`,j)}))}const I=g("div",{class:"row"},b("teach 100 more rounds",()=>{s.train(100),d()}),b("forget everything",()=>{s=new Po(s.shapes,1),d()})),M=g("div",{class:"row own"},"Your own: draw it, name it ",l,b("remember this drawing",()=>w()),c);$(),t.replaceChildren(i,r,h,I,M),d()}const Ah=()=>No(Fn(),De.A),Ih={name:"first-network",apps:{letters:Mh},stills:{letters:Ah}},Eh=1.5,Ch=.02,jh=.25;class Oh{constructor(e,n,a,s){this.credit=a,this.random=s,this.remaining=[...e],this.buyers=n.map(o=>({bidder:o,credit:a,won:[],error:null}))}credit;random;buyers;remaining;sold=[];turns=[];get over(){return this.remaining.length===0}get next(){return this.remaining[0]}get market(){return{lots:this.remaining,credits:Object.fromEntries(this.buyers.map(e=>[e.bidder.name,e.credit])),sales:this.sold}}demands(){const e=this.next;return Object.fromEntries(this.buyers.map(n=>[n.bidder.name,e?this.demandOf(n,e):null]))}sell(){const e=this.remaining.shift();if(!e)throw new Error("the floor is empty");const n=this.buyers.map(o=>this.demandOf(o,e)),a=Object.fromEntries(this.buyers.map((o,r)=>[o.bidder.name,n[r]===null?null:e.value/(1+n[r])])),s=this.buyers.filter(o=>(a[o.bidder.name]??0)>o.credit).map(o=>o.bidder.name);for(let o=e.value*Eh;o>=e.value*jh;o-=e.value*Ch){const r=(e.value-o)/o,i=this.buyers.filter((l,c)=>l.credit>=o&&r>=(n[c]??1/0));if(i.length===0)continue;const h=i[Math.min(i.length-1,Math.floor(this.random()*i.length))];return h.credit-=o,h.won.push(e),this.record({lot:e,buyer:h.bidder.name,price:o},a,s)}return this.record({lot:e,buyer:null,price:null},a,s)}standings(){return this.buyers.map(({bidder:e,credit:n,won:a,error:s})=>{const o=a.reduce((i,h)=>i+h.value,0),r=this.credit-n;return{name:e.name,credit0:this.credit,credit:n,spent:r,lots:a.length,value:o,profit:o-r,error:s}})}record(e,n,a){return this.sold.push(e),this.turns.push({sale:e,bids:n,short:a}),e}demandOf(e,n){try{const a=e.bidder.demands(n,this.market,e.bidder.name);if(typeof a!="number"||Number.isNaN(a))throw new Error(`demanded ${String(a)}, not a margin`);return e.error=null,a}catch(a){return e.error=a instanceof Error?a.message:String(a),null}}}const es=[["sardines",30],["anchovies",40],["squid",90],["hake",120],["sole",180],["prawns",250],["monkfish",300],["tuna",400]];function Ph(t,e){return Array.from({length:t},(n,a)=>{const[s,o]=es[Math.floor(e()*es.length)];return{id:a+1,kind:s,value:Math.round(o*(.7+.6*e()))}})}const Lh=60;function Ro(t,e,n){const a=_t(t),s=Ph(Lh,a),o=s.reduce((r,i)=>r+i.value,0);return new Oh(s,e,n*o/Math.max(1,e.length),a)}function ts(t,e="You"){const n=new Function("lot","market","me",t);return{name:e,demands:n}}const ns=`// Return the margin you demand: (value - price) / price.
// You are told the lots still to sell, everyone's credit, and every sale so far.
// This is Vicente. Change the 0.9 first.
const fish = market.lots.reduce((sum, lot) => sum + lot.value, 0);
const money = 0.9 * Object.values(market.credits).reduce((sum, c) => sum + c, 0);
if (money <= 0) return 0.001;
return Math.max(0.001, (fish - money) / money);
`,Nh=12,oe=t=>Math.round(t).toString(),as=t=>t===null?"—":t===1/0?"∞":`${Math.round(t*100)}%`;function Do(t){const e=t.next,n=t.demands(),a=[...t.standings()].sort((c,d)=>d.profit-c.profit),s=Math.max(1,...a.map(c=>Math.abs(c.profit))),o=e?`<p class="lot">Next on the floor: <b>a box of ${T(e.kind)}</b>, which resells for ${oe(e.value)}. The price starts at ${oe(e.value*1.5)} and falls.</p>`:'<p class="lot">The floor is empty.</p>',i=`<table class="board"><thead><tr><th>buyer</th><th>asks</th><th>holds</th><th>spent</th><th>worth</th><th>credit</th><th>profit</th></tr></thead><tbody>${a.map(({name:c,lots:d,spent:m,value:p,profit:u,credit:f,error:y})=>{const w=y?`<td class="asks error" colspan="5">${T(y)}</td>`:`<td class="asks">${as(n[c]??null)}</td>`;return`<tr${u<0?' class="loss"':""}><th scope="row">${T(c)}</th>${w}`+(y?"":`<td>${d} lot${d===1?"":"s"}</td><td>${oe(m)}</td><td>${oe(p)}</td><td>${oe(f)}</td>`)+`<td class="profit"><span class="bar" style="--p:${(Math.abs(u)/s).toFixed(3)}"></span>${oe(u)}</td></tr>`}).join("")}</tbody></table>`,h=t.turns,l=h.length?`<ol class="sales" reversed start="${h.length}">${[...h].reverse().slice(0,Nh).map(({sale:{lot:c,buyer:d,price:m},bids:p,short:u})=>{const f=m===null||d===null?"<i>withdrawn</i>":`sold at <b>${oe(m)}</b>, a margin of ${as((c.value-m)/m)}`,y=Object.entries(p).map(([w,k])=>{if(k===null)return`${T(w)} —`;const b=w===d?`<b>${T(w)}</b>`:T(w);return u.includes(w)?`<s title="more than it had">${b} at ${oe(k)}</s>`:`${b} at ${oe(k)}`}).join(", ");return`<li><span class="went">${T(c.kind)}, ${oe(c.value)}: ${f}.</span> <span class="ready">Ready to shout: ${y}.</span></li>`}).join("")}</ol>`:"";return`<div class="fish-market">${o}${i}${l}</div>`}function ss(t,e){return{name:t,demands:()=>e}}const os=.001;function sa(t,e){const n=t.lots.reduce((s,o)=>s+o.value,0),a=e*Object.values(t.credits).reduce((s,o)=>s+o,0);return a<=0?os:Math.max(os,(n-a)/a)}const Rh=.9,Dh=3,gt=10;function Fh(t="Planner"){return{name:t,demands(e,n,a){const s=sa(n,Rh),o=s*(Dh-1)/gt,r=p=>s+p*o,i=p=>Math.max(0,Math.min(gt-1,Math.floor((p-s)/o))),h=new Array(gt).fill(0);for(const p of n.sales){if(p.price===null)continue;const u=i((p.lot.value-p.price)/p.price);h[u]=h[u]+p.lot.value}const l=h.reduce((p,u)=>p+u,0);if(l===0)return s;const c=n.lots.reduce((p,u)=>p+u.value,0),d=n.credits[a]??0;let m=0;for(let p=gt-1;p>=0;p-=1)if(m+=c*h[p]/l/(1+r(p)),m>=d)return r(p);return s}}}function Bh(t=.9,e="Vicente"){return{name:e,demands:(n,a)=>sa(a,t)}}const Wh=.98,Hh=1.05,qh=.95,zh=t=>(t.lot.value-t.price)/t.price;function rs(t,e){const n=e.filter(s=>s.buyer===t),a=n.reduce((s,o)=>s+o.price,0);return a>0?(n.reduce((s,o)=>s+o.lot.value,0)-a)/a:0}function _h(t="Wanda"){return{name:t,demands(e,n,a){const s=sa(n,Wh),o=rs(a,n.sales);let r=1;for(const i of n.sales)i.buyer!==null&&(i.buyer===a?r*=Hh:rs(i.buyer,n.sales)>=o&&zh(i)>=s&&(r*=qh));return s*r}}}function Fo(t=.9){return[ss("Patient",1),ss("Hasty",.05),Bh(t),_h(),Fh()]}const Gh=250,Yh=1,is="fish-market:own",wt="fish-market:seated";function Uh(t){let e=Yh,n=null,a,s=null;const o=g("div"),r=g("p",{class:"error",hidden:!0}),i=g("output",{},"90%"),h=g("input",{type:"range",min:.5,max:1,step:.02,value:.9,oninput:()=>u()}),l=g("output",{},"50%"),c=g("input",{type:"range",min:.3,max:1.2,step:.05,value:.5,oninput:()=>u()}),d=g("textarea",{class:"agent",spellcheck:!1,rows:9,oninput:()=>k()}),m=g("button",{type:"button",onclick:()=>s?w():y()},"run");function p(){o.innerHTML=Do(a)}function u(){w(),i.textContent=`${Math.round(Number(h.value)*100)}%`,l.textContent=`${Math.round(Number(c.value)*100)}%`,a=Ro(e,[...Fo(Number(h.value)),...n?[n]:[]],Number(c.value)),p()}function f(){return a.over?!1:(a.sell(),p(),!0)}function y(){m.textContent="stop",s=setInterval(()=>{f()||w()},Gh)}function w(){s&&clearInterval(s),s=null,m.textContent="run"}function k(){try{localStorage.setItem(is,d.value)}catch{}}function b(){try{n=ts(d.value),r.hidden=!0,localStorage.setItem(wt,"yes")}catch(j){n=null,r.textContent=j instanceof Error?j.message:String(j),r.hidden=!1,localStorage.removeItem(wt)}u()}function $(){n=null,localStorage.removeItem(wt),u()}const I=g("div",{class:"dials"},g("label",{},"Vicente believes the others will spend: ",i,h),g("label",{},"Money in the room, as a share of the fish: ",l,c)),M=g("div",{class:"row"},g("button",{type:"button",onclick:()=>{f()}},"next lot"),m,g("button",{type:"button",onclick:()=>{for(w();f(););}},"whole morning"),g("button",{type:"button",onclick:()=>{e=Math.floor(Math.random()*1e9),u()}},"new morning")),v=g("div",{class:"row"},g("button",{type:"button",onclick:()=>b()},"seat it"),g("button",{type:"button",onclick:()=>$()},"stand it down")),A=g("details",{class:"own"},g("summary",{},"Seat your own agent"),d,v,r);try{d.value=localStorage.getItem(is)??ns,localStorage.getItem(wt)&&(n=ts(d.value))}catch{d.value=ns}return t.replaceChildren(I,M,o,A),u(),w}const Jh=()=>Do(Ro(1,Fo(),.5)),Kh={name:"fish-market",apps:{"fish-market":Uh},stills:{"fish-market":Jh}};function Vh(t,e){const n=[];for(let a=t.length-1;a>=0;a-=1)n.push(t.slice(0,a));for(let a=1;a<=e.length;a+=1)n.push(e.slice(0,a));return n}const Xh=3800,Qh=6500,Zh=26,el=46,tl=420;function nl(t){return[...t.childNodes].map(e=>e.nodeName==="BR"?`
`:e.textContent??"").join("")}function al(t){const e=document.querySelector("main h1");if(!e||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return()=>{};const n={text:nl(e)};e.setAttribute("aria-label",n.text),e.classList.add("typing");const a=document.createElement("span");a.className="caret idle",a.setAttribute("aria-hidden","true");const s=(c,d)=>{const m=c.split(`
`).flatMap((p,u)=>u===0?[p]:[document.createElement("br"),p]);if(d){const p=document.createElement("a");p.href=d,p.append(...m,a),e.replaceChildren(p)}else e.replaceChildren(...m,a)};s(n.text);let o=n,r=[],i=performance.now()+Xh,h=0;const l=c=>{if(h=requestAnimationFrame(l),c<i)return;if(r.length===0){const m=t(o,n);r=Vh(o.text,m.text),o=m,a.classList.remove("idle")}const d=r.shift()??o.text;s(d,r.length===0?o.href:void 0),r.length===0?(a.classList.add("idle"),i=c+Qh):d===""?i=c+tl:i=c+(d.length<(r[0]?.length??0)?el:Zh)};return h=requestAnimationFrame(l),()=>{cancelAnimationFrame(h),s(n.text),a.remove(),e.classList.remove("typing"),e.removeAttribute("aria-label")}}function sl(t,e){const n=[...t];for(let a=n.length-1;a>0;a-=1){const s=Math.min(a,Math.floor(e()*(a+1)));[n[a],n[s]]=[n[s],n[a]]}return n}function ol(t,e){let n=[];return a=>(n.length===0&&(n=sl(t,e),n.length>1&&n[0]===a&&n.push(n.shift())),n.shift()??a)}const rl=[{text:`More than
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
as this page opened.`,href:"/projects/worlds/"}];let un=null;const il={name:"headline",arrive:t=>{if(un?.(),un=null,t.route!=="/")return;let e=null;un=al((n,a)=>(e??=ol([a,...rl],Math.random),e(n)))}};function hs(t,e="You"){const n=new Function("fish","weeks","bots","me","rounds",t);return{name:e,orders:n}}const ls=`// Return your orders for the round: one number a week, 0 to rest.
// You know the fish at the start, the weeks, who is on the lagoon (bots),
// your name (me), and every round before (rounds), but not what the others
// will do this time.
// This one rests, lets the lagoon grow, and takes one share the last week.
let grown = fish;
for (let week = 1; week < weeks; week++) grown += Math.floor(grown / 2);
const orders = new Array(weeks).fill(0);
orders[weeks - 1] = Math.floor(grown / bots.length);
return orders;
`;function Bo(t){const e=t.rounds[t.rounds.length-1],n=t.scores(),a=Math.max(1,...Object.values(n)),s=[...t.names].sort((m,p)=>n[p]-n[m]).map(m=>{const p=t.errors[m];return`<tr><th scope="row">${T(m)}</th>`+(p?`<td class="error" colspan="2">${T(p)}</td>`:`<td>${e?.totals[m]??0}</td><td class="profit"><span class="bar" style="--p:${(n[m]/a).toFixed(3)}"></span>${n[m]}</td>`)+"</tr>"}).join(""),o=t.rounds.length,r=`<table class="board"><caption>${o===0?"The season has not started":`After ${o} round${o===1?"":"s"}`}</caption><thead><tr><th>bot</th><th>last round</th><th>season</th></tr></thead><tbody>${s}</tbody></table>`;if(!e)return`<div class="lagoon"><p class="lot">The lagoon has <b>${t.fish} fish</b>, and ${t.weeks} weeks ahead. Nobody has been out yet.</p>${r}</div>`;const i=e.weeks.map((m,p)=>`<th>${p+1}</th>`).join(""),h=Math.max(1,...e.weeks.map(m=>m.fish)),l=e.weeks.map(m=>`<td><span class="fish" style="--p:${(m.fish/h).toFixed(3)}"></span>${m.fish}</td>`).join(""),c=t.names.map(m=>{const p=e.weeks.map((u,f)=>{const y=e.orders[m]?.[f]??0,w=u.caught[m]??0;return`<td${y>w?' class="short"':""} title="asked for ${y}">${w}</td>`}).join("");return`<tr><th scope="row">${T(m)}</th>${p}<td class="total">${e.totals[m]}</td></tr>`}).join("");return`<div class="lagoon">${`<table class="weeks"><caption>Round ${o}, week by week: what each bot caught, and what was left in the lagoon</caption><thead><tr><th>week</th>${i}<th>total</th></tr></thead><tbody>${c}<tr class="water"><th scope="row">in the lagoon</th>${l}<td></td></tr></tbody></table>`}${r}</div>`}function Wo(t,e,n){const a=[];let s=t;for(let o=0;o<e;o+=1){const r=Math.max(0,Math.min(s,Math.floor(n(s,o))));a.push(r),s-=r,s+=Math.floor(s/2)}return a}const yt={rest:{name:"Rest",orders:(t,e)=>new Array(e).fill(0)},one:{name:"One",orders:(t,e)=>new Array(e).fill(1)},power:{name:"Power",orders:(t,e)=>Array.from({length:e},(n,a)=>a*a)},percent:t=>({name:`${Math.round(t*100)}%`,orders:(e,n)=>Wo(e,n,a=>a*t)})},cs=(t,e)=>Math.ceil(t/e);function ds(t="Tit for tat"){const e=new Set;return{name:t,orders(n,a,s,o,r){for(const h of r)for(const l of Object.keys(h.orders))l!==o&&(h.orders[l]?.[0]??0)>=cs(h.start,s.length)&&e.add(l);if(s.some(h=>h!==o&&e.has(h)))return Wo(n,a,h=>cs(h,s.length));let i=n;for(let h=1;h<a;h+=1)i+=Math.floor(i/2);return[...new Array(a-1).fill(0),Math.floor(i/s.length)]}}}function Ho(){return[{fisher:yt.one,seated:!0},{fisher:yt.power,seated:!0},{fisher:yt.percent(.1),seated:!0},{fisher:yt.percent(.4),seated:!1},{fisher:ds("Tit for tat"),seated:!0},{fisher:ds("Tat for tit"),seated:!0}]}function hl(t,e,n){const a=Object.keys(n),s=[],o=Object.fromEntries(a.map(i=>[i,0]));let r=t;for(let i=0;i<e;i+=1){const h=Object.fromEntries(a.map(c=>[c,0])),l=a.map(c=>({name:c,order:Math.max(0,Math.floor(n[c]?.[i]??0))})).filter(({order:c})=>c>0);for(const c of[...new Set(l.map(({order:d})=>d))].sort((d,m)=>d-m)){const d=l.filter(p=>p.order===c),m=Math.min(Math.floor(r/d.length),c);for(const{name:p}of d)h[p]=m,o[p]=o[p]+m;r-=m*d.length}r+=Math.floor(r/2),s.push({fish:r,caught:h})}return{start:t,orders:n,weeks:s,totals:o}}class qo{constructor(e,n,a){this.fish=e,this.weeks=n,this.fishers=a}fish;weeks;fishers;rounds=[];errors={};get names(){return this.fishers.map(e=>e.name)}play(){const e=Object.fromEntries(this.fishers.map(a=>[a.name,this.ordersOf(a)])),n=hl(this.fish,this.weeks,e);return this.rounds.push(n),n}scores(){return Object.fromEntries(this.names.map(e=>[e,this.rounds.reduce((n,a)=>n+(a.totals[e]??0),0)]))}ordersOf(e){try{const n=e.orders(this.fish,this.weeks,this.names,e.name,this.rounds);if(!Array.isArray(n)||n.some(a=>typeof a!="number"||Number.isNaN(a)))throw new Error("orders must be an array of numbers, one a week");return delete this.errors[e.name],Array.from({length:this.weeks},(a,s)=>n[s]??0)}catch(n){return this.errors[e.name]=n instanceof Error?n.message:String(n),new Array(this.weeks).fill(0)}}}const us="lagoon:own",bt="lagoon:seated";function ll(t){let e=null,n;const a=g("div"),s=g("p",{class:"error",hidden:!0}),o=g("output",{},"100"),r=g("input",{type:"range",min:5,max:200,step:1,value:100,oninput:()=>m()}),i=g("output",{},"10"),h=g("input",{type:"range",min:4,max:14,step:1,value:10,oninput:()=>m()}),l=g("textarea",{class:"agent",spellcheck:!1,rows:11,oninput:()=>u()}),c=Ho().map(({fisher:M,seated:v})=>({fisher:M,box:g("input",{type:"checkbox",checked:v,onchange:()=>m()})}));function d(){a.innerHTML=Bo(n)}function m(){o.textContent=r.value,i.textContent=h.value;const M=c.filter(({box:v})=>v.checked).map(({fisher:v})=>v);n=new qo(Number(r.value),Number(h.value),[...M,...e?[e]:[]]),d()}function p(M){for(let v=0;v<M;v+=1)n.play();d()}function u(){try{localStorage.setItem(us,l.value)}catch{}}function f(){try{e=hs(l.value),s.hidden=!0,localStorage.setItem(bt,"yes")}catch(M){e=null,s.textContent=M instanceof Error?M.message:String(M),s.hidden=!1,localStorage.removeItem(bt)}m()}function y(){e=null,localStorage.removeItem(bt),m()}const w=g("div",{class:"dials"},g("label",{},"Fish in the lagoon at the start: ",o,r),g("label",{},"Weeks in a round: ",i,h)),k=g("div",{class:"row bench"},"On the lagoon: ",...c.map(({fisher:M,box:v})=>g("label",{},v,` ${M.name}`))),b=g("div",{class:"row"},g("button",{type:"button",onclick:()=>p(1)},"play a round"),g("button",{type:"button",onclick:()=>p(5)},"play five"),g("button",{type:"button",onclick:()=>m()},"new season")),$=g("div",{class:"row"},g("button",{type:"button",onclick:()=>f()},"seat it"),g("button",{type:"button",onclick:()=>y()},"stand it down")),I=g("details",{class:"own"},g("summary",{},"Seat your own bot"),l,$,s);try{l.value=localStorage.getItem(us)??ls,localStorage.getItem(bt)&&(e=hs(l.value))}catch{l.value=ls}t.replaceChildren(w,k,b,a,I),m()}const cl=()=>Bo(new qo(100,10,Ho().filter(({seated:t})=>t).map(({fisher:t})=>t))),dl={name:"lagoon",apps:{lagoon:ll},stills:{lagoon:cl}},te={N:1,S:2,E:4,W:8};function zo(t){const{width:e,height:n,cells:a,links:s}=t,o=e*n-1,r=new Map([[0,-1]]),i=[0];for(let l=0;l<i.length;l+=1){const c=i[l];if(c===o)break;const d=c%e,m=Math.floor(c/e),p=a[c],u=[];p&te.E&&d+1<e&&u.push(c+1),p&te.W&&d>0&&u.push(c-1),p&te.N&&m+1<n&&u.push(c+e),p&te.S&&m>0&&u.push(c-e);const f=s.get(c);f!==void 0&&s.get(f)===c&&u.push(f);for(const y of u)r.has(y)||(r.set(y,c),i.push(y))}if(!r.has(o))return null;const h=[];for(let l=o;l!==-1;l=r.get(l))h.unshift({x:l%e,y:Math.floor(l/e)});return h}function _o(t){const e=zo(t);if(!e)return"There is no way out: the only one ran through a sphere that leads nowhere.";const n=e.slice(1).filter((s,o)=>Math.abs(s.x-e[o].x)+Math.abs(s.y-e[o].y)>1).length,a=n===0?"touches no sphere":`jumps through ${n===1?"one sphere":`${n} spheres`}`;return`The way out is ${e.length} rooms long, and ${a}.`}const ms=0x5deece66dn,ul=0xbn,ps=(1n<<48n)-1n;class ml{seed;constructor(e){this.seed=(BigInt(e)^ms)&ps}nextInt(e){if((e&-e)===e)return Number(BigInt(e)*BigInt(this.next(31))>>31n);for(;;){const n=this.next(31),a=n%e;if((n-a+(e-1)|0)>=0)return a}}next(e){return this.seed=this.seed*ms+ul&ps,Number(BigInt.asIntN(32,this.seed>>BigInt(48-e)))}}const fs=16,pl=[["N","E","W","S"],["W","S","E","N"],["S","E","W","N"]],fl={N:[0,1,"S"],S:[0,-1,"N"],E:[1,0,"W"],W:[-1,0,"E"]};function Go(t,e,n,{spheres:a=!0}={}){const s=new ml(n),o=new Array(t*e).fill(0),r=new Map,i=[],h=(d,m)=>d+m*t;function l(d,m){i.push({x:d,y:m}),a&&s.nextInt(10)<1&&c(d,m);for(const p of pl[s.nextInt(3)]){const[u,f,y]=fl[p],w=d+u,k=m+f;w<0||k<0||w>=t||k>=e||o[h(w,k)]!==0||(o[h(d,m)]|=te[p],o[h(w,k)]=te[y],l(w,k),i.push({x:d,y:m}))}}function c(d,m){const p=s.nextInt(t),u=s.nextInt(e);o[h(p,u)]===0&&(o[h(d,m)]|=fs,o[h(p,u)]=fs,r.set(h(d,m),h(p,u)),r.set(h(p,u),h(d,m)),l(p,u),i.push({x:d,y:m}))}return l(0,0),o[h(0,0)]|=te.S,o[h(t-1,e-1)]|=te.N,{width:t,height:e,cells:o,links:r,path:i}}const U=10,vt=4;function Yo(t,{trail:e,way:n}={}){const{width:a,height:s,cells:o,links:r}=t,i=w=>vt+w*U,h=w=>vt+(s-1-w)*U,l=({x:w,y:k})=>[i(w)+U/2,h(k)+U/2],c=[];for(let w=0;w<s;w+=1)for(let k=0;k<a;k+=1){const b=o[k+w*a];b&te.S||c.push(`M${i(k)} ${h(w)+U}h${U}`),b&te.W||c.push(`M${i(k)} ${h(w)}v${U}`),w===s-1&&!(b&te.N)&&c.push(`M${i(k)} ${h(w)}h${U}`),k===a-1&&!(b&te.E)&&c.push(`M${i(k)+U} ${h(w)}v${U}`)}const d=new Map;let m=0;const p=[...r].map(([w,k])=>{const b=r.get(k)===w;if(!b)m+=1;else if(!d.has(w)){const M=String.fromCharCode(97+d.size/2%26);d.set(w,M).set(k,M)}const[$,I]=l({x:w%a,y:Math.floor(w/a)});return`<circle class="sphere${b?"":" dead"}" cx="${$}" cy="${I}" r="${U*.3}"/><text class="letter" x="${$}" y="${I}">${b?d.get(w):"×"}</text>`}),u=w=>w.map((k,b)=>{const $=w[b-1];return`${$&&Math.abs(k.x-$.x)+Math.abs(k.y-$.y)===1?"L":"M"}${l(k).join(" ")}`}).join(""),f=[];if(n&&f.push(`<path class="way" d="${u(n)}"/>`),e!==void 0&&e>0){const w=t.path.slice(0,e),[k,b]=l(w[w.length-1]);f.push(`<path class="trail" d="${u(w)}"/>`,`<circle class="walker" cx="${k}" cy="${b}" r="${U*.22}"/>`)}return`<svg class="maze" role="img" aria-label="${`A ${a} by ${s} maze with ${r.size} sphere${r.size===1?"":"s"}`+(m?`, ${m} leading nowhere`:"")+"."}" viewBox="0 0 ${a*U+2*vt} ${s*U+2*vt}">`+f.join("")+`<path class="walls" d="${c.join("")}"/>`+p.join("")+"</svg>"}const Le={size:7,seed:543},gl=100;function wl(t){let e,n=0,a=!1,s=null;const o=g("div",{class:"figure"}),r=g("p",{class:"status"}),i=g("output",{},String(Le.size)),h=g("input",{type:"range",min:5,max:30,step:1,value:Le.size,oninput:()=>u()}),l=g("input",{type:"number",value:Le.seed,onchange:()=>u()}),c=g("input",{type:"checkbox",checked:!0,onchange:()=>u()}),d=g("button",{type:"button",onclick:()=>s?y():f()},"walk the camera"),m=g("button",{type:"button",onclick:()=>w()},"show the way out");function p(){o.innerHTML=Yo(e,{trail:n,way:a?zo(e):null})}function u(){y(),n=0,i.textContent=h.value,e=Go(Number(h.value),Number(h.value),Number(l.value),{spheres:c.checked}),r.textContent=_o(e),p()}function f(){n>=e.path.length&&(n=0),d.textContent="stop",s=setInterval(()=>{n+=1,p(),n>=e.path.length&&y()},gl)}function y(){s&&clearInterval(s),s=null,d.textContent="walk the camera"}function w(){a=!a,m.textContent=a?"hide the way out":"show the way out",p()}const k=g("button",{type:"button",onclick:()=>(l.value=String(Math.floor(Math.random()*1e6)),u())},"another"),b=g("div",{class:"dials"},g("label",{},"Rooms a side: ",i,h),g("label",{},"Seed: ",l,k),g("label",{},c," spheres, as on 20 May (unticked: 13 May)"));return t.replaceChildren(g("div",{class:"maze-app"},o,r,g("div",{class:"row"},d,m),b)),u(),y}const yl=()=>{const t=Go(Le.size,Le.size,Le.seed);return`<div class="maze-app"><div class="figure">${Yo(t)}</div><p class="status">${_o(t)}</p></div>`},bl={name:"maze",apps:{maze:wl},stills:{maze:yl}};function vl(t,e){let n=Array.from({length:e.length+1},(a,s)=>s);for(let a=1;a<=t.length;a+=1){const s=[a];for(let o=1;o<=e.length;o+=1){const r=(n[o-1]??0)+(t[a-1]===e[o-1]?0:1);s[o]=Math.min(r,(n[o]??0)+1,(s[o-1]??0)+1)}n=s}return n[e.length]??0}function kl(t,e){if(e.includes(t))return t;let n=null,a=1/0;for(const s of e){const o=vl(t,s);o<a&&([n,a]=[s,o])}return n}const xl=/[\p{L}\p{M}\p{N}']+|[.,!?;:]/gu,$l=/\]\([^)]*\)|^---[\s\S]*?\n---|[#*_`>\[\]|]|::[a-z-]+/gm;function Bt(t){return t.normalize("NFKC").replace($l," ").toLowerCase().match(xl)??[]}const kt=" ";class Bn{constructor(e,n){this.memory=n;const a=Bt(e),s=new Map;for(const o of a)s.set(o,(s.get(o)??0)+1);this.vocabulary=[...s.keys()],this.commonest=[...s].reduce((o,r)=>o&&o[1]>=r[1]?o:r,null)?.[0]??null;for(let o=1;o<a.length;o+=1)for(let r=1;r<=n&&r<=o;r+=1){const i=a.slice(o-r,o).join(kt),h=this.followers.get(i)??new Map;h.set(a[o]??"",(h.get(a[o]??"")??0)+1),this.followers.set(i,h)}}memory;vocabulary;commonest;followers=new Map;after(e){for(let n=Math.min(this.memory,e.length);n>=1;n-=1){const a=e.slice(-n),s=this.followers.get(a.join(kt));if(s)return{context:a,candidates:gs(s)}}return{context:[],candidates:[]}}transitions(){return[...this.followers].filter(([e])=>e.split(kt).length===this.memory).flatMap(([e,n])=>gs(n).map(a=>({context:e.split(kt),...a}))).sort((e,n)=>n.probability-e.probability||n.count-e.count)}}function gs(t){const e=[...t.values()].reduce((n,a)=>n+a,0);return[...t].map(([n,a])=>({word:n,count:a,probability:a/e})).sort((n,a)=>a.count-n.count)}function Tl(t,e){let n=e();for(const a of t)if(n-=a.probability,n<=0)return a.word;return t[t.length-1]?.word??null}function ws(t){return t.reduce((e,n)=>e===""||/^[.,!?;:]$/.test(n)?e+n:`${e} ${n}`,"")}function Uo(t,e){if(e<=0)return t.map((s,o)=>({...s,probability:o===0?1:0}));const n=t.map(s=>s.probability**(1/e)),a=n.reduce((s,o)=>s+o,0);return t.map((s,o)=>({...s,probability:(n[o]??0)/a}))}const mn=40,ys=8,pn=t=>`${Math.round(t*100)}%`;function Jo(t,e,n){const{context:a,candidates:s}=t.after(e),o=s.slice(0,ys),r=Uo(s,n).slice(0,ys),i=s.reduce((f,{count:y})=>f+y,0),h=e.slice(0,e.length-a.length),l=`<p class="written">${T(ws(h))}${h.length&&a.length?" ":""}${a.length?`<mark>${T(ws(a))}</mark>`:""}<span class="caret"></span></p>`,c=o.length?`<ol class="offered">${o.map(({word:f,count:y,probability:w},k)=>{const b=r[k]?.probability??0;return`<li><button type="button" data-word="${T(f)}" title="seen ${y} of ${i} times: ${pn(w)} as learnt"><span class="word">${T(f)}</span><span class="chance" style="--p:${b.toFixed(3)}"></span><span class="figure">${pn(b)}</span></button></li>`}).join("")}</ol>`:`<p class="offered">It never saw anything follow “${T(e[e.length-1]??"")}”. This is where it stops.</p>`,d=f=>a.length===t.memory&&f.context.join(" ")===a.join(" "),m=t.transitions(),p=[...m.filter(d),...m.filter(f=>!d(f))].slice(0,mn).map(f=>`<tr${d(f)?' class="now"':""}><td>${T(f.context.join(" "))}</td><td>${T(f.word)}</td><td>${f.count}</td><td>${pn(f.probability)}</td></tr>`).join(""),u=`<table class="learnt"><caption>What it learnt: ${m.length} transitions between ${t.vocabulary.length} words${m.length>mn?`, the first ${mn} shown`:""}</caption><thead><tr><th>after</th><th>comes</th><th>seen</th><th>chance</th></tr></thead><tbody>${p}</tbody></table>`;return`<div class="next-word">${l}<h4>What may come next</h4>${c}${u}</div>`}const Ot="The cat is happy. The dog is glad. The cat sleeps. The dog plays. The cat eats. The dog runs. The car is fast. The car goes far.",Sl=350;function Ml(t,{site:e}){const n={small:()=>Ot,site:()=>e.pages.map(v=>v.body).join(`

`),own:()=>c.value};let a=new Bn(Ot,1),s=Bt("the"),o=null;const r=g("div"),i=(v,A)=>g("option",{value:v},A),h=g("select",{onchange:()=>w()},i("small","eight short sentences"),i("site","this website"),i("own","your own text")),l=g("select",{onchange:()=>w()},i(1,"one word back"),i(2,"two words back"),i(3,"three words back")),c=g("textarea",{rows:5,hidden:!0,placeholder:"Paste any text here. The longer, the better it pretends.",oninput:()=>w()}),d=g("output",{},"1"),m=g("input",{type:"range",min:0,max:2,step:.1,value:1,oninput:()=>f()}),p=g("input",{type:"text",value:"the",onchange:()=>y()}),u=g("button",{type:"button",onclick:()=>o?$():b()},"write");function f(){d.textContent=m.value,r.innerHTML=Jo(a,s,Number(m.value))}function y(){$();const v=Bt(p.value).flatMap(A=>kl(A,a.vocabulary)??[]);s=v.length?v:a.commonest?[a.commonest]:[],f()}function w(){c.hidden=h.value!=="own",a=new Bn(n[h.value]?.()??Ot,Number(l.value)),y()}function k(){const v=Tl(Uo(a.after(s).candidates,Number(m.value)),Math.random);return v===null?!1:(s=[...s,v],f(),!0)}function b(){u.textContent="stop",o=setInterval(()=>{k()||$()},Sl)}function $(){o&&clearInterval(o),o=null,u.textContent="write"}r.addEventListener("click",v=>{const A=v.target?.closest("[data-word]")?.getAttribute("data-word");A&&(s=[...s,A],f())});const I=g("div",{class:"dials"},g("label",{},"It has read",h),g("label",{},"It looks",l),g("label",{},"Temperature: ",d,m),g("label",{},"Start from",p)),M=g("div",{class:"row"},g("button",{type:"button",onclick:()=>{k()}},"next word"),u,g("button",{type:"button",onclick:()=>y()},"start over"));return t.replaceChildren(I,c,M,r),f(),$}const Al=()=>Jo(new Bn(Ot,1),Bt("the"),1),Il={name:"next-word",apps:{"next-word":Ml},stills:{"next-word":Al}},fn={"string-cache-map":"a WeakMap replacement for string keys, with a bounded cache behind it","async-barrier":"a helper that makes async/await tests say what they wait for","spy-middleware":"a Redux middleware for spying on actions in tests","grunt-frontmatter":"a Grunt task: many files with YAML front matter into one JSON","object-canonical-keys":"always the same array of keys for the same keys, so comparisons stay cheap","async-deferrer":"one function that returns a promise, or resolves it"},bs=160,gn=28,Pt=t=>t.toLocaleString("en-US");function wn(t,e){const n=Math.max(1,...t.map(e)),a=bs/t.length,s=t.map((o,r)=>{const i=e(o)/n*(gn-2);return`<rect x="${(r*a+1).toFixed(1)}" y="${(gn-i).toFixed(1)}" width="${(a-2).toFixed(1)}" height="${i.toFixed(1)}"><title>${o}: ${Pt(e(o))}</title></rect>`}).join("");return`<svg class="spark" viewBox="0 0 ${bs} ${gn}" role="img" aria-label="Downloads a year, ${t[0]} to ${t[t.length-1]}">${s}</svg>`}function Ko(t){const e=Object.keys(t.years).sort(),n=c=>d=>t.years[d]?.[c]??0,a=c=>e.reduce((d,m)=>d+c(m),0),s=Object.keys(fn).sort((c,d)=>a(n(d))-a(n(c))),o=[...new Set(e.flatMap(c=>Object.keys(t.years[c]??{})))].filter(c=>!(c in fn)),r=c=>o.reduce((d,m)=>d+n(m)(c),0),i=c=>Object.values(t.years[c]??{}).reduce((d,m)=>d+m,0),h=s.filter(c=>a(n(c))>0).map(c=>`<tr><th scope="row"><a href="https://www.npmjs.com/package/${c}"><code>${c}</code></a><span>${fn[c]}</span></th><td>${wn(e,n(c))}</td><td>${Pt(a(n(c)))}</td></tr>`).join(""),l=o.length?`<tr><th scope="row">the other ${o.length}<span>mostly AngularJS and Redux helpers written for one project each</span></th><td>${wn(e,r)}</td><td>${Pt(a(r))}</td></tr>`:"";return`<figure class="packages"><table class="packages"><thead><tr><th>package</th><th>${e[0]} to ${e[e.length-1]}, a bar a year</th><th>downloads</th></tr></thead><tbody>${h}${l}</tbody><tfoot><tr><th scope="row">all of them</th><td>${wn(e,i)}</td><td>${Pt(a(i))}</td></tr></tfoot></table></figure>`}function El(t){if(t.querySelector("figure"))return;const e=ea(t,"/data/npm/index.json");fetch("/data/npm/downloads.json").then(n=>n.json()).then(n=>{t.innerHTML=Ko(n),t.append(e)}).catch(()=>{t.textContent="The download counts did not arrive. The rest of the page does not depend on them."})}const yn=["string-cache-map","async-barrier","spy-middleware","grunt-frontmatter","object-canonical-keys","gherkin-genie","async-deferrer","egg-hatchery","angular-tags","class-strict","micro-egg-hatchery","node-dio","ducks-middleware","drpx-updateable","generator-drpx","grunt-ngtags","teal-redux-egg","ducks-reducer","drpx-storage-mocks","strict-classes","ngtags","redux-egg","esmoquin","drpx-storage","dio-provider","drpx-components","grunt-angular-tags","drpx-bind-angular","drpx-toggle","drpx-id","drpx-seo","drpx-otherwisehome","drpx-class-route","drpx-transcludeto"],bn="downloads.json",Cl={name:"npm",directory:"public/data/npm",firstYear:2015,files:[bn],about:{measures:"downloads a year of the npm packages published as drpicox",attribution:"npm, Inc. Download counts of the public registry.",dataset:"https://github.com/npm/registry/blob/main/docs/download-counts.md",packages:yn},requestsFor(t){return[`https://api.npmjs.org/downloads/point/${t}-01-01:${t}-12-31/${yn.join(",")}`]},withYear(t,e,n){const a=n[0],s=Object.entries(typeof a=="object"&&a!==null?a:{}).flatMap(([o,r])=>{const i=r?.downloads;return yn.includes(o)&&typeof i=="number"&&i>0?[[o,i]]:[]});if(s.length===0)throw new Error("the registry did not answer with downloads");return{[bn]:{years:{...t[bn]?.years,[e]:Object.fromEntries(s)}}}}},jl=t=>Ko(JSON.parse(t("/data/npm/downloads.json")))+zt(JSON.parse(t("/data/npm/index.json"))),Ol={name:"packages",apps:{packages:El},stills:{packages:jl},sources:[Cl]},Pl={name:"portfolio",flags:[{name:"portfolio",description:"the lists with pictures as cards, the width of a program",trial:.5}]},Ll=/^\s*\* (.*)$/,Nl=/^#{1,6} /;function Rl(t){let e="";const n=[],a={s:0,n:0},s=i=>e+=e===""?i.toLowerCase():i[0].toUpperCase()+i.slice(1).toLowerCase(),o=(i,h)=>{a[h]+=1;const l=/shouldBe/i.test(e)&&!n.some(c=>c.name==="expected");n.push({value:i,name:l?"expected":`${h}${a[h]}`})},r=t.matchAll(/([A-Za-z]+)|("[^"]+")|(\d+)/g);for(const[,i,h,l]of r)i?s(i):h?(o(h,"s"),s("S")):l&&(o(l,"n"),s("N"));return{name:e,args:n}}const Dl=["there","is","are","has","have","need","needs"],Ye=(t,e)=>new RegExp(`\\b${e}\\b`,"i").test(t);function Fl(t,e){if(t.length===0)return[{line:e,message:'does not have any executable instruction by tests. Post lines that run must begin with " * ".'}];if(!t.some(s=>/should/i.test(s.name)))return[{line:t[t.length-1].line,message:'does not have any executable instruction that contains "should": at least one line must test that the outcome is the expected.'}];for(const s of t){const o=Dl.find(r=>Ye(s.text,r));if(o&&!Ye(s.text,"given")&&!Ye(s.text,"should"))return[{line:s.line,message:`has an instruction with the word "${o}" but no "should" or "given". Add "given" if it sets up, or "should" if it checks a result.`}]}const n=t.find(s=>Ye(s.text,"given")&&Ye(s.text,"should"));if(n)return[{line:n.line,message:'has an instruction with the word "given" and "should" at the same time. Keep "given" for a setup, "should" for an assertion.'}];if(t.some(s=>s.name===""))return[{line:t.find(s=>s.name==="").line,message:"has an instruction with no words in it."}];const a=t[t.length-1];return/should/i.test(a.name)?[]:[{line:a.line,message:'the last instruction must contain "should": a post ends by checking what it set out to show.'}]}function Bl(t){const[e="",...n]=t.replace(/\.md$/,"").split("_");return`Post_${e.replace(/-/g,"")}_${n.map(a=>a[0].toUpperCase()+a.slice(1)).join("")}_Context`}function Vo(t,e){const n=t.replace(/^---[\s\S]*?\n---\n/,p=>p.replace(/[^\n]/g,"")).split(`
`),a=n.find(p=>/^# /.test(p))?.slice(2).trim()??e,s=Bl(e),o=[],r=[];n.forEach((p,u)=>{const f=Ll.exec(p);if(f){const{name:y,args:w}=Rl(f[1]??""),k=`${y}(${w.map(b=>b.value).join(", ")})`;o.push({line:u+1,text:p.trim(),name:y,args:w,call:k}),r.push(`  await context.${k};	// ${p.trim()}`)}else Nl.test(p)&&r.push("",`  // ${p.trim()}`)});const i=Math.max(0,...r.map(p=>p.indexOf("	"))),h=r.map(p=>p.includes("	")?p.replace("	"," ".repeat(i-p.indexOf("	")+1)):p),l=["// !!! IMPORTANT !!!","// This test file is AUTOGENERATED by yarn create-tests","// DO NOT MODIFY manually.","",`test("${e}", async () => {`,`  const context = new ${s}();`,"  await context.beforeTest();",...h,"","  await context.afterTest();","});",""].join(`
`),c=new Set,d=o.filter(p=>!c.has(p.name)&&c.add(p.name)),m=[`export class ${s} {`,"  async beforeTest() {}","",...d.flatMap(p=>[`  async ${p.name}(${p.args.map(u=>u.name).join(", ")}) {`,"    // TODO","  }",""]),"  async afterTest() {}","}",""].join(`
`);return{title:a,className:s,steps:o,test:l,context:m,problems:Fl(o,n.length)}}const Ze=[{file:"2022-07-15_hello_blog.md",label:"Hello Blog — the first post of the course",markdown:`---
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
`}],Gt=t=>new Set(t.split(/\s+/).filter(Boolean)),Wl=Gt(`
  var let const function return if else for while do break continue new this
  true false null undefined class extends import export from default async await
  throw try catch finally typeof instanceof in of switch case delete void yield`),Hl=Gt(`
  auto break case char const continue default do double else enum extern float for goto if
  inline int long register restrict return short signed sizeof static struct switch typedef
  union unsigned void volatile while NULL true false`),ql=Gt(`
  abstract assert boolean break byte case catch char class const continue default do double
  else enum extends final finally float for goto if implements import instanceof int interface
  long native new package private protected public return short static strictfp super switch
  synchronized this throw throws transient try var void volatile while true false null`),zl=Gt(`
  AND AS CASE CLS CONST DECLARE DEFDBL DIM DO DOUBLE ELSE END EXIT FOR FUNCTION IF IS
  LOCATE LOOP NEXT NOT OR PRINT RANDOMIZE SCREEN SELECT SHARED STATIC STEP SUB THEN TO
  UNTIL WHILE OPTION BASE`);function _(t,e){return`<span class="hl-${t}">${T(e)}</span>`}function oa(t,e,n){for(let a=e+1;a<t.length;a+=1)if(t[a]==="\\")a+=1;else if(t[a]===n)return a+1;return t.length}function vn(t,e,n){let a="",s=0;for(;s<t.length;){const o=t.slice(s);let r;const i=t.lastIndexOf(`
`,s-1)+1,h=/^\s*$/.test(t.slice(i,s));if(o.startsWith("//")||n&&o[0]==="#"&&h){const l=t.indexOf(`
`,s),c=l<0?t.length:l;a+=_(o[0]==="#"?"a":"c",t.slice(s,c)),s=c}else if(o.startsWith("/*")){const l=t.indexOf("*/",s+2),c=l<0?t.length:l+2;a+=_("c",t.slice(s,c)),s=c}else if(o[0]==='"'||o[0]==="'"||o[0]==="`"){const l=oa(t,s,o[0]??"");a+=_("s",t.slice(s,l)),s=l}else if(r=/^[A-Za-z_$][\w$]*/.exec(o)){const l=r[0];a+=e.has(l)?_("k",l):T(l),s+=l.length}else(r=/^\d+(?:\.\d+)?/.exec(o))?(a+=_("n",r[0]),s+=r[0].length):(a+=T(o[0]??""),s+=1)}return a}function _l(t){let e="",n=0;for(;n<t.length;){const a=t.slice(n);let s;if(a.startsWith("%")){const o=t.indexOf(`
`,n),r=o<0?t.length:o;e+=_("c",t.slice(n,r)),n=r}else if(a.startsWith("/*")){const o=t.indexOf("*/",n+2),r=o<0?t.length:o+2;e+=_("c",t.slice(n,r)),n=r}else if(a[0]==="'"){const o=oa(t,n,"'");e+=_("s",t.slice(n,o)),n=o}else if(a.startsWith("-->")||a.startsWith(":-")){const o=a.startsWith("-->")?"-->":":-";e+=_("k",o),n+=o.length}else(s=/^[A-Z_][\w]*/.exec(a))?(e+=_("a",s[0]),n+=s[0].length):(s=/^[a-z][\w]*/.exec(a))?(e+=T(s[0]),n+=s[0].length):(e+=T(a[0]??""),n+=1)}return e}function Gl(t){let e="",n=0;for(;n<t.length;){const a=t.slice(n);let s;if(a[0]==="'"||/^REM\b/i.test(a)){const o=t.indexOf(`
`,n),r=o<0?t.length:o;e+=_("c",t.slice(n,r)),n=r}else if(a[0]==='"'){const o=t.indexOf('"',n+1),r=o<0?t.length:o+1;e+=_("s",t.slice(n,r)),n=r}else(s=/^[A-Za-z_][\w]*[$!#%&]?/.exec(a))?(e+=zl.has(s[0].toUpperCase())?_("k",s[0]):T(s[0]),n+=s[0].length):(s=/^\d+(?:\.\d+)?/.exec(a))?(e+=_("n",s[0]),n+=s[0].length):(e+=T(a[0]??""),n+=1)}return e}function Yl(t){let e="",n=0;for(;n<t.length;){const a=t.slice(n);if(a.startsWith("<!--")){const o=t.indexOf("-->",n+4),r=o<0?t.length:o+3;e+=_("c",t.slice(n,r)),n=r;continue}const s=/^<(\/?)([A-Za-z][\w-]*)/.exec(a);if(!s){const o=t.indexOf("<",n+1),r=o<0?t.length:o;e+=T(t.slice(n,r)),n=r;continue}for(e+=`&lt;${s[1]}${_("t",s[2]??"")}`,n+=s[0].length;n<t.length&&t[n]!==">";){const o=t.slice(n);let r;if(r=/^\s+/.exec(o))e+=r[0],n+=r[0].length;else if(r=/^[A-Za-z_:][\w:.-]*/.exec(o))e+=_("a",r[0]),n+=r[0].length;else if(o[0]==="="&&(o[1]==='"'||o[1]==="'")){const i=oa(t,n+1,o[1]??"");e+=`=${_("s",t.slice(n+1,i))}`,n=i}else e+=T(o[0]??""),n+=1}t[n]===">"&&(e+="&gt;",n+=1)}return e}function Wt(t,e){return e==="js"||e==="javascript"?vn(t,Wl,!1):e==="c"?vn(t,Hl,!0):e==="java"?vn(t,ql,!1):e==="prolog"?_l(t):e==="html"?Yl(t):e==="basic"?Gl(t):T(t)}function Xo(t,e){return`<div class="compiled">${t.problems.length?`<div class="refused"><strong>${T(e)}</strong> line ${t.problems[0].line}: ${T(t.problems[0].message)}<br>The tests are not written until the post is fixed.</div>`:""}<h4>${T(e.replace(/\.md$/,""))} → the test, never edited by hand</h4><pre><code>${Wt(t.test,"js")}</code></pre><h4>→ the context, written once and filled in by the coder</h4><pre><code>${Wt(t.context,"js")}</code></pre></div>`}function Ul(t){const e=g("div"),n=g("textarea",{class:"post",spellcheck:!1,rows:28,oninput:()=>r()}),a=g("input",{type:"text",value:Ze[0].file,oninput:()=>r()}),s=g("select",{onchange:()=>o(Number(s.value))},...Ze.map((i,h)=>g("option",{value:h},i.label)));function o(i){const h=Ze[i]??Ze[0];n.value=h.markdown,a.value=h.file,r()}function r(){e.innerHTML=Xo(Vo(n.value,a.value),a.value)}t.replaceChildren(g("div",{class:"row"},g("label",{},"Post ",s),g("label",{},"File ",a)),g("div",{class:"post-tests"},n,e)),o(0)}const Jl=()=>{const t=Ze[0];return`<div class="post-tests"><pre class="post">${t.markdown.replace(/&/g,"&amp;").replace(/</g,"&lt;")}</pre>${Xo(Vo(t.markdown,t.file),t.file)}</div>`},Kl={name:"post-tests",apps:{"post-tests":Ul},stills:{"post-tests":Jl}},Wn="program-asked";function Hn(t,e){t.dispatchEvent(new CustomEvent(Wn,{detail:e}))}function Ne(t){return t.toLowerCase().replace(/\s+/g,"-")}const kn=t=>typeof t=="string"?Ne(t):String(Number(t.toPrecision(4)));function Vl(t,e){const n=t.parameters.flatMap(a=>{const s=e[a.name];return s===void 0||kn(s)===kn(a.initial)?[]:[`--${a.name} ${kn(s)}`]});return[t.name,...n].join(" ")}function Qo(t){return Object.fromEntries(t.parameters.map(e=>[e.name,e.initial]))}function Xl(t){return t.scale!=="log"?{min:t.min,max:t.max,step:t.step,positionOf:e=>e,valueAt:e=>e}:{min:Math.log10(t.min),max:Math.log10(t.max),step:t.step,positionOf:e=>Math.log10(e),valueAt:e=>10**e}}const qn="program-ran";function Ql(t,e){const n=Xl(t),a=t.show??String,s=g("output"),o=g("input",{type:"range",name:t.name,min:n.min,max:n.max,step:n.step});return o.addEventListener("input",()=>e(n.valueAt(Number(o.value)))),{label:g("label",{},`${t.label}: `,s,o),settle:r=>{o.value=String(n.positionOf(Number(r))),s.textContent=a(Number(r))}}}function Zl(t,e){const n=g("select",{name:t.name},...t.choices.map(a=>g("option",{value:a},a)));return n.addEventListener("change",()=>e(n.value)),{label:g("label",{},`${t.label} `,n),settle:a=>{n.value=String(a)}}}function Zo(t){return e=>{let n=Qo(t);const a=e.dataset.dials?.split(" "),s=a!==void 0&&t.glance!==void 0,o=g("code"),r=g("div",{class:s?"program-figure glance":"program-figure"}),i=d=>m=>{n={...n,[d]:m},l()},h=t.parameters.filter(d=>!a||a.includes(d.name)).map(d=>({name:d.name,dial:"choices"in d?Zl(d,i(d.name)):Ql(d,i(d.name))}));function l(){for(const{name:d,dial:m}of h)m.settle(n[d]??"");o.textContent=`$ ${Vl(t,n)}`,r.innerHTML=s?t.glance?.(n)??"":t.run(n).html,e.dispatchEvent(new CustomEvent(qn,{detail:n}))}const c=d=>{n={...n,...d.detail},l()};return e.addEventListener(Wn,c),e.replaceChildren(g("div",{class:"dials"},...h.map(({dial:d})=>d.label)),g("p",{class:"program-line"},o),r),l(),()=>e.removeEventListener(Wn,c)}}const xt=149597870700,Ie=94607e11,rt=[{name:"the Moon",metres:3844e5,said:"384,400 km"},{name:"Mars",metres:.52*xt,said:"0.52 au"},{name:"Jupiter",metres:4.2*xt,said:"4.2 au"},{name:"Saturn",metres:8.5*xt,said:"8.5 au"},{name:"Pluto",metres:38.5*xt,said:"38.5 au"},{name:"Proxima Centauri",metres:4.24*Ie,said:"4.24 light-years"},{name:"Sirius",metres:8.58*Ie,said:"8.58 light-years"},{name:"Epsilon Eridani",metres:10.52*Ie,said:"10.52 light-years"},{name:"Tau Ceti",metres:11.91*Ie,said:"11.91 light-years"},{name:"the centre of the galaxy",metres:26e3*Ie,said:"26,000 light-years",towards:{ra:17.76,dec:-29}},{name:"Andromeda",metres:25e5*Ie,said:"2.5 million light-years",towards:{ra:.712,dec:41.27}}],tt={dryMass:25e3,fuel:5e3,exhaust:.72},ec=299792458;function ra(t){if(t<.01)return`${Math.round(t*ec/1e3).toLocaleString("en-US")} km/s`;if(t<.99)return`${(t*100).toPrecision(2)}% of c`;const e=Math.min(12,Math.ceil(-Math.log10(1-t)));return`${(Math.floor(t*10**e)/10**(e-2)).toFixed(e-2)}% of c`}const tc=[[365.25*86400*1e6,"million years"],[365.25*86400,"years"],[86400,"days"],[3600,"hours"],[60,"minutes"],[1,"seconds"]];function pe(t){const[e,n]=tc.find(([o])=>t>=o)??[1,"seconds"],a=t/e;return`${a>=10?Math.round(a).toLocaleString("en-US"):String(Math.round(a*10)/10)} ${n}`}const nc=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:3});function Ht(t){return t>=1e6?`${nc.format(t)} t`:`${t>=100?Math.round(t).toLocaleString("en-US"):t.toPrecision(2)} t`}const ne=299792458,ac=9.81;function ia(t,e){const n=e.acceleration*ac,a=e.dryMass+e.fuel,s=e.exhaust*ne,o=ne/n*Math.acosh(1+n*t/(2*ne*ne)),r=a*(1-Math.exp(-2*n*o/s)),i=r>e.fuel,h=i?s/(2*n)*Math.log(a/e.dryMass):o,l=Math.tanh(n*h/ne),c=ne/n*Math.sinh(n*h/ne),d=ne*ne/n*(Math.cosh(n*h/ne)-1),m=Math.max(0,t-2*d),p=i?m/(l*ne):0,u=p*Math.sqrt(1-l*l);return{shipTime:2*h+u,homeTime:2*c+p,burnTime:h,coastTime:u,topSpeed:l,fuelBurnt:i?e.fuel:r,coasts:i}}const sc=299792458,oc=9.81,Ue=720,$t=170,V={top:12,right:10,bottom:24,left:40};function rc(t,e){const n=Ue-V.left-V.right,a=$t-V.top-V.bottom,s=m=>V.left+m/t.shipTime*n,o=m=>V.top+a-m/Math.max(t.topSpeed,1e-12)*a,r=e.acceleration*oc,i=24,h=Array.from({length:i+1},(m,p)=>t.burnTime*p/i).map(m=>[m,Math.tanh(r*m/sc)]),c=[...h.map(([m,p])=>[m,p]),...h.reverse().map(([m,p])=>[t.shipTime-m,p])].map(([m,p])=>`${s(m).toFixed(1)},${o(p).toFixed(1)}`).join(" "),d=t.coasts?`<text x="${((s(t.burnTime)+s(t.shipTime-t.burnTime))/2).toFixed(1)}" y="${(o(t.topSpeed)+14).toFixed(1)}" text-anchor="middle">engine off, ${pe(t.coastTime)}</text>`:"";return`<svg class="trip" viewBox="0 0 ${Ue} ${$t}" role="img" aria-label="Speed against the ship's clock"><line class="grid" x1="${V.left}" x2="${Ue-V.right}" y1="${o(0)}" y2="${o(0)}"/><line class="grid" x1="${V.left}" x2="${Ue-V.right}" y1="${o(t.topSpeed)}" y2="${o(t.topSpeed)}"/><text x="${V.left}" y="${o(t.topSpeed)-3}">${ra(t.topSpeed)}</text><polyline class="line" points="${c}"/>${d}<text x="${V.left}" y="${$t-6}">departure</text><text x="${Ue-V.right}" y="${$t-6}" text-anchor="end">arrival, ${pe(t.shipTime)} on board</text></svg>`}function ic(t,e){const n=rt.map(o=>({destination:o,trip:ia(o.metres,t)})),a=n.map(({destination:o,trip:r})=>{const i=[o.name===e?"chosen":"",r.coasts?"coasts":""].filter(Boolean).join(" "),h=r.coasts?`all ${Ht(t.fuel)}, then coasts`:Ht(r.fuelBurnt);return`<tr${i?` class="${i}"`:""} data-destination="${o.name}"><th scope="row">${o.name}</th><td>${o.said}</td><td>${pe(r.shipTime)}</td><td>${pe(r.homeTime)}</td><td>${ra(r.topSpeed)}</td><td>${h}</td></tr>`}).join(""),s=n.find(({destination:o})=>o.name===e)??n[0];return`<figure class="rocket"><table class="voyages"><thead><tr><th>to</th><th>distance</th><th>on board</th><th>at home</th><th>top speed</th><th>fuel burnt</th></tr></thead><tbody>${a}</tbody></table>`+(s?`<h4>To ${s.destination.name}: speed against the ship's clock</h4>${rc(s.trip,t)}`:"")+"</figure>"}function er(t){return{dryMass:tt.dryMass,fuel:Number(t.fuel)*tt.dryMass,exhaust:Number(t.exhaust)/100,acceleration:Number(t.acceleration)}}const vs=365.25*86400,hc=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:2}),zn={name:"rocket",summary:"a relativistic rocket: how long a trip takes on board and at home, and what it burns",parameters:[{name:"acceleration",label:"Acceleration",description:"what the crew feels while the engine burns, in g",min:.05,max:3,step:.05,initial:.3,show:t=>`${t.toFixed(2)} g`},{name:"fuel",label:"Fuel",description:"fuel on board, as a multiple of the ship's own mass",min:.1,max:1e13,step:.05,initial:tt.fuel/tt.dryMass,scale:"log",show:t=>`${hc.format(t)} × the ship`},{name:"exhaust",label:"Exhaust speed",description:"the speed of what leaves the engine, in percent of the speed of light",min:1,max:100,step:1,initial:tt.exhaust*100,show:t=>`${Math.round(t)}% of c`},{name:"to",label:"To",description:"where to fly",choices:rt.map(t=>t.name),initial:"Proxima Centauri"}],run(t){const e=er(t),n=String(t.to),a=rt.map(h=>({destination:h,trip:ia(h.metres,e)})),s=a.find(({destination:h})=>h.name===n)??a[0],{destination:o,trip:r}=s,i=r.coasts?`all ${Ht(e.fuel)} of fuel, then coasts`:`${Ht(r.fuelBurnt)} of fuel`;return{text:`to ${o.name}, ${o.said}: ${pe(r.shipTime)} on board, ${pe(r.homeTime)} at home, top speed ${ra(r.topSpeed)}, ${i}`,html:ic(e,n),data:{ship:{dryMassTonnes:e.dryMass,fuelTonnes:e.fuel,exhaust:e.exhaust,accelerationG:e.acceleration},trips:a.map(({destination:h,trip:l})=>({to:h.name,distance:h.said,onBoardYears:l.shipTime/vs,atHomeYears:l.homeTime/vs,topSpeed:l.topSpeed,fuelBurntTonnes:l.fuelBurnt,coasts:l.coasts}))}}}},Tt=[{name:"Proxima Centauri",ra:14.495,dec:-62.68,lightYears:4.24},{name:"Alpha Centauri",ra:14.66,dec:-60.83,lightYears:4.37},{name:"Barnard's Star",ra:17.963,dec:4.69,lightYears:5.96},{name:"Wolf 359",ra:10.941,dec:7.01,lightYears:7.86},{name:"Lalande 21185",ra:11.056,dec:35.97,lightYears:8.31},{name:"Sirius",ra:6.752,dec:-16.72,lightYears:8.58},{name:"Luyten 726-8",ra:1.65,dec:-17.95,lightYears:8.73},{name:"Ross 154",ra:18.83,dec:-23.84,lightYears:9.69},{name:"Ross 248",ra:23.699,dec:44.18,lightYears:10.3},{name:"Epsilon Eridani",ra:3.549,dec:-9.46,lightYears:10.52},{name:"Lacaille 9352",ra:23.098,dec:-35.85,lightYears:10.72},{name:"Ross 128",ra:11.796,dec:.8,lightYears:11.01},{name:"EZ Aquarii",ra:22.643,dec:-15.3,lightYears:11.1},{name:"61 Cygni",ra:21.115,dec:38.75,lightYears:11.4},{name:"Procyon",ra:7.655,dec:5.22,lightYears:11.46},{name:"Struve 2398",ra:18.713,dec:59.63,lightYears:11.5},{name:"Groombridge 34",ra:.306,dec:44.02,lightYears:11.6},{name:"Epsilon Indi",ra:22.056,dec:-56.78,lightYears:11.87},{name:"Tau Ceti",ra:1.734,dec:-15.94,lightYears:11.91}];function St(t,e){const n=e.radius/e.reach;return t.map(({name:a,ra:s,dec:o,lightYears:r})=>{const i=s/24*2*Math.PI,h=o/180*Math.PI,l=r*Math.cos(h)*Math.cos(i),c=r*Math.cos(h)*Math.sin(i),d=r*Math.sin(h),m=c*Math.cos(e.yaw)-l*Math.sin(e.yaw),p=l*Math.cos(e.yaw)+c*Math.sin(e.yaw),u=d*Math.cos(e.pitch)-p*Math.sin(e.pitch),f=p*Math.cos(e.pitch)+d*Math.sin(e.pitch);return{name:a,x:m*n,y:-u*n,depth:f}})}const ye=299792458,lc=9.81;function cc(t,e,n){const a=e.acceleration*lc,s=d=>({distance:ye*ye/a*(Math.cosh(a*d/ye)-1),homeTime:ye/a*Math.sinh(a*d/ye),speed:Math.tanh(a*d/ye)}),o=s(t.burnTime),r=t.homeTime-2*o.homeTime,i=r*t.topSpeed*ye,h=2*o.distance+i,l=Math.max(0,Math.min(n,t.shipTime));if(l<=t.burnTime){const d=s(l);return{along:d.distance/h,homeTime:d.homeTime,speed:d.speed}}if(l<=t.burnTime+t.coastTime){const d=(l-t.burnTime)/t.coastTime;return{along:(o.distance+d*i)/h,homeTime:o.homeTime+d*r,speed:t.topSpeed}}const c=s(t.shipTime-l);return{along:1-c.distance/h,homeTime:t.homeTime-c.homeTime,speed:c.speed}}const Mt=12.5,ks=9,xs=1.5,dc=new Set(["Alpha Centauri"]),Y={ground:"#06080f",ring:"rgba(127,166,234,0.22)",stem:"rgba(127,166,234,0.18)",star:"#dfe7f5",dim:"#7d8aa3",sun:"#ffd98a",way:"#ff9d6e",ship:"#ffffff"};function uc(t,e,n){const a=t.getContext("2d");if(!a)return()=>{};const s=a,o=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=new Set(rt.map(({name:k})=>k));let i={yaw:.6,pitch:.45,radius:1,reach:Mt},h=0,l=performance.now(),c=null,d=[];const m=()=>({x:t.clientWidth/2,y:t.clientHeight/2});function p(k){const b=t.clientWidth,$=t.clientHeight,I=window.devicePixelRatio||1;t.width!==Math.round(b*I)&&(t.width=Math.round(b*I),t.height=Math.round($*I)),s.setTransform(I,0,0,I,0,0),s.fillStyle=Y.ground,s.fillRect(0,0,b,$),!o&&!c&&(i={...i,yaw:i.yaw+.0015}),i={...i,radius:Math.min(b,$)*.47};const M=m(),v=E=>({x:M.x+E.x,y:M.y+E.y});s.font="11px ui-monospace, Menlo, monospace";for(const E of[5,10]){const L=St(Array.from({length:73},(N,D)=>({name:"",ra:D/72*24,dec:0,lightYears:E})),i);s.beginPath(),L.forEach((N,D)=>D?s.lineTo(v(N).x,v(N).y):s.moveTo(v(N).x,v(N).y)),s.strokeStyle=Y.ring,s.stroke();const R=v(L[0]??{x:0,y:0});s.fillStyle=Y.dim,s.fillText(`${E} ly`,R.x+4,R.y-3)}const{ship:A,chosen:j}=e(),O=rt.find(({name:E})=>E===j),C=Tt.find(({name:E})=>E===j),S=O?ia(O.metres,A):null;d=St(Tt,i);const P=St(Tt.map(E=>({...E,lightYears:E.lightYears*Math.cos(E.dec/180*Math.PI),dec:0})),i),x=d.map((E,L)=>L).sort((E,L)=>(d[E]?.depth??0)-(d[L]?.depth??0));for(const E of x){const L=v(d[E]??{x:0,y:0}),R=v(P[E]??{x:0,y:0}),N=d[E]?.name??"",D=((d[E]?.depth??0)+Mt)/(2*Mt);s.strokeStyle=Y.stem,s.beginPath(),s.moveTo(L.x,L.y),s.lineTo(R.x,R.y),s.stroke(),s.fillStyle=N===j?Y.way:Y.star,s.globalAlpha=.45+.55*D,s.beginPath(),s.arc(L.x,L.y,1.6+1.8*D,0,2*Math.PI),s.fill(),r.has(N)&&(s.strokeStyle=N===j?Y.way:Y.dim,s.beginPath(),s.arc(L.x,L.y,7,0,2*Math.PI),s.stroke()),s.fillStyle=N===j?Y.way:Y.dim,dc.has(N)||s.fillText(N,L.x+10,L.y+4),s.globalAlpha=1}if(s.fillStyle=Y.sun,s.beginPath(),s.arc(M.x,M.y,4,0,2*Math.PI),s.fill(),s.fillText("the Sun",M.x+8,M.y-6),S&&O){const E=O.towards?St([{name:"",...O.towards,lightYears:Mt*1.15}],i)[0]:null,L=C?d[Tt.indexOf(C)]:E,R=(k-l)/1e3%(ks+2*xs),N=o?.5:Math.min(1,Math.max(0,(R-xs)/ks)),D=cc(S,A,N*S.shipTime);if(L){const H=v(L);s.strokeStyle=Y.way,s.setLineDash(C?[]:[4,4]),s.beginPath(),s.moveTo(M.x,M.y),s.lineTo(H.x,H.y),s.stroke(),s.setLineDash([]);const ce={x:M.x+(H.x-M.x)*D.along,y:M.y+(H.y-M.y)*D.along};s.fillStyle=Y.ship,s.beginPath(),s.arc(ce.x,ce.y,3,0,2*Math.PI),s.fill(),C||s.fillText(`to ${O.name}, ${O.said}: not to scale`,12,$-34)}else s.fillStyle=Y.dim,s.fillText(`${O.name} is inside the dot: the planets are a thousandth of a light-year away`,12,$-34);s.fillStyle=Y.star,s.font="13px ui-monospace, Menlo, monospace",s.fillText(`on board ${pe(N*S.shipTime)}`,12,22),s.fillText(`at home  ${pe(D.homeTime)}`,12,40),s.fillStyle=Y.dim,s.fillText(`${(D.speed*100).toFixed(D.speed>.99?4:1)}% of c`,12,58),s.fillText("drag to turn",b-96,$-14)}h=o&&!c?0:requestAnimationFrame(p)}const u=k=>{const b=t.getBoundingClientRect();return{x:k.clientX-b.left,y:k.clientY-b.top}},f=k=>{c=u(k),t.setPointerCapture(k.pointerId),h||(h=requestAnimationFrame(p))},y=k=>{if(!c)return;const b=u(k);i={...i,yaw:i.yaw+(b.x-c.x)*.01,pitch:Math.max(-1.4,Math.min(1.4,i.pitch+(b.y-c.y)*.01))},c=b},w=k=>{const b=u(k),$=m(),I=d.find(M=>r.has(M.name)&&Math.hypot($.x+M.x-b.x,$.y+M.y-b.y)<12);c=null,I&&(l=performance.now(),n(I.name))};return t.addEventListener("pointerdown",f),t.addEventListener("pointermove",y),t.addEventListener("pointerup",w),h=requestAnimationFrame(p),()=>{cancelAnimationFrame(h),t.removeEventListener("pointerdown",f),t.removeEventListener("pointermove",y),t.removeEventListener("pointerup",w)}}const mc=(t,e)=>{let n=Qo(zn);const a=h=>{n=h.detail};t.addEventListener(qn,a);const s=Zo(zn)(t,e),o=h=>{const l=h.target?.closest("[data-destination]")?.getAttribute("data-destination");l&&Hn(t,{to:l})};t.addEventListener("click",o);const r=g("canvas",{class:"starmap","aria-label":"The stars within twelve light-years of the Sun, turning, with the ship flying the chosen trip"});t.prepend(r);const i=uc(r,()=>({ship:er(n),chosen:String(n.to)}),h=>Hn(t,{to:h}));return()=>{i(),s?.(),t.removeEventListener(qn,a),t.removeEventListener("click",o)}},pc={name:"rocket",programs:[zn],apps:{rocket:mc}},_n=["Go to the blog section,","You should see a list of posts,",'The last post title should be "Hello Blog", this post'];function fc(t){let e=0,n="";const a=[],s={},o=l=>{const c=l.exec(t.slice(e));return c&&(e+=c[0].length),c?.[0]},r=l=>{n+=n.length===0?l.toLowerCase():l[0]?.toUpperCase()+l.slice(1).toLowerCase()},i=(l,c,d)=>{const m=s[c]??1;s[c]=m+1;const p=/shouldBe/i.test(n)&&!a.some(u=>u.name==="expected");a.push({value:l,name:p?"expected":`${c}${m}`,type:d})};let h=-1;for(;e<t.length&&h!==e;){h=e,o(/^[^a-z0-9"]+/i);const l=o(/^[a-z]+/i);l&&r(l);const c=o(/^"[^"]+"/);c&&(i(c,"s","String"),r("S"));const d=o(/^[0-9]+/);d&&(i(d,"n","int"),r("N"))}return{name:n,arguments:a,text:t}}const At=(t,e,n,a)=>`<div class="${a}"><h4>${T(t)}</h4><pre><code>${Wt(n,e)}</code></pre></div>`;function $s(t){const e=t.map(a=>`context.${a.name}(${a.arguments.map(s=>s.value).join(", ")});`),n=Math.max(0,...e.map(a=>a.length));return e.map((a,s)=>`  ${a.padEnd(n)}  // ${t[s]?.text.trim()}`).join(`
`)}function Ts(t){const e=new Set;return t.filter(n=>!e.has(n.name)&&e.add(n.name))}function tr(t){const e=t.map(fc).filter(r=>r.name.length>0),n=`@Test
public void post() {
${$s(e)}
}`,a=`test("post", () => {
${$s(e)}
});`,s=Ts(e).map(r=>`public void ${r.name}(${r.arguments.map(i=>`${i.type} ${i.name}`).join(", ")}) {
  // to write
}`).join(`

`),o=Ts(e).map(r=>`${r.name}(${r.arguments.map(i=>i.name).join(", ")}) {
  // to write
}`).join(`

`);return'<div class="step-code">'+At("The test, for the server","java",n,"step-test")+At("The test, for the client","js",a,"step-test")+At("What is left to write, in Java","java",s,"step-context")+At("And in JavaScript","js",o,"step-context")+"</div>"}function gc(t){const e=g("textarea",{class:"step-post",rows:6,spellcheck:!1,"aria-label":"A post, one step a line"});e.value=_n.map(s=>`* ${s}`).join(`
`);const n=g("div"),a=()=>{n.innerHTML=tr(e.value.split(`
`).map(s=>s.replace(/^\s*[*-]\s*/,"")))};e.addEventListener("input",a),t.replaceChildren(e,n),a()}const wc=()=>`<pre class="step-post">${_n.map(t=>`* ${t}`).join(`
`)}</pre>${tr(_n)}`,yc={name:"step-names",apps:{"step-names":gc},stills:{"step-names":wc}};class bc{listeners=new Set;send(e){for(const n of[...this.listeners])n(e)}on(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}}const Gn=new bc,vc=900,kc=480,It={x:1600,y:1e3};function Et(t,e){return(t%e+e)%e}class xc{x=0;y=0;written="";driving=!1;follow({byRadians:e,tiltedBy:n,seconds:a}){const s=document.documentElement;if(s.dataset.sky!=="stars")return;this.driving||this.takeOver(s);const o=vc/(Math.PI*2),r=(a/kc*Math.PI*2+e)*o;this.x=Et(this.x+r,It.x),this.y=Et(this.y-n*o,It.y);const i=`${(Math.round(this.x*2)/2).toFixed(1)}px ${(Math.round(this.y*2)/2).toFixed(1)}px`;if(i===this.written)return;this.written=i;const[h,l]=i.split(" ");s.style.setProperty("--sky-x",h??"0px"),s.style.setProperty("--sky-y",l??"0px")}release(){const e=document.documentElement;e.classList.remove("sky-driven"),e.style.removeProperty("--sky-x"),e.style.removeProperty("--sky-y"),this.x=0,this.y=0,this.written="",this.driving=!1}takeOver(e){const n=getComputedStyle(document.body,"::before").transform;if(n&&n!=="none")try{const a=new DOMMatrixReadOnly(n);this.x=Et(a.m41,It.x),this.y=Et(a.m42,It.y)}catch{}e.classList.add("sky-driven"),this.driving=!0}}function $c(t){return Gn.on(e=>t.follow(e))}const Ss=new xc,Tc={name:"sky",install:()=>$c(Ss),arrive:()=>Ss.release()},{width:Ms,height:Ct,pad:re}=aa;function Sc(t,e){const n=Math.max(...t.map(c=>c.values.length),1),a=Math.max(1,...t.flatMap(c=>c.values)),s=Ms-re.left-re.right,o=Ct-re.top-re.bottom,r=c=>re.left+c/Math.max(1,n-1)*s,i=c=>re.top+o-c/a*o,h=t.map(c=>{const d=c.values.map((m,p)=>`${r(p).toFixed(1)},${i(m).toFixed(1)}`).join(" ");return`<polyline class="line ${c.className}" points="${d}"><title>${c.name}</title></polyline>`}).join(""),l=t.map((c,d)=>`<rect class="${c.className}" x="${re.left+d*90}" y="${Ct-re.bottom+20}" width="10" height="3"/><text x="${re.left+d*90+14}" y="${Ct-re.bottom+24}">${c.name}</text>`).join("");return`<svg viewBox="0 0 ${Ms} ${Ct}" role="img" aria-label="${e.y} by ${e.x}">${Eo(a,e,n,na(a))}${h}${l}</svg>`}const xn=20;function Mc(t){const{baseTime:e,shortcutFactor:n,interestRate:a,timeHorizon:s}=t,o=[];let r=null;const i=e;let h=e*(1-n),l=0,c=0,d=0,m=0,p=0,u=0;for(let f=0;f<s*xn;){for(;p<=f;)l+=1,d+=1,p+=i;for(;u<=f;)c+=1,m+=1,u+=h,h*=1+a;if(f+=1,f%xn===0){const y=f/xn;o.push({month:y,cleanCumulative:l,debtCumulative:c,cleanMonthly:d,debtMonthly:m,debtFeatureCost:h}),d=0,m=0,r===null&&l>c&&(r=y)}}return{months:o,breakEvenMonth:r}}const As=t=>Mc({baseTime:Number(t["base-time"]),shortcutFactor:Number(t.shortcuts)/100,interestRate:Number(t.interest)/100,timeHorizon:Number(t.timeline)}),Is=({months:t})=>`<div class="chart"><h4>Cumulative features</h4>${Sc([{name:"Clean",className:"clean",values:t.map(e=>e.cleanCumulative)},{name:"Debt-driven",className:"debt",values:t.map(e=>e.debtCumulative)}],{x:"Months",y:"Features"})}</div>`,Ac={name:"technical-debt",summary:"what shortcuts cost, compounded: two teams build the same features, one of them cutting corners",parameters:[{name:"base-time",label:"Base time",description:"days a feature takes when it is done properly",min:1,max:30,step:1,initial:20,show:t=>`${t} days`},{name:"shortcuts",label:"Shortcuts",description:"percent of that time a shortcut saves, at first",min:0,max:90,step:5,initial:25,show:t=>`${t}%`},{name:"interest",label:"Interest",description:"percent dearer every shortcut feature makes the next one",min:0,max:100,step:1,initial:10,show:t=>`${t}%`},{name:"timeline",label:"Timeline",description:"months to look ahead",min:6,max:60,step:1,initial:24,show:t=>`${t} months`}],run(t){const e=Number(t.shortcuts),n=Number(t.interest),a=Number(t.timeline),s=As(t),{months:o,breakEvenMonth:r}=s,i=o[o.length-1],h=i?.cleanCumulative??0,l=i?.debtCumulative??0,c=h>0?(h-l)/h*100:0,d=Math.abs(c)<.1,m=d?"even":c>0?"loss":"gain",p=d?"≈0%":`${Math.abs(c).toFixed(1)}%`,u=r?`month ${r}`:"never",f=n===0?"With no interest there is no compound slowdown, and the shortcut simply wins. That is the one case that does not happen to real code.":r?`${e}% saved at first, ${n}% interest on every feature: clean development overtakes at month ${r}, and by month ${a} the shortcut road has delivered ${p} less.`:`${e}% saved at first, ${n}% interest on every feature: in ${a} months the clean road has not yet caught up. Give it longer, or raise the interest.`,y=[`<div class="clean"><strong>${h}</strong>clean features</div>`,`<div class="debt"><strong>${l}</strong>debt features</div>`,`<div><strong>${u}</strong>break-even</div>`,`<div><strong>${p}</strong>${m} on the shortcut road</div>`].join(""),w=Co([{name:"Clean",className:"clean",values:o.slice(1).map(k=>k.cleanMonthly)},{name:"Debt-driven",className:"debt",values:o.slice(1).map(k=>k.debtMonthly)}],{x:"Months",y:"Features a month"});return{text:`clean ${h} features, debt-driven ${l}, break-even ${u}
${f}`,html:`<div class="figures">${y}</div><div class="charts">${Is(s)}<div class="chart"><h4>Monthly delivery rate</h4>${w}</div></div><p>${f}</p>`,data:{cleanFeatures:h,debtFeatures:l,breakEvenMonth:r,months:o}}},glance:t=>Is(As(t))},Ic={name:"technical-debt",programs:[Ac]},Ec="theme";function nr(){const t=document.documentElement,e=t.dataset.pageTheme;let n=null;try{n=localStorage.getItem(Ec)}catch{n=null}const a=e??(n==="light"||n==="dark"||n==="pink"?n:null);a?t.dataset.theme=a:delete t.dataset.theme}function nt(...t){return t.map(e=>e.replace(/^[a-z]+:\/\//,"").replace(/^\/+|\/+$/g,"")).filter(Boolean).join("-")}const Cc=1e4,Yn=[];let Je=null;function Es(){const t=window.goatcounter?.count;if(!t)return!1;for(const e of Yn.splice(0))t({path:e,title:e,event:!0});return!0}function at(t){if(Yn.push(t),Es()||Je)return;const e=Date.now();Je=setInterval(()=>{(Es()||Date.now()-e>Cc)&&(Je&&clearInterval(Je),Je=null,Yn.splice(0))},250)}const Un="theme";function jc(){return window.matchMedia("(prefers-color-scheme: dark)").matches}function Oc(){let t=null;try{t=localStorage.getItem(Un)}catch{t=document.documentElement.dataset.theme??null}return t==="light"||t==="dark"?t:t==="pink"?"light":jc()?"dark":"light"}class Pc{apply(e){const n=e==="toggle"?Oc()==="dark"?"light":"dark":e;try{n==="system"?localStorage.removeItem(Un):localStorage.setItem(Un,n)}catch{}return nr(),at(nt("theme","set",n)),n}}function Lc(){let t=null;try{t=localStorage.getItem("theme")}catch{}at(nt("theme","start",t??"system"))}function Nc(t){const e=document.querySelector(".theme-toggle");return e?(e.classList.add("ready"),e.removeAttribute("aria-hidden"),e.removeAttribute("tabindex"),e.addEventListener("click",t),()=>e.removeEventListener("click",t)):()=>{}}const Jn=["light","dark","system","pink"];function Rc(t){return Jn.includes(t)}const Dc={light:"☀︎",dark:"☾︎",system:"◐︎",pink:"❀︎"};function Cs(t){const e=n=>`${Dc[n]} ${n}`;return{text:`theme   ${Jn.map(n=>n===t?`[${e(n)}]`:e(n)).join("   ")}`,html:`<pre class="choices">theme   ${Jn.map(n=>n===t?`<strong aria-current="true">${e(n)}</strong>`:`<a href="#" data-run="theme ${n}" title="theme ${n}">${e(n)}</a>`).join("   ")}</pre>`}}function Fc(t){return{name:"theme",usage:"theme [light|dark|system|pink|auto]",description:"switch the colours, or toggle them",run({site:e,cwd:n},[a]){const s=e.at(n)?.fields.theme;if(s)return{text:`theme: this page keeps its own, ${s}. It works everywhere else.`,error:!0};if(a===void 0)return Cs(t.apply("toggle"));const o=a==="auto"?"system":a;return Rc(o)?Cs(t.apply(o)):{text:`theme: ${a}: choose light, dark, system or pink`,error:!0}}}}const Bc={name:"theme",commands:[Fc(new Pc)],install:t=>(Lc(),Nc(()=>t.run("theme"))),arrive:()=>nr()},js=[{machine:"small",algorithm:"pairs",vertices:8,graphs:150,serial:42.43,openmp:14.34,cuda:2.572},{machine:"small",algorithm:"pairs",vertices:16,graphs:150,serial:738.92,openmp:247.95,cuda:33.06},{machine:"small",algorithm:"pairs",vertices:24,graphs:150,serial:4387.13,openmp:1208.97,cuda:109.093},{machine:"large",algorithm:"pairs",vertices:8,graphs:150,serial:7.483,openmp:1.511,cuda:.653},{machine:"large",algorithm:"pairs",vertices:16,graphs:150,serial:135.505,openmp:25.061,cuda:5.24},{machine:"large",algorithm:"pairs",vertices:24,graphs:150,serial:515.757,openmp:126.228,cuda:18.99},{machine:"small",algorithm:"common-labelling",vertices:8,graphs:50,serial:843.21,openmp:214.51,cuda:33.404},{machine:"small",algorithm:"common-labelling",vertices:16,graphs:50,serial:17061.4,openmp:4284.01,cuda:550.153},{machine:"small",algorithm:"common-labelling",vertices:24,graphs:50,serial:71670.13,openmp:20274.32,cuda:2332.076}],Wc={small:"Intel Atom 330, 2 cores, 8 W · NVIDIA 9400M, 16 cores, 10 W",large:"Intel i7 950, 4 cores, 130 W · NVIDIA GT 430, 96 cores, 49 W"},Hc={pairs:t=>`Matching every pair of ${t} graphs`,"common-labelling":t=>`Finding one labelling common to ${t} graphs`};function $n(t){if(t<10)return`${t.toFixed(1)} s`;if(t<60)return`${Math.round(t)} s`;const e=Math.floor(t/60);return e<60?e<10?`${e} min ${Math.round(t-e*60)} s`:`${Math.round(t/60)} min`:`${Math.floor(e/60)} h ${e%60} min`}const qc=t=>`×${t>=10?Math.round(t):t.toFixed(1)}`;function Os(t){const e=Math.max(...t.map(s=>s.serial/s.cuda)),n=(s,o)=>`<span class="bar ${o}" style="--p:${(s/e).toFixed(3)}"></span><span class="factor">${qc(s)}</span>`;return`<figure class="runs"><table class="runs"><thead><tr><th>each graph has</th><th>one thread</th><th>OpenMP, every core</th><th>CUDA, the graphics card</th></tr></thead>${[...new Set(t.map(s=>`${s.algorithm}/${s.machine}`))].map(s=>{const o=t.filter(l=>`${l.algorithm}/${l.machine}`===s),{algorithm:r,machine:i}=o[0],h=o.map(l=>`<tr><th scope="row">${l.vertices} vertices</th><td>${$n(l.serial)}</td><td>${$n(l.openmp)}<div class="speedup">${n(l.serial/l.openmp,"openmp")}</div></td><td>${$n(l.cuda)}<div class="speedup">${n(l.serial/l.cuda,"cuda")}</div></td></tr>`).join("");return`<tbody><tr class="group"><th colspan="4">${Hc[r](o[0]?.graphs??0)}<span>${Wc[i]}</span></th></tr>${h}</tbody>`}).join("")}</table><figcaption>Measured in 2011, on graphs of the GREC dataset. Each bar is how many times faster than one thread of the same machine, and all the bars are on one scale.</figcaption></figure>`}const zc={name:"thesis-results",stills:{"graph-matching-runs":()=>Os(js)},apps:{"graph-matching-runs":t=>{t.firstChild||(t.innerHTML=Os(js))}}},Kn={variable:"tn",atLeast:!0,threshold:20,months:[0,1,2,3,4,5,6,7,8,9,10,11]};function _c(t,e){const n=t.map(({value:u})=>u),a=Math.floor(Math.min(...n,...(e.spans??[]).map(({value:u})=>u))),s=Math.ceil(Math.max(...n,a+1)),o=So(t.map(({year:u})=>u),a,s),{x:r,y:i,slot:h}=o,l=u=>r(u)+h/2,c=[];for(const u of t){const f=c[c.length-1];f&&f[f.length-1]?.year===u.year-1?f.push(u):c.push([u])}const d=c.map(u=>`<polyline class="line" points="${u.map(({year:f,value:y})=>`${q(l(f))},${q(i(y))}`).join(" ")}"/>`).join(""),m=t.map(({year:u,value:f,title:y,partial:w})=>`<circle class="dot${w?" partial":""}" cx="${q(l(u))}" cy="${q(i(f))}" r="3.5"><title>${y}</title></circle>`).join(""),p=o.levels(e.spans??[]);return o.wrap(e.label,`${d}${m}${p}`)}function Gc(t,{threshold:e,atLeast:n},a){if(!t)return 0;const[s=0,...o]=t;return o.reduce((r,i,h)=>s+h*a>=e-1e-9===n?r+i:r,0)}const Fe={tn:{code:1002,unit:"°C",name:"daily minimum",summary:"mean",bin:.5,range:[-30,35]},tx:{code:1001,unit:"°C",name:"daily maximum",summary:"mean",bin:.5,range:[-25,50]},pp:{code:1300,unit:"mm",name:"daily rain",summary:"sum",bin:.5,range:[0,250]},pi:{code:1303,unit:"mm/h",name:"most rain in one hour",summary:"max",bin:.5,range:[0,100]}},Yc=.95,Uc=(t,e)=>new Date(Date.UTC(t,e+1,0)).getUTCDate(),ue=t=>t.reduce((e,n)=>e+n,0);function Jc(t,e){return t.length===0?null:e==="sum"?ue(t.map(({figure:n})=>n)):e==="max"?Math.max(...t.map(({figure:n})=>n)):ue(t.map(({figure:n,weight:a})=>n*a))/ue(t.map(({weight:n})=>n))}function Kc(t,e){const n=Fe[e.variable];return Object.entries(t.years).flatMap(([a,s])=>{const o=s[e.variable];if(!o)return[];const r=Number(a),i=o.months.map(u=>({days:Gc(u,e,n.bin),measured:ue(u?.slice(1)??[])})),h=u=>e.months.includes(u),l=ue(i.filter((u,f)=>h(f)).map(u=>u.measured)),c=ue(e.months.map(u=>Uc(r,u))),d=ue(i.filter((u,f)=>h(f)).map(u=>u.days)),m=o.summaries.flatMap((u,f)=>h(f)&&u!==null?[{figure:u,weight:i[f]?.measured??0}]:[]),p=Jc(m,n.summary);return[{year:r,days:d,elsewhere:ue(i.map(u=>u.days))-d,measured:l,expected:c,whole:l/c>=Yc,summary:p,months:i}]}).sort((a,s)=>a.year-s.year)}const Ps=["January","February","March","April","May","June","July","August","September","October","November","December"];function Ls(t){const{name:e,unit:n}=Fe[t.variable],a=t.variable==="pi"?"":"a ",s=t.atLeast?`of ${t.threshold} ${n} or more`:`below ${t.threshold} ${n}`,o=Ps[t.months[0]??0],r=Ps[t.months[t.months.length-1]??11],i=t.months.length===12?"whole year":`${o} to ${r}`;return`days with ${a}${e} ${s}, ${i}`}const ar=["January","February","March","April","May","June","July","August","September","October","November","December"],Vc=.55;function Xc(t,e,{days:n,measured:a}){const s=`${ar[e]} ${t}`;if(a===0)return`<td class="none" title="${s}: not measured"></td>`;const o=Math.round(n/a*1e3)/1e3;return`<td${o>=Vc?' class="deep"':""} style="--v:${o}" title="${s}: ${n} of ${a} days">${n||""}</td>`}function Qc(t,e){const n=`<tr><th></th>${ar.map(s=>`<th scope="col">${s.slice(0,3)}</th>`).join("")}</tr>`,a=[...t].reverse().map(({year:s,months:o})=>`<tr><th scope="row">${s}</th>${o.map((r,i)=>Xc(s,i,r)).join("")}</tr>`);return`<table class="heat calendar${e?" warm":""}"><thead>${n}</thead><tbody>${a.join("")}</tbody></table>`}const Ns=t=>t.reduce((e,n)=>e+n,0)/t.length;function Rs(t){const e=t.flatMap(({summary:n})=>n===null?[]:[n]);return{from:t[0]?.year??0,to:t[t.length-1]?.year??0,years:t.length,days:Ns(t.map(({days:n})=>n)),summary:e.length?Ns(e):null}}function Zc(t){const e=t.filter(a=>a.whole);if(e.length<4)return null;const n=Math.floor(e.length/2);return[Rs(e.slice(0,n)),Rs(e.slice(n))]}const ed=["January","February","March","April","May","June","July","August","September","October","November","December"],td={mean:"The mean",sum:"The total",max:"The highest"},et=t=>String(Math.round(t*10)/10),nd=t=>`${t>0?"+":t<0?"−":""}${et(Math.abs(t))}`,ad=t=>`${Number(t.slice(8,10))} ${ed[Number(t.slice(5,7))-1]} ${t.slice(0,4)}`;function sd(t,e){const{unit:n,name:a}=Fe[e.variable],s=Object.values(t.years).flatMap(i=>i[e.variable]?[i[e.variable].record]:[]),[o,r]=e.atLeast?s.map(([i,h])=>[i,h]).reduce((i,h)=>h[0]>i[0]?h:i):s.map(([,,i,h])=>[i,h]).reduce((i,h)=>h[0]<i[0]?h:i);return`<p class="record">The ${e.atLeast?"highest":"lowest"} ${a} on record here: ${o} ${n} on ${ad(r)}, whatever months are chosen.</p>`}function sr(t,e){const n=Fe[e.variable],a=`<figcaption><strong>${t.name}</strong> · ${t.altitude} m, ${t.setting} · ${Ls(e)}</figcaption>`,s=Kc(t,e);if(s.length===0)return`<figure class="weather">${a}<p>This station has no ${n.name} on record.</p></figure>`;const o=Zc(s),r=({from:u,to:f})=>`${u}–${f}`,i=o?'<div class="figures">'+o.map(u=>`<div><strong>${et(u.days)}</strong>days a year, ${r(u)}</div>`).join("")+`<div><strong>${nd(o[1].days-o[0].days)}</strong>days a year, from one half to the other</div></div>`:"",h=s.map(({year:u,days:f,elsewhere:y,measured:w,expected:k,whole:b})=>{const $=y>0?`, and ${y} more outside the months chosen`:"",I=b?"":`, with only ${w} of ${k} days measured`;return{year:u,value:f,partial:!b,title:`${u}: ${f} days${I}${$}`}}),l=(o??[]).map(u=>({from:u.from,to:u.to,value:u.days,label:`${et(u.days)} a year`})),c=s.flatMap(({year:u,summary:f,whole:y})=>f===null||!y?[]:[{year:u,value:f,title:`${u}: ${et(f)} ${n.unit}`}]),d=(o??[]).flatMap(u=>u.summary===null?[]:[{from:u.from,to:u.to,value:u.summary,label:`${et(u.summary)} ${n.unit}`}]),m=`${td[n.summary]} ${n.name} of each year, ${n.unit}`,p=(n.summary==="mean"?_c:Rn)(c,{label:m,spans:d});return`<figure class="weather">${a}${i}<h4>Days a year</h4>${Rn(h,{label:`Days a year: ${Ls(e)}`,spans:l})}<h4>When in the year they fell</h4>${Qc(s,e.atLeast&&n.unit==="°C")}<h4>${m}, in the months chosen</h4>${p}`+sd(t,e)+"</figure>"}const Ds=[{id:"tropical-nights",name:"tropical nights",variable:"tn",atLeast:!0,threshold:20},{id:"torrid-nights",name:"torrid nights",variable:"tn",atLeast:!0,threshold:25},{id:"hot-days",name:"hot days",variable:"tx",atLeast:!0,threshold:30},{id:"torrid-days",name:"torrid days",variable:"tx",atLeast:!0,threshold:35},{id:"frost-days",name:"frost days",variable:"tn",atLeast:!1,threshold:0},{id:"rainy-days",name:"rainy days",variable:"pp",atLeast:!0,threshold:1},{id:"heavy-rain",name:"days of heavy rain",variable:"pp",atLeast:!0,threshold:20},{id:"downpours",name:"days with a downpour",variable:"pi",atLeast:!0,threshold:10}],Oe=[{code:"WU",name:"Badalona - Museu",municipality:"Badalona",altitude:42,setting:"urban, by the sea"},{code:"X4",name:"Barcelona - el Raval",municipality:"Barcelona",altitude:33,setting:"dense city, on a roof"},{code:"X8",name:"Barcelona - Zona Universitària",municipality:"Barcelona",altitude:82,setting:"city edge"},{code:"D5",name:"Barcelona - Observatori Fabra",municipality:"Barcelona",altitude:410,setting:"wooded hill above the city"},{code:"UP",name:"Cabrils",municipality:"Cabrils",altitude:81,setting:"coastal slope, half rural"},{code:"XF",name:"Sabadell - Parc Agrari",municipality:"Sabadell",altitude:259,setting:"farmland beside a city"},{code:"XJ",name:"Girona",municipality:"Girona",altitude:72,setting:"market gardens by the city"},{code:"XE",name:"Tarragona - Complex Educatiu",municipality:"Tarragona",altitude:6,setting:"coast"},{code:"VK",name:"Raimat",municipality:"Lleida",altitude:286,setting:"inland plain, vineyards"}],Fs=[["whole year",[0,1,2,3,4,5,6,7,8,9,10,11]],["June to August",[5,6,7]],["May to October",[4,5,6,7,8,9]],["December to February",[0,1,11]]],od={tn:[-10,30],tx:[0,45],pp:[.5,100],pi:[.5,60]};function rd(t){const e=new Map,n=ea(t,"/data/weather/index.json"),a=g("div");a.append(...t.querySelectorAll("figure"));let s=null,o=Kn,r=!1;const i=(w,k)=>g("option",{value:w},k),h=g("select",{onchange:()=>{f(h.value)}},...Oe.map(({code:w,name:k})=>i(w,k))),l=g("select",{onchange:()=>{const w=Ds.find(({id:k})=>k===l.value);w&&u({variable:w.variable,atLeast:w.atLeast,threshold:w.threshold})}},...Ds.map(({id:w,name:k})=>i(w,k))),c=g("select",{onchange:()=>u({months:Fs[Number(c.value)]?.[1]??Kn.months})},...Fs.map(([w],k)=>i(k,w))),d=g("output"),m=g("input",{type:"range",step:.5,oninput:()=>u({threshold:Number(m.value)})});function p(){const[w,k]=od[o.variable];m.min=String(w),m.max=String(k),m.value=String(o.threshold),d.textContent=`${o.atLeast?"":"below "}${o.threshold} ${Fe[o.variable].unit}${o.atLeast?" or more":""}`,s&&(a.innerHTML=sr(s,o))}function u(w){o={...o,...w},p()}async function f(w){const k=e.get(w)??fetch(`/data/weather/${w}.json`).then(b=>b.json());e.set(w,k);try{const b=await k;if(r||h.value!==w)return;s=b,p()}catch{e.delete(w),a.replaceChildren(g("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}const y=g("div",{class:"dials"},g("label",{},"Station",h),g("label",{},"Counting",l),g("label",{},"Threshold: ",d,m),g("label",{},"Months",c));return t.replaceChildren(y,a,n),f(h.value),()=>{r=!0}}function id(t,e,[n,a]){if(t.length===0)return null;const s=Math.round((a-n)/e),o=new Map;for(const l of t){const c=Math.min(s-1,Math.max(0,Math.floor((l-n)/e+1e-9)));o.set(c,(o.get(c)??0)+1)}const r=Math.min(...o.keys()),i=Math.max(...o.keys());return[Math.round((n+r*e)*1e3)/1e3,...Array.from({length:i-r+1},(l,c)=>o.get(r+c)??0)]}const Bs="7bvh-jvq2",or=5e4,Ws=Object.entries(Fe),hd="No representatiu",ld=["Representatiu",""],cd=(t,e)=>Math.round(t*10**e)/10**e;function dd(t,e){if(t.length===0)return null;if(e==="max")return Math.max(...t);const n=t.reduce((a,s)=>a+s,0);return cd(e==="sum"?n:n/t.length,2)}function ud(t,e){const n=Array.from({length:12},(o,r)=>t.filter(({date:i})=>Number(i.slice(5,7))===r+1).map(({value:i})=>i)),a=t.reduce((o,r)=>r.value>o.value?r:o),s=t.reduce((o,r)=>r.value<o.value?r:o);return{months:n.map(o=>id(o,e.bin,e.range)),summaries:n.map(o=>dd(o,e.summary)),record:[a.value,a.date,s.value,s.date]}}function md(t){if(!Array.isArray(t))throw new Error("the portal did not answer with rows");if(t.length>=or)throw new Error("the answer was cut short at the limit");const e=t;if(!e.some(s=>s.data_lectura?.slice(5,7)==="12"))throw new Error("the year does not reach December yet");const n=new Map,a=new Set;for(const s of e){const o=s.estat??"";if(o===hd)continue;if(!ld.includes(o))throw new Error(`the network marks days as "${o}", which nobody has decided how to read`);const r=s.data_lectura?.slice(0,10)??"",i=`${s.codi_estacio}/${s.codi_variable}`;if(a.has(`${i}/${r}`))throw new Error(`${i} has ${r} twice`);a.add(`${i}/${r}`);const h=Number(s.valor);Number.isFinite(h)&&n.set(i,[...n.get(i)??[],{date:r,value:h}])}return n}const pd={name:"weather",directory:"public/data/weather",firstYear:1988,files:Oe.map(t=>`${t.code}.json`),about:{measures:"daily minimum and maximum temperature, daily rain, most rain in one hour",network:"Xarxa d'Estacions Meteorològiques Automàtiques (XEMA)",attribution:"Servei Meteorològic de Catalunya (XEMA). Dades obertes de la Generalitat de Catalunya.",dataset:`https://analisi.transparenciacatalunya.cat/d/${Bs}`,stations:Oe},requestsFor(t){const e=Oe.map(a=>`'${a.code}'`).join(","),n=Ws.map(([,a])=>a.code).join(",");return[Ao(Bs,{select:"codi_estacio,codi_variable,data_lectura,valor,estat",where:`codi_estacio in (${e}) and codi_variable in (${n}) and data_lectura between '${t}-01-01T00:00:00' and '${t}-12-31T23:59:59'`,limit:or})]},withYear(t,e,n){const a=md(n[0]);return Object.fromEntries(Oe.map(s=>{const o=`${s.code}.json`,r=Ws.flatMap(([l,c])=>{const d=a.get(`${s.code}/${c.code}`);return d?[[l,ud(d,c)]]:[]}),i=Object.fromEntries(r),h={...t[o]?.years,...r.length?{[e]:i}:{}};return[o,{...s,years:h}]}))}},fd=t=>{const e=JSON.parse(t(`/data/weather/${Oe[0]?.code}.json`)),n=JSON.parse(t("/data/weather/index.json"));return sr(e,Kn)+zt(n)},gd={name:"weather",apps:{weather:rd},stills:{weather:fd},sources:[pd]},Tn="header-world",Lt={saved(){try{const t=localStorage.getItem(Tn);if(!t)return null;const e=JSON.parse(t);return[e.seed,e.levels,e.roughness,e.share].every(a=>typeof a=="number"&&Number.isFinite(a))?e:null}catch{return null}},remember(t){try{localStorage.setItem(Tn,JSON.stringify(t))}catch{}},forget(){try{localStorage.removeItem(Tn)}catch{}}};function rr(t,e,n){const a=t.mesh.faces[n*3]??0,s=t.mesh.faces[n*3+1]??0,o=t.mesh.faces[n*3+2]??0;return((e[a]??0)+(e[s]??0)+(e[o]??0))/3}function wd(t,e){return rr(t,t.mesh.radii,e)}const yd=[24,92,168],bd=[62,176,206],vd=[214,196,138],Hs=[190,158,84],Sn=[70,138,66],kd=[74,104,76],xd=[136,128,116],qs=[238,243,247];function ve(t,e,n){const a=Math.min(1,Math.max(0,n));return[t[0]+(e[0]-t[0])*a,t[1]+(e[1]-t[1])*a,t[2]+(e[2]-t[2])*a]}function $d(t){return t>.78?Hs:t>.62?ve(Sn,Hs,(t-.62)/.16):t>.3?Sn:ve(kd,Sn,(t-.12)*5.5)}const ir=t=>{const e=new Uint8ClampedArray(t.mesh.faceCount*3),n=t.mesh.radii.reduce((s,o)=>Math.max(s,o),-1/0),a=Math.max(1e-6,n-t.seaRadius);for(let s=0;s<t.mesh.faceCount;s+=1){const o=(wd(t,s)-t.seaRadius)/a,r=rr(t,t.temperature,s);let i;o<=.002?(i=ve(bd,yd,.55),r<.16&&(i=ve(i,qs,(.16-r)*6))):(i=ve(vd,$d(r),Math.min(1,o*9)),i=ve(i,xd,Math.max(0,o-.55)*2.2),r<.26&&(i=ve(i,qs,(.26-r)*4))),e[s*3]=i[0],e[s*3+1]=i[1],e[s*3+2]=i[2]}return{...t,faceColour:e}};function hr(t,e){const n=new Float32Array(t.length*3),a=new Float32Array(t.length),s=new Float32Array(t.length);t.forEach((r,i)=>{n[i*3]=r.direction[0],n[i*3+1]=r.direction[1],n[i*3+2]=r.direction[2],a[i]=r.radius,s[i]=r.surface});const o=new Uint32Array(e.length*3);return e.forEach(([r,i,h],l)=>{o[l*3]=r,o[l*3+1]=i,o[l*3+2]=h}),{directions:n,radii:a,surface:s,faces:o,faceCount:e.length,vertexCount:t.length}}const Td=(t,e)=>(t+e)/2;function Sd(t,e,n=Td){const a=Array.from({length:t.vertexCount},(i,h)=>({direction:[t.directions[h*3]??0,t.directions[h*3+1]??0,t.directions[h*3+2]??0],radius:t.radii[h]??1,surface:t.surface[h]??0})),s=new Map,o=(i,h)=>{const l=i<h?`${i}:${h}`:`${h}:${i}`,c=s.get(l);if(c!==void 0)return c;const d=a[i],m=a[h],[p,u,f]=d.direction,[y,w,k]=m.direction,b=Math.hypot(p*d.radius-y*m.radius,u*d.radius-w*m.radius,f*d.radius-k*m.radius),[$,I,M]=[(p+y)/2,(u+w)/2,(f+k)/2],v=Math.hypot($,I,M)||1,A=n(d.surface,m.surface);a.push({direction:[$/v,I/v,M/v],radius:(d.radius+m.radius)/2+e(b),surface:A});const j=a.length-1;return s.set(l,j),j},r=[];for(let i=0;i<t.faceCount;i+=1){const h=t.faces[i*3],l=t.faces[i*3+1],c=t.faces[i*3+2],d=o(h,l),m=o(l,c),p=o(c,h);r.push([h,d,p],[l,m,d],[c,p,m],[d,m,p])}return hr(a,r)}function Md(t,e){return{...t,mesh:e,temperature:new Float32Array(e.vertexCount),faceColour:new Uint8ClampedArray(e.faceCount*3)}}const lr=(t=4,e=.28,n=.2)=>a=>{const s=_t(a.seed);let o=a.mesh;const r=Float32Array.from(o.surface,()=>s());o={...o,surface:r};for(let i=0;i<t;i+=1)o=Sd(o,h=>h*e*(s()-.5),(h,l)=>{const c=.5+(s()-.5)*(h-l)*n;return Math.min(1,Math.max(0,h*(1-c)+l*c))});return Md(a,o)},cr=(t=.55)=>e=>{const n=Float32Array.from(e.mesh.radii).sort(),a=Math.min(n.length-1,Math.floor(n.length*t)),s=n[a]??1,o=Float32Array.from(e.mesh.radii,r=>Math.max(r,s));return{...e,mesh:{...e.mesh,radii:o},seaRadius:s}};function Ad(t,e){return Math.abs(t.mesh.directions[e*3+1]??0)}const dr=({equator:t=1,pole:e=.05,peak:n=0}={})=>a=>{const s=new Float32Array(a.mesh.vertexCount),o=a.mesh.radii,r=o.reduce((l,c)=>Math.min(l,c),1/0),h=o.reduce((l,c)=>Math.max(l,c),-1/0)-r||1;for(let l=0;l<a.mesh.vertexCount;l+=1){const c=((o[l]??1)-r)/h,d=Ad(a,l)**2.2;s[l]=t+(e-t)*d+(n-t)*c}return{...a,temperature:s}},ee=(1+Math.sqrt(5))/2,Id=[[-1,ee,0],[1,ee,0],[-1,-ee,0],[1,-ee,0],[0,-1,ee],[0,1,ee],[0,-1,-ee],[0,1,-ee],[ee,0,-1],[ee,0,1],[-ee,0,-1],[-ee,0,1]],Ed=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];function Cd(){const t=Id.map(([e,n,a])=>{const s=Math.hypot(e,n,a);return{direction:[e/s,n/s,a/s],radius:1,surface:0}});return hr(t,Ed.map(e=>[...e]))}function jd(t){const e=Cd();return{seed:t,mesh:e,temperature:new Float32Array(e.vertexCount),faceColour:new Uint8ClampedArray(e.faceCount*3),seaRadius:0}}const Od=[lr(),cr(),dr(),ir];function Pd(t,e=Od){return e.reduce((n,a)=>a(n),jd(t))}function ur(t){return Pd(t.seed,[lr(t.levels,t.roughness),cr(t.share),dr(),ir])}const zs=.3,Ld=[-.5,.45,.74],Nd=1.02;class ha{size;pixels;depth;view=new Float32Array(0);screen=new Float32Array(0);constructor(e,n=new Uint8ClampedArray(e*e*4)){if(n.length!==e*e*4)throw new Error(`SphereRaster: ${e}×${e} needs ${e*e*4} bytes, not ${n.length}`);this.size=e,this.pixels=n,this.depth=new Float32Array(e*e)}paint(e,n){const{size:a,pixels:s,depth:o}=this;s.fill(0),o.fill(-1/0);const[r,i,h]=Rd(n.light??Ld),l=n.tilt??-.38,c=Math.cos(l),d=Math.sin(l),m=Math.cos(n.rotation),p=Math.sin(n.rotation),{directions:u,radii:f,faces:y,faceCount:w,vertexCount:k}=e.mesh;let b=1;for(let v=0;v<k;v+=1){const A=f[v]??1;A>b&&(b=A)}const $=a/(2*b*Nd);this.view.length<k*3&&(this.view=new Float32Array(k*3),this.screen=new Float32Array(k*3));const I=this.view,M=this.screen;for(let v=0;v<k;v+=1){const A=f[v]??1,j=(u[v*3]??0)*A,O=(u[v*3+1]??0)*A,C=(u[v*3+2]??0)*A,S=j*m-C*p,P=j*p+C*m,x=O*c+P*d,E=-O*d+P*c;I[v*3]=S,I[v*3+1]=x,I[v*3+2]=E,M[v*3]=a/2+S*$,M[v*3+1]=a/2-x*$,M[v*3+2]=E}for(let v=0;v<w;v+=1){const A=y[v*3]??0,j=y[v*3+1]??0,O=y[v*3+2]??0,C=M[A*3],S=M[A*3+1],P=M[A*3+2],x=M[j*3],E=M[j*3+1],L=M[j*3+2],R=M[O*3],N=M[O*3+1],D=M[O*3+2],H=(x-C)*(N-S)-(E-S)*(R-C);if(H>=0)continue;const ce=I[A*3],W=I[A*3+1],F=I[A*3+2],G=I[j*3]-ce,ae=I[j*3+1]-W,ca=I[j*3+2]-F,da=I[O*3]-ce,ua=I[O*3+1]-W,ma=I[O*3+2]-F,pa=ae*ma-ca*ua,fa=ca*da-G*ma,ga=G*ua-ae*da,Yt=Math.hypot(pa,fa,ga)||1,$r=pa/Yt*r+fa/Yt*i+ga/Yt*h,Ut=zs+(1-zs)*Math.max(0,$r),Tr=(e.faceColour[v*3]??0)*Ut,Sr=(e.faceColour[v*3+1]??0)*Ut,Mr=(e.faceColour[v*3+2]??0)*Ut,Ar=Math.max(0,Math.floor(Math.min(C,x,R))),Ir=Math.min(a-1,Math.ceil(Math.max(C,x,R))),Er=Math.max(0,Math.floor(Math.min(S,E,N))),Cr=Math.min(a-1,Math.ceil(Math.max(S,E,N)));for(let it=Er;it<=Cr;it+=1)for(let ht=Ar;ht<=Ir;ht+=1){const Jt=ht+.5,Kt=it+.5,jr=(x-C)*(Kt-S)-(E-S)*(Jt-C),wa=(R-x)*(Kt-E)-(N-E)*(Jt-x),ya=(C-R)*(Kt-N)-(S-N)*(Jt-R);if(jr>0||wa>0||ya>0)continue;const ba=wa/H,va=ya/H,ka=P*ba+L*va+D*(1-ba-va),$e=it*a+ht;ka<=o[$e]||(o[$e]=ka,s[$e*4]=Tr,s[$e*4+1]=Sr,s[$e*4+2]=Mr,s[$e*4+3]=255)}}return s}}function Rd([t,e,n]){const a=Math.hypot(t,e,n)||1;return[t/a,e/a,n/a]}const Dd=.2,Fd=.36,Bd=[{upTo:20,dark:4,bright:12},{upTo:70,dark:6,bright:14},{upTo:160,dark:2,bright:10},{upTo:198,dark:3,bright:11},{upTo:275,dark:1,bright:9},{upTo:330,dark:5,bright:13},{upTo:360,dark:4,bright:12}];function Wd(t,e,n){const a=Math.max(t,e,n),s=Math.min(t,e,n),o=(a+s)/2/255;if((a===0?0:(a-s)/a)<Dd)return o<.08?0:o<.5?8:o<.8?7:15;const i=a-s;let h;a===t?h=(e-n)/i*60:a===e?h=(2+(n-t)/i)*60:h=(4+(t-e)/i)*60,h<0&&(h+=360);const l=Bd.find(({upTo:c})=>h<c)??{dark:4,bright:12};return o<.08?0:o>=Fd?l.bright:l.dark}function Hd(t,e){const n=(s,o)=>{const r=(o*e+s)*4;return(t[r+3]??0)===0?-1:Wd(t[r]??0,t[r+1]??0,t[r+2]??0)},a=[];for(let s=0;s<e/2;s+=1){const o=[];for(let r=0;r<e;r+=1)o.push({top:n(r,s*2),bottom:n(r,s*2+1)});a.push(o)}return a}const Ke=["#000000","#0000aa","#00aa00","#00aaaa","#aa0000","#aa00aa","#aa5500","#aaaaaa","#555555","#5555ff","#55ff55","#55ffff","#ff5555","#ff55ff","#ffff55","#ffffff"];function qd(t){const e=({top:n,bottom:a})=>n<0&&a<0?"<span> </span>":n<0?`<span style="color:${Ke[a]}">▄</span>`:a<0?`<span style="color:${Ke[n]}">▀</span>`:n===a?`<span style="color:${Ke[n]}">█</span>`:`<span style="color:${Ke[n]};background:${Ke[a]}">▀</span>`;return t.map(n=>n.map(e).join("")).join(`
`)}const Vn={levels:4,roughness:.28,share:.55},Ve=32;let Mn=null,_s=null,An=null;function Gs(t,e){const n=document.querySelector('link[rel="icon"]');if(!n)return;Mn??=Object.assign(document.createElement("canvas"),{width:Ve,height:Ve});const a=Mn.getContext("2d");a&&(An??=a.createImageData(Ve,Ve),_s??=new ha(Ve,An.data),_s.paint(t,{rotation:e}),a.putImageData(An,0,0),n.type="image/png",n.href=Mn.toDataURL("image/png"))}const zd=90,_d=1e3/12,Gd=400,In=new WeakMap;function Yd(t){const e=(t.textContent??"").split(`
`);return{columns:Math.max(...e.map(n=>n.length)),rows:e.length}}function Xn(t,e){In.get(t)?.();const n=e??{...Vn,seed:Math.floor(Math.random()*16777215)},{columns:a,rows:s}=Yd(t),o=Math.min(a,s*2),r=ur(n),i=new ha(o);t.dataset.seed=String(n.seed),t.title=`World ${n.seed}, ${r.mesh.faceCount.toLocaleString("en")} triangles`;const h=y=>{t.innerHTML=qd(Hd(i.paint(r,{rotation:y}),o)),t.classList.add("grown")};if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return h(.6),Gs(r,.6),In.set(t,()=>{}),()=>{};let l=0,c=-1/0,d=-1/0;const m=performance.now(),p=qt(t),u=y=>{const w=(y-m)/1e3/zd*Math.PI*2;p.onScreen()&&y-c>=_d&&(h(w),c=y),y-d>Gd&&(Gs(r,w),d=y),l=requestAnimationFrame(u)};l=requestAnimationFrame(u);const f=()=>{cancelAnimationFrame(l),p.stop()};return In.set(t,f),f}function Ud(){const t=document.querySelector(".planet");return t?Xn(t,Lt.saved()??void 0):()=>{}}const Ee=360,Jd=60,Kd=1.4,Ys=Math.PI*2/Jd,Us=Math.PI*4;function Vd(t){const e=g("canvas",{class:"world",width:Ee,height:Ee}),n=e.getContext("2d");if(!n)return()=>{};const a={...Vn,seed:Math.floor(Math.random()*16777215)},s=n.createImageData(Ee,Ee),o=new ha(Ee,s.data),r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let i,h=.6,l=-.38,c=!r,d=null,m=0,p=performance.now();const u=g("p",{class:"hint"}),f=document.querySelector(".planet"),y=(20*4**Vn.levels).toLocaleString("en"),w=()=>{i=ur(a);const S=Lt.saved();u.textContent=`World ${a.seed}: ${i.mesh.faceCount.toLocaleString("en")} triangles. `+(S?`The header is keeping world ${S.seed}, ${(20*4**S.levels).toLocaleString("en")} triangles.`:`The header grows a new one every visit, ${y} triangles each.`),b.hidden=!S,$()},k=g("button",{type:"button",onclick:()=>{Lt.remember({...a}),f&&Xn(f,{...a}),w()}},"Put it in the header"),b=g("button",{type:"button",hidden:!0,onclick:()=>{Lt.forget(),f&&Xn(f),w()}},"Let the header grow its own"),$=()=>{o.paint(i,{rotation:h,tilt:l}),n.putImageData(s,0,0)};let I=0;const M=qt(e),v=S=>{const P=Math.min(.1,(S-p)/1e3);if(!d&&M.onScreen()){if(m!==0){m*=Math.exp(-P/Kd);const x=c?Ys:0;(Math.abs(m)<=x||Math.abs(m)<.01)&&(m=0)}m!==0?(h-=m*P,$()):c&&(h+=Ys*P,$()),Gn.send({byRadians:m*P,tiltedBy:0,seconds:P})}p=S,I=requestAnimationFrame(v)};e.addEventListener("pointerdown",S=>{d={x:S.clientX,y:S.clientY,at:S.timeStamp},m=0,e.setPointerCapture(S.pointerId)}),e.addEventListener("pointermove",S=>{if(!d)return;const P=e.clientWidth||Ee,x=(S.clientX-d.x)/P*Math.PI;h-=x;const E=l;l=Math.max(-1.2,Math.min(1.2,l-(S.clientY-d.y)/P*Math.PI)),Gn.send({byRadians:x,tiltedBy:l-E,seconds:0});const L=Math.max(.004,(S.timeStamp-d.at)/1e3);m=Math.max(-Us,Math.min(Us,m*.4+x/L*.6)),d={x:S.clientX,y:S.clientY,at:S.timeStamp},$()}),e.addEventListener("pointerup",S=>{d&&S.timeStamp-d.at>120&&(m=0),d=null,p=performance.now()}),e.addEventListener("pointercancel",()=>{d=null,m=0});const A=g("input",{type:"number",min:0,value:a.seed,onchange:()=>{a.seed=Math.max(0,Math.floor(Number(A.value)||0)),w()}}),j=g("button",{type:"button",onclick:()=>{a.seed=Math.floor(Math.random()*16777215),A.value=String(a.seed),w()}},"Another world"),O=g("button",{type:"button",onclick:()=>{c=!c,O.textContent=c?"Hold still":"Turn"}},c?"Hold still":"Turn"),C=(S,P,x,E,L,R)=>{const N=g("output",{},R(a[S])),D=g("input",{type:"range",min:x,max:E,step:L,value:a[S],onchange:()=>{a[S]=Number(D.value),N.textContent=R(a[S]),w()},oninput:()=>{N.textContent=R(Number(D.value))}});return g("label",{},`${P}: `,N,D)};return t.append(e,g("div",{class:"row"},g("span",{},"Seed "),A,j,O,k,b),g("div",{class:"dials"},C("levels","Detail",2,6,1,S=>`${S} splits`),C("roughness","Roughness",.02,1,.01,S=>S.toFixed(2)),C("share","Sea",0,.98,.01,S=>`${Math.round(S*100)}%`)),u),w(),I=requestAnimationFrame(v),()=>{cancelAnimationFrame(I),M.stop()}}const Xd={name:"world",apps:{worlds:Vd},install:()=>Ud()},be=[Xd,Bc,Tc,Ic,Qi,il,Ki,gd,Il,pc,Ol,zc,Ai,Kl,Kh,dl,bl,Ih,yh,Pl,ti,yc];function Qd(t){return Object.assign({},...t.flatMap(e=>e.programs??[]).map(e=>({[e.name]:Zo(e)})),...t.map(e=>e.apps??{}))}const Js="flags",Ks="flags-chosen",Vs="flags-drawn";function En(t){try{return localStorage.getItem(t)??""}catch{return""}}function Cn(t,e){try{e?localStorage.setItem(t,e):localStorage.removeItem(t)}catch{}}class Zd{on;picked;lots;constructor(){this.on=new Set((En(Js)||document.documentElement.dataset.flags||"").split(" ").filter(Boolean)),this.picked=new Set(En(Ks).split(" ").filter(Boolean));let e={};try{e=JSON.parse(En(Vs)||"{}")}catch{}this.lots=e}isOn(e){return this.on.has(e)}chosen(e){return this.picked.has(e)}drawn(e){return this.lots[e]}set(e,n){this.picked.add(e),delete this.lots[e],this.keep(e,n)}draw(e,n){this.lots[e]=n,this.keep(e,n)}keep(e,n){n?this.on.add(e):this.on.delete(e);const a=[...this.on].join(" ");Cn(Js,a),Cn(Ks,[...this.picked].join(" ")),Cn(Vs,Object.keys(this.lots).length?JSON.stringify(this.lots):""),a?document.documentElement.dataset.flags=a:delete document.documentElement.dataset.flags}}function eu(){return[document,navigator].map(e=>e.modelContext).find(e=>typeof e?.registerTool=="function")}function Xs(t,e){const n=[];for(const a of document.querySelectorAll(".app[data-app]")){const s=t[a.dataset.app??""]?.(a,e);s&&n.push(s)}return()=>{for(const a of n)a()}}function tu(t){const e={},n=t.fields.theme;(n==="dark"||n==="light")&&(e["data-page-theme"]=n);const a=t.fields.sky;return a&&(e["data-sky"]=a),e}const nu=["data-page-theme","data-sky"];function au(t,e){return e==="/"?t==="/":t.startsWith(e)}const mr=7.8,Qs=17,pr=12,su=8,jn=28,Zs=44,st=8,ou=40,ru=16;function iu(t){const e=new Map;for(const b of t.nodes){const $=b.label.split(`
`),I=Math.max(...$.map(M=>M.length),1);e.set(b.id,{id:b.id,label:b.label,real:!0,rank:-1,along:Math.max(40,I*mr+pr*2),across:$.length*Qs+su*2,pos:0,preds:[],succs:[]})}for(const b of t.edges)if(!e.has(b.from)||!e.has(b.to))throw new Error(`flow: edge ${b.from} --> ${b.to} names a node that is not there`);const n=hu(t),a={...t,edges:t.edges.map((b,$)=>n.has($)?{...b,from:b.to,to:b.from}:b)};for(const b of a.edges){const $=e.get(b.from),I=e.get(b.to);$.succs.push(I),I.preds.push($)}lu(e);const s=cu(e,a),o=du(e);uu(o);const r=o.length,i=o.map(b=>Math.max(Qs,...b.map($=>$.real?$.across:0))),h=[];let l=st;for(let b=0;b<r;b+=1)h.push(l),l+=(i[b]??0)+Zs;const c=b=>(h[b.rank]??0)+((i[b.rank]??0)-(b.real?b.across:0))/2,d=Math.max(...[...e.values()].map(b=>b.pos+b.along))+st,m=l-Zs+st,p=t.direction==="LR",u=(b,$)=>p?[$,b]:[b,$],f=[...e.values()].filter(b=>b.real).map(b=>{const[$,I]=u(b.pos,c(b));return{id:b.id,label:b.label,x:$,y:I,width:p?b.across:b.along,height:p?b.along:b.across}}),y=t.edges.map((b,$)=>{const I=s[$]??[],M=I[0],v=I[I.length-1];if(!M||!v)throw new Error("flow: an edge lost its ends");const A=t.edges.some(P=>P.from===b.to&&P.to===b.from),j=Math.min(ou,M.along/3,v.along/3),O=A?n.has($)?j:-j:0,C=[u(M.pos+M.along/2+O,c(M)+M.across),...I.slice(1,-1).map(P=>u(P.pos+P.along/2,c(P)+(i[P.rank]??0)/2)),u(v.pos+v.along/2+O,c(v))],S=n.has($)?C.reverse():C;return b.label===void 0?{from:b.from,to:b.to,points:S}:{from:b.from,to:b.to,label:b.label,points:S}}),[w,k]=u(d,m);return{direction:t.direction,width:w,height:k,nodes:f,edges:y}}function hu(t){const e=new Set,n=new Map,a=s=>{n.set(s,"walking"),t.edges.forEach((o,r)=>{o.from!==s||e.has(r)||(n.get(o.to)==="walking"?e.add(r):n.has(o.to)||a(o.to))}),n.set(s,"done")};for(const s of t.nodes)n.has(s.id)||a(s.id);return e}function lu(t){const e=new Set,n=a=>{if(a.rank>=0)return a.rank;if(e.has(a))throw new Error(`flow: there is a cycle through ${a.id}, and a flow has a direction`);return e.add(a),a.rank=a.preds.length===0?0:Math.max(...a.preds.map(n))+1,e.delete(a),a.rank};for(const a of t.values())n(a)}function cu(t,e){let n=0;return e.edges.map(a=>{const s=t.get(a.from),o=t.get(a.to);if(!s||!o)return[];const r=[s];let i=s;for(let h=s.rank+1;h<o.rank;h+=1){n+=1;const l={id:`\0${n}`,label:"",real:!1,rank:h,along:Math.max(ru,(a.label?.length??0)*mr+pr),across:0,pos:0,preds:[i],succs:[]};t.set(l.id,l),i.succs.push(l),r.push(l),i=l}return i!==s&&(i.succs.push(o),o.preds.push(i),s.succs.splice(s.succs.indexOf(o),1),o.preds.splice(o.preds.indexOf(s),1)),r.push(o),r})}function du(t){const e=Math.max(...[...t.values()].map(r=>r.rank))+1,n=Array.from({length:e},()=>[]);for(const r of t.values())n[r.rank]?.push(r);const a=new Map,s=r=>r.forEach((i,h)=>a.set(i,h));n.forEach(s);const o=(r,i)=>i.length===0?a.get(r)??0:i.reduce((h,l)=>h+(a.get(l)??0),0)/i.length;for(let r=0;r<4;r+=1){for(let i=1;i<e;i+=1){const h=n[i]??[];h.sort((l,c)=>o(l,l.preds)-o(c,c.preds)),s(h)}for(let i=e-2;i>=0;i-=1){const h=n[i]??[];h.sort((l,c)=>o(l,l.succs)-o(c,c.succs)),s(h)}}return n}function uu(t){const e=r=>r.reduce((i,h)=>i+h.along,0)+jn*Math.max(0,r.length-1),n=Math.max(...t.map(e));for(const r of t){let i=st+(n-e(r))/2;for(const h of r)h.pos=i,i+=h.along+jn}const a=r=>r.pos+r.along/2,s=(r,i)=>{const h=r.map(d=>{const m=i(d);return m.length===0?a(d):m.reduce((p,u)=>p+a(u),0)/m.length});let l=-1/0;r.forEach((d,m)=>{d.pos=Math.max((h[m]??0)-d.along/2,l),l=d.pos+d.along+jn});const c=r.reduce((d,m,p)=>d+a(m)-(h[p]??0),0)/Math.max(1,r.length);for(const d of r)d.pos-=c};for(let r=0;r<3;r+=1){for(let i=1;i<t.length;i+=1)s(t[i]??[],h=>h.preds);for(let i=t.length-2;i>=0;i-=1)s(t[i]??[],h=>h.succs)}const o=Math.min(...t.flat().map(r=>r.pos));for(const r of t.flat())r.pos+=st-o}const Qn=/(\w[\w.-]*)(?:\[([^\]]*)\])?/,mu=new RegExp(`^${Qn.source}\\s*-->(?:\\|([^|]*)\\|)?\\s*${Qn.source}$`),pu=new RegExp(`^${Qn.source}$`),fu=/^(?:flow\s+)?(TD|LR)$/i;function gu(t){const e=new Map,n=[];let a="TD";const s=(i,h)=>{i&&(e.has(i)||e.set(i,i),h!==void 0&&e.set(i,h.replace(/\\n/g,`
`)))},o=t.split(`
`);let r=!0;return o.forEach((i,h)=>{const l=i.trim();if(l===""||l.startsWith("%"))return;if(r){r=!1;const m=fu.exec(l);if(m){a=m[1]?.toUpperCase()==="LR"?"LR":"TD";return}}const c=mu.exec(l);if(c){const[,m,p,u,f,y]=c;s(m,p),s(f,y),n.push(u===void 0?{from:m??"",to:f??""}:{from:m??"",to:f??"",label:u});return}const d=pu.exec(l);if(d){s(d[1],d[2]);return}throw new Error(`flow: cannot read line ${h+1}: "${l}"`)}),{direction:a,nodes:[...e].map(([i,h])=>({id:i,label:h})),edges:n}}const wu=20,eo=17;function yu(t){let e=5381;for(let n=0;n<t.length;n+=1)e=(e*33^t.charCodeAt(n))>>>0;return e.toString(36)}const z=t=>String(Math.round(t*10)/10);function bu(t,e){const[n,...a]=t.points;if(!n)return"";let s=`M${z(n[0])},${z(n[1])}`,o=n;for(const r of a){const[i,h]=o,[l,c]=r,d=e?[(i+l)/2,h]:[i,(h+c)/2],m=e?[(i+l)/2,c]:[l,(h+c)/2];s+=` C${z(d[0])},${z(d[1])} ${z(m[0])},${z(m[1])} ${z(l)},${z(c)}`,o=r}return s}function vu(t){const{points:e}=t,n=e[Math.floor((e.length-1)/2)]??[0,0],a=e[Math.ceil((e.length-1)/2)]??n;return[(n[0]+a[0])/2,(n[1]+a[1])/2]}function ku(t){const e=iu(gu(t)),n=e.direction==="LR",a=`arrow-${yu(t)}`,s=e.edges.map(h=>{const l=`<path class="edge" d="${bu(h,n)}" marker-end="url(#${a})"/>`;if(h.label===void 0)return l;const[c,d]=vu(h);return`${l}<text class="edge-label" x="${z(c)}" y="${z(d)}" text-anchor="middle" dominant-baseline="middle">${T(h.label)}</text>`}).join(""),o=e.nodes.map(h=>{const l=h.x+h.width/2,c=h.label.split(`
`),d=h.y+(h.height-c.length*eo)/2,m=c.map((p,u)=>`<tspan x="${z(l)}" y="${z(d+wu-8+u*eo)}">${T(p)}</tspan>`).join("");return`<g class="node"><rect x="${z(h.x)}" y="${z(h.y)}" width="${z(h.width)}" height="${z(h.height)}" rx="4"/><text text-anchor="middle" dominant-baseline="middle">${m}</text></g>`}).join(""),r=z(e.width),i=z(e.height);return`<figure class="flow"><svg class="flow" viewBox="0 0 ${r} ${i}" width="${r}" height="${i}" style="max-width: 100%; height: auto" role="img"><defs><marker id="${a}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z"/></marker></defs>${s}${o}</svg></figure>`}const Xe={">=":"≥","<=":"≤","!=":"≠","->":"→","...":"…","*":"·",star:"∗","-":"−","'":"′",cdot:"·",inf:"∞",alpha:"α",beta:"β",gamma:"γ",delta:"δ",epsilon:"ε",lambda:"λ",mu:"μ",pi:"π",sigma:"σ",tau:"τ",phi:"φ",omega:"ω",Delta:"Δ",Sigma:"Σ"},to={sum:"∑",prod:"∏",int:"∫"},xu=new Set(["max","min","lim","log","ln","sin","cos","exp","arg"]);function $u(t){const e=[],n=/\s+|\.\.\.|>=|<=|!=|->|\d+(?:\.\d+)?|[A-Za-z]+|[{}]|[_^]|./g;for(const[a]of t.matchAll(n))/^\s+$/.test(a)||(a==="{"||a==="}"?e.push({kind:"brace",text:a}):a==="_"||a==="^"?e.push({kind:"script",text:a}):/^\d/.test(a)?e.push({kind:"number",text:a}):/^[A-Za-z]/.test(a)?e.push({kind:"name",text:a}):e.push({kind:"sign",text:a}));return e}function Tu(t){return t.split(`
`).map(e=>e.trim()).filter(Boolean).map(e=>`<math display="block"><mrow>${new Su($u(e)).expression()}</mrow></math>`).join("")}class Su{constructor(e){this.tokens=e}tokens;at=0;limits=!1;expression(){let e="";for(;this.at<this.tokens.length&&this.peek()?.text!=="}"&&this.peek()?.text!==")";)e+=this.item();return e}item(){let e=this.atom();const n=this.limits;this.limits=!1;let a=null,s=null;for(;this.peek()?.kind==="script";){const r=this.next().text,i=`<mrow>${this.group()}</mrow>`;r==="_"?a=i:s=i}const o=a&&s?n?"munderover":"msubsup":a?n?"munder":"msub":n?"mover":"msup";return!a&&!s?e:`<${o}>${e}${a??""}${s??""}</${o}>`}atom(){const e=this.next();if(e.kind==="brace"&&e.text==="{"){const n=this.expression();return this.expect("}"),`<mrow>${n}</mrow>`}if(e.text==="("){const n=this.expression();return this.peek()?.text===")"&&(this.at+=1),`<mrow><mo>(</mo>${n}<mo>)</mo></mrow>`}return e.kind==="number"?`<mn>${e.text}</mn>`:e.kind==="name"?e.text==="frac"?`<mfrac><mrow>${this.group()}</mrow><mrow>${this.group()}</mrow></mfrac>`:e.text==="sqrt"?`<msqrt>${this.group()}</msqrt>`:e.text==="text"?`<mtext>${T(this.phrase())}</mtext>`:e.text in to?(this.limits=!0,`<mo>${to[e.text]}</mo>`):xu.has(e.text)?`<mo>${e.text}</mo>`:e.text in Xe?/^[α-ωΑ-Ω]$/.test(Xe[e.text])?`<mi>${Xe[e.text]}</mi>`:`<mo>${Xe[e.text]}</mo>`:`<mi>${T(e.text)}</mi>`:`<mo>${T(Xe[e.text]??e.text)}</mo>`}group(){if(this.peek()?.text==="{"){this.next();const e=this.expression();return this.expect("}"),e}return this.atom()}phrase(){this.expect("{");const e=[];for(;this.at<this.tokens.length&&this.peek()?.text!=="}";)e.push(this.next().text);return this.expect("}"),e.join(" ")}peek(){return this.tokens[this.at]}next(){const e=this.tokens[this.at];if(!e)throw new Error("the formula ends early");return this.at+=1,e}expect(e){if(this.peek()?.text!==e)throw new Error(`expected ${e} in the formula`);this.at+=1}}function Mu(t,e){const a=/^https?:/.test(e)?' target="_blank" rel="noopener noreferrer"':"";return`<a href="${T(e)}"${a}>${t}</a>`}const Au=["large","wide","card"];function Iu(t,e,n){const a=n&&Au.includes(n)?` class="${n}"`:"",s=n==="card"?' loading="lazy"':"";return`<img src="${T(e)}" alt="${T(t)}"${a}${s}>`}const Eu=/(`[^`]+`|!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)|\[[^\]]+\]\([^)\s]+\))/g,Cu=/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/,ju=/^\[([^\]]+)\]\(([^)\s]+)\)$/;function fr(t){return t.split(Eu).map(e=>{if(e.startsWith("`")&&e.endsWith("`")&&e.length>1)return`<code>${T(e.slice(1,-1))}</code>`;const n=Cu.exec(e);if(n)return Iu(n[1]??"",n[2]??"",n[3]);const a=ju.exec(e);return a?Mu(fr(a[1]??""),a[2]??""):T(e)}).join("")}function Ou(t){const e=[];return t.replace(/<code>[\s\S]*?<\/code>/g,a=>`\0${e.push(a)-1}\0`).replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/(^|[^*])\*([^*]+)\*/g,"$1<em>$2</em>").replace(/ {2,}\n/g,"<br>").replace(/\n/g," ").replace(/ -- /g," — ").replace(/\u0000(\d+)\u0000/g,(a,s)=>e[Number(s)]??"")}function le(t){return Ou(fr(t))}function Pu(t){const e=t.split(`
`).map(p=>p.trim()).filter(Boolean),n=e.find(p=>!p.includes(" :: ")),a=e.filter(p=>p.includes(" :: ")).map(p=>{const u=p.indexOf(" :: ");return{left:p.slice(0,u).trim(),right:p.slice(u+4).trim()}}),s=a.filter(({left:p})=>p.startsWith("=")).map(({left:p,right:u})=>({value:Number(p.slice(1)),name:u})),o=a.filter(({left:p})=>!p.startsWith("=")).map(({left:p,right:u})=>{const[f="",y]=u.split("|").map(k=>k.trim()),w=Number(f.replace(/!$/,"").trim());return{label:p,value:w,shown:y??String(w),marked:f.endsWith("!")}}),r=Math.max(0,...o.map(({value:p})=>p),...s.map(({value:p})=>p))||1,i=p=>(Math.max(0,p)/r).toFixed(3),h=s[0],l=o.map(({label:p,value:u,shown:f,marked:y})=>`<tr${y?' class="marked"':""}><th scope="row">${le(p)}</th><td><span class="bar" style="--p:${i(u)}"></span><span class="value">${T(f)}</span></td></tr>`).join(""),c=h?` style="--rule:${i(h.value)}"`:"",d=h?` The line is ${T(h.name)}, at ${h.value}.`:"",m=n||h?`<figcaption>${n?le(n)+".":""}${d}</figcaption>`:"";return`<figure class="bars"><table${c}${h?' class="ruled"':""}><tbody>${l}</tbody></table>${m}</figure>`}function Lu(t){return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}const no=/^(?:[-*]|\d+\.)\s/;function Nu(t,e,n){if(!no.test(t[0]??""))return!1;const a=e.slice(n).find(s=>s.trim()!=="");return a!==void 0&&no.test(a)}function Ru(t){const e=[],n=t.replace(/\r\n?/g,`
`).split(`
`);let a=[],s=!1;return n.forEach((o,r)=>{if(o.startsWith("```")){s=!s,a.push(o),s||(e.push(a),a=[]);return}if(!s&&o.trim()===""){if(Nu(a,n,r+1))return;a.length&&e.push(a),a=[];return}a.push(o)}),a.length&&e.push(a),e}function Du(t){const e=/^(#{1,4})\s+(.*)$/.exec(t[0]??"");if(!e||!t.slice(0,-1).every(o=>/ {2,}$/.test(o)))return null;const a=e[1]?.length??1,s=[e[2]??"",...t.slice(1)].join(`
`);return`<h${a} id="${Lu(s)}">${le(s)}</h${a}>`}function Fu(t){if(!t[0]?.startsWith("```"))return null;const e=t[0].slice(3).trim(),n=t.slice(1,-1).join(`
`);return e==="flow"?ku(n):e==="bars"?Pu(n):e==="math"?Tu(n):`<pre><code>${Wt(n,e)}</code></pre>`}function Bu(t,e){const n=[];for(const a of t)e.test(a)?n.push(a.replace(e,"")):n.length&&(n[n.length-1]+=`
${a.trim()}`);return n}function Wu(t){const e=t[0]??"",n=/^\d+\.\s/.test(e),a=/^[-*]\s/.test(e);if(!n&&!a)return null;const s=n?/^\d+\.\s+/:/^[-*]\s+/;if(!t.every(i=>s.test(i)||/^\s/.test(i)))return null;const o=n?"ol":"ul",r=Bu(t,s).map(i=>`<li>${le(i)}</li>`).join("");return`<${o}>${r}</${o}>`}function Hu(t){return t.every(n=>n.includes(" :: "))?`<dl>${t.map(n=>{const a=n.indexOf(" :: ");return[n.slice(0,a),n.slice(a+4)]}).map(([n,a])=>`<dt>${le(n)}</dt><dd>${le(a)}</dd>`).join("")}</dl>`:null}function qu(t){if(!t.every(n=>n.startsWith(">")))return null;const e=t.map(n=>n.replace(/^>\s?/,"")).join(" ");return`<blockquote>${le(e)}</blockquote>`}function zu(t){const e=/^::([a-z0-9-]+)((?:\s+--[a-z0-9-]+)*)$/.exec(t[0]??"");if(!e||t.length!==1)return null;const n=(e[2]??"").split(/\s+/).filter(Boolean).map(a=>a.slice(2));return`<div class="app" data-app="${e[1]}"${n.length?` data-dials="${n.join(" ")}"`:""}></div>`}function _u(t){return t.length===1&&/^-{3,}$/.test(t[0]??"")?"<hr>":null}function Gu(t){const e=t.length===1&&/^(\\+)$/.exec(t[0]??"");return e?`<div class="space" style="--n:${e[1]?.length??1}"></div>`:null}function Yu(t){return t.length===1&&/^!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)$/.test(t[0]??"")?`<figure>${le(t[0]??"")}</figure>`:null}function Uu(t){return`<p>${le(t.join(`
`))}</p>`}const Ju=[_u,Gu,Du,Fu,qu,zu,Yu,Hu,Wu];function gr(t){return Ru(t).map(e=>{for(const n of Ju){const a=n(e);if(a!==null)return a}return Uu(e)}).join(`
`)}function la(t){return t==="/"?"~":`~${t.replace(/\/$/,"")}`}function wr(t,e){return`<p class="ran"><span class="ps1">${T(t)} $</span> ${T(e)}</p>`}function Ku(t,e){const n=t.childrenOf(e.route);if(n.length===0)return"";const a=n.map(s=>`<li><a class="entry" href="${s.route}"><code>${T(s.name)}${s.link?"@":"/"}</code><span class="title">${T(s.title)}</span>`+(s.summary?`<span class="summary">${T(s.summary)}</span>`:"")+"</a></li>").join("");return`${wr(la(e.route),"ls")}
<ul class="listing">${a}</ul>`}function Vu(t,e){const n=t.trailTo(e.route).slice(1).map(a=>a.name).join("/");return wr("~",n?`cd ${n} && cat README.md`:"cat README.md")}function Xu(t,e){return`${Vu(t,e)}
${gr(e.body)}
${Ku(t,e)}`}function Qu(t,e){const n=document.querySelector("main");if(!n)return()=>!1;const a=(s,{push:o=!0,keep:r=!1}={})=>{const i=t.at(s);if(!i)return!1;r||(n.innerHTML=Xu(t,i));const h=tu(i);for(const l of nu){const c=h[l];c?document.documentElement.setAttribute(l,c):document.documentElement.removeAttribute(l)}document.title=i.route==="/"?"David Rodenas":`${i.title} — David Rodenas`;for(const l of document.querySelectorAll("nav .navlink"))au(s,l.getAttribute("href")??"\0")?l.setAttribute("aria-current","page"):l.removeAttribute("aria-current");return o&&(s===window.location.pathname?window.history.replaceState({route:s},"",s):window.history.pushState({route:s},"",s),r||window.scrollTo({top:0})),window.goatcounter?.count?.({path:s,title:document.title}),e(i,r),!0};return document.addEventListener("click",s=>{if(s.defaultPrevented||s.button!==0||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey)return;const o=s.target?.closest("a[href]");if(!o||o.target||o.dataset.run)return;const r=new URL(o.href,window.location.href);if(r.origin!==window.location.origin)return;const i=r.pathname.endsWith("/")?r.pathname:`${r.pathname}/`;t.at(i)&&(s.preventDefault(),i!==window.location.pathname&&a(i))}),window.addEventListener("popstate",()=>{const s=window.location.pathname.endsWith("/")?window.location.pathname:`${window.location.pathname}/`;a(s,{push:!1})}),a}class Zu{typed=[];drafts=[];index=0;get lines(){return this.typed}add(e){this.typed.push(e),this.drafts=[...this.typed,""],this.index=this.typed.length}previous(e){return this.moveTo(this.index-1,e)}next(e){return this.moveTo(this.index+1,e)}moveTo(e,n){return this.drafts.length===0&&(this.drafts=[""]),e<0||e>=this.drafts.length?n:(this.drafts[this.index]=n,this.index=e,this.drafts[e]??n)}}function em(t,e,n,a){if(t==="k"){const s=e.slice(n);return{line:e.slice(0,n),caret:n,killed:s||a}}if(t==="u"){const s=e.slice(0,n);return{line:e.slice(n),caret:0,killed:s||a}}return t==="y"?{line:e.slice(0,n)+a+e.slice(n),caret:n+a.length,killed:a}:null}function yr(t){return t.split(/\s*(?:;|&&)\s*/).map(e=>e.trim().split(/\s+/).filter(Boolean)).filter(e=>e.length>0)}function xe(t,e){const a=e.startsWith("~")||e.startsWith("/")?[]:t.split("/").filter(Boolean),s=e.replace(/^~/,"").split("/").filter(Boolean),o=[...a];for(const r of s)r!=="."&&(r===".."?o.pop():o.push(r));return o.length===0?"/":`/${o.join("/")}/`}function tm(t){return t.replace(/(?:^|\/)(?:README\.md|\*)$/,"")||"."}const nm={name:"cat",usage:"cat <file>",description:"print a page, README.md or * for the one here",run({site:t,cwd:e},[n]){if(!n)return{text:"cat: usage: cat <file>",error:!0};const a=xe(e,tm(n)),s=t.at(a);return!s||/\.md$/.test(n)!==/README\.md$/.test(n)?{text:`cat: ${n}: no such file`,error:!0}:{html:gr(s.body),at:s.route}}},am={name:"cd",usage:"cd [dir]",description:"go to a directory (the address follows)",run(t,[e="~"]){const n=xe(t.cwd,e),a=t.site.at(n);return a?(t.cwd=a.route,{at:a.route}):{text:`cd: ${e}: no such directory`,error:!0}}},sm={name:"clear",usage:"clear",description:"clear what the shell has printed",run(){return{clear:!0}}},om={name:"find",usage:"find [path] [word]",description:"every page under a directory; with a word, only those it is in the name or title of",run({site:t,cwd:e},n){const[a,s]=n,o=a!==void 0&&(a==="."||a.includes("/")||t.at(xe(e,a))!==void 0),r=o?a??".":".",i=(o?s:a)?.toLowerCase(),h=xe(e,r);if(!t.at(h))return{text:`find: ${r}: no such directory`,error:!0};const l=u=>t.childrenOf(u).filter(f=>!f.link).flatMap(f=>[f,...l(f.route)]),d=[t.at(h),...l(h)].filter(u=>!i||u.route.toLowerCase().includes(i)||u.title.toLowerCase().includes(i));if(d.length===0)return{text:`find: nothing under ${r}${i?` with "${i}" in it`:""}`};const m=Math.max(...d.map(u=>u.route.length)),p=u=>" ".repeat(m-u.route.length);return{text:d.map(u=>`${u.route}${p(u)}  # ${u.title}`).join(`
`),html:`<pre class="listing">${d.map(u=>`<span class="line"><a href="${T(u.route)}">${T(u.route)}</a>${p(u)}<span class="hint">  # ${T(u.title)}</span></span>`).join("")}</pre>`}}},On=40,rm=t=>t.replace(/\]\([^)]*\)/g,"]").replace(/[#*_`>\[\]]/g,"").trim(),im={name:"grep",usage:"grep <word> [path]",description:"the lines of every page under a directory that say a word",run({site:t,cwd:e},[n,a="."]){if(!n)return{text:"grep: usage: grep <word> [path]",error:!0};const s=xe(e,a);if(!t.at(s))return{text:`grep: ${a}: no such directory`,error:!0};const o=n.toLowerCase(),r=t.pages.filter(c=>c.route.startsWith(s)).flatMap(c=>c.body.split(`
`).map((d,m)=>({page:c,number:m+1,line:rm(d)})).filter(({line:d})=>d.toLowerCase().includes(o)));if(r.length===0)return{text:`grep: no page under ${a} says "${n}"`};const i=r.slice(0,On),h=r.length>On?[`… and ${r.length-On} more. Give grep a directory to look in.`]:[],l=c=>T(c).replace(new RegExp(T(n).replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"ig"),d=>`<mark>${d}</mark>`);return{text:[...i.map(({page:c,number:d,line:m})=>`${c.route}:${d}: ${m}`),...h].join(`
`),html:`<pre class="listing wrap">${[...i.map(({page:c,number:d,line:m})=>`<span class="line"><a href="${T(c.route)}">${T(c.route)}</a>:${d}: <span class="hint">${l(m)}</span></span>`),...h.map(c=>`<span class="line">${T(c)}</span>`)].join("")}</pre>`}}},hm={name:"help",usage:"help [command]",description:"this",run({commands:t},[e]){if(e){const r=t.find(i=>i.name===e);return r?{text:`${r.usage}
  ${r.description}`}:{text:`help: ${e}: no such command`,error:!0}}const n=Math.max(...t.map(r=>r.usage.length)),a=t.map(r=>`${r.usage.padEnd(n)}  ${r.description}`),s="Tab completes; → takes the grey suggestion. ↑↓ recall. ^K kills to the end of the line, ^U back to the start, ^Y puts it back.",o=t.map(r=>`<dt><a href="#" data-run="help ${r.name}">${T(r.usage)}</a></dt><dd>${T(r.description)}</dd>`).join("");return{text:["Commands:",...a,"",s].join(`
`),html:`<p>Commands:</p><dl class="help">${o}</dl><p>${T(s)}</p>`}}};function lm(t){const e=t.filter(a=>a.startsWith("-")).flatMap(a=>a.slice(1).split("")),n=t.find(a=>!a.startsWith("-"))??".";return{flags:e,path:n}}function cm(t,e,n,a){const s=a==="."?"":`${a.replace(/\/$/,"")}/`;return[...e?[{mode:"dr-x",name:"..",title:e.title,summary:e.summary,href:e.route,run:`cd ${s}..`}]:[],{mode:"--r-",name:"README.md",title:t.title,summary:t.summary,href:t.route,run:`cat ${s}README.md`},...n.map(o=>o.link?{mode:"lr-x",name:`${o.name}@`,title:`-> ${o.route}  ${o.title}`,summary:o.summary,href:o.route}:{mode:"dr-x",name:`${o.name}/`,title:o.title,summary:o.summary,href:o.route})]}function ao(t){const e=t.run?` data-run="${T(t.run)}"`:"";return`<a href="${T(t.href)}"${e}>${T(t.name)}</a>`}function dm(t,e){const n=Math.max(...t.map(i=>i.name.length)),a=i=>" ".repeat(n-i.length),s=i=>e?`${i.mode}  ${i.name}${a(i.name)}  ${i.title}${i.summary?` — ${i.summary}`:""}`:`${i.name}${a(i.name)}  # ${i.title}`,o=i=>e?`<span class="line">${i.mode}  ${ao(i)}${a(i.name)}  ${T(i.title)}${i.summary?`<span class="hint"> — ${T(i.summary)}</span>`:""}</span>`:`<span class="line">${ao(i)}${a(i.name)}<span class="hint">  # ${T(i.title)}</span></span>`,r=e?[`total ${t.length}`]:[];return{text:[...r,...t.map(s)].join(`
`),html:`<pre class="listing">${[...r.map(i=>`<span class="line">${i}</span>`),...t.map(o)].join("")}</pre>`}}const um={name:"ls",usage:"ls [-lnr] [path]",description:"what a directory holds, in the site's own order; -l says more, -n sorts by name, -r reverses",run({site:t,cwd:e},n){const{flags:a,path:s}=lm(n),o=a.find(c=>!["l","n","r"].includes(c));if(o)return{text:`ls: -${o}: no such option. Try ls -l, -n by name, -r reversed`,error:!0};const r=xe(e,s),i=t.at(r);if(!i)return{text:`ls: ${s}: no such directory`,error:!0};const h=i.parent===null?void 0:t.at(i.parent),l=[...t.childrenOf(r)];return a.includes("n")&&l.sort((c,d)=>c.name.localeCompare(d.name)),a.includes("r")&&l.reverse(),dm(cm(i,h,l,s),a.includes("l"))}},mm={name:"pwd",usage:"pwd",description:"print where you are",run({cwd:t}){return{text:la(t)}}},br=[um,am,nm,om,im,mm,hm,sm];class pm{context;constructor(e,n,a=br){this.context={site:e,cwd:n,commands:a}}get prompt(){return`${la(this.context.cwd)} $`}moveTo(e){return this.context.site.at(e)?(this.context.cwd=e,!0):!1}run(e){const n=[];for(const[a="",...s]of yr(e)){const o=this.context.commands.find(i=>i.name===a),r=o?o.run(this.context,s):{text:`${a}: command not found. Try help`,error:!0};if(n.push(r),r.error)break}return n}complete(e){const n=e.split(/\s+/),a=n.pop()??"",s=n.length===0?"":`${n.join(" ")} `;return(n.length===0?this.commandNames():this.pathNames(a)).filter(r=>r.startsWith(a)).map(r=>s+r)}commandNames(){return this.context.commands.map(e=>e.name).sort()}pathNames(e){const n=e.lastIndexOf("/"),a=n<0?".":e.slice(0,n+1),s=xe(this.context.cwd,a);if(!this.context.site.at(s))return[];const o=n<0?"":a;return["README.md",...this.context.site.childrenOf(s).map(i=>`${i.name}/`)].map(i=>o+i)}}function fm(t,e,n){if(t==="")return"help";const s=[...[...e].reverse(),...n].find(o=>o.startsWith(t)&&o!==t);return s?s.slice(t.length):""}function gm(t){if(t.length===0)return null;const e=[];let n="";for(const a of t)a==="Enter"?(e.push(n),n=""):a==="Backspace"?n=n.slice(0,-1):n+=a;return{finished:e,unfinished:n}}const Pn="shell-pending",so={carry(t){try{t&&sessionStorage.setItem(Pn,t)}catch{}},take(){try{const t=sessionStorage.getItem(Pn)??"";return sessionStorage.removeItem(Pn),t}catch{return""}}};function wm(){window.__stopTyped?.();const t=window.__typed??[];return window.__typed=[],gm(t)}function ym(t,e,n={}){const a=document.querySelector(".terminal"),s=document.querySelector(".screen"),o=a?.querySelector("form.prompt"),r=o?.querySelector("input"),i=o?.querySelector(".line"),h=o?.querySelector(".suggest"),l=o?.querySelector(".ps1"),c=document.querySelector(".ran.end"),d=c?.querySelector(".ps1"),m=c?.querySelector(".line"),p=c?.querySelector(".typed");if(!a||!s||!o||!r||!i||!h||!l||!c||!d||!m||!p)return null;const u=()=>{l.textContent=f.prompt,d.textContent=f.prompt},f=new pm(t,e,n.commands),y=new Zu;let w=null;const k=x=>{s.append(x)},b=()=>{w?.remove(),w=null},$=()=>{const x=r.selectionStart??r.value.length;i.style.setProperty("--caret",String(x)),i.style.setProperty("--typed",String(r.value.length)),p.textContent=r.value,m.style.setProperty("--caret",String(x)),h.textContent=x===r.value.length?fm(r.value,y.lines,f.complete(r.value)):""},I=(x,E=x.length)=>{r.value=x,r.setSelectionRange(E,E),$()},M=x=>{if(x.clear&&(s.replaceChildren(),n.clearPage?.()),x.html){const E=g("div",{class:x.text?"listing-out":"cat"});E.innerHTML=x.html,k(E)}else x.text&&k(g("pre",{class:x.error?"error":""},x.text))},v=x=>{b();const E=[],L=g("p",{class:"echo"},g("span",{class:"ps1"},f.prompt),` ${x}`);k(L);let R=!1;const N=yr(x).map(D=>D.join(" "));for(let D=0;D<N.length;D+=1){n.heard?.((N[D]??"").split(" ")[0]??"");const[H]=f.run(N[D]??"");if(H){if(E.push(H),M(H),H.html&&!H.text&&(R=!0),H.at&&!n.moveTo?.(H.at))return so.carry(N.slice(D+1).join(" && ")),window.location.assign(H.at),E;if(H.error)break}}return u(),$(),R?L.scrollIntoView({block:"start"}):window.scrollTo({top:document.documentElement.scrollHeight}),E},A=()=>{if(b(),r.value.trim()===""){I("help");return}const x=f.complete(r.value);x.length===1?I(x[0]??r.value):x.length>1&&(w=g("p",{class:"hint"},x.map(E=>E.split(" ").pop()).join("  ")),o.insertAdjacentElement("afterend",w),window.scrollTo({top:document.documentElement.scrollHeight}))};o.addEventListener("submit",x=>{x.preventDefault();const E=r.value.trim();I(""),E&&(y.add(E),v(E))});let j="";r.addEventListener("keydown",x=>{if(x.key==="Tab")x.preventDefault(),A();else if(x.key==="ArrowUp")x.preventDefault(),I(y.previous(r.value));else if(x.key==="ArrowDown")x.preventDefault(),I(y.next(r.value));else if(x.key==="ArrowRight"&&r.selectionStart===r.value.length&&h.textContent)x.preventDefault(),I(r.value+h.textContent);else if(x.ctrlKey&&!x.metaKey&&!x.altKey){const E=em(x.key,r.value,r.selectionStart??r.value.length,j);if(!E)return;x.preventDefault(),b(),I(E.line,E.caret),j=E.killed}else b()});for(const x of["input","keyup","click","focus","select"])r.addEventListener(x,$);let O=!0;r.addEventListener("input",()=>{O&&r.value!==""&&window.scrollTo({top:document.documentElement.scrollHeight}),O=r.value===""}),document.addEventListener("selectionchange",()=>{document.activeElement===r&&$()}),s.addEventListener("click",x=>{const E=x.target?.closest("a[data-run]");E?.dataset.run&&(x.preventDefault(),v(E.dataset.run))}),window.addEventListener("keydown",x=>{const L=x.target?.matches("input, textarea, select, [contenteditable]")??!1,R=x.key.length===1&&!x.ctrlKey&&!x.metaKey&&!x.altKey;L||!R||r.focus({preventScroll:!1})}),o.addEventListener("click",()=>r.focus()),c.addEventListener("click",()=>r.focus()),$();const C=so.take();C&&v(C);const S=wm();if(S){for(const x of S.finished)x.trim()&&(y.add(x.trim()),v(x.trim()));I(S.unfinished),r.focus()}return{run:v,moveTo:x=>{f.moveTo(x)&&(s.replaceChildren(),u(),$())}}}function bm(t,e){return t.pages.find(n=>n.body.split(`
`).some(a=>a.trim()===`::${e}`))}function vm(t){const e=`${t.label}: ${t.description}`;return"choices"in t?{type:"string",enum:t.choices,default:t.initial,description:e}:{type:"number",minimum:t.min,maximum:t.max,default:t.initial,description:e}}function km(t){return{type:"object",properties:Object.fromEntries(t.parameters.map(n=>[n.name,vm(n)])),required:[],additionalProperties:!1}}const vr=t=>t.length<2?t.join(""):`${t.slice(0,-1).join(", ")} or ${t.at(-1)}`;function xm(t,e){if("choices"in t){if(e===void 0)return{value:t.initial};const a=Ne(String(e)),s=t.choices.find(o=>Ne(o)===a);return s===void 0?{error:`${t.name}: ${String(e)} is not one of ${vr(t.choices.map(Ne))}`}:{value:s}}const n=e===void 0?t.initial:typeof e=="number"?e:typeof e=="string"&&e.trim()!==""?Number(e):Number.NaN;return Number.isFinite(n)?n<t.min||n>t.max?{error:`${t.name}: ${n} is outside ${t.min} to ${t.max}`}:{value:n}:{error:`${t.name}: ${String(e)} is not a number`}}function kr(t,e){const n=t.parameters.map(o=>o.name),a=Object.keys(e).find(o=>!n.includes(o));if(a!==void 0)return{error:`no option ${a}: choose ${vr(n)}`};const s={};for(const o of t.parameters){const r=xm(o,e[o.name]);if("error"in r)return r;s[o.name]=r.value}return{values:s}}const $m={amp:"&",lt:"<",gt:">",quot:'"',"#39":"'",nbsp:" "};function Tm(t){return t.text?t.text:t.html?t.html.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g,"").replace(/<\/(p|h[1-6]|li|tr|div|pre|dt|dd|figcaption|blockquote)>|<br\s*\/?>/g,`
`).replace(/<[^>]+>/g,"").replace(/&(amp|lt|gt|quot|#39|nbsp);/g,(e,n)=>$m[n]??"").split(`
`).map(e=>e.replace(/\s+/g," ").trim()).filter(Boolean).join(`
`):""}const xr=t=>`Refused, nothing was run: ${t}`;function Sm(t,{site:e,goTo:n}){const a=`.app[data-app="${t}"]`,s=document.querySelector(a);if(s)return s;const o=bm(e,t);return!o||!n(o.route)?null:document.querySelector(a)}function Mm(t,e){return{name:t.name,description:`${t.summary}. The reader sees it too: the site goes to the program's page and its dials move to what was asked. Answers in words, then the figures as JSON.`,inputSchema:km(t),annotations:{readOnlyHint:!0},async execute(n){const a=kr(t,n);if("error"in a)return xr(a.error);const s=t.run(a.values);return Am(t.name,a.values,e),`${s.text}

${JSON.stringify(s.data)}`}}}function Am(t,e,n){const a=Sm(t,n);a&&(Hn(a,e),a.scrollIntoView?.({behavior:"smooth",block:"start"}))}function Im({run:t,programs:e}){return{name:"shell",description:`Runs a line at this site's prompt, as if the reader had typed it, and they see it echoed and answered. The site is laid out as directories of pages: ls, cd, cat README.md, find, grep and help work over it, and so does every program: ${e.map(n=>n.name).join(", ")}. Commands chain with &&.`,inputSchema:{type:"object",properties:{line:{type:"string",description:"the line to run, e.g. `cd projects && ls`"}},required:["line"],additionalProperties:!1},async execute(n){const a=t(String(n.line??"")),s=a.map(Tm).filter(Boolean).join(`

`);return a.some(o=>o.error)?xr(s):s}}}function Em(t,e){if(!t)return()=>{};const n=new AbortController,a=[...e.programs.map(s=>Mm(s,e)),Im(e)];for(const s of a)t.registerTool(s,{signal:n.signal});return()=>{n.abort();for(const s of a)t.unregisterTool?.(s.name)}}const Cm=[{file:"book/index.md",markdown:`---
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
`},{file:"craft/architecture.md",markdown:`---
link: /projects/architecture/
order: 12
---
`},{file:"craft/index.md",markdown:`---
title: The craft
summary: Rules that hold whoever writes the code, a person or an AI agent — shown as small working examples, each one running here.
order: 35
---

# A rule that matters  
goes into the code,  
not into a guide.

A guide can go unread. A type, a grammar or a test cannot be skipped, and it
does not matter who writes the change — a person or an AI agent: it holds for
both.

These are small examples of it, and every one of them runs here. And a
craft is shared, so the essays about it are here too.

- [The post is the test](/craft/the-post-is-the-test/)  
  Write a post, and see the test it becomes: each sentence is a step, named by its words.
- [The craft, in writing](/craft/writing/)  
  A craft is shared: a way through the essays about it, from tests as documentation to pairing and mobbing.
- [How this site is built](/projects/architecture/)  
  Its source as boxes and arrows, commit by commit, and the rules it is held to.
- [The post comes first](/teaching/software-lab/)  
  A course where posts were compiled into tests, and a grader read the repository.
- [Raft, and a recipe for concurrency](/teaching/raft/)  
  Three hints that let someone new to concurrency get a consensus algorithm right.
`},{file:"craft/raft.md",markdown:`---
link: /teaching/raft/
order: 14
---
`},{file:"craft/software-lab.md",markdown:`---
link: /teaching/software-lab/
order: 13
---
`},{file:"craft/the-post-is-the-test.md",markdown:`---
title: The post is the test
summary: My students got stuck on the regular expressions that tie each step of a test to its code, so a step's sentence became the code's name, and a post became the test. The idea, running, and where it went after the course.
order: 1
---

# A sentence is a step.  
The post is the test.

A behaviour test written in plain sentences needs, for every sentence, a
piece of code that knows what to do with it, and the usual way to find that
piece is a regular expression written to match the sentence. That is where my
students got stuck: on the expressions, and on naming the functions behind
the steps.

So the course's platform stopped matching sentences, and read them instead.
Every word goes into the name of a method; a quoted string becomes an
argument and an \`S\` in the name, a number an argument and an \`N\`. There is
nothing to match, because the sentence is the name. The post is the test,
and each of its sentences a step: write one, a step a line, and see what it
becomes:

::step-names

The test is the same for the server and for the client, one call a step,
with the step's sentence beside it — so a line that fails says, in the student's own
words, what did not happen. What is left to write are the methods at the
bottom, and writing them is the work. The rest of that course is in [the post
comes first](/teaching/software-lab/).

## Where it went

The idea went through several versions in the course, and then out of it, as
[Gherkin Genie](https://github.com/drpicox/gherkin-genie): the same reading of
sentences, for Gherkin and for any test runner, with no regular expressions at
all. A missing step is printed as the method to paste in, already named.
Later it was adapted once more, for the tests of a product at work.
`},{file:"craft/writing.md",markdown:`---
title: The craft, in writing
summary: A craft is shared. A way through the essays that are about it — tests as documentation, the series that are courses in disguise, pairing and mobbing, and clean code with a sense of when to stop.
order: 2
---

# A craft  
is shared.

I pair, I mob, I review by sitting beside someone rather than by leaving
comments on their work — and I write it down, every Saturday. This is a way
through the essays that are about the craft itself, in the order the ideas
came.

## Tests are documentation

The first thing I ever published was about this, and most of what came after
grows from it.

- [Why you should start writing tests as they were documentation](https://medium.com/p/73a356df3523)  
  It is great to suggest people write tests, but it is not enough.
- [What If We Could Use The Code To Write Our User Stories?](https://medium.com/p/301eddc7e566)  
  We see the code as the outcome of the user stories; what if we turned it around?
- [Improve Your Testing #17: Write a Blog](https://medium.com/p/e265a5f3048f)  
  Why writing a post makes you better at writing for machines.

It is also why, in my course, [the post is the test](/craft/the-post-is-the-test/).

## Improve Your Testing

A course in disguise, one Saturday at a time, from playing with a test to
why a perfect one cannot exist.

1. [Play With Your Tests](https://medium.com/p/bdaa154bc4bf)
2. [Real Developers Cheat](https://medium.com/p/f24c158b3d8e)
3. [Challenge Yourself to Make the Smallest Possible Changes](https://medium.com/p/8582157a2953)
4. [Rediscover the ‘Why’ in Code Testing](https://medium.com/p/9a3911bfd7e0)
5. [Unlearn Software Development Myths to Learn Beyond Your Limits](https://medium.com/p/9419be507cb6)
6. [The One Algorithm To Test Them All](https://medium.com/p/f2f25a721803)
7. [The checklist of AAA](https://medium.com/p/12eec62f8474)
8. [Keeping Your Tests Short and Clean](https://medium.com/p/0a3a560058a0)
9. [Learn From Testing Mistakes](https://medium.com/p/094ae77b0f81)
10. [Learn From Code Coverage](https://medium.com/p/999f9feabb60)
11. [Breaking through the barrier of 100% code coverage](https://medium.com/p/0c7813a2bd90)
12. [The F.I.R.S.T. Principles](https://medium.com/p/21b626806d6c)
13. [When F.I.R.S.T. Principles Aren’t Enough](https://medium.com/p/9d38d3f0058d)
14. [Mocks, Spies, and Stubs](https://medium.com/p/5649195944dd)
15. [Make Tests Human](https://medium.com/p/05a3ea1c9097)
16. [Simplify Your Dependencies](https://medium.com/p/44af982f8973)
17. [Write a Blog](https://medium.com/p/e265a5f3048f)
18. [Make Your Tests Fast](https://medium.com/p/a42d4a22af24)
19. [The Infinite Test Conundrum](https://medium.com/p/e5443a93fc51)

## TDD with BDD-Gherkin

A small shop built test first, step by step, and what came out of it.

- [How to TDD with BDD-Gherkin in JavaScript](https://medium.com/p/495b2b726cf), then
  [fetching from services](https://medium.com/p/2383c2d39e12),
  [adding Redux](https://medium.com/p/ab3e2f5564b1),
  [Redux first](https://medium.com/p/2c561ad0d3c5) and
  [fetching with Redux](https://medium.com/p/9ad060ec96e).
- [Stop Using Gherkin as Scripting Language](https://medium.com/p/9097d8a2edb9)  
  Common across QA teams, of dubious use, and far from what it is for.
- [Presenting Gherkin Genie](https://medium.com/p/ae822789e1d7)  
  Your wish to quickly run Gherkin feature files in Jest is granted.

## Pairing, mobbing, reviewing

- [Pair Programming Is the Better Code Review](https://medium.com/p/eddf750ba19b)  
  What if the whole approach to code review is flawed?
- [Why You Should Not Trust Pull Requests](https://medium.com/p/f6e1fa82ee1)  
  Something is wrong with them, and you can feel it.
- [What If Most PR Comments Didn’t Need to Block the Merge?](https://medium.com/p/1cc8175bd5db)  
  A pragmatic compromise, after years of arguing for reviewing together.
- [Don’t Chat With Your AI. Mob With It.](https://drpicox.medium.com/dont-chat-with-your-ai-mob-with-it-83358a68f6ac)  
  The chat loop makes you wait: put the agent in a loop over your files, and run several at once.

## Clean code, and when to stop

- [The Goal Of Clean Code Isn’t Perfect Code, but Maintaining Agility](https://medium.com/p/fc4478a489a1)  
  How over-engineering in the name of clean code hurts maintainability.
- [Clean As You Cook, Clean As You Code](https://medium.com/p/f678a10ac1fa)  
  The discipline of a restaurant kitchen that code needs just as much.
- [Your Clean Code Might Be Someone Else’s Technical Debt](https://medium.com/p/3cefdd8fa17f)  
  Why patterns must adapt to the size of the team.
- [Refactor All the Things All the Time](https://medium.com/p/9cfbd49df35e)  
  Rewrite continuously whatever is necessary, instead of tiptoeing through the code.
- The Bowling Game Kata: refactor lessons, [one](https://medium.com/p/90b110a2ad17) and
  [two](https://medium.com/p/1d28b3a78b08), [what to test](https://medium.com/p/fc771d5e39e8) and
  [how to design](https://medium.com/p/a37d8d11be9c).
- [Asking the AI to clean your code is only half an instruction](https://medium.com/p/0b5058e302bf)  
  Why asking it to clean up is not enough, and what tells it when to stop.

## TDD, as a practice

- [TDD is Not a Stupid Idea, It is Brilliant](https://medium.com/p/177426ab8a2c)  
  Counterintuitive, and so one of the toughest things in programming to learn.
- [Successfully adopting TDD in your team](https://medium.com/p/f2bc333ca59a)  
  Its enemies, and the keys to bring it in.
- [TDD is a Personality Development Framework in Disguise](https://medium.com/p/9d7aceab5d9c)  
  How a testing strategy quietly builds thinkers, doers and charmers.
- [Scrum vs Extreme Programming: Was XP Right All Along?](https://medium.com/p/1bb1061e9e6b)  
  Could the most popular methodology be what holds teams back?

The rest, by subject, is in [essays](/essays/); what I have said about the
same things out loud, agile among them, is in [talks](/talks/).
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
2016-11 → 2017-12 :: **Testing**, four times, and each time a different room: a workshop, then *from the company to the university and back*, then *company, university and professionalism*.
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
- [Raft, and a recipe for concurrency](/teaching/raft/) -- UOC, the distributed systems laboratory, 2013. A consensus algorithm as the assignment, the year before its paper was presented, and the three steps -- copy inside the guard, work outside it, check before writing -- that let someone writing their first concurrent program get it right.
- [The Bowling Game Kata](/teaching/kata/) -- Robert C. Martin's kata, as I gave it twice in June 2016, with the slides and a repository to do it in JavaScript or Java.

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
`},{file:"teaching/raft.md",markdown:`---
title: Raft, and a recipe for concurrency
summary: A consensus algorithm as a laboratory assignment in 2013, and the three hints — above all a three-step recipe — that let someone who has never written concurrent code get it right.
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
`}],oo="---";function jm(t){return(/^"(.*)"$/.exec(t)??/^'(.*)'$/.exec(t))?.[1]??t}function Om(t){const e=t.replace(/\r\n?/g,`
`).split(`
`);if(e[0]?.trim()!==oo)return{fields:{},body:t.trim()};const n=e.indexOf(oo,1);if(n<0)return{fields:{},body:t.trim()};const a={};for(const s of e.slice(1,n)){const o=s.indexOf(":");o<=0||(a[s.slice(0,o).trim()]=jm(s.slice(o+1).trim()))}return{fields:a,body:e.slice(n+1).join(`
`).trim()}}function Pm(t){const n=t.replace(/\.md$/,"").replace(/(^|\/)index$/,"");return n===""?"/":`/${n}/`}function ro(t){if(t==="/")return"/";const e=t.slice(0,-1);return e.slice(e.lastIndexOf("/")+1)}function Lm(t){if(t==="/")return null;const e=t.slice(0,-1);return e.slice(0,e.lastIndexOf("/")+1)}function Nm(t){const{fields:e,body:n}=Om(t.markdown),a=Pm(t.file);return{file:t.file,route:a,parent:Lm(a),name:ro(a),title:e.title??ro(a),summary:e.summary??"",order:Number(e.order??"100"),body:n,fields:e}}function Rm(t){return t.endsWith("/")?t:`${t}/`}function io(t,e){return t.order-e.order||t.name.localeCompare(e.name)}class Dm{byRoute;linked;constructor(e){const n=e.map(Nm),a=n.filter(s=>!s.fields.link).sort(io);this.byRoute=new Map(a.map(s=>[s.route,s])),this.linked=new Map(n.flatMap(s=>{const o=this.byRoute.get(Rm(s.fields.link??""));return!s.fields.link||!o?[]:[[s.route,{...o,parent:s.parent,name:s.name,order:s.order,link:s.route}]]}))}get links(){return[...this.linked.values()].map(e=>({from:e.link,to:e.route}))}get pages(){return[...this.byRoute.values()]}at(e){const n=this.linked.get(e);return this.byRoute.get(n?n.route:e)}childrenOf(e){return[...this.pages,...this.linked.values()].filter(n=>n.parent===e).sort(io)}trailTo(e){const n=this.at(e);return n?n.parent===null?[n]:[...this.trailTo(n.parent),n]:[]}}const Ce=new Dm(Cm),ho=["on","off"];function lo(t,e){if(t.length===0)return{text:"No flags to try just now."};const n=Math.max(...t.map(r=>r.name.length)),a=r=>e.isOn(r.name)?"on":"off",s=t.map(r=>{const i=ho.map(h=>h===a(r)?`[${h}]`:` ${h} `).join("");return`${r.name.padEnd(n)}  ${i}  ${r.description}`}),o=t.map(r=>{const i=ho.map(h=>h===a(r)?`<strong aria-current="true">${h}</strong>`:`<a href="#" data-run="flags ${r.name} ${h}" title="flags ${r.name} ${h}">${h}</a>`).join(" ");return`<dt>${T(r.name)} <span class="switch">${i}</span></dt><dd>${T(r.description)}</dd>`});return{text:s.map(r=>r.trimEnd()).join(`
`),html:`<dl class="help flags">${o.join("")}</dl>`}}function Fm(t,e){return{name:"flags",usage:"flags [name [on|off]]",description:"list the trials this site can be switched into, or switch one",run(n,[a,s]){return a===void 0?lo(t,e):t.some(o=>o.name===a)?s!==void 0&&s!=="on"&&s!=="off"?{text:`flags: ${a}: choose on or off`,error:!0}:(e.set(a,s===void 0?!e.isOn(a):s==="on"),lo(t,e)):{text:`flags: ${a}: no such flag. Try flags`,error:!0}}}}function Bm(t,e,n){return t.flatMap(a=>{if(a.trial===void 0||e.chosen(a.name))return[];let s=e.drawn(a.name);return s===void 0&&(s=n()<a.trial,e.draw(a.name,s)),[{name:a.name,on:s}]})}function Wm(t,e){const n=new URLSearchParams(e),a={};for(const{name:s}of t){const o=n.get(s);(o==="on"||o==="off")&&(a[s]=o==="on")}return a}function Hm(t){if(t.includes("--help"))return{help:!0};const e={};for(let n=0;n<t.length;n+=1){const a=t[n]??"";if(!a.startsWith("--"))return{error:`${a}: options are written --name value`};const s=a.indexOf("=");if(s>0){e[a.slice(2,s)]=a.slice(s+1);continue}const o=t[n+1];if(o===void 0)return{error:`${a} needs a value`};e[a.slice(2)]=o,n+=1}return{given:e}}const qm=t=>"choices"in t?t.choices.map(Ne).join("|"):"n",zm=t=>"choices"in t?Ne(t.initial):`${t.min} to ${t.max}, ${t.initial}`;function _m(t){const e=[t.name,...t.parameters.map(s=>`[--${s.name} ${qm(s)}]`)].join(" "),n=Math.max(...t.parameters.map(s=>s.name.length+2)),a=t.parameters.map(s=>`  ${`--${s.name}`.padEnd(n)}  ${s.description} (${zm(s)})`);return[e,`  ${t.summary}`,"",...a].join(`
`)}function Gm(t){return{name:t.name,usage:`${t.name} [--help] [--option n]...`,description:t.summary,run(e,n){const a=Hm(n);if("help"in a)return{text:_m(t)};const s="error"in a?a:kr(t,a.given);if("error"in s)return{text:`${t.name}: ${s.error}`,error:!0};const o=t.run(s.values);return{text:o.text,html:`<div class="app program-out">${o.html}</div>`}}}}function Ym(t){return[...t.flatMap(e=>e.commands??[]),...t.flatMap(e=>e.programs??[]).map(Gm)]}function co(){const t=be.flatMap(y=>y.flags??[]),e=new Zd;for(const[y,w]of Object.entries(Wm(t,window.location.search)))e.set(y,w);const n=Bm(t,e,Math.random),a=y=>`${y.name}-${y.on?"on":"off"}`;for(const y of n)at(nt("trial",a(y)));document.addEventListener("click",y=>{const w=y.target?.closest("main a[href]");if(!w||window.location.pathname!=="/"||n.length===0)return;const k=w.host===window.location.host?w.pathname:w.href;for(const b of n)at(nt(a(b),"open",k))},{capture:!0});const s=[...br,...Ym(be),Fm(t,e)],o=Qd(be),i=(y=>y.endsWith("/")?y:`${y}/`)(window.location.pathname),h=Ce.at(i);let l=Xs(o,{site:Ce}),c=null;const d=Qu(Ce,(y,w)=>{l(),l=Xs(o,{site:Ce});for(const k of be)k.arrive?.(y);w||c?.moveTo(y.route)});if(c=ym(Ce,h?i:"/",{moveTo:y=>d(y,{keep:!0}),clearPage:()=>{l(),l=()=>{},document.querySelector("main")?.replaceChildren()},commands:s,heard:y=>at(nt("command",s.some(w=>w.name===y)?y:"unknown"))}),h)for(const y of be)y.arrive?.(h);const u={run:y=>{c?.run(y)}};for(const y of be)y.install?.(u);const f=be.flatMap(y=>y.programs??[]);Em(eu(),{programs:f,site:Ce,goTo:y=>d(y),run:y=>c?.run(y)??[]})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",co):co();
