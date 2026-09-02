
const KEY='skillbridge_demo_v1';

const seed = {
  institution: {name:'Code Institute', type:'Training Institute', registration:'CI-2024-0192', city:'Bengaluru', state:'Karnataka', email:'admin@codeinstitute.example', phone:'+91 90000 00000'},
  trainee: {
    name:'Aarav Sharma',
    verification:{score:100, documents:[
      {key:'program', label:'Program certificate / completion proof', files:[{name:'Full-Stack-Certificate.pdf', size:184000, submitted:'02 May 2025'}]},
      {key:'employment', label:'Employment / offer proof', files:[{name:'TechNova-Offer-Letter.pdf', size:231000, submitted:'02 May 2025'}]},
      {key:'salary', label:'Salary / income proof', files:[{name:'Salary-Slip-Apr-2025.pdf', size:156000, submitted:'02 May 2025'}]},
      {key:'outcome', label:'Career outcome / role proof', files:[{name:'Employment-Confirmation.pdf', size:198000, submitted:'02 May 2025'}]}
    ]}, dob:'12/08/2003', email:'aarav.sharma@email.com', phone:'+91 9876543210', location:'Pune, Maharashtra', education:'B.E. Computer Engineering',
    programs:[
      {name:'Web Development Bootcamp', institution:'Code Institute', duration:'4 Months', start:'Jan 2023', end:'Apr 2023', skills:'HTML, CSS, JavaScript, React, Node.js', cost:50000, status:'Completed'},
      {name:'Data Analytics Certificate', institution:'ExcelR Solutions', duration:'3 Months', start:'Jun 2023', end:'Aug 2023', skills:'Excel, SQL, Power BI, Data Visualization', cost:30000, status:'Completed'},
      {name:'Python for Everyone', institution:'Coursera', duration:'3 Months', start:'Sep 2023', end:'Nov 2023', skills:'Python, Pandas, NumPy, Data Analysis', cost:20000, status:'Completed'}
    ],
    outcome:{employment:'Employed', role:'Frontend Developer', employmentType:'Full-time', organization:'TechNova Solutions', joining:'15/01/2024', workLocation:'Pune, Maharashtra', monthlySalary:45000, expectedSalary:60000, experience:'1.2 Years', preIncome:15000},
    salary:[
      {year:'2024',role:'Frontend Developer',org:'TechNova Solutions',ctc:540000},
      {year:'2025 (Current)',role:'Frontend Developer',org:'TechNova Solutions',ctc:600000}
    ],
    updated:'02 May 2025'
  },
  demoTrainees:[
    {name:'Aarav Sharma',email:'aarav.sharma@email.com',program:'Web Development Bootcamp',duration:'4 Months',employment:'Employed',salary:600000,cost:50000,preIncome:180000,skills:['HTML','CSS','JavaScript','React','Node.js'],institution:'Code Institute',verificationScore:100},
    {name:'Priya Patel',email:'priya.patel@email.com',program:'Data Analytics with Python',duration:'4 Months',employment:'Employed',salary:580000,cost:45000,preIncome:160000,skills:['Python','SQL','Power BI'],institution:'Code Institute',verificationScore:75},
    {name:'Rohan Verma',email:'rohan.verma@email.com',program:'UI/UX Design Fundamentals',duration:'4 Months',employment:'Employed',salary:520000,cost:40000,preIncome:150000,skills:['Figma','UX Research','Prototyping'],institution:'Code Institute',verificationScore:50},
    {name:'Sneha Iyer',email:'sneha.iyer@email.com',program:'Digital Marketing Professional',duration:'3 Months',employment:'Self Employed',salary:420000,cost:30000,preIncome:150000,skills:['SEO','Analytics','Content'],institution:'Code Institute',verificationScore:25},
    {name:'Karan Mehta',email:'karan.mehta@email.com',program:'Python Programming Bootcamp',duration:'4 Months',employment:'Employed',salary:560000,cost:42000,preIncome:160000,skills:['Python','Django','SQL'],institution:'Code Institute',verificationScore:10},
    {name:'Ananya Singh',email:'ananya.singh@email.com',program:'Full Stack Web Development',duration:'6 Months',employment:'Not Employed',salary:0,cost:60000,preIncome:150000,skills:['HTML','CSS','JS'],institution:'Code Institute',verificationScore:0},
    {name:'Vivek Nair',email:'vivek.nair@email.com',program:'Data Analytics with Python',duration:'4 Months',employment:'Employed',salary:620000,cost:45000,preIncome:170000,skills:['Python','Pandas','SQL'],institution:'Code Institute',verificationScore:75},
    {name:'Megha Gupta',email:'megha.gupta@email.com',program:'UI/UX Design Fundamentals',duration:'4 Months',employment:'Employed',salary:500000,cost:40000,preIncome:150000,skills:['Figma','UX','UI'],institution:'Code Institute',verificationScore:50}
  ]
};

function data(){
  let d; try{d=JSON.parse(localStorage.getItem(KEY))}catch(e){}
  if(!d){d=structuredClone(seed); localStorage.setItem(KEY,JSON.stringify(d))}
  return d;
}
function save(d){localStorage.setItem(KEY,JSON.stringify(d))}
function fmt(n){return new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n||0)}
function roi(t){ if(!t.cost) return 0; return ((Math.max(0,(t.salary||0)-(t.preIncome||0))/t.cost)); }
function roiText(t){return roi(t).toFixed(2)+'x'}
function getTrainee(name){return data().demoTrainees.find(x=>x.name===name)}

const VERIFICATION_WEIGHTS = {program:25, employment:25, salary:25, outcome:25};
function verificationScore(v){
  if(!v) return 0;
  if(typeof v.score === 'number') return Math.max(0,Math.min(100,v.score));
  const docs=v.documents||[];
  return Object.keys(VERIFICATION_WEIGHTS).reduce((sum,key)=>{
    const group=docs.find(x=>x.key===key);
    return sum + (group && group.files && group.files.length ? VERIFICATION_WEIGHTS[key] : 0);
  },0);
}
function verificationClass(score){
  if(score===100) return 'v-green';
  if(score>=50) return 'v-blue';
  if(score>=25) return 'v-yellow';
  if(score>=5) return 'v-orange';
  return 'v-red';
}
function verificationLabel(score){
  if(score===100) return 'Fully verified';
  if(score>=50) return score+'% verified';
  if(score>=25) return score+'% verified';
  if(score>=5) return score+'% verified';
  return '0–5% verified';
}
function verificationDot(score, extraClass=''){
  return `<span class="verification-dot ${verificationClass(score)} ${extraClass}" title="${verificationLabel(score)}" aria-label="${verificationLabel(score)}"></span>`;
}
function initVerification(){
  const d=data();
  d.trainee.verification=d.trainee.verification||{documents:[]};
  if(!Array.isArray(d.trainee.verification.documents)) d.trainee.verification.documents=[];
  d.trainee.verification.documents = ['program','employment','salary','outcome'].map(key=>{
    const existing=d.trainee.verification.documents.find(x=>x.key===key);
    return existing || {key, label: key==='program'?'Program certificate / completion proof':key==='employment'?'Employment / offer proof':key==='salary'?'Salary / income proof':'Career outcome / role proof', files:[]};
  });
  d.trainee.verification.score=verificationScore(d.trainee.verification);
  save(d);
  renderVerification();
}
function renderVerification(){
  const d=data(), v=d.trainee.verification||{documents:[],score:0}, score=verificationScore(v), el=id=>document.getElementById(id);
  if(el('verificationScore')) el('verificationScore').textContent=score+'%';
  if(el('verificationLabel')) el('verificationLabel').textContent=verificationLabel(score);
  if(el('profileVerificationDot')) {
    el('profileVerificationDot').className='verification-dot '+verificationClass(score);
    el('profileVerificationDot').title=verificationLabel(score);
  }
  if(el('verificationRows')){
    const labels={
      program:'Program certificate / completion proof',
      employment:'Employment / offer proof',
      salary:'Salary / income proof',
      outcome:'Career outcome / role proof'
    };
    el('verificationRows').innerHTML=(v.documents||[]).map(doc=>{
      const files=doc.files||[];
      const submitted=files.length>0;
      return `<div class="verification-row">
        <div class="verification-row-main">
          <div class="verification-file-icon">${submitted?'✓':'↑'}</div>
          <div><strong>${labels[doc.key]}</strong><div class="muted">${submitted?files.map(f=>f.name).join(', '):'No file submitted yet.'}</div></div>
        </div>
        <span class="verification-status ${submitted?'verified':'pending'}">${submitted?'Submitted':'Pending'}</span>
      </div>`;
    }).join('');
  }
}
function handleEvidenceUpload(key,input){
  const d=data();
  d.trainee.verification=d.trainee.verification||{documents:[]};
  d.trainee.verification.documents=d.trainee.verification.documents||[];
  let doc=d.trainee.verification.documents.find(x=>x.key===key);
  if(!doc){
    const labels={program:'Program certificate / completion proof',employment:'Employment / offer proof',salary:'Salary / income proof',outcome:'Career outcome / role proof'};
    doc={key,label:labels[key],files:[]}; d.trainee.verification.documents.push(doc);
  }
  const now=new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
  doc.files=Array.from(input.files||[]).map(f=>({name:f.name,size:f.size,submitted:now}));
  d.trainee.verification.score=verificationScore(d.trainee.verification);
  save(d);
  renderVerification();
  mirrorVerificationToInstitution();
}
function mirrorVerificationToInstitution(){
  const d=data(), score=verificationScore(d.trainee.verification);
  const idx=d.demoTrainees.findIndex(x=>x.name===d.trainee.name);
  if(idx>=0){
    d.demoTrainees[idx].verificationScore=score;
    d.demoTrainees[idx].verification=d.trainee.verification;
  }
  save(d);
}
function verificationClassForTrainee(t){return t.verificationScore!=null?t.verificationScore:verificationScore(t.verification)}
function hydrateNav(active){
 document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('active',a.dataset.nav===active));
}
function updateTraineeFromProfile(){
 const d=data();
 const t=d.trainee;
 const f=id=>document.getElementById(id);
 if(!f('fullName'))return;
 f('fullName').value=t.name; f('dob').value=t.dob; f('email').value=t.email; f('phone').value=t.phone; f('location').value=t.location; f('education').value=t.education;
}
function renderProgramRows(){
 const d=data(), tbody=document.getElementById('programRows'); if(!tbody)return;
 tbody.innerHTML=d.trainee.programs.map((p,i)=>`<tr><td>${i+1}</td><td><strong>${p.name}</strong></td><td>${p.institution}</td><td>${p.start} – ${p.end}<br><span class="muted">${p.duration}</span></td><td>${p.skills}</td><td><button class="btn ghost" onclick="editProgram(${i})">Edit</button> <button class="btn secondary" onclick="deleteProgram(${i})">Delete</button></td></tr>`).join('');
}
function editProgram(i){
 const d=data(),p=d.trainee.programs[i]; const vals=[p.name,p.institution,p.duration,p.start,p.end,p.skills,p.cost];
 const n=prompt('Program name',vals[0]); if(n===null)return;
 p.name=n; p.institution=prompt('Institution name',vals[1])||vals[1]; p.duration=prompt('Duration',vals[2])||vals[2]; p.skills=prompt('Skills acquired (comma separated)',vals[5])||vals[5];
 d.trainee.programs[i]=p; save(d); renderProgramRows();
}
function deleteProgram(i){const d=data(); if(confirm('Delete this program?')){d.trainee.programs.splice(i,1);save(d);renderProgramRows();}}
function addProgram(){
 const d=data(); const name=prompt('Program name'); if(!name)return;
 const institution=prompt('Institution name')||'';
 const duration=prompt('Duration')||'';
 const skills=prompt('Skills acquired')||'';
 const start=prompt('Start (e.g. Jan 2025)')||''; const end=prompt('End (e.g. Apr 2025)')||'';
 const cost=Number(prompt('Training cost (INR)','50000'))||0;
 d.trainee.programs.push({name,institution,duration,start,end,skills,cost,status:'Completed'}); save(d); renderProgramRows();
}
function saveProfile(){
 const d=data(),f=id=>document.getElementById(id);
 d.trainee.name=f('fullName').value; d.trainee.dob=f('dob').value; d.trainee.email=f('email').value; d.trainee.phone=f('phone').value; d.trainee.location=f('location').value; d.trainee.education=f('education').value;
 d.trainee.outcome.employment=f('employment').value; d.trainee.outcome.role=f('role').value; d.trainee.outcome.employmentType=f('employmentType').value; d.trainee.outcome.organization=f('organization').value; d.trainee.outcome.joining=f('joining').value; d.trainee.outcome.workLocation=f('workLocation').value; d.trainee.outcome.monthlySalary=Number(f('monthlySalary').value)||0; d.trainee.outcome.expectedSalary=Number(f('expectedSalary').value)||0; d.trainee.outcome.experience=f('experience').value;
 d.trainee.updated=new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}); 
 save(d);
 // mirror current trainee into institution demo dataset
 const idx=d.demoTrainees.findIndex(x=>x.name===d.trainee.name);
 const program=d.trainee.programs.find(x=>x.institution===d.institution.name) || d.trainee.programs[0] || {};
 const rec={name:d.trainee.name,email:d.trainee.email,program:program.name||'Completed Program',duration:program.duration||'-',employment:d.trainee.outcome.employment,salary:(d.trainee.outcome.monthlySalary||0)*12,cost:program.cost||0,preIncome:(d.trainee.outcome.preIncome||0)*12,skills:(program.skills||'').split(',').map(s=>s.trim()).filter(Boolean),institution:d.institution.name,verificationScore:verificationScore(d.trainee.verification),verification:d.trainee.verification};
 if(idx>=0)d.demoTrainees[idx]=rec; else d.demoTrainees.unshift(rec);
 save(d);
 alert('Profile saved. Your institution view now uses the same trainee data.');
}
function initProfile(){
 updateTraineeFromProfile(); initVerification(); renderProgramRows();
 const d=data(),o=d.trainee.outcome,f=id=>document.getElementById(id);
 if(f('employment')){f('employment').value=o.employment;f('role').value=o.role;f('employmentType').value=o.employmentType;f('organization').value=o.organization;f('joining').value=o.joining;f('workLocation').value=o.workLocation;f('monthlySalary').value=o.monthlySalary;f('expectedSalary').value=o.expectedSalary;f('experience').value=o.experience}
}
function registerInstitute(){
 const f=id=>document.getElementById(id);
 if(!f('instName').value.trim()){alert('Please enter institution name.');return}
 const d=data();
 d.institution={name:f('instName').value.trim(),type:f('instType').value,registration:f('regNo').value,year:f('estYear').value,address:f('address').value,city:f('city').value,state:f('state').value,pin:f('pin').value,email:f('officialEmail').value,phone:f('contact').value,head:f('head').value,designation:f('designation').value};
 // Prototype behaviour: once an institution registers, its trainee list is populated
 // with the sample outcome dataset so the core outcome-tracking flow is immediately demoable.
 // In a real deployment these records would come from consented trainee data in the database.
 d.demoTrainees=d.demoTrainees.map(t=>({...t,institution:d.institution.name}));
 save(d);
 location.href='institute.html';
}
function renderInstituteTable(){
 const d=data(), q=(document.getElementById('searchBox')?.value||'').trim().toLowerCase(), tbody=document.getElementById('instRows'); if(!tbody)return;
 // Show records belonging to the registered institution. If the dataset is empty, seed Aarav
 // from the trainee profile so the core demonstration always has at least one linked trainee.
 let rows=d.demoTrainees.filter(t=>t.institution===d.institution.name);
 if(!rows.length && d.trainee){
   const p=d.trainee.programs.find(x=>x.institution===d.institution.name) || d.trainee.programs[0] || {};
   const fallback={name:d.trainee.name,email:d.trainee.email,program:p.name||'Completed Program',duration:p.duration||'-',employment:d.trainee.outcome.employment,salary:(d.trainee.outcome.monthlySalary||0)*12,cost:p.cost||0,preIncome:(d.trainee.outcome.preIncome||0)*12,skills:(p.skills||'').split(',').map(s=>s.trim()).filter(Boolean),institution:d.institution.name,verificationScore:verificationScore(d.trainee.verification),verification:d.trainee.verification};
   d.demoTrainees.unshift(fallback); save(d); rows=[fallback];
 }
 const shown=rows.filter(t=>(t.name+' '+t.program).toLowerCase().includes(q));
 tbody.innerHTML=shown.map(t=>{const vs=verificationClassForTrainee(t); return `<tr class="clickable" onclick="openTrainee('${encodeURIComponent(t.name)}')"><td><div class="trainee-name-cell">${verificationDot(vs)}<strong>${t.name}</strong></div><div class="muted">${verificationLabel(vs)}</div></td><td>${t.program}</td><td>${t.duration}</td><td><span class="status ${t.employment==='Employed'?'employed':t.employment==='Self Employed'?'self':'unemployed'}">${t.employment}</span></td><td style="font-weight:800;color:${roi(t)>1?'var(--green)':roi(t)>0?'var(--orange)':'var(--red)'}">${roiText(t)}</td><td>→</td></tr>`}).join('');
 const employed=rows.filter(t=>t.employment==='Employed').length;
 const avg=rows.length?rows.reduce((sum,t)=>sum+roi(t),0)/rows.length:0;
 const avgSalary=rows.filter(t=>t.salary>0);
 const totalEl=document.getElementById('totalTrainees'); if(totalEl) totalEl.textContent=rows.length;
 const employedEl=document.getElementById('employedCount'); if(employedEl) employedEl.textContent=employed;
 const avgRoiEl=document.getElementById('avgRoi'); if(avgRoiEl) avgRoiEl.textContent=avg.toFixed(2)+'x';
 const avgSalaryEl=document.querySelector('.kpi:nth-child(4) .num'); if(avgSalaryEl){ const sal=avgSalary.length?avgSalary.reduce((s,t)=>s+t.salary,0)/avgSalary.length:0; avgSalaryEl.textContent=sal?fmt(sal/100000)+' LPA':'₹0 LPA'; }
}
function openTrainee(enc){location.href='institute-trainee.html?name='+enc}
function initInstitute(){
 const d=data(); const n=document.getElementById('instNameDisplay'); if(n)n.textContent=d.institution.name;
 renderInstituteTable(); document.getElementById('searchBox')?.addEventListener('input',renderInstituteTable);
}
function initTraineeDetail(){
 const params=new URLSearchParams(location.search),name=params.get('name')||data().trainee.name,d=data(),t=d.demoTrainees.find(x=>x.name===name)||d.demoTrainees[0],el=id=>document.getElementById(id);
 el('tdName').textContent=t.name; el('tdEmail').textContent=t.email||'—'; el('tdProgram').textContent=t.program; const vs=verificationClassForTrainee(t); if(el('detailVerificationDot')){el('detailVerificationDot').className='verification-dot '+verificationClass(vs);el('detailVerificationDot').title=verificationLabel(vs);} if(el('detailVerificationScore'))el('detailVerificationScore').textContent=vs+'%'; if(el('detailVerificationLabel'))el('detailVerificationLabel').textContent=verificationLabel(vs); el('tdDuration').textContent=t.duration; el('tdEmployment').textContent=t.employment; el('tdSalary').textContent=fmt(t.salary); el('tdROI').textContent=roiText(t); el('tdInstitution').textContent=t.institution||d.institution.name;
 el('roiFormula').textContent=`(${fmt(t.salary)} − ${fmt(t.preIncome||0)}) ÷ ${fmt(t.cost)}`;
 el('roiReturn').textContent=(Math.max(0,(t.salary||0)-(t.preIncome||0))/Math.max(1,t.cost)).toFixed(2)+'x';
 el('skills').innerHTML=(t.skills||[]).map(s=>`<span class="tag">${s}</span>`).join('');
}
function buildGovernment(){
 const d=data(),all=d.demoTrainees;
 const employed=all.filter(x=>x.employment==='Employed').length, total=all.length, rate=total?employed/total*100:0;
 const ids={govTotal:Math.max(total,1248620),govRate:(rate||68.4).toFixed(1)+'%',govPrograms:'2,846',govInst:'486'};
 Object.entries(ids).forEach(([id,v])=>{const e=document.getElementById(id);if(e)e.textContent=v});
}
document.addEventListener('DOMContentLoaded',()=>{const page=document.body.dataset.page;if(page==='profile')initProfile();if(page==='institute')initInstitute();if(page==='detail')initTraineeDetail();if(page==='government')buildGovernment();});
