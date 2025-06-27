//module to manage the dialog functionality in the application
//to create subwindows for adding, editing, viewing, and deleting todos and projects

import { ProjectController } from "./projectController.js";

//DOM dialog elements
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
        <p class="view-field" data-field="dueDate"></p>
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
          <span class="info-value" data-field="title"></span>
        </div>

        <div class="info-group">
          <span class="info-label">Description:</span>
          <span class="info-value" data-field="description"></span>
        </div>

        <div class="info-group">
          <span class="info-label">Creation Date:</span>
          <span class="info-value" data-field="created"></span>
        </div>
        <div class="info-group">
          <span class="info-label">Task Count:</span>
          <span class="info-value" data-field="numOfTodos"></span>
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

class DialogController {
  constructor() {
    this.elements = elements;
    this.templates = {
      //Todo templates
      addTodo: templates.createTodoFormTemplate(),
      editTodo: templates.createTodoFormTemplate(),
      viewTodo: templates.createTodoViewTemplate(),
      deleteTodo: templates.createDeleteTemplate("todo"),

      //Project templates
      addProject: templates.createProjectFormTemplate(),
      editProject: templates.createProjectFormTemplate(),
      viewProject: templates.createProjectInfoTemplate(),
      deleteProject: templates.createDeleteTemplate("project"),
    };

    this.titleMap = {
      addTodo: "Add New Todo",
      editTodo: "Edit Todo",
      viewTodo: "Todo Details",
      deleteTodo: "Delete Todo",
      addProject: "Add New Project",
      editProject: "Edit Project",
      viewProject: "Project Information",
      deleteProject: "Delete Project",
    };
  }

  init() {
    this.elements.closeBtn.addEventListener("click", () => this.closeDialog());

    this.elements.cancelBtn.addEventListener("click", () =>
      this.elements.dialog.requestClose()
    );

    this.elements.dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      this.closeDialog();
    });

    this.elements.dialog.addEventListener("submit", (event) => {
      event.preventDefault();
      const action = this.elements.form.dataset.action;
      console.log(`Form submitted for action: ${action}`);
      // Handle form submission logic here
      this.closeDialog();
    });
  }

  openDialog(type, projectID = null, todoID = null) {
    console.log(`Opening dialog of type: ${type}`);

    this.init();

    this.elements.title.textContent = this.titleMap[type] || "Dialog";
    this.elements.content.innerHTML = this.templates[type];
    this.elements.form.dataset.action = type;

    let projectObject = null;
    let todoObject = null;

    if (projectID) {
      projectObject = ProjectController.getProjectByID(projectID);
    }

    if (todoID && projectID) {
      todoObject = projectObject.getTodoByID(todoID);
    }

    this.populateFormData({ project: projectObject, todo: todoObject });

    this.elements.dialog.showModal();
  }

  closeDialog() {
    this.elements.dialog.close();
    this.elements.content.innerHTML = "";
    this.elements.form.reset();
  }

  populateFormData(data) {
    const fields = this.elements.content.querySelectorAll("[data-field]");
    fields.forEach((field) => {
      const fieldName = field.dataset.field;
      if (data[fieldName] !== undefined) {
        if (field.tagName === "INPUT" || field.tagName === "SELECT") {
          field.value = data[fieldName];
        } else {
          field.textContent = data[fieldName];
        }
      }
    });
  }
}

export { DialogController };
