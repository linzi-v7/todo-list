import { ToDo } from "./todo.js";
class Project {
  currentTodoID = 0;

  #title;

  id;
  description;
  creationDate;
  todoList;
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.creationDate = new Date();
    this.todoList = [];
  }

  set title(title) {
    if (title.length < 1) {
      throw new Error("Title cannot be empty");
    }
    this.#title = title;
  }

  get title() {
    return this.#title;
  }

  get numOfTodos() {
    return this.todoList.length;
  }

  addTodo(title, description, dueDate, priority, notes, status = "TODO") {
    this.currentTodoID++;
    this.todoList.push(
      new ToDo(
        this.currentTodoID,
        title,
        description,
        dueDate,
        priority,
        notes,
        status,
        this.id
      )
    );
  }

  removeTodo(id) {
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
  }

  updateTodo(id, title, description, dueDate, priority, notes, status) {
    this.todoList = this.todoList.map((todo) => {
      if (todo.id === id) {
        todo.title = title;
        todo.description = description;
        todo.dueDate = dueDate;
        todo.priority = priority;
        todo.notes = notes;
        todo.status = status;
      }
      return todo;
    });
  }

  getTodoByID(id) {
    return this.todoList.find((todo) => todo.id === id);
  }

  listTodos() {
    this.todoList.forEach((todo) => {
      console.log(
        "\n ID:" +
          todo.id +
          "\n Project ID:" +
          todo.projectID +
          "\n Title:" +
          todo.title +
          "\n Description:" +
          todo.description +
          "\n Due Date:" +
          todo.dueDate +
          "\n Priority:" +
          todo.priority +
          "\n Notes:" +
          todo.notes +
          "\n Status:" +
          todo.status +
          "\n Creation Date:" +
          todo.creationDate
      );
    });
  }
}

export { Project };
