import { EventType } from "../util/enums";
import { eventBus } from "../util/eventBus";
import { appState } from "../util/state";
import { projectController } from "./projectController";

let instance = null;

class TodoController {
  constructor() {
    if (instance) {
      throw new Error("Only one instance of TodoController is allowed");
    }
    instance = this;
  }

  addTodo(projectID, todo) {
    const project = projectController.getProjectByID(projectID);
    if (project) {
      project.todos.push(todo);
      project.incrementTodoID();
      eventBus.publish(EventType.TODO_ADD, todo);
      appState.saveInternalState();
    }
  }

  removeTodo(projectID, todoID) {
    const project = projectController.getProjectByID(projectID);
    if (project) {
      project.todos = project.todos.filter((todo) => todo.id !== todoID);
      eventBus.publish(EventType.TODO_REMOVE, todoID);
      appState.saveInternalState();
    }
  }

  updateTodo(projectID, todoID, title, description, dueDate, priority, notes, status) {
    const project = projectController.getProjectByID(projectID);

    if (project) {
      const todo = project.todos.find((todo) => todo.id === todoID);
      if (todo) {
        todo.title = title;
        todo.description = description;
        todo.dueDate = dueDate;
        todo.priority = priority;
        todo.notes = notes;
        todo.status = status;
        eventBus.publish(EventType.TODO_UPDATE, todo);
        appState.saveInternalState();
      }
    }
  }

  getTodoByID(projectID, todoID) {
    const project = projectController.getProjectByID(projectID);
    return project ? project.todos.find((todo) => todo.id === todoID) : undefined;
  }

  getTodosByProjectID(projectID) {
    const project = projectController.getProjectByID(projectID);
    return project ? project.todos : undefined;
  }

  // DEBUG: for console logging todos in a project
  listTodosByProjectID(projectID) {
    const todos = this.getTodosByProjectID(projectID);
    todos.forEach((todo) => {
      console.log(
        "\n ID:" +
          todo.id +
          "\n Project ID:" +
          todo.projectID +
          "\n Title:" +
          todo.title +
          "\n Description:" +
          todo.description +
          "\n Due Date:" +
          todo.dueDate +
          "\n Priority:" +
          todo.priority +
          "\n Notes:" +
          todo.notes +
          "\n Status:" +
          todo.status +
          "\n Creation Date:" +
          todo.creationDate
      );
    });
  }
}

const todoController = Object.freeze(new TodoController());
export { todoController };
