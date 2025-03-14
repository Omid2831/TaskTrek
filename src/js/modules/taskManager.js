// Task management module
export class TaskManager {
  constructor(storage) {
    this.tasks = [];
    this.storage = storage;
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.storage.load();
  }

  addTask(text, priority, dueDate) {
    const task = {
      id: Date.now(),
      text: text.trim(),
      priority,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    this.tasks.push(task);
    this.storage.save(this.tasks);
    return task;
  }

  toggleTask(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.storage.save(this.tasks);
    }
    return task;
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.storage.save(this.tasks);
  }

  clearCompleted() {
    this.tasks = this.tasks.filter((task) => !task.completed);
    this.storage.save(this.tasks);
  }

  getFilteredTasks(filterPriority, filterStatus) {
    return this.tasks.filter((task) => {
      const priorityMatch =
        filterPriority === "all" || task.priority === filterPriority;
      const statusMatch =
        filterStatus === "all" ||
        (filterStatus === "completed" && task.completed) ||
        (filterStatus === "pending" && !task.completed);
      return priorityMatch && statusMatch;
    });
  }

  getTaskCounts() {
    const total = this.tasks.length;
    const completed = this.tasks.filter((task) => task.completed).length;
    return {
      total,
      completed,
      remaining: total - completed,
    };
  }
}
