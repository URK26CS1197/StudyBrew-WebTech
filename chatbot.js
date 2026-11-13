// Floating study-doubts chatbot (keyword matching)
(function(){
const KB=[[/^(hi|hello|hey)\b/,"Hey there! ☕ Ask me about studying, Pomodoro, HTML, CSS, JS, or Git."],
[/pomodoro|focus|timer/,"Pomodoro: 25 min focus, 5 min break, and a 15 min break after 4 rounds. Keep your phone away!"],
[/assignment|deadline|due/,"Add assignments with due dates on the dashboard. Tackle the earliest deadline first."],
[/todo|task|plan/,"Break big tasks into 20-30 minute chunks and tick them off in your To-Do list."],
[/quiz|test|exam/,"Try the quick quiz on your dashboard. Re-testing yourself beats re-reading notes."],
[/flex/,"Flexbox arranges items in one dimension: display:flex with flex-direction, justify-content and align-items."],
[/grid/,"CSS Grid is two-dimensional: display:grid with grid-template-columns, e.g. 250px 1fr 300px."],
[/html/,"HTML gives a page its structure: use semantic tags like header, nav, main, section and footer."],
[/css/,"CSS styles HTML. Use custom properties (--color) to build themes like light/dark mode."],
[/regex|validation/,"A regex is a pattern for matching text, e.g. /^[6-9]\\d{9}$/ checks a 10-digit mobile number."],
[/javascript|js\b|dom/,"JavaScript adds behaviour: select elements, listen for events and update the DOM."],
[/git|github/,"Git tracks changes: git add ., git commit -m 'msg', git push. GitHub hosts your repo."],
[/vercel|deploy|host/,"Push your repo to GitHub, import it in Vercel, and you get a live HTTPS URL."],
[/tired|stress|sleep|coffee/,"Take a short break, drink water, stretch. A coffee is fine, but sleep matters more! ☕"]];
const fab=document.createElement('button');fab.id='fab';fab.textContent='💬';fab.setAttribute('aria-label','Open study chatbot');
const box=document.createElement('div');box.id='chat';
box.innerHTML='<header>☕ Brew Bot</header><div id="log"></div><form id="chatForm"><input id="chatIn" placeholder="Ask a doubt..." autocomplete="off"><button>Send</button></form>';
document.body.append(fab,box);
const log=box.querySelector('#log');
function add(t,c){const m=document.createElement('div');m.className=c;m.textContent=t;log.appendChild(m);log.scrollTop=log.scrollHeight}
function reply(q){q=q.toLowerCase();const h=KB.find(x=>x[0].test(q));return h?h[1]:"Hmm, I don't know that yet. Try asking about Pomodoro, HTML, CSS, JavaScript, Git or deadlines."}
fab.addEventListener('click',()=>{box.classList.toggle('open');if(!log.children.length)add("Hi! I'm Brew Bot ☕ What's your doubt?",'bot-msg')});
box.querySelector('#chatForm').addEventListener('submit',e=>{e.preventDefault();const i=document.getElementById('chatIn'),q=i.value.trim();if(!q)return;
 add(q,'user-msg');i.value='';setTimeout(()=>add(reply(q),'bot-msg'),400)});
})();
