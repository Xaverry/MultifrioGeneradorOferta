let EN=false;const L=(a,b)=>EN?b:a;
const $=s=>document.querySelector(s);
const h=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const TYM=['Trane','York','Midea'],YTM=['York','Trane','Midea'],TB=['Taco','Bell & Gossett'],R=['R410A','R534','TBD'],E=['460/3/60','220/3/60'];
const fd=(k,l,w,p,r)=>({k,l,w,p,r});
const pre=t=>v=>t+' '+v;
const ev=v=>{const m=/^(\d+)\/(\d)\/(\d+)$/.exec(v);return m?m[1]+'V/'+m[2]+'Ph/'+m[3]+'Hz':v};
const ele=v=>'alimentación eléctrica '+ev(v);
const UN=['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve','veinte','veintiuno','veintidós','veintitrés','veinticuatro','veinticinco','veintiséis','veintisiete','veintiocho','veintinueve'],TN=['','','','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'],CN=['','ciento','doscientos','trescientos','cuatrocientos','quinientos','seiscientos','setecientos','ochocientos','novecientos'];
function nb(n){if(n<30)return UN[n];if(n<100)return TN[Math.floor(n/10)]+(n%10?' y '+UN[n%10]:'');if(n===100)return 'cien';return CN[Math.floor(n/100)]+(n%100?' '+nb(n%100):'')}
const cap=s=>s?s[0].toUpperCase()+s.slice(1):s;
const NE=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'],TE=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
function nbE(n){if(n<20)return NE[n];if(n<100)return TE[Math.floor(n/10)]+(n%10?'-'+NE[n%10]:'');return NE[Math.floor(n/100)]+' hundred'+(n%100?' '+nbE(n%100):'')}
const num=(n,f)=>{if(EN)return (n>=1&&n<=999)?cap(nbE(n)):String(n);if(!(n>=1&&n<=999))return String(n);let s=nb(n);if(f)s=s.replace(/ientos/g,'ientas');s=s.replace(/veintiuno$/,f?'veintiuna':'veintiún').replace(/uno$/,f?'una':'un');return s[0].toUpperCase()+s.slice(1)};
const NM={'Damper':['damper','dampers',0],'Bomba de agua helada':['bomba de agua helada','bombas de agua helada',1],'Bomba de procesos':['bomba de procesos','bombas de procesos',1],'Bomba de recirculación':['bomba de recirculación','bombas de recirculación',1],'Tanque Buffer':['tanque de almacenamiento tipo buffer','tanques de almacenamiento tipo buffer',0],'Enfriado por aire':['chiller enfriado por aire','chillers enfriados por aire',0],'Enfriado por agua':['chiller enfriado por agua','chillers enfriados por agua',0],'Para procesos':['chiller para procesos','chillers para procesos',0],'Modular':['chiller modular','chillers modulares',0],'Manejadora de aire':['unidad manejadora de aire','unidades manejadoras de aire',1],'Make-Up':['unidad Make-Up','unidades Make-Up',1],'DOAS':['unidad DOAS','unidades DOAS',1],'Paquete':['unidad paquete','unidades paquete',1],'Fan coil':['unidad fan coil','unidades fan coil',1],'Condensadora VRF':['condensadora VRF','condensadoras VRF',1],'Condensadora DX':['condensadora DX','condensadoras DX',1],'Evaporadora VRF':['evaporadora VRF','evaporadoras VRF',1],'Evaporadora DX':['evaporadora DX','evaporadoras DX',1],'Termostato':['termostato','termostatos',0],'Control central':['control central','controles centrales',0],'Gateway':['gateway','gateways',0],'Extractor':['extractor','extractores',0],'Inyector':['inyector','inyectores',0],'Jet Fan tubular':['jet fan tubular','jet fans tubulares',0],'Jet Fan perfil bajo':['jet fan perfil bajo','jet fans perfil bajo',0],'Chiller':['chiller','chillers',0],'Manejadora':['unidad manejadora de aire','unidades manejadoras de aire',1],'Bomba':['bomba','bombas',1],'Tanque de expansión':['tanque de expansión','tanques de expansión',0],'Separador de aire':['separador de aire','separadores de aire',0],'Tanque buffer':['tanque de almacenamiento tipo buffer','tanques de almacenamiento tipo buffer',0],'FanCoil':['unidad fan coil','unidades fan coil',1],'Blower coil':['unidad blower coil','unidades blower coil',1],'Condensador VRF':['condensador VRF','condensadores VRF',0],'Evaporadora VRF':['unidad evaporadora VRF','unidades evaporadoras VRF',1],'Sistema de expansión directa':['sistema de expansión directa','sistemas de expansión directa',0],'Cortina de aire':['cortina de aire','cortinas de aire',1],'Ventilador':['ventilador','ventiladores',0]};
const TEN={'Difusor':['difusor','difusores',0],'Difusor lineal':['difusor lineal','difusores lineales',0],'Rejilla de extracción':['rejilla de extracción','rejillas de extracción',1],'Rejilla de retorno':['rejilla de retorno','rejillas de retorno',1],'Rejilla lineal':['rejilla lineal','rejillas lineales',1],'Louver':['louver','louvers',0]};
const NME={'Damper':['damper','dampers'],'Bomba de agua helada':['chilled water pump','chilled water pumps'],'Bomba de procesos':['process pump','process pumps'],'Bomba de recirculación':['recirculation pump','recirculation pumps'],'Tanque Buffer':['buffer storage tank','buffer storage tanks'],'Enfriado por aire':['air-cooled chiller','air-cooled chillers'],'Enfriado por agua':['water-cooled chiller','water-cooled chillers'],'Para procesos':['process chiller','process chillers'],'Modular':['modular chiller','modular chillers'],'Manejadora de aire':['air handling unit','air handling units'],'Make-Up':['make-up air unit','make-up air units'],'DOAS':['DOAS unit','DOAS units'],'Paquete':['packaged unit','packaged units'],'Fan coil':['fan coil unit','fan coil units'],'Blower coil':['blower coil unit','blower coil units'],'Condensadora VRF':['VRF condensing unit','VRF condensing units'],'Condensadora DX':['DX condensing unit','DX condensing units'],'Evaporadora VRF':['VRF evaporator unit','VRF evaporator units'],'Evaporadora DX':['DX evaporator unit','DX evaporator units'],'Termostato':['thermostat','thermostats'],'Control central':['central controller','central controllers'],'Gateway':['gateway','gateways'],'Extractor':['exhaust fan','exhaust fans'],'Inyector':['supply fan','supply fans'],'Jet Fan tubular':['tubular jet fan','tubular jet fans'],'Jet Fan perfil bajo':['low-profile jet fan','low-profile jet fans'],'Cortina de aire':['air curtain','air curtains'],'Chiller':['chiller','chillers'],'Tanque de expansión':['expansion tank','expansion tanks'],'Separador de aire':['air separator','air separators']};
const TENE={'Difusor':['diffuser','diffusers'],'Difusor lineal':['linear diffuser','linear diffusers'],'Rejilla de extracción':['exhaust grille','exhaust grilles'],'Rejilla de retorno':['return grille','return grilles'],'Rejilla lineal':['linear grille','linear grilles'],'Louver':['louver','louvers']};
const VTE={'De cielo':'ceiling-mounted','En línea':'inline','De techo':'roof-mounted','Hongo':'mushroom-type','Axial':'axial','Penthouse':'penthouse'},DPE={'Balance':'balancing','Motorizado':'motorized','Contra flujo':'backdraft','Corta fuego 1.5H':'fire','Corta fuego 3H':'fire','Corta humo':'smoke'},TYE={'Pared alta':'high-wall','Piso cielo':'floor/ceiling','Cassette 2 vías':'2-way cassette','Cassette 4 vías':'4-way cassette','Fan coil':'fan coil','Manejadora':'air handler'},CPE={Scroll:'scroll',Tornillo:'screw','Centrífugo':'centrifugal'},COLE={Blanco:'white',Negro:'black'};
const FEN=(k,c,v)=>{switch(k){
 case 't':return c==='ch'?'with '+(CPE[v]||v.toLowerCase())+' compressors':'type '+(TYE[v]||v);
 case 'm':return 'brand '+v;case 'mo':return 'model '+v;
 case 'c':return (c==='ve'?'airflow ':c==='bo'?'flow rate ':'capacity ')+v;
 case 'r':return v==='Agua helada'?'water-cooled':'refrigerant '+v;
 case 'e':return 'electrical power supply '+ev(v);
 case 'd':return 'pressure drop '+v+' in w.g.';
 case 'b':return 'BMS communication protocol '+v;
 case 'tm':return 'size '+v;
 default:return v}};
const qleadA=(d,it,adj)=>{const n=+d.q,x=nm(it,d);return num(n)+' ('+n+') '+(adj?adj+' ':'')+(n===1?x[0]:x[1])};
const nm=(it,d)=>EN?(it==='Terminal de aire'?(TENE[d.t]||['air terminal','air terminals']):(NME[it]||[it.toLowerCase(),it.toLowerCase()+'s'])):it==='Terminal de aire'?(TEN[d.t]||['terminal de aire','terminales de aire',0]):(NM[it]||[it.toLowerCase(),it.toLowerCase()+'s',0]);
const qlead=(d,it)=>{const n=+d.q,x=nm(it,d);return num(n,x[2])+' ('+n+') '+(n===1?x[0]:x[1])};
const MD={HG:'lámina de acero galvanizado',HN:'lámina de hierro negro',SS304:'lámina de acero inoxidable 304',SS316:'lámina de acero inoxidable 316',Inox:'acero inoxidable'},MT={HN:'hierro negro',PVC:'PVC','PVC-Preaislada':'PVC preaislado','HN-Preaislada':'hierro negro preaislado'},AIS={'K-Flex':'elastomérico flexible de celda cerrada K-Flex',Kflex:'elastomérico flexible de celda cerrada K-Flex',Armacell:'elastomérico flexible Armacell'},CHQ={Aluminio:'aluminio',Inoxidable:'acero inoxidable',Inox:'acero inoxidable',PVC:'PVC'},SVT={'Drenaje condensados':'drenaje de condensados'};
const esp=v=>/^\d+(\.\d+)?$/.test(v)?v+(v==='1'?' pulgada':' pulgadas'):v;
const apT=v=>v==='AC'?'aire acondicionado':v.toLowerCase();
function duBE(d){const M={HG:'galvanized steel sheet',HN:'black iron sheet',SS304:'304 stainless steel sheet',SS316:'316 stainless steel sheet',Inox:'stainless steel'};
 const m=d.ma?(M[d.ma]||d.ma):'';
 const c=d.ti==='TDC'?', using TDC flange connections':(d.ti==='Spiro'||d.ti==='Spiro ducto')?', Spiro (round) type':d.ti==='S-Corredera'?', S-slip type':d.ti==='Grafado'?', lock-seam type':d.ti?', type '+d.ti:'';
 const a=d.ai==='Sí'?', and including flexible fiberglass insulation'+(d.r&&d.r!=='Estándar'?' with an R-'+d.r.replace(/^R-?/i,'')+' value':''):(d.ai==='No'&&d.ck!=='Sí')?', without insulation':'';
 const Q=['Ductwork fabricated'+(m?' in '+m:'')+', with gauges in accordance with SMACNA standards'+c+a+'.'];
 if(d.ca&&d.ca!=='N/A')Q.push('Designed for an external static pressure of '+d.ca+'” w.g.');return Q}
function tuVE(d){return 'Supply and installation of copper refrigerant piping with external rubber foam insulation'+(d.ai?', brand '+d.ai:'')+', 3/4” thick for the suction line and 1/2” thick for the liquid line. An exterior coating of Surfastyl paint is included for copper piping exposed to the weather.'}
function tuRE(d){const p=[],MTE={HN:'black iron',PVC:'PVC','PVC-Preaislada':'pre-insulated PVC','HN-Preaislada':'pre-insulated black iron'},AE={'K-Flex':'K-Flex flexible closed-cell elastomeric',Kflex:'K-Flex flexible closed-cell elastomeric',Armacell:'Armacell flexible elastomeric'},CE={Aluminio:'aluminum',Inoxidable:'stainless steel',Inox:'stainless steel',PVC:'PVC'};
 if(d.ti)p.push(d.ti==='ERW'?'ERW':d.ti==='Sin costura'?'seamless':'type '+d.ti);
 if(d.ma)p.push((d.ma==='HN'?'carbon steel':(MTE[d.ma]||d.ma))+' material');
 if(d.cd)p.push('schedule '+d.cd);
 if(d.ma==='HN')p.push('threaded for diameters smaller than 2 ½ in and welded for larger diameters');
 if(d.ai||d.es)p.push('with '+(d.ai?(AE[d.ai]||d.ai)+' ':'')+'insulation'+(d.es?', '+(/^\d+(\.\d+)?$/.test(d.es)?d.es+(d.es==='1'?' inch':' inches'):d.es)+' thick':''));
 if(d.ch)p.push(d.ch==='No'?'without jacket':'with '+(CE[d.ch]||d.ch)+' jacket'+(d.ub?' for piping to be installed '+(d.ub==='Exterior'?'outdoors':d.ub==='Interior'?'indoors':d.ub.toLowerCase()):''));
 return (p.length?', '+p.join(', '):'')+'.'}
const APE={'Aire acondicionado':'Air conditioning',AC:'Air conditioning','Aire fresco':'Fresh air','Extracción':'Exhaust'},SVE={'Agua helada':'Chilled water','Agua de procesos':'Process water','Drenaje condensados':'Condensate drain'};
function duB(d){
 if(EN)return duBE(d);
 const m=d.ma?(MD[d.ma]||d.ma):'';
 const c=d.ti==='TDC'?', utilizando conexiones mediante bridas TDC':(d.ti==='Spiro'||d.ti==='Spiro ducto')?', tipo Spiro (redondo)':d.ti?', tipo '+d.ti:'';
 const a=d.ai==='Sí'?', e incluyendo aislamiento de fibra de vidrio flexible'+(d.r&&d.r!=='Estándar'?' con valor R-'+d.r.replace(/^R-?/i,''):''):(d.ai==='No'&&d.ck!=='Sí')?', sin aislamiento':'';
 const L=['Ductería fabricada'+(m?' en '+m:'')+', con calibres conforme a los estándares SMACNA'+c+a+'.'];
 if(d.ca&&d.ca!=='N/A')L.push('Diseñada para una presión estática externa de '+d.ca+'” w.g.');
 return L}
function tuV(d){if(EN)return tuVE(d);return 'Suministro e instalación de tuberías de cobre para refrigerante con aislamiento externo de espuma de hule'+(d.ai?' marca '+d.ai:'')+' de 3/4” de espesor para la línea de succión y de 1/2” de espesor para la línea de líquido. Se considera recubrimiento exterior con pintura Surfastyl para la tubería de cobre expuesta a la intemperie.'}
function tuR(d){if(EN)return tuRE(d);const p=[];
 if(d.ti)p.push(d.ti==='ERW'?'ERW':d.ti==='Sin costura'?'sin costura':'tipo '+d.ti);
 if(d.ma)p.push('material '+(d.ma==='HN'?'acero al carbono':(MT[d.ma]||d.ma)));
 if(d.cd)p.push('cédula '+d.cd);
 if(d.ma==='HN')p.push('roscado para diámetros menores a 2 ½ in y soldado para diámetros mayores');
 if(d.ai||d.es)p.push('con aislamiento'+(d.ai?' '+(AIS[d.ai]||d.ai):'')+(d.es?' de '+esp(d.es)+' de espesor':''));
 if(d.ch)p.push(d.ch==='No'?'sin chaqueta':'con chaqueta de '+(CHQ[d.ch]||d.ch)+(d.ub?' para tubería a instalar en '+d.ub.toLowerCase():''));
 return (p.length?', '+p.join(', '):'')+'.'}
const COL=['Blanco','Negro','A definir'];COL.nO=1;
const cats={
 ch:{label:'Chillers',lead:qlead,skip:['q'],
  fields:[fd('q','Cantidad',0,'',1),fd('t','Tipo',pre('tipo')),fd('m','Marca',pre('marca')),fd('mo','Modelo',pre('modelo')),fd('c','Capacidad',pre('capacidad'),'Ej. 100 TR'),fd('r','Refrigerante',pre('refrigerante')),fd('e','Eléctrico',ele)],
  base:{q:'n',mo:'t',c:'t',e:E},
  items:{'Chiller':{t:['Scroll','Tornillo','Centrífugo'],m:TYM,r:R},'Manejadora':{t:'t',m:TYM,r:R},'Bomba':{t:['End suction','In-line','Split case'],m:TB},'Tanque de expansión':{m:TB},'Separador de aire':{m:TB},'Tanque buffer':{m:TB},'FanCoil':{m:TYM,r:R},'Blower coil':{m:TYM,r:R},'Condensador VRF':{t:['Descarga vertical'],m:YTM,r:R},'Evaporadora VRF':{t:['Fancoil','Pared alta','Cassette'],m:YTM,r:R},'Sistema de expansión directa':{t:['Piso cielo','Minisplit'],m:YTM,r:R}}},
 ve:{label:'Ventilación',skip:['q','t','gz','ac','at'],selAfter:'q',gzOff:['q','t','mo','c','d','e'],gzReq:['m'],
  lead:(d,it)=>EN?qleadA(d,it,d.t?(VTE[d.t]||d.t.toLowerCase()):''):qlead(d,it)+(d.t?(d.t==='Hongo'?' tipo ':' ')+d.t.toLowerCase():''),
  gen:(d,it)=>[L('Suministro e instalación de ','Supply and installation of ')+nm(it,d)[1],L(', marca '+d.m+' o similar aprobado.',', brand '+d.m+' or approved equal.')],
  fields:[fd('q','Cantidad',0,'',1),fd('t','Tipo'),fd('gz','Generalizar'),fd('m','Marca',pre('marca')),fd('mo','Modelo',pre('modelo')),fd('c','Caudal',pre('caudal'),'Ej. 2000 CFM'),fd('d','Caída',v=>'caída '+v+' in w.g.'),fd('e','Eléctrico',ele),fd('ac','Accesorios'),fd('at','Información de accesorios',0,'Detalle de accesorios')],
  base:{q:'n',t:['De cielo','En línea','De techo','Hongo','Axial','Penthouse'],gz:'C',m:['Greenheck','Loren Cook','SystemAir','Cassals','Soler & Palau','VTS','Bernel','Mars'],mo:'t',c:'t',e:['115/1/60','208/1/60','220/1/60','208/3/60','220/3/60','460/3/60'],ac:'C',at:'t'},
  items:{'Extractor':{d:'t'},'Inyector':{d:'t'},'Jet Fan tubular':{},'Jet Fan perfil bajo':{},'Cortina de aire':{}}},
 te:{label:'Terminales de aire',lead:qlead,skip:['q','t'],gzOff:['q','mo','dm','tm','co'],gzReq:['t','m'],
  gen:(d,it)=>[L('Suministro e instalación de ','Supply and installation of ')+nm(it,d)[1],L(', marca '+d.m+' o similar aprobado.',', brand '+d.m+' or approved equal.')],
  rest:d=>{const r=[];if(d.m)r.push(L('marca ','brand ')+d.m);if(d.mo)r.push(L('modelo ','model ')+d.mo);r.push(d.dm==='Sí'?L('con damper','with damper'):L('sin damper','without damper'));if(d.tm)r.push(L('tamaño ','size ')+d.tm);if(d.co)r.push(d.co==='A definir'?L('color a definir con arquitectura','color to be defined with the architect'):'color '+(EN?(COLE[d.co]||d.co):d.co));return ', '+r.join(', ')+'.'},
  fields:[fd('q','Cantidad',0,'',1),fd('gz','Generalizar'),fd('t','Tipo'),fd('m','Marca'),fd('mo','Modelo'),fd('tm','Tamaño',0,'Ej. 24x24'),fd('co','Color'),fd('dm','Damper')],
  items:{'Terminal de aire':{q:'n',gz:'C',t:['Difusor','Difusor lineal','Rejilla de extracción','Rejilla de retorno','Rejilla lineal','Louver'],m:['Price','Titus','Airguide','Laminaire','Metalaire','Innes'],mo:'t',dm:'C',tm:'t',co:COL}}},
 du:{label:'Ductos',lead:d=>EN?(d.ck==='Sí'?'Kitchen exhaust ductwork':(APE[d.ap]||d.ap)+' ductwork'):'Ductos de '+apT(d.ap)+(d.ck==='Sí'?' de cocina':''),rest:d=>': '+duB(d).join(' '),skip:['ap'],
  fields:[fd('ap','Aplicación',0,'',1),fd('ma','Material'),fd('ck','¿Ductos cocina?'),fd('ca','Caída'),fd('ai','Aislamiento'),fd('r','R'),fd('ti','Tipo')],
  items:{'Ducto':{ap:['Aire acondicionado','Aire fresco','Extracción'],ma:['HG','HN','SS304','SS316'],ca:['6','4','3','2','N/A'],ai:['Sí','No'],r:['Estándar','R6'],ti:['TDC','Spiro ducto','S-Corredera','Grafado'],ck:'c'}}},
 tu:{label:'Tuberías',lead:d=>d.sv==='VRF/DX'?'':EN?(SVE[d.sv]||d.sv)+' piping':'Tubería de '+(SVT[d.sv]||d.sv.toLowerCase()),rest:d=>d.sv==='VRF/DX'?tuV(d):tuR(d),skip:['sv'],
  fields:[fd('sv','Servicio',0,'',1),fd('ma','Material'),fd('ti','Tipo'),fd('cd','Cédula'),fd('ai','Aislamiento'),fd('es','Espesor'),fd('ch','Chaqueta'),fd('ub','Ubicación')],
  items:{'Tubería':{sv:['Agua helada','Agua de procesos','Drenaje condensados','VRF/DX'],ti:['ERW','Sin costura'],cd:['80','40','SDR32.5','SDR26'],ma:['HN','HN-Preaislada','PVC-Preaislada','PVC'],ai:['Armacell','K-Flex','Aerofoam'],es:['1','2'],ch:['Aluminio','Inoxidable','PVC','No'],ub:['Exterior','Interior']}}}
};
const NOTES=['Grúa','Soportería tubería','Grilla metálica','Pasarelas','Pasivado','Conexiones eléctricas','Trabajo civil','Sellos corta fuego','BMS','Canalización y cableado','Exonerado','Pruebas certificadas de agua','Pruebas certificadas de aire','Horario extendido','Mantenimiento','BIM','EHS','Tabla VE','Tabla Allowances'];

['bo:Bombeo','mj:Manejadoras','vr:VRF/DX'].forEach(q=>{const[k,l]=q.split(':');cats[k]=Object.assign({},cats.ch,{label:l})});
Object.assign(cats.vr,{selAfter:'q',refOn:1,itOff:it=>/^Condensadora/.test(it)?['t']:/^(Termostato|Control central|Gateway)$/.test(it)?['t','c','e','r']:['r'],base:{q:'n',t:['Pared alta','Piso cielo','Cassette 2 vías','Cassette 4 vías','Fan coil','Manejadora'],m:['Trane','York','Samsung','Midea','Daikin'],mo:'t',c:'t',r:R,e:['115/1/60','208/1/60','220/1/60','208/3/60','220/3/60','460/3/60']},items:Object.fromEntries(['Condensadora VRF','Condensadora DX','Evaporadora VRF','Evaporadora DX','Termostato','Control central','Gateway'].map(n=>[n,{}]))});
Object.assign(cats.mj,{selAfter:'q',acIn:1,skip:['q','ac'],
 fields:[fd('q','Cantidad',0,'',1),fd('m','Marca',pre('marca')),fd('mo','Modelo',pre('modelo')),fd('c','Capacidad',pre('capacidad'),'Ej. 100 TR'),fd('r','Refrigerante',v=>v==='Agua helada'?'enfriada por agua':'refrigerante '+v),fd('e','Eléctrico',ele),fd('ac','Accesorios'),fd('at','Información de accesorios',v=>v,'Detalle de accesorios')],
 base:{q:'n',m:['Trane','York','Midea'],mo:'t',c:'t',r:['Agua helada','R410A','R534A'],e:['220/3/60','460/3/60'],ac:'C',at:'t'},
 items:Object.fromEntries(['Manejadora de aire','Make-Up','DOAS','Paquete','Blower coil','Fan coil'].map(n=>[n,{}]))});
Object.assign(cats.ch,{selAfter:'q',acIn:1,itOff:it=>it==='Enfriado por agua'?['r']:[],skip:['q','ac'],
 fields:[fd('q','Cantidad',0,'',1),fd('t','Tipo',v=>'con compresores tipo '+v.toLowerCase()),fd('m','Marca',pre('marca')),fd('mo','Modelo',pre('modelo')),fd('c','Capacidad',pre('capacidad'),'Ej. 100 TR'),fd('r','Refrigerante',pre('refrigerante')),fd('e','Eléctrico',ele),fd('b','BMS',v=>'protocolo de comunicación BMS '+v),fd('ac','Accesorios'),fd('at','Información de accesorios',v=>v,'Detalle de accesorios')],
 base:{q:'n',t:['Scroll','Tornillo','Centrífugo'],m:['Trane','York','Midea'],mo:'t',c:'t',r:['R134A','R534A','R32A','R410A','R513A'],e:['220/3/60','460/3/60'],b:['BACnet IP','BACnet MS/TP','Modbus'],ac:'C',at:'t'},
 items:Object.fromEntries(['Enfriado por aire','Enfriado por agua','Para procesos','Modular'].map(n=>[n,{}]))});
Object.assign(cats.bo,{selAfter:'q',acIn:1,skip:['q','ac'],
 fields:[fd('q','Cantidad',0,'',1),fd('m','Marca',pre('marca')),fd('mo','Modelo',pre('modelo')),fd('c','Caudal',pre('caudal'),'Ej. 200 GPM'),fd('e','Eléctrico',ele),fd('ac','Accesorios'),fd('at','Información de accesorios',v=>v,'Detalle de accesorios')],
 base:{q:'n',m:['Bell & Gossett','Patterson','Armstrong'],mo:'t',c:'t',e:['220/3/60','460/3/60'],ac:'C',at:'t'},
 items:Object.fromEntries(['Bomba de agua helada','Bomba de procesos','Bomba de recirculación','Tanque de expansión','Separador de aire','Tanque Buffer'].map(n=>[n,{}]))});
const lc1=v=>v?v[0].toLowerCase()+v.slice(1):v;
const dpN=t=>t==='Corta fuego 1.5H'||t==='Corta fuego 3H'?'corta fuego':lc1(t),dpS=t=>t==='Corta fuego 1.5H'?(EN?', with a fire resistance rating of 1.5 hours':', con una resistencia al fuego de 1.5 horas'):t==='Corta fuego 3H'?(EN?', with a fire resistance rating of 3 hours':', con una resistencia al fuego de 3 horas'):'';
cats.dp={label:'Dampers',lead:(d,it)=>EN?qleadA(d,it,d.t?(DPE[d.t]||d.t.toLowerCase()):''):qlead(d,it)+(d.t?' de '+dpN(d.t):''),skip:['q','t','gz'],gzOff:['q','mo','tm'],gzReq:['t','m'],
 gen:d=>EN?['Supply and installation of '+(d.t?(DPE[d.t]||d.t.toLowerCase())+' ':'')+'dampers',', brand '+d.m+' or approved equal'+dpS(d.t)+'.']:['Suministro e instalación de dampers de '+dpN(d.t),', marca '+d.m+' o similar aprobado'+dpS(d.t)+'.'],
 rest:d=>{const r=[];if(d.m)r.push(L('marca ','brand ')+d.m);if(d.mo)r.push(L('modelo ','model ')+d.mo);if(d.tm)r.push(L('tamaño ','size ')+d.tm);return (r.length?', '+r.join(', '):'')+dpS(d.t)+'.'},
 fields:[fd('q','Cantidad',0,'',1),fd('gz','Generalizar'),fd('t','Tipo'),fd('m','Marca',pre('marca')),fd('mo','Modelo',pre('modelo')),fd('tm','Tamaño',pre('tamaño'),'Ej. 24x24')],
 items:{'Damper':{q:'n',gz:'C',t:['Balance','Motorizado','Contra flujo','Corta fuego 1.5H','Corta fuego 3H','Corta humo'],m:['Greenheck','Pottorff','Ruskin'],mo:'t',tm:'t'}}};
const VEND=[
 {n:'Esteban Salazar',p:'Business Consultant',pe:'Business Consultant',t:'4404-7133 / 7205-2075'},
 {n:'Ing. Mauricio Vargas Guerrero',p:'Gerente de Cuentas Claves',pe:'Key Accounts Manager',t:'4404-9888 / 8708-3258'},
 {n:'Karolay Mora',p:'Asesora de ventas',pe:'Sales Advisor',t:'4404-9888 / 7017-5374'},
 {n:'Deivid Herrera',p:'Ingeniero Comercial',pe:'Commercial Engineer',t:'4404-7137 / 7205-1345'},
 {n:'Ing. Aristides Venegas Vargas',p:'Subgerente de Ventas Industriales',pe:'Assistant Manager, Industrial Sales',t:'4404-7151 / 7205-2109'},
 {n:'Ing. Ariel Fonseca Rodríguez',p:'Ingeniero Comercial',pe:'Commercial Engineer',t:'4404-9888 / 7205-2286'}];
