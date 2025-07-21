import { EventType } from "../util/enums";
import { eventBus } from "../util/eventBus";
import { appState } from "../util/state.js";

class ProjectView {
  constructor() {
    eventBus.subscribe(EventType.PROJECT_ADD, this.renderSideBar.bind(this));
    //eventBus.subscribe(EventType.PROJECT_REMOVE, this.removeProject.bind(this));
    //eventBus.subscribe(EventType.PROJECT_UPDATE, this.updateProject.bind(this));
  }

  renderSideBar() {
    console.log("here in renderSideBar");
    const sidebar = document.querySelector(".project-sidebar .project-list");
    sidebar.innerHTML = "";

    const projects = appState.projects;

    projects.forEach((project) => {
      const projectElement = document.createElement("li");
      projectElement.classList.add("project-list-item");
      projectElement.textContent = project.title;
      projectElement.dataset.projectId = project.id;

      // each list item should open its own project view
      projectElement.addEventListener("click", () => {
        console.log("Project clicked:", project.id);
        // this.openProjectView(project.id);
      });

      sidebar.appendChild(projectElement);
    });
  }

  openProjectView(projectId) {
    const project = appState.getProjectByID(projectId);
    if (!project) {
      console.error(`Project with ID ${projectId} not found`);
      return;
    }

    console.log("Opening project view for:", project.title);
  }
}

export const projectView = new ProjectView();
export { ProjectView };
