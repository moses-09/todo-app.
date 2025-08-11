let taskList = document.getElementById("taskList");
let taskInput = document.getElementById("taskInput");

window.onload = loadTasksFromStorage;

function addTask() {
  let taskText = taskInput.value.trim();
  if (taskText === "") return;

  let li = createTaskElement(taskText);
  taskList.appendChild(li);
  taskInput.value = "";

  saveTasksToStorage();
}

function createTaskElement(text) {
  let li = document.createElement("li");
  li.textContent = text;

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasksToStorage();
  });

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.onclick = () => {
    li.remove();
    saveTasksToStorage();
  };

  li.appendChild(deleteBtn);
  return li;
}

function saveTasksToStorage() {
  let tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromStorage() {
  let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks.forEach(task => {
    let li = createTaskElement(task.text);
    if (task.completed) li.classList.add("completed");
    taskList.appendChild(li);
  });
}