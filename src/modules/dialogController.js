//module to manage the dialog functionality in the application
//like creating subwindows for adding, editing, viewing, and deleting todos and projects
import { ProjectController } from "./projectController.js";
import { DialogActionType } from "./enums.js";

//DOM dialog elements enum
const elements = Object.freeze({
  dialog: document.querySelector(".todo-modal"),
  title: document.querySelector(".todo-modal-title"),
  form: document.querySelector(".todo-modal-form"),
  content: document.querySelector(".form-content"),
  closeBtn: document.querySelector(".todo-modal-close"),
  cancelBtn: document.querySelector(".todo-modal .cancel-button"),
});

// templates used to populate the dialog content dynamically
const templates = {
  createTodoFormTemplate() {
    return `
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" name="title" required>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" name="description"></textarea>
      </div>

      <div class="form-group">
        <label for="dueDate">Due Date</label>
        <input type="date" id="dueDate" name="dueDate">
      </div>

      <div class="form-group">
        <label for="priority">Priority</label>
        <select id="priority" name="priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      <div class="form-group">
        <label for="notes">Notes</label>
        <textarea id="notes" name="notes"></textarea>
      </div>

      <div class="form-group">
      <label for="status">Status</label>
      <select id="status" name="status">
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="in-review">In Review</option>
        <option value="on-hold">On Hold</option>
        <option value="completed">Completed</option>
      </select>
      </div>
    `;
  },

  createTodoViewTemplate() {
    return `
      <div class="form-group">
        <strong>Title:</strong>
        <p class="view-field" data-field="title"></p>
      </div>

      <div class="form-group">
        <strong>Description:</strong>
        <p class="view-field" data-field="description"></p>
      </div>

      <div class="form-group">
        <strong>Due Date:</strong>
        <p class="view-field" data-field="dueDate" data-type="date"></p>
      </div>

      <div class="form-group">
        <strong>Priority:</strong>
        <p class="view-field" data-field="priority"></p>
      </div>

      <div class="form-group">
        <strong>Notes:</strong>
        <p class="view-field" data-field="notes"></p>
      </div>

      <div class="form-group">
        <strong>Status:</strong>
        <p class="view-field" data-field="status"></p>
      </div>
    `;
  },

  createProjectFormTemplate() {
    return `
      <div class="form-group project-form">
        <label for="projectTitle">Project Title</label>
        <input type="text" id="projectTitle" name="title" required>
      </div>

      <div class="form-group">
        <label for="projectDescription">Description</label>
        <textarea id="projectDescription" name="description"></textarea>
      </div>
    `;
  },

  createProjectInfoTemplate() {
    return `
      <div class="project-info">

        <div class="info-group">
          <span class="info-label">Project Title:</span>
          <span class="view-field" data-field="title"></span>
        </div>

        <div class="info-group">
          <span class="info-label">Description:</span>
          <span class="view-field" data-field="description"></span>
        </div>

        <div class="info-group">
          <span class="info-label">Creation Date:</span>
          <span class="view-field" data-field="createdOn" data-type="date"></span>
        </div>
        <div class="info-group">
          <span class="info-label">Task Count:</span>
          <span class="view-field" data-field="numOfTodos"></span>
        </div>
      </div>
    `;
  },

  createDeleteTemplate(type) {
    return `
      <div class="delete-confirmation-message">
        <p>Are you sure you want to delete this ${type}?</p>
        <p class="warning-text">This action cannot be undone.</p>
      </div>
    `;
  },
};

// Map to associate dialog action types with titles
const titleMap = Object.freeze({
  [DialogActionType.ADD_TODO]: "Add New Todo",
  [DialogActionType.EDIT_TODO]: "Edit Todo",
  [DialogActionType.VIEW_TODO]: "Todo Details",
  [DialogActionType.DELETE_TODO]: "Delete Todo",
  [DialogActionType.ADD_PROJECT]: "Add New Project",
  [DialogActionType.EDIT_PROJECT]: "Edit Project",
  [DialogActionType.VIEW_PROJECT]: "Project Information",
  [DialogActionType.DELETE_PROJECT]: "Delete Project",
});

const templateMap = Object.freeze({
  [DialogActionType.ADD_TODO]: templates.createTodoFormTemplate(),
  [DialogActionType.EDIT_TODO]: templates.createTodoFormTemplate(),
  [DialogActionType.VIEW_TODO]: templates.createTodoViewTemplate(),
  [DialogActionType.DELETE_TODO]: templates.createDeleteTemplate("todo"),

  //Project templates
  [DialogActionType.ADD_PROJECT]: templates.createProjectFormTemplate(),
  [DialogActionType.EDIT_PROJECT]: templates.createProjectFormTemplate(),
  [DialogActionType.VIEW_PROJECT]: templates.createProjectInfoTemplate(),
  [DialogActionType.DELETE_PROJECT]: templates.createDeleteTemplate("project"),
});

class DialogController {
  constructor() {
    this.elements = elements;
  }

  openDialog(type, projectID = null, todoID = null) {
    console.log(`Opening dialog of type: ${type}`);

    this.#init();

    this.elements.title.textContent = titleMap[type] || "Dialog";
    this.elements.content.innerHTML = templateMap[type];
    this.elements.form.dataset.action = type;

    let projectObject = null;
    let todoObject = null;

    if (projectID) {
      projectObject = ProjectController.getProjectByID(projectID);
      this.elements.form.dataset.projectId = projectID || "";
    }

    if (todoID && projectID) {
      todoObject = projectObject.getTodoByID(todoID);
      this.elements.form.dataset.todoId = todoID || "";
    }

    this.#populateFormData(projectObject, todoObject);

    this.elements.dialog.showModal();
  }

  #init() {
    this.elements.closeBtn.addEventListener("click", () => this.#closeDialog());

    this.elements.cancelBtn.addEventListener("click", () =>
      this.elements.dialog.requestClose()
    );

    this.elements.dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      this.#closeDialog();
    });

    this.elements.dialog.addEventListener("submit", (event) => {
      event.preventDefault();
      const action = this.elements.form.dataset.action;
      console.log(`Form submitted for action: ${action}`);
      this.#handleSubmit(action, this.elements.form);
      this.#closeDialog();
    });
  }

  #closeDialog() {
    this.elements.dialog.close();
    this.elements.content.innerHTML = "";
    this.elements.form.reset();
  }

  #populateFormData(project, todo) {
    const action = this.elements.form.dataset.action;
    if (action === "editTodo" || action === "editProject") {
      this.#populateEditForm({ project, todo });
    } else if (action === "viewTodo" || action === "viewProject") {
      this.#populateViewForm({ project, todo });
    }
  }

  #populateEditForm({ project = null, todo = null }) {
    const fields = this.elements.form.querySelectorAll(
      "input[name], textarea[name], select[name]"
    );
    fields.forEach((field) => {
      const fieldName = field.name;

      field.value = todo
        ? todo[fieldName] || ""
        : project
          ? project[fieldName] || ""
          : "";

      if (field.type === "date" && todo && todo[fieldName]) {
        field.value = todo[fieldName].toISOString().split("T")[0];
      }
    });
  }

  #populateViewForm({ project = null, todo = null }) {
    const viewFields = this.elements.content.querySelectorAll(".view-field");
    viewFields.forEach((field) => {
      const fieldName = field.dataset.field;
      field.textContent = todo
        ? todo[fieldName] || ""
        : project
          ? project[fieldName] || ""
          : "";

      if (field.dataset.type === "date") {
        field.textContent = todo
          ? todo.creationDate.toLocaleDateString()
          : project
            ? project.creationDate.toLocaleDateString()
            : "";
      }
    });
  }

  #handleSubmit(action, form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const projectID = form.dataset.projectId;
    const todoID = form.dataset.todoId;
    let project = null;
    let todo = null;

    if (projectID) project = ProjectController.getProjectByID(projectID);

    if (todoID && projectID) todo = project.getTodoByID(todoID);

    switch (action) {
      case DialogActionType.ADD_TODO:
        project.addTodo(
          data.title,
          data.description,
          new Date(data.dueDate),
          data.priority,
          data.notes,
          data.status
        );
        break;

      case DialogActionType.EDIT_TODO:
        project.updateTodo(
          todoID,
          data.title,
          data.description,
          new Date(data.dueDate),
          data.priority,
          data.notes,
          data.status
        );
        break;

      case DialogActionType.DELETE_TODO:
        project.removeTodo(todoID);
        break;

      case DialogActionType.ADD_PROJECT:
        ProjectController.addProject(data.title, data.description);
        break;

      case DialogActionType.EDIT_PROJECT:
        ProjectController.updateProject(
          projectID,
          data.title,
          data.description
        );
        break;

      case DialogActionType.DELETE_PROJECT:
        ProjectController.deleteProject(projectID);
        break;

      default:
        console.log(`Unhandled action type: ${action}`);
        break;
    }
  }
}

export { DialogController };
