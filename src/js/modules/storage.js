// Storage handling module
export const storage = {
  save(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  },

  load() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  },
};
