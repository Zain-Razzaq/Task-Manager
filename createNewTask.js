import { getListOfAllTasks, setListOfAllTasks } from "./script.js";
import { dragStart, dragDrop, dragOver } from "./dragDrop.js";

function createDescription() {
    const newTaskDescription = document.createElement("p");
    newTaskDescription.contentEditable = true;
    newTaskDescription.spellcheck = false;
    newTaskDescription.classList.add("desc");
    newTaskDescription.addEventListener("blur", function () {
        let editedDiv = this.parentElement.children;
        const listOfAllTasks = getListOfAllTasks();
        listOfAllTasks.map((element) => {
            if (element.name == editedDiv[0].textContent) {
                element.description = editedDiv[1].textContent;
            }
        });
    });
    return newTaskDescription;
}

function createDueDate() {
    const dueDate = document.createElement("p");
    dueDate.classList.add("due-date");
    return dueDate;
}

function createCheckbox() {
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("task-checkbox");
    checkBox.onclick = function () {
        let taskToComplete = this.parentElement.firstChild.textContent;
        const listOfAllTasks = getListOfAllTasks();
        if (this.checked) {
            this.parentElement.classList.add("completed-task");
            listOfAllTasks.forEach((element) => {
                if (element.name == taskToComplete)
                    element.status = "Completed";
            });
        } else {
            this.parentElement.classList.remove("completed-task");
            listOfAllTasks.forEach((element) => {
                if (element.name == taskToComplete) element.status = "Active";
            });
        }
    };
    return checkBox;
}

function createDeleteButton() {
    const newTaskButton = document.createElement("button");
    const delImageStatic = document.createElement("img");
    const delImage = document.createElement("img");
    delImageStatic.src = "images/deleteIconStatic.png";
    delImageStatic.classList.add("static-delete-icon");
    delImage.src = "images/deleteIcon.gif";
    delImage.classList.add("animated-delete-icon");
    newTaskButton.appendChild(delImageStatic);
    newTaskButton.appendChild(delImage);
    newTaskButton.id = "delete-task-button";

    newTaskButton.onclick = function () {
        let taskToDelete = this.parentElement.firstChild.textContent;
        let previousList = getListOfAllTasks();
        previousList = previousList.filter(
            (element) => element.name != taskToDelete
        );
        setListOfAllTasks(previousList);
        this.parentElement.remove();
    };
    return newTaskButton;
}

function createNewTaskDiv(task) {
    const newTask = document.createElement("div");
    newTask.classList.add("task");
    newTask.draggable = true;
    newTask.addEventListener("dragstart", dragStart);
    newTask.addEventListener("drop", dragDrop);
    newTask.addEventListener("dragover", dragOver);

    //Task name
    const newTaskName = document.createElement("h3");

    // Task description
    const newTaskDescription = createDescription();

    // Task Due Date
    const newTaskDueDate = createDueDate();

    // Checkbox to mark a task as completed
    const checkBox = createCheckbox();

    // Button to delete a task
    const newTaskDeleteButton = createDeleteButton();

    // Assigning values to the HTML elements
    newTaskName.textContent = task.name;
    newTaskDescription.textContent = task.description;
    newTaskDueDate.textContent = task.dueDate;
    if (task.status == "Completed") {
        checkBox.checked = true;
        newTask.classList.add("completed-task");
    } else {
        checkBox.checked = false;
    }

    // Appending the elements to the task div
    newTask.appendChild(newTaskName);
    newTask.appendChild(newTaskDescription);
    newTask.appendChild(newTaskDueDate);
    newTask.appendChild(checkBox);
    newTask.appendChild(newTaskDeleteButton);
    return newTask;
}

function createNewTask(task, newItem = true) {
    if (newItem) {
        let previousList = getListOfAllTasks();
        previousList.push(task);
    }
    const newTask = createNewTaskDiv(task);
    // Appending the task div to the current tasks div
    document.getElementById("current-tasks").prepend(newTask);
}

export { createNewTask };
