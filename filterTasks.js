function showAllTasks() {
    const children = document.getElementById("current-tasks").children;
    for (let i = 0; i < children.length; i++) {
        children[i].style.display = "flex";
    }
}

function showCompletedTasks() {
    const children = document.getElementById("current-tasks").children;
    for (let i = 0; i < children.length; i++) {
        if (children[i].classList.contains("completed-task")) {
            children[i].style.display = "flex";
        } else {
            children[i].style.display = "none";
        }
    }
}

function showActiveTasks() {
    const children = document.getElementById("current-tasks").children;
    for (let i = 0; i < children.length; i++) {
        if (!children[i].classList.contains("completed-task")) {
            children[i].style.display = "flex";
        } else {
            children[i].style.display = "none";
        }
    }
}

function showOverdueTasks() {
    const children = document.getElementById("current-tasks").children;
    const today = new Date();
    const date = `${today.getFullYear()}-${String(
        today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
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
}

function showTodayTasks() {
    const children = document.getElementById("current-tasks").children;
    const today = new Date();
    const date = `${today.getFullYear()}-${String(
        today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    for (let i = 0; i < children.length; i++) {
        if (
            !children[i].classList.contains("completed-task") &&
            children[i].children[2].textContent === date
        ) {
            children[i].style.display = "flex";
        } else {
            children[i].style.display = "none";
        }
    }
}

function filterTasks(filterType) {
    switch (filterType) {
        case "all":
            showAllTasks();
            break;
        case "completed":
            showCompletedTasks();
            break;
        case "active":
            showActiveTasks();
            break;
        case "overdue":
            showOverdueTasks();
            break;
        case "today":
            showTodayTasks();
            break;
        default:
            break;
    }
}

export { filterTasks };
