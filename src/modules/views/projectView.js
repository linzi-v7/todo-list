import { assets } from "../util/assets.js";
import { projectController } from "../controllers/projectController.js";
import { todoView } from "./todoView.js";
import { EventType, toDoStatus, DialogActionType } from "../util/enums";
import { eventBus } from "../util/eventBus.js";
import { appState } from "../util/state.js";
import { dialogController } from "../controllers/dialogController.js";

class ProjectView {
  // Cache DOM elements for better performance and clarity
  #sidebarList = document.querySelector(".project-sidebar .project-list");
  #mainContent = document.querySelector(".project-info");

  constructor() {
    this.#attachEventListeners();
    this.#subscribeToEvents();
  }

  // Subscribes to application-wide events.
  #subscribeToEvents() {
    eventBus.subscribe(EventType.PROJECT_ADD, this.renderSideBar.bind(this));
    eventBus.subscribe(EventType.PROJECT_FIRST_TIME_USE, this.renderProject.bind(this));
  }

  #attachEventListeners() {
    this.#sidebarList.addEventListener("click", this.#handleProjectSelect.bind(this));
  }

  /**
   * Renders the list of projects in the sidebar.
   */
  renderSideBar() {
    const projects = appState.projects;
    this.#sidebarList.innerHTML = ""; // Clear existing projects

    const projectElements = projects.map((project) => {
      const projectElement = document.createElement("li");
      projectElement.className = "project-list-item";
      projectElement.textContent = project.title;
      projectElement.dataset.projectId = project.id;
      return projectElement;
    });

    this.#sidebarList.append(...projectElements);
  }

  /**
   * Renders the main view for a specific project.
   * @param {number} projectId - The ID of the project to render. Defaults to the first project.
   */
  renderProject(projectId = 1) {
    const project = projectController.getProjectByID(projectId);
    if (!project) {
      console.error(`Project with ID ${projectId} not found.`);
      this.#mainContent.innerHTML = `<p>Project not found. Please select one from the list.</p>`;
      return;
    }

    // 1. Render the HTML
    this.#mainContent.innerHTML = this.#buildProjectLayout(project);

    // 2. Bind events to the new HTML content
    this.#bindProjectContentEvents(project.id);

    // 3. Update the active state in the sidebar
    this.#updateActiveProject(projectId);

    // 4. Delegate todo rendering to the todoView
    todoView.renderTodos(project.id);
  }

  /**
   * Handles clicks within the sidebar project list.
   * @param {Event} e - The click event object.
   */
  #handleProjectSelect(e) {
    const projectItem = e.target.closest(".project-list-item");
    if (!projectItem) return; // Click was not on a project item

    const projectId = projectItem.dataset.projectId;
    this.renderProject(Number(projectId));
  }

  /**
   * Binds events to elements within the main project content area.
   * This is called *after* the content is rendered.
   * @param {number} projectId - The current project's ID.
   */
  #bindProjectContentEvents(projectId) {
    // Add Todo button
    const addTodoBtn = this.#mainContent.querySelector(".add-todo-button");
    addTodoBtn.addEventListener("click", () => {
      dialogController.openDialog(DialogActionType.ADD_TODO, projectId);
    });

    // Description toggle
    const descToggle = this.#mainContent.querySelector(".description-toggle");
    const desc = this.#mainContent.querySelector(".project-description");
    descToggle.addEventListener("click", () => {
      const isInactive = desc.classList.toggle("inactive");
      descToggle.textContent = isInactive ? "▼ Show Description" : "▲ Hide Description";
    });

    // Note: Filter button logic would also go here.
  }

  /**
   * Updates the 'active' class on the sidebar project list.
   * @param {number} activeProjectId - The ID of the project to mark as active.
   */
  #updateActiveProject(activeProjectId) {
    const projects = this.#sidebarList.querySelectorAll(".project-list-item");
    projects.forEach((p) => {
      p.classList.toggle("active", p.dataset.projectId == activeProjectId);
    });
  }

  // --- Private HTML Template Builders --- //

  #buildProjectLayout(project) {
    return `
      <header class="project-header">
        <div class="header-content">
          <h1 class="project-title">${project.title}</h1>
          <div class="description-container">
            <button class="description-toggle">▼ Show Description</button>
            <div class="project-description inactive">
              ${project.description || "No description available."}
            </div>
          </div>
        </div>
        <div class="header-actions">
          <button class="add-todo-button btn btn-primary float-up">
            <img src="${assets.addIcon}" alt="Add Project" class="add-icon" />
            Add Todo
          </button>
        </div>
      </header>
      <section class="stats-container">
        ${this.#buildStatCard("Total Tasks", project.numOfTodos, "total-tasks")}
        ${this.#buildStatCard("In Progress", project.getnumOfTodosByFilter(toDoStatus.IN_PROGRESS), "in-progress")}
        ${this.#buildStatCard("Completed", project.getnumOfTodosByFilter(toDoStatus.COMPLETED), "completed")}
        ${this.#buildStatCard("On Hold", project.getnumOfTodosByFilter(toDoStatus.ON_HOLD), "on-hold")}
      </section>
      <section class="project-controls">
        <div class="controls-header">
          <h2 class="controls-title">Task List</h2>
        </div>
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">All Tasks</button>
            <button class="filter-btn" data-filter="todo">Todo</button>
            <button class="filter-btn" data-filter="in-progress">In Progress</button>
            <button class="filter-btn" data-filter="in-review">In Review</button>
            <button class="filter-btn" data-filter="on-hold">On Hold</button>
            <button class="filter-btn" data-filter="completed">Completed</button>
        </div>
      </section>
      <ul class="todo-list"></ul>
    `;
  }

  #buildStatCard(label, value, statType) {
    return `
      <div class="stat-card float-up" data-stat="${statType}">
        <div class="stat-value">${value}</div>
        <div class="stat-label">${label}</div>
      </div>
    `;
  }
}

export const projectView = new ProjectView();
export { ProjectView };
/*
     <main class="project-info">
            <header class="project-header">
                <div class="header-content">
                    <h1 class="project-title">Project Title</h1>
                    <div class="description-container">
                        <button class="description-toggle">▼ Show Description</button>
                        <div class="project-description inactive">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                    </div>
                </div>
                <div class="header-actions">
                    <button class="add-todo-button btn btn-primary float-up">
                        <img src="./assets//icons/add-icon.png" alt="Add Project" class="add-icon" />
                        Add Todo
                    </button>

                    <!-- TODO:Add more actions here like editing project or deleting project later -->
                </div>
            </header>

            <section class="stats-container">
                <div class="stat-card float-up" data-stat="total-tasks">
                    <div class="stat-value">0</div>
                    <div class="stat-label">Total Tasks</div>
                </div>
                <div class="stat-card float-up" data-stat="in-progress">
                    <div class="stat-value">0</div>
                    <div class="stat-label">In Progress</div>
                </div>
                <div class="stat-card float-up" data-stat="completed">
                    <div class="stat-value">0</div>
                    <div class="stat-label">Completed</div>
                </div>
                <div class="stat-card float-up" data-stat="on-hold">
                    <div class="stat-value">0</div>
                    <div class="stat-label">On Hold</div>
                </div>
            </section>

            <section class="project-controls">
                <div class="controls-header">
                    <h2 class="controls-title">Task List</h2>
                </div>
                <div class="filter-buttons">
                    <button class="filter-btn active" data-filter="all">All Tasks</button>
                    <button class="filter-btn" data-filter="todo">Todo</button>
                    <button class="filter-btn" data-filter="in-progress">In Progress</button>
                    <button class="filter-btn" data-filter="in-review">In Review</button>
                    <button class="filter-btn" data-filter="on-hold">On Hold</button>
                    <button class="filter-btn" data-filter="completed">Completed</button>
                </div>
            </section>

            <ul class="todo-list">
                <li class="todo-item" data-status="in-progress">
                    <div class="priority-indicator-side priority-medium" title="Medium Priority"></div>
                    <div class="todo-content">
                        <div class="todo-header">
                            <span class="todo-title">Todo Test 1</span>
                            <span class="todo-status" title="Status"><span
                                    class="status-indicator status-in-progress"></span>In
                                Progress</span>
                            <span class="todo-priority" title="Priority"><span
                                    class="priority-indicator-small priority-medium"></span>Medium</span>
                            <span class="todo-duedate">Due: Jul 25</span>
                        </div>
                        <div class="todo-actions">
                            <button title="View Details">
                                <img src="./assets/icons/info-icon.svg" alt="View Details" />
                            </button>
                            <button title="Edit Todo">
                                <img src="./assets/icons/edit-icon.svg" alt="Edit Todo" />
                            </button>
                            <button title="Delete Todo">
                                <img src="./assets/icons/delete-icon.svg" alt="Delete Todo" />
                            </button>
                        </div>
                    </div>
                    <input type="checkbox" class="todo-checkbox" title="Mark as Completed" />
                </li>
            </ul>
        </main>
    </div>
    */
