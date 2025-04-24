import { Project } from "./project.js";

class ProjectController {
  static currentProjectID = 0;
  static projectList = [];

  constructor() {
    throw new Error("ProjectController is a static class");
  }

  static addProject(title, description) {
    ProjectController.currentProjectID++;
    ProjectController.projectList.push(
      new Project(this.currentProjectID, title, description)
    );
  }

  static removeProject(id) {
    ProjectController.projectList = ProjectController.projectList.filter(
      (project) => project.id !== id
    );
  }

  static updateProject(id, title, description) {
    ProjectController.projectList = ProjectController.projectList.map(
      (project) => {
        if (project.id === id) {
          project.title = title;
          project.description = description;
        }
        return project;
      }
    );
  }

  static getProject(id) {
    return ProjectController.projectList.find((project) => project.id === id);
  }

  static listProjects() {
    ProjectController.projectList.forEach((project) => {
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

export { ProjectController };
