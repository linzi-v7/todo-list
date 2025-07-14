class Project {
  #currentTodoID = 0;

  #title;

  id;
  description;
  creationDate;
  todos;
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.creationDate = new Date();
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

  getLatestTodoID() {
    return this.#currentTodoID;
  }

  incrementTodoID() {
    this.#currentTodoID++;
  }

  // set id(id) {
  //   throw new Error("ID cannot be changed");
  // }
}

export { Project };
