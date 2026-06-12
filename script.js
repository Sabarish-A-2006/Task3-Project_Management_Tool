const STORAGE_KEY = "projectflow-data-v1";
const DEFAULT_COLUMNS = ["Backlog", "To Do", "In Progress", "Review", "Done"];

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
  projectBoard: $("#project-board"),
  workspaceStats: $("#workspace-stats"),
  reportsStats: $("#reports-stats"),
  projectsList: $("#projects-list"),
  projectSearch: $("#project-search"),
  projectStatusFilter: $("#project-status-filter"),
  createProjectBtn: $("#create-project-btn"),
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

  els.projectsView.classList.toggle("hidden", view !== "projects");
  els.reportsView.classList.toggle("hidden", view !== "reports");
  els.projectBoard.classList.toggle("hidden", view !== "project");

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
    els.viewTitle.textContent = "Reports";
    renderReports();
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

  if (!filtered.length) {
    els.projectsList.innerHTML =
      '<div class="empty-state">No matching projects. Create a project to begin planning.</div>';
    return;
  }

  els.projectsList.innerHTML = filtered.map(renderProjectCard).join("");
  $$(".project-card").forEach((card) => {
    card.addEventListener("click", () => openProject(card.dataset.id));
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
    ["Estimate", `${stats.estimate}h`],
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

function getWorkspaceStats(projects) {
  const allTasks = projects.flatMap((project) =>
    project.columns.flatMap((column) => column.tasks),
  );

  return {
    projects: projects.length,
    active: projects.filter((project) => project.status === "Active").length,
    tasks: allTasks.length,
    overdue: allTasks.filter((task) => isOverdue(task.dueDate)).length,
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
