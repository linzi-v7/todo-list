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

// Enum for event types
// add more events as needed
export const EventType = Object.freeze({
  // Project events
  PROJECT_ADD: "project:add",
  PROJECT_REMOVE: "project:remove",
  PROJECT_UPDATE: "project:update",
  PROJECT_LIST: "project:list",

  // Todo events
  TODO_ADD: "todo:add",
  TODO_REMOVE: "todo:remove",
  TODO_UPDATE: "todo:update",
  TODO_LIST: "todo:list",
  TODO_VIEW: "todo:view",
  TODO_PRIORITY_CHANGE: "todo:priorityChange",
  TODO_STATUS_CHANGE: "todo:statusChange",
  TODO_FILTER: "todo:filter",

  // Dialog events
  DIALOG_OPEN: "dialog:open",
  DIALOG_CLOSE: "dialog:close",
  DIALOG_ACTION: "dialog:action",
  DIALOG_CONFIRM: "dialog:confirm",
  DIALOG_CANCEL: "dialog:cancel",
  DIALOG_ERROR: "dialog:error",
  DIALOG_SUCCESS: "dialog:success",
  DIALOG_INFO: "dialog:info",
});
