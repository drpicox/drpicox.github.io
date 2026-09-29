function Rc(t){const e=new Map,n=new Map;return t.changes.map(s=>{for(const a of s.removed)e.delete(a);for(const[a,o,r,i,h]of s.added)e.set(a,h?{id:a,path:o,lines:r,test:i,typesOnly:h}:{id:a,path:o,lines:r,test:i});for(const[a,o]of s.moved){const r=e.get(a);r&&e.set(a,{...r,path:o})}for(const[a,o]of s.resized){const r=e.get(a);r&&e.set(a,{...r,lines:o})}for(const[a,o]of s.retyped){const r=e.get(a);if(!r)continue;const{typesOnly:i,...h}=r;e.set(a,o?{...h,typesOnly:o}:h)}for(const[a,o]of s.unlinked)n.delete(`${a}>${o}`);for(const[a,o,r]of s.linked)n.set(`${a}>${o}`,r);return{modules:[...e.values()].sort((a,o)=>a.id-o.id),dependencies:[...n].map(([a,o])=>{const[r=0,i=0]=a.split(">").map(Number);return{from:r,to:i,typeOnly:o}}).sort((a,o)=>a.from-o.from||a.to-o.to)}})}function Bh(t){const e=new Map,n=(s,a)=>{const o=e.get(s);o&&Object.assign(o,a)};return t.changes.forEach((s,a)=>{for(const[o,r,i,h,c=!1]of s.added)e.set(o,{id:o,path:r,lines:i,test:h,typesOnly:c,born:a,changed:[]});for(const[o,r]of s.moved)n(o,{path:r});for(const[o,r]of s.resized)n(o,{lines:r});for(const[o,r]of s.retyped)n(o,{typesOnly:r});for(const o of s.changed)e.get(o)?.changed.push(a);for(const o of s.removed)n(o,{went:a})}),[...e.values()].sort((s,a)=>s.id-a.id)}let na;function Is(t){if(na?.text===t)return na.read;const e=JSON.parse(t),n={history:e,snapshots:Rc(e),lives:Bh(e)};return na={text:t,read:n},n}const Bc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function $(t){return t.replace(/[&<>"]/g,e=>Bc[e]??e)}function He(t){return t.includes("/")?t.split("/")[0]??t:"src"}function Q(t){const e=t.split("/");return e.length<=2?t:`${e[0]}/${e[1]}`}const Ko=t=>[...t].map(([e,n])=>({box:e,files:n.size})).sort((e,n)=>n.files-e.files||e.box.localeCompare(n.box));function qs(t,e){const n=new Map(t.modules.filter(c=>!c.test).map(c=>[c.id,Q(c.path)])),s=[...n].filter(([,c])=>c===e).map(([c])=>c),a=new Map,o=new Map,r=new Set;for(const{from:c,to:l}of t.dependencies){const[d,u]=[n.get(c),n.get(l)];d===void 0||u===void 0||d===u||(u===e&&a.set(d,(a.get(d)??new Set).add(c)),d===e&&(r.add(c),o.set(u,(o.get(u)??new Set).add(c))))}const i=new Set([...a.values()].flatMap(c=>[...c])).size,h=r.size;return{box:e,files:s,neededBy:Ko(a),needing:[...r].sort((c,l)=>c-l),needs:Ko(o),ca:i,ce:h,instability:i+h>0?h/(i+h):null}}const Fc=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Ke(t){const[,e=1,n=1]=t.date.slice(0,10).split("-").map(Number);return`${n} ${Fc[e-1]??""}`}function zs(t,e=1/0){const n=new Map;for(const{at:s,distance:a,changed:o}of t){if(s>e)continue;const r=n.get(a)??{seen:0,changed:0};n.set(a,{seen:r.seen+1,changed:r.changed+(o?1:0)})}return[...n].map(([s,a])=>({distance:s,...a})).sort((s,a)=>(s.distance??1/0)-(a.distance??1/0))}const Dc=3,Vo=t=>t===null?null:Math.min(t,Dc);function Eo(t,e,n=1/0){const s=new Map;for(const{distance:r,seen:i,changed:h}of e){const c=Vo(r),l=s.get(c)??{seen:0,changed:0};s.set(c,{seen:l.seen+i,changed:l.changed+h})}const a=new Map([...s].map(([r,{seen:i,changed:h}])=>[r,i>0?h/i:0])),o=new Map;for(const{at:r,id:i,distance:h,changed:c}of t){if(r>n)continue;const l=o.get(i)??{expected:0,actual:0};l.expected+=a.get(Vo(h))??0,l.actual+=c?1:0,o.set(i,l)}return o}function Fh(t,e,n=6,s=new Set){return new Map(t.map(a=>[a.id,a.changed.filter(o=>o<=e&&!s.has(o)).reduce((o,r)=>o+.5**((e-r)/n),0)]))}let Wn;function yt(t,e){if(Wn?.read===t&&Wn.at===e)return Wn.then;const n=Math.max(0,Math.min(e,t.history.commits.length-1))+1,s={commits:t.history.commits.slice(0,n),changes:t.history.changes.slice(0,n)},a=n===t.history.commits.length?t:{history:s,snapshots:t.snapshots.slice(0,n),lives:Bh(s)};return Wn={read:t,at:e,then:a},a}function Hc(t){const e=t.modules.filter(d=>!d.test).map(d=>d.id),n=new Map(e.map((d,u)=>[d,u])),s=e.length,a=Array.from({length:s},()=>new Set);for(const{from:d,to:u}of t.dependencies){const[f,m]=[n.get(d),n.get(u)];f===void 0||m===void 0||f===m||(a[f]?.add(m),a[m]?.add(f))}const o=a.map(d=>[...d]),r=new Float64Array(s),i=new Float64Array(s),h=new Int32Array(s),c=new Float64Array(s),l=new Int32Array(s);for(let d=0;d<s;d+=1){i.fill(0),h.fill(-1),c.fill(0),i[d]=1,h[d]=0;let[u,f]=[0,0];for(l[f++]=d;u<f;){const m=l[u++]??0;for(const p of o[m]??[])h[p]===-1&&(h[p]=(h[m]??0)+1,l[f++]=p),h[p]===(h[m]??0)+1&&(i[p]=(i[p]??0)+(i[m]??0))}for(let m=f-1;m>0;m-=1){const p=l[m]??0;for(const w of o[p]??[])h[w]===(h[p]??0)-1&&(c[w]=(c[w]??0)+(i[w]??0)/(i[p]??1)*(1+(c[p]??0)));r[p]=(r[p]??0)+(c[p]??0)}}return new Map(e.map((d,u)=>[d,(r[u]??0)/2]))}function Ze(t){const e=t.modules.filter(s=>!s.test).map(s=>s.id),n=new Map(e.map(s=>[s,new Map]));for(const{from:s,to:a}of t.dependencies){const[o,r]=[n.get(s),n.get(a)];!o||!r||s===a||(o.set(a,(o.get(a)??0)+1),r.set(s,(r.get(s)??0)+1))}return{ids:e,weights:n}}function Wc(t){const{ids:e,weights:n}=Ze(t),s=new Map;let[a,o]=[0,0];for(const i of e){const h=[...n.get(i)?.keys()??[]],c=h.length*(h.length-1)/2;let l=0;h.forEach((d,u)=>{for(const f of h.slice(u+1))n.get(d)?.has(f)&&(l+=1)}),s.set(i,c>0?l/c:0),[a,o]=[a+l,o+c]}const r=[...s.values()];return{local:s,average:r.length>0?r.reduce((i,h)=>i+h,0)/r.length:0,transitivity:o>0?a/o:0}}function Xo(t){const e=t.links.length,n=t.links.map((i,h)=>2*(t.inside[h]??0)+[...i.values()].reduce((c,l)=>c+l,0)),s=n.reduce((i,h)=>i+h,0),a=Array.from({length:e},(i,h)=>h),o=[...n];let r=!1;for(let i=!0;i&&s>0;){i=!1;for(let h=0;h<e;h+=1){const c=a[h]??h,l=new Map;for(const[p,w]of t.links[h]??[]){const g=a[p]??p;l.set(g,(l.get(g)??0)+w)}const d=n[h]??0;o[c]=(o[c]??0)-d;const u=p=>(l.get(p)??0)-(o[p]??0)*d/s;let f=c,m=u(c);for(const p of[...l.keys()].sort((w,g)=>w-g)){const w=u(p);w>m+1e-12&&([f,m]=[p,w])}o[f]=(o[f]??0)+d,a[h]=f,f!==c&&(i=r=!0)}}return r?a:null}function qc(t,e){const n=new Map,s=e.map(r=>(n.has(r)||n.set(r,n.size),n.get(r)??0)),a=Array.from({length:n.size},()=>new Map),o=Array.from({length:n.size},()=>0);return t.links.forEach((r,i)=>{const h=s[i]??0;o[h]=(o[h]??0)+(t.inside[i]??0);for(const[c,l]of r){const d=s[c]??0;h===d?o[h]=(o[h]??0)+l/2:a[h]?.set(d,(a[h]?.get(d)??0)+l)}}),{level:{links:a,inside:o},renamed:s}}function zc(t){const{ids:e,weights:n}=Ze(t),s=new Map(e.map((i,h)=>[i,h]));let a={links:e.map(i=>new Map([...n.get(i)??[]].map(([h,c])=>[s.get(h)??0,c]))),inside:e.map(()=>0)},o=e.map((i,h)=>h);for(let i=Xo(a);i;i=Xo(a)){const h=qc(a,i);o=o.map(c=>h.renamed[c]??c),a=h.level}const r=new Map;return new Map(e.map((i,h)=>{const c=o[h]??h;return r.has(c)||r.set(c,r.size),[i,r.get(c)??0]}))}function _c(t){const{ids:e,weights:n}=Ze(t),s=new Map(e.map(r=>[r,n.get(r)?.size??0])),a=new Map,o=new Set(e);for(let r=0;o.size>0;){const i=Math.min(...[...o].map(c=>s.get(c)??0));r=Math.max(r,i);const h=[...o].filter(c=>(s.get(c)??0)<=r);for(const c of h){o.delete(c),a.set(c,r);for(const l of n.get(c)?.keys()??[])o.has(l)&&s.set(l,(s.get(l)??0)-1)}}return new Map(e.map(r=>[r,a.get(r)??0]))}function Oo(t,e){let n=0;const s=new Map,a=new Map,o=[],r=new Set,i=[],h=c=>{s.set(c,n),a.set(c,n),n+=1,o.push(c),r.add(c);for(const d of e(c))s.has(d)?r.has(d)&&a.set(c,Math.min(a.get(c)??0,s.get(d)??0)):(h(d),a.set(c,Math.min(a.get(c)??0,a.get(d)??0)));if(a.get(c)!==s.get(c))return;const l=[];for(let d=o.pop();d!==void 0&&(r.delete(d),l.push(d),d!==c);d=o.pop());i.push(l)};for(const c of t)s.has(c)||h(c);return i}function Gc(t){const e=t.modules.filter(r=>!r.test).map(r=>r.id),n=new Set(e),s=new Map(e.map(r=>[r,[]]));for(const{from:r,to:i}of t.dependencies)n.has(r)&&n.has(i)&&r!==i&&s.get(r)?.push(i);const a=new Map,o=[];return Oo(e,r=>s.get(r)??[]).forEach((r,i)=>{for(const c of r)a.set(c,i);const h=r.flatMap(c=>(s.get(c)??[]).map(l=>a.get(l))).filter(c=>c!==void 0&&c!==i);o[i]=h.length>0?1+Math.max(...h.map(c=>o[c]??0)):0}),new Map(e.map(r=>[r,o[a.get(r)??0]??0]))}function Yc(t,e=.85){const n=t.modules.filter(i=>!i.test).map(i=>i.id),s=new Map(n.map((i,h)=>[i,h])),a=n.length,o=Array.from({length:a},()=>new Set);for(const{from:i,to:h}of t.dependencies){const[c,l]=[s.get(i),s.get(h)];c!==void 0&&l!==void 0&&c!==l&&o[c]?.add(l)}let r=new Float64Array(a).fill(a>0?1/a:0);for(let i=0;i<100;i+=1){const h=new Float64Array(a).fill((1-e)/Math.max(1,a));let c=0;o.forEach((d,u)=>{const f=r[u]??0;if(d.size===0)c+=f;else for(const m of d)h[m]=(h[m]??0)+e*f/d.size});for(let d=0;d<a;d+=1)h[d]=(h[d]??0)+e*c/a;const l=h.reduce((d,u,f)=>d+Math.abs(u-(r[f]??0)),0);if(r=h,l<1e-12)break}return new Map(n.map((i,h)=>[i,r[h]??0]))}function Uc(t){const{ids:e,weights:n}=Ze(t),s=new Map(e.map((u,f)=>[u,f])),a=e.map(u=>[...n.get(u)?.keys()??[]].map(f=>s.get(f)??0)),o=new Int32Array(e.length),r=new Int32Array(e.length),i=new Map,h=[];for(const[u,f]of e.entries()){o.fill(-1),o[u]=0,r[0]=u;let[m,p,w]=[1,0,0];for(let g=0;g<m;g+=1){const b=r[g]??0,v=(o[b]??0)+1;for(const k of a[b]??[])(o[k]??0)>=0||(o[k]=v,r[m]=k,m+=1,p+=v,w=v)}h.push({reached:m,total:p,farthest:w}),i.set(f,p>0?(m-1)/p:0)}const c=Math.max(0,...h.map(({reached:u})=>u)),l=h.filter(({reached:u})=>u===c),d=l.length*(c-1);return{diameter:Math.max(0,...l.map(({farthest:u})=>u)),mean:d>0?l.reduce((u,{total:f})=>u+f,0)/d:0,closeness:i}}function Co(t){const e=new Set(t.modules.filter(a=>!a.test).map(a=>a.id)),n=new Map;for(const{from:a,to:o}of t.dependencies)e.has(a)&&e.has(o)&&n.set(o,[...n.get(o)??[],a]);const s=new Map;for(const a of e){const o=new Set([a]),r=[a];for(let i=r.pop();i!==void 0;i=r.pop())for(const h of n.get(i)??[])o.has(h)||(o.add(h),r.push(h));s.set(a,o.size-1)}return s}const bt=30;function Jc(t,e,n){const s=new Set([t]);let a=[t];for(let o=1;a.length>0;o+=1){const r=[];for(const i of a)for(const h of e.get(i)??[])if(!s.has(h)){if(n.has(h))return o;s.add(h),r.push(h)}a=r}return null}function Dh(t,e,n=bt){const s=[];return t.changes.forEach((a,o)=>{const r=e[o-1];if(!r||a.changed.length===0||a.changed.length>n)return;const i=new Set(r.modules.filter(d=>!d.test).map(d=>d.id)),h=new Set(a.removed),c=new Set(a.changed.filter(d=>i.has(d))),l=new Map;for(const{from:d,to:u}of r.dependencies)i.has(d)&&i.has(u)&&l.set(d,[...l.get(d)??[],u]);for(const d of i)h.has(d)||s.push({at:o,id:d,distance:Jc(d,l,c),changed:c.has(d)})}),s}function Le(t){const e=new WeakMap;return n=>{if(e.has(n))return e.get(n);const s=t(n);return e.set(n,s),s}}const J={standings:Le(t=>Dh(t.history,t.snapshots)),bridges:Le(t=>Hc(t)),reach:Le(t=>Co(t)),groups:Le(t=>zc(t)),pageRank:Le(t=>Yc(t)),cores:Le(t=>_c(t)),heights:Le(t=>Gc(t)),paths:Le(t=>Uc(t)),clustering:Le(t=>Wc(t))};function gt(t,e=bt){return new Set(t.changes.flatMap((n,s)=>n.changed.length>e?[s]:[]))}function Hh(t,e=bt,n=2){const s=new Map;for(const{changed:a}of t.changes){if(a.length>e)continue;const o=[...a].sort((r,i)=>r-i);o.forEach((r,i)=>{for(const h of o.slice(i+1).map(c=>`${r}:${c}`))s.set(h,(s.get(h)??0)+1)})}return[...s].filter(([,a])=>a>=n).map(([a,o])=>{const[r=0,i=0]=a.split(":").map(Number);return{a:r,b:i,together:o}}).sort((a,o)=>o.together-a.together||a.a-o.a||a.b-o.b)}function On(t,e,n,s){const a=new Map;for(const[i,h]of t){const[c,l]=s==="needs"?[i,h]:[h,i];a.set(c,[...a.get(c)??[],l])}const o=new Map;let r=[e];for(let i=1;i<=n&&r.length>0;i+=1){const h=[];for(const c of r)for(const l of a.get(c)??[])l!==e&&!o.has(l)&&(o.set(l,i),h.push(l));r=h}return o}function Wh(t,e,n){const s=Math.min(On(t,e,1/0,"needs").get(n)??1/0,On(t,n,1/0,"needs").get(e)??1/0);return s===1?"arrow":Number.isFinite(s)?"through":"none"}function qh(t,e,n=2){const s=new Set(e.modules.filter(o=>!o.test).map(o=>o.id)),a=e.dependencies.map(({from:o,to:r})=>[o,r]);return Hh(t,void 0,n).filter(({a:o,b:r})=>s.has(o)&&s.has(r)).map(({a:o,b:r,together:i})=>({a:o,b:r,together:i,joined:Wh(a,o,r)}))}const Kc=5;function Vc(t,e,n){const s=yt(t,e),a=s.lives.find(d=>d.id===n),o=t.history.commits,r=gt(s.history),i=a?.born??0,h=J.standings(t),c=t.snapshots[e]??{modules:[],dependencies:[]},l=new Map(c.modules.map(d=>[d.id,d.path]));return{born:{at:i,commit:o[i]??{sha:"",date:"",subject:""}},changes:(a?.changed??[]).map(d=>({at:d,commit:o[d]??{sha:"",date:"",subject:""},sweep:r.has(d)})),heat:Math.min(1,Fh(s.lives,e,void 0,r).get(n)??0),ground:Eo(h,zs(h,e),e).get(n)??null,partners:qh(s.history,c).flatMap(({a:d,b:u,together:f,joined:m})=>d===n||u===n?[{id:d===n?u:d,together:f,joined:m}]:[]).sort((d,u)=>u.together-d.together||d.id-u.id).slice(0,Kc).map(d=>({...d,path:l.get(d.id)??""}))}}function Xc(t){const{ids:e,weights:n}=Ze(t),s=new Map(e.map(l=>[l,n.get(l)?.size??0]));let[a,o,r,i]=[0,0,0,0];for(const l of e)for(const d of n.get(l)?.keys()??[]){if(d<l)continue;const[u,f]=[s.get(l)??0,s.get(d)??0];a+=1,o+=u*f,r+=(u+f)/2,i+=(u*u+f*f)/2}if(a===0)return 0;const h=r/a,c=i/a-h*h;return c>0?(o/a-h*h)/c:0}function Zc(t){const{ids:e,weights:n}=Ze(t),s=new Set,a=[];for(const o of e){if(s.has(o))continue;const r=[o];s.add(o);for(let i=0;i<r.length;i+=1)for(const h of n.get(r[i]??o)?.keys()??[])s.has(h)||(s.add(h),r.push(h));a.push(r.sort((i,h)=>i-h))}return a.sort((o,r)=>r.length-o.length||(o[0]??0)-(r[0]??0))}function zh(t){const e=t.modules.filter(g=>!g.test).map(g=>g.id),n=new Set(e),s=new Map(e.map(g=>[g,new Set])),a=new Map(e.map(g=>[g,new Set]));for(const{from:g,to:b}of t.dependencies)!n.has(g)||!n.has(b)||g===b||(s.get(g)?.add(b),a.get(b)?.add(g));const o=e.length,r=[...s.values()].reduce((g,b)=>g+b.size,0),{weights:i}=Ze(t),h=[...i.values()].reduce((g,b)=>g+b.size,0)/2,c=o>0?2*h/o:0,l=Zc(t),d=Oo(e,g=>s.get(g)??[]).filter(g=>g.length>1),u=J.paths(t),f=J.clustering(t),m=o>1?c/(o-1):0,p=c>1?Math.log(o)/Math.log(c):0,w=m>0&&p>0&&u.mean>0?f.average/m/(u.mean/p):0;return{files:o,arrows:r,links:h,density:o>1?r/(o*(o-1)):0,meanDegree:c,parts:l.length,largestPart:l[0]?.length??0,circles:d.length,inCircles:d.reduce((g,b)=>g+b.length,0),diameter:u.diameter,meanPath:u.mean,clustering:f.average,transitivity:f.transitivity,assortativity:Xc(t),deepestCore:Math.max(0,...J.cores(t).values()),tallest:Math.max(0,...J.heights(t).values()),sources:e.filter(g=>(a.get(g)?.size??0)===0).length,sinks:e.filter(g=>(s.get(g)?.size??0)===0).length,randomClustering:m,randomPath:p,smallWorld:w,neededBy:e.map(g=>a.get(g)?.size??0),needs:e.map(g=>s.get(g)?.size??0)}}function ee(t,e){if(e===0)return"–";const n=t/e*100;return`${n>=10?Math.round(n):Math.round(n*10)/10}%`}function R(t,e,n=`${e}s`){return`${t} ${t===1?e:n}`}function Qc(t,e){const n=new Map(t.modules.filter(m=>!m.test).map(m=>[m.id,m.path])),s=new Set(t.modules.filter(m=>m.test).map(m=>m.id)),a=t.dependencies.filter(({from:m,to:p})=>n.has(m)&&n.has(p)).map(({from:m,to:p})=>[m,p]),o=(m,p)=>On(a,e,p,m).size,r=n.size-1,i=r*(r-1)/2,h=[...J.pageRank(t).values()],c=J.pageRank(t).get(e)??0,l=m=>Math.abs(m-c)<=1e-9*Math.max(m,c),d=J.groups(t),u=d.get(e),f=new Map;for(const[m,p]of d){if(p!==u)continue;const w=Q(n.get(m)??"");f.set(w,(f.get(w)??0)+1)}return{needs:o("needs",1),neededBy:o("neededBy",1),reaches:o("neededBy",1/0),dependsOn:o("needs",1/0),bridge:i>0?(J.bridges(t).get(e)??0)/i:0,rank:{place:1+h.filter(m=>m>c&&!l(m)).length,of:h.length,share:c,tied:h.filter(l).length-1},links:new Set(a.flatMap(([m,p])=>m===p?[]:m===e?[p]:p===e?[m]:[])).size,closeness:J.paths(t).closeness.get(e)??0,core:J.cores(t).get(e)??0,height:J.heights(t).get(e)??0,clustering:J.clustering(t).local.get(e)??0,tests:new Set(t.dependencies.filter(({from:m,to:p})=>p===e&&s.has(m)).map(({from:m})=>m)).size,group:{files:[...f.values()].reduce((m,p)=>m+p,0),boxes:[...f].sort((m,p)=>p[1]-m[1]||m[0].localeCompare(p[0]))}}}const T=t=>t.toFixed(1),Zo=300,Qt=12,Qo=3;function _h(t,e,n=e){const s=r=>T(Qo+r/Math.max(1,n-1)*(Zo-Qo*2)),a=t.went??e-1,o=t.changed.map(r=>`<line class="change" x1="${s(r)}" x2="${s(r)}" y1="1.5" y2="${Qt-1.5}"/>`).join("");return`<svg class="life" viewBox="0 0 ${Zo} ${Qt}" role="img" aria-label="written at commit ${t.born+1}, changed at ${t.changed.length} commits after"><line class="lived" x1="${s(t.born)}" x2="${s(a)}" y1="${Qt/2}" y2="${Qt/2}"/>${o}<circle class="written" cx="${s(t.born)}" cy="${Qt/2}" r="2.4"/></svg>`}const ed="https://github.com/drpicox/david-rodenas.com";function Gh(t,e,n="file"){const s=n==="box"&&!/\.[a-z]+$/.test(e);return`${ed}/${s?"tree":"blob"}/${t}/src/${e}`}function _s(t,e,n=new Set){const s=t.modules.filter(c=>!c.test),a=new Map(s.map(c=>[c.id,Q(c.path)])),o=new Map(e.map(c=>[c.id,c.changed.filter(l=>!n.has(l)).length])),r=new Map,i=new Map;for(const{from:c,to:l}of t.dependencies){const[d,u]=[a.get(c),a.get(l)];d===void 0||u===void 0||d===u||(i.set(d,(i.get(d)??new Set).add(c)),r.set(u,(r.get(u)??new Set).add(c)))}return[...new Set(a.values())].sort((c,l)=>c.localeCompare(l)).map(c=>{const l=s.filter(f=>a.get(f.id)===c),[d,u]=[r.get(c)?.size??0,i.get(c)?.size??0];return{box:c,files:l.length,neededBy:d,needs:u,instability:d+u>0?u/(d+u):null,abstractness:l.filter(f=>f.typesOnly).length/l.length,changes:l.reduce((f,m)=>f+(o.get(m.id)??0),0)}})}const jo={modules:[],dependencies:[]},Cn=3,Ce=t=>t.toFixed(2).replace("-","−"),Yh=t=>t.split("/").pop()??t,td=t=>`${t}${t%100>=11&&t%100<=13?"th":["th","st","nd","rd"][t%10]??"th"}`,z=(t,e)=>`<dt>${t}</dt><dd>${e}</dd>`,Es=t=>`<span class="details-by">${t}</span>`,Uh=(t,e,n,s=`${n}s`)=>`${t.join(", ")}${e>0?` and ${e} more ${e===1?n:s}`:""}`,Jh=(t,e)=>`<a href="${$(t)}" target="_blank" rel="noopener noreferrer">${e}</a>`,Lo=t=>`<button type="button" data-file="${$(t)}">${$(Yh(t))}</button>`,Os=(t,e=t)=>`<button type="button" data-box="${$(t)}">${$(e)}</button>`,Cs='<button type="button" class="details-back" data-back>← the whole network</button>',er=t=>Uh(t.slice(0,Cn).map(({box:e,files:n})=>`${Os(e)} ${n}`),t.length-Cn,"box","boxes");function nd(t){const e=zh(t),n=new Map(t.modules.filter(l=>!l.test).map(l=>[l.id,l.path])),s=l=>[...l].filter(([d,u])=>n.has(d)&&u>0).sort((d,u)=>u[1]-d[1]||d[0]-u[0]).slice(0,Cn).map(([d])=>Lo(n.get(d)??"")).join(", ")||"none",a=Math.abs(e.assortativity),o=a<.05?"files with many links lean neither way":`files with many links lean to files with ${e.assortativity<0?"few":"many"}${a<.2?", a little":""}`,r=[...J.cores(t).values()].filter(l=>l===e.deepestCore).length,i=e.randomPath>0&&e.meanPath>0,[h,c]=[e.clustering/(e.randomClustering||1),e.meanPath/(e.randomPath||1)];return'<h3>The network</h3><p class="details-hint">Click a file or a box for its details, and a way to its code.</p><dl>'+z("files",`${e.files}, joined by ${R(e.arrows,"arrow")}: ${ee(e.density,1)} of those there could be`)+z("links",`${Ce(e.meanDegree)} a file, on average, the arrows read either way`)+z("parts",e.parts===1?"one: every file is joined to every other, some way":`${e.parts}; the largest holds ${R(e.largestPart,"file")}`)+z("circles",e.circles===0?"none: no files need each other round in a circle":`${e.circles}, holding ${R(e.inCircles,"file")}`)+z("apart",e.meanPath>0?`${Ce(e.meanPath)} arrows between two files${e.parts>1?" of the largest part":""}, on average, and ${e.diameter} at most${i?`; ${Ce(e.randomPath)} in a random network as big`:""}`:"no two files joined yet")+z("clustering",`${Ce(e.clustering)}: of the pairs of files joined to a file, the share joined to each other too, on average over the files${i?`; ${e.randomClustering.toPrecision(2)} in a random network as big`:""}`)+z("small-world-ness",i?`${e.smallWorld.toFixed(1)}: ${Math.round(h)} times as clustered as chance, with ways ${c.toFixed(1)} times as long${e.smallWorld>1?": a small world":""}`:"none yet: too few links to set against chance")+z("assortativity",`${Ce(e.assortativity)}: ${o}`)+z("deepest core",`${e.deepestCore}, ${R(r,"file")}: what is left when every file with fewer links than that is taken away, again and again`)+z("tallest stack",`${R(e.tallest,"arrow")}: the longest chain of what needs what`)+z("needed by none",R(e.sources,"file"))+z("needing none",R(e.sinks,"file"))+"</dl><h4>The files it hinges on</h4><dl>"+z("most needed",`${s(J.pageRank(t))} ${Es("by PageRank")}`)+z("most between",s(J.bridges(t)))+z("reaching furthest",s(J.reach(t)))+"</dl>"}function sd(t,e,n){const s=Qc(t,e),a=qs(t,Q(n)),o=Math.max(0,...J.cores(t).values()),{boxes:r,files:i}=s.group;return"<h4>In the network</h4><dl>"+z("needs",`${s.needs} directly, ${s.dependsOn} near or far`)+z("needed by",`${s.neededBy} directly; a change to it could reach ${R(s.reaches,"file")}`)+z("between",s.bridge===0?"on none of the shortest ways between two others":`on ${s.bridge<.001?"under 0.1%":ee(s.bridge,1)} of the shortest ways between two others`)+z("PageRank",`${s.rank.tied>0?"joint ":""}${td(s.rank.place)} of ${s.rank.of}${s.rank.tied>0?`, with ${R(s.rank.tied,"other")}`:""}`)+z("apart",s.closeness>0?`${Ce(1/s.closeness)} arrows from the rest of its part, on average`:"joined to nothing")+z("core",s.core===o?`${s.core}, the deepest there is`:`${s.core}; the deepest is ${o}`)+z("stack under it",R(s.height,"arrow"))+z("clustering",s.links<2?"none: fewer than two files joined to it":`${Ce(s.clustering)}: of the pairs of files joined to it, the share joined to each other too`)+z("its group",`${R(i,"file")}: ${Uh(r.slice(0,Cn).map(([h,c])=>`${Os(h,Yh(h))} ${c}`),r.length-Cn,"box","boxes")}`)+z("its box",`${Os(a.box)}: Ca ${a.ca}, Ce ${a.ce}, I ${a.instability===null?"none":Ce(a.instability)}`)+z("tests",s.tests===0?"no test imports it":`${R(s.tests,"test")} ${s.tests===1?"imports":"import"} it`)+"</dl>"}function ad(t,e,n,s){const a=t.snapshots[e]??jo,o=a.modules.find(w=>w.path===n),r=t.history.commits[e];if(!o||!r)return`${Cs}<p class="details-hint"><code>${$(n)}</code> is not there at this commit.</p>`;const i=Vc(t,e,o.id),h=yt(t,e),c=h.lives.find(w=>w.id===o.id),l=s?.sha===r.sha?s.lines[n]:void 0,d=i.changes.filter(w=>w.sweep).length,u=i.changes.at(-1),f=i.partners.map(({path:w,together:g,joined:b})=>`${Lo(w)} ${g}×${b==="none"?` ${Es("no arrow")}`:""}`),m=[...i.changes].reverse().map(({commit:w,sweep:g})=>`<li>${Ke(w)} · ${$(w.subject)}${g?` ${Es("a sweep")}`:""}</li>`).join(""),p=a.dependencies.filter(({from:w})=>w===o.id).length;return`${Cs}<h3 class="details-name"><code>${$(n)}</code></h3><p class="details-where">${o.test?"a test":Os(Q(n))} · ${R(o.lines,"line")}${l===void 0?"":` · tests run ${Math.round(l)}% of it`} · ${Jh(Gh(r.sha,n),"its code")}</p>`+(o.test?`<p class="details-hint">A test, which imports ${R(p,"file")}: the network is what ships, and a test stands outside it.</p>`:sd(a,o.id,n))+"<h4>In the history</h4><dl>"+z("written",`${Ke(i.born.commit)}, commit ${i.born.at+1}: ${$(i.born.commit.subject)}`)+z("changed",`${i.changes.length===0?"not since":R(i.changes.length,"time")}${d>0?`, ${d} of them in a sweep`:""}${c?_h(c,h.history.commits.length,t.history.commits.length):""}`)+(u?z("last changed",`${Ke(u.commit)}, ${u.at===e?"at the commit shown":`${R(e-u.at,"commit")} back`}`):"")+(i.ground?z("its ground",`would lead one to expect ${i.ground.expected.toFixed(1)} changes; it had ${i.ground.actual}${d>0?", the sweeps left out":""}`):"")+(o.test?"":z("changed with",f.length>0?f.join(", "):"no file twice"))+"</dl>"+(m?`<details class="details-commits"><summary>the ${R(i.changes.length,"commit")} that changed it</summary><ol reversed>${m}</ol></details>`:"")}function od(t,e,n){const s=t.snapshots[e]??jo,a=t.history.commits[e],o=qs(s,n);if(!a||o.files.length===0)return`${Cs}<p class="details-hint"><code>${$(n)}</code> is not there at this commit.</p>`;const r=yt(t,e),i=gt(r.history),h=_s(s,r.lives,i).find(v=>v.box===n),{ca:c,ce:l,instability:d}=o,u=h?.abstractness??0,f=new Map(s.modules.map(v=>[v.id,v.path])),m=new Map(r.lives.map(v=>[v.id,v.changed.filter(k=>!i.has(k)).length])),p=[...o.files].sort((v,k)=>(m.get(k)??0)-(m.get(v)??0)||(f.get(v)??"").localeCompare(f.get(k)??"")),w=He(n)==="platform"?"a box of the frame":He(n)==="features"?"a feature":"the top of the source",g=/\.[a-z]+$/.test(n),b=d===null?null:Math.abs(u+d-1);return`${Cs}<h3 class="details-name"><code>${$(n)}</code></h3><p class="details-where">${w} · ${R(o.files.length,"file")} · ${Jh(Gh(a.sha,n,"box"),g?"its code":"its folder")}</p><h4>As Robert C. Martin measures it</h4><dl>`+z("Ca",`${c}: files elsewhere that need it${o.neededBy.length>0?`, in ${er(o.neededBy)}`:""}`)+z("Ce",`${l}: its files that need elsewhere${o.needs.length>0?`, needing ${er(o.needs)}`:""}`)+z("instability",d===null?"none: it neither needs nor is needed":`I = Ce / (Ca + Ce) = ${l} / (${c} + ${l}) = ${Math.round(d*100)/100}`)+z("abstractness",`A = ${Ce(u)}, the share of its files of nothing but types`)+(b===null?"":z("distance",`D = |A + I − 1| = ${Ce(b)}${u+(d??0)<.5?": in the zone of pain":""}`))+"</dl><h4>In the history</h4><dl>"+z("changes",`${h?.changes??0} to its files, ${((h?.changes??0)/o.files.length).toFixed(1)} a file, the sweeps left out`)+'</dl><h4>Its files, the most changed first</h4><ol class="details-files">'+p.map(v=>`<li>${Lo(f.get(v)??"")} ${Es(R(m.get(v)??0,"change"))}</li>`).join("")+"</ol>"}function Kh(t,e,n,s){return n&&"file"in n?ad(t,e,n.file,s):n&&"box"in n?od(t,e,n.box):nd(t.snapshots[e]??jo)}function Vh(t){const e=new Map;for(const{from:n,to:s}of t.dependencies){const[a,o]=[Q(n),Q(s)];a!==o&&(e.has(a)||e.set(a,new Set),e.has(o)||e.set(o,new Set),e.get(a)?.add(o))}return Oo([...e.keys()],n=>e.get(n)??[]).filter(n=>n.length>1).map(n=>n.sort()).sort((n,s)=>(n[0]??"").localeCompare(s[0]??""))}function Gs(t,e=!1){const n=new Map(t.modules.filter(a=>e||!a.test).map(a=>[a.id,Q(a.path)])),s=new Map;for(const{from:a,to:o,typeOnly:r}of t.dependencies){const[i,h]=[n.get(a),n.get(o)];if(i===void 0||h===void 0||i===h)continue;const c=s.get(`${i}>${h}`)??{from:i,to:h,count:0,typeOnly:!0};s.set(`${i}>${h}`,{...c,count:c.count+1,typeOnly:c.typeOnly&&r})}return[...s.values()].sort((a,o)=>a.from.localeCompare(o.from)||a.to.localeCompare(o.to))}const It=12,sa=6,Xh=14,js=14,aa=12,rd=14,tr=40,en=10,id=16,hd=t=>Math.min(6,2.2+Math.sqrt(t)/4),Zh=t=>t.split("/").pop()?.replace(/\.ts$/,"")??t;function nr(t,e){const n=new Map,s=a=>{const o=n.get(a);if(o!==void 0)return o;n.set(a,0);const r=Math.max(-1,...[...e.get(a)??[]].map(s))+1;return n.set(a,r),r};for(const a of t)s(a);return n}function ld(t,e,n){const s=new Map(t.map(u=>[u,u]));for(const u of n)for(const f of u)s.set(f,u[0]??f);const a=u=>s.get(u)??u,o=new Map,r=new Map;for(const{from:u,to:f}of e){const[m,p]=[He(u),He(f)];m!==p?o.set(m,(o.get(m)??new Set).add(p)):a(u)!==a(f)&&r.set(a(u),(r.get(a(u))??new Set).add(a(f)))}const i=[...new Set(t.map(He))],h=nr(i,o);i.sort((u,f)=>(h.get(f)??0)-(h.get(u)??0)||u.localeCompare(f));const c=nr([...new Set(t.map(a))],r),l=i.flatMap(u=>{const f=t.filter(p=>He(p)===u);return[...new Set(f.map(p=>c.get(a(p))??0))].sort((p,w)=>w-p).map(p=>({band:u,boxes:f.filter(w=>(c.get(a(w))??0)===p).sort()}))}),d=new Map;for(const u of l){const f=m=>{const p=e.filter(w=>w.to===m&&d.has(w.from)).map(w=>d.get(w.from)??.5);return p.length?p.reduce((w,g)=>w+g,0)/p.length:.5};u.boxes.sort((m,p)=>f(m)-f(p)||m.localeCompare(p)),u.boxes.forEach((m,p)=>d.set(m,p/Math.max(1,u.boxes.length-1)))}return l}function oa(t,e){const n=Math.max(1,Math.ceil(Math.sqrt(e*2.2))),s=n*js;return{columns:n,inner:s,width:Math.max(s+sa*2,Zh(t).length*6+sa*2),height:Xh+Math.ceil(e/n)*js+sa}}function cd(t,e){const n=a=>{const o=e.get(a);return o?o.x+o.width/2:0},s=(a,o,r)=>a?a.x+a.width*(o+1)/(r+1):0;return t.map(a=>{const[o,r]=[e.get(a.from),e.get(a.to)],i=t.filter(c=>c.from===a.from).sort((c,l)=>n(c.to)-n(l.to)),h=t.filter(c=>c.to===a.to).sort((c,l)=>n(c.from)-n(l.from));return{...a,x1:s(o,i.indexOf(a),i.length),y1:o?o.y+o.height:0,x2:s(r,h.indexOf(a),h.length),y2:r?r.y:0}})}function No(t,{tests:e=!1,width:n=1100}={}){const s=t.modules.filter(m=>e||!m.test),a=new Map(s.map(m=>[m.id,m])),o=new Map;for(const m of[...s].sort((p,w)=>p.path.localeCompare(w.path))){const p=Q(m.path);o.set(p,[...o.get(p)??[],m])}const r=Gs(t,e),i=Vh({dependencies:t.dependencies.flatMap(({from:m,to:p,typeOnly:w})=>{const[g,b]=[a.get(m),a.get(p)];return g&&b?[{from:g.path,to:b.path,typeOnly:w}]:[]})}),h=new Set(i.flat()),c=ld([...o.keys()],r,i),l=[],d=new Map,u=[];let f=It;return c.forEach((m,p)=>{const w=p===0||c[p-1]?.band!==m.band,g=c[p+1]?.band!==m.band;w&&(l.push({name:m.band,x:It,y:f,width:n-It*2,height:0}),f+=id+en);const b=n-(It+en)*2,v=[[]];let k=0;for(const M of m.boxes){const x=oa(M,o.get(M)?.length??0).width;k>0&&k+x>b&&(v.push([]),k=0),v[v.length-1]?.push(M),k+=x+aa}let S=0;if(v.forEach((M,x)=>{x>0&&(f+=S+rd);const I=M.map(C=>oa(C,o.get(C)?.length??0)),L=I.reduce((C,E)=>C+E.width,0)+aa*(M.length-1);let P=It+en+(b-L)/2;S=0,M.forEach((C,E)=>{const N=I[E]??oa(C,0);d.set(C,{name:C,label:Zh(C),x:P,y:f,width:N.width,height:N.height,rank:c.length-p,cyclic:h.has(C)});const A=P+(N.width-N.inner)/2;(o.get(C)??[]).forEach((O,W)=>{const[_,q]=[W%N.columns,Math.floor(W/N.columns)];u.push({id:O.id,path:O.path,box:C,x:A+(_+.5)*js,y:f+Xh+(q+.5)*js,radius:hd(O.lines),test:O.test,typesOnly:O.typesOnly??!1})}),P+=N.width+aa,S=Math.max(S,N.height)})}),f+=S,g){const M=l[l.length-1];M&&(l[l.length-1]={...M,height:f+en-M.y}),f+=en}f+=tr}),{width:n,height:f-tr+It,bands:l,boxes:[...d.values()],balls:u,links:cd(r,d)}}function dd(t,e=!1){const n=t.modules.filter(a=>!e||!a.test),s=new Map(n.map(a=>[a.id,a.path]));return{modules:n.map(({path:a,lines:o,test:r,typesOnly:i=!1})=>({path:a,lines:o,test:r,typesOnly:i})),dependencies:t.dependencies.flatMap(({from:a,to:o,typeOnly:r})=>{const[i,h]=[s.get(a),s.get(o)];return i!==void 0&&h!==void 0?[{from:i,to:h,typeOnly:r}]:[]})}}function Po(t){const e=new Set(t.modules.filter(n=>n.test).map(n=>n.id));return new Set(t.dependencies.filter(n=>e.has(n.from)&&!e.has(n.to)).map(n=>n.to))}function Ls(t){const e=dd(t,!0),n=new Set(t.modules.filter(a=>!a.test&&!a.typesOnly).map(a=>a.id)),s=e.dependencies.filter(a=>Q(a.from)!==Q(a.to));return{files:e.modules.length,tests:t.modules.length-e.modules.length,lines:e.modules.reduce((a,o)=>a+o.lines,0),boxes:new Set(e.modules.map(a=>Q(a.path))).size,arrows:e.dependencies.length,crossing:s.length,typeOnly:e.dependencies.filter(a=>a.typeOnly).length,inCycles:Vh(e).flat().length,testable:n.size,tested:[...Po(t)].filter(a=>n.has(a)).length}}const ud=new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"long",year:"numeric",timeZone:"Europe/Madrid"});function Qh(t,e){const n=[`${R(e.files,"file")} in ${R(e.boxes,"box","boxes")}, ${R(e.tests,"test")}`,`${R(e.crossing,"arrow")} between boxes, ${e.typeOnly} of all ${e.arrows} onto a type`,`a test reaches ${e.tested} of the ${e.testable} files with something to test`,e.inCycles?`${R(e.inCycles,"box","boxes")} in a circle`:"no boxes in a circle"].join(" · "),s=$(t.sha);return`<a href="https://github.com/drpicox/david-rodenas.com/commit/${s}" target="_blank" rel="noopener noreferrer"><code>${s}</code></a> ${ud.format(new Date(t.date))} — ${$(t.subject)}<br><span class="measured">${n}</span>`}const V=t=>Math.round(t*10)/10;function md({x1:t,y1:e,x2:n,y2:s}){const a=Math.max(18,(s-e)/2);return`M${V(t)} ${V(e)} C${V(t)} ${V(e+a)} ${V(n)} ${V(s-a)} ${V(n)} ${V(s)}`}function fd(t){const e=t.bands.map(r=>`<g class="band" data-band="${$(r.name)}"><rect x="${V(r.x)}" y="${V(r.y)}" width="${V(r.width)}" height="${V(r.height)}" rx="6"/><text x="${V(r.x+8)}" y="${V(r.y+12)}">${$(r.name)}</text></g>`).join(""),n=t.links.map(r=>{const i=V(Math.min(4,.8+Math.log2(r.count)*.7));return`<path class="link${r.typeOnly?" type-only":""}" stroke-width="${i}" d="${md(r)}" marker-end="url(#arrowhead)"><title>${$(`${r.from} → ${r.to}: ${r.count}`)}</title></path>`}).join(""),s=t.boxes.map(r=>`<g class="box${r.cyclic?" cyclic":""}" data-box="${$(r.name)}"><rect x="${V(r.x)}" y="${V(r.y)}" width="${V(r.width)}" height="${V(r.height)}" rx="4"/><text x="${V(r.x+6)}" y="${V(r.y+10)}">${$(r.label)}</text></g>`).join(""),a=t.balls.map(r=>`<circle class="ball${r.test?" test":""}" cx="${V(r.x)}" cy="${V(r.y)}" r="${V(r.radius)}"><title>${$(r.path)}</title></circle>`).join(""),o=`${t.boxes.length} boxes, ${t.balls.length} files, ${t.links.length} arrows between boxes`;return`<svg class="architecture" viewBox="0 0 ${t.width} ${V(t.height)}" role="img" aria-label="${o}"><defs><marker id="arrowhead" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z"/></marker></defs><g class="bands">${e}</g><g class="links">${n}</g><g class="boxes">${s}</g><g class="balls">${a}</g></svg>`}const ra=600,tn=60,ot=4;function el(t,e){const n=i=>ot+i/Math.max(1,t.length-1)*(ra-ot*2),s=(i,h)=>{const c=Math.max(1,...t.map(i)),l=t.map((d,u)=>`${n(u).toFixed(1)},${(tn-ot-i(d)/c*(tn-ot*2)).toFixed(1)}`).join(" ");return`<polyline class="${h}" points="${l}"/>`},a=(ra-ot*2)/Math.max(1,t.length-1),o=t.map((i,h)=>i.inCycles?`<rect class="cycle" x="${(n(h)-a/2).toFixed(1)}" y="0" width="${a.toFixed(1)}" height="${tn}"/>`:"").join(""),r=n(e).toFixed(1);return`<svg class="sparks" viewBox="0 0 ${ra} ${tn}" role="img" aria-label="Files and arrows between boxes, commit by commit">${o}${s(i=>i.files,"files")}${s(i=>i.crossing,"crossing")}<line class="now" x1="${r}" x2="${r}" y1="0" y2="${tn}"/><text x="${ot}" y="11" class="files">files</text><text x="${ot+34}" y="11" class="crossing">arrows between boxes</text></svg>`}function pd(t,e){const[n,s]=[t.snapshots[e],t.history.commits[e]];return!n||!s?"":`<figure class="architecture-figure"><div class="architecture-stage"><div class="architecture-view">${fd(No(n))}</div><aside class="architecture-details" aria-label="Details">${Kh(t,e,null,null)}</aside></div><figcaption>${Qh(s,Ls(n))}</figcaption>${el(t.snapshots.map(Ls),e)}</figure>`}const tl=t=>{const e=Is(t("/data/architecture.json"));return pd(e,e.history.commits.length-1)};function Ro(t,e){const n=new Map(e.map(s=>[s.box,s.instability]));return t.flatMap(({from:s,to:a,count:o})=>{const[r,i]=[n.get(s),n.get(a)];return r!=null&&i!==void 0&&i!==null&&i>r?[{from:s,to:a,count:o,rise:i-r}]:[]}).sort((s,a)=>a.rise-s.rise||a.count-s.count||s.from.localeCompare(a.from))}function gd(t,e,n=bt){return zs(Dh(t,e,n))}function nl(t){const e=[...Co(t).values()];return e.length>0?e.reduce((n,s)=>n+s+1,0)/e.length**2:0}function jn(t){return $(t).replaceAll("/","/<wbr>")}const wd=8;function yd(t,e){const n=t.modules.filter(f=>!f.test),s=new Map(n.map(f=>[f.id,f.path])),a=f=>m=>new Set(t.dependencies.filter(p=>p[f]===m&&s.has(f==="from"?p.to:p.from)).map(p=>f==="from"?p.to:p.from)).size,[o,r]=[a("from"),a("to")],i=n.length-1,h=i*(i-1)/2,c=[...e].filter(([f,m])=>m>0&&s.has(f)).sort((f,m)=>m[1]-f[1]).slice(0,wd),l=c.map(([f,m])=>`<tr><td><code>${jn(s.get(f)??"")}</code></td><td>${ee(m,h)}</td><td>${o(f)}</td><td>${r(f)}</td></tr>`).join(""),[d]=c,u=d?`${s.get(d[0])} stands on ${ee(d[1],h)} of the shortest ways between two other files that ship, the arrows read either way; where several ways are as short, each counts for its share.`:"No file stands between two others: nothing needs anything.";return`<figure class="changes-figure"><table class="bridges"><thead><tr><th>file</th><th>of the ways between two others</th><th>needs</th><th>needed by</th></tr></thead><tbody>${l}</tbody></table><figcaption>${$(u)}</figcaption></figure>`}const sr=640,qn=180,ar=26,ia=14,bd=150,vd=4,or=t=>t.reduce((e,n)=>({seen:e.seen+n.seen,changed:e.changed+n.changed}),{seen:0,changed:0});function kd(t,e){const n=m=>or(t.filter(p=>p.distance===m)),s=[["a file it needs changed",n(1)],["two arrows down",n(2)],["three",n(3)],["four or more",or(t.filter(m=>m.distance!==null&&m.distance>=vd))],["nothing it needs changed",n(null)]],a=({seen:m,changed:p})=>m>0?p/m:0,o=Math.max(1e-4,...s.map(([,m])=>a(m))),r=sr-qn-bd,i=s.map(([m,p],w)=>{const g=8+w*ar,b=Math.max(1,a(p)/o*r);return`<text class="label" x="${qn-8}" y="${T(g+ia-3)}" text-anchor="end">${m}</text><rect class="bar${w===s.length-1?" none":""}" x="${qn}" y="${T(g)}" width="${T(b)}" height="${ia}" rx="2"/><text class="value" x="${T(qn+b+6)}" y="${T(g+ia-3)}">${ee(p.changed,p.seen)} · ${p.changed} of ${p.seen}</text>`}).join(""),h=8+s.length*ar,c=`<svg class="cascade" viewBox="0 0 ${sr} ${h}" role="img" aria-label="The share of files that changed with a change below them, by how far below it was">${i}</svg>`,[l,d,,,u]=s.map(([,m])=>ee(m.changed,m.seen)),f=`In theory, a change to one file can reach ${ee(e,1)} of the source, on average: itself, what needs it, and what needs that, as far as the arrows go. In the history, of the times something a file needs changed, the file changed too in ${l}; when the nearest change was two arrows down, in ${d}; when nothing it needs changed, in ${u}.`;return`<figure class="changes-figure">${c}<figcaption>${f}</figcaption></figure>`}function sl(t){return t.went===void 0?Q(t.path):null}function $d(t,e){const n=new Map,s=(o,r,i,h)=>{const[,c,l]=o.cells.get(r)??[r,0,0];o.cells.set(r,[r,c+i,l+h])};for(const o of t){if(o.test)continue;const r=sl(o),i=n.get(r)??{born:o.born,cells:new Map};i.born=Math.min(i.born,o.born),n.set(r,i),s(i,o.born,0,1);for(const h of o.changed)s(i,h,1,0)}const a=o=>o===null?1/0:e.includes(o)?e.indexOf(o):e.length;return[...n].map(([o,{born:r,cells:i}])=>({box:o,band:o===null?null:He(o),born:r,cells:[...i.values()].sort((h,c)=>h[0]-c[0])})).sort((o,r)=>a(o.band)-a(r.band)||o.born-r.born||(o.box??"").localeCompare(r.box??"")).map(({box:o,band:r,cells:i})=>({box:o,band:r,cells:i}))}const rr=1100,$s=150,xd=6,vn=11,Td=16,Sd=8,Md=20,Ad=t=>Math.min(1,.25+.25*Math.log2(t)),Id=t=>t.box===null?"gone":t.box.slice(t.box.indexOf("/")+1);function Ed(t,e,n){const s=[];let a=0,o;for(const r of t){r.band!==o&&(a+=o===void 0?0:Sd,r.band!==null&&(s.push(`<text class="band" x="0" y="${T(a+11)}">${$(r.band)}</text>`),a+=Td),o=r.band);const i=r.cells.reduce((l,[,d])=>l+d,0),h=r.cells.reduce((l,[,,d])=>l+d,0),c=`${r.box??"the files that are gone"}: ${R(i,"change")}, ${R(h,"file")} written`;s.push(`<text class="row" data-box="${$(r.box??"")}" data-top="${T(a)}" x="${$s-6}" y="${T(a+vn-2.5)}" text-anchor="end">${$(Id(r))}<title>${$(c)}</title></text>`);for(const[l,d,u]of r.cells)d>0&&s.push(`<rect class="changed" x="${T(e(l)+.5)}" y="${T(a+.5)}" width="${T(Math.max(1,n-1))}" height="${vn-2}" rx="1" style="--v:${Ad(d).toFixed(2)}"/>`),u>0&&s.push(`<circle class="written" cx="${T(e(l)+n/2)}" cy="${T(a+vn/2-.5)}" r="1.7"/>`);a+=vn}return{markup:s.join(""),bottom:a}}function Od(t,e,n){const s=[];let a=-1/0;return t.forEach((o,r)=>{const i=Ke(o);r>0&&Ke(t[r-1]??o)===i||e(r)-a<36||(a=e(r),s.push(`<line class="day" x1="${T(e(r))}" x2="${T(e(r))}" y1="${T(n+2)}" y2="${T(n+6)}"/><text class="day" x="${T(e(r))}" y="${T(n+16)}">${i}</text>`))}),s.join("")}function Cd(t,e,n,s=e.length-1){const a=(rr-$s-xd)/Math.max(1,e.length),o=l=>$s+l*a,{markup:r,bottom:i}=Ed(t,o,a),h=s<e.length-1?`<rect class="future" x="${T(o(s+1))}" y="0" width="${T(o(e.length)-o(s+1))}" height="${T(i)}"/><line class="now" x1="${T(o(s)+a/2)}" x2="${T(o(s)+a/2)}" y1="0" y2="${T(i+4)}"/>`:"",c=[...n].map(l=>{const d=e[l];return d?`<rect class="sweep" x="${T(o(l))}" y="0" width="${T(a)}" height="${T(i)}"><title>${$(`${Ke(d)}, a sweep: ${d.subject}`)}</title></rect>`:""}).join("");return`<svg class="change-matrix" data-left="${$s}" data-step="${Number(a.toFixed(3))}" data-row="${vn}" viewBox="0 0 ${rr} ${T(i+Md)}" role="img" aria-label="${t.length} boxes over ${e.length} commits: where each commit changed files, and where it wrote new ones">${c}${r}${h}${Od(e,o,i)}</svg>`}const ir=["January","February","March","April","May","June","July","August","September","October","November","December"];function jd(t,e){const[n,s=1,a]=t.date.slice(0,10).split("-").map(Number),[o,r=1,i]=e.date.slice(0,10).split("-").map(Number),[h,c]=[ir[s-1],ir[r-1]];return n!==o?`from ${a} ${h} ${n} to ${i} ${c} ${o}`:s!==r?`from ${a} ${h} to ${i} ${c} ${o}`:a===i?`on ${a} ${h} ${n}`:`from ${a} to ${i} ${c} ${o}`}function Ld(t,e=t.history.commits.length-1){const{history:n,snapshots:s,lives:a}=t,o=s.at(-1)??{modules:[],dependencies:[]},r=No(o).bands.map(g=>g.name),i=gt(n),h=yt(t,e),c=h.lives.filter(g=>!g.test),l=c.reduce((g,b)=>g+b.changed.length,0),[d,u]=[n.commits[0],h.history.commits.at(-1)],f=h.history.commits.length===n.commits.length?R(n.commits.length,"commit"):`${h.history.commits.length} of ${R(n.commits.length,"commit")}`,m=d&&u?`${f}, ${jd(d,u)}`:"no commits",p=(g,b)=>`<span class="key ${g}"></span>${b}`,w=(g,b)=>`<span class="key shade" style="--v:${g}"></span>${b}`;return`<figure class="changes-figure">${Cd($d(a,r),n.commits,i,h.history.commits.length-1)}<p class="changes-pointed" aria-live="polite"></p><p class="changes-legend">${w(.25,"one file changed")}${w(.5,"two")}${w(.75,"four")}${w(1,"eight or more")}${p("written","a file written")}${p("sweep",`a sweep, over ${bt} files at once`)}</p><figcaption>${m}: ${R(l,"change")} to files that ship, and ${R(c.length,"file")} written.</figcaption></figure>`}const zn=720,Et=220,Ne={x:300,width:120},Ot=34,_n=22,Gn=13,hr=8;function Nd(t){const e=[...new Set(t.modules.filter(a=>!a.test).map(a=>Q(a.path)))].map(a=>qs(t,a)),n=e.filter(({ca:a,ce:o})=>a>=3&&o>=2);return[...n.length>0?n:e].sort((a,o)=>Math.abs((a.instability??1)-.5)-Math.abs((o.instability??1)-.5)||o.files.length-a.files.length||a.box.localeCompare(o.box))[0]?.box??""}function lr(t){const e=t.slice(0,hr).map(({box:s,files:a})=>`${s} · ${R(a,"file")}`),n=t.slice(hr);return n.length>0&&e.push(`and ${R(n.length,"box","boxes")} more · ${R(n.reduce((s,a)=>s+a.files,0),"file")}`),e}const Pd=t=>t===null?"Neither needed nor needing, it has no instability to speak of.":t<.3?"Stable: much stands on it, and it stands on little — hard to change, and seldom made to.":t>.7?"Unstable: it stands on much, and little stands on it — often made to change, and free to.":"Between the two: it is needed, and it needs.";function Rd(t){const[e,n]=[lr(t.neededBy),lr(t.needs)],s=Math.max(1,Math.min(8,Math.ceil(Math.sqrt(t.files.length*1.6)))),a=Math.max(_n*2,24+Math.ceil(t.files.length/s)*Gn+8),o=Ot+Math.max(e.length*_n,n.length*_n,a)+12,r=new Set(t.needing),i=(p,w)=>Ot+a*(w+1)/(p+1),h=p=>Ot+12+p*_n,c=(p,w,g,b)=>`M${T(p)} ${T(w)} C${T((p+g)/2)} ${T(w)} ${T((p+g)/2)} ${T(b)} ${T(g)} ${T(b)}`,l=e.map((p,w)=>{const g=h(w);return`<text class="coupled in" x="${Et-8}" y="${T(g+4)}" text-anchor="end">${$(p)}</text><path class="arrow in" d="${c(Et,g,Ne.x-3,i(e.length,w))}" marker-end="url(#coupled-in)"/>`}).join(""),d=n.map((p,w)=>{const g=h(w);return`<path class="arrow out" d="${c(Ne.x+Ne.width,i(n.length,w),zn-Et-3,g)}" marker-end="url(#coupled-out)"/><text class="coupled out" x="${zn-Et+8}" y="${T(g+4)}">${$(p)}</text>`}).join(""),u=Ne.x+(Ne.width-s*Gn)/2,f=t.files.map((p,w)=>`<circle class="file${r.has(p)?" needing":""}" cx="${T(u+(w%s+.5)*Gn)}" cy="${T(Ot+22+Math.floor(w/s)*Gn)}" r="4"/>`).join(""),m=p=>`<marker id="coupled-${p}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="head ${p}" d="M0 0 L10 5 L0 10 z"/></marker>`;return`<svg class="coupling" data-box="${$(t.box)}" viewBox="0 0 ${zn} ${T(o)}" role="img" aria-label="${$(`${t.box}: ${t.ca} files elsewhere need it, ${t.ce} of its files need elsewhere`)}"><defs>${m("in")}${m("out")}</defs><text class="side in" x="${Et-8}" y="14" text-anchor="end">Ca = ${t.ca}: files elsewhere that need it</text><text class="side out" x="${zn-Et+8}" y="14">Ce = ${t.ce}: its files that need elsewhere</text><rect class="box" x="${Ne.x}" y="${Ot}" width="${Ne.width}" height="${T(a)}" rx="5"/><text class="box-name" x="${Ne.x+Ne.width/2}" y="${Ot+11}" text-anchor="middle">${$(t.box.split("/").pop()??t.box)}</text>${f}${l}${d}</svg>`}function al(t,e=Nd(t)){const n=qs(t,e),{ca:s,ce:a,instability:o}=n,r=o===null?"I has nothing to divide":`I = Ce / (Ca + Ce) = ${a} / (${s} + ${a}) = ${Math.round(o*100)/100}`;return`<figure class="changes-figure coupling-figure">${Rd(n)}<figcaption><strong>${$(e)}</strong>: Ca = ${s}, the files elsewhere that need something in it; Ce = ${a}, its own files that need something elsewhere. ${r}. ${Pd(o)}</figcaption></figure>`}function Bd(t,e,n,s=12){const a=new Map(e.map(p=>[p.id,p])),o=new Set(n.modules.map(p=>p.id)),r=p=>o.has(p)&&a.get(p)?.test===!1,i=n.dependencies.map(({from:p,to:w})=>[p,w]),h={arrow:"an arrow",through:"arrows through others",none:"no arrow at all"},c=(p,w)=>h[Wh(i,p,w)],d=t.filter(({a:p,b:w})=>r(p)&&r(w)).slice(0,s).map(({a:p,b:w,together:g})=>({together:g,a:a.get(p)?.path??"",b:a.get(w)?.path??"",joined:c(p,w)})),u=d.filter(p=>p.joined==="no arrow at all").length,f=d.map(p=>`<tr${p.joined==="no arrow at all"?' class="hidden"':""}><td>${p.together}</td><td><code>${jn(p.a)}</code></td><td><code>${jn(p.b)}</code></td><td>${p.joined}</td></tr>`).join(""),m=`The ${d.length} pairs of files that changed together most, the tests and the sweeps left out, and what joins them in the source now. ${u} of them ${u===1?"has":"have"} no arrow between them, near or far.`;return`<figure class="changes-figure"><table class="together"><thead><tr><th>commits</th><th>one file</th><th>and the other</th><th>between them</th></tr></thead><tbody>${f}</tbody></table><figcaption>${m}</figcaption></figure>`}const cr=560,Yn=400,me={left:44,right:16,top:12,bottom:44},Fd=[0,1,2,5,10,20,50,100],ha=3,Un=t=>`${Math.round(t*10)/10}`,la=t=>t.length>1?`${t.slice(0,-1).join(", ")} and ${t.at(-1)}`:t[0]??"";function Dd(t,e){const n=new Map(e.filter(k=>!k.test&&k.went===void 0).map(k=>[k.id,k.path])),s=[...t].flatMap(([k,S])=>{const M=n.get(k);return M===void 0?[]:[{path:M,...S}]}),a=Math.max(1,...s.map(({expected:k,actual:S})=>Math.max(k,S))),[o,r]=[cr-me.left-me.right,Yn-me.top-me.bottom],i=k=>me.left+Math.sqrt(k/a)*o,h=k=>me.top+r-Math.sqrt(k/a)*r,c=s.filter(({expected:k,actual:S})=>S>=2*k&&S-k>=2).sort((k,S)=>S.actual-S.expected-(k.actual-k.expected)),l=s.filter(({expected:k,actual:S})=>S<=k/2&&k-S>=1).sort((k,S)=>S.expected-S.actual-(k.expected-k.actual)),d=[...s].sort((k,S)=>S.expected-k.expected).slice(0,ha),u=Fd.filter(k=>k<=a).map(k=>`<text x="${T(i(k))}" y="${T(Yn-me.bottom+14)}" text-anchor="middle">${k}</text><text x="${T(me.left-6)}" y="${T(h(k)+3)}" text-anchor="end">${k}</text>`).join(""),f=s.map(k=>`<circle class="file${c.includes(k)?" above":l.includes(k)?" below":""}" cx="${T(i(k.expected))}" cy="${T(h(k.actual))}" r="3.2"><title>${$(`${k.path}: ${k.actual} changes, ${Un(k.expected)} from its ground`)}</title></circle>`).join(""),m=(k,S,M)=>{const x=h(k.actual)+(S==="above"?-4:12)+M*11,I=x>me.top+r-3?h(k.actual)-6-M*11:x;return`<text class="name ${S}" x="${T(i(k.expected)+6)}" y="${T(I)}">${$(k.path.split("/").pop()??k.path)}</text>`},p=[...c.slice(0,2).map((k,S)=>m(k,"above",S)),...l.slice(0,2).map((k,S)=>m(k,"below",S))].join(""),w=`<svg class="ground" viewBox="0 0 ${cr} ${Yn}" role="img" aria-label="Every file by the changes its ground would lead one to expect and the changes it had"><rect class="frame" x="${me.left}" y="${me.top}" width="${o}" height="${r}"/><line class="even" x1="${T(i(0))}" y1="${T(h(0))}" x2="${T(i(a))}" y2="${T(h(a))}"/><text class="even-name" x="${T(i(a*.62))}" y="${T(h(a*.62)+14)}">as its ground would lead one to expect</text>${f}${p}${u}<text class="axis" x="${T(me.left+o/2)}" y="${Yn-8}" text-anchor="middle">what its ground would lead one to expect, in changes</text><text class="axis" transform="translate(12 ${T(me.top+r/2)}) rotate(-90)" text-anchor="middle">the changes it had</text></svg>`,g=[`The files whose ground would lead one to expect the most changes: ${la(d.map(k=>`${k.path} (${Un(k.expected)})`))}.`,c.length>0?`The ones that changed far more than theirs would: ${la(c.slice(0,ha).map(k=>`${k.path} (${k.actual} against ${Un(k.expected)})`))}.`:"",l.length>0?`The ones that changed far less: ${la(l.slice(0,ha).map(k=>`${k.path} (${k.actual} against ${Un(k.expected)})`))}.`:""].filter(Boolean).join(" "),b=(k,S)=>`<span class="key dot ${k}"></span>${S}`,v=`<p class="changes-legend">${b("above","changed far more than its ground would lead one to expect")}${b("below","far less")}${b("even","about as much")}</p>`;return`<figure class="changes-figure">${w}${v}<figcaption>${$(g)}</figcaption></figure>`}function dr(t,e){const{ids:n,weights:s}=Ze(t),a=h=>[...s.get(h)?.values()??[]].reduce((c,l)=>c+l,0),o=n.reduce((h,c)=>h+a(c),0);if(o===0)return 0;const r=new Map,i=new Map;for(const h of n){const c=e.get(h)??-1-h;i.set(c,(i.get(c)??0)+a(h));for(const[l,d]of s.get(h)??[])(e.get(l)??-1-l)===c&&r.set(c,(r.get(c)??0)+d)}return[...i].reduce((h,[c,l])=>h+(r.get(c)??0)/o-(l/o)**2,0)}const Hd=720,ur=240,mr=20,fr=12,pr=3,ca=3,Wd={platform:"frame",features:"feature"};function qd(t,e){const n=new Map(t.modules.map(v=>[v.id,v.path])),s=new Map;for(const[v,k]of e){const S=Q(n.get(v)??""),M=s.get(k)??new Map;M.set(S,(M.get(S)??0)+1),s.set(k,M)}const a=[...s.values()].map(v=>({boxes:[...v].sort((k,S)=>S[1]-k[1]||k[0].localeCompare(S[0])),files:[...v.values()].reduce((k,S)=>k+S,0)})).sort((v,k)=>k.files-v.files||(v.boxes[0]?.[0]??"").localeCompare(k.boxes[0]?.[0]??"")),o=a.filter(v=>v.files>=pr),r=Math.max(1,...o.map(v=>v.files)),i=o.map((v,k)=>{const S=6+k*mr;let M=0;const x=v.boxes.map(([P,C])=>{const E=C/r*ur,N=`<rect class="part ${Wd[He(P)]??"root"}" x="${T(M)}" y="${T(S)}" width="${T(Math.max(1,E-2))}" height="${fr}" rx="2"><title>${$(`${P}: ${C}`)}</title></rect>`;return M+=E,N}).join(""),I=v.boxes.slice(0,ca).map(([P,C])=>`${P.split("/").pop()} ${C}`).join(", "),L=v.boxes.length>ca?` and ${v.boxes.length-ca} more`:"";return`${x}<text class="group" x="${ur+12}" y="${T(S+fr-2)}">${$(`${R(v.files,"file")}: ${I}${L}`)}</text>`}).join(""),h=6+o.length*mr+4,c=`<svg class="groups" viewBox="0 0 ${Hd} ${h}" role="img" aria-label="The groups the arrows make of the files, each as the boxes its files are in">${i}</svg>`,l=new Map(t.modules.filter(v=>!v.test).map(v=>[v.id,Q(v.path)])),d=[...new Set(l.values())],u=new Map([...l].map(([v,k])=>[v,d.indexOf(k)])),f=new Map;for(const v of l.values())f.set(v,(f.get(v)??0)+1);const m=[...f.keys()].filter(v=>He(v)==="features"&&v.includes("/")&&!v.endsWith(".ts")),p=m.filter(v=>a.some(k=>k.boxes.length===1&&k.boxes[0]?.[0]===v&&k.files===f.get(v))),w=a.length-o.length,g=`The arrows alone, with no box said, gather the ${R(e.size,"file")} that ship into ${R(a.length,"group")}${w>0?`, ${R(w,"group")} of fewer than ${pr} files among them, not drawn`:""}. ${p.length} of the ${R(m.length,"feature")} ${p.length===1?"is a group to itself":"are a group to themselves"}: all of ${p.length===1?"its":"their"} files, and nothing else. Drawn as the boxes say, the source has a modularity of ${dr(t,u).toFixed(2)}; drawn as the arrows would, ${dr(t,e).toFixed(2)}.`,b=(v,k)=>`<span class="key ${v}"></span>${k}`;return`<figure class="changes-figure">${c}<p class="changes-legend">${b("frame","a box of the frame")}${b("feature","a feature")}${b("root","the top of the source")}</p><figcaption>${$(g)}</figcaption></figure>`}function zd(t,e,n,s=12,a=e){const o=t.filter(l=>!l.test&&l.went===void 0).sort((l,d)=>d.changed.length-l.changed.length||d.lines-l.lines||l.path.localeCompare(d.path)).slice(0,s),r=l=>n?.lines[l.path],i=o.map(l=>{const d=r(l);return`<tr><td><code>${jn(l.path)}</code></td><td>${l.changed.length}</td><td>${l.lines}</td><td>${d===void 0?"–":`${Math.round(d)}%`}</td><td>${_h(l,e,a)}</td></tr>`}).join(""),h=o.filter(l=>r(l)===0).length,c=[`The ${o.length} files changed most, each one's life on the same line of commits, from the first to the last: a dot where it was written, and a mark for every commit that changed it.`,n?`${h} of them ${h===1?"has":"have"} no line a test runs.`:""].join(" ");return`<figure class="changes-figure"><table class="hotspots"><thead><tr><th>file</th><th>changes</th><th>lines</th><th>tests run</th><th>its life, commit by commit</th></tr></thead><tbody>${i}</tbody></table><figcaption>${c.trim()}</figcaption></figure>`}const da={width:440,height:290},Z={left:52,right:428,top:14,bottom:238},ao={width:250,height:214,bar:130},_d=[1,2,5,10,20,50,100,200,500],Gd=[1,.1,.01,.001],gr=t=>t>=10?`${Math.round(t)}`:t.toFixed(1),Ns=t=>t.split("/").pop()??t;function wr(t){const e=new Map;for(const s of t)s>0&&e.set(s,(e.get(s)??0)+1);let n=[...e.values()].reduce((s,a)=>s+a,0);return[...e].sort((s,a)=>s[0]-a[0]).map(([s,a])=>{const o={degree:s,files:n};return n-=a,o})}function Ps(t,e){const n=Math.max(0,...t);return{degree:n,path:e[t.indexOf(n)]?.path??""}}function yr(t,e,n,s,a){const o=Math.max(n,s)||1,r=(i,h,c,l)=>{const d=Math.max(1.5,i/o*ao.bar);return`<rect class="bar ${h}" x="4" y="${c}" width="${T(d)}" height="11" rx="2"/><text class="value" x="${T(4+d+6)}" y="${c+9}">${a(i)} ${l}</text>`};return`<text class="pair" x="4" y="${t}">${e}</text>${r(n,"mine",t+7,"here")}${r(s,"chance",t+22,"at random")}`}function Yd(t,e){const n=Math.max(2,...t.neededBy,...t.needs),s=Math.max(2,t.files),a=d=>Z.left+Math.log(d)/Math.log(n)*(Z.right-Z.left),o=d=>Z.top+-Math.log(d)/Math.log(s)*(Z.bottom-Z.top),r=(d,u,f)=>{const m=d.map(({degree:g,files:b})=>`${T(a(g))},${T(o(b/t.files))}`),p=m.length>1?`<polyline class="tail ${u}" points="${m.join(" ")}"/>`:"",w=d.map(({degree:g,files:b})=>`<circle class="dot ${u}" cx="${T(a(g))}" cy="${T(o(b/t.files))}" r="3"><title>${f} ${g} or more: ${R(b,"file")}, ${ee(b,t.files)}</title></circle>`).join("");return p+w},[i,h]=[Ps(t.neededBy,e),Ps(t.needs,e)],c=[{end:i,kind:"in",words:`${Ns(i.path)}, needed by ${i.degree}`},{end:h,kind:"out",words:`${Ns(h.path)}, needing ${h.degree}`}].filter(({end:d})=>d.degree>0).map(({kind:d,words:u},f)=>`<circle class="dot ${d}" cx="${Z.right-9}" cy="${Z.top+13+f*15}" r="3"/><text class="end" x="${Z.right-17}" y="${Z.top+16.5+f*15}" text-anchor="end">${$(u)}</text>`).join(""),l=_d.filter(d=>d<=n).map(d=>`<text class="tick" x="${T(a(d))}" y="${Z.bottom+14}" text-anchor="middle">${d}</text>`).join("")+Gd.filter(d=>d>=1/s).map(d=>`<text class="tick" x="${Z.left-6}" y="${T(o(d)+3)}" text-anchor="end">${d*100}%</text>`).join("");return`<svg class="network tails" viewBox="0 0 ${da.width} ${da.height}" role="img" aria-label="The share of files needed by so many others or more, and the share needing so many or more, on log scales"><rect class="frame" x="${Z.left}" y="${Z.top}" width="${Z.right-Z.left}" height="${Z.bottom-Z.top}"/>${l}${r(wr(t.needs),"out","needing")}${r(wr(t.neededBy),"in","needed by")}${c}<text class="axis" x="${(Z.left+Z.right)/2}" y="${da.height-22}" text-anchor="middle">how many others: needed by, or needing (a log scale)</text><text class="axis" transform="translate(12 ${(Z.top+Z.bottom)/2}) rotate(-90)" text-anchor="middle">the share of files (a log scale)</text></svg>`}function Ud(t){return`<svg class="network chance" viewBox="0 0 ${ao.width} ${ao.height}" role="img" aria-label="The network's clustering and paths against a random network as big"><text class="side-title" x="4" y="22">against a random network as big</text>`+yr(52,"clustering",t.clustering,t.randomClustering,e=>e.toPrecision(2))+yr(112,"mean way between two files, in arrows",t.meanPath,t.randomPath,e=>e.toFixed(2))+`<text class="pair" x="4" y="176">small-world-ness</text><text class="hero" x="4" y="206">${t.smallWorld.toFixed(1)}</text></svg>`}function Jd(t){const e=zh(t),n=t.modules.filter(c=>!c.test),s=e.randomPath>0&&e.meanPath>0,[a,o]=[Ps(e.neededBy,n),Ps(e.needs,n)],r=e.neededBy.filter(c=>c<=2).length,i=e.arrows===0?`The ${R(e.files,"file")} that ship need nothing of each other yet.`:`Of the ${R(e.files,"file")} that ship, ${ee(r,e.files)} are needed by two others or fewer, and ${Ns(a.path)} is needed by ${a.degree}, the most; ${Ns(o.path)} needs ${o.degree}, the most. `+(s?`The network is ${gr(e.clustering/e.randomClustering)} times as clustered as a random network of as many files and links, and the ways between its files are ${gr(e.meanPath/e.randomPath)} times as long: a small-world-ness of ${e.smallWorld.toFixed(1)}.`:"It has too few links yet to set against a random network."),h=(c,l)=>`<span class="key ${c}"></span>${l}`;return`<figure class="changes-figure"><div class="network-drawings">${Yd(e,n)}${s?Ud(e):""}</div><p class="changes-legend">${h("needed-by","needed by so many or more")}${h("needing","needing so many or more")}</p><figcaption>${$(i)}</figcaption></figure>`}const br=240,Jn=36,Kn=3,Kd=new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"long",year:"numeric",timeZone:"Europe/Madrid"}),oo=[{key:"againstStability",name:"arrows against stability",counts:"box arrows from a box to one less stable than itself, by Robert C. Martin's measure; the composition's aside, which has to point at every feature",said:t=>`${t} box ${t===1?"arrow":"arrows"} against stability`},{key:"deepestCore",name:"deepest core",counts:"how deep the knot of files goes: what is left when every file with fewer links than that is taken away, again and again",said:t=>`a core ${t} deep`},{key:"tallestStack",name:"tallest stack",counts:"the longest chain of what needs what, in arrows",said:t=>`a stack ${t} ${t===1?"arrow":"arrows"} tall`},{key:"untested",name:"untested files",counts:"files that ship with something in them to run that no test imports",said:t=>`${t} ${t===1?"file":"files"} with something to run that no test imports`}],ol=t=>t.length>1?`${t.slice(0,-1).join(", ")} and ${t.at(-1)}`:t[0]??"";function Vd(t,e,n,s){const a=Math.max(1,...t),o=c=>Kn+c/Math.max(1,t.length-1)*(br-Kn*2),r=c=>Jn-Kn-c/a*(Jn-Kn*2),i=(c,l)=>t.slice(c,l+1).map((d,u)=>`${T(o(c+u))},${T(r(d))}`).join(" "),h=t[e]??0;return`<svg class="ratchet-line" viewBox="0 0 ${br} ${Jn}" role="img" aria-label="${s} at every commit, ${h} at the one shown">`+(n===null?"":`<line class="began" x1="${T(o(n))}" x2="${T(o(n))}" y1="0" y2="${Jn}"/>`)+`<polyline class="after" points="${i(e,t.length-1)}"/><polyline class="held" points="${i(0,e)}"/><circle class="now" cx="${T(o(e))}" cy="${T(r(h))}" r="2.5"/></svg>`}function Xd(t,e,n){const s=Kd.format(new Date(n.date));if(e<n.at)return`The ratchet began on ${s}, after this commit.`;const a=t.slice(n.at,e+1),o=oo.filter(({key:r})=>a.some((i,h)=>h>0&&i[r]>(a[h-1]?.[r]??i[r])));return`The ratchet holds them from ${s}: since then, ${o.length===0?"none has gone up":`${ol(o.map(({name:r})=>`the ${r}`))} went up`}.`}function Zd(t,e,n){const s=t[e]??t.at(-1);if(!s)return"";const a=oo.map(({key:r,name:i,counts:h})=>{const c=t.map(l=>l[r]);return`<tr><td><strong>${i}</strong><br><span class="ratchet-counts">${h}</span></td><td>${Vd(c,e,n?.at??null,i)}</td><td class="now">${s[r]}</td></tr>`}).join(""),o=`At this commit: ${ol(oo.map(({key:r,said:i})=>i(s[r])))}.${n?` ${Xd(t,e,n)}`:""}`;return`<figure class="changes-figure"><table class="ratchet"><thead><tr><th>what the ratchet holds</th><th>over the history</th><th>now</th></tr></thead><tbody>${a}</tbody></table><figcaption>${o}</figcaption></figure>`}function Ys(t){if(t<=0)return[0];const e=10**Math.floor(Math.log10(t)),n=t/e>=5?e:t/e>=2?e/2:e/5,s=[];for(let a=0;a<=t;a+=n)s.push(Math.round(a*100)/100);return s}const ua=600,Vn=150,Pe={top:12,right:12,bottom:22,left:40},Qd=3,vr=new WeakMap,eu=t=>{const e=vr.get(t);if(e!==void 0)return e;const n=nl(t);return vr.set(t,n),n};function tu(t,e){const n=t.slice(0,e+1),s=n.map(eu),a=Math.max(.01,...s),o=p=>Pe.left+p/Math.max(1,t.length-1)*(ua-Pe.left-Pe.right),r=p=>Pe.top+(1-p/a)*(Vn-Pe.top-Pe.bottom),i=s.map((p,w)=>`${T(o(w))},${T(r(p))}`).join(" "),h=Ys(Math.round(a*1e3)/10).map(p=>p/100).map(p=>`<line class="grid" x1="${Pe.left}" x2="${ua-Pe.right}" y1="${T(r(p))}" y2="${T(r(p))}"/><text x="${Pe.left-6}" y="${T(r(p)+3)}" text-anchor="end">${ee(p,1)}</text>`).join(""),c=`<svg class="reach" viewBox="0 0 ${ua} ${Vn}" role="img" aria-label="The share of the source a change to one file could reach, commit by commit">${h}<polyline class="reach" points="${i}"/><text x="${T(o(0))}" y="${Vn-6}">the first commit</text><text x="${T(o(t.length-1))}" y="${Vn-6}" text-anchor="end">the last</text></svg>`,l=n.at(-1)??{modules:[],dependencies:[]},d=new Map(l.modules.map(p=>[p.id,p.path])),f=[...Co(l)].sort((p,w)=>w[1]-p[1]||(d.get(p[0])??"").localeCompare(d.get(w[0])??"")).slice(0,Qd).map(([p,w])=>`${d.get(p)}, whose change could reach ${R(w,"file")}`),m=`In theory a change to one file could reach ${ee(s.at(-1)??0,1)} of the source, on average; at the first commit, ${ee(s[0]??0,1)}. The farthest reaching: ${f.length>1?`${f.slice(0,-1).join("; ")}; and ${f.at(-1)}`:f[0]??"none"}.`;return`<figure class="changes-figure">${c}<figcaption>${$(m)}</figcaption></figure>`}function kr(t,e){const[n,s]=[ee(t.carried,t.changes),ee(e.carried,e.changes)],[a,o]=[t.carried/Math.max(1,t.changes),e.carried/Math.max(1,e.changes)];return{how:n===s?"as often":a<o?"less often":"more often",shares:`${n} against ${s}`}}function nu(t){const{most:e}=t;if(!e||e.changes*2<=t.changes)return"";const n={changes:t.changes-e.changes,carried:t.carried-e.carried};return` But ${e.changes} of those ${t.changes} were changes to one file, ${$(e.path)}, and carried ${ee(e.carried,e.changes)}; the rest carried ${ee(n.carried,n.changes)}.`}function su(t){const e=(r,i)=>t.find(h=>h.across===r&&h.typeOnly===i)??{across:r,typeOnly:i,changes:0,carried:0,most:null},n=r=>`<td>${ee(r.carried,r.changes)} · ${r.carried} of ${r.changes}</td>`,s=(r,i)=>`<tr><th scope="row">${i}</th>${n(e(r,!1))}${n(e(r,!0))}</tr>`,a=kr(e(!0,!0),e(!0,!1)),o=kr(e(!1,!0),e(!1,!1));return`<figure class="changes-figure"><table class="ripples"><thead><tr><th></th><th>onto a value</th><th>onto only a type</th></tr></thead><tbody>${s(!1,"inside a box")}${s(!0,"across two boxes")}</tbody></table><figcaption>Across boxes, an arrow onto a type carried a change ${a.how} ${a.how==="as often"?"as":"than"} one onto a value: ${a.shares}.${nu(e(!0,!0))} Inside a box, ${o.how}: ${o.shares}.</figcaption></figure>`}function au(t,e){const n=o=>(o.went??e)-1-o.born,s=Math.max(0,...t.map(n)),a=[];for(let o=1,r=1;o<=s;o=r+1,r*=2){const i=Math.min(r,s),h=t.reduce((l,d)=>l+Math.max(0,Math.min(i,n(d))-o+1),0),c=t.reduce((l,d)=>l+d.changed.filter(u=>u-d.born>=o&&u-d.born<=i).length,0);a.push({from:o,to:i,lived:h,changed:c})}return a}const Xn=600,ma=190,rt={top:18,right:8,bottom:36,left:8},ou=34,ru=({from:t,to:e})=>t===e?`${t}`:`${t}–${e}`,$r=t=>t.reduce((e,n)=>({lived:e.lived+n.lived,changed:e.changed+n.changed}),{lived:0,changed:0});function iu(t,e){const n=t.filter(g=>!g.test),s=au(n,e),a=g=>g.lived>0?g.changed/g.lived:0,o=Math.max(1e-4,...s.map(a)),r=(Xn-rt.left-rt.right)/Math.max(1,s.length),i=Math.min(ou,r*.6),h=ma-rt.bottom,c=s.map((g,b)=>{const v=a(g)/o*(h-rt.top),[k,S]=[rt.left+r*b+(r-i)/2,h-v];return`<rect class="bar" x="${T(k)}" y="${T(S)}" width="${T(i)}" height="${T(v)}" rx="2"><title>${g.changed} of ${g.lived}</title></rect><text class="value" x="${T(k+i/2)}" y="${T(S-4)}" text-anchor="middle">${ee(g.changed,g.lived)}</text><text class="age" x="${T(k+i/2)}" y="${T(h+13)}" text-anchor="middle">${ru(g)}</text>`}).join(""),l=`<svg class="settling" viewBox="0 0 ${Xn} ${ma}" role="img" aria-label="The share of commits that changed a file, by how many commits old it was"><line class="base" x1="${rt.left}" x2="${Xn-rt.right}" y1="${T(h)}" y2="${T(h)}"/>${c}<text class="axis" x="${Xn/2}" y="${ma-6}" text-anchor="middle">its age: the commits since the one that wrote it</text></svg>`,d=n.filter(g=>g.went===void 0),u=d.filter(g=>g.changed.length===0).length,f=$r(s.filter(g=>g.to<=2)),m=$r(s.filter(g=>g.from>8)),p=[`${u} of the ${R(d.length,"file")} that ship have not changed since the commit that wrote them.`];if(f.lived>0){const g=m.lived>0?`, and in ${ee(m.changed,m.lived)} of those after its eighth`:"";p.push(`A file changed in ${ee(f.changed,f.lived)} of the first two commits it lived through${g}.`)}const w=p.join(" ");return`<figure class="changes-figure">${l}<figcaption>${w}</figcaption></figure>`}const xr=560,Zn=420,Ae={left:46,right:14,top:14,bottom:44},hu=2.5,Ve=t=>t.changes/Math.max(1,t.files),rl=t=>`${Math.round(t*10)/10}`,lu=t=>Math.abs(t.abstractness+(t.instability??0)-1),il=t=>t.instability!==null&&t.abstractness+t.instability<.5,hl=t=>t.filter(e=>il(e)&&e.changes>0).sort((e,n)=>Ve(n)-Ve(e)||n.changes-e.changes);function cu(t){const[e,n]=[xr-Ae.left-Ae.right,Zn-Ae.top-Ae.bottom],s=u=>Ae.left+u*e,a=u=>Ae.top+(1-u)*n,o=(u,f)=>`<polygon class="zone ${u}" points="${f.map(([m,p])=>`${T(s(m))},${T(a(p))}`).join(" ")}"/>`,i=t.filter(u=>u.instability!==null).sort((u,f)=>Ve(u)-Ve(f)||f.files-u.files).map(u=>{const f=`${u.box}: needed by ${R(u.neededBy,"file")} elsewhere, needs ${u.needs}; ${R(u.changes,"change")} to its ${R(u.files,"file")}`;return`<circle class="box" data-box="${$(u.box)}" cx="${T(s(u.instability??0))}" cy="${T(a(u.abstractness))}" r="${T(2.5+Math.sqrt(u.files)*.9)}" style="--v:${Math.min(1,Ve(u)/hu).toFixed(2)}"><title>${$(f)}</title></circle>`}).join(""),h=hl(t).slice(0,4).sort((u,f)=>f.abstractness-u.abstractness||(u.instability??0)-(f.instability??0)).map((u,f)=>({box:u,x:s(.17),y:a(.44)+f*14})),c=h.map(({box:u,x:f,y:m})=>`<line class="leader" x1="${T(f-3)}" y1="${T(m-3)}" x2="${T(s(u.instability??0))}" y2="${T(a(u.abstractness))}"/>`).join(""),l=h.map(({box:u,x:f,y:m})=>`<text class="name" x="${T(f)}" y="${T(m)}">${$(u.box)}</text>`).join(""),d=[0,.5,1].map(u=>`<text x="${T(s(u))}" y="${T(Zn-Ae.bottom+14)}" text-anchor="middle">${u}</text>${u===0?"":`<text x="${T(Ae.left-6)}" y="${T(a(u)+3)}" text-anchor="end">${u}</text>`}`).join("");return`<svg class="stability" viewBox="0 0 ${xr} ${Zn}" role="img" aria-label="Every box by how unstable and how abstract it is, and how often it changed">`+o("pain",[[0,0],[.5,0],[0,.5]])+o("useless",[[1,1],[.5,1],[1,.5]])+`<rect class="frame" x="${Ae.left}" y="${Ae.top}" width="${e}" height="${n}"/><line class="sequence" x1="${T(s(0))}" y1="${T(a(1))}" x2="${T(s(1))}" y2="${T(a(0))}"/><text class="zone-name" x="${T(s(.01))}" y="${T(a(.5)-5)}">zone of pain</text><text class="zone-name" x="${T(s(.99))}" y="${T(a(.5)+13)}" text-anchor="end">zone of uselessness</text><text class="zone-name" transform="translate(${T(s(.62))} ${T(a(.38)-6)}) rotate(${T(Math.atan2(n,e)*180/Math.PI)})" text-anchor="middle">the main sequence</text>${c}${i}${l}${d}<text class="axis" x="${T(s(.5))}" y="${Zn-8}" text-anchor="middle">instability: how little needs it, so how free it is to change</text><text class="axis" transform="translate(12 ${T(a(.5))}) rotate(-90)" text-anchor="middle">abstractness: its files of nothing but types</text></svg>`}function du(t){const[e]=t;if(!e)return" No arrow between boxes goes against his rule of stable dependencies.";const n=new Map;for(const{from:r}of t)n.set(r,(n.get(r)??0)+1);const[s,a=0]=[...n].sort((r,i)=>i[1]-r[1])[0]??[],o=s&&a*2>t.length?` ${a} of them leave ${s}.`:"";return` ${R(t.length,"arrow")} between boxes ${t.length===1?"goes":"go"} from a box to a less stable one, against his rule of stable dependencies; the steepest, from ${e.from} to ${e.to}.${o}`}function uu(t){const e=t.filter(il).length,n=hl(t).map((a,o)=>`${a.box} (${rl(Ve(a))}${o===0?` ${Ve(a)===1?"change":"changes"} a file`:""})`),s=n.length>1?`${n.slice(0,-1).join(", ")} and ${n.at(-1)}`:n[0]??"none of them";return`${R(e,"box","boxes")} ${e===1?"stands":"stand"} in the zone of pain. The ones there that have changed, the most first: ${s}.`}function mu(t){return`<details class="numbers"><summary>every box's figures</summary><table><thead><tr><th>box</th><th>files</th><th>needed by</th><th>needs</th><th>I</th><th>A</th><th>D</th><th>changes a file</th></tr></thead><tbody>${[...t].sort((n,s)=>n.box.localeCompare(s.box)).map(n=>`<tr><td><code>${jn(n.box)}</code></td><td>${n.files}</td><td>${n.neededBy}</td><td>${n.needs}</td><td>${n.instability===null?"–":n.instability.toFixed(2)}</td><td>${n.abstractness.toFixed(2)}</td><td>${n.instability===null?"–":lu(n).toFixed(2)}</td><td>${rl(Ve(n))}</td></tr>`).join("")}</tbody></table></details>`}function fu(t,e=[]){return`<figure class="changes-figure">${cu(t)}<figcaption>${uu(t)}${du(e)}</figcaption>${mu(t)}</figure>`}function pu({tested:t,withTest:e,untested:n}){return`<figure class="changes-figure tested"><p class="figure-number"><strong>${ee(e,t)}</strong> of the changes to a file a test imports came with its test</p><figcaption>${e} of the ${t} changes to a file a test imports came with a change to that test, or a new one, in the same commit. Another ${n} changes went to files with something to run that no test imports.</figcaption></figure>`}function gu(t,e,n=bt){const s=[!1,!0].flatMap(a=>[!1,!0].map(o=>({across:a,typeOnly:o,changes:0,carried:0,heads:new Map})));return t.changes.forEach((a,o)=>{const r=e[o-1];if(!r||a.changed.length===0||a.changed.length>n)return;const i=new Map(r.modules.filter(l=>!l.test).map(l=>[l.id,l.path])),h=new Set(a.changed),c=new Set(a.removed);for(const{from:l,to:d,typeOnly:u}of r.dependencies){const[f,m]=[i.get(l),i.get(d)];if(f===void 0||m===void 0||c.has(l)||!h.has(d))continue;const p=Q(f)!==Q(m),w=s.find(v=>v.across===p&&v.typeOnly===u);if(!w)continue;const g=h.has(l)?1:0,b=w.heads.get(d)??{changes:0,carried:0};w.heads.set(d,{path:m,changes:b.changes+1,carried:b.carried+g}),w.changes+=1,w.carried+=g}}),s.map(({heads:a,...o})=>({...o,most:[...a.values()].sort((r,i)=>i.changes-r.changes||r.path.localeCompare(i.path))[0]??null}))}const wu=["main.ts","features/allFeatures.ts"];function yu(t){const e=new Set(wu.map(Q)),n=Po(t);return{againstStability:Ro(Gs(t),_s(t,[])).filter(({from:s})=>!e.has(s)).length,deepestCore:Math.max(0,...J.cores(t).values()),tallestStack:Math.max(0,...J.heights(t).values()),untested:t.modules.filter(s=>!s.test&&!s.typesOnly&&!n.has(s.id)).length}}const Tr=new WeakMap;function bu(t){const e=Tr.get(t);if(e)return e;const n=t.snapshots.map(yu);return Tr.set(t,n),n}function vu(t,e,n=bt){const s={tested:0,withTest:0,untested:0};return t.changes.forEach((a,o)=>{const r=e[o];if(!r||a.changed.length>n)return;const i=new Map(r.modules.map(l=>[l.id,l])),h=new Map;for(const{from:l,to:d}of r.dependencies)i.get(l)?.test&&!i.get(d)?.test&&h.set(d,[...h.get(d)??[],l]);const c=new Set([...a.changed,...a.added.map(([l])=>l)]);for(const l of a.changed){const d=i.get(l);if(!d||d.test||d.typesOnly)continue;const u=h.get(l)??[];u.length===0?s.untested+=1:(s.tested+=1,u.some(f=>c.has(f))&&(s.withTest+=1))}}),s}const ku={modules:[],dependencies:[]},$u="88300e5",be=(t,e)=>{const n=yt(t,e);return{...n,source:n.snapshots.at(-1)??ku}},ll={"change-matrix":(t,e)=>Ld(t,e),"change-settling":(t,e)=>{const{history:n,lives:s}=be(t,e);return iu(s,n.commits.length)},"change-hotspots":(t,e,n)=>{const{history:s,lives:a}=be(t,e),o=n?.sha===s.commits.at(-1)?.sha?n:null;return zd(a,s.commits.length,o,12,t.history.commits.length)},"change-stability":(t,e)=>{const{history:n,source:s,lives:a}=be(t,e),o=_s(s,a,gt(n));return fu(o,Ro(Gs(s),o))},"change-cascade":(t,e)=>{const{history:n,snapshots:s,source:a}=be(t,e);return kd(gd(n,s),nl(a))},"change-ripples":(t,e)=>{const{history:n,snapshots:s}=be(t,e);return su(gu(n,s))},"change-together":(t,e)=>{const{history:n,lives:s,source:a}=be(t,e);return Bd(Hh(n),s,a)},"change-tests":(t,e)=>{const{history:n,snapshots:s}=be(t,e);return pu(vu(n,s))},"change-ground":(t,e)=>{const n=J.standings(t);return Dd(Eo(n,zs(n,e),e),be(t,e).lives)},"change-coupling":(t,e)=>al(be(t,e).source),"tangle-network":(t,e)=>Jd(be(t,e).source),"tangle-groups":(t,e)=>{const{source:n}=be(t,e);return qd(n,J.groups(n))},"tangle-bridges":(t,e)=>{const{source:n}=be(t,e);return yd(n,J.bridges(n))},"tangle-reach":(t,e)=>tu(t.snapshots,e),ratchet:(t,e)=>{const n=t.history.commits.findIndex(s=>s.sha.startsWith($u));return Zd(bu(t),e,n<0?null:{at:n,date:t.history.commits[n]?.date??""})}};function y(t,e={},...n){const s=document.createElement(t);for(const[a,o]of Object.entries(e))o===void 0||o===!1||(typeof o=="function"?s.addEventListener(a.slice(2).toLowerCase(),o):o===!0?s.setAttribute(a,""):s.setAttribute(a,String(o)));for(const a of n)a==null||a===!1||s.append(a);return s}function Us(t){let e=!0;if(typeof IntersectionObserver!="function")return{onScreen:()=>e,stop:()=>{}};const n=new IntersectionObserver(s=>{for(const a of s)e=a.isIntersecting},{rootMargin:"100px"});return n.observe(t),{onScreen:()=>e,stop:()=>n.disconnect()}}function xu(t,e,n=new Set){return new Map(t.map(s=>[s.id,s.changed.filter(a=>a<=e&&!n.has(a)).length]))}const Tu=6,Sr=2.2;function Su(t,e){const n=new Map;for(const{from:s,to:a}of t.dependencies){const[o,r]=e==="neededBy"?[a,s]:[s,a];n.set(o,(n.get(o)??new Set).add(r))}return new Map([...n].map(([s,a])=>[s,a.size]))}function Mu(t,e,n){if(e==="lines")return null;const s=e==="neededBy"||e==="needs"?Su(t,e):n?.counts??new Map,a=Math.max(1,n?.most??0,...s.values());return new Map(t.modules.map(o=>[o.id,Sr+(Tu-Sr)*Math.sqrt((s.get(o.id)??0)/a)]))}const Au={modules:[],dependencies:[]},Iu={neededBy:"a ball as big as the files that need it",needs:"a ball as big as the files it needs",reachedBy:"a ball as big as all the files a change to it could reach",bridges:"a ball as big as it stands between the others",changes:"a ball as big as the commits that changed it so far",lines:"a ball as big as its lines"},Eu={plain:"",heat:"warm as it changed lately, cooling by half every six commits",exposure:"warm as often as files that stood where it stood changed",stability:"as deep as its box is stable, by Robert C. Martin's measure, with the box arrows that go against it in red"},Ou={1:"point at a file for what it needs and what needs it, keyed on the line over the picture",2:"point at a file for what it needs and what needs it, two arrows out",3:"point at a file for what it needs and what needs it, three arrows out",all:"point at a file for everything it needs and everything that needs it",group:"point at a file for its group: the files the arrows gather with it, whatever their box",together:"point at a file for what changed with it"};function Cu(t){const e=Math.max(0,...t.values());return new Map([...t].map(([n,s])=>[n,e>0?s/e:0]))}function ju(t,e,n,s){const a={tones:null,ramp:null,against:new Set};if(n==="plain")return a;if(n==="heat")return{...a,ramp:"warm",tones:new Map([...Fh(t.lives,e,void 0,gt(t.history))].map(([l,d])=>[l,Math.min(1,d)]))};if(n==="exposure"){const l=J.standings(t),d=Eo(l,zs(l,e),e),u=new Set(s.modules.map(f=>f.id));return{...a,ramp:"warm",tones:Cu(new Map([...d].filter(([f])=>u.has(f)).map(([f,{expected:m}])=>[f,m])))}}const o=yt(t,e),r=_s(s,o.lives,gt(o.history)),i=new Map(r.map(l=>[l.box,l.instability])),h=new Map(s.modules.flatMap(l=>{const d=i.get(Q(l.path));return d==null?[]:[[l.id,1-d]]})),c=new Set(Ro(Gs(s),r).map(({from:l,to:d})=>`${l}>${d}`));return{tones:h,ramp:"cool",against:c}}function Lu(t,e,n){const s=t.snapshots[e]??Au,a={changes:()=>{const h=gt(t.history);return{counts:xu(t.lives,e,h),most:Math.max(0,...t.lives.map(c=>c.changed.filter(l=>!h.has(l)).length))}},reachedBy:()=>({counts:J.reach(s)}),bridges:()=>({counts:J.bridges(s)})},o=Mu(s,n.sizing,a[n.sizing]?.()),r=n.together?qh(yt(t,e).history,s):[],i=[Iu[n.sizing],Eu[n.colour],n.together?"a warm thread for two files that changed together twice or more, dashed where no arrow joins them":"",Ou[n.pointing]];return{sizes:o,...ju(t,e,n.colour,s),threads:r,groups:n.pointing==="group"?J.groups(s):null,said:i.filter(Boolean).join(" · ")}}const Rs=3,Nu={1:1,2:2,3:3,all:1/0},Mr=t=>t.split("/").pop()??t,Ar=t=>t>Rs?` and ${t-Rs} more`:"";function Pu(t,e,n,s,a){const o=a===void 0?"":` · tests run ${Math.round(a)}% of it`,r=`<code>${$(t)}</code> · `;if(e==="group"){const c=new Map;for(const u of n.tied){const f=Q(s.get(u)??"");c.set(f,(c.get(f)??0)+1)}const l=[...c].sort((u,f)=>f[1]-u[1]||u[0].localeCompare(f[0])),d=l.slice(0,Rs).map(([u,f])=>`${Mr(u)} ${f}`).join(", ");return`${r}<span class="key group"></span>${$(`its group: ${n.tied.size} files in ${l.length} ${l.length===1?"box":"boxes"}: ${d}${Ar(l.length)}`)}${o}`}if(e==="together"){const c=n.partners.slice(0,Rs).map(([l,d])=>`${Mr(s.get(l)??"")} ${d}×`).join(", ");return`${r}<span class="key together"></span>${$(n.partners.length>0?`changed with ${c}${Ar(n.partners.length)}`:"changed with no file twice")}${o}`}const i=Nu[e]??1,h=c=>{const l=[...c.values()].filter(d=>d===1).length;return i>1&&c.size>l?`${l} (${c.size} within ${Number.isFinite(i)?i:"any"})`:`${l}`};return`${r}<span class="key needs"></span>needs ${h(n.needs)} · <span class="key needed-by"></span>needed by ${h(n.neededBy)}${o}`}const Ru={1:1,2:2,3:3,all:1/0};function Bu(t,e,n,s,a){const o={needs:new Map,neededBy:new Map,partners:[]};if(e==="group"){const c=s?.get(t);return{...o,tied:new Set([t,...[...s??[]].filter(([,l])=>l===c).map(([l])=>l)])}}if(e==="together"){const c=a.flatMap(({a:l,b:d,together:u})=>l===t?[[d,u]]:d===t?[[l,u]]:[]).sort((l,d)=>d[1]-l[1]||l[0]-d[0]);return{...o,partners:c,tied:new Set([t,...c.map(([l])=>l)])}}const r=Ru[e]??1,i=On(n,t,r,"needs"),h=On(n,t,r,"neededBy");return{...o,needs:i,neededBy:h,tied:new Set([t,...i.keys(),...h.keys()])}}function Ir(t){const e=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(t.trim())?.[1];if(!e)return null;const n=e.length===3?[...e].map(s=>s+s).join(""):e;return[0,2,4].map(s=>parseInt(n.slice(s,s+2),16))}function Fu(t,e){const n=Math.min(1,Math.max(0,e))*Math.max(0,t.length-1),s=Math.min(t.length-2,Math.floor(n)),[a,o]=[t[Math.max(0,s)]??"#000000",t[Math.max(0,s)+1]??t[0]??"#000000"],r=t.length>1?n-Math.max(0,s):0,[i,h]=[Ir(a),Ir(o)];return!i||!h?r<.5?a:o:`#${i.map((c,l)=>Math.round(c+((h[l]??c)-c)*r).toString(16).padStart(2,"0")).join("")}`}const Er=90,Or=15;function Cr(t,e,n,s){const a=Math.min(s,.03333333333333333);t.vx+=((e-t.x)*Er-t.vx*Or)*a,t.vy+=((n-t.y)*Er-t.vy*Or)*a,t.x+=t.vx*a,t.y+=t.vy*a}const Du=900,Hu=34,Wu=.02,jr=.004,Lr=.82,qu=100,zu=12;function _u(t,e,{width:n,height:s,heat:a=1}){const o=new Float64Array(t.length),r=new Float64Array(t.length);for(let h=0;h<t.length;h+=1){const c=t[h];for(let l=h+1;l<t.length;l+=1){const d=t[l];let u=c.x-d.x,f=c.y-d.y;u===0&&f===0&&([u,f]=[h%7-3||1,l%5-2||1]);const m=Math.max(qu,u*u+f*f),p=Du/m,w=Math.sqrt(m);o[h]=(o[h]??0)+u/w*p,r[h]=(r[h]??0)+f/w*p,o[l]=(o[l]??0)-u/w*p,r[l]=(r[l]??0)-f/w*p}}for(const[h,c]of e){const[l,d]=[t[h],t[c]];if(!l||!d)continue;const u=d.x-l.x,f=d.y-l.y,m=Math.hypot(u,f)||1,p=(m-Hu)*Wu;o[h]=(o[h]??0)+u/m*p,r[h]=(r[h]??0)+f/m*p,o[c]=(o[c]??0)-u/m*p,r[c]=(r[c]??0)-f/m*p}const i=zu*a;t.forEach((h,c)=>{h.vx=(h.vx+(o[c]??0)+(n/2-h.x)*jr)*Lr,h.vy=(h.vy+(r[c]??0)+(s/2-h.y)*jr)*Lr;const l=Math.hypot(h.vx,h.vy);l>i&&([h.vx,h.vy]=[h.vx/l*i,h.vy/l*i]);const[d,u]=[h.x+h.vx,h.y+h.vy];h.x=Math.min(n,Math.max(0,d)),h.y=Math.min(s,Math.max(0,u)),h.x!==d&&(h.vx=0),h.y!==u&&(h.vy=0)})}const fa=760,Nr=260,Gu=10,Je=(t,e,n,s=8)=>t+(e-t)*(1-Math.exp(-s*n)),Yu=(t,e,n)=>{t.x=Je(t.x,e.x,n),t.y=Je(t.y,e.y,n),t.width=Je(t.width,e.width,n),t.height=Je(t.height,e.height,n)};class Uu{constructor(e,n){this.width=e,this.still=n}width;still;balls=new Map;boxes=new Map;bands=new Map;layout=null;mode="boxes";time=0;boxAlpha=1;fileLinks=[];hovered={};selected={};pointing="1";seen={tones:null,ramp:null,threads:[],against:new Set,groups:null};height=fa;get wanted(){const e=this.layout?.height??fa;return this.mode==="tangle"?Math.max(e,fa):e}reached=null;coverage=null;show(e,n,{untangling:s=!1,reached:a=null,coverage:o=null,sizes:r=null,changed:i=null,seen:h=null}={}){h&&(this.seen=h),this.reached=a,this.coverage=o,this.layout=n,this.mode==="tangle"&&(this.tangleClock=Math.min(this.tangleClock,1.2)),(this.still||this.balls.size===0)&&(this.height=this.wanted);const c=Math.max(0,...n.boxes.map(m=>m.rank)),l=new Map(n.boxes.map(m=>[m.name,m.rank])),d=new Set;for(const m of n.balls){d.add(m.id);const p=this.balls.get(m.id),w=s?(c-(l.get(m.box)??0))*.07+Math.random()*.12:0,g=r?.get(m.id)??m.radius;if(p)Object.assign(p,{leaving:!1,box:m.box,path:m.path,test:m.test,typesOnly:m.typesOnly,radius:g,wait:w}),i?.has(m.id)&&(p.touchedAt=this.time);else{const[b,v]=this.mode==="tangle"?[this.width/2+(Math.random()-.5)*80,this.height/2+(Math.random()-.5)*80]:[m.x,m.y];this.balls.set(m.id,{id:m.id,body:{x:b,y:v,vx:0,vy:0},size:{x:this.still?g:0,y:0,vx:0,vy:0},radius:g,alpha:this.still?1:0,leaving:!1,box:m.box,path:m.path,test:m.test,typesOnly:m.typesOnly,wait:w,trail:[],bornAt:this.time,touchedAt:-1/0})}}for(const[m,p]of this.balls)d.has(m)||(p.leaving=!0);const u=(m,p)=>{const w=new Set(p.map(g=>g.name));for(const g of p){const b={x:g.x,y:g.y,width:g.width,height:g.height},v=m.get(g.name);v?Object.assign(v,{target:b,leaving:!1,cyclic:g.cyclic??!1,label:g.label??g.name}):m.set(g.name,{...b,target:b,label:g.label??g.name,alpha:this.still?1:0,leaving:!1,cyclic:g.cyclic??!1})}for(const[g,b]of m)w.has(g)||(b.leaving=!0)};u(this.boxes,n.boxes),u(this.bands,n.bands);const f=new Map(n.balls.map((m,p)=>[m.id,p]));this.fileLinks=e.dependencies.flatMap(({from:m,to:p})=>f.has(m)&&f.has(p)?[[m,p]]:[])}setMode(e){e==="tangle"&&this.mode!=="tangle"&&(this.tangleClock=0),this.mode=e}tangleClock=0;get heat(){return Math.exp(-this.tangleClock/1.8)}step(e){this.time+=e,this.height=this.still?this.wanted:Je(this.height,this.wanted,e,6);const n=new Map(this.layout?.balls.map(s=>[s.id,s])??[]);if(this.boxAlpha=Je(this.boxAlpha,this.mode==="boxes"?1:0,e,5),this.mode==="tangle"){this.tangleClock+=e;const s=[...this.balls.entries()].filter(([,i])=>!i.leaving),a=new Map(s.map(([i],h)=>[i,h])),r=[...this.fileLinks,...this.seen.threads.map(({a:i,b:h})=>[i,h])].flatMap(([i,h])=>{const[c,l]=[a.get(i),a.get(h)];return c!==void 0&&l!==void 0?[[c,l]]:[]});_u(s.map(([,i])=>i.body),r,{width:this.width,height:this.height,heat:this.heat})}for(const[s,a]of this.balls){const o=n.get(s);this.mode==="boxes"&&o&&(a.wait>0?a.wait-=e:this.still?Object.assign(a.body,{x:o.x,y:o.y,vx:0,vy:0}):Cr(a.body,o.x,o.y,e)),Cr(a.size,a.leaving?0:a.radius,0,e),a.alpha=Je(a.alpha,a.leaving?0:1,e,6);const r=Math.hypot(a.body.vx,a.body.vy);r>Nr&&this.mode==="boxes"&&a.trail.push({x:a.body.x,y:a.body.y}),(a.trail.length>Gu||r<Nr&&a.trail.length)&&a.trail.shift(),a.leaving&&a.alpha<.02&&this.balls.delete(s)}for(const s of[this.boxes,this.bands])for(const[a,o]of s)this.still?Object.assign(o,o.target):Yu(o,o.target,e),o.alpha=Je(o.alpha,o.leaving?0:1,e,6),o.leaving&&o.alpha<.02&&s.delete(a)}hit(e,n){for(const s of this.balls.values())if(Math.hypot(s.body.x-e,s.body.y-n)<=Math.max(5,s.size.x+2))return{path:s.path,box:s.box};if(this.mode==="boxes"){for(const[s,a]of this.boxes)if(e>=a.x&&e<=a.x+a.width&&n>=a.y&&n<=a.y+a.height)return{box:s}}return{}}draw(e,n){e.clearRect(0,0,this.width,this.height),e.lineCap="round";const s=.5+.5*Math.sin(this.time*4);e.font="bold 10px ui-monospace, Menlo, monospace";for(const l of this.bands.values())e.globalAlpha=l.alpha*this.boxAlpha*.9,e.setLineDash([2,4]),e.strokeStyle=n.rule,e.lineWidth=1,e.beginPath(),e.roundRect(l.x,l.y,l.width,l.height,6),e.stroke(),e.setLineDash([]),e.fillStyle=n.dim,e.fillText(l.label,l.x+8,l.y+12);e.font="9px ui-monospace, Menlo, monospace";const a=this.pointer;for(const[l,d]of this.boxes){const u=a.box===l||this.selected.box===l;e.globalAlpha=d.alpha*this.boxAlpha,e.fillStyle=n.sunken,e.strokeStyle=d.cyclic?n.warn:u?n.accent:n.rule,e.lineWidth=d.cyclic?1.5+s*1.5:u?1.5:1,d.cyclic&&(e.shadowColor=n.warn,e.shadowBlur=6+s*10),e.beginPath(),e.roundRect(d.x,d.y,d.width,d.height,4),e.fill(),e.stroke(),e.shadowBlur=0,e.fillStyle=u?n.accent:n.dim,e.fillText(d.label,d.x+6,d.y+10)}const{focus:o,pointed:r}=this.focusOf(a.path),i=r?.tied??new Set;this.drawLinks(e,n,o!==void 0,a.box),this.drawThreads(e,n,o?.id,r),o&&r&&this.drawFileArrows(e,n,o,r.needs,r.neededBy);const h=this.seen.ramp==="warm"?[n.dim,n.heat,n.heatTop]:[n.rule,n.soft,n.accent],c=l=>this.seen.tones&&!l.test?Fu(h,this.seen.tones.get(l.id)??0):n.accent;for(const l of this.balls.values()){const d=Math.max(0,l.size.x);if(l.trail.length>1){e.strokeStyle=n.accent;for(let b=1;b<l.trail.length;b+=1)e.globalAlpha=b/l.trail.length*.35*l.alpha,e.lineWidth=d*(b/l.trail.length)*1.4,e.beginPath(),e.moveTo(l.trail[b-1].x,l.trail[b-1].y),e.lineTo(l.trail[b].x,l.trail[b].y),e.stroke()}const u=this.time-l.bornAt;u<.8&&!this.still&&(e.globalAlpha=(1-u/.8)*.6,e.strokeStyle=n.accent,e.lineWidth=1.2,e.beginPath(),e.arc(l.body.x,l.body.y,d+u*22,0,Math.PI*2),e.stroke());const f=this.time-l.touchedAt;f<.9&&!this.still&&(e.globalAlpha=(1-f/.9)*.8,e.strokeStyle=n.heat,e.lineWidth=1.8,e.beginPath(),e.arc(l.body.x,l.body.y,d+1.5+f*14,0,Math.PI*2),e.stroke());const m=this.hovered.path===l.path,p=o!==void 0&&!i.has(l.id),w=this.reached!==null&&!l.test&&!l.typesOnly&&!this.reached.has(l.id),g=!l.test&&!l.typesOnly?this.coverage?.get(l.path):void 0;if(e.globalAlpha=l.alpha*(p?.22:1),e.beginPath(),e.arc(l.body.x,l.body.y,m?d+2:Math.max(0,w||g!==void 0?d-.6:d),0,Math.PI*2),g!==void 0)e.strokeStyle=g>=99.5?n.accent:n.warn,e.lineWidth=1.2,e.stroke(),e.fillStyle=c(l),e.beginPath(),e.moveTo(l.body.x,l.body.y),e.arc(l.body.x,l.body.y,Math.max(0,d-.6),-Math.PI/2,-Math.PI/2+Math.PI*2*g/100),e.closePath(),e.fill();else if(l.test){const b=Math.max(0,(m?d+2:d)*1.6);e.beginPath(),e.rect(l.body.x-b/2,l.body.y-b/2,b,b),e.fillStyle=n.test,e.fill()}else w?(e.strokeStyle=n.warn,e.lineWidth=1.2,e.stroke()):(e.fillStyle=c(l),e.fill());m&&(e.strokeStyle=n.ink,e.lineWidth=1.5,e.stroke()),this.selected.path===l.path&&(e.globalAlpha=l.alpha,e.strokeStyle=n.ink,e.lineWidth=1.5,e.beginPath(),e.arc(l.body.x,l.body.y,d+4.5,0,Math.PI*2),e.stroke())}e.globalAlpha=1}get pointer(){return this.hovered.path||this.hovered.box?this.hovered:this.selected}focusOf(e){const n=e?[...this.balls.values()].find(s=>s.path===e):void 0;return{focus:n,pointed:n?Bu(n.id,this.pointing,this.fileLinks,this.seen.groups,this.seen.threads):null}}focused(){const{focus:e,pointed:n}=this.focusOf(this.pointer.path);return e&&n?{path:e.path,test:e.test,typesOnly:e.typesOnly,pointed:n}:null}drawThreads(e,n,s,a){if(this.seen.threads.length===0)return;const o=this.pointing==="together"&&a!==null;e.strokeStyle=n.heat;for(const{a:r,b:i,together:h,joined:c}of this.seen.threads){const[l,d]=[this.balls.get(r),this.balls.get(i)];if(!l||!d)continue;const u=o&&(r===s||i===s);e.globalAlpha=Math.min(l.alpha,d.alpha)*(s===void 0?c==="none"?.75:.45:u?.95:.06),e.lineWidth=.8+Math.log2(h)*.9,e.setLineDash(c==="none"?[4,3]:[]),e.beginPath(),e.moveTo(l.body.x,l.body.y),e.lineTo(d.body.x,d.body.y),e.stroke()}e.setLineDash([])}drawFileArrows(e,n,s,a,o){const r=(c,l,d,u)=>{const[f,m]=[l.body.x-c.body.x,l.body.y-c.body.y],p=Math.hypot(f,m)||1,[w,g]=[f/p,m/p],b={x:l.body.x-w*(l.size.x+2),y:l.body.y-g*(l.size.x+2)},v={x:(c.body.x+b.x)/2-g*p*.12,y:(c.body.y+b.y)/2+w*p*.12};e.globalAlpha=u,e.strokeStyle=d,e.fillStyle=d,e.lineWidth=1.4,e.beginPath(),e.moveTo(c.body.x,c.body.y),e.quadraticCurveTo(v.x,v.y,b.x,b.y),e.stroke();const[k,S]=[b.x-v.x,b.y-v.y],M=Math.atan2(S,k);e.beginPath(),e.moveTo(b.x,b.y),e.lineTo(b.x-7*Math.cos(M-.4),b.y-7*Math.sin(M-.4)),e.lineTo(b.x-7*Math.cos(M+.4),b.y-7*Math.sin(M+.4)),e.closePath(),e.fill()},i=(c,l)=>l===s.id?0:c.get(l),h=c=>Math.max(.25,.95-(c-1)*.25);for(const[c,l]of this.fileLinks){const[d,u]=[this.balls.get(c),this.balls.get(l)];if(!d||!u)continue;const f=i(a,c);f!==void 0&&a.get(l)===f+1&&r(d,u,n.accent,h(f+1));const m=i(o,l);m!==void 0&&o.get(c)===m+1&&r(d,u,n.arrowIn,h(m+1))}}drawLinks(e,n,s,a){if(this.boxAlpha<.98){e.globalAlpha=(1-this.boxAlpha)*.22,e.strokeStyle=n.accent,e.lineWidth=.7,e.beginPath();for(const[o,r]of this.fileLinks){const[i,h]=[this.balls.get(o),this.balls.get(r)];!i||!h||(e.moveTo(i.body.x,i.body.y),e.lineTo(h.body.x,h.body.y))}e.stroke()}if(!(!this.layout||this.boxAlpha<.02))for(const o of this.layout.links){const[r,i]=[this.boxes.get(o.from),this.boxes.get(o.to)],[h,c]=[this.layout.boxes.find(v=>v.name===o.to),this.layout.boxes.find(v=>v.name===o.from)];if(!r||!i||!h||!c)continue;const l=r.x+(o.x1-c.x)/c.width*r.width,d=r.y+r.height,u=i.x+(o.x2-h.x)/h.width*i.width,f=i.y,m=a!==void 0&&(o.from===a||o.to===a),p=a!==void 0&&!m,w=this.seen.ramp==="cool"&&this.seen.against.has(`${o.from}>${o.to}`),g=this.seen.threads.length>0?.2:.4;e.globalAlpha=this.boxAlpha*Math.min(r.alpha,i.alpha)*(s?.06:m?.95:p?.08:w?.85:g),e.strokeStyle=w?n.warn:m?n.accent:n.soft,e.lineWidth=Math.min(4,.8+Math.log2(o.count)*.7)*(m||w?1.4:1),e.setLineDash(o.typeOnly?[4,3]:[]);const b=Math.max(18,(f-d)/2);e.beginPath(),e.moveTo(l,d),e.bezierCurveTo(l,d+b,u,f-b,u,f-4),e.stroke(),e.setLineDash([]),e.fillStyle=e.strokeStyle,e.beginPath(),e.moveTo(u,f),e.lineTo(u-3.5,f-7),e.lineTo(u+3.5,f-7),e.closePath(),e.fill()}}}let pa;function Js(){return pa??=Promise.all([fetch("/data/architecture.json").then(t=>{if(!t.ok)throw new Error(`the history: ${t.status}`);return t.text()}),fetch("/data/coverage.json").then(t=>t.ok?t.json():null).catch(()=>null)]).then(([t,e])=>({read:Is(t),coverage:e})).catch(t=>{throw pa=void 0,t}),pa}const it=1100,Ju=.45,Ku=60,Pr="Point at a file for what it brings out; click a file or a box for its details.",Vu={sizing:"neededBy",colour:"plain",together:!1,pointing:"1"};function Rr(t){const e=getComputedStyle(t),n=(s,a)=>e.getPropertyValue(s).trim()||a;return{ink:n("--ink","#16181c"),dim:n("--dim","#6b7280"),rule:n("--rule","#d8dbe1"),sunken:n("--sunken","#f2f4f8"),accent:n("--accent","#1a4b9c"),soft:n("--accent-soft","#6b83b8"),warn:n("--warn","#b4443c"),test:n("--hl-string","#2f6f4e"),arrowIn:n("--arrow-in","#c96a24"),heat:n("--heat-warm","#e08a5b"),heatTop:n("--heat-warm-top","#5c1609")}}function cl(t={}){return e=>{let n=!1,s=()=>{n=!0};return t.lead?.set(null),Js().then(({read:a,coverage:o})=>{n||(s=Xu(e,a,o,t))}).catch(()=>{}),()=>s()}}function Xu(t,e,n,s){const{history:a,snapshots:o}=e,r=n&&a.commits.findIndex(j=>j.sha===n.sha),i=n?new Map(Object.entries(n.lines)):null,h=o.map(Ls),c=new Map,l=(j,B)=>{const Y=`${j}:${B}`;let U=c.get(Y);return U||(U=No(o[j]??{modules:[],dependencies:[]},{tests:B,width:it}),c.set(Y,U)),U},d=o.length-1,u=window.matchMedia("(prefers-reduced-motion: reduce)").matches,f=new Uu(it,u),{follow:m}=s;let p=m?.get()??d,w=!1,g={...Vu,...s.lenses},b="boxes",v=!1,k=0,S=null,M=-1;f.pointing=g.pointing;const x=y("canvas",{class:"architecture-canvas","aria-label":"The source of this site: its files as balls, its folders as boxes, and arrows for what needs what"}),I=y("figcaption"),L=y("div",{class:"sparks-host"}),P=y("input",{type:"range",min:0,max:d,step:1,value:p,"aria-label":"Commit",hidden:m!==void 0}),C=y("button",{type:"button",hidden:m!==void 0},"▶ play the history"),E=y("button",{type:"button"},"tangle it"),N=y("input",{type:"checkbox"}),A=y("input",{type:"checkbox",checked:g.together}),O=(j,B)=>y("option",{value:j,selected:!1},B),W=(j,B,Y)=>{const U=y("select",{"aria-label":j},...Y.map(([ie,ta])=>O(ie,ta)));return U.value=B,U},_=W("What a ball's size says",g.sizing,[["neededBy","needed by"],["needs","needs"],["reachedBy","reach"],["bridges","bridges"],["changes","changes"],["lines","lines"]]),q=W("What a ball's colour says",g.colour,[["plain","plain"],["heat","heat"],["exposure","exposure"],["stability","stability"]]),G=W("What pointing at a file shows",g.pointing,[["1","its arrows"],["2","arrows, 2 out"],["3","arrows, 3 out"],["all","all its arrows"],["group","its group"],["together","what changed with it"]]),te=y("div",{class:"architecture-controls"},C,E,y("label",{},N," the tests"),y("label",{},A," what changed together"),P),Qe=y("div",{class:"architecture-controls lenses"},y("label",{},"size: ",_),y("label",{},"colour: ",q),y("label",{},"pointing shows: ",G)),Ut=y("p",{class:"architecture-legend lenses-said"}),qe=y("p",{class:"architecture-status"},Pr),je=y("aside",{class:"architecture-details","aria-label":"Details"}),Jt=y("p",{class:"architecture-legend",hidden:!0},y("span",{class:"key file"}),"a file, as full as the tests run it",y("span",{class:"key untested"}),"a file no test reaches",y("span",{class:"key test"}),"a test"),ye=(j,B=!1)=>{p=Math.max(0,Math.min(d,j)),P.value=String(p);const Y=o[p],U=a.commits[p];if(!Y||!U)return;const ie=Lu(e,p,g);f.show(Y,l(p,w),{untangling:B,reached:w?Po(Y):null,coverage:w&&p===r?i:null,sizes:ie.sizes,changed:p===M?null:new Set(a.changes[p]?.changed??[]),seen:ie}),M=p,s.lead?.set(p>=d?null:p),$t(),et(),Ut.textContent=ie.said,I.innerHTML=Qh(U,h[p]??Ls(Y)),L.innerHTML=el(h,p)};let vt="",kt=0;const $t=(j=!1)=>{window.clearTimeout(kt);const B=()=>{const Y=`${p}|${JSON.stringify(S)}`;if(Y===vt)return;const U=je.querySelector("details")?.open??!1;je.innerHTML=Kh(e,p,S,n);const ie=je.querySelector("details");ie&&U&&vt.endsWith(JSON.stringify(S))&&(ie.open=!0),vt=Y};j?B():kt=window.setTimeout(B,Ku)},Rn=()=>new Map((o[p]?.modules??[]).map(j=>[j.id,j.path])),xt=j=>"file"in j?j.file:j.box,et=()=>{const j=f.focused(),B=f.hovered.path?void 0:f.hovered.box,Y=j&&!j.test&&!j.typesOnly&&p===r?i?.get(j.path):void 0,U=S?' · <span class="architecture-chosen">chosen: click it again, or press Esc, to let it go</span>':"";j&&(f.hovered.path||S&&"file"in S)?qe.innerHTML=Pu(j.path,g.pointing,j.pointed,Rn(),Y)+(f.hovered.path?"":U):B?qe.innerHTML=`<code>${$(B)}</code> · click for its details`:S?qe.innerHTML=`<code>${$(xt(S))}</code>${U}`:qe.textContent=Pr},Kt=()=>getComputedStyle(st).gridTemplateColumns.trim().split(/\s+/).length>1,tt=(j,B=!1)=>{S=j,f.selected=j===null?{}:"file"in j?{path:j.file}:{box:j.box},$t(!0),et(),B&&j&&!Kt()&&je.scrollIntoView({block:"start",behavior:u?"auto":"smooth"})},ze=j=>{g={...g,...j},f.pointing=g.pointing,ye(p)},Zs=j=>m?m.set(j>=d?null:j):ye(j),Tt=j=>{v=j,C.textContent=v?"❚❚ pause":"▶ play the history",v&&p===d&&ye(0),k=0};C.addEventListener("click",()=>Tt(!v)),E.addEventListener("click",()=>{b=b==="boxes"?"tangle":"boxes",f.setMode(b),E.textContent=b==="boxes"?"tangle it":"untangle it",b==="boxes"&&ye(p,!0)}),N.addEventListener("change",()=>{w=N.checked,Jt.hidden=!w,ye(p)}),A.addEventListener("change",()=>ze({together:A.checked})),_.addEventListener("change",()=>ze({sizing:_.value})),q.addEventListener("change",()=>ze({colour:q.value})),G.addEventListener("change",()=>ze({pointing:G.value})),P.addEventListener("input",()=>{Tt(!1),ye(Number(P.value))});let Vt=p;const Qs=m?.on(j=>{Vt=j??d})??(()=>{}),ea=j=>{const B=L.querySelector("svg"),Y=B?.getScreenCTM();if(!B||!Y)return null;const U=new DOMPoint(j.clientX,j.clientY).matrixTransform(Y.inverse()).x,{x:ie,width:ta}=B.viewBox.baseVal,Jo=4;return Math.round((U-ie-Jo)/(ta-Jo*2)*d)},Bn=j=>{const B=ea(j);B!==null&&(Tt(!1),Math.max(0,Math.min(d,B))!==p&&Zs(Math.max(0,Math.min(d,B))))};L.addEventListener("pointerdown",j=>{L.setPointerCapture(j.pointerId),Bn(j)}),L.addEventListener("pointermove",j=>{L.hasPointerCapture(j.pointerId)&&Bn(j)});const Fn=j=>{const B=x.getBoundingClientRect();return[(j.clientX-B.left)/B.width*it,(j.clientY-B.top)/B.height*f.height]};x.addEventListener("mousemove",j=>{const[B,Y]=Fn(j),U=x.dataset.hovered;f.hovered=f.hit(B,Y),x.style.cursor=f.hovered.path||f.hovered.box?"pointer":"",x.dataset.hovered=f.hovered.path??f.hovered.box??"",x.dataset.hovered!==U&&et()}),x.addEventListener("mouseleave",()=>{f.hovered={},x.dataset.hovered="",et()}),x.addEventListener("click",j=>{const[B,Y]=Fn(j),U=f.hit(B,Y),ie=U.path?{file:U.path}:U.box?{box:U.box}:null;tt(ie&&S&&xt(ie)===xt(S)?null:ie,!0)}),je.addEventListener("click",j=>{const B=j.target instanceof Element?j.target.closest("button"):null;if(!B)return;const{file:Y,box:U}=B.dataset;B.hasAttribute("data-back")?tt(null):Y?tt({file:Y}):U&&tt({box:U})});const nt=j=>{j.key==="Escape"&&S&&tt(null)};document.addEventListener("keydown",nt);const st=y("div",{class:"architecture-stage"},y("div",{class:"architecture-view"},qe,x,Ut,Jt),je);t.replaceChildren(y("figure",{class:"architecture-figure"},te,Qe,st,I,L)),ye(p),$t(!0);const St=()=>{Qs(),window.clearTimeout(kt),document.removeEventListener("keydown",nt)},at=x.getContext("2d");if(!at)return St;const Dn=Us(x);let Xt=Rr(t),Hn=0,Zt=performance.now(),Mt=0,At={width:0,height:0};const Te=()=>{const j=window.devicePixelRatio||1,B=x.clientWidth||it,Y=Math.round(B*f.height/it);B===At.width&&Math.abs(Y-At.height)<1||(At={width:B,height:Y},x.width=Math.round(B*j),x.height=Math.round(Y*j),x.style.height=`${Y}px`)};Te(),window.addEventListener("resize",Te);const Uo=j=>{Mt=requestAnimationFrame(Uo);const B=Math.min(.05,(j-Zt)/1e3);Zt=j,Dn.onScreen()&&(Hn++%30===0&&(Xt=Rr(t)),m&&Vt!==p&&ye(Vt),v&&(k+=B,k>=Ju&&(k=0,p>=d?Tt(!1):ye(p+1))),f.step(B),Te(),at.setTransform(x.width/it,0,0,x.width/it,0,0),f.draw(at,Xt))};return Mt=requestAnimationFrame(Uo),()=>{cancelAnimationFrame(Mt),Dn.stop(),St(),window.removeEventListener("resize",Te)}}class dl{listeners=new Set;send(e){for(const n of[...this.listeners])n(e)}on(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}}class Zu{at=null;moved=new dl;get(){return this.at}set(e){e!==this.at&&(this.at=e,this.moved.send(e))}on(e){return this.moved.on(e)}}const re=new Zu;function Qu(t,e){return n=>{let s=null,a=null,o=!0,r=!1,i=()=>{};const h=(d=!1)=>{if(!s||r||!o&&!d)return;const u=re.get()??s.read.history.commits.length-1;u!==a&&(n.innerHTML=t(s.read,u,s.coverage),a=u)},c=typeof IntersectionObserver=="function"?new IntersectionObserver(d=>{for(const u of d)o=u.isIntersecting;h()},{rootMargin:"200px"}):null;c?.observe(n);const l=re.on(()=>h());return Js().then(d=>{r||(s=d,n.querySelector("figure")&&re.get()===null&&(a=d.read.history.commits.length-1),h(!0),e&&(i=e(n,d.read)))}).catch(()=>{}),()=>{r=!0,l(),c?.disconnect(),i()}}}const em=new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"long",year:"numeric",timeZone:"Europe/Madrid"});function ul(t,e){const n=t[e];if(!n)return"";const s=e===t.length-1?`the last of ${t.length} commits`:`commit ${e+1} of ${t.length}`,a=$(n.sha);return`${s}: <a href="https://github.com/drpicox/david-rodenas.com/commit/${a}" target="_blank" rel="noopener noreferrer"><code>${a}</code></a> ${em.format(new Date(n.date))} — ${$(n.subject)}`}const tm=450;function nm(t){re.set(null);let e=[],n,s=!1;const a=y("p",{class:"shown-commit"});a.innerHTML=t.querySelector(".shown-commit")?.innerHTML??"";const o=y("button",{type:"button"},"▶ play the history"),r=y("input",{type:"range",min:0,max:0,step:1,value:0,"aria-label":"The commit every figure below shows"});t.replaceChildren(y("div",{class:"change-player"},o,r,a));const i=()=>e.length-1,h=u=>{const f=u??i();r.value=String(f),a.innerHTML=ul(e,f)},c=u=>{if(clearTimeout(n),s=u,o.textContent=u?"❚❚ pause":"▶ play the history",!u)return;(re.get()??i())>=i()&&re.set(0);const f=()=>{n=setTimeout(()=>{const m=(re.get()??i())+1;re.set(m>=i()?null:m),m>=i()?c(!1):f()},tm)};f()},l=re.on(h);o.addEventListener("click",()=>c(!s)),r.addEventListener("input",()=>{c(!1);const u=Number(r.value);re.set(u>=i()?null:u)});let d=!1;return Js().then(({read:u})=>{d||(e=u.history.commits,r.max=String(i()),h(re.get()))}).catch(()=>{o.disabled=!0,r.disabled=!0}),()=>{d=!0,clearTimeout(n),l()}}function sm(t){let e=!1,n=null,s=null,a="";const o=y("select",{"aria-label":"The box whose couplings are drawn"}),r=y("div",{class:"coupling-picture"}),i=()=>{if(!n||e)return;const c=n.snapshots[re.get()??n.snapshots.length-1];if(!c)return;const l=[...new Set(c.modules.filter(d=>!d.test).map(d=>Q(d.path)))].sort((d,u)=>d.localeCompare(u));l.join()!==a&&(o.replaceChildren(...l.map(d=>y("option",{value:d},d))),a=l.join()),r.innerHTML=al(c,s&&l.includes(s)?s:void 0),o.value=r.querySelector("svg.coupling")?.dataset.box??""};o.addEventListener("change",()=>{s=o.value,i()});const h=re.on(i);return Js().then(c=>{e||(n=c.read,t.replaceChildren(y("label",{class:"coupling-choice"},"the box: ",o),r),i())}).catch(()=>{}),()=>{e=!0,h()}}const ga=3;function Br(t){const e=t.map(n=>n.split("/").pop()??n);return e.length>ga?`${e.slice(0,ga).join(", ")} and ${e.length-ga} more`:e.length>1?`${e.slice(0,-1).join(", ")} and ${e.at(-1)}`:e[0]??""}function am(t,e,{changed:n,written:s}){const a=[n.length>0?`changed ${Br(n)}`:"",s.length>0?`wrote ${Br(s)}`:""].filter(Boolean).join("; ");return`${t??"the files now gone"}, ${Ke(e)}: ${a||"nothing"} — ${e.subject}`}function om(t){const e=new Map,n=(a,o)=>{const r=`${a??""}@${o}`,i=e.get(r)??{changed:[],written:[]};return e.set(r,i),i};for(const a of t){if(a.test)continue;const o=sl(a);n(o,a.born).written.push(a.path);for(const r of a.changed)n(o,r).changed.push(a.path)}const s=({changed:a,written:o})=>({changed:[...a].sort(),written:[...o].sort()});return{get:(a,o)=>s(e.get(`${a??""}@${o}`)??{changed:[],written:[]})}}const rm="http://www.w3.org/2000/svg";function im(t,e){const n=om(e.lives),s=e.history.commits,a=l=>{const d=t.querySelector("svg.change-matrix"),u=d?.getScreenCTM();if(!d||!u)return null;const f=new DOMPoint(l.clientX,l.clientY).matrixTransform(u.inverse()),[m,p,w]=[Number(d.dataset.left),Number(d.dataset.step),Number(d.dataset.row)],g=Math.floor((f.x-m)/p);if(!(g>=0&&g<s.length))return null;const b=[...d.querySelectorAll("text.row")].find(v=>f.y>=Number(v.dataset.top)&&f.y<Number(v.dataset.top)+w);return{svg:d,at:g,x:m+g*p,row:b?{box:b.dataset.box||null}:null}},o=l=>{const d=t.querySelector(".changes-pointed");d&&(d.textContent=l)},r=(l,d,u)=>{if(t.querySelector("rect.pointed")?.remove(),!l)return;const f=document.createElementNS(rm,"rect");f.setAttribute("class","pointed"),f.setAttribute("x",String(d)),f.setAttribute("y","0"),f.setAttribute("width",String(u)),f.setAttribute("height",String(l.viewBox.baseVal.height-20)),l.prepend(f)},i=l=>{const d=a(l),u=d&&s[d.at];if(!d||!u)return r(null,0,0),o("");r(d.svg,d.x,Number(d.svg.dataset.step)),o(d.row?am(d.row.box,u,n.get(d.row.box,d.at)):`${Ke(u)} — ${u.subject}`)},h=()=>{r(null,0,0),o("")},c=l=>{const d=a(l);d&&re.set(d.at>=s.length-1?null:d.at)};return t.addEventListener("pointermove",i),t.addEventListener("pointerleave",h),t.addEventListener("pointerdown",c),()=>{t.removeEventListener("pointermove",i),t.removeEventListener("pointerleave",h),t.removeEventListener("pointerdown",c)}}const hm={"change-matrix":im},lm={"change-player":nm,"change-graph":cl({follow:re,lenses:{sizing:"changes",colour:"heat",together:!0,pointing:"together"}}),...Object.fromEntries(Object.entries(ll).map(([t,e])=>[t,Qu(e,hm[t])])),"change-coupling":sm},Fr="/data/architecture.json",cm="/data/coverage.json";function dm(t){try{return JSON.parse(t(cm))}catch{return null}}const um={"change-graph":tl,"change-player":t=>{const{history:e}=Is(t(Fr));return`<p class="shown-commit">${ul(e.commits,e.commits.length-1)}</p>`},...Object.fromEntries(Object.entries(ll).map(([t,e])=>[t,n=>{const s=Is(n(Fr));return e(s,s.history.commits.length-1,dm(n))}]))},mm={name:"architecture",apps:{architecture:cl({lead:re}),...lm},stills:{architecture:tl,...um}},fm=[{name:"llave de laton",kind:"key",value:111},{name:"cristal magico",kind:"key",value:1112},{name:"llave de casa",kind:"key",value:1314},{name:"llave de la verja",kind:"key",value:2636},{name:"llave del puente",kind:"key",value:3444},{name:"llave del gnomo",kind:"key",value:4636},{name:"barca",kind:"key",value:3233},{name:"llave de la despensa",kind:"key",value:2010},{name:"diario",kind:"weapon",value:1},{name:"matamoscas",kind:"weapon",value:2},{name:"espada de madera",kind:"weapon",value:4},{name:"espada",kind:"weapon",value:8},{name:"espada venenosa",kind:"weapon",value:12},{name:"Thurmei",kind:"weapon",value:16},{name:"camisa",kind:"shield",value:2},{name:"escudo de madera",kind:"shield",value:4},{name:"escudo de escamas",kind:"shield",value:8},{name:"escudo",kind:"shield",value:12},{name:"Rharmei",kind:"shield",value:16},{name:"caramelo",kind:"food",value:2},{name:"judia",kind:"food",value:4},{name:"manzana",kind:"food",value:8},{name:"naranja",kind:"food",value:12},{name:"pocima",kind:"food",value:16}],pm=[{name:"mosca acida",attack:4,defence:0,drops:"cristal magico"},{name:"mosca",attack:0,defence:0,drops:"caramelo"},{name:"mosquito",attack:2,defence:0,drops:"matamoscas"},{name:"polilla",attack:1,defence:1,drops:"camisa"},{name:"cucaracha",attack:1,defence:1,drops:"llave de casa"},{name:"raton",attack:2,defence:2,drops:"judia"},{name:"rana venenosa",attack:2,defence:1,drops:"espada de madera"},{name:"planta carnivora",attack:1,defence:3,drops:"escudo de madera"},{name:"raton salvaje",attack:3,defence:3,drops:"llave de la verja"},{name:"escorpion dorado",attack:12,defence:2,drops:"espada venenosa"},{name:"trucha",attack:3,defence:3,drops:"manzana"},{name:"trucha asesina",attack:4,defence:7,drops:"escudo de escamas"},{name:"minimonstruo aquatico",attack:8,defence:4,drops:"llave del puente"},{name:"lobo",attack:8,defence:6,drops:"manzana"},{name:"lobo asesino",attack:12,defence:7,drops:"escudo"},{name:"ogro",attack:6,defence:10,drops:"naranja"},{name:"gnomo de puente",attack:11,defence:11,drops:"llave del gnomo"},{name:"murcielago",attack:8,defence:8,drops:"judia"},{name:"aranya",attack:14,defence:4,drops:"Thurmei"},{name:"vampiro",attack:12,defence:13,drops:"Rharmei"},{name:"aranya gigante",attack:14,defence:14,drops:"barca"},{name:"monstruo aquatico enorme",attack:32,defence:15,drops:"llave de la despensa"}],gm={"0,0":{name:"Bienvenida",exits:[-1,-1,0,-1],holds:"diario",text:`Bienvenido a este juego de aventura. 
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
sus otros habitantes.`}},wm={items:fm,monsters:pm,rooms:gm},{items:ym,monsters:bm,rooms:vm}=wm,Bo={"llave de laton":"brass key","cristal magico":"magic crystal","llave de casa":"house key","llave de la verja":"gate key","llave del puente":"bridge key","llave del gnomo":"gnome's key",barca:"boat","llave de la despensa":"pantry key",diario:"newspaper",matamoscas:"fly swatter","espada de madera":"wooden sword",espada:"sword","espada venenosa":"poisoned sword",Thurmei:"Thurmei",camisa:"shirt","escudo de madera":"wooden shield","escudo de escamas":"scale shield",escudo:"shield",Rharmei:"Rharmei",caramelo:"sweet",judia:"bean",manzana:"apple",naranja:"orange",pocima:"potion"},ml={"mosca acida":"acid fly",mosca:"fly",mosquito:"mosquito",polilla:"moth",cucaracha:"cockroach",raton:"mouse","rana venenosa":"poison frog","planta carnivora":"carnivorous plant","raton salvaje":"wild mouse","escorpion dorado":"golden scorpion",trucha:"trout","trucha asesina":"killer trout","minimonstruo aquatico":"small water monster",lobo:"wolf","lobo asesino":"killer wolf",ogro:"ogre","gnomo de puente":"bridge gnome",murcielago:"bat",aranya:"spider",vampiro:"vampire","aranya gigante":"giant spider","monstruo aquatico enorme":"enormous water monster"},km={Bienvenida:"Welcome","Usa las llaves":"Use the keys","Comedor sur":"Dining room, south",Salita:"Sitting room","Huerto de pepinos":"Cucumber patch","Huerto de tomates":"Tomato patch",Caminito:"Little path",Despensa:"Pantry","Aprende a atacar":"Learn to attack",Comedor:"Dining room",Recibidor:"Hall",Patio:"Yard","Huerto de Judias":"Bean patch",Manzanos:"Apple trees",Ciruelos:"Plum trees",Banyo:"Bathroom",Habitacion:"Bedroom","Comedor norte":"Dining room, north",Cocina:"Kitchen","Huerto de calabazas":"Pumpkin patch",Naranjos:"Orange trees",Entrada:"Gate",Nogal:"Walnut trees",Cueva:"Cave","Lago interno":"Underground lake","Centro del lago":"Middle of the lake","Rio salvaje":"Wild river",Rio:"River","Bosque oscuro":"Dark forest","Rio oscuro":"Dark river","Bosque tenebroso":"Gloomy forest","Bosque sombrio":"Shadowy forest","Bosque humedo":"Damp forest",Bosque:"Forest","Claro del Bosque":"Forest clearing","Puente del bosque":"Forest bridge"},Ie=`The tunnel of the dark, gloomy cave goes on. The walls are damp and
water can be heard running somewhere far off. Walk carefully, or you
will slip or trip.`,nn=`The forest stretches out, dark and mysterious. The light blurs
through the leaves. You can hear the animals and the forest's other
inhabitants.`,wa=`Though it is day, barely a glimmer of light gets in. Bushes, trees
and brambles make the going hard. Something moves in the dark.`,Dr=`Little light comes through the leaves of the trees. Brambles and
bushes give way to a small stream. Something moves in the dark.`,$m={"0,0":`Welcome to this adventure game.
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
the apples, they are hardy and get you through the winters.`,"3,0":Ie,"3,1":Ie,"3,2":`An immense underground lake opens up before you. It is dark and you
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
but something stirs beneath the surface.`,"4,0":Ie,"4,1":Ie,"4,2":Ie,"4,3":wa,"4,4":`The north bank of the river is dismal. Strange noises can be heard,
and you sense a curse. Here is the bridge that crosses to the south
bank; the air feels hostile and urges you across.`,"4,5":`The river flows under the rocks and the roots of the forest's trees.
The sounds of the forest grow louder and you feel watched.`,"4,6":`A gap between brambles and bushes lets you into the gloomy forest.
Light is scarce and the shadows are threatening.`,"4,7":wa,"5,0":`The tunnel of the dark, gloomy cave goes on. A great cobweb blocks
the way south. One careless move could make you its prey.`,"5,1":Ie,"5,2":`The tunnel of the dark, gloomy cave goes on. The walls are damp, and
the sound of water grows louder. Walk carefully, or you will slip or
trip.`,"5,3":`The forest is dark, and beside you you have found a great wall of
solid rock to the west: the mountain, probably.`,"5,4":Dr,"5,5":nn,"5,6":`The forest stretches out, dark and mysterious. You are in a small
clearing where the sky can be seen. You notice the forest is
restless.`,"5,7":nn,"6,0":Ie,"6,1":Ie,"6,2":`You are inside the cave; it is dark and gloomy. The walls are damp and
water can be heard running somewhere far off. You try to look ahead,
but it seems to have no end.`,"6,3":`The forest is dark, and beside you you have found a great wall of
solid rock to the west: the mountain, probably. You notice the rock
is damp; there is very likely a cave.`,"6,4":`Little light comes through the leaves of the trees. Brambles and
bushes give way to a small stream. A bridge crosses the stream to the
eastern part of the forest; there, under a tree, is the house of a
troll you will have to get past if you want to go east.`,"6,5":wa,"6,6":`The forest stretches out, dark, mysterious and restless. You are in a
small clearing where the sky can be seen.`,"6,7":`In this part of the forest the light begins to fail. Tangles of
bushes and brambles slow your steps. You notice something moving
among the shadows.`,"7,0":Ie,"7,1":Ie,"7,2":`You are a few steps inside the cave. Cold, damp air reaches you from
within. You try to see where it ends, but you cannot. You hear
murmurs from deep inside.`,"7,3":`Little light comes through the leaves of the trees. A tangle of
climbing plants stirs to the west: it is the mouth of a cave. You
feel a presence watching you.`,"7,4":Dr,"7,5":nn,"7,6":nn,"7,7":nn},Wt=(t,e)=>t[e]??e,xm=ym.map(t=>({...t,name:Wt(Bo,t.name)})),Tm=bm.map(t=>({...t,name:Wt(ml,t.name),drops:Wt(Bo,t.drops)})),Sm=Object.fromEntries(Object.entries(vm).map(([t,e])=>[t,{...e,name:Wt(km,e.name),holds:Wt(Bo,Wt(ml,e.holds)),text:$m[t]??e.text}])),Mm={items:xm,monsters:Tm,rooms:Sm},Bs=16,{items:ro,monsters:Am,rooms:Im}=Mm,Hr=["norte","sur","este","oeste"],Em={norte:[1,0],sur:[-1,0],este:[0,1],oeste:[0,-1]},Wr=[0,0],qr=[1,0],Fs=(t,e)=>t.find(n=>n.name===e);function zr(t){const e=Fs(ro,t);if(e)return{item:e};const n=Fs(Am,t);return n?{monster:n}:null}class _t{places=new Map;at=[Wr[0],Wr[1]];life=Bs;weapon=null;shield=null;key=null;visited=new Set;constructor(){for(const[e,n]of Object.entries(Im))this.places.set(e,{room:n,exits:[...n.exits],holds:zr(n.holds)});this.visited.add(this.here())}here(){return`${this.at[0]},${this.at[1]}`}place(){const e=this.places.get(this.here());if(!e)throw new Error(`no room at ${this.here()}`);return e}get won(){return this.at[0]===qr[0]&&this.at[1]===qr[1]}get spent(){return this.life<=0}save(){return JSON.stringify({at:this.at,life:this.life,held:[this.weapon?.name??null,this.shield?.name??null,this.key?.name??null],visited:[...this.visited],places:[...this.places].map(([e,n])=>[e,n.exits,n.holds?"item"in n.holds?n.holds.item.name:n.holds.monster.name:null])})}static load(e){const n=JSON.parse(e),s=new _t;s.at=n.at,s.life=n.life,[s.weapon,s.shield,s.key]=n.held.map(a=>a?Fs(ro,a)??null:null),s.visited.clear();for(const a of n.visited)s.visited.add(a);for(const[a,o,r]of n.places){const i=s.places.get(a);i&&Object.assign(i,{exits:o,holds:r?zr(r):null})}return s}charted(){return[...this.visited].sort().flatMap(e=>{const n=this.places.get(e);if(!n)return[];const{holds:s}=n;return[{where:e,name:n.room.name,exits:[n.exits[0],n.exits[1],n.exits[2],n.exits[3]],holds:s?"item"in s?{kind:s.item.kind,name:s.item.name}:{kind:"monster",name:s.monster.name}:null}]})}look(){const{room:e,exits:n,holds:s}=this.place();return{name:e.name,text:e.text,...s&&"monster"in s?{monster:s.monster.name}:{},...s&&"item"in s?{item:s.item.name,itemKind:s.item.kind}:{},exits:Hr.flatMap((a,o)=>(n[o]??-1)>=0?[{direction:a,locked:(n[o]??0)>0}]:[]),at:[this.at[0],this.at[1]],life:this.life,...this.weapon?{weapon:this.weapon.name}:{},...this.shield?{shield:this.shield.name}:{},...this.key?{key:this.key.name}:{}}}go(e){const n=this.place(),s=Hr.indexOf(e),a=n.exits[s]??-1;if(a<0)return"There is no way out that way.";if(a>0){if(!this.key||this.key.value!==a)return"The way is locked and you are not carrying the key.";n.exits[s]=0,this.key=null}const[o,r]=Em[e];return this.at=[this.at[0]+o,this.at[1]+r],this.visited.add(this.here()),""}take(){const e=this.place();if(!e.holds||!("item"in e.holds))return"There is nothing here to take!";const{item:n}=e.holds;if(n.kind==="food")return this.life=Math.min(Bs,this.life+n.value),e.holds=null,"Yum yum!";const s=n.kind,a=this[s];return this[s]=n,e.holds=a?{item:a}:null,{weapon:"You have taken a weapon.",shield:"You have taken a shield.",key:"You have taken a key."}[s]}attack(){const e=this.place();if(!e.holds||!("monster"in e.holds))return"There is no monster to attack!";if(!this.weapon)return"You have no weapon to attack with!";const{monster:n}=e.holds,s=[];if(this.weapon.value-n.defence>0){const o=Fs(ro,n.drops);e.holds=o?{item:o}:null,s.push("The monster has been defeated!")}const a=n.attack-(this.shield?.value??0);return a>0&&(this.life-=a,s.push("OUCH!")),s.join(" ")||"Neither of you gets anywhere."}run(e){const n=e.trim().toLowerCase(),s={norte:"norte",north:"norte",n:"norte",sur:"sur",south:"sur",s:"sur",este:"este",east:"este",e:"este",oeste:"oeste",west:"oeste",w:"oeste"}[n];return s?this.go(s):n==="coger"||n==="take"||n==="get"?this.take():n==="atacar"||n==="attack"||n==="hit"?this.attack():n==="mirar"||n==="look"||n==="l"||n===""?"":"I do not understand you."}}function Ct(t,e){const n=Math.max(...t.map(a=>a.length)),s=[];return t.forEach((a,o)=>{for(let r=0;r<a.length;){const i=a[r]??".";let h=r+1;for(;a[h]===i;)h+=1;const c=e[i];i!=="."&&c&&s.push(`<rect x="${r}" y="${o}" width="${h-r}" height="1" fill="${c}"/>`),r=h}}),`<svg class="pixel" viewBox="0 0 ${n} ${t.length}" shape-rendering="crispEdges" aria-hidden="true">${s.join("")}</svg>`}const jt={k:"var(--ink)",a:"var(--accent)",m:"#aeb8c4",g:"#d4a017",b:"#8a5a2b",r:"#c0392b",w:"#f1f1ee",l:"#3f9b4b"},Ln={weapon:Ct(["......mm",".....mmm","....mmm.","g..mmm..",".gmmm...","..bg....",".b..g...","b......."],jt),shield:Ct([".kkkkkk.","kmmrrmmk","kmmrrmmk","krrrrrrk","kmmrrmmk",".kmrrmk.","..kmmk..","...kk..."],jt),food:Ct(["....b...","...b.ll.",".rrbrr..","rrrrrrr.","rwrrrrr.","rrrrrrr.",".rrrrr..","..r.r..."],jt),key:Ct(["........",".ggg....","g...g...","g...gggg","g...g.g.",".ggg..gg","........","........"],jt),monster:Ct(["........","...rr...","..rrrr..",".rwrrwr.",".rkrrkr.","rrrrrrrr","rrkkkkrr","r.r..r.r"],jt),player:Ct(["...kk...","..kkkk..","...kk...",".aaaaaa.","a.aaaa.a","..aaaa..","..a..a..",".kk..kk."],jt)},Qn=8,Om=["n","s","e","w"];function Cm(t,e){const n=new Map(t.map(a=>[a.where,a])),s=[];for(let a=Qn-1;a>=0;a-=1)for(let o=0;o<Qn;o+=1){const r=`${a},${o}`,i=n.get(r),h=e[0]===a&&e[1]===o;if(!i){s.push(`<span class="cell" data-where="${r}"><span></span></span>`);continue}const c=Om.flatMap((f,m)=>{const p=i.exits[m]??-1;return p<0?[`wall-${f}`]:p>0?[`door-${f}`]:[]}),l=["cell","seen",h?"here":"",...c].filter(Boolean).join(" "),d=i.holds?`<span class="thing${i.holds.kind==="monster"?" monster":""}" title="${$(i.holds.name)}">${Ln[i.holds.kind]}</span>`:"",u=h?`<span class="player">${Ln.player}</span>`:"";s.push(`<span class="${l}" data-where="${r}" title="${$(i.name)}"><span class="room">${$(i.name)}</span>${d}${u}</span>`)}return`<div class="map" role="img" aria-label="The map: ${t.length} of ${Qn*Qn} rooms seen">${s.join("")}</div>`}const jm={norte:"north",sur:"south",este:"east",oeste:"west"};function Lm(t){const e=["weapon","shield","key"].flatMap(s=>t[s]?[`<span class="held">${Ln[s]}${$(t[s]??"")}</span>`]:[]),n=Array.from({length:Bs},(s,a)=>`<span class="heart${a<t.life?" full":""}"></span>`).join("");return`<p class="gear"><span class="hearts" title="${t.life} of ${Bs} life">${n}</span>${e.join("")}</p>`}function Nm(t){const e=t.exits.map(({direction:s,locked:a})=>`${jm[s]}${a?" (locked)":""}`),n=[t.weapon&&`weapon:${t.weapon}`,t.shield&&`shield:${t.shield}`,t.key&&`key:${t.key}`].filter(Boolean).join(" ");return`<div class="seen"><h4>===== ${$(t.name)} =====</h4><p>${$(t.text).replace(/\n/g,"<br>")}</p>`+(t.monster?`<p class="monster">${Ln.monster}There is a monster here: ${$(t.monster)}</p>`:"")+(t.item?`<p class="item">${Ln[t.itemKind??"weapon"]}There is: ${$(t.item)}</p>`:"")+`<p class="exits">Exits: ${e.length?e.join(", "):"none"}.</p>`+Lm(t)+`<p class="status">(${t.at[1]},${t.at[0]})| ${$(n)} ${t.life}&gt;</p></div>`}function fl(t){return`<div class="adventure">${Cm(t.charted(),t.look().at)}${Nm(t.look())}</div>`}const Pm=()=>fl(new _t),pl="adventure",Rm=["north","south","east","west","take","attack"];function Bm(t){let e=Fm()??new _t;const n=y("div"),s=y("p",{class:"said"}),a=y("input",{type:"text",autocomplete:"off",spellcheck:!1,placeholder:"north, south, east, west, take, attack"});function o(l=""){n.innerHTML=fl(e),s.textContent=e.spent&&!l?"Game over; better luck next time.":l,e.won&&(s.textContent="CONGRATULATIONS! You have reached the pantry."),i()}function r(l){const d=e.run(l);o(d),a.value="",a.focus()}function i(){try{localStorage.setItem(pl,e.save())}catch{}}const h=y("form",{onsubmit:l=>(l.preventDefault(),r(a.value))},y("span",{class:"ps1"},"> "),a),c=y("div",{class:"row"},...Rm.map(l=>y("button",{type:"button",onclick:()=>r(l)},l)),y("button",{type:"button",class:"quiet",onclick:()=>(e=new _t,o(""))},"start again"));return t.replaceChildren(n,s,h,c),o(""),()=>i()}function Fm(){try{const t=localStorage.getItem(pl);return t?_t.load(t):null}catch{return null}}const Dm={name:"adventure",apps:{adventure:Bm},stills:{adventure:Pm}},Hm=["January","February","March","April","May","June","July","August","September","October","November","December"];function Ks(t){const[e,n,s]=t.refreshed.split("-").map(Number),a=`${s} ${Hm[(n??1)-1]} ${e}`,o=`${Math.min(...t.years)} to ${Math.max(...t.years)}`;return`<p class="source">Source: ${$(t.attribution)} <a href="${$(t.dataset)}">The dataset, at its source.</a> This site keeps sums of the finished years ${o}, last added to on ${a}.</p>`}function Fo(t,e){const n=t.querySelector("p.source");if(n)return n;const s=document.createElement("div");return fetch(e).then(a=>a.json()).then(a=>{s.innerHTML=Ks(a)}).catch(()=>{}),s}const Dt=[{code:"08019004",name:"Barcelona (Poblenou)",kind:"background",area:"urban"},{code:"08019043",name:"Barcelona (Eixample)",kind:"traffic",area:"urban"},{code:"08019044",name:"Barcelona (Gràcia - Sant Gervasi)",kind:"traffic",area:"urban"},{code:"08019057",name:"Barcelona (Palau Reial)",kind:"background",area:"urban"},{code:"08019058",name:"Barcelona (Observatori Fabra)",kind:"background",area:"suburban"},{code:"08015021",name:"Badalona",kind:"background",area:"urban"},{code:"08187012",name:"Sabadell",kind:"traffic",area:"urban"},{code:"17079003",name:"Girona (Escola de Música)",kind:"traffic",area:"urban"},{code:"25120001",name:"Lleida",kind:"traffic",area:"urban"},{code:"43148028",name:"Tarragona (Parc de la Ciutat)",kind:"background",area:"urban"},{code:"08137001",name:"Montseny (La Castanya)",kind:"background",area:"rural"}];function io(t,e){return e==="workdays"?[t.workdays]:e==="weekends"?[t.weekends]:[t.workdays,t.weekends]}const Wm=t=>(t%4===0&&t%100!==0||t%400===0?366:365)*24,ya=t=>t.reduce((e,n)=>e+n.reduce((s,a)=>s+a,0),0);function qm(t,e){return Object.entries(t.years).map(([n,s])=>{const a=io(s,e),o=a.reduce((h,c)=>h+ya(c.counts),0),r=a.reduce((h,c)=>h+ya(c.sums),0),i=io(s,"all").reduce((h,c)=>h+ya(c.counts),0);return{year:Number(n),mean:o>0?r/o:Number.NaN,measured:i/Wm(Number(n))}}).filter(({mean:n})=>!Number.isNaN(n)).sort((n,s)=>n.year-s.year)}function zm(t,e){const n=Object.entries(t.years).filter(([s])=>Number(s)>=e.from&&Number(s)<=e.to).flatMap(([,s])=>io(s,e.days));return Array.from({length:24},(s,a)=>Array.from({length:12},(o,r)=>{const i=n.reduce((c,l)=>c+(l.sums[r]?.[a]??0),0),h=n.reduce((c,l)=>c+(l.counts[r]?.[a]??0),0);return{mean:h>0?i/h:null,count:h}}))}const Lt=[[0,[0,255,0]],[20,[225,225,0]],[40,[255,0,0]],[60,[225,0,225]],[80,[64,0,64]],[230,[16,0,8]]],_m=([t,e,n])=>(.299*t+.587*e+.114*n)/255;function Do(t){const e=Math.max(0,Math.min(t,230)),n=Math.max(1,Lt.findIndex(([c])=>c>=e)),[s,a]=Lt[n-1]??Lt[0],[o,r]=Lt[n]??Lt[Lt.length-1],i=(e-s)/(o-s),h=a.map((c,l)=>Math.round(c+((r[l]??0)-c)*i));return{background:`rgb(${h.join(",")})`,light:_m(h)<.45}}const xs=80,gl=["January","February","March","April","May","June","July","August","September","October","November","December"],wl=t=>String(t+1).padStart(2,"0");function Gm(t,e,n){if(t.mean===null)return'<td class="none"></td>';const{background:s,light:a}=Do(t.mean),o=a?' class="deep"':"",r=`${gl[n]}, hour ${wl(e)}: ${t.mean.toFixed(1)} µg/m³, the mean of ${t.count} measurements`;return`<td${o} style="background:${s}" title="${r}">${Math.round(t.mean)}</td>`}function Ym(t){const e=`<tr><th></th>${gl.map(s=>`<th scope="col">${s.slice(0,3)}</th>`).join("")}</tr>`,n=t.map((s,a)=>`<tr><th scope="row">${wl(a)}</th>${s.map((o,r)=>Gm(o,a,r)).join("")}</tr>`);return`<table class="heat graded"><thead>${e}</thead><tbody>${n.join("")}</tbody></table>`}const es=720,ba=190,ve={top:14,right:8,bottom:22,left:34};function yl(t,e,n){const s=Math.min(...t),a=Math.max(...t),o=es-ve.left-ve.right,r=ba-ve.top-ve.bottom,i=o/Math.max(1,a-s+1),h=m=>ve.left+(m-s)*i,c=m=>ve.top+r-(m-e)/Math.max(1e-9,n-e)*r,d=Ys(n-e).map(m=>Math.round((m+e)*100)/100).map(m=>`<line class="grid" x1="${ve.left}" x2="${es-ve.right}" y1="${T(c(m))}" y2="${T(c(m))}"/><text x="${ve.left-4}" y="${T(c(m)+3)}" text-anchor="end">${m}</text>`).join(""),u=a-s>12?5:1,f=Array.from({length:a-s+1},(m,p)=>s+p).filter(m=>m%u===0).map(m=>`<text x="${T(h(m)+i/2)}" y="${ba-6}" text-anchor="middle">${m}</text>`).join("");return{slot:i,x:h,y:c,left:ve.left,right:es-ve.right,top:ve.top,height:r,levels:m=>m.map(({from:p,to:w,value:g,label:b})=>`<line class="span" x1="${T(h(p))}" x2="${T(h(w)+i)}" y1="${T(c(g))}" y2="${T(c(g))}"/><text class="span" x="${T((h(p)+h(w)+i)/2)}" y="${T(c(g)-5)}" text-anchor="middle">${b}</text>`).join(""),wrap:(m,p)=>`<svg class="years" viewBox="0 0 ${es} ${ba}" role="img" aria-label="${m}">${d}${f}${p}</svg>`}}function ho(t,e){const n=Math.max(e.top??0,...t.map(({value:l})=>l),1),s=yl(t.map(({year:l})=>l),0,n),{x:a,y:o,slot:r}=s,i=t.map(({year:l,value:d,title:u,chosen:f,partial:m,colour:p})=>`<rect class="${["bar",f?"chosen":"",m?"partial":""].filter(Boolean).join(" ")}" data-year="${l}"${p?` style="--bar:${p}"`:""} x="${T(a(l)+r*.15)}" y="${T(o(d))}" width="${T(r*.7)}" height="${T(o(0)-o(d))}"/><rect class="hit" data-year="${l}" x="${T(a(l))}" y="${s.top}" width="${T(r)}" height="${s.height}"><title>${u}</title></rect>`).join(""),h=(e.references??[]).map(({value:l,label:d})=>`<line class="reference" x1="${s.left}" x2="${s.right}" y1="${T(o(l))}" y2="${T(o(l))}"/><text class="reference" x="${s.right-2}" y="${T(o(l)-3)}" text-anchor="end">${d}</text>`).join(""),c=s.levels(e.spans??[]);return s.wrap(e.label,`${i}${h}${c}`)}const Um=.75,Jm=[{value:40,label:"EU limit, 40"},{value:10,label:"WHO guideline, 10"}];function Km(t,e){const n=t.map(({year:s,mean:a,measured:o})=>{const r=o<Um,i=r?`, from only ${Math.round(o*100)}% of the year's hours`:"";return{year:s,value:a,partial:r,colour:Do(a).background,chosen:s>=e.from&&s<=e.to,title:`${s}: ${a.toFixed(1)} µg/m³${i}`}});return ho(n,{label:"Mean NO2 of each year, µg/m³",top:xs,references:Jm})}const _r={all:"every day of the week",workdays:"Monday to Friday",weekends:"Saturdays and Sundays"};function Vm(){const t=Array.from({length:xs/5+1},(n,s)=>Do(s*5).background),e=[0,20,40,60,xs].map(n=>`<span>${n===xs?`${n}+`:n}</span>`).join("");return`<div class="scale" aria-hidden="true"><div class="ramp" style="background:linear-gradient(to right,${t.join(",")})"></div><div class="ticks">${e}</div><div class="ticks words"><span>clean</span><span>EU limit</span><span>twice it</span></div></div>`}function bl(t,e){const n=Object.keys(t.years).map(Number),s=Math.max(e.from,Math.min(...n)),a=Math.min(e.to,Math.max(...n)),o=s===a?String(s):`${s}–${a}`;return`<figure class="no2"><figcaption><strong>${t.name}</strong> · ${t.kind}, ${t.area} · mean NO2 in µg/m³ by hour of the day and month of the year · ${_r[e.days]}, ${o}</figcaption>`+Ym(zm(t,e))+Vm()+`<h4>The mean of each year, ${_r[e.days]}</h4>`+Km(qm(t,e.days),{from:s,to:a})+"</figure>"}function kn(t){const e=Object.keys(t.years).map(Number);return{from:Math.min(...e),to:Math.max(...e),days:"all"}}const Xm=[["all","every day"],["workdays","Monday to Friday"],["weekends","Saturday and Sunday"]];function Zm(t){const e=new Map,n=Fo(t,"/data/no2/index.json"),s=y("div");s.append(...t.querySelectorAll("figure"));let a=null,o={from:0,to:9999,days:"all"},r=!1;const i=(g,b=String(g))=>y("option",{value:g},b),h=y("select",{onchange:()=>{p(h.value)}},...Dt.map(({code:g,name:b})=>i(g,b))),c=y("select",{onchange:()=>m({days:c.value})},...Xm.map(([g,b])=>i(g,b))),l=y("select",{onchange:()=>m({from:Number(l.value),to:Math.max(Number(l.value),o.to)})}),d=y("select",{onchange:()=>m({to:Number(d.value),from:Math.min(Number(d.value),o.from)})}),u=y("button",{type:"button",onclick:()=>a&&m(kn(a))},"every year");function f(){a&&(s.innerHTML=bl(a,o),l.value=String(o.from),d.value=String(o.to),c.value=o.days)}function m(g){o={...o,...g},f()}async function p(g){const b=e.get(g)??fetch(`/data/no2/${g}.json`).then(v=>v.json());e.set(g,b);try{const v=await b;if(r||h.value!==g)return;const k=kn(v),S=a!==null&&(o.from!==kn(a).from||o.to!==kn(a).to),M=Object.keys(v.years).map(Number).filter(L=>L>=o.from&&L<=o.to),x=S&&M.length>0?{from:Math.min(...M),to:Math.max(...M)}:k;a=v,o={...x,days:o.days};const I=Object.keys(v.years);l.replaceChildren(...I.map(L=>i(L))),d.replaceChildren(...I.map(L=>i(L))),f()}catch{e.delete(g),s.replaceChildren(y("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}s.addEventListener("click",g=>{const b=g.target?.closest("[data-year]")?.getAttribute("data-year");b&&m({from:Number(b),to:Number(b)})});const w=y("div",{class:"row"},y("label",{},"Station ",h),y("label",{},"Days ",c),y("label",{},"Years ",l," to ",d),u);return t.replaceChildren(w,s,n),p(h.value),()=>{r=!0}}const Qm="https://analisi.transparenciacatalunya.cat/resource";function vl(t,e){const n=new URL(`${Qm}/${t}.json`);for(const[s,a]of Object.entries(e))a!==void 0&&n.searchParams.set(`$${s}`,String(a));return n.toString()}const Gr="tasf-thgu",kl=Array.from({length:24},(t,e)=>String(e+1).padStart(2,"0")),ef=0,tf=6,ts=()=>Array.from({length:12},()=>new Array(24).fill(0)),nf=()=>({workdays:{sums:ts(),counts:ts()},weekends:{sums:ts(),counts:ts()}});function sf(t){if(!Array.isArray(t))throw new Error("the portal did not answer with rows");if(t.length===0)throw new Error("the portal answered with no rows");return t}function af(t,e){const n=Number(e.month)-1;kl.forEach((s,a)=>{const o=t.sums[n],r=t.counts[n];if(!o||!r)throw new Error(`month ${e.month} is not a month`);o[a]=(o[a]??0)+Number(e[`s${s}`]??0),r[a]=(r[a]??0)+Number(e[`n${s}`]??0)})}const of={name:"no2",directory:"public/data/no2",firstYear:1991,files:Dt.map(t=>`${t.code}.json`),about:{measures:"NO2, hourly, µg/m³",network:"Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica",attribution:"Generalitat de Catalunya, Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica. Dades obertes.",dataset:`https://analisi.transparenciacatalunya.cat/d/${Gr}`,stations:Dt},requestsFor(t){const e=Dt.map(s=>`'${s.code}'`).join(","),n=kl.map(s=>`sum(h${s}) as s${s}, count(h${s}) as n${s}`).join(", ");return[vl(Gr,{select:`codi_eoi, date_extract_m(data) as month, date_extract_dow(data) as dow, count(*) as days, ${n}`,where:`contaminant='NO2' and codi_eoi in (${e}) and data between '${t}-01-01T00:00:00' and '${t}-12-31T23:59:59'`,group:"codi_eoi,month,dow",limit:5e3})]},withYear(t,e,n){const s=sf(n[0]);if(s.some(o=>Number(o.days)>5))throw new Error("some days are in the portal twice");if(!s.some(o=>o.month==="12"))throw new Error("the year does not reach December yet");const a=new Map;for(const o of s){const r=o.codi_eoi??"",i=a.get(r)??nf();a.set(r,i);const h=Number(o.dow);af(h===ef||h===tf?i.weekends:i.workdays,o)}return Object.fromEntries(Dt.map(o=>{const r=`${o.code}.json`,i=a.get(o.code),h={...t[r]?.years,...i?{[e]:i}:{}};return[r,{...o,years:h}]}))}},rf=t=>{const e=JSON.parse(t(`/data/no2/${Dt[0]?.code}.json`)),n=JSON.parse(t("/data/no2/index.json"));return bl(e,kn(e))+Ks(n)},hf={name:"air-quality",apps:{no2:Zm},stills:{no2:rf},sources:[of]},lf=9,Yr=8,ue={days:5,hoursADay:Yr,dayNames:["Mon","Tue","Wed","Thu","Fri"],hourNames:Array.from({length:Yr},(t,e)=>`${lf+e}:00`)},sn=t=>Math.max(0,Math.min(100,t));function Ur(t){const{focus:e,fatigue:n,featureSize:s,weeks:a,calendar:o,meetingTypes:r}=t,i=[];let h=0,c=0;for(let l=0;l<a;l+=1)for(let d=0;d<ue.days;d+=1){let u=0,f=0;for(let m=0;m<ue.hoursADay;m+=1){const p=r[o[`${d}-${m}`]??""];if(p){u=sn(u+p.focus),f=sn(f+p.fatigue),i.push({week:l,day:d,hour:m,inMeeting:!0,hourFocus:u,hourFatigue:f,hourProductivity:0,accumulatedProductivity:h,completedFeatures:c,featureCompleted:!1});continue}u=sn(u+e),f=sn(f+n);const w=sn(u-f),g=s-h,b=w>g,v=b?g:w;b?(c+=1,h=0):h+=v,i.push({week:l,day:d,hour:m,inMeeting:!1,hourFocus:u,hourFatigue:f,hourProductivity:v,accumulatedProductivity:h,completedFeatures:c,featureCompleted:b}),b&&(u=0)}}return i}function ns(){return Array.from({length:ue.hoursADay},()=>new Array(ue.days).fill(0))}function ss(t,{hour:e,day:n},s){const a=t[e];a&&(a[n]=(a[n]??0)+s)}function Jr(t,{featureSize:e,weeks:n}){const s=t[t.length-1],a=s?.completedFeatures??0,o=s?.accumulatedProductivity??0,r=a+Math.round(10*o/e)/10,i=a*e+o,h=Array.from({length:ue.days},()=>({productivity:0,features:0,meetings:0})),c={focus:ns(),fatigue:ns(),productivity:ns(),features:ns()};for(const d of t){const u=h[d.day];u.productivity+=d.hourProductivity,d.featureCompleted&&(u.features+=1),d.inMeeting&&(u.meetings+=1),ss(c.focus,d,d.hourFocus),ss(c.fatigue,d,d.hourFatigue),ss(c.productivity,d,d.hourProductivity),d.featureCompleted&&ss(c.features,d,1)}const l=d=>d.map(u=>u.map(f=>n>0?f/n:0));return{totalFeatures:r,totalProductivity:i,averageFeaturesPerWeek:n>0?r/n:0,averageProductivityPerWeek:n>0?i/n:0,days:h,hours:{focus:l(c.focus),fatigue:l(c.fatigue),productivity:l(c.productivity),features:c.features}}}const Ho={width:480,height:240,pad:{top:10,right:10,bottom:34,left:36}},{width:Kr,height:va,pad:ke}=Ho;function $l(t,e,n,s){const a=Kr-ke.left-ke.right,o=va-ke.top-ke.bottom,r=c=>ke.top+o-(t>0?c/t*o:0),i=s.map(c=>`<line class="grid" x1="${ke.left}" x2="${Kr-ke.right}" y1="${r(c)}" y2="${r(c)}"/><text x="${ke.left-4}" y="${r(c)+3}" text-anchor="end">${c}</text>`).join(""),h=(n>1?[1,Math.ceil(n/2),n]:[]).filter((c,l,d)=>d.indexOf(c)===l).map(c=>`<text x="${ke.left+(c-1)/Math.max(1,n-1)*a}" y="${va-ke.bottom+14}" text-anchor="middle">${c}</text>`).join("");return`${i}${h}<text x="${ke.left+a/2}" y="${va-6}" text-anchor="middle">${e.x}</text><text transform="translate(9 ${ke.top+o/2}) rotate(-90)" text-anchor="middle">${e.y}</text>`}const{width:Vr,height:an,pad:fe}=Ho;function xl(t,e,n){const s=Math.max(...t.map(m=>m.values.length),1),a=Math.max(1,...t.flatMap(m=>m.values)),o=Vr-fe.left-fe.right,r=an-fe.top-fe.bottom,i=o/s,h=i*.7/t.length,c=m=>fe.top+r-m/a*r,l=t.map((m,p)=>m.values.map((w,g)=>{const b=fe.left+g*i+i*.15+p*h;return`<rect class="${m.className}" x="${b.toFixed(1)}" y="${c(w).toFixed(1)}" width="${h.toFixed(1)}" height="${(fe.top+r-c(w)).toFixed(1)}"><title>${m.name}: ${Math.round(w*10)/10}</title></rect>`}).join("")).join(""),d=(n??[]).map((m,p)=>`<text x="${fe.left+p*i+i/2}" y="${an-fe.bottom+14}" text-anchor="middle">${m}</text>`).join(""),u=t.map((m,p)=>`<rect class="${m.className}" x="${fe.left+p*90}" y="${an-fe.bottom+20}" width="10" height="3"/><text x="${fe.left+p*90+14}" y="${an-fe.bottom+24}">${m.name}</text>`).join(""),f=$l(a,e,n?0:s,Ys(a));return`<svg viewBox="0 0 ${Vr} ${an}" role="img" aria-label="${e.y} by ${e.x}">${f}${l}${d}${u}</svg>`}const Xr={sizeAt(t){return t<=500?t:t<=750?500+(t-500)*2:t<1e3?1e3+(t-750)*35:1e4},positionOf(t){return t<=500?t:t<=1e3?500+(t-500)/2:t<1e4?750+(t-1e3)/35:1e3}};function as(t,e){const n=e.flat(),s=Math.min(...n),a=Math.max(...n),o=y("div",{class:"week"},y("span"),...ue.dayNames.map(r=>y("span",{class:"head"},r)));return e.forEach((r,i)=>{o.append(y("span",{class:"hour"},ue.hourNames[i]??""));for(const h of r){const c=a>s?(h-s)/(a-s):0;o.append(y("span",{class:"cell",style:`--heat:${(.1+c*.9).toFixed(2)}`},String(Math.round(h))))}}),y("div",{},y("h4",{},t),o)}function cf(t){const e={focus:25,fatigue:15,featureSize:300,weeks:8},n={"🍽️ Lunch":{focus:-100,fatigue:-100},"🏃 Sprint plan":{focus:-100,fatigue:50},"😴 Boring":{focus:-50,fatigue:-25}},s={};for(let C=0;C<ue.days;C+=1)s[`${C}-3`]="🍽️ Lunch";let a="🏃 Sprint plan",o=null;const r=y("div",{class:"figures"}),i=y("div",{class:"chart"}),h=y("div",{class:"maps"}),c=y("div",{class:"week"}),l=y("select"),d=y("input",{type:"number",min:-100,max:100}),u=y("input",{type:"number",min:-100,max:100}),f=y("input",{type:"text",placeholder:"New meeting name",size:16}),m=(C,E,N,A,O=_=>_,W=_=>_)=>{const _=y("output",{},String(e[C])),q=y("input",{type:"range",min:N,max:A,value:W(e[C]),oninput:()=>{e[C]=O(Number(q.value)),_.textContent=String(e[C]),P()}});return y("label",{},`${E}: `,_,q)},p=y("div",{class:"dials"},m("focus","Focus an hour",0,100),m("fatigue","Fatigue an hour",0,100),m("featureSize","Feature size",0,1e3,Xr.sizeAt,Xr.positionOf),m("weeks","Weeks",1,16));function w(){l.replaceChildren(...Object.keys(n).map(E=>y("option",{value:E,selected:E===a},E)));const C=n[a];d.value=String(C?.focus??0),u.value=String(C?.fatigue??0)}l.addEventListener("change",()=>{a=l.value,w()});const g=()=>{n[a]={focus:Number(d.value)||0,fatigue:Number(u.value)||0},P()};d.addEventListener("change",g),u.addEventListener("change",g);const b=()=>{const C=f.value.trim();!C||n[C]||(n[C]={focus:0,fatigue:0},a=C,f.value="",w())},v=y("div",{class:"row"},y("span",{},"Paint: "),l,y("span",{},"focus "),d,y("span",{},"fatigue "),u,f,y("button",{type:"button",onclick:b},"Add"));let k=null;const S=C=>{if(k==="add"&&!s[C])s[C]=a;else if(k==="remove"&&s[C])delete s[C];else return;P()};function M(){c.replaceChildren(y("span"),...ue.dayNames.map(C=>y("span",{class:"head"},C))),ue.hourNames.forEach((C,E)=>{c.append(y("span",{class:"hour"},C));for(let N=0;N<ue.days;N+=1){const A=`${N}-${E}`,O=s[A];c.append(y("span",{class:O?"slot meeting":"slot",title:O??"free",onpointerdown:W=>{W.preventDefault(),k=s[A]?"remove":"add",S(A)},onpointerenter:()=>{k&&S(A)}},O?O.slice(0,2):""))}})}window.addEventListener("pointerup",()=>{k=null});const x=y("div",{class:"row"}),I=()=>{o={summary:Jr(Ur({...e,calendar:s,meetingTypes:n}),e),weeks:e.weeks},P()},L=()=>{o=null,P()};function P(){M();const C=Ur({...e,calendar:s,meetingTypes:n}),E=Jr(C,e),N=e.weeks*ue.days*ue.hoursADay;r.replaceChildren(y("div",{class:"clean"},y("strong",{},E.totalFeatures.toFixed(1)),"features finished"),y("div",{},y("strong",{},E.averageFeaturesPerWeek.toFixed(2)),"features a week"),y("div",{},y("strong",{},Math.round(E.totalProductivity/N).toString()),"productivity an hour"),y("div",{},y("strong",{},String(N)),"hours simulated")),x.replaceChildren(o?y("span",{},`Baseline: ${o.summary.averageFeaturesPerWeek.toFixed(2)} features a week over ${o.weeks} weeks; now ${E.averageFeaturesPerWeek.toFixed(2)}. `):y("span",{},"Keep this run to compare against: "),y("button",{type:"button",onclick:I},o?"Save again":"Save as baseline")),o&&x.append(y("button",{type:"button",onclick:L},"Clear")),i.innerHTML=xl([{name:"Productivity",className:"clean",values:E.days.map(A=>A.productivity/e.weeks)},{name:"Features ×100",className:"debt",values:E.days.map(A=>A.features/e.weeks*100)}],{x:"",y:"A day, on average"},ue.dayNames),i.prepend(y("h4",{},"The shape of a week")),h.replaceChildren(as("Focus",E.hours.focus),as("Fatigue",E.hours.fatigue),as("Productivity",E.hours.productivity),as("Features finished",E.hours.features))}w(),t.append(p,v,y("div",{class:"charts"},c,i),r,x,h),P()}const df={name:"developer-meetings",apps:{"developer-meetings":cf}},on={exams:[.01,.01,.02,.01,.05,.2,.05,.1,.2,.3,.5,.4,.3,.2,.1,.05,.1,.3,.8,1,.4],labs:[.01,.02,.03,.04,.06,.09,.12,.17,.23,.32,.44,.48,.58,.78,.87,.89,.78,.75,.62,.45,.2]},ka={x:{frames:1,pace:1},normal:{frames:2,pace:1},normal1:{frames:2,pace:1},normal2:{frames:2,pace:1},est:{frames:7,pace:5},zz:{frames:2,pace:5},bt:{frames:6,pace:1},http:{frames:8,pace:2},pract:{frames:5,pace:1},no:{frames:4,pace:3},bar0:{frames:6,pace:1},amig:{frames:4,pace:3},suplica:{frames:2,pace:3}};class Tl{static everyImage=Object.entries(ka).flatMap(([e,{frames:n}])=>Array.from({length:n},(s,a)=>`${e}${a}`));series="x";frame=0;wait=0;after=null;shaking=-1;get image(){return`${this.series}${this.frame}`}play(e){if(this.shaking>=0){this.after=e;return}e!==this.series&&(this.wait=0),this.show(e)}flash(e,n){this.shaking<0&&(this.after=this.series),this.shaking=n,this.show(e)}stop(){this.shaking=-1,this.after=null,this.series="x",this.frame=0}beat(){if(this.shaking===0&&this.after&&this.show(this.after),this.shaking>=0&&(this.shaking-=1),this.wait>0&&(this.wait-=1),this.wait>0)return;const{frames:e,pace:n}=ka[this.series];this.frame=(this.frame+1)%e,this.wait=n}show(e){this.series=e,this.frame%=ka[e].frames}}const ge=3,ht=16,uf=25,_e=20,Zr=22,$a=200,xa=100,Ta=100,Qr=30,ei=-10,mf=.05,ff=.3,ti=10/ge,ni={superior:40,tecnica:25},pf={step:0,hour:0,day:0,term:1,doing:"idle",boredom:0,stress:0,labHabit:10,studyHabit:10,chatHabit:10,barHabit:10,friends:10,sleep:0,terminal:0,exams:Array(10).fill(0),labs:Array(10).fill(0),enrolled:4,passed:0,left:9,selection:!0,alfas:Array(6).fill(1),asks:null,suggested:0,ended:null,said:[]},gf=`Sorry, but you no longer belong to this faculty. :(



Normal.`,wf=`Hey, what are you playing at????
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
attention, doesn't it?)`,yf=`Don't you know that stress is really bad
for your health? Your Fibergochi has had to
leave the faculty, be more careful next time!
See if you can take its mind off things a little,
make new and interesting friends... or not so much...`;class lo{constructor(e,n={}){this.random=e;const s={...pf,...n};this.s={...s,exams:[...s.exams],labs:[...s.labs],alfas:[...s.alfas],said:[...s.said]},this.s.ended===null&&this.show(this.s.doing)}random;s;sprite=new Tl;beats=0;get state(){return{...this.s,exams:[...this.s.exams],labs:[...this.s.labs],alfas:[...this.s.alfas],said:[...this.s.said]}}get picture(){return this.sprite.image}get clock(){const e=this.s.step+this.s.hour*ge,n=e*30%60;return`${this.s.day+1}, ${Math.floor(e/(ge*ht)*24)}:${n<10?"0":""}${n}h (${this.s.term})`}get examsPending(){return this.studyLeft>0}get labsPending(){return this.labLeft>0}get studyLeft(){return this.taken(this.s.exams).reduce((e,n)=>e+Math.max(n,0),0)}get labLeft(){return this.taken(this.s.labs).reduce((e,n)=>e+Math.max(n,0),0)}get hasTerminal(){return this.s.terminal>0}get lampsLit(){return this.s.day<_e||this.beats%3===1}get enrolment(){return{most:Math.min(10,this.s.left),suggested:this.s.suggested}}get alive(){return this.s.ended===null}get waiting(){return this.s.said.length>0||this.s.asks!==null}step(){!this.alive||this.waiting||(this.keepHabits(),this.studyOrWork(),this.holdTerminal(),this.browseOn(),this.getBored(),this.calmDown(),this.alive&&(this.searchTerminal(),this.followHabits(),this.stayAtBar(),this.s.step+=1,this.s.step>=ge&&(this.s.step=0,this.nextHour())))}animate(){!this.alive||this.waiting||(this.beats+=1,this.sprite.beat())}studyOrSleep(){this.alive&&(this.s.day<=_e?this.set(this.random()<.5?"studying":"asleep"):this.sprite.flash("no",24))}browse(){this.alive&&(this.s.terminal?this.set("browsing"):this.sprite.flash("no",14))}goToBar(){this.alive&&this.set("bar")}makeFriends(){this.alive&&this.set("friends")}lookForTerminal(){this.alive&&(this.s.terminal<=0?this.set("looking"):this.sprite.flash("no",10))}beg(){if(!this.alive)return;const{exams:e,labs:n}=this.s,s=r=>e[r]+n[r],a=this.taken(e).map((r,i)=>i).filter(r=>s(r)>0);if(this.s.day<_e||a.length===0)return this.sprite.flash("no",10);const o=a.reduce((r,i)=>s(i)<s(r)?i:r);this.sprite.flash("suplica",20),this.random()<ff&&(e[o]-=this.random()*ti),this.s.stress+=ti*this.random()}alfa(){if(!this.alive)return;const{term:e,left:n,selection:s,alfas:a,enrolled:o,exams:r,labs:i,day:h,passed:c}=this.s;let l=`Score: this is term ${e} you have been at the FIB.

`;if(s)l+=`You are doing the Selection Phase.
You have ${n} credits left to finish it.

`;else{l+=`You are in the middle of the degree, and have ${n} credits left to finish.

`;const d=a.filter(f=>f<1).length,u=a.filter(f=>f<=.5).length;d>0?(l+=`Of your last six alfa parameters at most, you have:
 - ${d} notable.
`,u>0&&(l+=` - of these, ${u} dangerous.
`),l+=`
`,a.forEach((f,m)=>{f<1&&(l+=`The alfa of ${a.length-m} terms ago:	${Math.round(f*100)/100}.
`)}),l+=`
`):l+=`You have an impeccable record. (swot)

`}if(h<=Zr){const d=[0,0,0,0,0];for(let f=0;f<o;f+=1){const m=r[f]+i[f];d[m<=0?0:m<=2*ge?1:m<=5*ge?2:m<=8*ge?3:4]+=1}const u=["subjects going well","that will go well with a little effort","subjects you should get down to","subjects you find hard","subjects you had better pray for"];d.forEach((f,m)=>{f>0&&(l+=`You have ${f} ${u[m]}.
`)}),l+=`You are enrolled in ${o} subjects in all.`}else l+=`Of ${o}, ${c} are passed.`;this.s.said.push(l)}dismiss(){this.s.said.shift()}enrol(e){return this.s.asks!=="enrol"||!Number.isInteger(e)||e<1||e>this.enrolment.most?!1:(this.s.enrolled=e,this.s.asks=null,!0)}choose(e){this.s.asks==="degree"&&(this.s.left=ni[e],this.askEnrolment())}keepHabits(){const{doing:e}=this.s;e==="lab"?this.s.labHabit+=1:e==="studying"?this.s.studyHabit+=1:e==="browsing"?this.s.chatHabit+=1:e==="friends"?this.s.friends+=1:e==="bar"&&(this.s.barHabit+=1,this.s.friends+=.4),this.s.friends=Math.min(this.s.friends,Ta)}studyOrWork(){if(this.s.doing==="lab"){if(!this.labsPending)return this.set("idle");const e=this.easiest(this.s.labs);100-this.s.exams[e]>this.random()*100&&(this.s.labs[e]-=1)}else if(this.s.doing==="studying"){if(!this.examsPending)return this.set("idle");this.s.exams[this.easiest(this.s.exams)]-=1}}easiest(e){const{exams:n,labs:s}=this.s;let a=this.taken(e).findIndex(r=>r>0),o=n[a]+s[a]+a;for(let r=a+1;r<this.s.enrolled;r+=1){const i=n[r]+s[r];o>i&&e[r]>0&&(a=r,o=i+r)}return a}holdTerminal(){if(this.s.day>_e||this.s.terminal<=0){this.s.terminal=0;return}this.s.doing==="idle"&&this.labsPending&&this.set("lab"),this.s.doing==="lab"?this.s.terminal=Math.round(this.s.terminal+this.random()):(this.s.doing!=="browsing"||this.random()<=on.labs[this.s.day])&&(this.s.terminal-=1),this.s.terminal=Math.max(this.s.terminal,0)}browseOn(){this.s.doing==="browsing"&&(this.s.boredom+=Math.round(.5*this.random()),this.s.terminal<=0&&this.set("idle"))}getBored(){const{doing:e}=this.s;if(e==="idle"?(this.s.boredom+=1,this.s.boredom%10===0&&this.set("idle")):e==="studying"?this.s.boredom+=.1:e==="lab"?this.s.boredom+=this.random()/2:e==="asleep"?this.s.boredom-=1:e==="bar"&&(this.s.boredom-=this.random()),this.s.boredom>$a)return this.end("bad",wf);this.s.boredom=Math.max(this.s.boredom,-$a/2)}calmDown(){this.s.doing==="bar"&&(this.s.stress-=1),this.s.stress=Math.max(this.s.stress,0),this.s.stress>xa&&this.end("bad",yf)}searchTerminal(){const{doing:e,day:n}=this.s;if(e==="looking"&&n<=_e&&this.s.terminal<=0){this.s.stress+=1;const s=(.5+on.exams[n])*(1-on.labs[n]),a=this.random();if(a<=s){const o=(a<=s/2?4:2)*(ge+1);this.s.terminal=Math.round(o*this.random()),this.set("idle")}}else e==="looking"&&this.set("idle");n>_e&&(this.s.terminal=0)}followHabits(){const{doing:e,hour:n}=this.s,s=this.s.labHabit/this.s.chatHabit/2,a=this.s.chatHabit/this.s.labHabit/2,o=this.s.studyHabit/this.s.barHabit/2,r=this.labsPending,i=h=>this.random()<h;if(this.s.terminal>0)if(e==="lab")s<=.5?i(.5-s)&&this.set("browsing"):r||this.set(this.random()>(.5-a)*2?"browsing":"idle");else if(e==="browsing")if(r){const[h,c]=this.s.terminal<ge?[2,1]:[1,2];(a<=.5?i((.5-a)*h):this.random()>(.5-s)*c)&&this.set("lab")}else a<.5&&this.random()*.4>a&&this.set("idle");else(e==="idle"||e==="studying")&&(this.s.friends>Ta/2&&i(.5-o)&&this.set("bar"),a<=.5&&i(.5-a)&&this.set("browsing"),s<=.5&&i(.5-s)&&r&&this.set("lab"));else if(e==="studying"&&o<=.5){const h=n<ht/4?ge:n>3*ht/4?ge/2:1;this.random()*h<.5-o&&this.set("bar")}}stayAtBar(){this.s.doing==="bar"&&this.s.friends/Ta<this.random()/2&&this.set("idle")}nextHour(){if(this.getSleepy(),this.s.doing==="lab"&&(this.s.boredom+=Math.round(4*this.random())),this.classInTheRoom(),this.s.hour<ht-1){this.s.hour+=1;return}this.s.hour=0,this.nextDay()}getSleepy(){const e=this.s.hour<ht*3/4;this.s.doing!=="asleep"?(e?this.s.sleep+=1:this.s.doing==="idle"&&this.s.sleep>5?this.set("asleep"):this.s.sleep+=2+(this.s.terminal>0?1:0),this.s.sleep>(this.s.terminal>0?Qr*1.25:Qr)&&this.set("asleep")):e&&this.s.sleep<ei/4?this.set("idle"):(this.s.sleep-=2,this.s.sleep<ei&&this.set("idle"))}classInTheRoom(){const{hour:e}=this.s;e>=ht/3&&e<=2*ht/3&&this.random()<mf&&(this.s.terminal=0)}nextDay(){const{day:e}=this.s;if(this.fadeHabits(),e<_e?this.bringWork():e===Zr&&this.mark(),e<uf-1){this.s.day+=1;return}this.s.day=0,this.nextTerm()}fadeHabits(){const e=n=>Math.max(1,Math.round(n*.9));this.s.labHabit=e(this.s.labHabit),this.s.studyHabit=e(this.s.studyHabit),this.s.barHabit=e(this.s.barHabit),this.s.chatHabit=e(this.s.chatHabit),this.s.friends=e(this.s.friends)}bringWork(){const e=this.s.day+5;if(this.s.day===0)for(let n=e;n>=0;n-=1)this.bringWorkFor(n);else e<_e&&this.bringWorkFor(e)}bringWorkFor(e){for(let n=0;n<this.s.enrolled;n+=1){const s=ge*((n+1)/2)+1;this.random()<=on.labs[e]&&(this.s.labs[n]+=Math.round(s*this.random())),this.random()<=on.exams[e]&&(this.s.exams[n]+=Math.round(s*this.random()))}}mark(){for(let e=0;e<this.s.enrolled;e+=1)this.s.exams[e]+this.s.labs[e]<ge&&(this.s.passed+=1);this.s.alfas=[...this.s.alfas.slice(1),this.s.alfas[5]],this.s.exams.fill(0),this.s.labs.fill(0)}nextTerm(){const{enrolled:e,passed:n,selection:s,term:a}=this.s;if(this.s.alfas[5]=s?1:e?n/e:0,this.s.alfas.filter(o=>o<.5).length>3)return this.end("bad","You have 4 Alfa parameters below 0.5, bye, bye.");if(this.s.left-=n,this.s.passed=0,this.s.term+=1,this.s.left<=0){if(!s)return this.end("good",`Very Good!
You did it!!!!!!!
Your Fibergochi has finished the degree!!!!!
`,`ERROR 315: in module KERNEL386.EXE,
page 0137:0A285F43.
An UNFORESEEN situation has occurred,
we are very sorry, but we thought that
nobody would ever get here, where no
other man has gone before!.`);this.s.selection=!1,this.s.said.push("You have SUCCESSFULLY finished the SELECTION PHASE!!!!!"),this.s.asks="degree";return}if(s&&a===2&&this.s.left>8)return this.end("bad","BACARRA!!!!");if(s&&a>3){if(this.s.left>2)return this.end("bad","You have not got through the Selection Phase.");this.s.said.push(`You have not passed everything, but it is not serious.
YOU HAVE GOT THROUGH THE SELECTION PHASE, but... They will not throw you out, but you have to go to
the Técnica (or rather, they make you).`),this.s.left=ni.tecnica,this.s.selection=!1}this.askEnrolment()}askEnrolment(){this.s.asks="enrol",this.s.suggested=Math.min(Math.round(this.random()*4)+3,this.s.left)}taken(e){return e.slice(0,this.s.enrolled)}set(e){this.s.doing=e,this.show(e)}show(e){if(e==="lab")this.sprite.play("pract");else if(e==="studying")this.sprite.play("est");else if(e==="asleep")this.sprite.play("zz");else if(e==="looking")this.sprite.play("bt");else if(e==="friends")this.sprite.play("amig");else if(e==="browsing")this.sprite.play("http");else if(e==="bar")this.sprite.play("bar0");else{const n=this.s.boredom+this.s.stress,s=$a+xa;n<s/3?this.sprite.play("normal"):n<s/1.5?this.sprite.play("normal1"):this.sprite.play("normal2"),this.s.stress>xa*2/3&&this.sprite.play("normal2")}}end(e,...n){this.s.said.push(...n),e==="bad"&&this.s.said.push(gf),this.s.ended=e,this.s.asks=null,this.sprite.stop()}}const bf=["step","hour","day","term","boredom","stress","labHabit","studyHabit","chatHabit","barHabit","friends","sleep","terminal","enrolled","passed","left","suggested"],vf=["idle","asleep","studying","browsing","looking","lab","bar","friends"],Sa=(t,e)=>Array.isArray(t)&&t.length===e&&t.every(n=>Number.isFinite(n));function kf(t){let e;try{e=JSON.parse(t??"null")}catch{return null}return typeof e!="object"||e===null||Array.isArray(e)?null:bf.every(s=>Number.isFinite(e[s]))&&vf.includes(e.doing)&&Sa(e.exams,10)&&Sa(e.labs,10)&&Sa(e.alfas,6)&&typeof e.selection=="boolean"&&[null,"enrol","degree"].includes(e.asks)&&[null,"good","bad"].includes(e.ended)&&Array.isArray(e.said)&&e.said.every(s=>typeof s=="string")?e:null}const $f={x:"A cross: there is no Fibergochi.",normal:"The Fibergochi, standing about.",normal1:"The Fibergochi, standing about, getting bored.",normal2:"The Fibergochi, bored stiff.",est:"The Fibergochi at a desk, studying.",zz:"The Fibergochi, asleep.",bt:"A room full of terminals, all taken, and the Fibergochi looking for a free one.",http:"A terminal, and the Fibergochi browsing: http.",pract:"The Fibergochi at a terminal, doing a lab.",no:"The Fibergochi, shaking its head.",bar0:"The Fibergochi at the bar with its friends, drinks on the table.",amig:"The Fibergochi with a group of friends.",suplica:"The Fibergochi on the floor, begging."},xf=[[["study","estudio","Study/Sleep","to study or to sleep."]],[["http","http","http","to have a good time at a terminal (if you have one)."],["alfa","alfa","alfa","see the score."],["bar","bar","Bar","go to the bar, have a drink or play mus."]],"screen",[["friends","amigos","Friends","to make new friends."],["terminal","bt","Find terminal","look for a terminal to do labs, or not."],["beg","suplica","Beg","to try to get more passes."]]],Tf={slow:"slow",normal:"normal",fast:"fast"};function si(t,[e,n,s,a]){if(t<=0)return e;if(t<3)return`${n}, under an hour`;const o=Math.round(t/3);return`${t<15?s:a}, about ${o} ${o===1?"hour":"hours"}`}const De=(t,e,{title:n="",disabled:s=!1}={})=>`<button type="button" data-do="${t}"${n?` title="${$(n)}"`:""}${s?" disabled":""}>${e}</button>`;function Sl(t,{running:e,confirmingNew:n,pace:s,picked:a=null}){const o=!t.alive||t.waiting||n,r=m=>m&&t.lampsLit?"on":"off",i=[["exam",r(t.examsPending),si(t.studyLeft,["nothing to study","a little to study","something to study","a lot to study"])],["lab",r(t.labsPending),si(t.labLeft,["no lab to do","a little lab work","some lab work","a lot of lab work"])],["terminal",t.hasTerminal?"on":"off",t.hasTerminal?"a terminal":t.labsPending?"no terminal, and labs need one":"no terminal"]],h=i.map(([m,p,w])=>`<li><button type="button" class="lamp ${p}" data-do="lamp-${m}" data-lamp="${m}" title="${m}: ${w}">${m}</button></li>`).join(""),c=i.map(([m,p,w])=>`<li class="${p}${m===a?" picked":""}" data-lamp="${m}"><b>${m}</b> ${w}</li>`).join(""),l=t.picture,d=$f[l.replace(/\d$/,"")]??"",u=`<div class="screen"><ul class="lamps" data-show="lamps">${h}</ul><img data-show="picture" src="/fibergochi/${l}.gif" alt="${d}" width="200" height="160"></div>`;return`<div class="fibergochi"><div class="egg"><p class="by"><span>by</span> Night</p>${xf.map(m=>m==="screen"?u:`<div class="keys">${m.map(([p,w,g,b])=>{const[v,k]=w==="alfa"?[15,11]:[22,21];return De(p,`<img src="/fibergochi/keys/${w}.gif" alt="${g}" width="${v*2}" height="${k*2}">`,{title:`${g}: ${b}`,disabled:o})}).join("")}</div>`).join("")}</div><div class="panel"><p class="time"><output data-show="clock">${t.clock}</output> ${De("pause",e?"pause":"go on")} ${De("speed",`speed: ${Tf[s]}`,{title:"Change the speed of time."})} ${De("new","new")}</p><ul class="legend" data-show="legend">${c}</ul>${Sf(t,n)}</div></div>`}function Sf(t,e){const{said:n,asks:s}=t.state,a=(o,...r)=>`<div class="dialog" role="alertdialog"><p>${$(o).replaceAll(`
`,"<br>")}</p><p>${r.join(" ")}</p></div>`;if(e)return a("Are you sure you want a new Fibergochi?",De("new-yes","OK"),De("new-no","Cancel"));if(n.length>0)return a(n[0],De("ok","OK"));if(s==="degree")return a("Do you want to do the Superior?",De("superior","OK"),De("tecnica","Cancel"));if(s==="enrol"){const{most:o,suggested:r}=t.enrolment;return`<form class="dialog" data-do="enrol"><label>How many credits do you want to enrol in? [1..${o}] <input type="number" name="credits" min="1" max="${o}" value="${r}"></label> <button type="submit">OK</button></form>`}return""}const ai="fibergochi:1999-03-02",Ma={slow:1e3,normal:400,fast:10},Mf={slow:"normal",normal:"fast",fast:"slow"},Af=100,If=10;function Ef(t){let e=new lo(Math.random,f()??{}),n=!0,s=!1,a=null,o="slow",r=0;const i=Us(t),h=document.createElement("div"),c=y("div",{hidden:!0},...Tl.everyImage.map(x=>y("img",{src:`/fibergochi/${x}.gif`,alt:"",width:50,height:40}))),l=()=>Sl(e,{running:n,confirmingNew:s,pace:o,picked:a});function d(){const x=document.activeElement instanceof HTMLElement&&h.contains(document.activeElement)?document.activeElement.dataset.do:void 0;h.innerHTML=l(),x&&h.querySelector(`[data-do="${x}"]`)?.focus()}function u(){const x=document.createElement("div");x.innerHTML=l();for(const I of h.querySelectorAll("[data-show]")){const L=x.querySelector(`[data-show="${I.dataset.show}"]`);L&&(I instanceof HTMLImageElement?I.getAttribute("src")!==L.getAttribute("src")&&(I.src=L.getAttribute("src")??"",I.alt=L.getAttribute("alt")??""):I.innerHTML!==L.innerHTML&&(I.innerHTML=L.innerHTML))}}function f(){try{return kf(localStorage.getItem(ai))}catch{return null}}function m(){try{localStorage.setItem(ai,JSON.stringify(e.state))}catch{}}const p=()=>n&&i.onScreen()&&e.alive&&!e.waiting;let w=setTimeout(g,Ma[o]);function g(){if(w=setTimeout(g,Ma[o]),!!p()){if(e.step(),r+=1,e.waiting||!e.alive){m(),d();return}r%If===0&&m(),u()}}const b=setInterval(()=>{p()&&(e.animate(),u())},Af),v={study:()=>e.studyOrSleep(),http:()=>e.browse(),alfa:()=>e.alfa(),bar:()=>e.goToBar(),friends:()=>e.makeFriends(),terminal:()=>e.lookForTerminal(),beg:()=>e.beg()},k={pause:()=>n=!n,speed:()=>{o=Mf[o],clearTimeout(w),w=setTimeout(g,Ma[o])},new:()=>s=!0,"new-no":()=>s=!1,"new-yes":()=>{e=new lo(Math.random),s=!1,n=!0},ok:()=>e.dismiss(),superior:()=>e.choose("superior"),tecnica:()=>e.choose("tecnica")};function S(x){const I=x.target.closest("button[data-do]")?.dataset.do??"";I.startsWith("lamp-")?(a=I.slice(5),u()):v[I]?(v[I](),e.waiting?d():u()):k[I]&&(k[I](),m(),d())}function M(x){x.preventDefault();const I=x.target.querySelector("input[name=credits]");I&&e.enrol(Number(I.value))&&(m(),d())}return t.addEventListener("click",S),t.addEventListener("submit",M),window.addEventListener("pagehide",m),t.replaceChildren(h,c),d(),()=>{clearTimeout(w),clearInterval(b),i.stop(),m(),t.removeEventListener("click",S),t.removeEventListener("submit",M),window.removeEventListener("pagehide",m)}}const Of=()=>Sl(new lo(Math.random),{running:!0,confirmingNew:!1,pace:"slow"}),Cf={name:"fibergochi",apps:{fibergochi:Ef},stills:{fibergochi:Of}},Re=t=>[...t.replace(/\s/g,"")].map(e=>e==="#"?1:0),Gt={A:Re(".###. #...# ##### #...# #...#"),B:Re("####. #...# ####. #...# ####."),C:Re(".#### #.... #.... #.... .####"),D:Re("####. #...# #...# #...# ####."),E:Re("##### #.... ####. #.... #####"),H:Re("#...# #...# ##### #...# #...#"),O:Re(".###. #...# #...# #...# .###."),T:Re("##### ..#.. ..#.. ..#.. ..#.."),X:Re("#...# .#.#. ..#.. .#.#. #...#")};function Pn(t){let e=t>>>0;return()=>{e=e+1831565813>>>0;let n=Math.imul(e^e>>>15,1|e);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}const jf=t=>1/(1+Math.exp(-t));class Lf{weights;constructor(e,n){const s=Pn(n);this.weights=e.slice(1).map((a,o)=>Array.from({length:a},()=>Array.from({length:e[o]+1},()=>s()-.5)))}forward(e){const n=[[...e]];for(const s of this.weights){const a=[...n[n.length-1],1];n.push(s.map(o=>jf(o.reduce((r,i,h)=>r+i*a[h],0))))}return n}answer(e){return this.forward(e).pop()}learn(e,n,s){const a=this.forward(e),o=a[a.length-1];let r=o.map((h,c)=>(h-n[c])*h*(1-h));for(let h=this.weights.length-1;h>=0;h-=1){const c=[...a[h],1],l=this.weights[h],d=a[h].map((u,f)=>{let m=0;for(let p=0;p<l.length;p+=1)m+=l[p][f]*r[p];return m*u*(1-u)});for(let u=0;u<l.length;u+=1)for(let f=0;f<c.length;f+=1)l[u][f]-=s*r[u]*c[f];r=d}let i=0;for(let h=0;h<o.length;h+=1)i+=(o[h]-n[h])**2;return i/2}}const Nf=10,oi=.5;class Ml{constructor(e,n){this.shapes=e,this.network=new Lf([25,Nf,e.length],n),this.noise=Pn(n+1)}shapes;network;noise;rounds=0;error=0;train(e){for(let n=0;n<e;n+=1){let s=0;this.shapes.forEach(({pixels:a},o)=>{const r=this.shapes.map((h,c)=>c===o?1:0),i=Math.floor(this.noise()*a.length);s+=this.network.learn(a,r,oi),s+=this.network.learn(a.map((h,c)=>c===i?1-h:h),r,oi)}),this.error=s,this.rounds+=1}}read(e){const n=this.network.answer(e);return this.shapes.map(({name:s},a)=>({letter:s,score:n[a]}))}}const Pf=[{name:"A",pixels:Gt.A},{name:"B",pixels:Gt.B}];function co(t=Pf){const e=new Ml(t,1);return e.train(200),e}const Rf=3;function Al(t,e,n){const s=t.trim();return s===""?"Give it a name first.":[...s].length>Rf?"A name of three characters at most.":n.includes(s)?`“${s}” is already a letter it knows.`:e.some(Boolean)?null:"There is no ink on the grid to remember."}const Bf=t=>Array.isArray(t)&&t.length===25&&t.every(e=>e===0||e===1);function Ff(t,e=[]){let n;try{n=JSON.parse(t??"[]")}catch{return[]}if(!Array.isArray(n))return[];const s=[];for(const a of n){const{name:o,pixels:r}=a??{};typeof o!="string"||!Bf(r)||Al(o,r,[...e,...s.map(i=>i.name)])||s.push({name:o.trim(),pixels:r})}return s}function Il(t,e){const n=e.map((i,h)=>`<button type="button" class="cell" data-at="${h}" aria-pressed="${i?"true":"false"}" aria-label="cell ${h+1}"></button>`).join(""),s=t.read(e),a=s.reduce((i,h)=>h.score>i.score?h:i),o=s.map(({letter:i,score:h})=>`<tr${i===a.letter?' class="best"':""}><th scope="row">${$(i)}</th><td class="sure"><span class="bar" style="--p:${h.toFixed(3)}"></span>${Math.round(h*100)}%</td></tr>`).join(""),r=t.rounds===0?"It has not been taught anything yet: every answer is a guess.":`It reads <b>${$(a.letter)}</b>, after ${t.rounds} rounds of lessons.`;return`<div class="letters"><div class="grid" role="group" aria-label="the drawing, five cells by five">${n}</div><div class="reading"><p>${r}</p><table class="answers"><tbody>${o}</tbody></table></div></div>`}const ri="first-network:own",ii=Object.entries(Gt).map(([t,e])=>({name:t,pixels:e}));function Df(t){let e=p();const n=new Set(["A","B",...e.map(({name:x})=>x)]),s=()=>[...ii,...e];let a=co(f()),o=[...Gt.A];const r=y("div",{onclick:x=>{const I=x.target.closest("[data-at]")?.dataset.at;I!==void 0&&(o[Number(I)]=1-o[Number(I)],d())}}),i=y("div",{class:"row"}),h=y("div",{class:"row taught"}),c=y("input",{type:"text",maxlength:3,size:4,"aria-label":"a name for the drawing"}),l=y("p",{class:"error",hidden:!0});function d(){r.innerHTML=Il(a,o)}function u(x){o=x,d()}function f(){return s().filter(x=>n.has(x.name))}function m(){a=co(f()),d()}function p(){try{return Ff(localStorage.getItem(ri),Object.keys(Gt))}catch{return[]}}function w(){try{localStorage.setItem(ri,JSON.stringify(e))}catch{}}function g(){const x=Al(c.value,o,s().map(L=>L.name));if(l.textContent=x??"",l.hidden=x===null,x)return;const I={name:c.value.trim(),pixels:[...o]};e=[...e,I],n.add(I.name),c.value="",w(),k(),m()}function b(x){e=e.filter(I=>I.name!==x),n.delete(x);for(const I of ii)n.size<2&&n.add(I.name);w(),k(),m()}const v=(x,I)=>y("button",{type:"button",onclick:I},x);function k(){i.replaceChildren("Draw ",...s().map(x=>v(x.name,()=>u([...x.pixels]))),v("one cell wrong",()=>{const x=Math.floor(Math.random()*o.length);u(o.map((I,L)=>L===x?1-I:I))}),v("clear",()=>u(o.map(()=>0)))),h.replaceChildren("Taught: ",...s().map(x=>{const I=y("input",{type:"checkbox",value:x.name,checked:n.has(x.name),onchange:()=>{I.checked?n.add(x.name):n.size>2?n.delete(x.name):I.checked=!0,m()}}),L=e.includes(x)&&y("button",{type:"button",class:"forget","aria-label":`forget ${x.name}`,onclick:()=>b(x.name)},"×");return y("label",{},I,` ${x.name}`,L)}))}const S=y("div",{class:"row"},v("teach 100 more rounds",()=>{a.train(100),d()}),v("forget everything",()=>{a=new Ml(a.shapes,1),d()})),M=y("div",{class:"row own"},"Your own: draw it, name it ",c,v("remember this drawing",()=>g()),l);k(),t.replaceChildren(i,r,h,S,M),d()}const Hf=()=>Il(co(),Gt.A),Wf={name:"first-network",apps:{letters:Df},stills:{letters:Hf}},qf=1.5,zf=.02,_f=.25;class Gf{constructor(e,n,s,a){this.credit=s,this.random=a,this.remaining=[...e],this.buyers=n.map(o=>({bidder:o,credit:s,won:[],error:null}))}credit;random;buyers;remaining;sold=[];turns=[];get over(){return this.remaining.length===0}get next(){return this.remaining[0]}get market(){return{lots:this.remaining,credits:Object.fromEntries(this.buyers.map(e=>[e.bidder.name,e.credit])),sales:this.sold}}demands(){const e=this.next;return Object.fromEntries(this.buyers.map(n=>[n.bidder.name,e?this.demandOf(n,e):null]))}sell(){const e=this.remaining.shift();if(!e)throw new Error("the floor is empty");const n=this.buyers.map(o=>this.demandOf(o,e)),s=Object.fromEntries(this.buyers.map((o,r)=>[o.bidder.name,n[r]===null?null:e.value/(1+n[r])])),a=this.buyers.filter(o=>(s[o.bidder.name]??0)>o.credit).map(o=>o.bidder.name);for(let o=e.value*qf;o>=e.value*_f;o-=e.value*zf){const r=(e.value-o)/o,i=this.buyers.filter((c,l)=>c.credit>=o&&r>=(n[l]??1/0));if(i.length===0)continue;const h=i[Math.min(i.length-1,Math.floor(this.random()*i.length))];return h.credit-=o,h.won.push(e),this.record({lot:e,buyer:h.bidder.name,price:o},s,a)}return this.record({lot:e,buyer:null,price:null},s,a)}standings(){return this.buyers.map(({bidder:e,credit:n,won:s,error:a})=>{const o=s.reduce((i,h)=>i+h.value,0),r=this.credit-n;return{name:e.name,credit0:this.credit,credit:n,spent:r,lots:s.length,value:o,profit:o-r,error:a}})}record(e,n,s){return this.sold.push(e),this.turns.push({sale:e,bids:n,short:s}),e}demandOf(e,n){try{const s=e.bidder.demands(n,this.market,e.bidder.name);if(typeof s!="number"||Number.isNaN(s))throw new Error(`demanded ${String(s)}, not a margin`);return e.error=null,s}catch(s){return e.error=s instanceof Error?s.message:String(s),null}}}const hi=[["sardines",30],["anchovies",40],["squid",90],["hake",120],["sole",180],["prawns",250],["monkfish",300],["tuna",400]];function Yf(t,e){return Array.from({length:t},(n,s)=>{const[a,o]=hi[Math.floor(e()*hi.length)];return{id:s+1,kind:a,value:Math.round(o*(.7+.6*e()))}})}const Uf=60;function El(t,e,n){const s=Pn(t),a=Yf(Uf,s),o=a.reduce((r,i)=>r+i.value,0);return new Gf(a,e,n*o/Math.max(1,e.length),s)}function li(t,e="You"){const n=new Function("lot","market","me",t);return{name:e,demands:n}}const ci=`// Return the margin you demand: (value - price) / price.
// You are told the lots still to sell, everyone's credit, and every sale so far.
// This is Vicente. Change the 0.9 first.
const fish = market.lots.reduce((sum, lot) => sum + lot.value, 0);
const money = 0.9 * Object.values(market.credits).reduce((sum, c) => sum + c, 0);
if (money <= 0) return 0.001;
return Math.max(0.001, (fish - money) / money);
`,Jf=12,Ee=t=>Math.round(t).toString(),di=t=>t===null?"—":t===1/0?"∞":`${Math.round(t*100)}%`;function Ol(t){const e=t.next,n=t.demands(),s=[...t.standings()].sort((l,d)=>d.profit-l.profit),a=Math.max(1,...s.map(l=>Math.abs(l.profit))),o=e?`<p class="lot">Next on the floor: <b>a box of ${$(e.kind)}</b>, which resells for ${Ee(e.value)}. The price starts at ${Ee(e.value*1.5)} and falls.</p>`:'<p class="lot">The floor is empty.</p>',i=`<table class="board"><thead><tr><th>buyer</th><th>asks</th><th>holds</th><th>spent</th><th>worth</th><th>credit</th><th>profit</th></tr></thead><tbody>${s.map(({name:l,lots:d,spent:u,value:f,profit:m,credit:p,error:w})=>{const g=w?`<td class="asks error" colspan="5">${$(w)}</td>`:`<td class="asks">${di(n[l]??null)}</td>`;return`<tr${m<0?' class="loss"':""}><th scope="row">${$(l)}</th>${g}`+(w?"":`<td>${d} lot${d===1?"":"s"}</td><td>${Ee(u)}</td><td>${Ee(f)}</td><td>${Ee(p)}</td>`)+`<td class="profit"><span class="bar" style="--p:${(Math.abs(m)/a).toFixed(3)}"></span>${Ee(m)}</td></tr>`}).join("")}</tbody></table>`,h=t.turns,c=h.length?`<ol class="sales" reversed start="${h.length}">${[...h].reverse().slice(0,Jf).map(({sale:{lot:l,buyer:d,price:u},bids:f,short:m})=>{const p=u===null||d===null?"<i>withdrawn</i>":`sold at <b>${Ee(u)}</b>, a margin of ${di((l.value-u)/u)}`,w=Object.entries(f).map(([g,b])=>{if(b===null)return`${$(g)} —`;const v=g===d?`<b>${$(g)}</b>`:$(g);return m.includes(g)?`<s title="more than it had">${v} at ${Ee(b)}</s>`:`${v} at ${Ee(b)}`}).join(", ");return`<li><span class="went">${$(l.kind)}, ${Ee(l.value)}: ${p}.</span> <span class="ready">Ready to shout: ${w}.</span></li>`}).join("")}</ol>`:"";return`<div class="fish-market">${o}${i}${c}</div>`}function ui(t,e){return{name:t,demands:()=>e}}const mi=.001;function Wo(t,e){const n=t.lots.reduce((a,o)=>a+o.value,0),s=e*Object.values(t.credits).reduce((a,o)=>a+o,0);return s<=0?mi:Math.max(mi,(n-s)/s)}const Kf=.9,Vf=3,os=10;function Xf(t="Planner"){return{name:t,demands(e,n,s){const a=Wo(n,Kf),o=a*(Vf-1)/os,r=f=>a+f*o,i=f=>Math.max(0,Math.min(os-1,Math.floor((f-a)/o))),h=new Array(os).fill(0);for(const f of n.sales){if(f.price===null)continue;const m=i((f.lot.value-f.price)/f.price);h[m]=h[m]+f.lot.value}const c=h.reduce((f,m)=>f+m,0);if(c===0)return a;const l=n.lots.reduce((f,m)=>f+m.value,0),d=n.credits[s]??0;let u=0;for(let f=os-1;f>=0;f-=1)if(u+=l*h[f]/c/(1+r(f)),u>=d)return r(f);return a}}}function Zf(t=.9,e="Vicente"){return{name:e,demands:(n,s)=>Wo(s,t)}}const Qf=.98,ep=1.05,tp=.95,np=t=>(t.lot.value-t.price)/t.price;function fi(t,e){const n=e.filter(a=>a.buyer===t),s=n.reduce((a,o)=>a+o.price,0);return s>0?(n.reduce((a,o)=>a+o.lot.value,0)-s)/s:0}function sp(t="Wanda"){return{name:t,demands(e,n,s){const a=Wo(n,Qf),o=fi(s,n.sales);let r=1;for(const i of n.sales)i.buyer!==null&&(i.buyer===s?r*=ep:fi(i.buyer,n.sales)>=o&&np(i)>=a&&(r*=tp));return a*r}}}function Cl(t=.9){return[ui("Patient",1),ui("Hasty",.05),Zf(t),sp(),Xf()]}const ap=250,op=1,pi="fish-market:own",rs="fish-market:seated";function rp(t){let e=op,n=null,s,a=null;const o=y("div"),r=y("p",{class:"error",hidden:!0}),i=y("output",{},"90%"),h=y("input",{type:"range",min:.5,max:1,step:.02,value:.9,oninput:()=>m()}),c=y("output",{},"50%"),l=y("input",{type:"range",min:.3,max:1.2,step:.05,value:.5,oninput:()=>m()}),d=y("textarea",{class:"agent",spellcheck:!1,rows:9,oninput:()=>b()}),u=y("button",{type:"button",onclick:()=>a?g():w()},"run");function f(){o.innerHTML=Ol(s)}function m(){g(),i.textContent=`${Math.round(Number(h.value)*100)}%`,c.textContent=`${Math.round(Number(l.value)*100)}%`,s=El(e,[...Cl(Number(h.value)),...n?[n]:[]],Number(l.value)),f()}function p(){return s.over?!1:(s.sell(),f(),!0)}function w(){u.textContent="stop",a=setInterval(()=>{p()||g()},ap)}function g(){a&&clearInterval(a),a=null,u.textContent="run"}function b(){try{localStorage.setItem(pi,d.value)}catch{}}function v(){try{n=li(d.value),r.hidden=!0,localStorage.setItem(rs,"yes")}catch(L){n=null,r.textContent=L instanceof Error?L.message:String(L),r.hidden=!1,localStorage.removeItem(rs)}m()}function k(){n=null,localStorage.removeItem(rs),m()}const S=y("div",{class:"dials"},y("label",{},"Vicente believes the others will spend: ",i,h),y("label",{},"Money in the room, as a share of the fish: ",c,l)),M=y("div",{class:"row"},y("button",{type:"button",onclick:()=>{p()}},"next lot"),u,y("button",{type:"button",onclick:()=>{for(g();p(););}},"whole morning"),y("button",{type:"button",onclick:()=>{e=Math.floor(Math.random()*1e9),m()}},"new morning")),x=y("div",{class:"row"},y("button",{type:"button",onclick:()=>v()},"seat it"),y("button",{type:"button",onclick:()=>k()},"stand it down")),I=y("details",{class:"own"},y("summary",{},"Seat your own agent"),d,x,r);try{d.value=localStorage.getItem(pi)??ci,localStorage.getItem(rs)&&(n=li(d.value))}catch{d.value=ci}return t.replaceChildren(S,M,o,I),m(),g}const ip=()=>Ol(El(1,Cl(),.5)),hp={name:"fish-market",apps:{"fish-market":rp},stills:{"fish-market":ip}};function lp(t,e){const n=[];for(let s=t.length-1;s>=0;s-=1)n.push(t.slice(0,s));for(let s=1;s<=e.length;s+=1)n.push(e.slice(0,s));return n}const cp=3800,dp=6500,up=26,mp=46,fp=420;function pp(t){return[...t.childNodes].map(e=>e.nodeName==="BR"?`
`:e.textContent??"").join("")}function gp(t){const e=document.querySelector("main h1");if(!e||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return()=>{};const n={text:pp(e)};e.setAttribute("aria-label",n.text),e.classList.add("typing");const s=document.createElement("span");s.className="caret idle",s.setAttribute("aria-hidden","true");const a=(l,d)=>{const u=l.split(`
`).flatMap((f,m)=>m===0?[f]:[document.createElement("br"),f]);if(d){const f=document.createElement("a");f.href=d,f.append(...u,s),e.replaceChildren(f)}else e.replaceChildren(...u,s)};a(n.text);let o=n,r=[],i=performance.now()+cp,h=0;const c=l=>{if(h=requestAnimationFrame(c),l<i)return;if(r.length===0){const u=t(o,n);r=lp(o.text,u.text),o=u,s.classList.remove("idle")}const d=r.shift()??o.text;a(d,r.length===0?o.href:void 0),r.length===0?(s.classList.add("idle"),i=l+dp):d===""?i=l+fp:i=l+(d.length<(r[0]?.length??0)?mp:up)};return h=requestAnimationFrame(c),()=>{cancelAnimationFrame(h),a(n.text),s.remove(),e.classList.remove("typing"),e.removeAttribute("aria-label")}}function wp(t,e){const n=[...t];for(let s=n.length-1;s>0;s-=1){const a=Math.min(s,Math.floor(e()*(s+1)));[n[s],n[a]]=[n[a],n[s]]}return n}function yp(t,e){let n=[];return s=>(n.length===0&&(n=wp(t,e),n.length>1&&n[0]===s&&n.push(n.shift())),n.shift()??s)}const bp=[{text:`More than
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
as this page opened.`,href:"/projects/worlds/"}];let Aa=null;const vp={name:"headline",arrive:t=>{if(Aa?.(),Aa=null,t.route!=="/")return;let e=null;Aa=gp((n,s)=>(e??=yp([s,...bp],Math.random),e(n)))}};function gi(t,e="You"){const n=new Function("fish","weeks","bots","me","rounds",t);return{name:e,orders:n}}const wi=`// Return your orders for the round: one number a week, 0 to rest.
// You know the fish at the start, the weeks, who is on the lagoon (bots),
// your name (me), and every round before (rounds), but not what the others
// will do this time.
// This one rests, lets the lagoon grow, and takes one share the last week.
let grown = fish;
for (let week = 1; week < weeks; week++) grown += Math.floor(grown / 2);
const orders = new Array(weeks).fill(0);
orders[weeks - 1] = Math.floor(grown / bots.length);
return orders;
`;function jl(t){const e=t.rounds[t.rounds.length-1],n=t.scores(),s=Math.max(1,...Object.values(n)),a=[...t.names].sort((u,f)=>n[f]-n[u]).map(u=>{const f=t.errors[u];return`<tr><th scope="row">${$(u)}</th>`+(f?`<td class="error" colspan="2">${$(f)}</td>`:`<td>${e?.totals[u]??0}</td><td class="profit"><span class="bar" style="--p:${(n[u]/s).toFixed(3)}"></span>${n[u]}</td>`)+"</tr>"}).join(""),o=t.rounds.length,r=`<table class="board"><caption>${o===0?"The season has not started":`After ${o} round${o===1?"":"s"}`}</caption><thead><tr><th>bot</th><th>last round</th><th>season</th></tr></thead><tbody>${a}</tbody></table>`;if(!e)return`<div class="lagoon"><p class="lot">The lagoon has <b>${t.fish} fish</b>, and ${t.weeks} weeks ahead. Nobody has been out yet.</p>${r}</div>`;const i=e.weeks.map((u,f)=>`<th>${f+1}</th>`).join(""),h=Math.max(1,...e.weeks.map(u=>u.fish)),c=e.weeks.map(u=>`<td><span class="fish" style="--p:${(u.fish/h).toFixed(3)}"></span>${u.fish}</td>`).join(""),l=t.names.map(u=>{const f=e.weeks.map((m,p)=>{const w=e.orders[u]?.[p]??0,g=m.caught[u]??0;return`<td${w>g?' class="short"':""} title="asked for ${w}">${g}</td>`}).join("");return`<tr><th scope="row">${$(u)}</th>${f}<td class="total">${e.totals[u]}</td></tr>`}).join("");return`<div class="lagoon">${`<table class="weeks"><caption>Round ${o}, week by week: what each bot caught, and what was left in the lagoon</caption><thead><tr><th>week</th>${i}<th>total</th></tr></thead><tbody>${l}<tr class="water"><th scope="row">in the lagoon</th>${c}<td></td></tr></tbody></table>`}${r}</div>`}function Ll(t,e,n){const s=[];let a=t;for(let o=0;o<e;o+=1){const r=Math.max(0,Math.min(a,Math.floor(n(a,o))));s.push(r),a-=r,a+=Math.floor(a/2)}return s}const is={rest:{name:"Rest",orders:(t,e)=>new Array(e).fill(0)},one:{name:"One",orders:(t,e)=>new Array(e).fill(1)},power:{name:"Power",orders:(t,e)=>Array.from({length:e},(n,s)=>s*s)},percent:t=>({name:`${Math.round(t*100)}%`,orders:(e,n)=>Ll(e,n,s=>s*t)})},yi=(t,e)=>Math.ceil(t/e);function bi(t="Tit for tat"){const e=new Set;return{name:t,orders(n,s,a,o,r){for(const h of r)for(const c of Object.keys(h.orders))c!==o&&(h.orders[c]?.[0]??0)>=yi(h.start,a.length)&&e.add(c);if(a.some(h=>h!==o&&e.has(h)))return Ll(n,s,h=>yi(h,a.length));let i=n;for(let h=1;h<s;h+=1)i+=Math.floor(i/2);return[...new Array(s-1).fill(0),Math.floor(i/a.length)]}}}function Nl(){return[{fisher:is.one,seated:!0},{fisher:is.power,seated:!0},{fisher:is.percent(.1),seated:!0},{fisher:is.percent(.4),seated:!1},{fisher:bi("Tit for tat"),seated:!0},{fisher:bi("Tat for tit"),seated:!0}]}function kp(t,e,n){const s=Object.keys(n),a=[],o=Object.fromEntries(s.map(i=>[i,0]));let r=t;for(let i=0;i<e;i+=1){const h=Object.fromEntries(s.map(l=>[l,0])),c=s.map(l=>({name:l,order:Math.max(0,Math.floor(n[l]?.[i]??0))})).filter(({order:l})=>l>0);for(const l of[...new Set(c.map(({order:d})=>d))].sort((d,u)=>d-u)){const d=c.filter(f=>f.order===l),u=Math.min(Math.floor(r/d.length),l);for(const{name:f}of d)h[f]=u,o[f]=o[f]+u;r-=u*d.length}r+=Math.floor(r/2),a.push({fish:r,caught:h})}return{start:t,orders:n,weeks:a,totals:o}}class Pl{constructor(e,n,s){this.fish=e,this.weeks=n,this.fishers=s}fish;weeks;fishers;rounds=[];errors={};get names(){return this.fishers.map(e=>e.name)}play(){const e=Object.fromEntries(this.fishers.map(s=>[s.name,this.ordersOf(s)])),n=kp(this.fish,this.weeks,e);return this.rounds.push(n),n}scores(){return Object.fromEntries(this.names.map(e=>[e,this.rounds.reduce((n,s)=>n+(s.totals[e]??0),0)]))}ordersOf(e){try{const n=e.orders(this.fish,this.weeks,this.names,e.name,this.rounds);if(!Array.isArray(n)||n.some(s=>typeof s!="number"||Number.isNaN(s)))throw new Error("orders must be an array of numbers, one a week");return delete this.errors[e.name],Array.from({length:this.weeks},(s,a)=>n[a]??0)}catch(n){return this.errors[e.name]=n instanceof Error?n.message:String(n),new Array(this.weeks).fill(0)}}}const vi="lagoon:own",hs="lagoon:seated";function $p(t){let e=null,n;const s=y("div"),a=y("p",{class:"error",hidden:!0}),o=y("output",{},"100"),r=y("input",{type:"range",min:5,max:200,step:1,value:100,oninput:()=>u()}),i=y("output",{},"10"),h=y("input",{type:"range",min:4,max:14,step:1,value:10,oninput:()=>u()}),c=y("textarea",{class:"agent",spellcheck:!1,rows:11,oninput:()=>m()}),l=Nl().map(({fisher:M,seated:x})=>({fisher:M,box:y("input",{type:"checkbox",checked:x,onchange:()=>u()})}));function d(){s.innerHTML=jl(n)}function u(){o.textContent=r.value,i.textContent=h.value;const M=l.filter(({box:x})=>x.checked).map(({fisher:x})=>x);n=new Pl(Number(r.value),Number(h.value),[...M,...e?[e]:[]]),d()}function f(M){for(let x=0;x<M;x+=1)n.play();d()}function m(){try{localStorage.setItem(vi,c.value)}catch{}}function p(){try{e=gi(c.value),a.hidden=!0,localStorage.setItem(hs,"yes")}catch(M){e=null,a.textContent=M instanceof Error?M.message:String(M),a.hidden=!1,localStorage.removeItem(hs)}u()}function w(){e=null,localStorage.removeItem(hs),u()}const g=y("div",{class:"dials"},y("label",{},"Fish in the lagoon at the start: ",o,r),y("label",{},"Weeks in a round: ",i,h)),b=y("div",{class:"row bench"},"On the lagoon: ",...l.map(({fisher:M,box:x})=>y("label",{},x,` ${M.name}`))),v=y("div",{class:"row"},y("button",{type:"button",onclick:()=>f(1)},"play a round"),y("button",{type:"button",onclick:()=>f(5)},"play five"),y("button",{type:"button",onclick:()=>u()},"new season")),k=y("div",{class:"row"},y("button",{type:"button",onclick:()=>p()},"seat it"),y("button",{type:"button",onclick:()=>w()},"stand it down")),S=y("details",{class:"own"},y("summary",{},"Seat your own bot"),c,k,a);try{c.value=localStorage.getItem(vi)??wi,localStorage.getItem(hs)&&(e=gi(c.value))}catch{c.value=wi}t.replaceChildren(g,b,v,s,S),u()}const xp=()=>jl(new Pl(100,10,Nl().filter(({seated:t})=>t).map(({fisher:t})=>t))),Tp={name:"lagoon",apps:{lagoon:$p},stills:{lagoon:xp}},xe={N:1,S:2,E:4,W:8};function Rl(t){const{width:e,height:n,cells:s,links:a}=t,o=e*n-1,r=new Map([[0,-1]]),i=[0];for(let c=0;c<i.length;c+=1){const l=i[c];if(l===o)break;const d=l%e,u=Math.floor(l/e),f=s[l],m=[];f&xe.E&&d+1<e&&m.push(l+1),f&xe.W&&d>0&&m.push(l-1),f&xe.N&&u+1<n&&m.push(l+e),f&xe.S&&u>0&&m.push(l-e);const p=a.get(l);p!==void 0&&a.get(p)===l&&m.push(p);for(const w of m)r.has(w)||(r.set(w,l),i.push(w))}if(!r.has(o))return null;const h=[];for(let c=o;c!==-1;c=r.get(c))h.unshift({x:c%e,y:Math.floor(c/e)});return h}function Bl(t){const e=Rl(t);if(!e)return"There is no way out: the only one ran through a sphere that leads nowhere.";const n=e.slice(1).filter((a,o)=>Math.abs(a.x-e[o].x)+Math.abs(a.y-e[o].y)>1).length,s=n===0?"touches no sphere":`jumps through ${n===1?"one sphere":`${n} spheres`}`;return`The way out is ${e.length} rooms long, and ${s}.`}const ki=0x5deece66dn,Sp=0xbn,$i=(1n<<48n)-1n;class Mp{seed;constructor(e){this.seed=(BigInt(e)^ki)&$i}nextInt(e){if((e&-e)===e)return Number(BigInt(e)*BigInt(this.next(31))>>31n);for(;;){const n=this.next(31),s=n%e;if((n-s+(e-1)|0)>=0)return s}}next(e){return this.seed=this.seed*ki+Sp&$i,Number(BigInt.asIntN(32,this.seed>>BigInt(48-e)))}}const xi=16,Ap=[["N","E","W","S"],["W","S","E","N"],["S","E","W","N"]],Ip={N:[0,1,"S"],S:[0,-1,"N"],E:[1,0,"W"],W:[-1,0,"E"]};function Fl(t,e,n,{spheres:s=!0}={}){const a=new Mp(n),o=new Array(t*e).fill(0),r=new Map,i=[],h=(d,u)=>d+u*t;function c(d,u){i.push({x:d,y:u}),s&&a.nextInt(10)<1&&l(d,u);for(const f of Ap[a.nextInt(3)]){const[m,p,w]=Ip[f],g=d+m,b=u+p;g<0||b<0||g>=t||b>=e||o[h(g,b)]!==0||(o[h(d,u)]|=xe[f],o[h(g,b)]=xe[w],c(g,b),i.push({x:d,y:u}))}}function l(d,u){const f=a.nextInt(t),m=a.nextInt(e);o[h(f,m)]===0&&(o[h(d,u)]|=xi,o[h(f,m)]=xi,r.set(h(d,u),h(f,m)),r.set(h(f,m),h(d,u)),c(f,m),i.push({x:d,y:u}))}return c(0,0),o[h(0,0)]|=xe.S,o[h(t-1,e-1)]|=xe.N,{width:t,height:e,cells:o,links:r,path:i}}const he=10,ls=4;function Dl(t,{trail:e,way:n}={}){const{width:s,height:a,cells:o,links:r}=t,i=g=>ls+g*he,h=g=>ls+(a-1-g)*he,c=({x:g,y:b})=>[i(g)+he/2,h(b)+he/2],l=[];for(let g=0;g<a;g+=1)for(let b=0;b<s;b+=1){const v=o[b+g*s];v&xe.S||l.push(`M${i(b)} ${h(g)+he}h${he}`),v&xe.W||l.push(`M${i(b)} ${h(g)}v${he}`),g===a-1&&!(v&xe.N)&&l.push(`M${i(b)} ${h(g)}h${he}`),b===s-1&&!(v&xe.E)&&l.push(`M${i(b)+he} ${h(g)}v${he}`)}const d=new Map;let u=0;const f=[...r].map(([g,b])=>{const v=r.get(b)===g;if(!v)u+=1;else if(!d.has(g)){const M=String.fromCharCode(97+d.size/2%26);d.set(g,M).set(b,M)}const[k,S]=c({x:g%s,y:Math.floor(g/s)});return`<circle class="sphere${v?"":" dead"}" cx="${k}" cy="${S}" r="${he*.3}"/><text class="letter" x="${k}" y="${S}">${v?d.get(g):"×"}</text>`}),m=g=>g.map((b,v)=>{const k=g[v-1];return`${k&&Math.abs(b.x-k.x)+Math.abs(b.y-k.y)===1?"L":"M"}${c(b).join(" ")}`}).join(""),p=[];if(n&&p.push(`<path class="way" d="${m(n)}"/>`),e!==void 0&&e>0){const g=t.path.slice(0,e),[b,v]=c(g[g.length-1]);p.push(`<path class="trail" d="${m(g)}"/>`,`<circle class="walker" cx="${b}" cy="${v}" r="${he*.22}"/>`)}return`<svg class="maze" role="img" aria-label="${`A ${s} by ${a} maze with ${r.size} sphere${r.size===1?"":"s"}`+(u?`, ${u} leading nowhere`:"")+"."}" viewBox="0 0 ${s*he+2*ls} ${a*he+2*ls}">`+p.join("")+`<path class="walls" d="${l.join("")}"/>`+f.join("")+"</svg>"}const qt={size:7,seed:543},Ep=100;function Op(t){let e,n=0,s=!1,a=null;const o=y("div",{class:"figure"}),r=y("p",{class:"status"}),i=y("output",{},String(qt.size)),h=y("input",{type:"range",min:5,max:30,step:1,value:qt.size,oninput:()=>m()}),c=y("input",{type:"number",value:qt.seed,onchange:()=>m()}),l=y("input",{type:"checkbox",checked:!0,onchange:()=>m()}),d=y("button",{type:"button",onclick:()=>a?w():p()},"walk the camera"),u=y("button",{type:"button",onclick:()=>g()},"show the way out");function f(){o.innerHTML=Dl(e,{trail:n,way:s?Rl(e):null})}function m(){w(),n=0,i.textContent=h.value,e=Fl(Number(h.value),Number(h.value),Number(c.value),{spheres:l.checked}),r.textContent=Bl(e),f()}function p(){n>=e.path.length&&(n=0),d.textContent="stop",a=setInterval(()=>{n+=1,f(),n>=e.path.length&&w()},Ep)}function w(){a&&clearInterval(a),a=null,d.textContent="walk the camera"}function g(){s=!s,u.textContent=s?"hide the way out":"show the way out",f()}const b=y("button",{type:"button",onclick:()=>(c.value=String(Math.floor(Math.random()*1e6)),m())},"another"),v=y("div",{class:"dials"},y("label",{},"Rooms a side: ",i,h),y("label",{},"Seed: ",c,b),y("label",{},l," spheres, as on 20 May (unticked: 13 May)"));return t.replaceChildren(y("div",{class:"maze-app"},o,r,y("div",{class:"row"},d,u),v)),m(),w}const Cp=()=>{const t=Fl(qt.size,qt.size,qt.seed);return`<div class="maze-app"><div class="figure">${Dl(t)}</div><p class="status">${Bl(t)}</p></div>`},jp={name:"maze",apps:{maze:Op},stills:{maze:Cp}};function Lp(t,e){let n=Array.from({length:e.length+1},(s,a)=>a);for(let s=1;s<=t.length;s+=1){const a=[s];for(let o=1;o<=e.length;o+=1){const r=(n[o-1]??0)+(t[s-1]===e[o-1]?0:1);a[o]=Math.min(r,(n[o]??0)+1,(a[o-1]??0)+1)}n=a}return n[e.length]??0}function Np(t,e){if(e.includes(t))return t;let n=null,s=1/0;for(const a of e){const o=Lp(t,a);o<s&&([n,s]=[a,o])}return n}const Pp=/[\p{L}\p{M}\p{N}']+|[.,!?;:]/gu,Rp=/\]\([^)]*\)|^---[\s\S]*?\n---|[#*_`>\[\]|]|::[a-z-]+/gm;function Ds(t){return t.normalize("NFKC").replace(Rp," ").toLowerCase().match(Pp)??[]}const cs=" ";class uo{constructor(e,n){this.memory=n;const s=Ds(e),a=new Map;for(const o of s)a.set(o,(a.get(o)??0)+1);this.vocabulary=[...a.keys()],this.commonest=[...a].reduce((o,r)=>o&&o[1]>=r[1]?o:r,null)?.[0]??null;for(let o=1;o<s.length;o+=1)for(let r=1;r<=n&&r<=o;r+=1){const i=s.slice(o-r,o).join(cs),h=this.followers.get(i)??new Map;h.set(s[o]??"",(h.get(s[o]??"")??0)+1),this.followers.set(i,h)}}memory;vocabulary;commonest;followers=new Map;after(e){for(let n=Math.min(this.memory,e.length);n>=1;n-=1){const s=e.slice(-n),a=this.followers.get(s.join(cs));if(a)return{context:s,candidates:Ti(a)}}return{context:[],candidates:[]}}transitions(){return[...this.followers].filter(([e])=>e.split(cs).length===this.memory).flatMap(([e,n])=>Ti(n).map(s=>({context:e.split(cs),...s}))).sort((e,n)=>n.probability-e.probability||n.count-e.count)}}function Ti(t){const e=[...t.values()].reduce((n,s)=>n+s,0);return[...t].map(([n,s])=>({word:n,count:s,probability:s/e})).sort((n,s)=>s.count-n.count)}function Bp(t,e){let n=e();for(const s of t)if(n-=s.probability,n<=0)return s.word;return t[t.length-1]?.word??null}function Si(t){return t.reduce((e,n)=>e===""||/^[.,!?;:]$/.test(n)?e+n:`${e} ${n}`,"")}function Hl(t,e){if(e<=0)return t.map((a,o)=>({...a,probability:o===0?1:0}));const n=t.map(a=>a.probability**(1/e)),s=n.reduce((a,o)=>a+o,0);return t.map((a,o)=>({...a,probability:(n[o]??0)/s}))}const Ia=40,Mi=8,Ea=t=>`${Math.round(t*100)}%`;function Wl(t,e,n){const{context:s,candidates:a}=t.after(e),o=a.slice(0,Mi),r=Hl(a,n).slice(0,Mi),i=a.reduce((p,{count:w})=>p+w,0),h=e.slice(0,e.length-s.length),c=`<p class="written">${$(Si(h))}${h.length&&s.length?" ":""}${s.length?`<mark>${$(Si(s))}</mark>`:""}<span class="caret"></span></p>`,l=o.length?`<ol class="offered">${o.map(({word:p,count:w,probability:g},b)=>{const v=r[b]?.probability??0;return`<li><button type="button" data-word="${$(p)}" title="seen ${w} of ${i} times: ${Ea(g)} as learnt"><span class="word">${$(p)}</span><span class="chance" style="--p:${v.toFixed(3)}"></span><span class="figure">${Ea(v)}</span></button></li>`}).join("")}</ol>`:`<p class="offered">It never saw anything follow “${$(e[e.length-1]??"")}”. This is where it stops.</p>`,d=p=>s.length===t.memory&&p.context.join(" ")===s.join(" "),u=t.transitions(),f=[...u.filter(d),...u.filter(p=>!d(p))].slice(0,Ia).map(p=>`<tr${d(p)?' class="now"':""}><td>${$(p.context.join(" "))}</td><td>${$(p.word)}</td><td>${p.count}</td><td>${Ea(p.probability)}</td></tr>`).join(""),m=`<table class="learnt"><caption>What it learnt: ${u.length} transitions between ${t.vocabulary.length} words${u.length>Ia?`, the first ${Ia} shown`:""}</caption><thead><tr><th>after</th><th>comes</th><th>seen</th><th>chance</th></tr></thead><tbody>${f}</tbody></table>`;return`<div class="next-word">${c}<h4>What may come next</h4>${l}${m}</div>`}const Ts="The cat is happy. The dog is glad. The cat sleeps. The dog plays. The cat eats. The dog runs. The car is fast. The car goes far.",Fp=350;function Dp(t,{site:e}){const n={small:()=>Ts,site:()=>e.pages.map(x=>x.body).join(`

`),own:()=>l.value};let s=new uo(Ts,1),a=Ds("the"),o=null;const r=y("div"),i=(x,I)=>y("option",{value:x},I),h=y("select",{onchange:()=>g()},i("small","eight short sentences"),i("site","this website"),i("own","your own text")),c=y("select",{onchange:()=>g()},i(1,"one word back"),i(2,"two words back"),i(3,"three words back")),l=y("textarea",{rows:5,hidden:!0,placeholder:"Paste any text here. The longer, the better it pretends.",oninput:()=>g()}),d=y("output",{},"1"),u=y("input",{type:"range",min:0,max:2,step:.1,value:1,oninput:()=>p()}),f=y("input",{type:"text",value:"the",onchange:()=>w()}),m=y("button",{type:"button",onclick:()=>o?k():v()},"write");function p(){d.textContent=u.value,r.innerHTML=Wl(s,a,Number(u.value))}function w(){k();const x=Ds(f.value).flatMap(I=>Np(I,s.vocabulary)??[]);a=x.length?x:s.commonest?[s.commonest]:[],p()}function g(){l.hidden=h.value!=="own",s=new uo(n[h.value]?.()??Ts,Number(c.value)),w()}function b(){const x=Bp(Hl(s.after(a).candidates,Number(u.value)),Math.random);return x===null?!1:(a=[...a,x],p(),!0)}function v(){m.textContent="stop",o=setInterval(()=>{b()||k()},Fp)}function k(){o&&clearInterval(o),o=null,m.textContent="write"}r.addEventListener("click",x=>{const I=x.target?.closest("[data-word]")?.getAttribute("data-word");I&&(a=[...a,I],p())});const S=y("div",{class:"dials"},y("label",{},"It has read",h),y("label",{},"It looks",c),y("label",{},"Temperature: ",d,u),y("label",{},"Start from",f)),M=y("div",{class:"row"},y("button",{type:"button",onclick:()=>{b()}},"next word"),m,y("button",{type:"button",onclick:()=>w()},"start over"));return t.replaceChildren(S,l,M,r),p(),k}const Hp=()=>Wl(new uo(Ts,1),Ds("the"),1),Wp={name:"next-word",apps:{"next-word":Dp},stills:{"next-word":Hp}},Oa={"string-cache-map":"a WeakMap replacement for string keys, with a bounded cache behind it","async-barrier":"a helper that makes async/await tests say what they wait for","spy-middleware":"a Redux middleware for spying on actions in tests","grunt-frontmatter":"a Grunt task: many files with YAML front matter into one JSON","object-canonical-keys":"always the same array of keys for the same keys, so comparisons stay cheap","async-deferrer":"one function that returns a promise, or resolves it"},Ai=160,Ca=28,Ss=t=>t.toLocaleString("en-US");function ja(t,e){const n=Math.max(1,...t.map(e)),s=Ai/t.length,a=t.map((o,r)=>{const i=e(o)/n*(Ca-2);return`<rect x="${(r*s+1).toFixed(1)}" y="${(Ca-i).toFixed(1)}" width="${(s-2).toFixed(1)}" height="${i.toFixed(1)}"><title>${o}: ${Ss(e(o))}</title></rect>`}).join("");return`<svg class="spark" viewBox="0 0 ${Ai} ${Ca}" role="img" aria-label="Downloads a year, ${t[0]} to ${t[t.length-1]}">${a}</svg>`}function ql(t){const e=Object.keys(t.years).sort(),n=l=>d=>t.years[d]?.[l]??0,s=l=>e.reduce((d,u)=>d+l(u),0),a=Object.keys(Oa).sort((l,d)=>s(n(d))-s(n(l))),o=[...new Set(e.flatMap(l=>Object.keys(t.years[l]??{})))].filter(l=>!(l in Oa)),r=l=>o.reduce((d,u)=>d+n(u)(l),0),i=l=>Object.values(t.years[l]??{}).reduce((d,u)=>d+u,0),h=a.filter(l=>s(n(l))>0).map(l=>`<tr><th scope="row"><a href="https://www.npmjs.com/package/${l}"><code>${l}</code></a><span>${Oa[l]}</span></th><td>${ja(e,n(l))}</td><td>${Ss(s(n(l)))}</td></tr>`).join(""),c=o.length?`<tr><th scope="row">the other ${o.length}<span>mostly AngularJS and Redux helpers written for one project each</span></th><td>${ja(e,r)}</td><td>${Ss(s(r))}</td></tr>`:"";return`<figure class="packages"><table class="packages"><thead><tr><th>package</th><th>${e[0]} to ${e[e.length-1]}, a bar a year</th><th>downloads</th></tr></thead><tbody>${h}${c}</tbody><tfoot><tr><th scope="row">all of them</th><td>${ja(e,i)}</td><td>${Ss(s(i))}</td></tr></tfoot></table></figure>`}function qp(t){if(t.querySelector("figure"))return;const e=Fo(t,"/data/npm/index.json");fetch("/data/npm/downloads.json").then(n=>n.json()).then(n=>{t.innerHTML=ql(n),t.append(e)}).catch(()=>{t.textContent="The download counts did not arrive. The rest of the page does not depend on them."})}const La=["string-cache-map","async-barrier","spy-middleware","grunt-frontmatter","object-canonical-keys","gherkin-genie","async-deferrer","egg-hatchery","angular-tags","class-strict","micro-egg-hatchery","node-dio","ducks-middleware","drpx-updateable","generator-drpx","grunt-ngtags","teal-redux-egg","ducks-reducer","drpx-storage-mocks","strict-classes","ngtags","redux-egg","esmoquin","drpx-storage","dio-provider","drpx-components","grunt-angular-tags","drpx-bind-angular","drpx-toggle","drpx-id","drpx-seo","drpx-otherwisehome","drpx-class-route","drpx-transcludeto"],Na="downloads.json",zp={name:"npm",directory:"public/data/npm",firstYear:2015,files:[Na],about:{measures:"downloads a year of the npm packages published as drpicox",attribution:"npm, Inc. Download counts of the public registry.",dataset:"https://github.com/npm/registry/blob/main/docs/download-counts.md",packages:La},requestsFor(t){return[`https://api.npmjs.org/downloads/point/${t}-01-01:${t}-12-31/${La.join(",")}`]},withYear(t,e,n){const s=n[0],a=Object.entries(typeof s=="object"&&s!==null?s:{}).flatMap(([o,r])=>{const i=r?.downloads;return La.includes(o)&&typeof i=="number"&&i>0?[[o,i]]:[]});if(a.length===0)throw new Error("the registry did not answer with downloads");return{[Na]:{years:{...t[Na]?.years,[e]:Object.fromEntries(a)}}}}},_p=t=>ql(JSON.parse(t("/data/npm/downloads.json")))+Ks(JSON.parse(t("/data/npm/index.json"))),Gp={name:"packages",apps:{packages:qp},stills:{packages:_p},sources:[zp]},Yp={name:"portfolio",flags:[{name:"portfolio",description:"the lists with pictures as cards, the width of a program",trial:.5}]},Up=/^\s*\* (.*)$/,Jp=/^#{1,6} /;function Kp(t){let e="";const n=[],s={s:0,n:0},a=i=>e+=e===""?i.toLowerCase():i[0].toUpperCase()+i.slice(1).toLowerCase(),o=(i,h)=>{s[h]+=1;const c=/shouldBe/i.test(e)&&!n.some(l=>l.name==="expected");n.push({value:i,name:c?"expected":`${h}${s[h]}`})},r=t.matchAll(/([A-Za-z]+)|("[^"]+")|(\d+)/g);for(const[,i,h,c]of r)i?a(i):h?(o(h,"s"),a("S")):c&&(o(c,"n"),a("N"));return{name:e,args:n}}const Vp=["there","is","are","has","have","need","needs"],rn=(t,e)=>new RegExp(`\\b${e}\\b`,"i").test(t);function Xp(t,e){if(t.length===0)return[{line:e,message:'does not have any executable instruction by tests. Post lines that run must begin with " * ".'}];if(!t.some(a=>/should/i.test(a.name)))return[{line:t[t.length-1].line,message:'does not have any executable instruction that contains "should": at least one line must test that the outcome is the expected.'}];for(const a of t){const o=Vp.find(r=>rn(a.text,r));if(o&&!rn(a.text,"given")&&!rn(a.text,"should"))return[{line:a.line,message:`has an instruction with the word "${o}" but no "should" or "given". Add "given" if it sets up, or "should" if it checks a result.`}]}const n=t.find(a=>rn(a.text,"given")&&rn(a.text,"should"));if(n)return[{line:n.line,message:'has an instruction with the word "given" and "should" at the same time. Keep "given" for a setup, "should" for an assertion.'}];if(t.some(a=>a.name===""))return[{line:t.find(a=>a.name==="").line,message:"has an instruction with no words in it."}];const s=t[t.length-1];return/should/i.test(s.name)?[]:[{line:s.line,message:'the last instruction must contain "should": a post ends by checking what it set out to show.'}]}function Zp(t){const[e="",...n]=t.replace(/\.md$/,"").split("_");return`Post_${e.replace(/-/g,"")}_${n.map(s=>s[0].toUpperCase()+s.slice(1)).join("")}_Context`}function zl(t,e){const n=t.replace(/^---[\s\S]*?\n---\n/,f=>f.replace(/[^\n]/g,"")).split(`
`),s=n.find(f=>/^# /.test(f))?.slice(2).trim()??e,a=Zp(e),o=[],r=[];n.forEach((f,m)=>{const p=Up.exec(f);if(p){const{name:w,args:g}=Kp(p[1]??""),b=`${w}(${g.map(v=>v.value).join(", ")})`;o.push({line:m+1,text:f.trim(),name:w,args:g,call:b}),r.push(`  await context.${b};	// ${f.trim()}`)}else Jp.test(f)&&r.push("",`  // ${f.trim()}`)});const i=Math.max(0,...r.map(f=>f.indexOf("	"))),h=r.map(f=>f.includes("	")?f.replace("	"," ".repeat(i-f.indexOf("	")+1)):f),c=["// !!! IMPORTANT !!!","// This test file is AUTOGENERATED by yarn create-tests","// DO NOT MODIFY manually.","",`test("${e}", async () => {`,`  const context = new ${a}();`,"  await context.beforeTest();",...h,"","  await context.afterTest();","});",""].join(`
`),l=new Set,d=o.filter(f=>!l.has(f.name)&&l.add(f.name)),u=[`export class ${a} {`,"  async beforeTest() {}","",...d.flatMap(f=>[`  async ${f.name}(${f.args.map(m=>m.name).join(", ")}) {`,"    // TODO","  }",""]),"  async afterTest() {}","}",""].join(`
`);return{title:s,className:a,steps:o,test:c,context:u,problems:Xp(o,n.length)}}const $n=[{file:"2022-07-15_hello_blog.md",label:"Hello Blog — the first post of the course",markdown:`---
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
`}],Vs=t=>new Set(t.split(/\s+/).filter(Boolean)),Qp=Vs(`
  var let const function return if else for while do break continue new this
  true false null undefined class extends import export from default async await
  throw try catch finally typeof instanceof in of switch case delete void yield`),eg=Vs(`
  auto break case char const continue default do double else enum extern float for goto if
  inline int long register restrict return short signed sizeof static struct switch typedef
  union unsigned void volatile while NULL true false`),tg=Vs(`
  abstract assert boolean break byte case catch char class const continue default do double
  else enum extends final finally float for goto if implements import instanceof int interface
  long native new package private protected public return short static strictfp super switch
  synchronized this throw throws transient try var void volatile while true false null`),ng=Vs(`
  AND AS CASE CLS CONST DECLARE DEFDBL DIM DO DOUBLE ELSE END EXIT FOR FUNCTION IF IS
  LOCATE LOOP NEXT NOT OR PRINT RANDOMIZE SCREEN SELECT SHARED STATIC STEP SUB THEN TO
  UNTIL WHILE OPTION BASE`);function X(t,e){return`<span class="hl-${t}">${$(e)}</span>`}function qo(t,e,n){for(let s=e+1;s<t.length;s+=1)if(t[s]==="\\")s+=1;else if(t[s]===n)return s+1;return t.length}function Pa(t,e,n){let s="",a=0;for(;a<t.length;){const o=t.slice(a);let r;const i=t.lastIndexOf(`
`,a-1)+1,h=/^\s*$/.test(t.slice(i,a));if(o.startsWith("//")||n&&o[0]==="#"&&h){const c=t.indexOf(`
`,a),l=c<0?t.length:c;s+=X(o[0]==="#"?"a":"c",t.slice(a,l)),a=l}else if(o.startsWith("/*")){const c=t.indexOf("*/",a+2),l=c<0?t.length:c+2;s+=X("c",t.slice(a,l)),a=l}else if(o[0]==='"'||o[0]==="'"||o[0]==="`"){const c=qo(t,a,o[0]??"");s+=X("s",t.slice(a,c)),a=c}else if(r=/^[A-Za-z_$][\w$]*/.exec(o)){const c=r[0];s+=e.has(c)?X("k",c):$(c),a+=c.length}else(r=/^\d+(?:\.\d+)?/.exec(o))?(s+=X("n",r[0]),a+=r[0].length):(s+=$(o[0]??""),a+=1)}return s}function sg(t){let e="",n=0;for(;n<t.length;){const s=t.slice(n);let a;if(s.startsWith("%")){const o=t.indexOf(`
`,n),r=o<0?t.length:o;e+=X("c",t.slice(n,r)),n=r}else if(s.startsWith("/*")){const o=t.indexOf("*/",n+2),r=o<0?t.length:o+2;e+=X("c",t.slice(n,r)),n=r}else if(s[0]==="'"){const o=qo(t,n,"'");e+=X("s",t.slice(n,o)),n=o}else if(s.startsWith("-->")||s.startsWith(":-")){const o=s.startsWith("-->")?"-->":":-";e+=X("k",o),n+=o.length}else(a=/^[A-Z_][\w]*/.exec(s))?(e+=X("a",a[0]),n+=a[0].length):(a=/^[a-z][\w]*/.exec(s))?(e+=$(a[0]),n+=a[0].length):(e+=$(s[0]??""),n+=1)}return e}function ag(t){let e="",n=0;for(;n<t.length;){const s=t.slice(n);let a;if(s[0]==="'"||/^REM\b/i.test(s)){const o=t.indexOf(`
`,n),r=o<0?t.length:o;e+=X("c",t.slice(n,r)),n=r}else if(s[0]==='"'){const o=t.indexOf('"',n+1),r=o<0?t.length:o+1;e+=X("s",t.slice(n,r)),n=r}else(a=/^[A-Za-z_][\w]*[$!#%&]?/.exec(s))?(e+=ng.has(a[0].toUpperCase())?X("k",a[0]):$(a[0]),n+=a[0].length):(a=/^\d+(?:\.\d+)?/.exec(s))?(e+=X("n",a[0]),n+=a[0].length):(e+=$(s[0]??""),n+=1)}return e}function og(t){let e="",n=0;for(;n<t.length;){const s=t.slice(n);if(s.startsWith("<!--")){const o=t.indexOf("-->",n+4),r=o<0?t.length:o+3;e+=X("c",t.slice(n,r)),n=r;continue}const a=/^<(\/?)([A-Za-z][\w-]*)/.exec(s);if(!a){const o=t.indexOf("<",n+1),r=o<0?t.length:o;e+=$(t.slice(n,r)),n=r;continue}for(e+=`&lt;${a[1]}${X("t",a[2]??"")}`,n+=a[0].length;n<t.length&&t[n]!==">";){const o=t.slice(n);let r;if(r=/^\s+/.exec(o))e+=r[0],n+=r[0].length;else if(r=/^[A-Za-z_:][\w:.-]*/.exec(o))e+=X("a",r[0]),n+=r[0].length;else if(o[0]==="="&&(o[1]==='"'||o[1]==="'")){const i=qo(t,n+1,o[1]??"");e+=`=${X("s",t.slice(n+1,i))}`,n=i}else e+=$(o[0]??""),n+=1}t[n]===">"&&(e+="&gt;",n+=1)}return e}const rg=/^(\s*)(Feature:|Background:|Scenario Outline:|Scenario:|Example:|Examples:|Rule:|Given|When|Then|And|But|\*)(?=\s|$)/;function ig(t){return t.split(`
`).map(e=>{const n=e.trimStart(),s=e.slice(0,e.length-n.length);if(n.startsWith("#"))return s+X("c",n);if(n.startsWith("@"))return s+X("a",n);const a=rg.exec(e),o=a?s+X("k",a[2]??""):"",r=a?e.slice(a[0].length):e;return a?o+r.split(/("[^"]*"|\b\d+(?:\.\d+)?\b)/).map(i=>/^"/.test(i)?X("s",i):/^\d/.test(i)?X("n",i):$(i)).join(""):$(e)}).join(`
`)}function we(t,e){return e==="js"||e==="javascript"?Pa(t,Qp,!1):e==="c"?Pa(t,eg,!0):e==="java"?Pa(t,tg,!1):e==="prolog"?sg(t):e==="html"?og(t):e==="basic"?ag(t):e==="gherkin"||e==="feature"?ig(t):$(t)}function _l(t,e){return`<div class="compiled">${t.problems.length?`<div class="refused"><strong>${$(e)}</strong> line ${t.problems[0].line}: ${$(t.problems[0].message)}<br>The tests are not written until the post is fixed.</div>`:""}<h4>${$(e.replace(/\.md$/,""))} → the test, never edited by hand</h4><pre><code>${we(t.test,"js")}</code></pre><h4>→ the context, written once and filled in by the coder</h4><pre><code>${we(t.context,"js")}</code></pre></div>`}function hg(t){const e=y("div"),n=y("textarea",{class:"post",spellcheck:!1,rows:28,oninput:()=>r()}),s=y("input",{type:"text",value:$n[0].file,oninput:()=>r()}),a=y("select",{onchange:()=>o(Number(a.value))},...$n.map((i,h)=>y("option",{value:h},i.label)));function o(i){const h=$n[i]??$n[0];n.value=h.markdown,s.value=h.file,r()}function r(){e.innerHTML=_l(zl(n.value,s.value),s.value)}t.replaceChildren(y("div",{class:"row"},y("label",{},"Post ",a),y("label",{},"File ",s)),y("div",{class:"post-tests"},n,e)),o(0)}const lg=()=>{const t=$n[0];return`<div class="post-tests"><pre class="post">${t.markdown.replace(/&/g,"&amp;").replace(/</g,"&lt;")}</pre>${_l(zl(t.markdown,t.file),t.file)}</div>`},cg={name:"post-tests",apps:{"post-tests":hg},stills:{"post-tests":lg}},mo="program-asked";function fo(t,e){t.dispatchEvent(new CustomEvent(mo,{detail:e}))}function zt(t){return t.toLowerCase().replace(/\s+/g,"-")}const Ra=t=>typeof t=="string"?zt(t):String(Number(t.toPrecision(4)));function dg(t,e){const n=t.parameters.flatMap(s=>{const a=e[s.name];return a===void 0||Ra(a)===Ra(s.initial)?[]:[`--${s.name} ${Ra(a)}`]});return[t.name,...n].join(" ")}function Gl(t){return Object.fromEntries(t.parameters.map(e=>[e.name,e.initial]))}function ug(t){return t.scale!=="log"?{min:t.min,max:t.max,step:t.step,positionOf:e=>e,valueAt:e=>e}:{min:Math.log10(t.min),max:Math.log10(t.max),step:t.step,positionOf:e=>Math.log10(e),valueAt:e=>10**e}}const po="program-ran";function mg(t,e){const n=ug(t),s=t.show??String,a=y("output"),o=y("input",{type:"range",name:t.name,min:n.min,max:n.max,step:n.step});return o.addEventListener("input",()=>e(n.valueAt(Number(o.value)))),{label:y("label",{},`${t.label}: `,a,o),settle:r=>{o.value=String(n.positionOf(Number(r))),a.textContent=s(Number(r))}}}function fg(t,e){const n=y("select",{name:t.name},...t.choices.map(s=>y("option",{value:s},s)));return n.addEventListener("change",()=>e(n.value)),{label:y("label",{},`${t.label} `,n),settle:s=>{n.value=String(s)}}}function Yl(t){return e=>{let n=Gl(t);const s=e.dataset.dials?.split(" "),a=s!==void 0&&t.glance!==void 0,o=y("code"),r=y("div",{class:a?"program-figure glance":"program-figure"}),i=d=>u=>{n={...n,[d]:u},c()},h=t.parameters.filter(d=>!s||s.includes(d.name)).map(d=>({name:d.name,dial:"choices"in d?fg(d,i(d.name)):mg(d,i(d.name))}));function c(){for(const{name:d,dial:u}of h)u.settle(n[d]??"");o.textContent=`$ ${dg(t,n)}`,r.innerHTML=a?t.glance?.(n)??"":t.run(n).html,e.dispatchEvent(new CustomEvent(po,{detail:n}))}const l=d=>{n={...n,...d.detail},c()};return e.addEventListener(mo,l),e.replaceChildren(y("div",{class:"dials"},...h.map(({dial:d})=>d.label)),y("p",{class:"program-line"},o),r),c(),()=>e.removeEventListener(mo,l)}}const ds=149597870700,Nt=94607e11,Nn=[{name:"the Moon",metres:3844e5,said:"384,400 km"},{name:"Mars",metres:.52*ds,said:"0.52 au"},{name:"Jupiter",metres:4.2*ds,said:"4.2 au"},{name:"Saturn",metres:8.5*ds,said:"8.5 au"},{name:"Pluto",metres:38.5*ds,said:"38.5 au"},{name:"Proxima Centauri",metres:4.24*Nt,said:"4.24 light-years"},{name:"Sirius",metres:8.58*Nt,said:"8.58 light-years"},{name:"Epsilon Eridani",metres:10.52*Nt,said:"10.52 light-years"},{name:"Tau Ceti",metres:11.91*Nt,said:"11.91 light-years"},{name:"the centre of the galaxy",metres:26e3*Nt,said:"26,000 light-years",towards:{ra:17.76,dec:-29}},{name:"Andromeda",metres:25e5*Nt,said:"2.5 million light-years",towards:{ra:.712,dec:41.27}}],Mn={dryMass:25e3,fuel:5e3,exhaust:.72},pg=299792458;function zo(t){if(t<.01)return`${Math.round(t*pg/1e3).toLocaleString("en-US")} km/s`;if(t<.99)return`${(t*100).toPrecision(2)}% of c`;const e=Math.min(12,Math.ceil(-Math.log10(1-t)));return`${(Math.floor(t*10**e)/10**(e-2)).toFixed(e-2)}% of c`}const gg=[[365.25*86400*1e6,"million years"],[365.25*86400,"years"],[86400,"days"],[3600,"hours"],[60,"minutes"],[1,"seconds"]];function Xe(t){const[e,n]=gg.find(([o])=>t>=o)??[1,"seconds"],s=t/e;return`${s>=10?Math.round(s).toLocaleString("en-US"):String(Math.round(s*10)/10)} ${n}`}const wg=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:3});function Hs(t){return t>=1e6?`${wg.format(t)} t`:`${t>=100?Math.round(t).toLocaleString("en-US"):t.toPrecision(2)} t`}const Se=299792458,yg=9.81;function _o(t,e){const n=e.acceleration*yg,s=e.dryMass+e.fuel,a=e.exhaust*Se,o=Se/n*Math.acosh(1+n*t/(2*Se*Se)),r=s*(1-Math.exp(-2*n*o/a)),i=r>e.fuel,h=i?a/(2*n)*Math.log(s/e.dryMass):o,c=Math.tanh(n*h/Se),l=Se/n*Math.sinh(n*h/Se),d=Se*Se/n*(Math.cosh(n*h/Se)-1),u=Math.max(0,t-2*d),f=i?u/(c*Se):0,m=f*Math.sqrt(1-c*c);return{shipTime:2*h+m,homeTime:2*l+f,burnTime:h,coastTime:m,topSpeed:c,fuelBurnt:i?e.fuel:r,coasts:i}}const bg=299792458,vg=9.81,hn=720,us=170,pe={top:12,right:10,bottom:24,left:40};function kg(t,e){const n=hn-pe.left-pe.right,s=us-pe.top-pe.bottom,a=u=>pe.left+u/t.shipTime*n,o=u=>pe.top+s-u/Math.max(t.topSpeed,1e-12)*s,r=e.acceleration*vg,i=24,h=Array.from({length:i+1},(u,f)=>t.burnTime*f/i).map(u=>[u,Math.tanh(r*u/bg)]),l=[...h.map(([u,f])=>[u,f]),...h.reverse().map(([u,f])=>[t.shipTime-u,f])].map(([u,f])=>`${a(u).toFixed(1)},${o(f).toFixed(1)}`).join(" "),d=t.coasts?`<text x="${((a(t.burnTime)+a(t.shipTime-t.burnTime))/2).toFixed(1)}" y="${(o(t.topSpeed)+14).toFixed(1)}" text-anchor="middle">engine off, ${Xe(t.coastTime)}</text>`:"";return`<svg class="trip" viewBox="0 0 ${hn} ${us}" role="img" aria-label="Speed against the ship's clock"><line class="grid" x1="${pe.left}" x2="${hn-pe.right}" y1="${o(0)}" y2="${o(0)}"/><line class="grid" x1="${pe.left}" x2="${hn-pe.right}" y1="${o(t.topSpeed)}" y2="${o(t.topSpeed)}"/><text x="${pe.left}" y="${o(t.topSpeed)-3}">${zo(t.topSpeed)}</text><polyline class="line" points="${l}"/>${d}<text x="${pe.left}" y="${us-6}">departure</text><text x="${hn-pe.right}" y="${us-6}" text-anchor="end">arrival, ${Xe(t.shipTime)} on board</text></svg>`}function $g(t,e){const n=Nn.map(o=>({destination:o,trip:_o(o.metres,t)})),s=n.map(({destination:o,trip:r})=>{const i=[o.name===e?"chosen":"",r.coasts?"coasts":""].filter(Boolean).join(" "),h=r.coasts?`all ${Hs(t.fuel)}, then coasts`:Hs(r.fuelBurnt);return`<tr${i?` class="${i}"`:""} data-destination="${o.name}"><th scope="row">${o.name}</th><td>${o.said}</td><td>${Xe(r.shipTime)}</td><td>${Xe(r.homeTime)}</td><td>${zo(r.topSpeed)}</td><td>${h}</td></tr>`}).join(""),a=n.find(({destination:o})=>o.name===e)??n[0];return`<figure class="rocket"><table class="voyages"><thead><tr><th>to</th><th>distance</th><th>on board</th><th>at home</th><th>top speed</th><th>fuel burnt</th></tr></thead><tbody>${s}</tbody></table>`+(a?`<h4>To ${a.destination.name}: speed against the ship's clock</h4>${kg(a.trip,t)}`:"")+"</figure>"}function Ul(t){return{dryMass:Mn.dryMass,fuel:Number(t.fuel)*Mn.dryMass,exhaust:Number(t.exhaust)/100,acceleration:Number(t.acceleration)}}const Ii=365.25*86400,xg=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:2}),go={name:"rocket",summary:"a relativistic rocket: how long a trip takes on board and at home, and what it burns",parameters:[{name:"acceleration",label:"Acceleration",description:"what the crew feels while the engine burns, in g",min:.05,max:3,step:.05,initial:.3,show:t=>`${t.toFixed(2)} g`},{name:"fuel",label:"Fuel",description:"fuel on board, as a multiple of the ship's own mass",min:.1,max:1e13,step:.05,initial:Mn.fuel/Mn.dryMass,scale:"log",show:t=>`${xg.format(t)} × the ship`},{name:"exhaust",label:"Exhaust speed",description:"the speed of what leaves the engine, in percent of the speed of light",min:1,max:100,step:1,initial:Mn.exhaust*100,show:t=>`${Math.round(t)}% of c`},{name:"to",label:"To",description:"where to fly",choices:Nn.map(t=>t.name),initial:"Proxima Centauri"}],run(t){const e=Ul(t),n=String(t.to),s=Nn.map(h=>({destination:h,trip:_o(h.metres,e)})),a=s.find(({destination:h})=>h.name===n)??s[0],{destination:o,trip:r}=a,i=r.coasts?`all ${Hs(e.fuel)} of fuel, then coasts`:`${Hs(r.fuelBurnt)} of fuel`;return{text:`to ${o.name}, ${o.said}: ${Xe(r.shipTime)} on board, ${Xe(r.homeTime)} at home, top speed ${zo(r.topSpeed)}, ${i}`,html:$g(e,n),data:{ship:{dryMassTonnes:e.dryMass,fuelTonnes:e.fuel,exhaust:e.exhaust,accelerationG:e.acceleration},trips:s.map(({destination:h,trip:c})=>({to:h.name,distance:h.said,onBoardYears:c.shipTime/Ii,atHomeYears:c.homeTime/Ii,topSpeed:c.topSpeed,fuelBurntTonnes:c.fuelBurnt,coasts:c.coasts}))}}}},ms=[{name:"Proxima Centauri",ra:14.495,dec:-62.68,lightYears:4.24},{name:"Alpha Centauri",ra:14.66,dec:-60.83,lightYears:4.37},{name:"Barnard's Star",ra:17.963,dec:4.69,lightYears:5.96},{name:"Wolf 359",ra:10.941,dec:7.01,lightYears:7.86},{name:"Lalande 21185",ra:11.056,dec:35.97,lightYears:8.31},{name:"Sirius",ra:6.752,dec:-16.72,lightYears:8.58},{name:"Luyten 726-8",ra:1.65,dec:-17.95,lightYears:8.73},{name:"Ross 154",ra:18.83,dec:-23.84,lightYears:9.69},{name:"Ross 248",ra:23.699,dec:44.18,lightYears:10.3},{name:"Epsilon Eridani",ra:3.549,dec:-9.46,lightYears:10.52},{name:"Lacaille 9352",ra:23.098,dec:-35.85,lightYears:10.72},{name:"Ross 128",ra:11.796,dec:.8,lightYears:11.01},{name:"EZ Aquarii",ra:22.643,dec:-15.3,lightYears:11.1},{name:"61 Cygni",ra:21.115,dec:38.75,lightYears:11.4},{name:"Procyon",ra:7.655,dec:5.22,lightYears:11.46},{name:"Struve 2398",ra:18.713,dec:59.63,lightYears:11.5},{name:"Groombridge 34",ra:.306,dec:44.02,lightYears:11.6},{name:"Epsilon Indi",ra:22.056,dec:-56.78,lightYears:11.87},{name:"Tau Ceti",ra:1.734,dec:-15.94,lightYears:11.91}];function fs(t,e){const n=e.radius/e.reach;return t.map(({name:s,ra:a,dec:o,lightYears:r})=>{const i=a/24*2*Math.PI,h=o/180*Math.PI,c=r*Math.cos(h)*Math.cos(i),l=r*Math.cos(h)*Math.sin(i),d=r*Math.sin(h),u=l*Math.cos(e.yaw)-c*Math.sin(e.yaw),f=c*Math.cos(e.yaw)+l*Math.sin(e.yaw),m=d*Math.cos(e.pitch)-f*Math.sin(e.pitch),p=f*Math.cos(e.pitch)+d*Math.sin(e.pitch);return{name:s,x:u*n,y:-m*n,depth:p}})}const lt=299792458,Tg=9.81;function Sg(t,e,n){const s=e.acceleration*Tg,a=d=>({distance:lt*lt/s*(Math.cosh(s*d/lt)-1),homeTime:lt/s*Math.sinh(s*d/lt),speed:Math.tanh(s*d/lt)}),o=a(t.burnTime),r=t.homeTime-2*o.homeTime,i=r*t.topSpeed*lt,h=2*o.distance+i,c=Math.max(0,Math.min(n,t.shipTime));if(c<=t.burnTime){const d=a(c);return{along:d.distance/h,homeTime:d.homeTime,speed:d.speed}}if(c<=t.burnTime+t.coastTime){const d=(c-t.burnTime)/t.coastTime;return{along:(o.distance+d*i)/h,homeTime:o.homeTime+d*r,speed:t.topSpeed}}const l=a(t.shipTime-c);return{along:1-l.distance/h,homeTime:t.homeTime-l.homeTime,speed:l.speed}}const ps=12.5,Ei=9,Oi=1.5,Mg=new Set(["Alpha Centauri"]),oe={ground:"#06080f",ring:"rgba(127,166,234,0.22)",stem:"rgba(127,166,234,0.18)",star:"#dfe7f5",dim:"#7d8aa3",sun:"#ffd98a",way:"#ff9d6e",ship:"#ffffff"};function Ag(t,e,n){const s=t.getContext("2d");if(!s)return()=>{};const a=s,o=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=new Set(Nn.map(({name:b})=>b));let i={yaw:.6,pitch:.45,radius:1,reach:ps},h=0,c=performance.now(),l=null,d=[];const u=()=>({x:t.clientWidth/2,y:t.clientHeight/2});function f(b){const v=t.clientWidth,k=t.clientHeight,S=window.devicePixelRatio||1;t.width!==Math.round(v*S)&&(t.width=Math.round(v*S),t.height=Math.round(k*S)),a.setTransform(S,0,0,S,0,0),a.fillStyle=oe.ground,a.fillRect(0,0,v,k),!o&&!l&&(i={...i,yaw:i.yaw+.0015}),i={...i,radius:Math.min(v,k)*.47};const M=u(),x=O=>({x:M.x+O.x,y:M.y+O.y});a.font="11px ui-monospace, Menlo, monospace";for(const O of[5,10]){const W=fs(Array.from({length:73},(q,G)=>({name:"",ra:G/72*24,dec:0,lightYears:O})),i);a.beginPath(),W.forEach((q,G)=>G?a.lineTo(x(q).x,x(q).y):a.moveTo(x(q).x,x(q).y)),a.strokeStyle=oe.ring,a.stroke();const _=x(W[0]??{x:0,y:0});a.fillStyle=oe.dim,a.fillText(`${O} ly`,_.x+4,_.y-3)}const{ship:I,chosen:L}=e(),P=Nn.find(({name:O})=>O===L),C=ms.find(({name:O})=>O===L),E=P?_o(P.metres,I):null;d=fs(ms,i);const N=fs(ms.map(O=>({...O,lightYears:O.lightYears*Math.cos(O.dec/180*Math.PI),dec:0})),i),A=d.map((O,W)=>W).sort((O,W)=>(d[O]?.depth??0)-(d[W]?.depth??0));for(const O of A){const W=x(d[O]??{x:0,y:0}),_=x(N[O]??{x:0,y:0}),q=d[O]?.name??"",G=((d[O]?.depth??0)+ps)/(2*ps);a.strokeStyle=oe.stem,a.beginPath(),a.moveTo(W.x,W.y),a.lineTo(_.x,_.y),a.stroke(),a.fillStyle=q===L?oe.way:oe.star,a.globalAlpha=.45+.55*G,a.beginPath(),a.arc(W.x,W.y,1.6+1.8*G,0,2*Math.PI),a.fill(),r.has(q)&&(a.strokeStyle=q===L?oe.way:oe.dim,a.beginPath(),a.arc(W.x,W.y,7,0,2*Math.PI),a.stroke()),a.fillStyle=q===L?oe.way:oe.dim,Mg.has(q)||a.fillText(q,W.x+10,W.y+4),a.globalAlpha=1}if(a.fillStyle=oe.sun,a.beginPath(),a.arc(M.x,M.y,4,0,2*Math.PI),a.fill(),a.fillText("the Sun",M.x+8,M.y-6),E&&P){const O=P.towards?fs([{name:"",...P.towards,lightYears:ps*1.15}],i)[0]:null,W=C?d[ms.indexOf(C)]:O,_=(b-c)/1e3%(Ei+2*Oi),q=o?.5:Math.min(1,Math.max(0,(_-Oi)/Ei)),G=Sg(E,I,q*E.shipTime);if(W){const te=x(W);a.strokeStyle=oe.way,a.setLineDash(C?[]:[4,4]),a.beginPath(),a.moveTo(M.x,M.y),a.lineTo(te.x,te.y),a.stroke(),a.setLineDash([]);const Qe={x:M.x+(te.x-M.x)*G.along,y:M.y+(te.y-M.y)*G.along};a.fillStyle=oe.ship,a.beginPath(),a.arc(Qe.x,Qe.y,3,0,2*Math.PI),a.fill(),C||a.fillText(`to ${P.name}, ${P.said}: not to scale`,12,k-34)}else a.fillStyle=oe.dim,a.fillText(`${P.name} is inside the dot: the planets are a thousandth of a light-year away`,12,k-34);a.fillStyle=oe.star,a.font="13px ui-monospace, Menlo, monospace",a.fillText(`on board ${Xe(q*E.shipTime)}`,12,22),a.fillText(`at home  ${Xe(G.homeTime)}`,12,40),a.fillStyle=oe.dim,a.fillText(`${(G.speed*100).toFixed(G.speed>.99?4:1)}% of c`,12,58),a.fillText("drag to turn",v-96,k-14)}h=o&&!l?0:requestAnimationFrame(f)}const m=b=>{const v=t.getBoundingClientRect();return{x:b.clientX-v.left,y:b.clientY-v.top}},p=b=>{l=m(b),t.setPointerCapture(b.pointerId),h||(h=requestAnimationFrame(f))},w=b=>{if(!l)return;const v=m(b);i={...i,yaw:i.yaw+(v.x-l.x)*.01,pitch:Math.max(-1.4,Math.min(1.4,i.pitch+(v.y-l.y)*.01))},l=v},g=b=>{const v=m(b),k=u(),S=d.find(M=>r.has(M.name)&&Math.hypot(k.x+M.x-v.x,k.y+M.y-v.y)<12);l=null,S&&(c=performance.now(),n(S.name))};return t.addEventListener("pointerdown",p),t.addEventListener("pointermove",w),t.addEventListener("pointerup",g),h=requestAnimationFrame(f),()=>{cancelAnimationFrame(h),t.removeEventListener("pointerdown",p),t.removeEventListener("pointermove",w),t.removeEventListener("pointerup",g)}}const Ig=(t,e)=>{let n=Gl(go);const s=h=>{n=h.detail};t.addEventListener(po,s);const a=Yl(go)(t,e),o=h=>{const c=h.target?.closest("[data-destination]")?.getAttribute("data-destination");c&&fo(t,{to:c})};t.addEventListener("click",o);const r=y("canvas",{class:"starmap","aria-label":"The stars within twelve light-years of the Sun, turning, with the ship flying the chosen trip"});t.prepend(r);const i=Ag(r,()=>({ship:Ul(n),chosen:String(n.to)}),h=>fo(t,{to:h}));return()=>{i(),a?.(),t.removeEventListener(po,s),t.removeEventListener("click",o)}},Eg={name:"rocket",programs:[go],apps:{rocket:Ig}},wo=["Go to the blog section,","You should see a list of posts,",'The last post title should be "Hello Blog", this post'];function Og(t){let e=0,n="";const s=[],a={},o=c=>{const l=c.exec(t.slice(e));return l&&(e+=l[0].length),l?.[0]},r=c=>{n+=n.length===0?c.toLowerCase():c[0]?.toUpperCase()+c.slice(1).toLowerCase()},i=(c,l,d)=>{const u=a[l]??1;a[l]=u+1;const f=/shouldBe/i.test(n)&&!s.some(m=>m.name==="expected");s.push({value:c,name:f?"expected":`${l}${u}`,type:d})};let h=-1;for(;e<t.length&&h!==e;){h=e,o(/^[^a-z0-9"]+/i);const c=o(/^[a-z]+/i);c&&r(c);const l=o(/^"[^"]+"/);l&&(i(l,"s","String"),r("S"));const d=o(/^[0-9]+/);d&&(i(d,"n","int"),r("N"))}return{name:n,arguments:s,text:t}}const gs=(t,e,n,s)=>`<div class="${s}"><h4>${$(t)}</h4><pre><code>${we(n,e)}</code></pre></div>`;function Ci(t){const e=t.map(s=>`context.${s.name}(${s.arguments.map(a=>a.value).join(", ")});`),n=Math.max(0,...e.map(s=>s.length));return e.map((s,a)=>`  ${s.padEnd(n)}  // ${t[a]?.text.trim()}`).join(`
`)}function ji(t){const e=new Set;return t.filter(n=>!e.has(n.name)&&e.add(n.name))}function Jl(t){const e=t.map(Og).filter(r=>r.name.length>0),n=`@Test
public void post() {
${Ci(e)}
}`,s=`test("post", () => {
${Ci(e)}
});`,a=ji(e).map(r=>`public void ${r.name}(${r.arguments.map(i=>`${i.type} ${i.name}`).join(", ")}) {
  // to write
}`).join(`

`),o=ji(e).map(r=>`${r.name}(${r.arguments.map(i=>i.name).join(", ")}) {
  // to write
}`).join(`

`);return'<div class="step-code">'+gs("The test, for the server","java",n,"step-test")+gs("The test, for the client","js",s,"step-test")+gs("What is left to write, in Java","java",a,"step-context")+gs("And in JavaScript","js",o,"step-context")+"</div>"}function Cg(t){const e=y("textarea",{class:"step-post",rows:6,spellcheck:!1,"aria-label":"A post, one step a line"});e.value=wo.map(a=>`* ${a}`).join(`
`);const n=y("div"),s=()=>{n.innerHTML=Jl(e.value.split(`
`).map(a=>a.replace(/^\s*[*-]\s*/,"")))};e.addEventListener("input",s),t.replaceChildren(e,n),s()}const jg=()=>`<pre class="step-post">${wo.map(t=>`* ${t}`).join(`
`)}</pre>${Jl(wo)}`,Lg={name:"step-names",apps:{"step-names":Cg},stills:{"step-names":jg}},xn='import Game from "./bowling";',le=`${xn}

let g;
beforeEach(() => (g = new Game()));`,Pt=(t,e,n="i++")=>`test("gutter game", () => {
${t?`  const g = new Game();
`:""}  for (let i = 0; i < 20; ${n})
    g.roll(0);
${e?`  expect(g.score()).toBe(0);
`:""}});`,ct=(t,e="i++")=>`test("all ones", () => {
${t?`  const g = new Game();
`:""}  for (let i = 0; i < 20; ${e})
    g.roll(1);
  expect(g.score()).toBe(20);
});`,Be=`test("gutter game", () => {
  rollMany(20, 0);
  expect(g.score()).toBe(0);
});`,Ge=`test("all ones", () => {
  rollMany(20, 1);
  expect(g.score()).toBe(20);
});`,Kl=`test("one spare", () => {
  g.roll(5);
  g.roll(5); // spare
  g.roll(3);
  rollMany(17, 0);
  expect(g.score()).toBe(16);
});`,Ng=Kl.split(`
`).map(t=>`// ${t}`).join(`
`),ln=`test("one spare", () => {
  rollSpare();
  g.roll(3);
  rollMany(17, 0);
  expect(g.score()).toBe(16);
});`,Pg=`test("one strike", () => {
  g.roll(10); // strike
  g.roll(3);
  g.roll(4);
  rollMany(16, 0);
  expect(g.score()).toBe(24);
});`,Ba=`test("one strike", () => {
  rollStrike();
  g.roll(3);
  g.roll(4);
  rollMany(16, 0);
  expect(g.score()).toBe(24);
});`,Li=t=>`test("perfect game", () => {
  rollMany(12, 10);
  expect(g.score()).toBe(${t});
});`,cn=`function rollMany(rolls, pins) {
  for (let i = 0; i < rolls; i += 1)
    g.roll(pins);
}`,dn=`function rollMany(rolls, pins) {
  for (let i = 0; i < rolls; i += 1) g.roll(pins);
}`,un=`function rollSpare() {
  g.roll(5);
  g.roll(5);
}`,Fa=`function rollStrike() {
  g.roll(10);
}`,ne=(...t)=>t.join(`

`),H={gutterNoImport:`test('gutter game', () => {
  const g = new Game();
});`,gutterNew:ne(xn,`test("gutter game", () => {
  const g = new Game();
});`),gutterRolls:ne(xn,Pt(!0,!1)),gutterScore:ne(xn,Pt(!0,!0)),allOnes:ne(xn,Pt(!0,!0),ct(!0)),setUp:ne(le,Pt(!0,!0),ct(!0)),gutterShared:ne(le,Pt(!1,!0),ct(!0)),bothShared:ne(le,Pt(!1,!0),ct(!1)),named:ne(le,`test("gutter game", () => {
  const pins = 0;
  const rolls = 20;
  for (let i = 0; i < rolls; i += 1)
    g.roll(pins);
  expect(g.score()).toBe(0);
});`,ct(!1,"i += 1")),extracted:ne(le,`test("gutter game", () => {
  const pins = 0;
  const rolls = 20;
  rollMany(rolls, pins);
  expect(g.score()).toBe(0);
});`,ct(!1,"i += 1"),cn),inlined:ne(le,Be,ct(!1,"i += 1"),cn),rollMany:ne(le,Be,Ge,cn),spare:ne(le,Be,Ge,Kl,cn),spareAside:ne(le,Be,Ge,Ng,cn),rollSpare:ne(le,Be,Ge,ln,dn,un),strike:ne(le,Be,Ge,ln,Pg,dn,un),rollStrike:ne(le,Be,Ge,ln,Ba,dn,un,Fa),perfect:ne(le,Be,Ge,ln,Ba,Li("300"),dn,un,Fa),perfectFails:ne(le,Be,Ge,ln,Ba,Li('"fail"'),dn,un,Fa)},se=(...t)=>`export default class Game {
${t.join(`
`)}
}`,K=(t,...e)=>e.length?`  ${t} {
${e.map(n=>`    ${n}`).join(`
`)}
  }`:`  ${t} {}`,Da=["let score = 0;","for (let i = 0; i < this.#rolls.length; i++) {","  score += this.#rolls[i];","}","return score;"],dt=(...t)=>["const rolls = this.#rolls;","let score = 0;",...t,"return score;"],ce="  #rolls = [];",Me=K("roll(pins)","this.#rolls.push(pins);"),Rt=`function isSpare(rolls, frameIndex) {
  return rolls[frameIndex] + rolls[frameIndex + 1] == 10;
}`,Rg=`function isStrike(rolls, frameIndex) {
  return rolls[frameIndex] === 10;
}`,ws=`function strikeBonus(rolls, frameIndex) {
  return rolls[frameIndex + 1] + rolls[frameIndex + 2];
}`,Ha=`function spareBonus(rolls, frameIndex) {
  return rolls[frameIndex + 2];
}`,Ni=`function sumOfBallsInFrame(rolls, frameIndex) {
  return rolls[frameIndex] + rolls[frameIndex + 1];
}`,ut=t=>["let frameIndex = 0;","for (let frame = 0; frame < 10; frame++) {",...t.map(e=>`  ${e}`),"}"],Pi=(t,e)=>[`if (${t}) {`,...t.includes("isSpare")?[]:["  // spare"],"  score += 10 + rolls[frameIndex + 2];","  frameIndex += 2;","} else {",`  score += ${e};`,"  frameIndex += 2;","}"],F={none:"",empty:"export default class Game {}",roll:se(K("roll()")),scoreEmpty:se(K("roll()"),K("score()")),scoreZero:se(K("roll()"),K("score()","return 0;")),summing:se("  #score = 0;",K("roll(pins)","this.#score += pins;"),K("score()","return this.#score;")),rollsField:se("  #score = 0;",ce,K("roll(pins)","this.#score += pins;"),K("score()","return this.#score;")),bothWritten:se("  #score = 0;",ce,K("roll(pins)","this.#score += pins;","this.#rolls.push(pins);"),K("score()","return this.#score;")),readFromRolls:se("  #score = 0;",ce,K("roll(pins)","this.#score += pins;","this.#rolls.push(pins);"),K("score()",...Da)),oldUnwritten:se("  #score = 0;",ce,Me,K("score()",...Da)),rollsOnly:se(ce,Me,K("score()",...Da)),twoAtATime:se(ce,Me,K("score()","const rolls = this.#rolls;","let score = 0;","let i = 0;","for (let frame = 0; frame < 10; frame++) {","  score += rolls[i] + rolls[i + 1];","  i += 2;","}","return score;")),spareByI:se(ce,Me,K("score()","const rolls = this.#rolls;","let score = 0;","let i = 0;","for (let frame = 0; frame < 10; frame++) {","  if (rolls[i] + rolls[i + 1] == 10) {","    // spare","    score += 10 + rolls[i + 2];","    i += 2;","  } else {","    score += rolls[i] + rolls[i + 1];","    i += 2;","  }","}","return score;")),frameIndex:se(ce,Me,K("score()",...dt(...ut(Pi("rolls[frameIndex] + rolls[frameIndex + 1] == 10","rolls[frameIndex] + rolls[frameIndex + 1]"))))),isSpare:`${se(ce,Me,K("score()",...dt(...ut(Pi("isSpare(rolls, frameIndex)","rolls[frameIndex] + rolls[frameIndex + 1]")))))}

${Rt}`,strike:`${se(ce,Me,K("score()",...dt(...ut(["if (rolls[frameIndex] == 10) {","  // strike","  score += 10 +","    rolls[frameIndex + 1] +","    rolls[frameIndex + 2];","  frameIndex += 1;","} else if (isSpare(rolls, frameIndex)) {","  score += 10 + rolls[frameIndex + 2];","  frameIndex += 2;","} else {","  score += rolls[frameIndex] + rolls[frameIndex + 1];","  frameIndex += 2;","}"]))))}

${Rt}`,strikeBonus:`${se(ce,Me,K("score()",...dt(...ut(["if (rolls[frameIndex] == 10) {","  // strike","  score += 10 + strikeBonus(rolls, frameIndex);","  frameIndex += 1;","} else if (isSpare(rolls, frameIndex)) {","  score += 10 + rolls[frameIndex + 2];","  frameIndex += 2;","} else {","  score += rolls[frameIndex]+rolls[frameIndex + 1];","  frameIndex += 2;","}"]))))}

${ws}

${Rt}`,spareBonus:`${se(ce,Me,K("score()",...dt(...ut(["if (rolls[frameIndex] == 10) {","  // strike","  score += 10 + strikeBonus(rolls, frameIndex);","  frameIndex += 1;","} else if (isSpare(rolls, frameIndex)) {","  score += 10 + spareBonus(rolls, frameIndex);","  frameIndex += 2;","} else {","  score += rolls[frameIndex]+rolls[frameIndex + 1];","  frameIndex += 2;","}"]))))}

${ws}

${Ha}

${Rt}`,sumOfBalls:`${se(ce,Me,K("score()",...dt(...ut(["if (rolls[frameIndex] == 10) {","  // strike","  score += 10 + strikeBonus(rolls, frameIndex);","  frameIndex += 1;","} else if (isSpare(rolls, frameIndex)) {","  score += 10 + spareBonus(rolls, frameIndex);","  frameIndex += 2;","} else {","  score += sumOfBallsInFrame(rolls, frameIndex);","  frameIndex += 2;","}"]))))}

${ws}

${Ha}

${Ni}

${Rt}`,isStrike:`${se(ce,Me,K("score()",...dt(...ut(["if (isStrike(rolls, frameIndex)) {","  score += 10 + strikeBonus(rolls, frameIndex);","  frameIndex += 1;","} else if (isSpare(rolls, frameIndex)) {","  score += 10 + spareBonus(rolls, frameIndex);","  frameIndex += 2;","} else {","  score += sumOfBallsInFrame(rolls, frameIndex);","  frameIndex += 2;","}"]))))}

${Rg}

${ws}

${Ha}

${Ni}

${Rt}`},Fe=["Roll loop is duplicated","Game creation duplicated"],de=["ugly comment in test."],Wa=["ugly comment in test.","ugly comment in conditional.","i is a bad name for this variable"],mn=["ugly comment in test.","ugly comment in conditional.","ugly expressions."],D=(t,e,n,s,a=[],o)=>o===void 0?{commit:t,stage:e,test:n,code:s,smells:a}:{commit:t,stage:e,test:n,code:s,smells:a,note:o},pt=[D(0,"test","",F.none,[],"Create the BowlingGame project. Create a test file bowling.spec.js. Execute the test and verify that you get the following error."),D(1,"test",H.gutterNoImport,F.none),D(2,"code",H.gutterNew,F.empty),D(3,"test",H.gutterRolls,F.empty),D(4,"code",H.gutterRolls,F.roll),D(5,"test",H.gutterScore,F.roll),D(6,"code",H.gutterScore,F.scoreEmpty),D(7,"code",H.gutterScore,F.scoreZero),D(8,"test",H.allOnes,F.scoreZero,Fe),D(9,"code",H.allOnes,F.summing,Fe),D(10,"clean",H.setUp,F.summing,Fe),D(11,"clean",H.gutterShared,F.summing,Fe),D(12,"clean",H.bothShared,F.summing,Fe),D(13,"clean",H.named,F.summing,Fe),D(14,"clean",H.extracted,F.summing,Fe),D(15,"clean",H.inlined,F.summing,Fe),D(16,"clean",H.rollMany,F.summing,Fe),D(17,"test",H.spare,F.summing,de),D(18,"test",H.spareAside,F.summing,de,"Tempted to use flag to remember previous roll. So design must be wrong. roll() calculates score, but name does not imply that. score() does not calculate score, but name implies that it does. Design is wrong. Responsibilities are misplaced."),D(19,"clean",H.spareAside,F.rollsField,de),D(20,"clean",H.spareAside,F.bothWritten,de),D(21,"clean",H.spareAside,F.readFromRolls,de),D(22,"clean",H.spareAside,F.oldUnwritten,de),D(23,"clean",H.spareAside,F.rollsOnly,de),D(24,"test",H.spare,F.rollsOnly,de),D(25,"test",H.spareAside,F.rollsOnly,de,"This isn’t going to work because i might not refer to the first ball of the frame. Design is still wrong. Need to walk through array two balls (one frame) at a time."),D(26,"clean",H.spareAside,F.twoAtATime,de),D(27,"test",H.spare,F.twoAtATime,de),D(28,"code",H.spare,F.spareByI,de),D(29,"clean",H.spare,F.frameIndex,Wa),D(30,"clean",H.spare,F.isSpare,Wa),D(31,"clean",H.rollSpare,F.isSpare,Wa),D(32,"test",H.strike,F.isSpare,de),D(33,"code",H.strike,F.strike,de),D(34,"clean",H.strike,F.strikeBonus,mn),D(35,"clean",H.strike,F.spareBonus,mn),D(36,"clean",H.strike,F.sumOfBalls,mn),D(37,"clean",H.strike,F.isStrike,mn),D(38,"clean",H.rollStrike,F.isStrike,mn),D(39,"test",H.perfect,F.isStrike),D(40,"test",H.perfectFails,F.isStrike),D(41,"test",H.perfect,F.isStrike)];function Bg(t,e){const n=t===""?[]:t.split(`
`),s=e.split(`
`),a=Array.from({length:n.length+1},()=>new Array(s.length+1).fill(0));for(let h=n.length-1;h>=0;h-=1)for(let c=s.length-1;c>=0;c-=1)a[h][c]=n[h]===s[c]?(a[h+1][c+1]??0)+1:Math.max(a[h+1][c]??0,a[h][c+1]??0);const o=[];let r=0,i=0;for(;r<n.length||i<s.length;)r<n.length&&i<s.length&&n[r]===s[i]?(o.push({kind:"same",line:s[i]}),r+=1,i+=1):r<n.length&&(i>=s.length||(a[r+1][i]??0)>=(a[r][i+1]??0))?(o.push({kind:"removed",line:n[r]}),r+=1):(o.push({kind:"added",line:s[i]}),i+=1);return o}const ys={id:"fc771d5e39e8",title:"Lessons Learned From The Bowling Game Kata: What To Test?"},fn={id:"90b110a2ad17",title:"Refactor Lessons Learned From The Bowling Game Kata (1/2)"},Ye={id:"1d28b3a78b08",title:"Refactor Lessons Learned From The Bowling Game Kata (2/2)"},Ri={id:"a37d8d11be9c",title:"Lessons Learned From The Bowling Game Kata: How To Design?"},Bi={id:"6813582074f3",title:"Don't Trust Tests"},Fg=[{commits:[1,4],title:"Step tests come and go",text:"The test first only creates a game, as a step test would, and then rolls, as another would. Such tests appear and disappear while a business test is written: none is needed.",essay:{...ys,section:"Chapter Four. Step tests are redundant."}},{commits:[5,7],title:"The simplest rule first",text:"The gutter game scores no point, so it needs no hard thinking, and it lays the foundation of the code. Then comes the simplest rule that remains, and so on.",essay:{...ys,section:"Chapter Seven. Start with the most simple rule."}},{commits:[8,9],title:"Refactor only after it works",text:"The second test repeats code from the first, and the kata waits: it only marks the duplication. Solving the problem and cleaning the code are two tasks, and the first comes first.",essay:{...fn,section:"Lesson 1: Refactor only after it works."}},{commits:[10,10],title:"Add new code before removing the old",text:"It works again, so the refactor begins, oddly: a game for every test, kept and then ignored. Doing nothing, it breaks nothing — which shows the new code is safe to use.",essay:{...fn,section:"Lesson 2: Add new code before removing old."}},{commits:[11,12],title:"Remove as little as possible",text:"The old creation goes one test at a time: the gutter game first, then, once everything works, all ones. Should they behave differently, a small change makes the cause easy to find.",essay:{...fn,section:"Lesson 3: Remove the minimal amount of old code."}},{commits:[13,13],title:"One aspect at a time",text:"Only with the game's creation clean does the kata turn to the other thing to clean, the repeated loop. Many improvements may come to mind; it takes them one at a time.",essay:{...fn,section:"Lesson 4: Refactor only one aspect at a time."}},{commits:[14,16],title:"Let the IDE do it",text:"With the rolls and the pins in constants, extracting the loop makes them the parameters of rollMany, and nothing is done by hand. Then the constants go, and the second loop calls it too.",essay:{...fn,section:"Lesson 5: Leverage on the IDE."}},{commits:[17,17],title:"Not from scratch",text:"The design so far is the least one the needs so far asked for, and it was necessary. Now it no longer serves, and starting again from scratch is out of the question.",essay:{...Ye,section:"The Final Lesson"}},{commits:[18,18],title:"Step 0 · Name the parts",text:"The failing test is set aside, so everything works again before the refactor. Then the kinds of code: the counter is the internal representation, roll its setter, score its getter.",essay:{...Ye,section:"Step 0. Identifying types of code"}},{commits:[19,19],title:"Step 1 · Add the new beside the old",text:"The new internal representation, the list of rolls, goes in just below the counter. The old one is not removed, so the code still works.",essay:{...Ye,section:"Step 1. Introducing the new internal representation"}},{commits:[20,20],title:"Step 2 · Write to both",text:"The setter, roll, also keeps each roll in the list. It goes on updating the counter as well, so for now it writes to both, and the code still works.",essay:{...Ye,section:"Step 2. Make setters update the new internal representation."}},{commits:[21,21],title:"Step 3 · Read from the new",text:"The getter, score, now adds up the list. Only its own old line goes: that breaks nobody, and an undo would bring it back. The counter and its update stay.",essay:{...Ye,section:"Step 3. Make getters use the new internal representation."}},{commits:[22,22],title:"Step 4 · Stop writing the old",text:"roll stops updating the counter, and everything works: no getter reads it any more. Had something broken, some code would still be using it: undo the removal, and keep refactoring.",essay:{...Ye,section:"The Five Steps"}},{commits:[23,23],title:"Step 5 · Remove the old",text:"Nobody uses the counter, so it goes, and the code works again — the mantra behind each step. So every step could be committed and merged, without stopping delivery.",essay:{...Ye,section:"The five steps mantra"}},{commits:[24,26],title:"No guarantee of success",text:"The refactor is complete, and the spare still fails: a good technique is not a guarantee. It works again first; then most of the code stays, and only the algorithm changes.",essay:{...Ye,section:"Additional steps."}},{commits:[27,27],title:"The test comes back as it was",text:"The spare test returns unchanged; the kata writes no test for its roll-by-roll attempt. It just continues the refactor, and fixes the algorithm.",essay:{...ys,section:"Chapter Five. Do not test mistakes."}},{commits:[32,32],title:"The tests are the rules",text:"The strike test is one more rule of scoring: tests and rules match one by one. They call the game, roll and score, and what they test is the business rules.",essay:{...ys,section:"Chapter One. The basics."}},{commits:[37,37],title:"Code that reads as the rules",text:"The score now reads as the instructions for scoring bowling: frame by frame, a strike, a spare or neither, with the bonuses where they are due.",essay:{...Ri,section:"Comparing typical design with the kata design"}},{commits:[39,39],title:"No code for the tenth frame",text:"The perfect game passes at once. The tenth frame has no code and no test of its own: this game checks it, and the bonuses count its extra rolls.",essay:{...Ri,section:"Where is the Tenth Frame?"}},{commits:[40,40],title:"Make it fail once",text:"A test that passes without failing first has lost what TDD gives: a mistake could pass unnoticed. So it is made to fail on purpose, and the error shows it checks the right thing.",essay:{...Bi,section:""}},{commits:[41,41],title:"Trust a test seen failing",text:"Seen failing as it should, the test is known to check the right thing, and it gets its expectation back. Never trust a test that did not fail before.",essay:{...Bi,section:""}}];function Vl(t){return Fg.find(({commits:[e,n]})=>t>=e&&t<=n)}function Xs(t){return t instanceof Error?`${t.name}: ${t.message}`:String(t)}const Xl=new WeakSet,Tn=t=>typeof t=="string"?JSON.stringify(t):typeof t=="function"?Xl.has(t)?"[MockFunction]":`[Function ${t.name||"anonymous"}]`:String(t),Zl=t=>t.map(Tn).join(", "),Fi=t=>t.length===0?"called with no arguments":`called with ${Zl(t)}`;class Ms extends Error{}const Di=t=>t instanceof Ms?t.message:Xs(t);function Dg(){const t=[],e=Object.assign((...n)=>{t.push(n)},{calls:t});return Xl.add(e),e}const Hg=(t,e)=>t.length===e.length&&t.every((n,s)=>Object.is(n,e[s]));function Wg(t){return{toBe(e){if(!Object.is(t,e))throw new Ms(`Expected: ${Tn(e)}. Received: ${Tn(t)}.`)},toContain(e){if(!Array.isArray(t)||!t.includes(e))throw new Ms(`Expected: something containing ${Tn(e)}. Received: ${Array.isArray(t)?`[${Zl(t)}]`:Tn(t)}.`)},toHaveBeenCalledWith(...e){const n=t?.calls??[];if(n.some(a=>Hg(a,e)))return;const s=n[n.length-1];throw new Ms(`Expected: ${Fi(e)}. Received: ${s?Fi(s):"never called"}.`)}}}function Ws(t,e={}){const n=[],s=[],a=[],o=(d,u)=>n.push({name:[...a,d].join(" "),body:u}),r=(d,u)=>{a.push(d),u(),a.pop()},i=["test","it","describe","beforeEach","expect","fn",...Object.keys(e)],h=[o,o,r,d=>s.push(d),Wg,Dg,...Object.values(e)];try{new Function(...i,t)(...h)}catch(d){return{passed:!1,message:Di(d),results:[]}}if(n.length===0)return{passed:!1,message:"Your test suite must contain at least one test.",results:[]};const c=n.map(({name:d,body:u})=>{try{for(const f of s)f();return u(),{name:d,passed:!0}}catch(f){return{name:d,passed:!1,message:Di(f)}}}),l=c.find(d=>!d.passed);return l?{passed:!1,message:l.message,results:c}:{passed:!0,results:c}}const Hi=/^\s*import Game from "\.\/bowling";\s*$/m;function Ql(t,e){let n;try{n=e.trim()?new Function(`${e.replace(/export default class Game/,"class Game")}
return Game;`)():void 0}catch(s){return{passed:!1,message:Xs(s),results:[]}}return Hi.test(t)?Ws(t.replace(Hi,""),{Game:n}):Ws(t)}const qg={test:"Test: write or change a test",code:"Code: write what the test asks for",clean:"Clean: tidy, and stay green"},zg={same:"line",added:"line added",removed:"line removed"};function Wi(t,e,n,s){const a=n===void 0?e.split(`
`).map(r=>({kind:"same",line:r})):Bg(n,e);if(!e.trim()&&!a.some(r=>r.kind==="removed"))return`<figure class="kata-file"><figcaption>${t}</figcaption><p class="kata-empty">${s}</p></figure>`;const o=a.map(({kind:r,line:i})=>`<span class="${zg[r]}">${we(i,"js")||" "}</span>`);return`<figure class="kata-file"><figcaption>${t}</figcaption><pre><code>${o.join(`
`)}</code></pre></figure>`}function ec(t,e){const n=Ql(t.test,t.code),s=n.passed?'<p class="kata-bar green">All tests pass.</p>':`<p class="kata-bar red">${$(n.message??"")}</p>`,a=t.smells.length?`<div class="kata-smells"><h4>Still to clean</h4><ul>${t.smells.map(h=>`<li>${$(h)}</li>`).join("")}</ul></div>`:"",o=t.note?`<p class="kata-note">${$(t.note)}</p>`:"",r=Vl(t.commit),i=r?`<aside class="kata-lesson"><h4>${$(r.title)}</h4><p>${$(r.text)} <a href="https://medium.com/p/${r.essay.id}" target="_blank" rel="noopener noreferrer">${$(r.essay.title)}${r.essay.section?` — ${$(r.essay.section)}`:""}</a></p></aside>`:"";return`<div class="kata-step"><p class="kata-move"><strong>commit ${t.commit}</strong> · ${qg[t.stage]}</p>${s}${i}<div class="kata-files">${Wi("bowling.spec.js",t.test,e?.test,"An empty file.")}${Wi("bowling.js",t.code,e?.code,"Not written yet.")}</div>${o}${a}</div>`}function _g(t,e){return`commit ${t.commit} · ${t.stage} · ${e.passed?"All tests pass.":e.message}`}function tc(t,e){return`<ol class="kata-strip" aria-label="The commits of the kata, red or green">${t.map(a=>{const o=Ql(a.test,a.code),r=o.passed?"green":"red",i=a.commit===e;return`<li class="${r} ${a.stage}${i?" here":""}" data-commit="${a.commit}" title="${$(_g(a,o))}"${i?' aria-current="step"':""}>${a.commit}</li>`}).join("")}</ol><p class="kata-legend"><span class="red">a test fails</span> <span class="green code">all pass</span> <span class="green clean">a clean step: all still pass</span></p>`}const Gg=()=>`<div class="kata">${tc(pt,0)}${ec(pt[0])}</div>`,qi=pt.length-1;function Yg(t){let e=0;const n=y("div"),s=y("div"),a=y("button",{type:"button"},"← previous"),o=y("button",{type:"button",class:"invite"},"next →"),r=y("span",{class:"kata-hint"},"click any commit, or use ← →"),i=h=>{h!==e&&o.classList.remove("invite"),e=Math.max(0,Math.min(qi,h)),n.innerHTML=tc(pt,e),s.innerHTML=ec(pt[e],pt[e-1]),a.disabled=e===0,o.disabled=e===qi};a.addEventListener("click",()=>i(e-1)),o.addEventListener("click",()=>i(e+1)),n.addEventListener("click",h=>{const c=h.target?.closest("[data-commit]");c&&i(Number(c.dataset.commit))}),t.tabIndex=0,t.addEventListener("keydown",h=>{if(h.key==="ArrowRight")i(e+1);else if(h.key==="ArrowLeft")i(e-1);else return;h.preventDefault()}),t.replaceChildren(y("div",{class:"kata"},n,y("div",{class:"kata-nav"},a,o,r),s)),i(0)}const Ug=/^---(?:\s+(.*))?$/;function Jg(t){const e=[];let n=[];for(const s of t.split(`
`)){const a=Ug.exec(s);if(!a){n.push(s);continue}const o=a[1]?.trim()??"",r=/^(red|green)\s/.exec(o)?.[1],i=n.join(`
`);o?e.push({text:i,status:r?{kind:r,text:o.slice(r.length).trim()}:{kind:"note",text:o}}):e.push({text:i}),n=[]}return n.some(s=>s.trim())&&e.push({text:n.join(`
`)}),e}function nc(t,e){const n=Jg(t),s=n.map((a,o)=>{const r=a.status?`<p class="slide-status ${a.status.kind}">${$(a.status.text)}</p>`:"";return`<div class="slide${o===n.length-1?" current":""}"><pre><code>${we(a.text,e)}</code></pre>${r}</div>`});return`<figure class="slides" data-language="${$(e)}"><div class="slides-screen">${s.join("")}</div></figure>`}const Kg=[18,19,20,21,22,23];function Vg(){return Kg.map(t=>`${pt[t]?.code??""}
--- green commit ${t} · ${Vl(t)?.title??""} — all tests pass.`).join(`
`)}function sc(){return nc(Vg(),"js")}function Xg(t){t.querySelector("figure.slides")||(t.innerHTML=sc())}const Zg=()=>sc(),Qg={name:"bowling-kata",apps:{"bowling-kata":Yg,"kata-five-steps":Xg},stills:{"bowling-kata":Gg,"kata-five-steps":Zg}},yo=[{name:"original",label:"Original",said:"The dispatcher the three tests imply: its listeners kept in an array, _queue.",source:`class Dispatcher {
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
}`}],ew=`let dispatcher, cb;
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
});`;function tw(t,e=ew){let n;try{n=new Function(`${t}
return Dispatcher;`)()}catch(s){return{passed:!1,message:Xs(s),results:[]}}return Ws(e,{Dispatcher:n})}const zi=["addListener should add a callback to the queue","deliver should invoke queue callbacks with the received argument"];function bo(t){const e=tw(t.source),n=a=>{const o=e.results.find(h=>h.name===a),r=o?.passed??!1,i=r?"":`<span class="said">${$(o?.message??e.message??"")}</span>`;return`<li class="${r?"green":"red"}"><code>${$(a)}</code>${i}</li>`},s=e.results.map(a=>a.name).filter(a=>!zi.includes(a));return`<div class="dispatcher-run"><figure class="kata-file"><figcaption>dispatcher.js — ${$(t.label.toLowerCase())}</figcaption><pre><code>${we(t.source,"js")}</code></pre></figure><div class="dispatcher-tests"><p class="said-change">${$(t.said)}</p><h4>Looking inside</h4><ul class="test-results">${zi.map(n).join("")}</ul><h4>Reading like documentation</h4><ul class="test-results">${s.map(n).join("")}</ul></div></div>`}function nw(t){const e=y("div"),n=yo.map((s,a)=>{const o=y("input",{type:"radio",name:"dispatcher",value:s.name,checked:a===0});return o.addEventListener("change",()=>{e.innerHTML=bo(s)}),y("label",{},o,` ${s.label}`)});t.replaceChildren(y("div",{class:"dispatcher-choice",role:"radiogroup","aria-label":"The dispatcher"},...n),e),e.innerHTML=bo(yo[0])}const sw=()=>yo.map(t=>`<section><h4>${t.label}</h4>${bo(t)}</section>`).join(""),aw={name:"tests-as-examples",apps:{"tests-as-examples":nw},stills:{"tests-as-examples":sw}},ac=`Feature: Magic of Disappearing Cucumbers

  Scenario: Eating 5 out of 12 cucumbers
    Given I have 12 cucumbers
    When I eat 5 cucumbers
    Then I should have 7 cucumbers remaining`,oc=`class CucumberSteps {
  #count = 0;

  givenIHaveNCucumbers(count) {
    this.#count = count;
  }
}`,_i=(t,e)=>`<p class="kata-bar ${t?"green":"red"}">${$(e)}</p>`;function rc(t){if(t.error)return _i(!1,t.error);if(t.wished){const[s="",...a]=t.wished.split(`
`);return`<pre class="genie-wished">${$(s)}
${we(a.join(`
`),"js")}</pre>`}const e=t.run;if(!e)return"";const n=e.results.map(s=>`<li class="${s.passed?"green":"red"}"><code>${$(s.name)}</code>${s.passed?"":`<span class="said">${$(s.message??"")}</span>`}</li>`);return`${_i(e.passed,e.passed?"Every scenario passes.":e.message??"")}<ul class="test-results">${n.join("")}</ul>`}const ow={n:`
`,r:"\r",t:"	",b:"\b",f:"\f",v:"\v",0:"\0",s:" "},Gi=t=>t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();function rw(t,e){return t.endsWith(e)?t.at(-2)!=="\\"||/(^|[^\\])(\\\\)+.$/.test(t):!1}function ic(t){const e=t.split(" "),n=[],s=[];for(let a=0;a<e.length;){const o=e[a]??"",r=o[0];if(r==='"'||r==="'"){let h=e[a++]??"";for(;a<e.length&&!rw(h,r);)h+=` ${e[a++]}`;s.push(h.slice(1,-1).replace(/\\(.)/g,(c,l)=>ow[l]??l)),n.push("S");continue}if(a+=1,o&&!Number.isNaN(Number(o))){s.push(Number(o)),n.push("N");continue}const i=o.normalize("NFD").replace(/([^\w]|\d)/g,"");i?n.push(Gi(i)):o&&(n.push("X"),s.push(o))}return{matchName:n.map(Gi).join(""),args:s}}const iw=/^(Given|When|Then|And|But) (.*)$/,hw=/^(?:Scenario|Example):\s*(.*)$/,lw=/^("""|```)/;function cw(t){const e=[];let n=null,s=null;const a=t.split(`
`),o=()=>s?.at(-1),r=i=>{s&&(s[s.length-1]=i)};for(let i=0;i<a.length;i+=1){const h=(a[i]??"").trim();if(!h||h.startsWith("#")||h.startsWith("@"))continue;if(h.startsWith("Background:")){n=[],s=n;continue}const c=hw.exec(h);if(c){const f=[...n??[]];e.push({name:c[1]??"",steps:f}),s=f;continue}const l=iw.exec(h);if(l){s?.push({keyword:l[1]??"",text:l[2]??""});continue}const d=o();if(h.startsWith("|")&&d){const f=h.replace(/^\||\|$/g,"").split("|").map(m=>m.trim());r({...d,table:[...d.table??[],f]});continue}const u=lw.exec(h);if(u&&d){const f=(a[i]??"").indexOf(u[1]??""),m=[];for(i+=1;i<a.length&&!(a[i]??"").trim().startsWith(u[1]??"");i+=1){const p=a[i]??"";m.push(p.slice(Math.min(f,p.length-p.trimStart().length)))}r({...d,docString:m.join(`
`)})}}return e}function dw(t,e){const n=new Set(e),s=[];for(const a of t.flatMap(o=>o.steps)){const{matchName:o,args:r}=ic(a.text);if(n.has(o))continue;let i=1,h=1;const c=r.map(l=>typeof l=="number"?`number${i++}`:`string${h++}`);a.docString!==void 0&&c.push("docString"),a.table&&c.push("table"),s.push(`  ${a.keyword.toLowerCase()}${o}(${c.join(", ")}) {
    throw new Error("Unimplemented");
  }`),n.add(o)}return s.length===0?"":["There are missing steps. Please implement them:","","class WishedSteps {",s.join(`

`),"}"].join(`
`)}const Yi=/^(given|when|then|and|but)([A-Z])/,pn=t=>JSON.stringify(t);function uw(t){const[e=[],...n]=t;return n.map(s=>Object.fromEntries(e.map((a,o)=>[a,s[o]??""])))}function hc(t,e){const n=e.trim().replace(/;+$/,"");let s;try{s=new Function(`return (${n});`)()}catch(h){return{wished:"",error:Xs(h)}}if(typeof s!="function")return{wished:"",error:"The steps must be a class."};const a=new Map;for(const h of Object.getOwnPropertyNames(s.prototype))Yi.test(h)&&a.set(h.replace(Yi,"$2"),h);const o=cw(t),r=dw(o,new Set(a.keys()));if(r)return{wished:r};const i=o.map(h=>{const c=h.steps.map(l=>{const{matchName:d,args:u}=ic(l.text),f=[...u.map(pn),...l.docString===void 0?[]:[pn(l.docString)],...l.table?[pn(uw(l.table))]:[]];return`  steps[${pn(a.get(d))}](${f.join(", ")});`});return`test(${pn(h.name)}, () => {
  const steps = new Steps();
${c.join(`
`)}
});`});return{wished:"",run:Ws(`const Steps = (${n});
${i.join(`
`)}`)}}function Ui(t,e,n,s,a,o){const r=`<code>${we(s,n)}</code>`,i=o?`<div class="genie-editor"><pre class="genie-source genie-colours" aria-hidden="true">${r}</pre><textarea class="genie-source" data-genie="${e}" data-language="${n}" rows="${a}" spellcheck="false" autocapitalize="off" aria-label="${$(t)}">${$(s)}</textarea></div>`:`<pre class="genie-source">${r}</pre>`;return`<figure class="kata-file"><figcaption>${$(t)}</figcaption>${i}</figure>`}function lc(t,e,n){return`<div class="genie"><div class="genie-in">${Ui("cucumbers.feature","feature","gherkin",t,7,n)}${Ui("steps.js","steps","js",e,10,n)}</div><figure class="kata-file genie-out"><figcaption>npm test</figcaption><div class="genie-output">${rc(hc(t,e))}</div></figure></div>`}function mw(t){t.innerHTML=lc(ac,oc,!0);const e=t.querySelector('[data-genie="feature"]'),n=t.querySelector('[data-genie="steps"]'),s=t.querySelector(".genie-output");if(!e||!n||!s)return;for(const o of[e,n]){const r=o.previousElementSibling,i=()=>{r&&(r.innerHTML=`<code>${we(o.value,o.dataset.language??"")}
</code>`)};o.addEventListener("input",i),o.addEventListener("scroll",()=>{r&&(r.scrollTop=o.scrollTop,r.scrollLeft=o.scrollLeft)})}const a=()=>{s.innerHTML=rc(hc(e.value,n.value))};e.addEventListener("input",a),n.addEventListener("input",a)}const fw=()=>lc(ac,oc,!1),pw={name:"gherkin-genie",apps:{"gherkin-genie":mw},stills:{"gherkin-genie":fw}};function cc(t,e){if(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)return()=>{};let n=e(),s=!0,a=!1,o=!0,r;const i=y("button",{type:"button",class:"player"}),h=(u,f)=>{i.setAttribute("aria-label",u),i.textContent=f};h("Pause","⏸");const c=()=>{if(r=void 0,!s||!o||a)return;const u=n();if(u===null){a=!0,h("Play again","↻");return}r=setTimeout(c,u)},l=()=>{clearTimeout(r),r=void 0};i.addEventListener("click",()=>{if(a){n=e(),a=!1,s=!0,h("Pause","⏸"),l(),c();return}s=!s,h(s?"Pause":"Play",s?"⏸":"▶"),s?c():l()}),t.append(i);const d=typeof IntersectionObserver=="function"?new IntersectionObserver(u=>{for(const f of u)o=f.isIntersecting;o?r===void 0&&c():l()}):void 0;return d?.observe(t),c(),()=>{l(),d?.disconnect(),i.remove()}}function dc(t,e){const n=[];for(;n.length<e;){n.push("test");const s=Math.floor(t()*4);for(let a=0;a<s&&n.length<e;a+=1)n.push("clean")}return n}function uc(t){return`<ol class="small-steps" role="img" aria-label="Small steps: a test fails and is put right at once; clean steps between; again and again">${t.map(n=>`<li class="${n}"></li>`).join("")}</ol>`}const vo=40,Ji=220,gw=950,ww=2200,yw=45;function bw(t,{wipe:e=!0}={}){const n=t.map(()=>"empty"),s=[{marks:[...n],hold:Ji}],a=o=>s.push({marks:[...n],hold:o});return t.forEach((o,r)=>{o==="test"?(n[r]="red",a(gw),n[r]="fixed"):n[r]="clean",a(r===t.length-1?ww:Ji)}),e&&t.forEach((o,r)=>{n[r]="empty",a(yw)}),s}const Ki=3;function vw(t){const e=y("div",{class:"small-steps-row"});return t.replaceChildren(e),cc(t,()=>{e.innerHTML=uc(Array.from({length:vo},()=>"empty"));const s=[...e.querySelectorAll("li")],a=Array.from({length:Ki},(r,i)=>bw(dc(Math.random,vo),{wipe:i<Ki-1})).flat();let o=0;return()=>{const r=a[o++];return r?(r.marks.forEach((i,h)=>{const c=s[h];c&&c.className!==i&&(c.className=i)}),r.hold):null}})}const kw=()=>uc(dc(Pn(2026),vo).map(t=>t==="test"?"green":"clean")),$w={name:"small-steps",apps:{"small-steps":vw},stills:{"small-steps":kw}},qa=-100,za=100,_a=(t,e,n)=>`${t},${e},${n}`;class xw{#t;#e=[{a:2,b:4,c:8}];#n=null;#s=0;constructor(e){this.#t=e}get rows(){return this.#e.map(({a:e,b:n,c:s})=>({a:e,b:n,c:s,holds:this.#t.holds(e,n,s),last:_a(e,n,s)===this.#n})).sort((e,n)=>Number(n.holds)-Number(e.holds)||e.a-n.a||e.b-n.b||e.c-n.c)}test(e,n,s){return[e,n,s].some(Number.isNaN)?"Ops! Invalid numbers.":(this.#n=_a(e,n,s),this.#e.some(a=>_a(a.a,a.b,a.c)===this.#n)?"Ops! Sequence already present.":(this.#e.push({a:e,b:n,c:s}),""))}guess(e){if(this.#s>=this.#e.length)return"Ops! Add another sequence test before a guess.";const n="Ops! Cannot compile rule, please check your javascript rule or console for more information.";let s;try{s=new Function(`'use strict';return (a,b,c) => ${e}`)()}catch{return n}this.#s+=1;try{for(let a=qa;a<=za;a+=1)for(let o=qa;o<=za;o+=1)for(let r=qa;r<=za;r+=1)if(s(a,o,r)!==this.#t.holds(a,o,r))return"Ops! This is not the rule. Test more sequences and guess again."}catch{return n}return`Good! "${e}" is the rule.`}}function mc(t){return`<table class="guess-table"><thead><tr><th>a,</th><th>b,</th><th>c</th><th></th></tr></thead><tbody>${t.map(({a:n,b:s,c:a,holds:o,last:r})=>`<tr${r?' class="last"':""}><td>${n},</td><td>${s},</td><td>${a}</td><td>${o?"✅":"❌"}</td></tr>`).join("")}</tbody></table>`}const Tw=t=>({text:t,holds:new Function("a","b","c",`return ${t};`)}),Ga=["a < b && b < c","a + 1 < b && b + 1 < c","a + 1 < b && b + 2 < c","a <= b && b <= c","a <= b && b < c","a < b && b <= c","2 * a === b && 2 * b === c","a > 0 && b > 0 && c > 0","a === 2","b === 4","c === 8","c > 3","a + b + c > 5","a + b + c >= 5","a + b < c","a + b <= c","c - a > b","a * b === c","a * b <= c","a * b >= c","a !== b && b !== c && a !== c","a === 2 && b === 4 && c === 8","a % 2 === 0 && b % 2 === 0 && c % 2 === 0"].map(Tw);function Sw(t,e=Math.random){const n=new xw(Ga[Math.floor(Ga.length*e())]??Ga[0]),s=y("div",{class:"guess-rows"}),a=(g,b)=>y("input",{type:"number",value:g,"aria-label":b}),[o,r,i]=[a(2,"a"),a(4,"b"),a(8,"c")],h=y("p",{class:"guess-said","data-said":"test",hidden:!0}),c=y("input",{type:"text",value:"true",spellcheck:!1,autocapitalize:"off","aria-label":"The rule, in JavaScript"}),l=y("p",{class:"guess-said","data-said":"guess",hidden:!0}),d=(g,b)=>{g.textContent=b,g.hidden=!b,g.classList.toggle("good",b.startsWith("Good!"))},u=()=>{s.innerHTML=mc(n.rows)},f=()=>{d(h,n.test(Number(o.value),Number(r.value),Number(i.value))),u()},m=()=>d(l,n.guess(c.value)),p=y("button",{type:"button",class:"test",onclick:f},"Test"),w=y("button",{type:"button",class:"guess",onclick:m},"Guess");for(const g of[o,r,i])g.addEventListener("keydown",b=>b.key==="Enter"&&f());c.addEventListener("keydown",g=>g.key==="Enter"&&m()),t.replaceChildren(y("div",{class:"guess-the-rule"},y("h4",{},"Sequence numbers and their result:"),s,y("h4",{},"Propose a new sequence:"),y("p",{class:"guess-sequence"},"a: ",o,", b: ",r,", c: ",i," ",p),h,y("h4",{},"Propose a rule:"),y("p",{class:"guess-rule"},c," ",w),l,y("p",{class:"guess-note"},"Write any valid javascript expression that evaluates true or false. Use variables a, b and c in the expression."))),u()}const Mw=()=>`<div class="guess-the-rule"><h4>Sequence numbers and their result:</h4>${mc([{a:2,b:4,c:8,holds:!0,last:!1}])}<p class="guess-note">The rule is drawn, and the guessing played, when the page runs.</p></div>`,Aw={name:"guess-the-rule",apps:{"guess-the-rule":t=>Sw(t)},stills:{"guess-the-rule":Mw}};function Iw(t,e){return e.on(n=>t.follow(n))}const Ew=900,Ow=480,bs={x:1600,y:1e3};function vs(t,e){return(t%e+e)%e}class Cw{x=0;y=0;written="";driving=!1;follow({byRadians:e,tiltedBy:n,seconds:s}){const a=document.documentElement;if(a.dataset.sky!=="stars")return;this.driving||this.takeOver(a);const o=Ew/(Math.PI*2),r=(s/Ow*Math.PI*2+e)*o;this.x=vs(this.x+r,bs.x),this.y=vs(this.y-n*o,bs.y);const i=`${(Math.round(this.x*2)/2).toFixed(1)}px ${(Math.round(this.y*2)/2).toFixed(1)}px`;if(i===this.written)return;this.written=i;const[h,c]=i.split(" ");a.style.setProperty("--sky-x",h??"0px"),a.style.setProperty("--sky-y",c??"0px")}release(){const e=document.documentElement;e.classList.remove("sky-driven"),e.style.removeProperty("--sky-x"),e.style.removeProperty("--sky-y"),this.x=0,this.y=0,this.written="",this.driving=!1}takeOver(e){const n=getComputedStyle(document.body,"::before").transform;if(n&&n!=="none")try{const s=new DOMMatrixReadOnly(n);this.x=vs(s.m41,bs.x),this.y=vs(s.m42,bs.y)}catch{}e.classList.add("sky-driven"),this.driving=!0}}function jw(...t){const e=new Cw;return{name:"sky",install:()=>{const n=t.map(s=>Iw(e,s));return()=>{for(const s of n)s()}},arrive:()=>e.release()}}const{width:Vi,height:ks,pad:Oe}=Ho;function Lw(t,e){const n=Math.max(...t.map(l=>l.values.length),1),s=Math.max(1,...t.flatMap(l=>l.values)),a=Vi-Oe.left-Oe.right,o=ks-Oe.top-Oe.bottom,r=l=>Oe.left+l/Math.max(1,n-1)*a,i=l=>Oe.top+o-l/s*o,h=t.map(l=>{const d=l.values.map((u,f)=>`${r(f).toFixed(1)},${i(u).toFixed(1)}`).join(" ");return`<polyline class="line ${l.className}" points="${d}"><title>${l.name}</title></polyline>`}).join(""),c=t.map((l,d)=>`<rect class="${l.className}" x="${Oe.left+d*90}" y="${ks-Oe.bottom+20}" width="10" height="3"/><text x="${Oe.left+d*90+14}" y="${ks-Oe.bottom+24}">${l.name}</text>`).join("");return`<svg viewBox="0 0 ${Vi} ${ks}" role="img" aria-label="${e.y} by ${e.x}">${$l(s,e,n,Ys(s))}${h}${c}</svg>`}const Ya=20;function Nw(t){const{baseTime:e,shortcutFactor:n,interestRate:s,timeHorizon:a}=t,o=[];let r=null;const i=e;let h=e*(1-n),c=0,l=0,d=0,u=0,f=0,m=0;for(let p=0;p<a*Ya;){for(;f<=p;)c+=1,d+=1,f+=i;for(;m<=p;)l+=1,u+=1,m+=h,h*=1+s;if(p+=1,p%Ya===0){const w=p/Ya;o.push({month:w,cleanCumulative:c,debtCumulative:l,cleanMonthly:d,debtMonthly:u,debtFeatureCost:h}),d=0,u=0,r===null&&c>l&&(r=w)}}return{months:o,breakEvenMonth:r}}const Xi=t=>Nw({baseTime:Number(t["base-time"]),shortcutFactor:Number(t.shortcuts)/100,interestRate:Number(t.interest)/100,timeHorizon:Number(t.timeline)}),Zi=({months:t})=>`<div class="chart"><h4>Cumulative features</h4>${Lw([{name:"Clean",className:"clean",values:t.map(e=>e.cleanCumulative)},{name:"Debt-driven",className:"debt",values:t.map(e=>e.debtCumulative)}],{x:"Months",y:"Features"})}</div>`,Pw={name:"technical-debt",summary:"what shortcuts cost, compounded: two teams build the same features, one of them cutting corners",parameters:[{name:"base-time",label:"Base time",description:"days a feature takes when it is done properly",min:1,max:30,step:1,initial:20,show:t=>`${t} days`},{name:"shortcuts",label:"Shortcuts",description:"percent of that time a shortcut saves, at first",min:0,max:90,step:5,initial:25,show:t=>`${t}%`},{name:"interest",label:"Interest",description:"percent dearer every shortcut feature makes the next one",min:0,max:100,step:1,initial:10,show:t=>`${t}%`},{name:"timeline",label:"Timeline",description:"months to look ahead",min:6,max:60,step:1,initial:24,show:t=>`${t} months`}],run(t){const e=Number(t.shortcuts),n=Number(t.interest),s=Number(t.timeline),a=Xi(t),{months:o,breakEvenMonth:r}=a,i=o[o.length-1],h=i?.cleanCumulative??0,c=i?.debtCumulative??0,l=h>0?(h-c)/h*100:0,d=Math.abs(l)<.1,u=d?"even":l>0?"loss":"gain",f=d?"≈0%":`${Math.abs(l).toFixed(1)}%`,m=r?`month ${r}`:"never",p=n===0?"With no interest there is no compound slowdown, and the shortcut simply wins. That is the one case that does not happen to real code.":r?`${e}% saved at first, ${n}% interest on every feature: clean development overtakes at month ${r}, and by month ${s} the shortcut road has delivered ${f} less.`:`${e}% saved at first, ${n}% interest on every feature: in ${s} months the clean road has not yet caught up. Give it longer, or raise the interest.`,w=[`<div class="clean"><strong>${h}</strong>clean features</div>`,`<div class="debt"><strong>${c}</strong>debt features</div>`,`<div><strong>${m}</strong>break-even</div>`,`<div><strong>${f}</strong>${u} on the shortcut road</div>`].join(""),g=xl([{name:"Clean",className:"clean",values:o.slice(1).map(b=>b.cleanMonthly)},{name:"Debt-driven",className:"debt",values:o.slice(1).map(b=>b.debtMonthly)}],{x:"Months",y:"Features a month"});return{text:`clean ${h} features, debt-driven ${c}, break-even ${m}
${p}`,html:`<div class="figures">${w}</div><div class="charts">${Zi(a)}<div class="chart"><h4>Monthly delivery rate</h4>${g}</div></div><p>${p}</p>`,data:{cleanFeatures:h,debtFeatures:c,breakEvenMonth:r,months:o}}},glance:t=>Zi(Xi(t))},Rw={name:"technical-debt",programs:[Pw]},Bw="theme";function fc(){const t=document.documentElement,e=t.dataset.pageTheme;let n=null;try{n=localStorage.getItem(Bw)}catch{n=null}const s=e??(n==="light"||n==="dark"||n==="pink"?n:null);s?t.dataset.theme=s:delete t.dataset.theme}function An(...t){return t.map(e=>e.replace(/^[a-z]+:\/\//,"").replace(/^\/+|\/+$/g,"")).filter(Boolean).join("-")}const Fw=1e4,ko=[];let gn=null;function Qi(){const t=window.goatcounter?.count;if(!t)return!1;for(const e of ko.splice(0))t({path:e,title:e,event:!0});return!0}function In(t){if(ko.push(t),Qi()||gn)return;const e=Date.now();gn=setInterval(()=>{(Qi()||Date.now()-e>Fw)&&(gn&&clearInterval(gn),gn=null,ko.splice(0))},250)}const $o="theme";function Dw(){return window.matchMedia("(prefers-color-scheme: dark)").matches}function Hw(){let t=null;try{t=localStorage.getItem($o)}catch{t=document.documentElement.dataset.theme??null}return t==="light"||t==="dark"?t:t==="pink"?"light":Dw()?"dark":"light"}class Ww{apply(e){const n=e==="toggle"?Hw()==="dark"?"light":"dark":e;try{n==="system"?localStorage.removeItem($o):localStorage.setItem($o,n)}catch{}return fc(),In(An("theme","set",n)),n}}function qw(){let t=null;try{t=localStorage.getItem("theme")}catch{}In(An("theme","start",t??"system"))}function zw(t){const e=document.querySelector(".theme-toggle");return e?(e.classList.add("ready"),e.removeAttribute("aria-hidden"),e.removeAttribute("tabindex"),e.addEventListener("click",t),()=>e.removeEventListener("click",t)):()=>{}}const xo=["light","dark","system","pink"];function _w(t){return xo.includes(t)}const Gw={light:"☀︎",dark:"☾︎",system:"◐︎",pink:"❀︎"};function eh(t){const e=n=>`${Gw[n]} ${n}`;return{text:`theme   ${xo.map(n=>n===t?`[${e(n)}]`:e(n)).join("   ")}`,html:`<pre class="choices">theme   ${xo.map(n=>n===t?`<strong aria-current="true">${e(n)}</strong>`:`<a href="#" data-run="theme ${n}" title="theme ${n}">${e(n)}</a>`).join("   ")}</pre>`}}function Yw(t){return{name:"theme",usage:"theme [light|dark|system|pink|auto]",description:"switch the colours, or toggle them",run({site:e,cwd:n},[s]){const a=e.at(n)?.fields.theme;if(a)return{text:`theme: this page keeps its own, ${a}. It works everywhere else.`,error:!0};if(s===void 0)return eh(t.apply("toggle"));const o=s==="auto"?"system":s;return _w(o)?eh(t.apply(o)):{text:`theme: ${s}: choose light, dark, system or pink`,error:!0}}}}const Uw={name:"theme",commands:[Yw(new Ww)],install:t=>(qw(),zw(()=>t.run("theme"))),arrive:()=>fc()},th=[{machine:"small",algorithm:"pairs",vertices:8,graphs:150,serial:42.43,openmp:14.34,cuda:2.572},{machine:"small",algorithm:"pairs",vertices:16,graphs:150,serial:738.92,openmp:247.95,cuda:33.06},{machine:"small",algorithm:"pairs",vertices:24,graphs:150,serial:4387.13,openmp:1208.97,cuda:109.093},{machine:"large",algorithm:"pairs",vertices:8,graphs:150,serial:7.483,openmp:1.511,cuda:.653},{machine:"large",algorithm:"pairs",vertices:16,graphs:150,serial:135.505,openmp:25.061,cuda:5.24},{machine:"large",algorithm:"pairs",vertices:24,graphs:150,serial:515.757,openmp:126.228,cuda:18.99},{machine:"small",algorithm:"common-labelling",vertices:8,graphs:50,serial:843.21,openmp:214.51,cuda:33.404},{machine:"small",algorithm:"common-labelling",vertices:16,graphs:50,serial:17061.4,openmp:4284.01,cuda:550.153},{machine:"small",algorithm:"common-labelling",vertices:24,graphs:50,serial:71670.13,openmp:20274.32,cuda:2332.076}],Jw={small:"Intel Atom 330, 2 cores, 8 W · NVIDIA 9400M, 16 cores, 10 W",large:"Intel i7 950, 4 cores, 130 W · NVIDIA GT 430, 96 cores, 49 W"},Kw={pairs:t=>`Matching every pair of ${t} graphs`,"common-labelling":t=>`Finding one labelling common to ${t} graphs`};function Ua(t){if(t<10)return`${t.toFixed(1)} s`;if(t<60)return`${Math.round(t)} s`;const e=Math.floor(t/60);return e<60?e<10?`${e} min ${Math.round(t-e*60)} s`:`${Math.round(t/60)} min`:`${Math.floor(e/60)} h ${e%60} min`}const Vw=t=>`×${t>=10?Math.round(t):t.toFixed(1)}`;function nh(t){const e=Math.max(...t.map(a=>a.serial/a.cuda)),n=(a,o)=>`<span class="bar ${o}" style="--p:${(a/e).toFixed(3)}"></span><span class="factor">${Vw(a)}</span>`;return`<figure class="runs"><table class="runs"><thead><tr><th>each graph has</th><th>one thread</th><th>OpenMP, every core</th><th>CUDA, the graphics card</th></tr></thead>${[...new Set(t.map(a=>`${a.algorithm}/${a.machine}`))].map(a=>{const o=t.filter(c=>`${c.algorithm}/${c.machine}`===a),{algorithm:r,machine:i}=o[0],h=o.map(c=>`<tr><th scope="row">${c.vertices} vertices</th><td>${Ua(c.serial)}</td><td>${Ua(c.openmp)}<div class="speedup">${n(c.serial/c.openmp,"openmp")}</div></td><td>${Ua(c.cuda)}<div class="speedup">${n(c.serial/c.cuda,"cuda")}</div></td></tr>`).join("");return`<tbody><tr class="group"><th colspan="4">${Kw[r](o[0]?.graphs??0)}<span>${Jw[i]}</span></th></tr>${h}</tbody>`}).join("")}</table><figcaption>Measured in 2011, on graphs of the GREC dataset. Each bar is how many times faster than one thread of the same machine, and all the bars are on one scale.</figcaption></figure>`}const Xw={name:"thesis-results",stills:{"graph-matching-runs":()=>nh(th)},apps:{"graph-matching-runs":t=>{t.firstChild||(t.innerHTML=nh(th))}}},To={variable:"tn",atLeast:!0,threshold:20,months:[0,1,2,3,4,5,6,7,8,9,10,11]};function Zw(t,e){const n=t.map(({value:m})=>m),s=Math.floor(Math.min(...n,...(e.spans??[]).map(({value:m})=>m))),a=Math.ceil(Math.max(...n,s+1)),o=yl(t.map(({year:m})=>m),s,a),{x:r,y:i,slot:h}=o,c=m=>r(m)+h/2,l=[];for(const m of t){const p=l[l.length-1];p&&p[p.length-1]?.year===m.year-1?p.push(m):l.push([m])}const d=l.map(m=>`<polyline class="line" points="${m.map(({year:p,value:w})=>`${T(c(p))},${T(i(w))}`).join(" ")}"/>`).join(""),u=t.map(({year:m,value:p,title:w,partial:g})=>`<circle class="dot${g?" partial":""}" cx="${T(c(m))}" cy="${T(i(p))}" r="3.5"><title>${w}</title></circle>`).join(""),f=o.levels(e.spans??[]);return o.wrap(e.label,`${d}${u}${f}`)}function Qw(t,{threshold:e,atLeast:n},s){if(!t)return 0;const[a=0,...o]=t;return o.reduce((r,i,h)=>a+h*s>=e-1e-9===n?r+i:r,0)}const Yt={tn:{code:1002,unit:"°C",name:"daily minimum",summary:"mean",bin:.5,range:[-30,35]},tx:{code:1001,unit:"°C",name:"daily maximum",summary:"mean",bin:.5,range:[-25,50]},pp:{code:1300,unit:"mm",name:"daily rain",summary:"sum",bin:.5,range:[0,250]},pi:{code:1303,unit:"mm/h",name:"most rain in one hour",summary:"max",bin:.5,range:[0,100]}},ey=.95,ty=(t,e)=>new Date(Date.UTC(t,e+1,0)).getUTCDate(),Ue=t=>t.reduce((e,n)=>e+n,0);function ny(t,e){return t.length===0?null:e==="sum"?Ue(t.map(({figure:n})=>n)):e==="max"?Math.max(...t.map(({figure:n})=>n)):Ue(t.map(({figure:n,weight:s})=>n*s))/Ue(t.map(({weight:n})=>n))}function sy(t,e){const n=Yt[e.variable];return Object.entries(t.years).flatMap(([s,a])=>{const o=a[e.variable];if(!o)return[];const r=Number(s),i=o.months.map(m=>({days:Qw(m,e,n.bin),measured:Ue(m?.slice(1)??[])})),h=m=>e.months.includes(m),c=Ue(i.filter((m,p)=>h(p)).map(m=>m.measured)),l=Ue(e.months.map(m=>ty(r,m))),d=Ue(i.filter((m,p)=>h(p)).map(m=>m.days)),u=o.summaries.flatMap((m,p)=>h(p)&&m!==null?[{figure:m,weight:i[p]?.measured??0}]:[]),f=ny(u,n.summary);return[{year:r,days:d,elsewhere:Ue(i.map(m=>m.days))-d,measured:c,expected:l,whole:c/l>=ey,summary:f,months:i}]}).sort((s,a)=>s.year-a.year)}const sh=["January","February","March","April","May","June","July","August","September","October","November","December"];function ah(t){const{name:e,unit:n}=Yt[t.variable],s=t.variable==="pi"?"":"a ",a=t.atLeast?`of ${t.threshold} ${n} or more`:`below ${t.threshold} ${n}`,o=sh[t.months[0]??0],r=sh[t.months[t.months.length-1]??11],i=t.months.length===12?"whole year":`${o} to ${r}`;return`days with ${s}${e} ${a}, ${i}`}const pc=["January","February","March","April","May","June","July","August","September","October","November","December"],ay=.55;function oy(t,e,{days:n,measured:s}){const a=`${pc[e]} ${t}`;if(s===0)return`<td class="none" title="${a}: not measured"></td>`;const o=Math.round(n/s*1e3)/1e3;return`<td${o>=ay?' class="deep"':""} style="--v:${o}" title="${a}: ${n} of ${s} days">${n||""}</td>`}function ry(t,e){const n=`<tr><th></th>${pc.map(a=>`<th scope="col">${a.slice(0,3)}</th>`).join("")}</tr>`,s=[...t].reverse().map(({year:a,months:o})=>`<tr><th scope="row">${a}</th>${o.map((r,i)=>oy(a,i,r)).join("")}</tr>`);return`<table class="heat calendar${e?" warm":""}"><thead>${n}</thead><tbody>${s.join("")}</tbody></table>`}const oh=t=>t.reduce((e,n)=>e+n,0)/t.length;function rh(t){const e=t.flatMap(({summary:n})=>n===null?[]:[n]);return{from:t[0]?.year??0,to:t[t.length-1]?.year??0,years:t.length,days:oh(t.map(({days:n})=>n)),summary:e.length?oh(e):null}}function iy(t){const e=t.filter(s=>s.whole);if(e.length<4)return null;const n=Math.floor(e.length/2);return[rh(e.slice(0,n)),rh(e.slice(n))]}const hy=["January","February","March","April","May","June","July","August","September","October","November","December"],ly={mean:"The mean",sum:"The total",max:"The highest"},Sn=t=>String(Math.round(t*10)/10),cy=t=>`${t>0?"+":t<0?"−":""}${Sn(Math.abs(t))}`,dy=t=>`${Number(t.slice(8,10))} ${hy[Number(t.slice(5,7))-1]} ${t.slice(0,4)}`;function uy(t,e){const{unit:n,name:s}=Yt[e.variable],a=Object.values(t.years).flatMap(i=>i[e.variable]?[i[e.variable].record]:[]),[o,r]=e.atLeast?a.map(([i,h])=>[i,h]).reduce((i,h)=>h[0]>i[0]?h:i):a.map(([,,i,h])=>[i,h]).reduce((i,h)=>h[0]<i[0]?h:i);return`<p class="record">The ${e.atLeast?"highest":"lowest"} ${s} on record here: ${o} ${n} on ${dy(r)}, whatever months are chosen.</p>`}function gc(t,e){const n=Yt[e.variable],s=`<figcaption><strong>${t.name}</strong> · ${t.altitude} m, ${t.setting} · ${ah(e)}</figcaption>`,a=sy(t,e);if(a.length===0)return`<figure class="weather">${s}<p>This station has no ${n.name} on record.</p></figure>`;const o=iy(a),r=({from:m,to:p})=>`${m}–${p}`,i=o?'<div class="figures">'+o.map(m=>`<div><strong>${Sn(m.days)}</strong>days a year, ${r(m)}</div>`).join("")+`<div><strong>${cy(o[1].days-o[0].days)}</strong>days a year, from one half to the other</div></div>`:"",h=a.map(({year:m,days:p,elsewhere:w,measured:g,expected:b,whole:v})=>{const k=w>0?`, and ${w} more outside the months chosen`:"",S=v?"":`, with only ${g} of ${b} days measured`;return{year:m,value:p,partial:!v,title:`${m}: ${p} days${S}${k}`}}),c=(o??[]).map(m=>({from:m.from,to:m.to,value:m.days,label:`${Sn(m.days)} a year`})),l=a.flatMap(({year:m,summary:p,whole:w})=>p===null||!w?[]:[{year:m,value:p,title:`${m}: ${Sn(p)} ${n.unit}`}]),d=(o??[]).flatMap(m=>m.summary===null?[]:[{from:m.from,to:m.to,value:m.summary,label:`${Sn(m.summary)} ${n.unit}`}]),u=`${ly[n.summary]} ${n.name} of each year, ${n.unit}`,f=(n.summary==="mean"?Zw:ho)(l,{label:u,spans:d});return`<figure class="weather">${s}${i}<h4>Days a year</h4>${ho(h,{label:`Days a year: ${ah(e)}`,spans:c})}<h4>When in the year they fell</h4>${ry(a,e.atLeast&&n.unit==="°C")}<h4>${u}, in the months chosen</h4>${f}`+uy(t,e)+"</figure>"}const ih=[{id:"tropical-nights",name:"tropical nights",variable:"tn",atLeast:!0,threshold:20},{id:"torrid-nights",name:"torrid nights",variable:"tn",atLeast:!0,threshold:25},{id:"hot-days",name:"hot days",variable:"tx",atLeast:!0,threshold:30},{id:"torrid-days",name:"torrid days",variable:"tx",atLeast:!0,threshold:35},{id:"frost-days",name:"frost days",variable:"tn",atLeast:!1,threshold:0},{id:"rainy-days",name:"rainy days",variable:"pp",atLeast:!0,threshold:1},{id:"heavy-rain",name:"days of heavy rain",variable:"pp",atLeast:!0,threshold:20},{id:"downpours",name:"days with a downpour",variable:"pi",atLeast:!0,threshold:10}],Ht=[{code:"WU",name:"Badalona - Museu",municipality:"Badalona",altitude:42,setting:"urban, by the sea"},{code:"X4",name:"Barcelona - el Raval",municipality:"Barcelona",altitude:33,setting:"dense city, on a roof"},{code:"X8",name:"Barcelona - Zona Universitària",municipality:"Barcelona",altitude:82,setting:"city edge"},{code:"D5",name:"Barcelona - Observatori Fabra",municipality:"Barcelona",altitude:410,setting:"wooded hill above the city"},{code:"UP",name:"Cabrils",municipality:"Cabrils",altitude:81,setting:"coastal slope, half rural"},{code:"XF",name:"Sabadell - Parc Agrari",municipality:"Sabadell",altitude:259,setting:"farmland beside a city"},{code:"XJ",name:"Girona",municipality:"Girona",altitude:72,setting:"market gardens by the city"},{code:"XE",name:"Tarragona - Complex Educatiu",municipality:"Tarragona",altitude:6,setting:"coast"},{code:"VK",name:"Raimat",municipality:"Lleida",altitude:286,setting:"inland plain, vineyards"}],hh=[["whole year",[0,1,2,3,4,5,6,7,8,9,10,11]],["June to August",[5,6,7]],["May to October",[4,5,6,7,8,9]],["December to February",[0,1,11]]],my={tn:[-10,30],tx:[0,45],pp:[.5,100],pi:[.5,60]};function fy(t){const e=new Map,n=Fo(t,"/data/weather/index.json"),s=y("div");s.append(...t.querySelectorAll("figure"));let a=null,o=To,r=!1;const i=(g,b)=>y("option",{value:g},b),h=y("select",{onchange:()=>{p(h.value)}},...Ht.map(({code:g,name:b})=>i(g,b))),c=y("select",{onchange:()=>{const g=ih.find(({id:b})=>b===c.value);g&&m({variable:g.variable,atLeast:g.atLeast,threshold:g.threshold})}},...ih.map(({id:g,name:b})=>i(g,b))),l=y("select",{onchange:()=>m({months:hh[Number(l.value)]?.[1]??To.months})},...hh.map(([g],b)=>i(b,g))),d=y("output"),u=y("input",{type:"range",step:.5,oninput:()=>m({threshold:Number(u.value)})});function f(){const[g,b]=my[o.variable];u.min=String(g),u.max=String(b),u.value=String(o.threshold),d.textContent=`${o.atLeast?"":"below "}${o.threshold} ${Yt[o.variable].unit}${o.atLeast?" or more":""}`,a&&(s.innerHTML=gc(a,o))}function m(g){o={...o,...g},f()}async function p(g){const b=e.get(g)??fetch(`/data/weather/${g}.json`).then(v=>v.json());e.set(g,b);try{const v=await b;if(r||h.value!==g)return;a=v,f()}catch{e.delete(g),s.replaceChildren(y("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}const w=y("div",{class:"dials"},y("label",{},"Station",h),y("label",{},"Counting",c),y("label",{},"Threshold: ",d,u),y("label",{},"Months",l));return t.replaceChildren(w,s,n),p(h.value),()=>{r=!0}}function py(t,e,[n,s]){if(t.length===0)return null;const a=Math.round((s-n)/e),o=new Map;for(const c of t){const l=Math.min(a-1,Math.max(0,Math.floor((c-n)/e+1e-9)));o.set(l,(o.get(l)??0)+1)}const r=Math.min(...o.keys()),i=Math.max(...o.keys());return[Math.round((n+r*e)*1e3)/1e3,...Array.from({length:i-r+1},(c,l)=>o.get(r+l)??0)]}const lh="7bvh-jvq2",wc=5e4,ch=Object.entries(Yt),gy="No representatiu",wy=["Representatiu",""],yy=(t,e)=>Math.round(t*10**e)/10**e;function by(t,e){if(t.length===0)return null;if(e==="max")return Math.max(...t);const n=t.reduce((s,a)=>s+a,0);return yy(e==="sum"?n:n/t.length,2)}function vy(t,e){const n=Array.from({length:12},(o,r)=>t.filter(({date:i})=>Number(i.slice(5,7))===r+1).map(({value:i})=>i)),s=t.reduce((o,r)=>r.value>o.value?r:o),a=t.reduce((o,r)=>r.value<o.value?r:o);return{months:n.map(o=>py(o,e.bin,e.range)),summaries:n.map(o=>by(o,e.summary)),record:[s.value,s.date,a.value,a.date]}}function ky(t){if(!Array.isArray(t))throw new Error("the portal did not answer with rows");if(t.length>=wc)throw new Error("the answer was cut short at the limit");const e=t;if(!e.some(a=>a.data_lectura?.slice(5,7)==="12"))throw new Error("the year does not reach December yet");const n=new Map,s=new Set;for(const a of e){const o=a.estat??"";if(o===gy)continue;if(!wy.includes(o))throw new Error(`the network marks days as "${o}", which nobody has decided how to read`);const r=a.data_lectura?.slice(0,10)??"",i=`${a.codi_estacio}/${a.codi_variable}`;if(s.has(`${i}/${r}`))throw new Error(`${i} has ${r} twice`);s.add(`${i}/${r}`);const h=Number(a.valor);Number.isFinite(h)&&n.set(i,[...n.get(i)??[],{date:r,value:h}])}return n}const $y={name:"weather",directory:"public/data/weather",firstYear:1988,files:Ht.map(t=>`${t.code}.json`),about:{measures:"daily minimum and maximum temperature, daily rain, most rain in one hour",network:"Xarxa d'Estacions Meteorològiques Automàtiques (XEMA)",attribution:"Servei Meteorològic de Catalunya (XEMA). Dades obertes de la Generalitat de Catalunya.",dataset:`https://analisi.transparenciacatalunya.cat/d/${lh}`,stations:Ht},requestsFor(t){const e=Ht.map(s=>`'${s.code}'`).join(","),n=ch.map(([,s])=>s.code).join(",");return[vl(lh,{select:"codi_estacio,codi_variable,data_lectura,valor,estat",where:`codi_estacio in (${e}) and codi_variable in (${n}) and data_lectura between '${t}-01-01T00:00:00' and '${t}-12-31T23:59:59'`,limit:wc})]},withYear(t,e,n){const s=ky(n[0]);return Object.fromEntries(Ht.map(a=>{const o=`${a.code}.json`,r=ch.flatMap(([c,l])=>{const d=s.get(`${a.code}/${l.code}`);return d?[[c,vy(d,l)]]:[]}),i=Object.fromEntries(r),h={...t[o]?.years,...r.length?{[e]:i}:{}};return[o,{...a,years:h}]}))}},xy=t=>{const e=JSON.parse(t(`/data/weather/${Ht[0]?.code}.json`)),n=JSON.parse(t("/data/weather/index.json"));return gc(e,To)+Ks(n)},Ty={name:"weather",apps:{weather:fy},stills:{weather:xy},sources:[$y]},So=new dl,Ja="header-world",As={saved(){try{const t=localStorage.getItem(Ja);if(!t)return null;const e=JSON.parse(t);return[e.seed,e.levels,e.roughness,e.share].every(s=>typeof s=="number"&&Number.isFinite(s))?e:null}catch{return null}},remember(t){try{localStorage.setItem(Ja,JSON.stringify(t))}catch{}},forget(){try{localStorage.removeItem(Ja)}catch{}}};function yc(t,e,n){const s=t.mesh.faces[n*3]??0,a=t.mesh.faces[n*3+1]??0,o=t.mesh.faces[n*3+2]??0;return((e[s]??0)+(e[a]??0)+(e[o]??0))/3}function Sy(t,e){return yc(t,t.mesh.radii,e)}const My=[24,92,168],Ay=[62,176,206],Iy=[214,196,138],dh=[190,158,84],Ka=[70,138,66],Ey=[74,104,76],Oy=[136,128,116],uh=[238,243,247];function ft(t,e,n){const s=Math.min(1,Math.max(0,n));return[t[0]+(e[0]-t[0])*s,t[1]+(e[1]-t[1])*s,t[2]+(e[2]-t[2])*s]}function Cy(t){return t>.78?dh:t>.62?ft(Ka,dh,(t-.62)/.16):t>.3?Ka:ft(Ey,Ka,(t-.12)*5.5)}const bc=t=>{const e=new Uint8ClampedArray(t.mesh.faceCount*3),n=t.mesh.radii.reduce((a,o)=>Math.max(a,o),-1/0),s=Math.max(1e-6,n-t.seaRadius);for(let a=0;a<t.mesh.faceCount;a+=1){const o=(Sy(t,a)-t.seaRadius)/s,r=yc(t,t.temperature,a);let i;o<=.002?(i=ft(Ay,My,.55),r<.16&&(i=ft(i,uh,(.16-r)*6))):(i=ft(Iy,Cy(r),Math.min(1,o*9)),i=ft(i,Oy,Math.max(0,o-.55)*2.2),r<.26&&(i=ft(i,uh,(.26-r)*4))),e[a*3]=i[0],e[a*3+1]=i[1],e[a*3+2]=i[2]}return{...t,faceColour:e}};function vc(t,e){const n=new Float32Array(t.length*3),s=new Float32Array(t.length),a=new Float32Array(t.length);t.forEach((r,i)=>{n[i*3]=r.direction[0],n[i*3+1]=r.direction[1],n[i*3+2]=r.direction[2],s[i]=r.radius,a[i]=r.surface});const o=new Uint32Array(e.length*3);return e.forEach(([r,i,h],c)=>{o[c*3]=r,o[c*3+1]=i,o[c*3+2]=h}),{directions:n,radii:s,surface:a,faces:o,faceCount:e.length,vertexCount:t.length}}const jy=(t,e)=>(t+e)/2;function Ly(t,e,n=jy){const s=Array.from({length:t.vertexCount},(i,h)=>({direction:[t.directions[h*3]??0,t.directions[h*3+1]??0,t.directions[h*3+2]??0],radius:t.radii[h]??1,surface:t.surface[h]??0})),a=new Map,o=(i,h)=>{const c=i<h?`${i}:${h}`:`${h}:${i}`,l=a.get(c);if(l!==void 0)return l;const d=s[i],u=s[h],[f,m,p]=d.direction,[w,g,b]=u.direction,v=Math.hypot(f*d.radius-w*u.radius,m*d.radius-g*u.radius,p*d.radius-b*u.radius),[k,S,M]=[(f+w)/2,(m+g)/2,(p+b)/2],x=Math.hypot(k,S,M)||1,I=n(d.surface,u.surface);s.push({direction:[k/x,S/x,M/x],radius:(d.radius+u.radius)/2+e(v),surface:I});const L=s.length-1;return a.set(c,L),L},r=[];for(let i=0;i<t.faceCount;i+=1){const h=t.faces[i*3],c=t.faces[i*3+1],l=t.faces[i*3+2],d=o(h,c),u=o(c,l),f=o(l,h);r.push([h,d,f],[c,u,d],[l,f,u],[d,u,f])}return vc(s,r)}function Ny(t,e){return{...t,mesh:e,temperature:new Float32Array(e.vertexCount),faceColour:new Uint8ClampedArray(e.faceCount*3)}}const kc=(t=4,e=.28,n=.2)=>s=>{const a=Pn(s.seed);let o=s.mesh;const r=Float32Array.from(o.surface,()=>a());o={...o,surface:r};for(let i=0;i<t;i+=1)o=Ly(o,h=>h*e*(a()-.5),(h,c)=>{const l=.5+(a()-.5)*(h-c)*n;return Math.min(1,Math.max(0,h*(1-l)+c*l))});return Ny(s,o)},$c=(t=.55)=>e=>{const n=Float32Array.from(e.mesh.radii).sort(),s=Math.min(n.length-1,Math.floor(n.length*t)),a=n[s]??1,o=Float32Array.from(e.mesh.radii,r=>Math.max(r,a));return{...e,mesh:{...e.mesh,radii:o},seaRadius:a}};function Py(t,e){return Math.abs(t.mesh.directions[e*3+1]??0)}const xc=({equator:t=1,pole:e=.05,peak:n=0}={})=>s=>{const a=new Float32Array(s.mesh.vertexCount),o=s.mesh.radii,r=o.reduce((c,l)=>Math.min(c,l),1/0),h=o.reduce((c,l)=>Math.max(c,l),-1/0)-r||1;for(let c=0;c<s.mesh.vertexCount;c+=1){const l=((o[c]??1)-r)/h,d=Py(s,c)**2.2;a[c]=t+(e-t)*d+(n-t)*l}return{...s,temperature:a}},$e=(1+Math.sqrt(5))/2,Ry=[[-1,$e,0],[1,$e,0],[-1,-$e,0],[1,-$e,0],[0,-1,$e],[0,1,$e],[0,-1,-$e],[0,1,-$e],[$e,0,-1],[$e,0,1],[-$e,0,-1],[-$e,0,1]],By=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];function Fy(){const t=Ry.map(([e,n,s])=>{const a=Math.hypot(e,n,s);return{direction:[e/a,n/a,s/a],radius:1,surface:0}});return vc(t,By.map(e=>[...e]))}function Dy(t){const e=Fy();return{seed:t,mesh:e,temperature:new Float32Array(e.vertexCount),faceColour:new Uint8ClampedArray(e.faceCount*3),seaRadius:0}}const Hy=[kc(),$c(),xc(),bc];function Wy(t,e=Hy){return e.reduce((n,s)=>s(n),Dy(t))}function Tc(t){return Wy(t.seed,[kc(t.levels,t.roughness),$c(t.share),xc(),bc])}const mh=.3,qy=[-.5,.45,.74],zy=1.02;class Go{size;pixels;depth;view=new Float32Array(0);screen=new Float32Array(0);constructor(e,n=new Uint8ClampedArray(e*e*4)){if(n.length!==e*e*4)throw new Error(`SphereRaster: ${e}×${e} needs ${e*e*4} bytes, not ${n.length}`);this.size=e,this.pixels=n,this.depth=new Float32Array(e*e)}paint(e,n){const{size:s,pixels:a,depth:o}=this;a.fill(0),o.fill(-1/0);const[r,i,h]=_y(n.light??qy),c=n.tilt??-.38,l=Math.cos(c),d=Math.sin(c),u=Math.cos(n.rotation),f=Math.sin(n.rotation),{directions:m,radii:p,faces:w,faceCount:g,vertexCount:b}=e.mesh;let v=1;for(let x=0;x<b;x+=1){const I=p[x]??1;I>v&&(v=I)}const k=s/(2*v*zy);this.view.length<b*3&&(this.view=new Float32Array(b*3),this.screen=new Float32Array(b*3));const S=this.view,M=this.screen;for(let x=0;x<b;x+=1){const I=p[x]??1,L=(m[x*3]??0)*I,P=(m[x*3+1]??0)*I,C=(m[x*3+2]??0)*I,E=L*u-C*f,N=L*f+C*u,A=P*l+N*d,O=-P*d+N*l;S[x*3]=E,S[x*3+1]=A,S[x*3+2]=O,M[x*3]=s/2+E*k,M[x*3+1]=s/2-A*k,M[x*3+2]=O}for(let x=0;x<g;x+=1){const I=w[x*3]??0,L=w[x*3+1]??0,P=w[x*3+2]??0,C=M[I*3],E=M[I*3+1],N=M[I*3+2],A=M[L*3],O=M[L*3+1],W=M[L*3+2],_=M[P*3],q=M[P*3+1],G=M[P*3+2],te=(A-C)*(q-E)-(O-E)*(_-C);if(te>=0)continue;const Qe=S[I*3],Ut=S[I*3+1],qe=S[I*3+2],je=S[L*3]-Qe,Jt=S[L*3+1]-Ut,ye=S[L*3+2]-qe,vt=S[P*3]-Qe,kt=S[P*3+1]-Ut,$t=S[P*3+2]-qe,Rn=Jt*$t-ye*kt,xt=ye*vt-je*$t,et=je*kt-Jt*vt,Kt=Math.hypot(Rn,xt,et)||1,tt=Rn/Kt*r+xt/Kt*i+et/Kt*h,ze=mh+(1-mh)*Math.max(0,tt),Zs=(e.faceColour[x*3]??0)*ze,Tt=(e.faceColour[x*3+1]??0)*ze,Vt=(e.faceColour[x*3+2]??0)*ze,Qs=Math.max(0,Math.floor(Math.min(C,A,_))),ea=Math.min(s-1,Math.ceil(Math.max(C,A,_))),Bn=Math.max(0,Math.floor(Math.min(E,O,q))),Fn=Math.min(s-1,Math.ceil(Math.max(E,O,q)));for(let nt=Bn;nt<=Fn;nt+=1)for(let st=Qs;st<=ea;st+=1){const St=st+.5,at=nt+.5,Dn=(A-C)*(at-E)-(O-E)*(St-C),Xt=(_-A)*(at-O)-(q-O)*(St-A),Hn=(C-_)*(at-q)-(E-q)*(St-_);if(Dn>0||Xt>0||Hn>0)continue;const Zt=Xt/te,Mt=Hn/te,At=N*Zt+W*Mt+G*(1-Zt-Mt),Te=nt*s+st;At<=o[Te]||(o[Te]=At,a[Te*4]=Zs,a[Te*4+1]=Tt,a[Te*4+2]=Vt,a[Te*4+3]=255)}}return a}}function _y([t,e,n]){const s=Math.hypot(t,e,n)||1;return[t/s,e/s,n/s]}const Gy=.2,Yy=.36,Uy=[{upTo:20,dark:4,bright:12},{upTo:70,dark:6,bright:14},{upTo:160,dark:2,bright:10},{upTo:198,dark:3,bright:11},{upTo:275,dark:1,bright:9},{upTo:330,dark:5,bright:13},{upTo:360,dark:4,bright:12}];function Jy(t,e,n){const s=Math.max(t,e,n),a=Math.min(t,e,n),o=(s+a)/2/255;if((s===0?0:(s-a)/s)<Gy)return o<.08?0:o<.5?8:o<.8?7:15;const i=s-a;let h;s===t?h=(e-n)/i*60:s===e?h=(2+(n-t)/i)*60:h=(4+(t-e)/i)*60,h<0&&(h+=360);const c=Uy.find(({upTo:l})=>h<l)??{dark:4,bright:12};return o<.08?0:o>=Yy?c.bright:c.dark}function Ky(t,e){const n=(a,o)=>{const r=(o*e+a)*4;return(t[r+3]??0)===0?-1:Jy(t[r]??0,t[r+1]??0,t[r+2]??0)},s=[];for(let a=0;a<e/2;a+=1){const o=[];for(let r=0;r<e;r+=1)o.push({top:n(r,a*2),bottom:n(r,a*2+1)});s.push(o)}return s}const wn=["#000000","#0000aa","#00aa00","#00aaaa","#aa0000","#aa00aa","#aa5500","#aaaaaa","#555555","#5555ff","#55ff55","#55ffff","#ff5555","#ff55ff","#ffff55","#ffffff"];function Vy(t){const e=({top:n,bottom:s})=>n<0&&s<0?"<span> </span>":n<0?`<span style="color:${wn[s]}">▄</span>`:s<0?`<span style="color:${wn[n]}">▀</span>`:n===s?`<span style="color:${wn[n]}">█</span>`:`<span style="color:${wn[n]};background:${wn[s]}">▀</span>`;return t.map(n=>n.map(e).join("")).join(`
`)}const Mo={levels:4,roughness:.28,share:.55},yn=32;let Va=null,fh=null,Xa=null;function ph(t,e){const n=document.querySelector('link[rel="icon"]');if(!n)return;Va??=Object.assign(document.createElement("canvas"),{width:yn,height:yn});const s=Va.getContext("2d");s&&(Xa??=s.createImageData(yn,yn),fh??=new Go(yn,Xa.data),fh.paint(t,{rotation:e}),s.putImageData(Xa,0,0),n.type="image/png",n.href=Va.toDataURL("image/png"))}const Xy=90,Zy=1e3/12,Qy=400,Za=new WeakMap;function eb(t){const e=(t.textContent??"").split(`
`);return{columns:Math.max(...e.map(n=>n.length)),rows:e.length}}function Ao(t,e){Za.get(t)?.();const n=e??{...Mo,seed:Math.floor(Math.random()*16777215)},{columns:s,rows:a}=eb(t),o=Math.min(s,a*2),r=Tc(n),i=new Go(o);t.dataset.seed=String(n.seed),t.title=`World ${n.seed}, ${r.mesh.faceCount.toLocaleString("en")} triangles`;const h=w=>{t.innerHTML=Vy(Ky(i.paint(r,{rotation:w}),o)),t.classList.add("grown")};if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return h(.6),ph(r,.6),Za.set(t,()=>{}),()=>{};let c=0,l=-1/0,d=-1/0;const u=performance.now(),f=Us(t),m=w=>{const g=(w-u)/1e3/Xy*Math.PI*2;f.onScreen()&&w-l>=Zy&&(h(g),l=w),w-d>Qy&&(ph(r,g),d=w),c=requestAnimationFrame(m)};c=requestAnimationFrame(m);const p=()=>{cancelAnimationFrame(c),f.stop()};return Za.set(t,p),p}function tb(){const t=document.querySelector(".planet");return t?Ao(t,As.saved()??void 0):()=>{}}const Bt=360,nb=60,sb=1.4,gh=Math.PI*2/nb,wh=Math.PI*4;function ab(t){const e=y("canvas",{class:"world",width:Bt,height:Bt}),n=e.getContext("2d");if(!n)return()=>{};const s={...Mo,seed:Math.floor(Math.random()*16777215)},a=n.createImageData(Bt,Bt),o=new Go(Bt,a.data),r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let i,h=.6,c=-.38,l=!r,d=null,u=0,f=performance.now();const m=y("p",{class:"hint"}),p=document.querySelector(".planet"),w=(20*4**Mo.levels).toLocaleString("en"),g=()=>{i=Tc(s);const E=As.saved();m.textContent=`World ${s.seed}: ${i.mesh.faceCount.toLocaleString("en")} triangles. `+(E?`The header is keeping world ${E.seed}, ${(20*4**E.levels).toLocaleString("en")} triangles.`:`The header grows a new one every visit, ${w} triangles each.`),v.hidden=!E,k()},b=y("button",{type:"button",onclick:()=>{As.remember({...s}),p&&Ao(p,{...s}),g()}},"Put it in the header"),v=y("button",{type:"button",hidden:!0,onclick:()=>{As.forget(),p&&Ao(p),g()}},"Let the header grow its own"),k=()=>{o.paint(i,{rotation:h,tilt:c}),n.putImageData(a,0,0)};let S=0;const M=Us(e),x=E=>{const N=Math.min(.1,(E-f)/1e3);if(!d&&M.onScreen()){if(u!==0){u*=Math.exp(-N/sb);const A=l?gh:0;(Math.abs(u)<=A||Math.abs(u)<.01)&&(u=0)}u!==0?(h-=u*N,k()):l&&(h+=gh*N,k()),So.send({byRadians:u*N,tiltedBy:0,seconds:N})}f=E,S=requestAnimationFrame(x)};e.addEventListener("pointerdown",E=>{d={x:E.clientX,y:E.clientY,at:E.timeStamp},u=0,e.setPointerCapture(E.pointerId)}),e.addEventListener("pointermove",E=>{if(!d)return;const N=e.clientWidth||Bt,A=(E.clientX-d.x)/N*Math.PI;h-=A;const O=c;c=Math.max(-1.2,Math.min(1.2,c-(E.clientY-d.y)/N*Math.PI)),So.send({byRadians:A,tiltedBy:c-O,seconds:0});const W=Math.max(.004,(E.timeStamp-d.at)/1e3);u=Math.max(-wh,Math.min(wh,u*.4+A/W*.6)),d={x:E.clientX,y:E.clientY,at:E.timeStamp},k()}),e.addEventListener("pointerup",E=>{d&&E.timeStamp-d.at>120&&(u=0),d=null,f=performance.now()}),e.addEventListener("pointercancel",()=>{d=null,u=0});const I=y("input",{type:"number",min:0,value:s.seed,onchange:()=>{s.seed=Math.max(0,Math.floor(Number(I.value)||0)),g()}}),L=y("button",{type:"button",onclick:()=>{s.seed=Math.floor(Math.random()*16777215),I.value=String(s.seed),g()}},"Another world"),P=y("button",{type:"button",onclick:()=>{l=!l,P.textContent=l?"Hold still":"Turn"}},l?"Hold still":"Turn"),C=(E,N,A,O,W,_)=>{const q=y("output",{},_(s[E])),G=y("input",{type:"range",min:A,max:O,step:W,value:s[E],onchange:()=>{s[E]=Number(G.value),q.textContent=_(s[E]),g()},oninput:()=>{q.textContent=_(Number(G.value))}});return y("label",{},`${N}: `,q,G)};return t.append(e,y("div",{class:"row"},y("span",{},"Seed "),I,L,P,b,v),y("div",{class:"dials"},C("levels","Detail",2,6,1,E=>`${E} splits`),C("roughness","Roughness",.02,1,.01,E=>E.toFixed(2)),C("share","Sea",0,.98,.01,E=>`${Math.round(E*100)}%`)),m),g(),S=requestAnimationFrame(x),()=>{cancelAnimationFrame(S),M.stop()}}const ob={name:"world",apps:{worlds:ab},install:()=>tb()},mt=[ob,Uw,jw(So),Rw,df,vp,hf,Ty,Wp,Eg,Gp,Xw,Dm,cg,hp,Tp,jp,Wf,Cf,Yp,mm,Lg,Qg,aw,pw,$w,Aw];function rb(t){return Object.assign({},...t.flatMap(e=>e.programs??[]).map(e=>({[e.name]:Yl(e)})),...t.map(e=>e.apps??{}))}const yh="flags",bh="flags-chosen",vh="flags-drawn";function Qa(t){try{return localStorage.getItem(t)??""}catch{return""}}function eo(t,e){try{e?localStorage.setItem(t,e):localStorage.removeItem(t)}catch{}}class ib{on;picked;lots;constructor(){this.on=new Set((Qa(yh)||document.documentElement.dataset.flags||"").split(" ").filter(Boolean)),this.picked=new Set(Qa(bh).split(" ").filter(Boolean));let e={};try{e=JSON.parse(Qa(vh)||"{}")}catch{}this.lots=e}isOn(e){return this.on.has(e)}chosen(e){return this.picked.has(e)}drawn(e){return this.lots[e]}set(e,n){this.picked.add(e),delete this.lots[e],this.keep(e,n)}draw(e,n){this.lots[e]=n,this.keep(e,n)}keep(e,n){n?this.on.add(e):this.on.delete(e);const s=[...this.on].join(" ");eo(yh,s),eo(bh,[...this.picked].join(" ")),eo(vh,Object.keys(this.lots).length?JSON.stringify(this.lots):""),s?document.documentElement.dataset.flags=s:delete document.documentElement.dataset.flags}}function hb(){return[document,navigator].map(e=>e.modelContext).find(e=>typeof e?.registerTool=="function")}function kh(t,e){const n=[];for(const s of document.querySelectorAll(".app[data-app]")){const a=t[s.dataset.app??""]?.(s,e);a&&n.push(a)}return()=>{for(const s of n)s()}}function lb(t){const e={},n=t.fields.theme;(n==="dark"||n==="light")&&(e["data-page-theme"]=n);const s=t.fields.sky;return s&&(e["data-sky"]=s),e}const cb=["data-page-theme","data-sky"];function db(t,e){return e==="/"?t==="/":t.startsWith(e)}const Sc=7.8,$h=17,Mc=12,ub=8,to=28,xh=44,En=8,mb=40,fb=16;function pb(t){const e=new Map;for(const v of t.nodes){const k=v.label.split(`
`),S=Math.max(...k.map(M=>M.length),1);e.set(v.id,{id:v.id,label:v.label,real:!0,rank:-1,along:Math.max(40,S*Sc+Mc*2),across:k.length*$h+ub*2,pos:0,preds:[],succs:[]})}for(const v of t.edges)if(!e.has(v.from)||!e.has(v.to))throw new Error(`flow: edge ${v.from} --> ${v.to} names a node that is not there`);const n=gb(t),s={...t,edges:t.edges.map((v,k)=>n.has(k)?{...v,from:v.to,to:v.from}:v)};for(const v of s.edges){const k=e.get(v.from),S=e.get(v.to);k.succs.push(S),S.preds.push(k)}wb(e);const a=yb(e,s),o=bb(e);vb(o);const r=o.length,i=o.map(v=>Math.max($h,...v.map(k=>k.real?k.across:0))),h=[];let c=En;for(let v=0;v<r;v+=1)h.push(c),c+=(i[v]??0)+xh;const l=v=>(h[v.rank]??0)+((i[v.rank]??0)-(v.real?v.across:0))/2,d=Math.max(...[...e.values()].map(v=>v.pos+v.along))+En,u=c-xh+En,f=t.direction==="LR",m=(v,k)=>f?[k,v]:[v,k],p=[...e.values()].filter(v=>v.real).map(v=>{const[k,S]=m(v.pos,l(v));return{id:v.id,label:v.label,x:k,y:S,width:f?v.across:v.along,height:f?v.along:v.across}}),w=t.edges.map((v,k)=>{const S=a[k]??[],M=S[0],x=S[S.length-1];if(!M||!x)throw new Error("flow: an edge lost its ends");const I=t.edges.some(N=>N.from===v.to&&N.to===v.from),L=Math.min(mb,M.along/3,x.along/3),P=I?n.has(k)?L:-L:0,C=[m(M.pos+M.along/2+P,l(M)+M.across),...S.slice(1,-1).map(N=>m(N.pos+N.along/2,l(N)+(i[N.rank]??0)/2)),m(x.pos+x.along/2+P,l(x))],E=n.has(k)?C.reverse():C;return v.label===void 0?{from:v.from,to:v.to,points:E}:{from:v.from,to:v.to,label:v.label,points:E}}),[g,b]=m(d,u);return{direction:t.direction,width:g,height:b,nodes:p,edges:w}}function gb(t){const e=new Set,n=new Map,s=a=>{n.set(a,"walking"),t.edges.forEach((o,r)=>{o.from!==a||e.has(r)||(n.get(o.to)==="walking"?e.add(r):n.has(o.to)||s(o.to))}),n.set(a,"done")};for(const a of t.nodes)n.has(a.id)||s(a.id);return e}function wb(t){const e=new Set,n=s=>{if(s.rank>=0)return s.rank;if(e.has(s))throw new Error(`flow: there is a cycle through ${s.id}, and a flow has a direction`);return e.add(s),s.rank=s.preds.length===0?0:Math.max(...s.preds.map(n))+1,e.delete(s),s.rank};for(const s of t.values())n(s)}function yb(t,e){let n=0;return e.edges.map(s=>{const a=t.get(s.from),o=t.get(s.to);if(!a||!o)return[];const r=[a];let i=a;for(let h=a.rank+1;h<o.rank;h+=1){n+=1;const c={id:`\0${n}`,label:"",real:!1,rank:h,along:Math.max(fb,(s.label?.length??0)*Sc+Mc),across:0,pos:0,preds:[i],succs:[]};t.set(c.id,c),i.succs.push(c),r.push(c),i=c}return i!==a&&(i.succs.push(o),o.preds.push(i),a.succs.splice(a.succs.indexOf(o),1),o.preds.splice(o.preds.indexOf(a),1)),r.push(o),r})}function bb(t){const e=Math.max(...[...t.values()].map(r=>r.rank))+1,n=Array.from({length:e},()=>[]);for(const r of t.values())n[r.rank]?.push(r);const s=new Map,a=r=>r.forEach((i,h)=>s.set(i,h));n.forEach(a);const o=(r,i)=>i.length===0?s.get(r)??0:i.reduce((h,c)=>h+(s.get(c)??0),0)/i.length;for(let r=0;r<4;r+=1){for(let i=1;i<e;i+=1){const h=n[i]??[];h.sort((c,l)=>o(c,c.preds)-o(l,l.preds)),a(h)}for(let i=e-2;i>=0;i-=1){const h=n[i]??[];h.sort((c,l)=>o(c,c.succs)-o(l,l.succs)),a(h)}}return n}function vb(t){const e=r=>r.reduce((i,h)=>i+h.along,0)+to*Math.max(0,r.length-1),n=Math.max(...t.map(e));for(const r of t){let i=En+(n-e(r))/2;for(const h of r)h.pos=i,i+=h.along+to}const s=r=>r.pos+r.along/2,a=(r,i)=>{const h=r.map(d=>{const u=i(d);return u.length===0?s(d):u.reduce((f,m)=>f+s(m),0)/u.length});let c=-1/0;r.forEach((d,u)=>{d.pos=Math.max((h[u]??0)-d.along/2,c),c=d.pos+d.along+to});const l=r.reduce((d,u,f)=>d+s(u)-(h[f]??0),0)/Math.max(1,r.length);for(const d of r)d.pos-=l};for(let r=0;r<3;r+=1){for(let i=1;i<t.length;i+=1)a(t[i]??[],h=>h.preds);for(let i=t.length-2;i>=0;i-=1)a(t[i]??[],h=>h.succs)}const o=Math.min(...t.flat().map(r=>r.pos));for(const r of t.flat())r.pos+=En-o}const Io=/(\w[\w.-]*)(?:\[([^\]]*)\])?/,kb=new RegExp(`^${Io.source}\\s*-->(?:\\|([^|]*)\\|)?\\s*${Io.source}$`),$b=new RegExp(`^${Io.source}$`),xb=/^(?:flow\s+)?(TD|LR)$/i;function Tb(t){const e=new Map,n=[];let s="TD";const a=(i,h)=>{i&&(e.has(i)||e.set(i,i),h!==void 0&&e.set(i,h.replace(/\\n/g,`
`)))},o=t.split(`
`);let r=!0;return o.forEach((i,h)=>{const c=i.trim();if(c===""||c.startsWith("%"))return;if(r){r=!1;const u=xb.exec(c);if(u){s=u[1]?.toUpperCase()==="LR"?"LR":"TD";return}}const l=kb.exec(c);if(l){const[,u,f,m,p,w]=l;a(u,f),a(p,w),n.push(m===void 0?{from:u??"",to:p??""}:{from:u??"",to:p??"",label:m});return}const d=$b.exec(c);if(d){a(d[1],d[2]);return}throw new Error(`flow: cannot read line ${h+1}: "${c}"`)}),{direction:s,nodes:[...e].map(([i,h])=>({id:i,label:h})),edges:n}}const Sb=20,Th=17;function Mb(t){let e=5381;for(let n=0;n<t.length;n+=1)e=(e*33^t.charCodeAt(n))>>>0;return e.toString(36)}const ae=t=>String(Math.round(t*10)/10);function Ab(t,e){const[n,...s]=t.points;if(!n)return"";let a=`M${ae(n[0])},${ae(n[1])}`,o=n;for(const r of s){const[i,h]=o,[c,l]=r,d=e?[(i+c)/2,h]:[i,(h+l)/2],u=e?[(i+c)/2,l]:[c,(h+l)/2];a+=` C${ae(d[0])},${ae(d[1])} ${ae(u[0])},${ae(u[1])} ${ae(c)},${ae(l)}`,o=r}return a}function Ib(t){const{points:e}=t,n=e[Math.floor((e.length-1)/2)]??[0,0],s=e[Math.ceil((e.length-1)/2)]??n;return[(n[0]+s[0])/2,(n[1]+s[1])/2]}function Eb(t){const e=pb(Tb(t)),n=e.direction==="LR",s=`arrow-${Mb(t)}`,a=e.edges.map(h=>{const c=`<path class="edge" d="${Ab(h,n)}" marker-end="url(#${s})"/>`;if(h.label===void 0)return c;const[l,d]=Ib(h);return`${c}<text class="edge-label" x="${ae(l)}" y="${ae(d)}" text-anchor="middle" dominant-baseline="middle">${$(h.label)}</text>`}).join(""),o=e.nodes.map(h=>{const c=h.x+h.width/2,l=h.label.split(`
`),d=h.y+(h.height-l.length*Th)/2,u=l.map((f,m)=>`<tspan x="${ae(c)}" y="${ae(d+Sb-8+m*Th)}">${$(f)}</tspan>`).join("");return`<g class="node"><rect x="${ae(h.x)}" y="${ae(h.y)}" width="${ae(h.width)}" height="${ae(h.height)}" rx="4"/><text text-anchor="middle" dominant-baseline="middle">${u}</text></g>`}).join(""),r=ae(e.width),i=ae(e.height);return`<figure class="flow"><svg class="flow" viewBox="0 0 ${r} ${i}" width="${r}" height="${i}" style="max-width: 100%; height: auto" role="img"><defs><marker id="${s}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z"/></marker></defs>${a}${o}</svg></figure>`}const bn={">=":"≥","<=":"≤","!=":"≠","->":"→","...":"…","*":"·",star:"∗","-":"−","'":"′",cdot:"·",inf:"∞",alpha:"α",beta:"β",gamma:"γ",delta:"δ",epsilon:"ε",lambda:"λ",mu:"μ",pi:"π",sigma:"σ",tau:"τ",phi:"φ",omega:"ω",Delta:"Δ",Sigma:"Σ"},Sh={sum:"∑",prod:"∏",int:"∫"},Ob=new Set(["max","min","lim","log","ln","sin","cos","exp","arg"]);function Cb(t){const e=[],n=/\s+|\.\.\.|>=|<=|!=|->|\d+(?:\.\d+)?|[A-Za-z]+|[{}]|[_^]|./g;for(const[s]of t.matchAll(n))/^\s+$/.test(s)||(s==="{"||s==="}"?e.push({kind:"brace",text:s}):s==="_"||s==="^"?e.push({kind:"script",text:s}):/^\d/.test(s)?e.push({kind:"number",text:s}):/^[A-Za-z]/.test(s)?e.push({kind:"name",text:s}):e.push({kind:"sign",text:s}));return e}function jb(t){return t.split(`
`).map(e=>e.trim()).filter(Boolean).map(e=>`<math display="block"><mrow>${new Lb(Cb(e)).expression()}</mrow></math>`).join("")}class Lb{constructor(e){this.tokens=e}tokens;at=0;limits=!1;expression(){let e="";for(;this.at<this.tokens.length&&this.peek()?.text!=="}"&&this.peek()?.text!==")";)e+=this.item();return e}item(){let e=this.atom();const n=this.limits;this.limits=!1;let s=null,a=null;for(;this.peek()?.kind==="script";){const r=this.next().text,i=`<mrow>${this.group()}</mrow>`;r==="_"?s=i:a=i}const o=s&&a?n?"munderover":"msubsup":s?n?"munder":"msub":n?"mover":"msup";return!s&&!a?e:`<${o}>${e}${s??""}${a??""}</${o}>`}atom(){const e=this.next();if(e.kind==="brace"&&e.text==="{"){const n=this.expression();return this.expect("}"),`<mrow>${n}</mrow>`}if(e.text==="("){const n=this.expression();return this.peek()?.text===")"&&(this.at+=1),`<mrow><mo>(</mo>${n}<mo>)</mo></mrow>`}return e.kind==="number"?`<mn>${e.text}</mn>`:e.kind==="name"?e.text==="frac"?`<mfrac><mrow>${this.group()}</mrow><mrow>${this.group()}</mrow></mfrac>`:e.text==="sqrt"?`<msqrt>${this.group()}</msqrt>`:e.text==="text"?`<mtext>${$(this.phrase())}</mtext>`:e.text in Sh?(this.limits=!0,`<mo>${Sh[e.text]}</mo>`):Ob.has(e.text)?`<mo>${e.text}</mo>`:e.text in bn?/^[α-ωΑ-Ω]$/.test(bn[e.text])?`<mi>${bn[e.text]}</mi>`:`<mo>${bn[e.text]}</mo>`:`<mi>${$(e.text)}</mi>`:`<mo>${$(bn[e.text]??e.text)}</mo>`}group(){if(this.peek()?.text==="{"){this.next();const e=this.expression();return this.expect("}"),e}return this.atom()}phrase(){this.expect("{");const e=[];for(;this.at<this.tokens.length&&this.peek()?.text!=="}";)e.push(this.next().text);return this.expect("}"),e.join(" ")}peek(){return this.tokens[this.at]}next(){const e=this.tokens[this.at];if(!e)throw new Error("the formula ends early");return this.at+=1,e}expect(e){if(this.peek()?.text!==e)throw new Error(`expected ${e} in the formula`);this.at+=1}}function Nb(t,e){const s=/^https?:/.test(e)?' target="_blank" rel="noopener noreferrer"':"",a=/^\d+$/.test(t)?' class="ref"':"";return`<a href="${$(e)}"${s}${a}>${t}</a>`}const Pb=["large","wide","card"];function Rb(t,e,n){if(n==="card dark"){const o=e.replace(/(\.[a-z]+)$/,"-dark$1");return`<img src="${$(e)}" alt="${$(t)}" class="card shot-light" loading="lazy"><img src="${$(o)}" alt="${$(t)}" class="card shot-dark" loading="lazy">`}const s=n&&Pb.includes(n)?` class="${n}"`:"",a=n==="card"?' loading="lazy"':"";return`<img src="${$(e)}" alt="${$(t)}"${s}${a}>`}const Bb=/(`[^`]+`|!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)|\[[^[\]]+\]\([^)\s]+\))/g,Fb=/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/,Db=/^\[([^[\]]+)\]\(([^)\s]+)\)$/;function Ac(t){return t.split(Bb).map(e=>{if(e.startsWith("`")&&e.endsWith("`")&&e.length>1)return`<code>${$(e.slice(1,-1))}</code>`;const n=Fb.exec(e);if(n)return Rb(n[1]??"",n[2]??"",n[3]);const s=Db.exec(e);return s?Nb(Ac(s[1]??""),s[2]??""):$(e)}).join("")}function Hb(t){const e=[];return t.replace(/<code>[\s\S]*?<\/code>/g,s=>`\0${e.push(s)-1}\0`).replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/(^|[^*])\*([^*]+)\*/g,"$1<em>$2</em>").replace(/ {2,}\n/g,"<br>").replace(/\n/g," ").replace(/ -- /g," — ").replace(/\u0000(\d+)\u0000/g,(s,a)=>e[Number(a)]??"")}function We(t){return Hb(Ac(t))}function Wb(t){const e=t.split(`
`).map(f=>f.trim()).filter(Boolean),n=e.find(f=>!f.includes(" :: ")),s=e.filter(f=>f.includes(" :: ")).map(f=>{const m=f.indexOf(" :: ");return{left:f.slice(0,m).trim(),right:f.slice(m+4).trim()}}),a=s.filter(({left:f})=>f.startsWith("=")).map(({left:f,right:m})=>({value:Number(f.slice(1)),name:m})),o=s.filter(({left:f})=>!f.startsWith("=")).map(({left:f,right:m})=>{const[p="",w]=m.split("|").map(b=>b.trim()),g=Number(p.replace(/!$/,"").trim());return{label:f,value:g,shown:w??String(g),marked:p.endsWith("!")}}),r=Math.max(0,...o.map(({value:f})=>f),...a.map(({value:f})=>f))||1,i=f=>(Math.max(0,f)/r).toFixed(3),h=a[0],c=o.map(({label:f,value:m,shown:p,marked:w})=>`<tr${w?' class="marked"':""}><th scope="row">${We(f)}</th><td><span class="bar" style="--p:${i(m)}"></span><span class="value">${$(p)}</span></td></tr>`).join(""),l=h?` style="--rule:${i(h.value)}"`:"",d=h?` The line is ${$(h.name)}, at ${h.value}.`:"",u=n||h?`<figcaption>${n?We(n)+".":""}${d}</figcaption>`:"";return`<figure class="bars"><table${l}${h?' class="ruled"':""}><tbody>${c}</tbody></table>${u}</figure>`}function qb(t){return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}const Mh=/^(?:[-*]|\d+\.)\s/;function zb(t,e,n){if(!Mh.test(t[0]??""))return!1;const s=e.slice(n).find(a=>a.trim()!=="");return s!==void 0&&Mh.test(s)}function _b(t){const e=[],n=t.replace(/\r\n?/g,`
`).split(`
`);let s=[],a=!1;return n.forEach((o,r)=>{if(o.startsWith("```")){a=!a,s.push(o),a||(e.push(s),s=[]);return}if(!a&&o.trim()===""){if(zb(s,n,r+1))return;s.length&&e.push(s),s=[];return}s.push(o)}),s.length&&e.push(s),e}function Gb(t){const e=/^(#{1,4})\s+(.*)$/.exec(t[0]??"");if(!e||!t.slice(0,-1).every(o=>/ {2,}$/.test(o)))return null;const s=e[1]?.length??1,a=[e[2]??"",...t.slice(1)].join(`
`);return`<h${s} id="${qb(a)}">${We(a)}</h${s}>`}function Yb(t){if(!t[0]?.startsWith("```"))return null;const e=t[0].slice(3).trim(),n=t.slice(1,-1).join(`
`);return e==="flow"?Eb(n):e==="bars"?Wb(n):e==="math"?jb(n):e==="slides"||e.startsWith("slides ")?nc(n,e.slice(6).trim()):`<pre><code>${we(n,e)}</code></pre>`}function Ub(t,e){const n=[];for(const s of t)e.test(s)?n.push(s.replace(e,"")):n.length&&(n[n.length-1]+=`
${s.trim()}`);return n}function Jb(t){const e=t[0]??"",n=/^\d+\.\s/.test(e),s=/^[-*]\s/.test(e);if(!n&&!s)return null;const a=n?/^\d+\.\s+/:/^[-*]\s+/;if(!t.every(i=>a.test(i)||/^\s/.test(i)))return null;const o=n?"ol":"ul",r=Ub(t,a).map(i=>`<li>${We(i)}</li>`).join("");return`<${o}>${r}</${o}>`}function Kb(t){return t.every(n=>n.includes(" :: "))?`<dl>${t.map(n=>{const s=n.indexOf(" :: ");return[n.slice(0,s),n.slice(s+4)]}).map(([n,s])=>`<dt>${We(n)}</dt><dd>${We(s)}</dd>`).join("")}</dl>`:null}function Vb(t){if(!t.every(n=>n.startsWith(">")))return null;const e=t.map(n=>n.replace(/^>\s?/,"")).join(" ");return`<blockquote>${We(e)}</blockquote>`}function Xb(t){const e=/^::([a-z0-9-]+)((?:\s+--[a-z0-9-]+)*)$/.exec(t[0]??"");if(!e||t.length!==1)return null;const n=(e[2]??"").split(/\s+/).filter(Boolean).map(s=>s.slice(2));return`<div class="app" data-app="${e[1]}"${n.length?` data-dials="${n.join(" ")}"`:""}></div>`}function Zb(t){return t.length===1&&/^-{3,}$/.test(t[0]??"")?"<hr>":null}function Qb(t){const e=t.length===1&&/^(\\+)$/.exec(t[0]??"");return e?`<div class="space" style="--n:${e[1]?.length??1}"></div>`:null}function e0(t){return t.length===1&&/^!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)$/.test(t[0]??"")?`<figure>${We(t[0]??"")}</figure>`:null}function t0(t){return`<p>${We(t.join(`
`))}</p>`}const n0=[Zb,Qb,Gb,Yb,Vb,Xb,e0,Kb,Jb];function Ic(t){return _b(t).map(e=>{for(const n of n0){const s=n(e);if(s!==null)return s}return t0(e)}).join(`
`)}function Yo(t){return t==="/"?"~":`~${t.replace(/\/$/,"")}`}function Ec(t){return`<ul class="listing">${t.map(n=>`<li><a class="entry" href="${n.route}"><code>${$(n.name)}${n.link?"@":"/"}</code><span class="title">${$(n.title)}</span>`+(n.summary?`<span class="summary">${$(n.summary)}</span>`:"")+"</a></li>").join("")}</ul>`}function Oc(t,e){return`<p class="ran"><span class="ps1">${$(t)} $</span> ${$(e)}</p>`}function s0(t,e){const n=t.childrenOf(e.route);return n.length===0?"":`${Oc(Yo(e.route),"ls")}
${Ec(n)}`}function a0(t,e){const n=t.trailTo(e.route).slice(1).map(s=>s.name).join("/");return Oc("~",n?`cd ${n} && cat README.md`:"cat README.md")}function o0(t,e){return`${a0(t,e)}
${Ic(e.body)}
${s0(t,e)}`}function r0(t,e){const n=document.querySelector("main");if(!n)return()=>!1;const s=(a,{push:o=!0,keep:r=!1}={})=>{const i=t.at(a);if(!i)return!1;r||(n.innerHTML=o0(t,i));const h=lb(i);for(const c of cb){const l=h[c];l?document.documentElement.setAttribute(c,l):document.documentElement.removeAttribute(c)}document.title=i.route==="/"?"David Rodenas":`${i.title} — David Rodenas`;for(const c of document.querySelectorAll("nav .navlink"))db(a,c.getAttribute("href")??"\0")?c.setAttribute("aria-current","page"):c.removeAttribute("aria-current");return o&&(a===window.location.pathname?window.history.replaceState({route:a},"",a):window.history.pushState({route:a},"",a),r||window.scrollTo({top:0})),window.goatcounter?.count?.({path:a,title:document.title}),e(i,r),!0};return document.addEventListener("click",a=>{if(a.defaultPrevented||a.button!==0||a.metaKey||a.ctrlKey||a.shiftKey||a.altKey)return;const o=a.target?.closest("a[href]");if(!o||o.target||o.dataset.run)return;const r=new URL(o.href,window.location.href);if(r.origin!==window.location.origin)return;const i=r.pathname.endsWith("/")?r.pathname:`${r.pathname}/`;t.at(i)&&(a.preventDefault(),i!==window.location.pathname&&s(i))}),window.addEventListener("popstate",()=>{const a=window.location.pathname.endsWith("/")?window.location.pathname:`${window.location.pathname}/`;s(a,{push:!1})}),s}function Ah(t,e,n){for(let s=1;s<=Math.min(t.length,e.length)&&t.at(-s)===e.at(-s);s+=1)if(t.at(-s)===`
`)return[t.slice(0,-s),t.slice(-s)+e.slice(0,-s),e.slice(-s)+n];return[t,e,n]}function i0(t,e){let n=0;for(;n<t.length&&n<e.length&&t[n]===e[n];)n+=1;let s=0;for(;s<t.length-n&&s<e.length-n&&t[t.length-1-s]===e[e.length-1-s];)s+=1;let a=t.slice(0,n),o=t.slice(t.length-s),r=t.slice(n,t.length-s),i=e.slice(n,e.length-s);r?i||([a,r,o]=Ah(a,r,o)):[a,i,o]=Ah(a,i,o),n=a.length;const h=[];for(let c=r.length-1;c>=0;c-=1)h.push({text:a+r.slice(0,c)+o,caret:n+c});for(let c=1;c<=i.length;c+=1)h.push({text:a+i.slice(0,c)+o,caret:n+c});return h}const h0=32,l0=14,c0=450,d0=1900,u0=900,m0=160;function f0(t){const e=[],n=t[0]?.text??"";let s=n.length>m0?n:"";for(const a of t){for(const o of i0(s,a.text))e.push({...o,hold:o.text.length<s.length?l0:h0}),s=o.text;s=a.text,a.status?e.push({text:s,hold:c0},{text:s,status:a.status,hold:d0}):e.push({text:s,hold:u0})}return e}function p0(t){return[...t.querySelectorAll(".slide:not(.live)")].map(e=>{const n=e.querySelector("code")?.textContent??"",s=e.querySelector(".slide-status"),a=["red","green","note"].find(o=>s?.classList.contains(o));return s&&a?{text:n,status:{kind:a,text:s.textContent??""}}:{text:n}})}function g0(t){const e=t.dataset.language??"",n=p0(t),s=y("code"),a=y("p",{class:"slide-status",hidden:!0}),o=y("div",{class:"slide live"},y("pre",{},s),a),r=c=>{s.innerHTML=c.caret===void 0?we(c.text,e):`${we(c.text.slice(0,c.caret),e)}<span class="caret"></span>${we(c.text.slice(c.caret),e)}`,a.hidden=!c.status,c.status&&(a.className=`slide-status ${c.status.kind}`,a.textContent=c.status.text)},h=cc(t,()=>{o.isConnected||t.querySelector(".slides-screen")?.append(o),t.classList.add("playing");const c=f0(n);let l=0;return()=>{const d=c[l++];return d?(r(d),d.hold):null}});return()=>{h(),o.remove(),t.classList.remove("playing")}}function Ih(t){const e=[...t.querySelectorAll("figure.slides")].map(g0);return()=>{for(const n of e)n()}}class w0{typed=[];drafts=[];index=0;get lines(){return this.typed}add(e){this.typed.push(e),this.drafts=[...this.typed,""],this.index=this.typed.length}previous(e){return this.moveTo(this.index-1,e)}next(e){return this.moveTo(this.index+1,e)}moveTo(e,n){return this.drafts.length===0&&(this.drafts=[""]),e<0||e>=this.drafts.length?n:(this.drafts[this.index]=n,this.index=e,this.drafts[e]??n)}}function y0(t,e,n,s){if(t==="k"){const a=e.slice(n);return{line:e.slice(0,n),caret:n,killed:a||s}}if(t==="u"){const a=e.slice(0,n);return{line:e.slice(n),caret:0,killed:a||s}}return t==="y"?{line:e.slice(0,n)+s+e.slice(n),caret:n+s.length,killed:s}:null}function Cc(t){return t.split(/\s*(?:;|&&)\s*/).map(e=>e.trim().split(/\s+/).filter(Boolean)).filter(e=>e.length>0)}function wt(t,e){const s=e.startsWith("~")||e.startsWith("/")?[]:t.split("/").filter(Boolean),a=e.replace(/^~/,"").split("/").filter(Boolean),o=[...s];for(const r of a)r!=="."&&(r===".."?o.pop():o.push(r));return o.length===0?"/":`/${o.join("/")}/`}function b0(t){return t.replace(/(?:^|\/)(?:README\.md|\*)$/,"")||"."}const v0={name:"cat",usage:"cat <file>",description:"print a page, README.md or * for the one here",run({site:t,cwd:e},[n]){if(!n)return{text:"cat: usage: cat <file>",error:!0};const s=wt(e,b0(n)),a=t.at(s);return!a||/\.md$/.test(n)!==/README\.md$/.test(n)?{text:`cat: ${n}: no such file`,error:!0}:{html:Ic(a.body),at:a.route}}},k0={name:"cd",usage:"cd [dir]",description:"go to a directory (the address follows)",run(t,[e="~"]){const n=wt(t.cwd,e),s=t.site.at(n);return s?(t.cwd=s.route,{at:s.route}):{text:`cd: ${e}: no such directory`,error:!0}}},$0={name:"clear",usage:"clear",description:"clear what the shell has printed",run(){return{clear:!0}}},x0={name:"find",usage:"find [path] [word]",description:"every page under a directory; with a word, those it is in the name or title of, then those that say it",run({site:t,cwd:e},n){const[s,a]=n,o=s!==void 0&&(s==="."||s.includes("/")||t.at(wt(e,s))!==void 0),r=o?s??".":".",i=(o?a:s)?.toLowerCase(),h=wt(e,r);if(!t.at(h))return{text:`find: ${r}: no such directory`,error:!0};const c=w=>t.childrenOf(w).filter(g=>!g.link).flatMap(g=>[g,...c(g.route)]),l=[t.at(h),...c(h)],d=l.filter(w=>!i||w.route.toLowerCase().includes(i)||w.title.toLowerCase().includes(i)),u=i?l.filter(w=>!d.includes(w)&&`${w.summary}
${w.body}`.toLowerCase().includes(i)):[],f=[...d.map(w=>({page:w,said:""})),...u.map(w=>({page:w,said:" — in the text"}))];if(f.length===0)return{text:`find: nothing under ${r}${i?` with "${i}" in it`:""}`};const m=Math.max(...f.map(({page:w})=>w.route.length)),p=w=>" ".repeat(m-w.route.length);return{text:f.map(({page:w,said:g})=>`${w.route}${p(w)}  # ${w.title}${g}`).join(`
`),html:`<pre class="listing">${f.map(({page:w,said:g})=>`<span class="line"><a href="${$(w.route)}">${$(w.route)}</a>${p(w)}<span class="hint">  # ${$(w.title)}${g}</span></span>`).join("")}</pre>`}}},no=40,T0=t=>t.replace(/\]\([^)]*\)/g,"]").replace(/[#*_`>\[\]]/g,"").trim(),S0={name:"grep",usage:"grep <word> [path]",description:"the lines of every page under a directory that say a word",run({site:t,cwd:e},[n,s="."]){if(!n)return{text:"grep: usage: grep <word> [path]",error:!0};const a=wt(e,s);if(!t.at(a))return{text:`grep: ${s}: no such directory`,error:!0};const o=n.toLowerCase(),r=t.pages.filter(l=>l.route.startsWith(a)).flatMap(l=>l.body.split(`
`).map((d,u)=>({page:l,number:u+1,line:T0(d)})).filter(({line:d})=>d.toLowerCase().includes(o)));if(r.length===0)return{text:`grep: no page under ${s} says "${n}"`};const i=r.slice(0,no),h=r.length>no?[`… and ${r.length-no} more. Give grep a directory to look in.`]:[],c=l=>$(l).replace(new RegExp($(n).replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"ig"),d=>`<mark>${d}</mark>`);return{text:[...i.map(({page:l,number:d,line:u})=>`${l.route}:${d}: ${u}`),...h].join(`
`),html:`<pre class="listing wrap">${[...i.map(({page:l,number:d,line:u})=>`<span class="line"><a href="${$(l.route)}">${$(l.route)}</a>:${d}: <span class="hint">${c(u)}</span></span>`),...h.map(l=>`<span class="line">${$(l)}</span>`)].join("")}</pre>`}}},M0={name:"help",usage:"help [command]",description:"this",run({commands:t},[e]){if(e){const r=t.find(i=>i.name===e);return r?{text:`${r.usage}
  ${r.description}`}:{text:`help: ${e}: no such command`,error:!0}}const n=Math.max(...t.map(r=>r.usage.length)),s=t.map(r=>`${r.usage.padEnd(n)}  ${r.description}`),a="Tab completes; → takes the grey suggestion. ↑↓ recall. ^K kills to the end of the line, ^U back to the start, ^Y puts it back.",o=t.map(r=>`<dt><a href="#" data-run="help ${r.name}">${$(r.usage)}</a></dt><dd>${$(r.description)}</dd>`).join("");return{text:["Commands:",...s,"",a].join(`
`),html:`<p>Commands:</p><dl class="help">${o}</dl><p>${$(a)}</p>`}}};function A0(t){const e=t.filter(s=>s.startsWith("-")).flatMap(s=>s.slice(1).split("")),n=t.find(s=>!s.startsWith("-"))??".";return{flags:e,path:n}}function I0(t,e,n,s){const a=s==="."?"":`${s.replace(/\/$/,"")}/`;return[...e?[{mode:"dr-x",name:"..",title:e.title,summary:e.summary,href:e.route,run:`cd ${a}..`}]:[],{mode:"--r-",name:"README.md",title:t.title,summary:t.summary,href:t.route,run:`cat ${a}README.md`},...n.map(o=>o.link?{mode:"lr-x",name:`${o.name}@`,title:`-> ${o.route}  ${o.title}`,summary:o.summary,href:o.route}:{mode:"dr-x",name:`${o.name}/`,title:o.title,summary:o.summary,href:o.route})]}function Eh(t){const e=t.run?` data-run="${$(t.run)}"`:"";return`<a href="${$(t.href)}"${e}>${$(t.name)}</a>`}function E0(t,e){const n=Math.max(...t.map(i=>i.name.length)),s=i=>" ".repeat(n-i.length),a=i=>e?`${i.mode}  ${i.name}${s(i.name)}  ${i.title}${i.summary?` — ${i.summary}`:""}`:`${i.name}${s(i.name)}  # ${i.title}`,o=i=>e?`<span class="line">${i.mode}  ${Eh(i)}${s(i.name)}  ${$(i.title)}${i.summary?`<span class="hint"> — ${$(i.summary)}</span>`:""}</span>`:`<span class="line">${Eh(i)}${s(i.name)}<span class="hint">  # ${$(i.title)}</span></span>`,r=e?[`total ${t.length}`]:[];return{text:[...r,...t.map(a)].join(`
`),html:`<pre class="listing">${[...r.map(i=>`<span class="line">${i}</span>`),...t.map(o)].join("")}</pre>`}}const O0={name:"ls",usage:"ls [-lnrt] [path]",description:"what a directory holds, in the site's own order; -l says more, -n sorts by name, -r reverses, -t as the table at the end of a page",run({site:t,cwd:e},n){const{flags:s,path:a}=A0(n),o=s.find(l=>!["l","n","r","t"].includes(l));if(o)return{text:`ls: -${o}: no such option. Try ls -l, -n by name, -r reversed, -t as a table`,error:!0};const r=wt(e,a),i=t.at(r);if(!i)return{text:`ls: ${a}: no such directory`,error:!0};const h=i.parent===null?void 0:t.at(i.parent),c=[...t.childrenOf(r)];if(s.includes("n")&&c.sort((l,d)=>l.name.localeCompare(d.name)),s.includes("r")&&c.reverse(),s.includes("t")){const l=Math.max(0,...c.map(u=>u.name.length+1)),d=u=>`${u.name}${u.link?"@":"/"}`.padEnd(l);return{text:c.map(u=>`${d(u)}  ${u.title}${u.summary?` — ${u.summary}`:""}`).join(`
`),html:Ec(c)}}return E0(I0(i,h,c,a),s.includes("l"))}},C0={name:"pwd",usage:"pwd",description:"print where you are",run({cwd:t}){return{text:Yo(t)}}},jc=[O0,k0,v0,x0,S0,C0,M0,$0];class j0{context;constructor(e,n,s=jc){this.context={site:e,cwd:n,commands:s}}get prompt(){return`${Yo(this.context.cwd)} $`}moveTo(e){return this.context.site.at(e)?(this.context.cwd=e,!0):!1}run(e){const n=[];for(const[s="",...a]of Cc(e)){const o=this.context.commands.find(i=>i.name===s),r=o?o.run(this.context,a):{text:`${s}: command not found. Try help`,error:!0};if(n.push(r),r.error)break}return n}complete(e){const n=e.split(/\s+/),s=n.pop()??"",a=n.length===0?"":`${n.join(" ")} `;return(n.length===0?this.commandNames():this.pathNames(s)).filter(r=>r.startsWith(s)).map(r=>a+r)}commandNames(){return this.context.commands.map(e=>e.name).sort()}pathNames(e){const n=e.lastIndexOf("/"),s=n<0?".":e.slice(0,n+1),a=wt(this.context.cwd,s);if(!this.context.site.at(a))return[];const o=n<0?"":s;return["README.md",...this.context.site.childrenOf(a).map(i=>`${i.name}/`)].map(i=>o+i)}}function L0(t,e,n){if(t==="")return"help";const a=[...[...e].reverse(),...n].find(o=>o.startsWith(t)&&o!==t);return a?a.slice(t.length):""}function N0(t){if(t.length===0)return null;const e=[];let n="";for(const s of t)s==="Enter"?(e.push(n),n=""):s==="Backspace"?n=n.slice(0,-1):n+=s;return{finished:e,unfinished:n}}const so="shell-pending",Oh={carry(t){try{t&&sessionStorage.setItem(so,t)}catch{}},take(){try{const t=sessionStorage.getItem(so)??"";return sessionStorage.removeItem(so),t}catch{return""}}};function P0(){window.__stopTyped?.();const t=window.__typed??[];return window.__typed=[],N0(t)}function R0(t,e,n={}){const s=document.querySelector(".terminal"),a=document.querySelector(".screen"),o=s?.querySelector("form.prompt"),r=o?.querySelector("input"),i=o?.querySelector(".line"),h=o?.querySelector(".suggest"),c=o?.querySelector(".ps1"),l=document.querySelector(".ran.end"),d=l?.querySelector(".ps1"),u=l?.querySelector(".line"),f=l?.querySelector(".typed");if(!s||!a||!o||!r||!i||!h||!c||!l||!d||!u||!f)return null;const m=()=>{c.textContent=p.prompt,d.textContent=p.prompt},p=new j0(t,e,n.commands),w=new w0;let g=null;const b=A=>{a.append(A)},v=()=>{g?.remove(),g=null},k=()=>{const A=r.selectionStart??r.value.length;i.style.setProperty("--caret",String(A)),i.style.setProperty("--typed",String(r.value.length)),f.textContent=r.value,u.style.setProperty("--caret",String(A)),h.textContent=A===r.value.length?L0(r.value,w.lines,p.complete(r.value)):""},S=(A,O=A.length)=>{r.value=A,r.setSelectionRange(O,O),k()},M=A=>{if(A.clear&&(a.replaceChildren(),n.clearPage?.()),A.html){const O=y("div",{class:A.text?"listing-out":"cat"});O.innerHTML=A.html,b(O)}else A.text&&b(y("pre",{class:A.error?"error":""},A.text))},x=A=>{v();const O=[],W=y("p",{class:"echo"},y("span",{class:"ps1"},p.prompt),` ${A}`);b(W);let _=!1;const q=Cc(A).map(G=>G.join(" "));for(let G=0;G<q.length;G+=1){n.heard?.((q[G]??"").split(" ")[0]??"");const[te]=p.run(q[G]??"");if(te){if(O.push(te),M(te),te.html&&!te.text&&(_=!0),te.at&&!n.moveTo?.(te.at))return Oh.carry(q.slice(G+1).join(" && ")),window.location.assign(te.at),O;if(te.error)break}}return m(),k(),_?W.scrollIntoView({block:"start"}):window.scrollTo({top:document.documentElement.scrollHeight}),O},I=()=>{if(v(),r.value.trim()===""){S("help");return}const A=p.complete(r.value);A.length===1?S(A[0]??r.value):A.length>1&&(g=y("p",{class:"hint"},A.map(O=>O.split(" ").pop()).join("  ")),o.insertAdjacentElement("afterend",g),window.scrollTo({top:document.documentElement.scrollHeight}))};o.addEventListener("submit",A=>{A.preventDefault();const O=r.value.trim();S(""),O&&(w.add(O),x(O))});let L="";r.addEventListener("keydown",A=>{if(A.key==="Tab")A.preventDefault(),I();else if(A.key==="ArrowUp")A.preventDefault(),S(w.previous(r.value));else if(A.key==="ArrowDown")A.preventDefault(),S(w.next(r.value));else if(A.key==="ArrowRight"&&r.selectionStart===r.value.length&&h.textContent)A.preventDefault(),S(r.value+h.textContent);else if(A.ctrlKey&&!A.metaKey&&!A.altKey){const O=y0(A.key,r.value,r.selectionStart??r.value.length,L);if(!O)return;A.preventDefault(),v(),S(O.line,O.caret),L=O.killed}else v()});for(const A of["input","keyup","click","focus","select"])r.addEventListener(A,k);let P=!0;r.addEventListener("input",()=>{P&&r.value!==""&&window.scrollTo({top:document.documentElement.scrollHeight}),P=r.value===""}),document.addEventListener("selectionchange",()=>{document.activeElement===r&&k()}),a.addEventListener("click",A=>{const O=A.target?.closest("a[data-run]");O?.dataset.run&&(A.preventDefault(),x(O.dataset.run))}),window.addEventListener("keydown",A=>{const W=A.target?.matches("input, textarea, select, [contenteditable]")??!1,_=A.key.length===1&&!A.ctrlKey&&!A.metaKey&&!A.altKey;W||!_||r.focus({preventScroll:!1})}),o.addEventListener("click",()=>r.focus()),l.addEventListener("click",()=>r.focus()),k();const C=Oh.take();C&&x(C);const E=P0();if(E){for(const A of E.finished)A.trim()&&(w.add(A.trim()),x(A.trim()));S(E.unfinished),r.focus()}return{run:x,moveTo:A=>{p.moveTo(A)&&(a.replaceChildren(),m(),k())}}}function B0(t,e){return t.pages.find(n=>n.body.split(`
`).some(s=>s.trim()===`::${e}`))}function F0(t){const e=`${t.label}: ${t.description}`;return"choices"in t?{type:"string",enum:t.choices,default:t.initial,description:e}:{type:"number",minimum:t.min,maximum:t.max,default:t.initial,description:e}}function D0(t){return{type:"object",properties:Object.fromEntries(t.parameters.map(n=>[n.name,F0(n)])),required:[],additionalProperties:!1}}const Lc=t=>t.length<2?t.join(""):`${t.slice(0,-1).join(", ")} or ${t.at(-1)}`;function H0(t,e){if("choices"in t){if(e===void 0)return{value:t.initial};const s=zt(String(e)),a=t.choices.find(o=>zt(o)===s);return a===void 0?{error:`${t.name}: ${String(e)} is not one of ${Lc(t.choices.map(zt))}`}:{value:a}}const n=e===void 0?t.initial:typeof e=="number"?e:typeof e=="string"&&e.trim()!==""?Number(e):Number.NaN;return Number.isFinite(n)?n<t.min||n>t.max?{error:`${t.name}: ${n} is outside ${t.min} to ${t.max}`}:{value:n}:{error:`${t.name}: ${String(e)} is not a number`}}function Nc(t,e){const n=t.parameters.map(o=>o.name),s=Object.keys(e).find(o=>!n.includes(o));if(s!==void 0)return{error:`no option ${s}: choose ${Lc(n)}`};const a={};for(const o of t.parameters){const r=H0(o,e[o.name]);if("error"in r)return r;a[o.name]=r.value}return{values:a}}const W0={amp:"&",lt:"<",gt:">",quot:'"',"#39":"'",nbsp:" "};function q0(t){return t.text?t.text:t.html?t.html.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g,"").replace(/<\/(p|h[1-6]|li|tr|div|pre|dt|dd|figcaption|blockquote)>|<br\s*\/?>/g,`
`).replace(/<[^>]+>/g,"").replace(/&(amp|lt|gt|quot|#39|nbsp);/g,(e,n)=>W0[n]??"").split(`
`).map(e=>e.replace(/\s+/g," ").trim()).filter(Boolean).join(`
`):""}const Pc=t=>`Refused, nothing was run: ${t}`;function z0(t,{site:e,goTo:n}){const s=`.app[data-app="${t}"]`,a=document.querySelector(s);if(a)return a;const o=B0(e,t);return!o||!n(o.route)?null:document.querySelector(s)}function _0(t,e){return{name:t.name,description:`${t.summary}. The reader sees it too: the site goes to the program's page and its dials move to what was asked. Answers in words, then the figures as JSON.`,inputSchema:D0(t),annotations:{readOnlyHint:!0},async execute(n){const s=Nc(t,n);if("error"in s)return Pc(s.error);const a=t.run(s.values);return G0(t.name,s.values,e),`${a.text}

${JSON.stringify(a.data)}`}}}function G0(t,e,n){const s=z0(t,n);s&&(fo(s,e),s.scrollIntoView?.({behavior:"smooth",block:"start"}))}function Y0({run:t,programs:e}){return{name:"shell",description:`Runs a line at this site's prompt, as if the reader had typed it, and they see it echoed and answered. The site is laid out as directories of pages: ls, cd, cat README.md, find, grep and help work over it, and so does every program: ${e.map(n=>n.name).join(", ")}. Commands chain with &&.`,inputSchema:{type:"object",properties:{line:{type:"string",description:"the line to run, e.g. `cd projects && ls`"}},required:["line"],additionalProperties:!1},async execute(n){const s=t(String(n.line??"")),a=s.map(q0).filter(Boolean).join(`

`);return s.some(o=>o.error)?Pc(a):a}}}function U0(t,e){if(!t)return()=>{};const n=new AbortController,s=[...e.programs.map(a=>_0(a,e)),Y0(e)];for(const a of s)t.registerTool(a,{signal:n.signal});return()=>{n.abort();for(const a of s)t.unregisterTool?.(a.name)}}const J0=[{file:"book/index.md",markdown:`---
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

The picture can be looked through lenses. A ball can be as big as the files
that need it — the hotspots, the files a change reaches first — or as the
files it needs; as all the files a change to it could reach, near or far; as
much as it stands between the others; as the commits that have changed it so
far, which grows as the history plays and stops where a file settles; or as
its lines. It can be coloured by how lately it changed, by how often files
standing where it stands changed, or by how stable its box is, with the
arrows that go against stability in red. Threads can be drawn between the
files that changed together, dashed where no arrow joins them; tangled, they
pull the files together too. Every file a commit changes rings as it comes.

Point at a file, and what it is asked to show comes out, said on the line
over the picture so that no word covers an arrow: its own arrows, what it
needs and what needs it, each in the colour the line keys it to, one arrow
out or as far as they go — all a change to it could reach, and all whose
change could reach it; the group the arrows gather it into; or the files
that changed with it. Click a file or a box, and the panel by the picture
tells of it at the commit shown: where a file stands in the network, what
its history has been and what it changed with; a box's couplings, with the
sum worked out. Every file and box it names leads to its own details, and a
link leads to the code on
[GitHub](https://github.com/drpicox/david-rodenas.com) as it stood then. With
nothing chosen, the panel tells of the network as a whole.

::architecture

How often each file changes, how far a change travels, and which files
change together with no arrow between them is the other half of this
picture: [how this site changes](/projects/changes/).

## What the tangle shows

Tangled, with no boxes, the files arrange themselves by the arrows alone,
and structures appear: knots of files that need one another, and files that
everything seems to pass through. Both can be counted, and the figures here
follow the picture's history as it plays.

**The network.** Read as network science reads any network, the source is
files joined by arrows, and the first questions are the ones asked of every
other: how the links are spread among the files, and how far apart the files
are.

::tangle-network

When this was written, on 29 September 2026, most files were needed by one
or two others and a few by very many, the tail that the log scales keep in
sight. And the files were far more clustered than in a random network of as
many files and links, where two files joined to a third are seldom joined to
each other, while the ways between them were nearly as short. Watts and
Strogatz called a network like that a small world (1998): clustered like a
lattice, near like a random network. Humphries and Gurney made the two one
number, small-world-ness (2008): the clustering over a random network's,
over the length of the ways over a random network's, a small world above
one. Until then it had grown with the source, which says less than it
seems: a random network's clustering falls as it grows with as many links a
file, and this one's had hardly fallen. Christopher Myers found the graphs
of what works with what inside several open-source programs to be small
worlds too, and scale-free, a few of their parts linked to very many (2003);
no such fit is made here.

With nothing chosen, the panel by the picture tells more of the network
at the commit shown: whether files with many links join files with few, as
Newman found technological networks mostly do (2002); how deep its knot is,
its deepest core, what is left when every file with fewer links than some
number is taken away, again and again (Seidman, 1983); and how tall its stack
of what needs what. Choose a file, and it tells the file's own: its place by
PageRank (Brin and Page, 1998), which is to be needed by files that are
themselves needed; how near it is to the rest, and how much it stands between
them (Freeman, 1978).

**The groups the arrows make.** The Louvain method (Blondel and others,
2008) finds the groups a graph makes without being told any. How much a
grouping keeps its arrows inside its groups, beyond what arrows drawn at
random would, is its modularity (Newman and Girvan, 2004); the method moves
each file into the neighbouring group that raises it most, then treats each
group as one file and starts again, until nothing moves. The modularity of
the boxes can be worked out the same way.

::tangle-groups

Some features make a group of their own, whole: islands, as the rules want.
Where the arrows gather several boxes into one group, their files are more
tied to one another than to the rest — often a feature and the part of the
frame it leans on most, sometimes features that lean on the same things.
Set pointing to show its group, and the picture draws any file's.

**The bridges.** Some files stand between the others: most of the shortest
ways from one file to another pass through them, the arrows read either
way. Set the size to bridges, and the picture shows how much each does.

::tangle-bridges

When this was written, on 28 September 2026, the first three were the
contract every feature fulfils, the one way to make an element on the page,
and the one way to make text safe to print: files where much of the source
meets. Read either way, the arrows say where the parts of the source meet,
not which way a change would go; a file that needs nothing carries no change
through it.

**How far a change could reach.** Every arrow is a road a change could take
back to what needs it. The share of the source a change to one file could
reach, on average, following them all the way, is a design's propagation
cost (MacCormack, Rusnak and Baldwin, 2006); set the size to reach, and the
picture shows each file's.

::tangle-reach

A source that grows by features, which little else needs, sees it fall: a
change inside a new feature can reach little beyond it. How far changes did go,
rather than could, is on [how this site changes](/projects/changes/).

## The arrows point one way

A rule written in a document is a rule that can be missed, by a person or by
an AI. So the rules of this code are not in a document: they are tests it has
to pass. \`architecture.test.ts\` reads the same graph this picture draws, and
fails when

- a file outside a folder named \`browser/\` touches the page,
- the frame imports a feature,
- a feature imports another: where two go together, it is the composition
  that says so, as it hands the stars whatever world turns,
- two boxes, or two files, need each other round in a circle,
- a file exports more than one value,
- a feature is missing from the diagrams in \`ARCHITECTURE.md\`.

Some of what the pages here measure can only be held, not forbidden. A
ratchet turns one way. A file in the source,
[\`architecture.ratchet.json\`](https://github.com/drpicox/david-rodenas.com/blob/main/src/architecture.ratchet.json),
keeps where four measures of the source stand, and a test fails if any of
them gets worse. When one gets better, the test fails too, until the new
value is written into the file, in the same commit, so that the gain cannot
be lost again. A limit drawn by taste would either fail on the first day or
be too loose to catch anything; a ratchet starts where the source is, and
only lets it go forward. It asks nobody, person or AI, to remember anything:
whatever makes the shape worse is told so, by name.

Here each measure is taken at every commit of the history, as the ratchet
takes it now, the commits before the ratchet began as well. The test holds
the file to the source, so at every commit the page is published from, the
last value of each is the one the file keeps.

::ratchet

And what [how this site changes](/projects/changes/) finds, files that keep
changing together with no arrow between them, is held too: two files that
changed together three times with nothing joining them need a test that
imports both, so that what they agree on, which no import states, is written
down where breaking it fails. The files that put the features together are
left out, since they change with everything they put together.

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
summary: The history of this site's source, read for what changes, how often and with what — the picture of the source seen through its changes, the files that never settle, how far a change travels and which files stand where changes are, and the dependencies no arrow shows.
order: 91
---

# How this site changes

[How this site is built](/projects/architecture/) draws where each file
stands. This is how often each one moves. Git keeps every commit, and every
commit says which files it changed; read over the whole history, that says
what the arrows cannot: which files settle and which never do, how far a
change travels, which files stand where changes happen, and which change
together although nothing in the code joins them.

Like the picture of how it is built, every figure here is read off the
history at every push, so it is always the commit being published. Play the
history, drag it, or press a commit on the picture of changes, and every
figure below shows the source as it stood then.

::change-player

## The picture, as it changed

The picture of how this site is built, seen through its history: each ball
as big as the commits that have changed it so far, and warm as it changed
lately, cooling by half every six commits; a warm thread between two files
that changed together twice or more, dashed where no arrow joins them. Play
the history and the heat moves: a feature being written glows and cools,
while the frame under the features warms again each time a new one is
written. Tangle it, and what changed together pulls together too. Point at a
file for what changed with it, or change the lenses for anything else the
picture of how it is built can show. Click a file, and the panel by the
picture tells its history: when it was written, every commit that changed it
up to the one shown, what it changed with, what its ground would lead one to
expect, and a link to its code.

::change-graph

## Where the changes went

::change-matrix

Each row is a box as it stands now, a folder of the frame or a feature,
holding its files over their whole lives, from before they moved there too;
the files that are gone have a row of their own. Each column is a commit.
Read across, the features come in one after another, each written in a
burst and then mostly left alone, while the frame under them keeps being
touched. Read down, a column shaded from top to bottom is a sweep: one
commit that changed more than thirty files at once. Point at a cell for
what its commit did there.

## Written, then left alone

The first thing the history says is how little changes. Most files are
written once and not touched again, and a file is likeliest to change in
the commits right after the one that wrote it.

::change-settling

A file is hottest just after it is written, while what it has to do is
still being settled. Then it cools, and stays cool.

## The files that never settle

Some files never cool. They are not the young ones.

::change-hotspots

Adam Tornhill calls a file that changes often and is also large, its lines
standing in for how complex it is, a hotspot (*Your Code as a Crime
Scene*, 2015), and starts there: the table gives both. When this page was
written, on 28 September 2026, most of the files at its top were ones every
feature, or every page, passes through: the list the features are added to,
which changes because that is how the site grows; the composition root; the
page every page is written into; the terminal that takes it over in the
browser. A hotspot that no test runs is where a change most easily breaks
something nobody sees.

## How far a change travels

When a file changes, what needs it may have to change with it, and what
needs that, and so on: the arrows are the roads a change can take. How far
they let it go is a property of the design, which MacCormack, Rusnak and
Baldwin measured as its propagation cost (2006): the share of the source a
change to one file could reach, on average. How far changes did go is
another question, which the history can only half answer: two files changed
in one commit changed together, and it cannot say which moved the other.
What it can say is how often a file changed with something it needs, near
or far. At every commit, each file is counted by how far below it, in what
it needs or in what that needs, the nearest other change was, and by
whether it changed too.

::change-cascade

Files joined by an arrow change together far more often than files that are
not, and much less often two arrows apart than one. The blast radius drawn
on the picture of how this site is built, with its reach set to all, is how
far a change could go, not how far changes went.

## Standing on moving ground

A file standing near files that change changes more often than one standing
far from them, by as much as the figure above says for each distance. Added
up over every commit, for each file, the share of files that changed where
it stood is how many changes its ground would lead one to expect: its
exposure. It says where a file stood, not what moved it. Set against what it
did:

::change-ground

Near the line, a file changed about as often as files standing where it
stood. Far above it, a file changed for reasons of its own: it grows with
every feature, or it keeps being reworked. Far below, a file stood where
files change, and did not — a list of what a feature brings, which changes
little whatever changes under it. On the picture above, colour set to
exposure shows every file's.

## Two kinds of unstable

Robert C. Martin measures how stable a component is by its place among the
others, not by its history, and he counts two kinds of coupling to do it:

- **Ca, its afferent couplings**: the files elsewhere that need something
  in it. Each may have to change when it does, so the more there are, the
  more it answers for, and the harder it is to change.
- **Ce, its efferent couplings**: its own files that need something
  elsewhere. Each may have to change when what it needs does, so the more
  there are, the more it depends, and the more often something else makes
  it change.

He counts classes, not arrows, and here a file stands for a class: a file
that needs three things elsewhere is one to Ce. His instability puts the two together, I = Ce / (Ca + Ce): 0 for a
box that is only needed, hard to change because whatever needs it may have
to change with it; 1 for a box that only needs, which nothing stops from
changing. Pick a box, and see its two couplings drawn and the sum worked
out:

::change-coupling

His rule for them is to depend in the direction of stability: an arrow
should go from a box to one more stable than itself, so that what is hard to
change never needs what is easy to change, and keeps changing. On the
picture above, colour set to stability draws every box as deep as it is
stable, and the arrows that go against the rule in red. When this was
written, on 28 September 2026, most of them left the list of features: one file, needed by one,
which by his count stands half way, and which has to point at every
feature, because putting them together is what it is for.

He also measures how abstract a box is: here, the share of its files that
hold nothing but types, which can be depended on without depending on what
anything does. And he draws the two against each other. A box on the line
between the two corners, the main sequence, is as abstract as its place
asks. A box at the bottom left is needed by much and concrete, hard to
change with nothing abstract in it to change instead: the zone of pain. And
he says what his picture cannot show, that only what keeps changing hurts
there; so each box here is as warm as the history says its files changed,
the sweeps left out.

::change-stability

The frame stands near that corner, as a frame would: everything is built on
it, and most of it is plain code. Where the two kinds of unstable disagree,
a box that is hard to change and changes anyway, is where a change costs
most, because what needs it may have to move with it.

## An arrow onto a type

The dashed arrows on the picture need only a type: a box that depends on an
interface, not on what implements it. That is dependency inversion, and its
promise is that a change to what implements the interface does not reach
those that use it: there is no arrow for it to travel, and the figure of how
far a change travels counts how seldom files change with nothing changed
below them. What an arrow onto a type can still carry is a change to the
type itself. For each kind of arrow, how often a change at its head came
with a change at its tail:

::change-ripples

An interface that grows by what its users may leave alone, a field they
need not fill, changes without them; one that breaks them changes with
them. And where one file is most of the arrows onto a type, the count is
mostly that file's, which the caption says when it is so.

## What changes together

Two files that keep changing in the same commits are tied in the history,
whatever the arrows say. Harald Gall, Karin Hajek and Mehdi Jazayeri called
it logical coupling (1998). A commit that changed more than thirty files is
left out: a rename across the whole source changes everything at once, and
says nothing about what needs what.

::change-together

Where there is an arrow, changing together says it is a strong one: it
carries. The pairs worth reading are those with no arrow between them, near
or far: they share something the compiler cannot see. Among them are the
page the build writes, in node, and the terminal that takes it over in the
browser. This site's first rule is that the content is in the HTML, and this
is its price: the page and the script that reads it must agree on its
markup, a contract no import states, kept by changing both. On the picture
above, they are the dashed threads.

## With its test

A change that comes with a change to its test, in the same commit, is the
mark test-driven work leaves in a history. The history cannot say which was
written first, only that they went together.

::change-tests

The changes to files no test imports directly are counted apart: some of
those files a test runs through another, as the shell's tests run its
commands, and some no test runs at all.

## What it is not

The history starts on 7 September 2026, so it is short, and some of these
numbers are small enough to move with the next commit. A commit is the unit,
however much it changed: a one-word fix and a rewrite are one change each.
The history is the main line's, and a branch's commits arrive with the
merge that brought them. The tests are left out of every count but the
last, because a test changes when what it tests does, and would count every
change twice. The sweeps are left out of what changes with what, and of how
often a box changed. And changing together is not needing each other: it
is what has to be explained.

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
`}],Ch="---";function K0(t){return(/^"(.*)"$/.exec(t)??/^'(.*)'$/.exec(t))?.[1]??t}function V0(t){const e=t.replace(/\r\n?/g,`
`).split(`
`);if(e[0]?.trim()!==Ch)return{fields:{},body:t.trim()};const n=e.indexOf(Ch,1);if(n<0)return{fields:{},body:t.trim()};const s={};for(const a of e.slice(1,n)){const o=a.indexOf(":");o<=0||(s[a.slice(0,o).trim()]=K0(a.slice(o+1).trim()))}return{fields:s,body:e.slice(n+1).join(`
`).trim()}}function X0(t){const n=t.replace(/\.md$/,"").replace(/(^|\/)index$/,"");return n===""?"/":`/${n}/`}function jh(t){if(t==="/")return"/";const e=t.slice(0,-1);return e.slice(e.lastIndexOf("/")+1)}function Z0(t){if(t==="/")return null;const e=t.slice(0,-1);return e.slice(0,e.lastIndexOf("/")+1)}function Q0(t){const{fields:e,body:n}=V0(t.markdown),s=X0(t.file);return{file:t.file,route:s,parent:Z0(s),name:jh(s),title:e.title??jh(s),summary:e.summary??"",order:Number(e.order??"100"),body:n,fields:e}}function ev(t){return t.endsWith("/")?t:`${t}/`}function Lh(t,e){return t.order-e.order||t.name.localeCompare(e.name)}class tv{byRoute;linked;constructor(e){const n=e.map(Q0),s=n.filter(a=>!a.fields.link).sort(Lh);this.byRoute=new Map(s.map(a=>[a.route,a])),this.linked=new Map(n.flatMap(a=>{const o=this.byRoute.get(ev(a.fields.link??""));return!a.fields.link||!o?[]:[[a.route,{...o,parent:a.parent,name:a.name,order:a.order,link:a.route}]]}))}get links(){return[...this.linked.values()].map(e=>({from:e.link,to:e.route}))}get pages(){return[...this.byRoute.values()]}at(e){const n=this.linked.get(e);return this.byRoute.get(n?n.route:e)}childrenOf(e){return[...this.pages,...this.linked.values()].filter(n=>n.parent===e).sort(Lh)}trailTo(e){const n=this.at(e);return n?n.parent===null?[n]:[...this.trailTo(n.parent),n]:[]}}const Ft=new tv(J0),Nh=["on","off"];function Ph(t,e){if(t.length===0)return{text:"No flags to try just now."};const n=Math.max(...t.map(r=>r.name.length)),s=r=>e.isOn(r.name)?"on":"off",a=t.map(r=>{const i=Nh.map(h=>h===s(r)?`[${h}]`:` ${h} `).join("");return`${r.name.padEnd(n)}  ${i}  ${r.description}`}),o=t.map(r=>{const i=Nh.map(h=>h===s(r)?`<strong aria-current="true">${h}</strong>`:`<a href="#" data-run="flags ${r.name} ${h}" title="flags ${r.name} ${h}">${h}</a>`).join(" ");return`<dt>${$(r.name)} <span class="switch">${i}</span></dt><dd>${$(r.description)}</dd>`});return{text:a.map(r=>r.trimEnd()).join(`
`),html:`<dl class="help flags">${o.join("")}</dl>`}}function nv(t,e){return{name:"flags",usage:"flags [name [on|off]]",description:"list the trials this site can be switched into, or switch one",run(n,[s,a]){return s===void 0?Ph(t,e):t.some(o=>o.name===s)?a!==void 0&&a!=="on"&&a!=="off"?{text:`flags: ${s}: choose on or off`,error:!0}:(e.set(s,a===void 0?!e.isOn(s):a==="on"),Ph(t,e)):{text:`flags: ${s}: no such flag. Try flags`,error:!0}}}}function sv(t,e,n){return t.flatMap(s=>{if(s.trial===void 0||e.chosen(s.name))return[];let a=e.drawn(s.name);return a===void 0&&(a=n()<s.trial,e.draw(s.name,a)),[{name:s.name,on:a}]})}function av(t,e){const n=new URLSearchParams(e),s={};for(const{name:a}of t){const o=n.get(a);(o==="on"||o==="off")&&(s[a]=o==="on")}return s}function ov(t){if(t.includes("--help"))return{help:!0};const e={};for(let n=0;n<t.length;n+=1){const s=t[n]??"";if(!s.startsWith("--"))return{error:`${s}: options are written --name value`};const a=s.indexOf("=");if(a>0){e[s.slice(2,a)]=s.slice(a+1);continue}const o=t[n+1];if(o===void 0)return{error:`${s} needs a value`};e[s.slice(2)]=o,n+=1}return{given:e}}const rv=t=>"choices"in t?t.choices.map(zt).join("|"):"n",iv=t=>"choices"in t?zt(t.initial):`${t.min} to ${t.max}, ${t.initial}`;function hv(t){const e=[t.name,...t.parameters.map(a=>`[--${a.name} ${rv(a)}]`)].join(" "),n=Math.max(...t.parameters.map(a=>a.name.length+2)),s=t.parameters.map(a=>`  ${`--${a.name}`.padEnd(n)}  ${a.description} (${iv(a)})`);return[e,`  ${t.summary}`,"",...s].join(`
`)}function lv(t){return{name:t.name,usage:`${t.name} [--help] [--option n]...`,description:t.summary,run(e,n){const s=ov(n);if("help"in s)return{text:hv(t)};const a="error"in s?s:Nc(t,s.given);if("error"in a)return{text:`${t.name}: ${a.error}`,error:!0};const o=t.run(a.values);return{text:o.text,html:`<div class="app program-out">${o.html}</div>`}}}}function cv(t){return[...t.flatMap(e=>e.commands??[]),...t.flatMap(e=>e.programs??[]).map(lv)]}function Rh(){const t=mt.flatMap(g=>g.flags??[]),e=new ib;for(const[g,b]of Object.entries(av(t,window.location.search)))e.set(g,b);const n=sv(t,e,Math.random),s=g=>`${g.name}-${g.on?"on":"off"}`;for(const g of n)In(An("trial",s(g)));document.addEventListener("click",g=>{const b=g.target?.closest("main a[href]");if(!b||window.location.pathname!=="/"||n.length===0)return;const v=b.host===window.location.host?b.pathname:b.href;for(const k of n)In(An(s(k),"open",v))},{capture:!0});const a=[...jc,...cv(mt),nv(t,e)],o=rb(mt),i=(g=>g.endsWith("/")?g:`${g}/`)(window.location.pathname),h=Ft.at(i);let c=kh(o,{site:Ft}),l=Ih(document),d=null;const u=r0(Ft,(g,b)=>{c(),c=kh(o,{site:Ft}),l(),l=Ih(document);for(const v of mt)v.arrive?.(g);b||d?.moveTo(g.route)});if(d=R0(Ft,h?i:"/",{moveTo:g=>u(g,{keep:!0}),clearPage:()=>{c(),c=()=>{},l(),l=()=>{},document.querySelector("main")?.replaceChildren()},commands:a,heard:g=>In(An("command",a.some(b=>b.name===g)?g:"unknown"))}),h)for(const g of mt)g.arrive?.(h);const p={run:g=>{d?.run(g)}};for(const g of mt)g.install?.(p);const w=mt.flatMap(g=>g.programs??[]);U0(hb(),{programs:w,site:Ft,goTo:g=>u(g),run:g=>d?.run(g)??[]})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Rh):Rh();
