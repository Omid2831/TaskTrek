// UI handling module
export class UI {
  constructor(taskManager, utils) {
    this.taskManager = taskManager;
    this.utils = utils;
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.getElementById("taskInput").addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.handleAddTask();
    });
  }

  handleAddTask() {
    const taskInput = document.getElementById("taskInput");
    const taskPriority = document.getElementById("taskPriority");
    const taskDueDate = document.getElementById("taskDueDate");

    if (taskInput.value.trim() === "") return;

    this.taskManager.addTask(
      taskInput.value,
      taskPriority.value,
      taskDueDate.value
    );

    taskInput.value = "";
    taskDueDate.value = "";
    taskPriority.value = "low";

    this.renderTasks();
    this.updateTaskCount();
  }

  handleToggleTask(id) {
    this.taskManager.toggleTask(id);
    this.renderTasks();
    this.updateTaskCount();
  }

  handleDeleteTask(id) {
    this.taskManager.deleteTask(id);
    this.renderTasks();
    this.updateTaskCount();
  }

  handleClearCompleted() {
    this.taskManager.clearCompleted();
    this.renderTasks();
    this.updateTaskCount();
  }

  renderTasks() {
    const taskList = document.getElementById("taskList");
    const filterPriority = document.getElementById("filterPriority").value;
    const filterStatus = document.getElementById("filterStatus").value;

    const filteredTasks = this.taskManager.getFilteredTasks(
      filterPriority,
      filterStatus
    );
    const sortedTasks = this.utils.sortTasks(filteredTasks);

    taskList.innerHTML = sortedTasks
      .map((task) => this.createTaskElement(task))
      .join("");
  }

  createTaskElement(task) {
    return `
            <li class="priority-${task.priority} ${
      task.completed ? "completed" : ""
    }">
                <input type="checkbox" 
                       ${task.completed ? "checked" : ""} 
                       onclick="ui.handleToggleTask(${task.id})">
                <div class="task-content">
                    <div class="task-text">${this.utils.escapeHtml(
                      task.text
                    )}</div>
                    <div class="task-details">
                        <span>Priority: ${this.utils.capitalizeFirst(
                          task.priority
                        )}</span>
                        ${
                          task.dueDate
                            ? `<span>Due: ${this.utils.formatDate(
                                task.dueDate
                              )}</span>`
                            : ""
                        }
                    </div>
                </div>
                <div class="task-actions">
                    <button onclick="ui.handleDeleteTask(${
                      task.id
                    })" class="clear-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </li>
        `;
  }

  updateTaskCount() {
    const counts = this.taskManager.getTaskCounts();
    document.getElementById("taskCount").textContent = `${
      counts.remaining
    } task${counts.remaining !== 1 ? "s" : ""} remaining`;
    document.getElementById(
      "completedCount"
    ).textContent = `${counts.completed} completed`;
  }
}
