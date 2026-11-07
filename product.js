(function(){const A=window.PT.app,$=s=>document.querySelector(s);const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const mb=$('.menu'),lk=$('.links');if(mb){mb.onclick=()=>{const o=lk.classList.toggle('open');mb.setAttribute('aria-expanded',o)}}
const tabs=$('#wtabs'),view=$('#wview');let tab=0,user=false;
function fit(){const s=view.querySelector('.scl');if(s)s.style.transform=`scale(${innerWidth<=640?.54:view.clientWidth/1200})`}
function render(){const P=A.tabs[tab];tabs.innerHTML=A.tabs.map((t,i)=>`<button type="button" class="${i===tab?'on':''}" data-t="${i}">${esc(t.label)}</button>`).join('');
 view.innerHTML=`<div class="shot"><div class="scl">${P.html}</div>${P.hs.map(([x,y,t])=>`<button type="button" class="hs ${x<25?'l':x>75?'r':''} ${y<22?'b':''}" style="left:${x}%;top:${y}%;background:${A.color}" aria-label="${esc(t)}"><span>${esc(t)}</span></button>`).join('')}</div>`;fit();
 tabs.querySelectorAll('button').forEach(b=>b.onclick=()=>{user=true;tab=+b.dataset.t;render()});
 view.querySelectorAll('.hs').forEach(h=>h.onclick=()=>view.querySelectorAll('.hs').forEach(x=>x.classList.toggle('show',x===h&&!x.classList.contains('show'))));
 const f=view.querySelector('.hs');if(f&&!user&&!reduce){setTimeout(()=>f.classList.add('show'),700);setTimeout(()=>f.classList.remove('show'),3400)}}
render();addEventListener('resize',fit);
if(!reduce)setInterval(()=>{if(user||document.hidden)return;tab=(tab+1)%A.tabs.length;render()},5000);
$('#win').addEventListener('pointerenter',()=>user=true);
setInterval(()=>{document.querySelectorAll('[data-tick]').forEach(e=>{const v=+e.dataset.tick+Math.random()*.02;e.dataset.tick=v;e.textContent=v.toFixed(+(e.dataset.dec||0))})},1500);
})();
