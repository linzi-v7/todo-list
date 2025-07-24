import { todoController } from "../controllers/todoController.js";
import { toDoStatus, DialogActionType } from "../util/enums.js";
import { eventBus } from "../util/eventBus.js";
import { EventType } from "../util/enums.js";
import { assets } from "../util/assets.js";
import { dialogController } from "../controllers/dialogController.js";

class ToDoView {
  #todoList = document.querySelector(".todo-list");

  constructor() {
    this.#attachEventListeners();
    this.#subscribeToEvents();
  }

  /**
   * Subscribes to events to perform specific, granular DOM updates.
   */
  #subscribeToEvents() {
    // Instead of re-rendering all, call specific methods
    eventBus.subscribe(EventType.TODO_ADD, this.addTodo.bind(this));
    eventBus.subscribe(EventType.TODO_REMOVE, this.removeTodo.bind(this));
    eventBus.subscribe(EventType.TODO_UPDATE, this.updateTodo.bind(this));
  }

  /**
   * Attaches a single, delegated event listener to the main list.
   */
  #attachEventListeners() {
    this.#todoList.addEventListener("click", this.#handleTodoAction.bind(this));
  }

  /**
   * Renders the initial list of todos for a project.
   * This is the only time we should build the entire list at once.
   * @param {number} projectId
   */
  renderTodos(projectId) {
    const todos = todoController.getTodosByProjectID(projectId);
    this.#todoList.innerHTML = ""; // Clear the list for a new project

    // Sort before rendering
    todos.sort((a, b) => b.priority - a.priority);

    const todoElements = todos.map((todo) => this.#buildTodoItemHTML(todo)).join("");
    this.#todoList.innerHTML = todoElements;
  }

  // --- Granular DOM Update Methods --- //

  /**
   * Adds a single todo item to the list without a full re-render.
   * @param {object} todo - The new todo object.
   */
  addTodo(todo) {
    // A real implementation would need to re-sort or insert at the correct position.
    // For simplicity here, we'll append. Re-calling renderTodos is also an option if sorting is critical on every add.
    const todoItemHTML = this.#buildTodoItemHTML(todo);
    this.#todoList.insertAdjacentHTML("beforeend", todoItemHTML);
  }

  /**
   * Removes a single todo item from the list.
   * @param {number} todoId - The ID of the todo to remove.
   */
  removeTodo(todoId) {
    const todoItem = this.#todoList.querySelector(`[data-todo-id="${todoId}"]`);
    if (todoItem) {
      todoItem.remove();
    }
  }

  /**
   * Updates a single existing todo item in place.
   * @param {object} updatedTodo - The todo object with updated data.
   */
  updateTodo(updatedTodo) {
    const oldTodoItem = this.#todoList.querySelector(`[data-todo-id="${updatedTodo.id}"]`);
    if (oldTodoItem) {
      const updatedHTML = this.#buildTodoItemHTML(updatedTodo);
      // Use outerHTML to replace the element itself
      oldTodoItem.outerHTML = updatedHTML;
    }
  }

  /**
   * Handles all click events within the todo list using event delegation.
   * @param {Event} e
   */
  #handleTodoAction(e) {
    const target = e.target;
    const todoItem = target.closest(".todo-item");
    if (!todoItem) return;

    const todoId = Number(todoItem.dataset.todoId);
    const todo = todoController.getTodoByID(todoId);
    if (!todo) return;

    const action = target.dataset.action;

    switch (action) {
      case "toggleComplete":
        todo.toggleCompletion();
        // Publish the update event. The view itself will listen and update the item.
        eventBus.publish(EventType.TODO_UPDATE, todo);
        break;
      case "view":
        dialogController.openDialog(DialogActionType.VIEW_TODO, todo);
        break;
      case "edit":
        dialogController.openDialog(DialogActionType.EDIT_TODO, todo);
        break;
      case "delete":
        dialogController.openDialog(DialogActionType.DELETE_TODO, todo);
        break;
    }
  }

  /**
   * Builds the HTML string for a single todo item.
   * @param {object} todo
   * @returns {string} HTML string
   */
  #buildTodoItemHTML(todo) {
    const isCompleted = todo.status === toDoStatus.COMPLETED;
    return `
      <li class="todo-item" data-status="${todo.status}" data-todo-id="${todo.id}">
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
            <span class="todo-duedate">Due: ${todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : "No due date"}</span>
          </div>
          <div class="todo-actions">
            <button title="View Details" data-action="view"><img src="${assets.infoIcon}" alt="View Details" data-action="view"></button>
            <button title="Edit Todo" data-action="edit"><img src="${assets.editIcon}" alt="Edit Todo" data-action="edit"></button>
            <button title="Delete Todo" data-action="delete"><img src="${assets.deleteIcon}" alt="Delete Todo" data-action="delete"></button>
          </div>
        </div>
        <input type="checkbox" class="todo-checkbox" title="Mark as Completed" data-action="toggleComplete" ${isCompleted ? "checked" : ""}>
      </li>
    `;
  }
}

export const todoView = new ToDoView();
