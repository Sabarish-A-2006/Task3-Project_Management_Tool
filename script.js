// Simple in-memory database
const db = {
  users: [
    { id: 1, name: "John Doe", email: "john@example.com", password: "123456" },
  ],
  projects: [
    {
      id: 1,
      name: "First Project",
      userId: 1,
      columns: [
        {
          id: 1,
          name: "To Do",
          tasks: [
            { id: 1, title: "Task 1", description: "Do something" },
            { id: 2, title: "Task 2", description: "Do something else" },
          ],
        },
        {
          id: 2,
          name: "In Progress",
          tasks: [{ id: 3, title: "Task 3", description: "Working on it" }],
        },
        { id: 3, name: "Done", tasks: [] },
      ],
    },
  ],
  currentUser: null,
  currentProject: null,
};

// DOM Elements
const authContainer = document.getElementById("auth-container");
const appContainer = document.getElementById("app-container");
const loginForm = document.querySelector(".auth-form");
const registerForm = document.getElementById("register-form");
const showRegister = document.getElementById("show-register");
const showLogin = document.getElementById("show-login");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const logoutBtn = document.getElementById("logout-btn");
const usernameDisplay = document.getElementById("username");
const projectsList = document.getElementById("projects-list");
const createProjectBtn = document.getElementById("create-project-btn");
const projectBoard = document.getElementById("project-board");
const backToProjects = document.getElementById("back-to-projects");
const boardColumns = document.getElementById("board-columns");
const projectTitle = document.getElementById("project-title");
const taskModal = document.getElementById("task-modal");
const projectModal = document.getElementById("project-modal");

// Event Listeners
showRegister.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
});

showLogin.addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});

loginBtn.addEventListener("click", handleLogin);
registerBtn.addEventListener("click", handleRegister);
logoutBtn.addEventListener("click", handleLogout);
createProjectBtn.addEventListener("click", () =>
  projectModal.classList.remove("hidden")
);
backToProjects.addEventListener("click", showProjectsView);
document
  .getElementById("close-project-modal")
  .addEventListener("click", () => projectModal.classList.add("hidden"));
document
  .getElementById("save-project-btn")
  .addEventListener("click", createProject);
document
  .getElementById("close-task-modal")
  .addEventListener("click", () => taskModal.classList.add("hidden"));

// Functions
function handleLogin() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const user = db.users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    db.currentUser = user;
    authContainer.classList.add("hidden");
    appContainer.classList.remove("hidden");
    usernameDisplay.textContent = user.name;
    renderProjects();
  } else {
    alert("Invalid credentials");
  }
}

function handleRegister() {
  const name = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  const userExists = db.users.some((u) => u.email === email);
  if (userExists) {
    alert("User already exists");
    return;
  }

  const newUser = {
    id: db.users.length + 1,
    name,
    email,
    password,
  };

  db.users.push(newUser);
  db.currentUser = newUser;

  authContainer.classList.add("hidden");
  appContainer.classList.remove("hidden");
  usernameDisplay.textContent = newUser.name;
  renderProjects();

  // Switch back to login form for next time
  registerForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
}

function handleLogout() {
  db.currentUser = null;
  db.currentProject = null;
  appContainer.classList.add("hidden");
  authContainer.classList.remove("hidden");
  projectBoard.classList.add("hidden");
}

function renderProjects() {
  if (!db.currentUser) return;

  const userProjects = db.projects.filter(
    (p) => p.userId === db.currentUser.id
  );

  if (userProjects.length === 0) {
    projectsList.innerHTML =
      "<p>No projects yet. Create your first project!</p>";
    return;
  }

  projectsList.innerHTML = userProjects
    .map(
      (project) => `
        <div class="project-card" data-id="${project.id}">
            <h3>${project.name}</h3>
            <p>${project.columns.reduce(
              (acc, col) => acc + col.tasks.length,
              0
            )} tasks</p>
        </div>
    `
    )
    .join("");

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () =>
      openProject(parseInt(card.getAttribute("data-id")))
    );
  });
}

function openProject(projectId) {
  db.currentProject = db.projects.find((p) => p.id === projectId);
  if (!db.currentProject) return;

  projectTitle.textContent = db.currentProject.name;
  renderBoardColumns();
  projectBoard.classList.remove("hidden");
}

function renderBoardColumns() {
  if (!db.currentProject) return;

  boardColumns.innerHTML = db.currentProject.columns
    .map(
      (column) => `
        <div class="column">
            <div class="column-header">
                <h3 class="column-title">${column.name}</h3>
            </div>
            <div class="task-list" data-column-id="${column.id}">
                ${column.tasks
                  .map(
                    (task) => `
                    <div class="task-card" data-id="${task.id}">
                        <h4>${task.title}</h4>
                        <p>${task.description || ""}</p>
                    </div>
                `
                  )
                  .join("")}
                <button class="add-task-btn" data-column-id="${
                  column.id
                }">+ Add Task</button>
            </div>
        </div>
    `
    )
    .join("");

  // Add event listeners to task cards
  document.querySelectorAll(".task-card").forEach((card) => {
    card.addEventListener("click", () =>
      openTaskModal(parseInt(card.getAttribute("data-id")))
    );
  });

  // Add event listeners to add task buttons
  document.querySelectorAll(".add-task-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const columnId = parseInt(btn.getAttribute("data-column-id"));
      createNewTask(columnId);
    });
  });
}

function openTaskModal(taskId) {
  if (!db.currentProject) return;

  let task = null;
  for (const column of db.currentProject.columns) {
    task = column.tasks.find((t) => t.id === taskId);
    if (task) break;
  }

  if (!task) return;

  document.getElementById("task-modal-title").textContent = task.title;
  document.getElementById("task-description").value = task.description || "";
  taskModal.classList.remove("hidden");

  // Update save button to save this specific task
  const saveBtn = document.getElementById("save-task-btn");
  saveBtn.onclick = () => saveTask(taskId);
}

function saveTask(taskId) {
  const description = document.getElementById("task-description").value;

  if (!db.currentProject) return;

  for (const column of db.currentProject.columns) {
    const task = column.tasks.find((t) => t.id === taskId);
    if (task) {
      task.description = description;
      break;
    }
  }

  taskModal.classList.add("hidden");
  renderBoardColumns();
}

function createNewTask(columnId) {
  const title = prompt("Enter task title:");
  if (!title) return;

  if (!db.currentProject) return;

  const column = db.currentProject.columns.find((c) => c.id === columnId);
  if (!column) return;

  const newTask = {
    id: Date.now(), // Simple unique ID
    title,
    description: "",
  };

  column.tasks.push(newTask);
  renderBoardColumns();
}

function createProject() {
  const name = document.getElementById("project-name").value;
  if (!name) {
    alert("Please enter a project name");
    return;
  }

  const newProject = {
    id: db.projects.length + 1,
    name,
    userId: db.currentUser.id,
    columns: [
      { id: 1, name: "To Do", tasks: [] },
      { id: 2, name: "In Progress", tasks: [] },
      { id: 3, name: "Done", tasks: [] },
    ],
  };

  db.projects.push(newProject);
  projectModal.classList.add("hidden");
  document.getElementById("project-name").value = "";
  renderProjects();
}

function showProjectsView() {
  projectBoard.classList.add("hidden");
  db.currentProject = null;
}

// Initialize
if (db.currentUser) {
  authContainer.classList.add("hidden");
  appContainer.classList.remove("hidden");
  usernameDisplay.textContent = db.currentUser.name;
  renderProjects();
}
