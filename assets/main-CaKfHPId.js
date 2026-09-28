function Ts(t){const e=new Map,n=new Map;return t.changes.map(a=>{for(const s of a.removed)e.delete(s);for(const[s,o,r,i,h]of a.added)e.set(s,h?{id:s,path:o,lines:r,test:i,typesOnly:h}:{id:s,path:o,lines:r,test:i});for(const[s,o]of a.moved){const r=e.get(s);r&&e.set(s,{...r,path:o})}for(const[s,o]of a.resized){const r=e.get(s);r&&e.set(s,{...r,lines:o})}for(const[s,o]of a.unlinked)n.delete(`${s}>${o}`);for(const[s,o,r]of a.linked)n.set(`${s}>${o}`,r);return{modules:[...e.values()].sort((s,o)=>s.id-o.id),dependencies:[...n].map(([s,o])=>{const[r=0,i=0]=s.split(">").map(Number);return{from:r,to:i,typeOnly:o}}).sort((s,o)=>s.from-o.from||s.to-o.to)}})}function zt(t){return t.includes("/")?t.split("/")[0]??t:"src"}function we(t){const e=t.split("/");return e.length<=2?t:`${e[0]}/${e[1]}`}function ui(t){const e=new Map;for(const{from:l,to:c}of t.dependencies){const[d,u]=[we(l),we(c)];d!==u&&(e.has(d)||e.set(d,new Set),e.has(u)||e.set(u,new Set),e.get(d)?.add(u))}let n=0;const a=new Map,s=new Map,o=[],r=new Set,i=[],h=l=>{a.set(l,n),s.set(l,n),n+=1,o.push(l),r.add(l);for(const d of e.get(l)??[])a.has(d)?r.has(d)&&s.set(l,Math.min(s.get(l)??0,a.get(d)??0)):(h(d),s.set(l,Math.min(s.get(l)??0,s.get(d)??0)));if(s.get(l)!==a.get(l))return;const c=[];for(let d=o.pop();d!==void 0&&(r.delete(d),c.push(d),d!==l);d=o.pop());c.length>1&&i.push(c.sort())};for(const l of e.keys())a.has(l)||h(l);return i.sort((l,c)=>(l[0]??"").localeCompare(c[0]??""))}const nt=12,sa=6,mi=14,_n=14,oa=12,nl=14,_s=40,Tt=10,al=16,sl=t=>Math.min(6,2.2+Math.sqrt(t)/4),fi=t=>t.split("/").pop()?.replace(/\.ts$/,"")??t;function zs(t,e){const n=new Map,a=s=>{const o=n.get(s);if(o!==void 0)return o;n.set(s,0);const r=Math.max(-1,...[...e.get(s)??[]].map(a))+1;return n.set(s,r),r};for(const s of t)a(s);return n}function ol(t,e){const n=new Map;for(const{from:a,to:s,typeOnly:o}of t.dependencies){const[r,i]=[e.get(a),e.get(s)];if(r===void 0||i===void 0||r===i)continue;const h=n.get(`${r}>${i}`)??{from:r,to:i,count:0,typeOnly:!0};n.set(`${r}>${i}`,{...h,count:h.count+1,typeOnly:h.typeOnly&&o})}return[...n.values()].sort((a,s)=>a.from.localeCompare(s.from)||a.to.localeCompare(s.to))}function rl(t,e,n){const a=new Map(t.map(u=>[u,u]));for(const u of n)for(const f of u)a.set(f,u[0]??f);const s=u=>a.get(u)??u,o=new Map,r=new Map;for(const{from:u,to:f}of e){const[m,g]=[zt(u),zt(f)];m!==g?o.set(m,(o.get(m)??new Set).add(g)):s(u)!==s(f)&&r.set(s(u),(r.get(s(u))??new Set).add(s(f)))}const i=[...new Set(t.map(zt))],h=zs(i,o);i.sort((u,f)=>(h.get(f)??0)-(h.get(u)??0)||u.localeCompare(f));const l=zs([...new Set(t.map(s))],r),c=i.flatMap(u=>{const f=t.filter(g=>zt(g)===u);return[...new Set(f.map(g=>l.get(s(g))??0))].sort((g,y)=>y-g).map(g=>({band:u,boxes:f.filter(y=>(l.get(s(y))??0)===g).sort()}))}),d=new Map;for(const u of c){const f=m=>{const g=e.filter(y=>y.to===m&&d.has(y.from)).map(y=>d.get(y.from)??.5);return g.length?g.reduce((y,p)=>y+p,0)/g.length:.5};u.boxes.sort((m,g)=>f(m)-f(g)||m.localeCompare(g)),u.boxes.forEach((m,g)=>d.set(m,g/Math.max(1,u.boxes.length-1)))}return c}function ra(t,e){const n=Math.max(1,Math.ceil(Math.sqrt(e*2.2))),a=n*_n;return{columns:n,inner:a,width:Math.max(a+sa*2,fi(t).length*6+sa*2),height:mi+Math.ceil(e/n)*_n+sa}}function il(t,e){const n=s=>{const o=e.get(s);return o?o.x+o.width/2:0},a=(s,o,r)=>s?s.x+s.width*(o+1)/(r+1):0;return t.map(s=>{const[o,r]=[e.get(s.from),e.get(s.to)],i=t.filter(l=>l.from===s.from).sort((l,c)=>n(l.to)-n(c.to)),h=t.filter(l=>l.to===s.to).sort((l,c)=>n(l.from)-n(c.from));return{...s,x1:a(o,i.indexOf(s),i.length),y1:o?o.y+o.height:0,x2:a(r,h.indexOf(s),h.length),y2:r?r.y:0}})}function Ss(t,{tests:e=!1,width:n=1100}={}){const a=t.modules.filter(g=>e||!g.test),s=new Map(a.map(g=>[g.id,g])),o=new Map(a.map(g=>[g.id,we(g.path)])),r=new Map;for(const g of[...a].sort((y,p)=>y.path.localeCompare(p.path))){const y=we(g.path);r.set(y,[...r.get(y)??[],g])}const i=ol(t,o),h=ui({dependencies:t.dependencies.flatMap(({from:g,to:y,typeOnly:p})=>{const[b,v]=[s.get(g),s.get(y)];return b&&v?[{from:b.path,to:v.path,typeOnly:p}]:[]})}),l=new Set(h.flat()),c=rl([...r.keys()],i,h),d=[],u=new Map,f=[];let m=nt;return c.forEach((g,y)=>{const p=y===0||c[y-1]?.band!==g.band,b=c[y+1]?.band!==g.band;p&&(d.push({name:g.band,x:nt,y:m,width:n-nt*2,height:0}),m+=al+Tt);const v=n-(nt+Tt)*2,T=[[]];let S=0;for(const k of g.boxes){const E=ra(k,r.get(k)?.length??0).width;S>0&&S+E>v&&(T.push([]),S=0),T[T.length-1]?.push(k),S+=E+oa}let I=0;if(T.forEach((k,E)=>{E>0&&(m+=I+nl);const O=k.map(M=>ra(M,r.get(M)?.length??0)),H=O.reduce((M,L)=>M+L.width,0)+oa*(k.length-1);let C=nt+Tt+(v-H)/2;I=0,k.forEach((M,L)=>{const $=O[L]??ra(M,0);u.set(M,{name:M,label:fi(M),x:C,y:m,width:$.width,height:$.height,rank:c.length-y,cyclic:l.has(M)});const j=C+($.width-$.inner)/2;(r.get(M)??[]).forEach((N,P)=>{const[B,_]=[P%$.columns,Math.floor(P/$.columns)];f.push({id:N.id,path:N.path,box:M,x:j+(B+.5)*_n,y:m+mi+(_+.5)*_n,radius:sl(N.lines),test:N.test,typesOnly:N.typesOnly??!1})}),C+=$.width+oa,I=Math.max(I,$.height)})}),m+=I,b){const k=d[d.length-1];k&&(d[d.length-1]={...k,height:m+Tt-k.y}),m+=Tt}m+=_s}),{width:n,height:m-_s+nt,bands:d,boxes:[...u.values()],balls:f,links:il(i,u)}}function hl(t,e=!1){const n=t.modules.filter(s=>!e||!s.test),a=new Map(n.map(s=>[s.id,s.path]));return{modules:n.map(({path:s,lines:o,test:r,typesOnly:i=!1})=>({path:s,lines:o,test:r,typesOnly:i})),dependencies:t.dependencies.flatMap(({from:s,to:o,typeOnly:r})=>{const[i,h]=[a.get(s),a.get(o)];return i!==void 0&&h!==void 0?[{from:i,to:h,typeOnly:r}]:[]})}}function pi(t){const e=new Set(t.modules.filter(n=>n.test).map(n=>n.id));return new Set(t.dependencies.filter(n=>e.has(n.from)&&!e.has(n.to)).map(n=>n.to))}function zn(t){const e=hl(t,!0),n=new Set(t.modules.filter(s=>!s.test&&!s.typesOnly).map(s=>s.id)),a=e.dependencies.filter(s=>we(s.from)!==we(s.to));return{files:e.modules.length,tests:t.modules.length-e.modules.length,lines:e.modules.reduce((s,o)=>s+o.lines,0),boxes:new Set(e.modules.map(s=>we(s.path))).size,arrows:e.dependencies.length,crossing:a.length,typeOnly:e.dependencies.filter(s=>s.typeOnly).length,inCycles:ui(e).flat().length,testable:n.size,tested:[...pi(t)].filter(s=>n.has(s)).length}}const ll={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function x(t){return t.replace(/[&<>"]/g,e=>ll[e]??e)}function ee(t,e,n=`${e}s`){return`${t} ${t===1?e:n}`}const cl=new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"long",year:"numeric",timeZone:"Europe/Madrid"});function gi(t,e){const n=[`${ee(e.files,"file")} in ${ee(e.boxes,"box","boxes")}, ${ee(e.tests,"test")}`,`${ee(e.crossing,"arrow")} between boxes, ${e.typeOnly} of all ${e.arrows} onto a type`,`a test reaches ${e.tested} of the ${e.testable} files with something to test`,e.inCycles?`${ee(e.inCycles,"box","boxes")} in a circle`:"no boxes in a circle"].join(" · "),a=x(t.sha);return`<a href="https://github.com/drpicox/david-rodenas.com/commit/${a}" target="_blank" rel="noopener noreferrer"><code>${a}</code></a> ${cl.format(new Date(t.date))} — ${x(t.subject)}<br><span class="measured">${n}</span>`}const Y=t=>Math.round(t*10)/10;function dl({x1:t,y1:e,x2:n,y2:a}){const s=Math.max(18,(a-e)/2);return`M${Y(t)} ${Y(e)} C${Y(t)} ${Y(e+s)} ${Y(n)} ${Y(a-s)} ${Y(n)} ${Y(a)}`}function ul(t){const e=t.bands.map(r=>`<g class="band" data-band="${x(r.name)}"><rect x="${Y(r.x)}" y="${Y(r.y)}" width="${Y(r.width)}" height="${Y(r.height)}" rx="6"/><text x="${Y(r.x+8)}" y="${Y(r.y+12)}">${x(r.name)}</text></g>`).join(""),n=t.links.map(r=>{const i=Y(Math.min(4,.8+Math.log2(r.count)*.7));return`<path class="link${r.typeOnly?" type-only":""}" stroke-width="${i}" d="${dl(r)}" marker-end="url(#arrowhead)"><title>${x(`${r.from} → ${r.to}: ${r.count}`)}</title></path>`}).join(""),a=t.boxes.map(r=>`<g class="box${r.cyclic?" cyclic":""}" data-box="${x(r.name)}"><rect x="${Y(r.x)}" y="${Y(r.y)}" width="${Y(r.width)}" height="${Y(r.height)}" rx="4"/><text x="${Y(r.x+6)}" y="${Y(r.y+10)}">${x(r.label)}</text></g>`).join(""),s=t.balls.map(r=>`<circle class="ball${r.test?" test":""}" cx="${Y(r.x)}" cy="${Y(r.y)}" r="${Y(r.radius)}"><title>${x(r.path)}</title></circle>`).join(""),o=`${t.boxes.length} boxes, ${t.balls.length} files, ${t.links.length} arrows between boxes`;return`<svg class="architecture" viewBox="0 0 ${t.width} ${Y(t.height)}" role="img" aria-label="${o}"><defs><marker id="arrowhead" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z"/></marker></defs><g class="bands">${e}</g><g class="links">${n}</g><g class="boxes">${a}</g><g class="balls">${s}</g></svg>`}const ia=600,St=60,Be=4;function wi(t,e){const n=i=>Be+i/Math.max(1,t.length-1)*(ia-Be*2),a=(i,h)=>{const l=Math.max(1,...t.map(i)),c=t.map((d,u)=>`${n(u).toFixed(1)},${(St-Be-i(d)/l*(St-Be*2)).toFixed(1)}`).join(" ");return`<polyline class="${h}" points="${c}"/>`},s=(ia-Be*2)/Math.max(1,t.length-1),o=t.map((i,h)=>i.inCycles?`<rect class="cycle" x="${(n(h)-s/2).toFixed(1)}" y="0" width="${s.toFixed(1)}" height="${St}"/>`:"").join(""),r=n(e).toFixed(1);return`<svg class="sparks" viewBox="0 0 ${ia} ${St}" role="img" aria-label="Files and arrows between boxes, commit by commit">${o}${a(i=>i.files,"files")}${a(i=>i.crossing,"crossing")}<line class="now" x1="${r}" x2="${r}" y1="0" y2="${St}"/><text x="${Be}" y="11" class="files">files</text><text x="${Be+34}" y="11" class="crossing">arrows between boxes</text></svg>`}function ml(t,e){const n=Ts(t),[a,s]=[n[e],t.commits[e]];return!a||!s?"":`<figure class="architecture-figure">${ul(Ss(a))}<figcaption>${gi(s,zn(a))}</figcaption>${wi(n.map(zn),e)}</figure>`}const fl=t=>{const e=JSON.parse(t("/data/architecture.json"));return ml(e,e.commits.length-1)},gt=30;function pl(t,e,n){const a=new Set([t]);let s=[t];for(let o=1;s.length>0;o+=1){const r=[];for(const i of s)for(const h of e.get(i)??[])if(!a.has(h)){if(n.has(h))return o;a.add(h),r.push(h)}s=r}return null}function gl(t,e,n=gt){const a=new Map;return t.changes.forEach((s,o)=>{const r=e[o-1];if(!r||s.changed.length===0||s.changed.length>n)return;const i=new Set(r.modules.filter(d=>!d.test).map(d=>d.id)),h=new Set(s.removed),l=new Set(s.changed.filter(d=>i.has(d))),c=new Map;for(const{from:d,to:u}of r.dependencies)i.has(d)&&i.has(u)&&c.set(d,[...c.get(d)??[],u]);for(const d of i){if(h.has(d))continue;const u=pl(d,c,l),f=a.get(u)??{seen:0,changed:0};a.set(u,{seen:f.seen+1,changed:f.changed+(l.has(d)?1:0)})}}),[...a].map(([s,o])=>({distance:s,...o})).sort((s,o)=>(s.distance??1/0)-(o.distance??1/0))}function wl(t,e=gt,n=2){const a=new Map;for(const{changed:s}of t.changes){if(s.length>e)continue;const o=[...s].sort((r,i)=>r-i);o.forEach((r,i)=>{for(const h of o.slice(i+1).map(l=>`${r}:${l}`))a.set(h,(a.get(h)??0)+1)})}return[...a].filter(([,s])=>s>=n).map(([s,o])=>{const[r=0,i=0]=s.split(":").map(Number);return{a:r,b:i,together:o}}).sort((s,o)=>o.together-s.together||s.a-o.a||s.b-o.b)}function Ms(t){const e=new Map,n=(a,s)=>{const o=e.get(a);o&&Object.assign(o,s)};return t.changes.forEach((a,s)=>{for(const[o,r,i,h,l=!1]of a.added)e.set(o,{id:o,path:r,lines:i,test:h,typesOnly:l,born:s,changed:[]});for(const[o,r]of a.moved)n(o,{path:r});for(const[o,r]of a.resized)n(o,{lines:r});for(const o of a.changed)e.get(o)?.changed.push(s);for(const o of a.removed)n(o,{went:s})}),[...e.values()].sort((a,s)=>a.id-s.id)}let cn;function yi(t,e){if(cn?.read===t&&cn.at===e)return cn.then;const n=Math.max(0,Math.min(e,t.history.commits.length-1))+1,a={commits:t.history.commits.slice(0,n),changes:t.history.changes.slice(0,n)},s=n===t.history.commits.length?t:{history:a,snapshots:t.snapshots.slice(0,n),lives:Ms(a)};return cn={read:t,at:e,then:s},s}function yl(t){const e=new Set(t.modules.filter(s=>!s.test).map(s=>s.id)),n=new Map;for(const{from:s,to:o}of t.dependencies)e.has(s)&&e.has(o)&&n.set(o,[...n.get(o)??[],s]);let a=0;for(const s of e){const o=new Set([s]),r=[s];for(let i=r.pop();i!==void 0;i=r.pop())for(const h of n.get(i)??[])o.has(h)||(o.add(h),r.push(h));a+=o.size}return e.size>0?a/e.size**2:0}const A=t=>t.toFixed(1);function xe(t,e){if(e===0)return"–";const n=t/e*100;return`${n>=10?Math.round(n):Math.round(n*10)/10}%`}const Gs=640,dn=180,Ys=26,ha=14,bl=150,vl=4,Us=t=>t.reduce((e,n)=>({seen:e.seen+n.seen,changed:e.changed+n.changed}),{seen:0,changed:0});function kl(t,e){const n=m=>Us(t.filter(g=>g.distance===m)),a=[["a file it needs changed",n(1)],["two arrows down",n(2)],["three",n(3)],["four or more",Us(t.filter(m=>m.distance!==null&&m.distance>=vl))],["nothing it needs changed",n(null)]],s=({seen:m,changed:g})=>m>0?g/m:0,o=Math.max(1e-4,...a.map(([,m])=>s(m))),r=Gs-dn-bl,i=a.map(([m,g],y)=>{const p=8+y*Ys,b=Math.max(1,s(g)/o*r);return`<text class="label" x="${dn-8}" y="${A(p+ha-3)}" text-anchor="end">${m}</text><rect class="bar${y===a.length-1?" none":""}" x="${dn}" y="${A(p)}" width="${A(b)}" height="${ha}" rx="2"/><text class="value" x="${A(dn+b+6)}" y="${A(p+ha-3)}">${xe(g.changed,g.seen)} · ${g.changed} of ${g.seen}</text>`}).join(""),h=8+a.length*Ys,l=`<svg class="cascade" viewBox="0 0 ${Gs} ${h}" role="img" aria-label="The share of files that changed with a change below them, by how far below it was">${i}</svg>`,[c,d,,,u]=a.map(([,m])=>xe(m.changed,m.seen)),f=`In theory, a change to one file can reach ${xe(e,1)} of the source, on average: itself, what needs it, and what needs that, as far as the arrows go. In the history, when a file it needs changed, a file changed with it in ${c} of the commits; two arrows down, in ${d}; with nothing it needs changed, in ${u}.`;return`<figure class="changes-figure">${l}<figcaption>${f}</figcaption></figure>`}function bi(t){return t.went===void 0?we(t.path):null}function xl(t,e){const n=new Map,a=(o,r,i,h)=>{const[,l,c]=o.cells.get(r)??[r,0,0];o.cells.set(r,[r,l+i,c+h])};for(const o of t){if(o.test)continue;const r=bi(o),i=n.get(r)??{born:o.born,cells:new Map};i.born=Math.min(i.born,o.born),n.set(r,i),a(i,o.born,0,1);for(const h of o.changed)a(i,h,1,0)}const s=o=>o===null?1/0:e.includes(o)?e.indexOf(o):e.length;return[...n].map(([o,{born:r,cells:i}])=>({box:o,band:o===null?null:zt(o),born:r,cells:[...i.values()].sort((h,l)=>h[0]-l[0])})).sort((o,r)=>s(o.band)-s(r.band)||o.born-r.born||(o.box??"").localeCompare(r.box??"")).map(({box:o,band:r,cells:i})=>({box:o,band:r,cells:i}))}const $l=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function tn(t){const[,e=1,n=1]=t.date.slice(0,10).split("-").map(Number);return`${n} ${$l[e-1]??""}`}const Js=1100,Fn=150,Tl=6,Gt=11,Sl=16,Ml=8,Al=20,Il=t=>Math.min(1,.25+.25*Math.log2(t)),El=t=>t.box===null?"gone":t.box.slice(t.box.indexOf("/")+1);function jl(t,e,n){const a=[];let s=0,o;for(const r of t){r.band!==o&&(s+=o===void 0?0:Ml,r.band!==null&&(a.push(`<text class="band" x="0" y="${A(s+11)}">${x(r.band)}</text>`),s+=Sl),o=r.band);const i=r.cells.reduce((c,[,d])=>c+d,0),h=r.cells.reduce((c,[,,d])=>c+d,0),l=`${r.box??"the files that are gone"}: ${ee(i,"change")}, ${ee(h,"file")} written`;a.push(`<text class="row" data-box="${x(r.box??"")}" data-top="${A(s)}" x="${Fn-6}" y="${A(s+Gt-2.5)}" text-anchor="end">${x(El(r))}<title>${x(l)}</title></text>`);for(const[c,d,u]of r.cells)d>0&&a.push(`<rect class="changed" x="${A(e(c)+.5)}" y="${A(s+.5)}" width="${A(Math.max(1,n-1))}" height="${Gt-2}" rx="1" style="--v:${Il(d).toFixed(2)}"/>`),u>0&&a.push(`<circle class="written" cx="${A(e(c)+n/2)}" cy="${A(s+Gt/2-.5)}" r="1.7"/>`);s+=Gt}return{markup:a.join(""),bottom:s}}function Cl(t,e,n){const a=[];let s=-1/0;return t.forEach((o,r)=>{const i=tn(o);r>0&&tn(t[r-1]??o)===i||e(r)-s<36||(s=e(r),a.push(`<line class="day" x1="${A(e(r))}" x2="${A(e(r))}" y1="${A(n+2)}" y2="${A(n+6)}"/><text class="day" x="${A(e(r))}" y="${A(n+16)}">${i}</text>`))}),a.join("")}function Ol(t,e,n,a=e.length-1){const s=(Js-Fn-Tl)/Math.max(1,e.length),o=c=>Fn+c*s,{markup:r,bottom:i}=jl(t,o,s),h=a<e.length-1?`<rect class="future" x="${A(o(a+1))}" y="0" width="${A(o(e.length)-o(a+1))}" height="${A(i)}"/><line class="now" x1="${A(o(a)+s/2)}" x2="${A(o(a)+s/2)}" y1="0" y2="${A(i+4)}"/>`:"",l=[...n].map(c=>{const d=e[c];return d?`<rect class="sweep" x="${A(o(c))}" y="0" width="${A(s)}" height="${A(i)}"><title>${x(`${tn(d)}, a sweep: ${d.subject}`)}</title></rect>`:""}).join("");return`<svg class="change-matrix" data-left="${Fn}" data-step="${Number(s.toFixed(3))}" data-row="${Gt}" viewBox="0 0 ${Js} ${A(i+Al)}" role="img" aria-label="${t.length} boxes over ${e.length} commits: where each commit changed files, and where it wrote new ones">${l}${r}${h}${Cl(e,o,i)}</svg>`}const Ks=["January","February","March","April","May","June","July","August","September","October","November","December"];function Ll(t,e){const[n,a=1,s]=t.date.slice(0,10).split("-").map(Number),[o,r=1,i]=e.date.slice(0,10).split("-").map(Number),[h,l]=[Ks[a-1],Ks[r-1]];return n!==o?`from ${s} ${h} ${n} to ${i} ${l} ${o}`:a!==r?`from ${s} ${h} to ${i} ${l} ${o}`:s===i?`on ${s} ${h} ${n}`:`from ${s} to ${i} ${l} ${o}`}function Nl(t,e=t.history.commits.length-1){const{history:n,snapshots:a,lives:s}=t,o=a.at(-1)??{modules:[],dependencies:[]},r=Ss(o).bands.map(p=>p.name),i=new Set(n.changes.flatMap((p,b)=>p.changed.length>gt?[b]:[])),h=yi(t,e),l=h.lives.filter(p=>!p.test),c=l.reduce((p,b)=>p+b.changed.length,0),[d,u]=[n.commits[0],h.history.commits.at(-1)],f=h.history.commits.length===n.commits.length?ee(n.commits.length,"commit"):`${h.history.commits.length} of ${ee(n.commits.length,"commit")}`,m=d&&u?`${f}, ${Ll(d,u)}`:"no commits",g=(p,b)=>`<span class="key ${p}"></span>${b}`,y=(p,b)=>`<span class="key shade" style="--v:${p}"></span>${b}`;return`<figure class="changes-figure">${Ol(xl(s,r),n.commits,i,h.history.commits.length-1)}<p class="changes-pointed" aria-live="polite"></p><p class="changes-legend">${y(.25,"one file changed")}${y(.5,"two")}${y(.75,"four")}${y(1,"eight or more")}${g("written","a file written")}${g("sweep",`a sweep, over ${gt} files at once`)}</p><figcaption>${m}: ${ee(c,"change")} to files that ship, and ${ee(l.length,"file")} written.</figcaption></figure>`}function Gn(t){return x(t).replaceAll("/","/<wbr>")}function Yn(t,e,n,a){const s=new Map;for(const[i,h]of t){const[l,c]=a==="needs"?[i,h]:[h,i];s.set(l,[...s.get(l)??[],c])}const o=new Map;let r=[e];for(let i=1;i<=n&&r.length>0;i+=1){const h=[];for(const l of r)for(const c of s.get(l)??[])c!==e&&!o.has(c)&&(o.set(c,i),h.push(c));r=h}return o}function Pl(t,e,n,a=12){const s=new Map(e.map(m=>[m.id,m])),o=new Set(n.modules.map(m=>m.id)),r=m=>o.has(m)&&s.get(m)?.test===!1,i=n.dependencies.map(({from:m,to:g})=>[m,g]),h=(m,g)=>{const y=Math.min(Yn(i,m,1/0,"needs").get(g)??1/0,Yn(i,g,1/0,"needs").get(m)??1/0);return y===1?"an arrow":Number.isFinite(y)?"arrows through others":"no arrow at all"},c=t.filter(({a:m,b:g})=>r(m)&&r(g)).slice(0,a).map(({a:m,b:g,together:y})=>({together:y,a:s.get(m)?.path??"",b:s.get(g)?.path??"",joined:h(m,g)})),d=c.filter(m=>m.joined==="no arrow at all").length,u=c.map(m=>`<tr${m.joined==="no arrow at all"?' class="hidden"':""}><td>${m.together}</td><td><code>${Gn(m.a)}</code></td><td><code>${Gn(m.b)}</code></td><td>${m.joined}</td></tr>`).join(""),f=`The ${c.length} pairs of files that changed together most, the tests and the sweeps left out, and what joins them in the source now. ${d} of them ${d===1?"has":"have"} no arrow between them, near or far.`;return`<figure class="changes-figure"><table class="together"><thead><tr><th>commits</th><th>one file</th><th>and the other</th><th>between them</th></tr></thead><tbody>${u}</tbody></table><figcaption>${f}</figcaption></figure>`}const Vs=300,Mt=12,Xs=3;function Rl(t,e,n){const a=r=>A(Xs+r/Math.max(1,n-1)*(Vs-Xs*2)),s=t.went??e-1,o=t.changed.map(r=>`<line class="change" x1="${a(r)}" x2="${a(r)}" y1="1.5" y2="${Mt-1.5}"/>`).join("");return`<svg class="life" viewBox="0 0 ${Vs} ${Mt}" role="img" aria-label="written at commit ${t.born+1}, changed at ${t.changed.length} commits after"><line class="lived" x1="${a(t.born)}" x2="${a(s)}" y1="${Mt/2}" y2="${Mt/2}"/>${o}<circle class="written" cx="${a(t.born)}" cy="${Mt/2}" r="2.4"/></svg>`}function Fl(t,e,n,a=12,s=e){const o=t.filter(c=>!c.test&&c.went===void 0).sort((c,d)=>d.changed.length-c.changed.length||d.lines-c.lines||c.path.localeCompare(d.path)).slice(0,a),r=c=>n?.lines[c.path],i=o.map(c=>{const d=r(c);return`<tr><td><code>${Gn(c.path)}</code></td><td>${c.changed.length}</td><td>${c.lines}</td><td>${d===void 0?"–":`${Math.round(d)}%`}</td><td>${Rl(c,e,s)}</td></tr>`}).join(""),h=o.filter(c=>r(c)===0).length,l=[`The ${o.length} files changed most, each one's life on the same line of commits, from the first to the last: a dot where it was written, and a mark for every commit that changed it.`,n?`${h} of them ${h===1?"has":"have"} no line a test runs.`:""].join(" ");return`<figure class="changes-figure"><table class="hotspots"><thead><tr><th>file</th><th>changes</th><th>lines</th><th>tests run</th><th>its life, commit by commit</th></tr></thead><tbody>${i}</tbody></table><figcaption>${l.trim()}</figcaption></figure>`}function Zs(t,e){const[n,a]=[xe(t.carried,t.changes),xe(e.carried,e.changes)],[s,o]=[t.carried/Math.max(1,t.changes),e.carried/Math.max(1,e.changes)];return{how:n===a?"as often":s<o?"less often":"more often",shares:`${n} against ${a}`}}function Bl(t){const e=(r,i)=>t.find(h=>h.across===r&&h.typeOnly===i)??{across:r,typeOnly:i,changes:0,carried:0},n=r=>`<td>${xe(r.carried,r.changes)} · ${r.carried} of ${r.changes}</td>`,a=(r,i)=>`<tr><th scope="row">${i}</th>${n(e(r,!1))}${n(e(r,!0))}</tr>`,s=Zs(e(!0,!0),e(!0,!1)),o=Zs(e(!1,!0),e(!1,!1));return`<figure class="changes-figure"><table class="ripples"><thead><tr><th></th><th>onto a value</th><th>onto only a type</th></tr></thead><tbody>${a(!1,"inside a box")}${a(!0,"across two boxes")}</tbody></table><figcaption>Across boxes, an arrow onto a type carried a change ${s.how} ${s.how==="as often"?"as":"than"} one onto a value: ${s.shares}. Inside a box, ${o.how}: ${o.shares}.</figcaption></figure>`}function Dl(t,e){const n=o=>(o.went??e)-1-o.born,a=Math.max(0,...t.map(n)),s=[];for(let o=1,r=1;o<=a;o=r+1,r*=2){const i=Math.min(r,a),h=t.reduce((c,d)=>c+Math.max(0,Math.min(i,n(d))-o+1),0),l=t.reduce((c,d)=>c+d.changed.filter(u=>u-d.born>=o&&u-d.born<=i).length,0);s.push({from:o,to:i,lived:h,changed:l})}return s}const un=600,la=190,De={top:18,right:8,bottom:36,left:8},Hl=34,Wl=({from:t,to:e})=>t===e?`${t}`:`${t}–${e}`,Qs=t=>t.reduce((e,n)=>({lived:e.lived+n.lived,changed:e.changed+n.changed}),{lived:0,changed:0});function ql(t,e){const n=t.filter(p=>!p.test),a=Dl(n,e),s=p=>p.lived>0?p.changed/p.lived:0,o=Math.max(1e-4,...a.map(s)),r=(un-De.left-De.right)/Math.max(1,a.length),i=Math.min(Hl,r*.6),h=la-De.bottom,l=a.map((p,b)=>{const v=s(p)/o*(h-De.top),[T,S]=[De.left+r*b+(r-i)/2,h-v];return`<rect class="bar" x="${A(T)}" y="${A(S)}" width="${A(i)}" height="${A(v)}" rx="2"><title>${p.changed} of ${p.lived}</title></rect><text class="value" x="${A(T+i/2)}" y="${A(S-4)}" text-anchor="middle">${xe(p.changed,p.lived)}</text><text class="age" x="${A(T+i/2)}" y="${A(h+13)}" text-anchor="middle">${Wl(p)}</text>`}).join(""),c=`<svg class="settling" viewBox="0 0 ${un} ${la}" role="img" aria-label="The share of commits that changed a file, by how many commits old it was"><line class="base" x1="${De.left}" x2="${un-De.right}" y1="${A(h)}" y2="${A(h)}"/>${l}<text class="axis" x="${un/2}" y="${la-6}" text-anchor="middle">its age: the commits since the one that wrote it</text></svg>`,d=n.filter(p=>p.went===void 0),u=d.filter(p=>p.changed.length===0).length,f=Qs(a.filter(p=>p.to<=2)),m=Qs(a.filter(p=>p.from>8)),g=[`${u} of the ${ee(d.length,"file")} that ship have not changed since the commit that wrote them.`];if(f.lived>0){const p=m.lived>0?`, and in ${xe(m.changed,m.lived)} of those after its eighth`:"";g.push(`A file changed in ${xe(f.changed,f.lived)} of the first two commits it lived through${p}.`)}const y=g.join(" ");return`<figure class="changes-figure">${c}<figcaption>${y}</figcaption></figure>`}const eo=560,mn=420,ye={left:46,right:14,top:14,bottom:44},_l=2.5,Pe=t=>t.changes/Math.max(1,t.files),vi=t=>`${Math.round(t*10)/10}`,zl=t=>Math.abs(t.abstractness+(t.instability??0)-1),ki=t=>t.instability!==null&&t.abstractness+t.instability<.5,xi=t=>t.filter(e=>ki(e)&&e.changes>0).sort((e,n)=>Pe(n)-Pe(e)||n.changes-e.changes);function Gl(t){const[e,n]=[eo-ye.left-ye.right,mn-ye.top-ye.bottom],a=u=>ye.left+u*e,s=u=>ye.top+(1-u)*n,o=(u,f)=>`<polygon class="zone ${u}" points="${f.map(([m,g])=>`${A(a(m))},${A(s(g))}`).join(" ")}"/>`,i=t.filter(u=>u.instability!==null).sort((u,f)=>Pe(u)-Pe(f)||f.files-u.files).map(u=>{const f=`${u.box}: needed by ${ee(u.neededBy,"file")} elsewhere, needs ${u.needs}; ${ee(u.changes,"change")} to its ${ee(u.files,"file")}`;return`<circle class="box" data-box="${x(u.box)}" cx="${A(a(u.instability??0))}" cy="${A(s(u.abstractness))}" r="${A(2.5+Math.sqrt(u.files)*.9)}" style="--v:${Math.min(1,Pe(u)/_l).toFixed(2)}"><title>${x(f)}</title></circle>`}).join(""),h=xi(t).slice(0,4).sort((u,f)=>f.abstractness-u.abstractness||(u.instability??0)-(f.instability??0)).map((u,f)=>({box:u,x:a(.17),y:s(.44)+f*14})),l=h.map(({box:u,x:f,y:m})=>`<line class="leader" x1="${A(f-3)}" y1="${A(m-3)}" x2="${A(a(u.instability??0))}" y2="${A(s(u.abstractness))}"/>`).join(""),c=h.map(({box:u,x:f,y:m})=>`<text class="name" x="${A(f)}" y="${A(m)}">${x(u.box)}</text>`).join(""),d=[0,.5,1].map(u=>`<text x="${A(a(u))}" y="${A(mn-ye.bottom+14)}" text-anchor="middle">${u}</text>${u===0?"":`<text x="${A(ye.left-6)}" y="${A(s(u)+3)}" text-anchor="end">${u}</text>`}`).join("");return`<svg class="stability" viewBox="0 0 ${eo} ${mn}" role="img" aria-label="Every box by how unstable and how abstract it is, and how often it changed">`+o("pain",[[0,0],[.5,0],[0,.5]])+o("useless",[[1,1],[.5,1],[1,.5]])+`<rect class="frame" x="${ye.left}" y="${ye.top}" width="${e}" height="${n}"/><line class="sequence" x1="${A(a(0))}" y1="${A(s(1))}" x2="${A(a(1))}" y2="${A(s(0))}"/><text class="zone-name" x="${A(a(.01))}" y="${A(s(.5)-5)}">zone of pain</text><text class="zone-name" x="${A(a(.99))}" y="${A(s(.5)+13)}" text-anchor="end">zone of uselessness</text><text class="zone-name" transform="translate(${A(a(.62))} ${A(s(.38)-6)}) rotate(${A(Math.atan2(n,e)*180/Math.PI)})" text-anchor="middle">the main sequence</text>${l}${i}${c}${d}<text class="axis" x="${A(a(.5))}" y="${mn-8}" text-anchor="middle">instability: how little needs it, so how free it is to change</text><text class="axis" transform="translate(12 ${A(s(.5))}) rotate(-90)" text-anchor="middle">abstractness: its files of nothing but types</text></svg>`}function Yl(t){const e=t.filter(ki).length,n=xi(t).map((s,o)=>`${s.box} (${vi(Pe(s))}${o===0?` ${Pe(s)===1?"change":"changes"} a file`:""})`),a=n.length>1?`${n.slice(0,-1).join(", ")} and ${n.at(-1)}`:n[0]??"none of them";return`${ee(e,"box","boxes")} ${e===1?"stands":"stand"} in the zone of pain. The ones there that have changed, the most first: ${a}.`}function Ul(t){return`<details class="numbers"><summary>every box's figures</summary><table><thead><tr><th>box</th><th>files</th><th>needed by</th><th>needs</th><th>I</th><th>A</th><th>D</th><th>changes a file</th></tr></thead><tbody>${[...t].sort((n,a)=>n.box.localeCompare(a.box)).map(n=>`<tr><td><code>${Gn(n.box)}</code></td><td>${n.files}</td><td>${n.neededBy}</td><td>${n.needs}</td><td>${n.instability===null?"–":n.instability.toFixed(2)}</td><td>${n.abstractness.toFixed(2)}</td><td>${n.instability===null?"–":zl(n).toFixed(2)}</td><td>${vi(Pe(n))}</td></tr>`).join("")}</tbody></table></details>`}function Jl(t){return`<figure class="changes-figure">${Gl(t)}<figcaption>${Yl(t)}</figcaption>${Ul(t)}</figure>`}function Kl({tested:t,withTest:e,untested:n}){return`<figure class="changes-figure tested"><p class="figure-number"><strong>${xe(e,t)}</strong> of the changes to a file a test imports came with its test</p><figcaption>${e} of the ${t} changes to a file a test imports came with a change to that test, or a new one, in the same commit. Another ${n} changes went to files with something to run that no test imports.</figcaption></figure>`}function Vl(t,e,n=gt){const a=[!1,!0].flatMap(s=>[!1,!0].map(o=>({across:s,typeOnly:o,changes:0,carried:0})));return t.changes.forEach((s,o)=>{const r=e[o-1];if(!r||s.changed.length===0||s.changed.length>n)return;const i=new Map(r.modules.filter(c=>!c.test).map(c=>[c.id,c.path])),h=new Set(s.changed),l=new Set(s.removed);for(const{from:c,to:d,typeOnly:u}of r.dependencies){const[f,m]=[i.get(c),i.get(d)];if(f===void 0||m===void 0||l.has(c)||!h.has(d))continue;const g=we(f)!==we(m),y=a.find(p=>p.across===g&&p.typeOnly===u);y&&(y.changes+=1,h.has(c)&&(y.carried+=1))}}),a}function Xl(t,e){const n=t.modules.filter(h=>!h.test),a=new Map(n.map(h=>[h.id,we(h.path)])),s=new Map(e.map(h=>[h.id,h.changed.length])),o=new Map,r=new Map;for(const{from:h,to:l}of t.dependencies){const[c,d]=[a.get(h),a.get(l)];c===void 0||d===void 0||c===d||(r.set(c,(r.get(c)??new Set).add(h)),o.set(d,(o.get(d)??new Set).add(h)))}return[...new Set(a.values())].sort((h,l)=>h.localeCompare(l)).map(h=>{const l=n.filter(u=>a.get(u.id)===h),[c,d]=[o.get(h)?.size??0,r.get(h)?.size??0];return{box:h,files:l.length,neededBy:c,needs:d,instability:c+d>0?d/(c+d):null,abstractness:l.filter(u=>u.typesOnly).length/l.length,changes:l.reduce((u,f)=>u+(s.get(f.id)??0),0)}})}function Zl(t,e,n=gt){const a={tested:0,withTest:0,untested:0};return t.changes.forEach((s,o)=>{const r=e[o];if(!r||s.changed.length>n)return;const i=new Map(r.modules.map(c=>[c.id,c])),h=new Map;for(const{from:c,to:d}of r.dependencies)i.get(c)?.test&&!i.get(d)?.test&&h.set(d,[...h.get(d)??[],c]);const l=new Set([...s.changed,...s.added.map(([c])=>c)]);for(const c of s.changed){const d=i.get(c);if(!d||d.test||d.typesOnly)continue;const u=h.get(c)??[];u.length===0?a.untested+=1:(a.tested+=1,u.some(f=>l.has(f))&&(a.withTest+=1))}}),a}const Ql={modules:[],dependencies:[]},He=(t,e)=>{const n=yi(t,e);return{...n,source:n.snapshots.at(-1)??Ql}},$i={"change-matrix":(t,e)=>Nl(t,e),"change-settling":(t,e)=>{const{history:n,lives:a}=He(t,e);return ql(a,n.commits.length)},"change-hotspots":(t,e,n)=>{const{history:a,lives:s}=He(t,e),o=n?.sha===a.commits.at(-1)?.sha?n:null;return Fl(s,a.commits.length,o,12,t.history.commits.length)},"change-stability":(t,e)=>{const{source:n,lives:a}=He(t,e);return Jl(Xl(n,a))},"change-cascade":(t,e)=>{const{history:n,snapshots:a,source:s}=He(t,e);return kl(gl(n,a),yl(s))},"change-ripples":(t,e)=>{const{history:n,snapshots:a}=He(t,e);return Bl(Vl(n,a))},"change-together":(t,e)=>{const{history:n,lives:a,source:s}=He(t,e);return Pl(wl(n),a,s)},"change-tests":(t,e)=>{const{history:n,snapshots:a}=He(t,e);return Kl(Zl(n,a))}};let ca;function ts(t){if(ca?.text===t)return ca.read;const e=JSON.parse(t),n={history:e,snapshots:Ts(e),lives:Ms(e)};return ca={text:t,read:n},n}let da;function Ti(){return da??=Promise.all([fetch("/data/architecture.json").then(t=>{if(!t.ok)throw new Error(`the history: ${t.status}`);return t.text()}),fetch("/data/coverage.json").then(t=>t.ok?t.json():null).catch(()=>null)]).then(([t,e])=>({read:ts(t),coverage:e})).catch(t=>{throw da=void 0,t}),da}class Si{listeners=new Set;send(e){for(const n of[...this.listeners])n(e)}on(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}}class ec{at=null;moved=new Si;get(){return this.at}set(e){e!==this.at&&(this.at=e,this.moved.send(e))}on(e){return this.moved.on(e)}}const me=new ec;function tc(t,e){return n=>{let a=null,s=null,o=!0,r=!1,i=()=>{};const h=(d=!1)=>{if(!a||r||!o&&!d)return;const u=me.get()??a.read.history.commits.length-1;u!==s&&(n.innerHTML=t(a.read,u,a.coverage),s=u)},l=typeof IntersectionObserver=="function"?new IntersectionObserver(d=>{for(const u of d)o=u.isIntersecting;h()},{rootMargin:"200px"}):null;l?.observe(n);const c=me.on(()=>h());return Ti().then(d=>{r||(a=d,n.querySelector("figure")&&me.get()===null&&(s=d.read.history.commits.length-1),h(!0),e&&(i=e(n,d.read)))}).catch(()=>{}),()=>{r=!0,c(),l?.disconnect(),i()}}}function w(t,e={},...n){const a=document.createElement(t);for(const[s,o]of Object.entries(e))o===void 0||o===!1||(typeof o=="function"?a.addEventListener(s.slice(2).toLowerCase(),o):o===!0?a.setAttribute(s,""):a.setAttribute(s,String(o)));for(const s of n)s==null||s===!1||a.append(s);return a}const nc=new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"long",year:"numeric",timeZone:"Europe/Madrid"});function Mi(t,e){const n=t[e];if(!n)return"";const a=e===t.length-1?`the last of ${t.length} commits`:`commit ${e+1} of ${t.length}`,s=x(n.sha);return`${a}: <a href="https://github.com/drpicox/david-rodenas.com/commit/${s}" target="_blank" rel="noopener noreferrer"><code>${s}</code></a> ${nc.format(new Date(n.date))} — ${x(n.subject)}`}const ac=450;function sc(t){me.set(null);let e=[],n,a=!1;const s=w("p",{class:"shown-commit"});s.innerHTML=t.querySelector(".shown-commit")?.innerHTML??"";const o=w("button",{type:"button"},"▶ play the history"),r=w("input",{type:"range",min:0,max:0,step:1,value:0,"aria-label":"The commit every figure below shows"});t.replaceChildren(w("div",{class:"change-player"},o,r,s));const i=()=>e.length-1,h=u=>{const f=u??i();r.value=String(f),s.innerHTML=Mi(e,f)},l=u=>{if(clearTimeout(n),a=u,o.textContent=u?"❚❚ pause":"▶ play the history",!u)return;(me.get()??i())>=i()&&me.set(0);const f=()=>{n=setTimeout(()=>{const m=(me.get()??i())+1;me.set(m>=i()?null:m),m>=i()?l(!1):f()},ac)};f()},c=me.on(h);o.addEventListener("click",()=>l(!a)),r.addEventListener("input",()=>{l(!1);const u=Number(r.value);me.set(u>=i()?null:u)});let d=!1;return Ti().then(({read:u})=>{d||(e=u.history.commits,r.max=String(i()),h(me.get()))}).catch(()=>{o.disabled=!0,r.disabled=!0}),()=>{d=!0,clearTimeout(n),c()}}const ua=3;function to(t){const e=t.map(n=>n.split("/").pop()??n);return e.length>ua?`${e.slice(0,ua).join(", ")} and ${e.length-ua} more`:e.length>1?`${e.slice(0,-1).join(", ")} and ${e.at(-1)}`:e[0]??""}function oc(t,e,{changed:n,written:a}){const s=[n.length>0?`changed ${to(n)}`:"",a.length>0?`wrote ${to(a)}`:""].filter(Boolean).join("; ");return`${t??"the files now gone"}, ${tn(e)}: ${s||"nothing"} — ${e.subject}`}function rc(t){const e=new Map,n=(s,o)=>{const r=`${s??""}@${o}`,i=e.get(r)??{changed:[],written:[]};return e.set(r,i),i};for(const s of t){if(s.test)continue;const o=bi(s);n(o,s.born).written.push(s.path);for(const r of s.changed)n(o,r).changed.push(s.path)}const a=({changed:s,written:o})=>({changed:[...s].sort(),written:[...o].sort()});return{get:(s,o)=>a(e.get(`${s??""}@${o}`)??{changed:[],written:[]})}}const ic="http://www.w3.org/2000/svg";function hc(t,e){const n=rc(e.lives),a=e.history.commits,s=c=>{const d=t.querySelector("svg.change-matrix"),u=d?.getScreenCTM();if(!d||!u)return null;const f=new DOMPoint(c.clientX,c.clientY).matrixTransform(u.inverse()),[m,g,y]=[Number(d.dataset.left),Number(d.dataset.step),Number(d.dataset.row)],p=Math.floor((f.x-m)/g);if(!(p>=0&&p<a.length))return null;const b=[...d.querySelectorAll("text.row")].find(v=>f.y>=Number(v.dataset.top)&&f.y<Number(v.dataset.top)+y);return{svg:d,at:p,x:m+p*g,row:b?{box:b.dataset.box||null}:null}},o=c=>{const d=t.querySelector(".changes-pointed");d&&(d.textContent=c)},r=(c,d,u)=>{if(t.querySelector("rect.pointed")?.remove(),!c)return;const f=document.createElementNS(ic,"rect");f.setAttribute("class","pointed"),f.setAttribute("x",String(d)),f.setAttribute("y","0"),f.setAttribute("width",String(u)),f.setAttribute("height",String(c.viewBox.baseVal.height-20)),c.prepend(f)},i=c=>{const d=s(c),u=d&&a[d.at];if(!d||!u)return r(null,0,0),o("");r(d.svg,d.x,Number(d.svg.dataset.step)),o(d.row?oc(d.row.box,u,n.get(d.row.box,d.at)):`${tn(u)} — ${u.subject}`)},h=()=>{r(null,0,0),o("")},l=c=>{const d=s(c);d&&me.set(d.at>=a.length-1?null:d.at)};return t.addEventListener("pointermove",i),t.addEventListener("pointerleave",h),t.addEventListener("pointerdown",l),()=>{t.removeEventListener("pointermove",i),t.removeEventListener("pointerleave",h),t.removeEventListener("pointerdown",l)}}const lc={"change-matrix":hc},cc={"change-player":sc,...Object.fromEntries(Object.entries($i).map(([t,e])=>[t,tc(e,lc[t])]))};function Zn(t){let e=!0;if(typeof IntersectionObserver!="function")return{onScreen:()=>e,stop:()=>{}};const n=new IntersectionObserver(a=>{for(const s of a)e=s.isIntersecting},{rootMargin:"100px"});return n.observe(t),{onScreen:()=>e,stop:()=>n.disconnect()}}function dc(t,e){return new Map(t.map(n=>[n.id,n.changed.filter(a=>a<=e).length]))}const uc=6,no=2.2;function mc(t,e){const n=new Map;for(const{from:a,to:s}of t.dependencies){const[o,r]=e==="neededBy"?[s,a]:[a,s];n.set(o,(n.get(o)??new Set).add(r))}return new Map([...n].map(([a,s])=>[a,s.size]))}function fc(t,e,n){if(e==="lines")return null;const a=e==="changes"?n?.counts??new Map:mc(t,e),s=Math.max(1,e==="changes"?n?.most??0:0,...a.values());return new Map(t.modules.map(o=>[o.id,no+(uc-no)*Math.sqrt((a.get(o.id)??0)/s)]))}const pc="https://github.com/drpicox/david-rodenas.com";function ao(t,e,n="file"){const a=n==="box"&&!/\.[a-z]+$/.test(e);return`${pc}/${a?"tree":"blob"}/${t}/src/${e}`}const so=90,oo=15;function ro(t,e,n,a){const s=Math.min(a,.03333333333333333);t.vx+=((e-t.x)*so-t.vx*oo)*s,t.vy+=((n-t.y)*so-t.vy*oo)*s,t.x+=t.vx*s,t.y+=t.vy*s}const gc=900,wc=34,yc=.02,io=.004,ho=.82,bc=100,vc=12;function kc(t,e,{width:n,height:a,heat:s=1}){const o=new Float64Array(t.length),r=new Float64Array(t.length);for(let h=0;h<t.length;h+=1){const l=t[h];for(let c=h+1;c<t.length;c+=1){const d=t[c];let u=l.x-d.x,f=l.y-d.y;u===0&&f===0&&([u,f]=[h%7-3||1,c%5-2||1]);const m=Math.max(bc,u*u+f*f),g=gc/m,y=Math.sqrt(m);o[h]=(o[h]??0)+u/y*g,r[h]=(r[h]??0)+f/y*g,o[c]=(o[c]??0)-u/y*g,r[c]=(r[c]??0)-f/y*g}}for(const[h,l]of e){const[c,d]=[t[h],t[l]];if(!c||!d)continue;const u=d.x-c.x,f=d.y-c.y,m=Math.hypot(u,f)||1,g=(m-wc)*yc;o[h]=(o[h]??0)+u/m*g,r[h]=(r[h]??0)+f/m*g,o[l]=(o[l]??0)-u/m*g,r[l]=(r[l]??0)-f/m*g}const i=vc*s;t.forEach((h,l)=>{h.vx=(h.vx+(o[l]??0)+(n/2-h.x)*io)*ho,h.vy=(h.vy+(r[l]??0)+(a/2-h.y)*io)*ho;const c=Math.hypot(h.vx,h.vy);c>i&&([h.vx,h.vy]=[h.vx/c*i,h.vy/c*i]);const[d,u]=[h.x+h.vx,h.y+h.vy];h.x=Math.min(n,Math.max(0,d)),h.y=Math.min(a,Math.max(0,u)),h.x!==d&&(h.vx=0),h.y!==u&&(h.vy=0)})}const ma=760,lo=260,xc=10,Ne=(t,e,n,a=8)=>t+(e-t)*(1-Math.exp(-a*n)),$c=(t,e,n)=>{t.x=Ne(t.x,e.x,n),t.y=Ne(t.y,e.y,n),t.width=Ne(t.width,e.width,n),t.height=Ne(t.height,e.height,n)};class Tc{constructor(e,n){this.width=e,this.still=n}width;still;balls=new Map;boxes=new Map;bands=new Map;layout=null;mode="boxes";time=0;boxAlpha=1;fileLinks=[];hovered={};reach=1;height=ma;get wanted(){const e=this.layout?.height??ma;return this.mode==="tangle"?Math.max(e,ma):e}reached=null;coverage=null;show(e,n,{untangling:a=!1,reached:s=null,coverage:o=null,sizes:r=null,changed:i=null}={}){this.reached=s,this.coverage=o,this.layout=n,this.mode==="tangle"&&(this.tangleClock=Math.min(this.tangleClock,1.2)),(this.still||this.balls.size===0)&&(this.height=this.wanted);const h=Math.max(0,...n.boxes.map(f=>f.rank)),l=new Map(n.boxes.map(f=>[f.name,f.rank])),c=new Set;for(const f of n.balls){c.add(f.id);const m=this.balls.get(f.id),g=a?(h-(l.get(f.box)??0))*.07+Math.random()*.12:0,y=r?.get(f.id)??f.radius;if(m)Object.assign(m,{leaving:!1,box:f.box,path:f.path,test:f.test,typesOnly:f.typesOnly,radius:y,wait:g}),i?.has(f.id)&&(m.touchedAt=this.time);else{const[p,b]=this.mode==="tangle"?[this.width/2+(Math.random()-.5)*80,this.height/2+(Math.random()-.5)*80]:[f.x,f.y];this.balls.set(f.id,{id:f.id,body:{x:p,y:b,vx:0,vy:0},size:{x:this.still?y:0,y:0,vx:0,vy:0},radius:y,alpha:this.still?1:0,leaving:!1,box:f.box,path:f.path,test:f.test,typesOnly:f.typesOnly,wait:g,trail:[],bornAt:this.time,touchedAt:-1/0})}}for(const[f,m]of this.balls)c.has(f)||(m.leaving=!0);const d=(f,m)=>{const g=new Set(m.map(y=>y.name));for(const y of m){const p={x:y.x,y:y.y,width:y.width,height:y.height},b=f.get(y.name);b?Object.assign(b,{target:p,leaving:!1,cyclic:y.cyclic??!1,label:y.label??y.name}):f.set(y.name,{...p,target:p,label:y.label??y.name,alpha:this.still?1:0,leaving:!1,cyclic:y.cyclic??!1})}for(const[y,p]of f)g.has(y)||(p.leaving=!0)};d(this.boxes,n.boxes),d(this.bands,n.bands);const u=new Map(n.balls.map((f,m)=>[f.id,m]));this.fileLinks=e.dependencies.flatMap(({from:f,to:m})=>u.has(f)&&u.has(m)?[[f,m]]:[])}setMode(e){e==="tangle"&&this.mode!=="tangle"&&(this.tangleClock=0),this.mode=e}tangleClock=0;get heat(){return Math.exp(-this.tangleClock/1.8)}step(e){this.time+=e,this.height=this.still?this.wanted:Ne(this.height,this.wanted,e,6);const n=new Map(this.layout?.balls.map(a=>[a.id,a])??[]);if(this.boxAlpha=Ne(this.boxAlpha,this.mode==="boxes"?1:0,e,5),this.mode==="tangle"){this.tangleClock+=e;const a=[...this.balls.entries()].filter(([,r])=>!r.leaving),s=new Map(a.map(([r],i)=>[r,i])),o=this.fileLinks.flatMap(([r,i])=>{const[h,l]=[s.get(r),s.get(i)];return h!==void 0&&l!==void 0?[[h,l]]:[]});kc(a.map(([,r])=>r.body),o,{width:this.width,height:this.height,heat:this.heat})}for(const[a,s]of this.balls){const o=n.get(a);this.mode==="boxes"&&o&&(s.wait>0?s.wait-=e:this.still?Object.assign(s.body,{x:o.x,y:o.y,vx:0,vy:0}):ro(s.body,o.x,o.y,e)),ro(s.size,s.leaving?0:s.radius,0,e),s.alpha=Ne(s.alpha,s.leaving?0:1,e,6);const r=Math.hypot(s.body.vx,s.body.vy);r>lo&&this.mode==="boxes"&&s.trail.push({x:s.body.x,y:s.body.y}),(s.trail.length>xc||r<lo&&s.trail.length)&&s.trail.shift(),s.leaving&&s.alpha<.02&&this.balls.delete(a)}for(const a of[this.boxes,this.bands])for(const[s,o]of a)this.still?Object.assign(o,o.target):$c(o,o.target,e),o.alpha=Ne(o.alpha,o.leaving?0:1,e,6),o.leaving&&o.alpha<.02&&a.delete(s)}hit(e,n){for(const a of this.balls.values())if(Math.hypot(a.body.x-e,a.body.y-n)<=Math.max(5,a.size.x+2))return{path:a.path,box:a.box};if(this.mode==="boxes"){for(const[a,s]of this.boxes)if(e>=s.x&&e<=s.x+s.width&&n>=s.y&&n<=s.y+s.height)return{box:a}}return{}}draw(e,n){e.clearRect(0,0,this.width,this.height),e.lineCap="round";const a=.5+.5*Math.sin(this.time*4);e.font="bold 10px ui-monospace, Menlo, monospace";for(const h of this.bands.values())e.globalAlpha=h.alpha*this.boxAlpha*.9,e.setLineDash([2,4]),e.strokeStyle=n.rule,e.lineWidth=1,e.beginPath(),e.roundRect(h.x,h.y,h.width,h.height,6),e.stroke(),e.setLineDash([]),e.fillStyle=n.dim,e.fillText(h.label,h.x+8,h.y+12);e.font="9px ui-monospace, Menlo, monospace";for(const[h,l]of this.boxes){const c=this.hovered.box===h;e.globalAlpha=l.alpha*this.boxAlpha,e.fillStyle=n.sunken,e.strokeStyle=l.cyclic?n.warn:c?n.accent:n.rule,e.lineWidth=l.cyclic?1.5+a*1.5:c?1.5:1,l.cyclic&&(e.shadowColor=n.warn,e.shadowBlur=6+a*10),e.beginPath(),e.roundRect(l.x,l.y,l.width,l.height,4),e.fill(),e.stroke(),e.shadowBlur=0,e.fillStyle=c?n.accent:n.dim,e.fillText(l.label,l.x+6,l.y+10)}const s=this.hovered.path?[...this.balls.values()].find(h=>h.path===this.hovered.path):void 0,o=s?Yn(this.fileLinks,s.id,this.reach,"needs"):new Map,r=s?Yn(this.fileLinks,s.id,this.reach,"neededBy"):new Map,i=new Set([...s?[s.id]:[],...o.keys(),...r.keys()]);this.drawLinks(e,n,s!==void 0),s&&this.drawFileArrows(e,n,s,o,r);for(const h of this.balls.values()){const l=Math.max(0,h.size.x);if(h.trail.length>1){e.strokeStyle=n.accent;for(let y=1;y<h.trail.length;y+=1)e.globalAlpha=y/h.trail.length*.35*h.alpha,e.lineWidth=l*(y/h.trail.length)*1.4,e.beginPath(),e.moveTo(h.trail[y-1].x,h.trail[y-1].y),e.lineTo(h.trail[y].x,h.trail[y].y),e.stroke()}const c=this.time-h.bornAt;c<.8&&!this.still&&(e.globalAlpha=(1-c/.8)*.6,e.strokeStyle=n.accent,e.lineWidth=1.2,e.beginPath(),e.arc(h.body.x,h.body.y,l+c*22,0,Math.PI*2),e.stroke());const d=this.time-h.touchedAt;d<.9&&!this.still&&(e.globalAlpha=(1-d/.9)*.8,e.strokeStyle=n.heat,e.lineWidth=1.8,e.beginPath(),e.arc(h.body.x,h.body.y,l+1.5+d*14,0,Math.PI*2),e.stroke());const u=this.hovered.path===h.path,f=s!==void 0&&!i.has(h.id),m=this.reached!==null&&!h.test&&!h.typesOnly&&!this.reached.has(h.id),g=!h.test&&!h.typesOnly?this.coverage?.get(h.path):void 0;if(e.globalAlpha=h.alpha*(f?.22:1),e.beginPath(),e.arc(h.body.x,h.body.y,u?l+2:Math.max(0,m||g!==void 0?l-.6:l),0,Math.PI*2),g!==void 0)e.strokeStyle=g>=99.5?n.accent:n.warn,e.lineWidth=1.2,e.stroke(),e.fillStyle=n.accent,e.beginPath(),e.moveTo(h.body.x,h.body.y),e.arc(h.body.x,h.body.y,Math.max(0,l-.6),-Math.PI/2,-Math.PI/2+Math.PI*2*g/100),e.closePath(),e.fill();else if(h.test){const y=Math.max(0,(u?l+2:l)*1.6);e.beginPath(),e.rect(h.body.x-y/2,h.body.y-y/2,y,y),e.fillStyle=n.test,e.fill()}else m?(e.strokeStyle=n.warn,e.lineWidth=1.2,e.stroke()):(e.fillStyle=h.test?n.soft:n.accent,e.fill());u&&(e.strokeStyle=n.ink,e.lineWidth=1.5,e.stroke())}if(s){const h=this.coverage?.get(s.path),l=h!==void 0&&!s.test&&!s.typesOnly?` · tests run ${Math.round(h)}% of it`:"",c=d=>{const u=[...d.values()].filter(f=>f===1).length;return this.reach>1&&d.size>u?`${u} (${d.size} within ${Number.isFinite(this.reach)?this.reach:"any"})`:`${u}`};this.label(e,n,[{text:`${s.path}   `},{text:`needs ${c(o)}`,key:n.accent},{text:" · "},{text:`needed by ${c(r)}`,key:n.arrowIn},{text:`${l}   click: its source`}],s.body.x,s.body.y-10)}e.globalAlpha=1}drawFileArrows(e,n,a,s,o){const r=(l,c,d,u)=>{const[f,m]=[c.body.x-l.body.x,c.body.y-l.body.y],g=Math.hypot(f,m)||1,[y,p]=[f/g,m/g],b={x:c.body.x-y*(c.size.x+2),y:c.body.y-p*(c.size.x+2)},v={x:(l.body.x+b.x)/2-p*g*.12,y:(l.body.y+b.y)/2+y*g*.12};e.globalAlpha=u,e.strokeStyle=d,e.fillStyle=d,e.lineWidth=1.4,e.beginPath(),e.moveTo(l.body.x,l.body.y),e.quadraticCurveTo(v.x,v.y,b.x,b.y),e.stroke();const[T,S]=[b.x-v.x,b.y-v.y],I=Math.atan2(S,T);e.beginPath(),e.moveTo(b.x,b.y),e.lineTo(b.x-7*Math.cos(I-.4),b.y-7*Math.sin(I-.4)),e.lineTo(b.x-7*Math.cos(I+.4),b.y-7*Math.sin(I+.4)),e.closePath(),e.fill()},i=(l,c)=>c===a.id?0:l.get(c),h=l=>Math.max(.25,.95-(l-1)*.25);for(const[l,c]of this.fileLinks){const[d,u]=[this.balls.get(l),this.balls.get(c)];if(!d||!u)continue;const f=i(s,l);f!==void 0&&s.get(c)===f+1&&r(d,u,n.accent,h(f+1));const m=i(o,c);m!==void 0&&o.get(l)===m+1&&r(d,u,n.arrowIn,h(m+1))}}drawLinks(e,n,a){if(this.boxAlpha<.98){e.globalAlpha=(1-this.boxAlpha)*.22,e.strokeStyle=n.accent,e.lineWidth=.7,e.beginPath();for(const[o,r]of this.fileLinks){const[i,h]=[this.balls.get(o),this.balls.get(r)];!i||!h||(e.moveTo(i.body.x,i.body.y),e.lineTo(h.body.x,h.body.y))}e.stroke()}if(!this.layout||this.boxAlpha<.02)return;const s=this.hovered.box;for(const o of this.layout.links){const[r,i]=[this.boxes.get(o.from),this.boxes.get(o.to)],[h,l]=[this.layout.boxes.find(p=>p.name===o.to),this.layout.boxes.find(p=>p.name===o.from)];if(!r||!i||!h||!l)continue;const c=r.x+(o.x1-l.x)/l.width*r.width,d=r.y+r.height,u=i.x+(o.x2-h.x)/h.width*i.width,f=i.y,m=s!==void 0&&(o.from===s||o.to===s),g=s!==void 0&&!m;e.globalAlpha=this.boxAlpha*Math.min(r.alpha,i.alpha)*(a?.06:m?.95:g?.08:.4),e.strokeStyle=m?n.accent:n.soft,e.lineWidth=Math.min(4,.8+Math.log2(o.count)*.7)*(m?1.4:1),e.setLineDash(o.typeOnly?[4,3]:[]);const y=Math.max(18,(f-d)/2);e.beginPath(),e.moveTo(c,d),e.bezierCurveTo(c,d+y,u,f-y,u,f-4),e.stroke(),e.setLineDash([]),e.fillStyle=e.strokeStyle,e.beginPath(),e.moveTo(u,f),e.lineTo(u-3.5,f-7),e.lineTo(u+3.5,f-7),e.closePath(),e.fill()}}label(e,n,a,s,o){e.font="11px ui-monospace, Menlo, monospace";const r=11,i=a.map(d=>e.measureText(d.text).width+(d.key?r:0)),h=i.reduce((d,u)=>d+u,0)+12,l=Math.min(this.width-h-4,Math.max(4,s-h/2));e.globalAlpha=.95,e.fillStyle=n.ink,e.beginPath(),e.roundRect(l,o-18,h,18,4),e.fill();let c=l+6;a.forEach((d,u)=>{d.key&&(e.fillStyle=d.key,e.fillRect(c,o-13,8,8),c+=r),e.fillStyle=n.sunken,e.fillText(d.text,c,o-5),c+=i[u]-(d.key?r:0)})}}const We=1100,Sc=.45;function co(t){const e=getComputedStyle(t),n=(a,s)=>e.getPropertyValue(a).trim()||s;return{ink:n("--ink","#16181c"),dim:n("--dim","#6b7280"),rule:n("--rule","#d8dbe1"),sunken:n("--sunken","#f2f4f8"),accent:n("--accent","#1a4b9c"),soft:n("--accent-soft","#6b83b8"),warn:n("--warn","#b4443c"),test:n("--hl-string","#2f6f4e"),arrowIn:n("--arrow-in","#c96a24"),heat:n("--heat-warm","#e08a5b")}}function Mc(t){let e=!1,n=()=>{e=!0};const a=fetch("/data/coverage.json").then(s=>s.ok?s.json():null).catch(()=>null);return fetch("/data/architecture.json").then(s=>s.json()).then(async s=>{const o=await a;e||(n=Ac(t,s,o))}).catch(()=>{}),()=>n()}function Ac(t,e,n){const a=n&&e.commits.findIndex(W=>W.sha===n.sha),s=n?new Map(Object.entries(n.lines)):null,o=Ts(e),r=o.map(zn),i=Ms(e),h=Math.max(0,...i.map(W=>W.changed.length)),l=new Map,c=(W,q)=>{const z=`${W}:${q}`;let Z=l.get(z);return Z||(Z=Ss(o[W]??{modules:[],dependencies:[]},{tests:q,width:We}),l.set(z,Z)),Z},d=o.length-1,u=window.matchMedia("(prefers-reduced-motion: reduce)").matches,f=new Tc(We,u);let m=d,g=!1,y="neededBy",p="boxes",b=!1,v=0,T=-1;const S=w("canvas",{class:"architecture-canvas","aria-label":"The source of this site: its files as balls, its folders as boxes, and arrows for what needs what"}),I=w("figcaption"),k=w("div",{class:"sparks-host"}),E=w("input",{type:"range",min:0,max:d,step:1,value:m,"aria-label":"Commit"}),O=w("button",{type:"button"},"▶ play the history"),H=w("button",{type:"button"},"tangle it"),C=w("input",{type:"checkbox"}),M=(W,q,z=!1)=>w("option",{value:W,selected:z},q),L=w("select",{"aria-label":"What a ball's size says"},M("neededBy","needed by",!0),M("needs","needs"),M("changes","changes"),M("lines","lines")),$=w("select",{"aria-label":"How far a file's arrows reach"},M("1","1",!0),M("2","2"),M("3","3"),M("Infinity","all")),j=w("div",{class:"architecture-controls"},O,H,w("label",{},C," the tests"),w("label",{},"size: ",L),w("label",{},"reach: ",$),E),N=w("p",{class:"architecture-legend",hidden:!0},w("span",{class:"key file"}),"a file, as full as the tests run it",w("span",{class:"key untested"}),"a file no test reaches",w("span",{class:"key test"}),"a test"),P=(W,q=!1)=>{m=Math.max(0,Math.min(d,W)),E.value=String(m);const z=o[m],Z=e.commits[m];!z||!Z||(f.show(z,c(m,g),{untangling:q,reached:g?pi(z):null,coverage:g&&m===a?s:null,sizes:fc(z,y,y==="changes"?{counts:dc(i,m),most:h}:void 0),changed:m===T?null:new Set(e.changes[m]?.changed??[])}),T=m,I.innerHTML=gi(Z,r[m]??zn(z)),k.innerHTML=wi(r,m))},B=W=>{b=W,O.textContent=b?"❚❚ pause":"▶ play the history",b&&m===d&&P(0),v=0};O.addEventListener("click",()=>B(!b)),H.addEventListener("click",()=>{p=p==="boxes"?"tangle":"boxes",f.setMode(p),H.textContent=p==="boxes"?"tangle it":"untangle it",p==="boxes"&&P(m,!0)}),C.addEventListener("change",()=>{g=C.checked,N.hidden=!g,P(m)}),L.addEventListener("change",()=>{y=L.value,P(m)}),$.addEventListener("change",()=>{f.reach=Number($.value)}),E.addEventListener("input",()=>{B(!1),P(Number(E.value))});const _=W=>{const q=k.querySelector("svg"),z=q?.getScreenCTM();if(!q||!z)return null;const Z=new DOMPoint(W.clientX,W.clientY).matrixTransform(z.inverse()).x,{x:$e,width:et}=q.viewBox.baseVal,rn=4;return Math.round((Z-$e-rn)/(et-rn*2)*d)},J=W=>{const q=_(W);q!==null&&(B(!1),Math.max(0,Math.min(d,q))!==m&&P(q))};k.addEventListener("pointerdown",W=>{k.setPointerCapture(W.pointerId),J(W)}),k.addEventListener("pointermove",W=>{k.hasPointerCapture(W.pointerId)&&J(W)});const Ee=W=>{const q=S.getBoundingClientRect();return[(W.clientX-q.left)/q.width*We,(W.clientY-q.top)/q.height*f.height]};S.addEventListener("mousemove",W=>{const[q,z]=Ee(W);f.hovered=f.hit(q,z),S.style.cursor=f.hovered.path||f.hovered.box?"pointer":"",S.dataset.hovered=f.hovered.path??f.hovered.box??""}),S.addEventListener("mouseleave",()=>{f.hovered={}}),S.addEventListener("click",W=>{const[q,z]=Ee(W),Z=f.hit(q,z),$e=e.commits[m]?.sha;if(!$e)return;const et=Z.path?ao($e,Z.path):Z.box?ao($e,Z.box,"box"):null;et&&window.open(et,"_blank","noopener")}),t.replaceChildren(w("figure",{class:"architecture-figure"},j,S,N,I,k)),P(m);const Xe=S.getContext("2d");if(!Xe)return()=>{};const vt=Zn(S);let kt=co(t),on=0,xt=performance.now(),Ze=0,Qe={width:0,height:0};const Fe=()=>{const W=window.devicePixelRatio||1,q=S.clientWidth||We,z=Math.round(q*f.height/We);q===Qe.width&&Math.abs(z-Qe.height)<1||(Qe={width:q,height:z},S.width=Math.round(q*W),S.height=Math.round(z*W),S.style.height=`${z}px`)};Fe(),window.addEventListener("resize",Fe);const $t=W=>{Ze=requestAnimationFrame($t);const q=Math.min(.05,(W-xt)/1e3);xt=W,vt.onScreen()&&(on++%30===0&&(kt=co(t)),b&&(v+=q,v>=Sc&&(v=0,m>=d?B(!1):P(m+1))),f.step(q),Fe(),Xe.setTransform(S.width/We,0,0,S.width/We,0,0),f.draw(Xe,kt))};return Ze=requestAnimationFrame($t),()=>{cancelAnimationFrame(Ze),vt.stop(),window.removeEventListener("resize",Fe)}}const uo="/data/architecture.json",Ic="/data/coverage.json";function Ec(t){try{return JSON.parse(t(Ic))}catch{return null}}const jc={"change-player":t=>{const{history:e}=ts(t(uo));return`<p class="shown-commit">${Mi(e.commits,e.commits.length-1)}</p>`},...Object.fromEntries(Object.entries($i).map(([t,e])=>[t,n=>{const a=ts(n(uo));return e(a,a.history.commits.length-1,Ec(n))}]))},Cc={name:"architecture",apps:{architecture:Mc,...cc},stills:{architecture:fl,...jc}},Oc=[{name:"llave de laton",kind:"key",value:111},{name:"cristal magico",kind:"key",value:1112},{name:"llave de casa",kind:"key",value:1314},{name:"llave de la verja",kind:"key",value:2636},{name:"llave del puente",kind:"key",value:3444},{name:"llave del gnomo",kind:"key",value:4636},{name:"barca",kind:"key",value:3233},{name:"llave de la despensa",kind:"key",value:2010},{name:"diario",kind:"weapon",value:1},{name:"matamoscas",kind:"weapon",value:2},{name:"espada de madera",kind:"weapon",value:4},{name:"espada",kind:"weapon",value:8},{name:"espada venenosa",kind:"weapon",value:12},{name:"Thurmei",kind:"weapon",value:16},{name:"camisa",kind:"shield",value:2},{name:"escudo de madera",kind:"shield",value:4},{name:"escudo de escamas",kind:"shield",value:8},{name:"escudo",kind:"shield",value:12},{name:"Rharmei",kind:"shield",value:16},{name:"caramelo",kind:"food",value:2},{name:"judia",kind:"food",value:4},{name:"manzana",kind:"food",value:8},{name:"naranja",kind:"food",value:12},{name:"pocima",kind:"food",value:16}],Lc=[{name:"mosca acida",attack:4,defence:0,drops:"cristal magico"},{name:"mosca",attack:0,defence:0,drops:"caramelo"},{name:"mosquito",attack:2,defence:0,drops:"matamoscas"},{name:"polilla",attack:1,defence:1,drops:"camisa"},{name:"cucaracha",attack:1,defence:1,drops:"llave de casa"},{name:"raton",attack:2,defence:2,drops:"judia"},{name:"rana venenosa",attack:2,defence:1,drops:"espada de madera"},{name:"planta carnivora",attack:1,defence:3,drops:"escudo de madera"},{name:"raton salvaje",attack:3,defence:3,drops:"llave de la verja"},{name:"escorpion dorado",attack:12,defence:2,drops:"espada venenosa"},{name:"trucha",attack:3,defence:3,drops:"manzana"},{name:"trucha asesina",attack:4,defence:7,drops:"escudo de escamas"},{name:"minimonstruo aquatico",attack:8,defence:4,drops:"llave del puente"},{name:"lobo",attack:8,defence:6,drops:"manzana"},{name:"lobo asesino",attack:12,defence:7,drops:"escudo"},{name:"ogro",attack:6,defence:10,drops:"naranja"},{name:"gnomo de puente",attack:11,defence:11,drops:"llave del gnomo"},{name:"murcielago",attack:8,defence:8,drops:"judia"},{name:"aranya",attack:14,defence:4,drops:"Thurmei"},{name:"vampiro",attack:12,defence:13,drops:"Rharmei"},{name:"aranya gigante",attack:14,defence:14,drops:"barca"},{name:"monstruo aquatico enorme",attack:32,defence:15,drops:"llave de la despensa"}],Nc={"0,0":{name:"Bienvenida",exits:[-1,-1,0,-1],holds:"diario",text:`Bienvenido a este juego de aventura. 
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
sus otros habitantes.`}},Pc={items:Oc,monsters:Lc,rooms:Nc},{items:Rc,monsters:Fc,rooms:Bc}=Pc,As={"llave de laton":"brass key","cristal magico":"magic crystal","llave de casa":"house key","llave de la verja":"gate key","llave del puente":"bridge key","llave del gnomo":"gnome's key",barca:"boat","llave de la despensa":"pantry key",diario:"newspaper",matamoscas:"fly swatter","espada de madera":"wooden sword",espada:"sword","espada venenosa":"poisoned sword",Thurmei:"Thurmei",camisa:"shirt","escudo de madera":"wooden shield","escudo de escamas":"scale shield",escudo:"shield",Rharmei:"Rharmei",caramelo:"sweet",judia:"bean",manzana:"apple",naranja:"orange",pocima:"potion"},Ai={"mosca acida":"acid fly",mosca:"fly",mosquito:"mosquito",polilla:"moth",cucaracha:"cockroach",raton:"mouse","rana venenosa":"poison frog","planta carnivora":"carnivorous plant","raton salvaje":"wild mouse","escorpion dorado":"golden scorpion",trucha:"trout","trucha asesina":"killer trout","minimonstruo aquatico":"small water monster",lobo:"wolf","lobo asesino":"killer wolf",ogro:"ogre","gnomo de puente":"bridge gnome",murcielago:"bat",aranya:"spider",vampiro:"vampire","aranya gigante":"giant spider","monstruo aquatico enorme":"enormous water monster"},Dc={Bienvenida:"Welcome","Usa las llaves":"Use the keys","Comedor sur":"Dining room, south",Salita:"Sitting room","Huerto de pepinos":"Cucumber patch","Huerto de tomates":"Tomato patch",Caminito:"Little path",Despensa:"Pantry","Aprende a atacar":"Learn to attack",Comedor:"Dining room",Recibidor:"Hall",Patio:"Yard","Huerto de Judias":"Bean patch",Manzanos:"Apple trees",Ciruelos:"Plum trees",Banyo:"Bathroom",Habitacion:"Bedroom","Comedor norte":"Dining room, north",Cocina:"Kitchen","Huerto de calabazas":"Pumpkin patch",Naranjos:"Orange trees",Entrada:"Gate",Nogal:"Walnut trees",Cueva:"Cave","Lago interno":"Underground lake","Centro del lago":"Middle of the lake","Rio salvaje":"Wild river",Rio:"River","Bosque oscuro":"Dark forest","Rio oscuro":"Dark river","Bosque tenebroso":"Gloomy forest","Bosque sombrio":"Shadowy forest","Bosque humedo":"Damp forest",Bosque:"Forest","Claro del Bosque":"Forest clearing","Puente del bosque":"Forest bridge"},be=`The tunnel of the dark, gloomy cave goes on. The walls are damp and
water can be heard running somewhere far off. Walk carefully, or you
will slip or trip.`,At=`The forest stretches out, dark and mysterious. The light blurs
through the leaves. You can hear the animals and the forest's other
inhabitants.`,fa=`Though it is day, barely a glimmer of light gets in. Bushes, trees
and brambles make the going hard. Something moves in the dark.`,mo=`Little light comes through the leaves of the trees. Brambles and
bushes give way to a small stream. Something moves in the dark.`,Hc={"0,0":`Welcome to this adventure game.
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
the apples, they are hardy and get you through the winters.`,"3,0":be,"3,1":be,"3,2":`An immense underground lake opens up before you. It is dark and you
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
but something stirs beneath the surface.`,"4,0":be,"4,1":be,"4,2":be,"4,3":fa,"4,4":`The north bank of the river is dismal. Strange noises can be heard,
and you sense a curse. Here is the bridge that crosses to the south
bank; the air feels hostile and urges you across.`,"4,5":`The river flows under the rocks and the roots of the forest's trees.
The sounds of the forest grow louder and you feel watched.`,"4,6":`A gap between brambles and bushes lets you into the gloomy forest.
Light is scarce and the shadows are threatening.`,"4,7":fa,"5,0":`The tunnel of the dark, gloomy cave goes on. A great cobweb blocks
the way south. One careless move could make you its prey.`,"5,1":be,"5,2":`The tunnel of the dark, gloomy cave goes on. The walls are damp, and
the sound of water grows louder. Walk carefully, or you will slip or
trip.`,"5,3":`The forest is dark, and beside you you have found a great wall of
solid rock to the west: the mountain, probably.`,"5,4":mo,"5,5":At,"5,6":`The forest stretches out, dark and mysterious. You are in a small
clearing where the sky can be seen. You notice the forest is
restless.`,"5,7":At,"6,0":be,"6,1":be,"6,2":`You are inside the cave; it is dark and gloomy. The walls are damp and
water can be heard running somewhere far off. You try to look ahead,
but it seems to have no end.`,"6,3":`The forest is dark, and beside you you have found a great wall of
solid rock to the west: the mountain, probably. You notice the rock
is damp; there is very likely a cave.`,"6,4":`Little light comes through the leaves of the trees. Brambles and
bushes give way to a small stream. A bridge crosses the stream to the
eastern part of the forest; there, under a tree, is the house of a
troll you will have to get past if you want to go east.`,"6,5":fa,"6,6":`The forest stretches out, dark, mysterious and restless. You are in a
small clearing where the sky can be seen.`,"6,7":`In this part of the forest the light begins to fail. Tangles of
bushes and brambles slow your steps. You notice something moving
among the shadows.`,"7,0":be,"7,1":be,"7,2":`You are a few steps inside the cave. Cold, damp air reaches you from
within. You try to see where it ends, but you cannot. You hear
murmurs from deep inside.`,"7,3":`Little light comes through the leaves of the trees. A tangle of
climbing plants stirs to the west: it is the mouth of a cave. You
feel a presence watching you.`,"7,4":mo,"7,5":At,"7,6":At,"7,7":At},mt=(t,e)=>t[e]??e,Wc=Rc.map(t=>({...t,name:mt(As,t.name)})),qc=Fc.map(t=>({...t,name:mt(Ai,t.name),drops:mt(As,t.drops)})),_c=Object.fromEntries(Object.entries(Bc).map(([t,e])=>[t,{...e,name:mt(Dc,e.name),holds:mt(As,mt(Ai,e.holds)),text:Hc[t]??e.text}])),zc={items:Wc,monsters:qc,rooms:_c},Un=16,{items:ns,monsters:Gc,rooms:Yc}=zc,fo=["norte","sur","este","oeste"],Uc={norte:[1,0],sur:[-1,0],este:[0,1],oeste:[0,-1]},po=[0,0],go=[1,0],Jn=(t,e)=>t.find(n=>n.name===e);function wo(t){const e=Jn(ns,t);if(e)return{item:e};const n=Jn(Gc,t);return n?{monster:n}:null}class wt{places=new Map;at=[po[0],po[1]];life=Un;weapon=null;shield=null;key=null;visited=new Set;constructor(){for(const[e,n]of Object.entries(Yc))this.places.set(e,{room:n,exits:[...n.exits],holds:wo(n.holds)});this.visited.add(this.here())}here(){return`${this.at[0]},${this.at[1]}`}place(){const e=this.places.get(this.here());if(!e)throw new Error(`no room at ${this.here()}`);return e}get won(){return this.at[0]===go[0]&&this.at[1]===go[1]}get spent(){return this.life<=0}save(){return JSON.stringify({at:this.at,life:this.life,held:[this.weapon?.name??null,this.shield?.name??null,this.key?.name??null],visited:[...this.visited],places:[...this.places].map(([e,n])=>[e,n.exits,n.holds?"item"in n.holds?n.holds.item.name:n.holds.monster.name:null])})}static load(e){const n=JSON.parse(e),a=new wt;a.at=n.at,a.life=n.life,[a.weapon,a.shield,a.key]=n.held.map(s=>s?Jn(ns,s)??null:null),a.visited.clear();for(const s of n.visited)a.visited.add(s);for(const[s,o,r]of n.places){const i=a.places.get(s);i&&Object.assign(i,{exits:o,holds:r?wo(r):null})}return a}charted(){return[...this.visited].sort().flatMap(e=>{const n=this.places.get(e);if(!n)return[];const{holds:a}=n;return[{where:e,name:n.room.name,exits:[n.exits[0],n.exits[1],n.exits[2],n.exits[3]],holds:a?"item"in a?{kind:a.item.kind,name:a.item.name}:{kind:"monster",name:a.monster.name}:null}]})}look(){const{room:e,exits:n,holds:a}=this.place();return{name:e.name,text:e.text,...a&&"monster"in a?{monster:a.monster.name}:{},...a&&"item"in a?{item:a.item.name,itemKind:a.item.kind}:{},exits:fo.flatMap((s,o)=>(n[o]??-1)>=0?[{direction:s,locked:(n[o]??0)>0}]:[]),at:[this.at[0],this.at[1]],life:this.life,...this.weapon?{weapon:this.weapon.name}:{},...this.shield?{shield:this.shield.name}:{},...this.key?{key:this.key.name}:{}}}go(e){const n=this.place(),a=fo.indexOf(e),s=n.exits[a]??-1;if(s<0)return"There is no way out that way.";if(s>0){if(!this.key||this.key.value!==s)return"The way is locked and you are not carrying the key.";n.exits[a]=0,this.key=null}const[o,r]=Uc[e];return this.at=[this.at[0]+o,this.at[1]+r],this.visited.add(this.here()),""}take(){const e=this.place();if(!e.holds||!("item"in e.holds))return"There is nothing here to take!";const{item:n}=e.holds;if(n.kind==="food")return this.life=Math.min(Un,this.life+n.value),e.holds=null,"Yum yum!";const a=n.kind,s=this[a];return this[a]=n,e.holds=s?{item:s}:null,{weapon:"You have taken a weapon.",shield:"You have taken a shield.",key:"You have taken a key."}[a]}attack(){const e=this.place();if(!e.holds||!("monster"in e.holds))return"There is no monster to attack!";if(!this.weapon)return"You have no weapon to attack with!";const{monster:n}=e.holds,a=[];if(this.weapon.value-n.defence>0){const o=Jn(ns,n.drops);e.holds=o?{item:o}:null,a.push("The monster has been defeated!")}const s=n.attack-(this.shield?.value??0);return s>0&&(this.life-=s,a.push("OUCH!")),a.join(" ")||"Neither of you gets anywhere."}run(e){const n=e.trim().toLowerCase(),a={norte:"norte",north:"norte",n:"norte",sur:"sur",south:"sur",s:"sur",este:"este",east:"este",e:"este",oeste:"oeste",west:"oeste",w:"oeste"}[n];return a?this.go(a):n==="coger"||n==="take"||n==="get"?this.take():n==="atacar"||n==="attack"||n==="hit"?this.attack():n==="mirar"||n==="look"||n==="l"||n===""?"":"I do not understand you."}}function at(t,e){const n=Math.max(...t.map(s=>s.length)),a=[];return t.forEach((s,o)=>{for(let r=0;r<s.length;){const i=s[r]??".";let h=r+1;for(;s[h]===i;)h+=1;const l=e[i];i!=="."&&l&&a.push(`<rect x="${r}" y="${o}" width="${h-r}" height="1" fill="${l}"/>`),r=h}}),`<svg class="pixel" viewBox="0 0 ${n} ${t.length}" shape-rendering="crispEdges" aria-hidden="true">${a.join("")}</svg>`}const st={k:"var(--ink)",a:"var(--accent)",m:"#aeb8c4",g:"#d4a017",b:"#8a5a2b",r:"#c0392b",w:"#f1f1ee",l:"#3f9b4b"},nn={weapon:at(["......mm",".....mmm","....mmm.","g..mmm..",".gmmm...","..bg....",".b..g...","b......."],st),shield:at([".kkkkkk.","kmmrrmmk","kmmrrmmk","krrrrrrk","kmmrrmmk",".kmrrmk.","..kmmk..","...kk..."],st),food:at(["....b...","...b.ll.",".rrbrr..","rrrrrrr.","rwrrrrr.","rrrrrrr.",".rrrrr..","..r.r..."],st),key:at(["........",".ggg....","g...g...","g...gggg","g...g.g.",".ggg..gg","........","........"],st),monster:at(["........","...rr...","..rrrr..",".rwrrwr.",".rkrrkr.","rrrrrrrr","rrkkkkrr","r.r..r.r"],st),player:at(["...kk...","..kkkk..","...kk...",".aaaaaa.","a.aaaa.a","..aaaa..","..a..a..",".kk..kk."],st)},fn=8,Jc=["n","s","e","w"];function Kc(t,e){const n=new Map(t.map(s=>[s.where,s])),a=[];for(let s=fn-1;s>=0;s-=1)for(let o=0;o<fn;o+=1){const r=`${s},${o}`,i=n.get(r),h=e[0]===s&&e[1]===o;if(!i){a.push(`<span class="cell" data-where="${r}"><span></span></span>`);continue}const l=Jc.flatMap((f,m)=>{const g=i.exits[m]??-1;return g<0?[`wall-${f}`]:g>0?[`door-${f}`]:[]}),c=["cell","seen",h?"here":"",...l].filter(Boolean).join(" "),d=i.holds?`<span class="thing${i.holds.kind==="monster"?" monster":""}" title="${x(i.holds.name)}">${nn[i.holds.kind]}</span>`:"",u=h?`<span class="player">${nn.player}</span>`:"";a.push(`<span class="${c}" data-where="${r}" title="${x(i.name)}"><span class="room">${x(i.name)}</span>${d}${u}</span>`)}return`<div class="map" role="img" aria-label="The map: ${t.length} of ${fn*fn} rooms seen">${a.join("")}</div>`}const Vc={norte:"north",sur:"south",este:"east",oeste:"west"};function Xc(t){const e=["weapon","shield","key"].flatMap(a=>t[a]?[`<span class="held">${nn[a]}${x(t[a]??"")}</span>`]:[]),n=Array.from({length:Un},(a,s)=>`<span class="heart${s<t.life?" full":""}"></span>`).join("");return`<p class="gear"><span class="hearts" title="${t.life} of ${Un} life">${n}</span>${e.join("")}</p>`}function Zc(t){const e=t.exits.map(({direction:a,locked:s})=>`${Vc[a]}${s?" (locked)":""}`),n=[t.weapon&&`weapon:${t.weapon}`,t.shield&&`shield:${t.shield}`,t.key&&`key:${t.key}`].filter(Boolean).join(" ");return`<div class="seen"><h4>===== ${x(t.name)} =====</h4><p>${x(t.text).replace(/\n/g,"<br>")}</p>`+(t.monster?`<p class="monster">${nn.monster}There is a monster here: ${x(t.monster)}</p>`:"")+(t.item?`<p class="item">${nn[t.itemKind??"weapon"]}There is: ${x(t.item)}</p>`:"")+`<p class="exits">Exits: ${e.length?e.join(", "):"none"}.</p>`+Xc(t)+`<p class="status">(${t.at[1]},${t.at[0]})| ${x(n)} ${t.life}&gt;</p></div>`}function Ii(t){return`<div class="adventure">${Kc(t.charted(),t.look().at)}${Zc(t.look())}</div>`}const Qc=()=>Ii(new wt),Ei="adventure",ed=["north","south","east","west","take","attack"];function td(t){let e=nd()??new wt;const n=w("div"),a=w("p",{class:"said"}),s=w("input",{type:"text",autocomplete:"off",spellcheck:!1,placeholder:"north, south, east, west, take, attack"});function o(c=""){n.innerHTML=Ii(e),a.textContent=e.spent&&!c?"Game over; better luck next time.":c,e.won&&(a.textContent="CONGRATULATIONS! You have reached the pantry."),i()}function r(c){const d=e.run(c);o(d),s.value="",s.focus()}function i(){try{localStorage.setItem(Ei,e.save())}catch{}}const h=w("form",{onsubmit:c=>(c.preventDefault(),r(s.value))},w("span",{class:"ps1"},"> "),s),l=w("div",{class:"row"},...ed.map(c=>w("button",{type:"button",onclick:()=>r(c)},c)),w("button",{type:"button",class:"quiet",onclick:()=>(e=new wt,o(""))},"start again"));return t.replaceChildren(n,a,h,l),o(""),()=>i()}function nd(){try{const t=localStorage.getItem(Ei);return t?wt.load(t):null}catch{return null}}const ad={name:"adventure",apps:{adventure:td},stills:{adventure:Qc}},sd=["January","February","March","April","May","June","July","August","September","October","November","December"];function Qn(t){const[e,n,a]=t.refreshed.split("-").map(Number),s=`${a} ${sd[(n??1)-1]} ${e}`,o=`${Math.min(...t.years)} to ${Math.max(...t.years)}`;return`<p class="source">Source: ${x(t.attribution)} <a href="${x(t.dataset)}">The dataset, at its source.</a> This site keeps sums of the finished years ${o}, last added to on ${s}.</p>`}function Is(t,e){const n=t.querySelector("p.source");if(n)return n;const a=document.createElement("div");return fetch(e).then(s=>s.json()).then(s=>{a.innerHTML=Qn(s)}).catch(()=>{}),a}const dt=[{code:"08019004",name:"Barcelona (Poblenou)",kind:"background",area:"urban"},{code:"08019043",name:"Barcelona (Eixample)",kind:"traffic",area:"urban"},{code:"08019044",name:"Barcelona (Gràcia - Sant Gervasi)",kind:"traffic",area:"urban"},{code:"08019057",name:"Barcelona (Palau Reial)",kind:"background",area:"urban"},{code:"08019058",name:"Barcelona (Observatori Fabra)",kind:"background",area:"suburban"},{code:"08015021",name:"Badalona",kind:"background",area:"urban"},{code:"08187012",name:"Sabadell",kind:"traffic",area:"urban"},{code:"17079003",name:"Girona (Escola de Música)",kind:"traffic",area:"urban"},{code:"25120001",name:"Lleida",kind:"traffic",area:"urban"},{code:"43148028",name:"Tarragona (Parc de la Ciutat)",kind:"background",area:"urban"},{code:"08137001",name:"Montseny (La Castanya)",kind:"background",area:"rural"}];function as(t,e){return e==="workdays"?[t.workdays]:e==="weekends"?[t.weekends]:[t.workdays,t.weekends]}const od=t=>(t%4===0&&t%100!==0||t%400===0?366:365)*24,pa=t=>t.reduce((e,n)=>e+n.reduce((a,s)=>a+s,0),0);function rd(t,e){return Object.entries(t.years).map(([n,a])=>{const s=as(a,e),o=s.reduce((h,l)=>h+pa(l.counts),0),r=s.reduce((h,l)=>h+pa(l.sums),0),i=as(a,"all").reduce((h,l)=>h+pa(l.counts),0);return{year:Number(n),mean:o>0?r/o:Number.NaN,measured:i/od(Number(n))}}).filter(({mean:n})=>!Number.isNaN(n)).sort((n,a)=>n.year-a.year)}function id(t,e){const n=Object.entries(t.years).filter(([a])=>Number(a)>=e.from&&Number(a)<=e.to).flatMap(([,a])=>as(a,e.days));return Array.from({length:24},(a,s)=>Array.from({length:12},(o,r)=>{const i=n.reduce((l,c)=>l+(c.sums[r]?.[s]??0),0),h=n.reduce((l,c)=>l+(c.counts[r]?.[s]??0),0);return{mean:h>0?i/h:null,count:h}}))}const ot=[[0,[0,255,0]],[20,[225,225,0]],[40,[255,0,0]],[60,[225,0,225]],[80,[64,0,64]],[230,[16,0,8]]],hd=([t,e,n])=>(.299*t+.587*e+.114*n)/255;function Es(t){const e=Math.max(0,Math.min(t,230)),n=Math.max(1,ot.findIndex(([l])=>l>=e)),[a,s]=ot[n-1]??ot[0],[o,r]=ot[n]??ot[ot.length-1],i=(e-a)/(o-a),h=s.map((l,c)=>Math.round(l+((r[c]??0)-l)*i));return{background:`rgb(${h.join(",")})`,light:hd(h)<.45}}const Bn=80,ji=["January","February","March","April","May","June","July","August","September","October","November","December"],Ci=t=>String(t+1).padStart(2,"0");function ld(t,e,n){if(t.mean===null)return'<td class="none"></td>';const{background:a,light:s}=Es(t.mean),o=s?' class="deep"':"",r=`${ji[n]}, hour ${Ci(e)}: ${t.mean.toFixed(1)} µg/m³, the mean of ${t.count} measurements`;return`<td${o} style="background:${a}" title="${r}">${Math.round(t.mean)}</td>`}function cd(t){const e=`<tr><th></th>${ji.map(a=>`<th scope="col">${a.slice(0,3)}</th>`).join("")}</tr>`,n=t.map((a,s)=>`<tr><th scope="row">${Ci(s)}</th>${a.map((o,r)=>ld(o,s,r)).join("")}</tr>`);return`<table class="heat graded"><thead>${e}</thead><tbody>${n.join("")}</tbody></table>`}function js(t){if(t<=0)return[0];const e=10**Math.floor(Math.log10(t)),n=t/e>=5?e:t/e>=2?e/2:e/5,a=[];for(let s=0;s<=t;s+=n)a.push(Math.round(s*100)/100);return a}const pn=720,ga=190,ce={top:14,right:8,bottom:22,left:34};function Oi(t,e,n){const a=Math.min(...t),s=Math.max(...t),o=pn-ce.left-ce.right,r=ga-ce.top-ce.bottom,i=o/Math.max(1,s-a+1),h=m=>ce.left+(m-a)*i,l=m=>ce.top+r-(m-e)/Math.max(1e-9,n-e)*r,d=js(n-e).map(m=>Math.round((m+e)*100)/100).map(m=>`<line class="grid" x1="${ce.left}" x2="${pn-ce.right}" y1="${A(l(m))}" y2="${A(l(m))}"/><text x="${ce.left-4}" y="${A(l(m)+3)}" text-anchor="end">${m}</text>`).join(""),u=s-a>12?5:1,f=Array.from({length:s-a+1},(m,g)=>a+g).filter(m=>m%u===0).map(m=>`<text x="${A(h(m)+i/2)}" y="${ga-6}" text-anchor="middle">${m}</text>`).join("");return{slot:i,x:h,y:l,left:ce.left,right:pn-ce.right,top:ce.top,height:r,levels:m=>m.map(({from:g,to:y,value:p,label:b})=>`<line class="span" x1="${A(h(g))}" x2="${A(h(y)+i)}" y1="${A(l(p))}" y2="${A(l(p))}"/><text class="span" x="${A((h(g)+h(y)+i)/2)}" y="${A(l(p)-5)}" text-anchor="middle">${b}</text>`).join(""),wrap:(m,g)=>`<svg class="years" viewBox="0 0 ${pn} ${ga}" role="img" aria-label="${m}">${d}${f}${g}</svg>`}}function ss(t,e){const n=Math.max(e.top??0,...t.map(({value:c})=>c),1),a=Oi(t.map(({year:c})=>c),0,n),{x:s,y:o,slot:r}=a,i=t.map(({year:c,value:d,title:u,chosen:f,partial:m,colour:g})=>`<rect class="${["bar",f?"chosen":"",m?"partial":""].filter(Boolean).join(" ")}" data-year="${c}"${g?` style="--bar:${g}"`:""} x="${A(s(c)+r*.15)}" y="${A(o(d))}" width="${A(r*.7)}" height="${A(o(0)-o(d))}"/><rect class="hit" data-year="${c}" x="${A(s(c))}" y="${a.top}" width="${A(r)}" height="${a.height}"><title>${u}</title></rect>`).join(""),h=(e.references??[]).map(({value:c,label:d})=>`<line class="reference" x1="${a.left}" x2="${a.right}" y1="${A(o(c))}" y2="${A(o(c))}"/><text class="reference" x="${a.right-2}" y="${A(o(c)-3)}" text-anchor="end">${d}</text>`).join(""),l=a.levels(e.spans??[]);return a.wrap(e.label,`${i}${h}${l}`)}const dd=.75,ud=[{value:40,label:"EU limit, 40"},{value:10,label:"WHO guideline, 10"}];function md(t,e){const n=t.map(({year:a,mean:s,measured:o})=>{const r=o<dd,i=r?`, from only ${Math.round(o*100)}% of the year's hours`:"";return{year:a,value:s,partial:r,colour:Es(s).background,chosen:a>=e.from&&a<=e.to,title:`${a}: ${s.toFixed(1)} µg/m³${i}`}});return ss(n,{label:"Mean NO2 of each year, µg/m³",top:Bn,references:ud})}const yo={all:"every day of the week",workdays:"Monday to Friday",weekends:"Saturdays and Sundays"};function fd(){const t=Array.from({length:Bn/5+1},(n,a)=>Es(a*5).background),e=[0,20,40,60,Bn].map(n=>`<span>${n===Bn?`${n}+`:n}</span>`).join("");return`<div class="scale" aria-hidden="true"><div class="ramp" style="background:linear-gradient(to right,${t.join(",")})"></div><div class="ticks">${e}</div><div class="ticks words"><span>clean</span><span>EU limit</span><span>twice it</span></div></div>`}function Li(t,e){const n=Object.keys(t.years).map(Number),a=Math.max(e.from,Math.min(...n)),s=Math.min(e.to,Math.max(...n)),o=a===s?String(a):`${a}–${s}`;return`<figure class="no2"><figcaption><strong>${t.name}</strong> · ${t.kind}, ${t.area} · mean NO2 in µg/m³ by hour of the day and month of the year · ${yo[e.days]}, ${o}</figcaption>`+cd(id(t,e))+fd()+`<h4>The mean of each year, ${yo[e.days]}</h4>`+md(rd(t,e.days),{from:a,to:s})+"</figure>"}function Yt(t){const e=Object.keys(t.years).map(Number);return{from:Math.min(...e),to:Math.max(...e),days:"all"}}const pd=[["all","every day"],["workdays","Monday to Friday"],["weekends","Saturday and Sunday"]];function gd(t){const e=new Map,n=Is(t,"/data/no2/index.json"),a=w("div");a.append(...t.querySelectorAll("figure"));let s=null,o={from:0,to:9999,days:"all"},r=!1;const i=(p,b=String(p))=>w("option",{value:p},b),h=w("select",{onchange:()=>{g(h.value)}},...dt.map(({code:p,name:b})=>i(p,b))),l=w("select",{onchange:()=>m({days:l.value})},...pd.map(([p,b])=>i(p,b))),c=w("select",{onchange:()=>m({from:Number(c.value),to:Math.max(Number(c.value),o.to)})}),d=w("select",{onchange:()=>m({to:Number(d.value),from:Math.min(Number(d.value),o.from)})}),u=w("button",{type:"button",onclick:()=>s&&m(Yt(s))},"every year");function f(){s&&(a.innerHTML=Li(s,o),c.value=String(o.from),d.value=String(o.to),l.value=o.days)}function m(p){o={...o,...p},f()}async function g(p){const b=e.get(p)??fetch(`/data/no2/${p}.json`).then(v=>v.json());e.set(p,b);try{const v=await b;if(r||h.value!==p)return;const T=Yt(v),S=s!==null&&(o.from!==Yt(s).from||o.to!==Yt(s).to),I=Object.keys(v.years).map(Number).filter(O=>O>=o.from&&O<=o.to),k=S&&I.length>0?{from:Math.min(...I),to:Math.max(...I)}:T;s=v,o={...k,days:o.days};const E=Object.keys(v.years);c.replaceChildren(...E.map(O=>i(O))),d.replaceChildren(...E.map(O=>i(O))),f()}catch{e.delete(p),a.replaceChildren(w("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}a.addEventListener("click",p=>{const b=p.target?.closest("[data-year]")?.getAttribute("data-year");b&&m({from:Number(b),to:Number(b)})});const y=w("div",{class:"row"},w("label",{},"Station ",h),w("label",{},"Days ",l),w("label",{},"Years ",c," to ",d),u);return t.replaceChildren(y,a,n),g(h.value),()=>{r=!0}}const wd="https://analisi.transparenciacatalunya.cat/resource";function Ni(t,e){const n=new URL(`${wd}/${t}.json`);for(const[a,s]of Object.entries(e))s!==void 0&&n.searchParams.set(`$${a}`,String(s));return n.toString()}const bo="tasf-thgu",Pi=Array.from({length:24},(t,e)=>String(e+1).padStart(2,"0")),yd=0,bd=6,gn=()=>Array.from({length:12},()=>new Array(24).fill(0)),vd=()=>({workdays:{sums:gn(),counts:gn()},weekends:{sums:gn(),counts:gn()}});function kd(t){if(!Array.isArray(t))throw new Error("the portal did not answer with rows");if(t.length===0)throw new Error("the portal answered with no rows");return t}function xd(t,e){const n=Number(e.month)-1;Pi.forEach((a,s)=>{const o=t.sums[n],r=t.counts[n];if(!o||!r)throw new Error(`month ${e.month} is not a month`);o[s]=(o[s]??0)+Number(e[`s${a}`]??0),r[s]=(r[s]??0)+Number(e[`n${a}`]??0)})}const $d={name:"no2",directory:"public/data/no2",firstYear:1991,files:dt.map(t=>`${t.code}.json`),about:{measures:"NO2, hourly, µg/m³",network:"Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica",attribution:"Generalitat de Catalunya, Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica. Dades obertes.",dataset:`https://analisi.transparenciacatalunya.cat/d/${bo}`,stations:dt},requestsFor(t){const e=dt.map(a=>`'${a.code}'`).join(","),n=Pi.map(a=>`sum(h${a}) as s${a}, count(h${a}) as n${a}`).join(", ");return[Ni(bo,{select:`codi_eoi, date_extract_m(data) as month, date_extract_dow(data) as dow, count(*) as days, ${n}`,where:`contaminant='NO2' and codi_eoi in (${e}) and data between '${t}-01-01T00:00:00' and '${t}-12-31T23:59:59'`,group:"codi_eoi,month,dow",limit:5e3})]},withYear(t,e,n){const a=kd(n[0]);if(a.some(o=>Number(o.days)>5))throw new Error("some days are in the portal twice");if(!a.some(o=>o.month==="12"))throw new Error("the year does not reach December yet");const s=new Map;for(const o of a){const r=o.codi_eoi??"",i=s.get(r)??vd();s.set(r,i);const h=Number(o.dow);xd(h===yd||h===bd?i.weekends:i.workdays,o)}return Object.fromEntries(dt.map(o=>{const r=`${o.code}.json`,i=s.get(o.code),h={...t[r]?.years,...i?{[e]:i}:{}};return[r,{...o,years:h}]}))}},Td=t=>{const e=JSON.parse(t(`/data/no2/${dt[0]?.code}.json`)),n=JSON.parse(t("/data/no2/index.json"));return Li(e,Yt(e))+Qn(n)},Sd={name:"air-quality",apps:{no2:gd},stills:{no2:Td},sources:[$d]},Md=9,vo=8,oe={days:5,hoursADay:vo,dayNames:["Mon","Tue","Wed","Thu","Fri"],hourNames:Array.from({length:vo},(t,e)=>`${Md+e}:00`)},It=t=>Math.max(0,Math.min(100,t));function ko(t){const{focus:e,fatigue:n,featureSize:a,weeks:s,calendar:o,meetingTypes:r}=t,i=[];let h=0,l=0;for(let c=0;c<s;c+=1)for(let d=0;d<oe.days;d+=1){let u=0,f=0;for(let m=0;m<oe.hoursADay;m+=1){const g=r[o[`${d}-${m}`]??""];if(g){u=It(u+g.focus),f=It(f+g.fatigue),i.push({week:c,day:d,hour:m,inMeeting:!0,hourFocus:u,hourFatigue:f,hourProductivity:0,accumulatedProductivity:h,completedFeatures:l,featureCompleted:!1});continue}u=It(u+e),f=It(f+n);const y=It(u-f),p=a-h,b=y>p,v=b?p:y;b?(l+=1,h=0):h+=v,i.push({week:c,day:d,hour:m,inMeeting:!1,hourFocus:u,hourFatigue:f,hourProductivity:v,accumulatedProductivity:h,completedFeatures:l,featureCompleted:b}),b&&(u=0)}}return i}function wn(){return Array.from({length:oe.hoursADay},()=>new Array(oe.days).fill(0))}function yn(t,{hour:e,day:n},a){const s=t[e];s&&(s[n]=(s[n]??0)+a)}function xo(t,{featureSize:e,weeks:n}){const a=t[t.length-1],s=a?.completedFeatures??0,o=a?.accumulatedProductivity??0,r=s+Math.round(10*o/e)/10,i=s*e+o,h=Array.from({length:oe.days},()=>({productivity:0,features:0,meetings:0})),l={focus:wn(),fatigue:wn(),productivity:wn(),features:wn()};for(const d of t){const u=h[d.day];u.productivity+=d.hourProductivity,d.featureCompleted&&(u.features+=1),d.inMeeting&&(u.meetings+=1),yn(l.focus,d,d.hourFocus),yn(l.fatigue,d,d.hourFatigue),yn(l.productivity,d,d.hourProductivity),d.featureCompleted&&yn(l.features,d,1)}const c=d=>d.map(u=>u.map(f=>n>0?f/n:0));return{totalFeatures:r,totalProductivity:i,averageFeaturesPerWeek:n>0?r/n:0,averageProductivityPerWeek:n>0?i/n:0,days:h,hours:{focus:c(l.focus),fatigue:c(l.fatigue),productivity:c(l.productivity),features:l.features}}}const Cs={width:480,height:240,pad:{top:10,right:10,bottom:34,left:36}},{width:$o,height:wa,pad:de}=Cs;function Ri(t,e,n,a){const s=$o-de.left-de.right,o=wa-de.top-de.bottom,r=l=>de.top+o-(t>0?l/t*o:0),i=a.map(l=>`<line class="grid" x1="${de.left}" x2="${$o-de.right}" y1="${r(l)}" y2="${r(l)}"/><text x="${de.left-4}" y="${r(l)+3}" text-anchor="end">${l}</text>`).join(""),h=(n>1?[1,Math.ceil(n/2),n]:[]).filter((l,c,d)=>d.indexOf(l)===c).map(l=>`<text x="${de.left+(l-1)/Math.max(1,n-1)*s}" y="${wa-de.bottom+14}" text-anchor="middle">${l}</text>`).join("");return`${i}${h}<text x="${de.left+s/2}" y="${wa-6}" text-anchor="middle">${e.x}</text><text transform="translate(9 ${de.top+o/2}) rotate(-90)" text-anchor="middle">${e.y}</text>`}const{width:To,height:Et,pad:re}=Cs;function Fi(t,e,n){const a=Math.max(...t.map(m=>m.values.length),1),s=Math.max(1,...t.flatMap(m=>m.values)),o=To-re.left-re.right,r=Et-re.top-re.bottom,i=o/a,h=i*.7/t.length,l=m=>re.top+r-m/s*r,c=t.map((m,g)=>m.values.map((y,p)=>{const b=re.left+p*i+i*.15+g*h;return`<rect class="${m.className}" x="${b.toFixed(1)}" y="${l(y).toFixed(1)}" width="${h.toFixed(1)}" height="${(re.top+r-l(y)).toFixed(1)}"><title>${m.name}: ${Math.round(y*10)/10}</title></rect>`}).join("")).join(""),d=(n??[]).map((m,g)=>`<text x="${re.left+g*i+i/2}" y="${Et-re.bottom+14}" text-anchor="middle">${m}</text>`).join(""),u=t.map((m,g)=>`<rect class="${m.className}" x="${re.left+g*90}" y="${Et-re.bottom+20}" width="10" height="3"/><text x="${re.left+g*90+14}" y="${Et-re.bottom+24}">${m.name}</text>`).join(""),f=Ri(s,e,n?0:a,js(s));return`<svg viewBox="0 0 ${To} ${Et}" role="img" aria-label="${e.y} by ${e.x}">${f}${c}${d}${u}</svg>`}const So={sizeAt(t){return t<=500?t:t<=750?500+(t-500)*2:t<1e3?1e3+(t-750)*35:1e4},positionOf(t){return t<=500?t:t<=1e3?500+(t-500)/2:t<1e4?750+(t-1e3)/35:1e3}};function bn(t,e){const n=e.flat(),a=Math.min(...n),s=Math.max(...n),o=w("div",{class:"week"},w("span"),...oe.dayNames.map(r=>w("span",{class:"head"},r)));return e.forEach((r,i)=>{o.append(w("span",{class:"hour"},oe.hourNames[i]??""));for(const h of r){const l=s>a?(h-a)/(s-a):0;o.append(w("span",{class:"cell",style:`--heat:${(.1+l*.9).toFixed(2)}`},String(Math.round(h))))}}),w("div",{},w("h4",{},t),o)}function Ad(t){const e={focus:25,fatigue:15,featureSize:300,weeks:8},n={"🍽️ Lunch":{focus:-100,fatigue:-100},"🏃 Sprint plan":{focus:-100,fatigue:50},"😴 Boring":{focus:-50,fatigue:-25}},a={};for(let C=0;C<oe.days;C+=1)a[`${C}-3`]="🍽️ Lunch";let s="🏃 Sprint plan",o=null;const r=w("div",{class:"figures"}),i=w("div",{class:"chart"}),h=w("div",{class:"maps"}),l=w("div",{class:"week"}),c=w("select"),d=w("input",{type:"number",min:-100,max:100}),u=w("input",{type:"number",min:-100,max:100}),f=w("input",{type:"text",placeholder:"New meeting name",size:16}),m=(C,M,L,$,j=P=>P,N=P=>P)=>{const P=w("output",{},String(e[C])),B=w("input",{type:"range",min:L,max:$,value:N(e[C]),oninput:()=>{e[C]=j(Number(B.value)),P.textContent=String(e[C]),H()}});return w("label",{},`${M}: `,P,B)},g=w("div",{class:"dials"},m("focus","Focus an hour",0,100),m("fatigue","Fatigue an hour",0,100),m("featureSize","Feature size",0,1e3,So.sizeAt,So.positionOf),m("weeks","Weeks",1,16));function y(){c.replaceChildren(...Object.keys(n).map(M=>w("option",{value:M,selected:M===s},M)));const C=n[s];d.value=String(C?.focus??0),u.value=String(C?.fatigue??0)}c.addEventListener("change",()=>{s=c.value,y()});const p=()=>{n[s]={focus:Number(d.value)||0,fatigue:Number(u.value)||0},H()};d.addEventListener("change",p),u.addEventListener("change",p);const b=()=>{const C=f.value.trim();!C||n[C]||(n[C]={focus:0,fatigue:0},s=C,f.value="",y())},v=w("div",{class:"row"},w("span",{},"Paint: "),c,w("span",{},"focus "),d,w("span",{},"fatigue "),u,f,w("button",{type:"button",onclick:b},"Add"));let T=null;const S=C=>{if(T==="add"&&!a[C])a[C]=s;else if(T==="remove"&&a[C])delete a[C];else return;H()};function I(){l.replaceChildren(w("span"),...oe.dayNames.map(C=>w("span",{class:"head"},C))),oe.hourNames.forEach((C,M)=>{l.append(w("span",{class:"hour"},C));for(let L=0;L<oe.days;L+=1){const $=`${L}-${M}`,j=a[$];l.append(w("span",{class:j?"slot meeting":"slot",title:j??"free",onpointerdown:N=>{N.preventDefault(),T=a[$]?"remove":"add",S($)},onpointerenter:()=>{T&&S($)}},j?j.slice(0,2):""))}})}window.addEventListener("pointerup",()=>{T=null});const k=w("div",{class:"row"}),E=()=>{o={summary:xo(ko({...e,calendar:a,meetingTypes:n}),e),weeks:e.weeks},H()},O=()=>{o=null,H()};function H(){I();const C=ko({...e,calendar:a,meetingTypes:n}),M=xo(C,e),L=e.weeks*oe.days*oe.hoursADay;r.replaceChildren(w("div",{class:"clean"},w("strong",{},M.totalFeatures.toFixed(1)),"features finished"),w("div",{},w("strong",{},M.averageFeaturesPerWeek.toFixed(2)),"features a week"),w("div",{},w("strong",{},Math.round(M.totalProductivity/L).toString()),"productivity an hour"),w("div",{},w("strong",{},String(L)),"hours simulated")),k.replaceChildren(o?w("span",{},`Baseline: ${o.summary.averageFeaturesPerWeek.toFixed(2)} features a week over ${o.weeks} weeks; now ${M.averageFeaturesPerWeek.toFixed(2)}. `):w("span",{},"Keep this run to compare against: "),w("button",{type:"button",onclick:E},o?"Save again":"Save as baseline")),o&&k.append(w("button",{type:"button",onclick:O},"Clear")),i.innerHTML=Fi([{name:"Productivity",className:"clean",values:M.days.map($=>$.productivity/e.weeks)},{name:"Features ×100",className:"debt",values:M.days.map($=>$.features/e.weeks*100)}],{x:"",y:"A day, on average"},oe.dayNames),i.prepend(w("h4",{},"The shape of a week")),h.replaceChildren(bn("Focus",M.hours.focus),bn("Fatigue",M.hours.fatigue),bn("Productivity",M.hours.productivity),bn("Features finished",M.hours.features))}y(),t.append(g,v,w("div",{class:"charts"},l,i),r,k,h),H()}const Id={name:"developer-meetings",apps:{"developer-meetings":Ad}},jt={exams:[.01,.01,.02,.01,.05,.2,.05,.1,.2,.3,.5,.4,.3,.2,.1,.05,.1,.3,.8,1,.4],labs:[.01,.02,.03,.04,.06,.09,.12,.17,.23,.32,.44,.48,.58,.78,.87,.89,.78,.75,.62,.45,.2]},ya={x:{frames:1,pace:1},normal:{frames:2,pace:1},normal1:{frames:2,pace:1},normal2:{frames:2,pace:1},est:{frames:7,pace:5},zz:{frames:2,pace:5},bt:{frames:6,pace:1},http:{frames:8,pace:2},pract:{frames:5,pace:1},no:{frames:4,pace:3},bar0:{frames:6,pace:1},amig:{frames:4,pace:3},suplica:{frames:2,pace:3}};class Bi{static everyImage=Object.entries(ya).flatMap(([e,{frames:n}])=>Array.from({length:n},(a,s)=>`${e}${s}`));series="x";frame=0;wait=0;after=null;shaking=-1;get image(){return`${this.series}${this.frame}`}play(e){if(this.shaking>=0){this.after=e;return}e!==this.series&&(this.wait=0),this.show(e)}flash(e,n){this.shaking<0&&(this.after=this.series),this.shaking=n,this.show(e)}stop(){this.shaking=-1,this.after=null,this.series="x",this.frame=0}beat(){if(this.shaking===0&&this.after&&this.show(this.after),this.shaking>=0&&(this.shaking-=1),this.wait>0&&(this.wait-=1),this.wait>0)return;const{frames:e,pace:n}=ya[this.series];this.frame=(this.frame+1)%e,this.wait=n}show(e){this.series=e,this.frame%=ya[e].frames}}const he=3,qe=16,Ed=25,je=20,Mo=22,ba=200,va=100,ka=100,Ao=30,Io=-10,jd=.05,Cd=.3,Eo=10/he,jo={superior:40,tecnica:25},Od={step:0,hour:0,day:0,term:1,doing:"idle",boredom:0,stress:0,labHabit:10,studyHabit:10,chatHabit:10,barHabit:10,friends:10,sleep:0,terminal:0,exams:Array(10).fill(0),labs:Array(10).fill(0),enrolled:4,passed:0,left:9,selection:!0,alfas:Array(6).fill(1),asks:null,suggested:0,ended:null,said:[]},Ld=`Sorry, but you no longer belong to this faculty. :(



Normal.`,Nd=`Hey, what are you playing at????
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
attention, doesn't it?)`,Pd=`Don't you know that stress is really bad
for your health? Your Fibergochi has had to
leave the faculty, be more careful next time!
See if you can take its mind off things a little,
make new and interesting friends... or not so much...`;class os{constructor(e,n={}){this.random=e;const a={...Od,...n};this.s={...a,exams:[...a.exams],labs:[...a.labs],alfas:[...a.alfas],said:[...a.said]},this.s.ended===null&&this.show(this.s.doing)}random;s;sprite=new Bi;beats=0;get state(){return{...this.s,exams:[...this.s.exams],labs:[...this.s.labs],alfas:[...this.s.alfas],said:[...this.s.said]}}get picture(){return this.sprite.image}get clock(){const e=this.s.step+this.s.hour*he,n=e*30%60;return`${this.s.day+1}, ${Math.floor(e/(he*qe)*24)}:${n<10?"0":""}${n}h (${this.s.term})`}get examsPending(){return this.studyLeft>0}get labsPending(){return this.labLeft>0}get studyLeft(){return this.taken(this.s.exams).reduce((e,n)=>e+Math.max(n,0),0)}get labLeft(){return this.taken(this.s.labs).reduce((e,n)=>e+Math.max(n,0),0)}get hasTerminal(){return this.s.terminal>0}get lampsLit(){return this.s.day<je||this.beats%3===1}get enrolment(){return{most:Math.min(10,this.s.left),suggested:this.s.suggested}}get alive(){return this.s.ended===null}get waiting(){return this.s.said.length>0||this.s.asks!==null}step(){!this.alive||this.waiting||(this.keepHabits(),this.studyOrWork(),this.holdTerminal(),this.browseOn(),this.getBored(),this.calmDown(),this.alive&&(this.searchTerminal(),this.followHabits(),this.stayAtBar(),this.s.step+=1,this.s.step>=he&&(this.s.step=0,this.nextHour())))}animate(){!this.alive||this.waiting||(this.beats+=1,this.sprite.beat())}studyOrSleep(){this.alive&&(this.s.day<=je?this.set(this.random()<.5?"studying":"asleep"):this.sprite.flash("no",24))}browse(){this.alive&&(this.s.terminal?this.set("browsing"):this.sprite.flash("no",14))}goToBar(){this.alive&&this.set("bar")}makeFriends(){this.alive&&this.set("friends")}lookForTerminal(){this.alive&&(this.s.terminal<=0?this.set("looking"):this.sprite.flash("no",10))}beg(){if(!this.alive)return;const{exams:e,labs:n}=this.s,a=r=>e[r]+n[r],s=this.taken(e).map((r,i)=>i).filter(r=>a(r)>0);if(this.s.day<je||s.length===0)return this.sprite.flash("no",10);const o=s.reduce((r,i)=>a(i)<a(r)?i:r);this.sprite.flash("suplica",20),this.random()<Cd&&(e[o]-=this.random()*Eo),this.s.stress+=Eo*this.random()}alfa(){if(!this.alive)return;const{term:e,left:n,selection:a,alfas:s,enrolled:o,exams:r,labs:i,day:h,passed:l}=this.s;let c=`Score: this is term ${e} you have been at the FIB.

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

`}if(h<=Mo){const d=[0,0,0,0,0];for(let f=0;f<o;f+=1){const m=r[f]+i[f];d[m<=0?0:m<=2*he?1:m<=5*he?2:m<=8*he?3:4]+=1}const u=["subjects going well","that will go well with a little effort","subjects you should get down to","subjects you find hard","subjects you had better pray for"];d.forEach((f,m)=>{f>0&&(c+=`You have ${f} ${u[m]}.
`)}),c+=`You are enrolled in ${o} subjects in all.`}else c+=`Of ${o}, ${l} are passed.`;this.s.said.push(c)}dismiss(){this.s.said.shift()}enrol(e){return this.s.asks!=="enrol"||!Number.isInteger(e)||e<1||e>this.enrolment.most?!1:(this.s.enrolled=e,this.s.asks=null,!0)}choose(e){this.s.asks==="degree"&&(this.s.left=jo[e],this.askEnrolment())}keepHabits(){const{doing:e}=this.s;e==="lab"?this.s.labHabit+=1:e==="studying"?this.s.studyHabit+=1:e==="browsing"?this.s.chatHabit+=1:e==="friends"?this.s.friends+=1:e==="bar"&&(this.s.barHabit+=1,this.s.friends+=.4),this.s.friends=Math.min(this.s.friends,ka)}studyOrWork(){if(this.s.doing==="lab"){if(!this.labsPending)return this.set("idle");const e=this.easiest(this.s.labs);100-this.s.exams[e]>this.random()*100&&(this.s.labs[e]-=1)}else if(this.s.doing==="studying"){if(!this.examsPending)return this.set("idle");this.s.exams[this.easiest(this.s.exams)]-=1}}easiest(e){const{exams:n,labs:a}=this.s;let s=this.taken(e).findIndex(r=>r>0),o=n[s]+a[s]+s;for(let r=s+1;r<this.s.enrolled;r+=1){const i=n[r]+a[r];o>i&&e[r]>0&&(s=r,o=i+r)}return s}holdTerminal(){if(this.s.day>je||this.s.terminal<=0){this.s.terminal=0;return}this.s.doing==="idle"&&this.labsPending&&this.set("lab"),this.s.doing==="lab"?this.s.terminal=Math.round(this.s.terminal+this.random()):(this.s.doing!=="browsing"||this.random()<=jt.labs[this.s.day])&&(this.s.terminal-=1),this.s.terminal=Math.max(this.s.terminal,0)}browseOn(){this.s.doing==="browsing"&&(this.s.boredom+=Math.round(.5*this.random()),this.s.terminal<=0&&this.set("idle"))}getBored(){const{doing:e}=this.s;if(e==="idle"?(this.s.boredom+=1,this.s.boredom%10===0&&this.set("idle")):e==="studying"?this.s.boredom+=.1:e==="lab"?this.s.boredom+=this.random()/2:e==="asleep"?this.s.boredom-=1:e==="bar"&&(this.s.boredom-=this.random()),this.s.boredom>ba)return this.end("bad",Nd);this.s.boredom=Math.max(this.s.boredom,-ba/2)}calmDown(){this.s.doing==="bar"&&(this.s.stress-=1),this.s.stress=Math.max(this.s.stress,0),this.s.stress>va&&this.end("bad",Pd)}searchTerminal(){const{doing:e,day:n}=this.s;if(e==="looking"&&n<=je&&this.s.terminal<=0){this.s.stress+=1;const a=(.5+jt.exams[n])*(1-jt.labs[n]),s=this.random();if(s<=a){const o=(s<=a/2?4:2)*(he+1);this.s.terminal=Math.round(o*this.random()),this.set("idle")}}else e==="looking"&&this.set("idle");n>je&&(this.s.terminal=0)}followHabits(){const{doing:e,hour:n}=this.s,a=this.s.labHabit/this.s.chatHabit/2,s=this.s.chatHabit/this.s.labHabit/2,o=this.s.studyHabit/this.s.barHabit/2,r=this.labsPending,i=h=>this.random()<h;if(this.s.terminal>0)if(e==="lab")a<=.5?i(.5-a)&&this.set("browsing"):r||this.set(this.random()>(.5-s)*2?"browsing":"idle");else if(e==="browsing")if(r){const[h,l]=this.s.terminal<he?[2,1]:[1,2];(s<=.5?i((.5-s)*h):this.random()>(.5-a)*l)&&this.set("lab")}else s<.5&&this.random()*.4>s&&this.set("idle");else(e==="idle"||e==="studying")&&(this.s.friends>ka/2&&i(.5-o)&&this.set("bar"),s<=.5&&i(.5-s)&&this.set("browsing"),a<=.5&&i(.5-a)&&r&&this.set("lab"));else if(e==="studying"&&o<=.5){const h=n<qe/4?he:n>3*qe/4?he/2:1;this.random()*h<.5-o&&this.set("bar")}}stayAtBar(){this.s.doing==="bar"&&this.s.friends/ka<this.random()/2&&this.set("idle")}nextHour(){if(this.getSleepy(),this.s.doing==="lab"&&(this.s.boredom+=Math.round(4*this.random())),this.classInTheRoom(),this.s.hour<qe-1){this.s.hour+=1;return}this.s.hour=0,this.nextDay()}getSleepy(){const e=this.s.hour<qe*3/4;this.s.doing!=="asleep"?(e?this.s.sleep+=1:this.s.doing==="idle"&&this.s.sleep>5?this.set("asleep"):this.s.sleep+=2+(this.s.terminal>0?1:0),this.s.sleep>(this.s.terminal>0?Ao*1.25:Ao)&&this.set("asleep")):e&&this.s.sleep<Io/4?this.set("idle"):(this.s.sleep-=2,this.s.sleep<Io&&this.set("idle"))}classInTheRoom(){const{hour:e}=this.s;e>=qe/3&&e<=2*qe/3&&this.random()<jd&&(this.s.terminal=0)}nextDay(){const{day:e}=this.s;if(this.fadeHabits(),e<je?this.bringWork():e===Mo&&this.mark(),e<Ed-1){this.s.day+=1;return}this.s.day=0,this.nextTerm()}fadeHabits(){const e=n=>Math.max(1,Math.round(n*.9));this.s.labHabit=e(this.s.labHabit),this.s.studyHabit=e(this.s.studyHabit),this.s.barHabit=e(this.s.barHabit),this.s.chatHabit=e(this.s.chatHabit),this.s.friends=e(this.s.friends)}bringWork(){const e=this.s.day+5;if(this.s.day===0)for(let n=e;n>=0;n-=1)this.bringWorkFor(n);else e<je&&this.bringWorkFor(e)}bringWorkFor(e){for(let n=0;n<this.s.enrolled;n+=1){const a=he*((n+1)/2)+1;this.random()<=jt.labs[e]&&(this.s.labs[n]+=Math.round(a*this.random())),this.random()<=jt.exams[e]&&(this.s.exams[n]+=Math.round(a*this.random()))}}mark(){for(let e=0;e<this.s.enrolled;e+=1)this.s.exams[e]+this.s.labs[e]<he&&(this.s.passed+=1);this.s.alfas=[...this.s.alfas.slice(1),this.s.alfas[5]],this.s.exams.fill(0),this.s.labs.fill(0)}nextTerm(){const{enrolled:e,passed:n,selection:a,term:s}=this.s;if(this.s.alfas[5]=a?1:e?n/e:0,this.s.alfas.filter(o=>o<.5).length>3)return this.end("bad","You have 4 Alfa parameters below 0.5, bye, bye.");if(this.s.left-=n,this.s.passed=0,this.s.term+=1,this.s.left<=0){if(!a)return this.end("good",`Very Good!
You did it!!!!!!!
Your Fibergochi has finished the degree!!!!!
`,`ERROR 315: in module KERNEL386.EXE,
page 0137:0A285F43.
An UNFORESEEN situation has occurred,
we are very sorry, but we thought that
nobody would ever get here, where no
other man has gone before!.`);this.s.selection=!1,this.s.said.push("You have SUCCESSFULLY finished the SELECTION PHASE!!!!!"),this.s.asks="degree";return}if(a&&s===2&&this.s.left>8)return this.end("bad","BACARRA!!!!");if(a&&s>3){if(this.s.left>2)return this.end("bad","You have not got through the Selection Phase.");this.s.said.push(`You have not passed everything, but it is not serious.
YOU HAVE GOT THROUGH THE SELECTION PHASE, but... They will not throw you out, but you have to go to
the Técnica (or rather, they make you).`),this.s.left=jo.tecnica,this.s.selection=!1}this.askEnrolment()}askEnrolment(){this.s.asks="enrol",this.s.suggested=Math.min(Math.round(this.random()*4)+3,this.s.left)}taken(e){return e.slice(0,this.s.enrolled)}set(e){this.s.doing=e,this.show(e)}show(e){if(e==="lab")this.sprite.play("pract");else if(e==="studying")this.sprite.play("est");else if(e==="asleep")this.sprite.play("zz");else if(e==="looking")this.sprite.play("bt");else if(e==="friends")this.sprite.play("amig");else if(e==="browsing")this.sprite.play("http");else if(e==="bar")this.sprite.play("bar0");else{const n=this.s.boredom+this.s.stress,a=ba+va;n<a/3?this.sprite.play("normal"):n<a/1.5?this.sprite.play("normal1"):this.sprite.play("normal2"),this.s.stress>va*2/3&&this.sprite.play("normal2")}}end(e,...n){this.s.said.push(...n),e==="bad"&&this.s.said.push(Ld),this.s.ended=e,this.s.asks=null,this.sprite.stop()}}const Rd=["step","hour","day","term","boredom","stress","labHabit","studyHabit","chatHabit","barHabit","friends","sleep","terminal","enrolled","passed","left","suggested"],Fd=["idle","asleep","studying","browsing","looking","lab","bar","friends"],xa=(t,e)=>Array.isArray(t)&&t.length===e&&t.every(n=>Number.isFinite(n));function Bd(t){let e;try{e=JSON.parse(t??"null")}catch{return null}return typeof e!="object"||e===null||Array.isArray(e)?null:Rd.every(a=>Number.isFinite(e[a]))&&Fd.includes(e.doing)&&xa(e.exams,10)&&xa(e.labs,10)&&xa(e.alfas,6)&&typeof e.selection=="boolean"&&[null,"enrol","degree"].includes(e.asks)&&[null,"good","bad"].includes(e.ended)&&Array.isArray(e.said)&&e.said.every(a=>typeof a=="string")?e:null}const Dd={x:"A cross: there is no Fibergochi.",normal:"The Fibergochi, standing about.",normal1:"The Fibergochi, standing about, getting bored.",normal2:"The Fibergochi, bored stiff.",est:"The Fibergochi at a desk, studying.",zz:"The Fibergochi, asleep.",bt:"A room full of terminals, all taken, and the Fibergochi looking for a free one.",http:"A terminal, and the Fibergochi browsing: http.",pract:"The Fibergochi at a terminal, doing a lab.",no:"The Fibergochi, shaking its head.",bar0:"The Fibergochi at the bar with its friends, drinks on the table.",amig:"The Fibergochi with a group of friends.",suplica:"The Fibergochi on the floor, begging."},Hd=[[["study","estudio","Study/Sleep","to study or to sleep."]],[["http","http","http","to have a good time at a terminal (if you have one)."],["alfa","alfa","alfa","see the score."],["bar","bar","Bar","go to the bar, have a drink or play mus."]],"screen",[["friends","amigos","Friends","to make new friends."],["terminal","bt","Find terminal","look for a terminal to do labs, or not."],["beg","suplica","Beg","to try to get more passes."]]],Wd={slow:"slow",normal:"normal",fast:"fast"};function Co(t,[e,n,a,s]){if(t<=0)return e;if(t<3)return`${n}, under an hour`;const o=Math.round(t/3);return`${t<15?a:s}, about ${o} ${o===1?"hour":"hours"}`}const Ae=(t,e,{title:n="",disabled:a=!1}={})=>`<button type="button" data-do="${t}"${n?` title="${x(n)}"`:""}${a?" disabled":""}>${e}</button>`;function Di(t,{running:e,confirmingNew:n,pace:a,picked:s=null}){const o=!t.alive||t.waiting||n,r=m=>m&&t.lampsLit?"on":"off",i=[["exam",r(t.examsPending),Co(t.studyLeft,["nothing to study","a little to study","something to study","a lot to study"])],["lab",r(t.labsPending),Co(t.labLeft,["no lab to do","a little lab work","some lab work","a lot of lab work"])],["terminal",t.hasTerminal?"on":"off",t.hasTerminal?"a terminal":t.labsPending?"no terminal, and labs need one":"no terminal"]],h=i.map(([m,g,y])=>`<li><button type="button" class="lamp ${g}" data-do="lamp-${m}" data-lamp="${m}" title="${m}: ${y}">${m}</button></li>`).join(""),l=i.map(([m,g,y])=>`<li class="${g}${m===s?" picked":""}" data-lamp="${m}"><b>${m}</b> ${y}</li>`).join(""),c=t.picture,d=Dd[c.replace(/\d$/,"")]??"",u=`<div class="screen"><ul class="lamps" data-show="lamps">${h}</ul><img data-show="picture" src="/fibergochi/${c}.gif" alt="${d}" width="200" height="160"></div>`;return`<div class="fibergochi"><div class="egg"><p class="by"><span>by</span> Night</p>${Hd.map(m=>m==="screen"?u:`<div class="keys">${m.map(([g,y,p,b])=>{const[v,T]=y==="alfa"?[15,11]:[22,21];return Ae(g,`<img src="/fibergochi/keys/${y}.gif" alt="${p}" width="${v*2}" height="${T*2}">`,{title:`${p}: ${b}`,disabled:o})}).join("")}</div>`).join("")}</div><div class="panel"><p class="time"><output data-show="clock">${t.clock}</output> ${Ae("pause",e?"pause":"go on")} ${Ae("speed",`speed: ${Wd[a]}`,{title:"Change the speed of time."})} ${Ae("new","new")}</p><ul class="legend" data-show="legend">${l}</ul>${qd(t,n)}</div></div>`}function qd(t,e){const{said:n,asks:a}=t.state,s=(o,...r)=>`<div class="dialog" role="alertdialog"><p>${x(o).replaceAll(`
`,"<br>")}</p><p>${r.join(" ")}</p></div>`;if(e)return s("Are you sure you want a new Fibergochi?",Ae("new-yes","OK"),Ae("new-no","Cancel"));if(n.length>0)return s(n[0],Ae("ok","OK"));if(a==="degree")return s("Do you want to do the Superior?",Ae("superior","OK"),Ae("tecnica","Cancel"));if(a==="enrol"){const{most:o,suggested:r}=t.enrolment;return`<form class="dialog" data-do="enrol"><label>How many credits do you want to enrol in? [1..${o}] <input type="number" name="credits" min="1" max="${o}" value="${r}"></label> <button type="submit">OK</button></form>`}return""}const Oo="fibergochi:1999-03-02",$a={slow:1e3,normal:400,fast:10},_d={slow:"normal",normal:"fast",fast:"slow"},zd=100,Gd=10;function Yd(t){let e=new os(Math.random,f()??{}),n=!0,a=!1,s=null,o="slow",r=0;const i=Zn(t),h=document.createElement("div"),l=w("div",{hidden:!0},...Bi.everyImage.map(k=>w("img",{src:`/fibergochi/${k}.gif`,alt:"",width:50,height:40}))),c=()=>Di(e,{running:n,confirmingNew:a,pace:o,picked:s});function d(){const k=document.activeElement instanceof HTMLElement&&h.contains(document.activeElement)?document.activeElement.dataset.do:void 0;h.innerHTML=c(),k&&h.querySelector(`[data-do="${k}"]`)?.focus()}function u(){const k=document.createElement("div");k.innerHTML=c();for(const E of h.querySelectorAll("[data-show]")){const O=k.querySelector(`[data-show="${E.dataset.show}"]`);O&&(E instanceof HTMLImageElement?E.getAttribute("src")!==O.getAttribute("src")&&(E.src=O.getAttribute("src")??"",E.alt=O.getAttribute("alt")??""):E.innerHTML!==O.innerHTML&&(E.innerHTML=O.innerHTML))}}function f(){try{return Bd(localStorage.getItem(Oo))}catch{return null}}function m(){try{localStorage.setItem(Oo,JSON.stringify(e.state))}catch{}}const g=()=>n&&i.onScreen()&&e.alive&&!e.waiting;let y=setTimeout(p,$a[o]);function p(){if(y=setTimeout(p,$a[o]),!!g()){if(e.step(),r+=1,e.waiting||!e.alive){m(),d();return}r%Gd===0&&m(),u()}}const b=setInterval(()=>{g()&&(e.animate(),u())},zd),v={study:()=>e.studyOrSleep(),http:()=>e.browse(),alfa:()=>e.alfa(),bar:()=>e.goToBar(),friends:()=>e.makeFriends(),terminal:()=>e.lookForTerminal(),beg:()=>e.beg()},T={pause:()=>n=!n,speed:()=>{o=_d[o],clearTimeout(y),y=setTimeout(p,$a[o])},new:()=>a=!0,"new-no":()=>a=!1,"new-yes":()=>{e=new os(Math.random),a=!1,n=!0},ok:()=>e.dismiss(),superior:()=>e.choose("superior"),tecnica:()=>e.choose("tecnica")};function S(k){const E=k.target.closest("button[data-do]")?.dataset.do??"";E.startsWith("lamp-")?(s=E.slice(5),u()):v[E]?(v[E](),e.waiting?d():u()):T[E]&&(T[E](),m(),d())}function I(k){k.preventDefault();const E=k.target.querySelector("input[name=credits]");E&&e.enrol(Number(E.value))&&(m(),d())}return t.addEventListener("click",S),t.addEventListener("submit",I),window.addEventListener("pagehide",m),t.replaceChildren(h,l),d(),()=>{clearTimeout(y),clearInterval(b),i.stop(),m(),t.removeEventListener("click",S),t.removeEventListener("submit",I),window.removeEventListener("pagehide",m)}}const Ud=()=>Di(new os(Math.random),{running:!0,confirmingNew:!1,pace:"slow"}),Jd={name:"fibergochi",apps:{fibergochi:Yd},stills:{fibergochi:Ud}},Te=t=>[...t.replace(/\s/g,"")].map(e=>e==="#"?1:0),yt={A:Te(".###. #...# ##### #...# #...#"),B:Te("####. #...# ####. #...# ####."),C:Te(".#### #.... #.... #.... .####"),D:Te("####. #...# #...# #...# ####."),E:Te("##### #.... ####. #.... #####"),H:Te("#...# #...# ##### #...# #...#"),O:Te(".###. #...# #...# #...# .###."),T:Te("##### ..#.. ..#.. ..#.. ..#.."),X:Te("#...# .#.#. ..#.. .#.#. #...#")};function sn(t){let e=t>>>0;return()=>{e=e+1831565813>>>0;let n=Math.imul(e^e>>>15,1|e);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}const Kd=t=>1/(1+Math.exp(-t));class Vd{weights;constructor(e,n){const a=sn(n);this.weights=e.slice(1).map((s,o)=>Array.from({length:s},()=>Array.from({length:e[o]+1},()=>a()-.5)))}forward(e){const n=[[...e]];for(const a of this.weights){const s=[...n[n.length-1],1];n.push(a.map(o=>Kd(o.reduce((r,i,h)=>r+i*s[h],0))))}return n}answer(e){return this.forward(e).pop()}learn(e,n,a){const s=this.forward(e),o=s[s.length-1];let r=o.map((h,l)=>(h-n[l])*h*(1-h));for(let h=this.weights.length-1;h>=0;h-=1){const l=[...s[h],1],c=this.weights[h],d=s[h].map((u,f)=>{let m=0;for(let g=0;g<c.length;g+=1)m+=c[g][f]*r[g];return m*u*(1-u)});for(let u=0;u<c.length;u+=1)for(let f=0;f<l.length;f+=1)c[u][f]-=a*r[u]*l[f];r=d}let i=0;for(let h=0;h<o.length;h+=1)i+=(o[h]-n[h])**2;return i/2}}const Xd=10,Lo=.5;class Hi{constructor(e,n){this.shapes=e,this.network=new Vd([25,Xd,e.length],n),this.noise=sn(n+1)}shapes;network;noise;rounds=0;error=0;train(e){for(let n=0;n<e;n+=1){let a=0;this.shapes.forEach(({pixels:s},o)=>{const r=this.shapes.map((h,l)=>l===o?1:0),i=Math.floor(this.noise()*s.length);a+=this.network.learn(s,r,Lo),a+=this.network.learn(s.map((h,l)=>l===i?1-h:h),r,Lo)}),this.error=a,this.rounds+=1}}read(e){const n=this.network.answer(e);return this.shapes.map(({name:a},s)=>({letter:a,score:n[s]}))}}const Zd=[{name:"A",pixels:yt.A},{name:"B",pixels:yt.B}];function rs(t=Zd){const e=new Hi(t,1);return e.train(200),e}const Qd=3;function Wi(t,e,n){const a=t.trim();return a===""?"Give it a name first.":[...a].length>Qd?"A name of three characters at most.":n.includes(a)?`“${a}” is already a letter it knows.`:e.some(Boolean)?null:"There is no ink on the grid to remember."}const eu=t=>Array.isArray(t)&&t.length===25&&t.every(e=>e===0||e===1);function tu(t,e=[]){let n;try{n=JSON.parse(t??"[]")}catch{return[]}if(!Array.isArray(n))return[];const a=[];for(const s of n){const{name:o,pixels:r}=s??{};typeof o!="string"||!eu(r)||Wi(o,r,[...e,...a.map(i=>i.name)])||a.push({name:o.trim(),pixels:r})}return a}function qi(t,e){const n=e.map((i,h)=>`<button type="button" class="cell" data-at="${h}" aria-pressed="${i?"true":"false"}" aria-label="cell ${h+1}"></button>`).join(""),a=t.read(e),s=a.reduce((i,h)=>h.score>i.score?h:i),o=a.map(({letter:i,score:h})=>`<tr${i===s.letter?' class="best"':""}><th scope="row">${x(i)}</th><td class="sure"><span class="bar" style="--p:${h.toFixed(3)}"></span>${Math.round(h*100)}%</td></tr>`).join(""),r=t.rounds===0?"It has not been taught anything yet: every answer is a guess.":`It reads <b>${x(s.letter)}</b>, after ${t.rounds} rounds of lessons.`;return`<div class="letters"><div class="grid" role="group" aria-label="the drawing, five cells by five">${n}</div><div class="reading"><p>${r}</p><table class="answers"><tbody>${o}</tbody></table></div></div>`}const No="first-network:own",Po=Object.entries(yt).map(([t,e])=>({name:t,pixels:e}));function nu(t){let e=g();const n=new Set(["A","B",...e.map(({name:k})=>k)]),a=()=>[...Po,...e];let s=rs(f()),o=[...yt.A];const r=w("div",{onclick:k=>{const E=k.target.closest("[data-at]")?.dataset.at;E!==void 0&&(o[Number(E)]=1-o[Number(E)],d())}}),i=w("div",{class:"row"}),h=w("div",{class:"row taught"}),l=w("input",{type:"text",maxlength:3,size:4,"aria-label":"a name for the drawing"}),c=w("p",{class:"error",hidden:!0});function d(){r.innerHTML=qi(s,o)}function u(k){o=k,d()}function f(){return a().filter(k=>n.has(k.name))}function m(){s=rs(f()),d()}function g(){try{return tu(localStorage.getItem(No),Object.keys(yt))}catch{return[]}}function y(){try{localStorage.setItem(No,JSON.stringify(e))}catch{}}function p(){const k=Wi(l.value,o,a().map(O=>O.name));if(c.textContent=k??"",c.hidden=k===null,k)return;const E={name:l.value.trim(),pixels:[...o]};e=[...e,E],n.add(E.name),l.value="",y(),T(),m()}function b(k){e=e.filter(E=>E.name!==k),n.delete(k);for(const E of Po)n.size<2&&n.add(E.name);y(),T(),m()}const v=(k,E)=>w("button",{type:"button",onclick:E},k);function T(){i.replaceChildren("Draw ",...a().map(k=>v(k.name,()=>u([...k.pixels]))),v("one cell wrong",()=>{const k=Math.floor(Math.random()*o.length);u(o.map((E,O)=>O===k?1-E:E))}),v("clear",()=>u(o.map(()=>0)))),h.replaceChildren("Taught: ",...a().map(k=>{const E=w("input",{type:"checkbox",value:k.name,checked:n.has(k.name),onchange:()=>{E.checked?n.add(k.name):n.size>2?n.delete(k.name):E.checked=!0,m()}}),O=e.includes(k)&&w("button",{type:"button",class:"forget","aria-label":`forget ${k.name}`,onclick:()=>b(k.name)},"×");return w("label",{},E,` ${k.name}`,O)}))}const S=w("div",{class:"row"},v("teach 100 more rounds",()=>{s.train(100),d()}),v("forget everything",()=>{s=new Hi(s.shapes,1),d()})),I=w("div",{class:"row own"},"Your own: draw it, name it ",l,v("remember this drawing",()=>p()),c);T(),t.replaceChildren(i,r,h,S,I),d()}const au=()=>qi(rs(),yt.A),su={name:"first-network",apps:{letters:nu},stills:{letters:au}},ou=1.5,ru=.02,iu=.25;class hu{constructor(e,n,a,s){this.credit=a,this.random=s,this.remaining=[...e],this.buyers=n.map(o=>({bidder:o,credit:a,won:[],error:null}))}credit;random;buyers;remaining;sold=[];turns=[];get over(){return this.remaining.length===0}get next(){return this.remaining[0]}get market(){return{lots:this.remaining,credits:Object.fromEntries(this.buyers.map(e=>[e.bidder.name,e.credit])),sales:this.sold}}demands(){const e=this.next;return Object.fromEntries(this.buyers.map(n=>[n.bidder.name,e?this.demandOf(n,e):null]))}sell(){const e=this.remaining.shift();if(!e)throw new Error("the floor is empty");const n=this.buyers.map(o=>this.demandOf(o,e)),a=Object.fromEntries(this.buyers.map((o,r)=>[o.bidder.name,n[r]===null?null:e.value/(1+n[r])])),s=this.buyers.filter(o=>(a[o.bidder.name]??0)>o.credit).map(o=>o.bidder.name);for(let o=e.value*ou;o>=e.value*iu;o-=e.value*ru){const r=(e.value-o)/o,i=this.buyers.filter((l,c)=>l.credit>=o&&r>=(n[c]??1/0));if(i.length===0)continue;const h=i[Math.min(i.length-1,Math.floor(this.random()*i.length))];return h.credit-=o,h.won.push(e),this.record({lot:e,buyer:h.bidder.name,price:o},a,s)}return this.record({lot:e,buyer:null,price:null},a,s)}standings(){return this.buyers.map(({bidder:e,credit:n,won:a,error:s})=>{const o=a.reduce((i,h)=>i+h.value,0),r=this.credit-n;return{name:e.name,credit0:this.credit,credit:n,spent:r,lots:a.length,value:o,profit:o-r,error:s}})}record(e,n,a){return this.sold.push(e),this.turns.push({sale:e,bids:n,short:a}),e}demandOf(e,n){try{const a=e.bidder.demands(n,this.market,e.bidder.name);if(typeof a!="number"||Number.isNaN(a))throw new Error(`demanded ${String(a)}, not a margin`);return e.error=null,a}catch(a){return e.error=a instanceof Error?a.message:String(a),null}}}const Ro=[["sardines",30],["anchovies",40],["squid",90],["hake",120],["sole",180],["prawns",250],["monkfish",300],["tuna",400]];function lu(t,e){return Array.from({length:t},(n,a)=>{const[s,o]=Ro[Math.floor(e()*Ro.length)];return{id:a+1,kind:s,value:Math.round(o*(.7+.6*e()))}})}const cu=60;function _i(t,e,n){const a=sn(t),s=lu(cu,a),o=s.reduce((r,i)=>r+i.value,0);return new hu(s,e,n*o/Math.max(1,e.length),a)}function Fo(t,e="You"){const n=new Function("lot","market","me",t);return{name:e,demands:n}}const Bo=`// Return the margin you demand: (value - price) / price.
// You are told the lots still to sell, everyone's credit, and every sale so far.
// This is Vicente. Change the 0.9 first.
const fish = market.lots.reduce((sum, lot) => sum + lot.value, 0);
const money = 0.9 * Object.values(market.credits).reduce((sum, c) => sum + c, 0);
if (money <= 0) return 0.001;
return Math.max(0.001, (fish - money) / money);
`,du=12,ve=t=>Math.round(t).toString(),Do=t=>t===null?"—":t===1/0?"∞":`${Math.round(t*100)}%`;function zi(t){const e=t.next,n=t.demands(),a=[...t.standings()].sort((c,d)=>d.profit-c.profit),s=Math.max(1,...a.map(c=>Math.abs(c.profit))),o=e?`<p class="lot">Next on the floor: <b>a box of ${x(e.kind)}</b>, which resells for ${ve(e.value)}. The price starts at ${ve(e.value*1.5)} and falls.</p>`:'<p class="lot">The floor is empty.</p>',i=`<table class="board"><thead><tr><th>buyer</th><th>asks</th><th>holds</th><th>spent</th><th>worth</th><th>credit</th><th>profit</th></tr></thead><tbody>${a.map(({name:c,lots:d,spent:u,value:f,profit:m,credit:g,error:y})=>{const p=y?`<td class="asks error" colspan="5">${x(y)}</td>`:`<td class="asks">${Do(n[c]??null)}</td>`;return`<tr${m<0?' class="loss"':""}><th scope="row">${x(c)}</th>${p}`+(y?"":`<td>${d} lot${d===1?"":"s"}</td><td>${ve(u)}</td><td>${ve(f)}</td><td>${ve(g)}</td>`)+`<td class="profit"><span class="bar" style="--p:${(Math.abs(m)/s).toFixed(3)}"></span>${ve(m)}</td></tr>`}).join("")}</tbody></table>`,h=t.turns,l=h.length?`<ol class="sales" reversed start="${h.length}">${[...h].reverse().slice(0,du).map(({sale:{lot:c,buyer:d,price:u},bids:f,short:m})=>{const g=u===null||d===null?"<i>withdrawn</i>":`sold at <b>${ve(u)}</b>, a margin of ${Do((c.value-u)/u)}`,y=Object.entries(f).map(([p,b])=>{if(b===null)return`${x(p)} —`;const v=p===d?`<b>${x(p)}</b>`:x(p);return m.includes(p)?`<s title="more than it had">${v} at ${ve(b)}</s>`:`${v} at ${ve(b)}`}).join(", ");return`<li><span class="went">${x(c.kind)}, ${ve(c.value)}: ${g}.</span> <span class="ready">Ready to shout: ${y}.</span></li>`}).join("")}</ol>`:"";return`<div class="fish-market">${o}${i}${l}</div>`}function Ho(t,e){return{name:t,demands:()=>e}}const Wo=.001;function Os(t,e){const n=t.lots.reduce((s,o)=>s+o.value,0),a=e*Object.values(t.credits).reduce((s,o)=>s+o,0);return a<=0?Wo:Math.max(Wo,(n-a)/a)}const uu=.9,mu=3,vn=10;function fu(t="Planner"){return{name:t,demands(e,n,a){const s=Os(n,uu),o=s*(mu-1)/vn,r=f=>s+f*o,i=f=>Math.max(0,Math.min(vn-1,Math.floor((f-s)/o))),h=new Array(vn).fill(0);for(const f of n.sales){if(f.price===null)continue;const m=i((f.lot.value-f.price)/f.price);h[m]=h[m]+f.lot.value}const l=h.reduce((f,m)=>f+m,0);if(l===0)return s;const c=n.lots.reduce((f,m)=>f+m.value,0),d=n.credits[a]??0;let u=0;for(let f=vn-1;f>=0;f-=1)if(u+=c*h[f]/l/(1+r(f)),u>=d)return r(f);return s}}}function pu(t=.9,e="Vicente"){return{name:e,demands:(n,a)=>Os(a,t)}}const gu=.98,wu=1.05,yu=.95,bu=t=>(t.lot.value-t.price)/t.price;function qo(t,e){const n=e.filter(s=>s.buyer===t),a=n.reduce((s,o)=>s+o.price,0);return a>0?(n.reduce((s,o)=>s+o.lot.value,0)-a)/a:0}function vu(t="Wanda"){return{name:t,demands(e,n,a){const s=Os(n,gu),o=qo(a,n.sales);let r=1;for(const i of n.sales)i.buyer!==null&&(i.buyer===a?r*=wu:qo(i.buyer,n.sales)>=o&&bu(i)>=s&&(r*=yu));return s*r}}}function Gi(t=.9){return[Ho("Patient",1),Ho("Hasty",.05),pu(t),vu(),fu()]}const ku=250,xu=1,_o="fish-market:own",kn="fish-market:seated";function $u(t){let e=xu,n=null,a,s=null;const o=w("div"),r=w("p",{class:"error",hidden:!0}),i=w("output",{},"90%"),h=w("input",{type:"range",min:.5,max:1,step:.02,value:.9,oninput:()=>m()}),l=w("output",{},"50%"),c=w("input",{type:"range",min:.3,max:1.2,step:.05,value:.5,oninput:()=>m()}),d=w("textarea",{class:"agent",spellcheck:!1,rows:9,oninput:()=>b()}),u=w("button",{type:"button",onclick:()=>s?p():y()},"run");function f(){o.innerHTML=zi(a)}function m(){p(),i.textContent=`${Math.round(Number(h.value)*100)}%`,l.textContent=`${Math.round(Number(c.value)*100)}%`,a=_i(e,[...Gi(Number(h.value)),...n?[n]:[]],Number(c.value)),f()}function g(){return a.over?!1:(a.sell(),f(),!0)}function y(){u.textContent="stop",s=setInterval(()=>{g()||p()},ku)}function p(){s&&clearInterval(s),s=null,u.textContent="run"}function b(){try{localStorage.setItem(_o,d.value)}catch{}}function v(){try{n=Fo(d.value),r.hidden=!0,localStorage.setItem(kn,"yes")}catch(O){n=null,r.textContent=O instanceof Error?O.message:String(O),r.hidden=!1,localStorage.removeItem(kn)}m()}function T(){n=null,localStorage.removeItem(kn),m()}const S=w("div",{class:"dials"},w("label",{},"Vicente believes the others will spend: ",i,h),w("label",{},"Money in the room, as a share of the fish: ",l,c)),I=w("div",{class:"row"},w("button",{type:"button",onclick:()=>{g()}},"next lot"),u,w("button",{type:"button",onclick:()=>{for(p();g(););}},"whole morning"),w("button",{type:"button",onclick:()=>{e=Math.floor(Math.random()*1e9),m()}},"new morning")),k=w("div",{class:"row"},w("button",{type:"button",onclick:()=>v()},"seat it"),w("button",{type:"button",onclick:()=>T()},"stand it down")),E=w("details",{class:"own"},w("summary",{},"Seat your own agent"),d,k,r);try{d.value=localStorage.getItem(_o)??Bo,localStorage.getItem(kn)&&(n=Fo(d.value))}catch{d.value=Bo}return t.replaceChildren(S,I,o,E),m(),p}const Tu=()=>zi(_i(1,Gi(),.5)),Su={name:"fish-market",apps:{"fish-market":$u},stills:{"fish-market":Tu}};function Mu(t,e){const n=[];for(let a=t.length-1;a>=0;a-=1)n.push(t.slice(0,a));for(let a=1;a<=e.length;a+=1)n.push(e.slice(0,a));return n}const Au=3800,Iu=6500,Eu=26,ju=46,Cu=420;function Ou(t){return[...t.childNodes].map(e=>e.nodeName==="BR"?`
`:e.textContent??"").join("")}function Lu(t){const e=document.querySelector("main h1");if(!e||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return()=>{};const n={text:Ou(e)};e.setAttribute("aria-label",n.text),e.classList.add("typing");const a=document.createElement("span");a.className="caret idle",a.setAttribute("aria-hidden","true");const s=(c,d)=>{const u=c.split(`
`).flatMap((f,m)=>m===0?[f]:[document.createElement("br"),f]);if(d){const f=document.createElement("a");f.href=d,f.append(...u,a),e.replaceChildren(f)}else e.replaceChildren(...u,a)};s(n.text);let o=n,r=[],i=performance.now()+Au,h=0;const l=c=>{if(h=requestAnimationFrame(l),c<i)return;if(r.length===0){const u=t(o,n);r=Mu(o.text,u.text),o=u,a.classList.remove("idle")}const d=r.shift()??o.text;s(d,r.length===0?o.href:void 0),r.length===0?(a.classList.add("idle"),i=c+Iu):d===""?i=c+Cu:i=c+(d.length<(r[0]?.length??0)?ju:Eu)};return h=requestAnimationFrame(l),()=>{cancelAnimationFrame(h),s(n.text),a.remove(),e.classList.remove("typing"),e.removeAttribute("aria-label")}}function Nu(t,e){const n=[...t];for(let a=n.length-1;a>0;a-=1){const s=Math.min(a,Math.floor(e()*(a+1)));[n[a],n[s]]=[n[s],n[a]]}return n}function Pu(t,e){let n=[];return a=>(n.length===0&&(n=Nu(t,e),n.length>1&&n[0]===a&&n.push(n.shift())),n.shift()??a)}const Ru=[{text:`More than
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
as this page opened.`,href:"/projects/worlds/"}];let Ta=null;const Fu={name:"headline",arrive:t=>{if(Ta?.(),Ta=null,t.route!=="/")return;let e=null;Ta=Lu((n,a)=>(e??=Pu([a,...Ru],Math.random),e(n)))}};function zo(t,e="You"){const n=new Function("fish","weeks","bots","me","rounds",t);return{name:e,orders:n}}const Go=`// Return your orders for the round: one number a week, 0 to rest.
// You know the fish at the start, the weeks, who is on the lagoon (bots),
// your name (me), and every round before (rounds), but not what the others
// will do this time.
// This one rests, lets the lagoon grow, and takes one share the last week.
let grown = fish;
for (let week = 1; week < weeks; week++) grown += Math.floor(grown / 2);
const orders = new Array(weeks).fill(0);
orders[weeks - 1] = Math.floor(grown / bots.length);
return orders;
`;function Yi(t){const e=t.rounds[t.rounds.length-1],n=t.scores(),a=Math.max(1,...Object.values(n)),s=[...t.names].sort((u,f)=>n[f]-n[u]).map(u=>{const f=t.errors[u];return`<tr><th scope="row">${x(u)}</th>`+(f?`<td class="error" colspan="2">${x(f)}</td>`:`<td>${e?.totals[u]??0}</td><td class="profit"><span class="bar" style="--p:${(n[u]/a).toFixed(3)}"></span>${n[u]}</td>`)+"</tr>"}).join(""),o=t.rounds.length,r=`<table class="board"><caption>${o===0?"The season has not started":`After ${o} round${o===1?"":"s"}`}</caption><thead><tr><th>bot</th><th>last round</th><th>season</th></tr></thead><tbody>${s}</tbody></table>`;if(!e)return`<div class="lagoon"><p class="lot">The lagoon has <b>${t.fish} fish</b>, and ${t.weeks} weeks ahead. Nobody has been out yet.</p>${r}</div>`;const i=e.weeks.map((u,f)=>`<th>${f+1}</th>`).join(""),h=Math.max(1,...e.weeks.map(u=>u.fish)),l=e.weeks.map(u=>`<td><span class="fish" style="--p:${(u.fish/h).toFixed(3)}"></span>${u.fish}</td>`).join(""),c=t.names.map(u=>{const f=e.weeks.map((m,g)=>{const y=e.orders[u]?.[g]??0,p=m.caught[u]??0;return`<td${y>p?' class="short"':""} title="asked for ${y}">${p}</td>`}).join("");return`<tr><th scope="row">${x(u)}</th>${f}<td class="total">${e.totals[u]}</td></tr>`}).join("");return`<div class="lagoon">${`<table class="weeks"><caption>Round ${o}, week by week: what each bot caught, and what was left in the lagoon</caption><thead><tr><th>week</th>${i}<th>total</th></tr></thead><tbody>${c}<tr class="water"><th scope="row">in the lagoon</th>${l}<td></td></tr></tbody></table>`}${r}</div>`}function Ui(t,e,n){const a=[];let s=t;for(let o=0;o<e;o+=1){const r=Math.max(0,Math.min(s,Math.floor(n(s,o))));a.push(r),s-=r,s+=Math.floor(s/2)}return a}const xn={rest:{name:"Rest",orders:(t,e)=>new Array(e).fill(0)},one:{name:"One",orders:(t,e)=>new Array(e).fill(1)},power:{name:"Power",orders:(t,e)=>Array.from({length:e},(n,a)=>a*a)},percent:t=>({name:`${Math.round(t*100)}%`,orders:(e,n)=>Ui(e,n,a=>a*t)})},Yo=(t,e)=>Math.ceil(t/e);function Uo(t="Tit for tat"){const e=new Set;return{name:t,orders(n,a,s,o,r){for(const h of r)for(const l of Object.keys(h.orders))l!==o&&(h.orders[l]?.[0]??0)>=Yo(h.start,s.length)&&e.add(l);if(s.some(h=>h!==o&&e.has(h)))return Ui(n,a,h=>Yo(h,s.length));let i=n;for(let h=1;h<a;h+=1)i+=Math.floor(i/2);return[...new Array(a-1).fill(0),Math.floor(i/s.length)]}}}function Ji(){return[{fisher:xn.one,seated:!0},{fisher:xn.power,seated:!0},{fisher:xn.percent(.1),seated:!0},{fisher:xn.percent(.4),seated:!1},{fisher:Uo("Tit for tat"),seated:!0},{fisher:Uo("Tat for tit"),seated:!0}]}function Bu(t,e,n){const a=Object.keys(n),s=[],o=Object.fromEntries(a.map(i=>[i,0]));let r=t;for(let i=0;i<e;i+=1){const h=Object.fromEntries(a.map(c=>[c,0])),l=a.map(c=>({name:c,order:Math.max(0,Math.floor(n[c]?.[i]??0))})).filter(({order:c})=>c>0);for(const c of[...new Set(l.map(({order:d})=>d))].sort((d,u)=>d-u)){const d=l.filter(f=>f.order===c),u=Math.min(Math.floor(r/d.length),c);for(const{name:f}of d)h[f]=u,o[f]=o[f]+u;r-=u*d.length}r+=Math.floor(r/2),s.push({fish:r,caught:h})}return{start:t,orders:n,weeks:s,totals:o}}class Ki{constructor(e,n,a){this.fish=e,this.weeks=n,this.fishers=a}fish;weeks;fishers;rounds=[];errors={};get names(){return this.fishers.map(e=>e.name)}play(){const e=Object.fromEntries(this.fishers.map(a=>[a.name,this.ordersOf(a)])),n=Bu(this.fish,this.weeks,e);return this.rounds.push(n),n}scores(){return Object.fromEntries(this.names.map(e=>[e,this.rounds.reduce((n,a)=>n+(a.totals[e]??0),0)]))}ordersOf(e){try{const n=e.orders(this.fish,this.weeks,this.names,e.name,this.rounds);if(!Array.isArray(n)||n.some(a=>typeof a!="number"||Number.isNaN(a)))throw new Error("orders must be an array of numbers, one a week");return delete this.errors[e.name],Array.from({length:this.weeks},(a,s)=>n[s]??0)}catch(n){return this.errors[e.name]=n instanceof Error?n.message:String(n),new Array(this.weeks).fill(0)}}}const Jo="lagoon:own",$n="lagoon:seated";function Du(t){let e=null,n;const a=w("div"),s=w("p",{class:"error",hidden:!0}),o=w("output",{},"100"),r=w("input",{type:"range",min:5,max:200,step:1,value:100,oninput:()=>u()}),i=w("output",{},"10"),h=w("input",{type:"range",min:4,max:14,step:1,value:10,oninput:()=>u()}),l=w("textarea",{class:"agent",spellcheck:!1,rows:11,oninput:()=>m()}),c=Ji().map(({fisher:I,seated:k})=>({fisher:I,box:w("input",{type:"checkbox",checked:k,onchange:()=>u()})}));function d(){a.innerHTML=Yi(n)}function u(){o.textContent=r.value,i.textContent=h.value;const I=c.filter(({box:k})=>k.checked).map(({fisher:k})=>k);n=new Ki(Number(r.value),Number(h.value),[...I,...e?[e]:[]]),d()}function f(I){for(let k=0;k<I;k+=1)n.play();d()}function m(){try{localStorage.setItem(Jo,l.value)}catch{}}function g(){try{e=zo(l.value),s.hidden=!0,localStorage.setItem($n,"yes")}catch(I){e=null,s.textContent=I instanceof Error?I.message:String(I),s.hidden=!1,localStorage.removeItem($n)}u()}function y(){e=null,localStorage.removeItem($n),u()}const p=w("div",{class:"dials"},w("label",{},"Fish in the lagoon at the start: ",o,r),w("label",{},"Weeks in a round: ",i,h)),b=w("div",{class:"row bench"},"On the lagoon: ",...c.map(({fisher:I,box:k})=>w("label",{},k,` ${I.name}`))),v=w("div",{class:"row"},w("button",{type:"button",onclick:()=>f(1)},"play a round"),w("button",{type:"button",onclick:()=>f(5)},"play five"),w("button",{type:"button",onclick:()=>u()},"new season")),T=w("div",{class:"row"},w("button",{type:"button",onclick:()=>g()},"seat it"),w("button",{type:"button",onclick:()=>y()},"stand it down")),S=w("details",{class:"own"},w("summary",{},"Seat your own bot"),l,T,s);try{l.value=localStorage.getItem(Jo)??Go,localStorage.getItem($n)&&(e=zo(l.value))}catch{l.value=Go}t.replaceChildren(p,b,v,a,S),u()}const Hu=()=>Yi(new Ki(100,10,Ji().filter(({seated:t})=>t).map(({fisher:t})=>t))),Wu={name:"lagoon",apps:{lagoon:Du},stills:{lagoon:Hu}},fe={N:1,S:2,E:4,W:8};function Vi(t){const{width:e,height:n,cells:a,links:s}=t,o=e*n-1,r=new Map([[0,-1]]),i=[0];for(let l=0;l<i.length;l+=1){const c=i[l];if(c===o)break;const d=c%e,u=Math.floor(c/e),f=a[c],m=[];f&fe.E&&d+1<e&&m.push(c+1),f&fe.W&&d>0&&m.push(c-1),f&fe.N&&u+1<n&&m.push(c+e),f&fe.S&&u>0&&m.push(c-e);const g=s.get(c);g!==void 0&&s.get(g)===c&&m.push(g);for(const y of m)r.has(y)||(r.set(y,c),i.push(y))}if(!r.has(o))return null;const h=[];for(let l=o;l!==-1;l=r.get(l))h.unshift({x:l%e,y:Math.floor(l/e)});return h}function Xi(t){const e=Vi(t);if(!e)return"There is no way out: the only one ran through a sphere that leads nowhere.";const n=e.slice(1).filter((s,o)=>Math.abs(s.x-e[o].x)+Math.abs(s.y-e[o].y)>1).length,a=n===0?"touches no sphere":`jumps through ${n===1?"one sphere":`${n} spheres`}`;return`The way out is ${e.length} rooms long, and ${a}.`}const Ko=0x5deece66dn,qu=0xbn,Vo=(1n<<48n)-1n;class _u{seed;constructor(e){this.seed=(BigInt(e)^Ko)&Vo}nextInt(e){if((e&-e)===e)return Number(BigInt(e)*BigInt(this.next(31))>>31n);for(;;){const n=this.next(31),a=n%e;if((n-a+(e-1)|0)>=0)return a}}next(e){return this.seed=this.seed*Ko+qu&Vo,Number(BigInt.asIntN(32,this.seed>>BigInt(48-e)))}}const Xo=16,zu=[["N","E","W","S"],["W","S","E","N"],["S","E","W","N"]],Gu={N:[0,1,"S"],S:[0,-1,"N"],E:[1,0,"W"],W:[-1,0,"E"]};function Zi(t,e,n,{spheres:a=!0}={}){const s=new _u(n),o=new Array(t*e).fill(0),r=new Map,i=[],h=(d,u)=>d+u*t;function l(d,u){i.push({x:d,y:u}),a&&s.nextInt(10)<1&&c(d,u);for(const f of zu[s.nextInt(3)]){const[m,g,y]=Gu[f],p=d+m,b=u+g;p<0||b<0||p>=t||b>=e||o[h(p,b)]!==0||(o[h(d,u)]|=fe[f],o[h(p,b)]=fe[y],l(p,b),i.push({x:d,y:u}))}}function c(d,u){const f=s.nextInt(t),m=s.nextInt(e);o[h(f,m)]===0&&(o[h(d,u)]|=Xo,o[h(f,m)]=Xo,r.set(h(d,u),h(f,m)),r.set(h(f,m),h(d,u)),l(f,m),i.push({x:d,y:u}))}return l(0,0),o[h(0,0)]|=fe.S,o[h(t-1,e-1)]|=fe.N,{width:t,height:e,cells:o,links:r,path:i}}const te=10,Tn=4;function Qi(t,{trail:e,way:n}={}){const{width:a,height:s,cells:o,links:r}=t,i=p=>Tn+p*te,h=p=>Tn+(s-1-p)*te,l=({x:p,y:b})=>[i(p)+te/2,h(b)+te/2],c=[];for(let p=0;p<s;p+=1)for(let b=0;b<a;b+=1){const v=o[b+p*a];v&fe.S||c.push(`M${i(b)} ${h(p)+te}h${te}`),v&fe.W||c.push(`M${i(b)} ${h(p)}v${te}`),p===s-1&&!(v&fe.N)&&c.push(`M${i(b)} ${h(p)}h${te}`),b===a-1&&!(v&fe.E)&&c.push(`M${i(b)+te} ${h(p)}v${te}`)}const d=new Map;let u=0;const f=[...r].map(([p,b])=>{const v=r.get(b)===p;if(!v)u+=1;else if(!d.has(p)){const I=String.fromCharCode(97+d.size/2%26);d.set(p,I).set(b,I)}const[T,S]=l({x:p%a,y:Math.floor(p/a)});return`<circle class="sphere${v?"":" dead"}" cx="${T}" cy="${S}" r="${te*.3}"/><text class="letter" x="${T}" y="${S}">${v?d.get(p):"×"}</text>`}),m=p=>p.map((b,v)=>{const T=p[v-1];return`${T&&Math.abs(b.x-T.x)+Math.abs(b.y-T.y)===1?"L":"M"}${l(b).join(" ")}`}).join(""),g=[];if(n&&g.push(`<path class="way" d="${m(n)}"/>`),e!==void 0&&e>0){const p=t.path.slice(0,e),[b,v]=l(p[p.length-1]);g.push(`<path class="trail" d="${m(p)}"/>`,`<circle class="walker" cx="${b}" cy="${v}" r="${te*.22}"/>`)}return`<svg class="maze" role="img" aria-label="${`A ${a} by ${s} maze with ${r.size} sphere${r.size===1?"":"s"}`+(u?`, ${u} leading nowhere`:"")+"."}" viewBox="0 0 ${a*te+2*Tn} ${s*te+2*Tn}">`+g.join("")+`<path class="walls" d="${c.join("")}"/>`+f.join("")+"</svg>"}const ft={size:7,seed:543},Yu=100;function Uu(t){let e,n=0,a=!1,s=null;const o=w("div",{class:"figure"}),r=w("p",{class:"status"}),i=w("output",{},String(ft.size)),h=w("input",{type:"range",min:5,max:30,step:1,value:ft.size,oninput:()=>m()}),l=w("input",{type:"number",value:ft.seed,onchange:()=>m()}),c=w("input",{type:"checkbox",checked:!0,onchange:()=>m()}),d=w("button",{type:"button",onclick:()=>s?y():g()},"walk the camera"),u=w("button",{type:"button",onclick:()=>p()},"show the way out");function f(){o.innerHTML=Qi(e,{trail:n,way:a?Vi(e):null})}function m(){y(),n=0,i.textContent=h.value,e=Zi(Number(h.value),Number(h.value),Number(l.value),{spheres:c.checked}),r.textContent=Xi(e),f()}function g(){n>=e.path.length&&(n=0),d.textContent="stop",s=setInterval(()=>{n+=1,f(),n>=e.path.length&&y()},Yu)}function y(){s&&clearInterval(s),s=null,d.textContent="walk the camera"}function p(){a=!a,u.textContent=a?"hide the way out":"show the way out",f()}const b=w("button",{type:"button",onclick:()=>(l.value=String(Math.floor(Math.random()*1e6)),m())},"another"),v=w("div",{class:"dials"},w("label",{},"Rooms a side: ",i,h),w("label",{},"Seed: ",l,b),w("label",{},c," spheres, as on 20 May (unticked: 13 May)"));return t.replaceChildren(w("div",{class:"maze-app"},o,r,w("div",{class:"row"},d,u),v)),m(),y}const Ju=()=>{const t=Zi(ft.size,ft.size,ft.seed);return`<div class="maze-app"><div class="figure">${Qi(t)}</div><p class="status">${Xi(t)}</p></div>`},Ku={name:"maze",apps:{maze:Uu},stills:{maze:Ju}};function Vu(t,e){let n=Array.from({length:e.length+1},(a,s)=>s);for(let a=1;a<=t.length;a+=1){const s=[a];for(let o=1;o<=e.length;o+=1){const r=(n[o-1]??0)+(t[a-1]===e[o-1]?0:1);s[o]=Math.min(r,(n[o]??0)+1,(s[o-1]??0)+1)}n=s}return n[e.length]??0}function Xu(t,e){if(e.includes(t))return t;let n=null,a=1/0;for(const s of e){const o=Vu(t,s);o<a&&([n,a]=[s,o])}return n}const Zu=/[\p{L}\p{M}\p{N}']+|[.,!?;:]/gu,Qu=/\]\([^)]*\)|^---[\s\S]*?\n---|[#*_`>\[\]|]|::[a-z-]+/gm;function Kn(t){return t.normalize("NFKC").replace(Qu," ").toLowerCase().match(Zu)??[]}const Sn=" ";class is{constructor(e,n){this.memory=n;const a=Kn(e),s=new Map;for(const o of a)s.set(o,(s.get(o)??0)+1);this.vocabulary=[...s.keys()],this.commonest=[...s].reduce((o,r)=>o&&o[1]>=r[1]?o:r,null)?.[0]??null;for(let o=1;o<a.length;o+=1)for(let r=1;r<=n&&r<=o;r+=1){const i=a.slice(o-r,o).join(Sn),h=this.followers.get(i)??new Map;h.set(a[o]??"",(h.get(a[o]??"")??0)+1),this.followers.set(i,h)}}memory;vocabulary;commonest;followers=new Map;after(e){for(let n=Math.min(this.memory,e.length);n>=1;n-=1){const a=e.slice(-n),s=this.followers.get(a.join(Sn));if(s)return{context:a,candidates:Zo(s)}}return{context:[],candidates:[]}}transitions(){return[...this.followers].filter(([e])=>e.split(Sn).length===this.memory).flatMap(([e,n])=>Zo(n).map(a=>({context:e.split(Sn),...a}))).sort((e,n)=>n.probability-e.probability||n.count-e.count)}}function Zo(t){const e=[...t.values()].reduce((n,a)=>n+a,0);return[...t].map(([n,a])=>({word:n,count:a,probability:a/e})).sort((n,a)=>a.count-n.count)}function em(t,e){let n=e();for(const a of t)if(n-=a.probability,n<=0)return a.word;return t[t.length-1]?.word??null}function Qo(t){return t.reduce((e,n)=>e===""||/^[.,!?;:]$/.test(n)?e+n:`${e} ${n}`,"")}function eh(t,e){if(e<=0)return t.map((s,o)=>({...s,probability:o===0?1:0}));const n=t.map(s=>s.probability**(1/e)),a=n.reduce((s,o)=>s+o,0);return t.map((s,o)=>({...s,probability:(n[o]??0)/a}))}const Sa=40,er=8,Ma=t=>`${Math.round(t*100)}%`;function th(t,e,n){const{context:a,candidates:s}=t.after(e),o=s.slice(0,er),r=eh(s,n).slice(0,er),i=s.reduce((g,{count:y})=>g+y,0),h=e.slice(0,e.length-a.length),l=`<p class="written">${x(Qo(h))}${h.length&&a.length?" ":""}${a.length?`<mark>${x(Qo(a))}</mark>`:""}<span class="caret"></span></p>`,c=o.length?`<ol class="offered">${o.map(({word:g,count:y,probability:p},b)=>{const v=r[b]?.probability??0;return`<li><button type="button" data-word="${x(g)}" title="seen ${y} of ${i} times: ${Ma(p)} as learnt"><span class="word">${x(g)}</span><span class="chance" style="--p:${v.toFixed(3)}"></span><span class="figure">${Ma(v)}</span></button></li>`}).join("")}</ol>`:`<p class="offered">It never saw anything follow “${x(e[e.length-1]??"")}”. This is where it stops.</p>`,d=g=>a.length===t.memory&&g.context.join(" ")===a.join(" "),u=t.transitions(),f=[...u.filter(d),...u.filter(g=>!d(g))].slice(0,Sa).map(g=>`<tr${d(g)?' class="now"':""}><td>${x(g.context.join(" "))}</td><td>${x(g.word)}</td><td>${g.count}</td><td>${Ma(g.probability)}</td></tr>`).join(""),m=`<table class="learnt"><caption>What it learnt: ${u.length} transitions between ${t.vocabulary.length} words${u.length>Sa?`, the first ${Sa} shown`:""}</caption><thead><tr><th>after</th><th>comes</th><th>seen</th><th>chance</th></tr></thead><tbody>${f}</tbody></table>`;return`<div class="next-word">${l}<h4>What may come next</h4>${c}${m}</div>`}const Dn="The cat is happy. The dog is glad. The cat sleeps. The dog plays. The cat eats. The dog runs. The car is fast. The car goes far.",tm=350;function nm(t,{site:e}){const n={small:()=>Dn,site:()=>e.pages.map(k=>k.body).join(`

`),own:()=>c.value};let a=new is(Dn,1),s=Kn("the"),o=null;const r=w("div"),i=(k,E)=>w("option",{value:k},E),h=w("select",{onchange:()=>p()},i("small","eight short sentences"),i("site","this website"),i("own","your own text")),l=w("select",{onchange:()=>p()},i(1,"one word back"),i(2,"two words back"),i(3,"three words back")),c=w("textarea",{rows:5,hidden:!0,placeholder:"Paste any text here. The longer, the better it pretends.",oninput:()=>p()}),d=w("output",{},"1"),u=w("input",{type:"range",min:0,max:2,step:.1,value:1,oninput:()=>g()}),f=w("input",{type:"text",value:"the",onchange:()=>y()}),m=w("button",{type:"button",onclick:()=>o?T():v()},"write");function g(){d.textContent=u.value,r.innerHTML=th(a,s,Number(u.value))}function y(){T();const k=Kn(f.value).flatMap(E=>Xu(E,a.vocabulary)??[]);s=k.length?k:a.commonest?[a.commonest]:[],g()}function p(){c.hidden=h.value!=="own",a=new is(n[h.value]?.()??Dn,Number(l.value)),y()}function b(){const k=em(eh(a.after(s).candidates,Number(u.value)),Math.random);return k===null?!1:(s=[...s,k],g(),!0)}function v(){m.textContent="stop",o=setInterval(()=>{b()||T()},tm)}function T(){o&&clearInterval(o),o=null,m.textContent="write"}r.addEventListener("click",k=>{const E=k.target?.closest("[data-word]")?.getAttribute("data-word");E&&(s=[...s,E],g())});const S=w("div",{class:"dials"},w("label",{},"It has read",h),w("label",{},"It looks",l),w("label",{},"Temperature: ",d,u),w("label",{},"Start from",f)),I=w("div",{class:"row"},w("button",{type:"button",onclick:()=>{b()}},"next word"),m,w("button",{type:"button",onclick:()=>y()},"start over"));return t.replaceChildren(S,c,I,r),g(),T}const am=()=>th(new is(Dn,1),Kn("the"),1),sm={name:"next-word",apps:{"next-word":nm},stills:{"next-word":am}},Aa={"string-cache-map":"a WeakMap replacement for string keys, with a bounded cache behind it","async-barrier":"a helper that makes async/await tests say what they wait for","spy-middleware":"a Redux middleware for spying on actions in tests","grunt-frontmatter":"a Grunt task: many files with YAML front matter into one JSON","object-canonical-keys":"always the same array of keys for the same keys, so comparisons stay cheap","async-deferrer":"one function that returns a promise, or resolves it"},tr=160,Ia=28,Hn=t=>t.toLocaleString("en-US");function Ea(t,e){const n=Math.max(1,...t.map(e)),a=tr/t.length,s=t.map((o,r)=>{const i=e(o)/n*(Ia-2);return`<rect x="${(r*a+1).toFixed(1)}" y="${(Ia-i).toFixed(1)}" width="${(a-2).toFixed(1)}" height="${i.toFixed(1)}"><title>${o}: ${Hn(e(o))}</title></rect>`}).join("");return`<svg class="spark" viewBox="0 0 ${tr} ${Ia}" role="img" aria-label="Downloads a year, ${t[0]} to ${t[t.length-1]}">${s}</svg>`}function nh(t){const e=Object.keys(t.years).sort(),n=c=>d=>t.years[d]?.[c]??0,a=c=>e.reduce((d,u)=>d+c(u),0),s=Object.keys(Aa).sort((c,d)=>a(n(d))-a(n(c))),o=[...new Set(e.flatMap(c=>Object.keys(t.years[c]??{})))].filter(c=>!(c in Aa)),r=c=>o.reduce((d,u)=>d+n(u)(c),0),i=c=>Object.values(t.years[c]??{}).reduce((d,u)=>d+u,0),h=s.filter(c=>a(n(c))>0).map(c=>`<tr><th scope="row"><a href="https://www.npmjs.com/package/${c}"><code>${c}</code></a><span>${Aa[c]}</span></th><td>${Ea(e,n(c))}</td><td>${Hn(a(n(c)))}</td></tr>`).join(""),l=o.length?`<tr><th scope="row">the other ${o.length}<span>mostly AngularJS and Redux helpers written for one project each</span></th><td>${Ea(e,r)}</td><td>${Hn(a(r))}</td></tr>`:"";return`<figure class="packages"><table class="packages"><thead><tr><th>package</th><th>${e[0]} to ${e[e.length-1]}, a bar a year</th><th>downloads</th></tr></thead><tbody>${h}${l}</tbody><tfoot><tr><th scope="row">all of them</th><td>${Ea(e,i)}</td><td>${Hn(a(i))}</td></tr></tfoot></table></figure>`}function om(t){if(t.querySelector("figure"))return;const e=Is(t,"/data/npm/index.json");fetch("/data/npm/downloads.json").then(n=>n.json()).then(n=>{t.innerHTML=nh(n),t.append(e)}).catch(()=>{t.textContent="The download counts did not arrive. The rest of the page does not depend on them."})}const ja=["string-cache-map","async-barrier","spy-middleware","grunt-frontmatter","object-canonical-keys","gherkin-genie","async-deferrer","egg-hatchery","angular-tags","class-strict","micro-egg-hatchery","node-dio","ducks-middleware","drpx-updateable","generator-drpx","grunt-ngtags","teal-redux-egg","ducks-reducer","drpx-storage-mocks","strict-classes","ngtags","redux-egg","esmoquin","drpx-storage","dio-provider","drpx-components","grunt-angular-tags","drpx-bind-angular","drpx-toggle","drpx-id","drpx-seo","drpx-otherwisehome","drpx-class-route","drpx-transcludeto"],Ca="downloads.json",rm={name:"npm",directory:"public/data/npm",firstYear:2015,files:[Ca],about:{measures:"downloads a year of the npm packages published as drpicox",attribution:"npm, Inc. Download counts of the public registry.",dataset:"https://github.com/npm/registry/blob/main/docs/download-counts.md",packages:ja},requestsFor(t){return[`https://api.npmjs.org/downloads/point/${t}-01-01:${t}-12-31/${ja.join(",")}`]},withYear(t,e,n){const a=n[0],s=Object.entries(typeof a=="object"&&a!==null?a:{}).flatMap(([o,r])=>{const i=r?.downloads;return ja.includes(o)&&typeof i=="number"&&i>0?[[o,i]]:[]});if(s.length===0)throw new Error("the registry did not answer with downloads");return{[Ca]:{years:{...t[Ca]?.years,[e]:Object.fromEntries(s)}}}}},im=t=>nh(JSON.parse(t("/data/npm/downloads.json")))+Qn(JSON.parse(t("/data/npm/index.json"))),hm={name:"packages",apps:{packages:om},stills:{packages:im},sources:[rm]},lm={name:"portfolio",flags:[{name:"portfolio",description:"the lists with pictures as cards, the width of a program",trial:.5}]},cm=/^\s*\* (.*)$/,dm=/^#{1,6} /;function um(t){let e="";const n=[],a={s:0,n:0},s=i=>e+=e===""?i.toLowerCase():i[0].toUpperCase()+i.slice(1).toLowerCase(),o=(i,h)=>{a[h]+=1;const l=/shouldBe/i.test(e)&&!n.some(c=>c.name==="expected");n.push({value:i,name:l?"expected":`${h}${a[h]}`})},r=t.matchAll(/([A-Za-z]+)|("[^"]+")|(\d+)/g);for(const[,i,h,l]of r)i?s(i):h?(o(h,"s"),s("S")):l&&(o(l,"n"),s("N"));return{name:e,args:n}}const mm=["there","is","are","has","have","need","needs"],Ct=(t,e)=>new RegExp(`\\b${e}\\b`,"i").test(t);function fm(t,e){if(t.length===0)return[{line:e,message:'does not have any executable instruction by tests. Post lines that run must begin with " * ".'}];if(!t.some(s=>/should/i.test(s.name)))return[{line:t[t.length-1].line,message:'does not have any executable instruction that contains "should": at least one line must test that the outcome is the expected.'}];for(const s of t){const o=mm.find(r=>Ct(s.text,r));if(o&&!Ct(s.text,"given")&&!Ct(s.text,"should"))return[{line:s.line,message:`has an instruction with the word "${o}" but no "should" or "given". Add "given" if it sets up, or "should" if it checks a result.`}]}const n=t.find(s=>Ct(s.text,"given")&&Ct(s.text,"should"));if(n)return[{line:n.line,message:'has an instruction with the word "given" and "should" at the same time. Keep "given" for a setup, "should" for an assertion.'}];if(t.some(s=>s.name===""))return[{line:t.find(s=>s.name==="").line,message:"has an instruction with no words in it."}];const a=t[t.length-1];return/should/i.test(a.name)?[]:[{line:a.line,message:'the last instruction must contain "should": a post ends by checking what it set out to show.'}]}function pm(t){const[e="",...n]=t.replace(/\.md$/,"").split("_");return`Post_${e.replace(/-/g,"")}_${n.map(a=>a[0].toUpperCase()+a.slice(1)).join("")}_Context`}function ah(t,e){const n=t.replace(/^---[\s\S]*?\n---\n/,f=>f.replace(/[^\n]/g,"")).split(`
`),a=n.find(f=>/^# /.test(f))?.slice(2).trim()??e,s=pm(e),o=[],r=[];n.forEach((f,m)=>{const g=cm.exec(f);if(g){const{name:y,args:p}=um(g[1]??""),b=`${y}(${p.map(v=>v.value).join(", ")})`;o.push({line:m+1,text:f.trim(),name:y,args:p,call:b}),r.push(`  await context.${b};	// ${f.trim()}`)}else dm.test(f)&&r.push("",`  // ${f.trim()}`)});const i=Math.max(0,...r.map(f=>f.indexOf("	"))),h=r.map(f=>f.includes("	")?f.replace("	"," ".repeat(i-f.indexOf("	")+1)):f),l=["// !!! IMPORTANT !!!","// This test file is AUTOGENERATED by yarn create-tests","// DO NOT MODIFY manually.","",`test("${e}", async () => {`,`  const context = new ${s}();`,"  await context.beforeTest();",...h,"","  await context.afterTest();","});",""].join(`
`),c=new Set,d=o.filter(f=>!c.has(f.name)&&c.add(f.name)),u=[`export class ${s} {`,"  async beforeTest() {}","",...d.flatMap(f=>[`  async ${f.name}(${f.args.map(m=>m.name).join(", ")}) {`,"    // TODO","  }",""]),"  async afterTest() {}","}",""].join(`
`);return{title:a,className:s,steps:o,test:l,context:u,problems:fm(o,n.length)}}const Ut=[{file:"2022-07-15_hello_blog.md",label:"Hello Blog — the first post of the course",markdown:`---
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
`}],ea=t=>new Set(t.split(/\s+/).filter(Boolean)),gm=ea(`
  var let const function return if else for while do break continue new this
  true false null undefined class extends import export from default async await
  throw try catch finally typeof instanceof in of switch case delete void yield`),wm=ea(`
  auto break case char const continue default do double else enum extern float for goto if
  inline int long register restrict return short signed sizeof static struct switch typedef
  union unsigned void volatile while NULL true false`),ym=ea(`
  abstract assert boolean break byte case catch char class const continue default do double
  else enum extends final finally float for goto if implements import instanceof int interface
  long native new package private protected public return short static strictfp super switch
  synchronized this throw throws transient try var void volatile while true false null`),bm=ea(`
  AND AS CASE CLS CONST DECLARE DEFDBL DIM DO DOUBLE ELSE END EXIT FOR FUNCTION IF IS
  LOCATE LOOP NEXT NOT OR PRINT RANDOMIZE SCREEN SELECT SHARED STATIC STEP SUB THEN TO
  UNTIL WHILE OPTION BASE`);function U(t,e){return`<span class="hl-${t}">${x(e)}</span>`}function Ls(t,e,n){for(let a=e+1;a<t.length;a+=1)if(t[a]==="\\")a+=1;else if(t[a]===n)return a+1;return t.length}function Oa(t,e,n){let a="",s=0;for(;s<t.length;){const o=t.slice(s);let r;const i=t.lastIndexOf(`
`,s-1)+1,h=/^\s*$/.test(t.slice(i,s));if(o.startsWith("//")||n&&o[0]==="#"&&h){const l=t.indexOf(`
`,s),c=l<0?t.length:l;a+=U(o[0]==="#"?"a":"c",t.slice(s,c)),s=c}else if(o.startsWith("/*")){const l=t.indexOf("*/",s+2),c=l<0?t.length:l+2;a+=U("c",t.slice(s,c)),s=c}else if(o[0]==='"'||o[0]==="'"||o[0]==="`"){const l=Ls(t,s,o[0]??"");a+=U("s",t.slice(s,l)),s=l}else if(r=/^[A-Za-z_$][\w$]*/.exec(o)){const l=r[0];a+=e.has(l)?U("k",l):x(l),s+=l.length}else(r=/^\d+(?:\.\d+)?/.exec(o))?(a+=U("n",r[0]),s+=r[0].length):(a+=x(o[0]??""),s+=1)}return a}function vm(t){let e="",n=0;for(;n<t.length;){const a=t.slice(n);let s;if(a.startsWith("%")){const o=t.indexOf(`
`,n),r=o<0?t.length:o;e+=U("c",t.slice(n,r)),n=r}else if(a.startsWith("/*")){const o=t.indexOf("*/",n+2),r=o<0?t.length:o+2;e+=U("c",t.slice(n,r)),n=r}else if(a[0]==="'"){const o=Ls(t,n,"'");e+=U("s",t.slice(n,o)),n=o}else if(a.startsWith("-->")||a.startsWith(":-")){const o=a.startsWith("-->")?"-->":":-";e+=U("k",o),n+=o.length}else(s=/^[A-Z_][\w]*/.exec(a))?(e+=U("a",s[0]),n+=s[0].length):(s=/^[a-z][\w]*/.exec(a))?(e+=x(s[0]),n+=s[0].length):(e+=x(a[0]??""),n+=1)}return e}function km(t){let e="",n=0;for(;n<t.length;){const a=t.slice(n);let s;if(a[0]==="'"||/^REM\b/i.test(a)){const o=t.indexOf(`
`,n),r=o<0?t.length:o;e+=U("c",t.slice(n,r)),n=r}else if(a[0]==='"'){const o=t.indexOf('"',n+1),r=o<0?t.length:o+1;e+=U("s",t.slice(n,r)),n=r}else(s=/^[A-Za-z_][\w]*[$!#%&]?/.exec(a))?(e+=bm.has(s[0].toUpperCase())?U("k",s[0]):x(s[0]),n+=s[0].length):(s=/^\d+(?:\.\d+)?/.exec(a))?(e+=U("n",s[0]),n+=s[0].length):(e+=x(a[0]??""),n+=1)}return e}function xm(t){let e="",n=0;for(;n<t.length;){const a=t.slice(n);if(a.startsWith("<!--")){const o=t.indexOf("-->",n+4),r=o<0?t.length:o+3;e+=U("c",t.slice(n,r)),n=r;continue}const s=/^<(\/?)([A-Za-z][\w-]*)/.exec(a);if(!s){const o=t.indexOf("<",n+1),r=o<0?t.length:o;e+=x(t.slice(n,r)),n=r;continue}for(e+=`&lt;${s[1]}${U("t",s[2]??"")}`,n+=s[0].length;n<t.length&&t[n]!==">";){const o=t.slice(n);let r;if(r=/^\s+/.exec(o))e+=r[0],n+=r[0].length;else if(r=/^[A-Za-z_:][\w:.-]*/.exec(o))e+=U("a",r[0]),n+=r[0].length;else if(o[0]==="="&&(o[1]==='"'||o[1]==="'")){const i=Ls(t,n+1,o[1]??"");e+=`=${U("s",t.slice(n+1,i))}`,n=i}else e+=x(o[0]??""),n+=1}t[n]===">"&&(e+="&gt;",n+=1)}return e}const $m=/^(\s*)(Feature:|Background:|Scenario Outline:|Scenario:|Example:|Examples:|Rule:|Given|When|Then|And|But|\*)(?=\s|$)/;function Tm(t){return t.split(`
`).map(e=>{const n=e.trimStart(),a=e.slice(0,e.length-n.length);if(n.startsWith("#"))return a+U("c",n);if(n.startsWith("@"))return a+U("a",n);const s=$m.exec(e),o=s?a+U("k",s[2]??""):"",r=s?e.slice(s[0].length):e;return s?o+r.split(/("[^"]*"|\b\d+(?:\.\d+)?\b)/).map(i=>/^"/.test(i)?U("s",i):/^\d/.test(i)?U("n",i):x(i)).join(""):x(e)}).join(`
`)}function le(t,e){return e==="js"||e==="javascript"?Oa(t,gm,!1):e==="c"?Oa(t,wm,!0):e==="java"?Oa(t,ym,!1):e==="prolog"?vm(t):e==="html"?xm(t):e==="basic"?km(t):e==="gherkin"||e==="feature"?Tm(t):x(t)}function sh(t,e){return`<div class="compiled">${t.problems.length?`<div class="refused"><strong>${x(e)}</strong> line ${t.problems[0].line}: ${x(t.problems[0].message)}<br>The tests are not written until the post is fixed.</div>`:""}<h4>${x(e.replace(/\.md$/,""))} → the test, never edited by hand</h4><pre><code>${le(t.test,"js")}</code></pre><h4>→ the context, written once and filled in by the coder</h4><pre><code>${le(t.context,"js")}</code></pre></div>`}function Sm(t){const e=w("div"),n=w("textarea",{class:"post",spellcheck:!1,rows:28,oninput:()=>r()}),a=w("input",{type:"text",value:Ut[0].file,oninput:()=>r()}),s=w("select",{onchange:()=>o(Number(s.value))},...Ut.map((i,h)=>w("option",{value:h},i.label)));function o(i){const h=Ut[i]??Ut[0];n.value=h.markdown,a.value=h.file,r()}function r(){e.innerHTML=sh(ah(n.value,a.value),a.value)}t.replaceChildren(w("div",{class:"row"},w("label",{},"Post ",s),w("label",{},"File ",a)),w("div",{class:"post-tests"},n,e)),o(0)}const Mm=()=>{const t=Ut[0];return`<div class="post-tests"><pre class="post">${t.markdown.replace(/&/g,"&amp;").replace(/</g,"&lt;")}</pre>${sh(ah(t.markdown,t.file),t.file)}</div>`},Am={name:"post-tests",apps:{"post-tests":Sm},stills:{"post-tests":Mm}},hs="program-asked";function ls(t,e){t.dispatchEvent(new CustomEvent(hs,{detail:e}))}function pt(t){return t.toLowerCase().replace(/\s+/g,"-")}const La=t=>typeof t=="string"?pt(t):String(Number(t.toPrecision(4)));function Im(t,e){const n=t.parameters.flatMap(a=>{const s=e[a.name];return s===void 0||La(s)===La(a.initial)?[]:[`--${a.name} ${La(s)}`]});return[t.name,...n].join(" ")}function oh(t){return Object.fromEntries(t.parameters.map(e=>[e.name,e.initial]))}function Em(t){return t.scale!=="log"?{min:t.min,max:t.max,step:t.step,positionOf:e=>e,valueAt:e=>e}:{min:Math.log10(t.min),max:Math.log10(t.max),step:t.step,positionOf:e=>Math.log10(e),valueAt:e=>10**e}}const cs="program-ran";function jm(t,e){const n=Em(t),a=t.show??String,s=w("output"),o=w("input",{type:"range",name:t.name,min:n.min,max:n.max,step:n.step});return o.addEventListener("input",()=>e(n.valueAt(Number(o.value)))),{label:w("label",{},`${t.label}: `,s,o),settle:r=>{o.value=String(n.positionOf(Number(r))),s.textContent=a(Number(r))}}}function Cm(t,e){const n=w("select",{name:t.name},...t.choices.map(a=>w("option",{value:a},a)));return n.addEventListener("change",()=>e(n.value)),{label:w("label",{},`${t.label} `,n),settle:a=>{n.value=String(a)}}}function rh(t){return e=>{let n=oh(t);const a=e.dataset.dials?.split(" "),s=a!==void 0&&t.glance!==void 0,o=w("code"),r=w("div",{class:s?"program-figure glance":"program-figure"}),i=d=>u=>{n={...n,[d]:u},l()},h=t.parameters.filter(d=>!a||a.includes(d.name)).map(d=>({name:d.name,dial:"choices"in d?Cm(d,i(d.name)):jm(d,i(d.name))}));function l(){for(const{name:d,dial:u}of h)u.settle(n[d]??"");o.textContent=`$ ${Im(t,n)}`,r.innerHTML=s?t.glance?.(n)??"":t.run(n).html,e.dispatchEvent(new CustomEvent(cs,{detail:n}))}const c=d=>{n={...n,...d.detail},l()};return e.addEventListener(hs,c),e.replaceChildren(w("div",{class:"dials"},...h.map(({dial:d})=>d.label)),w("p",{class:"program-line"},o),r),l(),()=>e.removeEventListener(hs,c)}}const Mn=149597870700,rt=94607e11,an=[{name:"the Moon",metres:3844e5,said:"384,400 km"},{name:"Mars",metres:.52*Mn,said:"0.52 au"},{name:"Jupiter",metres:4.2*Mn,said:"4.2 au"},{name:"Saturn",metres:8.5*Mn,said:"8.5 au"},{name:"Pluto",metres:38.5*Mn,said:"38.5 au"},{name:"Proxima Centauri",metres:4.24*rt,said:"4.24 light-years"},{name:"Sirius",metres:8.58*rt,said:"8.58 light-years"},{name:"Epsilon Eridani",metres:10.52*rt,said:"10.52 light-years"},{name:"Tau Ceti",metres:11.91*rt,said:"11.91 light-years"},{name:"the centre of the galaxy",metres:26e3*rt,said:"26,000 light-years",towards:{ra:17.76,dec:-29}},{name:"Andromeda",metres:25e5*rt,said:"2.5 million light-years",towards:{ra:.712,dec:41.27}}],Xt={dryMass:25e3,fuel:5e3,exhaust:.72},Om=299792458;function Ns(t){if(t<.01)return`${Math.round(t*Om/1e3).toLocaleString("en-US")} km/s`;if(t<.99)return`${(t*100).toPrecision(2)}% of c`;const e=Math.min(12,Math.ceil(-Math.log10(1-t)));return`${(Math.floor(t*10**e)/10**(e-2)).toFixed(e-2)}% of c`}const Lm=[[365.25*86400*1e6,"million years"],[365.25*86400,"years"],[86400,"days"],[3600,"hours"],[60,"minutes"],[1,"seconds"]];function Re(t){const[e,n]=Lm.find(([o])=>t>=o)??[1,"seconds"],a=t/e;return`${a>=10?Math.round(a).toLocaleString("en-US"):String(Math.round(a*10)/10)} ${n}`}const Nm=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:3});function Vn(t){return t>=1e6?`${Nm.format(t)} t`:`${t>=100?Math.round(t).toLocaleString("en-US"):t.toPrecision(2)} t`}const pe=299792458,Pm=9.81;function Ps(t,e){const n=e.acceleration*Pm,a=e.dryMass+e.fuel,s=e.exhaust*pe,o=pe/n*Math.acosh(1+n*t/(2*pe*pe)),r=a*(1-Math.exp(-2*n*o/s)),i=r>e.fuel,h=i?s/(2*n)*Math.log(a/e.dryMass):o,l=Math.tanh(n*h/pe),c=pe/n*Math.sinh(n*h/pe),d=pe*pe/n*(Math.cosh(n*h/pe)-1),u=Math.max(0,t-2*d),f=i?u/(l*pe):0,m=f*Math.sqrt(1-l*l);return{shipTime:2*h+m,homeTime:2*c+f,burnTime:h,coastTime:m,topSpeed:l,fuelBurnt:i?e.fuel:r,coasts:i}}const Rm=299792458,Fm=9.81,Ot=720,An=170,ie={top:12,right:10,bottom:24,left:40};function Bm(t,e){const n=Ot-ie.left-ie.right,a=An-ie.top-ie.bottom,s=u=>ie.left+u/t.shipTime*n,o=u=>ie.top+a-u/Math.max(t.topSpeed,1e-12)*a,r=e.acceleration*Fm,i=24,h=Array.from({length:i+1},(u,f)=>t.burnTime*f/i).map(u=>[u,Math.tanh(r*u/Rm)]),c=[...h.map(([u,f])=>[u,f]),...h.reverse().map(([u,f])=>[t.shipTime-u,f])].map(([u,f])=>`${s(u).toFixed(1)},${o(f).toFixed(1)}`).join(" "),d=t.coasts?`<text x="${((s(t.burnTime)+s(t.shipTime-t.burnTime))/2).toFixed(1)}" y="${(o(t.topSpeed)+14).toFixed(1)}" text-anchor="middle">engine off, ${Re(t.coastTime)}</text>`:"";return`<svg class="trip" viewBox="0 0 ${Ot} ${An}" role="img" aria-label="Speed against the ship's clock"><line class="grid" x1="${ie.left}" x2="${Ot-ie.right}" y1="${o(0)}" y2="${o(0)}"/><line class="grid" x1="${ie.left}" x2="${Ot-ie.right}" y1="${o(t.topSpeed)}" y2="${o(t.topSpeed)}"/><text x="${ie.left}" y="${o(t.topSpeed)-3}">${Ns(t.topSpeed)}</text><polyline class="line" points="${c}"/>${d}<text x="${ie.left}" y="${An-6}">departure</text><text x="${Ot-ie.right}" y="${An-6}" text-anchor="end">arrival, ${Re(t.shipTime)} on board</text></svg>`}function Dm(t,e){const n=an.map(o=>({destination:o,trip:Ps(o.metres,t)})),a=n.map(({destination:o,trip:r})=>{const i=[o.name===e?"chosen":"",r.coasts?"coasts":""].filter(Boolean).join(" "),h=r.coasts?`all ${Vn(t.fuel)}, then coasts`:Vn(r.fuelBurnt);return`<tr${i?` class="${i}"`:""} data-destination="${o.name}"><th scope="row">${o.name}</th><td>${o.said}</td><td>${Re(r.shipTime)}</td><td>${Re(r.homeTime)}</td><td>${Ns(r.topSpeed)}</td><td>${h}</td></tr>`}).join(""),s=n.find(({destination:o})=>o.name===e)??n[0];return`<figure class="rocket"><table class="voyages"><thead><tr><th>to</th><th>distance</th><th>on board</th><th>at home</th><th>top speed</th><th>fuel burnt</th></tr></thead><tbody>${a}</tbody></table>`+(s?`<h4>To ${s.destination.name}: speed against the ship's clock</h4>${Bm(s.trip,t)}`:"")+"</figure>"}function ih(t){return{dryMass:Xt.dryMass,fuel:Number(t.fuel)*Xt.dryMass,exhaust:Number(t.exhaust)/100,acceleration:Number(t.acceleration)}}const nr=365.25*86400,Hm=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:2}),ds={name:"rocket",summary:"a relativistic rocket: how long a trip takes on board and at home, and what it burns",parameters:[{name:"acceleration",label:"Acceleration",description:"what the crew feels while the engine burns, in g",min:.05,max:3,step:.05,initial:.3,show:t=>`${t.toFixed(2)} g`},{name:"fuel",label:"Fuel",description:"fuel on board, as a multiple of the ship's own mass",min:.1,max:1e13,step:.05,initial:Xt.fuel/Xt.dryMass,scale:"log",show:t=>`${Hm.format(t)} × the ship`},{name:"exhaust",label:"Exhaust speed",description:"the speed of what leaves the engine, in percent of the speed of light",min:1,max:100,step:1,initial:Xt.exhaust*100,show:t=>`${Math.round(t)}% of c`},{name:"to",label:"To",description:"where to fly",choices:an.map(t=>t.name),initial:"Proxima Centauri"}],run(t){const e=ih(t),n=String(t.to),a=an.map(h=>({destination:h,trip:Ps(h.metres,e)})),s=a.find(({destination:h})=>h.name===n)??a[0],{destination:o,trip:r}=s,i=r.coasts?`all ${Vn(e.fuel)} of fuel, then coasts`:`${Vn(r.fuelBurnt)} of fuel`;return{text:`to ${o.name}, ${o.said}: ${Re(r.shipTime)} on board, ${Re(r.homeTime)} at home, top speed ${Ns(r.topSpeed)}, ${i}`,html:Dm(e,n),data:{ship:{dryMassTonnes:e.dryMass,fuelTonnes:e.fuel,exhaust:e.exhaust,accelerationG:e.acceleration},trips:a.map(({destination:h,trip:l})=>({to:h.name,distance:h.said,onBoardYears:l.shipTime/nr,atHomeYears:l.homeTime/nr,topSpeed:l.topSpeed,fuelBurntTonnes:l.fuelBurnt,coasts:l.coasts}))}}}},In=[{name:"Proxima Centauri",ra:14.495,dec:-62.68,lightYears:4.24},{name:"Alpha Centauri",ra:14.66,dec:-60.83,lightYears:4.37},{name:"Barnard's Star",ra:17.963,dec:4.69,lightYears:5.96},{name:"Wolf 359",ra:10.941,dec:7.01,lightYears:7.86},{name:"Lalande 21185",ra:11.056,dec:35.97,lightYears:8.31},{name:"Sirius",ra:6.752,dec:-16.72,lightYears:8.58},{name:"Luyten 726-8",ra:1.65,dec:-17.95,lightYears:8.73},{name:"Ross 154",ra:18.83,dec:-23.84,lightYears:9.69},{name:"Ross 248",ra:23.699,dec:44.18,lightYears:10.3},{name:"Epsilon Eridani",ra:3.549,dec:-9.46,lightYears:10.52},{name:"Lacaille 9352",ra:23.098,dec:-35.85,lightYears:10.72},{name:"Ross 128",ra:11.796,dec:.8,lightYears:11.01},{name:"EZ Aquarii",ra:22.643,dec:-15.3,lightYears:11.1},{name:"61 Cygni",ra:21.115,dec:38.75,lightYears:11.4},{name:"Procyon",ra:7.655,dec:5.22,lightYears:11.46},{name:"Struve 2398",ra:18.713,dec:59.63,lightYears:11.5},{name:"Groombridge 34",ra:.306,dec:44.02,lightYears:11.6},{name:"Epsilon Indi",ra:22.056,dec:-56.78,lightYears:11.87},{name:"Tau Ceti",ra:1.734,dec:-15.94,lightYears:11.91}];function En(t,e){const n=e.radius/e.reach;return t.map(({name:a,ra:s,dec:o,lightYears:r})=>{const i=s/24*2*Math.PI,h=o/180*Math.PI,l=r*Math.cos(h)*Math.cos(i),c=r*Math.cos(h)*Math.sin(i),d=r*Math.sin(h),u=c*Math.cos(e.yaw)-l*Math.sin(e.yaw),f=l*Math.cos(e.yaw)+c*Math.sin(e.yaw),m=d*Math.cos(e.pitch)-f*Math.sin(e.pitch),g=f*Math.cos(e.pitch)+d*Math.sin(e.pitch);return{name:a,x:u*n,y:-m*n,depth:g}})}const _e=299792458,Wm=9.81;function qm(t,e,n){const a=e.acceleration*Wm,s=d=>({distance:_e*_e/a*(Math.cosh(a*d/_e)-1),homeTime:_e/a*Math.sinh(a*d/_e),speed:Math.tanh(a*d/_e)}),o=s(t.burnTime),r=t.homeTime-2*o.homeTime,i=r*t.topSpeed*_e,h=2*o.distance+i,l=Math.max(0,Math.min(n,t.shipTime));if(l<=t.burnTime){const d=s(l);return{along:d.distance/h,homeTime:d.homeTime,speed:d.speed}}if(l<=t.burnTime+t.coastTime){const d=(l-t.burnTime)/t.coastTime;return{along:(o.distance+d*i)/h,homeTime:o.homeTime+d*r,speed:t.topSpeed}}const c=s(t.shipTime-l);return{along:1-c.distance/h,homeTime:t.homeTime-c.homeTime,speed:c.speed}}const jn=12.5,ar=9,sr=1.5,_m=new Set(["Alpha Centauri"]),Q={ground:"#06080f",ring:"rgba(127,166,234,0.22)",stem:"rgba(127,166,234,0.18)",star:"#dfe7f5",dim:"#7d8aa3",sun:"#ffd98a",way:"#ff9d6e",ship:"#ffffff"};function zm(t,e,n){const a=t.getContext("2d");if(!a)return()=>{};const s=a,o=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=new Set(an.map(({name:b})=>b));let i={yaw:.6,pitch:.45,radius:1,reach:jn},h=0,l=performance.now(),c=null,d=[];const u=()=>({x:t.clientWidth/2,y:t.clientHeight/2});function f(b){const v=t.clientWidth,T=t.clientHeight,S=window.devicePixelRatio||1;t.width!==Math.round(v*S)&&(t.width=Math.round(v*S),t.height=Math.round(T*S)),s.setTransform(S,0,0,S,0,0),s.fillStyle=Q.ground,s.fillRect(0,0,v,T),!o&&!c&&(i={...i,yaw:i.yaw+.0015}),i={...i,radius:Math.min(v,T)*.47};const I=u(),k=j=>({x:I.x+j.x,y:I.y+j.y});s.font="11px ui-monospace, Menlo, monospace";for(const j of[5,10]){const N=En(Array.from({length:73},(B,_)=>({name:"",ra:_/72*24,dec:0,lightYears:j})),i);s.beginPath(),N.forEach((B,_)=>_?s.lineTo(k(B).x,k(B).y):s.moveTo(k(B).x,k(B).y)),s.strokeStyle=Q.ring,s.stroke();const P=k(N[0]??{x:0,y:0});s.fillStyle=Q.dim,s.fillText(`${j} ly`,P.x+4,P.y-3)}const{ship:E,chosen:O}=e(),H=an.find(({name:j})=>j===O),C=In.find(({name:j})=>j===O),M=H?Ps(H.metres,E):null;d=En(In,i);const L=En(In.map(j=>({...j,lightYears:j.lightYears*Math.cos(j.dec/180*Math.PI),dec:0})),i),$=d.map((j,N)=>N).sort((j,N)=>(d[j]?.depth??0)-(d[N]?.depth??0));for(const j of $){const N=k(d[j]??{x:0,y:0}),P=k(L[j]??{x:0,y:0}),B=d[j]?.name??"",_=((d[j]?.depth??0)+jn)/(2*jn);s.strokeStyle=Q.stem,s.beginPath(),s.moveTo(N.x,N.y),s.lineTo(P.x,P.y),s.stroke(),s.fillStyle=B===O?Q.way:Q.star,s.globalAlpha=.45+.55*_,s.beginPath(),s.arc(N.x,N.y,1.6+1.8*_,0,2*Math.PI),s.fill(),r.has(B)&&(s.strokeStyle=B===O?Q.way:Q.dim,s.beginPath(),s.arc(N.x,N.y,7,0,2*Math.PI),s.stroke()),s.fillStyle=B===O?Q.way:Q.dim,_m.has(B)||s.fillText(B,N.x+10,N.y+4),s.globalAlpha=1}if(s.fillStyle=Q.sun,s.beginPath(),s.arc(I.x,I.y,4,0,2*Math.PI),s.fill(),s.fillText("the Sun",I.x+8,I.y-6),M&&H){const j=H.towards?En([{name:"",...H.towards,lightYears:jn*1.15}],i)[0]:null,N=C?d[In.indexOf(C)]:j,P=(b-l)/1e3%(ar+2*sr),B=o?.5:Math.min(1,Math.max(0,(P-sr)/ar)),_=qm(M,E,B*M.shipTime);if(N){const J=k(N);s.strokeStyle=Q.way,s.setLineDash(C?[]:[4,4]),s.beginPath(),s.moveTo(I.x,I.y),s.lineTo(J.x,J.y),s.stroke(),s.setLineDash([]);const Ee={x:I.x+(J.x-I.x)*_.along,y:I.y+(J.y-I.y)*_.along};s.fillStyle=Q.ship,s.beginPath(),s.arc(Ee.x,Ee.y,3,0,2*Math.PI),s.fill(),C||s.fillText(`to ${H.name}, ${H.said}: not to scale`,12,T-34)}else s.fillStyle=Q.dim,s.fillText(`${H.name} is inside the dot: the planets are a thousandth of a light-year away`,12,T-34);s.fillStyle=Q.star,s.font="13px ui-monospace, Menlo, monospace",s.fillText(`on board ${Re(B*M.shipTime)}`,12,22),s.fillText(`at home  ${Re(_.homeTime)}`,12,40),s.fillStyle=Q.dim,s.fillText(`${(_.speed*100).toFixed(_.speed>.99?4:1)}% of c`,12,58),s.fillText("drag to turn",v-96,T-14)}h=o&&!c?0:requestAnimationFrame(f)}const m=b=>{const v=t.getBoundingClientRect();return{x:b.clientX-v.left,y:b.clientY-v.top}},g=b=>{c=m(b),t.setPointerCapture(b.pointerId),h||(h=requestAnimationFrame(f))},y=b=>{if(!c)return;const v=m(b);i={...i,yaw:i.yaw+(v.x-c.x)*.01,pitch:Math.max(-1.4,Math.min(1.4,i.pitch+(v.y-c.y)*.01))},c=v},p=b=>{const v=m(b),T=u(),S=d.find(I=>r.has(I.name)&&Math.hypot(T.x+I.x-v.x,T.y+I.y-v.y)<12);c=null,S&&(l=performance.now(),n(S.name))};return t.addEventListener("pointerdown",g),t.addEventListener("pointermove",y),t.addEventListener("pointerup",p),h=requestAnimationFrame(f),()=>{cancelAnimationFrame(h),t.removeEventListener("pointerdown",g),t.removeEventListener("pointermove",y),t.removeEventListener("pointerup",p)}}const Gm=(t,e)=>{let n=oh(ds);const a=h=>{n=h.detail};t.addEventListener(cs,a);const s=rh(ds)(t,e),o=h=>{const l=h.target?.closest("[data-destination]")?.getAttribute("data-destination");l&&ls(t,{to:l})};t.addEventListener("click",o);const r=w("canvas",{class:"starmap","aria-label":"The stars within twelve light-years of the Sun, turning, with the ship flying the chosen trip"});t.prepend(r);const i=zm(r,()=>({ship:ih(n),chosen:String(n.to)}),h=>ls(t,{to:h}));return()=>{i(),s?.(),t.removeEventListener(cs,a),t.removeEventListener("click",o)}},Ym={name:"rocket",programs:[ds],apps:{rocket:Gm}},us=["Go to the blog section,","You should see a list of posts,",'The last post title should be "Hello Blog", this post'];function Um(t){let e=0,n="";const a=[],s={},o=l=>{const c=l.exec(t.slice(e));return c&&(e+=c[0].length),c?.[0]},r=l=>{n+=n.length===0?l.toLowerCase():l[0]?.toUpperCase()+l.slice(1).toLowerCase()},i=(l,c,d)=>{const u=s[c]??1;s[c]=u+1;const f=/shouldBe/i.test(n)&&!a.some(m=>m.name==="expected");a.push({value:l,name:f?"expected":`${c}${u}`,type:d})};let h=-1;for(;e<t.length&&h!==e;){h=e,o(/^[^a-z0-9"]+/i);const l=o(/^[a-z]+/i);l&&r(l);const c=o(/^"[^"]+"/);c&&(i(c,"s","String"),r("S"));const d=o(/^[0-9]+/);d&&(i(d,"n","int"),r("N"))}return{name:n,arguments:a,text:t}}const Cn=(t,e,n,a)=>`<div class="${a}"><h4>${x(t)}</h4><pre><code>${le(n,e)}</code></pre></div>`;function or(t){const e=t.map(a=>`context.${a.name}(${a.arguments.map(s=>s.value).join(", ")});`),n=Math.max(0,...e.map(a=>a.length));return e.map((a,s)=>`  ${a.padEnd(n)}  // ${t[s]?.text.trim()}`).join(`
`)}function rr(t){const e=new Set;return t.filter(n=>!e.has(n.name)&&e.add(n.name))}function hh(t){const e=t.map(Um).filter(r=>r.name.length>0),n=`@Test
public void post() {
${or(e)}
}`,a=`test("post", () => {
${or(e)}
});`,s=rr(e).map(r=>`public void ${r.name}(${r.arguments.map(i=>`${i.type} ${i.name}`).join(", ")}) {
  // to write
}`).join(`

`),o=rr(e).map(r=>`${r.name}(${r.arguments.map(i=>i.name).join(", ")}) {
  // to write
}`).join(`

`);return'<div class="step-code">'+Cn("The test, for the server","java",n,"step-test")+Cn("The test, for the client","js",a,"step-test")+Cn("What is left to write, in Java","java",s,"step-context")+Cn("And in JavaScript","js",o,"step-context")+"</div>"}function Jm(t){const e=w("textarea",{class:"step-post",rows:6,spellcheck:!1,"aria-label":"A post, one step a line"});e.value=us.map(s=>`* ${s}`).join(`
`);const n=w("div"),a=()=>{n.innerHTML=hh(e.value.split(`
`).map(s=>s.replace(/^\s*[*-]\s*/,"")))};e.addEventListener("input",a),t.replaceChildren(e,n),a()}const Km=()=>`<pre class="step-post">${us.map(t=>`* ${t}`).join(`
`)}</pre>${hh(us)}`,Vm={name:"step-names",apps:{"step-names":Jm},stills:{"step-names":Km}},Jt='import Game from "./bowling";',ne=`${Jt}

let g;
beforeEach(() => (g = new Game()));`,it=(t,e,n="i++")=>`test("gutter game", () => {
${t?`  const g = new Game();
`:""}  for (let i = 0; i < 20; ${n})
    g.roll(0);
${e?`  expect(g.score()).toBe(0);
`:""}});`,ze=(t,e="i++")=>`test("all ones", () => {
${t?`  const g = new Game();
`:""}  for (let i = 0; i < 20; ${e})
    g.roll(1);
  expect(g.score()).toBe(20);
});`,Se=`test("gutter game", () => {
  rollMany(20, 0);
  expect(g.score()).toBe(0);
});`,Ce=`test("all ones", () => {
  rollMany(20, 1);
  expect(g.score()).toBe(20);
});`,lh=`test("one spare", () => {
  g.roll(5);
  g.roll(5); // spare
  g.roll(3);
  rollMany(17, 0);
  expect(g.score()).toBe(16);
});`,Xm=lh.split(`
`).map(t=>`// ${t}`).join(`
`),Lt=`test("one spare", () => {
  rollSpare();
  g.roll(3);
  rollMany(17, 0);
  expect(g.score()).toBe(16);
});`,Zm=`test("one strike", () => {
  g.roll(10); // strike
  g.roll(3);
  g.roll(4);
  rollMany(16, 0);
  expect(g.score()).toBe(24);
});`,Na=`test("one strike", () => {
  rollStrike();
  g.roll(3);
  g.roll(4);
  rollMany(16, 0);
  expect(g.score()).toBe(24);
});`,ir=t=>`test("perfect game", () => {
  rollMany(12, 10);
  expect(g.score()).toBe(${t});
});`,Nt=`function rollMany(rolls, pins) {
  for (let i = 0; i < rolls; i += 1)
    g.roll(pins);
}`,Pt=`function rollMany(rolls, pins) {
  for (let i = 0; i < rolls; i += 1) g.roll(pins);
}`,Rt=`function rollSpare() {
  g.roll(5);
  g.roll(5);
}`,Pa=`function rollStrike() {
  g.roll(10);
}`,K=(...t)=>t.join(`

`),D={gutterNoImport:`test('gutter game', () => {
  const g = new Game();
});`,gutterNew:K(Jt,`test("gutter game", () => {
  const g = new Game();
});`),gutterRolls:K(Jt,it(!0,!1)),gutterScore:K(Jt,it(!0,!0)),allOnes:K(Jt,it(!0,!0),ze(!0)),setUp:K(ne,it(!0,!0),ze(!0)),gutterShared:K(ne,it(!1,!0),ze(!0)),bothShared:K(ne,it(!1,!0),ze(!1)),named:K(ne,`test("gutter game", () => {
  const pins = 0;
  const rolls = 20;
  for (let i = 0; i < rolls; i += 1)
    g.roll(pins);
  expect(g.score()).toBe(0);
});`,ze(!1,"i += 1")),extracted:K(ne,`test("gutter game", () => {
  const pins = 0;
  const rolls = 20;
  rollMany(rolls, pins);
  expect(g.score()).toBe(0);
});`,ze(!1,"i += 1"),Nt),inlined:K(ne,Se,ze(!1,"i += 1"),Nt),rollMany:K(ne,Se,Ce,Nt),spare:K(ne,Se,Ce,lh,Nt),spareAside:K(ne,Se,Ce,Xm,Nt),rollSpare:K(ne,Se,Ce,Lt,Pt,Rt),strike:K(ne,Se,Ce,Lt,Zm,Pt,Rt),rollStrike:K(ne,Se,Ce,Lt,Na,Pt,Rt,Pa),perfect:K(ne,Se,Ce,Lt,Na,ir("300"),Pt,Rt,Pa),perfectFails:K(ne,Se,Ce,Lt,Na,ir('"fail"'),Pt,Rt,Pa)},V=(...t)=>`export default class Game {
${t.join(`
`)}
}`,G=(t,...e)=>e.length?`  ${t} {
${e.map(n=>`    ${n}`).join(`
`)}
  }`:`  ${t} {}`,Ra=["let score = 0;","for (let i = 0; i < this.#rolls.length; i++) {","  score += this.#rolls[i];","}","return score;"],Ge=(...t)=>["const rolls = this.#rolls;","let score = 0;",...t,"return score;"],ae="  #rolls = [];",ge=G("roll(pins)","this.#rolls.push(pins);"),ht=`function isSpare(rolls, frameIndex) {
  return rolls[frameIndex] + rolls[frameIndex + 1] == 10;
}`,Qm=`function isStrike(rolls, frameIndex) {
  return rolls[frameIndex] === 10;
}`,On=`function strikeBonus(rolls, frameIndex) {
  return rolls[frameIndex + 1] + rolls[frameIndex + 2];
}`,Fa=`function spareBonus(rolls, frameIndex) {
  return rolls[frameIndex + 2];
}`,hr=`function sumOfBallsInFrame(rolls, frameIndex) {
  return rolls[frameIndex] + rolls[frameIndex + 1];
}`,Ye=t=>["let frameIndex = 0;","for (let frame = 0; frame < 10; frame++) {",...t.map(e=>`  ${e}`),"}"],lr=(t,e)=>[`if (${t}) {`,...t.includes("isSpare")?[]:["  // spare"],"  score += 10 + rolls[frameIndex + 2];","  frameIndex += 2;","} else {",`  score += ${e};`,"  frameIndex += 2;","}"],R={none:"",empty:"export default class Game {}",roll:V(G("roll()")),scoreEmpty:V(G("roll()"),G("score()")),scoreZero:V(G("roll()"),G("score()","return 0;")),summing:V("  #score = 0;",G("roll(pins)","this.#score += pins;"),G("score()","return this.#score;")),rollsField:V("  #score = 0;",ae,G("roll(pins)","this.#score += pins;"),G("score()","return this.#score;")),bothWritten:V("  #score = 0;",ae,G("roll(pins)","this.#score += pins;","this.#rolls.push(pins);"),G("score()","return this.#score;")),readFromRolls:V("  #score = 0;",ae,G("roll(pins)","this.#score += pins;","this.#rolls.push(pins);"),G("score()",...Ra)),oldUnwritten:V("  #score = 0;",ae,ge,G("score()",...Ra)),rollsOnly:V(ae,ge,G("score()",...Ra)),twoAtATime:V(ae,ge,G("score()","const rolls = this.#rolls;","let score = 0;","let i = 0;","for (let frame = 0; frame < 10; frame++) {","  score += rolls[i] + rolls[i + 1];","  i += 2;","}","return score;")),spareByI:V(ae,ge,G("score()","const rolls = this.#rolls;","let score = 0;","let i = 0;","for (let frame = 0; frame < 10; frame++) {","  if (rolls[i] + rolls[i + 1] == 10) {","    // spare","    score += 10 + rolls[i + 2];","    i += 2;","  } else {","    score += rolls[i] + rolls[i + 1];","    i += 2;","  }","}","return score;")),frameIndex:V(ae,ge,G("score()",...Ge(...Ye(lr("rolls[frameIndex] + rolls[frameIndex + 1] == 10","rolls[frameIndex] + rolls[frameIndex + 1]"))))),isSpare:`${V(ae,ge,G("score()",...Ge(...Ye(lr("isSpare(rolls, frameIndex)","rolls[frameIndex] + rolls[frameIndex + 1]")))))}

${ht}`,strike:`${V(ae,ge,G("score()",...Ge(...Ye(["if (rolls[frameIndex] == 10) {","  // strike","  score += 10 +","    rolls[frameIndex + 1] +","    rolls[frameIndex + 2];","  frameIndex += 1;","} else if (isSpare(rolls, frameIndex)) {","  score += 10 + rolls[frameIndex + 2];","  frameIndex += 2;","} else {","  score += rolls[frameIndex] + rolls[frameIndex + 1];","  frameIndex += 2;","}"]))))}

${ht}`,strikeBonus:`${V(ae,ge,G("score()",...Ge(...Ye(["if (rolls[frameIndex] == 10) {","  // strike","  score += 10 + strikeBonus(rolls, frameIndex);","  frameIndex += 1;","} else if (isSpare(rolls, frameIndex)) {","  score += 10 + rolls[frameIndex + 2];","  frameIndex += 2;","} else {","  score += rolls[frameIndex]+rolls[frameIndex + 1];","  frameIndex += 2;","}"]))))}

${On}

${ht}`,spareBonus:`${V(ae,ge,G("score()",...Ge(...Ye(["if (rolls[frameIndex] == 10) {","  // strike","  score += 10 + strikeBonus(rolls, frameIndex);","  frameIndex += 1;","} else if (isSpare(rolls, frameIndex)) {","  score += 10 + spareBonus(rolls, frameIndex);","  frameIndex += 2;","} else {","  score += rolls[frameIndex]+rolls[frameIndex + 1];","  frameIndex += 2;","}"]))))}

${On}

${Fa}

${ht}`,sumOfBalls:`${V(ae,ge,G("score()",...Ge(...Ye(["if (rolls[frameIndex] == 10) {","  // strike","  score += 10 + strikeBonus(rolls, frameIndex);","  frameIndex += 1;","} else if (isSpare(rolls, frameIndex)) {","  score += 10 + spareBonus(rolls, frameIndex);","  frameIndex += 2;","} else {","  score += sumOfBallsInFrame(rolls, frameIndex);","  frameIndex += 2;","}"]))))}

${On}

${Fa}

${hr}

${ht}`,isStrike:`${V(ae,ge,G("score()",...Ge(...Ye(["if (isStrike(rolls, frameIndex)) {","  score += 10 + strikeBonus(rolls, frameIndex);","  frameIndex += 1;","} else if (isSpare(rolls, frameIndex)) {","  score += 10 + spareBonus(rolls, frameIndex);","  frameIndex += 2;","} else {","  score += sumOfBallsInFrame(rolls, frameIndex);","  frameIndex += 2;","}"]))))}

${Qm}

${On}

${Fa}

${hr}

${ht}`},Me=["Roll loop is duplicated","Game creation duplicated"],se=["ugly comment in test."],Ba=["ugly comment in test.","ugly comment in conditional.","i is a bad name for this variable"],Ft=["ugly comment in test.","ugly comment in conditional.","ugly expressions."],F=(t,e,n,a,s=[],o)=>o===void 0?{commit:t,stage:e,test:n,code:a,smells:s}:{commit:t,stage:e,test:n,code:a,smells:s,note:o},Ke=[F(0,"test","",R.none,[],"Create the BowlingGame project. Create a test file bowling.spec.js. Execute the test and verify that you get the following error."),F(1,"test",D.gutterNoImport,R.none),F(2,"code",D.gutterNew,R.empty),F(3,"test",D.gutterRolls,R.empty),F(4,"code",D.gutterRolls,R.roll),F(5,"test",D.gutterScore,R.roll),F(6,"code",D.gutterScore,R.scoreEmpty),F(7,"code",D.gutterScore,R.scoreZero),F(8,"test",D.allOnes,R.scoreZero,Me),F(9,"code",D.allOnes,R.summing,Me),F(10,"clean",D.setUp,R.summing,Me),F(11,"clean",D.gutterShared,R.summing,Me),F(12,"clean",D.bothShared,R.summing,Me),F(13,"clean",D.named,R.summing,Me),F(14,"clean",D.extracted,R.summing,Me),F(15,"clean",D.inlined,R.summing,Me),F(16,"clean",D.rollMany,R.summing,Me),F(17,"test",D.spare,R.summing,se),F(18,"test",D.spareAside,R.summing,se,"Tempted to use flag to remember previous roll. So design must be wrong. roll() calculates score, but name does not imply that. score() does not calculate score, but name implies that it does. Design is wrong. Responsibilities are misplaced."),F(19,"clean",D.spareAside,R.rollsField,se),F(20,"clean",D.spareAside,R.bothWritten,se),F(21,"clean",D.spareAside,R.readFromRolls,se),F(22,"clean",D.spareAside,R.oldUnwritten,se),F(23,"clean",D.spareAside,R.rollsOnly,se),F(24,"test",D.spare,R.rollsOnly,se),F(25,"test",D.spareAside,R.rollsOnly,se,"This isn’t going to work because i might not refer to the first ball of the frame. Design is still wrong. Need to walk through array two balls (one frame) at a time."),F(26,"clean",D.spareAside,R.twoAtATime,se),F(27,"test",D.spare,R.twoAtATime,se),F(28,"code",D.spare,R.spareByI,se),F(29,"clean",D.spare,R.frameIndex,Ba),F(30,"clean",D.spare,R.isSpare,Ba),F(31,"clean",D.rollSpare,R.isSpare,Ba),F(32,"test",D.strike,R.isSpare,se),F(33,"code",D.strike,R.strike,se),F(34,"clean",D.strike,R.strikeBonus,Ft),F(35,"clean",D.strike,R.spareBonus,Ft),F(36,"clean",D.strike,R.sumOfBalls,Ft),F(37,"clean",D.strike,R.isStrike,Ft),F(38,"clean",D.rollStrike,R.isStrike,Ft),F(39,"test",D.perfect,R.isStrike),F(40,"test",D.perfectFails,R.isStrike),F(41,"test",D.perfect,R.isStrike)];function ef(t,e){const n=t===""?[]:t.split(`
`),a=e.split(`
`),s=Array.from({length:n.length+1},()=>new Array(a.length+1).fill(0));for(let h=n.length-1;h>=0;h-=1)for(let l=a.length-1;l>=0;l-=1)s[h][l]=n[h]===a[l]?(s[h+1][l+1]??0)+1:Math.max(s[h+1][l]??0,s[h][l+1]??0);const o=[];let r=0,i=0;for(;r<n.length||i<a.length;)r<n.length&&i<a.length&&n[r]===a[i]?(o.push({kind:"same",line:a[i]}),r+=1,i+=1):r<n.length&&(i>=a.length||(s[r+1][i]??0)>=(s[r][i+1]??0))?(o.push({kind:"removed",line:n[r]}),r+=1):(o.push({kind:"added",line:a[i]}),i+=1);return o}const Ln={id:"fc771d5e39e8",title:"Lessons Learned From The Bowling Game Kata: What To Test?"},Bt={id:"90b110a2ad17",title:"Refactor Lessons Learned From The Bowling Game Kata (1/2)"},Oe={id:"1d28b3a78b08",title:"Refactor Lessons Learned From The Bowling Game Kata (2/2)"},cr={id:"a37d8d11be9c",title:"Lessons Learned From The Bowling Game Kata: How To Design?"},dr={id:"6813582074f3",title:"Don't Trust Tests"},tf=[{commits:[1,4],title:"Step tests come and go",text:"The test first only creates a game, as a step test would, and then rolls, as another would. Such tests appear and disappear while a business test is written: none is needed.",essay:{...Ln,section:"Chapter Four. Step tests are redundant."}},{commits:[5,7],title:"The simplest rule first",text:"The gutter game scores no point, so it needs no hard thinking, and it lays the foundation of the code. Then comes the simplest rule that remains, and so on.",essay:{...Ln,section:"Chapter Seven. Start with the most simple rule."}},{commits:[8,9],title:"Refactor only after it works",text:"The second test repeats code from the first, and the kata waits: it only marks the duplication. Solving the problem and cleaning the code are two tasks, and the first comes first.",essay:{...Bt,section:"Lesson 1: Refactor only after it works."}},{commits:[10,10],title:"Add new code before removing the old",text:"It works again, so the refactor begins, oddly: a game for every test, kept and then ignored. Doing nothing, it breaks nothing — which shows the new code is safe to use.",essay:{...Bt,section:"Lesson 2: Add new code before removing old."}},{commits:[11,12],title:"Remove as little as possible",text:"The old creation goes one test at a time: the gutter game first, then, once everything works, all ones. Should they behave differently, a small change makes the cause easy to find.",essay:{...Bt,section:"Lesson 3: Remove the minimal amount of old code."}},{commits:[13,13],title:"One aspect at a time",text:"Only with the game's creation clean does the kata turn to the other thing to clean, the repeated loop. Many improvements may come to mind; it takes them one at a time.",essay:{...Bt,section:"Lesson 4: Refactor only one aspect at a time."}},{commits:[14,16],title:"Let the IDE do it",text:"With the rolls and the pins in constants, extracting the loop makes them the parameters of rollMany, and nothing is done by hand. Then the constants go, and the second loop calls it too.",essay:{...Bt,section:"Lesson 5: Leverage on the IDE."}},{commits:[17,17],title:"Not from scratch",text:"The design so far is the least one the needs so far asked for, and it was necessary. Now it no longer serves, and starting again from scratch is out of the question.",essay:{...Oe,section:"The Final Lesson"}},{commits:[18,18],title:"Step 0 · Name the parts",text:"The failing test is set aside, so everything works again before the refactor. Then the kinds of code: the counter is the internal representation, roll its setter, score its getter.",essay:{...Oe,section:"Step 0. Identifying types of code"}},{commits:[19,19],title:"Step 1 · Add the new beside the old",text:"The new internal representation, the list of rolls, goes in just below the counter. The old one is not removed, so the code still works.",essay:{...Oe,section:"Step 1. Introducing the new internal representation"}},{commits:[20,20],title:"Step 2 · Write to both",text:"The setter, roll, also keeps each roll in the list. It goes on updating the counter as well, so for now it writes to both, and the code still works.",essay:{...Oe,section:"Step 2. Make setters update the new internal representation."}},{commits:[21,21],title:"Step 3 · Read from the new",text:"The getter, score, now adds up the list. Only its own old line goes: that breaks nobody, and an undo would bring it back. The counter and its update stay.",essay:{...Oe,section:"Step 3. Make getters use the new internal representation."}},{commits:[22,22],title:"Step 4 · Stop writing the old",text:"roll stops updating the counter, and everything works: no getter reads it any more. Had something broken, some code would still be using it: undo the removal, and keep refactoring.",essay:{...Oe,section:"The Five Steps"}},{commits:[23,23],title:"Step 5 · Remove the old",text:"Nobody uses the counter, so it goes, and the code works again — the mantra behind each step. So every step could be committed and merged, without stopping delivery.",essay:{...Oe,section:"The five steps mantra"}},{commits:[24,26],title:"No guarantee of success",text:"The refactor is complete, and the spare still fails: a good technique is not a guarantee. It works again first; then most of the code stays, and only the algorithm changes.",essay:{...Oe,section:"Additional steps."}},{commits:[27,27],title:"The test comes back as it was",text:"The spare test returns unchanged; the kata writes no test for its roll-by-roll attempt. It just continues the refactor, and fixes the algorithm.",essay:{...Ln,section:"Chapter Five. Do not test mistakes."}},{commits:[32,32],title:"The tests are the rules",text:"The strike test is one more rule of scoring: tests and rules match one by one. They call the game, roll and score, and what they test is the business rules.",essay:{...Ln,section:"Chapter One. The basics."}},{commits:[37,37],title:"Code that reads as the rules",text:"The score now reads as the instructions for scoring bowling: frame by frame, a strike, a spare or neither, with the bonuses where they are due.",essay:{...cr,section:"Comparing typical design with the kata design"}},{commits:[39,39],title:"No code for the tenth frame",text:"The perfect game passes at once. The tenth frame has no code and no test of its own: this game checks it, and the bonuses count its extra rolls.",essay:{...cr,section:"Where is the Tenth Frame?"}},{commits:[40,40],title:"Make it fail once",text:"A test that passes without failing first has lost what TDD gives: a mistake could pass unnoticed. So it is made to fail on purpose, and the error shows it checks the right thing.",essay:{...dr,section:""}},{commits:[41,41],title:"Trust a test seen failing",text:"Seen failing as it should, the test is known to check the right thing, and it gets its expectation back. Never trust a test that did not fail before.",essay:{...dr,section:""}}];function ch(t){return tf.find(({commits:[e,n]})=>t>=e&&t<=n)}function ta(t){return t instanceof Error?`${t.name}: ${t.message}`:String(t)}const dh=new WeakSet,Kt=t=>typeof t=="string"?JSON.stringify(t):typeof t=="function"?dh.has(t)?"[MockFunction]":`[Function ${t.name||"anonymous"}]`:String(t),uh=t=>t.map(Kt).join(", "),ur=t=>t.length===0?"called with no arguments":`called with ${uh(t)}`;class Wn extends Error{}const mr=t=>t instanceof Wn?t.message:ta(t);function nf(){const t=[],e=Object.assign((...n)=>{t.push(n)},{calls:t});return dh.add(e),e}const af=(t,e)=>t.length===e.length&&t.every((n,a)=>Object.is(n,e[a]));function sf(t){return{toBe(e){if(!Object.is(t,e))throw new Wn(`Expected: ${Kt(e)}. Received: ${Kt(t)}.`)},toContain(e){if(!Array.isArray(t)||!t.includes(e))throw new Wn(`Expected: something containing ${Kt(e)}. Received: ${Array.isArray(t)?`[${uh(t)}]`:Kt(t)}.`)},toHaveBeenCalledWith(...e){const n=t?.calls??[];if(n.some(s=>af(s,e)))return;const a=n[n.length-1];throw new Wn(`Expected: ${ur(e)}. Received: ${a?ur(a):"never called"}.`)}}}function Xn(t,e={}){const n=[],a=[],s=[],o=(d,u)=>n.push({name:[...s,d].join(" "),body:u}),r=(d,u)=>{s.push(d),u(),s.pop()},i=["test","it","describe","beforeEach","expect","fn",...Object.keys(e)],h=[o,o,r,d=>a.push(d),sf,nf,...Object.values(e)];try{new Function(...i,t)(...h)}catch(d){return{passed:!1,message:mr(d),results:[]}}if(n.length===0)return{passed:!1,message:"Your test suite must contain at least one test.",results:[]};const l=n.map(({name:d,body:u})=>{try{for(const f of a)f();return u(),{name:d,passed:!0}}catch(f){return{name:d,passed:!1,message:mr(f)}}}),c=l.find(d=>!d.passed);return c?{passed:!1,message:c.message,results:l}:{passed:!0,results:l}}const fr=/^\s*import Game from "\.\/bowling";\s*$/m;function mh(t,e){let n;try{n=e.trim()?new Function(`${e.replace(/export default class Game/,"class Game")}
return Game;`)():void 0}catch(a){return{passed:!1,message:ta(a),results:[]}}return fr.test(t)?Xn(t.replace(fr,""),{Game:n}):Xn(t)}const of={test:"Test: write or change a test",code:"Code: write what the test asks for",clean:"Clean: tidy, and stay green"},rf={same:"line",added:"line added",removed:"line removed"};function pr(t,e,n,a){const s=n===void 0?e.split(`
`).map(r=>({kind:"same",line:r})):ef(n,e);if(!e.trim()&&!s.some(r=>r.kind==="removed"))return`<figure class="kata-file"><figcaption>${t}</figcaption><p class="kata-empty">${a}</p></figure>`;const o=s.map(({kind:r,line:i})=>`<span class="${rf[r]}">${le(i,"js")||" "}</span>`);return`<figure class="kata-file"><figcaption>${t}</figcaption><pre><code>${o.join(`
`)}</code></pre></figure>`}function fh(t,e){const n=mh(t.test,t.code),a=n.passed?'<p class="kata-bar green">All tests pass.</p>':`<p class="kata-bar red">${x(n.message??"")}</p>`,s=t.smells.length?`<div class="kata-smells"><h4>Still to clean</h4><ul>${t.smells.map(h=>`<li>${x(h)}</li>`).join("")}</ul></div>`:"",o=t.note?`<p class="kata-note">${x(t.note)}</p>`:"",r=ch(t.commit),i=r?`<aside class="kata-lesson"><h4>${x(r.title)}</h4><p>${x(r.text)} <a href="https://medium.com/p/${r.essay.id}" target="_blank" rel="noopener noreferrer">${x(r.essay.title)}${r.essay.section?` — ${x(r.essay.section)}`:""}</a></p></aside>`:"";return`<div class="kata-step"><p class="kata-move"><strong>commit ${t.commit}</strong> · ${of[t.stage]}</p>${a}${i}<div class="kata-files">${pr("bowling.spec.js",t.test,e?.test,"An empty file.")}${pr("bowling.js",t.code,e?.code,"Not written yet.")}</div>${o}${s}</div>`}function hf(t,e){return`commit ${t.commit} · ${t.stage} · ${e.passed?"All tests pass.":e.message}`}function ph(t,e){return`<ol class="kata-strip" aria-label="The commits of the kata, red or green">${t.map(s=>{const o=mh(s.test,s.code),r=o.passed?"green":"red",i=s.commit===e;return`<li class="${r} ${s.stage}${i?" here":""}" data-commit="${s.commit}" title="${x(hf(s,o))}"${i?' aria-current="step"':""}>${s.commit}</li>`}).join("")}</ol><p class="kata-legend"><span class="red">a test fails</span> <span class="green code">all pass</span> <span class="green clean">a clean step: all still pass</span></p>`}const lf=()=>`<div class="kata">${ph(Ke,0)}${fh(Ke[0])}</div>`,gr=Ke.length-1;function cf(t){let e=0;const n=w("div"),a=w("div"),s=w("button",{type:"button"},"← previous"),o=w("button",{type:"button",class:"invite"},"next →"),r=w("span",{class:"kata-hint"},"click any commit, or use ← →"),i=h=>{h!==e&&o.classList.remove("invite"),e=Math.max(0,Math.min(gr,h)),n.innerHTML=ph(Ke,e),a.innerHTML=fh(Ke[e],Ke[e-1]),s.disabled=e===0,o.disabled=e===gr};s.addEventListener("click",()=>i(e-1)),o.addEventListener("click",()=>i(e+1)),n.addEventListener("click",h=>{const l=h.target?.closest("[data-commit]");l&&i(Number(l.dataset.commit))}),t.tabIndex=0,t.addEventListener("keydown",h=>{if(h.key==="ArrowRight")i(e+1);else if(h.key==="ArrowLeft")i(e-1);else return;h.preventDefault()}),t.replaceChildren(w("div",{class:"kata"},n,w("div",{class:"kata-nav"},s,o,r),a)),i(0)}const df=/^---(?:\s+(.*))?$/;function uf(t){const e=[];let n=[];for(const a of t.split(`
`)){const s=df.exec(a);if(!s){n.push(a);continue}const o=s[1]?.trim()??"",r=/^(red|green)\s/.exec(o)?.[1],i=n.join(`
`);o?e.push({text:i,status:r?{kind:r,text:o.slice(r.length).trim()}:{kind:"note",text:o}}):e.push({text:i}),n=[]}return n.some(a=>a.trim())&&e.push({text:n.join(`
`)}),e}function gh(t,e){const n=uf(t),a=n.map((s,o)=>{const r=s.status?`<p class="slide-status ${s.status.kind}">${x(s.status.text)}</p>`:"";return`<div class="slide${o===n.length-1?" current":""}"><pre><code>${le(s.text,e)}</code></pre>${r}</div>`});return`<figure class="slides" data-language="${x(e)}"><div class="slides-screen">${a.join("")}</div></figure>`}const mf=[18,19,20,21,22,23];function ff(){return mf.map(t=>`${Ke[t]?.code??""}
--- green commit ${t} · ${ch(t)?.title??""} — all tests pass.`).join(`
`)}function wh(){return gh(ff(),"js")}function pf(t){t.querySelector("figure.slides")||(t.innerHTML=wh())}const gf=()=>wh(),wf={name:"bowling-kata",apps:{"bowling-kata":cf,"kata-five-steps":pf},stills:{"bowling-kata":lf,"kata-five-steps":gf}},ms=[{name:"original",label:"Original",said:"The dispatcher the three tests imply: its listeners kept in an array, _queue.",source:`class Dispatcher {
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
}`}],yf=`let dispatcher, cb;
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
});`;function bf(t,e=yf){let n;try{n=new Function(`${t}
return Dispatcher;`)()}catch(a){return{passed:!1,message:ta(a),results:[]}}return Xn(e,{Dispatcher:n})}const wr=["addListener should add a callback to the queue","deliver should invoke queue callbacks with the received argument"];function fs(t){const e=bf(t.source),n=s=>{const o=e.results.find(h=>h.name===s),r=o?.passed??!1,i=r?"":`<span class="said">${x(o?.message??e.message??"")}</span>`;return`<li class="${r?"green":"red"}"><code>${x(s)}</code>${i}</li>`},a=e.results.map(s=>s.name).filter(s=>!wr.includes(s));return`<div class="dispatcher-run"><figure class="kata-file"><figcaption>dispatcher.js — ${x(t.label.toLowerCase())}</figcaption><pre><code>${le(t.source,"js")}</code></pre></figure><div class="dispatcher-tests"><p class="said-change">${x(t.said)}</p><h4>Looking inside</h4><ul class="test-results">${wr.map(n).join("")}</ul><h4>Reading like documentation</h4><ul class="test-results">${a.map(n).join("")}</ul></div></div>`}function vf(t){const e=w("div"),n=ms.map((a,s)=>{const o=w("input",{type:"radio",name:"dispatcher",value:a.name,checked:s===0});return o.addEventListener("change",()=>{e.innerHTML=fs(a)}),w("label",{},o,` ${a.label}`)});t.replaceChildren(w("div",{class:"dispatcher-choice",role:"radiogroup","aria-label":"The dispatcher"},...n),e),e.innerHTML=fs(ms[0])}const kf=()=>ms.map(t=>`<section><h4>${t.label}</h4>${fs(t)}</section>`).join(""),xf={name:"tests-as-examples",apps:{"tests-as-examples":vf},stills:{"tests-as-examples":kf}},yh=`Feature: Magic of Disappearing Cucumbers

  Scenario: Eating 5 out of 12 cucumbers
    Given I have 12 cucumbers
    When I eat 5 cucumbers
    Then I should have 7 cucumbers remaining`,bh=`class CucumberSteps {
  #count = 0;

  givenIHaveNCucumbers(count) {
    this.#count = count;
  }
}`,yr=(t,e)=>`<p class="kata-bar ${t?"green":"red"}">${x(e)}</p>`;function vh(t){if(t.error)return yr(!1,t.error);if(t.wished){const[a="",...s]=t.wished.split(`
`);return`<pre class="genie-wished">${x(a)}
${le(s.join(`
`),"js")}</pre>`}const e=t.run;if(!e)return"";const n=e.results.map(a=>`<li class="${a.passed?"green":"red"}"><code>${x(a.name)}</code>${a.passed?"":`<span class="said">${x(a.message??"")}</span>`}</li>`);return`${yr(e.passed,e.passed?"Every scenario passes.":e.message??"")}<ul class="test-results">${n.join("")}</ul>`}const $f={n:`
`,r:"\r",t:"	",b:"\b",f:"\f",v:"\v",0:"\0",s:" "},br=t=>t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();function Tf(t,e){return t.endsWith(e)?t.at(-2)!=="\\"||/(^|[^\\])(\\\\)+.$/.test(t):!1}function kh(t){const e=t.split(" "),n=[],a=[];for(let s=0;s<e.length;){const o=e[s]??"",r=o[0];if(r==='"'||r==="'"){let h=e[s++]??"";for(;s<e.length&&!Tf(h,r);)h+=` ${e[s++]}`;a.push(h.slice(1,-1).replace(/\\(.)/g,(l,c)=>$f[c]??c)),n.push("S");continue}if(s+=1,o&&!Number.isNaN(Number(o))){a.push(Number(o)),n.push("N");continue}const i=o.normalize("NFD").replace(/([^\w]|\d)/g,"");i?n.push(br(i)):o&&(n.push("X"),a.push(o))}return{matchName:n.map(br).join(""),args:a}}const Sf=/^(Given|When|Then|And|But) (.*)$/,Mf=/^(?:Scenario|Example):\s*(.*)$/,Af=/^("""|```)/;function If(t){const e=[];let n=null,a=null;const s=t.split(`
`),o=()=>a?.at(-1),r=i=>{a&&(a[a.length-1]=i)};for(let i=0;i<s.length;i+=1){const h=(s[i]??"").trim();if(!h||h.startsWith("#")||h.startsWith("@"))continue;if(h.startsWith("Background:")){n=[],a=n;continue}const l=Mf.exec(h);if(l){const f=[...n??[]];e.push({name:l[1]??"",steps:f}),a=f;continue}const c=Sf.exec(h);if(c){a?.push({keyword:c[1]??"",text:c[2]??""});continue}const d=o();if(h.startsWith("|")&&d){const f=h.replace(/^\||\|$/g,"").split("|").map(m=>m.trim());r({...d,table:[...d.table??[],f]});continue}const u=Af.exec(h);if(u&&d){const f=(s[i]??"").indexOf(u[1]??""),m=[];for(i+=1;i<s.length&&!(s[i]??"").trim().startsWith(u[1]??"");i+=1){const g=s[i]??"";m.push(g.slice(Math.min(f,g.length-g.trimStart().length)))}r({...d,docString:m.join(`
`)})}}return e}function Ef(t,e){const n=new Set(e),a=[];for(const s of t.flatMap(o=>o.steps)){const{matchName:o,args:r}=kh(s.text);if(n.has(o))continue;let i=1,h=1;const l=r.map(c=>typeof c=="number"?`number${i++}`:`string${h++}`);s.docString!==void 0&&l.push("docString"),s.table&&l.push("table"),a.push(`  ${s.keyword.toLowerCase()}${o}(${l.join(", ")}) {
    throw new Error("Unimplemented");
  }`),n.add(o)}return a.length===0?"":["There are missing steps. Please implement them:","","class WishedSteps {",a.join(`

`),"}"].join(`
`)}const vr=/^(given|when|then|and|but)([A-Z])/,Dt=t=>JSON.stringify(t);function jf(t){const[e=[],...n]=t;return n.map(a=>Object.fromEntries(e.map((s,o)=>[s,a[o]??""])))}function xh(t,e){const n=e.trim().replace(/;+$/,"");let a;try{a=new Function(`return (${n});`)()}catch(h){return{wished:"",error:ta(h)}}if(typeof a!="function")return{wished:"",error:"The steps must be a class."};const s=new Map;for(const h of Object.getOwnPropertyNames(a.prototype))vr.test(h)&&s.set(h.replace(vr,"$2"),h);const o=If(t),r=Ef(o,new Set(s.keys()));if(r)return{wished:r};const i=o.map(h=>{const l=h.steps.map(c=>{const{matchName:d,args:u}=kh(c.text),f=[...u.map(Dt),...c.docString===void 0?[]:[Dt(c.docString)],...c.table?[Dt(jf(c.table))]:[]];return`  steps[${Dt(s.get(d))}](${f.join(", ")});`});return`test(${Dt(h.name)}, () => {
  const steps = new Steps();
${l.join(`
`)}
});`});return{wished:"",run:Xn(`const Steps = (${n});
${i.join(`
`)}`)}}function kr(t,e,n,a,s,o){const r=`<code>${le(a,n)}</code>`,i=o?`<div class="genie-editor"><pre class="genie-source genie-colours" aria-hidden="true">${r}</pre><textarea class="genie-source" data-genie="${e}" data-language="${n}" rows="${s}" spellcheck="false" autocapitalize="off" aria-label="${x(t)}">${x(a)}</textarea></div>`:`<pre class="genie-source">${r}</pre>`;return`<figure class="kata-file"><figcaption>${x(t)}</figcaption>${i}</figure>`}function $h(t,e,n){return`<div class="genie"><div class="genie-in">${kr("cucumbers.feature","feature","gherkin",t,7,n)}${kr("steps.js","steps","js",e,10,n)}</div><figure class="kata-file genie-out"><figcaption>npm test</figcaption><div class="genie-output">${vh(xh(t,e))}</div></figure></div>`}function Cf(t){t.innerHTML=$h(yh,bh,!0);const e=t.querySelector('[data-genie="feature"]'),n=t.querySelector('[data-genie="steps"]'),a=t.querySelector(".genie-output");if(!e||!n||!a)return;for(const o of[e,n]){const r=o.previousElementSibling,i=()=>{r&&(r.innerHTML=`<code>${le(o.value,o.dataset.language??"")}
</code>`)};o.addEventListener("input",i),o.addEventListener("scroll",()=>{r&&(r.scrollTop=o.scrollTop,r.scrollLeft=o.scrollLeft)})}const s=()=>{a.innerHTML=vh(xh(e.value,n.value))};e.addEventListener("input",s),n.addEventListener("input",s)}const Of=()=>$h(yh,bh,!1),Lf={name:"gherkin-genie",apps:{"gherkin-genie":Cf},stills:{"gherkin-genie":Of}};function Th(t,e){if(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)return()=>{};let n=e(),a=!0,s=!1,o=!0,r;const i=w("button",{type:"button",class:"player"}),h=(u,f)=>{i.setAttribute("aria-label",u),i.textContent=f};h("Pause","⏸");const l=()=>{if(r=void 0,!a||!o||s)return;const u=n();if(u===null){s=!0,h("Play again","↻");return}r=setTimeout(l,u)},c=()=>{clearTimeout(r),r=void 0};i.addEventListener("click",()=>{if(s){n=e(),s=!1,a=!0,h("Pause","⏸"),c(),l();return}a=!a,h(a?"Pause":"Play",a?"⏸":"▶"),a?l():c()}),t.append(i);const d=typeof IntersectionObserver=="function"?new IntersectionObserver(u=>{for(const f of u)o=f.isIntersecting;o?r===void 0&&l():c()}):void 0;return d?.observe(t),l(),()=>{c(),d?.disconnect(),i.remove()}}function Sh(t,e){const n=[];for(;n.length<e;){n.push("test");const a=Math.floor(t()*4);for(let s=0;s<a&&n.length<e;s+=1)n.push("clean")}return n}function Mh(t){return`<ol class="small-steps" role="img" aria-label="Small steps: a test fails and is put right at once; clean steps between; again and again">${t.map(n=>`<li class="${n}"></li>`).join("")}</ol>`}const ps=40,xr=220,Nf=950,Pf=2200,Rf=45;function Ff(t,{wipe:e=!0}={}){const n=t.map(()=>"empty"),a=[{marks:[...n],hold:xr}],s=o=>a.push({marks:[...n],hold:o});return t.forEach((o,r)=>{o==="test"?(n[r]="red",s(Nf),n[r]="fixed"):n[r]="clean",s(r===t.length-1?Pf:xr)}),e&&t.forEach((o,r)=>{n[r]="empty",s(Rf)}),a}const $r=3;function Bf(t){const e=w("div",{class:"small-steps-row"});return t.replaceChildren(e),Th(t,()=>{e.innerHTML=Mh(Array.from({length:ps},()=>"empty"));const a=[...e.querySelectorAll("li")],s=Array.from({length:$r},(r,i)=>Ff(Sh(Math.random,ps),{wipe:i<$r-1})).flat();let o=0;return()=>{const r=s[o++];return r?(r.marks.forEach((i,h)=>{const l=a[h];l&&l.className!==i&&(l.className=i)}),r.hold):null}})}const Df=()=>Mh(Sh(sn(2026),ps).map(t=>t==="test"?"green":"clean")),Hf={name:"small-steps",apps:{"small-steps":Bf},stills:{"small-steps":Df}},Da=-100,Ha=100,Wa=(t,e,n)=>`${t},${e},${n}`;class Wf{#t;#e=[{a:2,b:4,c:8}];#n=null;#a=0;constructor(e){this.#t=e}get rows(){return this.#e.map(({a:e,b:n,c:a})=>({a:e,b:n,c:a,holds:this.#t.holds(e,n,a),last:Wa(e,n,a)===this.#n})).sort((e,n)=>Number(n.holds)-Number(e.holds)||e.a-n.a||e.b-n.b||e.c-n.c)}test(e,n,a){return[e,n,a].some(Number.isNaN)?"Ops! Invalid numbers.":(this.#n=Wa(e,n,a),this.#e.some(s=>Wa(s.a,s.b,s.c)===this.#n)?"Ops! Sequence already present.":(this.#e.push({a:e,b:n,c:a}),""))}guess(e){if(this.#a>=this.#e.length)return"Ops! Add another sequence test before a guess.";const n="Ops! Cannot compile rule, please check your javascript rule or console for more information.";let a;try{a=new Function(`'use strict';return (a,b,c) => ${e}`)()}catch{return n}this.#a+=1;try{for(let s=Da;s<=Ha;s+=1)for(let o=Da;o<=Ha;o+=1)for(let r=Da;r<=Ha;r+=1)if(a(s,o,r)!==this.#t.holds(s,o,r))return"Ops! This is not the rule. Test more sequences and guess again."}catch{return n}return`Good! "${e}" is the rule.`}}function Ah(t){return`<table class="guess-table"><thead><tr><th>a,</th><th>b,</th><th>c</th><th></th></tr></thead><tbody>${t.map(({a:n,b:a,c:s,holds:o,last:r})=>`<tr${r?' class="last"':""}><td>${n},</td><td>${a},</td><td>${s}</td><td>${o?"✅":"❌"}</td></tr>`).join("")}</tbody></table>`}const qf=t=>({text:t,holds:new Function("a","b","c",`return ${t};`)}),qa=["a < b && b < c","a + 1 < b && b + 1 < c","a + 1 < b && b + 2 < c","a <= b && b <= c","a <= b && b < c","a < b && b <= c","2 * a === b && 2 * b === c","a > 0 && b > 0 && c > 0","a === 2","b === 4","c === 8","c > 3","a + b + c > 5","a + b + c >= 5","a + b < c","a + b <= c","c - a > b","a * b === c","a * b <= c","a * b >= c","a !== b && b !== c && a !== c","a === 2 && b === 4 && c === 8","a % 2 === 0 && b % 2 === 0 && c % 2 === 0"].map(qf);function _f(t,e=Math.random){const n=new Wf(qa[Math.floor(qa.length*e())]??qa[0]),a=w("div",{class:"guess-rows"}),s=(p,b)=>w("input",{type:"number",value:p,"aria-label":b}),[o,r,i]=[s(2,"a"),s(4,"b"),s(8,"c")],h=w("p",{class:"guess-said","data-said":"test",hidden:!0}),l=w("input",{type:"text",value:"true",spellcheck:!1,autocapitalize:"off","aria-label":"The rule, in JavaScript"}),c=w("p",{class:"guess-said","data-said":"guess",hidden:!0}),d=(p,b)=>{p.textContent=b,p.hidden=!b,p.classList.toggle("good",b.startsWith("Good!"))},u=()=>{a.innerHTML=Ah(n.rows)},f=()=>{d(h,n.test(Number(o.value),Number(r.value),Number(i.value))),u()},m=()=>d(c,n.guess(l.value)),g=w("button",{type:"button",class:"test",onclick:f},"Test"),y=w("button",{type:"button",class:"guess",onclick:m},"Guess");for(const p of[o,r,i])p.addEventListener("keydown",b=>b.key==="Enter"&&f());l.addEventListener("keydown",p=>p.key==="Enter"&&m()),t.replaceChildren(w("div",{class:"guess-the-rule"},w("h4",{},"Sequence numbers and their result:"),a,w("h4",{},"Propose a new sequence:"),w("p",{class:"guess-sequence"},"a: ",o,", b: ",r,", c: ",i," ",g),h,w("h4",{},"Propose a rule:"),w("p",{class:"guess-rule"},l," ",y),c,w("p",{class:"guess-note"},"Write any valid javascript expression that evaluates true or false. Use variables a, b and c in the expression."))),u()}const zf=()=>`<div class="guess-the-rule"><h4>Sequence numbers and their result:</h4>${Ah([{a:2,b:4,c:8,holds:!0,last:!1}])}<p class="guess-note">The rule is drawn, and the guessing played, when the page runs.</p></div>`,Gf={name:"guess-the-rule",apps:{"guess-the-rule":t=>_f(t)},stills:{"guess-the-rule":zf}},gs=new Si,Yf=900,Uf=480,Nn={x:1600,y:1e3};function Pn(t,e){return(t%e+e)%e}class Jf{x=0;y=0;written="";driving=!1;follow({byRadians:e,tiltedBy:n,seconds:a}){const s=document.documentElement;if(s.dataset.sky!=="stars")return;this.driving||this.takeOver(s);const o=Yf/(Math.PI*2),r=(a/Uf*Math.PI*2+e)*o;this.x=Pn(this.x+r,Nn.x),this.y=Pn(this.y-n*o,Nn.y);const i=`${(Math.round(this.x*2)/2).toFixed(1)}px ${(Math.round(this.y*2)/2).toFixed(1)}px`;if(i===this.written)return;this.written=i;const[h,l]=i.split(" ");s.style.setProperty("--sky-x",h??"0px"),s.style.setProperty("--sky-y",l??"0px")}release(){const e=document.documentElement;e.classList.remove("sky-driven"),e.style.removeProperty("--sky-x"),e.style.removeProperty("--sky-y"),this.x=0,this.y=0,this.written="",this.driving=!1}takeOver(e){const n=getComputedStyle(document.body,"::before").transform;if(n&&n!=="none")try{const a=new DOMMatrixReadOnly(n);this.x=Pn(a.m41,Nn.x),this.y=Pn(a.m42,Nn.y)}catch{}e.classList.add("sky-driven"),this.driving=!0}}function Kf(t){return gs.on(e=>t.follow(e))}const Tr=new Jf,Vf={name:"sky",install:()=>Kf(Tr),arrive:()=>Tr.release()},{width:Sr,height:Rn,pad:ke}=Cs;function Xf(t,e){const n=Math.max(...t.map(c=>c.values.length),1),a=Math.max(1,...t.flatMap(c=>c.values)),s=Sr-ke.left-ke.right,o=Rn-ke.top-ke.bottom,r=c=>ke.left+c/Math.max(1,n-1)*s,i=c=>ke.top+o-c/a*o,h=t.map(c=>{const d=c.values.map((u,f)=>`${r(f).toFixed(1)},${i(u).toFixed(1)}`).join(" ");return`<polyline class="line ${c.className}" points="${d}"><title>${c.name}</title></polyline>`}).join(""),l=t.map((c,d)=>`<rect class="${c.className}" x="${ke.left+d*90}" y="${Rn-ke.bottom+20}" width="10" height="3"/><text x="${ke.left+d*90+14}" y="${Rn-ke.bottom+24}">${c.name}</text>`).join("");return`<svg viewBox="0 0 ${Sr} ${Rn}" role="img" aria-label="${e.y} by ${e.x}">${Ri(a,e,n,js(a))}${h}${l}</svg>`}const _a=20;function Zf(t){const{baseTime:e,shortcutFactor:n,interestRate:a,timeHorizon:s}=t,o=[];let r=null;const i=e;let h=e*(1-n),l=0,c=0,d=0,u=0,f=0,m=0;for(let g=0;g<s*_a;){for(;f<=g;)l+=1,d+=1,f+=i;for(;m<=g;)c+=1,u+=1,m+=h,h*=1+a;if(g+=1,g%_a===0){const y=g/_a;o.push({month:y,cleanCumulative:l,debtCumulative:c,cleanMonthly:d,debtMonthly:u,debtFeatureCost:h}),d=0,u=0,r===null&&l>c&&(r=y)}}return{months:o,breakEvenMonth:r}}const Mr=t=>Zf({baseTime:Number(t["base-time"]),shortcutFactor:Number(t.shortcuts)/100,interestRate:Number(t.interest)/100,timeHorizon:Number(t.timeline)}),Ar=({months:t})=>`<div class="chart"><h4>Cumulative features</h4>${Xf([{name:"Clean",className:"clean",values:t.map(e=>e.cleanCumulative)},{name:"Debt-driven",className:"debt",values:t.map(e=>e.debtCumulative)}],{x:"Months",y:"Features"})}</div>`,Qf={name:"technical-debt",summary:"what shortcuts cost, compounded: two teams build the same features, one of them cutting corners",parameters:[{name:"base-time",label:"Base time",description:"days a feature takes when it is done properly",min:1,max:30,step:1,initial:20,show:t=>`${t} days`},{name:"shortcuts",label:"Shortcuts",description:"percent of that time a shortcut saves, at first",min:0,max:90,step:5,initial:25,show:t=>`${t}%`},{name:"interest",label:"Interest",description:"percent dearer every shortcut feature makes the next one",min:0,max:100,step:1,initial:10,show:t=>`${t}%`},{name:"timeline",label:"Timeline",description:"months to look ahead",min:6,max:60,step:1,initial:24,show:t=>`${t} months`}],run(t){const e=Number(t.shortcuts),n=Number(t.interest),a=Number(t.timeline),s=Mr(t),{months:o,breakEvenMonth:r}=s,i=o[o.length-1],h=i?.cleanCumulative??0,l=i?.debtCumulative??0,c=h>0?(h-l)/h*100:0,d=Math.abs(c)<.1,u=d?"even":c>0?"loss":"gain",f=d?"≈0%":`${Math.abs(c).toFixed(1)}%`,m=r?`month ${r}`:"never",g=n===0?"With no interest there is no compound slowdown, and the shortcut simply wins. That is the one case that does not happen to real code.":r?`${e}% saved at first, ${n}% interest on every feature: clean development overtakes at month ${r}, and by month ${a} the shortcut road has delivered ${f} less.`:`${e}% saved at first, ${n}% interest on every feature: in ${a} months the clean road has not yet caught up. Give it longer, or raise the interest.`,y=[`<div class="clean"><strong>${h}</strong>clean features</div>`,`<div class="debt"><strong>${l}</strong>debt features</div>`,`<div><strong>${m}</strong>break-even</div>`,`<div><strong>${f}</strong>${u} on the shortcut road</div>`].join(""),p=Fi([{name:"Clean",className:"clean",values:o.slice(1).map(b=>b.cleanMonthly)},{name:"Debt-driven",className:"debt",values:o.slice(1).map(b=>b.debtMonthly)}],{x:"Months",y:"Features a month"});return{text:`clean ${h} features, debt-driven ${l}, break-even ${m}
${g}`,html:`<div class="figures">${y}</div><div class="charts">${Ar(s)}<div class="chart"><h4>Monthly delivery rate</h4>${p}</div></div><p>${g}</p>`,data:{cleanFeatures:h,debtFeatures:l,breakEvenMonth:r,months:o}}},glance:t=>Ar(Mr(t))},ep={name:"technical-debt",programs:[Qf]},tp="theme";function Ih(){const t=document.documentElement,e=t.dataset.pageTheme;let n=null;try{n=localStorage.getItem(tp)}catch{n=null}const a=e??(n==="light"||n==="dark"||n==="pink"?n:null);a?t.dataset.theme=a:delete t.dataset.theme}function Zt(...t){return t.map(e=>e.replace(/^[a-z]+:\/\//,"").replace(/^\/+|\/+$/g,"")).filter(Boolean).join("-")}const np=1e4,ws=[];let Ht=null;function Ir(){const t=window.goatcounter?.count;if(!t)return!1;for(const e of ws.splice(0))t({path:e,title:e,event:!0});return!0}function Qt(t){if(ws.push(t),Ir()||Ht)return;const e=Date.now();Ht=setInterval(()=>{(Ir()||Date.now()-e>np)&&(Ht&&clearInterval(Ht),Ht=null,ws.splice(0))},250)}const ys="theme";function ap(){return window.matchMedia("(prefers-color-scheme: dark)").matches}function sp(){let t=null;try{t=localStorage.getItem(ys)}catch{t=document.documentElement.dataset.theme??null}return t==="light"||t==="dark"?t:t==="pink"?"light":ap()?"dark":"light"}class op{apply(e){const n=e==="toggle"?sp()==="dark"?"light":"dark":e;try{n==="system"?localStorage.removeItem(ys):localStorage.setItem(ys,n)}catch{}return Ih(),Qt(Zt("theme","set",n)),n}}function rp(){let t=null;try{t=localStorage.getItem("theme")}catch{}Qt(Zt("theme","start",t??"system"))}function ip(t){const e=document.querySelector(".theme-toggle");return e?(e.classList.add("ready"),e.removeAttribute("aria-hidden"),e.removeAttribute("tabindex"),e.addEventListener("click",t),()=>e.removeEventListener("click",t)):()=>{}}const bs=["light","dark","system","pink"];function hp(t){return bs.includes(t)}const lp={light:"☀︎",dark:"☾︎",system:"◐︎",pink:"❀︎"};function Er(t){const e=n=>`${lp[n]} ${n}`;return{text:`theme   ${bs.map(n=>n===t?`[${e(n)}]`:e(n)).join("   ")}`,html:`<pre class="choices">theme   ${bs.map(n=>n===t?`<strong aria-current="true">${e(n)}</strong>`:`<a href="#" data-run="theme ${n}" title="theme ${n}">${e(n)}</a>`).join("   ")}</pre>`}}function cp(t){return{name:"theme",usage:"theme [light|dark|system|pink|auto]",description:"switch the colours, or toggle them",run({site:e,cwd:n},[a]){const s=e.at(n)?.fields.theme;if(s)return{text:`theme: this page keeps its own, ${s}. It works everywhere else.`,error:!0};if(a===void 0)return Er(t.apply("toggle"));const o=a==="auto"?"system":a;return hp(o)?Er(t.apply(o)):{text:`theme: ${a}: choose light, dark, system or pink`,error:!0}}}}const dp={name:"theme",commands:[cp(new op)],install:t=>(rp(),ip(()=>t.run("theme"))),arrive:()=>Ih()},jr=[{machine:"small",algorithm:"pairs",vertices:8,graphs:150,serial:42.43,openmp:14.34,cuda:2.572},{machine:"small",algorithm:"pairs",vertices:16,graphs:150,serial:738.92,openmp:247.95,cuda:33.06},{machine:"small",algorithm:"pairs",vertices:24,graphs:150,serial:4387.13,openmp:1208.97,cuda:109.093},{machine:"large",algorithm:"pairs",vertices:8,graphs:150,serial:7.483,openmp:1.511,cuda:.653},{machine:"large",algorithm:"pairs",vertices:16,graphs:150,serial:135.505,openmp:25.061,cuda:5.24},{machine:"large",algorithm:"pairs",vertices:24,graphs:150,serial:515.757,openmp:126.228,cuda:18.99},{machine:"small",algorithm:"common-labelling",vertices:8,graphs:50,serial:843.21,openmp:214.51,cuda:33.404},{machine:"small",algorithm:"common-labelling",vertices:16,graphs:50,serial:17061.4,openmp:4284.01,cuda:550.153},{machine:"small",algorithm:"common-labelling",vertices:24,graphs:50,serial:71670.13,openmp:20274.32,cuda:2332.076}],up={small:"Intel Atom 330, 2 cores, 8 W · NVIDIA 9400M, 16 cores, 10 W",large:"Intel i7 950, 4 cores, 130 W · NVIDIA GT 430, 96 cores, 49 W"},mp={pairs:t=>`Matching every pair of ${t} graphs`,"common-labelling":t=>`Finding one labelling common to ${t} graphs`};function za(t){if(t<10)return`${t.toFixed(1)} s`;if(t<60)return`${Math.round(t)} s`;const e=Math.floor(t/60);return e<60?e<10?`${e} min ${Math.round(t-e*60)} s`:`${Math.round(t/60)} min`:`${Math.floor(e/60)} h ${e%60} min`}const fp=t=>`×${t>=10?Math.round(t):t.toFixed(1)}`;function Cr(t){const e=Math.max(...t.map(s=>s.serial/s.cuda)),n=(s,o)=>`<span class="bar ${o}" style="--p:${(s/e).toFixed(3)}"></span><span class="factor">${fp(s)}</span>`;return`<figure class="runs"><table class="runs"><thead><tr><th>each graph has</th><th>one thread</th><th>OpenMP, every core</th><th>CUDA, the graphics card</th></tr></thead>${[...new Set(t.map(s=>`${s.algorithm}/${s.machine}`))].map(s=>{const o=t.filter(l=>`${l.algorithm}/${l.machine}`===s),{algorithm:r,machine:i}=o[0],h=o.map(l=>`<tr><th scope="row">${l.vertices} vertices</th><td>${za(l.serial)}</td><td>${za(l.openmp)}<div class="speedup">${n(l.serial/l.openmp,"openmp")}</div></td><td>${za(l.cuda)}<div class="speedup">${n(l.serial/l.cuda,"cuda")}</div></td></tr>`).join("");return`<tbody><tr class="group"><th colspan="4">${mp[r](o[0]?.graphs??0)}<span>${up[i]}</span></th></tr>${h}</tbody>`}).join("")}</table><figcaption>Measured in 2011, on graphs of the GREC dataset. Each bar is how many times faster than one thread of the same machine, and all the bars are on one scale.</figcaption></figure>`}const pp={name:"thesis-results",stills:{"graph-matching-runs":()=>Cr(jr)},apps:{"graph-matching-runs":t=>{t.firstChild||(t.innerHTML=Cr(jr))}}},vs={variable:"tn",atLeast:!0,threshold:20,months:[0,1,2,3,4,5,6,7,8,9,10,11]};function gp(t,e){const n=t.map(({value:m})=>m),a=Math.floor(Math.min(...n,...(e.spans??[]).map(({value:m})=>m))),s=Math.ceil(Math.max(...n,a+1)),o=Oi(t.map(({year:m})=>m),a,s),{x:r,y:i,slot:h}=o,l=m=>r(m)+h/2,c=[];for(const m of t){const g=c[c.length-1];g&&g[g.length-1]?.year===m.year-1?g.push(m):c.push([m])}const d=c.map(m=>`<polyline class="line" points="${m.map(({year:g,value:y})=>`${A(l(g))},${A(i(y))}`).join(" ")}"/>`).join(""),u=t.map(({year:m,value:g,title:y,partial:p})=>`<circle class="dot${p?" partial":""}" cx="${A(l(m))}" cy="${A(i(g))}" r="3.5"><title>${y}</title></circle>`).join(""),f=o.levels(e.spans??[]);return o.wrap(e.label,`${d}${u}${f}`)}function wp(t,{threshold:e,atLeast:n},a){if(!t)return 0;const[s=0,...o]=t;return o.reduce((r,i,h)=>s+h*a>=e-1e-9===n?r+i:r,0)}const bt={tn:{code:1002,unit:"°C",name:"daily minimum",summary:"mean",bin:.5,range:[-30,35]},tx:{code:1001,unit:"°C",name:"daily maximum",summary:"mean",bin:.5,range:[-25,50]},pp:{code:1300,unit:"mm",name:"daily rain",summary:"sum",bin:.5,range:[0,250]},pi:{code:1303,unit:"mm/h",name:"most rain in one hour",summary:"max",bin:.5,range:[0,100]}},yp=.95,bp=(t,e)=>new Date(Date.UTC(t,e+1,0)).getUTCDate(),Le=t=>t.reduce((e,n)=>e+n,0);function vp(t,e){return t.length===0?null:e==="sum"?Le(t.map(({figure:n})=>n)):e==="max"?Math.max(...t.map(({figure:n})=>n)):Le(t.map(({figure:n,weight:a})=>n*a))/Le(t.map(({weight:n})=>n))}function kp(t,e){const n=bt[e.variable];return Object.entries(t.years).flatMap(([a,s])=>{const o=s[e.variable];if(!o)return[];const r=Number(a),i=o.months.map(m=>({days:wp(m,e,n.bin),measured:Le(m?.slice(1)??[])})),h=m=>e.months.includes(m),l=Le(i.filter((m,g)=>h(g)).map(m=>m.measured)),c=Le(e.months.map(m=>bp(r,m))),d=Le(i.filter((m,g)=>h(g)).map(m=>m.days)),u=o.summaries.flatMap((m,g)=>h(g)&&m!==null?[{figure:m,weight:i[g]?.measured??0}]:[]),f=vp(u,n.summary);return[{year:r,days:d,elsewhere:Le(i.map(m=>m.days))-d,measured:l,expected:c,whole:l/c>=yp,summary:f,months:i}]}).sort((a,s)=>a.year-s.year)}const Or=["January","February","March","April","May","June","July","August","September","October","November","December"];function Lr(t){const{name:e,unit:n}=bt[t.variable],a=t.variable==="pi"?"":"a ",s=t.atLeast?`of ${t.threshold} ${n} or more`:`below ${t.threshold} ${n}`,o=Or[t.months[0]??0],r=Or[t.months[t.months.length-1]??11],i=t.months.length===12?"whole year":`${o} to ${r}`;return`days with ${a}${e} ${s}, ${i}`}const Eh=["January","February","March","April","May","June","July","August","September","October","November","December"],xp=.55;function $p(t,e,{days:n,measured:a}){const s=`${Eh[e]} ${t}`;if(a===0)return`<td class="none" title="${s}: not measured"></td>`;const o=Math.round(n/a*1e3)/1e3;return`<td${o>=xp?' class="deep"':""} style="--v:${o}" title="${s}: ${n} of ${a} days">${n||""}</td>`}function Tp(t,e){const n=`<tr><th></th>${Eh.map(s=>`<th scope="col">${s.slice(0,3)}</th>`).join("")}</tr>`,a=[...t].reverse().map(({year:s,months:o})=>`<tr><th scope="row">${s}</th>${o.map((r,i)=>$p(s,i,r)).join("")}</tr>`);return`<table class="heat calendar${e?" warm":""}"><thead>${n}</thead><tbody>${a.join("")}</tbody></table>`}const Nr=t=>t.reduce((e,n)=>e+n,0)/t.length;function Pr(t){const e=t.flatMap(({summary:n})=>n===null?[]:[n]);return{from:t[0]?.year??0,to:t[t.length-1]?.year??0,years:t.length,days:Nr(t.map(({days:n})=>n)),summary:e.length?Nr(e):null}}function Sp(t){const e=t.filter(a=>a.whole);if(e.length<4)return null;const n=Math.floor(e.length/2);return[Pr(e.slice(0,n)),Pr(e.slice(n))]}const Mp=["January","February","March","April","May","June","July","August","September","October","November","December"],Ap={mean:"The mean",sum:"The total",max:"The highest"},Vt=t=>String(Math.round(t*10)/10),Ip=t=>`${t>0?"+":t<0?"−":""}${Vt(Math.abs(t))}`,Ep=t=>`${Number(t.slice(8,10))} ${Mp[Number(t.slice(5,7))-1]} ${t.slice(0,4)}`;function jp(t,e){const{unit:n,name:a}=bt[e.variable],s=Object.values(t.years).flatMap(i=>i[e.variable]?[i[e.variable].record]:[]),[o,r]=e.atLeast?s.map(([i,h])=>[i,h]).reduce((i,h)=>h[0]>i[0]?h:i):s.map(([,,i,h])=>[i,h]).reduce((i,h)=>h[0]<i[0]?h:i);return`<p class="record">The ${e.atLeast?"highest":"lowest"} ${a} on record here: ${o} ${n} on ${Ep(r)}, whatever months are chosen.</p>`}function jh(t,e){const n=bt[e.variable],a=`<figcaption><strong>${t.name}</strong> · ${t.altitude} m, ${t.setting} · ${Lr(e)}</figcaption>`,s=kp(t,e);if(s.length===0)return`<figure class="weather">${a}<p>This station has no ${n.name} on record.</p></figure>`;const o=Sp(s),r=({from:m,to:g})=>`${m}–${g}`,i=o?'<div class="figures">'+o.map(m=>`<div><strong>${Vt(m.days)}</strong>days a year, ${r(m)}</div>`).join("")+`<div><strong>${Ip(o[1].days-o[0].days)}</strong>days a year, from one half to the other</div></div>`:"",h=s.map(({year:m,days:g,elsewhere:y,measured:p,expected:b,whole:v})=>{const T=y>0?`, and ${y} more outside the months chosen`:"",S=v?"":`, with only ${p} of ${b} days measured`;return{year:m,value:g,partial:!v,title:`${m}: ${g} days${S}${T}`}}),l=(o??[]).map(m=>({from:m.from,to:m.to,value:m.days,label:`${Vt(m.days)} a year`})),c=s.flatMap(({year:m,summary:g,whole:y})=>g===null||!y?[]:[{year:m,value:g,title:`${m}: ${Vt(g)} ${n.unit}`}]),d=(o??[]).flatMap(m=>m.summary===null?[]:[{from:m.from,to:m.to,value:m.summary,label:`${Vt(m.summary)} ${n.unit}`}]),u=`${Ap[n.summary]} ${n.name} of each year, ${n.unit}`,f=(n.summary==="mean"?gp:ss)(c,{label:u,spans:d});return`<figure class="weather">${a}${i}<h4>Days a year</h4>${ss(h,{label:`Days a year: ${Lr(e)}`,spans:l})}<h4>When in the year they fell</h4>${Tp(s,e.atLeast&&n.unit==="°C")}<h4>${u}, in the months chosen</h4>${f}`+jp(t,e)+"</figure>"}const Rr=[{id:"tropical-nights",name:"tropical nights",variable:"tn",atLeast:!0,threshold:20},{id:"torrid-nights",name:"torrid nights",variable:"tn",atLeast:!0,threshold:25},{id:"hot-days",name:"hot days",variable:"tx",atLeast:!0,threshold:30},{id:"torrid-days",name:"torrid days",variable:"tx",atLeast:!0,threshold:35},{id:"frost-days",name:"frost days",variable:"tn",atLeast:!1,threshold:0},{id:"rainy-days",name:"rainy days",variable:"pp",atLeast:!0,threshold:1},{id:"heavy-rain",name:"days of heavy rain",variable:"pp",atLeast:!0,threshold:20},{id:"downpours",name:"days with a downpour",variable:"pi",atLeast:!0,threshold:10}],ut=[{code:"WU",name:"Badalona - Museu",municipality:"Badalona",altitude:42,setting:"urban, by the sea"},{code:"X4",name:"Barcelona - el Raval",municipality:"Barcelona",altitude:33,setting:"dense city, on a roof"},{code:"X8",name:"Barcelona - Zona Universitària",municipality:"Barcelona",altitude:82,setting:"city edge"},{code:"D5",name:"Barcelona - Observatori Fabra",municipality:"Barcelona",altitude:410,setting:"wooded hill above the city"},{code:"UP",name:"Cabrils",municipality:"Cabrils",altitude:81,setting:"coastal slope, half rural"},{code:"XF",name:"Sabadell - Parc Agrari",municipality:"Sabadell",altitude:259,setting:"farmland beside a city"},{code:"XJ",name:"Girona",municipality:"Girona",altitude:72,setting:"market gardens by the city"},{code:"XE",name:"Tarragona - Complex Educatiu",municipality:"Tarragona",altitude:6,setting:"coast"},{code:"VK",name:"Raimat",municipality:"Lleida",altitude:286,setting:"inland plain, vineyards"}],Fr=[["whole year",[0,1,2,3,4,5,6,7,8,9,10,11]],["June to August",[5,6,7]],["May to October",[4,5,6,7,8,9]],["December to February",[0,1,11]]],Cp={tn:[-10,30],tx:[0,45],pp:[.5,100],pi:[.5,60]};function Op(t){const e=new Map,n=Is(t,"/data/weather/index.json"),a=w("div");a.append(...t.querySelectorAll("figure"));let s=null,o=vs,r=!1;const i=(p,b)=>w("option",{value:p},b),h=w("select",{onchange:()=>{g(h.value)}},...ut.map(({code:p,name:b})=>i(p,b))),l=w("select",{onchange:()=>{const p=Rr.find(({id:b})=>b===l.value);p&&m({variable:p.variable,atLeast:p.atLeast,threshold:p.threshold})}},...Rr.map(({id:p,name:b})=>i(p,b))),c=w("select",{onchange:()=>m({months:Fr[Number(c.value)]?.[1]??vs.months})},...Fr.map(([p],b)=>i(b,p))),d=w("output"),u=w("input",{type:"range",step:.5,oninput:()=>m({threshold:Number(u.value)})});function f(){const[p,b]=Cp[o.variable];u.min=String(p),u.max=String(b),u.value=String(o.threshold),d.textContent=`${o.atLeast?"":"below "}${o.threshold} ${bt[o.variable].unit}${o.atLeast?" or more":""}`,s&&(a.innerHTML=jh(s,o))}function m(p){o={...o,...p},f()}async function g(p){const b=e.get(p)??fetch(`/data/weather/${p}.json`).then(v=>v.json());e.set(p,b);try{const v=await b;if(r||h.value!==p)return;s=v,f()}catch{e.delete(p),a.replaceChildren(w("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}const y=w("div",{class:"dials"},w("label",{},"Station",h),w("label",{},"Counting",l),w("label",{},"Threshold: ",d,u),w("label",{},"Months",c));return t.replaceChildren(y,a,n),g(h.value),()=>{r=!0}}function Lp(t,e,[n,a]){if(t.length===0)return null;const s=Math.round((a-n)/e),o=new Map;for(const l of t){const c=Math.min(s-1,Math.max(0,Math.floor((l-n)/e+1e-9)));o.set(c,(o.get(c)??0)+1)}const r=Math.min(...o.keys()),i=Math.max(...o.keys());return[Math.round((n+r*e)*1e3)/1e3,...Array.from({length:i-r+1},(l,c)=>o.get(r+c)??0)]}const Br="7bvh-jvq2",Ch=5e4,Dr=Object.entries(bt),Np="No representatiu",Pp=["Representatiu",""],Rp=(t,e)=>Math.round(t*10**e)/10**e;function Fp(t,e){if(t.length===0)return null;if(e==="max")return Math.max(...t);const n=t.reduce((a,s)=>a+s,0);return Rp(e==="sum"?n:n/t.length,2)}function Bp(t,e){const n=Array.from({length:12},(o,r)=>t.filter(({date:i})=>Number(i.slice(5,7))===r+1).map(({value:i})=>i)),a=t.reduce((o,r)=>r.value>o.value?r:o),s=t.reduce((o,r)=>r.value<o.value?r:o);return{months:n.map(o=>Lp(o,e.bin,e.range)),summaries:n.map(o=>Fp(o,e.summary)),record:[a.value,a.date,s.value,s.date]}}function Dp(t){if(!Array.isArray(t))throw new Error("the portal did not answer with rows");if(t.length>=Ch)throw new Error("the answer was cut short at the limit");const e=t;if(!e.some(s=>s.data_lectura?.slice(5,7)==="12"))throw new Error("the year does not reach December yet");const n=new Map,a=new Set;for(const s of e){const o=s.estat??"";if(o===Np)continue;if(!Pp.includes(o))throw new Error(`the network marks days as "${o}", which nobody has decided how to read`);const r=s.data_lectura?.slice(0,10)??"",i=`${s.codi_estacio}/${s.codi_variable}`;if(a.has(`${i}/${r}`))throw new Error(`${i} has ${r} twice`);a.add(`${i}/${r}`);const h=Number(s.valor);Number.isFinite(h)&&n.set(i,[...n.get(i)??[],{date:r,value:h}])}return n}const Hp={name:"weather",directory:"public/data/weather",firstYear:1988,files:ut.map(t=>`${t.code}.json`),about:{measures:"daily minimum and maximum temperature, daily rain, most rain in one hour",network:"Xarxa d'Estacions Meteorològiques Automàtiques (XEMA)",attribution:"Servei Meteorològic de Catalunya (XEMA). Dades obertes de la Generalitat de Catalunya.",dataset:`https://analisi.transparenciacatalunya.cat/d/${Br}`,stations:ut},requestsFor(t){const e=ut.map(a=>`'${a.code}'`).join(","),n=Dr.map(([,a])=>a.code).join(",");return[Ni(Br,{select:"codi_estacio,codi_variable,data_lectura,valor,estat",where:`codi_estacio in (${e}) and codi_variable in (${n}) and data_lectura between '${t}-01-01T00:00:00' and '${t}-12-31T23:59:59'`,limit:Ch})]},withYear(t,e,n){const a=Dp(n[0]);return Object.fromEntries(ut.map(s=>{const o=`${s.code}.json`,r=Dr.flatMap(([l,c])=>{const d=a.get(`${s.code}/${c.code}`);return d?[[l,Bp(d,c)]]:[]}),i=Object.fromEntries(r),h={...t[o]?.years,...r.length?{[e]:i}:{}};return[o,{...s,years:h}]}))}},Wp=t=>{const e=JSON.parse(t(`/data/weather/${ut[0]?.code}.json`)),n=JSON.parse(t("/data/weather/index.json"));return jh(e,vs)+Qn(n)},qp={name:"weather",apps:{weather:Op},stills:{weather:Wp},sources:[Hp]},Ga="header-world",qn={saved(){try{const t=localStorage.getItem(Ga);if(!t)return null;const e=JSON.parse(t);return[e.seed,e.levels,e.roughness,e.share].every(a=>typeof a=="number"&&Number.isFinite(a))?e:null}catch{return null}},remember(t){try{localStorage.setItem(Ga,JSON.stringify(t))}catch{}},forget(){try{localStorage.removeItem(Ga)}catch{}}};function Oh(t,e,n){const a=t.mesh.faces[n*3]??0,s=t.mesh.faces[n*3+1]??0,o=t.mesh.faces[n*3+2]??0;return((e[a]??0)+(e[s]??0)+(e[o]??0))/3}function _p(t,e){return Oh(t,t.mesh.radii,e)}const zp=[24,92,168],Gp=[62,176,206],Yp=[214,196,138],Hr=[190,158,84],Ya=[70,138,66],Up=[74,104,76],Jp=[136,128,116],Wr=[238,243,247];function Je(t,e,n){const a=Math.min(1,Math.max(0,n));return[t[0]+(e[0]-t[0])*a,t[1]+(e[1]-t[1])*a,t[2]+(e[2]-t[2])*a]}function Kp(t){return t>.78?Hr:t>.62?Je(Ya,Hr,(t-.62)/.16):t>.3?Ya:Je(Up,Ya,(t-.12)*5.5)}const Lh=t=>{const e=new Uint8ClampedArray(t.mesh.faceCount*3),n=t.mesh.radii.reduce((s,o)=>Math.max(s,o),-1/0),a=Math.max(1e-6,n-t.seaRadius);for(let s=0;s<t.mesh.faceCount;s+=1){const o=(_p(t,s)-t.seaRadius)/a,r=Oh(t,t.temperature,s);let i;o<=.002?(i=Je(Gp,zp,.55),r<.16&&(i=Je(i,Wr,(.16-r)*6))):(i=Je(Yp,Kp(r),Math.min(1,o*9)),i=Je(i,Jp,Math.max(0,o-.55)*2.2),r<.26&&(i=Je(i,Wr,(.26-r)*4))),e[s*3]=i[0],e[s*3+1]=i[1],e[s*3+2]=i[2]}return{...t,faceColour:e}};function Nh(t,e){const n=new Float32Array(t.length*3),a=new Float32Array(t.length),s=new Float32Array(t.length);t.forEach((r,i)=>{n[i*3]=r.direction[0],n[i*3+1]=r.direction[1],n[i*3+2]=r.direction[2],a[i]=r.radius,s[i]=r.surface});const o=new Uint32Array(e.length*3);return e.forEach(([r,i,h],l)=>{o[l*3]=r,o[l*3+1]=i,o[l*3+2]=h}),{directions:n,radii:a,surface:s,faces:o,faceCount:e.length,vertexCount:t.length}}const Vp=(t,e)=>(t+e)/2;function Xp(t,e,n=Vp){const a=Array.from({length:t.vertexCount},(i,h)=>({direction:[t.directions[h*3]??0,t.directions[h*3+1]??0,t.directions[h*3+2]??0],radius:t.radii[h]??1,surface:t.surface[h]??0})),s=new Map,o=(i,h)=>{const l=i<h?`${i}:${h}`:`${h}:${i}`,c=s.get(l);if(c!==void 0)return c;const d=a[i],u=a[h],[f,m,g]=d.direction,[y,p,b]=u.direction,v=Math.hypot(f*d.radius-y*u.radius,m*d.radius-p*u.radius,g*d.radius-b*u.radius),[T,S,I]=[(f+y)/2,(m+p)/2,(g+b)/2],k=Math.hypot(T,S,I)||1,E=n(d.surface,u.surface);a.push({direction:[T/k,S/k,I/k],radius:(d.radius+u.radius)/2+e(v),surface:E});const O=a.length-1;return s.set(l,O),O},r=[];for(let i=0;i<t.faceCount;i+=1){const h=t.faces[i*3],l=t.faces[i*3+1],c=t.faces[i*3+2],d=o(h,l),u=o(l,c),f=o(c,h);r.push([h,d,f],[l,u,d],[c,f,u],[d,u,f])}return Nh(a,r)}function Zp(t,e){return{...t,mesh:e,temperature:new Float32Array(e.vertexCount),faceColour:new Uint8ClampedArray(e.faceCount*3)}}const Ph=(t=4,e=.28,n=.2)=>a=>{const s=sn(a.seed);let o=a.mesh;const r=Float32Array.from(o.surface,()=>s());o={...o,surface:r};for(let i=0;i<t;i+=1)o=Xp(o,h=>h*e*(s()-.5),(h,l)=>{const c=.5+(s()-.5)*(h-l)*n;return Math.min(1,Math.max(0,h*(1-c)+l*c))});return Zp(a,o)},Rh=(t=.55)=>e=>{const n=Float32Array.from(e.mesh.radii).sort(),a=Math.min(n.length-1,Math.floor(n.length*t)),s=n[a]??1,o=Float32Array.from(e.mesh.radii,r=>Math.max(r,s));return{...e,mesh:{...e.mesh,radii:o},seaRadius:s}};function Qp(t,e){return Math.abs(t.mesh.directions[e*3+1]??0)}const Fh=({equator:t=1,pole:e=.05,peak:n=0}={})=>a=>{const s=new Float32Array(a.mesh.vertexCount),o=a.mesh.radii,r=o.reduce((l,c)=>Math.min(l,c),1/0),h=o.reduce((l,c)=>Math.max(l,c),-1/0)-r||1;for(let l=0;l<a.mesh.vertexCount;l+=1){const c=((o[l]??1)-r)/h,d=Qp(a,l)**2.2;s[l]=t+(e-t)*d+(n-t)*c}return{...a,temperature:s}},ue=(1+Math.sqrt(5))/2,eg=[[-1,ue,0],[1,ue,0],[-1,-ue,0],[1,-ue,0],[0,-1,ue],[0,1,ue],[0,-1,-ue],[0,1,-ue],[ue,0,-1],[ue,0,1],[-ue,0,-1],[-ue,0,1]],tg=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];function ng(){const t=eg.map(([e,n,a])=>{const s=Math.hypot(e,n,a);return{direction:[e/s,n/s,a/s],radius:1,surface:0}});return Nh(t,tg.map(e=>[...e]))}function ag(t){const e=ng();return{seed:t,mesh:e,temperature:new Float32Array(e.vertexCount),faceColour:new Uint8ClampedArray(e.faceCount*3),seaRadius:0}}const sg=[Ph(),Rh(),Fh(),Lh];function og(t,e=sg){return e.reduce((n,a)=>a(n),ag(t))}function Bh(t){return og(t.seed,[Ph(t.levels,t.roughness),Rh(t.share),Fh(),Lh])}const qr=.3,rg=[-.5,.45,.74],ig=1.02;class Rs{size;pixels;depth;view=new Float32Array(0);screen=new Float32Array(0);constructor(e,n=new Uint8ClampedArray(e*e*4)){if(n.length!==e*e*4)throw new Error(`SphereRaster: ${e}×${e} needs ${e*e*4} bytes, not ${n.length}`);this.size=e,this.pixels=n,this.depth=new Float32Array(e*e)}paint(e,n){const{size:a,pixels:s,depth:o}=this;s.fill(0),o.fill(-1/0);const[r,i,h]=hg(n.light??rg),l=n.tilt??-.38,c=Math.cos(l),d=Math.sin(l),u=Math.cos(n.rotation),f=Math.sin(n.rotation),{directions:m,radii:g,faces:y,faceCount:p,vertexCount:b}=e.mesh;let v=1;for(let k=0;k<b;k+=1){const E=g[k]??1;E>v&&(v=E)}const T=a/(2*v*ig);this.view.length<b*3&&(this.view=new Float32Array(b*3),this.screen=new Float32Array(b*3));const S=this.view,I=this.screen;for(let k=0;k<b;k+=1){const E=g[k]??1,O=(m[k*3]??0)*E,H=(m[k*3+1]??0)*E,C=(m[k*3+2]??0)*E,M=O*u-C*f,L=O*f+C*u,$=H*c+L*d,j=-H*d+L*c;S[k*3]=M,S[k*3+1]=$,S[k*3+2]=j,I[k*3]=a/2+M*T,I[k*3+1]=a/2-$*T,I[k*3+2]=j}for(let k=0;k<p;k+=1){const E=y[k*3]??0,O=y[k*3+1]??0,H=y[k*3+2]??0,C=I[E*3],M=I[E*3+1],L=I[E*3+2],$=I[O*3],j=I[O*3+1],N=I[O*3+2],P=I[H*3],B=I[H*3+1],_=I[H*3+2],J=($-C)*(B-M)-(j-M)*(P-C);if(J>=0)continue;const Ee=S[E*3],Xe=S[E*3+1],vt=S[E*3+2],kt=S[O*3]-Ee,on=S[O*3+1]-Xe,xt=S[O*3+2]-vt,Ze=S[H*3]-Ee,Qe=S[H*3+1]-Xe,Fe=S[H*3+2]-vt,$t=on*Fe-xt*Qe,W=xt*Ze-kt*Fe,q=kt*Qe-on*Ze,z=Math.hypot($t,W,q)||1,Z=$t/z*r+W/z*i+q/z*h,$e=qr+(1-qr)*Math.max(0,Z),et=(e.faceColour[k*3]??0)*$e,rn=(e.faceColour[k*3+1]??0)*$e,Vh=(e.faceColour[k*3+2]??0)*$e,Xh=Math.max(0,Math.floor(Math.min(C,$,P))),Zh=Math.min(a-1,Math.ceil(Math.max(C,$,P))),Qh=Math.max(0,Math.floor(Math.min(M,j,B))),el=Math.min(a-1,Math.ceil(Math.max(M,j,B)));for(let hn=Qh;hn<=el;hn+=1)for(let ln=Xh;ln<=Zh;ln+=1){const na=ln+.5,aa=hn+.5,tl=($-C)*(aa-M)-(j-M)*(na-C),Bs=(P-$)*(aa-j)-(B-j)*(na-$),Ds=(C-P)*(aa-B)-(M-B)*(na-P);if(tl>0||Bs>0||Ds>0)continue;const Hs=Bs/J,Ws=Ds/J,qs=L*Hs+N*Ws+_*(1-Hs-Ws),tt=hn*a+ln;qs<=o[tt]||(o[tt]=qs,s[tt*4]=et,s[tt*4+1]=rn,s[tt*4+2]=Vh,s[tt*4+3]=255)}}return s}}function hg([t,e,n]){const a=Math.hypot(t,e,n)||1;return[t/a,e/a,n/a]}const lg=.2,cg=.36,dg=[{upTo:20,dark:4,bright:12},{upTo:70,dark:6,bright:14},{upTo:160,dark:2,bright:10},{upTo:198,dark:3,bright:11},{upTo:275,dark:1,bright:9},{upTo:330,dark:5,bright:13},{upTo:360,dark:4,bright:12}];function ug(t,e,n){const a=Math.max(t,e,n),s=Math.min(t,e,n),o=(a+s)/2/255;if((a===0?0:(a-s)/a)<lg)return o<.08?0:o<.5?8:o<.8?7:15;const i=a-s;let h;a===t?h=(e-n)/i*60:a===e?h=(2+(n-t)/i)*60:h=(4+(t-e)/i)*60,h<0&&(h+=360);const l=dg.find(({upTo:c})=>h<c)??{dark:4,bright:12};return o<.08?0:o>=cg?l.bright:l.dark}function mg(t,e){const n=(s,o)=>{const r=(o*e+s)*4;return(t[r+3]??0)===0?-1:ug(t[r]??0,t[r+1]??0,t[r+2]??0)},a=[];for(let s=0;s<e/2;s+=1){const o=[];for(let r=0;r<e;r+=1)o.push({top:n(r,s*2),bottom:n(r,s*2+1)});a.push(o)}return a}const Wt=["#000000","#0000aa","#00aa00","#00aaaa","#aa0000","#aa00aa","#aa5500","#aaaaaa","#555555","#5555ff","#55ff55","#55ffff","#ff5555","#ff55ff","#ffff55","#ffffff"];function fg(t){const e=({top:n,bottom:a})=>n<0&&a<0?"<span> </span>":n<0?`<span style="color:${Wt[a]}">▄</span>`:a<0?`<span style="color:${Wt[n]}">▀</span>`:n===a?`<span style="color:${Wt[n]}">█</span>`:`<span style="color:${Wt[n]};background:${Wt[a]}">▀</span>`;return t.map(n=>n.map(e).join("")).join(`
`)}const ks={levels:4,roughness:.28,share:.55},qt=32;let Ua=null,_r=null,Ja=null;function zr(t,e){const n=document.querySelector('link[rel="icon"]');if(!n)return;Ua??=Object.assign(document.createElement("canvas"),{width:qt,height:qt});const a=Ua.getContext("2d");a&&(Ja??=a.createImageData(qt,qt),_r??=new Rs(qt,Ja.data),_r.paint(t,{rotation:e}),a.putImageData(Ja,0,0),n.type="image/png",n.href=Ua.toDataURL("image/png"))}const pg=90,gg=1e3/12,wg=400,Ka=new WeakMap;function yg(t){const e=(t.textContent??"").split(`
`);return{columns:Math.max(...e.map(n=>n.length)),rows:e.length}}function xs(t,e){Ka.get(t)?.();const n=e??{...ks,seed:Math.floor(Math.random()*16777215)},{columns:a,rows:s}=yg(t),o=Math.min(a,s*2),r=Bh(n),i=new Rs(o);t.dataset.seed=String(n.seed),t.title=`World ${n.seed}, ${r.mesh.faceCount.toLocaleString("en")} triangles`;const h=y=>{t.innerHTML=fg(mg(i.paint(r,{rotation:y}),o)),t.classList.add("grown")};if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return h(.6),zr(r,.6),Ka.set(t,()=>{}),()=>{};let l=0,c=-1/0,d=-1/0;const u=performance.now(),f=Zn(t),m=y=>{const p=(y-u)/1e3/pg*Math.PI*2;f.onScreen()&&y-c>=gg&&(h(p),c=y),y-d>wg&&(zr(r,p),d=y),l=requestAnimationFrame(m)};l=requestAnimationFrame(m);const g=()=>{cancelAnimationFrame(l),f.stop()};return Ka.set(t,g),g}function bg(){const t=document.querySelector(".planet");return t?xs(t,qn.saved()??void 0):()=>{}}const lt=360,vg=60,kg=1.4,Gr=Math.PI*2/vg,Yr=Math.PI*4;function xg(t){const e=w("canvas",{class:"world",width:lt,height:lt}),n=e.getContext("2d");if(!n)return()=>{};const a={...ks,seed:Math.floor(Math.random()*16777215)},s=n.createImageData(lt,lt),o=new Rs(lt,s.data),r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let i,h=.6,l=-.38,c=!r,d=null,u=0,f=performance.now();const m=w("p",{class:"hint"}),g=document.querySelector(".planet"),y=(20*4**ks.levels).toLocaleString("en"),p=()=>{i=Bh(a);const M=qn.saved();m.textContent=`World ${a.seed}: ${i.mesh.faceCount.toLocaleString("en")} triangles. `+(M?`The header is keeping world ${M.seed}, ${(20*4**M.levels).toLocaleString("en")} triangles.`:`The header grows a new one every visit, ${y} triangles each.`),v.hidden=!M,T()},b=w("button",{type:"button",onclick:()=>{qn.remember({...a}),g&&xs(g,{...a}),p()}},"Put it in the header"),v=w("button",{type:"button",hidden:!0,onclick:()=>{qn.forget(),g&&xs(g),p()}},"Let the header grow its own"),T=()=>{o.paint(i,{rotation:h,tilt:l}),n.putImageData(s,0,0)};let S=0;const I=Zn(e),k=M=>{const L=Math.min(.1,(M-f)/1e3);if(!d&&I.onScreen()){if(u!==0){u*=Math.exp(-L/kg);const $=c?Gr:0;(Math.abs(u)<=$||Math.abs(u)<.01)&&(u=0)}u!==0?(h-=u*L,T()):c&&(h+=Gr*L,T()),gs.send({byRadians:u*L,tiltedBy:0,seconds:L})}f=M,S=requestAnimationFrame(k)};e.addEventListener("pointerdown",M=>{d={x:M.clientX,y:M.clientY,at:M.timeStamp},u=0,e.setPointerCapture(M.pointerId)}),e.addEventListener("pointermove",M=>{if(!d)return;const L=e.clientWidth||lt,$=(M.clientX-d.x)/L*Math.PI;h-=$;const j=l;l=Math.max(-1.2,Math.min(1.2,l-(M.clientY-d.y)/L*Math.PI)),gs.send({byRadians:$,tiltedBy:l-j,seconds:0});const N=Math.max(.004,(M.timeStamp-d.at)/1e3);u=Math.max(-Yr,Math.min(Yr,u*.4+$/N*.6)),d={x:M.clientX,y:M.clientY,at:M.timeStamp},T()}),e.addEventListener("pointerup",M=>{d&&M.timeStamp-d.at>120&&(u=0),d=null,f=performance.now()}),e.addEventListener("pointercancel",()=>{d=null,u=0});const E=w("input",{type:"number",min:0,value:a.seed,onchange:()=>{a.seed=Math.max(0,Math.floor(Number(E.value)||0)),p()}}),O=w("button",{type:"button",onclick:()=>{a.seed=Math.floor(Math.random()*16777215),E.value=String(a.seed),p()}},"Another world"),H=w("button",{type:"button",onclick:()=>{c=!c,H.textContent=c?"Hold still":"Turn"}},c?"Hold still":"Turn"),C=(M,L,$,j,N,P)=>{const B=w("output",{},P(a[M])),_=w("input",{type:"range",min:$,max:j,step:N,value:a[M],onchange:()=>{a[M]=Number(_.value),B.textContent=P(a[M]),p()},oninput:()=>{B.textContent=P(Number(_.value))}});return w("label",{},`${L}: `,B,_)};return t.append(e,w("div",{class:"row"},w("span",{},"Seed "),E,O,H,b,v),w("div",{class:"dials"},C("levels","Detail",2,6,1,M=>`${M} splits`),C("roughness","Roughness",.02,1,.01,M=>M.toFixed(2)),C("share","Sea",0,.98,.01,M=>`${Math.round(M*100)}%`)),m),p(),S=requestAnimationFrame(k),()=>{cancelAnimationFrame(S),I.stop()}}const $g={name:"world",apps:{worlds:xg},install:()=>bg()},Ue=[$g,dp,Vf,ep,Id,Fu,Sd,qp,sm,Ym,hm,pp,ad,Am,Su,Wu,Ku,su,Jd,lm,Cc,Vm,wf,xf,Lf,Hf,Gf];function Tg(t){return Object.assign({},...t.flatMap(e=>e.programs??[]).map(e=>({[e.name]:rh(e)})),...t.map(e=>e.apps??{}))}const Ur="flags",Jr="flags-chosen",Kr="flags-drawn";function Va(t){try{return localStorage.getItem(t)??""}catch{return""}}function Xa(t,e){try{e?localStorage.setItem(t,e):localStorage.removeItem(t)}catch{}}class Sg{on;picked;lots;constructor(){this.on=new Set((Va(Ur)||document.documentElement.dataset.flags||"").split(" ").filter(Boolean)),this.picked=new Set(Va(Jr).split(" ").filter(Boolean));let e={};try{e=JSON.parse(Va(Kr)||"{}")}catch{}this.lots=e}isOn(e){return this.on.has(e)}chosen(e){return this.picked.has(e)}drawn(e){return this.lots[e]}set(e,n){this.picked.add(e),delete this.lots[e],this.keep(e,n)}draw(e,n){this.lots[e]=n,this.keep(e,n)}keep(e,n){n?this.on.add(e):this.on.delete(e);const a=[...this.on].join(" ");Xa(Ur,a),Xa(Jr,[...this.picked].join(" ")),Xa(Kr,Object.keys(this.lots).length?JSON.stringify(this.lots):""),a?document.documentElement.dataset.flags=a:delete document.documentElement.dataset.flags}}function Mg(){return[document,navigator].map(e=>e.modelContext).find(e=>typeof e?.registerTool=="function")}function Vr(t,e){const n=[];for(const a of document.querySelectorAll(".app[data-app]")){const s=t[a.dataset.app??""]?.(a,e);s&&n.push(s)}return()=>{for(const a of n)a()}}function Ag(t){const e={},n=t.fields.theme;(n==="dark"||n==="light")&&(e["data-page-theme"]=n);const a=t.fields.sky;return a&&(e["data-sky"]=a),e}const Ig=["data-page-theme","data-sky"];function Eg(t,e){return e==="/"?t==="/":t.startsWith(e)}const Dh=7.8,Xr=17,Hh=12,jg=8,Za=28,Zr=44,en=8,Cg=40,Og=16;function Lg(t){const e=new Map;for(const v of t.nodes){const T=v.label.split(`
`),S=Math.max(...T.map(I=>I.length),1);e.set(v.id,{id:v.id,label:v.label,real:!0,rank:-1,along:Math.max(40,S*Dh+Hh*2),across:T.length*Xr+jg*2,pos:0,preds:[],succs:[]})}for(const v of t.edges)if(!e.has(v.from)||!e.has(v.to))throw new Error(`flow: edge ${v.from} --> ${v.to} names a node that is not there`);const n=Ng(t),a={...t,edges:t.edges.map((v,T)=>n.has(T)?{...v,from:v.to,to:v.from}:v)};for(const v of a.edges){const T=e.get(v.from),S=e.get(v.to);T.succs.push(S),S.preds.push(T)}Pg(e);const s=Rg(e,a),o=Fg(e);Bg(o);const r=o.length,i=o.map(v=>Math.max(Xr,...v.map(T=>T.real?T.across:0))),h=[];let l=en;for(let v=0;v<r;v+=1)h.push(l),l+=(i[v]??0)+Zr;const c=v=>(h[v.rank]??0)+((i[v.rank]??0)-(v.real?v.across:0))/2,d=Math.max(...[...e.values()].map(v=>v.pos+v.along))+en,u=l-Zr+en,f=t.direction==="LR",m=(v,T)=>f?[T,v]:[v,T],g=[...e.values()].filter(v=>v.real).map(v=>{const[T,S]=m(v.pos,c(v));return{id:v.id,label:v.label,x:T,y:S,width:f?v.across:v.along,height:f?v.along:v.across}}),y=t.edges.map((v,T)=>{const S=s[T]??[],I=S[0],k=S[S.length-1];if(!I||!k)throw new Error("flow: an edge lost its ends");const E=t.edges.some(L=>L.from===v.to&&L.to===v.from),O=Math.min(Cg,I.along/3,k.along/3),H=E?n.has(T)?O:-O:0,C=[m(I.pos+I.along/2+H,c(I)+I.across),...S.slice(1,-1).map(L=>m(L.pos+L.along/2,c(L)+(i[L.rank]??0)/2)),m(k.pos+k.along/2+H,c(k))],M=n.has(T)?C.reverse():C;return v.label===void 0?{from:v.from,to:v.to,points:M}:{from:v.from,to:v.to,label:v.label,points:M}}),[p,b]=m(d,u);return{direction:t.direction,width:p,height:b,nodes:g,edges:y}}function Ng(t){const e=new Set,n=new Map,a=s=>{n.set(s,"walking"),t.edges.forEach((o,r)=>{o.from!==s||e.has(r)||(n.get(o.to)==="walking"?e.add(r):n.has(o.to)||a(o.to))}),n.set(s,"done")};for(const s of t.nodes)n.has(s.id)||a(s.id);return e}function Pg(t){const e=new Set,n=a=>{if(a.rank>=0)return a.rank;if(e.has(a))throw new Error(`flow: there is a cycle through ${a.id}, and a flow has a direction`);return e.add(a),a.rank=a.preds.length===0?0:Math.max(...a.preds.map(n))+1,e.delete(a),a.rank};for(const a of t.values())n(a)}function Rg(t,e){let n=0;return e.edges.map(a=>{const s=t.get(a.from),o=t.get(a.to);if(!s||!o)return[];const r=[s];let i=s;for(let h=s.rank+1;h<o.rank;h+=1){n+=1;const l={id:`\0${n}`,label:"",real:!1,rank:h,along:Math.max(Og,(a.label?.length??0)*Dh+Hh),across:0,pos:0,preds:[i],succs:[]};t.set(l.id,l),i.succs.push(l),r.push(l),i=l}return i!==s&&(i.succs.push(o),o.preds.push(i),s.succs.splice(s.succs.indexOf(o),1),o.preds.splice(o.preds.indexOf(s),1)),r.push(o),r})}function Fg(t){const e=Math.max(...[...t.values()].map(r=>r.rank))+1,n=Array.from({length:e},()=>[]);for(const r of t.values())n[r.rank]?.push(r);const a=new Map,s=r=>r.forEach((i,h)=>a.set(i,h));n.forEach(s);const o=(r,i)=>i.length===0?a.get(r)??0:i.reduce((h,l)=>h+(a.get(l)??0),0)/i.length;for(let r=0;r<4;r+=1){for(let i=1;i<e;i+=1){const h=n[i]??[];h.sort((l,c)=>o(l,l.preds)-o(c,c.preds)),s(h)}for(let i=e-2;i>=0;i-=1){const h=n[i]??[];h.sort((l,c)=>o(l,l.succs)-o(c,c.succs)),s(h)}}return n}function Bg(t){const e=r=>r.reduce((i,h)=>i+h.along,0)+Za*Math.max(0,r.length-1),n=Math.max(...t.map(e));for(const r of t){let i=en+(n-e(r))/2;for(const h of r)h.pos=i,i+=h.along+Za}const a=r=>r.pos+r.along/2,s=(r,i)=>{const h=r.map(d=>{const u=i(d);return u.length===0?a(d):u.reduce((f,m)=>f+a(m),0)/u.length});let l=-1/0;r.forEach((d,u)=>{d.pos=Math.max((h[u]??0)-d.along/2,l),l=d.pos+d.along+Za});const c=r.reduce((d,u,f)=>d+a(u)-(h[f]??0),0)/Math.max(1,r.length);for(const d of r)d.pos-=c};for(let r=0;r<3;r+=1){for(let i=1;i<t.length;i+=1)s(t[i]??[],h=>h.preds);for(let i=t.length-2;i>=0;i-=1)s(t[i]??[],h=>h.succs)}const o=Math.min(...t.flat().map(r=>r.pos));for(const r of t.flat())r.pos+=en-o}const $s=/(\w[\w.-]*)(?:\[([^\]]*)\])?/,Dg=new RegExp(`^${$s.source}\\s*-->(?:\\|([^|]*)\\|)?\\s*${$s.source}$`),Hg=new RegExp(`^${$s.source}$`),Wg=/^(?:flow\s+)?(TD|LR)$/i;function qg(t){const e=new Map,n=[];let a="TD";const s=(i,h)=>{i&&(e.has(i)||e.set(i,i),h!==void 0&&e.set(i,h.replace(/\\n/g,`
`)))},o=t.split(`
`);let r=!0;return o.forEach((i,h)=>{const l=i.trim();if(l===""||l.startsWith("%"))return;if(r){r=!1;const u=Wg.exec(l);if(u){a=u[1]?.toUpperCase()==="LR"?"LR":"TD";return}}const c=Dg.exec(l);if(c){const[,u,f,m,g,y]=c;s(u,f),s(g,y),n.push(m===void 0?{from:u??"",to:g??""}:{from:u??"",to:g??"",label:m});return}const d=Hg.exec(l);if(d){s(d[1],d[2]);return}throw new Error(`flow: cannot read line ${h+1}: "${l}"`)}),{direction:a,nodes:[...e].map(([i,h])=>({id:i,label:h})),edges:n}}const _g=20,Qr=17;function zg(t){let e=5381;for(let n=0;n<t.length;n+=1)e=(e*33^t.charCodeAt(n))>>>0;return e.toString(36)}const X=t=>String(Math.round(t*10)/10);function Gg(t,e){const[n,...a]=t.points;if(!n)return"";let s=`M${X(n[0])},${X(n[1])}`,o=n;for(const r of a){const[i,h]=o,[l,c]=r,d=e?[(i+l)/2,h]:[i,(h+c)/2],u=e?[(i+l)/2,c]:[l,(h+c)/2];s+=` C${X(d[0])},${X(d[1])} ${X(u[0])},${X(u[1])} ${X(l)},${X(c)}`,o=r}return s}function Yg(t){const{points:e}=t,n=e[Math.floor((e.length-1)/2)]??[0,0],a=e[Math.ceil((e.length-1)/2)]??n;return[(n[0]+a[0])/2,(n[1]+a[1])/2]}function Ug(t){const e=Lg(qg(t)),n=e.direction==="LR",a=`arrow-${zg(t)}`,s=e.edges.map(h=>{const l=`<path class="edge" d="${Gg(h,n)}" marker-end="url(#${a})"/>`;if(h.label===void 0)return l;const[c,d]=Yg(h);return`${l}<text class="edge-label" x="${X(c)}" y="${X(d)}" text-anchor="middle" dominant-baseline="middle">${x(h.label)}</text>`}).join(""),o=e.nodes.map(h=>{const l=h.x+h.width/2,c=h.label.split(`
`),d=h.y+(h.height-c.length*Qr)/2,u=c.map((f,m)=>`<tspan x="${X(l)}" y="${X(d+_g-8+m*Qr)}">${x(f)}</tspan>`).join("");return`<g class="node"><rect x="${X(h.x)}" y="${X(h.y)}" width="${X(h.width)}" height="${X(h.height)}" rx="4"/><text text-anchor="middle" dominant-baseline="middle">${u}</text></g>`}).join(""),r=X(e.width),i=X(e.height);return`<figure class="flow"><svg class="flow" viewBox="0 0 ${r} ${i}" width="${r}" height="${i}" style="max-width: 100%; height: auto" role="img"><defs><marker id="${a}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z"/></marker></defs>${s}${o}</svg></figure>`}const _t={">=":"≥","<=":"≤","!=":"≠","->":"→","...":"…","*":"·",star:"∗","-":"−","'":"′",cdot:"·",inf:"∞",alpha:"α",beta:"β",gamma:"γ",delta:"δ",epsilon:"ε",lambda:"λ",mu:"μ",pi:"π",sigma:"σ",tau:"τ",phi:"φ",omega:"ω",Delta:"Δ",Sigma:"Σ"},ei={sum:"∑",prod:"∏",int:"∫"},Jg=new Set(["max","min","lim","log","ln","sin","cos","exp","arg"]);function Kg(t){const e=[],n=/\s+|\.\.\.|>=|<=|!=|->|\d+(?:\.\d+)?|[A-Za-z]+|[{}]|[_^]|./g;for(const[a]of t.matchAll(n))/^\s+$/.test(a)||(a==="{"||a==="}"?e.push({kind:"brace",text:a}):a==="_"||a==="^"?e.push({kind:"script",text:a}):/^\d/.test(a)?e.push({kind:"number",text:a}):/^[A-Za-z]/.test(a)?e.push({kind:"name",text:a}):e.push({kind:"sign",text:a}));return e}function Vg(t){return t.split(`
`).map(e=>e.trim()).filter(Boolean).map(e=>`<math display="block"><mrow>${new Xg(Kg(e)).expression()}</mrow></math>`).join("")}class Xg{constructor(e){this.tokens=e}tokens;at=0;limits=!1;expression(){let e="";for(;this.at<this.tokens.length&&this.peek()?.text!=="}"&&this.peek()?.text!==")";)e+=this.item();return e}item(){let e=this.atom();const n=this.limits;this.limits=!1;let a=null,s=null;for(;this.peek()?.kind==="script";){const r=this.next().text,i=`<mrow>${this.group()}</mrow>`;r==="_"?a=i:s=i}const o=a&&s?n?"munderover":"msubsup":a?n?"munder":"msub":n?"mover":"msup";return!a&&!s?e:`<${o}>${e}${a??""}${s??""}</${o}>`}atom(){const e=this.next();if(e.kind==="brace"&&e.text==="{"){const n=this.expression();return this.expect("}"),`<mrow>${n}</mrow>`}if(e.text==="("){const n=this.expression();return this.peek()?.text===")"&&(this.at+=1),`<mrow><mo>(</mo>${n}<mo>)</mo></mrow>`}return e.kind==="number"?`<mn>${e.text}</mn>`:e.kind==="name"?e.text==="frac"?`<mfrac><mrow>${this.group()}</mrow><mrow>${this.group()}</mrow></mfrac>`:e.text==="sqrt"?`<msqrt>${this.group()}</msqrt>`:e.text==="text"?`<mtext>${x(this.phrase())}</mtext>`:e.text in ei?(this.limits=!0,`<mo>${ei[e.text]}</mo>`):Jg.has(e.text)?`<mo>${e.text}</mo>`:e.text in _t?/^[α-ωΑ-Ω]$/.test(_t[e.text])?`<mi>${_t[e.text]}</mi>`:`<mo>${_t[e.text]}</mo>`:`<mi>${x(e.text)}</mi>`:`<mo>${x(_t[e.text]??e.text)}</mo>`}group(){if(this.peek()?.text==="{"){this.next();const e=this.expression();return this.expect("}"),e}return this.atom()}phrase(){this.expect("{");const e=[];for(;this.at<this.tokens.length&&this.peek()?.text!=="}";)e.push(this.next().text);return this.expect("}"),e.join(" ")}peek(){return this.tokens[this.at]}next(){const e=this.tokens[this.at];if(!e)throw new Error("the formula ends early");return this.at+=1,e}expect(e){if(this.peek()?.text!==e)throw new Error(`expected ${e} in the formula`);this.at+=1}}function Zg(t,e){const a=/^https?:/.test(e)?' target="_blank" rel="noopener noreferrer"':"",s=/^\d+$/.test(t)?' class="ref"':"";return`<a href="${x(e)}"${a}${s}>${t}</a>`}const Qg=["large","wide","card"];function ew(t,e,n){if(n==="card dark"){const o=e.replace(/(\.[a-z]+)$/,"-dark$1");return`<img src="${x(e)}" alt="${x(t)}" class="card shot-light" loading="lazy"><img src="${x(o)}" alt="${x(t)}" class="card shot-dark" loading="lazy">`}const a=n&&Qg.includes(n)?` class="${n}"`:"",s=n==="card"?' loading="lazy"':"";return`<img src="${x(e)}" alt="${x(t)}"${a}${s}>`}const tw=/(`[^`]+`|!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)|\[[^[\]]+\]\([^)\s]+\))/g,nw=/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/,aw=/^\[([^[\]]+)\]\(([^)\s]+)\)$/;function Wh(t){return t.split(tw).map(e=>{if(e.startsWith("`")&&e.endsWith("`")&&e.length>1)return`<code>${x(e.slice(1,-1))}</code>`;const n=nw.exec(e);if(n)return ew(n[1]??"",n[2]??"",n[3]);const a=aw.exec(e);return a?Zg(Wh(a[1]??""),a[2]??""):x(e)}).join("")}function sw(t){const e=[];return t.replace(/<code>[\s\S]*?<\/code>/g,a=>`\0${e.push(a)-1}\0`).replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/(^|[^*])\*([^*]+)\*/g,"$1<em>$2</em>").replace(/ {2,}\n/g,"<br>").replace(/\n/g," ").replace(/ -- /g," — ").replace(/\u0000(\d+)\u0000/g,(a,s)=>e[Number(s)]??"")}function Ie(t){return sw(Wh(t))}function ow(t){const e=t.split(`
`).map(f=>f.trim()).filter(Boolean),n=e.find(f=>!f.includes(" :: ")),a=e.filter(f=>f.includes(" :: ")).map(f=>{const m=f.indexOf(" :: ");return{left:f.slice(0,m).trim(),right:f.slice(m+4).trim()}}),s=a.filter(({left:f})=>f.startsWith("=")).map(({left:f,right:m})=>({value:Number(f.slice(1)),name:m})),o=a.filter(({left:f})=>!f.startsWith("=")).map(({left:f,right:m})=>{const[g="",y]=m.split("|").map(b=>b.trim()),p=Number(g.replace(/!$/,"").trim());return{label:f,value:p,shown:y??String(p),marked:g.endsWith("!")}}),r=Math.max(0,...o.map(({value:f})=>f),...s.map(({value:f})=>f))||1,i=f=>(Math.max(0,f)/r).toFixed(3),h=s[0],l=o.map(({label:f,value:m,shown:g,marked:y})=>`<tr${y?' class="marked"':""}><th scope="row">${Ie(f)}</th><td><span class="bar" style="--p:${i(m)}"></span><span class="value">${x(g)}</span></td></tr>`).join(""),c=h?` style="--rule:${i(h.value)}"`:"",d=h?` The line is ${x(h.name)}, at ${h.value}.`:"",u=n||h?`<figcaption>${n?Ie(n)+".":""}${d}</figcaption>`:"";return`<figure class="bars"><table${c}${h?' class="ruled"':""}><tbody>${l}</tbody></table>${u}</figure>`}function rw(t){return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}const ti=/^(?:[-*]|\d+\.)\s/;function iw(t,e,n){if(!ti.test(t[0]??""))return!1;const a=e.slice(n).find(s=>s.trim()!=="");return a!==void 0&&ti.test(a)}function hw(t){const e=[],n=t.replace(/\r\n?/g,`
`).split(`
`);let a=[],s=!1;return n.forEach((o,r)=>{if(o.startsWith("```")){s=!s,a.push(o),s||(e.push(a),a=[]);return}if(!s&&o.trim()===""){if(iw(a,n,r+1))return;a.length&&e.push(a),a=[];return}a.push(o)}),a.length&&e.push(a),e}function lw(t){const e=/^(#{1,4})\s+(.*)$/.exec(t[0]??"");if(!e||!t.slice(0,-1).every(o=>/ {2,}$/.test(o)))return null;const a=e[1]?.length??1,s=[e[2]??"",...t.slice(1)].join(`
`);return`<h${a} id="${rw(s)}">${Ie(s)}</h${a}>`}function cw(t){if(!t[0]?.startsWith("```"))return null;const e=t[0].slice(3).trim(),n=t.slice(1,-1).join(`
`);return e==="flow"?Ug(n):e==="bars"?ow(n):e==="math"?Vg(n):e==="slides"||e.startsWith("slides ")?gh(n,e.slice(6).trim()):`<pre><code>${le(n,e)}</code></pre>`}function dw(t,e){const n=[];for(const a of t)e.test(a)?n.push(a.replace(e,"")):n.length&&(n[n.length-1]+=`
${a.trim()}`);return n}function uw(t){const e=t[0]??"",n=/^\d+\.\s/.test(e),a=/^[-*]\s/.test(e);if(!n&&!a)return null;const s=n?/^\d+\.\s+/:/^[-*]\s+/;if(!t.every(i=>s.test(i)||/^\s/.test(i)))return null;const o=n?"ol":"ul",r=dw(t,s).map(i=>`<li>${Ie(i)}</li>`).join("");return`<${o}>${r}</${o}>`}function mw(t){return t.every(n=>n.includes(" :: "))?`<dl>${t.map(n=>{const a=n.indexOf(" :: ");return[n.slice(0,a),n.slice(a+4)]}).map(([n,a])=>`<dt>${Ie(n)}</dt><dd>${Ie(a)}</dd>`).join("")}</dl>`:null}function fw(t){if(!t.every(n=>n.startsWith(">")))return null;const e=t.map(n=>n.replace(/^>\s?/,"")).join(" ");return`<blockquote>${Ie(e)}</blockquote>`}function pw(t){const e=/^::([a-z0-9-]+)((?:\s+--[a-z0-9-]+)*)$/.exec(t[0]??"");if(!e||t.length!==1)return null;const n=(e[2]??"").split(/\s+/).filter(Boolean).map(a=>a.slice(2));return`<div class="app" data-app="${e[1]}"${n.length?` data-dials="${n.join(" ")}"`:""}></div>`}function gw(t){return t.length===1&&/^-{3,}$/.test(t[0]??"")?"<hr>":null}function ww(t){const e=t.length===1&&/^(\\+)$/.exec(t[0]??"");return e?`<div class="space" style="--n:${e[1]?.length??1}"></div>`:null}function yw(t){return t.length===1&&/^!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)$/.test(t[0]??"")?`<figure>${Ie(t[0]??"")}</figure>`:null}function bw(t){return`<p>${Ie(t.join(`
`))}</p>`}const vw=[gw,ww,lw,cw,fw,pw,yw,mw,uw];function qh(t){return hw(t).map(e=>{for(const n of vw){const a=n(e);if(a!==null)return a}return bw(e)}).join(`
`)}function Fs(t){return t==="/"?"~":`~${t.replace(/\/$/,"")}`}function _h(t){return`<ul class="listing">${t.map(n=>`<li><a class="entry" href="${n.route}"><code>${x(n.name)}${n.link?"@":"/"}</code><span class="title">${x(n.title)}</span>`+(n.summary?`<span class="summary">${x(n.summary)}</span>`:"")+"</a></li>").join("")}</ul>`}function zh(t,e){return`<p class="ran"><span class="ps1">${x(t)} $</span> ${x(e)}</p>`}function kw(t,e){const n=t.childrenOf(e.route);return n.length===0?"":`${zh(Fs(e.route),"ls")}
${_h(n)}`}function xw(t,e){const n=t.trailTo(e.route).slice(1).map(a=>a.name).join("/");return zh("~",n?`cd ${n} && cat README.md`:"cat README.md")}function $w(t,e){return`${xw(t,e)}
${qh(e.body)}
${kw(t,e)}`}function Tw(t,e){const n=document.querySelector("main");if(!n)return()=>!1;const a=(s,{push:o=!0,keep:r=!1}={})=>{const i=t.at(s);if(!i)return!1;r||(n.innerHTML=$w(t,i));const h=Ag(i);for(const l of Ig){const c=h[l];c?document.documentElement.setAttribute(l,c):document.documentElement.removeAttribute(l)}document.title=i.route==="/"?"David Rodenas":`${i.title} — David Rodenas`;for(const l of document.querySelectorAll("nav .navlink"))Eg(s,l.getAttribute("href")??"\0")?l.setAttribute("aria-current","page"):l.removeAttribute("aria-current");return o&&(s===window.location.pathname?window.history.replaceState({route:s},"",s):window.history.pushState({route:s},"",s),r||window.scrollTo({top:0})),window.goatcounter?.count?.({path:s,title:document.title}),e(i,r),!0};return document.addEventListener("click",s=>{if(s.defaultPrevented||s.button!==0||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey)return;const o=s.target?.closest("a[href]");if(!o||o.target||o.dataset.run)return;const r=new URL(o.href,window.location.href);if(r.origin!==window.location.origin)return;const i=r.pathname.endsWith("/")?r.pathname:`${r.pathname}/`;t.at(i)&&(s.preventDefault(),i!==window.location.pathname&&a(i))}),window.addEventListener("popstate",()=>{const s=window.location.pathname.endsWith("/")?window.location.pathname:`${window.location.pathname}/`;a(s,{push:!1})}),a}function ni(t,e,n){for(let a=1;a<=Math.min(t.length,e.length)&&t.at(-a)===e.at(-a);a+=1)if(t.at(-a)===`
`)return[t.slice(0,-a),t.slice(-a)+e.slice(0,-a),e.slice(-a)+n];return[t,e,n]}function Sw(t,e){let n=0;for(;n<t.length&&n<e.length&&t[n]===e[n];)n+=1;let a=0;for(;a<t.length-n&&a<e.length-n&&t[t.length-1-a]===e[e.length-1-a];)a+=1;let s=t.slice(0,n),o=t.slice(t.length-a),r=t.slice(n,t.length-a),i=e.slice(n,e.length-a);r?i||([s,r,o]=ni(s,r,o)):[s,i,o]=ni(s,i,o),n=s.length;const h=[];for(let l=r.length-1;l>=0;l-=1)h.push({text:s+r.slice(0,l)+o,caret:n+l});for(let l=1;l<=i.length;l+=1)h.push({text:s+i.slice(0,l)+o,caret:n+l});return h}const Mw=32,Aw=14,Iw=450,Ew=1900,jw=900,Cw=160;function Ow(t){const e=[],n=t[0]?.text??"";let a=n.length>Cw?n:"";for(const s of t){for(const o of Sw(a,s.text))e.push({...o,hold:o.text.length<a.length?Aw:Mw}),a=o.text;a=s.text,s.status?e.push({text:a,hold:Iw},{text:a,status:s.status,hold:Ew}):e.push({text:a,hold:jw})}return e}function Lw(t){return[...t.querySelectorAll(".slide:not(.live)")].map(e=>{const n=e.querySelector("code")?.textContent??"",a=e.querySelector(".slide-status"),s=["red","green","note"].find(o=>a?.classList.contains(o));return a&&s?{text:n,status:{kind:s,text:a.textContent??""}}:{text:n}})}function Nw(t){const e=t.dataset.language??"",n=Lw(t),a=w("code"),s=w("p",{class:"slide-status",hidden:!0}),o=w("div",{class:"slide live"},w("pre",{},a),s),r=l=>{a.innerHTML=l.caret===void 0?le(l.text,e):`${le(l.text.slice(0,l.caret),e)}<span class="caret"></span>${le(l.text.slice(l.caret),e)}`,s.hidden=!l.status,l.status&&(s.className=`slide-status ${l.status.kind}`,s.textContent=l.status.text)},h=Th(t,()=>{o.isConnected||t.querySelector(".slides-screen")?.append(o),t.classList.add("playing");const l=Ow(n);let c=0;return()=>{const d=l[c++];return d?(r(d),d.hold):null}});return()=>{h(),o.remove(),t.classList.remove("playing")}}function ai(t){const e=[...t.querySelectorAll("figure.slides")].map(Nw);return()=>{for(const n of e)n()}}class Pw{typed=[];drafts=[];index=0;get lines(){return this.typed}add(e){this.typed.push(e),this.drafts=[...this.typed,""],this.index=this.typed.length}previous(e){return this.moveTo(this.index-1,e)}next(e){return this.moveTo(this.index+1,e)}moveTo(e,n){return this.drafts.length===0&&(this.drafts=[""]),e<0||e>=this.drafts.length?n:(this.drafts[this.index]=n,this.index=e,this.drafts[e]??n)}}function Rw(t,e,n,a){if(t==="k"){const s=e.slice(n);return{line:e.slice(0,n),caret:n,killed:s||a}}if(t==="u"){const s=e.slice(0,n);return{line:e.slice(n),caret:0,killed:s||a}}return t==="y"?{line:e.slice(0,n)+a+e.slice(n),caret:n+a.length,killed:a}:null}function Gh(t){return t.split(/\s*(?:;|&&)\s*/).map(e=>e.trim().split(/\s+/).filter(Boolean)).filter(e=>e.length>0)}function Ve(t,e){const a=e.startsWith("~")||e.startsWith("/")?[]:t.split("/").filter(Boolean),s=e.replace(/^~/,"").split("/").filter(Boolean),o=[...a];for(const r of s)r!=="."&&(r===".."?o.pop():o.push(r));return o.length===0?"/":`/${o.join("/")}/`}function Fw(t){return t.replace(/(?:^|\/)(?:README\.md|\*)$/,"")||"."}const Bw={name:"cat",usage:"cat <file>",description:"print a page, README.md or * for the one here",run({site:t,cwd:e},[n]){if(!n)return{text:"cat: usage: cat <file>",error:!0};const a=Ve(e,Fw(n)),s=t.at(a);return!s||/\.md$/.test(n)!==/README\.md$/.test(n)?{text:`cat: ${n}: no such file`,error:!0}:{html:qh(s.body),at:s.route}}},Dw={name:"cd",usage:"cd [dir]",description:"go to a directory (the address follows)",run(t,[e="~"]){const n=Ve(t.cwd,e),a=t.site.at(n);return a?(t.cwd=a.route,{at:a.route}):{text:`cd: ${e}: no such directory`,error:!0}}},Hw={name:"clear",usage:"clear",description:"clear what the shell has printed",run(){return{clear:!0}}},Ww={name:"find",usage:"find [path] [word]",description:"every page under a directory; with a word, those it is in the name or title of, then those that say it",run({site:t,cwd:e},n){const[a,s]=n,o=a!==void 0&&(a==="."||a.includes("/")||t.at(Ve(e,a))!==void 0),r=o?a??".":".",i=(o?s:a)?.toLowerCase(),h=Ve(e,r);if(!t.at(h))return{text:`find: ${r}: no such directory`,error:!0};const l=y=>t.childrenOf(y).filter(p=>!p.link).flatMap(p=>[p,...l(p.route)]),c=[t.at(h),...l(h)],d=c.filter(y=>!i||y.route.toLowerCase().includes(i)||y.title.toLowerCase().includes(i)),u=i?c.filter(y=>!d.includes(y)&&`${y.summary}
${y.body}`.toLowerCase().includes(i)):[],f=[...d.map(y=>({page:y,said:""})),...u.map(y=>({page:y,said:" — in the text"}))];if(f.length===0)return{text:`find: nothing under ${r}${i?` with "${i}" in it`:""}`};const m=Math.max(...f.map(({page:y})=>y.route.length)),g=y=>" ".repeat(m-y.route.length);return{text:f.map(({page:y,said:p})=>`${y.route}${g(y)}  # ${y.title}${p}`).join(`
`),html:`<pre class="listing">${f.map(({page:y,said:p})=>`<span class="line"><a href="${x(y.route)}">${x(y.route)}</a>${g(y)}<span class="hint">  # ${x(y.title)}${p}</span></span>`).join("")}</pre>`}}},Qa=40,qw=t=>t.replace(/\]\([^)]*\)/g,"]").replace(/[#*_`>\[\]]/g,"").trim(),_w={name:"grep",usage:"grep <word> [path]",description:"the lines of every page under a directory that say a word",run({site:t,cwd:e},[n,a="."]){if(!n)return{text:"grep: usage: grep <word> [path]",error:!0};const s=Ve(e,a);if(!t.at(s))return{text:`grep: ${a}: no such directory`,error:!0};const o=n.toLowerCase(),r=t.pages.filter(c=>c.route.startsWith(s)).flatMap(c=>c.body.split(`
`).map((d,u)=>({page:c,number:u+1,line:qw(d)})).filter(({line:d})=>d.toLowerCase().includes(o)));if(r.length===0)return{text:`grep: no page under ${a} says "${n}"`};const i=r.slice(0,Qa),h=r.length>Qa?[`… and ${r.length-Qa} more. Give grep a directory to look in.`]:[],l=c=>x(c).replace(new RegExp(x(n).replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"ig"),d=>`<mark>${d}</mark>`);return{text:[...i.map(({page:c,number:d,line:u})=>`${c.route}:${d}: ${u}`),...h].join(`
`),html:`<pre class="listing wrap">${[...i.map(({page:c,number:d,line:u})=>`<span class="line"><a href="${x(c.route)}">${x(c.route)}</a>:${d}: <span class="hint">${l(u)}</span></span>`),...h.map(c=>`<span class="line">${x(c)}</span>`)].join("")}</pre>`}}},zw={name:"help",usage:"help [command]",description:"this",run({commands:t},[e]){if(e){const r=t.find(i=>i.name===e);return r?{text:`${r.usage}
  ${r.description}`}:{text:`help: ${e}: no such command`,error:!0}}const n=Math.max(...t.map(r=>r.usage.length)),a=t.map(r=>`${r.usage.padEnd(n)}  ${r.description}`),s="Tab completes; → takes the grey suggestion. ↑↓ recall. ^K kills to the end of the line, ^U back to the start, ^Y puts it back.",o=t.map(r=>`<dt><a href="#" data-run="help ${r.name}">${x(r.usage)}</a></dt><dd>${x(r.description)}</dd>`).join("");return{text:["Commands:",...a,"",s].join(`
`),html:`<p>Commands:</p><dl class="help">${o}</dl><p>${x(s)}</p>`}}};function Gw(t){const e=t.filter(a=>a.startsWith("-")).flatMap(a=>a.slice(1).split("")),n=t.find(a=>!a.startsWith("-"))??".";return{flags:e,path:n}}function Yw(t,e,n,a){const s=a==="."?"":`${a.replace(/\/$/,"")}/`;return[...e?[{mode:"dr-x",name:"..",title:e.title,summary:e.summary,href:e.route,run:`cd ${s}..`}]:[],{mode:"--r-",name:"README.md",title:t.title,summary:t.summary,href:t.route,run:`cat ${s}README.md`},...n.map(o=>o.link?{mode:"lr-x",name:`${o.name}@`,title:`-> ${o.route}  ${o.title}`,summary:o.summary,href:o.route}:{mode:"dr-x",name:`${o.name}/`,title:o.title,summary:o.summary,href:o.route})]}function si(t){const e=t.run?` data-run="${x(t.run)}"`:"";return`<a href="${x(t.href)}"${e}>${x(t.name)}</a>`}function Uw(t,e){const n=Math.max(...t.map(i=>i.name.length)),a=i=>" ".repeat(n-i.length),s=i=>e?`${i.mode}  ${i.name}${a(i.name)}  ${i.title}${i.summary?` — ${i.summary}`:""}`:`${i.name}${a(i.name)}  # ${i.title}`,o=i=>e?`<span class="line">${i.mode}  ${si(i)}${a(i.name)}  ${x(i.title)}${i.summary?`<span class="hint"> — ${x(i.summary)}</span>`:""}</span>`:`<span class="line">${si(i)}${a(i.name)}<span class="hint">  # ${x(i.title)}</span></span>`,r=e?[`total ${t.length}`]:[];return{text:[...r,...t.map(s)].join(`
`),html:`<pre class="listing">${[...r.map(i=>`<span class="line">${i}</span>`),...t.map(o)].join("")}</pre>`}}const Jw={name:"ls",usage:"ls [-lnrt] [path]",description:"what a directory holds, in the site's own order; -l says more, -n sorts by name, -r reverses, -t as the table at the end of a page",run({site:t,cwd:e},n){const{flags:a,path:s}=Gw(n),o=a.find(c=>!["l","n","r","t"].includes(c));if(o)return{text:`ls: -${o}: no such option. Try ls -l, -n by name, -r reversed, -t as a table`,error:!0};const r=Ve(e,s),i=t.at(r);if(!i)return{text:`ls: ${s}: no such directory`,error:!0};const h=i.parent===null?void 0:t.at(i.parent),l=[...t.childrenOf(r)];if(a.includes("n")&&l.sort((c,d)=>c.name.localeCompare(d.name)),a.includes("r")&&l.reverse(),a.includes("t")){const c=Math.max(0,...l.map(u=>u.name.length+1)),d=u=>`${u.name}${u.link?"@":"/"}`.padEnd(c);return{text:l.map(u=>`${d(u)}  ${u.title}${u.summary?` — ${u.summary}`:""}`).join(`
`),html:_h(l)}}return Uw(Yw(i,h,l,s),a.includes("l"))}},Kw={name:"pwd",usage:"pwd",description:"print where you are",run({cwd:t}){return{text:Fs(t)}}},Yh=[Jw,Dw,Bw,Ww,_w,Kw,zw,Hw];class Vw{context;constructor(e,n,a=Yh){this.context={site:e,cwd:n,commands:a}}get prompt(){return`${Fs(this.context.cwd)} $`}moveTo(e){return this.context.site.at(e)?(this.context.cwd=e,!0):!1}run(e){const n=[];for(const[a="",...s]of Gh(e)){const o=this.context.commands.find(i=>i.name===a),r=o?o.run(this.context,s):{text:`${a}: command not found. Try help`,error:!0};if(n.push(r),r.error)break}return n}complete(e){const n=e.split(/\s+/),a=n.pop()??"",s=n.length===0?"":`${n.join(" ")} `;return(n.length===0?this.commandNames():this.pathNames(a)).filter(r=>r.startsWith(a)).map(r=>s+r)}commandNames(){return this.context.commands.map(e=>e.name).sort()}pathNames(e){const n=e.lastIndexOf("/"),a=n<0?".":e.slice(0,n+1),s=Ve(this.context.cwd,a);if(!this.context.site.at(s))return[];const o=n<0?"":a;return["README.md",...this.context.site.childrenOf(s).map(i=>`${i.name}/`)].map(i=>o+i)}}function Xw(t,e,n){if(t==="")return"help";const s=[...[...e].reverse(),...n].find(o=>o.startsWith(t)&&o!==t);return s?s.slice(t.length):""}function Zw(t){if(t.length===0)return null;const e=[];let n="";for(const a of t)a==="Enter"?(e.push(n),n=""):a==="Backspace"?n=n.slice(0,-1):n+=a;return{finished:e,unfinished:n}}const es="shell-pending",oi={carry(t){try{t&&sessionStorage.setItem(es,t)}catch{}},take(){try{const t=sessionStorage.getItem(es)??"";return sessionStorage.removeItem(es),t}catch{return""}}};function Qw(){window.__stopTyped?.();const t=window.__typed??[];return window.__typed=[],Zw(t)}function ey(t,e,n={}){const a=document.querySelector(".terminal"),s=document.querySelector(".screen"),o=a?.querySelector("form.prompt"),r=o?.querySelector("input"),i=o?.querySelector(".line"),h=o?.querySelector(".suggest"),l=o?.querySelector(".ps1"),c=document.querySelector(".ran.end"),d=c?.querySelector(".ps1"),u=c?.querySelector(".line"),f=c?.querySelector(".typed");if(!a||!s||!o||!r||!i||!h||!l||!c||!d||!u||!f)return null;const m=()=>{l.textContent=g.prompt,d.textContent=g.prompt},g=new Vw(t,e,n.commands),y=new Pw;let p=null;const b=$=>{s.append($)},v=()=>{p?.remove(),p=null},T=()=>{const $=r.selectionStart??r.value.length;i.style.setProperty("--caret",String($)),i.style.setProperty("--typed",String(r.value.length)),f.textContent=r.value,u.style.setProperty("--caret",String($)),h.textContent=$===r.value.length?Xw(r.value,y.lines,g.complete(r.value)):""},S=($,j=$.length)=>{r.value=$,r.setSelectionRange(j,j),T()},I=$=>{if($.clear&&(s.replaceChildren(),n.clearPage?.()),$.html){const j=w("div",{class:$.text?"listing-out":"cat"});j.innerHTML=$.html,b(j)}else $.text&&b(w("pre",{class:$.error?"error":""},$.text))},k=$=>{v();const j=[],N=w("p",{class:"echo"},w("span",{class:"ps1"},g.prompt),` ${$}`);b(N);let P=!1;const B=Gh($).map(_=>_.join(" "));for(let _=0;_<B.length;_+=1){n.heard?.((B[_]??"").split(" ")[0]??"");const[J]=g.run(B[_]??"");if(J){if(j.push(J),I(J),J.html&&!J.text&&(P=!0),J.at&&!n.moveTo?.(J.at))return oi.carry(B.slice(_+1).join(" && ")),window.location.assign(J.at),j;if(J.error)break}}return m(),T(),P?N.scrollIntoView({block:"start"}):window.scrollTo({top:document.documentElement.scrollHeight}),j},E=()=>{if(v(),r.value.trim()===""){S("help");return}const $=g.complete(r.value);$.length===1?S($[0]??r.value):$.length>1&&(p=w("p",{class:"hint"},$.map(j=>j.split(" ").pop()).join("  ")),o.insertAdjacentElement("afterend",p),window.scrollTo({top:document.documentElement.scrollHeight}))};o.addEventListener("submit",$=>{$.preventDefault();const j=r.value.trim();S(""),j&&(y.add(j),k(j))});let O="";r.addEventListener("keydown",$=>{if($.key==="Tab")$.preventDefault(),E();else if($.key==="ArrowUp")$.preventDefault(),S(y.previous(r.value));else if($.key==="ArrowDown")$.preventDefault(),S(y.next(r.value));else if($.key==="ArrowRight"&&r.selectionStart===r.value.length&&h.textContent)$.preventDefault(),S(r.value+h.textContent);else if($.ctrlKey&&!$.metaKey&&!$.altKey){const j=Rw($.key,r.value,r.selectionStart??r.value.length,O);if(!j)return;$.preventDefault(),v(),S(j.line,j.caret),O=j.killed}else v()});for(const $ of["input","keyup","click","focus","select"])r.addEventListener($,T);let H=!0;r.addEventListener("input",()=>{H&&r.value!==""&&window.scrollTo({top:document.documentElement.scrollHeight}),H=r.value===""}),document.addEventListener("selectionchange",()=>{document.activeElement===r&&T()}),s.addEventListener("click",$=>{const j=$.target?.closest("a[data-run]");j?.dataset.run&&($.preventDefault(),k(j.dataset.run))}),window.addEventListener("keydown",$=>{const N=$.target?.matches("input, textarea, select, [contenteditable]")??!1,P=$.key.length===1&&!$.ctrlKey&&!$.metaKey&&!$.altKey;N||!P||r.focus({preventScroll:!1})}),o.addEventListener("click",()=>r.focus()),c.addEventListener("click",()=>r.focus()),T();const C=oi.take();C&&k(C);const M=Qw();if(M){for(const $ of M.finished)$.trim()&&(y.add($.trim()),k($.trim()));S(M.unfinished),r.focus()}return{run:k,moveTo:$=>{g.moveTo($)&&(s.replaceChildren(),m(),T())}}}function ty(t,e){return t.pages.find(n=>n.body.split(`
`).some(a=>a.trim()===`::${e}`))}function ny(t){const e=`${t.label}: ${t.description}`;return"choices"in t?{type:"string",enum:t.choices,default:t.initial,description:e}:{type:"number",minimum:t.min,maximum:t.max,default:t.initial,description:e}}function ay(t){return{type:"object",properties:Object.fromEntries(t.parameters.map(n=>[n.name,ny(n)])),required:[],additionalProperties:!1}}const Uh=t=>t.length<2?t.join(""):`${t.slice(0,-1).join(", ")} or ${t.at(-1)}`;function sy(t,e){if("choices"in t){if(e===void 0)return{value:t.initial};const a=pt(String(e)),s=t.choices.find(o=>pt(o)===a);return s===void 0?{error:`${t.name}: ${String(e)} is not one of ${Uh(t.choices.map(pt))}`}:{value:s}}const n=e===void 0?t.initial:typeof e=="number"?e:typeof e=="string"&&e.trim()!==""?Number(e):Number.NaN;return Number.isFinite(n)?n<t.min||n>t.max?{error:`${t.name}: ${n} is outside ${t.min} to ${t.max}`}:{value:n}:{error:`${t.name}: ${String(e)} is not a number`}}function Jh(t,e){const n=t.parameters.map(o=>o.name),a=Object.keys(e).find(o=>!n.includes(o));if(a!==void 0)return{error:`no option ${a}: choose ${Uh(n)}`};const s={};for(const o of t.parameters){const r=sy(o,e[o.name]);if("error"in r)return r;s[o.name]=r.value}return{values:s}}const oy={amp:"&",lt:"<",gt:">",quot:'"',"#39":"'",nbsp:" "};function ry(t){return t.text?t.text:t.html?t.html.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g,"").replace(/<\/(p|h[1-6]|li|tr|div|pre|dt|dd|figcaption|blockquote)>|<br\s*\/?>/g,`
`).replace(/<[^>]+>/g,"").replace(/&(amp|lt|gt|quot|#39|nbsp);/g,(e,n)=>oy[n]??"").split(`
`).map(e=>e.replace(/\s+/g," ").trim()).filter(Boolean).join(`
`):""}const Kh=t=>`Refused, nothing was run: ${t}`;function iy(t,{site:e,goTo:n}){const a=`.app[data-app="${t}"]`,s=document.querySelector(a);if(s)return s;const o=ty(e,t);return!o||!n(o.route)?null:document.querySelector(a)}function hy(t,e){return{name:t.name,description:`${t.summary}. The reader sees it too: the site goes to the program's page and its dials move to what was asked. Answers in words, then the figures as JSON.`,inputSchema:ay(t),annotations:{readOnlyHint:!0},async execute(n){const a=Jh(t,n);if("error"in a)return Kh(a.error);const s=t.run(a.values);return ly(t.name,a.values,e),`${s.text}

${JSON.stringify(s.data)}`}}}function ly(t,e,n){const a=iy(t,n);a&&(ls(a,e),a.scrollIntoView?.({behavior:"smooth",block:"start"}))}function cy({run:t,programs:e}){return{name:"shell",description:`Runs a line at this site's prompt, as if the reader had typed it, and they see it echoed and answered. The site is laid out as directories of pages: ls, cd, cat README.md, find, grep and help work over it, and so does every program: ${e.map(n=>n.name).join(", ")}. Commands chain with &&.`,inputSchema:{type:"object",properties:{line:{type:"string",description:"the line to run, e.g. `cd projects && ls`"}},required:["line"],additionalProperties:!1},async execute(n){const a=t(String(n.line??"")),s=a.map(ry).filter(Boolean).join(`

`);return a.some(o=>o.error)?Kh(s):s}}}function dy(t,e){if(!t)return()=>{};const n=new AbortController,a=[...e.programs.map(s=>hy(s,e)),cy(e)];for(const s of a)t.registerTool(s,{signal:n.signal});return()=>{n.abort();for(const s of a)t.unregisterTool?.(s.name)}}const uy=[{file:"book/index.md",markdown:`---
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
history at every push, so it is always the commit being published. Play the
history, drag it, or press a commit on the picture of changes, and every
figure below shows the source as it stood then.

::change-player

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
written once and not touched again, and a file is likeliest to change in
the commits right after the one that wrote it.

::change-settling

A file is hottest just after it is written, while what it has to do is
still being settled. Then it cools, and stays cool; and most of what
changes it after that comes with something else, a commit that brings new
files or one that sweeps through every file at once, like the one that
made each of them export a single value.

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
and needs nothing, which is hard to change, because whatever needs it may
have to change with it; 1 for a box nothing needs, which is free to. Its abstractness
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
`}],ri="---";function my(t){return(/^"(.*)"$/.exec(t)??/^'(.*)'$/.exec(t))?.[1]??t}function fy(t){const e=t.replace(/\r\n?/g,`
`).split(`
`);if(e[0]?.trim()!==ri)return{fields:{},body:t.trim()};const n=e.indexOf(ri,1);if(n<0)return{fields:{},body:t.trim()};const a={};for(const s of e.slice(1,n)){const o=s.indexOf(":");o<=0||(a[s.slice(0,o).trim()]=my(s.slice(o+1).trim()))}return{fields:a,body:e.slice(n+1).join(`
`).trim()}}function py(t){const n=t.replace(/\.md$/,"").replace(/(^|\/)index$/,"");return n===""?"/":`/${n}/`}function ii(t){if(t==="/")return"/";const e=t.slice(0,-1);return e.slice(e.lastIndexOf("/")+1)}function gy(t){if(t==="/")return null;const e=t.slice(0,-1);return e.slice(0,e.lastIndexOf("/")+1)}function wy(t){const{fields:e,body:n}=fy(t.markdown),a=py(t.file);return{file:t.file,route:a,parent:gy(a),name:ii(a),title:e.title??ii(a),summary:e.summary??"",order:Number(e.order??"100"),body:n,fields:e}}function yy(t){return t.endsWith("/")?t:`${t}/`}function hi(t,e){return t.order-e.order||t.name.localeCompare(e.name)}class by{byRoute;linked;constructor(e){const n=e.map(wy),a=n.filter(s=>!s.fields.link).sort(hi);this.byRoute=new Map(a.map(s=>[s.route,s])),this.linked=new Map(n.flatMap(s=>{const o=this.byRoute.get(yy(s.fields.link??""));return!s.fields.link||!o?[]:[[s.route,{...o,parent:s.parent,name:s.name,order:s.order,link:s.route}]]}))}get links(){return[...this.linked.values()].map(e=>({from:e.link,to:e.route}))}get pages(){return[...this.byRoute.values()]}at(e){const n=this.linked.get(e);return this.byRoute.get(n?n.route:e)}childrenOf(e){return[...this.pages,...this.linked.values()].filter(n=>n.parent===e).sort(hi)}trailTo(e){const n=this.at(e);return n?n.parent===null?[n]:[...this.trailTo(n.parent),n]:[]}}const ct=new by(uy),li=["on","off"];function ci(t,e){if(t.length===0)return{text:"No flags to try just now."};const n=Math.max(...t.map(r=>r.name.length)),a=r=>e.isOn(r.name)?"on":"off",s=t.map(r=>{const i=li.map(h=>h===a(r)?`[${h}]`:` ${h} `).join("");return`${r.name.padEnd(n)}  ${i}  ${r.description}`}),o=t.map(r=>{const i=li.map(h=>h===a(r)?`<strong aria-current="true">${h}</strong>`:`<a href="#" data-run="flags ${r.name} ${h}" title="flags ${r.name} ${h}">${h}</a>`).join(" ");return`<dt>${x(r.name)} <span class="switch">${i}</span></dt><dd>${x(r.description)}</dd>`});return{text:s.map(r=>r.trimEnd()).join(`
`),html:`<dl class="help flags">${o.join("")}</dl>`}}function vy(t,e){return{name:"flags",usage:"flags [name [on|off]]",description:"list the trials this site can be switched into, or switch one",run(n,[a,s]){return a===void 0?ci(t,e):t.some(o=>o.name===a)?s!==void 0&&s!=="on"&&s!=="off"?{text:`flags: ${a}: choose on or off`,error:!0}:(e.set(a,s===void 0?!e.isOn(a):s==="on"),ci(t,e)):{text:`flags: ${a}: no such flag. Try flags`,error:!0}}}}function ky(t,e,n){return t.flatMap(a=>{if(a.trial===void 0||e.chosen(a.name))return[];let s=e.drawn(a.name);return s===void 0&&(s=n()<a.trial,e.draw(a.name,s)),[{name:a.name,on:s}]})}function xy(t,e){const n=new URLSearchParams(e),a={};for(const{name:s}of t){const o=n.get(s);(o==="on"||o==="off")&&(a[s]=o==="on")}return a}function $y(t){if(t.includes("--help"))return{help:!0};const e={};for(let n=0;n<t.length;n+=1){const a=t[n]??"";if(!a.startsWith("--"))return{error:`${a}: options are written --name value`};const s=a.indexOf("=");if(s>0){e[a.slice(2,s)]=a.slice(s+1);continue}const o=t[n+1];if(o===void 0)return{error:`${a} needs a value`};e[a.slice(2)]=o,n+=1}return{given:e}}const Ty=t=>"choices"in t?t.choices.map(pt).join("|"):"n",Sy=t=>"choices"in t?pt(t.initial):`${t.min} to ${t.max}, ${t.initial}`;function My(t){const e=[t.name,...t.parameters.map(s=>`[--${s.name} ${Ty(s)}]`)].join(" "),n=Math.max(...t.parameters.map(s=>s.name.length+2)),a=t.parameters.map(s=>`  ${`--${s.name}`.padEnd(n)}  ${s.description} (${Sy(s)})`);return[e,`  ${t.summary}`,"",...a].join(`
`)}function Ay(t){return{name:t.name,usage:`${t.name} [--help] [--option n]...`,description:t.summary,run(e,n){const a=$y(n);if("help"in a)return{text:My(t)};const s="error"in a?a:Jh(t,a.given);if("error"in s)return{text:`${t.name}: ${s.error}`,error:!0};const o=t.run(s.values);return{text:o.text,html:`<div class="app program-out">${o.html}</div>`}}}}function Iy(t){return[...t.flatMap(e=>e.commands??[]),...t.flatMap(e=>e.programs??[]).map(Ay)]}function di(){const t=Ue.flatMap(p=>p.flags??[]),e=new Sg;for(const[p,b]of Object.entries(xy(t,window.location.search)))e.set(p,b);const n=ky(t,e,Math.random),a=p=>`${p.name}-${p.on?"on":"off"}`;for(const p of n)Qt(Zt("trial",a(p)));document.addEventListener("click",p=>{const b=p.target?.closest("main a[href]");if(!b||window.location.pathname!=="/"||n.length===0)return;const v=b.host===window.location.host?b.pathname:b.href;for(const T of n)Qt(Zt(a(T),"open",v))},{capture:!0});const s=[...Yh,...Iy(Ue),vy(t,e)],o=Tg(Ue),i=(p=>p.endsWith("/")?p:`${p}/`)(window.location.pathname),h=ct.at(i);let l=Vr(o,{site:ct}),c=ai(document),d=null;const u=Tw(ct,(p,b)=>{l(),l=Vr(o,{site:ct}),c(),c=ai(document);for(const v of Ue)v.arrive?.(p);b||d?.moveTo(p.route)});if(d=ey(ct,h?i:"/",{moveTo:p=>u(p,{keep:!0}),clearPage:()=>{l(),l=()=>{},c(),c=()=>{},document.querySelector("main")?.replaceChildren()},commands:s,heard:p=>Qt(Zt("command",s.some(b=>b.name===p)?p:"unknown"))}),h)for(const p of Ue)p.arrive?.(h);const g={run:p=>{d?.run(p)}};for(const p of Ue)p.install?.(g);const y=Ue.flatMap(p=>p.programs??[]);dy(Mg(),{programs:y,site:ct,goTo:p=>u(p),run:p=>d?.run(p)??[]})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",di):di();
