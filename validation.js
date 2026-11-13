// Regex validation (register/signup) + sign-in behaviour
const R={name:/^[a-zA-Z\s]{2,50}$/,empId:/^[A-Z0-9]{6,12}$/i,email:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
 mobile:/^[6-9]\d{9}$/,pw:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/};
const MSG={name:'Alphabets and spaces only (2-50 chars).',empId:'Enter 6-12 alphanumeric characters.',email:'Enter a valid email address.',
 mobile:'10 digits starting with 6-9.',dept:'Please select a division.',pw:'Min 8 chars: upper, lower, number & symbol (@$!%*?&).',
 match:'Passwords do not match.',terms:'You must accept the Terms of Service.'};
function isValid(el){const rule=el.dataset.rule;
 if(rule==='dept')return el.value!=='';
 if(rule==='match')return el.value!==''&&el.value===document.getElementById(el.dataset.match).value;
 if(rule==='terms')return el.checked;
 return R[rule].test(el.value);}
function paint(el,show){const ok=isValid(el);
 let s=el.parentElement.querySelector('.error-msg');
 if(!s){s=document.createElement('span');s.className='error-msg';el.parentElement.appendChild(s)}
 if(show){el.classList.toggle('invalid',!ok);el.classList.toggle('valid',ok);s.textContent=ok?'':MSG[el.dataset.rule]}
 return ok;}
document.querySelectorAll('form[data-validate]').forEach(f=>{
 const fields=[...f.querySelectorAll('[data-rule]')],btn=f.querySelector('button[type=submit]');
 const refresh=()=>{btn.disabled=!fields.every(isValid)};
 fields.forEach(el=>{el.addEventListener('blur',()=>paint(el,true));
  el.addEventListener('input',()=>{if(el.classList.contains('invalid'))paint(el,true);refresh()});
  el.addEventListener('change',()=>{paint(el,true);refresh()})});
 f.addEventListener('submit',e=>{e.preventDefault();const all=fields.map(el=>paint(el,true));
  if(!all.every(Boolean))return;
  try{localStorage.setItem('sb-user',JSON.stringify({email:(f.querySelector('[data-rule=email]')||{}).value}))}catch(x){}
  location.href='signin.html?new=1'});
 refresh();});
// Sign-in page
const si=document.getElementById('signinForm');
if(si){const pw=document.getElementById('pw'),al=document.getElementById('alert');
 document.getElementById('eye').addEventListener('click',e=>{const h=pw.type==='password';pw.type=h?'text':'password';e.target.textContent=h?'🙈':'👁️'});
 if(location.search.includes('new=1')){al.textContent='Account created! Please sign in.';al.style.background='var(--ok)';al.classList.add('show')}
 si.addEventListener('submit',e=>{e.preventDefault();const em=document.getElementById('email').value.trim();
  if(!R.email.test(em)||pw.value.length<8){al.style.background='var(--err)';al.textContent='⚠️ Invalid credentials format: use a valid email and a password of 8+ characters.';al.classList.add('show');return}
  try{localStorage.setItem('sb-user',JSON.stringify({email:em}))}catch(x){}
  location.href='home.html'});}
