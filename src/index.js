import "./styles.css";
//import { Project } from "./modules/project.js";
import { ProjectController } from "./modules/projectController.js";
import { DialogController } from "./modules/dialogController.js";

// const project = ProjectController.addProject("Project 1", "Description 1");
// project.addTodo("Todo", "Description", new Date(), 2, "Notes");
// project.addTodo("Todo 2", "Description 2", new Date(), 3, "Notes 2");
// project.listTodos();

// const project2 = ProjectController.addProject("Project 2", "Description 2");
// project2.addTodo("Todo 3", "Description 3", new Date(), 1, "Notes 3");
// project2.addTodo("Todo 4", "Description 4", new Date(), 4, "Notes 4");
// project2.listTodos();

const dialogController = new DialogController();

//add project button exists on homepage and project page
const addProjectButtons = document.querySelectorAll(".add-project-button");
addProjectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("Add Project button clicked");
    dialogController.openDialog("addProject");
  });
});
