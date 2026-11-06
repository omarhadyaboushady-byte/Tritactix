/* Tritactix homepage hero: particles morph through the products above a live region planet. */
(function(){
const root=document.querySelector('[data-th]');if(!root||!window.THREE)return;
const AR=document.documentElement.lang==='ar',RTL=document.documentElement.dir==='rtl';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const CITY={Cairo:[30.04,31.24,'القاهرة'],Riyadh:[24.71,46.68,'الرياض'],Jeddah:[21.49,39.19,'جدة'],Dubai:[25.2,55.27,'دبي'],Kuwait:[29.37,47.98,'الكويت']};
const INFO=[
 {k:['Tritactix','تريتاكتكس'],t:['Ideas · Systems · People','أفكار · أنظمة · أشخاص'],s:['Strategy to execution, live across the region.','من الاستراتيجية إلى التنفيذ، في أنحاء المنطقة.'],c:['Cairo','Riyadh','Jeddah','Dubai','Kuwait'],col:'#FF6B16'},
 {k:['01 · Malls','01 · المولات'],t:['MallOS','MallOS'],s:['Receipt-level tenant sales and revenue share.','مبيعات المستأجرين ومشاركة الإيرادات على مستوى كل إيصال.'],c:['Cairo'],col:'#FF6B16'},
 {k:['02 · Growth','02 · النمو'],t:['CommercialOS','CommercialOS'],s:['Every lead tracked to a won deal.','كل عميل محتمل متابَع حتى إتمام الصفقة.'],c:['Cairo','Riyadh','Dubai','Kuwait'],col:'#9b8df7'},
 {k:['03 · Revenue','03 · الإيرادات'],t:['QuoteOS','QuoteOS'],s:['Quotes, approvals and margin before you commit.','العروض والموافقات والهامش قبل اتخاذ القرار.'],c:['Cairo','Riyadh','Dubai','Kuwait'],col:'#2dd4bf'},
 {k:['04 · Healthcare','04 · الرعاية الصحية'],t:['KSHF','كشف · KSHF'],s:['The clinic operating system. 300+ clinics in Saudi Arabia.','نظام تشغيل العيادات. أكثر من 300 عيادة في السعودية.'],c:['Riyadh','Jeddah','Cairo','Dubai'],col:'#9CF7EF'}];
const L=i=>AR?1:0;
const $=s=>root.querySelector(s);
const elK=$('[data-th-k]'),elT=$('[data-th-t]'),elS=$('[data-th-s]'),elC=$('[data-th-c]'),dots=[...root.querySelectorAll('[data-th-dots] i')],mcap=$('[data-th-mcap]');
/* ---- globe ---- */
const cvG=$('[data-th-globe]');const scene=new THREE.Scene();const cam=new THREE.PerspectiveCamera(32,1,.1,100);cam.position.set(0,0,10);
let R;try{R=new THREE.WebGLRenderer({canvas:cvG,antialias:true,alpha:true})}catch(e){return}
R.setPixelRatio(Math.min(2,devicePixelRatio||1));
const globe=new THREE.Group();scene.add(globe);
const RAD=3.8,small=()=>innerWidth<=980;
const NG=small()?9000:16000,gp=new Float32Array(NG*3);for(let i=0;i<NG;i++){const y=1-(i/(NG-1))*2,rr=Math.sqrt(1-y*y),th=i*2.399963;gp[i*3]=Math.cos(th)*rr*RAD;gp[i*3+1]=y*RAD;gp[i*3+2]=Math.sin(th)*rr*RAD}
const gg=new THREE.BufferGeometry();gg.setAttribute('position',new THREE.BufferAttribute(gp,3));globe.add(new THREE.Points(gg,new THREE.PointsMaterial({color:0x6d6a64,size:.03,transparent:true,opacity:.75})));
globe.add(new THREE.Mesh(new THREE.SphereGeometry(RAD*.985,64,64),new THREE.MeshBasicMaterial({color:0x0b0c0d})));
globe.add(new THREE.Mesh(new THREE.SphereGeometry(RAD*1.18,64,64),new THREE.ShaderMaterial({transparent:true,side:THREE.BackSide,depthWrite:false,vertexShader:'varying vec3 n;void main(){n=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec3 n;void main(){float i=pow(max(0.,.72-dot(n,vec3(0,0,1.))),3.);gl_FragColor=vec4(1.,.42,.09,1.)*i*.55;}'})));
const ll=(la,lo)=>{const ph=(90-la)*Math.PI/180,th=(lo+180)*Math.PI/180;return new THREE.Vector3(-Math.sin(ph)*Math.cos(th)*RAD,Math.cos(ph)*RAD,Math.sin(ph)*Math.sin(th)*RAD)};
const sprite=t=>{const c=document.createElement('canvas');c.width=256;c.height=64;const g=c.getContext('2d');g.font='600 30px '+(AR?'"IBM Plex Sans Arabic",Tahoma':'Inter,Arial')+',sans-serif';g.fillStyle='#F5F2EB';g.textAlign=AR?'right':'left';g.fillText(t,AR?248:8,42);const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthTest:false}));sp.scale.set(.62,.155,1);scene.add(sp);return sp};
const pins={};for(const k in CITY){const [la,lo,ar]=CITY[k];const v=ll(la,lo);const m=new THREE.Mesh(new THREE.SphereGeometry(.06,16,16),new THREE.MeshBasicMaterial({color:0xff6b16}));m.position.copy(v);globe.add(m);
 const ring=new THREE.Mesh(new THREE.RingGeometry(.07,.09,32),new THREE.MeshBasicMaterial({color:0xff8c42,transparent:true,side:THREE.DoubleSide}));ring.position.copy(v);ring.lookAt(v.clone().multiplyScalar(2));globe.add(ring);pins[k]={v,m,ring,sp:sprite(AR?ar:k),hot:0}}
const arcs=[];[['Cairo','Riyadh'],['Cairo','Dubai'],['Cairo','Jeddah'],['Riyadh','Dubai'],['Cairo','Kuwait'],['Jeddah','Dubai']].forEach(([a,b],i)=>{const A=pins[a].v,B=pins[b].v;const mid=A.clone().add(B).multiplyScalar(.5);mid.setLength(RAD*(1.04+A.distanceTo(B)*.06));
 const cur=new THREE.QuadraticBezierCurve3(A,mid,B);const ge=new THREE.BufferGeometry().setFromPoints(cur.getPoints(80));globe.add(new THREE.Line(ge,new THREE.LineBasicMaterial({color:0xff6b16,transparent:true,opacity:.9})));
 const dot=new THREE.Mesh(new THREE.SphereGeometry(.04,12,12),new THREE.MeshBasicMaterial({color:0xffffff}));globe.add(dot);arcs.push({ge,cur,dot,off:i*.37})});
const vc=ll(26,43),baseY=Math.atan2(-vc.x,vc.z);globe.rotation.y=baseY;globe.rotation.x=-.3;
const v3=new THREE.Vector3();
function cityXY(k){pins[k].m.getWorldPosition(v3).project(cam);return [(v3.x+1)/2*cvG.clientWidth,(1-v3.y)/2*cvG.clientHeight]}
/* ---- particles ---- */
const cv=$('[data-th-particles]'),x=cv.getContext('2d');let W=0,H=0;const D=Math.min(2,devicePixelRatio||1);
const S=380,off=document.createElement('canvas');off.width=off.height=S;const o=off.getContext('2d',{willReadFrequently:true});
const rr=(g,X,Y,w,h,r)=>{g.beginPath();g.moveTo(X+r,Y);g.arcTo(X+w,Y,X+w,Y+h,r);g.arcTo(X+w,Y+h,X,Y+h,r);g.arcTo(X,Y+h,X,Y,r);g.arcTo(X,Y,X+w,Y,r);g.closePath()};
const SH=[
 g=>{g.lineWidth=14;g.lineJoin='round';const t=dy=>{g.beginPath();g.moveTo(190,30+dy);g.lineTo(60,210+dy);g.lineTo(320,210+dy);g.closePath()};t(0);g.stroke();t(55);g.stroke();t(110);g.fill()},
 g=>{[70,120,95,170,140,230,190].forEach((h,i)=>g.fillRect(40+i*44,320-h,30,h));g.fillRect(30,330,320,8)},
 g=>{[320,250,180,110].forEach((w,i)=>{rr(g,190-w/2,60+i*70,w,46,23);g.fill()})},
 g=>{g.lineWidth=12;rr(g,80,40,220,290,22);g.stroke();for(let i=0;i<4;i++)g.fillRect(120,100+i*40,i==3?80:140,12);g.lineWidth=18;g.beginPath();g.moveTo(205,270);g.lineTo(235,300);g.lineTo(300,230);g.stroke()},
 g=>{rr(g,100,40,46,300,23);g.fill();g.lineWidth=40;g.lineCap='round';g.beginPath();g.moveTo(140,200);g.lineTo(250,70);g.stroke();g.beginPath();g.moveTo(145,195);g.lineTo(260,320);g.stroke();g.lineWidth=12;g.beginPath();g.moveTo(50,210);g.lineTo(150,210);g.lineTo(180,120);g.lineTo(215,280);g.lineTo(240,190);g.lineTo(340,190);g.stroke()}];
const NP=small()?1700:3400;
const SAMPLES=SH.map(fn=>{o.setTransform(1,0,0,1,0,0);o.clearRect(0,0,S,S);o.fillStyle=o.strokeStyle='#fff';o.lineCap='butt';fn(o);const d=o.getImageData(0,0,S,S).data,a=[];for(let y=0;y<S;y+=2)for(let xx=0;xx<S;xx+=2)if(d[(y*S+xx)*4+3]>128)a.push([xx,y]);return Array.from({length:NP},()=>a[(Math.random()*a.length)|0])});
let cx0=0,cy0=0,sc=1;
const copyEl=root.querySelector('.th-copy');
function layout(){let mob=null;if(small()){const cb=copyEl.getBoundingClientRect().bottom-root.getBoundingClientRect().top;const size=Math.min(innerWidth*.46,200);const cy=cb+36+size/2,ryPx=cy+size/2+140;root.style.minHeight=Math.max(ryPx+80,innerHeight)+'px';mob={size,cy,ryPx}}else root.style.minHeight='';W=cv.clientWidth;H=cv.clientHeight;cv.width=W*D;cv.height=H*D;x.setTransform(D,0,0,D,0,0);R.setSize(cvG.clientWidth,cvG.clientHeight,false);cam.aspect=cvG.clientWidth/cvG.clientHeight;cam.updateProjectionMatrix();
 const hh=Math.tan(16*Math.PI/180)*10,hw=hh*cam.aspect; // visible half sizes at z=0
 if(mob){cx0=W*.5;cy0=mob.cy;sc=mob.size/S;cam.position.z=Math.min(24,3.8+1.6/(.34*cam.aspect));cam.updateProjectionMatrix();globe.position.set(0,-4,0);const tgt=1-2*(mob.ryPx/H);for(let it=0;it<3;it++){globe.updateMatrixWorld();const w=vc.clone().applyMatrix4(globe.matrixWorld),pr=w.clone().project(cam);const want=new THREE.Vector3(pr.x,tgt,pr.z).unproject(cam);const wantX=new THREE.Vector3(0,tgt,pr.z).unproject(cam);globe.position.y+=want.y-w.y;globe.position.x+=wantX.x-w.x}if(mcap)mcap.style.top=(cy0+mob.size/2+14)+'px'}
 else{cam.position.z=10;cam.updateProjectionMatrix();cx0=W*(RTL?.405:.595);cy0=H*.36;sc=Math.min(W*.215,H*.36)/S;globe.position.set((RTL?-1:1)*Math.min(1.5,hw*.33),-3.85,0)}
 if(cur>=0)target(cur)}
const P=Array.from({length:NP},()=>({x:0,y:0,vx:0,vy:0,tx:0,ty:0,o:Math.random()<.22}));
let cur=-1,accent='#FF6B16';const comets=[];
function target(k){const T=SAMPLES[k],ox=cx0-S*sc/2,oy=cy0-S*sc/2;P.forEach((p,i)=>{p.tx=ox+T[i][0]*sc;p.ty=oy+T[i][1]*sc})}
function set(k,first){cur=k;target(k);const I=INFO[k];accent=I.col;
 if(!first)P.forEach(p=>{p.vx+=(Math.random()-.5)*5;p.vy+=(Math.random()-.5)*5});
 const upd=()=>{elK.textContent=I.k[L()];elK.style.color=I.col;elT.textContent=I.t[L()];elS.textContent=I.s[L()];elC.innerHTML=I.c.map(c=>`<b><i style="background:${I.col}"></i>${AR?CITY[c][2]:c}</b>`).join('');if(mcap)mcap.textContent=I.t[L()];[elK,elT,elS].forEach(e=>e.style.opacity=1)};
 if(first||reduce)upd();else{[elK,elT,elS].forEach(e=>e.style.opacity=0);setTimeout(upd,300)}
 dots.forEach((d,j)=>d.classList.toggle('on',j===k));
 if(!reduce)setTimeout(()=>I.c.forEach(c=>{pins[c].hot=1;for(let i=0;i<(small()?12:26);i++)comets.push({c,t:-i*.025,sx:cx0+(Math.random()-.5)*120*sc*2.6,sy:cy0+(Math.random()-.2)*120*sc*2.6,col:I.col})}),900);}
layout();P.forEach(p=>{p.x=cx0+(Math.random()-.5)*40;p.y=cy0+(Math.random()-.5)*40});set(0,true);
if(reduce)P.forEach(p=>{p.x=p.tx;p.y=p.ty});
let rT;addEventListener('resize',()=>{clearTimeout(rT);rT=setTimeout(layout,120)});
let MX=0,MY=0,mx=-999,my=-999;root.addEventListener('pointermove',e=>{const r=root.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;MX=e.clientX/innerWidth-.5;MY=e.clientY/innerHeight-.5});root.addEventListener('pointerleave',()=>{mx=my=-999});
let visible=true,timer=null,running=false;const kick=()=>{if(!running){running=true;requestAnimationFrame(frame)}};new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible&&!reduce)kick()}).observe(root);
if(!reduce)timer=setInterval(()=>{if(visible&&!document.hidden)set((cur+1)%SH.length)},4200);
const glow=()=>{const gr=x.createRadialGradient(cx0,cy0,0,cx0,cy0,S*sc*.9);gr.addColorStop(0,'rgba(255,107,22,.10)');gr.addColorStop(1,'rgba(255,107,22,0)');x.fillStyle=gr;x.fillRect(0,0,W,H)};
function frame(ms){if(!visible){running=false;return}const t=ms/1000;
 globe.rotation.y=baseY+Math.sin(t*.15)*.12+MX*.2;globe.rotation.x=-.3+MY*.05;globe.updateMatrixWorld();
 arcs.forEach(a=>{const k=(t*.35+a.off)%1.4,kk=Math.min(k,1);a.ge.setDrawRange(0,Math.floor(kk*81));a.dot.position.copy(a.cur.getPoint(kk));a.dot.visible=k<1});
 for(const k in pins){const pn=pins[k],ph=(t*1.1+k.length*.13)%1;pn.hot=Math.max(0,pn.hot-.006);pn.ring.scale.setScalar((1+ph*2.2)*(.7+pn.hot*.5));pn.ring.material.opacity=(1-ph)*(.6+pn.hot*.4);pn.m.scale.setScalar(.8+pn.hot*.5);pn.m.getWorldPosition(v3);pn.sp.position.set(v3.x+(AR?-.34:.34),v3.y+.11,v3.z+.05)}
 R.render(scene,cam);
 x.clearRect(0,0,W,H);glow();
 for(const p of P){p.vx+=(p.tx-p.x)*.022;p.vy+=(p.ty-p.y)*.022;const ex=p.x-mx,ey=p.y-my,d2=ex*ex+ey*ey;if(d2<4000&&d2>1){const d=Math.sqrt(d2);p.vx+=ex/d*.9;p.vy+=ey/d*.9}p.vx*=.8;p.vy*=.8;p.x+=p.vx;p.y+=p.vy;x.fillStyle=p.o?accent:'#F5F2EB';x.fillRect(p.x-1.1,p.y-1.1,2.2,2.2)}
 for(let i=comets.length-1;i>=0;i--){const c=comets[i];c.t+=.012;if(c.t<0)continue;if(c.t>=1){comets.splice(i,1);continue}const [ex,ey]=cityXY(c.c),e=c.t*c.t*(3-2*c.t),qx=(c.sx+ex)/2+(RTL?-80:80),qy=Math.min(c.sy,ey)-40;
  x.fillStyle=c.col;x.globalAlpha=1-c.t*.4;x.beginPath();x.arc((1-e)*(1-e)*c.sx+2*(1-e)*e*qx+e*e*ex,(1-e)*(1-e)*c.sy+2*(1-e)*e*qy+e*e*ey,2.2,0,6.3);x.fill();x.globalAlpha=1}
 requestAnimationFrame(frame)}
if(reduce){root.classList.add('th-static');globe.updateMatrixWorld();for(const k in pins){pins[k].m.getWorldPosition(v3);pins[k].sp.position.set(v3.x+(AR?-.34:.34),v3.y+.11,v3.z+.05)}R.render(scene,cam);x.clearRect(0,0,W,H);glow();for(const p of P){x.fillStyle=p.o?accent:'#F5F2EB';x.fillRect(p.tx-1.1,p.ty-1.1,2.2,2.2)}}
else kick();
})();
