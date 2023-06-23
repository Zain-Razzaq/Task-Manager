class Task {
    taskName;
    taskDescription;
    taskStatus;
    dueDate;
}

// const listOfAllTasks = "listOfAllTasks";

let listOfAllTasks = localStorage.listOfAllTasks;

if (!listOfAllTasks) {
    listOfAllTasks = [];
    localStorage.setItem("listOfAllTasks", JSON.stringify(listOfAllTasks));
} else {
    try {
        listOfAllTasks = JSON.parse(listOfAllTasks);
    } catch (error) {
        listOfAllTasks = [];
        localStorage.setItem("listOfAllTasks", JSON.stringify(listOfAllTasks));
    }
    document.getElementById("current-tasks").innerHTML = "";
    listOfAllTasks.forEach((element) => {
        createNewTask(element, false);
    });
}

function makeDesc() {
    const newTaskDesc = document.createElement("p");
    newTaskDesc.contentEditable = true;
    newTaskDesc.spellcheck = false;
    newTaskDesc.classList.add("desc");
    newTaskDesc.addEventListener("blur", function () {
        let editedDiv = this.parentElement.children;
        listOfAllTasks = JSON.parse(localStorage.getItem("listOfAllTasks"));
        for (let i = 0; i < listOfAllTasks.length; i++) {
            if (listOfAllTasks[i].taskName == editedDiv[0].textContent) {
                listOfAllTasks[i].taskDescription = editedDiv[1].textContent;
                break;
            }
        }
        localStorage.setItem("listOfAllTasks", JSON.stringify(listOfAllTasks));
    });
    return newTaskDesc;
}

function makeCheckbox() {
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.onclick = function () {
        if (this.checked) {
            this.parentElement.classList.add("completed-task");
            let taskToComplete = this.parentElement.firstChild.textContent;
            listOfAllTasks = JSON.parse(localStorage.listOfAllTasks);
            listOfAllTasks.forEach((element) => {
                if (element.taskName == taskToComplete) {
                    element.taskStatus = "Completed";
                }
            });
            localStorage.setItem(
                "listOfAllTasks",
                JSON.stringify(listOfAllTasks)
            );
        } else {
            this.parentElement.classList.remove("completed-task");
            let taskToComplete = this.parentElement.firstChild.textContent;
            listOfAllTasks = JSON.parse(localStorage.listOfAllTasks);
            listOfAllTasks.forEach((element) => {
                if (element.taskName == taskToComplete) {
                    element.taskStatus = "Active";
                }
            });
            localStorage.setItem(
                "listOfAllTasks",
                JSON.stringify(listOfAllTasks)
            );
        }
    };
    checkBox.classList.add("task-checkbox");
    return checkBox;
}

function makeDeleteButton() {
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
        let previousList = JSON.parse(localStorage.listOfAllTasks);
        previousList = previousList.filter((element) => {
            return element.taskName != taskToDelete;
        });

        localStorage.setItem("listOfAllTasks", JSON.stringify(previousList));
        this.parentElement.remove();
    };
    return newTaskButton;
}

function createNewTask(task, newItem = true) {
    if (newItem) {
        previousList = JSON.parse(localStorage.listOfAllTasks);
        previousList.push(task);
        localStorage.setItem("listOfAllTasks", JSON.stringify(previousList));
    }
    const newTask = document.createElement("div");
    newTask.classList.add("task");
    newTask.draggable = true;
    newTask.addEventListener("dragstart", dragStart);
    newTask.addEventListener("drop", dragDrop);
    newTask.addEventListener("dragover", dragOver);

    //Task name
    const newTaskName = document.createElement("h3");

    // Task description
    const newTaskDesc = makeDesc();

    // Task Due Date
    const date = document.createElement("p");
    date.classList.add("date");

    // Checkbox to mark a task as completed
    const checkBox = makeCheckbox();

    // Button to delete a task
    const newTaskButton = makeDeleteButton();

    // Assigning values to the HTML elements
    newTaskName.textContent = task.taskName;
    newTaskDesc.textContent = task.taskDescription;
    date.textContent = task.dueDate;
    if (task.taskStatus == "Completed") {
        checkBox.checked = true;
        newTask.classList.add("completed-task");
    } else {
        checkBox.checked = false;
    }

    // Appending the elements to the task div
    newTask.appendChild(newTaskName);
    newTask.appendChild(newTaskDesc);
    newTask.appendChild(date);
    newTask.appendChild(checkBox);
    newTask.appendChild(newTaskButton);

    // Appending the task div to the current tasks div
    document.getElementById("current-tasks").prepend(newTask);
}

function submitNewTask() {
    const newTask = new Task();
    newTask.taskName = document.getElementById("task-name").value;
    newTask.taskDescription = document.getElementById("task-description").value;
    newTask.dueDate = document.getElementById("due-date").value;
    newTask.taskStatus = "Active";

    createNewTask(newTask);
    newTask.taskName = newTask.taskDescription = newTask.dueDate = "";
}

function filterTasks(filterType) {
    let children = document.getElementById("current-tasks").children;
    if (filterType === "all") {
        for (let i = 0; i < children.length; i++) {
            children[i].style.display = "flex";
        }
    } else if (filterType === "completed") {
        for (let i = 0; i < children.length; i++) {
            if (children[i].classList.contains("completed-task")) {
                children[i].style.display = "flex";
            } else {
                children[i].style.display = "none";
            }
        }
    } else if (filterType === "active") {
        for (let i = 0; i < children.length; i++) {
            if (children[i].classList.contains("completed-task")) {
                children[i].style.display = "none";
            } else {
                children[i].style.display = "flex";
            }
        }
    } else if (filterType === "overdue") {
        const today = new Date();
        const date = `${today.getFullYear()}-${String(
            today.getMonth() + 1
        ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
        console.log(date);
        for (let i = 0; i < children.length; i++) {
            if (
                !children[i].classList.contains("completed-task") &&
                children[i].children[2].textContent < date
            ) {
                children[i].style.display = "flex";
            } else {
                children[i].style.display = "none";
            }
        }
    } else if (filterType === "today") {
        const today = new Date();
        const date = `${today.getFullYear()}-${String(
            today.getMonth() + 1
        ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
        for (let i = 0; i < children.length; i++) {
            if (children[i].children[2].textContent == date) {
                children[i].style.display = "flex";
            } else {
                children[i].style.display = "none";
            }
        }
    }
}

function sortTasks(sortType) {
    document.getElementById("current-tasks").innerHTML = "";
    listOfAllTasks = JSON.parse(localStorage.listOfAllTasks);
    if (sortType === "alphabetical") {
        listOfAllTasks.sort((a, b) => (a.taskName > b.taskName ? -1 : 1));
        listOfAllTasks.forEach((element) => {
            createNewTask(element, false);
        });
    } else if (sortType === "due-date") {
        listOfAllTasks.sort((a, b) => (a.dueDate > b.dueDate ? -1 : 1));
        listOfAllTasks.forEach((element) => {
            createNewTask(element, false);
        });
    }
}

function clearCompleted() {
    listOfAllTasks = JSON.parse(localStorage.listOfAllTasks);
    listOfAllTasks= listOfAllTasks.filter((task) => task.taskStatus === "Active");
    localStorage.setItem("listOfAllTasks", JSON.stringify(listOfAllTasks));

    let children = document.getElementById("current-tasks").children;
    for (let i = children.length - 1; i >= 0; i--) {
        if (children[i].classList.contains("completed-task")) {
            children[i].remove();
        }
    }
}

// Drag and drop functions

let dragedTask = null;

function dragStart(event) {
    dragedTask = this;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", this.innerHTML);
}

function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    return false;
}

function dragDrop(event) {
    event.stopPropagation();
    if (dragedTask != this) {
        dragedTask.innerHTML = this.innerHTML;
        this.innerHTML = event.dataTransfer.getData("text/html");
    }
    return false;
}
