import {
    initializeDataFromLocalStorage,
    saveTasksInLocalStorage,
} from "./localStorageData.js";
import { createNewTask } from "./createNewTask.js";
import { filterTasks } from "./filterTasks.js";
import { sortTasks } from "./sortTasks.js";

class Task {
    name;
    description;
    status;
    dueDate;
}

let listOfAllTasks = [];
function initialLoad() {
    listOfAllTasks = initializeDataFromLocalStorage();
    if (listOfAllTasks.length > 0)
        listOfAllTasks.forEach((element) => createNewTask(element, false));
}

function getListOfAllTasks() {
    return listOfAllTasks;
}

function setListOfAllTasks(newListOfAllTasks) {
    listOfAllTasks = newListOfAllTasks;
}

function submitNewTask() {
    const newTask = new Task();
    newTask.name = document.getElementById("task-name").value;
    newTask.description = document.getElementById("task-description").value;
    newTask.dueDate = document.getElementById("due-date").value;
    newTask.status = "Active";
    createNewTask(newTask);
    document.getElementById("task-name").value = "";
    document.getElementById("task-description").value = "";
    document.getElementById("due-date").value = "";
}

function clearCompleted(event) {
    event.preventDefault();
    listOfAllTasks = listOfAllTasks.filter((task) => task.status === "Active");
    document.getElementById("current-tasks").innerHTML = "";
    listOfAllTasks.forEach((element) => createNewTask(element, false));
}

// initial load
initialLoad();

// add event listeners

document
    .getElementById("task-input-form")
    .addEventListener("submit", (event) => {
        event.preventDefault();
        submitNewTask();
    });

document.getElementById("show-all").addEventListener("click", () => {
    filterTasks("all");
});

document.getElementById("show-active").addEventListener("click", () => {
    filterTasks("active");
});

document.getElementById("show-completed").addEventListener("click", () => {
    filterTasks("completed");
});

document.getElementById("show-overdue").addEventListener("click", () => {
    filterTasks("overdue");
});

document.getElementById("show-today").addEventListener("click", () => {
    filterTasks("today");
});

document
    .getElementById("clear-completed-button")
    .addEventListener("click", (event) => {
        clearCompleted(event);
    });

document.getElementById("sort-alphabetical").addEventListener("click", () => {
    sortTasks("alphabetical");
});

document.getElementById("sort-due-date").addEventListener("click", () => {
    sortTasks("due-date");
});

window.addEventListener("beforeunload", function (event) {
    event.preventDefault();
    saveTasksInLocalStorage();
});


export { getListOfAllTasks, setListOfAllTasks };
