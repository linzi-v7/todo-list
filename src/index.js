import "./styles.css";
// import { Project } from "./modules/project.js";
import { ProjectController } from "./modules/projectController.js";

const project = ProjectController.addProject("Project 1", "Description 1");
project.addTodo("Todo", "Description", new Date(), 2, "Notes");
project.addTodo("Todo 2", "Description 2", new Date(), 3, "Notes 2");
project.listTodos();
