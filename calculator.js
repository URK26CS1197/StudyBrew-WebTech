// Calculator module (digits, + - * /, C, =) with error handling
(function(){const d=document.getElementById('display');if(!d)return;let ex='';
const keys=['7','8','9','/','4','5','6','*','1','2','3','-','0','.','C','+'];
const k=document.getElementById('keys');
keys.concat(['=']).forEach(x=>{const b=document.createElement('button');b.textContent=x;if(x==='=')b.style.gridColumn='span 4';k.appendChild(b);
 b.addEventListener('click',()=>press(x))});
function show(t){d.textContent=t||'0'}
function press(x){if(ex==='Error')ex='';
 if(x==='C'){ex='';return show()}
 if(x==='='){if(!ex)return;try{if(!/^[0-9+\-*/. ]+$/.test(ex))throw 0;
   const r=Function('"use strict";return ('+ex+')')();if(!isFinite(r))throw 0;ex=String(+r.toFixed(8))}catch(e){ex='Error'}return show(ex)}
 if(/[+\-*/]$/.test(ex)&&/[+\-*/]/.test(x))ex=ex.slice(0,-1);
 ex+=x;show(ex)}
show();})();
