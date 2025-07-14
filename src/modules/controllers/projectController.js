import { Project } from "../models/project.js";
import { appState } from "../util/state.js";

let instance = null;

class ProjectController {
  constructor() {
    if (instance)
      throw new Error("Only one instance of ProjectController is allowed");

    instance = this;
    this.state = appState.state;
  }

  addProject(title, description) {
    this.state.currentProjectID++;
    const newProject = new Project(
      this.state.currentProjectID,
      title,
      description
    );
    this.state.projects.push(newProject);

    appState.saveCustomState(this.state);
    return newProject;
  }

  removeProject(id) {
    this.state.projects = this.state.projects.filter(
      (project) => project.id !== id
    );

    appState.saveCustomState(this.state);
  }

  updateProject(id, title, description) {
    this.state.projects = this.state.projects.map((project) => {
      if (project.id === id) {
        project.title = title;
        project.description = description;
        appState.saveCustomState(this.state);
      }
    });
  }

  getProjectByID(id) {
    return this.state.projects.find((project) => project.id === id);
  }

  listProjects() {
    this.state.projects.forEach((project) => {
      console.log(
        "\n ID:" +
          project.id +
          "\n Title:" +
          project.title +
          "\n Description:" +
          project.description
      );
    });
  }
}
const projectController = Object.freeze(new ProjectController());
export { projectController };
