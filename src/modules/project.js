import { ToDo } from "./todo.js";
class Project {
  currentTodoID = 0;

  #title;

  id;
  description;
  todoList;
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
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

  addTodo(title, description, dueDate, priority, notes) {
    this.currentTodoID++;
    this.todoList.push(
      new ToDo(this.currentTodoID, title, description, dueDate, priority, notes)
    );
  }

  removeTodo(id) {
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
  }

  updateTodo(id, title, description, dueDate, priority, notes) {
    this.todoList = this.todoList.map((todo) => {
      if (todo.id === id) {
        todo.title = title;
        todo.description = description;
        todo.dueDate = dueDate;
        todo.priority = priority;
        todo.notes = notes;
      }
      return todo;
    });
  }

  listTodos() {
    this.todoList.forEach((todo) => {
      console.log(
        "\n ID:" +
          todo.id +
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
