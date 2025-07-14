import "./styles.css";
//import { Project } from "./modules/project.js";
import { projectController } from "./modules/controllers/projectController.js";
import { todoController } from "./modules/controllers/todoController.js";
import { ToDo } from "./modules/models/todo.js";
import { priorityLevel, toDoStatus } from "./modules/util/enums.js";
import { DialogController } from "./modules/controllers/dialogController.js";

const project = projectController.addProject("Project 1", "Description 1");
const todo1 = new ToDo(1, "title 1", "description 1", new Date(), priorityLevel.LOW, "notes 1", toDoStatus.TODO, project.id);
const todo2 = new ToDo(2, "title 2", "description 2", new Date(), priorityLevel.HIGH, "notes 2", toDoStatus.TODO, project.id);
todoController.addTodo(project.id, todo1);
todoController.addTodo(project.id, todo2);
todoController.listTodosByProjectID(project.id);

const project2 = projectController.addProject("Project 2", "Description 2");
const todo3 = new ToDo(3, "title 3", "description 3", new Date(), priorityLevel.MEDIUM, "notes 3", toDoStatus.TODO, project2.id);
todoController.addTodo(project2.id, todo3);
todoController.listTodosByProjectID(project2.id);

projectController.listProjects();

const dialogController = new DialogController();

//add project button exists on homepage and project page
const addProjectButtons = document.querySelectorAll(".add-project-button");
addProjectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("Add Project button clicked");
    dialogController.openDialog("addProject");
  });
});
