// Enum for priority level of todo
const priorityLevel = Object.freeze({
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  URGENT: 4,
  CRITICAL: 5,
});

// Enum for status of todo
const toDoStatus = Object.freeze({
  TODO: 1,
  IN_PROGRESS: 2,
  IN_REVIEW: 3,
  ON_HOLD: 4,
  COMPLETED: 5,
});

class ToDo {
  #title;
  #dueDate;
  #priority;
  #status;
  #creationDate;

  id;
  description;
  notes;
  projectID;

  constructor(
    id,
    title,
    description,
    dueDate,
    priority,
    notes,
    status,
    projectID
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.status = status || toDoStatus.TODO;
    this.projectID = projectID;
    this.#creationDate = new Date();
  }

  set title(title) {
    if (title.length < 1) {
      throw new Error("Title cannot be empty");
    }
    this.#title = title;
  }

  set dueDate(dueDate) {
    if (
      (dueDate instanceof Date && isNaN(dueDate)) ||
      !(dueDate instanceof Date) ||
      dueDate < Date.now() //Check if dueDate is in the past
    ) {
      throw new Error("Due date cannot be empty or in the past");
    }
    this.#dueDate = dueDate;
  }

  set priority(priority) {
    if (priority < priorityLevel.LOW || priority > priorityLevel.CRITICAL) {
      throw new Error("Priority must be between 1 and 5");
    }
    this.#priority = priority;
  }

  set status(status) {
    if (status < toDoStatus.TODO || status > toDoStatus.COMPLETED) {
      throw new Error("Status must be between 1 and 4");
    }
    this.#status = status;
  }

  get creationDate() {
    return this.#creationDate;
  }

  get title() {
    return this.#title;
  }

  get dueDate() {
    return this.#dueDate;
  }

  get priority() {
    return this.#priority;
  }

  get status() {
    return this.#status;
  }
}

export { ToDo, priorityLevel, toDoStatus };
