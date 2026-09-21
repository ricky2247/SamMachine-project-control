const projects = [
  {
    id:"P-01", name:"Hybrid P. Machine", status:"ON HOLD",  criticalTasks: [
    "طراحی شاسی و مشخص کردن الگوی ساخت",
    "طراحی اتاقک ها",
  ],
    image:"assets/p1.png",
    stages:[
      {title:"FIRST STAGE DESIGN", desc:"طراحی اولیه و شمای کلی دستگاه", progress:70, status:"COMPLETED", deadline:"1 SEP 2026", responsible:"REZA A"},
      {title:"PROCUREMENT ESSENTIAL PARTS", desc:"تأمین قطعات و تجهییزات حداقلی برای مشخص شدن ابعاد دیتیل دیزاین", progress:0, status:"IN PROGRESS", deadline:"-", responsible:"PROCUREMENT"},
      {title:"REDESIGN & FABRICATION PLAN", desc:"طراحی جزئی تر و پلن برای روش ساخت اجزایی مثل شاسی و...", progress:0, status:"PENDING", deadline:"-", responsible:"-"},
      {title:"FINDING MANUFACTURER & BUILDING", desc:"مشخص کردن سازنده ها و تامین کننده ها و ساخت", progress:0, status:"PENDING", deadline:"-", responsible:"-"},
      {title:"ASSEMBLING", desc:"پیاده سازی و اتصال قطعات و...", progress:0, status:"PENDING", deadline:"-", responsible:"ASSEMBLY"},
      {title:"ELECTRICAL DESIGN", desc:"تامین، طراحی و پیاده سازی برد ها و مدار های الکتریکی و سیم کشی اجزا", progress:0, status:"PENDING", deadline:"-", responsible:"-"},
      {title:"TESTING", desc:"تست عملکرد، گزارش و رفع ایرادات", progress:0, status:"PENDING", deadline:"-", responsible:"QA"},
      {title:"FINALIZATION", desc:"مرحله پایانی و سفارش تعداد", progress:0, status:"PENDING", deadline:"-", responsible:"-"}
    ]
  },
  {
    id:"P-02", name:"320 P. Machine", status:"PENDING", criticalTasks: [
    "طراحی پایه مناسب",
    image:"assets/project-2.svg",
    stages:[
      {title:"CONCEPT", desc:"تعریف نیازمندی‌ها و معماری کلی سیستم.", progress:100, status:"COMPLETED", deadline:"05 SEP 2026", responsible:"R&D"},
      {title:"DESIGN", desc:"طراحی مکانیکی و جانمایی اجزای سیستم.", progress:91, status:"IN PROGRESS", deadline:"22 SEP 2026", responsible:"ENGINEERING"},
      {title:"CONTROL", desc:"پیاده‌سازی سیستم کنترل و ارتباطات.", progress:55, status:"IN PROGRESS", deadline:"03 OCT 2026", responsible:"CONTROL"},
      {title:"ASSEMBLY", desc:"مونتاژ مکانیک، برق و کنترل.", progress:18, status:"IN PROGRESS", deadline:"15 OCT 2026", responsible:"ASSEMBLY"},
      {title:"COMMISSIONING", desc:"راه‌اندازی و تحویل سیستم.", progress:0, status:"PENDING", deadline:"25 OCT 2026", responsible:"QA"}
    ]
  },
  {
    id:"P-03", name:"180 P. Machine", status:"ACTIVE", criticalTasks: [
    "تغییرات نهایی و رفع ایرادات",
    "استخراج نقشه ساخت نهایی",
    image:"assets/project-3.svg",
    stages:[
      {title:"REQUIREMENTS", desc:"جمع‌آوری و تحلیل نیازمندی‌های پروژه.", progress:100, status:"COMPLETED", deadline:"01 SEP 2026", responsible:"PMO"},
      {title:"ENGINEERING", desc:"محاسبات، طراحی و تهیه مدارک ساخت.", progress:70, status:"IN PROGRESS", deadline:"26 SEP 2026", responsible:"ENGINEERING"},
      {title:"MATERIAL", desc:"خرید و آماده‌سازی مواد اولیه.", progress:30, status:"ON HOLD", deadline:"30 SEP 2026", responsible:"PROCUREMENT"},
      {title:"FABRICATION", desc:"ساخت سازه و قطعات مکانیکی.", progress:0, status:"PENDING", deadline:"15 OCT 2026", responsible:"WORKSHOP"},
      {title:"DELIVERY", desc:"تست نهایی و تحویل پروژه.", progress:0, status:"PENDING", deadline:"30 OCT 2026", responsible:"PMO"}
    ]
  },
  {
    id:"P-04", name:"Roller", status:"PENDING",
    image:"assets/project-4.svg",
    stages:[
      {title:"RESEARCH", desc:"بررسی راهکارها و انتخاب معماری ربات.", progress:100, status:"COMPLETED", deadline:"08 SEP 2026", responsible:"R&D"},
      {title:"MECHANICAL", desc:"طراحی بدنه، مکانیزم‌ها و انتقال قدرت.", progress:76, status:"IN PROGRESS", deadline:"24 SEP 2026", responsible:"MECHANICAL"},
      {title:"ELECTRONICS", desc:"طراحی و مونتاژ الکترونیک و سنسورها.", progress:42, status:"IN PROGRESS", deadline:"02 OCT 2026", responsible:"ELECTRONICS"},
      {title:"SOFTWARE", desc:"توسعه نرم‌افزار کنترل و تست الگوریتم‌ها.", progress:33, status:"IN PROGRESS", deadline:"12 OCT 2026", responsible:"SOFTWARE"},
      {title:"TESTING", desc:"تست یکپارچه و آماده‌سازی نمونه نهایی.", progress:0, status:"PENDING", deadline:"22 OCT 2026", responsible:"QA"}
    ]
  }
];

const priorityTasks=[
  {name:"Complete fabrication drawings",status:"IN PROGRESS",type:"active"},
  {name:"Order hydraulic components",status:"IN PROGRESS",type:"active"},
  {name:"Final assembly inspection",status:"PENDING",type:"pending"}
];

let currentProject = 0;
let currentStage = 0;
let supabaseClient = null;

const $ = id => document.getElementById(id);

function projectProgress(project){
  return Math.round(project.stages.reduce((s,x)=>s+x.progress,0)/project.stages.length);
}

function renderProjectCards(){
  const container = $("projectCards");
  const existing = container.querySelectorAll(".project-card");

  if(existing.length !== projects.length){
    container.innerHTML = projects.map((project, idx)=>`
      <article class="project-card" data-index="${idx}" tabindex="0" role="button" aria-label="Select ${project.name}">
        <img src="${project.image}" alt="${project.name}">
        <div class="card-overlay">
          <span class="card-code">${project.id}</span>
          <div class="card-title">${project.name}</div>
          <div class="card-progress"><i style="width:${projectProgress(project)}%"></i></div>
        </div>
      </article>
    `).join("");

    container.querySelectorAll(".project-card").forEach(card=>{
      // Hover is visual only. It NEVER changes the selected project.
      card.addEventListener("mouseenter",()=>{
        card.classList.add("hover-inspect");
      });
      card.addEventListener("mouseleave",()=>{
        card.classList.remove("hover-inspect");
      });
      card.addEventListener("click",()=>{
        selectProject(Number(card.dataset.index));
      });
      card.addEventListener("keydown",event=>{
        if(event.key === "Enter" || event.key === " "){
          event.preventDefault();
          selectProject(Number(card.dataset.index));
        }
      });
    });
  }

  applyCarouselPositions();
}

function selectProject(idx){
  if(idx === currentProject) return;
  currentProject = idx;
  currentStage = 0;
  applyCarouselPositions();
  renderStage();
  renderOverview();
}

function applyCarouselPositions(){
  const total = projects.length;
  document.querySelectorAll(".project-card").forEach(card=>{
    const idx = Number(card.dataset.index);
    const relative = (idx - currentProject + total) % total;
    const slot = ["center", "right", "back", "left"][relative];
    card.classList.remove("slot-center","slot-right","slot-back","slot-left","active");
    card.classList.add(`slot-${slot}`);
    if(idx === currentProject) card.classList.add("active");
    card.setAttribute("aria-selected", idx === currentProject ? "true" : "false");
  });
}

function renderStage(){
  const p = projects[currentProject];
  const s = p.stages[currentStage];

  $("projectImage").src = p.image;
  $("projectImage").alt = p.name;
  $("imageProjectCode").textContent = p.id;
  $("projectName").textContent = p.name;
  $("projectStatus").textContent = p.status;
  renderCriticalTasks(p);
  $("stageProject").textContent = p.name;
  $("stageCounter").textContent = `${String(currentStage+1).padStart(2,"0")} / ${String(p.stages.length).padStart(2,"0")}`;
  $("stageCode").textContent = `STAGE ${String(currentStage+1).padStart(2,"0")}`;
  $("stageTitle").textContent = s.title;
  $("stageDescription").textContent = s.desc;
  $("progressValue").textContent = `${s.progress}%`;
  $("progressBar").style.width = `${s.progress}%`;
  $("stageStatus").textContent = s.status;
  $("stageDeadline").textContent = s.deadline;
  $("stageResponsible").textContent = s.responsible;

  $("stageDots").innerHTML = p.stages.map((_,i)=>
    `<span class="dot ${i===currentStage?'active':''}" data-stage="${i}" role="button" tabindex="0" aria-label="Stage ${i+1}"></span>`
  ).join("");

  document.querySelectorAll(".dot").forEach(dot=>{
    const chooseStage=()=>{
      currentStage = Number(dot.dataset.stage);
      renderStage();
    };
    dot.addEventListener("click",chooseStage);
    dot.addEventListener("keydown",event=>{
      if(event.key === "Enter" || event.key === " ") chooseStage();
    });
  });
}
function renderCriticalTasks(project){
  const container = $("criticalTasks");

  if(!container) return;

  const tasks = project.criticalTasks || [];

  if(!tasks.length){
    container.innerHTML = `
      <div class="critical-empty">NO CRITICAL TASKS</div>
    `;
    return;
  }

  container.innerHTML = tasks.map(task => `
    <div class="critical-task">
      <span class="critical-task-name">${task}</span>
      <span class="critical-dot"></span>
    </div>
  `).join("");
}
function renderOverview(){
  $("overviewGrid").innerHTML = projects.map(p=>`
    <div class="overview-item">
      <div class="ov-top"><span>${p.id} // ${p.name}</span><span>${projectProgress(p)}%</span></div>
      <div class="ov-track"><i style="width:${projectProgress(p)}%"></i></div>
    </div>
  `).join("");
}

function renderPriorityTasks(){
  $("priorityTasks").innerHTML=priorityTasks.map(t=>`
    <div class="priority-task"><span class="priority-dot ${t.type}"></span><div><b>${t.name}</b><span class="task-state">${t.status}</span></div></div>
  `).join("");
}

function escapeHtml(value){
  return String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[ch]));
}

function setCommentConnection(text, mode="local"){
  $("commentConnection").textContent=text;
  $("commentConnection").className=`comment-connection ${mode}`;
}

function formatCommentDate(value){
  const date=new Date(value);
  return Number.isNaN(date.getTime()) ? "JUST NOW" : date.toLocaleString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});
}

function renderComments(comments){
  const list=$("commentsList");
  if(!comments.length){
    list.innerHTML='<div class="comments-empty">NO COMMENTS YET</div>';
    return;
  }
  list.innerHTML=comments.map(c=>`
    <article class="comment-item">
      <div class="comment-meta"><b>${escapeHtml(c.author)}</b><span>${formatCommentDate(c.created_at)}</span></div>
      <p>${escapeHtml(c.message).replace(/\n/g,"<br>")}</p>
    </article>
  `).join("");
}

async function loadComments(){
  if(!supabaseClient){
    setCommentConnection("SUPABASE REQUIRED","offline");
    renderComments([]);
    return;
  }

  setCommentConnection("SYNCED","online");
  const {data,error}=await supabaseClient
    .from("project_comments")
    .select("id,author,message,created_at")
    .order("created_at",{ascending:false})
    .limit(100);

  if(error){
    console.error(error);
    setCommentConnection("CONNECTION ERROR","offline");
    renderComments([]);
    return;
  }

  renderComments(data||[]);
}

async function postComment(author,message){
  if(!supabaseClient){
    throw new Error("Supabase is not configured.");
  }

  const {error}=await supabaseClient
    .from("project_comments")
    .insert({author,message});

  if(error) throw error;
  await loadComments();
}

function subscribeToComments(){
  if(!supabaseClient) return;

  supabaseClient
    .channel("global-project-comments")
    .on(
      "postgres_changes",
      {event:"*",schema:"public",table:"project_comments"},
      () => loadComments()
    )
    .subscribe();
}

function initComments(){
  const cfg=window.SUPABASE_CONFIG||{url: "https://mfjcudvqnaqpwghmgehk.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mamN1ZHZxbmFxcHdnaG1nZWhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4OTI5NjcsImV4cCI6MjEwNTQ2ODk2N30.glx_gveQ0R50167ESeJrXQMbZbl-EuItQ8vwnZh2Oq4"};

  if(window.supabase && cfg.url && cfg.anonKey &&
     !cfg.url.includes("YOUR_SUPABASE") &&
     !cfg.anonKey.includes("YOUR_SUPABASE")){
    supabaseClient=window.supabase.createClient(cfg.url,cfg.anonKey);
  }

  $("commentMessage").addEventListener("input",()=>{
    $("commentCount").textContent=`${$("commentMessage").value.length} / 500`;
  });

  $("commentForm").addEventListener("submit",async event=>{
    event.preventDefault();

    const author=$("commentAuthor").value.trim();
    const message=$("commentMessage").value.trim();
    if(!author || !message) return;

    const button=$("commentSubmit");
    button.disabled=true;
    button.textContent="POSTING...";

    try{
      await postComment(author,message);
      $("commentMessage").value="";
      $("commentCount").textContent="0 / 500";
      button.textContent="POST COMMENT";
    }catch(error){
      console.error(error);
      alert("Comments are not connected yet. Configure Supabase first.");
      button.textContent="TRY AGAIN";
    }finally{
      button.disabled=false;
    }
  });

  loadComments();
  subscribeToComments();
}

function initTheme(){
  const saved=localStorage.getItem("pcc_theme") || "dark";
  applyTheme(saved);

  $("themeToggle").addEventListener("click",()=>{
    const next=document.body.classList.contains("light-theme") ? "dark" : "light";
    applyTheme(next);
  });
}

function applyTheme(theme){
  const light=theme==="light";
  document.body.classList.toggle("light-theme",light);

  $("themeIcon").textContent=light ? "☾" : "☀";
  $("themeText").textContent=light ? "DARK" : "LIGHT";
  $("themeToggle").setAttribute(
    "aria-label",
    light ? "Switch to dark mode" : "Switch to light mode"
  );

  localStorage.setItem("pcc_theme",light ? "light" : "dark");
}

function renderAll(){
  initTheme();
  renderProjectCards();
  renderStage();
  renderOverview();
  renderPriorityTasks();
  initComments();
}

$("prevBtn").addEventListener("click",()=>{
  const p=projects[currentProject];
  currentStage=(currentStage-1+p.stages.length)%p.stages.length;
  renderStage();
});
$("nextBtn").addEventListener("click",()=>{
  const p=projects[currentProject];
  currentStage=(currentStage+1)%p.stages.length;
  renderStage();
});

function updateClock(){
  $("clock").textContent = new Date().toLocaleTimeString("en-GB");
}
setInterval(updateClock,1000);
updateClock();
renderAll();
