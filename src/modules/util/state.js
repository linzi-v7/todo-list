let instance = null;

class AppState {
  #projects = [];
  #currentProjectID = 0;

  constructor() {
    if (instance) throw new Error("Only one instance of AppState is allowed");

    instance = this;
  }

  //refactor this to use promises for better async handling later
  initialize() {
    const savedState = localStorage.getItem("todoAppState");
    if (savedState) {
      console.log("Loading saved state from localStorage");
      console.log("Saved state:", savedState);
      const { projects, currentProjectID } = JSON.parse(savedState);
      this.#projects = projects;
      this.#currentProjectID = currentProjectID;
    } else {
      this.#projects = [];
      this.#currentProjectID = 0;
      return false; //user first time using the app, show welcome screen
    }

    return true;
  }

  //use this to save current state without overwriting the entire state
  saveInternalState() {
    console.log("Saving internal state to localStorage");
    const state = {
      projects: this.projects,
      currentProjectID: this.currentProjectID,
    };
    localStorage.setItem("todoAppState", JSON.stringify(state));
  }

  clearState() {
    console.log("Clearing state from localStorage");
    localStorage.removeItem("todoAppState");
    this.#projects = [];
    this.#currentProjectID = 0;
  }

  //use this to save the entire state, overwriting any existing state
  saveCustomState(state) {
    if (typeof state !== "object" || !state) {
      throw new Error("State must be a valid object");
    }

    if (!Array.isArray(state.projects)) {
      throw new Error("State.projects must be an array");
    }
    if (state.currentProjectID !== null && typeof state.currentProjectID !== "number") {
      throw new Error("State.currentProjectID must be a number or null");
    }

    localStorage.setItem("todoAppState", JSON.stringify(state));
  }

  get projects() {
    return this.#projects;
  }

  get currentProjectID() {
    return this.#currentProjectID;
  }

  set currentProjectID(id) {
    console.log("test set currentProjectID");
    if (typeof id !== "number") {
      throw new Error("Current project ID must be a number");
    }
    this.#currentProjectID = id;
    this.saveInternalState();
  }

  set projects(projects) {
    console.log("test set projects");
    if (!Array.isArray(projects)) {
      throw new Error("Projects must be an array");
    }
    this.#projects = projects;
    this.saveInternalState();
  }

  get state() {
    return {
      projects: this.#projects,
      currentProjectID: this.#currentProjectID,
    };
  }
}

const appState = Object.freeze(new AppState());
export { appState };
