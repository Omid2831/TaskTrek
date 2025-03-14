// Import modules
import { storage } from "./modules/storage.js";
import { TaskManager } from "./modules/taskManager.js";
import { utils } from "./modules/utils.js";
import { UI } from "./modules/ui.js";

// Initialize application
const taskManager = new TaskManager(storage);
const ui = new UI(taskManager, utils);

// Initial render
document.addEventListener("DOMContentLoaded", () => {
  ui.renderTasks();
  ui.updateTaskCount();
});

// Make UI instance available globally for event handlers
window.ui = ui;
