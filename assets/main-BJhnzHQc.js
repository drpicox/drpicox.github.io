function bs(t){const e=new Map,n=new Map;return t.changes.map(a=>{for(const s of a.removed)e.delete(s);for(const[s,o,r,i,h]of a.added)e.set(s,h?{id:s,path:o,lines:r,test:i,typesOnly:h}:{id:s,path:o,lines:r,test:i});for(const[s,o]of a.moved){const r=e.get(s);r&&e.set(s,{...r,path:o})}for(const[s,o]of a.resized){const r=e.get(s);r&&e.set(s,{...r,lines:o})}for(const[s,o]of a.unlinked)n.delete(`${s}>${o}`);for(const[s,o,r]of a.linked)n.set(`${s}>${o}`,r);return{modules:[...e.values()].sort((s,o)=>s.id-o.id),dependencies:[...n].map(([s,o])=>{const[r=0,i=0]=s.split(">").map(Number);return{from:r,to:i,typeOnly:o}}).sort((s,o)=>s.from-o.from||s.to-o.to)}})}function _t(t){return t.includes("/")?t.split("/")[0]??t:"src"}function ge(t){const e=t.split("/");return e.length<=2?t:`${e[0]}/${e[1]}`}function si(t){const e=new Map;for(const{from:l,to:c}of t.dependencies){const[d,u]=[ge(l),ge(c)];d!==u&&(e.has(d)||e.set(d,new Set),e.has(u)||e.set(u,new Set),e.get(d)?.add(u))}let n=0;const a=new Map,s=new Map,o=[],r=new Set,i=[],h=l=>{a.set(l,n),s.set(l,n),n+=1,o.push(l),r.add(l);for(const d of e.get(l)??[])a.has(d)?r.has(d)&&s.set(l,Math.min(s.get(l)??0,a.get(d)??0)):(h(d),s.set(l,Math.min(s.get(l)??0,s.get(d)??0)));if(s.get(l)!==a.get(l))return;const c=[];for(let d=o.pop();d!==void 0&&(r.delete(d),c.push(d),d!==l);d=o.pop());c.length>1&&i.push(c.sort())};for(const l of e.keys())a.has(l)||h(l);return i.sort((l,c)=>(l[0]??"").localeCompare(c[0]??""))}const tt=12,ea=6,oi=14,Dn=14,ta=12,_h=14,Fs=40,$t=10,zh=16,Gh=t=>Math.min(6,2.2+Math.sqrt(t)/4),ri=t=>t.split("/").pop()?.replace(/\.ts$/,"")??t;function Bs(t,e){const n=new Map,a=s=>{const o=n.get(s);if(o!==void 0)return o;n.set(s,0);const r=Math.max(-1,...[...e.get(s)??[]].map(a))+1;return n.set(s,r),r};for(const s of t)a(s);return n}function Yh(t,e){const n=new Map;for(const{from:a,to:s,typeOnly:o}of t.dependencies){const[r,i]=[e.get(a),e.get(s)];if(r===void 0||i===void 0||r===i)continue;const h=n.get(`${r}>${i}`)??{from:r,to:i,count:0,typeOnly:!0};n.set(`${r}>${i}`,{...h,count:h.count+1,typeOnly:h.typeOnly&&o})}return[...n.values()].sort((a,s)=>a.from.localeCompare(s.from)||a.to.localeCompare(s.to))}function Uh(t,e,n){const a=new Map(t.map(u=>[u,u]));for(const u of n)for(const f of u)a.set(f,u[0]??f);const s=u=>a.get(u)??u,o=new Map,r=new Map;for(const{from:u,to:f}of e){const[m,p]=[_t(u),_t(f)];m!==p?o.set(m,(o.get(m)??new Set).add(p)):s(u)!==s(f)&&r.set(s(u),(r.get(s(u))??new Set).add(s(f)))}const i=[...new Set(t.map(_t))],h=Bs(i,o);i.sort((u,f)=>(h.get(f)??0)-(h.get(u)??0)||u.localeCompare(f));const l=Bs([...new Set(t.map(s))],r),c=i.flatMap(u=>{const f=t.filter(p=>_t(p)===u);return[...new Set(f.map(p=>l.get(s(p))??0))].sort((p,y)=>y-p).map(p=>({band:u,boxes:f.filter(y=>(l.get(s(y))??0)===p).sort()}))}),d=new Map;for(const u of c){const f=m=>{const p=e.filter(y=>y.to===m&&d.has(y.from)).map(y=>d.get(y.from)??.5);return p.length?p.reduce((y,g)=>y+g,0)/p.length:.5};u.boxes.sort((m,p)=>f(m)-f(p)||m.localeCompare(p)),u.boxes.forEach((m,p)=>d.set(m,p/Math.max(1,u.boxes.length-1)))}return c}function na(t,e){const n=Math.max(1,Math.ceil(Math.sqrt(e*2.2))),a=n*Dn;return{columns:n,inner:a,width:Math.max(a+ea*2,ri(t).length*6+ea*2),height:oi+Math.ceil(e/n)*Dn+ea}}function Jh(t,e){const n=s=>{const o=e.get(s);return o?o.x+o.width/2:0},a=(s,o,r)=>s?s.x+s.width*(o+1)/(r+1):0;return t.map(s=>{const[o,r]=[e.get(s.from),e.get(s.to)],i=t.filter(l=>l.from===s.from).sort((l,c)=>n(l.to)-n(c.to)),h=t.filter(l=>l.to===s.to).sort((l,c)=>n(l.from)-n(c.from));return{...s,x1:a(o,i.indexOf(s),i.length),y1:o?o.y+o.height:0,x2:a(r,h.indexOf(s),h.length),y2:r?r.y:0}})}function vs(t,{tests:e=!1,width:n=1100}={}){const a=t.modules.filter(p=>e||!p.test),s=new Map(a.map(p=>[p.id,p])),o=new Map(a.map(p=>[p.id,ge(p.path)])),r=new Map;for(const p of[...a].sort((y,g)=>y.path.localeCompare(g.path))){const y=ge(p.path);r.set(y,[...r.get(y)??[],p])}const i=Yh(t,o),h=si({dependencies:t.dependencies.flatMap(({from:p,to:y,typeOnly:g})=>{const[b,v]=[s.get(p),s.get(y)];return b&&v?[{from:b.path,to:v.path,typeOnly:g}]:[]})}),l=new Set(h.flat()),c=Uh([...r.keys()],i,h),d=[],u=new Map,f=[];let m=tt;return c.forEach((p,y)=>{const g=y===0||c[y-1]?.band!==p.band,b=c[y+1]?.band!==p.band;g&&(d.push({name:p.band,x:tt,y:m,width:n-tt*2,height:0}),m+=zh+$t);const v=n-(tt+$t)*2,T=[[]];let S=0;for(const k of p.boxes){const I=na(k,r.get(k)?.length??0).width;S>0&&S+I>v&&(T.push([]),S=0),T[T.length-1]?.push(k),S+=I+ta}let A=0;if(T.forEach((k,I)=>{I>0&&(m+=A+_h);const O=k.map(M=>na(M,r.get(M)?.length??0)),H=O.reduce((M,L)=>M+L.width,0)+ta*(k.length-1);let C=tt+$t+(v-H)/2;A=0,k.forEach((M,L)=>{const $=O[L]??na(M,0);u.set(M,{name:M,label:ri(M),x:C,y:m,width:$.width,height:$.height,rank:c.length-y,cyclic:l.has(M)});const j=C+($.width-$.inner)/2;(r.get(M)??[]).forEach((N,P)=>{const[B,_]=[P%$.columns,Math.floor(P/$.columns)];f.push({id:N.id,path:N.path,box:M,x:j+(B+.5)*Dn,y:m+oi+(_+.5)*Dn,radius:Gh(N.lines),test:N.test,typesOnly:N.typesOnly??!1})}),C+=$.width+ta,A=Math.max(A,$.height)})}),m+=A,b){const k=d[d.length-1];k&&(d[d.length-1]={...k,height:m+$t-k.y}),m+=$t}m+=Fs}),{width:n,height:m-Fs+tt,bands:d,boxes:[...u.values()],balls:f,links:Jh(i,u)}}function Kh(t,e=!1){const n=t.modules.filter(s=>!e||!s.test),a=new Map(n.map(s=>[s.id,s.path]));return{modules:n.map(({path:s,lines:o,test:r,typesOnly:i=!1})=>({path:s,lines:o,test:r,typesOnly:i})),dependencies:t.dependencies.flatMap(({from:s,to:o,typeOnly:r})=>{const[i,h]=[a.get(s),a.get(o)];return i!==void 0&&h!==void 0?[{from:i,to:h,typeOnly:r}]:[]})}}function ii(t){const e=new Set(t.modules.filter(n=>n.test).map(n=>n.id));return new Set(t.dependencies.filter(n=>e.has(n.from)&&!e.has(n.to)).map(n=>n.to))}function Hn(t){const e=Kh(t,!0),n=new Set(t.modules.filter(s=>!s.test&&!s.typesOnly).map(s=>s.id)),a=e.dependencies.filter(s=>ge(s.from)!==ge(s.to));return{files:e.modules.length,tests:t.modules.length-e.modules.length,lines:e.modules.reduce((s,o)=>s+o.lines,0),boxes:new Set(e.modules.map(s=>ge(s.path))).size,arrows:e.dependencies.length,crossing:a.length,typeOnly:e.dependencies.filter(s=>s.typeOnly).length,inCycles:si(e).flat().length,testable:n.size,tested:[...ii(t)].filter(s=>n.has(s)).length}}const Vh={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function x(t){return t.replace(/[&<>"]/g,e=>Vh[e]??e)}function ee(t,e,n=`${e}s`){return`${t} ${t===1?e:n}`}const Xh=new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"long",year:"numeric",timeZone:"Europe/Madrid"});function hi(t,e){const n=[`${ee(e.files,"file")} in ${ee(e.boxes,"box","boxes")}, ${ee(e.tests,"test")}`,`${ee(e.crossing,"arrow")} between boxes, ${e.typeOnly} of all ${e.arrows} onto a type`,`a test reaches ${e.tested} of the ${e.testable} files with something to test`,e.inCycles?`${ee(e.inCycles,"box","boxes")} in a circle`:"no boxes in a circle"].join(" · "),a=x(t.sha);return`<a href="https://github.com/drpicox/david-rodenas.com/commit/${a}" target="_blank" rel="noopener noreferrer"><code>${a}</code></a> ${Xh.format(new Date(t.date))} — ${x(t.subject)}<br><span class="measured">${n}</span>`}const Y=t=>Math.round(t*10)/10;function Zh({x1:t,y1:e,x2:n,y2:a}){const s=Math.max(18,(a-e)/2);return`M${Y(t)} ${Y(e)} C${Y(t)} ${Y(e+s)} ${Y(n)} ${Y(a-s)} ${Y(n)} ${Y(a)}`}function Qh(t){const e=t.bands.map(r=>`<g class="band" data-band="${x(r.name)}"><rect x="${Y(r.x)}" y="${Y(r.y)}" width="${Y(r.width)}" height="${Y(r.height)}" rx="6"/><text x="${Y(r.x+8)}" y="${Y(r.y+12)}">${x(r.name)}</text></g>`).join(""),n=t.links.map(r=>{const i=Y(Math.min(4,.8+Math.log2(r.count)*.7));return`<path class="link${r.typeOnly?" type-only":""}" stroke-width="${i}" d="${Zh(r)}" marker-end="url(#arrowhead)"><title>${x(`${r.from} → ${r.to}: ${r.count}`)}</title></path>`}).join(""),a=t.boxes.map(r=>`<g class="box${r.cyclic?" cyclic":""}" data-box="${x(r.name)}"><rect x="${Y(r.x)}" y="${Y(r.y)}" width="${Y(r.width)}" height="${Y(r.height)}" rx="4"/><text x="${Y(r.x+6)}" y="${Y(r.y+10)}">${x(r.label)}</text></g>`).join(""),s=t.balls.map(r=>`<circle class="ball${r.test?" test":""}" cx="${Y(r.x)}" cy="${Y(r.y)}" r="${Y(r.radius)}"><title>${x(r.path)}</title></circle>`).join(""),o=`${t.boxes.length} boxes, ${t.balls.length} files, ${t.links.length} arrows between boxes`;return`<svg class="architecture" viewBox="0 0 ${t.width} ${Y(t.height)}" role="img" aria-label="${o}"><defs><marker id="arrowhead" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z"/></marker></defs><g class="bands">${e}</g><g class="links">${n}</g><g class="boxes">${a}</g><g class="balls">${s}</g></svg>`}const aa=600,Tt=60,Be=4;function li(t,e){const n=i=>Be+i/Math.max(1,t.length-1)*(aa-Be*2),a=(i,h)=>{const l=Math.max(1,...t.map(i)),c=t.map((d,u)=>`${n(u).toFixed(1)},${(Tt-Be-i(d)/l*(Tt-Be*2)).toFixed(1)}`).join(" ");return`<polyline class="${h}" points="${c}"/>`},s=(aa-Be*2)/Math.max(1,t.length-1),o=t.map((i,h)=>i.inCycles?`<rect class="cycle" x="${(n(h)-s/2).toFixed(1)}" y="0" width="${s.toFixed(1)}" height="${Tt}"/>`:"").join(""),r=n(e).toFixed(1);return`<svg class="sparks" viewBox="0 0 ${aa} ${Tt}" role="img" aria-label="Files and arrows between boxes, commit by commit">${o}${a(i=>i.files,"files")}${a(i=>i.crossing,"crossing")}<line class="now" x1="${r}" x2="${r}" y1="0" y2="${Tt}"/><text x="${Be}" y="11" class="files">files</text><text x="${Be+34}" y="11" class="crossing">arrows between boxes</text></svg>`}function el(t,e){const n=bs(t),[a,s]=[n[e],t.commits[e]];return!a||!s?"":`<figure class="architecture-figure">${Qh(vs(a))}<figcaption>${hi(s,Hn(a))}</figcaption>${li(n.map(Hn),e)}</figure>`}const tl=t=>{const e=JSON.parse(t("/data/architecture.json"));return el(e,e.commits.length-1)};function w(t,e={},...n){const a=document.createElement(t);for(const[s,o]of Object.entries(e))o===void 0||o===!1||(typeof o=="function"?a.addEventListener(s.slice(2).toLowerCase(),o):o===!0?a.setAttribute(s,""):a.setAttribute(s,String(o)));for(const s of n)s==null||s===!1||a.append(s);return a}function Jn(t){let e=!0;if(typeof IntersectionObserver!="function")return{onScreen:()=>e,stop:()=>{}};const n=new IntersectionObserver(a=>{for(const s of a)e=s.isIntersecting},{rootMargin:"100px"});return n.observe(t),{onScreen:()=>e,stop:()=>n.disconnect()}}function nl(t,e){return new Map(t.map(n=>[n.id,n.changed.filter(a=>a<=e).length]))}function ci(t){const e=new Map,n=(a,s)=>{const o=e.get(a);o&&Object.assign(o,s)};return t.changes.forEach((a,s)=>{for(const[o,r,i,h,l=!1]of a.added)e.set(o,{id:o,path:r,lines:i,test:h,typesOnly:l,born:s,changed:[]});for(const[o,r]of a.moved)n(o,{path:r});for(const[o,r]of a.resized)n(o,{lines:r});for(const o of a.changed)e.get(o)?.changed.push(s);for(const o of a.removed)n(o,{went:s})}),[...e.values()].sort((a,s)=>a.id-s.id)}const al=6,Ds=2.2;function sl(t,e){const n=new Map;for(const{from:a,to:s}of t.dependencies){const[o,r]=e==="neededBy"?[s,a]:[a,s];n.set(o,(n.get(o)??new Set).add(r))}return new Map([...n].map(([a,s])=>[a,s.size]))}function ol(t,e,n){if(e==="lines")return null;const a=e==="changes"?n?.counts??new Map:sl(t,e),s=Math.max(1,e==="changes"?n?.most??0:0,...a.values());return new Map(t.modules.map(o=>[o.id,Ds+(al-Ds)*Math.sqrt((a.get(o.id)??0)/s)]))}const rl="https://github.com/drpicox/david-rodenas.com";function Hs(t,e,n="file"){const a=n==="box"&&!/\.[a-z]+$/.test(e);return`${rl}/${a?"tree":"blob"}/${t}/src/${e}`}function Wn(t,e,n,a){const s=new Map;for(const[i,h]of t){const[l,c]=a==="needs"?[i,h]:[h,i];s.set(l,[...s.get(l)??[],c])}const o=new Map;let r=[e];for(let i=1;i<=n&&r.length>0;i+=1){const h=[];for(const l of r)for(const c of s.get(l)??[])c!==e&&!o.has(c)&&(o.set(c,i),h.push(c));r=h}return o}const Ws=90,qs=15;function _s(t,e,n,a){const s=Math.min(a,.03333333333333333);t.vx+=((e-t.x)*Ws-t.vx*qs)*s,t.vy+=((n-t.y)*Ws-t.vy*qs)*s,t.x+=t.vx*s,t.y+=t.vy*s}const il=900,hl=34,ll=.02,zs=.004,Gs=.82,cl=100,dl=12;function ul(t,e,{width:n,height:a,heat:s=1}){const o=new Float64Array(t.length),r=new Float64Array(t.length);for(let h=0;h<t.length;h+=1){const l=t[h];for(let c=h+1;c<t.length;c+=1){const d=t[c];let u=l.x-d.x,f=l.y-d.y;u===0&&f===0&&([u,f]=[h%7-3||1,c%5-2||1]);const m=Math.max(cl,u*u+f*f),p=il/m,y=Math.sqrt(m);o[h]=(o[h]??0)+u/y*p,r[h]=(r[h]??0)+f/y*p,o[c]=(o[c]??0)-u/y*p,r[c]=(r[c]??0)-f/y*p}}for(const[h,l]of e){const[c,d]=[t[h],t[l]];if(!c||!d)continue;const u=d.x-c.x,f=d.y-c.y,m=Math.hypot(u,f)||1,p=(m-hl)*ll;o[h]=(o[h]??0)+u/m*p,r[h]=(r[h]??0)+f/m*p,o[l]=(o[l]??0)-u/m*p,r[l]=(r[l]??0)-f/m*p}const i=dl*s;t.forEach((h,l)=>{h.vx=(h.vx+(o[l]??0)+(n/2-h.x)*zs)*Gs,h.vy=(h.vy+(r[l]??0)+(a/2-h.y)*zs)*Gs;const c=Math.hypot(h.vx,h.vy);c>i&&([h.vx,h.vy]=[h.vx/c*i,h.vy/c*i]);const[d,u]=[h.x+h.vx,h.y+h.vy];h.x=Math.min(n,Math.max(0,d)),h.y=Math.min(a,Math.max(0,u)),h.x!==d&&(h.vx=0),h.y!==u&&(h.vy=0)})}const sa=760,Ys=260,ml=10,Ne=(t,e,n,a=8)=>t+(e-t)*(1-Math.exp(-a*n)),fl=(t,e,n)=>{t.x=Ne(t.x,e.x,n),t.y=Ne(t.y,e.y,n),t.width=Ne(t.width,e.width,n),t.height=Ne(t.height,e.height,n)};class pl{constructor(e,n){this.width=e,this.still=n}width;still;balls=new Map;boxes=new Map;bands=new Map;layout=null;mode="boxes";time=0;boxAlpha=1;fileLinks=[];hovered={};reach=1;height=sa;get wanted(){const e=this.layout?.height??sa;return this.mode==="tangle"?Math.max(e,sa):e}reached=null;coverage=null;show(e,n,{untangling:a=!1,reached:s=null,coverage:o=null,sizes:r=null,changed:i=null}={}){this.reached=s,this.coverage=o,this.layout=n,this.mode==="tangle"&&(this.tangleClock=Math.min(this.tangleClock,1.2)),(this.still||this.balls.size===0)&&(this.height=this.wanted);const h=Math.max(0,...n.boxes.map(f=>f.rank)),l=new Map(n.boxes.map(f=>[f.name,f.rank])),c=new Set;for(const f of n.balls){c.add(f.id);const m=this.balls.get(f.id),p=a?(h-(l.get(f.box)??0))*.07+Math.random()*.12:0,y=r?.get(f.id)??f.radius;if(m)Object.assign(m,{leaving:!1,box:f.box,path:f.path,test:f.test,typesOnly:f.typesOnly,radius:y,wait:p}),i?.has(f.id)&&(m.touchedAt=this.time);else{const[g,b]=this.mode==="tangle"?[this.width/2+(Math.random()-.5)*80,this.height/2+(Math.random()-.5)*80]:[f.x,f.y];this.balls.set(f.id,{id:f.id,body:{x:g,y:b,vx:0,vy:0},size:{x:this.still?y:0,y:0,vx:0,vy:0},radius:y,alpha:this.still?1:0,leaving:!1,box:f.box,path:f.path,test:f.test,typesOnly:f.typesOnly,wait:p,trail:[],bornAt:this.time,touchedAt:-1/0})}}for(const[f,m]of this.balls)c.has(f)||(m.leaving=!0);const d=(f,m)=>{const p=new Set(m.map(y=>y.name));for(const y of m){const g={x:y.x,y:y.y,width:y.width,height:y.height},b=f.get(y.name);b?Object.assign(b,{target:g,leaving:!1,cyclic:y.cyclic??!1,label:y.label??y.name}):f.set(y.name,{...g,target:g,label:y.label??y.name,alpha:this.still?1:0,leaving:!1,cyclic:y.cyclic??!1})}for(const[y,g]of f)p.has(y)||(g.leaving=!0)};d(this.boxes,n.boxes),d(this.bands,n.bands);const u=new Map(n.balls.map((f,m)=>[f.id,m]));this.fileLinks=e.dependencies.flatMap(({from:f,to:m})=>u.has(f)&&u.has(m)?[[f,m]]:[])}setMode(e){e==="tangle"&&this.mode!=="tangle"&&(this.tangleClock=0),this.mode=e}tangleClock=0;get heat(){return Math.exp(-this.tangleClock/1.8)}step(e){this.time+=e,this.height=this.still?this.wanted:Ne(this.height,this.wanted,e,6);const n=new Map(this.layout?.balls.map(a=>[a.id,a])??[]);if(this.boxAlpha=Ne(this.boxAlpha,this.mode==="boxes"?1:0,e,5),this.mode==="tangle"){this.tangleClock+=e;const a=[...this.balls.entries()].filter(([,r])=>!r.leaving),s=new Map(a.map(([r],i)=>[r,i])),o=this.fileLinks.flatMap(([r,i])=>{const[h,l]=[s.get(r),s.get(i)];return h!==void 0&&l!==void 0?[[h,l]]:[]});ul(a.map(([,r])=>r.body),o,{width:this.width,height:this.height,heat:this.heat})}for(const[a,s]of this.balls){const o=n.get(a);this.mode==="boxes"&&o&&(s.wait>0?s.wait-=e:this.still?Object.assign(s.body,{x:o.x,y:o.y,vx:0,vy:0}):_s(s.body,o.x,o.y,e)),_s(s.size,s.leaving?0:s.radius,0,e),s.alpha=Ne(s.alpha,s.leaving?0:1,e,6);const r=Math.hypot(s.body.vx,s.body.vy);r>Ys&&this.mode==="boxes"&&s.trail.push({x:s.body.x,y:s.body.y}),(s.trail.length>ml||r<Ys&&s.trail.length)&&s.trail.shift(),s.leaving&&s.alpha<.02&&this.balls.delete(a)}for(const a of[this.boxes,this.bands])for(const[s,o]of a)this.still?Object.assign(o,o.target):fl(o,o.target,e),o.alpha=Ne(o.alpha,o.leaving?0:1,e,6),o.leaving&&o.alpha<.02&&a.delete(s)}hit(e,n){for(const a of this.balls.values())if(Math.hypot(a.body.x-e,a.body.y-n)<=Math.max(5,a.size.x+2))return{path:a.path,box:a.box};if(this.mode==="boxes"){for(const[a,s]of this.boxes)if(e>=s.x&&e<=s.x+s.width&&n>=s.y&&n<=s.y+s.height)return{box:a}}return{}}draw(e,n){e.clearRect(0,0,this.width,this.height),e.lineCap="round";const a=.5+.5*Math.sin(this.time*4);e.font="bold 10px ui-monospace, Menlo, monospace";for(const h of this.bands.values())e.globalAlpha=h.alpha*this.boxAlpha*.9,e.setLineDash([2,4]),e.strokeStyle=n.rule,e.lineWidth=1,e.beginPath(),e.roundRect(h.x,h.y,h.width,h.height,6),e.stroke(),e.setLineDash([]),e.fillStyle=n.dim,e.fillText(h.label,h.x+8,h.y+12);e.font="9px ui-monospace, Menlo, monospace";for(const[h,l]of this.boxes){const c=this.hovered.box===h;e.globalAlpha=l.alpha*this.boxAlpha,e.fillStyle=n.sunken,e.strokeStyle=l.cyclic?n.warn:c?n.accent:n.rule,e.lineWidth=l.cyclic?1.5+a*1.5:c?1.5:1,l.cyclic&&(e.shadowColor=n.warn,e.shadowBlur=6+a*10),e.beginPath(),e.roundRect(l.x,l.y,l.width,l.height,4),e.fill(),e.stroke(),e.shadowBlur=0,e.fillStyle=c?n.accent:n.dim,e.fillText(l.label,l.x+6,l.y+10)}const s=this.hovered.path?[...this.balls.values()].find(h=>h.path===this.hovered.path):void 0,o=s?Wn(this.fileLinks,s.id,this.reach,"needs"):new Map,r=s?Wn(this.fileLinks,s.id,this.reach,"neededBy"):new Map,i=new Set([...s?[s.id]:[],...o.keys(),...r.keys()]);this.drawLinks(e,n,s!==void 0),s&&this.drawFileArrows(e,n,s,o,r);for(const h of this.balls.values()){const l=Math.max(0,h.size.x);if(h.trail.length>1){e.strokeStyle=n.accent;for(let y=1;y<h.trail.length;y+=1)e.globalAlpha=y/h.trail.length*.35*h.alpha,e.lineWidth=l*(y/h.trail.length)*1.4,e.beginPath(),e.moveTo(h.trail[y-1].x,h.trail[y-1].y),e.lineTo(h.trail[y].x,h.trail[y].y),e.stroke()}const c=this.time-h.bornAt;c<.8&&!this.still&&(e.globalAlpha=(1-c/.8)*.6,e.strokeStyle=n.accent,e.lineWidth=1.2,e.beginPath(),e.arc(h.body.x,h.body.y,l+c*22,0,Math.PI*2),e.stroke());const d=this.time-h.touchedAt;d<.9&&!this.still&&(e.globalAlpha=(1-d/.9)*.8,e.strokeStyle=n.heat,e.lineWidth=1.8,e.beginPath(),e.arc(h.body.x,h.body.y,l+1.5+d*14,0,Math.PI*2),e.stroke());const u=this.hovered.path===h.path,f=s!==void 0&&!i.has(h.id),m=this.reached!==null&&!h.test&&!h.typesOnly&&!this.reached.has(h.id),p=!h.test&&!h.typesOnly?this.coverage?.get(h.path):void 0;if(e.globalAlpha=h.alpha*(f?.22:1),e.beginPath(),e.arc(h.body.x,h.body.y,u?l+2:Math.max(0,m||p!==void 0?l-.6:l),0,Math.PI*2),p!==void 0)e.strokeStyle=p>=99.5?n.accent:n.warn,e.lineWidth=1.2,e.stroke(),e.fillStyle=n.accent,e.beginPath(),e.moveTo(h.body.x,h.body.y),e.arc(h.body.x,h.body.y,Math.max(0,l-.6),-Math.PI/2,-Math.PI/2+Math.PI*2*p/100),e.closePath(),e.fill();else if(h.test){const y=Math.max(0,(u?l+2:l)*1.6);e.beginPath(),e.rect(h.body.x-y/2,h.body.y-y/2,y,y),e.fillStyle=n.test,e.fill()}else m?(e.strokeStyle=n.warn,e.lineWidth=1.2,e.stroke()):(e.fillStyle=h.test?n.soft:n.accent,e.fill());u&&(e.strokeStyle=n.ink,e.lineWidth=1.5,e.stroke())}if(s){const h=this.coverage?.get(s.path),l=h!==void 0&&!s.test&&!s.typesOnly?` · tests run ${Math.round(h)}% of it`:"",c=d=>{const u=[...d.values()].filter(f=>f===1).length;return this.reach>1&&d.size>u?`${u} (${d.size} within ${Number.isFinite(this.reach)?this.reach:"any"})`:`${u}`};this.label(e,n,[{text:`${s.path}   `},{text:`needs ${c(o)}`,key:n.accent},{text:" · "},{text:`needed by ${c(r)}`,key:n.arrowIn},{text:`${l}   click: its source`}],s.body.x,s.body.y-10)}e.globalAlpha=1}drawFileArrows(e,n,a,s,o){const r=(l,c,d,u)=>{const[f,m]=[c.body.x-l.body.x,c.body.y-l.body.y],p=Math.hypot(f,m)||1,[y,g]=[f/p,m/p],b={x:c.body.x-y*(c.size.x+2),y:c.body.y-g*(c.size.x+2)},v={x:(l.body.x+b.x)/2-g*p*.12,y:(l.body.y+b.y)/2+y*p*.12};e.globalAlpha=u,e.strokeStyle=d,e.fillStyle=d,e.lineWidth=1.4,e.beginPath(),e.moveTo(l.body.x,l.body.y),e.quadraticCurveTo(v.x,v.y,b.x,b.y),e.stroke();const[T,S]=[b.x-v.x,b.y-v.y],A=Math.atan2(S,T);e.beginPath(),e.moveTo(b.x,b.y),e.lineTo(b.x-7*Math.cos(A-.4),b.y-7*Math.sin(A-.4)),e.lineTo(b.x-7*Math.cos(A+.4),b.y-7*Math.sin(A+.4)),e.closePath(),e.fill()},i=(l,c)=>c===a.id?0:l.get(c),h=l=>Math.max(.25,.95-(l-1)*.25);for(const[l,c]of this.fileLinks){const[d,u]=[this.balls.get(l),this.balls.get(c)];if(!d||!u)continue;const f=i(s,l);f!==void 0&&s.get(c)===f+1&&r(d,u,n.accent,h(f+1));const m=i(o,c);m!==void 0&&o.get(l)===m+1&&r(d,u,n.arrowIn,h(m+1))}}drawLinks(e,n,a){if(this.boxAlpha<.98){e.globalAlpha=(1-this.boxAlpha)*.22,e.strokeStyle=n.accent,e.lineWidth=.7,e.beginPath();for(const[o,r]of this.fileLinks){const[i,h]=[this.balls.get(o),this.balls.get(r)];!i||!h||(e.moveTo(i.body.x,i.body.y),e.lineTo(h.body.x,h.body.y))}e.stroke()}if(!this.layout||this.boxAlpha<.02)return;const s=this.hovered.box;for(const o of this.layout.links){const[r,i]=[this.boxes.get(o.from),this.boxes.get(o.to)],[h,l]=[this.layout.boxes.find(g=>g.name===o.to),this.layout.boxes.find(g=>g.name===o.from)];if(!r||!i||!h||!l)continue;const c=r.x+(o.x1-l.x)/l.width*r.width,d=r.y+r.height,u=i.x+(o.x2-h.x)/h.width*i.width,f=i.y,m=s!==void 0&&(o.from===s||o.to===s),p=s!==void 0&&!m;e.globalAlpha=this.boxAlpha*Math.min(r.alpha,i.alpha)*(a?.06:m?.95:p?.08:.4),e.strokeStyle=m?n.accent:n.soft,e.lineWidth=Math.min(4,.8+Math.log2(o.count)*.7)*(m?1.4:1),e.setLineDash(o.typeOnly?[4,3]:[]);const y=Math.max(18,(f-d)/2);e.beginPath(),e.moveTo(c,d),e.bezierCurveTo(c,d+y,u,f-y,u,f-4),e.stroke(),e.setLineDash([]),e.fillStyle=e.strokeStyle,e.beginPath(),e.moveTo(u,f),e.lineTo(u-3.5,f-7),e.lineTo(u+3.5,f-7),e.closePath(),e.fill()}}label(e,n,a,s,o){e.font="11px ui-monospace, Menlo, monospace";const r=11,i=a.map(d=>e.measureText(d.text).width+(d.key?r:0)),h=i.reduce((d,u)=>d+u,0)+12,l=Math.min(this.width-h-4,Math.max(4,s-h/2));e.globalAlpha=.95,e.fillStyle=n.ink,e.beginPath(),e.roundRect(l,o-18,h,18,4),e.fill();let c=l+6;a.forEach((d,u)=>{d.key&&(e.fillStyle=d.key,e.fillRect(c,o-13,8,8),c+=r),e.fillStyle=n.sunken,e.fillText(d.text,c,o-5),c+=i[u]-(d.key?r:0)})}}const De=1100,gl=.45;function Us(t){const e=getComputedStyle(t),n=(a,s)=>e.getPropertyValue(a).trim()||s;return{ink:n("--ink","#16181c"),dim:n("--dim","#6b7280"),rule:n("--rule","#d8dbe1"),sunken:n("--sunken","#f2f4f8"),accent:n("--accent","#1a4b9c"),soft:n("--accent-soft","#6b83b8"),warn:n("--warn","#b4443c"),test:n("--hl-string","#2f6f4e"),arrowIn:n("--arrow-in","#c96a24"),heat:n("--heat-warm","#e08a5b")}}function wl(t){let e=!1,n=()=>{e=!0};const a=fetch("/data/coverage.json").then(s=>s.ok?s.json():null).catch(()=>null);return fetch("/data/architecture.json").then(s=>s.json()).then(async s=>{const o=await a;e||(n=yl(t,s,o))}).catch(()=>{}),()=>n()}function yl(t,e,n){const a=n&&e.commits.findIndex(W=>W.sha===n.sha),s=n?new Map(Object.entries(n.lines)):null,o=bs(e),r=o.map(Hn),i=ci(e),h=Math.max(0,...i.map(W=>W.changed.length)),l=new Map,c=(W,q)=>{const z=`${W}:${q}`;let Z=l.get(z);return Z||(Z=vs(o[W]??{modules:[],dependencies:[]},{tests:q,width:De}),l.set(z,Z)),Z},d=o.length-1,u=window.matchMedia("(prefers-reduced-motion: reduce)").matches,f=new pl(De,u);let m=d,p=!1,y="neededBy",g="boxes",b=!1,v=0,T=-1;const S=w("canvas",{class:"architecture-canvas","aria-label":"The source of this site: its files as balls, its folders as boxes, and arrows for what needs what"}),A=w("figcaption"),k=w("div",{class:"sparks-host"}),I=w("input",{type:"range",min:0,max:d,step:1,value:m,"aria-label":"Commit"}),O=w("button",{type:"button"},"▶ play the history"),H=w("button",{type:"button"},"tangle it"),C=w("input",{type:"checkbox"}),M=(W,q,z=!1)=>w("option",{value:W,selected:z},q),L=w("select",{"aria-label":"What a ball's size says"},M("neededBy","needed by",!0),M("needs","needs"),M("changes","changes"),M("lines","lines")),$=w("select",{"aria-label":"How far a file's arrows reach"},M("1","1",!0),M("2","2"),M("3","3"),M("Infinity","all")),j=w("div",{class:"architecture-controls"},O,H,w("label",{},C," the tests"),w("label",{},"size: ",L),w("label",{},"reach: ",$),I),N=w("p",{class:"architecture-legend",hidden:!0},w("span",{class:"key file"}),"a file, as full as the tests run it",w("span",{class:"key untested"}),"a file no test reaches",w("span",{class:"key test"}),"a test"),P=(W,q=!1)=>{m=Math.max(0,Math.min(d,W)),I.value=String(m);const z=o[m],Z=e.commits[m];!z||!Z||(f.show(z,c(m,p),{untangling:q,reached:p?ii(z):null,coverage:p&&m===a?s:null,sizes:ol(z,y,y==="changes"?{counts:nl(i,m),most:h}:void 0),changed:m===T?null:new Set(e.changes[m]?.changed??[])}),T=m,A.innerHTML=hi(Z,r[m]??Hn(z)),k.innerHTML=li(r,m))},B=W=>{b=W,O.textContent=b?"❚❚ pause":"▶ play the history",b&&m===d&&P(0),v=0};O.addEventListener("click",()=>B(!b)),H.addEventListener("click",()=>{g=g==="boxes"?"tangle":"boxes",f.setMode(g),H.textContent=g==="boxes"?"tangle it":"untangle it",g==="boxes"&&P(m,!0)}),C.addEventListener("change",()=>{p=C.checked,N.hidden=!p,P(m)}),L.addEventListener("change",()=>{y=L.value,P(m)}),$.addEventListener("change",()=>{f.reach=Number($.value)}),I.addEventListener("input",()=>{B(!1),P(Number(I.value))});const _=W=>{const q=k.querySelector("svg"),z=q?.getScreenCTM();if(!q||!z)return null;const Z=new DOMPoint(W.clientX,W.clientY).matrixTransform(z.inverse()).x,{x:xe,width:Qe}=q.viewBox.baseVal,an=4;return Math.round((Z-xe-an)/(Qe-an*2)*d)},J=W=>{const q=_(W);q!==null&&(B(!1),Math.max(0,Math.min(d,q))!==m&&P(q))};k.addEventListener("pointerdown",W=>{k.setPointerCapture(W.pointerId),J(W)}),k.addEventListener("pointermove",W=>{k.hasPointerCapture(W.pointerId)&&J(W)});const Ie=W=>{const q=S.getBoundingClientRect();return[(W.clientX-q.left)/q.width*De,(W.clientY-q.top)/q.height*f.height]};S.addEventListener("mousemove",W=>{const[q,z]=Ie(W);f.hovered=f.hit(q,z),S.style.cursor=f.hovered.path||f.hovered.box?"pointer":"",S.dataset.hovered=f.hovered.path??f.hovered.box??""}),S.addEventListener("mouseleave",()=>{f.hovered={}}),S.addEventListener("click",W=>{const[q,z]=Ie(W),Z=f.hit(q,z),xe=e.commits[m]?.sha;if(!xe)return;const Qe=Z.path?Hs(xe,Z.path):Z.box?Hs(xe,Z.box,"box"):null;Qe&&window.open(Qe,"_blank","noopener")}),t.replaceChildren(w("figure",{class:"architecture-figure"},j,S,N,A,k)),P(m);const Ve=S.getContext("2d");if(!Ve)return()=>{};const bt=Jn(S);let vt=Us(t),nn=0,kt=performance.now(),Xe=0,Ze={width:0,height:0};const Fe=()=>{const W=window.devicePixelRatio||1,q=S.clientWidth||De,z=Math.round(q*f.height/De);q===Ze.width&&Math.abs(z-Ze.height)<1||(Ze={width:q,height:z},S.width=Math.round(q*W),S.height=Math.round(z*W),S.style.height=`${z}px`)};Fe(),window.addEventListener("resize",Fe);const xt=W=>{Xe=requestAnimationFrame(xt);const q=Math.min(.05,(W-kt)/1e3);kt=W,bt.onScreen()&&(nn++%30===0&&(vt=Us(t)),b&&(v+=q,v>=gl&&(v=0,m>=d?B(!1):P(m+1))),f.step(q),Fe(),Ve.setTransform(S.width/De,0,0,S.width/De,0,0),f.draw(Ve,vt))};return Xe=requestAnimationFrame(xt),()=>{cancelAnimationFrame(Xe),bt.stop(),window.removeEventListener("resize",Fe)}}const pt=30;function bl(t,e,n){const a=new Set([t]);let s=[t];for(let o=1;s.length>0;o+=1){const r=[];for(const i of s)for(const h of e.get(i)??[])if(!a.has(h)){if(n.has(h))return o;a.add(h),r.push(h)}s=r}return null}function vl(t,e,n=pt){const a=new Map;return t.changes.forEach((s,o)=>{const r=e[o];if(!r||s.changed.length===0||s.changed.length>n)return;const i=new Set(r.modules.filter(d=>!d.test).map(d=>d.id)),h=new Set(s.added.map(([d])=>d)),l=new Set(s.changed.filter(d=>i.has(d))),c=new Map;for(const{from:d,to:u}of r.dependencies)i.has(d)&&i.has(u)&&c.set(d,[...c.get(d)??[],u]);for(const d of i){if(h.has(d))continue;const u=bl(d,c,l),f=a.get(u)??{seen:0,changed:0};a.set(u,{seen:f.seen+1,changed:f.changed+(l.has(d)?1:0)})}}),[...a].map(([s,o])=>({distance:s,...o})).sort((s,o)=>(s.distance??1/0)-(o.distance??1/0))}function kl(t,e=pt,n=2){const a=new Map;for(const{changed:s}of t.changes){if(s.length>e)continue;const o=[...s].sort((r,i)=>r-i);o.forEach((r,i)=>{for(const h of o.slice(i+1).map(l=>`${r}:${l}`))a.set(h,(a.get(h)??0)+1)})}return[...a].filter(([,s])=>s>=n).map(([s,o])=>{const[r=0,i=0]=s.split(":").map(Number);return{a:r,b:i,together:o}}).sort((s,o)=>o.together-s.together||s.a-o.a||s.b-o.b)}function xl(t){const e=new Set(t.modules.filter(s=>!s.test).map(s=>s.id)),n=new Map;for(const{from:s,to:o}of t.dependencies)e.has(s)&&e.has(o)&&n.set(o,[...n.get(o)??[],s]);let a=0;for(const s of e){const o=new Set([s]),r=[s];for(let i=r.pop();i!==void 0;i=r.pop())for(const h of n.get(i)??[])o.has(h)||(o.add(h),r.push(h));a+=o.size}return e.size>0?a/e.size**2:0}let oa;function $l(t){if(oa?.text===t)return oa.read;const e=JSON.parse(t),n={history:e,snapshots:bs(e),lives:ci(e)};return oa={text:t,read:n},n}const E=t=>t.toFixed(1);function ke(t,e){if(e===0)return"–";const n=t/e*100;return`${n>=10?Math.round(n):Math.round(n*10)/10}%`}const Js=640,rn=180,Ks=26,ra=14,Tl=150,Sl=4,Vs=t=>t.reduce((e,n)=>({seen:e.seen+n.seen,changed:e.changed+n.changed}),{seen:0,changed:0});function Ml(t,e){const n=m=>Vs(t.filter(p=>p.distance===m)),a=[["a file it needs changed",n(1)],["two arrows down",n(2)],["three",n(3)],["four or more",Vs(t.filter(m=>m.distance!==null&&m.distance>=Sl))],["nothing it needs changed",n(null)]],s=({seen:m,changed:p})=>m>0?p/m:0,o=Math.max(1e-4,...a.map(([,m])=>s(m))),r=Js-rn-Tl,i=a.map(([m,p],y)=>{const g=8+y*Ks,b=Math.max(1,s(p)/o*r);return`<text class="label" x="${rn-8}" y="${E(g+ra-3)}" text-anchor="end">${m}</text><rect class="bar${y===a.length-1?" none":""}" x="${rn}" y="${E(g)}" width="${E(b)}" height="${ra}" rx="2"/><text class="value" x="${E(rn+b+6)}" y="${E(g+ra-3)}">${ke(p.changed,p.seen)} · ${p.changed} of ${p.seen}</text>`}).join(""),h=8+a.length*Ks,l=`<svg class="cascade" viewBox="0 0 ${Js} ${h}" role="img" aria-label="The share of files that changed with a change below them, by how far below it was">${i}</svg>`,[c,d,,,u]=a.map(([,m])=>ke(m.changed,m.seen)),f=`In theory, a change to one file can reach ${ke(e,1)} of the source, on average: itself, what needs it, and what needs that, as far as the arrows go. In the history, when a file it needs changed, a file changed with it in ${c} of the commits; two arrows down, in ${d}; with nothing it needs changed, in ${u}.`;return`<figure class="changes-figure">${l}<figcaption>${f}</figcaption></figure>`}function Al(t,e){const n=new Map,a=(o,r,i,h)=>{const[,l,c]=o.cells.get(r)??[r,0,0];o.cells.set(r,[r,l+i,c+h])};for(const o of t){if(o.test)continue;const r=o.went===void 0?ge(o.path):null,i=n.get(r)??{born:o.born,cells:new Map};i.born=Math.min(i.born,o.born),n.set(r,i),a(i,o.born,0,1);for(const h of o.changed)a(i,h,1,0)}const s=o=>o===null?1/0:e.includes(o)?e.indexOf(o):e.length;return[...n].map(([o,{born:r,cells:i}])=>({box:o,band:o===null?null:_t(o),born:r,cells:[...i.values()].sort((h,l)=>h[0]-l[0])})).sort((o,r)=>s(o.band)-s(r.band)||o.born-r.born||(o.box??"").localeCompare(r.box??"")).map(({box:o,band:r,cells:i})=>({box:o,band:r,cells:i}))}const Xs=1100,Ka=150,Il=6,hn=11,El=16,jl=8,Cl=20,Ol=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Va=t=>{const[,e=1,n=1]=t.date.slice(0,10).split("-").map(Number);return`${n} ${Ol[e-1]??""}`},Ll=t=>Math.min(1,.25+.25*Math.log2(t)),Nl=t=>t.box===null?"gone":t.box.slice(t.box.indexOf("/")+1);function Pl(t,e,n){const a=[];let s=0,o;for(const r of t){r.band!==o&&(s+=o===void 0?0:jl,r.band!==null&&(a.push(`<text class="band" x="0" y="${E(s+11)}">${x(r.band)}</text>`),s+=El),o=r.band);const i=r.cells.reduce((c,[,d])=>c+d,0),h=r.cells.reduce((c,[,,d])=>c+d,0),l=`${r.box??"the files that are gone"}: ${ee(i,"change")}, ${ee(h,"file")} written`;a.push(`<text class="row" x="${Ka-6}" y="${E(s+hn-2.5)}" text-anchor="end">${x(Nl(r))}<title>${x(l)}</title></text>`);for(const[c,d,u]of r.cells)d>0&&a.push(`<rect class="changed" x="${E(e(c)+.5)}" y="${E(s+.5)}" width="${E(Math.max(1,n-1))}" height="${hn-2}" rx="1" style="--v:${Ll(d).toFixed(2)}"/>`),u>0&&a.push(`<circle class="written" cx="${E(e(c)+n/2)}" cy="${E(s+hn/2-.5)}" r="1.7"/>`);s+=hn}return{markup:a.join(""),bottom:s}}function Rl(t,e,n){const a=[];let s=-1/0;return t.forEach((o,r)=>{const i=Va(o);r>0&&Va(t[r-1]??o)===i||e(r)-s<36||(s=e(r),a.push(`<line class="day" x1="${E(e(r))}" x2="${E(e(r))}" y1="${E(n+2)}" y2="${E(n+6)}"/><text class="day" x="${E(e(r))}" y="${E(n+16)}">${i}</text>`))}),a.join("")}function Fl(t,e,n){const a=(Xs-Ka-Il)/Math.max(1,e.length),s=h=>Ka+h*a,{markup:o,bottom:r}=Pl(t,s,a),i=[...n].map(h=>{const l=e[h];return l?`<rect class="sweep" x="${E(s(h))}" y="0" width="${E(a)}" height="${E(r)}"><title>${x(`${Va(l)}, a sweep: ${l.subject}`)}</title></rect>`:""}).join("");return`<svg class="change-matrix" viewBox="0 0 ${Xs} ${E(r+Cl)}" role="img" aria-label="${t.length} boxes over ${e.length} commits: where each commit changed files, and where it wrote new ones">${i}${o}${Rl(e,s,r)}</svg>`}const Zs=["January","February","March","April","May","June","July","August","September","October","November","December"];function Bl(t,e){const[n,a=1,s]=t.date.slice(0,10).split("-").map(Number),[o,r=1,i]=e.date.slice(0,10).split("-").map(Number),[h,l]=[Zs[a-1],Zs[r-1]];return n!==o?`from ${s} ${h} ${n} to ${i} ${l} ${o}`:a!==r?`from ${s} ${h} to ${i} ${l} ${o}`:s===i?`on ${s} ${h} ${n}`:`from ${s} to ${i} ${l} ${o}`}function Dl({history:t,snapshots:e,lives:n}){const a=e.at(-1)??{modules:[],dependencies:[]},s=vs(a).bands.map(f=>f.name),o=new Set(t.changes.flatMap((f,m)=>f.changed.length>pt?[m]:[])),r=n.filter(f=>!f.test),i=r.reduce((f,m)=>f+m.changed.length,0),[h,l]=[t.commits[0],t.commits.at(-1)],c=h&&l?`${ee(t.commits.length,"commit")}, ${Bl(h,l)}`:"no commits",d=(f,m)=>`<span class="key ${f}"></span>${m}`,u=(f,m)=>`<span class="key shade" style="--v:${f}"></span>${m}`;return`<figure class="changes-figure">${Fl(Al(n,s),t.commits,o)}<p class="changes-legend">${u(.25,"one file changed")}${u(.5,"two")}${u(.75,"four")}${u(1,"eight or more")}${d("written","a file written")}${d("sweep",`a sweep, over ${pt} files at once`)}</p><figcaption>${c}: ${ee(i,"change")} to files that ship, and ${ee(r.length,"file")} written.</figcaption></figure>`}function qn(t){return x(t).replaceAll("/","/<wbr>")}function Hl(t,e,n,a=12){const s=new Map(e.map(m=>[m.id,m])),o=new Set(n.modules.map(m=>m.id)),r=m=>o.has(m)&&s.get(m)?.test===!1,i=n.dependencies.map(({from:m,to:p})=>[m,p]),h=(m,p)=>{const y=Math.min(Wn(i,m,1/0,"needs").get(p)??1/0,Wn(i,p,1/0,"needs").get(m)??1/0);return y===1?"an arrow":Number.isFinite(y)?"arrows through others":"no arrow at all"},c=t.filter(({a:m,b:p})=>r(m)&&r(p)).slice(0,a).map(({a:m,b:p,together:y})=>({together:y,a:s.get(m)?.path??"",b:s.get(p)?.path??"",joined:h(m,p)})),d=c.filter(m=>m.joined==="no arrow at all").length,u=c.map(m=>`<tr${m.joined==="no arrow at all"?' class="hidden"':""}><td>${m.together}</td><td><code>${qn(m.a)}</code></td><td><code>${qn(m.b)}</code></td><td>${m.joined}</td></tr>`).join(""),f=`The ${c.length} pairs of files that changed together most, the tests and the sweeps left out, and what joins them in the source now. ${d} of them ${d===1?"has":"have"} no arrow between them, near or far.`;return`<figure class="changes-figure"><table class="together"><thead><tr><th>commits</th><th>one file</th><th>and the other</th><th>between them</th></tr></thead><tbody>${u}</tbody></table><figcaption>${f}</figcaption></figure>`}const Qs=300,St=12,eo=3;function Wl(t,e){const n=o=>E(eo+o/Math.max(1,e-1)*(Qs-eo*2)),a=t.went??e-1,s=t.changed.map(o=>`<line class="change" x1="${n(o)}" x2="${n(o)}" y1="1.5" y2="${St-1.5}"/>`).join("");return`<svg class="life" viewBox="0 0 ${Qs} ${St}" role="img" aria-label="written at commit ${t.born+1}, changed at ${t.changed.length} commits after"><line class="lived" x1="${n(t.born)}" x2="${n(a)}" y1="${St/2}" y2="${St/2}"/>${s}<circle class="written" cx="${n(t.born)}" cy="${St/2}" r="2.4"/></svg>`}function ql(t,e,n,a=12){const s=t.filter(l=>!l.test&&l.went===void 0).sort((l,c)=>c.changed.length-l.changed.length||c.lines-l.lines||l.path.localeCompare(c.path)).slice(0,a),o=l=>n?.lines[l.path],r=s.map(l=>{const c=o(l);return`<tr><td><code>${qn(l.path)}</code></td><td>${l.changed.length}</td><td>${l.lines}</td><td>${c===void 0?"–":`${Math.round(c)}%`}</td><td>${Wl(l,e)}</td></tr>`}).join(""),i=s.filter(l=>o(l)===0).length,h=[`The ${s.length} files changed most, each one's life on the same line of commits, from the first to the last: a dot where it was written, and a mark for every commit that changed it.`,n?`${i} of them ${i===1?"has":"have"} no line a test runs.`:""].join(" ");return`<figure class="changes-figure"><table class="hotspots"><thead><tr><th>file</th><th>changes</th><th>lines</th><th>tests run</th><th>its life, commit by commit</th></tr></thead><tbody>${r}</tbody></table><figcaption>${h.trim()}</figcaption></figure>`}function to(t,e){const[n,a]=[ke(t.carried,t.changes),ke(e.carried,e.changes)],[s,o]=[t.carried/Math.max(1,t.changes),e.carried/Math.max(1,e.changes)];return{how:n===a?"as often":s<o?"less often":"more often",shares:`${n} against ${a}`}}function _l(t){const e=(r,i)=>t.find(h=>h.across===r&&h.typeOnly===i)??{across:r,typeOnly:i,changes:0,carried:0},n=r=>`<td>${ke(r.carried,r.changes)} · ${r.carried} of ${r.changes}</td>`,a=(r,i)=>`<tr><th scope="row">${i}</th>${n(e(r,!1))}${n(e(r,!0))}</tr>`,s=to(e(!0,!0),e(!0,!1)),o=to(e(!1,!0),e(!1,!1));return`<figure class="changes-figure"><table class="ripples"><thead><tr><th></th><th>onto a value</th><th>onto only a type</th></tr></thead><tbody>${a(!1,"inside a box")}${a(!0,"across two boxes")}</tbody></table><figcaption>Across boxes, an arrow onto a type carried a change ${s.how} ${s.how==="as often"?"as":"than"} one onto a value: ${s.shares}. Inside a box, ${o.how}: ${o.shares}.</figcaption></figure>`}function zl(t,e){const n=o=>(o.went??e)-1-o.born,a=Math.max(0,...t.map(n)),s=[];for(let o=1,r=1;o<=a;o=r+1,r*=2){const i=Math.min(r,a),h=t.reduce((c,d)=>c+Math.max(0,Math.min(i,n(d))-o+1),0),l=t.reduce((c,d)=>c+d.changed.filter(u=>u-d.born>=o&&u-d.born<=i).length,0);s.push({from:o,to:i,lived:h,changed:l})}return s}const ln=600,ia=190,He={top:18,right:8,bottom:36,left:8},Gl=34,Yl=({from:t,to:e})=>t===e?`${t}`:`${t}–${e}`,no=t=>t.reduce((e,n)=>({lived:e.lived+n.lived,changed:e.changed+n.changed}),{lived:0,changed:0});function Ul(t,e){const n=t.filter(g=>!g.test),a=zl(n,e),s=g=>g.lived>0?g.changed/g.lived:0,o=Math.max(1e-4,...a.map(s)),r=(ln-He.left-He.right)/Math.max(1,a.length),i=Math.min(Gl,r*.6),h=ia-He.bottom,l=a.map((g,b)=>{const v=s(g)/o*(h-He.top),[T,S]=[He.left+r*b+(r-i)/2,h-v];return`<rect class="bar" x="${E(T)}" y="${E(S)}" width="${E(i)}" height="${E(v)}" rx="2"><title>${g.changed} of ${g.lived}</title></rect><text class="value" x="${E(T+i/2)}" y="${E(S-4)}" text-anchor="middle">${ke(g.changed,g.lived)}</text><text class="age" x="${E(T+i/2)}" y="${E(h+13)}" text-anchor="middle">${Yl(g)}</text>`}).join(""),c=`<svg class="settling" viewBox="0 0 ${ln} ${ia}" role="img" aria-label="The share of commits that changed a file, by how many commits old it was"><line class="base" x1="${He.left}" x2="${ln-He.right}" y1="${E(h)}" y2="${E(h)}"/>${l}<text class="axis" x="${ln/2}" y="${ia-6}" text-anchor="middle">its age: the commits since the one that wrote it</text></svg>`,d=n.filter(g=>g.went===void 0),u=d.filter(g=>g.changed.length===0).length,f=no(a.filter(g=>g.to<=2)),m=no(a.filter(g=>g.from>8)),p=[`${u} of the ${ee(d.length,"file")} that ship have not changed since the commit that wrote them.`];if(f.lived>0){const g=m.lived>0?`, and in ${ke(m.changed,m.lived)} of those after its eighth`:"";p.push(`A file changed in ${ke(f.changed,f.lived)} of the first two commits it lived through${g}.`)}const y=p.join(" ");return`<figure class="changes-figure">${c}<figcaption>${y}</figcaption></figure>`}const ao=560,cn=420,we={left:46,right:14,top:14,bottom:44},Jl=2.5,Pe=t=>t.changes/Math.max(1,t.files),di=t=>`${Math.round(t*10)/10}`,Kl=t=>Math.abs(t.abstractness+(t.instability??0)-1),ui=t=>t.instability!==null&&t.abstractness+t.instability<.5,mi=t=>t.filter(e=>ui(e)&&e.changes>0).sort((e,n)=>Pe(n)-Pe(e)||n.changes-e.changes);function Vl(t){const[e,n]=[ao-we.left-we.right,cn-we.top-we.bottom],a=u=>we.left+u*e,s=u=>we.top+(1-u)*n,o=(u,f)=>`<polygon class="zone ${u}" points="${f.map(([m,p])=>`${E(a(m))},${E(s(p))}`).join(" ")}"/>`,i=t.filter(u=>u.instability!==null).sort((u,f)=>Pe(u)-Pe(f)||f.files-u.files).map(u=>{const f=`${u.box}: needed by ${ee(u.neededBy,"file")} elsewhere, needs ${u.needs}; ${ee(u.changes,"change")} to its ${ee(u.files,"file")}`;return`<circle class="box" data-box="${x(u.box)}" cx="${E(a(u.instability??0))}" cy="${E(s(u.abstractness))}" r="${E(2.5+Math.sqrt(u.files)*.9)}" style="--v:${Math.min(1,Pe(u)/Jl).toFixed(2)}"><title>${x(f)}</title></circle>`}).join(""),h=mi(t).slice(0,4).sort((u,f)=>f.abstractness-u.abstractness||(u.instability??0)-(f.instability??0)).map((u,f)=>({box:u,x:a(.17),y:s(.44)+f*14})),l=h.map(({box:u,x:f,y:m})=>`<line class="leader" x1="${E(f-3)}" y1="${E(m-3)}" x2="${E(a(u.instability??0))}" y2="${E(s(u.abstractness))}"/>`).join(""),c=h.map(({box:u,x:f,y:m})=>`<text class="name" x="${E(f)}" y="${E(m)}">${x(u.box)}</text>`).join(""),d=[0,.5,1].map(u=>`<text x="${E(a(u))}" y="${E(cn-we.bottom+14)}" text-anchor="middle">${u}</text>${u===0?"":`<text x="${E(we.left-6)}" y="${E(s(u)+3)}" text-anchor="end">${u}</text>`}`).join("");return`<svg class="stability" viewBox="0 0 ${ao} ${cn}" role="img" aria-label="Every box by how unstable and how abstract it is, and how often it changed">`+o("pain",[[0,0],[.5,0],[0,.5]])+o("useless",[[1,1],[.5,1],[1,.5]])+`<rect class="frame" x="${we.left}" y="${we.top}" width="${e}" height="${n}"/><line class="sequence" x1="${E(a(0))}" y1="${E(s(1))}" x2="${E(a(1))}" y2="${E(s(0))}"/><text class="zone-name" x="${E(a(.01))}" y="${E(s(.5)-5)}">zone of pain</text><text class="zone-name" x="${E(a(.99))}" y="${E(s(.5)+13)}" text-anchor="end">zone of uselessness</text><text class="zone-name" transform="translate(${E(a(.62))} ${E(s(.38)-6)}) rotate(${E(Math.atan2(n,e)*180/Math.PI)})" text-anchor="middle">the main sequence</text>${l}${i}${c}${d}<text class="axis" x="${E(a(.5))}" y="${cn-8}" text-anchor="middle">instability: how little needs it, so how free it is to change</text><text class="axis" transform="translate(12 ${E(s(.5))}) rotate(-90)" text-anchor="middle">abstractness: its files of nothing but types</text></svg>`}function Xl(t){const e=t.filter(ui).length,n=mi(t).map((s,o)=>`${s.box} (${di(Pe(s))}${o===0?` ${Pe(s)===1?"change":"changes"} a file`:""})`),a=n.length>1?`${n.slice(0,-1).join(", ")} and ${n.at(-1)}`:n[0]??"none of them";return`${ee(e,"box","boxes")} ${e===1?"stands":"stand"} in the zone of pain. The ones there that have changed, the most first: ${a}.`}function Zl(t){return`<details class="numbers"><summary>every box's figures</summary><table><thead><tr><th>box</th><th>files</th><th>needed by</th><th>needs</th><th>I</th><th>A</th><th>D</th><th>changes a file</th></tr></thead><tbody>${[...t].sort((n,a)=>n.box.localeCompare(a.box)).map(n=>`<tr><td><code>${qn(n.box)}</code></td><td>${n.files}</td><td>${n.neededBy}</td><td>${n.needs}</td><td>${n.instability===null?"–":n.instability.toFixed(2)}</td><td>${n.abstractness.toFixed(2)}</td><td>${n.instability===null?"–":Kl(n).toFixed(2)}</td><td>${di(Pe(n))}</td></tr>`).join("")}</tbody></table></details>`}function Ql(t){return`<figure class="changes-figure">${Vl(t)}<figcaption>${Xl(t)}</figcaption>${Zl(t)}</figure>`}function ec({tested:t,withTest:e,untested:n}){return`<figure class="changes-figure tested"><p class="figure-number"><strong>${ke(e,t)}</strong> of the changes to a file a test imports came with its test</p><figcaption>${e} of the ${t} changes to a file a test imports came with a change to that test, or a new one, in the same commit. Another ${n} changes went to files with something to run that no test imports.</figcaption></figure>`}function tc(t,e,n=pt){const a=[!1,!0].flatMap(s=>[!1,!0].map(o=>({across:s,typeOnly:o,changes:0,carried:0})));return t.changes.forEach((s,o)=>{const r=e[o];if(!r||s.changed.length===0||s.changed.length>n)return;const i=new Map(r.modules.filter(c=>!c.test).map(c=>[c.id,c.path])),h=new Set(s.added.map(([c])=>c)),l=new Set(s.changed);for(const{from:c,to:d,typeOnly:u}of r.dependencies){const[f,m]=[i.get(c),i.get(d)];if(f===void 0||m===void 0||h.has(c)||!l.has(d))continue;const p=ge(f)!==ge(m),y=a.find(g=>g.across===p&&g.typeOnly===u);y&&(y.changes+=1,l.has(c)&&(y.carried+=1))}}),a}function nc(t,e){const n=t.modules.filter(h=>!h.test),a=new Map(n.map(h=>[h.id,ge(h.path)])),s=new Map(e.map(h=>[h.id,h.changed.length])),o=new Map,r=new Map;for(const{from:h,to:l}of t.dependencies){const[c,d]=[a.get(h),a.get(l)];c===void 0||d===void 0||c===d||(r.set(c,(r.get(c)??new Set).add(h)),o.set(d,(o.get(d)??new Set).add(h)))}return[...new Set(a.values())].sort((h,l)=>h.localeCompare(l)).map(h=>{const l=n.filter(u=>a.get(u.id)===h),[c,d]=[o.get(h)?.size??0,r.get(h)?.size??0];return{box:h,files:l.length,neededBy:c,needs:d,instability:c+d>0?d/(c+d):null,abstractness:l.filter(u=>u.typesOnly).length/l.length,changes:l.reduce((u,f)=>u+(s.get(f.id)??0),0)}})}function ac(t,e,n=pt){const a={tested:0,withTest:0,untested:0};return t.changes.forEach((s,o)=>{const r=e[o];if(!r||s.changed.length>n)return;const i=new Map(r.modules.map(c=>[c.id,c])),h=new Map;for(const{from:c,to:d}of r.dependencies)i.get(c)?.test&&!i.get(d)?.test&&h.set(d,[...h.get(d)??[],c]);const l=new Set([...s.changed,...s.added.map(([c])=>c)]);for(const c of s.changed){const d=i.get(c);if(!d||d.test||d.typesOnly)continue;const u=h.get(c)??[];u.length===0?a.untested+=1:(a.tested+=1,u.some(f=>l.has(f))&&(a.withTest+=1))}}),a}const sc="/data/architecture.json",oc="/data/coverage.json",Ee=t=>{const e=$l(t(sc));return{...e,last:e.snapshots.at(-1)??{modules:[],dependencies:[]}}};function rc(t,e){try{const n=JSON.parse(t(oc));return n.sha===e?n:null}catch{return null}}const ic={"change-matrix":t=>Dl(Ee(t)),"change-settling":t=>{const{history:e,lives:n}=Ee(t);return Ul(n,e.commits.length)},"change-hotspots":t=>{const{history:e,lives:n}=Ee(t);return ql(n,e.commits.length,rc(t,e.commits.at(-1)?.sha))},"change-stability":t=>{const{last:e,lives:n}=Ee(t);return Ql(nc(e,n))},"change-cascade":t=>{const{history:e,snapshots:n,last:a}=Ee(t);return Ml(vl(e,n),xl(a))},"change-ripples":t=>{const{history:e,snapshots:n}=Ee(t);return _l(tc(e,n))},"change-together":t=>{const{history:e,lives:n,last:a}=Ee(t);return Hl(kl(e),n,a)},"change-tests":t=>{const{history:e,snapshots:n}=Ee(t);return ec(ac(e,n))}},hc={name:"architecture",apps:{architecture:wl},stills:{architecture:tl,...ic}},lc=[{name:"llave de laton",kind:"key",value:111},{name:"cristal magico",kind:"key",value:1112},{name:"llave de casa",kind:"key",value:1314},{name:"llave de la verja",kind:"key",value:2636},{name:"llave del puente",kind:"key",value:3444},{name:"llave del gnomo",kind:"key",value:4636},{name:"barca",kind:"key",value:3233},{name:"llave de la despensa",kind:"key",value:2010},{name:"diario",kind:"weapon",value:1},{name:"matamoscas",kind:"weapon",value:2},{name:"espada de madera",kind:"weapon",value:4},{name:"espada",kind:"weapon",value:8},{name:"espada venenosa",kind:"weapon",value:12},{name:"Thurmei",kind:"weapon",value:16},{name:"camisa",kind:"shield",value:2},{name:"escudo de madera",kind:"shield",value:4},{name:"escudo de escamas",kind:"shield",value:8},{name:"escudo",kind:"shield",value:12},{name:"Rharmei",kind:"shield",value:16},{name:"caramelo",kind:"food",value:2},{name:"judia",kind:"food",value:4},{name:"manzana",kind:"food",value:8},{name:"naranja",kind:"food",value:12},{name:"pocima",kind:"food",value:16}],cc=[{name:"mosca acida",attack:4,defence:0,drops:"cristal magico"},{name:"mosca",attack:0,defence:0,drops:"caramelo"},{name:"mosquito",attack:2,defence:0,drops:"matamoscas"},{name:"polilla",attack:1,defence:1,drops:"camisa"},{name:"cucaracha",attack:1,defence:1,drops:"llave de casa"},{name:"raton",attack:2,defence:2,drops:"judia"},{name:"rana venenosa",attack:2,defence:1,drops:"espada de madera"},{name:"planta carnivora",attack:1,defence:3,drops:"escudo de madera"},{name:"raton salvaje",attack:3,defence:3,drops:"llave de la verja"},{name:"escorpion dorado",attack:12,defence:2,drops:"espada venenosa"},{name:"trucha",attack:3,defence:3,drops:"manzana"},{name:"trucha asesina",attack:4,defence:7,drops:"escudo de escamas"},{name:"minimonstruo aquatico",attack:8,defence:4,drops:"llave del puente"},{name:"lobo",attack:8,defence:6,drops:"manzana"},{name:"lobo asesino",attack:12,defence:7,drops:"escudo"},{name:"ogro",attack:6,defence:10,drops:"naranja"},{name:"gnomo de puente",attack:11,defence:11,drops:"llave del gnomo"},{name:"murcielago",attack:8,defence:8,drops:"judia"},{name:"aranya",attack:14,defence:4,drops:"Thurmei"},{name:"vampiro",attack:12,defence:13,drops:"Rharmei"},{name:"aranya gigante",attack:14,defence:14,drops:"barca"},{name:"monstruo aquatico enorme",attack:32,defence:15,drops:"llave de la despensa"}],dc={"0,0":{name:"Bienvenida",exits:[-1,-1,0,-1],holds:"diario",text:`Bienvenido a este juego de aventura. 
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
sus otros habitantes.`}},uc={items:lc,monsters:cc,rooms:dc},{items:mc,monsters:fc,rooms:pc}=uc,ks={"llave de laton":"brass key","cristal magico":"magic crystal","llave de casa":"house key","llave de la verja":"gate key","llave del puente":"bridge key","llave del gnomo":"gnome's key",barca:"boat","llave de la despensa":"pantry key",diario:"newspaper",matamoscas:"fly swatter","espada de madera":"wooden sword",espada:"sword","espada venenosa":"poisoned sword",Thurmei:"Thurmei",camisa:"shirt","escudo de madera":"wooden shield","escudo de escamas":"scale shield",escudo:"shield",Rharmei:"Rharmei",caramelo:"sweet",judia:"bean",manzana:"apple",naranja:"orange",pocima:"potion"},fi={"mosca acida":"acid fly",mosca:"fly",mosquito:"mosquito",polilla:"moth",cucaracha:"cockroach",raton:"mouse","rana venenosa":"poison frog","planta carnivora":"carnivorous plant","raton salvaje":"wild mouse","escorpion dorado":"golden scorpion",trucha:"trout","trucha asesina":"killer trout","minimonstruo aquatico":"small water monster",lobo:"wolf","lobo asesino":"killer wolf",ogro:"ogre","gnomo de puente":"bridge gnome",murcielago:"bat",aranya:"spider",vampiro:"vampire","aranya gigante":"giant spider","monstruo aquatico enorme":"enormous water monster"},gc={Bienvenida:"Welcome","Usa las llaves":"Use the keys","Comedor sur":"Dining room, south",Salita:"Sitting room","Huerto de pepinos":"Cucumber patch","Huerto de tomates":"Tomato patch",Caminito:"Little path",Despensa:"Pantry","Aprende a atacar":"Learn to attack",Comedor:"Dining room",Recibidor:"Hall",Patio:"Yard","Huerto de Judias":"Bean patch",Manzanos:"Apple trees",Ciruelos:"Plum trees",Banyo:"Bathroom",Habitacion:"Bedroom","Comedor norte":"Dining room, north",Cocina:"Kitchen","Huerto de calabazas":"Pumpkin patch",Naranjos:"Orange trees",Entrada:"Gate",Nogal:"Walnut trees",Cueva:"Cave","Lago interno":"Underground lake","Centro del lago":"Middle of the lake","Rio salvaje":"Wild river",Rio:"River","Bosque oscuro":"Dark forest","Rio oscuro":"Dark river","Bosque tenebroso":"Gloomy forest","Bosque sombrio":"Shadowy forest","Bosque humedo":"Damp forest",Bosque:"Forest","Claro del Bosque":"Forest clearing","Puente del bosque":"Forest bridge"},ye=`The tunnel of the dark, gloomy cave goes on. The walls are damp and
water can be heard running somewhere far off. Walk carefully, or you
will slip or trip.`,Mt=`The forest stretches out, dark and mysterious. The light blurs
through the leaves. You can hear the animals and the forest's other
inhabitants.`,ha=`Though it is day, barely a glimmer of light gets in. Bushes, trees
and brambles make the going hard. Something moves in the dark.`,so=`Little light comes through the leaves of the trees. Brambles and
bushes give way to a small stream. Something moves in the dark.`,wc={"0,0":`Welcome to this adventure game.
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
the apples, they are hardy and get you through the winters.`,"3,0":ye,"3,1":ye,"3,2":`An immense underground lake opens up before you. It is dark and you
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
but something stirs beneath the surface.`,"4,0":ye,"4,1":ye,"4,2":ye,"4,3":ha,"4,4":`The north bank of the river is dismal. Strange noises can be heard,
and you sense a curse. Here is the bridge that crosses to the south
bank; the air feels hostile and urges you across.`,"4,5":`The river flows under the rocks and the roots of the forest's trees.
The sounds of the forest grow louder and you feel watched.`,"4,6":`A gap between brambles and bushes lets you into the gloomy forest.
Light is scarce and the shadows are threatening.`,"4,7":ha,"5,0":`The tunnel of the dark, gloomy cave goes on. A great cobweb blocks
the way south. One careless move could make you its prey.`,"5,1":ye,"5,2":`The tunnel of the dark, gloomy cave goes on. The walls are damp, and
the sound of water grows louder. Walk carefully, or you will slip or
trip.`,"5,3":`The forest is dark, and beside you you have found a great wall of
solid rock to the west: the mountain, probably.`,"5,4":so,"5,5":Mt,"5,6":`The forest stretches out, dark and mysterious. You are in a small
clearing where the sky can be seen. You notice the forest is
restless.`,"5,7":Mt,"6,0":ye,"6,1":ye,"6,2":`You are inside the cave; it is dark and gloomy. The walls are damp and
water can be heard running somewhere far off. You try to look ahead,
but it seems to have no end.`,"6,3":`The forest is dark, and beside you you have found a great wall of
solid rock to the west: the mountain, probably. You notice the rock
is damp; there is very likely a cave.`,"6,4":`Little light comes through the leaves of the trees. Brambles and
bushes give way to a small stream. A bridge crosses the stream to the
eastern part of the forest; there, under a tree, is the house of a
troll you will have to get past if you want to go east.`,"6,5":ha,"6,6":`The forest stretches out, dark, mysterious and restless. You are in a
small clearing where the sky can be seen.`,"6,7":`In this part of the forest the light begins to fail. Tangles of
bushes and brambles slow your steps. You notice something moving
among the shadows.`,"7,0":ye,"7,1":ye,"7,2":`You are a few steps inside the cave. Cold, damp air reaches you from
within. You try to see where it ends, but you cannot. You hear
murmurs from deep inside.`,"7,3":`Little light comes through the leaves of the trees. A tangle of
climbing plants stirs to the west: it is the mouth of a cave. You
feel a presence watching you.`,"7,4":so,"7,5":Mt,"7,6":Mt,"7,7":Mt},ut=(t,e)=>t[e]??e,yc=mc.map(t=>({...t,name:ut(ks,t.name)})),bc=fc.map(t=>({...t,name:ut(fi,t.name),drops:ut(ks,t.drops)})),vc=Object.fromEntries(Object.entries(pc).map(([t,e])=>[t,{...e,name:ut(gc,e.name),holds:ut(ks,ut(fi,e.holds)),text:wc[t]??e.text}])),kc={items:yc,monsters:bc,rooms:vc},_n=16,{items:Xa,monsters:xc,rooms:$c}=kc,oo=["norte","sur","este","oeste"],Tc={norte:[1,0],sur:[-1,0],este:[0,1],oeste:[0,-1]},ro=[0,0],io=[1,0],zn=(t,e)=>t.find(n=>n.name===e);function ho(t){const e=zn(Xa,t);if(e)return{item:e};const n=zn(xc,t);return n?{monster:n}:null}class gt{places=new Map;at=[ro[0],ro[1]];life=_n;weapon=null;shield=null;key=null;visited=new Set;constructor(){for(const[e,n]of Object.entries($c))this.places.set(e,{room:n,exits:[...n.exits],holds:ho(n.holds)});this.visited.add(this.here())}here(){return`${this.at[0]},${this.at[1]}`}place(){const e=this.places.get(this.here());if(!e)throw new Error(`no room at ${this.here()}`);return e}get won(){return this.at[0]===io[0]&&this.at[1]===io[1]}get spent(){return this.life<=0}save(){return JSON.stringify({at:this.at,life:this.life,held:[this.weapon?.name??null,this.shield?.name??null,this.key?.name??null],visited:[...this.visited],places:[...this.places].map(([e,n])=>[e,n.exits,n.holds?"item"in n.holds?n.holds.item.name:n.holds.monster.name:null])})}static load(e){const n=JSON.parse(e),a=new gt;a.at=n.at,a.life=n.life,[a.weapon,a.shield,a.key]=n.held.map(s=>s?zn(Xa,s)??null:null),a.visited.clear();for(const s of n.visited)a.visited.add(s);for(const[s,o,r]of n.places){const i=a.places.get(s);i&&Object.assign(i,{exits:o,holds:r?ho(r):null})}return a}charted(){return[...this.visited].sort().flatMap(e=>{const n=this.places.get(e);if(!n)return[];const{holds:a}=n;return[{where:e,name:n.room.name,exits:[n.exits[0],n.exits[1],n.exits[2],n.exits[3]],holds:a?"item"in a?{kind:a.item.kind,name:a.item.name}:{kind:"monster",name:a.monster.name}:null}]})}look(){const{room:e,exits:n,holds:a}=this.place();return{name:e.name,text:e.text,...a&&"monster"in a?{monster:a.monster.name}:{},...a&&"item"in a?{item:a.item.name,itemKind:a.item.kind}:{},exits:oo.flatMap((s,o)=>(n[o]??-1)>=0?[{direction:s,locked:(n[o]??0)>0}]:[]),at:[this.at[0],this.at[1]],life:this.life,...this.weapon?{weapon:this.weapon.name}:{},...this.shield?{shield:this.shield.name}:{},...this.key?{key:this.key.name}:{}}}go(e){const n=this.place(),a=oo.indexOf(e),s=n.exits[a]??-1;if(s<0)return"There is no way out that way.";if(s>0){if(!this.key||this.key.value!==s)return"The way is locked and you are not carrying the key.";n.exits[a]=0,this.key=null}const[o,r]=Tc[e];return this.at=[this.at[0]+o,this.at[1]+r],this.visited.add(this.here()),""}take(){const e=this.place();if(!e.holds||!("item"in e.holds))return"There is nothing here to take!";const{item:n}=e.holds;if(n.kind==="food")return this.life=Math.min(_n,this.life+n.value),e.holds=null,"Yum yum!";const a=n.kind,s=this[a];return this[a]=n,e.holds=s?{item:s}:null,{weapon:"You have taken a weapon.",shield:"You have taken a shield.",key:"You have taken a key."}[a]}attack(){const e=this.place();if(!e.holds||!("monster"in e.holds))return"There is no monster to attack!";if(!this.weapon)return"You have no weapon to attack with!";const{monster:n}=e.holds,a=[];if(this.weapon.value-n.defence>0){const o=zn(Xa,n.drops);e.holds=o?{item:o}:null,a.push("The monster has been defeated!")}const s=n.attack-(this.shield?.value??0);return s>0&&(this.life-=s,a.push("OUCH!")),a.join(" ")||"Neither of you gets anywhere."}run(e){const n=e.trim().toLowerCase(),a={norte:"norte",north:"norte",n:"norte",sur:"sur",south:"sur",s:"sur",este:"este",east:"este",e:"este",oeste:"oeste",west:"oeste",w:"oeste"}[n];return a?this.go(a):n==="coger"||n==="take"||n==="get"?this.take():n==="atacar"||n==="attack"||n==="hit"?this.attack():n==="mirar"||n==="look"||n==="l"||n===""?"":"I do not understand you."}}function nt(t,e){const n=Math.max(...t.map(s=>s.length)),a=[];return t.forEach((s,o)=>{for(let r=0;r<s.length;){const i=s[r]??".";let h=r+1;for(;s[h]===i;)h+=1;const l=e[i];i!=="."&&l&&a.push(`<rect x="${r}" y="${o}" width="${h-r}" height="1" fill="${l}"/>`),r=h}}),`<svg class="pixel" viewBox="0 0 ${n} ${t.length}" shape-rendering="crispEdges" aria-hidden="true">${a.join("")}</svg>`}const at={k:"var(--ink)",a:"var(--accent)",m:"#aeb8c4",g:"#d4a017",b:"#8a5a2b",r:"#c0392b",w:"#f1f1ee",l:"#3f9b4b"},Qt={weapon:nt(["......mm",".....mmm","....mmm.","g..mmm..",".gmmm...","..bg....",".b..g...","b......."],at),shield:nt([".kkkkkk.","kmmrrmmk","kmmrrmmk","krrrrrrk","kmmrrmmk",".kmrrmk.","..kmmk..","...kk..."],at),food:nt(["....b...","...b.ll.",".rrbrr..","rrrrrrr.","rwrrrrr.","rrrrrrr.",".rrrrr..","..r.r..."],at),key:nt(["........",".ggg....","g...g...","g...gggg","g...g.g.",".ggg..gg","........","........"],at),monster:nt(["........","...rr...","..rrrr..",".rwrrwr.",".rkrrkr.","rrrrrrrr","rrkkkkrr","r.r..r.r"],at),player:nt(["...kk...","..kkkk..","...kk...",".aaaaaa.","a.aaaa.a","..aaaa..","..a..a..",".kk..kk."],at)},dn=8,Sc=["n","s","e","w"];function Mc(t,e){const n=new Map(t.map(s=>[s.where,s])),a=[];for(let s=dn-1;s>=0;s-=1)for(let o=0;o<dn;o+=1){const r=`${s},${o}`,i=n.get(r),h=e[0]===s&&e[1]===o;if(!i){a.push(`<span class="cell" data-where="${r}"><span></span></span>`);continue}const l=Sc.flatMap((f,m)=>{const p=i.exits[m]??-1;return p<0?[`wall-${f}`]:p>0?[`door-${f}`]:[]}),c=["cell","seen",h?"here":"",...l].filter(Boolean).join(" "),d=i.holds?`<span class="thing${i.holds.kind==="monster"?" monster":""}" title="${x(i.holds.name)}">${Qt[i.holds.kind]}</span>`:"",u=h?`<span class="player">${Qt.player}</span>`:"";a.push(`<span class="${c}" data-where="${r}" title="${x(i.name)}"><span class="room">${x(i.name)}</span>${d}${u}</span>`)}return`<div class="map" role="img" aria-label="The map: ${t.length} of ${dn*dn} rooms seen">${a.join("")}</div>`}const Ac={norte:"north",sur:"south",este:"east",oeste:"west"};function Ic(t){const e=["weapon","shield","key"].flatMap(a=>t[a]?[`<span class="held">${Qt[a]}${x(t[a]??"")}</span>`]:[]),n=Array.from({length:_n},(a,s)=>`<span class="heart${s<t.life?" full":""}"></span>`).join("");return`<p class="gear"><span class="hearts" title="${t.life} of ${_n} life">${n}</span>${e.join("")}</p>`}function Ec(t){const e=t.exits.map(({direction:a,locked:s})=>`${Ac[a]}${s?" (locked)":""}`),n=[t.weapon&&`weapon:${t.weapon}`,t.shield&&`shield:${t.shield}`,t.key&&`key:${t.key}`].filter(Boolean).join(" ");return`<div class="seen"><h4>===== ${x(t.name)} =====</h4><p>${x(t.text).replace(/\n/g,"<br>")}</p>`+(t.monster?`<p class="monster">${Qt.monster}There is a monster here: ${x(t.monster)}</p>`:"")+(t.item?`<p class="item">${Qt[t.itemKind??"weapon"]}There is: ${x(t.item)}</p>`:"")+`<p class="exits">Exits: ${e.length?e.join(", "):"none"}.</p>`+Ic(t)+`<p class="status">(${t.at[1]},${t.at[0]})| ${x(n)} ${t.life}&gt;</p></div>`}function pi(t){return`<div class="adventure">${Mc(t.charted(),t.look().at)}${Ec(t.look())}</div>`}const jc=()=>pi(new gt),gi="adventure",Cc=["north","south","east","west","take","attack"];function Oc(t){let e=Lc()??new gt;const n=w("div"),a=w("p",{class:"said"}),s=w("input",{type:"text",autocomplete:"off",spellcheck:!1,placeholder:"north, south, east, west, take, attack"});function o(c=""){n.innerHTML=pi(e),a.textContent=e.spent&&!c?"Game over; better luck next time.":c,e.won&&(a.textContent="CONGRATULATIONS! You have reached the pantry."),i()}function r(c){const d=e.run(c);o(d),s.value="",s.focus()}function i(){try{localStorage.setItem(gi,e.save())}catch{}}const h=w("form",{onsubmit:c=>(c.preventDefault(),r(s.value))},w("span",{class:"ps1"},"> "),s),l=w("div",{class:"row"},...Cc.map(c=>w("button",{type:"button",onclick:()=>r(c)},c)),w("button",{type:"button",class:"quiet",onclick:()=>(e=new gt,o(""))},"start again"));return t.replaceChildren(n,a,h,l),o(""),()=>i()}function Lc(){try{const t=localStorage.getItem(gi);return t?gt.load(t):null}catch{return null}}const Nc={name:"adventure",apps:{adventure:Oc},stills:{adventure:jc}},Pc=["January","February","March","April","May","June","July","August","September","October","November","December"];function Kn(t){const[e,n,a]=t.refreshed.split("-").map(Number),s=`${a} ${Pc[(n??1)-1]} ${e}`,o=`${Math.min(...t.years)} to ${Math.max(...t.years)}`;return`<p class="source">Source: ${x(t.attribution)} <a href="${x(t.dataset)}">The dataset, at its source.</a> This site keeps sums of the finished years ${o}, last added to on ${s}.</p>`}function xs(t,e){const n=t.querySelector("p.source");if(n)return n;const a=document.createElement("div");return fetch(e).then(s=>s.json()).then(s=>{a.innerHTML=Kn(s)}).catch(()=>{}),a}const ct=[{code:"08019004",name:"Barcelona (Poblenou)",kind:"background",area:"urban"},{code:"08019043",name:"Barcelona (Eixample)",kind:"traffic",area:"urban"},{code:"08019044",name:"Barcelona (Gràcia - Sant Gervasi)",kind:"traffic",area:"urban"},{code:"08019057",name:"Barcelona (Palau Reial)",kind:"background",area:"urban"},{code:"08019058",name:"Barcelona (Observatori Fabra)",kind:"background",area:"suburban"},{code:"08015021",name:"Badalona",kind:"background",area:"urban"},{code:"08187012",name:"Sabadell",kind:"traffic",area:"urban"},{code:"17079003",name:"Girona (Escola de Música)",kind:"traffic",area:"urban"},{code:"25120001",name:"Lleida",kind:"traffic",area:"urban"},{code:"43148028",name:"Tarragona (Parc de la Ciutat)",kind:"background",area:"urban"},{code:"08137001",name:"Montseny (La Castanya)",kind:"background",area:"rural"}];function Za(t,e){return e==="workdays"?[t.workdays]:e==="weekends"?[t.weekends]:[t.workdays,t.weekends]}const Rc=t=>(t%4===0&&t%100!==0||t%400===0?366:365)*24,la=t=>t.reduce((e,n)=>e+n.reduce((a,s)=>a+s,0),0);function Fc(t,e){return Object.entries(t.years).map(([n,a])=>{const s=Za(a,e),o=s.reduce((h,l)=>h+la(l.counts),0),r=s.reduce((h,l)=>h+la(l.sums),0),i=Za(a,"all").reduce((h,l)=>h+la(l.counts),0);return{year:Number(n),mean:o>0?r/o:Number.NaN,measured:i/Rc(Number(n))}}).filter(({mean:n})=>!Number.isNaN(n)).sort((n,a)=>n.year-a.year)}function Bc(t,e){const n=Object.entries(t.years).filter(([a])=>Number(a)>=e.from&&Number(a)<=e.to).flatMap(([,a])=>Za(a,e.days));return Array.from({length:24},(a,s)=>Array.from({length:12},(o,r)=>{const i=n.reduce((l,c)=>l+(c.sums[r]?.[s]??0),0),h=n.reduce((l,c)=>l+(c.counts[r]?.[s]??0),0);return{mean:h>0?i/h:null,count:h}}))}const st=[[0,[0,255,0]],[20,[225,225,0]],[40,[255,0,0]],[60,[225,0,225]],[80,[64,0,64]],[230,[16,0,8]]],Dc=([t,e,n])=>(.299*t+.587*e+.114*n)/255;function $s(t){const e=Math.max(0,Math.min(t,230)),n=Math.max(1,st.findIndex(([l])=>l>=e)),[a,s]=st[n-1]??st[0],[o,r]=st[n]??st[st.length-1],i=(e-a)/(o-a),h=s.map((l,c)=>Math.round(l+((r[c]??0)-l)*i));return{background:`rgb(${h.join(",")})`,light:Dc(h)<.45}}const Nn=80,wi=["January","February","March","April","May","June","July","August","September","October","November","December"],yi=t=>String(t+1).padStart(2,"0");function Hc(t,e,n){if(t.mean===null)return'<td class="none"></td>';const{background:a,light:s}=$s(t.mean),o=s?' class="deep"':"",r=`${wi[n]}, hour ${yi(e)}: ${t.mean.toFixed(1)} µg/m³, the mean of ${t.count} measurements`;return`<td${o} style="background:${a}" title="${r}">${Math.round(t.mean)}</td>`}function Wc(t){const e=`<tr><th></th>${wi.map(a=>`<th scope="col">${a.slice(0,3)}</th>`).join("")}</tr>`,n=t.map((a,s)=>`<tr><th scope="row">${yi(s)}</th>${a.map((o,r)=>Hc(o,s,r)).join("")}</tr>`);return`<table class="heat graded"><thead>${e}</thead><tbody>${n.join("")}</tbody></table>`}function Ts(t){if(t<=0)return[0];const e=10**Math.floor(Math.log10(t)),n=t/e>=5?e:t/e>=2?e/2:e/5,a=[];for(let s=0;s<=t;s+=n)a.push(Math.round(s*100)/100);return a}const un=720,ca=190,ce={top:14,right:8,bottom:22,left:34};function bi(t,e,n){const a=Math.min(...t),s=Math.max(...t),o=un-ce.left-ce.right,r=ca-ce.top-ce.bottom,i=o/Math.max(1,s-a+1),h=m=>ce.left+(m-a)*i,l=m=>ce.top+r-(m-e)/Math.max(1e-9,n-e)*r,d=Ts(n-e).map(m=>Math.round((m+e)*100)/100).map(m=>`<line class="grid" x1="${ce.left}" x2="${un-ce.right}" y1="${E(l(m))}" y2="${E(l(m))}"/><text x="${ce.left-4}" y="${E(l(m)+3)}" text-anchor="end">${m}</text>`).join(""),u=s-a>12?5:1,f=Array.from({length:s-a+1},(m,p)=>a+p).filter(m=>m%u===0).map(m=>`<text x="${E(h(m)+i/2)}" y="${ca-6}" text-anchor="middle">${m}</text>`).join("");return{slot:i,x:h,y:l,left:ce.left,right:un-ce.right,top:ce.top,height:r,levels:m=>m.map(({from:p,to:y,value:g,label:b})=>`<line class="span" x1="${E(h(p))}" x2="${E(h(y)+i)}" y1="${E(l(g))}" y2="${E(l(g))}"/><text class="span" x="${E((h(p)+h(y)+i)/2)}" y="${E(l(g)-5)}" text-anchor="middle">${b}</text>`).join(""),wrap:(m,p)=>`<svg class="years" viewBox="0 0 ${un} ${ca}" role="img" aria-label="${m}">${d}${f}${p}</svg>`}}function Qa(t,e){const n=Math.max(e.top??0,...t.map(({value:c})=>c),1),a=bi(t.map(({year:c})=>c),0,n),{x:s,y:o,slot:r}=a,i=t.map(({year:c,value:d,title:u,chosen:f,partial:m,colour:p})=>`<rect class="${["bar",f?"chosen":"",m?"partial":""].filter(Boolean).join(" ")}" data-year="${c}"${p?` style="--bar:${p}"`:""} x="${E(s(c)+r*.15)}" y="${E(o(d))}" width="${E(r*.7)}" height="${E(o(0)-o(d))}"/><rect class="hit" data-year="${c}" x="${E(s(c))}" y="${a.top}" width="${E(r)}" height="${a.height}"><title>${u}</title></rect>`).join(""),h=(e.references??[]).map(({value:c,label:d})=>`<line class="reference" x1="${a.left}" x2="${a.right}" y1="${E(o(c))}" y2="${E(o(c))}"/><text class="reference" x="${a.right-2}" y="${E(o(c)-3)}" text-anchor="end">${d}</text>`).join(""),l=a.levels(e.spans??[]);return a.wrap(e.label,`${i}${h}${l}`)}const qc=.75,_c=[{value:40,label:"EU limit, 40"},{value:10,label:"WHO guideline, 10"}];function zc(t,e){const n=t.map(({year:a,mean:s,measured:o})=>{const r=o<qc,i=r?`, from only ${Math.round(o*100)}% of the year's hours`:"";return{year:a,value:s,partial:r,colour:$s(s).background,chosen:a>=e.from&&a<=e.to,title:`${a}: ${s.toFixed(1)} µg/m³${i}`}});return Qa(n,{label:"Mean NO2 of each year, µg/m³",top:Nn,references:_c})}const lo={all:"every day of the week",workdays:"Monday to Friday",weekends:"Saturdays and Sundays"};function Gc(){const t=Array.from({length:Nn/5+1},(n,a)=>$s(a*5).background),e=[0,20,40,60,Nn].map(n=>`<span>${n===Nn?`${n}+`:n}</span>`).join("");return`<div class="scale" aria-hidden="true"><div class="ramp" style="background:linear-gradient(to right,${t.join(",")})"></div><div class="ticks">${e}</div><div class="ticks words"><span>clean</span><span>EU limit</span><span>twice it</span></div></div>`}function vi(t,e){const n=Object.keys(t.years).map(Number),a=Math.max(e.from,Math.min(...n)),s=Math.min(e.to,Math.max(...n)),o=a===s?String(a):`${a}–${s}`;return`<figure class="no2"><figcaption><strong>${t.name}</strong> · ${t.kind}, ${t.area} · mean NO2 in µg/m³ by hour of the day and month of the year · ${lo[e.days]}, ${o}</figcaption>`+Wc(Bc(t,e))+Gc()+`<h4>The mean of each year, ${lo[e.days]}</h4>`+zc(Fc(t,e.days),{from:a,to:s})+"</figure>"}function zt(t){const e=Object.keys(t.years).map(Number);return{from:Math.min(...e),to:Math.max(...e),days:"all"}}const Yc=[["all","every day"],["workdays","Monday to Friday"],["weekends","Saturday and Sunday"]];function Uc(t){const e=new Map,n=xs(t,"/data/no2/index.json"),a=w("div");a.append(...t.querySelectorAll("figure"));let s=null,o={from:0,to:9999,days:"all"},r=!1;const i=(g,b=String(g))=>w("option",{value:g},b),h=w("select",{onchange:()=>{p(h.value)}},...ct.map(({code:g,name:b})=>i(g,b))),l=w("select",{onchange:()=>m({days:l.value})},...Yc.map(([g,b])=>i(g,b))),c=w("select",{onchange:()=>m({from:Number(c.value),to:Math.max(Number(c.value),o.to)})}),d=w("select",{onchange:()=>m({to:Number(d.value),from:Math.min(Number(d.value),o.from)})}),u=w("button",{type:"button",onclick:()=>s&&m(zt(s))},"every year");function f(){s&&(a.innerHTML=vi(s,o),c.value=String(o.from),d.value=String(o.to),l.value=o.days)}function m(g){o={...o,...g},f()}async function p(g){const b=e.get(g)??fetch(`/data/no2/${g}.json`).then(v=>v.json());e.set(g,b);try{const v=await b;if(r||h.value!==g)return;const T=zt(v),S=s!==null&&(o.from!==zt(s).from||o.to!==zt(s).to),A=Object.keys(v.years).map(Number).filter(O=>O>=o.from&&O<=o.to),k=S&&A.length>0?{from:Math.min(...A),to:Math.max(...A)}:T;s=v,o={...k,days:o.days};const I=Object.keys(v.years);c.replaceChildren(...I.map(O=>i(O))),d.replaceChildren(...I.map(O=>i(O))),f()}catch{e.delete(g),a.replaceChildren(w("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}a.addEventListener("click",g=>{const b=g.target?.closest("[data-year]")?.getAttribute("data-year");b&&m({from:Number(b),to:Number(b)})});const y=w("div",{class:"row"},w("label",{},"Station ",h),w("label",{},"Days ",l),w("label",{},"Years ",c," to ",d),u);return t.replaceChildren(y,a,n),p(h.value),()=>{r=!0}}const Jc="https://analisi.transparenciacatalunya.cat/resource";function ki(t,e){const n=new URL(`${Jc}/${t}.json`);for(const[a,s]of Object.entries(e))s!==void 0&&n.searchParams.set(`$${a}`,String(s));return n.toString()}const co="tasf-thgu",xi=Array.from({length:24},(t,e)=>String(e+1).padStart(2,"0")),Kc=0,Vc=6,mn=()=>Array.from({length:12},()=>new Array(24).fill(0)),Xc=()=>({workdays:{sums:mn(),counts:mn()},weekends:{sums:mn(),counts:mn()}});function Zc(t){if(!Array.isArray(t))throw new Error("the portal did not answer with rows");if(t.length===0)throw new Error("the portal answered with no rows");return t}function Qc(t,e){const n=Number(e.month)-1;xi.forEach((a,s)=>{const o=t.sums[n],r=t.counts[n];if(!o||!r)throw new Error(`month ${e.month} is not a month`);o[s]=(o[s]??0)+Number(e[`s${a}`]??0),r[s]=(r[s]??0)+Number(e[`n${a}`]??0)})}const ed={name:"no2",directory:"public/data/no2",firstYear:1991,files:ct.map(t=>`${t.code}.json`),about:{measures:"NO2, hourly, µg/m³",network:"Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica",attribution:"Generalitat de Catalunya, Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica. Dades obertes.",dataset:`https://analisi.transparenciacatalunya.cat/d/${co}`,stations:ct},requestsFor(t){const e=ct.map(a=>`'${a.code}'`).join(","),n=xi.map(a=>`sum(h${a}) as s${a}, count(h${a}) as n${a}`).join(", ");return[ki(co,{select:`codi_eoi, date_extract_m(data) as month, date_extract_dow(data) as dow, count(*) as days, ${n}`,where:`contaminant='NO2' and codi_eoi in (${e}) and data between '${t}-01-01T00:00:00' and '${t}-12-31T23:59:59'`,group:"codi_eoi,month,dow",limit:5e3})]},withYear(t,e,n){const a=Zc(n[0]);if(a.some(o=>Number(o.days)>5))throw new Error("some days are in the portal twice");if(!a.some(o=>o.month==="12"))throw new Error("the year does not reach December yet");const s=new Map;for(const o of a){const r=o.codi_eoi??"",i=s.get(r)??Xc();s.set(r,i);const h=Number(o.dow);Qc(h===Kc||h===Vc?i.weekends:i.workdays,o)}return Object.fromEntries(ct.map(o=>{const r=`${o.code}.json`,i=s.get(o.code),h={...t[r]?.years,...i?{[e]:i}:{}};return[r,{...o,years:h}]}))}},td=t=>{const e=JSON.parse(t(`/data/no2/${ct[0]?.code}.json`)),n=JSON.parse(t("/data/no2/index.json"));return vi(e,zt(e))+Kn(n)},nd={name:"air-quality",apps:{no2:Uc},stills:{no2:td},sources:[ed]},ad=9,uo=8,oe={days:5,hoursADay:uo,dayNames:["Mon","Tue","Wed","Thu","Fri"],hourNames:Array.from({length:uo},(t,e)=>`${ad+e}:00`)},At=t=>Math.max(0,Math.min(100,t));function mo(t){const{focus:e,fatigue:n,featureSize:a,weeks:s,calendar:o,meetingTypes:r}=t,i=[];let h=0,l=0;for(let c=0;c<s;c+=1)for(let d=0;d<oe.days;d+=1){let u=0,f=0;for(let m=0;m<oe.hoursADay;m+=1){const p=r[o[`${d}-${m}`]??""];if(p){u=At(u+p.focus),f=At(f+p.fatigue),i.push({week:c,day:d,hour:m,inMeeting:!0,hourFocus:u,hourFatigue:f,hourProductivity:0,accumulatedProductivity:h,completedFeatures:l,featureCompleted:!1});continue}u=At(u+e),f=At(f+n);const y=At(u-f),g=a-h,b=y>g,v=b?g:y;b?(l+=1,h=0):h+=v,i.push({week:c,day:d,hour:m,inMeeting:!1,hourFocus:u,hourFatigue:f,hourProductivity:v,accumulatedProductivity:h,completedFeatures:l,featureCompleted:b}),b&&(u=0)}}return i}function fn(){return Array.from({length:oe.hoursADay},()=>new Array(oe.days).fill(0))}function pn(t,{hour:e,day:n},a){const s=t[e];s&&(s[n]=(s[n]??0)+a)}function fo(t,{featureSize:e,weeks:n}){const a=t[t.length-1],s=a?.completedFeatures??0,o=a?.accumulatedProductivity??0,r=s+Math.round(10*o/e)/10,i=s*e+o,h=Array.from({length:oe.days},()=>({productivity:0,features:0,meetings:0})),l={focus:fn(),fatigue:fn(),productivity:fn(),features:fn()};for(const d of t){const u=h[d.day];u.productivity+=d.hourProductivity,d.featureCompleted&&(u.features+=1),d.inMeeting&&(u.meetings+=1),pn(l.focus,d,d.hourFocus),pn(l.fatigue,d,d.hourFatigue),pn(l.productivity,d,d.hourProductivity),d.featureCompleted&&pn(l.features,d,1)}const c=d=>d.map(u=>u.map(f=>n>0?f/n:0));return{totalFeatures:r,totalProductivity:i,averageFeaturesPerWeek:n>0?r/n:0,averageProductivityPerWeek:n>0?i/n:0,days:h,hours:{focus:c(l.focus),fatigue:c(l.fatigue),productivity:c(l.productivity),features:l.features}}}const Ss={width:480,height:240,pad:{top:10,right:10,bottom:34,left:36}},{width:po,height:da,pad:de}=Ss;function $i(t,e,n,a){const s=po-de.left-de.right,o=da-de.top-de.bottom,r=l=>de.top+o-(t>0?l/t*o:0),i=a.map(l=>`<line class="grid" x1="${de.left}" x2="${po-de.right}" y1="${r(l)}" y2="${r(l)}"/><text x="${de.left-4}" y="${r(l)+3}" text-anchor="end">${l}</text>`).join(""),h=(n>1?[1,Math.ceil(n/2),n]:[]).filter((l,c,d)=>d.indexOf(l)===c).map(l=>`<text x="${de.left+(l-1)/Math.max(1,n-1)*s}" y="${da-de.bottom+14}" text-anchor="middle">${l}</text>`).join("");return`${i}${h}<text x="${de.left+s/2}" y="${da-6}" text-anchor="middle">${e.x}</text><text transform="translate(9 ${de.top+o/2}) rotate(-90)" text-anchor="middle">${e.y}</text>`}const{width:go,height:It,pad:re}=Ss;function Ti(t,e,n){const a=Math.max(...t.map(m=>m.values.length),1),s=Math.max(1,...t.flatMap(m=>m.values)),o=go-re.left-re.right,r=It-re.top-re.bottom,i=o/a,h=i*.7/t.length,l=m=>re.top+r-m/s*r,c=t.map((m,p)=>m.values.map((y,g)=>{const b=re.left+g*i+i*.15+p*h;return`<rect class="${m.className}" x="${b.toFixed(1)}" y="${l(y).toFixed(1)}" width="${h.toFixed(1)}" height="${(re.top+r-l(y)).toFixed(1)}"><title>${m.name}: ${Math.round(y*10)/10}</title></rect>`}).join("")).join(""),d=(n??[]).map((m,p)=>`<text x="${re.left+p*i+i/2}" y="${It-re.bottom+14}" text-anchor="middle">${m}</text>`).join(""),u=t.map((m,p)=>`<rect class="${m.className}" x="${re.left+p*90}" y="${It-re.bottom+20}" width="10" height="3"/><text x="${re.left+p*90+14}" y="${It-re.bottom+24}">${m.name}</text>`).join(""),f=$i(s,e,n?0:a,Ts(s));return`<svg viewBox="0 0 ${go} ${It}" role="img" aria-label="${e.y} by ${e.x}">${f}${c}${d}${u}</svg>`}const wo={sizeAt(t){return t<=500?t:t<=750?500+(t-500)*2:t<1e3?1e3+(t-750)*35:1e4},positionOf(t){return t<=500?t:t<=1e3?500+(t-500)/2:t<1e4?750+(t-1e3)/35:1e3}};function gn(t,e){const n=e.flat(),a=Math.min(...n),s=Math.max(...n),o=w("div",{class:"week"},w("span"),...oe.dayNames.map(r=>w("span",{class:"head"},r)));return e.forEach((r,i)=>{o.append(w("span",{class:"hour"},oe.hourNames[i]??""));for(const h of r){const l=s>a?(h-a)/(s-a):0;o.append(w("span",{class:"cell",style:`--heat:${(.1+l*.9).toFixed(2)}`},String(Math.round(h))))}}),w("div",{},w("h4",{},t),o)}function sd(t){const e={focus:25,fatigue:15,featureSize:300,weeks:8},n={"🍽️ Lunch":{focus:-100,fatigue:-100},"🏃 Sprint plan":{focus:-100,fatigue:50},"😴 Boring":{focus:-50,fatigue:-25}},a={};for(let C=0;C<oe.days;C+=1)a[`${C}-3`]="🍽️ Lunch";let s="🏃 Sprint plan",o=null;const r=w("div",{class:"figures"}),i=w("div",{class:"chart"}),h=w("div",{class:"maps"}),l=w("div",{class:"week"}),c=w("select"),d=w("input",{type:"number",min:-100,max:100}),u=w("input",{type:"number",min:-100,max:100}),f=w("input",{type:"text",placeholder:"New meeting name",size:16}),m=(C,M,L,$,j=P=>P,N=P=>P)=>{const P=w("output",{},String(e[C])),B=w("input",{type:"range",min:L,max:$,value:N(e[C]),oninput:()=>{e[C]=j(Number(B.value)),P.textContent=String(e[C]),H()}});return w("label",{},`${M}: `,P,B)},p=w("div",{class:"dials"},m("focus","Focus an hour",0,100),m("fatigue","Fatigue an hour",0,100),m("featureSize","Feature size",0,1e3,wo.sizeAt,wo.positionOf),m("weeks","Weeks",1,16));function y(){c.replaceChildren(...Object.keys(n).map(M=>w("option",{value:M,selected:M===s},M)));const C=n[s];d.value=String(C?.focus??0),u.value=String(C?.fatigue??0)}c.addEventListener("change",()=>{s=c.value,y()});const g=()=>{n[s]={focus:Number(d.value)||0,fatigue:Number(u.value)||0},H()};d.addEventListener("change",g),u.addEventListener("change",g);const b=()=>{const C=f.value.trim();!C||n[C]||(n[C]={focus:0,fatigue:0},s=C,f.value="",y())},v=w("div",{class:"row"},w("span",{},"Paint: "),c,w("span",{},"focus "),d,w("span",{},"fatigue "),u,f,w("button",{type:"button",onclick:b},"Add"));let T=null;const S=C=>{if(T==="add"&&!a[C])a[C]=s;else if(T==="remove"&&a[C])delete a[C];else return;H()};function A(){l.replaceChildren(w("span"),...oe.dayNames.map(C=>w("span",{class:"head"},C))),oe.hourNames.forEach((C,M)=>{l.append(w("span",{class:"hour"},C));for(let L=0;L<oe.days;L+=1){const $=`${L}-${M}`,j=a[$];l.append(w("span",{class:j?"slot meeting":"slot",title:j??"free",onpointerdown:N=>{N.preventDefault(),T=a[$]?"remove":"add",S($)},onpointerenter:()=>{T&&S($)}},j?j.slice(0,2):""))}})}window.addEventListener("pointerup",()=>{T=null});const k=w("div",{class:"row"}),I=()=>{o={summary:fo(mo({...e,calendar:a,meetingTypes:n}),e),weeks:e.weeks},H()},O=()=>{o=null,H()};function H(){A();const C=mo({...e,calendar:a,meetingTypes:n}),M=fo(C,e),L=e.weeks*oe.days*oe.hoursADay;r.replaceChildren(w("div",{class:"clean"},w("strong",{},M.totalFeatures.toFixed(1)),"features finished"),w("div",{},w("strong",{},M.averageFeaturesPerWeek.toFixed(2)),"features a week"),w("div",{},w("strong",{},Math.round(M.totalProductivity/L).toString()),"productivity an hour"),w("div",{},w("strong",{},String(L)),"hours simulated")),k.replaceChildren(o?w("span",{},`Baseline: ${o.summary.averageFeaturesPerWeek.toFixed(2)} features a week over ${o.weeks} weeks; now ${M.averageFeaturesPerWeek.toFixed(2)}. `):w("span",{},"Keep this run to compare against: "),w("button",{type:"button",onclick:I},o?"Save again":"Save as baseline")),o&&k.append(w("button",{type:"button",onclick:O},"Clear")),i.innerHTML=Ti([{name:"Productivity",className:"clean",values:M.days.map($=>$.productivity/e.weeks)},{name:"Features ×100",className:"debt",values:M.days.map($=>$.features/e.weeks*100)}],{x:"",y:"A day, on average"},oe.dayNames),i.prepend(w("h4",{},"The shape of a week")),h.replaceChildren(gn("Focus",M.hours.focus),gn("Fatigue",M.hours.fatigue),gn("Productivity",M.hours.productivity),gn("Features finished",M.hours.features))}y(),t.append(p,v,w("div",{class:"charts"},l,i),r,k,h),H()}const od={name:"developer-meetings",apps:{"developer-meetings":sd}},Et={exams:[.01,.01,.02,.01,.05,.2,.05,.1,.2,.3,.5,.4,.3,.2,.1,.05,.1,.3,.8,1,.4],labs:[.01,.02,.03,.04,.06,.09,.12,.17,.23,.32,.44,.48,.58,.78,.87,.89,.78,.75,.62,.45,.2]},ua={x:{frames:1,pace:1},normal:{frames:2,pace:1},normal1:{frames:2,pace:1},normal2:{frames:2,pace:1},est:{frames:7,pace:5},zz:{frames:2,pace:5},bt:{frames:6,pace:1},http:{frames:8,pace:2},pract:{frames:5,pace:1},no:{frames:4,pace:3},bar0:{frames:6,pace:1},amig:{frames:4,pace:3},suplica:{frames:2,pace:3}};class Si{static everyImage=Object.entries(ua).flatMap(([e,{frames:n}])=>Array.from({length:n},(a,s)=>`${e}${s}`));series="x";frame=0;wait=0;after=null;shaking=-1;get image(){return`${this.series}${this.frame}`}play(e){if(this.shaking>=0){this.after=e;return}e!==this.series&&(this.wait=0),this.show(e)}flash(e,n){this.shaking<0&&(this.after=this.series),this.shaking=n,this.show(e)}stop(){this.shaking=-1,this.after=null,this.series="x",this.frame=0}beat(){if(this.shaking===0&&this.after&&this.show(this.after),this.shaking>=0&&(this.shaking-=1),this.wait>0&&(this.wait-=1),this.wait>0)return;const{frames:e,pace:n}=ua[this.series];this.frame=(this.frame+1)%e,this.wait=n}show(e){this.series=e,this.frame%=ua[e].frames}}const he=3,We=16,rd=25,je=20,yo=22,ma=200,fa=100,pa=100,bo=30,vo=-10,id=.05,hd=.3,ko=10/he,xo={superior:40,tecnica:25},ld={step:0,hour:0,day:0,term:1,doing:"idle",boredom:0,stress:0,labHabit:10,studyHabit:10,chatHabit:10,barHabit:10,friends:10,sleep:0,terminal:0,exams:Array(10).fill(0),labs:Array(10).fill(0),enrolled:4,passed:0,left:9,selection:!0,alfas:Array(6).fill(1),asks:null,suggested:0,ended:null,said:[]},cd=`Sorry, but you no longer belong to this faculty. :(



Normal.`,dd=`Hey, what are you playing at????
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
attention, doesn't it?)`,ud=`Don't you know that stress is really bad
for your health? Your Fibergochi has had to
leave the faculty, be more careful next time!
See if you can take its mind off things a little,
make new and interesting friends... or not so much...`;class es{constructor(e,n={}){this.random=e;const a={...ld,...n};this.s={...a,exams:[...a.exams],labs:[...a.labs],alfas:[...a.alfas],said:[...a.said]},this.s.ended===null&&this.show(this.s.doing)}random;s;sprite=new Si;beats=0;get state(){return{...this.s,exams:[...this.s.exams],labs:[...this.s.labs],alfas:[...this.s.alfas],said:[...this.s.said]}}get picture(){return this.sprite.image}get clock(){const e=this.s.step+this.s.hour*he,n=e*30%60;return`${this.s.day+1}, ${Math.floor(e/(he*We)*24)}:${n<10?"0":""}${n}h (${this.s.term})`}get examsPending(){return this.studyLeft>0}get labsPending(){return this.labLeft>0}get studyLeft(){return this.taken(this.s.exams).reduce((e,n)=>e+Math.max(n,0),0)}get labLeft(){return this.taken(this.s.labs).reduce((e,n)=>e+Math.max(n,0),0)}get hasTerminal(){return this.s.terminal>0}get lampsLit(){return this.s.day<je||this.beats%3===1}get enrolment(){return{most:Math.min(10,this.s.left),suggested:this.s.suggested}}get alive(){return this.s.ended===null}get waiting(){return this.s.said.length>0||this.s.asks!==null}step(){!this.alive||this.waiting||(this.keepHabits(),this.studyOrWork(),this.holdTerminal(),this.browseOn(),this.getBored(),this.calmDown(),this.alive&&(this.searchTerminal(),this.followHabits(),this.stayAtBar(),this.s.step+=1,this.s.step>=he&&(this.s.step=0,this.nextHour())))}animate(){!this.alive||this.waiting||(this.beats+=1,this.sprite.beat())}studyOrSleep(){this.alive&&(this.s.day<=je?this.set(this.random()<.5?"studying":"asleep"):this.sprite.flash("no",24))}browse(){this.alive&&(this.s.terminal?this.set("browsing"):this.sprite.flash("no",14))}goToBar(){this.alive&&this.set("bar")}makeFriends(){this.alive&&this.set("friends")}lookForTerminal(){this.alive&&(this.s.terminal<=0?this.set("looking"):this.sprite.flash("no",10))}beg(){if(!this.alive)return;const{exams:e,labs:n}=this.s,a=r=>e[r]+n[r],s=this.taken(e).map((r,i)=>i).filter(r=>a(r)>0);if(this.s.day<je||s.length===0)return this.sprite.flash("no",10);const o=s.reduce((r,i)=>a(i)<a(r)?i:r);this.sprite.flash("suplica",20),this.random()<hd&&(e[o]-=this.random()*ko),this.s.stress+=ko*this.random()}alfa(){if(!this.alive)return;const{term:e,left:n,selection:a,alfas:s,enrolled:o,exams:r,labs:i,day:h,passed:l}=this.s;let c=`Score: this is term ${e} you have been at the FIB.

`;if(a)c+=`You are doing the Selection Phase.
You have ${n} credits left to finish it.

`;else{c+=`You are in the middle of the degree, and have ${n} credits left to finish.

`;const d=s.filter(f=>f<1).length,u=s.filter(f=>f<=.5).length;d>0?(c+=`Of your last six alfa parameters at most, you have:
 - ${d} notable.
`,u>0&&(c+=` - of these, ${u} dangerous.
`),c+=`
`,s.forEach((f,m)=>{f<1&&(c+=`The alfa of ${s.length-m} terms ago:	${Math.round(f*100)/100}.
`)}),c+=`
`):c+=`You have an impeccable record. (swot)

`}if(h<=yo){const d=[0,0,0,0,0];for(let f=0;f<o;f+=1){const m=r[f]+i[f];d[m<=0?0:m<=2*he?1:m<=5*he?2:m<=8*he?3:4]+=1}const u=["subjects going well","that will go well with a little effort","subjects you should get down to","subjects you find hard","subjects you had better pray for"];d.forEach((f,m)=>{f>0&&(c+=`You have ${f} ${u[m]}.
`)}),c+=`You are enrolled in ${o} subjects in all.`}else c+=`Of ${o}, ${l} are passed.`;this.s.said.push(c)}dismiss(){this.s.said.shift()}enrol(e){return this.s.asks!=="enrol"||!Number.isInteger(e)||e<1||e>this.enrolment.most?!1:(this.s.enrolled=e,this.s.asks=null,!0)}choose(e){this.s.asks==="degree"&&(this.s.left=xo[e],this.askEnrolment())}keepHabits(){const{doing:e}=this.s;e==="lab"?this.s.labHabit+=1:e==="studying"?this.s.studyHabit+=1:e==="browsing"?this.s.chatHabit+=1:e==="friends"?this.s.friends+=1:e==="bar"&&(this.s.barHabit+=1,this.s.friends+=.4),this.s.friends=Math.min(this.s.friends,pa)}studyOrWork(){if(this.s.doing==="lab"){if(!this.labsPending)return this.set("idle");const e=this.easiest(this.s.labs);100-this.s.exams[e]>this.random()*100&&(this.s.labs[e]-=1)}else if(this.s.doing==="studying"){if(!this.examsPending)return this.set("idle");this.s.exams[this.easiest(this.s.exams)]-=1}}easiest(e){const{exams:n,labs:a}=this.s;let s=this.taken(e).findIndex(r=>r>0),o=n[s]+a[s]+s;for(let r=s+1;r<this.s.enrolled;r+=1){const i=n[r]+a[r];o>i&&e[r]>0&&(s=r,o=i+r)}return s}holdTerminal(){if(this.s.day>je||this.s.terminal<=0){this.s.terminal=0;return}this.s.doing==="idle"&&this.labsPending&&this.set("lab"),this.s.doing==="lab"?this.s.terminal=Math.round(this.s.terminal+this.random()):(this.s.doing!=="browsing"||this.random()<=Et.labs[this.s.day])&&(this.s.terminal-=1),this.s.terminal=Math.max(this.s.terminal,0)}browseOn(){this.s.doing==="browsing"&&(this.s.boredom+=Math.round(.5*this.random()),this.s.terminal<=0&&this.set("idle"))}getBored(){const{doing:e}=this.s;if(e==="idle"?(this.s.boredom+=1,this.s.boredom%10===0&&this.set("idle")):e==="studying"?this.s.boredom+=.1:e==="lab"?this.s.boredom+=this.random()/2:e==="asleep"?this.s.boredom-=1:e==="bar"&&(this.s.boredom-=this.random()),this.s.boredom>ma)return this.end("bad",dd);this.s.boredom=Math.max(this.s.boredom,-ma/2)}calmDown(){this.s.doing==="bar"&&(this.s.stress-=1),this.s.stress=Math.max(this.s.stress,0),this.s.stress>fa&&this.end("bad",ud)}searchTerminal(){const{doing:e,day:n}=this.s;if(e==="looking"&&n<=je&&this.s.terminal<=0){this.s.stress+=1;const a=(.5+Et.exams[n])*(1-Et.labs[n]),s=this.random();if(s<=a){const o=(s<=a/2?4:2)*(he+1);this.s.terminal=Math.round(o*this.random()),this.set("idle")}}else e==="looking"&&this.set("idle");n>je&&(this.s.terminal=0)}followHabits(){const{doing:e,hour:n}=this.s,a=this.s.labHabit/this.s.chatHabit/2,s=this.s.chatHabit/this.s.labHabit/2,o=this.s.studyHabit/this.s.barHabit/2,r=this.labsPending,i=h=>this.random()<h;if(this.s.terminal>0)if(e==="lab")a<=.5?i(.5-a)&&this.set("browsing"):r||this.set(this.random()>(.5-s)*2?"browsing":"idle");else if(e==="browsing")if(r){const[h,l]=this.s.terminal<he?[2,1]:[1,2];(s<=.5?i((.5-s)*h):this.random()>(.5-a)*l)&&this.set("lab")}else s<.5&&this.random()*.4>s&&this.set("idle");else(e==="idle"||e==="studying")&&(this.s.friends>pa/2&&i(.5-o)&&this.set("bar"),s<=.5&&i(.5-s)&&this.set("browsing"),a<=.5&&i(.5-a)&&r&&this.set("lab"));else if(e==="studying"&&o<=.5){const h=n<We/4?he:n>3*We/4?he/2:1;this.random()*h<.5-o&&this.set("bar")}}stayAtBar(){this.s.doing==="bar"&&this.s.friends/pa<this.random()/2&&this.set("idle")}nextHour(){if(this.getSleepy(),this.s.doing==="lab"&&(this.s.boredom+=Math.round(4*this.random())),this.classInTheRoom(),this.s.hour<We-1){this.s.hour+=1;return}this.s.hour=0,this.nextDay()}getSleepy(){const e=this.s.hour<We*3/4;this.s.doing!=="asleep"?(e?this.s.sleep+=1:this.s.doing==="idle"&&this.s.sleep>5?this.set("asleep"):this.s.sleep+=2+(this.s.terminal>0?1:0),this.s.sleep>(this.s.terminal>0?bo*1.25:bo)&&this.set("asleep")):e&&this.s.sleep<vo/4?this.set("idle"):(this.s.sleep-=2,this.s.sleep<vo&&this.set("idle"))}classInTheRoom(){const{hour:e}=this.s;e>=We/3&&e<=2*We/3&&this.random()<id&&(this.s.terminal=0)}nextDay(){const{day:e}=this.s;if(this.fadeHabits(),e<je?this.bringWork():e===yo&&this.mark(),e<rd-1){this.s.day+=1;return}this.s.day=0,this.nextTerm()}fadeHabits(){const e=n=>Math.max(1,Math.round(n*.9));this.s.labHabit=e(this.s.labHabit),this.s.studyHabit=e(this.s.studyHabit),this.s.barHabit=e(this.s.barHabit),this.s.chatHabit=e(this.s.chatHabit),this.s.friends=e(this.s.friends)}bringWork(){const e=this.s.day+5;if(this.s.day===0)for(let n=e;n>=0;n-=1)this.bringWorkFor(n);else e<je&&this.bringWorkFor(e)}bringWorkFor(e){for(let n=0;n<this.s.enrolled;n+=1){const a=he*((n+1)/2)+1;this.random()<=Et.labs[e]&&(this.s.labs[n]+=Math.round(a*this.random())),this.random()<=Et.exams[e]&&(this.s.exams[n]+=Math.round(a*this.random()))}}mark(){for(let e=0;e<this.s.enrolled;e+=1)this.s.exams[e]+this.s.labs[e]<he&&(this.s.passed+=1);this.s.alfas=[...this.s.alfas.slice(1),this.s.alfas[5]],this.s.exams.fill(0),this.s.labs.fill(0)}nextTerm(){const{enrolled:e,passed:n,selection:a,term:s}=this.s;if(this.s.alfas[5]=a?1:e?n/e:0,this.s.alfas.filter(o=>o<.5).length>3)return this.end("bad","You have 4 Alfa parameters below 0.5, bye, bye.");if(this.s.left-=n,this.s.passed=0,this.s.term+=1,this.s.left<=0){if(!a)return this.end("good",`Very Good!
You did it!!!!!!!
Your Fibergochi has finished the degree!!!!!
`,`ERROR 315: in module KERNEL386.EXE,
page 0137:0A285F43.
An UNFORESEEN situation has occurred,
we are very sorry, but we thought that
nobody would ever get here, where no
other man has gone before!.`);this.s.selection=!1,this.s.said.push("You have SUCCESSFULLY finished the SELECTION PHASE!!!!!"),this.s.asks="degree";return}if(a&&s===2&&this.s.left>8)return this.end("bad","BACARRA!!!!");if(a&&s>3){if(this.s.left>2)return this.end("bad","You have not got through the Selection Phase.");this.s.said.push(`You have not passed everything, but it is not serious.
YOU HAVE GOT THROUGH THE SELECTION PHASE, but... They will not throw you out, but you have to go to
the Técnica (or rather, they make you).`),this.s.left=xo.tecnica,this.s.selection=!1}this.askEnrolment()}askEnrolment(){this.s.asks="enrol",this.s.suggested=Math.min(Math.round(this.random()*4)+3,this.s.left)}taken(e){return e.slice(0,this.s.enrolled)}set(e){this.s.doing=e,this.show(e)}show(e){if(e==="lab")this.sprite.play("pract");else if(e==="studying")this.sprite.play("est");else if(e==="asleep")this.sprite.play("zz");else if(e==="looking")this.sprite.play("bt");else if(e==="friends")this.sprite.play("amig");else if(e==="browsing")this.sprite.play("http");else if(e==="bar")this.sprite.play("bar0");else{const n=this.s.boredom+this.s.stress,a=ma+fa;n<a/3?this.sprite.play("normal"):n<a/1.5?this.sprite.play("normal1"):this.sprite.play("normal2"),this.s.stress>fa*2/3&&this.sprite.play("normal2")}}end(e,...n){this.s.said.push(...n),e==="bad"&&this.s.said.push(cd),this.s.ended=e,this.s.asks=null,this.sprite.stop()}}const md=["step","hour","day","term","boredom","stress","labHabit","studyHabit","chatHabit","barHabit","friends","sleep","terminal","enrolled","passed","left","suggested"],fd=["idle","asleep","studying","browsing","looking","lab","bar","friends"],ga=(t,e)=>Array.isArray(t)&&t.length===e&&t.every(n=>Number.isFinite(n));function pd(t){let e;try{e=JSON.parse(t??"null")}catch{return null}return typeof e!="object"||e===null||Array.isArray(e)?null:md.every(a=>Number.isFinite(e[a]))&&fd.includes(e.doing)&&ga(e.exams,10)&&ga(e.labs,10)&&ga(e.alfas,6)&&typeof e.selection=="boolean"&&[null,"enrol","degree"].includes(e.asks)&&[null,"good","bad"].includes(e.ended)&&Array.isArray(e.said)&&e.said.every(a=>typeof a=="string")?e:null}const gd={x:"A cross: there is no Fibergochi.",normal:"The Fibergochi, standing about.",normal1:"The Fibergochi, standing about, getting bored.",normal2:"The Fibergochi, bored stiff.",est:"The Fibergochi at a desk, studying.",zz:"The Fibergochi, asleep.",bt:"A room full of terminals, all taken, and the Fibergochi looking for a free one.",http:"A terminal, and the Fibergochi browsing: http.",pract:"The Fibergochi at a terminal, doing a lab.",no:"The Fibergochi, shaking its head.",bar0:"The Fibergochi at the bar with its friends, drinks on the table.",amig:"The Fibergochi with a group of friends.",suplica:"The Fibergochi on the floor, begging."},wd=[[["study","estudio","Study/Sleep","to study or to sleep."]],[["http","http","http","to have a good time at a terminal (if you have one)."],["alfa","alfa","alfa","see the score."],["bar","bar","Bar","go to the bar, have a drink or play mus."]],"screen",[["friends","amigos","Friends","to make new friends."],["terminal","bt","Find terminal","look for a terminal to do labs, or not."],["beg","suplica","Beg","to try to get more passes."]]],yd={slow:"slow",normal:"normal",fast:"fast"};function $o(t,[e,n,a,s]){if(t<=0)return e;if(t<3)return`${n}, under an hour`;const o=Math.round(t/3);return`${t<15?a:s}, about ${o} ${o===1?"hour":"hours"}`}const Me=(t,e,{title:n="",disabled:a=!1}={})=>`<button type="button" data-do="${t}"${n?` title="${x(n)}"`:""}${a?" disabled":""}>${e}</button>`;function Mi(t,{running:e,confirmingNew:n,pace:a,picked:s=null}){const o=!t.alive||t.waiting||n,r=m=>m&&t.lampsLit?"on":"off",i=[["exam",r(t.examsPending),$o(t.studyLeft,["nothing to study","a little to study","something to study","a lot to study"])],["lab",r(t.labsPending),$o(t.labLeft,["no lab to do","a little lab work","some lab work","a lot of lab work"])],["terminal",t.hasTerminal?"on":"off",t.hasTerminal?"a terminal":t.labsPending?"no terminal, and labs need one":"no terminal"]],h=i.map(([m,p,y])=>`<li><button type="button" class="lamp ${p}" data-do="lamp-${m}" data-lamp="${m}" title="${m}: ${y}">${m}</button></li>`).join(""),l=i.map(([m,p,y])=>`<li class="${p}${m===s?" picked":""}" data-lamp="${m}"><b>${m}</b> ${y}</li>`).join(""),c=t.picture,d=gd[c.replace(/\d$/,"")]??"",u=`<div class="screen"><ul class="lamps" data-show="lamps">${h}</ul><img data-show="picture" src="/fibergochi/${c}.gif" alt="${d}" width="200" height="160"></div>`;return`<div class="fibergochi"><div class="egg"><p class="by"><span>by</span> Night</p>${wd.map(m=>m==="screen"?u:`<div class="keys">${m.map(([p,y,g,b])=>{const[v,T]=y==="alfa"?[15,11]:[22,21];return Me(p,`<img src="/fibergochi/keys/${y}.gif" alt="${g}" width="${v*2}" height="${T*2}">`,{title:`${g}: ${b}`,disabled:o})}).join("")}</div>`).join("")}</div><div class="panel"><p class="time"><output data-show="clock">${t.clock}</output> ${Me("pause",e?"pause":"go on")} ${Me("speed",`speed: ${yd[a]}`,{title:"Change the speed of time."})} ${Me("new","new")}</p><ul class="legend" data-show="legend">${l}</ul>${bd(t,n)}</div></div>`}function bd(t,e){const{said:n,asks:a}=t.state,s=(o,...r)=>`<div class="dialog" role="alertdialog"><p>${x(o).replaceAll(`
`,"<br>")}</p><p>${r.join(" ")}</p></div>`;if(e)return s("Are you sure you want a new Fibergochi?",Me("new-yes","OK"),Me("new-no","Cancel"));if(n.length>0)return s(n[0],Me("ok","OK"));if(a==="degree")return s("Do you want to do the Superior?",Me("superior","OK"),Me("tecnica","Cancel"));if(a==="enrol"){const{most:o,suggested:r}=t.enrolment;return`<form class="dialog" data-do="enrol"><label>How many credits do you want to enrol in? [1..${o}] <input type="number" name="credits" min="1" max="${o}" value="${r}"></label> <button type="submit">OK</button></form>`}return""}const To="fibergochi:1999-03-02",wa={slow:1e3,normal:400,fast:10},vd={slow:"normal",normal:"fast",fast:"slow"},kd=100,xd=10;function $d(t){let e=new es(Math.random,f()??{}),n=!0,a=!1,s=null,o="slow",r=0;const i=Jn(t),h=document.createElement("div"),l=w("div",{hidden:!0},...Si.everyImage.map(k=>w("img",{src:`/fibergochi/${k}.gif`,alt:"",width:50,height:40}))),c=()=>Mi(e,{running:n,confirmingNew:a,pace:o,picked:s});function d(){const k=document.activeElement instanceof HTMLElement&&h.contains(document.activeElement)?document.activeElement.dataset.do:void 0;h.innerHTML=c(),k&&h.querySelector(`[data-do="${k}"]`)?.focus()}function u(){const k=document.createElement("div");k.innerHTML=c();for(const I of h.querySelectorAll("[data-show]")){const O=k.querySelector(`[data-show="${I.dataset.show}"]`);O&&(I instanceof HTMLImageElement?I.getAttribute("src")!==O.getAttribute("src")&&(I.src=O.getAttribute("src")??"",I.alt=O.getAttribute("alt")??""):I.innerHTML!==O.innerHTML&&(I.innerHTML=O.innerHTML))}}function f(){try{return pd(localStorage.getItem(To))}catch{return null}}function m(){try{localStorage.setItem(To,JSON.stringify(e.state))}catch{}}const p=()=>n&&i.onScreen()&&e.alive&&!e.waiting;let y=setTimeout(g,wa[o]);function g(){if(y=setTimeout(g,wa[o]),!!p()){if(e.step(),r+=1,e.waiting||!e.alive){m(),d();return}r%xd===0&&m(),u()}}const b=setInterval(()=>{p()&&(e.animate(),u())},kd),v={study:()=>e.studyOrSleep(),http:()=>e.browse(),alfa:()=>e.alfa(),bar:()=>e.goToBar(),friends:()=>e.makeFriends(),terminal:()=>e.lookForTerminal(),beg:()=>e.beg()},T={pause:()=>n=!n,speed:()=>{o=vd[o],clearTimeout(y),y=setTimeout(g,wa[o])},new:()=>a=!0,"new-no":()=>a=!1,"new-yes":()=>{e=new es(Math.random),a=!1,n=!0},ok:()=>e.dismiss(),superior:()=>e.choose("superior"),tecnica:()=>e.choose("tecnica")};function S(k){const I=k.target.closest("button[data-do]")?.dataset.do??"";I.startsWith("lamp-")?(s=I.slice(5),u()):v[I]?(v[I](),e.waiting?d():u()):T[I]&&(T[I](),m(),d())}function A(k){k.preventDefault();const I=k.target.querySelector("input[name=credits]");I&&e.enrol(Number(I.value))&&(m(),d())}return t.addEventListener("click",S),t.addEventListener("submit",A),window.addEventListener("pagehide",m),t.replaceChildren(h,l),d(),()=>{clearTimeout(y),clearInterval(b),i.stop(),m(),t.removeEventListener("click",S),t.removeEventListener("submit",A),window.removeEventListener("pagehide",m)}}const Td=()=>Mi(new es(Math.random),{running:!0,confirmingNew:!1,pace:"slow"}),Sd={name:"fibergochi",apps:{fibergochi:$d},stills:{fibergochi:Td}},$e=t=>[...t.replace(/\s/g,"")].map(e=>e==="#"?1:0),wt={A:$e(".###. #...# ##### #...# #...#"),B:$e("####. #...# ####. #...# ####."),C:$e(".#### #.... #.... #.... .####"),D:$e("####. #...# #...# #...# ####."),E:$e("##### #.... ####. #.... #####"),H:$e("#...# #...# ##### #...# #...#"),O:$e(".###. #...# #...# #...# .###."),T:$e("##### ..#.. ..#.. ..#.. ..#.."),X:$e("#...# .#.#. ..#.. .#.#. #...#")};function tn(t){let e=t>>>0;return()=>{e=e+1831565813>>>0;let n=Math.imul(e^e>>>15,1|e);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}const Md=t=>1/(1+Math.exp(-t));class Ad{weights;constructor(e,n){const a=tn(n);this.weights=e.slice(1).map((s,o)=>Array.from({length:s},()=>Array.from({length:e[o]+1},()=>a()-.5)))}forward(e){const n=[[...e]];for(const a of this.weights){const s=[...n[n.length-1],1];n.push(a.map(o=>Md(o.reduce((r,i,h)=>r+i*s[h],0))))}return n}answer(e){return this.forward(e).pop()}learn(e,n,a){const s=this.forward(e),o=s[s.length-1];let r=o.map((h,l)=>(h-n[l])*h*(1-h));for(let h=this.weights.length-1;h>=0;h-=1){const l=[...s[h],1],c=this.weights[h],d=s[h].map((u,f)=>{let m=0;for(let p=0;p<c.length;p+=1)m+=c[p][f]*r[p];return m*u*(1-u)});for(let u=0;u<c.length;u+=1)for(let f=0;f<l.length;f+=1)c[u][f]-=a*r[u]*l[f];r=d}let i=0;for(let h=0;h<o.length;h+=1)i+=(o[h]-n[h])**2;return i/2}}const Id=10,So=.5;class Ai{constructor(e,n){this.shapes=e,this.network=new Ad([25,Id,e.length],n),this.noise=tn(n+1)}shapes;network;noise;rounds=0;error=0;train(e){for(let n=0;n<e;n+=1){let a=0;this.shapes.forEach(({pixels:s},o)=>{const r=this.shapes.map((h,l)=>l===o?1:0),i=Math.floor(this.noise()*s.length);a+=this.network.learn(s,r,So),a+=this.network.learn(s.map((h,l)=>l===i?1-h:h),r,So)}),this.error=a,this.rounds+=1}}read(e){const n=this.network.answer(e);return this.shapes.map(({name:a},s)=>({letter:a,score:n[s]}))}}const Ed=[{name:"A",pixels:wt.A},{name:"B",pixels:wt.B}];function ts(t=Ed){const e=new Ai(t,1);return e.train(200),e}const jd=3;function Ii(t,e,n){const a=t.trim();return a===""?"Give it a name first.":[...a].length>jd?"A name of three characters at most.":n.includes(a)?`“${a}” is already a letter it knows.`:e.some(Boolean)?null:"There is no ink on the grid to remember."}const Cd=t=>Array.isArray(t)&&t.length===25&&t.every(e=>e===0||e===1);function Od(t,e=[]){let n;try{n=JSON.parse(t??"[]")}catch{return[]}if(!Array.isArray(n))return[];const a=[];for(const s of n){const{name:o,pixels:r}=s??{};typeof o!="string"||!Cd(r)||Ii(o,r,[...e,...a.map(i=>i.name)])||a.push({name:o.trim(),pixels:r})}return a}function Ei(t,e){const n=e.map((i,h)=>`<button type="button" class="cell" data-at="${h}" aria-pressed="${i?"true":"false"}" aria-label="cell ${h+1}"></button>`).join(""),a=t.read(e),s=a.reduce((i,h)=>h.score>i.score?h:i),o=a.map(({letter:i,score:h})=>`<tr${i===s.letter?' class="best"':""}><th scope="row">${x(i)}</th><td class="sure"><span class="bar" style="--p:${h.toFixed(3)}"></span>${Math.round(h*100)}%</td></tr>`).join(""),r=t.rounds===0?"It has not been taught anything yet: every answer is a guess.":`It reads <b>${x(s.letter)}</b>, after ${t.rounds} rounds of lessons.`;return`<div class="letters"><div class="grid" role="group" aria-label="the drawing, five cells by five">${n}</div><div class="reading"><p>${r}</p><table class="answers"><tbody>${o}</tbody></table></div></div>`}const Mo="first-network:own",Ao=Object.entries(wt).map(([t,e])=>({name:t,pixels:e}));function Ld(t){let e=p();const n=new Set(["A","B",...e.map(({name:k})=>k)]),a=()=>[...Ao,...e];let s=ts(f()),o=[...wt.A];const r=w("div",{onclick:k=>{const I=k.target.closest("[data-at]")?.dataset.at;I!==void 0&&(o[Number(I)]=1-o[Number(I)],d())}}),i=w("div",{class:"row"}),h=w("div",{class:"row taught"}),l=w("input",{type:"text",maxlength:3,size:4,"aria-label":"a name for the drawing"}),c=w("p",{class:"error",hidden:!0});function d(){r.innerHTML=Ei(s,o)}function u(k){o=k,d()}function f(){return a().filter(k=>n.has(k.name))}function m(){s=ts(f()),d()}function p(){try{return Od(localStorage.getItem(Mo),Object.keys(wt))}catch{return[]}}function y(){try{localStorage.setItem(Mo,JSON.stringify(e))}catch{}}function g(){const k=Ii(l.value,o,a().map(O=>O.name));if(c.textContent=k??"",c.hidden=k===null,k)return;const I={name:l.value.trim(),pixels:[...o]};e=[...e,I],n.add(I.name),l.value="",y(),T(),m()}function b(k){e=e.filter(I=>I.name!==k),n.delete(k);for(const I of Ao)n.size<2&&n.add(I.name);y(),T(),m()}const v=(k,I)=>w("button",{type:"button",onclick:I},k);function T(){i.replaceChildren("Draw ",...a().map(k=>v(k.name,()=>u([...k.pixels]))),v("one cell wrong",()=>{const k=Math.floor(Math.random()*o.length);u(o.map((I,O)=>O===k?1-I:I))}),v("clear",()=>u(o.map(()=>0)))),h.replaceChildren("Taught: ",...a().map(k=>{const I=w("input",{type:"checkbox",value:k.name,checked:n.has(k.name),onchange:()=>{I.checked?n.add(k.name):n.size>2?n.delete(k.name):I.checked=!0,m()}}),O=e.includes(k)&&w("button",{type:"button",class:"forget","aria-label":`forget ${k.name}`,onclick:()=>b(k.name)},"×");return w("label",{},I,` ${k.name}`,O)}))}const S=w("div",{class:"row"},v("teach 100 more rounds",()=>{s.train(100),d()}),v("forget everything",()=>{s=new Ai(s.shapes,1),d()})),A=w("div",{class:"row own"},"Your own: draw it, name it ",l,v("remember this drawing",()=>g()),c);T(),t.replaceChildren(i,r,h,S,A),d()}const Nd=()=>Ei(ts(),wt.A),Pd={name:"first-network",apps:{letters:Ld},stills:{letters:Nd}},Rd=1.5,Fd=.02,Bd=.25;class Dd{constructor(e,n,a,s){this.credit=a,this.random=s,this.remaining=[...e],this.buyers=n.map(o=>({bidder:o,credit:a,won:[],error:null}))}credit;random;buyers;remaining;sold=[];turns=[];get over(){return this.remaining.length===0}get next(){return this.remaining[0]}get market(){return{lots:this.remaining,credits:Object.fromEntries(this.buyers.map(e=>[e.bidder.name,e.credit])),sales:this.sold}}demands(){const e=this.next;return Object.fromEntries(this.buyers.map(n=>[n.bidder.name,e?this.demandOf(n,e):null]))}sell(){const e=this.remaining.shift();if(!e)throw new Error("the floor is empty");const n=this.buyers.map(o=>this.demandOf(o,e)),a=Object.fromEntries(this.buyers.map((o,r)=>[o.bidder.name,n[r]===null?null:e.value/(1+n[r])])),s=this.buyers.filter(o=>(a[o.bidder.name]??0)>o.credit).map(o=>o.bidder.name);for(let o=e.value*Rd;o>=e.value*Bd;o-=e.value*Fd){const r=(e.value-o)/o,i=this.buyers.filter((l,c)=>l.credit>=o&&r>=(n[c]??1/0));if(i.length===0)continue;const h=i[Math.min(i.length-1,Math.floor(this.random()*i.length))];return h.credit-=o,h.won.push(e),this.record({lot:e,buyer:h.bidder.name,price:o},a,s)}return this.record({lot:e,buyer:null,price:null},a,s)}standings(){return this.buyers.map(({bidder:e,credit:n,won:a,error:s})=>{const o=a.reduce((i,h)=>i+h.value,0),r=this.credit-n;return{name:e.name,credit0:this.credit,credit:n,spent:r,lots:a.length,value:o,profit:o-r,error:s}})}record(e,n,a){return this.sold.push(e),this.turns.push({sale:e,bids:n,short:a}),e}demandOf(e,n){try{const a=e.bidder.demands(n,this.market,e.bidder.name);if(typeof a!="number"||Number.isNaN(a))throw new Error(`demanded ${String(a)}, not a margin`);return e.error=null,a}catch(a){return e.error=a instanceof Error?a.message:String(a),null}}}const Io=[["sardines",30],["anchovies",40],["squid",90],["hake",120],["sole",180],["prawns",250],["monkfish",300],["tuna",400]];function Hd(t,e){return Array.from({length:t},(n,a)=>{const[s,o]=Io[Math.floor(e()*Io.length)];return{id:a+1,kind:s,value:Math.round(o*(.7+.6*e()))}})}const Wd=60;function ji(t,e,n){const a=tn(t),s=Hd(Wd,a),o=s.reduce((r,i)=>r+i.value,0);return new Dd(s,e,n*o/Math.max(1,e.length),a)}function Eo(t,e="You"){const n=new Function("lot","market","me",t);return{name:e,demands:n}}const jo=`// Return the margin you demand: (value - price) / price.
// You are told the lots still to sell, everyone's credit, and every sale so far.
// This is Vicente. Change the 0.9 first.
const fish = market.lots.reduce((sum, lot) => sum + lot.value, 0);
const money = 0.9 * Object.values(market.credits).reduce((sum, c) => sum + c, 0);
if (money <= 0) return 0.001;
return Math.max(0.001, (fish - money) / money);
`,qd=12,be=t=>Math.round(t).toString(),Co=t=>t===null?"—":t===1/0?"∞":`${Math.round(t*100)}%`;function Ci(t){const e=t.next,n=t.demands(),a=[...t.standings()].sort((c,d)=>d.profit-c.profit),s=Math.max(1,...a.map(c=>Math.abs(c.profit))),o=e?`<p class="lot">Next on the floor: <b>a box of ${x(e.kind)}</b>, which resells for ${be(e.value)}. The price starts at ${be(e.value*1.5)} and falls.</p>`:'<p class="lot">The floor is empty.</p>',i=`<table class="board"><thead><tr><th>buyer</th><th>asks</th><th>holds</th><th>spent</th><th>worth</th><th>credit</th><th>profit</th></tr></thead><tbody>${a.map(({name:c,lots:d,spent:u,value:f,profit:m,credit:p,error:y})=>{const g=y?`<td class="asks error" colspan="5">${x(y)}</td>`:`<td class="asks">${Co(n[c]??null)}</td>`;return`<tr${m<0?' class="loss"':""}><th scope="row">${x(c)}</th>${g}`+(y?"":`<td>${d} lot${d===1?"":"s"}</td><td>${be(u)}</td><td>${be(f)}</td><td>${be(p)}</td>`)+`<td class="profit"><span class="bar" style="--p:${(Math.abs(m)/s).toFixed(3)}"></span>${be(m)}</td></tr>`}).join("")}</tbody></table>`,h=t.turns,l=h.length?`<ol class="sales" reversed start="${h.length}">${[...h].reverse().slice(0,qd).map(({sale:{lot:c,buyer:d,price:u},bids:f,short:m})=>{const p=u===null||d===null?"<i>withdrawn</i>":`sold at <b>${be(u)}</b>, a margin of ${Co((c.value-u)/u)}`,y=Object.entries(f).map(([g,b])=>{if(b===null)return`${x(g)} —`;const v=g===d?`<b>${x(g)}</b>`:x(g);return m.includes(g)?`<s title="more than it had">${v} at ${be(b)}</s>`:`${v} at ${be(b)}`}).join(", ");return`<li><span class="went">${x(c.kind)}, ${be(c.value)}: ${p}.</span> <span class="ready">Ready to shout: ${y}.</span></li>`}).join("")}</ol>`:"";return`<div class="fish-market">${o}${i}${l}</div>`}function Oo(t,e){return{name:t,demands:()=>e}}const Lo=.001;function Ms(t,e){const n=t.lots.reduce((s,o)=>s+o.value,0),a=e*Object.values(t.credits).reduce((s,o)=>s+o,0);return a<=0?Lo:Math.max(Lo,(n-a)/a)}const _d=.9,zd=3,wn=10;function Gd(t="Planner"){return{name:t,demands(e,n,a){const s=Ms(n,_d),o=s*(zd-1)/wn,r=f=>s+f*o,i=f=>Math.max(0,Math.min(wn-1,Math.floor((f-s)/o))),h=new Array(wn).fill(0);for(const f of n.sales){if(f.price===null)continue;const m=i((f.lot.value-f.price)/f.price);h[m]=h[m]+f.lot.value}const l=h.reduce((f,m)=>f+m,0);if(l===0)return s;const c=n.lots.reduce((f,m)=>f+m.value,0),d=n.credits[a]??0;let u=0;for(let f=wn-1;f>=0;f-=1)if(u+=c*h[f]/l/(1+r(f)),u>=d)return r(f);return s}}}function Yd(t=.9,e="Vicente"){return{name:e,demands:(n,a)=>Ms(a,t)}}const Ud=.98,Jd=1.05,Kd=.95,Vd=t=>(t.lot.value-t.price)/t.price;function No(t,e){const n=e.filter(s=>s.buyer===t),a=n.reduce((s,o)=>s+o.price,0);return a>0?(n.reduce((s,o)=>s+o.lot.value,0)-a)/a:0}function Xd(t="Wanda"){return{name:t,demands(e,n,a){const s=Ms(n,Ud),o=No(a,n.sales);let r=1;for(const i of n.sales)i.buyer!==null&&(i.buyer===a?r*=Jd:No(i.buyer,n.sales)>=o&&Vd(i)>=s&&(r*=Kd));return s*r}}}function Oi(t=.9){return[Oo("Patient",1),Oo("Hasty",.05),Yd(t),Xd(),Gd()]}const Zd=250,Qd=1,Po="fish-market:own",yn="fish-market:seated";function eu(t){let e=Qd,n=null,a,s=null;const o=w("div"),r=w("p",{class:"error",hidden:!0}),i=w("output",{},"90%"),h=w("input",{type:"range",min:.5,max:1,step:.02,value:.9,oninput:()=>m()}),l=w("output",{},"50%"),c=w("input",{type:"range",min:.3,max:1.2,step:.05,value:.5,oninput:()=>m()}),d=w("textarea",{class:"agent",spellcheck:!1,rows:9,oninput:()=>b()}),u=w("button",{type:"button",onclick:()=>s?g():y()},"run");function f(){o.innerHTML=Ci(a)}function m(){g(),i.textContent=`${Math.round(Number(h.value)*100)}%`,l.textContent=`${Math.round(Number(c.value)*100)}%`,a=ji(e,[...Oi(Number(h.value)),...n?[n]:[]],Number(c.value)),f()}function p(){return a.over?!1:(a.sell(),f(),!0)}function y(){u.textContent="stop",s=setInterval(()=>{p()||g()},Zd)}function g(){s&&clearInterval(s),s=null,u.textContent="run"}function b(){try{localStorage.setItem(Po,d.value)}catch{}}function v(){try{n=Eo(d.value),r.hidden=!0,localStorage.setItem(yn,"yes")}catch(O){n=null,r.textContent=O instanceof Error?O.message:String(O),r.hidden=!1,localStorage.removeItem(yn)}m()}function T(){n=null,localStorage.removeItem(yn),m()}const S=w("div",{class:"dials"},w("label",{},"Vicente believes the others will spend: ",i,h),w("label",{},"Money in the room, as a share of the fish: ",l,c)),A=w("div",{class:"row"},w("button",{type:"button",onclick:()=>{p()}},"next lot"),u,w("button",{type:"button",onclick:()=>{for(g();p(););}},"whole morning"),w("button",{type:"button",onclick:()=>{e=Math.floor(Math.random()*1e9),m()}},"new morning")),k=w("div",{class:"row"},w("button",{type:"button",onclick:()=>v()},"seat it"),w("button",{type:"button",onclick:()=>T()},"stand it down")),I=w("details",{class:"own"},w("summary",{},"Seat your own agent"),d,k,r);try{d.value=localStorage.getItem(Po)??jo,localStorage.getItem(yn)&&(n=Eo(d.value))}catch{d.value=jo}return t.replaceChildren(S,A,o,I),m(),g}const tu=()=>Ci(ji(1,Oi(),.5)),nu={name:"fish-market",apps:{"fish-market":eu},stills:{"fish-market":tu}};function au(t,e){const n=[];for(let a=t.length-1;a>=0;a-=1)n.push(t.slice(0,a));for(let a=1;a<=e.length;a+=1)n.push(e.slice(0,a));return n}const su=3800,ou=6500,ru=26,iu=46,hu=420;function lu(t){return[...t.childNodes].map(e=>e.nodeName==="BR"?`
`:e.textContent??"").join("")}function cu(t){const e=document.querySelector("main h1");if(!e||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return()=>{};const n={text:lu(e)};e.setAttribute("aria-label",n.text),e.classList.add("typing");const a=document.createElement("span");a.className="caret idle",a.setAttribute("aria-hidden","true");const s=(c,d)=>{const u=c.split(`
`).flatMap((f,m)=>m===0?[f]:[document.createElement("br"),f]);if(d){const f=document.createElement("a");f.href=d,f.append(...u,a),e.replaceChildren(f)}else e.replaceChildren(...u,a)};s(n.text);let o=n,r=[],i=performance.now()+su,h=0;const l=c=>{if(h=requestAnimationFrame(l),c<i)return;if(r.length===0){const u=t(o,n);r=au(o.text,u.text),o=u,a.classList.remove("idle")}const d=r.shift()??o.text;s(d,r.length===0?o.href:void 0),r.length===0?(a.classList.add("idle"),i=c+ou):d===""?i=c+hu:i=c+(d.length<(r[0]?.length??0)?iu:ru)};return h=requestAnimationFrame(l),()=>{cancelAnimationFrame(h),s(n.text),a.remove(),e.classList.remove("typing"),e.removeAttribute("aria-label")}}function du(t,e){const n=[...t];for(let a=n.length-1;a>0;a-=1){const s=Math.min(a,Math.floor(e()*(a+1)));[n[a],n[s]]=[n[s],n[a]]}return n}function uu(t,e){let n=[];return a=>(n.length===0&&(n=du(t,e),n.length>1&&n[0]===a&&n.push(n.shift())),n.shift()??a)}const mu=[{text:`More than
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
as this page opened.`,href:"/projects/worlds/"}];let ya=null;const fu={name:"headline",arrive:t=>{if(ya?.(),ya=null,t.route!=="/")return;let e=null;ya=cu((n,a)=>(e??=uu([a,...mu],Math.random),e(n)))}};function Ro(t,e="You"){const n=new Function("fish","weeks","bots","me","rounds",t);return{name:e,orders:n}}const Fo=`// Return your orders for the round: one number a week, 0 to rest.
// You know the fish at the start, the weeks, who is on the lagoon (bots),
// your name (me), and every round before (rounds), but not what the others
// will do this time.
// This one rests, lets the lagoon grow, and takes one share the last week.
let grown = fish;
for (let week = 1; week < weeks; week++) grown += Math.floor(grown / 2);
const orders = new Array(weeks).fill(0);
orders[weeks - 1] = Math.floor(grown / bots.length);
return orders;
`;function Li(t){const e=t.rounds[t.rounds.length-1],n=t.scores(),a=Math.max(1,...Object.values(n)),s=[...t.names].sort((u,f)=>n[f]-n[u]).map(u=>{const f=t.errors[u];return`<tr><th scope="row">${x(u)}</th>`+(f?`<td class="error" colspan="2">${x(f)}</td>`:`<td>${e?.totals[u]??0}</td><td class="profit"><span class="bar" style="--p:${(n[u]/a).toFixed(3)}"></span>${n[u]}</td>`)+"</tr>"}).join(""),o=t.rounds.length,r=`<table class="board"><caption>${o===0?"The season has not started":`After ${o} round${o===1?"":"s"}`}</caption><thead><tr><th>bot</th><th>last round</th><th>season</th></tr></thead><tbody>${s}</tbody></table>`;if(!e)return`<div class="lagoon"><p class="lot">The lagoon has <b>${t.fish} fish</b>, and ${t.weeks} weeks ahead. Nobody has been out yet.</p>${r}</div>`;const i=e.weeks.map((u,f)=>`<th>${f+1}</th>`).join(""),h=Math.max(1,...e.weeks.map(u=>u.fish)),l=e.weeks.map(u=>`<td><span class="fish" style="--p:${(u.fish/h).toFixed(3)}"></span>${u.fish}</td>`).join(""),c=t.names.map(u=>{const f=e.weeks.map((m,p)=>{const y=e.orders[u]?.[p]??0,g=m.caught[u]??0;return`<td${y>g?' class="short"':""} title="asked for ${y}">${g}</td>`}).join("");return`<tr><th scope="row">${x(u)}</th>${f}<td class="total">${e.totals[u]}</td></tr>`}).join("");return`<div class="lagoon">${`<table class="weeks"><caption>Round ${o}, week by week: what each bot caught, and what was left in the lagoon</caption><thead><tr><th>week</th>${i}<th>total</th></tr></thead><tbody>${c}<tr class="water"><th scope="row">in the lagoon</th>${l}<td></td></tr></tbody></table>`}${r}</div>`}function Ni(t,e,n){const a=[];let s=t;for(let o=0;o<e;o+=1){const r=Math.max(0,Math.min(s,Math.floor(n(s,o))));a.push(r),s-=r,s+=Math.floor(s/2)}return a}const bn={rest:{name:"Rest",orders:(t,e)=>new Array(e).fill(0)},one:{name:"One",orders:(t,e)=>new Array(e).fill(1)},power:{name:"Power",orders:(t,e)=>Array.from({length:e},(n,a)=>a*a)},percent:t=>({name:`${Math.round(t*100)}%`,orders:(e,n)=>Ni(e,n,a=>a*t)})},Bo=(t,e)=>Math.ceil(t/e);function Do(t="Tit for tat"){const e=new Set;return{name:t,orders(n,a,s,o,r){for(const h of r)for(const l of Object.keys(h.orders))l!==o&&(h.orders[l]?.[0]??0)>=Bo(h.start,s.length)&&e.add(l);if(s.some(h=>h!==o&&e.has(h)))return Ni(n,a,h=>Bo(h,s.length));let i=n;for(let h=1;h<a;h+=1)i+=Math.floor(i/2);return[...new Array(a-1).fill(0),Math.floor(i/s.length)]}}}function Pi(){return[{fisher:bn.one,seated:!0},{fisher:bn.power,seated:!0},{fisher:bn.percent(.1),seated:!0},{fisher:bn.percent(.4),seated:!1},{fisher:Do("Tit for tat"),seated:!0},{fisher:Do("Tat for tit"),seated:!0}]}function pu(t,e,n){const a=Object.keys(n),s=[],o=Object.fromEntries(a.map(i=>[i,0]));let r=t;for(let i=0;i<e;i+=1){const h=Object.fromEntries(a.map(c=>[c,0])),l=a.map(c=>({name:c,order:Math.max(0,Math.floor(n[c]?.[i]??0))})).filter(({order:c})=>c>0);for(const c of[...new Set(l.map(({order:d})=>d))].sort((d,u)=>d-u)){const d=l.filter(f=>f.order===c),u=Math.min(Math.floor(r/d.length),c);for(const{name:f}of d)h[f]=u,o[f]=o[f]+u;r-=u*d.length}r+=Math.floor(r/2),s.push({fish:r,caught:h})}return{start:t,orders:n,weeks:s,totals:o}}class Ri{constructor(e,n,a){this.fish=e,this.weeks=n,this.fishers=a}fish;weeks;fishers;rounds=[];errors={};get names(){return this.fishers.map(e=>e.name)}play(){const e=Object.fromEntries(this.fishers.map(a=>[a.name,this.ordersOf(a)])),n=pu(this.fish,this.weeks,e);return this.rounds.push(n),n}scores(){return Object.fromEntries(this.names.map(e=>[e,this.rounds.reduce((n,a)=>n+(a.totals[e]??0),0)]))}ordersOf(e){try{const n=e.orders(this.fish,this.weeks,this.names,e.name,this.rounds);if(!Array.isArray(n)||n.some(a=>typeof a!="number"||Number.isNaN(a)))throw new Error("orders must be an array of numbers, one a week");return delete this.errors[e.name],Array.from({length:this.weeks},(a,s)=>n[s]??0)}catch(n){return this.errors[e.name]=n instanceof Error?n.message:String(n),new Array(this.weeks).fill(0)}}}const Ho="lagoon:own",vn="lagoon:seated";function gu(t){let e=null,n;const a=w("div"),s=w("p",{class:"error",hidden:!0}),o=w("output",{},"100"),r=w("input",{type:"range",min:5,max:200,step:1,value:100,oninput:()=>u()}),i=w("output",{},"10"),h=w("input",{type:"range",min:4,max:14,step:1,value:10,oninput:()=>u()}),l=w("textarea",{class:"agent",spellcheck:!1,rows:11,oninput:()=>m()}),c=Pi().map(({fisher:A,seated:k})=>({fisher:A,box:w("input",{type:"checkbox",checked:k,onchange:()=>u()})}));function d(){a.innerHTML=Li(n)}function u(){o.textContent=r.value,i.textContent=h.value;const A=c.filter(({box:k})=>k.checked).map(({fisher:k})=>k);n=new Ri(Number(r.value),Number(h.value),[...A,...e?[e]:[]]),d()}function f(A){for(let k=0;k<A;k+=1)n.play();d()}function m(){try{localStorage.setItem(Ho,l.value)}catch{}}function p(){try{e=Ro(l.value),s.hidden=!0,localStorage.setItem(vn,"yes")}catch(A){e=null,s.textContent=A instanceof Error?A.message:String(A),s.hidden=!1,localStorage.removeItem(vn)}u()}function y(){e=null,localStorage.removeItem(vn),u()}const g=w("div",{class:"dials"},w("label",{},"Fish in the lagoon at the start: ",o,r),w("label",{},"Weeks in a round: ",i,h)),b=w("div",{class:"row bench"},"On the lagoon: ",...c.map(({fisher:A,box:k})=>w("label",{},k,` ${A.name}`))),v=w("div",{class:"row"},w("button",{type:"button",onclick:()=>f(1)},"play a round"),w("button",{type:"button",onclick:()=>f(5)},"play five"),w("button",{type:"button",onclick:()=>u()},"new season")),T=w("div",{class:"row"},w("button",{type:"button",onclick:()=>p()},"seat it"),w("button",{type:"button",onclick:()=>y()},"stand it down")),S=w("details",{class:"own"},w("summary",{},"Seat your own bot"),l,T,s);try{l.value=localStorage.getItem(Ho)??Fo,localStorage.getItem(vn)&&(e=Ro(l.value))}catch{l.value=Fo}t.replaceChildren(g,b,v,a,S),u()}const wu=()=>Li(new Ri(100,10,Pi().filter(({seated:t})=>t).map(({fisher:t})=>t))),yu={name:"lagoon",apps:{lagoon:gu},stills:{lagoon:wu}},me={N:1,S:2,E:4,W:8};function Fi(t){const{width:e,height:n,cells:a,links:s}=t,o=e*n-1,r=new Map([[0,-1]]),i=[0];for(let l=0;l<i.length;l+=1){const c=i[l];if(c===o)break;const d=c%e,u=Math.floor(c/e),f=a[c],m=[];f&me.E&&d+1<e&&m.push(c+1),f&me.W&&d>0&&m.push(c-1),f&me.N&&u+1<n&&m.push(c+e),f&me.S&&u>0&&m.push(c-e);const p=s.get(c);p!==void 0&&s.get(p)===c&&m.push(p);for(const y of m)r.has(y)||(r.set(y,c),i.push(y))}if(!r.has(o))return null;const h=[];for(let l=o;l!==-1;l=r.get(l))h.unshift({x:l%e,y:Math.floor(l/e)});return h}function Bi(t){const e=Fi(t);if(!e)return"There is no way out: the only one ran through a sphere that leads nowhere.";const n=e.slice(1).filter((s,o)=>Math.abs(s.x-e[o].x)+Math.abs(s.y-e[o].y)>1).length,a=n===0?"touches no sphere":`jumps through ${n===1?"one sphere":`${n} spheres`}`;return`The way out is ${e.length} rooms long, and ${a}.`}const Wo=0x5deece66dn,bu=0xbn,qo=(1n<<48n)-1n;class vu{seed;constructor(e){this.seed=(BigInt(e)^Wo)&qo}nextInt(e){if((e&-e)===e)return Number(BigInt(e)*BigInt(this.next(31))>>31n);for(;;){const n=this.next(31),a=n%e;if((n-a+(e-1)|0)>=0)return a}}next(e){return this.seed=this.seed*Wo+bu&qo,Number(BigInt.asIntN(32,this.seed>>BigInt(48-e)))}}const _o=16,ku=[["N","E","W","S"],["W","S","E","N"],["S","E","W","N"]],xu={N:[0,1,"S"],S:[0,-1,"N"],E:[1,0,"W"],W:[-1,0,"E"]};function Di(t,e,n,{spheres:a=!0}={}){const s=new vu(n),o=new Array(t*e).fill(0),r=new Map,i=[],h=(d,u)=>d+u*t;function l(d,u){i.push({x:d,y:u}),a&&s.nextInt(10)<1&&c(d,u);for(const f of ku[s.nextInt(3)]){const[m,p,y]=xu[f],g=d+m,b=u+p;g<0||b<0||g>=t||b>=e||o[h(g,b)]!==0||(o[h(d,u)]|=me[f],o[h(g,b)]=me[y],l(g,b),i.push({x:d,y:u}))}}function c(d,u){const f=s.nextInt(t),m=s.nextInt(e);o[h(f,m)]===0&&(o[h(d,u)]|=_o,o[h(f,m)]=_o,r.set(h(d,u),h(f,m)),r.set(h(f,m),h(d,u)),l(f,m),i.push({x:d,y:u}))}return l(0,0),o[h(0,0)]|=me.S,o[h(t-1,e-1)]|=me.N,{width:t,height:e,cells:o,links:r,path:i}}const te=10,kn=4;function Hi(t,{trail:e,way:n}={}){const{width:a,height:s,cells:o,links:r}=t,i=g=>kn+g*te,h=g=>kn+(s-1-g)*te,l=({x:g,y:b})=>[i(g)+te/2,h(b)+te/2],c=[];for(let g=0;g<s;g+=1)for(let b=0;b<a;b+=1){const v=o[b+g*a];v&me.S||c.push(`M${i(b)} ${h(g)+te}h${te}`),v&me.W||c.push(`M${i(b)} ${h(g)}v${te}`),g===s-1&&!(v&me.N)&&c.push(`M${i(b)} ${h(g)}h${te}`),b===a-1&&!(v&me.E)&&c.push(`M${i(b)+te} ${h(g)}v${te}`)}const d=new Map;let u=0;const f=[...r].map(([g,b])=>{const v=r.get(b)===g;if(!v)u+=1;else if(!d.has(g)){const A=String.fromCharCode(97+d.size/2%26);d.set(g,A).set(b,A)}const[T,S]=l({x:g%a,y:Math.floor(g/a)});return`<circle class="sphere${v?"":" dead"}" cx="${T}" cy="${S}" r="${te*.3}"/><text class="letter" x="${T}" y="${S}">${v?d.get(g):"×"}</text>`}),m=g=>g.map((b,v)=>{const T=g[v-1];return`${T&&Math.abs(b.x-T.x)+Math.abs(b.y-T.y)===1?"L":"M"}${l(b).join(" ")}`}).join(""),p=[];if(n&&p.push(`<path class="way" d="${m(n)}"/>`),e!==void 0&&e>0){const g=t.path.slice(0,e),[b,v]=l(g[g.length-1]);p.push(`<path class="trail" d="${m(g)}"/>`,`<circle class="walker" cx="${b}" cy="${v}" r="${te*.22}"/>`)}return`<svg class="maze" role="img" aria-label="${`A ${a} by ${s} maze with ${r.size} sphere${r.size===1?"":"s"}`+(u?`, ${u} leading nowhere`:"")+"."}" viewBox="0 0 ${a*te+2*kn} ${s*te+2*kn}">`+p.join("")+`<path class="walls" d="${c.join("")}"/>`+f.join("")+"</svg>"}const mt={size:7,seed:543},$u=100;function Tu(t){let e,n=0,a=!1,s=null;const o=w("div",{class:"figure"}),r=w("p",{class:"status"}),i=w("output",{},String(mt.size)),h=w("input",{type:"range",min:5,max:30,step:1,value:mt.size,oninput:()=>m()}),l=w("input",{type:"number",value:mt.seed,onchange:()=>m()}),c=w("input",{type:"checkbox",checked:!0,onchange:()=>m()}),d=w("button",{type:"button",onclick:()=>s?y():p()},"walk the camera"),u=w("button",{type:"button",onclick:()=>g()},"show the way out");function f(){o.innerHTML=Hi(e,{trail:n,way:a?Fi(e):null})}function m(){y(),n=0,i.textContent=h.value,e=Di(Number(h.value),Number(h.value),Number(l.value),{spheres:c.checked}),r.textContent=Bi(e),f()}function p(){n>=e.path.length&&(n=0),d.textContent="stop",s=setInterval(()=>{n+=1,f(),n>=e.path.length&&y()},$u)}function y(){s&&clearInterval(s),s=null,d.textContent="walk the camera"}function g(){a=!a,u.textContent=a?"hide the way out":"show the way out",f()}const b=w("button",{type:"button",onclick:()=>(l.value=String(Math.floor(Math.random()*1e6)),m())},"another"),v=w("div",{class:"dials"},w("label",{},"Rooms a side: ",i,h),w("label",{},"Seed: ",l,b),w("label",{},c," spheres, as on 20 May (unticked: 13 May)"));return t.replaceChildren(w("div",{class:"maze-app"},o,r,w("div",{class:"row"},d,u),v)),m(),y}const Su=()=>{const t=Di(mt.size,mt.size,mt.seed);return`<div class="maze-app"><div class="figure">${Hi(t)}</div><p class="status">${Bi(t)}</p></div>`},Mu={name:"maze",apps:{maze:Tu},stills:{maze:Su}};function Au(t,e){let n=Array.from({length:e.length+1},(a,s)=>s);for(let a=1;a<=t.length;a+=1){const s=[a];for(let o=1;o<=e.length;o+=1){const r=(n[o-1]??0)+(t[a-1]===e[o-1]?0:1);s[o]=Math.min(r,(n[o]??0)+1,(s[o-1]??0)+1)}n=s}return n[e.length]??0}function Iu(t,e){if(e.includes(t))return t;let n=null,a=1/0;for(const s of e){const o=Au(t,s);o<a&&([n,a]=[s,o])}return n}const Eu=/[\p{L}\p{M}\p{N}']+|[.,!?;:]/gu,ju=/\]\([^)]*\)|^---[\s\S]*?\n---|[#*_`>\[\]|]|::[a-z-]+/gm;function Gn(t){return t.normalize("NFKC").replace(ju," ").toLowerCase().match(Eu)??[]}const xn=" ";class ns{constructor(e,n){this.memory=n;const a=Gn(e),s=new Map;for(const o of a)s.set(o,(s.get(o)??0)+1);this.vocabulary=[...s.keys()],this.commonest=[...s].reduce((o,r)=>o&&o[1]>=r[1]?o:r,null)?.[0]??null;for(let o=1;o<a.length;o+=1)for(let r=1;r<=n&&r<=o;r+=1){const i=a.slice(o-r,o).join(xn),h=this.followers.get(i)??new Map;h.set(a[o]??"",(h.get(a[o]??"")??0)+1),this.followers.set(i,h)}}memory;vocabulary;commonest;followers=new Map;after(e){for(let n=Math.min(this.memory,e.length);n>=1;n-=1){const a=e.slice(-n),s=this.followers.get(a.join(xn));if(s)return{context:a,candidates:zo(s)}}return{context:[],candidates:[]}}transitions(){return[...this.followers].filter(([e])=>e.split(xn).length===this.memory).flatMap(([e,n])=>zo(n).map(a=>({context:e.split(xn),...a}))).sort((e,n)=>n.probability-e.probability||n.count-e.count)}}function zo(t){const e=[...t.values()].reduce((n,a)=>n+a,0);return[...t].map(([n,a])=>({word:n,count:a,probability:a/e})).sort((n,a)=>a.count-n.count)}function Cu(t,e){let n=e();for(const a of t)if(n-=a.probability,n<=0)return a.word;return t[t.length-1]?.word??null}function Go(t){return t.reduce((e,n)=>e===""||/^[.,!?;:]$/.test(n)?e+n:`${e} ${n}`,"")}function Wi(t,e){if(e<=0)return t.map((s,o)=>({...s,probability:o===0?1:0}));const n=t.map(s=>s.probability**(1/e)),a=n.reduce((s,o)=>s+o,0);return t.map((s,o)=>({...s,probability:(n[o]??0)/a}))}const ba=40,Yo=8,va=t=>`${Math.round(t*100)}%`;function qi(t,e,n){const{context:a,candidates:s}=t.after(e),o=s.slice(0,Yo),r=Wi(s,n).slice(0,Yo),i=s.reduce((p,{count:y})=>p+y,0),h=e.slice(0,e.length-a.length),l=`<p class="written">${x(Go(h))}${h.length&&a.length?" ":""}${a.length?`<mark>${x(Go(a))}</mark>`:""}<span class="caret"></span></p>`,c=o.length?`<ol class="offered">${o.map(({word:p,count:y,probability:g},b)=>{const v=r[b]?.probability??0;return`<li><button type="button" data-word="${x(p)}" title="seen ${y} of ${i} times: ${va(g)} as learnt"><span class="word">${x(p)}</span><span class="chance" style="--p:${v.toFixed(3)}"></span><span class="figure">${va(v)}</span></button></li>`}).join("")}</ol>`:`<p class="offered">It never saw anything follow “${x(e[e.length-1]??"")}”. This is where it stops.</p>`,d=p=>a.length===t.memory&&p.context.join(" ")===a.join(" "),u=t.transitions(),f=[...u.filter(d),...u.filter(p=>!d(p))].slice(0,ba).map(p=>`<tr${d(p)?' class="now"':""}><td>${x(p.context.join(" "))}</td><td>${x(p.word)}</td><td>${p.count}</td><td>${va(p.probability)}</td></tr>`).join(""),m=`<table class="learnt"><caption>What it learnt: ${u.length} transitions between ${t.vocabulary.length} words${u.length>ba?`, the first ${ba} shown`:""}</caption><thead><tr><th>after</th><th>comes</th><th>seen</th><th>chance</th></tr></thead><tbody>${f}</tbody></table>`;return`<div class="next-word">${l}<h4>What may come next</h4>${c}${m}</div>`}const Pn="The cat is happy. The dog is glad. The cat sleeps. The dog plays. The cat eats. The dog runs. The car is fast. The car goes far.",Ou=350;function Lu(t,{site:e}){const n={small:()=>Pn,site:()=>e.pages.map(k=>k.body).join(`

`),own:()=>c.value};let a=new ns(Pn,1),s=Gn("the"),o=null;const r=w("div"),i=(k,I)=>w("option",{value:k},I),h=w("select",{onchange:()=>g()},i("small","eight short sentences"),i("site","this website"),i("own","your own text")),l=w("select",{onchange:()=>g()},i(1,"one word back"),i(2,"two words back"),i(3,"three words back")),c=w("textarea",{rows:5,hidden:!0,placeholder:"Paste any text here. The longer, the better it pretends.",oninput:()=>g()}),d=w("output",{},"1"),u=w("input",{type:"range",min:0,max:2,step:.1,value:1,oninput:()=>p()}),f=w("input",{type:"text",value:"the",onchange:()=>y()}),m=w("button",{type:"button",onclick:()=>o?T():v()},"write");function p(){d.textContent=u.value,r.innerHTML=qi(a,s,Number(u.value))}function y(){T();const k=Gn(f.value).flatMap(I=>Iu(I,a.vocabulary)??[]);s=k.length?k:a.commonest?[a.commonest]:[],p()}function g(){c.hidden=h.value!=="own",a=new ns(n[h.value]?.()??Pn,Number(l.value)),y()}function b(){const k=Cu(Wi(a.after(s).candidates,Number(u.value)),Math.random);return k===null?!1:(s=[...s,k],p(),!0)}function v(){m.textContent="stop",o=setInterval(()=>{b()||T()},Ou)}function T(){o&&clearInterval(o),o=null,m.textContent="write"}r.addEventListener("click",k=>{const I=k.target?.closest("[data-word]")?.getAttribute("data-word");I&&(s=[...s,I],p())});const S=w("div",{class:"dials"},w("label",{},"It has read",h),w("label",{},"It looks",l),w("label",{},"Temperature: ",d,u),w("label",{},"Start from",f)),A=w("div",{class:"row"},w("button",{type:"button",onclick:()=>{b()}},"next word"),m,w("button",{type:"button",onclick:()=>y()},"start over"));return t.replaceChildren(S,c,A,r),p(),T}const Nu=()=>qi(new ns(Pn,1),Gn("the"),1),Pu={name:"next-word",apps:{"next-word":Lu},stills:{"next-word":Nu}},ka={"string-cache-map":"a WeakMap replacement for string keys, with a bounded cache behind it","async-barrier":"a helper that makes async/await tests say what they wait for","spy-middleware":"a Redux middleware for spying on actions in tests","grunt-frontmatter":"a Grunt task: many files with YAML front matter into one JSON","object-canonical-keys":"always the same array of keys for the same keys, so comparisons stay cheap","async-deferrer":"one function that returns a promise, or resolves it"},Uo=160,xa=28,Rn=t=>t.toLocaleString("en-US");function $a(t,e){const n=Math.max(1,...t.map(e)),a=Uo/t.length,s=t.map((o,r)=>{const i=e(o)/n*(xa-2);return`<rect x="${(r*a+1).toFixed(1)}" y="${(xa-i).toFixed(1)}" width="${(a-2).toFixed(1)}" height="${i.toFixed(1)}"><title>${o}: ${Rn(e(o))}</title></rect>`}).join("");return`<svg class="spark" viewBox="0 0 ${Uo} ${xa}" role="img" aria-label="Downloads a year, ${t[0]} to ${t[t.length-1]}">${s}</svg>`}function _i(t){const e=Object.keys(t.years).sort(),n=c=>d=>t.years[d]?.[c]??0,a=c=>e.reduce((d,u)=>d+c(u),0),s=Object.keys(ka).sort((c,d)=>a(n(d))-a(n(c))),o=[...new Set(e.flatMap(c=>Object.keys(t.years[c]??{})))].filter(c=>!(c in ka)),r=c=>o.reduce((d,u)=>d+n(u)(c),0),i=c=>Object.values(t.years[c]??{}).reduce((d,u)=>d+u,0),h=s.filter(c=>a(n(c))>0).map(c=>`<tr><th scope="row"><a href="https://www.npmjs.com/package/${c}"><code>${c}</code></a><span>${ka[c]}</span></th><td>${$a(e,n(c))}</td><td>${Rn(a(n(c)))}</td></tr>`).join(""),l=o.length?`<tr><th scope="row">the other ${o.length}<span>mostly AngularJS and Redux helpers written for one project each</span></th><td>${$a(e,r)}</td><td>${Rn(a(r))}</td></tr>`:"";return`<figure class="packages"><table class="packages"><thead><tr><th>package</th><th>${e[0]} to ${e[e.length-1]}, a bar a year</th><th>downloads</th></tr></thead><tbody>${h}${l}</tbody><tfoot><tr><th scope="row">all of them</th><td>${$a(e,i)}</td><td>${Rn(a(i))}</td></tr></tfoot></table></figure>`}function Ru(t){if(t.querySelector("figure"))return;const e=xs(t,"/data/npm/index.json");fetch("/data/npm/downloads.json").then(n=>n.json()).then(n=>{t.innerHTML=_i(n),t.append(e)}).catch(()=>{t.textContent="The download counts did not arrive. The rest of the page does not depend on them."})}const Ta=["string-cache-map","async-barrier","spy-middleware","grunt-frontmatter","object-canonical-keys","gherkin-genie","async-deferrer","egg-hatchery","angular-tags","class-strict","micro-egg-hatchery","node-dio","ducks-middleware","drpx-updateable","generator-drpx","grunt-ngtags","teal-redux-egg","ducks-reducer","drpx-storage-mocks","strict-classes","ngtags","redux-egg","esmoquin","drpx-storage","dio-provider","drpx-components","grunt-angular-tags","drpx-bind-angular","drpx-toggle","drpx-id","drpx-seo","drpx-otherwisehome","drpx-class-route","drpx-transcludeto"],Sa="downloads.json",Fu={name:"npm",directory:"public/data/npm",firstYear:2015,files:[Sa],about:{measures:"downloads a year of the npm packages published as drpicox",attribution:"npm, Inc. Download counts of the public registry.",dataset:"https://github.com/npm/registry/blob/main/docs/download-counts.md",packages:Ta},requestsFor(t){return[`https://api.npmjs.org/downloads/point/${t}-01-01:${t}-12-31/${Ta.join(",")}`]},withYear(t,e,n){const a=n[0],s=Object.entries(typeof a=="object"&&a!==null?a:{}).flatMap(([o,r])=>{const i=r?.downloads;return Ta.includes(o)&&typeof i=="number"&&i>0?[[o,i]]:[]});if(s.length===0)throw new Error("the registry did not answer with downloads");return{[Sa]:{years:{...t[Sa]?.years,[e]:Object.fromEntries(s)}}}}},Bu=t=>_i(JSON.parse(t("/data/npm/downloads.json")))+Kn(JSON.parse(t("/data/npm/index.json"))),Du={name:"packages",apps:{packages:Ru},stills:{packages:Bu},sources:[Fu]},Hu={name:"portfolio",flags:[{name:"portfolio",description:"the lists with pictures as cards, the width of a program",trial:.5}]},Wu=/^\s*\* (.*)$/,qu=/^#{1,6} /;function _u(t){let e="";const n=[],a={s:0,n:0},s=i=>e+=e===""?i.toLowerCase():i[0].toUpperCase()+i.slice(1).toLowerCase(),o=(i,h)=>{a[h]+=1;const l=/shouldBe/i.test(e)&&!n.some(c=>c.name==="expected");n.push({value:i,name:l?"expected":`${h}${a[h]}`})},r=t.matchAll(/([A-Za-z]+)|("[^"]+")|(\d+)/g);for(const[,i,h,l]of r)i?s(i):h?(o(h,"s"),s("S")):l&&(o(l,"n"),s("N"));return{name:e,args:n}}const zu=["there","is","are","has","have","need","needs"],jt=(t,e)=>new RegExp(`\\b${e}\\b`,"i").test(t);function Gu(t,e){if(t.length===0)return[{line:e,message:'does not have any executable instruction by tests. Post lines that run must begin with " * ".'}];if(!t.some(s=>/should/i.test(s.name)))return[{line:t[t.length-1].line,message:'does not have any executable instruction that contains "should": at least one line must test that the outcome is the expected.'}];for(const s of t){const o=zu.find(r=>jt(s.text,r));if(o&&!jt(s.text,"given")&&!jt(s.text,"should"))return[{line:s.line,message:`has an instruction with the word "${o}" but no "should" or "given". Add "given" if it sets up, or "should" if it checks a result.`}]}const n=t.find(s=>jt(s.text,"given")&&jt(s.text,"should"));if(n)return[{line:n.line,message:'has an instruction with the word "given" and "should" at the same time. Keep "given" for a setup, "should" for an assertion.'}];if(t.some(s=>s.name===""))return[{line:t.find(s=>s.name==="").line,message:"has an instruction with no words in it."}];const a=t[t.length-1];return/should/i.test(a.name)?[]:[{line:a.line,message:'the last instruction must contain "should": a post ends by checking what it set out to show.'}]}function Yu(t){const[e="",...n]=t.replace(/\.md$/,"").split("_");return`Post_${e.replace(/-/g,"")}_${n.map(a=>a[0].toUpperCase()+a.slice(1)).join("")}_Context`}function zi(t,e){const n=t.replace(/^---[\s\S]*?\n---\n/,f=>f.replace(/[^\n]/g,"")).split(`
`),a=n.find(f=>/^# /.test(f))?.slice(2).trim()??e,s=Yu(e),o=[],r=[];n.forEach((f,m)=>{const p=Wu.exec(f);if(p){const{name:y,args:g}=_u(p[1]??""),b=`${y}(${g.map(v=>v.value).join(", ")})`;o.push({line:m+1,text:f.trim(),name:y,args:g,call:b}),r.push(`  await context.${b};	// ${f.trim()}`)}else qu.test(f)&&r.push("",`  // ${f.trim()}`)});const i=Math.max(0,...r.map(f=>f.indexOf("	"))),h=r.map(f=>f.includes("	")?f.replace("	"," ".repeat(i-f.indexOf("	")+1)):f),l=["// !!! IMPORTANT !!!","// This test file is AUTOGENERATED by yarn create-tests","// DO NOT MODIFY manually.","",`test("${e}", async () => {`,`  const context = new ${s}();`,"  await context.beforeTest();",...h,"","  await context.afterTest();","});",""].join(`
`),c=new Set,d=o.filter(f=>!c.has(f.name)&&c.add(f.name)),u=[`export class ${s} {`,"  async beforeTest() {}","",...d.flatMap(f=>[`  async ${f.name}(${f.args.map(m=>m.name).join(", ")}) {`,"    // TODO","  }",""]),"  async afterTest() {}","}",""].join(`
`);return{title:a,className:s,steps:o,test:l,context:u,problems:Gu(o,n.length)}}const Gt=[{file:"2022-07-15_hello_blog.md",label:"Hello Blog — the first post of the course",markdown:`---
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
`}],Vn=t=>new Set(t.split(/\s+/).filter(Boolean)),Uu=Vn(`
  var let const function return if else for while do break continue new this
  true false null undefined class extends import export from default async await
  throw try catch finally typeof instanceof in of switch case delete void yield`),Ju=Vn(`
  auto break case char const continue default do double else enum extern float for goto if
  inline int long register restrict return short signed sizeof static struct switch typedef
  union unsigned void volatile while NULL true false`),Ku=Vn(`
  abstract assert boolean break byte case catch char class const continue default do double
  else enum extends final finally float for goto if implements import instanceof int interface
  long native new package private protected public return short static strictfp super switch
  synchronized this throw throws transient try var void volatile while true false null`),Vu=Vn(`
  AND AS CASE CLS CONST DECLARE DEFDBL DIM DO DOUBLE ELSE END EXIT FOR FUNCTION IF IS
  LOCATE LOOP NEXT NOT OR PRINT RANDOMIZE SCREEN SELECT SHARED STATIC STEP SUB THEN TO
  UNTIL WHILE OPTION BASE`);function U(t,e){return`<span class="hl-${t}">${x(e)}</span>`}function As(t,e,n){for(let a=e+1;a<t.length;a+=1)if(t[a]==="\\")a+=1;else if(t[a]===n)return a+1;return t.length}function Ma(t,e,n){let a="",s=0;for(;s<t.length;){const o=t.slice(s);let r;const i=t.lastIndexOf(`
`,s-1)+1,h=/^\s*$/.test(t.slice(i,s));if(o.startsWith("//")||n&&o[0]==="#"&&h){const l=t.indexOf(`
`,s),c=l<0?t.length:l;a+=U(o[0]==="#"?"a":"c",t.slice(s,c)),s=c}else if(o.startsWith("/*")){const l=t.indexOf("*/",s+2),c=l<0?t.length:l+2;a+=U("c",t.slice(s,c)),s=c}else if(o[0]==='"'||o[0]==="'"||o[0]==="`"){const l=As(t,s,o[0]??"");a+=U("s",t.slice(s,l)),s=l}else if(r=/^[A-Za-z_$][\w$]*/.exec(o)){const l=r[0];a+=e.has(l)?U("k",l):x(l),s+=l.length}else(r=/^\d+(?:\.\d+)?/.exec(o))?(a+=U("n",r[0]),s+=r[0].length):(a+=x(o[0]??""),s+=1)}return a}function Xu(t){let e="",n=0;for(;n<t.length;){const a=t.slice(n);let s;if(a.startsWith("%")){const o=t.indexOf(`
`,n),r=o<0?t.length:o;e+=U("c",t.slice(n,r)),n=r}else if(a.startsWith("/*")){const o=t.indexOf("*/",n+2),r=o<0?t.length:o+2;e+=U("c",t.slice(n,r)),n=r}else if(a[0]==="'"){const o=As(t,n,"'");e+=U("s",t.slice(n,o)),n=o}else if(a.startsWith("-->")||a.startsWith(":-")){const o=a.startsWith("-->")?"-->":":-";e+=U("k",o),n+=o.length}else(s=/^[A-Z_][\w]*/.exec(a))?(e+=U("a",s[0]),n+=s[0].length):(s=/^[a-z][\w]*/.exec(a))?(e+=x(s[0]),n+=s[0].length):(e+=x(a[0]??""),n+=1)}return e}function Zu(t){let e="",n=0;for(;n<t.length;){const a=t.slice(n);let s;if(a[0]==="'"||/^REM\b/i.test(a)){const o=t.indexOf(`
`,n),r=o<0?t.length:o;e+=U("c",t.slice(n,r)),n=r}else if(a[0]==='"'){const o=t.indexOf('"',n+1),r=o<0?t.length:o+1;e+=U("s",t.slice(n,r)),n=r}else(s=/^[A-Za-z_][\w]*[$!#%&]?/.exec(a))?(e+=Vu.has(s[0].toUpperCase())?U("k",s[0]):x(s[0]),n+=s[0].length):(s=/^\d+(?:\.\d+)?/.exec(a))?(e+=U("n",s[0]),n+=s[0].length):(e+=x(a[0]??""),n+=1)}return e}function Qu(t){let e="",n=0;for(;n<t.length;){const a=t.slice(n);if(a.startsWith("<!--")){const o=t.indexOf("-->",n+4),r=o<0?t.length:o+3;e+=U("c",t.slice(n,r)),n=r;continue}const s=/^<(\/?)([A-Za-z][\w-]*)/.exec(a);if(!s){const o=t.indexOf("<",n+1),r=o<0?t.length:o;e+=x(t.slice(n,r)),n=r;continue}for(e+=`&lt;${s[1]}${U("t",s[2]??"")}`,n+=s[0].length;n<t.length&&t[n]!==">";){const o=t.slice(n);let r;if(r=/^\s+/.exec(o))e+=r[0],n+=r[0].length;else if(r=/^[A-Za-z_:][\w:.-]*/.exec(o))e+=U("a",r[0]),n+=r[0].length;else if(o[0]==="="&&(o[1]==='"'||o[1]==="'")){const i=As(t,n+1,o[1]??"");e+=`=${U("s",t.slice(n+1,i))}`,n=i}else e+=x(o[0]??""),n+=1}t[n]===">"&&(e+="&gt;",n+=1)}return e}const em=/^(\s*)(Feature:|Background:|Scenario Outline:|Scenario:|Example:|Examples:|Rule:|Given|When|Then|And|But|\*)(?=\s|$)/;function tm(t){return t.split(`
`).map(e=>{const n=e.trimStart(),a=e.slice(0,e.length-n.length);if(n.startsWith("#"))return a+U("c",n);if(n.startsWith("@"))return a+U("a",n);const s=em.exec(e),o=s?a+U("k",s[2]??""):"",r=s?e.slice(s[0].length):e;return s?o+r.split(/("[^"]*"|\b\d+(?:\.\d+)?\b)/).map(i=>/^"/.test(i)?U("s",i):/^\d/.test(i)?U("n",i):x(i)).join(""):x(e)}).join(`
`)}function le(t,e){return e==="js"||e==="javascript"?Ma(t,Uu,!1):e==="c"?Ma(t,Ju,!0):e==="java"?Ma(t,Ku,!1):e==="prolog"?Xu(t):e==="html"?Qu(t):e==="basic"?Zu(t):e==="gherkin"||e==="feature"?tm(t):x(t)}function Gi(t,e){return`<div class="compiled">${t.problems.length?`<div class="refused"><strong>${x(e)}</strong> line ${t.problems[0].line}: ${x(t.problems[0].message)}<br>The tests are not written until the post is fixed.</div>`:""}<h4>${x(e.replace(/\.md$/,""))} → the test, never edited by hand</h4><pre><code>${le(t.test,"js")}</code></pre><h4>→ the context, written once and filled in by the coder</h4><pre><code>${le(t.context,"js")}</code></pre></div>`}function nm(t){const e=w("div"),n=w("textarea",{class:"post",spellcheck:!1,rows:28,oninput:()=>r()}),a=w("input",{type:"text",value:Gt[0].file,oninput:()=>r()}),s=w("select",{onchange:()=>o(Number(s.value))},...Gt.map((i,h)=>w("option",{value:h},i.label)));function o(i){const h=Gt[i]??Gt[0];n.value=h.markdown,a.value=h.file,r()}function r(){e.innerHTML=Gi(zi(n.value,a.value),a.value)}t.replaceChildren(w("div",{class:"row"},w("label",{},"Post ",s),w("label",{},"File ",a)),w("div",{class:"post-tests"},n,e)),o(0)}const am=()=>{const t=Gt[0];return`<div class="post-tests"><pre class="post">${t.markdown.replace(/&/g,"&amp;").replace(/</g,"&lt;")}</pre>${Gi(zi(t.markdown,t.file),t.file)}</div>`},sm={name:"post-tests",apps:{"post-tests":nm},stills:{"post-tests":am}},as="program-asked";function ss(t,e){t.dispatchEvent(new CustomEvent(as,{detail:e}))}function ft(t){return t.toLowerCase().replace(/\s+/g,"-")}const Aa=t=>typeof t=="string"?ft(t):String(Number(t.toPrecision(4)));function om(t,e){const n=t.parameters.flatMap(a=>{const s=e[a.name];return s===void 0||Aa(s)===Aa(a.initial)?[]:[`--${a.name} ${Aa(s)}`]});return[t.name,...n].join(" ")}function Yi(t){return Object.fromEntries(t.parameters.map(e=>[e.name,e.initial]))}function rm(t){return t.scale!=="log"?{min:t.min,max:t.max,step:t.step,positionOf:e=>e,valueAt:e=>e}:{min:Math.log10(t.min),max:Math.log10(t.max),step:t.step,positionOf:e=>Math.log10(e),valueAt:e=>10**e}}const os="program-ran";function im(t,e){const n=rm(t),a=t.show??String,s=w("output"),o=w("input",{type:"range",name:t.name,min:n.min,max:n.max,step:n.step});return o.addEventListener("input",()=>e(n.valueAt(Number(o.value)))),{label:w("label",{},`${t.label}: `,s,o),settle:r=>{o.value=String(n.positionOf(Number(r))),s.textContent=a(Number(r))}}}function hm(t,e){const n=w("select",{name:t.name},...t.choices.map(a=>w("option",{value:a},a)));return n.addEventListener("change",()=>e(n.value)),{label:w("label",{},`${t.label} `,n),settle:a=>{n.value=String(a)}}}function Ui(t){return e=>{let n=Yi(t);const a=e.dataset.dials?.split(" "),s=a!==void 0&&t.glance!==void 0,o=w("code"),r=w("div",{class:s?"program-figure glance":"program-figure"}),i=d=>u=>{n={...n,[d]:u},l()},h=t.parameters.filter(d=>!a||a.includes(d.name)).map(d=>({name:d.name,dial:"choices"in d?hm(d,i(d.name)):im(d,i(d.name))}));function l(){for(const{name:d,dial:u}of h)u.settle(n[d]??"");o.textContent=`$ ${om(t,n)}`,r.innerHTML=s?t.glance?.(n)??"":t.run(n).html,e.dispatchEvent(new CustomEvent(os,{detail:n}))}const c=d=>{n={...n,...d.detail},l()};return e.addEventListener(as,c),e.replaceChildren(w("div",{class:"dials"},...h.map(({dial:d})=>d.label)),w("p",{class:"program-line"},o),r),l(),()=>e.removeEventListener(as,c)}}const $n=149597870700,ot=94607e11,en=[{name:"the Moon",metres:3844e5,said:"384,400 km"},{name:"Mars",metres:.52*$n,said:"0.52 au"},{name:"Jupiter",metres:4.2*$n,said:"4.2 au"},{name:"Saturn",metres:8.5*$n,said:"8.5 au"},{name:"Pluto",metres:38.5*$n,said:"38.5 au"},{name:"Proxima Centauri",metres:4.24*ot,said:"4.24 light-years"},{name:"Sirius",metres:8.58*ot,said:"8.58 light-years"},{name:"Epsilon Eridani",metres:10.52*ot,said:"10.52 light-years"},{name:"Tau Ceti",metres:11.91*ot,said:"11.91 light-years"},{name:"the centre of the galaxy",metres:26e3*ot,said:"26,000 light-years",towards:{ra:17.76,dec:-29}},{name:"Andromeda",metres:25e5*ot,said:"2.5 million light-years",towards:{ra:.712,dec:41.27}}],Kt={dryMass:25e3,fuel:5e3,exhaust:.72},lm=299792458;function Is(t){if(t<.01)return`${Math.round(t*lm/1e3).toLocaleString("en-US")} km/s`;if(t<.99)return`${(t*100).toPrecision(2)}% of c`;const e=Math.min(12,Math.ceil(-Math.log10(1-t)));return`${(Math.floor(t*10**e)/10**(e-2)).toFixed(e-2)}% of c`}const cm=[[365.25*86400*1e6,"million years"],[365.25*86400,"years"],[86400,"days"],[3600,"hours"],[60,"minutes"],[1,"seconds"]];function Re(t){const[e,n]=cm.find(([o])=>t>=o)??[1,"seconds"],a=t/e;return`${a>=10?Math.round(a).toLocaleString("en-US"):String(Math.round(a*10)/10)} ${n}`}const dm=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:3});function Yn(t){return t>=1e6?`${dm.format(t)} t`:`${t>=100?Math.round(t).toLocaleString("en-US"):t.toPrecision(2)} t`}const fe=299792458,um=9.81;function Es(t,e){const n=e.acceleration*um,a=e.dryMass+e.fuel,s=e.exhaust*fe,o=fe/n*Math.acosh(1+n*t/(2*fe*fe)),r=a*(1-Math.exp(-2*n*o/s)),i=r>e.fuel,h=i?s/(2*n)*Math.log(a/e.dryMass):o,l=Math.tanh(n*h/fe),c=fe/n*Math.sinh(n*h/fe),d=fe*fe/n*(Math.cosh(n*h/fe)-1),u=Math.max(0,t-2*d),f=i?u/(l*fe):0,m=f*Math.sqrt(1-l*l);return{shipTime:2*h+m,homeTime:2*c+f,burnTime:h,coastTime:m,topSpeed:l,fuelBurnt:i?e.fuel:r,coasts:i}}const mm=299792458,fm=9.81,Ct=720,Tn=170,ie={top:12,right:10,bottom:24,left:40};function pm(t,e){const n=Ct-ie.left-ie.right,a=Tn-ie.top-ie.bottom,s=u=>ie.left+u/t.shipTime*n,o=u=>ie.top+a-u/Math.max(t.topSpeed,1e-12)*a,r=e.acceleration*fm,i=24,h=Array.from({length:i+1},(u,f)=>t.burnTime*f/i).map(u=>[u,Math.tanh(r*u/mm)]),c=[...h.map(([u,f])=>[u,f]),...h.reverse().map(([u,f])=>[t.shipTime-u,f])].map(([u,f])=>`${s(u).toFixed(1)},${o(f).toFixed(1)}`).join(" "),d=t.coasts?`<text x="${((s(t.burnTime)+s(t.shipTime-t.burnTime))/2).toFixed(1)}" y="${(o(t.topSpeed)+14).toFixed(1)}" text-anchor="middle">engine off, ${Re(t.coastTime)}</text>`:"";return`<svg class="trip" viewBox="0 0 ${Ct} ${Tn}" role="img" aria-label="Speed against the ship's clock"><line class="grid" x1="${ie.left}" x2="${Ct-ie.right}" y1="${o(0)}" y2="${o(0)}"/><line class="grid" x1="${ie.left}" x2="${Ct-ie.right}" y1="${o(t.topSpeed)}" y2="${o(t.topSpeed)}"/><text x="${ie.left}" y="${o(t.topSpeed)-3}">${Is(t.topSpeed)}</text><polyline class="line" points="${c}"/>${d}<text x="${ie.left}" y="${Tn-6}">departure</text><text x="${Ct-ie.right}" y="${Tn-6}" text-anchor="end">arrival, ${Re(t.shipTime)} on board</text></svg>`}function gm(t,e){const n=en.map(o=>({destination:o,trip:Es(o.metres,t)})),a=n.map(({destination:o,trip:r})=>{const i=[o.name===e?"chosen":"",r.coasts?"coasts":""].filter(Boolean).join(" "),h=r.coasts?`all ${Yn(t.fuel)}, then coasts`:Yn(r.fuelBurnt);return`<tr${i?` class="${i}"`:""} data-destination="${o.name}"><th scope="row">${o.name}</th><td>${o.said}</td><td>${Re(r.shipTime)}</td><td>${Re(r.homeTime)}</td><td>${Is(r.topSpeed)}</td><td>${h}</td></tr>`}).join(""),s=n.find(({destination:o})=>o.name===e)??n[0];return`<figure class="rocket"><table class="voyages"><thead><tr><th>to</th><th>distance</th><th>on board</th><th>at home</th><th>top speed</th><th>fuel burnt</th></tr></thead><tbody>${a}</tbody></table>`+(s?`<h4>To ${s.destination.name}: speed against the ship's clock</h4>${pm(s.trip,t)}`:"")+"</figure>"}function Ji(t){return{dryMass:Kt.dryMass,fuel:Number(t.fuel)*Kt.dryMass,exhaust:Number(t.exhaust)/100,acceleration:Number(t.acceleration)}}const Jo=365.25*86400,wm=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:2}),rs={name:"rocket",summary:"a relativistic rocket: how long a trip takes on board and at home, and what it burns",parameters:[{name:"acceleration",label:"Acceleration",description:"what the crew feels while the engine burns, in g",min:.05,max:3,step:.05,initial:.3,show:t=>`${t.toFixed(2)} g`},{name:"fuel",label:"Fuel",description:"fuel on board, as a multiple of the ship's own mass",min:.1,max:1e13,step:.05,initial:Kt.fuel/Kt.dryMass,scale:"log",show:t=>`${wm.format(t)} × the ship`},{name:"exhaust",label:"Exhaust speed",description:"the speed of what leaves the engine, in percent of the speed of light",min:1,max:100,step:1,initial:Kt.exhaust*100,show:t=>`${Math.round(t)}% of c`},{name:"to",label:"To",description:"where to fly",choices:en.map(t=>t.name),initial:"Proxima Centauri"}],run(t){const e=Ji(t),n=String(t.to),a=en.map(h=>({destination:h,trip:Es(h.metres,e)})),s=a.find(({destination:h})=>h.name===n)??a[0],{destination:o,trip:r}=s,i=r.coasts?`all ${Yn(e.fuel)} of fuel, then coasts`:`${Yn(r.fuelBurnt)} of fuel`;return{text:`to ${o.name}, ${o.said}: ${Re(r.shipTime)} on board, ${Re(r.homeTime)} at home, top speed ${Is(r.topSpeed)}, ${i}`,html:gm(e,n),data:{ship:{dryMassTonnes:e.dryMass,fuelTonnes:e.fuel,exhaust:e.exhaust,accelerationG:e.acceleration},trips:a.map(({destination:h,trip:l})=>({to:h.name,distance:h.said,onBoardYears:l.shipTime/Jo,atHomeYears:l.homeTime/Jo,topSpeed:l.topSpeed,fuelBurntTonnes:l.fuelBurnt,coasts:l.coasts}))}}}},Sn=[{name:"Proxima Centauri",ra:14.495,dec:-62.68,lightYears:4.24},{name:"Alpha Centauri",ra:14.66,dec:-60.83,lightYears:4.37},{name:"Barnard's Star",ra:17.963,dec:4.69,lightYears:5.96},{name:"Wolf 359",ra:10.941,dec:7.01,lightYears:7.86},{name:"Lalande 21185",ra:11.056,dec:35.97,lightYears:8.31},{name:"Sirius",ra:6.752,dec:-16.72,lightYears:8.58},{name:"Luyten 726-8",ra:1.65,dec:-17.95,lightYears:8.73},{name:"Ross 154",ra:18.83,dec:-23.84,lightYears:9.69},{name:"Ross 248",ra:23.699,dec:44.18,lightYears:10.3},{name:"Epsilon Eridani",ra:3.549,dec:-9.46,lightYears:10.52},{name:"Lacaille 9352",ra:23.098,dec:-35.85,lightYears:10.72},{name:"Ross 128",ra:11.796,dec:.8,lightYears:11.01},{name:"EZ Aquarii",ra:22.643,dec:-15.3,lightYears:11.1},{name:"61 Cygni",ra:21.115,dec:38.75,lightYears:11.4},{name:"Procyon",ra:7.655,dec:5.22,lightYears:11.46},{name:"Struve 2398",ra:18.713,dec:59.63,lightYears:11.5},{name:"Groombridge 34",ra:.306,dec:44.02,lightYears:11.6},{name:"Epsilon Indi",ra:22.056,dec:-56.78,lightYears:11.87},{name:"Tau Ceti",ra:1.734,dec:-15.94,lightYears:11.91}];function Mn(t,e){const n=e.radius/e.reach;return t.map(({name:a,ra:s,dec:o,lightYears:r})=>{const i=s/24*2*Math.PI,h=o/180*Math.PI,l=r*Math.cos(h)*Math.cos(i),c=r*Math.cos(h)*Math.sin(i),d=r*Math.sin(h),u=c*Math.cos(e.yaw)-l*Math.sin(e.yaw),f=l*Math.cos(e.yaw)+c*Math.sin(e.yaw),m=d*Math.cos(e.pitch)-f*Math.sin(e.pitch),p=f*Math.cos(e.pitch)+d*Math.sin(e.pitch);return{name:a,x:u*n,y:-m*n,depth:p}})}const qe=299792458,ym=9.81;function bm(t,e,n){const a=e.acceleration*ym,s=d=>({distance:qe*qe/a*(Math.cosh(a*d/qe)-1),homeTime:qe/a*Math.sinh(a*d/qe),speed:Math.tanh(a*d/qe)}),o=s(t.burnTime),r=t.homeTime-2*o.homeTime,i=r*t.topSpeed*qe,h=2*o.distance+i,l=Math.max(0,Math.min(n,t.shipTime));if(l<=t.burnTime){const d=s(l);return{along:d.distance/h,homeTime:d.homeTime,speed:d.speed}}if(l<=t.burnTime+t.coastTime){const d=(l-t.burnTime)/t.coastTime;return{along:(o.distance+d*i)/h,homeTime:o.homeTime+d*r,speed:t.topSpeed}}const c=s(t.shipTime-l);return{along:1-c.distance/h,homeTime:t.homeTime-c.homeTime,speed:c.speed}}const An=12.5,Ko=9,Vo=1.5,vm=new Set(["Alpha Centauri"]),Q={ground:"#06080f",ring:"rgba(127,166,234,0.22)",stem:"rgba(127,166,234,0.18)",star:"#dfe7f5",dim:"#7d8aa3",sun:"#ffd98a",way:"#ff9d6e",ship:"#ffffff"};function km(t,e,n){const a=t.getContext("2d");if(!a)return()=>{};const s=a,o=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=new Set(en.map(({name:b})=>b));let i={yaw:.6,pitch:.45,radius:1,reach:An},h=0,l=performance.now(),c=null,d=[];const u=()=>({x:t.clientWidth/2,y:t.clientHeight/2});function f(b){const v=t.clientWidth,T=t.clientHeight,S=window.devicePixelRatio||1;t.width!==Math.round(v*S)&&(t.width=Math.round(v*S),t.height=Math.round(T*S)),s.setTransform(S,0,0,S,0,0),s.fillStyle=Q.ground,s.fillRect(0,0,v,T),!o&&!c&&(i={...i,yaw:i.yaw+.0015}),i={...i,radius:Math.min(v,T)*.47};const A=u(),k=j=>({x:A.x+j.x,y:A.y+j.y});s.font="11px ui-monospace, Menlo, monospace";for(const j of[5,10]){const N=Mn(Array.from({length:73},(B,_)=>({name:"",ra:_/72*24,dec:0,lightYears:j})),i);s.beginPath(),N.forEach((B,_)=>_?s.lineTo(k(B).x,k(B).y):s.moveTo(k(B).x,k(B).y)),s.strokeStyle=Q.ring,s.stroke();const P=k(N[0]??{x:0,y:0});s.fillStyle=Q.dim,s.fillText(`${j} ly`,P.x+4,P.y-3)}const{ship:I,chosen:O}=e(),H=en.find(({name:j})=>j===O),C=Sn.find(({name:j})=>j===O),M=H?Es(H.metres,I):null;d=Mn(Sn,i);const L=Mn(Sn.map(j=>({...j,lightYears:j.lightYears*Math.cos(j.dec/180*Math.PI),dec:0})),i),$=d.map((j,N)=>N).sort((j,N)=>(d[j]?.depth??0)-(d[N]?.depth??0));for(const j of $){const N=k(d[j]??{x:0,y:0}),P=k(L[j]??{x:0,y:0}),B=d[j]?.name??"",_=((d[j]?.depth??0)+An)/(2*An);s.strokeStyle=Q.stem,s.beginPath(),s.moveTo(N.x,N.y),s.lineTo(P.x,P.y),s.stroke(),s.fillStyle=B===O?Q.way:Q.star,s.globalAlpha=.45+.55*_,s.beginPath(),s.arc(N.x,N.y,1.6+1.8*_,0,2*Math.PI),s.fill(),r.has(B)&&(s.strokeStyle=B===O?Q.way:Q.dim,s.beginPath(),s.arc(N.x,N.y,7,0,2*Math.PI),s.stroke()),s.fillStyle=B===O?Q.way:Q.dim,vm.has(B)||s.fillText(B,N.x+10,N.y+4),s.globalAlpha=1}if(s.fillStyle=Q.sun,s.beginPath(),s.arc(A.x,A.y,4,0,2*Math.PI),s.fill(),s.fillText("the Sun",A.x+8,A.y-6),M&&H){const j=H.towards?Mn([{name:"",...H.towards,lightYears:An*1.15}],i)[0]:null,N=C?d[Sn.indexOf(C)]:j,P=(b-l)/1e3%(Ko+2*Vo),B=o?.5:Math.min(1,Math.max(0,(P-Vo)/Ko)),_=bm(M,I,B*M.shipTime);if(N){const J=k(N);s.strokeStyle=Q.way,s.setLineDash(C?[]:[4,4]),s.beginPath(),s.moveTo(A.x,A.y),s.lineTo(J.x,J.y),s.stroke(),s.setLineDash([]);const Ie={x:A.x+(J.x-A.x)*_.along,y:A.y+(J.y-A.y)*_.along};s.fillStyle=Q.ship,s.beginPath(),s.arc(Ie.x,Ie.y,3,0,2*Math.PI),s.fill(),C||s.fillText(`to ${H.name}, ${H.said}: not to scale`,12,T-34)}else s.fillStyle=Q.dim,s.fillText(`${H.name} is inside the dot: the planets are a thousandth of a light-year away`,12,T-34);s.fillStyle=Q.star,s.font="13px ui-monospace, Menlo, monospace",s.fillText(`on board ${Re(B*M.shipTime)}`,12,22),s.fillText(`at home  ${Re(_.homeTime)}`,12,40),s.fillStyle=Q.dim,s.fillText(`${(_.speed*100).toFixed(_.speed>.99?4:1)}% of c`,12,58),s.fillText("drag to turn",v-96,T-14)}h=o&&!c?0:requestAnimationFrame(f)}const m=b=>{const v=t.getBoundingClientRect();return{x:b.clientX-v.left,y:b.clientY-v.top}},p=b=>{c=m(b),t.setPointerCapture(b.pointerId),h||(h=requestAnimationFrame(f))},y=b=>{if(!c)return;const v=m(b);i={...i,yaw:i.yaw+(v.x-c.x)*.01,pitch:Math.max(-1.4,Math.min(1.4,i.pitch+(v.y-c.y)*.01))},c=v},g=b=>{const v=m(b),T=u(),S=d.find(A=>r.has(A.name)&&Math.hypot(T.x+A.x-v.x,T.y+A.y-v.y)<12);c=null,S&&(l=performance.now(),n(S.name))};return t.addEventListener("pointerdown",p),t.addEventListener("pointermove",y),t.addEventListener("pointerup",g),h=requestAnimationFrame(f),()=>{cancelAnimationFrame(h),t.removeEventListener("pointerdown",p),t.removeEventListener("pointermove",y),t.removeEventListener("pointerup",g)}}const xm=(t,e)=>{let n=Yi(rs);const a=h=>{n=h.detail};t.addEventListener(os,a);const s=Ui(rs)(t,e),o=h=>{const l=h.target?.closest("[data-destination]")?.getAttribute("data-destination");l&&ss(t,{to:l})};t.addEventListener("click",o);const r=w("canvas",{class:"starmap","aria-label":"The stars within twelve light-years of the Sun, turning, with the ship flying the chosen trip"});t.prepend(r);const i=km(r,()=>({ship:Ji(n),chosen:String(n.to)}),h=>ss(t,{to:h}));return()=>{i(),s?.(),t.removeEventListener(os,a),t.removeEventListener("click",o)}},$m={name:"rocket",programs:[rs],apps:{rocket:xm}},is=["Go to the blog section,","You should see a list of posts,",'The last post title should be "Hello Blog", this post'];function Tm(t){let e=0,n="";const a=[],s={},o=l=>{const c=l.exec(t.slice(e));return c&&(e+=c[0].length),c?.[0]},r=l=>{n+=n.length===0?l.toLowerCase():l[0]?.toUpperCase()+l.slice(1).toLowerCase()},i=(l,c,d)=>{const u=s[c]??1;s[c]=u+1;const f=/shouldBe/i.test(n)&&!a.some(m=>m.name==="expected");a.push({value:l,name:f?"expected":`${c}${u}`,type:d})};let h=-1;for(;e<t.length&&h!==e;){h=e,o(/^[^a-z0-9"]+/i);const l=o(/^[a-z]+/i);l&&r(l);const c=o(/^"[^"]+"/);c&&(i(c,"s","String"),r("S"));const d=o(/^[0-9]+/);d&&(i(d,"n","int"),r("N"))}return{name:n,arguments:a,text:t}}const In=(t,e,n,a)=>`<div class="${a}"><h4>${x(t)}</h4><pre><code>${le(n,e)}</code></pre></div>`;function Xo(t){const e=t.map(a=>`context.${a.name}(${a.arguments.map(s=>s.value).join(", ")});`),n=Math.max(0,...e.map(a=>a.length));return e.map((a,s)=>`  ${a.padEnd(n)}  // ${t[s]?.text.trim()}`).join(`
`)}function Zo(t){const e=new Set;return t.filter(n=>!e.has(n.name)&&e.add(n.name))}function Ki(t){const e=t.map(Tm).filter(r=>r.name.length>0),n=`@Test
public void post() {
${Xo(e)}
}`,a=`test("post", () => {
${Xo(e)}
});`,s=Zo(e).map(r=>`public void ${r.name}(${r.arguments.map(i=>`${i.type} ${i.name}`).join(", ")}) {
  // to write
}`).join(`

`),o=Zo(e).map(r=>`${r.name}(${r.arguments.map(i=>i.name).join(", ")}) {
  // to write
}`).join(`

`);return'<div class="step-code">'+In("The test, for the server","java",n,"step-test")+In("The test, for the client","js",a,"step-test")+In("What is left to write, in Java","java",s,"step-context")+In("And in JavaScript","js",o,"step-context")+"</div>"}function Sm(t){const e=w("textarea",{class:"step-post",rows:6,spellcheck:!1,"aria-label":"A post, one step a line"});e.value=is.map(s=>`* ${s}`).join(`
`);const n=w("div"),a=()=>{n.innerHTML=Ki(e.value.split(`
`).map(s=>s.replace(/^\s*[*-]\s*/,"")))};e.addEventListener("input",a),t.replaceChildren(e,n),a()}const Mm=()=>`<pre class="step-post">${is.map(t=>`* ${t}`).join(`
`)}</pre>${Ki(is)}`,Am={name:"step-names",apps:{"step-names":Sm},stills:{"step-names":Mm}},Yt='import Game from "./bowling";',ne=`${Yt}

let g;
beforeEach(() => (g = new Game()));`,rt=(t,e,n="i++")=>`test("gutter game", () => {
${t?`  const g = new Game();
`:""}  for (let i = 0; i < 20; ${n})
    g.roll(0);
${e?`  expect(g.score()).toBe(0);
`:""}});`,_e=(t,e="i++")=>`test("all ones", () => {
${t?`  const g = new Game();
`:""}  for (let i = 0; i < 20; ${e})
    g.roll(1);
  expect(g.score()).toBe(20);
});`,Te=`test("gutter game", () => {
  rollMany(20, 0);
  expect(g.score()).toBe(0);
});`,Ce=`test("all ones", () => {
  rollMany(20, 1);
  expect(g.score()).toBe(20);
});`,Vi=`test("one spare", () => {
  g.roll(5);
  g.roll(5); // spare
  g.roll(3);
  rollMany(17, 0);
  expect(g.score()).toBe(16);
});`,Im=Vi.split(`
`).map(t=>`// ${t}`).join(`
`),Ot=`test("one spare", () => {
  rollSpare();
  g.roll(3);
  rollMany(17, 0);
  expect(g.score()).toBe(16);
});`,Em=`test("one strike", () => {
  g.roll(10); // strike
  g.roll(3);
  g.roll(4);
  rollMany(16, 0);
  expect(g.score()).toBe(24);
});`,Ia=`test("one strike", () => {
  rollStrike();
  g.roll(3);
  g.roll(4);
  rollMany(16, 0);
  expect(g.score()).toBe(24);
});`,Qo=t=>`test("perfect game", () => {
  rollMany(12, 10);
  expect(g.score()).toBe(${t});
});`,Lt=`function rollMany(rolls, pins) {
  for (let i = 0; i < rolls; i += 1)
    g.roll(pins);
}`,Nt=`function rollMany(rolls, pins) {
  for (let i = 0; i < rolls; i += 1) g.roll(pins);
}`,Pt=`function rollSpare() {
  g.roll(5);
  g.roll(5);
}`,Ea=`function rollStrike() {
  g.roll(10);
}`,K=(...t)=>t.join(`

`),D={gutterNoImport:`test('gutter game', () => {
  const g = new Game();
});`,gutterNew:K(Yt,`test("gutter game", () => {
  const g = new Game();
});`),gutterRolls:K(Yt,rt(!0,!1)),gutterScore:K(Yt,rt(!0,!0)),allOnes:K(Yt,rt(!0,!0),_e(!0)),setUp:K(ne,rt(!0,!0),_e(!0)),gutterShared:K(ne,rt(!1,!0),_e(!0)),bothShared:K(ne,rt(!1,!0),_e(!1)),named:K(ne,`test("gutter game", () => {
  const pins = 0;
  const rolls = 20;
  for (let i = 0; i < rolls; i += 1)
    g.roll(pins);
  expect(g.score()).toBe(0);
});`,_e(!1,"i += 1")),extracted:K(ne,`test("gutter game", () => {
  const pins = 0;
  const rolls = 20;
  rollMany(rolls, pins);
  expect(g.score()).toBe(0);
});`,_e(!1,"i += 1"),Lt),inlined:K(ne,Te,_e(!1,"i += 1"),Lt),rollMany:K(ne,Te,Ce,Lt),spare:K(ne,Te,Ce,Vi,Lt),spareAside:K(ne,Te,Ce,Im,Lt),rollSpare:K(ne,Te,Ce,Ot,Nt,Pt),strike:K(ne,Te,Ce,Ot,Em,Nt,Pt),rollStrike:K(ne,Te,Ce,Ot,Ia,Nt,Pt,Ea),perfect:K(ne,Te,Ce,Ot,Ia,Qo("300"),Nt,Pt,Ea),perfectFails:K(ne,Te,Ce,Ot,Ia,Qo('"fail"'),Nt,Pt,Ea)},V=(...t)=>`export default class Game {
${t.join(`
`)}
}`,G=(t,...e)=>e.length?`  ${t} {
${e.map(n=>`    ${n}`).join(`
`)}
  }`:`  ${t} {}`,ja=["let score = 0;","for (let i = 0; i < this.#rolls.length; i++) {","  score += this.#rolls[i];","}","return score;"],ze=(...t)=>["const rolls = this.#rolls;","let score = 0;",...t,"return score;"],ae="  #rolls = [];",pe=G("roll(pins)","this.#rolls.push(pins);"),it=`function isSpare(rolls, frameIndex) {
  return rolls[frameIndex] + rolls[frameIndex + 1] == 10;
}`,jm=`function isStrike(rolls, frameIndex) {
  return rolls[frameIndex] === 10;
}`,En=`function strikeBonus(rolls, frameIndex) {
  return rolls[frameIndex + 1] + rolls[frameIndex + 2];
}`,Ca=`function spareBonus(rolls, frameIndex) {
  return rolls[frameIndex + 2];
}`,er=`function sumOfBallsInFrame(rolls, frameIndex) {
  return rolls[frameIndex] + rolls[frameIndex + 1];
}`,Ge=t=>["let frameIndex = 0;","for (let frame = 0; frame < 10; frame++) {",...t.map(e=>`  ${e}`),"}"],tr=(t,e)=>[`if (${t}) {`,...t.includes("isSpare")?[]:["  // spare"],"  score += 10 + rolls[frameIndex + 2];","  frameIndex += 2;","} else {",`  score += ${e};`,"  frameIndex += 2;","}"],R={none:"",empty:"export default class Game {}",roll:V(G("roll()")),scoreEmpty:V(G("roll()"),G("score()")),scoreZero:V(G("roll()"),G("score()","return 0;")),summing:V("  #score = 0;",G("roll(pins)","this.#score += pins;"),G("score()","return this.#score;")),rollsField:V("  #score = 0;",ae,G("roll(pins)","this.#score += pins;"),G("score()","return this.#score;")),bothWritten:V("  #score = 0;",ae,G("roll(pins)","this.#score += pins;","this.#rolls.push(pins);"),G("score()","return this.#score;")),readFromRolls:V("  #score = 0;",ae,G("roll(pins)","this.#score += pins;","this.#rolls.push(pins);"),G("score()",...ja)),oldUnwritten:V("  #score = 0;",ae,pe,G("score()",...ja)),rollsOnly:V(ae,pe,G("score()",...ja)),twoAtATime:V(ae,pe,G("score()","const rolls = this.#rolls;","let score = 0;","let i = 0;","for (let frame = 0; frame < 10; frame++) {","  score += rolls[i] + rolls[i + 1];","  i += 2;","}","return score;")),spareByI:V(ae,pe,G("score()","const rolls = this.#rolls;","let score = 0;","let i = 0;","for (let frame = 0; frame < 10; frame++) {","  if (rolls[i] + rolls[i + 1] == 10) {","    // spare","    score += 10 + rolls[i + 2];","    i += 2;","  } else {","    score += rolls[i] + rolls[i + 1];","    i += 2;","  }","}","return score;")),frameIndex:V(ae,pe,G("score()",...ze(...Ge(tr("rolls[frameIndex] + rolls[frameIndex + 1] == 10","rolls[frameIndex] + rolls[frameIndex + 1]"))))),isSpare:`${V(ae,pe,G("score()",...ze(...Ge(tr("isSpare(rolls, frameIndex)","rolls[frameIndex] + rolls[frameIndex + 1]")))))}

${it}`,strike:`${V(ae,pe,G("score()",...ze(...Ge(["if (rolls[frameIndex] == 10) {","  // strike","  score += 10 +","    rolls[frameIndex + 1] +","    rolls[frameIndex + 2];","  frameIndex += 1;","} else if (isSpare(rolls, frameIndex)) {","  score += 10 + rolls[frameIndex + 2];","  frameIndex += 2;","} else {","  score += rolls[frameIndex] + rolls[frameIndex + 1];","  frameIndex += 2;","}"]))))}

${it}`,strikeBonus:`${V(ae,pe,G("score()",...ze(...Ge(["if (rolls[frameIndex] == 10) {","  // strike","  score += 10 + strikeBonus(rolls, frameIndex);","  frameIndex += 1;","} else if (isSpare(rolls, frameIndex)) {","  score += 10 + rolls[frameIndex + 2];","  frameIndex += 2;","} else {","  score += rolls[frameIndex]+rolls[frameIndex + 1];","  frameIndex += 2;","}"]))))}

${En}

${it}`,spareBonus:`${V(ae,pe,G("score()",...ze(...Ge(["if (rolls[frameIndex] == 10) {","  // strike","  score += 10 + strikeBonus(rolls, frameIndex);","  frameIndex += 1;","} else if (isSpare(rolls, frameIndex)) {","  score += 10 + spareBonus(rolls, frameIndex);","  frameIndex += 2;","} else {","  score += rolls[frameIndex]+rolls[frameIndex + 1];","  frameIndex += 2;","}"]))))}

${En}

${Ca}

${it}`,sumOfBalls:`${V(ae,pe,G("score()",...ze(...Ge(["if (rolls[frameIndex] == 10) {","  // strike","  score += 10 + strikeBonus(rolls, frameIndex);","  frameIndex += 1;","} else if (isSpare(rolls, frameIndex)) {","  score += 10 + spareBonus(rolls, frameIndex);","  frameIndex += 2;","} else {","  score += sumOfBallsInFrame(rolls, frameIndex);","  frameIndex += 2;","}"]))))}

${En}

${Ca}

${er}

${it}`,isStrike:`${V(ae,pe,G("score()",...ze(...Ge(["if (isStrike(rolls, frameIndex)) {","  score += 10 + strikeBonus(rolls, frameIndex);","  frameIndex += 1;","} else if (isSpare(rolls, frameIndex)) {","  score += 10 + spareBonus(rolls, frameIndex);","  frameIndex += 2;","} else {","  score += sumOfBallsInFrame(rolls, frameIndex);","  frameIndex += 2;","}"]))))}

${jm}

${En}

${Ca}

${er}

${it}`},Se=["Roll loop is duplicated","Game creation duplicated"],se=["ugly comment in test."],Oa=["ugly comment in test.","ugly comment in conditional.","i is a bad name for this variable"],Rt=["ugly comment in test.","ugly comment in conditional.","ugly expressions."],F=(t,e,n,a,s=[],o)=>o===void 0?{commit:t,stage:e,test:n,code:a,smells:s}:{commit:t,stage:e,test:n,code:a,smells:s,note:o},Je=[F(0,"test","",R.none,[],"Create the BowlingGame project. Create a test file bowling.spec.js. Execute the test and verify that you get the following error."),F(1,"test",D.gutterNoImport,R.none),F(2,"code",D.gutterNew,R.empty),F(3,"test",D.gutterRolls,R.empty),F(4,"code",D.gutterRolls,R.roll),F(5,"test",D.gutterScore,R.roll),F(6,"code",D.gutterScore,R.scoreEmpty),F(7,"code",D.gutterScore,R.scoreZero),F(8,"test",D.allOnes,R.scoreZero,Se),F(9,"code",D.allOnes,R.summing,Se),F(10,"clean",D.setUp,R.summing,Se),F(11,"clean",D.gutterShared,R.summing,Se),F(12,"clean",D.bothShared,R.summing,Se),F(13,"clean",D.named,R.summing,Se),F(14,"clean",D.extracted,R.summing,Se),F(15,"clean",D.inlined,R.summing,Se),F(16,"clean",D.rollMany,R.summing,Se),F(17,"test",D.spare,R.summing,se),F(18,"test",D.spareAside,R.summing,se,"Tempted to use flag to remember previous roll. So design must be wrong. roll() calculates score, but name does not imply that. score() does not calculate score, but name implies that it does. Design is wrong. Responsibilities are misplaced."),F(19,"clean",D.spareAside,R.rollsField,se),F(20,"clean",D.spareAside,R.bothWritten,se),F(21,"clean",D.spareAside,R.readFromRolls,se),F(22,"clean",D.spareAside,R.oldUnwritten,se),F(23,"clean",D.spareAside,R.rollsOnly,se),F(24,"test",D.spare,R.rollsOnly,se),F(25,"test",D.spareAside,R.rollsOnly,se,"This isn’t going to work because i might not refer to the first ball of the frame. Design is still wrong. Need to walk through array two balls (one frame) at a time."),F(26,"clean",D.spareAside,R.twoAtATime,se),F(27,"test",D.spare,R.twoAtATime,se),F(28,"code",D.spare,R.spareByI,se),F(29,"clean",D.spare,R.frameIndex,Oa),F(30,"clean",D.spare,R.isSpare,Oa),F(31,"clean",D.rollSpare,R.isSpare,Oa),F(32,"test",D.strike,R.isSpare,se),F(33,"code",D.strike,R.strike,se),F(34,"clean",D.strike,R.strikeBonus,Rt),F(35,"clean",D.strike,R.spareBonus,Rt),F(36,"clean",D.strike,R.sumOfBalls,Rt),F(37,"clean",D.strike,R.isStrike,Rt),F(38,"clean",D.rollStrike,R.isStrike,Rt),F(39,"test",D.perfect,R.isStrike),F(40,"test",D.perfectFails,R.isStrike),F(41,"test",D.perfect,R.isStrike)];function Cm(t,e){const n=t===""?[]:t.split(`
`),a=e.split(`
`),s=Array.from({length:n.length+1},()=>new Array(a.length+1).fill(0));for(let h=n.length-1;h>=0;h-=1)for(let l=a.length-1;l>=0;l-=1)s[h][l]=n[h]===a[l]?(s[h+1][l+1]??0)+1:Math.max(s[h+1][l]??0,s[h][l+1]??0);const o=[];let r=0,i=0;for(;r<n.length||i<a.length;)r<n.length&&i<a.length&&n[r]===a[i]?(o.push({kind:"same",line:a[i]}),r+=1,i+=1):r<n.length&&(i>=a.length||(s[r+1][i]??0)>=(s[r][i+1]??0))?(o.push({kind:"removed",line:n[r]}),r+=1):(o.push({kind:"added",line:a[i]}),i+=1);return o}const jn={id:"fc771d5e39e8",title:"Lessons Learned From The Bowling Game Kata: What To Test?"},Ft={id:"90b110a2ad17",title:"Refactor Lessons Learned From The Bowling Game Kata (1/2)"},Oe={id:"1d28b3a78b08",title:"Refactor Lessons Learned From The Bowling Game Kata (2/2)"},nr={id:"a37d8d11be9c",title:"Lessons Learned From The Bowling Game Kata: How To Design?"},ar={id:"6813582074f3",title:"Don't Trust Tests"},Om=[{commits:[1,4],title:"Step tests come and go",text:"The test first only creates a game, as a step test would, and then rolls, as another would. Such tests appear and disappear while a business test is written: none is needed.",essay:{...jn,section:"Chapter Four. Step tests are redundant."}},{commits:[5,7],title:"The simplest rule first",text:"The gutter game scores no point, so it needs no hard thinking, and it lays the foundation of the code. Then comes the simplest rule that remains, and so on.",essay:{...jn,section:"Chapter Seven. Start with the most simple rule."}},{commits:[8,9],title:"Refactor only after it works",text:"The second test repeats code from the first, and the kata waits: it only marks the duplication. Solving the problem and cleaning the code are two tasks, and the first comes first.",essay:{...Ft,section:"Lesson 1: Refactor only after it works."}},{commits:[10,10],title:"Add new code before removing the old",text:"It works again, so the refactor begins, oddly: a game for every test, kept and then ignored. Doing nothing, it breaks nothing — which shows the new code is safe to use.",essay:{...Ft,section:"Lesson 2: Add new code before removing old."}},{commits:[11,12],title:"Remove as little as possible",text:"The old creation goes one test at a time: the gutter game first, then, once everything works, all ones. Should they behave differently, a small change makes the cause easy to find.",essay:{...Ft,section:"Lesson 3: Remove the minimal amount of old code."}},{commits:[13,13],title:"One aspect at a time",text:"Only with the game's creation clean does the kata turn to the other thing to clean, the repeated loop. Many improvements may come to mind; it takes them one at a time.",essay:{...Ft,section:"Lesson 4: Refactor only one aspect at a time."}},{commits:[14,16],title:"Let the IDE do it",text:"With the rolls and the pins in constants, extracting the loop makes them the parameters of rollMany, and nothing is done by hand. Then the constants go, and the second loop calls it too.",essay:{...Ft,section:"Lesson 5: Leverage on the IDE."}},{commits:[17,17],title:"Not from scratch",text:"The design so far is the least one the needs so far asked for, and it was necessary. Now it no longer serves, and starting again from scratch is out of the question.",essay:{...Oe,section:"The Final Lesson"}},{commits:[18,18],title:"Step 0 · Name the parts",text:"The failing test is set aside, so everything works again before the refactor. Then the kinds of code: the counter is the internal representation, roll its setter, score its getter.",essay:{...Oe,section:"Step 0. Identifying types of code"}},{commits:[19,19],title:"Step 1 · Add the new beside the old",text:"The new internal representation, the list of rolls, goes in just below the counter. The old one is not removed, so the code still works.",essay:{...Oe,section:"Step 1. Introducing the new internal representation"}},{commits:[20,20],title:"Step 2 · Write to both",text:"The setter, roll, also keeps each roll in the list. It goes on updating the counter as well, so for now it writes to both, and the code still works.",essay:{...Oe,section:"Step 2. Make setters update the new internal representation."}},{commits:[21,21],title:"Step 3 · Read from the new",text:"The getter, score, now adds up the list. Only its own old line goes: that breaks nobody, and an undo would bring it back. The counter and its update stay.",essay:{...Oe,section:"Step 3. Make getters use the new internal representation."}},{commits:[22,22],title:"Step 4 · Stop writing the old",text:"roll stops updating the counter, and everything works: no getter reads it any more. Had something broken, some code would still be using it: undo the removal, and keep refactoring.",essay:{...Oe,section:"The Five Steps"}},{commits:[23,23],title:"Step 5 · Remove the old",text:"Nobody uses the counter, so it goes, and the code works again — the mantra behind each step. So every step could be committed and merged, without stopping delivery.",essay:{...Oe,section:"The five steps mantra"}},{commits:[24,26],title:"No guarantee of success",text:"The refactor is complete, and the spare still fails: a good technique is not a guarantee. It works again first; then most of the code stays, and only the algorithm changes.",essay:{...Oe,section:"Additional steps."}},{commits:[27,27],title:"The test comes back as it was",text:"The spare test returns unchanged; the kata writes no test for its roll-by-roll attempt. It just continues the refactor, and fixes the algorithm.",essay:{...jn,section:"Chapter Five. Do not test mistakes."}},{commits:[32,32],title:"The tests are the rules",text:"The strike test is one more rule of scoring: tests and rules match one by one. They call the game, roll and score, and what they test is the business rules.",essay:{...jn,section:"Chapter One. The basics."}},{commits:[37,37],title:"Code that reads as the rules",text:"The score now reads as the instructions for scoring bowling: frame by frame, a strike, a spare or neither, with the bonuses where they are due.",essay:{...nr,section:"Comparing typical design with the kata design"}},{commits:[39,39],title:"No code for the tenth frame",text:"The perfect game passes at once. The tenth frame has no code and no test of its own: this game checks it, and the bonuses count its extra rolls.",essay:{...nr,section:"Where is the Tenth Frame?"}},{commits:[40,40],title:"Make it fail once",text:"A test that passes without failing first has lost what TDD gives: a mistake could pass unnoticed. So it is made to fail on purpose, and the error shows it checks the right thing.",essay:{...ar,section:""}},{commits:[41,41],title:"Trust a test seen failing",text:"Seen failing as it should, the test is known to check the right thing, and it gets its expectation back. Never trust a test that did not fail before.",essay:{...ar,section:""}}];function Xi(t){return Om.find(({commits:[e,n]})=>t>=e&&t<=n)}function Xn(t){return t instanceof Error?`${t.name}: ${t.message}`:String(t)}const Zi=new WeakSet,Ut=t=>typeof t=="string"?JSON.stringify(t):typeof t=="function"?Zi.has(t)?"[MockFunction]":`[Function ${t.name||"anonymous"}]`:String(t),Qi=t=>t.map(Ut).join(", "),sr=t=>t.length===0?"called with no arguments":`called with ${Qi(t)}`;class Fn extends Error{}const or=t=>t instanceof Fn?t.message:Xn(t);function Lm(){const t=[],e=Object.assign((...n)=>{t.push(n)},{calls:t});return Zi.add(e),e}const Nm=(t,e)=>t.length===e.length&&t.every((n,a)=>Object.is(n,e[a]));function Pm(t){return{toBe(e){if(!Object.is(t,e))throw new Fn(`Expected: ${Ut(e)}. Received: ${Ut(t)}.`)},toContain(e){if(!Array.isArray(t)||!t.includes(e))throw new Fn(`Expected: something containing ${Ut(e)}. Received: ${Array.isArray(t)?`[${Qi(t)}]`:Ut(t)}.`)},toHaveBeenCalledWith(...e){const n=t?.calls??[];if(n.some(s=>Nm(s,e)))return;const a=n[n.length-1];throw new Fn(`Expected: ${sr(e)}. Received: ${a?sr(a):"never called"}.`)}}}function Un(t,e={}){const n=[],a=[],s=[],o=(d,u)=>n.push({name:[...s,d].join(" "),body:u}),r=(d,u)=>{s.push(d),u(),s.pop()},i=["test","it","describe","beforeEach","expect","fn",...Object.keys(e)],h=[o,o,r,d=>a.push(d),Pm,Lm,...Object.values(e)];try{new Function(...i,t)(...h)}catch(d){return{passed:!1,message:or(d),results:[]}}if(n.length===0)return{passed:!1,message:"Your test suite must contain at least one test.",results:[]};const l=n.map(({name:d,body:u})=>{try{for(const f of a)f();return u(),{name:d,passed:!0}}catch(f){return{name:d,passed:!1,message:or(f)}}}),c=l.find(d=>!d.passed);return c?{passed:!1,message:c.message,results:l}:{passed:!0,results:l}}const rr=/^\s*import Game from "\.\/bowling";\s*$/m;function eh(t,e){let n;try{n=e.trim()?new Function(`${e.replace(/export default class Game/,"class Game")}
return Game;`)():void 0}catch(a){return{passed:!1,message:Xn(a),results:[]}}return rr.test(t)?Un(t.replace(rr,""),{Game:n}):Un(t)}const Rm={test:"Test: write or change a test",code:"Code: write what the test asks for",clean:"Clean: tidy, and stay green"},Fm={same:"line",added:"line added",removed:"line removed"};function ir(t,e,n,a){const s=n===void 0?e.split(`
`).map(r=>({kind:"same",line:r})):Cm(n,e);if(!e.trim()&&!s.some(r=>r.kind==="removed"))return`<figure class="kata-file"><figcaption>${t}</figcaption><p class="kata-empty">${a}</p></figure>`;const o=s.map(({kind:r,line:i})=>`<span class="${Fm[r]}">${le(i,"js")||" "}</span>`);return`<figure class="kata-file"><figcaption>${t}</figcaption><pre><code>${o.join(`
`)}</code></pre></figure>`}function th(t,e){const n=eh(t.test,t.code),a=n.passed?'<p class="kata-bar green">All tests pass.</p>':`<p class="kata-bar red">${x(n.message??"")}</p>`,s=t.smells.length?`<div class="kata-smells"><h4>Still to clean</h4><ul>${t.smells.map(h=>`<li>${x(h)}</li>`).join("")}</ul></div>`:"",o=t.note?`<p class="kata-note">${x(t.note)}</p>`:"",r=Xi(t.commit),i=r?`<aside class="kata-lesson"><h4>${x(r.title)}</h4><p>${x(r.text)} <a href="https://medium.com/p/${r.essay.id}" target="_blank" rel="noopener noreferrer">${x(r.essay.title)}${r.essay.section?` — ${x(r.essay.section)}`:""}</a></p></aside>`:"";return`<div class="kata-step"><p class="kata-move"><strong>commit ${t.commit}</strong> · ${Rm[t.stage]}</p>${a}${i}<div class="kata-files">${ir("bowling.spec.js",t.test,e?.test,"An empty file.")}${ir("bowling.js",t.code,e?.code,"Not written yet.")}</div>${o}${s}</div>`}function Bm(t,e){return`commit ${t.commit} · ${t.stage} · ${e.passed?"All tests pass.":e.message}`}function nh(t,e){return`<ol class="kata-strip" aria-label="The commits of the kata, red or green">${t.map(s=>{const o=eh(s.test,s.code),r=o.passed?"green":"red",i=s.commit===e;return`<li class="${r} ${s.stage}${i?" here":""}" data-commit="${s.commit}" title="${x(Bm(s,o))}"${i?' aria-current="step"':""}>${s.commit}</li>`}).join("")}</ol><p class="kata-legend"><span class="red">a test fails</span> <span class="green code">all pass</span> <span class="green clean">a clean step: all still pass</span></p>`}const Dm=()=>`<div class="kata">${nh(Je,0)}${th(Je[0])}</div>`,hr=Je.length-1;function Hm(t){let e=0;const n=w("div"),a=w("div"),s=w("button",{type:"button"},"← previous"),o=w("button",{type:"button",class:"invite"},"next →"),r=w("span",{class:"kata-hint"},"click any commit, or use ← →"),i=h=>{h!==e&&o.classList.remove("invite"),e=Math.max(0,Math.min(hr,h)),n.innerHTML=nh(Je,e),a.innerHTML=th(Je[e],Je[e-1]),s.disabled=e===0,o.disabled=e===hr};s.addEventListener("click",()=>i(e-1)),o.addEventListener("click",()=>i(e+1)),n.addEventListener("click",h=>{const l=h.target?.closest("[data-commit]");l&&i(Number(l.dataset.commit))}),t.tabIndex=0,t.addEventListener("keydown",h=>{if(h.key==="ArrowRight")i(e+1);else if(h.key==="ArrowLeft")i(e-1);else return;h.preventDefault()}),t.replaceChildren(w("div",{class:"kata"},n,w("div",{class:"kata-nav"},s,o,r),a)),i(0)}const Wm=/^---(?:\s+(.*))?$/;function qm(t){const e=[];let n=[];for(const a of t.split(`
`)){const s=Wm.exec(a);if(!s){n.push(a);continue}const o=s[1]?.trim()??"",r=/^(red|green)\s/.exec(o)?.[1],i=n.join(`
`);o?e.push({text:i,status:r?{kind:r,text:o.slice(r.length).trim()}:{kind:"note",text:o}}):e.push({text:i}),n=[]}return n.some(a=>a.trim())&&e.push({text:n.join(`
`)}),e}function ah(t,e){const n=qm(t),a=n.map((s,o)=>{const r=s.status?`<p class="slide-status ${s.status.kind}">${x(s.status.text)}</p>`:"";return`<div class="slide${o===n.length-1?" current":""}"><pre><code>${le(s.text,e)}</code></pre>${r}</div>`});return`<figure class="slides" data-language="${x(e)}"><div class="slides-screen">${a.join("")}</div></figure>`}const _m=[18,19,20,21,22,23];function zm(){return _m.map(t=>`${Je[t]?.code??""}
--- green commit ${t} · ${Xi(t)?.title??""} — all tests pass.`).join(`
`)}function sh(){return ah(zm(),"js")}function Gm(t){t.querySelector("figure.slides")||(t.innerHTML=sh())}const Ym=()=>sh(),Um={name:"bowling-kata",apps:{"bowling-kata":Hm,"kata-five-steps":Gm},stills:{"bowling-kata":Dm,"kata-five-steps":Ym}},hs=[{name:"original",label:"Original",said:"The dispatcher the three tests imply: its listeners kept in an array, _queue.",source:`class Dispatcher {
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
}`}],Jm=`let dispatcher, cb;
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
});`;function Km(t,e=Jm){let n;try{n=new Function(`${t}
return Dispatcher;`)()}catch(a){return{passed:!1,message:Xn(a),results:[]}}return Un(e,{Dispatcher:n})}const lr=["addListener should add a callback to the queue","deliver should invoke queue callbacks with the received argument"];function ls(t){const e=Km(t.source),n=s=>{const o=e.results.find(h=>h.name===s),r=o?.passed??!1,i=r?"":`<span class="said">${x(o?.message??e.message??"")}</span>`;return`<li class="${r?"green":"red"}"><code>${x(s)}</code>${i}</li>`},a=e.results.map(s=>s.name).filter(s=>!lr.includes(s));return`<div class="dispatcher-run"><figure class="kata-file"><figcaption>dispatcher.js — ${x(t.label.toLowerCase())}</figcaption><pre><code>${le(t.source,"js")}</code></pre></figure><div class="dispatcher-tests"><p class="said-change">${x(t.said)}</p><h4>Looking inside</h4><ul class="test-results">${lr.map(n).join("")}</ul><h4>Reading like documentation</h4><ul class="test-results">${a.map(n).join("")}</ul></div></div>`}function Vm(t){const e=w("div"),n=hs.map((a,s)=>{const o=w("input",{type:"radio",name:"dispatcher",value:a.name,checked:s===0});return o.addEventListener("change",()=>{e.innerHTML=ls(a)}),w("label",{},o,` ${a.label}`)});t.replaceChildren(w("div",{class:"dispatcher-choice",role:"radiogroup","aria-label":"The dispatcher"},...n),e),e.innerHTML=ls(hs[0])}const Xm=()=>hs.map(t=>`<section><h4>${t.label}</h4>${ls(t)}</section>`).join(""),Zm={name:"tests-as-examples",apps:{"tests-as-examples":Vm},stills:{"tests-as-examples":Xm}},oh=`Feature: Magic of Disappearing Cucumbers

  Scenario: Eating 5 out of 12 cucumbers
    Given I have 12 cucumbers
    When I eat 5 cucumbers
    Then I should have 7 cucumbers remaining`,rh=`class CucumberSteps {
  #count = 0;

  givenIHaveNCucumbers(count) {
    this.#count = count;
  }
}`,cr=(t,e)=>`<p class="kata-bar ${t?"green":"red"}">${x(e)}</p>`;function ih(t){if(t.error)return cr(!1,t.error);if(t.wished){const[a="",...s]=t.wished.split(`
`);return`<pre class="genie-wished">${x(a)}
${le(s.join(`
`),"js")}</pre>`}const e=t.run;if(!e)return"";const n=e.results.map(a=>`<li class="${a.passed?"green":"red"}"><code>${x(a.name)}</code>${a.passed?"":`<span class="said">${x(a.message??"")}</span>`}</li>`);return`${cr(e.passed,e.passed?"Every scenario passes.":e.message??"")}<ul class="test-results">${n.join("")}</ul>`}const Qm={n:`
`,r:"\r",t:"	",b:"\b",f:"\f",v:"\v",0:"\0",s:" "},dr=t=>t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();function ef(t,e){return t.endsWith(e)?t.at(-2)!=="\\"||/(^|[^\\])(\\\\)+.$/.test(t):!1}function hh(t){const e=t.split(" "),n=[],a=[];for(let s=0;s<e.length;){const o=e[s]??"",r=o[0];if(r==='"'||r==="'"){let h=e[s++]??"";for(;s<e.length&&!ef(h,r);)h+=` ${e[s++]}`;a.push(h.slice(1,-1).replace(/\\(.)/g,(l,c)=>Qm[c]??c)),n.push("S");continue}if(s+=1,o&&!Number.isNaN(Number(o))){a.push(Number(o)),n.push("N");continue}const i=o.normalize("NFD").replace(/([^\w]|\d)/g,"");i?n.push(dr(i)):o&&(n.push("X"),a.push(o))}return{matchName:n.map(dr).join(""),args:a}}const tf=/^(Given|When|Then|And|But) (.*)$/,nf=/^(?:Scenario|Example):\s*(.*)$/,af=/^("""|```)/;function sf(t){const e=[];let n=null,a=null;const s=t.split(`
`),o=()=>a?.at(-1),r=i=>{a&&(a[a.length-1]=i)};for(let i=0;i<s.length;i+=1){const h=(s[i]??"").trim();if(!h||h.startsWith("#")||h.startsWith("@"))continue;if(h.startsWith("Background:")){n=[],a=n;continue}const l=nf.exec(h);if(l){const f=[...n??[]];e.push({name:l[1]??"",steps:f}),a=f;continue}const c=tf.exec(h);if(c){a?.push({keyword:c[1]??"",text:c[2]??""});continue}const d=o();if(h.startsWith("|")&&d){const f=h.replace(/^\||\|$/g,"").split("|").map(m=>m.trim());r({...d,table:[...d.table??[],f]});continue}const u=af.exec(h);if(u&&d){const f=(s[i]??"").indexOf(u[1]??""),m=[];for(i+=1;i<s.length&&!(s[i]??"").trim().startsWith(u[1]??"");i+=1){const p=s[i]??"";m.push(p.slice(Math.min(f,p.length-p.trimStart().length)))}r({...d,docString:m.join(`
`)})}}return e}function of(t,e){const n=new Set(e),a=[];for(const s of t.flatMap(o=>o.steps)){const{matchName:o,args:r}=hh(s.text);if(n.has(o))continue;let i=1,h=1;const l=r.map(c=>typeof c=="number"?`number${i++}`:`string${h++}`);s.docString!==void 0&&l.push("docString"),s.table&&l.push("table"),a.push(`  ${s.keyword.toLowerCase()}${o}(${l.join(", ")}) {
    throw new Error("Unimplemented");
  }`),n.add(o)}return a.length===0?"":["There are missing steps. Please implement them:","","class WishedSteps {",a.join(`

`),"}"].join(`
`)}const ur=/^(given|when|then|and|but)([A-Z])/,Bt=t=>JSON.stringify(t);function rf(t){const[e=[],...n]=t;return n.map(a=>Object.fromEntries(e.map((s,o)=>[s,a[o]??""])))}function lh(t,e){const n=e.trim().replace(/;+$/,"");let a;try{a=new Function(`return (${n});`)()}catch(h){return{wished:"",error:Xn(h)}}if(typeof a!="function")return{wished:"",error:"The steps must be a class."};const s=new Map;for(const h of Object.getOwnPropertyNames(a.prototype))ur.test(h)&&s.set(h.replace(ur,"$2"),h);const o=sf(t),r=of(o,new Set(s.keys()));if(r)return{wished:r};const i=o.map(h=>{const l=h.steps.map(c=>{const{matchName:d,args:u}=hh(c.text),f=[...u.map(Bt),...c.docString===void 0?[]:[Bt(c.docString)],...c.table?[Bt(rf(c.table))]:[]];return`  steps[${Bt(s.get(d))}](${f.join(", ")});`});return`test(${Bt(h.name)}, () => {
  const steps = new Steps();
${l.join(`
`)}
});`});return{wished:"",run:Un(`const Steps = (${n});
${i.join(`
`)}`)}}function mr(t,e,n,a,s,o){const r=`<code>${le(a,n)}</code>`,i=o?`<div class="genie-editor"><pre class="genie-source genie-colours" aria-hidden="true">${r}</pre><textarea class="genie-source" data-genie="${e}" data-language="${n}" rows="${s}" spellcheck="false" autocapitalize="off" aria-label="${x(t)}">${x(a)}</textarea></div>`:`<pre class="genie-source">${r}</pre>`;return`<figure class="kata-file"><figcaption>${x(t)}</figcaption>${i}</figure>`}function ch(t,e,n){return`<div class="genie"><div class="genie-in">${mr("cucumbers.feature","feature","gherkin",t,7,n)}${mr("steps.js","steps","js",e,10,n)}</div><figure class="kata-file genie-out"><figcaption>npm test</figcaption><div class="genie-output">${ih(lh(t,e))}</div></figure></div>`}function hf(t){t.innerHTML=ch(oh,rh,!0);const e=t.querySelector('[data-genie="feature"]'),n=t.querySelector('[data-genie="steps"]'),a=t.querySelector(".genie-output");if(!e||!n||!a)return;for(const o of[e,n]){const r=o.previousElementSibling,i=()=>{r&&(r.innerHTML=`<code>${le(o.value,o.dataset.language??"")}
</code>`)};o.addEventListener("input",i),o.addEventListener("scroll",()=>{r&&(r.scrollTop=o.scrollTop,r.scrollLeft=o.scrollLeft)})}const s=()=>{a.innerHTML=ih(lh(e.value,n.value))};e.addEventListener("input",s),n.addEventListener("input",s)}const lf=()=>ch(oh,rh,!1),cf={name:"gherkin-genie",apps:{"gherkin-genie":hf},stills:{"gherkin-genie":lf}};function dh(t,e){if(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)return()=>{};let n=e(),a=!0,s=!1,o=!0,r;const i=w("button",{type:"button",class:"player"}),h=(u,f)=>{i.setAttribute("aria-label",u),i.textContent=f};h("Pause","⏸");const l=()=>{if(r=void 0,!a||!o||s)return;const u=n();if(u===null){s=!0,h("Play again","↻");return}r=setTimeout(l,u)},c=()=>{clearTimeout(r),r=void 0};i.addEventListener("click",()=>{if(s){n=e(),s=!1,a=!0,h("Pause","⏸"),c(),l();return}a=!a,h(a?"Pause":"Play",a?"⏸":"▶"),a?l():c()}),t.append(i);const d=typeof IntersectionObserver=="function"?new IntersectionObserver(u=>{for(const f of u)o=f.isIntersecting;o?r===void 0&&l():c()}):void 0;return d?.observe(t),l(),()=>{c(),d?.disconnect(),i.remove()}}function uh(t,e){const n=[];for(;n.length<e;){n.push("test");const a=Math.floor(t()*4);for(let s=0;s<a&&n.length<e;s+=1)n.push("clean")}return n}function mh(t){return`<ol class="small-steps" role="img" aria-label="Small steps: a test fails and is put right at once; clean steps between; again and again">${t.map(n=>`<li class="${n}"></li>`).join("")}</ol>`}const cs=40,fr=220,df=950,uf=2200,mf=45;function ff(t,{wipe:e=!0}={}){const n=t.map(()=>"empty"),a=[{marks:[...n],hold:fr}],s=o=>a.push({marks:[...n],hold:o});return t.forEach((o,r)=>{o==="test"?(n[r]="red",s(df),n[r]="fixed"):n[r]="clean",s(r===t.length-1?uf:fr)}),e&&t.forEach((o,r)=>{n[r]="empty",s(mf)}),a}const pr=3;function pf(t){const e=w("div",{class:"small-steps-row"});return t.replaceChildren(e),dh(t,()=>{e.innerHTML=mh(Array.from({length:cs},()=>"empty"));const a=[...e.querySelectorAll("li")],s=Array.from({length:pr},(r,i)=>ff(uh(Math.random,cs),{wipe:i<pr-1})).flat();let o=0;return()=>{const r=s[o++];return r?(r.marks.forEach((i,h)=>{const l=a[h];l&&l.className!==i&&(l.className=i)}),r.hold):null}})}const gf=()=>mh(uh(tn(2026),cs).map(t=>t==="test"?"green":"clean")),wf={name:"small-steps",apps:{"small-steps":pf},stills:{"small-steps":gf}},La=-100,Na=100,Pa=(t,e,n)=>`${t},${e},${n}`;class yf{#t;#e=[{a:2,b:4,c:8}];#n=null;#a=0;constructor(e){this.#t=e}get rows(){return this.#e.map(({a:e,b:n,c:a})=>({a:e,b:n,c:a,holds:this.#t.holds(e,n,a),last:Pa(e,n,a)===this.#n})).sort((e,n)=>Number(n.holds)-Number(e.holds)||e.a-n.a||e.b-n.b||e.c-n.c)}test(e,n,a){return[e,n,a].some(Number.isNaN)?"Ops! Invalid numbers.":(this.#n=Pa(e,n,a),this.#e.some(s=>Pa(s.a,s.b,s.c)===this.#n)?"Ops! Sequence already present.":(this.#e.push({a:e,b:n,c:a}),""))}guess(e){if(this.#a>=this.#e.length)return"Ops! Add another sequence test before a guess.";const n="Ops! Cannot compile rule, please check your javascript rule or console for more information.";let a;try{a=new Function(`'use strict';return (a,b,c) => ${e}`)()}catch{return n}this.#a+=1;try{for(let s=La;s<=Na;s+=1)for(let o=La;o<=Na;o+=1)for(let r=La;r<=Na;r+=1)if(a(s,o,r)!==this.#t.holds(s,o,r))return"Ops! This is not the rule. Test more sequences and guess again."}catch{return n}return`Good! "${e}" is the rule.`}}function fh(t){return`<table class="guess-table"><thead><tr><th>a,</th><th>b,</th><th>c</th><th></th></tr></thead><tbody>${t.map(({a:n,b:a,c:s,holds:o,last:r})=>`<tr${r?' class="last"':""}><td>${n},</td><td>${a},</td><td>${s}</td><td>${o?"✅":"❌"}</td></tr>`).join("")}</tbody></table>`}const bf=t=>({text:t,holds:new Function("a","b","c",`return ${t};`)}),Ra=["a < b && b < c","a + 1 < b && b + 1 < c","a + 1 < b && b + 2 < c","a <= b && b <= c","a <= b && b < c","a < b && b <= c","2 * a === b && 2 * b === c","a > 0 && b > 0 && c > 0","a === 2","b === 4","c === 8","c > 3","a + b + c > 5","a + b + c >= 5","a + b < c","a + b <= c","c - a > b","a * b === c","a * b <= c","a * b >= c","a !== b && b !== c && a !== c","a === 2 && b === 4 && c === 8","a % 2 === 0 && b % 2 === 0 && c % 2 === 0"].map(bf);function vf(t,e=Math.random){const n=new yf(Ra[Math.floor(Ra.length*e())]??Ra[0]),a=w("div",{class:"guess-rows"}),s=(g,b)=>w("input",{type:"number",value:g,"aria-label":b}),[o,r,i]=[s(2,"a"),s(4,"b"),s(8,"c")],h=w("p",{class:"guess-said","data-said":"test",hidden:!0}),l=w("input",{type:"text",value:"true",spellcheck:!1,autocapitalize:"off","aria-label":"The rule, in JavaScript"}),c=w("p",{class:"guess-said","data-said":"guess",hidden:!0}),d=(g,b)=>{g.textContent=b,g.hidden=!b,g.classList.toggle("good",b.startsWith("Good!"))},u=()=>{a.innerHTML=fh(n.rows)},f=()=>{d(h,n.test(Number(o.value),Number(r.value),Number(i.value))),u()},m=()=>d(c,n.guess(l.value)),p=w("button",{type:"button",class:"test",onclick:f},"Test"),y=w("button",{type:"button",class:"guess",onclick:m},"Guess");for(const g of[o,r,i])g.addEventListener("keydown",b=>b.key==="Enter"&&f());l.addEventListener("keydown",g=>g.key==="Enter"&&m()),t.replaceChildren(w("div",{class:"guess-the-rule"},w("h4",{},"Sequence numbers and their result:"),a,w("h4",{},"Propose a new sequence:"),w("p",{class:"guess-sequence"},"a: ",o,", b: ",r,", c: ",i," ",p),h,w("h4",{},"Propose a rule:"),w("p",{class:"guess-rule"},l," ",y),c,w("p",{class:"guess-note"},"Write any valid javascript expression that evaluates true or false. Use variables a, b and c in the expression."))),u()}const kf=()=>`<div class="guess-the-rule"><h4>Sequence numbers and their result:</h4>${fh([{a:2,b:4,c:8,holds:!0,last:!1}])}<p class="guess-note">The rule is drawn, and the guessing played, when the page runs.</p></div>`,xf={name:"guess-the-rule",apps:{"guess-the-rule":t=>vf(t)},stills:{"guess-the-rule":kf}};class $f{listeners=new Set;send(e){for(const n of[...this.listeners])n(e)}on(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}}const ds=new $f,Tf=900,Sf=480,Cn={x:1600,y:1e3};function On(t,e){return(t%e+e)%e}class Mf{x=0;y=0;written="";driving=!1;follow({byRadians:e,tiltedBy:n,seconds:a}){const s=document.documentElement;if(s.dataset.sky!=="stars")return;this.driving||this.takeOver(s);const o=Tf/(Math.PI*2),r=(a/Sf*Math.PI*2+e)*o;this.x=On(this.x+r,Cn.x),this.y=On(this.y-n*o,Cn.y);const i=`${(Math.round(this.x*2)/2).toFixed(1)}px ${(Math.round(this.y*2)/2).toFixed(1)}px`;if(i===this.written)return;this.written=i;const[h,l]=i.split(" ");s.style.setProperty("--sky-x",h??"0px"),s.style.setProperty("--sky-y",l??"0px")}release(){const e=document.documentElement;e.classList.remove("sky-driven"),e.style.removeProperty("--sky-x"),e.style.removeProperty("--sky-y"),this.x=0,this.y=0,this.written="",this.driving=!1}takeOver(e){const n=getComputedStyle(document.body,"::before").transform;if(n&&n!=="none")try{const a=new DOMMatrixReadOnly(n);this.x=On(a.m41,Cn.x),this.y=On(a.m42,Cn.y)}catch{}e.classList.add("sky-driven"),this.driving=!0}}function Af(t){return ds.on(e=>t.follow(e))}const gr=new Mf,If={name:"sky",install:()=>Af(gr),arrive:()=>gr.release()},{width:wr,height:Ln,pad:ve}=Ss;function Ef(t,e){const n=Math.max(...t.map(c=>c.values.length),1),a=Math.max(1,...t.flatMap(c=>c.values)),s=wr-ve.left-ve.right,o=Ln-ve.top-ve.bottom,r=c=>ve.left+c/Math.max(1,n-1)*s,i=c=>ve.top+o-c/a*o,h=t.map(c=>{const d=c.values.map((u,f)=>`${r(f).toFixed(1)},${i(u).toFixed(1)}`).join(" ");return`<polyline class="line ${c.className}" points="${d}"><title>${c.name}</title></polyline>`}).join(""),l=t.map((c,d)=>`<rect class="${c.className}" x="${ve.left+d*90}" y="${Ln-ve.bottom+20}" width="10" height="3"/><text x="${ve.left+d*90+14}" y="${Ln-ve.bottom+24}">${c.name}</text>`).join("");return`<svg viewBox="0 0 ${wr} ${Ln}" role="img" aria-label="${e.y} by ${e.x}">${$i(a,e,n,Ts(a))}${h}${l}</svg>`}const Fa=20;function jf(t){const{baseTime:e,shortcutFactor:n,interestRate:a,timeHorizon:s}=t,o=[];let r=null;const i=e;let h=e*(1-n),l=0,c=0,d=0,u=0,f=0,m=0;for(let p=0;p<s*Fa;){for(;f<=p;)l+=1,d+=1,f+=i;for(;m<=p;)c+=1,u+=1,m+=h,h*=1+a;if(p+=1,p%Fa===0){const y=p/Fa;o.push({month:y,cleanCumulative:l,debtCumulative:c,cleanMonthly:d,debtMonthly:u,debtFeatureCost:h}),d=0,u=0,r===null&&l>c&&(r=y)}}return{months:o,breakEvenMonth:r}}const yr=t=>jf({baseTime:Number(t["base-time"]),shortcutFactor:Number(t.shortcuts)/100,interestRate:Number(t.interest)/100,timeHorizon:Number(t.timeline)}),br=({months:t})=>`<div class="chart"><h4>Cumulative features</h4>${Ef([{name:"Clean",className:"clean",values:t.map(e=>e.cleanCumulative)},{name:"Debt-driven",className:"debt",values:t.map(e=>e.debtCumulative)}],{x:"Months",y:"Features"})}</div>`,Cf={name:"technical-debt",summary:"what shortcuts cost, compounded: two teams build the same features, one of them cutting corners",parameters:[{name:"base-time",label:"Base time",description:"days a feature takes when it is done properly",min:1,max:30,step:1,initial:20,show:t=>`${t} days`},{name:"shortcuts",label:"Shortcuts",description:"percent of that time a shortcut saves, at first",min:0,max:90,step:5,initial:25,show:t=>`${t}%`},{name:"interest",label:"Interest",description:"percent dearer every shortcut feature makes the next one",min:0,max:100,step:1,initial:10,show:t=>`${t}%`},{name:"timeline",label:"Timeline",description:"months to look ahead",min:6,max:60,step:1,initial:24,show:t=>`${t} months`}],run(t){const e=Number(t.shortcuts),n=Number(t.interest),a=Number(t.timeline),s=yr(t),{months:o,breakEvenMonth:r}=s,i=o[o.length-1],h=i?.cleanCumulative??0,l=i?.debtCumulative??0,c=h>0?(h-l)/h*100:0,d=Math.abs(c)<.1,u=d?"even":c>0?"loss":"gain",f=d?"≈0%":`${Math.abs(c).toFixed(1)}%`,m=r?`month ${r}`:"never",p=n===0?"With no interest there is no compound slowdown, and the shortcut simply wins. That is the one case that does not happen to real code.":r?`${e}% saved at first, ${n}% interest on every feature: clean development overtakes at month ${r}, and by month ${a} the shortcut road has delivered ${f} less.`:`${e}% saved at first, ${n}% interest on every feature: in ${a} months the clean road has not yet caught up. Give it longer, or raise the interest.`,y=[`<div class="clean"><strong>${h}</strong>clean features</div>`,`<div class="debt"><strong>${l}</strong>debt features</div>`,`<div><strong>${m}</strong>break-even</div>`,`<div><strong>${f}</strong>${u} on the shortcut road</div>`].join(""),g=Ti([{name:"Clean",className:"clean",values:o.slice(1).map(b=>b.cleanMonthly)},{name:"Debt-driven",className:"debt",values:o.slice(1).map(b=>b.debtMonthly)}],{x:"Months",y:"Features a month"});return{text:`clean ${h} features, debt-driven ${l}, break-even ${m}
${p}`,html:`<div class="figures">${y}</div><div class="charts">${br(s)}<div class="chart"><h4>Monthly delivery rate</h4>${g}</div></div><p>${p}</p>`,data:{cleanFeatures:h,debtFeatures:l,breakEvenMonth:r,months:o}}},glance:t=>br(yr(t))},Of={name:"technical-debt",programs:[Cf]},Lf="theme";function ph(){const t=document.documentElement,e=t.dataset.pageTheme;let n=null;try{n=localStorage.getItem(Lf)}catch{n=null}const a=e??(n==="light"||n==="dark"||n==="pink"?n:null);a?t.dataset.theme=a:delete t.dataset.theme}function Vt(...t){return t.map(e=>e.replace(/^[a-z]+:\/\//,"").replace(/^\/+|\/+$/g,"")).filter(Boolean).join("-")}const Nf=1e4,us=[];let Dt=null;function vr(){const t=window.goatcounter?.count;if(!t)return!1;for(const e of us.splice(0))t({path:e,title:e,event:!0});return!0}function Xt(t){if(us.push(t),vr()||Dt)return;const e=Date.now();Dt=setInterval(()=>{(vr()||Date.now()-e>Nf)&&(Dt&&clearInterval(Dt),Dt=null,us.splice(0))},250)}const ms="theme";function Pf(){return window.matchMedia("(prefers-color-scheme: dark)").matches}function Rf(){let t=null;try{t=localStorage.getItem(ms)}catch{t=document.documentElement.dataset.theme??null}return t==="light"||t==="dark"?t:t==="pink"?"light":Pf()?"dark":"light"}class Ff{apply(e){const n=e==="toggle"?Rf()==="dark"?"light":"dark":e;try{n==="system"?localStorage.removeItem(ms):localStorage.setItem(ms,n)}catch{}return ph(),Xt(Vt("theme","set",n)),n}}function Bf(){let t=null;try{t=localStorage.getItem("theme")}catch{}Xt(Vt("theme","start",t??"system"))}function Df(t){const e=document.querySelector(".theme-toggle");return e?(e.classList.add("ready"),e.removeAttribute("aria-hidden"),e.removeAttribute("tabindex"),e.addEventListener("click",t),()=>e.removeEventListener("click",t)):()=>{}}const fs=["light","dark","system","pink"];function Hf(t){return fs.includes(t)}const Wf={light:"☀︎",dark:"☾︎",system:"◐︎",pink:"❀︎"};function kr(t){const e=n=>`${Wf[n]} ${n}`;return{text:`theme   ${fs.map(n=>n===t?`[${e(n)}]`:e(n)).join("   ")}`,html:`<pre class="choices">theme   ${fs.map(n=>n===t?`<strong aria-current="true">${e(n)}</strong>`:`<a href="#" data-run="theme ${n}" title="theme ${n}">${e(n)}</a>`).join("   ")}</pre>`}}function qf(t){return{name:"theme",usage:"theme [light|dark|system|pink|auto]",description:"switch the colours, or toggle them",run({site:e,cwd:n},[a]){const s=e.at(n)?.fields.theme;if(s)return{text:`theme: this page keeps its own, ${s}. It works everywhere else.`,error:!0};if(a===void 0)return kr(t.apply("toggle"));const o=a==="auto"?"system":a;return Hf(o)?kr(t.apply(o)):{text:`theme: ${a}: choose light, dark, system or pink`,error:!0}}}}const _f={name:"theme",commands:[qf(new Ff)],install:t=>(Bf(),Df(()=>t.run("theme"))),arrive:()=>ph()},xr=[{machine:"small",algorithm:"pairs",vertices:8,graphs:150,serial:42.43,openmp:14.34,cuda:2.572},{machine:"small",algorithm:"pairs",vertices:16,graphs:150,serial:738.92,openmp:247.95,cuda:33.06},{machine:"small",algorithm:"pairs",vertices:24,graphs:150,serial:4387.13,openmp:1208.97,cuda:109.093},{machine:"large",algorithm:"pairs",vertices:8,graphs:150,serial:7.483,openmp:1.511,cuda:.653},{machine:"large",algorithm:"pairs",vertices:16,graphs:150,serial:135.505,openmp:25.061,cuda:5.24},{machine:"large",algorithm:"pairs",vertices:24,graphs:150,serial:515.757,openmp:126.228,cuda:18.99},{machine:"small",algorithm:"common-labelling",vertices:8,graphs:50,serial:843.21,openmp:214.51,cuda:33.404},{machine:"small",algorithm:"common-labelling",vertices:16,graphs:50,serial:17061.4,openmp:4284.01,cuda:550.153},{machine:"small",algorithm:"common-labelling",vertices:24,graphs:50,serial:71670.13,openmp:20274.32,cuda:2332.076}],zf={small:"Intel Atom 330, 2 cores, 8 W · NVIDIA 9400M, 16 cores, 10 W",large:"Intel i7 950, 4 cores, 130 W · NVIDIA GT 430, 96 cores, 49 W"},Gf={pairs:t=>`Matching every pair of ${t} graphs`,"common-labelling":t=>`Finding one labelling common to ${t} graphs`};function Ba(t){if(t<10)return`${t.toFixed(1)} s`;if(t<60)return`${Math.round(t)} s`;const e=Math.floor(t/60);return e<60?e<10?`${e} min ${Math.round(t-e*60)} s`:`${Math.round(t/60)} min`:`${Math.floor(e/60)} h ${e%60} min`}const Yf=t=>`×${t>=10?Math.round(t):t.toFixed(1)}`;function $r(t){const e=Math.max(...t.map(s=>s.serial/s.cuda)),n=(s,o)=>`<span class="bar ${o}" style="--p:${(s/e).toFixed(3)}"></span><span class="factor">${Yf(s)}</span>`;return`<figure class="runs"><table class="runs"><thead><tr><th>each graph has</th><th>one thread</th><th>OpenMP, every core</th><th>CUDA, the graphics card</th></tr></thead>${[...new Set(t.map(s=>`${s.algorithm}/${s.machine}`))].map(s=>{const o=t.filter(l=>`${l.algorithm}/${l.machine}`===s),{algorithm:r,machine:i}=o[0],h=o.map(l=>`<tr><th scope="row">${l.vertices} vertices</th><td>${Ba(l.serial)}</td><td>${Ba(l.openmp)}<div class="speedup">${n(l.serial/l.openmp,"openmp")}</div></td><td>${Ba(l.cuda)}<div class="speedup">${n(l.serial/l.cuda,"cuda")}</div></td></tr>`).join("");return`<tbody><tr class="group"><th colspan="4">${Gf[r](o[0]?.graphs??0)}<span>${zf[i]}</span></th></tr>${h}</tbody>`}).join("")}</table><figcaption>Measured in 2011, on graphs of the GREC dataset. Each bar is how many times faster than one thread of the same machine, and all the bars are on one scale.</figcaption></figure>`}const Uf={name:"thesis-results",stills:{"graph-matching-runs":()=>$r(xr)},apps:{"graph-matching-runs":t=>{t.firstChild||(t.innerHTML=$r(xr))}}},ps={variable:"tn",atLeast:!0,threshold:20,months:[0,1,2,3,4,5,6,7,8,9,10,11]};function Jf(t,e){const n=t.map(({value:m})=>m),a=Math.floor(Math.min(...n,...(e.spans??[]).map(({value:m})=>m))),s=Math.ceil(Math.max(...n,a+1)),o=bi(t.map(({year:m})=>m),a,s),{x:r,y:i,slot:h}=o,l=m=>r(m)+h/2,c=[];for(const m of t){const p=c[c.length-1];p&&p[p.length-1]?.year===m.year-1?p.push(m):c.push([m])}const d=c.map(m=>`<polyline class="line" points="${m.map(({year:p,value:y})=>`${E(l(p))},${E(i(y))}`).join(" ")}"/>`).join(""),u=t.map(({year:m,value:p,title:y,partial:g})=>`<circle class="dot${g?" partial":""}" cx="${E(l(m))}" cy="${E(i(p))}" r="3.5"><title>${y}</title></circle>`).join(""),f=o.levels(e.spans??[]);return o.wrap(e.label,`${d}${u}${f}`)}function Kf(t,{threshold:e,atLeast:n},a){if(!t)return 0;const[s=0,...o]=t;return o.reduce((r,i,h)=>s+h*a>=e-1e-9===n?r+i:r,0)}const yt={tn:{code:1002,unit:"°C",name:"daily minimum",summary:"mean",bin:.5,range:[-30,35]},tx:{code:1001,unit:"°C",name:"daily maximum",summary:"mean",bin:.5,range:[-25,50]},pp:{code:1300,unit:"mm",name:"daily rain",summary:"sum",bin:.5,range:[0,250]},pi:{code:1303,unit:"mm/h",name:"most rain in one hour",summary:"max",bin:.5,range:[0,100]}},Vf=.95,Xf=(t,e)=>new Date(Date.UTC(t,e+1,0)).getUTCDate(),Le=t=>t.reduce((e,n)=>e+n,0);function Zf(t,e){return t.length===0?null:e==="sum"?Le(t.map(({figure:n})=>n)):e==="max"?Math.max(...t.map(({figure:n})=>n)):Le(t.map(({figure:n,weight:a})=>n*a))/Le(t.map(({weight:n})=>n))}function Qf(t,e){const n=yt[e.variable];return Object.entries(t.years).flatMap(([a,s])=>{const o=s[e.variable];if(!o)return[];const r=Number(a),i=o.months.map(m=>({days:Kf(m,e,n.bin),measured:Le(m?.slice(1)??[])})),h=m=>e.months.includes(m),l=Le(i.filter((m,p)=>h(p)).map(m=>m.measured)),c=Le(e.months.map(m=>Xf(r,m))),d=Le(i.filter((m,p)=>h(p)).map(m=>m.days)),u=o.summaries.flatMap((m,p)=>h(p)&&m!==null?[{figure:m,weight:i[p]?.measured??0}]:[]),f=Zf(u,n.summary);return[{year:r,days:d,elsewhere:Le(i.map(m=>m.days))-d,measured:l,expected:c,whole:l/c>=Vf,summary:f,months:i}]}).sort((a,s)=>a.year-s.year)}const Tr=["January","February","March","April","May","June","July","August","September","October","November","December"];function Sr(t){const{name:e,unit:n}=yt[t.variable],a=t.variable==="pi"?"":"a ",s=t.atLeast?`of ${t.threshold} ${n} or more`:`below ${t.threshold} ${n}`,o=Tr[t.months[0]??0],r=Tr[t.months[t.months.length-1]??11],i=t.months.length===12?"whole year":`${o} to ${r}`;return`days with ${a}${e} ${s}, ${i}`}const gh=["January","February","March","April","May","June","July","August","September","October","November","December"],ep=.55;function tp(t,e,{days:n,measured:a}){const s=`${gh[e]} ${t}`;if(a===0)return`<td class="none" title="${s}: not measured"></td>`;const o=Math.round(n/a*1e3)/1e3;return`<td${o>=ep?' class="deep"':""} style="--v:${o}" title="${s}: ${n} of ${a} days">${n||""}</td>`}function np(t,e){const n=`<tr><th></th>${gh.map(s=>`<th scope="col">${s.slice(0,3)}</th>`).join("")}</tr>`,a=[...t].reverse().map(({year:s,months:o})=>`<tr><th scope="row">${s}</th>${o.map((r,i)=>tp(s,i,r)).join("")}</tr>`);return`<table class="heat calendar${e?" warm":""}"><thead>${n}</thead><tbody>${a.join("")}</tbody></table>`}const Mr=t=>t.reduce((e,n)=>e+n,0)/t.length;function Ar(t){const e=t.flatMap(({summary:n})=>n===null?[]:[n]);return{from:t[0]?.year??0,to:t[t.length-1]?.year??0,years:t.length,days:Mr(t.map(({days:n})=>n)),summary:e.length?Mr(e):null}}function ap(t){const e=t.filter(a=>a.whole);if(e.length<4)return null;const n=Math.floor(e.length/2);return[Ar(e.slice(0,n)),Ar(e.slice(n))]}const sp=["January","February","March","April","May","June","July","August","September","October","November","December"],op={mean:"The mean",sum:"The total",max:"The highest"},Jt=t=>String(Math.round(t*10)/10),rp=t=>`${t>0?"+":t<0?"−":""}${Jt(Math.abs(t))}`,ip=t=>`${Number(t.slice(8,10))} ${sp[Number(t.slice(5,7))-1]} ${t.slice(0,4)}`;function hp(t,e){const{unit:n,name:a}=yt[e.variable],s=Object.values(t.years).flatMap(i=>i[e.variable]?[i[e.variable].record]:[]),[o,r]=e.atLeast?s.map(([i,h])=>[i,h]).reduce((i,h)=>h[0]>i[0]?h:i):s.map(([,,i,h])=>[i,h]).reduce((i,h)=>h[0]<i[0]?h:i);return`<p class="record">The ${e.atLeast?"highest":"lowest"} ${a} on record here: ${o} ${n} on ${ip(r)}, whatever months are chosen.</p>`}function wh(t,e){const n=yt[e.variable],a=`<figcaption><strong>${t.name}</strong> · ${t.altitude} m, ${t.setting} · ${Sr(e)}</figcaption>`,s=Qf(t,e);if(s.length===0)return`<figure class="weather">${a}<p>This station has no ${n.name} on record.</p></figure>`;const o=ap(s),r=({from:m,to:p})=>`${m}–${p}`,i=o?'<div class="figures">'+o.map(m=>`<div><strong>${Jt(m.days)}</strong>days a year, ${r(m)}</div>`).join("")+`<div><strong>${rp(o[1].days-o[0].days)}</strong>days a year, from one half to the other</div></div>`:"",h=s.map(({year:m,days:p,elsewhere:y,measured:g,expected:b,whole:v})=>{const T=y>0?`, and ${y} more outside the months chosen`:"",S=v?"":`, with only ${g} of ${b} days measured`;return{year:m,value:p,partial:!v,title:`${m}: ${p} days${S}${T}`}}),l=(o??[]).map(m=>({from:m.from,to:m.to,value:m.days,label:`${Jt(m.days)} a year`})),c=s.flatMap(({year:m,summary:p,whole:y})=>p===null||!y?[]:[{year:m,value:p,title:`${m}: ${Jt(p)} ${n.unit}`}]),d=(o??[]).flatMap(m=>m.summary===null?[]:[{from:m.from,to:m.to,value:m.summary,label:`${Jt(m.summary)} ${n.unit}`}]),u=`${op[n.summary]} ${n.name} of each year, ${n.unit}`,f=(n.summary==="mean"?Jf:Qa)(c,{label:u,spans:d});return`<figure class="weather">${a}${i}<h4>Days a year</h4>${Qa(h,{label:`Days a year: ${Sr(e)}`,spans:l})}<h4>When in the year they fell</h4>${np(s,e.atLeast&&n.unit==="°C")}<h4>${u}, in the months chosen</h4>${f}`+hp(t,e)+"</figure>"}const Ir=[{id:"tropical-nights",name:"tropical nights",variable:"tn",atLeast:!0,threshold:20},{id:"torrid-nights",name:"torrid nights",variable:"tn",atLeast:!0,threshold:25},{id:"hot-days",name:"hot days",variable:"tx",atLeast:!0,threshold:30},{id:"torrid-days",name:"torrid days",variable:"tx",atLeast:!0,threshold:35},{id:"frost-days",name:"frost days",variable:"tn",atLeast:!1,threshold:0},{id:"rainy-days",name:"rainy days",variable:"pp",atLeast:!0,threshold:1},{id:"heavy-rain",name:"days of heavy rain",variable:"pp",atLeast:!0,threshold:20},{id:"downpours",name:"days with a downpour",variable:"pi",atLeast:!0,threshold:10}],dt=[{code:"WU",name:"Badalona - Museu",municipality:"Badalona",altitude:42,setting:"urban, by the sea"},{code:"X4",name:"Barcelona - el Raval",municipality:"Barcelona",altitude:33,setting:"dense city, on a roof"},{code:"X8",name:"Barcelona - Zona Universitària",municipality:"Barcelona",altitude:82,setting:"city edge"},{code:"D5",name:"Barcelona - Observatori Fabra",municipality:"Barcelona",altitude:410,setting:"wooded hill above the city"},{code:"UP",name:"Cabrils",municipality:"Cabrils",altitude:81,setting:"coastal slope, half rural"},{code:"XF",name:"Sabadell - Parc Agrari",municipality:"Sabadell",altitude:259,setting:"farmland beside a city"},{code:"XJ",name:"Girona",municipality:"Girona",altitude:72,setting:"market gardens by the city"},{code:"XE",name:"Tarragona - Complex Educatiu",municipality:"Tarragona",altitude:6,setting:"coast"},{code:"VK",name:"Raimat",municipality:"Lleida",altitude:286,setting:"inland plain, vineyards"}],Er=[["whole year",[0,1,2,3,4,5,6,7,8,9,10,11]],["June to August",[5,6,7]],["May to October",[4,5,6,7,8,9]],["December to February",[0,1,11]]],lp={tn:[-10,30],tx:[0,45],pp:[.5,100],pi:[.5,60]};function cp(t){const e=new Map,n=xs(t,"/data/weather/index.json"),a=w("div");a.append(...t.querySelectorAll("figure"));let s=null,o=ps,r=!1;const i=(g,b)=>w("option",{value:g},b),h=w("select",{onchange:()=>{p(h.value)}},...dt.map(({code:g,name:b})=>i(g,b))),l=w("select",{onchange:()=>{const g=Ir.find(({id:b})=>b===l.value);g&&m({variable:g.variable,atLeast:g.atLeast,threshold:g.threshold})}},...Ir.map(({id:g,name:b})=>i(g,b))),c=w("select",{onchange:()=>m({months:Er[Number(c.value)]?.[1]??ps.months})},...Er.map(([g],b)=>i(b,g))),d=w("output"),u=w("input",{type:"range",step:.5,oninput:()=>m({threshold:Number(u.value)})});function f(){const[g,b]=lp[o.variable];u.min=String(g),u.max=String(b),u.value=String(o.threshold),d.textContent=`${o.atLeast?"":"below "}${o.threshold} ${yt[o.variable].unit}${o.atLeast?" or more":""}`,s&&(a.innerHTML=wh(s,o))}function m(g){o={...o,...g},f()}async function p(g){const b=e.get(g)??fetch(`/data/weather/${g}.json`).then(v=>v.json());e.set(g,b);try{const v=await b;if(r||h.value!==g)return;s=v,f()}catch{e.delete(g),a.replaceChildren(w("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}const y=w("div",{class:"dials"},w("label",{},"Station",h),w("label",{},"Counting",l),w("label",{},"Threshold: ",d,u),w("label",{},"Months",c));return t.replaceChildren(y,a,n),p(h.value),()=>{r=!0}}function dp(t,e,[n,a]){if(t.length===0)return null;const s=Math.round((a-n)/e),o=new Map;for(const l of t){const c=Math.min(s-1,Math.max(0,Math.floor((l-n)/e+1e-9)));o.set(c,(o.get(c)??0)+1)}const r=Math.min(...o.keys()),i=Math.max(...o.keys());return[Math.round((n+r*e)*1e3)/1e3,...Array.from({length:i-r+1},(l,c)=>o.get(r+c)??0)]}const jr="7bvh-jvq2",yh=5e4,Cr=Object.entries(yt),up="No representatiu",mp=["Representatiu",""],fp=(t,e)=>Math.round(t*10**e)/10**e;function pp(t,e){if(t.length===0)return null;if(e==="max")return Math.max(...t);const n=t.reduce((a,s)=>a+s,0);return fp(e==="sum"?n:n/t.length,2)}function gp(t,e){const n=Array.from({length:12},(o,r)=>t.filter(({date:i})=>Number(i.slice(5,7))===r+1).map(({value:i})=>i)),a=t.reduce((o,r)=>r.value>o.value?r:o),s=t.reduce((o,r)=>r.value<o.value?r:o);return{months:n.map(o=>dp(o,e.bin,e.range)),summaries:n.map(o=>pp(o,e.summary)),record:[a.value,a.date,s.value,s.date]}}function wp(t){if(!Array.isArray(t))throw new Error("the portal did not answer with rows");if(t.length>=yh)throw new Error("the answer was cut short at the limit");const e=t;if(!e.some(s=>s.data_lectura?.slice(5,7)==="12"))throw new Error("the year does not reach December yet");const n=new Map,a=new Set;for(const s of e){const o=s.estat??"";if(o===up)continue;if(!mp.includes(o))throw new Error(`the network marks days as "${o}", which nobody has decided how to read`);const r=s.data_lectura?.slice(0,10)??"",i=`${s.codi_estacio}/${s.codi_variable}`;if(a.has(`${i}/${r}`))throw new Error(`${i} has ${r} twice`);a.add(`${i}/${r}`);const h=Number(s.valor);Number.isFinite(h)&&n.set(i,[...n.get(i)??[],{date:r,value:h}])}return n}const yp={name:"weather",directory:"public/data/weather",firstYear:1988,files:dt.map(t=>`${t.code}.json`),about:{measures:"daily minimum and maximum temperature, daily rain, most rain in one hour",network:"Xarxa d'Estacions Meteorològiques Automàtiques (XEMA)",attribution:"Servei Meteorològic de Catalunya (XEMA). Dades obertes de la Generalitat de Catalunya.",dataset:`https://analisi.transparenciacatalunya.cat/d/${jr}`,stations:dt},requestsFor(t){const e=dt.map(a=>`'${a.code}'`).join(","),n=Cr.map(([,a])=>a.code).join(",");return[ki(jr,{select:"codi_estacio,codi_variable,data_lectura,valor,estat",where:`codi_estacio in (${e}) and codi_variable in (${n}) and data_lectura between '${t}-01-01T00:00:00' and '${t}-12-31T23:59:59'`,limit:yh})]},withYear(t,e,n){const a=wp(n[0]);return Object.fromEntries(dt.map(s=>{const o=`${s.code}.json`,r=Cr.flatMap(([l,c])=>{const d=a.get(`${s.code}/${c.code}`);return d?[[l,gp(d,c)]]:[]}),i=Object.fromEntries(r),h={...t[o]?.years,...r.length?{[e]:i}:{}};return[o,{...s,years:h}]}))}},bp=t=>{const e=JSON.parse(t(`/data/weather/${dt[0]?.code}.json`)),n=JSON.parse(t("/data/weather/index.json"));return wh(e,ps)+Kn(n)},vp={name:"weather",apps:{weather:cp},stills:{weather:bp},sources:[yp]},Da="header-world",Bn={saved(){try{const t=localStorage.getItem(Da);if(!t)return null;const e=JSON.parse(t);return[e.seed,e.levels,e.roughness,e.share].every(a=>typeof a=="number"&&Number.isFinite(a))?e:null}catch{return null}},remember(t){try{localStorage.setItem(Da,JSON.stringify(t))}catch{}},forget(){try{localStorage.removeItem(Da)}catch{}}};function bh(t,e,n){const a=t.mesh.faces[n*3]??0,s=t.mesh.faces[n*3+1]??0,o=t.mesh.faces[n*3+2]??0;return((e[a]??0)+(e[s]??0)+(e[o]??0))/3}function kp(t,e){return bh(t,t.mesh.radii,e)}const xp=[24,92,168],$p=[62,176,206],Tp=[214,196,138],Or=[190,158,84],Ha=[70,138,66],Sp=[74,104,76],Mp=[136,128,116],Lr=[238,243,247];function Ue(t,e,n){const a=Math.min(1,Math.max(0,n));return[t[0]+(e[0]-t[0])*a,t[1]+(e[1]-t[1])*a,t[2]+(e[2]-t[2])*a]}function Ap(t){return t>.78?Or:t>.62?Ue(Ha,Or,(t-.62)/.16):t>.3?Ha:Ue(Sp,Ha,(t-.12)*5.5)}const vh=t=>{const e=new Uint8ClampedArray(t.mesh.faceCount*3),n=t.mesh.radii.reduce((s,o)=>Math.max(s,o),-1/0),a=Math.max(1e-6,n-t.seaRadius);for(let s=0;s<t.mesh.faceCount;s+=1){const o=(kp(t,s)-t.seaRadius)/a,r=bh(t,t.temperature,s);let i;o<=.002?(i=Ue($p,xp,.55),r<.16&&(i=Ue(i,Lr,(.16-r)*6))):(i=Ue(Tp,Ap(r),Math.min(1,o*9)),i=Ue(i,Mp,Math.max(0,o-.55)*2.2),r<.26&&(i=Ue(i,Lr,(.26-r)*4))),e[s*3]=i[0],e[s*3+1]=i[1],e[s*3+2]=i[2]}return{...t,faceColour:e}};function kh(t,e){const n=new Float32Array(t.length*3),a=new Float32Array(t.length),s=new Float32Array(t.length);t.forEach((r,i)=>{n[i*3]=r.direction[0],n[i*3+1]=r.direction[1],n[i*3+2]=r.direction[2],a[i]=r.radius,s[i]=r.surface});const o=new Uint32Array(e.length*3);return e.forEach(([r,i,h],l)=>{o[l*3]=r,o[l*3+1]=i,o[l*3+2]=h}),{directions:n,radii:a,surface:s,faces:o,faceCount:e.length,vertexCount:t.length}}const Ip=(t,e)=>(t+e)/2;function Ep(t,e,n=Ip){const a=Array.from({length:t.vertexCount},(i,h)=>({direction:[t.directions[h*3]??0,t.directions[h*3+1]??0,t.directions[h*3+2]??0],radius:t.radii[h]??1,surface:t.surface[h]??0})),s=new Map,o=(i,h)=>{const l=i<h?`${i}:${h}`:`${h}:${i}`,c=s.get(l);if(c!==void 0)return c;const d=a[i],u=a[h],[f,m,p]=d.direction,[y,g,b]=u.direction,v=Math.hypot(f*d.radius-y*u.radius,m*d.radius-g*u.radius,p*d.radius-b*u.radius),[T,S,A]=[(f+y)/2,(m+g)/2,(p+b)/2],k=Math.hypot(T,S,A)||1,I=n(d.surface,u.surface);a.push({direction:[T/k,S/k,A/k],radius:(d.radius+u.radius)/2+e(v),surface:I});const O=a.length-1;return s.set(l,O),O},r=[];for(let i=0;i<t.faceCount;i+=1){const h=t.faces[i*3],l=t.faces[i*3+1],c=t.faces[i*3+2],d=o(h,l),u=o(l,c),f=o(c,h);r.push([h,d,f],[l,u,d],[c,f,u],[d,u,f])}return kh(a,r)}function jp(t,e){return{...t,mesh:e,temperature:new Float32Array(e.vertexCount),faceColour:new Uint8ClampedArray(e.faceCount*3)}}const xh=(t=4,e=.28,n=.2)=>a=>{const s=tn(a.seed);let o=a.mesh;const r=Float32Array.from(o.surface,()=>s());o={...o,surface:r};for(let i=0;i<t;i+=1)o=Ep(o,h=>h*e*(s()-.5),(h,l)=>{const c=.5+(s()-.5)*(h-l)*n;return Math.min(1,Math.max(0,h*(1-c)+l*c))});return jp(a,o)},$h=(t=.55)=>e=>{const n=Float32Array.from(e.mesh.radii).sort(),a=Math.min(n.length-1,Math.floor(n.length*t)),s=n[a]??1,o=Float32Array.from(e.mesh.radii,r=>Math.max(r,s));return{...e,mesh:{...e.mesh,radii:o},seaRadius:s}};function Cp(t,e){return Math.abs(t.mesh.directions[e*3+1]??0)}const Th=({equator:t=1,pole:e=.05,peak:n=0}={})=>a=>{const s=new Float32Array(a.mesh.vertexCount),o=a.mesh.radii,r=o.reduce((l,c)=>Math.min(l,c),1/0),h=o.reduce((l,c)=>Math.max(l,c),-1/0)-r||1;for(let l=0;l<a.mesh.vertexCount;l+=1){const c=((o[l]??1)-r)/h,d=Cp(a,l)**2.2;s[l]=t+(e-t)*d+(n-t)*c}return{...a,temperature:s}},ue=(1+Math.sqrt(5))/2,Op=[[-1,ue,0],[1,ue,0],[-1,-ue,0],[1,-ue,0],[0,-1,ue],[0,1,ue],[0,-1,-ue],[0,1,-ue],[ue,0,-1],[ue,0,1],[-ue,0,-1],[-ue,0,1]],Lp=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];function Np(){const t=Op.map(([e,n,a])=>{const s=Math.hypot(e,n,a);return{direction:[e/s,n/s,a/s],radius:1,surface:0}});return kh(t,Lp.map(e=>[...e]))}function Pp(t){const e=Np();return{seed:t,mesh:e,temperature:new Float32Array(e.vertexCount),faceColour:new Uint8ClampedArray(e.faceCount*3),seaRadius:0}}const Rp=[xh(),$h(),Th(),vh];function Fp(t,e=Rp){return e.reduce((n,a)=>a(n),Pp(t))}function Sh(t){return Fp(t.seed,[xh(t.levels,t.roughness),$h(t.share),Th(),vh])}const Nr=.3,Bp=[-.5,.45,.74],Dp=1.02;class js{size;pixels;depth;view=new Float32Array(0);screen=new Float32Array(0);constructor(e,n=new Uint8ClampedArray(e*e*4)){if(n.length!==e*e*4)throw new Error(`SphereRaster: ${e}×${e} needs ${e*e*4} bytes, not ${n.length}`);this.size=e,this.pixels=n,this.depth=new Float32Array(e*e)}paint(e,n){const{size:a,pixels:s,depth:o}=this;s.fill(0),o.fill(-1/0);const[r,i,h]=Hp(n.light??Bp),l=n.tilt??-.38,c=Math.cos(l),d=Math.sin(l),u=Math.cos(n.rotation),f=Math.sin(n.rotation),{directions:m,radii:p,faces:y,faceCount:g,vertexCount:b}=e.mesh;let v=1;for(let k=0;k<b;k+=1){const I=p[k]??1;I>v&&(v=I)}const T=a/(2*v*Dp);this.view.length<b*3&&(this.view=new Float32Array(b*3),this.screen=new Float32Array(b*3));const S=this.view,A=this.screen;for(let k=0;k<b;k+=1){const I=p[k]??1,O=(m[k*3]??0)*I,H=(m[k*3+1]??0)*I,C=(m[k*3+2]??0)*I,M=O*u-C*f,L=O*f+C*u,$=H*c+L*d,j=-H*d+L*c;S[k*3]=M,S[k*3+1]=$,S[k*3+2]=j,A[k*3]=a/2+M*T,A[k*3+1]=a/2-$*T,A[k*3+2]=j}for(let k=0;k<g;k+=1){const I=y[k*3]??0,O=y[k*3+1]??0,H=y[k*3+2]??0,C=A[I*3],M=A[I*3+1],L=A[I*3+2],$=A[O*3],j=A[O*3+1],N=A[O*3+2],P=A[H*3],B=A[H*3+1],_=A[H*3+2],J=($-C)*(B-M)-(j-M)*(P-C);if(J>=0)continue;const Ie=S[I*3],Ve=S[I*3+1],bt=S[I*3+2],vt=S[O*3]-Ie,nn=S[O*3+1]-Ve,kt=S[O*3+2]-bt,Xe=S[H*3]-Ie,Ze=S[H*3+1]-Ve,Fe=S[H*3+2]-bt,xt=nn*Fe-kt*Ze,W=kt*Xe-vt*Fe,q=vt*Ze-nn*Xe,z=Math.hypot(xt,W,q)||1,Z=xt/z*r+W/z*i+q/z*h,xe=Nr+(1-Nr)*Math.max(0,Z),Qe=(e.faceColour[k*3]??0)*xe,an=(e.faceColour[k*3+1]??0)*xe,Fh=(e.faceColour[k*3+2]??0)*xe,Bh=Math.max(0,Math.floor(Math.min(C,$,P))),Dh=Math.min(a-1,Math.ceil(Math.max(C,$,P))),Hh=Math.max(0,Math.floor(Math.min(M,j,B))),Wh=Math.min(a-1,Math.ceil(Math.max(M,j,B)));for(let sn=Hh;sn<=Wh;sn+=1)for(let on=Bh;on<=Dh;on+=1){const Zn=on+.5,Qn=sn+.5,qh=($-C)*(Qn-M)-(j-M)*(Zn-C),Os=(P-$)*(Qn-j)-(B-j)*(Zn-$),Ls=(C-P)*(Qn-B)-(M-B)*(Zn-P);if(qh>0||Os>0||Ls>0)continue;const Ns=Os/J,Ps=Ls/J,Rs=L*Ns+N*Ps+_*(1-Ns-Ps),et=sn*a+on;Rs<=o[et]||(o[et]=Rs,s[et*4]=Qe,s[et*4+1]=an,s[et*4+2]=Fh,s[et*4+3]=255)}}return s}}function Hp([t,e,n]){const a=Math.hypot(t,e,n)||1;return[t/a,e/a,n/a]}const Wp=.2,qp=.36,_p=[{upTo:20,dark:4,bright:12},{upTo:70,dark:6,bright:14},{upTo:160,dark:2,bright:10},{upTo:198,dark:3,bright:11},{upTo:275,dark:1,bright:9},{upTo:330,dark:5,bright:13},{upTo:360,dark:4,bright:12}];function zp(t,e,n){const a=Math.max(t,e,n),s=Math.min(t,e,n),o=(a+s)/2/255;if((a===0?0:(a-s)/a)<Wp)return o<.08?0:o<.5?8:o<.8?7:15;const i=a-s;let h;a===t?h=(e-n)/i*60:a===e?h=(2+(n-t)/i)*60:h=(4+(t-e)/i)*60,h<0&&(h+=360);const l=_p.find(({upTo:c})=>h<c)??{dark:4,bright:12};return o<.08?0:o>=qp?l.bright:l.dark}function Gp(t,e){const n=(s,o)=>{const r=(o*e+s)*4;return(t[r+3]??0)===0?-1:zp(t[r]??0,t[r+1]??0,t[r+2]??0)},a=[];for(let s=0;s<e/2;s+=1){const o=[];for(let r=0;r<e;r+=1)o.push({top:n(r,s*2),bottom:n(r,s*2+1)});a.push(o)}return a}const Ht=["#000000","#0000aa","#00aa00","#00aaaa","#aa0000","#aa00aa","#aa5500","#aaaaaa","#555555","#5555ff","#55ff55","#55ffff","#ff5555","#ff55ff","#ffff55","#ffffff"];function Yp(t){const e=({top:n,bottom:a})=>n<0&&a<0?"<span> </span>":n<0?`<span style="color:${Ht[a]}">▄</span>`:a<0?`<span style="color:${Ht[n]}">▀</span>`:n===a?`<span style="color:${Ht[n]}">█</span>`:`<span style="color:${Ht[n]};background:${Ht[a]}">▀</span>`;return t.map(n=>n.map(e).join("")).join(`
`)}const gs={levels:4,roughness:.28,share:.55},Wt=32;let Wa=null,Pr=null,qa=null;function Rr(t,e){const n=document.querySelector('link[rel="icon"]');if(!n)return;Wa??=Object.assign(document.createElement("canvas"),{width:Wt,height:Wt});const a=Wa.getContext("2d");a&&(qa??=a.createImageData(Wt,Wt),Pr??=new js(Wt,qa.data),Pr.paint(t,{rotation:e}),a.putImageData(qa,0,0),n.type="image/png",n.href=Wa.toDataURL("image/png"))}const Up=90,Jp=1e3/12,Kp=400,_a=new WeakMap;function Vp(t){const e=(t.textContent??"").split(`
`);return{columns:Math.max(...e.map(n=>n.length)),rows:e.length}}function ws(t,e){_a.get(t)?.();const n=e??{...gs,seed:Math.floor(Math.random()*16777215)},{columns:a,rows:s}=Vp(t),o=Math.min(a,s*2),r=Sh(n),i=new js(o);t.dataset.seed=String(n.seed),t.title=`World ${n.seed}, ${r.mesh.faceCount.toLocaleString("en")} triangles`;const h=y=>{t.innerHTML=Yp(Gp(i.paint(r,{rotation:y}),o)),t.classList.add("grown")};if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return h(.6),Rr(r,.6),_a.set(t,()=>{}),()=>{};let l=0,c=-1/0,d=-1/0;const u=performance.now(),f=Jn(t),m=y=>{const g=(y-u)/1e3/Up*Math.PI*2;f.onScreen()&&y-c>=Jp&&(h(g),c=y),y-d>Kp&&(Rr(r,g),d=y),l=requestAnimationFrame(m)};l=requestAnimationFrame(m);const p=()=>{cancelAnimationFrame(l),f.stop()};return _a.set(t,p),p}function Xp(){const t=document.querySelector(".planet");return t?ws(t,Bn.saved()??void 0):()=>{}}const ht=360,Zp=60,Qp=1.4,Fr=Math.PI*2/Zp,Br=Math.PI*4;function eg(t){const e=w("canvas",{class:"world",width:ht,height:ht}),n=e.getContext("2d");if(!n)return()=>{};const a={...gs,seed:Math.floor(Math.random()*16777215)},s=n.createImageData(ht,ht),o=new js(ht,s.data),r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let i,h=.6,l=-.38,c=!r,d=null,u=0,f=performance.now();const m=w("p",{class:"hint"}),p=document.querySelector(".planet"),y=(20*4**gs.levels).toLocaleString("en"),g=()=>{i=Sh(a);const M=Bn.saved();m.textContent=`World ${a.seed}: ${i.mesh.faceCount.toLocaleString("en")} triangles. `+(M?`The header is keeping world ${M.seed}, ${(20*4**M.levels).toLocaleString("en")} triangles.`:`The header grows a new one every visit, ${y} triangles each.`),v.hidden=!M,T()},b=w("button",{type:"button",onclick:()=>{Bn.remember({...a}),p&&ws(p,{...a}),g()}},"Put it in the header"),v=w("button",{type:"button",hidden:!0,onclick:()=>{Bn.forget(),p&&ws(p),g()}},"Let the header grow its own"),T=()=>{o.paint(i,{rotation:h,tilt:l}),n.putImageData(s,0,0)};let S=0;const A=Jn(e),k=M=>{const L=Math.min(.1,(M-f)/1e3);if(!d&&A.onScreen()){if(u!==0){u*=Math.exp(-L/Qp);const $=c?Fr:0;(Math.abs(u)<=$||Math.abs(u)<.01)&&(u=0)}u!==0?(h-=u*L,T()):c&&(h+=Fr*L,T()),ds.send({byRadians:u*L,tiltedBy:0,seconds:L})}f=M,S=requestAnimationFrame(k)};e.addEventListener("pointerdown",M=>{d={x:M.clientX,y:M.clientY,at:M.timeStamp},u=0,e.setPointerCapture(M.pointerId)}),e.addEventListener("pointermove",M=>{if(!d)return;const L=e.clientWidth||ht,$=(M.clientX-d.x)/L*Math.PI;h-=$;const j=l;l=Math.max(-1.2,Math.min(1.2,l-(M.clientY-d.y)/L*Math.PI)),ds.send({byRadians:$,tiltedBy:l-j,seconds:0});const N=Math.max(.004,(M.timeStamp-d.at)/1e3);u=Math.max(-Br,Math.min(Br,u*.4+$/N*.6)),d={x:M.clientX,y:M.clientY,at:M.timeStamp},T()}),e.addEventListener("pointerup",M=>{d&&M.timeStamp-d.at>120&&(u=0),d=null,f=performance.now()}),e.addEventListener("pointercancel",()=>{d=null,u=0});const I=w("input",{type:"number",min:0,value:a.seed,onchange:()=>{a.seed=Math.max(0,Math.floor(Number(I.value)||0)),g()}}),O=w("button",{type:"button",onclick:()=>{a.seed=Math.floor(Math.random()*16777215),I.value=String(a.seed),g()}},"Another world"),H=w("button",{type:"button",onclick:()=>{c=!c,H.textContent=c?"Hold still":"Turn"}},c?"Hold still":"Turn"),C=(M,L,$,j,N,P)=>{const B=w("output",{},P(a[M])),_=w("input",{type:"range",min:$,max:j,step:N,value:a[M],onchange:()=>{a[M]=Number(_.value),B.textContent=P(a[M]),g()},oninput:()=>{B.textContent=P(Number(_.value))}});return w("label",{},`${L}: `,B,_)};return t.append(e,w("div",{class:"row"},w("span",{},"Seed "),I,O,H,b,v),w("div",{class:"dials"},C("levels","Detail",2,6,1,M=>`${M} splits`),C("roughness","Roughness",.02,1,.01,M=>M.toFixed(2)),C("share","Sea",0,.98,.01,M=>`${Math.round(M*100)}%`)),m),g(),S=requestAnimationFrame(k),()=>{cancelAnimationFrame(S),A.stop()}}const tg={name:"world",apps:{worlds:eg},install:()=>Xp()},Ye=[tg,_f,If,Of,od,fu,nd,vp,Pu,$m,Du,Uf,Nc,sm,nu,yu,Mu,Pd,Sd,Hu,hc,Am,Um,Zm,cf,wf,xf];function ng(t){return Object.assign({},...t.flatMap(e=>e.programs??[]).map(e=>({[e.name]:Ui(e)})),...t.map(e=>e.apps??{}))}const Dr="flags",Hr="flags-chosen",Wr="flags-drawn";function za(t){try{return localStorage.getItem(t)??""}catch{return""}}function Ga(t,e){try{e?localStorage.setItem(t,e):localStorage.removeItem(t)}catch{}}class ag{on;picked;lots;constructor(){this.on=new Set((za(Dr)||document.documentElement.dataset.flags||"").split(" ").filter(Boolean)),this.picked=new Set(za(Hr).split(" ").filter(Boolean));let e={};try{e=JSON.parse(za(Wr)||"{}")}catch{}this.lots=e}isOn(e){return this.on.has(e)}chosen(e){return this.picked.has(e)}drawn(e){return this.lots[e]}set(e,n){this.picked.add(e),delete this.lots[e],this.keep(e,n)}draw(e,n){this.lots[e]=n,this.keep(e,n)}keep(e,n){n?this.on.add(e):this.on.delete(e);const a=[...this.on].join(" ");Ga(Dr,a),Ga(Hr,[...this.picked].join(" ")),Ga(Wr,Object.keys(this.lots).length?JSON.stringify(this.lots):""),a?document.documentElement.dataset.flags=a:delete document.documentElement.dataset.flags}}function sg(){return[document,navigator].map(e=>e.modelContext).find(e=>typeof e?.registerTool=="function")}function qr(t,e){const n=[];for(const a of document.querySelectorAll(".app[data-app]")){const s=t[a.dataset.app??""]?.(a,e);s&&n.push(s)}return()=>{for(const a of n)a()}}function og(t){const e={},n=t.fields.theme;(n==="dark"||n==="light")&&(e["data-page-theme"]=n);const a=t.fields.sky;return a&&(e["data-sky"]=a),e}const rg=["data-page-theme","data-sky"];function ig(t,e){return e==="/"?t==="/":t.startsWith(e)}const Mh=7.8,_r=17,Ah=12,hg=8,Ya=28,zr=44,Zt=8,lg=40,cg=16;function dg(t){const e=new Map;for(const v of t.nodes){const T=v.label.split(`
`),S=Math.max(...T.map(A=>A.length),1);e.set(v.id,{id:v.id,label:v.label,real:!0,rank:-1,along:Math.max(40,S*Mh+Ah*2),across:T.length*_r+hg*2,pos:0,preds:[],succs:[]})}for(const v of t.edges)if(!e.has(v.from)||!e.has(v.to))throw new Error(`flow: edge ${v.from} --> ${v.to} names a node that is not there`);const n=ug(t),a={...t,edges:t.edges.map((v,T)=>n.has(T)?{...v,from:v.to,to:v.from}:v)};for(const v of a.edges){const T=e.get(v.from),S=e.get(v.to);T.succs.push(S),S.preds.push(T)}mg(e);const s=fg(e,a),o=pg(e);gg(o);const r=o.length,i=o.map(v=>Math.max(_r,...v.map(T=>T.real?T.across:0))),h=[];let l=Zt;for(let v=0;v<r;v+=1)h.push(l),l+=(i[v]??0)+zr;const c=v=>(h[v.rank]??0)+((i[v.rank]??0)-(v.real?v.across:0))/2,d=Math.max(...[...e.values()].map(v=>v.pos+v.along))+Zt,u=l-zr+Zt,f=t.direction==="LR",m=(v,T)=>f?[T,v]:[v,T],p=[...e.values()].filter(v=>v.real).map(v=>{const[T,S]=m(v.pos,c(v));return{id:v.id,label:v.label,x:T,y:S,width:f?v.across:v.along,height:f?v.along:v.across}}),y=t.edges.map((v,T)=>{const S=s[T]??[],A=S[0],k=S[S.length-1];if(!A||!k)throw new Error("flow: an edge lost its ends");const I=t.edges.some(L=>L.from===v.to&&L.to===v.from),O=Math.min(lg,A.along/3,k.along/3),H=I?n.has(T)?O:-O:0,C=[m(A.pos+A.along/2+H,c(A)+A.across),...S.slice(1,-1).map(L=>m(L.pos+L.along/2,c(L)+(i[L.rank]??0)/2)),m(k.pos+k.along/2+H,c(k))],M=n.has(T)?C.reverse():C;return v.label===void 0?{from:v.from,to:v.to,points:M}:{from:v.from,to:v.to,label:v.label,points:M}}),[g,b]=m(d,u);return{direction:t.direction,width:g,height:b,nodes:p,edges:y}}function ug(t){const e=new Set,n=new Map,a=s=>{n.set(s,"walking"),t.edges.forEach((o,r)=>{o.from!==s||e.has(r)||(n.get(o.to)==="walking"?e.add(r):n.has(o.to)||a(o.to))}),n.set(s,"done")};for(const s of t.nodes)n.has(s.id)||a(s.id);return e}function mg(t){const e=new Set,n=a=>{if(a.rank>=0)return a.rank;if(e.has(a))throw new Error(`flow: there is a cycle through ${a.id}, and a flow has a direction`);return e.add(a),a.rank=a.preds.length===0?0:Math.max(...a.preds.map(n))+1,e.delete(a),a.rank};for(const a of t.values())n(a)}function fg(t,e){let n=0;return e.edges.map(a=>{const s=t.get(a.from),o=t.get(a.to);if(!s||!o)return[];const r=[s];let i=s;for(let h=s.rank+1;h<o.rank;h+=1){n+=1;const l={id:`\0${n}`,label:"",real:!1,rank:h,along:Math.max(cg,(a.label?.length??0)*Mh+Ah),across:0,pos:0,preds:[i],succs:[]};t.set(l.id,l),i.succs.push(l),r.push(l),i=l}return i!==s&&(i.succs.push(o),o.preds.push(i),s.succs.splice(s.succs.indexOf(o),1),o.preds.splice(o.preds.indexOf(s),1)),r.push(o),r})}function pg(t){const e=Math.max(...[...t.values()].map(r=>r.rank))+1,n=Array.from({length:e},()=>[]);for(const r of t.values())n[r.rank]?.push(r);const a=new Map,s=r=>r.forEach((i,h)=>a.set(i,h));n.forEach(s);const o=(r,i)=>i.length===0?a.get(r)??0:i.reduce((h,l)=>h+(a.get(l)??0),0)/i.length;for(let r=0;r<4;r+=1){for(let i=1;i<e;i+=1){const h=n[i]??[];h.sort((l,c)=>o(l,l.preds)-o(c,c.preds)),s(h)}for(let i=e-2;i>=0;i-=1){const h=n[i]??[];h.sort((l,c)=>o(l,l.succs)-o(c,c.succs)),s(h)}}return n}function gg(t){const e=r=>r.reduce((i,h)=>i+h.along,0)+Ya*Math.max(0,r.length-1),n=Math.max(...t.map(e));for(const r of t){let i=Zt+(n-e(r))/2;for(const h of r)h.pos=i,i+=h.along+Ya}const a=r=>r.pos+r.along/2,s=(r,i)=>{const h=r.map(d=>{const u=i(d);return u.length===0?a(d):u.reduce((f,m)=>f+a(m),0)/u.length});let l=-1/0;r.forEach((d,u)=>{d.pos=Math.max((h[u]??0)-d.along/2,l),l=d.pos+d.along+Ya});const c=r.reduce((d,u,f)=>d+a(u)-(h[f]??0),0)/Math.max(1,r.length);for(const d of r)d.pos-=c};for(let r=0;r<3;r+=1){for(let i=1;i<t.length;i+=1)s(t[i]??[],h=>h.preds);for(let i=t.length-2;i>=0;i-=1)s(t[i]??[],h=>h.succs)}const o=Math.min(...t.flat().map(r=>r.pos));for(const r of t.flat())r.pos+=Zt-o}const ys=/(\w[\w.-]*)(?:\[([^\]]*)\])?/,wg=new RegExp(`^${ys.source}\\s*-->(?:\\|([^|]*)\\|)?\\s*${ys.source}$`),yg=new RegExp(`^${ys.source}$`),bg=/^(?:flow\s+)?(TD|LR)$/i;function vg(t){const e=new Map,n=[];let a="TD";const s=(i,h)=>{i&&(e.has(i)||e.set(i,i),h!==void 0&&e.set(i,h.replace(/\\n/g,`
`)))},o=t.split(`
`);let r=!0;return o.forEach((i,h)=>{const l=i.trim();if(l===""||l.startsWith("%"))return;if(r){r=!1;const u=bg.exec(l);if(u){a=u[1]?.toUpperCase()==="LR"?"LR":"TD";return}}const c=wg.exec(l);if(c){const[,u,f,m,p,y]=c;s(u,f),s(p,y),n.push(m===void 0?{from:u??"",to:p??""}:{from:u??"",to:p??"",label:m});return}const d=yg.exec(l);if(d){s(d[1],d[2]);return}throw new Error(`flow: cannot read line ${h+1}: "${l}"`)}),{direction:a,nodes:[...e].map(([i,h])=>({id:i,label:h})),edges:n}}const kg=20,Gr=17;function xg(t){let e=5381;for(let n=0;n<t.length;n+=1)e=(e*33^t.charCodeAt(n))>>>0;return e.toString(36)}const X=t=>String(Math.round(t*10)/10);function $g(t,e){const[n,...a]=t.points;if(!n)return"";let s=`M${X(n[0])},${X(n[1])}`,o=n;for(const r of a){const[i,h]=o,[l,c]=r,d=e?[(i+l)/2,h]:[i,(h+c)/2],u=e?[(i+l)/2,c]:[l,(h+c)/2];s+=` C${X(d[0])},${X(d[1])} ${X(u[0])},${X(u[1])} ${X(l)},${X(c)}`,o=r}return s}function Tg(t){const{points:e}=t,n=e[Math.floor((e.length-1)/2)]??[0,0],a=e[Math.ceil((e.length-1)/2)]??n;return[(n[0]+a[0])/2,(n[1]+a[1])/2]}function Sg(t){const e=dg(vg(t)),n=e.direction==="LR",a=`arrow-${xg(t)}`,s=e.edges.map(h=>{const l=`<path class="edge" d="${$g(h,n)}" marker-end="url(#${a})"/>`;if(h.label===void 0)return l;const[c,d]=Tg(h);return`${l}<text class="edge-label" x="${X(c)}" y="${X(d)}" text-anchor="middle" dominant-baseline="middle">${x(h.label)}</text>`}).join(""),o=e.nodes.map(h=>{const l=h.x+h.width/2,c=h.label.split(`
`),d=h.y+(h.height-c.length*Gr)/2,u=c.map((f,m)=>`<tspan x="${X(l)}" y="${X(d+kg-8+m*Gr)}">${x(f)}</tspan>`).join("");return`<g class="node"><rect x="${X(h.x)}" y="${X(h.y)}" width="${X(h.width)}" height="${X(h.height)}" rx="4"/><text text-anchor="middle" dominant-baseline="middle">${u}</text></g>`}).join(""),r=X(e.width),i=X(e.height);return`<figure class="flow"><svg class="flow" viewBox="0 0 ${r} ${i}" width="${r}" height="${i}" style="max-width: 100%; height: auto" role="img"><defs><marker id="${a}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z"/></marker></defs>${s}${o}</svg></figure>`}const qt={">=":"≥","<=":"≤","!=":"≠","->":"→","...":"…","*":"·",star:"∗","-":"−","'":"′",cdot:"·",inf:"∞",alpha:"α",beta:"β",gamma:"γ",delta:"δ",epsilon:"ε",lambda:"λ",mu:"μ",pi:"π",sigma:"σ",tau:"τ",phi:"φ",omega:"ω",Delta:"Δ",Sigma:"Σ"},Yr={sum:"∑",prod:"∏",int:"∫"},Mg=new Set(["max","min","lim","log","ln","sin","cos","exp","arg"]);function Ag(t){const e=[],n=/\s+|\.\.\.|>=|<=|!=|->|\d+(?:\.\d+)?|[A-Za-z]+|[{}]|[_^]|./g;for(const[a]of t.matchAll(n))/^\s+$/.test(a)||(a==="{"||a==="}"?e.push({kind:"brace",text:a}):a==="_"||a==="^"?e.push({kind:"script",text:a}):/^\d/.test(a)?e.push({kind:"number",text:a}):/^[A-Za-z]/.test(a)?e.push({kind:"name",text:a}):e.push({kind:"sign",text:a}));return e}function Ig(t){return t.split(`
`).map(e=>e.trim()).filter(Boolean).map(e=>`<math display="block"><mrow>${new Eg(Ag(e)).expression()}</mrow></math>`).join("")}class Eg{constructor(e){this.tokens=e}tokens;at=0;limits=!1;expression(){let e="";for(;this.at<this.tokens.length&&this.peek()?.text!=="}"&&this.peek()?.text!==")";)e+=this.item();return e}item(){let e=this.atom();const n=this.limits;this.limits=!1;let a=null,s=null;for(;this.peek()?.kind==="script";){const r=this.next().text,i=`<mrow>${this.group()}</mrow>`;r==="_"?a=i:s=i}const o=a&&s?n?"munderover":"msubsup":a?n?"munder":"msub":n?"mover":"msup";return!a&&!s?e:`<${o}>${e}${a??""}${s??""}</${o}>`}atom(){const e=this.next();if(e.kind==="brace"&&e.text==="{"){const n=this.expression();return this.expect("}"),`<mrow>${n}</mrow>`}if(e.text==="("){const n=this.expression();return this.peek()?.text===")"&&(this.at+=1),`<mrow><mo>(</mo>${n}<mo>)</mo></mrow>`}return e.kind==="number"?`<mn>${e.text}</mn>`:e.kind==="name"?e.text==="frac"?`<mfrac><mrow>${this.group()}</mrow><mrow>${this.group()}</mrow></mfrac>`:e.text==="sqrt"?`<msqrt>${this.group()}</msqrt>`:e.text==="text"?`<mtext>${x(this.phrase())}</mtext>`:e.text in Yr?(this.limits=!0,`<mo>${Yr[e.text]}</mo>`):Mg.has(e.text)?`<mo>${e.text}</mo>`:e.text in qt?/^[α-ωΑ-Ω]$/.test(qt[e.text])?`<mi>${qt[e.text]}</mi>`:`<mo>${qt[e.text]}</mo>`:`<mi>${x(e.text)}</mi>`:`<mo>${x(qt[e.text]??e.text)}</mo>`}group(){if(this.peek()?.text==="{"){this.next();const e=this.expression();return this.expect("}"),e}return this.atom()}phrase(){this.expect("{");const e=[];for(;this.at<this.tokens.length&&this.peek()?.text!=="}";)e.push(this.next().text);return this.expect("}"),e.join(" ")}peek(){return this.tokens[this.at]}next(){const e=this.tokens[this.at];if(!e)throw new Error("the formula ends early");return this.at+=1,e}expect(e){if(this.peek()?.text!==e)throw new Error(`expected ${e} in the formula`);this.at+=1}}function jg(t,e){const a=/^https?:/.test(e)?' target="_blank" rel="noopener noreferrer"':"",s=/^\d+$/.test(t)?' class="ref"':"";return`<a href="${x(e)}"${a}${s}>${t}</a>`}const Cg=["large","wide","card"];function Og(t,e,n){if(n==="card dark"){const o=e.replace(/(\.[a-z]+)$/,"-dark$1");return`<img src="${x(e)}" alt="${x(t)}" class="card shot-light" loading="lazy"><img src="${x(o)}" alt="${x(t)}" class="card shot-dark" loading="lazy">`}const a=n&&Cg.includes(n)?` class="${n}"`:"",s=n==="card"?' loading="lazy"':"";return`<img src="${x(e)}" alt="${x(t)}"${a}${s}>`}const Lg=/(`[^`]+`|!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)|\[[^[\]]+\]\([^)\s]+\))/g,Ng=/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/,Pg=/^\[([^[\]]+)\]\(([^)\s]+)\)$/;function Ih(t){return t.split(Lg).map(e=>{if(e.startsWith("`")&&e.endsWith("`")&&e.length>1)return`<code>${x(e.slice(1,-1))}</code>`;const n=Ng.exec(e);if(n)return Og(n[1]??"",n[2]??"",n[3]);const a=Pg.exec(e);return a?jg(Ih(a[1]??""),a[2]??""):x(e)}).join("")}function Rg(t){const e=[];return t.replace(/<code>[\s\S]*?<\/code>/g,a=>`\0${e.push(a)-1}\0`).replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/(^|[^*])\*([^*]+)\*/g,"$1<em>$2</em>").replace(/ {2,}\n/g,"<br>").replace(/\n/g," ").replace(/ -- /g," — ").replace(/\u0000(\d+)\u0000/g,(a,s)=>e[Number(s)]??"")}function Ae(t){return Rg(Ih(t))}function Fg(t){const e=t.split(`
`).map(f=>f.trim()).filter(Boolean),n=e.find(f=>!f.includes(" :: ")),a=e.filter(f=>f.includes(" :: ")).map(f=>{const m=f.indexOf(" :: ");return{left:f.slice(0,m).trim(),right:f.slice(m+4).trim()}}),s=a.filter(({left:f})=>f.startsWith("=")).map(({left:f,right:m})=>({value:Number(f.slice(1)),name:m})),o=a.filter(({left:f})=>!f.startsWith("=")).map(({left:f,right:m})=>{const[p="",y]=m.split("|").map(b=>b.trim()),g=Number(p.replace(/!$/,"").trim());return{label:f,value:g,shown:y??String(g),marked:p.endsWith("!")}}),r=Math.max(0,...o.map(({value:f})=>f),...s.map(({value:f})=>f))||1,i=f=>(Math.max(0,f)/r).toFixed(3),h=s[0],l=o.map(({label:f,value:m,shown:p,marked:y})=>`<tr${y?' class="marked"':""}><th scope="row">${Ae(f)}</th><td><span class="bar" style="--p:${i(m)}"></span><span class="value">${x(p)}</span></td></tr>`).join(""),c=h?` style="--rule:${i(h.value)}"`:"",d=h?` The line is ${x(h.name)}, at ${h.value}.`:"",u=n||h?`<figcaption>${n?Ae(n)+".":""}${d}</figcaption>`:"";return`<figure class="bars"><table${c}${h?' class="ruled"':""}><tbody>${l}</tbody></table>${u}</figure>`}function Bg(t){return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}const Ur=/^(?:[-*]|\d+\.)\s/;function Dg(t,e,n){if(!Ur.test(t[0]??""))return!1;const a=e.slice(n).find(s=>s.trim()!=="");return a!==void 0&&Ur.test(a)}function Hg(t){const e=[],n=t.replace(/\r\n?/g,`
`).split(`
`);let a=[],s=!1;return n.forEach((o,r)=>{if(o.startsWith("```")){s=!s,a.push(o),s||(e.push(a),a=[]);return}if(!s&&o.trim()===""){if(Dg(a,n,r+1))return;a.length&&e.push(a),a=[];return}a.push(o)}),a.length&&e.push(a),e}function Wg(t){const e=/^(#{1,4})\s+(.*)$/.exec(t[0]??"");if(!e||!t.slice(0,-1).every(o=>/ {2,}$/.test(o)))return null;const a=e[1]?.length??1,s=[e[2]??"",...t.slice(1)].join(`
`);return`<h${a} id="${Bg(s)}">${Ae(s)}</h${a}>`}function qg(t){if(!t[0]?.startsWith("```"))return null;const e=t[0].slice(3).trim(),n=t.slice(1,-1).join(`
`);return e==="flow"?Sg(n):e==="bars"?Fg(n):e==="math"?Ig(n):e==="slides"||e.startsWith("slides ")?ah(n,e.slice(6).trim()):`<pre><code>${le(n,e)}</code></pre>`}function _g(t,e){const n=[];for(const a of t)e.test(a)?n.push(a.replace(e,"")):n.length&&(n[n.length-1]+=`
${a.trim()}`);return n}function zg(t){const e=t[0]??"",n=/^\d+\.\s/.test(e),a=/^[-*]\s/.test(e);if(!n&&!a)return null;const s=n?/^\d+\.\s+/:/^[-*]\s+/;if(!t.every(i=>s.test(i)||/^\s/.test(i)))return null;const o=n?"ol":"ul",r=_g(t,s).map(i=>`<li>${Ae(i)}</li>`).join("");return`<${o}>${r}</${o}>`}function Gg(t){return t.every(n=>n.includes(" :: "))?`<dl>${t.map(n=>{const a=n.indexOf(" :: ");return[n.slice(0,a),n.slice(a+4)]}).map(([n,a])=>`<dt>${Ae(n)}</dt><dd>${Ae(a)}</dd>`).join("")}</dl>`:null}function Yg(t){if(!t.every(n=>n.startsWith(">")))return null;const e=t.map(n=>n.replace(/^>\s?/,"")).join(" ");return`<blockquote>${Ae(e)}</blockquote>`}function Ug(t){const e=/^::([a-z0-9-]+)((?:\s+--[a-z0-9-]+)*)$/.exec(t[0]??"");if(!e||t.length!==1)return null;const n=(e[2]??"").split(/\s+/).filter(Boolean).map(a=>a.slice(2));return`<div class="app" data-app="${e[1]}"${n.length?` data-dials="${n.join(" ")}"`:""}></div>`}function Jg(t){return t.length===1&&/^-{3,}$/.test(t[0]??"")?"<hr>":null}function Kg(t){const e=t.length===1&&/^(\\+)$/.exec(t[0]??"");return e?`<div class="space" style="--n:${e[1]?.length??1}"></div>`:null}function Vg(t){return t.length===1&&/^!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)$/.test(t[0]??"")?`<figure>${Ae(t[0]??"")}</figure>`:null}function Xg(t){return`<p>${Ae(t.join(`
`))}</p>`}const Zg=[Jg,Kg,Wg,qg,Yg,Ug,Vg,Gg,zg];function Eh(t){return Hg(t).map(e=>{for(const n of Zg){const a=n(e);if(a!==null)return a}return Xg(e)}).join(`
`)}function Cs(t){return t==="/"?"~":`~${t.replace(/\/$/,"")}`}function jh(t){return`<ul class="listing">${t.map(n=>`<li><a class="entry" href="${n.route}"><code>${x(n.name)}${n.link?"@":"/"}</code><span class="title">${x(n.title)}</span>`+(n.summary?`<span class="summary">${x(n.summary)}</span>`:"")+"</a></li>").join("")}</ul>`}function Ch(t,e){return`<p class="ran"><span class="ps1">${x(t)} $</span> ${x(e)}</p>`}function Qg(t,e){const n=t.childrenOf(e.route);return n.length===0?"":`${Ch(Cs(e.route),"ls")}
${jh(n)}`}function ew(t,e){const n=t.trailTo(e.route).slice(1).map(a=>a.name).join("/");return Ch("~",n?`cd ${n} && cat README.md`:"cat README.md")}function tw(t,e){return`${ew(t,e)}
${Eh(e.body)}
${Qg(t,e)}`}function nw(t,e){const n=document.querySelector("main");if(!n)return()=>!1;const a=(s,{push:o=!0,keep:r=!1}={})=>{const i=t.at(s);if(!i)return!1;r||(n.innerHTML=tw(t,i));const h=og(i);for(const l of rg){const c=h[l];c?document.documentElement.setAttribute(l,c):document.documentElement.removeAttribute(l)}document.title=i.route==="/"?"David Rodenas":`${i.title} — David Rodenas`;for(const l of document.querySelectorAll("nav .navlink"))ig(s,l.getAttribute("href")??"\0")?l.setAttribute("aria-current","page"):l.removeAttribute("aria-current");return o&&(s===window.location.pathname?window.history.replaceState({route:s},"",s):window.history.pushState({route:s},"",s),r||window.scrollTo({top:0})),window.goatcounter?.count?.({path:s,title:document.title}),e(i,r),!0};return document.addEventListener("click",s=>{if(s.defaultPrevented||s.button!==0||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey)return;const o=s.target?.closest("a[href]");if(!o||o.target||o.dataset.run)return;const r=new URL(o.href,window.location.href);if(r.origin!==window.location.origin)return;const i=r.pathname.endsWith("/")?r.pathname:`${r.pathname}/`;t.at(i)&&(s.preventDefault(),i!==window.location.pathname&&a(i))}),window.addEventListener("popstate",()=>{const s=window.location.pathname.endsWith("/")?window.location.pathname:`${window.location.pathname}/`;a(s,{push:!1})}),a}function Jr(t,e,n){for(let a=1;a<=Math.min(t.length,e.length)&&t.at(-a)===e.at(-a);a+=1)if(t.at(-a)===`
`)return[t.slice(0,-a),t.slice(-a)+e.slice(0,-a),e.slice(-a)+n];return[t,e,n]}function aw(t,e){let n=0;for(;n<t.length&&n<e.length&&t[n]===e[n];)n+=1;let a=0;for(;a<t.length-n&&a<e.length-n&&t[t.length-1-a]===e[e.length-1-a];)a+=1;let s=t.slice(0,n),o=t.slice(t.length-a),r=t.slice(n,t.length-a),i=e.slice(n,e.length-a);r?i||([s,r,o]=Jr(s,r,o)):[s,i,o]=Jr(s,i,o),n=s.length;const h=[];for(let l=r.length-1;l>=0;l-=1)h.push({text:s+r.slice(0,l)+o,caret:n+l});for(let l=1;l<=i.length;l+=1)h.push({text:s+i.slice(0,l)+o,caret:n+l});return h}const sw=32,ow=14,rw=450,iw=1900,hw=900,lw=160;function cw(t){const e=[],n=t[0]?.text??"";let a=n.length>lw?n:"";for(const s of t){for(const o of aw(a,s.text))e.push({...o,hold:o.text.length<a.length?ow:sw}),a=o.text;a=s.text,s.status?e.push({text:a,hold:rw},{text:a,status:s.status,hold:iw}):e.push({text:a,hold:hw})}return e}function dw(t){return[...t.querySelectorAll(".slide:not(.live)")].map(e=>{const n=e.querySelector("code")?.textContent??"",a=e.querySelector(".slide-status"),s=["red","green","note"].find(o=>a?.classList.contains(o));return a&&s?{text:n,status:{kind:s,text:a.textContent??""}}:{text:n}})}function uw(t){const e=t.dataset.language??"",n=dw(t),a=w("code"),s=w("p",{class:"slide-status",hidden:!0}),o=w("div",{class:"slide live"},w("pre",{},a),s),r=l=>{a.innerHTML=l.caret===void 0?le(l.text,e):`${le(l.text.slice(0,l.caret),e)}<span class="caret"></span>${le(l.text.slice(l.caret),e)}`,s.hidden=!l.status,l.status&&(s.className=`slide-status ${l.status.kind}`,s.textContent=l.status.text)},h=dh(t,()=>{o.isConnected||t.querySelector(".slides-screen")?.append(o),t.classList.add("playing");const l=cw(n);let c=0;return()=>{const d=l[c++];return d?(r(d),d.hold):null}});return()=>{h(),o.remove(),t.classList.remove("playing")}}function Kr(t){const e=[...t.querySelectorAll("figure.slides")].map(uw);return()=>{for(const n of e)n()}}class mw{typed=[];drafts=[];index=0;get lines(){return this.typed}add(e){this.typed.push(e),this.drafts=[...this.typed,""],this.index=this.typed.length}previous(e){return this.moveTo(this.index-1,e)}next(e){return this.moveTo(this.index+1,e)}moveTo(e,n){return this.drafts.length===0&&(this.drafts=[""]),e<0||e>=this.drafts.length?n:(this.drafts[this.index]=n,this.index=e,this.drafts[e]??n)}}function fw(t,e,n,a){if(t==="k"){const s=e.slice(n);return{line:e.slice(0,n),caret:n,killed:s||a}}if(t==="u"){const s=e.slice(0,n);return{line:e.slice(n),caret:0,killed:s||a}}return t==="y"?{line:e.slice(0,n)+a+e.slice(n),caret:n+a.length,killed:a}:null}function Oh(t){return t.split(/\s*(?:;|&&)\s*/).map(e=>e.trim().split(/\s+/).filter(Boolean)).filter(e=>e.length>0)}function Ke(t,e){const a=e.startsWith("~")||e.startsWith("/")?[]:t.split("/").filter(Boolean),s=e.replace(/^~/,"").split("/").filter(Boolean),o=[...a];for(const r of s)r!=="."&&(r===".."?o.pop():o.push(r));return o.length===0?"/":`/${o.join("/")}/`}function pw(t){return t.replace(/(?:^|\/)(?:README\.md|\*)$/,"")||"."}const gw={name:"cat",usage:"cat <file>",description:"print a page, README.md or * for the one here",run({site:t,cwd:e},[n]){if(!n)return{text:"cat: usage: cat <file>",error:!0};const a=Ke(e,pw(n)),s=t.at(a);return!s||/\.md$/.test(n)!==/README\.md$/.test(n)?{text:`cat: ${n}: no such file`,error:!0}:{html:Eh(s.body),at:s.route}}},ww={name:"cd",usage:"cd [dir]",description:"go to a directory (the address follows)",run(t,[e="~"]){const n=Ke(t.cwd,e),a=t.site.at(n);return a?(t.cwd=a.route,{at:a.route}):{text:`cd: ${e}: no such directory`,error:!0}}},yw={name:"clear",usage:"clear",description:"clear what the shell has printed",run(){return{clear:!0}}},bw={name:"find",usage:"find [path] [word]",description:"every page under a directory; with a word, those it is in the name or title of, then those that say it",run({site:t,cwd:e},n){const[a,s]=n,o=a!==void 0&&(a==="."||a.includes("/")||t.at(Ke(e,a))!==void 0),r=o?a??".":".",i=(o?s:a)?.toLowerCase(),h=Ke(e,r);if(!t.at(h))return{text:`find: ${r}: no such directory`,error:!0};const l=y=>t.childrenOf(y).filter(g=>!g.link).flatMap(g=>[g,...l(g.route)]),c=[t.at(h),...l(h)],d=c.filter(y=>!i||y.route.toLowerCase().includes(i)||y.title.toLowerCase().includes(i)),u=i?c.filter(y=>!d.includes(y)&&`${y.summary}
${y.body}`.toLowerCase().includes(i)):[],f=[...d.map(y=>({page:y,said:""})),...u.map(y=>({page:y,said:" — in the text"}))];if(f.length===0)return{text:`find: nothing under ${r}${i?` with "${i}" in it`:""}`};const m=Math.max(...f.map(({page:y})=>y.route.length)),p=y=>" ".repeat(m-y.route.length);return{text:f.map(({page:y,said:g})=>`${y.route}${p(y)}  # ${y.title}${g}`).join(`
`),html:`<pre class="listing">${f.map(({page:y,said:g})=>`<span class="line"><a href="${x(y.route)}">${x(y.route)}</a>${p(y)}<span class="hint">  # ${x(y.title)}${g}</span></span>`).join("")}</pre>`}}},Ua=40,vw=t=>t.replace(/\]\([^)]*\)/g,"]").replace(/[#*_`>\[\]]/g,"").trim(),kw={name:"grep",usage:"grep <word> [path]",description:"the lines of every page under a directory that say a word",run({site:t,cwd:e},[n,a="."]){if(!n)return{text:"grep: usage: grep <word> [path]",error:!0};const s=Ke(e,a);if(!t.at(s))return{text:`grep: ${a}: no such directory`,error:!0};const o=n.toLowerCase(),r=t.pages.filter(c=>c.route.startsWith(s)).flatMap(c=>c.body.split(`
`).map((d,u)=>({page:c,number:u+1,line:vw(d)})).filter(({line:d})=>d.toLowerCase().includes(o)));if(r.length===0)return{text:`grep: no page under ${a} says "${n}"`};const i=r.slice(0,Ua),h=r.length>Ua?[`… and ${r.length-Ua} more. Give grep a directory to look in.`]:[],l=c=>x(c).replace(new RegExp(x(n).replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"ig"),d=>`<mark>${d}</mark>`);return{text:[...i.map(({page:c,number:d,line:u})=>`${c.route}:${d}: ${u}`),...h].join(`
`),html:`<pre class="listing wrap">${[...i.map(({page:c,number:d,line:u})=>`<span class="line"><a href="${x(c.route)}">${x(c.route)}</a>:${d}: <span class="hint">${l(u)}</span></span>`),...h.map(c=>`<span class="line">${x(c)}</span>`)].join("")}</pre>`}}},xw={name:"help",usage:"help [command]",description:"this",run({commands:t},[e]){if(e){const r=t.find(i=>i.name===e);return r?{text:`${r.usage}
  ${r.description}`}:{text:`help: ${e}: no such command`,error:!0}}const n=Math.max(...t.map(r=>r.usage.length)),a=t.map(r=>`${r.usage.padEnd(n)}  ${r.description}`),s="Tab completes; → takes the grey suggestion. ↑↓ recall. ^K kills to the end of the line, ^U back to the start, ^Y puts it back.",o=t.map(r=>`<dt><a href="#" data-run="help ${r.name}">${x(r.usage)}</a></dt><dd>${x(r.description)}</dd>`).join("");return{text:["Commands:",...a,"",s].join(`
`),html:`<p>Commands:</p><dl class="help">${o}</dl><p>${x(s)}</p>`}}};function $w(t){const e=t.filter(a=>a.startsWith("-")).flatMap(a=>a.slice(1).split("")),n=t.find(a=>!a.startsWith("-"))??".";return{flags:e,path:n}}function Tw(t,e,n,a){const s=a==="."?"":`${a.replace(/\/$/,"")}/`;return[...e?[{mode:"dr-x",name:"..",title:e.title,summary:e.summary,href:e.route,run:`cd ${s}..`}]:[],{mode:"--r-",name:"README.md",title:t.title,summary:t.summary,href:t.route,run:`cat ${s}README.md`},...n.map(o=>o.link?{mode:"lr-x",name:`${o.name}@`,title:`-> ${o.route}  ${o.title}`,summary:o.summary,href:o.route}:{mode:"dr-x",name:`${o.name}/`,title:o.title,summary:o.summary,href:o.route})]}function Vr(t){const e=t.run?` data-run="${x(t.run)}"`:"";return`<a href="${x(t.href)}"${e}>${x(t.name)}</a>`}function Sw(t,e){const n=Math.max(...t.map(i=>i.name.length)),a=i=>" ".repeat(n-i.length),s=i=>e?`${i.mode}  ${i.name}${a(i.name)}  ${i.title}${i.summary?` — ${i.summary}`:""}`:`${i.name}${a(i.name)}  # ${i.title}`,o=i=>e?`<span class="line">${i.mode}  ${Vr(i)}${a(i.name)}  ${x(i.title)}${i.summary?`<span class="hint"> — ${x(i.summary)}</span>`:""}</span>`:`<span class="line">${Vr(i)}${a(i.name)}<span class="hint">  # ${x(i.title)}</span></span>`,r=e?[`total ${t.length}`]:[];return{text:[...r,...t.map(s)].join(`
`),html:`<pre class="listing">${[...r.map(i=>`<span class="line">${i}</span>`),...t.map(o)].join("")}</pre>`}}const Mw={name:"ls",usage:"ls [-lnrt] [path]",description:"what a directory holds, in the site's own order; -l says more, -n sorts by name, -r reverses, -t as the table at the end of a page",run({site:t,cwd:e},n){const{flags:a,path:s}=$w(n),o=a.find(c=>!["l","n","r","t"].includes(c));if(o)return{text:`ls: -${o}: no such option. Try ls -l, -n by name, -r reversed, -t as a table`,error:!0};const r=Ke(e,s),i=t.at(r);if(!i)return{text:`ls: ${s}: no such directory`,error:!0};const h=i.parent===null?void 0:t.at(i.parent),l=[...t.childrenOf(r)];if(a.includes("n")&&l.sort((c,d)=>c.name.localeCompare(d.name)),a.includes("r")&&l.reverse(),a.includes("t")){const c=Math.max(0,...l.map(u=>u.name.length+1)),d=u=>`${u.name}${u.link?"@":"/"}`.padEnd(c);return{text:l.map(u=>`${d(u)}  ${u.title}${u.summary?` — ${u.summary}`:""}`).join(`
`),html:jh(l)}}return Sw(Tw(i,h,l,s),a.includes("l"))}},Aw={name:"pwd",usage:"pwd",description:"print where you are",run({cwd:t}){return{text:Cs(t)}}},Lh=[Mw,ww,gw,bw,kw,Aw,xw,yw];class Iw{context;constructor(e,n,a=Lh){this.context={site:e,cwd:n,commands:a}}get prompt(){return`${Cs(this.context.cwd)} $`}moveTo(e){return this.context.site.at(e)?(this.context.cwd=e,!0):!1}run(e){const n=[];for(const[a="",...s]of Oh(e)){const o=this.context.commands.find(i=>i.name===a),r=o?o.run(this.context,s):{text:`${a}: command not found. Try help`,error:!0};if(n.push(r),r.error)break}return n}complete(e){const n=e.split(/\s+/),a=n.pop()??"",s=n.length===0?"":`${n.join(" ")} `;return(n.length===0?this.commandNames():this.pathNames(a)).filter(r=>r.startsWith(a)).map(r=>s+r)}commandNames(){return this.context.commands.map(e=>e.name).sort()}pathNames(e){const n=e.lastIndexOf("/"),a=n<0?".":e.slice(0,n+1),s=Ke(this.context.cwd,a);if(!this.context.site.at(s))return[];const o=n<0?"":a;return["README.md",...this.context.site.childrenOf(s).map(i=>`${i.name}/`)].map(i=>o+i)}}function Ew(t,e,n){if(t==="")return"help";const s=[...[...e].reverse(),...n].find(o=>o.startsWith(t)&&o!==t);return s?s.slice(t.length):""}function jw(t){if(t.length===0)return null;const e=[];let n="";for(const a of t)a==="Enter"?(e.push(n),n=""):a==="Backspace"?n=n.slice(0,-1):n+=a;return{finished:e,unfinished:n}}const Ja="shell-pending",Xr={carry(t){try{t&&sessionStorage.setItem(Ja,t)}catch{}},take(){try{const t=sessionStorage.getItem(Ja)??"";return sessionStorage.removeItem(Ja),t}catch{return""}}};function Cw(){window.__stopTyped?.();const t=window.__typed??[];return window.__typed=[],jw(t)}function Ow(t,e,n={}){const a=document.querySelector(".terminal"),s=document.querySelector(".screen"),o=a?.querySelector("form.prompt"),r=o?.querySelector("input"),i=o?.querySelector(".line"),h=o?.querySelector(".suggest"),l=o?.querySelector(".ps1"),c=document.querySelector(".ran.end"),d=c?.querySelector(".ps1"),u=c?.querySelector(".line"),f=c?.querySelector(".typed");if(!a||!s||!o||!r||!i||!h||!l||!c||!d||!u||!f)return null;const m=()=>{l.textContent=p.prompt,d.textContent=p.prompt},p=new Iw(t,e,n.commands),y=new mw;let g=null;const b=$=>{s.append($)},v=()=>{g?.remove(),g=null},T=()=>{const $=r.selectionStart??r.value.length;i.style.setProperty("--caret",String($)),i.style.setProperty("--typed",String(r.value.length)),f.textContent=r.value,u.style.setProperty("--caret",String($)),h.textContent=$===r.value.length?Ew(r.value,y.lines,p.complete(r.value)):""},S=($,j=$.length)=>{r.value=$,r.setSelectionRange(j,j),T()},A=$=>{if($.clear&&(s.replaceChildren(),n.clearPage?.()),$.html){const j=w("div",{class:$.text?"listing-out":"cat"});j.innerHTML=$.html,b(j)}else $.text&&b(w("pre",{class:$.error?"error":""},$.text))},k=$=>{v();const j=[],N=w("p",{class:"echo"},w("span",{class:"ps1"},p.prompt),` ${$}`);b(N);let P=!1;const B=Oh($).map(_=>_.join(" "));for(let _=0;_<B.length;_+=1){n.heard?.((B[_]??"").split(" ")[0]??"");const[J]=p.run(B[_]??"");if(J){if(j.push(J),A(J),J.html&&!J.text&&(P=!0),J.at&&!n.moveTo?.(J.at))return Xr.carry(B.slice(_+1).join(" && ")),window.location.assign(J.at),j;if(J.error)break}}return m(),T(),P?N.scrollIntoView({block:"start"}):window.scrollTo({top:document.documentElement.scrollHeight}),j},I=()=>{if(v(),r.value.trim()===""){S("help");return}const $=p.complete(r.value);$.length===1?S($[0]??r.value):$.length>1&&(g=w("p",{class:"hint"},$.map(j=>j.split(" ").pop()).join("  ")),o.insertAdjacentElement("afterend",g),window.scrollTo({top:document.documentElement.scrollHeight}))};o.addEventListener("submit",$=>{$.preventDefault();const j=r.value.trim();S(""),j&&(y.add(j),k(j))});let O="";r.addEventListener("keydown",$=>{if($.key==="Tab")$.preventDefault(),I();else if($.key==="ArrowUp")$.preventDefault(),S(y.previous(r.value));else if($.key==="ArrowDown")$.preventDefault(),S(y.next(r.value));else if($.key==="ArrowRight"&&r.selectionStart===r.value.length&&h.textContent)$.preventDefault(),S(r.value+h.textContent);else if($.ctrlKey&&!$.metaKey&&!$.altKey){const j=fw($.key,r.value,r.selectionStart??r.value.length,O);if(!j)return;$.preventDefault(),v(),S(j.line,j.caret),O=j.killed}else v()});for(const $ of["input","keyup","click","focus","select"])r.addEventListener($,T);let H=!0;r.addEventListener("input",()=>{H&&r.value!==""&&window.scrollTo({top:document.documentElement.scrollHeight}),H=r.value===""}),document.addEventListener("selectionchange",()=>{document.activeElement===r&&T()}),s.addEventListener("click",$=>{const j=$.target?.closest("a[data-run]");j?.dataset.run&&($.preventDefault(),k(j.dataset.run))}),window.addEventListener("keydown",$=>{const N=$.target?.matches("input, textarea, select, [contenteditable]")??!1,P=$.key.length===1&&!$.ctrlKey&&!$.metaKey&&!$.altKey;N||!P||r.focus({preventScroll:!1})}),o.addEventListener("click",()=>r.focus()),c.addEventListener("click",()=>r.focus()),T();const C=Xr.take();C&&k(C);const M=Cw();if(M){for(const $ of M.finished)$.trim()&&(y.add($.trim()),k($.trim()));S(M.unfinished),r.focus()}return{run:k,moveTo:$=>{p.moveTo($)&&(s.replaceChildren(),m(),T())}}}function Lw(t,e){return t.pages.find(n=>n.body.split(`
`).some(a=>a.trim()===`::${e}`))}function Nw(t){const e=`${t.label}: ${t.description}`;return"choices"in t?{type:"string",enum:t.choices,default:t.initial,description:e}:{type:"number",minimum:t.min,maximum:t.max,default:t.initial,description:e}}function Pw(t){return{type:"object",properties:Object.fromEntries(t.parameters.map(n=>[n.name,Nw(n)])),required:[],additionalProperties:!1}}const Nh=t=>t.length<2?t.join(""):`${t.slice(0,-1).join(", ")} or ${t.at(-1)}`;function Rw(t,e){if("choices"in t){if(e===void 0)return{value:t.initial};const a=ft(String(e)),s=t.choices.find(o=>ft(o)===a);return s===void 0?{error:`${t.name}: ${String(e)} is not one of ${Nh(t.choices.map(ft))}`}:{value:s}}const n=e===void 0?t.initial:typeof e=="number"?e:typeof e=="string"&&e.trim()!==""?Number(e):Number.NaN;return Number.isFinite(n)?n<t.min||n>t.max?{error:`${t.name}: ${n} is outside ${t.min} to ${t.max}`}:{value:n}:{error:`${t.name}: ${String(e)} is not a number`}}function Ph(t,e){const n=t.parameters.map(o=>o.name),a=Object.keys(e).find(o=>!n.includes(o));if(a!==void 0)return{error:`no option ${a}: choose ${Nh(n)}`};const s={};for(const o of t.parameters){const r=Rw(o,e[o.name]);if("error"in r)return r;s[o.name]=r.value}return{values:s}}const Fw={amp:"&",lt:"<",gt:">",quot:'"',"#39":"'",nbsp:" "};function Bw(t){return t.text?t.text:t.html?t.html.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g,"").replace(/<\/(p|h[1-6]|li|tr|div|pre|dt|dd|figcaption|blockquote)>|<br\s*\/?>/g,`
`).replace(/<[^>]+>/g,"").replace(/&(amp|lt|gt|quot|#39|nbsp);/g,(e,n)=>Fw[n]??"").split(`
`).map(e=>e.replace(/\s+/g," ").trim()).filter(Boolean).join(`
`):""}const Rh=t=>`Refused, nothing was run: ${t}`;function Dw(t,{site:e,goTo:n}){const a=`.app[data-app="${t}"]`,s=document.querySelector(a);if(s)return s;const o=Lw(e,t);return!o||!n(o.route)?null:document.querySelector(a)}function Hw(t,e){return{name:t.name,description:`${t.summary}. The reader sees it too: the site goes to the program's page and its dials move to what was asked. Answers in words, then the figures as JSON.`,inputSchema:Pw(t),annotations:{readOnlyHint:!0},async execute(n){const a=Ph(t,n);if("error"in a)return Rh(a.error);const s=t.run(a.values);return Ww(t.name,a.values,e),`${s.text}

${JSON.stringify(s.data)}`}}}function Ww(t,e,n){const a=Dw(t,n);a&&(ss(a,e),a.scrollIntoView?.({behavior:"smooth",block:"start"}))}function qw({run:t,programs:e}){return{name:"shell",description:`Runs a line at this site's prompt, as if the reader had typed it, and they see it echoed and answered. The site is laid out as directories of pages: ls, cd, cat README.md, find, grep and help work over it, and so does every program: ${e.map(n=>n.name).join(", ")}. Commands chain with &&.`,inputSchema:{type:"object",properties:{line:{type:"string",description:"the line to run, e.g. `cd projects && ls`"}},required:["line"],additionalProperties:!1},async execute(n){const a=t(String(n.line??"")),s=a.map(Bw).filter(Boolean).join(`

`);return a.some(o=>o.error)?Rh(s):s}}}function _w(t,e){if(!t)return()=>{};const n=new AbortController,a=[...e.programs.map(s=>Hw(s,e)),qw(e)];for(const s of a)t.registerTool(s,{signal:n.signal});return()=>{n.abort();for(const s of a)t.unregisterTool?.(s.name)}}const zw=[{file:"book/index.md",markdown:`---
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
`},{file:"craft/guess-the-rule.md",markdown:`---
title: Guess the rule
summary: A rule you cannot see marks sequences of three numbers ✅ or ❌. Test as many as you like, then guess it — the page my old site had in 2020 for my essay on testing and refactoring, played again.
order: 4
was: /TestingGuessTheRule/
---

# Guess  
the rule.

There is a rule that you have to guess, and it changes every time you reload
this page. Propose sequences of three numbers, test whether they satisfy the
rule or not, and guess which rule it is.

::guess-the-rule

It is the puzzle of [A quick puzzle to understand testing and
refactor](https://medium.com/p/9b3431afd333). 2, 4, 8 passes whatever the
rule is, so it says nothing about which one it is: what tells the rules apart
are the sequences that fail. The puzzle leaves, in my words there, "a lasting
memory of the necessity of having failing cases, indispensable to understand
TDD". And the rule you found is not the only one that passes every case you
tried — finding another that suits better, with every case still passing, is
what a refactor is.
`},{file:"craft/index.md",markdown:`---
title: The craft
summary: What I hold to, whoever writes the code — in the code, with others, and behind it all. Each line runs here, or has the essays where I argued it.
order: 35
was: /craft/writing/
---

# One small step,  
and the code  
works again.

That is the mantra I try to keep with every change, and the rest of what I
hold to grows from it. The links go to where each line runs, here; the numbers,
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

**To the trunk, small and often.** Continuous delivery is small steps for a
whole team: every change integrated into the trunk soon after it is made,
through a pipeline fast enough that nobody waits for it, so that the code is
always releasable — and everyone is working on nearly the same code, as if in
a meeting that never interrupts them. When a team integrates too seldom, I
look at what is in its way before I look at the team: how often it merges,
and what makes merging slow — often the CI, the speed of light of a team, and
one that can be changed. This site goes out on every push.
[[1](https://medium.com/p/70a3c6cb4e45), [2](https://medium.com/p/723ec18bee7c), [3](https://medium.com/p/c65f670d288f)]

\`\`\`yaml
on:
  push:
    branches: [main]
# …
      - run: npm ci
      - run: npm run coverage
      - run: node tools/architecture-history.mjs
      - run: npm run build
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
Given I have 12 cucumbers
---
Given I have 12 cucumbers
Given I have 12 cucumbers()
---
Given I have 12 cucumbers
given I have 12 cucumbers()
---
Given I have 12 cucumbers
given I Have 12 cucumbers()
---
Given I have 12 cucumbers
given I Have 12 cucumbers(12)
---
Given I have 12 cucumbers
given I Have N cucumbers(12)
---
Given I have 12 cucumbers
given I Have N cucumbers(number1)
---
Given I have 12 cucumbers
given I Have N Cucumbers(number1)
---
Given I have 12 cucumbers
givenI Have N Cucumbers(number1)
---
Given I have 12 cucumbers
givenIHave N Cucumbers(number1)
---
Given I have 12 cucumbers
givenIHaveN Cucumbers(number1)
---
Given I have 12 cucumbers
givenIHaveNCucumbers(number1)
--- The method Gherkin Genie asks for: the sentence is the name.
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
find the mistake and fix it, in the design and in the requirement alike. It
takes the cases that fail to tell one rule from another: [guess
one](/craft/guess-the-rule/).
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
jump from the strip. Where one of my essays says something about a step, it is
beside it, with a link to where I say it at length.

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
a time. Commits 19 to 23 do the same to the score itself, in [five
steps](#five-steps-and-the-code-works-after-each-one) of their own.

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

## Five steps, and the code works after each one

Probably the best thing the kata teaches, and it works on code of any size:
how to change the way something is kept without ever breaking it. First name
the parts — what keeps the data, what writes it, what reads it. Then add the
new beside the old, write to both, read from the new, stop writing the old,
and remove it:

::kata-five-steps

After each step the code works again, so each one could be committed and
merged: a large change becomes many small ones, without stopping delivery.
Elsewhere this shape is called a [parallel
change](https://martinfowler.com/bliki/ParallelChange.html). I wrote the
technique down in [Refactor Lessons Learned From The Bowling Game Kata
(2/2)](https://medium.com/p/1d28b3a78b08).

## Whose it is

The kata, its steps and the notes on its slides are Robert C. Martin's, from
his slides of 2005. Mine are the JavaScript, the commits a student makes one
by one, each labelled with its move, and the perfect game made to fail. The
slides it follows are on [the kata's page](/teaching/kata/), with a version in
Java; here the game keeps its state in private fields, \`#score\`, where the
slides still write \`_score\`.
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

## The craft

Small, safe steps, always: a test that fails is put right before the next step
is taken, and the code is never more than a step away from working. [What I
hold to, whoever writes the code.](/craft/)

::small-steps

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

[More of them, by subject.](/essays/)

## More to run

- ![The Rocinante Simulator: the inner solar system in three dimensions, and the ship's dials](/rocinante-simulator.jpg "card") [A relativistic rocket](/projects/rocinante/)  
  Both clocks, the ship's and home's, and the fuel.

- ![The auction floor: five buyers and a box of prawns](/projects/shots/fish-market.jpg "card dark") [The agent that won the fish auction](/projects/fish-market/)  
  A Dutch auction, December 2000. Seat your own agent.

- ![The Fibergochi, a stick figure in a yellow egg](/projects/shots/fibergochi.jpg "card dark") [The Fibergochi](/projects/fibergochi/)  
  A student kept like a Tamagotchi, 1999. Playable.

- ![A letter A drawn on a grid, and the network reading it](/projects/shots/letters.jpg "card dark") [My first neural network](/projects/first-network/)  
  Letters told apart by backpropagation, first written in C in 1994. Draw your own.

- ![The source of this site as boxes and arrows, the features above the frame they stand on](/projects/shots/architecture.jpg "card dark") [How this site is built](/projects/architecture/)  
  Its source as boxes and arrows, commit by commit: the program an AI wrote, and the rules it is held to.

- ![A fractal planet of seas, land and snow](/projects/shots/worlds.jpg "card dark") [The planet in the header](/projects/worlds/)  
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
ring.

A ball is as big as the number of files that need it, so the hotspots — the
files a change reaches first — stand out; it can be as big as what it needs,
as its lines, or as the commits that have changed it so far, which grows as
the history plays and stops where a file settles. Every file a commit
changes rings as it comes. Point at a file, and its own arrows come out: in
blue what it needs, in orange what needs it. Give them a reach of two, three
or all, and they go on from there: the blast radius of a change, in both
directions. Click a file, a box or a commit, and it opens on
[GitHub](https://github.com/drpicox/david-rodenas.com) as it stood then.

::architecture

How often each file changes, how far a change travels, and which files
change together with no arrow between them is the other half of this
picture: [how this site changes](/projects/changes/).

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
`},{file:"projects/changes.md",markdown:`---
title: How this site changes
summary: The history of this site's source, read for what changes, how often and with what — the files that settle and the ones that never do, how far a change travels, and the dependencies no arrow shows.
order: 91
---

# How this site changes

[How this site is built](/projects/architecture/) draws where each file
stands. This is how often each one moves. Git keeps every commit, and every
commit says which files it changed; read over the whole history, that says
what the arrows cannot: which files settle and which never do, how far a
change travels, and which files have to change together although nothing in
the code says so.

Like the picture of how it is built, every figure here is read off the
history at every push, so it is always the commit being published.

::change-matrix

Each row is a box as it stands now, a folder of the frame or a feature,
holding its files over their whole lives, from before they moved there too;
the files that are gone have a row of their own. Each column is a commit.
Read across, the features come in one after another, each written in a
burst and then mostly left alone, while the frame under them keeps being
touched. Read down, a column shaded from top to bottom is a sweep: one
commit that changed more than thirty files at once.

## Written, then left alone

The first thing the history says is how little changes. Most files are
written once and not touched again, and the ones that are touched are
touched in the commits right after the one that wrote them.

::change-settling

A file is hottest just after it is written, while what it has to do is
still being settled. Then it cools, and stays cool: what changes it later is
no longer itself, but a feature arriving that needs something of it, or a
rule applied to every file at once, like the commit that made each one
export a single value.

## The files that never settle

Some files never cool. They are not the young ones.

::change-hotspots

Adam Tornhill calls these hotspots (*Your Code as a Crime Scene*, 2015),
and looks at them first: whatever a file looks like, the ones that keep
changing are where the work goes. Most of these are files every feature, or
every page, passes through: the list the features are added to, which
changes because that is how the site grows; the composition root; the page
every page is written into; the terminal that takes it over in the browser.
A hotspot that no test runs is where a change most easily breaks something
nobody sees.

## Two kinds of unstable

Robert C. Martin measures how stable a component is by its place, not by
its history. Its instability is the share of its arrows that go out, what
it needs over what it needs and what needs it: 0 for a box that is needed
and needs nothing, which cannot change without everything that needs it
changing too; 1 for a box nothing needs, which is free to. Its abstractness
is how much of it can be depended on without depending on what it does:
here, the share of its files that hold nothing but types.

He draws one against the other. A box on the line between the two corners,
the main sequence, is as abstract as its place asks. A box at the bottom
left is needed by much and concrete, hard to change with nothing abstract in
it to change instead: the zone of pain. And he says what his picture cannot
show, that only what keeps changing hurts there; so each box here is as warm
as the history says its files changed.

::change-stability

The frame stands near that corner, as a frame would: everything is built on
it, and most of it is plain code. Where the two kinds of unstable disagree,
a box that is hard to change and changes anyway, is where a change costs
most, because what needs it may have to move with it. Whether it does, the
history can say too.

## How far a change travels

When a file changes, what needs it may have to change with it, and what
needs that, and so on: the arrows are the roads a change can take. How far
they let it go is a property of the design, which MacCormack, Rusnak and
Baldwin measured as its propagation cost (2006): the share of the source a
change to one file could reach, on average. How far changes did go is
another question, and the history answers it. At every commit, each file is
counted by how far below it, in what it needs or in what that needs, the
nearest other change was, and by whether it changed too.

::change-cascade

A change does travel up the arrows, and it does not travel far. The blast
radius drawn on the picture of how this site is built, with its reach set
to all, is what a change could do, not what changes do.

## An arrow onto a type

The dashed arrows on that picture need only a type: a box that depends on
an interface, not on what implements it. That is dependency inversion, and
its promise is that a change behind the interface stays behind it. Here it
is counted instead of assumed: for each kind of arrow, how often a change
at its head came with a change at its tail.

::change-ripples

The comparison that tests the promise is the one across boxes, where an
interface is a contract between two of them. Inside a box, a type is the
box's own vocabulary, and nothing says it should be quieter than the code
beside it.

## What changes together

Two files that keep changing in the same commits need each other, whatever
the arrows say. Harald Gall, Karin Hajek and Mehdi Jazayeri called it
logical coupling (1998). A commit that changed more than thirty files is
left out: a rename across the whole source changes everything at once, and
says nothing about what needs what.

::change-together

Where there is an arrow, changing together only says it is a strong one.
The pairs worth reading are those with no arrow between them, near or far:
they share something the compiler cannot see. Among them are the page the
build writes, in node, and the terminal that takes it over in the browser.
This site's first rule is that the content is in the HTML, and this is its
price: the page and the script that reads it must agree on its markup, a
contract no import states, kept by changing both.

## With its test

A change that comes with a change to its test, in the same commit, is the
mark test-driven work leaves in a history. The history cannot say which was
written first, only that they went together.

::change-tests

The rest went to files no test imports directly: some run by a test through
another file, the shell's commands through the shell, and some by none.

## What it is not

The history starts on 7 September 2026, so it is short, and some of these
numbers are small enough to move with the next commit. A commit is the unit,
however much it changed: a one-word fix and a rewrite are one change each.
The history is the main line's, and a branch's commits arrive with the
merge that brought them. The tests are left out of every count but the
last, because a test changes when what it tests does, and would count every
change twice. And changing together is not needing each other: it is what
has to be explained.

The analyses are small programs in the source of this site, tested like the
rest of it, and they read the same history the picture of how it is built
plays.
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
- [How this site changes](/projects/changes/) -- the same source read through its history: the files that settle and the ones that never do, how far a change travels, and what has to change together with no arrow to say so.

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
`}],Zr="---";function Gw(t){return(/^"(.*)"$/.exec(t)??/^'(.*)'$/.exec(t))?.[1]??t}function Yw(t){const e=t.replace(/\r\n?/g,`
`).split(`
`);if(e[0]?.trim()!==Zr)return{fields:{},body:t.trim()};const n=e.indexOf(Zr,1);if(n<0)return{fields:{},body:t.trim()};const a={};for(const s of e.slice(1,n)){const o=s.indexOf(":");o<=0||(a[s.slice(0,o).trim()]=Gw(s.slice(o+1).trim()))}return{fields:a,body:e.slice(n+1).join(`
`).trim()}}function Uw(t){const n=t.replace(/\.md$/,"").replace(/(^|\/)index$/,"");return n===""?"/":`/${n}/`}function Qr(t){if(t==="/")return"/";const e=t.slice(0,-1);return e.slice(e.lastIndexOf("/")+1)}function Jw(t){if(t==="/")return null;const e=t.slice(0,-1);return e.slice(0,e.lastIndexOf("/")+1)}function Kw(t){const{fields:e,body:n}=Yw(t.markdown),a=Uw(t.file);return{file:t.file,route:a,parent:Jw(a),name:Qr(a),title:e.title??Qr(a),summary:e.summary??"",order:Number(e.order??"100"),body:n,fields:e}}function Vw(t){return t.endsWith("/")?t:`${t}/`}function ei(t,e){return t.order-e.order||t.name.localeCompare(e.name)}class Xw{byRoute;linked;constructor(e){const n=e.map(Kw),a=n.filter(s=>!s.fields.link).sort(ei);this.byRoute=new Map(a.map(s=>[s.route,s])),this.linked=new Map(n.flatMap(s=>{const o=this.byRoute.get(Vw(s.fields.link??""));return!s.fields.link||!o?[]:[[s.route,{...o,parent:s.parent,name:s.name,order:s.order,link:s.route}]]}))}get links(){return[...this.linked.values()].map(e=>({from:e.link,to:e.route}))}get pages(){return[...this.byRoute.values()]}at(e){const n=this.linked.get(e);return this.byRoute.get(n?n.route:e)}childrenOf(e){return[...this.pages,...this.linked.values()].filter(n=>n.parent===e).sort(ei)}trailTo(e){const n=this.at(e);return n?n.parent===null?[n]:[...this.trailTo(n.parent),n]:[]}}const lt=new Xw(zw),ti=["on","off"];function ni(t,e){if(t.length===0)return{text:"No flags to try just now."};const n=Math.max(...t.map(r=>r.name.length)),a=r=>e.isOn(r.name)?"on":"off",s=t.map(r=>{const i=ti.map(h=>h===a(r)?`[${h}]`:` ${h} `).join("");return`${r.name.padEnd(n)}  ${i}  ${r.description}`}),o=t.map(r=>{const i=ti.map(h=>h===a(r)?`<strong aria-current="true">${h}</strong>`:`<a href="#" data-run="flags ${r.name} ${h}" title="flags ${r.name} ${h}">${h}</a>`).join(" ");return`<dt>${x(r.name)} <span class="switch">${i}</span></dt><dd>${x(r.description)}</dd>`});return{text:s.map(r=>r.trimEnd()).join(`
`),html:`<dl class="help flags">${o.join("")}</dl>`}}function Zw(t,e){return{name:"flags",usage:"flags [name [on|off]]",description:"list the trials this site can be switched into, or switch one",run(n,[a,s]){return a===void 0?ni(t,e):t.some(o=>o.name===a)?s!==void 0&&s!=="on"&&s!=="off"?{text:`flags: ${a}: choose on or off`,error:!0}:(e.set(a,s===void 0?!e.isOn(a):s==="on"),ni(t,e)):{text:`flags: ${a}: no such flag. Try flags`,error:!0}}}}function Qw(t,e,n){return t.flatMap(a=>{if(a.trial===void 0||e.chosen(a.name))return[];let s=e.drawn(a.name);return s===void 0&&(s=n()<a.trial,e.draw(a.name,s)),[{name:a.name,on:s}]})}function ey(t,e){const n=new URLSearchParams(e),a={};for(const{name:s}of t){const o=n.get(s);(o==="on"||o==="off")&&(a[s]=o==="on")}return a}function ty(t){if(t.includes("--help"))return{help:!0};const e={};for(let n=0;n<t.length;n+=1){const a=t[n]??"";if(!a.startsWith("--"))return{error:`${a}: options are written --name value`};const s=a.indexOf("=");if(s>0){e[a.slice(2,s)]=a.slice(s+1);continue}const o=t[n+1];if(o===void 0)return{error:`${a} needs a value`};e[a.slice(2)]=o,n+=1}return{given:e}}const ny=t=>"choices"in t?t.choices.map(ft).join("|"):"n",ay=t=>"choices"in t?ft(t.initial):`${t.min} to ${t.max}, ${t.initial}`;function sy(t){const e=[t.name,...t.parameters.map(s=>`[--${s.name} ${ny(s)}]`)].join(" "),n=Math.max(...t.parameters.map(s=>s.name.length+2)),a=t.parameters.map(s=>`  ${`--${s.name}`.padEnd(n)}  ${s.description} (${ay(s)})`);return[e,`  ${t.summary}`,"",...a].join(`
`)}function oy(t){return{name:t.name,usage:`${t.name} [--help] [--option n]...`,description:t.summary,run(e,n){const a=ty(n);if("help"in a)return{text:sy(t)};const s="error"in a?a:Ph(t,a.given);if("error"in s)return{text:`${t.name}: ${s.error}`,error:!0};const o=t.run(s.values);return{text:o.text,html:`<div class="app program-out">${o.html}</div>`}}}}function ry(t){return[...t.flatMap(e=>e.commands??[]),...t.flatMap(e=>e.programs??[]).map(oy)]}function ai(){const t=Ye.flatMap(g=>g.flags??[]),e=new ag;for(const[g,b]of Object.entries(ey(t,window.location.search)))e.set(g,b);const n=Qw(t,e,Math.random),a=g=>`${g.name}-${g.on?"on":"off"}`;for(const g of n)Xt(Vt("trial",a(g)));document.addEventListener("click",g=>{const b=g.target?.closest("main a[href]");if(!b||window.location.pathname!=="/"||n.length===0)return;const v=b.host===window.location.host?b.pathname:b.href;for(const T of n)Xt(Vt(a(T),"open",v))},{capture:!0});const s=[...Lh,...ry(Ye),Zw(t,e)],o=ng(Ye),i=(g=>g.endsWith("/")?g:`${g}/`)(window.location.pathname),h=lt.at(i);let l=qr(o,{site:lt}),c=Kr(document),d=null;const u=nw(lt,(g,b)=>{l(),l=qr(o,{site:lt}),c(),c=Kr(document);for(const v of Ye)v.arrive?.(g);b||d?.moveTo(g.route)});if(d=Ow(lt,h?i:"/",{moveTo:g=>u(g,{keep:!0}),clearPage:()=>{l(),l=()=>{},c(),c=()=>{},document.querySelector("main")?.replaceChildren()},commands:s,heard:g=>Xt(Vt("command",s.some(b=>b.name===g)?g:"unknown"))}),h)for(const g of Ye)g.arrive?.(h);const p={run:g=>{d?.run(g)}};for(const g of Ye)g.install?.(p);const y=Ye.flatMap(g=>g.programs??[]);_w(sg(),{programs:y,site:lt,goTo:g=>u(g),run:g=>d?.run(g)??[]})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ai):ai();
