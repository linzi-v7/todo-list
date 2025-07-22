import { Project } from "../models/project.js";
import { EventType } from "../util/enums.js";
import { eventBus } from "../util/eventBus.js";
import { appState } from "../util/state.js";

let instance = null;

class ProjectController {
  constructor() {
    if (instance) throw new Error("Only one instance of ProjectController is allowed");

    instance = this;
  }

  addProject(title, description) {
    appState.currentProjectID++;
    const newProject = new Project(appState.currentProjectID, title, description);

    //use setter better to avoid direct mutation and trigger validation and automatic saving
    appState.projects = [...appState.projects, newProject];
    eventBus.publish(EventType.PROJECT_ADD, newProject);

    if (appState.projects.length === 1) {
      eventBus.publish(EventType.PROJECT_FIRST_TIME_USE);
    }
    return newProject;
  }

  // TODO: handle error if not found
  removeProject(id) {
    appState.projects = appState.projects.filter((project) => project.id !== id);

    eventBus.publish(EventType.PROJECT_REMOVE, id);
    appState.saveInternalState();
  }

  updateProject(id, title, description) {
    appState.projects = appState.projects.map((project) => {
      if (project.id === id) {
        project.title = title;
        project.description = description;
        appState.saveInternalState();
        eventBus.publish(EventType.PROJECT_UPDATE, project);
      }
    });
  }

  getProjectByID(id) {
    return appState.projects.find((project) => project.id === id);
  }

  //DEBUG: for console logging projects
  listProjects() {
    appState.projects.forEach((project) => {
      console.log("\n ID:" + project.id + "\n Title:" + project.title + "\n Description:" + project.description);
    });
  }
}
const projectController = Object.freeze(new ProjectController());
export { projectController };
