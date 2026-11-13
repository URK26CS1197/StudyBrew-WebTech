// Dashboard: assignments, to-do, Pomodoro, quiz, drawer menu
const ld=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}},sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const $=id=>document.getElementById(id),esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
$('menuBtn').addEventListener('click',()=>$('sidebar').classList.toggle('open'));
document.querySelectorAll('.side-link').forEach(a=>a.addEventListener('click',()=>$('sidebar').classList.remove('open')));
let A=ld('sb-a',[]),T=ld('sb-t',[]),P=ld('sb-p',0);
function stats(){$('sA').textContent=A.filter(a=>!a.done).length;$('sT').textContent=T.filter(t=>t.done).length+'/'+T.length;$('sP').textContent=P}
function drawA(){A.sort((a,b)=>a.due.localeCompare(b.due));$('aList').innerHTML=A.map((a,i)=>{const late=!a.done&&a.due<new Date().toISOString().slice(0,10);
 return `<div class="item ${a.done?'done':''}"><span><input type="checkbox" style="width:auto" ${a.done?'checked':''} data-i="${i}" class="ac"> <b>${esc(a.title)}</b> (${esc(a.sub)}) <span class="badge ${late?'late':''}">${a.due}${late?' overdue':''}</span></span><button data-i="${i}" class="ad icon-btn">✕</button></div>`}).join('')||'<p>No assignments yet. ☕</p>';stats();sv('sb-a',A)}
$('aForm').addEventListener('submit',e=>{e.preventDefault();A.push({title:$('aT').value.trim(),sub:$('aS').value.trim()||'General',due:$('aD').value,done:false});e.target.reset();drawA()});
$('aList').addEventListener('click',e=>{const i=e.target.dataset.i;if(e.target.classList.contains('ad'))A.splice(i,1);else if(e.target.classList.contains('ac'))A[i].done=!A[i].done;else return;drawA()});
function drawT(){$('tList').innerHTML=T.map((t,i)=>`<div class="item ${t.done?'done':''}"><span><input type="checkbox" style="width:auto" ${t.done?'checked':''} data-i="${i}" class="tc"> <span>${esc(t.text)}</span></span><button data-i="${i}" class="td icon-btn">✕</button></div>`).join('')||'<p>Nothing to do. Nice!</p>';stats();sv('sb-t',T)}
$('tForm').addEventListener('submit',e=>{e.preventDefault();const v=$('tIn').value.trim();if(v)T.push({text:v,done:false});e.target.reset();drawT()});
$('tList').addEventListener('click',e=>{const i=e.target.dataset.i;if(e.target.classList.contains('td'))T.splice(i,1);else if(e.target.classList.contains('tc'))T[i].done=!T[i].done;else return;drawT()});
// Pomodoro
const M={focus:25,short:5,long:15};let mode='focus',left=25*60,iv=null;
function tick(){const m=String(Math.floor(left/60)).padStart(2,'0'),s=String(left%60).padStart(2,'0');$('time').textContent=m+':'+s;document.title=`${m}:${s} StudyBrew`}
function stop(){clearInterval(iv);iv=null;$('pStart').textContent='Start'}
document.querySelectorAll('.tabs button').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.m;left=M[mode]*60;stop();document.querySelectorAll('.tabs button').forEach(x=>x.classList.toggle('on',x===b));tick()}));
$('pStart').addEventListener('click',()=>{if(iv)return stop();$('pStart').textContent='Pause';
 iv=setInterval(()=>{left--;tick();if(left<=0){stop();if(mode==='focus'){P++;sv('sb-p',P);stats()}alert(mode==='focus'?'Focus session done! Take a coffee break ☕':'Break over, back to work!');left=M[mode]*60;tick()}},1000)});
$('pReset').addEventListener('click',()=>{stop();left=M[mode]*60;tick()});
// Quiz
const Q=[["Which tag holds the page's main navigation links?",["<nav>","<div>","<head>","<aside>"],0],
["Which CSS property creates a grid layout?",["display:flex","display:grid","float:grid","position:grid"],1],
["Which method saves data persistently in the browser?",["localStorage","alert()","console.log()","Array.push()"],0],
["Which symbol is used for a CSS class selector?",["#",".","*","&"],1],
["Which Git command uploads commits to GitHub?",["git init","git clone","git push","git add"],2]];
let qi=0,sc=0;
function drawQ(){const q=Q[qi];if(!q){$('quiz').innerHTML=`<h3>Score: ${sc}/${Q.length} ${sc>=4?'☕ Great brew!':'Keep studying!'}</h3><button id="qr">Retry</button>`;$('qr').onclick=()=>{qi=0;sc=0;drawQ()};return}
 $('quiz').innerHTML=`<p><b>Q${qi+1}/${Q.length}:</b> ${esc(q[0])}</p>`+q[1].map((o,i)=>`<button class="opt" data-i="${i}">${esc(o)}</button>`).join('')+'<button id="qn" disabled>Next</button>';
 $('quiz').querySelectorAll('.opt').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(i===q[2])sc++;
  $('quiz').querySelectorAll('.opt').forEach((x,j)=>{x.disabled=true;if(j===q[2])x.classList.add('right');else if(x===b)x.classList.add('wrong')});$('qn').disabled=false});
 $('qn').onclick=()=>{qi++;drawQ()}}
drawA();drawT();drawQ();tick();
