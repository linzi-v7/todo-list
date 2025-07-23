import { toDoStatus } from "./todo";

class Project {
  #currentTodoID = 0;

  #title;

  id;
  description;
  creationDate;
  todos;
  constructor(id, title, description, currentTodoID = 0) {
    console.log("Creating new project with ID:", id, "title:", title, "description:", description);
    this.id = id;
    this.#title = title;
    this.description = description;
    this.creationDate = new Date();
    this.#currentTodoID = currentTodoID;
    this.todos = [];
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
    return this.todos.length;
  }

  getnumOfTodosByFilter(status) {
    return this.todos.filter((todo) => todo.status === status).length;
  }

  getLatestTodoID() {
    return this.#currentTodoID;
  }

  incrementTodoID() {
    this.#currentTodoID++;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      creationDate: this.creationDate,
      todos: this.todos,
      _currentTodoID: this.#currentTodoID,
    };
  }

  static fromJSON(json) {
    const project = new Project(json.id, json.title, json.description, json._currentTodoID);
    project.creationDate = new Date(json.creationDate);
    project.todos = json.todos || [];
    return project;
  }
  // set id(id) {
  //   throw new Error("ID cannot be changed");
  // }
}

export { Project };
