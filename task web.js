const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const tasksContainer = document.getElementById("tasksContainer");
const deleteAllTasksBtn = document.getElementById("deleteAllTasks");
const deleteDoneTasksBtn = document.getElementById("deleteDoneTasks");
const showAllBtn = document.getElementById("showAll");
const showDoneBtn = document.getElementById("showDone");
const showTodoBtn = document.getElementById("showTodo");
const confirmationDialog = document.getElementById("confirmationDialog"); 

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return alert("Task cannot be empty!");

   // Check if task is less than 5 characters
   if (taskText.length < 5) {
    showError("Task name must be at least 5 characters long!");
    return;
  }
  const taskRow = createTaskRow(taskText);
  tasksContainer.appendChild(taskRow);
  taskInput.value = "";
  updateNoTaskMessage();
});

function createTaskRow(text) {
  const taskRow = document.createElement("div");
  taskRow.classList.add("task-row");

  const taskSpan = document.createElement("span");
  taskSpan.textContent = text;

  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.addEventListener("change", () => {
    if (taskCheckbox.checked) {
      taskSpan.style.textDecoration = "line-through";
      taskSpan.style.color = "red";
      taskRow.classList.add("done");
    } else {
      taskSpan.style.textDecoration = "none";
      taskSpan.style.color = "black";
      taskRow.classList.remove("done");
    }
  });

  const editBtn = document.createElement("button");
  editBtn.classList.add("icon-btn");
  editBtn.innerHTML = '<i class="fas fa-edit"></i>'; 
  editBtn.addEventListener("click", () => {
    const newName = prompt("Enter new name:", taskSpan.textContent);
    if (newName && /^[a-zA-Z0-9\s]+$/.test(newName)) {
      if (newName.length < 5) {
        alert("Task name must be at least 5 characters long!");
      } 
      taskSpan.textContent = newName;
    } else {
      alert("Invalid task name!");
    }
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("icon-btn");
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>'; 
  deleteBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this task?")) {
      taskRow.remove();
      updateNoTaskMessage();
    }
  });

  taskRow.append(taskSpan, taskCheckbox, editBtn, deleteBtn);
  return taskRow;
}

deleteAllTasksBtn.addEventListener("click", () => {
  tasksContainer.innerHTML = "";
  updateNoTaskMessage();
});

deleteDoneTasksBtn.addEventListener("click", () => {
  const doneTasks = document.querySelectorAll(".task-row.done");
  doneTasks.forEach(task => task.remove());
  updateNoTaskMessage();
});

function updateNoTaskMessage() {
  if (tasksContainer.children.length === 0) {
    const existingMessage = document.getElementById("noTaskMessage");
    if (!existingMessage) {
      const noTaskMessage = document.createElement("p");
      noTaskMessage.id = "noTaskMessage";
      noTaskMessage.textContent = "No task";
      tasksContainer.appendChild(noTaskMessage);
    }
  } else {
    const existingMessage = document.getElementById("noTaskMessage");
    if (existingMessage) existingMessage.remove();
  }
}

showAllBtn.addEventListener("click", () => {
  const tasks = document.querySelectorAll(".task-row");
  tasks.forEach(task => (task.style.display = "flex"));
});

showDoneBtn.addEventListener("click", () => {
  const tasks = document.querySelectorAll(".task-row");
  tasks.forEach(task => {
    if (task.classList.contains("done")) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
});

showTodoBtn.addEventListener("click", () => {
  const tasks = document.querySelectorAll(".task-row");
  tasks.forEach(task => {
    if (!task.classList.contains("done")) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
});

function showError(message){
  errorMessage.textContent = message;
  errorMessage.style.display = "block";

}
