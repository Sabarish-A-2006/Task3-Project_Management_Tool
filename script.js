const STORAGE_KEY = "projectflow-data-v2";
const LEGACY_STORAGE_KEY = "projectflow-data-v1";
const THEME_KEY = "projectflow-theme";
const SESSION_KEY = "projectflow-user-id";
const WORKSPACE_KEY = "projectflow-workspace-id";
const SIDEBAR_KEY = "projectflow-sidebar-collapsed";

const TASK_STATUSES = [
  "Backlog",
  "To Do",
  "In Progress",
  "In Review",
  "Blocked",
  "Done",
];
const PROJECT_STATUSES = [
  "Planning",
  "Active",
  "On Hold",
  "At Risk",
  "Completed",
  "Archived",
];
const PRIORITIES = ["Urgent", "High", "Medium", "Low", "None"];
const PROJECT_TABS = [
  "overview",
  "board",
  "list",
  "calendar",
  "timeline",
  "milestones",
  "files",
  "documents",
  "activity",
  "reports",
];

const VIEW_META = {
  home: ["Workspace", "Smart Dashboard"],
  mywork: ["Personal planning", "My Work"],
  inbox: ["Notifications", "Inbox"],
  projects: ["Portfolio", "Projects"],
  tasks: ["Execution", "Tasks"],
  teams: ["People", "Teams & Workload"],
  calendar: ["Schedule", "Calendar"],
  roadmap: ["Planning", "Roadmap"],
  goals: ["Strategy", "Goals & OKRs"],
  reports: ["Insights", "Reports & Analytics"],
  documents: ["Knowledge", "Documents"],
  files: ["Assets", "Files"],
  settings: ["Administration", "Settings"],
  project: ["Project", "Project Detail"],
};

const FEATURE_MODULES = [
  ["Projects", "fa-diagram-project", "projects"],
  ["My Work", "fa-circle-check", "mywork"],
  ["Inbox", "fa-inbox", "inbox"],
  ["Tasks", "fa-list-check", "tasks"],
  ["Teams", "fa-users", "teams"],
  ["Calendar", "fa-calendar-days", "calendar"],
  ["Roadmap", "fa-timeline", "roadmap"],
  ["Goals", "fa-bullseye", "goals"],
  ["Reports", "fa-chart-line", "reports"],
  ["Documents", "fa-file-lines", "documents"],
  ["Files", "fa-folder-open", "files"],
  ["Settings", "fa-gear", "settings"],
];

const state = {
  data: null,
  currentUser: null,
  activeWorkspaceId: null,
  currentProjectId: null,
  currentProjectTab: "overview",
  editingProjectId: null,
  editingTaskId: null,
  editingGoalId: null,
  editingDocumentId: null,
  calendarMode: "month",
  targetColumnId: null,
  view: "home",
  filters: {
    projectSearch: "",
    projectStatus: "all",
    taskSearch: "",
    taskStatus: "all",
    taskPriority: "all",
    taskAssignee: "all",
    projectId: "all",
  },
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const els = {
  landingPage: $("#landing-page"),
  authContainer: $("#auth-container"),
  appContainer: $("#app-container"),
  sidebar: $("#sidebar"),
  loginForm: $("#login-form"),
  registerForm: $("#register-form"),
  showRegister: $("#show-register"),
  showLogin: $("#show-login"),
  loginBtn: $("#login-btn"),
  registerBtn: $("#register-btn"),
  logoutBtn: $("#logout-btn"),
  username: $("#username"),
  userAvatar: $("#user-avatar"),
  userRole: $("#user-role"),
  viewTitle: $("#view-title"),
  viewEyebrow: $("#view-eyebrow"),
  workspaceSwitcher: $("#workspace-switcher"),
  sidebarWorkspaceName: $("#sidebar-workspace-name"),
  globalSearchInput: $("#global-search-input"),
  quickCreateBtn: $("#quick-create-btn"),
  quickCreatePanel: $("#quick-create-panel"),
  notificationsBtn: $("#notifications-btn"),
  notificationCount: $("#notification-count"),
  notificationPanel: $("#notification-panel"),
  helpBtn: $("#help-btn"),
  themeToggleBtn: $("#theme-toggle-btn"),
  collapseSidebarBtn: $("#collapse-sidebar-btn"),
  homeView: $("#home-view"),
  myworkView: $("#mywork-view"),
  inboxView: $("#inbox-view"),
  projectsView: $("#projects-view"),
  tasksView: $("#tasks-view"),
  teamsView: $("#teams-view"),
  calendarView: $("#calendar-view"),
  roadmapView: $("#roadmap-view"),
  goalsView: $("#goals-view"),
  reportsView: $("#reports-view"),
  documentsView: $("#documents-view"),
  filesView: $("#files-view"),
  settingsView: $("#settings-view"),
  projectView: $("#project-view"),
  projectTabs: $("#project-tabs"),
  projectDetailBody: $("#project-detail-body"),
  backToProjects: $("#back-to-projects"),
  projectTitle: $("#project-title"),
  projectMeta: $("#project-meta"),
  projectDescription: $("#project-description"),
  editProjectBtn: $("#edit-project-btn"),
  archiveProjectBtn: $("#archive-project-btn"),
  deleteProjectBtn: $("#delete-project-btn"),
  projectModal: $("#project-modal"),
  projectForm: $("#project-form"),
  projectModalTitle: $("#project-modal-title"),
  projectName: $("#project-name"),
  projectOwner: $("#project-owner"),
  projectDescriptionInput: $("#project-description-input"),
  projectStatus: $("#project-status"),
  projectPriority: $("#project-priority"),
  projectBudget: $("#project-budget"),
  projectStartDate: $("#project-start-date"),
  projectDueDate: $("#project-due-date"),
  projectMembers: $("#project-members"),
  projectTags: $("#project-tags"),
  taskModal: $("#task-modal"),
  taskForm: $("#task-form"),
  taskModalTitle: $("#task-modal-title"),
  taskTitle: $("#task-title"),
  taskDescription: $("#task-description"),
  taskProject: $("#task-project"),
  taskStatus: $("#task-status"),
  taskAssignee: $("#task-assignee"),
  taskPriority: $("#task-priority"),
  taskReporter: $("#task-reporter"),
  taskSprint: $("#task-sprint"),
  taskStartDate: $("#task-start-date"),
  taskDueDate: $("#task-due-date"),
  taskMilestone: $("#task-milestone"),
  taskEstimate: $("#task-estimate"),
  taskTracked: $("#task-tracked"),
  taskLabels: $("#task-labels"),
  taskSubtasks: $("#task-subtasks"),
  taskDependency: $("#task-dependency"),
  taskComment: $("#task-comment"),
  deleteTaskBtn: $("#delete-task-btn"),
  columnForm: $("#column-form"),
  columnName: $("#column-name"),
  goalForm: $("#goal-form"),
  goalTitle: $("#goal-title"),
  goalDescription: $("#goal-description"),
  goalOwner: $("#goal-owner"),
  goalDeadline: $("#goal-deadline"),
  goalTarget: $("#goal-target"),
  goalProgress: $("#goal-progress"),
  documentForm: $("#document-form"),
  documentTitle: $("#document-title"),
  documentProject: $("#document-project"),
  documentContent: $("#document-content"),
  fileForm: $("#file-form"),
  fileName: $("#file-name"),
  fileProject: $("#file-project"),
  fileType: $("#file-type"),
  fileSize: $("#file-size"),
  fileOwner: $("#file-owner"),
  commandModal: $("#command-modal"),
  commandInput: $("#command-input"),
  commandResults: $("#command-results"),
  helpModal: $("#help-modal"),
  toastRegion: $("#toast-region"),
};

initialize();

function initialize() {
  state.data = normalizeData(loadData());
  saveData();
  applyTheme(localStorage.getItem(THEME_KEY) || "light");
  applySidebarPreference();
  bindEvents();
  restoreSession();
}

function bindEvents() {
  $$("[data-auth-target]").forEach((button) => {
    button.addEventListener("click", () => showAuth(button.dataset.authTarget));
  });

  $$("[data-scroll-target]").forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById(button.dataset.scrollTarget)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  $$("[data-show-landing]").forEach((button) => {
    button.addEventListener("click", showLanding);
  });

  els.showRegister.addEventListener("click", (event) => {
    event.preventDefault();
    showAuth("register");
  });

  els.showLogin.addEventListener("click", (event) => {
    event.preventDefault();
    showAuth("login");
  });

  els.loginBtn.addEventListener("click", handleLogin);
  els.registerBtn.addEventListener("click", handleRegister);
  els.logoutBtn.addEventListener("click", handleLogout);
  els.themeToggleBtn.addEventListener("click", toggleTheme);
  els.helpBtn.addEventListener("click", () => openModal("help-modal"));
  els.quickCreateBtn.addEventListener("click", toggleQuickCreate);
  els.notificationsBtn.addEventListener("click", toggleNotifications);
  els.collapseSidebarBtn.addEventListener("click", toggleSidebar);
  els.workspaceSwitcher.addEventListener("change", changeWorkspace);
  els.backToProjects.addEventListener("click", () => showView("projects"));
  els.editProjectBtn.addEventListener("click", () =>
    openProjectModal(currentProject()),
  );
  els.archiveProjectBtn.addEventListener("click", archiveCurrentProject);
  els.deleteProjectBtn.addEventListener("click", deleteCurrentProject);

  els.projectForm.addEventListener("submit", saveProject);
  els.taskForm.addEventListener("submit", saveTask);
  els.columnForm.addEventListener("submit", saveColumn);
  els.goalForm.addEventListener("submit", saveGoal);
  els.documentForm.addEventListener("submit", saveDocument);
  els.fileForm.addEventListener("submit", saveFile);
  els.deleteTaskBtn.addEventListener("click", deleteTask);

  els.globalSearchInput.addEventListener("input", (event) => {
    state.filters.taskSearch = event.target.value.trim().toLowerCase();
    if (["tasks", "mywork"].includes(state.view)) renderCurrentView();
  });

  els.globalSearchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      openCommandPalette(event.target.value.trim());
    }
  });

  els.commandInput.addEventListener("input", () =>
    renderCommandResults(els.commandInput.value.trim().toLowerCase()),
  );

  els.projectTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-project-tab]");
    if (!button) return;
    state.currentProjectTab = button.dataset.projectTab;
    renderProjectView();
  });

  $$(".nav-link").forEach((button) => {
    button.addEventListener("click", () => showView(button.dataset.view));
  });

  $$(".close-modal").forEach((button) => {
    button.addEventListener("click", () => closeModal(button.dataset.close));
  });

  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("change", handleDocumentChange);
  document.addEventListener("input", handleDocumentInput);
  document.addEventListener("keydown", handleKeyboardShortcuts);
}

function handleDocumentClick(event) {
  const action = event.target.closest("[data-action]");
  const projectCard = event.target.closest("[data-open-project]");
  const taskCard = event.target.closest("[data-open-task]");
  const commandResult = event.target.closest("[data-command]");

  if (!event.target.closest(".popover") && !event.target.closest("#quick-create-btn")) {
    els.quickCreatePanel.classList.add("hidden");
  }

  if (!event.target.closest(".popover") && !event.target.closest("#notifications-btn")) {
    els.notificationPanel.classList.add("hidden");
  }

  if (commandResult) {
    event.preventDefault();
    runCommand(commandResult.dataset.command);
    return;
  }

  if (action) {
    event.preventDefault();
    const { action: name, id, view, tab } = action.dataset;
    const actions = {
    "create-project": () => openProjectModal(),
    "create-task": () => openTaskModal(),
    "create-goal": () => openGoalModal(),
    "create-document": () => openDocumentModal(),
    "create-file": () => openFileModal(),
    "export-data": exportData,
    "mark-all-read": markAllNotificationsRead,
    "open-view": () => showView(view),
    "open-project-tab": () => {
      state.currentProjectTab = tab;
      renderProjectView();
    },
    "set-calendar-mode": () => {
      state.calendarMode = action.dataset.mode || "month";
      renderCurrentView();
    },
    "add-milestone": () => addMilestonePrompt(id),
    "add-sprint": () => addSprintPrompt(id),
    "add-risk": () => addRiskPrompt(id),
    "add-document-to-project": () => openDocumentModal(null, id),
    "add-file-to-project": () => openFileModal(id),
    "duplicate-project": () => duplicateProject(id),
    "delete-goal": () => deleteGoal(id),
    "delete-document": () => deleteDocument(id),
    "delete-file": () => deleteFile(id),
    "mark-notification-read": () => markNotificationRead(id),
    "delete-notification": () => deleteNotification(id),
    "bulk-done": bulkMarkDone,
    "bulk-assign-me": bulkAssignMe,
    "start-timer": () => startTimer(id),
    "stop-timer": () => stopTimer(id),
    "save-settings": saveSettingsFromView,
    "reset-demo": resetDemoData,
    "save-filter": saveCurrentFilter,
    };
    actions[name]?.();
    return;
  }

  if (projectCard) openProject(projectCard.dataset.openProject);
  if (taskCard) openTaskModal(taskCard.dataset.openTask);
}

function handleDocumentChange(event) {
  const target = event.target;
  if (target.matches("#project-status-filter")) {
    state.filters.projectStatus = target.value;
    renderProjectCardsOnly();
  }
  if (target.matches("#task-status-filter")) {
    state.filters.taskStatus = target.value;
    renderTaskTableOnly();
  }
  if (target.matches("#task-priority-filter")) {
    state.filters.taskPriority = target.value;
    renderTaskTableOnly();
  }
  if (target.matches("#task-assignee-filter")) {
    state.filters.taskAssignee = target.value;
    renderTaskTableOnly();
  }
  if (target.matches("#task-project-filter")) {
    state.filters.projectId = target.value;
    renderTaskTableOnly();
  }
  if (target.matches("[data-inline-status]")) {
    updateTaskField(target.dataset.inlineStatus, "status", target.value);
  }
  if (target.matches("[data-inline-priority]")) {
    updateTaskField(target.dataset.inlinePriority, "priority", target.value);
  }
  if (target.matches("[data-inline-assignee]")) {
    updateTaskField(target.dataset.inlineAssignee, "assignee", target.value);
  }
  if (target.matches("[data-subtask-toggle]")) {
    toggleSubtask(target.dataset.subtaskToggle, Number(target.dataset.index));
  }
}

function handleDocumentInput(event) {
  const target = event.target;
  if (target.matches("#project-search")) {
    state.filters.projectSearch = target.value.trim().toLowerCase();
    renderProjectCardsOnly();
  }
  if (target.matches("#task-search")) {
    state.filters.taskSearch = target.value.trim().toLowerCase();
    if (state.view === "project" && state.currentProjectTab === "board") {
      renderBoardColumnsOnly();
    } else {
      renderTaskTableOnly();
    }
  }
}

function handleKeyboardShortcuts(event) {
  const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(
    event.target.tagName,
  );

  if (event.key === "Escape") {
    closeAllModals();
    return;
  }

  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openCommandPalette();
    return;
  }

  if (isTyping || !state.currentUser) return;

  if (event.key === "/") {
    event.preventDefault();
    els.globalSearchInput.focus();
  }
  if (event.key.toLowerCase() === "c") openTaskModal();
  if (event.key.toLowerCase() === "p") openProjectModal();
}

function showLanding() {
  els.landingPage.classList.remove("hidden");
  els.authContainer.classList.add("hidden");
  els.appContainer.classList.add("hidden");
}

function showAuth(target = "login") {
  els.landingPage.classList.add("hidden");
  els.authContainer.classList.remove("hidden");
  els.appContainer.classList.add("hidden");
  els.loginForm.classList.toggle("hidden", target !== "login");
  els.registerForm.classList.toggle("hidden", target !== "register");
  const focusTarget = target === "login" ? "#login-email" : "#register-name";
  setTimeout(() => $(focusTarget)?.focus(), 30);
}

function handleLogin() {
  const email = $("#login-email").value.trim().toLowerCase();
  const password = $("#login-password").value;
  const user = state.data.users.find(
    (item) => item.email.toLowerCase() === email && item.password === password,
  );

  if (!user) {
    toast("Invalid credentials");
    return;
  }

  state.currentUser = user;
  sessionStorage.setItem(SESSION_KEY, user.id);
  enterApp();
}

function handleRegister() {
  const name = $("#register-name").value.trim();
  const email = $("#register-email").value.trim().toLowerCase();
  const password = $("#register-password").value;

  if (!name || !email || !password) {
    toast("Please fill all fields");
    return;
  }
  if (!email.includes("@")) {
    toast("Enter a valid email address");
    return;
  }
  if (password.length < 6) {
    toast("Use at least 6 characters for the password");
    return;
  }
  if (state.data.users.some((user) => user.email.toLowerCase() === email)) {
    toast("User already exists");
    return;
  }

  const user = {
    id: createId(),
    name,
    email,
    password,
    role: "Owner",
    team: "Core Team",
    avatar: initials(name),
    workspaceIds: [],
  };
  const workspace = createWorkspace(`${name}'s Workspace`, user);
  state.data.users.push(user);
  state.data.workspaces.push(workspace);
  user.workspaceIds.push(workspace.id);
  state.data.projects.push(createStarterProject(user, workspace.id, "Product Launch"));
  state.data.goals.push(createGoalRecord(workspace.id, name));
  addActivity(`Registered ${name}`, workspace.id);
  addNotification({
    workspaceId: workspace.id,
    userId: user.id,
    title: "Workspace ready",
    message: "Your starter project and goal are ready to customize.",
    type: "workspace",
  });
  state.currentUser = user;
  state.activeWorkspaceId = workspace.id;
  sessionStorage.setItem(SESSION_KEY, user.id);
  localStorage.setItem(WORKSPACE_KEY, workspace.id);
  saveData();
  enterApp();
}

function handleLogout() {
  state.currentUser = null;
  state.activeWorkspaceId = null;
  state.currentProjectId = null;
  sessionStorage.removeItem(SESSION_KEY);
  showLanding();
}

function restoreSession() {
  const userId = sessionStorage.getItem(SESSION_KEY);
  const user = state.data.users.find((item) => String(item.id) === userId);
  if (!user) return;
  state.currentUser = user;
  enterApp();
}

function enterApp() {
  const workspaces = currentUserWorkspaces();
  state.activeWorkspaceId =
    localStorage.getItem(WORKSPACE_KEY) &&
    workspaces.some((item) => item.id === localStorage.getItem(WORKSPACE_KEY))
      ? localStorage.getItem(WORKSPACE_KEY)
      : workspaces[0]?.id;

  els.landingPage.classList.add("hidden");
  els.authContainer.classList.add("hidden");
  els.appContainer.classList.remove("hidden");
  els.username.textContent = state.currentUser.name;
  els.userAvatar.textContent = initials(state.currentUser.name);
  els.userRole.textContent = state.currentUser.role || "Member";
  renderChrome();
  showView("home");
}

function renderChrome() {
  const workspaces = currentUserWorkspaces();
  els.workspaceSwitcher.innerHTML = workspaces
    .map(
      (workspace) =>
        `<option value="${workspace.id}">${escapeHtml(workspace.name)}</option>`,
    )
    .join("");
  els.workspaceSwitcher.value = state.activeWorkspaceId;
  els.sidebarWorkspaceName.textContent = currentWorkspace()?.name || "Workspace";
  renderNotificationCount();
}

function changeWorkspace(event) {
  state.activeWorkspaceId = event.target.value;
  localStorage.setItem(WORKSPACE_KEY, state.activeWorkspaceId);
  state.currentProjectId = null;
  renderChrome();
  showView("home");
}

function showView(view) {
  if (!state.currentUser) {
    showAuth("login");
    return;
  }

  state.view = view;
  if (view !== "project") state.currentProjectId = null;
  const [eyebrow, title] = VIEW_META[view] || VIEW_META.home;
  els.viewEyebrow.textContent = eyebrow;
  els.viewTitle.textContent = title;

  $$(".app-view").forEach((element) => element.classList.add("hidden"));
  els.projectView.classList.toggle("hidden", view !== "project");

  const targetView = $(`#${view}-view`);
  if (targetView) targetView.classList.remove("hidden");

  $$(".nav-link").forEach((button) => {
    button.classList.toggle(
      "active",
      view === "project"
        ? button.dataset.view === "projects"
        : button.dataset.view === view,
    );
  });

  renderCurrentView();
}

function renderCurrentView() {
  const renderers = {
    home: renderHome,
    mywork: renderMyWork,
    inbox: renderInbox,
    projects: renderProjects,
    tasks: renderTasks,
    teams: renderTeams,
    calendar: renderCalendar,
    roadmap: renderRoadmap,
    goals: renderGoals,
    reports: renderReports,
    documents: renderDocuments,
    files: renderFiles,
    settings: renderSettings,
    project: renderProjectView,
  };
  renderers[state.view]?.();
  renderNotificationCount();
}

function renderHome() {
  const projects = workspaceProjects();
  const tasks = allWorkspaceTasks(projects);
  const stats = getWorkspaceStats(projects);
  const dueToday = tasks.filter((item) => item.dueDate === todayIso());
  const overdue = tasks.filter((item) => isOverdue(item.dueDate) && item.status !== "Done");
  const important = projects
    .slice()
    .sort((a, b) => projectHealthScore(a) - projectHealthScore(b))
    .slice(0, 4);

  els.homeView.innerHTML = `
    <div class="stats-grid">
      ${renderStats(stats)}
    </div>
    <div class="dashboard-grid">
      <div class="stack">
        <section class="panel">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Actionable now</p>
              <h3>Today and overdue</h3>
            </div>
            <button class="secondary-btn" data-action="open-view" data-view="mywork">
              <i class="fa-solid fa-arrow-right"></i>
              My Work
            </button>
          </div>
          <div class="feature-grid">
            ${renderInsightCard("Due today", dueToday.length, "Tasks that should move before the day closes.", "fa-calendar-day")}
            ${renderInsightCard("Overdue", overdue.length, "Work that needs rescheduling or owner attention.", "fa-triangle-exclamation")}
            ${renderInsightCard("Completion rate", `${stats.completionRate}%`, "Done tasks divided by total tracked tasks.", "fa-chart-simple")}
          </div>
        </section>
        <section class="panel">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Portfolio health</p>
              <h3>Projects needing attention</h3>
            </div>
          </div>
          <div class="projects-grid">
            ${important.length ? important.map(renderProjectCard).join("") : renderEmpty("Create a project to begin planning.")}
          </div>
        </section>
        <section class="panel">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Workspace modules</p>
              <h3>Move quickly</h3>
            </div>
          </div>
          <div class="module-grid">
            ${FEATURE_MODULES.map(renderModuleCard).join("")}
          </div>
        </section>
      </div>
      <aside class="stack">
        <section class="panel">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Upcoming milestones</p>
              <h3>Next checkpoints</h3>
            </div>
          </div>
          <div class="timeline-strip">
            ${renderUpcomingMilestones(projects)}
          </div>
        </section>
        <section class="panel">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Team workload</p>
              <h3>Capacity snapshot</h3>
            </div>
          </div>
          <div class="workload-grid">
            ${getWorkload(projects).slice(0, 4).map(renderMemberCard).join("")}
          </div>
        </section>
      </aside>
    </div>
  `;
}

function renderProjects() {
  const stats = getWorkspaceStats(workspaceProjects());
  els.projectsView.innerHTML = `
    <div class="stats-grid">
      ${renderStats(stats)}
    </div>
    <div class="toolbar">
      <label class="search-field">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input id="project-search" type="search" placeholder="Search projects" value="${escapeAttribute(state.filters.projectSearch)}" />
      </label>
      <select id="project-status-filter" aria-label="Filter projects by status">
        <option value="all">All statuses</option>
        ${PROJECT_STATUSES.map((status) => `<option ${state.filters.projectStatus === status ? "selected" : ""}>${status}</option>`).join("")}
      </select>
      <button class="primary-btn" data-action="create-project">
        <i class="fa-solid fa-plus"></i>
        Project
      </button>
    </div>
    <div class="projects-grid" id="projects-list"></div>
  `;
  renderProjectCardsOnly();
}

function renderProjectCardsOnly() {
  const list = $("#projects-list");
  if (!list) return;
  const filtered = workspaceProjects().filter((project) => {
    const query = state.filters.projectSearch;
    const matchesSearch =
      project.name.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      safeList(project.tags).join(" ").toLowerCase().includes(query);
    const matchesStatus =
      state.filters.projectStatus === "all" ||
      project.status === state.filters.projectStatus;
    return matchesSearch && matchesStatus;
  });

  list.innerHTML = filtered.length
    ? filtered.map(renderProjectCard).join("")
    : renderEmpty("No matching projects. Create a project to begin planning.");
}

function renderProjectCard(project) {
  const stats = getProjectStats(project);
  const health = getProjectHealth(project);
  const due = project.dueDate ? formatDate(project.dueDate) : "No due date";
  return `
    <article class="project-card" data-open-project="${project.id}" tabindex="0">
      <header>
        <div class="member-header">
          <span class="project-icon">${escapeHtml(project.icon || initials(project.name))}</span>
          <div>
            <h3>${escapeHtml(project.name)}</h3>
            <p>${escapeHtml(project.description || "No description added")}</p>
          </div>
        </div>
        <span class="badge ${statusColor(project.status)}">${escapeHtml(project.status)}</span>
      </header>
      <div>
        <div class="progress-track" aria-label="${stats.progress}% complete">
          <div class="progress-fill" style="width: ${stats.progress}%"></div>
        </div>
      </div>
      <div class="badge-row">
        <span class="badge ${health.color}"><i class="fa-solid fa-heart-pulse"></i>${health.label}</span>
        <span class="badge blue"><i class="fa-solid fa-list-check"></i>${stats.total} tasks</span>
        <span class="badge green"><i class="fa-solid fa-check"></i>${stats.done} done</span>
        <span class="badge ${isOverdue(project.dueDate) && project.status !== "Completed" ? "red" : "gray"}">
          <i class="fa-solid fa-calendar"></i>${due}
        </span>
      </div>
      <div class="chip-row">
        ${safeList(project.tags).slice(0, 3).map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`).join("")}
      </div>
    </article>
  `;
}

function openProject(projectId) {
  state.currentProjectId = projectId;
  state.currentProjectTab = "overview";
  state.filters.taskSearch = "";
  state.filters.taskStatus = "all";
  state.filters.taskPriority = "all";
  state.filters.taskAssignee = "all";
  state.filters.projectId = projectId;
  showView("project");
}

function renderProjectView() {
  const project = currentProject();
  if (!project) {
    showView("projects");
    return;
  }
  const stats = getProjectStats(project);
  const health = getProjectHealth(project);
  els.viewEyebrow.textContent = "Project";
  els.viewTitle.textContent = project.name;
  els.projectTitle.textContent = project.name;
  els.projectMeta.innerHTML = `${escapeHtml(project.status)} | ${health.label} | ${stats.progress}% complete | ${project.dueDate ? `Due ${formatDate(project.dueDate)}` : "No due date"}`;
  els.projectDescription.textContent =
    project.description || "No description added.";

  $$("#project-tabs [data-project-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.projectTab === state.currentProjectTab);
  });

  const renderers = {
    overview: renderProjectOverview,
    board: renderProjectBoard,
    list: renderProjectList,
    calendar: renderProjectCalendar,
    timeline: renderProjectTimeline,
    milestones: renderProjectMilestones,
    files: renderProjectFiles,
    documents: renderProjectDocuments,
    activity: renderProjectActivity,
    reports: renderProjectReports,
  };

  els.projectDetailBody.innerHTML = renderers[state.currentProjectTab]?.(project) || "";
  if (state.currentProjectTab === "board") renderBoardColumnsOnly();
  if (state.currentProjectTab === "list") renderTaskTableOnly();
}

function renderProjectOverview(project) {
  const stats = getProjectStats(project);
  const health = getProjectHealth(project);
  return `
    <div class="board-summary">
      ${renderSummary("Health", health.label, health.color)}
      ${renderSummary("Progress", `${stats.progress}%`)}
      ${renderSummary("Tasks", stats.total)}
      ${renderSummary("Overdue", stats.overdue, stats.overdue ? "red" : "green")}
      ${renderSummary("Tracked", `${stats.tracked}h / ${stats.estimate}h`)}
    </div>
    <div class="project-intelligence">
      ${renderPlanningPanel(project)}
      ${renderResourcePanel(project)}
      ${renderRiskPanel(project)}
      ${renderDocumentPanel(project)}
    </div>
    <div class="split-grid">
      <section class="panel">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Sprint</p>
            <h3>Current sprint</h3>
          </div>
          <button class="secondary-btn" data-action="add-sprint" data-id="${project.id}">
            <i class="fa-solid fa-plus"></i>
            Sprint
          </button>
        </div>
        ${renderSprints(project)}
      </section>
      <section class="panel">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Activity</p>
            <h3>Latest changes</h3>
          </div>
        </div>
        <div class="activity-list">${renderActivityList(project.activity, 6)}</div>
      </section>
    </div>
  `;
}

function renderProjectBoard(project) {
  const assignees = projectMembers(project);
  return `
    <div class="toolbar">
      <label class="search-field">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input id="task-search" type="search" placeholder="Search board tasks" value="${escapeAttribute(state.filters.taskSearch)}" />
      </label>
      <select id="task-priority-filter" aria-label="Filter by priority">
        <option value="all">All priorities</option>
        ${PRIORITIES.map((priority) => `<option ${state.filters.taskPriority === priority ? "selected" : ""}>${priority}</option>`).join("")}
      </select>
      <select id="task-assignee-filter" aria-label="Filter by assignee">
        <option value="all">All assignees</option>
        ${assignees.map((name) => `<option value="${escapeAttribute(name)}" ${state.filters.taskAssignee === name ? "selected" : ""}>${escapeHtml(name)}</option>`).join("")}
      </select>
      <button class="secondary-btn" onclick="openModal('column-modal')">
        <i class="fa-solid fa-layer-group"></i>
        Column
      </button>
    </div>
    <div class="board-columns" id="board-columns"></div>
  `;
}

function renderBoardColumnsOnly() {
  const project = currentProject();
  const board = $("#board-columns");
  if (!project || !board) return;
  board.innerHTML = project.columns.map(renderColumn).join("");
  bindBoardEvents();
}

function renderColumn(column) {
  const project = currentProject();
  const tasks = getFilteredTasks(column.tasks, project.id);
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
        ${tasks.length ? tasks.map((task) => renderTaskCard(task, project.id)).join("") : '<div class="empty-state">Drop work here.</div>'}
      </div>
      <button class="add-task-btn" data-column-id="${column.id}">
        <i class="fa-solid fa-plus"></i>
        Add Task
      </button>
    </section>
  `;
}

function bindBoardEvents() {
  $$(".add-task-btn").forEach((button) => {
    button.addEventListener("click", () =>
      openTaskModal(null, button.dataset.columnId),
    );
  });

  $$(".task-card").forEach((card) => {
    card.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", card.dataset.taskId);
    });
  });

  $$(".task-list").forEach((list) => {
    list.addEventListener("dragover", (event) => {
      event.preventDefault();
      list.classList.add("drag-over");
    });
    list.addEventListener("dragleave", () => list.classList.remove("drag-over"));
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

function renderTaskCard(task, projectId) {
  const progress = getSubtaskProgress(task);
  const dueLabel = task.dueDate ? formatDate(task.dueDate) : "No due";
  return `
    <article class="task-card" draggable="true" data-task-id="${task.id}" data-open-task="${task.id}">
      <div class="task-meta">
        <span class="badge ${priorityColor(task.priority)}">${escapeHtml(task.priority)}</span>
        <span class="badge ${isOverdue(task.dueDate) && task.status !== "Done" ? "red" : "gray"}">
          <i class="fa-solid fa-calendar"></i>${dueLabel}
        </span>
      </div>
      <h4>${escapeHtml(task.title)}</h4>
      <p>${escapeHtml(task.description || "No description")}</p>
      <div class="label-row">
        ${safeList(task.labels).slice(0, 3).map((label) => `<span class="badge gray">${escapeHtml(label)}</span>`).join("")}
      </div>
      ${task.dependency ? `<span class="badge orange"><i class="fa-solid fa-link"></i>${escapeHtml(task.dependency)}</span>` : ""}
      <div class="progress-track" aria-label="${progress.percent}% subtasks complete">
        <div class="progress-fill" style="width: ${progress.percent}%"></div>
      </div>
      <div class="task-footer">
        <span class="avatar" title="${escapeAttribute(task.assignee)}">${initials(task.assignee)}</span>
        <span class="badge gray"><i class="fa-solid fa-square-check"></i>${progress.done}/${progress.total}</span>
      </div>
      <input type="hidden" value="${projectId}" />
    </article>
  `;
}

function renderProjectList(project) {
  return `
    <div class="toolbar">
      <label class="search-field">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input id="task-search" type="search" placeholder="Search tasks" value="${escapeAttribute(state.filters.taskSearch)}" />
      </label>
      <button class="primary-btn" data-action="create-task">
        <i class="fa-solid fa-plus"></i>
        Task
      </button>
      <button class="secondary-btn" data-action="bulk-done">
        <i class="fa-solid fa-check-double"></i>
        Mark done
      </button>
      <button class="secondary-btn" data-action="bulk-assign-me">
        <i class="fa-solid fa-user-check"></i>
        Assign me
      </button>
    </div>
    <div id="task-table"></div>
  `;
}

function renderTasks() {
  const projects = workspaceProjects();
  const assignees = getWorkload(projects).map((member) => member.name);
  els.tasksView.innerHTML = `
    <div class="toolbar">
      <label class="search-field">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input id="task-search" type="search" placeholder="Search tasks" value="${escapeAttribute(state.filters.taskSearch)}" />
      </label>
      <select id="task-status-filter">
        <option value="all">All statuses</option>
        ${TASK_STATUSES.map((status) => `<option ${state.filters.taskStatus === status ? "selected" : ""}>${status}</option>`).join("")}
      </select>
      <select id="task-priority-filter">
        <option value="all">All priorities</option>
        ${PRIORITIES.map((priority) => `<option ${state.filters.taskPriority === priority ? "selected" : ""}>${priority}</option>`).join("")}
      </select>
      <select id="task-project-filter">
        <option value="all">All projects</option>
        ${projects.map((project) => `<option value="${project.id}" ${state.filters.projectId === project.id ? "selected" : ""}>${escapeHtml(project.name)}</option>`).join("")}
      </select>
      <select id="task-assignee-filter">
        <option value="all">All assignees</option>
        ${assignees.map((name) => `<option value="${escapeAttribute(name)}" ${state.filters.taskAssignee === name ? "selected" : ""}>${escapeHtml(name)}</option>`).join("")}
      </select>
      <button class="primary-btn" data-action="create-task">
        <i class="fa-solid fa-plus"></i>
        Task
      </button>
    </div>
    <div id="task-table"></div>
  `;
  renderTaskTableOnly();
}

function renderMyWork() {
  const query = state.filters.taskSearch;
  const myTasks = assignedToMe().filter((task) =>
    [task.title, task.description, task.status, task.priority, task.sprint, task.milestone, ...safeList(task.labels)]
      .join(" ")
      .toLowerCase()
      .includes(query),
  );
  const dueToday = myTasks.filter((task) => task.dueDate === todayIso());
  const overdue = myTasks.filter((task) => isOverdue(task.dueDate) && task.status !== "Done");
  els.myworkView.innerHTML = `
    <div class="stats-grid">
      ${renderStats({
        projects: new Set(myTasks.map((task) => task.projectId)).size,
        active: myTasks.filter((task) => task.status !== "Done").length,
        tasks: myTasks.length,
        overdue: overdue.length,
        doneTasks: myTasks.filter((task) => task.status === "Done").length,
        completionRate: completionRate(myTasks),
        tracked: sum(myTasks, "tracked"),
        estimate: sum(myTasks, "estimate"),
      })}
    </div>
    <div class="split-grid">
      <section class="panel">
        <div class="section-heading">
          <div>
            <p class="eyebrow">My queue</p>
            <h3>Assigned work</h3>
          </div>
          <button class="primary-btn" data-action="create-task">
            <i class="fa-solid fa-plus"></i>
            Task
          </button>
        </div>
        ${renderTaskTable(myTasks)}
      </section>
      <aside class="stack">
        <section class="panel">
          <p class="eyebrow">Today</p>
          <div class="activity-list">
            ${dueToday.length ? dueToday.map(renderCompactTask).join("") : renderEmpty("No tasks due today.")}
          </div>
        </section>
        <section class="panel">
          <p class="eyebrow">Overdue</p>
          <div class="activity-list">
            ${overdue.length ? overdue.map(renderCompactTask).join("") : renderEmpty("No overdue tasks assigned to you.")}
          </div>
        </section>
      </aside>
    </div>
  `;
}

function renderTaskTableOnly() {
  const table = $("#task-table");
  if (!table) return;
  const project = state.view === "project" ? currentProject() : null;
  const tasks = project
    ? getFilteredTasks(getProjectTasks(project), project.id)
    : filteredWorkspaceTasks();
  table.innerHTML = renderTaskTable(tasks);
}

function renderTaskTable(tasks) {
  if (!tasks.length) return renderEmpty("No tasks match the current view.");
  return `
    <div class="data-table">
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" aria-label="Select all tasks" onclick="toggleAllTaskSelection(this.checked)" /></th>
            <th>Task</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assignee</th>
            <th>Due Date</th>
            <th>Project</th>
            <th>Sprint</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          ${tasks.map(renderTaskRow).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderTaskRow(task) {
  const project = projectById(task.projectId);
  const progress = getSubtaskProgress(task);
  return `
    <tr class="clickable-row">
      <td><input class="task-select" data-task-select="${task.id}" type="checkbox" aria-label="Select ${escapeAttribute(task.title)}" /></td>
      <td data-open-task="${task.id}">
        <strong>${escapeHtml(task.title)}</strong>
        <small>${escapeHtml(task.description || "No description")}</small>
      </td>
      <td>
        <select data-inline-status="${task.id}">
          ${TASK_STATUSES.map((status) => `<option ${task.status === status ? "selected" : ""}>${status}</option>`).join("")}
        </select>
      </td>
      <td>
        <select data-inline-priority="${task.id}">
          ${PRIORITIES.map((priority) => `<option ${task.priority === priority ? "selected" : ""}>${priority}</option>`).join("")}
        </select>
      </td>
      <td>
        <select data-inline-assignee="${task.id}">
          ${projectMembers(project).map((name) => `<option value="${escapeAttribute(name)}" ${task.assignee === name ? "selected" : ""}>${escapeHtml(name)}</option>`).join("")}
        </select>
      </td>
      <td>${task.dueDate ? formatDate(task.dueDate) : "No due date"}</td>
      <td>${escapeHtml(project?.name || "No project")}</td>
      <td>${escapeHtml(task.sprint || "Backlog")}</td>
      <td>
        <span>${progress.done}/${progress.total}</span>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${progress.percent}%"></div>
        </div>
      </td>
    </tr>
  `;
}

function renderInbox() {
  const notifications = workspaceNotifications();
  els.inboxView.innerHTML = `
    <section class="panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Notification center</p>
          <h3>${notifications.filter((item) => !item.read).length} unread updates</h3>
        </div>
        <button class="secondary-btn" data-action="mark-all-read">
          <i class="fa-solid fa-check-double"></i>
          Mark all read
        </button>
      </div>
      <div class="notification-list">
        ${notifications.length ? notifications.map(renderNotification).join("") : renderEmpty("No notifications.")}
      </div>
    </section>
  `;
}

function renderNotification(item) {
  return `
    <article class="notification-item ${item.read ? "" : "unread"}">
      <div class="section-heading">
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <p>${escapeHtml(item.message)}</p>
          <span>${formatDateTime(item.at)}</span>
        </div>
        <div class="toolbar-actions">
          <button class="ghost-btn icon-btn" data-action="mark-notification-read" data-id="${item.id}" aria-label="Mark read">
            <i class="fa-solid fa-check"></i>
          </button>
          <button class="ghost-btn icon-btn" data-action="delete-notification" data-id="${item.id}" aria-label="Delete notification">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderTeams() {
  const projects = workspaceProjects();
  const workload = getWorkload(projects);
  const teams = workspaceTeams();
  els.teamsView.innerHTML = `
    <div class="split-grid">
      <section class="panel">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Workload</p>
            <h3>Capacity and assignments</h3>
          </div>
        </div>
        <div class="workload-grid">
          ${workload.map(renderMemberCard).join("")}
        </div>
      </section>
      <section class="panel">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Teams</p>
            <h3>Roles and ownership</h3>
          </div>
        </div>
        <div class="activity-list">
          ${teams.map(renderTeamCard).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderMemberCard(member) {
  const status =
    member.hours > member.capacity
      ? ["Overloaded", "red"]
      : member.hours < member.capacity * 0.45
        ? ["Underutilized", "orange"]
        : ["Balanced", "green"];
  const width = member.capacity
    ? Math.min(100, Math.round((member.hours / member.capacity) * 100))
    : 0;
  return `
    <article class="member-card">
      <div class="member-header">
        <span class="avatar">${initials(member.name)}</span>
        <div>
          <strong>${escapeHtml(member.name)}</strong>
          <p>${escapeHtml(member.role || "Member")}</p>
        </div>
      </div>
      <span class="badge ${status[1]}">${status[0]}</span>
      <div class="progress-track">
        <div class="progress-fill" style="width: ${width}%"></div>
      </div>
      <small>${member.tasks} tasks | ${member.hours}h assigned | ${member.capacity}h capacity</small>
    </article>
  `;
}

function renderTeamCard(team) {
  return `
    <article class="activity-item">
      <strong>${escapeHtml(team.name)}</strong>
      <p>${escapeHtml(team.description || "Delivery team")}</p>
      <span>Lead: ${escapeHtml(team.lead)} | ${safeList(team.members).length} members</span>
      <div class="badge-row">
        ${safeList(team.members).slice(0, 6).map((member) => `<span class="badge gray">${escapeHtml(member.name)} - ${escapeHtml(member.role)}</span>`).join("")}
      </div>
    </article>
  `;
}

function renderCalendar() {
  els.calendarView.innerHTML = `
    <section class="panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">${capitalize(state.calendarMode)} view</p>
          <h3>Deadlines and milestones</h3>
        </div>
        <div class="view-tabs">
          ${["month", "week", "day"].map((mode) => `
            <button class="${state.calendarMode === mode ? "active" : ""}" data-action="set-calendar-mode" data-mode="${mode}">
              ${capitalize(mode)}
            </button>
          `).join("")}
        </div>
      </div>
      ${renderCalendarGrid(workspaceProjects())}
    </section>
  `;
}

function renderProjectCalendar(project) {
  return `
    <section class="panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Project calendar</p>
          <h3>Tasks, deadlines, milestones</h3>
        </div>
        <button class="primary-btn" data-action="create-task">
          <i class="fa-solid fa-plus"></i>
          Task
        </button>
      </div>
      ${renderCalendarGrid([project])}
    </section>
  `;
}

function renderCalendarGrid(projects) {
  const span = { month: 35, week: 7, day: 1 }[state.calendarMode] || 35;
  const offset = state.calendarMode === "month" ? -7 : 0;
  const days = Array.from({ length: span }, (_, index) => nextDate(index + offset));
  const items = [
    ...allWorkspaceTasks(projects).map((task) => ({
      date: task.dueDate,
      title: task.title,
      id: task.id,
      type: "task",
    })),
    ...projects.flatMap((project) =>
      safeList(project.milestones).map((milestone) => ({
        date: milestone.date,
        title: `${project.name}: ${milestone.name}`,
        type: "milestone",
      })),
    ),
  ];

  return `
    <div class="calendar-grid">
      ${days
        .map((date) => {
          const dayItems = items.filter((item) => item.date === date);
          return `
            <div class="calendar-cell">
              <strong>${formatShortDate(date)}</strong>
              ${dayItems
                .map((item) =>
                  item.type === "task"
                    ? `<button class="calendar-item" data-open-task="${item.id}">${escapeHtml(item.title)}</button>`
                    : `<span class="calendar-item milestone">${escapeHtml(item.title)}</span>`,
                )
                .join("")}
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderRoadmap() {
  els.roadmapView.innerHTML = `
    <section class="panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Roadmap</p>
          <h3>Initiatives, projects, milestones, releases</h3>
        </div>
      </div>
      ${renderRoadmapTrack(workspaceProjects())}
    </section>
  `;
}

function renderProjectTimeline(project) {
  return `
    <section class="panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Timeline</p>
          <h3>Schedule, dependencies, duration</h3>
        </div>
      </div>
      ${renderRoadmapTrack([project])}
      <div class="data-table">${renderDependencyTable(project)}</div>
    </section>
  `;
}

function renderRoadmapTrack(projects) {
  if (!projects.length) return renderEmpty("No projects available for the roadmap.");
  return `
    <div class="roadmap-track">
      ${projects
        .map((project) => {
          const stats = getProjectStats(project);
          const width = Math.max(18, stats.progress || 22);
          return `
            <div class="roadmap-row">
              <div>
                <strong>${escapeHtml(project.name)}</strong>
                <p>${formatShortDate(project.startDate)} - ${formatShortDate(project.dueDate)}</p>
              </div>
              <div class="roadmap-bar-wrap">
                <div class="roadmap-bar" style="--width: ${width}%">${stats.progress}%</div>
              </div>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderGoals() {
  const goals = workspaceGoals();
  els.goalsView.innerHTML = `
    <section class="panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">OKRs</p>
          <h3>Objectives and key results</h3>
        </div>
        <button class="primary-btn" data-action="create-goal">
          <i class="fa-solid fa-plus"></i>
          Goal
        </button>
      </div>
      <div class="goal-list">
        ${goals.length ? goals.map(renderGoal).join("") : renderEmpty("No goals yet. Create one to connect projects to outcomes.")}
      </div>
    </section>
  `;
}

function renderGoal(goal) {
  return `
    <article class="goal-item">
      <div class="section-heading">
        <div>
          <strong>${escapeHtml(goal.title)}</strong>
          <p>${escapeHtml(goal.description)}</p>
        </div>
        <button class="ghost-btn icon-btn" data-action="delete-goal" data-id="${goal.id}" aria-label="Delete goal">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style="width: ${goal.progress}%"></div>
      </div>
      <div class="badge-row">
        <span class="badge blue">${escapeHtml(goal.owner)}</span>
        <span class="badge green">${goal.progress}%</span>
        <span class="badge gray">Target: ${escapeHtml(goal.target)}</span>
        <span class="badge gray">Due ${formatDate(goal.deadline)}</span>
      </div>
    </article>
  `;
}

function renderReports() {
  const projects = workspaceProjects();
  const stats = getWorkspaceStats(projects);
  els.reportsView.innerHTML = `
    <div class="stats-grid">
      ${renderStats(stats)}
    </div>
    <div class="analytics-grid">
      ${renderAnalyticsPanels(projects)}
    </div>
    <div class="split-grid">
      <section class="panel">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Trends</p>
            <h3>Status distribution</h3>
          </div>
        </div>
        ${renderStatusChart(allWorkspaceTasks(projects))}
      </section>
      <section class="panel">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Activity history</p>
            <h3>Recent events</h3>
          </div>
        </div>
        <div class="activity-list">${renderActivityList(workspaceActivity(), 12)}</div>
      </section>
    </div>
    <section class="panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Automation builder</p>
          <h3>When condition then action</h3>
        </div>
      </div>
      ${renderAutomations()}
    </section>
  `;
}

function renderProjectReports(project) {
  const stats = getProjectStats(project);
  return `
    <div class="analytics-grid">
      ${renderInsightCard("Completion", `${stats.progress}%`, "Calculated from tasks in the Done column.", "fa-chart-simple")}
      ${renderInsightCard("Time variance", `${stats.tracked}h / ${stats.estimate}h`, "Estimated versus actual tracked task effort.", "fa-stopwatch")}
      ${renderInsightCard("Overdue", stats.overdue, "Tasks past due and not completed.", "fa-triangle-exclamation")}
    </div>
    <section class="panel">
      <p class="eyebrow">Project task status</p>
      ${renderStatusChart(getProjectTasks(project))}
    </section>
  `;
}

function renderAnalyticsPanels(projects) {
  const stats = getWorkspaceStats(projects);
  return `
    ${renderAnalyticsCard("Performance", `${stats.averageProgress}% average completion`, `${stats.doneTasks} completed tasks across ${stats.projects} projects.`, stats.averageProgress, "fa-chart-line")}
    ${renderAnalyticsCard("Financials", `${stats.budgetUsed}% budget consumed`, `${currency(stats.budgetSpent)} spent from ${currency(stats.budgetTotal)} planned.`, stats.budgetUsed, "fa-wallet")}
    ${renderAnalyticsCard("Time tracking", `${stats.tracked} hours logged`, `${stats.estimate} estimated hours across active work.`, stats.estimate ? Math.min(100, Math.round((stats.tracked / stats.estimate) * 100)) : 0, "fa-stopwatch")}
  `;
}

function renderAnalyticsCard(eyebrow, title, text, value, icon) {
  return `
    <article class="analytics-panel panel">
      <div class="panel-heading">
        <span><i class="fa-solid ${icon}"></i></span>
        <div>
          <p class="eyebrow">${escapeHtml(eyebrow)}</p>
          <h3>${escapeHtml(title)}</h3>
        </div>
      </div>
      ${renderMeter(value)}
      <p>${escapeHtml(text)}</p>
    </article>
  `;
}

function renderDocuments() {
  const documents = workspaceDocuments();
  els.documentsView.innerHTML = `
    <section class="panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Knowledge base</p>
          <h3>Project documents and notes</h3>
        </div>
        <button class="primary-btn" data-action="create-document">
          <i class="fa-solid fa-plus"></i>
          Document
        </button>
      </div>
      <div class="document-list">
        ${documents.length ? documents.map(renderDocumentItem).join("") : renderEmpty("No documents yet.")}
      </div>
    </section>
  `;
}

function renderProjectDocuments(project) {
  const documents = workspaceDocuments().filter((document) => document.projectId === project.id);
  return `
    <section class="panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Documents</p>
          <h3>Notes, specs, decisions</h3>
        </div>
        <button class="primary-btn" data-action="add-document-to-project" data-id="${project.id}">
          <i class="fa-solid fa-plus"></i>
          Document
        </button>
      </div>
      <div class="document-list">
        ${documents.length ? documents.map(renderDocumentItem).join("") : renderEmpty("No documents attached to this project.")}
      </div>
    </section>
  `;
}

function renderDocumentItem(document) {
  const project = projectById(document.projectId);
  return `
    <article class="doc-item">
      <i class="fa-solid fa-file-lines"></i>
      <div>
        <strong>${escapeHtml(document.title)}</strong>
        <p>${escapeHtml(document.content.slice(0, 150))}</p>
        <span>${escapeHtml(project?.name || "Workspace")} | Updated ${formatDateTime(document.updatedAt)}</span>
      </div>
      <button class="ghost-btn icon-btn" data-action="delete-document" data-id="${document.id}" aria-label="Delete document">
        <i class="fa-solid fa-trash"></i>
      </button>
    </article>
  `;
}

function renderFiles() {
  const files = workspaceFiles();
  els.filesView.innerHTML = `
    <section class="panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">File storage</p>
          <h3>Project file records</h3>
        </div>
        <button class="primary-btn" data-action="create-file">
          <i class="fa-solid fa-plus"></i>
          File
        </button>
      </div>
      <div class="file-list">
        ${files.length ? files.map(renderFileItem).join("") : renderEmpty("No file records yet.")}
      </div>
    </section>
  `;
}

function renderProjectFiles(project) {
  const files = workspaceFiles().filter((file) => file.projectId === project.id);
  return `
    <section class="panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Files</p>
          <h3>Assets and attachments</h3>
        </div>
        <button class="primary-btn" data-action="add-file-to-project" data-id="${project.id}">
          <i class="fa-solid fa-plus"></i>
          File
        </button>
      </div>
      <div class="file-list">
        ${files.length ? files.map(renderFileItem).join("") : renderEmpty("No files attached to this project.")}
      </div>
    </section>
  `;
}

function renderFileItem(file) {
  const project = projectById(file.projectId);
  return `
    <article class="file-item">
      <i class="fa-solid ${fileIcon(file.type)}"></i>
      <div>
        <strong>${escapeHtml(file.name)}</strong>
        <p>${escapeHtml(project?.name || "Workspace")} | ${escapeHtml(file.type)} | ${escapeHtml(file.size)}</p>
        <span>Uploaded by ${escapeHtml(file.owner)} on ${formatDate(file.uploadedAt)}</span>
      </div>
      <button class="ghost-btn icon-btn" data-action="delete-file" data-id="${file.id}" aria-label="Delete file">
        <i class="fa-solid fa-trash"></i>
      </button>
    </article>
  `;
}

function renderSettings() {
  const workspace = currentWorkspace();
  els.settingsView.innerHTML = `
    <div class="settings-grid">
      <section class="panel">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Account</p>
            <h3>Profile</h3>
          </div>
        </div>
        <label>Name <input id="settings-name" value="${escapeAttribute(state.currentUser.name)}" /></label>
        <label>Email <input id="settings-email" value="${escapeAttribute(state.currentUser.email)}" /></label>
        <label>Role <input id="settings-role" value="${escapeAttribute(state.currentUser.role || "Member")}" /></label>
      </section>
      <section class="panel">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Workspace</p>
            <h3>Preferences</h3>
          </div>
        </div>
        <label>Workspace name <input id="settings-workspace-name" value="${escapeAttribute(workspace.name)}" /></label>
        <label>
          Default task view
          <select id="settings-default-task-view">
            ${["Board", "List", "Calendar"].map((view) => `<option ${workspace.settings.defaultTaskView === view ? "selected" : ""}>${view}</option>`).join("")}
          </select>
        </label>
        <label>
          Theme preference
          <select id="settings-theme">
            ${["Light", "Dark", "System"].map((theme) => `<option ${workspace.settings.theme === theme ? "selected" : ""}>${theme}</option>`).join("")}
          </select>
        </label>
      </section>
      <section class="panel">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Notifications</p>
            <h3>Delivery rules</h3>
          </div>
        </div>
        <label><input type="checkbox" id="settings-mentions" ${workspace.settings.mentions ? "checked" : ""} /> Mentions</label>
        <label><input type="checkbox" id="settings-deadlines" ${workspace.settings.deadlines ? "checked" : ""} /> Deadline alerts</label>
        <label><input type="checkbox" id="settings-comments" ${workspace.settings.comments ? "checked" : ""} /> Comment updates</label>
      </section>
      <section class="panel">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Maintenance</p>
            <h3>Workspace data</h3>
          </div>
        </div>
        <button class="primary-btn" data-action="save-settings">
          <i class="fa-solid fa-floppy-disk"></i>
          Save settings
        </button>
        <button class="secondary-btn" data-action="export-data">
          <i class="fa-solid fa-download"></i>
          Export JSON
        </button>
        <button class="danger-btn" data-action="reset-demo">
          <i class="fa-solid fa-rotate-left"></i>
          Reset demo
        </button>
      </section>
    </div>
  `;
}

function renderProjectMilestones(project) {
  return `
    <section class="panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Milestones</p>
          <h3>Phase checkpoints</h3>
        </div>
        <button class="primary-btn" data-action="add-milestone" data-id="${project.id}">
          <i class="fa-solid fa-plus"></i>
          Milestone
        </button>
      </div>
      <div class="timeline-strip">
        ${safeList(project.milestones).map(renderMilestone).join("") || renderEmpty("No milestones yet.")}
      </div>
    </section>
  `;
}

function renderMilestone(milestone) {
  return `
    <article class="timeline-node ${milestone.done ? "done" : ""}">
      <span>${formatDate(milestone.date)} | ${escapeHtml(milestone.status || (milestone.done ? "Completed" : "Planned"))}</span>
      <strong>${escapeHtml(milestone.name)}</strong>
      <p>${escapeHtml(milestone.description || "Project checkpoint")}</p>
      ${renderMeter(Number(milestone.progress ?? (milestone.done ? 100 : 40)))}
    </article>
  `;
}

function renderProjectActivity(project) {
  return `
    <section class="panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Audit log</p>
          <h3>Project activity history</h3>
        </div>
      </div>
      <div class="activity-list">${renderActivityList(project.activity, 30)}</div>
    </section>
  `;
}

function renderPlanningPanel(project) {
  return `
    <section class="panel">
      <div class="panel-heading">
        <span><i class="fa-solid fa-timeline"></i></span>
        <div>
          <p class="eyebrow">Planning</p>
          <h3>Timeline</h3>
        </div>
      </div>
      <div class="timeline-strip">
        ${safeList(project.milestones).slice(0, 4).map(renderMilestone).join("") || renderEmpty("No milestones yet.")}
      </div>
    </section>
  `;
}

function renderResourcePanel(project) {
  const stats = getProjectStats(project);
  const budgetUsed = project.budget?.total
    ? Math.round((Number(project.budget.spent || 0) / Number(project.budget.total)) * 100)
    : 0;
  return `
    <section class="panel">
      <div class="panel-heading">
        <span><i class="fa-solid fa-users-gear"></i></span>
        <div>
          <p class="eyebrow">Resources</p>
          <h3>Team and budget</h3>
        </div>
      </div>
      <label>Time <strong>${stats.tracked}h / ${stats.estimate}h</strong></label>
      ${renderMeter(stats.estimate ? Math.min(100, Math.round((stats.tracked / stats.estimate) * 100)) : 0)}
      <label>Budget <strong>${currency(project.budget?.spent || 0)} / ${currency(project.budget?.total || 0)}</strong></label>
      ${renderMeter(budgetUsed)}
      <div class="chip-row">${projectMembers(project).map((name) => `<span class="chip">${escapeHtml(name)}</span>`).join("")}</div>
    </section>
  `;
}

function renderRiskPanel(project) {
  return `
    <section class="panel">
      <div class="panel-heading">
        <span><i class="fa-solid fa-shield-halved"></i></span>
        <div>
          <p class="eyebrow">Risks</p>
          <h3>Risk register</h3>
        </div>
      </div>
      <div class="risk-list">
        ${safeList(project.risks).slice(0, 4).map(renderRisk).join("") || renderEmpty("No risks recorded.")}
      </div>
      <button class="add-inline-btn" data-action="add-risk" data-id="${project.id}">
        <i class="fa-solid fa-plus"></i>
        Add risk
      </button>
    </section>
  `;
}

function renderRisk(risk) {
  return `
    <article class="risk-item">
      <div class="badge-row">
        <span class="badge ${risk.level === "High" ? "red" : risk.level === "Medium" ? "orange" : "green"}">${escapeHtml(risk.level)}</span>
        <span class="badge gray">${escapeHtml(risk.owner || "Unassigned")}</span>
      </div>
      <strong>${escapeHtml(risk.title)}</strong>
      <p>${escapeHtml(risk.mitigation)}</p>
    </article>
  `;
}

function renderDocumentPanel(project) {
  const docs = workspaceDocuments().filter((document) => document.projectId === project.id);
  const files = workspaceFiles().filter((file) => file.projectId === project.id);
  return `
    <section class="panel">
      <div class="panel-heading">
        <span><i class="fa-solid fa-folder-tree"></i></span>
        <div>
          <p class="eyebrow">Docs & files</p>
          <h3>Knowledge</h3>
        </div>
      </div>
      <div class="badge-row">
        <span class="badge blue">${docs.length} docs</span>
        <span class="badge green">${files.length} files</span>
        <span class="badge gray">${safeList(project.alerts).length} alerts</span>
      </div>
      <div class="activity-list">
        ${docs.slice(0, 2).map((doc) => `<div class="activity-item"><strong>${escapeHtml(doc.title)}</strong><span>${formatDateTime(doc.updatedAt)}</span></div>`).join("") || renderEmpty("No documents attached.")}
      </div>
    </section>
  `;
}

function renderSprints(project) {
  if (!safeList(project.sprints).length) return renderEmpty("No sprints yet.");
  return safeList(project.sprints)
    .map((sprint) => {
      const tasks = getProjectTasks(project).filter((task) => task.sprint === sprint.name);
      const done = tasks.filter((task) => task.status === "Done").length;
      const progress = tasks.length ? Math.round((done / tasks.length) * 100) : sprint.progress || 0;
      return `
        <article class="activity-item">
          <div class="section-heading">
            <div>
              <strong>${escapeHtml(sprint.name)}</strong>
              <p>${escapeHtml(sprint.goal)}</p>
            </div>
            <span class="badge ${sprint.status === "Active" ? "blue" : "gray"}">${escapeHtml(sprint.status)}</span>
          </div>
          ${renderMeter(progress)}
          <span>${formatShortDate(sprint.startDate)} - ${formatShortDate(sprint.endDate)} | ${done}/${tasks.length} tasks done</span>
        </article>
      `;
    })
    .join("");
}

function renderDependencyTable(project) {
  const tasks = getProjectTasks(project).filter((task) => task.dependency);
  if (!tasks.length) return renderEmpty("No task dependencies recorded.");
  return `
    <table>
      <thead>
        <tr>
          <th>Task</th>
          <th>Dependency</th>
          <th>Status</th>
          <th>Risk</th>
        </tr>
      </thead>
      <tbody>
        ${tasks
          .map(
            (task) => `
              <tr>
                <td>${escapeHtml(task.title)}</td>
                <td>${escapeHtml(task.dependency)}</td>
                <td>${escapeHtml(task.status)}</td>
                <td><span class="badge ${task.status === "Blocked" ? "red" : "orange"}">${task.status === "Blocked" ? "Blocked" : "Watch"}</span></td>
              </tr>
            `,
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderStatusChart(tasks) {
  const max = Math.max(1, ...TASK_STATUSES.map((status) => tasks.filter((task) => task.status === status).length));
  return `
    <div class="chart-bars">
      ${TASK_STATUSES
        .map((status) => {
          const count = tasks.filter((task) => task.status === status).length;
          return `
            <div class="chart-row">
              <span>${status}</span>
              <div class="chart-bar"><span style="--value: ${Math.round((count / max) * 100)}%"></span></div>
              <strong>${count}</strong>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderAutomations() {
  const automations = workspaceAutomations();
  return `
    <div class="feature-grid">
      ${automations
        .map(
          (automation) => `
            <article class="feature-card">
              <span><i class="fa-solid fa-wand-magic-sparkles"></i></span>
              <h4>When ${escapeHtml(automation.when)}</h4>
              <p>If ${escapeHtml(automation.condition)}, then ${escapeHtml(automation.action)}.</p>
              <span class="badge ${automation.enabled ? "green" : "gray"}">${automation.enabled ? "Enabled" : "Paused"}</span>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderModuleCard([title, icon, view]) {
  const stats = getWorkspaceStats(workspaceProjects());
  const signals = {
    Projects: `${stats.projects} projects`,
    "My Work": `${assignedToMe().length} assigned`,
    Inbox: `${workspaceNotifications().filter((item) => !item.read).length} unread`,
    Tasks: `${stats.tasks} tasks`,
    Teams: `${stats.members} members`,
    Calendar: `${stats.overdue} overdue`,
    Roadmap: `${stats.milestones} milestones`,
    Goals: `${workspaceGoals().length} goals`,
    Reports: `${stats.averageProgress}% average`,
    Documents: `${workspaceDocuments().length} docs`,
    Files: `${workspaceFiles().length} files`,
    Settings: "Ready",
  };
  return `
    <article class="module-card" data-action="open-view" data-view="${view}">
      <span class="module-icon"><i class="fa-solid ${icon}"></i></span>
      <div>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(signals[title])}</p>
      </div>
      <strong>Open</strong>
    </article>
  `;
}

function renderStats(stats) {
  const cards = [
    ["Total projects", stats.projects || 0, "Portfolio scope"],
    ["Active projects", stats.active || 0, "Currently moving"],
    ["Open tasks", stats.tasks || 0, "Tracked delivery work"],
    ["Overdue", stats.overdue || 0, "Need attention"],
  ];
  return cards
    .map(
      ([label, value, hint]) => `
        <article class="stat-card">
          <span>${label}</span>
          <strong>${value}</strong>
          <small>${hint}</small>
        </article>
      `,
    )
    .join("");
}

function renderInsightCard(title, value, text, icon) {
  return `
    <article class="insight-card">
      <span><i class="fa-solid ${icon}"></i></span>
      <h4>${escapeHtml(title)}</h4>
      <strong>${escapeHtml(value)}</strong>
      <p>${escapeHtml(text)}</p>
    </article>
  `;
}

function renderSummary(label, value, color = "gray") {
  return `
    <article class="summary-item ${color === "red" ? "danger-card" : color === "orange" ? "risk-card" : color === "green" ? "health-card" : ""}">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </article>
  `;
}

function renderMeter(value) {
  const width = Math.max(0, Math.min(100, Number(value || 0)));
  return `
    <div class="progress-track">
      <div class="progress-fill" style="width: ${width}%"></div>
    </div>
  `;
}

function renderEmpty(text) {
  return `<div class="empty-state">${escapeHtml(text)}</div>`;
}

function renderCompactTask(task) {
  return `
    <button class="command-result" data-open-task="${task.id}">
      <strong>${escapeHtml(task.title)}</strong>
      <small>${escapeHtml(projectById(task.projectId)?.name || "Project")} | ${escapeHtml(task.status)} | ${task.dueDate ? formatDate(task.dueDate) : "No due date"}</small>
    </button>
  `;
}

function renderUpcomingMilestones(projects) {
  const milestones = projects
    .flatMap((project) =>
      safeList(project.milestones).map((milestone) => ({
        ...milestone,
        projectName: project.name,
      })),
    )
    .filter((milestone) => !milestone.done)
    .sort((a, b) => String(a.date).localeCompare(String(b.date)))
    .slice(0, 6);
  return milestones.length
    ? milestones
        .map(
          (milestone) => `
            <article class="timeline-node">
              <span>${formatDate(milestone.date)} | ${escapeHtml(milestone.projectName)}</span>
              <strong>${escapeHtml(milestone.name)}</strong>
            </article>
          `,
        )
        .join("")
    : renderEmpty("No upcoming milestones.");
}

function renderActivityList(activity, limit = 10) {
  const items = safeList(activity).slice(0, limit);
  if (!items.length) return renderEmpty("No activity recorded yet.");
  return items
    .map(
      (item) => `
        <article class="activity-item">
          <strong>${escapeHtml(item.message || item.action)}</strong>
          <span>${formatDateTime(item.at)}</span>
        </article>
      `,
    )
    .join("");
}

function openProjectModal(project = null) {
  state.editingProjectId = project?.id || null;
  els.projectModalTitle.textContent = project ? "Edit Project" : "Create Project";
  els.projectName.value = project?.name || "";
  els.projectOwner.value = project?.owner || state.currentUser.name;
  els.projectDescriptionInput.value = project?.description || "";
  els.projectStatus.value = project?.status || "Planning";
  els.projectPriority.value = project?.priority || "Medium";
  els.projectBudget.value = project?.budget?.total || 50000;
  els.projectStartDate.value = project?.startDate || todayIso();
  els.projectDueDate.value = project?.dueDate || nextDate(30);
  els.projectMembers.value = projectMembers(project).join(", ");
  els.projectTags.value = safeList(project?.tags).join(", ");
  openModal("project-modal");
  els.projectName.focus();
}

function saveProject(event) {
  event.preventDefault();
  const name = els.projectName.value.trim();
  if (!name) return;
  const workspaceId = state.activeWorkspaceId;
  const payload = {
    name,
    description: els.projectDescriptionInput.value.trim(),
    owner: els.projectOwner.value.trim() || state.currentUser.name,
    status: els.projectStatus.value,
    priority: els.projectPriority.value,
    startDate: els.projectStartDate.value,
    dueDate: els.projectDueDate.value,
    members: normalizeList(els.projectMembers.value, state.currentUser.name),
    tags: normalizeList(els.projectTags.value),
    budget: {
      total: Number(els.projectBudget.value || 0),
      spent: state.editingProjectId
        ? currentProject()?.budget?.spent || 0
        : Math.round(Number(els.projectBudget.value || 0) * 0.12),
    },
    updatedAt: new Date().toISOString(),
  };

  if (state.editingProjectId) {
    const project = projectById(state.editingProjectId);
    Object.assign(project, payload);
    addProjectActivity(project, `Updated project "${project.name}"`);
    addActivity(`Updated project "${project.name}"`, workspaceId);
  } else {
    const project = createProjectFromPayload(payload, workspaceId);
    state.data.projects.push(project);
    state.currentProjectId = project.id;
    addActivity(`Created project "${project.name}"`, workspaceId);
    addNotification({
      workspaceId,
      userId: state.currentUser.id,
      title: "Project created",
      message: `${project.name} is ready for tasks, milestones, and files.`,
      type: "project",
      entityId: project.id,
    });
  }

  saveData();
  closeModal("project-modal");
  state.editingProjectId = null;
  state.currentProjectId ? showView("project") : renderCurrentView();
  toast("Project saved");
}

function archiveCurrentProject() {
  const project = currentProject();
  if (!project) return;
  project.status = project.status === "Archived" ? "Active" : "Archived";
  project.updatedAt = new Date().toISOString();
  addProjectActivity(project, `${project.status === "Archived" ? "Archived" : "Restored"} project`);
  saveData();
  renderProjectView();
  toast(project.status === "Archived" ? "Project archived" : "Project restored");
}

function deleteCurrentProject() {
  const project = currentProject();
  if (!project || !confirm(`Delete "${project.name}" and all tasks?`)) return;
  state.data.projects = state.data.projects.filter((item) => item.id !== project.id);
  state.data.documents = state.data.documents.filter((item) => item.projectId !== project.id);
  state.data.files = state.data.files.filter((item) => item.projectId !== project.id);
  addActivity(`Deleted project "${project.name}"`, project.workspaceId);
  saveData();
  showView("projects");
}

function duplicateProject(projectId) {
  const project = projectById(projectId);
  if (!project) return;
  const copy = deepClone(project);
  copy.id = createId();
  copy.name = `${project.name} Copy`;
  copy.createdAt = new Date().toISOString();
  copy.updatedAt = new Date().toISOString();
  copy.columns = copy.columns.map((column) => ({
    ...column,
    id: createId(),
    tasks: safeList(column.tasks).map((task) => ({ ...task, id: createId() })),
  }));
  state.data.projects.push(copy);
  addActivity(`Duplicated project "${project.name}"`, project.workspaceId);
  saveData();
  renderCurrentView();
}

function openTaskModal(taskId = null, columnId = null) {
  const taskInfo = taskId ? findTask(taskId) : null;
  const project =
    taskInfo?.project ||
    currentProject() ||
    workspaceProjects()[0] ||
    createFallbackProject();
  const task = taskInfo?.task;
  state.editingTaskId = task?.id || null;
  state.currentProjectId = project.id;
  state.targetColumnId = columnId || taskInfo?.column.id || project.columns[0].id;

  populateTaskProjectOptions(project.id);
  populateTaskStatusOptions(project, task?.status || statusFromColumnId(project, state.targetColumnId));
  renderTaskAssignees(project, task?.assignee);

  els.taskModalTitle.textContent = task ? "Edit Task" : "Create Task";
  els.taskTitle.value = task?.title || "";
  els.taskDescription.value = task?.description || "";
  els.taskPriority.value = task?.priority || "Medium";
  els.taskReporter.value = task?.reporter || state.currentUser.name;
  els.taskSprint.value = task?.sprint || "";
  els.taskStartDate.value = task?.startDate || todayIso();
  els.taskDueDate.value = task?.dueDate || nextDate(7);
  els.taskMilestone.value = task?.milestone || "";
  els.taskEstimate.value = task?.estimate || "";
  els.taskTracked.value = task?.tracked || "";
  els.taskLabels.value = safeList(task?.labels).join(", ");
  els.taskSubtasks.value = safeList(task?.subtasks)
    .map((item) => `${item.done ? "[x] " : ""}${item.title || item.text}`)
    .join("\n");
  els.taskDependency.value = task?.dependency || "";
  els.taskComment.value = "";
  els.deleteTaskBtn.classList.toggle("hidden", !task);
  openModal("task-modal");
  els.taskTitle.focus();
}

function saveTask(event) {
  event.preventDefault();
  const title = els.taskTitle.value.trim();
  if (!title) return;

  const selectedProject = projectById(els.taskProject.value) || currentProject();
  if (!selectedProject) return;

  const status = els.taskStatus.value;
  const targetColumn = ensureStatusColumn(selectedProject, status);
  const comment = els.taskComment.value.trim();
  const payload = {
    title,
    description: els.taskDescription.value.trim(),
    assignee: els.taskAssignee.value,
    reporter: els.taskReporter.value.trim() || state.currentUser.name,
    priority: els.taskPriority.value,
    status,
    sprint: els.taskSprint.value.trim(),
    startDate: els.taskStartDate.value,
    dueDate: els.taskDueDate.value,
    milestone: els.taskMilestone.value.trim(),
    estimate: Number(els.taskEstimate.value || 0),
    tracked: Number(els.taskTracked.value || 0),
    labels: normalizeList(els.taskLabels.value),
    subtasks: parseSubtasks(els.taskSubtasks.value),
    dependency: els.taskDependency.value.trim(),
    updatedAt: new Date().toISOString(),
  };

  if (state.editingTaskId) {
    const taskInfo = findTask(state.editingTaskId);
    if (!taskInfo) return;
    Object.assign(taskInfo.task, payload);
    if (comment) addTaskComment(taskInfo.task, comment);
    if (taskInfo.project.id !== selectedProject.id || taskInfo.column.id !== targetColumn.id) {
      taskInfo.column.tasks = taskInfo.column.tasks.filter((item) => item.id !== taskInfo.task.id);
      targetColumn.tasks.push(taskInfo.task);
    }
    addProjectActivity(selectedProject, `Updated task "${payload.title}"`);
    maybeCreateTaskNotifications(selectedProject, taskInfo.task, "updated");
  } else {
    const task = {
      id: createId(),
      projectId: selectedProject.id,
      attachments: [],
      comments: [],
      activity: [],
      createdAt: new Date().toISOString(),
      ...payload,
    };
    if (comment) addTaskComment(task, comment);
    targetColumn.tasks.push(task);
    addProjectActivity(selectedProject, `Created task "${task.title}"`);
    maybeCreateTaskNotifications(selectedProject, task, "created");
  }

  selectedProject.updatedAt = new Date().toISOString();
  addActivity(`Saved task "${payload.title}"`, selectedProject.workspaceId);
  saveData();
  closeModal("task-modal");
  state.editingTaskId = null;
  renderCurrentView();
  toast("Task saved");
}

function deleteTask() {
  const taskInfo = findTask(state.editingTaskId);
  if (!taskInfo || !confirm(`Delete "${taskInfo.task.title}"?`)) return;
  taskInfo.column.tasks = taskInfo.column.tasks.filter(
    (task) => task.id !== state.editingTaskId,
  );
  addProjectActivity(taskInfo.project, `Deleted task "${taskInfo.task.title}"`);
  addActivity(`Deleted task "${taskInfo.task.title}"`, taskInfo.project.workspaceId);
  saveData();
  closeModal("task-modal");
  renderCurrentView();
}

function moveTask(taskId, targetColumnId) {
  const taskInfo = findTask(taskId);
  if (!taskInfo || taskInfo.column.id === targetColumnId) return;
  const targetColumn = taskInfo.project.columns.find((column) => column.id === targetColumnId);
  if (!targetColumn) return;
  taskInfo.column.tasks = taskInfo.column.tasks.filter((task) => task.id !== taskId);
  taskInfo.task.status = targetColumn.name;
  taskInfo.task.updatedAt = new Date().toISOString();
  targetColumn.tasks.push(taskInfo.task);
  taskInfo.project.updatedAt = new Date().toISOString();
  addProjectActivity(taskInfo.project, `Moved "${taskInfo.task.title}" to ${targetColumn.name}`);
  maybeCreateTaskNotifications(taskInfo.project, taskInfo.task, "moved");
  saveData();
  renderProjectView();
}

function saveColumn(event) {
  event.preventDefault();
  const project = currentProject();
  const name = els.columnName.value.trim();
  if (!project || !name) return;
  if (project.columns.some((column) => column.name.toLowerCase() === name.toLowerCase())) {
    toast("Column already exists");
    return;
  }
  project.columns.push({ id: createId(), name, tasks: [] });
  addProjectActivity(project, `Added column "${name}"`);
  saveData();
  els.columnName.value = "";
  closeModal("column-modal");
  renderProjectView();
}

function removeColumn(columnId) {
  const project = currentProject();
  const column = project?.columns.find((item) => item.id === columnId);
  if (!column || column.tasks.length || !confirm(`Delete column "${column.name}"?`)) return;
  project.columns = project.columns.filter((item) => item.id !== columnId);
  addProjectActivity(project, `Deleted column "${column.name}"`);
  saveData();
  renderProjectView();
}

function openGoalModal(goal = null) {
  state.editingGoalId = goal?.id || null;
  els.goalTitle.value = goal?.title || "";
  els.goalDescription.value = goal?.description || "";
  els.goalOwner.value = goal?.owner || state.currentUser.name;
  els.goalDeadline.value = goal?.deadline || nextDate(45);
  els.goalTarget.value = goal?.target || "";
  els.goalProgress.value = goal?.progress || 0;
  openModal("goal-modal");
  els.goalTitle.focus();
}

function saveGoal(event) {
  event.preventDefault();
  const title = els.goalTitle.value.trim();
  if (!title) return;
  const payload = {
    workspaceId: state.activeWorkspaceId,
    title,
    description: els.goalDescription.value.trim(),
    owner: els.goalOwner.value.trim() || state.currentUser.name,
    deadline: els.goalDeadline.value,
    target: els.goalTarget.value.trim(),
    progress: clamp(Number(els.goalProgress.value || 0), 0, 100),
    updatedAt: new Date().toISOString(),
  };
  if (state.editingGoalId) {
    Object.assign(state.data.goals.find((goal) => goal.id === state.editingGoalId), payload);
  } else {
    state.data.goals.push({ id: createId(), createdAt: new Date().toISOString(), ...payload });
  }
  addActivity(`Saved goal "${title}"`, state.activeWorkspaceId);
  saveData();
  closeModal("goal-modal");
  renderCurrentView();
}

function deleteGoal(goalId) {
  const goal = state.data.goals.find((item) => item.id === goalId);
  if (!goal || !confirm(`Delete goal "${goal.title}"?`)) return;
  state.data.goals = state.data.goals.filter((item) => item.id !== goalId);
  saveData();
  renderCurrentView();
}

function openDocumentModal(document = null, projectId = null) {
  state.editingDocumentId = document?.id || null;
  populateProjectSelect(els.documentProject, projectId || document?.projectId || currentProject()?.id);
  els.documentTitle.value = document?.title || "";
  els.documentContent.value = document?.content || "";
  openModal("document-modal");
  els.documentTitle.focus();
}

function saveDocument(event) {
  event.preventDefault();
  const title = els.documentTitle.value.trim();
  if (!title) return;
  const payload = {
    workspaceId: state.activeWorkspaceId,
    projectId: els.documentProject.value,
    title,
    content: els.documentContent.value.trim(),
    owner: state.currentUser.name,
    updatedAt: new Date().toISOString(),
  };
  if (state.editingDocumentId) {
    Object.assign(state.data.documents.find((item) => item.id === state.editingDocumentId), payload);
  } else {
    state.data.documents.push({ id: createId(), createdAt: new Date().toISOString(), ...payload });
  }
  addActivity(`Saved document "${title}"`, state.activeWorkspaceId);
  saveData();
  closeModal("document-modal");
  renderCurrentView();
}

function deleteDocument(documentId) {
  const document = state.data.documents.find((item) => item.id === documentId);
  if (!document || !confirm(`Delete document "${document.title}"?`)) return;
  state.data.documents = state.data.documents.filter((item) => item.id !== documentId);
  saveData();
  renderCurrentView();
}

function openFileModal(projectId = null) {
  populateProjectSelect(els.fileProject, projectId || currentProject()?.id);
  els.fileName.value = "";
  els.fileType.value = "";
  els.fileSize.value = "";
  els.fileOwner.value = state.currentUser.name;
  openModal("file-modal");
  els.fileName.focus();
}

function saveFile(event) {
  event.preventDefault();
  const name = els.fileName.value.trim();
  if (!name) return;
  state.data.files.push({
    id: createId(),
    workspaceId: state.activeWorkspaceId,
    projectId: els.fileProject.value,
    name,
    type: els.fileType.value.trim() || "File",
    size: els.fileSize.value.trim() || "Unknown",
    owner: els.fileOwner.value.trim() || state.currentUser.name,
    uploadedAt: todayIso(),
  });
  addActivity(`Added file "${name}"`, state.activeWorkspaceId);
  saveData();
  closeModal("file-modal");
  renderCurrentView();
}

function deleteFile(fileId) {
  const file = state.data.files.find((item) => item.id === fileId);
  if (!file || !confirm(`Delete file "${file.name}"?`)) return;
  state.data.files = state.data.files.filter((item) => item.id !== fileId);
  saveData();
  renderCurrentView();
}

function addMilestonePrompt(projectId) {
  const project = projectById(projectId);
  if (!project) return;
  const name = prompt("Milestone name");
  if (!name) return;
  const date = prompt("Due date (YYYY-MM-DD)", nextDate(14)) || nextDate(14);
  project.milestones.push({
    id: createId(),
    name,
    description: "Created from project milestone manager.",
    date,
    status: "Planned",
    progress: 0,
    done: false,
  });
  addProjectActivity(project, `Added milestone "${name}"`);
  saveData();
  renderProjectView();
}

function addSprintPrompt(projectId) {
  const project = projectById(projectId);
  if (!project) return;
  const name = prompt("Sprint name", `Sprint ${safeList(project.sprints).length + 1}`);
  if (!name) return;
  project.sprints.push({
    id: createId(),
    name,
    goal: prompt("Sprint goal", "Deliver the next visible increment.") || "Deliver the next visible increment.",
    startDate: todayIso(),
    endDate: nextDate(14),
    status: safeList(project.sprints).some((sprint) => sprint.status === "Active") ? "Planned" : "Active",
    progress: 0,
  });
  addProjectActivity(project, `Added sprint "${name}"`);
  saveData();
  renderProjectView();
}

function addRiskPrompt(projectId) {
  const project = projectById(projectId);
  if (!project) return;
  const title = prompt("Risk title");
  if (!title) return;
  project.risks.push({
    id: createId(),
    title,
    level: "Medium",
    owner: state.currentUser.name,
    mitigation: prompt("Mitigation plan", "Assign an owner and review weekly.") || "Assign an owner and review weekly.",
  });
  addProjectActivity(project, `Added risk "${title}"`);
  saveData();
  renderProjectView();
}

function toggleQuickCreate() {
  els.notificationPanel.classList.add("hidden");
  els.quickCreatePanel.innerHTML = `
    <div class="quick-grid">
      <button data-action="create-task"><i class="fa-solid fa-list-check"></i>Task</button>
      <button data-action="create-project"><i class="fa-solid fa-diagram-project"></i>Project</button>
      <button data-action="create-goal"><i class="fa-solid fa-bullseye"></i>Goal</button>
      <button data-action="create-document"><i class="fa-solid fa-file-lines"></i>Document</button>
      <button data-action="create-file"><i class="fa-solid fa-folder-open"></i>File</button>
      <button data-command="go-reports"><i class="fa-solid fa-chart-line"></i>Reports</button>
    </div>
  `;
  els.quickCreatePanel.classList.toggle("hidden");
}

function toggleNotifications() {
  els.quickCreatePanel.classList.add("hidden");
  const notifications = workspaceNotifications().slice(0, 6);
  els.notificationPanel.innerHTML = `
    <div class="section-heading">
      <div>
        <p class="eyebrow">Inbox</p>
        <h3>Notifications</h3>
      </div>
      <button class="ghost-btn icon-btn" data-action="mark-all-read" aria-label="Mark all read">
        <i class="fa-solid fa-check-double"></i>
      </button>
    </div>
    <div class="notification-list">
      ${notifications.length ? notifications.map(renderNotification).join("") : renderEmpty("No notifications.")}
    </div>
  `;
  els.notificationPanel.classList.toggle("hidden");
}

function renderNotificationCount() {
  const count = workspaceNotifications().filter((item) => !item.read).length;
  els.notificationCount.textContent = count;
}

function markAllNotificationsRead() {
  workspaceNotifications().forEach((item) => {
    item.read = true;
  });
  saveData();
  renderCurrentView();
  els.notificationPanel.classList.add("hidden");
}

function markNotificationRead(id) {
  const notification = state.data.notifications.find((item) => item.id === id);
  if (notification) notification.read = true;
  saveData();
  renderCurrentView();
}

function deleteNotification(id) {
  state.data.notifications = state.data.notifications.filter((item) => item.id !== id);
  saveData();
  renderCurrentView();
}

function openCommandPalette(query = "") {
  openModal("command-modal");
  els.commandInput.value = query;
  renderCommandResults(query.toLowerCase());
  setTimeout(() => els.commandInput.focus(), 30);
}

function renderCommandResults(query = "") {
  const commands = [
    ["create-task", "Create task", "Add a task to the current or first project"],
    ["create-project", "Create project", "Start a new project workspace"],
    ["create-goal", "Create goal", "Add an objective or key result"],
    ["go-home", "Go to dashboard", "Open the smart dashboard"],
    ["go-projects", "Open projects", "Review the project portfolio"],
    ["go-mywork", "Open my work", "Review assigned tasks"],
    ["go-reports", "Open reports", "See analytics and activity"],
    ["toggle-theme", "Change theme", "Switch light and dark mode"],
  ];
  const projectCommands = workspaceProjects().map((project) => [
    `project:${project.id}`,
    `Open ${project.name}`,
    "Project detail",
  ]);
  const taskCommands = allWorkspaceTasks(workspaceProjects()).map((task) => [
    `task:${task.id}`,
    task.title,
    `${projectById(task.projectId)?.name || "Project"} | ${task.status}`,
  ]);
  const results = [...commands, ...projectCommands, ...taskCommands].filter((item) =>
    `${item[1]} ${item[2]}`.toLowerCase().includes(query),
  );
  els.commandResults.innerHTML = results.length
    ? results
        .slice(0, 12)
        .map(
          ([command, title, text]) => `
            <button class="command-result" data-command="${escapeAttribute(command)}">
              <strong>${escapeHtml(title)}</strong>
              <small>${escapeHtml(text)}</small>
            </button>
          `,
        )
        .join("")
    : renderEmpty("No command found.");
}

function runCommand(command) {
  closeModal("command-modal");
  const routes = {
    "create-task": () => openTaskModal(),
    "create-project": () => openProjectModal(),
    "create-goal": () => openGoalModal(),
    "go-home": () => showView("home"),
    "go-projects": () => showView("projects"),
    "go-mywork": () => showView("mywork"),
    "go-reports": () => showView("reports"),
    "toggle-theme": toggleTheme,
  };
  if (command.startsWith("project:")) openProject(command.split(":")[1]);
  else if (command.startsWith("task:")) openTaskModal(command.split(":")[1]);
  else routes[command]?.();
}

function toggleTheme() {
  const nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
  applyTheme(nextTheme);
  localStorage.setItem(THEME_KEY, nextTheme);
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark-mode", isDark);
  els.themeToggleBtn.innerHTML = `<i class="fa-solid ${isDark ? "fa-sun" : "fa-moon"}"></i>`;
}

function toggleSidebar() {
  const collapsed = !els.appContainer.classList.contains("sidebar-collapsed");
  els.appContainer.classList.toggle("sidebar-collapsed", collapsed);
  localStorage.setItem(SIDEBAR_KEY, collapsed ? "1" : "0");
}

function applySidebarPreference() {
  els.appContainer.classList.toggle("sidebar-collapsed", localStorage.getItem(SIDEBAR_KEY) === "1");
}

function saveSettingsFromView() {
  const workspace = currentWorkspace();
  state.currentUser.name = $("#settings-name").value.trim() || state.currentUser.name;
  state.currentUser.email = $("#settings-email").value.trim() || state.currentUser.email;
  state.currentUser.role = $("#settings-role").value.trim() || state.currentUser.role;
  workspace.name = $("#settings-workspace-name").value.trim() || workspace.name;
  workspace.settings.defaultTaskView = $("#settings-default-task-view").value;
  workspace.settings.theme = $("#settings-theme").value;
  workspace.settings.mentions = $("#settings-mentions").checked;
  workspace.settings.deadlines = $("#settings-deadlines").checked;
  workspace.settings.comments = $("#settings-comments").checked;
  addActivity("Updated workspace settings", workspace.id);
  saveData();
  renderChrome();
  renderCurrentView();
  toast("Settings saved");
}

function exportData() {
  const payload = JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      user: state.currentUser?.email,
      workspace: currentWorkspace(),
      projects: workspaceProjects(),
      teams: workspaceTeams(),
      goals: workspaceGoals(),
      documents: workspaceDocuments(),
      files: workspaceFiles(),
      notifications: workspaceNotifications(),
      activity: workspaceActivity(),
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
  addActivity("Exported workspace data", state.activeWorkspaceId);
  saveData();
  toast("Workspace exported");
}

function resetDemoData() {
  if (!confirm("Reset all ProjectFlow demo data in this browser?")) return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LEGACY_STORAGE_KEY);
  sessionStorage.removeItem(SESSION_KEY);
  state.data = seedData();
  state.currentUser = null;
  state.activeWorkspaceId = null;
  saveData();
  showLanding();
  toast("Demo data reset");
}

function saveCurrentFilter() {
  const workspace = currentWorkspace();
  workspace.savedFilters = workspace.savedFilters || [];
  workspace.savedFilters.push({
    id: createId(),
    name: `Saved filter ${workspace.savedFilters.length + 1}`,
    ...state.filters,
  });
  saveData();
  toast("Filter saved");
}

function updateTaskField(taskId, field, value) {
  const taskInfo = findTask(taskId);
  if (!taskInfo) return;
  taskInfo.task[field] = value;
  taskInfo.task.updatedAt = new Date().toISOString();
  if (field === "status") {
    const targetColumn = ensureStatusColumn(taskInfo.project, value);
    if (targetColumn.id !== taskInfo.column.id) {
      taskInfo.column.tasks = taskInfo.column.tasks.filter((task) => task.id !== taskId);
      targetColumn.tasks.push(taskInfo.task);
    }
  }
  addProjectActivity(taskInfo.project, `Updated ${field} for "${taskInfo.task.title}"`);
  saveData();
  renderNotificationCount();
}

function toggleSubtask(taskId, index) {
  const taskInfo = findTask(taskId);
  if (!taskInfo?.task.subtasks?.[index]) return;
  taskInfo.task.subtasks[index].done = !taskInfo.task.subtasks[index].done;
  addProjectActivity(taskInfo.project, `Updated subtask on "${taskInfo.task.title}"`);
  saveData();
  renderCurrentView();
}

function bulkMarkDone() {
  const selected = selectedTaskIds();
  if (!selected.length) {
    toast("Select at least one task");
    return;
  }
  selected.forEach((taskId) => updateTaskField(taskId, "status", "Done"));
  renderCurrentView();
  toast(`${selected.length} tasks marked done`);
}

function bulkAssignMe() {
  const selected = selectedTaskIds();
  if (!selected.length) {
    toast("Select at least one task");
    return;
  }
  selected.forEach((taskId) => updateTaskField(taskId, "assignee", state.currentUser.name));
  renderCurrentView();
  toast(`${selected.length} tasks assigned`);
}

function selectedTaskIds() {
  return $$("[data-task-select]:checked").map((input) => input.dataset.taskSelect);
}

function toggleAllTaskSelection(checked) {
  $$("[data-task-select]").forEach((input) => {
    input.checked = checked;
  });
}

function startTimer(taskId) {
  const taskInfo = findTask(taskId);
  if (!taskInfo) return;
  taskInfo.task.timerStartedAt = new Date().toISOString();
  addProjectActivity(taskInfo.project, `Started timer for "${taskInfo.task.title}"`);
  saveData();
  renderCurrentView();
}

function stopTimer(taskId) {
  const taskInfo = findTask(taskId);
  if (!taskInfo?.task.timerStartedAt) return;
  const started = new Date(taskInfo.task.timerStartedAt);
  const hours = Math.max(0.25, Math.round(((Date.now() - started.getTime()) / 36e5) * 4) / 4);
  taskInfo.task.tracked = Number(taskInfo.task.tracked || 0) + hours;
  taskInfo.task.timerStartedAt = null;
  addProjectActivity(taskInfo.project, `Logged ${hours}h on "${taskInfo.task.title}"`);
  saveData();
  renderCurrentView();
}

function populateProjectSelect(select, selectedId) {
  const projects = workspaceProjects();
  select.innerHTML = projects
    .map(
      (project) =>
        `<option value="${project.id}" ${selectedId === project.id ? "selected" : ""}>${escapeHtml(project.name)}</option>`,
    )
    .join("");
}

function populateTaskProjectOptions(selectedId) {
  populateProjectSelect(els.taskProject, selectedId);
  els.taskProject.onchange = () => {
    const project = projectById(els.taskProject.value);
    populateTaskStatusOptions(project, project.columns[0].name);
    renderTaskAssignees(project);
  };
}

function populateTaskStatusOptions(project, selected) {
  els.taskStatus.innerHTML = project.columns
    .map(
      (column) =>
        `<option value="${escapeAttribute(column.name)}" ${column.name === selected ? "selected" : ""}>${escapeHtml(column.name)}</option>`,
    )
    .join("");
}

function renderTaskAssignees(project, selected) {
  const members = projectMembers(project);
  els.taskAssignee.innerHTML = members
    .map(
      (name) =>
        `<option value="${escapeAttribute(name)}" ${selected === name ? "selected" : ""}>${escapeHtml(name)}</option>`,
    )
    .join("");
  if (!selected) els.taskAssignee.value = members[0] || state.currentUser.name;
}

function currentWorkspace() {
  return state.data.workspaces.find((workspace) => workspace.id === state.activeWorkspaceId);
}

function currentUserWorkspaces() {
  const ids = safeList(state.currentUser?.workspaceIds);
  return state.data.workspaces.filter((workspace) => ids.includes(workspace.id));
}

function workspaceProjects() {
  return state.data.projects.filter((project) => project.workspaceId === state.activeWorkspaceId);
}

function workspaceTeams() {
  return state.data.teams.filter((team) => team.workspaceId === state.activeWorkspaceId);
}

function workspaceGoals() {
  return state.data.goals.filter((goal) => goal.workspaceId === state.activeWorkspaceId);
}

function workspaceDocuments() {
  return state.data.documents.filter((document) => document.workspaceId === state.activeWorkspaceId);
}

function workspaceFiles() {
  return state.data.files.filter((file) => file.workspaceId === state.activeWorkspaceId);
}

function workspaceNotifications() {
  return state.data.notifications
    .filter(
      (notification) =>
        notification.workspaceId === state.activeWorkspaceId &&
        (!notification.userId || notification.userId === state.currentUser?.id),
    )
    .sort((a, b) => new Date(b.at) - new Date(a.at));
}

function workspaceActivity() {
  return state.data.activity.filter((item) => item.workspaceId === state.activeWorkspaceId);
}

function workspaceAutomations() {
  return state.data.automations.filter((item) => item.workspaceId === state.activeWorkspaceId);
}

function currentProject() {
  return projectById(state.currentProjectId);
}

function projectById(projectId) {
  return state.data.projects.find((project) => project.id === projectId);
}

function projectMembers(project) {
  if (!project) return [state.currentUser?.name].filter(Boolean);
  return normalizeList(safeList(project.members).join(","), project.owner || state.currentUser?.name);
}

function getProjectTasks(project) {
  return safeList(project?.columns).flatMap((column) =>
    safeList(column.tasks).map((task) => ({
      ...task,
      status: task.status || column.name,
      projectId: project.id,
    })),
  );
}

function allWorkspaceTasks(projects) {
  return projects.flatMap(getProjectTasks);
}

function filteredWorkspaceTasks() {
  return allWorkspaceTasks(workspaceProjects()).filter((task) =>
    getFilteredTasks([task], task.projectId).length,
  );
}

function assignedToMe() {
  return allWorkspaceTasks(workspaceProjects()).filter((task) => task.assignee === state.currentUser?.name);
}

function getFilteredTasks(tasks, projectId) {
  return tasks.filter((task) => {
    const searchable = [
      task.title,
      task.description,
      task.assignee,
      task.reporter,
      task.priority,
      task.status,
      task.sprint,
      task.milestone,
      projectById(task.projectId || projectId)?.name,
      ...safeList(task.labels),
    ]
      .join(" ")
      .toLowerCase();
    const matchesSearch = searchable.includes(state.filters.taskSearch);
    const matchesStatus =
      state.filters.taskStatus === "all" || task.status === state.filters.taskStatus;
    const matchesPriority =
      state.filters.taskPriority === "all" || task.priority === state.filters.taskPriority;
    const matchesAssignee =
      state.filters.taskAssignee === "all" || task.assignee === state.filters.taskAssignee;
    const matchesProject =
      state.filters.projectId === "all" || (task.projectId || projectId) === state.filters.projectId;
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee && matchesProject;
  });
}

function findTask(taskId) {
  for (const project of state.data.projects) {
    for (const column of safeList(project.columns)) {
      const task = safeList(column.tasks).find((item) => item.id === taskId);
      if (task) return { project, column, task };
    }
  }
  return null;
}

function ensureStatusColumn(project, status) {
  let column = project.columns.find((item) => item.name === status);
  if (!column) {
    column = { id: createId(), name: status, tasks: [] };
    project.columns.push(column);
  }
  return column;
}

function statusFromColumnId(project, columnId) {
  return project.columns.find((column) => column.id === columnId)?.name || project.columns[0].name;
}

function getWorkspaceStats(projects) {
  const tasks = allWorkspaceTasks(projects);
  const progressValues = projects.map((project) => getProjectStats(project).progress);
  const budgetTotal = projects.reduce((sum, project) => sum + Number(project.budget?.total || 0), 0);
  const budgetSpent = projects.reduce((sum, project) => sum + Number(project.budget?.spent || 0), 0);
  return {
    projects: projects.length,
    active: projects.filter((project) => project.status === "Active").length,
    tasks: tasks.filter((task) => task.status !== "Done").length,
    doneTasks: tasks.filter((task) => task.status === "Done").length,
    overdue: tasks.filter((task) => isOverdue(task.dueDate) && task.status !== "Done").length,
    milestones: projects.reduce((sum, project) => sum + safeList(project.milestones).length, 0),
    members: new Set(projects.flatMap((project) => safeList(project.members))).size,
    comments: tasks.reduce((sum, task) => sum + safeList(task.comments).length, 0),
    documents: workspaceDocuments().length,
    files: workspaceFiles().length,
    estimate: sum(tasks, "estimate"),
    tracked: sum(tasks, "tracked"),
    averageProgress: progressValues.length
      ? Math.round(progressValues.reduce((total, value) => total + value, 0) / progressValues.length)
      : 0,
    completionRate: completionRate(tasks),
    budgetTotal,
    budgetSpent,
    budgetUsed: budgetTotal ? Math.round((budgetSpent / budgetTotal) * 100) : 0,
  };
}

function getProjectStats(project) {
  const tasks = getProjectTasks(project);
  const done = tasks.filter((task) => task.status === "Done").length;
  const total = tasks.length;
  return {
    total,
    done,
    progress: total ? Math.round((done / total) * 100) : 0,
    overdue: tasks.filter((task) => isOverdue(task.dueDate) && task.status !== "Done").length,
    blocked: tasks.filter((task) => task.status === "Blocked").length,
    estimate: sum(tasks, "estimate"),
    tracked: sum(tasks, "tracked"),
  };
}

function getProjectHealth(project) {
  const stats = getProjectStats(project);
  const overduePressure = stats.total ? stats.overdue / stats.total : 0;
  const blockedPressure = stats.total ? stats.blocked / stats.total : 0;
  const budgetPressure =
    project.budget?.total && project.budget.spent
      ? project.budget.spent / project.budget.total
      : 0;
  const duePressure = isOverdue(project.dueDate) && project.status !== "Completed" ? 1 : 0;
  const score =
    overduePressure * 45 +
    blockedPressure * 35 +
    budgetPressure * 20 +
    duePressure * 50 -
    stats.progress * 0.25;

  if (project.status === "Completed") return { label: "Completed", color: "green", score: 0 };
  if (score >= 45 || project.status === "At Risk") return { label: "Delayed", color: "red", score };
  if (score >= 22 || stats.overdue || stats.blocked) return { label: "At Risk", color: "orange", score };
  return { label: "On Track", color: "green", score };
}

function projectHealthScore(project) {
  return getProjectHealth(project).score;
}

function getWorkload(projects) {
  const members = new Map();
  workspaceTeams().forEach((team) => {
    safeList(team.members).forEach((member) => {
      members.set(member.name, {
        name: member.name,
        role: member.role,
        capacity: Number(member.capacity || 32),
        tasks: 0,
        hours: 0,
      });
    });
  });
  projects.forEach((project) => {
    projectMembers(project).forEach((name) => {
      if (!members.has(name)) {
        members.set(name, { name, role: "Member", capacity: 32, tasks: 0, hours: 0 });
      }
    });
    getProjectTasks(project).forEach((task) => {
      if (!members.has(task.assignee)) {
        members.set(task.assignee, { name: task.assignee, role: "Member", capacity: 32, tasks: 0, hours: 0 });
      }
      const member = members.get(task.assignee);
      if (task.status !== "Done") member.tasks += 1;
      member.hours += Number(task.estimate || 0);
    });
  });
  return Array.from(members.values()).sort((a, b) => b.hours - a.hours);
}

function completionRate(tasks) {
  return tasks.length ? Math.round((tasks.filter((task) => task.status === "Done").length / tasks.length) * 100) : 0;
}

function getSubtaskProgress(task) {
  const subtasks = safeList(task.subtasks || task.checklist);
  const done = subtasks.filter((item) => item.done).length;
  const total = subtasks.length;
  return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
}

function addTaskComment(task, text) {
  task.comments = safeList(task.comments);
  task.comments.push({
    id: createId(),
    text,
    author: state.currentUser.name,
    at: new Date().toISOString(),
    reactions: [],
  });
  task.activity = safeList(task.activity);
  task.activity.unshift({
    id: createId(),
    message: `Comment added by ${state.currentUser.name}`,
    at: new Date().toISOString(),
  });
}

function addProjectActivity(project, message) {
  project.activity = safeList(project.activity);
  project.activity.unshift({
    id: createId(),
    message,
    at: new Date().toISOString(),
  });
  project.activity = project.activity.slice(0, 80);
  addActivity(message, project.workspaceId);
}

function addActivity(message, workspaceId = state.activeWorkspaceId) {
  state.data.activity.unshift({
    id: createId(),
    workspaceId,
    userId: state.currentUser?.id || null,
    message,
    at: new Date().toISOString(),
  });
  state.data.activity = state.data.activity.slice(0, 150);
}

function addNotification({ workspaceId, userId, title, message, type, entityId }) {
  state.data.notifications.unshift({
    id: createId(),
    workspaceId,
    userId,
    title,
    message,
    type,
    entityId: entityId || null,
    read: false,
    at: new Date().toISOString(),
  });
  state.data.notifications = state.data.notifications.slice(0, 120);
}

function maybeCreateTaskNotifications(project, task, mode) {
  const mentioned = safeList(task.comments)
    .flatMap((comment) => (comment.text.match(/@[a-zA-Z ]+/g) || []).map((value) => value.replace("@", "").trim()));
  const targetUser = state.data.users.find((user) => user.name === task.assignee);
  if (targetUser) {
    addNotification({
      workspaceId: project.workspaceId,
      userId: targetUser.id,
      title: `Task ${mode}`,
      message: `${task.title} is assigned to ${task.assignee}.`,
      type: "task",
      entityId: task.id,
    });
  }
  mentioned.forEach((name) => {
    const user = state.data.users.find((item) => item.name.toLowerCase() === name.toLowerCase());
    if (user) {
      addNotification({
        workspaceId: project.workspaceId,
        userId: user.id,
        title: "Mentioned in a comment",
        message: `${state.currentUser.name} mentioned you on ${task.title}.`,
        type: "mention",
        entityId: task.id,
      });
    }
  });
}

function createFallbackProject() {
  const project = createProjectFromPayload(
    {
      name: "Untitled Project",
      description: "Starter project created for quick task capture.",
      owner: state.currentUser.name,
      status: "Planning",
      priority: "Medium",
      startDate: todayIso(),
      dueDate: nextDate(30),
      members: [state.currentUser.name],
      tags: ["Planning"],
      budget: { total: 25000, spent: 0 },
    },
    state.activeWorkspaceId,
  );
  state.data.projects.push(project);
  saveData();
  return project;
}

function createProjectFromPayload(payload, workspaceId, options = {}) {
  const user = options.user || state.currentUser || {
    id: payload.userId || "system",
    name: payload.owner || "System",
  };
  const teams =
    options.teams || (state.data ? state.data.teams.filter((team) => team.workspaceId === workspaceId) : []);
  const project = {
    id: createId(),
    workspaceId,
    userId: user.id,
    icon: initials(payload.name),
    cover: "",
    teamId: teams[0]?.id || null,
    template: "Custom",
    materials: ["Workspace access", "Project brief", "Review checklist"],
    milestones: [
      { id: createId(), name: "Scope approved", description: "Charter and boundaries agreed.", date: payload.startDate || todayIso(), status: "Completed", progress: 100, done: true },
      { id: createId(), name: "Delivery checkpoint", description: "Review progress and blockers.", date: nextDate(14), status: "Planned", progress: 35, done: false },
      { id: createId(), name: "Launch review", description: "Final sign-off before completion.", date: payload.dueDate || nextDate(30), status: "Planned", progress: 0, done: false },
    ],
    sprints: [
      {
        id: createId(),
        name: "Sprint 1",
        goal: "Turn project scope into visible delivery progress.",
        startDate: todayIso(),
        endDate: nextDate(14),
        status: "Active",
        progress: 0,
      },
    ],
    risks: [
      {
        id: createId(),
        title: "Timeline compression",
        level: "Medium",
        owner: payload.owner,
        mitigation: "Review dependencies weekly and protect delivery buffer.",
      },
    ],
    alerts: ["Milestone review pending", "Budget baseline created"],
    activity: [],
    columns: TASK_STATUSES.map((name) => ({ id: createId(), name, tasks: [] })),
    createdAt: new Date().toISOString(),
    ...payload,
  };
  project.activity.unshift({
    id: createId(),
    message: `Created project "${project.name}"`,
    at: new Date().toISOString(),
  });
  return project;
}

function createWorkspace(name, owner) {
  return {
    id: createId(),
    name,
    logo: initials(name),
    ownerId: owner.id,
    members: [
      {
        userId: owner.id,
        name: owner.name,
        role: "Owner",
      },
    ],
    settings: {
      defaultTaskView: "Board",
      theme: "Light",
      mentions: true,
      deadlines: true,
      comments: true,
      startWeek: "Monday",
    },
    savedFilters: [],
  };
}

function createGoalRecord(workspaceId, ownerName) {
  return {
    id: createId(),
    workspaceId,
    title: "Launch a healthy delivery system",
    description: "Keep project scope, ownership, deadlines, and reporting visible.",
    owner: ownerName,
    target: "80% project completion health",
    progress: 42,
    deadline: nextDate(60),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function createStarterProject(user, workspaceId, name = "Website Relaunch") {
  const project = createProjectFromPayload(
    {
      name,
      description: "Coordinate design, implementation, QA, launch readiness, and post-launch reporting.",
      owner: user.name,
      status: "Active",
      priority: "High",
      startDate: nextDate(-10),
      dueDate: nextDate(21),
      members: [user.name, "Priya Shah", "Miguel Santos", "Ava Kim"],
      tags: ["Website", "Launch", "Engineering"],
      budget: { total: 85000, spent: 42800 },
    },
    workspaceId,
    { user },
  );
  const byName = Object.fromEntries(project.columns.map((column) => [column.name, column]));
  byName.Backlog.tasks.push(
    createTask(project.id, "Confirm launch scope", "Review milestone goals and mark any out-of-scope requests.", user.name, "High", nextDate(2), "Planning", "Sprint 1", "Content approvals"),
  );
  byName["To Do"].tasks.push(
    createTask(project.id, "Prepare stakeholder update", "Summarize schedule, budget, risks, and next actions.", "Ava Kim", "Medium", nextDate(3), "Reporting", "Sprint 1"),
  );
  byName["In Progress"].tasks.push(
    createTask(project.id, "Build dashboard widgets", "Add project totals, overdue items, and progress indicators.", "Priya Shah", "High", nextDate(5), "UI, Analytics", "Sprint 1"),
  );
  byName["In Review"].tasks.push(
    createTask(project.id, "Validate analytics events", "Confirm all launch flows emit the correct tracking events.", "Miguel Santos", "Medium", nextDate(8), "QA, Analytics", "Sprint 1"),
  );
  byName.Blocked.tasks.push(
    createTask(project.id, "Finalize pricing copy", "Waiting on stakeholder approval before QA freeze.", "Ava Kim", "Urgent", nextDate(1), "Content", "Sprint 1", "Marketing approval"),
  );
  byName.Done.tasks.push(
    createTask(project.id, "Create initial project board", "Set up columns and seed the first delivery plan.", user.name, "Low", nextDate(-2), "Setup", "Sprint 1"),
  );
  byName.Done.tasks[0].status = "Done";
  byName.Done.tasks[0].tracked = 2;
  project.risks = [
    {
      id: createId(),
      title: "Content approvals may slip",
      level: "High",
      owner: "Ava Kim",
      mitigation: "Assign daily owner and escalate unresolved copy decisions.",
    },
    {
      id: createId(),
      title: "Analytics tags incomplete",
      level: "Medium",
      owner: "Miguel Santos",
      mitigation: "Validate tracking checklist before QA freeze.",
    },
  ];
  return project;
}

function createTask(projectId, title, description, assignee, priority, dueDate, labels, sprint, dependency = "") {
  const subtasks = ["Define done criteria", "Complete implementation", "Review and close"].map((item, index) => ({
    id: createId(),
    title: item,
    done: index === 0,
  }));
  return {
    id: createId(),
    projectId,
    title,
    description,
    assignee,
    reporter: "John Doe",
    priority,
    status: "",
    startDate: todayIso(),
    dueDate,
    labels: normalizeList(labels),
    sprint,
    milestone: "Launch review",
    parentTask: "",
    subtasks,
    attachments: [],
    comments: [],
    activity: [],
    estimate: priority === "Urgent" ? 8 : priority === "High" ? 6 : 3,
    tracked: priority === "High" ? 2 : 0.5,
    dependency,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function loadData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.warn("ProjectFlow data was reset because it could not be parsed.", error);
    }
  }

  const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
  if (legacy) {
    try {
      return migrateLegacyData(JSON.parse(legacy));
    } catch (error) {
      console.warn("ProjectFlow legacy data could not be migrated.", error);
    }
  }

  return seedData();
}

function migrateLegacyData(legacy) {
  const user = legacy.users?.[0] || {
    id: createId(),
    name: "John Doe",
    email: "john@example.com",
    password: "123456",
  };
  user.role = user.role || "Owner";
  user.team = user.team || "Core Team";
  user.avatar = user.avatar || initials(user.name);
  const workspace = createWorkspace("ProjectFlow Workspace", user);
  user.workspaceIds = [workspace.id];
  const projects = safeList(legacy.projects).map((project) => migrateProject(project, workspace.id, user));
  return normalizeData({
    users: [user, ...safeList(legacy.users).filter((item) => item.id !== user.id)],
    workspaces: [workspace],
    teams: seedTeams(workspace.id),
    projects,
    goals: [createGoalRecord(workspace.id, user.name)],
    documents: seedDocuments(workspace.id, projects),
    files: seedFiles(workspace.id, projects),
    notifications: [],
    activity: safeList(legacy.activity).map((item) => ({ ...item, workspaceId: workspace.id })),
    automations: seedAutomations(workspace.id),
  });
}

function migrateProject(project, workspaceId, user) {
  const migrated = {
    ...project,
    workspaceId,
    userId: user.id,
    owner: project.owner || user.name,
    icon: project.icon || initials(project.name),
    priority: project.priority || "Medium",
    startDate: project.startDate || project.createdAt || todayIso(),
    dueDate: project.dueDate || project.endDate || nextDate(30),
    tags: safeList(project.tags),
    budget: project.budget || { total: 50000, spent: 0 },
    milestones: safeList(project.milestones).map((milestone) => ({
      id: milestone.id || createId(),
      name: milestone.name,
      description: milestone.description || "Project checkpoint",
      date: milestone.date || nextDate(14),
      status: milestone.status || (milestone.done ? "Completed" : "Planned"),
      progress: Number(milestone.progress ?? (milestone.done ? 100 : 20)),
      done: Boolean(milestone.done),
    })),
    sprints: safeList(project.sprints),
    risks: safeList(project.risks),
    alerts: safeList(project.alerts),
    activity: safeList(project.activity),
    columns: safeList(project.columns).length
      ? project.columns
      : TASK_STATUSES.map((name) => ({ id: createId(), name, tasks: [] })),
  };
  migrated.columns = migrated.columns.map((column) => ({
    id: column.id || createId(),
    name: column.name === "Review" ? "In Review" : column.name,
    tasks: safeList(column.tasks).map((task) => normalizeTask(task, migrated.id, column.name)),
  }));
  return migrated;
}

function normalizeData(data) {
  const normalized = {
    users: safeList(data.users),
    workspaces: safeList(data.workspaces),
    teams: safeList(data.teams),
    projects: safeList(data.projects),
    goals: safeList(data.goals),
    documents: safeList(data.documents),
    files: safeList(data.files),
    notifications: safeList(data.notifications),
    activity: safeList(data.activity),
    automations: safeList(data.automations),
  };

  if (!normalized.users.length || !normalized.workspaces.length) return seedData();

  normalized.users.forEach((user) => {
    user.role = user.role || "Member";
    user.avatar = user.avatar || initials(user.name);
    user.workspaceIds = safeList(user.workspaceIds);
    if (!user.workspaceIds.length) user.workspaceIds.push(normalized.workspaces[0].id);
  });

  normalized.workspaces.forEach((workspace) => {
    workspace.settings = {
      defaultTaskView: "Board",
      theme: "Light",
      mentions: true,
      deadlines: true,
      comments: true,
      startWeek: "Monday",
      ...(workspace.settings || {}),
    };
    workspace.savedFilters = safeList(workspace.savedFilters);
  });

  normalized.projects = normalized.projects.map((project) => {
    const workspaceId = project.workspaceId || normalized.workspaces[0].id;
    return migrateProject(project, workspaceId, normalized.users[0]);
  });

  if (!normalized.teams.length) {
    normalized.teams = normalized.workspaces.flatMap((workspace) => seedTeams(workspace.id));
  }

  normalized.workspaces.forEach((workspace) => {
    const projects = normalized.projects.filter((project) => project.workspaceId === workspace.id);
    if (!normalized.documents.some((document) => document.workspaceId === workspace.id)) {
      normalized.documents.push(...seedDocuments(workspace.id, projects));
    }
    if (!normalized.files.some((file) => file.workspaceId === workspace.id)) {
      normalized.files.push(...seedFiles(workspace.id, projects));
    }
    if (!normalized.automations.some((automation) => automation.workspaceId === workspace.id)) {
      normalized.automations.push(...seedAutomations(workspace.id));
    }
  });

  return normalized;
}

function normalizeTask(task, projectId, columnName) {
  return {
    ...task,
    projectId,
    assignee: task.assignee || "Unassigned",
    reporter: task.reporter || "System",
    priority: task.priority || "Medium",
    status: task.status || columnName,
    startDate: task.startDate || task.createdAt || todayIso(),
    dueDate: task.dueDate || "",
    labels: safeList(task.labels),
    sprint: task.sprint || "",
    milestone: task.milestone || "",
    parentTask: task.parentTask || "",
    subtasks: safeList(task.subtasks || task.checklist).map((item) => ({
      id: item.id || createId(),
      title: item.title || item.text,
      done: Boolean(item.done),
    })),
    attachments: safeList(task.attachments),
    comments: safeList(task.comments),
    activity: safeList(task.activity),
    estimate: Number(task.estimate || 0),
    tracked: Number(task.tracked || 0),
    dependency: task.dependency || "",
    createdAt: task.createdAt || new Date().toISOString(),
    updatedAt: task.updatedAt || new Date().toISOString(),
  };
}

function seedData() {
  const user = {
    id: createId(),
    name: "John Doe",
    email: "john@example.com",
    password: "123456",
    role: "Owner",
    team: "Core Team",
    avatar: "JD",
    workspaceIds: [],
  };
  const workspace = createWorkspace("ProjectFlow Demo Workspace", user);
  user.workspaceIds.push(workspace.id);
  const projects = [
    createStarterProject(user, workspace.id, "Website Relaunch"),
    createStarterProject(user, workspace.id, "Mobile App Sprint"),
    createStarterProject(user, workspace.id, "Marketing Campaign"),
  ];
  projects[1].status = "At Risk";
  projects[1].priority = "Urgent";
  projects[1].dueDate = nextDate(10);
  projects[2].status = "Planning";
  projects[2].priority = "Medium";
  projects[2].dueDate = nextDate(45);

  return {
    users: [
      user,
      {
        id: createId(),
        name: "Priya Shah",
        email: "priya@example.com",
        password: "123456",
        role: "Team Lead",
        team: "Engineering",
        avatar: "PS",
        workspaceIds: [workspace.id],
      },
      {
        id: createId(),
        name: "Miguel Santos",
        email: "miguel@example.com",
        password: "123456",
        role: "Member",
        team: "QA",
        avatar: "MS",
        workspaceIds: [workspace.id],
      },
    ],
    workspaces: [workspace],
    teams: seedTeams(workspace.id),
    projects,
    goals: [
      createGoalRecord(workspace.id, user.name),
      {
        id: createId(),
        workspaceId: workspace.id,
        title: "Reduce overdue delivery work",
        description: "Keep overdue open tasks under five across the active portfolio.",
        owner: "Priya Shah",
        target: "Under 5 overdue tasks",
        progress: 68,
        deadline: nextDate(40),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    documents: seedDocuments(workspace.id, projects),
    files: seedFiles(workspace.id, projects),
    notifications: [
      {
        id: createId(),
        workspaceId: workspace.id,
        userId: user.id,
        title: "Design review due soon",
        message: "Website Relaunch has a milestone approaching this week.",
        type: "milestone",
        entityId: projects[0].id,
        read: false,
        at: new Date().toISOString(),
      },
      {
        id: createId(),
        workspaceId: workspace.id,
        userId: user.id,
        title: "Blocked task needs attention",
        message: "Finalize pricing copy is waiting on approval.",
        type: "task",
        entityId: projects[0].id,
        read: false,
        at: new Date().toISOString(),
      },
    ],
    activity: [
      {
        id: createId(),
        workspaceId: workspace.id,
        userId: user.id,
        message: "Created demo workspace",
        at: new Date().toISOString(),
      },
    ],
    automations: seedAutomations(workspace.id),
  };
}

function seedTeams(workspaceId) {
  return [
    {
      id: createId(),
      workspaceId,
      name: "Core Delivery",
      lead: "John Doe",
      description: "Project managers, engineering, QA, and launch owners.",
      members: [
        { name: "John Doe", role: "Project Manager", capacity: 34, availability: "Available" },
        { name: "Priya Shah", role: "Team Lead", capacity: 32, availability: "Focused" },
        { name: "Miguel Santos", role: "QA Engineer", capacity: 30, availability: "Available" },
        { name: "Ava Kim", role: "Designer", capacity: 28, availability: "Limited" },
      ],
    },
  ];
}

function seedDocuments(workspaceId, projects) {
  return projects.flatMap((project) => [
    {
      id: createId(),
      workspaceId,
      projectId: project.id,
      title: `${project.name} charter`,
      content: "Scope, outcomes, stakeholders, constraints, and approval criteria for the project.",
      owner: project.owner,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: createId(),
      workspaceId,
      projectId: project.id,
      title: `${project.name} launch checklist`,
      content: "QA evidence, release notes, rollback plan, stakeholder approval, and final review.",
      owner: project.owner,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);
}

function seedFiles(workspaceId, projects) {
  return projects.flatMap((project) => [
    {
      id: createId(),
      workspaceId,
      projectId: project.id,
      name: `${project.name} Requirements.pdf`,
      type: "PDF",
      size: "1.8 MB",
      owner: project.owner,
      uploadedAt: nextDate(-4),
    },
    {
      id: createId(),
      workspaceId,
      projectId: project.id,
      name: `${project.name} Assets.zip`,
      type: "ZIP",
      size: "12.4 MB",
      owner: "Ava Kim",
      uploadedAt: nextDate(-2),
    },
  ]);
}

function seedAutomations(workspaceId) {
  return [
    {
      id: createId(),
      workspaceId,
      when: "task status becomes Done",
      condition: "the task belongs to an active project",
      action: "notify the project owner",
      enabled: true,
    },
    {
      id: createId(),
      workspaceId,
      when: "due date is tomorrow",
      condition: "task is not Done",
      action: "notify the assignee",
      enabled: true,
    },
    {
      id: createId(),
      workspaceId,
      when: "priority becomes Urgent",
      condition: "task is assigned to a team member",
      action: "notify the team lead",
      enabled: true,
    },
  ];
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
}

function openModal(id) {
  document.getElementById(id)?.classList.remove("hidden");
}

function closeModal(id) {
  document.getElementById(id)?.classList.add("hidden");
}

function closeAllModals() {
  ["project-modal", "task-modal", "column-modal", "goal-modal", "document-modal", "file-modal", "command-modal", "help-modal"].forEach(closeModal);
  els.quickCreatePanel.classList.add("hidden");
  els.notificationPanel.classList.add("hidden");
}

function toast(message) {
  const element = document.createElement("div");
  element.className = "toast";
  element.textContent = message;
  els.toastRegion.append(element);
  setTimeout(() => element.remove(), 2600);
}

function parseSubtasks(value) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => ({
      id: createId(),
      title: line.replace(/^\[x\]\s*/i, ""),
      done: /^\[x\]/i.test(line),
    }));
}

function normalizeList(value, fallback = "", separator = ",") {
  const source = Array.isArray(value) ? value.join(separator) : String(value || "");
  const items = source
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean);
  if (!items.length && fallback) return [fallback];
  return [...new Set(items)];
}

function safeList(value) {
  return Array.isArray(value) ? value : [];
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function sum(items, key) {
  return Math.round(items.reduce((total, item) => total + Number(item[key] || 0), 0) * 100) / 100;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function createId() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
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
  if (!value) return "TBD";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

function formatShortDate(value) {
  if (!value) return "TBD";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
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
  const today = new Date(`${todayIso()}T00:00:00`);
  const due = new Date(`${value}T00:00:00`);
  return due < today;
}

function priorityColor(priority) {
  return {
    Urgent: "red",
    High: "red",
    Medium: "orange",
    Low: "green",
    None: "gray",
  }[priority] || "gray";
}

function statusColor(status) {
  return {
    Planning: "gray",
    Active: "blue",
    "On Hold": "orange",
    "At Risk": "red",
    Completed: "green",
    Archived: "gray",
  }[status] || "gray";
}

function fileIcon(type) {
  const normalized = String(type || "").toLowerCase();
  if (normalized.includes("pdf")) return "fa-file-pdf";
  if (normalized.includes("png") || normalized.includes("jpg") || normalized.includes("image")) return "fa-file-image";
  if (normalized.includes("zip")) return "fa-file-zipper";
  if (normalized.includes("doc")) return "fa-file-word";
  return "fa-file-lines";
}

function currency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function initials(name = "?") {
  return String(name)
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

function escapeAttribute(value = "") {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

window.openModal = openModal;
window.toggleAllTaskSelection = toggleAllTaskSelection;
