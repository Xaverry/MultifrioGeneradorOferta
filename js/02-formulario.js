let S={h:{cli:'',con:'',pro:'',des:'',ini:'',seq:'',ven:''},items:[],notes:{}};
const GR={eq:['ch','bo','mj','vr','ve','te','dp'],ma:['du','tu']},GT={eq:['Agregar equipos','Editar equipo'],ma:['Agregar material','Editar material']},CUR={eq:{cat:'ch',item:'Chiller'},ma:{cat:'du',item:'Ducto'}},gOf=c=>GR.eq.includes(c)?'eq':'ma';
let editId=null,editG=null;
const KEY='oferta_hvac_v1';
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function load(){try{const r=localStorage.getItem(KEY);if(r){const o=JSON.parse(r);if(o&&o.items){S=Object.assign(S,o);S.items.forEach(i=>{if(i.cat==='eq')i.cat='ch'})}}}catch(e){}}

function parts(it){
 const c=cats[it.cat],d=it.d;let r;
 if(d.gz==='Sí'&&c.gen)r=c.gen(d,it.item);
 else{
  const lead=c.lead(d,it.item);
  if(c.rest)r=[lead,c.rest(d)];
  else{const rest=c.fields.filter(f=>!c.skip.includes(f.k)&&d[f.k]).map(f=>EN?FEN(f.k,it.cat,d[f.k]):f.w(d[f.k]));r=[lead,(rest.length?', '+rest.join(', '):'')+'.']}
 }
 r=[r[0],r[1].replace(/\.\.$/,'.')];
 if(d.ac==='Sí'&&d.at&&!c.acIn){let t=d.at.trim();if(!/[.!?]$/.test(t))t+='.';t=t[0].toUpperCase()+t.slice(1);r=[r[0],r[1]+' '+t]}
 return r;
}

function renderTabs(g){
 $('#tabs-'+g).innerHTML=GR[g].map(k=>`<button class="tab${k===CUR[g].cat?' on':''}" data-c="${k}">${h(cats[k].label)}</button>`).join('');
}
function fieldHTML(f,spec){
 if(spec==='C')return `<div class="f" data-k="${f.k}"><label class="chk"><input type="checkbox"> ${h(f.l)}</label></div>`;
 if(spec==='c')return `<div class="f" data-k="${f.k}" hidden><label class="chk"><input type="checkbox"> ${h(f.l)}</label></div>`;
 let ctl;
 if(spec==='n')ctl='<input type="number" min="1" step="1" value="1">';
 else if(spec==='t')ctl=`<input type="text" placeholder="${h(f.p||'')}">`;
 else ctl=`<select><option value="">Seleccionar…</option>${spec.map(v=>`<option>${h(v)}</option>`).join('')}${spec.nO?'':'<option value="__o">Otro…</option>'}</select><input type="text" class="oth" hidden placeholder="Especificar">`;
 return `<div class="f" data-k="${f.k}"><label>${h(f.l)}${f.r?' *':''}</label>${ctl}</div>`;
}
function renderForm(g){
 renderTabs(g);
 const cur=CUR[g],c=cats[cur.cat],names=Object.keys(c.items),ed=!!editId&&editG===g;
 if(!c.items[cur.item])cur.item=names[0];
 const spec=Object.assign({},c.base||{},c.items[cur.item]);
 let html='';
 const sel=names.length>1?`<div><label>Equipo *</label><select class="isel">${names.map(n=>`<option${n===cur.item?' selected':''}>${h(n)}</option>`).join('')}</select></div>`:'';
 const gzf=c.fields.find(f=>f.k==='gz'&&spec.gz),fl=c.fields.filter(f=>spec[f.k]&&f.k!=='gz');
 html+=(gzf?'<div class="gzr">'+fieldHTML(gzf,spec.gz)+'</div>':'')+'<div class="grid">'+(c.selAfter?fl.map(f=>fieldHTML(f,spec[f.k])+(f.k===c.selAfter?sel:'')).join(''):sel+fl.map(f=>fieldHTML(f,spec[f.k])).join(''))+'</div>';
 $('#form-'+g).innerHTML=html;
 $('#msg-'+g).textContent='';
 $('#add-'+g).textContent=ed?'Guardar cambios':'Agregar a la oferta';
 $('#cancel-'+g).hidden=!ed;
 $('#ft-'+g).textContent=ed?GT[g][1]:GT[g][0];
 syncDu(g);
}
function syncDu(g){
 const a=document.querySelector('#form-'+g+' .f[data-k="ai"] select'),r=document.querySelector('#form-'+g+' .f[data-k="r"]');
 const mm=document.querySelector('#form-'+g+' .f[data-k="ma"] select'),kk=document.querySelector('#form-'+g+' .f[data-k="ck"]');
 if(mm&&kk){const on=mm.value==='HN';kk.hidden=!on;if(!on)kk.querySelector('input').checked=false}
 if(mm&&document.querySelector('#form-'+g+' .f[data-k="sv"]')){const ub=document.querySelector('#form-'+g+' .f[data-k="ub"]'),cc=document.querySelector('#form-'+g+' .f[data-k="ch"] select');if(ub&&cc){const oU=!cc.value||cc.value==='No',uS=ub.querySelector('select');uS.disabled=oU;if(oU)uS.value='';ub.style.opacity=oU?'.5':''}const tt=document.querySelector('#form-'+g+' .f[data-k="ti"]');if(tt){const oT=mm.value==='PVC',tS=tt.querySelector('select'),tO=tt.querySelector('.oth');tS.disabled=oT;if(oT){tS.value='';if(tO)tO.hidden=true}tt.style.opacity=oT?'.5':''}const ta=document.querySelector('#form-'+g+' .f[data-k="ai"]');if(ta){const off=/Preaislada$/.test(mm.value),ts=ta.querySelector('select'),to=ta.querySelector('.oth');ts.disabled=off;if(off){ts.value='';if(to)to.hidden=true}ta.style.opacity=off?'.5':''}
  const sv=document.querySelector('#form-'+g+' .f[data-k="sv"] select'),vr=!!sv&&sv.value==='VRF/DX';
  ['ma','ti','cd','es','ch','ub'].forEach(k=>{const w=document.querySelector('#form-'+g+' .f[data-k="'+k+'"]');if(!w)return;const s=w.querySelector('select'),o=w.querySelector('.oth');
   if(vr){s.disabled=true;s.value='';if(o)o.hidden=true;w.style.opacity='.5'}
   else if(k==='ma'||k==='cd'||k==='es'||k==='ch'){s.disabled=false;w.style.opacity=''}});
 }
 if(cats[CUR[g].cat].refOn){const rw=document.querySelector('#form-'+g+' .f[data-k="r"]');if(rw){const off=!/^Condensadora/.test(CUR[g].item),rs=rw.querySelector('select'),ro=rw.querySelector('.oth');rs.disabled=off;if(off){rs.value='';if(ro)ro.hidden=true}rw.style.opacity=off?'.5':''}}
 const acI=document.querySelector('#form-'+g+' .f[data-k="ac"] input'),aw=document.querySelector('#form-'+g+' .f[data-k="at"]');
 if(acI&&aw){const x=aw.querySelector('input'),off=!acI.checked;x.disabled=off;if(off)x.value='';aw.style.opacity=off?'.5':''}
 const ioff=cats[CUR[g].cat].itOff;
 if(ioff){const L=ioff(CUR[g].item);['t','c','e','r'].forEach(k=>{const w=document.querySelector('#form-'+g+' .f[data-k="'+k+'"]');if(!w)return;const x=w.querySelector('select,input:not(.oth)'),o=w.querySelector('.oth'),off=L.includes(k);x.disabled=off;if(off){x.value='';if(o)o.hidden=true}w.style.opacity=off?'.5':''})}
 const gzI=document.querySelector('#form-'+g+' .f[data-k="gz"] input');
 if(gzI){const on=gzI.checked,cc=cats[CUR[g].cat],cor=!on&&CUR[g].item==='Cortina de aire';
  (cc.gzOff||[]).forEach(k=>{const w=document.querySelector('#form-'+g+' .f[data-k="'+k+'"]');if(!w)return;const x=w.querySelector('select,input:not(.oth)'),o=w.querySelector('.oth');
   const off=on||(cor&&(k==='t'||k==='c'||k==='d'));
   x.disabled=off;if(off){if(x.type==='checkbox')x.checked=false;else x.value='';if(o)o.hidden=true}else if(k==='q'&&!x.value)x.value='1';w.style.opacity=off?'.5':''});
 }
 if(!a||!r)return;
 const s=r.querySelector('select'),o=r.querySelector('.oth'),off=a.value==='No';
 s.disabled=off;if(off){s.value='';if(o)o.hidden=true}
 r.style.opacity=off?'.5':'';
}
function collect(g){
 const d={};
 document.querySelectorAll('#form-'+g+' .f').forEach(w=>{
  const s=w.querySelector('select'),i=w.querySelector('input:not(.oth)');
  d[w.dataset.k]=s?(s.value==='__o'?w.querySelector('.oth').value.trim():s.value):(i.type==='checkbox'?(i.checked?'Sí':''):i.value.trim());
 });
 return d;
}
function fill(g,d){
 document.querySelectorAll('#form-'+g+' .f').forEach(w=>{
  const v=d[w.dataset.k]||'',s=w.querySelector('select');
  if(s){
   if(!v)s.value='';
   else if([...s.options].some(o=>o.value===v))s.value=v;
   else{const o=w.querySelector('.oth');if(o){s.value='__o';o.hidden=false;o.value=v}else s.value=''}
  }else{const i=w.querySelector('input');if(i.type==='checkbox')i.checked=v==='Sí';else i.value=v}
 });
 syncDu(g);
}
let LE=null;
const leHTML=(id,i,t)=>`<div class="le"><textarea placeholder="Escriba la descripción personalizada" data-le>${h(t)}</textarea><button class="p" data-a="ls" data-id="${id}" data-i="${i}">Guardar</button><button data-a="lc" data-id="${id}">Cancelar</button></div>`;
function renderList(){
 const L=$('#list');
 $('#cnt').textContent=S.items.length?'('+S.items.length+')':'';
 $('#gen').disabled=!S.items.length;$('#gen-en').disabled=!S.items.length;
 if(!S.items.length){L.innerHTML='<p class="empty">Todavía no hay ítems. Agregue el primero arriba.</p>';return}
 L.innerHTML=[...GR.eq,...GR.ma].map(k=>{
  const g=S.items.filter(i=>i.cat===k);
  if(!g.length)return'';
  return `<div class="grp">${h(cats[k].label)}</div>`+g.map(it=>{const p=parts(it);
   const ex=(it.ex||[]).map((t,i)=>LE&&LE.id===it.id&&LE.i===i?leHTML(it.id,i,t):`<div class="ex"><span class="t">${h(t)}</span><div class="a"><button data-a="xe" data-id="${it.id}" data-i="${i}">Editar</button><button data-a="xd" data-id="${it.id}" data-i="${i}">Eliminar</button></div></div>`).join('')+(LE&&LE.id===it.id&&LE.i===-1?leHTML(it.id,-1,''):'');
   return `<div class="it"><div class="c"><p><b>${h(p[0])}</b>${h(p[1])}</p>${ex}</div><div class="a"><button data-a="l" data-id="${it.id}">Agregar línea</button><button data-a="e" data-id="${it.id}">Editar</button><button data-a="d" data-id="${it.id}">Eliminar</button></div></div>`}).join('');
 }).join('');
}
const NEXTRA=['Limpieza filtros','Anticorrosivo','Control central','Pintura cocina','FireWrap'];
const ALLN=NOTES.concat(NEXTRA);
const NCOM=['Grúa','Trabajo civil','Exonerado','Mantenimiento','EHS','Conexiones eléctricas','Sellos corta fuego','Canalización y cableado','Horario extendido','BIM',...NEXTRA];
const actN=()=>S.tipo==='com'?NCOM:NOTES;
const NV=n=>actN().includes(n)?S.notes[n]:undefined;
function renderNotes(){
 $('#tabs-nt').innerHTML=[['ind','Industriales'],['com','Comerciales']].map(([k,l])=>`<button class="tab${(S.tipo||'ind')===k?' on':''}" data-t="${k}">${l}</button>`).join('');
 $('#notes').innerHTML=actN().map(n=>`<div class="nt"><span>${h(n)}</span><select data-nn="${h(n)}"><option value="">—</option><option${S.notes[n]==='Sí'?' selected':''}>Sí</option><option${S.notes[n]==='No'?' selected':''}>No</option></select></div>`).join('');
}

['eq','ma'].forEach(g=>{
$('#tabs-'+g).addEventListener('click',e=>{const b=e.target.closest('[data-c]');if(!b)return;CUR[g].cat=b.dataset.c;CUR[g].item=Object.keys(cats[CUR[g].cat].items)[0];if(editG===g){editId=null;editG=null}renderForm(g)});
$('#form-'+g).addEventListener('change',e=>{
 if(e.target.classList.contains('isel')){CUR[g].item=e.target.value;renderForm(g);return}
 if(e.target.tagName==='SELECT'){const o=e.target.parentElement.querySelector('.oth');if(o){o.hidden=e.target.value!=='__o';if(!o.hidden)o.focus()}}
 syncDu(g);
});
$('#add-'+g).addEventListener('click',()=>{
 const cur=CUR[g],c=cats[cur.cat],d=collect(g),m=$('#msg-'+g),ed=!!editId&&editG===g;
 m.className='msg';
 const gzn=d.gz==='Sí';
 {const miss=[];document.querySelectorAll('#form-'+g+' .f').forEach(w=>{if(w.hidden)return;const x=w.querySelector('select,input:not(.oth)');if(!x||x.disabled||x.type==='checkbox')return;const lb=w.querySelector('label').textContent.replace('*','').trim();const v=x.tagName==='SELECT'?(x.value==='__o'?w.querySelector('.oth').value.trim():x.value):x.value.trim();if(!v||(w.dataset.k==='q'&&!(Number(v)>=1)))miss.push(lb)});
  if(miss.length){m.textContent='';if(window.Swal)Swal.fire({icon:'warning',title:'Falta información',text:'Complete los siguientes campos: '+miss.join(', '),confirmButtonText:'Aceptar'});else m.textContent='Falta información: '+miss.join(', ');return}}
 for(const f of c.fields){if(gzn&&f.k==='q')continue;if(f.r&&!d[f.k]&&(f.k in d)){m.textContent='Falta completar: '+f.l;return}}
 for(const k of (c.gzReq||[])){if(gzn&&!d[k]){m.textContent='Falta completar: '+c.fields.find(f=>f.k===k).l;return}}
 if(d.ac==='Sí'&&!d.at){m.textContent='Falta completar: Información de accesorios';return}
 if(!gzn&&'q' in d&&!(Number(d.q)>=1)){m.textContent='La cantidad debe ser 1 o más';return}
 const it={id:ed?editId:('i'+Date.now()+Math.random().toString(36).slice(2,6)),cat:cur.cat,item:cur.item,d};
 if(ed){const ix=S.items.findIndex(x=>x.id===editId);if(S.items[ix]&&S.items[ix].ex)it.ex=S.items[ix].ex;S.items[ix]=it;editId=null;editG=null}else S.items.push(it);
 save();renderList();renderForm(g);
 const m2=$('#msg-'+g);m2.className='msg ok';m2.textContent='Ítem agregado';setTimeout(()=>{m2.className='msg';m2.textContent=''},1800);
});
$('#cancel-'+g).addEventListener('click',()=>{editId=null;editG=null;renderForm(g)});
});
$('#list').addEventListener('click',e=>{
 const b=e.target.closest('[data-a]');if(!b)return;
 const it=S.items.find(x=>x.id===b.dataset.id);if(!it)return;
 const A=b.dataset.a;
 if(A==='l'){LE={id:it.id,i:-1};renderList();const t=document.querySelector('#list textarea[data-le]');if(t)t.focus();return}
 if(A==='lc'){LE=null;renderList();return}
 if(A==='xe'){LE={id:it.id,i:+b.dataset.i};renderList();const t=document.querySelector('#list textarea[data-le]');if(t)t.focus();return}
 if(A==='xd'){(it.ex||[]).splice(+b.dataset.i,1);if(!(it.ex||[]).length)delete it.ex;LE=null;save();renderList();return}
 if(A==='ls'){const t=b.closest('.le').querySelector('textarea').value.trim(),i=+b.dataset.i;if(t){it.ex=it.ex||[];if(i<0)it.ex.push(t);else it.ex[i]=t;save()}LE=null;renderList();return}
 if(b.dataset.a==='d'){S.items=S.items.filter(x=>x.id!==it.id);const g0=editG;if(editId===it.id){editId=null;editG=null;renderForm(g0)}save();renderList()}
 else{const g=gOf(it.cat),old=editG;editId=it.id;editG=g;if(old&&old!==g)renderForm(old);CUR[g]={cat:it.cat,item:it.item};renderForm(g);fill(g,it.d);$('#ft-'+g).scrollIntoView({behavior:'smooth'})}
});
$('#notes').addEventListener('change',e=>{const n=e.target.dataset.nn;if(n===undefined)return;S.notes[n]=e.target.value;save()});
$('#tabs-nt').addEventListener('click',e=>{const b=e.target.closest('[data-t]');if(!b)return;S.tipo=b.dataset.t;save();renderNotes()});
$('#ven').innerHTML='<option value="">Seleccionar…</option>'+VEND.map(v=>`<option>${h(v.n)}</option>`).join('');
$('#ven').addEventListener('change',e=>{S.h.ven=e.target.value;save()});
['cli','con','pro','des','ini','seq'].forEach(k=>$('#'+k).addEventListener('input',e=>{S.h[k]=e.target.value;save()}));

/* ---------- Word (a partir de la plantilla) ---------- */
