let instance = null;

class AppState {
  #projects = [];
  #currentProjectID = null;

  constructor() {
    if (instance) {
      throw new Error("Only one instance of AppState is allowed");
    }
    instance = this;
  }

  async initialize() {
    const savedState = localStorage.getItem("todoAppState");
    if (savedState) {
      const { projects, currentProjectID } = JSON.parse(savedState);
      this.#projects = projects;
      this.#currentProjectID = currentProjectID;
    } else {
      this.#projects = [];
      this.#currentProjectID = null;
      return false; //user first time using the app, show welcome screen
    }

    return true;
  }

  async save() {
    const state = {
      projects: this.#projects,
      currentProjectID: this.#currentProjectID,
    };
    localStorage.setItem("todoAppState", JSON.stringify(state));
  }

  get projects() {
    return this.#projects;
  }

  get currentProjectID() {
    return this.#currentProjectID;
  }

  set currentProjectID(id) {
    if (typeof id !== "number") {
      throw new Error("Current project ID must be a number");
    }
    this.#currentProjectID = id;
    this.save();
  }

  set projects(projects) {
    if (!Array.isArray(projects)) {
      throw new Error("Projects must be an array");
    }
    this.#projects = projects;
    this.save();
  }
}

const appState = Object.freeze(new AppState());
export { appState };
