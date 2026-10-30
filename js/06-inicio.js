
let clrT=null;
function clrReset(){const b=$('#clr');b.textContent='Limpiar todo';b.dataset.s='';$('#clrc').hidden=true;clearTimeout(clrT)}
$('#clr').addEventListener('click',()=>{
 const b=$('#clr');
 if(b.dataset.s!=='1'){b.dataset.s='1';b.textContent='Sí, borrar todo';$('#clrc').hidden=false;clrT=setTimeout(clrReset,6000);return}
 clrReset();
 S={h:{cli:'',con:'',pro:'',des:'',ini:'',seq:''},items:[],notes:{}};LE=null;editId=null;editG=null;CUR.eq={cat:'ch',item:'Chiller'};CUR.ma={cat:'du',item:'Ducto'};
 ['cli','con','pro','des','ini','seq'].forEach(k=>$('#'+k).value='');
 save();renderForm('eq');renderForm('ma');renderList();renderNotes();
 const g=$('#gm');g.className='msg ok';g.textContent='Datos limpiados';setTimeout(()=>{g.textContent='';g.className='msg'},2500);
});
$('#clrc').addEventListener('click',clrReset);

load();
$('#cli').value=S.h.cli||'';$('#con').value=S.h.con||'';$('#pro').value=S.h.pro||'';$('#des').value=S.h.des||'';$('#ini').value=S.h.ini||'';$('#seq').value=S.h.seq||'';
renderForm('eq');renderForm('ma');renderList();renderNotes();
