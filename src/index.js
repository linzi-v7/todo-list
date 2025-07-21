import "./styles.css";
import { Project } from "./modules/project.js";
import { projectController } from "./modules/controllers/projectController.js";
import { todoController } from "./modules/controllers/todoController.js";
import { ToDo } from "./modules/models/todo.js";
import { DialogActionType, priorityLevel, toDoStatus } from "./modules/util/enums.js";
import { dialogController } from "./modules/controllers/dialogController.js";
import { appState } from "./modules/util/state.js";
import { renderWelcomeScreen } from "./modules/views/welcomeVIew.js";
import { projectView } from "./modules/views/projectView.js";

function initializeApp() {
  appState.clearState(); // Clear state for testing purposes
  const success = appState.initialize();

  console.log("App initialized with state:", appState);
  console.log("Projects: ", appState.projects);
  console.log("Current Project ID: ", appState.currentProjectID);

  if (!success) {
    // First time use
    //renderWelcomeScreen();
    //return;
  }
  const addProjectButton = document.querySelector(".add-project-button");
  addProjectButton.addEventListener("click", () => {
    console.log("Add Project button clicked");
    dialogController.openDialog(DialogActionType.ADD_PROJECT);
  });
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

document.addEventListener("DOMContentLoaded", initializeApp);
