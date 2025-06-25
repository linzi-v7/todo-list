//module to manage the dialog functionality in the application

//DOM dialog elements
const elements = Object.freeze({
  dialog: document.querySelector(".todo-modal"),
  title: document.querySelector(".todo-modal-title"),
  form: document.querySelector(".todo-modal-form"),
  content: document.querySelector(".form-content"),
  closeBtn: document.querySelector(".todo-modal-close"),
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
    `;
  },

  createProjectFormTemplate() {
    return `
      <div class="form-group project-form">
        <label for="projectName">Project Name</label>
        <input type="text" id="projectName" name="name" required>
      </div>
      <div class="form-group">
        <label for="projectDescription">Description</label>
        <textarea id="projectDescription" name="description"></textarea>
      </div>
      <div class="form-group">
        <label for="projectColor">Color</label>
        <input type="color" id="projectColor" name="color" value="#4CAF50">
      </div>
    `;
  },

  createProjectInfoTemplate() {
    return `
      <div class="project-info">
        <div class="info-group">
          <span class="info-label">Project Name:</span>
          <span class="info-value" data-field="name"></span>
        </div>
        <div class="info-group">
          <span class="info-label">Description:</span>
          <span class="info-value" data-field="description"></span>
        </div>
        <div class="info-group">
          <span class="info-label">Created:</span>
          <span class="info-value" data-field="created"></span>
        </div>
        <div class="info-group">
          <span class="info-label">Tasks:</span>
          <span class="info-value" data-field="taskCount"></span>
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

class dialogController {
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

  openDialog(type, data = null) {
    this.elements.title.textContent = this.titleMap[type] || "Dialog";
    this.elements.content.innerHTML = this.templates[type];
    this.elements.form.dataset.action = type;

    if (data) {
      this.populateFormData(data);
    }

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

export { dialogController };
