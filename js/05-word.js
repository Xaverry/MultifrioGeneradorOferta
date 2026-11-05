const xe=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const pS=(x,i)=>Math.max(x.lastIndexOf('<w:p>',i),x.lastIndexOf('<w:p ',i));
const parOf=(x,t)=>{const i=x.indexOf(t);if(i<0)return null;const s=pS(x,i),e=x.indexOf('</w:p>',i)+6;return{s,e,xml:x.slice(s,e)}};
const rep=(x,t,L)=>{const p=parOf(x,t);return p?x.slice(0,p.s)+L.map(l=>p.xml.replace(t,()=>xe(l))).join('')+x.slice(p.e):x};
const sec=(x,k,keep)=>{const a='[['+k+'_S]]',b='[['+k+'_E]]',i=x.indexOf(a),j=x.indexOf(b);if(i<0||j<0)return x;const ps=pS(x,i),ae=x.indexOf('</w:p>',i)+6,bs=pS(x,j),be=x.indexOf('</w:p>',j)+6;return keep?x.slice(0,ps)+x.slice(ae,bs)+x.slice(be):x.slice(0,ps)+x.slice(be)};
const genDoc=async lang=>{
 const gm=$('#gm');gm.className='msg';gm.textContent='';
 try{
  if(typeof JSZip==='undefined'){gm.textContent='No se pudo cargar el generador de archivos.';return}
  let dl=null;try{dl=window.claude?await claude.use('downloads'):null}catch(e){}
  const z=await JSZip.loadAsync(lang==='en'?TPL_EN:TPL,{base64:true});
  let x=await z.file('word/document.xml').async('string');
  const H=S.h,cp=k=>S.items.filter(i=>i.cat===k),tx=it=>parts(it).join('');
  const rp=(t,v)=>{x=x.split(t).join(xe(v))};
  EN=lang==='en';try{
  const noInc=[],notasX=[],ni=(n,t)=>noInc.push([ALLN.indexOf(n),t]);
  {const v=VEND.find(q=>q.n===H.ven)||{n:'Aristides Venegas V',p:'Subgerente de ventas',pe:'Assistant Sales Manager',t:'7205-2109'};rp('[[VEN]]',v.n);rp('[[PUE]]',lang==='en'?v.pe:v.p);rp('[[TEL]]',v.t)}
  rp('[[CLIENTE]]',H.cli||'');rp('[[CONSTRUCTORA]]',H.con||'');const dd=H.des||L('Suministro e instalación del sistema HVAC','Supply and installation of the HVAC system');rp('[[DESCT]]',dd);rp('[[DESC]]',dd);rp('[[PROYECTO_UP]]',(H.pro||'').toUpperCase());rp('[[PROYECTO]]',H.pro||'');
  x=rep(x,'[[EQ]]',GR.eq.flatMap(cp).flatMap(it=>[tx(it),...(it.ex||[])]));
  const NP=(parOf(x,'[[TUB]]')||{}).xml||'',mkP=t=>NP.replace('[[TUB]]',()=>xe(t));
  const LT=cp('tu').flatMap(it=>[tx(it),...(it.ex||[])]);
  {const v=NV('Soportería tubería'),t=EN?NSO_EN:NSO;if(LT.length){if(v==='Sí')LT.push(t[0]);else if(v==='No')ni('Soportería tubería',t[1])}}
  x=rep(x,'[[TUB]]',LT);
  const dh=parOf(x,'[[DH]]'),db=parOf(x,'[[DB]]');
  if(dh&&db){x=x.slice(0,db.s)+x.slice(db.e);let g=cp('du').map(it=>dh.xml.replace('[[DH]]',()=>xe(cats.du.lead(it.d)+':'))+duB(it.d).concat(it.ex||[]).map(l=>db.xml.replace('[[DB]]',()=>xe(l))).join('')).join('');
   {const v=NV('Grilla metálica'),t=EN?NGR_EN:NGR;if(g){if(v==='Sí')g+=mkP(t[0]);else if(v==='No')ni('Grilla metálica',t[1])}}
   x=x.slice(0,dh.s)+g+x.slice(dh.e)}
  const MV=['Grúa','Conexiones eléctricas','Trabajo civil','Sellos corta fuego','Canalización y cableado',...NEXTRA],KP=['Exonerado','Pasarelas','BMS'];
  const hx=[];ALLN.forEach(n=>{const t=(EN?NT_EN:NT)[n];if(!t)return;const v=NV(n);let here=[];
   if(v==='Sí'){if(MV.includes(n))notasX.push(...A(t[0]));else here=A(t[0])}
   else if(v==='No'){if(KP.includes(n))here=A(t[1]);else if(n==='Horario extendido')hx.push(...A(t[1]));else A(t[1]).forEach(q=>ni(n,q))}
   x=rep(x,'[[N:'+n+']]',here)});
  if(S.tipo==='com')notasX.push(EN?'Our personnel are trained to comply with occupational safety procedures and standards. Should Multifrio be required to provide an occupational safety professional, this can be quoted separately.':'Nuestro personal se encuentra capacitado para acatar los procedimientos y estándares de seguridad ocupacional. De ser necesario que Multifrio disponga de un profesional en seguridad ocupacional, se puede cotizar por aparte.');notasX.push(...hx);x=rep(x,'[[NS]]',notasX);noInc.sort((a,b)=>a[0]-b[0]);const cm=S.tipo==='com',niL=(cm?(EN?NID0_EN:NID0):[]).concat(noInc.map(q=>q[1]),cm?(EN?NID_EN:NID):[]);x=rep(x,'[[NOINC]]',niL);x=sec(x,'NI',niL.length>0);
  x=sec(x,'VE',NV('Tabla VE')==='Sí');x=sec(x,'AL',NV('Tabla Allowances')==='Sí');
  x=rep(x,'[[TN]]',[...new Set(GR.eq.flatMap(cp).map(it=>it.cat==='dp'?'Dampers':it.cat==='te'?(EN?cap(nm(it.item,it.d)[1]):(TEN[it.d.t]?(n=>n[0].toUpperCase()+n.slice(1))(TEN[it.d.t][1]):'Terminales de aire')):(EN?cap(nm(it.item,it.d)[0]):it.item)))]);
  z.file('word/document.xml',x);}finally{EN=false}
  const ff=z.file('word/footer1.xml');if(ff){const f=await ff.async('string');z.file('word/footer1.xml',f.split('[[INI]]').join(xe(H.ini||'')))}
  const hf=z.file('word/header1.xml');if(hf){const MS=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],n=new Date(),fe=lang==='en'?['January','February','March','April','May','June','July','August','September','October','November','December'][n.getMonth()]+' '+n.getDate()+', '+n.getFullYear():n.getDate()+' de '+MS[n.getMonth()]+' de '+n.getFullYear(),v0=(H.seq||'').trim(),sq=!v0?'2026-xxxxx':/^\d+$/.test(v0)?n.getFullYear()+'-'+v0:v0;z.file('word/header1.xml',(await hf.async('string')).split('[[FECHA]]').join(fe).split('2026-xxxxx').join(xe(sq)))}
  const blob=await z.generateAsync({type:'blob',mimeType:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',compression:'DEFLATE'});
  const q0=(S.h.seq||'').trim(),qs=!q0?'2026-xxxxx':/^\d+$/.test(q0)?new Date().getFullYear()+'-'+q0:q0;
  const fnm=(qs+' - '+(S.h.pro||'sin proyecto')).replace(/[\\/:*?"<>|]/g,'').trim();
  const fn=fnm+(lang==='en'?' (English)':'')+'.docx';
  const local=()=>{const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=fn;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),8000)};
  if(dl){
   try{await dl.save({filename:fn,data:blob});gm.className='msg ok';gm.textContent='Documento generado';return}
   catch(e){
    const c=e&&e.code;
    if(c==='declined'){gm.textContent='Descarga cancelada. Presione el botón otra vez y acepte el aviso de descarga.';return}
    if(c==='rate_limited'){gm.textContent='Hay un aviso de descarga abierto. Acéptelo o espere unos segundos y reintente.';return}
   }
  }
  try{local();gm.className='msg ok';gm.textContent='Descarga iniciada. Si no aparece el archivo, abra este enlace en claude.ai con su cuenta e inténtelo de nuevo.'}
  catch(e2){gm.textContent='Este visor bloquea las descargas. Abra el enlace en claude.ai con su cuenta (o en el navegador de escritorio) e inténtelo de nuevo.'}
 }catch(e){gm.textContent='No se pudo generar el documento'+(e&&e.message?': '+e.message:'')}
};
$('#gen').addEventListener('click',()=>genDoc('es'));$('#gen-en').addEventListener('click',()=>genDoc('en'));

