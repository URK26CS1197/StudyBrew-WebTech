// Light/Dark toggle with localStorage persistence
(function(){const K='sb-theme',r=document.documentElement;
const set=t=>{r.setAttribute('data-theme',t);try{localStorage.setItem(K,t)}catch(e){}
 const b=document.getElementById('themeToggle');if(b)b.textContent=t==='dark'?'☀️':'🌙'};
let s=null;try{s=localStorage.getItem(K)}catch(e){}
set(s||'light');
document.addEventListener('DOMContentLoaded',()=>{const b=document.getElementById('themeToggle');set(r.getAttribute('data-theme'));
 if(b)b.addEventListener('click',()=>set(r.getAttribute('data-theme')==='dark'?'light':'dark'))});})();
