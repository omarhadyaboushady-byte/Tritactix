/* Tritactix homepage */
(function(){
const T=window.T,IC=T.icons,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* mobile menu */
const mb=$('.menu'),lk=$('.links');if(mb){mb.onclick=()=>{const o=lk.classList.toggle('open');mb.setAttribute('aria-expanded',o)};lk.querySelectorAll('a').forEach(a=>a.onclick=()=>{lk.classList.remove('open');mb.setAttribute('aria-expanded',false)})}
/* hero audience */
(function(){const bs=$$('#who button');if(!bs.length)return;let cur=0,user=false;
function go(i){cur=i;bs.forEach((b,j)=>{b.classList.toggle('on',j===i);b.setAttribute('aria-pressed',j===i)});const d=T.who[i];
 ['whoB','whoT'].forEach((id,k)=>{const e=document.getElementById(id);e.style.opacity=0;setTimeout(()=>{e.textContent=d[k];e.style.opacity=1},200)});
 const c=$('#whoCta');c.textContent=d[2];c.href=d[5]>=0?'#products':'#cases';c.dataset.app=d[5];c.dataset.case=d[6]??'';
 ['w1','w2','w3'].forEach((id,k)=>{const im=document.getElementById(id);im.style.opacity=0;setTimeout(()=>{im.setAttribute('href',T.hero[i][k]);im.style.opacity=1},300+k*90)});
 const t=$('#tag1');t.style.opacity=0;setTimeout(()=>{const img=t.querySelector('img');img.src=d[3];img.className=d[3]===IC.k?'kt':'';t.querySelector('b').textContent=d[0].split(' +')[0];t.querySelector('span').textContent=d[4];t.style.opacity=1},300)}
 bs.forEach((b,i)=>b.onclick=()=>{user=true;go(i)});if(!reduce)setInterval(()=>{if(!user&&!document.hidden)go((cur+1)%bs.length)},5000);
 $('#whoCta').addEventListener('click',e=>{const a=+e.currentTarget.dataset.app,cs=e.currentTarget.dataset.case;if(a>=0)setTimeout(()=>openApp(a,true),400);else if(cs!=='')setTimeout(()=>$$('#csTabs button')[+cs].click(),400)});})();
/* hero parallax */
const art=$('#haArt');if(art&&!reduce){const ts=[...art.querySelectorAll('.t')];addEventListener('pointermove',e=>{if(innerWidth<1000)return;const r=art.getBoundingClientRect(),x=(e.clientX-(r.left+r.width/2))/r.width,y=(e.clientY-(r.top+r.height/2))/r.height;ts.forEach(t=>{const d=+t.dataset.d;t.style.transform=`translate(${x*d*-26+d*Math.abs(x)*10}px,${y*16+d*Math.abs(y)*30}px)`})},{passive:true})}
/* products: app window */
const APPS=T.apps,dock=$$('#dock button'),win=$('#win'),tabs=$('#wtabs'),view=$('#wview');let app=0,tab=0,idle=true;
function render(){const A=APPS[app],P=A.tabs[tab];win.style.setProperty('--accent',A.color);win.style.setProperty('--tint',A.tint);
 const wi=$('#wicon');wi.src=A.icon;wi.className=A.k?'kt':'';$('#wname').textContent=A.name;$('#wtag').textContent=A.tag;const wl=$('#wlink');wl.textContent=A.linkText;wl.href=A.href;
 tabs.innerHTML=A.tabs.map((t,i)=>`<button type="button" class="${i===tab?'on':''}" data-t="${i}">${esc(t.label)}</button>`).join('');
 view.innerHTML=`<div class="shot">${P.img?`<img src="${P.img}" alt="${esc(A.name+' · '+P.label)}" loading="lazy">`:P.html}${P.hs.map(([x,y,txt])=>`<button type="button" class="hs ${x<25?'l':x>75?'r':''} ${y<22?'b':''}" style="left:${x}%;top:${y}%;background:${A.color}" aria-label="${esc(txt)}"><span>${esc(txt)}</span></button>`).join('')}</div>`;
 tabs.querySelectorAll('button').forEach(b=>b.onclick=()=>{idle=false;tab=+b.dataset.t;render()});
 view.querySelectorAll('.hs').forEach(h=>h.onclick=()=>view.querySelectorAll('.hs').forEach(x=>x.classList.toggle('show',x===h&&!x.classList.contains('show'))));
 const f=view.querySelector('.hs');if(f&&idle&&!reduce){setTimeout(()=>f.classList.add('show'),700);setTimeout(()=>f.classList.remove('show'),3600)}}
function openApp(i,scroll){app=i;tab=0;dock.forEach((d,j)=>{d.classList.toggle('on',j===i);d.setAttribute('aria-pressed',j===i)});win.style.animation='none';void win.offsetWidth;win.style.animation='';render();if(scroll)$('#desk').scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'})}
dock.forEach((d,i)=>d.onclick=()=>{idle=false;openApp(i)});openApp(0);
$$('.lu').forEach(b=>b.onclick=()=>{idle=false;openApp(+b.dataset.app,true)});
let visD=false;new IntersectionObserver(e=>visD=e[0].isIntersecting).observe($('#desk'));
if(!reduce)setInterval(()=>{if(!idle||!visD||document.hidden)return;const A=APPS[app];if(tab<A.tabs.length-1){tab++;render()}else openApp((app+1)%APPS.length)},4500);
$('#desk').addEventListener('pointerenter',()=>idle=false);
/* capability drawings */
const arts=$$('.cc canvas').map(c=>({c,x:c.getContext('2d'),k:+c.dataset.art}));
function sz(){arts.forEach(a=>{const r=a.c.getBoundingClientRect(),d=Math.min(2,devicePixelRatio||1);a.w=r.width;a.h=r.height;a.c.width=r.width*d;a.c.height=r.height*d;a.x.setTransform(d,0,0,d,0,0)})}sz();addEventListener('resize',sz);
const FP=Array.from({length:260},()=>({x:Math.random(),y:Math.random()}));
function draw(a,t){const g=a.x,W=a.w,H=a.h;if(!W)return;
 if(a.k===0){g.fillStyle='rgba(245,242,235,.16)';g.fillRect(0,0,W,H);const tx=W*.72,ty=H*.35;FP.forEach(p=>{const px=p.x*W,py=p.y*H,ang=Math.atan2(ty-py,tx-px)+Math.sin(px*.012+t*.6)*1.1;const nx=px+Math.cos(ang)*1.4,ny=py+Math.sin(ang)*1.4;g.strokeStyle=Math.hypot(tx-px,ty-py)<70?'#FF6B16':'rgba(16,17,18,.35)';g.beginPath();g.moveTo(px,py);g.lineTo(nx,ny);g.stroke();p.x=nx/W;p.y=ny/H;if(Math.hypot(tx-nx,ty-ny)<6){p.x=Math.random();p.y=Math.random()}});g.fillStyle='#FF6B16';g.beginPath();g.arc(tx,ty,5,0,7);g.fill()}
 else if(a.k===1){g.fillStyle='#F5F2EB';g.fillRect(0,0,W,H);const s=30;g.strokeStyle='rgba(16,17,18,.08)';for(let x=0;x<W;x+=s){g.beginPath();g.moveTo(x,0);g.lineTo(x,H);g.stroke()}for(let y=0;y<H;y+=s){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke()}
  for(let i=0;i<14;i++){const sd=i*97.3,p=(t*.3+i*.137)%1;g.strokeStyle=i%4===0?'#FF6B16':'#101112';g.lineWidth=2;g.beginPath();if(i%2){const y=Math.floor((Math.sin(sd)*.5+.5)*H/s)*s,x=p*W;g.moveTo(x-50,y);g.lineTo(x,y)}else{const x=Math.floor((Math.cos(sd)*.5+.5)*W/s)*s,y=p*H;g.moveTo(x,y-50);g.lineTo(x,y)}g.stroke()}g.lineWidth=1}
 else if(a.k===2){g.fillStyle='#F5F2EB';g.fillRect(0,0,W,H);const n=Math.floor(W/12);for(let i=0;i<n;i++){const h=(Math.sin(i*.35+t*1.4)*.5+.5)*(Math.sin(i*.09-t*.5)*.3+.7)*H*.8;g.fillStyle=i%6===0?'#FF6B16':`rgba(16,17,18,${.12+h/H*.6})`;g.fillRect(i*12+2,H-h,8,h)}}
 else{g.fillStyle='#F5F2EB';g.fillRect(0,0,W,H);const ox=W*.5,oy=H*1.05;for(let i=0;i<10;i++){const r=(t*40+i*50)%500;g.strokeStyle=i%3===0?`rgba(255,107,22,${1-r/500})`:`rgba(16,17,18,${(1-r/500)*.5})`;g.lineWidth=i%3===0?2.5:1;g.beginPath();g.moveTo(ox,oy-r*1.1);g.lineTo(ox-r,oy);g.lineTo(ox+r,oy);g.closePath();g.stroke()}g.lineWidth=1}}
(function loop(ms){arts.forEach(a=>{const r=a.c.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)draw(a,reduce?2:ms/1000)});if(!reduce)requestAnimationFrame(loop)})(0);
/* case studies */
(function(){const CS=T.cases,st=$('#csStage'),tb=$$('#csTabs button');let ci=0,gi=0,gt;
function draw(){const c=CS[ci];st.innerHTML=`<div class="cs-gal"><div class="cs-main">${c.imgs.map((s,i)=>`<img src="${s}" class="${i===gi?'on':''}" alt="${esc(c.caps[i])}" loading="lazy">`).join('')}<span class="cs-cap">${esc(c.caps[gi])}</span></div>${c.imgs.length>1?`<div class="cs-thumbs">${c.imgs.map((s,i)=>`<button type="button" class="${i===gi?'on':''}" data-g="${i}" aria-label="${esc(c.caps[i])}"><img src="${s}" alt="" loading="lazy"></button>`).join('')}</div>`:''}</div>
<div class="cs-info"><small>${esc(c.kind)}</small><h3>${esc(c.client)}</h3><div class="cs-blk"><span>${T.l.chal}</span><p>${esc(c.chal)}</p></div><div class="cs-blk"><span>${T.l.deliv}</span><ul>${c.deliv.map(d=>`<li>${esc(d)}</li>`).join('')}</ul></div><div class="cs-out"><span>${T.l.out}</span><p>${esc(c.out)}</p></div>${c.href?`<a class="cs-more" href="${c.href}">${T.l.more}</a>`:''}</div>`;
 st.querySelectorAll('.cs-thumbs button').forEach(b=>b.onclick=()=>{gi=+b.dataset.g;swap();clearInterval(gt)});clearInterval(gt);if(!reduce&&c.imgs.length>1)gt=setInterval(()=>{gi=(gi+1)%c.imgs.length;swap()},3500)}
function swap(){st.querySelectorAll('.cs-main img').forEach((m,i)=>m.classList.toggle('on',i===gi));st.querySelectorAll('.cs-thumbs button').forEach((m,i)=>m.classList.toggle('on',i===gi));st.querySelector('.cs-cap').textContent=CS[ci].caps[gi]}
tb.forEach((t,i)=>t.onclick=()=>{ci=i;gi=0;tb.forEach(x=>{x.classList.toggle('on',x===t);x.setAttribute('aria-pressed',x===t)});st.classList.remove('in');void st.offsetWidth;st.classList.add('in');draw()});draw();st.classList.add('in')})();
/* count-up */
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;cio.unobserve(e.target);const el=e.target,to=+el.dataset.to,st=performance.now();(function f(t){const k=reduce?1:Math.min(1,(t-st)/1500);el.textContent=Math.round(to*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)})(st)}),{threshold:.5});$$('[data-to]').forEach(e=>cio.observe(e));
/* clocks */
function clk(){const f=tz=>new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:tz}).format(new Date());$('#tcai').textContent=f('Africa/Cairo');$('#tdxb').textContent=f('Asia/Dubai')}clk();setInterval(clk,15000);
/* contact form */
(function(){const F=$('#cxForm');if(!F)return;const fi=n=>F.elements.namedItem(n);
const NEED=T.need,DETAIL=T.detail;
$('#tkNo').textContent='TTX-'+(1000+Math.floor(Math.random()*9000));
$('#bars').innerHTML=Array.from({length:34},()=>`<i style="width:${1+Math.floor(Math.random()*3)}px"></i>`).join('');
const set=(id,v)=>{const e=document.getElementById(id);if(e.textContent===v)return;e.textContent=v;e.classList.remove('flip');void e.offsetWidth;e.classList.add('flip')};
const ico=x=>x&&x.startsWith('/')?`<img src="${x}" class="${x===IC.k?'kt':''}" alt="">`:(x||'');
function mk(dd,opts,onPick){const m=dd.querySelector('.ddm'),b=dd.querySelector('.ddb');m.setAttribute('role','listbox');b.setAttribute('aria-haspopup','listbox');b.setAttribute('aria-expanded','false');
 m.innerHTML=opts.map((o,i)=>`<button type="button" class="opt" role="option" data-i="${i}"><span class="ic">${ico(o.i)}</span><b>${esc(o.t)}</b><span>${esc(o.d)}</span></button>`).join('');
 b.onclick=e=>{e.stopPropagation();$$('.dd.open').forEach(x=>x!==dd&&x.classList.remove('open'));const o=dd.classList.toggle('open');b.setAttribute('aria-expanded',o);if(o)m.querySelector('.opt').focus()};
 m.querySelectorAll('.opt').forEach(o=>o.onclick=e=>{e.stopPropagation();const v=opts[+o.dataset.i];dd.classList.remove('open');dd.classList.add('set');b.setAttribute('aria-expanded','false');b.querySelector('b').textContent=v.t;b.focus();onPick(v)});
 m.addEventListener('keydown',e=>{const os=[...m.querySelectorAll('.opt')],i=os.indexOf(document.activeElement);if(e.key==='ArrowDown'){e.preventDefault();os[(i+1)%os.length].focus()}if(e.key==='ArrowUp'){e.preventDefault();os[(i-1+os.length)%os.length].focus()}if(e.key==='Escape'){dd.classList.remove('open');b.focus()}})}
document.addEventListener('click',()=>$$('.dd.open').forEach(x=>x.classList.remove('open')));
const follow=$('#follow'),prod=$('#tkProd');
mk(F.querySelector('[data-dd=need]'),NEED,v=>{fi('need').value=v.v;fi('detail').value='';set('tkNeed',v.short);set('tkDetail','—');prod.className='tk-prod';prod.innerHTML='';
 const D=DETAIL[v.v];follow.innerHTML=` ${D.w} <span class="dd" data-dd="detail"><button type="button" class="ddb"><b>${T.l.choose}</b><i>▾</i></button><span class="ddm"></span></span>`;
 mk(follow.querySelector('.dd'),D.o,d=>{fi('detail').value=d.t;set('tkDetail',d.t);if(v.v==='product'&&d.i&&d.i.startsWith('/')){prod.className='tk-prod on';prod.innerHTML=`${ico(d.i)}<div><b>${esc(d.t)}</b><span>${esc(d.d)} · ${T.l.demo}</span></div>`}else{prod.className='tk-prod';prod.innerHTML=''}})});
const c=document.createElement('canvas').getContext('2d');
const fit=i=>{if(i.classList.contains('wide'))return;const cs=getComputedStyle(i);c.font=`${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;i.style.width=Math.ceil(c.measureText(i.value||i.placeholder).width+30)+'px';i.classList.toggle('filled',!!i.value&&document.activeElement!==i)};
F.querySelectorAll('input.f').forEach(i=>{fit(i);i.addEventListener('input',()=>fit(i));i.addEventListener('blur',()=>fit(i));i.addEventListener('focus',()=>i.classList.remove('filled'))});
document.fonts&&document.fonts.ready.then(()=>F.querySelectorAll('input.f').forEach(fit));addEventListener('resize',()=>F.querySelectorAll('input.f').forEach(fit));
fi('name').addEventListener('input',()=>set('tkFrom',fi('name').value||T.l.you));fi('company').addEventListener('input',()=>set('tkCo',fi('company').value||T.l.yourco));fi('phone').addEventListener('input',()=>set('tkPhone',fi('phone').value||'—'));
const btn=$('#cxSend');
F.addEventListener('submit',async e=>{e.preventDefault();const tk=$('#tk');
 if(!fi('need').value){const d=F.querySelector('[data-dd=need]');d.classList.remove('need-err');void d.offsetWidth;d.classList.add('need-err');d.querySelector('.ddb').focus();return}
 if(!F.reportValidity())return;
 fi('subject').value=`Website request: ${fi('need').value}${fi('detail').value?' · '+fi('detail').value:''} · ${fi('company').value||fi('name').value}`;
 btn.disabled=true;btn.querySelector('span').textContent=T.l.sending;
 try{const r=await fetch(F.action,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(F)))});const j=await r.json();if(!j.success)throw 0;
  tk.classList.add('sent');btn.querySelector('span').textContent=T.l.sent;btn.querySelector('i').textContent='✓';if(!reduce){setTimeout(()=>tk.classList.add('away'),1400);setTimeout(()=>tk.classList.remove('away'),2600)}}
 catch(_){HTMLFormElement.prototype.submit.call(F)}});
})();
})();
