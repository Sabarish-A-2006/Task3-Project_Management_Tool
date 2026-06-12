const STORAGE_KEY = "projectflow-data-v1";
const THEME_KEY = "projectflow-theme";
const DEFAULT_COLUMNS = ["Backlog", "To Do", "In Progress", "Review", "Done"];
const FEATURE_MODULES = [
  {
    id: "planning",
    title: "Project Planning",
    icon: "fa-bullseye",
    text: "Scope, goals, milestones, timelines",
  },
  {
    id: "tasks",
    title: "Task Management",
    icon: "fa-list-check",
    text: "Create, assign, prioritize, track",
  },
  {
    id: "scheduling",
    title: "Scheduling",
    icon: "fa-calendar-days",
    text: "Deadlines, calendars, Gantt views",
  },
  {
    id: "resources",
    title: "Resource Management",
    icon: "fa-users-gear",
    text: "People, budgets, materials",
  },
  {
    id: "collaboration",
    title: "Collaboration",
    icon: "fa-comments",
    text: "Comments, updates, file sharing",
  },
  {
    id: "progress",
    title: "Progress Tracking",
    icon: "fa-chart-simple",
    text: "Dashboards, Kanban, reports",
  },
  {
    id: "risks",
    title: "Risk Management",
    icon: "fa-shield-halved",
    text: "Identify, assess, mitigate",
  },
  {
    id: "documents",
    title: "Documents",
    icon: "fa-folder-tree",
    text: "Store and organize project files",
  },
  {
    id: "reports",
    title: "Analytics",
    icon: "fa-chart-line",
    text: "Performance reports and insights",
  },
  {
    id: "time",
    title: "Time Tracking",
    icon: "fa-stopwatch",
    text: "Record task and project effort",
  },
  {
    title: "Budget",
    icon: "fa-wallet",
    text: "Costs, expenses, financial health",
  },
  {
    title: "Alerts",
    icon: "fa-bell",
    text: "Deadline and change reminders",
  },
];

const FEATURE_PAGES = {
  planning: {
    eyebrow: "Project Planning",
    title: "Define scope, goals, timelines, and milestones.",
    intro:
      "Turn an idea into an executable delivery plan with clear boundaries, measurable outcomes, owners, assumptions, and checkpoint dates.",
    icon: "fa-bullseye",
    cards: [
      ["Scope baseline", "Document inclusions, exclusions, dependencies, and approval criteria before work starts.", "fa-compass-drafting"],
      ["Goal hierarchy", "Connect business goals to measurable project objectives, deliverables, and acceptance signals.", "fa-bullseye"],
      ["Milestone governance", "Use phase gates for discovery, build, QA, launch, and post-launch review.", "fa-flag-checkered"],
    ],
    matrix: [
      ["Charter", "Project summary, sponsors, success measures, constraints, budget baseline, and risk appetite."],
      ["Work breakdown", "Split large outcomes into epics, deliverables, tasks, and checklist-ready actions."],
      ["Change control", "Capture scope changes with impact on timeline, cost, risk, and resource allocation."],
      ["Approvals", "Keep sign-offs visible so project decisions do not disappear into private messages."],
    ],
  },
  tasks: {
    eyebrow: "Task Management",
    title: "Create, assign, prioritize, and track delivery work.",
    intro:
      "Give every task an owner, priority, due date, estimate, checklist, labels, and latest context so the board shows real execution health.",
    icon: "fa-list-check",
    cards: [
      ["Assignment clarity", "Every task should have exactly one accountable assignee and visible collaborators.", "fa-user-check"],
      ["Priority lanes", "High, medium, and low priority labels help teams sequence the work that protects outcomes.", "fa-arrow-up-wide-short"],
      ["Execution detail", "Descriptions, checklists, comments, and labels keep handoffs clean.", "fa-clipboard-list"],
    ],
    matrix: [
      ["Backlog hygiene", "Review stale tasks weekly and remove duplicates before sprint or milestone planning."],
      ["Definition of done", "Attach test, review, documentation, and release criteria to important tasks."],
      ["Dependency tracking", "Flag blocked tasks early and connect them to decisions or external owners."],
      ["Flow metrics", "Watch aging work, review queues, completion rate, and overdue counts."],
    ],
  },
  scheduling: {
    eyebrow: "Scheduling",
    title: "Manage deadlines, calendars, Gantt charts, and timelines.",
    intro:
      "Coordinate project dates with task due dates, milestone checkpoints, review windows, release freezes, and dependency buffers.",
    icon: "fa-chart-gantt",
    cards: [
      ["Deadline control", "Track project due dates and task-level due dates in one calendar-aware workspace.", "fa-calendar-check"],
      ["Timeline planning", "Use milestones as lightweight Gantt anchors for phases and dependencies.", "fa-timeline"],
      ["Critical path", "Spot overdue work and compressed schedules before they become launch surprises.", "fa-route"],
    ],
    matrix: [
      ["Calendar view", "Display task deadlines, milestone dates, ceremonies, holidays, and release windows."],
      ["Gantt view", "Map phases, dependencies, duration, and ownership across the project lifecycle."],
      ["Buffers", "Reserve time for QA, stakeholder review, procurement, and production rollback plans."],
      ["Rescheduling", "When dates move, record why and update risks, resources, and stakeholder alerts."],
    ],
  },
  resources: {
    eyebrow: "Resource Management",
    title: "Allocate and monitor people, budgets, and materials.",
    intro:
      "Balance workload, availability, budget burn, equipment, environments, vendors, and materials across the project portfolio.",
    icon: "fa-users-gear",
    cards: [
      ["Team capacity", "Compare estimates and tracked hours against the people assigned to active work.", "fa-people-group"],
      ["Budget health", "Monitor planned budget, spent amount, burn percentage, and warning thresholds.", "fa-wallet"],
      ["Materials", "List tools, environments, documents, devices, suppliers, and assets required for delivery.", "fa-boxes-stacked"],
    ],
    matrix: [
      ["Allocation", "Keep owners, backup owners, and availability visible for each major deliverable."],
      ["Cost control", "Review committed, spent, and forecast cost before approving scope changes."],
      ["Utilization", "Watch overloaded contributors and redistribute work before deadlines slip."],
      ["Procurement", "Track lead times for software, hardware, vendor access, and compliance evidence."],
    ],
  },
  collaboration: {
    eyebrow: "Collaboration Tools",
    title: "Support communication, sharing, comments, and discussions.",
    intro:
      "Keep project conversations close to the work: decisions, files, task notes, stakeholder updates, and team discussions should be searchable.",
    icon: "fa-comments",
    cards: [
      ["Task comments", "Capture status updates, decisions, blockers, and handoff notes inside each task.", "fa-comment-dots"],
      ["File sharing", "Attach briefs, checklists, assets, contracts, specs, and meeting notes to the project.", "fa-share-nodes"],
      ["Team alignment", "Use activity logs and alerts to keep contributors aware of important changes.", "fa-bell"],
    ],
    matrix: [
      ["Discussion threads", "Separate decision threads from casual updates so teams can find final answers."],
      ["Mentions", "Notify the right owner when a task, risk, file, or milestone needs action."],
      ["Version awareness", "Record which document version supported a decision or delivery sign-off."],
      ["Stakeholder updates", "Summarize progress, risk, timeline, and decisions for non-delivery audiences."],
    ],
  },
  progress: {
    eyebrow: "Progress Tracking",
    title: "Monitor status through dashboards, Kanban, and reports.",
    intro:
      "See what is planned, active, blocked, in review, done, overdue, and at risk with visual summaries that move as the project moves.",
    icon: "fa-chart-simple",
    cards: [
      ["Kanban flow", "Drag tasks across Backlog, To Do, In Progress, Review, and Done.", "fa-table-columns"],
      ["Dashboard KPIs", "Track project count, active projects, task totals, overdue work, and completion rate.", "fa-gauge-high"],
      ["Status signals", "Use progress, due dates, risk level, budget burn, and activity to guide standups.", "fa-signal"],
    ],
    matrix: [
      ["Health status", "Combine schedule, scope, budget, quality, and risk into a simple project health view."],
      ["Work in progress", "Limit too much active work so review queues and blockers do not hide."],
      ["Burndown", "Compare remaining task effort against time left in the milestone."],
      ["Portfolio view", "Review project progress across teams, owners, deadlines, and risk exposure."],
    ],
  },
  risks: {
    eyebrow: "Risk Management",
    title: "Identify, assess, mitigate, and monitor project risks.",
    intro:
      "Run a living risk register with probability, impact, severity, mitigation, owner, trigger, response plan, and review cadence.",
    icon: "fa-shield-halved",
    cards: [
      ["Risk register", "Track high and medium risks with mitigation notes attached to each project.", "fa-triangle-exclamation"],
      ["Mitigation plans", "Convert risk responses into owned tasks, milestones, or stakeholder decisions.", "fa-shield"],
      ["Alerts", "Surface urgent risk warnings alongside project activity and budget signals.", "fa-bell"],
    ],
    matrix: [
      ["Probability", "Estimate how likely the risk is and revisit the score during planning reviews."],
      ["Impact", "Assess schedule, budget, scope, quality, compliance, and reputation effects."],
      ["Response", "Avoid, reduce, transfer, accept, or escalate each meaningful risk."],
      ["Contingency", "Define fallback owners, rollback options, reserves, and communication plans."],
    ],
  },
  documents: {
    eyebrow: "Document Management",
    title: "Store and organize project-related files and records.",
    intro:
      "Centralize charters, requirements, contracts, assets, test plans, decisions, status reports, and launch checklists.",
    icon: "fa-folder-tree",
    cards: [
      ["Project library", "Keep project charters, briefs, checklists, and shared assets grouped by project.", "fa-folder-open"],
      ["Decision history", "Preserve approvals, assumptions, and change records for later review.", "fa-file-signature"],
      ["Operational files", "Organize QA evidence, release notes, runbooks, and vendor documents.", "fa-file-lines"],
    ],
    matrix: [
      ["Folders", "Group files by phase, deliverable, function, or approval flow."],
      ["Metadata", "Record owner, date, version, status, and related task or milestone."],
      ["Access", "Separate internal working files from stakeholder-ready documents."],
      ["Retention", "Archive completed project documents with final status and lessons learned."],
    ],
  },
  reports: {
    eyebrow: "Reporting & Analytics",
    title: "Generate performance reports and actionable insights.",
    intro:
      "Convert project data into summaries for executives, project managers, delivery teams, finance, and stakeholders.",
    icon: "fa-chart-line",
    cards: [
      ["Performance", "Report average completion, completed work, overdue items, and active workload.", "fa-chart-column"],
      ["Financials", "Compare budget used, budget remaining, and spend pressure by project.", "fa-money-bill-trend-up"],
      ["Forecasting", "Use current velocity, risks, and remaining effort to anticipate delivery outcomes.", "fa-magnifying-glass-chart"],
    ],
    matrix: [
      ["Status report", "Summarize achievements, blockers, decisions, risks, next steps, budget, and schedule."],
      ["Portfolio report", "Compare projects by health, owner, due date, risk level, and completion rate."],
      ["Resource report", "Show time estimates, logged hours, allocation pressure, and utilization."],
      ["Lessons learned", "Capture what worked, what slipped, and what to improve after completion."],
    ],
  },
  time: {
    eyebrow: "Time Tracking",
    title: "Record effort spent on tasks and projects.",
    intro:
      "Use estimates and tracked hours to understand burn, billing, utilization, forecasting, and whether scope matches available capacity.",
    icon: "fa-stopwatch",
    cards: [
      ["Task timers", "Record time against individual tasks for accurate delivery and billing history.", "fa-clock"],
      ["Estimate variance", "Compare tracked hours to planned estimates before deadlines are missed.", "fa-scale-balanced"],
      ["Timesheets", "Roll task effort into project-level and user-level reporting.", "fa-table-list"],
    ],
    matrix: [
      ["Manual entries", "Allow contributors to add notes, dates, and categories for logged work."],
      ["Approval", "Review submitted hours for billable work, payroll, or compliance needs."],
      ["Forecasting", "Use effort trends to refine future estimates and capacity planning."],
      ["Utilization", "Monitor focus time, meeting load, project allocation, and unplanned work."],
    ],
  },
};

const state = {
  data: loadData(),
  currentUser: null,
  currentProjectId: null,
  editingProjectId: null,
  editingTaskId: null,
  targetColumnId: null,
  view: "projects",
  projectSearch: "",
  projectStatus: "all",
  taskSearch: "",
  priorityFilter: "all",
  assigneeFilter: "all",
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const els = {
  authContainer: $("#auth-container"),
  appContainer: $("#app-container"),
  loginForm: $("#login-form"),
  registerForm: $("#register-form"),
  showRegister: $("#show-register"),
  showLogin: $("#show-login"),
  loginBtn: $("#login-btn"),
  registerBtn: $("#register-btn"),
  logoutBtn: $("#logout-btn"),
  username: $("#username"),
  viewTitle: $("#view-title"),
  viewEyebrow: $("#view-eyebrow"),
  projectsView: $("#projects-view"),
  reportsView: $("#reports-view"),
  featureView: $("#feature-view"),
  projectBoard: $("#project-board"),
  workspaceStats: $("#workspace-stats"),
  featureModules: $("#feature-modules"),
  reportsStats: $("#reports-stats"),
  analyticsPanels: $("#analytics-panels"),
  projectsList: $("#projects-list"),
  projectSearch: $("#project-search"),
  projectStatusFilter: $("#project-status-filter"),
  createProjectBtn: $("#create-project-btn"),
  themeToggleBtn: $("#theme-toggle-btn"),
  exportDataBtn: $("#export-data-btn"),
  clearActivityBtn: $("#clear-activity-btn"),
  activityList: $("#activity-list"),
  backToProjects: $("#back-to-projects"),
  projectTitle: $("#project-title"),
  projectMeta: $("#project-meta"),
  projectDescription: $("#project-description"),
  editProjectBtn: $("#edit-project-btn"),
  deleteProjectBtn: $("#delete-project-btn"),
  boardSummary: $("#board-summary"),
  planningPanel: $("#planning-panel"),
  resourcePanel: $("#resource-panel"),
  riskPanel: $("#risk-panel"),
  documentPanel: $("#document-panel"),
  boardColumns: $("#board-columns"),
  taskSearch: $("#task-search"),
  priorityFilter: $("#priority-filter"),
  assigneeFilter: $("#assignee-filter"),
  addColumnBtn: $("#add-column-btn"),
  projectModal: $("#project-modal"),
  projectForm: $("#project-form"),
  projectModalTitle: $("#project-modal-title"),
  projectName: $("#project-name"),
  projectDescriptionInput: $("#project-description-input"),
  projectStatus: $("#project-status"),
  projectDueDate: $("#project-due-date"),
  projectMembers: $("#project-members"),
  taskModal: $("#task-modal"),
  taskForm: $("#task-form"),
  taskModalTitle: $("#task-modal-title"),
  taskTitle: $("#task-title"),
  taskDescription: $("#task-description"),
  taskAssignee: $("#task-assignee"),
  taskPriority: $("#task-priority"),
  taskDueDate: $("#task-due-date"),
  taskEstimate: $("#task-estimate"),
  taskLabels: $("#task-labels"),
  taskChecklist: $("#task-checklist"),
  taskComment: $("#task-comment"),
  deleteTaskBtn: $("#delete-task-btn"),
  columnModal: $("#column-modal"),
  columnForm: $("#column-form"),
  columnName: $("#column-name"),
};

applyTheme(localStorage.getItem(THEME_KEY) || "light");
bindEvents();
restoreSession();

function bindEvents() {
  els.showRegister.addEventListener("click", (event) => {
    event.preventDefault();
    els.loginForm.classList.add("hidden");
    els.registerForm.classList.remove("hidden");
  });

  els.showLogin.addEventListener("click", (event) => {
    event.preventDefault();
    els.registerForm.classList.add("hidden");
    els.loginForm.classList.remove("hidden");
  });

  els.loginBtn.addEventListener("click", handleLogin);
  els.registerBtn.addEventListener("click", handleRegister);
  els.logoutBtn.addEventListener("click", handleLogout);
  els.createProjectBtn.addEventListener("click", () => openProjectModal());
  els.themeToggleBtn.addEventListener("click", toggleTheme);
  els.exportDataBtn.addEventListener("click", exportData);
  els.clearActivityBtn.addEventListener("click", clearActivity);
  els.backToProjects.addEventListener("click", () => showView("projects"));
  els.editProjectBtn.addEventListener("click", () =>
    openProjectModal(currentProject()),
  );
  els.deleteProjectBtn.addEventListener("click", deleteCurrentProject);
  els.addColumnBtn.addEventListener("click", () => openModal("column-modal"));
  els.projectForm.addEventListener("submit", saveProject);
  els.taskForm.addEventListener("submit", saveTask);
  els.columnForm.addEventListener("submit", saveColumn);
  els.deleteTaskBtn.addEventListener("click", deleteTask);

  els.projectSearch.addEventListener("input", (event) => {
    state.projectSearch = event.target.value.trim().toLowerCase();
    renderProjects();
  });

  els.projectStatusFilter.addEventListener("change", (event) => {
    state.projectStatus = event.target.value;
    renderProjects();
  });

  els.taskSearch.addEventListener("input", (event) => {
    state.taskSearch = event.target.value.trim().toLowerCase();
    renderBoard();
  });

  els.priorityFilter.addEventListener("change", (event) => {
    state.priorityFilter = event.target.value;
    renderBoard();
  });

  els.assigneeFilter.addEventListener("change", (event) => {
    state.assigneeFilter = event.target.value;
    renderBoard();
  });

  $$(".nav-link").forEach((button) => {
    button.addEventListener("click", () => showView(button.dataset.view));
  });

  $$(".close-modal").forEach((button) => {
    button.addEventListener("click", () => closeModal(button.dataset.close));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      ["project-modal", "task-modal", "column-modal"].forEach(closeModal);
    }
  });
}

function toggleTheme() {
  const nextTheme = document.body.classList.contains("dark-mode")
    ? "light"
    : "dark";
  applyTheme(nextTheme);
  localStorage.setItem(THEME_KEY, nextTheme);
  document.body.classList.remove("theme-flash");
  requestAnimationFrame(() => document.body.classList.add("theme-flash"));
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark-mode", isDark);
  if (!els.themeToggleBtn) return;
  els.themeToggleBtn.innerHTML = `
    <i class="fa-solid ${isDark ? "fa-sun" : "fa-moon"}"></i>
    ${isDark ? "Light" : "Dark"}
  `;
}

function handleLogin() {
  const email = $("#login-email").value.trim().toLowerCase();
  const password = $("#login-password").value;
  const user = state.data.users.find(
    (item) => item.email.toLowerCase() === email && item.password === password,
  );

  if (!user) {
    alert("Invalid credentials");
    return;
  }

  state.currentUser = user;
  sessionStorage.setItem("projectflow-user-id", user.id);
  enterApp();
}

function handleRegister() {
  const name = $("#register-name").value.trim();
  const email = $("#register-email").value.trim().toLowerCase();
  const password = $("#register-password").value;

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  if (state.data.users.some((user) => user.email.toLowerCase() === email)) {
    alert("User already exists");
    return;
  }

  const user = { id: createId(), name, email, password };
  state.data.users.push(user);
  state.currentUser = user;
  sessionStorage.setItem("projectflow-user-id", user.id);
  addActivity(`Registered ${name}`);
  saveData();
  enterApp();
}

function handleLogout() {
  state.currentUser = null;
  state.currentProjectId = null;
  sessionStorage.removeItem("projectflow-user-id");
  els.appContainer.classList.add("hidden");
  els.authContainer.classList.remove("hidden");
}

function enterApp() {
  els.authContainer.classList.add("hidden");
  els.appContainer.classList.remove("hidden");
  els.username.textContent = state.currentUser.name;
  els.loginForm.classList.remove("hidden");
  els.registerForm.classList.add("hidden");
  showView("projects");
}

function restoreSession() {
  const userId = sessionStorage.getItem("projectflow-user-id");
  const user = state.data.users.find((item) => String(item.id) === userId);
  if (user) {
    state.currentUser = user;
    enterApp();
  }
}

function showView(view) {
  state.view = view;
  state.currentProjectId = view === "project" ? state.currentProjectId : null;
  const isFeatureView = Boolean(FEATURE_PAGES[view]) && view !== "reports";

  els.projectsView.classList.toggle("hidden", view !== "projects");
  els.reportsView.classList.toggle("hidden", view !== "reports");
  els.projectBoard.classList.toggle("hidden", view !== "project");
  els.featureView.classList.toggle("hidden", !isFeatureView);

  $$(".nav-link").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });

  if (view === "projects") {
    els.viewEyebrow.textContent = "Workspace";
    els.viewTitle.textContent = "Project Dashboard";
    renderProjects();
  }

  if (view === "reports") {
    els.viewEyebrow.textContent = "Insights";
    els.viewTitle.textContent = "Reporting & Analytics";
    renderReports();
  }

  if (isFeatureView) {
    renderFeaturePage(view);
  }

  if (view === "project") {
    renderBoard();
  }
}

function userProjects() {
  if (!state.currentUser) return [];
  return state.data.projects.filter(
    (project) => project.userId === state.currentUser.id,
  );
}

function currentProject() {
  return state.data.projects.find(
    (project) => project.id === state.currentProjectId,
  );
}

function renderProjects() {
  const projects = userProjects();
  const filtered = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(state.projectSearch) ||
      project.description.toLowerCase().includes(state.projectSearch);
    const matchesStatus =
      state.projectStatus === "all" || project.status === state.projectStatus;
    return matchesSearch && matchesStatus;
  });

  els.workspaceStats.innerHTML = renderStats(getWorkspaceStats(projects));
  els.featureModules.innerHTML = renderFeatureModules(projects);

  if (!filtered.length) {
    els.projectsList.innerHTML =
      '<div class="empty-state">No matching projects. Create a project to begin planning.</div>';
    return;
  }

  els.projectsList.innerHTML = filtered.map(renderProjectCard).join("");
  $$(".project-card").forEach((card) => {
    card.addEventListener("click", () => openProject(card.dataset.id));
  });
  $$(".module-open-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      showView(button.dataset.view);
    });
  });
}

function renderProjectCard(project) {
  const stats = getProjectStats(project);
  const due = project.dueDate ? formatDate(project.dueDate) : "No due date";
  const overdueClass =
    isOverdue(project.dueDate) && project.status !== "Completed"
      ? "red"
      : "gray";

  return `
    <article class="project-card" data-id="${project.id}">
      <header>
        <div>
          <h3>${escapeHtml(project.name)}</h3>
          <p>${escapeHtml(project.description || "No description added")}</p>
        </div>
        <span class="badge ${statusColor(project.status)}">${project.status}</span>
      </header>
      <div class="progress-track" aria-label="${stats.progress}% complete">
        <div class="progress-fill" style="width: ${stats.progress}%"></div>
      </div>
      <div class="badge-row">
        <span class="badge blue"><i class="fa-solid fa-list-check"></i>${stats.total} tasks</span>
        <span class="badge green"><i class="fa-solid fa-check"></i>${stats.done} done</span>
        <span class="badge ${overdueClass}"><i class="fa-solid fa-calendar"></i>${due}</span>
      </div>
    </article>
  `;
}

function openProject(projectId) {
  state.currentProjectId = projectId;
  state.taskSearch = "";
  state.priorityFilter = "all";
  state.assigneeFilter = "all";
  els.taskSearch.value = "";
  els.priorityFilter.value = "all";
  showView("project");
}

function renderBoard() {
  const project = currentProject();
  if (!project) return;

  els.viewEyebrow.textContent = "Project";
  els.viewTitle.textContent = project.name;
  els.projectTitle.textContent = project.name;
  els.projectMeta.textContent = `${project.status} | Due ${project.dueDate ? formatDate(project.dueDate) : "not set"}`;
  els.projectDescription.textContent =
    project.description || "No description added.";
  els.boardSummary.innerHTML = renderBoardSummary(project);
  renderProjectIntelligence(project);
  renderAssigneeFilter(project);

  els.boardColumns.innerHTML = project.columns.map(renderColumn).join("");
  bindBoardEvents();
}

function renderBoardSummary(project) {
  const stats = getProjectStats(project);
  return [
    ["Progress", `${stats.progress}%`],
    ["Tasks", stats.total],
    ["Completed", stats.done],
    ["Overdue", stats.overdue],
    ["Tracked", `${stats.tracked}h / ${stats.estimate}h`],
  ]
    .map(
      ([label, value]) => `
        <div class="summary-item">
          <span>${label}</span>
          <strong>${value}</strong>
        </div>
      `,
    )
    .join("");
}

function renderFeatureModules(projects) {
  const stats = getWorkspaceStats(projects);
  return FEATURE_MODULES.map((module, index) => {
    const signal = moduleSignal(module.title, stats);
    return `
      <article class="module-card" style="--delay: ${index * 45}ms">
        <span class="module-icon"><i class="fa-solid ${module.icon}"></i></span>
        <div>
          <h3>${module.title}</h3>
          <p>${module.text}</p>
        </div>
        <button class="ghost-btn icon-btn module-open-btn" data-view="${module.id}" aria-label="Open ${module.title}">
          <i class="fa-solid fa-arrow-right"></i>
        </button>
        <strong>${signal}</strong>
      </article>
    `;
  }).join("");
}

function moduleSignal(title, stats) {
  const signals = {
    "Project Planning": `${stats.milestones} milestones`,
    "Task Management": `${stats.tasks} tasks`,
    Scheduling: `${stats.overdue} overdue`,
    "Resource Management": `${stats.members} members`,
    Collaboration: `${stats.comments} comments`,
    "Progress Tracking": `${stats.averageProgress}% avg`,
    "Risk Management": `${stats.highRisks} high risks`,
    Documents: `${stats.documents} files`,
    Analytics: `${stats.projects} projects`,
    "Time Tracking": `${stats.tracked}h logged`,
    Budget: `${stats.budgetUsed}% used`,
    Alerts: `${stats.alerts} alerts`,
  };
  return signals[title] || "Ready";
}

function renderProjectIntelligence(project) {
  const stats = getProjectStats(project);
  const milestones = safeList(project.milestones);
  const risks = safeList(project.risks);
  const documents = safeList(project.documents);
  const alerts = safeList(project.alerts);
  const resources = getResourceSummary(project);

  els.planningPanel.innerHTML = `
    <div class="panel-heading">
      <span><i class="fa-solid fa-timeline"></i></span>
      <div>
        <p class="eyebrow">Scheduling</p>
        <h3>Planning Timeline</h3>
      </div>
    </div>
    <div class="timeline-strip">
      ${milestones
        .map(
          (milestone) => `
            <div class="timeline-node ${milestone.done ? "done" : ""}">
              <span>${formatShortDate(milestone.date)}</span>
              <strong>${escapeHtml(milestone.name)}</strong>
            </div>
          `,
        )
        .join("")}
    </div>
  `;

  els.resourcePanel.innerHTML = `
    <div class="panel-heading">
      <span><i class="fa-solid fa-users-gear"></i></span>
      <div>
        <p class="eyebrow">Resources</p>
        <h3>Team, Time, Budget</h3>
      </div>
    </div>
    <div class="resource-bars">
      <label>Time <strong>${stats.tracked}h / ${stats.estimate}h</strong></label>
      ${renderMeter(stats.estimate ? Math.min(100, Math.round((stats.tracked / stats.estimate) * 100)) : 0)}
      <label>Budget <strong>${currency(project.budget?.spent || 0)} / ${currency(project.budget?.total || 0)}</strong></label>
      ${renderMeter(project.budget?.total ? Math.min(100, Math.round((project.budget.spent / project.budget.total) * 100)) : 0)}
      <label>Materials <strong>${resources.materials}</strong></label>
      ${renderMeter(resources.allocation)}
    </div>
  `;

  els.riskPanel.innerHTML = `
    <div class="panel-heading">
      <span><i class="fa-solid fa-shield-halved"></i></span>
      <div>
        <p class="eyebrow">Risk Management</p>
        <h3>Risk Register</h3>
      </div>
    </div>
    <div class="risk-list">
      ${risks
        .map(
          (risk) => `
            <div class="risk-item">
              <span class="badge ${risk.level === "High" ? "red" : "orange"}">${risk.level}</span>
              <div>
                <strong>${escapeHtml(risk.title)}</strong>
                <p>${escapeHtml(risk.mitigation)}</p>
              </div>
            </div>
          `,
        )
        .join("")}
    </div>
  `;

  els.documentPanel.innerHTML = `
    <div class="panel-heading">
      <span><i class="fa-solid fa-folder-tree"></i></span>
      <div>
        <p class="eyebrow">Collaboration</p>
        <h3>Docs & Alerts</h3>
      </div>
    </div>
    <div class="document-list">
      ${documents
        .map(
          (document) => `
            <div class="document-item">
              <i class="fa-solid ${document.icon || "fa-file-lines"}"></i>
              <span>${escapeHtml(document.name)}</span>
            </div>
          `,
        )
        .join("")}
    </div>
    <div class="alert-strip">
      ${alerts.map((alert) => `<span><i class="fa-solid fa-bell"></i>${escapeHtml(alert)}</span>`).join("")}
    </div>
  `;
}

function renderMeter(value) {
  return `
    <div class="progress-track">
      <div class="progress-fill" style="width: ${value}%"></div>
    </div>
  `;
}

function renderAssigneeFilter(project) {
  const current = state.assigneeFilter;
  const names = project.members.length
    ? project.members
    : [state.currentUser.name];
  els.assigneeFilter.innerHTML = [
    '<option value="all">All assignees</option>',
    ...names.map(
      (name) =>
        `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`,
    ),
  ].join("");
  els.assigneeFilter.value = names.includes(current) ? current : "all";
  state.assigneeFilter = els.assigneeFilter.value;
}

function renderColumn(column) {
  const tasks = getFilteredTasks(column.tasks);
  const project = currentProject();
  const canRemove = project.columns.length > 1 && !column.tasks.length;

  return `
    <section class="column">
      <div class="column-header">
        <h3 class="column-title">${escapeHtml(column.name)} (${tasks.length})</h3>
        <button class="ghost-btn icon-btn remove-column-btn" data-column-id="${column.id}" ${canRemove ? "" : "disabled"} aria-label="Delete column">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
      <div class="task-list" data-column-id="${column.id}">
        ${tasks.map((task) => renderTaskCard(task)).join("")}
      </div>
      <button class="add-task-btn" data-column-id="${column.id}">
        <i class="fa-solid fa-plus"></i>
        Add Task
      </button>
    </section>
  `;
}

function getFilteredTasks(tasks) {
  return tasks.filter((task) => {
    const searchable = [
      task.title,
      task.description,
      task.assignee,
      task.priority,
      ...(task.labels || []),
    ]
      .join(" ")
      .toLowerCase();
    const matchesSearch = searchable.includes(state.taskSearch);
    const matchesPriority =
      state.priorityFilter === "all" || task.priority === state.priorityFilter;
    const matchesAssignee =
      state.assigneeFilter === "all" || task.assignee === state.assigneeFilter;
    return matchesSearch && matchesPriority && matchesAssignee;
  });
}

function renderTaskCard(task) {
  const overdue = isOverdue(task.dueDate);
  const checklistDone = (task.checklist || []).filter(
    (item) => item.done,
  ).length;
  const checklistTotal = (task.checklist || []).length;
  const dueLabel = task.dueDate ? formatDate(task.dueDate) : "No due";

  return `
    <article class="task-card" draggable="true" data-task-id="${task.id}">
      <div class="task-meta">
        <span class="badge ${priorityColor(task.priority)}">${task.priority}</span>
        <span class="badge ${overdue ? "red" : "gray"}"><i class="fa-solid fa-calendar"></i>${dueLabel}</span>
      </div>
      <h4>${escapeHtml(task.title)}</h4>
      <p>${escapeHtml(task.description || "No description")}</p>
      <div class="label-row">
        ${(task.labels || [])
          .map(
            (label) => `<span class="badge gray">${escapeHtml(label)}</span>`,
          )
          .join("")}
      </div>
      <div class="task-footer">
        <span class="avatar" title="${escapeHtml(task.assignee)}">${initials(task.assignee)}</span>
        <span class="badge gray"><i class="fa-solid fa-square-check"></i>${checklistDone}/${checklistTotal}</span>
      </div>
    </article>
  `;
}

function bindBoardEvents() {
  $$(".add-task-btn").forEach((button) => {
    button.addEventListener("click", () =>
      openTaskModal(null, button.dataset.columnId),
    );
  });

  $$(".task-card").forEach((card) => {
    card.addEventListener("click", () => openTaskModal(card.dataset.taskId));
    card.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", card.dataset.taskId);
    });
  });

  $$(".task-list").forEach((list) => {
    list.addEventListener("dragover", (event) => {
      event.preventDefault();
      list.classList.add("drag-over");
    });
    list.addEventListener("dragleave", () =>
      list.classList.remove("drag-over"),
    );
    list.addEventListener("drop", (event) => {
      event.preventDefault();
      list.classList.remove("drag-over");
      moveTask(event.dataTransfer.getData("text/plain"), list.dataset.columnId);
    });
  });

  $$(".remove-column-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      removeColumn(button.dataset.columnId);
    });
  });
}

function openProjectModal(project = null) {
  state.editingProjectId = project?.id || null;
  els.projectModalTitle.textContent = project
    ? "Edit Project"
    : "Create Project";
  els.projectName.value = project?.name || "";
  els.projectDescriptionInput.value = project?.description || "";
  els.projectStatus.value = project?.status || "Planning";
  els.projectDueDate.value = project?.dueDate || "";
  els.projectMembers.value = (
    project?.members || [state.currentUser.name]
  ).join(", ");
  openModal("project-modal");
  els.projectName.focus();
}

function saveProject(event) {
  event.preventDefault();
  const name = els.projectName.value.trim();
  if (!name) return;

  const payload = {
    name,
    description: els.projectDescriptionInput.value.trim(),
    status: els.projectStatus.value,
    dueDate: els.projectDueDate.value,
    members: normalizeList(els.projectMembers.value, state.currentUser.name),
  };

  if (state.editingProjectId) {
    const project = state.data.projects.find(
      (item) => item.id === state.editingProjectId,
    );
    Object.assign(project, payload, { updatedAt: todayIso() });
    addActivity(`Updated project "${project.name}"`);
  } else {
    const project = {
      id: createId(),
      userId: state.currentUser.id,
      createdAt: todayIso(),
      updatedAt: todayIso(),
      ...payload,
      budget: { total: 50000, spent: 0 },
      materials: ["Design system", "Cloud hosting", "QA devices"],
      milestones: [
        { name: "Scope approved", date: todayIso(), done: true },
        { name: "Planning review", date: nextDate(7), done: false },
        {
          name: "Delivery checkpoint",
          date: payload.dueDate || nextDate(21),
          done: false,
        },
      ],
      risks: [
        {
          title: "Timeline compression",
          level: "Medium",
          mitigation:
            "Review dependencies weekly and keep buffer for critical tasks.",
        },
      ],
      documents: [
        { name: "Project charter", icon: "fa-file-contract" },
        { name: "Requirements brief", icon: "fa-file-lines" },
      ],
      alerts: ["Milestone review pending", "Budget baseline created"],
      columns: DEFAULT_COLUMNS.map((columnName) => ({
        id: createId(),
        name: columnName,
        tasks: [],
      })),
    };
    state.data.projects.push(project);
    addActivity(`Created project "${project.name}"`);
  }

  saveData();
  closeModal("project-modal");
  state.editingProjectId = null;
  state.currentProjectId ? renderBoard() : renderProjects();
}

function deleteCurrentProject() {
  const project = currentProject();
  if (!project || !confirm(`Delete "${project.name}" and all tasks?`)) return;
  state.data.projects = state.data.projects.filter(
    (item) => item.id !== project.id,
  );
  addActivity(`Deleted project "${project.name}"`);
  saveData();
  showView("projects");
}

function openTaskModal(taskId = null, columnId = null) {
  const project = currentProject();
  if (!project) return;

  const taskInfo = taskId ? findTask(taskId) : null;
  const task = taskInfo?.task;
  state.editingTaskId = task?.id || null;
  state.targetColumnId =
    columnId || taskInfo?.column.id || project.columns[0].id;

  els.taskModalTitle.textContent = task ? "Edit Task" : "Create Task";
  els.taskTitle.value = task?.title || "";
  els.taskDescription.value = task?.description || "";
  els.taskPriority.value = task?.priority || "Medium";
  els.taskDueDate.value = task?.dueDate || "";
  els.taskEstimate.value = task?.estimate || "";
  els.taskLabels.value = (task?.labels || []).join(", ");
  els.taskChecklist.value = (task?.checklist || [])
    .map((item) => item.text)
    .join("\n");
  els.taskComment.value = "";
  els.deleteTaskBtn.classList.toggle("hidden", !task);
  renderTaskAssignees(project, task?.assignee);
  openModal("task-modal");
  els.taskTitle.focus();
}

function renderTaskAssignees(project, selected) {
  const members = project.members.length
    ? project.members
    : [state.currentUser.name];
  els.taskAssignee.innerHTML = members
    .map(
      (name) =>
        `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`,
    )
    .join("");
  els.taskAssignee.value =
    selected && members.includes(selected) ? selected : members[0];
}

function saveTask(event) {
  event.preventDefault();
  const project = currentProject();
  if (!project) return;

  const title = els.taskTitle.value.trim();
  if (!title) return;

  const comment = els.taskComment.value.trim();
  const payload = {
    title,
    description: els.taskDescription.value.trim(),
    assignee: els.taskAssignee.value,
    priority: els.taskPriority.value,
    dueDate: els.taskDueDate.value,
    estimate: Number(els.taskEstimate.value || 0),
    labels: normalizeList(els.taskLabels.value),
    checklist: normalizeList(els.taskChecklist.value, "", "\n").map((text) => ({
      text,
      done: false,
    })),
    updatedAt: todayIso(),
  };

  if (state.editingTaskId) {
    const { task } = findTask(state.editingTaskId);
    Object.assign(task, payload);
    if (comment)
      task.comments.push({
        id: createId(),
        text: comment,
        at: new Date().toISOString(),
      });
    addActivity(`Updated task "${task.title}"`);
  } else {
    const column = project.columns.find(
      (item) => item.id === state.targetColumnId,
    );
    const task = {
      id: createId(),
      createdAt: todayIso(),
      comments: comment
        ? [{ id: createId(), text: comment, at: new Date().toISOString() }]
        : [],
      ...payload,
    };
    column.tasks.push(task);
    addActivity(`Added task "${task.title}" to ${column.name}`);
  }

  project.updatedAt = todayIso();
  saveData();
  closeModal("task-modal");
  renderBoard();
}

function deleteTask() {
  const taskInfo = findTask(state.editingTaskId);
  if (!taskInfo || !confirm(`Delete "${taskInfo.task.title}"?`)) return;
  taskInfo.column.tasks = taskInfo.column.tasks.filter(
    (task) => task.id !== state.editingTaskId,
  );
  addActivity(`Deleted task "${taskInfo.task.title}"`);
  saveData();
  closeModal("task-modal");
  renderBoard();
}

function moveTask(taskId, targetColumnId) {
  const taskInfo = findTask(taskId);
  const project = currentProject();
  if (!taskInfo || taskInfo.column.id === targetColumnId) return;

  const targetColumn = project.columns.find(
    (column) => column.id === targetColumnId,
  );
  taskInfo.column.tasks = taskInfo.column.tasks.filter(
    (task) => task.id !== taskId,
  );
  targetColumn.tasks.push(taskInfo.task);
  project.updatedAt = todayIso();
  addActivity(`Moved "${taskInfo.task.title}" to ${targetColumn.name}`);
  saveData();
  renderBoard();
}

function saveColumn(event) {
  event.preventDefault();
  const project = currentProject();
  const name = els.columnName.value.trim();
  if (!project || !name) return;

  project.columns.push({ id: createId(), name, tasks: [] });
  project.updatedAt = todayIso();
  addActivity(`Added column "${name}" to ${project.name}`);
  saveData();
  closeModal("column-modal");
  els.columnName.value = "";
  renderBoard();
}

function removeColumn(columnId) {
  const project = currentProject();
  const column = project.columns.find((item) => item.id === columnId);
  if (
    !column ||
    column.tasks.length ||
    !confirm(`Delete column "${column.name}"?`)
  )
    return;
  project.columns = project.columns.filter((item) => item.id !== columnId);
  addActivity(`Deleted column "${column.name}" from ${project.name}`);
  saveData();
  renderBoard();
}

function findTask(taskId) {
  const project = currentProject();
  if (!project) return null;
  for (const column of project.columns) {
    const task = column.tasks.find((item) => item.id === taskId);
    if (task) return { column, task };
  }
  return null;
}

function renderReports() {
  const projects = userProjects();
  els.reportsStats.innerHTML = renderStats(getWorkspaceStats(projects));
  els.analyticsPanels.innerHTML = renderAnalyticsPanels(projects);
  els.activityList.innerHTML = state.data.activity.length
    ? state.data.activity
        .slice(0, 15)
        .map(
          (item) => `
            <div class="activity-item">
              <strong>${escapeHtml(item.message)}</strong>
              <span>${formatDateTime(item.at)}</span>
            </div>
          `,
        )
        .join("")
    : '<div class="empty-state">No activity recorded yet.</div>';
}

function renderFeaturePage(view) {
  const config = FEATURE_PAGES[view];
  const projects = userProjects();
  const stats = getWorkspaceStats(projects);
  if (!config) return;

  els.viewEyebrow.textContent = config.eyebrow;
  els.viewTitle.textContent = config.eyebrow;
  els.featureView.innerHTML = `
    <section class="feature-hero">
      <div>
        <p class="eyebrow">${config.eyebrow}</p>
        <h3>${config.title}</h3>
        <p>${config.intro}</p>
      </div>
      <div class="feature-graphic" aria-hidden="true">
        ${renderFeatureGraphic(view, stats)}
      </div>
    </section>

    <div class="stats-grid">
      ${renderStats(stats)}
    </div>

    <section class="feature-grid">
      ${config.cards.map(renderFeatureCard).join("")}
    </section>

    <section class="matrix-grid">
      ${config.matrix.map(renderMatrixCard).join("")}
    </section>

    <section class="timeline-roadmap">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Recommended workflow</p>
          <h3>${workflowTitle(view)}</h3>
        </div>
      </div>
      <div class="roadmap-track">
        ${workflowSteps(view).map(renderRoadmapStep).join("")}
      </div>
    </section>

    <section class="feature-grid">
      ${renderLiveInsights(view, projects, stats)}
    </section>
  `;
}

function renderFeatureCard([title, text, icon]) {
  return `
    <article class="feature-card">
      <span><i class="fa-solid ${icon}"></i></span>
      <h4>${escapeHtml(title)}</h4>
      <p>${escapeHtml(text)}</p>
    </article>
  `;
}

function renderMatrixCard([title, text]) {
  return `
    <article class="matrix-card">
      <span><i class="fa-solid fa-layer-group"></i></span>
      <h4>${escapeHtml(title)}</h4>
      <p>${escapeHtml(text)}</p>
    </article>
  `;
}

function renderRoadmapStep([phase, title, text]) {
  return `
    <article class="roadmap-step">
      <span>${escapeHtml(phase)}</span>
      <h4>${escapeHtml(title)}</h4>
      <p>${escapeHtml(text)}</p>
    </article>
  `;
}

function renderFeatureGraphic(view, stats) {
  const values = {
    planning: [stats.milestones, stats.projects, stats.tasks],
    tasks: [stats.tasks, stats.doneTasks, stats.overdue],
    scheduling: [stats.overdue, stats.milestones, stats.alerts],
    resources: [stats.members, stats.budgetUsed, stats.estimate],
    collaboration: [stats.comments, stats.documents, stats.alerts],
    progress: [stats.averageProgress, stats.doneTasks, stats.tasks],
    risks: [stats.highRisks, stats.alerts, stats.projects],
    documents: [stats.documents, stats.projects, stats.comments],
    time: [stats.tracked, stats.estimate, stats.averageProgress],
  }[view] || [stats.projects, stats.tasks, stats.averageProgress];
  const icons = ["fa-gauge-high", "fa-diagram-project", "fa-chart-line"];

  return values
    .map((value, index) => {
      const width = Math.max(22, Math.min(100, Number(value) * 8 || 46));
      return `
        <div class="graphic-row">
          <i class="fa-solid ${icons[index]}"></i>
          <div class="graphic-bar"><span style="--value: ${width}%"></span></div>
          <strong>${value}</strong>
        </div>
      `;
    })
    .join("");
}

function renderLiveInsights(view, projects, stats) {
  const newest = projects[0];
  const allTasks = allWorkspaceTasks(projects);
  const overdueTasks = allTasks.filter((task) => isOverdue(task.dueDate));
  const insightMap = {
    planning: [
      ["Milestones planned", stats.milestones, "Keep milestone ownership visible and review phase gates weekly."],
      ["Active projects", stats.active, "Active scope should have current goals, assumptions, and success measures."],
      ["Next due project", newest?.name || "No project yet", newest?.dueDate ? `Due ${formatDate(newest.dueDate)}.` : "Create a project to begin planning."],
    ],
    tasks: [
      ["Total tasks", stats.tasks, "Use the Kanban board to move work from backlog to done."],
      ["Completed tasks", stats.doneTasks, "Completion is counted from tasks in the Done column."],
      ["Overdue tasks", stats.overdue, overdueTasks[0]?.title || "No overdue task title available."],
    ],
    scheduling: [
      ["Overdue items", stats.overdue, "Review schedule pressure before committing new work."],
      ["Milestones", stats.milestones, "Milestones anchor the timeline and release checkpoints."],
      ["Alerts", stats.alerts, "Alerts flag schedule, risk, and budget events that need attention."],
    ],
    resources: [
      ["Team members", stats.members, "Monitor allocation across project members before assigning more work."],
      ["Budget used", `${stats.budgetUsed}%`, `${currency(stats.budgetSpent)} spent from ${currency(stats.budgetTotal)} planned.`],
      ["Estimated hours", stats.estimate, "Estimates help compare effort demand against capacity."],
    ],
    collaboration: [
      ["Comments", stats.comments, "Task comments preserve decisions and updates close to execution."],
      ["Documents", stats.documents, "Use project files as the source of truth for briefs and checklists."],
      ["Recent activity", state.data.activity[0]?.message || "No activity yet", "Workspace activity records important changes."],
    ],
    progress: [
      ["Average progress", `${stats.averageProgress}%`, "Progress is derived from task movement into Done."],
      ["Done tasks", stats.doneTasks, "Completed work is the strongest progress signal."],
      ["Active projects", stats.active, "Use active status for projects currently consuming team capacity."],
    ],
    risks: [
      ["High risks", stats.highRisks, "High risks need mitigation owners and review cadence."],
      ["Alerts", stats.alerts, "Alerts should trigger action, not just awareness."],
      ["Overdue work", stats.overdue, "Overdue tasks often become schedule and stakeholder risks."],
    ],
    documents: [
      ["Stored files", stats.documents, "Attach charters, checklists, assets, and reports to each project."],
      ["Projects", stats.projects, "Each project can maintain its own document library."],
      ["Comments", stats.comments, "Comments add context around document-driven decisions."],
    ],
    time: [
      ["Tracked hours", stats.tracked, "Tracked time supports forecasting and utilization reporting."],
      ["Estimated hours", stats.estimate, "Estimate variance shows where scope or complexity changed."],
      ["Budget used", `${stats.budgetUsed}%`, "Time and budget should be reviewed together."],
    ],
  };

  return (insightMap[view] || [])
    .map(
      ([title, value, text]) => `
        <article class="insight-card">
          <span><i class="fa-solid fa-lightbulb"></i></span>
          <h4>${escapeHtml(title)}</h4>
          <strong>${escapeHtml(value)}</strong>
          <p>${escapeHtml(text)}</p>
        </article>
      `,
    )
    .join("");
}

function renderAnalyticsPanels(projects) {
  const stats = getWorkspaceStats(projects);
  return `
    <article class="analytics-panel">
      <div class="panel-heading">
        <span><i class="fa-solid fa-chart-line"></i></span>
        <div>
          <p class="eyebrow">Performance</p>
          <h3>${stats.averageProgress}% average completion</h3>
        </div>
      </div>
      ${renderMeter(stats.averageProgress)}
      <p>${stats.doneTasks} completed tasks across ${stats.projects} projects.</p>
    </article>
    <article class="analytics-panel">
      <div class="panel-heading">
        <span><i class="fa-solid fa-wallet"></i></span>
        <div>
          <p class="eyebrow">Financials</p>
          <h3>${stats.budgetUsed}% budget consumed</h3>
        </div>
      </div>
      ${renderMeter(stats.budgetUsed)}
      <p>${currency(stats.budgetSpent)} spent from ${currency(stats.budgetTotal)} planned.</p>
    </article>
    <article class="analytics-panel">
      <div class="panel-heading">
        <span><i class="fa-solid fa-stopwatch"></i></span>
        <div>
          <p class="eyebrow">Time Tracking</p>
          <h3>${stats.tracked} hours logged</h3>
        </div>
      </div>
      ${renderMeter(stats.estimate ? Math.min(100, Math.round((stats.tracked / stats.estimate) * 100)) : 0)}
      <p>${stats.estimate} hours estimated for active delivery work.</p>
    </article>
  `;
}

function workflowTitle(view) {
  return {
    planning: "From concept to approved baseline",
    tasks: "From request to completed work",
    scheduling: "From dates to delivery confidence",
    resources: "From demand to balanced capacity",
    collaboration: "From discussion to shared decision",
    progress: "From board movement to status clarity",
    risks: "From uncertainty to controlled response",
    documents: "From working files to governed records",
    time: "From effort log to forecast accuracy",
  }[view];
}

function workflowSteps(view) {
  const common = {
    planning: [
      ["01", "Frame", "Capture scope, goals, constraints, and assumptions."],
      ["02", "Break down", "Convert deliverables into milestones and manageable tasks."],
      ["03", "Baseline", "Confirm owners, due dates, budget, and acceptance criteria."],
      ["04", "Review", "Revisit scope, risks, and timeline as the project changes."],
    ],
    tasks: [
      ["01", "Capture", "Create tasks with context, labels, due dates, and estimates."],
      ["02", "Assign", "Choose owners and priority based on impact and dependencies."],
      ["03", "Execute", "Move cards across the Kanban board as work advances."],
      ["04", "Close", "Finish checklists, comments, review, and done criteria."],
    ],
    scheduling: [
      ["01", "Map", "Lay out project phases, milestones, and fixed deadlines."],
      ["02", "Sequence", "Order dependent work and add review buffers."],
      ["03", "Monitor", "Watch overdue tasks, alerts, and milestone drift."],
      ["04", "Adjust", "Update dates and communicate schedule changes early."],
    ],
    resources: [
      ["01", "Plan", "Estimate people, budget, materials, and tools needed."],
      ["02", "Allocate", "Assign owners and confirm resource availability."],
      ["03", "Track", "Compare actual hours and spend against the baseline."],
      ["04", "Rebalance", "Move work or funding when demand exceeds capacity."],
    ],
    collaboration: [
      ["01", "Discuss", "Keep project conversations tied to tasks and files."],
      ["02", "Decide", "Record decisions, owners, due dates, and rationale."],
      ["03", "Share", "Make documents and status visible to the right people."],
      ["04", "Notify", "Use activity and alerts to surface important changes."],
    ],
    progress: [
      ["01", "Measure", "Track tasks, completion, overdue items, and project status."],
      ["02", "Visualize", "Use boards, dashboards, and reports for fast scanning."],
      ["03", "Diagnose", "Find blockers, review queues, and risk signals."],
      ["04", "Report", "Share concise updates with next actions and owners."],
    ],
    risks: [
      ["01", "Identify", "List threats, assumptions, blockers, and dependencies."],
      ["02", "Assess", "Score probability, impact, urgency, and exposure."],
      ["03", "Mitigate", "Create response tasks, owners, and contingency plans."],
      ["04", "Review", "Track triggers and update the register regularly."],
    ],
    documents: [
      ["01", "Collect", "Attach briefs, charters, assets, and checklists."],
      ["02", "Organize", "Group files by phase, deliverable, or team."],
      ["03", "Govern", "Track owner, status, version, and access needs."],
      ["04", "Archive", "Store final records and lessons learned after closeout."],
    ],
    time: [
      ["01", "Estimate", "Plan task effort before work begins."],
      ["02", "Log", "Record time against tasks and project activity."],
      ["03", "Compare", "Review planned versus actual effort and budget pressure."],
      ["04", "Forecast", "Use variance to improve future schedules and staffing."],
    ],
  };
  return common[view] || [];
}

function renderStats(stats) {
  return [
    ["Projects", stats.projects],
    ["Active", stats.active],
    ["Tasks", stats.tasks],
    ["Overdue", stats.overdue],
  ]
    .map(
      ([label, value]) => `
        <div class="stat-card">
          <span>${label}</span>
          <strong>${value}</strong>
        </div>
      `,
    )
    .join("");
}

function allWorkspaceTasks(projects) {
  return projects.flatMap((project) =>
    project.columns.flatMap((column) => column.tasks),
  );
}

function getWorkspaceStats(projects) {
  const allTasks = allWorkspaceTasks(projects);
  const progressValues = projects.map(
    (project) => getProjectStats(project).progress,
  );
  const budgetTotal = projects.reduce(
    (sum, project) => sum + Number(project.budget?.total || 0),
    0,
  );
  const budgetSpent = projects.reduce(
    (sum, project) => sum + Number(project.budget?.spent || 0),
    0,
  );

  return {
    projects: projects.length,
    active: projects.filter((project) => project.status === "Active").length,
    tasks: allTasks.length,
    doneTasks: projects.reduce(
      (sum, project) => sum + getProjectStats(project).done,
      0,
    ),
    overdue: allTasks.filter((task) => isOverdue(task.dueDate)).length,
    milestones: projects.reduce(
      (sum, project) => sum + safeList(project.milestones).length,
      0,
    ),
    members: new Set(projects.flatMap((project) => safeList(project.members)))
      .size,
    comments: allTasks.reduce(
      (sum, task) => sum + safeList(task.comments).length,
      0,
    ),
    highRisks: projects.reduce(
      (sum, project) =>
        sum +
        safeList(project.risks).filter((risk) => risk.level === "High").length,
      0,
    ),
    documents: projects.reduce(
      (sum, project) => sum + safeList(project.documents).length,
      0,
    ),
    alerts: projects.reduce(
      (sum, project) => sum + safeList(project.alerts).length,
      0,
    ),
    estimate: allTasks.reduce(
      (sum, task) => sum + Number(task.estimate || 0),
      0,
    ),
    tracked: allTasks.reduce((sum, task) => sum + Number(task.tracked || 0), 0),
    averageProgress: progressValues.length
      ? Math.round(
          progressValues.reduce((sum, value) => sum + value, 0) /
            progressValues.length,
        )
      : 0,
    budgetTotal,
    budgetSpent,
    budgetUsed: budgetTotal ? Math.round((budgetSpent / budgetTotal) * 100) : 0,
  };
}

function getProjectStats(project) {
  const allTasks = project.columns.flatMap((column) => column.tasks);
  const doneColumn = project.columns.find(
    (column) => column.name.toLowerCase() === "done",
  );
  const done = doneColumn ? doneColumn.tasks.length : 0;
  const total = allTasks.length;
  return {
    total,
    done,
    progress: total ? Math.round((done / total) * 100) : 0,
    overdue: allTasks.filter((task) => isOverdue(task.dueDate)).length,
    estimate: allTasks.reduce(
      (sum, task) => sum + Number(task.estimate || 0),
      0,
    ),
    tracked: allTasks.reduce((sum, task) => sum + Number(task.tracked || 0), 0),
  };
}

function addActivity(message) {
  state.data.activity.unshift({
    id: createId(),
    message,
    at: new Date().toISOString(),
  });
  state.data.activity = state.data.activity.slice(0, 50);
}

function clearActivity() {
  if (!confirm("Clear all activity?")) return;
  state.data.activity = [];
  saveData();
  renderReports();
}

function exportData() {
  const payload = JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      user: state.currentUser?.email,
      projects: userProjects(),
      activity: state.data.activity,
    },
    null,
    2,
  );
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "projectflow-export.json";
  link.click();
  URL.revokeObjectURL(url);
  addActivity("Exported workspace data");
  saveData();
}

function openModal(id) {
  document.getElementById(id).classList.remove("hidden");
}

function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
}

function loadData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.warn(
        "ProjectFlow data was reset because it could not be parsed.",
        error,
      );
    }
  }
  return seedData();
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
}

function seedData() {
  const userId = createId();
  const projectId = createId();
  const columns = DEFAULT_COLUMNS.map((name) => ({
    id: createId(),
    name,
    tasks: [],
  }));

  columns[0].tasks.push({
    id: createId(),
    title: "Confirm launch scope",
    description: "Review milestone goals and mark any out-of-scope requests.",
    assignee: "John Doe",
    priority: "High",
    dueDate: nextDate(2),
    estimate: 3,
    tracked: 1.5,
    labels: ["Planning"],
    checklist: [
      { text: "Review backlog", done: false },
      { text: "Approve milestone", done: false },
    ],
    comments: [],
    createdAt: todayIso(),
    updatedAt: todayIso(),
  });

  columns[2].tasks.push({
    id: createId(),
    title: "Build dashboard widgets",
    description: "Add project totals, overdue items, and progress indicators.",
    assignee: "Priya Shah",
    priority: "Medium",
    dueDate: nextDate(5),
    estimate: 6,
    tracked: 4,
    labels: ["UI", "Analytics"],
    checklist: [{ text: "Wire summary cards", done: true }],
    comments: [],
    createdAt: todayIso(),
    updatedAt: todayIso(),
  });

  columns[4].tasks.push({
    id: createId(),
    title: "Create initial project board",
    description: "Set up columns and seed the first delivery plan.",
    assignee: "John Doe",
    priority: "Low",
    dueDate: nextDate(-1),
    estimate: 2,
    tracked: 2,
    labels: ["Setup"],
    checklist: [{ text: "Create board", done: true }],
    comments: [],
    createdAt: todayIso(),
    updatedAt: todayIso(),
  });

  return {
    users: [
      {
        id: userId,
        name: "John Doe",
        email: "john@example.com",
        password: "123456",
      },
    ],
    projects: [
      {
        id: projectId,
        userId,
        name: "Website Relaunch",
        description:
          "Coordinate design, implementation, QA, and launch readiness.",
        status: "Active",
        dueDate: nextDate(14),
        members: ["John Doe", "Priya Shah", "Miguel Santos"],
        budget: { total: 85000, spent: 42800 },
        materials: ["Design system", "Analytics workspace", "QA devices"],
        milestones: [
          { name: "Scope locked", date: nextDate(-5), done: true },
          { name: "Design review", date: nextDate(3), done: false },
          { name: "QA freeze", date: nextDate(9), done: false },
          { name: "Launch", date: nextDate(14), done: false },
        ],
        risks: [
          {
            title: "Content approvals may slip",
            level: "High",
            mitigation: "Assign owners and review blockers in daily standup.",
          },
          {
            title: "Analytics tags incomplete",
            level: "Medium",
            mitigation: "Validate tracking checklist before QA freeze.",
          },
        ],
        documents: [
          { name: "Project charter", icon: "fa-file-contract" },
          { name: "Launch checklist", icon: "fa-clipboard-check" },
          { name: "Brand assets", icon: "fa-folder-open" },
        ],
        alerts: [
          "Design review due soon",
          "High risk needs mitigation owner",
          "Budget burn above 50%",
        ],
        createdAt: todayIso(),
        updatedAt: todayIso(),
        columns,
      },
    ],
    activity: [
      {
        id: createId(),
        message: "Created demo workspace",
        at: new Date().toISOString(),
      },
    ],
  };
}

function normalizeList(value, fallback = "", separator = ",") {
  const items = value
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean);
  if (!items.length && fallback) return [fallback];
  return [...new Set(items)];
}

function createId() {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function nextDate(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function isOverdue(value) {
  if (!value) return false;
  const today = new Date(todayIso());
  const due = new Date(value);
  return due < today;
}

function priorityColor(priority) {
  return { High: "red", Medium: "orange", Low: "green" }[priority] || "gray";
}

function statusColor(status) {
  return {
    Planning: "gray",
    Active: "blue",
    "On Hold": "orange",
    Completed: "green",
  }[status];
}

function safeList(value) {
  return Array.isArray(value) ? value : [];
}

function getResourceSummary(project) {
  const members = safeList(project.members).length || 1;
  const materials = safeList(project.materials);
  const allocation = Math.min(100, members * 18 + materials.length * 7);
  return {
    materials: materials.length ? materials.join(", ") : "Core workspace",
    allocation,
  };
}

function currency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function formatShortDate(value) {
  if (!value) return "TBD";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

function initials(name = "?") {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
