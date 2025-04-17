//Enum for priority status of todo
const priorityStatus = Object.freeze({
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  URGENT: 4,
  CRITICAL: 5,
});

class ToDo {
  constructor(title, description, dueDate, priority, notes) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.isCompleted = false;
  }

  set title(title) {
    if (title === "" || title === null) {
      throw new Error("Title cannot be empty");
    }
    this.title = title;
  }

  set dueDate(dueDate) {
    if (
      (dueDate instanceof Date && isNaN(dueDate)) ||
      !(dueDate instanceof Date) ||
      dueDate < Date.now() //Check if dueDate is in the past
    ) {
      throw new Error("Due date cannot be empty or in the past");
    }

    this.dueDate = dueDate;
  }

  set priority(priority) {
    if (priority < priorityStatus.LOW || priority > priorityStatus.CRITICAL) {
      throw new Error("Priority must be between 1 and 5");
    }
    this.priority = priority;
  }

  toggleCompleted() {
    this.isCompleted = !this.isCompleted;
  }

  get title() {
    return this.title;
  }

  get description() {
    return this.description;
  }

  get dueDate() {
    return this.dueDate;
  }

  get priority() {
    return this.priority;
  }

  get notes() {
    return this.notes;
  }

  get isCompleted() {
    return this.isCompleted;
  }
}

export { ToDo, priorityStatus };
