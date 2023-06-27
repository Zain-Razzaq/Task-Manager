// Purpose: contains function to sort tasks by alphabetical order or due date
import { getListOfAllTasks } from "./script.js";
import { createNewTask } from "./createNewTask.js";

function sortTasks(sortType) {
    document.getElementById("current-tasks").innerHTML = "";
    const listOfAllTasks = getListOfAllTasks();
    if (sortType === "alphabetical") {
        listOfAllTasks.sort((a, b) => (a.name > b.name ? -1 : 1));
        listOfAllTasks.forEach((element) => createNewTask(element, false));
    } else if (sortType === "due-date") {
        listOfAllTasks.sort((a, b) => (a.dueDate > b.dueDate ? -1 : 1));
        listOfAllTasks.forEach((element) => createNewTask(element, false));
    }
}

export { sortTasks };
