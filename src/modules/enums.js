// Enum for priority level of todo
export const priorityLevel = Object.freeze({
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  URGENT: 4,
  CRITICAL: 5,
});

// Enum for status of todo
export const toDoStatus = Object.freeze({
  TODO: 1,
  IN_PROGRESS: 2,
  IN_REVIEW: 3,
  ON_HOLD: 4,
  COMPLETED: 5,
});

// Enum for dialog actions
// These actions are used to determine which dialog to open and what content to display
// They are used in the dialogController to handle different actions like adding, editing, viewing,
// and deleting todos and projects
export const DialogActionType = Object.freeze({
  // Todo actions
  ADD_TODO: "addTodo",
  EDIT_TODO: "editTodo",
  VIEW_TODO: "viewTodo",
  DELETE_TODO: "deleteTodo",

  // Project actions
  ADD_PROJECT: "addProject",
  EDIT_PROJECT: "editProject",
  VIEW_PROJECT: "viewProject",
  DELETE_PROJECT: "deleteProject",
});
