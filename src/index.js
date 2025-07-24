import "./styles.css";
import { Project } from "./modules/models/project.js";
import { projectController } from "./modules/controllers/projectController.js";
import { todoController } from "./modules/controllers/todoController.js";
import { ToDo } from "./modules/models/todo.js";
import { DialogActionType, priorityLevel, toDoStatus } from "./modules/util/enums.js";
import { dialogController } from "./modules/controllers/dialogController.js";
import { appState } from "./modules/util/state.js";
import { welcomeView } from "./modules/views/welcomeVIew.js";
import { projectView } from "./modules/views/projectView.js";

function startMainApp() {
  console.log("Starting main app...");
  const addProjectButton = document.querySelector(".add-project-button");
  addProjectButton.addEventListener("click", () => {
    console.log("Add Project button clicked");
    dialogController.openDialog(DialogActionType.ADD_PROJECT);
  });

  welcomeView.removeWelcomeScreen();
  welcomeView.renderMainSite();
  projectView.renderSideBar();
  projectView.openProjectView();

  // const project = projectController.addProject("My First Project", "This is a description of my first project");
  // const todo = new ToDo(
  //   1,
  //   "My First ToDo",
  //   "This is a description of my first todo",
  //   new Date(Date.now() + 86400000),
  //   priorityLevel.MEDIUM,
  //   "Some notes",
  //   toDoStatus.TODO,
  //   project.id
  // );
  // todoController.addTodo(project.id, todo);
}

function initializeApp() {
  appState.clearState(); // Clear state for testing purposes
  const isExistingUser = appState.initialize(); //will re

  console.log("App initialized with state:", appState);
  console.log("Projects: ", appState.projects);
  console.log("Current Project ID: ", appState.currentProjectID);

  if (isExistingUser) {
    startMainApp();
  } else {
    // First time use
    welcomeView.renderWelcomeScreen();
  }
}

document.addEventListener("DOMContentLoaded", initializeApp);
