import { EventType } from "../util/enums";
import { eventBus } from "../util/eventBus";
import { appState } from "../util/state.js";
import { renderWelcomeScreen, removeWelcomeScreen } from "./welcomeVIew.js";

class ProjectView {
  constructor() {
    eventBus.subscribe(EventType.PROJECT_ADD, this.renderSideBar.bind(this));
    eventBus.subscribe(EventType.PROJECT_FIRST_TIME_USE, removeWelcomeScreen.bind(this));
    //eventBus.subscribe(EventType.PROJECT_REMOVE, this.removeProject.bind(this));
    //eventBus.subscribe(EventType.PROJECT_UPDATE, this.updateProject.bind(this));
  }

  renderSideBar() {
    console.log("here in renderSideBar");
    const sidebar = document.querySelector(".project-sidebar .project-list");
    sidebar.innerHTML = "";

    const projects = appState.projects;

    projects.forEach((project) => {
      const projectElement = document.createElement("li");
      projectElement.classList.add("project-list-item");
      projectElement.textContent = project.title;
      projectElement.dataset.projectId = project.id;

      // each list item should open its own project view
      projectElement.addEventListener("click", () => {
        console.log("Project clicked:", project.id);
        // this.openProjectView(project.id);
      });

      sidebar.appendChild(projectElement);
    });
  }

  openProjectView(projectId = appState.lastChosenProjectID) {
    const project = appState.getProjectByID(projectId);
    if (!project) {
      console.error(`Project with ID ${projectId} not found`);
      return;
    }
    console.log("Opening project view for:", project.title);
    const projectInfo = document.querySelector(".project-info");
    projectInfo.innerHTML = `
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
            <img src="./assets/icons/add-icon.png" alt="Add Project" class="add-icon" />
            Add Todo
          </button>
        </div>
      </header>

                 <section class="stats-container">
                <div class="stat-card float-up" data-stat="total-tasks">
                    <div class="stat-value">${project.numOfTodos}</div>
                    <div class="stat-label">Total Tasks</div>
                </div>
                <div class="stat-card float-up" data-stat="in-progress">
                    <div class="stat-value">${project.getnumOfTodosByFilter(toDoStatus.IN_PROGRESS)}</div>
                    <div class="stat-label">In Progress</div>
                </div>
                <div class="stat-card float-up" data-stat="completed">
                    <div class="stat-value">${project.getnumOfTodosByFilter(toDoStatus.COMPLETED)}</div>
                    <div class="stat-label">Completed</div>
                </div>
                <div class="stat-card float-up" data-stat="on-hold">
                    <div class="stat-value">${project.getnumOfTodosByFilter(toDoStatus.ON_HOLD)}</div>
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
            ${project.todos
              .map(
                (todo) => `
                <li class="todo-item" data-status="${todo.status}">
                    <div class="priority-indicator-side priority-${todo.priority}" title="${todo.priority} Priority"></div>
                    <div class="todo-content">
                        <div class="todo-header">
                            <span class="todo-title">${todo.title}</span>
                            <span class="todo-status" title="Status">
                                <span class="status-indicator status-${todo.status}"></span>${todo.status}
                            </span>
                            <span class="todo-priority" title="Priority">
                                <span class="priority-indicator-small priority-${todo.priority}"></span>${todo.priority}
                            </span>
                            <span class="todo-duedate">Due: ${todo.dueDate ? todo.dueDate.toLocaleDateString() : "No due date"}</span>
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
                    <input type="checkbox" class="todo-checkbox" title="Mark as Completed" ${todo.status === toDoStatus.COMPLETED ? "checked" : ""} />
                </li>
            `
              )
              .join("")} 
            </ul>
        </main>
    </div>`;
  }
}

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

export const projectView = new ProjectView();
export { ProjectView };
