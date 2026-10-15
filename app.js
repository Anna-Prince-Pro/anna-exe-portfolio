const S=window.SITE,$=(s,r=document)=>r.querySelector(s),
h=(t,a={},...c)=>{const e=document.createElement(t);for(const k in a)k==='class'?e.className=a[k]:e.setAttribute(k,a[k]);c.flat().forEach(x=>e.append(x));return e},
ph=u=>!u||u.startsWith('REPLACE'),rm=matchMedia('(prefers-reduced-motion: reduce)').matches,
link=l=>ph(l.href)?h('span',{class:'ph',title:'Placeholder: edit data.js'},l.label+' (add link)'):h('a',{href:l.href,target:'_blank',rel:'noopener'},l.label+' ↗');
// terminal
{const w=S.phrases,el=$('#typed');let i=0,j=0,d=0;(function t(){if(rm){el.textContent=w[i];i=(i+1)%w.length;return setTimeout(t,2500)}
j+=d?-1:1;el.textContent=w[i].slice(0,j);let s=d?30:70;if(!d&&j==w[i].length){d=1;s=1200}else if(d&&!j){d=0;i=(i+1)%w.length;s=300}setTimeout(t,s)})()}
const go=id=>{document.body.classList.remove('locked');$('#'+id).scrollIntoView({behavior:rm?'auto':'smooth'})};
$('#enter').onclick=()=>go('projects');
document.querySelectorAll('.bar nav a').forEach(a=>a.onclick=e=>{e.preventDefault();go(a.hash.slice(1))});
// projects
const pg=$('#pgrid');
S.projects.forEach((p,n)=>{const views={explored:'What I explored',how:'How it works',learned:'What I learned'},body=h('p',{id:'b-'+p.id}),
 tabs=h('div',{class:'tabs',role:'tablist'}),det=h('div',{class:'det',hidden:''},tabs,body,
 h('div',{class:'flow','aria-label':'Illustrative diagram'},(p.flow||[]).map((f,i)=>[i?h('b',{'aria-hidden':'true'},'→'):'',h('span',{},f)])),
 h('div',{class:'lnk'},p.links.map(link)));
 const show=k=>{body.textContent=p[k];tabs.querySelectorAll('button').forEach(b=>b.setAttribute('aria-selected',b.dataset.k==k))};
 Object.entries(views).filter(([k])=>p[k]).forEach(([k,l])=>tabs.append(h('button',{role:'tab','data-k':k,'aria-selected':'false'},l)));
 tabs.onclick=e=>e.target.dataset.k&&show(e.target.dataset.k);show('explored');
 const btn=h('button',{class:'open','aria-expanded':'false','aria-controls':'d-'+p.id},'Open');det.id='d-'+p.id;
 btn.onclick=()=>{const o=det.hidden;det.hidden=!o;btn.setAttribute('aria-expanded',o);btn.textContent=o?'Close':'Open'};
 pg.append(h('article',{class:'proj p'+n,id:'p-'+p.id,style:'--a:'+p.color},h('small',{},p.tag),h('h3',{},p.title),h('p',{},p.summary),
  h('div',{class:'chips'},p.stack.map(s=>h('span',{},s))),btn,det))});
// lab
{const NS='http://www.w3.org/2000/svg',svg=$('#net'),N=Object.fromEntries(S.nodes.map(n=>[n.id,n])),mk=(t,a)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);return e},pan=$('#npanel');
 S.nodes.forEach(n=>n.to.forEach(t=>svg.append(mk('line',{x1:n.x,y1:n.y,x2:N[t].x,y2:N[t].y,class:'edge'}))));
 const sel=n=>{svg.querySelectorAll('.node').forEach(g=>g.classList.toggle('on',g.dataset.id==n.id));pan.replaceChildren(h('h3',{},n.label),h('ul',{},n.items.map(i=>h('li',{},i))))};
 S.nodes.forEach(n=>{const g=mk('g',{class:'node',tabindex:0,role:'button','aria-label':n.label,'data-id':n.id,transform:`translate(${n.x} ${n.y})`});
  g.append(mk('circle',{r:9}));const t=mk('text',{y:-18,'text-anchor':'middle'});t.textContent=n.label;g.append(t);
  g.onclick=g.onfocus=g.onmouseenter=()=>sel(n);g.onkeydown=e=>(e.key=='Enter'||e.key==' ')&&(e.preventDefault(),sel(n));svg.append(g)});sel(S.nodes[0])}
// wall
S.wall.forEach(w=>$('#wallgrid').append(h('div',{class:'stamp k-'+w.kind.replace(' ','')},h('em',{},w.kind),h('strong',{},w.title),h('span',{},w.note))));
S.corner.forEach(c=>$('#corner').append(h('p',{class:ph(c)?'ph':''},c)));
S.archive.forEach(a=>$('#arch').append(h('article',{},h('small',{},[a.type,a.date].filter(Boolean).join(' · ')),h('h3',{},a.title),h('p',{},a.body.split(/(https?:\/\/\S+)/).map(x=>/^https?:/.test(x)?h('a',{href:x,target:'_blank',rel:'noopener'},x):x)))));
S.links.forEach(l=>$('#clinks').append(link(l)));$('#yr').textContent=new Date().getFullYear();
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&(e.target.classList.add('in'),io.unobserve(e.target))),{threshold:.1});
document.querySelectorAll('main>section:not(#hero)').forEach(s=>{if(!rm)s.classList.add('rv');io.observe(s)});
// palette
{const pal=$('#pal'),inp=$('#pin'),ul=$('#plist'),cmds=[...['projects','lab','wall','human','archive','contact'].map(s=>({l:'Go to '+s,f:()=>go(s)})),
 ...S.projects.map(p=>({l:'Project: '+p.title,f:()=>{go('p-'+p.id)}}))];let cur=0,vis=[];
 const draw=()=>{vis=cmds.filter(c=>c.l.toLowerCase().includes(inp.value.toLowerCase()));cur=Math.min(cur,Math.max(0,vis.length-1));ul.replaceChildren(...vis.map((c,i)=>{const li=h('li',{role:'option','aria-selected':i==cur},c.l);li.onclick=()=>run(c);return li}))},
 run=c=>{close();c.f()},open=()=>{pal.hidden=false;inp.value='';cur=0;draw();inp.focus()},close=()=>{pal.hidden=true};
 $('#kbtn').onclick=open;pal.onclick=e=>e.target==pal&&close();
 inp.oninput=draw;inp.onkeydown=e=>{if(e.key=='ArrowDown')cur=Math.min(cur+1,vis.length-1);else if(e.key=='ArrowUp')cur=Math.max(cur-1,0);else if(e.key=='Enter'&&vis[cur])return run(vis[cur]);else return;e.preventDefault();draw()};
 addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()=='k'){e.preventDefault();pal.hidden?open():close()}else if(e.key=='Escape')close()})}
