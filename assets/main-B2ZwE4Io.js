function Gf(t){const e=new Map,n=new Map;return t.changes.map(s=>{for(const a of s.removed)e.delete(a);for(const[a,o,r,i,l]of s.added)e.set(a,l?{id:a,path:o,lines:r,test:i,typesOnly:l}:{id:a,path:o,lines:r,test:i});for(const[a,o]of s.moved){const r=e.get(a);r&&e.set(a,{...r,path:o})}for(const[a,o]of s.resized){const r=e.get(a);r&&e.set(a,{...r,lines:o})}for(const[a,o]of s.retyped){const r=e.get(a);if(!r)continue;const{typesOnly:i,...l}=r;e.set(a,o?{...l,typesOnly:o}:l)}for(const[a,o]of s.unlinked)n.delete(`${a}>${o}`);for(const[a,o,r]of s.linked)n.set(`${a}>${o}`,r);return{modules:[...e.values()].sort((a,o)=>a.id-o.id),dependencies:[...n].map(([a,o])=>{const[r=0,i=0]=a.split(">").map(Number);return{from:r,to:i,typeOnly:o}}).sort((a,o)=>a.from-o.from||a.to-o.to)}})}function lu(t){const e=new Map,n=(s,a)=>{const o=e.get(s);o&&Object.assign(o,a)};return t.changes.forEach((s,a)=>{for(const[o,r,i,l,h=!1]of s.added)e.set(o,{id:o,path:r,lines:i,test:l,typesOnly:h,born:a,changed:[]});for(const[o,r]of s.moved)n(o,{path:r});for(const[o,r]of s.resized)n(o,{lines:r});for(const[o,r]of s.retyped)n(o,{typesOnly:r});for(const o of s.changed)e.get(o)?.changed.push(a);for(const o of s.removed)n(o,{went:a})}),[...e.values()].sort((s,a)=>s.id-a.id)}let wo;function cs(t){if(wo?.text===t)return wo.read;const e=JSON.parse(t),n={history:e,snapshots:Gf(e),lives:lu(e)};return wo={text:t,read:n},n}const _f={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function M(t){return t.replace(/[&<>"]/g,e=>_f[e]??e)}function st(t){return t.includes("/")?t.split("/")[0]??t:"src"}function V(t){const e=t.split("/");return e.length<=2?t:`${e[0]}/${e[1]}`}const ll=t=>[...t].map(([e,n])=>({box:e,files:n.size})).sort((e,n)=>n.files-e.files||e.box.localeCompare(n.box));function Ka(t,e){const n=new Map(t.modules.filter(h=>!h.test).map(h=>[h.id,V(h.path)])),s=[...n].filter(([,h])=>h===e).map(([h])=>h),a=new Map,o=new Map,r=new Set;for(const{from:h,to:c}of t.dependencies){const[d,u]=[n.get(h),n.get(c)];d===void 0||u===void 0||d===u||(u===e&&a.set(d,(a.get(d)??new Set).add(h)),d===e&&(r.add(h),o.set(u,(o.get(u)??new Set).add(h))))}const i=new Set([...a.values()].flatMap(h=>[...h])).size,l=r.size;return{box:e,files:s,neededBy:ll(a),needing:[...r].sort((h,c)=>h-c),needs:ll(o),ca:i,ce:l,instability:i+l>0?l/(i+l):null}}const Uf=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Be(t){const[,e=1,n=1]=t.date.slice(0,10).split("-").map(Number);return`${n} ${Uf[e-1]??""}`}function Va(t,e=1/0){const n=new Map;for(const{at:s,distance:a,changed:o}of t){if(s>e)continue;const r=n.get(a)??{seen:0,changed:0};n.set(a,{seen:r.seen+1,changed:r.changed+(o?1:0)})}return[...n].map(([s,a])=>({distance:s,...a})).sort((s,a)=>(s.distance??1/0)-(a.distance??1/0))}const Yf=3,hl=t=>t===null?null:Math.min(t,Yf);function Mi(t,e,n=1/0){const s=new Map;for(const{distance:r,seen:i,changed:l}of e){const h=hl(r),c=s.get(h)??{seen:0,changed:0};s.set(h,{seen:c.seen+i,changed:c.changed+l})}const a=new Map([...s].map(([r,{seen:i,changed:l}])=>[r,i>0?l/i:0])),o=new Map;for(const{at:r,id:i,distance:l,changed:h}of t){if(r>n)continue;const c=o.get(i)??{expected:0,actual:0};c.expected+=a.get(hl(l))??0,c.actual+=h?1:0,o.set(i,c)}return o}function Si(t,e,n=6,s=new Set){return new Map(t.map(a=>[a.id,a.changed.filter(o=>o<=e&&!s.has(o)).reduce((o,r)=>o+.5**((e-r)/n),0)]))}let Ns;function Ut(t,e){if(Ns?.read===t&&Ns.at===e)return Ns.then;const n=Math.max(0,Math.min(e,t.history.commits.length-1))+1,s={commits:t.history.commits.slice(0,n),changes:t.history.changes.slice(0,n)},a=n===t.history.commits.length?t:{history:s,snapshots:t.snapshots.slice(0,n),lives:lu(s)};return Ns={read:t,at:e,then:a},a}function Jf(t){const e=t.modules.filter(d=>!d.test).map(d=>d.id),n=new Map(e.map((d,u)=>[d,u])),s=e.length,a=Array.from({length:s},()=>new Set);for(const{from:d,to:u}of t.dependencies){const[m,f]=[n.get(d),n.get(u)];m===void 0||f===void 0||m===f||(a[m]?.add(f),a[f]?.add(m))}const o=a.map(d=>[...d]),r=new Float64Array(s),i=new Float64Array(s),l=new Int32Array(s),h=new Float64Array(s),c=new Int32Array(s);for(let d=0;d<s;d+=1){i.fill(0),l.fill(-1),h.fill(0),i[d]=1,l[d]=0;let[u,m]=[0,0];for(c[m++]=d;u<m;){const f=c[u++]??0;for(const p of o[f]??[])l[p]===-1&&(l[p]=(l[f]??0)+1,c[m++]=p),l[p]===(l[f]??0)+1&&(i[p]=(i[p]??0)+(i[f]??0))}for(let f=m-1;f>0;f-=1){const p=c[f]??0;for(const w of o[p]??[])l[w]===(l[p]??0)-1&&(h[w]=(h[w]??0)+(i[w]??0)/(i[p]??1)*(1+(h[p]??0)));r[p]=(r[p]??0)+(h[p]??0)}}return new Map(e.map((d,u)=>[d,(r[u]??0)/2]))}function $t(t){const e=t.modules.filter(s=>!s.test).map(s=>s.id),n=new Map(e.map(s=>[s,new Map]));for(const{from:s,to:a}of t.dependencies){const[o,r]=[n.get(s),n.get(a)];!o||!r||s===a||(o.set(a,(o.get(a)??0)+1),r.set(s,(r.get(s)??0)+1))}return{ids:e,weights:n}}function Kf(t){const{ids:e,weights:n}=$t(t),s=new Map;let[a,o]=[0,0];for(const i of e){const l=[...n.get(i)?.keys()??[]],h=l.length*(l.length-1)/2;let c=0;l.forEach((d,u)=>{for(const m of l.slice(u+1))n.get(d)?.has(m)&&(c+=1)}),s.set(i,h>0?c/h:0),[a,o]=[a+c,o+h]}const r=[...s.values()];return{local:s,average:r.length>0?r.reduce((i,l)=>i+l,0)/r.length:0,transitivity:o>0?a/o:0}}function cl(t){const e=t.links.length,n=t.links.map((i,l)=>2*(t.inside[l]??0)+[...i.values()].reduce((h,c)=>h+c,0)),s=n.reduce((i,l)=>i+l,0),a=Array.from({length:e},(i,l)=>l),o=[...n];let r=!1;for(let i=!0;i&&s>0;){i=!1;for(let l=0;l<e;l+=1){const h=a[l]??l,c=new Map;for(const[p,w]of t.links[l]??[]){const g=a[p]??p;c.set(g,(c.get(g)??0)+w)}const d=n[l]??0;o[h]=(o[h]??0)-d;const u=p=>(c.get(p)??0)-(o[p]??0)*d/s;let m=h,f=u(h);for(const p of[...c.keys()].sort((w,g)=>w-g)){const w=u(p);w>f+1e-12&&([m,f]=[p,w])}o[m]=(o[m]??0)+d,a[l]=m,m!==h&&(i=r=!0)}}return r?a:null}function Vf(t,e){const n=new Map,s=e.map(r=>(n.has(r)||n.set(r,n.size),n.get(r)??0)),a=Array.from({length:n.size},()=>new Map),o=Array.from({length:n.size},()=>0);return t.links.forEach((r,i)=>{const l=s[i]??0;o[l]=(o[l]??0)+(t.inside[i]??0);for(const[h,c]of r){const d=s[h]??0;l===d?o[l]=(o[l]??0)+c/2:a[l]?.set(d,(a[l]?.get(d)??0)+c)}}),{level:{links:a,inside:o},renamed:s}}function Xf(t){const{ids:e,weights:n}=$t(t),s=new Map(e.map((i,l)=>[i,l]));let a={links:e.map(i=>new Map([...n.get(i)??[]].map(([l,h])=>[s.get(l)??0,h]))),inside:e.map(()=>0)},o=e.map((i,l)=>l);for(let i=cl(a);i;i=cl(a)){const l=Vf(a,i);o=o.map(h=>l.renamed[h]??h),a=l.level}const r=new Map;return new Map(e.map((i,l)=>{const h=o[l]??l;return r.has(h)||r.set(h,r.size),[i,r.get(h)??0]}))}function Zf(t){const{ids:e,weights:n}=$t(t),s=new Map(e.map(r=>[r,n.get(r)?.size??0])),a=new Map,o=new Set(e);for(let r=0;o.size>0;){const i=Math.min(...[...o].map(h=>s.get(h)??0));r=Math.max(r,i);const l=[...o].filter(h=>(s.get(h)??0)<=r);for(const h of l){o.delete(h),a.set(h,r);for(const c of n.get(h)?.keys()??[])o.has(c)&&s.set(c,(s.get(c)??0)-1)}}return new Map(e.map(r=>[r,a.get(r)??0]))}function Ai(t,e){let n=0;const s=new Map,a=new Map,o=[],r=new Set,i=[],l=h=>{s.set(h,n),a.set(h,n),n+=1,o.push(h),r.add(h);for(const d of e(h))s.has(d)?r.has(d)&&a.set(h,Math.min(a.get(h)??0,s.get(d)??0)):(l(d),a.set(h,Math.min(a.get(h)??0,a.get(d)??0)));if(a.get(h)!==s.get(h))return;const c=[];for(let d=o.pop();d!==void 0&&(r.delete(d),c.push(d),d!==h);d=o.pop());i.push(c)};for(const h of t)s.has(h)||l(h);return i}function Qf(t){const e=t.modules.filter(r=>!r.test).map(r=>r.id),n=new Set(e),s=new Map(e.map(r=>[r,[]]));for(const{from:r,to:i}of t.dependencies)n.has(r)&&n.has(i)&&r!==i&&s.get(r)?.push(i);const a=new Map,o=[];return Ai(e,r=>s.get(r)??[]).forEach((r,i)=>{for(const h of r)a.set(h,i);const l=r.flatMap(h=>(s.get(h)??[]).map(c=>a.get(c))).filter(h=>h!==void 0&&h!==i);o[i]=l.length>0?1+Math.max(...l.map(h=>o[h]??0)):0}),new Map(e.map(r=>[r,o[a.get(r)??0]??0]))}function ep(t,e=.85){const n=t.modules.filter(i=>!i.test).map(i=>i.id),s=new Map(n.map((i,l)=>[i,l])),a=n.length,o=Array.from({length:a},()=>new Set);for(const{from:i,to:l}of t.dependencies){const[h,c]=[s.get(i),s.get(l)];h!==void 0&&c!==void 0&&h!==c&&o[h]?.add(c)}let r=new Float64Array(a).fill(a>0?1/a:0);for(let i=0;i<100;i+=1){const l=new Float64Array(a).fill((1-e)/Math.max(1,a));let h=0;o.forEach((d,u)=>{const m=r[u]??0;if(d.size===0)h+=m;else for(const f of d)l[f]=(l[f]??0)+e*m/d.size});for(let d=0;d<a;d+=1)l[d]=(l[d]??0)+e*h/a;const c=l.reduce((d,u,m)=>d+Math.abs(u-(r[m]??0)),0);if(r=l,c<1e-12)break}return new Map(n.map((i,l)=>[i,r[l]??0]))}function tp(t){const{ids:e,weights:n}=$t(t),s=new Map(e.map((u,m)=>[u,m])),a=e.map(u=>[...n.get(u)?.keys()??[]].map(m=>s.get(m)??0)),o=new Int32Array(e.length),r=new Int32Array(e.length),i=new Map,l=[];for(const[u,m]of e.entries()){o.fill(-1),o[u]=0,r[0]=u;let[f,p,w]=[1,0,0];for(let g=0;g<f;g+=1){const v=r[g]??0,b=(o[v]??0)+1;for(const k of a[v]??[])(o[k]??0)>=0||(o[k]=b,r[f]=k,f+=1,p+=b,w=b)}l.push({reached:f,total:p,farthest:w}),i.set(m,p>0?(f-1)/p:0)}const h=Math.max(0,...l.map(({reached:u})=>u)),c=l.filter(({reached:u})=>u===h),d=c.length*(h-1);return{diameter:Math.max(0,...c.map(({farthest:u})=>u)),mean:d>0?c.reduce((u,{total:m})=>u+m,0)/d:0,closeness:i}}function Ei(t){const e=new Set(t.modules.filter(a=>!a.test).map(a=>a.id)),n=new Map;for(const{from:a,to:o}of t.dependencies)e.has(a)&&e.has(o)&&n.set(o,[...n.get(o)??[],a]);const s=new Map;for(const a of e){const o=new Set([a]),r=[a];for(let i=r.pop();i!==void 0;i=r.pop())for(const l of n.get(i)??[])o.has(l)||(o.add(l),r.push(l));s.set(a,o.size-1)}return s}const Yt=30;function np(t,e,n){const s=new Set([t]);let a=[t];for(let o=1;a.length>0;o+=1){const r=[];for(const i of a)for(const l of e.get(i)??[])if(!s.has(l)){if(n.has(l))return o;s.add(l),r.push(l)}a=r}return null}function hu(t,e,n=Yt){const s=[];return t.changes.forEach((a,o)=>{const r=e[o-1];if(!r||a.changed.length===0||a.changed.length>n)return;const i=new Set(r.modules.filter(d=>!d.test).map(d=>d.id)),l=new Set(a.removed),h=new Set(a.changed.filter(d=>i.has(d))),c=new Map;for(const{from:d,to:u}of r.dependencies)i.has(d)&&i.has(u)&&c.set(d,[...c.get(d)??[],u]);for(const d of i)l.has(d)||s.push({at:o,id:d,distance:np(d,c,h),changed:h.has(d)})}),s}function Je(t){const e=new WeakMap;return n=>{if(e.has(n))return e.get(n);const s=t(n);return e.set(n,s),s}}const J={standings:Je(t=>hu(t.history,t.snapshots)),bridges:Je(t=>Jf(t)),reach:Je(t=>Ei(t)),groups:Je(t=>Xf(t)),pageRank:Je(t=>ep(t)),cores:Je(t=>Zf(t)),heights:Je(t=>Qf(t)),paths:Je(t=>tp(t)),clustering:Je(t=>Kf(t))};function ot(t,e=Yt){return new Set(t.changes.flatMap((n,s)=>n.changed.length>e?[s]:[]))}function cu(t,e=Yt,n=2){const s=new Map;for(const{changed:a}of t.changes){if(a.length>e)continue;const o=[...a].sort((r,i)=>r-i);o.forEach((r,i)=>{for(const l of o.slice(i+1).map(h=>`${r}:${h}`))s.set(l,(s.get(l)??0)+1)})}return[...s].filter(([,a])=>a>=n).map(([a,o])=>{const[r=0,i=0]=a.split(":").map(Number);return{a:r,b:i,together:o}}).sort((a,o)=>o.together-a.together||a.a-o.a||a.b-o.b)}function ds(t,e,n,s){const a=new Map;for(const[i,l]of t){const[h,c]=s==="needs"?[i,l]:[l,i];a.set(h,[...a.get(h)??[],c])}const o=new Map;let r=[e];for(let i=1;i<=n&&r.length>0;i+=1){const l=[];for(const h of r)for(const c of a.get(h)??[])c!==e&&!o.has(c)&&(o.set(c,i),l.push(c));r=l}return o}function du(t,e,n){const s=Math.min(ds(t,e,1/0,"needs").get(n)??1/0,ds(t,n,1/0,"needs").get(e)??1/0);return s===1?"arrow":Number.isFinite(s)?"through":"none"}function uu(t,e,n=2){const s=new Set(e.modules.filter(o=>!o.test).map(o=>o.id)),a=e.dependencies.map(({from:o,to:r})=>[o,r]);return cu(t,void 0,n).filter(({a:o,b:r})=>s.has(o)&&s.has(r)).map(({a:o,b:r,together:i})=>({a:o,b:r,together:i,joined:du(a,o,r)}))}const sp=5;function ap(t,e,n){const s=Ut(t,e),a=s.lives.find(d=>d.id===n),o=t.history.commits,r=ot(s.history),i=a?.born??0,l=J.standings(t),h=t.snapshots[e]??{modules:[],dependencies:[]},c=new Map(h.modules.map(d=>[d.id,d.path]));return{born:{at:i,commit:o[i]??{sha:"",date:"",subject:""}},changes:(a?.changed??[]).map(d=>({at:d,commit:o[d]??{sha:"",date:"",subject:""},sweep:r.has(d)})),heat:Math.min(1,Si(s.lives,e,void 0,r).get(n)??0),ground:Mi(l,Va(l,e),e).get(n)??null,partners:uu(s.history,h).flatMap(({a:d,b:u,together:m,joined:f})=>d===n||u===n?[{id:d===n?u:d,together:m,joined:f}]:[]).sort((d,u)=>u.together-d.together||d.id-u.id).slice(0,sp).map(d=>({...d,path:c.get(d.id)??""}))}}function op(t){const{ids:e,weights:n}=$t(t),s=new Map(e.map(c=>[c,n.get(c)?.size??0]));let[a,o,r,i]=[0,0,0,0];for(const c of e)for(const d of n.get(c)?.keys()??[]){if(d<c)continue;const[u,m]=[s.get(c)??0,s.get(d)??0];a+=1,o+=u*m,r+=(u+m)/2,i+=(u*u+m*m)/2}if(a===0)return 0;const l=r/a,h=i/a-l*l;return h>0?(o/a-l*l)/h:0}function rp(t){const{ids:e,weights:n}=$t(t),s=new Set,a=[];for(const o of e){if(s.has(o))continue;const r=[o];s.add(o);for(let i=0;i<r.length;i+=1)for(const l of n.get(r[i]??o)?.keys()??[])s.has(l)||(s.add(l),r.push(l));a.push(r.sort((i,l)=>i-l))}return a.sort((o,r)=>r.length-o.length||(o[0]??0)-(r[0]??0))}function Oi(t){const e=t.modules.filter(g=>!g.test).map(g=>g.id),n=new Set(e),s=new Map(e.map(g=>[g,new Set])),a=new Map(e.map(g=>[g,new Set]));for(const{from:g,to:v}of t.dependencies)!n.has(g)||!n.has(v)||g===v||(s.get(g)?.add(v),a.get(v)?.add(g));const o=e.length,r=[...s.values()].reduce((g,v)=>g+v.size,0),{weights:i}=$t(t),l=[...i.values()].reduce((g,v)=>g+v.size,0)/2,h=o>0?2*l/o:0,c=rp(t),d=Ai(e,g=>s.get(g)??[]).filter(g=>g.length>1),u=J.paths(t),m=J.clustering(t),f=o>1?h/(o-1):0,p=h>1?Math.log(o)/Math.log(h):0,w=f>0&&p>0&&u.mean>0?m.average/f/(u.mean/p):0;return{files:o,arrows:r,links:l,density:o>1?r/(o*(o-1)):0,meanDegree:h,parts:c.length,largestPart:c[0]?.length??0,circles:d.length,inCircles:d.reduce((g,v)=>g+v.length,0),diameter:u.diameter,meanPath:u.mean,clustering:m.average,transitivity:m.transitivity,assortativity:op(t),deepestCore:Math.max(0,...J.cores(t).values()),tallest:Math.max(0,...J.heights(t).values()),sources:e.filter(g=>(a.get(g)?.size??0)===0).length,sinks:e.filter(g=>(s.get(g)?.size??0)===0).length,randomClustering:f,randomPath:p,smallWorld:w,neededBy:e.map(g=>a.get(g)?.size??0),needs:e.map(g=>s.get(g)?.size??0)}}function oe(t,e){if(e===0)return"–";const n=t/e*100;return`${n>=10?Math.round(n):Math.round(n*10)/10}%`}function H(t,e,n=`${e}s`){return`${t} ${t===1?e:n}`}function ip(t,e){const n=new Map(t.modules.filter(f=>!f.test).map(f=>[f.id,f.path])),s=new Set(t.modules.filter(f=>f.test).map(f=>f.id)),a=t.dependencies.filter(({from:f,to:p})=>n.has(f)&&n.has(p)).map(({from:f,to:p})=>[f,p]),o=(f,p)=>ds(a,e,p,f).size,r=n.size-1,i=r*(r-1)/2,l=[...J.pageRank(t).values()],h=J.pageRank(t).get(e)??0,c=f=>Math.abs(f-h)<=1e-9*Math.max(f,h),d=J.groups(t),u=d.get(e),m=new Map;for(const[f,p]of d){if(p!==u)continue;const w=V(n.get(f)??"");m.set(w,(m.get(w)??0)+1)}return{needs:o("needs",1),neededBy:o("neededBy",1),reaches:o("neededBy",1/0),dependsOn:o("needs",1/0),bridge:i>0?(J.bridges(t).get(e)??0)/i:0,rank:{place:1+l.filter(f=>f>h&&!c(f)).length,of:l.length,share:h,tied:l.filter(c).length-1},links:new Set(a.flatMap(([f,p])=>f===p?[]:f===e?[p]:p===e?[f]:[])).size,closeness:J.paths(t).closeness.get(e)??0,core:J.cores(t).get(e)??0,height:J.heights(t).get(e)??0,clustering:J.clustering(t).local.get(e)??0,tests:new Set(t.dependencies.filter(({from:f,to:p})=>p===e&&s.has(f)).map(({from:f})=>f)).size,group:{files:[...m.values()].reduce((f,p)=>f+p,0),boxes:[...m].sort((f,p)=>p[1]-f[1]||f[0].localeCompare(p[0]))}}}const E=t=>t.toFixed(1),dl=300,jn=12,ul=3;function mu(t,e,n=e){const s=r=>E(ul+r/Math.max(1,n-1)*(dl-ul*2)),a=t.went??e-1,o=t.changed.map(r=>`<line class="change" x1="${s(r)}" x2="${s(r)}" y1="1.5" y2="${jn-1.5}"/>`).join("");return`<svg class="life" viewBox="0 0 ${dl} ${jn}" role="img" aria-label="written at commit ${t.born+1}, changed at ${t.changed.length} commits after"><line class="lived" x1="${s(t.born)}" x2="${s(a)}" y1="${jn/2}" y2="${jn/2}"/>${o}<circle class="written" cx="${s(t.born)}" cy="${jn/2}" r="2.4"/></svg>`}const lp="https://github.com/drpicox/david-rodenas.com";function fu(t,e,n="file"){const s=n==="box"&&!/\.[a-z]+$/.test(e);return`${lp}/${s?"tree":"blob"}/${t}/src/${e}`}function Xa(t,e,n=new Set){const s=t.modules.filter(h=>!h.test),a=new Map(s.map(h=>[h.id,V(h.path)])),o=new Map(e.map(h=>[h.id,h.changed.filter(c=>!n.has(c)).length])),r=new Map,i=new Map;for(const{from:h,to:c}of t.dependencies){const[d,u]=[a.get(h),a.get(c)];d===void 0||u===void 0||d===u||(i.set(d,(i.get(d)??new Set).add(h)),r.set(u,(r.get(u)??new Set).add(h)))}return[...new Set(a.values())].sort((h,c)=>h.localeCompare(c)).map(h=>{const c=s.filter(m=>a.get(m.id)===h),[d,u]=[r.get(h)?.size??0,i.get(h)?.size??0];return{box:h,files:c.length,neededBy:d,needs:u,instability:d+u>0?u/(d+u):null,abstractness:c.filter(m=>m.typesOnly).length/c.length,changes:c.reduce((m,f)=>m+(o.get(f.id)??0),0)}})}const Ii={modules:[],dependencies:[]},us=3,ze=t=>t.toFixed(2).replace("-","−"),pu=t=>t.split("/").pop()??t,hp=t=>`${t}${t%100>=11&&t%100<=13?"th":["th","st","nd","rd"][t%10]??"th"}`,Y=(t,e)=>`<dt>${t}</dt><dd>${e}</dd>`,Na=t=>`<span class="details-by">${t}</span>`,gu=(t,e,n,s=`${n}s`)=>`${t.join(", ")}${e>0?` and ${e} more ${e===1?n:s}`:""}`,wu=(t,e)=>`<a href="${M(t)}" target="_blank" rel="noopener noreferrer">${e}</a>`,Ci=t=>`<button type="button" data-file="${M(t)}">${M(pu(t))}</button>`,La=(t,e=t)=>`<button type="button" data-box="${M(t)}">${M(e)}</button>`,Pa='<button type="button" class="details-back" data-back>← the whole network</button>',ml=t=>gu(t.slice(0,us).map(({box:e,files:n})=>`${La(e)} ${n}`),t.length-us,"box","boxes");function cp(t){const e=Oi(t),n=new Map(t.modules.filter(c=>!c.test).map(c=>[c.id,c.path])),s=c=>[...c].filter(([d,u])=>n.has(d)&&u>0).sort((d,u)=>u[1]-d[1]||d[0]-u[0]).slice(0,us).map(([d])=>Ci(n.get(d)??"")).join(", ")||"none",a=Math.abs(e.assortativity),o=a<.05?"files with many links lean neither way":`files with many links lean to files with ${e.assortativity<0?"few":"many"}${a<.2?", a little":""}`,r=[...J.cores(t).values()].filter(c=>c===e.deepestCore).length,i=e.randomPath>0&&e.meanPath>0,[l,h]=[e.clustering/(e.randomClustering||1),e.meanPath/(e.randomPath||1)];return'<h3>The network</h3><p class="details-hint">Click a file or a box for its details, and a way to its code.</p><dl>'+Y("files",`${e.files}, joined by ${H(e.arrows,"arrow")}: ${oe(e.density,1)} of those there could be`)+Y("links",`${ze(e.meanDegree)} a file, on average, the arrows read either way`)+Y("parts",e.parts===1?"one: every file is joined to every other, some way":`${e.parts}; the largest holds ${H(e.largestPart,"file")}`)+Y("circles",e.circles===0?"none: no files need each other round in a circle":`${e.circles}, holding ${H(e.inCircles,"file")}`)+Y("apart",e.meanPath>0?`${ze(e.meanPath)} arrows between two files${e.parts>1?" of the largest part":""}, on average, and ${e.diameter} at most${i?`; ${ze(e.randomPath)} in a random network as big`:""}`:"no two files joined yet")+Y("clustering",`${ze(e.clustering)}: of the pairs of files joined to a file, the share joined to each other too, on average over the files${i?`; ${e.randomClustering.toPrecision(2)} in a random network as big`:""}`)+Y("small-world-ness",i?`${e.smallWorld.toFixed(1)}: ${Math.round(l)} times as clustered as chance, with ways ${h.toFixed(1)} times as long${e.smallWorld>1?": a small world":""}`:"none yet: too few links to set against chance")+Y("assortativity",`${ze(e.assortativity)}: ${o}`)+Y("deepest core",`${e.deepestCore}, ${H(r,"file")}: what is left when every file with fewer links than that is taken away, again and again`)+Y("tallest stack",`${H(e.tallest,"arrow")}: the longest chain of what needs what`)+Y("needed by none",H(e.sources,"file"))+Y("needing none",H(e.sinks,"file"))+"</dl><h4>The files it hinges on</h4><dl>"+Y("most needed",`${s(J.pageRank(t))} ${Na("by PageRank")}`)+Y("most between",s(J.bridges(t)))+Y("reaching furthest",s(J.reach(t)))+"</dl>"}function dp(t,e,n){const s=ip(t,e),a=Ka(t,V(n)),o=Math.max(0,...J.cores(t).values()),{boxes:r,files:i}=s.group;return"<h4>In the network</h4><dl>"+Y("needs",`${s.needs} directly, ${s.dependsOn} near or far`)+Y("needed by",`${s.neededBy} directly; a change to it could reach ${H(s.reaches,"file")}`)+Y("between",s.bridge===0?"on none of the shortest ways between two others":`on ${s.bridge<.001?"under 0.1%":oe(s.bridge,1)} of the shortest ways between two others`)+Y("PageRank",`${s.rank.tied>0?"joint ":""}${hp(s.rank.place)} of ${s.rank.of}${s.rank.tied>0?`, with ${H(s.rank.tied,"other")}`:""}`)+Y("apart",s.closeness>0?`${ze(1/s.closeness)} arrows from the rest of its part, on average`:"joined to nothing")+Y("core",s.core===o?`${s.core}, the deepest there is`:`${s.core}; the deepest is ${o}`)+Y("stack under it",H(s.height,"arrow"))+Y("clustering",s.links<2?"none: fewer than two files joined to it":`${ze(s.clustering)}: of the pairs of files joined to it, the share joined to each other too`)+Y("its group",`${H(i,"file")}: ${gu(r.slice(0,us).map(([l,h])=>`${La(l,pu(l))} ${h}`),r.length-us,"box","boxes")}`)+Y("its box",`${La(a.box)}: Ca ${a.ca}, Ce ${a.ce}, I ${a.instability===null?"none":ze(a.instability)}`)+Y("tests",s.tests===0?"no test imports it":`${H(s.tests,"test")} ${s.tests===1?"imports":"import"} it`)+"</dl>"}function up(t,e,n,s){const a=t.snapshots[e]??Ii,o=a.modules.find(w=>w.path===n),r=t.history.commits[e];if(!o||!r)return`${Pa}<p class="details-hint"><code>${M(n)}</code> is not there at this commit.</p>`;const i=ap(t,e,o.id),l=Ut(t,e),h=l.lives.find(w=>w.id===o.id),c=s?.sha===r.sha?s.lines[n]:void 0,d=i.changes.filter(w=>w.sweep).length,u=i.changes.at(-1),m=i.partners.map(({path:w,together:g,joined:v})=>`${Ci(w)} ${g}×${v==="none"?` ${Na("no arrow")}`:""}`),f=[...i.changes].reverse().map(({commit:w,sweep:g})=>`<li>${Be(w)} · ${M(w.subject)}${g?` ${Na("a sweep")}`:""}</li>`).join(""),p=a.dependencies.filter(({from:w})=>w===o.id).length;return`${Pa}<h3 class="details-name"><code>${M(n)}</code></h3><p class="details-where">${o.test?"a test":La(V(n))} · ${H(o.lines,"line")}${c===void 0?"":` · tests run ${Math.round(c)}% of it`} · ${wu(fu(r.sha,n),"its code")}</p>`+(o.test?`<p class="details-hint">A test, which imports ${H(p,"file")}: the network is what ships, and a test stands outside it.</p>`:dp(a,o.id,n))+"<h4>In the history</h4><dl>"+Y("written",`${Be(i.born.commit)}, commit ${i.born.at+1}: ${M(i.born.commit.subject)}`)+Y("changed",`${i.changes.length===0?"not since":H(i.changes.length,"time")}${d>0?`, ${d} of them in a sweep`:""}${h?mu(h,l.history.commits.length,t.history.commits.length):""}`)+(u?Y("last changed",`${Be(u.commit)}, ${u.at===e?"at the commit shown":`${H(e-u.at,"commit")} back`}`):"")+(i.ground?Y("its ground",`would lead one to expect ${i.ground.expected.toFixed(1)} changes; it had ${i.ground.actual}${d>0?", the sweeps left out":""}`):"")+(o.test?"":Y("changed with",m.length>0?m.join(", "):"no file twice"))+"</dl>"+(f?`<details class="details-commits"><summary>the ${H(i.changes.length,"commit")} that changed it</summary><ol reversed>${f}</ol></details>`:"")}function mp(t,e,n){const s=t.snapshots[e]??Ii,a=t.history.commits[e],o=Ka(s,n);if(!a||o.files.length===0)return`${Pa}<p class="details-hint"><code>${M(n)}</code> is not there at this commit.</p>`;const r=Ut(t,e),i=ot(r.history),l=Xa(s,r.lives,i).find(b=>b.box===n),{ca:h,ce:c,instability:d}=o,u=l?.abstractness??0,m=new Map(s.modules.map(b=>[b.id,b.path])),f=new Map(r.lives.map(b=>[b.id,b.changed.filter(k=>!i.has(k)).length])),p=[...o.files].sort((b,k)=>(f.get(k)??0)-(f.get(b)??0)||(m.get(b)??"").localeCompare(m.get(k)??"")),w=st(n)==="platform"?"a box of the frame":st(n)==="features"?"a feature":"the top of the source",g=/\.[a-z]+$/.test(n),v=d===null?null:Math.abs(u+d-1);return`${Pa}<h3 class="details-name"><code>${M(n)}</code></h3><p class="details-where">${w} · ${H(o.files.length,"file")} · ${wu(fu(a.sha,n,"box"),g?"its code":"its folder")}</p><h4>As Robert C. Martin measures it</h4><dl>`+Y("Ca",`${h}: files elsewhere that need it${o.neededBy.length>0?`, in ${ml(o.neededBy)}`:""}`)+Y("Ce",`${c}: its files that need elsewhere${o.needs.length>0?`, needing ${ml(o.needs)}`:""}`)+Y("instability",d===null?"none: it neither needs nor is needed":`I = Ce / (Ca + Ce) = ${c} / (${h} + ${c}) = ${Math.round(d*100)/100}`)+Y("abstractness",`A = ${ze(u)}, the share of its files of nothing but types`)+(v===null?"":Y("distance",`D = |A + I − 1| = ${ze(v)}${u+(d??0)<.5?": in the zone of pain":""}`))+"</dl><h4>In the history</h4><dl>"+Y("changes",`${l?.changes??0} to its files, ${((l?.changes??0)/o.files.length).toFixed(1)} a file, the sweeps left out`)+'</dl><h4>Its files, the most changed first</h4><ol class="details-files">'+p.map(b=>`<li>${Ci(m.get(b)??"")} ${Na(H(f.get(b)??0,"change"))}</li>`).join("")+"</ol>"}function yu(t,e,n,s){return n&&"file"in n?up(t,e,n.file,s):n&&"box"in n?mp(t,e,n.box):cp(t.snapshots[e]??Ii)}function bu(t){const e=new Map;for(const{from:n,to:s}of t.dependencies){const[a,o]=[V(n),V(s)];a!==o&&(e.has(a)||e.set(a,new Set),e.has(o)||e.set(o,new Set),e.get(a)?.add(o))}return Ai([...e.keys()],n=>e.get(n)??[]).filter(n=>n.length>1).map(n=>n.sort()).sort((n,s)=>(n[0]??"").localeCompare(s[0]??""))}function bs(t,e=!1){const n=new Map(t.modules.filter(a=>e||!a.test).map(a=>[a.id,V(a.path)])),s=new Map;for(const{from:a,to:o,typeOnly:r}of t.dependencies){const[i,l]=[n.get(a),n.get(o)];if(i===void 0||l===void 0||i===l)continue;const h=s.get(`${i}>${l}`)??{from:i,to:l,count:0,typeOnly:!0};s.set(`${i}>${l}`,{...h,count:h.count+1,typeOnly:h.typeOnly&&r})}return[...s.values()].sort((a,o)=>a.from.localeCompare(o.from)||a.to.localeCompare(o.to))}const en=12,yo=6,vu=14,Fa=14,bo=12,fp=14,fl=40,Nn=10,pp=16,gp=t=>Math.min(6,2.2+Math.sqrt(t)/4),ku=t=>t.split("/").pop()?.replace(/\.ts$/,"")??t;function pl(t,e){const n=new Map,s=a=>{const o=n.get(a);if(o!==void 0)return o;n.set(a,0);const r=Math.max(-1,...[...e.get(a)??[]].map(s))+1;return n.set(a,r),r};for(const a of t)s(a);return n}function wp(t,e,n){const s=new Map(t.map(u=>[u,u]));for(const u of n)for(const m of u)s.set(m,u[0]??m);const a=u=>s.get(u)??u,o=new Map,r=new Map;for(const{from:u,to:m}of e){const[f,p]=[st(u),st(m)];f!==p?o.set(f,(o.get(f)??new Set).add(p)):a(u)!==a(m)&&r.set(a(u),(r.get(a(u))??new Set).add(a(m)))}const i=[...new Set(t.map(st))],l=pl(i,o);i.sort((u,m)=>(l.get(m)??0)-(l.get(u)??0)||u.localeCompare(m));const h=pl([...new Set(t.map(a))],r),c=i.flatMap(u=>{const m=t.filter(p=>st(p)===u);return[...new Set(m.map(p=>h.get(a(p))??0))].sort((p,w)=>w-p).map(p=>({band:u,boxes:m.filter(w=>(h.get(a(w))??0)===p).sort()}))}),d=new Map;for(const u of c){const m=f=>{const p=e.filter(w=>w.to===f&&d.has(w.from)).map(w=>d.get(w.from)??.5);return p.length?p.reduce((w,g)=>w+g,0)/p.length:.5};u.boxes.sort((f,p)=>m(f)-m(p)||f.localeCompare(p)),u.boxes.forEach((f,p)=>d.set(f,p/Math.max(1,u.boxes.length-1)))}return c}function vo(t,e){const n=Math.max(1,Math.ceil(Math.sqrt(e*2.2))),s=n*Fa;return{columns:n,inner:s,width:Math.max(s+yo*2,ku(t).length*6+yo*2),height:vu+Math.ceil(e/n)*Fa+yo}}function yp(t,e){const n=a=>{const o=e.get(a);return o?o.x+o.width/2:0},s=(a,o,r)=>a?a.x+a.width*(o+1)/(r+1):0;return t.map(a=>{const[o,r]=[e.get(a.from),e.get(a.to)],i=t.filter(h=>h.from===a.from).sort((h,c)=>n(h.to)-n(c.to)),l=t.filter(h=>h.to===a.to).sort((h,c)=>n(h.from)-n(c.from));return{...a,x1:s(o,i.indexOf(a),i.length),y1:o?o.y+o.height:0,x2:s(r,l.indexOf(a),l.length),y2:r?r.y:0}})}function Za(t,{tests:e=!1,width:n=1100}={}){const s=t.modules.filter(f=>e||!f.test),a=new Map(s.map(f=>[f.id,f])),o=new Map;for(const f of[...s].sort((p,w)=>p.path.localeCompare(w.path))){const p=V(f.path);o.set(p,[...o.get(p)??[],f])}const r=bs(t,e),i=bu({dependencies:t.dependencies.flatMap(({from:f,to:p,typeOnly:w})=>{const[g,v]=[a.get(f),a.get(p)];return g&&v?[{from:g.path,to:v.path,typeOnly:w}]:[]})}),l=new Set(i.flat()),h=wp([...o.keys()],r,i),c=[],d=new Map,u=[];let m=en;return h.forEach((f,p)=>{const w=p===0||h[p-1]?.band!==f.band,g=h[p+1]?.band!==f.band;w&&(c.push({name:f.band,x:en,y:m,width:n-en*2,height:0}),m+=pp+Nn);const v=n-(en+Nn)*2,b=[[]];let k=0;for(const T of f.boxes){const $=vo(T,o.get(T)?.length??0).width;k>0&&k+$>v&&(b.push([]),k=0),b[b.length-1]?.push(T),k+=$+bo}let x=0;if(b.forEach((T,$)=>{$>0&&(m+=x+fp);const O=T.map(N=>vo(N,o.get(N)?.length??0)),L=O.reduce((N,j)=>N+j.width,0)+bo*(T.length-1);let F=en+Nn+(v-L)/2;x=0,T.forEach((N,j)=>{const S=O[j]??vo(N,0);d.set(N,{name:N,label:ku(N),x:F,y:m,width:S.width,height:S.height,rank:h.length-p,cyclic:l.has(N)});const A=F+(S.width-S.inner)/2;(o.get(N)??[]).forEach((I,D)=>{const[C,B]=[D%S.columns,Math.floor(D/S.columns)];u.push({id:I.id,path:I.path,box:N,x:A+(C+.5)*Fa,y:m+vu+(B+.5)*Fa,radius:gp(I.lines),test:I.test,typesOnly:I.typesOnly??!1})}),F+=S.width+bo,x=Math.max(x,S.height)})}),m+=x,g){const T=c[c.length-1];T&&(c[c.length-1]={...T,height:m+Nn-T.y}),m+=Nn}m+=fl}),{width:n,height:m-fl+en,bands:c,boxes:[...d.values()],balls:u,links:yp(r,d)}}function bp(t,e=!1){const n=t.modules.filter(a=>!e||!a.test),s=new Map(n.map(a=>[a.id,a.path]));return{modules:n.map(({path:a,lines:o,test:r,typesOnly:i=!1})=>({path:a,lines:o,test:r,typesOnly:i})),dependencies:t.dependencies.flatMap(({from:a,to:o,typeOnly:r})=>{const[i,l]=[s.get(a),s.get(o)];return i!==void 0&&l!==void 0?[{from:i,to:l,typeOnly:r}]:[]})}}function ji(t){const e=new Set(t.modules.filter(n=>n.test).map(n=>n.id));return new Set(t.dependencies.filter(n=>e.has(n.from)&&!e.has(n.to)).map(n=>n.to))}function ms(t){const e=bp(t,!0),n=new Set(t.modules.filter(a=>!a.test&&!a.typesOnly).map(a=>a.id)),s=e.dependencies.filter(a=>V(a.from)!==V(a.to));return{files:e.modules.length,tests:t.modules.length-e.modules.length,lines:e.modules.reduce((a,o)=>a+o.lines,0),boxes:new Set(e.modules.map(a=>V(a.path))).size,arrows:e.dependencies.length,crossing:s.length,typeOnly:e.dependencies.filter(a=>a.typeOnly).length,inCycles:bu(e).flat().length,testable:n.size,tested:[...ji(t)].filter(a=>n.has(a)).length}}const vp=new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"long",year:"numeric",timeZone:"Europe/Madrid"});function $u(t,e){const n=[`${H(e.files,"file")} in ${H(e.boxes,"box","boxes")}, ${H(e.tests,"test")}`,`${H(e.crossing,"arrow")} between boxes, ${e.typeOnly} of all ${e.arrows} onto a type`,`a test reaches ${e.tested} of the ${e.testable} files with something to test`,e.inCycles?`${H(e.inCycles,"box","boxes")} in a circle`:"no boxes in a circle"].join(" · "),s=M(t.sha);return`<a href="https://github.com/drpicox/david-rodenas.com/commit/${s}" target="_blank" rel="noopener noreferrer"><code>${s}</code></a> ${vp.format(new Date(t.date))} — ${M(t.subject)}<br><span class="measured">${n}</span>`}const Z=t=>Math.round(t*10)/10;function kp({x1:t,y1:e,x2:n,y2:s}){const a=Math.max(18,(s-e)/2);return`M${Z(t)} ${Z(e)} C${Z(t)} ${Z(e+a)} ${Z(n)} ${Z(s-a)} ${Z(n)} ${Z(s)}`}function xu(t,e={}){const n=t.bands.map(i=>`<g class="band" data-band="${M(i.name)}"><rect x="${Z(i.x)}" y="${Z(i.y)}" width="${Z(i.width)}" height="${Z(i.height)}" rx="6"/><text x="${Z(i.x+8)}" y="${Z(i.y+12)}">${M(i.name)}</text></g>`).join(""),s=t.links.map(i=>{const l=Z(Math.min(4,.8+Math.log2(i.count)*.7));return`<path class="link${i.typeOnly?" type-only":""}" stroke-width="${l}" d="${kp(i)}" marker-end="url(#arrowhead)"><title>${M(`${i.from} → ${i.to}: ${i.count}`)}</title></path>`}).join(""),a=t.boxes.map(i=>`<g class="box${i.cyclic?" cyclic":""}" data-box="${M(i.name)}"><rect x="${Z(i.x)}" y="${Z(i.y)}" width="${Z(i.width)}" height="${Z(i.height)}" rx="4"/><text x="${Z(i.x+6)}" y="${Z(i.y+10)}">${M(i.label)}</text></g>`).join(""),o=t.balls.map(i=>{const l=e.classes?.get(i.id),h=e.fills?.get(i.id);return`<circle class="ball${i.test?" test":""}${l?` ${M(l)}`:""}" cx="${Z(i.x)}" cy="${Z(i.y)}" r="${Z(e.radii?.get(i.id)??i.radius)}"${h?` style="fill: ${M(h)}"`:""}><title>${M(i.path)}</title></circle>`}).join(""),r=`${t.boxes.length} boxes, ${t.balls.length} files, ${t.links.length} arrows between boxes`;return`<svg class="architecture" viewBox="0 0 ${t.width} ${Z(t.height)}" role="img" aria-label="${r}"><defs><marker id="arrowhead" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z"/></marker></defs><g class="bands">${n}</g><g class="links">${s}</g><g class="boxes">${a}</g><g class="balls">${o}</g></svg>`}const ko=600,Ln=60,Ot=4;function Tu(t,e){const n=i=>Ot+i/Math.max(1,t.length-1)*(ko-Ot*2),s=(i,l)=>{const h=Math.max(1,...t.map(i)),c=t.map((d,u)=>`${n(u).toFixed(1)},${(Ln-Ot-i(d)/h*(Ln-Ot*2)).toFixed(1)}`).join(" ");return`<polyline class="${l}" points="${c}"/>`},a=(ko-Ot*2)/Math.max(1,t.length-1),o=t.map((i,l)=>i.inCycles?`<rect class="cycle" x="${(n(l)-a/2).toFixed(1)}" y="0" width="${a.toFixed(1)}" height="${Ln}"/>`:"").join(""),r=n(e).toFixed(1);return`<svg class="sparks" viewBox="0 0 ${ko} ${Ln}" role="img" aria-label="Files and arrows between boxes, commit by commit">${o}${s(i=>i.files,"files")}${s(i=>i.crossing,"crossing")}<line class="now" x1="${r}" x2="${r}" y1="0" y2="${Ln}"/><text x="${Ot}" y="11" class="files">files</text><text x="${Ot+34}" y="11" class="crossing">arrows between boxes</text></svg>`}function $p(t,e){const[n,s]=[t.snapshots[e],t.history.commits[e]];return!n||!s?"":`<figure class="architecture-figure"><div class="architecture-stage"><div class="architecture-view">${xu(Za(n))}</div><aside class="architecture-details" aria-label="Details">${yu(t,e,null,null)}</aside></div><figcaption>${$u(s,ms(n))}</figcaption>${Tu(t.snapshots.map(ms),e)}</figure>`}const Mu=t=>{const e=cs(t("/data/architecture.json"));return $p(e,e.history.commits.length-1)};function Ni(t,e){const n=new Map(e.map(s=>[s.box,s.instability]));return t.flatMap(({from:s,to:a,count:o})=>{const[r,i]=[n.get(s),n.get(a)];return r!=null&&i!==void 0&&i!==null&&i>r?[{from:s,to:a,count:o,rise:i-r}]:[]}).sort((s,a)=>a.rise-s.rise||a.count-s.count||s.from.localeCompare(a.from))}function xp(t,e,n=Yt){return Va(hu(t,e,n))}function Su(t){const e=[...Ei(t).values()];return e.length>0?e.reduce((n,s)=>n+s+1,0)/e.length**2:0}function Tp(t){const e=new Map(t.ratchets??[]);let n=null;return t.changes.map((s,a)=>(n=e.get(a)??n,n))}function fs(t){return M(t).replaceAll("/","/<wbr>")}const Mp=8;function Sp(t,e){const n=t.modules.filter(m=>!m.test),s=new Map(n.map(m=>[m.id,m.path])),a=m=>f=>new Set(t.dependencies.filter(p=>p[m]===f&&s.has(m==="from"?p.to:p.from)).map(p=>m==="from"?p.to:p.from)).size,[o,r]=[a("from"),a("to")],i=n.length-1,l=i*(i-1)/2,h=[...e].filter(([m,f])=>f>0&&s.has(m)).sort((m,f)=>f[1]-m[1]).slice(0,Mp),c=h.map(([m,f])=>`<tr><td><code>${fs(s.get(m)??"")}</code></td><td>${oe(f,l)}</td><td>${o(m)}</td><td>${r(m)}</td></tr>`).join(""),[d]=h,u=d?`${s.get(d[0])} stands on ${oe(d[1],l)} of the shortest ways between two other files that ship, the arrows read either way; where several ways are as short, each counts for its share.`:"No file stands between two others: nothing needs anything.";return`<figure class="changes-figure"><table class="bridges"><thead><tr><th>file</th><th>of the ways between two others</th><th>needs</th><th>needed by</th></tr></thead><tbody>${c}</tbody></table><figcaption>${M(u)}</figcaption></figure>`}const gl=640,Ls=180,wl=26,$o=14,Ap=150,Ep=4,yl=t=>t.reduce((e,n)=>({seen:e.seen+n.seen,changed:e.changed+n.changed}),{seen:0,changed:0});function Op(t,e){const n=f=>yl(t.filter(p=>p.distance===f)),s=[["a file it needs changed",n(1)],["two arrows down",n(2)],["three",n(3)],["four or more",yl(t.filter(f=>f.distance!==null&&f.distance>=Ep))],["nothing it needs changed",n(null)]],a=({seen:f,changed:p})=>f>0?p/f:0,o=Math.max(1e-4,...s.map(([,f])=>a(f))),r=gl-Ls-Ap,i=s.map(([f,p],w)=>{const g=8+w*wl,v=Math.max(1,a(p)/o*r);return`<text class="label" x="${Ls-8}" y="${E(g+$o-3)}" text-anchor="end">${f}</text><rect class="bar${w===s.length-1?" none":""}" x="${Ls}" y="${E(g)}" width="${E(v)}" height="${$o}" rx="2"/><text class="value" x="${E(Ls+v+6)}" y="${E(g+$o-3)}">${oe(p.changed,p.seen)} · ${p.changed} of ${p.seen}</text>`}).join(""),l=8+s.length*wl,h=`<svg class="cascade" viewBox="0 0 ${gl} ${l}" role="img" aria-label="The share of files that changed with a change below them, by how far below it was">${i}</svg>`,[c,d,,,u]=s.map(([,f])=>oe(f.changed,f.seen)),m=`In theory, a change to one file can reach ${oe(e,1)} of the source, on average: itself, what needs it, and what needs that, as far as the arrows go. In the history, of the times something a file needs changed, the file changed too in ${c}; when the nearest change was two arrows down, in ${d}; when nothing it needs changed, in ${u}.`;return`<figure class="changes-figure">${h}<figcaption>${m}</figcaption></figure>`}function Au(t){return t.went===void 0?V(t.path):null}function Ip(t,e){const n=new Map,s=(o,r,i,l)=>{const[,h,c]=o.cells.get(r)??[r,0,0];o.cells.set(r,[r,h+i,c+l])};for(const o of t){if(o.test)continue;const r=Au(o),i=n.get(r)??{born:o.born,cells:new Map};i.born=Math.min(i.born,o.born),n.set(r,i),s(i,o.born,0,1);for(const l of o.changed)s(i,l,1,0)}const a=o=>o===null?1/0:e.includes(o)?e.indexOf(o):e.length;return[...n].map(([o,{born:r,cells:i}])=>({box:o,band:o===null?null:st(o),born:r,cells:[...i.values()].sort((l,h)=>l[0]-h[0])})).sort((o,r)=>a(o.band)-a(r.band)||o.born-r.born||(o.box??"").localeCompare(r.box??"")).map(({box:o,band:r,cells:i})=>({box:o,band:r,cells:i}))}const bl=1100,Ma=150,Cp=6,Zn=11,jp=16,Np=8,Lp=20,Pp=t=>Math.min(1,.25+.25*Math.log2(t)),Fp=t=>t.box===null?"gone":t.box.slice(t.box.indexOf("/")+1);function Bp(t,e,n){const s=[];let a=0,o;for(const r of t){r.band!==o&&(a+=o===void 0?0:Np,r.band!==null&&(s.push(`<text class="band" x="0" y="${E(a+11)}">${M(r.band)}</text>`),a+=jp),o=r.band);const i=r.cells.reduce((c,[,d])=>c+d,0),l=r.cells.reduce((c,[,,d])=>c+d,0),h=`${r.box??"the files that are gone"}: ${H(i,"change")}, ${H(l,"file")} written`;s.push(`<text class="row" data-box="${M(r.box??"")}" data-top="${E(a)}" x="${Ma-6}" y="${E(a+Zn-2.5)}" text-anchor="end">${M(Fp(r))}<title>${M(h)}</title></text>`);for(const[c,d,u]of r.cells)d>0&&s.push(`<rect class="changed" x="${E(e(c)+.5)}" y="${E(a+.5)}" width="${E(Math.max(1,n-1))}" height="${Zn-2}" rx="1" style="--v:${Pp(d).toFixed(2)}"/>`),u>0&&s.push(`<circle class="written" cx="${E(e(c)+n/2)}" cy="${E(a+Zn/2-.5)}" r="1.7"/>`);a+=Zn}return{markup:s.join(""),bottom:a}}function Rp(t,e,n){const s=[];let a=-1/0;return t.forEach((o,r)=>{const i=Be(o);r>0&&Be(t[r-1]??o)===i||e(r)-a<36||(a=e(r),s.push(`<line class="day" x1="${E(e(r))}" x2="${E(e(r))}" y1="${E(n+2)}" y2="${E(n+6)}"/><text class="day" x="${E(e(r))}" y="${E(n+16)}">${i}</text>`))}),s.join("")}function Dp(t,e,n,s=e.length-1){const a=(bl-Ma-Cp)/Math.max(1,e.length),o=c=>Ma+c*a,{markup:r,bottom:i}=Bp(t,o,a),l=s<e.length-1?`<rect class="future" x="${E(o(s+1))}" y="0" width="${E(o(e.length)-o(s+1))}" height="${E(i)}"/><line class="now" x1="${E(o(s)+a/2)}" x2="${E(o(s)+a/2)}" y1="0" y2="${E(i+4)}"/>`:"",h=[...n].map(c=>{const d=e[c];return d?`<rect class="sweep" x="${E(o(c))}" y="0" width="${E(a)}" height="${E(i)}"><title>${M(`${Be(d)}, a sweep: ${d.subject}`)}</title></rect>`:""}).join("");return`<svg class="change-matrix" data-left="${Ma}" data-step="${Number(a.toFixed(3))}" data-row="${Zn}" viewBox="0 0 ${bl} ${E(i+Lp)}" role="img" aria-label="${t.length} boxes over ${e.length} commits: where each commit changed files, and where it wrote new ones">${h}${r}${l}${Rp(e,o,i)}</svg>`}const vl=["January","February","March","April","May","June","July","August","September","October","November","December"];function Wp(t,e){const[n,s=1,a]=t.date.slice(0,10).split("-").map(Number),[o,r=1,i]=e.date.slice(0,10).split("-").map(Number),[l,h]=[vl[s-1],vl[r-1]];return n!==o?`from ${a} ${l} ${n} to ${i} ${h} ${o}`:s!==r?`from ${a} ${l} to ${i} ${h} ${o}`:a===i?`on ${a} ${l} ${n}`:`from ${a} to ${i} ${h} ${o}`}function Hp(t,e=t.history.commits.length-1){const{history:n,snapshots:s,lives:a}=t,o=s.at(-1)??{modules:[],dependencies:[]},r=Za(o).bands.map(g=>g.name),i=ot(n),l=Ut(t,e),h=l.lives.filter(g=>!g.test),c=h.reduce((g,v)=>g+v.changed.length,0),[d,u]=[n.commits[0],l.history.commits.at(-1)],m=l.history.commits.length===n.commits.length?H(n.commits.length,"commit"):`${l.history.commits.length} of ${H(n.commits.length,"commit")}`,f=d&&u?`${m}, ${Wp(d,u)}`:"no commits",p=(g,v)=>`<span class="key ${g}"></span>${v}`,w=(g,v)=>`<span class="key shade" style="--v:${g}"></span>${v}`;return`<figure class="changes-figure">${Dp(Ip(a,r),n.commits,i,l.history.commits.length-1)}<p class="changes-pointed" aria-live="polite"></p><p class="changes-legend">${w(.25,"one file changed")}${w(.5,"two")}${w(.75,"four")}${w(1,"eight or more")}${p("written","a file written")}${p("sweep",`a sweep, over ${Yt} files at once`)}</p><figcaption>${f}: ${H(c,"change")} to files that ship, and ${H(h.length,"file")} written.</figcaption></figure>`}const Ps=720,tn=220,Ke={x:300,width:120},nn=34,Fs=22,Bs=13,kl=8;function qp(t){const e=[...new Set(t.modules.filter(a=>!a.test).map(a=>V(a.path)))].map(a=>Ka(t,a)),n=e.filter(({ca:a,ce:o})=>a>=3&&o>=2);return[...n.length>0?n:e].sort((a,o)=>Math.abs((a.instability??1)-.5)-Math.abs((o.instability??1)-.5)||o.files.length-a.files.length||a.box.localeCompare(o.box))[0]?.box??""}function $l(t){const e=t.slice(0,kl).map(({box:s,files:a})=>`${s} · ${H(a,"file")}`),n=t.slice(kl);return n.length>0&&e.push(`and ${H(n.length,"box","boxes")} more · ${H(n.reduce((s,a)=>s+a.files,0),"file")}`),e}const zp=t=>t===null?"Neither needed nor needing, it has no instability to speak of.":t<.3?"Stable: much stands on it, and it stands on little — hard to change, and seldom made to.":t>.7?"Unstable: it stands on much, and little stands on it — often made to change, and free to.":"Between the two: it is needed, and it needs.";function Gp(t){const[e,n]=[$l(t.neededBy),$l(t.needs)],s=Math.max(1,Math.min(8,Math.ceil(Math.sqrt(t.files.length*1.6)))),a=Math.max(Fs*2,24+Math.ceil(t.files.length/s)*Bs+8),o=nn+Math.max(e.length*Fs,n.length*Fs,a)+12,r=new Set(t.needing),i=(p,w)=>nn+a*(w+1)/(p+1),l=p=>nn+12+p*Fs,h=(p,w,g,v)=>`M${E(p)} ${E(w)} C${E((p+g)/2)} ${E(w)} ${E((p+g)/2)} ${E(v)} ${E(g)} ${E(v)}`,c=e.map((p,w)=>{const g=l(w);return`<text class="coupled in" x="${tn-8}" y="${E(g+4)}" text-anchor="end">${M(p)}</text><path class="arrow in" d="${h(tn,g,Ke.x-3,i(e.length,w))}" marker-end="url(#coupled-in)"/>`}).join(""),d=n.map((p,w)=>{const g=l(w);return`<path class="arrow out" d="${h(Ke.x+Ke.width,i(n.length,w),Ps-tn-3,g)}" marker-end="url(#coupled-out)"/><text class="coupled out" x="${Ps-tn+8}" y="${E(g+4)}">${M(p)}</text>`}).join(""),u=Ke.x+(Ke.width-s*Bs)/2,m=t.files.map((p,w)=>`<circle class="file${r.has(p)?" needing":""}" cx="${E(u+(w%s+.5)*Bs)}" cy="${E(nn+22+Math.floor(w/s)*Bs)}" r="4"/>`).join(""),f=p=>`<marker id="coupled-${p}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="head ${p}" d="M0 0 L10 5 L0 10 z"/></marker>`;return`<svg class="coupling" data-box="${M(t.box)}" viewBox="0 0 ${Ps} ${E(o)}" role="img" aria-label="${M(`${t.box}: ${t.ca} files elsewhere need it, ${t.ce} of its files need elsewhere`)}"><defs>${f("in")}${f("out")}</defs><text class="side in" x="${tn-8}" y="14" text-anchor="end">Ca = ${t.ca}: files elsewhere that need it</text><text class="side out" x="${Ps-tn+8}" y="14">Ce = ${t.ce}: its files that need elsewhere</text><rect class="box" x="${Ke.x}" y="${nn}" width="${Ke.width}" height="${E(a)}" rx="5"/><text class="box-name" x="${Ke.x+Ke.width/2}" y="${nn+11}" text-anchor="middle">${M(t.box.split("/").pop()??t.box)}</text>${m}${c}${d}</svg>`}function Eu(t,e=qp(t)){const n=Ka(t,e),{ca:s,ce:a,instability:o}=n,r=o===null?"I has nothing to divide":`I = Ce / (Ca + Ce) = ${a} / (${s} + ${a}) = ${Math.round(o*100)/100}`;return`<figure class="changes-figure coupling-figure">${Gp(n)}<figcaption><strong>${M(e)}</strong>: Ca = ${s}, the files elsewhere that need something in it; Ce = ${a}, its own files that need something elsewhere. ${r}. ${zp(o)}</figcaption></figure>`}function _p(t,e,n,s=12){const a=new Map(e.map(p=>[p.id,p])),o=new Set(n.modules.map(p=>p.id)),r=p=>o.has(p)&&a.get(p)?.test===!1,i=n.dependencies.map(({from:p,to:w})=>[p,w]),l={arrow:"an arrow",through:"arrows through others",none:"no arrow at all"},h=(p,w)=>l[du(i,p,w)],d=t.filter(({a:p,b:w})=>r(p)&&r(w)).slice(0,s).map(({a:p,b:w,together:g})=>({together:g,a:a.get(p)?.path??"",b:a.get(w)?.path??"",joined:h(p,w)})),u=d.filter(p=>p.joined==="no arrow at all").length,m=d.map(p=>`<tr${p.joined==="no arrow at all"?' class="hidden"':""}><td>${p.together}</td><td><code>${fs(p.a)}</code></td><td><code>${fs(p.b)}</code></td><td>${p.joined}</td></tr>`).join(""),f=`The ${d.length} pairs of files that changed together most, the tests and the sweeps left out, and what joins them in the source now. ${u} of them ${u===1?"has":"have"} no arrow between them, near or far.`;return`<figure class="changes-figure"><table class="together"><thead><tr><th>commits</th><th>one file</th><th>and the other</th><th>between them</th></tr></thead><tbody>${m}</tbody></table><figcaption>${f}</figcaption></figure>`}const xl=560,Rs=400,ke={left:44,right:16,top:12,bottom:44},Up=[0,1,2,5,10,20,50,100],xo=3,Ds=t=>`${Math.round(t*10)/10}`,To=t=>t.length>1?`${t.slice(0,-1).join(", ")} and ${t.at(-1)}`:t[0]??"";function Yp(t,e){const n=new Map(e.filter(k=>!k.test&&k.went===void 0).map(k=>[k.id,k.path])),s=[...t].flatMap(([k,x])=>{const T=n.get(k);return T===void 0?[]:[{path:T,...x}]}),a=Math.max(1,...s.map(({expected:k,actual:x})=>Math.max(k,x))),[o,r]=[xl-ke.left-ke.right,Rs-ke.top-ke.bottom],i=k=>ke.left+Math.sqrt(k/a)*o,l=k=>ke.top+r-Math.sqrt(k/a)*r,h=s.filter(({expected:k,actual:x})=>x>=2*k&&x-k>=2).sort((k,x)=>x.actual-x.expected-(k.actual-k.expected)),c=s.filter(({expected:k,actual:x})=>x<=k/2&&k-x>=1).sort((k,x)=>x.expected-x.actual-(k.expected-k.actual)),d=[...s].sort((k,x)=>x.expected-k.expected).slice(0,xo),u=Up.filter(k=>k<=a).map(k=>`<text x="${E(i(k))}" y="${E(Rs-ke.bottom+14)}" text-anchor="middle">${k}</text><text x="${E(ke.left-6)}" y="${E(l(k)+3)}" text-anchor="end">${k}</text>`).join(""),m=s.map(k=>`<circle class="file${h.includes(k)?" above":c.includes(k)?" below":""}" cx="${E(i(k.expected))}" cy="${E(l(k.actual))}" r="3.2"><title>${M(`${k.path}: ${k.actual} changes, ${Ds(k.expected)} from its ground`)}</title></circle>`).join(""),f=(k,x,T)=>{const $=l(k.actual)+(x==="above"?-4:12)+T*11,O=$>ke.top+r-3?l(k.actual)-6-T*11:$;return`<text class="name ${x}" x="${E(i(k.expected)+6)}" y="${E(O)}">${M(k.path.split("/").pop()??k.path)}</text>`},p=[...h.slice(0,2).map((k,x)=>f(k,"above",x)),...c.slice(0,2).map((k,x)=>f(k,"below",x))].join(""),w=`<svg class="ground" viewBox="0 0 ${xl} ${Rs}" role="img" aria-label="Every file by the changes its ground would lead one to expect and the changes it had"><rect class="frame" x="${ke.left}" y="${ke.top}" width="${o}" height="${r}"/><line class="even" x1="${E(i(0))}" y1="${E(l(0))}" x2="${E(i(a))}" y2="${E(l(a))}"/><text class="even-name" x="${E(i(a*.62))}" y="${E(l(a*.62)+14)}">as its ground would lead one to expect</text>${m}${p}${u}<text class="axis" x="${E(ke.left+o/2)}" y="${Rs-8}" text-anchor="middle">what its ground would lead one to expect, in changes</text><text class="axis" transform="translate(12 ${E(ke.top+r/2)}) rotate(-90)" text-anchor="middle">the changes it had</text></svg>`,g=[`The files whose ground would lead one to expect the most changes: ${To(d.map(k=>`${k.path} (${Ds(k.expected)})`))}.`,h.length>0?`The ones that changed far more than theirs would: ${To(h.slice(0,xo).map(k=>`${k.path} (${k.actual} against ${Ds(k.expected)})`))}.`:"",c.length>0?`The ones that changed far less: ${To(c.slice(0,xo).map(k=>`${k.path} (${k.actual} against ${Ds(k.expected)})`))}.`:""].filter(Boolean).join(" "),v=(k,x)=>`<span class="key dot ${k}"></span>${x}`,b=`<p class="changes-legend">${v("above","changed far more than its ground would lead one to expect")}${v("below","far less")}${v("even","about as much")}</p>`;return`<figure class="changes-figure">${w}${b}<figcaption>${M(g)}</figcaption></figure>`}function Ur(t,e){const{ids:n,weights:s}=$t(t),a=l=>[...s.get(l)?.values()??[]].reduce((h,c)=>h+c,0),o=n.reduce((l,h)=>l+a(h),0);if(o===0)return 0;const r=new Map,i=new Map;for(const l of n){const h=e.get(l)??-1-l;i.set(h,(i.get(h)??0)+a(l));for(const[c,d]of s.get(l)??[])(e.get(c)??-1-c)===h&&r.set(h,(r.get(h)??0)+d)}return[...i].reduce((l,[h,c])=>l+(r.get(h)??0)/o-(c/o)**2,0)}const Jp=720,Tl=240,Ml=20,Sl=12,Al=3,Mo=3,Kp={platform:"frame",features:"feature"};function Vp(t,e){const n=new Map(t.modules.map(b=>[b.id,b.path])),s=new Map;for(const[b,k]of e){const x=V(n.get(b)??""),T=s.get(k)??new Map;T.set(x,(T.get(x)??0)+1),s.set(k,T)}const a=[...s.values()].map(b=>({boxes:[...b].sort((k,x)=>x[1]-k[1]||k[0].localeCompare(x[0])),files:[...b.values()].reduce((k,x)=>k+x,0)})).sort((b,k)=>k.files-b.files||(b.boxes[0]?.[0]??"").localeCompare(k.boxes[0]?.[0]??"")),o=a.filter(b=>b.files>=Al),r=Math.max(1,...o.map(b=>b.files)),i=o.map((b,k)=>{const x=6+k*Ml;let T=0;const $=b.boxes.map(([F,N])=>{const j=N/r*Tl,S=`<rect class="part ${Kp[st(F)]??"root"}" x="${E(T)}" y="${E(x)}" width="${E(Math.max(1,j-2))}" height="${Sl}" rx="2"><title>${M(`${F}: ${N}`)}</title></rect>`;return T+=j,S}).join(""),O=b.boxes.slice(0,Mo).map(([F,N])=>`${F.split("/").pop()} ${N}`).join(", "),L=b.boxes.length>Mo?` and ${b.boxes.length-Mo} more`:"";return`${$}<text class="group" x="${Tl+12}" y="${E(x+Sl-2)}">${M(`${H(b.files,"file")}: ${O}${L}`)}</text>`}).join(""),l=6+o.length*Ml+4,h=`<svg class="groups" viewBox="0 0 ${Jp} ${l}" role="img" aria-label="The groups the arrows make of the files, each as the boxes its files are in">${i}</svg>`,c=new Map(t.modules.filter(b=>!b.test).map(b=>[b.id,V(b.path)])),d=[...new Set(c.values())],u=new Map([...c].map(([b,k])=>[b,d.indexOf(k)])),m=new Map;for(const b of c.values())m.set(b,(m.get(b)??0)+1);const f=[...m.keys()].filter(b=>st(b)==="features"&&b.includes("/")&&!b.endsWith(".ts")),p=f.filter(b=>a.some(k=>k.boxes.length===1&&k.boxes[0]?.[0]===b&&k.files===m.get(b))),w=a.length-o.length,g=`The arrows alone, with no box said, gather the ${H(e.size,"file")} that ship into ${H(a.length,"group")}${w>0?`, ${H(w,"group")} of fewer than ${Al} files among them, not drawn`:""}. ${p.length} of the ${H(f.length,"feature")} ${p.length===1?"is a group to itself":"are a group to themselves"}: all of ${p.length===1?"its":"their"} files, and nothing else. Drawn as the boxes say, the source has a modularity of ${Ur(t,u).toFixed(2)}; drawn as the arrows would, ${Ur(t,e).toFixed(2)}.`,v=(b,k)=>`<span class="key ${b}"></span>${k}`;return`<figure class="changes-figure">${h}<p class="changes-legend">${v("frame","a box of the frame")}${v("feature","a feature")}${v("root","the top of the source")}</p><figcaption>${M(g)}</figcaption></figure>`}function Xp(t,e,n,s=12,a=e){const o=t.filter(c=>!c.test&&c.went===void 0).sort((c,d)=>d.changed.length-c.changed.length||d.lines-c.lines||c.path.localeCompare(d.path)).slice(0,s),r=c=>n?.lines[c.path],i=o.map(c=>{const d=r(c);return`<tr><td><code>${fs(c.path)}</code></td><td>${c.changed.length}</td><td>${c.lines}</td><td>${d===void 0?"–":`${Math.round(d)}%`}</td><td>${mu(c,e,a)}</td></tr>`}).join(""),l=o.filter(c=>r(c)===0).length,h=[`The ${o.length} files changed most, each one's life on the same line of commits, from the first to the last: a dot where it was written, and a mark for every commit that changed it.`,n?`${l} of them ${l===1?"has":"have"} no line a test runs.`:""].join(" ");return`<figure class="changes-figure"><table class="hotspots"><thead><tr><th>file</th><th>changes</th><th>lines</th><th>tests run</th><th>its life, commit by commit</th></tr></thead><tbody>${i}</tbody></table><figcaption>${h.trim()}</figcaption></figure>`}const So={width:440,height:290},se={left:52,right:428,top:14,bottom:238},Yr={width:250,height:214,bar:130},Zp=[1,2,5,10,20,50,100,200,500],Qp=[1,.1,.01,.001],El=t=>t>=10?`${Math.round(t)}`:t.toFixed(1),Ba=t=>t.split("/").pop()??t;function Ol(t){const e=new Map;for(const s of t)s>0&&e.set(s,(e.get(s)??0)+1);let n=[...e.values()].reduce((s,a)=>s+a,0);return[...e].sort((s,a)=>s[0]-a[0]).map(([s,a])=>{const o={degree:s,files:n};return n-=a,o})}function Ra(t,e){const n=Math.max(0,...t);return{degree:n,path:e[t.indexOf(n)]?.path??""}}function Il(t,e,n,s,a){const o=Math.max(n,s)||1,r=(i,l,h,c)=>{const d=Math.max(1.5,i/o*Yr.bar);return`<rect class="bar ${l}" x="4" y="${h}" width="${E(d)}" height="11" rx="2"/><text class="value" x="${E(4+d+6)}" y="${h+9}">${a(i)} ${c}</text>`};return`<text class="pair" x="4" y="${t}">${e}</text>${r(n,"mine",t+7,"here")}${r(s,"chance",t+22,"at random")}`}function eg(t,e){const n=Math.max(2,...t.neededBy,...t.needs),s=Math.max(2,t.files),a=d=>se.left+Math.log(d)/Math.log(n)*(se.right-se.left),o=d=>se.top+-Math.log(d)/Math.log(s)*(se.bottom-se.top),r=(d,u,m)=>{const f=d.map(({degree:g,files:v})=>`${E(a(g))},${E(o(v/t.files))}`),p=f.length>1?`<polyline class="tail ${u}" points="${f.join(" ")}"/>`:"",w=d.map(({degree:g,files:v})=>`<circle class="dot ${u}" cx="${E(a(g))}" cy="${E(o(v/t.files))}" r="3"><title>${m} ${g} or more: ${H(v,"file")}, ${oe(v,t.files)}</title></circle>`).join("");return p+w},[i,l]=[Ra(t.neededBy,e),Ra(t.needs,e)],h=[{end:i,kind:"in",words:`${Ba(i.path)}, needed by ${i.degree}`},{end:l,kind:"out",words:`${Ba(l.path)}, needing ${l.degree}`}].filter(({end:d})=>d.degree>0).map(({kind:d,words:u},m)=>`<circle class="dot ${d}" cx="${se.right-9}" cy="${se.top+13+m*15}" r="3"/><text class="end" x="${se.right-17}" y="${se.top+16.5+m*15}" text-anchor="end">${M(u)}</text>`).join(""),c=Zp.filter(d=>d<=n).map(d=>`<text class="tick" x="${E(a(d))}" y="${se.bottom+14}" text-anchor="middle">${d}</text>`).join("")+Qp.filter(d=>d>=1/s).map(d=>`<text class="tick" x="${se.left-6}" y="${E(o(d)+3)}" text-anchor="end">${d*100}%</text>`).join("");return`<svg class="network tails" viewBox="0 0 ${So.width} ${So.height}" role="img" aria-label="The share of files needed by so many others or more, and the share needing so many or more, on log scales"><rect class="frame" x="${se.left}" y="${se.top}" width="${se.right-se.left}" height="${se.bottom-se.top}"/>${c}${r(Ol(t.needs),"out","needing")}${r(Ol(t.neededBy),"in","needed by")}${h}<text class="axis" x="${(se.left+se.right)/2}" y="${So.height-22}" text-anchor="middle">how many others: needed by, or needing (a log scale)</text><text class="axis" transform="translate(12 ${(se.top+se.bottom)/2}) rotate(-90)" text-anchor="middle">the share of files (a log scale)</text></svg>`}function tg(t){return`<svg class="network chance" viewBox="0 0 ${Yr.width} ${Yr.height}" role="img" aria-label="The network's clustering and paths against a random network as big"><text class="side-title" x="4" y="22">against a random network as big</text>`+Il(52,"clustering",t.clustering,t.randomClustering,e=>e.toPrecision(2))+Il(112,"mean way between two files, in arrows",t.meanPath,t.randomPath,e=>e.toFixed(2))+`<text class="pair" x="4" y="176">small-world-ness</text><text class="hero" x="4" y="206">${t.smallWorld.toFixed(1)}</text></svg>`}function ng(t){const e=Oi(t),n=t.modules.filter(h=>!h.test),s=e.randomPath>0&&e.meanPath>0,[a,o]=[Ra(e.neededBy,n),Ra(e.needs,n)],r=e.neededBy.filter(h=>h<=2).length,i=e.arrows===0?`The ${H(e.files,"file")} that ship need nothing of each other yet.`:`Of the ${H(e.files,"file")} that ship, ${oe(r,e.files)} are needed by two others or fewer, and ${Ba(a.path)} is needed by ${a.degree}, the most; ${Ba(o.path)} needs ${o.degree}, the most. `+(s?`The network is ${El(e.clustering/e.randomClustering)} times as clustered as a random network of as many files and links, and the ways between its files are ${El(e.meanPath/e.randomPath)} times as long: a small-world-ness of ${e.smallWorld.toFixed(1)}.`:"It has too few links yet to set against a random network."),l=(h,c)=>`<span class="key ${h}"></span>${c}`;return`<figure class="changes-figure"><div class="network-drawings">${eg(e,n)}${s?tg(e):""}</div><p class="changes-legend">${l("needed-by","needed by so many or more")}${l("needing","needing so many or more")}</p><figcaption>${M(i)}</figcaption></figure>`}const Cl=240,Ws=36,Hs=4,sg=new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"long",year:"numeric",timeZone:"Europe/Madrid"}),kn=[{key:"againstStability",name:"arrows against stability",counts:"box arrows from a box to one less stable than itself, by Robert C. Martin's measure; the composition's aside, which has to point at every feature",said:t=>`${t} box ${t===1?"arrow":"arrows"} against stability`},{key:"deepestCore",name:"deepest core",counts:"how deep the knot of files goes: what is left when every file with fewer links than that is taken away, again and again",said:t=>`a core ${t} deep`},{key:"tallestStack",name:"tallest stack",counts:"the longest chain of what needs what, in arrows",said:t=>`a stack ${t} ${t===1?"arrow":"arrows"} tall`},{key:"untested",name:"untested files",counts:"files that ship with something in them to run that no test imports",said:t=>`${t} ${t===1?"file":"files"} with something to run that no test imports`}],Qa=t=>t.length>1?`${t.slice(0,-1).join(", ")} and ${t.at(-1)}`:t[0]??"",Jr=t=>Qa(kn.map(({key:e,said:n})=>n(t[e]??0))),Kr=t=>sg.format(new Date(t??""));function ag(t,e,n,s,a){const o=Math.max(1,...t,...e.filter(c=>c!==null)),r=c=>Hs+c/Math.max(1,t.length-1)*(Cl-Hs*2),i=c=>Ws-Hs-c/o*(Ws-Hs*2),l=(c,d)=>t.slice(c,d+1).map((u,m)=>`${E(r(c+m))},${E(i(u))}`).join(" ");let h="";if(s!==null){h=`M${E(r(s))} ${E(i(e[s]??0))}`;for(let c=s+1;c<e.length;c+=1)h+=` H${E(r(c))} V${E(i(e[c]??0))}`;h+=" h0.1"}return`<svg class="ratchet-line" viewBox="0 0 ${Cl} ${Ws}" role="img" aria-label="${a}: measured at every commit, and held by the ratchet from where it began">`+(s===null?"":`<line class="began" x1="${E(r(s))}" x2="${E(r(s))}" y1="0" y2="${Ws}"/><path class="held-band" d="${h}"/>`)+`<polyline class="after" points="${l(n,t.length-1)}"/><polyline class="measured" points="${l(0,n)}"/><circle class="now" cx="${E(r(n))}" cy="${E(i(t[n]??0))}" r="2.5"/></svg>`}function og(t,e,n,s){if(!e)return n===null?"":`The ratchet began on ${Kr(s[n])}, after this commit.`;const a=kn.filter(({key:r})=>t[r]!==(e[r]??t[r]));if(a.length===0)return`At this commit, the ratchet holds ${Jr(e)}, and the source measures the same.`;const o=a.map(({key:r,said:i})=>`${i(t[r])}, ${t[r]>(e[r]??0)?"above":"below"} what it holds`);return`At this commit, the ratchet holds ${Jr(e)}; the source measures ${Qa(o)}.`}function rg(t,e,n,s){const a=t.slice(s,n+1).flatMap((r,i)=>{const l=e[s+i],h=kn.filter(({key:c})=>l&&r[c]>(l[c]??r[c]));return h.length>0?[h]:[]});if(a.length===0)return"At no commit since it began has the source measured more than the ratchet held.";const o=kn.filter(r=>a.some(i=>i.includes(r))).map(({name:r})=>`the ${r}`);return`At ${H(a.length,"commit")} since it began, the source measured more than the ratchet held: ${Qa(o)}.`}function ig(t,e,n){const s=[];return t.slice(0,e+1).forEach((a,o)=>{const r=t[o-1]??null;if(!a||JSON.stringify(a)===JSON.stringify(r))return;if(!r){s.push(`${Kr(n[o])}: began, holding ${Jr(a)}`);return}const i=kn.filter(({key:c})=>a[c]!==r[c]),l=i.filter(({key:c})=>(a[c]??0)<(r[c]??0)).length,h=l===i.length?"tightened":l===0?"loosened":"changed";s.push(`${Kr(n[o])}: ${h}, ${Qa(i.map(({key:c,name:d})=>`the ${d} from ${r[c]} to ${a[c]}`))}`)}),s.length>0?`<p class="ratchet-log-title">How the ratchet went</p><ol class="ratchet-log">${s.map(a=>`<li>${a}</li>`).join("")}</ol>`:""}function lg(t,e,n,s){const a=t[e]??t.at(-1);if(!a)return"";const o=n.findIndex(c=>c!==null),r=o<0?null:o,i=kn.map(({key:c,name:d,counts:u})=>{const m=n.map(f=>f?f[c]??null:null);return`<tr><td><strong>${d}</strong><br><span class="ratchet-counts">${u}</span></td><td>${ag(t.map(f=>f[c]),m,e,r,d)}</td><td class="held">${m[e]??"–"}</td><td class="now">${a[c]}</td></tr>`}).join(""),l=[og(a,n[e]??null,r,s),r!==null&&e>=r?rg(t,n,e,r):""].filter(Boolean).join(" "),h=(c,d)=>`<span class="key ${c}"></span>${d}`;return`<figure class="changes-figure"><table class="ratchet"><thead><tr><th>what the ratchet holds</th><th>over the history</th><th>held</th><th>measured</th></tr></thead><tbody>${i}</tbody></table><p class="changes-legend">${h("ratchet-measured","measured at every commit")}${h("ratchet-held","held by the ratchet")}</p>${ig(n,e,s)}${l?`<figcaption>${l}</figcaption>`:""}</figure>`}function eo(t){if(t<=0)return[0];const e=10**Math.floor(Math.log10(t)),n=t/e>=5?e:t/e>=2?e/2:e/5,s=[];for(let a=0;a<=t;a+=n)s.push(Math.round(a*100)/100);return s}const Ao=600,qs=150,Ve={top:12,right:12,bottom:22,left:40},hg=3,jl=new WeakMap,cg=t=>{const e=jl.get(t);if(e!==void 0)return e;const n=Su(t);return jl.set(t,n),n};function dg(t,e){const n=t.slice(0,e+1),s=n.map(cg),a=Math.max(.01,...s),o=p=>Ve.left+p/Math.max(1,t.length-1)*(Ao-Ve.left-Ve.right),r=p=>Ve.top+(1-p/a)*(qs-Ve.top-Ve.bottom),i=s.map((p,w)=>`${E(o(w))},${E(r(p))}`).join(" "),l=eo(Math.round(a*1e3)/10).map(p=>p/100).map(p=>`<line class="grid" x1="${Ve.left}" x2="${Ao-Ve.right}" y1="${E(r(p))}" y2="${E(r(p))}"/><text x="${Ve.left-6}" y="${E(r(p)+3)}" text-anchor="end">${oe(p,1)}</text>`).join(""),h=`<svg class="reach" viewBox="0 0 ${Ao} ${qs}" role="img" aria-label="The share of the source a change to one file could reach, commit by commit">${l}<polyline class="reach" points="${i}"/><text x="${E(o(0))}" y="${qs-6}">the first commit</text><text x="${E(o(t.length-1))}" y="${qs-6}" text-anchor="end">the last</text></svg>`,c=n.at(-1)??{modules:[],dependencies:[]},d=new Map(c.modules.map(p=>[p.id,p.path])),m=[...Ei(c)].sort((p,w)=>w[1]-p[1]||(d.get(p[0])??"").localeCompare(d.get(w[0])??"")).slice(0,hg).map(([p,w])=>`${d.get(p)}, whose change could reach ${H(w,"file")}`),f=`In theory a change to one file could reach ${oe(s.at(-1)??0,1)} of the source, on average; at the first commit, ${oe(s[0]??0,1)}. The farthest reaching: ${m.length>1?`${m.slice(0,-1).join("; ")}; and ${m.at(-1)}`:m[0]??"none"}.`;return`<figure class="changes-figure">${h}<figcaption>${M(f)}</figcaption></figure>`}function Nl(t,e){const[n,s]=[oe(t.carried,t.changes),oe(e.carried,e.changes)],[a,o]=[t.carried/Math.max(1,t.changes),e.carried/Math.max(1,e.changes)];return{how:n===s?"as often":a<o?"less often":"more often",shares:`${n} against ${s}`}}function ug(t){const{most:e}=t;if(!e||e.changes*2<=t.changes)return"";const n={changes:t.changes-e.changes,carried:t.carried-e.carried};return` But ${e.changes} of those ${t.changes} were changes to one file, ${M(e.path)}, and carried ${oe(e.carried,e.changes)}; the rest carried ${oe(n.carried,n.changes)}.`}function mg(t){const e=(r,i)=>t.find(l=>l.across===r&&l.typeOnly===i)??{across:r,typeOnly:i,changes:0,carried:0,most:null},n=r=>`<td>${oe(r.carried,r.changes)} · ${r.carried} of ${r.changes}</td>`,s=(r,i)=>`<tr><th scope="row">${i}</th>${n(e(r,!1))}${n(e(r,!0))}</tr>`,a=Nl(e(!0,!0),e(!0,!1)),o=Nl(e(!1,!0),e(!1,!1));return`<figure class="changes-figure"><table class="ripples"><thead><tr><th></th><th>onto a value</th><th>onto only a type</th></tr></thead><tbody>${s(!1,"inside a box")}${s(!0,"across two boxes")}</tbody></table><figcaption>Across boxes, an arrow onto a type carried a change ${a.how} ${a.how==="as often"?"as":"than"} one onto a value: ${a.shares}.${ug(e(!0,!0))} Inside a box, ${o.how}: ${o.shares}.</figcaption></figure>`}function fg(t,e){const n=o=>(o.went??e)-1-o.born,s=Math.max(0,...t.map(n)),a=[];for(let o=1,r=1;o<=s;o=r+1,r*=2){const i=Math.min(r,s),l=t.reduce((c,d)=>c+Math.max(0,Math.min(i,n(d))-o+1),0),h=t.reduce((c,d)=>c+d.changed.filter(u=>u-d.born>=o&&u-d.born<=i).length,0);a.push({from:o,to:i,lived:l,changed:h})}return a}const zs=600,Eo=190,It={top:18,right:8,bottom:36,left:8},pg=34,gg=({from:t,to:e})=>t===e?`${t}`:`${t}–${e}`,Ll=t=>t.reduce((e,n)=>({lived:e.lived+n.lived,changed:e.changed+n.changed}),{lived:0,changed:0});function wg(t,e){const n=t.filter(g=>!g.test),s=fg(n,e),a=g=>g.lived>0?g.changed/g.lived:0,o=Math.max(1e-4,...s.map(a)),r=(zs-It.left-It.right)/Math.max(1,s.length),i=Math.min(pg,r*.6),l=Eo-It.bottom,h=s.map((g,v)=>{const b=a(g)/o*(l-It.top),[k,x]=[It.left+r*v+(r-i)/2,l-b];return`<rect class="bar" x="${E(k)}" y="${E(x)}" width="${E(i)}" height="${E(b)}" rx="2"><title>${g.changed} of ${g.lived}</title></rect><text class="value" x="${E(k+i/2)}" y="${E(x-4)}" text-anchor="middle">${oe(g.changed,g.lived)}</text><text class="age" x="${E(k+i/2)}" y="${E(l+13)}" text-anchor="middle">${gg(g)}</text>`}).join(""),c=`<svg class="settling" viewBox="0 0 ${zs} ${Eo}" role="img" aria-label="The share of commits that changed a file, by how many commits old it was"><line class="base" x1="${It.left}" x2="${zs-It.right}" y1="${E(l)}" y2="${E(l)}"/>${h}<text class="axis" x="${zs/2}" y="${Eo-6}" text-anchor="middle">its age: the commits since the one that wrote it</text></svg>`,d=n.filter(g=>g.went===void 0),u=d.filter(g=>g.changed.length===0).length,m=Ll(s.filter(g=>g.to<=2)),f=Ll(s.filter(g=>g.from>8)),p=[`${u} of the ${H(d.length,"file")} that ship have not changed since the commit that wrote them.`];if(m.lived>0){const g=f.lived>0?`, and in ${oe(f.changed,f.lived)} of those after its eighth`:"";p.push(`A file changed in ${oe(m.changed,m.lived)} of the first two commits it lived through${g}.`)}const w=p.join(" ");return`<figure class="changes-figure">${c}<figcaption>${w}</figcaption></figure>`}const Pl=560,Gs=420,De={left:46,right:14,top:14,bottom:44},yg=2.5,bt=t=>t.changes/Math.max(1,t.files),Ou=t=>`${Math.round(t*10)/10}`,bg=t=>Math.abs(t.abstractness+(t.instability??0)-1),Iu=t=>t.instability!==null&&t.abstractness+t.instability<.5,Cu=t=>t.filter(e=>Iu(e)&&e.changes>0).sort((e,n)=>bt(n)-bt(e)||n.changes-e.changes);function vg(t){const[e,n]=[Pl-De.left-De.right,Gs-De.top-De.bottom],s=u=>De.left+u*e,a=u=>De.top+(1-u)*n,o=(u,m)=>`<polygon class="zone ${u}" points="${m.map(([f,p])=>`${E(s(f))},${E(a(p))}`).join(" ")}"/>`,i=t.filter(u=>u.instability!==null).sort((u,m)=>bt(u)-bt(m)||m.files-u.files).map(u=>{const m=`${u.box}: needed by ${H(u.neededBy,"file")} elsewhere, needs ${u.needs}; ${H(u.changes,"change")} to its ${H(u.files,"file")}`;return`<circle class="box" data-box="${M(u.box)}" cx="${E(s(u.instability??0))}" cy="${E(a(u.abstractness))}" r="${E(2.5+Math.sqrt(u.files)*.9)}" style="--v:${Math.min(1,bt(u)/yg).toFixed(2)}"><title>${M(m)}</title></circle>`}).join(""),l=Cu(t).slice(0,4).sort((u,m)=>m.abstractness-u.abstractness||(u.instability??0)-(m.instability??0)).map((u,m)=>({box:u,x:s(.17),y:a(.44)+m*14})),h=l.map(({box:u,x:m,y:f})=>`<line class="leader" x1="${E(m-3)}" y1="${E(f-3)}" x2="${E(s(u.instability??0))}" y2="${E(a(u.abstractness))}"/>`).join(""),c=l.map(({box:u,x:m,y:f})=>`<text class="name" x="${E(m)}" y="${E(f)}">${M(u.box)}</text>`).join(""),d=[0,.5,1].map(u=>`<text x="${E(s(u))}" y="${E(Gs-De.bottom+14)}" text-anchor="middle">${u}</text>${u===0?"":`<text x="${E(De.left-6)}" y="${E(a(u)+3)}" text-anchor="end">${u}</text>`}`).join("");return`<svg class="stability" viewBox="0 0 ${Pl} ${Gs}" role="img" aria-label="Every box by how unstable and how abstract it is, and how often it changed">`+o("pain",[[0,0],[.5,0],[0,.5]])+o("useless",[[1,1],[.5,1],[1,.5]])+`<rect class="frame" x="${De.left}" y="${De.top}" width="${e}" height="${n}"/><line class="sequence" x1="${E(s(0))}" y1="${E(a(1))}" x2="${E(s(1))}" y2="${E(a(0))}"/><text class="zone-name" x="${E(s(.01))}" y="${E(a(.5)-5)}">zone of pain</text><text class="zone-name" x="${E(s(.99))}" y="${E(a(.5)+13)}" text-anchor="end">zone of uselessness</text><text class="zone-name" transform="translate(${E(s(.62))} ${E(a(.38)-6)}) rotate(${E(Math.atan2(n,e)*180/Math.PI)})" text-anchor="middle">the main sequence</text>${h}${i}${c}${d}<text class="axis" x="${E(s(.5))}" y="${Gs-8}" text-anchor="middle">instability: how little needs it, so how free it is to change</text><text class="axis" transform="translate(12 ${E(a(.5))}) rotate(-90)" text-anchor="middle">abstractness: its files of nothing but types</text></svg>`}function kg(t){const[e]=t;if(!e)return" No arrow between boxes goes against his rule of stable dependencies.";const n=new Map;for(const{from:r}of t)n.set(r,(n.get(r)??0)+1);const[s,a=0]=[...n].sort((r,i)=>i[1]-r[1])[0]??[],o=s&&a*2>t.length?` ${a} of them leave ${s}.`:"";return` ${H(t.length,"arrow")} between boxes ${t.length===1?"goes":"go"} from a box to a less stable one, against his rule of stable dependencies; the steepest, from ${e.from} to ${e.to}.${o}`}function $g(t){const e=t.filter(Iu).length,n=Cu(t).map((a,o)=>`${a.box} (${Ou(bt(a))}${o===0?` ${bt(a)===1?"change":"changes"} a file`:""})`),s=n.length>1?`${n.slice(0,-1).join(", ")} and ${n.at(-1)}`:n[0]??"none of them";return`${H(e,"box","boxes")} ${e===1?"stands":"stand"} in the zone of pain. The ones there that have changed, the most first: ${s}.`}function xg(t){return`<details class="numbers"><summary>every box's figures</summary><table><thead><tr><th>box</th><th>files</th><th>needed by</th><th>needs</th><th>I</th><th>A</th><th>D</th><th>changes a file</th></tr></thead><tbody>${[...t].sort((n,s)=>n.box.localeCompare(s.box)).map(n=>`<tr><td><code>${fs(n.box)}</code></td><td>${n.files}</td><td>${n.neededBy}</td><td>${n.needs}</td><td>${n.instability===null?"–":n.instability.toFixed(2)}</td><td>${n.abstractness.toFixed(2)}</td><td>${n.instability===null?"–":bg(n).toFixed(2)}</td><td>${Ou(bt(n))}</td></tr>`).join("")}</tbody></table></details>`}function Tg(t,e=[]){return`<figure class="changes-figure">${vg(t)}<figcaption>${$g(t)}${kg(e)}</figcaption>${xg(t)}</figure>`}function Mg({tested:t,withTest:e,untested:n}){return`<figure class="changes-figure tested"><p class="figure-number"><strong>${oe(e,t)}</strong> of the changes to a file a test imports came with its test</p><figcaption>${e} of the ${t} changes to a file a test imports came with a change to that test, or a new one, in the same commit. Another ${n} changes went to files with something to run that no test imports.</figcaption></figure>`}function Sg(t,e,n=Yt){const s=[!1,!0].flatMap(a=>[!1,!0].map(o=>({across:a,typeOnly:o,changes:0,carried:0,heads:new Map})));return t.changes.forEach((a,o)=>{const r=e[o-1];if(!r||a.changed.length===0||a.changed.length>n)return;const i=new Map(r.modules.filter(c=>!c.test).map(c=>[c.id,c.path])),l=new Set(a.changed),h=new Set(a.removed);for(const{from:c,to:d,typeOnly:u}of r.dependencies){const[m,f]=[i.get(c),i.get(d)];if(m===void 0||f===void 0||h.has(c)||!l.has(d))continue;const p=V(m)!==V(f),w=s.find(b=>b.across===p&&b.typeOnly===u);if(!w)continue;const g=l.has(c)?1:0,v=w.heads.get(d)??{changes:0,carried:0};w.heads.set(d,{path:f,changes:v.changes+1,carried:v.carried+g}),w.changes+=1,w.carried+=g}}),s.map(({heads:a,...o})=>({...o,most:[...a.values()].sort((r,i)=>i.changes-r.changes||r.path.localeCompare(i.path))[0]??null}))}const Ag=["main.ts","features/allFeatures.ts"];function Eg(t){const e=new Set(Ag.map(V)),n=ji(t);return{againstStability:Ni(bs(t),Xa(t,[])).filter(({from:s})=>!e.has(s)).length,deepestCore:Math.max(0,...J.cores(t).values()),tallestStack:Math.max(0,...J.heights(t).values()),untested:t.modules.filter(s=>!s.test&&!s.typesOnly&&!n.has(s.id)).length}}const Fl=new WeakMap;function Og(t){const e=Fl.get(t);if(e)return e;const n=t.snapshots.map(Eg);return Fl.set(t,n),n}function Ig(t,e,n=Yt){const s={tested:0,withTest:0,untested:0};return t.changes.forEach((a,o)=>{const r=e[o];if(!r||a.changed.length>n)return;const i=new Map(r.modules.map(c=>[c.id,c])),l=new Map;for(const{from:c,to:d}of r.dependencies)i.get(c)?.test&&!i.get(d)?.test&&l.set(d,[...l.get(d)??[],c]);const h=new Set([...a.changed,...a.added.map(([c])=>c)]);for(const c of a.changed){const d=i.get(c);if(!d||d.test||d.typesOnly)continue;const u=l.get(c)??[];u.length===0?s.untested+=1:(s.tested+=1,u.some(m=>h.has(m))&&(s.withTest+=1))}}),s}const Cg={modules:[],dependencies:[]},Ae=(t,e)=>{const n=Ut(t,e);return{...n,source:n.snapshots.at(-1)??Cg}},ju={"change-matrix":(t,e)=>Hp(t,e),"change-settling":(t,e)=>{const{history:n,lives:s}=Ae(t,e);return wg(s,n.commits.length)},"change-hotspots":(t,e,n)=>{const{history:s,lives:a}=Ae(t,e),o=n?.sha===s.commits.at(-1)?.sha?n:null;return Xp(a,s.commits.length,o,12,t.history.commits.length)},"change-stability":(t,e)=>{const{history:n,source:s,lives:a}=Ae(t,e),o=Xa(s,a,ot(n));return Tg(o,Ni(bs(s),o))},"change-cascade":(t,e)=>{const{history:n,snapshots:s,source:a}=Ae(t,e);return Op(xp(n,s),Su(a))},"change-ripples":(t,e)=>{const{history:n,snapshots:s}=Ae(t,e);return mg(Sg(n,s))},"change-together":(t,e)=>{const{history:n,lives:s,source:a}=Ae(t,e);return _p(cu(n),s,a)},"change-tests":(t,e)=>{const{history:n,snapshots:s}=Ae(t,e);return Mg(Ig(n,s))},"change-ground":(t,e)=>{const n=J.standings(t);return Yp(Mi(n,Va(n,e),e),Ae(t,e).lives)},"change-coupling":(t,e)=>Eu(Ae(t,e).source),"tangle-network":(t,e)=>ng(Ae(t,e).source),"tangle-groups":(t,e)=>{const{source:n}=Ae(t,e);return Vp(n,J.groups(n))},"tangle-bridges":(t,e)=>{const{source:n}=Ae(t,e);return Sp(n,J.bridges(n))},"tangle-reach":(t,e)=>dg(t.snapshots,e),ratchet:(t,e)=>lg(Og(t),e,Tp(t.history),t.history.commits.map(n=>n.date))};function y(t,e={},...n){const s=document.createElement(t);for(const[a,o]of Object.entries(e))o===void 0||o===!1||(typeof o=="function"?s.addEventListener(a.slice(2).toLowerCase(),o):o===!0?s.setAttribute(a,""):s.setAttribute(a,String(o)));for(const a of n)a==null||a===!1||s.append(a);return s}function to(t){let e=!0;if(typeof IntersectionObserver!="function")return{onScreen:()=>e,stop:()=>{}};const n=new IntersectionObserver(s=>{for(const a of s)e=a.isIntersecting},{rootMargin:"100px"});return n.observe(t),{onScreen:()=>e,stop:()=>n.disconnect()}}function Nu(t,e,n=new Set){return new Map(t.map(s=>[s.id,s.changed.filter(a=>a<=e&&!n.has(a)).length]))}const jg=6,Bl=2.2;function Ng(t,e){const n=new Map;for(const{from:s,to:a}of t.dependencies){const[o,r]=e==="neededBy"?[a,s]:[s,a];n.set(o,(n.get(o)??new Set).add(r))}return new Map([...n].map(([s,a])=>[s,a.size]))}function Lg(t,e,n){if(e==="lines")return null;const s=e==="neededBy"||e==="needs"?Ng(t,e):n?.counts??new Map,a=Math.max(1,n?.most??0,...s.values());return new Map(t.modules.map(o=>[o.id,Bl+(jg-Bl)*Math.sqrt((s.get(o.id)??0)/a)]))}const Pg={modules:[],dependencies:[]},Fg={neededBy:"a ball as big as the files that need it",needs:"a ball as big as the files it needs",reachedBy:"a ball as big as all the files a change to it could reach",bridges:"a ball as big as it stands between the others",changes:"a ball as big as the commits that changed it so far",lines:"a ball as big as its lines"},Bg={plain:"",heat:"warm as it changed lately, cooling by half every six commits",exposure:"warm as often as files that stood where it stood changed",stability:"as deep as its box is stable, by Robert C. Martin's measure, with the box arrows that go against it in red"},Rg={1:"point at a file for what it needs and what needs it, keyed on the line over the picture",2:"point at a file for what it needs and what needs it, two arrows out",3:"point at a file for what it needs and what needs it, three arrows out",all:"point at a file for everything it needs and everything that needs it",group:"point at a file for its group: the files the arrows gather with it, whatever their box",together:"point at a file for what changed with it"};function Dg(t){const e=Math.max(0,...t.values());return new Map([...t].map(([n,s])=>[n,e>0?s/e:0]))}function Wg(t,e,n,s){const a={tones:null,ramp:null,against:new Set};if(n==="plain")return a;if(n==="heat")return{...a,ramp:"warm",tones:new Map([...Si(t.lives,e,void 0,ot(t.history))].map(([c,d])=>[c,Math.min(1,d)]))};if(n==="exposure"){const c=J.standings(t),d=Mi(c,Va(c,e),e),u=new Set(s.modules.map(m=>m.id));return{...a,ramp:"warm",tones:Dg(new Map([...d].filter(([m])=>u.has(m)).map(([m,{expected:f}])=>[m,f])))}}const o=Ut(t,e),r=Xa(s,o.lives,ot(o.history)),i=new Map(r.map(c=>[c.box,c.instability])),l=new Map(s.modules.flatMap(c=>{const d=i.get(V(c.path));return d==null?[]:[[c.id,1-d]]})),h=new Set(Ni(bs(s),r).map(({from:c,to:d})=>`${c}>${d}`));return{tones:l,ramp:"cool",against:h}}function Hg(t,e,n){const s=t.snapshots[e]??Pg,a={changes:()=>{const l=ot(t.history);return{counts:Nu(t.lives,e,l),most:Math.max(0,...t.lives.map(h=>h.changed.filter(c=>!l.has(c)).length))}},reachedBy:()=>({counts:J.reach(s)}),bridges:()=>({counts:J.bridges(s)})},o=Lg(s,n.sizing,a[n.sizing]?.()),r=n.together?uu(Ut(t,e).history,s):[],i=[Fg[n.sizing],Bg[n.colour],n.together?"a warm thread for two files that changed together twice or more, dashed where no arrow joins them":"",Rg[n.pointing]];return{sizes:o,...Wg(t,e,n.colour,s),threads:r,groups:n.pointing==="group"?J.groups(s):null,said:i.filter(Boolean).join(" · ")}}const Da=3,qg={1:1,2:2,3:3,all:1/0},Rl=t=>t.split("/").pop()??t,Dl=t=>t>Da?` and ${t-Da} more`:"";function zg(t,e,n,s,a){const o=a===void 0?"":` · tests run ${Math.round(a)}% of it`,r=`<code>${M(t)}</code> · `;if(e==="group"){const h=new Map;for(const u of n.tied){const m=V(s.get(u)??"");h.set(m,(h.get(m)??0)+1)}const c=[...h].sort((u,m)=>m[1]-u[1]||u[0].localeCompare(m[0])),d=c.slice(0,Da).map(([u,m])=>`${Rl(u)} ${m}`).join(", ");return`${r}<span class="key group"></span>${M(`its group: ${n.tied.size} files in ${c.length} ${c.length===1?"box":"boxes"}: ${d}${Dl(c.length)}`)}${o}`}if(e==="together"){const h=n.partners.slice(0,Da).map(([c,d])=>`${Rl(s.get(c)??"")} ${d}×`).join(", ");return`${r}<span class="key together"></span>${M(n.partners.length>0?`changed with ${h}${Dl(n.partners.length)}`:"changed with no file twice")}${o}`}const i=qg[e]??1,l=h=>{const c=[...h.values()].filter(d=>d===1).length;return i>1&&h.size>c?`${c} (${h.size} within ${Number.isFinite(i)?i:"any"})`:`${c}`};return`${r}<span class="key needs"></span>needs ${l(n.needs)} · <span class="key needed-by"></span>needed by ${l(n.neededBy)}${o}`}function Gg(t,e,n,s){const a=(o,r)=>r===e?0:o.get(r);return t.flatMap(([o,r])=>{const[i,l]=[a(n,o),a(s,r)];return[...i!==void 0&&n.get(r)===i+1?[{from:o,to:r,kind:"needs",distance:i+1}]:[],...l!==void 0&&s.get(o)===l+1?[{from:o,to:r,kind:"neededBy",distance:l+1}]:[]]})}const _g={1:1,2:2,3:3,all:1/0};function Ug(t,e,n,s,a){const o={needs:new Map,neededBy:new Map,partners:[]};if(e==="group"){const h=s?.get(t);return{...o,tied:new Set([t,...[...s??[]].filter(([,c])=>c===h).map(([c])=>c)])}}if(e==="together"){const h=a.flatMap(({a:c,b:d,together:u})=>c===t?[[d,u]]:d===t?[[c,u]]:[]).sort((c,d)=>d[1]-c[1]||c[0]-d[0]);return{...o,partners:h,tied:new Set([t,...h.map(([c])=>c)])}}const r=_g[e]??1,i=ds(n,t,r,"needs"),l=ds(n,t,r,"neededBy");return{...o,needs:i,neededBy:l,tied:new Set([t,...i.keys(),...l.keys()])}}function Wl(t){const e=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(t.trim())?.[1];if(!e)return null;const n=e.length===3?[...e].map(s=>s+s).join(""):e;return[0,2,4].map(s=>parseInt(n.slice(s,s+2),16))}function Yg(t,e){const n=Math.min(1,Math.max(0,e))*Math.max(0,t.length-1),s=Math.min(t.length-2,Math.floor(n)),[a,o]=[t[Math.max(0,s)]??"#000000",t[Math.max(0,s)+1]??t[0]??"#000000"],r=t.length>1?n-Math.max(0,s):0,[i,l]=[Wl(a),Wl(o)];return!i||!l?r<.5?a:o:`#${i.map((h,c)=>Math.round(h+((l[c]??h)-h)*r).toString(16).padStart(2,"0")).join("")}`}const Hl=90,ql=15;function zl(t,e,n,s){const a=Math.min(s,.03333333333333333);t.vx+=((e-t.x)*Hl-t.vx*ql)*a,t.vy+=((n-t.y)*Hl-t.vy*ql)*a,t.x+=t.vx*a,t.y+=t.vy*a}const Jg=900,Kg=34,Vg=.02,Gl=.004,_l=.82,Xg=100,Zg=12;function Lu(t,e,{width:n,height:s,heat:a=1}){const o=new Float64Array(t.length),r=new Float64Array(t.length);for(let l=0;l<t.length;l+=1){const h=t[l];for(let c=l+1;c<t.length;c+=1){const d=t[c];let u=h.x-d.x,m=h.y-d.y;u===0&&m===0&&([u,m]=[l%7-3||1,c%5-2||1]);const f=Math.max(Xg,u*u+m*m),p=Jg/f,w=Math.sqrt(f);o[l]=(o[l]??0)+u/w*p,r[l]=(r[l]??0)+m/w*p,o[c]=(o[c]??0)-u/w*p,r[c]=(r[c]??0)-m/w*p}}for(const[l,h]of e){const[c,d]=[t[l],t[h]];if(!c||!d)continue;const u=d.x-c.x,m=d.y-c.y,f=Math.hypot(u,m)||1,p=(f-Kg)*Vg;o[l]=(o[l]??0)+u/f*p,r[l]=(r[l]??0)+m/f*p,o[h]=(o[h]??0)-u/f*p,r[h]=(r[h]??0)-m/f*p}const i=Zg*a;t.forEach((l,h)=>{l.vx=(l.vx+(o[h]??0)+(n/2-l.x)*Gl)*_l,l.vy=(l.vy+(r[h]??0)+(s/2-l.y)*Gl)*_l;const c=Math.hypot(l.vx,l.vy);c>i&&([l.vx,l.vy]=[l.vx/c*i,l.vy/c*i]);const[d,u]=[l.x+l.vx,l.y+l.vy];l.x=Math.min(n,Math.max(0,d)),l.y=Math.min(s,Math.max(0,u)),l.x!==d&&(l.vx=0),l.y!==u&&(l.vy=0)})}const Oo=760,Ul=260,Qg=10,gt=(t,e,n,s=8)=>t+(e-t)*(1-Math.exp(-s*n)),ew=(t,e,n)=>{t.x=gt(t.x,e.x,n),t.y=gt(t.y,e.y,n),t.width=gt(t.width,e.width,n),t.height=gt(t.height,e.height,n)};class tw{constructor(e,n){this.width=e,this.still=n}width;still;balls=new Map;boxes=new Map;bands=new Map;layout=null;mode="boxes";time=0;boxAlpha=1;fileLinks=[];hovered={};selected={};pointing="1";seen={tones:null,ramp:null,threads:[],against:new Set,groups:null};height=Oo;get wanted(){const e=this.layout?.height??Oo;return this.mode==="tangle"?Math.max(e,Oo):e}reached=null;coverage=null;show(e,n,{untangling:s=!1,reached:a=null,coverage:o=null,sizes:r=null,changed:i=null,seen:l=null}={}){l&&(this.seen=l),this.reached=a,this.coverage=o,this.layout=n,this.mode==="tangle"&&(this.tangleClock=Math.min(this.tangleClock,1.2)),(this.still||this.balls.size===0)&&(this.height=this.wanted);const h=Math.max(0,...n.boxes.map(f=>f.rank)),c=new Map(n.boxes.map(f=>[f.name,f.rank])),d=new Set;for(const f of n.balls){d.add(f.id);const p=this.balls.get(f.id),w=s?(h-(c.get(f.box)??0))*.07+Math.random()*.12:0,g=r?.get(f.id)??f.radius;if(p)Object.assign(p,{leaving:!1,box:f.box,path:f.path,test:f.test,typesOnly:f.typesOnly,radius:g,wait:w}),i?.has(f.id)&&(p.touchedAt=this.time);else{const[v,b]=this.mode==="tangle"?[this.width/2+(Math.random()-.5)*80,this.height/2+(Math.random()-.5)*80]:[f.x,f.y];this.balls.set(f.id,{id:f.id,body:{x:v,y:b,vx:0,vy:0},size:{x:this.still?g:0,y:0,vx:0,vy:0},radius:g,alpha:this.still?1:0,leaving:!1,box:f.box,path:f.path,test:f.test,typesOnly:f.typesOnly,wait:w,trail:[],bornAt:this.time,touchedAt:-1/0})}}for(const[f,p]of this.balls)d.has(f)||(p.leaving=!0);const u=(f,p)=>{const w=new Set(p.map(g=>g.name));for(const g of p){const v={x:g.x,y:g.y,width:g.width,height:g.height},b=f.get(g.name);b?Object.assign(b,{target:v,leaving:!1,cyclic:g.cyclic??!1,label:g.label??g.name}):f.set(g.name,{...v,target:v,label:g.label??g.name,alpha:this.still?1:0,leaving:!1,cyclic:g.cyclic??!1})}for(const[g,v]of f)w.has(g)||(v.leaving=!0)};u(this.boxes,n.boxes),u(this.bands,n.bands);const m=new Map(n.balls.map((f,p)=>[f.id,p]));this.fileLinks=e.dependencies.flatMap(({from:f,to:p})=>m.has(f)&&m.has(p)?[[f,p]]:[])}setMode(e){e==="tangle"&&this.mode!=="tangle"&&(this.tangleClock=0),this.mode=e}tangleClock=0;get heat(){return Math.exp(-this.tangleClock/1.8)}step(e){this.time+=e,this.height=this.still?this.wanted:gt(this.height,this.wanted,e,6);const n=new Map(this.layout?.balls.map(s=>[s.id,s])??[]);if(this.boxAlpha=gt(this.boxAlpha,this.mode==="boxes"?1:0,e,5),this.mode==="tangle"){this.tangleClock+=e;const s=[...this.balls.entries()].filter(([,i])=>!i.leaving),a=new Map(s.map(([i],l)=>[i,l])),r=[...this.fileLinks,...this.seen.threads.map(({a:i,b:l})=>[i,l])].flatMap(([i,l])=>{const[h,c]=[a.get(i),a.get(l)];return h!==void 0&&c!==void 0?[[h,c]]:[]});Lu(s.map(([,i])=>i.body),r,{width:this.width,height:this.height,heat:this.heat})}for(const[s,a]of this.balls){const o=n.get(s);this.mode==="boxes"&&o&&(a.wait>0?a.wait-=e:this.still?Object.assign(a.body,{x:o.x,y:o.y,vx:0,vy:0}):zl(a.body,o.x,o.y,e)),zl(a.size,a.leaving?0:a.radius,0,e),a.alpha=gt(a.alpha,a.leaving?0:1,e,6);const r=Math.hypot(a.body.vx,a.body.vy);r>Ul&&this.mode==="boxes"&&a.trail.push({x:a.body.x,y:a.body.y}),(a.trail.length>Qg||r<Ul&&a.trail.length)&&a.trail.shift(),a.leaving&&a.alpha<.02&&this.balls.delete(s)}for(const s of[this.boxes,this.bands])for(const[a,o]of s)this.still?Object.assign(o,o.target):ew(o,o.target,e),o.alpha=gt(o.alpha,o.leaving?0:1,e,6),o.leaving&&o.alpha<.02&&s.delete(a)}hit(e,n){for(const s of this.balls.values())if(Math.hypot(s.body.x-e,s.body.y-n)<=Math.max(5,s.size.x+2))return{path:s.path,box:s.box};if(this.mode==="boxes"){for(const[s,a]of this.boxes)if(e>=a.x&&e<=a.x+a.width&&n>=a.y&&n<=a.y+a.height)return{box:s}}return{}}draw(e,n){e.clearRect(0,0,this.width,this.height),e.lineCap="round";const s=.5+.5*Math.sin(this.time*4);e.font="bold 10px ui-monospace, Menlo, monospace";for(const c of this.bands.values())e.globalAlpha=c.alpha*this.boxAlpha*.9,e.setLineDash([2,4]),e.strokeStyle=n.rule,e.lineWidth=1,e.beginPath(),e.roundRect(c.x,c.y,c.width,c.height,6),e.stroke(),e.setLineDash([]),e.fillStyle=n.dim,e.fillText(c.label,c.x+8,c.y+12);e.font="9px ui-monospace, Menlo, monospace";const a=this.pointer;for(const[c,d]of this.boxes){const u=a.box===c||this.selected.box===c;e.globalAlpha=d.alpha*this.boxAlpha,e.fillStyle=n.sunken,e.strokeStyle=d.cyclic?n.warn:u?n.accent:n.rule,e.lineWidth=d.cyclic?1.5+s*1.5:u?1.5:1,d.cyclic&&(e.shadowColor=n.warn,e.shadowBlur=6+s*10),e.beginPath(),e.roundRect(d.x,d.y,d.width,d.height,4),e.fill(),e.stroke(),e.shadowBlur=0,e.fillStyle=u?n.accent:n.dim,e.fillText(d.label,d.x+6,d.y+10)}const{focus:o,pointed:r}=this.focusOf(a.path),i=r?.tied??new Set;this.drawLinks(e,n,o!==void 0,a.box),this.drawThreads(e,n,o?.id,r),o&&r&&this.drawFileArrows(e,n,o,r.needs,r.neededBy);const l=this.seen.ramp==="warm"?[n.dim,n.heat,n.heatTop]:[n.rule,n.soft,n.accent],h=c=>this.seen.tones&&!c.test?Yg(l,this.seen.tones.get(c.id)??0):n.accent;for(const c of this.balls.values()){const d=Math.max(0,c.size.x);if(c.trail.length>1){e.strokeStyle=n.accent;for(let v=1;v<c.trail.length;v+=1)e.globalAlpha=v/c.trail.length*.35*c.alpha,e.lineWidth=d*(v/c.trail.length)*1.4,e.beginPath(),e.moveTo(c.trail[v-1].x,c.trail[v-1].y),e.lineTo(c.trail[v].x,c.trail[v].y),e.stroke()}const u=this.time-c.bornAt;u<.8&&!this.still&&(e.globalAlpha=(1-u/.8)*.6,e.strokeStyle=n.accent,e.lineWidth=1.2,e.beginPath(),e.arc(c.body.x,c.body.y,d+u*22,0,Math.PI*2),e.stroke());const m=this.time-c.touchedAt;m<.9&&!this.still&&(e.globalAlpha=(1-m/.9)*.8,e.strokeStyle=n.heat,e.lineWidth=1.8,e.beginPath(),e.arc(c.body.x,c.body.y,d+1.5+m*14,0,Math.PI*2),e.stroke());const f=this.hovered.path===c.path,p=o!==void 0&&!i.has(c.id),w=this.reached!==null&&!c.test&&!c.typesOnly&&!this.reached.has(c.id),g=!c.test&&!c.typesOnly?this.coverage?.get(c.path):void 0;if(e.globalAlpha=c.alpha*(p?.22:1),e.beginPath(),e.arc(c.body.x,c.body.y,f?d+2:Math.max(0,w||g!==void 0?d-.6:d),0,Math.PI*2),g!==void 0)e.strokeStyle=g>=99.5?n.accent:n.warn,e.lineWidth=1.2,e.stroke(),e.fillStyle=h(c),e.beginPath(),e.moveTo(c.body.x,c.body.y),e.arc(c.body.x,c.body.y,Math.max(0,d-.6),-Math.PI/2,-Math.PI/2+Math.PI*2*g/100),e.closePath(),e.fill();else if(c.test){const v=Math.max(0,(f?d+2:d)*1.6);e.beginPath(),e.rect(c.body.x-v/2,c.body.y-v/2,v,v),e.fillStyle=n.test,e.fill()}else w?(e.strokeStyle=n.warn,e.lineWidth=1.2,e.stroke()):(e.fillStyle=h(c),e.fill());f&&(e.strokeStyle=n.ink,e.lineWidth=1.5,e.stroke()),this.selected.path===c.path&&(e.globalAlpha=c.alpha,e.strokeStyle=n.ink,e.lineWidth=1.5,e.beginPath(),e.arc(c.body.x,c.body.y,d+4.5,0,Math.PI*2),e.stroke())}e.globalAlpha=1}get pointer(){return this.hovered.path||this.hovered.box?this.hovered:this.selected}focusOf(e){const n=e?[...this.balls.values()].find(s=>s.path===e):void 0;return{focus:n,pointed:n?Ug(n.id,this.pointing,this.fileLinks,this.seen.groups,this.seen.threads):null}}focused(){const{focus:e,pointed:n}=this.focusOf(this.pointer.path);return e&&n?{path:e.path,test:e.test,typesOnly:e.typesOnly,pointed:n}:null}drawThreads(e,n,s,a){if(this.seen.threads.length===0)return;const o=this.pointing==="together"&&a!==null;e.strokeStyle=n.heat;for(const{a:r,b:i,together:l,joined:h}of this.seen.threads){const[c,d]=[this.balls.get(r),this.balls.get(i)];if(!c||!d)continue;const u=o&&(r===s||i===s);e.globalAlpha=Math.min(c.alpha,d.alpha)*(s===void 0?h==="none"?.75:.45:u?.95:.06),e.lineWidth=.8+Math.log2(l)*.9,e.setLineDash(h==="none"?[4,3]:[]),e.beginPath(),e.moveTo(c.body.x,c.body.y),e.lineTo(d.body.x,d.body.y),e.stroke()}e.setLineDash([])}drawFileArrows(e,n,s,a,o){const r=(l,h,c,d)=>{const[u,m]=[h.body.x-l.body.x,h.body.y-l.body.y],f=Math.hypot(u,m)||1,[p,w]=[u/f,m/f],g={x:h.body.x-p*(h.size.x+2),y:h.body.y-w*(h.size.x+2)},v={x:(l.body.x+g.x)/2-w*f*.12,y:(l.body.y+g.y)/2+p*f*.12};e.globalAlpha=d,e.strokeStyle=c,e.fillStyle=c,e.lineWidth=1.4,e.beginPath(),e.moveTo(l.body.x,l.body.y),e.quadraticCurveTo(v.x,v.y,g.x,g.y),e.stroke();const[b,k]=[g.x-v.x,g.y-v.y],x=Math.atan2(k,b);e.beginPath(),e.moveTo(g.x,g.y),e.lineTo(g.x-7*Math.cos(x-.4),g.y-7*Math.sin(x-.4)),e.lineTo(g.x-7*Math.cos(x+.4),g.y-7*Math.sin(x+.4)),e.closePath(),e.fill()},i=l=>Math.max(.25,.95-(l-1)*.25);for(const{from:l,to:h,kind:c,distance:d}of Gg(this.fileLinks,s.id,a,o)){const[u,m]=[this.balls.get(l),this.balls.get(h)];u&&m&&r(u,m,c==="needs"?n.accent:n.arrowIn,i(d))}}drawLinks(e,n,s,a){if(this.boxAlpha<.98){e.globalAlpha=(1-this.boxAlpha)*.22,e.strokeStyle=n.accent,e.lineWidth=.7,e.beginPath();for(const[o,r]of this.fileLinks){const[i,l]=[this.balls.get(o),this.balls.get(r)];!i||!l||(e.moveTo(i.body.x,i.body.y),e.lineTo(l.body.x,l.body.y))}e.stroke()}if(!(!this.layout||this.boxAlpha<.02))for(const o of this.layout.links){const[r,i]=[this.boxes.get(o.from),this.boxes.get(o.to)],[l,h]=[this.layout.boxes.find(b=>b.name===o.to),this.layout.boxes.find(b=>b.name===o.from)];if(!r||!i||!l||!h)continue;const c=r.x+(o.x1-h.x)/h.width*r.width,d=r.y+r.height,u=i.x+(o.x2-l.x)/l.width*i.width,m=i.y,f=a!==void 0&&(o.from===a||o.to===a),p=a!==void 0&&!f,w=this.seen.ramp==="cool"&&this.seen.against.has(`${o.from}>${o.to}`),g=this.seen.threads.length>0?.2:.4;e.globalAlpha=this.boxAlpha*Math.min(r.alpha,i.alpha)*(s?.06:f?.95:p?.08:w?.85:g),e.strokeStyle=w?n.warn:f?n.accent:n.soft,e.lineWidth=Math.min(4,.8+Math.log2(o.count)*.7)*(f||w?1.4:1),e.setLineDash(o.typeOnly?[4,3]:[]);const v=Math.max(18,(m-d)/2);e.beginPath(),e.moveTo(c,d),e.bezierCurveTo(c,d+v,u,m-v,u,m-4),e.stroke(),e.setLineDash([]),e.fillStyle=e.strokeStyle,e.beginPath(),e.moveTo(u,m),e.lineTo(u-3.5,m-7),e.lineTo(u+3.5,m-7),e.closePath(),e.fill()}}}let Io;function no(){return Io??=Promise.all([fetch("/data/architecture.json").then(t=>{if(!t.ok)throw new Error(`the history: ${t.status}`);return t.text()}),fetch("/data/coverage.json").then(t=>t.ok?t.json():null).catch(()=>null)]).then(([t,e])=>({read:cs(t),coverage:e})).catch(t=>{throw Io=void 0,t}),Io}const nw=60;function sw(t,e,n){const s=y("aside",{class:"architecture-details","aria-label":"Details"});let a="",o=0;s.addEventListener("click",i=>{const l=i.target instanceof Element?i.target.closest("button"):null;if(!l)return;const{file:h,box:c}=l.dataset;l.hasAttribute("data-back")?n(null):h?n({file:h}):c&&n({box:c})});const r=(i,l)=>{const h=`${i}|${JSON.stringify(l)}`;if(h===a)return;const c=s.querySelector("details")?.open??!1;s.innerHTML=yu(t,i,l,e);const d=s.querySelector("details");d&&c&&a.endsWith(`|${JSON.stringify(l)}`)&&(d.open=!0),a=h};return{element:s,tell(i,l,h=!1){window.clearTimeout(o),h?r(i,l):o=window.setTimeout(()=>r(i,l),nw)},stop:()=>window.clearTimeout(o)}}const Ct=1100,aw=.45,Yl="Point at a file for what it brings out; click a file or a box for its details.",ow={sizing:"neededBy",colour:"plain",together:!1,pointing:"1"};function Jl(t){const e=getComputedStyle(t),n=(s,a)=>e.getPropertyValue(s).trim()||a;return{ink:n("--ink","#16181c"),dim:n("--dim","#6b7280"),rule:n("--rule","#d8dbe1"),sunken:n("--sunken","#f2f4f8"),accent:n("--accent","#1a4b9c"),soft:n("--accent-soft","#6b83b8"),warn:n("--warn","#b4443c"),test:n("--hl-string","#2f6f4e"),arrowIn:n("--arrow-in","#c96a24"),heat:n("--heat-warm","#e08a5b"),heatTop:n("--heat-warm-top","#5c1609")}}function Pu(t={}){return e=>{let n=!1,s=()=>{n=!0};return t.lead?.set(null),no().then(({read:a,coverage:o})=>{n||(s=rw(e,a,o,t))}).catch(()=>{}),()=>s()}}function rw(t,e,n,s){const{history:a,snapshots:o}=e,r=n&&a.commits.findIndex(R=>R.sha===n.sha),i=n?new Map(Object.entries(n.lines)):null,l=o.map(ms),h=new Map,c=(R,q)=>{const Q=`${R}:${q}`;let ne=h.get(Q);return ne||(ne=Za(o[R]??{modules:[],dependencies:[]},{tests:q,width:Ct}),h.set(Q,ne)),ne},d=o.length-1,u=window.matchMedia("(prefers-reduced-motion: reduce)").matches,m=new tw(Ct,u),{follow:f}=s;let p=f?.get()??d,w=!1,g={...ow,...s.lenses},v="boxes",b=!1,k=0,x=null,T=-1;m.pointing=g.pointing;const $=y("canvas",{class:"architecture-canvas","aria-label":"The source of this site: its files as balls, its folders as boxes, and arrows for what needs what"}),O=y("figcaption"),L=y("div",{class:"sparks-host"}),F=y("input",{type:"range",min:0,max:d,step:1,value:p,"aria-label":"Commit",hidden:f!==void 0}),N=y("button",{type:"button",hidden:f!==void 0},"▶ play the history"),j=y("button",{type:"button"},"tangle it"),S=y("input",{type:"checkbox"}),A=y("input",{type:"checkbox",checked:g.together}),I=(R,q)=>y("option",{value:R,selected:!1},q),D=(R,q,Q)=>{const ne=y("select",{"aria-label":R},...Q.map(([Ne,go])=>I(Ne,go)));return ne.value=q,ne},C=D("What a ball's size says",g.sizing,[["neededBy","needed by"],["needs","needs"],["reachedBy","reach"],["bridges","bridges"],["changes","changes"],["lines","lines"]]),B=D("What a ball's colour says",g.colour,[["plain","plain"],["heat","heat"],["exposure","exposure"],["stability","stability"]]),W=D("What pointing at a file shows",g.pointing,[["1","its arrows"],["2","arrows, 2 out"],["3","arrows, 3 out"],["all","all its arrows"],["group","its group"],["together","what changed with it"]]),z=y("div",{class:"architecture-controls"},N,j,y("label",{},S," the tests"),y("label",{},A," what changed together"),F),de=y("div",{class:"architecture-controls lenses"},y("label",{},"size: ",C),y("label",{},"colour: ",B),y("label",{},"pointing shows: ",W)),An=y("p",{class:"architecture-legend lenses-said"}),lt=y("p",{class:"architecture-status"},Yl),Ye=sw(e,n,R=>Kt(R)),En=y("p",{class:"architecture-legend",hidden:!0},y("span",{class:"key file"}),"a file, as full as the tests run it",y("span",{class:"key untested"}),"a file no test reaches",y("span",{class:"key test"}),"a test"),Se=(R,q=!1)=>{p=Math.max(0,Math.min(d,R)),F.value=String(p);const Q=o[p],ne=a.commits[p];if(!Q||!ne)return;const Ne=Hg(e,p,g);m.show(Q,c(p,w),{untangling:q,reached:w?ji(Q):null,coverage:w&&p===r?i:null,sizes:Ne.sizes,changed:p===T?null:new Set(a.changes[p]?.changed??[]),seen:Ne}),T=p,s.lead?.set(p>=d?null:p),Ye.tell(p,x),Tt(),An.textContent=Ne.said,O.innerHTML=$u(ne,l[p]??ms(Q)),L.innerHTML=Tu(l,p)},Ms=()=>new Map((o[p]?.modules??[]).map(R=>[R.id,R.path])),Jt=R=>"file"in R?R.file:R.box,Tt=()=>{const R=m.focused(),q=m.hovered.path?void 0:m.hovered.box,Q=R&&!R.test&&!R.typesOnly&&p===r?i?.get(R.path):void 0,ne=x?' · <span class="architecture-chosen">chosen: click it again, or press Esc, to let it go</span>':"";R&&(m.hovered.path||x&&"file"in x)?lt.innerHTML=zg(R.path,g.pointing,R.pointed,Ms(),Q)+(m.hovered.path?"":ne):q?lt.innerHTML=`<code>${M(q)}</code> · click for its details`:x?lt.innerHTML=`<code>${M(Jt(x))}</code>${ne}`:lt.textContent=Yl},Ss=()=>getComputedStyle(Is).gridTemplateColumns.trim().split(/\s+/).length>1,Kt=(R,q=!1)=>{x=R,m.selected=R===null?{}:"file"in R?{path:R.file}:{box:R.box},Ye.tell(p,x,!0),Tt(),q&&R&&!Ss()&&Ye.element.scrollIntoView({block:"start",behavior:u?"auto":"smooth"})},Mt=R=>{g={...g,...R},m.pointing=g.pointing,Se(p)},On=R=>f?f.set(R>=d?null:R):Se(R),Vt=R=>{b=R,N.textContent=b?"❚❚ pause":"▶ play the history",b&&p===d&&Se(0),k=0};N.addEventListener("click",()=>Vt(!b)),j.addEventListener("click",()=>{v=v==="boxes"?"tangle":"boxes",m.setMode(v),j.textContent=v==="boxes"?"tangle it":"untangle it",v==="boxes"&&Se(p,!0)}),S.addEventListener("change",()=>{w=S.checked,En.hidden=!w,Se(p)}),A.addEventListener("change",()=>Mt({together:A.checked})),C.addEventListener("change",()=>Mt({sizing:C.value})),B.addEventListener("change",()=>Mt({colour:B.value})),W.addEventListener("change",()=>Mt({pointing:W.value})),F.addEventListener("input",()=>{Vt(!1),Se(Number(F.value))});let St=p;const fo=f?.on(R=>{St=R??d})??(()=>{}),po=R=>{const q=L.querySelector("svg"),Q=q?.getScreenCTM();if(!q||!Q)return null;const ne=new DOMPoint(R.clientX,R.clientY).matrixTransform(Q.inverse()).x,{x:Ne,width:go}=q.viewBox.baseVal,il=4;return Math.round((ne-Ne-il)/(go-il*2)*d)},As=R=>{const q=po(R);q!==null&&(Vt(!1),Math.max(0,Math.min(d,q))!==p&&On(Math.max(0,Math.min(d,q))))};L.addEventListener("pointerdown",R=>{L.setPointerCapture(R.pointerId),As(R)}),L.addEventListener("pointermove",R=>{L.hasPointerCapture(R.pointerId)&&As(R)});const Es=R=>{const q=$.getBoundingClientRect();return[(R.clientX-q.left)/q.width*Ct,(R.clientY-q.top)/q.height*m.height]};$.addEventListener("mousemove",R=>{const[q,Q]=Es(R),ne=$.dataset.hovered;m.hovered=m.hit(q,Q),$.style.cursor=m.hovered.path||m.hovered.box?"pointer":"",$.dataset.hovered=m.hovered.path??m.hovered.box??"",$.dataset.hovered!==ne&&Tt()}),$.addEventListener("mouseleave",()=>{m.hovered={},$.dataset.hovered="",Tt()}),$.addEventListener("click",R=>{const[q,Q]=Es(R),ne=m.hit(q,Q),Ne=ne.path?{file:ne.path}:ne.box?{box:ne.box}:null;Kt(Ne&&x&&Jt(Ne)===Jt(x)?null:Ne,!0)});const Os=R=>{R.key==="Escape"&&x&&Kt(null)};document.addEventListener("keydown",Os);const Is=y("div",{class:"architecture-stage"},y("div",{class:"architecture-view"},lt,$,An,En),Ye.element);t.replaceChildren(y("figure",{class:"architecture-figure"},z,de,Is,O,L)),Se(p),Ye.tell(p,x,!0);const Cs=()=>{fo(),Ye.stop(),document.removeEventListener("keydown",Os)},ht=$.getContext("2d");if(!ht)return Cs;const At=to($);let Xt=Jl(t),In=0,js=performance.now(),Zt=0,Qt={width:0,height:0};const Et=()=>{const R=window.devicePixelRatio||1,q=$.clientWidth||Ct,Q=Math.round(q*m.height/Ct);q===Qt.width&&Math.abs(Q-Qt.height)<1||(Qt={width:q,height:Q},$.width=Math.round(q*R),$.height=Math.round(Q*R),$.style.height=`${Q}px`)};Et(),window.addEventListener("resize",Et);const Cn=R=>{Zt=requestAnimationFrame(Cn);const q=Math.min(.05,(R-js)/1e3);js=R,At.onScreen()&&(In++%30===0&&(Xt=Jl(t)),f&&St!==p&&Se(St),b&&(k+=q,k>=aw&&(k=0,p>=d?Vt(!1):Se(p+1))),m.step(q),Et(),ht.setTransform($.width/Ct,0,0,$.width/Ct,0,0),m.draw(ht,Xt))};return Zt=requestAnimationFrame(Cn),()=>{cancelAnimationFrame(Zt),At.stop(),Cs(),window.removeEventListener("resize",Et)}}class Fu{listeners=new Set;send(e){for(const n of[...this.listeners])n(e)}on(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}}class iw{at=null;moved=new Fu;get(){return this.at}set(e){e!==this.at&&(this.at=e,this.moved.send(e))}on(e){return this.moved.on(e)}}const me=new iw;function lw(t,e){return n=>{let s=null,a=null,o=!0,r=!1,i=()=>{};const l=(d=!1)=>{if(!s||r||!o&&!d)return;const u=me.get()??s.read.history.commits.length-1;u!==a&&(n.innerHTML=t(s.read,u,s.coverage),a=u)},h=typeof IntersectionObserver=="function"?new IntersectionObserver(d=>{for(const u of d)o=u.isIntersecting;l()},{rootMargin:"200px"}):null;h?.observe(n);const c=me.on(()=>l());return no().then(d=>{r||(s=d,n.querySelector("figure")&&me.get()===null&&(a=d.read.history.commits.length-1),l(!0),e&&(i=e(n,d.read)))}).catch(()=>{}),()=>{r=!0,c(),h?.disconnect(),i()}}}const hw=new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"long",year:"numeric",timeZone:"Europe/Madrid"});function Bu(t,e){const n=t[e];if(!n)return"";const s=e===t.length-1?`the last of ${t.length} commits`:`commit ${e+1} of ${t.length}`,a=M(n.sha);return`${s}: <a href="https://github.com/drpicox/david-rodenas.com/commit/${a}" target="_blank" rel="noopener noreferrer"><code>${a}</code></a> ${hw.format(new Date(n.date))} — ${M(n.subject)}`}const cw=450;function dw(t){me.set(null);let e=[],n,s=!1;const a=y("p",{class:"shown-commit"});a.innerHTML=t.querySelector(".shown-commit")?.innerHTML??"";const o=y("button",{type:"button"},"▶ play the history"),r=y("input",{type:"range",min:0,max:0,step:1,value:0,"aria-label":"The commit every figure below shows"});t.replaceChildren(y("div",{class:"change-player"},o,r,a));const i=()=>e.length-1,l=u=>{const m=u??i();r.value=String(m),a.innerHTML=Bu(e,m)},h=u=>{if(clearTimeout(n),s=u,o.textContent=u?"❚❚ pause":"▶ play the history",!u)return;(me.get()??i())>=i()&&me.set(0);const m=()=>{n=setTimeout(()=>{const f=(me.get()??i())+1;me.set(f>=i()?null:f),f>=i()?h(!1):m()},cw)};m()},c=me.on(l);o.addEventListener("click",()=>h(!s)),r.addEventListener("input",()=>{h(!1);const u=Number(r.value);me.set(u>=i()?null:u)});let d=!1;return no().then(({read:u})=>{d||(e=u.history.commits,r.max=String(i()),l(me.get()))}).catch(()=>{o.disabled=!0,r.disabled=!0}),()=>{d=!0,clearTimeout(n),c()}}function uw(t){let e=!1,n=null,s=null,a="";const o=y("select",{"aria-label":"The box whose couplings are drawn"}),r=y("div",{class:"coupling-picture"}),i=()=>{if(!n||e)return;const h=n.snapshots[me.get()??n.snapshots.length-1];if(!h)return;const c=[...new Set(h.modules.filter(d=>!d.test).map(d=>V(d.path)))].sort((d,u)=>d.localeCompare(u));c.join()!==a&&(o.replaceChildren(...c.map(d=>y("option",{value:d},d))),a=c.join()),r.innerHTML=Eu(h,s&&c.includes(s)?s:void 0),o.value=r.querySelector("svg.coupling")?.dataset.box??""};o.addEventListener("change",()=>{s=o.value,i()});const l=me.on(i);return no().then(h=>{e||(n=h.read,t.replaceChildren(y("label",{class:"coupling-choice"},"the box: ",o),r),i())}).catch(()=>{}),()=>{e=!0,l()}}const Co=3;function Kl(t){const e=t.map(n=>n.split("/").pop()??n);return e.length>Co?`${e.slice(0,Co).join(", ")} and ${e.length-Co} more`:e.length>1?`${e.slice(0,-1).join(", ")} and ${e.at(-1)}`:e[0]??""}function mw(t,e,{changed:n,written:s}){const a=[n.length>0?`changed ${Kl(n)}`:"",s.length>0?`wrote ${Kl(s)}`:""].filter(Boolean).join("; ");return`${t??"the files now gone"}, ${Be(e)}: ${a||"nothing"} — ${e.subject}`}function fw(t){const e=new Map,n=(a,o)=>{const r=`${a??""}@${o}`,i=e.get(r)??{changed:[],written:[]};return e.set(r,i),i};for(const a of t){if(a.test)continue;const o=Au(a);n(o,a.born).written.push(a.path);for(const r of a.changed)n(o,r).changed.push(a.path)}const s=({changed:a,written:o})=>({changed:[...a].sort(),written:[...o].sort()});return{get:(a,o)=>s(e.get(`${a??""}@${o}`)??{changed:[],written:[]})}}const pw="http://www.w3.org/2000/svg";function gw(t,e){const n=fw(e.lives),s=e.history.commits,a=c=>{const d=t.querySelector("svg.change-matrix"),u=d?.getScreenCTM();if(!d||!u)return null;const m=new DOMPoint(c.clientX,c.clientY).matrixTransform(u.inverse()),[f,p,w]=[Number(d.dataset.left),Number(d.dataset.step),Number(d.dataset.row)],g=Math.floor((m.x-f)/p);if(!(g>=0&&g<s.length))return null;const v=[...d.querySelectorAll("text.row")].find(b=>m.y>=Number(b.dataset.top)&&m.y<Number(b.dataset.top)+w);return{svg:d,at:g,x:f+g*p,row:v?{box:v.dataset.box||null}:null}},o=c=>{const d=t.querySelector(".changes-pointed");d&&(d.textContent=c)},r=(c,d,u)=>{if(t.querySelector("rect.pointed")?.remove(),!c)return;const m=document.createElementNS(pw,"rect");m.setAttribute("class","pointed"),m.setAttribute("x",String(d)),m.setAttribute("y","0"),m.setAttribute("width",String(u)),m.setAttribute("height",String(c.viewBox.baseVal.height-20)),c.prepend(m)},i=c=>{const d=a(c),u=d&&s[d.at];if(!d||!u)return r(null,0,0),o("");r(d.svg,d.x,Number(d.svg.dataset.step)),o(d.row?mw(d.row.box,u,n.get(d.row.box,d.at)):`${Be(u)} — ${u.subject}`)},l=()=>{r(null,0,0),o("")},h=c=>{const d=a(c);d&&me.set(d.at>=s.length-1?null:d.at)};return t.addEventListener("pointermove",i),t.addEventListener("pointerleave",l),t.addEventListener("pointerdown",h),()=>{t.removeEventListener("pointermove",i),t.removeEventListener("pointerleave",l),t.removeEventListener("pointerdown",h)}}const ww={"change-matrix":gw},yw={"change-player":dw,"change-graph":Pu({follow:me,lenses:{sizing:"changes",colour:"heat",together:!0,pointing:"together"}}),...Object.fromEntries(Object.entries(ju).map(([t,e])=>[t,lw(e,ww[t])])),"change-coupling":uw},Vl="/data/architecture.json",bw="/data/coverage.json";function vw(t){try{return JSON.parse(t(bw))}catch{return null}}const kw={"change-graph":Mu,"change-player":t=>{const{history:e}=cs(t(Vl));return`<p class="shown-commit">${Bu(e.commits,e.commits.length-1)}</p>`},...Object.fromEntries(Object.entries(ju).map(([t,e])=>[t,n=>{const s=cs(n(Vl));return e(s,s.history.commits.length-1,vw(n))}]))};function so(t,e){return{...t,snapshot:{modules:t.snapshot.modules.filter(n=>e.has(n.id)),dependencies:t.snapshot.dependencies.filter(({from:n,to:s})=>e.has(n)&&e.has(s))},...t.members&&{members:new Map([...t.members].filter(([n])=>e.has(n)))}}}const $w={name:"around",title:"Around a file",role:"step",shelf:"This site",summary:"One file and the files around it, as many arrows out as asked: what it needs, what needs it, or both.",inputs:[{name:"graph",label:"graph",type:"graph"},{name:"file",label:"file",type:"text",initial:"Feature.ts",hint:"words its path contains: the first file that does"},{name:"steps",label:"arrows out",type:"number",initial:1,editor:{kind:"number",min:1,max:12,step:1}},{name:"way",label:"along",type:"text",initial:"both",editor:{kind:"choice",choices:[{value:"needs",label:"what it needs"},{value:"needed",label:"what needs it"},{value:"both",label:"both"}]}}],outputs:[{name:"graph",label:"graph",type:"graph"}],run:t=>{const e=t.graph,n=String(t.file??""),s=e.snapshot.modules.find(l=>l.path.endsWith(`/${n}`)||l.path===n)??e.snapshot.modules.find(l=>l.path.includes(n));if(!s||n==="")throw new Error(`file: no ${e.of==="boxes"?"box":"file"}'s path has ${n||"nothing"} in it`);const a=String(t.way),o=new Map;for(const{from:l,to:h}of e.snapshot.dependencies)a!=="needed"&&o.set(l,[...o.get(l)??[],h]),a!=="needs"&&o.set(h,[...o.get(h)??[],l]);const r=new Set([s.id]);let i=[s.id];for(let l=0;l<Math.round(Number(t.steps))&&i.length>0;l+=1){i=i.flatMap(h=>(o.get(h)??[]).filter(c=>!r.has(c)));for(const h of i)r.add(h)}return{outputs:{graph:so(e,r)},said:`${s.path} and ${r.size-1} around it`,settled:{file:s.path}}}},xw={name:"arrows",title:"Its arrows",role:"step",shelf:"This site",summary:"A graph as the table of its arrows: what needs what, between which boxes, and whether all it needs is a type.",inputs:[{name:"graph",label:"graph",type:"graph"}],outputs:[{name:"table",label:"table",type:"table"}],run:t=>{const e=t.graph,n=new Map(e.snapshot.modules.map(r=>[r.id,r.path])),s=r=>e.of==="boxes"?r:V(r),a=e.snapshot.dependencies.map(({from:r,to:i,typeOnly:l})=>{const[h,c]=[n.get(r)??"",n.get(i)??""];return{from:h,to:c,"from box":s(h),"to box":s(c),crossing:s(h)===s(c)?"no":"yes","types only":l?"yes":"no"}});return{outputs:{table:{columns:[{name:"from",kind:"text",key:!0},{name:"to",kind:"text",key:!0},{name:"from box",kind:"text"},{name:"to box",kind:"text"},{name:"crossing",kind:"text",about:"yes when it goes from one box into another"},{name:"types only",kind:"text",about:"yes when all it needs is a type: an interface, not what implements it"}],rows:a}}}}},Tw={name:"boxes",title:"Into boxes",role:"step",shelf:"This site",summary:"Every file gathered into its box — a folder of the frame, or a feature — and the arrows between boxes, its files' measures added up.",inputs:[{name:"graph",label:"graph",type:"graph"}],outputs:[{name:"graph",label:"graph",type:"graph"}],run:t=>{const e=t.graph;if(e.of==="boxes")return{outputs:{graph:e}};const n=[...new Set(e.snapshot.modules.map(h=>V(h.path)))].sort((h,c)=>h.localeCompare(c)),s=new Map(n.map((h,c)=>[h,c])),a=new Map(n.map((h,c)=>[c,[]]));for(const h of e.snapshot.modules)a.get(s.get(V(h.path))??0)?.push(h.id);const o=new Map(e.snapshot.modules.map(h=>[h.id,h.lines])),r=n.map((h,c)=>({id:c,path:h,lines:(a.get(c)??[]).reduce((d,u)=>d+(o.get(u)??0),0),test:!1})),i=bs(e.snapshot,!0).map(h=>({from:s.get(h.from)??0,to:s.get(h.to)??0,typeOnly:h.typeOnly})),l=e.measured.filter(h=>h.column.kind==="number").map(h=>({column:{...h.column,about:`its files' ${h.column.name}, added up`},values:new Map([...a].map(([c,d])=>[c,d.reduce((u,m)=>u+Number(h.values.get(m)??0),0)]))}));return{outputs:{graph:{snapshot:{modules:r,dependencies:i},of:"boxes",members:a,measured:l,read:e.read,at:e.at}}}}};function Vr(t){return cs(t("/data/architecture.json"))}const Mw=t=>{const e=t.split(new RegExp("(?<=\\.)\\s"))[0]??t;return e.length>90?`${e.slice(0,89)}…`:e},Sw={name:"commits",title:"Commits",role:"source",shelf:"This site",summary:"This site's history, a row a commit: when, what it said, how many files it changed, and the files, tests, lines and arrows after it.",inputs:[],outputs:[{name:"table",label:"table",type:"table"}],run:(t,{read:e})=>{const{history:n,snapshots:s}=Vr(e),a=n.commits.map((r,i)=>{const l=ms(s[i]??{modules:[],dependencies:[]});return{commit:i,date:r.date.slice(0,10),changed:n.changes[i]?.changed.length??0,files:l.files,tests:l.tests,lines:l.lines,arrows:l.arrows,crossing:l.crossing,tested:l.tested,subject:Mw(r.subject)}});return{outputs:{table:{columns:[{name:"commit",kind:"number",key:!0,about:"its place in the history, from 0"},{name:"date",kind:"text"},{name:"changed",kind:"number",about:"the files it changed"},{name:"files",kind:"number",about:"the files that ship, after it"},{name:"tests",kind:"number"},{name:"lines",kind:"number"},{name:"arrows",kind:"number",about:"the arrows between files that ship"},{name:"crossing",kind:"number",about:"the arrows from one box into another"},{name:"tested",kind:"number",about:"the files a test imports directly"},{name:"subject",kind:"text"}],rows:a,credits:[{said:"This site's own history, read by the TypeScript compiler at every commit."}]}}}}};function Aw(t){const e=new Map,n=new Map;for(const{from:a,to:o}of t.dependencies)a!==o&&(e.set(o,(e.get(o)??new Set).add(a)),n.set(a,(n.get(a)??new Set).add(o)));const s=a=>new Map(t.modules.map(o=>[o.id,a.get(o.id)?.size??0]));return{neededBy:s(e),needs:s(n)}}function ao(t){const{snapshot:e}=t,{neededBy:n,needs:s}=Aw(e),a=t.of==="boxes",o=[a?{name:"box",kind:"text",key:!0}:{name:"file",kind:"text",key:!0},...a?[{name:"files",kind:"number"}]:[{name:"box",kind:"text"}],{name:"lines",kind:"number"},...a?[]:[{name:"test",kind:"text"}],{name:"needed",kind:"number",about:`the ${t.of} that need it`},{name:"needs",kind:"number",about:`the ${t.of} it needs`},...t.measured.map(l=>l.column)],r=e.modules.map(l=>({...a?{box:l.path,files:t.members?.get(l.id)?.length??0}:{file:l.path,box:V(l.path)},lines:l.lines,...!a&&{test:l.test?"yes":"no"},needed:n.get(l.id)??0,needs:s.get(l.id)??0,...Object.fromEntries(t.measured.map(h=>[h.column.name,h.values.get(l.id)??null]))})),i=t.read.history.commits[t.at];return{columns:o,rows:r,credits:i?[{said:`This site's source at commit ${i.sha.slice(0,7)}, of ${Be(i)} ${i.date.slice(0,4)}.`}]:[]}}const Ew={name:"files",title:"As a table",role:"step",shelf:"This site",summary:"A graph as the table of its files, or boxes: path, box, lines, how many need it and it needs, and every column measured on the way.",inputs:[{name:"graph",label:"graph",type:"graph"}],outputs:[{name:"table",label:"table",type:"table"}],run:t=>({outputs:{table:ao(t.graph)}})};function K(t,e,n,s={}){if(e!==void 0&&e!==""){const r=t.columns.find(i=>i.name===e);if(!r)throw new Error(`${n}: the table has no column ${e} — it has ${t.columns.map(i=>i.name).join(", ")}`);if(s.numeric&&r.kind!=="number")throw new Error(`${n}: ${e} holds words, and this needs numbers`);return r}const a=t.columns.filter(r=>(!s.numeric||r.kind==="number")&&!s.besides?.includes(r.name)),o=(s.measured?a.find(r=>!r.key):void 0)??a[0];if(!o)throw new Error(`${n}: the table has no column ${s.numeric?"of numbers":"left"}`);return o}const sn=(t,e)=>typeof t=="number"?t-Number(e):t.localeCompare(e),Le=t=>t!=null&&t!=="",Xl=t=>t.split(/[\s,]+/).filter(Boolean),jo=(t,e)=>typeof t=="number"?t===Number(e):t===e,gn={equals:{label:"equals",test:(t,e)=>Le(t)&&jo(t,e.trim())},differs:{label:"differs from",test:(t,e)=>Le(t)&&!jo(t,e.trim())},below:{label:"is below",test:(t,e)=>Le(t)&&sn(t,e)<0},"at-most":{label:"is at most",test:(t,e)=>Le(t)&&sn(t,e)<=0},above:{label:"is above",test:(t,e)=>Le(t)&&sn(t,e)>0},"at-least":{label:"is at least",test:(t,e)=>Le(t)&&sn(t,e)>=0},between:{label:"is between",test:(t,e)=>{const[n="",s=""]=Xl(e);return Le(t)&&sn(t,n)>=0&&sn(t,s)<=0}},"one-of":{label:"is one of",test:(t,e)=>Le(t)&&Xl(e).some(n=>jo(t,n))},contains:{label:"contains",test:(t,e)=>Le(t)&&String(t).toLowerCase().includes(e.toLowerCase())},"has-a-value":{label:"has a value",test:t=>Le(t)},"is-empty":{label:"is empty",test:t=>!Le(t)}},Ow={name:"keep-files",title:"Keep files",role:"step",shelf:"This site",summary:"Only the files whose column is as asked — changed ten times or more, of one group, needed by many — kept as a graph, to measure and draw.",inputs:[{name:"graph",label:"graph",type:"graph"},{name:"column",label:"column",type:"text",optional:!0,editor:{kind:"column",of:"graph"}},{name:"is",label:"is",type:"text",initial:"at-least",editor:{kind:"choice",choices:Object.entries(gn).map(([t,e])=>({value:t,label:e.label}))}},{name:"value",label:"value",type:"text",initial:"",editor:{kind:"values",of:"graph",column:"column",test:"is"},hint:"a number or a word; two, for between; several, for one of"}],outputs:[{name:"graph",label:"graph",type:"graph"}],run:t=>{const e=t.graph,n=ao(e),s=K(n,t.column,"column",{measured:!0}),a=gn[String(t.is)];if(!a)throw new Error(`is: there is no test ${String(t.is)}: there are ${Object.keys(gn).join(", ")}`);const o=String(t.value??""),r=n.columns[0]?.name??"file",i=new Map(e.snapshot.modules.map(h=>[h.path,h.id])),l=new Set(n.rows.filter(h=>a.test(h[s.name],o)).flatMap(h=>i.get(String(h[r]))??[]));return{outputs:{graph:so(e,l)},said:`${l.size} of ${e.snapshot.modules.length} ${e.of}`,settled:{column:s.name}}}},Iw={name:"knot",title:"The knot",role:"step",shelf:"This site",summary:"Only the files of a core at least as deep as asked — the deepest, left to it: the files that hold each other up (Seidman, 1983).",inputs:[{name:"graph",label:"graph",type:"graph"},{name:"depth",label:"at least",type:"number",optional:!0,editor:{kind:"number",min:1,max:20,step:1}}],outputs:[{name:"graph",label:"graph",type:"graph"}],run:t=>{const e=t.graph,n=J.cores(e.snapshot),s=Math.max(0,...n.values()),a=t.depth===void 0?s:Math.round(Number(t.depth)),o=new Set([...n].filter(([,r])=>r>=a).map(([r])=>r));return{outputs:{graph:so(e,o)},said:`core ${a} or deeper: ${o.size} ${e.of}; the deepest is ${s}`,settled:{depth:a}}}},jt=t=>e=>t(e.snapshot),Zl=t=>e=>{const n=t(e);return e.of==="files"||!e.members?n:new Map([...e.members].map(([s,a])=>[s,a.reduce((o,r)=>o+(n.get(r)??0),0)]))},No={pagerank:{label:"PageRank",about:"how much it is needed by what is itself needed (Brin and Page, 1998)",of:jt(J.pageRank)},bridges:{label:"bridges",about:"the share of the shortest ways between two others that pass through it (Freeman, 1978)",of:jt(J.bridges)},reach:{label:"reach",about:"how many others a change to it could reach, as far as the arrows go",of:jt(J.reach)},core:{label:"core",about:"how deep in the knot it sits: its core number (Seidman, 1983)",of:jt(J.cores)},stack:{label:"stack",about:"the arrows of the longest chain of what it needs",of:jt(J.heights)},closeness:{label:"closeness",about:"how near it is to the rest, the arrows read either way (Freeman, 1978)",of:jt(t=>J.paths(t).closeness)},clustering:{label:"clustering",about:"the share of its neighbours that are neighbours of each other",of:jt(t=>J.clustering(t).local)},group:{label:"group",about:"the group the arrows gather it into, found by the Louvain method (Blondel and others, 2008)",kind:"text",of:t=>new Map([...J.groups(t.snapshot)].map(([e,n])=>[e,`group ${n+1}`]))},changes:{label:"changes",about:"the commits that changed it so far, sweeps left out",of:Zl(t=>Nu(t.read.lives,t.at,ot(t.read.history)))},heat:{label:"heat",about:"how lately it changed: a change counts one, halving every six commits",of:Zl(t=>Si(t.read.lives,t.at,6,ot(t.read.history)))}},Cw={name:"measure",title:"Measure",role:"statistic",shelf:"This site",summary:"One more column for every file: PageRank, bridges, reach, core, stack, closeness, clustering, group — or how often and how lately it changed.",inputs:[{name:"graph",label:"graph",type:"graph"},{name:"what",label:"what",type:"text",initial:"pagerank",editor:{kind:"choice",choices:Object.entries(No).map(([t,e])=>({value:t,label:e.label}))}}],outputs:[{name:"graph",label:"graph",type:"graph"}],run:t=>{const e=t.graph,n=String(t.what),s=No[n];if(!s)throw new Error(`what: there is no measure ${n}: there are ${Object.keys(No).join(", ")}`);const a={name:n,kind:s.kind??"number",about:s.about},o=new Map(e.snapshot.modules.map(r=>[r.id,s.of(e).get(r.id)??null]));return{outputs:{graph:{...e,measured:[...e.measured.filter(r=>r.column.name!==n),{column:a,values:o}]}},said:`+ ${s.label}`}}};function te(t){if(!Number.isFinite(t))return"—";const e=Math.abs(t),n=Number.isInteger(t)?0:e>=100?1:e>=1?2:Math.max(0,2-Math.floor(Math.log10(e))),s=String(Number(e.toFixed(n)));return t<0&&s!=="0"?`−${s}`:s}const Ql=[["files","files","the files that ship"],["arrows","arrows","files that need another, each pair once"],["density","density","the arrows there are over the arrows there could be"],["clustering","clustering","how much a file's neighbours are neighbours of each other, on average"],["path","mean path","the mean of the shortest ways between two files"],["small-world","small world","the clustering over a random network's, over the paths over a random network's (Humphries and Gurney, 2008)"],["core","deepest core","how deep the knot is"],["stack","tallest stack","the longest chain of what needs what, in arrows"],["modularity","modularity","how much the groups the arrows make keep their arrows inside (Newman and Girvan, 2004)"]],jw={name:"network",title:"Network figures",role:"statistic",shelf:"This site",summary:"The graph in the figures network science reads any network by: files, arrows, density, clustering, mean path, small-world-ness, core, stack, modularity.",inputs:[{name:"graph",label:"graph",type:"graph"}],outputs:[...Ql.map(([t,e])=>({name:t,label:e,type:"number"})),{name:"table",label:"as a table",type:"table"}],run:t=>{const{snapshot:e}=t.graph,n=Oi(e),s={files:n.files,arrows:n.arrows,density:n.density,clustering:n.clustering,path:n.meanPath,"small-world":n.smallWorld,core:n.deepestCore,stack:n.tallest,modularity:Ur(e,J.groups(e))},a={columns:[{name:"figure",kind:"text",key:!0},{name:"value",kind:"number"},{name:"what",kind:"text"}],rows:Ql.map(([o,r,i])=>({figure:r,value:s[o],what:i}))};return{outputs:{...s,table:a},said:`${n.files} files · small world ${te(n.smallWorld)}`}}};function Nw(t,e){return e.includes("*")?new RegExp(`^${e.split("*").map(s=>s.replace(/[.+?^${}()|[\]\\]/g,"\\$&")).join(".*")}$`).test(t):t.includes(e)}const Lw={name:"only-files",title:"Only some files",role:"step",shelf:"This site",summary:"Only the files whose path is as asked — words it contains, or a pattern with stars, as platform/* — or every file but those.",inputs:[{name:"graph",label:"graph",type:"graph"},{name:"path",label:"path",type:"text",initial:"platform/",hint:"words the path contains, or a pattern with stars: features/*/browser/*"},{name:"keep",label:"keep",type:"text",initial:"matching",editor:{kind:"choice",choices:[{value:"matching",label:"those"},{value:"others",label:"all but those"}]}}],outputs:[{name:"graph",label:"graph",type:"graph"}],run:t=>{const e=t.graph,n=String(t.path??""),s=t.keep!=="others",a=new Set(e.snapshot.modules.filter(o=>Nw(o.path,n)===s).map(o=>o.id));return{outputs:{graph:so(e,a)},said:`${a.size} of ${e.snapshot.modules.length} ${e.of}`}}};function Sn(t){return(t.credits??[]).map(e=>e.refreshed?`${e.said} Brought up to date ${e.refreshed}.`:e.said)}const Ru=t=>t==null||t===!1?"":Array.isArray(t)?t.map(Ru).join(""):typeof t=="object"?t.html:M(String(t));function P(t,e={},...n){const s=Object.entries(e).flatMap(([o,r])=>r==null||r===!1?[]:r===!0?[` ${o}`]:[` ${o}="${M(String(r))}"`]).join(""),a=n.map(Ru).join("");return{html:`<${t}${s}>${a}</${t}>`}}const Nt=t=>Math.round(t*10)/10;function Pw(t,e,n,s,a){const o=t.dependencies.flatMap(({from:i,to:l})=>{const[h,c]=[e.get(i),e.get(l)];return h&&c?[`M${Nt(h.x)} ${Nt(h.y)}L${Nt(c.x)} ${Nt(c.y)}`]:[]}).join(""),r=t.modules.map(i=>{const l=e.get(i.id)??{x:0,y:0},h=n.fills?.get(i.id);return P("circle",{class:["ball",i.test?"test":"",n.classes?.get(i.id)??""].filter(Boolean).join(" "),cx:Nt(l.x),cy:Nt(l.y),r:Nt(n.radii?.get(i.id)??3),style:h?`fill: ${h}`:void 0},P("title",{},i.path))});return P("svg",{class:"architecture tangle",viewBox:`0 0 ${s} ${a}`,role:"img","aria-label":`${t.modules.length} nodes tangled by ${t.dependencies.length} arrows`},P("path",{class:"thread",d:o}),P("g",{class:"balls"},r)).html}const Fw=5,Bw=6e7,eh=2,th=16;function Rw(t,e,n){const[s,a]=[e*eh,n*eh],o=t.modules.length,r=new Map([...t.modules].sort((v,b)=>v.path.localeCompare(b.path)).map((v,b)=>[v.id,b])),i=t.modules.map(v=>{const b=((r.get(v.id)??0)+.5)/Math.max(1,o),[k,x]=[b*Fw*Math.PI*2,(.12+.88*b)*Math.min(e,n)*.45];return{x:s/2+Math.cos(k)*x,y:a/2+Math.sin(k)*x,vx:0,vy:0}}),l=new Map(t.modules.map((v,b)=>[v.id,b])),h=t.dependencies.flatMap(({from:v,to:b})=>{const[k,x]=[l.get(v),l.get(b)];return k!==void 0&&x!==void 0&&k!==x?[[k,x]]:[]}),c=Math.max(60,Math.min(400,Math.round(Bw/Math.max(1,o*o))));for(let v=0;v<c;v+=1)Lu(i,h,{width:s,height:a,heat:Math.exp(-v/c*2.5)});const d=i.map(v=>v.x),u=i.map(v=>v.y),[m,f]=[Math.min(...d),Math.min(...u)],p=Math.min((e-th*2)/Math.max(1,Math.max(...d)-m),(n-th*2)/Math.max(1,Math.max(...u)-f),1),[w,g]=[(e-(Math.max(...d)-m)*p)/2,(n-(Math.max(...u)-f)*p)/2];return new Map(t.modules.map((v,b)=>[v.id,{x:w+((i[b]?.x??0)-m)*p,y:g+((i[b]?.y??0)-f)*p}]))}const Lo=1100,nh=760,Dw={boxes:[2.2,6],tangle:[2.4,10]},Ww=900,Hw={name:"picture",title:"Picture of the source",role:"paint",shelf:"This site",summary:"The graph drawn in its boxes, or tangled, each ball as big as one column and coloured by another.",inputs:[{name:"graph",label:"graph",type:"graph"},{name:"size",label:"as big as",type:"text",optional:!0,editor:{kind:"column",of:"graph",numeric:!0}},{name:"colour",label:"coloured by",type:"text",optional:!0,editor:{kind:"column",of:"graph"}},{name:"layout",label:"drawn",type:"text",initial:"boxes",editor:{kind:"choice",choices:[{value:"boxes",label:"in boxes"},{value:"tangle",label:"tangled"}]}}],outputs:[],run:t=>{const e=t.graph,n=ao(e),s=n.columns[0]?.name??"file",a=new Map(e.snapshot.modules.map(L=>[L.path,L.id])),o=L=>new Map(n.rows.map(F=>[a.get(String(F[s]))??-1,F[L]??null])),r=t.layout==="tangle",[i,l]=Dw[r?"tangle":"boxes"],h=t.size?K(n,t.size,"as big as",{numeric:!0}):void 0,c=h?o(h.name):void 0,d=c?Math.max(1e-9,...[...c.values()].map(L=>typeof L=="number"?L:0)):1,u=c&&new Map([...c].map(([L,F])=>[L,i+(l-i)*Math.sqrt(Math.max(0,Number(F??0))/d)])),m=t.colour?K(n,t.colour,"coloured by"):void 0,f=m?o(m.name):void 0,p=f?[...f.values()].filter(L=>typeof L=="number"):[],[w,g]=[Math.min(...p),Math.max(...p)],v=m?.kind==="text"&&f?[...new Set([...f.values()].map(String))].sort((L,F)=>L.localeCompare(F,void 0,{numeric:!0})):[],b=L=>Math.round(30+70*Math.sqrt((L-w)/Math.max(1e-9,g-w))),k=m?.kind==="number"&&f?new Map([...f].flatMap(([L,F])=>typeof F=="number"?[[L,`color-mix(in srgb, var(--bp-heat) ${b(F)}%, var(--paper))`]]:[])):void 0,x=v.length>0&&f?new Map([...f].map(([L,F])=>[L,`bp-s${v.indexOf(String(F))%8}`])):void 0,T={...u&&{radii:u},...k&&{fills:k},...x&&{classes:x}};if(r&&e.snapshot.modules.length>Ww)throw new Error(`${e.snapshot.modules.length} ${e.of} are too many to tangle here: keep some first`);const $=r?Pw(e.snapshot,Rw(e.snapshot,Lo,nh),T,Lo,nh):xu(Za(e.snapshot,{tests:!0,width:Lo}),T),O=[`${e.snapshot.modules.length} ${e.of}`,h&&`as big as ${h.name}`,m&&`coloured by ${m.name}`].filter(Boolean).join(", ");return{painting:{html:`<div class="bp-picture">${$}</div>`,caption:O,credits:Sn(n)}}}},qw={modules:[],dependencies:[]},zw={name:"source",title:"The source",role:"source",shelf:"This site",summary:"This site's own source as a graph, at any commit of its history: a node a file, an arrow a file that needs another.",inputs:[{name:"commit",label:"commit",type:"number",optional:!0,editor:t=>{const{history:e}=Vr(t),n=e.commits.length-1;return{kind:"number",min:0,max:n,step:1,show:s=>e.commits[s]?`${Be(e.commits[s])}, ${s===n?"the last":`commit ${s+1} of ${n+1}`}`:""}},hint:"which commit of the history, counted from 0; the last when left empty"},{name:"tests",label:"with the tests",type:"flag",initial:!1,editor:{kind:"flag"}}],outputs:[{name:"graph",label:"graph",type:"graph"}],run:(t,{read:e})=>{const n=Vr(e),s=n.snapshots.length-1,a=t.commit===void 0?s:Math.round(Number(t.commit));if(a<0||a>s)throw new Error(`commit: the history runs from 0 to ${s}`);const o=n.snapshots[a]??qw,r=new Set(o.modules.filter(c=>t.tests===!0||!c.test).map(c=>c.id)),i={modules:o.modules.filter(c=>r.has(c.id)),dependencies:o.dependencies.filter(({from:c,to:d})=>r.has(c)&&r.has(d))},l={snapshot:i,of:"files",measured:[],read:n,at:a},h=n.history.commits[a];return{outputs:{graph:l},settled:{commit:a},said:`${i.modules.length} files · ${i.dependencies.length} arrows${h?` · ${Be(h)}`:""}`}}},Gw=[zw,Sw,Cw,Lw,Ow,$w,Iw,Tw,Ew,xw,jw,Hw],_w={name:"graph",label:"a graph",colour:"--bp-graph",describe:t=>{const{snapshot:e,of:n}=t;return`${e.modules.length} ${n} · ${e.dependencies.length} arrows`},becomes:{table:t=>ao(t)}},Uw={name:"architecture",apps:{architecture:Pu({lead:me}),...yw},stills:{architecture:Mu,...kw},nodes:Gw,pinTypes:[_w]},Yw=[{name:"llave de laton",kind:"key",value:111},{name:"cristal magico",kind:"key",value:1112},{name:"llave de casa",kind:"key",value:1314},{name:"llave de la verja",kind:"key",value:2636},{name:"llave del puente",kind:"key",value:3444},{name:"llave del gnomo",kind:"key",value:4636},{name:"barca",kind:"key",value:3233},{name:"llave de la despensa",kind:"key",value:2010},{name:"diario",kind:"weapon",value:1},{name:"matamoscas",kind:"weapon",value:2},{name:"espada de madera",kind:"weapon",value:4},{name:"espada",kind:"weapon",value:8},{name:"espada venenosa",kind:"weapon",value:12},{name:"Thurmei",kind:"weapon",value:16},{name:"camisa",kind:"shield",value:2},{name:"escudo de madera",kind:"shield",value:4},{name:"escudo de escamas",kind:"shield",value:8},{name:"escudo",kind:"shield",value:12},{name:"Rharmei",kind:"shield",value:16},{name:"caramelo",kind:"food",value:2},{name:"judia",kind:"food",value:4},{name:"manzana",kind:"food",value:8},{name:"naranja",kind:"food",value:12},{name:"pocima",kind:"food",value:16}],Jw=[{name:"mosca acida",attack:4,defence:0,drops:"cristal magico"},{name:"mosca",attack:0,defence:0,drops:"caramelo"},{name:"mosquito",attack:2,defence:0,drops:"matamoscas"},{name:"polilla",attack:1,defence:1,drops:"camisa"},{name:"cucaracha",attack:1,defence:1,drops:"llave de casa"},{name:"raton",attack:2,defence:2,drops:"judia"},{name:"rana venenosa",attack:2,defence:1,drops:"espada de madera"},{name:"planta carnivora",attack:1,defence:3,drops:"escudo de madera"},{name:"raton salvaje",attack:3,defence:3,drops:"llave de la verja"},{name:"escorpion dorado",attack:12,defence:2,drops:"espada venenosa"},{name:"trucha",attack:3,defence:3,drops:"manzana"},{name:"trucha asesina",attack:4,defence:7,drops:"escudo de escamas"},{name:"minimonstruo aquatico",attack:8,defence:4,drops:"llave del puente"},{name:"lobo",attack:8,defence:6,drops:"manzana"},{name:"lobo asesino",attack:12,defence:7,drops:"escudo"},{name:"ogro",attack:6,defence:10,drops:"naranja"},{name:"gnomo de puente",attack:11,defence:11,drops:"llave del gnomo"},{name:"murcielago",attack:8,defence:8,drops:"judia"},{name:"aranya",attack:14,defence:4,drops:"Thurmei"},{name:"vampiro",attack:12,defence:13,drops:"Rharmei"},{name:"aranya gigante",attack:14,defence:14,drops:"barca"},{name:"monstruo aquatico enorme",attack:32,defence:15,drops:"llave de la despensa"}],Kw={"0,0":{name:"Bienvenida",exits:[-1,-1,0,-1],holds:"diario",text:`Bienvenido a este juego de aventura. 
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
sus otros habitantes.`}},Vw={items:Yw,monsters:Jw,rooms:Kw},{items:Xw,monsters:Zw,rooms:Qw}=Vw,Li={"llave de laton":"brass key","cristal magico":"magic crystal","llave de casa":"house key","llave de la verja":"gate key","llave del puente":"bridge key","llave del gnomo":"gnome's key",barca:"boat","llave de la despensa":"pantry key",diario:"newspaper",matamoscas:"fly swatter","espada de madera":"wooden sword",espada:"sword","espada venenosa":"poisoned sword",Thurmei:"Thurmei",camisa:"shirt","escudo de madera":"wooden shield","escudo de escamas":"scale shield",escudo:"shield",Rharmei:"Rharmei",caramelo:"sweet",judia:"bean",manzana:"apple",naranja:"orange",pocima:"potion"},Du={"mosca acida":"acid fly",mosca:"fly",mosquito:"mosquito",polilla:"moth",cucaracha:"cockroach",raton:"mouse","rana venenosa":"poison frog","planta carnivora":"carnivorous plant","raton salvaje":"wild mouse","escorpion dorado":"golden scorpion",trucha:"trout","trucha asesina":"killer trout","minimonstruo aquatico":"small water monster",lobo:"wolf","lobo asesino":"killer wolf",ogro:"ogre","gnomo de puente":"bridge gnome",murcielago:"bat",aranya:"spider",vampiro:"vampire","aranya gigante":"giant spider","monstruo aquatico enorme":"enormous water monster"},ey={Bienvenida:"Welcome","Usa las llaves":"Use the keys","Comedor sur":"Dining room, south",Salita:"Sitting room","Huerto de pepinos":"Cucumber patch","Huerto de tomates":"Tomato patch",Caminito:"Little path",Despensa:"Pantry","Aprende a atacar":"Learn to attack",Comedor:"Dining room",Recibidor:"Hall",Patio:"Yard","Huerto de Judias":"Bean patch",Manzanos:"Apple trees",Ciruelos:"Plum trees",Banyo:"Bathroom",Habitacion:"Bedroom","Comedor norte":"Dining room, north",Cocina:"Kitchen","Huerto de calabazas":"Pumpkin patch",Naranjos:"Orange trees",Entrada:"Gate",Nogal:"Walnut trees",Cueva:"Cave","Lago interno":"Underground lake","Centro del lago":"Middle of the lake","Rio salvaje":"Wild river",Rio:"River","Bosque oscuro":"Dark forest","Rio oscuro":"Dark river","Bosque tenebroso":"Gloomy forest","Bosque sombrio":"Shadowy forest","Bosque humedo":"Damp forest",Bosque:"Forest","Claro del Bosque":"Forest clearing","Puente del bosque":"Forest bridge"},We=`The tunnel of the dark, gloomy cave goes on. The walls are damp and
water can be heard running somewhere far off. Walk carefully, or you
will slip or trip.`,Pn=`The forest stretches out, dark and mysterious. The light blurs
through the leaves. You can hear the animals and the forest's other
inhabitants.`,Po=`Though it is day, barely a glimmer of light gets in. Bushes, trees
and brambles make the going hard. Something moves in the dark.`,sh=`Little light comes through the leaves of the trees. Brambles and
bushes give way to a small stream. Something moves in the dark.`,ty={"0,0":`Welcome to this adventure game.
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
the apples, they are hardy and get you through the winters.`,"3,0":We,"3,1":We,"3,2":`An immense underground lake opens up before you. It is dark and you
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
but something stirs beneath the surface.`,"4,0":We,"4,1":We,"4,2":We,"4,3":Po,"4,4":`The north bank of the river is dismal. Strange noises can be heard,
and you sense a curse. Here is the bridge that crosses to the south
bank; the air feels hostile and urges you across.`,"4,5":`The river flows under the rocks and the roots of the forest's trees.
The sounds of the forest grow louder and you feel watched.`,"4,6":`A gap between brambles and bushes lets you into the gloomy forest.
Light is scarce and the shadows are threatening.`,"4,7":Po,"5,0":`The tunnel of the dark, gloomy cave goes on. A great cobweb blocks
the way south. One careless move could make you its prey.`,"5,1":We,"5,2":`The tunnel of the dark, gloomy cave goes on. The walls are damp, and
the sound of water grows louder. Walk carefully, or you will slip or
trip.`,"5,3":`The forest is dark, and beside you you have found a great wall of
solid rock to the west: the mountain, probably.`,"5,4":sh,"5,5":Pn,"5,6":`The forest stretches out, dark and mysterious. You are in a small
clearing where the sky can be seen. You notice the forest is
restless.`,"5,7":Pn,"6,0":We,"6,1":We,"6,2":`You are inside the cave; it is dark and gloomy. The walls are damp and
water can be heard running somewhere far off. You try to look ahead,
but it seems to have no end.`,"6,3":`The forest is dark, and beside you you have found a great wall of
solid rock to the west: the mountain, probably. You notice the rock
is damp; there is very likely a cave.`,"6,4":`Little light comes through the leaves of the trees. Brambles and
bushes give way to a small stream. A bridge crosses the stream to the
eastern part of the forest; there, under a tree, is the house of a
troll you will have to get past if you want to go east.`,"6,5":Po,"6,6":`The forest stretches out, dark, mysterious and restless. You are in a
small clearing where the sky can be seen.`,"6,7":`In this part of the forest the light begins to fail. Tangles of
bushes and brambles slow your steps. You notice something moving
among the shadows.`,"7,0":We,"7,1":We,"7,2":`You are a few steps inside the cave. Cold, damp air reaches you from
within. You try to see where it ends, but you cannot. You hear
murmurs from deep inside.`,"7,3":`Little light comes through the leaves of the trees. A tangle of
climbing plants stirs to the west: it is the mouth of a cave. You
feel a presence watching you.`,"7,4":sh,"7,5":Pn,"7,6":Pn,"7,7":Pn},wn=(t,e)=>t[e]??e,ny=Xw.map(t=>({...t,name:wn(Li,t.name)})),sy=Zw.map(t=>({...t,name:wn(Du,t.name),drops:wn(Li,t.drops)})),ay=Object.fromEntries(Object.entries(Qw).map(([t,e])=>[t,{...e,name:wn(ey,e.name),holds:wn(Li,wn(Du,e.holds)),text:ty[t]??e.text}])),oy={items:ny,monsters:sy,rooms:ay},Wa=16,{items:Xr,monsters:ry,rooms:iy}=oy,ah=["norte","sur","este","oeste"],ly={norte:[1,0],sur:[-1,0],este:[0,1],oeste:[0,-1]},oh=[0,0],rh=[1,0],Ha=(t,e)=>t.find(n=>n.name===e);function ih(t){const e=Ha(Xr,t);if(e)return{item:e};const n=Ha(ry,t);return n?{monster:n}:null}class $n{places=new Map;at=[oh[0],oh[1]];life=Wa;weapon=null;shield=null;key=null;visited=new Set;constructor(){for(const[e,n]of Object.entries(iy))this.places.set(e,{room:n,exits:[...n.exits],holds:ih(n.holds)});this.visited.add(this.here())}here(){return`${this.at[0]},${this.at[1]}`}place(){const e=this.places.get(this.here());if(!e)throw new Error(`no room at ${this.here()}`);return e}get won(){return this.at[0]===rh[0]&&this.at[1]===rh[1]}get spent(){return this.life<=0}save(){return JSON.stringify({at:this.at,life:this.life,held:[this.weapon?.name??null,this.shield?.name??null,this.key?.name??null],visited:[...this.visited],places:[...this.places].map(([e,n])=>[e,n.exits,n.holds?"item"in n.holds?n.holds.item.name:n.holds.monster.name:null])})}static load(e){const n=JSON.parse(e),s=new $n;s.at=n.at,s.life=n.life,[s.weapon,s.shield,s.key]=n.held.map(a=>a?Ha(Xr,a)??null:null),s.visited.clear();for(const a of n.visited)s.visited.add(a);for(const[a,o,r]of n.places){const i=s.places.get(a);i&&Object.assign(i,{exits:o,holds:r?ih(r):null})}return s}charted(){return[...this.visited].sort().flatMap(e=>{const n=this.places.get(e);if(!n)return[];const{holds:s}=n;return[{where:e,name:n.room.name,exits:[n.exits[0],n.exits[1],n.exits[2],n.exits[3]],holds:s?"item"in s?{kind:s.item.kind,name:s.item.name}:{kind:"monster",name:s.monster.name}:null}]})}look(){const{room:e,exits:n,holds:s}=this.place();return{name:e.name,text:e.text,...s&&"monster"in s?{monster:s.monster.name}:{},...s&&"item"in s?{item:s.item.name,itemKind:s.item.kind}:{},exits:ah.flatMap((a,o)=>(n[o]??-1)>=0?[{direction:a,locked:(n[o]??0)>0}]:[]),at:[this.at[0],this.at[1]],life:this.life,...this.weapon?{weapon:this.weapon.name}:{},...this.shield?{shield:this.shield.name}:{},...this.key?{key:this.key.name}:{}}}go(e){const n=this.place(),s=ah.indexOf(e),a=n.exits[s]??-1;if(a<0)return"There is no way out that way.";if(a>0){if(!this.key||this.key.value!==a)return"The way is locked and you are not carrying the key.";n.exits[s]=0,this.key=null}const[o,r]=ly[e];return this.at=[this.at[0]+o,this.at[1]+r],this.visited.add(this.here()),""}take(){const e=this.place();if(!e.holds||!("item"in e.holds))return"There is nothing here to take!";const{item:n}=e.holds;if(n.kind==="food")return this.life=Math.min(Wa,this.life+n.value),e.holds=null,"Yum yum!";const s=n.kind,a=this[s];return this[s]=n,e.holds=a?{item:a}:null,{weapon:"You have taken a weapon.",shield:"You have taken a shield.",key:"You have taken a key."}[s]}attack(){const e=this.place();if(!e.holds||!("monster"in e.holds))return"There is no monster to attack!";if(!this.weapon)return"You have no weapon to attack with!";const{monster:n}=e.holds,s=[];if(this.weapon.value-n.defence>0){const o=Ha(Xr,n.drops);e.holds=o?{item:o}:null,s.push("The monster has been defeated!")}const a=n.attack-(this.shield?.value??0);return a>0&&(this.life-=a,s.push("OUCH!")),s.join(" ")||"Neither of you gets anywhere."}run(e){const n=e.trim().toLowerCase(),s={norte:"norte",north:"norte",n:"norte",sur:"sur",south:"sur",s:"sur",este:"este",east:"este",e:"este",oeste:"oeste",west:"oeste",w:"oeste"}[n];return s?this.go(s):n==="coger"||n==="take"||n==="get"?this.take():n==="atacar"||n==="attack"||n==="hit"?this.attack():n==="mirar"||n==="look"||n==="l"||n===""?"":"I do not understand you."}}function an(t,e){const n=Math.max(...t.map(a=>a.length)),s=[];return t.forEach((a,o)=>{for(let r=0;r<a.length;){const i=a[r]??".";let l=r+1;for(;a[l]===i;)l+=1;const h=e[i];i!=="."&&h&&s.push(`<rect x="${r}" y="${o}" width="${l-r}" height="1" fill="${h}"/>`),r=l}}),`<svg class="pixel" viewBox="0 0 ${n} ${t.length}" shape-rendering="crispEdges" aria-hidden="true">${s.join("")}</svg>`}const on={k:"var(--ink)",a:"var(--accent)",m:"#aeb8c4",g:"#d4a017",b:"#8a5a2b",r:"#c0392b",w:"#f1f1ee",l:"#3f9b4b"},ps={weapon:an(["......mm",".....mmm","....mmm.","g..mmm..",".gmmm...","..bg....",".b..g...","b......."],on),shield:an([".kkkkkk.","kmmrrmmk","kmmrrmmk","krrrrrrk","kmmrrmmk",".kmrrmk.","..kmmk..","...kk..."],on),food:an(["....b...","...b.ll.",".rrbrr..","rrrrrrr.","rwrrrrr.","rrrrrrr.",".rrrrr..","..r.r..."],on),key:an(["........",".ggg....","g...g...","g...gggg","g...g.g.",".ggg..gg","........","........"],on),monster:an(["........","...rr...","..rrrr..",".rwrrwr.",".rkrrkr.","rrrrrrrr","rrkkkkrr","r.r..r.r"],on),player:an(["...kk...","..kkkk..","...kk...",".aaaaaa.","a.aaaa.a","..aaaa..","..a..a..",".kk..kk."],on)},_s=8,hy=["n","s","e","w"];function cy(t,e){const n=new Map(t.map(a=>[a.where,a])),s=[];for(let a=_s-1;a>=0;a-=1)for(let o=0;o<_s;o+=1){const r=`${a},${o}`,i=n.get(r),l=e[0]===a&&e[1]===o;if(!i){s.push(`<span class="cell" data-where="${r}"><span></span></span>`);continue}const h=hy.flatMap((m,f)=>{const p=i.exits[f]??-1;return p<0?[`wall-${m}`]:p>0?[`door-${m}`]:[]}),c=["cell","seen",l?"here":"",...h].filter(Boolean).join(" "),d=i.holds?`<span class="thing${i.holds.kind==="monster"?" monster":""}" title="${M(i.holds.name)}">${ps[i.holds.kind]}</span>`:"",u=l?`<span class="player">${ps.player}</span>`:"";s.push(`<span class="${c}" data-where="${r}" title="${M(i.name)}"><span class="room">${M(i.name)}</span>${d}${u}</span>`)}return`<div class="map" role="img" aria-label="The map: ${t.length} of ${_s*_s} rooms seen">${s.join("")}</div>`}const dy={norte:"north",sur:"south",este:"east",oeste:"west"};function uy(t){const e=["weapon","shield","key"].flatMap(s=>t[s]?[`<span class="held">${ps[s]}${M(t[s]??"")}</span>`]:[]),n=Array.from({length:Wa},(s,a)=>`<span class="heart${a<t.life?" full":""}"></span>`).join("");return`<p class="gear"><span class="hearts" title="${t.life} of ${Wa} life">${n}</span>${e.join("")}</p>`}function my(t){const e=t.exits.map(({direction:s,locked:a})=>`${dy[s]}${a?" (locked)":""}`),n=[t.weapon&&`weapon:${t.weapon}`,t.shield&&`shield:${t.shield}`,t.key&&`key:${t.key}`].filter(Boolean).join(" ");return`<div class="seen"><h4>===== ${M(t.name)} =====</h4><p>${M(t.text).replace(/\n/g,"<br>")}</p>`+(t.monster?`<p class="monster">${ps.monster}There is a monster here: ${M(t.monster)}</p>`:"")+(t.item?`<p class="item">${ps[t.itemKind??"weapon"]}There is: ${M(t.item)}</p>`:"")+`<p class="exits">Exits: ${e.length?e.join(", "):"none"}.</p>`+uy(t)+`<p class="status">(${t.at[1]},${t.at[0]})| ${M(n)} ${t.life}&gt;</p></div>`}function Wu(t){return`<div class="adventure">${cy(t.charted(),t.look().at)}${my(t.look())}</div>`}const fy=()=>Wu(new $n),Hu="adventure",py=["north","south","east","west","take","attack"];function gy(t){let e=wy()??new $n;const n=y("div"),s=y("p",{class:"said"}),a=y("input",{type:"text",autocomplete:"off",spellcheck:!1,placeholder:"north, south, east, west, take, attack"});function o(c=""){n.innerHTML=Wu(e),s.textContent=e.spent&&!c?"Game over; better luck next time.":c,e.won&&(s.textContent="CONGRATULATIONS! You have reached the pantry."),i()}function r(c){const d=e.run(c);o(d),a.value="",a.focus()}function i(){try{localStorage.setItem(Hu,e.save())}catch{}}const l=y("form",{onsubmit:c=>(c.preventDefault(),r(a.value))},y("span",{class:"ps1"},"> "),a),h=y("div",{class:"row"},...py.map(c=>y("button",{type:"button",onclick:()=>r(c)},c)),y("button",{type:"button",class:"quiet",onclick:()=>(e=new $n,o(""))},"start again"));return t.replaceChildren(n,s,l,h),o(""),()=>i()}function wy(){try{const t=localStorage.getItem(Hu);return t?$n.load(t):null}catch{return null}}const yy={name:"adventure",apps:{adventure:gy},stills:{adventure:fy}},zt="program-asked";function xt(t,e){try{const n=JSON.parse(t(e));return typeof n?.year=="number"&&typeof n.through=="string"?n:null}catch{return null}}async function Pi(t){try{const e=await fetch(t),n=e.ok?await e.text():"";return xt(()=>n,t)}catch{return null}}const by=["January","February","March","April","May","June","July","August","September","October","November","December"];function rt(t){return`${Number(t.slice(8,10))} ${by[Number(t.slice(5,7))-1]}`}function oo(t,e=null){const n=e&&!t.years.includes(e.year)?e:null,s=n&&n.refreshed>t.refreshed?n.refreshed:t.refreshed,a=`${rt(s)} ${s.slice(0,4)}`,o=`${Math.min(...t.years)} to ${Math.max(...t.years)}`,r=n?`, and ${n.year} so far, to ${rt(n.through)}`:"";return`<p class="source">Source: ${M(t.attribution)} <a href="${M(t.dataset)}">The dataset, at its source.</a> This site keeps sums of the finished years ${o}${r}, last added to on ${a}.</p>`}function Fi(t,e,n){const s=t.querySelector("p.source");if(s)return s;const a=document.createElement("div");return Promise.all([fetch(e).then(o=>o.json()),n?Pi(n):null]).then(([o,r])=>{a.innerHTML=oo(o,r)}).catch(()=>{}),a}function it(t,e,n){const s=e?.files[n]?.years[e.year];return!e||s===void 0||String(e.year)in t.years?t:{...t,years:{...t.years,[e.year]:s},soFar:{year:e.year,through:e.through}}}const ce=[{code:"08019004",name:"Barcelona (Poblenou)",kind:"background",area:"urban"},{code:"08019043",name:"Barcelona (Eixample)",kind:"traffic",area:"urban"},{code:"08019044",name:"Barcelona (Gràcia - Sant Gervasi)",kind:"traffic",area:"urban"},{code:"08019057",name:"Barcelona (Palau Reial)",kind:"background",area:"urban"},{code:"08019058",name:"Barcelona (Observatori Fabra)",kind:"background",area:"suburban"},{code:"08015021",name:"Badalona",kind:"background",area:"urban"},{code:"08187012",name:"Sabadell",kind:"traffic",area:"urban"},{code:"17079003",name:"Girona (Escola de Música)",kind:"traffic",area:"urban"},{code:"25120001",name:"Lleida",kind:"traffic",area:"urban"},{code:"43148028",name:"Tarragona (Parc de la Ciutat)",kind:"background",area:"urban"},{code:"08137001",name:"Montseny (La Castanya)",kind:"background",area:"rural"}];function gs(t,e){return e==="workdays"?[t.workdays]:e==="weekends"?[t.weekends]:[t.workdays,t.weekends]}const vy=t=>(t%4===0&&t%100!==0||t%400===0?366:365)*24,Fo=t=>t.reduce((e,n)=>e+n.reduce((s,a)=>s+a,0),0);function Bi(t,e){return Object.entries(t.years).map(([n,s])=>{const a=gs(s,e),o=a.reduce((l,h)=>l+Fo(h.counts),0),r=a.reduce((l,h)=>l+Fo(h.sums),0),i=gs(s,"all").reduce((l,h)=>l+Fo(h.counts),0);return{year:Number(n),mean:o>0?r/o:Number.NaN,measured:i/vy(Number(n))}}).filter(({mean:n})=>!Number.isNaN(n)).sort((n,s)=>n.year-s.year)}function Ri(t,e){const n=Object.entries(t.years).filter(([s])=>Number(s)>=e.from&&Number(s)<=e.to).flatMap(([,s])=>gs(s,e.days));return Array.from({length:24},(s,a)=>Array.from({length:12},(o,r)=>{const i=n.reduce((h,c)=>h+(c.sums[r]?.[a]??0),0),l=n.reduce((h,c)=>h+(c.counts[r]?.[a]??0),0);return{mean:l>0?i/l:null,count:l}}))}const rn=[[0,[0,255,0]],[20,[225,225,0]],[40,[255,0,0]],[60,[225,0,225]],[80,[64,0,64]],[230,[16,0,8]]],ky=([t,e,n])=>(.299*t+.587*e+.114*n)/255;function Di(t){const e=Math.max(0,Math.min(t,230)),n=Math.max(1,rn.findIndex(([h])=>h>=e)),[s,a]=rn[n-1]??rn[0],[o,r]=rn[n]??rn[rn.length-1],i=(e-s)/(o-s),l=a.map((h,c)=>Math.round(h+((r[c]??0)-h)*i));return{background:`rgb(${l.join(",")})`,light:ky(l)<.45}}const Sa=80,qu=["January","February","March","April","May","June","July","August","September","October","November","December"],zu=t=>String(t+1).padStart(2,"0");function $y(t,e,n){if(t.mean===null)return'<td class="none"></td>';const{background:s,light:a}=Di(t.mean),o=a?' class="deep"':"",r=`${qu[n]}, hour ${zu(e)}: ${t.mean.toFixed(1)} µg/m³, the mean of ${t.count} measurements`;return`<td${o} style="background:${s}" title="${r}">${Math.round(t.mean)}</td>`}function xy(t){const e=`<tr><th></th>${qu.map(s=>`<th scope="col">${s.slice(0,3)}</th>`).join("")}</tr>`,n=t.map((s,a)=>`<tr><th scope="row">${zu(a)}</th>${s.map((o,r)=>$y(o,a,r)).join("")}</tr>`);return`<table class="heat graded"><thead>${e}</thead><tbody>${n.join("")}</tbody></table>`}const Us=720,Bo=190,Ee={top:14,right:8,bottom:22,left:34};function Gu(t,e,n){const s=Math.min(...t),a=Math.max(...t),o=Us-Ee.left-Ee.right,r=Bo-Ee.top-Ee.bottom,i=o/Math.max(1,a-s+1),l=f=>Ee.left+(f-s)*i,h=f=>Ee.top+r-(f-e)/Math.max(1e-9,n-e)*r,d=eo(n-e).map(f=>Math.round((f+e)*100)/100).map(f=>`<line class="grid" x1="${Ee.left}" x2="${Us-Ee.right}" y1="${E(h(f))}" y2="${E(h(f))}"/><text x="${Ee.left-4}" y="${E(h(f)+3)}" text-anchor="end">${f}</text>`).join(""),u=a-s>12?5:1,m=Array.from({length:a-s+1},(f,p)=>s+p).filter(f=>f%u===0).map(f=>`<text x="${E(l(f)+i/2)}" y="${Bo-6}" text-anchor="middle">${f}</text>`).join("");return{slot:i,x:l,y:h,left:Ee.left,right:Us-Ee.right,top:Ee.top,height:r,levels:f=>f.map(({from:p,to:w,value:g,label:v})=>`<line class="span" x1="${E(l(p))}" x2="${E(l(w)+i)}" y1="${E(h(g))}" y2="${E(h(g))}"/><text class="span" x="${E((l(p)+l(w)+i)/2)}" y="${E(h(g)-5)}" text-anchor="middle">${v}</text>`).join(""),wrap:(f,p)=>`<svg class="years" viewBox="0 0 ${Us} ${Bo}" role="img" aria-label="${f}">${d}${m}${p}</svg>`}}function Zr(t,e){const n=Math.max(e.top??0,...t.map(({value:c})=>c),1),s=Gu(t.map(({year:c})=>c),0,n),{x:a,y:o,slot:r}=s,i=t.map(({year:c,value:d,title:u,chosen:m,partial:f,running:p,colour:w})=>`<rect class="${["bar",m?"chosen":"",p?"running":f?"partial":""].filter(Boolean).join(" ")}" data-year="${c}"${w?` style="--bar:${w}"`:""} x="${E(a(c)+r*.15)}" y="${E(o(d))}" width="${E(r*.7)}" height="${E(o(0)-o(d))}"/><rect class="hit" data-year="${c}" x="${E(a(c))}" y="${s.top}" width="${E(r)}" height="${s.height}"><title>${u}</title></rect>`).join(""),l=(e.references??[]).map(({value:c,label:d})=>`<line class="reference" x1="${s.left}" x2="${s.right}" y1="${E(o(c))}" y2="${E(o(c))}"/><text class="reference" x="${s.right-2}" y="${E(o(c)-3)}" text-anchor="end">${d}</text>`).join(""),h=s.levels(e.spans??[]);return s.wrap(e.label,`${i}${l}${h}`)}const Ty=.75,My=[{value:40,label:"EU limit, 40"},{value:10,label:"WHO guideline, 10"}];function Sy(t,e,n){const s=t.map(({year:a,mean:o,measured:r})=>{const i=a>=e.from&&a<=e.to;if(a===n?.year)return{year:a,value:o,running:!0,chosen:i,title:`${a} so far, to ${rt(n.through)}: ${o.toFixed(1)} µg/m³`};const l=r<Ty,h=l?`, from only ${Math.round(r*100)}% of the year's hours`:"";return{year:a,value:o,partial:l,colour:Di(o).background,chosen:i,title:`${a}: ${o.toFixed(1)} µg/m³${h}`}});return Zr(s,{label:"Mean NO2 of each year, µg/m³",top:Sa,references:My})}const lh={all:"every day of the week",workdays:"Monday to Friday",weekends:"Saturdays and Sundays"};function Ay(){const t=Array.from({length:Sa/5+1},(n,s)=>Di(s*5).background),e=[0,20,40,60,Sa].map(n=>`<span>${n===Sa?`${n}+`:n}</span>`).join("");return`<div class="scale" aria-hidden="true"><div class="ramp" style="background:linear-gradient(to right,${t.join(",")})"></div><div class="ticks">${e}</div><div class="ticks words"><span>clean</span><span>EU limit</span><span>twice it</span></div></div>`}function _u(t,e){const n=Object.keys(t.years).map(Number),s=Math.max(e.from,Math.min(...n)),a=Math.min(e.to,Math.max(...n)),{soFar:o}=t,r=o&&o.year>=s&&o.year<=a?`, ${o.year} to ${rt(o.through)}`:"",i=`${s===a?String(s):`${s}–${a}`}${r}`;return`<figure class="no2"><figcaption><strong>${t.name}</strong> · ${t.kind}, ${t.area} · mean NO2 in µg/m³ by hour of the day and month of the year · ${lh[e.days]}, ${i}</figcaption>`+xy(Ri(t,e))+Ay()+`<h4>The mean of each year, ${lh[e.days]}</h4>`+Sy(Bi(t,e.days),{from:s,to:a},o)+"</figure>"}function Qn(t){const e=Object.keys(t.years).map(Number);return{from:Math.min(...e),to:Math.max(...e),days:"all"}}const Ey=[["all","every day"],["workdays","Monday to Friday"],["weekends","Saturday and Sunday"]];function Oy(t){const e=new Map,n=Pi("/data/no2/running.json"),s=Fi(t,"/data/no2/index.json","/data/no2/running.json"),a=y("div");a.append(...t.querySelectorAll("figure"));let o=null,r={from:0,to:9999,days:"all"},i=null,l=!1;const h=(b,k=String(b))=>y("option",{value:b},k),c=y("select",{onchange:()=>{g(c.value)}},...ce.map(({code:b,name:k})=>h(b,k))),d=y("select",{onchange:()=>w({days:d.value})},...Ey.map(([b,k])=>h(b,k))),u=y("select",{onchange:()=>w({from:Number(u.value),to:Math.max(Number(u.value),r.to)})}),m=y("select",{onchange:()=>w({to:Number(m.value),from:Math.min(Number(m.value),r.from)})}),f=y("button",{type:"button",onclick:()=>o&&w(Qn(o))},"every year");function p(){o&&(a.innerHTML=_u(o,r),u.value=String(r.from),m.value=String(r.to),d.value=r.days)}function w(b){r={...r,...b},p()}async function g(b){const k=e.get(b)??fetch(`/data/no2/${b}.json`).then(x=>x.json());e.set(b,k);try{const[x,T]=await Promise.all([k,n]);if(l||c.value!==b)return;const $=it(x,T,`${b}.json`),O=Qn($),L=i!==null||o!==null&&(r.from!==Qn(o).from||r.to!==Qn(o).to);i&&(r=i),i=null;const F=Object.keys($.years).map(Number).filter(S=>S>=r.from&&S<=r.to),N=L&&F.length>0?{from:Math.min(...F),to:Math.max(...F)}:O;o=$,r={...N,days:r.days};const j=Object.keys($.years);u.replaceChildren(...j.map(S=>h(S))),m.replaceChildren(...j.map(S=>h(S))),p()}catch{e.delete(b),a.replaceChildren(y("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}t.addEventListener(zt,b=>{const{station:k,from:x,to:T,days:$}=b.detail;i={from:Number(x),to:Number(T),days:$},c.value=String(k),d.value=i.days,g(c.value)}),a.addEventListener("click",b=>{const k=b.target?.closest("[data-year]")?.getAttribute("data-year");k&&w({from:Number(k),to:Number(k)})});const v=y("div",{class:"row"},y("label",{},"Station ",c),y("label",{},"Days ",d),y("label",{},"Years ",u," to ",m),f);return t.replaceChildren(v,a,s),g(c.value),()=>{l=!0}}const vs=["winter","spring","summer","autumn"],Iy=["winter","winter","spring","spring","spring","summer","summer","summer","autumn","autumn","autumn","winter"];function ks(t){return Iy[((Math.round(t)-1)%12+12)%12]??"winter"}const Wi={kind:"choice",choices:[{value:"all",label:"every day"},{value:"workdays",label:"Monday to Friday"},{value:"weekends",label:"Saturday and Sunday"}]},Hi={kind:"choice",choices:[...ce.map(t=>({value:t.code,label:t.name})),{value:"all",label:"every measuring point"}]};class ro extends Error{constructor(e){super(`waiting for ${e}`),this.path=e}path}function qi(t,e){try{return t(e)}catch(n){if(n instanceof ro)throw n;return null}}const hh="/data/no2/running.json";function zi(t,e){const n=e==="all"?ce.map(l=>l.code):[e];if(!ce.some(l=>l.code===n[0]))throw new Error(`station: there is no measuring point ${e}`);const s=qi(t,hh),a=s===null?null:xt(()=>s,hh),o=n.map(l=>it(JSON.parse(t(`/data/no2/${l}.json`)),a,`${l}.json`)),r=JSON.parse(t("/data/no2/index.json")),i=a&&a.refreshed>r.refreshed?a.refreshed:r.refreshed;return{stations:o,credit:{said:r.attribution,refreshed:i}}}const Cy={name:"no2-hours",title:"NO2 by hour",role:"source",shelf:"Air",summary:"A measuring point's mean NO2 at each hour of the day, in each month, over the years asked for — together, or each year apart: the shape of a working day.",inputs:[{name:"station",label:"measuring point",type:"text",initial:ce[0]?.code??"08019004",editor:Hi},{name:"from",label:"from",type:"number",optional:!0,editor:{kind:"number",min:1991,max:2100,step:1}},{name:"to",label:"to",type:"number",optional:!0,editor:{kind:"number",min:1991,max:2100,step:1}},{name:"days",label:"days",type:"text",initial:"all",editor:Wi},{name:"years",label:"the years",type:"text",initial:"together",editor:{kind:"choice",choices:[{value:"together",label:"all together"},{value:"each",label:"each apart"}]}}],outputs:[{name:"table",label:"table",type:"table"}],run:(t,{read:e})=>{const n=String(t.station);if(n==="all")throw new Error("measuring point: the hours are of one measuring point at a time");const{stations:s,credit:a}=zi(e,n),o=s[0];if(!o)throw new Error(`station: there is no measuring point ${n}`);const r=Object.keys(o.years).map(Number),i=t.from===void 0?Math.min(...r):Number(t.from),l=t.to===void 0?Math.max(...r):Number(t.to),h=String(t.days),c=t.years==="each",u=(c?r.filter(p=>p>=i&&p<=l).sort((p,w)=>p-w).map(p=>[p,p]):[[i,l]]).flatMap(([p,w])=>Ri(o,{from:p,to:w,days:h}).flatMap((g,v)=>g.map((b,k)=>({cell:b,month:k,hour:v}))).filter(({cell:g})=>g.mean!==null).sort((g,v)=>g.month-v.month||g.hour-v.hour).map(({cell:g,month:v,hour:b})=>({...c&&{year:p},month:v+1,season:ks(v+1),hour:b+1,no2:g.mean,hours:g.count})));return{outputs:{table:{columns:[...c?[{name:"year",kind:"number",key:!0}]:[],{name:"month",kind:"number",key:!0},{name:"season",kind:"text",key:!0,about:"winter is December to February, as meteorologists count it",order:vs},{name:"hour",kind:"number",key:!0,about:"the network's hour, 1 to 24; it does not say by which clock"},{name:"no2",kind:"number",unit:"µg/m³",about:c?"the mean of that hour, that month, that year":`the mean, ${i} to ${l}`},{name:"hours",kind:"number",about:"the hours the mean is of"}],rows:u,credits:[a]}},said:`${o.name}, ${i}–${l}`,settled:{from:i,to:l}}}},jy=(t,e)=>new Date(Date.UTC(t,e+1,0)).getUTCDate()*24,Ro=t=>(t??[]).reduce((e,n)=>e+n,0),Ny={name:"no2-months",title:"NO2 by month",role:"source",shelf:"Air",summary:"A measuring point of the Generalitat month by month: the mean NO2 of the month's hours, and how much of the month was measured.",inputs:[{name:"station",label:"measuring point",type:"text",initial:ce[0]?.code??"08019004",editor:Hi},{name:"days",label:"days",type:"text",initial:"all",editor:Wi}],outputs:[{name:"table",label:"table",type:"table"}],run:(t,{read:e})=>{const n=String(t.station),s=String(t.days),{stations:a,credit:o}=zi(e,n),r=a.flatMap(l=>Object.entries(l.years).flatMap(([h,c])=>Array.from({length:12},(d,u)=>{const m=gs(c,s),f=m.reduce((g,v)=>g+Ro(v.counts[u]),0);if(f===0)return null;const p=m.reduce((g,v)=>g+Ro(v.sums[u]),0),w=gs(c,"all").reduce((g,v)=>g+Ro(v.counts[u]),0);return{...n==="all"&&{station:l.code},year:Number(h),month:u+1,season:ks(u+1),no2:p/f,hours:f,measured:w/jy(Number(h),u)}}).filter(d=>d!==null)));return{outputs:{table:{columns:[...n==="all"?[{name:"station",kind:"text",key:!0}]:[],{name:"year",kind:"number",key:!0},{name:"month",kind:"number",key:!0},{name:"season",kind:"text",key:!0,about:"winter is December to February, as meteorologists count it",order:vs},{name:"no2",kind:"number",unit:"µg/m³",about:"the mean of the month's hours"},{name:"hours",kind:"number",about:"the hours the mean is of"},{name:"measured",kind:"number",about:"the share of the month's hours measured, 0 to 1"}],rows:r,credits:[o]}}}}},Ly={name:"no2-stations",title:"Measuring points",role:"source",shelf:"Air",summary:"The NO2 measuring points themselves: their code, name, and what the network says each measures — traffic, or the background — and where.",inputs:[],outputs:[{name:"table",label:"table",type:"table"}],run:()=>({outputs:{table:{columns:[{name:"station",kind:"text",key:!0},{name:"name",kind:"text"},{name:"kind",kind:"text",about:"traffic, or the background away from it"},{name:"area",kind:"text"}],rows:ce.map(e=>({station:e.code,name:e.name,kind:e.kind,area:e.area}))}}})},Py={name:"no2-years",title:"NO2 by year",role:"source",shelf:"Air",summary:"A measuring point year by year: the mean NO2 of every hour measured, and the share of the year that was.",inputs:[{name:"station",label:"measuring point",type:"text",initial:ce[0]?.code??"08019004",editor:Hi},{name:"days",label:"days",type:"text",initial:"all",editor:Wi}],outputs:[{name:"table",label:"table",type:"table"}],run:(t,{read:e})=>{const n=String(t.station),{stations:s,credit:a}=zi(e,n),o=s.flatMap(i=>Bi(i,String(t.days)).map(({year:l,mean:h,measured:c})=>({...n==="all"&&{station:i.code},year:l,no2:h,measured:c,whole:i.soFar?.year===l?"no":"yes"})));return{outputs:{table:{columns:[...n==="all"?[{name:"station",kind:"text",key:!0}]:[],{name:"year",kind:"number",key:!0},{name:"no2",kind:"number",unit:"µg/m³",about:"the mean of every hour measured"},{name:"measured",kind:"number",about:"the share of the year's hours measured, 0 to 1"},{name:"whole",kind:"text",about:"no for the year still running"}],rows:o,credits:[a]}}}}},Fy=[Ny,Py,Cy,Ly],By="https://analisi.transparenciacatalunya.cat/resource";function Uu(t,e){const n=new URL(`${By}/${t}.json`);for(const[s,a]of Object.entries(e))a!==void 0&&n.searchParams.set(`$${s}`,String(a));return n.toString()}const ch="tasf-thgu",Yu=Array.from({length:24},(t,e)=>String(e+1).padStart(2,"0")),Ry=0,Dy=6,Ys=()=>Array.from({length:12},()=>new Array(24).fill(0)),Wy=()=>({workdays:{sums:Ys(),counts:Ys()},weekends:{sums:Ys(),counts:Ys()}});function dh(t){if(!Array.isArray(t))throw new Error("the portal did not answer with rows");if(t.length===0)throw new Error("the portal answered with no rows");return t}function Hy(t,e){const n=Number(e.month)-1;Yu.forEach((s,a)=>{const o=t.sums[n],r=t.counts[n];if(!o||!r)throw new Error(`month ${e.month} is not a month`);o[a]=(o[a]??0)+Number(e[`s${s}`]??0),r[a]=(r[a]??0)+Number(e[`n${s}`]??0)})}function uh(t,e,n){if(n.some(a=>Number(a.days)>5))throw new Error("some days are in the portal twice");const s=new Map;for(const a of n){const o=a.codi_eoi??"",r=s.get(o)??Wy();s.set(o,r);const i=Number(a.dow);Hy(i===Ry||i===Dy?r.weekends:r.workdays,a)}return Object.fromEntries(ce.map(a=>{const o=`${a.code}.json`,r=s.get(a.code),i={...t[o]?.years,...r?{[e]:r}:{}};return[o,{...a,years:i}]}))}const qy={name:"no2",directory:"public/data/no2",firstYear:1991,files:ce.map(t=>`${t.code}.json`),about:{measures:"NO2, hourly, µg/m³",network:"Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica",attribution:"Generalitat de Catalunya, Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica. Dades obertes.",dataset:`https://analisi.transparenciacatalunya.cat/d/${ch}`,stations:ce},requestsFor(t){const e=ce.map(s=>`'${s.code}'`).join(","),n=Yu.map(s=>`sum(h${s}) as s${s}, count(h${s}) as n${s}`).join(", ");return[Uu(ch,{select:`codi_eoi, date_extract_m(data) as month, date_extract_dow(data) as dow, count(*) as days, max(data) as last, ${n}`,where:`contaminant='NO2' and codi_eoi in (${e}) and data between '${t}-01-01T00:00:00' and '${t}-12-31T23:59:59'`,group:"codi_eoi,month,dow",limit:5e3})]},withYear(t,e,n){const s=dh(n[0]);if(!s.some(a=>a.month==="12"))throw new Error("the year does not reach December yet");return uh(t,e,s)},soFar(t,e){const n=dh(e[0]),s=n.reduce((a,o)=>(o.last??"")>a?o.last??"":a,"").slice(0,10);return{files:uh({},t,n),through:s}}};function io(t,e){const n=new RegExp(`^(\`\`\`)?::${e}(\\s+--[a-z0-9-]+)*$`);return t.pages.find(s=>s.body.split(`
`).some(a=>n.test(a.trim())))}const Do="all",mh=["all","workdays","weekends"],fh=t=>`${t.slice(0,-1).join(", ")} or ${t.at(-1)}`,zy=t=>typeof t=="number"?t:typeof t=="string"&&t.trim()!==""?Number(t):Number.NaN;function Js(t,e,n,s=-1/0,a=1/0){if(e===void 0)return{};const o=zy(e);return Number.isInteger(o)&&o>=s&&o<=a?{value:o}:{refused:`${t}: ${String(e)} is not ${n}`}}function Gy(t){const e=ce.map(({code:i})=>i),n=String(t.station??e[0]);if(n!==Do&&!e.includes(n))return{refused:`station: ${n} is not one of ${fh([...e,Do])}`};const s=String(t.days??"all");if(!mh.includes(s))return{refused:`days: ${s} is not one of ${fh(mh)}`};const a={from:Js("from",t.from,"a year"),to:Js("to",t.to,"a year"),month:Js("month",t.month,"a month from 1 to 12",1,12),hour:Js("hour",t.hour,"an hour from 1 to 24",1,24)},o=Object.values(a).find(i=>"refused"in i);if(o)return o;const r=Object.fromEntries(Object.entries(a).flatMap(([i,l])=>"value"in l&&l.value!==void 0?[[i,l.value]]:[]));return{codes:n===Do?e:[n],days:s,...r}}const ph="no2",_y=["January","February","March","April","May","June","July","August","September","October","November","December"],Qr={all:"every day of the week",workdays:"Monday to Friday",weekends:"Saturdays and Sundays"},fn=t=>Math.round(t*10)/10,Uy=t=>String(t).padStart(2,"0"),Wo=({month:t,hour:e,meanMicrogramsPerM3:n})=>`hour ${Uy(e)} of ${_y[t-1]}: ${n} µg/m³`,Yy=t=>t("/data/no2/running.json").then(e=>xt(()=>e,""),()=>null);async function Jy(t,e,n){return(await Promise.allSettled(t.map(a=>e(`/data/no2/${a}.json`).then(o=>it(JSON.parse(o),n,`${a}.json`))))).flatMap(a=>a.status==="fulfilled"?[a.value]:[])}function Ju(t,e){return Bi(t,e).map(({year:n,mean:s,measured:a})=>({year:n,meanMicrogramsPerM3:fn(s),measuredShare:Math.round(a*100)/100,...n===t.soFar?.year&&{soFarThrough:t.soFar.through}}))}function Ky(t){return t.flatMap((e,n)=>e.flatMap((s,a)=>s.mean===null?[]:[{month:a+1,hour:n+1,meanMicrogramsPerM3:fn(s.mean),measurements:s.count}]))}function Vy(t,e){const n=Object.keys(t.years).map(Number),s=Math.max(e.from??-1/0,Math.min(...n)),a=Math.min(e.to??1/0,Math.max(...n)),o=Ri(t,{from:s,to:a,days:e.days}),r=Ky(o),i=r.reduce((m,f)=>m+f.measurements,0),l=i?fn(o.flat().reduce((m,f)=>m+(f.mean??0)*f.count,0)/i):null,h=[...r].sort((m,f)=>f.meanMicrogramsPerM3-m.meanMicrogramsPerM3),{month:c,hour:d}=e,u=c!==void 0&&d!==void 0?{cell:r.find(m=>m.month===c&&m.hour===d)??null}:c!==void 0?{byHour:o.map(m=>m[c-1]?.mean===null?null:fn(m[c-1].mean))}:d!==void 0?{byMonth:(o[d-1]??[]).map(m=>m.mean===null?null:fn(m.mean))}:{byHourAndMonth:o.map(m=>m.map(f=>f.mean===null?null:fn(f.mean)))};return{station:{code:t.code,name:t.name,kind:t.kind,area:t.area},days:Qr[e.days],from:s,to:a,meanMicrogramsPerM3:l,...h[0]&&{highest:h[0],lowest:h.at(-1)},...u,annualMeans:Ju(t,e.days).filter(({year:m})=>m>=s&&m<=a)}}function Xy(t,e){const{station:n,days:s,from:a,to:o,meanMicrogramsPerM3:r,highest:i,lowest:l,annualMeans:h}=t,c=`${a===o?a:`${a}–${o}`}${e&&e.year>=a&&e.year<=o?`, ${e.year} to ${rt(e.through)}`:""}`,d="cell"in t&&t.cell?` In ${Wo(t.cell)}.`:"",u=i&&l?`; highest in ${Wo(i)}, lowest in ${Wo(l)}`:"",m=h.filter(({soFarThrough:w})=>!w).at(-1),f=h.find(({soFarThrough:w})=>w),p=`${m?` ${m.year}: ${m.meanMicrogramsPerM3} µg/m³.`:""}${f?` ${f.year} so far, to ${rt(f.soFarThrough)}: ${f.meanMicrogramsPerM3} µg/m³.`:""}`;return`${n.name}, ${s}, ${c}: ${r??"nothing measured"}${r===null?"":" µg/m³ on average"}${u}.${d}${p}`}const Zy={name:"no2",description:"Hourly NO2 at eleven measuring points of the Generalitat de Catalunya, from 1991, added up by hour of the day and month of the year: for a station, the mean of the years and days asked for, hour by month, where it is highest and lowest, and the mean of every year, the year still running so far; for all, the stations side by side. The EU's annual limit is 40 µg/m³; the WHO's guideline, since 2021, is 10.",inputSchema:{type:"object",properties:{station:{type:"string",enum:[...ce.map(({code:t})=>t),"all"],default:ce[0]?.code,description:`${ce.map(({code:t,name:e,kind:n})=>`${t} ${e}, ${n}`).join("; ")}; or all of them`},days:{type:"string",enum:["all","workdays","weekends"],default:"all",description:"every day, Monday to Friday, or Saturdays and Sundays"},from:{type:"integer",description:"the first year; the station's first when left out"},to:{type:"integer",description:"the last year; the station's last, the year still running among them, when left out"},month:{type:"integer",minimum:1,maximum:12,description:"one month of the table, January being 1"},hour:{type:"integer",minimum:1,maximum:24,description:"one hour of the table, numbered 1 to 24 as the network numbers them, without saying by which clock"}},required:[],additionalProperties:!1},readOnly:!0,shows:!0,async answer(t,{site:e,read:n}){const s=Gy(t);if("refused"in s)return s;const a=JSON.parse(await n("/data/no2/index.json")),o=await Yy(n),r=await Jy(s.codes,n,o);if(r.length===0)return{refused:"the measurements did not arrive; ask again"};const i=io(e,ph)?.route,l={source:a.attribution,refreshed:o&&r.some(m=>m.soFar)?o.refreshed:a.refreshed,...i!==void 0&&{route:i}};if(s.codes.length===1){const[m]=r,f=Vy(m,s);return{summary:Xy(f,m.soFar),data:f,...l,show:{app:ph,values:{station:m.code,from:f.from,to:f.to,days:s.days}}}}const h=r.map(m=>{const f=Ju(m,s.days);return{station:m,means:f,finished:f.filter(({soFarThrough:p})=>!p)}}),c=Math.max(...h.flatMap(({finished:m})=>m.map(({year:f})=>f))),d=h.map(({station:m,means:f,finished:p})=>({code:m.code,name:m.name,kind:m.kind,area:m.area,year:c,meanMicrogramsPerM3:p.find(w=>w.year===c)?.meanMicrogramsPerM3??null,soFar:f.find(({soFarThrough:w})=>w)??null})).sort((m,f)=>(f.meanMicrogramsPerM3??-1)-(m.meanMicrogramsPerM3??-1)),u=d.map(({name:m,meanMicrogramsPerM3:f})=>`${m} ${f===null?"not measured":`${f} µg/m³`}`).join("; ");return{summary:`The mean of ${c}, ${Qr[s.days]}: ${u}.`,data:{days:Qr[s.days],stations:d},...l}}},Qy=t=>{const e=`${ce[0]?.code}.json`,n=xt(t,"/data/no2/running.json"),s=it(JSON.parse(t(`/data/no2/${e}`)),n,e),a=JSON.parse(t("/data/no2/index.json"));return _u(s,Qn(s))+oo(a,n)},eb={name:"air-quality",apps:{no2:Oy},stills:{no2:Qy},sources:[qy],tools:[Zy],nodes:Fy},tb={TM:/href="(https:\/\/[^"]+\/Barcelona_TM_m_[^"/]+\.txt)"/,PPT:/href="(https:\/\/[^"]+\/Barcelona_PPT_m_[^"/]+\.txt)"/},nb={TM:"temperatures",PPT:"rain"};function sb(t,e){const n=tb[e].exec(t)?.[1];if(!n)throw new Error(`the Meteocat's page no longer links to the series of ${nb[e]}`);return n}const ab=-99;function ob(t){const e=t.split(/\r?\n/),n=e.findIndex(a=>a.startsWith("ANY	"));if(n<0)throw new Error("the answer is not the series: it names no columns");const s=new Map;for(const a of e.slice(n+1)){if(a.trim()==="")continue;const[o,...r]=a.trim().split("	"),i=Number(o);if(!Number.isInteger(i))throw new Error(`the series has a row that is not a year: ${o}`);if(r.length!==12)throw new Error(`${i} has ${r.length} months, not 12`);if(s.has(i))throw new Error(`the series has ${i} twice`);s.set(i,r.map(l=>{const h=Number(l);return Number.isFinite(h)&&h>ab?h:null}))}return s}const gh="https://www.meteo.cat/wpweb/climatologia/dades-i-productes-climatics/serie-climatica-de-barcelona-des-de-1780/";function Ku({name:t,file:e,kept:n,firstYear:s,measures:a,attribution:o}){return{name:t,directory:`public/data/${t}`,firstYear:s,answers:"text",files:[n],about:{measures:a,series:"Barcelona, placed by the Meteocat at the Observatori Fabra: 41.41864 N, 2.12379 E, 411 m",attribution:o,dataset:gh},requestsFor:()=>[gh],follow:r=>sb(r,e),withYear(r,i,l){const h=ob(String(l[0])).get(i);if(!h)throw new Error(`the series does not reach ${i} yet`);return{[n]:{years:{...r[n]?.years,[i]:h}}}}}}const rb=Ku({name:"barcelona-rain",file:"PPT",kept:"rain.json",firstYear:1786,measures:"the rain of every month, since 1786",attribution:"Servei Meteorològic de Catalunya: the series of rain of Barcelona since 1786 (Prohom, Barriendos and Sanchez-Lorenzo, 2015)."}),ib=Ku({name:"barcelona-series",file:"TM",kept:"temperature.json",firstYear:1780,measures:"the mean temperature of every month, since 1780",attribution:"Servei Meteorològic de Catalunya: the climate series of Barcelona since 1780 (Prohom, Barriendos, Aguilar and Ripoll, 2012)."}),wh={temperature:"/data/barcelona-series/temperature.json",rain:"/data/barcelona-rain/rain.json"};function qa(t,e){const n=JSON.parse(t(wh[e])),s=JSON.parse(t(wh[e].replace(/[^/]+$/,"index.json")));return{series:n,credit:{said:s.attribution,refreshed:s.refreshed}}}const lb={name:"barcelona-months",title:"Barcelona since 1780, by month",role:"source",shelf:"Barcelona",summary:"Barcelona month by month, from the Meteocat's long series: the mean temperature since 1780 and the rain since 1786, each month in its season.",inputs:[],outputs:[{name:"table",label:"table",type:"table"}],run:(t,{read:e})=>{const n=qa(e,"temperature"),s=qa(e,"rain"),o=[...new Set([...Object.keys(n.series.years),...Object.keys(s.series.years)])].map(Number).sort((i,l)=>i-l).flatMap(i=>Array.from({length:12},(l,h)=>{const c=n.series.years[i]?.[h]??null,d=s.series.years[i]?.[h]??null;return c===null&&d===null?[]:[{year:i,month:h+1,season:ks(h+1),mean:c,rain:d}]}).flat());return{outputs:{table:{columns:[{name:"year",kind:"number",key:!0},{name:"month",kind:"number",key:!0},{name:"season",kind:"text",key:!0,about:"winter is December to February, as meteorologists count it",order:vs},{name:"mean",kind:"number",unit:"°C",about:"the month's mean temperature, since 1780"},{name:"rain",kind:"number",unit:"mm",about:"the month's rain, since 1786"}],rows:o,credits:[n.credit,s.credit]}}}}},hb=t=>Math.round(t*10)/10,cb={name:"barcelona-rain",title:"Barcelona's rain since 1786",role:"source",shelf:"Barcelona",summary:"Barcelona's rain year by year since 1786, from the Meteocat's long series: the total of each year's twelve months.",inputs:[],outputs:[{name:"table",label:"table",type:"table"}],run:(t,{read:e})=>{const{series:n,credit:s}=qa(e,"rain"),a=Object.entries(n.years).map(([r,i])=>{const l=i.filter(c=>c!==null),h=l.length===12;return{year:Number(r),rain:h?hb(l.reduce((c,d)=>c+d,0)):null,whole:h?"yes":"no"}});return{outputs:{table:{columns:[{name:"year",kind:"number",key:!0},{name:"rain",kind:"number",unit:"mm",about:"the rain of the year's twelve months; none for a year that misses a month"},{name:"whole",kind:"text",about:"yes when every month of the year has its rain"}],rows:a,credits:[s]}}}}},db=t=>Math.round(t*100)/100,ub={name:"barcelona-years",title:"Barcelona since 1780",role:"source",shelf:"Barcelona",summary:"Barcelona's mean temperature year by year since 1780, from the Meteocat's long series: the mean of each year's twelve months.",inputs:[],outputs:[{name:"table",label:"table",type:"table"}],run:(t,{read:e})=>{const{series:n,credit:s}=qa(e,"temperature"),a=Object.entries(n.years).map(([r,i])=>{const l=i.filter(c=>c!==null),h=l.length===12;return{year:Number(r),mean:h?db(l.reduce((c,d)=>c+d,0)/12):null,whole:h?"yes":"no"}});return{outputs:{table:{columns:[{name:"year",kind:"number",key:!0},{name:"mean",kind:"number",unit:"°C",about:"the mean of the year's twelve monthly means; none for a year that misses a month"},{name:"whole",kind:"text",about:"yes when every month of the year has its mean"}],rows:a,credits:[s]}}}}},mb=[ub,cb,lb],fb={name:"barcelona-series",sources:[ib,rb],nodes:mb},pb=9,yh=8,be={days:5,hoursADay:yh,dayNames:["Mon","Tue","Wed","Thu","Fri"],hourNames:Array.from({length:yh},(t,e)=>`${pb+e}:00`)},Fn=t=>Math.max(0,Math.min(100,t));function bh(t){const{focus:e,fatigue:n,featureSize:s,weeks:a,calendar:o,meetingTypes:r}=t,i=[];let l=0,h=0;for(let c=0;c<a;c+=1)for(let d=0;d<be.days;d+=1){let u=0,m=0;for(let f=0;f<be.hoursADay;f+=1){const p=r[o[`${d}-${f}`]??""];if(p){u=Fn(u+p.focus),m=Fn(m+p.fatigue),i.push({week:c,day:d,hour:f,inMeeting:!0,hourFocus:u,hourFatigue:m,hourProductivity:0,accumulatedProductivity:l,completedFeatures:h,featureCompleted:!1});continue}u=Fn(u+e),m=Fn(m+n);const w=Fn(u-m),g=s-l,v=w>g,b=v?g:w;v?(h+=1,l=0):l+=b,i.push({week:c,day:d,hour:f,inMeeting:!1,hourFocus:u,hourFatigue:m,hourProductivity:b,accumulatedProductivity:l,completedFeatures:h,featureCompleted:v}),v&&(u=0)}}return i}function Ks(){return Array.from({length:be.hoursADay},()=>new Array(be.days).fill(0))}function Vs(t,{hour:e,day:n},s){const a=t[e];a&&(a[n]=(a[n]??0)+s)}function vh(t,{featureSize:e,weeks:n}){const s=t[t.length-1],a=s?.completedFeatures??0,o=s?.accumulatedProductivity??0,r=a+Math.round(10*o/e)/10,i=a*e+o,l=Array.from({length:be.days},()=>({productivity:0,features:0,meetings:0})),h={focus:Ks(),fatigue:Ks(),productivity:Ks(),features:Ks()};for(const d of t){const u=l[d.day];u.productivity+=d.hourProductivity,d.featureCompleted&&(u.features+=1),d.inMeeting&&(u.meetings+=1),Vs(h.focus,d,d.hourFocus),Vs(h.fatigue,d,d.hourFatigue),Vs(h.productivity,d,d.hourProductivity),d.featureCompleted&&Vs(h.features,d,1)}const c=d=>d.map(u=>u.map(m=>n>0?m/n:0));return{totalFeatures:r,totalProductivity:i,averageFeaturesPerWeek:n>0?r/n:0,averageProductivityPerWeek:n>0?i/n:0,days:l,hours:{focus:c(h.focus),fatigue:c(h.fatigue),productivity:c(h.productivity),features:h.features}}}const Gi={width:480,height:240,pad:{top:10,right:10,bottom:34,left:36}},{width:kh,height:Ho,pad:Oe}=Gi;function Vu(t,e,n,s){const a=kh-Oe.left-Oe.right,o=Ho-Oe.top-Oe.bottom,r=h=>Oe.top+o-(t>0?h/t*o:0),i=s.map(h=>`<line class="grid" x1="${Oe.left}" x2="${kh-Oe.right}" y1="${r(h)}" y2="${r(h)}"/><text x="${Oe.left-4}" y="${r(h)+3}" text-anchor="end">${h}</text>`).join(""),l=(n>1?[1,Math.ceil(n/2),n]:[]).filter((h,c,d)=>d.indexOf(h)===c).map(h=>`<text x="${Oe.left+(h-1)/Math.max(1,n-1)*a}" y="${Ho-Oe.bottom+14}" text-anchor="middle">${h}</text>`).join("");return`${i}${l}<text x="${Oe.left+a/2}" y="${Ho-6}" text-anchor="middle">${e.x}</text><text transform="translate(9 ${Oe.top+o/2}) rotate(-90)" text-anchor="middle">${e.y}</text>`}const{width:$h,height:Bn,pad:$e}=Gi;function Xu(t,e,n){const s=Math.max(...t.map(f=>f.values.length),1),a=Math.max(1,...t.flatMap(f=>f.values)),o=$h-$e.left-$e.right,r=Bn-$e.top-$e.bottom,i=o/s,l=i*.7/t.length,h=f=>$e.top+r-f/a*r,c=t.map((f,p)=>f.values.map((w,g)=>{const v=$e.left+g*i+i*.15+p*l;return`<rect class="${f.className}" x="${v.toFixed(1)}" y="${h(w).toFixed(1)}" width="${l.toFixed(1)}" height="${($e.top+r-h(w)).toFixed(1)}"><title>${f.name}: ${Math.round(w*10)/10}</title></rect>`}).join("")).join(""),d=(n??[]).map((f,p)=>`<text x="${$e.left+p*i+i/2}" y="${Bn-$e.bottom+14}" text-anchor="middle">${f}</text>`).join(""),u=t.map((f,p)=>`<rect class="${f.className}" x="${$e.left+p*90}" y="${Bn-$e.bottom+20}" width="10" height="3"/><text x="${$e.left+p*90+14}" y="${Bn-$e.bottom+24}">${f.name}</text>`).join(""),m=Vu(a,e,n?0:s,eo(a));return`<svg viewBox="0 0 ${$h} ${Bn}" role="img" aria-label="${e.y} by ${e.x}">${m}${c}${d}${u}</svg>`}const xh={sizeAt(t){return t<=500?t:t<=750?500+(t-500)*2:t<1e3?1e3+(t-750)*35:1e4},positionOf(t){return t<=500?t:t<=1e3?500+(t-500)/2:t<1e4?750+(t-1e3)/35:1e3}};function Xs(t,e){const n=e.flat(),s=Math.min(...n),a=Math.max(...n),o=y("div",{class:"week"},y("span"),...be.dayNames.map(r=>y("span",{class:"head"},r)));return e.forEach((r,i)=>{o.append(y("span",{class:"hour"},be.hourNames[i]??""));for(const l of r){const h=a>s?(l-s)/(a-s):0;o.append(y("span",{class:"cell",style:`--heat:${(.1+h*.9).toFixed(2)}`},String(Math.round(l))))}}),y("div",{},y("h4",{},t),o)}function gb(t){const e={focus:25,fatigue:15,featureSize:300,weeks:8},n={"🍽️ Lunch":{focus:-100,fatigue:-100},"🏃 Sprint plan":{focus:-100,fatigue:50},"😴 Boring":{focus:-50,fatigue:-25}},s={};for(let N=0;N<be.days;N+=1)s[`${N}-3`]="🍽️ Lunch";let a="🏃 Sprint plan",o=null;const r=y("div",{class:"figures"}),i=y("div",{class:"chart"}),l=y("div",{class:"maps"}),h=y("div",{class:"week"}),c=y("select"),d=y("input",{type:"number",min:-100,max:100}),u=y("input",{type:"number",min:-100,max:100}),m=y("input",{type:"text",placeholder:"New meeting name",size:16}),f=(N,j,S,A,I=C=>C,D=C=>C)=>{const C=y("output",{},String(e[N])),B=y("input",{type:"range",min:S,max:A,value:D(e[N]),oninput:()=>{e[N]=I(Number(B.value)),C.textContent=String(e[N]),F()}});return y("label",{},`${j}: `,C,B)},p=y("div",{class:"dials"},f("focus","Focus an hour",0,100),f("fatigue","Fatigue an hour",0,100),f("featureSize","Feature size",0,1e3,xh.sizeAt,xh.positionOf),f("weeks","Weeks",1,16));function w(){c.replaceChildren(...Object.keys(n).map(j=>y("option",{value:j,selected:j===a},j)));const N=n[a];d.value=String(N?.focus??0),u.value=String(N?.fatigue??0)}c.addEventListener("change",()=>{a=c.value,w()});const g=()=>{n[a]={focus:Number(d.value)||0,fatigue:Number(u.value)||0},F()};d.addEventListener("change",g),u.addEventListener("change",g);const v=()=>{const N=m.value.trim();!N||n[N]||(n[N]={focus:0,fatigue:0},a=N,m.value="",w())},b=y("div",{class:"row"},y("span",{},"Paint: "),c,y("span",{},"focus "),d,y("span",{},"fatigue "),u,m,y("button",{type:"button",onclick:v},"Add"));let k=null;const x=N=>{if(k==="add"&&!s[N])s[N]=a;else if(k==="remove"&&s[N])delete s[N];else return;F()};function T(){h.replaceChildren(y("span"),...be.dayNames.map(N=>y("span",{class:"head"},N))),be.hourNames.forEach((N,j)=>{h.append(y("span",{class:"hour"},N));for(let S=0;S<be.days;S+=1){const A=`${S}-${j}`,I=s[A];h.append(y("span",{class:I?"slot meeting":"slot",title:I??"free",onpointerdown:D=>{D.preventDefault(),k=s[A]?"remove":"add",x(A)},onpointerenter:()=>{k&&x(A)}},I?I.slice(0,2):""))}})}window.addEventListener("pointerup",()=>{k=null});const $=y("div",{class:"row"}),O=()=>{o={summary:vh(bh({...e,calendar:s,meetingTypes:n}),e),weeks:e.weeks},F()},L=()=>{o=null,F()};function F(){T();const N=bh({...e,calendar:s,meetingTypes:n}),j=vh(N,e),S=e.weeks*be.days*be.hoursADay;r.replaceChildren(y("div",{class:"clean"},y("strong",{},j.totalFeatures.toFixed(1)),"features finished"),y("div",{},y("strong",{},j.averageFeaturesPerWeek.toFixed(2)),"features a week"),y("div",{},y("strong",{},Math.round(j.totalProductivity/S).toString()),"productivity an hour"),y("div",{},y("strong",{},String(S)),"hours simulated")),$.replaceChildren(o?y("span",{},`Baseline: ${o.summary.averageFeaturesPerWeek.toFixed(2)} features a week over ${o.weeks} weeks; now ${j.averageFeaturesPerWeek.toFixed(2)}. `):y("span",{},"Keep this run to compare against: "),y("button",{type:"button",onclick:O},o?"Save again":"Save as baseline")),o&&$.append(y("button",{type:"button",onclick:L},"Clear")),i.innerHTML=Xu([{name:"Productivity",className:"clean",values:j.days.map(A=>A.productivity/e.weeks)},{name:"Features ×100",className:"debt",values:j.days.map(A=>A.features/e.weeks*100)}],{x:"",y:"A day, on average"},be.dayNames),i.prepend(y("h4",{},"The shape of a week")),l.replaceChildren(Xs("Focus",j.hours.focus),Xs("Fatigue",j.hours.fatigue),Xs("Productivity",j.hours.productivity),Xs("Features finished",j.hours.features))}w(),t.append(p,b,y("div",{class:"charts"},h,i),r,$,l),F()}const wb={name:"developer-meetings",apps:{"developer-meetings":gb}},Rn={exams:[.01,.01,.02,.01,.05,.2,.05,.1,.2,.3,.5,.4,.3,.2,.1,.05,.1,.3,.8,1,.4],labs:[.01,.02,.03,.04,.06,.09,.12,.17,.23,.32,.44,.48,.58,.78,.87,.89,.78,.75,.62,.45,.2]},qo={x:{frames:1,pace:1},normal:{frames:2,pace:1},normal1:{frames:2,pace:1},normal2:{frames:2,pace:1},est:{frames:7,pace:5},zz:{frames:2,pace:5},bt:{frames:6,pace:1},http:{frames:8,pace:2},pract:{frames:5,pace:1},no:{frames:4,pace:3},bar0:{frames:6,pace:1},amig:{frames:4,pace:3},suplica:{frames:2,pace:3}};class Zu{static everyImage=Object.entries(qo).flatMap(([e,{frames:n}])=>Array.from({length:n},(s,a)=>`${e}${a}`));series="x";frame=0;wait=0;after=null;shaking=-1;get image(){return`${this.series}${this.frame}`}play(e){if(this.shaking>=0){this.after=e;return}e!==this.series&&(this.wait=0),this.show(e)}flash(e,n){this.shaking<0&&(this.after=this.series),this.shaking=n,this.show(e)}stop(){this.shaking=-1,this.after=null,this.series="x",this.frame=0}beat(){if(this.shaking===0&&this.after&&this.show(this.after),this.shaking>=0&&(this.shaking-=1),this.wait>0&&(this.wait-=1),this.wait>0)return;const{frames:e,pace:n}=qo[this.series];this.frame=(this.frame+1)%e,this.wait=n}show(e){this.series=e,this.frame%=qo[e].frames}}const Te=3,Lt=16,yb=25,ct=20,Th=22,zo=200,Go=100,_o=100,Mh=30,Sh=-10,bb=.05,vb=.3,Ah=10/Te,Eh={superior:40,tecnica:25},kb={step:0,hour:0,day:0,term:1,doing:"idle",boredom:0,stress:0,labHabit:10,studyHabit:10,chatHabit:10,barHabit:10,friends:10,sleep:0,terminal:0,exams:Array(10).fill(0),labs:Array(10).fill(0),enrolled:4,passed:0,left:9,selection:!0,alfas:Array(6).fill(1),asks:null,suggested:0,ended:null,said:[]},$b=`Sorry, but you no longer belong to this faculty. :(



Normal.`,xb=`Hey, what are you playing at????
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
attention, doesn't it?)`,Tb=`Don't you know that stress is really bad
for your health? Your Fibergochi has had to
leave the faculty, be more careful next time!
See if you can take its mind off things a little,
make new and interesting friends... or not so much...`;class ei{constructor(e,n={}){this.random=e;const s={...kb,...n};this.s={...s,exams:[...s.exams],labs:[...s.labs],alfas:[...s.alfas],said:[...s.said]},this.s.ended===null&&this.show(this.s.doing)}random;s;sprite=new Zu;beats=0;get state(){return{...this.s,exams:[...this.s.exams],labs:[...this.s.labs],alfas:[...this.s.alfas],said:[...this.s.said]}}get picture(){return this.sprite.image}get clock(){const e=this.s.step+this.s.hour*Te,n=e*30%60;return`${this.s.day+1}, ${Math.floor(e/(Te*Lt)*24)}:${n<10?"0":""}${n}h (${this.s.term})`}get examsPending(){return this.studyLeft>0}get labsPending(){return this.labLeft>0}get studyLeft(){return this.taken(this.s.exams).reduce((e,n)=>e+Math.max(n,0),0)}get labLeft(){return this.taken(this.s.labs).reduce((e,n)=>e+Math.max(n,0),0)}get hasTerminal(){return this.s.terminal>0}get lampsLit(){return this.s.day<ct||this.beats%3===1}get enrolment(){return{most:Math.min(10,this.s.left),suggested:this.s.suggested}}get alive(){return this.s.ended===null}get waiting(){return this.s.said.length>0||this.s.asks!==null}step(){!this.alive||this.waiting||(this.keepHabits(),this.studyOrWork(),this.holdTerminal(),this.browseOn(),this.getBored(),this.calmDown(),this.alive&&(this.searchTerminal(),this.followHabits(),this.stayAtBar(),this.s.step+=1,this.s.step>=Te&&(this.s.step=0,this.nextHour())))}animate(){!this.alive||this.waiting||(this.beats+=1,this.sprite.beat())}studyOrSleep(){this.alive&&(this.s.day<=ct?this.set(this.random()<.5?"studying":"asleep"):this.sprite.flash("no",24))}browse(){this.alive&&(this.s.terminal?this.set("browsing"):this.sprite.flash("no",14))}goToBar(){this.alive&&this.set("bar")}makeFriends(){this.alive&&this.set("friends")}lookForTerminal(){this.alive&&(this.s.terminal<=0?this.set("looking"):this.sprite.flash("no",10))}beg(){if(!this.alive)return;const{exams:e,labs:n}=this.s,s=r=>e[r]+n[r],a=this.taken(e).map((r,i)=>i).filter(r=>s(r)>0);if(this.s.day<ct||a.length===0)return this.sprite.flash("no",10);const o=a.reduce((r,i)=>s(i)<s(r)?i:r);this.sprite.flash("suplica",20),this.random()<vb&&(e[o]-=this.random()*Ah),this.s.stress+=Ah*this.random()}alfa(){if(!this.alive)return;const{term:e,left:n,selection:s,alfas:a,enrolled:o,exams:r,labs:i,day:l,passed:h}=this.s;let c=`Score: this is term ${e} you have been at the FIB.

`;if(s)c+=`You are doing the Selection Phase.
You have ${n} credits left to finish it.

`;else{c+=`You are in the middle of the degree, and have ${n} credits left to finish.

`;const d=a.filter(m=>m<1).length,u=a.filter(m=>m<=.5).length;d>0?(c+=`Of your last six alfa parameters at most, you have:
 - ${d} notable.
`,u>0&&(c+=` - of these, ${u} dangerous.
`),c+=`
`,a.forEach((m,f)=>{m<1&&(c+=`The alfa of ${a.length-f} terms ago:	${Math.round(m*100)/100}.
`)}),c+=`
`):c+=`You have an impeccable record. (swot)

`}if(l<=Th){const d=[0,0,0,0,0];for(let m=0;m<o;m+=1){const f=r[m]+i[m];d[f<=0?0:f<=2*Te?1:f<=5*Te?2:f<=8*Te?3:4]+=1}const u=["subjects going well","that will go well with a little effort","subjects you should get down to","subjects you find hard","subjects you had better pray for"];d.forEach((m,f)=>{m>0&&(c+=`You have ${m} ${u[f]}.
`)}),c+=`You are enrolled in ${o} subjects in all.`}else c+=`Of ${o}, ${h} are passed.`;this.s.said.push(c)}dismiss(){this.s.said.shift()}enrol(e){return this.s.asks!=="enrol"||!Number.isInteger(e)||e<1||e>this.enrolment.most?!1:(this.s.enrolled=e,this.s.asks=null,!0)}choose(e){this.s.asks==="degree"&&(this.s.left=Eh[e],this.askEnrolment())}keepHabits(){const{doing:e}=this.s;e==="lab"?this.s.labHabit+=1:e==="studying"?this.s.studyHabit+=1:e==="browsing"?this.s.chatHabit+=1:e==="friends"?this.s.friends+=1:e==="bar"&&(this.s.barHabit+=1,this.s.friends+=.4),this.s.friends=Math.min(this.s.friends,_o)}studyOrWork(){if(this.s.doing==="lab"){if(!this.labsPending)return this.set("idle");const e=this.easiest(this.s.labs);100-this.s.exams[e]>this.random()*100&&(this.s.labs[e]-=1)}else if(this.s.doing==="studying"){if(!this.examsPending)return this.set("idle");this.s.exams[this.easiest(this.s.exams)]-=1}}easiest(e){const{exams:n,labs:s}=this.s;let a=this.taken(e).findIndex(r=>r>0),o=n[a]+s[a]+a;for(let r=a+1;r<this.s.enrolled;r+=1){const i=n[r]+s[r];o>i&&e[r]>0&&(a=r,o=i+r)}return a}holdTerminal(){if(this.s.day>ct||this.s.terminal<=0){this.s.terminal=0;return}this.s.doing==="idle"&&this.labsPending&&this.set("lab"),this.s.doing==="lab"?this.s.terminal=Math.round(this.s.terminal+this.random()):(this.s.doing!=="browsing"||this.random()<=Rn.labs[this.s.day])&&(this.s.terminal-=1),this.s.terminal=Math.max(this.s.terminal,0)}browseOn(){this.s.doing==="browsing"&&(this.s.boredom+=Math.round(.5*this.random()),this.s.terminal<=0&&this.set("idle"))}getBored(){const{doing:e}=this.s;if(e==="idle"?(this.s.boredom+=1,this.s.boredom%10===0&&this.set("idle")):e==="studying"?this.s.boredom+=.1:e==="lab"?this.s.boredom+=this.random()/2:e==="asleep"?this.s.boredom-=1:e==="bar"&&(this.s.boredom-=this.random()),this.s.boredom>zo)return this.end("bad",xb);this.s.boredom=Math.max(this.s.boredom,-zo/2)}calmDown(){this.s.doing==="bar"&&(this.s.stress-=1),this.s.stress=Math.max(this.s.stress,0),this.s.stress>Go&&this.end("bad",Tb)}searchTerminal(){const{doing:e,day:n}=this.s;if(e==="looking"&&n<=ct&&this.s.terminal<=0){this.s.stress+=1;const s=(.5+Rn.exams[n])*(1-Rn.labs[n]),a=this.random();if(a<=s){const o=(a<=s/2?4:2)*(Te+1);this.s.terminal=Math.round(o*this.random()),this.set("idle")}}else e==="looking"&&this.set("idle");n>ct&&(this.s.terminal=0)}followHabits(){const{doing:e,hour:n}=this.s,s=this.s.labHabit/this.s.chatHabit/2,a=this.s.chatHabit/this.s.labHabit/2,o=this.s.studyHabit/this.s.barHabit/2,r=this.labsPending,i=l=>this.random()<l;if(this.s.terminal>0)if(e==="lab")s<=.5?i(.5-s)&&this.set("browsing"):r||this.set(this.random()>(.5-a)*2?"browsing":"idle");else if(e==="browsing")if(r){const[l,h]=this.s.terminal<Te?[2,1]:[1,2];(a<=.5?i((.5-a)*l):this.random()>(.5-s)*h)&&this.set("lab")}else a<.5&&this.random()*.4>a&&this.set("idle");else(e==="idle"||e==="studying")&&(this.s.friends>_o/2&&i(.5-o)&&this.set("bar"),a<=.5&&i(.5-a)&&this.set("browsing"),s<=.5&&i(.5-s)&&r&&this.set("lab"));else if(e==="studying"&&o<=.5){const l=n<Lt/4?Te:n>3*Lt/4?Te/2:1;this.random()*l<.5-o&&this.set("bar")}}stayAtBar(){this.s.doing==="bar"&&this.s.friends/_o<this.random()/2&&this.set("idle")}nextHour(){if(this.getSleepy(),this.s.doing==="lab"&&(this.s.boredom+=Math.round(4*this.random())),this.classInTheRoom(),this.s.hour<Lt-1){this.s.hour+=1;return}this.s.hour=0,this.nextDay()}getSleepy(){const e=this.s.hour<Lt*3/4;this.s.doing!=="asleep"?(e?this.s.sleep+=1:this.s.doing==="idle"&&this.s.sleep>5?this.set("asleep"):this.s.sleep+=2+(this.s.terminal>0?1:0),this.s.sleep>(this.s.terminal>0?Mh*1.25:Mh)&&this.set("asleep")):e&&this.s.sleep<Sh/4?this.set("idle"):(this.s.sleep-=2,this.s.sleep<Sh&&this.set("idle"))}classInTheRoom(){const{hour:e}=this.s;e>=Lt/3&&e<=2*Lt/3&&this.random()<bb&&(this.s.terminal=0)}nextDay(){const{day:e}=this.s;if(this.fadeHabits(),e<ct?this.bringWork():e===Th&&this.mark(),e<yb-1){this.s.day+=1;return}this.s.day=0,this.nextTerm()}fadeHabits(){const e=n=>Math.max(1,Math.round(n*.9));this.s.labHabit=e(this.s.labHabit),this.s.studyHabit=e(this.s.studyHabit),this.s.barHabit=e(this.s.barHabit),this.s.chatHabit=e(this.s.chatHabit),this.s.friends=e(this.s.friends)}bringWork(){const e=this.s.day+5;if(this.s.day===0)for(let n=e;n>=0;n-=1)this.bringWorkFor(n);else e<ct&&this.bringWorkFor(e)}bringWorkFor(e){for(let n=0;n<this.s.enrolled;n+=1){const s=Te*((n+1)/2)+1;this.random()<=Rn.labs[e]&&(this.s.labs[n]+=Math.round(s*this.random())),this.random()<=Rn.exams[e]&&(this.s.exams[n]+=Math.round(s*this.random()))}}mark(){for(let e=0;e<this.s.enrolled;e+=1)this.s.exams[e]+this.s.labs[e]<Te&&(this.s.passed+=1);this.s.alfas=[...this.s.alfas.slice(1),this.s.alfas[5]],this.s.exams.fill(0),this.s.labs.fill(0)}nextTerm(){const{enrolled:e,passed:n,selection:s,term:a}=this.s;if(this.s.alfas[5]=s?1:e?n/e:0,this.s.alfas.filter(o=>o<.5).length>3)return this.end("bad","You have 4 Alfa parameters below 0.5, bye, bye.");if(this.s.left-=n,this.s.passed=0,this.s.term+=1,this.s.left<=0){if(!s)return this.end("good",`Very Good!
You did it!!!!!!!
Your Fibergochi has finished the degree!!!!!
`,`ERROR 315: in module KERNEL386.EXE,
page 0137:0A285F43.
An UNFORESEEN situation has occurred,
we are very sorry, but we thought that
nobody would ever get here, where no
other man has gone before!.`);this.s.selection=!1,this.s.said.push("You have SUCCESSFULLY finished the SELECTION PHASE!!!!!"),this.s.asks="degree";return}if(s&&a===2&&this.s.left>8)return this.end("bad","BACARRA!!!!");if(s&&a>3){if(this.s.left>2)return this.end("bad","You have not got through the Selection Phase.");this.s.said.push(`You have not passed everything, but it is not serious.
YOU HAVE GOT THROUGH THE SELECTION PHASE, but... They will not throw you out, but you have to go to
the Técnica (or rather, they make you).`),this.s.left=Eh.tecnica,this.s.selection=!1}this.askEnrolment()}askEnrolment(){this.s.asks="enrol",this.s.suggested=Math.min(Math.round(this.random()*4)+3,this.s.left)}taken(e){return e.slice(0,this.s.enrolled)}set(e){this.s.doing=e,this.show(e)}show(e){if(e==="lab")this.sprite.play("pract");else if(e==="studying")this.sprite.play("est");else if(e==="asleep")this.sprite.play("zz");else if(e==="looking")this.sprite.play("bt");else if(e==="friends")this.sprite.play("amig");else if(e==="browsing")this.sprite.play("http");else if(e==="bar")this.sprite.play("bar0");else{const n=this.s.boredom+this.s.stress,s=zo+Go;n<s/3?this.sprite.play("normal"):n<s/1.5?this.sprite.play("normal1"):this.sprite.play("normal2"),this.s.stress>Go*2/3&&this.sprite.play("normal2")}}end(e,...n){this.s.said.push(...n),e==="bad"&&this.s.said.push($b),this.s.ended=e,this.s.asks=null,this.sprite.stop()}}const Mb=["step","hour","day","term","boredom","stress","labHabit","studyHabit","chatHabit","barHabit","friends","sleep","terminal","enrolled","passed","left","suggested"],Sb=["idle","asleep","studying","browsing","looking","lab","bar","friends"],Uo=(t,e)=>Array.isArray(t)&&t.length===e&&t.every(n=>Number.isFinite(n));function Ab(t){let e;try{e=JSON.parse(t??"null")}catch{return null}return typeof e!="object"||e===null||Array.isArray(e)?null:Mb.every(s=>Number.isFinite(e[s]))&&Sb.includes(e.doing)&&Uo(e.exams,10)&&Uo(e.labs,10)&&Uo(e.alfas,6)&&typeof e.selection=="boolean"&&[null,"enrol","degree"].includes(e.asks)&&[null,"good","bad"].includes(e.ended)&&Array.isArray(e.said)&&e.said.every(s=>typeof s=="string")?e:null}const Eb={x:"A cross: there is no Fibergochi.",normal:"The Fibergochi, standing about.",normal1:"The Fibergochi, standing about, getting bored.",normal2:"The Fibergochi, bored stiff.",est:"The Fibergochi at a desk, studying.",zz:"The Fibergochi, asleep.",bt:"A room full of terminals, all taken, and the Fibergochi looking for a free one.",http:"A terminal, and the Fibergochi browsing: http.",pract:"The Fibergochi at a terminal, doing a lab.",no:"The Fibergochi, shaking its head.",bar0:"The Fibergochi at the bar with its friends, drinks on the table.",amig:"The Fibergochi with a group of friends.",suplica:"The Fibergochi on the floor, begging."},Ob=[[["study","estudio","Study/Sleep","to study or to sleep."]],[["http","http","http","to have a good time at a terminal (if you have one)."],["alfa","alfa","alfa","see the score."],["bar","bar","Bar","go to the bar, have a drink or play mus."]],"screen",[["friends","amigos","Friends","to make new friends."],["terminal","bt","Find terminal","look for a terminal to do labs, or not."],["beg","suplica","Beg","to try to get more passes."]]],Ib={slow:"slow",normal:"normal",fast:"fast"};function Oh(t,[e,n,s,a]){if(t<=0)return e;if(t<3)return`${n}, under an hour`;const o=Math.round(t/3);return`${t<15?s:a}, about ${o} ${o===1?"hour":"hours"}`}const nt=(t,e,{title:n="",disabled:s=!1}={})=>`<button type="button" data-do="${t}"${n?` title="${M(n)}"`:""}${s?" disabled":""}>${e}</button>`;function Qu(t,{running:e,confirmingNew:n,pace:s,picked:a=null}){const o=!t.alive||t.waiting||n,r=f=>f&&t.lampsLit?"on":"off",i=[["exam",r(t.examsPending),Oh(t.studyLeft,["nothing to study","a little to study","something to study","a lot to study"])],["lab",r(t.labsPending),Oh(t.labLeft,["no lab to do","a little lab work","some lab work","a lot of lab work"])],["terminal",t.hasTerminal?"on":"off",t.hasTerminal?"a terminal":t.labsPending?"no terminal, and labs need one":"no terminal"]],l=i.map(([f,p,w])=>`<li><button type="button" class="lamp ${p}" data-do="lamp-${f}" data-lamp="${f}" title="${f}: ${w}">${f}</button></li>`).join(""),h=i.map(([f,p,w])=>`<li class="${p}${f===a?" picked":""}" data-lamp="${f}"><b>${f}</b> ${w}</li>`).join(""),c=t.picture,d=Eb[c.replace(/\d$/,"")]??"",u=`<div class="screen"><ul class="lamps" data-show="lamps">${l}</ul><img data-show="picture" src="/fibergochi/${c}.gif" alt="${d}" width="200" height="160"></div>`;return`<div class="fibergochi"><div class="egg"><p class="by"><span>by</span> Night</p>${Ob.map(f=>f==="screen"?u:`<div class="keys">${f.map(([p,w,g,v])=>{const[b,k]=w==="alfa"?[15,11]:[22,21];return nt(p,`<img src="/fibergochi/keys/${w}.gif" alt="${g}" width="${b*2}" height="${k*2}">`,{title:`${g}: ${v}`,disabled:o})}).join("")}</div>`).join("")}</div><div class="panel"><p class="time"><output data-show="clock">${t.clock}</output> ${nt("pause",e?"pause":"go on")} ${nt("speed",`speed: ${Ib[s]}`,{title:"Change the speed of time."})} ${nt("new","new")}</p><ul class="legend" data-show="legend">${h}</ul>${Cb(t,n)}</div></div>`}function Cb(t,e){const{said:n,asks:s}=t.state,a=(o,...r)=>`<div class="dialog" role="alertdialog"><p>${M(o).replaceAll(`
`,"<br>")}</p><p>${r.join(" ")}</p></div>`;if(e)return a("Are you sure you want a new Fibergochi?",nt("new-yes","OK"),nt("new-no","Cancel"));if(n.length>0)return a(n[0],nt("ok","OK"));if(s==="degree")return a("Do you want to do the Superior?",nt("superior","OK"),nt("tecnica","Cancel"));if(s==="enrol"){const{most:o,suggested:r}=t.enrolment;return`<form class="dialog" data-do="enrol"><label>How many credits do you want to enrol in? [1..${o}] <input type="number" name="credits" min="1" max="${o}" value="${r}"></label> <button type="submit">OK</button></form>`}return""}const Ih="fibergochi:1999-03-02",Yo={slow:1e3,normal:400,fast:10},jb={slow:"normal",normal:"fast",fast:"slow"},Nb=100,Lb=10;function Pb(t){let e=new ei(Math.random,m()??{}),n=!0,s=!1,a=null,o="slow",r=0;const i=to(t),l=document.createElement("div"),h=y("div",{hidden:!0},...Zu.everyImage.map($=>y("img",{src:`/fibergochi/${$}.gif`,alt:"",width:50,height:40}))),c=()=>Qu(e,{running:n,confirmingNew:s,pace:o,picked:a});function d(){const $=document.activeElement instanceof HTMLElement&&l.contains(document.activeElement)?document.activeElement.dataset.do:void 0;l.innerHTML=c(),$&&l.querySelector(`[data-do="${$}"]`)?.focus()}function u(){const $=document.createElement("div");$.innerHTML=c();for(const O of l.querySelectorAll("[data-show]")){const L=$.querySelector(`[data-show="${O.dataset.show}"]`);L&&(O instanceof HTMLImageElement?O.getAttribute("src")!==L.getAttribute("src")&&(O.src=L.getAttribute("src")??"",O.alt=L.getAttribute("alt")??""):O.innerHTML!==L.innerHTML&&(O.innerHTML=L.innerHTML))}}function m(){try{return Ab(localStorage.getItem(Ih))}catch{return null}}function f(){try{localStorage.setItem(Ih,JSON.stringify(e.state))}catch{}}const p=()=>n&&i.onScreen()&&e.alive&&!e.waiting;let w=setTimeout(g,Yo[o]);function g(){if(w=setTimeout(g,Yo[o]),!!p()){if(e.step(),r+=1,e.waiting||!e.alive){f(),d();return}r%Lb===0&&f(),u()}}const v=setInterval(()=>{p()&&(e.animate(),u())},Nb),b={study:()=>e.studyOrSleep(),http:()=>e.browse(),alfa:()=>e.alfa(),bar:()=>e.goToBar(),friends:()=>e.makeFriends(),terminal:()=>e.lookForTerminal(),beg:()=>e.beg()},k={pause:()=>n=!n,speed:()=>{o=jb[o],clearTimeout(w),w=setTimeout(g,Yo[o])},new:()=>s=!0,"new-no":()=>s=!1,"new-yes":()=>{e=new ei(Math.random),s=!1,n=!0},ok:()=>e.dismiss(),superior:()=>e.choose("superior"),tecnica:()=>e.choose("tecnica")};function x($){const O=$.target.closest("button[data-do]")?.dataset.do??"";O.startsWith("lamp-")?(a=O.slice(5),u()):b[O]?(b[O](),e.waiting?d():u()):k[O]&&(k[O](),f(),d())}function T($){$.preventDefault();const O=$.target.querySelector("input[name=credits]");O&&e.enrol(Number(O.value))&&(f(),d())}return t.addEventListener("click",x),t.addEventListener("submit",T),window.addEventListener("pagehide",f),t.replaceChildren(l,h),d(),()=>{clearTimeout(w),clearInterval(v),i.stop(),f(),t.removeEventListener("click",x),t.removeEventListener("submit",T),window.removeEventListener("pagehide",f)}}const Fb=()=>Qu(new ei(Math.random),{running:!0,confirmingNew:!1,pace:"slow"}),Bb={name:"fibergochi",apps:{fibergochi:Pb},stills:{fibergochi:Fb}},Xe=t=>[...t.replace(/\s/g,"")].map(e=>e==="#"?1:0),xn={A:Xe(".###. #...# ##### #...# #...#"),B:Xe("####. #...# ####. #...# ####."),C:Xe(".#### #.... #.... #.... .####"),D:Xe("####. #...# #...# #...# ####."),E:Xe("##### #.... ####. #.... #####"),H:Xe("#...# #...# ##### #...# #...#"),O:Xe(".###. #...# #...# #...# .###."),T:Xe("##### ..#.. ..#.. ..#.. ..#.."),X:Xe("#...# .#.#. ..#.. .#.#. #...#")};function $s(t){let e=t>>>0;return()=>{e=e+1831565813>>>0;let n=Math.imul(e^e>>>15,1|e);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}const Rb=t=>1/(1+Math.exp(-t));class Db{weights;constructor(e,n){const s=$s(n);this.weights=e.slice(1).map((a,o)=>Array.from({length:a},()=>Array.from({length:e[o]+1},()=>s()-.5)))}forward(e){const n=[[...e]];for(const s of this.weights){const a=[...n[n.length-1],1];n.push(s.map(o=>Rb(o.reduce((r,i,l)=>r+i*a[l],0))))}return n}answer(e){return this.forward(e).pop()}learn(e,n,s){const a=this.forward(e),o=a[a.length-1];let r=o.map((l,h)=>(l-n[h])*l*(1-l));for(let l=this.weights.length-1;l>=0;l-=1){const h=[...a[l],1],c=this.weights[l],d=a[l].map((u,m)=>{let f=0;for(let p=0;p<c.length;p+=1)f+=c[p][m]*r[p];return f*u*(1-u)});for(let u=0;u<c.length;u+=1)for(let m=0;m<h.length;m+=1)c[u][m]-=s*r[u]*h[m];r=d}let i=0;for(let l=0;l<o.length;l+=1)i+=(o[l]-n[l])**2;return i/2}}const Wb=10,Ch=.5;class em{constructor(e,n){this.shapes=e,this.network=new Db([25,Wb,e.length],n),this.noise=$s(n+1)}shapes;network;noise;rounds=0;error=0;train(e){for(let n=0;n<e;n+=1){let s=0;this.shapes.forEach(({pixels:a},o)=>{const r=this.shapes.map((l,h)=>h===o?1:0),i=Math.floor(this.noise()*a.length);s+=this.network.learn(a,r,Ch),s+=this.network.learn(a.map((l,h)=>h===i?1-l:l),r,Ch)}),this.error=s,this.rounds+=1}}read(e){const n=this.network.answer(e);return this.shapes.map(({name:s},a)=>({letter:s,score:n[a]}))}}const Hb=[{name:"A",pixels:xn.A},{name:"B",pixels:xn.B}];function ti(t=Hb){const e=new em(t,1);return e.train(200),e}const qb=3;function tm(t,e,n){const s=t.trim();return s===""?"Give it a name first.":[...s].length>qb?"A name of three characters at most.":n.includes(s)?`“${s}” is already a letter it knows.`:e.some(Boolean)?null:"There is no ink on the grid to remember."}const zb=t=>Array.isArray(t)&&t.length===25&&t.every(e=>e===0||e===1);function Gb(t,e=[]){let n;try{n=JSON.parse(t??"[]")}catch{return[]}if(!Array.isArray(n))return[];const s=[];for(const a of n){const{name:o,pixels:r}=a??{};typeof o!="string"||!zb(r)||tm(o,r,[...e,...s.map(i=>i.name)])||s.push({name:o.trim(),pixels:r})}return s}function nm(t,e){const n=e.map((i,l)=>`<button type="button" class="cell" data-at="${l}" aria-pressed="${i?"true":"false"}" aria-label="cell ${l+1}"></button>`).join(""),s=t.read(e),a=s.reduce((i,l)=>l.score>i.score?l:i),o=s.map(({letter:i,score:l})=>`<tr${i===a.letter?' class="best"':""}><th scope="row">${M(i)}</th><td class="sure"><span class="bar" style="--p:${l.toFixed(3)}"></span>${Math.round(l*100)}%</td></tr>`).join(""),r=t.rounds===0?"It has not been taught anything yet: every answer is a guess.":`It reads <b>${M(a.letter)}</b>, after ${t.rounds} rounds of lessons.`;return`<div class="letters"><div class="grid" role="group" aria-label="the drawing, five cells by five">${n}</div><div class="reading"><p>${r}</p><table class="answers"><tbody>${o}</tbody></table></div></div>`}const jh="first-network:own",Nh=Object.entries(xn).map(([t,e])=>({name:t,pixels:e}));function _b(t){let e=p();const n=new Set(["A","B",...e.map(({name:$})=>$)]),s=()=>[...Nh,...e];let a=ti(m()),o=[...xn.A];const r=y("div",{onclick:$=>{const O=$.target.closest("[data-at]")?.dataset.at;O!==void 0&&(o[Number(O)]=1-o[Number(O)],d())}}),i=y("div",{class:"row"}),l=y("div",{class:"row taught"}),h=y("input",{type:"text",maxlength:3,size:4,"aria-label":"a name for the drawing"}),c=y("p",{class:"error",hidden:!0});function d(){r.innerHTML=nm(a,o)}function u($){o=$,d()}function m(){return s().filter($=>n.has($.name))}function f(){a=ti(m()),d()}function p(){try{return Gb(localStorage.getItem(jh),Object.keys(xn))}catch{return[]}}function w(){try{localStorage.setItem(jh,JSON.stringify(e))}catch{}}function g(){const $=tm(h.value,o,s().map(L=>L.name));if(c.textContent=$??"",c.hidden=$===null,$)return;const O={name:h.value.trim(),pixels:[...o]};e=[...e,O],n.add(O.name),h.value="",w(),k(),f()}function v($){e=e.filter(O=>O.name!==$),n.delete($);for(const O of Nh)n.size<2&&n.add(O.name);w(),k(),f()}const b=($,O)=>y("button",{type:"button",onclick:O},$);function k(){i.replaceChildren("Draw ",...s().map($=>b($.name,()=>u([...$.pixels]))),b("one cell wrong",()=>{const $=Math.floor(Math.random()*o.length);u(o.map((O,L)=>L===$?1-O:O))}),b("clear",()=>u(o.map(()=>0)))),l.replaceChildren("Taught: ",...s().map($=>{const O=y("input",{type:"checkbox",value:$.name,checked:n.has($.name),onchange:()=>{O.checked?n.add($.name):n.size>2?n.delete($.name):O.checked=!0,f()}}),L=e.includes($)&&y("button",{type:"button",class:"forget","aria-label":`forget ${$.name}`,onclick:()=>v($.name)},"×");return y("label",{},O,` ${$.name}`,L)}))}const x=y("div",{class:"row"},b("teach 100 more rounds",()=>{a.train(100),d()}),b("forget everything",()=>{a=new em(a.shapes,1),d()})),T=y("div",{class:"row own"},"Your own: draw it, name it ",h,b("remember this drawing",()=>g()),c);k(),t.replaceChildren(i,r,l,x,T),d()}const Ub=()=>nm(ti(),xn.A),Yb={name:"first-network",apps:{letters:_b},stills:{letters:Ub}},Jb=1.5,Kb=.02,Vb=.25;class Xb{constructor(e,n,s,a){this.credit=s,this.random=a,this.remaining=[...e],this.buyers=n.map(o=>({bidder:o,credit:s,won:[],error:null}))}credit;random;buyers;remaining;sold=[];turns=[];get over(){return this.remaining.length===0}get next(){return this.remaining[0]}get market(){return{lots:this.remaining,credits:Object.fromEntries(this.buyers.map(e=>[e.bidder.name,e.credit])),sales:this.sold}}demands(){const e=this.next;return Object.fromEntries(this.buyers.map(n=>[n.bidder.name,e?this.demandOf(n,e):null]))}sell(){const e=this.remaining.shift();if(!e)throw new Error("the floor is empty");const n=this.buyers.map(o=>this.demandOf(o,e)),s=Object.fromEntries(this.buyers.map((o,r)=>[o.bidder.name,n[r]===null?null:e.value/(1+n[r])])),a=this.buyers.filter(o=>(s[o.bidder.name]??0)>o.credit).map(o=>o.bidder.name);for(let o=e.value*Jb;o>=e.value*Vb;o-=e.value*Kb){const r=(e.value-o)/o,i=this.buyers.filter((h,c)=>h.credit>=o&&r>=(n[c]??1/0));if(i.length===0)continue;const l=i[Math.min(i.length-1,Math.floor(this.random()*i.length))];return l.credit-=o,l.won.push(e),this.record({lot:e,buyer:l.bidder.name,price:o},s,a)}return this.record({lot:e,buyer:null,price:null},s,a)}standings(){return this.buyers.map(({bidder:e,credit:n,won:s,error:a})=>{const o=s.reduce((i,l)=>i+l.value,0),r=this.credit-n;return{name:e.name,credit0:this.credit,credit:n,spent:r,lots:s.length,value:o,profit:o-r,error:a}})}record(e,n,s){return this.sold.push(e),this.turns.push({sale:e,bids:n,short:s}),e}demandOf(e,n){try{const s=e.bidder.demands(n,this.market,e.bidder.name);if(typeof s!="number"||Number.isNaN(s))throw new Error(`demanded ${String(s)}, not a margin`);return e.error=null,s}catch(s){return e.error=s instanceof Error?s.message:String(s),null}}}const Lh=[["sardines",30],["anchovies",40],["squid",90],["hake",120],["sole",180],["prawns",250],["monkfish",300],["tuna",400]];function Zb(t,e){return Array.from({length:t},(n,s)=>{const[a,o]=Lh[Math.floor(e()*Lh.length)];return{id:s+1,kind:a,value:Math.round(o*(.7+.6*e()))}})}const Qb=60;function sm(t,e,n){const s=$s(t),a=Zb(Qb,s),o=a.reduce((r,i)=>r+i.value,0);return new Xb(a,e,n*o/Math.max(1,e.length),s)}function Ph(t,e="You"){const n=new Function("lot","market","me",t);return{name:e,demands:n}}const Fh=`// Return the margin you demand: (value - price) / price.
// You are told the lots still to sell, everyone's credit, and every sale so far.
// This is Vicente. Change the 0.9 first.
const fish = market.lots.reduce((sum, lot) => sum + lot.value, 0);
const money = 0.9 * Object.values(market.credits).reduce((sum, c) => sum + c, 0);
if (money <= 0) return 0.001;
return Math.max(0.001, (fish - money) / money);
`,e0=12,He=t=>Math.round(t).toString(),Bh=t=>t===null?"—":t===1/0?"∞":`${Math.round(t*100)}%`;function am(t){const e=t.next,n=t.demands(),s=[...t.standings()].sort((c,d)=>d.profit-c.profit),a=Math.max(1,...s.map(c=>Math.abs(c.profit))),o=e?`<p class="lot">Next on the floor: <b>a box of ${M(e.kind)}</b>, which resells for ${He(e.value)}. The price starts at ${He(e.value*1.5)} and falls.</p>`:'<p class="lot">The floor is empty.</p>',i=`<table class="board"><thead><tr><th>buyer</th><th>asks</th><th>holds</th><th>spent</th><th>worth</th><th>credit</th><th>profit</th></tr></thead><tbody>${s.map(({name:c,lots:d,spent:u,value:m,profit:f,credit:p,error:w})=>{const g=w?`<td class="asks error" colspan="5">${M(w)}</td>`:`<td class="asks">${Bh(n[c]??null)}</td>`;return`<tr${f<0?' class="loss"':""}><th scope="row">${M(c)}</th>${g}`+(w?"":`<td>${d} lot${d===1?"":"s"}</td><td>${He(u)}</td><td>${He(m)}</td><td>${He(p)}</td>`)+`<td class="profit"><span class="bar" style="--p:${(Math.abs(f)/a).toFixed(3)}"></span>${He(f)}</td></tr>`}).join("")}</tbody></table>`,l=t.turns,h=l.length?`<ol class="sales" reversed start="${l.length}">${[...l].reverse().slice(0,e0).map(({sale:{lot:c,buyer:d,price:u},bids:m,short:f})=>{const p=u===null||d===null?"<i>withdrawn</i>":`sold at <b>${He(u)}</b>, a margin of ${Bh((c.value-u)/u)}`,w=Object.entries(m).map(([g,v])=>{if(v===null)return`${M(g)} —`;const b=g===d?`<b>${M(g)}</b>`:M(g);return f.includes(g)?`<s title="more than it had">${b} at ${He(v)}</s>`:`${b} at ${He(v)}`}).join(", ");return`<li><span class="went">${M(c.kind)}, ${He(c.value)}: ${p}.</span> <span class="ready">Ready to shout: ${w}.</span></li>`}).join("")}</ol>`:"";return`<div class="fish-market">${o}${i}${h}</div>`}function Rh(t,e){return{name:t,demands:()=>e}}const Dh=.001;function _i(t,e){const n=t.lots.reduce((a,o)=>a+o.value,0),s=e*Object.values(t.credits).reduce((a,o)=>a+o,0);return s<=0?Dh:Math.max(Dh,(n-s)/s)}const t0=.9,n0=3,Zs=10;function s0(t="Planner"){return{name:t,demands(e,n,s){const a=_i(n,t0),o=a*(n0-1)/Zs,r=m=>a+m*o,i=m=>Math.max(0,Math.min(Zs-1,Math.floor((m-a)/o))),l=new Array(Zs).fill(0);for(const m of n.sales){if(m.price===null)continue;const f=i((m.lot.value-m.price)/m.price);l[f]=l[f]+m.lot.value}const h=l.reduce((m,f)=>m+f,0);if(h===0)return a;const c=n.lots.reduce((m,f)=>m+f.value,0),d=n.credits[s]??0;let u=0;for(let m=Zs-1;m>=0;m-=1)if(u+=c*l[m]/h/(1+r(m)),u>=d)return r(m);return a}}}function a0(t=.9,e="Vicente"){return{name:e,demands:(n,s)=>_i(s,t)}}const o0=.98,r0=1.05,i0=.95,l0=t=>(t.lot.value-t.price)/t.price;function Wh(t,e){const n=e.filter(a=>a.buyer===t),s=n.reduce((a,o)=>a+o.price,0);return s>0?(n.reduce((a,o)=>a+o.lot.value,0)-s)/s:0}function h0(t="Wanda"){return{name:t,demands(e,n,s){const a=_i(n,o0),o=Wh(s,n.sales);let r=1;for(const i of n.sales)i.buyer!==null&&(i.buyer===s?r*=r0:Wh(i.buyer,n.sales)>=o&&l0(i)>=a&&(r*=i0));return a*r}}}function om(t=.9){return[Rh("Patient",1),Rh("Hasty",.05),a0(t),h0(),s0()]}const c0=250,d0=1,Hh="fish-market:own",Qs="fish-market:seated";function u0(t){let e=d0,n=null,s,a=null;const o=y("div"),r=y("p",{class:"error",hidden:!0}),i=y("output",{},"90%"),l=y("input",{type:"range",min:.5,max:1,step:.02,value:.9,oninput:()=>f()}),h=y("output",{},"50%"),c=y("input",{type:"range",min:.3,max:1.2,step:.05,value:.5,oninput:()=>f()}),d=y("textarea",{class:"agent",spellcheck:!1,rows:9,oninput:()=>v()}),u=y("button",{type:"button",onclick:()=>a?g():w()},"run");function m(){o.innerHTML=am(s)}function f(){g(),i.textContent=`${Math.round(Number(l.value)*100)}%`,h.textContent=`${Math.round(Number(c.value)*100)}%`,s=sm(e,[...om(Number(l.value)),...n?[n]:[]],Number(c.value)),m()}function p(){return s.over?!1:(s.sell(),m(),!0)}function w(){u.textContent="stop",a=setInterval(()=>{p()||g()},c0)}function g(){a&&clearInterval(a),a=null,u.textContent="run"}function v(){try{localStorage.setItem(Hh,d.value)}catch{}}function b(){try{n=Ph(d.value),r.hidden=!0,localStorage.setItem(Qs,"yes")}catch(L){n=null,r.textContent=L instanceof Error?L.message:String(L),r.hidden=!1,localStorage.removeItem(Qs)}f()}function k(){n=null,localStorage.removeItem(Qs),f()}const x=y("div",{class:"dials"},y("label",{},"Vicente believes the others will spend: ",i,l),y("label",{},"Money in the room, as a share of the fish: ",h,c)),T=y("div",{class:"row"},y("button",{type:"button",onclick:()=>{p()}},"next lot"),u,y("button",{type:"button",onclick:()=>{for(g();p(););}},"whole morning"),y("button",{type:"button",onclick:()=>{e=Math.floor(Math.random()*1e9),f()}},"new morning")),$=y("div",{class:"row"},y("button",{type:"button",onclick:()=>b()},"seat it"),y("button",{type:"button",onclick:()=>k()},"stand it down")),O=y("details",{class:"own"},y("summary",{},"Seat your own agent"),d,$,r);try{d.value=localStorage.getItem(Hh)??Fh,localStorage.getItem(Qs)&&(n=Ph(d.value))}catch{d.value=Fh}return t.replaceChildren(x,T,o,O),f(),g}const m0=()=>am(sm(1,om(),.5)),f0={name:"fish-market",apps:{"fish-market":u0},stills:{"fish-market":m0}};function p0(t,e){const n=[];for(let s=t.length-1;s>=0;s-=1)n.push(t.slice(0,s));for(let s=1;s<=e.length;s+=1)n.push(e.slice(0,s));return n}const g0=3800,w0=6500,y0=26,b0=46,v0=420;function k0(t){return[...t.childNodes].map(e=>e.nodeName==="BR"?`
`:e.textContent??"").join("")}function $0(t){const e=document.querySelector("main h1");if(!e||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return()=>{};const n={text:k0(e)};e.setAttribute("aria-label",n.text),e.classList.add("typing");const s=document.createElement("span");s.className="caret idle",s.setAttribute("aria-hidden","true");const a=(c,d)=>{const u=c.split(`
`).flatMap((m,f)=>f===0?[m]:[document.createElement("br"),m]);if(d){const m=document.createElement("a");m.href=d,m.append(...u,s),e.replaceChildren(m)}else e.replaceChildren(...u,s)};a(n.text);let o=n,r=[],i=performance.now()+g0,l=0;const h=c=>{if(l=requestAnimationFrame(h),c<i)return;if(r.length===0){const u=t(o,n);r=p0(o.text,u.text),o=u,s.classList.remove("idle")}const d=r.shift()??o.text;a(d,r.length===0?o.href:void 0),r.length===0?(s.classList.add("idle"),i=c+w0):d===""?i=c+v0:i=c+(d.length<(r[0]?.length??0)?b0:y0)};return l=requestAnimationFrame(h),()=>{cancelAnimationFrame(l),a(n.text),s.remove(),e.classList.remove("typing"),e.removeAttribute("aria-label")}}function x0(t,e){const n=[...t];for(let s=n.length-1;s>0;s-=1){const a=Math.min(s,Math.floor(e()*(s+1)));[n[s],n[a]]=[n[a],n[s]]}return n}function T0(t,e){let n=[];return s=>(n.length===0&&(n=x0(t,e),n.length>1&&n[0]===s&&n.push(n.shift())),n.shift()??s)}const M0=[{text:`More than
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
as this page opened.`,href:"/projects/worlds/"}];let Jo=null;const S0={name:"headline",arrive:t=>{if(Jo?.(),Jo=null,t.route!=="/")return;let e=null;Jo=$0((n,s)=>(e??=T0([s,...M0],Math.random),e(n)))}};function qh(t,e="You"){const n=new Function("fish","weeks","bots","me","rounds",t);return{name:e,orders:n}}const zh=`// Return your orders for the round: one number a week, 0 to rest.
// You know the fish at the start, the weeks, who is on the lagoon (bots),
// your name (me), and every round before (rounds), but not what the others
// will do this time.
// This one rests, lets the lagoon grow, and takes one share the last week.
let grown = fish;
for (let week = 1; week < weeks; week++) grown += Math.floor(grown / 2);
const orders = new Array(weeks).fill(0);
orders[weeks - 1] = Math.floor(grown / bots.length);
return orders;
`;function rm(t){const e=t.rounds[t.rounds.length-1],n=t.scores(),s=Math.max(1,...Object.values(n)),a=[...t.names].sort((u,m)=>n[m]-n[u]).map(u=>{const m=t.errors[u];return`<tr><th scope="row">${M(u)}</th>`+(m?`<td class="error" colspan="2">${M(m)}</td>`:`<td>${e?.totals[u]??0}</td><td class="profit"><span class="bar" style="--p:${(n[u]/s).toFixed(3)}"></span>${n[u]}</td>`)+"</tr>"}).join(""),o=t.rounds.length,r=`<table class="board"><caption>${o===0?"The season has not started":`After ${o} round${o===1?"":"s"}`}</caption><thead><tr><th>bot</th><th>last round</th><th>season</th></tr></thead><tbody>${a}</tbody></table>`;if(!e)return`<div class="lagoon"><p class="lot">The lagoon has <b>${t.fish} fish</b>, and ${t.weeks} weeks ahead. Nobody has been out yet.</p>${r}</div>`;const i=e.weeks.map((u,m)=>`<th>${m+1}</th>`).join(""),l=Math.max(1,...e.weeks.map(u=>u.fish)),h=e.weeks.map(u=>`<td><span class="fish" style="--p:${(u.fish/l).toFixed(3)}"></span>${u.fish}</td>`).join(""),c=t.names.map(u=>{const m=e.weeks.map((f,p)=>{const w=e.orders[u]?.[p]??0,g=f.caught[u]??0;return`<td${w>g?' class="short"':""} title="asked for ${w}">${g}</td>`}).join("");return`<tr><th scope="row">${M(u)}</th>${m}<td class="total">${e.totals[u]}</td></tr>`}).join("");return`<div class="lagoon">${`<table class="weeks"><caption>Round ${o}, week by week: what each bot caught, and what was left in the lagoon</caption><thead><tr><th>week</th>${i}<th>total</th></tr></thead><tbody>${c}<tr class="water"><th scope="row">in the lagoon</th>${h}<td></td></tr></tbody></table>`}${r}</div>`}function im(t,e,n){const s=[];let a=t;for(let o=0;o<e;o+=1){const r=Math.max(0,Math.min(a,Math.floor(n(a,o))));s.push(r),a-=r,a+=Math.floor(a/2)}return s}const ea={rest:{name:"Rest",orders:(t,e)=>new Array(e).fill(0)},one:{name:"One",orders:(t,e)=>new Array(e).fill(1)},power:{name:"Power",orders:(t,e)=>Array.from({length:e},(n,s)=>s*s)},percent:t=>({name:`${Math.round(t*100)}%`,orders:(e,n)=>im(e,n,s=>s*t)})},Gh=(t,e)=>Math.ceil(t/e);function _h(t="Tit for tat"){const e=new Set;return{name:t,orders(n,s,a,o,r){for(const l of r)for(const h of Object.keys(l.orders))h!==o&&(l.orders[h]?.[0]??0)>=Gh(l.start,a.length)&&e.add(h);if(a.some(l=>l!==o&&e.has(l)))return im(n,s,l=>Gh(l,a.length));let i=n;for(let l=1;l<s;l+=1)i+=Math.floor(i/2);return[...new Array(s-1).fill(0),Math.floor(i/a.length)]}}}function lm(){return[{fisher:ea.one,seated:!0},{fisher:ea.power,seated:!0},{fisher:ea.percent(.1),seated:!0},{fisher:ea.percent(.4),seated:!1},{fisher:_h("Tit for tat"),seated:!0},{fisher:_h("Tat for tit"),seated:!0}]}function A0(t,e,n){const s=Object.keys(n),a=[],o=Object.fromEntries(s.map(i=>[i,0]));let r=t;for(let i=0;i<e;i+=1){const l=Object.fromEntries(s.map(c=>[c,0])),h=s.map(c=>({name:c,order:Math.max(0,Math.floor(n[c]?.[i]??0))})).filter(({order:c})=>c>0);for(const c of[...new Set(h.map(({order:d})=>d))].sort((d,u)=>d-u)){const d=h.filter(m=>m.order===c),u=Math.min(Math.floor(r/d.length),c);for(const{name:m}of d)l[m]=u,o[m]=o[m]+u;r-=u*d.length}r+=Math.floor(r/2),a.push({fish:r,caught:l})}return{start:t,orders:n,weeks:a,totals:o}}class hm{constructor(e,n,s){this.fish=e,this.weeks=n,this.fishers=s}fish;weeks;fishers;rounds=[];errors={};get names(){return this.fishers.map(e=>e.name)}play(){const e=Object.fromEntries(this.fishers.map(s=>[s.name,this.ordersOf(s)])),n=A0(this.fish,this.weeks,e);return this.rounds.push(n),n}scores(){return Object.fromEntries(this.names.map(e=>[e,this.rounds.reduce((n,s)=>n+(s.totals[e]??0),0)]))}ordersOf(e){try{const n=e.orders(this.fish,this.weeks,this.names,e.name,this.rounds);if(!Array.isArray(n)||n.some(s=>typeof s!="number"||Number.isNaN(s)))throw new Error("orders must be an array of numbers, one a week");return delete this.errors[e.name],Array.from({length:this.weeks},(s,a)=>n[a]??0)}catch(n){return this.errors[e.name]=n instanceof Error?n.message:String(n),new Array(this.weeks).fill(0)}}}const Uh="lagoon:own",ta="lagoon:seated";function E0(t){let e=null,n;const s=y("div"),a=y("p",{class:"error",hidden:!0}),o=y("output",{},"100"),r=y("input",{type:"range",min:5,max:200,step:1,value:100,oninput:()=>u()}),i=y("output",{},"10"),l=y("input",{type:"range",min:4,max:14,step:1,value:10,oninput:()=>u()}),h=y("textarea",{class:"agent",spellcheck:!1,rows:11,oninput:()=>f()}),c=lm().map(({fisher:T,seated:$})=>({fisher:T,box:y("input",{type:"checkbox",checked:$,onchange:()=>u()})}));function d(){s.innerHTML=rm(n)}function u(){o.textContent=r.value,i.textContent=l.value;const T=c.filter(({box:$})=>$.checked).map(({fisher:$})=>$);n=new hm(Number(r.value),Number(l.value),[...T,...e?[e]:[]]),d()}function m(T){for(let $=0;$<T;$+=1)n.play();d()}function f(){try{localStorage.setItem(Uh,h.value)}catch{}}function p(){try{e=qh(h.value),a.hidden=!0,localStorage.setItem(ta,"yes")}catch(T){e=null,a.textContent=T instanceof Error?T.message:String(T),a.hidden=!1,localStorage.removeItem(ta)}u()}function w(){e=null,localStorage.removeItem(ta),u()}const g=y("div",{class:"dials"},y("label",{},"Fish in the lagoon at the start: ",o,r),y("label",{},"Weeks in a round: ",i,l)),v=y("div",{class:"row bench"},"On the lagoon: ",...c.map(({fisher:T,box:$})=>y("label",{},$,` ${T.name}`))),b=y("div",{class:"row"},y("button",{type:"button",onclick:()=>m(1)},"play a round"),y("button",{type:"button",onclick:()=>m(5)},"play five"),y("button",{type:"button",onclick:()=>u()},"new season")),k=y("div",{class:"row"},y("button",{type:"button",onclick:()=>p()},"seat it"),y("button",{type:"button",onclick:()=>w()},"stand it down")),x=y("details",{class:"own"},y("summary",{},"Seat your own bot"),h,k,a);try{h.value=localStorage.getItem(Uh)??zh,localStorage.getItem(ta)&&(e=qh(h.value))}catch{h.value=zh}t.replaceChildren(g,v,b,s,x),u()}const O0=()=>rm(new hm(100,10,lm().filter(({seated:t})=>t).map(({fisher:t})=>t))),I0={name:"lagoon",apps:{lagoon:E0},stills:{lagoon:O0}};function cm(t,e){const n=new Set(e);return{nodes:t.nodes.filter(s=>!n.has(s.id)),wires:t.wires.filter(({from:s,to:a})=>!n.has(s.node)&&!n.has(a.node))}}function ni(t,e,n){return{...t,nodes:t.nodes.map(s=>{if(s.id!==e)return s;const{title:a,...o}=s;return n?.trim()?{...o,title:n.trim()}:o})}}function Ui(t,e,n){const{changed:s,label:a}=n;if(t.kind==="choice"){const l=n.optional?[y("option",{value:""},n.settled?`auto: ${n.settled}`:"auto")]:[],h=y("select",{"aria-label":a},...l,...t.choices.map(d=>y("option",{value:d.value},d.label)));h.addEventListener("change",()=>s(h.value===""?void 0:h.value,!0));const c=d=>{h.value=d===void 0?"":String(d)};return c(e),{element:h,show:c}}if(t.kind==="flag"){const l=y("input",{type:"checkbox","aria-label":a});l.addEventListener("change",()=>s(l.checked,!0));const h=c=>{l.checked=c===!0};return h(e),{element:l,show:h}}if(t.kind==="number"&&n.style==="dial"&&t.min!==void 0&&t.max!==void 0){const[l,h]=[t.min,t.max],c=y("input",{type:"range",min:l,max:h,step:t.step??"any","aria-label":a}),d=y("output"),u=y("button",{type:"button",class:"wb-play",title:`Play ${a} from where it is to its end`,"aria-label":`Play ${a}`},"▶"),m=v=>{d.textContent=t.show?t.show(v):String(v)},f=(v,b)=>{c.value=String(v),m(v),s(v,b)};let p=null;const w=()=>{p!==null&&clearInterval(p),p=null,u.textContent="▶",u.setAttribute("aria-label",`Play ${a}`)};u.addEventListener("click",()=>{if(p!==null)return w();const v=t.step??(h-l)/100,b=Math.max(1,Math.round((h-l)/v));Number(c.value)>=h&&f(l,!1),u.textContent="❚❚",u.setAttribute("aria-label",`Pause ${a}`),p=setInterval(()=>{const k=Math.min(h,Number(c.value)+v);if(!c.isConnected||k>=h){w(),c.isConnected&&f(h,!0);return}f(k,!1)},Math.min(600,Math.max(80,1e4/b)))}),c.addEventListener("input",()=>{w(),f(Number(c.value),!1)}),c.addEventListener("change",()=>s(Number(c.value),!0));const g=v=>{v===void 0||p!==null||(c.value=String(v),m(Number(v)))};return g(e),{element:y("span",{class:"wb-slider"},u,c,d),show:g}}if(t.kind==="number"){const l=y("input",{type:"number",step:t.step??"any",min:t.min,max:t.max,placeholder:n.settled??"","aria-label":a});l.addEventListener("input",()=>{(l.value===""||Number.isFinite(l.valueAsNumber))&&s(l.value===""?void 0:l.valueAsNumber,!1)}),l.addEventListener("change",()=>s(l.value===""?void 0:l.valueAsNumber,!0));const h=c=>{l.ownerDocument.activeElement!==l&&(l.value=c===void 0?"":String(c))};return h(e),{element:l,show:h}}const o=t.kind==="text"?t.lines??1:1,r=o>1?y("textarea",{rows:o,spellcheck:!1,"aria-label":a}):y("input",{type:"text",spellcheck:!1,placeholder:n.settled??"","aria-label":a});r.addEventListener("input",()=>s(r.value===""&&n.optional?void 0:r.value,!1)),r.addEventListener("change",()=>s(r.value===""&&n.optional?void 0:r.value,!0));const i=l=>{r.ownerDocument.activeElement!==r&&(r.value=l===void 0?"":String(l))};return i(e),{element:r,show:i}}const Yh=(t,e)=>t.nodeType===e.nodeType&&t.nodeName===e.nodeName&&(t.nodeType!==Node.ELEMENT_NODE||t.getAttribute("data-key")===e.getAttribute("data-key"));function C0(t,e){for(const{name:n}of[...t.attributes])e.hasAttribute(n)||t.removeAttribute(n);for(const{name:n,value:s}of[...e.attributes])t.getAttribute(n)!==s&&t.setAttribute(n,s);dm(t,e)}function dm(t,e){const n=new Map;for(const a of[...t.childNodes])a instanceof Element&&a.hasAttribute("data-key")&&n.set(a.getAttribute("data-key")??"",a);const s=[...e.childNodes];for(s.forEach((a,o)=>{const r=a instanceof Element?a.getAttribute("data-key"):null,i=t.childNodes[o],l=r!==null?n.get(r):i&&Yh(i,a)?i:void 0;l&&Yh(l,a)?(l!==i&&t.insertBefore(l,i??null),l instanceof Element?C0(l,a):l.textContent!==a.textContent&&(l.textContent=a.textContent)):t.insertBefore(a.cloneNode(!0),i??null)});t.childNodes.length>s.length;)t.lastChild?.remove()}function Yi(t,e){const n=t.ownerDocument.createElement("template");n.innerHTML=e,dm(t,n.content)}class um{constructor(e){this.hands=e,this.element=y("aside",{class:"wb-board","aria-label":"The board: dials and pictures"},this.dials,this.cards,this.empty),this.cards.addEventListener("click",n=>{const s=n.target?.closest("button[data-node]");s?.dataset.node&&this.hands.find(s.dataset.node)}),this.element.addEventListener("pointerover",n=>{const s=n.target?.closest(".wb-dial[data-node], [data-key^='card:']");this.hands.point(s?s.dataset.node??s.dataset.key?.slice(5)??null:null)}),this.element.addEventListener("pointerleave",()=>this.hands.point(null))}hands;element;dials=y("div",{class:"wb-dials"});cards=y("div",{class:"wb-cards"});empty=y("p",{class:"wb-empty"},"The pictures a blueprint paints come here. Add a node from the shelf called Paint — Bars, Lines, Scatter — and wire a table into it.");controls=new Map;showStill(e){this.cards.innerHTML=e,this.empty.hidden=!0}show(e,n){this.showDials(e);const s=n.map(a=>P("figure",{class:`bp-card${a.painting?"":a.waiting?" waiting":" unpainted"}`,"data-key":`card:${a.node}`},P("figcaption",{},P("button",{type:"button",class:"wb-find","data-node":a.node,title:"Find it in the blueprint"},a.title)),a.painting?P("div",{class:"bp-painting"},{html:a.painting.html}):P("p",{class:"bp-problem"},a.problem??(a.waiting?"Fetching its data…":"")),a.painting?.caption?P("p",{class:"bp-caption"},a.painting.caption):null,(a.painting?.credits??[]).length>0?P("p",{class:"bp-credits"},`Source: ${(a.painting?.credits??[]).join(" ")}`):null).html).join("");Yi(this.cards,s),this.empty.hidden=n.length>0||e.length>0}renaming(e,n){const s=n.textContent??"";n.setAttribute("contenteditable","true"),n.focus(),n.ownerDocument.getSelection()?.selectAllChildren(n);const a=i=>{n.removeAttribute("contenteditable"),n.removeEventListener("blur",o),n.removeEventListener("keydown",r);const l=(n.textContent??"").trim();i&&l!==""&&l!==s?this.hands.rename(e,l):n.textContent=s},o=()=>a(!0),r=i=>{i.stopPropagation(),i.key==="Enter"?(i.preventDefault(),a(!0)):i.key==="Escape"&&a(!1)};n.addEventListener("blur",o),n.addEventListener("keydown",r)}showDials(e){const n=new Set(e.map(s=>s.node));for(const[s,a]of this.controls)n.has(s)||(a.element.remove(),this.controls.delete(s));e.forEach((s,a)=>{const o=JSON.stringify([s.label,s.editor]);let r=this.controls.get(s.node);if(r&&r.signature!==o&&!r.element.contains(r.element.ownerDocument.activeElement)&&(r.element.remove(),r=void 0),r)r.control.show(s.value);else{const i=Ui(s.editor,s.value,{style:"dial",label:s.label,changed:(c,d)=>c!==void 0&&this.hands.turn(s.node,c,d)}),l=y("span",{class:"wb-dial-name"},s.label),h=y("button",{type:"button",class:"wb-rename",title:"Give the dial a name of its own","aria-label":`Rename ${s.label}`},"✎");h.addEventListener("click",c=>{c.preventDefault(),this.renaming(s.node,l)}),r={element:y("div",{class:"wb-dial","data-node":s.node},y("span",{class:"wb-dial-head"},l,h),i.element),control:i,signature:o},this.controls.set(s.node,r)}this.dials.children[a]!==r.element&&this.dials.insertBefore(r.element,this.dials.children[a]??null)})}}function mm(t,e,n,s){const a=y("ul",{}),o=y("button",{type:"button",class:"wb-help-close","aria-label":"Close"},"✕"),r=y("div",{class:"wb-examples",role:"dialog","aria-label":"The page's blueprints"},o,y("p",{},"Open one of the page's blueprints here. Your changes to each are kept apart; Reset goes back to the one open."),a),i=()=>r.remove();o.addEventListener("click",i);for(const l of e){const h=y("button",{type:"button",class:l===n?"current":void 0},y("strong",{},l.title),l.about?y("span",{},l.about):"");h.addEventListener("click",()=>{i(),s(l)}),a.append(y("li",{},h))}return t.append(r),a.querySelector("button:not(.current)")?.focus(),i}const wt={width:560,height:300,pad:{top:14,right:18,bottom:46,left:58}},j0=12;function Ji(t,e){const{width:n,height:s,pad:a}=wt,[o,r,i,l]=[a.left,n-a.right,a.top,s-a.bottom],h=e.scale,c=v=>h?l-h.at(v)*(l-i):l,d=t.bands,u=d?{width:(r-o)/Math.max(1,d.length),at:v=>o+(v+.5)*(r-o)/Math.max(1,d.length)}:void 0,m=v=>u?u.at(v):t.scale?o+t.scale.at(v)*(r-o):o,f=(h?.ticks??[]).map(v=>[P("line",{class:"grid",x1:o,x2:r,y1:c(v),y2:c(v)}),P("text",{class:"tick y",x:o-6,y:c(v)+3.5,"text-anchor":"end"},te(v))]),p=d?Math.max(1,Math.ceil(d.length/j0)):1,w=d?d.flatMap((v,b)=>b%p===0?[P("text",{class:"tick x",x:m(b),y:l+15,"text-anchor":"middle"},v)]:[]):(t.scale?.ticks??[]).map(v=>[P("line",{class:"grid",x1:m(v),x2:m(v),y1:i,y2:l}),P("text",{class:"tick x",x:m(v),y:l+15,"text-anchor":"middle"},te(v))]);return{grid:P("g",{class:"frame"},f,w,P("line",{class:"axis",x1:o,x2:r,y1:l,y2:l}),P("text",{class:"axis-name x",x:(o+r)/2,y:s-8,"text-anchor":"middle"},t.label),P("text",{class:"axis-name y",transform:`translate(14 ${(i+l)/2}) rotate(-90)`,"text-anchor":"middle"},e.label)),x:m,y:c,...u&&{band:u}}}function lo(t,e,...n){return P("svg",{class:"bp-plot",viewBox:`0 0 ${wt.width} ${wt.height+e}`,role:"img","aria-label":t},n)}function N0(t,e){const n=t/Math.max(1,e),s=10**Math.floor(Math.log10(n));return([1,2,2.5,5,10].find(o=>o*s>=n)??10)*s}const Ko=t=>Number(t.toPrecision(12));function Tn(t,{zero:e=!1,count:n=5}={}){const s=t.filter(Number.isFinite);let[a,o]=s.length>0?[Math.min(...s),Math.max(...s)]:[0,1];e&&([a,o]=[Math.min(0,a),Math.max(0,o)]),a===o&&([a,o]=a===0?[0,1]:[a-Math.abs(a)/2,o+Math.abs(o)/2]);const r=N0(o-a,n),[i,l]=[Ko(Math.floor(a/r)*r),Ko(Math.ceil(o/r)*r)],h=[];for(let c=i;c<=l+r/2;c+=r)h.push(Ko(c));return{low:i,high:l,ticks:h,at:c=>l>i?(c-i)/(l-i):.5}}const L0=.78;function P0({categories:t,values:e,faded:n=[],x:s,y:a,unit:o}){const r=Ji({label:s,bands:t},{label:o?`${a} (${o})`:a,scale:Tn(e.filter(h=>h!==null),{zero:!0})}),i=(r.band?.width??0)*L0,l=e.flatMap((h,c)=>{if(h===null)return[];const[d,u]=[r.y(Math.max(0,h)),r.y(Math.min(0,h))],m=t[c]??"";return[P("rect",{class:n[c]?"bar faded":"bar","data-key":`bar:${m}`,x:na(r.x(c)-i/2),y:na(d),width:na(i),height:na(Math.max(.5,u-d))},P("title",{},`${m}: ${te(h)}${o?` ${o}`:""}`))]});return lo(`${a} by ${s}`,0,r.grid,P("g",{class:"marks"},l))}const na=t=>Math.round(t*10)/10;function at(t){return t==null?"—":typeof t=="number"?String(Math.round(t*1e3)/1e3):t}const F0=240,B0=t=>t===0||t===!1||t==="no"||t===null,R0={name:"bars",title:"Bars",role:"paint",shelf:"Paint",summary:"A bar a row, as tall as a column: the nights of each year, the files of each box.",inputs:[{name:"table",label:"table",type:"table"},{name:"x",label:"x",type:"text",optional:!0,editor:{kind:"column",of:"table"}},{name:"y",label:"height",type:"text",optional:!0,editor:{kind:"column",of:"table",numeric:!0}},{name:"faded",label:"faint unless",type:"text",optional:!0,editor:{kind:"column",of:"table"},hint:"a column that says no, or 0, for the rows to draw faint: a year not measured whole"}],outputs:[],run:t=>{const e=t.table,n=K(e,t.x,"x"),s=K(e,t.y,"height",{numeric:!0,measured:!0,besides:[n.name]});if(e.rows.length>F0)throw new Error(`${e.rows.length} rows would be ${e.rows.length} bars: group them, or keep the top ones, first`);const a=t.faded?K(e,t.faded,"faint unless"):void 0;return{painting:{html:P0({categories:e.rows.map(r=>at(r[n.name])),values:e.rows.map(r=>typeof r[s.name]=="number"?r[s.name]:null),faded:e.rows.map(r=>a?B0(r[a.name]):!1),x:n.name,y:s.name,...s.unit&&{unit:s.unit}}).html,caption:`${s.name} by ${n.name}, ${e.rows.length} bars`,credits:Sn(e)},settled:{x:n.name,y:s.name}}}};function za(t,e){const n=Math.min(t.length,e.length);if(n<2)return{n,r:Number.NaN,slope:Number.NaN,intercept:Number.NaN};const s=c=>c.slice(0,n).reduce((d,u)=>d+u,0)/n,[a,o]=[s(t),s(e)];let[r,i,l]=[0,0,0];for(let c=0;c<n;c+=1){const[d,u]=[(t[c]??0)-a,(e[c]??0)-o];r+=d*d,i+=u*u,l+=d*u}const h=r>0?l/r:Number.NaN;return{n,r:r>0&&i>0?l/Math.sqrt(r*i):Number.NaN,slope:h,intercept:o-h*a}}function Jh(t){const e=t.map((s,a)=>({value:s,at:a})).sort((s,a)=>s.value-a.value),n=new Array(t.length).fill(0);for(let s=0;s<e.length;){let a=s;for(;a+1<e.length&&e[a+1]?.value===e[s]?.value;)a+=1;for(let o=s;o<=a;o+=1)n[e[o]?.at??0]=(s+a)/2+1;s=a+1}return n}function ho(t,e,n){const s=t.rows.filter(a=>typeof a[e]=="number"&&typeof a[n]=="number");return{xs:s.map(a=>a[e]),ys:s.map(a=>a[n]),rows:s}}const fm={name:"correlation",title:"Correlation",role:"statistic",shelf:"Statistics",summary:"How nearly two columns rise and fall together, from −1 to 1, over the rows that have both: Pearson's r, or Spearman's, of the ranks.",inputs:[{name:"table",label:"table",type:"table"},{name:"x",label:"x",type:"text",optional:!0,editor:{kind:"column",of:"table",numeric:!0}},{name:"y",label:"y",type:"text",optional:!0,editor:{kind:"column",of:"table",numeric:!0}},{name:"of",label:"of",type:"text",initial:"values",editor:{kind:"choice",choices:[{value:"values",label:"the values (Pearson)"},{value:"ranks",label:"the ranks (Spearman)"}]}}],outputs:[{name:"r",label:"r",type:"number"},{name:"n",label:"rows",type:"number"},{name:"slope",label:"slope",type:"number"},{name:"intercept",label:"intercept",type:"number"}],run:t=>{const e=t.table,n=K(e,t.x,"x",{numeric:!0,measured:!0}),s=K(e,t.y,"y",{numeric:!0,measured:!0,besides:[n.name]}),{xs:a,ys:o}=ho(e,n.name,s.name);if(a.length<3)throw new Error(`only ${a.length} rows have both ${n.name} and ${s.name}`);const r=za(a,o),i=t.of==="ranks"?za(Jh(a),Jh(o)).r:r.r;if(!Number.isFinite(i))throw new Error(`${Number.isFinite(r.slope)?s.name:n.name} never changes, so nothing can go with it`);return{outputs:{r:i,n:r.n,slope:r.slope,intercept:r.intercept},said:`r = ${te(i)} over ${r.n} rows`,settled:{x:n.name,y:s.name}}}},D0={name:"dial",title:"Dial",role:"dial",shelf:"Dials",summary:"A value to turn by hand, on the board above the pictures: wire it into any input that takes a number, some words, or yes and no.",inputs:[{name:"value",label:"value",type:"value",initial:0}],outputs:[{name:"value",label:"value",type:"value"}],run:({value:t})=>({outputs:{value:t}})},Kh={abs:Math.abs,sqrt:Math.sqrt,log:Math.log,log10:Math.log10,exp:Math.exp,round:Math.round,floor:Math.floor,ceil:Math.ceil,min:Math.min,max:Math.max},Vo=/\s*(\d+\.?\d*(?:e[-+]?\d+)?|\.\d+|[A-Za-z_]\w*|[-+*/^(),×÷]|\S)/gy;class Vh extends Error{}const W0=/^(?:[\d.]|[A-Za-z_]|[-+*/^(),×÷]$)/;function H0(t){const e=[];Vo.lastIndex=0;for(let n=Vo.exec(t);n;n=Vo.exec(t)){const s=n[1]??"";if(!W0.test(s))throw new Error(`the formula has a ${s}, which it cannot read`);e.push(s)}return e}function q0(t){const e=H0(t),n=[];let s=0;const a=()=>e[s],o=()=>e[s++],r=()=>{let f=i();for(let p=a();p==="+"||p==="-";p=a()){o();const[w,g]=[f,i()];f=p==="+"?v=>w(v)+g(v):v=>w(v)-g(v)}return f},i=()=>{let f=l();for(let p=a();p==="*"||p==="/"||p==="×"||p==="÷";p=a()){o();const[w,g]=[f,l()];f=p==="*"||p==="×"?v=>w(v)*g(v):v=>w(v)/g(v)}return f},l=()=>{if(a()==="-"||a()==="+"){const f=o(),p=l();return f==="-"?w=>-p(w):p}return h()},h=()=>{const f=c();if(a()!=="^")return f;o();const p=l();return w=>f(w)**p(w)},c=()=>{const f=o();if(f===void 0)throw new Error("the formula ends where a value was expected");if(/^[\d.]/.test(f)){const p=Number(f);return()=>p}if(f==="("){const p=r();if(o()!==")")throw new Error("a bracket in the formula is not closed");return p}if(/^[A-Za-z_]/.test(f))return a()==="("?d(f):u(f);throw new Error(`the formula has a ${f} where a value was expected`)},d=f=>{const p=Kh[f];if(!p)throw new Error(`there is no function ${f}: there are ${Object.keys(Kh).join(", ")}`);o();const w=[];if(a()!==")")for(w.push(r());a()===",";)o(),w.push(r());if(o()!==")")throw new Error(`${f}( is not closed`);return g=>p(...w.map(v=>v(g)))},u=f=>(n.includes(f)||n.push(f),p=>{const w=p[f];if(typeof w!="number")throw new Vh;return w}),m=r();if(s<e.length)throw new Error(`the formula goes on after it should end, at ${e[s]}`);return{names:n,at:f=>{try{const p=m(f);return Number.isFinite(p)?p:null}catch(p){if(p instanceof Vh)return null;throw p}}}}const z0={name:"formula",title:"Formula",role:"step",shelf:"Tables",summary:"A new column worked out of the others, row by row, with + − × ÷ ^, brackets and a few functions: tx - tn, log(lines).",inputs:[{name:"table",label:"table",type:"table"},{name:"name",label:"new column",type:"text",initial:"result",editor:{kind:"text"}},{name:"formula",label:"is",type:"text",initial:"",editor:{kind:"text"},hint:"the names of columns, numbers, + - * / ^, brackets, and abs sqrt log log10 exp round min max"},{name:"unit",label:"unit",type:"text",optional:!0,editor:{kind:"text"}}],outputs:[{name:"table",label:"table",type:"table"}],run:t=>{const e=t.table,n=String(t.formula??"").trim();if(n==="")throw new Error("is: write a formula, as: tx - tn");const s=q0(n),a=s.names.find(l=>!e.columns.some(h=>h.name===l));if(a)throw new Error(`formula: the table has no column ${a} — it has ${e.columns.map(l=>l.name).join(", ")}`);const o=String(t.name??"result").trim()||"result",r=t.unit?String(t.unit):void 0,i=[...e.columns.filter(l=>l.name!==o),{name:o,kind:"number",...r&&{unit:r},about:n}];return{outputs:{table:{...e,columns:i,rows:e.rows.map(l=>({...l,[o]:s.at(l)}))}}}}},pm=(t,e)=>typeof t=="number"&&typeof e=="number"?t-e:String(t??"").localeCompare(String(e??""));function Ht(t){const e=t.length,n=[...t].sort((i,l)=>i-l),s=e>0?t.reduce((i,l)=>i+l,0)/e:Number.NaN,a=Math.floor(e/2),o=e===0?Number.NaN:e%2===1?n[a]??Number.NaN:((n[a-1]??0)+(n[a]??0))/2,r=e>1?Math.sqrt(t.reduce((i,l)=>i+(l-s)**2,0)/(e-1)):Number.NaN;return{count:e,mean:s,median:o,deviation:r,lowest:n[0]??Number.NaN,highest:n[e-1]??Number.NaN}}const Xo={mean:t=>Ht(t).mean,sum:t=>t.reduce((e,n)=>e+n,0),median:t=>Ht(t).median,lowest:t=>Ht(t).lowest,highest:t=>Ht(t).highest},G0={name:"group",title:"Group",role:"step",shelf:"Tables",summary:"One row a group of rows that share a column, with another column summed up: the mean of each year, the total of each month.",inputs:[{name:"table",label:"table",type:"table"},{name:"by",label:"by",type:"text",optional:!0,editor:{kind:"column",of:"table"}},{name:"and",label:"and by",type:"text",optional:!0,editor:{kind:"column",of:"table"}},{name:"value",label:"summing up",type:"text",optional:!0,editor:{kind:"column",of:"table",numeric:!0}},{name:"how",label:"as its",type:"text",initial:"mean",editor:{kind:"choice",choices:[...Object.keys(Xo),"count"].map(t=>({value:t,label:t}))}},{name:"name",label:"call it",type:"text",optional:!0,editor:{kind:"text"},hint:"what to call the column summed up; its own name when left empty"}],outputs:[{name:"table",label:"table",type:"table"}],run:t=>{const e=t.table,n=K(e,t.by,"by"),s=t.and?K(e,t.and,"and by"):void 0,a=String(t.how),o=a==="count",r=o?void 0:K(e,t.value,"summing up",{numeric:!0,measured:!0,besides:[n.name,s?.name??""]}),i=Xo[a];if(!o&&!i)throw new Error(`as its: there is no ${a}: there are ${[...Object.keys(Xo),"count"].join(", ")}`);const l=[n,...s?[s]:[]],h=String(t.name??"").trim()||void 0,c=new Map;for(const m of e.rows){const f=JSON.stringify(l.map(p=>m[p.name]??null));c.set(f,[...c.get(f)??[],m])}const d=[...c.values()].map(m=>{const f=m[0]??{},p=r?m.map(g=>g[r.name]).filter(g=>typeof g=="number"):[],w=r&&i?{[h??r.name]:p.length>0?i(p):null}:{};return{...Object.fromEntries(l.map(g=>[g.name,f[g.name]??null])),...w,rows:m.length}}).sort((m,f)=>l.reduce((p,w)=>p||pm(m[w.name],f[w.name]),0)),u=[...l.map(m=>({...m,key:!0})),...r?[{...r,name:h??r.name,key:!1,about:`the ${a} of ${r.name}`}]:[],{name:"rows",kind:"number",key:!1}];return{outputs:{table:{...e,columns:u.map(({key:m,...f})=>m?{...f,key:m}:f),rows:d}},settled:{by:n.name,...r&&{value:r.name}}}}},_0=12,sa=150,Ze=t=>Math.round(t*10)/10;function Xh(t,e,n){if(e<0&&n>0){const a=Math.round(Math.abs(t)/Math.max(-e,n)*92)+4;return`color-mix(in srgb, var(${t<0?"--bp-cold":"--bp-warm"}) ${a}%, var(--paper))`}return`color-mix(in srgb, var(--bp-heat) ${Math.round((t-e)/Math.max(1e-9,n-e)*88)+8}%, var(--paper))`}function U0({xs:t,ys:e,values:n,x:s,y:a,unit:o}){const{width:r,height:i,pad:l}=wt,[h,c,d,u]=[l.left,l.top,r-l.right,i-l.bottom],[m,f]=[(d-h)/Math.max(1,t.length),(u-c)/Math.max(1,e.length)],p=[...n.values()],[w,g]=p.length>0?[Math.min(...p),Math.max(...p)]:[0,1],v=[...n].map(([F,N])=>{const[j,S]=F.split(":").map(Number);return P("rect",{class:"cell","data-key":`cell:${t[j]}:${e[S]}`,x:Ze(h+j*m),y:Ze(c+S*f),width:Ze(m+.4),height:Ze(f+.4),style:`fill: ${Xh(N,w,g)}`},P("title",{},`${s} ${t[j]}, ${a} ${e[S]}: ${te(N)}${o?` ${o}`:""}`))}),b=F=>Math.max(1,Math.ceil(F/_0)),k=t.flatMap((F,N)=>N%b(t.length)===0?[P("text",{class:"tick x",x:Ze(h+(N+.5)*m),y:u+14,"text-anchor":"middle"},F)]:[]),x=e.flatMap((F,N)=>N%b(e.length)===0?[P("text",{class:"tick y",x:h-6,y:Ze(c+(N+.5)*f+3.5),"text-anchor":"end"},F)]:[]),T=`${te(g)}${o?` ${o}`:""}`,$=d-T.length*6.2-6,O=P("g",{class:"heat-key"},P("text",{class:"tick",x:Ze($-sa-6),y:i-8,"text-anchor":"end"},te(w)),[0,1,2,3,4,5,6,7].map(F=>P("rect",{x:Ze($-sa+F*sa/8),y:i-18,width:Ze(sa/8+.4),height:10,style:`fill: ${Xh(w+(g-w)*(F+.5)/8,w,g)}`})),P("text",{class:"tick",x:d,y:i-8,"text-anchor":"end"},T)),L=P("g",{},P("text",{class:"axis-name x",x:h,y:i-8},s),P("text",{class:"axis-name y",transform:`translate(14 ${(c+u)/2}) rotate(-90)`,"text-anchor":"middle"},a));return lo(`${o?`${o} `:""}by ${s} and ${a}`,0,P("g",{class:"marks"},v),P("g",{class:"frame"},k,x,L),O)}function Zh(t,e){const n=[...new Set(t.rows.map(s=>s[e]??null))];return n.every(s=>typeof s=="number")?n.sort((s,a)=>s-a):n}const Y0={name:"heatmap",title:"Heat map",role:"paint",shelf:"Paint",summary:"A grid, a column of cells for each value of x and a row for each of y, each as deep as a third column: the hour of the day against the month.",inputs:[{name:"table",label:"table",type:"table"},{name:"x",label:"across",type:"text",optional:!0,editor:{kind:"column",of:"table"}},{name:"y",label:"down",type:"text",optional:!0,editor:{kind:"column",of:"table"}},{name:"value",label:"as deep as",type:"text",optional:!0,editor:{kind:"column",of:"table",numeric:!0}}],outputs:[],run:t=>{const e=t.table,n=K(e,t.x,"across"),s=K(e,t.y,"down",{besides:[n.name]}),a=K(e,t.value,"as deep as",{numeric:!0,measured:!0,besides:[n.name,s.name]}),[o,r]=[Zh(e,n.name),Zh(e,s.name)];if(o.length*r.length>6e3)throw new Error(`${o.length} by ${r.length} cells are too many to see: group the rows first`);const i=new Map;for(const c of e.rows){const d=c[a.name];if(typeof d!="number")continue;const u=`${o.indexOf(c[n.name]??null)}:${r.indexOf(c[s.name]??null)}`,m=i.get(u)??{sum:0,count:0};i.set(u,{sum:m.sum+d,count:m.count+1})}const l=new Map([...i].map(([c,{sum:d,count:u}])=>[c,d/u]));return{painting:{html:U0({xs:o.map(at),ys:r.map(at),values:l,x:n.name,y:s.name,...a.unit&&{unit:a.unit}}).html,caption:`${a.name} by ${n.name} and ${s.name}`,credits:Sn(e)},settled:{x:n.name,y:s.name,value:a.name}}}},J0={name:"histogram",title:"Histogram",role:"statistic",shelf:"Statistics",summary:"How a column's values are spread: its range cut into bins with round edges, and how many values fall in each.",inputs:[{name:"table",label:"table",type:"table"},{name:"column",label:"column",type:"text",optional:!0,editor:{kind:"column",of:"table",numeric:!0}},{name:"bins",label:"about how many bins",type:"number",initial:12,editor:{kind:"number",min:2,max:60,step:1}}],outputs:[{name:"table",label:"table",type:"table"}],run:t=>{const e=t.table,n=K(e,t.column,"column",{numeric:!0,measured:!0}),s=e.rows.map(i=>i[n.name]).filter(i=>typeof i=="number");if(s.length===0)throw new Error(`${n.name} holds no numbers to spread`);const{ticks:a}=Tn(s,{count:Math.max(2,Math.round(Number(t.bins)))}),o=a.length>1?a:[a[0]??0,(a[0]??0)+1],r=o.slice(0,-1).map((i,l)=>{const h=o[l+1]??i,c=l===o.length-2;return{from:i,to:h,count:s.filter(d=>d>=i&&(d<h||c&&d<=h)).length}});return{outputs:{table:{columns:[{name:"from",kind:"number",key:!0,...n.unit&&{unit:n.unit}},{name:"to",kind:"number",key:!0},{name:"count",kind:"number"}],rows:r,...e.credits&&{credits:e.credits}}},said:`${r.length} bins of ${s.length} values`,settled:{column:n.name}}}};function gm(...t){const e=new Map;for(const n of t.flatMap(s=>s.credits??[]))e.has(n.said)||e.set(n.said,n);return[...e.values()]}function K0(t,e){const n=new Map(e.columns.map(o=>[o.name,o])),s=t.columns.filter(o=>n.has(o.name)),a=s.filter(o=>o.key&&n.get(o.name)?.key);return(a.length>0?a:s).map(o=>o.name)}const wm={name:"join",title:"Join",role:"step",shelf:"Tables",summary:"Two tables side by side, a row for each pair of rows that agree on the columns joined on: the same year and month in both.",inputs:[{name:"left",label:"left",type:"table"},{name:"right",label:"right",type:"table"},{name:"on",label:"on",type:"text",optional:!0,editor:{kind:"text"},hint:"the names of the columns to match, as: year month; the keys both have when left empty"}],outputs:[{name:"table",label:"table",type:"table"}],run:t=>{const[e,n]=[t.left,t.right],s=String(t.on??"").split(/[\s,]+/).filter(Boolean),a=s.length>0?s:K0(e,n);if(a.length===0)throw new Error("on: the two tables have no column in common to join on");for(const[d,u]of[[e,"left"],[n,"right"]]){const m=a.find(f=>!d.columns.some(p=>p.name===f));if(m)throw new Error(`on: the ${u} table has no column ${m}`)}const o=new Set(e.columns.map(d=>d.name)),r=new Map,i=[];for(const d of n.columns.filter(u=>!a.includes(u.name))){let u=d.name;for(let m=2;o.has(u);m+=1)u=`${d.name}${m}`;o.add(u),r.set(d.name,u),i.push({...d,name:u,joined:!0})}const l=d=>JSON.stringify(a.map(u=>d[u]??null)),h=new Map;for(const d of n.rows)h.set(l(d),[...h.get(l(d))??[],d]);const c=e.rows.flatMap(d=>(h.get(l(d))??[]).map(u=>({...d,...Object.fromEntries([...r].map(([m,f])=>[f,u[m]??null]))})));return{outputs:{table:{columns:[...e.columns,...i],rows:c,credits:gm(e,n)}},said:`${c.length} rows matched, of ${e.rows.length} and ${n.rows.length}`,settled:{on:a.join(" ")}}}},ym={name:"keep",title:"Keep rows",role:"step",shelf:"Tables",summary:"Only the rows whose column is as asked: equal to a value, above or below it, between two, one of several, containing some words, holding something or nothing.",inputs:[{name:"table",label:"table",type:"table"},{name:"column",label:"column",type:"text",optional:!0,editor:{kind:"column",of:"table"}},{name:"is",label:"is",type:"text",initial:"equals",editor:{kind:"choice",choices:Object.entries(gn).map(([t,e])=>({value:t,label:e.label}))}},{name:"value",label:"value",type:"text",initial:"",editor:{kind:"values",of:"table",column:"column",test:"is"},hint:"a number or a word; two, for between, as 2000 2020; several, for one of, as 6 7 8"}],outputs:[{name:"table",label:"table",type:"table"}],run:t=>{const e=t.table,n=K(e,t.column,"column"),s=gn[String(t.is)];if(!s)throw new Error(`is: there is no test ${String(t.is)}: there are ${Object.keys(gn).join(", ")}`);const a=String(t.value??""),o=e.rows.filter(r=>s.test(r[n.name],a));return{outputs:{table:{...e,rows:o}},said:`${o.length} of ${e.rows.length} rows`,settled:{column:n.name}}}},aa=8,Qh=16,ec=6.2;function bm(t){if(t.length<2)return{markup:P("g",{class:"legend"}),height:0};const[e,n]=[wt.pad.left,wt.width-wt.pad.right];let[s,a]=[e,0];const o=l=>{s+l>n&&s>e&&([s,a]=[e,a+1]);const h={x:s,y:wt.height+4+a*Qh};return s+=l+14,h},r=t.slice(0,aa).map((l,h)=>{const c=l.length>24?`${l.slice(0,23)}…`:l,d=o(14+c.length*ec);return P("g",{class:`entry bp-s${h%aa}`},P("rect",{x:d.x,y:d.y,width:10,height:10,rx:2}),P("text",{x:d.x+14,y:d.y+9},c))}),i=t.length>aa?[`+${t.length-aa} more`].map(l=>P("text",{class:"more",...(h=>({x:h.x,y:h.y+9}))(o(l.length*ec))},l)):[];return{markup:P("g",{class:"legend"},r,i),height:(a+1)*Qh+6}}const V0=60,oa=t=>Math.round(t*10)/10;function X0({series:t,x:e,y:n,unit:s}){const a=t.flatMap(l=>l.points),o=Ji({label:e,scale:Tn(a.map(([l])=>l))},{label:s?`${n} (${s})`:n,scale:Tn(a.map(([,l])=>l))}),r=t.map((l,h)=>{const c=l.points.slice(1).map(([f],p)=>f-(l.points[p]?.[0]??f)),d=c.length>0?[...c].sort((f,p)=>f-p)[Math.floor(c.length/2)]??0:0,u=l.points.map(([f,p],w)=>`${w>0&&f-(l.points[w-1]?.[0]??f)>d*1.5||w===0?"M":"L"}${oa(o.x(f))} ${oa(o.y(p))}`).join(" "),m=l.points.length<=V0?l.points.map(([f,p])=>P("circle",{class:"dot",cx:oa(o.x(f)),cy:oa(o.y(p)),r:2.4},P("title",{},`${l.name?`${l.name}, `:""}${te(f)}: ${te(p)}${s?` ${s}`:""}`))):[];return P("g",{class:`series bp-s${h%8}`,"data-key":`line:${l.name}`},P("path",{class:"line",d:u}),m)}),i=bm(t.map(l=>l.name));return lo(`${n} by ${e}${t.length>1?`, ${t.length} lines`:""}`,i.height,o.grid,P("g",{class:"marks"},r),i.markup)}function vm(t,e){const n=[...new Set(e)],{order:s}=t;if(!s)return n;const a=o=>s.includes(o)?s.indexOf(o):s.length;return n.map((o,r)=>({name:o,first:r})).sort((o,r)=>a(o.name)-a(r.name)||o.first-r.first).map(({name:o})=>o)}const Z0={name:"lines",title:"Lines",role:"paint",shelf:"Paint",summary:"A line of one column along another — and of a second, given one — or a line for each value of a third: NO2 by year, a line a station.",inputs:[{name:"table",label:"table",type:"table"},{name:"x",label:"along",type:"text",optional:!0,editor:{kind:"column",of:"table",numeric:!0}},{name:"y",label:"of",type:"text",optional:!0,editor:{kind:"column",of:"table",numeric:!0}},{name:"and",label:"and of",type:"text",optional:!0,editor:{kind:"column",of:"table",numeric:!0}},{name:"split",label:"a line for each",type:"text",optional:!0,editor:{kind:"column",of:"table"}}],outputs:[],run:t=>{const e=t.table,n=K(e,t.x,"along",{numeric:!0}),s=K(e,t.y,"of",{numeric:!0,measured:!0,besides:[n.name]}),a=t.split?K(e,t.split,"a line for each"):void 0,o=t.and&&!a?K(e,t.and,"and of",{numeric:!0}):void 0,r=(h,c,d)=>{const{xs:u,ys:m}=ho({...e,rows:c},n.name,d);return{name:h,points:u.map((f,p)=>[f,m[p]??0]).sort((f,p)=>f[0]-p[0])}},i=a?vm(a,e.rows.map(h=>at(h[a.name]))).map(h=>r(h,e.rows.filter(c=>at(c[a.name])===h),s.name)):[r(s.name,e.rows,s.name),...o?[r(o.name,e.rows,o.name)]:[]];return{painting:{html:X0({series:i,x:n.name,y:o?s.unit??"":s.name,...s.unit&&!o&&{unit:s.unit}}).html,caption:`${s.name}${o?` and ${o.name}`:""} along ${n.name}${a?`, a line for each ${a.name}`:""}`,credits:Sn(e)},settled:{x:n.name,y:s.name}}}},Q0={name:"note",title:"Note",role:"note",shelf:"Notes",summary:"Words on the canvas, for whoever reads the blueprint next.",inputs:[{name:"text",label:"",type:"text",initial:"",editor:{kind:"text",lines:4}}],outputs:[],run:()=>({said:""})};function ev(t,e,n){return P("div",{class:"bp-readout"},P("span",{class:"value"},te(t)),e?P("span",{class:"unit"},` ${e}`):null,n?P("p",{class:"about"},n):null)}const tv={name:"readout",title:"Number",role:"paint",shelf:"Paint",summary:"One number on the board, large: a correlation, a trend, a count.",inputs:[{name:"value",label:"value",type:"number"},{name:"unit",label:"unit",type:"text",optional:!0,editor:{kind:"text"}},{name:"about",label:"what it is",type:"text",optional:!0,editor:{kind:"text"}}],outputs:[],run:t=>{const e=Number(t.value),n=t.unit?String(t.unit):void 0,s=t.about?String(t.about):void 0;return{painting:{html:ev(e,n,s).html},said:`${te(e)}${n?` ${n}`:""}`}}},ln=t=>Math.round(t*10)/10;function nv({points:t,groups:e=[],x:n,y:s,fit:a}){const o=Ji({label:n,scale:Tn(t.map(c=>c.x))},{label:s,scale:Tn(t.map(c=>c.y))}),r=t.map(c=>P("circle",{class:`dot bp-s${(c.group??0)%8}`,"data-key":`dot:${c.key}`,cx:ln(o.x(c.x)),cy:ln(o.y(c.y)),r:3.2},P("title",{},`${c.label??c.key}: ${te(c.x)}, ${te(c.y)}`))),i=t.map(c=>c.x),l=a&&Number.isFinite(a.slope)&&t.length>1?P("line",{class:"fit","data-key":"fit",x1:ln(o.x(Math.min(...i))),y1:ln(o.y(a.intercept+a.slope*Math.min(...i))),x2:ln(o.x(Math.max(...i))),y2:ln(o.y(a.intercept+a.slope*Math.max(...i)))}):null,h=bm(e);return lo(`${s} against ${n}, ${t.length} points`,h.height,o.grid,P("g",{class:"marks"},r),l??P("g",{}),h.markup)}const sv=5e3,km={name:"scatter",title:"Scatter",role:"paint",shelf:"Paint",summary:"Two columns against each other, a dot a row, with the line fitted through them: what goes with what.",inputs:[{name:"table",label:"table",type:"table"},{name:"x",label:"x",type:"text",optional:!0,editor:{kind:"column",of:"table",numeric:!0}},{name:"y",label:"y",type:"text",optional:!0,editor:{kind:"column",of:"table",numeric:!0}},{name:"colour",label:"coloured by",type:"text",optional:!0,editor:{kind:"column",of:"table"}},{name:"label",label:"named by",type:"text",optional:!0,editor:{kind:"column",of:"table"}},{name:"fit",label:"fitted line",type:"flag",initial:!0,editor:{kind:"flag"}}],outputs:[],run:t=>{const e=t.table,n=K(e,t.x,"x",{numeric:!0,measured:!0}),s=K(e,t.y,"y",{numeric:!0,measured:!0,besides:[n.name]}),a=t.colour?K(e,t.colour,"coloured by"):void 0,o=t.label?K(e,t.label,"named by"):void 0,{xs:r,ys:i,rows:l}=ho(e,n.name,s.name);if(l.length>sv)throw new Error(`${l.length} dots are too many to see: keep some rows first`);const h=a?vm(a,l.map(p=>at(p[a.name]))):[],c=l.map((p,w)=>({x:r[w]??0,y:i[w]??0,key:o?at(p[o.name]):String(w),...o&&{label:at(p[o.name])},...a&&{group:h.indexOf(at(p[a.name]))}})),d=za(r,i),u=t.fit===!0&&Number.isFinite(d.slope),m=nv({points:c,groups:h,x:`${n.name}${n.unit?` (${n.unit})`:""}`,y:`${s.name}${s.unit?` (${s.unit})`:""}`,...u&&{fit:d}}).html,f=`${s.name} against ${n.name}, ${c.length} rows${Number.isFinite(d.r)?`, r = ${te(d.r)}`:""}`;return{painting:{html:m,caption:f,credits:Sn(e)},settled:{x:n.name,y:s.name}}}},si={name:"season",title:"Take the season out",role:"step",shelf:"Tables",summary:"Each value less the mean of its month, so what is left is how unusual it was for the time of year.",inputs:[{name:"table",label:"table",type:"table"},{name:"column",label:"column",type:"text",optional:!0,editor:{kind:"column",of:"table",numeric:!0},hint:"left empty, every column of what was measured"},{name:"by",label:"by",type:"text",initial:"month",editor:{kind:"column",of:"table"}}],outputs:[{name:"table",label:"table",type:"table"}],run:t=>{const e=t.table,n=K(e,t.by,"by"),s=t.column?[K(e,t.column,"column",{numeric:!0})]:e.columns.filter(l=>l.kind==="number"&&!l.key&&l.name!==n.name),a=new Set(s.map(l=>l.name)),o=new Map(s.map(l=>{const h=new Map;for(const c of e.rows){const d=c[l.name];if(typeof d!="number")continue;const u=h.get(c[n.name])??{sum:0,count:0};h.set(c[n.name],{sum:u.sum+d,count:u.count+1})}return[l.name,new Map([...h].map(([c,{sum:d,count:u}])=>[c,d/u]))]})),r=e.rows.map(l=>({...l,...Object.fromEntries([...a].map(h=>{const c=l[h],d=o.get(h)?.get(l[n.name]);return[h,typeof c=="number"&&d!==void 0?Math.round((c-d)*1e9)/1e9:null]}))})),i=e.columns.map(l=>a.has(l.name)?{...l,about:`${l.name} less its ${n.name}'s mean`}:l);return{outputs:{table:{...e,columns:i,rows:r}},settled:{by:n.name}}}};function $m(t,e){const n=t.rows.slice(0,Math.max(0,e)),s=P("tr",{},t.columns.map(r=>P("th",{class:r.kind==="number"?"number":void 0},r.name,r.unit?P("span",{class:"unit"},` ${r.unit}`):null))),a=n.map(r=>P("tr",{},t.columns.map(i=>{const l=r[i.name];return P("td",{class:i.kind==="number"?"number":void 0},l==null?"":typeof l=="number"?te(l):l)}))),o=t.rows.length-n.length;return P("div",{class:"bp-table"},P("table",{},P("thead",{},s),P("tbody",{},a)),o>0?P("p",{class:"more"},`and ${o} ${o===1?"row":"rows"} more`):null)}const av={name:"show-table",title:"Table",role:"paint",shelf:"Paint",summary:"A table on the board, as a table: its first rows, every column.",inputs:[{name:"table",label:"table",type:"table"},{name:"rows",label:"rows shown",type:"number",initial:12,editor:{kind:"number",min:1,max:200,step:1}}],outputs:[],run:t=>{const e=t.table,n=Math.max(1,Math.round(Number(t.rows)));return{painting:{html:$m(e,n).html,caption:`${e.rows.length} rows of ${e.columns.map(s=>s.name).join(", ")}`,credits:Sn(e)}}}};function tc(t,e){return t==null?e==null?0:1:e==null?-1:typeof t=="number"&&typeof e=="number"?t-e:String(t).localeCompare(String(e))}const ov={name:"sort",title:"Sort",role:"step",shelf:"Tables",summary:"The rows in the order of a column, rising or falling.",inputs:[{name:"table",label:"table",type:"table"},{name:"by",label:"by",type:"text",optional:!0,editor:{kind:"column",of:"table"}},{name:"order",label:"order",type:"text",initial:"rising",editor:{kind:"choice",choices:[{value:"rising",label:"rising"},{value:"falling",label:"falling"}]}}],outputs:[{name:"table",label:"table",type:"table"}],run:t=>{const e=t.table,n=K(e,t.by,"by"),s=t.order==="falling"?-1:1,a=[...e.rows].sort((o,r)=>{const[i,l]=[o[n.name],r[n.name]];return i==null||l===null||l===void 0?tc(i,l):s*tc(i,l)});return{outputs:{table:{...e,rows:a}},settled:{by:n.name}}}},rv={name:"stack",title:"Stack",role:"step",shelf:"Tables",summary:"The rows of one table under the other's, with a column, from, that says which each came from.",inputs:[{name:"a",label:"first",type:"table"},{name:"b",label:"second",type:"table"},{name:"a-name",label:"first is",type:"text",initial:"first"},{name:"b-name",label:"second is",type:"text",initial:"second"}],outputs:[{name:"table",label:"table",type:"table"}],run:t=>{const[e,n]=[t.a,t.b],s=[{name:"from",kind:"text",key:!0}];for(const o of[...e.columns,...n.columns])s.some(r=>r.name===o.name)||s.push(o);const a=(o,r)=>o.rows.map(i=>Object.fromEntries(s.map(l=>[l.name,l.name==="from"?r:i[l.name]??null])));return{outputs:{table:{columns:s,rows:[...a(e,String(t["a-name"])),...a(n,String(t["b-name"]))],credits:gm(e,n)}}}}},nc=[["mean","mean"],["median","median"],["lowest","lowest"],["highest","highest"],["deviation","deviation"],["count","count"]],iv={name:"summary",title:"Sum up",role:"statistic",shelf:"Statistics",summary:"A column in a few figures: the mean, the median, the lowest and highest, the standard deviation, and how many.",inputs:[{name:"table",label:"table",type:"table"},{name:"column",label:"column",type:"text",optional:!0,editor:{kind:"column",of:"table",numeric:!0}}],outputs:[...nc.map(([t,e])=>({name:t,label:e,type:"number"})),{name:"table",label:"as a table",type:"table"}],run:t=>{const e=t.table,n=K(e,t.column,"column",{numeric:!0,measured:!0}),s=Ht(e.rows.map(o=>o[n.name]).filter(o=>typeof o=="number")),a={columns:[{name:"figure",kind:"text",key:!0},{name:n.name,kind:"number",...n.unit&&{unit:n.unit}}],rows:nc.map(([o])=>({figure:o,[n.name]:Number.isFinite(s[o])?s[o]:null})),...e.credits&&{credits:e.credits}};return{outputs:{...s,table:a},said:`mean ${te(s.mean)}${n.unit?` ${n.unit}`:""} of ${s.count}`,settled:{column:n.name}}}},lv={name:"top",title:"Top rows",role:"step",shelf:"Tables",summary:"The rows with the most of a column, or the least, as many as asked: of the whole table, or of each group of rows that share a column.",inputs:[{name:"table",label:"table",type:"table"},{name:"by",label:"by",type:"text",optional:!0,editor:{kind:"column",of:"table",numeric:!0}},{name:"count",label:"how many",type:"number",initial:10,editor:{kind:"number",min:1,max:100,step:1}},{name:"end",label:"with the",type:"text",initial:"highest",editor:{kind:"choice",choices:[{value:"highest",label:"most"},{value:"lowest",label:"least"}]}},{name:"per",label:"in each",type:"text",optional:!0,editor:{kind:"column",of:"table"},hint:"as many from each group of rows that share this column, a group after another; from the whole table when left empty"}],outputs:[{name:"table",label:"table",type:"table"}],run:t=>{const e=t.table,n=K(e,t.by,"by",{numeric:!0,measured:!0}),s=t.per?K(e,t.per,"in each"):void 0,a=t.end==="lowest"?1:-1,o=Math.max(0,Math.round(Number(t.count))),r=new Map;for(const l of e.rows.filter(h=>typeof h[n.name]=="number")){const h=s&&l[s.name];r.set(h,[...r.get(h)??[],l])}const i=[...r.entries()].sort(([l],[h])=>pm(l,h)).flatMap(([,l])=>[...l].sort((h,c)=>a*(Number(h[n.name])-Number(c[n.name]))).slice(0,o));return{outputs:{table:{...e,rows:i}},settled:{by:n.name}}}},sc=t=>`${t>0?"+":""}${te(t)}`,hv={name:"trend",title:"Trend",role:"statistic",shelf:"Statistics",summary:"Which way a column goes along another, most often the years: the slope of the line fitted through it, a step and ten steps of x.",inputs:[{name:"table",label:"table",type:"table"},{name:"x",label:"along",type:"text",optional:!0,editor:{kind:"column",of:"table",numeric:!0}},{name:"y",label:"of",type:"text",optional:!0,editor:{kind:"column",of:"table",numeric:!0}}],outputs:[{name:"per-ten",label:"for each ten",type:"number"},{name:"slope",label:"for each one",type:"number"},{name:"change",label:"over it all",type:"number"}],run:t=>{const e=t.table,n=K(e,t.x??(e.columns.some(c=>c.name==="year")?"year":void 0),"along",{numeric:!0}),s=K(e,t.y,"of",{numeric:!0,measured:!0,besides:[n.name]}),{xs:a,ys:o}=ho(e,n.name,s.name),r=za(a,o);if(!Number.isFinite(r.slope))throw new Error(`a trend needs at least two different ${n.name}s with a ${s.name}`);const i=r.slope*10,l=s.unit?` ${s.unit}`:"",h=n.name==="year"?`${sc(i)}${l} a decade`:`${sc(i)}${l} for each ten of ${n.name}`;return{outputs:{"per-ten":i,slope:r.slope,change:r.slope*(Math.max(...a)-Math.min(...a))},said:h,settled:{x:n.name,y:s.name}}}},cv=t=>t.includes("	")?"	":t.includes(";")?";":",",dv={name:"your-data",title:"Your numbers",role:"source",shelf:"Tables",summary:"A table you paste as text, a first line of names, then a line a row: your own numbers, beside the site's.",inputs:[{name:"text",label:"",type:"text",initial:`year, value
2024, 1
2025, 2`,editor:{kind:"text",lines:5}}],outputs:[{name:"table",label:"table",type:"table"}],run:t=>{const e=String(t.text??"").split(/\r?\n/).filter(u=>u.trim()!==""),[n,...s]=e;if(!n)throw new Error("paste a table: a first line of names, then a line a row");const a=cv(n),o=a!==",",r=n.split(a).map((u,m)=>u.trim()||`column${m+1}`),i=s.map(u=>u.split(a).map(m=>m.trim())),l=u=>Number(o?u.replace(",","."):u),h=r.map((u,m)=>i.every(f=>(f[m]??"")===""||Number.isFinite(l(f[m]??"")))),c=r.map((u,m)=>({name:u,kind:h[m]?"number":"text"})),d=i.map(u=>Object.fromEntries(r.map((m,f)=>[m,(u[f]??"")===""?null:h[f]?l(u[f]??""):u[f]??""])));return{outputs:{table:{columns:c,rows:d,credits:[{said:"Your own numbers."}]}}}}},xm=[dv,ym,ov,lv,G0,wm,rv,z0,si,iv,fm,hv,J0,R0,Z0,km,Y0,av,tv,D0,Q0];function Ga(t,e,n){return e===n||t.types.get(e)?.becomes?.[n]!==void 0}function uv(t,e,n){const s=e.toLowerCase().split(/\s+/).filter(Boolean),a=[...t.kinds.values()].flatMap(i=>{const l=`${i.title} ${i.name} ${i.shelf} ${i.summary}`.toLowerCase();if(!s.every(c=>l.includes(c)))return[];if(!n)return[{kind:i}];if(n.side==="output"&&i.role==="dial")return[];const h=n.side==="output"?i.inputs.find(c=>Ga(t,n.type,c.type)):i.outputs.find(c=>Ga(t,c.type,n.type));return h?[{kind:i,pin:h.name}]:[]}),o=s.join(" "),r=i=>o===""?1:i.kind.title.toLowerCase().startsWith(o)?0:1;return a.map((i,l)=>({offer:i,at:l})).sort((i,l)=>r(i.offer)-r(l.offer)||i.at-l.at).map(({offer:i})=>i)}function mv(t){const e=new Set(xm.map(s=>s.shelf)),n=[...new Set(t.map(s=>s.kind.shelf))];return[...n.filter(s=>!e.has(s)),...n.filter(s=>e.has(s))]}function fv(t,e){const{kind:n}=t,s=(i,l)=>y("span",{class:"wb-menu-pin"},y("span",{class:"wb-dot",style:`--pin: var(${e.types.get(l)?.colour??"--dim"})`,"aria-hidden":"true"}),i),a=i=>i.flatMap((l,h)=>[...h>0?[", "]:[],s(l.label||l.name,l.type)]),o=n.outputs.length>0?["gives ",...a(n.outputs)]:n.role==="paint"?["paints on the board"]:[],r=n.role==="dial"?["turned by hand"]:n.inputs.length>0?["takes ",...a(n.inputs)]:["takes nothing"];return y("p",{class:"wb-menu-pins"},...r,...o.length>0?[" · ",...o]:[])}function pv(t,e){const n=s=>s.hint??(s.optional&&typeof s.editor=="object"&&s.editor.kind==="column"?"chosen for you when left empty":void 0);return y("ul",{class:"wb-menu-inputs"},...t.kind.inputs.map(s=>y("li",{},y("span",{class:"wb-dot",style:`--pin: var(${e.types.get(s.type)?.colour??"--dim"})`,"aria-hidden":"true"}),s.label||s.name,n(s)?` — ${n(s)}`:"")))}function Tm(t,e,n,s,a,o,r=()=>[]){const i=y("input",{type:"search",placeholder:s?`What does ${e.types.get(s.type)?.label??s.type} go ${s.side==="output"?"into":"come from"}?`:"Search for a node…","aria-label":"Search for a kind of node",spellcheck:!1}),l=y("ul",{role:"listbox","aria-label":"Kinds of node"}),h=y("div",{class:"wb-menu-about"}),c=n.height===void 0?"":` max-height: ${Math.round(n.height)}px;`,d=y("div",{class:n.side?"wb-menu side":"wb-menu",role:"dialog","aria-label":"Add a node",style:`left: ${Math.round(n.left)}px; top: ${Math.round(n.top)}px;${c}`},i,l,h);let u=[],m=0;const f=b=>{m=Math.max(0,Math.min(u.length-1,b));for(const $ of l.querySelectorAll("[role=option]"))$.setAttribute("aria-selected",String(Number($.dataset.at)===m));const k=u[m],x=k?r(k.kind):[],T=k&&n.side?[pv(k,e),...x.length>0?[y("p",{class:"wb-menu-seen"},`In the examples: ${x.join(", ")}.`)]:[]]:[];h.replaceChildren(...k?[y("p",{},k.kind.summary),fv(k,e),...T]:[y("p",{},"Nothing fits. Try other words.")]),l.querySelector(`[data-at="${m}"]`)?.scrollIntoView?.({block:"nearest"})},p=()=>{const b=uv(e,i.value,s),k=i.value.trim();u=k?b:mv(b).flatMap($=>b.filter(O=>O.kind.shelf===$));const x=[];let T="";u.forEach(($,O)=>{!k&&$.kind.shelf!==T&&(T=$.kind.shelf,x.push(y("li",{class:"wb-shelf",role:"presentation"},T))),x.push(y("li",{role:"option","data-at":O,"data-kind":$.kind.name,class:`wb-role-${$.kind.role}`},y("span",{class:"wb-glyph","aria-hidden":"true"}),y("span",{class:"wb-offer"},$.kind.title)))}),l.replaceChildren(...x),f(0)},w=()=>{d.remove(),t.ownerDocument.removeEventListener("pointerdown",v,!0),o()},g=b=>{const k=u[b];k&&(w(),a(k))},v=b=>{d.contains(b.target)||w()};return i.addEventListener("input",p),i.addEventListener("keydown",b=>{if(b.stopPropagation(),b.key==="ArrowDown")f(m+1);else if(b.key==="ArrowUp")f(m-1);else if(b.key==="Enter")g(m);else if(b.key==="Escape")w();else return;b.preventDefault()}),l.addEventListener("pointermove",b=>{const k=b.target.closest("[role=option]");k&&Number(k.dataset.at)!==m&&f(Number(k.dataset.at))}),d.addEventListener("wheel",b=>b.stopPropagation()),l.addEventListener("click",b=>{const k=b.target.closest("[role=option]");k&&g(Number(k.dataset.at))}),t.append(d),p(),i.focus(),t.ownerDocument.addEventListener("pointerdown",v,!0),w}const gv=/^[A-Za-z_][\w-]*$/,wv=/^[a-z][a-z0-9-]*$/,yv=/^([a-z][a-z0-9-]*):(.*)$/,bv=/^([A-Za-z_][\w-]*?)(?:\.([a-z][a-z0-9-]*))?$/,vv={n:`
`,'"':'"',"\\":"\\"},kv="a line names a kind of node, as in: heat = weather-months station: D5";function $v(t){const e=[];let n=0;for(;n<t.length;){const s=t[n]??"";if(/\s/.test(s))n+=1;else{if(s==="#")break;if(s==='"'){let a="";for(n+=1;t[n]!=='"';n+=1){if(n>=t.length)return"a quote is not closed";t[n]==="\\"?(n+=1,a+=vv[t[n]??""]??t[n]??""):a+=t[n]}n+=1,e.push({text:a,quoted:!0})}else{const a=n;for(;n<t.length&&!/[\s"]/.test(t[n]??"");)n+=1;e.push({text:t.slice(a,n),quoted:!1})}}}return e}function xv(t,e){const n=t[1]?.text==="="&&!t[1].quoted,s=n?t[0]:void 0;if(s&&(s.quoted||!gv.test(s.text)))return`${s.text} cannot name a node: a name is letters, digits and dashes`;const a=t[n?2:0];if(!a||a.quoted||!wv.test(a.text))return kv;let o=n?3:1;const r=t[o]?.quoted?t[o]?.text:void 0;r!==void 0&&(o+=1);const i=[];let l;for(;o<t.length;){const h=t[o];if(!h.quoted&&h.text==="@"){const[m,f]=[Number(t[o+1]?.text),Number(t[o+2]?.text)];if(!Number.isFinite(m)||!Number.isFinite(f)||o+3!==t.length)return"@ ends a line with where the node stands: @ 40 120";l={x:m,y:f};break}const c=h.quoted?null:yv.exec(h.text);if(!c)return`${h.text} is not an input and its value, as in: station: D5`;const d=c[2]??"",u=d!==""?{text:d,quoted:!1}:t[o+1];if(!u)return`${c[1]}: has no value`;i.push({name:c[1]??"",value:u}),o+=d!==""?1:2}return{line:e,...s&&{id:s.text},kind:a.text,...r!==void 0&&{title:r},args:i,...l&&{at:l}}}function Tv(t,e,n){const{text:s}=e;return t.type==="number"?Number.isFinite(Number(s))&&s.trim()!==""?Number(s):{problem:`${t.name} takes a number, not ${s}`}:t.type==="flag"?/^(yes|true|on)$/.test(s)?!0:/^(no|false|off)$/.test(s)?!1:{problem:`${t.name} takes yes or no, not ${s}`}:t.type==="text"?s:t.type==="value"?"later":{problem:`${t.name} takes ${n}, wired from a node: ${s} names none`}}function Mv(t,e){if(t==="text")return e;if(t==="flag")return/^(yes|true|on)$/.test(e);const n=Number(e);return t==="number"||Number.isFinite(n)&&e.trim()!==""?n:e}function Mn(t,e){const n=[],s=[],a=new Set;t.split(/\r?\n/).forEach((d,u)=>{const m=$v(d);if(Array.isArray(m)&&m.length===0)return;const f=typeof m=="string"?m:xv(m,u+1);typeof f=="string"?n.push({line:u+1,message:f}):f.id!==void 0&&a.has(f.id)?n.push({line:u+1,message:`${f.id} is the name of another node already`}):(f.id!==void 0&&a.add(f.id),s.push(f))});const o=s.map(d=>{if(d.id!==void 0)return d.id;let u=d.kind;for(let m=2;a.has(u);m+=1)u=`${d.kind}-${m}`;return a.add(u),u}),r=new Map(s.map((d,u)=>[o[u],e.kinds.get(d.kind)])),i=[],l=[],h=new Map,c=s.map((d,u)=>{const m=o[u],f=e.kinds.get(d.kind),p={};h.set(m,p);for(const{name:w,value:g}of d.args){const v=f?.inputs.find($=>$.name===w);if(f&&!v){n.push({line:d.line,message:`${d.kind} takes no ${w}`});continue}const b=g.quoted?null:bv.exec(g.text),k=b?.[1],x=typeof v?.editor=="object"&&(v.editor.kind==="column"||v.editor.kind==="text")&&b?.[2]===void 0;if(k!==void 0&&k!==m&&r.has(k)&&!x){const $=b?.[2]??r.get(k)?.outputs[0]?.name??"value",O=r.get(k)?.outputs.find(L=>L.name===$)?.type;if(!v||!O||Ga(e,O,v.type)){i.push({from:{node:k,pin:$},to:{node:m,pin:w}});continue}}if(!v){p[w]=g.text;continue}const T=Tv(v,g,e.types.get(v.type)?.label??v.type);T==="later"?l.push({node:m,pin:w,text:g.text}):typeof T=="object"?n.push({line:d.line,message:T.problem}):p[w]=T}return{id:m,kind:d.kind,x:d.at?.x??0,y:d.at?.y??0,...d.title!==void 0&&{title:d.title},values:p}});for(const{node:d,pin:u,text:m}of l){const f=i.find(g=>g.from.node===d),p=f?r.get(f.to.node)?.inputs.find(g=>g.name===f.to.pin)?.type:void 0,w=h.get(d);w&&(w[u]=Mv(p,m))}return n.sort((d,u)=>d.line-u.line),{blueprint:{nodes:c,wires:i},problems:n,placed:s.every(d=>d.at!==void 0)}}function Mm(t,e,n,s){const a=y("textarea",{class:"wb-text-area",spellcheck:!1,"aria-label":"The blueprint as text",rows:14});a.value=e;const o=y("ul",{class:"wb-problems","aria-live":"polite"}),r=y("button",{type:"button",class:"wb-apply"},"Apply"),i=y("button",{type:"button"},"Close"),l=y("button",{type:"button"},"Copy"),h=y("div",{class:"wb-text",role:"dialog","aria-label":"The blueprint as text"},y("p",{class:"wb-text-help"},"One node a line: ",y("code",{},'name = kind "Title" input: value'),". A value that names another node, or name.output, is a wire from it; @ x y says where it stands."),a,o,y("div",{class:"wb-text-buttons"},r,l,i)),c=()=>{const u=Mn(a.value,n);o.replaceChildren(...u.problems.map(m=>y("li",{},`line ${m.line}: ${m.message}`)))},d=()=>h.remove();return a.addEventListener("input",c),a.addEventListener("keydown",u=>{u.stopPropagation(),u.key==="Escape"&&d()}),r.addEventListener("click",()=>{d(),s(a.value)}),i.addEventListener("click",d),l.addEventListener("click",()=>{navigator.clipboard?.writeText(a.value).then(()=>{l.textContent="Copied"})}),t.append(h),c(),a.focus(),d}const Sv=40,Av=new Set(["below","at-most","above","at-least"]),Ev=new Set(["equals","differs"]);function Sm(t,e,n,s){const a=s?.get(t.id);if(a?.state!=="done"&&a?.state!=="failed")return;const o=n.kinds.get(t.kind)?.inputs.find(i=>i.name===e),r=a.inputs[e];if(!(!o||r===void 0))return o.type==="table"?r:n.types.get(o.type)?.becomes?.table?.(r)}function Ov(t,e,n,s){const a=Sm(t,e.of,n,s),o=s?.get(t.id),r=n.kinds.get(t.kind),i=t.values[e.column]??(o?.state==="done"?o.settled[e.column]:void 0),l=a?.columns.find(u=>u.name===i),h=String(t.values[e.test]??r?.inputs.find(u=>u.name===e.test)?.initial??"");if(!a||!l)return{kind:"text"};const c=a.rows.map(u=>u[l.name]).filter(u=>u!=null&&u!=="");if(Av.has(h)&&l.kind==="number"){const u=c,m=u.every(Number.isInteger);return u.length===0?{kind:"number"}:{kind:"number",min:Math.floor(Math.min(...u)),max:Math.ceil(Math.max(...u)),step:m?1:Number(((Math.max(...u)-Math.min(...u))/100).toPrecision(1))||1}}const d=[...new Set(c.map(String))].sort((u,m)=>u.localeCompare(m,void 0,{numeric:!0}));return Ev.has(h)&&d.length>0&&d.length<=Sv?{kind:"choice",choices:d.map(u=>({value:u,label:u}))}:{kind:"text"}}function Am(t,e,n,s,a){let o;try{o=typeof e.editor=="function"?e.editor(s):e.editor}catch{o=void 0}if(o?.kind==="values")return Ov(t,o,n,a);if(o?.kind==="column"){const i=(Sm(t,o.of,n,a)?.columns??[]).filter(c=>!o.numeric||c.kind==="number"),l=t.values[e.name],h=i.map(c=>({value:c.name,label:c.name}));return typeof l=="string"&&!h.some(c=>c.value===l)&&h.push({value:l,label:l}),{kind:"choice",choices:h}}return o||(e.type==="number"?{kind:"number"}:e.type==="flag"?{kind:"flag"}:{kind:"text"})}function Iv(t,e){return t.kind==="choice"?t.choices.find(n=>n.value===String(e))?.label??String(e):t.kind==="number"?t.show?t.show(Number(e)):te(Number(e)):t.kind==="flag"?e===!0?"yes":"no":String(e)}function Cv(t,e,n,s){const a=new Map(t.nodes.map(o=>[o.id,o]));return t.nodes.filter(o=>e.kinds.get(o.kind)?.role==="dial").map(o=>{const r=t.wires.filter(u=>u.from.node===o.id).map(u=>u.to),i=r[0],l=i&&a.get(i.node),h=l&&e.kinds.get(l.kind)?.inputs.find(u=>u.name===i.pin),c=l&&h?Am(l,h,e,n,s):{kind:"text"},d=o.values.value??0;return{node:o.id,label:o.title??h?.label??"dial",value:d,editor:c,said:Iv(c,d),targets:r}})}function jv(t){const e=new Map(t.nodes.map(i=>[i.id,0])),n=new Map;for(const{from:i,to:l}of t.wires)!e.has(i.node)||!e.has(l.node)||(e.set(l.node,(e.get(l.node)??0)+1),n.set(i.node,[...n.get(i.node)??[],l.node]));const s=new Map(t.nodes.map(i=>[i.id,i])),a=t.nodes.filter(i=>e.get(i.id)===0).map(i=>i.id),o=[];for(let i=a.shift();i!==void 0;i=a.shift()){const l=s.get(i);l&&o.push(l);for(const h of n.get(i)??[]){const c=(e.get(h)??0)-1;e.set(h,c),c===0&&a.push(h)}}const r=new Set(o);return{order:o,circled:t.nodes.filter(i=>!r.has(i))}}const Nv=t=>t===!0||t==="yes"||t==="true"||t==="on"||t===1;function ac(t,e){return t==="number"?Number(e):t==="flag"?Nv(e):t==="text"?String(e):e}const Em=(t,e)=>`${t}\0${e}`;function Lv(t,e,{into:n,kindOf:s},a,o){const r={},i=[];for(const l of e.inputs){const h=n.get(Em(t.id,l.name));if(h){const c=o.get(h.from.node);if(c?.state!=="done")return{result:{state:"blocked",by:h.from.node}};const d=s.get(h.from.node)?.outputs.find(m=>m.name===h.from.pin);if(!d)return{result:{state:"failed",inputs:r,message:`${h.from.node} gives no ${h.from.pin}`,key:[]}};const u=Pv(c.outputs[h.from.pin],d.type,l,a);if("refused"in u)return{result:{state:"failed",inputs:r,message:u.refused,key:[]}};r[l.name]=u.value}else t.values[l.name]!==void 0?r[l.name]=ac(l.type,t.values[l.name]):l.initial!==void 0?r[l.name]=ac(l.type,l.initial):l.optional||i.push(l.name)}return i.length>0?{result:{state:"missing",pins:i}}:{inputs:r}}function Pv(t,e,n,s){if(e===n.type)return{value:t};const a=s.types.get(e)?.becomes?.[n.type];if(a)return{value:a(t)};const o=r=>s.types.get(r)?.label??r;return{refused:`${o(e)} cannot go into ${n.label}, which takes ${o(n.type)}`}}const Fv=(t,e)=>t.length===e.length&&t.every((n,s)=>Object.is(n,e[s]));function Bv(t,e,n){if(e.said!==void 0)return e.said;const s=t.outputs[0];return s&&e.outputs&&s.name in e.outputs?n.types.get(s.type)?.describe(e.outputs[s.name])??"":e.painting?.caption??""}function ai(t,e,n,s){const a=new Map,o={into:new Map(t.wires.map(l=>[Em(l.to.node,l.to.pin),l])),kindOf:new Map(t.nodes.map(l=>[l.id,e.kinds.get(l.kind)]))},{order:r,circled:i}=jv(t);for(const l of i)a.set(l.id,{state:"failed",inputs:{},message:"it waits on itself, round a circle of wires",key:[]});for(const l of r){const h=e.kinds.get(l.kind);if(!h){a.set(l.id,{state:"unknown"});continue}const c=Lv(l,h,o,e,a);if("result"in c){a.set(l.id,c.result);continue}const{inputs:d}=c,u=[h,...h.inputs.map(f=>d[f.name])],m=s?.get(l.id);if((m?.state==="done"||m?.state==="failed")&&Fv(m.key,u)){a.set(l.id,m);continue}try{const f=h.run(d,n);a.set(l.id,{state:"done",inputs:d,outputs:f.outputs??{},painting:f.painting,settled:f.settled??{},said:Bv(h,f,e),key:u})}catch(f){f instanceof ro?a.set(l.id,{state:"waiting",path:f.path}):a.set(l.id,{state:"failed",inputs:d,message:f instanceof Error?f.message:String(f),key:u})}}return a}function xs(t,e){const n=new Set(t.nodes.map(a=>a.id));let s=e;for(let a=2;n.has(s);a+=1)s=`${e}-${a}`;return s}const Rv=/^[^\s"#@=:]+$/,Dv=/^-?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i,oc=t=>`"${t.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n")}"`;function Zo(t,e,{positions:n=!0}={}){const s=new Set(t.nodes.map(l=>l.id)),a=new Set(t.wires.map(l=>l.from.node)),o=new Map(t.nodes.map(l=>[l.id,e.kinds.get(l.kind)])),r=({node:l,pin:h},c)=>o.get(l)?.outputs[0]?.name===h&&!c?l:`${l}.${h}`,i=(l,h)=>typeof l=="boolean"?l?"yes":"no":typeof l=="number"?String(l):!Rv.test(l)||s.has(l)||s.has(l.split(".")[0]??"")||h!=="text"&&Dv.test(l)?oc(l):l;return t.nodes.map(l=>{const h=e.kinds.get(l.kind),c=new Map(t.wires.filter(p=>p.to.node===l.id).map(p=>[p.to.pin,p.from])),d=h?h.inputs.map(p=>p.name):[...new Set([...Object.keys(l.values),...c.keys()])],u=new Map(h?.inputs.map(p=>[p.name,p.type])),m=new Set(h?.inputs.filter(p=>typeof p.editor=="object"&&(p.editor.kind==="column"||p.editor.kind==="text")).map(p=>p.name)),f=d.flatMap(p=>{const w=c.get(p);if(w)return[`${p}: ${r(w,m.has(p))}`];const g=l.values[p];return g===void 0?[]:[`${p}: ${i(g,u.get(p))}`]});return[a.has(l.id)?`${l.id} =`:"",l.kind,l.title!==void 0?oc(l.title):"",...f,n?`@ ${Math.round(l.x)} ${Math.round(l.y)}`:""].filter(Boolean).join(" ")}).join(`
`)}const Wv=8,Hv=new Set(["text","flag","value"]);function qv(t,e){const n=new Set([e]);for(let s=!0;s;){s=!1;for(const a of t.wires)n.has(a.from.node)!==n.has(a.to.node)&&(n.add(a.from.node),n.add(a.to.node),s=!0)}return n}const zv=2;function Gv(t,e,n,s,a,o){const r=new Set(t.columns.filter(l=>l.key).map(l=>l.name)),i=qv(n,s);return n.nodes.flatMap(l=>{const h=o.get(l.id),c=a.kinds.get(l.kind),d=c?.outputs.find(f=>f.type==="table");if(i.has(l.id)||!c||!d||h?.state!=="done")return[];const u=new Set((h.outputs[d.name]?.columns??[]).filter(f=>f.key).map(f=>f.name)),m=[...u].filter(f=>r.has(f)).length;return m===0||m<u.size&&m<r.size?[]:[{shared:m,suggestion:{label:`Join with ${l.title??c.title}`,kind:"join",from:e,into:"left",values:{},also:{from:{node:l.id,pin:d.name},into:"right"}}}]}).sort((l,h)=>h.shared-l.shared).slice(0,zv).map(({suggestion:l})=>l)}function _v(t,e,n,s,a,o){const r=(C,B,W)=>a.kinds.has(B)?[{label:C,kind:B,from:e,into:"table",values:W}]:[],i=C=>t.columns.find(B=>B.name===C),l=C=>i(C)?.key===!0,h=t.columns.filter(C=>C.key),c=h.filter(C=>C.kind==="number").map(C=>C.name),d=h.filter(C=>C.kind!=="number").map(C=>C.name),u=t.columns.filter(C=>!C.key&&C.kind==="number"),m=u[0]?.name,f=(t.credits?.length??0)>=2,p=u.filter(C=>C.name!==m&&C.unit&&C.unit!==u[0]?.unit),w=(f?u.find(C=>C.joined&&C.name!==m)??p.at(-1):p[0])?.name,g=i("whole")!==void 0,v=g&&t.rows.some(C=>C.whole==="no")?r("Only what was measured whole","keep",{column:"whole",is:"equals",value:"yes"}):[],[b,k]=c,x=d[0],T=c.includes("month")?"month":b,$=m?c.length===1&&b==="year"&&d.length===0?r(`Bars of ${m}, year by year`,"bars",{x:"year",y:m,...g&&{faded:"whole"}}):c.length===1&&b&&d.length<=1?r(`Lines of ${m} along ${b}${x?`, a line a ${x}`:""}`,"lines",{x:b,y:m,...x&&{split:x}}):c.length===2&&T&&b&&k?r(`Heat map of ${m}: ${T} by ${T===b?k:b}`,"heatmap",{x:T,y:T===b?k:b,value:m}):[]:[],O=m&&i("year")?r(`Trend of ${m}`,"trend",{x:"year",y:m}):[],L=C=>h.some(B=>!C.includes(B.name)),F=l("season")?"season":void 0,N=m?[...l("year")&&L(["year"])?r(`Mean of ${m} by year`,"group",{by:"year",value:m,how:"mean"}):[],...l("hour")&&L(["hour",...F?[F]:[]])?r(`Mean of ${m} by hour${F?` and ${F}`:""}`,"group",{by:"hour",...F&&{and:F},value:m,how:"mean"}):[],...l("month")&&l("year")?r(`Mean of ${m} by month`,"group",{by:"month",value:m,how:"mean"}):[]]:[],j=s.kind==="season"?String(s.values.by??"month"):void 0,S=!m||!l("month")||!l("year")?[]:j==="month"?r("Take the years out too","season",{by:"year"}):j?[]:r("Take the season out","season",{by:"month"}),A=m&&w?[...r(`Correlation of ${m} and ${w}`,"correlation",{x:w,y:m}),...r(`Scatter: ${m} against ${w}`,"scatter",{x:w,y:m})]:[],I=Gv(t,e,n,s.id,a,o),D=[...m?r(`Summary of ${m}`,"summary",{column:m}):[],...m?r(`The ten with the most ${m}`,"top",{by:m,count:10}):[],...m&&t.rows.length>=30?r(`Histogram of ${m}`,"histogram",{column:m}):[],...r("Show the table","show-table",{})];return f?[...v,...A,...S,...I,...$,...O,...N,...D]:[...v,...I,...$,...O,...N,...S,...A,...D]}const Qo=["paint","statistic","step"];function Uv(t,e){if(Hv.has(t.type))return[];const n=s=>Qo.includes(s)?Qo.indexOf(s):Qo.length;return[...e.kinds.values()].filter(s=>s.inputs[0]?.type===t.type&&s.role!=="dial").sort((s,a)=>n(s.role)-n(a.role)).map(s=>({label:s.title,kind:s.name,from:t.name,into:s.inputs[0]?.name??"",values:{}}))}function Yv(t,e,n,s){const a=t.nodes.find(i=>i.id===e),o=a&&n.kinds.get(a.kind),r=s.get(e);return!o||r?.state!=="done"?[]:o.outputs.flatMap(i=>{if(!(i.name in r.outputs))return[];const l=r.outputs[i.name];return i.type==="table"?_v(l,i.name,t,a,n,s):i.type==="number"?[{label:`On the board: ${i.label}`,kind:"readout",from:i.name,into:"value",values:{}}]:Uv(i,n)}).slice(0,Wv)}function Om(t){const e=new Map,n=new Map;for(const{from:o,to:r}of t.wires)e.set(r.node,[...e.get(r.node)??[],o.node]),n.set(o.node,[...n.get(o.node)??[],r.node]);const s=new Map,a=(o,r)=>{const i=s.get(o);if(i!==void 0)return i;const l=(e.get(o)??[]).filter(c=>!r.has(c)),h=l.length===0?0:1+Math.max(...l.map(c=>a(c,new Set([...r,o]))));return s.set(o,h),h};for(const o of t.nodes)a(o.id,new Set);for(const o of t.nodes){const r=n.get(o.id)??[];(e.get(o.id)??[]).length===0&&r.length>0&&s.set(o.id,Math.max(0,Math.min(...r.map(i=>s.get(i)??0))-1))}return s}const re={width:236,dial:176,header:30,row:26,foot:22},rc=t=>typeof t.editor=="object"&&t.editor.kind==="text"?t.editor.lines??1:1;function fe(t){const e=new Map,n=new Map,s=new Map,a=t?.role==="dial"?re.dial:re.width;let o=re.header;for(const r of t?.outputs??[])e.set(r.name,{x:a,y:o+re.row/2}),o+=re.row;for(const r of t?.inputs??[])n.set(r.name,{x:0,y:o+re.row/2}),s.set(r.name,rc(r)),o+=re.row*rc(r);return{width:a,height:o+re.foot,inputs:n,outputs:e,rows:s}}const ic=40,Jv=80,Kv=20,Vv=2;function oi(t,e){const n=new Map(t.nodes.map(u=>[u.id,fe(e.kinds.get(u.kind))])),s=Om(t),a=new Map(t.nodes.map((u,m)=>[u.id,m])),o=[...new Set(s.values())].sort((u,m)=>u-m),r=u=>t.nodes.filter(m=>s.get(m.id)===u).map(m=>m.id),i=new Map,l=(u,m)=>{const f=t.wires.flatMap(({from:p,to:w})=>{const[g,v]=m==="upstream"?[w,p]:[p,w];if(g.node!==u||!i.has(v.node))return[];const b=n.get(v.node)?.[m==="upstream"?"outputs":"inputs"].get(v.pin)?.y??0,k=n.get(u)?.[m==="upstream"?"inputs":"outputs"].get(g.pin)?.y??0;return[(i.get(v.node)??0)+b-k]});return f.length>0?f.reduce((p,w)=>p+w,0)/f.length:void 0},h=(u,m)=>{const f=u.map(w=>({id:w,wish:l(w,m)??i.get(w)}));f.sort((w,g)=>(w.wish??1/0)-(g.wish??1/0)||(a.get(w.id)??0)-(a.get(g.id)??0));let p=-1/0;for(const{id:w,wish:g}of f){const v=Math.max(g??p,p);i.set(w,Number.isFinite(v)?v:0),p=(i.get(w)??0)+(n.get(w)?.height??0)+Kv}};for(const u of o)h(r(u),"upstream");for(let u=0;u<Vv;u+=1){for(const m of[...o].reverse())h(r(m),"downstream");for(const m of o)h(r(m),"upstream")}const c=Math.min(...i.values()),d=u=>({...u,x:ic+(s.get(u.id)??0)*(re.width+Jv),y:Math.round((i.get(u.id)??0)-c+ic)});return{...t,nodes:t.nodes.map(d)}}function co(t,e){return{...t,nodes:[...t.nodes,e]}}function Ki(t,e,n,s){return{...t,nodes:t.nodes.map(a=>{if(a.id!==e)return a;const{[n]:o,...r}=a.values;return{...a,values:s===void 0?r:{...r,[n]:s}}})}}function ws(t,e){const n=({to:a})=>a.node===e.to.node&&a.pin===e.to.pin,s=t.wires.some(n);return{...t,wires:s?t.wires.map(a=>n(a)?e:a):[...t.wires,e]}}function Xv(t,e,n,s,a,o){const r=t.nodes.find(c=>c.id===n),i=r&&e.kinds.get(r.kind)?.inputs.find(c=>c.name===s);if(!r||!i)return null;const l=r.values[s]??a??i.initial??(i.type==="number"?0:i.type==="flag"?!1:""),h={id:xs(t,s.replace(/[^\w-]/g,"")||"dial"),kind:"dial",x:o.x,y:o.y,title:i.label||s,values:{value:l}};return{blueprint:ws(Ki(co(t,h),n,s,void 0),{from:{node:h.id,pin:"value"},to:{node:n,pin:s}}),dial:h.id}}function Zv(t,e,n,s){const a={id:xs(t,n.kind),kind:n.kind,x:s.x,y:s.y,values:n.values},o=ws(co(t,a),{from:{node:e,pin:n.from},to:{node:a.id,pin:n.into}});return{blueprint:n.also?ws(o,{from:n.also.from,to:{node:a.id,pin:n.also.into}}):o,added:a.id}}function Qv(t,e,n){return t.nodes.filter(s=>e.kinds.get(s.kind)?.role==="paint").map(s=>{const a=n.get(s.id),o=s.title??e.kinds.get(s.kind)?.title??s.kind;return a?.state==="done"&&a.painting?{node:s.id,title:o,painting:a.painting}:a?.state==="failed"?{node:s.id,title:o,problem:a.message}:a?.state==="missing"?{node:s.id,title:o,problem:`Wire a ${a.pins.join(" and a ")} into it.`}:{node:s.id,title:o,waiting:!0}})}const ek=900;class lc{constructor(e){this.present=e}present;past=[];future=[];last=null;get now(){return this.present}get canUndo(){return this.past.length>0}get canRedo(){return this.future.length>0}push(e,n,s=Date.now()){n!==void 0&&this.last?.key===n&&s-this.last.at<ek||this.past.push(this.present),this.present=e,this.future=[],this.last=n===void 0?null:{key:n,at:s}}undo(){const e=this.past.pop();return e!==void 0&&(this.future.push(this.present),this.present=e),this.last=null,this.present}redo(){const e=this.future.pop();return e!==void 0&&(this.past.push(this.present),this.present=e),this.last=null,this.present}}const hc="As you left it: your changes are kept in this browser. Reset goes back to the page's own.",tk={title:"",slug:"",about:"",text:""};class Im{constructor(e,n,s={positions:!0}){this.setting=e,this.drawn=n,this.kept=s,this.example=e.start?.example??e.examples[0]??tk,this.original=this.laidOut(this.example.text);const a=e.start?.text??e.own.get(this.example);this.history=new lc(a?this.laidOut(a):this.original),this.notice=e.start?.said??(a?hc:""),this.still=this.example===e.examples[0]&&!a?e.stillBoard:void 0,this.stopListening=e.files.listen(()=>this.schedule())}setting;drawn;kept;example;original;evaluation=new Map;runs=new Map;still;ran=!1;notice;history;scheduled=!1;stopped=!1;awake=!1;stopListening;get now(){return this.history.now}get own(){return this.history.now!==this.original}get canUndo(){return this.history.canUndo}get canRedo(){return this.history.canRedo}open(e){if(e===this.example)return!1;this.example=e,this.original=this.laidOut(e.text),this.still=void 0,this.evaluation=new Map,this.runs.clear();const n=this.setting.own.get(e);return this.history=new lc(n?this.laidOut(n):this.original),this.notice=n?hc:`Opened here: ${e.title}`,this.changed(),this.setting.opened?.(e),this.wake(),!0}ask(e){this.edit(this.laidOut(e)),this.notice="Written by an agent. Undo, or Reset, goes back.",this.wake()}wake(){this.awake=!0,this.schedule()}stop(){this.stopped=!0,this.stopListening()}laidOut(e){const{blueprint:n,placed:s}=Mn(e,this.setting.kit);return s?n:oi(n,this.setting.kit)}edit(e,n){this.history.push(e,n),this.notice="",this.changed()}undo(){this.history.undo(),this.changed()}redo(){this.history.redo(),this.changed()}reset(){this.history.push(this.original),this.notice="Back to the blueprint as the page wrote it.",this.changed()}write(e,n,s,a){this.edit(Ki(this.history.now,e,n,s),a?void 0:`${e}\0${n}`)}add(e,n){const s={id:xs(this.history.now,e),kind:e,x:n.x,y:n.y,values:{}};return this.edit(co(this.history.now,s)),s.id}follow(e,n,s){const{blueprint:a,added:o}=Zv(this.history.now,e,n,s);return this.edit(a),o}promote(e,n,s){const a=this.evaluation.get(e),o=Xv(this.history.now,this.setting.kit,e,n,a?.state==="done"?a.settled[n]:void 0,s);return o&&this.edit(o.blueprint),o?.dial??null}text(){return Zo(this.history.now,this.setting.kit,{positions:!1})}link(){return this.setting.linkTo(this.example,Zo(this.history.now,this.setting.kit,this.kept))}dials(){return Cv(this.history.now,this.setting.kit,this.setting.files.read,this.evaluation)}cards(){return Qv(this.history.now,this.setting.kit,this.evaluation)}editorsOf(e){const{kit:n,files:s}=this.setting;return new Map((n.kinds.get(e.kind)?.inputs??[]).map(a=>[a.name,Am(e,a,n,s.read,this.evaluation)]))}nextFor(e){const{kit:n}=this.setting;return Yv(this.history.now,e,n,this.evaluation).filter(s=>this.offers(n.kinds.get(s.kind)))}offers(e){return e!==void 0&&(e.flag===void 0||this.setting.isOn?.(e.flag)===!0)}changed(){const e=this.history.now;this.setting.own.set(this.example,e===this.original?null:Zo(e,this.setting.kit,this.kept)),this.drawn(),this.schedule()}schedule(){this.scheduled||this.stopped||!this.awake||(this.scheduled=!0,setTimeout(()=>{if(this.scheduled=!1,this.stopped)return;const e=this.evaluation;this.evaluation=ai(this.history.now,this.setting.kit,{read:this.setting.files.read},e);for(const[n,s]of this.evaluation)s.state==="done"&&s!==e.get(n)&&this.runs.set(n,(this.runs.get(n)??0)+1);this.ran||=[...this.evaluation.values()].every(n=>n.state!=="waiting"),this.drawn()},0))}}const ae={module:180,pad:32,row:70,channel:40,lane:10,port:7,curve:7};function Gt(t,e){return t?t.state==="done"?{said:t.said,trouble:!1}:t.state==="failed"?{said:t.message,trouble:!0}:t.state==="waiting"?{said:"fetching its data…",trouble:!1}:t.state==="blocked"?{said:`waits for ${t.by}`,trouble:!1}:t.state==="missing"?{said:`wire or write: ${t.pins.join(", ")}`,trouble:!0}:{said:`there is no kind of node called ${e}`,trouble:!0}:{said:"",trouble:!1}}const cc={source:"SRC",step:"STEP",statistic:"STAT",paint:"VIEW",dial:"DIAL",note:"NOTE"},nk=5,sk=/[−-]?\d+(?:\.\d+)?/;function ak(t,e,n){const s=e.kinds.get(t.kind);if(n?.state==="unknown"||!s)return"???";if(n?.state==="failed")return"ERR";if(n?.state==="missing")return"---";if(n?.state!=="done")return"···";if(s.role==="dial"){const o=String(t.values.value??"");return o!==""&&o.length<=nk?o:cc.dial}const a=s.outputs.flatMap(o=>o.name in n.outputs?[e.types.get(o.type)?.describe(n.outputs[o.name])??""]:[]);for(const o of[...a,n.said]){const r=sk.exec(o)?.[0];if(r)return r}return cc[s.role]}const pn=t=>Math.round(t*10)/10,ra=({x:t,y:e})=>`${pn(t)} ${pn(e)}`,dc=(t,e)=>pn(t.x)===pn(e.x)&&pn(t.y)===pn(e.y),ri=(t,e)=>Math.hypot(e.x-t.x,e.y-t.y),uc=(t,e,n)=>{const s=ri(t,e)||1;return{x:t.x+(e.x-t.x)*n/s,y:t.y+(e.y-t.y)*n/s}},ok=(t,e,n)=>Math.abs((e.x-t.x)*(n.y-e.y)-(e.y-t.y)*(n.x-e.x))>1e-6;function rk(t,e){const n=t.filter((h,c)=>c===0||!dc(h,t[c-1])),s=n.filter((h,c)=>c===0||c===n.length-1||ok(n[c-1],h,n[c+1])),[a,...o]=s;if(!a||o.length===0)return"";const r=[`M${ra(a)}`];let i=a;const l=h=>{dc(i,h)||r.push(`L${ra(h)}`),i=h};return o.forEach((h,c)=>{const d=s[c],u=o[c+1];if(!u)return l(h);const m=Math.min(e,ri(d,h)/2,ri(h,u)/2);l(uc(h,d,m)),i=uc(h,u,m),r.push(`Q${ra(h)} ${ra(i)}`)}),r.join(" ")}const ik=2,ia=12,mc=t=>t.length>0?t.reduce((e,n)=>e+n,0)/t.length:void 0,er=t=>`${t.from.node}\0${t.from.pin}`;function lk(t){const e=Om(t),n=new Map(t.nodes.map((S,A)=>[S.id,A])),s=t.wires.filter(S=>n.has(S.from.node)&&n.has(S.to.node)),a=S=>e.get(S)??0,o=S=>a(S.to.node)>a(S.from.node),r=new Map,i=new Map,l=new Map,h=(S,A)=>{i.get(A)?.includes(S)||(i.set(A,[...i.get(A)??[],S]),l.set(S,[...l.get(S)??[],A]))};for(const S of s){const A=er(S),I=r.get(A)??{key:A,node:S.from.node,wires:[],passes:new Map};if(r.set(A,I),I.wires.push(S),!o(S))continue;let D=S.from.node;for(let C=a(S.from.node)+1;C<a(S.to.node);C+=1){const B=I.passes.get(C)??`\0${A}\0${C}`;I.passes.has(C)||(I.passes.set(C,B),e.set(B,C),n.set(B,n.size)),h(D,B),D=B}h(D,S.to.node)}const c=[...new Set([...n.keys()].map(a))].sort((S,A)=>S-A),d=S=>[...n.keys()].filter(A=>a(A)===S),u=new Map,m=(S,A)=>{const I=d(S).map(C=>({id:C,wish:mc((A.get(C)??[]).flatMap(B=>u.has(B)?[u.get(B)]:[]))??u.get(C)}));I.sort((C,B)=>(C.wish??1/0)-(B.wish??1/0)||(n.get(C.id)??0)-(n.get(B.id)??0));let D=0;for(const{id:C,wish:B}of I){const W=Math.max(B===void 0?D:Math.ceil(B-.5),D);u.set(C,W),D=W+1}};for(const S of c)m(S,i);for(let S=0;S<ik;S+=1){for(const A of[...c].reverse())m(A,l);for(const A of c)m(A,i)}const f=[...new Set(u.values())].sort((S,A)=>S-A),p=S=>f.indexOf(u.get(S)??0),w=S=>p(S)*ae.row+ae.pad/2,g=new Map;for(const S of t.nodes)[...r.values()].filter(I=>I.node===S.id).forEach((I,D)=>g.set(I.key,w(S.id)+Math.ceil(D/2)*(D%2===1?1:-1)*ae.port));const v=(S,A)=>A-1===a(S.node)?g.get(S.key)??0:w(S.passes.get(A-1)??S.node),b=new Map;for(const S of t.nodes){const A=w(S.id),I=s.filter(W=>W.to.node===S.id&&o(W)).map(W=>({wire:W,from:v(r.get(er(W)),a(S.id))})),D=Math.floor((ae.pad/2-2)/ae.port),[C,B]=[I.filter(({from:W})=>W<A).sort((W,z)=>z.from-W.from),I.filter(({from:W})=>W>A).sort((W,z)=>W.from-z.from)];for(const{wire:W}of I.filter(({from:z})=>z===A))b.set(W,A);C.forEach(({wire:W},z)=>b.set(W,A-Math.min(z+1,D)*ae.port)),B.forEach(({wire:W},z)=>b.set(W,A+Math.min(z+1,D)*ae.port))}const k=(S,A)=>[...S.wires.filter(I=>o(I)&&a(I.to.node)===A+1).map(I=>b.get(I)??0),...S.passes.has(A+1)?[w(S.passes.get(A+1))]:[]],x=new Map;for(const S of c){const A=[...r.values()].flatMap(C=>{const[B,W]=[v(C,S+1),k(C,S)];return(S===a(C.node)||C.passes.has(S))&&W.some(de=>de!==B)?[{key:C.key,from:B,rises:(mc(W)??B)<B}]:[]}),[I,D]=[A.filter(C=>C.rises).sort((C,B)=>C.from-B.from),A.filter(C=>!C.rises).sort((C,B)=>B.from-C.from)];x.set(S,[...I,...D].map(C=>C.key))}const T=new Map;let $=0;for(const S of c)T.set(S,$),$+=ae.module+Math.max(ae.channel,((x.get(S)?.length??0)+1)*ae.lane);const O=S=>T.get(S)??0,L=S=>O(S+1)-O(S)-ae.module,F=(S,A)=>{const I=x.get(A)??[];return O(A)+ae.module+(I.indexOf(S.key)+1)*L(A)/(I.length+1)},N=s.map(S=>{const A=r.get(er(S)),[I,D]=[a(S.from.node),a(S.to.node)],C={x:O(I)+ae.module,y:g.get(A.key)??w(S.from.node)};if(!o(S)){const[z,de]=[{x:O(D),y:w(S.to.node)},p(S.to.node)*ae.row-(ae.row-ae.pad)/2];return{wire:S,points:[C,{x:C.x+ia,y:C.y},{x:C.x+ia,y:de},{x:z.x-ia,y:de},{x:z.x-ia,y:z.y},z]}}const B=[C];let W=C.y;for(let z=I;z<D;z+=1){const de=z+1===D?b.get(S)??W:w(A.passes.get(z+1));de!==W&&B.push({x:F(A,z),y:W},{x:F(A,z),y:de}),W=de}return{wire:S,points:[...B,{x:O(D),y:W}]}}),j=t.nodes.map(S=>({id:S.id,column:c.indexOf(a(S.id)),row:p(S.id),x:O(a(S.id)),y:p(S.id)*ae.row}));return{width:j.length>0?Math.max(...j.map(S=>S.x))+ae.module:0,height:f.length*ae.row,modules:j,conduits:N}}function hk({blueprint:t,kit:e,evaluation:n,chosen:s=null,pointed:a=null,runs:o=new Map,set:r=new Map}){const i=lk(t),l=new Map(i.modules.map(g=>[g.id,g])),h=new Map(t.nodes.map(g=>[g.id,g])),c=new Set(i.conduits.map(({wire:g})=>g.to.node)),d=new Set(i.conduits.map(({wire:g})=>g.from.node)),u=g=>o.get(g)?`${o.get(g)%2}`:null,m=i.conduits.map(({wire:g,points:v})=>{const b=h.get(g.from.node),k=e.kinds.get(b?.kind??"")?.outputs.find($=>$.name===g.from.pin)?.type??"value",x=rk(v,ae.curve),T=["lc-conduit",n.get(g.from.node)?.state==="done"?"":"idle",u(g.from.node)?`flow-${u(g.from.node)}`:"",s!==null&&(g.from.node===s||g.to.node===s)?"near":""];return P("g",{class:T.filter(Boolean).join(" "),"data-key":`wire:${g.to.node}.${g.to.pin}`,style:`--pin: var(${e.types.get(k)?.colour??"--dim"}); --lc-step: ${l.get(g.from.node)?.column??0}`},P("path",{class:"lc-line",d:x}),P("path",{class:"lc-pulse",d:x,pathLength:100}))}),f=t.nodes.map(g=>{const v=e.kinds.get(g.kind),b=n.get(g.id),k=Gt(b,g.kind),x=l.get(g.id),$=[g.title!==void 0&&v!==void 0&&g.title!==v.title||v?.role==="dial"?v?.title:"",r.get(g.id)??k.said].filter(Boolean).join(" · "),O=["lc-module",`lc-role-${v?.role??"unknown"}`,c.has(g.id)?"":"begins",d.has(g.id)?"":"ends",g.id===s?"chosen":"",g.id===a?"pointed":"",k.trouble?"trouble":"",b?.state==="waiting"?"waiting":"",b?.state==="done"||k.trouble?"":"idle",u(g.id)?`ran-${u(g.id)}`:""];return P("button",{type:"button",class:O.filter(Boolean).join(" "),"data-key":`node:${g.id}`,"data-node":g.id,"aria-pressed":g.id===s?"true":"false",title:v?.summary??`There is no kind of node called ${g.kind}.`,style:`left: ${x?.x??0}px; top: ${x?.y??0}px; --lc-step: ${x?.column??0}`},P("span",{class:"lc-pad"},P("span",{class:"lc-code"},ak(g,e,b)),P("span",{class:"lc-name"},P("b",{},g.title??v?.title??g.kind))),P("span",{class:"lc-said"},$))}),[p,w]=[i.width,i.height];return P("div",{class:s!==null?"lc-world tracing":"lc-world",style:`width: ${p}px; height: ${w}px`},P("svg",{class:"lc-conduits",width:p,height:w,viewBox:`0 0 ${p} ${w}`,"aria-hidden":"true"},m),f).html}const ck=8;function dk(t){const e=t.columns.filter(n=>n.about);return e.length>0?P("ul",{class:"bp-peek-columns"},e.map(n=>P("li",{},P("strong",{},n.name),` ${n.about}`))):null}function Cm(t,e,n){const s=n.types.get(e),a=P("p",{class:"bp-peek-said"},`${s?.label??e}: ${s?s.describe(t):String(t)}`),o=e==="table"?void 0:s?.becomes?.table,r=e==="table"?t:o?o(t):void 0;return P("div",{class:"bp-peek"},a,o?P("p",{},`Wherever ${n.types.get("table")?.label??"a table"} is taken, it is this one:`):null,r?$m(r,ck):null,r?dk(r):null)}const uk=new Set(["number","text","flag"]);class mk{constructor(e,n){this.kit=e,this.hands=n;const s=y("button",{type:"button",class:"lc-remove",title:"Take this module out of the blueprint (Delete)"},"Remove");s.addEventListener("click",()=>this.shown&&this.hands.remove(this.shown.id)),this.element=y("section",{class:"lc-deck lc-query","aria-label":"The module chosen",hidden:!0},y("p",{class:"lc-deck-head"},y("span",{class:"lc-deck-name"},"Query"),this.title,this.kindSaid,s),y("div",{class:"lc-query-body"},y("div",{class:"lc-query-what"},this.summary,this.said),this.takes,this.gives),this.next)}kit;hands;element;title=y("span",{class:"lc-query-name"});kindSaid=y("span",{class:"lc-query-kind"});summary=y("p",{class:"lc-query-summary"});said=y("p",{class:"lc-query-said"});takes=y("dl",{class:"lc-takes"});gives=y("dl",{class:"lc-gives"});next=y("div",{class:"lc-next",role:"toolbar","aria-label":"What could come next"});rows=new Map;shown=null;offered="";show(e){if(this.element.hidden=e===null,!e){this.shown=null;return}const{node:n,result:s}=e,a=this.kit.kinds.get(n.kind);(this.shown?.id!==n.id||this.shown.kind!==n.kind)&&this.build(n);const o=Gt(s,n.kind);this.title.textContent=n.title??a?.title??n.kind,this.kindSaid.textContent=n.title!==void 0&&a&&n.title!==a.title?a.title:"",this.summary.textContent=a?.summary??`There is no kind of node called ${n.kind}.`,this.said.textContent=e.said??o.said,this.said.classList.toggle("trouble",o.trouble);const r=s?.state==="done"?s.settled:{};for(const i of a?.inputs??[]){const l=this.rows.get(i.name);if(!l)continue;const h=e.from.get(i.name),c=e.editors.get(i.name);l.row.classList.toggle("wired",h!==void 0),h?this.showFrom(l,h):c&&this.showControl(n,i,l,c,r[i.name])}this.showGives(e),this.showNext(e)}build(e){const n=this.kit.kinds.get(e.kind);this.shown={id:e.id,kind:e.kind},this.rows.clear(),this.offered="",this.takes.replaceChildren(...(n?.inputs??[]).map(s=>{const a=y("dd",{}),o=y("i",{class:"lc-port",style:`--pin: var(${this.kit.types.get(s.type)?.colour??"--dim"})`,"aria-hidden":"true"}),r=y("div",{class:"lc-take","data-pin":s.name,title:`${this.kit.types.get(s.type)?.label??s.type}${s.hint?` — ${s.hint}`:""}`},y("dt",{},o,s.label||s.name),a);return this.rows.set(s.name,{row:r,value:a,signature:"",control:null}),r})),this.next.replaceChildren()}showFrom(e,n){const s=`from:${n.node}:${n.said}`;if(e.signature===s)return;const a=y("button",{type:"button",class:"lc-from",title:"Go to the module it comes from"},n.said);a.addEventListener("click",()=>this.hands.go(n.node)),e.value.replaceChildren(a),e.control=null,e.signature=s}showControl(e,n,s,a,o){const r=JSON.stringify([a,o??null]),i=a.kind==="choice"||a.kind==="flag",l=e.values[n.name]??(i?n.initial:void 0);if(s.control&&s.signature===r)return s.control.show(l);if(s.control&&s.value.contains(s.value.ownerDocument.activeElement))return;const h=o??n.initial,c=Ui(a,l,{style:"inline",optional:n.optional===!0||!i&&n.initial!==void 0,...h!==void 0&&{settled:String(h)},label:n.label||n.name,changed:(m,f)=>this.hands.write(e.id,n.name,m,f)}),d=this.kit.kinds.get(e.kind)?.role,u=uk.has(n.type)&&d!=="dial"&&d!=="note"?y("button",{type:"button",class:"lc-promote",title:"Put it on the board, as a dial","aria-label":`Put ${n.label||n.name} on the board as a dial`},"Dial"):null;u?.addEventListener("click",()=>this.hands.promote(e.id,n.name)),s.value.replaceChildren(c.element,...u?[u]:[]),s.control=c,s.signature=r}showGives({node:e,result:n}){const a=(this.kit.kinds.get(e.kind)?.outputs??[]).map(o=>{const r=n?.state==="done"&&o.name in n.outputs?Cm(n.outputs[o.name],o.type,this.kit):P("p",{class:"bp-peek-said"},Gt(n,e.kind).said||"It has not run yet."),i=P("i",{class:"lc-port",style:`--pin: var(${this.kit.types.get(o.type)?.colour??"--dim"})`,"aria-hidden":"true"});return P("div",{class:"lc-give","data-key":`give:${o.name}`,"data-pin":o.name},P("dt",{},i,o.label||o.name),P("dd",{class:"lc-peek"},r)).html});Yi(this.gives,a.join("")),this.gives.hidden=a.length===0}showNext({node:e,next:n}){const s=n.map(a=>a.label).join("\0");this.next.hidden=n.length===0,s!==this.offered&&(this.offered=s,this.next.replaceChildren(y("span",{class:"lc-next-said"},"Next"),...n.map(a=>{const o=y("button",{type:"button",title:`Add it, wired from this module: ${this.kit.kinds.get(a.kind)?.title??a.kind}`},a.label);return o.addEventListener("click",()=>this.hands.follow(e.id,a.label)),o})))}}const fk="Press a module to ask what it takes and gives, and what could come next. Nothing is dragged on this display.",pk=new Set(["number","text","flag"]),gk=580,la=t=>String(t).padStart(2,"0");class wk{constructor(e){this.setting=e,this.work=new Im(e,()=>this.render(),{positions:!1}),this.query=new mk(e.kit,{write:(i,l,h,c)=>this.work.write(i,l,h,c),promote:(i,l)=>this.promote(i,l),go:i=>this.choose(i),follow:(i,l)=>this.follow(i,l),remove:i=>this.remove(i)}),this.board=new um({turn:(i,l,h)=>this.work.write(i,"value",l,h),find:i=>this.choose(i),point:i=>this.point(i),rename:(i,l)=>this.work.edit(ni(this.work.now,i,l))});const n=(i,l,h,c)=>{const d=y("button",{type:"button",class:`lc-key lc-key-${i}`,title:h,"aria-label":h},y("span",{class:"lc-key-code","aria-hidden":"true"}),l);return d.addEventListener("click",c),d};this.keys={examples:n("examples","Examples","Open another of the page's blueprints here",()=>this.toggleExamples()),undo:n("undo","Undo","Undo (Ctrl+Z)",()=>this.work.undo()),redo:n("redo","Redo","Redo (Ctrl+Shift+Z)",()=>this.work.redo()),reset:n("reset","Reset","Go back to the blueprint as the page wrote it",()=>this.work.reset()),full:n("full","Full display","Give the display the whole window (Esc to come back)",()=>this.toggleFull())};const s=e.examples.length>1,a=(i,l,h,c)=>{const d=y("button",{type:"button",class:`lc-flip lc-flip-${i}`,title:h,"aria-label":h},l);return d.addEventListener("click",()=>this.flip(c)),d},o=(...i)=>y("span",{class:"lc-rail","aria-hidden":"true"},...i.map(l=>y("i",{class:l}))),r=y("div",{class:"lc-side",role:"toolbar","aria-label":"Blueprint"},...s?[this.keys.examples]:[],n("add","Add","Add a module that needs nothing wired into it: a source, a table of your own, a note",()=>this.add()),this.keys.undo,this.keys.redo,this.keys.reset,n("text","Text","The blueprint as text, to read, copy or write",()=>this.openText()),n("link","Link","Copy a link to the blueprint as it is now",()=>{this.share()}),n("help","Help","How this display is worked",()=>this.toggleHelp()),this.keys.full,this.fill);this.body=y("div",{class:"lc-body"},y("section",{class:"lc-deck lc-flow","aria-label":"The blueprint, as a schematic"},y("p",{class:"lc-deck-head"},y("span",{class:"lc-deck-name"},"Schematic"),this.counted),this.schematic),this.query.element,y("section",{class:"lc-deck lc-readings","aria-label":"The board: dials and pictures"},y("p",{class:"lc-deck-head"},y("span",{class:"lc-deck-name"},"Board")),this.board.element),this.status),this.element=y("div",{class:"lcars"},y("div",{class:"lc-top"},y("div",{class:"lc-top-side","aria-hidden":"true"},y("span",{},"LCARS")),y("div",{class:"lc-top-body"},y("div",{class:"lc-headline"},this.title,y("p",{class:"lc-sub"},...s?[a("back","◀","The blueprint before this one",-1)]:[],this.count,...s?[a("on","▶","The next blueprint",1)]:[])),this.about),y("span",{class:"lc-elbow","aria-hidden":"true"}),y("div",{class:"lc-bar"},o("a wide","b","c thin"),this.lights,o("d","a"))),y("div",{class:"lc-main"},y("span",{class:"lc-elbow","aria-hidden":"true"}),y("div",{class:"lc-bar"},o("c wide","a","d thin","b","c")),r,this.body));for(const[i,l]of Object.entries(ae))this.element.style.setProperty(`--lc-${i}`,`${l}px`);this.listen(),this.work.still&&this.board.showStill(this.work.still),this.tellAbout(),this.render()}setting;element;work;chosen=null;pointed=null;closeMenu=null;title=y("p",{class:"lc-title"});count=y("span",{class:"lc-count"});about=y("p",{class:"lc-about"});lights=y("span",{class:"lc-lights","aria-hidden":"true"});schematic=y("div",{class:"lc-schematic",tabindex:0,role:"group","aria-label":"The schematic: the blueprint's modules and conduits"});counted=y("span",{class:"lc-deck-said"});fill=y("span",{class:"lc-fill","aria-hidden":"true"});body;status=y("p",{class:"lc-status","aria-live":"polite"});query;board;keys;open(e){e!==this.work.example&&(this.closeMenu?.(),this.element.querySelector(".wb-examples")?.remove(),this.chosen=null,this.work.open(e),this.tellAbout())}ask(e){this.work.ask(e),this.say()}wake(){this.work.wake()}placed(){}stop(){this.work.stop(),this.closeMenu?.(),document.body.classList.remove("lc-full-open")}tellAbout(){const{title:e,about:n}=this.work.example,{examples:s}=this.setting,a=s.indexOf(this.work.example);this.title.textContent=e||"Blueprint",this.about.textContent=n,this.about.hidden=!n,this.count.textContent=s.length>1&&a>=0?`Blueprint ${a+1} of ${s.length}`:"Blueprint";const o=this.keys.examples.querySelector(".lc-key-code");o&&(o.textContent=a>=0?`${la(a+1)}-${la(s.length)}`:"")}render(){const{work:e}=this;this.chosen!==null&&!e.now.nodes.some(n=>n.id===this.chosen)&&(this.chosen=null),this.drawSchematic(),this.showQuery(),(e.ran||!e.still)&&this.board.show(e.dials(),e.cards()),this.keys.undo.disabled=!e.canUndo,this.keys.redo.disabled=!e.canRedo,this.keys.reset.disabled=!e.own,this.say()}drawSchematic(){const{now:e,evaluation:n,runs:s}=this.work,a=new Map(this.work.dials().map(o=>[o.node,o.said]));Yi(this.schematic,hk({blueprint:e,kit:this.setting.kit,evaluation:n,chosen:this.chosen,pointed:this.pointed,runs:s,set:a})),this.schematic.classList.toggle("blank",e.nodes.length===0),this.counted.textContent=`${e.nodes.length} ${e.nodes.length===1?"module":"modules"} · ${e.wires.length} ${e.wires.length===1?"conduit":"conduits"}`,this.fill.textContent=`${la(e.nodes.length)}-${la(e.wires.length)}`,this.lights.replaceChildren(...e.nodes.map(o=>y("i",{class:n.get(o.id)?.state??"idle"})))}showQuery(){const{kit:e}=this.setting,n=this.work.now,s=n.nodes.find(r=>r.id===this.chosen);if(!s)return this.query.show(null);const a=this.work.dials().find(r=>r.node===s.id),o=new Map(n.wires.flatMap(r=>{const i=n.nodes.find(d=>d.id===r.from.node),l=i&&e.kinds.get(i.kind);if(r.to.node!==s.id||!i)return[];const h=l?.outputs.find(d=>d.name===r.from.pin),c=i.title??l?.title??i.kind;return[[r.to.pin,{node:i.id,said:(l?.outputs.length??0)>1&&h?`${c} · ${h.label}`:c}]]}));this.query.show({node:s,result:this.work.evaluation.get(s.id),from:o,editors:a?new Map([["value",a.editor]]):this.work.editorsOf(s),next:this.work.nextFor(s.id),...a&&{said:`on the board: ${a.said}`}})}say(e){this.status.textContent=e??(this.work.notice||fk)}note(e){this.work.notice=e,this.say()}choose(e){this.chosen=e,this.render(),e!==null&&[...this.schematic.querySelectorAll("[data-node]")].find(n=>n.dataset.node===e)?.scrollIntoView?.({block:"nearest",inline:"nearest"})}point(e){e!==this.pointed&&(this.pointed=e,this.drawSchematic())}follow(e,n){const s=this.work.nextFor(e).find(a=>a.label===n);s&&(this.choose(this.work.follow(e,s,{x:0,y:0})),this.note(`${s.label}: added, wired from what was chosen. What could come after it is offered in turn.`))}promote(e,n){this.work.promote(e,n,{x:0,y:0})!==null&&this.note("On the board now, as a dial: turn it there.")}remove(e){this.work.edit(cm(this.work.now,[e])),this.note("Taken out, with its conduits. Undo brings it back.")}standing(){const{kit:e}=this.setting;return{kinds:new Map([...e.kinds].filter(([,n])=>this.work.offers(n)&&n.role!=="dial"&&n.inputs.every(s=>pk.has(s.type)))),types:e.types}}add(){if(this.closeMenu)return this.closeMenu();const e=this.body.getBoundingClientRect();this.say("Choose what to add, typing to narrow it; Escape closes the menu. What follows it is offered once it is chosen."),this.closeMenu=Tm(this.body,this.standing(),{left:8,top:8,...e.height>0&&{height:Math.max(200,Math.min(420,e.height-16))},side:e.width>=gk+16},void 0,({kind:n})=>this.choose(this.work.add(n.name,{x:0,y:0})),()=>{this.closeMenu=null,this.say()})}openText(){Mm(this.body,this.work.text(),this.setting.kit,e=>this.work.edit(this.work.laidOut(e)))}async share(){const e=this.work.link();try{await this.setting.copy(e),this.note("A link to this blueprint, as it is now, is copied: whoever opens it sees it so.")}catch{this.note(e)}}toggleExamples(){const e=this.element.querySelector(".wb-examples");e?e.remove():mm(this.body,this.setting.examples,this.work.example,n=>this.open(n))}flip(e){const{examples:n}=this.setting,s=n.indexOf(this.work.example),a=n[(s+e+n.length)%n.length];a&&this.open(a)}toggleHelp(){const e=this.element.querySelector(".lc-help");if(e)return e.remove();const n=(o,r)=>y("li",{},y("strong",{},o),` ${r}`),s=y("button",{type:"button",class:"wb-help-close","aria-label":"Close"},"✕"),a=y("div",{class:"lc-help",role:"dialog","aria-label":"How this display is worked"},s,y("ul",{},n("Press a module","to ask what it does, what it takes and what it gives: its inputs are written there."),n("Next","offers what could come after the module chosen: a press adds it, wired and written."),n("An input that comes from another module","says which: a press goes there."),n("Dial","beside a value puts it on the board; a dial is turned there, or where it is chosen."),n("Add","adds what needs nothing wired into it: a source, a table of your own, a note."),n("Remove, or Delete,","takes the module chosen away; Undo, or Ctrl+Z, brings it back."),n("A pulse along a conduit","is what ran again: turning a dial runs only what follows it."),n("Text","is the blueprint as it is written, for whatever the pads do not reach. Wires are not drawn by hand here: the workbench is a flag away, flags lcars off.")));s.addEventListener("click",()=>a.remove()),this.body.append(a)}full(){return this.element.classList.contains("full")}toggleFull(){const e=!this.full();this.element.classList.toggle("full",e),document.body.classList.toggle("lc-full-open",e);const n=this.keys.full.lastChild;n&&(n.textContent=e?"Back to the page":"Full display"),this.keys.full.title=e?"Back to the page (Esc)":"Give the display the whole window (Esc to come back)"}listen(){this.schematic.addEventListener("click",e=>{const n=e.target?.closest("[data-node]");this.choose(n?.dataset.node&&n.dataset.node!==this.chosen?n.dataset.node:null)}),this.element.addEventListener("keydown",e=>{if(e.target.closest("input, select, textarea, [contenteditable], [role=dialog]"))return;const n=e.ctrlKey||e.metaKey,s=e.key.toLowerCase();if((e.key==="Delete"||e.key==="Backspace")&&this.chosen!==null)this.remove(this.chosen);else if(n&&s==="z"&&e.shiftKey)this.work.redo();else if(n&&s==="z")this.work.undo();else if(n&&s==="y")this.work.redo();else if(e.key==="Escape"&&this.full())this.toggleFull();else if(e.key==="Escape"&&this.chosen!==null)this.choose(null);else return;e.preventDefault()})}}const yk={name:"lcars",flags:[{name:"lcars",description:"the blueprints as a starship's display: modules on a grid and pads to press, nothing to drag"}],benches:{lcars:t=>new wk(t)}},Ce={N:1,S:2,E:4,W:8};function jm(t){const{width:e,height:n,cells:s,links:a}=t,o=e*n-1,r=new Map([[0,-1]]),i=[0];for(let h=0;h<i.length;h+=1){const c=i[h];if(c===o)break;const d=c%e,u=Math.floor(c/e),m=s[c],f=[];m&Ce.E&&d+1<e&&f.push(c+1),m&Ce.W&&d>0&&f.push(c-1),m&Ce.N&&u+1<n&&f.push(c+e),m&Ce.S&&u>0&&f.push(c-e);const p=a.get(c);p!==void 0&&a.get(p)===c&&f.push(p);for(const w of f)r.has(w)||(r.set(w,c),i.push(w))}if(!r.has(o))return null;const l=[];for(let h=o;h!==-1;h=r.get(h))l.unshift({x:h%e,y:Math.floor(h/e)});return l}function Nm(t){const e=jm(t);if(!e)return"There is no way out: the only one ran through a sphere that leads nowhere.";const n=e.slice(1).filter((a,o)=>Math.abs(a.x-e[o].x)+Math.abs(a.y-e[o].y)>1).length,s=n===0?"touches no sphere":`jumps through ${n===1?"one sphere":`${n} spheres`}`;return`The way out is ${e.length} rooms long, and ${s}.`}const fc=0x5deece66dn,bk=0xbn,pc=(1n<<48n)-1n;class vk{seed;constructor(e){this.seed=(BigInt(e)^fc)&pc}nextInt(e){if((e&-e)===e)return Number(BigInt(e)*BigInt(this.next(31))>>31n);for(;;){const n=this.next(31),s=n%e;if((n-s+(e-1)|0)>=0)return s}}next(e){return this.seed=this.seed*fc+bk&pc,Number(BigInt.asIntN(32,this.seed>>BigInt(48-e)))}}const gc=16,kk=[["N","E","W","S"],["W","S","E","N"],["S","E","W","N"]],$k={N:[0,1,"S"],S:[0,-1,"N"],E:[1,0,"W"],W:[-1,0,"E"]};function Lm(t,e,n,{spheres:s=!0}={}){const a=new vk(n),o=new Array(t*e).fill(0),r=new Map,i=[],l=(d,u)=>d+u*t;function h(d,u){i.push({x:d,y:u}),s&&a.nextInt(10)<1&&c(d,u);for(const m of kk[a.nextInt(3)]){const[f,p,w]=$k[m],g=d+f,v=u+p;g<0||v<0||g>=t||v>=e||o[l(g,v)]!==0||(o[l(d,u)]|=Ce[m],o[l(g,v)]=Ce[w],h(g,v),i.push({x:d,y:u}))}}function c(d,u){const m=a.nextInt(t),f=a.nextInt(e);o[l(m,f)]===0&&(o[l(d,u)]|=gc,o[l(m,f)]=gc,r.set(l(d,u),l(m,f)),r.set(l(m,f),l(d,u)),h(m,f),i.push({x:d,y:u}))}return h(0,0),o[l(0,0)]|=Ce.S,o[l(t-1,e-1)]|=Ce.N,{width:t,height:e,cells:o,links:r,path:i}}const pe=10,ha=4;function Pm(t,{trail:e,way:n}={}){const{width:s,height:a,cells:o,links:r}=t,i=g=>ha+g*pe,l=g=>ha+(a-1-g)*pe,h=({x:g,y:v})=>[i(g)+pe/2,l(v)+pe/2],c=[];for(let g=0;g<a;g+=1)for(let v=0;v<s;v+=1){const b=o[v+g*s];b&Ce.S||c.push(`M${i(v)} ${l(g)+pe}h${pe}`),b&Ce.W||c.push(`M${i(v)} ${l(g)}v${pe}`),g===a-1&&!(b&Ce.N)&&c.push(`M${i(v)} ${l(g)}h${pe}`),v===s-1&&!(b&Ce.E)&&c.push(`M${i(v)+pe} ${l(g)}v${pe}`)}const d=new Map;let u=0;const m=[...r].map(([g,v])=>{const b=r.get(v)===g;if(!b)u+=1;else if(!d.has(g)){const T=String.fromCharCode(97+d.size/2%26);d.set(g,T).set(v,T)}const[k,x]=h({x:g%s,y:Math.floor(g/s)});return`<circle class="sphere${b?"":" dead"}" cx="${k}" cy="${x}" r="${pe*.3}"/><text class="letter" x="${k}" y="${x}">${b?d.get(g):"×"}</text>`}),f=g=>g.map((v,b)=>{const k=g[b-1];return`${k&&Math.abs(v.x-k.x)+Math.abs(v.y-k.y)===1?"L":"M"}${h(v).join(" ")}`}).join(""),p=[];if(n&&p.push(`<path class="way" d="${f(n)}"/>`),e!==void 0&&e>0){const g=t.path.slice(0,e),[v,b]=h(g[g.length-1]);p.push(`<path class="trail" d="${f(g)}"/>`,`<circle class="walker" cx="${v}" cy="${b}" r="${pe*.22}"/>`)}return`<svg class="maze" role="img" aria-label="${`A ${s} by ${a} maze with ${r.size} sphere${r.size===1?"":"s"}`+(u?`, ${u} leading nowhere`:"")+"."}" viewBox="0 0 ${s*pe+2*ha} ${a*pe+2*ha}">`+p.join("")+`<path class="walls" d="${c.join("")}"/>`+m.join("")+"</svg>"}const yn={size:7,seed:543},xk=100;function Tk(t){let e,n=0,s=!1,a=null;const o=y("div",{class:"figure"}),r=y("p",{class:"status"}),i=y("output",{},String(yn.size)),l=y("input",{type:"range",min:5,max:30,step:1,value:yn.size,oninput:()=>f()}),h=y("input",{type:"number",value:yn.seed,onchange:()=>f()}),c=y("input",{type:"checkbox",checked:!0,onchange:()=>f()}),d=y("button",{type:"button",onclick:()=>a?w():p()},"walk the camera"),u=y("button",{type:"button",onclick:()=>g()},"show the way out");function m(){o.innerHTML=Pm(e,{trail:n,way:s?jm(e):null})}function f(){w(),n=0,i.textContent=l.value,e=Lm(Number(l.value),Number(l.value),Number(h.value),{spheres:c.checked}),r.textContent=Nm(e),m()}function p(){n>=e.path.length&&(n=0),d.textContent="stop",a=setInterval(()=>{n+=1,m(),n>=e.path.length&&w()},xk)}function w(){a&&clearInterval(a),a=null,d.textContent="walk the camera"}function g(){s=!s,u.textContent=s?"hide the way out":"show the way out",m()}const v=y("button",{type:"button",onclick:()=>(h.value=String(Math.floor(Math.random()*1e6)),f())},"another"),b=y("div",{class:"dials"},y("label",{},"Rooms a side: ",i,l),y("label",{},"Seed: ",h,v),y("label",{},c," spheres, as on 20 May (unticked: 13 May)"));return t.replaceChildren(y("div",{class:"maze-app"},o,r,y("div",{class:"row"},d,u),b)),f(),w}const Mk=()=>{const t=Lm(yn.size,yn.size,yn.seed);return`<div class="maze-app"><div class="figure">${Pm(t)}</div><p class="status">${Nm(t)}</p></div>`},Sk={name:"maze",apps:{maze:Tk},stills:{maze:Mk}};function Ak(t,e){let n=Array.from({length:e.length+1},(s,a)=>a);for(let s=1;s<=t.length;s+=1){const a=[s];for(let o=1;o<=e.length;o+=1){const r=(n[o-1]??0)+(t[s-1]===e[o-1]?0:1);a[o]=Math.min(r,(n[o]??0)+1,(a[o-1]??0)+1)}n=a}return n[e.length]??0}function Ek(t,e){if(e.includes(t))return t;let n=null,s=1/0;for(const a of e){const o=Ak(t,a);o<s&&([n,s]=[a,o])}return n}const Ok=/[\p{L}\p{M}\p{N}']+|[.,!?;:]/gu,Ik=/\]\([^)]*\)|^---[\s\S]*?\n---|[#*_`>\[\]|]|::[a-z-]+/gm;function _a(t){return t.normalize("NFKC").replace(Ik," ").toLowerCase().match(Ok)??[]}const ca=" ";class ii{constructor(e,n){this.memory=n;const s=_a(e),a=new Map;for(const o of s)a.set(o,(a.get(o)??0)+1);this.vocabulary=[...a.keys()],this.commonest=[...a].reduce((o,r)=>o&&o[1]>=r[1]?o:r,null)?.[0]??null;for(let o=1;o<s.length;o+=1)for(let r=1;r<=n&&r<=o;r+=1){const i=s.slice(o-r,o).join(ca),l=this.followers.get(i)??new Map;l.set(s[o]??"",(l.get(s[o]??"")??0)+1),this.followers.set(i,l)}}memory;vocabulary;commonest;followers=new Map;after(e){for(let n=Math.min(this.memory,e.length);n>=1;n-=1){const s=e.slice(-n),a=this.followers.get(s.join(ca));if(a)return{context:s,candidates:wc(a)}}return{context:[],candidates:[]}}transitions(){return[...this.followers].filter(([e])=>e.split(ca).length===this.memory).flatMap(([e,n])=>wc(n).map(s=>({context:e.split(ca),...s}))).sort((e,n)=>n.probability-e.probability||n.count-e.count)}}function wc(t){const e=[...t.values()].reduce((n,s)=>n+s,0);return[...t].map(([n,s])=>({word:n,count:s,probability:s/e})).sort((n,s)=>s.count-n.count)}function Ck(t,e){let n=e();for(const s of t)if(n-=s.probability,n<=0)return s.word;return t[t.length-1]?.word??null}function yc(t){return t.reduce((e,n)=>e===""||/^[.,!?;:]$/.test(n)?e+n:`${e} ${n}`,"")}function Fm(t,e){if(e<=0)return t.map((a,o)=>({...a,probability:o===0?1:0}));const n=t.map(a=>a.probability**(1/e)),s=n.reduce((a,o)=>a+o,0);return t.map((a,o)=>({...a,probability:(n[o]??0)/s}))}const tr=40,bc=8,nr=t=>`${Math.round(t*100)}%`;function Bm(t,e,n){const{context:s,candidates:a}=t.after(e),o=a.slice(0,bc),r=Fm(a,n).slice(0,bc),i=a.reduce((p,{count:w})=>p+w,0),l=e.slice(0,e.length-s.length),h=`<p class="written">${M(yc(l))}${l.length&&s.length?" ":""}${s.length?`<mark>${M(yc(s))}</mark>`:""}<span class="caret"></span></p>`,c=o.length?`<ol class="offered">${o.map(({word:p,count:w,probability:g},v)=>{const b=r[v]?.probability??0;return`<li><button type="button" data-word="${M(p)}" title="seen ${w} of ${i} times: ${nr(g)} as learnt"><span class="word">${M(p)}</span><span class="chance" style="--p:${b.toFixed(3)}"></span><span class="figure">${nr(b)}</span></button></li>`}).join("")}</ol>`:`<p class="offered">It never saw anything follow “${M(e[e.length-1]??"")}”. This is where it stops.</p>`,d=p=>s.length===t.memory&&p.context.join(" ")===s.join(" "),u=t.transitions(),m=[...u.filter(d),...u.filter(p=>!d(p))].slice(0,tr).map(p=>`<tr${d(p)?' class="now"':""}><td>${M(p.context.join(" "))}</td><td>${M(p.word)}</td><td>${p.count}</td><td>${nr(p.probability)}</td></tr>`).join(""),f=`<table class="learnt"><caption>What it learnt: ${u.length} transitions between ${t.vocabulary.length} words${u.length>tr?`, the first ${tr} shown`:""}</caption><thead><tr><th>after</th><th>comes</th><th>seen</th><th>chance</th></tr></thead><tbody>${m}</tbody></table>`;return`<div class="next-word">${h}<h4>What may come next</h4>${c}${f}</div>`}const Aa="The cat is happy. The dog is glad. The cat sleeps. The dog plays. The cat eats. The dog runs. The car is fast. The car goes far.",jk=350;function Nk(t,{site:e}){const n={small:()=>Aa,site:()=>e.pages.map($=>$.body).join(`

`),own:()=>c.value};let s=new ii(Aa,1),a=_a("the"),o=null;const r=y("div"),i=($,O)=>y("option",{value:$},O),l=y("select",{onchange:()=>g()},i("small","eight short sentences"),i("site","this website"),i("own","your own text")),h=y("select",{onchange:()=>g()},i(1,"one word back"),i(2,"two words back"),i(3,"three words back")),c=y("textarea",{rows:5,hidden:!0,placeholder:"Paste any text here. The longer, the better it pretends.",oninput:()=>g()}),d=y("output",{},"1"),u=y("input",{type:"range",min:0,max:2,step:.1,value:1,oninput:()=>p()}),m=y("input",{type:"text",value:"the",onchange:()=>w()}),f=y("button",{type:"button",onclick:()=>o?k():b()},"write");function p(){d.textContent=u.value,r.innerHTML=Bm(s,a,Number(u.value))}function w(){k();const $=_a(m.value).flatMap(O=>Ek(O,s.vocabulary)??[]);a=$.length?$:s.commonest?[s.commonest]:[],p()}function g(){c.hidden=l.value!=="own",s=new ii(n[l.value]?.()??Aa,Number(h.value)),w()}function v(){const $=Ck(Fm(s.after(a).candidates,Number(u.value)),Math.random);return $===null?!1:(a=[...a,$],p(),!0)}function b(){f.textContent="stop",o=setInterval(()=>{v()||k()},jk)}function k(){o&&clearInterval(o),o=null,f.textContent="write"}r.addEventListener("click",$=>{const O=$.target?.closest("[data-word]")?.getAttribute("data-word");O&&(a=[...a,O],p())});const x=y("div",{class:"dials"},y("label",{},"It has read",l),y("label",{},"It looks",h),y("label",{},"Temperature: ",d,u),y("label",{},"Start from",m)),T=y("div",{class:"row"},y("button",{type:"button",onclick:()=>{v()}},"next word"),f,y("button",{type:"button",onclick:()=>w()},"start over"));return t.replaceChildren(x,c,T,r),p(),k}const Lk=()=>Bm(new ii(Aa,1),_a("the"),1),Pk={name:"next-word",apps:{"next-word":Nk},stills:{"next-word":Lk}},sr={"string-cache-map":"a WeakMap replacement for string keys, with a bounded cache behind it","async-barrier":"a helper that makes async/await tests say what they wait for","spy-middleware":"a Redux middleware for spying on actions in tests","grunt-frontmatter":"a Grunt task: many files with YAML front matter into one JSON","object-canonical-keys":"always the same array of keys for the same keys, so comparisons stay cheap","async-deferrer":"one function that returns a promise, or resolves it"},vc=160,ar=28,Ea=t=>t.toLocaleString("en-US");function or(t,e){const n=Math.max(1,...t.map(e)),s=vc/t.length,a=t.map((o,r)=>{const i=e(o)/n*(ar-2);return`<rect x="${(r*s+1).toFixed(1)}" y="${(ar-i).toFixed(1)}" width="${(s-2).toFixed(1)}" height="${i.toFixed(1)}"><title>${o}: ${Ea(e(o))}</title></rect>`}).join("");return`<svg class="spark" viewBox="0 0 ${vc} ${ar}" role="img" aria-label="Downloads a year, ${t[0]} to ${t[t.length-1]}">${a}</svg>`}function Rm(t){const e=Object.keys(t.years).sort(),n=c=>d=>t.years[d]?.[c]??0,s=c=>e.reduce((d,u)=>d+c(u),0),a=Object.keys(sr).sort((c,d)=>s(n(d))-s(n(c))),o=[...new Set(e.flatMap(c=>Object.keys(t.years[c]??{})))].filter(c=>!(c in sr)),r=c=>o.reduce((d,u)=>d+n(u)(c),0),i=c=>Object.values(t.years[c]??{}).reduce((d,u)=>d+u,0),l=a.filter(c=>s(n(c))>0).map(c=>`<tr><th scope="row"><a href="https://www.npmjs.com/package/${c}"><code>${c}</code></a><span>${sr[c]}</span></th><td>${or(e,n(c))}</td><td>${Ea(s(n(c)))}</td></tr>`).join(""),h=o.length?`<tr><th scope="row">the other ${o.length}<span>mostly AngularJS and Redux helpers written for one project each</span></th><td>${or(e,r)}</td><td>${Ea(s(r))}</td></tr>`:"";return`<figure class="packages"><table class="packages"><thead><tr><th>package</th><th>${e[0]} to ${e[e.length-1]}, a bar a year</th><th>downloads</th></tr></thead><tbody>${l}${h}</tbody><tfoot><tr><th scope="row">all of them</th><td>${or(e,i)}</td><td>${Ea(s(i))}</td></tr></tfoot></table></figure>`}function Fk(t){if(t.querySelector("figure"))return;const e=Fi(t,"/data/npm/index.json");fetch("/data/npm/downloads.json").then(n=>n.json()).then(n=>{t.innerHTML=Rm(n),t.append(e)}).catch(()=>{t.textContent="The download counts did not arrive. The rest of the page does not depend on them."})}const rr=["string-cache-map","async-barrier","spy-middleware","grunt-frontmatter","object-canonical-keys","gherkin-genie","async-deferrer","egg-hatchery","angular-tags","class-strict","micro-egg-hatchery","node-dio","ducks-middleware","drpx-updateable","generator-drpx","grunt-ngtags","teal-redux-egg","ducks-reducer","drpx-storage-mocks","strict-classes","ngtags","redux-egg","esmoquin","drpx-storage","dio-provider","drpx-components","grunt-angular-tags","drpx-bind-angular","drpx-toggle","drpx-id","drpx-seo","drpx-otherwisehome","drpx-class-route","drpx-transcludeto"],ir="downloads.json",Bk={name:"npm",directory:"public/data/npm",firstYear:2015,files:[ir],about:{measures:"downloads a year of the npm packages published as drpicox",attribution:"npm, Inc. Download counts of the public registry.",dataset:"https://github.com/npm/registry/blob/main/docs/download-counts.md",packages:rr},requestsFor(t){return[`https://api.npmjs.org/downloads/point/${t}-01-01:${t}-12-31/${rr.join(",")}`]},withYear(t,e,n){const s=n[0],a=Object.entries(typeof s=="object"&&s!==null?s:{}).flatMap(([o,r])=>{const i=r?.downloads;return rr.includes(o)&&typeof i=="number"&&i>0?[[o,i]]:[]});if(a.length===0)throw new Error("the registry did not answer with downloads");return{[ir]:{years:{...t[ir]?.years,[e]:Object.fromEntries(a)}}}}},Rk=t=>Rm(JSON.parse(t("/data/npm/downloads.json")))+oo(JSON.parse(t("/data/npm/index.json"))),Dk={name:"packages",apps:{packages:Fk},stills:{packages:Rk},sources:[Bk]},Wk={name:"portfolio",flags:[{name:"portfolio",description:"the lists with pictures as cards, the width of a program",trial:.5}]},Hk=/^\s*\* (.*)$/,qk=/^#{1,6} /;function zk(t){let e="";const n=[],s={s:0,n:0},a=i=>e+=e===""?i.toLowerCase():i[0].toUpperCase()+i.slice(1).toLowerCase(),o=(i,l)=>{s[l]+=1;const h=/shouldBe/i.test(e)&&!n.some(c=>c.name==="expected");n.push({value:i,name:h?"expected":`${l}${s[l]}`})},r=t.matchAll(/([A-Za-z]+)|("[^"]+")|(\d+)/g);for(const[,i,l,h]of r)i?a(i):l?(o(l,"s"),a("S")):h&&(o(h,"n"),a("N"));return{name:e,args:n}}const Gk=["there","is","are","has","have","need","needs"],Dn=(t,e)=>new RegExp(`\\b${e}\\b`,"i").test(t);function _k(t,e){if(t.length===0)return[{line:e,message:'does not have any executable instruction by tests. Post lines that run must begin with " * ".'}];if(!t.some(a=>/should/i.test(a.name)))return[{line:t[t.length-1].line,message:'does not have any executable instruction that contains "should": at least one line must test that the outcome is the expected.'}];for(const a of t){const o=Gk.find(r=>Dn(a.text,r));if(o&&!Dn(a.text,"given")&&!Dn(a.text,"should"))return[{line:a.line,message:`has an instruction with the word "${o}" but no "should" or "given". Add "given" if it sets up, or "should" if it checks a result.`}]}const n=t.find(a=>Dn(a.text,"given")&&Dn(a.text,"should"));if(n)return[{line:n.line,message:'has an instruction with the word "given" and "should" at the same time. Keep "given" for a setup, "should" for an assertion.'}];if(t.some(a=>a.name===""))return[{line:t.find(a=>a.name==="").line,message:"has an instruction with no words in it."}];const s=t[t.length-1];return/should/i.test(s.name)?[]:[{line:s.line,message:'the last instruction must contain "should": a post ends by checking what it set out to show.'}]}function Uk(t){const[e="",...n]=t.replace(/\.md$/,"").split("_");return`Post_${e.replace(/-/g,"")}_${n.map(s=>s[0].toUpperCase()+s.slice(1)).join("")}_Context`}function Dm(t,e){const n=t.replace(/^---[\s\S]*?\n---\n/,m=>m.replace(/[^\n]/g,"")).split(`
`),s=n.find(m=>/^# /.test(m))?.slice(2).trim()??e,a=Uk(e),o=[],r=[];n.forEach((m,f)=>{const p=Hk.exec(m);if(p){const{name:w,args:g}=zk(p[1]??""),v=`${w}(${g.map(b=>b.value).join(", ")})`;o.push({line:f+1,text:m.trim(),name:w,args:g,call:v}),r.push(`  await context.${v};	// ${m.trim()}`)}else qk.test(m)&&r.push("",`  // ${m.trim()}`)});const i=Math.max(0,...r.map(m=>m.indexOf("	"))),l=r.map(m=>m.includes("	")?m.replace("	"," ".repeat(i-m.indexOf("	")+1)):m),h=["// !!! IMPORTANT !!!","// This test file is AUTOGENERATED by yarn create-tests","// DO NOT MODIFY manually.","",`test("${e}", async () => {`,`  const context = new ${a}();`,"  await context.beforeTest();",...l,"","  await context.afterTest();","});",""].join(`
`),c=new Set,d=o.filter(m=>!c.has(m.name)&&c.add(m.name)),u=[`export class ${a} {`,"  async beforeTest() {}","",...d.flatMap(m=>[`  async ${m.name}(${m.args.map(f=>f.name).join(", ")}) {`,"    // TODO","  }",""]),"  async afterTest() {}","}",""].join(`
`);return{title:s,className:a,steps:o,test:h,context:u,problems:_k(o,n.length)}}const es=[{file:"2022-07-15_hello_blog.md",label:"Hello Blog — the first post of the course",markdown:`---
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
`}],uo=t=>new Set(t.split(/\s+/).filter(Boolean)),Yk=uo(`
  var let const function return if else for while do break continue new this
  true false null undefined class extends import export from default async await
  throw try catch finally typeof instanceof in of switch case delete void yield`),Jk=uo(`
  auto break case char const continue default do double else enum extern float for goto if
  inline int long register restrict return short signed sizeof static struct switch typedef
  union unsigned void volatile while NULL true false`),Kk=uo(`
  abstract assert boolean break byte case catch char class const continue default do double
  else enum extends final finally float for goto if implements import instanceof int interface
  long native new package private protected public return short static strictfp super switch
  synchronized this throw throws transient try var void volatile while true false null`),Vk=uo(`
  AND AS CASE CLS CONST DECLARE DEFDBL DIM DO DOUBLE ELSE END EXIT FOR FUNCTION IF IS
  LOCATE LOOP NEXT NOT OR PRINT RANDOMIZE SCREEN SELECT SHARED STATIC STEP SUB THEN TO
  UNTIL WHILE OPTION BASE`);function ee(t,e){return`<span class="hl-${t}">${M(e)}</span>`}function Vi(t,e,n){for(let s=e+1;s<t.length;s+=1)if(t[s]==="\\")s+=1;else if(t[s]===n)return s+1;return t.length}function lr(t,e,n){let s="",a=0;for(;a<t.length;){const o=t.slice(a);let r;const i=t.lastIndexOf(`
`,a-1)+1,l=/^\s*$/.test(t.slice(i,a));if(o.startsWith("//")||n&&o[0]==="#"&&l){const h=t.indexOf(`
`,a),c=h<0?t.length:h;s+=ee(o[0]==="#"?"a":"c",t.slice(a,c)),a=c}else if(o.startsWith("/*")){const h=t.indexOf("*/",a+2),c=h<0?t.length:h+2;s+=ee("c",t.slice(a,c)),a=c}else if(o[0]==='"'||o[0]==="'"||o[0]==="`"){const h=Vi(t,a,o[0]??"");s+=ee("s",t.slice(a,h)),a=h}else if(r=/^[A-Za-z_$][\w$]*/.exec(o)){const h=r[0];s+=e.has(h)?ee("k",h):M(h),a+=h.length}else(r=/^\d+(?:\.\d+)?/.exec(o))?(s+=ee("n",r[0]),a+=r[0].length):(s+=M(o[0]??""),a+=1)}return s}function Xk(t){let e="",n=0;for(;n<t.length;){const s=t.slice(n);let a;if(s.startsWith("%")){const o=t.indexOf(`
`,n),r=o<0?t.length:o;e+=ee("c",t.slice(n,r)),n=r}else if(s.startsWith("/*")){const o=t.indexOf("*/",n+2),r=o<0?t.length:o+2;e+=ee("c",t.slice(n,r)),n=r}else if(s[0]==="'"){const o=Vi(t,n,"'");e+=ee("s",t.slice(n,o)),n=o}else if(s.startsWith("-->")||s.startsWith(":-")){const o=s.startsWith("-->")?"-->":":-";e+=ee("k",o),n+=o.length}else(a=/^[A-Z_][\w]*/.exec(s))?(e+=ee("a",a[0]),n+=a[0].length):(a=/^[a-z][\w]*/.exec(s))?(e+=M(a[0]),n+=a[0].length):(e+=M(s[0]??""),n+=1)}return e}function Zk(t){let e="",n=0;for(;n<t.length;){const s=t.slice(n);let a;if(s[0]==="'"||/^REM\b/i.test(s)){const o=t.indexOf(`
`,n),r=o<0?t.length:o;e+=ee("c",t.slice(n,r)),n=r}else if(s[0]==='"'){const o=t.indexOf('"',n+1),r=o<0?t.length:o+1;e+=ee("s",t.slice(n,r)),n=r}else(a=/^[A-Za-z_][\w]*[$!#%&]?/.exec(s))?(e+=Vk.has(a[0].toUpperCase())?ee("k",a[0]):M(a[0]),n+=a[0].length):(a=/^\d+(?:\.\d+)?/.exec(s))?(e+=ee("n",a[0]),n+=a[0].length):(e+=M(s[0]??""),n+=1)}return e}function Qk(t){let e="",n=0;for(;n<t.length;){const s=t.slice(n);if(s.startsWith("<!--")){const o=t.indexOf("-->",n+4),r=o<0?t.length:o+3;e+=ee("c",t.slice(n,r)),n=r;continue}const a=/^<(\/?)([A-Za-z][\w-]*)/.exec(s);if(!a){const o=t.indexOf("<",n+1),r=o<0?t.length:o;e+=M(t.slice(n,r)),n=r;continue}for(e+=`&lt;${a[1]}${ee("t",a[2]??"")}`,n+=a[0].length;n<t.length&&t[n]!==">";){const o=t.slice(n);let r;if(r=/^\s+/.exec(o))e+=r[0],n+=r[0].length;else if(r=/^[A-Za-z_:][\w:.-]*/.exec(o))e+=ee("a",r[0]),n+=r[0].length;else if(o[0]==="="&&(o[1]==='"'||o[1]==="'")){const i=Vi(t,n+1,o[1]??"");e+=`=${ee("s",t.slice(n+1,i))}`,n=i}else e+=M(o[0]??""),n+=1}t[n]===">"&&(e+="&gt;",n+=1)}return e}const e1=/^(\s*)(Feature:|Background:|Scenario Outline:|Scenario:|Example:|Examples:|Rule:|Given|When|Then|And|But|\*)(?=\s|$)/;function t1(t){return t.split(`
`).map(e=>{const n=e.trimStart(),s=e.slice(0,e.length-n.length);if(n.startsWith("#"))return s+ee("c",n);if(n.startsWith("@"))return s+ee("a",n);const a=e1.exec(e),o=a?s+ee("k",a[2]??""):"",r=a?e.slice(a[0].length):e;return a?o+r.split(/("[^"]*"|\b\d+(?:\.\d+)?\b)/).map(i=>/^"/.test(i)?ee("s",i):/^\d/.test(i)?ee("n",i):M(i)).join(""):M(e)}).join(`
`)}function Me(t,e){return e==="js"||e==="javascript"?lr(t,Yk,!1):e==="c"?lr(t,Jk,!0):e==="java"?lr(t,Kk,!1):e==="prolog"?Xk(t):e==="html"?Qk(t):e==="basic"?Zk(t):e==="gherkin"||e==="feature"?t1(t):M(t)}function Wm(t,e){return`<div class="compiled">${t.problems.length?`<div class="refused"><strong>${M(e)}</strong> line ${t.problems[0].line}: ${M(t.problems[0].message)}<br>The tests are not written until the post is fixed.</div>`:""}<h4>${M(e.replace(/\.md$/,""))} → the test, never edited by hand</h4><pre><code>${Me(t.test,"js")}</code></pre><h4>→ the context, written once and filled in by the coder</h4><pre><code>${Me(t.context,"js")}</code></pre></div>`}function n1(t){const e=y("div"),n=y("textarea",{class:"post",spellcheck:!1,rows:28,oninput:()=>r()}),s=y("input",{type:"text",value:es[0].file,oninput:()=>r()}),a=y("select",{onchange:()=>o(Number(a.value))},...es.map((i,l)=>y("option",{value:l},i.label)));function o(i){const l=es[i]??es[0];n.value=l.markdown,s.value=l.file,r()}function r(){e.innerHTML=Wm(Dm(n.value,s.value),s.value)}t.replaceChildren(y("div",{class:"row"},y("label",{},"Post ",a),y("label",{},"File ",s)),y("div",{class:"post-tests"},n,e)),o(0)}const s1=()=>{const t=es[0];return`<div class="post-tests"><pre class="post">${t.markdown.replace(/&/g,"&amp;").replace(/</g,"&lt;")}</pre>${Wm(Dm(t.markdown,t.file),t.file)}</div>`},a1={name:"post-tests",apps:{"post-tests":n1},stills:{"post-tests":s1}},da=t=>t.outputs?.table,kc=(t,e)=>t.columns.some(n=>n.name===e&&n.key),o1={name:"cross",title:"Cross two sources",role:"paint",shelf:"Recipes",flag:"recipes",summary:"Two tables in one node: joined on the keys they share, kept to what was measured whole, the season and the years taken out if asked, and a column of one against a column of the other — their correlation, and a scatter.",inputs:[{name:"left",label:"one",type:"table"},{name:"right",label:"the other",type:"table"},{name:"x",label:"x, of the one",type:"text",optional:!0,editor:{kind:"column",of:"left",numeric:!0}},{name:"y",label:"y, of the other",type:"text",optional:!0,editor:{kind:"column",of:"right",numeric:!0}},{name:"out",label:"taking out",type:"text",initial:"both",editor:{kind:"choice",choices:[{value:"nothing",label:"nothing"},{value:"season",label:"the season"},{value:"both",label:"the season and the years"}]}}],outputs:[{name:"r",label:"r",type:"number"},{name:"table",label:"what is left",type:"table"}],run:(t,e)=>{const[n,s]=[t.left,t.right],a=K(n,t.x,"x, of the one",{numeric:!0,measured:!0}),o=K(s,t.y,"y, of the other",{numeric:!0,measured:!0}),r=wm.run({left:n,right:s},e),i=da(r),l=String(r.settled?.on??"").split(" "),h=s.columns.filter(b=>!l.includes(b.name)).findIndex(b=>b.name===o.name),c=i.columns[n.columns.length+h]?.name??o.name,d=i.columns.some(b=>b.name==="whole")?da(ym.run({table:i,column:"whole",is:"equals",value:"yes"},e)):i,u=String(t.out??"both"),m=kc(d,"year")&&kc(d,"month"),f=m&&u!=="nothing"?da(si.run({table:d,by:"month"},e)):d,p=m&&u==="both"?da(si.run({table:f,by:"year"},e)):f,w={table:p,x:a.name,y:c},g=fm.run({...w,of:"values"},e),v=km.run({...w,...p.columns.some(b=>b.name==="season")&&{colour:"season"},fit:!0},e);return{outputs:{r:g.outputs?.r,table:p},...v.painting&&{painting:v.painting},...g.said&&{said:g.said},settled:{x:a.name,y:o.name}}}};function $c(t,e){const[n,s]=String(t??"").split(/[\s,–-]+/).filter(Boolean).map(Number);if(n===void 0||s===void 0||!Number.isFinite(n)||!Number.isFinite(s))throw new Error(`${e}: two hours, as 13 16`);return[Math.min(n,s),Math.max(n,s)]}const r1={name:"day-parts",title:"Two times of day",role:"step",shelf:"Recipes",flag:"recipes",summary:"Two times of a day compared in one node: for every day the hours make up — a month of a year — the mean of the first hours and of the second, and how much the second rose over the first.",inputs:[{name:"table",label:"table",type:"table"},{name:"value",label:"of",type:"text",optional:!0,editor:{kind:"column",of:"table",numeric:!0}},{name:"first",label:"first, hours",type:"text",initial:"13 16",hint:"two hours, as 13 16: from the one to the other, both in"},{name:"second",label:"then, hours",type:"text",initial:"19 22",hint:"two hours, as 19 22"}],outputs:[{name:"table",label:"table",type:"table"}],run:t=>{const e=t.table,n=K(e,"hour","hours"),s=K(e,t.value,"of",{numeric:!0,measured:!0,besides:[n.name]}),[a,o]=[$c(t.first,"first, hours"),$c(t.second,"then, hours")],r=e.columns.filter(u=>u.key&&u.name!==n.name),i=new Map;for(const u of e.rows){const m=JSON.stringify(r.map(f=>u[f.name]??null));i.set(m,[...i.get(m)??[],u])}const l=(u,[m,f])=>{const p=u.filter(w=>Number(w[n.name])>=m&&Number(w[n.name])<=f).flatMap(w=>typeof w[s.name]=="number"?[w[s.name]]:[]);return p.length>0?p.reduce((w,g)=>w+g,0)/p.length:null},h=[...i.values()].map(u=>{const[m,f]=[l(u,a),l(u,o)];return{...Object.fromEntries(r.map(p=>[p.name,u[0]?.[p.name]??null])),early:m,late:f,rise:m===null||f===null?null:f-m}}),c=s.unit===void 0?{}:{unit:s.unit};return{outputs:{table:{columns:[...r,{name:"early",kind:"number",...c,about:`the mean of ${s.name}, hours ${a[0]} to ${a[1]}`},{name:"late",kind:"number",...c,about:`the mean of ${s.name}, hours ${o[0]} to ${o[1]}`},{name:"rise",kind:"number",...c,about:"the later less the earlier"}],rows:h,credits:e.credits}},said:`${h.length} rows: hours ${a.join("–")} against ${o.join("–")}`,settled:{value:s.name}}}},i1={name:"recipes",flags:[{name:"recipes",description:"bigger nodes in the blueprints: two sources crossed, two times of a day compared, each one node"}],nodes:[o1,r1]},je=[{code:"estartit",name:"Off L'Estartit",lat:42.125,lon:3.375},{code:"barcelona",name:"Off Barcelona",lat:41.375,lon:2.375},{code:"tarragona",name:"Off Tarragona",lat:41.125,lon:1.375},{code:"ebre",name:"Off the Ebre delta",lat:40.625,lon:.875}],Ua={kind:"choice",choices:[...je.map(t=>({value:t.code,label:t.name})),{value:"all",label:"every point"}]},xc="/data/sea/running.json";function Xi(t,e){const n=e==="all"?je.map(l=>l.code):[e];if(!je.some(l=>l.code===n[0]))throw new Error(`off: there is no point ${e}`);const s=qi(t,xc),a=s===null?null:xt(()=>s,xc),o=n.map(l=>it(JSON.parse(t(`/data/sea/${l}.json`)),a,`${l}.json`)),r=JSON.parse(t("/data/sea/index.json")),i=a&&a.refreshed>r.refreshed?a.refreshed:r.refreshed;return{points:o,credit:{said:r.attribution,refreshed:i}}}const l1=864e5,Tc=t=>Math.round(t*100)/100,hr=(t,e)=>new Date(Date.UTC(t,0,1)+e*l1).toISOString().slice(0,10),h1={name:"sea-days",title:"Sea day by day",role:"source",shelf:"Sea",summary:"A year of the sea off a stretch of the coast, day by day, beside the normal for each day — the mean of the same day over the years asked — and how far above it.",inputs:[{name:"point",label:"off",type:"text",initial:"barcelona",editor:{kind:"choice",choices:Ua.kind==="choice"?Ua.choices.filter(t=>t.value!=="all"):[]}},{name:"year",label:"the year",type:"number",optional:!0,editor:{kind:"number",min:1982,max:2100,step:1},hint:"the latest the site has when left empty"},{name:"from",label:"normal from",type:"number",initial:1991,editor:{kind:"number",min:1982,max:2100,step:1}},{name:"to",label:"normal to",type:"number",initial:2020,editor:{kind:"number",min:1982,max:2100,step:1}}],outputs:[{name:"table",label:"table",type:"table"}],run:(t,{read:e})=>{const{points:[n],credit:s}=Xi(e,String(t.point));if(!n)throw new Error("off: there is no point to read");const a=Object.keys(n.years).map(Number),o=t.year===void 0||t.year===""?Math.max(...a):Number(t.year),r=n.years[String(o)];if(!r)throw new Error(`the year: the site holds ${a[0]} to ${a.at(-1)}, not ${o}`);const[i,l]=[Number(t.from),Number(t.to)],h=new Map;for(const[u,m]of Object.entries(n.years))Number(u)<i||Number(u)>l||m.forEach((f,p)=>{f!==null&&h.set(hr(Number(u),p).slice(5),[...h.get(hr(Number(u),p).slice(5))??[],f])});const c=r.map((u,m)=>{const f=hr(o,m),p=h.get(f.slice(5)),w=p?Tc(p.reduce((g,v)=>g+v,0)/p.length):null;return{day:m+1,date:f,sst:u,normal:w,above:u===null||w===null?null:Tc(u-w)}});return{outputs:{table:{columns:[{name:"day",kind:"number",key:!0,about:`the day of ${o}, from the first of January`},{name:"date",kind:"text"},{name:"sst",kind:"number",unit:"°C",about:`the temperature of the sea's surface, ${o}`},{name:"normal",kind:"number",unit:"°C",about:`the mean of the same day, ${i} to ${l}`},{name:"above",kind:"number",unit:"°C",about:"how far the day was above its normal; below it, less than nothing"}],rows:c,credits:[s]}},settled:{year:o}}}},c1=.95,d1=t=>Math.round(t*100)/100,u1={name:"sea-months",title:"Sea by month",role:"source",shelf:"Sea",summary:"The temperature of the sea's surface off a stretch of the Catalan coast, month by month: the mean of its days, the warmest and the coolest.",inputs:[{name:"point",label:"off",type:"text",initial:"barcelona",editor:Ua}],outputs:[{name:"table",label:"table",type:"table"}],run:(t,{read:e})=>{const n=String(t.point),{points:s,credit:a}=Xi(e,n),o=s.flatMap(i=>Object.entries(i.years).flatMap(([l,h])=>{const c=Number(l),d=i.soFar?.year===c;return Array.from({length:12},(u,m)=>{const f=new Date(Date.UTC(c,m+1,0)).getUTCDate(),p=(Date.UTC(c,m,1)-Date.UTC(c,0,1))/864e5,w=h.slice(p,p+f).filter(k=>k!==null);if(w.length===0)return null;const{mean:g,highest:v,lowest:b}=Ht(w);return{...n==="all"&&{point:i.code},year:c,month:m+1,season:ks(m+1),sst:d1(g),warmest:v,coolest:b,days:w.length,whole:!d&&w.length>=c1*f?"yes":"no"}}).filter(u=>u!==null)}));return{outputs:{table:{columns:[...n==="all"?[{name:"point",kind:"text",key:!0}]:[],{name:"year",kind:"number",key:!0},{name:"month",kind:"number",key:!0},{name:"season",kind:"text",key:!0,about:"winter is December to February, as meteorologists count it",order:vs},{name:"sst",kind:"number",unit:"°C",about:"the mean temperature of the sea's surface over the month's days"},{name:"warmest",kind:"number",unit:"°C",about:"the month's warmest day"},{name:"coolest",kind:"number",unit:"°C",about:"the month's coolest day"},{name:"days",kind:"number",about:"the days measured"},{name:"whole",kind:"text",about:"yes when nearly every day was measured, and the month is over"}],rows:o,credits:[a]}}}}},m1={name:"sea-points",title:"Sea points",role:"source",shelf:"Sea",summary:"The four cells of sea off the Catalan coast the site keeps, north to south: their names and where they are.",inputs:[],outputs:[{name:"table",label:"table",type:"table"}],run:()=>({outputs:{table:{columns:[{name:"point",kind:"text",key:!0},{name:"name",kind:"text"},{name:"lat",kind:"number",unit:"°N",about:"the latitude of the cell's centre"},{name:"lon",kind:"number",unit:"°E",about:"the longitude of the cell's centre"}],rows:je.map(t=>({point:t.code,name:t.name,lat:t.lat,lon:t.lon})),credits:[]}}})},f1=.95,p1=t=>Math.round(t*100)/100,g1=t=>(Date.UTC(t+1,0,1)-Date.UTC(t,0,1))/864e5,w1={name:"sea-years",title:"Sea by year",role:"source",shelf:"Sea",summary:"The temperature of the sea off a stretch of the Catalan coast, year by year: the mean of its days, its warmest day, and the days at least as warm as asked.",inputs:[{name:"point",label:"off",type:"text",initial:"barcelona",editor:Ua},{name:"warm",label:"warm from",type:"number",initial:26,editor:{kind:"number",min:10,max:30,step:.5,show:t=>`${te(t)} °C`}}],outputs:[{name:"table",label:"table",type:"table"}],run:(t,{read:e})=>{const n=String(t.point),s=Number(t.warm),{points:a,credit:o}=Xi(e,n),r=a.flatMap(l=>Object.entries(l.years).flatMap(([h,c])=>{const d=Number(h),u=c.filter(w=>w!==null);if(u.length===0)return[];const{mean:m,highest:f}=Ht(u),p=l.soFar?.year!==d&&u.length>=f1*g1(d);return[{...n==="all"&&{point:l.code},year:d,sst:p1(m),warmest:f,warm:u.filter(w=>w>=s).length,days:u.length,whole:p?"yes":"no"}]}));return{outputs:{table:{columns:[...n==="all"?[{name:"point",kind:"text",key:!0}]:[],{name:"year",kind:"number",key:!0},{name:"sst",kind:"number",unit:"°C",about:"the mean temperature of the sea's surface over the year's days"},{name:"warmest",kind:"number",unit:"°C",about:"the year's warmest day"},{name:"warm",kind:"number",unit:"days",about:`the days the sea was at ${te(s)} °C or more`},{name:"days",kind:"number",about:"the days measured"},{name:"whole",kind:"text",about:"yes when nearly every day was measured, and the year is over"}],rows:r,credits:[o]}}}}},y1=[u1,w1,h1,m1],b1=-1e30,Mc=t=>(t??"").split(",").map(e=>Number(e.trim()));function v1(t,e="sst"){const n=/message\s*=\s*"([^"]*)"/.exec(t);if(t.trimStart().startsWith("Error")||n)throw new Error(n?.[1]??"the server answered with an error");const s=t.split(`
`),a=h=>Mc(s[s.findIndex(c=>c.startsWith(`${e}.${h}[`))+1]),o=s.findIndex(h=>h.startsWith(`${e}.${e}[`));if(o<0)throw new Error(`the answer has no ${e}`);const[r=0,i=0]=[...(s[o]??"").matchAll(/\[(\d+)\]/g)].map(h=>Number(h[1])),l=Array.from({length:r},(h,c)=>Array.from({length:i},(d,u)=>{const m=s[o+1+c*i+u]??"";if(!m.startsWith(`[${c}][${u}],`))throw new Error(`the answer breaks off at day ${c}`);return Mc(m.slice(m.indexOf(",")+1)).map(f=>Number.isFinite(f)&&f>b1?f:null)}));return{times:a("time"),lats:a("lat"),lons:a("lon"),values:l}}const k1="https://psl.noaa.gov/thredds/dodsC/Datasets/noaa.oisst.v2.highres",Zi=864e5,$1=Date.UTC(1800,0,1),cr=92,x1=3,T1=15,dr=t=>(Date.UTC(t+1,0,1)-Date.UTC(t,0,1))/Zi,M1=t=>Math.round((t+89.875)/.25),S1=t=>Math.round((t-.125)/.25),A1=(()=>{const[t,e]=[je.map(n=>M1(n.lat)),je.map(n=>S1(n.lon))];return`[${Math.min(...t)}:1:${Math.max(...t)}][${Math.min(...e)}:1:${Math.max(...e)}]`})(),E1=t=>t===null?null:Math.round(t*100)/100,Sc=(t,e)=>Math.abs(t-e)<1e-6;function Ac(t,e){const n=new Map(je.map(o=>[o.code,[]])),s=(Date.UTC(t,0,1)-$1)/Zi;let a=0;for(const o of e){const r=v1(String(o));for(const[i,l]of r.times.entries()){if(l!==s+a)throw new Error(`the days of ${t} are not in order: day ${l-s} came where day ${a} was due`);for(const h of je){const c=r.lats.findIndex(u=>Sc(u,h.lat)),d=r.lons.findIndex(u=>Sc(u,h.lon));if(c<0||d<0)throw new Error(`the answer has no cell at ${h.lat}, ${h.lon}`);n.get(h.code)?.push(E1(r.values[i]?.[c]?.[d]??null))}a+=1}}return{count:a,values:n}}const O1={name:"sea",directory:"public/data/sea",firstYear:1982,answers:"text",files:je.map(t=>`${t.code}.json`),about:{measures:"the temperature of the sea's surface, a day at a time, in cells of a quarter of a degree",dataset:"https://psl.noaa.gov/data/gridded/data.noaa.oisst.v2.highres.html",attribution:"NOAA OISST v2.1 (Huang and others, 2021): data provided by the NOAA PSL, Boulder, Colorado, USA, from their website at https://psl.noaa.gov.",points:je},requestsFor(t,e){if(t<e.getUTCFullYear()&&e.getTime()<Date.UTC(t+1,0,T1))throw new Error(`the last days of ${t} are revised until the middle of January`);const n=Math.min(dr(t),Math.floor((e.getTime()-Date.UTC(t,0,1))/Zi)-x1+1);if(n<1)throw new Error(`the server has no day of ${t} yet`);return Array.from({length:Math.ceil(n/cr)},(s,a)=>{const o=`[${a*cr}:1:${Math.min(n,(a+1)*cr)-1}]${A1}`;return`${k1}/sst.day.mean.${t}.nc.ascii?sst${o.replaceAll("[","%5B").replaceAll("]","%5D")}`})},withYear(t,e,n){const{count:s,values:a}=Ac(e,n);if(s!==dr(e))throw new Error(`${e} has ${s} days, not ${dr(e)}`);return Object.fromEntries(je.map(o=>[`${o.code}.json`,{...o,years:{...t[`${o.code}.json`]?.years,[e]:a.get(o.code)??[]}}]))},soFar(t,e){const{count:n,values:s}=Ac(t,e);if(n===0)throw new Error(`the server has no day of ${t} yet`);return{files:Object.fromEntries(je.map(o=>[`${o.code}.json`,{...o,years:{[t]:s.get(o.code)??[]}}])),through:new Date(Date.UTC(t,0,n)).toISOString().slice(0,10)}}},I1={name:"sea",sources:[O1],nodes:y1};function yt(t){let e="";for(const n of t){if(n.length>1){e+=n;continue}const s=(n.normalize("NFD")[0]??n).toLowerCase();e+=s.length===1?s:n}return e}const vt=t=>t.replace(/\]\([^)]*\)/g,"]").replace(/[#*_`>\[\]]/g,"").trim(),C1=/[\p{L}\p{N}]/u;function Ts(t,e){const n=[];if(!e)return n;for(let s=t.indexOf(e);s>=0;s=t.indexOf(e,s+1))(s===0||!C1.test(t[s-1]))&&n.push(s);return n}const hn={title:8,summary:3,route:2,said:.5,saidAtMost:5,whole:1},j1=/[\p{L}\p{N}]/u,ur=180,Ec=new WeakMap;function N1(t){const e=[];let n=!1;for(const s of t.split(`
`))s.trimStart().startsWith("```")?n=!n:!n&&!s.trimStart().startsWith("::")&&e.push(vt(s));return e.filter(Boolean)}function Oc(t){const e=Ec.get(t);if(e)return e;const n=N1(t.body),s={title:yt(t.title),summary:yt(t.summary),route:yt(t.route),lines:n,folded:n.map(yt)};return Ec.set(t,s),s}const Oa=(t,e)=>Ts(t,e).length>0,L1=(t,e)=>Ts(t,e).some(n=>!j1.test(t[n+e.length]??""));function P1(t,e){let n=0;for(const s of e){const a=t.folded.reduce((h,c)=>h+Ts(c,s).length,0),[o,r,i]=[Oa(t.title,s),Oa(t.summary,s),Oa(t.route,s)];if(!o&&!r&&!i&&a===0)return null;const l=[t.title,t.summary,...t.folded].some(h=>L1(h,s));n+=(o?hn.title:0)+(r?hn.summary:0)+(i?hn.route:0)+Math.min(a,hn.saidAtMost)*hn.said+(l?hn.whole:0)}return n}function F1(t,e,n){const s=t.folded.map(h=>e.filter(c=>Oa(h,c)).length),a=s.indexOf(Math.max(0,...s));if(a<0||s[a]===0)return n;const o=t.lines[a];if(o.length<=ur)return o;const r=Math.min(...e.flatMap(h=>Ts(t.folded[a],h).slice(0,1))),i=Math.max(0,o.lastIndexOf(" ",Math.max(0,r-ur/3))+1),l=Math.min(o.length,i+ur);return`${i>0?"…":""}${o.slice(i,l).trim()}${l<o.length?"…":""}`}function Hm(t,e){const n=yt(e).split(/\s+/).filter(Boolean);return n.length===0?[]:t.pages.flatMap(s=>{const a=P1(Oc(s),n);return a===null?[]:[{page:s,score:a}]}).sort((s,a)=>a.score-s.score||s.page.route.localeCompare(a.page.route)).map(({page:s})=>({route:s.route,title:s.title,summary:s.summary,section:s.route.split("/").filter(Boolean)[0]??"",line:F1(Oc(s),n,s.summary)}))}function qm(t,e){const n=yt(t),s=Array.from({length:t.length},()=>!1);for(const o of e)for(const r of Ts(n,o))s.fill(!0,r,r+o.length);for(let o=1;o<t.length;o+=1){if(s[o]||!/\s/.test(t[o])||!s[o-1])continue;let r=o;for(;r<t.length&&/\s/.test(t[r]);)r+=1;s[r]&&s.fill(!0,o,r)}let a="";for(let o=0;o<t.length;){let r=o;for(;r<t.length&&s[r]===s[o];)r+=1;const i=M(t.slice(o,r));a+=s[o]?`<mark>${i}</mark>`:i,o=r}return a}const B1=8,R1=t=>t==="/"?"README.md":t.slice(1);function D1(t,e,n=B1){if(t.length===0)return'<p class="none">No page says that.</p>';const s=t.slice(0,n),a=`<ol class="found">${s.map(({route:r,title:i,line:l})=>`<li><a href="${M(r)}">${M(R1(r))}</a><span class="hint"> # ${M(i)}</span><span class="said">${qm(l,e)}</span></li>`).join("")}</ol>`,o=t.length-s.length;return o>0?`${a}<p class="more">${o} more. Another word narrows it.</p>`:a}function W1(t,e,n){return e===0?-1:n==="ArrowDown"?t<0?0:(t+1)%e:n==="ArrowUp"?t<0?e-1:(t-1+e)%e:t}function H1(t,e,n,s){let a=-1;const o=()=>[...n.querySelectorAll("a")],r=()=>o().forEach((l,h)=>l.closest("li")?.classList.toggle("chosen",h===a)),i=()=>{const l=yt(e.value).split(/\s+/).filter(Boolean);n.innerHTML=l.length?D1(Hm(t,e.value),l):`<p class="none">${s}</p>`,a=o().length?0:-1,r()};return e.addEventListener("input",i),e.addEventListener("keydown",l=>{l.key==="ArrowDown"||l.key==="ArrowUp"?(l.preventDefault(),a=W1(a,o().length,l.key),r(),o()[a]?.scrollIntoView?.({block:"nearest"})):l.key==="Enter"&&(l.preventDefault(),o()[Math.max(0,a)]?.click())}),{show:i,clear:()=>{e.value="",n.replaceChildren(),a=-1}}}function q1(t){const e=t.target;return e instanceof Element&&e.closest("input, textarea, select, [contenteditable]")!==null}function z1(t){const e=document.querySelector(".site-header .session"),n=e?.querySelector(":scope > p.ran");if(!e||!n)return()=>{};const s=document.querySelector(".terminal form.prompt input"),a=y("button",{class:"search-open",type:"button",title:"search the site"},y("kbd",{},"/")," search"),o=y("input",{type:"text",class:"search-input",autocomplete:"off",autocapitalize:"off",spellcheck:"false","aria-label":"Search the site"}),r=y("p",{class:"ran search-line"},y("a",{class:"brand",href:"/"},"@drpicox"),y("span",{class:"ps1"},"~ $"),y("span",{},"search"),o),i=y("div",{class:"found-here","aria-live":"polite"}),l=y("button",{class:"search-key",type:"button",title:"search the site"},y("kbd",{},"/")," search");n.append(" ",a),e.append(r,i),s?.form?.append(l);const h=H1(t,o,i,"Every page that says the words, as they are typed.");let c="";const d=w=>{s&&(s.value=w,s.dispatchEvent(new KeyboardEvent("keyup")),c=w)},u=()=>{e.classList.add("searching"),window.scrollTo({top:0}),o.focus({preventScroll:!0}),h.show(),d(`search ${o.value}`)},m=(w=!1)=>{e.classList.contains("searching")&&(e.classList.remove("searching"),h.clear(),!w&&s?.value===c&&d(""))};o.addEventListener("input",()=>d(`search ${o.value}`)),o.addEventListener("keydown",w=>{w.key==="Escape"&&(w.preventDefault(),m())}),a.addEventListener("click",u),l.addEventListener("click",w=>{w.stopPropagation(),u()}),i.addEventListener("click",w=>{w.target.closest("a")&&setTimeout(()=>m())});const f=w=>{const g=w.target;e.contains(g)||m(s?.form?.contains(g)??!1)},p=w=>{w.key!=="/"||q1(w)||w.metaKey||w.ctrlKey||w.altKey||(w.preventDefault(),w.stopImmediatePropagation(),u())};return document.addEventListener("click",f),window.addEventListener("keydown",p,{capture:!0}),()=>{window.removeEventListener("keydown",p,{capture:!0}),document.removeEventListener("click",f),m(),a.remove(),r.remove(),i.remove(),l.remove()}}const mr=10,G1={name:"search",usage:"search <words>",description:"the pages that say some words, the best first, each with a line that says them",run({site:t},e){if(e.length===0)return{text:"search: usage: search <words>",error:!0};const n=e.join(" "),s=Hm(t,n);if(s.length===0)return{text:`search: no page says "${n}"`};const a=yt(n).split(/\s+/).filter(Boolean),o=s.slice(0,mr),r=s.length>mr?[`… and ${s.length-mr} more. Another word narrows it.`]:[],i=Math.max(...o.map(({route:l})=>l.length));return{text:[...o.flatMap(({route:l,title:h,line:c})=>[`${l.padEnd(i)}  # ${h}`,`  ${c}`]),...r].join(`
`),html:`<pre class="listing wrap found">${[...o.map(({route:l,title:h,line:c})=>`<span class="line"><a href="${M(l)}">${M(l)}</a>${" ".repeat(i-l.length)}<span class="hint">  # ${M(h)}</span></span><span class="line said">  ${qm(c,a)}</span>`),...r.map(l=>`<span class="line">${M(l)}</span>`)].join("")}</pre>`}}},_1={name:"search",commands:[G1],install:(t,{site:e})=>z1(e)};function li(t,e){t.dispatchEvent(new CustomEvent(zt,{detail:e}))}function bn(t){return t.toLowerCase().replace(/\s+/g,"-")}const fr=t=>typeof t=="string"?bn(t):String(Number(t.toPrecision(4)));function U1(t,e){const n=t.parameters.flatMap(s=>{const a=e[s.name];return a===void 0||fr(a)===fr(s.initial)?[]:[`--${s.name} ${fr(a)}`]});return[t.name,...n].join(" ")}function Qi(t){return Object.fromEntries(t.parameters.map(e=>[e.name,e.initial]))}function Y1(t){return t.scale!=="log"?{min:t.min,max:t.max,step:t.step,positionOf:e=>e,valueAt:e=>e}:{min:Math.log10(t.min),max:Math.log10(t.max),step:t.step,positionOf:e=>Math.log10(e),valueAt:e=>10**e}}const hi="program-ran";function J1(t,e){const n=Y1(t),s=t.show??String,a=y("output"),o=y("input",{type:"range",name:t.name,min:n.min,max:n.max,step:n.step});return o.addEventListener("input",()=>e(n.valueAt(Number(o.value)))),{label:y("label",{},`${t.label}: `,a,o),settle:r=>{o.value=String(n.positionOf(Number(r))),a.textContent=s(Number(r))}}}function K1(t,e){const n=y("select",{name:t.name},...t.choices.map(s=>y("option",{value:s},s)));return n.addEventListener("change",()=>e(n.value)),{label:y("label",{},`${t.label} `,n),settle:s=>{n.value=String(s)}}}function zm(t){return e=>{let n=Qi(t);const s=e.dataset.dials?.split(" "),a=s!==void 0&&t.glance!==void 0,o=y("code"),r=y("div",{class:a?"program-figure glance":"program-figure"}),i=d=>u=>{n={...n,[d]:u},h()},l=t.parameters.filter(d=>!s||s.includes(d.name)).map(d=>({name:d.name,dial:"choices"in d?K1(d,i(d.name)):J1(d,i(d.name))}));function h(){for(const{name:d,dial:u}of l)u.settle(n[d]??"");o.textContent=`$ ${U1(t,n)}`,r.innerHTML=a?t.glance?.(n)??"":t.run(n).html,e.dispatchEvent(new CustomEvent(hi,{detail:n}))}const c=d=>{n={...n,...d.detail},h()};return e.addEventListener(zt,c),e.replaceChildren(y("div",{class:"dials"},...l.map(({dial:d})=>d.label)),y("p",{class:"program-line"},o),r),h(),()=>e.removeEventListener(zt,c)}}const ua=149597870700,cn=94607e11,vn=[{name:"the Moon",metres:3844e5,said:"384,400 km"},{name:"Mars",metres:.52*ua,said:"0.52 au"},{name:"Jupiter",metres:4.2*ua,said:"4.2 au"},{name:"Saturn",metres:8.5*ua,said:"8.5 au"},{name:"Pluto",metres:38.5*ua,said:"38.5 au"},{name:"Proxima Centauri",metres:4.24*cn,said:"4.24 light-years"},{name:"Sirius",metres:8.58*cn,said:"8.58 light-years"},{name:"Epsilon Eridani",metres:10.52*cn,said:"10.52 light-years"},{name:"Tau Ceti",metres:11.91*cn,said:"11.91 light-years"},{name:"the centre of the galaxy",metres:26e3*cn,said:"26,000 light-years",towards:{ra:17.76,dec:-29}},{name:"Andromeda",metres:25e5*cn,said:"2.5 million light-years",towards:{ra:.712,dec:41.27}}],os={dryMass:25e3,fuel:5e3,exhaust:.72},V1=299792458;function el(t){if(t<.01)return`${Math.round(t*V1/1e3).toLocaleString("en-US")} km/s`;if(t<.99)return`${(t*100).toPrecision(2)}% of c`;const e=Math.min(12,Math.ceil(-Math.log10(1-t)));return`${(Math.floor(t*10**e)/10**(e-2)).toFixed(e-2)}% of c`}const X1=[[365.25*86400*1e6,"million years"],[365.25*86400,"years"],[86400,"days"],[3600,"hours"],[60,"minutes"],[1,"seconds"]];function kt(t){const[e,n]=X1.find(([o])=>t>=o)??[1,"seconds"],s=t/e;return`${s>=10?Math.round(s).toLocaleString("en-US"):String(Math.round(s*10)/10)} ${n}`}const Z1=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:3});function Ya(t){return t>=1e6?`${Z1.format(t)} t`:`${t>=100?Math.round(t).toLocaleString("en-US"):t.toPrecision(2)} t`}const Pe=299792458,Q1=9.81;function tl(t,e){const n=e.acceleration*Q1,s=e.dryMass+e.fuel,a=e.exhaust*Pe,o=Pe/n*Math.acosh(1+n*t/(2*Pe*Pe)),r=s*(1-Math.exp(-2*n*o/a)),i=r>e.fuel,l=i?a/(2*n)*Math.log(s/e.dryMass):o,h=Math.tanh(n*l/Pe),c=Pe/n*Math.sinh(n*l/Pe),d=Pe*Pe/n*(Math.cosh(n*l/Pe)-1),u=Math.max(0,t-2*d),m=i?u/(h*Pe):0,f=m*Math.sqrt(1-h*h);return{shipTime:2*l+f,homeTime:2*c+m,burnTime:l,coastTime:f,topSpeed:h,fuelBurnt:i?e.fuel:r,coasts:i}}const e$=299792458,t$=9.81,Wn=720,ma=170,xe={top:12,right:10,bottom:24,left:40};function n$(t,e){const n=Wn-xe.left-xe.right,s=ma-xe.top-xe.bottom,a=u=>xe.left+u/t.shipTime*n,o=u=>xe.top+s-u/Math.max(t.topSpeed,1e-12)*s,r=e.acceleration*t$,i=24,l=Array.from({length:i+1},(u,m)=>t.burnTime*m/i).map(u=>[u,Math.tanh(r*u/e$)]),c=[...l.map(([u,m])=>[u,m]),...l.reverse().map(([u,m])=>[t.shipTime-u,m])].map(([u,m])=>`${a(u).toFixed(1)},${o(m).toFixed(1)}`).join(" "),d=t.coasts?`<text x="${((a(t.burnTime)+a(t.shipTime-t.burnTime))/2).toFixed(1)}" y="${(o(t.topSpeed)+14).toFixed(1)}" text-anchor="middle">engine off, ${kt(t.coastTime)}</text>`:"";return`<svg class="trip" viewBox="0 0 ${Wn} ${ma}" role="img" aria-label="Speed against the ship's clock"><line class="grid" x1="${xe.left}" x2="${Wn-xe.right}" y1="${o(0)}" y2="${o(0)}"/><line class="grid" x1="${xe.left}" x2="${Wn-xe.right}" y1="${o(t.topSpeed)}" y2="${o(t.topSpeed)}"/><text x="${xe.left}" y="${o(t.topSpeed)-3}">${el(t.topSpeed)}</text><polyline class="line" points="${c}"/>${d}<text x="${xe.left}" y="${ma-6}">departure</text><text x="${Wn-xe.right}" y="${ma-6}" text-anchor="end">arrival, ${kt(t.shipTime)} on board</text></svg>`}function s$(t,e){const n=vn.map(o=>({destination:o,trip:tl(o.metres,t)})),s=n.map(({destination:o,trip:r})=>{const i=[o.name===e?"chosen":"",r.coasts?"coasts":""].filter(Boolean).join(" "),l=r.coasts?`all ${Ya(t.fuel)}, then coasts`:Ya(r.fuelBurnt);return`<tr${i?` class="${i}"`:""} data-destination="${o.name}"><th scope="row">${o.name}</th><td>${o.said}</td><td>${kt(r.shipTime)}</td><td>${kt(r.homeTime)}</td><td>${el(r.topSpeed)}</td><td>${l}</td></tr>`}).join(""),a=n.find(({destination:o})=>o.name===e)??n[0];return`<figure class="rocket"><table class="voyages"><thead><tr><th>to</th><th>distance</th><th>on board</th><th>at home</th><th>top speed</th><th>fuel burnt</th></tr></thead><tbody>${s}</tbody></table>`+(a?`<h4>To ${a.destination.name}: speed against the ship's clock</h4>${n$(a.trip,t)}`:"")+"</figure>"}function Gm(t){return{dryMass:os.dryMass,fuel:Number(t.fuel)*os.dryMass,exhaust:Number(t.exhaust)/100,acceleration:Number(t.acceleration)}}const Ic=365.25*86400,a$=94607e11,o$=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:2}),ci={name:"rocket",summary:"a relativistic rocket: how long a trip takes on board and at home, and what it burns",parameters:[{name:"acceleration",label:"Acceleration",description:"what the crew feels while the engine burns, in g",min:.05,max:3,step:.05,initial:.3,show:t=>`${t.toFixed(2)} g`},{name:"fuel",label:"Fuel",description:"fuel on board, as a multiple of the ship's own mass",min:.1,max:1e13,step:.05,initial:os.fuel/os.dryMass,scale:"log",show:t=>`${o$.format(t)} × the ship`},{name:"exhaust",label:"Exhaust speed",description:"the speed of what leaves the engine, in percent of the speed of light",min:1,max:100,step:1,initial:os.exhaust*100,show:t=>`${Math.round(t)}% of c`},{name:"to",label:"To",description:"where to fly",choices:vn.map(t=>t.name),initial:"Proxima Centauri"}],run(t){const e=Gm(t),n=String(t.to),s=vn.find(({name:r})=>r===n)??vn[0],a=tl(s.metres,e),o=a.coasts?`all ${Ya(e.fuel)} of fuel, then coasts`:`${Ya(a.fuelBurnt)} of fuel`;return{text:`to ${s.name}, ${s.said}: ${kt(a.shipTime)} on board, ${kt(a.homeTime)} at home, top speed ${el(a.topSpeed)}, ${o}`,html:s$(e,n),data:{ship:{dryMassTonnes:e.dryMass,fuelTonnes:e.fuel,exhaustFractionOfC:e.exhaust,accelerationG:e.acceleration},trip:{to:s.name,distance:s.said,distanceLightYears:s.metres/a$,onBoardYears:a.shipTime/Ic,atHomeYears:a.homeTime/Ic,topSpeedFractionOfC:a.topSpeed,fuelBurntTonnes:a.fuelBurnt,coasts:a.coasts}}}}},fa=[{name:"Proxima Centauri",ra:14.495,dec:-62.68,lightYears:4.24},{name:"Alpha Centauri",ra:14.66,dec:-60.83,lightYears:4.37},{name:"Barnard's Star",ra:17.963,dec:4.69,lightYears:5.96},{name:"Wolf 359",ra:10.941,dec:7.01,lightYears:7.86},{name:"Lalande 21185",ra:11.056,dec:35.97,lightYears:8.31},{name:"Sirius",ra:6.752,dec:-16.72,lightYears:8.58},{name:"Luyten 726-8",ra:1.65,dec:-17.95,lightYears:8.73},{name:"Ross 154",ra:18.83,dec:-23.84,lightYears:9.69},{name:"Ross 248",ra:23.699,dec:44.18,lightYears:10.3},{name:"Epsilon Eridani",ra:3.549,dec:-9.46,lightYears:10.52},{name:"Lacaille 9352",ra:23.098,dec:-35.85,lightYears:10.72},{name:"Ross 128",ra:11.796,dec:.8,lightYears:11.01},{name:"EZ Aquarii",ra:22.643,dec:-15.3,lightYears:11.1},{name:"61 Cygni",ra:21.115,dec:38.75,lightYears:11.4},{name:"Procyon",ra:7.655,dec:5.22,lightYears:11.46},{name:"Struve 2398",ra:18.713,dec:59.63,lightYears:11.5},{name:"Groombridge 34",ra:.306,dec:44.02,lightYears:11.6},{name:"Epsilon Indi",ra:22.056,dec:-56.78,lightYears:11.87},{name:"Tau Ceti",ra:1.734,dec:-15.94,lightYears:11.91}];function pa(t,e){const n=e.radius/e.reach;return t.map(({name:s,ra:a,dec:o,lightYears:r})=>{const i=a/24*2*Math.PI,l=o/180*Math.PI,h=r*Math.cos(l)*Math.cos(i),c=r*Math.cos(l)*Math.sin(i),d=r*Math.sin(l),u=c*Math.cos(e.yaw)-h*Math.sin(e.yaw),m=h*Math.cos(e.yaw)+c*Math.sin(e.yaw),f=d*Math.cos(e.pitch)-m*Math.sin(e.pitch),p=m*Math.cos(e.pitch)+d*Math.sin(e.pitch);return{name:s,x:u*n,y:-f*n,depth:p}})}const Pt=299792458,r$=9.81;function i$(t,e,n){const s=e.acceleration*r$,a=d=>({distance:Pt*Pt/s*(Math.cosh(s*d/Pt)-1),homeTime:Pt/s*Math.sinh(s*d/Pt),speed:Math.tanh(s*d/Pt)}),o=a(t.burnTime),r=t.homeTime-2*o.homeTime,i=r*t.topSpeed*Pt,l=2*o.distance+i,h=Math.max(0,Math.min(n,t.shipTime));if(h<=t.burnTime){const d=a(h);return{along:d.distance/l,homeTime:d.homeTime,speed:d.speed}}if(h<=t.burnTime+t.coastTime){const d=(h-t.burnTime)/t.coastTime;return{along:(o.distance+d*i)/l,homeTime:o.homeTime+d*r,speed:t.topSpeed}}const c=a(t.shipTime-h);return{along:1-c.distance/l,homeTime:t.homeTime-c.homeTime,speed:c.speed}}const ga=12.5,Cc=9,jc=1.5,l$=new Set(["Alpha Centauri"]),ue={ground:"#06080f",ring:"rgba(127,166,234,0.22)",stem:"rgba(127,166,234,0.18)",star:"#dfe7f5",dim:"#7d8aa3",sun:"#ffd98a",way:"#ff9d6e",ship:"#ffffff"};function h$(t,e,n){const s=t.getContext("2d");if(!s)return()=>{};const a=s,o=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=new Set(vn.map(({name:v})=>v));let i={yaw:.6,pitch:.45,radius:1,reach:ga},l=0,h=performance.now(),c=null,d=[];const u=()=>({x:t.clientWidth/2,y:t.clientHeight/2});function m(v){const b=t.clientWidth,k=t.clientHeight,x=window.devicePixelRatio||1;t.width!==Math.round(b*x)&&(t.width=Math.round(b*x),t.height=Math.round(k*x)),a.setTransform(x,0,0,x,0,0),a.fillStyle=ue.ground,a.fillRect(0,0,b,k),!o&&!c&&(i={...i,yaw:i.yaw+.0015}),i={...i,radius:Math.min(b,k)*.47};const T=u(),$=I=>({x:T.x+I.x,y:T.y+I.y});a.font="11px ui-monospace, Menlo, monospace";for(const I of[5,10]){const D=pa(Array.from({length:73},(B,W)=>({name:"",ra:W/72*24,dec:0,lightYears:I})),i);a.beginPath(),D.forEach((B,W)=>W?a.lineTo($(B).x,$(B).y):a.moveTo($(B).x,$(B).y)),a.strokeStyle=ue.ring,a.stroke();const C=$(D[0]??{x:0,y:0});a.fillStyle=ue.dim,a.fillText(`${I} ly`,C.x+4,C.y-3)}const{ship:O,chosen:L}=e(),F=vn.find(({name:I})=>I===L),N=fa.find(({name:I})=>I===L),j=F?tl(F.metres,O):null;d=pa(fa,i);const S=pa(fa.map(I=>({...I,lightYears:I.lightYears*Math.cos(I.dec/180*Math.PI),dec:0})),i),A=d.map((I,D)=>D).sort((I,D)=>(d[I]?.depth??0)-(d[D]?.depth??0));for(const I of A){const D=$(d[I]??{x:0,y:0}),C=$(S[I]??{x:0,y:0}),B=d[I]?.name??"",W=((d[I]?.depth??0)+ga)/(2*ga);a.strokeStyle=ue.stem,a.beginPath(),a.moveTo(D.x,D.y),a.lineTo(C.x,C.y),a.stroke(),a.fillStyle=B===L?ue.way:ue.star,a.globalAlpha=.45+.55*W,a.beginPath(),a.arc(D.x,D.y,1.6+1.8*W,0,2*Math.PI),a.fill(),r.has(B)&&(a.strokeStyle=B===L?ue.way:ue.dim,a.beginPath(),a.arc(D.x,D.y,7,0,2*Math.PI),a.stroke()),a.fillStyle=B===L?ue.way:ue.dim,l$.has(B)||a.fillText(B,D.x+10,D.y+4),a.globalAlpha=1}if(a.fillStyle=ue.sun,a.beginPath(),a.arc(T.x,T.y,4,0,2*Math.PI),a.fill(),a.fillText("the Sun",T.x+8,T.y-6),j&&F){const I=F.towards?pa([{name:"",...F.towards,lightYears:ga*1.15}],i)[0]:null,D=N?d[fa.indexOf(N)]:I,C=(v-h)/1e3%(Cc+2*jc),B=o?.5:Math.min(1,Math.max(0,(C-jc)/Cc)),W=i$(j,O,B*j.shipTime);if(D){const z=$(D);a.strokeStyle=ue.way,a.setLineDash(N?[]:[4,4]),a.beginPath(),a.moveTo(T.x,T.y),a.lineTo(z.x,z.y),a.stroke(),a.setLineDash([]);const de={x:T.x+(z.x-T.x)*W.along,y:T.y+(z.y-T.y)*W.along};a.fillStyle=ue.ship,a.beginPath(),a.arc(de.x,de.y,3,0,2*Math.PI),a.fill(),N||a.fillText(`to ${F.name}, ${F.said}: not to scale`,12,k-34)}else a.fillStyle=ue.dim,a.fillText(`${F.name} is inside the dot: the planets are a thousandth of a light-year away`,12,k-34);a.fillStyle=ue.star,a.font="13px ui-monospace, Menlo, monospace",a.fillText(`on board ${kt(B*j.shipTime)}`,12,22),a.fillText(`at home  ${kt(W.homeTime)}`,12,40),a.fillStyle=ue.dim,a.fillText(`${(W.speed*100).toFixed(W.speed>.99?4:1)}% of c`,12,58),a.fillText("drag to turn",b-96,k-14)}l=o&&!c?0:requestAnimationFrame(m)}const f=v=>{const b=t.getBoundingClientRect();return{x:v.clientX-b.left,y:v.clientY-b.top}},p=v=>{c=f(v),t.setPointerCapture(v.pointerId),l||(l=requestAnimationFrame(m))},w=v=>{if(!c)return;const b=f(v);i={...i,yaw:i.yaw+(b.x-c.x)*.01,pitch:Math.max(-1.4,Math.min(1.4,i.pitch+(b.y-c.y)*.01))},c=b},g=v=>{const b=f(v),k=u(),x=d.find(T=>r.has(T.name)&&Math.hypot(k.x+T.x-b.x,k.y+T.y-b.y)<12);c=null,x&&(h=performance.now(),n(x.name))};return t.addEventListener("pointerdown",p),t.addEventListener("pointermove",w),t.addEventListener("pointerup",g),l=requestAnimationFrame(m),()=>{cancelAnimationFrame(l),t.removeEventListener("pointerdown",p),t.removeEventListener("pointermove",w),t.removeEventListener("pointerup",g)}}const c$=(t,e)=>{let n=Qi(ci);const s=l=>{n=l.detail};t.addEventListener(hi,s);const a=zm(ci)(t,e),o=l=>{const h=l.target?.closest("[data-destination]")?.getAttribute("data-destination");h&&li(t,{to:h})};t.addEventListener("click",o);const r=y("canvas",{class:"starmap","aria-label":"The stars within twelve light-years of the Sun, turning, with the ship flying the chosen trip"});t.prepend(r);const i=h$(r,()=>({ship:Gm(n),chosen:String(n.to)}),l=>li(t,{to:l}));return()=>{i(),a?.(),t.removeEventListener(hi,s),t.removeEventListener("click",o)}},d$={name:"rocket",programs:[ci],apps:{rocket:c$}},di=["Go to the blog section,","You should see a list of posts,",'The last post title should be "Hello Blog", this post'];function u$(t){let e=0,n="";const s=[],a={},o=h=>{const c=h.exec(t.slice(e));return c&&(e+=c[0].length),c?.[0]},r=h=>{n+=n.length===0?h.toLowerCase():h[0]?.toUpperCase()+h.slice(1).toLowerCase()},i=(h,c,d)=>{const u=a[c]??1;a[c]=u+1;const m=/shouldBe/i.test(n)&&!s.some(f=>f.name==="expected");s.push({value:h,name:m?"expected":`${c}${u}`,type:d})};let l=-1;for(;e<t.length&&l!==e;){l=e,o(/^[^a-z0-9"]+/i);const h=o(/^[a-z]+/i);h&&r(h);const c=o(/^"[^"]+"/);c&&(i(c,"s","String"),r("S"));const d=o(/^[0-9]+/);d&&(i(d,"n","int"),r("N"))}return{name:n,arguments:s,text:t}}const wa=(t,e,n,s)=>`<div class="${s}"><h4>${M(t)}</h4><pre><code>${Me(n,e)}</code></pre></div>`;function Nc(t){const e=t.map(s=>`context.${s.name}(${s.arguments.map(a=>a.value).join(", ")});`),n=Math.max(0,...e.map(s=>s.length));return e.map((s,a)=>`  ${s.padEnd(n)}  // ${t[a]?.text.trim()}`).join(`
`)}function Lc(t){const e=new Set;return t.filter(n=>!e.has(n.name)&&e.add(n.name))}function _m(t){const e=t.map(u$).filter(r=>r.name.length>0),n=`@Test
public void post() {
${Nc(e)}
}`,s=`test("post", () => {
${Nc(e)}
});`,a=Lc(e).map(r=>`public void ${r.name}(${r.arguments.map(i=>`${i.type} ${i.name}`).join(", ")}) {
  // to write
}`).join(`

`),o=Lc(e).map(r=>`${r.name}(${r.arguments.map(i=>i.name).join(", ")}) {
  // to write
}`).join(`

`);return'<div class="step-code">'+wa("The test, for the server","java",n,"step-test")+wa("The test, for the client","js",s,"step-test")+wa("What is left to write, in Java","java",a,"step-context")+wa("And in JavaScript","js",o,"step-context")+"</div>"}function m$(t){const e=y("textarea",{class:"step-post",rows:6,spellcheck:!1,"aria-label":"A post, one step a line"});e.value=di.map(a=>`* ${a}`).join(`
`);const n=y("div"),s=()=>{n.innerHTML=_m(e.value.split(`
`).map(a=>a.replace(/^\s*[*-]\s*/,"")))};e.addEventListener("input",s),t.replaceChildren(e,n),s()}const f$=()=>`<pre class="step-post">${di.map(t=>`* ${t}`).join(`
`)}</pre>${_m(di)}`,p$={name:"step-names",apps:{"step-names":m$},stills:{"step-names":f$}},ts='import Game from "./bowling";',ge=`${ts}

let g;
beforeEach(() => (g = new Game()));`,dn=(t,e,n="i++")=>`test("gutter game", () => {
${t?`  const g = new Game();
`:""}  for (let i = 0; i < 20; ${n})
    g.roll(0);
${e?`  expect(g.score()).toBe(0);
`:""}});`,Ft=(t,e="i++")=>`test("all ones", () => {
${t?`  const g = new Game();
`:""}  for (let i = 0; i < 20; ${e})
    g.roll(1);
  expect(g.score()).toBe(20);
});`,Qe=`test("gutter game", () => {
  rollMany(20, 0);
  expect(g.score()).toBe(0);
});`,dt=`test("all ones", () => {
  rollMany(20, 1);
  expect(g.score()).toBe(20);
});`,Um=`test("one spare", () => {
  g.roll(5);
  g.roll(5); // spare
  g.roll(3);
  rollMany(17, 0);
  expect(g.score()).toBe(16);
});`,g$=Um.split(`
`).map(t=>`// ${t}`).join(`
`),Hn=`test("one spare", () => {
  rollSpare();
  g.roll(3);
  rollMany(17, 0);
  expect(g.score()).toBe(16);
});`,w$=`test("one strike", () => {
  g.roll(10); // strike
  g.roll(3);
  g.roll(4);
  rollMany(16, 0);
  expect(g.score()).toBe(24);
});`,pr=`test("one strike", () => {
  rollStrike();
  g.roll(3);
  g.roll(4);
  rollMany(16, 0);
  expect(g.score()).toBe(24);
});`,Pc=t=>`test("perfect game", () => {
  rollMany(12, 10);
  expect(g.score()).toBe(${t});
});`,qn=`function rollMany(rolls, pins) {
  for (let i = 0; i < rolls; i += 1)
    g.roll(pins);
}`,zn=`function rollMany(rolls, pins) {
  for (let i = 0; i < rolls; i += 1) g.roll(pins);
}`,Gn=`function rollSpare() {
  g.roll(5);
  g.roll(5);
}`,gr=`function rollStrike() {
  g.roll(10);
}`,ie=(...t)=>t.join(`

`),U={gutterNoImport:`test('gutter game', () => {
  const g = new Game();
});`,gutterNew:ie(ts,`test("gutter game", () => {
  const g = new Game();
});`),gutterRolls:ie(ts,dn(!0,!1)),gutterScore:ie(ts,dn(!0,!0)),allOnes:ie(ts,dn(!0,!0),Ft(!0)),setUp:ie(ge,dn(!0,!0),Ft(!0)),gutterShared:ie(ge,dn(!1,!0),Ft(!0)),bothShared:ie(ge,dn(!1,!0),Ft(!1)),named:ie(ge,`test("gutter game", () => {
  const pins = 0;
  const rolls = 20;
  for (let i = 0; i < rolls; i += 1)
    g.roll(pins);
  expect(g.score()).toBe(0);
});`,Ft(!1,"i += 1")),extracted:ie(ge,`test("gutter game", () => {
  const pins = 0;
  const rolls = 20;
  rollMany(rolls, pins);
  expect(g.score()).toBe(0);
});`,Ft(!1,"i += 1"),qn),inlined:ie(ge,Qe,Ft(!1,"i += 1"),qn),rollMany:ie(ge,Qe,dt,qn),spare:ie(ge,Qe,dt,Um,qn),spareAside:ie(ge,Qe,dt,g$,qn),rollSpare:ie(ge,Qe,dt,Hn,zn,Gn),strike:ie(ge,Qe,dt,Hn,w$,zn,Gn),rollStrike:ie(ge,Qe,dt,Hn,pr,zn,Gn,gr),perfect:ie(ge,Qe,dt,Hn,pr,Pc("300"),zn,Gn,gr),perfectFails:ie(ge,Qe,dt,Hn,pr,Pc('"fail"'),zn,Gn,gr)},le=(...t)=>`export default class Game {
${t.join(`
`)}
}`,X=(t,...e)=>e.length?`  ${t} {
${e.map(n=>`    ${n}`).join(`
`)}
  }`:`  ${t} {}`,wr=["let score = 0;","for (let i = 0; i < this.#rolls.length; i++) {","  score += this.#rolls[i];","}","return score;"],Bt=(...t)=>["const rolls = this.#rolls;","let score = 0;",...t,"return score;"],we="  #rolls = [];",Fe=X("roll(pins)","this.#rolls.push(pins);"),un=`function isSpare(rolls, frameIndex) {
  return rolls[frameIndex] + rolls[frameIndex + 1] == 10;
}`,y$=`function isStrike(rolls, frameIndex) {
  return rolls[frameIndex] === 10;
}`,ya=`function strikeBonus(rolls, frameIndex) {
  return rolls[frameIndex + 1] + rolls[frameIndex + 2];
}`,yr=`function spareBonus(rolls, frameIndex) {
  return rolls[frameIndex + 2];
}`,Fc=`function sumOfBallsInFrame(rolls, frameIndex) {
  return rolls[frameIndex] + rolls[frameIndex + 1];
}`,Rt=t=>["let frameIndex = 0;","for (let frame = 0; frame < 10; frame++) {",...t.map(e=>`  ${e}`),"}"],Bc=(t,e)=>[`if (${t}) {`,...t.includes("isSpare")?[]:["  // spare"],"  score += 10 + rolls[frameIndex + 2];","  frameIndex += 2;","} else {",`  score += ${e};`,"  frameIndex += 2;","}"],G={none:"",empty:"export default class Game {}",roll:le(X("roll()")),scoreEmpty:le(X("roll()"),X("score()")),scoreZero:le(X("roll()"),X("score()","return 0;")),summing:le("  #score = 0;",X("roll(pins)","this.#score += pins;"),X("score()","return this.#score;")),rollsField:le("  #score = 0;",we,X("roll(pins)","this.#score += pins;"),X("score()","return this.#score;")),bothWritten:le("  #score = 0;",we,X("roll(pins)","this.#score += pins;","this.#rolls.push(pins);"),X("score()","return this.#score;")),readFromRolls:le("  #score = 0;",we,X("roll(pins)","this.#score += pins;","this.#rolls.push(pins);"),X("score()",...wr)),oldUnwritten:le("  #score = 0;",we,Fe,X("score()",...wr)),rollsOnly:le(we,Fe,X("score()",...wr)),twoAtATime:le(we,Fe,X("score()","const rolls = this.#rolls;","let score = 0;","let i = 0;","for (let frame = 0; frame < 10; frame++) {","  score += rolls[i] + rolls[i + 1];","  i += 2;","}","return score;")),spareByI:le(we,Fe,X("score()","const rolls = this.#rolls;","let score = 0;","let i = 0;","for (let frame = 0; frame < 10; frame++) {","  if (rolls[i] + rolls[i + 1] == 10) {","    // spare","    score += 10 + rolls[i + 2];","    i += 2;","  } else {","    score += rolls[i] + rolls[i + 1];","    i += 2;","  }","}","return score;")),frameIndex:le(we,Fe,X("score()",...Bt(...Rt(Bc("rolls[frameIndex] + rolls[frameIndex + 1] == 10","rolls[frameIndex] + rolls[frameIndex + 1]"))))),isSpare:`${le(we,Fe,X("score()",...Bt(...Rt(Bc("isSpare(rolls, frameIndex)","rolls[frameIndex] + rolls[frameIndex + 1]")))))}

${un}`,strike:`${le(we,Fe,X("score()",...Bt(...Rt(["if (rolls[frameIndex] == 10) {","  // strike","  score += 10 +","    rolls[frameIndex + 1] +","    rolls[frameIndex + 2];","  frameIndex += 1;","} else if (isSpare(rolls, frameIndex)) {","  score += 10 + rolls[frameIndex + 2];","  frameIndex += 2;","} else {","  score += rolls[frameIndex] + rolls[frameIndex + 1];","  frameIndex += 2;","}"]))))}

${un}`,strikeBonus:`${le(we,Fe,X("score()",...Bt(...Rt(["if (rolls[frameIndex] == 10) {","  // strike","  score += 10 + strikeBonus(rolls, frameIndex);","  frameIndex += 1;","} else if (isSpare(rolls, frameIndex)) {","  score += 10 + rolls[frameIndex + 2];","  frameIndex += 2;","} else {","  score += rolls[frameIndex]+rolls[frameIndex + 1];","  frameIndex += 2;","}"]))))}

${ya}

${un}`,spareBonus:`${le(we,Fe,X("score()",...Bt(...Rt(["if (rolls[frameIndex] == 10) {","  // strike","  score += 10 + strikeBonus(rolls, frameIndex);","  frameIndex += 1;","} else if (isSpare(rolls, frameIndex)) {","  score += 10 + spareBonus(rolls, frameIndex);","  frameIndex += 2;","} else {","  score += rolls[frameIndex]+rolls[frameIndex + 1];","  frameIndex += 2;","}"]))))}

${ya}

${yr}

${un}`,sumOfBalls:`${le(we,Fe,X("score()",...Bt(...Rt(["if (rolls[frameIndex] == 10) {","  // strike","  score += 10 + strikeBonus(rolls, frameIndex);","  frameIndex += 1;","} else if (isSpare(rolls, frameIndex)) {","  score += 10 + spareBonus(rolls, frameIndex);","  frameIndex += 2;","} else {","  score += sumOfBallsInFrame(rolls, frameIndex);","  frameIndex += 2;","}"]))))}

${ya}

${yr}

${Fc}

${un}`,isStrike:`${le(we,Fe,X("score()",...Bt(...Rt(["if (isStrike(rolls, frameIndex)) {","  score += 10 + strikeBonus(rolls, frameIndex);","  frameIndex += 1;","} else if (isSpare(rolls, frameIndex)) {","  score += 10 + spareBonus(rolls, frameIndex);","  frameIndex += 2;","} else {","  score += sumOfBallsInFrame(rolls, frameIndex);","  frameIndex += 2;","}"]))))}

${y$}

${ya}

${yr}

${Fc}

${un}`},et=["Roll loop is duplicated","Game creation duplicated"],ye=["ugly comment in test."],br=["ugly comment in test.","ugly comment in conditional.","i is a bad name for this variable"],_n=["ugly comment in test.","ugly comment in conditional.","ugly expressions."],_=(t,e,n,s,a=[],o)=>o===void 0?{commit:t,stage:e,test:n,code:s,smells:a}:{commit:t,stage:e,test:n,code:s,smells:a,note:o},qt=[_(0,"test","",G.none,[],"Create the BowlingGame project. Create a test file bowling.spec.js. Execute the test and verify that you get the following error."),_(1,"test",U.gutterNoImport,G.none),_(2,"code",U.gutterNew,G.empty),_(3,"test",U.gutterRolls,G.empty),_(4,"code",U.gutterRolls,G.roll),_(5,"test",U.gutterScore,G.roll),_(6,"code",U.gutterScore,G.scoreEmpty),_(7,"code",U.gutterScore,G.scoreZero),_(8,"test",U.allOnes,G.scoreZero,et),_(9,"code",U.allOnes,G.summing,et),_(10,"clean",U.setUp,G.summing,et),_(11,"clean",U.gutterShared,G.summing,et),_(12,"clean",U.bothShared,G.summing,et),_(13,"clean",U.named,G.summing,et),_(14,"clean",U.extracted,G.summing,et),_(15,"clean",U.inlined,G.summing,et),_(16,"clean",U.rollMany,G.summing,et),_(17,"test",U.spare,G.summing,ye),_(18,"test",U.spareAside,G.summing,ye,"Tempted to use flag to remember previous roll. So design must be wrong. roll() calculates score, but name does not imply that. score() does not calculate score, but name implies that it does. Design is wrong. Responsibilities are misplaced."),_(19,"clean",U.spareAside,G.rollsField,ye),_(20,"clean",U.spareAside,G.bothWritten,ye),_(21,"clean",U.spareAside,G.readFromRolls,ye),_(22,"clean",U.spareAside,G.oldUnwritten,ye),_(23,"clean",U.spareAside,G.rollsOnly,ye),_(24,"test",U.spare,G.rollsOnly,ye),_(25,"test",U.spareAside,G.rollsOnly,ye,"This isn’t going to work because i might not refer to the first ball of the frame. Design is still wrong. Need to walk through array two balls (one frame) at a time."),_(26,"clean",U.spareAside,G.twoAtATime,ye),_(27,"test",U.spare,G.twoAtATime,ye),_(28,"code",U.spare,G.spareByI,ye),_(29,"clean",U.spare,G.frameIndex,br),_(30,"clean",U.spare,G.isSpare,br),_(31,"clean",U.rollSpare,G.isSpare,br),_(32,"test",U.strike,G.isSpare,ye),_(33,"code",U.strike,G.strike,ye),_(34,"clean",U.strike,G.strikeBonus,_n),_(35,"clean",U.strike,G.spareBonus,_n),_(36,"clean",U.strike,G.sumOfBalls,_n),_(37,"clean",U.strike,G.isStrike,_n),_(38,"clean",U.rollStrike,G.isStrike,_n),_(39,"test",U.perfect,G.isStrike),_(40,"test",U.perfectFails,G.isStrike),_(41,"test",U.perfect,G.isStrike)];function b$(t,e){const n=t===""?[]:t.split(`
`),s=e.split(`
`),a=Array.from({length:n.length+1},()=>new Array(s.length+1).fill(0));for(let l=n.length-1;l>=0;l-=1)for(let h=s.length-1;h>=0;h-=1)a[l][h]=n[l]===s[h]?(a[l+1][h+1]??0)+1:Math.max(a[l+1][h]??0,a[l][h+1]??0);const o=[];let r=0,i=0;for(;r<n.length||i<s.length;)r<n.length&&i<s.length&&n[r]===s[i]?(o.push({kind:"same",line:s[i]}),r+=1,i+=1):r<n.length&&(i>=s.length||(a[r+1][i]??0)>=(a[r][i+1]??0))?(o.push({kind:"removed",line:n[r]}),r+=1):(o.push({kind:"added",line:s[i]}),i+=1);return o}const ba={id:"fc771d5e39e8",title:"Lessons Learned From The Bowling Game Kata: What To Test?"},Un={id:"90b110a2ad17",title:"Refactor Lessons Learned From The Bowling Game Kata (1/2)"},ut={id:"1d28b3a78b08",title:"Refactor Lessons Learned From The Bowling Game Kata (2/2)"},Rc={id:"a37d8d11be9c",title:"Lessons Learned From The Bowling Game Kata: How To Design?"},Dc={id:"6813582074f3",title:"Don't Trust Tests"},v$=[{commits:[1,4],title:"Step tests come and go",text:"The test first only creates a game, as a step test would, and then rolls, as another would. Such tests appear and disappear while a business test is written: none is needed.",essay:{...ba,section:"Chapter Four. Step tests are redundant."}},{commits:[5,7],title:"The simplest rule first",text:"The gutter game scores no point, so it needs no hard thinking, and it lays the foundation of the code. Then comes the simplest rule that remains, and so on.",essay:{...ba,section:"Chapter Seven. Start with the most simple rule."}},{commits:[8,9],title:"Refactor only after it works",text:"The second test repeats code from the first, and the kata waits: it only marks the duplication. Solving the problem and cleaning the code are two tasks, and the first comes first.",essay:{...Un,section:"Lesson 1: Refactor only after it works."}},{commits:[10,10],title:"Add new code before removing the old",text:"It works again, so the refactor begins, oddly: a game for every test, kept and then ignored. Doing nothing, it breaks nothing — which shows the new code is safe to use.",essay:{...Un,section:"Lesson 2: Add new code before removing old."}},{commits:[11,12],title:"Remove as little as possible",text:"The old creation goes one test at a time: the gutter game first, then, once everything works, all ones. Should they behave differently, a small change makes the cause easy to find.",essay:{...Un,section:"Lesson 3: Remove the minimal amount of old code."}},{commits:[13,13],title:"One aspect at a time",text:"Only with the game's creation clean does the kata turn to the other thing to clean, the repeated loop. Many improvements may come to mind; it takes them one at a time.",essay:{...Un,section:"Lesson 4: Refactor only one aspect at a time."}},{commits:[14,16],title:"Let the IDE do it",text:"With the rolls and the pins in constants, extracting the loop makes them the parameters of rollMany, and nothing is done by hand. Then the constants go, and the second loop calls it too.",essay:{...Un,section:"Lesson 5: Leverage on the IDE."}},{commits:[17,17],title:"Not from scratch",text:"The design so far is the least one the needs so far asked for, and it was necessary. Now it no longer serves, and starting again from scratch is out of the question.",essay:{...ut,section:"The Final Lesson"}},{commits:[18,18],title:"Step 0 · Name the parts",text:"The failing test is set aside, so everything works again before the refactor. Then the kinds of code: the counter is the internal representation, roll its setter, score its getter.",essay:{...ut,section:"Step 0. Identifying types of code"}},{commits:[19,19],title:"Step 1 · Add the new beside the old",text:"The new internal representation, the list of rolls, goes in just below the counter. The old one is not removed, so the code still works.",essay:{...ut,section:"Step 1. Introducing the new internal representation"}},{commits:[20,20],title:"Step 2 · Write to both",text:"The setter, roll, also keeps each roll in the list. It goes on updating the counter as well, so for now it writes to both, and the code still works.",essay:{...ut,section:"Step 2. Make setters update the new internal representation."}},{commits:[21,21],title:"Step 3 · Read from the new",text:"The getter, score, now adds up the list. Only its own old line goes: that breaks nobody, and an undo would bring it back. The counter and its update stay.",essay:{...ut,section:"Step 3. Make getters use the new internal representation."}},{commits:[22,22],title:"Step 4 · Stop writing the old",text:"roll stops updating the counter, and everything works: no getter reads it any more. Had something broken, some code would still be using it: undo the removal, and keep refactoring.",essay:{...ut,section:"The Five Steps"}},{commits:[23,23],title:"Step 5 · Remove the old",text:"Nobody uses the counter, so it goes, and the code works again — the mantra behind each step. So every step could be committed and merged, without stopping delivery.",essay:{...ut,section:"The five steps mantra"}},{commits:[24,26],title:"No guarantee of success",text:"The refactor is complete, and the spare still fails: a good technique is not a guarantee. It works again first; then most of the code stays, and only the algorithm changes.",essay:{...ut,section:"Additional steps."}},{commits:[27,27],title:"The test comes back as it was",text:"The spare test returns unchanged; the kata writes no test for its roll-by-roll attempt. It just continues the refactor, and fixes the algorithm.",essay:{...ba,section:"Chapter Five. Do not test mistakes."}},{commits:[32,32],title:"The tests are the rules",text:"The strike test is one more rule of scoring: tests and rules match one by one. They call the game, roll and score, and what they test is the business rules.",essay:{...ba,section:"Chapter One. The basics."}},{commits:[37,37],title:"Code that reads as the rules",text:"The score now reads as the instructions for scoring bowling: frame by frame, a strike, a spare or neither, with the bonuses where they are due.",essay:{...Rc,section:"Comparing typical design with the kata design"}},{commits:[39,39],title:"No code for the tenth frame",text:"The perfect game passes at once. The tenth frame has no code and no test of its own: this game checks it, and the bonuses count its extra rolls.",essay:{...Rc,section:"Where is the Tenth Frame?"}},{commits:[40,40],title:"Make it fail once",text:"A test that passes without failing first has lost what TDD gives: a mistake could pass unnoticed. So it is made to fail on purpose, and the error shows it checks the right thing.",essay:{...Dc,section:""}},{commits:[41,41],title:"Trust a test seen failing",text:"Seen failing as it should, the test is known to check the right thing, and it gets its expectation back. Never trust a test that did not fail before.",essay:{...Dc,section:""}}];function Ym(t){return v$.find(({commits:[e,n]})=>t>=e&&t<=n)}function mo(t){return t instanceof Error?`${t.name}: ${t.message}`:String(t)}const Jm=new WeakSet,ns=t=>typeof t=="string"?JSON.stringify(t):typeof t=="function"?Jm.has(t)?"[MockFunction]":`[Function ${t.name||"anonymous"}]`:String(t),Km=t=>t.map(ns).join(", "),Wc=t=>t.length===0?"called with no arguments":`called with ${Km(t)}`;class Ia extends Error{}const Hc=t=>t instanceof Ia?t.message:mo(t);function k$(){const t=[],e=Object.assign((...n)=>{t.push(n)},{calls:t});return Jm.add(e),e}const $$=(t,e)=>t.length===e.length&&t.every((n,s)=>Object.is(n,e[s]));function x$(t){return{toBe(e){if(!Object.is(t,e))throw new Ia(`Expected: ${ns(e)}. Received: ${ns(t)}.`)},toContain(e){if(!Array.isArray(t)||!t.includes(e))throw new Ia(`Expected: something containing ${ns(e)}. Received: ${Array.isArray(t)?`[${Km(t)}]`:ns(t)}.`)},toHaveBeenCalledWith(...e){const n=t?.calls??[];if(n.some(a=>$$(a,e)))return;const s=n[n.length-1];throw new Ia(`Expected: ${Wc(e)}. Received: ${s?Wc(s):"never called"}.`)}}}function Ja(t,e={}){const n=[],s=[],a=[],o=(d,u)=>n.push({name:[...a,d].join(" "),body:u}),r=(d,u)=>{a.push(d),u(),a.pop()},i=["test","it","describe","beforeEach","expect","fn",...Object.keys(e)],l=[o,o,r,d=>s.push(d),x$,k$,...Object.values(e)];try{new Function(...i,t)(...l)}catch(d){return{passed:!1,message:Hc(d),results:[]}}if(n.length===0)return{passed:!1,message:"Your test suite must contain at least one test.",results:[]};const h=n.map(({name:d,body:u})=>{try{for(const m of s)m();return u(),{name:d,passed:!0}}catch(m){return{name:d,passed:!1,message:Hc(m)}}}),c=h.find(d=>!d.passed);return c?{passed:!1,message:c.message,results:h}:{passed:!0,results:h}}const qc=/^\s*import Game from "\.\/bowling";\s*$/m;function Vm(t,e){let n;try{n=e.trim()?new Function(`${e.replace(/export default class Game/,"class Game")}
return Game;`)():void 0}catch(s){return{passed:!1,message:mo(s),results:[]}}return qc.test(t)?Ja(t.replace(qc,""),{Game:n}):Ja(t)}const T$={test:"Test: write or change a test",code:"Code: write what the test asks for",clean:"Clean: tidy, and stay green"},M$={same:"line",added:"line added",removed:"line removed"};function zc(t,e,n,s){const a=n===void 0?e.split(`
`).map(r=>({kind:"same",line:r})):b$(n,e);if(!e.trim()&&!a.some(r=>r.kind==="removed"))return`<figure class="kata-file"><figcaption>${t}</figcaption><p class="kata-empty">${s}</p></figure>`;const o=a.map(({kind:r,line:i})=>`<span class="${M$[r]}">${Me(i,"js")||" "}</span>`);return`<figure class="kata-file"><figcaption>${t}</figcaption><pre><code>${o.join(`
`)}</code></pre></figure>`}function Xm(t,e){const n=Vm(t.test,t.code),s=n.passed?'<p class="kata-bar green">All tests pass.</p>':`<p class="kata-bar red">${M(n.message??"")}</p>`,a=t.smells.length?`<div class="kata-smells"><h4>Still to clean</h4><ul>${t.smells.map(l=>`<li>${M(l)}</li>`).join("")}</ul></div>`:"",o=t.note?`<p class="kata-note">${M(t.note)}</p>`:"",r=Ym(t.commit),i=r?`<aside class="kata-lesson"><h4>${M(r.title)}</h4><p>${M(r.text)} <a href="https://medium.com/p/${r.essay.id}" target="_blank" rel="noopener noreferrer">${M(r.essay.title)}${r.essay.section?` — ${M(r.essay.section)}`:""}</a></p></aside>`:"";return`<div class="kata-step"><p class="kata-move"><strong>commit ${t.commit}</strong> · ${T$[t.stage]}</p>${s}${i}<div class="kata-files">${zc("bowling.spec.js",t.test,e?.test,"An empty file.")}${zc("bowling.js",t.code,e?.code,"Not written yet.")}</div>${o}${a}</div>`}function S$(t,e){return`commit ${t.commit} · ${t.stage} · ${e.passed?"All tests pass.":e.message}`}function Zm(t,e){return`<ol class="kata-strip" aria-label="The commits of the kata, red or green">${t.map(a=>{const o=Vm(a.test,a.code),r=o.passed?"green":"red",i=a.commit===e;return`<li class="${r} ${a.stage}${i?" here":""}" data-commit="${a.commit}" title="${M(S$(a,o))}"${i?' aria-current="step"':""}>${a.commit}</li>`}).join("")}</ol><p class="kata-legend"><span class="red">a test fails</span> <span class="green code">all pass</span> <span class="green clean">a clean step: all still pass</span></p>`}const A$=()=>`<div class="kata">${Zm(qt,0)}${Xm(qt[0])}</div>`,Gc=qt.length-1;function E$(t){let e=0;const n=y("div"),s=y("div"),a=y("button",{type:"button"},"← previous"),o=y("button",{type:"button",class:"invite"},"next →"),r=y("span",{class:"kata-hint"},"click any commit, or use ← →"),i=l=>{l!==e&&o.classList.remove("invite"),e=Math.max(0,Math.min(Gc,l)),n.innerHTML=Zm(qt,e),s.innerHTML=Xm(qt[e],qt[e-1]),a.disabled=e===0,o.disabled=e===Gc};a.addEventListener("click",()=>i(e-1)),o.addEventListener("click",()=>i(e+1)),n.addEventListener("click",l=>{const h=l.target?.closest("[data-commit]");h&&i(Number(h.dataset.commit))}),t.tabIndex=0,t.addEventListener("keydown",l=>{if(l.key==="ArrowRight")i(e+1);else if(l.key==="ArrowLeft")i(e-1);else return;l.preventDefault()}),t.replaceChildren(y("div",{class:"kata"},n,y("div",{class:"kata-nav"},a,o,r),s)),i(0)}const O$=/^---(?:\s+(.*))?$/;function I$(t){const e=[];let n=[];for(const s of t.split(`
`)){const a=O$.exec(s);if(!a){n.push(s);continue}const o=a[1]?.trim()??"",r=/^(red|green)\s/.exec(o)?.[1],i=n.join(`
`);o?e.push({text:i,status:r?{kind:r,text:o.slice(r.length).trim()}:{kind:"note",text:o}}):e.push({text:i}),n=[]}return n.some(s=>s.trim())&&e.push({text:n.join(`
`)}),e}function Qm(t,e){const n=I$(t),s=n.map((a,o)=>{const r=a.status?`<p class="slide-status ${a.status.kind}">${M(a.status.text)}</p>`:"";return`<div class="slide${o===n.length-1?" current":""}"><pre><code>${Me(a.text,e)}</code></pre>${r}</div>`});return`<figure class="slides" data-language="${M(e)}"><div class="slides-screen">${s.join("")}</div></figure>`}const C$=[18,19,20,21,22,23];function j$(){return C$.map(t=>`${qt[t]?.code??""}
--- green commit ${t} · ${Ym(t)?.title??""} — all tests pass.`).join(`
`)}function ef(){return Qm(j$(),"js")}function N$(t){t.querySelector("figure.slides")||(t.innerHTML=ef())}const L$=()=>ef(),P$={name:"bowling-kata",apps:{"bowling-kata":E$,"kata-five-steps":N$},stills:{"bowling-kata":A$,"kata-five-steps":L$}},ui=[{name:"original",label:"Original",said:"The dispatcher the three tests imply: its listeners kept in an array, _queue.",source:`class Dispatcher {
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
}`}],F$=`let dispatcher, cb;
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
});`;function B$(t,e=F$){let n;try{n=new Function(`${t}
return Dispatcher;`)()}catch(s){return{passed:!1,message:mo(s),results:[]}}return Ja(e,{Dispatcher:n})}const _c=["addListener should add a callback to the queue","deliver should invoke queue callbacks with the received argument"];function mi(t){const e=B$(t.source),n=a=>{const o=e.results.find(l=>l.name===a),r=o?.passed??!1,i=r?"":`<span class="said">${M(o?.message??e.message??"")}</span>`;return`<li class="${r?"green":"red"}"><code>${M(a)}</code>${i}</li>`},s=e.results.map(a=>a.name).filter(a=>!_c.includes(a));return`<div class="dispatcher-run"><figure class="kata-file"><figcaption>dispatcher.js — ${M(t.label.toLowerCase())}</figcaption><pre><code>${Me(t.source,"js")}</code></pre></figure><div class="dispatcher-tests"><p class="said-change">${M(t.said)}</p><h4>Looking inside</h4><ul class="test-results">${_c.map(n).join("")}</ul><h4>Reading like documentation</h4><ul class="test-results">${s.map(n).join("")}</ul></div></div>`}function R$(t){const e=y("div"),n=ui.map((s,a)=>{const o=y("input",{type:"radio",name:"dispatcher",value:s.name,checked:a===0});return o.addEventListener("change",()=>{e.innerHTML=mi(s)}),y("label",{},o,` ${s.label}`)});t.replaceChildren(y("div",{class:"dispatcher-choice",role:"radiogroup","aria-label":"The dispatcher"},...n),e),e.innerHTML=mi(ui[0])}const D$=()=>ui.map(t=>`<section><h4>${t.label}</h4>${mi(t)}</section>`).join(""),W$={name:"tests-as-examples",apps:{"tests-as-examples":R$},stills:{"tests-as-examples":D$}},tf=`Feature: Magic of Disappearing Cucumbers

  Scenario: Eating 5 out of 12 cucumbers
    Given I have 12 cucumbers
    When I eat 5 cucumbers
    Then I should have 7 cucumbers remaining`,nf=`class CucumberSteps {
  #count = 0;

  givenIHaveNCucumbers(count) {
    this.#count = count;
  }
}`,Uc=(t,e)=>`<p class="kata-bar ${t?"green":"red"}">${M(e)}</p>`;function sf(t){if(t.error)return Uc(!1,t.error);if(t.wished){const[s="",...a]=t.wished.split(`
`);return`<pre class="genie-wished">${M(s)}
${Me(a.join(`
`),"js")}</pre>`}const e=t.run;if(!e)return"";const n=e.results.map(s=>`<li class="${s.passed?"green":"red"}"><code>${M(s.name)}</code>${s.passed?"":`<span class="said">${M(s.message??"")}</span>`}</li>`);return`${Uc(e.passed,e.passed?"Every scenario passes.":e.message??"")}<ul class="test-results">${n.join("")}</ul>`}const H$={n:`
`,r:"\r",t:"	",b:"\b",f:"\f",v:"\v",0:"\0",s:" "},Yc=t=>t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();function q$(t,e){return t.endsWith(e)?t.at(-2)!=="\\"||/(^|[^\\])(\\\\)+.$/.test(t):!1}function af(t){const e=t.split(" "),n=[],s=[];for(let a=0;a<e.length;){const o=e[a]??"",r=o[0];if(r==='"'||r==="'"){let l=e[a++]??"";for(;a<e.length&&!q$(l,r);)l+=` ${e[a++]}`;s.push(l.slice(1,-1).replace(/\\(.)/g,(h,c)=>H$[c]??c)),n.push("S");continue}if(a+=1,o&&!Number.isNaN(Number(o))){s.push(Number(o)),n.push("N");continue}const i=o.normalize("NFD").replace(/([^\w]|\d)/g,"");i?n.push(Yc(i)):o&&(n.push("X"),s.push(o))}return{matchName:n.map(Yc).join(""),args:s}}const z$=/^(Given|When|Then|And|But) (.*)$/,G$=/^(?:Scenario|Example):\s*(.*)$/,_$=/^("""|```)/;function U$(t){const e=[];let n=null,s=null;const a=t.split(`
`),o=()=>s?.at(-1),r=i=>{s&&(s[s.length-1]=i)};for(let i=0;i<a.length;i+=1){const l=(a[i]??"").trim();if(!l||l.startsWith("#")||l.startsWith("@"))continue;if(l.startsWith("Background:")){n=[],s=n;continue}const h=G$.exec(l);if(h){const m=[...n??[]];e.push({name:h[1]??"",steps:m}),s=m;continue}const c=z$.exec(l);if(c){s?.push({keyword:c[1]??"",text:c[2]??""});continue}const d=o();if(l.startsWith("|")&&d){const m=l.replace(/^\||\|$/g,"").split("|").map(f=>f.trim());r({...d,table:[...d.table??[],m]});continue}const u=_$.exec(l);if(u&&d){const m=(a[i]??"").indexOf(u[1]??""),f=[];for(i+=1;i<a.length&&!(a[i]??"").trim().startsWith(u[1]??"");i+=1){const p=a[i]??"";f.push(p.slice(Math.min(m,p.length-p.trimStart().length)))}r({...d,docString:f.join(`
`)})}}return e}function Y$(t,e){const n=new Set(e),s=[];for(const a of t.flatMap(o=>o.steps)){const{matchName:o,args:r}=af(a.text);if(n.has(o))continue;let i=1,l=1;const h=r.map(c=>typeof c=="number"?`number${i++}`:`string${l++}`);a.docString!==void 0&&h.push("docString"),a.table&&h.push("table"),s.push(`  ${a.keyword.toLowerCase()}${o}(${h.join(", ")}) {
    throw new Error("Unimplemented");
  }`),n.add(o)}return s.length===0?"":["There are missing steps. Please implement them:","","class WishedSteps {",s.join(`

`),"}"].join(`
`)}const Jc=/^(given|when|then|and|but)([A-Z])/,Yn=t=>JSON.stringify(t);function J$(t){const[e=[],...n]=t;return n.map(s=>Object.fromEntries(e.map((a,o)=>[a,s[o]??""])))}function of(t,e){const n=e.trim().replace(/;+$/,"");let s;try{s=new Function(`return (${n});`)()}catch(l){return{wished:"",error:mo(l)}}if(typeof s!="function")return{wished:"",error:"The steps must be a class."};const a=new Map;for(const l of Object.getOwnPropertyNames(s.prototype))Jc.test(l)&&a.set(l.replace(Jc,"$2"),l);const o=U$(t),r=Y$(o,new Set(a.keys()));if(r)return{wished:r};const i=o.map(l=>{const h=l.steps.map(c=>{const{matchName:d,args:u}=af(c.text),m=[...u.map(Yn),...c.docString===void 0?[]:[Yn(c.docString)],...c.table?[Yn(J$(c.table))]:[]];return`  steps[${Yn(a.get(d))}](${m.join(", ")});`});return`test(${Yn(l.name)}, () => {
  const steps = new Steps();
${h.join(`
`)}
});`});return{wished:"",run:Ja(`const Steps = (${n});
${i.join(`
`)}`)}}function Kc(t,e,n,s,a,o){const r=`<code>${Me(s,n)}</code>`,i=o?`<div class="genie-editor"><pre class="genie-source genie-colours" aria-hidden="true">${r}</pre><textarea class="genie-source" data-genie="${e}" data-language="${n}" rows="${a}" spellcheck="false" autocapitalize="off" aria-label="${M(t)}">${M(s)}</textarea></div>`:`<pre class="genie-source">${r}</pre>`;return`<figure class="kata-file"><figcaption>${M(t)}</figcaption>${i}</figure>`}function rf(t,e,n){return`<div class="genie"><div class="genie-in">${Kc("cucumbers.feature","feature","gherkin",t,7,n)}${Kc("steps.js","steps","js",e,10,n)}</div><figure class="kata-file genie-out"><figcaption>npm test</figcaption><div class="genie-output">${sf(of(t,e))}</div></figure></div>`}function K$(t){t.innerHTML=rf(tf,nf,!0);const e=t.querySelector('[data-genie="feature"]'),n=t.querySelector('[data-genie="steps"]'),s=t.querySelector(".genie-output");if(!e||!n||!s)return;for(const o of[e,n]){const r=o.previousElementSibling,i=()=>{r&&(r.innerHTML=`<code>${Me(o.value,o.dataset.language??"")}
</code>`)};o.addEventListener("input",i),o.addEventListener("scroll",()=>{r&&(r.scrollTop=o.scrollTop,r.scrollLeft=o.scrollLeft)})}const a=()=>{s.innerHTML=sf(of(e.value,n.value))};e.addEventListener("input",a),n.addEventListener("input",a)}const V$=()=>rf(tf,nf,!1),X$={name:"gherkin-genie",apps:{"gherkin-genie":K$},stills:{"gherkin-genie":V$}};function lf(t,e){if(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)return()=>{};let n=e(),s=!0,a=!1,o=!0,r;const i=y("button",{type:"button",class:"player"}),l=(u,m)=>{i.setAttribute("aria-label",u),i.textContent=m};l("Pause","⏸");const h=()=>{if(r=void 0,!s||!o||a)return;const u=n();if(u===null){a=!0,l("Play again","↻");return}r=setTimeout(h,u)},c=()=>{clearTimeout(r),r=void 0};i.addEventListener("click",()=>{if(a){n=e(),a=!1,s=!0,l("Pause","⏸"),c(),h();return}s=!s,l(s?"Pause":"Play",s?"⏸":"▶"),s?h():c()}),t.append(i);const d=typeof IntersectionObserver=="function"?new IntersectionObserver(u=>{for(const m of u)o=m.isIntersecting;o?r===void 0&&h():c()}):void 0;return d?.observe(t),h(),()=>{c(),d?.disconnect(),i.remove()}}function hf(t,e){const n=[];for(;n.length<e;){n.push("test");const s=Math.floor(t()*4);for(let a=0;a<s&&n.length<e;a+=1)n.push("clean")}return n}function cf(t){return`<ol class="small-steps" role="img" aria-label="Small steps: a test fails and is put right at once; clean steps between; again and again">${t.map(n=>`<li class="${n}"></li>`).join("")}</ol>`}const fi=40,Vc=220,Z$=950,Q$=2200,ex=45;function tx(t,{wipe:e=!0}={}){const n=t.map(()=>"empty"),s=[{marks:[...n],hold:Vc}],a=o=>s.push({marks:[...n],hold:o});return t.forEach((o,r)=>{o==="test"?(n[r]="red",a(Z$),n[r]="fixed"):n[r]="clean",a(r===t.length-1?Q$:Vc)}),e&&t.forEach((o,r)=>{n[r]="empty",a(ex)}),s}const Xc=3;function nx(t){const e=y("div",{class:"small-steps-row"});return t.replaceChildren(e),lf(t,()=>{e.innerHTML=cf(Array.from({length:fi},()=>"empty"));const s=[...e.querySelectorAll("li")],a=Array.from({length:Xc},(r,i)=>tx(hf(Math.random,fi),{wipe:i<Xc-1})).flat();let o=0;return()=>{const r=a[o++];return r?(r.marks.forEach((i,l)=>{const h=s[l];h&&h.className!==i&&(h.className=i)}),r.hold):null}})}const sx=()=>cf(hf($s(2026),fi).map(t=>t==="test"?"green":"clean")),ax={name:"small-steps",apps:{"small-steps":nx},stills:{"small-steps":sx}},vr=-100,kr=100,$r=(t,e,n)=>`${t},${e},${n}`;class ox{#t;#e=[{a:2,b:4,c:8}];#n=null;#s=0;constructor(e){this.#t=e}get rows(){return this.#e.map(({a:e,b:n,c:s})=>({a:e,b:n,c:s,holds:this.#t.holds(e,n,s),last:$r(e,n,s)===this.#n})).sort((e,n)=>Number(n.holds)-Number(e.holds)||e.a-n.a||e.b-n.b||e.c-n.c)}test(e,n,s){return[e,n,s].some(Number.isNaN)?"Ops! Invalid numbers.":(this.#n=$r(e,n,s),this.#e.some(a=>$r(a.a,a.b,a.c)===this.#n)?"Ops! Sequence already present.":(this.#e.push({a:e,b:n,c:s}),""))}guess(e){if(this.#s>=this.#e.length)return"Ops! Add another sequence test before a guess.";const n="Ops! Cannot compile rule, please check your javascript rule or console for more information.";let s;try{s=new Function(`'use strict';return (a,b,c) => ${e}`)()}catch{return n}this.#s+=1;try{for(let a=vr;a<=kr;a+=1)for(let o=vr;o<=kr;o+=1)for(let r=vr;r<=kr;r+=1)if(s(a,o,r)!==this.#t.holds(a,o,r))return"Ops! This is not the rule. Test more sequences and guess again."}catch{return n}return`Good! "${e}" is the rule.`}}function df(t){return`<table class="guess-table"><thead><tr><th>a,</th><th>b,</th><th>c</th><th></th></tr></thead><tbody>${t.map(({a:n,b:s,c:a,holds:o,last:r})=>`<tr${r?' class="last"':""}><td>${n},</td><td>${s},</td><td>${a}</td><td>${o?"✅":"❌"}</td></tr>`).join("")}</tbody></table>`}const rx=t=>({text:t,holds:new Function("a","b","c",`return ${t};`)}),xr=["a < b && b < c","a + 1 < b && b + 1 < c","a + 1 < b && b + 2 < c","a <= b && b <= c","a <= b && b < c","a < b && b <= c","2 * a === b && 2 * b === c","a > 0 && b > 0 && c > 0","a === 2","b === 4","c === 8","c > 3","a + b + c > 5","a + b + c >= 5","a + b < c","a + b <= c","c - a > b","a * b === c","a * b <= c","a * b >= c","a !== b && b !== c && a !== c","a === 2 && b === 4 && c === 8","a % 2 === 0 && b % 2 === 0 && c % 2 === 0"].map(rx);function ix(t,e=Math.random){const n=new ox(xr[Math.floor(xr.length*e())]??xr[0]),s=y("div",{class:"guess-rows"}),a=(g,v)=>y("input",{type:"number",value:g,"aria-label":v}),[o,r,i]=[a(2,"a"),a(4,"b"),a(8,"c")],l=y("p",{class:"guess-said","data-said":"test",hidden:!0}),h=y("input",{type:"text",value:"true",spellcheck:!1,autocapitalize:"off","aria-label":"The rule, in JavaScript"}),c=y("p",{class:"guess-said","data-said":"guess",hidden:!0}),d=(g,v)=>{g.textContent=v,g.hidden=!v,g.classList.toggle("good",v.startsWith("Good!"))},u=()=>{s.innerHTML=df(n.rows)},m=()=>{d(l,n.test(Number(o.value),Number(r.value),Number(i.value))),u()},f=()=>d(c,n.guess(h.value)),p=y("button",{type:"button",class:"test",onclick:m},"Test"),w=y("button",{type:"button",class:"guess",onclick:f},"Guess");for(const g of[o,r,i])g.addEventListener("keydown",v=>v.key==="Enter"&&m());h.addEventListener("keydown",g=>g.key==="Enter"&&f()),t.replaceChildren(y("div",{class:"guess-the-rule"},y("h4",{},"Sequence numbers and their result:"),s,y("h4",{},"Propose a new sequence:"),y("p",{class:"guess-sequence"},"a: ",o,", b: ",r,", c: ",i," ",p),l,y("h4",{},"Propose a rule:"),y("p",{class:"guess-rule"},h," ",w),c,y("p",{class:"guess-note"},"Write any valid javascript expression that evaluates true or false. Use variables a, b and c in the expression."))),u()}const lx=()=>`<div class="guess-the-rule"><h4>Sequence numbers and their result:</h4>${df([{a:2,b:4,c:8,holds:!0,last:!1}])}<p class="guess-note">The rule is drawn, and the guessing played, when the page runs.</p></div>`,hx={name:"guess-the-rule",apps:{"guess-the-rule":t=>ix(t)},stills:{"guess-the-rule":lx}};function cx(t,e){return e.on(n=>t.follow(n))}const dx=900,ux=480,va={x:1600,y:1e3};function ka(t,e){return(t%e+e)%e}class mx{x=0;y=0;written="";driving=!1;follow({byRadians:e,tiltedBy:n,seconds:s}){const a=document.documentElement;if(a.dataset.sky!=="stars")return;this.driving||this.takeOver(a);const o=dx/(Math.PI*2),r=(s/ux*Math.PI*2+e)*o;this.x=ka(this.x+r,va.x),this.y=ka(this.y-n*o,va.y);const i=`${(Math.round(this.x*2)/2).toFixed(1)}px ${(Math.round(this.y*2)/2).toFixed(1)}px`;if(i===this.written)return;this.written=i;const[l,h]=i.split(" ");a.style.setProperty("--sky-x",l??"0px"),a.style.setProperty("--sky-y",h??"0px")}release(){const e=document.documentElement;e.classList.remove("sky-driven"),e.style.removeProperty("--sky-x"),e.style.removeProperty("--sky-y"),this.x=0,this.y=0,this.written="",this.driving=!1}takeOver(e){const n=getComputedStyle(document.body,"::before").transform;if(n&&n!=="none")try{const s=new DOMMatrixReadOnly(n);this.x=ka(s.m41,va.x),this.y=ka(s.m42,va.y)}catch{}e.classList.add("sky-driven"),this.driving=!0}}function fx(...t){const e=new mx;return{name:"sky",install:()=>{const n=t.map(s=>cx(e,s));return()=>{for(const s of n)s()}},arrive:()=>e.release()}}const{width:Zc,height:$a,pad:qe}=Gi;function px(t,e){const n=Math.max(...t.map(c=>c.values.length),1),s=Math.max(1,...t.flatMap(c=>c.values)),a=Zc-qe.left-qe.right,o=$a-qe.top-qe.bottom,r=c=>qe.left+c/Math.max(1,n-1)*a,i=c=>qe.top+o-c/s*o,l=t.map(c=>{const d=c.values.map((u,m)=>`${r(m).toFixed(1)},${i(u).toFixed(1)}`).join(" ");return`<polyline class="line ${c.className}" points="${d}"><title>${c.name}</title></polyline>`}).join(""),h=t.map((c,d)=>`<rect class="${c.className}" x="${qe.left+d*90}" y="${$a-qe.bottom+20}" width="10" height="3"/><text x="${qe.left+d*90+14}" y="${$a-qe.bottom+24}">${c.name}</text>`).join("");return`<svg viewBox="0 0 ${Zc} ${$a}" role="img" aria-label="${e.y} by ${e.x}">${Vu(s,e,n,eo(s))}${l}${h}</svg>`}const Tr=20;function gx(t){const{baseTime:e,shortcutFactor:n,interestRate:s,timeHorizon:a}=t,o=[];let r=null;const i=e;let l=e*(1-n),h=0,c=0,d=0,u=0,m=0,f=0;for(let p=0;p<a*Tr;){for(;m<=p;)h+=1,d+=1,m+=i;for(;f<=p;)c+=1,u+=1,f+=l,l*=1+s;if(p+=1,p%Tr===0){const w=p/Tr;o.push({month:w,cleanCumulative:h,debtCumulative:c,cleanMonthly:d,debtMonthly:u,debtFeatureCost:l}),d=0,u=0,r===null&&h>c&&(r=w)}}return{months:o,breakEvenMonth:r}}const Qc=t=>gx({baseTime:Number(t["base-time"]),shortcutFactor:Number(t.shortcuts)/100,interestRate:Number(t.interest)/100,timeHorizon:Number(t.timeline)}),ed=({months:t})=>`<div class="chart"><h4>Cumulative features</h4>${px([{name:"Clean",className:"clean",values:t.map(e=>e.cleanCumulative)},{name:"Debt-driven",className:"debt",values:t.map(e=>e.debtCumulative)}],{x:"Months",y:"Features"})}</div>`,wx={name:"technical-debt",summary:"what shortcuts cost, compounded: two teams build the same features, one of them cutting corners",parameters:[{name:"base-time",label:"Base time",description:"days a feature takes when it is done properly",min:1,max:30,step:1,initial:20,show:t=>`${t} days`},{name:"shortcuts",label:"Shortcuts",description:"percent of that time a shortcut saves, at first",min:0,max:90,step:5,initial:25,show:t=>`${t}%`},{name:"interest",label:"Interest",description:"percent dearer every shortcut feature makes the next one",min:0,max:100,step:1,initial:10,show:t=>`${t}%`},{name:"timeline",label:"Timeline",description:"months to look ahead",min:6,max:60,step:1,initial:24,show:t=>`${t} months`}],run(t){const e=Number(t.shortcuts),n=Number(t.interest),s=Number(t.timeline),a=Qc(t),{months:o,breakEvenMonth:r}=a,i=o[o.length-1],l=i?.cleanCumulative??0,h=i?.debtCumulative??0,c=l>0?(l-h)/l*100:0,d=Math.abs(c)<.1,u=d?"even":c>0?"loss":"gain",m=d?"≈0%":`${Math.abs(c).toFixed(1)}%`,f=r?`month ${r}`:"never",p=n===0?"With no interest there is no compound slowdown, and the shortcut simply wins. That is the one case that does not happen to real code.":r?`${e}% saved at first, ${n}% interest on every feature: clean development overtakes at month ${r}, and by month ${s} the shortcut road has delivered ${m} less.`:`${e}% saved at first, ${n}% interest on every feature: in ${s} months the clean road has not yet caught up. Give it longer, or raise the interest.`,w=[`<div class="clean"><strong>${l}</strong>clean features</div>`,`<div class="debt"><strong>${h}</strong>debt features</div>`,`<div><strong>${f}</strong>break-even</div>`,`<div><strong>${m}</strong>${u} on the shortcut road</div>`].join(""),g=Xu([{name:"Clean",className:"clean",values:o.slice(1).map(v=>v.cleanMonthly)},{name:"Debt-driven",className:"debt",values:o.slice(1).map(v=>v.debtMonthly)}],{x:"Months",y:"Features a month"});return{text:`clean ${l} features, debt-driven ${h}, break-even ${f}
${p}`,html:`<div class="figures">${w}</div><div class="charts">${ed(a)}<div class="chart"><h4>Monthly delivery rate</h4>${g}</div></div><p>${p}</p>`,data:{cleanFeatures:l,debtFeatures:h,breakEvenMonth:r,months:o}}},glance:t=>ed(Qc(t))},yx={name:"technical-debt",programs:[wx]},bx="theme";function uf(){const t=document.documentElement,e=t.dataset.pageTheme;let n=null;try{n=localStorage.getItem(bx)}catch{n=null}const s=e??(n==="light"||n==="dark"||n==="pink"?n:null);s?t.dataset.theme=s:delete t.dataset.theme}function rs(...t){return t.map(e=>e.replace(/^[a-z]+:\/\//,"").replace(/^\/+|\/+$/g,"")).filter(Boolean).join("-")}const vx=1e4,pi=[];let Jn=null;function td(){const t=window.goatcounter?.count;if(!t)return!1;for(const e of pi.splice(0))t({path:e,title:e,event:!0});return!0}function is(t){if(pi.push(t),td()||Jn)return;const e=Date.now();Jn=setInterval(()=>{(td()||Date.now()-e>vx)&&(Jn&&clearInterval(Jn),Jn=null,pi.splice(0))},250)}const gi="theme";function kx(){return window.matchMedia("(prefers-color-scheme: dark)").matches}function $x(){let t=null;try{t=localStorage.getItem(gi)}catch{t=document.documentElement.dataset.theme??null}return t==="light"||t==="dark"?t:t==="pink"?"light":kx()?"dark":"light"}class xx{apply(e){const n=e==="toggle"?$x()==="dark"?"light":"dark":e;try{n==="system"?localStorage.removeItem(gi):localStorage.setItem(gi,n)}catch{}return uf(),is(rs("theme","set",n)),n}}function Tx(){let t=null;try{t=localStorage.getItem("theme")}catch{}is(rs("theme","start",t??"system"))}function Mx(t){const e=document.querySelector(".theme-toggle");return e?(e.classList.add("ready"),e.removeAttribute("aria-hidden"),e.removeAttribute("tabindex"),e.addEventListener("click",t),()=>e.removeEventListener("click",t)):()=>{}}const wi=["light","dark","system","pink"];function Sx(t){return wi.includes(t)}const Ax={light:"☀︎",dark:"☾︎",system:"◐︎",pink:"❀︎"};function nd(t){const e=n=>`${Ax[n]} ${n}`;return{text:`theme   ${wi.map(n=>n===t?`[${e(n)}]`:e(n)).join("   ")}`,html:`<pre class="choices">theme   ${wi.map(n=>n===t?`<strong aria-current="true">${e(n)}</strong>`:`<a href="#" data-run="theme ${n}" title="theme ${n}">${e(n)}</a>`).join("   ")}</pre>`}}function Ex(t){return{name:"theme",usage:"theme [light|dark|system|pink|auto]",description:"switch the colours, or toggle them",run({site:e,cwd:n},[s]){const a=e.at(n)?.fields.theme;if(a)return{text:`theme: this page keeps its own, ${a}. It works everywhere else.`,error:!0};if(s===void 0)return nd(t.apply("toggle"));const o=s==="auto"?"system":s;return Sx(o)?nd(t.apply(o)):{text:`theme: ${s}: choose light, dark, system or pink`,error:!0}}}}const Ox={name:"theme",commands:[Ex(new xx)],install:t=>(Tx(),Mx(()=>t.run("theme"))),arrive:()=>uf()},sd=[{machine:"small",algorithm:"pairs",vertices:8,graphs:150,serial:42.43,openmp:14.34,cuda:2.572},{machine:"small",algorithm:"pairs",vertices:16,graphs:150,serial:738.92,openmp:247.95,cuda:33.06},{machine:"small",algorithm:"pairs",vertices:24,graphs:150,serial:4387.13,openmp:1208.97,cuda:109.093},{machine:"large",algorithm:"pairs",vertices:8,graphs:150,serial:7.483,openmp:1.511,cuda:.653},{machine:"large",algorithm:"pairs",vertices:16,graphs:150,serial:135.505,openmp:25.061,cuda:5.24},{machine:"large",algorithm:"pairs",vertices:24,graphs:150,serial:515.757,openmp:126.228,cuda:18.99},{machine:"small",algorithm:"common-labelling",vertices:8,graphs:50,serial:843.21,openmp:214.51,cuda:33.404},{machine:"small",algorithm:"common-labelling",vertices:16,graphs:50,serial:17061.4,openmp:4284.01,cuda:550.153},{machine:"small",algorithm:"common-labelling",vertices:24,graphs:50,serial:71670.13,openmp:20274.32,cuda:2332.076}],Ix={small:"Intel Atom 330, 2 cores, 8 W · NVIDIA 9400M, 16 cores, 10 W",large:"Intel i7 950, 4 cores, 130 W · NVIDIA GT 430, 96 cores, 49 W"},Cx={pairs:t=>`Matching every pair of ${t} graphs`,"common-labelling":t=>`Finding one labelling common to ${t} graphs`};function Mr(t){if(t<10)return`${t.toFixed(1)} s`;if(t<60)return`${Math.round(t)} s`;const e=Math.floor(t/60);return e<60?e<10?`${e} min ${Math.round(t-e*60)} s`:`${Math.round(t/60)} min`:`${Math.floor(e/60)} h ${e%60} min`}const jx=t=>`×${t>=10?Math.round(t):t.toFixed(1)}`;function ad(t){const e=Math.max(...t.map(a=>a.serial/a.cuda)),n=(a,o)=>`<span class="bar ${o}" style="--p:${(a/e).toFixed(3)}"></span><span class="factor">${jx(a)}</span>`;return`<figure class="runs"><table class="runs"><thead><tr><th>each graph has</th><th>one thread</th><th>OpenMP, every core</th><th>CUDA, the graphics card</th></tr></thead>${[...new Set(t.map(a=>`${a.algorithm}/${a.machine}`))].map(a=>{const o=t.filter(h=>`${h.algorithm}/${h.machine}`===a),{algorithm:r,machine:i}=o[0],l=o.map(h=>`<tr><th scope="row">${h.vertices} vertices</th><td>${Mr(h.serial)}</td><td>${Mr(h.openmp)}<div class="speedup">${n(h.serial/h.openmp,"openmp")}</div></td><td>${Mr(h.cuda)}<div class="speedup">${n(h.serial/h.cuda,"cuda")}</div></td></tr>`).join("");return`<tbody><tr class="group"><th colspan="4">${Cx[r](o[0]?.graphs??0)}<span>${Ix[i]}</span></th></tr>${l}</tbody>`}).join("")}</table><figcaption>Measured in 2011, on graphs of the GREC dataset. Each bar is how many times faster than one thread of the same machine, and all the bars are on one scale.</figcaption></figure>`}const Nx={name:"thesis-results",stills:{"graph-matching-runs":()=>ad(sd)},apps:{"graph-matching-runs":t=>{t.firstChild||(t.innerHTML=ad(sd))}}},ve=[{id:"torrid-nights",name:"torrid nights",variable:"tn",atLeast:!0,threshold:25},{id:"tropical-nights",name:"tropical nights",variable:"tn",atLeast:!0,threshold:20},{id:"hot-days",name:"hot days",variable:"tx",atLeast:!0,threshold:30},{id:"torrid-days",name:"torrid days",variable:"tx",atLeast:!0,threshold:35},{id:"frost-days",name:"frost days",variable:"tn",atLeast:!1,threshold:0},{id:"rainy-days",name:"rainy days",variable:"pp",atLeast:!0,threshold:1},{id:"heavy-rain",name:"days of heavy rain",variable:"pp",atLeast:!0,threshold:20},{id:"downpours",name:"days with a downpour",variable:"pi",atLeast:!0,threshold:10}],[Sr]=ve,yi={variable:Sr.variable,atLeast:Sr.atLeast,threshold:Sr.threshold,months:[0,1,2,3,4,5,6,7,8,9,10,11]};function Lx(t,e){const n=t.map(({value:f})=>f),s=Math.floor(Math.min(...n,...(e.spans??[]).map(({value:f})=>f))),a=Math.ceil(Math.max(...n,s+1)),o=Gu(t.map(({year:f})=>f),s,a),{x:r,y:i,slot:l}=o,h=f=>r(f)+l/2,c=[];for(const f of t){const p=c[c.length-1];p&&p[p.length-1]?.year===f.year-1?p.push(f):c.push([f])}const d=c.map(f=>`<polyline class="line" points="${f.map(({year:p,value:w})=>`${E(h(p))},${E(i(w))}`).join(" ")}"/>`).join(""),u=t.map(({year:f,value:p,title:w,partial:g})=>`<circle class="dot${g?" partial":""}" cx="${E(h(f))}" cy="${E(i(p))}" r="3.5"><title>${w}</title></circle>`).join(""),m=o.levels(e.spans??[]);return o.wrap(e.label,`${d}${u}${m}`)}function Px(t,{threshold:e,atLeast:n},s){if(!t)return 0;const[a=0,...o]=t;return o.reduce((r,i,l)=>a+l*s>=e-1e-9===n?r+i:r,0)}const Re={tn:{code:1002,unit:"°C",name:"daily minimum",summary:"mean",bin:.5,range:[-30,35]},tx:{code:1001,unit:"°C",name:"daily maximum",summary:"mean",bin:.5,range:[-25,50]},pp:{code:1300,unit:"mm",name:"daily rain",summary:"sum",bin:.5,range:[0,250]},pi:{code:1303,unit:"mm/h",name:"most rain in one hour",summary:"max",bin:.5,range:[0,100]}},Fx=.95,Bx=(t,e)=>new Date(Date.UTC(t,e+1,0)).getUTCDate(),pt=t=>t.reduce((e,n)=>e+n,0);function Rx(t,e){return t.length===0?null:e==="sum"?pt(t.map(({figure:n})=>n)):e==="max"?Math.max(...t.map(({figure:n})=>n)):pt(t.map(({figure:n,weight:s})=>n*s))/pt(t.map(({weight:n})=>n))}function nl(t,e){const n=Re[e.variable];return Object.entries(t.years).flatMap(([s,a])=>{const o=a[e.variable];if(!o)return[];const r=Number(s),i=o.months.map(w=>({days:Px(w,e,n.bin),measured:pt(w?.slice(1)??[])})),l=w=>e.months.includes(w),h=pt(i.filter((w,g)=>l(g)).map(w=>w.measured)),c=pt(e.months.map(w=>Bx(r,w))),d=pt(i.filter((w,g)=>l(g)).map(w=>w.days)),u=o.summaries.flatMap((w,g)=>l(g)&&w!==null?[{figure:w,weight:i[g]?.measured??0}]:[]),m=Rx(u,n.summary),f=t.soFar?.year===r,p=!f&&h/c>=Fx;return[{year:r,days:d,elsewhere:pt(i.map(w=>w.days))-d,measured:h,expected:c,whole:p,summary:m,months:i,...f&&{through:t.soFar.through}}]}).sort((s,a)=>s.year-a.year)}const od=["January","February","March","April","May","June","July","August","September","October","November","December"];function bi(t){const{name:e,unit:n}=Re[t.variable],s=t.variable==="pi"?"":"a ",a=t.atLeast?`of ${t.threshold} ${n} or more`:`below ${t.threshold} ${n}`,o=od[t.months[0]??0],r=od[t.months[t.months.length-1]??11],i=t.months.length===12?"whole year":`${o} to ${r}`;return`days with ${s}${e} ${a}, ${i}`}function mf(t,e){const n=Object.values(t.years).flatMap(a=>a[e.variable]?[a[e.variable].record]:[]);return n.length===0?null:n.map(([a,o,r,i])=>e.atLeast?{value:a,date:o}:{value:r,date:i}).reduce((a,o)=>(e.atLeast?o.value>a.value:o.value<a.value)?o:a)}const ff=["January","February","March","April","May","June","July","August","September","October","November","December"],Dx=.55;function Wx(t,e,{days:n,measured:s}){const a=`${ff[e]} ${t}`;if(s===0)return`<td class="none" title="${a}: not measured"></td>`;const o=Math.round(n/s*1e3)/1e3;return`<td${o>=Dx?' class="deep"':""} style="--v:${o}" title="${a}: ${n} of ${s} days">${n||""}</td>`}function Hx(t,e){const n=`<tr><th></th>${ff.map(a=>`<th scope="col">${a.slice(0,3)}</th>`).join("")}</tr>`,s=[...t].reverse().map(({year:a,months:o})=>`<tr><th scope="row">${a}</th>${o.map((r,i)=>Wx(a,i,r)).join("")}</tr>`);return`<table class="heat calendar${e?" warm":""}"><thead>${n}</thead><tbody>${s.join("")}</tbody></table>`}const rd=t=>t.reduce((e,n)=>e+n,0)/t.length;function id(t){const e=t.flatMap(({summary:n})=>n===null?[]:[n]);return{from:t[0]?.year??0,to:t[t.length-1]?.year??0,years:t.length,days:rd(t.map(({days:n})=>n)),summary:e.length?rd(e):null}}function pf(t){const e=t.filter(s=>s.whole);if(e.length<4)return null;const n=Math.floor(e.length/2);return[id(e.slice(0,n)),id(e.slice(n))]}const qx={mean:"The mean",sum:"The total",max:"The highest"},ss=t=>String(Math.round(t*10)/10),zx=t=>`${t>0?"+":t<0?"−":""}${ss(Math.abs(t))}`,Gx=t=>`${rt(t)} ${t.slice(0,4)}`;function _x(t,e){const{unit:n,name:s}=Re[e.variable],{value:a,date:o}=mf(t,e);return`<p class="record">The ${e.atLeast?"highest":"lowest"} ${s} on record here: ${a} ${n} on ${Gx(o)}, whatever months are chosen.</p>`}function gf(t,e){const n=Re[e.variable],s=`<figcaption><strong>${t.name}</strong> · ${t.altitude} m, ${t.setting} · ${bi(e)}</figcaption>`,a=nl(t,e);if(a.length===0)return`<figure class="weather">${s}<p>This station has no ${n.name} on record.</p></figure>`;const o=pf(a),r=({from:f,to:p})=>`${f}–${p}`,i=o?'<div class="figures">'+o.map(f=>`<div><strong>${ss(f.days)}</strong>days a year, ${r(f)}</div>`).join("")+`<div><strong>${zx(o[1].days-o[0].days)}</strong>days a year, from one half to the other</div></div>`:"",l=a.map(({year:f,days:p,elsewhere:w,measured:g,expected:v,whole:b,through:k})=>{const x=w>0?`, and ${w} more outside the months chosen`:"";if(k)return{year:f,value:p,running:!0,title:`${f} so far, to ${rt(k)}: ${p} days${x}`};const T=b?"":`, with only ${g} of ${v} days measured`;return{year:f,value:p,partial:!b,title:`${f}: ${p} days${T}${x}`}}),h=(o??[]).map(f=>({from:f.from,to:f.to,value:f.days,label:`${ss(f.days)} a year`})),c=a.flatMap(({year:f,summary:p,whole:w})=>p===null||!w?[]:[{year:f,value:p,title:`${f}: ${ss(p)} ${n.unit}`}]),d=(o??[]).flatMap(f=>f.summary===null?[]:[{from:f.from,to:f.to,value:f.summary,label:`${ss(f.summary)} ${n.unit}`}]),u=`${qx[n.summary]} ${n.name} of each year, ${n.unit}`,m=(n.summary==="mean"?Lx:Zr)(c,{label:u,spans:d});return`<figure class="weather">${s}${i}<h4>Days a year</h4>${Zr(l,{label:`Days a year: ${bi(e)}`,spans:h})}<h4>When in the year they fell</h4>${Hx(a,e.atLeast&&n.unit==="°C")}<h4>${u}, in the months chosen</h4>${m}`+_x(t,e)+"</figure>"}const as=[{code:"baic0008",name:"Barcelona - Observatori Fabra, since 1950",municipality:"Barcelona",altitude:412,setting:"wooded hill above the city"},{code:"baic0007",name:"Aeroport del Prat, since 1950",municipality:"El Prat de Llobregat",altitude:3,setting:"airport by the sea"},{code:"baic0019",name:"Granollers, since 1950",municipality:"Granollers",altitude:202,setting:"inland town of the Vallès"},{code:"baic0009",name:"Girona, since 1950",municipality:"Girona",altitude:72,setting:"inland city"},{code:"baic0012",name:"Lleida, since 1950",municipality:"Lleida",altitude:192,setting:"city of the inland plain"},{code:"baic0005",name:"Observatori de l'Ebre, since 1950",municipality:"Roquetes",altitude:49,setting:"observatory in the lower Ebre valley"}],Ge=[{code:"WU",name:"Badalona - Museu",municipality:"Badalona",altitude:42,setting:"urban, by the sea"},{code:"X4",name:"Barcelona - el Raval",municipality:"Barcelona",altitude:33,setting:"dense city, on a roof"},{code:"X8",name:"Barcelona - Zona Universitària",municipality:"Barcelona",altitude:82,setting:"city edge"},{code:"D5",name:"Barcelona - Observatori Fabra",municipality:"Barcelona",altitude:410,setting:"wooded hill above the city"},{code:"UP",name:"Cabrils",municipality:"Cabrils",altitude:81,setting:"coastal slope, half rural"},{code:"XF",name:"Sabadell - Parc Agrari",municipality:"Sabadell",altitude:259,setting:"farmland beside a city"},{code:"XJ",name:"Girona",municipality:"Girona",altitude:72,setting:"market gardens by the city"},{code:"XE",name:"Tarragona - Complex Educatiu",municipality:"Tarragona",altitude:6,setting:"coast"},{code:"VK",name:"Raimat",municipality:"Lleida",altitude:286,setting:"inland plain, vineyards"}],_e=[{label:"Automatic stations",directory:"/data/weather",running:!0,every:{name:"all",label:"every station"},stations:Ge},{label:"Long series, since 1950",directory:"/data/climate-series",running:!1,every:{name:"all-series",label:"every long series"},stations:as}];function sl(t){const e=_e.find(s=>s.every.name===t);if(e)return{group:e,codes:e.stations.map(({code:s})=>s)};const n=_e.find(s=>s.stations.some(({code:a})=>a===t));return n&&{group:n,codes:[t]}}const Ar=[["whole year",[0,1,2,3,4,5,6,7,8,9,10,11]],["June to August",[5,6,7]],["May to October",[4,5,6,7,8,9]],["December to February",[0,1,11]]],Ux={tn:[-10,30],tx:[0,45],pp:[.5,100],pi:[.5,60]};function Yx(t){const e=_e[0],n=new Map,s=new Map,a=new Map,o=T=>{const $=s.get(T)??(T.running?Pi(`${T.directory}/running.json`):Promise.resolve(null));return s.set(T,$),$},r=T=>{const $=a.get(T)??Fi(T===e?t:y("div"),`${T.directory}/index.json`,T.running?`${T.directory}/running.json`:void 0);return a.set(T,$),$};let i=r(e);const l=y("div");l.append(...t.querySelectorAll("figure"));let h=null,c=yi,d=!1;const u=(T,$)=>y("option",{value:T},$),m=y("select",{onchange:()=>{k(m.value)}},..._e.map(T=>y("optgroup",{label:T.label},...T.stations.map(({code:$,name:O})=>u($,O))))),f=y("select",{onchange:()=>{const T=ve.find(({id:$})=>$===f.value);T&&b({variable:T.variable,atLeast:T.atLeast,threshold:T.threshold})}},...ve.map(({id:T,name:$})=>u(T,$))),p=y("select",{onchange:()=>b({months:Ar[Number(p.value)]?.[1]??yi.months})},...Ar.map(([T],$)=>u($,T))),w=y("output"),g=y("input",{type:"range",step:.5,oninput:()=>b({threshold:Number(g.value)})});function v(){const[T,$]=Ux[c.variable];g.min=String(T),g.max=String($),g.value=String(c.threshold),w.textContent=`${c.atLeast?"":"below "}${c.threshold} ${Re[c.variable].unit}${c.atLeast?" or more":""}`,h&&(l.innerHTML=gf(h,c))}function b(T){c={...c,...T},v()}async function k(T){const $=sl(T)?.group??e,O=n.get(T)??fetch(`${$.directory}/${T}.json`).then(L=>L.json());n.set(T,O);try{const[L,F]=await Promise.all([O,o($)]);if(d||m.value!==T)return;h=it(L,F,`${T}.json`);const N=r($);N!==i&&i.replaceWith(N),i=N,v()}catch{n.delete(T),l.replaceChildren(y("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}t.addEventListener(zt,T=>{const{station:$,kind:O,threshold:L,months:F}=T.detail,N=ve.find(({id:A})=>A===O);if(!N)return;const j=String(F).split(",").map(Number);f.value=N.id;const S=Ar.findIndex(([,A])=>A.join(",")===j.join(","));S>=0&&(p.value=String(S)),c={variable:N.variable,atLeast:N.atLeast,threshold:Number(L),months:j},m.value=String($),k(m.value)});const x=y("div",{class:"dials"},y("label",{},"Station",m),y("label",{},"Counting",f),y("label",{},"Threshold: ",w,g),y("label",{},"Months",p));return t.replaceChildren(x,l,i),k(m.value),()=>{d=!0}}const Jx=-99,ld=t=>(t??"").trim().padStart(2,"0");function Kx(t){const e=t.split(/\r?\n/),n=e.findIndex(c=>c.startsWith("ANY	"));if(n<0)throw new Error("the answer is not a series of the Meteocat: it names no columns");const s=(e[n]??"").trim().split("	"),a=c=>s.indexOf(c),[o,r,i]=[a("PPT"),a("TX"),a("TN")];if(o<0||r<0||i<0)throw new Error(`the series has no ${["PPT","TX","TN"].filter(c=>a(c)<0).join(", ")}`);const l=(c,d)=>{const u=Number(c[d]);return Number.isFinite(u)&&u>Jx?u:null},h=[];for(const c of e.slice(n+1)){if(c.trim()==="")continue;const d=c.trim().split("	"),u=`${d[0]}-${ld(d[1])}-${ld(d[2])}`,m=h.at(-1)?.date??"";if(u===m)throw new Error(`the series has ${u} twice`);if(u<m)throw new Error(`the series is out of order: ${u} comes after ${m}`);h.push({date:u,pp:l(d,o),tx:l(d,r),tn:l(d,i)})}return h}function Vx(t,e,[n,s]){if(t.length===0)return null;const a=Math.round((s-n)/e),o=new Map;for(const h of t){const c=Math.min(a-1,Math.max(0,Math.floor((h-n)/e+1e-9)));o.set(c,(o.get(c)??0)+1)}const r=Math.min(...o.keys()),i=Math.max(...o.keys());return[Math.round((n+r*e)*1e3)/1e3,...Array.from({length:i-r+1},(h,c)=>o.get(r+c)??0)]}const Xx=(t,e)=>Math.round(t*10**e)/10**e;function Zx(t,e){if(t.length===0)return null;if(e==="max")return Math.max(...t);const n=t.reduce((s,a)=>s+a,0);return Xx(e==="sum"?n:n/t.length,2)}function wf(t,e){const n=Array.from({length:12},(o,r)=>t.filter(({date:i})=>Number(i.slice(5,7))===r+1).map(({value:i})=>i)),s=t.reduce((o,r)=>r.value>o.value?r:o),a=t.reduce((o,r)=>r.value<o.value?r:o);return{months:n.map(o=>Vx(o,e.bin,e.range)),summaries:n.map(o=>Zx(o,e.summary)),record:[s.value,s.date,a.value,a.date]}}const Qx="https://static-m.meteo.cat/content/climatologia/series-climatiques",e2=["tn","tx","pp"],hd=t=>(Date.UTC(t+1,0,1)-Date.UTC(t,0,1))/864e5;function t2(t,e,n){const s=e.filter(({date:a})=>a.startsWith(`${n}-`));if(s.length===0)throw new Error(`${t} does not reach ${n} yet`);if(s.length!==hd(n))throw new Error(`${t} has ${s.length} days of ${n}, not ${hd(n)}`);return Object.fromEntries(e2.flatMap(a=>{const o=s.flatMap(({date:r,[a]:i})=>i===null?[]:[{date:r,value:i}]);return o.length>0?[[a,wf(o,Re[a])]]:[]}))}const n2={name:"climate-series",directory:"public/data/climate-series",firstYear:1950,answers:"text",files:as.map(t=>`${t.code}.json`),about:{measures:"daily minimum and maximum temperature and daily rain, checked and homogenised",network:"CADTEP, the Meteocat's long series since 1950",attribution:"Servei Meteorològic de Catalunya, CADTEP (Prohom and others, 2023).",dataset:"https://www.meteo.cat/wpweb/climatologia/dades-i-productes-climatics/series-climatiques-des-de-1950/",stations:as},requestsFor(){return as.map(t=>`${Qx}/${t.code}d.txt`)},withYear(t,e,n){return Object.fromEntries(as.map((s,a)=>{const o=`${s.code}.json`,r=Kx(String(n[a]));return[o,{...s,years:{...t[o]?.years,[e]:t2(s.name,r,e)}}]}))}},cd=_e.flatMap(t=>[...t.stations.map(({code:e})=>e),t.every.name]),dd=t=>`${t.slice(0,-1).join(", ")} or ${t.at(-1)}`,Er=t=>typeof t=="number"?t:typeof t=="string"&&t.trim()!==""?Number(t):Number.NaN;function s2(t){const e=String(t.station??cd[0]),n=sl(e);if(!n)return{refused:`station: ${e} is not one of ${dd(cd)}`};const s=String(t.kind??ve[0]?.id),a=ve.find(({id:c})=>c===s);if(!a)return{refused:`kind: ${s} is not one of ${dd(ve.map(({id:c})=>c))}`};const o=t.threshold===void 0?a.threshold:Er(t.threshold);if(!Number.isFinite(o))return{refused:`threshold: ${String(t.threshold)} is not a number`};const r=Array.isArray(t.months)?t.months:t.months===void 0?Array.from({length:12},(c,d)=>d+1):[t.months],i=r.find(c=>!Number.isInteger(c)||c<1||c>12);if(i!==void 0)return{refused:`months: ${String(i)} is not a month from 1 to 12`};const l=t.from===void 0?void 0:Er(t.from);if(l!==void 0&&!Number.isInteger(l))return{refused:`from: ${String(t.from)} is not a year`};const h=t.to===void 0?void 0:Er(t.to);return h!==void 0&&!Number.isInteger(h)?{refused:`to: ${String(t.to)} is not a year`}:{codes:n.codes,group:n.group,kind:s,question:{variable:a.variable,atLeast:a.atLeast,threshold:o,months:[...new Set(r)].sort((c,d)=>c-d).map(c=>c-1)},...l!==void 0&&{from:l},...h!==void 0&&{to:h}}}const ud="weather",xa=t=>Math.round(t*10)/10,a2=t=>t.reduce((e,n)=>e+n,0)/t.length,o2=(t,e)=>e.running?t(`${e.directory}/running.json`).then(n=>xt(()=>n,""),()=>null):Promise.resolve(null);async function r2(t,e,n,s){return(await Promise.allSettled(t.map(o=>n(`${e.directory}/${o}.json`).then(r=>it(JSON.parse(r),s,`${o}.json`))))).flatMap(o=>o.status==="fulfilled"?[o.value]:[])}function md(t,e,n=-1/0,s=1/0){const a=nl(t,e),o=pf(a),r=a.filter(l=>l.whole),i=mf(t,e);return{station:{code:t.code,name:t.name,municipality:t.municipality,altitudeMetres:t.altitude,setting:t.setting},years:a.filter(({year:l})=>l>=n&&l<=s).map(({year:l,days:h,whole:c,measured:d,expected:u,through:m})=>({year:l,days:h,whole:c,measuredDays:d,expectedDays:u,...m&&{soFarThrough:m}})),halves:o?.map(l=>({from:l.from,to:l.to,years:l.years,daysPerYear:xa(l.days)}))??null,...o&&{changeDaysPerYear:xa(o[1].days-o[0].days)},daysPerYearRecently:o?xa(o[1].days):r.length?xa(a2(r.map(({days:l})=>l))):null,...i&&{[e.atLeast?"highestOnRecord":"lowestOnRecord"]:{value:i.value,unit:Re[e.variable].unit,date:i.date}}}}function i2(t,e,n){const[s,a]=t.halves??[],o=s&&a?`: ${s.daysPerYear} a year ${s.from}–${s.to}, ${a.daysPerYear} a year ${a.from}–${a.to} (${t.changeDaysPerYear>=0?"+":""}${t.changeDaysPerYear})`:": too few whole years to halve the record",r=n&&t.years.find(({year:i})=>i===n.year);return`${t.station.name}, ${e}${o}.${r?` ${n.year} so far, to ${rt(n.through)}: ${r.days}.`:""}`}const l2={name:"hot-nights",description:`Days of a kind counted year by year at ${Ge.length} automatic weather stations of the Meteocat in Catalonia, from 1988, or in ${_e[1]?.stations.length} of its long series, checked and homogenised by its climatologists, from 1950: torrid nights (the daily minimum at 25 °C or more), tropical nights (20 °C or more), hot and torrid days, frost, rain. For a station or a series: every year's count, whether it was measured whole, the year still running so far where it is kept, the two halves of the record compared, and its most extreme day; for all, or all-series: them side by side.`,inputSchema:{type:"object",properties:{station:{type:"string",enum:_e.flatMap(t=>[...t.stations.map(({code:e})=>e),t.every.name]),default:Ge[0]?.code,description:_e.map(t=>`${t.stations.map(({code:e,name:n})=>`${e} ${n}`).join("; ")}; or ${t.every.name}, ${t.every.label}`).join(". ")},kind:{type:"string",enum:ve.map(({id:t})=>t),default:ve[0]?.id,description:ve.map(({id:t,name:e,atLeast:n,threshold:s,variable:a})=>`${t}: ${e}, ${Re[a].name} ${n?"at least":"below"} ${s} ${Re[a].unit}`).join("; ")},threshold:{type:"number",description:"moves the kind's threshold, in its unit: °C, mm or mm/h"},months:{type:"array",items:{type:"integer",minimum:1,maximum:12},description:"the months to count in, January being 1; every month when left out"},from:{type:"integer",description:"the first year to list; the halves are always of the whole record"},to:{type:"integer",description:"the last year to list"}},required:[],additionalProperties:!1},readOnly:!0,shows:!0,async answer(t,{site:e,read:n}){const s=s2(t);if("refused"in s)return s;const{codes:a,group:o,question:r,kind:i,from:l,to:h}=s,c=JSON.parse(await n(`${o.directory}/index.json`)),d=await o2(n,o),u=await r2(a,o,n,d);if(u.length===0)return{refused:"the measurements did not arrive; ask again"};const m=bi(r),f=io(e,ud)?.route,p={source:c.attribution,refreshed:d&&u.some(v=>v.soFar)?d.refreshed:c.refreshed,...f!==void 0&&{route:f}};if(a.length===1){const[v]=u,b=md(v,r,l,h);return{summary:i2(b,m,v.soFar),data:{question:m,...b},...p,show:{app:ud,values:{station:v.code,kind:i,threshold:r.threshold,months:r.months.join(",")}}}}const w=u.map(v=>md(v,r,l,h)).sort((v,b)=>(b.daysPerYearRecently??-1)-(v.daysPerYearRecently??-1)),g=w.map(({station:v,daysPerYearRecently:b})=>`${v.name}, ${b??"no whole year"}${b===null?"":" a year"}`).join("; ");return{summary:`Most ${m}, in the second half of each record: ${g}.`,data:{question:m,stations:w.map(({station:v,...b})=>({code:v.code,name:v.name,...b}))},...p}}},yf={kind:"choice",choices:_e.flatMap(t=>[...t.stations.map(e=>({value:e.code,label:e.name})),{value:t.every.name,label:t.every.label}])};function bf(t,e){const n=sl(e);if(!n)throw new Error(`station: there is no station ${e}`);const{group:s,codes:a}=n,o=`${s.directory}/running.json`,r=s.running?qi(t,o):null,i=r===null?null:xt(()=>r,o),l=a.map(d=>it(JSON.parse(t(`${s.directory}/${d}.json`)),i,`${d}.json`)),h=JSON.parse(t(`${s.directory}/index.json`)),c=i&&i.refreshed>h.refreshed?i.refreshed:h.refreshed;return{stations:l,every:s.every.name===e,credit:{said:h.attribution,refreshed:c}}}function h2(t){const e=t.split(/[\s,]+/).filter(Boolean).map(Number),n=e.find(s=>!Number.isInteger(s)||s<1||s>12);if(n!==void 0)throw new Error(`months: ${n} is not a month: January is 1, December 12`);return e.length>0?e.map(s=>s-1):Array.from({length:12},(s,a)=>a)}const c2={name:"weather-days",title:"Days of a kind",role:"source",shelf:"Weather",summary:"How many days of a kind each year at a weather station, or in one of the long series: torrid or tropical nights, hot days, frost, rain — the threshold moved if asked.",inputs:[{name:"station",label:"station",type:"text",initial:Ge[0]?.code??"WU",editor:yf},{name:"kind",label:"kind",type:"text",initial:ve[0]?.id??"torrid-nights",editor:{kind:"choice",choices:ve.map(t=>({value:t.id,label:t.name}))}},{name:"threshold",label:"threshold",type:"number",optional:!0,editor:{kind:"number",min:-20,max:60,step:.5},hint:"moves the kind's own: °C, mm or mm/h"},{name:"months",label:"months",type:"text",optional:!0,hint:"the months to count in, January being 1, as: 6 7 8; every month when left empty"}],outputs:[{name:"table",label:"table",type:"table"}],run:(t,{read:e})=>{const n=ve.find(u=>u.id===t.kind);if(!n)throw new Error(`kind: there is no kind ${String(t.kind)}: there are ${ve.map(u=>u.id).join(", ")}`);const s=t.threshold===void 0?n.threshold:Number(t.threshold),a={variable:n.variable,atLeast:n.atLeast,threshold:s,months:h2(String(t.months??""))},o=String(t.station),{stations:r,every:i,credit:l}=bf(e,o),h=r.flatMap(u=>nl(u,a).map(m=>({...i&&{station:u.code},year:m.year,days:m.days,measured:m.measured,whole:m.whole?"yes":"no"}))),c=Re[n.variable];return{outputs:{table:{columns:[...i?[{name:"station",kind:"text",key:!0}]:[],{name:"year",kind:"number",key:!0},{name:"days",kind:"number",about:`${n.name}: the ${c.name} ${n.atLeast?"at least":"below"} ${s} ${c.unit}`},{name:"measured",kind:"number",about:"the days measured in the months asked"},{name:"whole",kind:"text",about:"yes when nearly every day was measured, and the year is over"}],rows:h,credits:[l]}},said:`${n.name}: ${c.name} ${n.atLeast?"≥":"<"} ${s} ${c.unit}`}}},d2=.95,u2=(t,e)=>new Date(Date.UTC(t,e+1,0)).getUTCDate(),fd=t=>(t??[0]).slice(1).reduce((e,n)=>e+n,0),m2={name:"weather-months",title:"Weather by month",role:"source",shelf:"Weather",summary:"A weather station of the Meteocat, or one of its long series, month by month: the mean daily minimum and maximum, the rain, and the most rain in an hour.",inputs:[{name:"station",label:"station",type:"text",initial:Ge[0]?.code??"WU",editor:yf}],outputs:[{name:"table",label:"table",type:"table"}],run:(t,{read:e})=>{const n=String(t.station),{stations:s,every:a,credit:o}=bf(e,n),r=s.flatMap(l=>Object.entries(l.years).flatMap(([h,c])=>Array.from({length:12},(d,u)=>{const[m,f,p,w]=[c.tn?.summaries[u]??null,c.tx?.summaries[u]??null,c.pp?.summaries[u]??null,c.pi?.summaries[u]??null];if(m===null&&f===null&&p===null)return null;const g=Math.max(fd(c.tn?.months[u]),fd(c.tx?.months[u])),v=l.soFar?.year===Number(h);return{...a&&{station:l.code},year:Number(h),month:u+1,season:ks(u+1),tn:m,tx:f,rain:p,downpour:w,days:g,whole:!v&&g>=d2*u2(Number(h),u)?"yes":"no"}}).filter(d=>d!==null)));return{outputs:{table:{columns:[...a?[{name:"station",kind:"text",key:!0}]:[],{name:"year",kind:"number",key:!0},{name:"month",kind:"number",key:!0},{name:"season",kind:"text",key:!0,about:"winter is December to February, as meteorologists count it",order:vs},{name:"tn",kind:"number",unit:"°C",about:"the mean daily minimum"},{name:"tx",kind:"number",unit:"°C",about:"the mean daily maximum"},{name:"rain",kind:"number",unit:"mm",about:"the month's rain"},{name:"downpour",kind:"number",unit:"mm/h",about:"the most rain in one hour, which the long series do not have"},{name:"days",kind:"number",about:"the days measured"},{name:"whole",kind:"text",about:"yes when nearly every day was measured, and the month is over"}],rows:r,credits:[o]}}}}},f2={name:"weather-stations",title:"Weather stations",role:"source",shelf:"Weather",summary:"The weather stations themselves, and the long series: their code, name, town, height above the sea, what is around them, and which kind of record each is.",inputs:[],outputs:[{name:"table",label:"table",type:"table"}],run:()=>({outputs:{table:{columns:[{name:"station",kind:"text",key:!0},{name:"name",kind:"text"},{name:"municipality",kind:"text"},{name:"altitude",kind:"number",unit:"m"},{name:"setting",kind:"text"},{name:"record",kind:"text",about:"an automatic station of the network, or one of the Meteocat's long series, checked and homogenised since 1950"}],rows:_e.flatMap(e=>e.stations.map(n=>({station:n.code,name:n.name,municipality:n.municipality,altitude:n.altitude,setting:n.setting,record:e.label})))}}})},p2=[m2,c2,f2],pd="7bvh-jvq2",vf=5e4,kf=Object.entries(Re),g2="No representatiu",w2=["Representatiu",""];function gd(t,e){if(!Array.isArray(t))throw new Error("the portal did not answer with rows");if(t.length>=vf)throw new Error("the answer was cut short at the limit");const n=t;if(n.length===0)throw new Error("the portal has no days of it yet");if(e&&!n.some(o=>o.data_lectura?.slice(5,7)==="12"))throw new Error("the year does not reach December yet");const s=new Map,a=new Set;for(const o of n){const r=o.estat??"";if(r===g2)continue;if(!w2.includes(r))throw new Error(`the network marks days as "${r}", which nobody has decided how to read`);const i=o.data_lectura?.slice(0,10)??"",l=`${o.codi_estacio}/${o.codi_variable}`;if(a.has(`${l}/${i}`))throw new Error(`${l} has ${i} twice`);a.add(`${l}/${i}`);const h=Number(o.valor);Number.isFinite(h)&&s.set(l,[...s.get(l)??[],{date:i,value:h}])}return s}function wd(t,e,n){return Object.fromEntries(Ge.map(s=>{const a=`${s.code}.json`,o=kf.flatMap(([l,h])=>{const c=n.get(`${s.code}/${h.code}`);return c?[[l,wf(c,h)]]:[]}),r=Object.fromEntries(o),i={...t[a]?.years,...o.length?{[e]:r}:{}};return[a,{...s,years:i}]}))}const y2={name:"weather",directory:"public/data/weather",firstYear:1988,files:Ge.map(t=>`${t.code}.json`),about:{measures:"daily minimum and maximum temperature, daily rain, most rain in one hour",network:"Xarxa d'Estacions Meteorològiques Automàtiques (XEMA)",attribution:"Servei Meteorològic de Catalunya (XEMA). Dades obertes de la Generalitat de Catalunya.",dataset:`https://analisi.transparenciacatalunya.cat/d/${pd}`,stations:Ge},requestsFor(t){const e=Ge.map(s=>`'${s.code}'`).join(","),n=kf.map(([,s])=>s.code).join(",");return[Uu(pd,{select:"codi_estacio,codi_variable,data_lectura,valor,estat",where:`codi_estacio in (${e}) and codi_variable in (${n}) and data_lectura between '${t}-01-01T00:00:00' and '${t}-12-31T23:59:59'`,limit:vf})]},withYear(t,e,n){return wd(t,e,gd(n[0],!0))},soFar(t,e){const n=gd(e[0],!1),s=[...n.values()].flat().reduce((a,{date:o})=>o>a?o:a,"");return{files:wd({},t,n),through:s}}},b2=t=>{const e=`${Ge[0]?.code}.json`,n=xt(t,"/data/weather/running.json"),s=it(JSON.parse(t(`/data/weather/${e}`)),n,e),a=JSON.parse(t("/data/weather/index.json"));return gf(s,yi)+oo(a,n)},v2={name:"weather",apps:{weather:Yx},stills:{weather:b2},sources:[y2,n2],tools:[l2],nodes:p2},vi=new Fu,Or="header-world",Ca={saved(){try{const t=localStorage.getItem(Or);if(!t)return null;const e=JSON.parse(t);return[e.seed,e.levels,e.roughness,e.share].every(s=>typeof s=="number"&&Number.isFinite(s))?e:null}catch{return null}},remember(t){try{localStorage.setItem(Or,JSON.stringify(t))}catch{}},forget(){try{localStorage.removeItem(Or)}catch{}}};function $f(t,e,n){const s=t.mesh.faces[n*3]??0,a=t.mesh.faces[n*3+1]??0,o=t.mesh.faces[n*3+2]??0;return((e[s]??0)+(e[a]??0)+(e[o]??0))/3}function k2(t,e){return $f(t,t.mesh.radii,e)}const $2=[24,92,168],x2=[62,176,206],T2=[214,196,138],yd=[190,158,84],Ir=[70,138,66],M2=[74,104,76],S2=[136,128,116],bd=[238,243,247];function Wt(t,e,n){const s=Math.min(1,Math.max(0,n));return[t[0]+(e[0]-t[0])*s,t[1]+(e[1]-t[1])*s,t[2]+(e[2]-t[2])*s]}function A2(t){return t>.78?yd:t>.62?Wt(Ir,yd,(t-.62)/.16):t>.3?Ir:Wt(M2,Ir,(t-.12)*5.5)}const xf=t=>{const e=new Uint8ClampedArray(t.mesh.faceCount*3),n=t.mesh.radii.reduce((a,o)=>Math.max(a,o),-1/0),s=Math.max(1e-6,n-t.seaRadius);for(let a=0;a<t.mesh.faceCount;a+=1){const o=(k2(t,a)-t.seaRadius)/s,r=$f(t,t.temperature,a);let i;o<=.002?(i=Wt(x2,$2,.55),r<.16&&(i=Wt(i,bd,(.16-r)*6))):(i=Wt(T2,A2(r),Math.min(1,o*9)),i=Wt(i,S2,Math.max(0,o-.55)*2.2),r<.26&&(i=Wt(i,bd,(.26-r)*4))),e[a*3]=i[0],e[a*3+1]=i[1],e[a*3+2]=i[2]}return{...t,faceColour:e}};function Tf(t,e){const n=new Float32Array(t.length*3),s=new Float32Array(t.length),a=new Float32Array(t.length);t.forEach((r,i)=>{n[i*3]=r.direction[0],n[i*3+1]=r.direction[1],n[i*3+2]=r.direction[2],s[i]=r.radius,a[i]=r.surface});const o=new Uint32Array(e.length*3);return e.forEach(([r,i,l],h)=>{o[h*3]=r,o[h*3+1]=i,o[h*3+2]=l}),{directions:n,radii:s,surface:a,faces:o,faceCount:e.length,vertexCount:t.length}}const E2=(t,e)=>(t+e)/2;function O2(t,e,n=E2){const s=Array.from({length:t.vertexCount},(i,l)=>({direction:[t.directions[l*3]??0,t.directions[l*3+1]??0,t.directions[l*3+2]??0],radius:t.radii[l]??1,surface:t.surface[l]??0})),a=new Map,o=(i,l)=>{const h=i<l?`${i}:${l}`:`${l}:${i}`,c=a.get(h);if(c!==void 0)return c;const d=s[i],u=s[l],[m,f,p]=d.direction,[w,g,v]=u.direction,b=Math.hypot(m*d.radius-w*u.radius,f*d.radius-g*u.radius,p*d.radius-v*u.radius),[k,x,T]=[(m+w)/2,(f+g)/2,(p+v)/2],$=Math.hypot(k,x,T)||1,O=n(d.surface,u.surface);s.push({direction:[k/$,x/$,T/$],radius:(d.radius+u.radius)/2+e(b),surface:O});const L=s.length-1;return a.set(h,L),L},r=[];for(let i=0;i<t.faceCount;i+=1){const l=t.faces[i*3],h=t.faces[i*3+1],c=t.faces[i*3+2],d=o(l,h),u=o(h,c),m=o(c,l);r.push([l,d,m],[h,u,d],[c,m,u],[d,u,m])}return Tf(s,r)}function I2(t,e){return{...t,mesh:e,temperature:new Float32Array(e.vertexCount),faceColour:new Uint8ClampedArray(e.faceCount*3)}}const Mf=(t=4,e=.28,n=.2)=>s=>{const a=$s(s.seed);let o=s.mesh;const r=Float32Array.from(o.surface,()=>a());o={...o,surface:r};for(let i=0;i<t;i+=1)o=O2(o,l=>l*e*(a()-.5),(l,h)=>{const c=.5+(a()-.5)*(l-h)*n;return Math.min(1,Math.max(0,l*(1-c)+h*c))});return I2(s,o)},Sf=(t=.55)=>e=>{const n=Float32Array.from(e.mesh.radii).sort(),s=Math.min(n.length-1,Math.floor(n.length*t)),a=n[s]??1,o=Float32Array.from(e.mesh.radii,r=>Math.max(r,a));return{...e,mesh:{...e.mesh,radii:o},seaRadius:a}};function C2(t,e){return Math.abs(t.mesh.directions[e*3+1]??0)}const Af=({equator:t=1,pole:e=.05,peak:n=0}={})=>s=>{const a=new Float32Array(s.mesh.vertexCount),o=s.mesh.radii,r=o.reduce((h,c)=>Math.min(h,c),1/0),l=o.reduce((h,c)=>Math.max(h,c),-1/0)-r||1;for(let h=0;h<s.mesh.vertexCount;h+=1){const c=((o[h]??1)-r)/l,d=C2(s,h)**2.2;a[h]=t+(e-t)*d+(n-t)*c}return{...s,temperature:a}},Ie=(1+Math.sqrt(5))/2,j2=[[-1,Ie,0],[1,Ie,0],[-1,-Ie,0],[1,-Ie,0],[0,-1,Ie],[0,1,Ie],[0,-1,-Ie],[0,1,-Ie],[Ie,0,-1],[Ie,0,1],[-Ie,0,-1],[-Ie,0,1]],N2=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];function L2(){const t=j2.map(([e,n,s])=>{const a=Math.hypot(e,n,s);return{direction:[e/a,n/a,s/a],radius:1,surface:0}});return Tf(t,N2.map(e=>[...e]))}function P2(t){const e=L2();return{seed:t,mesh:e,temperature:new Float32Array(e.vertexCount),faceColour:new Uint8ClampedArray(e.faceCount*3),seaRadius:0}}const F2=[Mf(),Sf(),Af(),xf];function B2(t,e=F2){return e.reduce((n,s)=>s(n),P2(t))}function Ef(t){return B2(t.seed,[Mf(t.levels,t.roughness),Sf(t.share),Af(),xf])}const vd=.3,R2=[-.5,.45,.74],D2=1.02;class al{size;pixels;depth;view=new Float32Array(0);screen=new Float32Array(0);constructor(e,n=new Uint8ClampedArray(e*e*4)){if(n.length!==e*e*4)throw new Error(`SphereRaster: ${e}×${e} needs ${e*e*4} bytes, not ${n.length}`);this.size=e,this.pixels=n,this.depth=new Float32Array(e*e)}paint(e,n){const{size:s,pixels:a,depth:o}=this;a.fill(0),o.fill(-1/0);const[r,i,l]=W2(n.light??R2),h=n.tilt??-.38,c=Math.cos(h),d=Math.sin(h),u=Math.cos(n.rotation),m=Math.sin(n.rotation),{directions:f,radii:p,faces:w,faceCount:g,vertexCount:v}=e.mesh;let b=1;for(let $=0;$<v;$+=1){const O=p[$]??1;O>b&&(b=O)}const k=s/(2*b*D2);this.view.length<v*3&&(this.view=new Float32Array(v*3),this.screen=new Float32Array(v*3));const x=this.view,T=this.screen;for(let $=0;$<v;$+=1){const O=p[$]??1,L=(f[$*3]??0)*O,F=(f[$*3+1]??0)*O,N=(f[$*3+2]??0)*O,j=L*u-N*m,S=L*m+N*u,A=F*c+S*d,I=-F*d+S*c;x[$*3]=j,x[$*3+1]=A,x[$*3+2]=I,T[$*3]=s/2+j*k,T[$*3+1]=s/2-A*k,T[$*3+2]=I}for(let $=0;$<g;$+=1){const O=w[$*3]??0,L=w[$*3+1]??0,F=w[$*3+2]??0,N=T[O*3],j=T[O*3+1],S=T[O*3+2],A=T[L*3],I=T[L*3+1],D=T[L*3+2],C=T[F*3],B=T[F*3+1],W=T[F*3+2],z=(A-N)*(B-j)-(I-j)*(C-N);if(z>=0)continue;const de=x[O*3],An=x[O*3+1],lt=x[O*3+2],Ye=x[L*3]-de,En=x[L*3+1]-An,Se=x[L*3+2]-lt,Ms=x[F*3]-de,Jt=x[F*3+1]-An,Tt=x[F*3+2]-lt,Ss=En*Tt-Se*Jt,Kt=Se*Ms-Ye*Tt,Mt=Ye*Jt-En*Ms,On=Math.hypot(Ss,Kt,Mt)||1,Vt=Ss/On*r+Kt/On*i+Mt/On*l,St=vd+(1-vd)*Math.max(0,Vt),fo=(e.faceColour[$*3]??0)*St,po=(e.faceColour[$*3+1]??0)*St,As=(e.faceColour[$*3+2]??0)*St,Es=Math.max(0,Math.floor(Math.min(N,A,C))),Os=Math.min(s-1,Math.ceil(Math.max(N,A,C))),Is=Math.max(0,Math.floor(Math.min(j,I,B))),Cs=Math.min(s-1,Math.ceil(Math.max(j,I,B)));for(let ht=Is;ht<=Cs;ht+=1)for(let At=Es;At<=Os;At+=1){const Xt=At+.5,In=ht+.5,js=(A-N)*(In-j)-(I-j)*(Xt-N),Zt=(C-A)*(In-I)-(B-I)*(Xt-A),Qt=(N-C)*(In-B)-(j-B)*(Xt-C);if(js>0||Zt>0||Qt>0)continue;const Et=Zt/z,Cn=Qt/z,R=S*Et+D*Cn+W*(1-Et-Cn),q=ht*s+At;R<=o[q]||(o[q]=R,a[q*4]=fo,a[q*4+1]=po,a[q*4+2]=As,a[q*4+3]=255)}}return a}}function W2([t,e,n]){const s=Math.hypot(t,e,n)||1;return[t/s,e/s,n/s]}const H2=.2,q2=.36,z2=[{upTo:20,dark:4,bright:12},{upTo:70,dark:6,bright:14},{upTo:160,dark:2,bright:10},{upTo:198,dark:3,bright:11},{upTo:275,dark:1,bright:9},{upTo:330,dark:5,bright:13},{upTo:360,dark:4,bright:12}];function G2(t,e,n){const s=Math.max(t,e,n),a=Math.min(t,e,n),o=(s+a)/2/255;if((s===0?0:(s-a)/s)<H2)return o<.08?0:o<.5?8:o<.8?7:15;const i=s-a;let l;s===t?l=(e-n)/i*60:s===e?l=(2+(n-t)/i)*60:l=(4+(t-e)/i)*60,l<0&&(l+=360);const h=z2.find(({upTo:c})=>l<c)??{dark:4,bright:12};return o<.08?0:o>=q2?h.bright:h.dark}function _2(t,e){const n=(a,o)=>{const r=(o*e+a)*4;return(t[r+3]??0)===0?-1:G2(t[r]??0,t[r+1]??0,t[r+2]??0)},s=[];for(let a=0;a<e/2;a+=1){const o=[];for(let r=0;r<e;r+=1)o.push({top:n(r,a*2),bottom:n(r,a*2+1)});s.push(o)}return s}const Kn=["#000000","#0000aa","#00aa00","#00aaaa","#aa0000","#aa00aa","#aa5500","#aaaaaa","#555555","#5555ff","#55ff55","#55ffff","#ff5555","#ff55ff","#ffff55","#ffffff"];function U2(t){const e=({top:n,bottom:s})=>n<0&&s<0?"<span> </span>":n<0?`<span style="color:${Kn[s]}">▄</span>`:s<0?`<span style="color:${Kn[n]}">▀</span>`:n===s?`<span style="color:${Kn[n]}">█</span>`:`<span style="color:${Kn[n]};background:${Kn[s]}">▀</span>`;return t.map(n=>n.map(e).join("")).join(`
`)}const ki={levels:4,roughness:.28,share:.55},Vn=32;let Cr=null,kd=null,jr=null;function $d(t,e){const n=document.querySelector('link[rel="icon"]');if(!n)return;Cr??=Object.assign(document.createElement("canvas"),{width:Vn,height:Vn});const s=Cr.getContext("2d");s&&(jr??=s.createImageData(Vn,Vn),kd??=new al(Vn,jr.data),kd.paint(t,{rotation:e}),s.putImageData(jr,0,0),n.type="image/png",n.href=Cr.toDataURL("image/png"))}const Y2=90,J2=1e3/12,K2=400,Nr=new WeakMap;function V2(t){const e=(t.textContent??"").split(`
`);return{columns:Math.max(...e.map(n=>n.length)),rows:e.length}}function $i(t,e){Nr.get(t)?.();const n=e??{...ki,seed:Math.floor(Math.random()*16777215)},{columns:s,rows:a}=V2(t),o=Math.min(s,a*2),r=Ef(n),i=new al(o);t.dataset.seed=String(n.seed),t.title=`World ${n.seed}, ${r.mesh.faceCount.toLocaleString("en")} triangles`;const l=w=>{t.innerHTML=U2(_2(i.paint(r,{rotation:w}),o)),t.classList.add("grown")};if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return l(.6),$d(r,.6),Nr.set(t,()=>{}),()=>{};let h=0,c=-1/0,d=-1/0;const u=performance.now(),m=to(t),f=w=>{const g=(w-u)/1e3/Y2*Math.PI*2;m.onScreen()&&w-c>=J2&&(l(g),c=w),w-d>K2&&($d(r,g),d=w),h=requestAnimationFrame(f)};h=requestAnimationFrame(f);const p=()=>{cancelAnimationFrame(h),m.stop()};return Nr.set(t,p),p}function X2(){const t=document.querySelector(".planet");return t?$i(t,Ca.saved()??void 0):()=>{}}const mn=360,Z2=60,Q2=1.4,xd=Math.PI*2/Z2,Td=Math.PI*4;function eT(t){const e=y("canvas",{class:"world",width:mn,height:mn}),n=e.getContext("2d");if(!n)return()=>{};const s={...ki,seed:Math.floor(Math.random()*16777215)},a=n.createImageData(mn,mn),o=new al(mn,a.data),r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let i,l=.6,h=-.38,c=!r,d=null,u=0,m=performance.now();const f=y("p",{class:"hint"}),p=document.querySelector(".planet"),w=(20*4**ki.levels).toLocaleString("en"),g=()=>{i=Ef(s);const j=Ca.saved();f.textContent=`World ${s.seed}: ${i.mesh.faceCount.toLocaleString("en")} triangles. `+(j?`The header is keeping world ${j.seed}, ${(20*4**j.levels).toLocaleString("en")} triangles.`:`The header grows a new one every visit, ${w} triangles each.`),b.hidden=!j,k()},v=y("button",{type:"button",onclick:()=>{Ca.remember({...s}),p&&$i(p,{...s}),g()}},"Put it in the header"),b=y("button",{type:"button",hidden:!0,onclick:()=>{Ca.forget(),p&&$i(p),g()}},"Let the header grow its own"),k=()=>{o.paint(i,{rotation:l,tilt:h}),n.putImageData(a,0,0)};let x=0;const T=to(e),$=j=>{const S=Math.min(.1,(j-m)/1e3);if(!d&&T.onScreen()){if(u!==0){u*=Math.exp(-S/Q2);const A=c?xd:0;(Math.abs(u)<=A||Math.abs(u)<.01)&&(u=0)}u!==0?(l-=u*S,k()):c&&(l+=xd*S,k()),vi.send({byRadians:u*S,tiltedBy:0,seconds:S})}m=j,x=requestAnimationFrame($)};e.addEventListener("pointerdown",j=>{d={x:j.clientX,y:j.clientY,at:j.timeStamp},u=0,e.setPointerCapture(j.pointerId)}),e.addEventListener("pointermove",j=>{if(!d)return;const S=e.clientWidth||mn,A=(j.clientX-d.x)/S*Math.PI;l-=A;const I=h;h=Math.max(-1.2,Math.min(1.2,h-(j.clientY-d.y)/S*Math.PI)),vi.send({byRadians:A,tiltedBy:h-I,seconds:0});const D=Math.max(.004,(j.timeStamp-d.at)/1e3);u=Math.max(-Td,Math.min(Td,u*.4+A/D*.6)),d={x:j.clientX,y:j.clientY,at:j.timeStamp},k()}),e.addEventListener("pointerup",j=>{d&&j.timeStamp-d.at>120&&(u=0),d=null,m=performance.now()}),e.addEventListener("pointercancel",()=>{d=null,u=0});const O=y("input",{type:"number",min:0,value:s.seed,onchange:()=>{s.seed=Math.max(0,Math.floor(Number(O.value)||0)),g()}}),L=y("button",{type:"button",onclick:()=>{s.seed=Math.floor(Math.random()*16777215),O.value=String(s.seed),g()}},"Another world"),F=y("button",{type:"button",onclick:()=>{c=!c,F.textContent=c?"Hold still":"Turn"}},c?"Hold still":"Turn"),N=(j,S,A,I,D,C)=>{const B=y("output",{},C(s[j])),W=y("input",{type:"range",min:A,max:I,step:D,value:s[j],onchange:()=>{s[j]=Number(W.value),B.textContent=C(s[j]),g()},oninput:()=>{B.textContent=C(Number(W.value))}});return y("label",{},`${S}: `,B,W)};return t.append(e,y("div",{class:"row"},y("span",{},"Seed "),O,L,F,v,b),y("div",{class:"dials"},N("levels","Detail",2,6,1,j=>`${j} splits`),N("roughness","Roughness",.02,1,.01,j=>j.toFixed(2)),N("share","Sea",0,.98,.01,j=>`${Math.round(j*100)}%`)),f),g(),x=requestAnimationFrame($),()=>{cancelAnimationFrame(x),T.stop()}}const tT={name:"world",apps:{worlds:eT},install:()=>X2()},nT=/^- \[(.+)\]\((\S+)\)\s*$/;function sT(t){const e=t.split(`
`);let n="";return e.flatMap((s,a)=>{s.startsWith("## ")&&(n=vt(s));const o=nT.exec(s);if(!o)return[];const[,r="",i=""]=o;return[{title:r,url:i,about:n,said:vt(e[a+1]??"")}]})}const Md=/\[[^\]]*\]\(([^)\s]+)\)/;function aT(t,e){let n="";return t.split(`
`).flatMap(s=>{s.startsWith("## ")&&(n=vt(s));const a=s.indexOf(" :: ");if(a<0)return[];const o=s.slice(a+4),r=/\*\*(.+?)\*\*/.exec(o)?.[1]??"",i=Md.exec(r)?.[1]??Md.exec(o)?.[1];return[{date:s.slice(0,a).trim(),title:vt(r),...i!==void 0&&{url:i.startsWith("/")?`${e}${i}`:i},about:n,said:vt(o).replace(/ -- /g," — ")}]})}const Sd=["essays","talks","both"],Ad="/essays/",Ed="/talks/",Od=(t,e)=>`${t} ${e}${t===1?"":"s"}`,Id=(t,e)=>e.every(n=>new RegExp(`(^|[^\\p{L}\\p{N}])${n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}`,"iu").test(t)),oT=t=>(t.match(/\d{4}/g)??[]).map(Number),rT=t=>/\]\((https?:[^)\s]+)\)/.exec(t.body.split(`
## `)[0]??"")?.[1];function Cd(t,e){if(e===void 0)return{};const n=typeof e=="number"?e:typeof e=="string"&&/^\s*\d{4}\s*$/.test(e)?Number(e):Number.NaN;return Number.isInteger(n)?{year:n}:{refused:`${t}: ${String(e)} is not a year`}}const iT={name:"writings",description:"The essays and talks this site lists — each with its title, link, the subject it is grouped under and what the page says of it; talks with their date — and where to find the ones it does not list. Nothing on the reader's screen moves.",inputSchema:{type:"object",properties:{kind:{type:"string",enum:Sd,default:"both",description:"essays, talks, or both"},about:{type:"string",description:"words that must all be in its title, what is said of it, or its subject, e.g. tdd, technical debt, ai"},from:{type:"number",description:"the first year, for talks: the essays are not dated here, so asking for years leaves them out"},to:{type:"number",description:"the last year, for talks"}},required:[],additionalProperties:!1},readOnly:!0,shows:!1,answer(t,{site:e,origin:n}){const s=String(t.kind??"both");if(!Sd.includes(s))return{refused:`kind: ${s} is not one of essays, talks or both`};const a=Cd("from",t.from);if("refused"in a)return a;const o=Cd("to",t.to);if("refused"in o)return o;const r=a.year!==void 0||o.year!==void 0;if(r&&s==="essays")return{refused:`${a.year!==void 0?"from":"to"}: the essays are not dated here; years are for talks`};const i=String(t.about??"").toLowerCase().split(/\s+/).filter(Boolean),l=s!=="talks"&&!r?e.at(Ad):void 0,h=s!=="essays"?e.at(Ed):void 0,c=v=>oT(v).some(b=>b>=(a.year??-1/0)&&b<=(o.year??1/0)),d=l?sT(l.body).filter(v=>Id(`${v.title} ${v.said} ${v.about}`,i)):[],u=h?aT(h.body,n).filter(v=>Id(`${v.title} ${v.said} ${v.about}`,i)&&c(v.date)):[],m=l&&rT(l),f={...l&&m&&{essays:{said:l.summary,url:m}},...h&&{talks:{said:h.summary,url:`${n}${h.route}`}}},p=[l&&Od(d.length,"essay"),h&&Od(u.length,"talk")].filter(Boolean).join(" and "),w=f.essays?` ${f.essays.said.replace(/\.$/,"")}: ${f.essays.url}`:f.talks?` The rest are told on ${f.talks.url}`:"",g=l&&!h?Ad:h&&!l?Ed:void 0;return{summary:`${p}${i.length>0?` about "${i.join(" ")}"`:""}.${w}`,data:{essays:d,talks:u,more:f},...g!==void 0&&{route:g}}}},lT={name:"writings",tools:[iT]},tt=[tT,Ox,fx(vi),yx,wb,S0,eb,v2,fb,I1,Pk,d$,Dk,Nx,yy,a1,f0,I0,Sk,Yb,Bb,Wk,Uw,p$,P$,W$,X$,ax,hx,lT,i1,yk,_1];function hT(t){return Object.assign({},...t.flatMap(e=>e.programs??[]).map(e=>({[e.name]:zm(e)})),...t.map(e=>e.apps??{}))}const jd="flags",Nd="flags-chosen",Ld="flags-drawn";function Lr(t){try{return localStorage.getItem(t)??""}catch{return""}}function Pr(t,e){try{e?localStorage.setItem(t,e):localStorage.removeItem(t)}catch{}}class cT{on;picked;lots;constructor(){this.on=new Set((Lr(jd)||document.documentElement.dataset.flags||"").split(" ").filter(Boolean)),this.picked=new Set(Lr(Nd).split(" ").filter(Boolean));let e={};try{e=JSON.parse(Lr(Ld)||"{}")}catch{}this.lots=e}isOn(e){return this.on.has(e)}chosen(e){return this.picked.has(e)}drawn(e){return this.lots[e]}set(e,n){this.picked.add(e),delete this.lots[e],this.keep(e,n)}draw(e,n){this.lots[e]=n,this.keep(e,n)}keep(e,n){n?this.on.add(e):this.on.delete(e);const s=[...this.on].join(" ");Pr(jd,s),Pr(Nd,[...this.picked].join(" ")),Pr(Ld,Object.keys(this.lots).length?JSON.stringify(this.lots):""),s?document.documentElement.dataset.flags=s:delete document.documentElement.dataset.flags}}function dT(){return[document,navigator].map(e=>e.modelContext).find(e=>typeof e?.registerTool=="function")}function Pd(t,e){const n=[];for(const s of document.querySelectorAll(".app[data-app]")){const a=t[s.dataset.app??""]?.(s,e);a&&n.push(a)}return()=>{for(const s of n)s()}}function uT(t){const e={},n=t.fields.theme;(n==="dark"||n==="light")&&(e["data-page-theme"]=n);const s=t.fields.sky;return s&&(e["data-sky"]=s),e}const mT=["data-page-theme","data-sky"];function fT(t,e){return e==="/"?t==="/":t.startsWith(e)}const Of=7.8,Fd=17,If=12,pT=8,Fr=28,Bd=44,ls=8,gT=40,wT=16;function yT(t){const e=new Map;for(const b of t.nodes){const k=b.label.split(`
`),x=Math.max(...k.map(T=>T.length),1);e.set(b.id,{id:b.id,label:b.label,real:!0,rank:-1,along:Math.max(40,x*Of+If*2),across:k.length*Fd+pT*2,pos:0,preds:[],succs:[]})}for(const b of t.edges)if(!e.has(b.from)||!e.has(b.to))throw new Error(`flow: edge ${b.from} --> ${b.to} names a node that is not there`);const n=bT(t),s={...t,edges:t.edges.map((b,k)=>n.has(k)?{...b,from:b.to,to:b.from}:b)};for(const b of s.edges){const k=e.get(b.from),x=e.get(b.to);k.succs.push(x),x.preds.push(k)}vT(e);const a=kT(e,s),o=$T(e);xT(o);const r=o.length,i=o.map(b=>Math.max(Fd,...b.map(k=>k.real?k.across:0))),l=[];let h=ls;for(let b=0;b<r;b+=1)l.push(h),h+=(i[b]??0)+Bd;const c=b=>(l[b.rank]??0)+((i[b.rank]??0)-(b.real?b.across:0))/2,d=Math.max(...[...e.values()].map(b=>b.pos+b.along))+ls,u=h-Bd+ls,m=t.direction==="LR",f=(b,k)=>m?[k,b]:[b,k],p=[...e.values()].filter(b=>b.real).map(b=>{const[k,x]=f(b.pos,c(b));return{id:b.id,label:b.label,x:k,y:x,width:m?b.across:b.along,height:m?b.along:b.across}}),w=t.edges.map((b,k)=>{const x=a[k]??[],T=x[0],$=x[x.length-1];if(!T||!$)throw new Error("flow: an edge lost its ends");const O=t.edges.some(S=>S.from===b.to&&S.to===b.from),L=Math.min(gT,T.along/3,$.along/3),F=O?n.has(k)?L:-L:0,N=[f(T.pos+T.along/2+F,c(T)+T.across),...x.slice(1,-1).map(S=>f(S.pos+S.along/2,c(S)+(i[S.rank]??0)/2)),f($.pos+$.along/2+F,c($))],j=n.has(k)?N.reverse():N;return b.label===void 0?{from:b.from,to:b.to,points:j}:{from:b.from,to:b.to,label:b.label,points:j}}),[g,v]=f(d,u);return{direction:t.direction,width:g,height:v,nodes:p,edges:w}}function bT(t){const e=new Set,n=new Map,s=a=>{n.set(a,"walking"),t.edges.forEach((o,r)=>{o.from!==a||e.has(r)||(n.get(o.to)==="walking"?e.add(r):n.has(o.to)||s(o.to))}),n.set(a,"done")};for(const a of t.nodes)n.has(a.id)||s(a.id);return e}function vT(t){const e=new Set,n=s=>{if(s.rank>=0)return s.rank;if(e.has(s))throw new Error(`flow: there is a cycle through ${s.id}, and a flow has a direction`);return e.add(s),s.rank=s.preds.length===0?0:Math.max(...s.preds.map(n))+1,e.delete(s),s.rank};for(const s of t.values())n(s)}function kT(t,e){let n=0;return e.edges.map(s=>{const a=t.get(s.from),o=t.get(s.to);if(!a||!o)return[];const r=[a];let i=a;for(let l=a.rank+1;l<o.rank;l+=1){n+=1;const h={id:`\0${n}`,label:"",real:!1,rank:l,along:Math.max(wT,(s.label?.length??0)*Of+If),across:0,pos:0,preds:[i],succs:[]};t.set(h.id,h),i.succs.push(h),r.push(h),i=h}return i!==a&&(i.succs.push(o),o.preds.push(i),a.succs.splice(a.succs.indexOf(o),1),o.preds.splice(o.preds.indexOf(a),1)),r.push(o),r})}function $T(t){const e=Math.max(...[...t.values()].map(r=>r.rank))+1,n=Array.from({length:e},()=>[]);for(const r of t.values())n[r.rank]?.push(r);const s=new Map,a=r=>r.forEach((i,l)=>s.set(i,l));n.forEach(a);const o=(r,i)=>i.length===0?s.get(r)??0:i.reduce((l,h)=>l+(s.get(h)??0),0)/i.length;for(let r=0;r<4;r+=1){for(let i=1;i<e;i+=1){const l=n[i]??[];l.sort((h,c)=>o(h,h.preds)-o(c,c.preds)),a(l)}for(let i=e-2;i>=0;i-=1){const l=n[i]??[];l.sort((h,c)=>o(h,h.succs)-o(c,c.succs)),a(l)}}return n}function xT(t){const e=r=>r.reduce((i,l)=>i+l.along,0)+Fr*Math.max(0,r.length-1),n=Math.max(...t.map(e));for(const r of t){let i=ls+(n-e(r))/2;for(const l of r)l.pos=i,i+=l.along+Fr}const s=r=>r.pos+r.along/2,a=(r,i)=>{const l=r.map(d=>{const u=i(d);return u.length===0?s(d):u.reduce((m,f)=>m+s(f),0)/u.length});let h=-1/0;r.forEach((d,u)=>{d.pos=Math.max((l[u]??0)-d.along/2,h),h=d.pos+d.along+Fr});const c=r.reduce((d,u,m)=>d+s(u)-(l[m]??0),0)/Math.max(1,r.length);for(const d of r)d.pos-=c};for(let r=0;r<3;r+=1){for(let i=1;i<t.length;i+=1)a(t[i]??[],l=>l.preds);for(let i=t.length-2;i>=0;i-=1)a(t[i]??[],l=>l.succs)}const o=Math.min(...t.flat().map(r=>r.pos));for(const r of t.flat())r.pos+=ls-o}const xi=/(\w[\w.-]*)(?:\[([^\]]*)\])?/,TT=new RegExp(`^${xi.source}\\s*-->(?:\\|([^|]*)\\|)?\\s*${xi.source}$`),MT=new RegExp(`^${xi.source}$`),ST=/^(?:flow\s+)?(TD|LR)$/i;function AT(t){const e=new Map,n=[];let s="TD";const a=(i,l)=>{i&&(e.has(i)||e.set(i,i),l!==void 0&&e.set(i,l.replace(/\\n/g,`
`)))},o=t.split(`
`);let r=!0;return o.forEach((i,l)=>{const h=i.trim();if(h===""||h.startsWith("%"))return;if(r){r=!1;const u=ST.exec(h);if(u){s=u[1]?.toUpperCase()==="LR"?"LR":"TD";return}}const c=TT.exec(h);if(c){const[,u,m,f,p,w]=c;a(u,m),a(p,w),n.push(f===void 0?{from:u??"",to:p??""}:{from:u??"",to:p??"",label:f});return}const d=MT.exec(h);if(d){a(d[1],d[2]);return}throw new Error(`flow: cannot read line ${l+1}: "${h}"`)}),{direction:s,nodes:[...e].map(([i,l])=>({id:i,label:l})),edges:n}}const ET=20,Rd=17;function OT(t){let e=5381;for(let n=0;n<t.length;n+=1)e=(e*33^t.charCodeAt(n))>>>0;return e.toString(36)}const he=t=>String(Math.round(t*10)/10);function IT(t,e){const[n,...s]=t.points;if(!n)return"";let a=`M${he(n[0])},${he(n[1])}`,o=n;for(const r of s){const[i,l]=o,[h,c]=r,d=e?[(i+h)/2,l]:[i,(l+c)/2],u=e?[(i+h)/2,c]:[h,(l+c)/2];a+=` C${he(d[0])},${he(d[1])} ${he(u[0])},${he(u[1])} ${he(h)},${he(c)}`,o=r}return a}function CT(t){const{points:e}=t,n=e[Math.floor((e.length-1)/2)]??[0,0],s=e[Math.ceil((e.length-1)/2)]??n;return[(n[0]+s[0])/2,(n[1]+s[1])/2]}function jT(t){const e=yT(AT(t)),n=e.direction==="LR",s=`arrow-${OT(t)}`,a=e.edges.map(l=>{const h=`<path class="edge" d="${IT(l,n)}" marker-end="url(#${s})"/>`;if(l.label===void 0)return h;const[c,d]=CT(l);return`${h}<text class="edge-label" x="${he(c)}" y="${he(d)}" text-anchor="middle" dominant-baseline="middle">${M(l.label)}</text>`}).join(""),o=e.nodes.map(l=>{const h=l.x+l.width/2,c=l.label.split(`
`),d=l.y+(l.height-c.length*Rd)/2,u=c.map((m,f)=>`<tspan x="${he(h)}" y="${he(d+ET-8+f*Rd)}">${M(m)}</tspan>`).join("");return`<g class="node"><rect x="${he(l.x)}" y="${he(l.y)}" width="${he(l.width)}" height="${he(l.height)}" rx="4"/><text text-anchor="middle" dominant-baseline="middle">${u}</text></g>`}).join(""),r=he(e.width),i=he(e.height);return`<figure class="flow"><svg class="flow" viewBox="0 0 ${r} ${i}" width="${r}" height="${i}" style="max-width: 100%; height: auto" role="img"><defs><marker id="${s}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z"/></marker></defs>${a}${o}</svg></figure>`}const Xn={">=":"≥","<=":"≤","!=":"≠","->":"→","...":"…","*":"·",star:"∗","-":"−","'":"′",cdot:"·",inf:"∞",alpha:"α",beta:"β",gamma:"γ",delta:"δ",epsilon:"ε",lambda:"λ",mu:"μ",pi:"π",sigma:"σ",tau:"τ",phi:"φ",omega:"ω",Delta:"Δ",Sigma:"Σ"},Dd={sum:"∑",prod:"∏",int:"∫"},NT=new Set(["max","min","lim","log","ln","sin","cos","exp","arg"]);function LT(t){const e=[],n=/\s+|\.\.\.|>=|<=|!=|->|\d+(?:\.\d+)?|[A-Za-z]+|[{}]|[_^]|./g;for(const[s]of t.matchAll(n))/^\s+$/.test(s)||(s==="{"||s==="}"?e.push({kind:"brace",text:s}):s==="_"||s==="^"?e.push({kind:"script",text:s}):/^\d/.test(s)?e.push({kind:"number",text:s}):/^[A-Za-z]/.test(s)?e.push({kind:"name",text:s}):e.push({kind:"sign",text:s}));return e}function PT(t){return t.split(`
`).map(e=>e.trim()).filter(Boolean).map(e=>`<math display="block"><mrow>${new FT(LT(e)).expression()}</mrow></math>`).join("")}class FT{constructor(e){this.tokens=e}tokens;at=0;limits=!1;expression(){let e="";for(;this.at<this.tokens.length&&this.peek()?.text!=="}"&&this.peek()?.text!==")";)e+=this.item();return e}item(){let e=this.atom();const n=this.limits;this.limits=!1;let s=null,a=null;for(;this.peek()?.kind==="script";){const r=this.next().text,i=`<mrow>${this.group()}</mrow>`;r==="_"?s=i:a=i}const o=s&&a?n?"munderover":"msubsup":s?n?"munder":"msub":n?"mover":"msup";return!s&&!a?e:`<${o}>${e}${s??""}${a??""}</${o}>`}atom(){const e=this.next();if(e.kind==="brace"&&e.text==="{"){const n=this.expression();return this.expect("}"),`<mrow>${n}</mrow>`}if(e.text==="("){const n=this.expression();return this.peek()?.text===")"&&(this.at+=1),`<mrow><mo>(</mo>${n}<mo>)</mo></mrow>`}return e.kind==="number"?`<mn>${e.text}</mn>`:e.kind==="name"?e.text==="frac"?`<mfrac><mrow>${this.group()}</mrow><mrow>${this.group()}</mrow></mfrac>`:e.text==="sqrt"?`<msqrt>${this.group()}</msqrt>`:e.text==="text"?`<mtext>${M(this.phrase())}</mtext>`:e.text in Dd?(this.limits=!0,`<mo>${Dd[e.text]}</mo>`):NT.has(e.text)?`<mo>${e.text}</mo>`:e.text in Xn?/^[α-ωΑ-Ω]$/.test(Xn[e.text])?`<mi>${Xn[e.text]}</mi>`:`<mo>${Xn[e.text]}</mo>`:`<mi>${M(e.text)}</mi>`:`<mo>${M(Xn[e.text]??e.text)}</mo>`}group(){if(this.peek()?.text==="{"){this.next();const e=this.expression();return this.expect("}"),e}return this.atom()}phrase(){this.expect("{");const e=[];for(;this.at<this.tokens.length&&this.peek()?.text!=="}";)e.push(this.next().text);return this.expect("}"),e.join(" ")}peek(){return this.tokens[this.at]}next(){const e=this.tokens[this.at];if(!e)throw new Error("the formula ends early");return this.at+=1,e}expect(e){if(this.peek()?.text!==e)throw new Error(`expected ${e} in the formula`);this.at+=1}}function BT(t,e){const s=/^https?:/.test(e)?' target="_blank" rel="noopener noreferrer"':"",a=/^\d+$/.test(t)?' class="ref"':"";return`<a href="${M(e)}"${s}${a}>${t}</a>`}const RT=["large","wide","card"];function DT(t,e,n){if(n==="card dark"){const o=e.replace(/(\.[a-z]+)$/,"-dark$1");return`<img src="${M(e)}" alt="${M(t)}" class="card shot-light" loading="lazy"><img src="${M(o)}" alt="${M(t)}" class="card shot-dark" loading="lazy">`}const s=n&&RT.includes(n)?` class="${n}"`:"",a=n==="card"?' loading="lazy"':"";return`<img src="${M(e)}" alt="${M(t)}"${s}${a}>`}const WT=/(`[^`]+`|!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)|\[[^[\]]+\]\([^)\s]+\))/g,HT=/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/,qT=/^\[([^[\]]+)\]\(([^)\s]+)\)$/;function Cf(t){return t.split(WT).map(e=>{if(e.startsWith("`")&&e.endsWith("`")&&e.length>1)return`<code>${M(e.slice(1,-1))}</code>`;const n=HT.exec(e);if(n)return DT(n[1]??"",n[2]??"",n[3]);const s=qT.exec(e);return s?BT(Cf(s[1]??""),s[2]??""):M(e)}).join("")}function zT(t){const e=[];return t.replace(/<code>[\s\S]*?<\/code>/g,s=>`\0${e.push(s)-1}\0`).replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/(^|[^*])\*([^*]+)\*/g,"$1<em>$2</em>").replace(/ {2,}\n/g,"<br>").replace(/\n/g," ").replace(/ -- /g," — ").replace(/\u0000(\d+)\u0000/g,(s,a)=>e[Number(a)]??"")}function Ue(t){return zT(Cf(t))}function GT(t){const e=t.split(`
`).map(m=>m.trim()).filter(Boolean),n=e.find(m=>!m.includes(" :: ")),s=e.filter(m=>m.includes(" :: ")).map(m=>{const f=m.indexOf(" :: ");return{left:m.slice(0,f).trim(),right:m.slice(f+4).trim()}}),a=s.filter(({left:m})=>m.startsWith("=")).map(({left:m,right:f})=>({value:Number(m.slice(1)),name:f})),o=s.filter(({left:m})=>!m.startsWith("=")).map(({left:m,right:f})=>{const[p="",w]=f.split("|").map(v=>v.trim()),g=Number(p.replace(/!$/,"").trim());return{label:m,value:g,shown:w??String(g),marked:p.endsWith("!")}}),r=Math.max(0,...o.map(({value:m})=>m),...a.map(({value:m})=>m))||1,i=m=>(Math.max(0,m)/r).toFixed(3),l=a[0],h=o.map(({label:m,value:f,shown:p,marked:w})=>`<tr${w?' class="marked"':""}><th scope="row">${Ue(m)}</th><td><span class="bar" style="--p:${i(f)}"></span><span class="value">${M(p)}</span></td></tr>`).join(""),c=l?` style="--rule:${i(l.value)}"`:"",d=l?` The line is ${M(l.name)}, at ${l.value}.`:"",u=n||l?`<figcaption>${n?Ue(n)+".":""}${d}</figcaption>`:"";return`<figure class="bars"><table${c}${l?' class="ruled"':""}><tbody>${h}</tbody></table>${u}</figure>`}function jf(t){return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}const Wd=/^(?:[-*]|\d+\.)\s/;function _T(t,e,n){if(!Wd.test(t[0]??""))return!1;const s=e.slice(n).find(a=>a.trim()!=="");return s!==void 0&&Wd.test(s)}function UT(t){const e=[],n=t.replace(/\r\n?/g,`
`).split(`
`);let s=[],a=!1;return n.forEach((o,r)=>{if(o.startsWith("```")){a=!a,s.push(o),a||(e.push(s),s=[]);return}if(!a&&o.trim()===""){if(_T(s,n,r+1))return;s.length&&e.push(s),s=[];return}s.push(o)}),s.length&&e.push(s),e}function YT(t){const e=/^(#{1,4})\s+(.*)$/.exec(t[0]??"");if(!e||!t.slice(0,-1).every(o=>/ {2,}$/.test(o)))return null;const s=e[1]?.length??1,a=[e[2]??"",...t.slice(1)].join(`
`);return`<h${s} id="${jf(a)}">${Ue(a)}</h${s}>`}const Nf=/^::([a-z0-9-]+)((?:\s+--[a-z0-9-]+)*)$/;function Lf(t,e,n){const s=e.split(/\s+/).filter(Boolean).map(a=>a.slice(2));return`<div class="app" data-app="${t}"${s.length?` data-dials="${s.join(" ")}"`:""}${n===void 0?"":` data-source="${M(n)}"`}></div>`}function JT(t){if(!t[0]?.startsWith("```"))return null;const e=t[0].slice(3).trim(),n=t.slice(1,-1).join(`
`),s=Nf.exec(e);return s?Lf(s[1]??"",s[2]??"",n):e==="flow"?jT(n):e==="bars"?GT(n):e==="math"?PT(n):e==="slides"||e.startsWith("slides ")?Qm(n,e.slice(6).trim()):`<pre><code>${Me(n,e)}</code></pre>`}function KT(t,e){const n=[];for(const s of t)e.test(s)?n.push(s.replace(e,"")):n.length&&(n[n.length-1]+=`
${s.trim()}`);return n}function VT(t){const e=t[0]??"",n=/^\d+\.\s/.test(e),s=/^[-*]\s/.test(e);if(!n&&!s)return null;const a=n?/^\d+\.\s+/:/^[-*]\s+/;if(!t.every(i=>a.test(i)||/^\s/.test(i)))return null;const o=n?"ol":"ul",r=KT(t,a).map(i=>`<li>${Ue(i)}</li>`).join("");return`<${o}>${r}</${o}>`}function XT(t){return t.every(n=>n.includes(" :: "))?`<dl>${t.map(n=>{const s=n.indexOf(" :: ");return[n.slice(0,s),n.slice(s+4)]}).map(([n,s])=>`<dt>${Ue(n)}</dt><dd>${Ue(s)}</dd>`).join("")}</dl>`:null}function ZT(t){const e=s=>s.trim().replace(/^\|/,"").replace(/\|$/,"").split("|").map(a=>a.trim());if(t.length<2||!t.every(s=>s.trim().startsWith("|"))||!e(t[1]??"").every(s=>/^:?-+:?$/.test(s)))return null;const n=(s,a)=>`<tr>${e(s).map(o=>`<${a}>${Ue(o)}</${a}>`).join("")}</tr>`;return`<div class="table"><table><thead>${n(t[0]??"","th")}</thead><tbody>${t.slice(2).map(s=>n(s,"td")).join("")}</tbody></table></div>`}function QT(t){if(!t.every(n=>n.startsWith(">")))return null;const e=t.map(n=>n.replace(/^>\s?/,"")).join(" ");return`<blockquote>${Ue(e)}</blockquote>`}function eM(t){const e=Nf.exec(t[0]??"");return e&&t.length===1?Lf(e[1]??"",e[2]??""):null}function tM(t){return t.length===1&&/^-{3,}$/.test(t[0]??"")?"<hr>":null}function nM(t){const e=t.length===1&&/^(\\+)$/.exec(t[0]??"");return e?`<div class="space" style="--n:${e[1]?.length??1}"></div>`:null}function sM(t){return t.length===1&&/^!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)$/.test(t[0]??"")?`<figure>${Ue(t[0]??"")}</figure>`:null}function aM(t){return`<p>${Ue(t.join(`
`))}</p>`}const oM=[tM,nM,YT,JT,ZT,QT,eM,sM,XT,VT];function Pf(t){return UT(t).map(e=>{for(const n of oM){const s=n(e);if(s!==null)return s}return aM(e)}).join(`
`)}function ol(t){return t==="/"?"~":`~${t.replace(/\/$/,"")}`}function Ff(t){return`<ul class="listing">${t.map(n=>`<li><a class="entry" href="${n.route}"><code>${M(n.name)}${n.link?"@":"/"}</code><span class="title">${M(n.title)}</span>`+(n.summary?`<span class="summary">${M(n.summary)}</span>`:"")+"</a></li>").join("")}</ul>`}function Bf(t,e){return`<p class="ran"><span class="ps1">${M(t)} $</span> ${M(e)}</p>`}function rM(t,e){const n=t.childrenOf(e.route);return n.length===0?"":`${Bf(ol(e.route),"ls")}
${Ff(n)}`}function iM(t,e){const n=t.trailTo(e.route).slice(1).map(s=>s.name).join("/");return Bf("~",n?`cd ${n} && cat README.md`:"cat README.md")}function lM(t,e){return`${iM(t,e)}
${Pf(e.body)}
${rM(t,e)}`}const Br=t=>t.endsWith("/")?t:`${t}/`;function hM(t,e){const n=document.querySelector("main");if(!n)return()=>!1;let s=Br(window.location.pathname);const a=(o,{push:r=!0,keep:i=!1}={})=>{const l=t.at(o);if(!l)return!1;i||(n.innerHTML=lM(t,l)),s=o;const h=uT(l);for(const c of mT){const d=h[c];d?document.documentElement.setAttribute(c,d):document.documentElement.removeAttribute(c)}document.title=l.route==="/"?"David Rodenas":`${l.title} — David Rodenas`;for(const c of document.querySelectorAll("nav .navlink"))fT(o,c.getAttribute("href")??"\0")?c.setAttribute("aria-current","page"):c.removeAttribute("aria-current");return r&&(o===window.location.pathname?window.history.replaceState({route:o},"",o):window.history.pushState({route:o},"",o),i||window.scrollTo({top:0})),window.goatcounter?.count?.({path:o,title:document.title}),e(l,i),!0};return document.addEventListener("click",o=>{if(o.defaultPrevented||o.button!==0||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey)return;const r=o.target?.closest("a[href]");if(!r||r.target||r.dataset.run)return;const i=new URL(r.href,window.location.href);if(i.origin!==window.location.origin)return;const l=Br(i.pathname);!t.at(l)||i.hash&&l===s||(o.preventDefault(),l!==window.location.pathname&&a(l))}),window.addEventListener("popstate",()=>{const o=Br(window.location.pathname);o!==s&&a(o,{push:!1})}),a}function Hd(t,e,n){for(let s=1;s<=Math.min(t.length,e.length)&&t.at(-s)===e.at(-s);s+=1)if(t.at(-s)===`
`)return[t.slice(0,-s),t.slice(-s)+e.slice(0,-s),e.slice(-s)+n];return[t,e,n]}function cM(t,e){let n=0;for(;n<t.length&&n<e.length&&t[n]===e[n];)n+=1;let s=0;for(;s<t.length-n&&s<e.length-n&&t[t.length-1-s]===e[e.length-1-s];)s+=1;let a=t.slice(0,n),o=t.slice(t.length-s),r=t.slice(n,t.length-s),i=e.slice(n,e.length-s);r?i||([a,r,o]=Hd(a,r,o)):[a,i,o]=Hd(a,i,o),n=a.length;const l=[];for(let h=r.length-1;h>=0;h-=1)l.push({text:a+r.slice(0,h)+o,caret:n+h});for(let h=1;h<=i.length;h+=1)l.push({text:a+i.slice(0,h)+o,caret:n+h});return l}const dM=32,uM=14,mM=450,fM=1900,pM=900,gM=160;function wM(t){const e=[],n=t[0]?.text??"";let s=n.length>gM?n:"";for(const a of t){for(const o of cM(s,a.text))e.push({...o,hold:o.text.length<s.length?uM:dM}),s=o.text;s=a.text,a.status?e.push({text:s,hold:mM},{text:s,status:a.status,hold:fM}):e.push({text:s,hold:pM})}return e}function yM(t){return[...t.querySelectorAll(".slide:not(.live)")].map(e=>{const n=e.querySelector("code")?.textContent??"",s=e.querySelector(".slide-status"),a=["red","green","note"].find(o=>s?.classList.contains(o));return s&&a?{text:n,status:{kind:a,text:s.textContent??""}}:{text:n}})}function bM(t){const e=t.dataset.language??"",n=yM(t),s=y("code"),a=y("p",{class:"slide-status",hidden:!0}),o=y("div",{class:"slide live"},y("pre",{},s),a),r=h=>{s.innerHTML=h.caret===void 0?Me(h.text,e):`${Me(h.text.slice(0,h.caret),e)}<span class="caret"></span>${Me(h.text.slice(h.caret),e)}`,a.hidden=!h.status,h.status&&(a.className=`slide-status ${h.status.kind}`,a.textContent=h.status.text)},l=lf(t,()=>{o.isConnected||t.querySelector(".slides-screen")?.append(o),t.classList.add("playing");const h=wM(n);let c=0;return()=>{const d=h[c++];return d?(r(d),d.hold):null}});return()=>{l(),o.remove(),t.classList.remove("playing")}}function qd(t){const e=[...t.querySelectorAll("figure.slides")].map(bM);return()=>{for(const n of e)n()}}class vM{typed=[];drafts=[];index=0;get lines(){return this.typed}add(e){this.typed.push(e),this.drafts=[...this.typed,""],this.index=this.typed.length}previous(e){return this.moveTo(this.index-1,e)}next(e){return this.moveTo(this.index+1,e)}moveTo(e,n){return this.drafts.length===0&&(this.drafts=[""]),e<0||e>=this.drafts.length?n:(this.drafts[this.index]=n,this.index=e,this.drafts[e]??n)}}function kM(t,e,n,s){if(t==="k"){const a=e.slice(n);return{line:e.slice(0,n),caret:n,killed:a||s}}if(t==="u"){const a=e.slice(0,n);return{line:e.slice(n),caret:0,killed:a||s}}return t==="y"?{line:e.slice(0,n)+s+e.slice(n),caret:n+s.length,killed:s}:null}function Rf(t){return t.split(/\s*(?:;|&&)\s*/).map(e=>e.trim().split(/\s+/).filter(Boolean)).filter(e=>e.length>0)}function _t(t,e){const s=e.startsWith("~")||e.startsWith("/")?[]:t.split("/").filter(Boolean),a=e.replace(/^~/,"").split("/").filter(Boolean),o=[...s];for(const r of a)r!=="."&&(r===".."?o.pop():o.push(r));return o.length===0?"/":`/${o.join("/")}/`}function $M(t){return t.replace(/(?:^|\/)(?:README\.md|\*)$/,"")||"."}const xM={name:"cat",usage:"cat <file>",description:"print a page, README.md or * for the one here",run({site:t,cwd:e},[n]){if(!n)return{text:"cat: usage: cat <file>",error:!0};const s=_t(e,$M(n)),a=t.at(s);return!a||/\.md$/.test(n)!==/README\.md$/.test(n)?{text:`cat: ${n}: no such file`,error:!0}:{html:Pf(a.body),at:a.route}}},TM={name:"cd",usage:"cd [dir]",description:"go to a directory (the address follows)",run(t,[e="~"]){const n=_t(t.cwd,e),s=t.site.at(n);return s?(t.cwd=s.route,{at:s.route}):{text:`cd: ${e}: no such directory`,error:!0}}},MM={name:"clear",usage:"clear",description:"clear what the shell has printed",run(){return{clear:!0}}},SM={name:"find",usage:"find [path] [word]",description:"every page under a directory; with a word, those it is in the name or title of, then those that say it",run({site:t,cwd:e},n){const[s,a]=n,o=s!==void 0&&(s==="."||s.includes("/")||t.at(_t(e,s))!==void 0),r=o?s??".":".",i=(o?a:s)?.toLowerCase(),l=_t(e,r);if(!t.at(l))return{text:`find: ${r}: no such directory`,error:!0};const h=w=>t.childrenOf(w).filter(g=>!g.link).flatMap(g=>[g,...h(g.route)]),c=[t.at(l),...h(l)],d=c.filter(w=>!i||w.route.toLowerCase().includes(i)||w.title.toLowerCase().includes(i)),u=i?c.filter(w=>!d.includes(w)&&`${w.summary}
${w.body}`.toLowerCase().includes(i)):[],m=[...d.map(w=>({page:w,said:""})),...u.map(w=>({page:w,said:" — in the text"}))];if(m.length===0)return{text:`find: nothing under ${r}${i?` with "${i}" in it`:""}`};const f=Math.max(...m.map(({page:w})=>w.route.length)),p=w=>" ".repeat(f-w.route.length);return{text:m.map(({page:w,said:g})=>`${w.route}${p(w)}  # ${w.title}${g}`).join(`
`),html:`<pre class="listing">${m.map(({page:w,said:g})=>`<span class="line"><a href="${M(w.route)}">${M(w.route)}</a>${p(w)}<span class="hint">  # ${M(w.title)}${g}</span></span>`).join("")}</pre>`}}},Rr=40,AM={name:"grep",usage:"grep <word> [path]",description:"the lines of every page under a directory that say a word",run({site:t,cwd:e},[n,s="."]){if(!n)return{text:"grep: usage: grep <word> [path]",error:!0};const a=_t(e,s);if(!t.at(a))return{text:`grep: ${s}: no such directory`,error:!0};const o=n.toLowerCase(),r=t.pages.filter(c=>c.route.startsWith(a)).flatMap(c=>c.body.split(`
`).map((d,u)=>({page:c,number:u+1,line:vt(d)})).filter(({line:d})=>d.toLowerCase().includes(o)));if(r.length===0)return{text:`grep: no page under ${s} says "${n}"`};const i=r.slice(0,Rr),l=r.length>Rr?[`… and ${r.length-Rr} more. Give grep a directory to look in.`]:[],h=c=>M(c).replace(new RegExp(M(n).replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"ig"),d=>`<mark>${d}</mark>`);return{text:[...i.map(({page:c,number:d,line:u})=>`${c.route}:${d}: ${u}`),...l].join(`
`),html:`<pre class="listing wrap">${[...i.map(({page:c,number:d,line:u})=>`<span class="line"><a href="${M(c.route)}">${M(c.route)}</a>:${d}: <span class="hint">${h(u)}</span></span>`),...l.map(c=>`<span class="line">${M(c)}</span>`)].join("")}</pre>`}}},EM={name:"help",usage:"help [command]",description:"this",run({commands:t},[e]){if(e){const r=t.find(i=>i.name===e);return r?{text:`${r.usage}
  ${r.description}`}:{text:`help: ${e}: no such command`,error:!0}}const n=Math.max(...t.map(r=>r.usage.length)),s=t.map(r=>`${r.usage.padEnd(n)}  ${r.description}`),a="Tab completes; → takes the grey suggestion. ↑↓ recall. ^K kills to the end of the line, ^U back to the start, ^Y puts it back.",o=t.map(r=>`<dt><a href="#" data-run="help ${r.name}">${M(r.usage)}</a></dt><dd>${M(r.description)}</dd>`).join("");return{text:["Commands:",...s,"",a].join(`
`),html:`<p>Commands:</p><dl class="help">${o}</dl><p>${M(a)}</p>`}}};function OM(t){const e=t.filter(s=>s.startsWith("-")).flatMap(s=>s.slice(1).split("")),n=t.find(s=>!s.startsWith("-"))??".";return{flags:e,path:n}}function IM(t,e,n,s){const a=s==="."?"":`${s.replace(/\/$/,"")}/`;return[...e?[{mode:"dr-x",name:"..",title:e.title,summary:e.summary,href:e.route,run:`cd ${a}..`}]:[],{mode:"--r-",name:"README.md",title:t.title,summary:t.summary,href:t.route,run:`cat ${a}README.md`},...n.map(o=>o.link?{mode:"lr-x",name:`${o.name}@`,title:`-> ${o.route}  ${o.title}`,summary:o.summary,href:o.route}:{mode:"dr-x",name:`${o.name}/`,title:o.title,summary:o.summary,href:o.route})]}function zd(t){const e=t.run?` data-run="${M(t.run)}"`:"";return`<a href="${M(t.href)}"${e}>${M(t.name)}</a>`}function CM(t,e){const n=Math.max(...t.map(i=>i.name.length)),s=i=>" ".repeat(n-i.length),a=i=>e?`${i.mode}  ${i.name}${s(i.name)}  ${i.title}${i.summary?` — ${i.summary}`:""}`:`${i.name}${s(i.name)}  # ${i.title}`,o=i=>e?`<span class="line">${i.mode}  ${zd(i)}${s(i.name)}  ${M(i.title)}${i.summary?`<span class="hint"> — ${M(i.summary)}</span>`:""}</span>`:`<span class="line">${zd(i)}${s(i.name)}<span class="hint">  # ${M(i.title)}</span></span>`,r=e?[`total ${t.length}`]:[];return{text:[...r,...t.map(a)].join(`
`),html:`<pre class="listing">${[...r.map(i=>`<span class="line">${i}</span>`),...t.map(o)].join("")}</pre>`}}const jM={name:"ls",usage:"ls [-lnrt] [path]",description:"what a directory holds, in the site's own order; -l says more, -n sorts by name, -r reverses, -t as the table at the end of a page",run({site:t,cwd:e},n){const{flags:s,path:a}=OM(n),o=s.find(c=>!["l","n","r","t"].includes(c));if(o)return{text:`ls: -${o}: no such option. Try ls -l, -n by name, -r reversed, -t as a table`,error:!0};const r=_t(e,a),i=t.at(r);if(!i)return{text:`ls: ${a}: no such directory`,error:!0};const l=i.parent===null?void 0:t.at(i.parent),h=[...t.childrenOf(r)];if(s.includes("n")&&h.sort((c,d)=>c.name.localeCompare(d.name)),s.includes("r")&&h.reverse(),s.includes("t")){const c=Math.max(0,...h.map(u=>u.name.length+1)),d=u=>`${u.name}${u.link?"@":"/"}`.padEnd(c);return{text:h.map(u=>`${d(u)}  ${u.title}${u.summary?` — ${u.summary}`:""}`).join(`
`),html:Ff(h)}}return CM(IM(i,l,h,a),s.includes("l"))}},NM={name:"pwd",usage:"pwd",description:"print where you are",run({cwd:t}){return{text:ol(t)}}},Df=[jM,TM,xM,SM,AM,NM,EM,MM];class LM{context;constructor(e,n,s=Df){this.context={site:e,cwd:n,commands:s}}get prompt(){return`${ol(this.context.cwd)} $`}moveTo(e){return this.context.site.at(e)?(this.context.cwd=e,!0):!1}run(e){const n=[];for(const[s="",...a]of Rf(e)){const o=this.context.commands.find(i=>i.name===s),r=o?o.run(this.context,a):{text:`${s}: command not found. Try help`,error:!0};if(n.push(r),r.error)break}return n}complete(e){const n=e.split(/\s+/),s=n.pop()??"",a=n.length===0?"":`${n.join(" ")} `;return(n.length===0?this.commandNames():this.pathNames(s)).filter(r=>r.startsWith(s)).map(r=>a+r)}commandNames(){return this.context.commands.map(e=>e.name).sort()}pathNames(e){const n=e.lastIndexOf("/"),s=n<0?".":e.slice(0,n+1),a=_t(this.context.cwd,s);if(!this.context.site.at(a))return[];const o=n<0?"":s;return["README.md",...this.context.site.childrenOf(a).map(i=>`${i.name}/`)].map(i=>o+i)}}function PM(t,e,n){if(t==="")return"help";const a=[...[...e].reverse(),...n].find(o=>o.startsWith(t)&&o!==t);return a?a.slice(t.length):""}function FM(t){if(t.length===0)return null;const e=[];let n="";for(const s of t)s==="Enter"?(e.push(n),n=""):s==="Backspace"?n=n.slice(0,-1):n+=s;return{finished:e,unfinished:n}}const Dr="shell-pending",Gd={carry(t){try{t&&sessionStorage.setItem(Dr,t)}catch{}},take(){try{const t=sessionStorage.getItem(Dr)??"";return sessionStorage.removeItem(Dr),t}catch{return""}}};function BM(){window.__stopTyped?.();const t=window.__typed??[];return window.__typed=[],FM(t)}function RM(t,e,n={}){const s=document.querySelector(".terminal"),a=document.querySelector(".screen"),o=s?.querySelector("form.prompt"),r=o?.querySelector("input"),i=o?.querySelector(".line"),l=o?.querySelector(".suggest"),h=o?.querySelector(".ps1"),c=document.querySelector(".ran.end"),d=c?.querySelector(".ps1"),u=c?.querySelector(".line"),m=c?.querySelector(".typed");if(!s||!a||!o||!r||!i||!l||!h||!c||!d||!u||!m)return null;const f=()=>{h.textContent=p.prompt,d.textContent=p.prompt},p=new LM(t,e,n.commands),w=new vM;let g=null;const v=A=>{a.append(A)},b=()=>{g?.remove(),g=null},k=()=>{const A=r.selectionStart??r.value.length;i.style.setProperty("--caret",String(A)),i.style.setProperty("--typed",String(r.value.length)),m.textContent=r.value,u.style.setProperty("--caret",String(A)),l.textContent=A===r.value.length?PM(r.value,w.lines,p.complete(r.value)):""},x=(A,I=A.length)=>{r.value=A,r.setSelectionRange(I,I),k()},T=A=>{if(A.clear&&(a.replaceChildren(),n.clearPage?.()),A.html){const I=y("div",{class:A.text?"listing-out":"cat"});I.innerHTML=A.html,v(I)}else A.text&&v(y("pre",{class:A.error?"error":""},A.text))},$=A=>{b();const I=[],D=y("p",{class:"echo"},y("span",{class:"ps1"},p.prompt),` ${A}`);v(D);let C=!1;const B=Rf(A).map(W=>W.join(" "));for(let W=0;W<B.length;W+=1){n.heard?.((B[W]??"").split(" ")[0]??"");const[z]=p.run(B[W]??"");if(z){if(I.push(z),T(z),z.html&&!z.text&&(C=!0),z.at&&!n.moveTo?.(z.at))return Gd.carry(B.slice(W+1).join(" && ")),window.location.assign(z.at),I;if(z.error)break}}return f(),k(),C?D.scrollIntoView({block:"start"}):window.scrollTo({top:document.documentElement.scrollHeight}),I},O=()=>{if(b(),r.value.trim()===""){x("help");return}const A=p.complete(r.value);A.length===1?x(A[0]??r.value):A.length>1&&(g=y("p",{class:"hint"},A.map(I=>I.split(" ").pop()).join("  ")),o.insertAdjacentElement("afterend",g),window.scrollTo({top:document.documentElement.scrollHeight}))};o.addEventListener("submit",A=>{A.preventDefault();const I=r.value.trim();x(""),I&&(w.add(I),$(I))});let L="";r.addEventListener("keydown",A=>{if(A.key==="Tab")A.preventDefault(),O();else if(A.key==="ArrowUp")A.preventDefault(),x(w.previous(r.value));else if(A.key==="ArrowDown")A.preventDefault(),x(w.next(r.value));else if(A.key==="ArrowRight"&&r.selectionStart===r.value.length&&l.textContent)A.preventDefault(),x(r.value+l.textContent);else if(A.ctrlKey&&!A.metaKey&&!A.altKey){const I=kM(A.key,r.value,r.selectionStart??r.value.length,L);if(!I)return;A.preventDefault(),b(),x(I.line,I.caret),L=I.killed}else b()});for(const A of["input","keyup","click","focus","select"])r.addEventListener(A,k);let F=!0;r.addEventListener("input",()=>{F&&r.value!==""&&window.scrollTo({top:document.documentElement.scrollHeight}),F=r.value===""}),document.addEventListener("selectionchange",()=>{document.activeElement===r&&k()}),a.addEventListener("click",A=>{const I=A.target?.closest("a[data-run]");I?.dataset.run&&(A.preventDefault(),$(I.dataset.run))}),window.addEventListener("keydown",A=>{const D=A.target?.matches("input, textarea, select, [contenteditable]")??!1,C=A.key.length===1&&!A.ctrlKey&&!A.metaKey&&!A.altKey;D||!C||r.focus({preventScroll:!1})}),o.addEventListener("click",()=>r.focus()),c.addEventListener("click",()=>r.focus()),k();const N=Gd.take();N&&$(N);const j=BM();if(j){for(const A of j.finished)A.trim()&&(w.add(A.trim()),$(A.trim()));x(j.unfinished),r.focus()}return{run:$,moveTo:A=>{p.moveTo(A)&&(a.replaceChildren(),f(),k())}}}function ja(t,e,n){if("refused"in t)return{summary:`Refused, nothing was run: ${t.refused}`,refused:!0};const{summary:s,data:a,route:o,source:r,refreshed:i}=t;return{summary:s,...a!==void 0&&{data:a},...o!==void 0&&{url:`${e}${o}`},...r!==void 0&&{source:r},...i!==void 0&&{refreshed:i},...n!==void 0&&{shown:n}}}const DM="Answers as JSON: summary, in words; data, the figures, each with its unit in its name; url, the page it is about; source and refreshed, for figures someone else publishes.",WM={type:"boolean",default:!0,description:"true puts it in front of the reader: the site goes to the page that has it, and what is there moves to what was asked. false answers and leaves the reader's page as it is."};function HM(t){const e=t.shows?" Unless told show: false, the reader is shown it too; the answer's shown says whether they were.":"",n=t.shows?{...t.inputSchema,properties:{...t.inputSchema.properties,show:WM}}:t.inputSchema;return{name:t.name,description:`${t.description} ${DM}${e}`,inputSchema:n,annotations:{readOnlyHint:t.readOnly}}}const qM={amp:"&",lt:"<",gt:">",quot:'"',"#39":"'",nbsp:" "};function zM(t){return t.text?t.text:t.html?t.html.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g,"").replace(/<\/(p|h[1-6]|li|tr|div|pre|dt|dd|figcaption|blockquote)>|<br\s*\/?>/g,`
`).replace(/<[^>]+>/g,"").replace(/&(amp|lt|gt|quot|#39|nbsp);/g,(e,n)=>qM[n]??"").split(`
`).map(e=>e.replace(/\s+/g," ").trim()).filter(Boolean).join(`
`):""}function GM(t,e,n){const s=`.app[data-app="${t}"]`,a=document.querySelector(s);return a||(e===void 0||!n(e)?null:document.querySelector(s))}function _M({show:t,route:e},{goTo:n}){if(!t)return!1;const s=GM(t.app,e,n);return s?(li(s,t.values),s.scrollIntoView?.({behavior:"smooth",block:"start"}),!0):!1}function UM(t,e){const n=s=>JSON.stringify(s);return{...HM(t),async execute(s){if(!t.shows)return n(ja(await t.answer(s,e),e.origin));const{show:a=!0,...o}=s;if(typeof a!="boolean")return n(ja({refused:`show: ${String(a)} is not true or false`},e.origin));const r=await t.answer(o,e);return n(ja(r,e.origin,!("refused"in r)&&a&&_M(r,e)))}}}function YM({run:t,origin:e}){return{name:"shell",description:"Runs a line at this site's prompt, as if the reader had typed it, and they see it echoed and answered. The site is laid out as directories of pages: ls, cd, cat README.md, find, grep and help work over it, and every program is a command too. Commands chain with &&. To read or search without the reader seeing it, read and search do. Answers as JSON: summary, what the line printed.",inputSchema:{type:"object",properties:{line:{type:"string",description:"the line to run, e.g. `cd projects && ls`"}},required:["line"],additionalProperties:!1},async execute(n){const s=t(String(n.line??"")),a=s.map(zM).filter(Boolean).join(`

`);return JSON.stringify(ja(s.some(o=>o.error)?{refused:a}:{summary:a},e,!0))}}}function JM(t,e){if(!t)return()=>{};const n=new AbortController,s=[...e.tools.map(a=>UM(a,e)),YM(e)];for(const a of s)t.registerTool(a,{signal:n.signal});return()=>{n.abort();for(const a of s)t.unregisterTool?.(a.name)}}function KM(t,e){return t.flatMap(n=>Object.entries(n.benches??{})).find(([n])=>e(n))?.[1]}const Wr=6,_d=t=>t===!0||t==="yes"||t==="true"||t==="on"||t===1;function VM(t){const{rows:e,columns:n}=t,s=n.slice(0,Wr).map(o=>o.name).join(", "),a=n.length>Wr?` +${n.length-Wr}`:"";return`${e.length} ${e.length===1?"row":"rows"} · ${s}${a}`}const XM=[{name:"number",label:"a number",colour:"--bp-number",describe:t=>te(Number(t))},{name:"text",label:"some words",colour:"--bp-text",describe:t=>`“${String(t)}”`},{name:"flag",label:"yes or no",colour:"--bp-flag",describe:t=>_d(t)?"yes":"no"},{name:"table",label:"a table",colour:"--bp-table",describe:VM},{name:"value",label:"a dial's value",colour:"--bp-value",describe:t=>typeof t=="number"?te(t):String(t),becomes:{number:t=>Number(t),text:t=>String(t),flag:_d}}];function Ud(t,e){const n=new Map;for(const s of t){if(n.has(s.name))throw new Error(`two ${e} are called ${s.name}`);n.set(s.name,s)}return n}function ZM(t,e){return{kinds:Ud(t,"kinds of node"),types:Ud(e,"kinds of wire")}}const Wf=t=>t.length<2?t.join(""):`${t.slice(0,-1).join(", ")} or ${t.at(-1)}`;function QM(t,e){if("choices"in t){if(e===void 0)return{value:t.initial};const s=bn(String(e)),a=t.choices.find(o=>bn(o)===s);return a===void 0?{error:`${t.name}: ${String(e)} is not one of ${Wf(t.choices.map(bn))}`}:{value:a}}const n=e===void 0?t.initial:typeof e=="number"?e:typeof e=="string"&&e.trim()!==""?Number(e):Number.NaN;return Number.isFinite(n)?n<t.min||n>t.max?{error:`${t.name}: ${n} is outside ${t.min} to ${t.max}`}:{value:n}:{error:`${t.name}: ${String(e)} is not a number`}}function rl(t,e){const n=t.parameters.map(o=>o.name),s=Object.keys(e).find(o=>!n.includes(o));if(s!==void 0)return{error:`no option ${s}: choose ${Wf(n)}`};const a={};for(const o of t.parameters){const r=QM(o,e[o.name]);if("error"in r)return r;a[o.name]=r.value}return{values:a}}const mt=t=>t.join("-").replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().replace(/[^a-z0-9-]+/g,"-"),Yd=(t,e)=>e.reduce((n,s)=>n&&typeof n=="object"?n[s]:void 0,t);function eS(t){const e=t[0]??{},n=Object.entries(e).flatMap(([a,o])=>typeof o=="number"?[{name:a,kind:"number"}]:typeof o=="string"?[{name:a,kind:"text"}]:[]),s=t.map(a=>Object.fromEntries(n.map(o=>[o.name,a[o.name]??null])));return{columns:n,rows:s}}function Hf(t,e=[]){return typeof t=="number"?[{pin:{name:mt(e),label:mt(e).replace(/-/g," "),type:"number"},path:e}]:typeof t=="boolean"?[{pin:{name:mt(e),label:mt(e).replace(/-/g," "),type:"flag"},path:e}]:typeof t=="string"?[{pin:{name:mt(e),label:mt(e).replace(/-/g," "),type:"text"},path:e}]:Array.isArray(t)?t.length>0&&typeof t[0]=="object"?[{pin:{name:mt(e),label:mt(e).replace(/-/g," "),type:"table"},path:e}]:[]:t&&typeof t=="object"?Object.entries(t).flatMap(([n,s])=>Hf(s,[...e,n])):[]}const tS=t=>`${t.charAt(0).toUpperCase()}${t.slice(1).replace(/-/g," ")}`;function nS(t){const e=Hf(t.run(Qi(t)).data);return{name:t.name,title:tS(t.name),role:"paint",shelf:"Programs",summary:`${t.summary.charAt(0).toUpperCase()}${t.summary.slice(1)}: the program of its page, as a node.`,inputs:t.parameters.map(n=>"choices"in n?{name:n.name,label:n.label.toLowerCase(),type:"text",initial:n.initial,hint:n.description,editor:{kind:"choice",choices:n.choices.map(s=>({value:s,label:s}))}}:{name:n.name,label:n.label.toLowerCase(),type:"number",initial:n.initial,hint:n.description,editor:{kind:"number",min:n.min,max:n.max,step:n.step,...n.show&&{show:n.show}}}),outputs:e.map(n=>n.pin),run:n=>{const s=rl(t,n);if("error"in s)throw new Error(s.error);const a=t.run(s.values);return{outputs:Object.fromEntries(e.map(({pin:r,path:i})=>[r.name,r.type==="table"?eS(Yd(a.data,i)??[]):Yd(a.data,i)??void 0])),painting:{html:a.html,caption:a.text.split(`
`)[0]??""}}}}}function qf(t){const e=t.flatMap(n=>n.programs??[]).map(nS);return ZM([...xm,...t.flatMap(n=>n.nodes??[]),...e],[...XM,...t.flatMap(n=>n.pinTypes??[])])}const sS=/^##\s+(.*)$/,Jd=/^#(?!#)\s?(.*)$/;function aS(t){const e=[{title:"",lines:[]}];for(const n of t.split(`
`)){const s=sS.exec(n.trim());s?e.push({title:s[1]?.trim()??"",lines:[]}):e.at(-1)?.lines.push(n)}return e.flatMap(({title:n,lines:s})=>{const a=s.findIndex(i=>i.trim()&&!Jd.test(i.trim()));if(!n&&a===-1)return[];const r=(a===-1?s:s.slice(0,a)).map(i=>Jd.exec(i.trim())?.[1]?.trim()).filter(Boolean).join(" ");return[{title:n,slug:jf(n),about:r,text:a===-1?"":s.slice(a).join(`
`).trim()}]})}function oS(t){let e=2166136261;for(let n=0;n<t.length;n+=1)e^=t.charCodeAt(n),e=Math.imul(e,16777619)>>>0;return e.toString(36)}function rS(t){const e=new TextEncoder().encode(t);let n="";for(const s of e)n+=String.fromCharCode(s);return btoa(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function iS(t){try{const e=atob(t.replace(/-/g,"+").replace(/_/g,"/"));return new TextDecoder("utf-8",{fatal:!0}).decode(Uint8Array.from(e,n=>n.charCodeAt(0)))}catch{return null}}class lS{constructor(e){this.fetchText=e}fetchText;held=new Map;listeners=new Set;read=e=>{const n=this.held.get(e);if(n?.state==="here")return n.text;throw n?.state==="missing"?new Error(`there is no ${e}`):(n||(this.held.set(e,{state:"coming"}),this.fetchText(e).then(s=>this.settle(e,{state:"here",text:s}),()=>this.settle(e,{state:"missing"}))),new ro(e))};listen(e){return this.listeners.add(e),()=>this.listeners.delete(e)}settle(e,n){this.held.set(e,n);for(const s of this.listeners)s()}}const Hr="blueprint:";class hS{constructor(e){this.storage=e}storage;get(e){try{return this.storage()?.getItem(Hr+e)??null}catch{return null}}set(e,n){try{this.storage()?.setItem(Hr+e,n)}catch{}}forget(e){try{this.storage()?.removeItem(Hr+e)}catch{}}}function cS(t,e,n){const s=new Map;let a=t;for(const i of t.nodes.filter(l=>e.includes(l.id))){const l=xs(a,i.kind);s.set(i.id,l);const h={...i,id:l,x:i.x+n,y:i.y+n};a={...a,nodes:[...a.nodes,h]}}const r=t.wires.filter(({from:i,to:l})=>s.has(i.node)&&s.has(l.node)).map(({from:i,to:l})=>({from:{...i,node:s.get(i.node)??i.node},to:{...l,node:s.get(l.node)??l.node}}));return{blueprint:{...a,wires:[...a.wires,...r]},ids:[...s.values()]}}function Kd(t,e,n,s){const a=new Set(e);return{...t,nodes:t.nodes.map(o=>a.has(o.id)?{...o,x:o.x+n,y:o.y+s}:o)}}const dS=60,ft=t=>Math.round(t*10)/10;function qr(t,e){const n=Math.max(dS,Math.abs(e.x-t.x)/2);return`M${ft(t.x)} ${ft(t.y)} C${ft(t.x+n)} ${ft(t.y)} ${ft(e.x-n)} ${ft(e.y)} ${ft(e.x)} ${ft(e.y)}`}function uS(t,e,n){const s=new Set,a=[e];for(let o=a.pop();o!==void 0;o=a.pop()){if(o===n)return!0;if(!s.has(o)){s.add(o);for(const r of t.wires)r.to.node===o&&a.push(r.from.node)}}return!1}function zr(t,e,n){if(n.from.node===n.to.node)return"a node cannot feed itself";const s=i=>e.kinds.get(t.nodes.find(l=>l.id===i)?.kind??"");if(s(n.to.node)?.role==="dial")return"a dial is turned by hand, and takes no wire";const a=s(n.from.node)?.outputs.find(i=>i.name===n.from.pin),o=s(n.to.node)?.inputs.find(i=>i.name===n.to.pin);if(!a||!o)return"there is no such pin";const r=i=>e.types.get(i)?.label??i;return Ga(e,a.type,o.type)?uS(t,n.from.node,n.to.node)?`that would make a circle: ${n.from.node} needs ${n.to.node} already`:null:`${r(a.type)} cannot go into ${o.label}, which takes ${r(o.type)}`}function Ta(t,e,n){const s=a=>n==="input"?a.to:a.from;return{...t,wires:t.wires.filter(a=>s(a).node!==e.node||s(a).pin!==e.pin)}}function mS(t,e){if(t.nodes.length===0)return null;const n=Math.min(...t.nodes.map(i=>i.x)),s=Math.min(...t.nodes.map(i=>i.y)),a=t.nodes.map(i=>fe(e.kinds.get(i.kind))),o=Math.max(...t.nodes.map((i,l)=>i.x+(a[l]?.width??0))),r=Math.max(...t.nodes.map((i,l)=>i.y+(a[l]?.height??0)));return{x:n,y:s,width:o-n,height:r-s}}const Vd=.25,fS=2;class pS{constructor(e=0,n=0,s=1){this.x=e,this.y=n,this.zoom=s}x;y;zoom;toWorld(e,n){return{x:(e-this.x)/this.zoom,y:(n-this.y)/this.zoom}}zoomAt(e,n,s){const a=Math.min(fS,Math.max(Vd,this.zoom*s)),o=this.toWorld(e,n);this.zoom=a,this.x=e-o.x*a,this.y=n-o.y*a}fit(e,n,s=32){e.width<=0||n.width<=0||n.height<=0||(this.zoom=Math.min(1,Math.max(Vd,Math.min((n.width-s*2)/e.width,(n.height-s*2)/e.height))),this.x=(n.width-e.width*this.zoom)/2-e.x*this.zoom,this.y=(n.height-e.height*this.zoom)/2-e.y*this.zoom)}}function Xd(t,e,n,s=14){let a=null,o=s;for(const r of t.nodes){const i=fe(e.kinds.get(r.kind));for(const[l,h]of[["input",i.inputs],["output",i.outputs]])for(const[c,d]of h){const u=Math.hypot(r.x+d.x-n.x,r.y+d.y-n.y);u<=o&&(o=u,a={node:r.id,pin:c,side:l})}}return a}const gS=new Set(["number","text","flag"]);class wS{constructor(e,n,s){this.kit=e,this.id=n,this.hands=s,this.title=y("span",{class:"wb-title"}),this.kindSaid=y("span",{class:"wb-kind"}),this.foot=y("footer",{class:"wb-foot"}),this.element=y("div",{class:"wb-node","data-node":n}),this.title.addEventListener("dblclick",()=>this.renaming())}kit;id;hands;element;title;kindSaid;foot;rows=new Map;outs=new Map;kind="";show({node:e,result:n,wiredIn:s,wiredOut:a,editors:o,selected:r,foot:i}){const l=this.kit.kinds.get(e.kind);this.kind!==e.kind&&this.build(e);const h=fe(l),c=i!==void 0&&(n===void 0||n.state==="done")?{said:i,trouble:!1}:Gt(n,e.kind);this.element.className=["wb-node",`wb-role-${l?.role??"unknown"}`,r?"selected":"",c.trouble?"trouble":"",n?.state==="waiting"?"waiting":""].filter(Boolean).join(" "),this.element.style.left=`${e.x}px`,this.element.style.top=`${e.y}px`,this.element.style.width=`${h.width}px`,this.element.style.height=`${h.height}px`,this.title.getAttribute("contenteditable")!=="true"&&(this.title.textContent=e.title??l?.title??e.kind),this.kindSaid.textContent=e.title!==void 0&&l&&e.title!==l.title?l.title:"",this.foot.textContent=c.said,this.foot.title=c.said;for(const[u,m]of this.outs)m.classList.toggle("open",!a.has(u));const d=n?.state==="done"?n.settled:{};for(const u of l?.inputs??[]){const m=this.rows.get(u.name);if(!m)continue;const f=s.has(u.name);m.pin.classList.toggle("open",!f),m.row.classList.toggle("wired",f);const p=o.get(u.name);if(f||!p){m.edit.replaceChildren(),m.control=null,m.signature="";continue}this.showControl(e,u,m,p,d[u.name])}}build(e){const n=this.kit.kinds.get(e.kind);this.kind=e.kind,this.rows.clear(),this.outs.clear();const s=h=>`var(${this.kit.types.get(h)?.colour??"--dim"})`,a=(n?.outputs??[]).map(h=>{const c=y("span",{class:"wb-pin open","data-pin":h.name,"data-side":"output",style:`--pin: ${s(h.type)}`,title:`${h.label}: ${this.kit.types.get(h.type)?.label??h.type}`});this.outs.set(h.name,c);const d=y("button",{type:"button",class:"wb-label wb-peek",title:`Look at what it gives: ${this.kit.types.get(h.type)?.label??h.type}`},h.label);return d.addEventListener("click",()=>this.hands.peek(this.id,h.name,d)),y("div",{class:"wb-row wb-out"},d,c)}),o=fe(n),r=(n?.inputs??[]).map(h=>{const c=y("span",{class:"wb-pin open","data-pin":h.name,"data-side":"input",style:`--pin: ${s(h.type)}`,title:`${h.label}: ${this.kit.types.get(h.type)?.label??h.type}${h.hint?` — ${h.hint}`:""}`}),d=y("span",{class:"wb-edit"}),u=y("div",{class:"wb-row wb-in",style:`height: calc(var(--bp-row) * ${o.rows.get(h.name)??1})`},c,h.label?y("span",{class:"wb-label"},h.label):null,d);return this.rows.set(h.name,{row:u,pin:c,edit:d,signature:"",control:null}),u}),i=y("button",{type:"button",class:"wb-rename",title:"Give it a name of its own (or double-click its title)","aria-label":"Rename the node"},"✎");i.addEventListener("click",()=>this.renaming());const l=y("header",{class:"wb-head",title:n?.summary??`There is no kind of node called ${e.kind}.`},y("span",{class:"wb-glyph","aria-hidden":"true"}),this.title,this.kindSaid,i);this.element.replaceChildren(l,...a,...r,this.foot)}showControl(e,n,s,a,o){const r=JSON.stringify([a,o??null]),i=a.kind==="choice"||a.kind==="flag",l=e.values[n.name]??(i?n.initial:void 0);if(s.control&&s.signature===r){s.control.show(l);return}if(s.control&&s.edit.contains(s.edit.ownerDocument.activeElement))return;const h=o??n.initial,c=Ui(a,l,{style:"inline",optional:n.optional===!0||!i&&n.initial!==void 0,...h!==void 0&&{settled:String(h)},label:n.label||n.name,changed:(u,m)=>this.hands.write(this.id,n.name,u,m)}),d=gS.has(n.type)&&this.kit.kinds.get(e.kind)?.role!=="dial"&&this.kit.kinds.get(e.kind)?.role!=="note"?y("button",{type:"button",class:"wb-promote",title:"Put it on the board, as a dial","aria-label":`Put ${n.label||n.name} on the board as a dial`},"◉"):null;d?.addEventListener("click",()=>this.hands.promote(this.id,n.name)),s.edit.replaceChildren(c.element,...d?[d]:[]),s.control=c,s.signature=r}renaming(){const e=this.title.textContent??"";this.title.setAttribute("contenteditable","true"),this.title.focus();const n=o=>{this.title.removeAttribute("contenteditable"),this.title.removeEventListener("blur",s),this.title.removeEventListener("keydown",a),o&&this.title.textContent!==e?this.hands.rename(this.id,this.title.textContent??""):this.title.textContent=e},s=()=>n(!0),a=o=>{o.key==="Enter"?(o.preventDefault(),n(!0)):o.key==="Escape"&&n(!1),o.stopPropagation()};this.title.addEventListener("blur",s),this.title.addEventListener("keydown",a)}}function yS(t){const e=(o,r)=>y("li",{},y("strong",{},o),` ${r}`),n=y("button",{type:"button",class:"wb-help-close","aria-label":"Close"},"✕"),s=y("div",{class:"wb-help",role:"dialog","aria-label":"How to use it"},n,y("ul",{},e("Choose a node","and what could come next is offered under the canvas: a click adds it, wired and written."),e("Press an output's name","to look at what it gives: a table's first rows, and what its columns are."),e("Drag from a pin","to wire it: let go on another pin, or in empty space to choose what comes next."),e("Double-click, or the space bar,","to add any node."),e("Drag a node by its title","to move it, and the canvas to move about; Ctrl and the wheel zoom; F fits it all."),e("Shift and drag","chooses several; Delete takes them away, Ctrl+D copies them, Ctrl+Z undoes."),e("Alt and a click on a pin","lets go of its wires; so does dragging a wire off its input into empty space."),e("◉ beside a value","puts it on the board as a dial; ▶ on a dial plays it."),e("Double-click a title","to rename the node; a picture's title on the board finds its node."))),a=()=>s.remove();return n.addEventListener("click",a),t.append(s),a}function bS(t,e,n,s){const a=y("button",{type:"button",class:"wb-help-close","aria-label":"Close"},"✕"),o=y("div",{class:"wb-peek-body"});o.innerHTML=n;const r=y("div",{class:"wb-peek-panel",role:"dialog","aria-label":e},a,y("p",{class:"wb-peek-title"},e),o),i=t.getBoundingClientRect(),l=s.getBoundingClientRect();r.style.left=`${Math.round(Math.max(4,Math.min(l.right-i.left+10,i.width-400)))}px`,r.style.top=`${Math.round(Math.max(4,Math.min(l.top-i.top-10,i.height-240)))}px`;const h=t.ownerDocument,c=()=>{r.remove(),h.removeEventListener("pointerdown",d,!0),h.removeEventListener("keydown",u,!0)},d=m=>{r.contains(m.target)||c()},u=m=>{m.key==="Escape"&&(m.stopPropagation(),c())};return a.addEventListener("click",c),r.addEventListener("wheel",m=>m.stopPropagation()),t.append(r),h.addEventListener("pointerdown",d,!0),h.addEventListener("keydown",u,!0),c}const Gr="http://www.w3.org/2000/svg",_r={narrow:280,side:580},Zd={fine:"Drag a pin to wire it; drop a wire in empty space to add what comes next. Double-click the canvas to add a node.",touch:"Open it full screen to work on it with your fingers."};class vS{constructor(e){this.setting=e,this.work=new Im(e,()=>this.drawn()),this.wires=document.createElementNS(Gr,"svg"),this.wires.classList.add("wb-wires"),this.nodes=y("div",{class:"wb-nodes"}),this.world=y("div",{class:"wb-world"},this.wires,this.nodes),this.marquee=y("div",{class:"wb-marquee",hidden:!0}),this.next=y("div",{class:"wb-next",role:"toolbar","aria-label":"What could come next"}),this.canvas=y("div",{class:"wb-canvas",tabindex:0,role:"application","aria-label":"The blueprint's canvas: its nodes and wires"},this.world,this.marquee,this.next,y("p",{class:"wb-blank"},"An empty blueprint. Double-click here, or press the space bar, to add a node.")),this.status=y("p",{class:"wb-status","aria-live":"polite"}),this.about=y("p",{class:"bp-about wb-about"}),this.board=new um({turn:(o,r,i)=>this.write(o,"value",r,i),find:o=>this.find(o),point:o=>this.point(o),rename:(o,r)=>this.edit(ni(this.work.now,o,r))});const n=(o,r,i,l="")=>{const h=y("button",{type:"button",title:r,"aria-label":r,class:l},o);return h.addEventListener("click",i),h};this.buttons={undo:n("Undo","Undo (Ctrl+Z)",()=>this.step("undo")),redo:n("Redo","Redo (Ctrl+Shift+Z)",()=>this.step("redo")),reset:n("Reset","Go back to the blueprint as the page wrote it",()=>this.reset()),full:n("Full screen","Work on it full screen (Esc to come back)",()=>this.toggleFull(),"wb-full-button")};const s=e.examples.length>1?[n("Examples","Open another of the page's blueprints here",()=>this.toggleExamples(),"wb-examples-button")]:[],a=y("div",{class:"wb-bar",role:"toolbar","aria-label":"Blueprint"},...s,n("＋ Node","Add a node (space bar)",()=>this.openMenu(null,void 0),"wb-add"),this.buttons.undo,this.buttons.redo,n("Tidy","Lay the nodes out again, as the data flows",()=>this.tidy()),n("Fit","Bring the whole blueprint into view (F)",()=>this.fit()),n("Text","The blueprint as text, to read, copy or write",()=>this.openText()),n("Link","Copy a link to the blueprint as it is now",()=>{this.share()}),this.buttons.reset,n("?","How to use it",()=>this.toggleHelp(),"wb-help-button"),this.buttons.full);this.element=y("div",{class:"workbench"},a,this.about,y("div",{class:"wb-main"},y("div",{class:"wb-stage"},this.canvas,this.status),this.board.element));for(const[o,r]of Object.entries(re))this.element.style.setProperty(`--bp-${o}`,`${r}px`);this.listen(),this.work.still&&this.board.showStill(this.work.still),this.tellAbout(),this.render()}setting;element;work;preview=null;selection=new Set;chosenWire=null;gesture=null;camera=new pS;canvas;world;wires;nodes;marquee;next;nextShown="";status;about;board;views=new Map;buttons;closeMenu=null;closePeek=null;pinches=new Map;seen=null;open(e){e!==this.work.example&&(this.closeMenu?.(),this.element.querySelector(".wb-examples")?.remove(),this.preview=null,this.selection.clear(),this.work.open(e),this.tellAbout(),this.fit(),this.say())}tellAbout(){const{title:e,about:n}=this.work.example;this.about.hidden=!e,this.about.title=n,this.about.replaceChildren(y("strong",{},e),n?` ${n}`:"")}ask(e){this.preview=null,this.work.ask(e),this.fit(),this.say()}wake(){this.work.wake()}get blueprint(){return this.preview??this.work.now}placed(){this.fit()}stop(){this.work.stop(),this.closeMenu?.(),this.closePeek?.(),document.body.classList.remove("wb-full-open")}edit(e,n){this.preview=null,this.work.edit(e,n)}drawn(){const e=new Set(this.work.now.nodes.map(n=>n.id));this.selection=new Set([...this.selection].filter(n=>e.has(n))),this.render()}step(e){this.preview=null,e==="undo"?this.work.undo():this.work.redo()}reset(){this.work.reset(),this.fit()}render(){const e=this.blueprint,{kit:n}=this.setting,s=new Map(this.work.dials().map(o=>[o.node,o])),a=new Set;for(const o of e.nodes){a.add(o.id);let r=this.views.get(o.id);r||(r=new wS(n,o.id,{write:(l,h,c,d)=>this.write(l,h,c,d),promote:(l,h)=>this.promote(l,h),rename:(l,h)=>this.edit(ni(this.work.now,l,h)),peek:(l,h,c)=>this.peek(l,h,c)}),this.views.set(o.id,r),this.nodes.append(r.element));const i=s.get(o.id);r.show({node:o,result:this.work.evaluation.get(o.id),wiredIn:this.wiredInto(o.id),wiredOut:this.wiredOutOf(o.id),editors:i?new Map([["value",i.editor]]):this.work.editorsOf(o),selected:this.selection.has(o.id),...i&&{foot:`on the board: ${i.said}`}})}for(const[o,r]of this.views)a.has(o)||(r.element.remove(),this.views.delete(o));this.drawWires(),this.gesture||this.offerNext(),(this.work.ran||!this.work.still)&&this.board.show(this.work.dials(),this.work.cards()),this.canvas.classList.toggle("blank",e.nodes.length===0),this.buttons.undo.disabled=!this.work.canUndo,this.buttons.redo.disabled=!this.work.canRedo,this.buttons.reset.disabled=!this.work.own,this.gesture||this.say()}wiredInto(e){return new Set(this.blueprint.wires.filter(n=>n.to.node===e).map(n=>n.to.pin))}wiredOutOf(e){return new Set(this.blueprint.wires.filter(n=>n.from.node===e).map(n=>n.from.pin))}drawWires(){const{kit:e}=this.setting,n=this.blueprint,s=new Map(n.nodes.map(l=>[l.id,l])),a=(l,h,c)=>{const d=s.get(l),u=d&&fe(e.kinds.get(d.kind))[c].get(h);return d&&u?{x:d.x+u.x,y:d.y+u.y}:null},o=(l,h)=>e.kinds.get(s.get(l)?.kind??"")?.outputs.find(c=>c.name===h)?.type??"value",r=[];for(const l of n.wires){const[h,c]=[a(l.from.node,l.from.pin,"outputs"),a(l.to.node,l.to.pin,"inputs")];if(!h||!c)continue;const d=qr(h,c),u=this.chosenWire?.to.node===l.to.node&&this.chosenWire.to.pin===l.to.pin,m=this.work.evaluation.get(l.from.node)?.state!=="done";r.push(this.path(d,`wb-wire${u?" chosen":""}${m?" idle":""}`,e.types.get(o(l.from.node,l.from.pin))?.colour));const f=this.path(d,"wb-wire-hit");f.dataset.to=`${l.to.node}\0${l.to.pin}`;const p=this.carried(l);p&&f.append(Object.assign(document.createElementNS(Gr,"title"),{textContent:p})),r.push(f)}const i=this.gesture;if(i?.kind==="wire"){const l=a(i.end.node,i.end.pin,i.end.side==="output"?"outputs":"inputs");l&&r.push(this.path(i.end.side==="output"?qr(l,i.at):qr(i.at,l),"wb-wire dragging",e.types.get(i.type)?.colour))}this.wires.replaceChildren(...r)}offerNext(){const[e]=this.selection.size===1?[...this.selection]:[],n=e?this.work.nextFor(e):[],s=`${e}\0${n.map(a=>a.label).join("\0")}`;this.next.hidden=n.length===0,s!==this.nextShown&&(this.nextShown=s,this.next.replaceChildren(y("span",{class:"wb-next-said"},"Next:"),...n.map(a=>{const o=y("button",{type:"button",title:`Add it, wired from what is chosen: ${this.setting.kit.kinds.get(a.kind)?.title??a.kind}`},a.label);return o.addEventListener("click",()=>e&&this.follow(e,a.label)),o})))}follow(e,n){const{kit:s}=this.setting,a=this.work.now.nodes.find(l=>l.id===e),o=this.work.nextFor(e).find(l=>l.label===n);if(!a||!o)return;const r=fe(s.kinds.get(o.kind)),i=this.work.follow(e,o,this.freeSpot({x:a.x+fe(s.kinds.get(a.kind)).width+80,y:a.y},r.width,r.height));this.selection=new Set([i]),this.render(),this.reveal([i]),this.work.notice=`${o.label}: added, wired from what was chosen. What could come after it is offered in turn.`,this.say()}carried(e){const{kit:n}=this.setting,s=this.work.evaluation.get(e.from.node);if(s?.state!=="done"||!(e.from.pin in s.outputs))return null;const a=h=>n.kinds.get(this.blueprint.nodes.find(c=>c.id===h)?.kind??""),o=a(e.from.node)?.outputs.find(h=>h.name===e.from.pin)?.type??"value",r=a(e.to.node)?.inputs.find(h=>h.name===e.to.pin)?.type,i=n.types.get(o),l=r&&r!==o?`, read here as ${n.types.get(r)?.label??r}`:"";return`${i?.label??o}: ${i?i.describe(s.outputs[e.from.pin]):""}${l}`}peek(e,n,s){const{kit:a}=this.setting,o=this.work.now.nodes.find(h=>h.id===e),r=a.kinds.get(o?.kind??"")?.outputs.find(h=>h.name===n);if(!o||!r)return;const i=this.work.evaluation.get(e),l=i?.state==="done"&&n in i.outputs?Cm(i.outputs[n],r.type,a).html:P("p",{},Gt(i,o.kind).said||"It has not run yet.").html;this.closePeek?.(),this.closePeek=bS(this.canvas,`${o.title??a.kinds.get(o.kind)?.title??o.kind} gives ${r.label}`,l,s)}path(e,n,s){const a=document.createElementNS(Gr,"path");return a.setAttribute("d",e),a.setAttribute("class",n),s&&a.style.setProperty("--pin",`var(${s})`),a}applyCamera(){const{x:e,y:n,zoom:s}=this.camera;this.world.style.transform=`translate(${e}px, ${n}px) scale(${s})`,this.canvas.style.setProperty("--wb-x",`${e}px`),this.canvas.style.setProperty("--wb-y",`${n}px`),this.canvas.style.setProperty("--wb-zoom",String(s))}fit(){const e=mS(this.work.now,this.setting.kit),n=this.canvas.getBoundingClientRect();e&&this.camera.fit(e,{width:n.width,height:n.height}),this.applyCamera()}say(e){this.status.textContent=e??(this.work.notice||(this.touching()&&!this.full()?Zd.touch:Zd.fine))}write(e,n,s,a){const o=Ki(this.work.now,e,n,s);this.edit(o,a?void 0:`${e}\0${n}`)}promote(e,n){const{kit:s}=this.setting,a=this.work.now.nodes.find(c=>c.id===e),o=a&&s.kinds.get(a.kind),r=o?.inputs.find(c=>c.name===n);if(!a||!r)return;const i=fe(o).inputs.get(n)?.y??0,l={x:a.x-re.dial-48,y:a.y+i-(re.header+re.row/2)},h=this.work.promote(e,n,this.freeSpot(l,re.dial,fe(s.kinds.get("dial")).height));h!==null&&(this.selection=new Set([h]),this.render(),this.reveal([h,e]),this.say(`${r.label||n} is on the board now, as a dial — and on the canvas, beside the node it turns.`))}tidy(){this.edit(oi(this.work.now,this.setting.kit)),this.fit()}remove(){this.selection.size>0?this.edit(cm(this.work.now,[...this.selection])):this.chosenWire&&(this.edit(Ta(this.work.now,this.chosenWire.to,"input")),this.chosenWire=null)}duplicate(){if(this.selection.size===0)return;const{blueprint:e,ids:n}=cS(this.work.now,[...this.selection],30);this.selection=new Set(n),this.edit(e)}point(e){for(const[o,r]of this.views)r.element.classList.toggle("pointed",o===e);const n=e?this.work.now.nodes.find(o=>o.id===e):void 0,s=n&&this.setting.kit.kinds.get(n.kind);if(!n||!s)return this.say();const a=this.work.now.wires.filter(o=>o.from.node===n.id).map(o=>{const r=this.work.now.nodes.find(i=>i.id===o.to.node);return`${o.to.pin} of ${r?.title??this.setting.kit.kinds.get(r?.kind??"")?.title??o.to.node}`});this.say(s.role==="dial"?`${n.title??"This dial"} turns ${a.join(" and ")||"nothing yet: wire it into an input"}. It is lit on the canvas.`:`${n.title??s.title} comes from the ${s.title} node lit on the canvas.`)}find(e){const n=this.work.now.nodes.find(a=>a.id===e);if(!n)return;this.selection=new Set([e]);const s=this.canvas.getBoundingClientRect();this.camera.x=s.width/2-(n.x+re.width/2)*this.camera.zoom,this.camera.y=s.height/2-(n.y+60)*this.camera.zoom,this.applyCamera(),this.render(),this.canvas.scrollIntoView?.({block:"nearest",behavior:"smooth"})}openMenu(e,n,s,a){this.closeMenu?.();const o=this.canvas.getBoundingClientRect(),r=e??this.camera.toWorld(o.width/2-re.width/2,o.height/4),i={left:r.x*this.camera.zoom+this.camera.x,top:r.y*this.camera.zoom+this.camera.y},l=Math.max(6,Math.min(i.top,o.height-280)),h=Math.max(200,Math.min(420,o.height-l-8)),c=o.width>=_r.side+16;let d=!1;this.say(n?"Choose what comes next, typing to narrow it; Escape lets the wire go.":"Choose a node, typing to narrow it; Escape closes the menu."),this.closeMenu=Tm(this.canvas,this.offeredKit(),{left:Math.max(4,Math.min(i.left,o.width-(c?_r.side:_r.narrow))),top:l,...o.height>0&&{height:h},side:c},n,u=>{d=!0,this.add(u,r,s,e===null)},()=>{this.closeMenu=null,!d&&a?this.edit(Ta(this.work.now,a.to,"input")):d||(this.preview=null),this.render(),this.canvas.focus({preventScroll:!0})},u=>this.seenIn(u.name))}offeredKit(){const{kit:e}=this.setting;return{kinds:new Map([...e.kinds].filter(([,n])=>this.work.offers(n))),types:e.types}}seenIn(e){if(!this.seen){this.seen=new Map;for(const n of this.setting.examples)for(const s of new Set(Mn(n.text,this.setting.kit).blueprint.nodes.map(a=>a.kind)))this.seen.set(s,[...this.seen.get(s)??[],n.title])}return this.seen.get(e)??[]}add(e,n,s,a=!1){const o=this.work.now,r=xs(o,e.kind.name),i=fe(e.kind),l={x:Math.round(s?.side==="input"?n.x-i.width:n.x),y:Math.round(n.y-re.header/2)},h={id:r,kind:e.kind.name,...a?this.freeSpot(l,i.width,i.height):l,values:{}};let c=co(o,h);s&&e.pin&&(c=ws(c,s.side==="output"?{from:{node:s.node,pin:s.pin},to:{node:r,pin:e.pin}}:{from:{node:r,pin:e.pin},to:{node:s.node,pin:s.pin}})),this.selection=new Set([r]),this.edit(c),this.reveal([r])}freeSpot(e,n,s){const{kit:a}=this.setting,o=this.work.now.nodes.map(i=>({node:i,shape:fe(a.kinds.get(i.kind))})),r=i=>o.every(({node:l,shape:h})=>e.x+n+12<=l.x||l.x+h.width+12<=e.x||i+s+12<=l.y||l.y+h.height+12<=i);for(let i=0;i<40;i+=1){const l=e.y+(i%2===0?1:-1)*Math.ceil(i/2)*re.row*2;if(r(l))return{x:Math.round(e.x),y:Math.round(l)}}return{x:Math.round(e.x),y:Math.round(e.y)}}reveal(e){const{kit:n}=this.setting,s=this.work.now.nodes.filter(d=>e.includes(d.id));if(s.length===0)return;const a=this.canvas.getBoundingClientRect();if(a.width<=0||a.height<=0)return;const{zoom:o}=this.camera,r=Math.min(...s.map(d=>d.x))*o+this.camera.x,i=Math.min(...s.map(d=>d.y))*o+this.camera.y,l=Math.max(...s.map(d=>d.x+fe(n.kinds.get(d.kind)).width))*o+this.camera.x,h=Math.max(...s.map(d=>d.y+fe(n.kinds.get(d.kind)).height))*o+this.camera.y,c=24;r<c?this.camera.x+=c-r:l>a.width-c&&(this.camera.x-=Math.min(l-(a.width-c),r-c)),i<c?this.camera.y+=c-i:h>a.height-c&&(this.camera.y-=Math.min(h-(a.height-c),i-c)),this.applyCamera()}openText(){Mm(this.element,this.work.text(),this.setting.kit,e=>{const{blueprint:n}=Mn(e,this.setting.kit),s=new Map(this.work.now.nodes.map(o=>[o.id,o])),a=n.nodes.every(o=>s.has(o.id));this.edit(a?{...n,nodes:n.nodes.map(o=>({...o,x:s.get(o.id)?.x??0,y:s.get(o.id)?.y??0}))}:oi(n,this.setting.kit)),a||this.fit()})}async share(){const e=this.work.link();try{await this.setting.copy(e),this.say("A link to this blueprint, as it is now, is copied: whoever opens it sees it so.")}catch{this.say(e)}}toggleExamples(){const e=this.element.querySelector(".wb-examples");e?e.remove():mm(this.element,this.setting.examples,this.work.example,n=>this.open(n))}toggleHelp(){const e=this.element.querySelector(".wb-help");e?e.remove():yS(this.element)}full(){return this.element.classList.contains("full")}touching(){return window.matchMedia?.("(pointer: coarse)").matches??!1}toggleFull(){const e=!this.full();this.element.classList.toggle("full",e),document.body.classList.toggle("wb-full-open",e),this.buttons.full.textContent=e?"Back to the page":"Full screen",this.buttons.full.title=e?"Back to the page (Esc)":"Work on it full screen (Esc to come back)",setTimeout(()=>this.fit(),0),this.say()}listen(){const e=this.canvas;e.addEventListener("pointerdown",n=>this.pressed(n)),e.addEventListener("pointermove",n=>this.moved(n)),e.addEventListener("pointerup",n=>this.released(n)),e.addEventListener("pointercancel",n=>{this.pinches.delete(n.pointerId),this.gesture=null,this.preview=null,this.clearFits(),this.render()}),e.addEventListener("dblclick",n=>{this.onBackground(n.target)&&this.openMenu(this.pointOf(n),void 0)}),e.addEventListener("contextmenu",n=>{this.onBackground(n.target)&&(n.preventDefault(),this.openMenu(this.pointOf(n),void 0))}),e.addEventListener("wheel",n=>{if(n.target.closest(".wb-menu"))return;const s=e.getBoundingClientRect();if(n.ctrlKey||n.metaKey)n.preventDefault(),this.camera.zoomAt(n.clientX-s.left,n.clientY-s.top,Math.exp(-n.deltaY/300));else if(this.full())n.preventDefault(),this.camera.x-=n.deltaX,this.camera.y-=n.deltaY;else return;this.applyCamera()},{passive:!1}),e.addEventListener("keydown",n=>this.keyed(n)),e.addEventListener("pointerover",n=>{this.gesture||this.hovered(n.target)}),this.element.addEventListener("keydown",n=>{n.key==="Escape"&&this.full()&&this.toggleFull()})}pointOf(e){const n=this.canvas.getBoundingClientRect();return this.camera.toWorld(e.clientX-n.left,e.clientY-n.top)}onBackground(e){const n=e;return n===this.canvas||n===this.world||n===this.nodes||n===this.wires||n?.classList?.contains("wb-blank")===!0}pressed(e){const n=e.target;if(n.closest(".wb-menu, .wb-edit, .wb-promote, .wb-peek, .wb-peek-panel, .wb-next, [contenteditable]")||e.pointerType==="touch"&&!this.full())return;if(e.pointerType==="touch"&&(this.pinches.set(e.pointerId,{x:e.clientX,y:e.clientY}),this.pinches.size===2)){this.gesture=null,this.preview=null;return}if(e.button!==0)return;this.closeMenu?.();const s=this.pointOf(e),a=n.closest(".wb-pin"),o=n.closest(".wb-node"),r=n.closest(".wb-wire-hit");if(this.chosenWire=null,a&&o?.dataset.node)this.grabPin(e,{node:o.dataset.node,pin:a.dataset.pin??"",side:a.dataset.side==="input"?"input":"output"},s);else if(o?.dataset.node){const i=o.dataset.node;e.shiftKey&&this.selection.has(i)?this.selection.delete(i):e.shiftKey?this.selection.add(i):this.selection.has(i)||(this.selection=new Set([i])),this.gesture={kind:"move",ids:[...this.selection],from:s,before:this.work.now,moved:!1}}else if(r?.dataset.to){const[i="",l=""]=r.dataset.to.split("\0");this.chosenWire=this.work.now.wires.find(h=>h.to.node===i&&h.to.pin===l)??null,this.selection.clear(),this.say("A wire chosen: Delete takes it away; or drag its end off the input it goes into.")}else e.shiftKey?this.gesture={kind:"marquee",from:s,at:s,base:new Set(this.selection)}:this.gesture={kind:"pan",x:e.clientX,y:e.clientY,from:{x:this.camera.x,y:this.camera.y},moved:!1};this.canvas.setPointerCapture?.(e.pointerId),this.canvas.focus({preventScroll:!0}),this.render()}grabPin(e,n,s){const{kit:a}=this.setting,o=this.work.now,r=l=>{const h=a.kinds.get(o.nodes.find(c=>c.id===l.node)?.kind??"");return(l.side==="output"?h?.outputs:h?.inputs)?.find(c=>c.name===l.pin)?.type??"value"};if(e.altKey){this.edit(Ta(o,{node:n.node,pin:n.pin},n.side));return}const i=n.side==="input"?o.wires.find(l=>l.to.node===n.node&&l.to.pin===n.pin):void 0;if(i){const l={node:i.from.node,pin:i.from.pin,side:"output"};this.preview=Ta(o,i.to,"input"),this.gesture={kind:"wire",end:l,type:r(l),at:s,detached:i,before:o}}else this.gesture={kind:"wire",end:n,type:r(n),at:s,detached:null,before:o};this.markFits(this.gesture.end)}markFits(e){const{kit:n}=this.setting,s=this.blueprint;this.canvas.classList.add("wiring");for(const[a,o]of this.views)for(const r of o.element.querySelectorAll(".wb-pin")){const i=r.dataset.pin??"",l=r.dataset.side,h=e.side==="output"&&l==="input"?{from:{node:e.node,pin:e.pin},to:{node:a,pin:i}}:e.side==="input"&&l==="output"?{from:{node:a,pin:i},to:{node:e.node,pin:e.pin}}:null;r.classList.toggle("fits",h!==null&&zr(s,n,h)===null),r.classList.toggle("held",a===e.node&&i===e.pin)}}clearFits(){this.canvas.classList.remove("wiring");for(const e of this.canvas.querySelectorAll(".wb-pin.fits, .wb-pin.held"))e.classList.remove("fits","held")}moved(e){if(this.pinches.has(e.pointerId)){const a=[...this.pinches.values()];this.pinches.set(e.pointerId,{x:e.clientX,y:e.clientY});const o=[...this.pinches.values()];if(a.length===2&&o.length===2){const[r,i,l,h]=[a[0],a[1],o[0],o[1]],c=this.canvas.getBoundingClientRect();this.camera.zoomAt((l.x+h.x)/2-c.left,(l.y+h.y)/2-c.top,Math.hypot(l.x-h.x,l.y-h.y)/Math.max(1,Math.hypot(r.x-i.x,r.y-i.y))),this.camera.x+=(l.x+h.x-r.x-i.x)/2,this.camera.y+=(l.y+h.y-r.y-i.y)/2,this.applyCamera();return}}const n=this.gesture;if(!n)return;const s=this.pointOf(e);if(n.kind==="pan")n.moved||=Math.hypot(e.clientX-n.x,e.clientY-n.y)>3,this.camera.x=n.from.x+e.clientX-n.x,this.camera.y=n.from.y+e.clientY-n.y,this.applyCamera();else if(n.kind==="move"){const[a,o]=[Math.round(s.x-n.from.x),Math.round(s.y-n.from.y)];n.moved||=Math.abs(a)+Math.abs(o)>2,n.moved&&(this.preview=Kd(n.before,n.ids,a,o),this.render())}else if(n.kind==="wire"){n.at=s;const a=Xd(this.blueprint,this.setting.kit,s),o=a&&this.wireBetween(n.end,a);this.say(a&&o?zr(this.blueprint,this.setting.kit,o)??`Let go to wire it into ${a.pin}.`:"Let go on a pin to wire it, or in empty space to choose what comes next."),this.drawWires()}else{n.at=s;const[a,o]=[Math.min(n.from.x,s.x),Math.min(n.from.y,s.y)],[r,i]=[Math.max(n.from.x,s.x),Math.max(n.from.y,s.y)],l=this.work.now.nodes.filter(h=>h.x<r&&h.x+re.width>a&&h.y<i&&h.y+fe(this.setting.kit.kinds.get(h.kind)).height>o).map(h=>h.id);this.selection=new Set([...n.base,...l]),Object.assign(this.marquee.style,{left:`${a*this.camera.zoom+this.camera.x}px`,top:`${o*this.camera.zoom+this.camera.y}px`,width:`${(r-a)*this.camera.zoom}px`,height:`${(i-o)*this.camera.zoom}px`}),this.marquee.hidden=!1,this.render()}}wireBetween(e,n){if(e.side===n.side)return null;const[s,a]=e.side==="output"?[e,n]:[n,e];return{from:{node:s.node,pin:s.pin},to:{node:a.node,pin:a.pin}}}released(e){this.pinches.delete(e.pointerId);const n=this.gesture;if(this.gesture=null,this.marquee.hidden=!0,this.clearFits(),!!n)if(n.kind==="pan"&&!n.moved)this.selection.clear(),this.render();else if(n.kind==="move"&&n.moved)this.edit(Kd(n.before,n.ids,Math.round(this.pointOf(e).x-n.from.x),Math.round(this.pointOf(e).y-n.from.y)));else if(n.kind==="wire"){const s=this.pointOf(e),a=Xd(this.blueprint,this.setting.kit,s),o=a&&this.wireBetween(n.end,a);if(o){const r=zr(this.blueprint,this.setting.kit,o);r?(this.preview=null,this.render(),this.say(`Not wired: ${r}.`)):this.edit(ws(this.blueprint,o))}else a&&a.node===n.end.node&&a.pin===n.end.pin?(this.preview=null,this.render()):this.openMenu(s,{type:n.type,side:n.end.side},n.end,n.detached)}else this.render()}keyed(e){if(e.target.closest("input, select, textarea, [contenteditable]"))return;const n=e.ctrlKey||e.metaKey,s=e.key.toLowerCase();if(e.key==="Delete"||e.key==="Backspace")this.remove();else if(n&&s==="z")this.step(e.shiftKey?"redo":"undo");else if(n&&s==="y")this.step("redo");else if(n&&s==="d")this.duplicate();else if(n&&s==="a")this.selection=new Set(this.work.now.nodes.map(a=>a.id)),this.render();else if(!n&&(e.key===" "||s==="a"||e.key==="Tab"))this.openMenu(null,void 0);else if(!n&&s==="f")this.fit();else if(e.key==="Escape"&&!this.full())this.selection.clear(),this.chosenWire=null,this.render();else return;e.preventDefault()}hovered(e){const n=e,s=n?.closest(".wb-pin"),a=n?.closest(".wb-node")?.dataset.node;if(!a)return this.say();const o=this.work.now.nodes.find(f=>f.id===a),r=o&&this.setting.kit.kinds.get(o.kind);if(!r)return this.say();if(!s)return this.say(`${r.title}: ${r.summary}`);const i=s.dataset.pin??"",l=this.work.evaluation.get(a),h=s.dataset.side==="output",c=(h?r.outputs:r.inputs).find(f=>f.name===i),d=c&&this.setting.kit.types.get(c.type),u=l?.state==="done"?h?l.outputs[i]:l.inputs[i]:void 0,m=u!==void 0&&d?`: ${d.describe(u)}`:"";this.say(`${c?.label||i}, ${d?.label??"a value"}${m}. ${h?"Drag it to an input, or into empty space for what comes next.":"Drag a wire into it, or out of it for what could feed it."}${c&&"hint"in c&&c.hint?` ${c.hint}.`:""}`)}}let Qd;function kS(t,e){if(typeof IntersectionObserver!="function")return e(),()=>{};const n=new IntersectionObserver(s=>{s.some(a=>a.isIntersecting)&&(n.disconnect(),e())},{rootMargin:"400px"});return n.observe(t),()=>n.disconnect()}function $S(t){for(let e=t.previousElementSibling;e;e=e.previousElementSibling)if(/^H[1-4]$/.test(e.tagName))return e.textContent;return null}const xS=t=>fetch(t).then(e=>e.ok?e.text():Promise.reject(new Error(`${t}: ${e.status}`)));function TS(t,e=()=>!1,n=()=>{}){return s=>{const a=n()??(k=>new vS(k));Qd??=new lS(xS);const o=[...document.querySelectorAll('.app[data-app="blueprint"]')];s.id||=`blueprint-${o.indexOf(s)+1}`;const r=o.map((k,x)=>aS(k.dataset.source??"").map(T=>T.title?T:{...T,title:$S(k)??`Blueprint ${x+1}`})),i=r[o.indexOf(s)]??[],l=()=>i.find(k=>k.slug&&`#${k.slug}`===decodeURIComponent(window.location.hash)),h=l(),c=window.location.hash===`#${s.id}`||h?new URLSearchParams(window.location.search).get("blueprint"):null,d=c?iS(c):null,u=new hS(()=>window.localStorage),m=k=>`${window.location.pathname}#${oS(k.text)}`,f=s.querySelector(".bp-board")?.innerHTML,p=a({kit:t,files:Qd,examples:r.flat(),start:{...h&&{example:h},...d&&{text:d,said:"Opened as a link carried it. Reset goes back to the page's own."}},...f&&{stillBoard:f},own:{get:k=>u.get(m(k)),set:(k,x)=>x===null?u.forget(m(k)):u.set(m(k),x)},opened:k=>{i.includes(k)&&k.slug&&window.history.replaceState(window.history.state,"",`${window.location.pathname}#${k.slug}`)},linkTo:(k,x)=>`${window.location.origin}${window.location.pathname}?blueprint=${rS(x)}#${i.includes(k)&&k.slug||s.id}`,copy:k=>navigator.clipboard.writeText(k),isOn:e}),w=i.filter(k=>k.slug).map(k=>y("span",{id:k.slug,class:"wb-anchor"}));s.replaceChildren(...w,p.element),p.placed(),h&&document.getElementById(h.slug)?.scrollIntoView?.();const g=kS(s,()=>p.wake()),v=()=>{const k=l();k&&p.open(k)};window.addEventListener("hashchange",v);const b=k=>{const x=k.detail?.text;typeof x=="string"&&p.ask(x)};return s.addEventListener(zt,b),()=>{s.removeEventListener(zt,b),window.removeEventListener("hashchange",v),g(),p.stop()}}}function zf(t){const n=t.trim().replace(/^[a-z]+:\/\/[^/]+/i,"").replace(/[?#].*$/,"").replace(/(?:^|\/)(?:README\.md|index\.html)$/,"").split("/").filter(s=>s!==""&&s!==".");return n.length===0?"/":`/${n.join("/")}/`}const MS={name:"read",description:"The words of one page of this site, as the markdown it is written in, and the pages under it. Nothing on the reader's screen moves.",inputSchema:{type:"object",properties:{path:{type:"string",description:"the page's address, e.g. /projects/rocket/ — or its whole URL"}},required:["path"],additionalProperties:!1},readOnly:!0,shows:!1,answer(t,{site:e}){const n=String(t.path??""),s=e.at(zf(n));if(!s)return{refused:`no page at ${n}: search finds pages by what they say`};const a=e.childrenOf(s.route).map(({route:o,title:r,summary:i})=>({path:o,title:r,summary:i}));return{summary:s.summary?`${s.title}: ${s.summary}`:s.title,data:{title:s.title,summary:s.summary,markdown:s.body,pages:a},route:s.route}}},SS=20,AS=3,eu=5,tu=(t,e)=>e.every(n=>t.toLowerCase().includes(n));function ES(t){const e=t.slice(0,eu).join(", ");return t.length>eu?`${e}…`:`${e}.`}const OS={name:"search",description:"The pages of this site that say every word of a query, the ones named for it first, each with its title, summary and the lines that say it. Nothing on the reader's screen moves.",inputSchema:{type:"object",properties:{query:{type:"string",description:"the words to look for; case does not matter"},under:{type:"string",description:"only the pages under this address, e.g. /projects/"}},required:["query"],additionalProperties:!1},readOnly:!0,shows:!1,answer(t,{site:e}){const n=String(t.query??"").trim();if(!n)return{refused:"query: say what to look for"};const s=n.toLowerCase().split(/\s+/),a=zf(String(t.under??"/")),o=e.pages.filter(u=>u.route.startsWith(a)),r=o.filter(u=>tu(`${u.route} ${u.title}`,s)),i=o.filter(u=>!r.includes(u)&&tu(`${u.summary}
${u.body}`,s)),l=[...r,...i],h=u=>u.body.split(`
`).map(vt).filter(m=>s.some(f=>m.toLowerCase().includes(f))).slice(0,AS),c=l.slice(0,SS).map(u=>({path:u.route,title:u.title,summary:u.summary,lines:h(u)}));return{summary:l.length===0?`No page says "${n}".`:`${l.length} ${l.length===1?"page says":"pages say"} "${n}": ${ES(l.map(u=>u.title))}`,data:{pages:c}}}},IS=[MS,OS],CS=[{file:"book/index.md",markdown:`---
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

For each measure, the figure sets what the ratchet holds beside what the
source measures. What it holds is read from the file at every commit since
it came in, a band that steps wherever the file was changed. What the source
measures is taken at every commit of the history, as the ratchet takes it
now, the commits before it began as well, a line inside the band. Under
them, how the ratchet went: when it began, what it held, and every time it
was tightened since, or loosened.

::ratchet

And what [how this site changes](/projects/changes/) finds, files that keep
changing together with no arrow between them, is held too: two files of
different boxes that changed together twice with nothing joining them need a
test that imports both, so that what they agree on, which no import states,
is written down where breaking it fails. Two files of one box changing
together is what makes the box one, and the files that put the features
together change with everything they put together: both are left out. So
the page the build writes and the scripts that take it over agree in a test;
so do the theme the head paints before anything shows and the one the
theme's script settles, and the list at the end of a directory's page and
what \`ls\` prints there.

Two more things watch the AI as it works, and they are in the repository
too. After every edit to a file of the source, it is told what the history
knows of that file: how often it has changed, what it changes with, and
whether a test holds what they agree on — the panel beside the picture, said
at the moment it matters. It cannot commit, nor end its turn, while the type
check or the tests are red, and the checks that read the history read it as
the deploy will write it, with what is being committed in it. Then, after every push, the deploy breaks the lines that
push changed on purpose, one small change at a time, \`===\` into \`!==\`, \`&&\`
into \`||\`, and lists the ones no test noticed. Code coverage says a line was
run; this says whether running it was checked, which is the difference
[a program that tests nothing](/research/coverage-generated/) makes plain.
And it lists what no test runs, not as a number to raise but as a question
each file asks. If nothing in the site uses it, it has no purpose, and goes.
If only a browser runs it, it is hard to test where it is, and what it
decides can move out of the browser. And if the site uses it and no test
runs it, it has a behaviour no test states yet, and the test is what is
missing: the first such test said, of every page, that every figure it names
stands in its HTML, which the build had never been made to prove.

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
`},{file:"projects/blueprints.md",markdown:`---
title: Blueprints
summary: The data this site keeps — the weather since 1780, the air, the sea, its own source — as nodes to wire together, the way Unreal and Unity wire their programs: sources, filters, steps, statistics and pictures, with dials to turn. Twenty examples to start from, the last one yours.
order: 92
---

# Blueprints

A blueprint is a program drawn as boxes and wires. Unreal calls its visual
scripts by that name, and Unity draws its own the same way: data comes in on
the left, flows along the wires through each step, and comes out as a
picture. Every wire has the colour of what flows along it — a table is blue,
a number green, a graph orange — so what fits where is seen before it is
tried.

Each page of open data on this site asks its data one question. These are
the same data, and this site's own source, taken apart into nodes that can be
wired into questions of your own: the months at a weather station joined to
the months at a measuring point, a correlation, the season taken out, a
picture.

- **A wire goes from an output**, on the right of a node, **into an input**
  on the left of another, of the same colour: a table into a table, a number
  into a number. While one is dragged, the pins it fits are lit.
- **Choose a node**, and what could come next is offered under the canvas,
  read off what it gives: a picture of it, the years measured whole, the
  season taken out, a join with another source standing apart. A click adds
  it, wired and written, and offers what could come after that.
- **Press an output's name** to look at what it gives: a table's first rows,
  and what its columns are. A wire says what it carries when pointed at.
- **Drag from a pin** to wire it. Let go on another pin to join them, or in
  empty space to choose what comes next, from what fits.
- **Double-click** the canvas, or press the space bar, to add any node.
- **Drag a node by its title** to move it, and the canvas to move about;
  **Ctrl and the wheel** zoom. Shift and a drag choose several; Delete takes
  them away, and Ctrl+Z brings them back.
- **◉**, beside a value, puts it on the board as a dial. The title of every
  picture on the board finds its node.
- **Examples** opens any of the twenty below; **Full screen** gives the
  editor the whole window; **Text** shows the blueprint as text, to read, to
  copy, or to write by hand.

Everything runs here, in your browser, on the files this site serves, and
your changes to each example are kept in this browser until you reset them.
**Link** copies a link that opens a blueprint as you left it.

Twenty to start from, each a working blueprint, in the editor's
**Examples** menu or here:

- **The weather and the air**: [nights that do not cool](#nights-that-do-not-cool), a source, a picture and a trend; [one season, year by year](#one-season-year-by-year), with filters; [a working day, in NO2](#a-working-day-in-no2), a heat map; [the NO2 through the day](#the-no2-through-the-day), a line a season and each month's highest hour; [thirty years of NO2](#thirty-years-of-no2-every-measuring-point), every measuring point joined to its name; [Barcelona since 1780](#barcelona-since-1780), the longest series the site keeps — and [the page of hot nights](/projects/hot-nights/#the-long-record) has more of it.
- **The two, crossed**: [does the heat bring the NO2?](#does-the-heat-bring-the-no2), the season and the years taken out; [patterns of heat and NO2](#patterns-of-heat-and-no2), season by season, the rain, the span of a day; [does the NO2 rise as the evening cools?](#does-the-no2-rise-as-the-evening-cools), a guess put to the data; [what the lockdown did to the evening](#what-the-lockdown-did-to-the-evening), the spring of 2020; [does a warm sea go with warm nights?](#does-a-warm-sea-go-with-warm-nights), the sea beside the weather — and [the sea's own page](/projects/sea/) has more of it.
- **This site's own source**: [the files everything needs](#the-files-everything-needs), by PageRank; [how much the files are needed](#how-much-the-files-are-needed), a histogram; [what changes, and what is needed](#what-changes-and-what-is-needed); [files that keep changing](#files-that-keep-changing), a filter on the graph; [the groups the arrows make](#the-groups-the-arrows-make), tangled; [the source, grown](#the-source-grown), a dial along every commit.
- **The programs**: [technical debt](#the-programs-as-nodes) and [the rocket](#the-rocket-as-a-node), as nodes.
- **[Your own](#your-own)**: a table you paste.

Between them they paint every picture a blueprint can — bars, lines, a
scatter, a heat map, a histogram, a table, a number, the source in its boxes
and tangled, a program's own — and read every kind of data the site keeps.

\`\`\`::blueprint
## Nights that do not cool
# The simplest: one source, one picture, one statistic. The days of a kind at a weather station, year by year, a bar a year — faint where the year was not measured whole, or is still running — and the straight line fitted through the whole years, as the change it makes each decade. Turn the station and the kind on the board.
station = dial "Station" value: WU
kind = dial "Kind of day" value: torrid-nights
days = weather-days station: station kind: kind
bars "Days a year" table: days x: year y: days faded: whole
whole = keep "Only the whole years" table: days column: whole is: equals value: yes
trend = trend table: whole y: days
readout "Each decade" value: trend.per-ten unit: days about: "the change along the straight line fitted through the whole years"

## One season, year by year
# Filters keep some rows and leave the rest. Here, the months of one season, of the years measured whole; then a row a year, the season's mean night, and the straight line through it. A filter's value is offered from the column's own values, so the dial is a list of the seasons.
which = dial "Season" value: summer
months = weather-months station: X4
only = keep "Only one season" table: months column: season is: equals value: which
whole = keep "Only the months measured whole" table: only column: whole is: equals value: yes
years = group "A year a row" table: whole by: year value: tn how: mean
lines "The season's mean night, year by year" table: years x: year y: tn
trend = trend table: years y: tn
readout "Each decade" value: trend.per-ten unit: °C about: "along the straight line fitted through the years"

## A working day, in NO2
# The table the NO2 page draws, made of its parts: a measuring point's mean at every hour of the day in every month of the year. Monday to Friday has a shape a weekend has not; choose the days on the board. The network numbers its hours 1 to 24, and does not say by which clock.
where = dial "Measuring point" value: 08019043
days = dial "Days" value: workdays
hours = no2-hours station: where days: days from: 2015
heatmap "NO2, hour by hour and month by month" table: hours x: month y: hour value: no2

## The NO2 through the day
# A measuring point's day, hour by hour, a line a season: a dip in the afternoon, and a rise into the evening. Under it, the hour the evening is at its highest, month by month — later in summer than in winter at most points; at Eixample and Gràcia, in Barcelona, it hardly moves. Choose the days on the board: weekends too. The network numbers its hours 1 to 24, and does not say by which clock.
point = dial "Measuring point" value: 17079003
days = dial "Days" value: workdays
day = no2-hours "Every year together" station: point days: days
seasons = group "A row an hour and a season" table: day by: hour and: season value: no2 how: mean
lines "NO2 through the day, a line a season" table: seasons x: hour y: no2 split: season
late = keep "From hour 16 on" table: day column: hour is: at-least value: 16
highs = top "Each month's highest hour" table: late by: no2 count: 1 per: month
lines "The hour the evening is at its highest, month by month" table: highs x: month y: hour

## Thirty years of NO2, every measuring point
# Every measuring point's yearly mean, a line each, named by joining the points to their names. The trend is of all of them at once, which says less than any one line does: pull a wire out of the table into empty space, and keep the rows of one point to see its own.
years = no2-years station: all
names = no2-stations
named = join left: years right: names
whole = keep table: named column: whole is: equals value: yes
lines "NO2 a year, a line a measuring point" table: whole x: year y: no2 split: name
trend = trend table: whole y: no2
readout "Each decade, every point together" value: trend.per-ten unit: µg/m³

## Barcelona since 1780
# The longest series the site keeps: Barcelona's mean temperature every year since 1780, the Meteocat's, and the straight line through the years from the dial's on, as the change it makes each decade. Turn the dial to see how much the line depends on where it starts.
start = dial "From" value: 1780
years = barcelona-years
kept = keep "From the dial's year on" table: years column: year is: at-least value: start
lines "Barcelona's mean temperature, year by year" table: kept x: year y: mean
trend = trend table: kept y: mean
readout "Each decade" value: trend.per-ten unit: °C about: "along the straight line fitted through the years from the dial's on"

## Does the heat bring the NO2?
# The Meteocat's weather station and the Generalitat's measuring point in one town, month by month. As measured, warm months have less NO2 than cold ones: that is the season, which both follow. Each month less its month's mean takes the season out, and less its year's mean too takes out the years, along which the air has got cleaner and the weather warmer; what is left can have the other sign. A correlation says what goes with what, never why. Badalona, Sabadell, Girona and Tarragona have both.
town = dial "Weather station" value: WU
point = dial "Measuring point" value: 08015021
heat = weather-months station: town
air = no2-months station: point
both = join left: heat right: air
whole = keep "Months measured whole" table: both column: whole is: equals value: yes
season = season "Less each month's mean" table: whole by: month
years = season "Less each year's mean too" table: season by: year
measured = correlation table: whole x: tx y: no2
seasonless = correlation table: season x: tx y: no2
yearless = correlation table: years x: tx y: no2
readout "As measured" value: measured.r about: "Pearson's r of the mean daily maximum and NO2, month by month"
readout "The season taken out" value: seasonless.r about: "each month less its month's mean"
readout "The years taken out too" value: yearless.r about: "and less its year's mean"
scatter "What is left of each month" table: years x: tx y: no2

## Patterns of heat and NO2
# The same two networks, taken further apart, on Girona. With the season and the years taken out, what is left of each month kept to the summers, against the heat of the day; to the winters, against the cold of the night; set against the rain; and against the span between a day's highest and lowest, which a formula works out. The heat map is what is left of the NO2, month by year: which months stood out, and when.
town = dial "Weather station" value: XJ
point = dial "Measuring point" value: 17079003
heat = weather-months station: town
air = no2-months station: point
both = join left: heat right: air
whole = keep "Months measured whole" table: both column: whole is: equals value: yes
seasonless = season "Less each month's mean" table: whole by: month
odd = season "Less each year's mean too" table: seasonless by: year
spanned = formula "The day's span, added" table: odd name: span formula: "tx - tn" unit: °C
summers = keep table: spanned column: season is: equals value: summer
winters = keep table: spanned column: season is: equals value: winter
hot = correlation table: summers x: tx y: no2
cold = correlation table: winters x: tn y: no2
wet = correlation table: spanned x: rain y: no2
wide = correlation table: spanned x: span y: no2
readout "Summers: the heat of the day" value: hot.r about: "r of the daily maximum and NO2, summers only"
readout "Winters: the cold of the night" value: cold.r about: "r of the daily minimum and NO2, winters only"
readout "The rain" value: wet.r about: "r of the month's rain and NO2"
readout "The day's span" value: wide.r about: "r of the gap between the day's highest and lowest, and NO2"
scatter "The day's span against NO2, a colour a season" table: spanned x: span y: no2 colour: season
heatmap "What is left of the NO2, month by year" table: odd x: month y: year value: no2

## Does the NO2 rise as the evening cools?
# A guess, put to the data: at the end of the day the air cools, and the NO2 comes down with it. There are no hourly temperatures here, only each day's highest and lowest; so the blueprint asks it month by month — how much the NO2 rises from the afternoon to the evening, against how cold the month's nights were and how much its days cooled, the span between their highest and lowest — with the season and the years taken out, as in the two before it. The hours of the afternoon and of the evening are dials. A correlation says what goes with what, never why.
point = dial "Measuring point" value: 17079003
town = dial "Weather station" value: XJ
days = dial "Days" value: workdays
afternoon-hours = dial "The afternoon, hours" value: "13 16"
evening-hours = dial "The evening, hours" value: "19 22"
hours = no2-hours "Each year apart" station: point days: days years: each
early = keep "The afternoon's hours" table: hours column: hour is: between value: afternoon-hours
late = keep "The evening's hours" table: hours column: hour is: between value: evening-hours
early-mean = group "The afternoon, a row a month" table: early by: year and: month value: no2 how: mean name: afternoon
late-mean = group "The evening, a row a month" table: late by: year and: month value: no2 how: mean name: evening
paired = join left: late-mean right: early-mean
rise = formula "The evening's rise" table: paired name: rise formula: "evening - afternoon" unit: µg/m³
weather = weather-months station: town
both = join left: rise right: weather
whole = keep "Months measured whole" table: both column: whole is: equals value: yes
spanned = formula "The day's span, added" table: whole name: span formula: "tx - tn" unit: °C
seasonless = season "Less each month's mean" table: spanned by: month
odd = season "Less each year's mean too" table: seasonless by: year
summed = summary table: whole column: rise
measured = correlation table: spanned x: tn y: rise
cold = correlation table: odd x: tn y: rise
wide = correlation table: odd x: span y: rise
readout "The evening's rise" value: summed.mean unit: µg/m³ about: "the mean, month by month, of the evening's hours less the afternoon's"
readout "Colder nights, as measured" value: measured.r about: "r of the daily minimum and the rise: the season, mostly"
readout "Colder nights, the season and the years out" value: cold.r about: "r of what is left of each, month by month"
readout "Days that cool more, the season and the years out" value: wide.r about: "r of the span between the day's highest and lowest, and the rise"
scatter "What is left of each month: the day's span against the evening's rise" table: odd x: span y: rise colour: season

## What the lockdown did to the evening
# In the spring of 2020 Spain was in lockdown: few cars on the streets, and people at home. A measuring point's April, hour by hour, a line a year: in 2020 the NO2 fell, and the evening's rise all but went, while the morning's stayed, smaller. Under it, the evening's rise in that month, year by year. That April was also the wettest in years, and its days cooled least, which by the guess before would shrink the rise too; but wet Aprils before it still rose. Turn the month: in March, half of it in lockdown, the rise was smaller; in May it was all but gone too.
point = dial "Measuring point" value: 17079003
which = dial "Month" value: 4
hours = no2-hours "Each year apart" station: point days: all years: each
month = keep "One month" table: hours column: month is: equals value: which
some = keep "Five years" table: month column: year is: between value: "2017 2021"
lines "NO2 through the day, a line a year" table: some x: hour y: no2 split: year
early = keep "The afternoon, hours 13 to 16" table: month column: hour is: between value: "13 16"
late = keep "The evening, hours 19 to 22" table: month column: hour is: between value: "19 22"
early-mean = group "A row a year" table: early by: year value: no2 how: mean name: afternoon
late-mean = group "A row a year" table: late by: year value: no2 how: mean name: evening
paired = join left: late-mean right: early-mean
rise = formula "The evening's rise" table: paired name: rise formula: "evening - afternoon" unit: µg/m³
bars "The evening's rise in that month, year by year" table: rise x: year y: rise

## Does a warm sea go with warm nights?
# The sea off Barcelona, from NOAA's daily analysis, and the Meteocat's weather station of Badalona, by the sea, month by month. Both follow the season, and both the years; with each month less its month's mean, and less its year's, what is left is how unusual a month was, and whether an unusually warm sea went with unusually warm nights. A correlation says what goes with what, never why.
sea = sea-months point: barcelona
nights = weather-months station: WU
both = join left: sea right: nights
whole = keep "Months measured whole" table: both column: whole is: equals value: yes
seasonless = season "Less each month's mean" table: whole by: month
odd = season "Less each year's mean too" table: seasonless by: year
measured = correlation table: whole x: sst y: tn
left = correlation table: odd x: sst y: tn
readout "As measured" value: measured.r about: "r of the sea's monthly mean and the mean night, month by month"
readout "The season and the years taken out" value: left.r about: "r of what is left of each"
scatter "What is left of each month: the sea against the nights" table: odd x: sst y: tn colour: season

## The files everything needs
# This site's own source, at its last commit, as a graph: a node a file, an arrow a file that needs another. Measured by PageRank — needed by what is itself needed — the ten at the top, and the whole source drawn as the architecture page draws it, each file as big as the files that need it and as deep as its PageRank.
source = source
ranked = measure graph: source what: pagerank
ten = top table: ranked by: pagerank count: 10
show-table "The ten most needed, by PageRank" table: ten rows: 10
picture "The source, as needed as it is" graph: ranked size: needed colour: pagerank

## How much the files are needed
# A histogram: the files of this site's source by how many others need them, cut into bins with round edges, a bar a bin. Most are needed by few, and a few by very many: the tail the architecture page draws on its log scales.
source = source
files = files graph: source
spread = histogram table: files column: needed bins: 20
bars "Files, by how many need them" table: spread x: from y: count
summed = summary table: files column: needed
readout "Half the files are needed by at most" value: summed.median unit: files
readout "The most needed is needed by" value: summed.highest unit: files

## What changes, and what is needed
# A file many others need is hard to change, which, as Robert C. Martin says, only hurts if it has to change. Each file's commits so far against how many files need it, and the correlation of their ranks, which asks only whether the files needed more are the ones changed more.
source = source
changed = measure graph: source what: changes
scatter "Changes against needed by, a dot a file" table: changed x: needed y: changes label: file
ranks = correlation table: changed x: needed y: changes of: ranks
readout "Spearman's r" value: ranks.r about: "of how many files need a file and how many commits changed it"

## Files that keep changing
# A filter on a graph: only the files changed at least as many times as the dial says — a slider, since the filter compares numbers — drawn where they stand, as big and as warm as their changes, and listed, the most changed first.
often = dial "Changed at least" value: 10
source = source
changed = measure graph: source what: changes
kept = keep-files "Only the files changed that often" graph: changed column: changes is: at-least value: often
picture "Where they stand" graph: kept size: changes colour: changes
ranked = sort table: kept by: changes order: falling
show-table "The files, the most changed first" table: ranked rows: 12

## The groups the arrows make
# The Louvain method finds the groups a graph makes without being told any (Blondel and others, 2008). Each file coloured by its group, and the source tangled, with no boxes, only the pull of what needs what; and how much the groups keep their arrows inside, their modularity (Newman and Girvan, 2004).
source = source
grouped = measure graph: source what: group
picture "Tangled, a colour a group" graph: grouped colour: group layout: tangle
figures = network graph: source
readout "Modularity of the groups" value: figures.modularity

## The source, grown
# The history plays here too: a dial along every commit that changed the source, and the source as it stood then. Under it, the files that ship after each commit, the whole history long.
when = dial "Commit" value: 60
then = source commit: when
picture "The source then" graph: then
commits = commits
lines "Files, commit after commit" table: commits x: commit y: files

## The programs, as nodes
# Every program on this site is a node as well — the simulation of technical debt, the relativistic rocket — its dials its inputs, the figures of its answer its outputs, a list of them a table, and its own picture on the board. Here a dial turns the interest a shortcut costs, and the months the simulation gives back are drawn again as two lines, beside the month in which the clean road overtakes the one with shortcuts.
interest = dial "Interest a shortcut costs, %" value: 10
debt = technical-debt interest: interest
lines "Features delivered, both roads" table: debt.months x: month y: cleanCumulative and: debtCumulative
readout "The clean road overtakes at month" value: debt.break-even-month

## The rocket, as a node
# The relativistic rocket is a node too: two of its dials on the board, and two of its numbers wired into numbers — the years the crew lives through, and the years that pass at home. Its own table, of every destination at that acceleration, comes onto the board with it. It gives numbers and takes numbers and a destination, so it wires to what takes a number: a Number, a Formula's table, not the NO2.
pull = dial "Acceleration" value: 1
where = dial "To" value: "Tau Ceti"
trip = rocket acceleration: pull to: where
readout "Years on board" value: trip.trip-on-board-years
readout "Years at home" value: trip.trip-at-home-years

## Your own
# A table of your own, pasted into the node — a first line of names, then a line a row; from a spreadsheet it comes with tabs, which are read too — and a picture of it. Wire it to anything else here: join it to a station's years, or set it beside the NO2.
mine = your-data text: "year, value\\n2021, 3\\n2022, 5\\n2023, 4\\n2024, 8\\n2025, 7"
bars "Your numbers" table: mine
\`\`\`

## How it is made

A blueprint is written in this page as text, one node a line —
\`name = kind input: value\`, where a value that names another node is a wire
from it, unless the input names a column or holds words of its own, where a
wire names the output after a dot, as \`y: dial.value\` — and the build runs it
on the same files the browser fetches, so the pictures are in the page before
any script: the first blueprint is drawn under its board, and the text of
every one is there to read. The twenty
are written in one place, each under a \`## Title\` line, with what it is about
in \`#\` lines under it, which the language reads as remarks. In the browser,
the same text becomes the canvas, and its Examples menu. A feature of the
site brings the nodes about its own data, as it brings its pages and its
tools; the frame brings the dials, the steps, the statistics and the pictures
every blueprint has.

How the site itself is built, and the rules it is held to, is
[another page](/projects/architecture/).
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
summary: How many nights a year never cool below 25 °C, and how many days reach 30 °C, at nine weather stations and in six long series since 1950, whether the second half of each record differs from the first, and Barcelona's mean temperature since 1780 and its rain since 1786.
order: 32
was: /open-data/hot-nights/
---

# Hot nights, counted

A night whose lowest temperature stays at 25 °C or above is called a torrid
night, and at 20 °C a tropical one: the house does not cool down and nobody
sleeps well. The Meteocat publishes the daily minimum of every automatic
station it runs. This counts the torrid ones, year by year, and cuts each
record in two to see whether it has moved:

::weather

The threshold slides, because what the site keeps is not the count but a
histogram of each month's days. Move it down to 20 °C and the nights are
tropical; choose another kind of day and the same page counts hot afternoons,
frost, or rain. At the end of the list are six of the Meteocat's long series,
which reach back to 1950: [the long record](#the-long-record), below, is drawn
from them.

## What is in it

- **The nights at 25 °C or more are where the Raval changes most**: 6.1 a
  year before 2016, 19.8 since.
- **Every one of the nine stations has more tropical nights in the second
  half of its record than in the first.** At Badalona, 75.1 a year became
  86.1. At the Raval, in the middle of Barcelona, 93.2 became 103.0.
- **2022 is the year with most tropical nights at four of the nine, and with
  most days at 30 °C or more at eight of them.**
- **The exception is worth as much as the rule.** The Observatori Fabra, on
  its hill above Barcelona, has fewer days at 30 °C or more in its second
  half than in its first, 33.9 against 42.3. Its first half holds the summer
  of 2003. The observatory's long series says the opposite over the very
  same years — 30.9 a year from 2003 to 2013, 39.7 from 2014 to 2025 — and
  the two part most from 2005 to 2007, when the station counted 155 such days
  and the series 62. The series is homogenised; the station is not.
- **Rain does not move the same way.** Days with 1 mm or more go slightly up
  at some stations and slightly down at others, and the largest difference
  between two halves is five days a year.

## The long record

The network's automatic stations reach back to 1988 at the most, and six of
the nine only to 2005 or later. The Meteocat's climatologists keep longer
series: a day at a time since 1950, every day checked and the whole
homogenised, so that a station moved or a thermometer replaced does not show
as a step, and blended, where one record breaks off, from the stations around
it. And one longer still: Barcelona's mean temperature, month by month, since
1780. It was put together with the University of Barcelona from the records
of the doctors who measured the city — the first of them, Francesc Salvà, in
his house in carrer de Petritxol — and from the Observatori Fabra, where most
of it comes from. Its rain goes back to 1786: by its paper's count, the
longest series of rain measured in the Iberian Peninsula.

What follows is a blueprint: the pictures are drawn by nodes wired together,
and the dials on the board turn them. Its menu holds a few more questions —
where the long line turns, the six long series side by side, the summers
since 1780, whether a warm year is a year of warm nights, and the rain since
1786.

\`\`\`::blueprint
## Barcelona, since 1780
# Barcelona's mean temperature every year since 1780, from the Meteocat's long series of the city. Under it, the Observatori Fabra since 1950, from its checked and homogenised series: the nights that did not cool below the first dial, and the days that reached the second, a bar a year. Turn the dials to 25 and 35 °C for the torrid ones.
years = barcelona-years
lines "Barcelona's mean temperature, year by year" table: years x: year y: mean
nights-from = dial "Nights from, °C" value: 20
days-from = dial "Days from, °C" value: 30
nights = weather-days station: baic0008 kind: tropical-nights threshold: nights-from
bars "Nights at the Fabra at least as warm as the first dial" table: nights x: year y: days
days = weather-days station: baic0008 kind: hot-days threshold: days-from
bars "Days at the Fabra at least as hot as the second dial" table: days x: year y: days

## Where the long line turns
# The same 246 years, cut in two at the dial's year: the straight line through the years before the cut, and the one through the years from it on, each as the change it makes a decade. Move the cut, and see how much of the change lives after it.
cut = dial "Cut at" value: 1972
years = barcelona-years
lines "Barcelona's mean temperature, year by year" table: years x: year y: mean
before = keep "Before the cut" table: years column: year is: below value: cut
after = keep "From the cut on" table: years column: year is: at-least value: cut
early = trend table: before y: mean
late = trend table: after y: mean
readout "Before the cut, each decade" value: early.per-ten unit: °C about: "along the straight line through the years before the cut"
readout "From the cut on, each decade" value: late.per-ten unit: °C about: "along the straight line through the years from the cut on"

## The six long series, side by side
# Every long series at once, a line each, named by its town, by joining the series to where they stand: the days of a kind a year, since 1950. Turn the kind on the board — tropical nights, hot days, frost.
kind = dial "Kind of day" value: tropical-nights
days = weather-days station: all-series kind: kind
names = weather-stations
named = join left: days right: names
lines "Days a year, a line a series" table: named x: year y: days split: municipality

## Summers since 1780
# One season of every year since 1780: its months kept, then a row a year, the season's mean, and the straight line through it. The dial is a list of the seasons. Winter is December to February, each December counted with its own year.
which = dial "Season" value: summer
months = barcelona-months
only = keep "Only one season" table: months column: season is: equals value: which
years = group "A year a row" table: only by: year value: mean how: mean
lines "The season's mean, year by year" table: years x: year y: mean
trend = trend table: years y: mean
readout "Each decade" value: trend.per-ten unit: °C about: "along the straight line fitted through the years"

## Is a warm year a year of warm nights?
# Barcelona's mean temperature each year against the tropical nights at the Observatori Fabra that year, since 1950: the two series joined by the year. Both rise along the years, and that alone would make them go together; a correlation says what goes with what, never why.
years = barcelona-years
nights = weather-days station: baic0008 kind: tropical-nights
both = join left: years right: nights
scatter "Tropical nights against the year's mean, a dot a year" table: both x: mean y: days
together = correlation table: both x: mean y: days
readout "r" value: together.r about: "of a year's mean temperature and its tropical nights at the Fabra"

## Rain since 1786
# Barcelona's rain every year since 1786 — by its paper's count, the longest series of rain measured in the Iberian Peninsula — and the straight line through the years from the dial's on, as the change it makes each decade. A year that misses a month has no total, and is left out.
start = dial "From" value: 1786
rain = barcelona-rain
kept = keep "From the dial's year on" table: rain column: year is: at-least value: start
lines "Barcelona's rain, year by year" table: kept x: year y: rain
trend = trend table: kept y: rain
readout "Each decade" value: trend.per-ten unit: mm about: "along the straight line fitted through the years from the dial's on"
\`\`\`

- **Barcelona has not been as warm in the 246 years of its series as in the
  last four.** The four warmest years are 2022, at 18.1 °C, 2023, 2025 and
  2024; the ten warmest are all of this century, and nine of them since 2011.
  The coldest is 1816, the year without a summer.
- **For a century, a year at 15 °C was rare.** Two years reached it before
  1880, 1798 and 1846; 26 of the hundred from 1880 to 1979; 40 of the 46
  since 1980, and every one since 1997.
- **It was nearly flat, and then it was not.** Cut at 1972, the straight line
  through the years before rises 0.05 °C a decade, and the one through the
  years after, 0.51: ten times as steep.
- **At the Observatori Fabra, tropical nights doubled**: 21.4 a year from
  1950 to 1987, 43.3 from 1988 to 2025, and 76 in 2022. Days at 30 °C or more
  went from 11.3 a year to 29.3.
- **2025 had the most torrid days and nights at the Fabra since 1950**: 14
  days at 35 °C or more, and 13 nights at 25 °C or more. Until 2003, no year
  had had more than three of either.
- **All six long series have more tropical nights and more hot days in their
  second half than in their first, and fewer frosts.** By the sea at el Prat,
  tropical nights went from 51.4 a year to 72.2; at Lleida, inland, days at
  35 °C or more from 11.2 to 22.1. 2022 has the most days at 30 °C or more of
  the record at all six.
- **Rain has no such line, but it has had its driest years.** A year's rain
  in Barcelona came to 556 mm on average over the first hundred years of the
  series, 616 over the next hundred, and 607 since 1987. Yet 2021 to 2023
  were the driest three years in a row since 1822 to 1824, and 2022, at
  308 mm, the driest single year since 1835.

## What it is not

Each station is cut in half over its own years, so two stations' halves are
different periods: a record that starts in 2009 has no flat 1990s in it, and
will look steeper for that alone. Compare a station with itself.

The network's stations are not homogenised. A sensor replaced, a screen
moved, a car park built next door: each can make a step that has nothing to
do with the climate, and nothing here corrects for it. A station is never
joined to another, even in the same town. The long series are the opposite:
the Meteocat has corrected them for exactly that, and blended stations into
them where a record broke off, which is what lets them reach back to 1950. A
long series and a station in the same place, as the two at the Observatori
Fabra, do not give the same numbers: compare a record with itself, never one
kind with the other.

A year missing more than one day in twenty is drawn as an outline and kept
out of every mean. The year still running is drawn in grey, up to the last
day the Meteocat has, and is kept out of every mean and out of both halves:
it is not over, and its days can still be corrected. The long series have no
year still running: the Meteocat adds a whole year to them once it is over.

Barcelona's series since 1780 holds a mean for each month, and a year's mean
is the mean of its twelve; its rain, a total for each month, and a year's is
the sum of its twelve, none for a year that misses one. Its first decades were read in doctors' houses,
with the instruments of their day; the Meteocat has checked and homogenised
the whole, and places it at the Observatori Fabra, 411 m up, where most of
it was measured.

The names — tropical night, torrid night — are common usage, not official
definitions. Frost is "below 0 °C" rather than "0 °C or below" because only
the first can be counted exactly from the histograms. The difference between
two halves, and the straight line through a record, describe what a record
did. They are not a forecast, and they do not say why.

## Where it comes from

This is the small version of an explorer I built in the summer of 2026, which
has every station of the network that is still reporting, humidity and a map:
[Nits de calor a Catalunya](https://david-rodenas.com/heatwave/). Here there
are nine stations and four variables, the daily series stays at its source,
and the site keeps only what it derives from it, a finished year at a time,
with the year still running asked for again every day.

The long series are the Meteocat's too: CADTEP, its daily series since 1950
([Sèries climàtiques des de
1950](https://www.meteo.cat/wpweb/climatologia/dades-i-productes-climatics/series-climatiques-des-de-1950/);
Prohom and others, 2023, in the International Journal of Climatology), and
[the climate series of Barcelona since
1780](https://www.meteo.cat/wpweb/climatologia/dades-i-productes-climatics/serie-climatica-de-barcelona-des-de-1780/):
its temperatures (Prohom, Barriendos, Aguilar and Ripoll, 2012), and its rain
since 1786 (Prohom, Barriendos and Sanchez-Lorenzo, 2015, in the
International Journal of Climatology). The site keeps them as it
keeps the stations, a finished year at a time, once the Meteocat has added
it.
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
and NOAA what its satellites, ships and buoys make of the sea; most of it is
only ever looked at a day at a time. These add it up another way. The sums are kept in this site's repository, a finished year at
a time, and the portal is asked again only when a year has ended; while you
read, nothing is fetched from anyone but this site.

- [NO2 by the hour and the month](/projects/no2/) -- thirty years of hourly measurements, averaged by hour of the day and month of the year. A city's working day turns out to have a shape, and it does not reach the top of the hill.
- [Hot nights, counted](/projects/hot-nights/) -- how many nights a year never cool below 25 °C, and how many days reach 30 °C, at nine weather stations and in six long series since 1950, whether the second half of each record differs from the first, and Barcelona's mean temperature since 1780 and its rain since 1786.
- [The sea, a day at a time](/projects/sea/) -- the temperature of the sea's surface off four stretches of the Catalan coast, every day since 1982: its mean year by year, the days it is warm, and this year beside what is usual for each day.

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

## Take it apart yourself

- [Blueprints](/projects/blueprints/) -- the weather since 1780, the air, the sea and this site's own source as nodes to wire together, the way Unreal and Unity wire their programs: sources, filters, steps, statistics and pictures, with dials to turn. Twenty to start from, the last one yours.

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
year at a time, and asks the portal for a year once it has ended — and for the
year still running once a day, which is drawn in grey: a mean of part of a
year, with the winter still to come.
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
`},{file:"projects/sea.md",markdown:`---
title: The sea, a day at a time
summary: The temperature of the sea's surface off four stretches of the Catalan coast, every day since 1982 — its mean year by year, the days it is warm, and this year beside what is usual for each day.
order: 33
---

# The sea, a day at a time

Every day, NOAA puts together the temperature of the surface of every sea
from what satellites, ships and buoys measure, on a grid of quarter degrees:
its daily Optimum Interpolation analysis, OISST. This site keeps four of its
cells, off L'Estartit, Barcelona, Tarragona and the Ebre delta, a value a
day since 1982, and the year still running up to three days ago.

What follows is a blueprint: the pictures are drawn by nodes wired together,
and the dials on the board turn them. Its menu holds a few more questions —
this year day by day, the four points side by side, and whether a warm sea
goes with warm nights.

\`\`\`::blueprint
## The sea, year by year
# The mean of each year's days off a stretch of coast, and the straight line through the whole years, as the change it makes each decade; under it, the days of each year the sea was at least as warm as the dial, faint where the year is not whole. Turn the point, and the warmth.
off = dial "Off" value: barcelona
warmth = dial "Warm from, °C" value: 26
years = sea-years point: off warm: warmth
whole = keep "Only the whole years" table: years column: whole is: equals value: yes
lines "The sea's mean, year by year" table: whole x: year y: sst
trend = trend table: whole y: sst
readout "Each decade" value: trend.per-ten unit: °C about: "the change along the straight line fitted through the whole years"
bars "Days at least as warm as the dial" table: years x: year y: warm faded: whole
warmer = trend table: whole y: warm
readout "Warm days, each decade" value: warmer.per-ten unit: days about: "the change in the days a year at least as warm as the dial"

## This year, day by day
# The year still running, day by day, beside what is usual for each day: the mean of the same day from 1991 to 2020, the thirty years climatologists take. Where the line runs over the normal, the sea was warmer than usual for the day.
off = dial "Off" value: barcelona
days = sea-days point: off
lines "This year, and the normal for each day" table: days x: day y: sst and: normal
above = summary table: days column: above
readout "Above the normal, on average" value: above.mean unit: °C about: "the mean of each day less its normal, this year so far"

## The four points, summer by summer
# The four cells side by side: the mean of each summer, June to August, a line a point, named by joining the points to their names.
months = sea-months point: all
names = sea-points
named = join left: months right: names
whole = keep table: named column: whole is: equals value: yes
summers = keep table: whole column: season is: equals value: summer
years = group "A summer a row" table: summers by: year and: name value: sst how: mean
lines "Summer's mean, a line a point" table: years x: year y: sst split: name

## Does a warm sea go with warm nights?
# The sea off Barcelona and the weather station of Badalona, by the sea, month by month. Both follow the season, and both the years; with each month less its month's mean, and less its year's, what is left is how unusual a month was, and whether an unusually warm sea went with unusually warm nights. A correlation says what goes with what, never why.
sea = sea-months point: barcelona
nights = weather-months station: WU
both = join left: sea right: nights
whole = keep "Months measured whole" table: both column: whole is: equals value: yes
seasonless = season "Less each month's mean" table: whole by: month
odd = season "Less each year's mean too" table: seasonless by: year
measured = correlation table: whole x: sst y: tn
left = correlation table: odd x: sst y: tn
readout "As measured" value: measured.r about: "r of the sea's monthly mean and the mean night, month by month"
readout "The season and the years taken out" value: left.r about: "r of what is left of each"
scatter "What is left of each month: the sea against the nights" table: odd x: sst y: tn colour: season
\`\`\`

## What is in it

- **The sea is warmer at all four points than when the record starts.** Off
  Barcelona, the mean of a year's days was 17.6 °C over 1982–1991 and 19.1 °C
  over 2016–2025. The straight line through the whole years rises between
  0.38 and 0.45 °C a decade at the four points, and the summers' between 0.50
  and 0.63.
- **Days at 26 °C or more have gone from rare to usual, except in the
  north.** Off Barcelona there were 1.3 a year over 1982–1991 and 34.7 over
  2016–2025, and 2025 had 68; off the Ebre delta, 14.9 became 50.2, and 2025
  had 87. Off L'Estartit, the coolest of the four, the sea seldom gets there:
  four days in 2006, its most.
- **The warmest year was 2025 off Barcelona, and 2022 off the other three.**
  The warmest day off Barcelona was 23 August 2023, at 28.73 °C; off
  Tarragona and the Ebre delta, 10 August 2003.
- **A warm sea goes with warm nights.** Off Barcelona, against the nights at
  Badalona, month by month, with the season and the years taken out, r is
  0.45, and 0.76 in summers alone: a month whose sea was warmer than usual for
  its season and its year had warmer nights than usual too. The other pairs
  of a point and a station by the sea point the same way.

## What it is not

A cell is about 25 km across, and is the open sea off a place, not the water
at its beach: the one off Barcelona has its centre some fifteen kilometres
out. OISST is an analysis, not a thermometer — where there is no measurement,
the grid is filled in from what is around it — and the dataset itself warns
that values less than fifteen days old may still be revised. A finished year
is kept only from the middle of the following January, once they are not.

Every figure above is of the whole years, 1982 to 2025. The year still
running is drawn day by day in the blueprint's second question, beside its
normal, and is kept out of every one of them: it is not over, and its last
fifteen days can still change. A trend is the straight line through the whole
years, and says what the record did, not what it will do, nor why; a
correlation says what goes with what, never why.

## Where it comes from

NOAA's daily Optimum Interpolation Sea Surface Temperature, version 2.1
(Huang and others, 2021), from the server of NOAA's Physical Sciences
Laboratory: data provided by the NOAA PSL, Boulder, Colorado, USA, from their
website at [psl.noaa.gov](https://psl.noaa.gov/data/gridded/data.noaa.oisst.v2.highres.html).
The site keeps the days of four cells, a finished year at a time, and asks
for the year still running again every day; the weather beside it is the
Meteocat's, as on [the page of hot nights](/projects/hot-nights/).
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
`},{file:"research/coverage-generated.md",markdown:`---
title: Coverage, generated
summary: 2023. A program that knows nothing of what the code is for wrote the tests, and reached 85% code coverage, more than most companies ask for. Why coverage helps the programmer, and says nothing to a manager.
order: 6
---

# Coverage, generated

Code coverage counts the lines the tests run. For a programmer it is a good
question to ask: a line no test runs is a line no test checks, and a change
there breaks something nobody sees. It also became a target. Many companies
ask for 80% before code can ship, and that second use is the one this
experiment was about.

A test can run a line without checking it. \`addition(3, 4)\` covers all of
\`return a + b\`, and passes just as well once it has become \`a - b\`. In a small
program that shows; in a large one, nobody finds the test that asserts
nothing. And covering code takes two rules only: run every method, and run
every branch. Neither needs to know what the code is for. Allen Holub had put
it that way: tests that call every method with random arguments would reach
the 80% so many companies ask for.

So I wrote them. The first version, in Java, made an instance of every class
with a public constructor that took no arguments, and called every method
that took none: 11%. It became a final-degree project, which Gerard Torrent
took on: instead of one test that walks through everything, a generator that
writes a test for every method and its arguments, and builds whatever objects
those need. Step by step, coverage went:

\`\`\`bars
code coverage, by tests that know nothing of the business
= 80 :: what many companies ask for
my first version :: 11 | 11%
every constructor called, with nulls :: 20 | 20%
the public methods that return nothing :: 23 | 23%
every public method :: 50 | 50%
every method, the private ones too :: 50 | 50%
the arguments built, not null :: 65 | 65%
what those arguments need, built too :: 69 | 69%
three values for every argument :: 69 | 69%
Spring building whatever it can :: 85 ! | 85%
\`\`\`

Calling private methods from a test is a bad habit; it was tried only to see
what it would add, and it added nothing.

Eighty-five per cent, without a line that knows what the program is for, and
without any AI. People under a deadline meet a coverage target the same way.
A developer I met at a meetup told me how his team, which had no tests, had
to reach the 60% the FDA required: they started with tests worth having,
and ended writing whatever raised the number, for three months. And I once
opened a team's tests, written to meet their company's 80%, broke the code on
purpose, and watched them pass.

So coverage is for the programmer: where it is low, there is code no test
runs, and that is worth a look, as
[Martin Fowler has long said](https://www.martinfowler.com/bliki/TestCoverage.html).
As a number for a manager to ask for, it measures only that the code was run.
What says a test is worth something is seeing it fail first, which writing it
first gives, and checking something the business needs.

The whole story is on Medium:
[*Confirmed: Code Coverage Is a Useless Management Metric*](https://medium.com/@drpicox/confirmed-code-coverage-is-a-useless-management-metric-35afa05e8549),
8 July 2023.
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
summary: A PhD on making parallel hardware usable by people who are not parallel programmers. Runtimes, a simulator, a compiler, and then graph matching on a GPU; and two experiments since, on code coverage and on the language of a question to an AI.
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

## Since

Two experiments I ran later, and wrote up on Medium:

- [Coverage, generated](/research/coverage-generated/) -- 2023. A program that knows nothing of what the code is for wrote the tests, and reached 85% code coverage: why coverage helps the programmer, and says nothing to a manager.
- [The language of the question](/research/language-of-the-question/) -- 2025. The same questions to the same AI in five languages, and answers that did not agree.

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
`},{file:"research/language-of-the-question.md",markdown:`---
title: The language of the question
summary: 2025. The same questions to the same AI in Catalan, Spanish, English, French and Dutch, and answers that did not agree. On dubbing, each language took its own side; on tourism, the most concrete answers were not in English.
order: 7
---

# The language of the question

The same question, asked of the same AI in two languages, can get two answers
that do not agree. I first saw it with ChatGPT 3.5, shortly after it came out
in 2022, and I went back to it in 2025, with Claude, as an experiment.

## A song at the Oscars

At the 2020 Oscars, *Into the Unknown*, from *Frozen II*, was sung in several
of the languages it had been dubbed into, and two of them were Spanish: the
Latin American one, and the one made in Spain, named Castilian. In Spain it
was a row: to many, the language of the whole country had been given the name
of one of its regions. Elsewhere, many did not see why one language needed
two dubs. And Spain has more languages than one: *Frozen* had been dubbed into
Catalan as well.

I asked ChatGPT 3.5 about it, in English, then in Castilian, then in Catalan,
each in a new conversation. In English, the answer was cold and neutral:
practicality, and respect for different cultures. In Castilian, it justified
dubbing the film again for Spain, and called dubbing into Catalan
economically unviable. In Catalan, it defended the diversity of languages and
cultures. I had seen the row read one way or the other depending on the
language of the newspaper or the channel, and the answers did the same.

## The experiment

In 2025 I did it again, as methodically as I could, with Claude: the same
eight questions in five languages, Catalan, Spanish, English, French and
Dutch. Why films already dubbed into Latin American Spanish are dubbed again
for Spain, when Spanish audiences understand them; why the same does not
happen between American and British English; and why Catalan, with more
than ten million speakers, has so little dubbing, and how it compares with
European languages of its size.

| | English | Spanish | Dutch | Catalan | French |
| --- | --- | --- | --- | --- | --- |
| Technical specificity | ★★★★★ | ★★☆☆☆ | ★★★★☆ | ★★★☆☆ | ★★★★☆ |
| Main cause of re-dubbing for Spain | Cultural identity and economics | Infrastructure and the Franco era | Cultural preferences | Editorial control | Cultural localisation |
| Economic viability threshold | 15 million speakers or more | Not specified | Depends on state support | A loyal audience is enough | A complex cost-benefit |
| Main obstacle for Catalan | Market size, and multilingualism | Economy and infrastructure | Bilingualism and economy | Lack of political will | The bilingual reality |
| European comparison | Norwegian, Danish, Finnish, Czech | Flemish, Swiss German | Dutch, Swedish, Czech | Dutch, Swedish, Czech | Monolingual languages |
| Proposed solution | Institutional support and economics | Gradual evolution | Language policies | Political will and quotas | Break the vicious circle |
| Catalan dubbing, viable? | Sceptical: structural | Pessimistic: economic | Possible, with support | Viable, with the will | Difficult, being bilingual |
| Main emphasis | Quantitative data | Historical context | Systematic comparison | The political dimension | Market analysis |

The bias of 2022 was still there. In Spanish the answers were the most
defensive, in Catalan the most demanding; in English the most neutral and
technical; in Dutch the most understanding.

## A question less divided

Spain is polarised on its languages, and the models are trained mostly in
English, so the bias could be only that: less fluency outside English, not a
different culture. So I asked about something less divided, and closer to
places that do not speak English: tourism. Five questions, in the same five
languages: how a historic city balances the money of tourism with the life of
the people who live in it, how to regulate tourist flats, when to limit
access, how to keep public transport running through the high season, and how
to spread visitors across a city.

| | Catalan | English | Dutch | French | Spanish |
| --- | --- | --- | --- | --- | --- |
| Technical specificity | ★★★★★ | ★★☆☆☆ | ★★★★☆ | ★★★☆☆ | ★★★☆☆ |
| Concrete data | 10–15%, progressive taxes | Few specific data points | 5–10%, 3–7 days | 120 nights a year, Paris | General percentages |
| Lived experience | High: real management | Low: principles | Medium: Amsterdam | High: multiple examples | Medium: some experience |
| Solution approach | Immediate implementation | General philosophy | Structured systems | Comparative analysis | Practical measures |
| Type of measures | Very specific | Conceptual | Systematic | Descriptive of what exists | General |
| Priorities | Local residents | A general balance | Residents first | Heritage and balance | Sustainability |
| Preferred instruments | Taxes, limits, control | Management principles | Regulation and incentives | Zoning and examples | Quotas and moratoriums |

This time the most concrete answers were in Catalan: a maximum of 10–15% of
tourist flats in a block or a neighbourhood, moratoriums on new licences in
saturated areas, licences tied to living in the town, higher taxes for owners
of several. In English, principles: tourist taxes, quotas, balance. Spanish
stood between the two. So English is not simply where the model answers best.
My reading is that Barcelona lives with the pressure of tourism, and what it
has had to learn is written in Catalan.

## What it means

The language of a question changes the answer, and it is worth knowing the
cultural context of the one you ask in. It is also a way in: ask in the
language of the place that knows most about the subject.

The whole experiment is on Medium:
[*AI Speaks Different Languages — And Thinks Differently in Each One*](https://medium.com/@drpicox/ai-speaks-different-languages-and-thinks-differently-in-each-one-866bed739feb),
21 June 2025.
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
`}],nu="---";function jS(t){return(/^"(.*)"$/.exec(t)??/^'(.*)'$/.exec(t))?.[1]??t}function NS(t){const e=t.replace(/\r\n?/g,`
`).split(`
`);if(e[0]?.trim()!==nu)return{fields:{},body:t.trim()};const n=e.indexOf(nu,1);if(n<0)return{fields:{},body:t.trim()};const s={};for(const a of e.slice(1,n)){const o=a.indexOf(":");o<=0||(s[a.slice(0,o).trim()]=jS(a.slice(o+1).trim()))}return{fields:s,body:e.slice(n+1).join(`
`).trim()}}function LS(t){const n=t.replace(/\.md$/,"").replace(/(^|\/)index$/,"");return n===""?"/":`/${n}/`}function su(t){if(t==="/")return"/";const e=t.slice(0,-1);return e.slice(e.lastIndexOf("/")+1)}function PS(t){if(t==="/")return null;const e=t.slice(0,-1);return e.slice(0,e.lastIndexOf("/")+1)}function FS(t){const{fields:e,body:n}=NS(t.markdown),s=LS(t.file);return{file:t.file,route:s,parent:PS(s),name:su(s),title:e.title??su(s),summary:e.summary??"",order:Number(e.order??"100"),body:n,fields:e}}function BS(t){return t.endsWith("/")?t:`${t}/`}function au(t,e){return t.order-e.order||t.name.localeCompare(e.name)}class RS{byRoute;linked;constructor(e){const n=e.map(FS),s=n.filter(a=>!a.fields.link).sort(au);this.byRoute=new Map(s.map(a=>[a.route,a])),this.linked=new Map(n.flatMap(a=>{const o=this.byRoute.get(BS(a.fields.link??""));return!a.fields.link||!o?[]:[[a.route,{...o,parent:a.parent,name:a.name,order:a.order,link:a.route}]]}))}get links(){return[...this.linked.values()].map(e=>({from:e.link,to:e.route}))}get pages(){return[...this.byRoute.values()]}at(e){const n=this.linked.get(e);return this.byRoute.get(n?n.route:e)}childrenOf(e){return[...this.pages,...this.linked.values()].filter(n=>n.parent===e).sort(au)}trailTo(e){const n=this.at(e);return n?n.parent===null?[n]:[...this.trailTo(n.parent),n]:[]}}const Dt=new RS(CS),ys="off",hs=t=>[...t.choices??["on"],ys];function Ti(t,e){return t.choices?t.choices.find(n=>e.isOn(`${t.name}=${n}`))??ys:e.isOn(t.name)?"on":ys}function DS(t,e,n){if(!t.choices)return e.set(t.name,n==="on");for(const s of t.choices)e.set(`${t.name}=${s}`,s===n)}const WS=t=>`${t.slice(0,-1).join(", ")} or ${t.at(-1)}`;function ou(t,e){if(t.length===0)return{text:"No flags to try just now."};const n=Math.max(...t.map(i=>i.name.length)),s=t.map(i=>hs(i).map(l=>l===Ti(i,e)?`[${l}]`:` ${l} `).join("")),a=Math.max(...s.map(i=>i.length)),o=t.map((i,l)=>`${i.name.padEnd(n)}  ${s[l].padEnd(a)}  ${i.description}`),r=t.map(i=>{const l=hs(i).map(h=>h===Ti(i,e)?`<strong aria-current="true">${M(h)}</strong>`:`<a href="#" data-run="flags ${i.name} ${h}" title="flags ${i.name} ${h}">${M(h)}</a>`).join(" ");return`<dt>${M(i.name)} <span class="switch">${l}</span></dt><dd>${M(i.description)}</dd>`});return{text:o.map(i=>i.trimEnd()).join(`
`),html:`<dl class="help flags">${r.join("")}</dl>`}}function HS(t,e){return{name:"flags",usage:"flags [name [on|off|a choice]]",description:"list the trials this site can be switched into, or switch one",run(n,[s,a]){if(s===void 0)return ou(t,e);const o=t.find(r=>r.name===s);return o?a!==void 0&&!hs(o).includes(a)?{text:`flags: ${s}: choose ${WS(hs(o))}`,error:!0}:(DS(o,e,a??(Ti(o,e)===ys?hs(o)[0]:ys)),ou(t,e)):{text:`flags: ${s}: no such flag. Try flags`,error:!0}}}}function qS(t,e,n){return t.flatMap(s=>{if(s.trial===void 0||s.choices||e.chosen(s.name))return[];let a=e.drawn(s.name);return a===void 0&&(a=n()<s.trial,e.draw(s.name,a)),[{name:s.name,on:a}]})}function zS(t,e){const n=new URLSearchParams(e),s={};for(const{name:a,choices:o}of t){const r=n.get(a);if(r!==null){if(!o)(r==="on"||r==="off")&&(s[a]=r==="on");else if(r==="off"||o.includes(r))for(const i of o)s[`${a}=${i}`]=i===r}}return s}function GS(t){if(t.includes("--help"))return{help:!0};const e={};for(let n=0;n<t.length;n+=1){const s=t[n]??"";if(!s.startsWith("--"))return{error:`${s}: options are written --name value`};const a=s.indexOf("=");if(a>0){e[s.slice(2,a)]=s.slice(a+1);continue}const o=t[n+1];if(o===void 0)return{error:`${s} needs a value`};e[s.slice(2)]=o,n+=1}return{given:e}}const _S=t=>"choices"in t?t.choices.map(bn).join("|"):"n",US=t=>"choices"in t?bn(t.initial):`${t.min} to ${t.max}, ${t.initial}`;function YS(t){const e=[t.name,...t.parameters.map(a=>`[--${a.name} ${_S(a)}]`)].join(" "),n=Math.max(...t.parameters.map(a=>a.name.length+2)),s=t.parameters.map(a=>`  ${`--${a.name}`.padEnd(n)}  ${a.description} (${US(a)})`);return[e,`  ${t.summary}`,"",...s].join(`
`)}function JS(t){return{name:t.name,usage:`${t.name} [--help] [--option n]...`,description:t.summary,run(e,n){const s=GS(n);if("help"in s)return{text:YS(t)};const a="error"in s?s:rl(t,s.given);if("error"in a)return{text:`${t.name}: ${a.error}`,error:!0};const o=t.run(a.values);return{text:o.text,html:`<div class="app program-out">${o.html}</div>`}}}}function KS(t){return[...t.flatMap(e=>e.commands??[]),...t.flatMap(e=>e.programs??[]).map(JS)]}const VS=40,XS=8;function ZS(t){const e=new Map;for(const n of t.kinds.values())e.set(n.shelf,[...e.get(n.shelf)??[],`${n.name}(${n.inputs.map(s=>s.name).join(", ")})`]);return[...e].map(([n,s])=>`${n}: ${s.join(", ")}`).join(". ")}const ru=t=>typeof t=="number"&&Number.isFinite(t)?Number(t.toPrecision(5)):t;async function QS(t,e,n){const{blueprint:s}=Mn(t,e),a=new Map,o=i=>{if(!a.has(i))throw new ro(i);const l=a.get(i);if(l==null)throw new Error(`there is no ${i}`);return l};let r=ai(s,e,{read:o});for(let i=0;i<XS;i+=1){const l=[...new Set([...r.values()].flatMap(h=>h.state==="waiting"?[h.path]:[]))];if(l.length===0)break;await Promise.all(l.map(h=>n(h).then(c=>{a.set(h,c)},()=>{a.set(h,null)}))),r=ai(s,e,{read:o},r)}return{blueprint:s,evaluation:r}}function eA(t){return{name:"blueprint",description:`Runs a blueprint: a small dataflow program over this site's data — the Meteocat's weather stations, the Generalitat's NO2 measuring points, this site's own source code as a graph and its history, and its simulations — written as text, one node a line: \`name = kind "Title" input: value input: value\`. A value that names another node, or \`node.output\`, is a wire from it; other values are written as they are, quoted if they have spaces. Tables flow along most wires, so the steps, statistics and pictures work on every source alike. For example: \`heat = weather-months station: WU\` / \`air = no2-months station: 08015021\` / \`both = join left: heat right: air\` / \`season = season table: both by: month\` / \`correlation table: season x: tx y: no2\`. Answers with what each node said, the numbers it gave, and the tables it drew, and can show it to the reader on the blueprints page. The kinds: ${ZS(t)}.`,inputSchema:{type:"object",properties:{text:{type:"string",description:"the blueprint, one node a line, as in the examples on /projects/blueprints/"}},required:["text"],additionalProperties:!1},readOnly:!0,shows:!0,async answer(e,{site:n,read:s}){const a=String(e.text??""),{problems:o}=Mn(a,t);if(o.length>0)return{refused:o.map(d=>`line ${d.line}: ${d.message}`).join("; ")};const{blueprint:r,evaluation:i}=await QS(a,t,s);if(r.nodes.length===0)return{refused:"the blueprint has no nodes: write one a line, as `heat = weather-months station: WU`"};const l=r.nodes.map(d=>{const u=t.kinds.get(d.kind),m=i.get(d.id),f=Gt(m,d.kind),p=m?.state==="done"?Object.fromEntries(Object.entries(m.outputs).filter(([,g])=>typeof g=="number").map(([g,v])=>[g,ru(v)])):{},w=u?.role==="paint"&&m?.state==="done"?m.inputs.table:void 0;return{id:d.id,kind:d.kind,...d.title&&{title:d.title},[f.trouble?"problem":"said"]:f.said,...Object.keys(p).length>0&&{numbers:p},...w?.columns&&{table:{columns:w.columns.map(g=>g.unit?`${g.name} (${g.unit})`:g.name),rows:w.rows.slice(0,VS).map(g=>w.columns.map(v=>ru(g[v.name]??null))),totalRows:w.rows.length}}}}),h=r.nodes.flatMap(d=>{const u=t.kinds.get(d.kind)?.role,m=Gt(i.get(d.id),d.kind);return u==="paint"||u==="statistic"||m.trouble?[`${d.title??d.id}: ${m.said}`]:[]}),c=io(n,"blueprint")?.route;return{summary:h.join("; ")||"The blueprint ran; nothing in it paints or sums up.",data:{nodes:l},...c!==void 0&&{route:c},show:{app:"blueprint",values:{text:a}}}}}}function tA(t){const e=`${t.label}: ${t.description}`;return"choices"in t?{type:"string",enum:t.choices,default:t.initial,description:e}:{type:"number",minimum:t.min,maximum:t.max,default:t.initial,description:e}}function nA(t){return{type:"object",properties:Object.fromEntries(t.parameters.map(n=>[n.name,tA(n)])),required:[],additionalProperties:!1}}function sA(t){return{name:t.name,description:`${t.summary}.`,inputSchema:nA(t),readOnly:!0,shows:!0,answer(e,{site:n}){const s=rl(t,e);if("error"in s)return{refused:s.error};const{text:a,data:o}=t.run(s.values),r=io(n,t.name)?.route;return{summary:a,data:o,...r!==void 0&&{route:r},show:{app:t.name,values:s.values}}}}}function aA(t){return[...t.flatMap(e=>e.programs??[]).map(sA),...t.flatMap(e=>e.tools??[]),eA(qf(t))]}function iu(){const t=tt.flatMap(b=>b.flags??[]),e=new cT;for(const[b,k]of Object.entries(zS(t,window.location.search)))e.set(b,k);const n=qS(t,e,Math.random),s=b=>`${b.name}-${b.on?"on":"off"}`;for(const b of n)is(rs("trial",s(b)));document.addEventListener("click",b=>{const k=b.target?.closest("main a[href]");if(!k||window.location.pathname!=="/"||n.length===0)return;const x=k.host===window.location.host?k.pathname:k.href;for(const T of n)is(rs(s(T),"open",x))},{capture:!0});const a=[...Df,...KS(tt),HS(t,e)],o=b=>e.isOn(b),r={...hT(tt),blueprint:TS(qf(tt),o,()=>KM(tt,o))},l=(b=>b.endsWith("/")?b:`${b}/`)(window.location.pathname),h=Dt.at(l);let c=Pd(r,{site:Dt}),d=qd(document),u=null;const m=hM(Dt,(b,k)=>{c(),c=Pd(r,{site:Dt}),d(),d=qd(document);for(const x of tt)x.arrive?.(b);k||u?.moveTo(b.route)});if(u=RM(Dt,h?l:"/",{moveTo:b=>m(b,{keep:!0}),clearPage:()=>{c(),c=()=>{},d(),d=()=>{},document.querySelector("main")?.replaceChildren()},commands:a,heard:b=>is(rs("command",a.some(k=>k.name===b)?b:"unknown"))}),h)for(const b of tt)b.arrive?.(h);const w={run:b=>{u?.run(b)}};for(const b of tt)b.install?.(w,{site:Dt});const g=[...IS,...aA(tt)],v=b=>fetch(b).then(k=>k.ok?k.text():Promise.reject(new Error(`${b}: ${k.status}`)));JM(dT(),{tools:g,site:Dt,origin:window.location.origin,read:v,goTo:b=>m(b),run:b=>u?.run(b)??[]})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",iu):iu();
