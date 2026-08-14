const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");

const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

const pendingEmpty = document.getElementById("pendingEmpty");
const completedEmpty = document.getElementById("completedEmpty");

const currentDate = document.getElementById("currentDate");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Show today's date

function showDate() {

    const today = new Date();

    currentDate.textContent = today.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long"
    });
}


// Add a new task

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        taskInput.focus();
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null
    };

    tasks.push(task);

    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskInput.focus();
}


// Save tasks in localStorage

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Display all tasks

function renderTasks() {

    const pendingTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    pendingTasks.forEach(task => {
        pendingList.appendChild(createTaskElement(task));
    });

    completedTasks.forEach(task => {
        completedList.appendChild(createTaskElement(task));
    });

    updateCounts();

    showEmptyState();
}


// Create task HTML

function createTaskElement(task) {

    const taskElement = document.createElement("div");

    taskElement.className = "task";

    if (task.completed) {
        taskElement.classList.add("completed");
    }

    taskElement.dataset.id = task.id;


    // Complete button

    const completeButton = document.createElement("button");

    completeButton.className = "complete-button";
    completeButton.title = task.completed
        ? "Mark as pending"
        : "Mark as complete";

    completeButton.addEventListener("click", () => {
        toggleTask(task.id);
    });


    // Content area

    const content = document.createElement("div");

    content.className = "task-content";


    const text = document.createElement("div");

    text.className = "task-text";
    text.textContent = task.text;


    const time = document.createElement("div");

    time.className = "task-time";

    time.textContent = getTaskTime(task);


    content.appendChild(text);
    content.appendChild(time);


    // Action buttons

    const actions = document.createElement("div");

    actions.className = "task-actions";


    const editButton = document.createElement("button");

    editButton.className = "action-button";
    editButton.textContent = "Edit";

    editButton.addEventListener("click", () => {
        editTask(task.id, content);
    });


    const deleteButton = document.createElement("button");

    deleteButton.className = "action-button delete-button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
        deleteTask(task.id);
    });


    actions.appendChild(editButton);
    actions.appendChild(deleteButton);


    taskElement.appendChild(completeButton);
    taskElement.appendChild(content);
    taskElement.appendChild(actions);

    return taskElement;
}


// Mark task complete / pending

function toggleTask(id) {

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return;
    }

    task.completed = !task.completed;

    if (task.completed) {
        task.completedAt = new Date().toISOString();
    } else {
        task.completedAt = null;
    }

    saveTasks();
    renderTasks();
}


// Edit task

function editTask(id, content) {

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return;
    }

    const oldText = task.text;

    content.innerHTML = "";

    const input = document.createElement("input");

    input.type = "text";
    input.className = "edit-input";
    input.value = oldText;
    input.maxLength = 100;

    content.appendChild(input);

    input.focus();
    input.select();


    function saveEdit() {

        const newText = input.value.trim();

        if (newText === "") {
            task.text = oldText;
        } else {
            task.text = newText;
        }

        saveTasks();
        renderTasks();
    }


    input.addEventListener("keydown", event => {

        if (event.key === "Enter") {
            saveEdit();
        }

        if (event.key === "Escape") {
            renderTasks();
        }
    });


    input.addEventListener("blur", saveEdit);
}


// Delete task

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();
}


// Update task counters

function updateCounts() {

    const pendingTasks = tasks.filter(task => !task.completed).length;
    const completedTasks = tasks.filter(task => task.completed).length;

    pendingCount.textContent =
        `${pendingTasks} ${pendingTasks === 1 ? "pending" : "pending"}`;

    completedCount.textContent =
        `${completedTasks} ${completedTasks === 1 ? "completed" : "completed"}`;
}


// Empty states

function showEmptyState() {

    const pendingTasks = tasks.some(task => !task.completed);
    const completedTasks = tasks.some(task => task.completed);

    if (!pendingTasks) {
        pendingList.appendChild(pendingEmpty);
    }

    if (!completedTasks) {
        completedList.appendChild(completedEmpty);
    }
}


// Display timestamps

function getTaskTime(task) {

    const createdDate = new Date(task.createdAt);

    const createdTime = createdDate.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
    });

    if (task.completed && task.completedAt) {

        const completedDate = new Date(task.completedAt);

        const completedTime = completedDate.toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit"
        });

        return `Added ${createdTime} · Completed ${completedTime}`;
    }

    return `Added ${createdTime}`;
}


// Add task button

addTaskButton.addEventListener("click", addTask);


// Enter key adds task

taskInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        addTask();
    }
});


// Initial page load

showDate();
renderTasks();